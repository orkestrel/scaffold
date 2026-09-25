# J-ORACLE-FIX-OFFCANVAS round 2 — the objective lane's verdict (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d790-4166-7962-9e2b-7dbd76260636`, journal `tmp/codex/j-oracle-fix-offcanvas-audit-2.jsonl` (swept at acceptance). The brief is `units/j-oracle-fix-offcanvas-audit-2-analyst-brief.md`. The lane's final message follows verbatim.

Read-only audit of `dcff520` against `eaf3908`. I ran no tests; execution results below come from the retained logs. Source references identify files at `dcff520`.

| Claim | Verdict | Evidence | Mutation and assertion discrimination |
|---|---|---|---|
| **1. Round 1’s claim 9 is closed** | **CONFIRMED** for the named placements | `src/browser/Offcanvas.ts:578` selects the panel’s root; `:579` uses `ShadowRoot` or falls back to `ownerDocument`; `:582` compares focus across the synchronous hide. `:365` releases isolation before the await at `:384`; `src/browser/Isolation.ts:132` returns focus. The placement table follows. | The `document` mutation distinguishes the same-shadow-root placement through `tests/src/browser/Offcanvas.test.ts:704`. The cross-root placements are source-derived conclusions. |
| **2. The shadow case binds** | **CONFIRMED** | `tests/src/browser/Offcanvas.test.ts:662` exercises the shadow placement with motion and reduced motion. It reads focus at hidden (`:681`), after the press (`:691`), and after settling (`:698`), asserting at `:704`. `j-oracle-fix-offcanvas-2-red-first-2.log.txt:12` records the assertion failure; `j-oracle-fix-offcanvas-replay-2.log.txt:2` records the fixed whole file passing. Imports at test lines `:22`–`:24`, composition at `:44`, and loading at `:663`–`:675` use the shipped cascade. | **Distinguished:** `document` and `base-eaf3908` produce `null` instead of the opener after the press and settling. Replay assertion failures appear at `j-oracle-fix-offcanvas-replay-2.log.txt:9` and `:54`. |
| **3. Round 1’s proofs still bind** | **CONFIRMED** | Assertions remain at `tests/src/browser/Offcanvas.test.ts:655`, `:704`, and `:748`. `j-oracle-fix-offcanvas-replay-2.log.txt:78`–`:86` records assertion failures without the checked alternative error classes. Restoration is recorded at `:50`, `:66`, and `:75`. | **Distinguished:** `never` and `base-63eabbd` lose opener focus; `always` fails the prevented row; `released` fails the unfocusable row; `outside` fails the sliding row; `static` fails the static row. The guard expects body focus, while these mutations retain panel or opener focus. `click` fails the light-tree event-order assertion: `dismissed` becomes `[[true]]` instead of `[[false]]`. `base-eaf3908` fails the shadow assertion. |
| **4. Round 1’s claim 7 is closed** | **FAIL** | `src/browser/Offcanvas.ts:61`, `:568`, `guides/veneer.md:2615`, and `:2794` still promise cancellation whenever the hide moves focus. The reachable residual input below moves focus without satisfying `Offcanvas.ts:582`. The guard qualification and Bootstrap data-API attribution were corrected; the accepted wording changes are present at `Offcanvas.ts:569` and `Offcanvas.test.ts:602`, `:712`. | The existing controls distinguish the guard conditions. **They do not distinguish the residual failure:** the passing implementation contains it, and the shadow fixture at `Offcanvas.test.ts:676` places the panel and opener directly in the same root. |
| **5. The census is unchanged** | **CONFIRMED** | `j-oracle-fix-offcanvas-2-compare-2.log.txt:1` reports 66 departures; `:2`–`:9` report no departure or step differences and no focus departures. Read-only comparison independently found the retained departure file and each offcanvas/modal recording byte-identical to round 1; every departure has `facet: attribute`, `name: inert`. | No round-2 census mutation is supplied. The retained file comparison distinguishes changed recordings. `j-oracle-fix-offcanvas-2-compare-2.py:37` merely prints state differences, so its exit code alone would not establish equality. |
| **6. Scope** | **CONFIRMED** | The commit diff changes only the named paths, matching `j-oracle-fix-offcanvas-2.diff:1`, `:37`, and `:87`. `src/browser/Offcanvas.ts:573` contains one replacement press implementation, with no compatibility path. | Structural claim; no behavioral mutation required. |
| **7. The residual case is stated or bounded** | **FAIL** | `j-oracle-fix-offcanvas-report-2.md:153` records the residual only in the report. The shipped statements at `guides/veneer.md:2615`, `:2794`, and `src/browser/Offcanvas.ts:61` retain the broader promise. The public surface accepts an HTMLElement host (`Offcanvas.ts:40`, `:139`) and an optional HTMLElement trigger (`src/browser/types.ts:1605`), without excluding the input below. | **Not distinguished:** no retained assertion exercises a focus return within a shadow root beneath the panel’s comparison scope. No mutation is necessary to expose this defect. |

The round-1 placement table, reevaluated against `Offcanvas.ts:578`–`:582`, gives these results for the focus established by `show()`. The retargeting and out-of-root `null` results follow the [HTML Standard’s `activeElement` algorithm](https://html.spec.whatwg.org/multipage/interaction.html#dom-documentorshadowroot-activeelement).

| Placement | Compared value before → after isolation’s return | Result |
|---|---|---|
| Light-tree panel and trigger | Panel → trigger | Detected |
| Light-tree panel; trigger inside a separate shadow host | Panel → shadow host | Detected |
| Shadow-tree panel; light-tree trigger outside its shadow host | Panel → `null`, in the panel’s shadow root | Detected |
| Panel and trigger directly inside the same shadow root | Panel → trigger, in that root | Detected |

The residual input for claims 4 and 7 is reachable through direct construction:

- Connect a focusable light-tree offcanvas panel carrying the shipped classes. Give the panel an open shadow root containing buttons `returnTarget` and `inside`.
- Construct `new Offcanvas(panel)`, call `await offcanvas.show(returnTarget)`, then focus `inside` and press the backdrop.
- Isolation moves focus from `inside` to `returnTarget` synchronously (`Isolation.ts:132`, `Offcanvas.ts:365`). The document’s `activeElement` remains the panel throughout, so `Offcanvas.ts:582` leaves the default action uncanceled.

This is a source-derived counterexample to cancellation itself, before any later focus loss caused by hiding the panel. It requires no detached host, backdrop relocation, or private API. Naming the comparison scope in the guide does not state that focus moves beneath that scope are missed.

The following behavior defects remain outside the claims; each is pre-existing and source-derived.

- **Isolation stops at a shadow boundary.** Smallest input: a connected shadow host containing a focusable panel directly in its shadow root, plus a button outside that host. Show the panel, then focus the outside button. `src/browser/Isolation.ts:83` stops the ancestor walk at the boundary, and `:111` skips the panel’s children; the outside button receives no inert claim.
- **An omitted trigger loses the original shadow descendant.** Smallest input: a nonfocusable shadow host whose root contains an opener button and a focusable panel. Focus the opener, call `await offcanvas.show()` without a trigger, then hide. `src/browser/Isolation.ts:78`–`:79` records the document’s retargeted shadow host. The return at `:132` cannot restore the opener. `src/browser/Offcanvas.ts:324` preserves this fallback when the trigger is omitted.

VERDICT: FAIL 4,7