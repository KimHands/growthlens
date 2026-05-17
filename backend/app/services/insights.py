from datetime import date

from app.schemas import DecomposeResponse, Insight


def build_insights(decomp: DecomposeResponse, today: date) -> tuple[Insight, list[Insight]]:
    """분해 결과로부터 오늘의 인사이트 + 과거 인사이트 생성."""
    last3 = decomp.points[-3:]
    last3_avg_obs = sum(p.observed for p in last3) / len(last3)
    last3_avg_trend = sum(p.trend for p in last3) / len(last3)
    last3_residual_range = (
        max(p.residual for p in last3) - min(p.residual for p in last3)
    )
    weekly_growth = (decomp.last_trend - decomp.first_trend) / decomp.window_days * 7

    # 오늘의 인사이트 - 트렌드 vs 최근 관측의 괴리로 판정
    if decomp.trend_change_pct >= 5 and last3_avg_obs < last3_avg_trend:
        today_insight = Insight(
            id="trend-rising-noise",
            title="최근 3일은 흔들렸지만, 흐름은 분명히 상승 중이에요",
            body=(
                f"겉으로 보이는 기록은 들쭉날쭉해 보여도, 노이즈를 걷어낸 트렌드는 지난 "
                f"{decomp.window_days}일 동안 +{decomp.trend_change_pct}% 상승했어요. "
                f"매주 약 {abs(weekly_growth):.1f}만큼 늘고 있어요."
            ),
            tag="trend-up",
            emoji="📈",
            created_at=today,
        )
    elif decomp.trend_change_pct >= 5:
        today_insight = Insight(
            id="trend-rising",
            title=f"꾸준한 상승 — 지난 {decomp.window_days}일 +{decomp.trend_change_pct}%",
            body=(
                f"잔잔한 진행이에요. 매주 약 {abs(weekly_growth):.1f}만큼 늘고 있어요. "
                "지금 페이스를 유지하세요."
            ),
            tag="trend-up",
            emoji="✨",
            created_at=today,
        )
    elif decomp.trend_change_pct <= -5:
        today_insight = Insight(
            id="trend-down",
            title="흐름 자체가 약해지고 있어요",
            body=(
                f"단순한 흔들림이 아니라 트렌드 자체가 {decomp.trend_change_pct}% 빠졌습니다. "
                "이번 주는 환경 변수(수면, 컨디션)를 한 번 점검해 보세요."
            ),
            tag="trend-down",
            emoji="📉",
            created_at=today,
        )
    else:
        today_insight = Insight(
            id="steady",
            title="평탄한 구간이에요",
            body=(
                f"트렌드 변화 {decomp.trend_change_pct}%로 평이한 구간. "
                "보통은 다음 도약 전의 정체기예요. 강도보다는 빈도를 유지하세요."
            ),
            tag="noise",
            emoji="🌊",
            created_at=today,
        )

    # 과거 인사이트 - 휴리스틱으로 2개
    past: list[Insight] = []
    weekend_days = [p for p in decomp.points if p.day in ("토", "일")]
    weekday_days = [p for p in decomp.points if p.day not in ("토", "일")]
    if weekend_days and weekday_days:
        avg_wknd = sum(p.observed for p in weekend_days) / len(weekend_days)
        avg_wkdy = sum(p.observed for p in weekday_days) / len(weekday_days)
        if abs(avg_wknd - avg_wkdy) >= 3:
            past.append(
                Insight(
                    id="weekend-pattern",
                    title=(
                        "주말이 평일보다 낮은 패턴이 보여요"
                        if avg_wknd < avg_wkdy
                        else "주말에 더 집중하는 패턴이에요"
                    ),
                    body=(
                        f"평일 평균 {avg_wkdy:.1f}, 주말 평균 {avg_wknd:.1f}. "
                        f"{decomp.window_days}일 내내 반복되는 주간 리듬입니다. "
                        "의지 문제가 아니에요."
                    ),
                    tag="noise",
                    emoji="🌊",
                    created_at=decomp.points[-4].date,
                )
            )

    if last3_residual_range >= 15:
        past.append(
            Insight(
                id="recent-volatility",
                title="최근 3일 변동이 평소보다 컸어요",
                body=(
                    f"잔차 폭 {last3_residual_range:.1f}. 평균 변동량보다 큽니다. "
                    "다만 트렌드는 그대로니 흐름은 흔들리지 않았어요."
                ),
                tag="noise",
                emoji="〰️",
                created_at=decomp.points[-2].date,
            )
        )

    return today_insight, past
