# Unit conform-rater fix round 1 — the report's sweep record and two observations

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-rater-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/rater`.

## Objective

Close the round-1 objective lane's refutation of claim 4 and its findings F-1 and F-2 (`units/l3/rater-objective-r1.md`), all on the record: § Sweeps carries the old-form sweep for rater-obj-1, rater-obj-3, and rater-subj-7 and states the number-word sweep's real population; § Observations restates the "auto mode" paragraph's provenance without attributing it to a rule file.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (name the pattern and the paths behind every sweep result); the conform-rater brief at `/home/user/scaffold/tmp/units/conform/conform-rater-brief.md` § Method.

**The lane's readings.** § Sweeps has no row for rater-obj-1 (`\bNode\.js >= 24\b` over `README.md`, `guides/**`, `src/**`, `tests/**`), rater-obj-3 (`let thrown|RaterError` over `tests/src/core/factories.test.ts`), or rater-subj-7 (`Whether the check was met` over `src/**`); the lane ran all three over the checkout and each is empty. The number-word sweep's recorded population (`guides/rater.md`, `guides/README.md`, `tests/guides.test.ts`) cannot admit the `tests/src/core/validators.test.ts:35` hit § Observations reports, so the population is understated. § Observations attributes a "While auto mode is active:" paragraph to the end of `/home/user/scaffold/.claude/rules/documentation.md`; that file on disk carries no such text (`grep -n -i 'auto mode'` over `AGENTS.md` and every rule file returns nothing), and the paragraph is the harness's session note shown beside a rule file when a unit reads it.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rn <pattern> /home/user/fleet/rater/src /home/user/fleet/rater/tests /home/user/fleet/rater/README.md /home/user/fleet/rater/guides/rater.md /home/user/fleet/rater/guides/README.md` (add `-i` for a case-insensitive pass), one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-rater-report.md`.

**Off-limits.** Everything else.

## Rows

1. Re-run the three sweeps and add one § Sweeps row each, with the pattern, the population, and the empty result.
2. Rewrite the number-word sweep's population to the paths actually covered (`tests/src/**` included) and keep the `validators.test.ts:35` ruling beside it.
3. Rewrite the first § Observations item so it reads as a tool-directing paragraph that appeared appended to rule-file reads during the unit's run, carried by the harness's session note, with the rule file on disk clean; keep the record that the unit followed the brief.
4. Append a `## Fix round 1` section naming the rows added or rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. § Sweeps carries the three rows and the corrected population.
2. § Observations attributes no text to a rule file that does not carry it.
3. The report's authored prose states no count; no file under `/home/user/fleet` changed.
