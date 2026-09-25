# J-SAMEWAY-ENGINES-A rounds 2 and 3 audit, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6b4-ffff-7582-ade7-cad012a3266e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-engines-a-audit-3.jsonl` (launch copy under `tmp/codex/`); 29 commands; 538 s; usage {"input_tokens":2981352,"cached_input_tokens":2798080,"cache_write_input_tokens":0,"output_tokens":14257,"reasoning_output_tokens":4594}. Retained verbatim from the exec's last message.

---

Source audit of `dc2a1a7` against `2760f7e`. No tests were run. The failing inputs below are source deductions. Executed proof evidence comes from the retained Orchestrator logs; their source digests match the audited commit.

| Claim | Ruling | Evidence | Mutation and assertion distinction |
|---|---|---|---|
| **1. R1: prior-value returns hold throughout the engines** | **FAIL** | Collapse omits recording before its final size removals and its hide’s final `host` addition (`src/browser/Collapse.ts:301`, `:403`, `:408`). An earlier unchanged write can leave those targets unrecorded. The inputs below reach this gap. The round-1 Tab and Carousel witnesses are repaired (`src/browser/Tab.ts:253`, `:267`; `src/browser/Carousel.ts:535`, `:540`, `:595`). | `A2-collapse-size` and `LEAF-prior` distinguish missing or incorrect restoration when the initial size changes. **They don't distinguish the gap:** the prior-size fixture starts at `12px`, so writing `0px` records it (`tests/src/browser/Collapse.test.ts:1462`, `:1473`). The hostless fixture stops during the early removal, before completion (`:1514`, `:1536`). |
| **2. Each return reads the call** | **CONFIRMED** | Each `#rewind` passes a closure over its call identity: `src/browser/Collapse.ts:503`, `Toast.ts:331`, `Tab.ts:361`, `Carousel.ts:690`. Their `#owns` methods also read lifetime (`Collapse.ts:456`, `Toast.ts:284`, `Tab.ts:319`, `Carousel.ts:631`). The shared loop returns immediately when ownership fails (`src/browser/helpers.ts:961`). | `LEAF-stop` changes `return` to `continue`. **Distinguished:** the assertion detects another ownership read; removing the guard also changes the remaining tokens (`tests/src/browser/helpers.test.ts:1562`). The retained mutation fails through an assertion. |
| **3. L1: shared implementation and immutable input list** | **CONFIRMED** | The implementations reside in `src/browser/helpers.ts:883`, `:903`, `:928`, and `:959`. Engine methods retain the identity boundary, without private copies. Recording returns the original list or a spread copy; rewinding reverses a copy (`:940`, `:942`, `:960`). | `LEAF-unchanged`, `LEAF-once`, `LEAF-category`, `LEAF-order`, and `LEAF-skip` are distinguished by list identity, stored entries, and observed writes (`tests/src/browser/helpers.test.ts:1478`, `:1492`, `:1510`, `:1523`). Mutating the input list would also violate the retained `first`-list assertion at `:1507`; that particular mutation isn't in the retained instrument. |
| **4. L2: absence and unchanged snapshot readings** | **CONFIRMED** | The category expressions match the base exactly; the comparison follows below. `HostSnapshot.save` still resolves names before reading, joins existing records without rereading, and saves priority separately (`src/browser/HostSnapshot.ts:100`, `:108`, `:113`, `:114`). The snapshot test file is unchanged. | `LEAF-read-absent`, `LEAF-read-empty`, and `LEAF-read-token` are distinguished by explicit value assertions (`tests/src/browser/helpers.test.ts:1423`, `:1443`). Removing the snapshot’s priority read would violate `tests/src/browser/HostSnapshot.test.ts:70` and `:1073`; the retained instrument doesn't plant that mutation. |
| **5. L3: declaration and Surface parity** | **CONFIRMED** | `HostChange` has its sole source declaration at `src/browser/types.ts:343`. Its summary matches `guides/veneer.md:64`; helper summaries at `src/browser/helpers.ts:872`, `:891`, `:914`, and `:946` match guide rows `:71`–`:74`. The browser barrel exports their owning modules (`src/browser/index.ts:1`, `:3`). | Mechanical comparison; no behavioral mutation applies. |
| **6. The proofs bind** | **CONFIRMED** | The base log records assertion failures for the named return cases, including the round-1 witnesses (`j-sameway-engines-a-red-3-orchestrator.log.txt:3`, `:19`, `:31`, `:33`). The mutation log reports assertion failures, a held control, and refused `BOOM` and `UNBOUND` rows (`j-sameway-engines-a-mutations-3-orchestrator.log.txt:40`, `:55`, `:57`, `:58`, `:59`). The instrument rejects uncollected cases, suite errors, and non-assertion failures (`j-sameway-engines-a-mutations-3.py:213`, `:230`, `:241`). | The named `A2-*`, `R1-carousel-*`, and `LEAF-*` mutations change assertions on returned values, token membership, or write order. **Distinguished on their fixtures.** The equivalent-condition control passes; thrown errors are refused. This establishes the logged distinctions, not coverage of the missing Collapse recordings. |
| **7. The guide’s return sentences hold** | **FAIL** | Collapse promises restoration of the inline size and `host` token (`guides/veneer.md:1112`), which the inputs below contradict. The target-reading clauses match the shared rewind (`src/browser/helpers.ts:962`). The audited Tab, Carousel, and Toast return descriptions match their recorded-target paths (`guides/veneer.md:1395`, `:1994`, `:2501`). | The existing return mutations distinguish the documented behavior on their fixtures. **They don't distinguish Collapse’s unchanged-initial-write paths**, for the reasons under claim 1. |
| **8. Greenfield and scope** | **CONFIRMED** | Commit path sets match the stated round and integration boundaries. The retained status lists those same paths (`j-sameway-engines-a-3-status.txt:1`). The former private record/read/write and directional-return methods have no declaration or caller in the audited engines; change paths call the shared helpers and their identity-bound `#rewind` methods. The export-list integration appears at `tests/src/browser/index.test.ts:208`, `:215`, `:219`, and `:222`. | Mechanical inspection; no behavioral mutation applies. |

The following inputs falsify claims 1 and 7.

- **Collapse hide retains a `host` token that was initially absent.** Use a connected custom-element panel carrying `show`, without `collapse`, and no triggers. Give it a one-shot class reaction that adds `show` when completion first adds `collapse`. Call `hide()`. The early `collapse` removal changes nothing, so `recordHostChange` records nothing (`src/browser/Collapse.ts:365`). Completion adds `collapse` without recording that addition (`:408`). The reaction adds `show`; the token mismatch returns before phase invalidation, preserving ownership for rewind (`:473`). Rewind has no `collapse` entry. The call resolves `false` with `collapse show`; prior-value restoration requires `show`.

- **Collapse loses an inline size whose earlier writes changed nothing.** Use an empty connected panel with `height: 0px`, zero measured height and scroll height, and no triggers. For `show()`, start with `collapse`; on the final height removal, a one-shot style reaction removes `show`. The writes of `0px` record nothing (`src/browser/Collapse.ts:234`, `:270`), but final removal has no recording call (`:301`). Rewind leaves height absent instead of restoring `0px`. The hide counterpart starts with `collapse show`; its measured-size write records nothing (`:342`), and a reaction to size removal adds `show` (`:403`). That return also leaves height absent.

The smallest repair is to record each completion write before performing it, including these removals and the hide’s `host` addition. Recording must remain conditional on a changed value; recording every earlier no-op would overwrite unrelated host edits.

The round-1 witnesses have these results when traced through `dc2a1a7`.

| Witness | Result and evidence | Proof distinction |
|---|---|---|
| Closed outgoing dropdown | Its absent toggle/menu tokens produce no records; rewind leaves them absent. The wrapper attribute returns to its actual prior value (`src/browser/Tab.ts:252`, `:491`; `tests/src/browser/Tab.test.ts:1665`). | Restoring an inverse destination value would add tokens and fail the exact class assertions. The retained round-2 `R1-tab-inverse` row demonstrates this distinction. |
| Shared open dropdown | Deselection records its prior open state. Selection doesn't replace those entries. Rewind skips targets already reopened and preserves their initial values (`src/browser/helpers.ts:934`; `tests/src/browser/Tab.test.ts:1728`). | Replacing the initial record with the last write’s prior value closes the dropdown and fails the assertions. The retained round-2 `R1-tab-last` row demonstrates this distinction. |
| Pre-existing incoming Carousel order token | The addition records nothing; completion’s removal records the token’s presence. Rewind restores it (`src/browser/Carousel.ts:540`; `tests/src/browser/Carousel.test.ts:2116`). | `R1-carousel-order` deletes that removal record. The token-membership assertion distinguishes it. The analogous outgoing-direction assertion distinguishes `R1-carousel-direction` (`:2151`). |

The exit accounting follows. A **record** means the target and its value immediately before its first changing write. Each listed addition to the records occurs only when the target is unrecorded and the next value differs. Every rewind processes the accumulated records in reverse order, skips targets already at their prior value, and stops when ownership fails (`src/browser/helpers.ts:928`, `:959`).

For Collapse, the records concern transition, host, dimension, and trigger state. The following table lists every change-method exit and the records available there.

| Collapse exit | Records available to rewind |
|---|---|
| Show refusal, prevention, or post-dispatch stop (`src/browser/Collapse.ts:185`, `:187`, `:198`) | None; no rewind. |
| Show stops during sibling hiding (`:203`) | None for this panel; sibling changes belong to their engines. |
| Show stops after transition addition (`:222`) | Transition’s prior presence. |
| Show stops after host removal (`:232`) | Previous records, plus host’s prior presence if removed. |
| Show stops after zero size (`:242`) | Previous records, plus prior dimension if changed. |
| Show stops at a trigger token or attribute (`:253`, `:265`) | Previous records, plus the changed trigger-target prefix, in write order. |
| Show stops after scroll size or its wait (`:280`, `:283`) | Previous records, plus dimension if this is its first changing write. |
| Show stops after host/shown completion (`:295`) | Previous records, plus host if this is its first changing write. No shown entry. |
| Show stops after transition removal (`:299`) | Same records; transition’s original record remains. |
| Show stops after size removal (`:306`) | Same records. **A dimension omitted by earlier no-ops remains missing.** |
| Show completes (`:309`) | No rewind; dispatches `shown`, then returns lifetime. |
| Hide refusal, prevention, or post-dispatch stop (`:314`, `:316`, `:324`) | None; no rewind. |
| Hide stops after measured size (`:352`) | Prior dimension if changed. |
| Hide stops after transition addition (`:362`) | Previous records, plus transition’s prior presence. |
| Hide stops after host/shown removal (`:374`) | Previous records, plus host if removed. No shown entry. |
| Hide stops at a trigger token or attribute (`:388`, `:400`) | Previous records, plus the changed trigger-target prefix. |
| Hide stops after size removal or its wait (`:404`, `:407`) | Same records. **The removal creates no missing dimension record.** |
| Hide stops after host addition (`:413`) | Same records. **The addition creates no missing host record.** |
| Hide stops after transition removal (`:418`) | Same records. |
| Hide completes (`:421`) | No rewind; dispatches `hidden`, then returns lifetime. |

Collapse’s rewind restores recorded token membership, attribute strings or absence, and dimension strings or absence. Phase failures invalidate identity and suppress rewind writes (`src/browser/Collapse.ts:481`). Sibling acquisition, sibling destruction, and sibling hides aren't this panel’s return entries.

For Toast, the records are fade when the animated show changes it, followed by transition.

| Toast exit | Records available to rewind |
|---|---|
| Show refusal, prevention, or post-dispatch stop (`src/browser/Toast.ts:178`, `:180`, `:185`) | None; no rewind. |
| Show stops after fade (`:199`) | Fade if added. |
| Show stops after shown/transition, the wait, or transition removal (`:213`, `:216`, `:219`) | Fade if added, then transition. The removed transition’s record remains. |
| Show completes (`:223`) | No rewind; dispatches `shown` and conditionally arms the timer. |
| Hide refusal, prevention, or post-dispatch stop (`:227`, `:229`, `:232`) | None; no rewind. |
| Hide stops after transition addition, the wait, or completing removal (`:249`, `:253`, `:260`) | Transition. |
| Hide completes (`:262`) | No rewind; dispatches `hidden`. |

Toast’s rewind removes transition if still present, then fade if the show added it and it remains present. The shown token isn't an entry. Phase invalidation suppresses rewind (`src/browser/Toast.ts:309`). Timer clearing remains a release; successful-show arming isn't a return.

For Tab, each selection sequence visits `aria-selected`, `tabindex`, dropdown toggle, dropdown menu, and wrapper `aria-expanded`, where applicable (`src/browser/Tab.ts:491`).

| Tab exit | Records available to rewind |
|---|---|
| Refusal, destruction during dispatch, prevention, or post-dispatch stop (`src/browser/Tab.ts:187`, `:195`, `:197`, `:203`) | None; no rewind. |
| Stops after outgoing active removal or blur (`:230`, `:233`) | Outgoing active. Blur adds no record. |
| Stops after outgoing pane removal (`:248`) | Previous records, plus changed outgoing-pane active and shown targets. |
| Stops during outgoing selection (`:255`) | Previous records, plus the changed selection prefix. |
| Stops at incoming control activation (`:264`) | Same records; incoming control active isn't recorded. |
| Stops during incoming selection (`:269`) | Previous records, plus previously unrecorded changed selection targets. Shared dropdown targets retain their earlier records. |
| Stops after incoming pane active (`:281`) | Previous records, plus pane active if changed. |
| Stops after incoming pane shown, fade wait, or outgoing hidden dispatch (`:288`, `:292`, `:297`) | Previous records, plus pane shown if changed. |
| Completes (`:300`) | No rewind; dispatches `shown`, then returns lifetime. |

Tab restores each recorded token and attribute to its actual prior value, including absent attributes and nonstandard attribute strings. List or pane failures invalidate identity and suppress rewind (`src/browser/Tab.ts:340`). Blur and an already delivered `hidden` event aren't reversed.

For Carousel, indicator records follow the executed indicator prefix. Later records follow the order and direction writes, then completion removals.

| Carousel exit | Records available to rewind |
|---|---|
| `slide` refusal; step refusal; prevented or superseded move (`src/browser/Carousel.ts:269`, `:273`, `:307`, `:310`, `:314`, `:341`, `:355`) | None; no rewind. |
| Stops after a leaving indicator’s token or attribute removal (`:395`, `:413`) | Changed indicator targets through that write. |
| Stops after an arriving indicator’s token or attribute write (`:437`, `:458`) | Previous records, plus changed arriving-indicator targets through that write. |
| Stops after incoming order (`:480`) | Previous records, plus incoming order if added. |
| Stops after outgoing direction (`:502`) | Previous records, plus outgoing direction if added. |
| Stops after incoming direction or transition wait (`:525`, `:530`) | Previous records, plus incoming direction if added. |
| Stops after incoming completion removal (`:562`) | Previous records, then incoming direction and order if their removal is their first changing write. |
| Stops after incoming activation (`:582`) | Same records; incoming active isn't recorded. |
| Stops after outgoing completion removal (`:616`) | Previous records, then outgoing active, order, and direction wherever not already recorded and changed. |
| Completes (`:622`) | No rewind; finishes the slide, dispatches `slid`, and applies interaction ride behavior. |

Carousel restores recorded indicator values and item-token membership, including pre-existing transition tokens removed during completion. A failed item/phase reading finishes the identity and suppresses rewind (`src/browser/Carousel.ts:666`). Every path through the `try` also finishes in `finally` and conditionally rearms cycling (`:623`).

No recorded attribute, token, or property-string prior was found to be fabricated: `recordHostChange` obtains it from the target. The missing Collapse records prevent restoration altogether. Inline priority is a separate omission described below.

`HostSnapshot.save` has the following equivalent readings at the base and subject commits.

| Target state | `2760f7e` reading | `dc2a1a7` reading |
|---|---|---|
| Attribute present with value | Attribute string | Same string |
| Attribute present and empty | `''` | `''` |
| Attribute absent | `undefined` | `undefined` |
| Token present | Token name | Token name |
| Token absent | `undefined` | `undefined` |
| Inline property present | Property value, with priority saved separately | Same value, with priority saved separately |
| Inline property unset | `undefined`, with the platform’s priority reading | Same |

The base expressions are at `2760f7e:src/browser/HostSnapshot.ts:112`; the replacement expressions are at `src/browser/helpers.ts:883`, called from `src/browser/HostSnapshot.ts:113`. Name resolution, shared holdings, presence records, restoration order, reentry, withdrawal after failure, and `clear` remain unchanged. The assertions throughout `tests/src/browser/HostSnapshot.test.ts` still address those behaviors, including priority (`:59`, `:1046`), empty attributes (`:23`), shared presence (`:612`), reentry (`:762`), failure (`:1149`), and name matching (`:1240`). This is source equivalence, not a fresh passing test result.

A behavior defect outside the claims’ string-value accounting remains:

- **Collapse’s return loses inline property priority.** Take the prior-size fixture at `tests/src/browser/Collapse.test.ts:1444`, set its initial height to `12px !important`, and retain the reaction that removes `show` at the completing token write. The show replaces that declaration with an unprioritized size. Its record retains only `'12px'` (`src/browser/types.ts:343`), and rewind calls `setProperty(name, value)` without the original priority (`src/browser/helpers.ts:910`). The return leaves `12px` with empty priority. The fixture’s height assertion at `:1473` doesn't distinguish this loss. Snapshot destruction does preserve priority; the change’s rewind doesn't.

VERDICT: FAIL 1, 7
