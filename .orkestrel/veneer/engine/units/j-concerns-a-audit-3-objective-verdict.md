# J-CONCERNS-A round 3 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6e1-1f35-7471-adb9-c8dbff3fbe8c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-concerns-a-audit-3.jsonl` (launch copy under `tmp/codex/`); 43 commands; 213 s; usage {"input_tokens":714020,"cached_input_tokens":624640,"cache_write_input_tokens":0,"output_tokens":5531,"reasoning_output_tokens":1022}. Retained verbatim from the exec's last message.

---

All six claims are **CONFIRMED**. The round-1 findings on claims 3 and 7 are closed.

Audited committed files at `90e8b60` against `bcea965`. No tests ran, no files changed, and no Veneer worktree files were read. Runtime results below come from retained receipts.

In the tables, `replay` means `j-concerns-a-mutations-orchestrator-3.log.txt`, and `raw` means its `-raw.log.txt` companion, both under scaffold’s `.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence and proof discrimination |
|---|---|---|
| **1. E34 in ScrollSpy** | **CONFIRMED** | `src/browser/ScrollSpy.ts:383` reads the preference once per handled click. The host call at `:387` and view call at `:394` both pass that result unchanged. Neither branch requests smooth scrolling when true or instant scrolling when false. Unobserved links return before the read (`:381`). `src/browser/helpers.ts:497` contains the sole direct preference query in `src/browser/`; Carousel and ScrollSpy reuse it. The host proof asserts the destination and exactly one recorded final position at `tests/src/browser/ScrollSpy.test.ts:618`. `scrollspy-ungated` distinguishes the rejected behavior. The baseline-source failure and passing control appear at `replay:6` and `:10`. |
| **2. Focus case leaves no history entry** | **CONFIRMED** | `tests/src/browser/ScrollSpy.test.ts:549` contains no native-navigation control. It captures history length and hash at `:570`, asserts both unchanged at `:578`, and checks retained focus at `:580` and `:582`. Cleanup aborts listeners, destroys the spy, and removes mounted nodes (`:565`, `:567`, `:25`; `tests/setupBrowser.ts:1772`). Both `scrollspy-focus-section` and `scrollspy-navigate` fail distinguishing assertions. |
| **3. Nested toggle** | **CONFIRMED** | `src/browser/Button.ts:109` dispatches before reading the return state at `:110`. The listener toggles exactly once at `tests/src/browser/Button.test.ts:689`; assertions at `:694` check both returns, ordered event readings, and final DOM state. `button-stale-return` makes the outer return incorrectly read `true`, producing the assertion failure at `raw:305`. |
| **4. Proofs bind and sources restore** | **CONFIRMED** | `replay:10` records **79 passing tests**. All 11 mutations produce assertion failures, detailed below. The instrument verifies pristine digests before mutation and after restoration (`j-concerns-a-mutate-3.cjs:67`, `:79`). Every raw block records both restored digests; `replay:52` records the independent byte-for-byte restoration check. I independently hashed both committed source blobs: their SHA-256 values match the instrument’s pinned values at `:18` and `:19`. |
| **5. Documentation truth and scope** | **CONFIRMED** | `guides/veneer.md:1456`, `src/browser/types.ts:1299`, and the class remarks at `src/browser/ScrollSpy.ts:54` describe the reduced-motion branch implemented at `:383`. The diff changes only this behavior’s wording and paragraph wrapping within those texts. |
| **6. Changed paths** | **CONFIRMED** | `git diff --name-status bcea965 90e8b60` contains exactly the five claimed paths, matching `j-concerns-a-3-status.txt:1`. The retained `j-concerns-a-3.diff` also matches the committed diff after newline normalization. |

The mutation assertions distinguish the following changes from the passing implementation:

| Mutation | Distinguishing assertion at `90e8b60` | Retained failure |
|---|---|---|
| `scrollspy-cancel` | **Yes:** event cancellation flags and activation sequence, `tests/src/browser/ScrollSpy.test.ts:206`. | `raw:19` |
| `scrollspy-focus-link` | **Yes:** event-time and final focused element, `tests/src/browser/ScrollSpy.test.ts:245`. | `raw:45` |
| `scrollspy-focus-section` | **Yes:** focus remains on the activated link, `tests/src/browser/ScrollSpy.test.ts:580`. | `raw:71` |
| `scrollspy-navigate` | **Yes:** unchanged hash, `tests/src/browser/ScrollSpy.test.ts:578`; history length is also asserted at `:579`. | `raw:126` |
| `scrollspy-instant-host` | **Yes:** requires an intermediate host position, `tests/src/browser/ScrollSpy.test.ts:491`. | `raw:161` |
| `scrollspy-instant-view` | **Yes:** requires an intermediate document position, `tests/src/browser/ScrollSpy.test.ts:544`. | `raw:181` |
| `scrollspy-ungated` | **Yes:** requires only the final position under reduced motion, `tests/src/browser/ScrollSpy.test.ts:619`. | `raw:201` |
| `button-focus` | **Yes:** focus remains on the other control, `tests/src/browser/Button.test.ts:495`. | `raw:227` |
| `button-blur` | **Yes:** focus remains on the host, `tests/src/browser/Button.test.ts:492`. | `raw:253` |
| `button-motion` | **Yes:** requires synchronous event delivery, `tests/src/browser/Button.test.ts:531`, alongside nonempty positive running-animation durations at `:533`. This follows E32’s amendment. | `raw:279` |
| `button-stale-return` | **Yes:** outer toggle returns the final live state, `tests/src/browser/Button.test.ts:694`. | `raw:305` |

The reduced-motion viewport branch is confirmed by source inspection. There is no dedicated reduced-motion viewport case; the recorded mutations do not establish exhaustive branch coverage.

Round-1 **claim 3 is closed** by E34’s explicit ruling, the shared behavior selection, and the reversed reduced-motion proof. Round-1 **claim 7 is closed** because the passing focus case no longer performs the navigation that left a history entry.

Outside the claims, the earlier offset-parent selection failure remains reachable by source inspection. Its smallest previously identified witness is a `100px` scrolling host containing two `100px` sections in separate relatively positioned wrappers, links to both, and trailing scroll space. With intersection margin `0px 0px -1px`, allow delivery at scroll positions `0 → 110 → 0`. Both section offsets are zero: `src/browser/ScrollSpy.ts:288` compares those unrelated offsets, `:289` rejects the returning first section, and `:283` clears the leaving second link. The first visible section remains unselected. The Orchestrator explicitly accepts this behavior as Bootstrap parity and assigns its witness to J-ORACLE-GATE (`j-concerns-a-audit-verdict.md:18`); it does not fail this round. I did not execute the witness.

The pending-scroll finding remains closed under the ruling at `j-concerns-a-audit-verdict.md:19`: destruction promises no cancellation of an already requested platform scroll. The nested-toggle concern is covered by claim 3, with no source defect found.

VERDICT: PASS
