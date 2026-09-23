# B-FORMS-FLOATING — audit claims

## Subject

The B-FORMS-FLOATING unit's uncommitted writes in `/home/user/veneer-bff` (detached at `2c10329`,
Veneer `main` with the passive family, VALIDATION, and RANGE landed), written by `opus` from
`/home/user/veneer-bff/tmp/units/b-forms-floating-brief.md` under the design
`/home/user/veneer-bff/tmp/units/b-forms-design-verdict.md` (rulings 1 to 7, 9, 10, 11), plus the
B-FORMS-FLOOR unit's writes in the same worktree (`builder`, from
`/home/user/veneer-bff/tmp/units/b-forms-floor-brief.md`, ruling D32: `findDuplication`'s relative
arm moves its floor to five declarations). One round so far: this one. Review evidence:
`/home/user/scaffold/.orkestrel/veneer/units/bff.diff` (the whole diff against `2c10329`, both units; the new
owned files rendered through `git add -N`), `bff-status.txt`, the reports
`/home/user/scaffold/.orkestrel/veneer/units/bff-report.md` (FLOATING) and `bff-floor-report.md` (FLOOR); the
frames sit under `/home/user/veneer-bff/tmp/capture/states/` (the `form-floating*` files) and are
the primary evidence for every rendered claim, the source corroboration. The mutation instrument is
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/mutate.py`.

## What the round decides

Whether B-FORMS-FLOATING lands on Veneer `main` as the `form-floating` baseline after GROUP (whose
`.input-group > .form-floating` rules the key also records), with the Orchestrator's shipped-key
Set literal edit and the roadmap patch, together with the D32 floor change; and whether the writer's
deviations stand: D1 (the coincidence floor, ruled D32 and landed by FLOOR), D2 (the § Files table's
whitespace reflow), D3 (the partial loads `../mixins` alone), D4 (each autofill selector its own rule
because the build rewrites a grouped list into `:-webkit-any(…)` and `:is(…:autofill)`), D5 (the
disabled specimen is a filled, disabled textarea). D34 (the height and the floated top inset scale
with density through the multiplied space token) is already ruled and carried to the fix round: do
not re-report the density split; rule the rest.

## Already established — do not re-run

Verified by the Orchestrator directly: the worktree base `2c10329`; `src/styles/index.scss:62` is
`@use 'components/form-floating';` directly after `@use 'components/form-range';` at 61 (the
release's order: floating labels after the range); `tests/conformance.test.ts:104` lists
`'form-floating'`; `ls tmp/capture/states | grep -c '^form-floating'` returns 52 (7 scenarios × 4
variants as frames plus 6 subjects × 4 variants as accessibility artifacts); `guides/veneer.md` has
`### Form floating classes` at 780 after `### Form range classes` at 723, `#### \`form-floating\``
at 2683 after `#### \`btn-close\`` at 2672; the partial (132 lines) opens `@use '../mixins' as *;`
with no tokens load and writes its transition through `@include transition(...)` at line 48; the
partial names no validation state; `findDuplication` in `tests/setupServer.ts` now reads
`(count >= 5 && count * 2 > smallest) || count >= 6` with the TSDoc restated for 2026-09-23, and
`tests/setupServer.test.ts`'s `findDuplication` cases moved with it (FLOOR's diff: 19 and 56 lines
changed); at this tree `npm run test:setup` reports 1 failed (the Set literal) and 184 passed, per
the FLOOR report, and `npm run test:conformance` reports 1 failed on GROUP's absent
`.input-group > .form-floating` (the FLOATING report's presence reading, expected until GROUP lands;
the writer's one-run plant of GROUP's selectors read 17 passed).

## Unknowns

- Whether the floating rules tie an input-group or validation rule at equal specificity so that
  the barrel order decides: the release loads floating labels before the input group; Veneer loads
  `input-group` (GROUP, at line 55 before `validation`) before `form-floating` (62). Name any pair
  and the settling reading.
- Whether every rendered claim has a frame the portfolio shows: rule `NOT-EVIDENCED` where it does
  not, naming the missing capture; the autofill selectors, the `.form-control:disabled ~ label`
  twin, and the select's `line-height` took the declaration path by the writer's stated limits
  (rule whether each limit is real: no script drives autofill; the bare `:disabled ~ label` rule
  paints the same grey; Chromium resets a native-appearance select's line height).
- Whether the ledger attribution of `.input-group > .form-floating` after GROUP lands puts a GROUP
  departure into this key's table (the writer's unverified claim): rule from `attributeSelector`.

## The threshold

A finding is worth more than a clean pass: a defect that lands on `main` here reaches every later
forms unit and every consumer of the next release. `CONFIRMED` requires naming the attack that
failed; a claim about a proof is ruled on the mutation named and whether the assertions distinguish
it from the passing case. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED with
`file:line`.

## Numbered falsifiable claims

1. **The partial emits the key's own selectors as recorded.** `src/styles/components/_form-floating.scss`
   emits every inventory selector under `form-floating` that opens on `.form-floating` (the
   container; the control, plaintext, and select geometry; the label and its transforms; both
   `::placeholder` rules; focus, filled, autofill, select, and plaintext forms; the textarea backdrops;
   the disabled labels; the reduced-motion twin through the mixin) with every declaration and
   condition the compiled release carries, tokenized per the report's table (the insets through
   `--vn-space-8`, `--vn-space-6`, `--vn-space-5`, `--vn-space-3`; the disabled colour through
   `--vn-gray-600`; the `--bs-*` globals byte for byte; the height, line height, floated top inset,
   backdrop height, stacking, and transform literal — D34 changes the height and the top inset in
   the fix round), and emits none of the `.input-group` or `.was-validated` entries. Compile with
   `npx sass` and compare against `bootstrap.css`; confirm D4 by grouping the autofill selectors in
   memory and reading what the build emits.
2. **The barrel order is the release's** (floating after range) and no floating rule ties an
   input-group or validation rule at equal specificity in a way the load order decides.
3. **The proof reads what it claims.** `tests/src/styles/components/form-floating.test.ts` reads the
   positioning box, the rested label and its transition, the hidden placeholder, keyboard focus
   through `traverseAccessible`, the filled state through `typeAccessible` and `commitInput`, the
   plaintext and select forms, the autofill rules through `collectLayer('components')` and the Node
   reading, the textarea backdrops, the disabled labels, the density and radius factors, and the
   globals; `FORM_FLOATING_CASES.rendered` is false for exactly the three declaration-path selectors
   and a Node case pins that list. Rule each mutation in the report's table (wrong transform; a
   label that never fades; lost focus padding; a surviving reduced-motion transition; a wrong
   backdrop radius; a dropped bare disabled rule; a literal label inset) on whether the named
   assertions distinguish it, and name any recorded declaration no case reads.
4. **The showcase and the registry.** `FormFloatingSection.ts` renders the region `Form floating`
   with the specimens `FORM_FLOATING_SPECIMENS` declares (empty, filled, textarea, select, disabled,
   plaintext); `CASCADE_KEYS` gains six resting rows with the selectors and properties the report
   lists; `FORM_FLOATING_KEYS` carries `form-floating-empty-focus` as a page frame; the journey waits
   for the label transition and reads the state again after the shot; every scenario has its frame at
   every variant; the frames show the floated geometry over bare user-agent controls (no `.form-control`
   partial yet). D5 stands.
5. **The accounting.** `form-floating` sits sorted in `listed`; its selector row sits in
   § Compatibility; the `#### \`form-floating\`` table carries the `declared` height and min-height
   rows and the `tokenized` padding, padding-bottom, padding-left, inset, and colour rows the report
   lists; no deferral row names a `form-floating` selector; no addition row is owed; after GROUP lands,
   `.input-group > .form-floating` attributes to `form-floating` (rule by running `attributeSelector`).
6. **The guide.** `### Form floating classes` sits directly after `### Form range classes` in that
   section's shape and voice, names the tokenized and literal values and the evidence limits (autofill,
   the disabled twin, the select's line height), and names its § Files row (D2's reflow is whitespace
   only) and § Tests link; the added prose follows `writing.md`.
7. **D32 lands** (FLOOR). `findDuplication`'s relative arm reads `count >= 5 && count * 2 > smallest`,
   the absolute arm stays at 6, the TSDoc states the 2026-09-23 boundary, the boundary cases in
   `tests/setupServer.test.ts` moved with it (a whole four-declaration copy refused, a five-declaration
   copy reported, the tie-at-half case at five over ten), and the coincidence-floor case is green at
   this tree; rule from the scratch cases that each distinguishes the old floor from the new.
8. **The law holds.** Across the diff: no `any`, `as` (other than `as const`), `!`, or suppression;
   no nested function beyond a callback passed or returned directly; every exported table frozen and
   `{QUALIFIER}_{NOUN}`-named; no helper whose job an installed `@orkestrel/test` export does; no
   literal colour outside `_tokens.scss`; the one transition through the mixin; no per-variant block
   repeated without an `@each`.
9. **Scope is honest.** `bff-status.txt` lists the four owned files as `A`, the thirteen shared files
   as `M`, and FLOOR's `tests/setupServer.ts` and `tests/setupServer.test.ts`; `tmp/probe/` is absent;
   `_tokens.scss`, `_theme.scss`, `_mixins.scss`, `_validation.scss`, `ROADMAP.md`, and every
   vendored file are untouched.
10. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (651),
    `test:app` (55), `test:guides` (18), `test:policy`, `test:journey` (132), and the four `CAPTURE=1`
    runs (33 each) exit 0; `test:setup` is red only on the Set literal (after FLOOR); `test:conformance`
    is red only on GROUP's absent selector. UNRESOLVED until the Orchestrator's independent chain at
    the landing after GROUP; run `npm run check` yourself.
