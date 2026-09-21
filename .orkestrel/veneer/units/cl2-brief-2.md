# Unit CL2 — the Content/layout tokens and the breakpoint mixins (brief 2)

Supersedes `cl2-brief.md`, which is left unedited. What changed and why: the scope read
(`cl2-scope-read-brief.md`, 2026-09-21) found that brief 1's Context named
`breakpoint-up` and `breakpoint-down` as mixins to find in `src/styles/_mixins.scss`, and neither
exists: the file has no breakpoint mixin and no breakpoint map, and nothing under `src/styles`
outside `_tokens.scss` mentions a breakpoint. This brief makes both mixins authored work of this
unit, names the one-source requirement their values carry, and grants the browser setup module
for a media-condition reader, because the readers that touch a live stylesheet live there.

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `00a5bdc` (the CL1 landing), tracked tree
clean. Perform the assignment directly and spawn nothing.

## Objective

Every `--vn-*` token the Content/layout family consumes lands once, in the registry and the
cascade, with its proofs and its guide rows, and the breakpoint mixins exist over the same
values as the published breakpoint tokens, proven from the compiled media conditions and from
the viewport, so every later unit only consumes.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md`
(`_mixins.scss` holds `@function` values and `@mixin` emitters and emits no top-level CSS;
`_tokens.scss` holds the `:root` tokens and the layer order), `tests.md`, `typescript.md`,
`names.md`, `documentation.md`. The design record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/content-layout-design-verdict.md`
(the token rulings: `--vn-space-12` and `--vn-space-24` on the ramp's index law, `--vn-display-1`
to `-6`, `--vn-state-stripe`; no token for the link opacities or `--bs-body-text-align`; the
breakpoint proof at both depths: the media conditions against the tokens, and the viewport
below, at, and above each boundary), the planner's § 3 and CL2 criteria
(`units/content-layout-design-planner-report.md`: "the Sass map that authors the media
conditions and the published tokens are two sources for one value; the proof reads each
condition out of the compiled output and compares it against the resolved token"), and the
analyst's § Token proposal (`units/content-layout-design-analyst-report.md`).

Readings taken on the live tree (verified 2026-09-21 by the scope read and by the Orchestrator;
a line that has moved is a re-read, never a stop):

- `src/styles/_tokens.scss`: `@use 'mixins' as *` at line 1; the layer order `theme, reset,
  base, elements, components, utilities` at line 3; Sass maps `$light` (line 16), `$dark`
  (line 57), `$assets` (line 113); `--vn-size-1` to `-8` (0.75rem to 2.25rem, lines 208-215);
  `--vn-space-1` to `-8` as `calc(<index> * 0.125rem * var(--vn-factor-density))`
  (lines 222-229); `--vn-breakpoint-xs` to `-xxl` (0, 576px, 768px, 992px, 1200px, 1400px,
  lines 275-280) with `--bs-breakpoint-*` aliases (lines 367-372).
- `src/styles/_mixins.scss` (162 lines, `@use 'sass:map'` at line 1): the mixins are
  `reduced-motion` (3), `transition` (9), `forced-colors` (16), `focus-ring` (22), `role-each`
  (53), and `theme-tokens` (82; the state mixer and the hover and active percentages at
  83-85). **No breakpoint mixin and no breakpoint map exist.** `grep -n breakpoint` over
  `src/styles` matches only `_tokens.scss`. The guide's `### Deferred names` table
  (`guides/veneer.md:652`, row at 660) records the `breakpoint-down` mixin as waiting on the
  first responsive partial; this unit is that landing.
- Because `_tokens.scss` loads `mixins`, a map declared in `_tokens.scss` is not readable from
  `_mixins.scss`. The values must still have one Sass source: the `--vn-breakpoint-*`
  declarations and the mixins' conditions both derive from it, so the equality proof guards
  the emission rather than a hand-copied pair. Where that source sits is yours to settle within
  the styles rule's table (a Sass value the mixins own, emitted as tokens by `_tokens.scss`
  through `@each`, satisfies it; a map passed as an argument satisfies it too); record the
  choice in the report.
- Condition shape: the number in each emitted condition equals the token's value exactly, so
  use the range syntax (`(width >= 576px)`, `(width < 576px)`) rather than Bootstrap's
  `max-width: 575.98px`. `breakpoint-up(xs)` emits its content with no media wrapper
  (Bootstrap's shape for the zero breakpoint); what `breakpoint-down(xs)` does (emit nothing, or
  refuse at compile time) is yours to settle and prove. An unknown name is refused at compile
  time with `@error`, so a typo fails the build.
- `src/core/types.ts:13` (`TokenMap`) and `src/core/constants.ts:16-270` (`TOKEN_NAMES`, a
  grouped `Object.freeze` tree); `tests/src/core/index.test.ts` asserts the export set (lines
  19, 29), freeze (31-36), and path law (37-45); `tests/src/styles/tokens.test.ts:41` asserts
  bidirectional equality between the cascade's `--vn-` partition and the registry's leaves
  (49-51 for the RTL cascade), so every new name moves both.
- `tests/src/styles/mixins.test.ts` runs in the browser (`src:styles` project, which loads
  `tests/setupBrowser.ts`), imports `./fixtures/mixins.scss` (which loads
  `../../../../src/styles/mixins` as `*` and holds the `.vn-fixture-*` classes), and reads
  through `specimens.mount` and the installed Test readers (`readToken`, `readStyle`,
  `findRule`, `readRules`).
- Readers: `readCascadeSheet`, `collectNestedRules`, `collectScopeProperties`, and
  `collectLayer` live in `tests/setupBrowser.ts` (the browser module, static `vitest/browser`
  import), as do `visitBreakpoint` (lines 38-46; read its signature there) and the oracle
  helpers. `tests/setupStyles.ts` is host-independent (it imports `@orkestrel/contract`,
  `postcss`, and `./setup.js`) and holds `BREAKPOINT_CASES` (lines 6-13: 375, 576, 768, 992,
  1200, 1400 with the readings below, at, and above each boundary). CL1's ruling binds: a
  helper that reads a live document or stylesheet lives in the browser module with its case
  in `tests/setupBrowser.test.ts`; a helper over CSS text lives in the styles module.
- `guides/veneer.md` § Tokens: `### Reference map` at line 318 with columns
  `Token | Value | Source | Alias` (lines 344-349); sources are `elements`, `bootstrap`,
  `derived`. `test:guides` and the policy sweep read the guide. No test reads the
  `### Deferred names` table (`readDeferrals` in `tests/setupConformance.ts` reads § Compatibility's
  deferred selectors, a different table).
- Host: Windows, Git Bash; `npm run <name>`; managed Chromium by default, Edge through
  `PLAYWRIGHT_CHANNEL=msedge`; `vite.config.ts` and `tests/{config.test,policy.test,setupPolicy}.ts`
  are vendored and never edited.

Standing clauses: audits cover implementation only (no wording, comment, or guide-prose change
beyond what a code change requires; a token row in the guide is the parity minimum, value and
source); an enumerating assertion in an owned file that your change grows (the registry's
export set, `tokens.test.ts`, the export inventories, the guide's token rows) is yours to
update in the same step, recorded, never a stop; the scoped formatter and a lint diagnostic's
canonical rewrite are granted. The reviewer's CL1 bounds on `visitBreakpoint`'s bare `finally`
and the hold's uncased refusals belong to CL11: do not touch either helper.

## Unknowns

Whether the loaded fixture's `CSSMediaRule` conditions can be read with the readers already in
`tests/setupBrowser.ts` or need one more reader there; decide from the readers and record.
Whether a media rule's `conditionText` serializes the range syntax as written or normalized
(`(min-width: 576px)`); read what the browser returns and compare on the value, recording the
serialization on both engines.

## Scope

Owned: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/types.ts`,
`src/core/constants.ts`, `tests/src/core/index.test.ts` (only its enumerating assertion),
`tests/src/styles/tokens.test.ts`, `tests/src/styles/mixins.test.ts`,
`tests/src/styles/fixtures/mixins.scss`, `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`
(only for a media-condition reader, its case, and its export inventory), `tests/setupStyles.ts`
and `tests/setupStyles.test.ts` (only for a CSS-text helper and its export inventory),
`guides/veneer.md` § Tokens (the new token rows and the deletion of the `breakpoint-down`
deferred-name row), `cl2-report.md`. Off-limits: everything else,
`src/styles/elements/**` and `components/**` included (no consumer lands here), and the
`visitBreakpoint` and `holdOraclePointer` bodies.

## Execution

1. Tokens: `--vn-space-12: calc(1.5rem * var(--vn-factor-density))` and
   `--vn-space-24: calc(3rem * var(--vn-factor-density))` continuing the ramp under its index law;
   `--vn-display-1: 5rem` through `--vn-display-6: 2.5rem` (Bootstrap's `$display-font-sizes`,
   source `bootstrap`); `--vn-state-stripe` beside the hover and active percentages in the theme
   closure, Bootstrap's `0.05` as the percentage until CL0's Elements reading replaces it (source
   `bootstrap`, recorded). Registry leaves in `src/core/types.ts` and `constants.ts`.
2. Mixins: `breakpoint-up($name)` and `breakpoint-down($name)` in `src/styles/_mixins.scss`,
   each taking `@content`, over the one Sass source of the six values from which
   `_tokens.scss` also emits `--vn-breakpoint-*`, with the condition shape and the `xs` and
   unknown-name behaviour named in Context.
3. Proofs: `tokens.test.ts` bidirectional equality red on a planted unmapped name, green after;
   the new values resolve at density `1` and rescale at `1.25` (the space steps) and resolve
   exactly (the display sizes, the stripe percentage). The breakpoint proof in `mixins.test.ts`
   from fixture classes under each mixin for every name: the loaded fixture's media conditions
   carry values equal to the resolved `--vn-breakpoint-<name>` tokens read from the built
   cascade, and, driven through `visitBreakpoint` over `BREAKPOINT_CASES`, the `up` content
   applies at and above each boundary and not below, the `down` content below and not at;
   red on a planted disagreement in the Sass source (one value moved by 1px) and green
   restored, with the plant's removal recorded.
4. Guide: one row per new token in § Tokens' reference map with value and source; delete the
   `breakpoint-down` row from `### Deferred names`.
5. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm run test:src:core`, `npm run test:src:styles`, `npm run test:setup`,
   `npm run test:setup:browser`, `npm run test:conformance`, `npm run test:guides`,
   `npm run test:policy`, `npm test`, then `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`.

## Output

Write `cl2-report.md` in the Veneer checkout and return it: per item the change as
landed with its site, the one-source choice and the `down(xs)` choice, the red-then-green pairs
(command and counts), the resolved values at both densities, the condition serialization read on
both engines, each gate's exit code and final lines on both engines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`, every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: where the Sass source and
the media-condition reader sit within the rules named; `breakpoint-down(xs)`; the guide rows'
wording within the table's shape. Stop on: a gate red after your own fix inside owned files; a
registry shape that cannot carry a `display` group without a types change the rules forbid; a
browser that will not apply the range syntax (record the reading and stop).

## Acceptance criteria

1. The registry and the cascade agree on every new name (bidirectional equality green, red on
   the plant); the values resolve as recorded at both densities.
2. `breakpoint-up` and `breakpoint-down` exist over one Sass source shared with the
   `--vn-breakpoint-*` declarations, refuse an unknown name at compile time, and emit conditions
   whose values equal the resolved tokens, proven from the loaded fixture's media rules and from
   the viewport at each boundary, red on the planted source value.
3. `test:guides` green with the new rows and the deleted deferred-name row.
4. Every gate in item 5 exits 0 on managed Chromium and Edge.
5. The status shows only the owned files and the report.
