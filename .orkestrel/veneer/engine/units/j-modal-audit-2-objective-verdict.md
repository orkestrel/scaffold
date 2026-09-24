# J-MODAL audit round 2 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d21f-b59f-7fc1-b097-657e3b568074`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-modal-audit-2.jsonl` (launch copy under `tmp/codex/`); 22 commands; 481 s; usage {"input_tokens":2306096,"cached_input_tokens":2139264,"cache_write_input_tokens":0,"output_tokens":12996,"reasoning_output_tokens":5277}. Retained verbatim from the exec's last message.

---

Objective lane — source review against the supplied execution records. Source references below are relative to the modal worktree; record references name files beside the audit brief.

1. **CONFIRMED — Isolation lifetime.**

   The attempted attack was destruction inside an `inert` reaction, before `Modal.show()` stores the constructed isolation. It is contained: the signal listener destroys the isolation synchronously, each construction loop checks its lifetime after claiming, and `#claim` refuses further writes (`Isolation.ts:78`, `Isolation.ts:89`, `Isolation.ts:120`). A token takeover without destruction reaches the explicit local cleanup (`Modal.ts:270`, `Modal.ts:276`). The public signal contract matches these paths (`types.ts:318`).

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | “stops the isolation whose inert write…” | Replace the abort listener’s event name with `vn-never`. Construction continues after modal destruction; the recorder detects subsequent inert writes to other elements (`Modal.test.ts:1076`, `Modal.test.ts:1086`). The whole-file `JOINED` row binds this assertion; its other failures do not establish independent coverage (`j-modal-mutations-2.log.txt:90`). |
   | “destroys the isolation it constructed…” | Remove `isolation.destroy()` from the failed construction door. The remaining inert attributes and active observer distinguish the mutation (`Modal.test.ts:1123`; mutation log:92). |
   | “claims nothing under an aborted signal…” | Remove the already-aborted branch. The initial inert population changes (`Isolation.test.ts:163`; mutation log:91). Its later assertions also distinguish ignoring a subsequent abort (`Isolation.test.ts:170`). |
   | Completed-show destruction | Remove the signal passed by Modal. The isolation survives destruction; inert restoration and focus return distinguish this mutation (`Modal.test.ts:729`; mutation log:43). The re-aim reaches live code. |

2. **BROKEN — The current bounce is supported, but the claimed red-first attribution is false.**

   The supplied original red for “bounces without moving focus when focus is false” fails in `pressKeys` because nothing is focused. Escape never reaches the modal, so that failure does not distinguish the bounce’s focus behavior (`j-modal-red-2.log.txt:210`). The report nevertheless lists it as a red-first behavioral proof (`j-modal-report-2.md:43`).

   The current implementation withstands the stated attacks: destruction, hiding, or an in-flight change after `prevent` or focus prevents the static write (`Modal.ts:464`, `Modal.ts:467`, `Modal.ts:471`). Its current proofs bind as follows:

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | Prevent listener hides | Delete the post-dispatch idle check. With `focus: false`, no later focus check masks the defect; the immediate static-token assertion fails (`Modal.test.ts:1137`, `Modal.test.ts:1152`; mutation log:93). |
   | Focus listener hides | Delete the post-focus idle check. The listener hides synchronously, and the static-token assertion distinguishes the subsequent unwanted write (`Modal.test.ts:1165`; mutation log:94). |
   | Focus disabled | Make the bounce focus unconditionally. The current test observes a completed bounce and then checks that focus remains on the child (`Modal.test.ts:1184`, `Modal.test.ts:1191`; mutation log:95). This `EXACT` row binds the current proof. |

   **Smallest correction:** distinguish the original harness failure from the later valid mutation reading in the report. Retain the current bounce implementation and assertions.

3. **CONFIRMED — Every isolation claims its chain.**

   I tried releasing isolation A after isolation B was constructed under the ancestor A had already cleared. B still owns a false claim; releasing A cannot restore the ancestor’s original inert state (`Isolation.ts:89`, `Isolation.ts:136`).

   The mutation “a clear ancestor takes no claim” makes B skip that ancestor. A’s release then restores `inert`, directly contradicting the assertion at `Isolation.test.ts:152`; B’s final release also checks restoration (`Isolation.test.ts:155`). The original red identifies that assertion (`j-modal-red-2.log.txt:68`), and the current mutation row is `EXACT` (mutation log:96).

   This confirms the stated sibling-release invariant. It does not replace the documented newest-claim rule with a rule that every live isolation wins simultaneously.

4. **CONFIRMED — Delegate lifetime, driven lookup, and focus return.**

   **The writer’s driven lookup is necessary.** I attacked it with nested roots and a vetoed hide. A veto leaves the first modal shown, so an outer route would issue another hide before reaching the later mark check. The lookup at `Delegate.ts:289` stops that duplicate side effect. Removing it produces an extra recorded hide; the prevented events make this observable (`Delegate.test.ts:1272`, `Delegate.test.ts:1291`; mutation log:103).

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | Destroyed inner delegate leaves the target to the outer | Delete the early lifetime read. The destroyed inner route also attempts the vetoed hide, so the recorded hide sequence differs (`Delegate.test.ts:1180`, `Delegate.test.ts:1197`; mutation log:97). |
   | Destroyed dismiss delegate acquires nothing | Delete its lifetime read. The modal registry gains an owner and the host changes (`Delegate.test.ts:1223`; mutation log:98). |
   | Hide inside a preconstructed modal’s `shown` hook | Arm focus return on `shown`. The existing hook completes the hide before the return listener is armed; focus stays elsewhere (`Delegate.test.ts:1238`, `Delegate.test.ts:1252`; mutation log:99). |
   | Nested-root marks | Remove the modal mark or dismiss mark. Prevented show/hide events remain repeatable, exposing duplicate dispatches (`Delegate.test.ts:1291`; mutation log:102, mutation log:104). |

   The post-hide lifetime check also prevents acquisition after a hide listener destroys the delegate (`Delegate.ts:292`, `Delegate.ts:295`; `Delegate.test.ts:1147`). The button fixtures do not independently prove anchor-default ordering, but the source places the lifetime reads before prevention.

   E12’s same-host refusal runs before every route and marks nothing (`Delegate.ts:188`, `Delegate.ts:219`). Existing ownership permits the other route to construct, as E12 requires. Target containment and `closest` resolution remain per delegate.

5. **BROKEN — Guide and contract sentences remain false.**

   - **Bootstrap coercion:** `guides/veneer.md:989` says every other string becomes a dismissible backdrop. For `data-bs-backdrop="[]"`, Bootstrap’s `normalizeData` parses an array (`node_modules/bootstrap/js/src/dom/manipulator.js:29`), which fails Modal’s boolean-or-string type check (`modal.js:56`; `util/config.js:51`). **Fix:** describe normalization followed by validation; restrict the accepted-string statement to values remaining strings after normalization.
   - **Unconditional static token:** `guides/veneer.md:980` says the token “always applies.” The prevent-hook hide case proves otherwise (`Modal.test.ts:1131`), matching the idle guard at `Modal.ts:467`. **Fix:** say that cancellation does not veto the bounce, while the lifetime/state guards still apply.
   - **Return contract:** `types.ts:1214` and `types.ts:1224` promise false when another write changes the shown token “while the call ran.” A synchronous `shown` hook can complete a hide, yet the original show returns true because its final return checks only destruction (`Modal.ts:284`). The supplied focus-return fixture exercises that ordering (`Delegate.test.ts:1238`). **Fix:** limit the token-takeover condition to the checked doors before completed-event dispatch. Preserve completed-event re-entry.

   The takeover-resource proof does bind its mutation: replacing backdrop `??=` with `=` creates another backdrop during the later show, contradicting `Modal.test.ts:1239` (mutation log:106). The retitled hide-after-token-return proof checks that a preceding hide returns false (`Modal.test.ts:1006`). Those repairs hold; they do not repair the sentences above.

6. **CONFIRMED — Controls and removal of the identity conjunct.**

   **Retain the removal.** I tried starting another call while the original call awaited either backdrop or modal motion. `#changing` refuses it (`Modal.ts:361`). A failed `#holds` clears the flag on a path that returns; completed-event dispatch clears it after the old operation’s writes have finished (`Modal.ts:284`, `Modal.ts:327`, `Modal.ts:368`). No continuing successful operation needs an identity comparison.

   The identity log alone proves only that its test population survived deletion, not universal unreachability (`j-modal-identity.py:18`; `j-modal-identity.log.txt:1`). The source invariant supplies the missing reasoning. Removing the in-flight guard has a distinguishable rival outcome: opposite-direction calls cease returning false and the event sequence changes (`Modal.test.ts:311`; mutation log:22).

   The repaired controls bind:

   - **Reduced motion:** replace dialog settling with a `transitionend` wait. With transitions explicitly disabled, `show()` never resolves, so the awaited completion assertion fails (`Modal.test.ts:214`; mutation instrument:283; mutation log:100). The whole-file `JOINED` result supports this case because its own fixture necessarily reaches that wait.
   - **Backdrop validation:** substitute imported `isSelector` for `isClassToken`. `"is on"` is accepted as a selector but is invalid as a class token; the expected construction error disappears (`Backdrop.test.ts:112`; instrument:198; mutation log:62).
   - **Isolation host:** remove validation. `null` produces the wrong error instead of the asserted `AppError` code (`Isolation.test.ts:177`; mutation log:101).
   - **Nested-root controls:** the mark and lookup mutations bind the vetoed event sequence described under claim 4.

7. **CONFIRMED — Scroll-lock selectors are threaded through Modal.**

   I tried replacing `fixed` while leaving a default `.fixed-top` decoy. The modal passes its resolved selectors into the first lock (`Modal.ts:235`); existing document holders retain the first holder’s selection (`ScrollLock.ts:50`). The readonly contract and defaults agree (`types.ts:1178`; `constants.ts:122`; `guides/veneer.md:851`).

   Removing the selector argument pads the default element instead of the replacement, contradicting the assertions at `Modal.test.ts:1205` and `Modal.test.ts:1206` (mutation log:105). Changing or omitting the default selector values contradicts the literal defaults-table assertion (`Modal.test.ts:61`; original red:106). These assertions distinguish their respective mutations.

   This selector ruling does not cover construction-time destruction; O1 below does.

8. **UNRESOLVED — Independent mutation replay remains absent.**

   The required `j-modal-mutations-2-orchestrator.log.txt` is absent. Settle this clause with the Orchestrator’s authorized replay against the landing instrument.

   The remaining clauses are supported:

   - The captured status names owned files (`j-modal-2-status.txt:1`).
   - The type hunks are the granted signal, documentation, and selector changes (`j-modal-2.diff:2018`).
   - The established gate exits are recorded in `j-modal-gates-2.log.txt`; none was rerun or promoted to a finding.
   - The current instrument records `EXACT`/`JOINED`, green restoration runs, and `receipt: restored byte for byte` (`j-modal-mutations-2.log.txt:107`, `j-modal-mutations-2.log.txt:116`). The current source digests match that log.
   - The earlier full run’s missed destruction row is documented before its re-aim (`j-modal-mutations-2-first-run.log.txt:43`).
   - Added source uses the required guards; installed `instanceOf` itself calls `isInstance` (`node_modules/@orkestrel/contract/dist/src/core/index.js:6395`).
   - The report explicitly records no `prove` call (`j-modal-report-2.md:3`).

**Findings fitting no claim**

**O1 — BROKEN: destruction during ScrollLock construction leaks the document lock.**

Use a full-width custom element selected by `fixed`, observing its `style` attribute. Arm its reaction after fixture setup so its first compensation write calls `modal.destroy()`. Construct the modal with `backdrop: false` and `focus: false`, then call `show()`.

The source/platform interleaving is:

- [`Modal.ts:235`](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/Modal.ts:235) starts `new ScrollLock` before assigning `#lock`.
- [`ScrollLock.ts:56`](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/ScrollLock.ts:56) registers the holder, hides body overflow, and reaches the custom element’s padding write.
- `setProperty` invokes custom-element reactions before returning: it carries `[CEReactions]`, whose processing invokes queued reactions synchronously. [CSSOM](https://www.w3.org/TR/cssom-1/#the-cssstyledeclaration-interface), [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).
- The reaction destroys the modal. [`Modal.ts:352`](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/Modal.ts:352) finds `#lock` undefined and releases no lock.
- Construction resumes, can compensate further elements, and returns the lock into the already-destroyed modal. The subsequent lifetime check returns false.
- A second destruction returns immediately. Body overflow and the registered holder remain.

This contradicts the restoration contract at `types.ts:1252` and the post-write lifetime statement at `Modal.ts:59`.

**Smallest correct fix:** make lock acquisition participate in the modal lifetime before its first reaction-capable write, stop subsequent compensation after destruction, and release the partially acquired holder. Cleaning up only after construction returns fixes the leak but still permits writes after destruction. Preserve first-holder selector semantics and shared-lock reference counting.

**Attacked and held**

The remaining sequence doors preserve their phase checks:

- Show checks after the open-token write, dialog adjustment, backdrop await, host append, display and ARIA writes, shown-token write, motion wait, isolation construction, and focus (`Modal.ts:239` onward).
- Hide checks after isolation release, token removal, host motion, display and ARIA writes, backdrop motion, open-token release, padding removal, and lock release (`Modal.ts:300` onward).
- Scroll-position writes schedule scrolling rather than synchronously dispatching scroll listeners. Completed-event listeners may start another change because the preceding operation has finished its writes.
- Backdrop-before-host show timing and host-before-backdrop hide timing match the installed Bootstrap sequence; animation settling intentionally replaces Bootstrap’s transition fallback (`modal.js:114`, `modal.js:245`; `helpers.ts:85`).
- A vetoed hide remaining shown is correct; it is precisely why the delegate’s early driven lookup matters.
- E13’s documented snapshot-restoration bounds are not reported again as new defects.

**Referrals and bounds**

Refer claim 2’s attribution correction and claim 5’s contract/guide corrections to the writer. Refer O1’s exact interleaving to the Orchestrator for browser reproduction before the fix brief; O1 is derived from source and platform ordering, not a new executed browser result.

No browser test, build, mutation, or established gate was run here. No files were written and no agents spawned. No `prove` call was made or refused; its execution workflow falls outside this brief’s allowed actions.

VERDICT: FAIL 2, 5, 8; outside the claims: O1
