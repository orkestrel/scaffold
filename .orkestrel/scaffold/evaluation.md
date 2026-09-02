# Skill-creator evaluation — iteration 1 (2026-09-02)

Workspace: `tmp/skill-workspace/` (git-ignored). Baseline is the snapshot of the skills as
committed at `f453f00`, copied to `tmp/skill-workspace/snapshot/`; the with-skill runs open the
rewritten skills in `.agents/skills/` after units U2 and U4 land. Every executor and grader runs on
Opus 5.

## Evals

| Id | Skill | Name | What it asks |
| --- | --- | --- | --- |
| 1 | enterprise-bootstrap | underwriting-form-inputs | A ten-field underwriting form as one `index.html`, every state handled, plus the checks to run |
| 2 | enterprise-bootstrap | markup-inspection | Review a fragment carrying an invented class, a `style` attribute, plain `text-danger`, an empty badge, an outline button in a subtle alert, a placeholder-only field, and a disabled danger button with a `title`-only reason |
| 3 | orkestrel-prove-journey | toolbar-journey-test | The terrain toolbar journey as a browser `integration.test.ts`: add, select, delete, focus; Delete unreachable until selected; both themes and a phone width; capture states |

Assertions live in `tmp/skill-workspace/evals/evals.json` and each run's `eval_metadata.json`.

## Instruments and their controls

- `grade-eval1.mjs` grades the sixteen eval-1 assertions mechanically (labels by `for`/`id`,
  placeholder-only fields, `style` attributes, `<style>` elements, authored classes against the
  class tokens of `terrain/node_modules/bootstrap/dist/css/bootstrap.css`, the affordance per
  category, read-only chrome, feedback wiring, theme, and the presence checks over `checks.md`).
  Control: `controls/eval1-bad/` plants every violation; the grader reported 1 of 16 passing, the
  one pass being the stylesheet link the fixture deliberately keeps.
- `grade-eval3.mjs` grades the nine eval-3 assertions mechanically (import origin and local
  resolver, selector calls, the exact refusal voice, combined variant names, `contrast`/`readRing`
  versus inline luminance, portfolio registration and placement, fixed sleeps, focus reader,
  notes naming the path and project). Control: `controls/eval3-bad/` plants every violation; the
  grader reported 0 of 9 passing.
- Eval 2 is prose and is graded by an Opus grader following the skill-creator `grader.md`.

## Results so far

| Eval | Configuration | Pass | Tokens | Duration |
| --- | --- | --- | --- | --- |
| 1 | old_skill run-1 | 13 / 17 | 338334 | 2216.5 s |
| 1 | with_skill run-1 | 16 / 17 | 299325 | 2492.3 s |
| 2 | old_skill run-1 | 8 / 9 | 163158 | 294.5 s |
| 2 | with_skill run-1 | 9 / 9 | 196953 | 456.4 s |
| 3 | old_skill run-1 | 8 / 9 | 290759 | 1377.5 s |

The eval-2 miss under the old skill: the review names a population for most checks but never states what a check does not cover. The grader also flagged two unverified claims in the old-skill output: a closing sentence that every instrument carries a population floor, contradicted by most of its own checks, and `--bs-card-spacer-*` attributed to `.card-body` where Bootstrap declares it on `.card`.

The eval-3 miss under the old skill: the test measures contrast through neither `contrast`, `readRing`, `measureContrast`, nor `readBackdrop`. Correction taken after this baseline: terrain's Delete control carries the accessible name `Delete selected buildings` through its `aria-label` and its add control `Add new building`, so the asserted refusal voice had named the wrong element; the assertion, the grader, and the terrain brief now name the real accessible names, and the grader admits `measureContrast` and `readBackdrop` beside `contrast` and `readRing`. Both graders still read zero on their planted controls after the change.

The eval-1 misses under the old skill: a `<style>` element re-pointing the stock control border and focus ring after measuring them under 3:1, and four invented utility classes (`u-display`, `u-track`, `u-stamp`, `u-tabular`) absent from the Bootstrap 5.3 cascade. The measured vendor failure is the case the rewritten skill's bounded exception admits, but the exception requires a stylesheet rule over tokens, never a `<style>` block, and no invented class.

Eval 2 with the rewritten skill: every finding carries property, population, reading, control, and coverage; the review names three findings the eval did not anticipate (the alert with no role or message, the missing button `type`, the missing card-body layout) and declares up front which findings it settled from source and which need the cascade. The grader recomputed the two contrast ratios it quotes (2.849:1 and 2.442:1) and the `.badge:empty` rule and found them correct. Grader feedback carried forward: the control-pairing and population assertions check presence rather than correctness, and no assertion rewards disclosing what was not run.

Eval 1 baseline after the prose grader: the fifteenth check in `checks.md` carries no control, two controls expect a green run rather than a planted defect, and no inline-style escape check exists. Assertion added on the grader's feedback: every read-only field still submits (a disabled named control carries a hidden input of the same name, or the field uses `readonly`); the old-skill output passes it. The eval-1 control fixture now plants a disabled named control with no carrier and reads 1 of 17.

Eval 1 with the rewritten skill: the markup passes every mechanical assertion after the grader corrections (Bootstrap Icons tokens admitted when the page links that stylesheet; a theme set by the early-head script admitted; the `<style>` assertion sharpened to "declares only custom properties", which the old-skill output fails on `border-color`, `box-shadow`, and `font-family` rules and the new-skill output passes). The one remaining miss: `checks.md` states a negative control for the instruments the reference names but not for the extra checks the executor listed itself. Iteration-2 candidate for `enterprise-bootstrap`: state in the checklist that every check the deliverable lists carries its control, not only the instruments `inspection.md` names. Grader feedback carried: no assertion reads a `checks.md` reading back against `index.html`, which is how a population count of 91 against 90 distinct tokens went uncaught.

## Iteration 2, 2026-09-02

- Cause: the iteration-1 with-skill run of `underwriting-form-inputs` failed one assertion, "checks.md
  names a negative control for every check it lists". The agent grader found controls on the checks
  drawn from inspection.md and none on the checks drawn from the SKILL.md checklist, under a preamble
  claiming every check carried one. The mechanical grader's substring count had passed it; the
  agent grader's verdict stands.
- Skill change (`5bea858`): the Mechanical proof law and the checklist line bind every check the
  deliverable lists to population, negative control, and coverage, and a check with no control is
  recorded as open rather than listed as a check.
- Runs: `eval-1-underwriting-form-inputs/with_skill/run-1` launched fresh on Opus 5 against the
  edited skill. `eval-3-toolbar-journey-test/with_skill` runs after the terrain tree settles. The
  `old_skill` baselines are iteration-1's runs against the unchanged snapshot, re-used rather than
  re-run; the benchmark names that reuse. `eval-2-markup-inspection` is not re-run: its with-skill
  run passed every assertion and the edit touches no line it reads.
- Grading: `grade-eval1.mjs` mechanical pass, then the agent grader on the checks.md assertions
  with the same per-check reading as iteration 1.

### Iteration 2 results

| Eval                      | Old skill (iteration-1 run, reused) | New skill (fresh run)         |
| ------------------------- | ----------------------------------- | ----------------------------- |
| underwriting-form-inputs  | 13/17                               | 17/17 (agent-graded controls) |
| toolbar-journey-test      | 8/9                                 | 9/9 (one mechanical row overridden on evidence: the voice is composed from a named constant and asserted by equality) |

Summary from `aggregate_benchmark`: old skill 82.5%, new skill 100.0%. The toolbar run ran in a
clean terrain worktree at the pre-campaign commit with the campaign build staged, because the
main tree now carries the very test the prompt asks for. Its own findings — `releasePane` not
restoring the tester viewport, the per-row `Select building for deletion` name, no journey at
desktop width — overlap the truncation finding FX3 is closing and are carried there. Viewer:
`tmp/skill-workspace/iteration-2/review.html` (static, with the iteration-1 comparison).
