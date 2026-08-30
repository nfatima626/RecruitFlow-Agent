# RecruitFlow Agent

<p align="center">
  <strong>AI-Powered Recruiting Operations Platform</strong>
</p>

<p align="center">
  Automate the work. Preserve the judgment.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue" />
  <img src="https://img.shields.io/badge/Agent-Google%20ADK-orange" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688" />
  <img src="https://img.shields.io/badge/Database-Firestore-yellow" />
  <img src="https://img.shields.io/badge/Automation-n8n-EA4B71" />
  <img src="https://img.shields.io/badge/Cloud-Google%20Cloud-blue" />
</p>

---

## Overview

RecruitFlow Agent is an AI-powered recruiting operations platform designed to streamline the complete candidate journey, from job application to interview.

The platform combines an AI agent, persistent candidate state, automated workflows, a dedicated candidate portal, and a professional HR dashboard into a single recruitment ecosystem.

Unlike traditional resume screening systems that simply generate a score, RecruitFlow is designed to actively participate in the recruitment workflow.

It can:

- Analyze job requirements
- Evaluate candidate resumes
- Compare candidate evidence against role requirements
- Identify missing or insufficient information
- Generate targeted clarification questions
- Process candidate responses
- Maintain persistent candidate state
- Re-evaluate candidates when new evidence becomes available
- Provide structured recommendations to HR
- Automate candidate and recruiter communication
- Trigger interview workflows after HR approval

The system is intentionally designed around a human-in-the-loop model.

AI assists with analysis and operational work.

HR retains the final decision-making authority.

---

## Problem

Recruitment involves a large amount of repetitive operational work.

HR teams frequently need to:

- Create and manage job listings
- Review applications
- Screen resumes
- Compare candidates against job requirements
- Identify missing candidate information
- Follow up with candidates
- Track candidate responses
- Update application statuses
- Communicate decisions
- Coordinate interviews
- Keep candidate information organized

As the number of applications increases, managing these processes manually becomes increasingly time-consuming and error-prone.

Traditional automated recruitment workflows often follow a simple pattern:

```text
Resume
   |
   v
AI Score
   |
   v
Accept / Reject
```

---
This approach does not account for incomplete information, candidate clarification, evolving candidate state, or the operational work required after an evaluation.

RecruitFlow takes a different approach.

## Solution

RecruitFlow treats recruitment as a continuous operational workflow rather than a single resume-scoring task.

The agent continuously considers:

---
```text

What information is available?
          |
          v
What evidence is relevant?
          |
          v
What information is missing?
          |
          v
What should happen next?
          |
          v
Does the next action require human approval?
```

--- 

This allows the system to move a candidate through the recruitment process while keeping HR in control of consequential decisions.

---

```mermaid
flowchart TB

    Candidate[Candidate Portal]
    HR[HR Dashboard]

    API[FastAPI Backend<br/>Google Cloud Run]

    Agent[Google ADK<br/>Recruiting Agent]

    Gemini[Google Gemini<br/>AI Reasoning]

    Firestore[(Google Cloud Firestore<br/>Candidate State)]

    Storage[(Google Cloud Storage<br/>Resume Files)]

    N8N[n8n<br/>Automation Layer]

    Gmail[Gmail<br/>Communication]

    Candidate --> API
    HR --> API

    API --> Agent

    Agent --> Gemini
    Agent --> Firestore
    Agent --> Storage
    Agent --> N8N

    N8N --> Gmail

    Firestore --> HR
```
---
| Component            | Responsibility                                                       |
| -------------------- | -------------------------------------------------------------------- |
| Candidate Portal     | Job browsing, applications, resume submission, candidate interaction |
| HR Dashboard         | Job management, candidate review, AI recommendations, HR decisions   |
| FastAPI              | Backend APIs and application logic                                   |
| Google ADK           | Agent orchestration and workflow coordination                        |
| Google Gemini        | AI reasoning, analysis, and structured evaluation                    |
| Firestore            | Persistent candidate state and recruitment data                      |
| Google Cloud Storage | Resume and document storage                                          |
| n8n                  | External workflow automation and integrations                        |
| Gmail                | Candidate and HR communication                                       |
| Cloud Run            | Backend deployment                                                   |
---

## End-to-End Recruitment Workflow

---

```mermaid
flowchart TD

    A[Candidate Applies] --> B[Resume Uploaded]

    B --> C[RecruitFlow Agent]

    C --> D[Resume + Job Description Analysis]

    D --> E{Is Evidence Sufficient?}

    E -->|No| F[Identify Missing Evidence]

    F --> G[Generate Targeted Question]

    G --> H[Candidate Responds]

    H --> I[Update Candidate State]

    I --> D

    E -->|Yes| J[Structured Candidate Evaluation]

    J --> K[AI Recommendation]

    K --> L[HR Dashboard]

    L --> M{HR Decision}

    M -->|Reject| N[Reject Candidate]

    M -->|Select| O[Interview Workflow]

    O --> P[Candidate Notification]

    O --> Q[HR Confirmation]

    P --> R[Update Candidate Status]

    Q --> R
```
--- 
# Agentic Workflow

The core difference between RecruitFlow and a traditional AI screening system is its ability to continue working across multiple stages.

A traditional system may perform:

```text
Resume -> Evaluation -> Score
```
---

RecruitFlow is designed around:

--- 

```text
Application
     |
     v
Evaluation
     |
     v
Evidence Analysis
     |
     v
Missing Information
     |
     v
Candidate Clarification
     |
     v
New Evidence
     |
     v
Re-evaluation
     |
     v
HR Recommendation
     |
     v
Human Decision
     |
     v
Operational Workflow
```
--- 

The agent does not simply produce an answer.

It determines the next appropriate action based on the current candidate state.

## Candidate Portal

RecruitFlow provides a dedicated interface for candidates.

#### Candidates can:

Browse available positions
View complete job descriptions
Review requirements
Apply for jobs
Upload resumes
Submit required information
Respond to clarification questions
Receive recruitment communications
Receive interview notifications

The candidate experience is intentionally simple.

The complexity of the recruitment workflow remains behind the scenes.

```mermaid
flowchart LR

    A[Browse Jobs] --> B[View Job]
    B --> C[Review Requirements]
    C --> D[Submit Application]
    D --> E[Upload Resume]
    E --> F[Application Processing]
    F --> G[Recruitment Communication]
```
---
# HR Dashboard

The HR Dashboard acts as the central control center for the recruitment process.

The goal is to give HR complete visibility without overwhelming the recruiter with unnecessary complexity.

## Job Management

##### HR can:

Create new job listings
Edit job listings
Delete job listings
Activate or deactivate positions
View all available positions
View the number of applicants per position

## Candidate Management

For every position, HR can access:

Candidate name
Contact information
Resume
Applied position
Skills
Experience
Candidate responses
Evaluation results
Supporting evidence
Missing information
AI recommendation
Confidence
Candidate status
Interview status
HR Decision Making

The AI recommendation is presented as decision support rather than an automated hiring decision.

Example:
```text
Candidate: Sarah Ahmed
Position: AI Engineer

Overall Fit: Strong

Confidence: 91%

Required Skills

Python
Evidence Found

Machine Learning
Evidence Found

FastAPI
Evidence Found

SQL
Evidence Found

Kubernetes
Insufficient Evidence

AI Recommendation

ADVANCE

--------------------------------

HR Decision

[ Select Candidate ]    [ Reject Candidate ]
```
---

The AI provides the recommendation.

HR makes the decision.

# Human-in-the-Loop Decision Model

RecruitFlow is explicitly designed to preserve human control over consequential hiring decisions.

The agent can:

Analyze candidates
Extract evidence
Identify missing information
Ask clarification questions
Maintain candidate state
Re-evaluate candidates
Generate recommendations
Trigger operational workflows

However, the final candidate selection remains with HR.

```mermaid
flowchart TD

    A[Candidate Evaluation]
    B[AI Recommendation]
    C[HR Review]
    D{HR Decision}

    A --> B
    B --> C
    C --> D

    D -->|Select| E[Interview Workflow]
    D -->|Reject| F[Rejection Workflow]
```

---
This creates a clear separation between:

```text
AI Assistance
      |
      v
Human Judgment
      |
      v
Operational Automation
```

---
# Intelligent Resume Evaluation

RecruitFlow evaluates candidates against the specific job they applied for.

The evaluation considers:

Required skills
Preferred skills
Relevant experience
Resume evidence
Candidate responses
Missing information
Unverified claims
Role-specific requirements
Confidence

Instead of relying only on a numerical score, RecruitFlow is designed to provide evidence-based evaluation.

Example:

```text
Python
Evidence Found

Machine Learning
Evidence Found

FastAPI
Evidence Found

Cloud Deployment
Evidence Found

Kubernetes
Insufficient Evidence
```
---
This gives HR more context about why a recommendation was generated.

# Missing Evidence Detection

A major capability of RecruitFlow is its ability to identify when available candidate information is insufficient.

Consider a position requiring Kubernetes experience.

A candidate's resume may contain:

```text
Kubernetes
```
---
However, simply mentioning a technology does not necessarily provide enough evidence of meaningful experience.

RecruitFlow can identify the requirement as:

---

```text
Kubernetes Experience

Evidence Status:
Insufficient Evidence
```

---
The agent can then generate a targeted clarification question.

For example:
```text
Can you describe a production deployment you managed
using Kubernetes and the responsibilities you owned?
```

---
Once the candidate responds, the system can:

Store the response
Update candidate state
Add the new evidence
Re-evaluate the requirement
Update the overall recommendation

This creates a continuous evidence loop.

---

```mermaid
flowchart TD

    A[Resume Evidence]
    B[Evaluate Requirement]
    C{Evidence Sufficient?}
    D[Keep Evidence]
    E[Generate Clarification Question]
    F[Candidate Response]
    G[Update Candidate State]

    A --> B
    B --> C

    C -->|Yes| D

    C -->|No| E
    E --> F
    F --> G
    G --> B
```

---
# Persistent Candidate State

###### Recruitment is asynchronous.

A candidate may apply today, receive a clarification request tomorrow, respond later, and eventually reach HR review.

RecruitFlow therefore maintains persistent candidate state.

A candidate can move through states such as:

```text
APPLIED
   |
   v
UNDER_REVIEW
   |
   v
NEEDS_CLARIFICATION
   |
   v
AWAITING_CANDIDATE_REPLY
   |
   v
RE_EVALUATED
   |
   v
HR_REVIEW
   |
   v
INTERVIEW_SCHEDULED
```
---
Other possible outcomes include:

---

```text
SELECTED
REJECTED
```
---
Persistent state allows the agent to resume workflows without losing context.

# Automated Interview Workflow

When HR selects a candidate, RecruitFlow can automatically trigger the next operational steps.

```mermaid
sequenceDiagram

    participant HR as HR Dashboard
    participant Agent as RecruitFlow Agent
    participant DB as Firestore
    participant N8N as n8n
    participant Candidate as Candidate
    participant Recruiter as HR

    HR->>Agent: Select Candidate
    Agent->>DB: Update Candidate Status
    Agent->>N8N: Trigger Interview Workflow

    N8N->>Candidate: Send Interview Notification
    N8N->>Recruiter: Send HR Confirmation

    Agent->>DB: Store Interview Status

    DB-->>HR: Updated Candidate Status
```

---
The HR notification can include:

Candidate name
Candidate contact information
Position
Interview information
Current status

This helps prevent communication gaps and reduces manual coordination.

# n8n Automation Layer

n8n is used as the external workflow and integration layer.

It is intentionally separated from the core AI reasoning system.

```text
Google Gemini + Google ADK
        |
        | Reasoning
        | Evaluation
        | Agent Orchestration
        v
RecruitFlow Backend
        |
        | Persistent State
        v
Firestore

RecruitFlow Agent
        |
        | External Actions
        v
n8n
        |
        v
Gmail
        |
        +--> Candidate
        |
        +--> HR
```

---
This separation keeps the system modular.

The AI agent is responsible for reasoning.

n8n is responsible for external automation.

Firestore is responsible for persistent state.

# Agent Tools

RecruitFlow is designed around specialized agent tools.

Resume Analysis Tool

Evaluates the candidate resume against:

```text
Resume
+
Job Description
+
Evaluation Criteria
```

---
and produces structured candidate evidence.

# Candidate State Tool

Reads and updates:

Candidate status
Evaluation
Recommendation
Confidence
Missing information
Candidate responses
Interview status
Timestamps

using Firestore.

## Communication Tool

Triggers external communication workflows through n8n.
```text
RecruitFlow Agent
        |
        v
Communication Tool
        |
        v
n8n Webhook
        |
        v
Gmail
        |
        +--> Candidate
        |
        +--> HR
```

---
# Human Approval Tool

Allows consequential actions to pause for recruiter review.

```text
AI Recommendation
        |
        v
HR Review
        |
        v
HR Decision
        |
        v
Workflow Continues
```

---
## Structured AI Evaluation

RecruitFlow is designed around structured AI outputs rather than fragile text parsing.

A conceptual evaluation can contain:

```text
{
  "score": 85,
  "technical_score": 88,
  "behavioral_score": 80,
  "confidence": 0.91,
  "recommendation": "ADVANCE",
  "evidence": [],
  "missing_information": []
}
```
--- 

Structured outputs make AI results easier to:

Validate
Store
Display
Process downstream
Integrate with agent tools
Use within automated workflows

# Responsible AI

Recruitment is a high-impact domain.

RecruitFlow therefore follows a human-in-the-loop approach.

The system is designed to:

Surface evidence
Identify missing information
Distinguish between evidence and assumptions
Make uncertainty visible
Provide confidence
Assist recruiters
Automate repetitive operations
Keep consequential decisions under human control

RecruitFlow is not designed around:

"Let AI hire people."

It is designed around:

### "Let AI remove operational friction so recruiters can focus on better human decisions."

# Security and Privacy

Recruitment systems process sensitive candidate information.

RecruitFlow is designed with security and privacy considerations in mind.

Key practices include:

Keep credentials out of source control
Protect environment variables
Secure resume storage
Restrict HR functionality to authorized users
Separate candidate and HR interfaces
Minimize unnecessary exposure of candidate information
Use controlled service-to-service communication
Maintain clear candidate state and workflow history

--- 

# Technology Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| AI Model        | Google Gemini                      |
| Agent Framework | Google Agent Development Kit (ADK) |
| Backend         | Python + FastAPI                   |
| Database        | Google Cloud Firestore             |
| File Storage    | Google Cloud Storage               |
| Deployment      | Google Cloud Run                   |
| Automation      | n8n                                |
| Communication   | Gmail                              |
| Frontend        | Candidate Portal + HR Dashboard    |
| Version Control | Git + GitHub                       |

---

# Google Cloud Architecture

```mermaid
flowchart TD

    Candidate[Candidate Portal]
    HR[HR Dashboard]

    CloudRun[Google Cloud Run]

    ADK[Google ADK Agent]

    Gemini[Google Gemini]

    Firestore[(Firestore)]

    GCS[(Cloud Storage)]

    N8N[n8n]

    Gmail[Gmail]

    Candidate --> CloudRun
    HR --> CloudRun

    CloudRun --> ADK

    ADK --> Gemini
    ADK --> Firestore
    ADK --> GCS
    ADK --> N8N

    N8N --> Gmail

    Firestore --> HR
```

