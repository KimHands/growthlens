"""In-memory store. 서버 재시작 시 seed로 다시 초기화."""
from datetime import date, timedelta
from uuid import uuid4

from app.schemas import Goal, RecordOut
from app.services.decompose import seed_series


class HabitRow:
    __slots__ = ("id", "name", "checks")

    def __init__(self, id: str, name: str) -> None:
        self.id = id
        self.name = name
        self.checks: set[date] = set()  # 완료된 날짜


class Store:
    def __init__(self) -> None:
        self.goal: Goal | None = None
        self.records: dict[date, RecordOut] = {}
        self.habits: dict[str, HabitRow] = {}
        self.seed()

    def seed(self) -> None:
        today = date.today()
        start = today - timedelta(days=13)
        self.goal = Goal(
            id="goal-1",
            title="매일 30분 글쓰기",
            unit="분",
            target=30,
            started_at=start,
            streak=11,
        )
        dates, values = seed_series(start, n=14)
        self.records = {
            d: RecordOut(id=str(uuid4()), date=d, value=v, note=None)
            for d, v in zip(dates, values)
        }
        # 기본 습관 3개 + 오늘 2개 체크된 상태
        self.habits = {}
        for name, checked_today in [
            ("글쓰기 30분", True),
            ("영단어 50개", True),
            ("운동 30분", False),
        ]:
            hid = str(uuid4())
            row = HabitRow(id=hid, name=name)
            if checked_today:
                row.checks.add(today)
            self.habits[hid] = row

    # Records --------------------------------------------------------

    def list_records(self) -> list[RecordOut]:
        return sorted(self.records.values(), key=lambda r: r.date)

    def upsert_record(self, d: date, value: float, note: str | None) -> RecordOut:
        existing = self.records.get(d)
        rec = RecordOut(
            id=existing.id if existing else str(uuid4()),
            date=d,
            value=value,
            note=note,
        )
        self.records[d] = rec
        return rec

    # Habits ---------------------------------------------------------

    def list_habits(self) -> list[HabitRow]:
        # 입력 순서 보존
        return list(self.habits.values())

    def add_habit(self, name: str) -> HabitRow:
        hid = str(uuid4())
        row = HabitRow(id=hid, name=name.strip())
        self.habits[hid] = row
        return row

    def delete_habit(self, hid: str) -> bool:
        return self.habits.pop(hid, None) is not None

    def toggle_habit(self, hid: str, d: date, done: bool | None) -> HabitRow | None:
        row = self.habits.get(hid)
        if row is None:
            return None
        currently = d in row.checks
        new_state = (not currently) if done is None else done
        if new_state:
            row.checks.add(d)
        else:
            row.checks.discard(d)
        return row


def week_count(row: HabitRow, today: date) -> int:
    """이번 주 (월요일 시작) 완료 횟수."""
    monday = today - timedelta(days=today.weekday())
    return sum(1 for c in row.checks if monday <= c <= today)


store = Store()
