# Unit U7f-fix — the round-1 findings on the Veneer side

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `7f6d5f6` (the U7e landing), tracked
tree clean. Perform the assignment directly and spawn nothing.

## Objective

Three findings of the U7f portfolio verdict's round 1 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7f-verdict.md`)
closed on the Veneer side, each with the proof that pins it, and the portfolio refreshed:

1. (item 12, REGRESSED) The shell's `Dark mode` control presents one minimal affordance
   identical in both themes, outside the cascade's `.btn` treatment. Today it paints as bare
   text in light (no border, fill, or underline, indistinguishable from the caption beneath it)
   and gains a rounded panel in dark, because the `elements` layer's bare button treatment is
   what paints it and that treatment is theme-dependent. Keeping the control outside `.btn` is
   right; the execution is the defect.
2. (item 6) The hover and active element frames are shot inside the cascade's 0.15s transition
   although the journey waits for animations and reads the settled colour before placing
   (Veneer's hover frame paints RGB(8,64,230) against the journal's settled RGB(7,58,208)); the
   element capture itself re-triggers the transition (a Test-side behaviour
   `units/u7c-report.md` § Findings carried out of scope already records). Shoot the hover and
   active frames under staged reduced motion (`stageMedia({ motion: false })` around the two
   placements, released after) so the frame shows the settled mix, and keep the pointer-paint
   readings under motion as they are. Record the frame's settled colour beside the reading.
3. (item 5) The accessibility tree in the per-variant artifact is taken at arrival, so no
   artifact records the toggle host's `pressed` state at the pressed moment. Append
   `describeTree(mounted.section)` (or the narrowest tree that carries the `Toggle` host) to
   `ARTIFACT` while `Toggle` reads `pressed=true` in the pressed journey, in both modes.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md`,
`.claude/rules/browser.md`, `.claude/rules/tests.md`, `.claude/rules/application.md`. Evidence:
the frames `C:/Users/mikes/WebstormProjects/veneer/tmp/capture/states/home--light-1280.png`,
`home-dark--dark-1280.png`, `button-primary-hover--light-1280.png` (open each with the Read
tool before editing), the lane reports `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/lane-u7f-reviewer.md`
(item 12) and `lane-u7f-analyst.md` (items 5 and 6). The shell stylesheet is
`app/browser/styles/_shell.scss` (its own `shell` layer; `color-scheme` per mode; the
`.specimens` layout; no component paint). The control is rendered by `app/browser/Showcase.ts`
from `SHOWCASE_COPY`. The showcase's own `--vn-*` tokens are the only paint the shell may read;
a hard-coded colour is a defect. Read the shipped cascade's resolved rules for a bare `button`
in both modes before choosing the affordance. The journeys live in
`tests/app/browser/integration.test.ts`; `stageMedia`, `releaseMedia`, `describeTree`, and
`waitForAnimations` are the installed helpers (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`).
The user has ruled that audits cover implementation only: make no wording, comment, or
guide-prose change beyond what a code change requires; an enumerating assertion in an owned
file that your change grows is yours to update in the same step, recorded, never a stop; the
scoped formatter (`npx.cmd oxfmt --config .oxfmtrc.json --write <file>`) and a lint
diagnostic's canonical rewrite are granted, never a stop. `vite.config.ts` and
`tests/{config.test,policy.test,setupPolicy}.ts` are vendored: never edit them.

## Unknowns

Whether the shell overrides the bare-button treatment locally (a `shell`-layer rule on the
control's own class) or the control carries a cascade class that reads the same in both modes;
settle it from the resolved cascade and record the reason. A `.btn` class on the control is
excluded.

## Scope

Owned: `app/browser/styles/_shell.scss`, `app/browser/Showcase.ts` and `app/browser/constants.ts`
(only where the control needs a class or a copy change), `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts` and `tests/setup.test.ts` (only where
a table the journeys read must grow), `u7f-fix-report.md`. Off-limits: `src/**`,
`guides/**`, `package.json`, `configs/**`, the vendored files, every other setup file, every
other test. A guide sentence this change makes false is a bound recorded in the report.

## Execution

1. Finding 1: measure the control's resolved `border`, `background-color`, `text-decoration`,
   and `padding` in both modes through a case in `tests/app/browser/Showcase.test.ts`; add the
   failing proof (the affordance property present and equal across modes); run it red on the
   current shell; land the affordance in the `shell` layer; run it green.
2. Finding 2: stage reduced motion around the two element placements; assert the frame's
   settled colour reading equals the pointer reading taken under motion, so a frame shot
   mid-transition would red.
3. Finding 3: append the tree at the pressed moment in both modes; assert it announces
   `Toggle` as pressed.
4. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm run test:app:browser`, `npm run test:journey`,
   `CAPTURE=1 npm run test:journey` (this refreshes the portfolio under `tmp/capture/` for
   round 2), `npm test`, then `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`.

## Output

Write `u7f-fix-report.md` in the Veneer checkout and return it: per finding, the
change as landed with its site, the red-then-green pair (command and counts), the resolved
values before and after (finding 1), the settled hover and active colours the frames now carry
(finding 2); each gate's exit code and final lines on both engines; the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`; any guide bound.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the affordance property (a
border or an underline) and its token; where the pressed-moment tree sits in the artifact.
Stop on: an affordance that needs a token the cascade does not ship; a gate red outside the
owned files.

## Acceptance criteria

1. Each finding's proof reddened before its fix and is green after.
2. In the refreshed portfolio `home--light-1280.png` and `home-dark--dark-1280.png` show the
   same affordance on the control; the hover and active element frames carry the settled
   mixes; each per-variant artifact carries the pressed-moment tree.
3. Every gate exits 0 on managed Chromium and Edge.
4. The status shows only the owned files and the report.
