import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

def evaluate_candidate_resume(job_description: str, resume_text: str):
    prompt = f"""
    You are an autonomous recruiting operations agent. 
    Analyze the candidate resume against the given job description.
    
    Job Description:
    {job_description}
    
    Candidate Resume:
    {resume_text}
    
    Provide your evaluation in strict JSON format with the following keys:
    - score (integer out of 100)
    - verified_skills (list of strings)
    - missing_evidence (list of strings)
    - recommendation (string: "ADVANCE" or "REQUEST_EVIDENCE" or "REJECT")
    - feedback (short summary string)
    """
    
    response = client.models.generate_content(
        model='gemini-3.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        ),
    )
    
    try:
        return json.loads(response.text)
    except Exception:
        return {"raw_output": response.text}