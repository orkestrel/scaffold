<!-- CL3b scope read, checker on native Sonnet (clean context, read-only), brief units/cl3b-scope-read-brief.md over units/cl3b-brief.md and the Veneer tree at 9bb306e, 2026-09-21. Verdict: dispatch, with the integration assertion and the two guide rows folded into units/cl3b-brief-2.md. -->

## Item 1: paths, symbols, lines, values

| Claim | Status | Evidence |
|---|---|---|
| `$light` opens 17, `$dark` 59, `$assets` 116 | true | `src/styles/_tokens.scss:17,59,116` |
| `raised` light `oklch(0.984 0.003 247.858)` (line 36), dark `oklch(0.235 0.013 256)` (line 78) | true | `_tokens.scss:36,78` |
| `--vn-font-mono` (~208), no leading `ui-monospace` | true | `_tokens.scss:208-209`, value verbatim: `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace` |
| `--vn-line-body` `1.5`, `--vn-line-heading` `1.2` (~227-228) | true | `_tokens.scss:227-228` |
| `--vn-text-secondary`/`-tertiary` closure (~173-174) | true | `_mixins.scss:173-174` |
| `--vn-text-code`/`-highlight` (~175-176) | true | `_mixins.scss:175-176` |
| `--vn-surface-raised` (~179) | true | `_mixins.scss:179` |
| `--vn-surface-code` literal `color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)` (~185), siblings read `map.get` | true | `_mixins.scss:185` vs `177,180-184` (`map.get(...)`) |
| registry `text` group flat leaves `secondary, tertiary, heading, code, highlight` (~128-132) | true | `src/core/constants.ts:128-132` |
| registry `surface` group `raised, highlight, code, gradient` beside nested pairs (~134-151) | true | `constants.ts:134-151` (raised:139, highlight:148, code:149, gradient:150) |
| five partials and today's declarations | true | `_address.scss` no color; `_dl.scss` `dd` no color; `_pre.scss` `line-height:1.6` (line 9), `border-radius: var(--vn-radius-base)` (line 11), no background declared (transparent); `_samp.scss` no background declared; `_var.scss:3` literal `ui-monospace, SFMono-Regular, Menlo, monospace` |
| `TEXT_<TAG>_CASES` exports and inventory assertion | true | `tests/setupStyles.ts:9-321` (the text case exports); `tests/setupStyles.test.ts:81-100` names them all |
| `$dark` `anchor` reads `var(--vn-surface-raised)`; `role-each` signature; the call passing anchor | true | `_tokens.scss:70`; `role-each($roles, $tint, $edge, $anchor)` at `_mixins.scss:127`; call `map.get($values,'anchor')` at `_mixins.scss:163-168` |

## Item 2: calibration record values

| Row | Brief value | Record value | Match |
|---|---|---|---|
| `text-muted` light/dark | `oklch(0.446 0.043 257.281)` / `oklch(0.704 0.04 256.788)` | `oklch(44.6% .043 257.281)` / `oklch(70.4% .04 256.788)` (`address` row line 2934, `dd` row line 1000) | true |
| `raised` light/dark | `oklch(0.968 0.007 247.896)` / `oklch(0.265 0.014 256)` | `oklch(96.8% .007 247.896)` / `oklch(26.5% .014 256)` (`pre` line 2379, `samp` line 2586, `var` line 2655) | true |
| `var` font stack | `ui-monospace, SFMono-Regular, Menlo, monospace` | line 2648, exact | true |
| `pre` line height `1.6` | derives from `19.6px` at font-size `12.25px` (87.5% of `--vn-size-2` 14px) | `2374`: `19.6px` ÷ `12.25px` = `1.6` | true |

## Item 3: scope by falsified assertions (swept `tests/**`, `src/**`, `app/**`, `guides/veneer.md`, `package.json`, `configs/**`)

- `tests/src/styles/integration.test.ts:92` asserts `matchesColor(readStyle(border,'border-top-color'), 'color-mix(in oklab, #66bb6a 50%, oklch(0.235 0.013 256))')` — the dark border tier pinned to today's raised literal through the `anchor` chain confirmed in item 5. **Not in Scope's owned list.** Applying the brief's own mandated mitigation (pin `$dark.anchor` to the literal `oklch(0.235 0.013 256)`, item 1) keeps this assertion true unedited, so this file needs no grant if and only if the writer takes that branch. If the writer instead lets the retuned `raised` value flow into `anchor` (the branch the source values make necessary, since record raised `0.265 0.014 256` differs from today's `0.235 0.013 256`), this assertion goes false with no owned file able to fix it. This is exactly the hazard item 1 names and the class of file item 3 asks to be called out; it is not a Button or journey file, so the brief's own parenthetical list did not name it.
- `guides/veneer.md:400` (§ Tokens, semantic roles) documents the dark border-tier formula as `color-mix(in oklab, {fill} 50%, var(--vn-surface-raised))`. Scope grants `guides/veneer.md § Tokens`, and line 400 sits inside that heading (311-700), so it is granted, but the brief's execution steps never name this row; the writer must recognize it stays literally correct only under the pin-anchor branch (the anchor stays `var(--vn-surface-raised)` reading the pinned literal, not the record's new raised value).
- `guides/veneer.md:433-434` (prose explaining `--vn-surface-raised` and the dark border mix) is likewise inside § Tokens and granted, and needs the same reconciliation.
- `tests/setupStyles.ts:1129-1136,1248-1255` list `--bs-*-border-subtle` alias names only (no literal color values); not falsified by either branch. `none found` beyond the two rows above for other sweeps of `tests/**`, `src/**`, `app/**`, `package.json`, `configs/**`.
- No Button or journey proof pins a dark role value: `tests/src/browser/Button.test.ts` and `tests/src/styles/components/button.test.ts` have no match for `0.235`, `border-subtle`, or `surface-raised`; no `tests/journey*.ts` file exists in the tree (`none found`).

## Item 4: vendored/off-limits and non-existent owned paths

`none found`. `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` all exist and are correctly excluded from Owned. Every owned path (`tests/src/styles/tokens.test.ts`, the five partials, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`) exists.

## Item 5: hazard chain, from source alone

Stated correctly. `$dark.anchor` = `'var(--vn-surface-raised)'` (`_tokens.scss:70`) → `theme-tokens` passes `map.get($values,'anchor')` into `role-each` as `$anchor` (`_mixins.scss:163-168`, signature at 127) → `role-each` mixes every role's `--vn-color-{role}-border` against `$anchor` (`_mixins.scss:139-143`) → `--vn-surface-raised` itself is emitted from `map.get($values,'raised')` (`_mixins.scss:179`). Retuning the `raised` map key therefore changes the substituted value of `--vn-surface-raised`, which changes `$anchor`'s resolved value, which moves every dark role's `border` tier — confirmed observable in `tests/src/styles/integration.test.ts:92`'s literal expectation against today's raised value.

Verdict: dispatch
