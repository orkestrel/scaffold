# J-MOTION-PROOFS-A round 3 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d719-d9dc-78c3-9f11-a1fc6ad87923`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-motion-proofs-a-audit-3.jsonl` (launch copy under `tmp/codex/`); 50 commands; 323 s; usage {"input_tokens":1317316,"cached_input_tokens":1185280,"cache_write_input_tokens":0,"output_tokens":8714,"reasoning_output_tokens":2521}. Retained verbatim from the exec's last message.

---

**Claim 5 fails: the plant does not apply the ruling to responsive Offcanvas panels.** The original stale-dialog and backdrop-hide witnesses are distinguished by the revised proofs.

I inspected Veneer through `git show 180d513:<path>`, against `beb7cd8`. I ran no tests and read no Veneer worktree files. Run results below are retained evidence, not fresh executions.

Source references are at `180d513`. Evidence filenames are under `scaffold/.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence and mutation assessment |
|---|---|---|
| **1 — The live dialog** | **CONFIRMED**, for lookup at each operation | Construction stores no dialog. The body-scroll step, settlement, and bounce call `#findDialog` (`src/browser/Modal.ts:314`, `:558`, `:639`); its query is inside the host (`:567`). The late-insertion proof requires captured motion and finished states (`tests/src/browser/Modal.test.ts:388`, `:411`). **`modal-stale-dialog` distinguishes the construction-time cache**: the replay names this case failing (`j-motion-proofs-a-replay-3.log.txt:16`). Mid-change retention is explained below. |
| **2 — The backdrop at hide** | **CONFIRMED** | The hide proof retains backdrop animations and requires a nonempty, finished recording at `hidden` (`tests/src/browser/Modal.test.ts:230`, `:241`, `:255`). The order proof also requires backdrop membership and finished motion (`:305`, `:318`, `:341`, `:347`). **`modal-backdrop-hide-skip` distinguishes the omitted await**; both cases fail in the replay (`j-motion-proofs-a-replay-3.log.txt:39`). Removal before observation cannot pass through an empty recording. |
| **3 — Alert at `closed`** | **CONFIRMED** | The fade proof captures the close animations and reads their states inside `closed` (`tests/src/browser/Alert.test.ts:108`, `:120`, `:131`). The factor proof retains the corresponding motions and checks its completion readings (`:174`, `:204`, `:230`). **`alert-skip` distinguishes premature completion**: the fade case checks connection before capture, and the factor case requires motion and completion order. Both fail in the replay (`j-motion-proofs-a-replay-3.log.txt:77`). |
| **4 — Backdrop regression check** | **CONFIRMED** | The replacing-class fixture explicitly identifies its consumer rule (`tests/src/browser/Backdrop.test.ts:75`, `:82`). Each resolution requires captured motion with no unfinished animation (`:94`, `:106`, `:117`). **`backdrop-literal-fade-show` and `backdrop-literal-fade-hide` distinguish gating settlement on literal `fade`** (`j-motion-proofs-a-replay-3.log.txt:71`). |
| **5 — The plant** | **FAIL** | The plant writes the ruled values for `.fade`, Modal, backdrops, and bare `.offcanvas` (`j-motion-proofs-a-plant.py:23`, `:30`, `:54`). It writes no responsive-panel rule. The actual responsive fixture uses `.offcanvas-sm` without `.offcanvas` (`tests/src/browser/Offcanvas.test.ts:1026`), leaving its original transition intact (`src/styles/components/_offcanvas.scss:88`, `:106`). The replay records passing file runs and restoration (`j-motion-proofs-a-replay-3.log.txt:96`, `:113`), but those runs therefore do not exercise the complete applicable ruling. **No retained mutation or value-probe assertion distinguishes this omission.** |
| **6 — The proofs bind** | **CONFIRMED**, for the recorded mutation rows | The replay records a passing control (`j-motion-proofs-a-replay-3.log.txt:7`), named failures for every specified row, no row lacking `AssertionError` (`:90`), and restoration (`:113`). The instrument restores original bytes in `finally` and checks their digest (`j-motion-proofs-a-mutate-3.py:51`). The distinguishing assertions for the remaining rows are listed below. This establishes the recorded mutations, not complete behavioral coverage. |
| **7 — The prose is true** | **CONFIRMED** | The guide’s construction paragraph and class remarks describe operation-time lookup (`guides/veneer.md:2031`; `src/browser/Modal.ts:42`). That matches the call sites. These statements establish no continuous lookup during an await. Mutation assessment: not a proof claim. |

For claim 6, the remaining mutation rows bind as follows:

| Mutation | Distinguishing assertion |
|---|---|
| `modal-base`, `modal-show-dialog`, `modal-hide-host` | The order fixture independently lengthens the host or dialog and requires captured motions to finish before completion (`tests/src/browser/Modal.test.ts:279`, `:297`, `:347`). **Yes**; replay failures begin at `j-motion-proofs-a-replay-3.log.txt:12`. |
| `modal-show-skip`, `modal-hide-skip` | Completion-time animation readings and retained-motion states distinguish skipped settlement (`tests/src/browser/Modal.test.ts:193`, `:231`, `:305`). **Yes**; replay `:26`, `:34`. |
| `offcanvas-show-backdrop`, `offcanvas-show-panel`, `offcanvas-hide-backdrop`, `offcanvas-hide-panel` | The fixture makes either element outlast the other, retains panel and backdrop motion, and requires finished states at each event (`tests/src/browser/Offcanvas.test.ts:306`, `:321`, `:343`, `:368`). **Yes**; replay `:45`. |
| `backdrop-show-skip`, `backdrop-hide-skip` | Nonempty motion, resolution-time animation readings, and finish-before-resolution ordering distinguish skipped awaits (`tests/src/browser/Backdrop.test.ts:35`, `:50`, `:62`, `:65`). **Yes**; replay `:60`, `:66`. |
| `reader-seconds` | Independent fixture expectations distinguish seconds from milliseconds (`tests/setupBrowser.test.ts:1779`, `:1783`). **Yes**; replay `:87`. |

For claim 1, **an active settle still reads an element selected earlier**. `#settle` selects the dialog once and passes it to `settleAnimations`; that helper repeatedly reads the same element, without checking host membership (`src/browser/Modal.ts:558`; `src/browser/helpers.ts:96`, `:103`). The bounce has the same per-await retention (`Modal.ts:639`). Replacement during the await does not retarget either wait.

Ordinary removal of a CSS-transitioning dialog does not establish an indefinite wait: cancellation is accepted by `Promise.allSettled`, and the existing helper case covers removal midway (`src/browser/helpers.ts:112`; `tests/src/browser/helpers.test.ts:216`). A removed or reparented element whose animation remains active can still be the element awaited. The late-insertion proof does not distinguish mid-change replacement.

For claim 5, the planted declarations correctly use the feedback and panel tokens, the ruled easing tokens, and Modal’s scale endpoints. However, responsive Offcanvas motion remains unplanted despite the ruling covering its fixed range (`scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:23`). The claimed value probe is reported at `j-motion-proofs-a-report-3.md:90`, but its source and execution are absent from the supplied evidence; `j-motion-proofs-a-plant.sh:17` invokes only the owned test files.

I found no remaining converted assertion that visibly contradicts the ruled durations, easing, scale, or added opacity. The failure is incomplete verification against those values, not an established converted-test failure.

Outside the claims, **the prior-value defect in stopped overlay shows remains**. A minimal source-derived witness needs no motion stylesheet:

- Connect a host with `class="modal fade"` and `role="region"`.
- Construct `Modal(host, { backdrop: false, focus: false })`.
- Call `show()`, immediately remove `show`, then await the call.

The show writes `role="dialog"` (`src/browser/Modal.ts:310`), yields through settlement, detects the reversed token (`:324`), and removes `role` instead of writing back `"region"` (`:534`). This violates amended E24. Offcanvas retains the equivalent defect (`src/browser/Offcanvas.ts:298`, `:518`), already assigned to J-OVERLAYS.

VERDICT: FAIL 5
