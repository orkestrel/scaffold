# J-CAROUSEL audit round 3 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d23e-46f7-7510-a47c-59a7db74389d`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-carousel-audit-3.jsonl` (launch copy under `tmp/codex/`); 51 commands; 597 s; usage {"input_tokens":3190782,"cached_input_tokens":2976512,"cache_write_input_tokens":0,"output_tokens":15320,"reasoning_output_tokens":6271}. Retained verbatim from the exec's last message.

---

Objective lane — source review and retained execution evidence; no fresh browser execution.

Paths below are relative to `veneer/tmp/worktrees/carousel`; audit records are under `scaffold/.orkestrel/veneer/engine/units`.

1. **CONFIRMED — Pause tally before dispatch.**  
   `src/browser/Carousel.ts:313` captures `#pauses` before dispatch at `:314`. `pause()` increments it at `:259`; completion compares it at `:508`. I attacked the interaction restart with a pause inside `slide`: the changed tally prevents `start()`, and `#started === false` also prevents the ordinary re-arm.

   **Proof binding:** `tests/src/browser/Carousel.test.ts:985` asserts one completed slide after waiting 100 ms with a 10 ms interval. Moving the tally capture after dispatch distinguishes the mutation: the retained red run reports `expected 2 to be 1` (`j-carousel-red-3.log.txt:10`), and the mutation names that failing case, `EXACT` (`j-carousel-mutations-3.log.txt:107`). The existing `slid` proof remains at `Carousel.test.ts:842`; removing the completion comparison fails it by name (`mutations-3.log.txt:98`, `JOINED`).

2. **BROKEN — The invalidation sites omit a mouse release after the exemption was renewed.**  
   The registered listeners and `#notice` implementation match the claim (`Carousel.ts:194`, `:637`). The justification for omitting `pointerup` does not: an earlier mouse press does not establish that `#touched` remained clear until release.

   **Counterexample interleaving:** use `touch: true`, `pause: true`, cycling wanted, and a mouse resting over the host. Press and hold the mouse; tap the same host with touch; release the mouse without moving or crossing the host boundary. The mouse `pointerdown` precedes the touch release. That touch release sets `#touched = true` at `:667`. The subsequent mouse `pointerup` returns immediately from `#defer` at `:666` and reaches no `#notice` listener. When the touch deferral expires, `#arm` bypasses the still-present hover at `:601` and cycling resumes. Concurrent pointer types and a mouse release without another movement are permitted by the [Pointer Events specification](https://www.w3.org/TR/pointerevents3/#the-primary-pointer); its [pointerup rule](https://www.w3.org/TR/pointerevents3/#the-pointerup-event) requires no intervening movement.

   This is a source-derived counterexample, not an executed Chromium reproduction. It contradicts the claimed termination at genuine mouse activity and the reason given for excluding release.

   **Smallest correction:** route mouse `pointerup` through `#notice`, including through the existing `#defer` listener’s mouse branch. Keep touch/pen deferral and compatibility mouse events from clearing the exemption.

   **Proof binding:** the new movement proof at `Carousel.test.ts:1005` distinguishes removing the notice listeners and removing the immediate hover disarm: its unchanged-slide assertion at `:1052` fails under each recorded mutation (`mutations-3.log.txt:108`, `:109`, each `EXACT`). It does **not** distinguish deleting only the `pointerdown` listener, and it never exercises the interleaving above. The trusted-tap guard at `Carousel.test.ts:948` distinguishes removing the exemption from `#arm`; it fails by name in `mutations-3.log.txt:99`. Those bindings hold, but they do not establish complete invalidation coverage.

3. **CONFIRMED — The revised sentences describe the implemented rules.**  
   The pause wording appears at `guides/veneer.md:852`; the movement/press wording at `:864`; the qualified delegate destruction wording at `:974`. The class remarks and field comments agree (`Carousel.ts:65`, `:100`, `:109`).

   I attacked the delegate sentence by moving destruction across its mark. Destruction during an earlier route reaches the lifetime refusal before marking (`Delegate.ts:263`); destruction from the carousel’s `slide` dispatch occurs after `#mark` at `:264`. The event/route/host mark survives destruction (`:327`), so an outer delegate refuses that host. Construction-time destruction is handled by `#construct` at `:279`.

   The guide accurately names movement and press as the implemented invalidation sites. Claim 2’s broader mechanism defect requires a corresponding guide update when repaired. The existing guide gate is recorded at `j-carousel-gates-3.log.txt:89`; it was not rerun.

4. **CONFIRMED — Typed refusal fixture.**  
   `Carousel.test.ts:2017` declares `ReadonlyArray<readonly [string, string]>`, and `:2025` iterates that declaration. I searched the complete `tests/src/browser` subtree for a surviving `as const`; none was found. The attack was a surviving assertion elsewhere in that stated population, rather than checking only the changed fixture.

5. **UNRESOLVED — Orchestrator replay pending; retained instrument clauses hold.**  
   Static comparison found the round-2 mutation tuples unchanged and only the stated round-3 rows appended (`j-carousel-mutations-3.py:294`). Checking their replacements in memory found no anchor mismatch. The retained log records 108 mutation results: 69 `EXACT`, 39 `JOINED`; its `GREEN?` results carry the claimed populations and no failures (`j-carousel-mutations-3.log.txt:110`). Its closing line is `receipt: restored byte for byte` (`:118`).

   I attacked restoration evidence by comparing the logged digests with the current files: all matched. `_carousel.scss` also has no diff against `HEAD`. I attacked proof attribution by reading the instrument’s classification: it uses failed assertion titles, not merely a nonzero file exit (`j-carousel-mutations-3.py:318`, `:348`). A `JOINED` row therefore binds a named proof when that proof actually appears among its failures; it does not independently certify every assertion or every edited door.

   `j-carousel-mutations-3-orchestrator.log.txt` is absent. The required independent replay, including its restoration receipt, settles this remaining clause.

6. **CONFIRMED — Recorded scope, gates, and added syntax.**  
   Comparing the round-2 and round-3 diff sections found changes only in `Carousel.ts`, `Carousel.test.ts`, and `guides/veneer.md`; the other tracked sections are unchanged. The status contains the claimed unit files (`j-carousel-3-status.txt:1`).

   I attacked the added TypeScript using the installed compiler’s syntax tree, restricted to added lines. It found no prohibited assertion, `any`, non-null assertion, access modifier, default export, or directly invoked `instanceOf` guard. An in-memory negative control containing the prohibited constructs was detected. Text inspection found no added suppression or Bootstrap event wire dispatch/listener. Existing invoked guards outside the added lines are outside this claim’s population.

   The claimed exits are recorded in `j-carousel-gates-3.log.txt:22`, `:76`, `:89`, `:102`, `:124`, `:136`, `:149`, `:162`, `:200`, and `:585`. These are the Orchestrator’s established results, not fresh runs. The report explicitly records no `prove` call (`j-carousel-report-3.md:91`).

**Findings fitting no claim:** none.

**Attacked and held**

The inherited red-first proofs also distinguish their named mutations. Here, `C` means `tests/src/browser/Carousel.test.ts`, `D` means `tests/src/browser/Delegate.test.ts`, and log references mean `j-carousel-mutations-3.log.txt`.

| Proof | Mutation that breaks it | Distinguishing assertion and retained binding |
|---|---|---|
| Swipe destroyed during construction — `C:1651` | Keep the newly constructed swipe after carousel destruction | Restored host tokens at `C:1671`; `EXACT`, log `:91` |
| Newer slides return to the original active item — `C:1679` | Remove the slide-tally comparison | Outer result is false and event sequence excludes its completion, `C:1704`; `EXACT`, log `:92` |
| Indicator attribute takeover — `C:1718` | Remove indicator attribute comparisons | False result, no subsequent writes, retained `"step"` value, `C:1756`; `EXACT`, log `:93` |
| Outgoing order-token takeover — `C:1764` | Remove outgoing-order absence from `blocked` | No writes after the reaction, `C:1798`; `EXACT`, log `:94` |
| Incoming item removed — `C:1809` | Remove membership checks | False result and retained detached-item tokens, `C:1842`; `EXACT`, log `:95` |
| Pause in `slid` under interaction ride — `C:842` | Remove the pause-tally comparison | No further completed slide, `C:861`; named failure in `JOINED`, log `:98` |
| Mouse enters during animation — `C:864` | Remove hover from arming conditions | Quiet interval after completion, then progress after leaving, `C:891`; named failure in `JOINED`, log `:96` |
| Touch release during animation — `C:896` | Remove pending-touch condition from arming | Elapsed time respects the touch deferral, `C:923`; `EXACT`, log `:97` |
| Key starts interaction ride under hover — `C:926` | Remove hover from arming conditions | One slide while hovered, progress after leaving, `C:943`; explicitly listed joined failure, log `:96` |
| Items restore before swipe token — `C:1087` | Reverse restoration order | Original item tokens after replacement destruction, `C:1121`; `EXACT`, log `:102` |
| Earlier route destroys delegate — `D:1352` | Remove carousel route’s lifetime check | Outer delegate owns the carousel and releases it on destruction, `D:1376`; `EXACT`, log `:103` |
| Construction destroys delegate — `D:1380` | Acquire the constructed carousel despite delegate destruction | No registry owner, event, or surviving pointer token, `D:1413`; `EXACT`, log `:104` |
| Replaced pointer vocabulary — `C:1915` | Stop passing the carousel’s pointer token into `Swipe` | Replacing token present and default absent, `C:1988`; `EXACT`, log `:105` |

The original red readings are also retained in `tmp/j-carousel/red-2.log.txt:12` through its named failures; the round-3 proofs are ruled under claims 1 and 2 above.

The change sequence follows Bootstrap’s indicator → order → direction → completion writes (`node_modules/bootstrap/js/src/carousel.js:270`, `:347`, `:354`). The documented incoming-animation wait differs deliberately from Bootstrap’s outgoing target at `:365`.

I traced destruction, re-entry, and token changes at these doors:

| Door in `Carousel.ts` | Attack and result |
|---|---|
| `slide` dispatch, `:314` | Destroy, start a nested slide, or complete nested slides back to the original item: lifetime, in-flight state, tally, membership, and active-state checks refuse the displaced call at `:320`. |
| Leaving indicator token/attribute, `:350`, `:364` | Change outgoing/incoming active state or the current indicator’s expected token/attribute: the immediate post-write check refuses further writes. |
| Arriving indicator token/attribute, `:381`, `:395` | Remove its active token or rewrite its current attribute: the corresponding check refuses further writes. |
| Incoming order, `:414` | Remove the order token, add outgoing order, remove either item, or destroy: the check refuses continuation. |
| Outgoing/incoming direction, `:428`, `:446` | Remove a required written token or introduce a blocked token: the next door refuses continuation. |
| Animation await, `:450` | Destroy, remove an item, or change required tokens while suspended: `:451` refuses completion. |
| Incoming cleanup, `:455` | Restore removed order/direction or alter required active state: the check refuses the active-token write. |
| Incoming activation, `:473` | Remove incoming active or change outgoing required state: the check refuses outgoing cleanup. |
| Outgoing cleanup, `:491` | Restore a removed outgoing token or alter incoming completion state: the check refuses `slid`. |

During the write phase, re-entered `next`/`previous` refuse; `slide` waits (`Carousel.ts:242`, `:281`). Completed-event re-entry is admitted after `#finish` (`:505`), and the old call’s finalizer cannot clear the newer change (`:549`).

**Admission bound:** these checks are phase-specific. An earlier indicator reaction can change a later indicator’s `aria-current`; that later iteration reads the changed value and subsequently writes `"true"` (`Carousel.ts:378`, `:395`). This is an admitted overwrite, but the documented rule checks the current indicator at its own write doors (`guides/veneer.md:944`), not untouched indicators globally. Likewise, future direction tokens are not takeover predicates before their writing phase. No traced admission contradicted those stated phase rules.

E12’s refusal holds before routing when the competing routes would each construct on the same host (`Delegate.ts:181`, `:206`). A consumer-owned engine and routes driving different hosts remain permitted. Nested roots share event/route/host marks; a host outside an inner root remains unmarked for an outer root.

The guard contains throwing prototype/detail access and rejects malformed directions and positions (`validators.ts:160`; proofs at `validators.test.ts:171`). `parseRide` preserves the declared literals, maps Bootstrap spellings, and rejects other inputs (`parsers.ts:54`; proofs at `parsers.test.ts:47`). The audited public methods, vocabulary, event details, queueing, and reduced-motion behavior agree with `types.ts:1945`, `:1971`, `:2049`, and `:2085`, subject to the documented restoration bounds.

**Referrals:** carry claim 2 to the Orchestrator for a Chromium reproduction of mouse-down → touch-release → stationary mouse-up, followed by a regression that fails when mouse-release invalidation is removed. Retain the trusted-tap guard against over-correction. Carry claim 5’s replay to the landing evidence.

**Bounds:** no browser test, build, mutation run, or gate was rerun; no file was written and no agent was spawned. No `prove` call was made, so there is no refusal response to record. Runtime confirmations above rely on the retained executions; the new invalidation counterexample is explicitly a source/platform interleaving. E13’s carried restoration bounds and the scheduled landing work remain outside this round’s fixes.

VERDICT: FAIL 2, 5; outside the claims: none
