from datetime import date as date_t

from fastapi import APIRouter, HTTPException

from app.schemas import (
    DecomposeResponse,
    HomeSnapshot,
    InsightsResponse,
)
from app.services.decompose import decompose
from app.services.insights import build_insights
from app.store import store

router = APIRouter(prefix="/api", tags=["analysis"])


def _current_decomp() -> DecomposeResponse:
    recs = store.list_records()
    if len(recs) < 14:
        raise HTTPException(400, "STL 분해는 최소 14일치 기록이 필요합니다")
    return decompose([r.date for r in recs], [r.value for r in recs])


@router.get("/decompose", response_model=DecomposeResponse)
def get_decompose() -> DecomposeResponse:
    return _current_decomp()


@router.get("/insights", response_model=InsightsResponse)
def get_insights() -> InsightsResponse:
    decomp = _current_decomp()
    today_insight, past = build_insights(decomp, today=date_t.today())
    return InsightsResponse(today=today_insight, past=past)


@router.get("/home", response_model=HomeSnapshot)
def get_home() -> HomeSnapshot:
    """홈 화면용 단일 라운드트립 — goal + 오늘 인사이트 + 트렌드 + 시계열."""
    decomp = _current_decomp()
    today_insight, _ = build_insights(decomp, today=date_t.today())
    assert store.goal is not None
    return HomeSnapshot(
        goal=store.goal,
        today_insight=today_insight,
        trend_change_pct=decomp.trend_change_pct,
        series=decomp.points,
    )
