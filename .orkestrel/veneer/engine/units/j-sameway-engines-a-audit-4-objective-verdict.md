# J-SAMEWAY-ENGINES-A round 4 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6d9-c010-7e71-9e1c-711b1756976c`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-engines-a-audit-4.jsonl` (launch copy under `tmp/codex/`); 35 commands; 398 s; usage {"input_tokens":2907454,"cached_input_tokens":2742784,"cache_write_input_tokens":0,"output_tokens":9976,"reasoning_output_tokens":1935}. Retained verbatim from the exec's last message.

---

Source audit of `3f62d64` against `dc2a1a7`: all claims are confirmed. No tests were run. Witness results below are source traces, supported by the retained Orchestrator replay. The replay’s instrument and mutated-source digests match the retained instrument and committed sources.

All source references name `3f62d64` unless another commit is explicit.

| Claim | Ruling | Evidence | Mutation and assertion distinction |
|---|---|---|---|
| **1. F1: Collapse records every completion write** | **CONFIRMED** | Recording precedes show’s size removal (`src/browser/Collapse.ts:302`), hide’s size removal (`:410`), and hide’s completing host-token addition (`:421`). Each passes the value its following write produces. The remaining change-method writes have records or the exclusions described below. | `F1-show-size`, `F1-hide-size`, and `F1-hide-host` delete the respective record calls. **Distinguished:** assertions require restored `0px` or exactly `['show']` (`tests/src/browser/Collapse.test.ts:1704`, `:1739`, `:1669`). The mutation replay reports assertion failures at `j-sameway-engines-a-mutations-4-orchestrator.log.txt:57`, `:58`, and `:59`. |
| **2. F2: prior property state includes priority** | **CONFIRMED** | The sole `HostChange` declaration carries `priority` (`src/browser/types.ts:343`). Recording reads the actual priority, retains the earliest record, and treats equal values with nonempty priority as a change (`src/browser/helpers.ts:962`). Rewind compares value and priority and passes the recorded priority to the writer (`:982`); the writer passes it to `setProperty` (`:930`). | `P2-record-priority`, `P2-record-value`, `P2-rewind-drop`, and `P2-rewind-value` remove the respective obligations. **Distinguished:** record assertions include priority (`tests/src/browser/helpers.test.ts:1565`, `:1579`); rewind asserts value-changing and priority-only restoration (`:1660`), then no further mutations (`:1674`). The engine assertion requires `['12px', 'important']` (`tests/src/browser/Collapse.test.ts:1634`). |
| **3. One reading and one writer; snapshot behavior unchanged** | **CONFIRMED** | The committed `src/browser/` population contains its only `getPropertyPriority` call at `src/browser/helpers.ts:902`. Snapshot save uses the shared readings (`src/browser/HostSnapshot.ts:113`); write-back uses the shared writer (`:319`). The category comparison follows below. The snapshot test file is unchanged. | `P2-read-snapshot` and `P2-write-snapshot` drop priority at the shared reading or writer. **Distinguished:** `tests/src/browser/HostSnapshot.test.ts:70` requires `important`; replay failures appear at `j-sameway-engines-a-mutations-4-orchestrator.log.txt:67` and `:69`. Token, attribute, cleanup, ownership, reentry, and failure assertions retain the same operative paths. |
| **4. Surface parity** | **CONFIRMED** | The browser barrel exports helpers (`src/browser/index.ts:3`); its pinned export list includes `readHostPriority` (`tests/src/browser/index.test.ts:208`). Surface summaries at `guides/veneer.md:64`, `:72`, `:73`, `:74`, and `:75` match the corresponding summaries in `src/browser/types.ts:342` and `src/browser/helpers.ts:891`, `:906`, `:934`, and `:969`. | Mechanical source comparison; no behavioral mutation applies. |
| **5. The proofs bind** | **CONFIRMED** | The base replay names each Collapse assertion failure (`j-sameway-engines-a-red-4-orchestrator.log.txt:6`), then reports the same files passing at the tip (`:16`). Mutation kills carry assertion failures; controls hold; `BOOM` and `UNBOUND` are refused (`j-sameway-engines-a-mutations-4-orchestrator.log.txt:57`, `:70`, `:72`). The instrument checks collection, suite errors, assertion messages, and successful controls (`j-sameway-engines-a-mutations-4.py:266`). | The F1 and P2 mutations identified above distinguish the claimed failures. The equivalent-condition controls preserve assertions; thrown `Error` and `ReferenceError` failures are rejected. This establishes the logged distinctions, not exhaustive behavioral coverage. |
| **6. The guide is true** | **CONFIRMED** | Collapse’s return paragraph matches the completed record coverage and priority-aware rewind (`guides/veneer.md:1112`; `src/browser/Collapse.ts:302`, `:410`, `:421`, `:521`). Tab, Carousel, and Toast paragraphs match their recorded token/attribute paths (`guides/veneer.md:1399`, `:1998`, `:2505`). | F1 and P2 engine mutations distinguish Collapse’s promises. `A2-tab-dropdown`, `R1-carousel-order`, `R1-carousel-direction`, `A2-toast-fade`, and `A2-toast-transition` distinguish the corresponding token/attribute returns in the retained replay. |
| **7. Greenfield and scope** | **CONFIRMED** | The committed path set matches `j-sameway-engines-a-4-status.txt:1` and the report’s tracked paths; the integration edits the same guide. Snapshot write-back has no callback parameter (`src/browser/HostSnapshot.ts:310`), and the shared priority reader has no parallel implementation or alias. The writer’s default is `''` (`src/browser/helpers.ts:922`). | `P2-write` distinguishes passing priority from dropping it. The unchanged-value write in `tests/src/browser/helpers.test.ts:1477` explicitly requires the platform priority reading `''`, supporting its use as the native unprioritized value. Scope and alias checks are mechanical. |

The retained red replay also contains the deliberate empty-token exception during snapshot testing on the base and tip (`j-sameway-engines-a-red-4-orchestrator.log.txt:2`, `:17`). Its tip test summary passes; that log is not evidence of a console-error-free run.

The earlier witnesses trace through the subject as follows.

| Witness | Result at `3f62d64` |
|---|---|
| Hide a panel carrying `show` without `collapse`; react to completion’s `collapse` addition by adding `show` | Completion records the previously absent host token (`src/browser/Collapse.ts:421`). Rewind removes it and the transition token, leaving `show` alone. The assertion is at `tests/src/browser/Collapse.test.ts:1669`. |
| Show a zero-sized panel with inline `height: 0px`; react to final size removal by removing `show` | Earlier size writes record nothing. Final removal records `'0px'` with priority `''` (`src/browser/Collapse.ts:302`). Rewind restores it; assertion at `tests/src/browser/Collapse.test.ts:1704`. |
| Hide a zero-sized panel with inline `height: 0px`; react to size removal by adding `show` | Removal records the size omitted by the unchanged measured-size write (`src/browser/Collapse.ts:410`). Rewind restores `0px`; assertion at `tests/src/browser/Collapse.test.ts:1739`. |
| Show over `height: 12px !important`; react to completing token addition by removing `show` | The zero-size write records `'12px'` and `'important'`. Rewind restores that pair (`src/browser/Collapse.ts:234`; `src/browser/helpers.ts:986`). Assertion at `tests/src/browser/Collapse.test.ts:1634`. |
| Tab’s closed outgoing dropdown | Unchanged absent toggle/menu tokens remain unrecorded and absent. The wrapper returns to its prior attribute value (`src/browser/Tab.ts:253`, `:491`; assertions at `tests/src/browser/Tab.test.ts:1668`). |
| Tab’s shared open dropdown | Deselection records the open state. Selection retains those records; rewind skips targets already restored (`src/browser/helpers.ts:962`, `:985`). Assertions at `tests/src/browser/Tab.test.ts:1732`. |
| Carousel’s pre-existing incoming order token or outgoing direction token | Completion records the first changing removal and rewind restores prior membership (`src/browser/Carousel.ts:540`, `:595`). Assertions at `tests/src/browser/Carousel.test.ts:2119`, `:2153`. |

Collapse’s exits and accumulated records are listed below. Each addition means “record only if this is the target’s first changing write.” Each rewind restores accumulated records in reverse order: token membership, attribute value or absence, and dimension value with its priority. It skips matching targets and stops when ownership fails (`src/browser/helpers.ts:982`).

| Collapse exit | Records available; rewind effect |
|---|---|
| Show refusal, prevention, or post-dispatch stop (`src/browser/Collapse.ts:185`, `:187`, `:198`) | None; no rewind. |
| Show stops during sibling hiding (`:203`) | No writes to this panel; sibling changes belong to their engines. |
| Show stops after transition addition (`:222`) | Transition’s prior absence. |
| Show stops after host removal (`:232`) | Previous records, plus host-token presence if removed. |
| Show stops after zero size (`:242`) | Previous records, plus dimension value and priority if changed. |
| Show stops at a trigger token or attribute (`:253`, `:265`) | Previous records, plus the changed trigger-target prefix. |
| Show stops after scroll size or its wait (`:280`, `:283`) | Previous records, plus dimension if this is its first changing write. |
| Show stops after completing host/shown write (`:295`) | Previous records, plus host if its addition first changes it. No shown-token record. |
| Show stops after transition removal (`:299`) | Same records; transition retains its original record. |
| Show stops after size removal (`:312`) | Previous records, plus dimension if earlier size writes changed nothing. |
| Show completes (`:315`) | No rewind; dispatches `shown`, then returns lifetime. |
| Hide refusal, prevention, or post-dispatch stop (`:320`, `:322`, `:330`) | None; no rewind. |
| Hide stops after measured size (`:358`) | Dimension value and priority if changed. |
| Hide stops after transition addition (`:367`) | Previous records, plus transition’s prior absence. |
| Hide stops after host/shown removal (`:380`) | Previous records, plus host if removed. No shown-token record. |
| Hide stops at a trigger token or attribute (`:394`, `:406`) | Previous records, plus the changed trigger-target prefix. |
| Hide stops after size removal or its wait (`:416`, `:419`) | Previous records, plus dimension if the measured-size write changed nothing. |
| Hide stops after host addition (`:431`) | Previous records, plus host’s prior absence if its early removal changed nothing. |
| Hide stops after transition removal (`:436`) | Same records; transition retains its original record. |
| Hide completes (`:439`) | No rewind; dispatches `hidden`, then returns lifetime. |

A phase failure invalidates the identity and suppresses rewind writes; a shown-token reversal preserves ownership for rewind (`src/browser/Collapse.ts:490`). Destruction or supersession also suppresses further rewind writes (`:474`).

No additional unrecorded target was found in the audited change methods. Transition removals in Collapse and Toast use records established by their changing additions. Tab records its selection targets and pane tokens (`src/browser/Tab.ts:224`, `:253`, `:267`, `:275`). Carousel records indicator writes, transition additions, and completion removals (`src/browser/Carousel.ts:379`, `:462`, `:535`, `:585`). The takeover token is deliberately excluded under E24; blur, events, timers, and sibling-engine operations are not return entries.

No property write in these methods was found to miss a priority change, and no rewind was found to invent a priority. Collapse’s dimension assignments give no priority; removals clear the declaration. The recorder’s comparison therefore matches those writes, including an equal-value assignment that removes `important`.

The snapshot write-back comparison is equivalent across the base and subject.

| Saved category and state | `dc2a1a7` write-back | `3f62d64` write-back |
|---|---|---|
| Token present | `classList.toggle(name, true)` | Same |
| Token absent | `classList.toggle(name, false)` | Same |
| Attribute present, including `''` | `setAttribute(name, value)` | Same |
| Attribute absent | `removeAttribute(name)` | Same |
| Property present, priority `''` | `setProperty(name, value, '')` | Same |
| Property present, priority `important` | `setProperty(name, value, 'important')` | Same |
| Property absent | `removeProperty(name)` | Same; priority does not affect removal |

Token and attribute writes ignore priority in either implementation; snapshot records give them `''`. For a property, the saved priority determines restoration regardless of whether the declaration being replaced carries a priority. An absent value selects removal in either implementation even if accompanied by a nonempty priority.

The base calls are at `dc2a1a7:src/browser/HostSnapshot.ts:148`, `:159`, and `:174`; the subject calls `writeHostValue` at `src/browser/HostSnapshot.ts:319`, whose branches are at `src/browser/helpers.ts:925`. Ordering remains tokens → `class` cleanup → properties → `style` cleanup → attributes (`src/browser/HostSnapshot.ts:145`). Ownership checks, marking before writes, withdrawal, and final cleanup remain equivalent. The unchanged snapshot assertions still bind to these operations.

No additional behavior defect outside the claims was established by this source audit.

VERDICT: PASS
