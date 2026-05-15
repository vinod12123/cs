"""CloudScore API tests - root, stats, demo-requests CRUD."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://cloud-agent-ui-1.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/ ----------
class TestRoot:
    def test_root_status(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        d = r.json()
        assert d["service"] == "cloudscore-api"
        assert d["status"] == "ok"
        assert d["agents"] == 16
        assert d["platform"] == "ASTRA"


# ---------- /api/stats ----------
class TestStats:
    def test_stats_payload(self, client):
        r = client.get(f"{API}/stats")
        assert r.status_code == 200
        d = r.json()
        assert d["median_mttr"] == "4m 12s"
        assert d["cloud_waste_avoided_per_month_usd"] == 412000
        assert d["auto_remediated_pct"] == 63
        assert d["agents"] == 16
        assert isinstance(d["annual_savings_usd"], int)


# ---------- /api/demo-requests ----------
class TestDemoRequests:
    def test_create_minimal_valid(self, client):
        payload = {"name": "TEST_User", "email": "test_user@example.com"}
        r = client.post(f"{API}/demo-requests", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "id" in d and isinstance(d["id"], str) and len(d["id"]) > 0
        assert "created_at" in d
        assert d["name"] == "TEST_User"
        assert d["email"] == "test_user@example.com"
        assert d["company"] == ""
        # No mongo _id leaked
        assert "_id" not in d

    def test_create_full_payload(self, client):
        payload = {
            "name": "TEST_Full",
            "email": "TEST_full@Example.COM",
            "company": "TEST_Corp",
            "role": "SRE",
            "message": "hello",
        }
        r = client.post(f"{API}/demo-requests", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        # email lowercased per backend
        assert d["email"] == "test_full@example.com"
        assert d["company"] == "TEST_Corp"
        assert d["role"] == "SRE"
        assert d["message"] == "hello"
        assert "_id" not in d

    def test_invalid_email_returns_422(self, client):
        r = client.post(f"{API}/demo-requests", json={"name": "X", "email": "not-an-email"})
        assert r.status_code == 422

    def test_missing_name_returns_422(self, client):
        r = client.post(f"{API}/demo-requests", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_missing_email_returns_422(self, client):
        r = client.post(f"{API}/demo-requests", json={"name": "x"})
        assert r.status_code == 422

    def test_empty_name_returns_422(self, client):
        r = client.post(f"{API}/demo-requests", json={"name": "", "email": "a@b.com"})
        assert r.status_code == 422

    def test_list_demo_requests(self, client):
        # create one to ensure non-empty
        client.post(f"{API}/demo-requests", json={"name": "TEST_List", "email": "test_list@example.com"})
        r = client.get(f"{API}/demo-requests")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        for item in items:
            assert "_id" not in item
            assert "id" in item
            assert "name" in item
            assert "email" in item
            assert "created_at" in item
        emails = [i["email"] for i in items]
        assert "test_list@example.com" in emails
