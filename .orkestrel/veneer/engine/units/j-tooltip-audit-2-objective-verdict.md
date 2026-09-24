# J-TOOLTIP audit round 2 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d37e-8f47-7a42-b10c-ac7b91bf7931`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tooltip-audit-2.jsonl` (launch copy under `tmp/codex/`); 39 commands; 546 s; usage {"input_tokens":3427260,"cached_input_tokens":3197184,"cache_write_input_tokens":0,"output_tokens":13731,"reasoning_output_tokens":4594}. Retained verbatim from the exec's last message.

---

Objective lane. Source review against the supplied execution records; new behavioral counterexamples below were not executed.

1. **CONFIRMED — Construction and options.** Attacked constructor precedence with invalid overridden attributes, explicit `false`, manual triggers, duplicate ownership, and disabled hiding. `resolveOptions` skips an overridden attribute before parsing; vocabulary validation precedes the registry claim; `hide` reads no enabled state. These attacks do not break the implementation (`src/browser/helpers.ts:220`, `src/browser/Tooltip.ts:140`, `:227`, `:330`). The assertions at `tests/src/browser/Tooltip.test.ts:317`, `:585`, and `:990` distinguish those alternatives. Removing retitling breaks the attribute assertions at `:117`; its `JOINED` row binds retitling, although it does not establish option precedence (`j-tooltip-mutations-2.log.txt:28`). Changing the default offset and removing the disabled-click guard bind their named cases (`:31`, `:8`).

2. **BROKEN — The claimed sanitizer proofs are absent or insufficient.** The implementation routes template and markup strings through the sanitizer, but `tests/src/browser/sanitizers/NativeSanitizer.test.ts:78` supplies a nonempty configuration; it never compares omitted configuration with `{}`. Its ARIA assertions check spelling and the presence of `aria-label` and `aria-describedby`, rather than the claimed complete membership (`:47`). Deleting another ARIA entry, such as `aria-valuetext`, leaves these assertions satisfied. The markup case supplies permitted attributes on their permitted elements, so it does not distinguish per-element restrictions from broader permission (`:63`).

   The mutation “the native sanitizer drops its configuration” runs **Tooltip.test.ts**, whose tip lookup depends on class preservation; that `JOINED` result does not bind the missing configuration comparison or the native sanitizer’s per-element restriction proof (`j-tooltip-mutations-2.py:70`, `j-tooltip-mutations-2.log.txt:11`). Smallest correction: add the omitted-versus-empty comparison, independently specified ARIA membership, and forbidden attribute/element pairings, then retain their discriminating red readings.

   The template-bypass and markup-bypass mutations do bind the supplied-sanitizer recorder and markup assertions (`tests/src/browser/Tooltip.test.ts:386`, `:413`; mutation log `:9`, `:10`). Keeping an empty slot binds `:484` through mutation log `:12`.

3. **BROKEN — A build continues writing after destruction.** Give `title` a function that returns an element on its first call, then calls `tooltip.destroy()` and returns that element on its second call. The first call passes `#filled`; the second runs inside `#build`. After destruction, execution still calls `fillSlot`, moves the element, and records its origin. The outer lifetime check occurs only after `#build` returns ([Tooltip.ts:445](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts:445), `helpers.ts:498`, `Tooltip.ts:298`). The show resolves `false`, but the element has nevertheless been removed from its original parent after destruction.

   Door trace:
   - The pre-show dispatch checks identity, lifetime, and blocked state.
   - Discard and build each receive only an outer check; build’s template writes, class writes, id write, content callbacks, slot writes, and returns have no intervening ownership checks.
   - The described-by write receives an identity/lifetime check.
   - Append and inserted dispatch additionally check the container.
   - Placement receives an identity/lifetime check.
   - Adding `shown` and completing the show wait additionally check `shown`.
   - Hide dispatch checks `shown`; token removal and its wait check token absence, but **not container ownership**. Moving the fading tip to another container during the wait still permits `#discard` to remove it (`Tooltip.ts:342`, `:346`, `:350`).
   - Completed-event re-entry is deliberately admitted after clearing the change identity (`:322`, `:352`).

   Smallest correction: carry the operation’s ownership check through build and its reaction-capable writes, stop immediately after a callback invalidates it, and check the retained container before hide removes the tip.

   The existing show-dispatch, inserted-destruction, and in-flight mutations bind their named entry points, not these internal doors (`j-tooltip-mutations-2.log.txt:2`). Removing the inserted check reaches `Placement` with a disconnected tip and rejects instead of resolving `false`; that distinguishes the check but proves nothing about slot-move reactions. The fade mutation removes only the **show** wait; its row does not establish a red reading for removal of the hide wait (`j-tooltip-mutations-2.py:34`, mutation log `:29`).

4. **CONFIRMED — Interactions, delays, and descendant construction.** Attacked leave/re-enter timing, simultaneous hover and focus, disabled click followed by enabling, and destruction during descendant construction. Timer replacement, callback re-reading, the active-trigger check, and the hide-completion retry address those attacks (`Tooltip.ts:599`, `:631`, `:641`, `:653`, `:663`). A descendant constructed after its container’s signal aborts destroys itself at constructor completion (`:245`, `:585`). Existing descendant owners are reused; their independent lifetime is not transferred.

   The timer mutation is distinguished by the **return-and-rearm** elapsed-time assertion at `tests/src/browser/Tooltip.test.ts:747`, not merely by the earlier leave assertion. Removing the active-trigger read, hide-completion retry, disabled-click guard, or descendant construction binds the cases at `:796`, `:751`, `:820`, and `:858` respectively (`j-tooltip-mutations-2.log.txt:5`, `:6`, `:7`, `:8`, `:30`).

   The requested E12 attack has no Tooltip data-API route to reach. `Delegate.#activate`, its conflict population, and its route-mark union exclude Tooltip (`Delegate.ts:467`, `:504`, `:913`). Nested or destroyed `Delegate` instances therefore neither mark nor construct Tooltip. Nested **Tooltip containers** use `#context` independently and may drive the existing descendant owner; E12 supplies no once-per-event guarantee for that mechanism.

5. **BROKEN — Destruction can miss an element already moved into a slot.** Use a connected custom element as content, with a one-shot `disconnectedCallback` that destroys the tooltip. `replaceChildren` moves it into the detached tip and invokes its reaction before returning. Destruction finds neither the new tip in `#tip` nor the element in `#origins`: those assignments occur later. After destruction returns, `#build` records the stranded element and ultimately returns to a failed outer check (`helpers.ts:498`, `Tooltip.ts:450`, `:453`, `:300`, `:400`). This ordering follows the platform’s [custom-element reaction rules](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions).

   Smallest correction: publish the element’s restoration record before moving it, then check lifetime immediately after the move. Preserve the rule that a consumer’s subsequent external move is left alone.

   The modal, early-abort, later-abort, Escape/replacement, and prevented-dismissal paths survive their supplied attacks (`tests/src/browser/Tooltip.test.ts:897`, `:915`, `:1027`; mutation log `:18`–`:22`). The constructor reaction proof aborts on a **title attribute** write; it does not cover this slot-move reaction. E17’s post-close bridge is supported by `j-tooltip-probe-1.log.txt:20` and implemented at `Tooltip.ts:560`.

6. **CONFIRMED — Arrow implementation and centering proofs.** Attacked omission of absolute positioning, swapping the centering axis, invalid SVG input, and restoration. Validation includes the optional arrow; side is written before arrow measurement; every arrow declaration uses the placement snapshot, and subsequent writes stop after abort (`Placement.ts:71`, `:186`, `:249`). Tooltip supplies only an HTML arrow (`Tooltip.ts:471`).

   The direct Placement and Tooltip cases fail on centering before the repair (`j-tooltip-round2-red.log.txt:14`, `:47`) and pass in the retained green run (`j-tooltip-round2-green.log.txt:8`). The static-position and wrong-axis mutations bind the Tooltip geometry assertions (`tests/src/browser/Tooltip.test.ts:1154`; mutation log `:23`, `:24`). The invalid-arrow assertion at `tests/src/browser/Placement.test.ts:348` is present, but the earlier aggregate failure in the baseline red run does not independently establish its red reading. Dropdown supplies no arrow and its test file is unchanged.

7. **BROKEN — Slot replacement can lose an earlier element.** While hidden, supply content under selectors `.tooltip-inner` and `div.tooltip-inner`, using different elements originally held elsewhere, then show and destroy. Both selectors resolve to the same slot. The later fill ejects the earlier element, but `placed` retains both elements. Destruction deletes the earlier record and skips restoration because its parent no longer equals the recorded slot (`Tooltip.ts:444`, `:450`, `:452`, `:479`). This was the engine’s replacement, not a consumer moving the element externally.

   Smallest correction: track actual slot occupancy and restore an engine-displaced element before replacing that slot. Keep external moves untouched. The reaction-order failure in claim 5 independently breaks move-back.

   The existing proof binds ordinary replacement, detached-origin destruction, and changing function content (`tests/src/browser/Tooltip.test.ts:1181`). Removing destroy-return binds `:1221`; removing build-return binds `:1244`; removing fill-return is distinguished by the **hidden refill** at `:1249`, because a shown rebuild’s return can otherwise compensate (`j-tooltip-mutations-2.log.txt:25`, `:26`, `:27`). None of these assertions supplies overlapping selectors or destruction inside the move.

8. **BROKEN — Contract truth, guide guarantees, and proof coverage.**
   
   - **`fill` can resolve `true` after destruction.** After showing custom-element content, arm its connection callback to destroy the tooltip when it returns home. Refill that slot. `#return` reconnects it and destruction clears the tip; `fill` then evaluates `this.shown ? this.show() : true` and returns `true` (`Tooltip.ts:382`). This contradicts [types.ts:1693](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/types.ts:1693). Recheck lifetime after returning content.
   - **The guide’s “after each write” guarantee is false** at the build doors identified in claims 3 and 5 (`guides/veneer.md:2467`). Its restoration paragraph also omits the E13 amendment’s required nested-restoration bound (`:2475`; `decisions.md:77`). Repair the doors and state the carried snapshot limitation; do not change `HostSnapshot` in this unit.
   - **The blanket per-case red claim is unsupported.** The baseline removed exports and collected no behavioral cases in the affected suites (`j-tooltip-report.md:59`). The mutation instrument classifies failed **titles**, without retaining the failing assertion or distinguishing assertion failure from runtime rejection (`j-tooltip-mutations-2.py:175`). A `JOINED` row is not automatically invalid, but only assertions that actually distinguish its edit bind it.

   Remaining proof-binding limits:
   
   | Proof population | Distinguishing mutation | What the retained record establishes |
   |---|---|---|
   | Option precedence and invalid construction | Reverse precedence; remove the relevant validation/registry refusal | Assertions exist; no dedicated behavioral red is retained. Sanitizer/ARIA failures in these cases do not bind option resolution. |
   | UA-style parity | Omit placement’s promotion compensation | Comparison exists at `Tooltip.test.ts:243`; no corresponding mutation row. |
   | Placement options and update | Ignore offset/fallbacks; omit update forwarding | Assertions exist at `:683`; no corresponding row. |
   | Hidden/vetoed hide | Ignore prevention or hidden-state refusal | Assertions exist at `:590`; unrelated tip-lookup failures do not bind them. |
   | Promotion refusal | Ignore failed promotion or omit refused-show cleanup | Assertions exist at `:983`; removing inserted dispatch prevents the refusal listener from being installed, rather than reverting promotion handling. |
   | `buildTip`, `fillSlot`, `writeContent` helper cases | Omit detachment, refusal, removal, function invocation, movement, or the selected writer | Assertions distinguish these edits (`helpers.test.ts:735`, `:753`, `:777`, `:816`), but the instrument runs Tooltip for its helper mutations and does not record these helper cases red. |
   | Native sanitizer cases | Broaden the allowlist, ignore configuration, remove unsupported-target refusal | Green cases exist; the missing comparisons in claim 2 remain missing. |
   | Event/target guards | Remove shape checks or exception containment | The Tooltip detail-accessor containment row binds `validators.test.ts:548`; no row independently binds the other new guard cases. |
   | Parsers | Admit negative delay/unknown trigger; reject valid placement; accept invalid fallback | Negative-delay and unknown-trigger rows bind their named rejection cases. Position, fallback, and positive coercion cases have no retained behavioral red. |
   | Browser exports | Omit Tooltip’s barrel export | The named export assertion is bound by mutation log `:35`. |

   The parser source also admits an uncontained exception: pass `parseFallbacks` an array whose `Symbol.iterator` throws. Installed `parseArray` returns the array unchanged when no guard is supplied; `parsers.ts:355` invokes that iterator outside containment (`node_modules/@orkestrel/contract/dist/src/core/index.js:7002`). Contain this coercion and add its hostile-array control.

   The declaration placement, owned-file status, barrel additions, and recorded gate exits hold on the supplied evidence. The mutation log contains its stated rows and `receipt: restored byte for byte` (`j-tooltip-mutations-2.log.txt:43`). **The Orchestrator replay clause remains UNRESOLVED**, as instructed. The named `j-tooltip-report-2.md` is absent, so its report-specific assertions remain unresolved as well.

**Findings fitting no claim:** none.

**Attacked and held:** Disabled hiding is intentional and agrees with Bootstrap’s `tooltip.js:242`. A settled show rebuilding without `hidden` is intentional. Removing the `shown` token during a show wait, or restoring it during a hide wait, stops the pending call; those token checks do not cover container relocation. Independent existing descendant owners retain their lifetime. E17 permits reopening after a prevented platform-driven hide. Arrow centering is established for the tested cardinal placements; those tests do not establish arbitrary offset/alignment behavior.

**Referrals:** The Orchestrator should execute the content-callback, slot-move reaction, overlapping-selector, hide-relocation, destroyed-fill, and hostile-array controls before accepting repairs. Supply the missing round-2 report and the independent mutation replay. Carry the Popover contract mirror to J-POPOVER; retain snapshot restoration work under E13.

**Bounds:** No files were written, no agents spawned, and no browser tests, builds, mutations, or established gates rerun. No `prove` call was made; there is no refused-call receipt to report. The named W2 terrain record has no Tooltip section; its sanitizer wildcard evidence is instead at `j-engine-terrain-record.md:145`. Source-derived behavioral findings above require Orchestrator reproduction; supplied red/green readings establish only their recorded cases.

VERDICT: FAIL 2, 3, 5, 7, 8; outside the claims: none
