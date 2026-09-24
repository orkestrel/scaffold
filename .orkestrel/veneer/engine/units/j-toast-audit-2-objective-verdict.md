# J-TOAST audit round 2 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d20a-3ae7-7202-95a7-afd5b257ce69`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-toast-audit-2.jsonl` (launch copy under `tmp/codex/`); 24 commands; 501 s; usage {"input_tokens":2583471,"cached_input_tokens":2407168,"cache_write_input_tokens":0,"output_tokens":13091,"reasoning_output_tokens":4853}. Retained verbatim from the exec's last message.

---

Objective lane — source review against the supplied execution evidence.

1. **CONFIRMED — identity across dispatch.**  
   I attacked the sequence with a nested `show()` that completes synchronously, and with `show()` inside a hide listener. The identity is assigned before dispatch and checked afterward; completion clears it before dispatching the completed event. The outer call cannot resume the superseded sequence. A shown toast remains eligible for `show()`. Evidence: [Toast.ts:152](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Toast.ts:152), `Toast.ts:187`, `Toast.ts:193`, `Toast.ts:219`, `Toast.ts:235`.

   The red-first proofs bind:
   - **Nonanimated show re-entry:** moving identity assignment after dispatch makes the outer call return `true` and permits another completion. `Toast.test.ts:889` asserts outer `false`; its following assertions require inner `true` and exactly the expected event sequence. The original red reading identifies that assertion, and the mutation row names this case. Evidence: `j-toast-red-2-toast.log.txt:10`, `j-toast-mutations-2.log.txt:66`.
   - **Show inside hide:** moving hide’s identity assignment after dispatch lets hide continue after the nested show. `Toast.test.ts:915` asserts outer `false`, nested `true`, no hidden event, and retained shown state. The original red reading and the isolated mutation identify this case. Evidence: `j-toast-red-2-toast.log.txt:29`, `j-toast-mutations-2.log.txt:67`.

   The `JOINED` identity row binds the named proof: its edit preserves the collection graph, and the named assertions distinguish the changed behavior. Its additional failures are related identity cases, not evidence that every assertion in the file is independently bound.

2. **CONFIRMED — fade door and subsequent sequence doors.**  
   I attacked the fade write by removing an existing shown token and by inserting the transition token. The expected membership is captured after the pre-change dispatch; the reaction’s changed membership is then rejected before another write. Evidence: [Toast.ts:169](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Toast.ts:169).

   The door trace is:

   | Door | Reaction or takeover attempted | Result |
   |---|---|---|
   | Show’s pre-change dispatch | Destroy, begin another change, or add transition | Lifetime, transition, and identity checks stop the outer call before writing (`Toast.ts:161`). |
   | Show’s fade write | Destroy, re-enter, change shown membership, or add transition | `#holds` checks lifetime, identity, expected shown membership, and absent transition (`Toast.ts:171`, `Toast.ts:243`). |
   | Show’s combined shown/transition write | Remove either required token or destroy | The immediate door rejects it. Re-entry while transition remains present is refused; removing transition and starting another change changes identity (`Toast.ts:176`). |
   | Show’s await | Remove a required token, destroy, or start a successor after removing transition | The resumed call fails its ownership/state check (`Toast.ts:182`). |
   | Show’s completing removal | Remove shown, restore transition, destroy, or re-enter | The completion door rejects the changed state or identity before `shown` dispatch (`Toast.ts:184`). |
   | Hide’s pre-change dispatch | Destroy, remove shown, add transition, or start another change | The call stops before writing (`Toast.ts:198`). |
   | Hide’s transition write and await | Remove shown or transition, destroy, or replace the change | The immediate or resumed door rejects it (`Toast.ts:207`, `Toast.ts:212`). |
   | Hide’s completing removal | Restore either token, destroy, or start another change | The completion door rejects it before `hidden` dispatch (`Toast.ts:215`). |

   No traced native write door admits a changed required state and then overwrites it. A reaction that returns the host to the expected membership without starting another change is indistinguishable by design.

   The red-first shown-toast fade proof distinguishes removal of shown-membership validation: its assertions require `false`, no subsequent mutation records, no completed event, and shown remaining absent. Evidence: `Toast.test.ts:1066`, `j-toast-red-2-toast.log.txt:48`, `j-toast-mutations-2.log.txt:68`. The redirected transition-insertion mutation also binds its named case: `Toast.test.ts:1032`, `j-toast-mutations-2.log.txt:41`.

   The remaining door mutations distinguish their respective reaction/await assertions, rather than merely producing a whole-file failure: `j-toast-mutations-2.log.txt:38`–`:47`.

   This trace uses synchronous custom-element reactions: `DOMTokenList` mutations carry `[CEReactions]`, whose processing invokes reactions before returning to the caller. [DOM Standard](https://dom.spec.whatwg.org/#interface-domtokenlist), [HTML Standard](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).

3. **CONFIRMED — delegate route and lifetime, within the native reaction model.**  
   I attacked nested delegates by destroying the inner delegate during the button route. The toast route checks lifetime before prevention or marking, leaving the outer delegate eligible to acquire and hide the toast. Marks identify the event, engine route, and driven host. Outside-root targets remain unmarked. Evidence: [Delegate.ts:261](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Delegate.ts:261), `Delegate.ts:293`, `Delegate.ts:302`.

   The red-first lifetime proof distinguishes removal of that check. Its assertions require the outer delegate’s destruction to release the acquired toast and restore its shown token; hiding alone would not establish ownership. The original red reading fails the registry-release assertion. With round-2 `#construct` retained, removing the route check instead lets the destroyed delegate mark the toast and destroy its fresh engine, preventing the outer route from completing the intended hide. Evidence: `Delegate.test.ts:1165`, `j-toast-red-2-delegate.log.txt:11`, `j-toast-mutations-2.log.txt:70`.

   I also attacked E12 with same-host button/toast and collapse/toast routes, an existing consumer engine, and a disabled dismiss trigger. `#contests` refuses only the applicable unowned same-host conflict; an existing engine or disabled dismiss trigger changes that result. Evidence: `Delegate.ts:205`, `Delegate.test.ts:1193`, `Delegate.test.ts:1229`, `Delegate.test.ts:1245`. Removing conflict detection, its collapse branch, or the disabled exemption reddens the corresponding cases (`j-toast-mutations-2.log.txt:61`–`:63`). Removing the mark is distinguished by the nested-root proof’s prevented hide, which otherwise would be dispatched again (`Delegate.test.ts:1143`, mutation log `:59`).

   The construction mutation is equivalent for this route’s native operations: the delegate passes copied vocabulary without hooks or a lifetime signal; construction performs reads, registry acquisition, and listener registration, but no host mutation, event dispatch, or await. No native reaction intervenes between the lifetime check and acquisition. Consequently, the `MISSED` row supplies no proof of the destruction branch. This conclusion does not extend to consumer replacements of native DOM methods.

4. **CONFIRMED — timer pair.**  
   I attacked retention of an old delay, departure toward a descendant, and departure while the other input still holds the toast. `#arm` disarms first, requires autohide, lifetime, shown membership, and absent transition, then starts the full native delay. `#leave` checks containment and the supplied pseudo-class. Evidence: [Toast.ts:274](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Toast.ts:274), `Toast.ts:293`.

   The assertions distinguish the relevant mutations:
   - Omit entrance disarming: the toast hides during a control toast’s delay (`Toast.test.ts:424`; mutation log `:16`, `:17`).
   - Ignore the other held input: the held-toast state/event assertions fail (`Toast.test.ts:338`; mutation log `:14`, `:15`).
   - Ignore related-target containment: the descendant-focus case stops the following `focusin`, preventing another listener from concealing the defect (`Toast.test.ts:389`; mutation log `:19`).
   - Retain an accepted show/hide’s timer: the later shown-state assertions fail (`Toast.test.ts:467`, `Toast.test.ts:995`; mutation log `:20`, `:21`).
   - Refuse showing an already shown toast or retain competing timers: the repeated events and full-delay assertions distinguish it (`Toast.test.ts:292`; mutation log `:5`, `:23`).

   The renamed methods and “starts the delay” wording agree. The destruction-timer mutation remains observationally equivalent for these assertions: a surviving callback reaches `hide()`, which refuses the destroyed engine. Clearing the timer nevertheless remains required and implemented.

5. **BROKEN — the revised guide overstates nested-call completion.**  
   [guides/veneer.md:886](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/guides/veneer.md:886) says the listener’s nested call resolves `true` and the toast runs one sequence. Cancellation contradicts that guarantee.

   Exact source-derived counterexample: use `{ animated: false, autohide: false }`; a guarded `show.vn.toast` listener calls `show()` on its outer invocation and prevents the nested invocation. The nested call installs its identity, then returns `false` at `Toast.ts:158`. The outer call returns `false` at `Toast.ts:161` because its identity was replaced. Neither call writes or dispatches `shown`. The existing successful-re-entry proof does not distinguish this case because its listener never prevents the nested event.

   Smallest correction: say that the nested call takes ownership, while its own cancellation, lifetime, and door checks determine whether it completes. Preserve the outer call’s refusal.

   The remaining specified corrections hold: the `@returns` clauses include identity takeover; vocabulary summaries match their actual readers; the fence awaits hidden before destruction; Bootstrap has no transition-token guard; the delegate remarks include the disabled exemption; and the temporal wording changed to “after.” Evidence: `types.ts:1844`, `types.ts:1884`, `types.ts:1905`, `types.ts:1915`, `guides/veneer.md:454`, `guides/veneer.md:915`, `Delegate.ts:57`, `Toast.test.ts:338`. The supplied guide gate is green, but it does not falsify this behavioral sentence.

6. **CONFIRMED — release before restoration.**  
   I attacked registry ownership during the first restoration reaction. Destruction aborts, disarms, releases, then restores. The replacement can claim the host; when its show saves tokens, `HostSnapshot` transfers pending restoration values rather than recording the intermediate host. Evidence: [Toast.ts:224](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/src/browser/Toast.ts:224), `HostSnapshot.ts:73`, `HostSnapshot.ts:124`, `HostSnapshot.ts:256`.

   The proof distinguishes swapping release and restore: replacement construction would fail with the old owner still registered. It additionally destroys the replacement and asserts the original token state, testing the transferred snapshot rather than successful construction alone. Evidence: `Toast.test.ts:922`, especially `:951` and `:957`; `j-toast-mutations-2.log.txt:69` records `EXACT`.

   This is mutation-bound evidence, not a red-first implementation repair. The report correctly identifies it as already green before the changes.

7. **BROKEN — the added-text restriction is false; replay remains unresolved.**  
   The claim excludes `.bs.` wire names outside `constants.ts` and Compatibility rows. Yet [guides/veneer.md:913](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast/guides/veneer.md:913) contains `shown.bs.toast` in the Toast departure discussion. Compatibility begins at `guides/veneer.md:5725`; the retained diff includes this addition at `j-toast-2.diff:177`.

   This falsifies the claim’s wording, not E11’s runtime requirement. The original brief prohibits dispatching or listening for `.bs.` names (`j-toast-brief.md:25`), and the comparison correctly describes Bootstrap. Correct the audit restriction to permit explicit upstream comparisons; do not rename Bootstrap’s documented event.

   The other inspected clauses hold:
   - The retained status contains owned files; the `types.ts` changes are the authorized documentation changes.
   - The supplied gate log records the listed successful exits. I did not rerun them.
   - Read-only inspection found every round-1 mutation label retained and the reported round-2 additions present. The log records `41 EXACT`, `30 JOINED`, and `2 MISSED`; its green rows report no failed cases.
   - The current instrument-owned source bytes match its recorded digests. Its closing line is **`receipt: restored byte for byte`** (`j-toast-mutations-2.log.txt:80`). That certifies restoration, not universal behavioral coverage.
   - The added implementation uses the required invoked guards and contains no prohibited TypeScript assertion, suppression, accessibility modifier, or default export. Existing inherited guard forms were not introduced by this unit.
   - The report explicitly records no `prove` call (`j-toast-report-2.md:7`).

   **Replay clause: UNRESOLVED.** `j-toast-mutations-2-orchestrator.log.txt` is absent. The Orchestrator must supply its replay and compare each named outcome and restoration receipt before that clause can close.

**Findings fitting no claim:** none.

**Attacked and held**

- Completed-event re-entry occurs after the old change identity is cleared. It starts a new change; it is not pre-completion takeover. Entry-refused calls take no identity.
- Native combined token writes expose their completed token update to the reaction; there is no separate callback between the individual tokens passed to one `add` or `remove`.
- The event guard rejects payloads, ordinary events, hostile prototype access, and throwing detail access. Removing the payload check or exception containment distinguishes the named assertions (`validators.ts:161`, `validators.test.ts:172`, `validators.test.ts:185`, mutation log `:72`, `:73`).
- Option resolution preserves constructor `false` and `0`, bypasses overridden invalid attributes, and rejects failed attribute coercion before claiming the host (`helpers.ts:212`, `Toast.ts:100`, `helpers.test.ts:414`, `helpers.test.ts:465`, `Toast.test.ts:676`). The installed `parseBoolean` and `parseNumber` implementations support those readings.
- Bootstrap’s transition-end fallback is not Veneer’s settling mechanism. The supplied motion proofs assert real animations and completion order; substituting a zero timer or an unconditional transition-end wait distinguishes those assertions (`Toast.test.ts:81`, `:130`, `:188`; mutation log `:8`, `:9`).

**Referrals and bounds**

- Item D carries the nested-cancellation guide correction. A guarded nested-prevention browser case should assert both results `false`, no writes, and no completed event.
- The claims author carries the `.bs.` restriction correction. The Orchestrator carries the pending replay.
- This lane ran no browser test, build, mutation, or gate, and wrote no files. New behavioral counterexamples above are source-derived, not newly executed reproductions. No `prove` call was attempted; there is no refused-call result or probe receipt to quote.
- Other audit lanes’ verdicts were not consulted. E13’s documented restoration-presence limitation remains outside these findings.

VERDICT: FAIL 5, 7; outside the claims: none
