# X-TENETS-STYLES — verdict (2026-09-25)

The Orchestrator's reconciliation of the implementation audit of the shipped cascade (Veneer `main` at `0865c67`,
compiled cascade SHA-256 in `index-css-0865c67.sha256.txt`) against Veneer's tenets, on `tenets-styles-audit-claims.md`.
Five lanes ran blind to each other: the objective lane, `analyst` on GPT-6 Astra, over every claim
(`tenets-styles-objective-verdict.md`; journal `tmp/codex/tenets-styles-analyst.jsonl`, thread
`01a0d69f-8cc7-7ae3-bd33-87ad51c6c3ef`), which executed its plants in memory over the compiled cascade; and four
`reviewer` lenses on Opus 5.5 (`tenets-styles-{structure,tokens,identity,rendered}-verdict.md`). The Orchestrator's
mechanical sweep is `sweep.mjs` with `sweep-0865c67.log.txt`.

## Claims

| Claim | Objective | Lens | Ruling |
| --- | --- | --- | --- |
| 1 No component from tag structure | CONFIRMED | CONFIRMED (structure) | CONFIRMED |
| 2 Class scoping on tags | CONFIRMED | CONFIRMED (structure) | CONFIRMED |
| 3 Important declarations | CONFIRMED | BROKEN (structure) | BROKEN on the guide clause: every important declaration has a Bootstrap twin (both lanes), but the twins sit inside cascade layers, so an unlayered consumer `!important` loses to them where it wins in Bootstrap 5.3.8, and the guide states the escape as reopening the layer (`guides/veneer.md` § Styles, the important-utility paragraph) while `ROADMAP.md` § Rulings states it as a consumer's own `!important`. The shipped contract and the standing ruling disagree. |
| 4 Class control over tag defaults | BROKEN | BROKEN (structure) | BROKEN: normal declarations hold on both lanes (the quote, focus-ring, and stacks proofs, each mutation named); important declarations in every layer beat an unlayered consumer's `!important` (`tokens.test.ts`, `offcanvas.test.ts`, and `reset.test.ts` pin it; `<div hidden class="d-flex">` is hidden in Veneer and shown in Bootstrap) |
| 5 Every token has a reader | BROKEN | BROKEN (tokens) | BROKEN: `--vn-focus-reset` is read only as a mixin default every caller overrides (both lanes); `--vn-color-tertiary-subtle`, `-border`, and `-rgb` have no reader, because the tertiary role drives only `.btn-tertiary` and `.btn-outline-tertiary` (tokens lens; the Orchestrator's sweep) |
| 6 Token overrides move consumers | BROKEN | BROKEN (tokens) | BROKEN: no proof overrides a token and reads a shipped consumer move for the `link`, `form` (valid and invalid), `button`, `state` (hover, active, mixer), `weight`, and `ease` groups; the objective lane's mutation bypasses the canonical form tokens with every rendered assertion green |
| 7 Motion outside the panels | BROKEN | CONFIRMED (tokens) | BROKEN on proof coverage: every non-panel transition carries its reduced-motion twin (both lanes), but the range thumb's is read from declarations, because Chromium withholds the thumb's computed transition, so a more specific reduced-motion rule on the thumb goes unseen (objective) |
| 8 Elements identity is recorded | BROKEN | BROKEN (identity) | BROKEN: the ledger does not compare canonical token values (`guides/veneer.md` § Outside the ledger), a departure that reads a token is labelled `tokenized` whether the token keeps the release value or carries Elements' (the primary fill, the `.btn` font size), and an Additions row records a name without its value, so the objective lane's in-memory plants (a `97px` blockquote border, a doubled radius) left the ledger empty |
| 9 The accounting gate | BROKEN | CONFIRMED (identity) | BROKEN on the membership boundary: the four drift classes each have a proof (both lanes), but a components-layer rule that no shipped key claims is skipped, and the objective lane's plant `.audit-unrecorded { color: red }` left the ledger empty (the identity lens referred the same boundary) |
| 10 Baseline coverage | CONFIRMED | BROKEN (identity) | BROKEN on the re-pin door: the hand-written shipped list equals the pinned inventory's keys today (objective, by executed mutations), but no gate derives the list from the inventory, so a re-pinned inventory that adds a key reddens nothing (identity) |
| 11 Tailwind | NOT-EVIDENCED | BROKEN (rendered) | BROKEN: no rendered case mounts a Veneer component class under Tailwind's preflight (both lanes), and the preflight recipe the guide gives consumers is never compiled; deleting its layer-order line leaves every test green (rendered) |
| 12 Interactive states render | BROKEN | BROKEN (rendered) | BROKEN: `.form-range` defines a press state and a disabled state no rendered case reads (rendered); a disabled `.btn-link` has no rendered case (objective) |

## Findings outside the claims

- **Tailwind proofs outside every landing chain (rendered F1), accepted.** `npm test` omits `test:service`, and no
  landing chain in this session ran it. The Orchestrator's landing chain runs `test:service` from the next landing on;
  whether `npm test` takes it is a `package.json` change both sessions treat as report-only, asked of the engine
  session.
- **The garbled Tailwind section (rendered F2), accepted.** The § Tailwind prose around the `bg-*`, `border*`,
  `rounded`, and `text-*` exclusion paragraphs has two lost lead sentences and a dangling repeated sentence.
- **Duplicate stacking rows (tokens F-STACK-ROW), accepted.** § Tokens holds two rows for `--vn-stack-popover`,
  `--vn-stack-hint`, and `--vn-stack-toast` with different Alias cells.
- **The motion factor's reach (tokens F-MOTION-SCOPE), accepted.** § Factors says the motion factor scales "the
  durations", and the transitions that keep Bootstrap's literals (the floating label, the progress bar, nav,
  pagination, the navbar toggler, the accordion button) ignore it.
- **Source provenance (identity referral), accepted as a question for LEDGER-VALUES.** No gate checks that a
  § Reference map row whose Source is `bootstrap` carries the release's value.

## Carriers

- **IMPORTANT-LAYER** (claims 3 and 4): a design round (`planner` on Opus 5.5, `analyst` on Astra) that measures what
  each option breaks — (a) emit every `!important` declaration outside the layers, in the release's order, keeping the
  normal declarations layered; (b) keep layered importance and record it as an explicit incompatibility — against the
  Tailwind exclusion line, the conformance priority case, and the `R5 Layer by importance` ruling of
  `b-utilities-design-verdict.md`. The Bootstrap-compatibility tenet makes an incompatibility the user's to accept, so
  the round's reconciliation goes to the user with a recommendation before any unit.
- **LEDGER-VALUES** (claims 8, 9, and 10, and the provenance question): a design round, then a unit, for a ledger that
  tells a retune from a routing, carries values on Additions rows or checks them, refuses an unattributed emitted rule,
  and derives the shipped key list from the inventory.
- **TOKEN-PROOFS** (claims 5 and 6, F-STACK-ROW): `opus` on Opus 5.5 — an override proof per uncovered group with a
  control outside the override; `--vn-focus-reset` retires and the `focus-ring` mixin's default becomes `none`; the
  tertiary role's `-subtle`, `-border`, and `-rgb` tiers retire, because no Bootstrap class reads them for a role with no
  Bootstrap alias; the stacking rows merge. The token names live in `src/core/constants.ts`, which the engine session
  owns, so the retirement goes to it as a pending shared change before the unit lands.
- **STATES** (claims 7 and 12): `opus` on Opus 5.5 — the range thumb's press and disabled states read from rendered
  paint, its reduced-motion reading taken from the document's animations with a control that restores motion, and a
  disabled `.btn-link` case reading its resolved paint.
- **TAILWIND-RECIPE** (claim 11, rendered F1 and F2): `opus` on Opus 5.5 — a fixture equal to the guide's preflight fence
  held line for line to it, compiled, with the component classes that share properties with preflight rendered under it
  and read equal to the cascade alone; the garbled § Tailwind prose restored.
- **E-ID-MOTION** (F-MOTION-SCOPE): an added unit, E-ID-MOTION-FACTOR, scales every remaining literal transition by the
  motion factor and records each as a departure, recorded in `../../e-id-motion-design-verdict.md`.

## Ruling

FAIL 3, 4, 5, 6, 7, 8, 9, 10, 11, and 12. Claims 1 and 2 confirm the semantic-tag tenet on the compiled cascade. The
carriers above take every finding; IMPORTANT-LAYER goes to the user after its design round.
