RecruitFlow Agent

Automate the work. Preserve the judgment.

RecruitFlow Agent is an AI-powered recruiting operations platform designed to help HR teams manage the complete candidate journey, from job application to interview, while keeping the final hiring decision in human hands.

Instead of being just another AI resume screening tool, RecruitFlow acts as an intelligent recruiting operations agent. It analyzes job requirements and candidate evidence, identifies missing information, asks targeted follow-up questions, maintains candidate state, communicates with candidates, and recommends the next appropriate action.

The goal is simple:

Let AI handle repetitive operational work so HR can focus on making better human decisions.

The Problem

Recruiting involves much more than reviewing resumes.

HR teams often have to manually:

Create and manage job listings
Review large numbers of applications
Compare resumes with job requirements
Identify missing candidate information
Send follow-up emails
Track candidate responses
Update candidate statuses
Coordinate interviews
Notify candidates
Keep candidate records organized

As the number of applicants increases, these tasks become repetitive, time-consuming, and difficult to manage consistently.

Most recruitment AI tools focus on:

"Score this resume."

RecruitFlow focuses on:

"What needs to happen next in this candidate's journey?"

Our Solution

RecruitFlow turns recruitment into an intelligent, stateful workflow.

Candidate applies → AI evaluates → Agent identifies missing evidence → Candidate provides clarification → Agent re-evaluates → HR reviews → HR decides → RecruitFlow handles the next operational steps.

The system is designed to keep the entire candidate journey organized while reducing repetitive work for HR.

Core Workflow

Candidate Portal
↓
Job Application
↓
Resume + Job Description Analysis
↓
Structured AI Evaluation
↓
Missing Evidence Detection
↓
Targeted Candidate Question
↓
Candidate Response
↓
Candidate State Updated
↓
Re-evaluation
↓
AI Recommendation
↓
HR Dashboard
↓
Human HR Decision
↓
Select / Reject
↓
Automated Next Action

What Makes RecruitFlow Agentic?

A traditional recruitment system might simply do:

Resume → Score → Pass/Reject

RecruitFlow is designed to reason about the current state of a candidate and determine what should happen next.

The agent can ask:

What information do we already have?
What evidence is still missing?
Is the available information sufficient?
Should the candidate be asked for clarification?
Has the candidate responded?
Should the candidate be re-evaluated?
Is HR approval required?
What operational action should happen next?

This makes RecruitFlow an ongoing recruiting agent rather than a one-time resume scoring system.

Intelligent Resume and Job Evaluation

RecruitFlow evaluates every candidate against the specific job they applied for.

The evaluation considers:

Job description
Required skills
Preferred skills
Relevant experience
Evidence found in the resume
Candidate responses
Missing information
Unverified claims
Confidence in the evaluation

The system can identify:

Relevant strengths
Required skill evidence
Missing requirements
Unverified claims
Areas requiring clarification
Overall candidate fit
AI recommendation
Confidence level
Dynamic Missing-Evidence Detection

One of RecruitFlow's key capabilities is identifying when the available candidate information is not enough to make a confident evaluation.

For example, if a job requires Kubernetes experience and a resume simply mentions Kubernetes without providing meaningful evidence, RecruitFlow can recognize that the requirement needs clarification.

Instead of immediately rejecting the candidate, the agent can generate a targeted question such as:

"Can you describe a production deployment you managed using Kubernetes and the responsibilities you owned?"

The candidate responds.

RecruitFlow then:

Stores the response
Updates the candidate state
Re-evaluates the available evidence
Updates the recommendation

This creates a continuous feedback loop:

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

Human-in-the-Loop Hiring

RecruitFlow is designed to assist HR, not replace HR.

AI can:

Analyze candidates
Extract evidence
Identify missing information
Ask clarification questions
Maintain candidate state
Generate recommendations
Automate routine communication

But the final hiring decision remains with the human recruiter.

AI Recommendation
↓
HR Review
↓
HR Decision
↓
Select / Reject

If HR selects a candidate, RecruitFlow can automatically trigger the next operational workflow.

The principle is:

Automate the work. Preserve the judgment.

HR Dashboard

RecruitFlow includes a dedicated HR Dashboard designed to give recruiters complete visibility and control over the recruitment process.

HR can:

Create new job listings
Edit job listings
Delete job listings
Activate or deactivate jobs
View all available jobs
See how many candidates applied to each job
View candidate details
Review resumes
Review AI evaluations
See candidate evidence
See missing information
Review candidate responses
View AI recommendations
Select candidates
Reject candidates
Track candidate status
Track interview status

The goal is to keep everything HR needs accessible from one professional and easy-to-use interface.

Candidate Portal

RecruitFlow also provides a separate Candidate Portal.

Candidates can:

Browse available jobs
View job details
Read job requirements
Apply for a position
Upload their resume
Submit required information
Receive recruitment communications

The candidate experience remains simple, while the complexity of the recruitment workflow is handled behind the scenes.

Automated Interview Workflow

When HR selects a candidate, RecruitFlow can automatically initiate the next steps.

HR Selects Candidate
↓
Candidate Status Updated
↓
Interview Workflow Triggered
↓
Candidate Receives Interview Email
↓
HR Receives Confirmation Email
↓
Dashboard Updated

The HR notification can contain:

Candidate name
Candidate contact details
Position
Interview information
Current candidate status

This helps reduce communication gaps and prevents scheduling confusion.

Persistent Candidate State

Recruitment is not a single request-response interaction.

A candidate may:

Apply today
Receive a clarification request
Respond later
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

This stateful architecture allows the agent to continue a candidate's journey without losing context.

Architecture

Candidate Portal
↓
FastAPI Backend
↓
Google ADK Recruiting Agent
↓
Google Gemini
↓
Agent Tools
↓
Firestore
↓
Persistent Candidate State

Resume files are stored using Google Cloud Storage.

External communication and workflow automation are handled through n8n and Gmail.

HR interacts with the system through the dedicated HR Dashboard.

Technology Stack

AI Model: Google Gemini

Agent Framework: Google Agent Development Kit (ADK)

Backend: Python + FastAPI

Database: Google Cloud Firestore

File Storage: Google Cloud Storage

Deployment: Google Cloud Run

Automation: n8n

Communication: Gmail

Frontend: Candidate Portal + HR Dashboard

Version Control: Git + GitHub

Why n8n?

n8n is used as the automation and integration layer rather than the intelligence layer.

Google ADK + Gemini handle:

Reasoning
Agent orchestration
Evaluation
Decision support

Firestore handles:

Persistent candidate state
Candidate records
Workflow status

n8n handles:

External workflow automation
Webhooks
Email actions
Integrations

Gmail handles:

Candidate communication
HR notifications

This separation keeps the architecture modular and easier to maintain.

Agent Tools

RecruitFlow is designed around specialized agent tools.

Resume Analysis Tool

Analyzes the candidate resume against the specific job description and evaluation criteria.

State Tool

Reads and updates candidate information and workflow state in Firestore.

Communication Tool

Allows the agent to trigger external communication workflows through n8n.

Human Approval Tool

Allows consequential actions to pause for HR review and approval.

Structured AI Evaluation

RecruitFlow is designed to use structured AI outputs instead of relying on fragile text parsing.

A conceptual evaluation can contain:

Overall score
Technical score
Behavioral score
Confidence
Recommendation
Evidence
Missing information

Example:

{
"score": 85,
"technical_score": 88,
"behavioral_score": 80,
"confidence": 0.91,
"recommendation": "ADVANCE",
"evidence": [],
"missing_information": []
}

Structured outputs make the AI results easier for the backend and agent tools to consume reliably.

Responsible AI

Recruitment is a high-impact domain, so RecruitFlow follows a human-in-the-loop approach.

The system is designed to:

Surface evidence
Identify missing information
Make uncertainty visible
Provide confidence
Assist recruiters
Automate repetitive operations
Keep consequential decisions under human control

RecruitFlow is not built around:

"Let AI hire people."

It is built around:

"Let AI remove operational friction so recruiters can focus on better human decisions."

Security and Privacy

Recruitment systems handle sensitive candidate information.

RecruitFlow is designed with security and privacy in mind.

Important practices include:

Never commit credentials to GitHub
Keep environment variables private
Protect candidate resumes
Use controlled access to HR functionality
Separate candidate and recruiter interfaces
Avoid unnecessary exposure of candidate information
Use secure service-to-service communication in production
Maintain clear candidate state and workflow history
End-to-End Example

Imagine a company posts an AI Engineer position.

Required skills:

Python
Machine Learning
FastAPI
Cloud Deployment
Kubernetes

A candidate submits their resume.

RecruitFlow evaluates the application.

Python: Evidence Found

Machine Learning: Evidence Found

FastAPI: Evidence Found

Cloud Deployment: Evidence Found

Kubernetes: Insufficient Evidence

Instead of making an unsupported decision, the agent asks the candidate for clarification.

The candidate responds.

RecruitFlow updates the candidate state and re-evaluates the evidence.

The AI then provides a recommendation to HR.

HR opens the candidate profile and reviews:

Resume
Skills
Evidence
Candidate response
Missing information
AI recommendation
Confidence

HR makes the final decision.

If HR selects the candidate, RecruitFlow automatically updates the candidate status and triggers the interview communication workflow.

The candidate receives the interview communication.

HR receives a confirmation.

The dashboard reflects the updated status.

What RecruitFlow Automates

Job application intake: Automated

Resume analysis: AI-assisted

Resume and JD comparison: AI

Evidence extraction: AI

Missing evidence detection: Agent

Clarification questions: Agent

Candidate communication: Automated

Candidate state tracking: Automated

AI recommendation: AI

Final hiring decision: Human

Interview workflow: Automated

HR notification: Automated

Project Structure

RecruitFlow-Agent/

app/
main.py
agent.py
db.py
...

requirements.txt
.env
credentials.json
README.md

The architecture is being developed modularly so that APIs, agent logic, state management, tools, and frontend applications remain maintainable and independently testable.

Local Development

Prerequisites:

Python
Google Cloud Project
Gemini access
Google Cloud credentials
n8n instance for external automation

Clone the repository:

git clone <YOUR_REPOSITORY_URL>

cd RecruitFlow-Agent

Create a virtual environment:

python -m venv myenv

Activate on Windows:

myenv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Create a .env file with the required configuration.

Example:

GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=credentials.json

Never commit credentials or environment secrets to GitHub.

Run the API:

uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs

Development Roadmap

Foundation

[x] Project repository setup
[x] FastAPI backend foundation
[x] Local development environment
[x] Initial API foundation
[x] Initial database integration

Agent Intelligence

[ ] Gemini integration
[ ] Google ADK coordinator agent
[ ] Structured evaluation
[ ] Resume and JD analysis
[ ] Evidence extraction
[ ] Missing-evidence detection

Autonomous Workflow

[ ] Dynamic clarification questions
[ ] Candidate reply handling
[ ] Persistent candidate state
[ ] Re-evaluation loop
[ ] Communication tools
[ ] Human approval workflow

Product Experience

[ ] Candidate Portal
[ ] HR Dashboard
[ ] Job management
[ ] Candidate management
[ ] AI recommendation interface
[ ] Interview workflow

Cloud and Production

[ ] Google Cloud Storage
[ ] Cloud Run deployment
[ ] Production n8n integration
[ ] Reliability and idempotency
[ ] Authentication and access control
[ ] Observability and logging
[ ] End-to-end testing

Design Principles
Automate the work

Routine operational tasks should require as little manual effort as possible.

Preserve human judgment

AI recommendations support HR decisions rather than replacing them.

Evidence over assumptions

The system should distinguish between demonstrated skills, missing information, and unverified claims.

State over statelessness

Candidate journeys continue over time, so their state must persist.

Agentic behavior

The system should determine what needs to happen next rather than simply responding to individual prompts.

Clear separation of responsibilities

Reasoning, state, external actions, and user interfaces remain modular.

Reliability matters

The system should avoid duplicate communications, lost candidate state, and inconsistent workflow statuses.

Vision

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

Track: Taskmaster

Focus: Building an agent that takes ownership of a real-world operational workflow rather than simply answering questions.

Author

Noor Fatima

Software Engineering and AI/Data Science builder focused on building practical, agentic systems that solve real-world problems.

License

This project is currently being developed as a hackathon project.
