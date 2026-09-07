# Brief — U5 `d7-guide-drift-cost` (`findDrift` reads a guide of contract's size inside a test case's budget)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/guide` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `caa97b2`, clean; version `0.0.18`, unreleased). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Read `/home/user/scaffold/AGENTS.md` (§ Design laws: functional core, no polling, derive state), `.claude/rules/tests.md`, and `/home/user/fleet/guide/guides/guide.md` § The check catalog first.

## Objective

`findDrift` over contract's guide (`/home/user/fleet/contract/guides/contract.md`, its `src/core` at the branch tip) costs 5.6 s on an idle host, so the equality case exceeds Vitest's default 5 s budget with the tree fully converged and the converge unit raised the case's timeout to 30 s (`/home/user/fleet/contract/tests/guides.test.ts:206`). The cost is the reader's: one source lookup per compared row over every line the package declares (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-contract-converge-report.md` § Reader and seed findings, and `instruments/d7/pass/contract-unit/timing.mjs`). After this unit the same measurement reads well under a second, with no change to what `findDrift`, `source.surface()`, `source.methods()`, `source.examples()`, and `collectTitles` return.

## What is fixed

- Measure first: copy `timing.mjs` into `/home/user/fleet/guide/tmp/`, point it at contract's checkout files (read them from `/home/user/fleet/contract`, read-only), and record `createGuide`, `createSource`, and `findDrift` timings on the baseline, plus where the time goes (`source.surface()` alone, `source.methods(name)` per interface, `source.examples()`, `collectTitles`), with `node --cpu-prof` or manual `performance.now()` splits. Record the numbers.
- Then remove the repeated work without changing any result: the `Source` class computes its declaration map, its member lists, and its example collection once per instance (a memo behind `#` fields, derived on first read), so a second call answers from the same reading; `findDrift` and `collectTitles` read those once. No cache leaks across instances, and a `Source` is still a pure function of its files (the memo derives state, it does not store a second fact).
- Prove: the timing after; `npm run test:src:core` and `npm run test:guides` green; the existing `findDrift` cases unchanged; a new case asserting that repeated `source.methods(name)` and `source.examples()` calls return equal records (the memo's contract), red-first only if the memo changes observable behaviour (it must not, so record the case as a guard).
- The doc blocks of the members you change carry the derivation in `@remarks` (Ruling 7), and `guides/guide.md`'s cells converge through `npm run build` then `npm run docs -- --to guide`; the guide's prose on the reader's cost, if any, states the measured order.
- The version stays `0.0.18`; `package.json` and the lockfile are untouched.

## Scope

Owned: `src/core/sources/Source.ts` (and `SourceManager.ts` only if the memo must live there), `src/core/helpers.ts` (`findDrift`, `collectTitles`, and the helpers they call, doc blocks included), `tests/src/core/**` for the guard case, `guides/guide.md` (converged cells and any cost sentence), `tmp/` in the guide checkout for the instrument. Off-limits: everything else, including `src/core/types.ts` (add no public member; if the memo needs a type, stop and report), every vendored file, `package.json`, `package-lock.json`, and `/home/user/fleet/contract` (read-only).

## Acceptance criteria, cheapest first

1. The baseline timing over contract recorded (`findDrift` at seconds), then the timing after (`findDrift` under 1000 ms on the same host, same input), both from the retained instrument.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned paths>`, `npm run check` exit 0.
3. `npm run build` then `npm run docs` exit 0 at a non-zero `rows read` and `disagreements found: 0`.
4. `npm run test:src:core`, `npm run test:guides`, `npm run test:policy` exit 0 (record the summaries).
5. `git status --short` lists owned files only (`tmp/` is ignored; confirm).

## Output

`/home/user/scaffold/tmp/units/d7-guide-drift-cost-report.md`: the timings before and after with the instrument's path, the hunks, per criterion the command and its last lines, the wall clock. No count in prose. No process diary.

## Deviation contract

Stop on: a memo that needs a public type or member; a result that changes under the memo (any drift in the existing suites); a timing after that stays above 1000 ms with the memo in place (report where the remaining time goes rather than widening the change).
