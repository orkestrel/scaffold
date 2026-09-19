# Unit recovery — recover the unfinished campaign

## Role and engine

Grok on Cursor Grok, reached through the versioned Cursor CLI in read-only ask mode.

## Objective

Recover the unfinished objective and the evidence-supported safe next action from the Claude Scaffold session and Roughnotes work.

## Context

**Evidence.** `Get-ChildItem` reports the Scaffold session `d7d4417a-5b51-47b1-85d7-d00611fbd930.jsonl`, modified 2026-09-18 09:24 local. The handoff `rebaseline-2.md` records R-A-2, R-B, field pass, and debrief. `git -C ../roughnotes status --short` reports modified browser components, constants, guide, and browser tests.

**Law.** Read AGENTS.md, .agents/orchestration.md, .claude/rules/writing.md, quality.md, and portability.md. This is evidence recovery; no implementation skill applies. Read guides/README.md and the campaign plan as needed to identify scope.

**Installed primitives.** No source implementation; do not inspect dependencies.

**Host.** Windows, PowerShell, root C:/Users/mikes/WebstormProjects/scaffold. Read-only assignment.

**Measurements.** Verify recovered claims against the actual named files and process rows.

**Control identifiers.** None; identify evidence by paths and timestamps.

**Standing conditions.** Roughnotes has uncommitted edits. Scaffold has uncommitted campaign artifacts and Codex config edits. Claude processes were observed under parent 12140, including 24828 with a Codex child. Do not terminate anything.

## Unknowns

Report which task was last running, what completed, what failed, what remains, and whether executors are still writing. Distinguish an idle Claude UI or MCP server from an active writer. Do not infer activity from PID existence alone.

## Scope

**Owned.** Read C:/Users/mikes/.claude/projects/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930.jsonl, relevant prior sessions and roughnotes sessions, scaffold/.orkestrel/campaign, scaffold/tmp, neighboring roughnotes tmp and .orkestrel evidence, and git status/log in roughnotes.

**Shared (report-only).** All files.

**Off-limits.** Credentials, auth files, .env files, .npmrc files, tokens, keys, unrelated environment values. Never output secret-bearing configuration or raw full process arguments if they contain credentials.

**What asserts the state this change ends.** Latest user messages, session summaries, executor final reports, gate journals, and file modification times.

**Tools and limits.** Read-only tools and commands. No edits, tests, installs, commits, process launches other than read commands, or process termination. Read session summaries and recent relevant messages before earlier bulk history. Do not dump raw JSON logs.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Return a concise distillate with source file:line pointers: latest user intent, completed units, unfinished units, exact recorded gate commands and outcomes, missing acceptance evidence, live writer evidence, and immediate safe continuation. Name unreached inputs and uncertainty. Return findings, not a design or acceptance decision.

## Deviation contract

Report inaccessible evidence; choose a bounded adjacent source within scope and continue. Do not invent missing history.

## Acceptance criteria

- Identify the latest actionable user instruction and pending unit from session evidence.
- Tie modified Roughnotes files to retained executor work or report ownership unknown.
- Report the gate state and the next unresolved acceptance requirement.

**Observations, not criteria.** Prior gate output is historical evidence, not a fresh pass.

## Review evidence

Provide citations for every conclusion and concise exact process evidence where needed.
