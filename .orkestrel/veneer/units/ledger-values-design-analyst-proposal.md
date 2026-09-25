Preserve the textual ledger and add a separate measurement of whether token routing changes the default value. Keep provenance, declaration syntax, and value equality distinct. This follows the accounting, token, and identity obligations in [ROADMAP.md’s exit criterion](/home/user/veneer-probe/ROADMAP.md:238) while preserving the [guide’s intentional textual comparisons](/home/user/veneer-probe/guides/veneer.md:7394).

The proposed rulings and table changes are:

- **Distinguish retuning by value, never by `Source`.** Keep `classifyDeparture` as the syntax classifier. Correct `tokenized` to mean that the declaration introduces a canonical-token read. Add a `Retuned` boolean expectation to tokenized departure rows; use `—` elsewhere. Add a `Probe` column naming the native CSS property used to compare values where the declaration is a custom property.

  Measure release and Veneer expressions in isolated browser contexts, with neutral factors, matching inherited inputs, the applicable condition, and light and dark scopes. A row is retuned when an applicable comparison differs. Use the browser to substitute variables and evaluate CSS; reject missing references, invalid probes, and unresolved contexts. Do not implement a value parser or infer equality from token provenance.

  Feed those measurements into `collectValueGaps`; extend `readDepartures`, `describeDeparture`, and the `scanLedgerDrift` comparison accordingly. The original recorded and emitted strings remain unchanged.

  The `.btn` font-size row must report a retune; the `.accordion` padding row must report routing; the primary-fill rows must report retuning. An Elements source alone cannot decide this: the collected `--vn-space-8` expression preserves `1rem` at neutral density. See [the classifier](/home/user/veneer-probe/tests/setupServer.ts:1622) and [the reference reader](/home/user/veneer-probe/tests/setupStyles.ts:751).

  **Plants:** substitute `--vn-size-2` for the accordion’s spacing token; restore the primary fill to Bootstrap’s value; change a token while leaving its departure expression unchanged. Require classification drift or canonical-value drift as appropriate.

- **Bring canonical values into accounting acceptance.** Retain the Reference map as their sole record. Compose its existing declared-value proof with the departure and addition comparisons under ledger acceptance. A changed token must fail even when its `Retuned` result remains unchanged. The ledger command must run that proof rather than rely on a separately invoked styles suite.

  Reuse `collectReferenceRows` and the native comparison mechanism already used by [the token-value proof](/home/user/veneer-probe/tests/src/styles/tokens.test.ts:70). Rewrite [Outside the ledger](/home/user/veneer-probe/guides/veneer.md:10207) to describe canonical values as part of accounting.

  **Plant:** double the canonical radius without changing its Reference map cell. The existing ledger returned empty drift for this executed mutation; the composed gate must reject it.

- **Record addition values at their declaration sites.** Replace the Additions shape with `Component | Layer | Selector | Property | Condition | Category | Veneer | Reason`. Keep selector rows for name membership, with absent property and value cells. Emit value-bearing rows for every added declaration, including declarations inside added selectors. Attribute custom properties by selector and condition rather than deduplicating their names across sites.

  Change `Addition`, `readAdditions`, `collectAdditions`, and `describeAddition`. Preserve `(empty)` separately from absence. Include the value in `scanLedgerDrift` comparisons. Preserve the existing token-registry exemption only because canonical values receive their own mandatory comparison.

  **Plants:** change the blockquote border to `97px solid currentColor`; change a declaration inside an added selector; change a custom property at one of its declaration sites; remove a recorded addition. The executed border mutation produced empty drift under the existing [collector](/home/user/veneer-probe/tests/setupServer.ts:2608).

- **Reject unattributed emitted rules.** Replace the silent skip in `collectAdditions` with a diagnostic naming layer, selector, and condition. For an intentional addition without an inventory or prefix owner, permit an exact ownership declaration through its Additions selector row. Validate its component against the shipped population, reject conflicting ownership, and refuse stale ownership rows. A guide row supplies attribution, never permission to omit declaration comparison.

  The executed collector sweep found `.caption-bottom` outside attribution. Record its owner as `table`, its layer as `components`, and `caption-side: bottom`; the [shipped partial](/home/user/veneer-probe/src/styles/components/_table.scss:56) establishes that relationship.

  **Plants:** add `.audit-unrecorded { color: red }` in `components`; remove the caption ownership row; emit a selector belonging only to a withheld key. Each must fail. Preserve the separate keyframe refusal.

- **Derive the required shipped population from the inventory.** For this fully shipped CSS baseline, replace the hand-written list with sorted `Object.keys(inventory.components)`, compared against `collectShippedComponents(rows, inventory)`. Keep engine and plugin obligations under their existing checks. No guide table change is needed: the compatibility rows already state shipping.

  **Plants:** add an inventory key without guide obligations; remove a key’s guide rows; leave required variable obligations accepted. Exercise the comparison independently of digest validation. The executed set differences were empty at `0865c67`; this change closes the re-pin boundary in [the conformance assertion](/home/user/veneer-probe/tests/conformance.test.ts:116).

- **Make `bootstrap` provenance verifiable.** Add an `Upstream` locator to Reference map rows carrying that source. Expand grouped rows where their locators differ. A locator identifies a release selector, property, condition, and mode; for Sass-only values, identify the pinned Sass variable and map entry. Read CSS through the existing inventory/PostCSS path and Sass through the installed compiler.

  Extend `collectReferenceRows` to return and validate locators. Compare the canonical default against the independently extracted release value using the same native value measurement. Require every `bootstrap` row to resolve; an alias or prose description is insufficient.

  **Plants:** change a Bootstrap-derived token and its documented value together while retaining its source; relabel the Elements primary fill as `bootstrap`; remove or misdirect an upstream locator. The provenance gate must reject each mutation.

The migration population comes from executed collectors, rather than manual table inspection. Every collected tokenized departure needs its probe and retuning expectation. Every collected addition needs the declaration-site shape and value expansion. Every reference row selected by `source === 'bootstrap'` needs an upstream locator. The attribution sweep adds `.caption-bottom`; the inventory comparison invalidates no existing compatibility row. The provenance comparison has not run, so no existing `bootstrap` value is asserted false here. Its mismatch set must come from the implemented comparison before acceptance.

Land the work in this order, serializing ownership of shared files:

| Unit | Role and engine | Owned files | Acceptance criteria |
| --- | --- | --- | --- |
| LEDGER-ADDITIONS | `opus`, Opus 5.5 | `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `guides/veneer.md` | Values and exact ownership round-trip; caption addition recorded; addition, stale-row, and unattributed-rule plants fail; inventory-derived coverage passes and its plants fail. |
| LEDGER-VALUES | `opus`, Opus 5.5 | The preceding files; `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/styles/tokens.test.ts` | Native comparison distinguishes the named routing and retunes; canonical drift participates in ledger acceptance; every Bootstrap provenance locator resolves; mutation controls fail; textual-only departures remain recorded. |
| LEDGER-AUDIT | `analyst`, GPT-6 Astra; `reviewer`, Opus 5.5; `checker`, Cursor Grok | Read-only over the landed diff and evidence | Independently attack value, ownership, population, and provenance boundaries; verify the migration sets and guide claims. |
| LEDGER-VERIFY | `verifier`, Sonnet | Read-only gate execution | Scoped proofs and the authoritative format, lint, typecheck, build, test, and required service gates pass. |

The main risk is mistaking contextual equality for universal equivalence. Relative units, inheritance, fallbacks, gradients, and conditional rules require explicit comparison contexts; unresolved cases must fail rather than silently become routing. Browser measurements establish default-value comparisons, while rendered consumer proofs retain responsibility for appearance. Browser execution must run on a host that supports it. Coordinate shared setup-file ownership with adjacent units, and modify no scaffold-owned files.