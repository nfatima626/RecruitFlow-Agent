# RecruitFlow Agent

> **Automate the work. Preserve the judgment.**

**RecruitFlow Agent** is an AI-powered recruiting operations platform designed to help HR teams manage the journey from **job application to interview** without drowning in repetitive administrative work.

Instead of acting as another AI resume scorer, RecruitFlow uses an **agentic workflow** to understand job requirements, evaluate candidate evidence, identify missing information, communicate with candidates, maintain persistent candidate state, and recommend what should happen next.

The final hiring decision always remains with the **human recruiter**.

---

## The Problem

Recruiting involves far more than reviewing resumes.

HR teams often spend significant time manually:

- Creating and managing job listings
- Reviewing applications
- Comparing resumes with job requirements
- Identifying missing candidate information
- Sending follow-up emails
- Waiting for and tracking candidate responses
- Updating candidate statuses
- Coordinating interviews
- Sending interview confirmations
- Keeping candidate records organized

As applications grow, these operational tasks become repetitive, fragmented, and difficult to manage consistently.

Most recruitment AI tools focus on one question:

> **"How good is this resume?"**

RecruitFlow asks a much more useful question:

> **"What needs to happen next in this candidate's journey?"**

---

# Our Solution

RecruitFlow is designed as an **autonomous recruiting operations agent**.

The agent doesn't simply generate a score. It observes the current candidate state, evaluates available evidence, identifies what information is missing, and determines the next appropriate operational step.

### The core idea

**Candidate applies → Agent evaluates → Agent identifies gaps → Candidate provides missing information → Agent re-evaluates → HR reviews → HR decides → RecruitFlow handles the next operational actions**

This transforms recruitment from a collection of disconnected manual tasks into a coordinated workflow.

---

# The RecruitFlow Experience

RecruitFlow provides two dedicated experiences:

### Candidate Portal

A simple interface where candidates can:

- Browse available positions
- View job details
- Submit applications
- Upload resumes
- Provide required information
- Receive recruitment communications

### HR Dashboard

A professional workspace where HR can:

- Create job listings
- Edit job listings
- Delete job listings
- View all applications
- Filter and review candidates
- Open complete candidate profiles
- View AI evaluations
- Review supporting evidence
- See missing information
- See AI recommendations
- Select or reject candidates
- Track interview status
- Monitor the recruitment pipeline

The goal is simple:

> **Give HR more visibility and more control, while removing unnecessary manual work.**

---

# The Hero Workflow

```text
                    ┌──────────────────┐
                    │  Candidate Portal│
                    └────────┬─────────┘
                             │
                             ▼
                       Job Application
                             │
                             ▼
                 ┌──────────────────────┐
                 │   RecruitFlow Agent  │
                 └──────────┬───────────┘
                            │
                   Resume + Job Description
                            │
                            ▼
                    Evidence Evaluation
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          Missing Evidence       Sufficient Evidence
                 │                     │
                 ▼                     │
        Targeted Clarification        │
                 │                     │
                 ▼                     │
        Candidate Responds             │
                 │                     │
                 └──────────┬──────────┘
                            ▼
                      Re-evaluation
                            │
                            ▼
                    AI Recommendation
                            │
                            ▼
                      HR Dashboard
                            │
                            ▼
                    Human HR Decision
                       /         \
                      /           \
                 REJECT           SELECT
                    │                │
                    ▼                ▼
              Candidate        Interview Workflow
                Email                 │
                              ┌───────┴───────┐
                              ▼               ▼
                         Candidate Email    HR Email
What Makes RecruitFlow Agentic?

A traditional recruitment system might follow a fixed pipeline:

Resume → Score → Pass/Reject

RecruitFlow is designed to reason about the current state of a candidate and determine what information or action is required next:

Candidate State
      ↓
What do we know?
      ↓
What evidence is missing?
      ↓
What should happen next?
      ↓
Take action
      ↓
Wait for new information
      ↓
Update state
      ↓
Re-evaluate

This makes the system capable of handling recruitment as an ongoing process, rather than treating every candidate as a single request.

Intelligent Resume & Job Evaluation

RecruitFlow evaluates candidates against the specific role they applied for.

The evaluation considers:

Job Description
Required skills
Preferred skills
Company-defined evaluation criteria
Relevant experience
Evidence found in the resume
Candidate responses
Missing information
Unverified claims

The agent can identify:

Required Skill Evidence

What the candidate has actually demonstrated.

Missing Requirements

What cannot yet be confidently evaluated.

Unverified Claims

Claims that require additional information.

Relevant Experience

Experience directly related to the role.

Potential Strengths

Areas where the candidate may be particularly suitable.

Confidence

How confident the system is in its evaluation.

Recommendation

A recommendation for HR review.

Dynamic Missing-Evidence Detection

One of RecruitFlow's key capabilities is its ability to identify when the available information is not enough.

For example, suppose a role requires Kubernetes experience.

A candidate's resume says:

"Kubernetes"

But provides no meaningful evidence about how they used it.

Instead of making an unsupported assumption, RecruitFlow can recognize:

Kubernetes:
Insufficient evidence

The agent can then generate a targeted question such as:

"Can you describe a production deployment you managed using Kubernetes and the responsibilities you owned?"

The candidate responds.

The agent receives the new information, updates the candidate's state, and re-evaluates the candidate.

The result
Resume
   ↓
Evaluation
   ↓
Missing Evidence
   ↓
Targeted Question
   ↓
Candidate Reply
   ↓
State Update
   ↓
Re-evaluation

This is the difference between:

AI that scores candidates

and

AI that actively moves a workflow forward.

Human-in-the-Loop Hiring

RecruitFlow is intentionally designed so that AI does not replace HR judgment.

The system can:

Analyze
Reason
Find missing evidence
Ask questions
Maintain state
Recommend
Automate routine communication

But the final consequential decision remains with the recruiter.

             AI Evaluation
                   ↓
           AI Recommendation
                   ↓
              HR Review
                   ↓
          ┌────────┴────────┐
          ▼                 ▼
       SELECT             REJECT
          │
          ▼
   Automated Workflow

This means:

AI handles operational complexity. HR retains decision-making authority.

HR Dashboard

The HR Dashboard is the operational control center of RecruitFlow.

Overview

HR can quickly see:

Total jobs
Active jobs
Total applicants
Candidates under review
Candidates needing clarification
Interviews scheduled
Selected candidates
Rejected candidates
Job Management

HR can:

Create jobs
Edit jobs
Delete jobs
Activate/deactivate listings
View applicants for each position
Candidate Management

For each candidate, HR can access:

Candidate information
Resume
Applied position
Skills
Experience
Evidence
Missing requirements
Candidate responses
AI evaluation
AI recommendation
Confidence
Current status
Interview information

The dashboard is designed around one principle:

Everything HR needs should be visible in one place.

Candidate Portal

Candidates interact with a clean and focused application experience.

Browse Jobs
     ↓
Select Position
     ↓
Read Job Description
     ↓
Apply
     ↓
Upload Resume
     ↓
Submit Application
     ↓
Receive Updates

The candidate should never need to understand the complexity of the AI system operating behind the scenes.

Automated Interview Workflow

Once HR selects a candidate, RecruitFlow can automatically coordinate the next operational steps.

HR Selects Candidate
        ↓
Candidate Status Updated
        ↓
Interview Workflow Triggered
        ↓
Candidate Notified
        ↓
HR Notified
        ↓
Dashboard Updated

The system can send:

Candidate Email

Interview invitation and relevant interview information.

HR Email

Confirmation containing:

Candidate details
Position
Interview information
Candidate contact information
Current recruitment status

This reduces communication gaps and helps prevent scheduling confusion.

Persistent Candidate State

Recruitment is asynchronous.

A candidate might:

Apply today
Receive a clarification request tomorrow
Reply later
Be re-evaluated
Wait for HR review
Be selected
Move to an interview

RecruitFlow therefore maintains persistent candidate state.

A candidate can move through states such as:

APPLIED
   ↓
UNDER_REVIEW
   ↓
NEEDS_CLARIFICATION
   ↓
AWAITING_CANDIDATE_REPLY
   ↓
RE_EVALUATED
   ↓
HR_REVIEW
   ↓
INTERVIEW_SCHEDULED

Other outcomes include:

SELECTED
REJECTED

This allows the agent to resume a candidate journey without losing context.

Architecture
                         ┌────────────────────┐
                         │  Candidate Portal  │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │     Cloud Run      │
                         │    FastAPI API     │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │ Google ADK Agent   │
                         │ Recruiting         │
                         │ Coordinator        │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │       Gemini       │
                         │ AI Reasoning Layer │
                         └─────────┬──────────┘
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
                  ▼                ▼                ▼
             Firestore            GCS           Agent Tools
                  │                │                │
                  │             Resumes             │
                  │                                 ▼
                  │                                n8n
                  │                                 │
                  ▼                                 ▼
           Candidate State                        Gmail
                  │
                  ▼
            HR Dashboard
Technology Stack
Layer	Technology
AI	Google Gemini
Agent Framework	Google Agent Development Kit (ADK)
Backend	Python + FastAPI
Persistent State	Google Cloud Firestore
File Storage	Google Cloud Storage
Deployment	Google Cloud Run
Automation	n8n
Communication	Gmail
Candidate Frontend	Web Application
HR Frontend	HR Dashboard
Version Control	Git + GitHub
Agent Tools

RecruitFlow's central agent interacts with specialized tools rather than directly handling every operation itself.

Resume Analysis Tool

Compares:

Resume
+
Job Description
+
Evaluation Criteria

and produces structured candidate evidence.

State Tool

Reads and updates candidate state in Firestore.

Example state information includes:

candidate_status
evaluation
recommendation
confidence
missing_information
candidate_reply
interview_status
timestamps
Communication Tool

The agent can request external communication through n8n.

RecruitFlow Agent
       ↓
Communication Tool
       ↓
n8n Webhook
       ↓
Gmail
       ↓
Candidate / HR
Human Approval Tool

Consequential actions can pause for HR approval before continuing.

Agent Recommendation
        ↓
Human Approval
        ↓
HR Decision
        ↓
Workflow Continues
Why n8n?

n8n is used as the automation and integration layer, not as the intelligence layer.

The responsibilities are intentionally separated:

Google ADK + Gemini
        ↓
Reasoning & Agent Orchestration

Firestore
        ↓
Persistent Candidate State

n8n
        ↓
External Workflow Automation

Gmail
        ↓
Communication

This keeps the agent architecture modular and allows external actions to be changed without rebuilding the core reasoning system.

Structured AI Outputs

RecruitFlow is designed around structured AI outputs rather than fragile text parsing.

A conceptual evaluation can look like:

{
  "score": 85,
  "technical_score": 88,
  "behavioral_score": 80,
  "confidence": 0.91,
  "recommendation": "ADVANCE",
  "evidence": [],
  "missing_information": []
}

Structured outputs allow the backend and agent tools to reliably consume AI decisions and reduce dependence on regex-based parsing.

Responsible AI

Recruitment is a high-impact domain.

RecruitFlow therefore follows a human-in-the-loop design.

The system is intended to:

Surface evidence
Identify missing information
Make uncertainty visible
Provide confidence
Assist recruiters
Automate repetitive operations
Keep consequential decisions under human control

RecruitFlow is not designed around:

"Let AI hire people."

It is designed around:

"Let AI remove operational friction so recruiters can focus on better human decisions."

Security & Privacy

Recruitment systems handle sensitive candidate information.

RecruitFlow is designed with security and privacy in mind.

Key practices include:

Keep credentials out of source control
Protect environment variables
Use private cloud storage for resumes
Restrict access to HR functionality
Separate candidate and recruiter experiences
Avoid unnecessary exposure of candidate information
Use controlled service-to-service communication
Maintain clear candidate state and workflow history
Example: End-to-End Candidate Journey

Imagine a company publishes:

AI Engineer

Required skills:

Python
Machine Learning
FastAPI
Cloud Deployment
Kubernetes

A candidate applies.

1. Application

The candidate submits their resume through the Candidate Portal.

2. AI Evaluation

RecruitFlow analyzes the resume against the specific role.

Python              ✓ Evidence found
Machine Learning    ✓ Evidence found
FastAPI             ✓ Evidence found
Cloud Deployment    ✓ Evidence found
Kubernetes          ? Insufficient evidence
3. Missing Evidence

The agent determines that Kubernetes experience cannot be confidently evaluated.

4. Clarification

RecruitFlow sends a targeted question to the candidate.

5. Candidate Reply

The candidate provides additional information.

6. Re-evaluation

The agent updates the candidate state and evaluates the new evidence.

7. Recommendation

RecruitFlow generates a structured recommendation for HR.

8. HR Review

HR reviews the candidate profile, evidence, response, confidence, and recommendation.

9. Human Decision

HR selects the candidate.

10. Automated Operations

RecruitFlow updates the candidate state and triggers the appropriate interview communication workflow.

The candidate receives the relevant notification.

HR receives a confirmation.

The dashboard reflects the new status.

What RecruitFlow Automates
Recruitment Task	RecruitFlow
Job application intake	Automated
Resume analysis	AI-assisted
Resume + JD comparison	AI
Evidence extraction	AI
Missing evidence detection	Agent
Clarification questions	Agent
Candidate communication	Automated
Candidate state tracking	Automated
AI recommendation	AI
Final hiring decision	Human
Interview workflow	Automated
HR notifications	Automated
Project Structure
RecruitFlow-Agent/
│
├── app/
│   ├── main.py
│   ├── agent.py
│   ├── db.py
│   └── ...
│
├── requirements.txt
├── .env
├── credentials.json
├── README.md
└── ...

The architecture is being developed modularly so that agent logic, APIs, state management, tools, and frontend applications remain maintainable and independently testable.

Local Development
Prerequisites
Python
Google Cloud project
Gemini access
Google Cloud credentials
n8n instance for external automation
Clone
git clone <YOUR_REPOSITORY_URL>
cd RecruitFlow-Agent
Create Virtual Environment
python -m venv myenv
Activate on Windows
myenv\Scripts\activate
Install Dependencies
pip install -r requirements.txt
Environment Configuration

Create a .env file containing the required configuration.

Example:

GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=credentials.json

Never commit .env or private credentials to GitHub.

Run the API
uvicorn app.main:app --reload

The local API will be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs
Development Roadmap
Foundation
 Project repository
 FastAPI backend
 Local development environment
 Initial API foundation
 Initial database integration
Agent Intelligence
 Gemini integration
 Google ADK coordinator agent
 Structured evaluation schema
 Resume + JD analysis
 Evidence extraction
 Missing-evidence detection
Autonomous Workflow
 Dynamic clarification questions
 Candidate reply handling
 Persistent candidate state
 Re-evaluation loop
 Agent communication tools
 Human approval workflow
Product Experience
 Candidate Portal
 HR Dashboard
 Job management
 Candidate management
 AI recommendation interface
 Interview workflow
Cloud & Production
 Google Cloud Storage
 Cloud Run deployment
 Production n8n integration
 Reliability and idempotency
 Authentication and access control
 Observability and logging
 End-to-end testing
Design Principles
1. Automate the work

Routine operational tasks should require as little manual effort as possible.

2. Preserve human judgment

AI recommendations should support HR decisions, not replace them.

3. Evidence over assumptions

The system should distinguish between demonstrated skills, missing information, and unverified claims.

4. State over statelessness

Candidate journeys continue over time, so their state must persist.

5. Agentic behavior

The system should determine what needs to happen next instead of simply responding to individual prompts.

6. Clear separation of responsibilities

Reasoning, state, external actions, and user interfaces should remain modular.

7. Reliability matters

A recruitment system should not send duplicate emails, lose candidate state, or create inconsistent statuses.

The Vision

Recruiters should not have to spend their day chasing emails, updating spreadsheets, reviewing repetitive applications, and manually tracking every small step of the hiring process.

RecruitFlow is built around a simple vision:

The recruiter defines the hiring goal.

The agent manages the operational journey.

The recruiter remains in control of the decision.

RecruitFlow Agent

From application to interview, without losing the human in the loop.

Built With

Google Gemini
Google Agent Development Kit (ADK)
Google Cloud Firestore
Google Cloud Storage
Google Cloud Run
FastAPI
n8n
Gmail
GitHub

Hackathon

Built for the All Things Agentic Hackathon

Track

Taskmaster

Project Focus

An agent that takes ownership of a real-world operational workflow rather than simply answering questions.

Author

Noor Fatima

Software Engineering student and AI/Data Science builder focused on building practical, agentic systems that solve real-world problems.
