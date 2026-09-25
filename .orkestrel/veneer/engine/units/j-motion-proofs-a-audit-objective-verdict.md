# J-MOTION-PROOFS-A audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6fb-2fd8-7932-b400-e2ada766686f`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-motion-proofs-a-audit.jsonl` (launch copy under `tmp/codex/`); 31 commands; 291 s; usage {"input_tokens":1249394,"cached_input_tokens":1090304,"cache_write_input_tokens":0,"output_tokens":7829,"reasoning_output_tokens":2190}. Retained verbatim from the exec's last message.

---

**Claims 2 and 3 fail. Claim 5 remains unresolved.** I inspected `beb7cd8` against `0865c67` without reading the Veneer worktree or running tests.

Source references below are at `beb7cd8`. Evidence filenames refer to `scaffold/.orkestrel/veneer/engine/units/`. Claims 1, 6, and 7 remain the checker’s rulings; the Orchestrator owns disposition of claim 6.

| Claim | Ruling | Evidence and mutation assessment |
|---|---|---|
| **2 — Modal settles every motion it moves** | **FAIL** | The ordinary paths await `#settle()` at `src/browser/Modal.ts:326` and `:375`. Its `Promise.all` awaits the host and cached dialog (`:559`). However, the dialog is selected once during construction (`:191`). A dialog inserted or replaced afterward receives the cascade’s transition but is never passed to settlement. The order proof constructs Modal after creating its dialog (`tests/src/browser/Modal.test.ts:255`, `:268`), so it misses this input. **`modal-base`, `modal-show-dialog`, and `modal-hide-host` distinguish omitted waits for the fixture’s original elements**: the replay names the order assertion as failing (`j-motion-proofs-a-replay-2.log.txt:12`). They do not distinguish a stale dialog reference. |
| **3 — Each completion reads every moved element settled** | **FAIL** | Modal’s `shown` proof reads host, dialog, and backdrop (`tests/src/browser/Modal.test.ts:193`). Its `hidden` proof records the host’s fade and backdrop absence, without retaining the backdrop’s hide animation (`:222`, `:229`). The order proof records only the host subtree (`:262`, `:290`), excluding the backdrop. **`modal-show-skip` and `modal-hide-skip` distinguish skipped host/dialog settlement**, but neither tests skipping Modal’s backdrop wait. Changing `await held.hide()` to `void held.hide()` at `src/browser/Modal.ts:399` would leave these motion assertions unable to distinguish completed backdrop motion from removal that cancels it. This additional mutation was not run. Completion coverage is detailed below. |
| **4 — Offcanvas needed no settlement change** | **CONFIRMED** | `src/browser/Offcanvas.ts` is unchanged from the base. Show awaits panel settlement and `appearing` (`:311`); hide awaits panel settlement and `vanishing` (`:380`). The order proof retains animations from panel and backdrop and checks their finished states at each event (`tests/src/browser/Offcanvas.test.ts:317`, `:343`, `:348`, `:368`). **`offcanvas-show-backdrop`, `offcanvas-show-panel`, `offcanvas-hide-backdrop`, and `offcanvas-hide-panel` each distinguish the omitted wait**, with the named order case failing in the replay (`j-motion-proofs-a-replay-2.log.txt:32`). |
| **5 — Conversion survives the motion ruling** | **UNRESOLVED** | The supplied shell script delegates all cascade changes to an unprovided `plant.py` (`j-motion-proofs-a-plant.sh:15`). It contains no motion declarations itself. The report records converted passes and describes the intended values (`j-motion-proofs-a-report.md:93`, `:98`, `:101`), but the replay contains no plant execution. The unconverted control fails for Modal and Offcanvas; **Backdrop and Alert pass**, according to `:102`. No remaining converted assertion visibly conflicts with the specified scale, timings, easing, or added Offcanvas opacity transition. The exact planted CSS and its execution remain unverified. |
| **8 — The recorded proofs bind** | **CONFIRMED** | The replay records a passing control (`j-motion-proofs-a-replay-2.log.txt:7`), named assertion failures for every mutation, no row lacking `AssertionError` (`:69`), and restoration (`:75`). The instrument restores original bytes in `finally` and compares their digest (`j-motion-proofs-a-mutate-2.py:50`). **`alert-skip`** distinguishes premature removal through the connected-host assertion (`tests/src/browser/Alert.test.ts:109`; replay `:56`). **`reader-seconds`** distinguishes incorrect unit conversion (`tests/setupBrowser.test.ts:1782`; replay `:66`). The remaining mutations and their distinguishing assertions are addressed above and below. This confirms the recorded rows, not completeness of coverage. |

For claim 2, **some exits precede settlement**, as the lifecycle contract requires: refusal, prevention, destruction, supersession, and synchronous takeover can return before `#settle()` (`src/browser/Modal.ts:253`, `:259`, `:324`, `:351`, `:358`, `:373`). A host without the fade token skips it. Once the ordinary animated path enters `#settle()`, neither continuation bypasses its `Promise.all`. Destruction aborts the waits and suppresses completion. The defect is the selected element, not an early successful return from that `Promise.all`.

The smallest stale-dialog input is a connected `.modal.fade` host: construct `Modal(host, { backdrop: false, focus: false })` while it has no dialog, insert a `.modal-dialog`, then call `show()`. `#dialog` remains undefined. The shipped dialog transition lasts `0.3s` (`src/styles/components/_modal.scss:64`), while the host fade uses the `150ms` feedback token (`src/styles/components/_fade.scss:19`, `src/styles/_tokens.scss:448`). The source therefore permits `shown.vn.modal` before the inserted dialog settles. This is a source-derived counterexample, not an executed receipt.

The completion readings are:

| Converted proof | Completion observed | Does it cover every moved element? |
|---|---|---|
| Modal show | `shown.vn.modal` | Yes for its fixed fixture: host, dialog, backdrop (`Modal.test.ts:189`). |
| Modal hide and order | `hidden.vn.modal`; order also reads `shown.vn.modal` | **No backdrop hide motion retained.** Host/dialog recordings detect their cancellation, but backdrop absence cannot establish that its fade finished (`Modal.test.ts:222`, `:277`). |
| Offcanvas slide | `shown.vn.offcanvas`, `hidden.vn.offcanvas` | Panel only (`Offcanvas.test.ts:214`). |
| Offcanvas order | `shown.vn.offcanvas`, `hidden.vn.offcanvas` | Yes: retained panel/backdrop animations prevent removal from concealing cancellation (`Offcanvas.test.ts:321`, `:330`). |
| Backdrop motion | Resolution of `show()` and `hide()` | Yes for its element. Backdrop dispatches no completion event; `shown`, `hidden`, `resolved`, and `settled` are recorder labels (`Backdrop.test.ts:40`, `:44`, `:54`, `:62`). |
| Alert fade and factor | `closed.vn.alert` | The host’s captured animations must finish before removal/event. However, the event callbacks record connection or event identity, **not a fresh animation reading at completion** (`Alert.test.ts:104`, `:116`, `:146`, `:178`). |
| Reduced-motion cases | Call start or resolution | They do not install completion-time motion readers (`Modal.test.ts:324`, `Offcanvas.test.ts:275`, `Alert.test.ts:154`). |

The additional AbortErrors do **not** invalidate the named assertion kills:

- **`backdrop-show-skip`:** the main motion case fails its nonempty-animation/order assertions (`Backdrop.test.ts:35`, `:50`, `:65`; replay `:47`).
- **`backdrop-hide-skip`:** that case fails its settlement ordering/readings (`Backdrop.test.ts:61`, `:65`; replay `:52`).
- **`offcanvas-show-panel`:** the slide and order cases fail their event readings (`Offcanvas.test.ts:241`, `:368`; replay `:35`).
- **`offcanvas-hide-panel`:** the same assertions distinguish premature hide completion (`Offcanvas.test.ts:241`, `:368`; replay `:43`).

These are named test failures alongside unhandled errors, not failures inferred solely from exit status. The supplied excerpts do not establish the AbortErrors’ origin.

Outside the claims, **stopped overlay shows still discard prior attribute values**. For example, use a connected Offcanvas host with `role="region"`, construct with `{ backdrop: false, scroll: true }`, call `show()`, immediately remove its `show` token, then await the call. Show overwrites the role (`src/browser/Offcanvas.ts:298`); its returning step removes it instead of writing back `"region"` (`:518`). Modal has the equivalent removal (`src/browser/Modal.ts:537`). This violates amended E24’s prior-value rule and belongs to J-OVERLAYS. It predates this conversion.

I found no existing engine defect established as newly concealed **solely by removing literal motion pins**. There is a separate lost regression check: Backdrop’s replacement-token case now loads no transition (`Backdrop.test.ts:75`). A mutation that waits only when the literal `fade` class exists would escape that case; the former animated replacement-token fixture could distinguish it. That mutation was not run.

VERDICT: FAIL 2 3
