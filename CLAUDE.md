@AGENTS.md

# Claude Code operating contract

`AGENTS.md` and its applicable `.claude/rules/*.md` files govern code. This file governs Claude-specific orchestration. User instructions win; coding rules win on code substance; this file wins only on agent operation.

Every dispatch must tell the executor to read `AGENTS.md`, the applicable rule files, and the governing guide/spec before acting.

## Scope

- The top-level agent is the **Orchestrator**: preserve the authoritative goal, plan, decisions, cross-unit state, integration, and final acceptance.
- A dispatched subagent is an **Executor**: perform its bounded assignment directly, spawn nothing, and return the required distillate. It follows orchestration rules only when explicitly assigned to orchestrate.
- For a typo, one-line fix, or one quick lookup, work directly. Use orchestration when isolation, parallelism, independent review, or substantial context justifies it.

## Provider and model routing

Route by role, not vendor prestige. The cross-provider rows below are operational equivalents, not claims of capability parity.

| Role                         | Claude               | Cursor   | Codex/OpenAI                     |
| ---------------------------- | -------------------- | -------- | -------------------------------- |
| Orchestration and acceptance | `fable`, high effort | —        | `gpt-5.6-sol`, `xhigh` effort    |
| Planning and judgment        | `opus`, high effort  | Grok     | `gpt-5.6-sol`, `high` effort     |
| Recon and bounded execution  | `sonnet`, low effort | Composer | `gpt-5.6-terra`, `medium` effort |
| Repetitive high-volume work  | `sonnet`, low effort | Composer | `gpt-5.6-luna`, opt-in only      |

- Native Claude roles remain the default for house-taste work. Use Claude aliases (`fable`, `opus`, `sonnet`), never fixed Claude IDs or `inherit`.
- Claude agent frontmatter accepts Claude models only. Invoke Cursor through `composer`/`grok` and Codex through `codex`; never put an external model in `model:`.
- Dispatch named agents from `.claude/agents/` and state the route explicitly even when frontmatter pins it.
- Never set `CLAUDE_CODE_SUBAGENT_MODEL`; it flattens role routing.
- The main session uses `fable` through `/model fable` or `"model": "fable"`; if configured otherwise, its Orchestrator duties remain unchanged.
- Doers use low effort; Claude thinkers use high; `orkestrel` uses medium. Codex defaults are fixed below. Override only with a stated reason.
- Role files pin model, effort, tools, permissions, turn budget, and charter. Claude Code hot-reloads edits to existing role files.

## Role agents

| Agent        | Contract                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------- |
| `scout`      | Read-only terrain map: paths, entry points, sizes, and what matters; no file dumps                |
| `researcher` | Read-only root cause/options/recommendation from a supplied map; no raw research dump             |
| `planner`    | Read-only units, dependencies, ownership, acceptance criteria, and risks; never self-executes     |
| `builder`    | Writes one specified unit; does not re-plan or investigate deviations                             |
| `checker`    | Read-only acceptance/rules/scope/parity checklist; escalates judgment                             |
| `reviewer`   | Read-only correctness/design/security/diff judgment with evidence                                 |
| `verifier`   | Independent authoritative gates/evidence; reports exit-code truth and exact failures; never fixes |
| `orkestrel`  | Read-only ecosystem map, dependency sequencing, and drift audit                                   |
| `composer`   | Cursor mechanical executor in an isolated worktree; proposal only; never commits/pushes           |
| `grok`       | Cursor ask-mode adversary; hypotheses only; never designs, edits, or decides                      |
| `codex`      | Codex CLI dispatcher: isolated Terra worker or read-only Sol thinker; output is untrusted         |

## Context and decomposition

- Keep the main context at decision level. Delegate large reads, repository scans, raw logs/diffs, exploratory work, and debugging; consume distilled findings.
- Decompose by required context and independently verifiable acceptance criteria, not merely by task type.
- Instructions flow down fully specified; findings flow up smaller than the context consumed.
- Parallelize independent work; serialize dependencies and shared-file contention.
- The Orchestrator owns the plan and every final decision. A planner proposes; builders execute; reviewers advise.

## Writing concurrency

Concurrent executors share a filesystem unless isolated. Prevent clobbered edits, tree-wide formatter/build races, cache phantoms, and validation cross-talk:

1. Prefer `isolation: worktree` for writing executors.
2. Otherwise assign disjoint owned files and explicit shared/off-limits files.
3. Shared files are report-only; executors return exact patches for serial integration.
4. Concurrent executors run only read-only, scoped validation—never tree-wide `format`, lint `--fix`, or `build`. A tree-wide result may contain sibling in-flight failures; executors report only their owned scope.
5. After integration, clear shared caches when needed; then one independent `verifier` runs the authoritative tree-wide sweep. Builder self-reports never establish green.

## Execution loop

1. **Scout:** on unfamiliar terrain, dispatch `scout`; in an Orkestrel repo, dispatch `orkestrel` first. Skip only when the terrain is already known.
2. **Plan:** restate the goal; define units, dependencies, ownership, parallel/serial order, acceptance criteria, and risks. Use `planner` for non-trivial work and `researcher` only when unknowns block planning. Review and surface the plan before dispatch.
3. **Dispatch:** select the named role/model and provide a self-contained bounded prompt. Route mechanical, taste-free units to `composer` or `codex:worker`; use `builder` whenever house taste or API judgment remains.
4. **Integrate:** evaluate each distillate against acceptance criteria; apply shared-file changes serially and route cross-cutting findings.
5. **Review:** every non-trivial implementation receives independent `checker` and `reviewer` audits. Every external-model diff receives both regardless of size; external findings remain hypotheses until verified.
6. **Verify:** one independent `verifier` runs the authoritative gates.
7. **Accept/report:** the Orchestrator decides and reports concise outcomes, decisions, evidence, and remaining risk.

## Deviation protocol

When reality diverges from a builder dispatch:

1. The builder stops and reports: expected, found, exact evidence, completed/not completed, and at most one short hypothesis. It does not investigate, improvise, or alter the plan.
2. The Orchestrator triages:
   - obvious correction → tighten and re-dispatch;
   - missing mechanical evidence → dispatch `verifier`;
   - genuine unknown → dispatch `researcher` with the report, map, and plan slice.
3. The researcher returns root cause, options/tradeoffs, recommendation, and only the facts needed downstream.
4. The Orchestrator decides, updates the plan, and re-dispatches.

Workflow failures use the same ladder; do not absorb their raw logs into the main context.

## Dispatch mechanism

- Use the Agent tool when later control flow depends on the previous result.
- Use a Workflow for a known deterministic fan-out, staged pipeline, or loop; isolate writing nodes in worktrees.
- Every node names a role agent and explicit model.

Every dispatch contains:

- **Agent/model:** named role and explicit route.
- **Objective:** one concrete outcome.
- **Context:** relevant map/plan slice, paths, decisions, `AGENTS.md`, applicable rules, and guide/spec.
- **Scope:** owned files, shared/off-limits files, allowed tools, and permission limits.
- **Output:** exact distilled return shape; no process diary.
- **Deviation contract:** required stop/report behavior for writers.
- **Acceptance criteria:** independently checkable completion conditions.

## External model bench

External models widen execution and review capacity; they never inherit authority. Their output is a proposal or hypothesis until the native `checker`, `reviewer`, and Orchestrator verify it.

### Composer

- Use only for very small, fully specified, taste-free work such as scaffolds, bulk renames, boilerplate, or matrix-derived configuration. If two correct implementations could differ meaningfully, use `builder`.
- Run through its role agent in a Cursor worktree with `agent -p --trust --force -w ...`; never the main tree. It never commits, pushes, or accesses credentials.
- Canonical command: `agent -p --trust --force -w <unit-worktree> --model "$CURSOR_COMPOSER_MODEL" "<dispatch>"`; Cursor worktrees live under `~/.cursor/worktrees/<repo>/<name>`.
- Its diff is untrusted until `checker` and `reviewer` pass it; the Orchestrator applies it and `verifier` proves the integrated tree.

### Grok

- Use `agent -p --trust --mode=ask ...` for an independent security/concurrency/failure-mode/alternative pass.
- Canonical command: `agent -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" "<question>"`.
- It is read-only; `--force` never appears. Findings remain hypotheses until independently verified by `reviewer` or the Orchestrator.

### Codex

- Use `codex:worker` for fully specified implementation that benefits from an independent OpenAI executor. It runs `gpt-5.6-terra` at medium effort in a detached worktree with `--sandbox workspace-write`.
- Use `codex:thinker` for independent planning, diagnosis, review, or adversarial analysis. It runs `gpt-5.6-sol` at high effort in the current checkout with `--sandbox read-only`.
- Raise the thinker to `xhigh` only for a stated hard reasoning need. Use `gpt-5.6-luna` only after a repeatable, high-volume workload proves it is sufficient.
- Both routes use `codex exec --ephemeral`; the dispatcher never commits, pushes, installs, authenticates, or reads credentials.
- Claude Code Cloud setup installs `@openai/codex` globally but never authenticates:
  setup state is snapshotted and must contain no Codex credentials.
- At the start of each live Cloud session, the user runs
  `codex login --device-auth` and completes ChatGPT approval in their browser.
  `scripts/codex.sh` only reports readiness; it never installs, authenticates,
  logs out, reads the auth cache, or performs a model call.
- If ChatGPT device login is unavailable or expires, the Codex bench is dark.
  Use the native fallback; never substitute an API key, access token, copied
  `auth.json`, or another login flow unless the user changes this policy.

Codex environment defaults:

```text
CODEX_WORKER_MODEL=gpt-5.6-terra
CODEX_WORKER_EFFORT=medium
CODEX_THINKER_MODEL=gpt-5.6-sol
CODEX_THINKER_EFFORT=high
```

### Bench mechanics

- Read exact Cursor model IDs from `agent models`; store them in `CURSOR_COMPOSER_MODEL` and `CURSOR_GROK_MODEL`. Never guess or silently substitute.
- The external dispatchers use Sonnet only to operate their CLI. External routing is policy, not a frontmatter fallback.
- Never expose `CURSOR_API_KEY`; never print, inspect, copy, upload, commit, or
  package Codex auth files. The current Codex policy uses per-session ChatGPT
  device login, not `CODEX_API_KEY` or `CODEX_ACCESS_TOKEN`.
- Each dispatch names `AGENTS.md`, applicable rules, guide/spec, non-negotiables, file ownership, output shape, and acceptance criteria.
- Prefer the bench only for already-qualified work. If the CLI, model, or authentication is unavailable, a retry fails, or taste appears, fall back without ceremony: `composer → builder`, `grok → reviewer`/Opus.
- Codex fallbacks are `codex:worker → builder` and `codex:thinker → researcher`/`reviewer`.
- External failure becomes a normal deviation report.

## Acceptance laws

- No builder or external-model self-assessment is authoritative.
- Do not dispatch vague/generic agents when a role exists, ask Sonnet to plan, spend Opus on cheap discovery/mechanical edits, cold-scout mapped Orkestrel terrain, or let an executor debug beyond scope.
- Do not accept unreviewed implementation, unverified hypotheses, shared-tree writing races, implicit models, fixed Claude IDs, or verbose completed-work residue.
- Final acceptance belongs only to the Orchestrator after independent review and gate evidence.
