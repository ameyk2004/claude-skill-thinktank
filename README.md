# ThinkTank: Architecture & Execution Orchestrator

ThinkTank is an advanced, multi-agent orchestration skill designed for Claude Code. It addresses a critical gap in single-agent LLM workflows: the lack of adversarial peer review and architectural persistence.

Instead of just outputting code, ThinkTank forces a structured, token-optimized debate across multiple technical domains (security, cost, maintainability) before any system design is finalized. Accepted designs are compiled into structured JSON Architecture Decision Records (ADRs), creating a persistent memory layer that future agents are forced to respect.

## The 5-Stage Engine

When triggered, ThinkTank guides you through a strict, multi-turn state machine:

1. 🔍 **Discovery & Requirements**: Asks precise clarifying questions to understand your feature and optimization focus (e.g., Cost vs. Speed).
2. 🏗️ **Context Analysis**: Analyzes your workspace. For existing projects, it prompts you to retroactively document legacy architectural decisions.
3. ⚖️ **The Smart Debate**: Routes the problem to specialized experts (System Architect, Security Engineer, FinOps Engineer, etc.). The Engineering Manager actively penalizes over-engineering to maintain pragmatism.
4. 📜 **Final Decision & Guardrails**: Outputs the suggested approach in plain English and explicitly states what it is optimized for, before generating the JSON ADR.
5. 🚀 **Implementation & Testing**: Hands off execution by invoking the `/write-plan` skill, implementing the feature, and providing testing steps.

## Usage

You can seamlessly import the Zero-Dependency ThinkTank skill directly into your local Claude Code environment.

### 1. Installation
Locate the `thinktank.skill` file in this repository and run the following command in your terminal:
```bash
claude skill add thinktank.skill
```

### 2. Triggering the Workflow
To initiate the full architectural engine, use the `ThinkTank:` prefix:
```text
ThinkTank: I want to build a real-time notification system.
```

### 3. Token Optimization (Targeted Debates)
To minimize token consumption, you can enforce a Targeted Debate. By specifying a primary focus, the skill dynamically drops irrelevant personas and runs a highly-efficient, 3-node debate (Architect vs. Specialist vs. Manager).
```text
ThinkTank: I want to build a webhook handler [Focus: Security]
```

## Upcoming: Web Visualization Platform
A companion web platform to visually monitor the real-time multi-agent debate and interface directly with your GitHub repositories is currently in development and **coming soon here**.
