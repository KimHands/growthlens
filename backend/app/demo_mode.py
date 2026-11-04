import os

from fastapi import HTTPException


def require_writable() -> None:
    """공개 데모는 모든 방문자가 저장소를 공유하므로 기본값으로 쓰기를 막는다."""
    if os.environ.get("DEMO_READ_ONLY", "true").lower() != "false":
        raise HTTPException(403, "데모에서는 데이터를 변경할 수 없습니다")
