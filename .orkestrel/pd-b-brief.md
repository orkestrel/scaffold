# PD-B — Carry check over the scaffold, process, and test campaign folders

## Role and engine

`grok` — Cursor Grok, through the Cursor CLI bridge your role file pins. Read-only.

## Objective

Produce one list: every item in these three campaign folders that is **still open**, each with the
carrier that will close it, or with `NO CARRIER` where none exists. Separately, name every **process
law** these folders state that is not yet written into a rule or contract file.

An item is a defect, a finding, a measurement to re-take, a deferred decision, a withdrawn claim, or
an acceptance condition. An item is **open** unless the file itself records it closed with evidence.

This exists because all three folders are about to be deleted. Anything open in them with no carrier
dies with them.

## Context

Three slices. Read every file in each.

1. `/home/user/scaffold/.orkestrel/fleet/` — 11 files, including `BACKLOG.md`, `PLAN.md`, `SESSION.md`.
2. `/home/user/scaffold/.orkestrel/scaffold/` — 50 files across `antislop-audit/`, `skills-audit/`, `style-audit/`, plus `peer-impl-brief.md`, `peer-widen-brief.md`, `pin-drift.md`, `probe-design-brief.md`.
3. `/workspace/process/.orkestrel/process/` — 13 files. `HANDOFF.md` (18,893 bytes) and `readiness-grade.md` (75,916 bytes) are the two carriers; the rest are briefs and reports.
4. `/workspace/test/.orkestrel/test/wait-for-condition-plan.md` — one file.

`.orkestrel/fleet/BACKLOG.md` is a backlog by name. Treat every unclosed row in it as an open item.

Carriers you can name, and how to check each:

- **LANDED** — a commit closed it. `git log --oneline -60` in the repository that owns the slice. Scaffold is at `/home/user/scaffold` on branch `claude/oxlint-conventions-audit-m66uiq`; process is at `/workspace/process`; test is at `/workspace/test`.
- **IN RULE** — the law is already written into a durable instruction file. Check `/home/user/scaffold/.agents/orchestration.md`, `/home/user/scaffold/AGENTS.md`, and `/home/user/scaffold/.claude/rules/*.md`. Quote the line.
- **LIVE BRIEF** — an existing brief owns it. In process those are `pc4-brief.md` and `p1-brief.md`. Name the file and the item.
- **NO CARRIER** — nothing owns it. This is the answer that matters most. Do not soften it.

A **process law** is a statement about how agents, benches, gates, or dispatches behave that would be
true in the next campaign. It belongs in `.agents/orchestration.md` or a `.claude/rules/*.md` file. A
statement about what the probe or process package does is product truth, not a process law; classify it
as an item instead.

Governing files, read before ruling: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.agents/orchestration.md`
(§ Dispatch anatomy, "Carry every finding" and "Promote anything that must outlive the campaign";
§ Where campaign artifacts live), `/home/user/scaffold/.claude/rules/writing.md`.

## Unknowns

Whether `.orkestrel/fleet/` describes a campaign that already finished. If its `SESSION.md` or `PLAN.md`
records completion, say so and grade its backlog rows against that.

## Scope

Read-only. Owned files: none — you write no file in any repository. Off-limits: every file outside the
four slices except the governing files named above and `git log` output. Allowed tools: Read, Grep,
Glob, Bash for `git log` and `git show` only.

## Execution

Perform this assignment directly. Spawn nothing.

## Output

Return two Markdown tables and nothing else before them. No process diary.

First:

| # | Item, stated as the falsifiable claim it makes | Source file:line | Carrier | Evidence |

Second:

| # | Process law, stated as a directive | Source file:line | In rule? | Where it must land |

Then two short sections:

- `## NO CARRIER` — repeat only the item rows whose carrier is `NO CARRIER`, each with one sentence on what closing it requires.
- `## Unwritten laws` — repeat only the law rows whose `In rule?` is no, each with the exact file it must land in.

## Deviation contract

If the Cursor bench does not round-trip, stop and report the bench dark with the exact error. Do not
answer from your own engine. If a named path does not exist, report it and continue with the rest.

## Acceptance criteria

1. Every row cites a real `file:line` that a reader can open.
2. Every `LANDED` carrier cites a real commit hash from the repository that owns the slice.
3. Every `IN RULE` row quotes the line from the rule or contract file that carries the law.
4. Both `NO CARRIER` and `Unwritten laws` sections are present, even if empty.
