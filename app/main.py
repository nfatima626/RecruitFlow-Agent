from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.agent import evaluate_candidate_resume
from app.db import (
    create_job_listing,
    get_all_jobs,
    save_candidate_application,
    get_candidates_for_job,
    update_candidate_status
)
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="RecruitFlow Agent API", version="1.0.0")

# Request Models
class JobCreateRequest(BaseModel):
    title: str
    description: str

class CandidateApplyRequest(BaseModel):
    job_id: str
    candidate_name: str
    email: str
    resume_text: str

class StatusUpdateRequest(BaseModel):
    status: str  # SELECTED or REJECTED

@app.get("/")
def read_root():
    return {"status": "success", "message": "RecruitFlow Agent API with Firestore is running!"}

# --- HR Job Management Endpoints ---
@app.post("/api/jobs")
def api_create_job(payload: JobCreateRequest):
    try:
        job = create_job_listing(payload.title, payload.description)
        return {"status": "success", "job": job}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/jobs")
def api_get_jobs():
    try:
        jobs = get_all_jobs()
        return {"status": "success", "jobs": jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Candidate Application & AI Evaluation Endpoint ---
@app.post("/api/apply")
def api_apply_candidate(payload: CandidateApplyRequest):
    try:
        # 1. Fetch job description to evaluate against
        jobs = get_all_jobs()
        target_job = next((j for j in jobs if j["job_id"] == payload.job_id), None)
        
        if not target_job:
            raise HTTPException(status_code=404, detail="Job listing not found.")
        
        # 2. Run Gemini Evaluation Agent
        evaluation = evaluate_candidate_resume(target_job["description"], payload.resume_text)
        
        # 3. Save candidate application along with AI evaluation to Firestore
        saved_application = save_candidate_application(
            job_id=payload.job_id,
            candidate_name=payload.candidate_name,
            email=payload.email,
            resume_text=payload.resume_text,
            evaluation=evaluation
        )
        
        return {"status": "success", "application": saved_application}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- HR Dashboard Review Endpoints ---
@app.get("/api/jobs/{job_id}/candidates")
def api_get_candidates(job_id: str):
    try:
        candidates = get_candidates_for_job(job_id)
        return {"status": "success", "candidates": candidates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.patch("/api/candidates/{candidate_id}/status")
def api_update_status(candidate_id: str, payload: StatusUpdateRequest):
    try:
        success = update_candidate_status(candidate_id, payload.status)
        if not success:
            raise HTTPException(status_code=404, detail="Candidate not found.")
        return {"status": "success", "message": f"Candidate status updated to {payload.status}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))