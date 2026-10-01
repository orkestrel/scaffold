# Unit ROADMAP-AUDIT — Verify each open scaffold ROADMAP item against the tree

## Role and engine

Distiller on Grok 4.7 (`grok-4.7-high`), reached as the Cursor transport in ask mode. Executor: BENCH_ENGINE.

## Objective

For every open item in `ROADMAP.md` (the items not marked **Closed**), decide from the current tree whether its stated close condition holds, and cite the evidence.

## Context

- **Evidence.** The checkout is `C:\Users\mikes\WebstormProjects\scaffold` on `main` at commit `bb57e60dc` ("Close the contract republish wave"), published as `@orkestrel/scaffold` 0.0.81 on 2026-09-29. `git status --porcelain` is empty apart from this brief. The open items are 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 17, 22, 23, 24, 25, 26, 27, 28, 29, 33, 35, 36, and 38; items 1, 10, 11, 12, 13, 16, 18, 19, 20, 21, 30, 31, 32, 34, and 37 are marked **Closed** and are out of scope.
- **Law.** `AGENTS.md`; `.claude/rules/writing.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`; `ROADMAP.md` itself states each item's close condition.
- **Installed primitives.** none needed; this is a reading unit.
- **Host.** Windows 11; you read files only.
- **Standing conditions.** The user deleted the checkout's `tmp/` directory apart from this brief; nothing there is evidence. On 2026-09-29 every published `@orkestrel` package except `supervisor` was re-pinned, overwritten with scaffold, gated, pushed, and republished in a contract wave, and scaffold commit `bb57e60dc` records it, including the `test` package's visit; use that fact when you rule item 38.

## Unknowns

Where you cannot find evidence either way, rule the item open and say what you searched.

## Scope

- **Owned.** none.
- **Shared (report-only).** none.
- **Off-limits.** Every file: write nothing, edit nothing, run nothing that changes state.
- **Made false by this change.** none.
- **Tools and limits.** Read files and search the tree. Read git history only if your tools expose it.

## Execution

Perform the assignment yourself and spawn nothing.

## Output

Your final message is a Markdown table with one row per open item, in item order, with the columns Item, Status, Evidence, and Remaining. Status is exactly one of `addressed` (the close condition holds), `partial` (part of it holds), or `open` (it does not hold). An item that asks for a ruling ("Rule whether", "Rule on", "Decide whether", "Re-propose") is addressed only when the ruling or proposal is recorded in the tree: a rule file, a skill, a guide, a code comment, or the record `bb57e60dc` carries. Evidence cites `file:line` for every claim. Remaining states in one sentence what still has to happen, or `none`. After the table, add one line per item you found ambiguous, naming the ambiguity. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, one hypothesis) if `ROADMAP.md` lists a different open-item set than the Context names. Settle every reading choice yourself and record it in the ambiguity lines.

## Acceptance criteria

1. The table has exactly the 23 open items, in order.
2. Every addressed or partial row cites a `file:line` that exists and says what it shows.
3. Every open row names the evidence that keeps it open.

**Observations, not criteria.** none.

## Review evidence

The table itself; the Orchestrator checks every citation against the tree.
