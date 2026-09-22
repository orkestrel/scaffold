# Unit F0 ROADMAP — Write Veneer's executable plan of record

## Role and engine

`opus` on Opus 5, a native Claude subagent. Perform the assignment directly and spawn nothing.

## Objective

Write `/home/user/veneer/ROADMAP.md`: the concise, executable plan of record that replaces the
campaign's diary-shaped `plan.md`, carrying everything a unit reads and nothing a run recomputes.

## Context

**Evidence.** Read in this order, all whole:

- `/home/user/scaffold/.orkestrel/veneer/tenets.txt` — the tenets; reproduce them verbatim as the
  roadmap's first section after the title paragraph.
- `/home/user/scaffold/.orkestrel/veneer/realign-design-verdict.md` — the Orchestrator's rulings,
  the decisions that stay the user's, the routing ledger, and the exit criterion. This file wins
  over every other input where they disagree; stop and report a disagreement rather than resolving it.
- `/home/user/scaffold/.orkestrel/veneer/units/realign-design-planner-report.md` § 13 and
  `/home/user/scaffold/.orkestrel/veneer/units/realign-design-analyst-report.md` § Tensions 13 —
  the two carrier tables; merge them under the verdict's unit names.
- `/home/user/scaffold/.orkestrel/veneer/units/g1-record-report.md` § C (standing rulings) and § D
  (open questions and bounds).
- `/home/user/scaffold/.orkestrel/veneer/research/ledger.md` § Units (lines around 13 to 31) — the
  family-to-key assignment, which the roadmap's family queue absorbs; and
  `/home/user/scaffold/.orkestrel/veneer/units/remaining-surface.md` § "The remaining keys" — the
  key groups per family.
- `/home/user/scaffold/.orkestrel/veneer/plan.md` lines 22 to 52 (authority and routing) and 74 to
  90 (standing conditions), to carry forward what still holds, re-measured: the Codex route is
  `gpt-6-astra`, the Cursor route is Grok 4.7, this host's browser receipt is Chromium 141, the
  host runs npm 10.9.7 against a manifest that pins npm 11.6.0 or later, and the Test dependency is
  the unpublished tip until `0.0.19` publishes (`units/test-tip-vendor.md`).
- `/home/user/scaffold/.orkestrel/veneer/units/veneer-audit-reviewer-report.md` and
  `units/veneer-audit-checker-report.md` — the audit findings so far; the objective lane's verdict
  is still running and its findings will be folded by a successor edit, so leave one line under the
  carrier register saying so.

**Law.** `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files (the roadmap is executed,
not read: every line a directive, a trigger, or a fact a unit needs; no counts; no history of how a
fact was found); `/home/user/scaffold/.claude/rules/writing.md` (the substitution table binds: no
`should`, `simply`, `just`, `currently`, `now`, `via`, `e.g.`, `etc.`, `above`, `below`);
`/home/user/scaffold/.claude/rules/documentation.md` ("`ROADMAP.md` is the sequenced plan of
record. Each chunk reaches green before the next"); `/home/user/scaffold/.agents/orchestration.md`
§ Execution loop (design step: a routing ledger naming each unit's role and engine, and an exit
criterion) and § Where campaign artifacts live (prefer a mechanism that recomputes a fact over a
document that records it). Skill: none. Guide: `/home/user/veneer/guides/veneer.md` (read § Compatibility,
§ Deferred selectors, and § Departures from Bootstrap headings only; the roadmap points at them as
the machine-read record and restates none of their rows).

**Installed primitives.** None the file reaches.

**Host.** Linux, bash. The Veneer checkout is `/home/user/veneer` on branch
`claude/inspiring-allen-t4qzv1`, clean, with the Test tip tarball installed under `node_modules`.
`npm run test:policy` runs the vendored policy sweep, which reads every authored Markdown file for
the banned terms.

**Measurements.** Carry a number only as a value the reader needs (a version, a date, a size a
run produced, cited to the file that holds it). Write no count of keys, units, rows, or files;
name the members or point at the file.

**Control identifiers.** None.

**Standing conditions.** `package-lock.json` is unchanged; `node_modules` carries the vendored Test
tip. The policy sweep's Markdown population includes the new file.

## Unknowns

- The user has not yet ruled on decisions D1 to D9 in the verdict; carry each as an open row under
  a `## Decisions` section, with the recommendation, and mark the units that wait on it.
- The audit's objective lane has not returned; leave the one-line note named above.

## Scope

**Owned.** `/home/user/veneer/ROADMAP.md` (new).

**Shared (report-only).** None.

**Off-limits.** Every other file in every checkout, `guides/veneer.md` and `README.md` included.

**What asserts the state this change ends.** `tests/policy.test.ts` (the banned-term and Markdown
sweeps) reads the new file; nothing else.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Write`, `Edit`, and `Bash` for the scoped checks
below only. No install, no build, no tree-wide mutating command, no git command that writes.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report at `/home/user/scaffold/tmp/units/roadmap-report.md` and as your final message: the
file's section list with one line each, the scoped validation commands with their output, every
disagreement between inputs you met and how the verdict settled it, and deviation state. No
process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where an input contradicts the verdict on a ruling, or where a carrier in the lane
tables names no unit in the verdict's ledger. Decide, record, and carry on from section order,
headings, and wording.

## Acceptance criteria

1. The file opens with one paragraph naming what Veneer is and the phase order the user ruled
   (foundation, Bootstrap baseline, build-on), then carries these sections in this order:
   `## Tenets` (verbatim from `tenets.txt`), `## Rulings` (the standing rulings from G1 § C and
   the verdict's rulings, one line each), `## Routing` (engines, transports, the Sonnet driver hop
   omitted, one lane per bench, the Astra thread id recorded beside every bench report),
   `## Standing conditions` (re-measured, with the file each was taken from), `## Exit criterion`
   (the verdict's, verbatim), `## Phases and units` (the verdict's ledger as a table with role and
   engine, checkout, dependencies, and what each closes; the family queue with each family's key
   set from the ledger's Units table and the remaining-surface groups), `## Protocol` (the
   per-family and per-unit protocol from the verdict's ruling 12), `## Carriers` (every open item
   from both lane tables with its unit or its recorded drop), `## Decisions` (D1 to D9 as open
   rows with recommendations), `## Records` (where the machine-read record lives: the guide's
   sections and the oracle fixture; where the campaign records live: `.orkestrel/veneer/` in the
   scaffold checkout; the rule that the roadmap states no status a run recomputes).
2. Under 400 lines; every path in it resolves from `/home/user/veneer` or is given absolutely under
   `/home/user/scaffold`; the routing names `gpt-6-astra` and `grok-4.7-high` and no `gpt-5.6-sol`
   or Grok 4.6.
3. `cd /home/user/veneer && npm run test:policy` exits 0 (the banned-term sweep over the new file);
   `npx oxfmt --config .oxfmtrc.json --check ROADMAP.md` exits 0.

**Observations, not criteria.** None.

## Review evidence

The new file and `git status --porcelain` in the Veneer checkout, returned in the report.
