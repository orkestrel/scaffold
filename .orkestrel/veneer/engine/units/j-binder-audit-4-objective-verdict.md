# J-BINDER audit round 4 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0d031-74f9-7021-bce6-48d7a05ac8c4`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-audit-4.jsonl` (launch copy under `tmp/codex/`); 29 commands; 425 s; usage {"input_tokens":2403707,"cached_input_tokens":2228736,"cache_write_input_tokens":0,"output_tokens":10565,"reasoning_output_tokens":3684}. Retained verbatim from the exec's last message.

---

Objective lane.

1. **BROKEN.** The handoff closes the retained round-3 paths, but a replacement destroyed inside its own activation can resume writing onto a newer owner.

   Exact interleaving, with a registered custom element observing `class` and one-shot reaction stages:

   - Start without `class` or `aria-pressed`; construct and toggle Button A.
   - A’s destruction removes `active`. Its reaction constructs Button B, which takes A’s originals, and calls `B.toggle()`.
   - B’s addition of `active` invokes another reaction. That reaction destroys B, lets B finish restoring, and constructs Button C without toggling C.
   - B’s suspended `toggle()` resumes and writes `aria-pressed="true"`. C remains registered and unpressed, but its host has been overwritten.

   The lifetime check occurs only before `classList.toggle`; the attribute write and event dispatch follow without checking whether the reaction destroyed the engine. Evidence: [Button.ts:97](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Button.ts:97), `Button.ts:105`, `HostSnapshot.ts:63`, `HostSnapshot.ts:123`. The platform saves the operation’s return value, invokes custom-element reactions, then returns that value, so B resumes with its earlier `true` result. [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions), [DOMTokenList algorithms](https://dom.spec.whatwg.org/#dom-domtokenlist-toggle).

   The smallest correction is to recheck destruction after each reaction-capable write before performing subsequent writes or dispatching completion. Preserve ordinary synchronous toggling and release-before-restore.

   The separate reentrant-snapshot counterexample under claim 5 also falsifies this claim’s universal handoff guarantee.

2. **UNRESOLVED.** No mutation has recorded reddening that its named proof’s assertions could not produce. The mutation names are unique, every definition has a matching result, and no result carries a pattern error.

   The distinguishing assertions include:

   | Mutation | Assertion that distinguishes it |
   |---|---|
   | Pending original not taken | After the receiving snapshot restores, `aria-expanded` must equal `"false"` rather than the transient `"true"`: `tests/src/browser/HostSnapshot.test.ts:124`. |
   | Taken target not skipped | After the original restoration returns, `aria-expanded` must remain `"second"`: `HostSnapshot.test.ts:121`. |
   | Pending targets never unpublished | The later third snapshot must restore `"later"`, rather than taking the stale published original: `HostSnapshot.test.ts:133`. |
   | Class-attribute record not handed over | The receiving snapshot’s restoration must remove `class`, rather than retain the transient empty attribute: `HostSnapshot.test.ts:125`. |

   Definitions and results: `j-binder4-mutations.json:3`, `:14`, `:25`, `:36`; `j-binder4-mutation-results.json:3`, `:14`, `:25`, `:33`. The release-order mutation is distinguished by the replacement-error and final-state assertions in `Button.test.ts:212`, `:260`, and `Delegate.test.ts:557`. The ordering mutation is distinguished by `HostSnapshot.test.ts:83` and `Button.test.ts:217`.

   The retained red log contains the reported failures (`j-binder4-red.log.txt:2`); the independent gate records `127 passed` (`j-binder-gates-4.log.txt:42`). The instrument saves original text before editing and restores it before recording each result (`j-binder4-mutate.mjs:16`, `:37`).

   However, `j-binder-mutations-4-orchestrator.log.txt` remains absent. The claimed hash verification appears only in the author’s report (`j-binder-report-4.md:83`). Retaining the independent replay and its before/after byte verification would settle the outstanding evidence clauses.

3. **CONFIRMED.** I attacked the interface text for missing ordering, missing ownership release, and a mistaken observer-interleaving premise.

   The restoration interface states tokens, empty-class cleanup, properties, attributes, and pending-original handoff; Button’s interface states claim release before restoration. The guide’s method summaries match. Evidence: `src/browser/types.ts:82`, `:271`, `:276`; `guides/veneer.md:213`, `:234`.

   The class remark distinguishes synchronous reactions from observer delivery (`HostSnapshot.ts:18`). Mutation observers are notified through a queued microtask; they do not interrupt the synchronous restoration stack. [DOM mutation-observer delivery](https://dom.spec.whatwg.org/#notify-mutation-observers).

   This confirms the specified documentation edits. The implementation counterexamples remain under claims 1 and 5.

4. **CONFIRMED.** I attacked stale names, an undeclared parser-map type, fleet collisions, grouped-option wording, and misplaced private declarations.

   `AttributeMap` and `ParserMap` are declared and used by the resolver; their guide rows match their summaries. The recorder uses `CallRecordingInterface`. Searches of the specified source, tests, setup file, and guide found no replaced names; the installed fleet-guide search found no competing claims to the new names. Evidence: `types.ts:180`, `:192`; `helpers.ts:213`, `:216`; `tests/setupBrowser.ts:928`; `guides/veneer.md:47`, `:48`.

   The grouped-option sentence now distinguishes an attribute-table key from a top-level option key (`guides/veneer.md:442`). The snapshot structures are private field annotations, not module-scope type declarations (`HostSnapshot.ts:36`, `:47`), so they satisfy the placement rules. The reusable/public-type requirement is stated explicitly in `typescript.md:27`; architecture’s declaration-placement rule does not prohibit these annotations.

5. **BROKEN.** Reentering `restore()` on the same snapshot can withdraw the outer invocation’s pending work.

   Exact interleaving:

   - Snapshot S records absent token `show` and `data-state="original"`.
   - Add `show` and change `data-state` to `"changed"`.
   - During S’s token restoration, a one-shot `class` reaction uses S to save the absent attribute `data-extra`, writes that attribute, then calls `S.restore()`.
   - The nested restoration removes `data-extra`. Its `finally` calls `#unpublish(host)`, which deletes **every** pending entry owned by S, including the outer invocation’s `data-state` and `classed` entries.
   - The outer restoration resumes, fails its ownership checks, and leaves `data-state="changed"` and an empty `class` attribute. Its original records have already been forgotten.

   Evidence: [HostSnapshot.ts:89](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/HostSnapshot.ts:89), `:112`, `:123`, `:128`, `:168`. An empty reentrant restoration does not trigger this failure; the nested call needs a newly saved target on the same element.

   The smallest correction is to identify pending ownership and cleanup by restoration invocation, rather than snapshot instance. Saves during the same snapshot’s active restoration also need defined handoff behavior: the current `entry.owner === this` exclusion otherwise reads transient state (`HostSnapshot.ts:159`).

   For distinct snapshots, first-publisher arbitration is a defensible deterministic conflict rule, but it must be stated **now** on `HostSnapshotInterface.restore`. It deliberately skips another snapshot’s recorded value; the existing contract does not disclose that exception (`types.ts:271`). Public `HostSnapshot` instances can overlap today without another engine class: prepare separate snapshots on one custom element and invoke one restoration from the other’s reaction. The report’s broader unreachability assertion is therefore false (`j-binder-report-4.md:222`; `src/browser/index.ts:6`).

   First-publisher precedence must describe which recording wins, without promising that it always selects the oldest historical state.

6. **CONFIRMED.** I attacked stale exports, compatibility paths, changed-summary drift, prohibited added constructs, and scope leakage.

   The diff replaces the old snapshot and vocabulary exports outright; the browser barrel and export proof carry the replacements. The guide adds `ParserMap`, updates the method summaries, and describes handoff without the delegate hold. Evidence: `j-binder-4.diff:1525`, `:1538`, `:2933`; `src/browser/index.ts:6`; `guides/veneer.md:48`, `:517`, `:547`.

   The supplied status matches the authorized paths (`j-binder-4-status.txt:1`). The Orchestrator’s record establishes the scoped checks, browser tests, policy, guide parity, and build (`j-binder-gates-4.log.txt:23`, `:42`, `:58`, `:71`, `:85`). Its tree-wide failure names the app consumers covered by the integration patch (`:125`; `j-binder2-app.diff:7`). Patch applicability is an established input to this audit. I found no prohibited added TypeScript construct or compatibility shim.

Findings fitting no claim: none.

Attacked and held:

- **Round-3 replacement paths:** direct construction at the token write, delegate-initiated destruction, consumer destruction followed by a routed click, and transfer into a nested delegate take the originals and preserve the receiving engine’s state. The retained assertions cover state immediately after restoration and after replacement destruction (`Button.test.ts:264`; `Delegate.test.ts:503`, `:554`, `:607`).
- **Replacement destroyed before the outer restoration ends:** constructing, toggling, and then destroying the replacement sequentially inside the reaction restores correctly. Claim 1’s failure requires destruction *during* its still-running toggle.
- **Different snapshot owners:** taking an entry and republishing it under another snapshot does not let the old snapshot’s cleanup delete the new owner’s entry. `#unpublish` checks owner identity (`HostSnapshot.ts:168`). Claim 5 exposes the distinction this check lacks between invocations of the same snapshot.
- **Late token save:** after empty-class removal has occurred, its `classed` entry remains published until cleanup. A replacement’s first token save takes the original absence bit correctly (`HostSnapshot.ts:80`, `:103`, `:113`, `:129`).
- **Reaction inside native save or take:** `#take` performs map operations only; the native attribute, token-membership, and property reads in `save` introduce no restoration write. I found no native reaction boundary there that can publish another restoration halfway through the operation (`HostSnapshot.ts:63`, `:69`, `:153`). Consumer-overridden readers are outside this conclusion.

Referrals: reproduce claims 1 and 5 with registered custom elements and retain failing assertions for the final host state. Give restoration invocations distinct ownership, guard resumed Button writes, state overlap precedence on the interface, and retain the independent mutation replay. Preserve the successful handoff paths above.

Bounds: the new counterexamples are source-and-standard interleavings, not newly executed browser observations. No browser test, build, mutation, or established gate was rerun. No file was written, no agent was spawned, and no other round-4 lane verdict was read. This is a source review with supplied execution evidence, conducted under the [orkestrel-falsify skill](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md).

VERDICT: FAIL 1, 2, 5; outside the claims: none
