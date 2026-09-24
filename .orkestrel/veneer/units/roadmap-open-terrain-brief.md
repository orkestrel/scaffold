# Unit ROADMAP-OPEN — terrain: which roadmap carrier rows are still open

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and
returns the journal path, the session id, and Grok's answer. Grok performs the reading itself and
spawns nothing.

## Objective

Classify every row of the `## Carriers` section of `/home/user/veneer/ROADMAP.md` by whether its
carrier has already landed, with the evidence, so the Orchestrator can close the stale rows and pick
the next implementation unit.

## Context

**Evidence.** `/home/user/veneer` is on `claude/inspiring-allen-t4qzv1` at `0fdadf4`, equal to
Veneer `origin/main`. `ROADMAP.md` § Carriers starts at the `## Carriers` heading (around line 417)
and ends at `## Decisions` (around line 541). Some rows end with a carrier cell reading `Closed:` or
`closed:`; many others name a unit (F5 ACCOUNTING, F6 FOUNDATION, F7 CAPTURE, E-IDENTITY, and so on)
with no closure mark. `ROADMAP.md` § Phases and units (around lines 260 to 300) records which units
landed and their commits.

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `git log`, `git show`, and `grep` in `/home/user/veneer` only.
Write nothing.

## Unknowns

None.

## Scope

- Read: `/home/user/veneer/ROADMAP.md`, `/home/user/veneer/guides/veneer.md`, the Veneer tree, and
  `git log` in `/home/user/veneer`.
- Off-limits: every write.

## Execution

For every row in § Carriers that carries no `Closed`/`closed` mark in its carrier cell:

1. Name the row by its first cell's opening words, with its line number (approximate).
2. Name its carrier unit.
3. Decide one status, with evidence:
   - **landed** — the carrier unit landed (a commit in `git log`, or a § Phases and units row reading
     `landed`) and the row's stated obligation is met in the tree. Cite the commit and the file and
     symbol that meet it.
   - **landed, obligation unmet** — the carrier landed but the tree does not meet the row's stated
     obligation. Cite what is missing.
   - **open, implementation** — the carrier has not landed and the work is code or tests that need no
     user decision.
   - **open, user** — the row waits on a user ruling, a user install, or a one-time code.
   - **open, engine** — the carrier is a J-ENGINE unit (the engine session owns it).
   - **open, later phase** — the carrier is E-VUE, E-ELEMENTS, E-IDENTITY, E-RECEIPTS, P1, X-EXIT, or
     X-RETENTION.

## Output

One Markdown table: line, row, carrier, status, evidence (commit, file, symbol). Then one short list
naming each **open, implementation** and **landed, obligation unmet** row with the smallest concrete
change that would close it. No process diary.

## Deviation contract

Stop and report if `ROADMAP.md` has no `## Carriers` section.

## Acceptance criteria

Every unmarked row in § Carriers appears once in the table with a status and evidence.

## Review evidence

The Orchestrator samples the cited commits and symbols before acting on any row.
