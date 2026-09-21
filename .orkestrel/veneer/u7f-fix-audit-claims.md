# U7f-fix audit claims

Subject: unit U7f-fix in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written
by `opus` on native Opus 5 under `units/u7f-fix-brief.md` (retained under
`.orkestrel/veneer/units/`), report `units/u7f-fix-report.md`, over the U7e landing `7f6d5f6`.
Evidence rendered by the Orchestrator: `units/u7f-fix-diff.patch.txt` (`git diff 7f6d5f6`) and
`tmp/audit/u7f-fix-status.txt`. Rule on the diff and the live files, never on the report's word
alone. Scope: implementation only, by the user's ruling. Opus wrote the fix, so the Astra analyst
holds the objective lane and the Opus reviewer the subjective lane. Claims marked `[mechanical]`
are the checker's; every other lane rules on every claim. An extra finding is an implementation
defect the fix introduced or left open, with a site and a one-line failure scenario, numbered
from 6.

1. Finding 1 closed (`app/browser/styles/_shell.scss`, `tests/app/browser/Showcase.test.ts`):
   a `header button` rule in the `shell` layer paints a border from `--vn-border-width`,
   `--vn-border-style`, and `--vn-border-color` (tokens only, no hard-coded colour), reaching
   the header's own control and no specimen (the sections mount into `main`); the control
   carries no `.btn` class; the unknown is settled with a recorded reason (a class on the control
   would need a new barrel export the brief put off-limits); the proof drives the control by
   keyboard, reads `border-width`, `border-style`, `background-color`, `padding`, and
   `text-decoration-line` in both modes, asserts the border present and the readings equal, and
   ran red before the rule (`border-width` `0px`) and green after; the border colour retunes with
   the mode by the cascade's design while the treatment reads identically.
2. Finding 2 closed (`tests/app/browser/integration.test.ts`): each hover and active element
   placement is wrapped in `stageMedia({ motion: false })` and `releaseMedia()`, and the tester
   pane is staged with `stagePane` before the pointer is placed and released with `releasePane`
   after the placement (the deviation, measured: reduced motion alone left the hover frame at
   the rest fill because the capture's own pane staging moved the document from under the
   pointer); the case asserts every shot's `transition-duration` reads `0s` and that no placement
   moved the host's paint; the pointer-paint readings stay under motion; the `frame paint`
   artifact line carries each frame's settled colour; the regenerated element frames' dominant
   fills equal the journal's settled readings (hover light `(7, 58, 208)`, active light
   `(7, 52, 187)`, hover dark `(6, 182, 238)`, active dark `(35, 190, 240)`); red before the
   staging (every shot at `0.15s`), green after.
3. Finding 3 closed (`tests/app/browser/integration.test.ts`): `describeTree(mounted.section)`
   is appended to `ARTIFACT` while `Toggle` reads `pressed=true`, in both modes, straight after
   the pressed frame is placed, and asserted to announce `button "Toggle" [pressed=true]`; the
   `portfolio` case `records the toggle host as pressed at the moment its frame was shot` reads
   the artifact the run built and asserts the pressed record and the arrival record both present;
   red with the record reverted, green restored.
4. `[mechanical]` Scope and law: the diff touches `app/browser/styles/_shell.scss`,
   `tests/app/browser/Showcase.test.ts`, and `tests/app/browser/integration.test.ts` only; the
   shell file's opening comment changed only as the rule made it false; in the diff no `any`,
   no assertion outside `as const`, no non-null assertion, no suppression comment, no skipped
   case other than `it.runIf`, no case named for a control, no probe residue; `PORTFOLIO_STATES`
   and `BUTTON_STATES` unchanged; the export-set assertions untouched; `src/**`, `guides/**`,
   `package.json`, `configs/**`, and the vendored files absent; the app browser project grew by
   the affordance case and the journey by the pressed-record case per variant.
5. Gates: the report records `format:check`, `lint:check`, `check`, `build`, `test:app:browser`,
   `test:journey`, `CAPTURE=1 test:journey`, `npm test`, and the two Edge runs exit 0; the
   verifier lane re-runs the chain on the host and its reading rules this claim. Observation,
   not a claim: the journey's `afterAll` writes `tmp/capture/<variant>.txt` on every run and a
   non-capture run writes no frame paths into it, so the portfolio and its artifacts are in step
   only after a final `CAPTURE=1` run (the report ran one last); a bound for the Test-side
   `captureFrame` (re-establishing the pointer after it stages the pane) is recorded.
