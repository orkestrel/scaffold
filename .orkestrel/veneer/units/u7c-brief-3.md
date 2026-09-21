# Unit U7c — fix round brief 3: the round-2 findings

## What changed and why

This brief supersedes `u7c-brief-2.md`; that brief stands with brief 1 and its
dispatch message, and `u7c-report-2.md` is the baseline. Round 2 (claims
`../u7c-audit-claims-2.md`) confirmed every fix-round finding closed, the checker accepts,
and the verifier's whole chain exits 0 on Chromium and Edge. The objective and subjective lanes
each substantiated implementation findings in the test layer, listed below with their sites.
Audits cover implementation only by the user's ruling: make no wording, comment, or guide-prose
change beyond what a code change requires.

## Findings carried

1. (analyst 2) `tests/app/browser/integration.test.ts:297-301` and `:331-335`: each focus-ring
   sweep asserts the ratios equal across specimens and above 1, and pins nothing, so a uniform
   regression of the ring token passes. Declare the two calibrated ring ratios as one exported,
   frozen table in `tests/setup.ts` keyed by mode (light `2.2797472825343092`, dark
   `2.358684054793209`, the readings reports 1 and 2 record), prove the table's shape in
   `tests/setup.test.ts`, and assert each sweep's shared value against its mode's entry with
   `toBeCloseTo(value, 3)`. Update the setup proof's export-set assertion.
2. (analyst 4) `tests/app/browser/integration.test.ts:85-111`: the teardown aggregates a rejected
   release, but the next case's `beforeEach` mounts regardless, so a media restoration that
   rejects after reduced motion was staged leaves the following cases under that emulation
   (the installed helper keeps its stage marker until read-back succeeds). Record a teardown
   failure in a module-scope marker inside the `afterEach` catch path, and make `beforeEach`
   refuse to mount while the marker is set, throwing an error that names the earlier failure,
   so every following case fails loudly instead of running on stale state.
3. (analyst 8) `tests/setupBrowser.test.ts:140` and `:166`: `await releasePointer()` precedes
   `mounted.cleanup()` with no `finally`, so a rejected release leaves the mounted showcase and
   the document delegate for the next case. Put the mount cleanup in an unconditional `finally`
   in both cases (and in any other case in the file that mounts and releases).
4. (reviewer 8 and 9) `tests/app/browser/Showcase.test.ts:58-71`: the case re-declares the
   ownership rule by hand as `!element.hasAttribute('data-bs-toggle')` while the section reads
   the published `BUTTON_SELECTOR`, carries no non-empty guard on `owned`, and closes with
   `expect(reclaimed).toHaveLength(owned.length)`, which holds by construction. Import
   `BUTTON_SELECTOR`, derive `owned` with `!element.matches(BUTTON_SELECTOR)`, assert
   `expect(owned).not.toStrictEqual([])`, and replace the length check with the reclaimed-host
   name list, as `tests/app/browser/sections/ButtonSection.test.ts:154-156` already does.

Recorded, not carried: reviewer 10 — `driveOracle(root, prefix)` reads the host under `root`
while the installed acting verbs resolve by accessible name over the whole document, which is
harmless with one section and is carried to the unit that adds the second section.

## Role, engine, law, context, host, unknowns, deviation contract

As in `u7c-brief-2.md`, `u7c-brief.md`, and
`u7c-dispatch-message.txt`, verbatim (the `opus` role on native Opus 5; the law under
`C:/Users/mikes/WebstormProjects/scaffold`; the scoped formatter and lint rewrites granted; an
enumerating assertion in an owned file is yours to update). `HEAD` is `0cbb563`; the working
tree carries the complete brief-2 result, uncommitted. Continue from it; do not restore or
reset anything. Perform the assignment directly and spawn nothing.

## Scope

Owned: `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, and
`u7c-report-3.md`. Every other file is off-limits this round (brief 1's owned files
included, unless an enumerating assertion in one of them is made false by this round's change,
which you then update and record).

## Execution

1. Items 4, 3, 1, then 2. For item 1 record the red a uniform wrong ratio produces under the
   new assertion by reasoning from the assertion's shape (a plant is not needed); for item 2
   record the marker's effect by reading the code path, since forcing a rejected restoration
   needs no plant either.
2. Run and record, in this order, each to completion: `npm run format:check`,
   `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:setup:browser`,
   `npm run test:app:browser`, `npm run test:journey`, `CAPTURE=1 npm run test:journey`,
   `npm test`, then `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`, and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`.

## Output

Write `u7c-report-3.md` in the Veneer checkout and return its content as your final
message: per finding, the change as landed with its site; each gate's exit code and final lines
on both engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`.
Do not repeat reports 1 and 2.

## Acceptance criteria

1. Findings 1 to 4 are closed at their sites, each with the assertion that pins it.
2. Every gate in Execution item 2 exits 0 on managed Chromium and Edge.
3. `git status --porcelain --untracked-files=all` shows only brief 1's owned set and the
   reports.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 1 and 2.
