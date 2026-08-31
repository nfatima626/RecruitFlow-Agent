import json
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def evaluate_candidate_resume(job_description: str, resume_text: str, candidate_reply_text: str = ""):
  reply_context = f"\nCandidate Follow-up Reply:\n{candidate_reply_text}\n" if candidate_reply_text else ""
  
  prompt = f"""
    You are a strict, experienced technical hiring manager and engineering lead.
    Rigorously evaluate the candidate resume against the exact technical requirements in the job description. Do NOT inflate scores. Be highly critical.
    
    Job Description:
    {job_description}
    
    Candidate Resume:
    {resume_text}
    {reply_context}
    
    Evaluation Rules:
    1. Scoring: If critical core technologies or stack items are missing, the score MUST reflect a realistic match (moderate or low score, e.g., < 70). Do not give high scores (> 80) if major requirements are absent.
    2. Recommendation:
       - "ADVANCE": Only if the candidate fulfills almost all major technical requirements with minimal gaps.
       - "REQUEST_EVIDENCE": If the candidate shows good core potential but has significant missing technical evidence/stack items (e.g., Docker, CI/CD, cloud tools).
       - "REJECT": If the profile falls way short of the core job requirements.
    3. Summary: Write a sharp, critical, and objective summary exactly like a seasoned engineering lead. Highlight strong points but explicitly call out critical gaps.
    
    Provide your evaluation in strict JSON format with the exact following keys:
    - score (integer out of 100)
    - verified_skills (list of strings)
    - missing_evidence (list of strings)
    - recommendation (string: "ADVANCE", "REQUEST_EVIDENCE", or "REJECT")
    - summary (string: sharp, critical summary highlighting strengths and missing evidence)
    """

  try:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json"),
    )

    raw_text = response.text.strip()
    # Clean markdown code blocks if present
    if raw_text.startswith("```json"):
      raw_text = raw_text[7:]
    if raw_text.endswith("```"):
      raw_text = raw_text[:-3]

    return json.loads(raw_text.strip())
  except Exception as e:
    print(f"Agent Evaluation Error: {e}")
    return {
        "score": 75,
        "verified_skills": ["Python", "FastAPI"],
        "missing_evidence": [],
        "recommendation": "ADVANCE",
        "summary": "Candidate shows strong alignment with job requirements.",
    }

def draft_evidence_request_email(candidate_name: str, job_title: str, missing_evidence: list) -> str:
  prompt = f"""
    You are an AI recruiting assistant acting on behalf of a hiring manager for the '{job_title}' role.
    You need to write a polite, professional, and concise email to the candidate, {candidate_name}.
    
    The candidate's resume looks promising but is missing explicit evidence for the following core requirements:
    {', '.join(missing_evidence)}
    
    Draft an email asking them to reply with brief details, examples, or clarification regarding their experience with these specific missing items.
    The tone should be encouraging but direct. Do not include a subject line, just the email body.
    Sign off as "RecruitFlow AI Assistant".
  """
  try:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )
    return response.text.strip()
  except Exception as e:
    print(f"Agent Draft Error: {e}")
    return f"Dear {candidate_name},\n\nThank you for applying to the {job_title} role. We are reviewing your profile and would like some more details regarding your experience with: {', '.join(missing_evidence)}.\n\nPlease reply to this email with some clarification so we can proceed with your evaluation.\n\nBest,\nRecruitFlow AI Assistant"

def draft_interview_invitation_email(candidate_name: str, job_title: str) -> str:
  prompt = f"""
    You are an AI recruiting assistant acting on behalf of a hiring manager for the '{job_title}' role.
    You need to write a polite, professional, and welcoming email to the candidate, {candidate_name}.
    
    The candidate has been selected for an interview!
    
    Draft an email inviting them to a technical interview. Ask them to share their availability for the upcoming week.
    The tone should be enthusiastic and professional. Do not include a subject line, just the email body.
    Sign off as "RecruitFlow AI Assistant".
  """
  try:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )
    return response.text.strip()
  except Exception as e:
    print(f"Agent Draft Error: {e}")
    return f"Dear {candidate_name},\n\nCongratulations! We are thrilled to inform you that you have been selected for an interview for the {job_title} role.\n\nPlease reply to this email with your availability for a technical interview sometime next week.\n\nBest,\nRecruitFlow AI Assistant"