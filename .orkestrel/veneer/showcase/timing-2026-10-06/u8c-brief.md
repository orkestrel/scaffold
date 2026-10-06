# Unit task75-U8c — the duration instrument computes the ruled own ratio and the shared budget

## Role and engine

`builder` unit (Opus) under `/home/user/scaffold/.claude/agents/builder.md`. You are the sole writer in `/home/user/veneer/tmp/units/journey-cost/`. Owned files: `durations.ts`, `fixtures/durations/verify.ts`, and the files `verify.ts` seeds or writes under `fixtures/durations/` and the table files it names. Nothing else under `/home/user/veneer` changes; `/home/user/.wave/veneer-containment` is another lane's checkout and is off-limits. The instrument reads logs and launches no browser, so it runs directly, outside the host queue. Nothing is committed: `tmp/` is untracked.

## Objective

Make the instrument implement the Orchestrator's ruling of 2026-10-06 on rule R3's margin, so unit U9 and every later re-derivation reproduce `COMPONENT_WAIT` from the run folders alone. Governing record: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rule R clause 3 (the amendment paragraph). Reading rules: `.claude/rules/typescript.md` and `.claude/rules/writing.md` in `/home/user/scaffold` apply to the instrument's code and comments; the instrument stays one file with `node:` imports only.

## The ruling, as the contract to implement

1. `Settle probe` readings pool per family, motion, and description (the key the instrument builds at `durations.ts:429` stays).
2. Each eligible run contributes one reading to a pool: its slowest reading in that pool.
3. A per-run reading counts toward the own ratio only when it is at or above the poll interval, 10 ms (the `@orkestrel/browser` default; a named constant with a comment naming the library). A reading below it resolved on its first evaluation and measured no settle.
4. A description's own ratio is the slowest counting per-run reading over the fastest counting per-run reading, and needs at least two counting runs; otherwise it is `insufficient`.
5. A description's R3 figure stays `ceil(max × max(band, ratio) / 100) × 100`, where `max` is the pool's slowest reading over every eligible run and `ratio` is the own ratio of clause 4.
6. A shared budget, one constant bounding every description's wait, takes as its margin the largest of the band ratio and every description's own ratio, and its figure is `ceil(ceiling × margin / 100) × 100`, where `ceiling` is the slowest reading across every pool.

## Change

1. In `renderProbes` (`durations.ts:413-515`): build per-run slowest readings per pool, derive the counting set, the own ratio, and the R3 figure by the clauses. Replace the `Min ms` column with `Fastest run max ms` (the fastest counting per-run reading, `none` when no run counts) and add a `Counting runs` column after `Eligible runs`. Every other column keeps its meaning.
2. After the probes table, print a shared-budget block of three lines: the margin (`Shared margin: M (band B; largest own ratio R from DESCRIPTION [FAMILY, MOTION]: SLOW ms in RUN over FAST ms in RUN).`, or `Shared margin: M (band B; no description has an own ratio).`), the budget (`Shared budget: ceil(CEILING × M / 100) × 100 = X ms (ceiling: DESCRIPTION [FAMILY, MOTION], CEILING ms in RUN).`), and the slack check (`Shared budget slack check: below every available slack.` or `Shared budget slack check: R3 — not below the slack of TITLE (S ms).`, naming the smallest failing slack). When no eligible run carries a `Settle probe` line, print `Shared budget: unavailable (no settle readings).` alone. Ratios print with six decimals, milliseconds with one.
3. Update the footnote string at `durations.ts:314` so it states the per-run slowest reading, the counting rule, and the shared margin.
4. In `fixtures/durations/verify.ts`: extend `seedFixtures` with one more journey fixture whose only `visible` reading lies below the poll interval (for example `journey-first-poll`: seconds 110, outside 10.5, duration 1100, wait 5, row 200), so the fixture set proves per-run slowest readings, the first-poll exclusion from the counting set, the shared lines, and the `unavailable` line of the six-run output. Update every assertion the new columns and the extra fixture move (readings and eligible-run counts, the statechart-row counts, the omitted table, the duplicate-run equality) and add assertions for: `Counting runs` 2 with `Eligible runs` 3 on the popover row; the shared margin line naming the popover `visible` pool (2.000000, 400.0 over 200.0); the shared budget 800; the slack check naming the popover title; `verifySix` printing the `unavailable` line; `verifySeven` keeping its equality of the output from `R3 =` onward.
5. Run `node /home/user/veneer/tmp/units/journey-cost/fixtures/durations/verify.ts`; every assertion passes. Then reproduce the ruling with
   `node /home/user/veneer/tmp/units/journey-cost/durations.ts --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-2 --timeouts /home/user/veneer/tmp/units/journey-cost/timeouts-6a976a0.json --out /home/user/veneer/tmp/units/journey-cost/durations-2026-10-06d.md`.
   Expected shared lines: margin 2.891129 from `animations div.offcanvas` [offcanvas, true] (71.7 ms in `task75-u7-probe-2` over 24.8 ms in `task75-u7-probe-1`), ceiling 888.3 ms from `showcase scroll settles` [scrollspy-390, true] in `task75-u7-probe-2`, budget 2600, below every available slack. The Orchestrator's reference computation is `/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/settle-shared.out` (read-only evidence, not a file to copy from).

## Off-limits

The band computation (`computeBand`), the eligibility rule (`isEligible`), the R4 title table, the `--omit`, `--timeouts`, `--ceiling`, and `--band` contracts, the exit codes (0, 64, 67), and every file outside the owned set.

## Output

Final message: the diff of `durations.ts` and `verify.ts`; the tail of the `verify.ts` run (the final line and each `exit` line); the three shared lines of `durations-2026-10-06d.md` and its `animations div.offcanvas` and `showcase scroll settles` rows; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
