# TOKEN-PROOFS audit round 2 — claims

Subject: TOKEN-PROOFS rounds 2 and 3 in `/home/user/veneer-tkp` (branch `unit/tkp`, uncommitted over Veneer
`2376710`), briefed by `token-proofs-brief-2.md` and `token-proofs-brief-3.md`, and ruled by D51 and D51a in
`decisions-round-2.md`. Written by `opus` on Opus 5.5 and reported in `token-proofs-report-2.md` and
`token-proofs-report-3.md`. Round 1's claims are confirmed in `tkp-audit-verdict.md` and are not re-ruled here.
Evidence: `tkp-3.diff` (`git diff 2376710` after round 3), `tkp-3-status.txt`, `tkp-2.diff`, and the logs and drivers
under `tkp-instruments/r2/` and `tkp-instruments/r3/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A
unit report's prose is not a claim subject. A mutation counts as a kill only when the failing case's message names an
assertion failure. This round is the seam's third, so a claim ruled BROKEN here is ruled by the Orchestrator rather
than repaired in a fourth round. Rule every claim.

1. **The hover decoration plant.** The case `overrides the link decoration` in `tests/src/styles/tokens.test.ts`
   asserts the hovered link button's `text-decoration-line`. The plant logged in
   `tkp-instruments/r2/logs/tkp-2-plant-link-decoration-hover.log.txt` rewrites only the `.btn-link:hover` decoration in
   `src/styles/components/_button.scss`, fails the case at that hover assertion with an `AssertionError`, and holds
   every earlier assertion in the case.
2. **The plain-ancestor placement case.** The case `holds the validation paint on the rest color under a plain ancestor
   that overrides the form tokens, and moves it under a mode scope that does` overrides `--vn-form-valid` and
   `--vn-form-invalid` on an ancestor with no `data-bs-theme` attribute and on a `data-bs-theme` ancestor. It asserts
   that the plain ancestor's inside `.is-valid` and `.is-invalid` borders and feedback colours keep the rest value, and
   that the mode-scope ancestor's move. Each of those assertions fails under its own plant in `tkp-instruments/r2/logs/`
   (the `placement-plain-*` and `placement-mode-*` logs), so the case tells the two placements apart.
3. **The alias case.** The case `recolors the border and the feedback of a valid control inside a plain ancestor that
   sets the validation aliases, and leaves a twin on the rest color` sets `--bs-form-valid-color` and
   `--bs-form-valid-border-color` on a plain ancestor, asserts that the inside border and feedback follow and that a twin
   outside keeps the rest value, and each inside assertion fails under its own plant (the `alias-*` logs).
4. **The scope case.** The case `moves a mode-scope alias and holds the root-only aliases under a mode scope that
   overrides their tokens, and moves all of them from the document element outside a mode scope that re-declares the
   token` asserts:
   - under a `data-bs-theme="light"` element overriding `--vn-color-primary-base`, `--vn-color-success-base`, and
     `--vn-radius-base`, `--bs-primary` follows while `--bs-success` and `--bs-border-radius` equal their document
     readings;
   - under the same overrides on `document.documentElement`, all three follow on a child outside any mode scope, and a
     second `data-bs-theme="light"` element with no override keeps its own `--bs-primary`;
   - the overrides on `document.documentElement` are removed in a `finally` block.
   The scope plant (`tkp-3-plant-scope.log.txt`) and the held plant (`tkp-3-plant-held.log.txt`) each fail the case at
   the assertion the report names, with an `AssertionError`, and each restore is byte-identical.
5. **§ Customization is true of the built cascade.** Every item in § Customization's placement list in
   `guides/veneer.md` holds against `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss`
   (the `theme-tokens` mixin), and the scope listing `tkp-instruments/r3/tkp-2-probe-scopes.log.txt`:
   - the mode-scope item names only aliases each mode scope re-declares, including the close button and carousel
     values;
   - the root-only item names only aliases declared on `:root` and never at a mode scope, including the gradient and
     the focus ring width and opacity;
   - the `:root` item's exception for a mode scope that re-declares the token holds;
   - the any-other-element item names only rules that read a canonical token directly: the link colours and
     decoration, the button state mixes and the disabled button opacity, the heading weight, and the standard easing;
   - the alias item holds for the validation rules.
   No family the cascade re-declares at a mode scope is missing from the mode-scope item, and no family it declares on
   `:root` alone is missing from the root-only item.
6. **Every placement item has an executed assertion.** Each item in the list maps to a case in
   `describe('ancestor token overrides')` whose assertions break if the item goes false, per
   `.claude/rules/documentation.md` § Parity: the `:root` and root-only items and the mode-scope item's primary fill to
   the scope case, the mode-scope item's form pair to the placement case, the any-other-element item to round 1's
   override cases, and the alias item to the alias case.
7. **Gates.** `npm run check` and `npm run lint:check` exit 0, oxfmt leaves the owned files unchanged, the tokens file
   reads `Tests 46 passed (46)`, and `npm run test:guides` and `npm run test:policy` exit 0, per
   `tkp-instruments/r3/`.
8. **Scope and law.** `tkp-3-status.txt` names only `guides/veneer.md` and `tests/src/styles/tokens.test.ts`, and
   `git diff --stat -- src` is empty. The rounds add no `any`, prohibited assertion, non-null assertion, suppression,
   nested function declaration, hidden helper, mock, or fake; every literal asserted is a reading, not a recalled
   value; each case title states what the case proves; and the § Customization prose meets `.claude/rules/writing.md`
   (no banned term, no count, the component as the actor).
