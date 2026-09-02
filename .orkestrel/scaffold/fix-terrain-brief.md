# Unit FX3 — fix round on terrain's reference suite

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.

## Objective

Close the audit round's findings against the reference implementation so it obeys
`orkestrel-prove-journey` as written: no selector reach in the mount path, complete captures at
every variant, statechart assertions on rendered facts, the armed Delete measured, and the
transport family declared and proved.

## Context

Skill: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
and every reference it names, read first. Law: terrain's `AGENTS.md` and the rules it names. The
`policy/no-nested-functions` lint rule is enabled over `src/**` and `app/**`; keep test code to
the same shape. Prior reports:
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\terrain-reference-report.md`,
`terrain-successor-report.md`, `audit-subjective-verdict.md`. Standing conditions: the lockfile
pair (`D  package-lock.json`, `?? package-lock.json`) is the user's; never stage, restore, or
rewrite it. `node_modules/@orkestrel/test` is the campaign's packed build. Commit nothing.

Variant and flag names: `VITE_VARIANT` (`light-1280`, `dark-1280`, `light-390`, `dark-390`),
`VITE_CAPTURE=true`. Run: `npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project app:browser tests/app/browser/integration.test.ts`.

## Findings carried

- **C19 — selector reach.** `tests/app/browser/setup.ts` 1328: `dismissReference` waits on
  `document.querySelector('.modal-backdrop') === null`. Replace the wait with what a person
  perceives: the dialog gone through `isRegionVisible`, and a command behind it reachable again
  through the layer's readers. No `querySelector`, instance, or store reach in any journey path;
  sweep `tests/app/browser/integration.test.ts` and `setup.ts` for `querySelector` outside the
  helpers that predate the campaign and rule on each hit.
- **F2 — truncated 390 frames.** Every `*--light-390.png` and `*--dark-390.png` is cut at the
  fold with blank white beneath, at the same point in both themes; the 1280 frames are complete.
  The likely mechanism is `resizeViewport`'s stage-then-release (`setup.ts` 1256–1264): the shot
  is taken after the pane is released. Find the mechanism by measurement, fix it so a capture
  covers the full document at the variant's width, and pin it: assert the written frame's height
  is at least the document's scroll height at the shot (read the PNG's IHDR height from the file
  the runner reads back, or a reading you justify), with a control run that reproduces the
  truncation and fails. Re-film every variant.
- **F3 — the armed Delete.** `setup.ts` 1402 asserts `btn-outline-danger` inside a statechart
  `assert`, which `statechart.md` forbids. Re-pin the assert on a rendered fact a person perceives
  (reachability, accessible state, the command's text). Add the armed Delete to the matrix family:
  measure its contrast and ring in every variant with the under-bar negative control. Do not
  repaint anything under `app/**`: record each variant's reading for the outline chrome as an
  observation in the report, against the bootstrap skill's rule that a destructive action takes
  the solid variant, for the Orchestrator to carry.
- **F4 — the transport family.** `integration.test.ts` 58–62 declares `FAMILIES` without
  `transport` while the surface persists through the driver. Declare and prove it per
  `SKILL.md` → Declare the transport family: persistence, restart, and storage failure through
  the application's real session and store contracts; an inert configurable store implementing the
  published interface that stalls a read, fails a fixed number of reads, or fails a write; the
  visible half in a journey (the failure sentence a person reads and the retry control that clears
  it); restart by a second session over the same store polling the restored value. Add
  `transport` to `FAMILIES` and the proof, and delete the comment that records the omission.
  Where the application exposes no seam that lets a test supply the store without an `app/**`
  change, stop and report the exact seam missing.

## Scope

**Owned.** `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`,
`tests/setupBrowser.ts`, and a new test-side store fixture under `tests/app/browser/` if the
transport family needs one. **Off-limits.** `app/**`, `src/**`, every other test file,
`package.json`, the lockfile pair, vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`, `configs/**`).

## Output

Write `tmp/units/fix-terrain-report.md` and return it: each finding's edit and the red-then-green
that pins it, the Delete readings per variant, the six run summaries (four variants, two capture
runs) plus a capture run at `light-390` and `dark-390` proving complete frames, `git diff --stat`,
`git status --porcelain`, scoped gates (`npm run format:check`, `npm run lint:check`,
`npm run check`), claims not closed.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, one hypothesis — when a fix needs
an `app/**` change, when the truncation's mechanism is in the layer rather than in this suite,
or when a run is red for a reason outside the four findings. Decide and record test names and
fixture shape.

## Acceptance criteria

1. No selector, instance, or store reach in any journey path of the owned files.
2. Every capture at every variant covers the full document; the truncation control fails.
3. The statechart asserts rendered facts; the armed Delete is measured in every variant.
4. `transport` is declared and proved, or the missing seam is named exactly.
5. All runs green; scoped gates green.
