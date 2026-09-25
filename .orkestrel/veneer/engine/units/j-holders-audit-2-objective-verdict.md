# J-HOLDERS round-2 audit — the objective lane (analyst on GPT-6 Astra, journal tmp/codex/j-holders-audit-2.jsonl; brief units/j-holders-audit-2-analyst-brief.md; claims units/j-holders-audit-claims-2.md)

Thread `01a0d674-8294-7423-84e4-de2984d081b1`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-holders-audit-2.jsonl` (launch copy under `tmp/codex/`); 23 commands; 443 s; usage {"input_tokens":2169256,"cached_input_tokens":2017408,"cache_write_input_tokens":0,"output_tokens":11971,"reasoning_output_tokens":4370}. Retained verbatim from the exec's last message.

---

Source review of `ada50f4` against `806717d`; no tests run. Counterexamples below are source-derived. Executed evidence comes from the retained Orchestrator logs. Source citations refer to `ada50f4`; `units/` refers to scaffold’s engine evidence directory.

| Claim | Verdict | Evidence | Mutation and assertion discrimination |
|---|---|---|---|
| **1 — Only the last holder removes an emptied attribute** | **FAIL** | The presence-specific branches obey the rule: `#leave` refuses removal while another holder remains, and `#absent` checks every holder after a rejoin (`src/browser/HostSnapshot.ts:277`, `:295`). **The “any path” claim fails through whole-attribute restoration.** On a bare element, A saves attribute `class` and token `active`; B saves token `active`. Add and remove `active`, leaving `class=""`, then restore A. Its presence release leaves B holding the record, but its attribute restoration removes `class` at `:184`. The public target contract permits these saves (`src/browser/types.ts:333`). The analogous `style`/`height` input reaches the same bypass. | **P1-SNAPSHOT / P1-MODAL:** return `!record.present` from the nonfinal `#leave` branch. **Yes**, assertions distinguish `null` from `''` (`tests/src/browser/HostSnapshot.test.ts:630`; `tests/src/browser/Modal.test.ts:677`). **P1-REJOIN:** replace the holder predicate with `true`. **Yes**, `HostSnapshot.test.ts:605` distinguishes it. These assertions do **not** exercise whole-attribute restoration. |
| **2 — P1 leaves final markup unchanged** | **FAIL** | **Smallest engine composition:** create a bare `div`; construct a Button on it and toggle it on; construct an Alert on the same element; register a `closed.vn.alert` listener that destroys the Button; await `alert.close()`. The Alert saves `show`, then dispatches `closed` before clearing its snapshot (`src/browser/Alert.ts:135`, `:146`, `:150`). Button destruction removes `active` and restores `aria-pressed` (`src/browser/Button.ts:60`, `:119`). At `806717d`, the Button removes the emptied class attribute despite the Alert’s holding. At `ada50f4`, it leaves `class=""`; the Alert’s final `clear()` writes nothing (`src/browser/HostSnapshot.ts:195`). Final markup is therefore `<div></div>` versus `<div class=""></div>` after every holding ends. The retained browser gate passes its cases (`units/j-holders-gates-2.log.txt:69`, `:74`), but contains no assertion for this composition. | Restoring the base’s nonfinal `#leave` return changes this witness back to an absent attribute. **No supplied assertion distinguishes this final-state difference.** The Modal proof distinguishes the intended intermediate change, not this clear-ending teardown. |
| **3 — Isolation restores after every hand-off** | **CONFIRMED** | Destruction finishes the release loop before calling snapshot restoration (`src/browser/Isolation.ts:129`, `:131`). A release writes the newest remaining claim at `:160`. The supplied watcher removes the inner element’s `inert` during that hand-off; restoration subsequently returns its original value (`tests/src/browser/Isolation.test.ts:209`, `:217`, `:222`). | **P2-ORDER:** restore the snapshot inside a release before later hand-offs. **Yes**, the inner element’s expected `''` becomes `null`. The retained assertion failure is at `units/j-holders-mutations-2-orchestrator.log.txt:21`. |
| **4 — The proofs bind** | **FAIL** | The retained base replay records the P1 cases failing through assertions (`units/j-holders-red-2-orchestrator.log.txt:6`). The mutation replay records assertion kills, CONTROL held, and BOOM refused (`units/j-holders-mutations-2-orchestrator.log.txt:11`). **The HELD classifier does not enforce the claimed suite-error condition.** For a passed selected case with an empty suite message, `success: false`, and `numFailedTests: 1`, an accompanying unhandled error is missed: the `numFailedTests == 0` condition is false and the reader returns HELD (`units/j-holders-mutations-2.py:219`, `:225`, `:228`). The runner executes the whole named file, so sibling failures can coexist with the selected pass (`:239`). | The supplied mutations distinguish their named defects, as detailed below. **BOOM does not test this hole:** it makes the selected case fail. Neither BOOM nor CONTROL establishes rejection of a passed selected case accompanied by a sibling failure and an unhandled error. |
| **5 — Scope and greenfield** | **CONFIRMED** | The `806717d..88f15c7` diff matches the report’s tracked paths; `88f15c7..ada50f4` changes `tests/src/browser/Tab.test.ts` alone (`units/j-holders-report-2.md:9`; `units/j-holders-2-status.txt:1`; `tests/src/browser/Tab.test.ts:1589`). The restore remarks state the changed presence rule (`src/browser/types.ts:384`), and the report expressly records that edit outside round 1’s grant (`units/j-holders-report-2.md:119`). The implementation adds no unused helper, field, or compatibility branch; its changed predicates are reached by restoration (`src/browser/HostSnapshot.ts:162`, `:174`). | Structural claim; no behavioral mutation applies. |

The presence-record traces, excluding the whole-attribute bypass, are:

| Input or interleaving | Result and evidence |
|---|---|
| Holders A/B, restored AB or BA | The departing nonfinal holder returns false from `#leave`; the final holder removes an empty attribute whose record says absent (`src/browser/HostSnapshot.ts:277`). |
| Holders A/B/C, restored ABC, ACB, BAC, BCA, CAB, or CBA | Only the final departure permits removal. Membership determines the result independently of save order (`src/browser/HostSnapshot.ts:277`). |
| Nested restorations without a save | The outer restoration remains a presence holder during its writes. An inner departure leaves the emptied attribute present; the outer final departure removes it (`src/browser/HostSnapshot.ts:146`, `:161`; `tests/src/browser/HostSnapshot.test.ts:552`). |
| A save rejoins the restoring snapshot | `#join` moves the holding from leaving to joined. `#absent` permits removal only when that snapshot is the sole remaining holder; the rejoined holding survives for its next restoration (`src/browser/HostSnapshot.ts:241`, `:245`, `:298`). |
| Another snapshot saves during restoration | It joins the existing presence record and takes over any matching pending value record. Cleanup waits for the final presence departure (`src/browser/HostSnapshot.ts:127`, `:255`; `tests/src/browser/HostSnapshot.test.ts:978`, `:1013`). |
| `clear()` during restoration, or as the final departure | It relinquishes targets and presence without removal. An interrupted restoration loses its pending ownership. A final clear can leave an empty attribute indefinitely (`src/browser/HostSnapshot.ts:195`; `tests/src/browser/HostSnapshot.test.ts:1207`). |

The engine sweep found these token/property holders. “Same” below means complete restoration of the shared token/property records, without whole-attribute interference or reactions branching on the changed intermediate presence.

| Engine | Shared targets and evidence | Final markup versus base |
|---|---|---|
| Alert | Host `shown` token; save `src/browser/Alert.ts:135`, restore `:163`, successful-close clear `:150` | Same on restoration; **different in the Button/Alert witness**. |
| Button | Host `pressed` token; `src/browser/Button.ts:60`, `:119` | Same on complete restoration; **different when Alert clears the final presence holding**. |
| Carousel | Item movement/active tokens and indicator active token; `src/browser/Carousel.ts:585`, `:589`, `:280`; host pointer token through Swipe | Same under the stated conditions. |
| Collapse | Panel tokens and width/height; trigger collapsed token; `src/browser/Collapse.ts:396`, `:398`, `:400`, `:280` | Same under the stated conditions. |
| Dropdown | Toggle/menu shown tokens; `src/browser/Dropdown.ts:425`, `:426`, `:270`; properties through Placement | Same under the stated conditions. |
| Modal | Body open token, host shown/static tokens, display and padding; `src/browser/Modal.ts:276`, `:566`, `:569`, `:455` | Same under the stated conditions. |
| Offcanvas | Host shown/showing/hiding tokens; `src/browser/Offcanvas.ts:545`, `:441`; properties through ScrollLock | Same under the stated conditions. |
| Placement | Element, reference, and arrow properties; `src/browser/Placement.ts:163`, `:167`, `:178`, `:224`, `:286`, `:261` | Same under the stated conditions. |
| ScrollLock | Body overflow; compensated padding-right and margin-right; `src/browser/ScrollLock.ts:87`, `:106`, `:116`, `:136` | Same under the stated conditions. |
| ScrollSpy | Navigation active tokens; `src/browser/ScrollSpy.ts:365`, `:245` | Same under the stated conditions. |
| Swipe | Host pointer token; `src/browser/Swipe.ts:67`, `:82` | Same under the stated conditions. |
| Tab | Control/pane active and shown tokens; dropdown tokens; `src/browser/Tab.ts:368`, `:380`, `:383`, `:232` | Same under the stated conditions; the integration case asserts final markup at `tests/src/browser/Tab.test.ts:1591`. |
| Toast | Host shown/transition/fade tokens; `src/browser/Toast.ts:276`, `:238` | Same under the stated conditions. |
| Tooltip / Popover | Property holdings through Placement; `src/browser/Tooltip.ts:705`; Popover inherits Tooltip at `src/browser/Popover.ts:42` | Same under the stated conditions. |

The round-1 Modal witness follows the intended changed path: show A and B with `focus: false, backdrop: false`, remove `modal-open`, then hide A. At `ada50f4`, the body retains `class=""`; hiding B removes it. The committed assertions cover that sequence (`tests/src/browser/Modal.test.ts:655`), and the retained base replay fails at the intermediate assertion (`units/j-holders-red-2-orchestrator.log.txt:14`).

The remaining retained proof mutations discriminate as follows:

| Mutation | Distinguishing assertion |
|---|---|
| **H1-LAST** — replace Modal hide’s open restoration with clear | **Yes:** `'page modal-open'` differs from `'page'` (`tests/src/browser/Modal.test.ts:707`). |
| **H2-LAST** — omit Isolation restoration | **Yes:** the original inert attribute remains absent instead of `''` (`tests/src/browser/Isolation.test.ts:243`). |
| **H2-ORDER** — omit the remaining claim’s hand-off write | **Yes:** the expected inert state remains false (`tests/src/browser/Isolation.test.ts:115`). |
| **H3-MEASURE** — disable joining an existing ScrollLock group | **Yes:** an excluded target acquires `'0px'` instead of `''` (`tests/src/browser/ScrollLock.test.ts:142`). |
| **H5-SIGNAL** — retain the refused lock’s abort listener | **Yes:** the abort recorder detects the additional invocation (`tests/src/browser/ScrollLock.test.ts:59`). |
| **H5-PRESENT** — remove the attribute instead of restoring its present value | **Yes:** `null` differs from `'light'` (`tests/src/browser/ColorMode.test.ts:50`). |
| **H5-IDENTITY** — throw a replacement error with the same message | **Yes:** reference identity differs (`tests/src/browser/ColorMode.test.ts:47`). |
| **CONTROL** — add the already-present open token unconditionally | The token assertions remain equal; retained reading HELD (`units/j-holders-mutations-2-orchestrator.log.txt:22`). |
| **BOOM** — throw during Isolation destruction | The selected case fails with an ordinary error and is refused, rather than counted as an assertion kill (`units/j-holders-mutations-2-orchestrator.log.txt:23`). |

- **Outside the claims — retained ScrollLock body-replacement defect.** Construct lock A, replace the document’s body with an unstyled body, then construct lock B before releasing A. B joins the document-level group and returns without locking the replacement body; the snapshot still targets the detached body (`src/browser/ScrollLock.ts:72`, `:79`, `:87`). This defect also exists in `806717d`.

VERDICT: FAIL 1, 2, 4
