import os
from google.cloud import firestore
from google.oauth2 import service_account
from dotenv import load_dotenv

load_dotenv()

# Explicitly load the service account credentials and project ID
CRED_PATH = "credentials.json"
PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "recruitflow-agent-507110")

if os.path.exists(CRED_PATH):
    credentials = service_account.Credentials.from_service_account_file(CRED_PATH)
    db = firestore.Client(credentials=credentials, project=PROJECT_ID)
else:
    db = firestore.Client(project=PROJECT_ID)

def create_job_listing(title: str, description: str):
    doc_ref = db.collection("jobs").document()
    job_data = {
        "job_id": doc_ref.id,
        "title": title,
        "description": description,
    }
    doc_ref.set(job_data)
    return job_data

def get_all_jobs():
    jobs_ref = db.collection("jobs").stream()
    return [job.to_dict() for job in jobs_ref]

def save_candidate_application(job_id: str, candidate_name: str, email: str, resume_text: str, evaluation: dict):
    doc_ref = db.collection("candidates").document()
    candidate_data = {
        "candidate_id": doc_ref.id,
        "job_id": job_id,
        "candidate_name": candidate_name,
        "email": email,
        "resume_text": resume_text,
        "evaluation": evaluation,
        "status": "PENDING"  # PENDING, SELECTED, REJECTED
    }
    doc_ref.set(candidate_data)
    return candidate_data

def get_candidates_for_job(job_id: str):
    candidates_ref = db.collection("candidates").where("job_id", "==", job_id).stream()
    return [c.to_dict() for c in candidates_ref]

def update_candidate_status(candidate_id: str, status: str):
    # status can be 'SELECTED' or 'REJECTED'
    candidates_ref = db.collection("candidates").where("candidate_id", "==", candidate_id).stream()
    for doc in candidates_ref:
        doc.reference.update({"status": status})
        return True
    return False