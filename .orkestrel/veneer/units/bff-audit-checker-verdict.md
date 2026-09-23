# B-FORMS-FLOATING audit — `checker` on Sonnet, mechanical conformance

Claims: `bff-audit-claims.md`. Evidence: `bff.diff`, `bff-status.txt`, `bff-report.md`, `bff-floor-report.md`, the worktree `/home/user/veneer-bff`. Read-only; no command ran. No claim was found BROKEN.

1. **CONFIRMED** for the emitted selectors and D4: `_form-floating.scss` (diff lines 429 to 543) emits the container, the control, plaintext, and select geometry, the label, the padding on control and plaintext, the placeholder hiding, the focus and filled padding, the autofill rules as separate rules, the label transforms, the textarea backdrops, the plaintext border, and the disabled labels; the `--vn-space-8/6/5/3` tokens, `--vn-gray-600`, and the `--bs-*` globals sit where the report says; no `.input-group` or `.was-validated` selector appears. The compile comparison is UNRESOLVED here.
2. **CONFIRMED.** `src/styles/index.scss:62` loads `components/form-floating` directly after `components/form-range` (61); no selector combines `.input-group` or a validation class with `.form-floating`.
3. **UNRESOLVED** (needs the mutation runs).
4. **CONFIRMED.** `FormFloatingSection.ts` renders through `SpecimenSection` with `FORM_FLOATING_COPY` and `FORM_FLOATING_SPECIMENS`; six specimens (empty, filled, textarea, select, disabled, plaintext); `CASCADE_KEYS` and `FORM_FLOATING_KEYS` additions at diff lines 617, 809, 908; 28 `.png` (7 scenarios × 4 variants) and 24 `-accessibility.txt` (6 subjects × 4 variants) under `tmp/capture/states/`.
5. **CONFIRMED** for `listed` (`tests/conformance.test.ts:104`, between `figure` and `form-range`) and the `#### \`form-floating\`` table (`guides/veneer.md:2683`, rows 2687 to 2707); the `.input-group > .form-floating` attribution is UNRESOLVED until GROUP lands.
6. **CONFIRMED.** The section after `### Form range classes`; the § Files row (diff line 228) between `_form-range.scss` and `_validation.scss`; the § Tests link at 828 and 3261; a case-insensitive sweep of the guide for `should|simply|just|easy|currently|via|e.g.|etc.` returned nothing.
7. **CONFIRMED** for the expression (`tests/setupServer.ts:685-690`: `(count >= 5 && count * 2 > smallest) || count >= 6`) and the restated TSDoc; the boundary cases' split is UNRESOLVED without a run.
8. **CONFIRMED** on the spot-checked files (`_form-floating.scss`, `FormFloatingSection.ts`: no `any`, `as` beyond `as const`, `!`, or suppression; `Object.freeze` throughout; no nested function); the remaining files were not swept (UNRESOLVED).
9. **CONFIRMED.** Four `A` files and thirteen `M` files including FLOOR's two; `tmp/probe/**` absent; `_tokens.scss`, `_theme.scss`, `_mixins.scss`, `_validation.scss`, `ROADMAP.md` absent from the status.
10. **UNRESOLVED.**

Export-name probe: `FORM_FLOATING_COPY`, `FORM_FLOATING_SPECIMENS`, `FormFloatingSection` (app), and in `tests/**` `FORM_FLOATING_KEYS`, `FORM_FLOATING_CASES`, `FORM_FLOATING_MARKUP`; no match in the first 1254 lines of the browser declarations; the rest and the server declarations were not read (UNRESOLVED).

Findings outside the claims: none to the `BROKEN` standard.

VERDICT: FAIL 3, 10; outside the claims: none

## Orchestrator's settlement (2026-09-23)

The export-name probe closes on the SELECT and GROUP rounds' same reading: no installed `@orkestrel/test` export is a fixture table or a capture-key list, and this diff adds no function to `tests/**` (`grep -n '^+export function' bff.diff` returns nothing).
