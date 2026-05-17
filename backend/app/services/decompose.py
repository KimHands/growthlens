from datetime import date, timedelta
import numpy as np
from statsmodels.tsa.seasonal import STL

from app.schemas import DecomposePoint, DecomposeResponse

_DAY_KO = ["월", "화", "수", "목", "금", "토", "일"]


def decompose(
    dates: list[date],
    values: list[float],
    target: float | None = None,
) -> DecomposeResponse:
    """STL 분해 + 파생 지표 계산.

    statsmodels.tsa.seasonal.STL(period=7, robust=True) 사용.
    period=7은 주간 계절성 가정. robust=True는 잔차 outlier에 영향을 줄임.

    Args:
        dates: 날짜 리스트 (n개, 14 이상)
        values: 일별 관측값 (n개)
        target: 목표값 (있으면 days_to_target 추정)
    """
    if len(values) != len(dates):
        raise ValueError("dates와 values 길이가 다릅니다")
    if len(values) < 14:
        raise ValueError("STL은 최소 14개 관측값이 필요합니다")

    obs = np.array(values, dtype=float)
    result = STL(obs, period=7, robust=True).fit()
    trend_arr = np.asarray(result.trend, dtype=float)
    seasonal_arr = np.asarray(result.seasonal, dtype=float)
    resid_arr = np.asarray(result.resid, dtype=float)

    points = [
        DecomposePoint(
            date=dates[i],
            day=_DAY_KO[dates[i].weekday()],
            observed=float(obs[i]),
            trend=round(float(trend_arr[i]), 2),
            seasonal=round(float(seasonal_arr[i]), 2),
            residual=round(float(resid_arr[i]), 2),
        )
        for i in range(len(obs))
    ]

    n = len(obs)
    first_trend = float(trend_arr[0])
    last_trend = float(trend_arr[-1])

    # 기본 변화율 (첫→마지막)
    change_pct = (
        round((last_trend - first_trend) / first_trend * 100, 1)
        if first_trend > 0
        else 0.0
    )

    # 잔차 표준편차 = 일일 변동성
    residual_std = float(np.std(resid_arr, ddof=1))

    # 시즌 진폭 = max - min
    seasonal_amplitude = float(seasonal_arr.max() - seasonal_arr.min())

    # 평일 vs 주말 (observed 기준)
    weekday_mask = np.array([dates[i].weekday() < 5 for i in range(n)])
    if weekday_mask.any() and (~weekday_mask).any():
        wd_avg = float(obs[weekday_mask].mean())
        we_avg = float(obs[~weekday_mask].mean())
        weekday_vs_weekend = wd_avg - we_avg
    else:
        weekday_vs_weekend = 0.0

    # 트렌드 일평균 기울기 (linear regression on trend)
    x = np.arange(n)
    slope, _intercept = np.polyfit(x, trend_arr, 1)
    trend_slope_per_day = float(slope)

    # 가속도: 후반 절반 기울기 - 전반 절반 기울기
    half = n // 2
    if half >= 2:
        slope_first, _ = np.polyfit(x[:half], trend_arr[:half], 1)
        slope_last, _ = np.polyfit(x[half:], trend_arr[half:], 1)
        trend_acceleration = float(slope_last - slope_first)
    else:
        trend_acceleration = 0.0

    # 분산 비율: trend가 전체 변동의 몇 %를 설명하는가
    total_var = float(np.var(obs, ddof=1)) or 1e-9
    trend_variance_ratio = float(np.var(trend_arr, ddof=1)) / total_var
    trend_variance_ratio = max(0.0, min(1.0, trend_variance_ratio))

    residual_max_abs = float(np.max(np.abs(resid_arr)))

    # 목표까지 예상일 (현재 트렌드 + 일평균 기울기)
    days_to_target: int | None = None
    eta_low: int | None = None
    eta_high: int | None = None
    if target is not None and trend_slope_per_day > 0 and last_trend < target:
        gap = target - last_trend
        days_to_target = max(1, int(round(gap / trend_slope_per_day)))
        # 1.5σ 만큼 기울기 신뢰구간 (간단한 휴리스틱)
        slope_uncertainty = residual_std / max(1, n) * 1.5
        slope_low = max(trend_slope_per_day - slope_uncertainty, 1e-6)
        slope_high = trend_slope_per_day + slope_uncertainty
        eta_high = max(1, int(round(gap / slope_high)))  # 빨리 도달 (낙관)
        eta_low = max(1, int(round(gap / slope_low)))    # 늦게 도달 (보수)

    return DecomposeResponse(
        points=points,
        trend_change_pct=change_pct,
        first_trend=round(first_trend, 2),
        last_trend=round(last_trend, 2),
        window_days=n,
        residual_std=round(residual_std, 2),
        seasonal_amplitude=round(seasonal_amplitude, 2),
        weekday_vs_weekend=round(weekday_vs_weekend, 2),
        trend_slope_per_day=round(trend_slope_per_day, 3),
        trend_acceleration=round(trend_acceleration, 3),
        trend_variance_ratio=round(trend_variance_ratio, 3),
        residual_max_abs=round(residual_max_abs, 2),
        days_to_target=days_to_target,
        target_eta_low=eta_low,
        target_eta_high=eta_high,
    )


def seed_series(start: date, n: int = 14) -> tuple[list[date], list[float]]:
    """데모용 14일치 시계열 — GrowthLens 코어 시나리오:
    "최근 3일은 떨어진 것처럼 보이지만 흐름은 분명히 상승 중."

    구성:
    - 강한 상승 트렌드 10 → 28 (+180%)
    - 평일 +3 / 주말 -4 (눈에 띄는 주간 리듬)
    - 평소 노이즈는 작게 (σ=2)
    - 마지막 3일에 의도된 큰 음수 충격 → STL이 잔차로 분리
    """
    rng = np.random.default_rng(42)
    dates = [start + timedelta(days=i) for i in range(n)]

    trend = np.linspace(10, 28, n)
    # 시즌 진폭을 작게 (±1.5) — STL이 마지막 3일 충격을 잔차로 분리하도록
    seasonal = np.array(
        [-1.5 if d.weekday() >= 5 else 1.0 for d in dates], dtype=float
    )
    noise = rng.normal(0, 1.0, n)

    # 마지막 3일 outlier (평소 σ=1의 5~8배) — STL robust가 trend에 흡수 안 시키고 잔차로 분리
    if n >= 3:
        noise[-3] = -5.0
        noise[-2] = -8.0
        noise[-1] = -4.0

    raw = trend + seasonal + noise
    values = [max(0, round(float(v), 1)) for v in raw]
    return dates, values
