# U7f-fix audit round 2 claims (the fix round)

Subject: the fix round of unit U7f-fix in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `opus` on native Opus 5 under `units/u7f-fix-brief-2.md` (retained under
`.orkestrel/veneer/units/`; carrying brief 1), report `units/u7f-fix-report-2.md` with
`units/u7f-fix-report.md`, over the U7e landing `7f6d5f6`. Evidence rendered by the Orchestrator:
`units/u7f-fix-diff-2.patch.txt` (`git diff 7f6d5f6`) beside round 1's `units/u7f-fix-diff.patch.txt`
over the same base, and `tmp/audit/u7f-fix-status-2.txt`. Rule on the diff and the live files,
never on the reports' word alone. Scope: implementation only, by the user's ruling. Opus wrote the
unit and the fix, so the Astra analyst holds the objective lane and the Opus reviewer the subjective
lane. Claims marked `[mechanical]` are the checker's; every other lane rules on every claim. An
extra finding is an implementation defect this round introduced or left open, with a site and a
one-line failure scenario, numbered from 8.

1. Finding 1 closed (`tests/app/browser/integration.test.ts`, the pointer case): the hover
   frame's deciding readings (`host.matches(':hover')` and the host's `background-color`) are
   taken before `releasePane()` and before any re-hover, in the pane staged again at the shot's
   geometry (`stagePane` leaves an already-staged pane alone), and asserted hovered and equal to
   the settled mix read before the shot; the red is measured (the pre-staged pane removed, the
   capture loses the hover, `framedHover` reads `false` in every variant) and the round-1
   position is measured to stay green under the same condition; the deviation is sound: the
   layout the capture hands back reads the correct frame as unhovered at the rest fill, so a
   reading there cannot be the assertion, and that handed-back reading is deliberately left
   unasserted as a Test-side bound.
2. Finding 2 closed (the `portfolio` case `records the toggle host as pressed at the moment its
   frame was shot`): the arrival record is selected by `region "Buttons"` together with the
   absence of `button "Toggle" [pressed=true]` (the suffix rather than a bare `[pressed=true]`,
   because a dark variant's arrival tree announces the mode control as pressed); the case asserts
   the pressed records, the arrival records, and that every arrival record announces `Toggle`;
   the analyst's replay (the arrival push removed) reds it and a replacement replay reds the
   same way; the artifacts carry the population (`region "Buttons"` three times per variant, the
   pressed suffix twice).
3. Finding 3 closed (the `afterEach` hook): `releasePane` joins the independently attempted
   releases; a planted staging-then-throw case reddened the following case (a 320 px viewport)
   before the change and only the plant's own throw fails after it; the plant is gone.
4. Finding 4 closed (the mode-switch journey): the pointer is released and the control's
   animations waited out before `home-dark` is placed; `control.matches(':hover')` is asserted
   `false` at the shot (red `true` before, green after); the regenerated `home` and `home-dark`
   frames show the same bordered, unfilled control.
5. Finding 5 closed (`tests/app/browser/Showcase.test.ts`, the region case): the header's buttons
   are exactly the mode control, no section and no `.btn` specimen sits outside `main`, each
   population queried at the assertion; three plants (a header `button.btn`, a header `a.btn`, a
   header section) each reddened their assertion and are gone.
6. `[mechanical]` Scope and law: the round-2 diff differs from round 1's only in
   `tests/app/browser/integration.test.ts` and `tests/app/browser/Showcase.test.ts`; the status
   shows brief 1's three files; in the diff no `any`, no assertion outside `as const`, no
   non-null assertion, no suppression comment, no skipped case other than `it.runIf`, no case
   named for a control, no `PLANT` residue; `PORTFOLIO_STATES` and `BUTTON_STATES` unchanged;
   the export-set assertions untouched; each `tmp/capture/<variant>.txt` ends with its twelve
   frame paths (the capture run last).
7. Gates: the report records `format:check`, `lint:check`, `check`, `test:app:browser`,
   `test:journey`, `npm test`, the two Edge runs, and `CAPTURE=1 test:journey` exit 0; the
   verifier lane re-runs the chain on the host and its reading rules this claim.
