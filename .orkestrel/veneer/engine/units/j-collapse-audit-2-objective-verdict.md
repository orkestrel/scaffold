# J-COLLAPSE audit round 2 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d118-cb62-75d0-94a8-43b71e558269`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-collapse-audit-2.jsonl` (launch copy under `tmp/codex/`); 38 commands; 388 s; usage {"input_tokens":1909955,"cached_input_tokens":1753216,"cache_write_input_tokens":0,"output_tokens":9801,"reasoning_output_tokens":1499}. Retained verbatim from the exec's last message.

---

Objective lane — analyst.

1. **CONFIRMED.** I attacked each phase with reactions that remove required tokens, add forbidden tokens, destroy the engine, or start another change. `#apply` performs its read after the write returns, when synchronous custom-element reactions have run. `#holds` checks lifetime, change identity, required tokens, and forbidden tokens. Evidence: [Collapse.ts:288](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts:288); [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).

   The write doors enforce these states:

   | Door | Required present | Required absent |
   |---|---|---|
   | Show: transition write, host removal, zero size, trigger token, trigger attribute, pixel size, and await continuation | `transition` | Nothing |
   | Show: completing token write | `host`, `shown`, `transition` | Nothing |
   | Show: transition removal and size clearing | `host`, `shown` | `transition` |
   | Hide: initial size write | `shown` | `transition` |
   | Hide: transition write, host-and-shown removal, trigger writes, size clearing, and await continuation | `transition` | Nothing |
   | Hide: completing host write | `host`, `transition` | `shown` |
   | Hide: transition removal | `host` | `shown`, `transition` |
   | Return from each sibling’s synchronous hide sequence | Nothing | `shown`, `transition` |

   Evidence: `Collapse.ts:152`, `Collapse.ts:205`, `Collapse.ts:343`, and `Collapse.ts:398`.

   Adding `shown` during a show’s transition is admitted, but completion writes the same shown state. During hide, adding it at the transition-token write permits the following intended removal; adding it after that removal survives until the completion read rejects it. Removing `transition` inside either trigger write stops the next write. A sibling’s hide that shows or starts transitioning the caller’s panel stops the caller before its panel writes. Re-adding `transition` during its final removal stops completion.

   **Unknown 1:** the token-only completion read is correct for the declared state contract. A consumer’s inline size is not a state token. A re-added transition token must stop completion because the panel still declares a transition.

   The door proofs distinguish their mutations as follows:

   | Proof | Mutation and distinguishing assertion |
   |---|---|
   | Show transition-token removal | Emptying `during` admits subsequent host, size, and trigger writes. Resolution alone remains `false`; the observer and retained-state assertions distinguish it. |
   | Show completing-token removal | Dropping completion reads permits further writes, a `shown` event, and `true` while `shown` is absent. |
   | Hide initial-size reaction | Dropping that read permits the transition sequence and completion; observer records, completion event, resolution, and tokens distinguish it. |
   | Hide transition-token removal | Emptying `during` permits subsequent token, trigger, and size writes. The observer and retained-state assertions distinguish it even though resolution remains `false`. |
   | Hide completing-token reaction | Dropping completion reads permits transition removal, `hidden`, and `true` while `shown` remains present. |

   Each observer is armed after the reaction’s own mutation, so it measures subsequent writes. The `EXACT` rows bind these proofs to their doors: the mutations restore the missing round-1 reads without preventing fixture collection or reaction entry. They supply retrospective negative controls, not evidence that tests preceded implementation. Evidence: [Collapse.test.ts:854](C:/Users/mikes/WebstormProjects/veneer-collapse/tests/src/browser/Collapse.test.ts:854), `:899`, `:934`, `:967`, `:1006`; `j-collapse-mutations-2.py:114`; `j-collapse-mutations-round-2.log.txt:32`.

2. **BROKEN — the same-host proof contradicts E12’s conflict rule.** The supplied fixture has an unowned panel carrying `data-vn-press` and a child collapse trigger targeting that panel. One click constructs a Button and a Collapse on the same host, dispatches their events, and leaves `active collapse show`. The test expressly asserts this result. E12 identifies construction by different routes on the same host as a conflict; amended R5 requires refusing a conflicting click before either route runs. `#activate` instead executes the Button route before inspecting the Collapse route. Evidence: [Delegate.test.ts:888](C:/Users/mikes/WebstormProjects/veneer-collapse/tests/src/browser/Delegate.test.ts:888), [Delegate.ts:129](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Delegate.ts:129), `decisions.md:51`, `j-engine-design-verdict.md:87`.

   The smallest correction is to detect this construction conflict before either route executes and change the proof to assert refusal. Preserve route-specific marks for nonconflicting drives; making the mark ignore its route would suppress one route after the other already ran.

   The per-panel marking repair itself holds. Bubbling reaches the inner root first. An outside panel passes through `continue` without a mark; the outer root can drive it. An already-marked panel also passes through `continue`, allowing subsequent panels to be reached. Destruction during the first panel’s pre-change event leaves its mark intact, restores that engine, and stops the inner loop before marking the next panel. The outer delegate skips the reached panel and drives the unreached panel. No duplicate Collapse drive or missed eligible panel follows from these interleavings. Evidence: `Delegate.ts:158`, `Delegate.test.ts:834`, `Delegate.test.ts:858`; [DOM dispatch ordering](https://dom.spec.whatwg.org/#concept-event-dispatch).

   The trigger-keyed mutation reproduces the lost handoff; moving the mark before containment isolates that defect; removing the aborted check breaks the destruction handoff. The route-ignored mutation distinguishes route-specific marks, but its same-host fixture asserts behavior the governing conflict rule forbids. Evidence: `j-collapse-mutations-round-2.log.txt:40`, `:43`, `:44`, `:45`.

3. **CONFIRMED.** I attacked selection with an SVG match preceding an HTML match, an SVG-only match, malformed CSS, and an unchanged detached HTMLElement. The implementation selects the first qualifying HTMLElement in document order. The installed `instanceOf` declaration returns `Guard<InstanceType<C>>`, so `find(instanceOf(HTMLElement))` narrows to `HTMLElement | undefined`; the permitted browser-project typecheck exited `0`.

   Bootstrap’s `getElement` returns its first selector match and runs `parseSelector` first. The documented HTML filtering and caller-owned escaping bounds are accurate. Evidence: [parsers.ts:6](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/parsers.ts:6), `parsers.test.ts:21`, `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:2136`, `node_modules/bootstrap/js/src/util/index.js:17`, `:86`. Replacing the implementation with first-match type checking restores the defect and fails exactly the mixed-match proof: `j-collapse-mutations-2.py:157`, `j-collapse-mutations-round-2.log.txt:50`.

4. **CONFIRMED.** I attacked the revised guide against sibling-only transition refusal, a transitioning ancestor, constructor precedence, Bootstrap disposal, and the accordion example. The source supports the revised sentences. The example attaches the accordion, provides an open sibling, and destroys the owner that constructed that sibling’s engine. Its behavior is source-reviewed, not executed by the guide suite.

   The default tables match `constants.ts` and occupy the component subsection required by amended R18. The general vocabulary table retains Button and ColorMode. Evidence: `guides/veneer.md:429`, `:499`, `:655`, `:660`, `:670`, `:703`, `:724`; `Collapse.ts:327`; `constants.ts:48`; `node_modules/bootstrap/js/src/base-component.js:39`; `j-engine-design-verdict.md:98`. The same-host routing conflict belongs to claim 2.

5. **CONFIRMED.** I attacked the rename for surviving alternate implementations and ownership/query confusion. `#siblings` queries panels, `#hideSiblings` drives their engines, and `#owned` retains constructed engines. Their callers use those meanings consistently. `#holds` replaces the former takeover helper, and `#change` identifies a call that started a change. Evidence: `Collapse.ts:73`, `:152`, `:288`, `:327`, `:343`, `:356`; `j-collapse-gates-2.log.txt:155`.

6. **UNRESOLVED — the Orchestrator’s replay is absent.** The remaining instrument claims hold under source review and the supplied log. I attacked whether `EXACT` could conceal failures outside a selected test: the command runs the whole named file without `-t`, deletes the previous JSON report, and gathers failed assertions across every reported result. Replacement match checks reject stale mutation sites, and `finally` restores original bytes. The logged before/after digests agree and end with `receipt: restored byte for byte`. Evidence: `j-collapse-mutations-2.py:10`, `:170`, `:193`, `:207`, `:214`, `:226`; `j-collapse-mutations-round-2.log.txt:53`.

   The sampled door, pruning, delegate, and parser rows agree with the report’s table. Round-1 mutation operations remain represented; repeated round-1 operations targeting separate selected tests become whole-file rows exposing their joined failures. Evidence: `j-collapse-mutations.py:22`, `j-collapse-report-2.md:114`, `:123`, `:126`, `:133`, `:136`, `:143`.

   The instrument proves the recorded runtime failures, not that every mutation typechecks or passes lint. Its classification also does not independently reject every possible runner-level error. The absent `j-collapse-mutations-2-orchestrator.log.txt` must supply the independent replay before this claim closes.

7. **CONFIRMED.** I attacked pruning with a directly destroyed sibling, its replacement engine, a disconnected sibling, and removal followed by reinsertion before the next call. Registry inequality drops the old entry without destroying its replacement. Disconnection deletes the owned entry before destruction, preventing reentrant pruning from destroying it again. Reinsertion before the check retains the engine because `isConnected` is true. Evidence: [Collapse.ts:369](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts:369).

   Pruning before refusals gives cleanup even when the requested state change is refused. The removal proof checks ownership before cleanup, registry release afterward, restoration, and the owner’s continued lifetime. Removing the entry-point prune calls restores the leak until owner destruction and fails exactly that proof. Evidence: `Collapse.test.ts:1047`, `j-collapse-mutations-2.py:82`, `j-collapse-mutations-round-2.log.txt:18`.

   **Unknown 2:** connectivity is sampled at the next call. Temporary removal followed by reinsertion is correctly retained; the rule does not require remembering historical disconnection.

8. **CONFIRMED.** I attacked constructor precedence with an invalid parent attribute and an explicit constructor parent. `resolveOptions` skips attribute access and parsing when that option is defined, then installs the constructor value. The revised `@throws` sentence and departure are true. Evidence: [helpers.ts:220](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/helpers.ts:220), `Collapse.ts:83`, `Collapse.test.ts:646`, `guides/veneer.md:747`.

   The host diagnostic uses `readTag`; the delegate field uses `CollapseVocabulary`; emitted collapse events carry `null`, matching the event map and guard. The tightened restoration assertions match the landed snapshot behavior for these fixtures. Evidence: `Collapse.ts:86`, `Delegate.ts:58`, `types.ts:635`, `validators.ts:136`, `Collapse.test.ts:491`, `:1107`, `HostSnapshot.ts:234`. E13’s broader overlapping-presence limitation remains a bound.

9. **CONFIRMED.** I attacked the returned sentences against destruction ownership, takeover without destruction, and guide-summary normalization. The delegate destroys its owned engines; Collapse destroys sibling engines it constructed. Each guide hunk carries the same summary as its corresponding type hunk after whitespace normalization. `findDrift` compares those summaries; it does not compare `@returns` prose. Evidence: `Delegate.ts:119`, `Collapse.ts:262`, `j-collapse-delegate-interface.diff:7`, `j-collapse-destroy-summary.diff:7`, `node_modules/@orkestrel/guide/dist/src/core/index.js:2410`.

   The takeover addition truthfully describes the phase checks. Its temporal wording also accommodates the identity proof: the consumer removes the transition token and starts another call before the earlier call resumes. The earlier call must stop even if the later call has restored identical tokens. Evidence: `j-collapse-returns.diff:8`, `Collapse.ts:290`, `Collapse.test.ts:834`.

   The guide/type hunk grouping preserves parity, and the recorded combined apply check succeeds. The roadmap patch is unchanged from its round-1 counterpart. Evidence: `j-collapse-report-2.md:3`, `j-collapse-gates-2.log.txt:454`.

10. **CONFIRMED, with the stated prose bounds.** I attacked the change for an off-limits-file edit, surviving legacy helper, alias, or prohibited implementation construct. The captured status and reviewed source changes support the scope claim. The established Orchestrator gates report success; my permitted `npx.cmd tsc --noEmit -p configs/src/tsconfig.browser.json` also exited `0`. Evidence: `j-collapse-2-status.txt:1`, `j-collapse-2.diff:658`, `j-collapse-gates-2.log.txt:13`, `:67`, `:80`, `:93`, `:153`, `:453`.

   The overlong delegate comment remains a wrapping bound, as the claim already records. The catalog’s Bootstrap event wording is outside the source-tree grep population. Neither is an additional runtime finding. The report records that no `prove` call was made because the writer lacked that server; it contains no refused-call receipt. Evidence: `Delegate.ts:37`, `j-collapse-report-2.md:170`.

**Findings fitting no claim:** none.

**Attacked and held:** A reached panel restored when its inner delegate is destroyed remains marked for that click; leaving it restored is correct because the outer delegate must drive only unreached panels. An owned sibling reinserted before pruning remains live. A reaction adding the requested shown state during show does not establish takeover merely by agreeing with the requested outcome. These bounds do not weaken the same-host construction conflict in claim 2.

**Referrals:** Carry claim 2’s construction-conflict correction into C2, preserving the successful containment and destruction handoffs. Close claim 6 with the Orchestrator’s independent replay.

**Bounds:** This is source review against supplied execution records, plus the permitted typecheck. I ran no browser test, build, or mutation, and wrote no file. No `prove` call was refused during this lane; no receipt is claimed. Unknown 3 is resolved for the inspected mutations: whole-file negative controls bind the corresponding proofs to their defects, while claim 6’s independent replay remains unresolved. Source and test references are relative to `C:/Users/mikes/WebstormProjects/veneer-collapse`; audit artifacts are under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units`.

VERDICT: FAIL 2, 6; outside the claims: none
