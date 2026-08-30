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


