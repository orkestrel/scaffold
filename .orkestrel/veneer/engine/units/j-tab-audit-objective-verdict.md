# J-TAB audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1b7-efb8-75b1-bccd-3893ceac2d7a`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tab-audit.jsonl` (launch copy under `tmp/codex/`); 29 commands; 515 s; usage {"input_tokens":2666773,"cached_input_tokens":2497920,"cache_write_input_tokens":0,"output_tokens":14230,"reasoning_output_tokens":6188}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — Construction. Objective lane; source audit.** I attacked claim-before-validation, an already-aborted signal, existing roles, shared pane attributes, and construction-time destruction. Validation and `#planRoles` precede the claim; the aborted branch never calls `#writeRoles`; `#absent` preserves existing and earlier planned values; all planned attributes are saved before writing; each write checks destruction. These attacks fail against [Tab.ts](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/src/browser/Tab.ts:77), `Tab.ts:301`, and `Tab.ts:339`.

   The retained mutations bind the constructor proofs as follows: `Tab.test.ts:62` distinguishes href-only resolution; `:86` distinguishes an omitted claim; `:111` distinguishes refusing a missing list; `:145` distinguishes omitted writes, omitted saves, overwritten roles, and incorrect wrappers; `:216` distinguishes ignoring the entry selector; `:681` distinguishes ignored vocabulary groups and missing class validation; `:704` distinguishes writing after an already-aborted signal. Evidence: `j-tab-mutations.log.txt:2`, `:3`, `:4`, `:5`, `:6`, `:7`, `:8`, `:9`, `:10`, `:40`. These rows bind those mutations, not every assertion within each case.

2. **BROKEN — An outgoing-control reaction can restart another tab without invalidating the swap.** Begin with A active and focused, B inactive, and live engines for A and B. Install a once-only blur listener on A that calls `A.show()`. Call `B.show()`.

   B removes A’s `active` token, then blurs A. A’s listener finds neither control active and completes `A.show()`, restoring A and its pane. B’s post-blur door nevertheless passes: its control and pane requirements are empty, its lifetime remains live, and A’s call changed A’s identity rather than B’s. B then removes the pane tokens A just restored, writes A’s selection false, activates B, and completes successfully. A and B retain `active`.

   The admitting doors are [Tab.ts:174](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/src/browser/Tab.ts:174), `:175`, `:178`, and outgoing `#select` at `:182`; `#holds` at `:225` checks no outgoing or sibling state. The same gap exists when a custom-element reaction during outgoing deactivation shows another sibling.

   Fix the outgoing phase’s invariant: after each reaction-capable write, verify that the outgoing control remains inactive and no competing control has taken selection before continuing. Preserve E15’s permitted re-entry and newest-call behavior.

   Door trace:

   | Door | Reaction reading |
   |---|---|
   | `hide` dispatch | Destruction stops `show`; other changes are reconsidered after `show` (`:152`, `:158`). |
   | `show` dispatch | Destruction, incoming activation, and a changed active sibling refuse before writes (`:158`). |
   | Outgoing token, blur, pane, selection, tab stop, dropdown writes | Destruction and same-engine identity changes stop; cross-engine reactivation passes the empty token requirements. |
   | Incoming `active` and selection/dropdown writes | Removing incoming `active`, destruction, or identity replacement stops (`:185`, `:186`, `:374`). |
   | Pane `active` write | Removing pane `active` stops (`:189`). |
   | Pane `shown` write and fade completion | Missing incoming `active`, pane `active`, or pane `shown` stops (`:193`, `:196`). |
   | `hidden` dispatch | The same settled-state requirements stop further completion (`:201`). |
   | `shown` dispatch | There are no subsequent writes; destruction changes the returned result to false (`:203`). |

   The existing proofs distinguish their narrower mutations:

   - `Tab.test.ts:240`: omitted outgoing activation removal, blur, pane `shown` removal, selection/tab-stop writes, or an extra premature completion.
   - `:292`: removing the already-active refusal.
   - `:316`: ignoring either veto or short-circuiting before `show`.
   - `:368`: removing reflow or replacing animation settlement with a zero timer.
   - `:410`: omitting dropdown writes.
   - `:528`: cancelable completion or an over-permissive event guard.
   - `:589`: ignoring each vocabulary group.
   - `:732`: omitting post-write checks.
   - `:785`, `:822`, `:854`: omitting the corresponding post-dispatch read.
   - `:912`: omitting the post-event sibling comparison.
   - `:965`: resolving the outgoing pane solely through the incoming engine’s attributes.
   - `:991`: omitting the same-engine identity comparison.
   - `:1050`, `:1096`, `:1125`, `:1190`: omitting pane-token, post-fade, or incoming-control-token checks.

   Evidence: `j-tab-mutations.py:54`, `:70`, `:89`, `:94`; `j-tab-mutations.log.txt:11` through `:42`. Whole-file `JOINED` rows bind a named case when its assertions distinguish that edit; they do not extend the case to other doors.

   The pre-event re-entry case at `Tab.test.ts:881` appears only under the extra-premature-completion mutation (`j-tab-mutations.log.txt:23`). That establishes sensitivity to an extra event, not a targeted red reading for the re-entry refusal. Neither that case nor the outgoing same-engine re-entry case exercises the cross-engine blur interleaving above.

3. **BROKEN — Reverse acquisition order does not guarantee original list restoration.** Use patch C’s fixture, but click the already-active home control before clicking profile and then home.

   Home is acquired first, but its initial `show()` refuses before saving tokens (`Tab.ts:145`). Profile’s first swap records the original home-active state. Home’s later swap first records tokens while profile is active (`Tab.ts:169`, `:351`). Patch C destroys profile and then home. Profile restores home-active; home subsequently restores profile-active. The final token state differs from the original markup.

   `HostSnapshot` saves at the first save of each target, not at engine construction, and sequential restorations write their own recorded values: [HostSnapshot.ts:73](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/src/browser/HostSnapshot.ts:73), `:124`, `:159`. Patch C reverses engines, which cannot establish ordering for targets first saved at different times.

   Patch C’s retained proof starts with `profile.click()` (`j-tab-patches/j-tab-delegate-order.diff:47`); its red/green log binds that acquisition sequence only (`j-tab-delegate-order.log.txt:2`). Add the initial `home.click()` to distinguish the broader claim. The smallest truthful correction is to remove the unconditional restoration guarantee. Retaining that guarantee requires consistent restoration ownership per saved target, rather than relying solely on engine order.

   The individual destruction proofs remain bound: `Tab.test.ts:448` distinguishes omitted abort; `:503` distinguishes omitted swap recording; `:704` exercises live-signal destruction and already-aborted construction. However, the mutation labelled “the signal is ignored” changes the constructor condition and destroys instances without a signal; it does **not** remove the live abort subscription (`j-tab-mutations.py:113`). Its red row therefore does not establish sensitivity to an omitted live abort listener.

4. **BROKEN — A destroyed delegate still marks, constructs, and drives the tab route.** Use the consumer-owned Button configuration from `Delegate.test.ts:1244`, including `pressed: 'is-pressed'`. Have its `toggle.vn.button` listener destroy the delegate. On click, E12 correctly permits routing because the Button already exists. The Button route dispatches synchronously and destroys the delegate. Execution then continues into `#routeTab`, which has no lifetime check, marks the event, constructs and acquires a Tab, and calls `show()`.

   Evidence: [Delegate.ts:177](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/src/browser/Delegate.ts:177), `:258`, `:325`; `Button.ts:92`. The newly acquired engine survives because subsequent `destroy()` calls return at `Delegate.ts:167`. With an outer delegate, the destroyed inner delegate’s mark also prevents the live outer delegate from driving that tab.

   Add a lifetime refusal before the tab route prevents or marks anything. Also handle destruction during `new Tab(...)`: construction writes attributes synchronously before acquisition, so a constructor reaction can destroy the delegate before the new engine enters `#owned`. Check lifetime after construction and release that engine instead of acquiring or driving it.

   The retained route proofs bind their stated edits: click and default prevention (`Delegate.test.ts:1015`; log `:45`–`:48`), disabled controls (`:1066`; log `:49`–`:50`), keyboard routing/propagation/default/wrap/ends/skip/focus (`:1097`; log `:51`–`:57`), marks (`:1167`; log `:58`–`:59`), E12 refusal and consumer ownership (`:1214`, `:1244`; log `:60`–`:61`), replacement vocabulary and construction threading (`:1272`; log `:62`–`:65`), and validation (`:1322`; log `:66`). None exercises destruction before the tab click route or during its constructor.

5. **CONFIRMED — Guard, tables, neighbor helper, and barrel.** I attacked the guard with null/scalar detail, a non-HTML related target, and throwing prototype/accessor reads. The checks and catch contain these inputs (`validators.ts:160`); the installed `isInstance` also contains its `instanceof` evaluation (`node_modules/@orkestrel/contract/dist/src/core/index.js:933`). The guard intentionally checks event shape rather than the wire name.

   The frozen tables match the declared defaults (`constants.ts:72`, `:80`, `:89`, `:94`). No attribute-fed behavioral option requires a Tab parser or `TAB_DEFAULTS`; `parsers.ts` remains unchanged. I compared absent-current, empty-list, wrapping, and clamped-end behavior with Bootstrap’s implementation; `helpers.ts:314` agrees with `node_modules/bootstrap/js/src/util/index.js:267`. The barrel exposes Tab and the centralized exports.

   Proof bindings: `Tab.test.ts:17` rejects an unfrozen table; `validators.test.ts:172` rejects permissive detail/target checks; `:207` rejects uncontained accessor reads; `helpers.test.ts:597`, `:605`, and `:612` reject omitted wrapping, omitted clamping, and the wrong absent-current endpoint; `index.test.ts:34` rejects the omitted Tab export. Evidence: `j-tab-mutations.log.txt:44`, `:67`–`:73`.

6. **BROKEN — The claim that the shipped nav sheet animates neither control nor pane is false.** [ `_nav.scss:31`](/C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/src/styles/components/_nav.scss:31) declares transitions on `.nav-link` for color, background color, and border color. The terrain record already distinguishes these control transitions from the absence of pane fade (`j-w2-terrain-record.md:19`).

   `Tab.test.ts:46` measures pane styles only. Its `0s` assertion cannot establish the absence of control transitions, and it has no named mutation row establishing that broader reading.

   Correct the claim and report to say that the shipped sheet supplies no pane fade. The implementation’s pane-only wait is explicit at `Tab.ts:188`, and the reflow/fade proof binds that chosen behavior. Dropdown writes are correctly restricted by the control’s `role="tab"` reading, matching Bootstrap’s completion branches (`tab.js:113`, `:140`, `:229`). Assigning keyboard handling to Delegate follows R5; patch A correctly removes the claimed Tab key listener.

7. **BROKEN — The returned patches leave false or incomplete statements.**

   - Patch C’s unconditional restoration sentence is contradicted by the active-first acquisition sequence in claim 3 (`j-tab-patches/j-tab-delegate-order.diff:65`).
   - The guide says Bootstrap dispatches `hidden.bs.tab` before the incoming control takes `active` (`guides/veneer.md:932`). With `fade` on the outgoing control, Bootstrap queues that completion and continues into incoming activation: `node_modules/bootstrap/js/src/tab.js:99`, `:135`, `:149`, `:152`. Describe outgoing completion as independent of incoming activation; qualify any immediate ordering by the absence of an outgoing wait.
   - Patch A’s revised `show()` return sentence omits a changed active sibling and identity supersession as independent refusal reasons. A `show` listener can activate another sibling while the incoming host and pane remain unchanged; `Tab.ts:158` returns false. The existing proof at `Tab.test.ts:912` demonstrates the intended refusal. Include that reason explicitly rather than attributing every takeover to incoming control or pane tokens.

   The Surface additions and example resolve to the source; the plugin row names `tests/src/browser/Tab.test.ts`. Patches A and B carry matching summary changes. The withheld Delegation hunk is not itself a finding merely because the existing text describes clicks; the objective defects are the specific contradicted statements above.

8. **UNRESOLVED — Scope and recorded gates hold; independent mutation acceptance remains pending.** The retained status and diff show the owned edits, with the helper changes confined to `computeNeighbor`. The Orchestrator’s gate exits are established by `j-tab-gates.log.txt:17`, `:20`, `:27`, `:72`, `:85`, `:98`, `:120`, `:132`, `:145`, `:158`, `:196`, and `:575`; I did not rerun them.

   The accepted mutation log contains the named `EXACT`/`JOINED` rows, green baseline rows, matching digests, and `receipt: restored byte for byte` (`j-tab-mutations.log.txt:2`, `:74`, `:79`, `:80`). The strengthened entry-wrapper and hide-listener cases now distinguish their mutations; the hidden-listener case uses a recorder that survives engine destruction. The current instrument’s named-case classification reads actual failed assertion titles (`j-tab-mutations.py:210`, `:242`).

   Those artifacts do not supply the pending Orchestrator replay. That clause remains **UNRESOLVED** until `j-tab-mutations-orchestrator.log.txt` records the independent run. Collection failures in the writer’s initial red reading establish missing exports, not behavioral red readings (`j-tab-report.md:19`). The mutation rows supply only the narrower bindings described above.

**Findings fitting no claim**

- **F1 — `TabClassMap.disabled` overstates the engine contract.** `types.ts:928` says a disabled control “neither activates nor takes arrow-key focus.” Direct `new Tab(control).show()` accepts an inactive control carrying `disabled`: `Tab.#refused` checks only destruction and `active` (`Tab.ts:217`). Disabled refusal belongs to Delegate (`Delegate.ts:303`), as the guide already states (`guides/veneer.md:846`). Correct the type sentence to: “Marks a control that delegated clicks leave inactive and delegated keys pass over. Default: `disabled`.” Preserve direct `show()` behavior, which matches Bootstrap.

**Attacked and held**

- Destruction after incoming pane activation, token removal after acquisition, and sibling takeover during the fade are correctly detected. The outgoing-phase failure does not invalidate those later doors.
- A prevented `hide` still allows `show` to dispatch; destruction during `hide` stops it. Those are distinct, correctly tested outcomes.
- Same-engine re-entry and cross-engine re-entry are distinct: the identity check protects the former; claim 2 identifies the missing selection invariant for the latter.
- E12’s same-host refusal and consumer-owned-engine exception hold within a live delegate. Cross-delegate configuration remains governed by E12’s amendment.
- Unrelated consumer tokens and attributes survive individual restoration. E13’s documented empty-attribute presence limit is not the restoration failure reported here.
- The duplicated controls selector, missing `TabVocabulary`, and unapplied patches remain established round-2 work; they are not new findings.

**Referrals**

- Carry the outgoing-phase invariant and delegate lifetime failures into the mechanism fix round.
- Reproduce the active-first acquisition sequence before accepting patch C’s restoration guarantee.
- Return the contract and guide corrections through the shared-file patch carrier, including F1.
- Complete the Orchestrator mutation replay and add targeted negative controls for the uncovered reaction doors and live abort subscription.

**Bounds**

This is a source audit with retained execution evidence, not a newly executed browser reproduction. No browser test, build, mutation, file write, or sub-agent was run. Runtime interleavings above are source-derived and require Orchestrator reproduction before a fix prescription is accepted. No `prove` call was made; no refused call or receipt was obtained. Source paths refer to the Tab worktree; evidence filenames refer to the brief’s retained units directory.

VERDICT: FAIL 2, 3, 4, 6, 7, 8; outside the claims: F1
