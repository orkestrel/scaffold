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
| 2 | old_skill run-1 | 8 / 9 | 163158 | 294.5 s |
| 2 | with_skill run-1 | 9 / 9 | 196953 | 456.4 s |
| 3 | old_skill run-1 | 8 / 9 | 290759 | 1377.5 s |

The eval-2 miss under the old skill: the review names a population for most checks but never states what a check does not cover. The grader also flagged two unverified claims in the old-skill output: a closing sentence that every instrument carries a population floor, contradicted by most of its own checks, and `--bs-card-spacer-*` attributed to `.card-body` where Bootstrap declares it on `.card`.

The eval-3 miss under the old skill: the test measures contrast through neither `contrast`, `readRing`, `measureContrast`, nor `readBackdrop`. Correction taken after this baseline: terrain's Delete control carries the accessible name `Delete selected buildings` through its `aria-label` and its add control `Add new building`, so the asserted refusal voice had named the wrong element; the assertion, the grader, and the terrain brief now name the real accessible names, and the grader admits `measureContrast` and `readBackdrop` beside `contrast` and `readRing`. Both graders still read zero on their planted controls after the change.

The eval-1 misses under the old skill: a `<style>` element re-pointing the stock control border and focus ring after measuring them under 3:1, and four invented utility classes (`u-display`, `u-track`, `u-stamp`, `u-tabular`) absent from the Bootstrap 5.3 cascade. The measured vendor failure is the case the rewritten skill's bounded exception admits, but the exception requires a stylesheet rule over tokens, never a `<style>` block, and no invented class.

Eval 2 with the rewritten skill: every finding carries property, population, reading, control, and coverage; the review names three findings the eval did not anticipate (the alert with no role or message, the missing button `type`, the missing card-body layout) and declares up front which findings it settled from source and which need the cascade. The grader recomputed the two contrast ratios it quotes (2.849:1 and 2.442:1) and the `.badge:empty` rule and found them correct. Grader feedback carried forward: the control-pairing and population assertions check presence rather than correctness, and no assertion rewards disclosing what was not run.

Eval 1 baseline after the prose grader: the fifteenth check in `checks.md` carries no control, two controls expect a green run rather than a planted defect, and no inline-style escape check exists. Assertion added on the grader's feedback: every read-only field still submits (a disabled named control carries a hidden input of the same name, or the field uses `readonly`); the old-skill output passes it. The eval-1 control fixture now plants a disabled named control with no carrier and reads 1 of 17.
