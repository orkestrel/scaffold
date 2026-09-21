# CL2 audit — claims (round 1)

Subject: unit CL2 (the Content/layout tokens and the breakpoint mixins), written by `opus` on
native Opus 5 in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base
`00a5bdc` (the CL1 landing), under the effective brief
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-brief-2.md` (brief 1 is
superseded; `units/cl2-scope-read-report.md` records why). Evidence: the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl2-diff.patch.txt` and status
`tmp/audit/cl2-status.txt`, the live tree, and the unit's report
`.orkestrel/veneer/units/cl2-report.md` (a report-only claim, such as a red-then-green run, is
recorded as report-only). Audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the
deciding evidence; add an implementation-defect finding only after the last claim, with a site
and a one-line failure scenario, saying whether it forces another round.

1. Tokens land once and resolve as designed. `--vn-space-12` and `--vn-space-24` continue the
   space ramp under its index law as `calc(1.5rem * var(--vn-factor-density))` and
   `calc(3rem * var(--vn-factor-density))` after `--vn-space-8` in `src/styles/_tokens.scss`;
   `--vn-display-1` to `-6` read `5rem`, `4.5rem`, `4rem`, `3.5rem`, `3rem`, `2.5rem` after the
   `--vn-size-*` ramp, outside the density factor; `--vn-state-stripe` is emitted by the theme
   closure in `src/styles/_mixins.scss` beside `--vn-state-hover` and `--vn-state-active`, from
   `'state-stripe': 5%` in both `$light` and `$dark`, so it resolves to `5%` in both modes. The
   registry `TOKEN_NAMES` in `src/core/constants.ts` carries the leaves `space.12`, `space.24`,
   `display.1` to `display.6`, and `state.stripe`, and no other new leaf; `src/core/types.ts`
   and `tests/src/core/index.test.ts` are unchanged because `TokenMap` is derived from
   `TOKEN_NAMES` and the index proof enumerates no token name, so neither change's absence
   leaves a stale assertion.

2. One Sass source, placed under the styles rule. `breakpoints()` in `src/styles/_mixins.scss`
   is a `@function` returning the map `xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px,
   xxl: 1400px`; `breakpoint($name)` returns one width and refuses a name the map lacks with
   `@error`; `src/styles/_tokens.scss` emits `--vn-breakpoint-*` by an `@each` over
   `breakpoints()` and `--bs-breakpoint-*` by an `@each` over its keys, so the built cascade's
   breakpoint tokens and aliases are byte-for-byte what `00a5bdc` emitted (`0`, `576px`,
   `768px`, `992px`, `1200px`, `1400px`; each alias `var(--vn-breakpoint-<name>)`). This
   placement satisfies `.claude/rules/styles.md`: `_mixins.scss` holds `@function` values and
   emits no top-level CSS (`@media (width` appears nowhere in `dist/src/styles/index.css`), and
   `_tokens.scss` still declares every public token, so it remains the token source of truth
   with the breakpoint values reached through a function it loads rather than a second copy.

3. The mixins emit exactly the token's value. `breakpoint-up($name)` takes `@content` and wraps
   it in `@media (width >= <width>)`, unwrapped for `xs`; `breakpoint-down($name)` wraps it in
   `@media (width < <width>)` and emits nothing for `xs`; no `575.98px`-style offset exists
   anywhere under `src/styles`; both engines serialize `conditionText` as the range syntax
   verbatim (report-only reading, taken through a removed `console.log`).

4. The proofs bind the behaviour and reddened on their plants. `tests/src/styles/tokens.test.ts`
   proves bidirectional equality between the cascade's `--vn-` partition and the registry (red
   on the planted unmapped `--vn-space-48`, report-only: 2 failed then 107 passed), the space
   steps at density `1` and `1.25`, the display sizes at both densities (unchanged by the
   factor), and the stripe percentage beside hover and active in each mode.
   `tests/src/styles/mixins.test.ts` reads, for every name, each fixture class's media
   condition through `collectMediaConditions` and compares `parseMediaWidth` of it to the
   resolved `--vn-breakpoint-<name>` token read from the built cascade (`xs`: no condition),
   and drives `visitBreakpoint` over `BREAKPOINT_CASES` asserting the `up` content applies at
   and above each boundary and not below, and the `down` content below and not at. The 1 px
   source plant (`576px` to `577px`) reddened the viewport proof and the retained-length proof
   (report-only: 2 failed then 109 passed) because those expectations sit outside the Sass
   source. `tests/setupStyles.test.ts` compiles the partials with `compileString` to prove
   `breakpoint()` refuses an unknown name at compile time and the `xs` emission shapes in both
   directions, red on the guard's removal (report-only: 1 failed then 126 passed). Every plant
   is gone from the tree (`vn-space-48`, `577px`, the `console.log`).

5. The readers sit where CL1's ruling puts them and the helpers are whole.
   `collectMediaConditions(rules, selector)` in `tests/setupBrowser.ts` reads live `CSSMediaRule`
   objects, is exported, named `{verb}{Noun}`, cased in `tests/setupBrowser.test.ts`, and listed
   in that module's export inventory; `parseMediaWidth(condition)` in `tests/setupStyles.ts`
   reads CSS text (the range syntax and the `min-width` and `max-width` spellings), is exported,
   cased in `tests/setupStyles.test.ts`, and listed in that inventory; the `visitBreakpoint` and
   `holdOraclePointer` bodies are unchanged; the fixture `tests/src/styles/fixtures/mixins.scss`
   carries one class per name under each mixin, generated by `@each` over `breakpoints()`. No
   class was added, so the class-placement convention has no subject in this unit.

6. The guide carries the parity minimum. One row per new token in § Tokens' reference map with
   its value and the source `bootstrap` (`--vn-display-1` to `-6`, `--vn-space-12` and `-24`,
   `--vn-state-stripe`), each value true of the cascade; the `breakpoint-down` row is deleted
   from `### Deferred names`; the remaining guide edits are inside § Tokens (the state tokens
   named as shared in the button-states intro, and one breakpoint paragraph naming the pair,
   the one source, the `xs` behaviour, and the build refusal) and are judged only on their
   facts being true of the code. `test:guides` exits 0 (verifier).

7. `[mechanical]` Scope, law, and gates. `tmp/audit/cl2-status.txt` lists exactly
   `guides/veneer.md`, `src/core/constants.ts`, `src/styles/_mixins.scss`,
   `src/styles/_tokens.scss`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`,
   `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/fixtures/mixins.scss`,
   `tests/src/styles/mixins.test.ts`, and `tests/src/styles/tokens.test.ts`; `src/core/types.ts`
   and `tests/src/core/index.test.ts` are owned and unmodified; `src/styles/elements/**`,
   `src/styles/components/**`, `src/browser/**`, `app/**`, `tests/app/**`,
   `tests/setupConformance*.ts`, `tests/conformance.test.ts`, `package.json`, `configs/**`, and
   the vendored files are absent from the diff. The diff's added lines contain no `any`, no
   type assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no skipped case, and no case named
   for a control; the export inventories of the browser and styles setup modules equal their
   live export sets. The unit's one recorded deviation (a compile-time refusal case added to
   `tests/setupStyles.test.ts` beyond the "CSS-text helper" grant) stays inside an owned file
   and closes acceptance criterion 2, so it is a settled ancillary choice, not an unowned change.
   Every gate exits 0 on managed Chromium and on Edge, and `scaffold audit` reports only the
   pre-existing `setupListeners` note and the three registry majors (verifier).
