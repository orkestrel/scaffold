# J-SNAPSHOT audit round 2 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d3fa-6795-70f2-b9d6-4d3814f6c9fa`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-snapshot-audit-2.jsonl` (launch copy under `tmp/codex/`); 48 commands; 486 s; usage {"input_tokens":2116663,"cached_input_tokens":1945472,"cache_write_input_tokens":0,"output_tokens":13122,"reasoning_output_tokens":5240}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane — source review against the supplied execution evidence.

1. **BROKEN — the partial-restoration guarantee has a same-snapshot take-back exception.**

   The stated `#leave` implementation is present: it checks membership, removes this holder, retains other holders, forgets an exhausted record, and returns `!record.present` (`src/browser/HostSnapshot.ts:228`). The consequence that every partial restoration avoids an empty attribute is false.

   Source-derived counterexample, using a custom element observing `class`:

   - Start without a `class` attribute. Snapshot A saves `active`, then the element gains `active`.
   - Snapshot B saves `collapsed`, then the element gains `collapsed`. B restores, leaving `active`.
   - Install a one-shot class reaction that calls `A.save({ category: 'token', element, name: 'active' })`, then `element.classList.toggle('active', false)`.
   - Call `A.restore()`.

   A’s restoration removes `active`, producing `class=""`. Inside that write, the reaction takes A’s published original through `#take`. `#join` moves A’s presence holding from `#leaving` back into `#joined` (`HostSnapshot.ts:110`, `HostSnapshot.ts:200`). The forced-false toggle changes nothing. After the reaction returns, the cleanup loop has no class departure to inspect (`HostSnapshot.ts:157`), and `finally` also visits only `#leaving` (`HostSnapshot.ts:186`). The attribute remains present and empty without a throw. A subsequent restoration removes it.

   This follows the platform’s token-update and synchronous reaction ordering: removing the final token serializes an empty attribute, and the reaction runs before the operation returns. [DOM token operations](https://dom.spec.whatwg.org/#dom-domtokenlist-toggle), [custom-element reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions).

   The existing take-back case avoids this state by adding `show` inside its reaction; it checks removal only after the subsequent restore (`tests/src/browser/HostSnapshot.test.ts:641`). It therefore does not distinguish this counterexample.

   **Smallest corrective scope:** evaluate empty-attribute cleanup after the interrupted restoration’s writes while retaining the presence holding and target recording acquired by the re-entrant save. Do not remove the take-back mechanism or consume that successor recording. Add the empty-result variant beside the existing take-back case.

   The reported Button/Collapse regression itself binds: restoring last-holder-only removal makes its final `hasAttribute('class')` assertion fail while `Collapse.find(panel)` still identifies the live collapse (`HostSnapshot.test.ts:618`; `j-snapshot-mutations-2.log.txt:2`).

2. **CONFIRMED — the Dropdown observer repair binds within the observed subtree.**

   I attacked delivery before the awaited continuation. The callback retains delivered records, and the case checks that array followed by `takeRecords()` (`tests/src/browser/HostSnapshot.test.ts:776`). A record cannot escape merely by moving from the observer queue into its callback.

   I also attacked an excluded attribute. The actual observer uses `{ attributes: true, subtree: true }`, with **no `attributeFilter`** (`HostSnapshot.test.ts:788`). The menu, toggle, and placement reference in this reproduction remain under the observed root.

   The instrument inserts `data-popper-placement="late"` after `removeAttribute('popover')` returns (`j-snapshot-mutations-2.py:49`). The named case fails on the delivered-record assertion; the same write passes with the old callback and assertion removed (`j-snapshot-mutations-2.log.txt:15`; `j-snapshot-mutations-2-controls.log.txt:2`).

   The nested-return reading remains independently discriminating: removing the restoration hand-off leaves `"bottom"` where the case expects `null` (`j-snapshot-mutations-2.log.txt:12`). `Dropdown.destroy()` re-enters `Placement.destroy()`, which calls the same snapshot’s `restore`; `#published` supplies the interrupted targets, and `written` prevents rewriting the in-flight popover target (`Dropdown.ts:250`; `Placement.ts:187`; `HostSnapshot.ts:146`, `HostSnapshot.ts:299`).

   This proof covers attribute writes within its root through the post-`hide()` assertions. It does not establish absence of arbitrary future writes or writes outside that root.

3. **CONFIRMED — the presence fold and explicit map arguments are present.**

   I attacked alternate presence-access paths and an untyped pending-map fallback. `save` reaches presence through instance `#join`; restoration and cleanup reach it through instance `#leave`. The former `#hold`, `#depart`, static presence methods, and presence-owner parameter are absent. The remaining `owner` parameters belong to pending-target ownership, a different mechanism (`HostSnapshot.ts:128`, `HostSnapshot.ts:195`, `HostSnapshot.ts:228`, `HostSnapshot.ts:261`).

   The fallback maps explicitly carry their key and value types (`HostSnapshot.ts:212`, `HostSnapshot.ts:271`).

   The retained probe distinguishes the widening: its untyped reads are assigned to `number`, while its typed control produces the reported `TS2322` (`j-snapshot-widen-probe.ts:11`; `j-snapshot-report-2.md:88`). The installed declaration independently explains the distinction: the zero-argument nongeneric constructor returns `Map<any, any>`, whereas the explicit generic constructor returns `Map<K, V>` (`node_modules/typescript/lib/lib.es2015.collection.d.ts:48`). I did not rerun the compiler probe.

4. **BROKEN — the edited contract promises more than the implementation supplies.**

   Claim 1’s interleaving contradicts the no-empty-partial-restoration promise in [the authoritative interface](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot/src/browser/types.ts:352), the class remarks (`HostSnapshot.ts:18`), and Ownership and restoration (`guides/veneer.md:827`). The exception is a re-entrant save whose resulting token remains absent; no write throws.

   Repair the mechanism and pin that case, or explicitly obtain a ruling narrowing the contract. The present wording cannot describe the present implementation.

   The remaining wording attacks held:

   - The edited passages no longer state last-holder-only cleanup or use temporal `once`.
   - The retitled cases describe observable outcomes.
   - Tab still records target values independently before each engine’s first write (`Tab.ts:174`, `Tab.ts:340`; `guides/veneer.md:1225`).
   - Carousel still restores its main snapshot before its swipe snapshot, allowing the documented replacement-carousel pointer-token overwrite (`Carousel.ts:274`; `Swipe.ts:67`, `Swipe.ts:79`; `guides/veneer.md:1802`).
   - The Dropdown sentence matches the re-entry path examined under claim 2 (`guides/veneer.md:1594`).
   - Modal’s different-token release sequence uses shared presence and removes the empty body attribute (`Modal.ts:432`, `Modal.ts:440`; `guides/veneer.md:2049`; `Modal.test.ts:608`).

   The report records its sweep pattern and paths (`j-snapshot-report-2.md:66`). The guide gate’s recorded success does not settle the contradicted behavioral sentence.

5. **UNRESOLVED — independent mutation replay is absent; the supplied instrument, gates, and scope otherwise check out.**

   `j-snapshot-mutations-2-orchestrator.log.txt` is absent. The brief explicitly reserves this clause for the Orchestrator’s later replay. That replay, including named failing assertions and restored digests, would settle it.

   I attacked whole-file mutation results that might fail only unrelated tests. The instrument reads individual assertion results and requires the named case among the failures before reporting `EXACT` or `JOINED` (`j-snapshot-mutations-2.py:119`, `j-snapshot-mutations-2.py:159`). The supplied rows therefore bind as follows; a `JOINED` result does not mean only its named case failed.

   | Proof in `HostSnapshot.test.ts` | Distinguishing mutation and assertion |
   |---|---|
   | Partial Button/Collapse restoration, `:618` | Last-holder-only removal: empty class remains. `EXACT`; the whole round-1 substitution also names this failure. |
   | Button-triggered later restoration, `:492`; overlapping late-empty restoration, `:524` | Forget presence at the first departure: final class absence fails. Each appears among the whole-file row’s named failures. |
   | Sequential restoration in either order, `:557` | Read presence afresh at each save: final class/style absence fails. Explicitly named `JOINED`. |
   | Button restoration destroys Collapse, `:580` | Forget presence early: trigger class absence fails. Explicitly named `JOINED`. |
   | Style hand-off, `:799` | Forget presence early: final style absence fails. Explicitly named `JOINED`. |
   | Overlapping class/style restorations, `:828`, `:862` | Replace shared presence with a fresh element reading: final attribute absence fails. Each has an explicitly named `JOINED` row. |
   | Original absence, `:43` | Read presence at restore time: the bare element retains its empty class. Explicitly named `JOINED`. |
   | Same-snapshot presence take-back, `:641` | Delete take-back: final removal after the subsequent restore fails. `EXACT`; it does not cover claim 1’s empty intermediate result. |
   | Interrupted restoration, `:668` | Drop inherited published targets and leaving records: nested-return `data-second` is `"changed"` instead of `"two"`. Named `JOINED`. |
   | Retitled same-snapshot re-entry, `:200` | Drop that hand-off: final class absence fails. Named `JOINED`; this coupled mutation does not isolate the published-target change from the presence change. |
   | Single target write, `:711` | Ignore `written`: the supplied run records 44 writes instead of 1. `EXACT`. |
   | Dropdown reproduction, `:750` | Drop hand-off: nested-return placement remains `"bottom"`. Insert late write: delivered records become nonempty. Respectively `JOINED` and `EXACT`. |

   Evidence: `j-snapshot-mutations-2.log.txt:3` through its named mutation rows. The Modal case has supplied green evidence and a discriminating final absence assertion, but this instrument supplies no Modal mutation-red row; I do not infer one from its green result.

   The current implementation/test hashes match the logged digests. The supplied logs end with:

   `receipt: restored byte for byte`

   That is the instrument’s restoration receipt, not a `prove` receipt.

   The Orchestrator log records the claimed gate exits (`j-snapshot-gates-2.log.txt:10`, `:25`, `:28`, `:35`, `:82`, `:95`, `:108`). The retained and current status agree on the owned files. Inspection of the added code found none of the prohibited syntax named in this claim; `HostSnapshot.ts` contains imports and its class. The report states that no `prove` call was made (`j-snapshot-report-2.md:7`).

**Findings fitting no claim:** none.

**Attacked and held**

- **Target ownership and re-entry:** nested restoration skips the entry marked written, completes other targets still owned by the snapshot, and leaves targets taken by another snapshot alone (`HostSnapshot.ts:146`, `:299`, `:311`). A save after an earlier write completed reads live state; a save inside its reaction can still take the published original. Those are intentionally different readings.
- **Throw cleanup:** an invalid token can throw before later targets are written; `finally` withdraws remaining owned targets and releases leaving records without attempting attribute removal (`HostSnapshot.ts:182`; `HostSnapshot.test.ts:296`, `:311`). An empty attribute after that path is the documented exception.
- **Presence preservation:** an originally present empty attribute is retained, and an unrecorded consumer token/property prevents removal (`HostSnapshot.test.ts:43`, `:75`, `:93`). Neither is claim 1’s absent-original counterexample.
- **Consumer sequences:** Button and Collapse now share trigger-presence history; Modal’s different open tokens share body-presence history; Dropdown’s nested placement destruction completes pending restoration. Tab’s independent target values and Carousel’s separate swipe snapshot remain bounded as documented. Bootstrap’s source supplies the corresponding token writes, but its `dispose()` does not implement Veneer’s restoration contract (`bootstrap/js/src/button.js:36`, `collapse.js:244`, `modal.js:245`, `base-component.js:39`).
- **Delegate and validation:** the shared-trigger scenario survives E12: Button drives the trigger and Collapse drives the panel. Marks are keyed by route and driven host; an outside panel is skipped before marking (`Delegate.ts:534`, `:560`, `:577`, `:885`). The repair changes neither vocabulary validation nor option parsing (`validators.ts:46`, `:116`; `helpers.ts:217`, `:265`; `parsers.ts:114`).

**Referrals**

- Orchestrator: reproduce claim 1’s exact same-snapshot take-back sequence before briefing its repair; preserve the existing successor-record and consumer-token cases.
- Orchestrator: perform the reserved mutation replay.
- Brief owner: the named `units/j-w2-terrain-record.md` was missing, and a filename search under the scaffold checkout found no replacement.

**Bounds**

No browser test, build, mutation, or gate was rerun. No files were written and no agents were spawned. Claim 1 is a source-and-platform derivation, not a newly executed browser result. No `prove` call was made; none was refused. Other lanes’ verdicts were not read.

VERDICT: FAIL 1, 4, 5; outside the claims: none
