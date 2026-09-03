# Unit conform-interpret fix round 1 — the report's sweep record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-interpret-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/interpret`.

## Objective

Close the round-1 objective lane's refutation of claim 4 (`units/l3/interpret-objective-r1.md` § Required change R-1), on the record: the report's § Sweeps carries the old-form sweep for interpret-obj-6 and a `complete` sweep whose population names `guides/README.md` and whose inflection pass is recorded with each hit ruled by sense.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; the conform-interpret brief at `/home/user/scaffold/tmp/units/conform/conform-interpret-brief.md` § Method (a documentation row records the sweep proving its old form gone; the old-name sweep runs at a word boundary and again case-insensitively over the inflections).

**The lane's readings.** § Sweeps (report lines 118-128) carries no row for interpret-obj-6's old forms — `zero-dependency`, `ESM-only (no CommonJS build)`, `Node.js >= 22` — and its `complete` row (line 125) names a population without `guides/README.md` and records no inflection pass. The lane swept both itself: the obj-6 forms are gone (the one `Node.js` hit is the corrected `README.md:22`, `Node.js >= 22.12.0`), and the `complete` hits are the absence assertions at `tests/src/core/Interpret.test.ts:99-100`, `tests/src/core/stages/Clarifier.test.ts:28`, and `tests/src/core/stages/Extractor.test.ts:43` and the derivation sentence at `src/core/types.ts:277` and `guides/interpret.md:69`, every one permitted.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rn <pattern> /home/user/fleet/interpret/src /home/user/fleet/interpret/tests /home/user/fleet/interpret/README.md /home/user/fleet/interpret/guides/interpret.md /home/user/fleet/interpret/guides/README.md` (add `-i` for the case-insensitive pass), one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-interpret-report.md`.

**Off-limits.** Everything else.

## Rows

1. Re-run the interpret-obj-6 sweep (`zero-dependency|ESM-only|no CommonJS build|Node\.js >= 22$`) over `src`, the non-vendored `tests`, `guides/interpret.md`, `guides/README.md`, and `README.md`, and add its row to § Sweeps with the one permitted `README.md:22` hit ruled.
2. Re-run the `complete` sweep at a word boundary and case-insensitively over the inflections (`complete(s|d|ing)?`) with `guides/README.md` in the population; rewrite the row at line 125 to name the full population and record the inflection pass, ruling every hit by sense (an absence assertion, the derivation sentence, or the English adjective).
3. Append a `## Fix round 1` section naming the rows added or rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. § Sweeps carries the interpret-obj-6 row and the widened `complete` row with its inflection pass.
2. The report's authored prose states no count; no file under `/home/user/fleet` changed.
