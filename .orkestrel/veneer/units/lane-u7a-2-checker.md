<!-- workflow wf_1c4871ab-c64, agent ac096b39a14ad8445, label unknown, retained 2026-09-20 -->

## Claim table

| Claim | Verdict | Evidence |
|---|---|---|
| 10 `[mechanical]` Scope and law | CONFIRMED | `tmp/audit/u7a-status-2.txt` lists only `guides/veneer.md`, `src/core/constants.ts`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/index.test.ts`, `tests/src/styles/mixins.test.ts`, and the new `src/styles/components/_button.scss`, `src/styles/elements/_button.scss`, `tests/src/styles/components/button.test.ts`, `tests/src/styles/elements/button.test.ts` — no `src/browser/**`, `app/**`, `tests/setupConformance*.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, or `vite.config.ts` row present. Grep for `: any`, `<any>`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, `.skip(`, `.only(` over `tests/setupStyles.ts` and the two new `button.test.ts` files returned no matches; every ` as ` occurrence in `tests/setupStyles.ts` is ` as const`. `filterAsymmetricDeclarations` is exported (`tests/setupStyles.ts:600`) and both listed and tested in `tests/setupStyles.test.ts` (diff lines 391–413, 421–482) and consumed in `tests/src/styles/index.test.ts` (diff lines 900–924). `tests/conformance.test.ts:55` sets `listed = ['btn']` per the diff. Grep for `PLANT` across `**/*.{ts,scss,md}` in the Veneer checkout returned no files. `tests/setupConformance.ts:37` already types `status: 'accepted' | 'shipped'` and `scanCompatibilityPresence` (line 599) requires `'shipped'` to scan presence, so `guides/veneer.md`'s `btn` rows moving from `accepted` to `shipped` (diff lines 233, 242) is consistent with the existing, untouched mechanism — `tests/setupConformance.ts` carries no diff line, confirming it was not edited. |

## Probe readings

- **`userEvent`/`vitest/browser`**: grep over `tests/src/styles/elements/button.test.ts` and `tests/src/styles/components/button.test.ts` returned no hits for either pattern.
- **Presence partition**: `tests/fixtures/oracle/inventory.json` carries a `btn` component block (line 31727) with numerous `.btn`-classed nodes; `dist/src/styles/index.css` exists on disk. Grep for `\.btn:active` in `src/styles/components/_button.scss` returned only the compound selectors `:not(.btn-check) + .btn:active` (line 83) and `:not(.btn-check) + .btn:active:focus-visible` (line 96) — no bare `.btn:active` selector.
- **Tokens**: every `--vn-state-*` and `--vn-button-*` and `--vn-focus-highlight`/`-reset` name the partials declare appears in `TOKEN_NAMES.state`, `TOKEN_NAMES.button`, and `TOKEN_NAMES.focus` (`src/core/constants.ts:221-241`), and the reverse holds. The three state tokens (`--vn-state-mixer/hover/active`) and the two focus tokens are declared only inside `theme-tokens` in `src/styles/_mixins.scss` (lines 83-85, 119-120); grep across `src/**/*.scss` found no hand copy of those names in `_tokens.scss` `:root` or `_theme.scss` mode scopes. `--vn-button-*` names are declared once, in `_tokens.scss`'s `$assets` block (lines 267-273), which is not a state-token concern under this claim.
- **Binding rows**: every `--bs-btn-*` row in `guides/veneer.md` § Tokens (diff lines 149-172) matches the value `src/styles/components/_button.scss` declares (lines 984-1016), including the `.btn-light` / `.btn-outline-light` overrides for `color`, `hover-color`, `active-color`, and the `.btn-light`-only override for `disabled-color` — no differing row found.
- **Scope**: confirmed above under claim 10.
- **Enumerating assertions**: the export-inventory case in `tests/setupStyles.test.ts` lists `filterAsymmetricDeclarations` (diff line 413) and the `BUTTON_*` case tables (diff lines 399-405); `tests/conformance.test.ts:55` lists `btn`; no `it(` block was removed without a rewritten successor — `tests/src/styles/index.test.ts`'s direction-sensitive case kept its title and body was rewritten in place, and `tests/src/styles/mixins.test.ts` only added a new `it(`.

## Extra findings

None found (implementation scope only).

Verdict: accept
