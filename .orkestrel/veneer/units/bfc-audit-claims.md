# B-FORMS-CHECK — audit claims

## Subject

The B-FORMS-CHECK unit's uncommitted writes in `/home/user/veneer-bfc` (detached at `2c10329`,
Veneer `main` with the passive family, VALIDATION, and RANGE landed), written by `opus` from
`/home/user/veneer-bfc/tmp/units/b-forms-check-brief.md` and finished under its successor
`b-forms-check-brief-2.md` (which added the dispatch template's rows and changed no obligation),
under the design `/home/user/veneer-bfc/tmp/units/b-forms-design-verdict.md` (rulings 1 to 7, 9,
10, 11). One round so far: this one. **Review evidence.** `/home/user/scaffold/.orkestrel/veneer/units/bfc.diff` (the
whole diff against `2c10329`; the new owned files were added with `git add -N` so the diff renders
them), `bfc-status.txt`, and the report `/home/user/scaffold/.orkestrel/veneer/units/bfc-report.md`; the frames
sit under `/home/user/veneer-bfc/tmp/capture/states/` (the `form-check*` files) and are the
primary evidence for every rendered claim, the source corroboration.

## What the round decides

Whether B-FORMS-CHECK lands on Veneer `main` as the `form-check` baseline, with the Orchestrator's
shipped-key Set literal edit and the roadmap patch, and whether the two deviations the writer took
(the fill bound to the palette entry rather than the role token; the theme scope's `switch-knob`
entry left in place and carried to a follow-up unit) stand.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from the writer's report: the worktree base
`2c10329` (`git log --oneline -1`); the `$icons` map entries and the `$dark` `switch-knob` entry in
`src/styles/_tokens.scss` (lines 105 and 123 to 140); `$assets` still carries `'switch-knob':
'--bs-form-switch-bg'` (line 163) and `_theme.scss` emits it under `[data-bs-theme='dark']`, which
is a standing fact of the baseline and not this unit's; `_validation.scss` emits the
`.form-check-input` validation rules (lines 94 to 110); `_button-group.scss` emits the
`.btn-group > .btn-check:checked + .btn` family (lines 18 to 25).

## Unknowns

- Whether the half-channel-step difference between the written focus border tint
  (`color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))`) and the release's
  `#86b7fe` is a rounding of the release's own `tint-color` mix or a different mix: report the
  computed values and which mix reproduces `#86b7fe` exactly.
- Whether every rendered claim has a frame the portfolio shows: rule `NOT-EVIDENCED` where it does
  not, naming the missing capture.

## The threshold

A finding is worth more than a clean pass: a defect that lands on `main` here reaches every later
forms unit that builds on this partial and every consumer of the next release. `CONFIRMED`
requires naming the attack you tried that failed; a claim you cannot decide is `UNRESOLVED`, not
`CONFIRMED`, with what would settle it; do not hedge toward an imagined consensus.

## Numbered falsifiable claims

1. **The partial emits the key as recorded.** `src/styles/components/_form-check.scss` opens
   `@layer components` after `@use '../tokens'` and emits every selector the inventory records under
   `form-check` except the validation rules (`_validation.scss`'s) and the `.btn-check` rules (which
   the inventory records under `btn`, and `_button.scss` emits in another form), plus `.form-switch`
   (recorded under `form`) and the dark descendant rule
   `[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)`, with every
   declaration and condition the compiled release carries; the reduced-motion twin goes through
   the `transition` mixin; the glyphs come from `map.get(tokens.$icons, …)` and
   `map.get(tokens.$dark, 'switch-knob')`; `-webkit-appearance`, `-moz-appearance`,
   `-webkit-print-color-adjust`, and `color-adjust` are dropped (the build re-adds
   `-webkit-print-color-adjust`); the token rulings are the report's table (`min-height`
   `--vn-space-12`, `margin-bottom` `--vn-space-1`, inline `margin-right` `--vn-space-8`, the focus
   shadow bound as `_button.scss` binds its own, the focus border the `color-mix` tint, the checked
   and indeterminate fill and border `--vn-palette-blue` as `_list-group.scss` and `_form-range.scss`
   bind the same release value, the switch transition through the motion tokens); every `em`
   length, `50%`, `brightness(90%)`, `opacity: 0.5`, and the background positions are literal; no
   token was added. Rule by compiling the partial (`npx sass`) and comparing its declarations against
   the release's, and by the `dist` grep the report describes.
2. **The proof reads what it claims** (`tests/src/styles/components/form-check.test.ts`).
   Each row of the report's coverage matrix names a case that reads the selector's treatment; the
   eight mutation plants each redden the case named for the defect (a wrong URI; a missing dark rule
   reddening the selector check, the dark-switch glyph row, and the dark knobs case; a `0.25rem`
   shadow; swapped checked and indeterminate images; a bare `transition`; a removed disabled
   opacity; a role-token fill; a literal `1.5rem` floor); the negative controls behave as reported
   (a comment-only edit green; a one-character glyph drift red; a trailing space green); the
   failing-first fixes (the ring border read against the release's own mix; the switch knob read
   after `waitForAnimations`; the journey's refusal of a shared name) are recorded. Rule whether the
   assertions distinguish each plant from the passing case and whether the disabled-fieldset host
   proves `[disabled] ~ .form-check-label`.
3. **The showcase and the registry.** `FormCheckSection.ts` renders the region `Form check` with
   the specimens `Form check box`, `Form check checked`, `Form check radios` (the pair in its own
   `<form>`), `Form check disabled`, `Form check reverse`, `Form check inline`, `Form check switch`,
   `Form check switch checked`, `Form check switch disabled`, and `Form check switch reverse` (added
   under ruling 9 because `.form-switch.form-check-reverse` had no specimen); `CASCADE_KEYS` gains
   the ten resting rows as element frames over the lifted specimen; `FORM_CHECK_KEYS` carries
   `form-check-box-focus` (a page frame by keyboard traversal from the `Wrapping toolbar`'s last
   button, the ring ratio equal to `FOCUS_RING[mode]`, read again after the shot) and
   `form-check-box-indeterminate` (an element frame over a lifted copy with renamed ids, the
   property set on the copy, the glyph checked against `FORM_CHECK_ICON_CASES` and read again after
   the shot, the showcase's own box unchanged); `CaptureState` gains `'indeterminate'` in
   alphabetical position; `CaptureSubject` gains the names; the four capture runs wrote every
   `form-check*` frame and accessibility artifact at every variant; `form-check-radios--dark-1280`
   shows the checked radio, `form-check-box-indeterminate--light-390` the mixed glyph,
   `form-check-switch--dark-390` the dark knob, `form-check-switch-reverse--light-1280` the switch
   at the trailing edge.
4. **The accounting.** `form-check` sits in `listed` sorted; its selector and variable rows are in
   § Compatibility; the `#### \`form-check\`` ledger table follows `#### \`btn-close\`` with the
   tokenized rows and the dropped rows the report lists; no addition row exists because `.form-switch`
   and the dark rule sit under the withheld `form` and `theme` keys (rule that the ladder's
   withheld-key stop is what keeps them outside the ledger, so the conformance gate is green by the
   design's rule rather than by an unattributed selector); no deferral row names a `form-check` or
   `form-switch` selector; `tests/setupStyles.test.ts` proves that the check selectors and the
   validation rules together make up the whole key.
5. **The guide.** `### Form check classes` sits directly before `### Form range classes` and states
   the evidence it has and its limits, naming the dark rule and the icon map; the § Files row and
   the § Tests link exist; the prose follows `.claude/rules/writing.md` (no count, no `should`,
   `simply`, `currently`, `via`, temporal `once`).
6. **The theme-scope switch knob** (deviation 1). `$assets` still maps `switch-knob` to
   `--bs-form-switch-bg` and the theme scope emits it, both off-limits to this unit; the
   component-level dark rule wins on the element (the missing-dark-rule plant reddens the
   dark-switch glyph row, so the theme-scope value does not reach the control); the removal, with
   the `tokens.test.ts` case `re-declares every theme-dependent name inside each mode scope`, the
   § Tokens paragraph, and the `$assets` doc comment, is a follow-up unit's (D26). Rule that nothing
   else reads `--bs-form-switch-bg` from the scope and that the unit's patch is exact.
7. **The `.btn-check` overlap** (deviation 5). Every `.btn-check` rule the release writes in its
   check partial is recorded under `btn`, `_button.scss` emits each in a different form, and the
   partial emits none; no `form-check` selector is left unemitted by this.
8. **The law holds.** Across the diff: no `any`, `as`, `!`, or suppression; no nested function beyond
   a callback passed or returned directly; readonly interface members; `{QUALIFIER}_{NOUN}`
   constants (`FORM_CHECK_SELECTORS`, `FORM_CHECK_ICON_CASES`, `FORM_CHECK_MARKUP`,
   `FORM_CHECK_KEYS`, `FORM_CHECK_COPY`, `FORM_CHECK_SPECIMENS`), frozen; no helper whose job an
   installed `@orkestrel/test` export does (`waitForAnimations` is the installed helper); no mock or
   fake; the partial writes no literal colour outside a token or a `color-mix` over tokens, drives
   repeated structure with `@each`, and declares no `transition` outside the mixin.
9. **Scope is honest.** The status lists the owned files and the shared files at their anchors and
   nothing else (comment-only edits to `tests/setup.ts`, `tests/setup.test.ts`, and
   `tests/setupStyles.ts` landed during the first capture run, and every later gate read them);
   `git add -N` touched the new owned files alone; `tmp/probe/` is absent; `src/styles/_tokens.scss`,
   `_theme.scss`, `_validation.scss`, `_button.scss`, `_button-group.scss`, `tests/setupServer.ts`,
   `tests/setupServer.test.ts`, and the vendored files are untouched.
10. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:src:styles` `657
    passed` (the owned proof 23 of 23); `test:app` `55 passed`; `test:conformance` `17 passed`;
    `test:guides` `18 passed`; `test:policy` `109 passed | 1 skipped`; the four capture journeys `34
    passed` each; `test:journey` `136 passed`; `test:setup` red on the shipped-key Set literal alone;
    `npm test` stops there. UNRESOLVED until the Orchestrator's independent chain at the landing;
    rule `npm run check` yourself where the sandbox allows it.
