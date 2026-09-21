# CL3 audit — claims (round 1)

Subject: unit CL3 (the reset partial and the text Reboot tags), written by `sol` on Astra in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base `9f5ffda` (the CL2
landing), under the effective brief
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-brief-3.md` (a delta
over `units/cl3-brief-2.md`, in force beneath it; brief 1 is superseded per
`units/cl3-scope-read-report.md`; `units/cl3-report.md` is the deviation stop brief 3 ruled).
Evidence: the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-diff.patch.txt`
(tracked changes plus a no-index rendering of every new file) and status
`tmp/audit/cl3-status.txt`, the live tree, the built `dist/src/styles/index.css`, the record
`.orkestrel/veneer/research/calibration-content.md`, and the unit's report
`.orkestrel/veneer/units/cl3-report-2.md` (a report-only claim, such as a red-then-green run or a
probe reading, is recorded as report-only). Audits cover implementation only: correctness, rule
compliance, test sufficiency, scope honesty. Rule on every claim with CONFIRMED, REFUTED, or
UNDECIDABLE and the deciding evidence; add an implementation-defect finding only after the last
claim, with a site and a one-line failure scenario, saying whether it forces another round.

Orchestrator rulings the claims rest on (recorded in `plan.md`): the three calibration limits
the report names are carried, not closed here: the link colours' equality with the record is
CL6's (the links unit retunes the link map); the muted text of `address` and `dd` and the raised
surface of `pre`, `samp`, and `var` go to a token unit (CL3b: a `--vn-text-muted` token, the
`--vn-surface-raised` retune, and those partials' rebinding) that runs after this landing.

1. The reset partial. `src/styles/_reset.scss` declares, inside `@layer reset`, the universal
   `box-sizing: border-box` with `::before` and `::after`, `[hidden] { display: none !important }`,
   and `scroll-behavior: smooth` on `:root` under `prefers-reduced-motion: no-preference`;
   `src/styles/index.scss` loads it after `theme`; the layer order line in `_tokens.scss` is
   unchanged and the built cascade's layer order reads `theme, reset, base, elements, components,
   utilities`. `tests/src/styles/reset.test.ts` reads `smooth` under no-preference emulation and
   `auto` under reduce, and reads `[hidden]` hiding an element a component-layer rule, an
   unlayered rule, and an important utility-layer rule would paint, restoring the display when
   the attribute is removed (red on the `content-box`, visible-hidden, and `auto` plants:
   report-only).

2. One bare tag per partial, admitted by the guards. The partials `_heading.scss` (h1 to h6),
   `_p`, `_hr`, `_a` (with `a:hover`, `a:not([href]):not([class])`, and its hover twin), `_ul`,
   `_ol`, `_dl` (with `dt` and `dd` by the mandated pair), `_blockquote`, `_address`, `_abbr`
   (with `abbr[title]`), `_strong`, `_small`, `_mark`, `_sub`, `_sup`, `_code`, `_pre`, `_kbd`,
   `_samp`, `_var` exist under `src/styles/elements/`, each selects one bare tag in the
   `elements` layer with no tag combination, and each loads from `index.scss`; `_body.scss`
   grew and `_html.scss` is unchanged; `tests/src/styles/index.test.ts` is untouched (the
   status) and the elements-layer and physical-axis guards pass over the new partials
   (`test:src:styles` green: verifier). No `b` partial exists (CL4 carries it, recorded).

3. Values bound to the record through the ramps where a step matches, otherwise the record's
   relative values, each proof's case table naming its source. Headings read 36, 30, 24, 20,
   18, 16 px through `--vn-size-8` to `-3`, weight through `--vn-weight-heading` (600), line
   height through `--vn-line-heading` (1.2), zero margins (the fixed heading scale is a
   recorded departure); `ul` and `ol` read 32 px inline-start padding as twice `--vn-space-8`;
   `dl` is a 1:2 grid with gaps from `--vn-space-4` and `-8`; `blockquote` reads its end margin
   and inline-start padding from `--vn-space-8` and a 4 px current-colour border from
   `--vn-space-2`; `hr` reads `--vn-border-width` and opacity 0.2; `small` 87.5 %; `sub` and
   `sup` Bootstrap's retained geometry with logical offsets; `mark` the native paint with the
   record's inline padding; the code family (`code`, `kbd`, `pre`, `samp`, `var`) the record's
   relative sizes and paddings with `ui-monospace` prepended to the mono token (no size or
   space step equals 12.6, 12.25, or 13.3 px, or 1.575, 3.15, 0.765625, 4.59375, or 3.325 px:
   report-only readings, checkable against `_tokens.scss`), `kbd` a 1 px border at 22 % of the
   code text, `pre` the block and overflow retention. Every mirrored proof under
   `tests/src/styles/elements/` reads the resolved values on both receipts (report-only
   counts: 47 failed then 49 passed on the white-text plant, on each browser) and no proof
   asserts a value the report lists as a limit.

4. The code family tokens under brief 3's ruling. `'code'` reads `var(--vn-text-body-base)` in
   `$light` and `$dark` (`src/styles/_tokens.scss`), the `--vn-text-code` closure line is
   unchanged, `--vn-surface-code: color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)`
   sits beside `--vn-surface-highlight` in `theme-tokens` (`src/styles/_mixins.scss`), the
   registry carries `surface.code` (`src/core/constants.ts`) and no other new leaf,
   `--bs-code-color` still aliases `--vn-text-code`, and `tests/src/styles/tokens.test.ts`
   proves `--vn-text-code` equal to the body text and `--vn-surface-code` painted as the
   record's surface in both modes (readings `oklch(0.208 0.042 265.755)` and
   `oklch(0.929 0.013 255.508)`; `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` and
   `oklab(0.929 -0.00325318 -0.0125864 / 0.12)`, report-only on Edge), red on the pink plant and
   the 24 % plant (report-only). The registry's bidirectional equality with the cascade holds.

5. The anchor and the body. `_a.scss` reads `color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))`,
   the hover colour through the hover RGB token, and the decoration through the link
   decoration token; the no-`href` classless anchor inherits the text colour and drops the
   decoration at rest and on hover (`tests/src/styles/elements/a.test.ts`, red on the
   white-and-underline plant: report-only). `_body.scss` reads
   `text-align: var(--bs-body-text-align, start)`, margin zero, the text-size adjustment, the
   transparent tap highlight, and the `--bs-body-*` variables, and `body.test.ts` overrides
   every compatible variable on an island and reads the paragraph consumer while the outer
   body is unchanged. Equality of the link colours with the record is not asserted (CL6's).

6. The limits are recorded, not concealed. `address` and `dd` inherit the text colour (the
   record's muted colour has no token); `pre`, `samp`, and `var` keep a transparent background
   (the record's raised surface was not granted); the link colours bind the tokens rather than
   the record: each is named in the report's limits table with the record row and the reason,
   no proof asserts a fabricated match, and no partial hard-codes a record colour in place of a
   token.

7. `ContentSection`. `app/browser/sections/ContentSection.ts` (a family folder, lowercase
   plural, beside `ButtonSection`) implements `SectionInterface` with `ButtonSection`'s
   constructor and `destroy` shape, renders the frozen `CONTENT_SPECIMENS` table
   (`app/browser/constants.ts`) typed by `ContentSpecimen` (`app/browser/types.ts`) in table
   order, and is mounted by `Showcase.ts` after `ButtonSection` and destroyed before the nodes
   leave `main`; `app/browser/index.ts` re-exports it directly; the export-set assertion in
   `tests/app/browser/index.test.ts` and the shell's region inventory in
   `tests/app/browser/Showcase.test.ts` grew; `tests/app/browser/sections/ContentSection.test.ts`
   proves order, markup, release, neighbours preserved, and repeated destruction (red on the
   reversed-order and attribute-write plants: report-only).

8. The guide's parity minimum. `guides/veneer.md` gains one files-table row per new partial,
   the departure rows under `### Departures from Bootstrap` (the fixed heading scale, the
   `[hidden]` layer placement, the `--bs-body-text-align` fallback, the code colour), the
   token rows (`--vn-text-code`'s value, `--vn-surface-code`), and the Content region sentence
   under § Showcase; § Compatibility is unchanged and `listed` in
   `tests/conformance.test.ts:55` reads `['btn']`; `test:guides` exits 0 (verifier). Each row
   is judged on its facts alone.

9. `[mechanical]` Scope, law, and gates. `tmp/audit/cl3-status.txt` lists the fourteen
   modified paths (`app/browser/Showcase.ts`, `constants.ts`, `index.ts`, `types.ts`,
   `guides/veneer.md`, `src/core/constants.ts`, `src/styles/_mixins.scss`, `_tokens.scss`,
   `elements/_body.scss`, `index.scss`, `tests/app/browser/Showcase.test.ts`, `index.test.ts`,
   `tests/src/styles/elements/body.test.ts`, `tokens.test.ts`) and the untracked
   `app/browser/sections/ContentSection.ts`, `src/styles/_reset.scss`, the twenty text partials
   under `src/styles/elements/`, `tests/app/browser/sections/ContentSection.test.ts`,
   `tests/src/styles/reset.test.ts`, and one proof per partial under
   `tests/src/styles/elements/`, and nothing else; `tests/src/styles/index.test.ts`,
   `tests/setup*.ts` and their proofs, `tests/conformance.test.ts`, `src/styles/components/**`,
   `_theme.scss`, `src/core/types.ts`, `src/browser/**`, `tests/fixtures/**`, `package.json`,
   `configs/**`, and the vendored files are absent from the diff. The added lines carry no
   `any`, no type assertion outside `as const`, no non-null assertion, no suppression comment,
   no `public`/`private`/`protected`, no parameter property, no default export, no skipped
   case, and no case named for a control; no plant residue remains (white text, `content-box`,
   pink code, 24 % alpha, reversed order). Every gate in brief 2's item 6 exits 0 on managed
   Chromium and Edge, and `scaffold audit` reports only the pre-existing `setupListeners` note
   and the three registry majors (verifier).
