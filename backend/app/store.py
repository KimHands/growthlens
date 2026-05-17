"""In-memory store. 서버 재시작 시 seed로 다시 초기화."""
from datetime import date, timedelta
from uuid import uuid4

from app.schemas import Goal, RecordOut
from app.services.decompose import seed_series


class Store:
    def __init__(self) -> None:
        self.goal: Goal | None = None
        self.records: dict[date, RecordOut] = {}
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


store = Store()
