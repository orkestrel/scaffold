# B-FORMS-SELECT audit — `checker` on Sonnet, mechanical conformance

Claims: `bfs-audit-claims.md`. Evidence: `bfs.diff`, `bfs-status.txt`, `bfs-report.md`, the worktree `/home/user/veneer-bfs`. Read-only; no command ran. No claim was ruled BROKEN; the FAIL list names every claim carrying an unresolved sub-finding the lane's allowlist cannot run.

1. **CONFIRMED** for selector membership: the `form-select` key block in `inventory.json` (lines 28538 to 28762) records `.form-select`, `:focus`, `[multiple]`, `[size]:not([size="1"])`, `:disabled`, `:-moz-focusring`, `.form-select-sm`, `.form-select-lg`, each a rule in `bfs.diff:315-390`; the floating and input-group rows (28807 to 29009) do not appear in the partial. Declaration parity against the compiled release is UNRESOLVED here.
2. **CONFIRMED.** `src/styles/index.scss:55` `validation`, `:61` `form-select`, `:62` `form-range`. Every `.form-select` selector in `_validation.scss:64-121` carries `:#{$state}` or `.is-#{$state}`, strictly more specific than the bare rules, so no pair ties.
3. **CONFIRMED** for the inspected cases (`bfs.diff:1056-1419`: the recorded declarations through a same-engine reference, both modes through `readToken`/`matchesColor`, the direct-declaration retune, the space scale under both factors, the reduced-motion gate, the ring through `traverseAccessible`/`readRing` with the tint within one channel step, the `size="1"` control keeping the caret, the disabled traversal refusal, `findRule` returning nothing for `:-moz-focusring`; `bfs.diff:797-861` binds the tables to the inventory and reads the Gecko reset from `compileExpandedCascade()`). The mutation counts are UNRESOLVED (writer-reported), though each assertion's shape matches its mutation's target.
4. **CONFIRMED.** `bfs.diff:5-20` (imports and construction after `FormRangeSection`), `:29-86` (six specimens), `:695-734` (six `CASCADE_KEYS` rows), `:742-755` (`form-select-base-focus`), `:463-504` (the journey case). D2 stands (`bfs.diff:49`, `:543`).
5. **CONFIRMED.** `tests/conformance.test.ts:104-106` sorted; § Compatibility gains the two rows (`bfs.diff:286-287`); the `#### \`form-select\`` table (`bfs.diff:252-278`) carries the tokenized, dropped, and moved `is-*:focus` rows, and the `is-valid`/`is-invalid` tables lost exactly those (`bfs.diff:236, 244`). The deferral-row absence rests on the report's grep (UNRESOLVED independently). The § Bootstrap variables correction (`bfs.diff:216-228`) is true against `_tokens.scss:162` and `_theme.scss:21`.
6. **CONFIRMED.** The section precedes `### Form range classes` (`bfs.diff:145-209`); a case-insensitive sweep of every added line for `should|simply|just|easy|easier|currently|via|e\.g\.|etc\.` returned no match; no stated count.
7. **CONFIRMED.** `_tokens.scss:162` and `_theme.scss:19-23` untouched; `_form-select.scss:316` and `:389` declare the variable on the element. The false-going file list is UNRESOLVED for completeness.
8. **CONFIRMED** for the searched patterns (no `any`, `@ts-`, `eslint-disable`, non-null `!`, or `as` beyond `as const` and the Sass namespace import; the `#86b7fe` literals at `bfs.diff:179,264,1053` sit in prose, the ledger, and the `FORM_SELECT_FOCUS` fixture, not in the partial). Nested-function inspection across every body was not performed (UNRESOLVED on that sub-claim).
9. **CONFIRMED.** Four `A` and thirteen `M` files, all owned or owned-at-anchor; `tmp/probe` absent; the off-limits files absent.
10. **UNRESOLVED.**

Export-name probe: `FORM_SELECT_KEYS`, `FORM_SELECT_CASES`, `FORM_SELECT_MARKUP`, `FORM_SELECT_FOCUS` (`bfs.diff:753,920,1027,1052`); no installed `@orkestrel/test` export does their job. Frame population: 28 `.png` and 24 `-accessibility.txt`, 52 in all.

Findings outside the claims: none to the `BROKEN` standard.

VERDICT: FAIL 1,3,5,7,8,10; outside the claims: none
