# U7a audit claims

Subject: unit U7a in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written by
`sol` on Astra under `units/u7a-brief-6.md` (the effective brief, carrying briefs 5 to 1;
retained under `.orkestrel/veneer/units/`); the implementation report is `units/u7a-report-5.md`
and the matrix-move report `units/u7a-report-6.md`. Evidence rendered by the Orchestrator:
`units/u7a-diff.patch.txt` (`git diff 2bc922d -- . ':(exclude)tmp'` plus `git diff --no-index`
renderings of the untracked files) and `tmp/audit/u7a-status.txt` (`git status --porcelain
--untracked-files=all`). Rule on the diff and the live files, never on the reports' word alone. A
test is named for what it proves, never for a control that specified it. Claims marked
`[mechanical]` are the checker's; every other lane rules on every claim.

Every lane rules with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (file:line or
exact text). The user's ruling of 2026-09-20 fixes this audit's scope: implementation only —
correctness, rule compliance, test sufficiency, scope honesty. Do not report wording, comment,
doc-block, or guide-prose findings at all; a guide is judged by parity passing and by the rows the
presence check reads, nothing else. An extra finding is an implementation defect with a site and
a one-line failure scenario, numbered from 16; a finding that forces a fix round says so and names
the claim it breaks.

1. `src/styles/elements/_button.scss` opens `@layer elements`, holds single-tag selectors only
   (`button` and its pseudo-classes), and gives the bare button the calibration's compact
   neutral default: 6px block and 12px inline padding through the space tokens, `border: 0`, a
   6px radius through the radius token, hover and active tints as `color-mix()` over
   `--vn-state-mixer` at `--vn-state-hover` and `--vn-state-active`, the focus ring through the
   `focus-ring` mixin, the disabled opacity, and the feedback transition with its reduced-motion
   pair through the `transition` mixin.
2. `src/styles/components/_button.scss` opens `@layer components` and declares on `.btn` every
   `--bs-btn-*` custom property the official `btn` inventory names, each bound to a `--vn-*`
   token or a `color-mix()` over one, never a literal colour; the filled and outline variants
   per role (the aliased roles and tertiary), `.btn-link`, `.btn-sm`, `.btn-lg` with the
   `.btn-group-sm > .btn` and `.btn-group-lg > .btn` comma mates, `.btn-check` with its label
   states, `.active`, `.show`, `.disabled`, `:disabled`, `fieldset:disabled .btn`, and anchor
   hosts with `aria-disabled`; forced-colours fallbacks through the `forced-colors` mixin with
   the system colours held as tokens.
3. `[mechanical]` The partition is exhaustive: every official `btn` selector and custom property
   in `tests/fixtures/oracle/inventory.json` is either present literally in
   `dist/src/styles/index.css` (modulo the combinator spacing `normalizeComplexSelector`
   collapses) or a row under `guides/veneer.md` § Styles `### Deferred selectors` with a
   non-empty Owner and Reason; no deferred name is present; `--bs-btn-close-filter` is present
   (U3's retention) and in no deferral row; the `selector` and `variable` rows in
   § Compatibility read `shipped`, and `tests/conformance.test.ts` lists `btn`.
4. The tokens: `TOKEN_NAMES` in `src/core/constants.ts` gains the `state` group (`mixer`,
   `hover`, `active`) and the `button` group (`opacity`, `shadow`, `transparent`, `face`,
   `text`, `highlight`, `disabled`); `_tokens.scss` declares each at `:root` and `_theme.scss`
   closes the mixer and percentages per explicit mode; the parity case in
   `tests/src/styles/tokens.test.ts` passes both ways; `src/core/types.ts` needed no change.
5. The mixer's end reproduces the run-6 strings: light `color(srgb 0.00742457 0.0232852
   0.0925134)` at 12% and 22% over transparent reproduces the bare hover and active readings,
   dark `var(--vn-palette-white-base)` reproduces `color(srgb 1 1 1 / 0.12)` and `/ 0.22`; the
   filled-primary hover and active strings per mode are reproduced by the role fill mixed with
   the mixer; every comparison in the proofs goes through the installed `matchesColor` over
   `readStyle` strings within its tolerance, and no string needed a literal colour or a
   departure row beyond tertiary.
6. `focus-ring` in `_mixins.scss` is declaration-only (no rule outside a mixin), emits the 3px
   spread `box-shadow` in the focus colour with `outline` suppressed, and is proven mounted in
   `tests/src/styles/mixins.test.ts` on a focused element with `:focus-visible` asserted; the
   `theme-tokens` mixin is unchanged.
7. `filterAsymmetricDeclarations` in `tests/setupStyles.ts` returns a rule's direction-sensitive
   declarations after dropping a physical longhand whose opposite-side twin appears in the same
   rule with an equal value (through `normalizeValueToken`), keeps a lone longhand, an unequal
   pair, and a longhand with no twin, and delegates the shorthand and keyword families to
   `matchesDirectionSensitive`; the guard case in `tests/src/styles/index.test.ts` reads each
   `CSSStyleRule` through it; both cased, and the guard ran red on the Elements partial before
   the helper and green after.
8. `[mechanical]` No partial contains `:is(`, `:where(`, a physical inline-axis property
   (`margin-left`, `margin-right`, `padding-left`, `padding-right`, `left`, `right`,
   `border-left*`, `border-right*`, `text-align: left|right`), or a direction-specific rule; the
   guard case passes over the shipped cascade.
9. The proofs in `tests/src/styles/elements/button.test.ts` and
   `tests/src/styles/components/button.test.ts` read every state the calibration names (rest,
   hover, active, focus-visible ring, disabled; filled and outline per role and mode; sizes;
   link; the checked label; the disabled hosts; reduced motion) on managed Chromium and Edge,
   through the installed helpers (`hoverAccessible`, `holdAccessible`, `releasePointer`,
   `stageMedia`, `readStyle`, `matchesColor`) and never through a mock or a fake clock; every
   case matrix they read is an exported frozen table in `tests/setupStyles.ts` (brief 6), and
   test registration stays in the test files.
10. `[mechanical]` The four controls (`PLANT-SELECTOR`, `PLANT-PHYSICAL`, `PLANT-ASYMMETRIC`,
    `PLANT-TOKEN`) reddened with the messages the report records and were restored
    byte-for-byte (the report's digest); no control residue is in the diff; no case is named
    for a control.
11. `[mechanical]` `guides/veneer.md` passes parity (`npm run test:guides` exit 0) and carries
    the rows the readers consume: the `selector` and `variable` rows `shipped`, the
    `### Deferred selectors` partition with an Owner and Reason per row, and a `--bs-btn-*`
    binding row for every property the partial declares (the checker's row-versus-partial
    probe). Nothing else about the guide's prose is in this audit's scope.
12. `[mechanical]` Scope: `git status --porcelain --untracked-files=all` shows only files in the
    brief-6 owned set (the two partials, `index.scss`, `_tokens.scss`, `_theme.scss`,
    `_mixins.scss`, `src/core/constants.ts`, the two Button test files, `mixins.test.ts`,
    `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/index.test.ts`,
    `tests/conformance.test.ts` (the `listed` array only), `guides/veneer.md`); `src/browser/**`,
    `app/**`, `tests/setupConformance*.ts`, `tests/fixtures/**`, `package.json`, and every
    `configs/**` file are absent; the diff adds no `any`, no assertion outside `as const`, no
    non-null assertion, no suppression, no skip or expected-failure declaration; every
    module-scope function it adds is exported and tested.
13. `[mechanical]` The enumerating assertions the change grows are updated and named in the
    reports: the export-inventory case in `tests/setupStyles.test.ts` (the helper and the
    tables), the shipped-components list in `tests/conformance.test.ts`; no other existing case
    was deleted or weakened (no removed `it(` without a rewritten successor).
14. The RTL ruling holds: no direction-specific rule, no RTL artifact authored, the existing
    parity case reads the emitted twin unchanged; no time was spent on RTL variation.
15. The gates the reports record exit 0 (`format:check`, `lint:check`, `check`,
    `test:src:core`, `test:src:styles` on Chromium and Edge, `test:conformance`,
    `test:guides`, `test:setup` over `setupStyles.test.ts`); the verifier lane re-runs the whole
    chain on the host and its reading rules this claim.
