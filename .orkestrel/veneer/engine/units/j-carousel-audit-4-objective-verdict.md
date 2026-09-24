# J-CAROUSEL audit round 4 (the landing round) — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d26c-8833-7172-a06d-e7fe71c15066`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-carousel-audit-4.jsonl` (launch copy under `tmp/codex/`); 31 commands; 505 s; usage {"input_tokens":2921577,"cached_input_tokens":2764928,"cache_write_input_tokens":0,"output_tokens":13408,"reasoning_output_tokens":4702}. Retained verbatim from the exec's last message.

---

Objective lane. This is a source-and-record audit; no browser test, build, mutation, or gate was rerun. Source paths below are relative to the Carousel worktree; evidence filenames are relative to the brief’s `units/` directory.

1. **CONFIRMED — mouse-release invalidation.**  
   [Carousel.ts:194](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Carousel.ts:194) registers the release listener alongside movement and press. `#defer` ignores mouse releases; `#notice` then clears the exemption and disarms under hover (`Carousel.ts:638`, `Carousel.ts:666`). A pending touch timeout subsequently reaches `#arm`, which now respects hover.

   **Attack that failed:** remove only the `pointerup → #notice` registration. The instrument makes exactly that edit (`j-carousel-mutations-4.py:306`); its named case fails `EXACT` (`j-carousel-mutations-4.log.txt:110`). The original red log fails at the timer assertion with `expected 20 to be +0` (`j-carousel-red-4.log.txt:10`).

   The proof establishes touch release followed by mouse release, continued hover, no slides after the deferral expires, and resumed cycling after leaving (`Carousel.test.ts:1081`, `:1106`, `:1110`). Those assertions distinguish the missing registration. The trusted-tap case remains a useful opposite control: removing the exemption makes its awaited cycling fail (`Carousel.test.ts:948`; mutation log `:99`). Compatibility mouse events do not supply an additional mouse `pointerup`; the [Pointer Events compatibility mapping](https://www.w3.org/TR/pointerevents3/#compatibility-mapping-with-mouse-events) supports that distinction.

   The requested comments and guide sentence name release (`Carousel.ts:67`, `:109`, `:635`; `guides/veneer.md:1619`).

2. **CONFIRMED — renamed titles and mutation targets.**  
   **Attack that failed:** look for stale temporal titles or mutation selectors targeting the former names. The tests use the requested titles (`Carousel.test.ts:655`, `:1005`), and the movement and disarming mutations target the renamed case (`j-carousel-mutations-4.py:301`). Their recorded failures name that case exactly (`j-carousel-mutations-4.log.txt:108`).

   The movement proof distinguishes removing the movement/press registration block and removing disarming: it records a mouse movement without leaving the host, asserts hover, then asserts a stable slide tally (`Carousel.test.ts:1041`). It does **not** independently distinguish removal of the press listener alone; its input is movement.

3. **BROKEN — the retained delegation sentence remains false.**  
   The mechanical merge holds: the barrel order, appended Carousel declarations, retained listener case, vocabulary type case, guide placement, and shipped Carousel row are present (`index.ts:15`; `constants.ts:287`; `types.ts:135`; `Delegate.test.ts:253`; `index.test.ts:32`; `guides/veneer.md:1561`, `:7443`). Comparison with `main` shows the landed declarations retained, and the unmerged diff is empty.

   However, [guides/veneer.md:706](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/guides/veneer.md:706) says every route except Carousel reads disabled state through `isDisabled`. Button and Collapse do not: their routes proceed directly to marking/construction and toggling (`Delegate.ts:457`, `:468`). The suite explicitly expects a dispatched click to acquire a disabled Button host (`Delegate.test.ts:164`).

   **Smallest correction:** describe disabled checks on Alert, Tab, and Dropdown specifically. Preserve Button, Collapse, and Carousel’s existing behavior; adding disabled refusals to make the sentence true would change behavior rather than repair the documentation.

4. **BROKEN — the shared conflict check over-refuses under E12.**  
   The requested fold exists: shared ownership, construction, marking, discard, and scan include Carousel; the scan precedes listeners and shares rollback; Carousel routes last and checks lifetime before marking (`Delegate.ts:147`, `:314`, `:343`, `:385`, `:675`, `:714`, `:779`).

   **Counterexample:** inside the delegate root, use an unowned host with:

   ```html
   <div id="gallery" class="carousel disabled"
        data-bs-toggle="tab" data-bs-target="#gallery" data-bs-slide="next">
     <div class="carousel-item active">One</div>
     <div class="carousel-item">Two</div>
   </div>
   ```

   Clicking this host makes [Delegate.ts:438](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Delegate.ts:438) include it as an unowned Tab control and `:444` include it as an unowned Carousel. The duplicate causes refusal at `:446`, before either route. But the Tab route would return at its disabled check (`:548`); only Carousel would construct. This contradicts E12’s “both would construct” condition (`decisions.md:53`). This conclusion is a source trace, not a newly executed browser result.

   **Smallest correction:** apply the Tab route’s `isDisabled` predicate when collecting its conflict entry. Pin the example above, with an enabled Tab control as the adjacent case that must still conflict. Existing Button/Carousel and Collapse/Carousel refusal cases do not cover this distinction.

   The supplied delegate proofs bind as follows:

   | Proof | Mutation that breaks it | Assertion discrimination |
   |---|---|---|
   | Control routing (`Delegate.test.ts:2471`) | Remove `#routeCarousel` | Expected indices distinguish missing routing. Named `JOINED` failure, log `:67`. |
   | Construction scan (`:2547`) | Remove Carousel scan loop | Expected acquired engines distinguish omission. Named `JOINED`, log `:74`. |
   | Load-only scan (`:2547`) | Remove `parseRide` guard | `later` must remain unowned (`:2581`). Named `JOINED`, log `:75`. |
   | Scan rollback (`:2597`) | Remove destruction from catch | Earlier acquired host must be released (`:2618`). Named `JOINED`, log `:76`. |
   | Button/Carousel conflict (`:2726`) | Remove Carousel conflict entry | No events, owners, or prevention are permitted; consumer-owned control then permits routing. Named `JOINED`, log `:77`. |
   | Collapse/Carousel conflict (`:2759`) | Make collapse collection admit nothing | No owners/events and unchanged `aria-expanded` distinguish acceptance. Named `JOINED`, log `:78`. |
   | Nested roots (`:2705`) | Remove Carousel mark | Index must advance only to `1`. `EXACT`, log `:79`. |
   | Observer release (`:2547`) | Omit `Carousel.find` from discard | Removed host must lose ownership and stop cycling (`:2587`). Named `JOINED`, log `:83`. |
   | Destroyed inner delegate (`:2808`) | Remove lifetime check before Carousel mark | Outer delegate must acquire and advance the carousel. `EXACT`, log `:103`. |
   | Destruction during construction (`:2836`) | Acquire despite aborted delegate | No owner, slide event, or pointer token may remain. Named `JOINED`, log `:104`. |

   These whole-file rows identify the named failing cases, and the assertions distinguish the stated mutations. Their `JOINED` labels establish no exclusive, single-case red-first receipt; the aggregate failure tally alone would not bind any proof. None distinguishes the disabled-Tab counterexample.

5. **UNRESOLVED — pending independent replay and landing gates.**  
   The retained evidence supports the completed portion. `j-carousel-gates-4.log.txt:1` records the established exits. Comparing instrument labels preserves the round-3 population and adds the release mutation. The mutation log contains the claimed `EXACT`, `JOINED`, and green populations (`:2` through `:117`) and ends:

   `receipt: restored byte for byte`

   **Attack that failed on that portion:** compare the recorded post-run hashes with the current files. Every named source and `_carousel.scss` matches.

   The Orchestrator replay file is absent, as the brief anticipates. Its replay and subsequent landing gates cannot be confirmed from the writer’s receipt. **Settlement:** supply the independent replay and post-replay landing receipts for the tree being landed.

   The inherited red-first proofs also remain bound:

   | Proof | Mutation | Binding |
   |---|---|---|
   | Pause from `slide` listener (`Carousel.test.ts:985`) | Read the pause tally after dispatch | The slide tally must remain `1`; `EXACT`, mutation log `:107`. |
   | Mouse movement after tap (`:1005`) | Remove movement/press registrations, or omit disarming | Continued hover must stop cycling; `EXACT`, log `:108`, `:109`. |
   | Stationary release after tap (`:1057`) | Remove only release registration | No cycling after touch delay; `EXACT`, log `:110`, plus original red log `:19`. |

6. **BROKEN — the universal added-line assertion exceeds its evidence.**  
   Current status agrees with the staged snapshot, with no unstaged or unmerged entries. The named off-limits engines match their relevant parent content.

   But the supplied landing diff includes `] as const)` from [ScrollSpy.test.ts:607](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/tests/src/browser/ScrollSpy.test.ts:607) (`j-carousel-4.diff:10590`). It also adds direct element narrowing through `instanceof Element`, for example [Delegate.test.ts:1621](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/tests/src/browser/Delegate.test.ts:1621) (`j-carousel-4.diff:7221`). Thus the literal claims of no `as` and universal `isInstance` usage over the landing additions do not hold.

   **Bound:** these are inherited additions from `main`, not evidence of unauthorized Carousel edits. The TypeScript rule permits appropriate `as const`; its presence is not independently a coding-law violation. Correct the claim’s population and exceptions rather than removing permitted syntax to satisfy an inaccurate assertion. The report records the stated operational restrictions (`j-carousel-report-4.md`, “Deviation state”); source comparison cannot independently reconstruct every command the writer ran.

**Findings fitting no claim:** none.

**Attacked and held.** The Carousel sequence follows Bootstrap’s indicator → order → direction → completion ordering (`bootstrap/js/src/carousel.js:341`), with its documented incoming-item animation wait. The write-door audit found these checks:

| Door in `Carousel.ts` | Reaction attack and containment |
|---|---|
| Pre-change dispatch (`:315`) | Destruction, nested slide, and return-to-original-item takeover are checked through lifetime, in-flight state, and slide tally (`:321`). |
| Leaving indicator token/attribute (`:350`, `:364`) | Checks pair membership, outgoing/incoming active state, and that indicator’s token and attribute. |
| Arriving indicator token/attribute (`:381`, `:395`) | Checks the corresponding active states and preserved/then-written `aria-current`. |
| Incoming order (`:414`) | Requires incoming order and outgoing active; rejects incoming active and outgoing order. |
| Outgoing then incoming direction (`:428`, `:447`) | Accumulates the direction requirements while retaining order and active checks. |
| Animation completion (`:451`) | Rechecks lifetime, membership, and moving-phase tokens after the await. |
| Incoming cleanup, activation, outgoing cleanup (`:455`, `:473`, `:491`) | Checks each resulting phase before the next write or completed event. |

Every write passes through `#apply`; destruction fails its lifetime check. During those writes, `next`/`previous` refuse re-entry and `slide` waits on the current change (`Carousel.ts:243`, `:282`, `:544`). Custom-element reactions can execute before the DOM operation returns, so these post-write checks address the relevant ordering. [HTML reaction processing](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions)

No overwrite vector survived **within the documented phase checks**. Indicator checks are local to the indicator being written (`guides/veneer.md:1699`); the evidence does not establish continuous monitoring of every previously touched indicator. The token-removal, membership, transition, completion, and dispatch-tally mutations bind their named assertions (`j-carousel-mutations-4.log.txt:54`, `:55`, `:56`, `:57`, `:92`, `:93`, `:94`, `:95`).

The guard’s exception containment, ride spellings, and element-view reduced-motion lookup also held their supplied attacks (`validators.ts:284`; `parsers.ts:194`; `helpers.ts:392`; mutation log `:84` through `:89`). The Carousel interface declares the implemented asynchronous results and readonly surface (`types.ts:2119`); reduced-motion suppression applies to arming, while explicit navigation remains available.

**Referrals and bounds.** Carry claim 3 to the guide correction and claim 4 to the shared Delegate conflict predicate, with browser reproduction before accepting the repair. Correct claim 6’s audit wording separately from behavioral changes. E13’s documented shared-restoration limitations remain outside this repair. No other lane’s verdict was read. No `prove` call was made, so there is no refused-call record or `prove` receipt to quote.

VERDICT: FAIL 3, 4, 5, 6; outside the claims: none
