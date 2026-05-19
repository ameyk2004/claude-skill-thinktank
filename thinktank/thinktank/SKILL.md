---
name: thinktank
description: >
  A multi-persona architectural decision engine that runs a structured debate between expert AI agents,
  scores the outcome, and saves locked-in guardrails as Architecture Decision Records (ADRs).
  Use this skill whenever the user wants to design, architect, or decide something technical — even if
  they don't say "ThinkTank" explicitly. Trigger on phrases like: "how should I build X", "debate this",
  "think this through", "pros and cons of", "should I use X or Y", "help me decide", "architect this",
  "ADR", "what's the best approach for", or any multi-faceted technical trade-off question.
  Also trigger when the user explicitly writes "ThinkTank: IDEA".
---

# ThinkTank — Architectural Decision Engine

## Overview

ThinkTank simulates a team of expert engineering personas who debate a proposal, score it, and optionally lock it in as an Architecture Decision Record (ADR). To save tokens, it uses a Targeted Debate system where users can focus on specific concerns.

---

## STEP 0 — FOCUS DETECTION & PROMPT

Before starting any debate, check if the user explicitly stated a priority/focus in their prompt (e.g., "ThinkTank: Build X [Focus: Cost]" or "Optimize for Maintainability").

If NO focus is provided, you MUST STOP and ask the user:
> "To save tokens, what is your primary focus for this decision? (e.g., Cost, Security, Reliability, or type 'Full' for a comprehensive 5-expert debate)."

Wait for their response before proceeding to STEP 1.

Once the focus is determined, set the mode internally:
- **TARGETED DEBATE**: If the user specifies a focus (e.g., Cost, Security, Maintainability), you will only simulate 3 personas: The **System Architect**, the **Specialist** matching their focus (e.g., FinOps Engineer, Security Engineer, or Reliability Engineer), and the **Engineering Manager** (Judge).
- **FULL DEBATE**: If the user says "Full", "Balanced", or asks for all of them, you will simulate all 5 experts + 1 Judge.

---

## STEP 1 — CONTEXT LOAD (Internal, silent)

### 1a. Load ADR Index
Check if `.arch-decisions/index.json` exists.
- If YES → load it. It contains one-line summaries + topic tags for each ADR.
- If NO → note that no prior guardrails exist. Do not error.

### 1b. Selective ADR Loading
From the index, identify ADRs whose `tags` overlap with the current topic.
Load ONLY those full ADR files (max 3). Ignore the rest.

### 1c. Codebase Grounding (if in a code project)
If a codebase is present, read only `README.md` or `package.json` / `pyproject.toml` (whichever exists) for stack context. Do NOT read source files unless directly relevant to the decision.

### 1d. Load Persona Reference
Read `references/personas.md` now. You MUST enforce the professional names and word budgets for each persona. Do NOT use emojis.

---

## STEP 2 — THE DEBATE

### TARGETED DEBATE MODE
Run this highly efficient 1-on-1 debate:
1. **System Architect** — proposes a concrete approach and design.
2. **[The Specialist]** — The one expert matching the user's focus (e.g. FinOps Engineer for Cost). Critiques the proposal aggressively based strictly on their domain.
3. **System Architect** — responds and adjusts the design to accommodate the Specialist's concerns.

Then skip directly to STEP 3 (scoring).

---

### FULL DEBATE MODE
Run in this order, strictly enforcing word limits:
1. **System Architect** — proposes the initial design.
2. **Current State Expert** — checks against past ADRs; blocks guardrail violations.
3. **Security Engineer** — invents a realistic threat actor and stress-tests the design.
4. **FinOps Engineer** — estimates costs at current scale AND at 10x scale.
5. **Reliability Engineer** — rates on-call misery index (1–10) and flags tech debt.
6. **System Architect** — issues a final revised proposal incorporating the strongest objections.

---

## STEP 3 — SCORING MATRIX

**The Engineering Manager (Judge)** scores the final proposal based on 5 fixed dimensions (1 to 10 scale).
The Judge weighs the scores based on the active personas. If running a Targeted Debate, the user's chosen focus dimension carries the heaviest weight.

| Dimension | Score (1-10) | Confidence | Key Factor from Debate |
|---|---|---|---|
| Reversibility | ... | High/Med/Low | ... |
| Ops/Cloud Cost | ... | High/Med/Low | ... |
| Delivery Speed | ... | High/Med/Low | ... |
| Scalability | ... | High/Med/Low | ... |
| Developer Experience | ... | High/Med/Low | ... |

---

## STEP 4 — DECISION & GUARDRAILS

The Engineering Manager presents:
1. **Verdict** — one paragraph summary of the final decision.
2. **Guardrails** — a bullet list of strict rules this decision enforces going forward.
3. **What was rejected** — one line on the strongest alternative that was ruled out and why.

Then STOP and ask:
> **"Do you approve this architectural decision? (Reply 'Yes' to save the ADR, or 'No' to refine)"**

---

## STEP 5 — PERSISTENCE (Only on user approval)

If the user approves:
1. Create `.arch-decisions/adr-<YYYYMMDD>-<short-topic>.json` using the schema in `templates/adr_template.json`.
2. Update (or create) `.arch-decisions/index.json` appending the new ADR entry.
3. Output a final success message:
```text
ADR saved: .arch-decisions/adr-<YYYYMMDD>-<short-topic>.json
Guardrail is now active and will be enforced in future ThinkTank sessions.
```

---

## Formatting Rules
- Use `###` headers for each persona's section.
- Enforce professional names (NO EMOJIS).
- Enforce word budgets from `references/personas.md` — verbosity kills context.
- Do not narrate mode selection or file loading to the user.
