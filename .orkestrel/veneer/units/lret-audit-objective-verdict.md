1. **CONFIRMED** — Resolution controls classification at [tests/setupServer.ts:2111](/home/user/veneer-lret/tests/setupServer.ts:2111). A read-only execution of the actual functions returned `tokenized` for equal resolutions, `retuned` for unequal resolutions, and no member for an undecided emitted value. The `ignore-resolution`, `text-compare`, and `route-undecided` mutations each produced an `AssertionError` in that execution. The assertions distinguish those mutations. Dropped declarations correctly bypass resolution. The retained `lret-plant-undecided.log.txt:577` also records the assertion naming the unsupported pair; the gate checks that list at `tests/conformance.test.ts:255`.

2. **BROKEN** — The construction does not preserve every distinction it claims.

   - **Normalization changes literal text.** Executing `normalizeResolvedColors` from [tests/setupServer.ts:3575](/home/user/veneer-lret/tests/setupServer.ts:3575) maps both `"color(srgb 1 0 0)"` and `"rgb(255, 0, 0)"` to the latter string, quotation marks included. Used as `content` values on `.sample::before`, these display different text. Normalization runs on every resolved property at `tests/setupServer.ts:3778`, so it can hide that difference. The red/blue color control remained distinct. Normalize actual color tokens while preserving strings and URLs.
   - **The mode reader includes siblings.** Executing `matchesDarkScope('[data-bs-theme=dark] + .btn')` returns `true`, although the button does not inherit its sibling’s theme. The context builder correctly marks the sibling relationship, but the mode reader discards that relationship at `tests/setupServer.ts:3541`. The pair `light-dark(red, blue)` versus `red` therefore receives the wrong neutral color scheme. Derive the mode from the target’s ancestry.
   - **Selector construction loses matching information.** Executed inputs `#sample` and `:where(button.page-link)` both become an unqualified `div`. Variables declared on those selectors cannot be read from the intended site. See `tests/setupServer.ts:3526` and `tests/setupServer.ts:3812`.

   The additional requested attacks were reviewed against the neutral-host construction at `tests/setupServer.ts:3696`; their browser outcomes were not executed in this sandbox:

   | Attack | Construction problem or boundary |
   | --- | --- |
   | Custom padding value `calc(50% - 1px)` versus `499px`, with a 1000px containing block | A registered `<length-percentage>` computes the expression without resolving its percentage against the consuming property. |
   | `background-color: currentColor` versus `red`, on a red element | The neutral element loses the selector’s `color`. |
   | `margin: 1rem` versus equivalent longhand declarations | Different property names cannot form one `ValuePair`; declaration absence correctly remains `dropped` under claim 1. |
   | `font-size: inherit` versus `20px`, under a 20px parent | The neutral parent supplies 16px instead. |
   | `width: 50%` versus `500px`, under a 400px parent | The neutral 1000px parent can conceal the difference. |
   | `margin-left: 1em` versus `20px`, on a 20px element | The neutral element uses 16px. |

   The retained `lret-mutation-colors-raw.log.txt:7` reports failures for normalization removal, but its assertions test the chosen normalization, not preservation of rendered distinctions. Preserve the required context and compare through the consuming property where its semantics determine the result.

3. **CONFIRMED** — The union and precedence agree at [tests/setupServer.ts:153](/home/user/veneer-lret/tests/setupServer.ts:153) and `tests/setupServer.ts:2111`. The attempted row-drift attack found unchanged row identities and member changes matching `lret-drift-members.txt`, after decoding its failure-output quote escaping. No departure retains `declared`; unrelated uses of that word remain valid. The verdict rows are `retuned`, `tokenized`, and `retuned`, asserted at `tests/conformance.test.ts:285`. Removing the resolution branch distinguishes those assertions by losing the required `retuned` members. `lret-conformance.log.txt:13` records the passing conformance run.

4. **BROKEN** — “Every site … in each mode” is false at [tests/setupServer.ts:4019](/home/user/veneer-lret/tests/setupServer.ts:4019). I executed the function’s request-construction prefix without invoking a resolver. Given root `red`, dark-scope `blue`, and `.btn { --vn-text-body-base: red }`, it requests only root/red, dark/blue, and `.btn`/red comparisons. It never requests `.btn` inside dark mode. An explicit dark-selector control adds the missing blue/red comparison. Generate both applicable mode contexts for a mode-independent declaration.

   The retired retained-length test also checked something the gate does not independently check. Change `--vn-radius-pill` and its reference cell from `50rem` to `40rem`, and change its alias to `calc(var(--vn-radius-pill) * 1.25)` at `src/styles/_tokens.scss:555`. The alias still resolves to the release value and qualifies as a witness, although the canonical token no longer retains it. The retired test at `73326c7:tests/src/styles/tokens.test.ts:210` compared the token directly with `50rem`; preserve that independent comparison or an equivalent gate.

   The simpler radius plant is valid evidence: `lret-plant-radius.log.txt:109` contains an `AssertionError` with `6px` versus `12px`. The assertion at `tests/conformance.test.ts:291` distinguishes that plant. `canonical-self` would defeat the comparison and is distinguished by the setup assertions at `tests/setupServer.test.ts:3967`, although its retained mutation log omits the failure message.

5. **CONFIRMED** — The scan implements Ruling 7’s defined row-membership predicate at [tests/setupServer.ts:4072](/home/user/veneer-lret/tests/setupServer.ts:4072). Accepting `retuned` rows was the failed attack: a read-only execution of the actual scan and `witness-retuned` mutation produced an `AssertionError`. The setup assertion at `tests/setupServer.test.ts:4014` distinguishes it. `lret-plant-witness.log.txt:1069` records the gate assertion naming `--vn-radius-pill`; `lret-conformance.log.txt:13` records the unplanted tree passing. This confirms the specified witness predicate; claim 4 identifies the stronger token-provenance check it does not replace.

6. **BROKEN** — The claimed mutation evidence is incomplete. [lret-mutations.sh:22](/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/lret-mutations.sh:22) runs only `setupServer.test.ts` and filters away failure messages. None of the retained mutation logs contains `AssertionError`, so none qualifies as an assertion-based kill under the brief. The probe-syntax and context-building cases pass in every supplied mutation log, and no conformance case runs in that driver.

   The `ValueResolver` proofs have these discriminating assertions. Log names below resolve under `/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/`.

   | Proof location | Mutation and whether the assertions distinguish it | Retained evidence read |
   | --- | --- | --- |
   | `setupServer.test.ts:3657`, text-only members | `text-compare`: **yes**, expected members change to `retuned` | `lret-mutation-text-compare.log.txt:4`; failure message missing |
   | `setupServer.test.ts:3699`, retuned members | `ignore-resolution`: **yes**, required `retuned` members disappear | `lret-mutation-ignore-resolution.log.txt:5`; failure message missing |
   | `setupServer.test.ts:3737`, undecided pairs | `route-undecided`: **yes**, both the named list and empty departures assertion change | `lret-mutation-route-undecided.log.txt:6`; failure message missing |
   | `setupServer.test.ts:3769`, resolved values | `colors-raw`: **yes**, normalized alpha and gradient expectations differ | `lret-mutation-colors-raw.log.txt:7`; failure message missing |
   | `setupServer.test.ts:3839`, every probe syntax | Removing a redundant syntax: **no reliable discrimination**. Inputs derive from the same table; `<length-percentage>`, `<length>+`, and `<length-percentage>+` use values already accepted by `<length>`, while `<number>#` uses scalar inputs | Every mutation log reports this case passing |
   | `setupServer.test.ts:3855`, planted departure drift | `ignore-resolution`, `text-compare`, or `route-undecided`: **yes**, literal expected drift or undecided lines change | Corresponding mutation logs, line 9; failure messages missing |
   | `setupServer.test.ts:3890`, context elements | Force `sibling: false`: **yes**, explicit expected structures differ; no supplied mutation targets it | Every mutation log reports this case passing |
   | `setupServer.test.ts:3928`, color normalization | `colors-raw`: **yes**, explicit normalized strings differ | `lret-mutation-colors-raw.log.txt:11`; failure message missing |
   | `setupServer.test.ts:3953`, canonical comparison | `canonical-self`: **yes**, required doubled-radius findings disappear | `lret-mutation-canonical-self.log.txt:12`; failure message missing |
   | `setupServer.test.ts:3979`, witnesses | `witness-retuned`: **yes**, `--vn-gray-200` disappears from the expected missing set | `lret-mutation-witness-retuned.log.txt:13`; failure message missing |

   The `cascade ledger` cases distinguish the following controls by their assertions; the supplied mutation driver executes none of them.

   | `conformance.test.ts` proof | Mutation or plant its assertions distinguish | Executed evidence supplied |
   | --- | --- | --- |
   | `:238`, dark component measurement | Change classified members or omit theme-owned dark rules | Radius and witness plants produce assertion failures |
   | `:254`, every difference decided | Introduce an unsupported measured pair | No conformance control log; the undecided plant targets setup |
   | `:258`, every departure recorded | Change a member without updating its guide row | Radius and witness plant assertion failures |
   | `:268`, no stale departure | Leave the old row after that change | Radius and witness plant assertion failures |
   | `:278`, verdict members | `ignore-resolution` removes required `retuned` members | No paired mutation run |
   | `:290`, canonical values | Double the radius token | `lret-plant-radius.log.txt:109` |
   | `:312`, witnesses | Retune the pill token with its reference cell | `lret-plant-witness.log.txt:1069` |
   | `:330`, additions recorded | Remove a required addition row | No paired mutation run |
   | `:334`, no stale addition | Add a nonexistent addition row | No paired mutation run |
   | `:338`, planted literal addition | Stop collecting the planted `letter-spacing` declaration | No paired mutation run |
   | `:349`, attributed rules | Suppress the planted orphan finding | No paired mutation run |
   | `:356`, measurement-owned rules | Incorrectly attribute a row-owned selector | No paired mutation run |
   | `:369`, shipped deferrals | Add a deferral for a shipped name | No paired mutation run |
   | `:373`, semantic tags | Add or remove a selected tag against the declared population | No paired mutation run |

   The undecided plant itself is confirmed by `lret-plant-undecided.log.txt:577`: the assertion at `setupServer.test.ts:3696` distinguishes the added unsupported pair. Retain complete mutation output, supply missing controls, and use independent inputs requiring each claimed syntax.

7. **CONFIRMED** — The synchronous collection and asynchronous classification boundary has distinct work at [tests/setupServer.ts:3453](/home/user/veneer-lret/tests/setupServer.ts:3453) and `tests/setupServer.ts:3921`. The attempted naming, mutable-return, and redundant-wrapper attacks found descriptive helper names, readonly public collections, and substantive classification rather than forwarding. Declarations are exported from the designated setup module; the exact export assertion at `tests/setupServer.test.ts:535` would distinguish removal. The behavioral assertions are assessed in claim 6. Searches across `tests`, `src`, `app`, `configs`, `guides`, and `vite.config.ts` found no retained-alias export consumers. `lret-check.log.txt:31`, `lret-lint-check.log.txt:7`, and `lret-setup.log.txt:8` support the contract checks.

8. **CONFIRMED** — The budget is based on the contended measurement, not the idle measurement. [timing.txt:4](/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/probe/timing.txt:4) records 4841ms; rounding to 4850ms gives `2 × 4850 + 5000 = 14700`. That budget wraps the resolver hooks at `tests/conformance.test.ts:236` and `tests/setupServer.test.ts:3650`. The probe includes classification, repaint comparisons, canonical scanning, and destruction. The supplied setup and conformance runs remain within their budgets under the recorded contention. This evidence covers that measured load envelope.

9. **BROKEN** — The guide overstates the gate.

   - [guides/veneer.md:7057](/home/user/veneer-lret/guides/veneer.md:7057) claims 8-bit comparison regardless of color notation. The implementation leaves `oklch()` and `color(display-p3 …)` unchanged, explicitly asserted at `tests/setupServer.test.ts:3949`. Restrict that statement to the forms actually normalized.
   - `guides/veneer.md:10599` claims every canonical declaration is resolved against its cell. Claim 4’s missing dark component comparison contradicts that assurance.
   - `guides/veneer.md:7571` claims witnesses establish that a token retains the release value. Claim 4’s compensating alias preserves the witness while changing the token. Preserve an independent token-value comparison before making that claim.

10. **CONFIRMED** — The scope attack found no extra changed path: live status matches `lret-status.txt:6`, and the retained `lret.diff` is byte-identical to `git diff 73326c7`. Every changed file is owned by the brief. I read the retained gate logs: check `:31`, lint-check `:7`, format-check `:7`, setup `:12`, build-src `:59`, conformance `:17`, build-src-styles `:16`, tokens `:36`, guides `:17`, and policy `:17` all end in `exit=0`. These establish successful gate execution, with proof adequacy separately ruled in claim 6.

Findings outside the claims: none.

VERDICT: FAIL 2, 4, 6, 9; outside the claims: none