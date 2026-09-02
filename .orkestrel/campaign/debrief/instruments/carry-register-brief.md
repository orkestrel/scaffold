# Unit carry-register — distill every open item the campaign folder records

## Role and engine

`grok` on Cursor Grok, reached through the Claude-side `grok` driver and the `agent` CLI. This brief is read by the Grok engine inside its own CLI.

## Objective

Return one deduplicated register of every item the campaign record leaves open — a finding recorded for the next change, a successor row, a successor question, a debrief question, a next-campaign standing condition, a question put to the user, a question for scaffold's rule files, and an item explicitly "recorded, not fixed" — with a `file:line` pointer for each, grouped by the package or canon file that owns it.

## Context

**Evidence.** The campaign folder is `/home/user/scaffold/.orkestrel/campaign/`. The Orchestrator's own bounded search ran on 2026-09-02:

```text
grep -rlE '(Findings? for the next change|[Ss]uccessor rows?|[Ss]uccessor question|for the debrief|next matrix|next campaign|recorded for the next|[Rr]ecorded, not (a fix|scheduled|units?)|carried to|[Cc]arrier: .*next change|question for the user|[Qq]uestion for scaffold)' --include='*.md' .
```

That search is a text pattern over one spelling of each phrase; it under-reports items written in other words. Read every file in `npm-audit-deps-findings.md`, `fix/breaking-plan.md`, `fix/audit-1-verdict.md`, `fix/units/*-verdict.md`, `fix/units/*-audit-verdict.md`, `voice/units/*-verdict.md`, `voice/plan.md`, `src-audit/verdicts/**`, and `src-audit/h12-audit-verdict.md` at absorption depth, and read the other files under `fix/units/`, `fix/reports/`, and `voice/units/` only where a verdict or the findings file points into them.

**Law.** Read-only. `AGENTS.md` § Writing forbids stating a count in prose: name the members. `.claude/rules/writing.md` governs the register's prose.

**Host.** POSIX shell, working path `/home/user/scaffold`, no network needed, no writes.

**Measurements.** `find .orkestrel/campaign -type f | wc -l` reports 1255 files; `ls fix/units | wc -l` 458; `ls voice/units | wc -l` 388.

**Standing conditions.** None of these files is dirty. Nothing else runs in the tree.

## Unknowns

Whether an item recorded in one verdict was closed by a later unit in the same campaign. Where a later file names the earlier item as closed, record the item once with both pointers and the word `closed`; where nothing names it closed, record it `open`.

## Scope

**Owned.** Nothing. Read only.

**Off-limits.** Every file. Run no git command that changes the tree. Read no `.env*`, `.npmrc`, `auth.json`, or credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn nothing.

## Output

Return, in Markdown, under these headings and nothing else:

- `Question`: one line.
- `Evidence`: for each owner (a fleet package name such as `middleware`, or a canon path such as `.claude/rules/names.md`), a bulleted list of items; each item is one sentence stating the open condition in the record's own words, then `open` or `closed`, then the `file:line` pointer(s) relative to `.orkestrel/campaign/`.
- `Distillate`: the owners with the most open items, one line each.
- `Unknowns`: items whose owner could not be determined, with pointers.
- `Deviation`: `none`, or what failed.

No raw file dumps. No recommendation. No decision.

## Deviation contract

Stop and report if the folder is missing or unreadable. Decide and record any ancillary question yourself — which owner a cross-package item belongs to goes to the package whose file the record names first.

## Acceptance criteria

1. Every file the Orchestrator's search listed contributes at least one item or is named under `Unknowns` with the reason it contributes none.
2. Every item carries a pointer that resolves to a line in the campaign folder.
3. The register names no count in prose.

## Review evidence

The Orchestrator compares the register against its own grep control (`grep-control.txt`) file by file.
