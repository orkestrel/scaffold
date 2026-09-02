# Unit retrospective — distill the process record of the fleet campaign

## Role and engine

`grok` on Cursor Grok, reached through the Claude-side `grok` driver and the `agent` CLI. This brief is read by the Grok engine inside its own CLI.

## Objective

Return the evidence the debrief's process retrospective judges by, distilled from the campaign record with `file:line` pointers: every dispatch that deviated and why; every recovery that worked and the mechanism that saved it; estimates against observed durations where the record carries both; audit rounds that caught a real defect against rounds that churned; work the Orchestrator absorbed that a role should have taken, and work dispatched that the Orchestrator should have owned; and every process rule the record states as binding mid-campaign, with whether it names the rule or contract file that took it.

## Context

**Evidence.** The campaign folder is `/home/user/scaffold/.orkestrel/campaign/`. The primary register is `npm-audit-deps-findings.md` (read in full). Read `fix/breaking-plan.md`, `voice/plan.md`, `fix/audit-1-verdict.md`, `audit-1-verdict.md`, `src-audit/h12-audit-verdict.md`, every `*-audit-verdict.md` under `fix/units/` and `voice/units/`, every `*-report.md` under `fix/units/`, `fix/reports/`, and the folder root, and the bench journal heads under `/home/user/scaffold/tmp/cursor/*.log`. Read briefs only where a report or verdict points into one.

**Law.** Read-only. `AGENTS.md` § Writing forbids stating a count in prose: name the members. `.claude/rules/writing.md` governs the distillate's prose.

**Host.** POSIX shell, working path `/home/user/scaffold`, no network needed, no writes.

**Standing conditions.** `.orkestrel/campaign/last/`, `.orkestrel/campaign/voice/instruments/`, and a handful of files under `fix/units/` and `diffs/` are untracked retention copies; read them as record. Nothing else runs in the tree that writes under `.orkestrel/`.

## Unknowns

Where the record states an outcome without its cause (an empty bench journal with exit 1, a container restart), record it as observed and do not infer a cause.

## Scope

**Owned.** Nothing. Read only.

**Off-limits.** Every file. Run no git command that changes the tree. Read no `.env*`, `.npmrc`, `auth.json`, or credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn nothing.

## Output

Return, in Markdown, under these headings and nothing else:

- `Question`: one line.
- `Evidence`: six bulleted lists titled `Deviations`, `Recoveries`, `Durations`, `Audit rounds`, `Absorption and dispatch`, and `Mid-campaign rules`; each item one or two sentences in the record's own words with its `file:line` pointer(s) relative to `.orkestrel/campaign/` or `tmp/cursor/`.
- `Distillate`: the recurring classes across the six lists, one line each, each naming the items it groups.
- `Unknowns`: outcomes with no recorded cause, with pointers.
- `Deviation`: `none`, or what failed.

No raw file dumps. No recommendation. No decision.

## Deviation contract

Stop and report if the folder is missing or unreadable. Decide and record any ancillary question yourself.

## Acceptance criteria

1. Every item carries a pointer that resolves to a line in the named folders.
2. Every `*-audit-verdict.md` file contributes to `Audit rounds` (caught, churned, or reversed by rule authority) or is named under `Unknowns`.
3. The distillate names no count in prose.

## Review evidence

The Orchestrator reads the distillate against the primary register and the verdict files it names.
