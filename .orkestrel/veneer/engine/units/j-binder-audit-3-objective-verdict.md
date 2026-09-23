# J-BINDER audit round 3 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0d01d-6bea-7b33-b6ce-e35cc817d731`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-audit-3.jsonl` (launch copy under `tmp/codex/`); 31 commands; 445 s; usage {"input_tokens":2319319,"cached_input_tokens":2153984,"cache_write_input_tokens":0,"output_tokens":11625,"reasoning_output_tokens":3493}. Retained verbatim from the exec's last message.

---

Objective lane.

1. **CONFIRMED.** I attacked inference with missing attribute keys, extra keys, and a renamed attribute. The installed TypeScript 6.0.3 compiler, using the browser project’s options, accepted the valid and renamed tables; missing keys failed with TS2345, and an extra object-literal key failed with TS2353. A predeclared table carrying extra keys compiled: that is harmless here because the resolver enumerates `parsers`, not `attributes`.

   No declared top-level key is inaccessible through the table. Names such as `animated` can map to `data-bs-animation`; grouped option projection remains the explicitly carried first-consumer ruling. The implementation preserves defaults → attributes → defined constructor values, and reports the effective attribute name on coercion failure. Evidence: `src/browser/helpers.ts:209`, `:220`, `:233`; `src/browser/types.ts:178`; `tests/src/browser/helpers.test.ts:422`, `:446`, `:460`. The vocabulary call sites use the required order, and its copied result is frozen (`helpers.ts:260`; `Button.ts:51`; `ColorMode.ts:42`; `Delegate.ts:56`).

2. **BROKEN.** The implemented order and the retained regression results hold, but the residual path is broader than the report bounds, and the contract does not state its limit.

   `Button.destroy` aborts, releases, then restores (`src/browser/Button.ts:105`). Restoration forgets its records before writing tokens, removing empty `class` attributes, writing properties, and finally writing attributes ([HostSnapshot.ts:60](C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/HostSnapshot.ts:60)).

   The reaction boundaries are:

   | Write | What a synchronous reaction can encounter |
   |---|---|
   | Token restoration | Remaining tokens, properties, and attributes are not necessarily restored. |
   | Empty `class` removal | Properties and attributes still follow. |
   | Inline property restoration | Remaining properties and attributes still follow. |
   | Saved attribute restoration | Remaining saved attributes still follow. Only the final write has no subsequent old-snapshot write. |

   `classList.toggle`, attribute writes, and style setters/removers invoke custom-element reactions before returning. Mutation-observer callbacks instead run through a queued microtask. Sources: [HTML reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions), [DOMTokenList](https://dom.spec.whatwg.org/#interface-domtokenlist), [CSSStyleDeclaration](https://drafts.csswg.org/cssom/#the-cssstyledeclaration-interface), [mutation observers](https://dom.spec.whatwg.org/#mutation-observers).

   **Exact failing interleaving:** start with a custom button host lacking `class` and `aria-pressed`; construct and toggle its engine. During destruction, removing `active` invokes a one-shot `class` reaction. That reaction constructs and toggles a replacement. The replacement snapshots `class=""` and the old `aria-pressed="true"`, then writes its own pressed state. The old snapshot resumes and removes `aria-pressed`. The replacement remains registered and pressed, but its ARIA state has been overwritten; its later destruction restores the stale snapshot. Evidence: `Button.ts:64`, `:97`, `:111`; `HostSnapshot.ts:47`, `:67`, `:79`.

   This also happens when **Delegate initiated destruction**: direct construction inside the callback never passes through `#activate`, so `#held` cannot delay it (`Delegate.ts:100`, `:148`). The report’s direct-destruction-only boundary is therefore false (`j-binder-report-3.md:57`).

   Routed activation also escapes the hold across delegates. Let delegate A own the host, then remove it. During A’s restoration, the `class` callback inserts it into delegate B’s root and clicks it. B has no hold, acquires and toggles immediately, and A’s remaining attribute restoration overwrites B’s state. Direct destruction followed by a reaction-generated delegated click has the same gap. Evidence: `Delegate.ts:100`, `:106`, `:150`.

   **Ruling:** direct synchronous replacement construction should have an explicit restoration limit: defer construction until restoration completes; write ordering guarantees safety only at the final write. Neither the class remark nor the interface states that limitation (`HostSnapshot.ts:6`; `types.ts:256`). Routed clicks need closing now because shipped delegates reach the defect. The corrective mechanism is a shared per-host restoration barrier entered by `Button.destroy`, consulted by every delegate, and drained through fresh lookups after restoration completes. It must preserve ordinary synchronous activation outside restoration and the existing final-write proof. Merely reordering writes cannot close these paths.

   The original consumed-click-without-toggle interleaving is repaired on the owning delegate’s held path. Its retained assertions require the replacement event and state (`tests/src/browser/Delegate.test.ts:502`, `:506`, `:557`, `:560`).

3. **CONFIRMED.** I attacked the recorder’s forwarding, receiver identity, and repeated restoration. `Reflect.apply` preserves the receiver and arguments; restoration reinstalls the saved method. The supplied patch distinguishes a swallowed `disconnect` by checking `takeRecords()`, checks recorded receiver identity, then checks method identity and unchanged recording after repeated restoration. Evidence: `tests/setupBrowser.ts:948`, `:960`, `:965`; `j-binder3-setuptest.diff:18`.

   `recordListeners` uses the shared recorder with `finally` cleanup, and the pruning proof uses it directly (`tests/setupBrowser.ts:984`; `tests/src/browser/Delegate.test.ts:388`). No inline prototype-swap recorder remains in the browser proofs. Patch applicability is established by the supplied Orchestrator check.

4. **CONFIRMED.** I attacked the distinction between dropping destroyed engines and restoring removed hosts. Registry mismatch only removes ownership bookkeeping; containment controls destruction; the observer disconnects when an owning pass leaves nothing owned. Their separate callers preserve that distinction (`src/browser/Delegate.ts:40`, `:91`, `:131`, `:138`, `:160`).

   `#mark` takes `typeof Button`; the attribute readers and delegate field use the named declarations. The selector wording correctly distinguishes delegated routing from direct construction (`types.ts:54`, `:64`, `:85`, `:178`; `helpers.ts:145`; `Delegate.ts:37`, `:112`). The examples and guide include the effective table, per-entity click wording, and signal lifetime (`guides/veneer.md:505`, `:523`, `:535`).

5. **UNRESOLVED.** I found **no recorded reddening that the named proof’s assertions could not produce**. Representative bindings are:

   | Mutation | Distinguishing assertion |
   |---|---|
   | Restore before releasing ownership | The replacement reaction produces no recorded error: `Button.test.ts:211`; result `j-binder3-mutation-results.json:3`. |
   | Drive a restoration click immediately | `aria-pressed` must remain `"true"` after restoration: `Delegate.test.ts:560`; result `j-binder3-mutation-results.json:19`. Event count alone would not distinguish this mutation. |
   | Ignore the attribute table | The overridden name resolves to `{ delay: 7 }`: `helpers.test.ts:446`; result `j-binder3-mutation-results.json:134`. |
   | Apply constructor `undefined` | The result remains `{ toggle: true, delay: 5 }`: `helpers.test.ts:422`; result `j-binder3-mutation-results.json:143`. |
   | Restore attributes before tokens | Mutation records must order `class`, `class`, `style`, `aria-expanded`: `HostSnapshot.test.ts:83`; result `j-binder3-mutation-results-2.json:3`. |

   The red log contains the reported restoration failures, and the independent green gate records `124 passed` (`j-binder3-red.log.txt:5`; `j-binder-gates-3.log.txt:41`). The corrected `-2` manifests distinguish genuine runs from the earlier pattern-not-found entries.

   However, the retained manifests lack matching probe entries for the recorder results. In particular, `recordCalls: restore leaves the wrapper` has a result but no retained edit definition (`j-binder3-probe-results-2.json:3`; compare `j-binder3-mutations.json` and `j-binder3-mutations-2.json`). The instrument restores saved text for edited paths, including setup files, but the claimed hash verification is supplied only as report prose (`j-binder3-mutate.mjs:36`; `j-binder-report-3.md:88`). The independent replay log does not exist at this reading.

   Retaining the missing recorder mutation inputs, restoration verification, and independent replay output would settle these clauses.

6. **CONFIRMED.** I attacked stale prefix exports, selector-summary drift, compatibility remnants, and scope leakage. The supplied diff removes the replaced mechanisms outright, and the guide’s conditional final-write statement matches the implementation; it does not supply the missing broader limitation identified under claim 2. Evidence: `j-binder-3.diff:1014`, `:1178`, `:1338`, `:1351`; `guides/veneer.md:533`, `:538`.

   The status matches the authorized paths. The retained Orchestrator record establishes the scoped checks, browser tests, policy, guide parity, and build; its tree-wide failure is confined to the app files covered by the integration patch (`j-binder-3-status.txt:1`; `j-binder-gates-3.log.txt:22`, `:41`, `:71`, `:84`, `:113`). I found no prohibited added TypeScript construct or compatibility shim.

Findings fitting no claim: none.

Attacked and held:

- Extra attribute-table keys do not become declared options: only parser keys select reads (`helpers.ts:219`).
- Replacement construction at Button’s final restoration write sees restored state and survives subsequent destruction (`Button.test.ts:176`).
- A click routed through the restoring delegate’s own hold survives an early token reaction (`Delegate.test.ts:512`).
- Ordinary removal and reinsertion before observer delivery retains ownership; consumer destruction between deliveries is pruned without destroying a replacement (`Delegate.test.ts:318`, `:378`).

Referrals: reproduce claim 2’s direct-construction and cross-delegate interleavings with registered custom elements; bind the shared restoration boundary and document the direct-construction obligation. Supply claim 5’s missing instrument inputs and independent replay evidence.

Bounds: behavioral counterexamples are source-and-standard interleavings, not newly executed browser observations. The type attack used the installed compiler with virtual source and no filesystem writes. No browser test, build, mutation, or established gate was rerun. The other round-3 lane’s verdict was not read.

VERDICT: FAIL 2, 5; outside the claims: none
