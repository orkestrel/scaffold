# J-BINDER audit round 2 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0d001-2e85-7432-8611-2430a0bde30e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-audit-2.jsonl` (launch copy under `tmp/codex/`); 31 commands; 463 s; usage {"input_tokens":2196627,"cached_input_tokens":2031360,"cache_write_input_tokens":0,"output_tokens":11961,"reasoning_output_tokens":4711}. Retained verbatim from the exec's last message.

---

Objective lane.

1. **CONFIRMED.** The renames, deletions, and function-local `instanceOf(HTMLElement)` calls match the claim. I attacked the substitution rationale with the installed TypeScript 6.0.3 compiler: `isInstance` produced TS2345 for the narrowed argument and TS2322 for the filtered collection; the corresponding `instanceOf` expressions compiled. The installed declarations explain the difference: `node_modules/@orkestrel/contract/dist/src/core/index.d.ts:2874` versus `:2136`. Evidence: `src/browser/HostSnapshot.ts:20`, `Button.ts:41`, `Delegate.ts:87`, `helpers.ts:164`.

2. **CONFIRMED.** I attacked undeclared keys, mutation of supplied groups after construction, and invalid vocabulary leaving ownership behind. The resolver enumerates default keys, validates supplied values, and freezes a copied result (`src/browser/helpers.ts:252`). Construction resolves vocabulary before claiming, reading the root, or installing the listener (`Button.ts:51`, `ColorMode.ts:42`, `Delegate.ts:49`). The retained assertions distinguish those attacks: `tests/src/browser/helpers.test.ts:467`, `Button.test.ts:114`, `Button.test.ts:136`, and `ColorMode.test.ts:43`. Stored groups have subsequent readers; Button’s selector group does not.

3. **CONFIRMED.** I attacked ASCII whitespace versus nonbreaking space, selector lists versus `CSS.supports`, and attribute names outside the unit’s examples. The guards contain the relevant failures and reject non-string inputs before coercion (`src/browser/validators.ts:35`, `:53`, `:78`). No attribute-name counterexample exists within the standard’s name production: `createAttribute` and `setAttribute` use the same valid-attribute-local-name check. This conclusion concerns name validity, not value-dependent restrictions. [DOM name validation](https://dom.spec.whatwg.org/#concept-attribute-local-name), [createAttribute](https://dom.spec.whatwg.org/#dom-document-createattribute), [setAttribute](https://dom.spec.whatwg.org/#dom-element-setattribute). The guard assertions and recorded mutations agree (`tests/src/browser/validators.test.ts:25`; `j-binder2-mutation-results.json:89`).

4. **BROKEN — a click during restoration can drive an already-aborted engine.** This is a source-derived interleaving:
   
   A registered custom HTMLElement observes `aria-pressed`, carries the button trigger attribute, and initially has no pressed state. A delegated click acquires its engine. Remove the host. During the removal delivery, `#release(true)` calls `engine.destroy()`. Destruction aborts the controller, then restores the snapshot, and only afterwards releases the registry (`src/browser/Button.ts:105`). Restoring the absent `aria-pressed` calls `removeAttribute` (`HostSnapshot.ts:62`). Its custom-element callback reinserts the host into the root and calls `click()`.
   
   That nested activation sees the old engine still registered. `#release(false)` treats registry identity as liveness (`Delegate.ts:120`), and activation calls that engine’s `toggle()` (`:90`). The aborted-controller check returns without toggling (`Button.ts:98`). The click is prevented but produces no toggle event. Custom-element reactions execute before the decorated DOM operation returns, making this interleaving reachable. [Custom-element reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions).
   
   The correction belongs at the teardown/activation boundary: an activation arriving during restoration must wait until restoration completes and then perform a fresh lookup. Merely releasing the registry before restoration risks a replacement engine being overwritten by the old snapshot. The ordinary reinsertion and boundary cases remain correct (`tests/src/browser/Delegate.test.ts:321`, `:343`).

5. **BROKEN against amended R11/R19; the literal prefix instruction was implemented.** `resolveOptions` cannot consume independently replaced attribute names: its public parameter is a string prefix, and it reads `${prefix}${key}` (`src/browser/helpers.ts:214`, `:219`). For example, resolved `{ parent: 'data-accordion' }` cannot make the declared `parent` parser read `data-accordion`; the default call reads `data-bs-parent`.
   
   The governing contract requires the resolved attribute table, explicitly (`j-engine-design-verdict.md:92`; `j-engine-shape-verdict.md:9`; `src/browser/types.ts:598`). Replace the prefix parameter with the effective key-to-name mapping, update its tests and guide, and pass Collapse’s resolved table at its first consumer. The implementation brief’s B2 prefix instruction also needs correction.
   
   The adjacent mechanisms held: event details are not mirrored; completed events are non-cancelable; target parsing matches Bootstrap’s `dom/selector-engine.js:10` and `util/index.js:17`; constructor `false` and `0` survive; the boolean array-literal fixture is refused; abort releases Button (`helpers.ts:28`, `:147`, `:231`; `Button.ts:65`).

6. **UNRESOLVED.** **None exists** among the retained mutations whose recorded reddening the named proof could not have produced. The instrument applies exact edits, captures failures, and restores saved source text (`j-binder2-mutate.mjs:13`, `:27`, `:36`). Representative distinguishing assertions are:

   | Mutation | Assertion distinguishing it |
   |---|---|
   | Drop falsy constructor values | `{ toggle: false, delay: 0 }` remains the result: `tests/src/browser/helpers.test.ts:398`; result record `j-binder2-mutation-results.json:148`. |
   | Return vocabulary defaults directly | Result identity differs from `BUTTON_SELECTORS`: `helpers.test.ts:463`; result record `:172`. |
   | Skip dropping destroyed engines at delivery | Disconnect count becomes `1` after the awaited delivery: `Delegate.test.ts:407`; result record `j-binder2-mutation-results-2.json:11`. |
   | Skip dropping destroyed engines at click | Disconnect count becomes `2` after the unrelated click: `Delegate.test.ts:414`; result record `:3`. |
   | Never observe the root | Boundary assertions require no registered engine and restored attributes: `Delegate.test.ts:354`; result record `:44`. |

   The claimed independent reproduction remains unavailable: `j-binder-mutations-2-orchestrator.log.txt` does not exist in the supplied directory. That run and its recorded output would settle the remaining clause. The stage-A record and later green gate do not substitute for it.

7. **BROKEN on the “live engine” statement.** The guide says `find` returns a live engine (`guides/veneer.md:523`), but the interleaving in claim 4 exposes an aborted engine during restoration. Fix that lifecycle behavior and bind the sentence to its regression proof. Export parity and summary agreement have the retained gate evidence; the revised synchronous-reinsertion wording correctly describes the ordinary cases (`guides/veneer.md:504`). The prefix description accurately describes the current implementation, but must change with claim 5.

8. **BROKEN as literally written, on the added-line prohibition.** The diff adds `expect(isAttributeName(null)).toBe(false)` (`j-binder-2.diff:1923`; `tests/src/browser/validators.test.ts:53`). That `null` is an invalid-input fixture, not a DOM API return. Preserve this useful total-guard proof; correct the claim’s prohibition to distinguish invalid-input fixtures from implementation sentinels.
   
   The supplied gates remain established. Read-only `git apply --check` accepted the app patch, roadmap patch, and retained ButtonSection patch; the retained patch required `--unidiff-zero`. Their changes address separate expressions. No additional gate run or patch application is claimed.

Findings fitting no claim: none.

Attacked and held:

- Moving an owned host between roots does not leave the receiving delegate holding a stale engine: it borrows through `find`; after the owning delegate releases it, the next click looks up and acquires afresh (`Delegate.ts:90`, `:117`).
- Consumer destruction **between** deliveries is handled. Registry identity changes, the stale owned entry is dropped, and a replacement owner survives the old engine’s idempotent destruction (`Delegate.ts:120`; `Button.ts:106`).
- A live host outside the root is intentionally retained by `#release(false)` until delivery. This preserves removal and reinsertion within one synchronous run.
- Unrecorded class tokens survive snapshot restoration; recorded membership is restored (`HostSnapshot.ts:66`; `tests/src/browser/HostSnapshot.test.ts:27`).

Referrals: the Orchestrator should reproduce claim 4 with a real custom element and retain the regression proof; supply the independent mutation receipt required by claim 6; correct the resolver contract and its first-consumer threading under claim 5. The installed `isInstance` narrowing defect belongs upstream in Contract.

Bounds: no browser test, build, mutation, or filesystem write was performed. Claim 4 is a source-and-standard interleaving, not an executed browser observation. The type attack used an in-memory compiler source; patch checks tested applicability only. The established gates were read from their retained record.

VERDICT: FAIL 4, 5, 6, 7, 8; outside the claims: none
