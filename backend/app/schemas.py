from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel, Field


# ── Habits ────────────────────────────────────────────────────────────

class HabitIn(BaseModel):
    name: str = Field(min_length=1, max_length=40)


class Habit(BaseModel):
    id: str
    name: str
    done_today: bool
    done_this_week: int  # 이번 주 (월~일) 완료 횟수


class HabitToggleIn(BaseModel):
    date: Optional[date] = None  # 미지정시 오늘
    done: Optional[bool] = None  # 미지정시 toggle


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

    # 정밀 지표
    residual_std: float                  # 잔차 표준편차 = 일일 변동성
    seasonal_amplitude: float            # max(seasonal) - min(seasonal) — 시즌 진폭
    weekday_vs_weekend: float            # 평일 평균 obs - 주말 평균 obs
    trend_slope_per_day: float           # 트렌드 일평균 변화량
    trend_acceleration: float            # 최근 절반 기울기 - 첫 절반 기울기
    trend_variance_ratio: float          # trend 분산 / total 분산 ∈ [0,1]
    residual_max_abs: float              # 가장 큰 잔차의 절댓값
    days_to_target: int | None           # 현재 트렌드 + 기울기로 target 도달까지 남은 일 (없으면 None)
    target_eta_low: int | None           # 보수적 추정 (±1.5σ 고려)
    target_eta_high: int | None          # 낙관적 추정


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
