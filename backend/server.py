from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="CloudScore API", version="1.0.0")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class DemoRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    role: Optional[str] = Field(default="", max_length=120)
    message: Optional[str] = Field(default="", max_length=2000)


class DemoRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""
    role: str = ""
    message: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {
        "service": "cloudscore-api",
        "status": "ok",
        "platform": "ASTRA",
        "agents": 16,
    }


@api_router.get("/stats")
async def stats():
    return {
        "median_mttr": "4m 12s",
        "cloud_waste_avoided_per_month_usd": 412000,
        "auto_remediated_pct": 63,
        "annual_savings_usd": 2_400_000,
        "services_observed": 214,
        "rca_confidence_pct": 94,
        "agents": 16,
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get("timestamp"), str):
            d["timestamp"] = datetime.fromisoformat(d["timestamp"])
    return docs


@api_router.post("/demo-requests", response_model=DemoRequest)
async def create_demo_request(payload: DemoRequestCreate):
    obj = DemoRequest(
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        company=(payload.company or "").strip(),
        role=(payload.role or "").strip(),
        message=(payload.message or "").strip(),
    )
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.demo_requests.insert_one(doc)
    except Exception as e:
        logging.error(f"Failed to save demo request: {e}")
        raise HTTPException(status_code=500, detail="Could not save request")
    return obj


@api_router.get("/demo-requests", response_model=List[DemoRequest])
async def list_demo_requests():
    docs = await db.demo_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
