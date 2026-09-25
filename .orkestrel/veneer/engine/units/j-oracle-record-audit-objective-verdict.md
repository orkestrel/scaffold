# J-ORACLE-RECORD audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6e5-3af4-73e1-96c9-9cd74f97c0fa`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-oracle-record-audit-objective.jsonl` (launch copy under `tmp/codex/`); 28 commands; 400 s; usage {"input_tokens":1713805,"cached_input_tokens":1561472,"cache_write_input_tokens":0,"output_tokens":10618,"reasoning_output_tokens":3227}. Retained verbatim from the exec's last message.

---

Audit fails on recording, settling, comparison, and test conventions. Claim 6 remains unresolved. No tests ran and no files changed.

Source references below are at `9ea360d`. Evidence filenames refer to `scaffold/.orkestrel/veneer/engine/units/`.

| Claim | Ruling | Evidence and distinguishing input |
|---|---|---|
| **1. One recorder and reader** | **FAIL** | The shared scaffold, runtime selection, actions, and ordinary readings conform (`tests/setupServer.ts:4150`, `:4396`, `:4570`, `:4610`). Button’s fixture has the same blob hash at base and subject. However, `elements = {}` followed by `elements[label] = …` loses an authored `id="__proto__"` from serialization (`:4453`, `:4476`). **Mutation:** change that element’s class. **Distinguished:** no; neither serialized reading contains the element. |
| **2. Veneer from source** | **CONFIRMED** | The browser entry is `src/browser/index.ts`; browser and styles builds specify `write: false` (`tests/setupServer.ts:4328`, `:4335`, `:4339`, `:4347`). The runtime consumes returned build outputs (`:4355`). An old Veneer `dist` artifact cannot supply this runtime. No stale-build mutation proof is retained. |
| **3. End states only** | **FAIL** | Settling checks document animations and light-DOM transition declarations, then reads state in a separate evaluation (`tests/setupServer.ts:4510`, `:4546`). Shadow-root motion is absent from those checks. Delayed engine work and movement between samples are also unaccounted for. Concrete witnesses follow below. No completion event is used by the settle itself. |
| **4. Fixtures and refresh** | **CONFIRMED** | The cases record Bootstrap, scan its steps, optionally write only that recording, and compare it with the fixture (`tests/conformance.test.ts:307`). Committed fixtures match the retained Bootstrap census. **Mutations:** unchanged non-refused step, missing steps, changed saved focus, extra step, wrong plugin, malformed fixture. **Distinguished:** yes by the assertions at `tests/setupServer.test.ts:1422`, `:1444`, `:1471`; replay records the setup and conformance passes (`j-oracle-record-replay.log.txt:5`). |
| **5. Live controls** | **CONFIRMED** | Public seams appear at `tests/setupServer.ts:918`, `:963`, `:1134`, `:1152`. The comparison subtracts exact baseline departures and selects the control’s step (`:4906`, `:4914`, `:4926`). **Mutations distinguished:** renamed `show` token → class and visibility differences; prevented modal show → class, attribute, visibility, element, focus, and lock differences; `focus:false` → focus difference; inline outline plus `data-oracle` → attribute difference only. Reported red readings match the expected lists (`j-oracle-record-report.md:96`). |
| **6. Mutation run binds** | **UNRESOLVED** | The replay records assertion failures, equivalent-control success, BOOM/UNBOUND refusals, and unchanged final sources (`j-oracle-record-replay.log.txt:24`, `:35`, `:79`). But the retained Python instrument delegates the transformations and assertion to `tmp/probe/mutation.test.ts` (`j-oracle-record-mutations.py:34`, `:100`). That file is absent from `9ea360d` and the supplied evidence. Exact mutation-to-assertion binding therefore cannot be audited. Row-level distinctions are below. |
| **7. Comparator complete for its facets** | **FAIL** | Ordinary facet comparisons and ordered step-name refusal are implemented (`tests/setupServer.ts:4792`, `:4813`, `:4824`, `:4835`, `:4848`, `:4858`, `:4867`). **Mutation:** remove an element labelled `constructor` from one side. **Distinguished:** incorrectly—the lookup on the empty ordinary object returns its inherited constructor; the comparator reaches `.classes` and throws instead of reporting element absence (`:4811`, `:4824`). The `__proto__` loss also makes differences invisible. Unrecorded facets are listed below. |
| **8. E28 boundaries** | **CONFIRMED** | The base-to-subject diff contains only the named test files and plugin fixtures, matching `j-oracle-record-status.txt:1`. No guide or plugin-row changes occur. `scanOracleObligation` and `isProofFile` are unchanged. No mutation proof applies. |
| **9. Checkable test conventions** | **FAIL** | The shared scenario and recording matrix is declared inside the test file (`tests/setupServer.test.ts:1119`, `:1139`), contrary to `.claude/rules/tests.md:187`, which places data tables and case matrices in setup files. Cleanup also misses acquisition/teardown failures, described below. Added type properties are readonly and exported tables are frozen. The settle uses installed `waitForCondition`; no equivalent installed whole-oracle primitive was found. Naming is left to the subjective lane. |
| **10. Census** | **CONFIRMED** | Expanding the report’s grouped subjects and motion preferences reproduces the retained departure rows (`j-oracle-record-report.md:68`). This includes the reduced-only Offcanvas focus departure (`j-oracle-record-census/departures.json:810`), Tooltip’s initial title difference (`:908`), and concurrent Popover instances (`:1092`). No extra or missing departure was found. |

For **claim 3**, the following are static counterexamples, not executed readings:

- **Finite shadow-root motion:** start a 2000 ms transform animation on a visible shadow descendant of an otherwise stationary labelled host. The document query, state reader, and document animation query omit that descendant (`tests/setupServer.ts:4405`, `:4511`). The light-DOM state can satisfy the quiet interval while that animation runs. `getAnimations()` is scoped to the document or shadow-root subtree on which it is called. [Web Animations specification](https://www.w3.org/TR/web-animations-1/#dom-documentorshadowroot-getanimations)
- **Delayed Tooltip show:** configure `delay.show: 1000`, hover the trigger, and settle a page whose declared transition span is shorter. Bootstrap schedules `show()` after that delay (`node_modules/bootstrap/js/src/tooltip.js:509`). The settle knows only transition declarations and current animations, so it can record the pre-show state before the scheduled change.
- **Scroll sampling gap:** equal coordinates at readings do not establish continuous inactivity. A scroll can move and return between readings, or restart after the motion evaluation and before the separate state evaluation. Only sampled coordinates enter the stability comparison (`tests/setupServer.ts:4520`, `:4546`, `:4547`).

For **claim 6**, the intended differences are observable as follows. “Yes” describes the comparator’s ability to distinguish the stated mutation; the exact executed plants remain unresolved because their TypeScript source is missing.

| Mutation row | Planted difference | Distinguished from passing state? | Replay evidence |
|---|---|---|---|
| `collapse.expanded` | Wrong trigger `aria-expanded` | Yes—attribute value | `j-oracle-record-replay.log.txt:24` |
| `alert.connected` | Closed alert remains connected | Yes—element presence | `:25` |
| `tab.selected` | Outgoing control retains `aria-selected="true"` | Yes—attribute value | `:26` |
| `scrollspy.active` | Old navigation link retains `active` | Yes—class membership | `:27` |
| `dropdown.expanded` | Closed toggle retains `aria-expanded="true"` | Yes—attribute value | `:28` |
| `carousel.current` | Outgoing indicator retains `aria-current` | Yes—attribute presence | `:29` |
| `modal.hidden` | Open modal retains `aria-hidden="true"` | Yes—attribute presence | `:30` |
| `offcanvas.modal` | Open panel omits `aria-modal="true"` | Yes—attribute presence | `:31` |
| `toast.showing` | Completed show retains `showing` | Yes—class membership | `:32` |
| `tooltip.described` | Description ID names no tip | Yes—normalization produces `?` instead of the tip label (`tests/setupServer.ts:4471`) | `:33` |
| `popover.auto` | Replaces `bs-popover-auto` with another token | Yes—class membership; this does **not** prove content correctness | `:34` |
| `control.equivalent` | Equivalent `aria-expanded` spelling | No semantic distinction expected; replay reports HELD | `:35` |
| `control.boom` | Throws during trigger write | Refused as a page error, rather than a comparison failure | `:36` |
| `control.unbound` | Transformation names an absent source span | Refused at build | `:37` |

The abandoned ScrollSpy mutation is a specific surviving defect: skipping activation-time clearing was **not distinguished**, because the scenario’s leave path cleared the same token (`j-oracle-record-report.md:130`).

For **claim 7**, these end-state facets remain outside the recording:

| Missing facet | Parity left unproved |
|---|---|
| Rendered text and text-node content | Tooltip title, Popover header/body, Toast live-region message, Alert message. A wrong nonempty string can preserve every recorded facet. The reader never reads text (`tests/setupServer.ts:4405`); Bootstrap inserts it through `template-factory.js:138`. |
| Settled scroll coordinates | ScrollSpy’s exact destination and Modal’s host/body scroll reset. Coordinates are used only during settling and discarded (`tests/setupServer.ts:4520`, `:4559`). Bootstrap explicitly resets modal scroll positions (`node_modules/bootstrap/js/src/modal.js:181`). |
| Inline styles, dimensions, positions, and numeric opacity | Collapse’s final dimensions/style cleanup; Carousel’s final transform; Modal/Offcanvas scrollbar compensation; Dropdown/Tooltip/Popover placement and arrow position; Toast’s rendered feedback. Style omission is intentional under E28 (`tests/setupServer.ts:522`), but these outcomes remain unproved. |
| DOM parent relationships and authored element tag | Correct placement/container ownership and semantic element preservation across the plugins. Tags help derive labels but are not retained for authored nodes; parent relationships are never read (`tests/setupServer.ts:4407`, `:4442`, `:4476`). |
| Non-reflected DOM properties | Embedded form-control values, checkedness, selection, and similar state in panels, dialogs, menus, and popovers. Attributes alone cannot establish their preservation (`tests/setupServer.ts:4411`). |
| Shadow contents and deep focus | Plugin content hosted in shadow trees and focus within it. The reader traverses only the body’s light DOM and reads `document.activeElement` (`tests/setupServer.ts:4405`, `:4415`). |
| Actual viewport exposure and hit testing | Clipped, offscreen, occluded, or otherwise unpainted overlays. The recorded visibility facet is only `checkVisibility(...)` (`tests/setupServer.ts:4414`). |

Additional behavior defects outside the claim rulings:

- **Mutation classifier accepts a kill inside a broken run.** Smallest input: a report containing the named case failed with `AssertionError`, plus another failed suite with no assertions. `classify()` returns `KILLED` before consulting `failed_suites` (`j-oracle-record-mutations.py:74`, `:83`). This contradicts the instrument’s stated suite-error refusal.
- **Browser leaks when scratch acquisition fails.** Smallest input: successful browser launch followed by a filesystem failure in `createScratch()`. Acquisition occurs before the `try`, so browser cleanup is skipped (`tests/setupServer.ts:4277`, `:4281`).
- **Scratch cleanup is skipped when browser close rejects.** A rejection at `await browser.close()` prevents `scratch.destroy()` (`tests/setupServer.ts:4285`).

VERDICT: FAIL 1,3,7,9
