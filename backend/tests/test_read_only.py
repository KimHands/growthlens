import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

WRITE_REQUESTS = [
    ("POST", "/api/records", {"date": "2026-11-04", "value": 20}),
    ("POST", "/api/habits", {"name": "새 습관"}),
    ("DELETE", "/api/habits/any-id", None),
    ("POST", "/api/habits/any-id/toggle", {}),
]


@pytest.mark.parametrize("method,path,body", WRITE_REQUESTS)
def test_writes_are_blocked_by_default(monkeypatch, method, path, body):
    monkeypatch.delenv("DEMO_READ_ONLY", raising=False)
    assert client.request(method, path, json=body).status_code == 403


def test_blocked_write_keeps_shared_data(monkeypatch):
    monkeypatch.delenv("DEMO_READ_ONLY", raising=False)
    before = client.get("/api/habits").json()
    client.post("/api/habits", json={"name": "새 습관"})
    assert client.get("/api/habits").json() == before


def test_writes_work_when_read_only_is_off(monkeypatch):
    monkeypatch.setenv("DEMO_READ_ONLY", "false")
    created = client.post("/api/habits", json={"name": "새 습관"})
    assert created.status_code == 201
    assert client.delete(f"/api/habits/{created.json()['id']}").status_code == 204


@pytest.mark.parametrize(
    "path",
    ["/health", "/api/home", "/api/decompose", "/api/insights", "/api/records", "/api/habits"],
)
def test_reads_stay_open(monkeypatch, path):
    monkeypatch.delenv("DEMO_READ_ONLY", raising=False)
    assert client.get(path).status_code == 200
