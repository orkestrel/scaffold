# Unit CL3b — the muted text and raised surface tokens

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9bb306e` (the CL3 landing), tracked tree
clean. Perform the assignment directly and spawn nothing.

## Objective

The Content calibration values CL3 could not bind land as tokens, and the members that wait on
them read those tokens, so the family's remaining colour departures are closed or recorded on a
measurement rather than on an absent token. CL3's audit carried each item here by name
(`.orkestrel/veneer/cl3-audit-verdict.md`, rounds 1 to 3).

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md`
(`_tokens.scss` is the token source of truth and the only file a literal colour may appear in;
`_mixins.scss` holds `@function` values and `@mixin` emitters and emits no top-level CSS;
`_theme.scss` only retunes tokens under theme selectors), `tests.md` (data tables and case
matrices live in a setup file), `typescript.md`, `names.md`, `documentation.md`. The design
record under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`:
`content-layout-design-verdict.md` (adapt Elements' values, never its selectors),
`research/calibration-content.md` (the readings this unit binds), and
`cl3-audit-verdict.md` (the findings it carries, named per item).

Readings taken on the live tree at `9bb306e` (verified 2026-09-21; a line that has moved is a
re-read, never a stop):

- `src/styles/_tokens.scss`: `$light` opens at line 17, `$dark` at 59, `$assets` at 116. The
  `raised` key reads `oklch(0.984 0.003 247.858)` in `$light` (line 36) and
  `oklch(0.235 0.013 256)` in `$dark` (line 78). `--vn-font-mono` (about line 208) is
  `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`, with no
  leading `ui-monospace`. `--vn-line-body` is `1.5` and `--vn-line-heading` `1.2` (about lines
  227-228).
- `src/styles/_mixins.scss`: the theme closure emits `--vn-text-secondary` and
  `--vn-text-tertiary` as mixes of the body text (about lines 173-174), `--vn-text-code` and
  `--vn-text-highlight` beside them (175-176), `--vn-surface-raised` from the map (about line
  179), and `--vn-surface-code` as a literal `color-mix(in oklab, var(--vn-text-body-base) 12%,
  transparent)` (about line 185) while every sibling surface reads `map.get($values, …)`.
- `src/core/constants.ts`: the `text` group carries flat leaves `secondary`, `tertiary`,
  `heading`, `code`, `highlight` (about lines 128-132); the `surface` group carries `raised`,
  `highlight`, `code`, `gradient` beside its nested pairs (about lines 134-151).
- The partials that wait on a token: `src/styles/elements/_address.scss` (no colour; the record
  reads muted), `_dl.scss` (its `dd` likewise), `_pre.scss` (`line-height: 1.6` untokenized at
  about line 9; `border-radius: var(--vn-radius-base)` at about 11; transparent background),
  `_samp.scss` (transparent background), `_var.scss` (the literal stack
  `ui-monospace, SFMono-Regular, Menlo, monospace`, which `--vn-font-mono` cannot express).
- The case tables live in `tests/setupStyles.ts` as frozen `TEXT_<TAG>_CASES` exports listed in
  the inventory assertion of `tests/setupStyles.test.ts`; the proofs under
  `tests/src/styles/elements/` import them and register with `it.each`.

**The hazard this unit must measure first.** `$dark`'s `anchor` key reads
`var(--vn-surface-raised)` (`_tokens.scss:70`), and `theme-tokens` passes that anchor to
`role-each` (`_mixins.scss:127` and the call at about 163), which mixes every role's tiers
against it. Retuning the dark `raised` value therefore moves every dark role tier, which U7's
Button calibration and its accepted capture portfolio rest on. `$light`'s anchor reads the body
surface and is unaffected.

## Unknowns

Whether the record's raised values can land without moving any dark role tier. Measure it before
editing anything else (item 1). The answer decides item 3, and either outcome is a result: this
unit does not move Button's calibrated colours.

## Scope

Owned: `src/styles/_tokens.scss` (the `$light` and `$dark` map keys this brief names),
`src/styles/_mixins.scss` (the closure lines this brief names), `src/core/constants.ts` (the new
registry leaves), `tests/src/styles/tokens.test.ts` (the value proofs),
`src/styles/elements/_address.scss`, `_dl.scss`, `_pre.scss`, `_samp.scss`, `_var.scss` (the
rebinding), `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (only the case-table rows this
brief names and their inventory), the proofs of the rebound partials under
`tests/src/styles/elements/`, `guides/veneer.md` § Tokens (the new rows and any departure row an
item closes or opens), `cl3b-report.md`. Off-limits: everything else, including
`_theme.scss`, `src/styles/components/**`, `src/browser/**`, `app/**`, `tests/setupBrowser.ts`,
`tests/setupConformance*.ts`, `tests/conformance.test.ts`, `tests/fixtures/**`, `package.json`,
`configs/**`, and the vendored files.

## Execution

1. **Measure the anchor hazard first.** Record every dark role tier's resolved value from the
   built cascade (`npm run build:src:styles` then read `dist/src/styles/index.css`, or a browser
   reading through the styles project), then apply the record's raised values
   (light `oklch(0.968 0.007 247.896)`, dark `oklch(0.265 0.014 256)`) and read them again.
   Report both readings. If any dark role tier moves, keep the roles fixed: pin `$dark`'s
   `anchor` to the literal the raised key holds today (`oklch(0.235 0.013 256)`) so the anchor
   is unchanged while the raised surface moves, and record that the anchor and the raised
   surface are now separate values with the reason. If nothing moves, say so with the readings.
2. **`--vn-text-muted`**: a `muted` key in `$light` (`oklch(0.446 0.043 257.281)`) and `$dark`
   (`oklch(0.704 0.04 256.788)`) from the record, emitted in the theme closure beside
   `--vn-text-secondary`, with the registry leaf `text.muted`, a value proof in
   `tokens.test.ts` reading both modes on both receipts, and a guide row (value and source
   `elements`).
3. **`--vn-surface-raised`** carries the record's values after item 1's ruling, with its proof
   reading both modes; **`--vn-surface-code`** moves from the literal in the emitter into a
   `surface-code` key in both maps, the emitter reading `map.get($values, 'surface-code')`,
   with its existing readings unchanged (the value is the same expression).
4. **The font and rhythm tokens the partials need**: a token for `_var.scss`'s shorter monospace
   stack (name it under `.claude/rules/names.md`; its value is the record's
   `ui-monospace, SFMono-Regular, Menlo, monospace`) and one for `_pre.scss`'s `1.6` line height
   beside `--vn-line-body` and `--vn-line-heading`, each with its registry leaf, proof row, and
   guide row.
5. **Rebind the members**: `_address.scss` and `_dl.scss`'s `dd` read `--vn-text-muted`;
   `_pre.scss`, `_samp.scss`, and `_var.scss` read `--vn-surface-raised` for their background;
   `_var.scss` reads the new font token; `_pre.scss` reads the new line-height token. Each
   rebound partial's case table in `tests/setupStyles.ts` gains the rows that pin the new
   readings (colour, background), taken from the record; run each proof red on a planted wrong
   value and green restored.
6. **Close the untested radii** (CL3 round 3, reviewer 6): `TEXT_CODE_CASES`, `TEXT_KBD_CASES`,
   and `TEXT_PRE_CASES` gain a corner-radius row read the way
   `tests/src/styles/components/button.test.ts` reads one, so deleting either radius declaration
   reddens; prove it red on the deletion and green restored.
7. **Guide**: the new token rows with their values and sources; strike or restate any
   § Departures row an item closes (CL3 recorded the muted text and the raised surfaces as
   departures); leave § Compatibility untouched.
8. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm run test:src:core`, `npm run test:src:styles`, `npm run test:setup`,
   `npm run test:conformance`, `npm run test:app:browser`, `npm run test:journey`,
   `npm run test:guides`, `npm run test:policy`, then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`.

Host: Windows, Git Bash; `npm run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`; the `src:styles` project loads the built cascade, so rebuild with
`npm run build:src:styles` after every `.scss` edit before a styles proof is read;
`vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, and `tests/setupPolicy.ts` are
vendored and never edited.

Standing clauses: audits cover implementation only (a guide row is the parity minimum); an
enumerating assertion in an owned file that your change grows is yours to update in the same
step, recorded, never a stop; the scoped formatter and a lint diagnostic's canonical rewrite are
granted; a plant proves an instrument and is removed before you return.

## Output

Write `cl3b-report.md` in the Veneer checkout and return it: item 1's readings before
and after with the ruling you took and why; per token its name, value, home, leaf, proof, and
guide row; per rebound member its readings before and after with the record row; the
red-then-green pairs (command and counts); each gate's exit code and final lines on both
engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`; every
plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the new tokens' names within
the naming rule; where each case row sits; the guide rows' wording inside the table's shape;
item 1's ruling between the two outcomes it names. Stop on: a gate red after your own fix inside
owned files; a rebinding that would move a reading the record does not cover; a member whose
record row disagrees with the token this brief names.

## Acceptance criteria

1. Item 1's measurement is reported with both readings, and no dark role tier's resolved value
   differs from its value at `9bb306e`.
2. `--vn-text-muted` and the raised, code-surface, font, and line-height tokens this brief names
   exist in the maps, the closure, the registry, and the guide, each proven in both modes on
   both receipts.
3. Every member item 5 names reads its token, and its case table pins the new reading, red on a
   planted wrong value.
4. Deleting the code, keyboard, or preformatted radius declaration reddens its proof.
5. Every gate in item 8 exits 0 on managed Chromium and Edge.
6. The status shows only the owned files and the report.
