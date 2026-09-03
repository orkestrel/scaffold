# Unit conform-guide fix round 2 — the report's counts and sweep record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-guide-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/guide`.

## Objective

Close the round-2 objective lane's findings F-1 and F-2 (`units/l3/guide-objective-r2.md`), both on the record: the report's authored prose states no count, and § Sweeps carries a pattern, population, and result for every row whose repair removed a prose form.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (delete a count you find; do not correct it); `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (name the pattern and the paths behind every sweep result).

**The lane's readings.** Line numbers are the report's at 20:0x UTC and can have moved; read each site before changing it.

- F-1: `report.md:312` reads "Returns the same forty-six `tests/guides.test.ts` consumers § Shared-file patches already named" → "Returns the same `tests/guides.test.ts` consumers § Shared-file patches already named"; `report.md:139` reads "Two further consequences to carry into the release note:" → "Further consequences to carry into the release note:". Change nothing else in either sentence. The diffstat at `:57` is a tool tally cited to the artifact it measures and stays.
- F-2: § Sweeps (`report.md:90-105`, fix-round rows at `:239-242`) carries no pattern for guide-obj-5's old `@returns` sentence, guide-subj-8's `since` and "local name", guide-subj-9's "sees", "notion", "single mistake", and "most often", or guide-subj-10's "Measured across" and "no longer needed". Read each row's Wrong text in `/home/user/scaffold/tmp/units/conform/conform-guide-brief.md` § Rows for the exact old form, run each sweep case-insensitively over `/home/user/fleet/guide/src`, the non-vendored `/home/user/fleet/guide/tests` (exclude `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), `/home/user/fleet/guide/guides/guide.md`, `/home/user/fleet/guide/guides/README.md`, and `/home/user/fleet/guide/README.md`, and add one row per sweep with its pattern, population, and result, ruling any hit by sense. The `since` at the vendored `tests/distribution.test.ts:28` is outside the population and is a scaffold host-inventory row already recorded; do not list it as a guide finding.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rniE '<pattern>' <paths>` over the paths named, one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-guide-report.md`.

**Off-limits.** Everything else.

## Rows

1. F-1: the two sentences.
2. F-2: the four sweep rows, run and recorded.
3. Append a `## Fix round 2` section naming the rows changed.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. The report's authored prose states no count; the diffstat line stays.
2. § Sweeps carries the four rows with pattern, population, and result.
3. No file under `/home/user/fleet` changed.
