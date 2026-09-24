# J-CAROUSEL audit round 5 (the landing round's second pass) — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d290-1367-7f91-9fb8-94143668f9ed`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-carousel-audit-5.jsonl` (launch copy under `tmp/codex/`); 30 commands; 347 s; usage {"input_tokens":1729632,"cached_input_tokens":1553920,"cache_write_input_tokens":0,"output_tokens":9197,"reasoning_output_tokens":2039}. Retained verbatim from the exec's last message.

---

Objective lane. Source paths below are relative to the Carousel worktree; evidence filenames are relative to the brief’s `units/` directory. This is a source-and-record audit, with no browser test, build, mutation, or gate rerun.

1. **CONFIRMED — the tab conflict entry and its proof.**

   [Delegate.ts:438](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Delegate.ts:438) requires an existing control, `!isDisabled(control, this.#tab.classes.disabled)`, and no Tab owner. The disabled read matches the route’s refusal at `Delegate.ts:552`. The remarks and conflict comment describe that condition (`:96`, `:412`).

   **Attack that failed:** remove only the new disabled predicate. The instrument specifies precisely that mutation (`j-carousel-mutations-5.py:311`). Its recorded result names the new case as `EXACT`, with `1 failed of 94` (`j-carousel-mutations-5.log.txt:111`). The original red run fails at `disabled.dispatchEvent(click)`, receiving `true` instead of `false` (`j-carousel-red-5.log.txt:19`).

   **The assertions distinguish the mutation.** Without the predicate, the disabled host enters the conflict set as both Tab and Carousel, so the click is refused before prevention or construction. The test requires prevention, Carousel index `1`, no Tab, and only the Carousel pre-change event. Its enabled neighbour requires no prevention, no owners, no additional event, and the original active item ([Delegate.test.ts:2785](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/tests/src/browser/Delegate.test.ts:2785)). That neighbour also detects simply omitting the Tab conflict entry.

   The whole-file mutation row binds this proof because it identifies the collected failing case and its assertions distinguish the edit. An aggregate failure tally without the named case would not establish that binding.

   **Every conflict entry against E12:**

   | Route | Conflict entry compared with route eligibility |
   |---|---|
   | Button | Closest contained trigger, with no Button owner; neither entry nor route checks disabled state (`Delegate.ts:419`, `:431`, `:461`). |
   | Collapse | Unowned panels from the same `readTargets` call; neither checks disabled state (`:434`, `:478`). Collection includes outside-root panels, but those cannot duplicate another route’s contained host. `querySelectorAll` supplies unique panels (`helpers.ts:164`). |
   | Alert | Shared `#locate` performs the disabled and containment checks before the unowned-host entry is collected (`:425`, `:437`, `:537`). |
   | Tab | Shared disabled semantics, contained control, and absent Tab owner (`:438`, `:545`). |
   | Dropdown | Contained toggle, shared disabled semantics, and absent Dropdown owner (`:443`, `:595`). |
   | Carousel | Shared move validation and contained host-token check, then absent Carousel owner; neither checks disabled state (`:428`, `:448`, `:679`, `:698`, `:708`). |

   Refusal precedes all routes and marks (`Delegate.ts:390`). Existing ownership removes that route’s construction candidate, as E12 requires (`decisions.md:55`). Different hosts do not conflict. Nested delegates evaluate their own roots and current owners, consistent with E12’s amendment (`decisions.md:57`).

2. **BROKEN — the route list is correct, but the Bootstrap equivalence is false.**

   The revised sentence correctly identifies Alert, Tab, and Dropdown as checking disabled state, and Button, Collapse, and Carousel as checking none. The route methods did not change. Bootstrap’s corresponding Button, Collapse, and Carousel data APIs likewise contain no disabled check (`bootstrap/js/src/button.js:57`, `collapse.js:280`, `carousel.js:432`).

   However, [guides/veneer.md:709](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/guides/veneer.md:709) describes the preceding reading as Bootstrap’s `isDisabled` reading. They differ on this concrete state:

   ```html
   <fieldset disabled>
     <button type="button" data-bs-toggle="tab">Tab</button>
   </fieldset>
   ```

   The button has no own `disabled` attribute or disabled token. Its reflected `disabled` property is `false`, while its platform disabled state is true because of the fieldset. Bootstrap returns the property directly (`node_modules/bootstrap/js/src/util/index.js:135`); Veneer returns true through `matches(':disabled')` (`helpers.ts:372`). The [HTML disabled-state rules](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute) distinguish inherited disabledness from the control’s own attribute.

   This is already represented in the supplied suite: `helpers.test.ts:701` constructs that fieldset/button state and requires Veneer’s helper to return true. The retained green helper row covers that file (`j-carousel-mutations-5.log.txt:117`). The Bootstrap result is a source derivation, not a newly executed comparison.

   **Smallest correction:** qualify or remove the Bootstrap-equivalence phrase and explicitly retain the platform-disabled reading. Preserve the route behavior required by E16. Ordinary disabled tokens, an anchor’s `disabled="false"`, and a button’s own disabled attribute do not expose this difference.

3. **UNRESOLVED — the independent replay and subsequent landing gates remain pending.**

   The completed portions hold against the supplied evidence:

   - Established gate exits and results appear in `j-carousel-gates-5.log.txt:1`, `:51`, `:109`, `:130`, `:144`, and `:181`; they were not rerun.
   - Comparing the instruments preserves every round-4 mutation unchanged and adds the predicate mutation (`j-carousel-mutations-5.py:310`). A read-only, in-memory anchor check found no mismatch.
   - The log contains the claimed `EXACT` and `JOINED` populations, its green rows report no failed cases, and it ends `receipt: restored byte for byte` (`j-carousel-mutations-5.log.txt:112`, `:120`).
   - **Attack that failed:** compare the recorded post-run digests with the current named files. Every digest matches.
   - Comparing the round-4 and round-5 landing snapshots confines the new source/test/guide changes to the stated predicate, comments, test/import, and guide sentence. Current status agrees with the staged record; unstaged and unmerged diffs are empty. `HEAD` remains `60ea4a0`, with `MERGE_HEAD` `e75608b`.
   - The report records the prohibited operations as not performed (`j-carousel-report-5.md:83`). That supports what the report says; it is not an independent command-history reconstruction.

   `j-carousel-mutations-5-orchestrator.log.txt` is absent, as anticipated. **Settlement:** supply the independent replay receipt and the subsequent landing-gate results for the tree being landed.

**Findings fitting no claim:** none.

**Attacked and held.**

The Carousel write sequence follows Bootstrap’s indicator → order → direction → completion sequence (`bootstrap/js/src/carousel.js:341`), with the documented incoming-item animation wait. Custom-element reactions can execute before the DOM operation returns, making the post-write checks relevant. [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions)

| Door in `Carousel.ts` | Attack and result |
|---|---|
| Pre-change dispatch (`:315`) | Destruction, nested sliding, and sliding back to the original item are caught by lifetime, current change, slide tally, and item-state reads (`:321`). |
| Leaving indicator token and attribute (`:350`, `:364`) | Removing outgoing active, adding incoming active, or rewriting that indicator’s token/attribute fails the resulting-state checks. |
| Arriving indicator token and attribute (`:381`, `:395`) | The corresponding item states and that indicator’s preserved/then-written attribute are checked. |
| Incoming order (`:414`) | Removing incoming order or adding outgoing order fails the check. |
| Outgoing and incoming direction (`:428`, `:447`) | Direction requirements accumulate while active/order requirements remain enforced. |
| Animation await (`:451`) | Destruction, membership loss, and moving-phase token changes are checked again after settlement. |
| Incoming cleanup, incoming activation, outgoing cleanup (`:455`, `:473`, `:491`) | Reactions that contradict each resulting phase prevent the next write or completed event. |

Every listed write passes through `#apply` (`:544`). Destruction fails the lifetime check; `next` and `previous` refuse re-entry during writing, while `slide` waits (`:243`, `:282`). No overwrite vector survived within these documented phase requirements. Indicator checks are deliberately local to the indicator being written (`guides/veneer.md:1700`); continuous monitoring of previously written indicators is not promised.

The retained timing proofs distinguish their named mutations:

| Proof | Distinguishing mutation and assertion |
|---|---|
| Pause during `slide` dispatch | Move the pause-tally read after dispatch; the completed-slide tally must remain `1` (`Carousel.test.ts:985`; mutation log `:107`). |
| Mouse movement after a tap | Remove movement/press registrations or omit disarming; continued hover must stop cycling (`Carousel.test.ts:1005`; log `:108`, `:109`). This does not independently pin removal of the press listener alone. |
| Stationary mouse release after a tap | Remove only the release registration; the proof records touch then mouse release, retained hover, and no cycling after the deferral (`Carousel.test.ts:1057`; log `:110`). |

Nested-root Carousel marking prevents a second advance (`Delegate.test.ts:2705`; mutation log `:79`). Destruction in an earlier route leaves Carousel unmarked for the outer delegate (`:2847`; log `:103`). Destruction during construction destroys the newly constructed engine before driving it (`:2875`; log `:104`). These whole-file rows name the affected proofs; `JOINED` establishes binding, not exclusive failure.

The guard’s exception containment, ride parsing, and element-view reduced-motion lookup withstand their recorded mutations (`validators.ts:284`; `parsers.ts:194`; `helpers.ts:392`; mutation log `:84` through `:89`). The readonly Carousel contract and asynchronous refusal/queueing behavior agree with the implementation (`types.ts:2119`; `Carousel.ts:240`, `:281`).

**Referrals and bounds.** Carry claim 2’s qualification to the guide item; verify the helper comparison before accepting that correction. Claim 1’s E12 repair stands independently of that documentation defect. E13’s documented restoration limitations remain outside this repair. No current-round counterpart verdict was read. No file was written. No `prove` call was attempted, so there is no refused-call record or `prove` receipt.

VERDICT: FAIL 2, 3; outside the claims: none
