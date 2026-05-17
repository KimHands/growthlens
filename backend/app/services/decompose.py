from datetime import date, timedelta
import numpy as np
from statsmodels.tsa.seasonal import STL

from app.schemas import DecomposePoint, DecomposeResponse

_DAY_KO = ["월", "화", "수", "목", "금", "토", "일"]


def decompose(dates: list[date], values: list[float]) -> DecomposeResponse:
    """STL 분해. period=7 (주간 계절성). 입력 14일 이상 권장."""
    if len(values) != len(dates):
        raise ValueError("dates와 values 길이가 다릅니다")
    if len(values) < 14:
        raise ValueError("STL은 최소 14개 관측값이 필요합니다")

    arr = np.array(values, dtype=float)
    result = STL(arr, period=7, robust=True).fit()

    points = [
        DecomposePoint(
            date=dates[i],
            day=_DAY_KO[dates[i].weekday()],
            observed=float(arr[i]),
            trend=round(float(result.trend[i]), 2),
            seasonal=round(float(result.seasonal[i]), 2),
            residual=round(float(result.resid[i]), 2),
        )
        for i in range(len(arr))
    ]

    first_trend = points[0].trend
    last_trend = points[-1].trend
    change_pct = (
        round((last_trend - first_trend) / first_trend * 100, 1)
        if first_trend > 0
        else 0.0
    )

    return DecomposeResponse(
        points=points,
        trend_change_pct=change_pct,
        first_trend=first_trend,
        last_trend=last_trend,
        window_days=len(arr),
    )


def seed_series(start: date, n: int = 14) -> tuple[list[date], list[float]]:
    """데모용 14일치 시계열. 상승 트렌드 + 주중/주말 시즌 + 노이즈."""
    rng = np.random.default_rng(42)
    dates = [start + timedelta(days=i) for i in range(n)]
    trend = np.linspace(20, 30, n)
    seasonal = np.array([2 if d.weekday() in (0, 4) else -2 if d.weekday() in (5,) else 0 for d in dates])
    noise = rng.normal(0, 6, n)
    raw = trend + seasonal + noise
    values = [max(0, round(float(v), 1)) for v in raw]
    return dates, values
