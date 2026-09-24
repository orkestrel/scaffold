# J-SNAPSHOT-SHARED design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d599-f924-7753-88a2-4ab887ab80eb`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-snapshot-shared-design-analyst.jsonl` (launch copy under `tmp/codex/`); 49 commands; 458 s; usage {"input_tokens":1454500,"cached_input_tokens":1314816,"cache_write_input_tokens":0,"output_tokens":13183,"reasoning_output_tokens":4403}. Retained verbatim from the exec's last message.

---

1. **Classify the bounds as restoration defects, currently documented as limits.**

   All Veneer references below name files at `e0dee7e`. **Read** identifies source or contract text; **inferred** identifies a source-derived consequence or proposed behavior. No files were edited, no tests were run, and no agents were spawned.

   **Read:** A target is an element, category, and name. Ordinary saves read its current value independently for each snapshot; only a pending restoration supplies another snapshot’s recorded value. Shared attribute presence does not share target values (`src/browser/types.ts:325–350`; `src/browser/HostSnapshot.ts:103–135`, `266–268`, `328–338`).

   **Inferred — Tab reproducer:** Mount this list; panes, wrappers, transitions, and a delegate are unnecessary:

   ```html
   <div class="nav">
     <button data-bs-toggle="tab" class="active">A</button>
     <button data-bs-toggle="tab">B</button>
   </div>
   ```

   Construct `a = new Tab(A)` and `b = new Tab(B)`. Call `await a.show()` while A is already active, then `await b.show()`, then `await a.show()`. Destroy `b`, then `a`.

   A’s refused initial show saves no swap tokens. B subsequently records A active and B inactive; A’s later swap records the opposite. After the last destruction, **B carries `active` and A does not**, contrary to the markup. A also retains `tabindex="-1"` from its later first save. Construction’s initial attributes and swap state have different recording times (`src/browser/Tab.ts:149–175`, `214–225`, `288–335`, `340–349`, `371–381`). This is the guide’s delayed-first-swap bound without requiring its delegate (`guides/veneer.md:1328–1337`).

   **Inferred — Carousel reproducer:** Mount a `.carousel` without `pointer-event`, containing an initially active custom-element `.carousel-item` and an inactive ordinary `.carousel-item`. The custom element observes `class`. Construct a touch-enabled carousel and complete `next()`. Then arm a one-shot reaction on the outgoing item’s restoration to construct a replacement carousel on the same host, also touch-enabled. Destroy the original; then destroy the replacement.

   The original releases its registry claim and restores its items before destroying its swipe. The replacement therefore constructs legally while the original swipe still holds its unpublished recording. Its swipe records `pointer-event` present. The original swipe subsequently removes that token, leaving the live replacement without it. The replacement’s destruction adds it back: **after the last destruction the host carries `pointer-event`, although the markup did not** (`src/browser/Carousel.ts:180–191`, `265–276`, `576–585`; `src/browser/Swipe.ts:67–68`, `79–82`; `src/browser/constants.ts:331`, `369–371`). The guide states the intermediate failure (`guides/veneer.md:1906–1913`).

   **Read:** The existing carousel replacement proof constructs during the host token’s restoration and disables the replacement’s touch handling. It does not exercise this earlier item-restoration interval (`tests/src/browser/Carousel.test.ts:1146–1182`).

2. **Recommend A, with explicit terminal release and an amendment to restoration timing.**

   **Inferred — options and cost:**

   | Option | Cost and ruling |
   |---|---|
   | A: shared target records | Adds shared holding bookkeeping and changes partial restoration. Closes the named defects and other reachable target overlaps through the existing mechanism. Recommend. |
   | B: shared engine snapshots | A tab’s destruction must not restore an entire live list, so sharing also needs group lifetime management. Carousel replacements must join across the predecessor’s destruction interval. This becomes another ownership mechanism and leaves unrelated overlaps unresolved. |
   | C: retain the bounds | Requires no mechanism change, but accepts the concrete final-state defects above. |
   | D: engine-specific restoration ordering | Cannot generally repair ordinary overlapping lifetimes or arbitrary destruction order. It would duplicate target ownership policy in engines. |

   **Inferred — target contract:** Keep the existing target identity: element plus category plus name. Maintain one baseline value, including absence and property priority, for each continuous holding interval. The first save reads it; later snapshots join it without reading the engine-written value. Repeated saves by the same snapshot remain idempotent. Derive whether another holder exists from the holdings; do not maintain an independent count or “shared” flag. These extend the existing identity and value model (`src/browser/HostSnapshot.ts:105–126`, `266–268`).

   A restoration relinquishes its current holdings before its DOM writes:

   - For a target another snapshot still holds, it writes **nothing**.
   - For a target it releases last, it publishes the shared baseline for restoration.
   - It restores independently held targets normally, in the existing category order.
   - A non-last restoration does not reconstruct another engine’s desired state. The current DOM value remains until an engine writes again or the final restoration writes the baseline.

   **Inferred — takeover and re-entry:** Extend the existing pending-restoration mechanism, rather than placing an independent write-back loop beside it. Keep a last-released baseline available while its write is pending or running. A save in a synchronous reaction takes that baseline and cancels the interrupted restoration’s remaining ownership of that target. Once write-back has completed and no holding remains, a new save reads the live element, including intervening consumer edits. Cleanup must distinguish the departing holding and pending entry from successors created during a reaction, including successors owned by the same snapshot (`src/browser/HostSnapshot.ts:138–154`, `307–346`; `tests/src/browser/HostSnapshot.test.ts:157–294`).

   Nested `restore()` must still drain the interrupted snapshot’s pending work, except the entry whose write is running. Targets retained by another live holder are released, not written. Mark a running write before invoking the platform, and ensure the interrupted call performs no further writes after nested completion (`src/browser/HostSnapshot.ts:145–160`, `315–321`; `tests/src/browser/HostSnapshot.test.ts:701–780`, `783–885`).

   **Inferred — E13 distinction requiring an explicit ruling:** The **earliest saved value** remains authoritative and now survives ordinary, non-overlapping restorations too. The literal rule that the earliest-recording restoration itself performs the write cannot remain unchanged alongside “a non-last holder writes nothing.” Under A, the last release performs the write using the earliest baseline.

   This is an observable contract amendment, not merely an implementation detail. Existing overlap tests assert which value is visible inside a nested restoration, and another expressly expects a later snapshot’s contaminated value after destruction (`tests/src/browser/HostSnapshot.test.ts:359–417`, `458–489`; `src/browser/types.ts:372–376`). Rewrite those timing expectations under the last-release rule while retaining earliest-value precedence. Remove save-order machinery only where the shared record makes it redundant.

   **Read — presence qualification:** The brief’s “only the last holder” shorthand does not describe all presence cleanup at this pin. `#leave` returns absence even when holders remain; restoration can therefore remove an empty attribute during a partial release. A test expressly requires this while a collapse remains live (`src/browser/HostSnapshot.ts:233–262`; `tests/src/browser/HostSnapshot.test.ts:618–638`). **Inferred — recommendation:** Preserve that tested partial cleanup and reconcile the ruling’s wording. Do not copy `#leave`’s boolean as a last-target-holder predicate.

   **Inferred — failures:** If a write throws, withdraw the failing restoration’s remaining pending entries and release its holdings, preserving the existing withdrawal behavior. Do not erase another live snapshot’s holding or baseline. A fresh save after complete withdrawal reads the host again (`src/browser/HostSnapshot.ts:187–193`; `tests/src/browser/HostSnapshot.test.ts:296–356`).

   **Read — terminal-lifetime exception:** Successful `Alert.close()` releases its registry claim and aborts its controller without restoring its snapshot. Subsequent `destroy()` returns immediately. Its saved token therefore needs an explicit non-writing release when target records become shared (`src/browser/Alert.ts:126–151`, `172–174`). The guide requires the removed alert to retain its closed state (`guides/veneer.md:1144–1149`).

   **Inferred — exact public-surface change:** Add this member to `HostSnapshotInterface`, implemented by `HostSnapshot`:

   ```ts
   clear(): void
   ```

   `clear()` relinquishes this snapshot’s saved holdings and pending restoration ownership without DOM writes. Other holders retain their baseline; a final clear forgets it. Repeated clearing does nothing. It also releases associated presence holdings. Call it on Alert’s successful-close path after the post-`closed` lifetime check, before ending that lifetime; do not put it in `#release()`, which destruction also uses.

   Amend the documentation of `HostSnapshotInterface.save` and `restore`; retain their signatures and `HostSnapshotTarget`. No snapshot injection options, engine group API, wrapper class, dependency, or new barrel export is required. The class and types already ship through the browser barrel (`src/browser/types.ts:328–389`; `src/browser/index.ts:1`, `7`).

   **Inferred — affected engines:** Every row below can reach overlapping saved targets; ordinary disjoint use retains its current behavior. Registry exclusivity is per engine class, not per DOM target (`src/browser/Registry.ts:9–10`, `33–38`).

   | Engine | Reachable overlap and evidence |
   |---|---|
   | Tab | Controls in one list save each other’s tokens and attributes. The named reproducer changes (`src/browser/Tab.ts:174–175`, `340–357`). |
   | Carousel | A replacement’s swipe joins the predecessor swipe’s host token before the latter restores. Item records also participate if the replacement slides during restoration (`src/browser/Carousel.ts:265–276`, `576–585`). |
   | Collapse | Distinct panels can share a trigger naming them; each saves its `collapsed` token and `aria-expanded` (`src/browser/Collapse.ts:323–326`, `386–394`). |
   | Dropdown | Different toggles can resolve the same sibling menu and save its `shown` token. A dropdown can also overlap a collapse on its trigger’s `aria-expanded` (`src/browser/Dropdown.ts:375–381`, `416–420`; `src/browser/Collapse.ts:394`). |
   | Modal | Cross-class owners can share its host’s `shown`, `role`, and `aria-modal` targets. Ordinary modals sharing the body’s same `open` token already use one snapshot, so that arrangement is not independently defective (`src/browser/Modal.ts:483–492`, `507–531`). |
   | Offcanvas | Can overlap Modal on the same host’s `shown`, `role`, and `aria-modal`; their registries are separate (`src/browser/Offcanvas.ts:96`, `461–468`; `src/browser/Modal.ts:91`, `483–492`). |
   | Toast | Can share host tokens with an Alert, Collapse, Modal, or Offcanvas; same-class duplicate ownership is separately refused (`src/browser/Toast.ts:59`, `111`, `266–269`; `src/browser/Alert.ts:126`). |
   | Tooltip | Shares `aria-describedby` with a Popover on the same trigger. Its placement can also share the reference’s `anchor-name` (`src/browser/Tooltip.ts:743–752`; `src/browser/Placement.ts:172–173`). |
   | Popover | Uses Tooltip’s implementation under a separate profile and registry, so the preceding overlap is admitted (`src/browser/Popover.ts:16–29`, `43–60`; `src/browser/Tooltip.ts:504–509`). |
   | ScrollSpy | Different scrolling hosts can use overlapping navigation targets; their deliveries save the same links’ `active` tokens. Tab and Button can also write those tokens (`src/browser/ScrollSpy.ts:159–161`, `295–305`, `360–364`). |
   | Alert | Its closing `shown` token can overlap another class’s snapshot. Successful close additionally needs `clear()` to end its holding without restoring (`src/browser/Alert.ts:126–151`). |
   | Button | A button on a tab control shares the default `active` token with Tab (`src/browser/Button.ts:55–58`; `src/browser/constants.ts:84–86`; `src/browser/Tab.ts:342`). |
   | Swipe | Independently constructed swipes on one host share `pointer-event`; construction has no registry claim (`src/browser/Swipe.ts:46–73`). |
   | Placement | Different placements can share a reference’s `anchor-name`; static placements can share the same element’s popper attribute (`src/browser/Placement.ts:105–108`, `172–173`, `279–282`). |

   **Read:** The snapshot consumer population also includes `Isolation` and `ScrollLock`. Isolation already shares one snapshot per element’s inert claims; ScrollLock shares one per document’s lock (`src/browser/Isolation.ts:130–156`; `src/browser/ScrollLock.ts:65–74`, `113–123`). **Inferred:** Preserve those domain ownership mechanisms. Their snapshots join the new rule when an independent snapshot saves the same target; ScrollLock’s compensation can overlap Modal or Placement properties (`src/browser/ScrollLock.ts:89–104`; `src/browser/Modal.ts:488–489`; `src/browser/Placement.ts:154–157`).

   **Inferred — scope limit:** A shares recordings, not live write intent. It does not arbitrate ordinary engine writes, whole `class` attributes against individual tokens, or CSS shorthand against longhand targets. It also does not stop Placement’s explicit `hidePopover()` during destruction (`src/browser/HostSnapshot.ts:266–268`; `src/browser/Placement.ts:236–256`).

   Partial restoration has a specific Tooltip consequence: destruction aborts before discarding the tip, and discard then skips removing its description id. A deferred snapshot restoration can therefore leave the removed tip’s id alongside the surviving tip’s id until final release. State and test that cost rather than claiming A fully composes live tooltip ownership (`src/browser/Tooltip.ts:490–501`, `720–738`).

3. **Require behavioral proofs, separating new expected reds from preserved contracts.**

   **Inferred — expected red on `e0dee7e`:** These are proposed cases, not executed results.

   | Case | Required assertion | Mutation distinguished |
   |---|---|---|
   | Delayed first Tab swap | Run the minimal sequence above, assert original active membership and tab stops after destruction; repeat with reversed destruction order. | Independent per-snapshot values; relying on destruction order. |
   | Tab with panes and dropdown state | Exercise the same delayed save with panes and a dropdown; assert original saved attributes and tokens, plus untouched consumer edits. | Sharing only control tokens or only attributes (`src/browser/Tab.ts:340–357`). |
   | Carousel replacement during item restoration | Replacement remains touch-enabled and keeps `pointer-event` after the original destruction; final destruction removes it when originally absent. | Sharing only pending restorations; fixing only the existing host-token reaction case. |
   | Shared attribute | Save, write, join, write; the first restoration leaves the current value untouched, and the last restores the original. Exercise each destruction order, absence, and empty string. | Joining by reading current DOM; writing on every release; conflating absence and empty (`src/browser/HostSnapshot.ts:117–126`). |
   | Shared token | Exercise initially present and absent tokens, with each release order; inspect intermediate membership and final attribute presence. | Sharing presence alone; restoring a non-last token. |
   | Shared inline property | Preserve the earliest value and `important` priority; retain an unrelated consumer property. | Dropping priority or sharing only attributes and tokens. |
   | Shared collapse trigger | Drive distinct panels that name one trigger; destroying one leaves the shared targets untouched, and final destruction restores the original trigger. | Engine-specific Tab/Carousel fixes that bypass other consumers. |

   **Inferred — regression and acceptance proofs:** These need not be red on the unmodified pin. They must fail under the named mutation of the implementation:

   - **Fresh interval and duplicate save:** After final restoration or clear, edit the target and start another save interval. Restore to that new baseline. Repeated saves by one holder must not postpone final release. Mutations: retain a stale record; increment ownership on every save. Existing first-save and forget behavior is asserted at `tests/src/browser/HostSnapshot.test.ts:985–1003`.
   - **Takeover before, during, and after write-back:** Preserve the published baseline before completion; preserve consumer edits after completion. Include self-save and a successor using the same snapshot. Mutations: delete publication before invoking the platform; read the half-restored DOM; let outer cleanup erase a successor. Existing cases begin at `tests/src/browser/HostSnapshot.test.ts:157`, `231`, `267`, and `888`.
   - **Nested completion:** Read remaining attributes inside the nested return, then record that the outer restoration produces no later mutations. Retain the real Dropdown/Placement scenarios. Mutations: invocation-local pending work; omitting the running-write mark (`tests/src/browser/HostSnapshot.test.ts:701–885`).
   - **Failure cleanup:** Retain the existing throwing-write cases; add a failure while another live holder remains. Mutations: leak abandoned publication; clear another holder’s baseline (`tests/src/browser/HostSnapshot.test.ts:296–356`).
   - **Presence:** Retain absent-versus-empty attributes, unrelated tokens/properties, partial cleanup, and save-back interleavings. Mutation: replace current presence cleanup with a last-holder-only check (`tests/src/browser/HostSnapshot.test.ts:43–90`, `557–698`, `917–982`).
   - **Completed Alert:** Close successfully, reuse the node, and let a fresh engine save and restore `show`. It must use the post-close baseline. Also retain destruction during close, including inside `closed`, where restoration still applies. Mutations: omit `clear()`; call it from the shared `#release()` path; clear before the completed-event lifetime check (`src/browser/Alert.ts:137–151`).
   - **Cross-class partial state:** Exercise Tooltip/Popover description overlap and Placement’s shared reference property. Assert the chosen intermediate semantics and final baseline; do not silently replace them with a desired-state stack (`src/browser/Tooltip.ts:743–752`; `src/browser/Placement.ts:172–173`).

   **Inferred — contract replacement:** Rewrite the contaminated-value assertion at `tests/src/browser/HostSnapshot.test.ts:488` and the affected intermediate readings at `359–417`. Preserve their interleavings as proofs of the new ruling; do not simply delete them.

   For the implementation unit, record the exact scoped command and collected runtime failures before changing production code, then rerun it green. The available browser command is `npm run test:src:browser -- <test paths>` (`package.json:63`). A missing `clear()` import or method is not a valid behavioral red for this defect.

4. **Keep the unit centered on HostSnapshot and serialize the shared files.**

   **Inferred — owned files:**

   - `src/browser/HostSnapshot.ts`: shared records, release, takeover, re-entry, failure cleanup, and `clear()`.
   - `src/browser/types.ts`: `HostSnapshotInterface.clear`, revised `save`/`restore` contracts, and affected restoration remarks.
   - `src/browser/Alert.ts`: successful-close release only, plus its contract wording.
   - `tests/src/browser/HostSnapshot.test.ts`, `Tab.test.ts`, `Carousel.test.ts`, and `Alert.test.ts`.
   - `tests/src/browser/integration.test.ts`: cross-engine compositions.
   - `tests/setupBrowser.ts`: any reusable reaction fixtures or case tables; no production behavior substitutes.
   - `guides/veneer.md`: Ownership and restoration, Tab, Carousel, Alert, the new public member, and affected restoration qualifications.
   - Restoration TSDoc in the affected engine classes listed above, where it otherwise promises immediate unconditional write-back. No implementation changes there beyond Alert.

   **Inferred — order:** Land after J-GUARDS so this unit does not compete for `Alert.ts`, `types.ts`, engine imports, or option calls. Land after J-SAMEWAY so the changed shared restoration semantics are checked against its final Modal/Offcanvas behavior. Leave `validators.ts`, `helpers.ts`, guard declarations, and `resolveOptions` untouched. The campaign queue already places J-SNAPSHOT-SHARED after J-GUARDS and the takeover unit (`scaffold/.orkestrel/veneer/engine/plan.md:25`).

   **Inferred — acceptance criteria:**

   - The Tab and Carousel reproducers produce the original saved values after final destruction, and the live carousel keeps its pointer token.
   - Non-last target release makes no target write; final release restores the earliest baseline regardless of release order.
   - New intervals read fresh DOM values; duplicate saves do not create extra holdings.
   - Takeover, nested completion, running-write exclusion, failure withdrawal, and the existing presence guarantees remain proven.
   - Successful Alert close leaves no holding and performs no restoration; interrupted close retains destruction’s restoration behavior.
   - The Orchestrator explicitly accepts the E13 writer-timing amendment and reconciles the presence wording.
   - Types, implementation, tests, and guide state the same partial-restoration semantics and limits.
   - The implementation unit records its scoped red/green and mutation evidence, then passes the repository’s required acceptance gates. This design round claims no execution evidence.

PROPOSAL: Adopt shared per-target baselines with restoration only on final release, add `HostSnapshotInterface.clear()` for successful Alert closure, and explicitly amend E13’s writer timing while preserving takeover, re-entry completion, and tested presence cleanup.
