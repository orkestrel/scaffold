# Unit TEST-TOLERANCE — Assert the modern-paint contrast agreement as a property, not a host's number

## Role and engine

`builder` on Sonnet, a native Claude subagent. You are a native subagent reading this brief: perform
the assignment directly and spawn nothing.

## Objective

Make the three "modern paint readings" contrast comparisons in
`/home/user/test/tests/src/browser/helpers.test.ts` assert the property they exist for — that
`@orkestrel/test`'s own conversion of a modern colour agrees with the browser's sRGB rendering of the
same colour — with a tolerance the measured cross-browser gap justifies, so the cases pass on
Chromium 141 as they do on Chromium 151 and Edge 153.

## Context

**Evidence.** Measured by the Orchestrator on 2026-09-22, this host, HeadlessChrome/141.0.0.0
(`/opt/pw-browsers/chromium-1194`):

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/helpers.test.ts -t "modern paint readings"
× measures the dark oklch text against the browser sRGB control
  → expected 17.844838151785993 to be close to 17.84338343214622, received difference is 0.0014547196397742823, but expected 0.0005
× measures the contrast ratio of an oklch box-shadow on a focused control
  → expected 17.844838151785993 to be close to 17.84338343214622, received difference is 0.0014547196397742823, but expected 0.0005
✓ measures the light oklch text on an oklch surface against browser controls
```

The browser's control serialises with fractional channels (`color(srgb 0.0571957 0.0900803
0.168835)` for `color-mix(in srgb, oklch(0.208 0.042 265.755) 100%, transparent)`,
`/home/user/scaffold/.orkestrel/veneer/units/test-colormix-probe.md`), so the gap is the two
converters' colour math, which differs across Chromium versions at the fourth decimal of a contrast
ratio. The three cases sit at lines currently around 4161, 4174, and 4190; locate them by their
titles. Each ends in `expect(readContrast(...)).toBeCloseTo(measureContrast(...), 3)`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md` ("Assert a
runtime-chosen result as the property it must have, not as the number one run produced";
"Probe a host-varying property at runtime … and assert against what the probe returned");
`/home/user/scaffold/.claude/rules/typescript.md` § Comments ("Comments explain why"). Skill: none.
Guide: `/home/user/test/guides/test.md` (read-only here; the change touches no documented surface).

**Installed primitives.** None the change reaches.

**Host.** Linux, bash, Node 22, npm 10.9.7; Playwright Chromium 141 at
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The checkout is `/home/user/test` on branch
`claude/inspiring-allen-t4qzv1`, installed and built by the Orchestrator before this dispatch.

**Measurements.** The cross-version gap is `0.00145` of contrast ratio on the dark colour; two
decimal places (`toBeCloseTo(…, 2)`, tolerance `0.005`) admit it with margin and still refuse a
converter that drifts by a hundredth.

**Control identifiers.** None. A test is named for what it proves, never for a control.

**Standing conditions.** `package-lock.json` is modified in the working tree (the Orchestrator
regenerated it over a drifted lockfile); leave it as it is. The rest of the tree is clean.

## Unknowns

None.

## Scope

**Owned.** `/home/user/test/tests/src/browser/helpers.test.ts`, the three cases named above only.

**Shared (report-only).** None.

**Off-limits.** Every other file. No `src/` change, no guide change, no manifest change.

**What asserts the state this change ends.** The three cases themselves; nothing else reads the
precision argument.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash` for the scoped run below only. No
tree-wide `format`, no `lint --fix`, no `build`, no install, no git command that writes.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Touched file with a one-line summary, the diff, the scoped validation command with its output
(failing count before, passing count after), and deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — if the three cases are not where the titles say, if any case's assertion is not the
`toBeCloseTo(…, 3)` form, or if the scoped run fails for any other reason. Decide, record, and carry
on from the wording of the comment.

## Acceptance criteria

1. In each of the three cases the precision argument is `2`, and one comment above the first of
   them states why in one or two sentences: the agreement is a property measured across browser
   versions, the tolerance admits the measured cross-version gap of about `0.0015`, and it still
   refuses a converter drifting by a hundredth. No other line changes.
2. `cd /home/user/test && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "modern paint readings"` exits 0, with the
   run before the edit recorded as the failing count (two failed) and the run after as the passing
   count.
3. `npx oxlint --config .oxlintrc.json tests/src/browser/helpers.test.ts` and
   `npx oxfmt --config .oxfmtrc.json --check tests/src/browser/helpers.test.ts` exit 0.

**Observations, not criteria.** The whole `src:browser` project's result; the Orchestrator runs
the authoritative chain after this unit exits.

## Review evidence

The diff and `git status --porcelain` output, returned in the report.
