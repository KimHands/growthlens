from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel, Field


# ── Records ────────────────────────────────────────────────────────────

class RecordIn(BaseModel):
    date: date
    value: float = Field(ge=0)
    note: Optional[str] = None


class RecordOut(RecordIn):
    id: str


# ── Goal ──────────────────────────────────────────────────────────────

class Goal(BaseModel):
    id: str
    title: str
    unit: str
    target: float
    started_at: date
    streak: int


# ── Decomposition ─────────────────────────────────────────────────────

class DecomposePoint(BaseModel):
    date: date
    day: str
    observed: float
    trend: float
    seasonal: float
    residual: float


class DecomposeResponse(BaseModel):
    points: list[DecomposePoint]
    trend_change_pct: float
    first_trend: float
    last_trend: float
    window_days: int


# ── Insights ──────────────────────────────────────────────────────────

InsightTag = Literal["trend-up", "trend-down", "noise", "milestone"]


class Insight(BaseModel):
    id: str
    title: str
    body: str
    tag: InsightTag
    emoji: str
    created_at: date


class InsightsResponse(BaseModel):
    today: Insight
    past: list[Insight]


# ── Home aggregate (one round-trip) ───────────────────────────────────

class HomeSnapshot(BaseModel):
    goal: Goal
    today_insight: Insight
    trend_change_pct: float
    series: list[DecomposePoint]
