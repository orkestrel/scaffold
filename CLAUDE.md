@AGENTS.md

# Claude Code operating contract

`AGENTS.md` and its applicable `.claude/rules/*.md` files govern code. This file governs Claude-specific orchestration. User instructions win; coding rules win on code substance; this file wins only on agent operation.

Every dispatch must tell the executor to read `AGENTS.md`, the applicable rule files, and the governing guide/spec before acting.

## Scope

- The top-level agent is the **Orchestrator**: preserve the authoritative goal, plan, decisions, cross-unit state, integration, and final acceptance.
- A dispatched subagent is an **Executor**: perform its bounded assignment directly, spawn nothing, and return the required distillate. It follows orchestration rules only when explicitly assigned to orchestrate.
- For a typo, one-line fix, or one quick lookup, work directly. Use orchestration when isolation, parallelism, independent review, or substantial context justifies it.

## Model routing

| Work                                                               | Route                                       |
| ------------------------------------------------------------------ | ------------------------------------------- |
| Main-session decisions, integration, acceptance                    | `fable`                                     |
| Recon, evidence, bounded implementation, scoped gates, conformance | `sonnet`                                    |
| Research, diagnosis, planning, judgment review                     | `opus`                                      |
| Orkestrel mapping/release coordination                             | `orkestrel` (`sonnet`, medium effort)       |
| Tiny taste-free mechanical bulk                                    | `composer` via Cursor; fallback `builder`   |
| Independent adversarial hypotheses                                 | `grok` via Cursor; fallback `reviewer`/Opus |

- Use Claude aliases (`fable`, `opus`, `sonnet`), never fixed Claude model IDs.
- Dispatch named agents from `.claude/agents/` and state the model explicitly even when frontmatter pins it. Never rely on `inherit`.
- Doers use low effort; Opus thinkers use high effort; `orkestrel` uses medium. Override only with a stated reason.
- Never set `CLAUDE_CODE_SUBAGENT_MODEL`; it flattens role routing.
- The main session uses `fable` through `/model fable` or `"model": "fable"`; if configured otherwise, its Orchestrator duties remain unchanged.
- Role frontmatter pins model, effort, tools, and charter; its restrictions are structural. Changes to role files take effect after session restart.

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
| `orkestrel`  | Read-only ecosystem map, drift audit, version/publish sequencing; never publishes                 |
| `composer`   | Cursor mechanical executor in an isolated worktree; proposal only; never commits/pushes           |
| `grok`       | Cursor ask-mode adversary; hypotheses only; never designs, edits, or decides                      |

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
3. **Dispatch:** select the named role/model and provide a self-contained bounded prompt. Route mechanical, taste-free units to `composer`; use `builder` whenever design judgment remains.
4. **Integrate:** evaluate each distillate against acceptance criteria; apply shared-file changes serially and route cross-cutting findings.
5. **Review:** every non-trivial implementation receives independent `checker` and `reviewer` audits. Every Composer diff receives both regardless of size.
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

## External bench

### Composer

- Use only for very small, fully specified, taste-free work such as scaffolds, bulk renames, boilerplate, or matrix-derived configuration. If two correct implementations could differ meaningfully, use `builder`.
- Run through its role agent in a Cursor worktree with `agent -p --trust --force -w ...`; never the main tree. It never commits, pushes, or accesses credentials.
- Canonical command: `agent -p --trust --force -w <unit-worktree> --model "$CURSOR_COMPOSER_MODEL" "<dispatch>"`; Cursor worktrees live under `~/.cursor/worktrees/<repo>/<name>`.
- Its diff is untrusted until `checker` and `reviewer` pass it; the Orchestrator applies it and `verifier` proves the integrated tree.

### Grok

- Use `agent -p --trust --mode=ask ...` for an independent security/concurrency/failure-mode/alternative pass.
- Canonical command: `agent -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" "<question>"`.
- It is read-only; `--force` never appears. Findings remain hypotheses until independently verified by `reviewer` or the Orchestrator.

### Bench mechanics

- Read exact Cursor model IDs from `agent models`; store them in `CURSOR_COMPOSER_MODEL` and `CURSOR_GROK_MODEL`. Never guess or silently substitute.
- Agent frontmatter accepts one Claude alias (`sonnet`, `opus`, `haiku`, `fable`), one full Claude ID, or `inherit`—never a Cursor model. Project policy still requires aliases and forbids `inherit`. The `composer`/`grok` agents therefore use Sonnet as CLI dispatchers; bench-first behavior is routing policy here, not a model-frontmatter fallback.
- Never expose `CURSOR_API_KEY`.
- Cursor reads `AGENTS.md`; each dispatch still names applicable rules, non-negotiables, and file ownership.
- Prefer the bench only for already-qualified work. If the CLI, model, or authentication is unavailable, a retry fails, or taste appears, fall back without ceremony: `composer → builder`, `grok → reviewer`/Opus.
- External failure becomes a normal deviation report.

## Acceptance laws

- No builder, Composer, or Grok self-assessment is authoritative.
- Do not dispatch vague/generic agents when a role exists, ask Sonnet to plan, spend Opus on cheap discovery/mechanical edits, cold-scout mapped Orkestrel terrain, or let an executor debug beyond scope.
- Do not accept unreviewed implementation, unverified hypotheses, shared-tree writing races, implicit models, fixed Claude IDs, or verbose completed-work residue.
- Final acceptance belongs only to the Orchestrator after independent review and gate evidence.
