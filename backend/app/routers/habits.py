from datetime import date as date_t

from fastapi import APIRouter, Depends, HTTPException

from app.demo_mode import require_writable
from app.schemas import Habit, HabitIn, HabitToggleIn
from app.store import HabitRow, store, week_count

router = APIRouter(prefix="/api/habits", tags=["habits"])


def _to_dto(row: HabitRow, today: date_t) -> Habit:
    return Habit(
        id=row.id,
        name=row.name,
        done_today=today in row.checks,
        done_this_week=week_count(row, today),
    )


@router.get("", response_model=list[Habit])
def list_habits() -> list[Habit]:
    today = date_t.today()
    return [_to_dto(r, today) for r in store.list_habits()]


@router.post("", response_model=Habit, status_code=201, dependencies=[Depends(require_writable)])
def add_habit(payload: HabitIn) -> Habit:
    row = store.add_habit(payload.name)
    return _to_dto(row, date_t.today())


@router.delete("/{habit_id}", status_code=204, dependencies=[Depends(require_writable)])
def delete_habit(habit_id: str) -> None:
    if not store.delete_habit(habit_id):
        raise HTTPException(404, "habit not found")


@router.post("/{habit_id}/toggle", response_model=Habit, dependencies=[Depends(require_writable)])
def toggle_habit(habit_id: str, payload: HabitToggleIn) -> Habit:
    d = payload.date or date_t.today()
    row = store.toggle_habit(habit_id, d, payload.done)
    if row is None:
        raise HTTPException(404, "habit not found")
    return _to_dto(row, date_t.today())
