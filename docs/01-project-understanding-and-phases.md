# ThinkTank — Project Understanding & Phased Execution Plan

> **Status:** Pre-execution — Plan updated based on user feedback. Awaiting final review.
> **Repo:** `claude-skill-thinktank`

---

## 1. Understanding

### 1.1 The Core Problem Being Solved
Current AI coding agents suffer from two compounding failure modes:
- **Tradeoff Amnesia:** Forgetting *why* past decisions were made. Future sessions re-litigate settled debates or silently reverse them.
- **Yes-Man Syndrome:** A single agent always agrees with the user's framing. There is no adversarial pressure to stress-test ideas.

**ThinkTank** addresses both by enforcing a structured, **scored multi-agent debate** before any architectural decision is finalized, and persisting every accepted decision as an **immutable JSON record** that future agents must respect as a guardrail.

---

### 1.2 The Two-Component Architecture

#### Component 1 — The Claude Code Skill (Zero-Dependency Open Source)

To make this an easily shareable open-source contribution, the skill will not rely on a bulky Python orchestrator. Instead, it will be a **pure `CLAUDE.md` implementation**. Anyone can drop this skill into their repo and run it via Claude Code with zero installation.

**How it works entirely via Prompt Engineering & Claude Code's native abilities:**
1. The `CLAUDE.md` will define a strict workflow instructing Claude Code to simulate the orchestrator and the three personas within its own thought process.
2. **Context Loading:** Claude reads existing `.arch-decisions/*.json` files using its native file tools.
3. **Debate:** Claude simulates the *Infrastructure Purist*, *System Architect*, and *Product Engineer* sequentially.
4. **Scoring:** Claude synthesizes a Tradeoff Scoring Matrix (1-10 scale) based on fixed dimensions.
5. **Confirmation:** Claude pauses and asks the user for explicit confirmation.
6. **Persistence:** If approved, Claude uses its native file-writing tools to generate the JSON ADR file.

#### Component 2 — The Web Visualization Platform (POC)

A companion web app to visually demonstrate the multi-agent debate workflow, especially for brainstorming on existing GitHub repositories.
- **Cost-Optimized Backend:** AWS CDK in `us-east-1`. Uses a single multiplexed WebSocket connection. Uses cheaper models (e.g., Claude 3.5 Haiku) for the debate personas to limit spend. Session-only state (no user DB).
- **Frontend Hosting:** Hosted directly from an **S3 Website Endpoint** (no CloudFront, to save costs).
- **GitHub Integration:** GitHub OAuth App (read-only) to allow users to load repo context into the debate.

---

### 1.3 The JSON Memory System (`.arch-decisions/`)

Every confirmed decision is stored as a versioned JSON record:

```json
{
  "id": "adr-001",
  "created_at": "2026-05-19T07:31:00Z",
  "topic": "WebSocket vs SSE for streaming agent responses",
  "winner": "WebSockets",
  "rationale": "Bidirectional control channel needed for agent interrupts.",
  "scores": {
    "infrastructure_purist": { "reversibility": 8, "ops_cost": 6, "delivery_speed": 6 },
    "system_architect":      { "reversibility": 6, "ops_cost": 8, "delivery_speed": 6 },
    "product_engineer":      { "reversibility": 6, "ops_cost": 6, "delivery_speed": 10 }
  },
  "guardrails": [
    "All new real-time features MUST use the established WebSocket gateway.",
    "SSE is forbidden unless a new ADR explicitly overrides this decision."
  ],
  "status": "accepted"
}
```

---

## 2. Clarifications & Decisions Made

Based on your input, here is the locked-in technical direction:

| Category | Decision |
|---|---|
| **Skill Implementation** | Pure `CLAUDE.md` using prompt chaining to simulate personas. Zero Python dependencies. Open-source ready. |
| **Skill Features** | Supports a `--challenge` instruction to re-open and debate existing ADRs. |
| **Web UI** | Real-time streaming output showing active agents and consensus building. |
| **Web Auth & Context** | GitHub OAuth App (Read-Only). No database for user persistence (Session-only). |
| **AWS Infra** | Region: `us-east-1`. Direct **S3 static website hosting** (No CloudFront). |
| **AWS Websockets** | **Single WebSocket connection** carrying multiplexed streams for all personas (cheaper/faster). |
| **Web Cost Control** | Lambda spend caps will be enforced. Will use cheaper Anthropic models for the web POC. |
| **Scoring Matrix** | Fixed dimensions. **1 to 10 scale**. |

---

## 3. Open Questions for Final Review

1. **Skill Name & Trigger:** What should be the exact trigger phrase to start the debate in Claude Code? (e.g., "ThinkTank: I want to build X" or just "Brainstorm architecture for X").
2. **Debate Personas:** Are you happy with *Infrastructure Purist*, *System Architect*, and *Product Engineer*, or do you want to adjust these 3 fixed roles?
3. **Scoring Dimensions:** I propose: *Reversibility, Ops Cost, Delivery Speed, Scalability, and Developer Experience (DX)*. Do these 5 fixed dimensions work for you?

---

## 4. Architecture Plan

### 4.1 Monorepo Structure

```
claude-skill-thinktank/
├── docs/                          # Architecture docs
├── skill/                         # Component 1: Claude Code Skill
│   ├── CLAUDE.md                  # The core skill prompt (zero dependency)
│   └── templates/
│       └── adr_template.json      # Schema for new decision records
│
├── web/                           # Component 2: Web Platform (POC)
│   ├── frontend/                  # React + TypeScript + Vite
│   │   ├── src/
│   │   │   ├── components/        # Arena UI, GitHub Modal
│   │   │   ├── hooks/             # useWebSocket.ts
│   │   │   └── pages/             # HomePage, ArenaPage
│   │   └── package.json
│   │
│   └── infra/                     # AWS CDK (Python)
│       ├── app.py
│       ├── stacks/
│       │   ├── thinktank_stack.py
│       │   ├── api_stack.py       # WebSocket + REST APIs
│       │   ├── compute_stack.py   # Lambdas (LLM integration)
│       │   └── frontend_stack.py  # Direct S3 Static Website Hosting
│       ├── lambdas/
│       │   ├── debate_handler/    # Orchestrates the 3 personas via API
│       │   └── github_handler/    # OAuth and repo context reading
│       └── requirements.txt
│
└── .arch-decisions/               # ADR JSON records (created by skill)
```

---

## 5. Phased Execution Plan

### Phase 1 — Zero-Dependency Claude Code Skill (Core)
- Draft the `CLAUDE.md` prompt structure.
- Define the persona instructions, the 5-dimension scoring rules (1-10 scale), and the JSON schema constraint.
- Test the skill locally inside Claude Code to verify it can simulate the 3 agents, output the matrix, and correctly write the `.arch-decisions/*.json` files.
- **Outcome:** A shareable, open-source-ready `CLAUDE.md` skill that requires no installation.

### Phase 2 — AWS CDK & Lambda Backend (Web POC)
- Set up `us-east-1` CDK stack.
- Create DynamoDB tables (with TTL) for session state.
- Create single WebSocket API Gateway.
- Implement `debate_handler` Lambda calling Anthropic API to stream the debate.
- Implement `github_handler` Lambda for OAuth and reading repository context.

### Phase 3 — React Frontend & S3 Hosting
- Build React SPA with Vite.
- Implement GitHub OAuth flow.
- Create the 3-column Arena UI with real-time streaming updates.
- Deploy to direct S3 Static Website Hosting.
