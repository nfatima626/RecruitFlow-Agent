import os
import smtplib
import imaplib
import email
from email.message import EmailMessage
import re
from app.db import get_candidate_by_id, get_job_by_id, update_candidate_evaluation
from app.agent import evaluate_candidate_resume

def send_evidence_request_email(to_email: str, subject: str, body: str, candidate_id: str):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("EMAIL_USER")
    smtp_pass = os.getenv("EMAIL_PASS")
    
    if not smtp_user or not smtp_pass:
        print("Skipping email send: EMAIL_USER or EMAIL_PASS not configured.")
        return
        
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = f"{subject} [Ref: {candidate_id}]"
    msg['From'] = smtp_user
    msg['To'] = to_email

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        print(f"Follow-up email sent to {to_email} for candidate {candidate_id}")
    except Exception as e:
        print(f"Failed to send email: {e}")

def send_interview_invitation_email(to_email: str, subject: str, body: str, candidate_id: str, cc_email: str = None):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("EMAIL_USER")
    smtp_pass = os.getenv("EMAIL_PASS")
    
    if not smtp_user or not smtp_pass:
        print("Skipping email send: EMAIL_USER or EMAIL_PASS not configured.")
        return
        
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = f"{subject} [Ref: {candidate_id}]"
    msg['From'] = smtp_user
    msg['To'] = to_email
    if cc_email:
        msg['Cc'] = cc_email

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        print(f"Interview invitation email sent to {to_email} for candidate {candidate_id}")
    except Exception as e:
        print(f"Failed to send interview email: {e}")

def get_email_body(msg):
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition"))
            if content_type == "text/plain" and "attachment" not in content_disposition:
                return part.get_payload(decode=True).decode()
    else:
        return msg.get_payload(decode=True).decode()
    return ""

def check_for_replies():
    imap_server = os.getenv("IMAP_SERVER", "imap.gmail.com")
    imap_user = os.getenv("EMAIL_USER")
    imap_pass = os.getenv("EMAIL_PASS")
    
    if not imap_user or not imap_pass:
        return

    try:
        mail = imaplib.IMAP4_SSL(imap_server)
        mail.login(imap_user, imap_pass)
        mail.select("inbox")
        
        status, messages = mail.search(None, "UNSEEN")
        if status != "OK" or not messages[0]:
            mail.logout()
            return
            
        for num in messages[0].split():
            status, data = mail.fetch(num, "(RFC822)")
            if status != "OK":
                continue
                
            raw_email = data[0][1]
            msg = email.message_from_bytes(raw_email)
            subject = msg["Subject"]
            
            # Extract Ref ID
            match = re.search(r"\[Ref: (.*?)\]", str(subject))
            if not match:
                continue
                
            candidate_id = match.group(1)
            body = get_email_body(msg)
            
            print(f"Processing IMAP reply for candidate {candidate_id}")
            process_candidate_reply(candidate_id, body)
            
        mail.logout()
    except Exception as e:
        print(f"IMAP check error: {e}")

def process_candidate_reply(candidate_id: str, reply_text: str):
    candidate = get_candidate_by_id(candidate_id)
    if not candidate:
        print(f"Candidate {candidate_id} not found during reply processing.")
        return
        
    job = get_job_by_id(candidate["job_id"])
    if not job:
        print(f"Job {candidate['job_id']} not found.")
        return
        
    resume_text = candidate.get("resume_text", "")
    new_eval = evaluate_candidate_resume(job["description"], resume_text, reply_text)
    
    # Update evaluation and set status based on new recommendation
    new_status = candidate.get("status", "PENDING")
    if new_eval.get("recommendation") == "REJECT":
        new_status = "REJECTED"
    elif new_eval.get("recommendation") == "ADVANCE":
        new_status = "SELECTED"
        
    update_candidate_evaluation(candidate_id, new_eval, new_status)
    print(f"Candidate {candidate_id} re-evaluated. New Status: {new_status}")
