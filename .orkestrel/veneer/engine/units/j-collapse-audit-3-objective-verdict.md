# J-COLLAPSE audit round 3 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d140-df95-71b2-a847-c36d49c55e62`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-collapse-audit-3.jsonl` (launch copy under `tmp/codex/`); 29 commands; 414 s; usage {"input_tokens":2678486,"cached_input_tokens":2493952,"cache_write_input_tokens":0,"output_tokens":10468,"reasoning_output_tokens":3205}. Retained verbatim from the exec's last message.

---

Objective lane.

1. **CONFIRMED.** I attacked every hide door with a reaction adding `shown`, removing `transition`, or restoring `host`. The checks enforce the documented phases.

   | Door | Required state after the reaction | Result of the attack |
   |---|---|---|
   | Initial size write | `shown` present; `transition` absent | Removing `shown` or adding `transition` stops the call. |
   | Transition-token write | `transition` present | Removing it stops the call. `shown` and `host` remain admissible before their scheduled removal. |
   | Host-and-shown removal | `transition` present; `shown` absent | Re-adding `shown` or removing `transition` stops the call immediately. |
   | Each trigger token and attribute write | Same | The call stops before the next trigger write. |
   | Size clearing and post-`await` read | Same | The call stops before completion writes. |
   | Completing host write | `host` and `transition` present; `shown` absent | Removing either required token or adding `shown` stops transition removal. |
   | Completing transition removal | `host` present; `transition` and `shown` absent | A conflicting reaction prevents `hidden`. |

   Evidence: [Collapse.ts:225](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts:225), `:230`, `:232`, `:240`, `:245`, `:247`, `:254`, `:403`. Re-adding `host` after its removal is admitted, but completion preserves that requested final state. Before the scheduled removal, the transition-token door admits `host` and `shown`, which the next write removes; this is the documented phase, not the repaired post-removal takeover.

   The trigger proof arms its observer after its own mutation and checks subsequent writes, resolution, events, tokens, and the unchanged expanded attribute. Its recorded red result and the corresponding `EXACT` mutations distinguish the repaired behavior. Evidence: `Collapse.test.ts:1006`; `j-collapse-round3-red.log.txt:6`; `j-collapse-round3-green.log.txt:33`; `j-collapse-mutations-round-3.log.txt:35`.

   **Show unknown:** symmetric tightening is unnecessary under the stated phase contract. Removing `host` after transition addition advances the scheduled removal; adding `shown` early agrees with completion. Removing `transition` still stops the call, and completion requires the final tokens. The show predicates are unchanged semantically, but the brief’s “byte-identical” wording is inaccurate: the trigger call gains `[]`, and the post-`await` expression changes from `[transition]` to `during`. Evidence: `j-collapse-2.diff:783`, `:795`; `j-collapse-3.diff:812`, `:824`. The reaction ordering follows the [HTML custom-element reaction rules](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions).

2. **CONFIRMED.** I attacked the refusal through target attributes, `href`, containment, existing ownership, and nested roots. `#conflicts` checks the same resolved hosts and target reader as the routes before either route marks, constructs, or prevents anything. Evidence: [Delegate.ts:131](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Delegate.ts:131), `:144`, `:157`, `:170`; `helpers.ts:147`; `decisions.md:55`; `j-engine-design-verdict.md:87`.

   - A same-host panel named through `href` is refused just as one named through the target attribute.
   - With a collapse trigger outside the root and its button host inside, the collapse route is ineligible; the button route proceeds. An outside button host is likewise ineligible for the button route.
   - With a consumer’s Collapse and no Button, only Button construction occurs. With a consumer’s Button and no Collapse, only Collapse construction occurs.
   - An ancestor or descendant of the named panel is a different host and does not satisfy `includes(host)`.
   - Under nested roots with matching vocabularies and unchanged markup, the inner refusal leaves no owner or mark, so the outer delegate detects the same conflict and refuses too. Refusal does not stop propagation. An outer delegate with a different, nonconflicting vocabulary can drive its eligible route; containment alone does not override its conflict check.

   These paths reveal no construction conflict or forbidden refusal against E12’s amended letter. Bubbling reaches the outer listener after the inner listener under the [DOM dispatch algorithm](https://dom.spec.whatwg.org/#concept-event-dispatch).

   The refusal proof distinguishes removal of the guard: the button route prevents default, constructs its engine, changes tokens and `aria-pressed`, and emits its event; the collapse route also constructs and begins showing. The dispatch return already fails in the recorded red run, while the remaining assertions constrain partial implementations. The consumer-Button proof independently binds route-specific marks. Evidence: `Delegate.test.ts:888`, `:918`; `j-collapse-round3-red.log.txt:24`; `j-collapse-mutations-round-3.log.txt:38`, `:44`.

3. **CONFIRMED.** I attacked the nesting sentence with an accordion inside an outer panel and with a transitioning ancestor inside the accordion. The `:scope` query excludes nesting only within the configured parent, matching the revised prose. Evidence: `Collapse.ts:329`; `guides/veneer.md:661`, `:746`.

   Every token-order clause matches the installed implementation: Veneer adds transition before removing host on show and adds completion tokens before removing transition; Bootstrap removes collapse before adding collapsing on show, adds collapsing before removing collapse/show on hide, and removes collapsing before adding completion classes. Evidence: `Collapse.ts:173`, `:189`, `:247`; `guides/veneer.md:750`; `node_modules/bootstrap/js/src/collapse.js:140`, `:151`, `:182`, `:197`.

4. **BROKEN — the invalid-selector sentence is broader than Bootstrap’s code.** The empty string is a concrete counterexample: `parseElement('')` returns `undefined`, but `getElement('')` bypasses `querySelector` and returns `null`; it does not throw. Evidence: [parsers.ts:17](C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/parsers.ts:17), `:23`; `parsers.test.ts:38`; `node_modules/bootstrap/js/src/util/index.js:92`, `:96`.

   The narrower claim holds: a nonempty selector that remains invalid after `parseSelector`, such as `[data-bs-parent=`, reaches the unguarded query and throws. Parsing failure produces `SyntaxError` under the [DOM selector rules](https://dom.spec.whatwg.org/#scope-match-a-selectors-string).

   Smallest correction: state that `parseElement` catches selector errors, while `getElement` leaves errors from its nonempty, escaped selector query uncaught. The HTML filtering and caller-owned escaping sentences withstand the mixed SVG/HTML and dotted-ID attacks.

5. **CONFIRMED.** I attacked the proof by moving pruning after refusal in each method. After removal, the owner is already shown, so the added `show()` returns `false`; the mutated ordering skips cleanup and leaves the sibling registered. The assertions precede the later `hide()`, so that later call cannot conceal the defect. Evidence: `Collapse.ts:154`, `:207`, `:376`; `Collapse.test.ts:1086`; `j-collapse-mutations-3.py:133`; `j-collapse-mutations-round-3.log.txt:37`. This closes the hole recorded in `j-collapse-probe-r2-r3.log.txt:3`.

6. **UNRESOLVED.** The independent replay file is absent, as anticipated. The retained report also replaces its mutation table with a reference to the log, so the asserted verbatim copying and `EXACT`-then-`JOINED` grouping cannot be checked against the original return. Evidence: `j-collapse-report-3.md:1`, `:73`. Retain the original table and supply `j-collapse-mutations-3-orchestrator.log.txt` to settle those clauses.

   The remaining instrument clauses withstand attack. Comparing the instruments shows the added rows and unchanged preceding mutation definitions. The command runs the whole named file without `-t`; stale reports are removed; replacement-match checks reject incorrect sites; failures are collected across reported assertions; restoration runs in `finally`. Evidence: `j-collapse-mutations-3.py:10`, `:123`, `:187`, `:209`, `:231`.

   The added rows are `EXACT`; the recorded clean runs have no failed cases; the before/after digest maps are identical and end with `receipt: restored byte for byte`. Evidence: `j-collapse-mutations-round-3.log.txt:35`, `:57`, `:62`. Those records establish the reported runtime controls, not mutation typechecking, linting, or independent replay.

7. **CONFIRMED.** I attacked the wording against destruction ownership and the actual patch contents. The owner destroys constructed sibling engines, the acquisition path finds or constructs them, and the returned `@returns` hunks carry the specified wording. The post-`await` reads use `during`. Evidence: `Collapse.ts:187`, `:245`, `:274`, `:361`; `guides/veneer.md:748`, `:760`; `j-collapse-patches-2/j-collapse-returns.diff:7`, `:16`.

   The isolated `finds the` line exists at `guides/veneer.md:710`; the Delegation paragraph has no corresponding orphan. This is the stated formatting bound for integration, not an additional behavioral finding.

8. **BROKEN — the refused-call clause contradicts the retained report.** `j-collapse-report-3.md:108` explicitly records that the writer made no `prove` call. It records neither a refused invocation nor a refusal receipt. Correct the claim to describe tool unavailability and no invocation; do not invent a receipt.

   The remaining scope and gate clauses withstand inspection. The live status matches the captured modified paths. The Orchestrator’s log records successful scoped checks, browser tests, guide and policy tests, builds followed by conformance, combined patch application, and the tree-wide check. The source additions reveal no prohibited implementation construct. Evidence: `j-collapse-3-status.txt:1`; `j-collapse-gates-3.log.txt:13`, `:67`, `:153`, `:161`, `:183`, `:199`. My permitted browser-project TypeScript check also exited `0`.

9. **BROKEN — the exclusive edit inventory omits changed sites.** Comparing the round-2 and round-3 diffs shows changes beyond the listed call sites and methods:

   - The `#writeTriggers` declaration, comment, and body, not merely its callers: `j-collapse-3.diff:1043`; `Collapse.ts:400`.
   - The show post-`await` spelling: `j-collapse-3.diff:824`; `Collapse.ts:187`.
   - The Collapse class remark and `#siblings` comment: `j-collapse-3.diff:722`, `:970`.
   - The Delegate class remark: `j-collapse-3.diff:1094`.
   - The guide’s takeover sentence described in claim 1: `guides/veneer.md:704`.

   These are authorized repairs already described elsewhere in the brief. Correct the inventory rather than reverting them.

   The regression attack found no additional behavioral regression against `468a118`: the unit preserves consumer ownership, abort-driven completion, animation-based timing, focus behavior, restoration boundaries, and route-specific containment marks. The browser records exercise those properties, and the shared-file patches preserve the declared summaries. Evidence: `j-collapse-3-unit.diff:1100`, `:1327`, `:1374`; `Collapse.test.ts:249`, `:370`, `:400`, `:440`, `:463`; `Delegate.test.ts:834`, `:858`; `j-collapse-gates-3.log.txt:183`.

**Findings fitting no claim:** none.

**Attacked and held:** A reached panel restored during inner-delegate destruction remains marked; the outer delegate correctly drives only unreached panels. A sibling removed and reinserted before pruning remains connected and is retained. A show reaction that advances the requested state does not establish takeover solely by agreeing with completion. E13’s overlapping empty-attribute bound remains unchanged.

**Referrals:** Qualify claim 4’s selector sentence. Close claim 6 with the independent replay and retained original table. Correct the invocation record in claim 8 and the edit inventory in claim 9. Apply claim 7’s whitespace repair during integration.

**Bounds:** This is source review against supplied execution records, plus the permitted TypeScript check. I ran no browser test, build, or mutation, wrote no file, and spawned no agent. No `prove` call was made or refused in this lane; no receipt is claimed. Source references are relative to `C:/Users/mikes/WebstormProjects/veneer-collapse`; audit artifacts are under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units`; decision references are in its parent directory.

VERDICT: FAIL 4, 6, 8, 9; outside the claims: none
