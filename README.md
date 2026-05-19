# ThinkTank: Architectural Decision Engine

ThinkTank is an advanced, multi-agent orchestration skill designed for Claude Code. It addresses a critical gap in single-agent LLM workflows: the lack of adversarial peer review and architectural persistence.

When designing complex systems, relying on a single AI agent often results in echo-chamber agreements without rigorous stress-testing. ThinkTank solves this by simulating a cross-functional engineering committee. It forces a structured debate across multiple technical domains (security, cost, maintainability) before any system design is finalized. 

Crucially, accepted designs are compiled into structured JSON Architecture Decision Records (ADRs) within the `.arch-decisions/` directory. This creates a persistent memory layer, ensuring that future AI interactions in your repository automatically adhere strictly to established project guardrails.

## The Agent Team

The skill intelligently routes debates among specialized personas to guarantee comprehensive technical validation:

- **System Architect**: Proposes the foundational system design and drives delivery speed and scalability.
- **Current State Expert**: Enforces backwards compatibility and validates proposals against historical ADRs.
- **Security Engineer**: Audits the proposal for vulnerabilities, compliance risks, and threat vectors.
- **FinOps Engineer**: Optimizes for cloud infrastructure costs and third-party API spend.
- **Reliability Engineer**: Champions maintainable code, low technical debt, and Developer Experience (DX).
- **Engineering Manager (The Judge)**: Synthesizes the debate, applies weighted scoring, and authorizes the final ADR.

## Usage

You can seamlessly import the Zero-Dependency ThinkTank skill directly into your local Claude Code environment.

### 1. Installation
Locate the `thinktank.skill` file in this repository and run the following command in your terminal:
```bash
claude skill add thinktank.skill
```

### 2. Triggering the Workflow
To initiate a full architectural debate, use the `ThinkTank:` prefix:
```
ThinkTank: I want to build a real-time notification system using Redis pub/sub.
```

### 3. Token Optimization (Targeted Debates)
To minimize token consumption, you can enforce a Targeted Debate. By specifying a primary focus, the skill dynamically drops irrelevant personas and runs a highly-efficient, 3-node debate (Architect vs. Specialist vs. Manager).
```
ThinkTank: I want to build a webhook handler [Focus: Security]
```

## Upcoming: Web Visualization Platform
A companion web platform to visually monitor the real-time multi-agent debate and interface directly with your GitHub repositories is currently in development and **coming soon here**.
