<!-- The J-SAMEWAY round-3 checker lane (checker on Sonnet, native read-only subagent a6fca6742dee28e57), retained verbatim from its completion notification; brief: units/j-sameway-audit-3-checker-brief.md; claims units/j-sameway-audit-claims-3.md; subject Veneer e557bfe. -->

All quoted case titles found. Now finalize verdict.

## Checklist

**D1 table check**

| Engine | Direction | Write | Found at | Entry at | Return at | Match |
|---|---|---|---|---|---|---|
| Modal | show | Scroll lock construction | Modal.ts:267 | — | — (E13 acquisition) | yes |
| Modal | show | Body `open` token | Modal.ts:275 (`#holdOpen`) | — | — | yes |
| Modal | show | Host padding (`#adjust`) | Modal.ts:276 | — | Modal.ts:407-412 (E22 amend 3) | yes |
| Modal | show | Backdrop connection (outside page) | Modal.ts:288 | `connection` at Modal.ts:536 | Modal.ts:537-538 (`destroy`) | yes |
| Modal | show | Backdrop token (no token) | Modal.ts:288 | `token` at Modal.ts:540 | Modal.ts:540 (`hide()`) | yes |
| Modal | show | Host appended to body | Modal.ts:293-297 | — (not in `shade`) | not returned | yes |
| Modal | show | `display: block` | Modal.ts:298 | `display` | Modal.ts:530 (`display: none`) | yes |
| Modal | show | `aria-hidden` removed | Modal.ts:301 | `aria-hidden` | Modal.ts:531 | yes |
| Modal | show | `aria-modal="true"` | Modal.ts:304 | `aria-modal` | Modal.ts:532 | yes |
| Modal | show | `role="dialog"` | Modal.ts:308 | `role` | Modal.ts:533 | yes |
| Modal | show | `scrollTop` resets | Modal.ts:311,313 | — | not returned | yes |
| Modal | show | `shown` token step | Modal.ts:316-319 | — | reversal is the takeover itself | yes |
| Modal | show | Isolation | Modal.ts:324-338 | — | E13 acquisition, destroyed directly at 333 | yes |
| Modal | show | Focus move | Modal.ts:338 | — | not returned (isolation release returns focus) | yes |
| Modal | hide | Isolation release | Modal.ts:363 | — | E22 amend 3 | yes |
| Modal | hide | `shown` token removed | Modal.ts:365-368 | — | host's move | yes |
| Modal | hide | `display`/`aria-hidden`/`aria-modal`/`role` | Modal.ts:373-385 | each own entry | Modal.ts:502-505 | yes |
| Modal | hide | Backdrop token (found with it) | Modal.ts:391-395 | `token` | Modal.ts:509 | yes |
| Modal | hide | Backdrop connection (has parent) | Modal.ts:397-401 | `connection` | Modal.ts:508 | yes |
| Modal | hide | `open` release/padding/lock release | Modal.ts:403-416 | — | E22 amend 3 | yes |
| Modal | hide | Closing backdrop destruction | Modal.ts:420-423 | — | not rebuilt (E24 amend) | yes |
| Offcanvas | show | Lock | Offcanvas.ts:258-261 | — | E13 acquisition | yes |
| Offcanvas | show | Backdrop connection | Offcanvas.ts:285 | `connection` | Offcanvas.ts:521-526 | yes |
| Offcanvas | show | Backdrop token | Offcanvas.ts:285 | `token` | Offcanvas.ts:527 | yes |
| Offcanvas | show | `aria-modal`/`role`/`showing` | Offcanvas.ts:295-303 | each own entry | Offcanvas.ts:516-518 | yes |
| Offcanvas | show | `shown` token step | Offcanvas.ts:307-310 | — | host's move | yes |
| Offcanvas | show | `showing` removed after wait | Offcanvas.ts:314-316 | drops entry | `settled` list at 313 omits it | yes |
| Offcanvas | show | Isolation, focus | Offcanvas.ts:317-333 | — | as in Modal | yes |
| Offcanvas | hide | Isolation release | Offcanvas.ts:361 | — | E22 amend 3 | yes |
| Offcanvas | hide | `hiding` added | Offcanvas.ts:362-364 | `hiding` | Offcanvas.ts:489 | yes |
| Offcanvas | hide | Backdrop token | Offcanvas.ts:372-374 | `token` | Offcanvas.ts:495 | yes |
| Offcanvas | hide | `shown` token removed | Offcanvas.ts:376-379 | — | host's move | yes |
| Offcanvas | hide | `hiding` removed | Offcanvas.ts:383 | drops entry | `written` at 389 omits it | yes |
| Offcanvas | hide | Leftover `showing` removed | Offcanvas.ts:383 (same call) | — | not returned | yes |
| Offcanvas | hide | `aria-modal`/`role` removed | Offcanvas.ts:386-392 | each own entry | Offcanvas.ts:490-491 | yes |
| Offcanvas | hide | Backdrop connection | Offcanvas.ts:397-401 | `connection` | Offcanvas.ts:494 | yes |
| Offcanvas | hide | Lock release | Offcanvas.ts:402-406 | — | E22 amend 3 | yes |
| Offcanvas | hide | Listener ended + closing destruction | Offcanvas.ts:410-415 | — | not rebuilt (E24 amend) | yes |

**Writes no row names**: none found. Every write to host, body, backdrop token, and backdrop connection in `show`/`hide` in both `Modal.ts` and `Offcanvas.ts` is named by a D1 row.

**Claim 7's reading**: CONFIRMED. `units/j-sameway-3-status.txt` lists exactly `guides/veneer.md`, `src/browser/Modal.ts`, `src/browser/Offcanvas.ts`, `tests/src/browser/Modal.test.ts`, `tests/src/browser/Offcanvas.test.ts` — the five the report names, and no other path (`types.ts`, `tests/setupBrowser.ts` absent, confirming unchanged). `#revert` is defined once and used at Modal.ts:501,529 and Offcanvas.ts:488,515 — no dead declaration. `BackdropInterface` is imported and used as the `#backdrop` field type in both files (Modal.ts:2,122; Offcanvas.ts:2,123) — no dead import. No function in either file still declares a `backdrop` parameter; every `backdrop` occurrence found is a field, local variable, or option name, never a parameter of `#reshow`/`#rehide` (which take `change`, `written`, and, in Modal's `#reshow`, `place`).

**Case titles not found**: none. Every quoted D1 case title resolves in `tests/src/browser/Modal.test.ts` or `Offcanvas.test.ts` (verified at Modal.test.ts:655,1776,2991,2568,3103,3136,3240,3288 and Offcanvas.test.ts:3278,3392,3436,3538,3587).

**Referrals**: none — every item ruled mechanically on source evidence.

CHECK: PASS
