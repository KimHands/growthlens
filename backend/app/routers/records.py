from fastapi import APIRouter

from app.schemas import RecordIn, RecordOut
from app.store import store

router = APIRouter(prefix="/api/records", tags=["records"])


@router.get("", response_model=list[RecordOut])
def list_records() -> list[RecordOut]:
    return store.list_records()


@router.post("", response_model=RecordOut)
def upsert_record(payload: RecordIn) -> RecordOut:
    return store.upsert_record(payload.date, payload.value, payload.note)
