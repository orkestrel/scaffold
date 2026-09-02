# Design round 1 — reconciliation and the questions for the user (2026-09-02)

## Routing ledger

| Unit                    | Role      | Engine                   | Result                                                                 |
| ----------------------- | --------- | ------------------------ | ---------------------------------------------------------------------- |
| absorb-inputs           | `grok`    | Cursor Grok 4.6 high     | `absorb-inputs-report.md`; containment clean; four rows spot-checked   |
| absorb-tooling          | `grok`    | Cursor Grok 4.6 high     | `absorb-tooling-report.md`; containment clean                          |
| absorb-skills           | `grok`    | Cursor Grok 4.6 high     | launched after absorb-tooling returned; report pending                 |
| design (subjective)     | `planner` | Opus 5 native            | `design-subjective-report.md`                                          |
| design (objective)      | `planner` | Opus 5 native, Sol dark  | `design-objective-report.md`; substitution recorded in `bench-ledger.md` |
| probe-browser experiment | Orchestrator | host Node 24, terrain   | `probe-browser-finding.md`; two defects reproduced                     |

Both design lanes ran blind on `design-brief.md` with `evidence.md` as their evidence slice. Neither
saw a Grok distillate; both named that as a risk. The distillates that landed afterwards did not
overturn either lane's design.

## Where the lanes agree

- Keep both skills. Split by audience: `enterprise-bootstrap` states stack-free properties and
  stays portable and unrenamed; `orkestrel-prove-journey` names the `@orkestrel/test/browser`
  mechanism that proves each property. No third skill.
- Add an input catalog reference and an inspection reference to `enterprise-bootstrap`, and
  shrink the `SKILL.md` "Mechanical proof" block to a pointer.
- Rewrite `orkestrel-prove-journey/references/layer.md` from "implement these signatures" to
  "import them from `@orkestrel/test/browser`", keeping the failure voices and role vocabulary.
- Publish to `@orkestrel/test/browser`: the statechart contract (`StateTransition`,
  `StateScenario`, `runScenarios`) consolidated from `elements` and `veneer`, and `readClasses`
  paired with the existing `readCascade`.
- Keep the statechart harness per repository as a prose contract; publish only types, the runner,
  and (objective) the automation attribute names.
- Reuse the published `CaptureVariant` as the single theme-and-viewport run axis for captures,
  style assertions, and statechart runs.
- Do not build a browser lane into `probe` this round; route rendered questions to a written
  artifact of the browser run.
- Every skill edit is a scaffold bump plus a fleet `repair` visit.

## Where they differ, and the Orchestrator's ruling

| Question                                  | Subjective                                   | Objective                                                  | Ruling                                                                                                                                                                                   |
| ----------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inline and custom style instrument        | `readOrigin`: the winning declaration        | `extractEscapes`: offender markup, on an undriven tree     | `extractEscapes` now; it is mechanical and matches `extractOrphans`. `readOrigin` needs a winning-rule reader the platform does not expose; successor probe through the provider's CDP. |
| Class combinations                        | "a pair whose declarations cancel"           | declared allowlist per chrome string, with its invariant   | Allowlist. A cancellation heuristic flags `taverna`'s read chrome, the fleet's best example.                                                                                             |
| Journey skill references                  | `styles.md`, `statechart.md`, `decide.md`    | `cascade.md` plus a families table in `SKILL.md`           | Families table in `SKILL.md` (the integration-test shape with declared families as the options); `statechart.md` and `decide.md` as references; one styles reference, not two.        |
| Control-to-affordance crosswalk           | `form/guides/form.md`                        | not addressed                                              | `form/guides/form.md`, pending the user's scope answer.                                                                                                                                  |
| Catalog file name                         | `inputs.md`                                  | `controls.md`                                              | `inputs.md`: `control` is what a schema declares; the file catalogs what is drawn for an input.                                                                                          |

## Facts settled by running rather than reading

- `prove` cannot serve a browser project in `@orkestrel/probe` 0.0.11. Run 1 refused on the
  instance-expanded project name; run 2 with the name matched ran the browser setup file in a Node
  worker. `absorb-tooling`'s reading that `prove` "can target a browser Vitest project by path" is
  refuted at the point of execution; its Unknown named the right doubt. Both design lanes had
  already recommended the artifact loop first, so nothing in the plan moves; the probe fix is a
  successor unit.

## Addendum after `absorb-skills` (landed after the questions were drafted)

Spot-checked against the cited lines: `layer.md:20`, `captures.md:10`, `form/guides/form.md:206`
and `:212`, `test/guides/test.md:2255`, `test/src/browser/factories.ts:106–145`. All hold. What the
slice adds, and which unit carries it:

- `captures.md` rule by rule against `createPortfolio`: the refusals for an unregistered variant,
  an unregistered state, and a repeated state match the package; the always-on filename-expansion
  uniqueness proof, the placement set-equality proof, and the on-disk membership proof are
  `looser` in the package, so they stay suite assertions the skill prescribes. `place` returns
  `undefined` on an ordinary run before it checks registration, so an ordinary run never refuses an
  unregistered state; the always-on placement proof is what catches it. Carrier: the journey skill
  rewrite unit (`captures.md`).
- `layer.md:20` ("never let a helper take an element") contradicts the package's own split: journey
  verbs refuse an element, readers and fixture builders take one (`test.md:179`). Carrier: the
  `layer.md` unit.
- The published `apply` example sets `data-theme`; Bootstrap surfaces switch on `data-bs-theme`.
  Carrier: the journey skill's styles reference names the attribute the surface actually reads.
- The bootstrap skill's form vocabulary collides with `@orkestrel/form`: a lone `.form-check` box
  is `confirm`, a radio group is `select`, email is `text` plus a rule. Carrier: the catalog and the
  form-guide crosswalk (question 3).
- Unpublished today: a template-class extractor, an inline and `<style>` escape detector, and a
  glyph-to-meaning registry. The first two are question 2's additions; the glyph registry stays
  prose until a fleet surface ships a status glyph set (objective lane's pending fact).
- Neither skill states a statechart procedure or an interactive human-review step; `prove` is a
  case-and-control receipt and measures no contrast, cascade, or glyph. No question changes.

## Questions for the user

1. Placement and shape as the lanes agree: yes or no.
2. Package additions this round: statechart contract, `readClasses`, `extractEscapes`, and the
   harness attribute constants; `readOrigin` deferred to a probe. Yes or no.
3. Catalog keyed by human input categories in the portable skill, with the `FieldControl`
   crosswalk landing in `form/guides/form.md`. Does the `form` guide edit enter this campaign?
4. Rendered decision loop as one written artifact per variant read in one call; the `probe`
   browser lane opened as a separate successor unit against the two reproduced defects. Open it
   now or later?
5. Custom-CSS exception bounded by a measured vendor failure: admit it or keep rung four as
   "propose, never take"?
6. Statechart family required where a journey drives stateful controls, offered elsewhere: yes
   or no?
7. Fold the polish-surface spawned capture harness into the journey run for surfaces a Vitest
   browser project can drive: yes or no?
8. Consumer scope: `terrain` as the reference implementation and the `elements`/`veneer`
   deduplication in this campaign, or deferred?
9. Release: scaffold bump, `@orkestrel/test` publish, and the fleet `repair` wave at the end of
   this campaign, or held?
