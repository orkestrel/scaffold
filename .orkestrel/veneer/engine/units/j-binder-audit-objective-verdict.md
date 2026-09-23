# J-BINDER audit round 1 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf79-b624-7613-b49f-c319f2962d8e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-audit.jsonl` (launch copy under `tmp/codex/`); 51 commands; 310 s; usage {"input_tokens":1403980,"cached_input_tokens":1259904,"cache_write_input_tokens":0,"output_tokens":8049,"reasoning_output_tokens":3089}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — Ownership. Objective lane; source and assertion review against the supplied Orchestrator run, without browser execution.** Attempted duplicate claims, release by a stranger, and destruction of an old Button after replacement. [Registry.ts:33](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Registry.ts:33) refuses replacement and checks owner identity before deletion. [Button.ts:47](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Button.ts:47) claims before binding hooks and releases on destruction. The assertions distinguish the reported mutations: replacement breaks `Registry.test.ts:25–33`; unconditional release breaks `Registry.test.ts:43–44`; ignoring lookup or retaining ownership breaks `Button.test.ts:273–281`.

2. **CONFIRMED — Restoration.** Attempted the requested interleaving: save an initially present `active` token, remove it, add `consumer`, then restore. [Snapshot.ts:66](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Snapshot.ts:66) restores only `active`; it preserves `consumer`. After restoration clears the records, another consumer edit survives another restore. This does not promise preservation of edits to recorded state before the first restore; `types.ts:180–181` expressly distinguishes unrecorded state.

   The reported mutations have distinguishing assertions in [Snapshot.test.ts](C:/Users/mikes/WebstormProjects/veneer-binder/tests/src/browser/Snapshot.test.ts): retaining an originally absent class attribute fails line 49; replacing the first recording fails line 78; dropping priority fails line 65; retaining records fails line 88; leaving an originally absent attribute fails line 15. Button records its managed state at construction and restores it at destruction (`Button.ts:49–50,87`).

3. **UNRESOLVED — Delegation’s exact negative-run measurement.** The routing and cleanup implementation withstand the source attacks: containment is checked before acquisition; the static event mark prevents nested delegates from toggling twice; removal is handled by the observer; same-task reinsertion survives the containment check. The assertions distinguish disabling observation (`Delegate.test.ts:280–285,310–312,351`) and destroying contained engines (`Delegate.test.ts:331–333`).

   However, the precise “without the await” failure measurement exists only in the author’s report. The supplied green run establishes that the retained awaits suffice, not the reported negative result. To settle it, the Orchestrator must run, from `veneer-binder`, `npm.cmd run test:src:browser -- tests/src/browser/Delegate.test.ts`, first with the awaits at lines 279, 308, and 350 removed, then restored. Independently repeat with [Delegate.ts:76](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Delegate.ts:76) disabled to certify the observer mutation.

   Click cancellation is **not** a Bootstrap departure: Bootstrap’s `button.js:57–63` unconditionally calls `preventDefault()`. Veneer applies it to anchor hosts, and `Delegate.test.ts:11–25` exercises that path.

4. **CONFIRMED — Events.** Attempted cancellation of completed Button events, cancellation of generic cancelable events, malformed event delivery, and delivery after abort. [helpers.ts:30](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts:30) creates and hydrates the event; the binder checks the guard and binds with the supplied signal. The assertions distinguish always-noncancelable dispatch (`helpers.test.ts:57–59`), omitted mirrored properties (`helpers.test.ts:74–81`), and bypassed guards or retained listeners (`helpers.test.ts:110–116`). `Button.test.ts:127–140` distinguishes an unfrozen or incorrect wire table; lines 154–162 distinguish post-destruction writes. The search across `veneer-binder/src`, `tests`, and `guides` found no `BUTTON_TOGGLE`.

5. **CONFIRMED — Motion, within the claimed sampling behavior.** Attempted immediate completion, rejection on cancellation, omission of the reread, waiting on excluded animations, and waiting through abort. [helpers.ts:94](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts:94) filters the sampled animations, races settlement against abort, rereads, and removes its abort subscription through the controller in `finally`.

   The assertions distinguish each reported mutation: immediate completion fails `helpers.test.ts:160`; `Promise.all` fails the resolution assertions at lines 185 and 196; omitted rereading fails lines 173–174; retaining infinite or paused animations fails line 223; omitted abort racing fails line 236 or the timeout. The corrected reflow proof inserts its subject after the control’s layout-triggering read, so removing reflow fails lines 260–262. These assertions are supported by the supplied Orchestrator browser run; no mutation execution is claimed by this lane.

6. **CONFIRMED — Selectors and ids.** Attempted empty and bare-hash targets, full-URL fragments, dotted ids, reversed selector-list order, and SVG matches. [helpers.ts:154](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts:154) follows Bootstrap’s fallback and escaping branches, then deliberately restricts results to HTML elements. The assertions distinguish omitted escaping (`helpers.test.ts:270–272`), omitted fragment extraction (lines 281–283), and retained SVG results (lines 300–302,320–323).

   `generateId` concatenates padded base-36 encodings of the random unsigned words, producing the claimed suffix. A constant suffix fails `helpers.test.ts:331`. Unlike Bootstrap’s `getUID`, it does not check document uniqueness; that is the explicitly claimed departure, not a uniqueness guarantee.

7. **CONFIRMED — Options.** Attempted competing config and attribute values, falsy values, constructor precedence, undeclared keys, and refused coercion. [helpers.ts:235](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts:235) selects an attribute before the corresponding config value, then overlays constructor options. **Attribute-over-config precedence agrees with R11 and Bootstrap’s `util/config.js:43–47`.**

   The assertion at `helpers.test.ts:354` distinguishes config precedence, dropped falsy values, reversed constructor precedence, and admitted undeclared config keys. Lines 388–404 distinguish silently skipped coercion failures and incorrect error context. Installed declarations establish the `Parser` and `parseJSONAs` contracts. Placement in `helpers.ts` is valid: this function resolves layers and throws; it is not a flat coercer. E10 explicitly settles R13’s deferred `parsers.ts` creation on that basis.

8. **CONFIRMED — Constants.** Attempted to find Bootstrap names embedded in executable expressions in the touched source. The named defaults are exported from [constants.ts](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/constants.ts) and consumed through imports. The remaining literal names belong to the claim’s platform-vocabulary exceptions. This confirms centralization; it does not claim consumer override parameters have already landed.

9. **CONFIRMED — Removal and fleet names, with the stated E10 deviation.** Attempted to find retained aliases, old ownership fields, next-click cleanup, and rename-only dependency wrappers beyond the acknowledged `isHost`. The source, tests, and guide sweep found no `isButtonHost`, `BUTTON_TOGGLE`, `#buttons`, `#hosts`, or `@deprecated`. The diff removes the old cleanup path.

   E10 explicitly carries the pending `HostSnapshot` rename and deletion of `isHost`. No additional collision appears in the supplied policy result. `settleAnimations` is not a rename of installed `waitForAnimations`: the latter imposes a budget and refuses detached elements, whereas the production helper resolves on abort and handles removed elements.

10. **UNRESOLVED — Historical red-first proof.** The supplied status and diff support the owned-file scope, the unchanged interface tables, the added Engine sections, and the exact [ButtonSection patch](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-patch-buttonsection.diff). The Orchestrator’s supplied receipts establish the stated gates and inherited sanitizer build failure.

    The seed-red Delegate result remains the author’s report alone. To settle it, preserve the rewritten `Delegate.test.ts` in an isolated checkout using the seed implementation at `1868007`, and run `npm.cmd run test:src:browser -- tests/src/browser/Delegate.test.ts`; run the same command against the candidate implementation. The negative control is the seed’s next-click cleanup and refusal to drive consumer-owned engines. The restoration assertions and consumer-hook assertion must fail at assertion time, with the test collected successfully.

Findings outside the claims: none.

**Attacked and held**

- Saving a target and later mutating the caller’s target descriptor cannot redirect restoration: `Snapshot.ts:54` copies its identifying fields. Restoring recorded state remains intentional.
- A stale Button’s second destruction cannot release its replacement: `Button.test.ts:280–281` checks replacement identity. Explicit destruction by the live owner remains valid.
- Invalid CSS remains a platform error, matching the declared selector contract. Escaping ids does not promise to repair arbitrary invalid selectors.
- Invalid declared attributes are parsed before constructor overrides. Their refusal follows the claim’s explicit coercion rule; valid constructor values retain highest merge precedence.

VERDICT: FAIL 3, 10; outside the claims: none
