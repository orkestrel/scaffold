# Unit FX3b — restore the phone pane and align the controls with the skill

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.

## Objective

On the rebuilt `@orkestrel/test` (FX2b), give the 390 variants their real 844 px pane back,
replace the suite's local frame reader with the layer's export, and move the census and escape
negative controls through the read root as the fixed skill requires.

## Context

Skill: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
and the references it names, at scaffold `4fb7ff2` or later — `references/styles.md` now requires
the authored-class census and the `extractStyles` negative controls to enter through the same root
the reading walks, and `references/captures.md` states the coverage proof. Prior report:
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\fix-terrain-report.md`. The layer's
change: `C:\Users\mikes\WebstormProjects\test\tmp\units\fix-capture-report.md`. Standing
conditions: the lockfile pair is the user's; commit nothing; `node_modules/@orkestrel/test` is
the rebuilt campaign build — prove it first by reading `readFrame` in
`node_modules/@orkestrel/test/dist/src/browser/index.js`.

## Work

1. `VARIANTS`: `light-390` and `dark-390` back to `height: 844`. Delete the comment that
   justified 1900 px.
2. Replace the local `readFrame`, `FrameReading`, and `ShotReading` in `tests/app/browser/setup.ts`
   with the layer's `readFrame` and `FrameReading`; keep the proof's shape (width equals the
   variant, height at least the document's, floor equals the surface background) and drop the
   upper bound that the pane's height imposed.
3. Controls through the root: build the census control as an element carrying `ABSENT_CLASS`
   appended to the read root before `readClasses` walks it, and build the escape control on the
   same root, both removed after the reading; keep every reading's population report.
4. Re-run the four variants and the four capture runs; read every 390 frame back complete; run the
   scoped gates (`npm run format:check`, `npm run lint:check`, `npm run check`).

## Scope

**Owned.** `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`. **Off-limits.**
Everything else, including `app/**`, the lockfile pair, and vendored files.

## Output

Write `tmp/units/fix-terrain-successor-report.md` and return it: the installed-build proof, each
change, the eight run summaries, the frame readings for the 390 variants, `git diff --stat`,
`git status --porcelain`, scoped gates, claims not closed.

## Deviation contract

Stop and report when the rebuilt layer still clips a 390 frame, when the controls cannot enter
through the root without an `app/**` change, or when a run is red outside the three changes.

## Acceptance criteria

1. The 390 variants declare 844 px and every 390 frame reads complete on the surface's own floor.
2. No local frame reader remains; the suite imports `readFrame` from the layer.
3. Both negative controls enter through the read root; all runs and scoped gates green.
