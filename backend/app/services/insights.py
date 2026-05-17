from datetime import date

from app.schemas import DecomposeResponse, Insight


def build_insights(
    decomp: DecomposeResponse,
    today: date,
    unit: str = "분",
) -> tuple[Insight, list[Insight]]:
    """STL 분해 결과 → 오늘의 인사이트 + 과거 인사이트.

    판정 기준 (우선순위 순):
    1. 트렌드 상승 중인데 최근 3일 obs가 trend 아래 → "흔들렸지만 흐름은 상승"
    2. 트렌드 가속 (acceleration > 0.1) → "성장이 빨라지고 있어요"
    3. 트렌드 상승 (slope > 0) → "꾸준한 상승"
    4. 트렌드 하락 (slope < 0) → "흐름 자체가 약해지고 있어요"
    5. 평탄 → "평탄한 구간"
    """
    last3 = decomp.points[-3:]
    last3_avg_obs = sum(p.observed for p in last3) / 3
    last3_avg_trend = sum(p.trend for p in last3) / 3
    weekly_growth = decomp.trend_slope_per_day * 7

    is_rising = decomp.trend_slope_per_day > 0.05
    is_accelerating = decomp.trend_acceleration > 0.05
    is_falling = decomp.trend_slope_per_day < -0.05
    last3_below_trend = last3_avg_obs < last3_avg_trend - decomp.residual_std * 0.5

    today_insight = _build_today(
        decomp=decomp,
        today=today,
        unit=unit,
        weekly_growth=weekly_growth,
        is_rising=is_rising,
        is_accelerating=is_accelerating,
        is_falling=is_falling,
        last3_below_trend=last3_below_trend,
    )

    past = _build_past(decomp=decomp, unit=unit)
    return today_insight, past


def _build_today(
    decomp: DecomposeResponse,
    today: date,
    unit: str,
    weekly_growth: float,
    is_rising: bool,
    is_accelerating: bool,
    is_falling: bool,
    last3_below_trend: bool,
) -> Insight:
    # Case 1: 흔들렸지만 흐름은 상승
    if is_rising and last3_below_trend:
        return Insight(
            id="trend-rising-noise",
            title="최근 며칠은 흔들렸지만, 흐름은 분명히 상승 중이에요",
            body=(
                f"노이즈를 걷어낸 트렌드는 지난 {decomp.window_days}일 동안 "
                f"+{decomp.trend_change_pct}% 상승했고, 매주 약 "
                f"{abs(weekly_growth):.1f}{unit}씩 늘고 있어요. "
                f"최근 3일이 평균보다 낮아 보이는 건 평균 변동량 "
                f"±{decomp.residual_std:.1f}{unit} 범위 안의 자연스러운 흔들림입니다."
            ),
            tag="trend-up",
            emoji="📈",
            created_at=today,
        )

    # Case 2: 가속
    if is_rising and is_accelerating:
        return Insight(
            id="trend-accelerating",
            title="성장 속도가 점점 빨라지고 있어요",
            body=(
                f"트렌드 기울기가 전반기보다 +{decomp.trend_acceleration:.2f} 더 가팔라졌어요. "
                f"지금 페이스라면 매주 {abs(weekly_growth):.1f}{unit}씩 늘어요."
            ),
            tag="trend-up",
            emoji="🚀",
            created_at=today,
        )

    # Case 3: 꾸준한 상승
    if is_rising:
        return Insight(
            id="trend-rising",
            title=f"꾸준한 상승 — 지난 {decomp.window_days}일 +{decomp.trend_change_pct}%",
            body=(
                f"잔잔한 진행이에요. 매주 약 {abs(weekly_growth):.1f}{unit}씩 늘고 있고, "
                f"트렌드가 데이터 변동의 {decomp.trend_variance_ratio * 100:.0f}%를 "
                f"설명합니다. 지금 페이스를 유지하세요."
            ),
            tag="trend-up",
            emoji="✨",
            created_at=today,
        )

    # Case 4: 트렌드 하락
    if is_falling:
        return Insight(
            id="trend-down",
            title="흐름 자체가 약해지고 있어요",
            body=(
                f"단순 흔들림이 아니라 트렌드가 {decomp.trend_change_pct}% 빠졌습니다. "
                f"매주 약 {abs(weekly_growth):.1f}{unit}씩 감소 중이에요. "
                "수면/컨디션 등 환경 변수를 한 번 점검해 보세요."
            ),
            tag="trend-down",
            emoji="📉",
            created_at=today,
        )

    # Case 5: 평탄
    return Insight(
        id="steady",
        title="평탄한 구간이에요",
        body=(
            f"트렌드 변화 {decomp.trend_change_pct}%, 변동량 "
            f"±{decomp.residual_std:.1f}{unit}. 보통은 다음 도약 전의 정체기예요. "
            "강도보다 빈도를 유지하세요."
        ),
        tag="noise",
        emoji="🌊",
        created_at=today,
    )


def _build_past(decomp: DecomposeResponse, unit: str) -> list[Insight]:
    """과거 인사이트 — 시즌 패턴 / 큰 변동 / 마일스톤 휴리스틱."""
    past: list[Insight] = []

    # 1) 주중/주말 패턴 (시즌 진폭이 크고 평일/주말 차이가 명확할 때)
    if (
        decomp.seasonal_amplitude >= 3
        and abs(decomp.weekday_vs_weekend) >= 3
    ):
        is_weekday_high = decomp.weekday_vs_weekend > 0
        past.append(
            Insight(
                id="weekly-pattern",
                title=(
                    "주중이 주말보다 더 강한 패턴이에요"
                    if is_weekday_high
                    else "주말에 더 집중하는 패턴이에요"
                ),
                body=(
                    f"평일과 주말 평균 차이 {abs(decomp.weekday_vs_weekend):.1f}{unit}, "
                    f"시즌 진폭 {decomp.seasonal_amplitude:.1f}{unit}. "
                    f"{decomp.window_days}일 내내 반복되는 주간 리듬이에요. "
                    "의지 문제가 아닙니다."
                ),
                tag="noise",
                emoji="🌊",
                created_at=decomp.points[-4].date,
            )
        )

    # 2) 큰 잔차 (단발성 outlier)
    if decomp.residual_max_abs >= decomp.residual_std * 2:
        outlier = max(decomp.points, key=lambda p: abs(p.residual))
        direction = "위로" if outlier.residual > 0 else "아래로"
        past.append(
            Insight(
                id="recent-outlier",
                title=f"{outlier.date.strftime('%m/%d')} ({outlier.day})에 큰 일회성 변동이 있었어요",
                body=(
                    f"평소 변동량 ±{decomp.residual_std:.1f}{unit} 대비 "
                    f"{abs(outlier.residual):.1f}{unit} {direction} 튀었습니다. "
                    "트렌드는 그대로니 흐름은 흔들리지 않았어요."
                ),
                tag="noise",
                emoji="〰️",
                created_at=outlier.date,
            )
        )

    # 3) 트렌드가 데이터의 대부분을 설명 = 매우 안정적
    if decomp.trend_variance_ratio >= 0.7:
        past.append(
            Insight(
                id="stable-trend",
                title="놀라울 만큼 일관된 페이스예요",
                body=(
                    f"트렌드가 데이터 변동의 "
                    f"{decomp.trend_variance_ratio * 100:.0f}%를 설명합니다. "
                    "노이즈가 거의 없는 안정적인 패턴이에요."
                ),
                tag="trend-up",
                emoji="🎯",
                created_at=decomp.points[-2].date,
            )
        )

    return past
