# J-SAMEWAY-ENGINES-B round 1 — reconciled verdict (2026-09-25)

**Subject.** Veneer `54a6c2f` and the integration `b8a8805` on `unit/engines-b`, over `8bc940d`. The claims are in `units/j-sameway-engines-b-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra (thread `01a0d68b-c638-71e1-bd33-a4c1e1bc8faa`, `units/j-sameway-engines-b-audit-objective-verdict.md`). It confirmed claims 1, 5, 6, 7, and 9 and failed 2, 3, 4, and 8.
- **Checker:** `checker` on Sonnet (`units/j-sameway-engines-b-audit-checker-verdict.md`). It matched every B4 row and found Dropdown's hide `#save()` unnamed. The lane ran natively before the Grok probe of 2026-09-25, which the routing ledger records as a deviation.
- **Subjective (not run):** the unit changes no public name or shape.

**The Orchestrator's readings.**
- The scoped gates at `b8a8805`: `tools/w2-gates-scoped-engines-b-1.log`, with 987 passed.
- The red reading: `units/j-sameway-engines-b-red-orchestrator.log.txt`. There are 14 failed on `8bc940d`'s sources, every one an `AssertionError`.
- The mutation replay: `units/j-sameway-engines-b-mutations-orchestrator.log.txt`. There are 43 rows, every kill is an assertion, the refusals are refused, and the controls hold.

## Reconciliation

- **Claims 2 and 4, the returns.** Dropdown writes a fixed `aria-expanded` value and returns in forward order. Tooltip removes its link rather than restoring the attribute. E24's amendment of 2026-09-25 (prior values, no entry for a write that changes nothing, and reverse order) applies to both.
  - **Ruling on `aria-describedby`.** Tooltip and Popover share `aria-describedby` with each other's links on one trigger, so the attribute is a token list. It is not a single value to restore. The return removes only the id the call added, and restores the attribute's presence by E25's presence rule: it removes the attribute only when the attribute was absent before the call and the list is then empty. Whitespace inside the list is the token list's normal form, as `classList` gives it, and is not returned.
  - **Ruling on Tooltip's cleared interaction state.** The state a hide clears before its token step (hover, focus, click, and entered) is the engine's own state, not a host write, so E24's return does not cover it. The B4 table names it with that reason.
- **Claim 3, refused reopening: a defect.** After a prevented platform close, the engine re-promotes the overlay with `showPopover()` and does not read whether it opened. A `beforetoggle` listener that cancels the reopening leaves `shown` reading true over a closed overlay. The engine must read `:popover-open` after the call and complete the hide when the overlay stayed closed.
- **Claim 8, false sentences.** The platform-close paragraphs promise a reopening that claim 3's input refuses. The Tooltip paragraph says a taken-over hide leaves the tip shown and named, which is false during the closing placement destruction. Both change with the code.
- **The checker's unnamed write.** Dropdown's `#save()` in the hide is E13 and E25's snapshot write, returned by destruction. The B4 table names it.

## Ruling

Round 3 (`units/j-sameway-engines-b-brief-3.md`) fixes claims 2, 3, 4, and 8. It adopts the prior-value leaf J-SAMEWAY-ENGINES-A round 3 extracts into `src/browser/helpers.ts`, so it is dispatched after J-SAMEWAY-ENGINES-A lands.

VERDICT: FAIL 2, 3, 4, 8
