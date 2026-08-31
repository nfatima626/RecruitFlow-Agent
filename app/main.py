from typing import Optional
import os
import asyncio
import pdfplumber
import tempfile
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Form, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.agent import evaluate_candidate_resume, draft_evidence_request_email
from app.email_service import send_evidence_request_email, check_for_replies
from app.db import (
    create_job_listing,
    get_all_jobs,
    delete_job_listing,
    update_job_listing,
    save_candidate_application,
    get_candidates_for_job,
    update_candidate_status,
    delete_candidate,
)

load_dotenv()

app = FastAPI(title="RecruitFlow Agent API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    async def poll_emails_loop():
        while True:
            try:
                await asyncio.to_thread(check_for_replies)
            except Exception as e:
                print(f"Error checking emails: {e}")
            await asyncio.sleep(300) # Poll every 5 minutes
            
    asyncio.create_task(poll_emails_loop())


# Request Models
class JobCreateRequest(BaseModel):
  title: str
  description: str
  department: Optional[str] = ""
  location: Optional[str] = ""
  employment_type: Optional[str] = ""


class JobUpdateRequest(BaseModel):
  title: Optional[str] = None
  description: Optional[str] = None
  department: Optional[str] = None
  location: Optional[str] = None
  employment_type: Optional[str] = None


class StatusUpdateRequest(BaseModel):
  status: str  # SELECTED or REJECTED


@app.get("/")
def read_root():
  return {
      "status": "success",
      "message": "RecruitFlow Agent API with Firestore is running!",
  }

def handle_evidence_request(candidate_name, to_email, job_title, missing_evidence, candidate_id):
    try:
        body = draft_evidence_request_email(candidate_name, job_title, missing_evidence)
        subject = f"Action Required: Your Application for {job_title}"
        send_evidence_request_email(to_email, subject, body, candidate_id)
    except Exception as e:
        print(f"Error in evidence request task: {e}")



# --- HR Job Management Endpoints ---
@app.post("/api/jobs")
def api_create_job(payload: JobCreateRequest):
  try:
    job = create_job_listing(
        payload.title,
        payload.description,
        payload.department,
        payload.location,
        payload.employment_type,
    )
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


@app.put("/api/jobs/{job_id}")
def api_update_job(job_id: str, payload: JobUpdateRequest):
  try:
    data_to_update = {k: v for k, v in payload.dict().items() if v is not None}
    updated_job = update_job_listing(job_id, data_to_update)
    if not updated_job:
      raise HTTPException(status_code=404, detail="Job not found.")
    return {"status": "success", "job": updated_job}
  except HTTPException as e:
    raise e
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/jobs/{job_id}")
def api_delete_job(job_id: str):
  try:
    success = delete_job_listing(job_id)
    if not success:
      raise HTTPException(status_code=404, detail="Job not found.")
    return {"status": "success", "message": "Job deleted successfully."}
  except HTTPException as e:
    raise e
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


# --- Candidate Application & AI Evaluation Endpoint ---
@app.post("/api/apply")
async def api_apply_candidate(
    background_tasks: BackgroundTasks,
    job_id: str = Form(...),
    candidate_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(""),
    linkedin: str = Form(""),
    portfolio: str = Form(""),
    years_experience: str = Form(""),
    current_company: str = Form(""),
    desired_role: str = Form(""),
    why_join: str = Form(""),
    resume: UploadFile = File(...),
):
  try:
    # 1. Fetch job description to evaluate against
    jobs = get_all_jobs()
    target_job = next((j for j in jobs if j["job_id"] == job_id), None)

    if not target_job:
      raise HTTPException(status_code=404, detail="Job listing not found.")

    # 2. Extract Text from PDF
    resume_text = ""
    # Write to temporary file
    fd, temp_path = tempfile.mkstemp()
    try:
      with os.fdopen(fd, "wb") as f:
        f.write(await resume.read())

      if resume.filename.lower().endswith(".pdf"):
        with pdfplumber.open(temp_path) as pdf:
          for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
              resume_text += page_text + "\n"
      else:
        # Try decoding as plain text if not PDF
        with open(temp_path, "r", encoding="utf-8", errors="ignore") as f:
          resume_text = f.read()
    finally:
      os.remove(temp_path)

    if not resume_text.strip():
      raise HTTPException(
          status_code=400,
          detail="Could not extract text from the provided resume file.",
      )

    # 3. Run Gemini Evaluation Agent
    evaluation = evaluate_candidate_resume(
        target_job["description"], resume_text
    )

    # 4. Save candidate application
    saved_application = save_candidate_application(
        job_id=job_id,
        candidate_name=candidate_name,
        email=email,
        phone=phone,
        linkedin=linkedin,
        portfolio=portfolio,
        years_experience=years_experience,
        current_company=current_company,
        desired_role=desired_role,
        why_join=why_join,
        resume_text=resume_text,
        evaluation=evaluation,
    )

    if evaluation.get("recommendation") == "REQUEST_EVIDENCE":
        background_tasks.add_task(
            handle_evidence_request,
            candidate_name,
            email,
            target_job["title"],
            evaluation.get("missing_evidence", []),
            saved_application["candidate_id"]
        )

    return {"status": "success", "application": saved_application}
  except Exception as e:
    print(f"Error applying candidate: {e}")
    raise HTTPException(status_code=500, detail=str(e))


# --- HR Dashboard Review & Management Endpoints ---
@app.post("/api/admin/poll-emails")
def api_admin_poll_emails():
  try:
    check_for_replies()
    return {"status": "success", "message": "Manual IMAP poll executed."}
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

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
    return {
        "status": "success",
        "message": f"Candidate status updated to {payload.status}",
    }
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/candidates/{candidate_id}")
def api_delete_candidate(candidate_id: str):
  try:
    success = delete_candidate(candidate_id)
    if not success:
      raise HTTPException(status_code=404, detail="Candidate not found.")
    return {"status": "success", "message": "Candidate deleted successfully."}
  except HTTPException as e:
    raise e
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))