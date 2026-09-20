<!-- codex exec, gpt-6-astra, read-only, SUBJECTIVE lane by swap; journal u4b-audit-analyst.jsonl (ephemeral, swept at acceptance); thread 01a0c0b9-914a-7540-b2ef-e38e044e8c9e; exit 0; retained 2026-09-20 -->

The implementation needs a fix round for claims 4 and 6. I ran only read-only commands and in-memory checks. Browser-run evidence below comes from retained logs.

1. **CONFIRMED.** The readonly contracts and exports are present in [setupConformance.ts](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:29). The reader rejects missing columns and invalid statuses. [setupConformance.test.ts](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.test.ts:64) pins inventory identity and covers the named reader cases. The retained setup log reports green. Bound: the tests pin the inventory version and digests; the reader itself validates their shape.

2. **CONFIRMED.** The presence proof derives wholly shipped component keys, checks normalized selectors and custom-property names, then compares against the explicit list in [conformance.test.ts](C:/Users/mikes/WebstormProjects/veneer/tests/conformance.test.ts:50). My in-memory reading returned `SHIPPED_KEYS []`. The retained `plant-accepted.log.txt` reports: `Shipped component alert is missing selector .alert`.

3. **CONFIRMED, from source, fixture, and retained runs.** [recordButtonOracle](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:546) uses the browser resolver, official asset bytes, scratch markup, named actions, reduced-motion emulation, and observation cleanup. Fixture writes are guarded by `ORACLE_REFRESH === '1'` in [conformance.test.ts](C:/Users/mikes/WebstormProjects/veneer/tests/conformance.test.ts:91). The fixture carries the claimed steps and empty exclusions. Retained managed-Chromium and Edge logs report passing comparisons; the missing-fixture and differing-step controls report the required failures. The retained contended reading is `2550ms`, consistent with `ORACLE_TIMEOUT = 10_100`. I did not relaunch the recorder because it writes scratch files.

4. **REFUTED — forces another round.** The row contract does not reliably bind an obligation to the action it claims. Using the actual scanner, live guide row, and committed fixture, I changed only the Space row’s proof:
   - `button.click.release` returned `undefined`.
   - `button.keyboard.enter` returned `undefined`.
   - The missing-step control returned `missing recording step`.

   The [keyboard predicate](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:523) checks resulting state but never distinguishes Space, Enter, and mouse activation. The [accessibility predicate](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:503) also accepted the released reading after I deleted `aria-pressed`; its wrong-role control correctly failed.

   Bind each keyboard obligation to its matching action, require an explicit valid pressed attribute, and add these negative cases to the setup proof.

5. **CONFIRMED.** [Compatibility](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:486) has the required placement, columns, accepted rows, exclusions, status semantics, and proof references. Its Button and assigned engine obligations correspond to the retained ledger. The live reader accepted every existing row against the fixture. The Tests links exist, and the retained guide gate reports green.

6. **REFUTED — forces another round.** [setupConformance.ts:16](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:16) directly imports `@orkestrel/markdown`, but my manifest reading returned `MARKDOWN_DECLARATIONS []`. Resolve this through a declared dependency’s public capability or an explicitly authorized dependency declaration. The installed-guide alternative remains the objective lane’s assigned question.

   The remaining placement and naming review passes: declarations are exported from the shared setup module, contracts are readonly, helper names describe their operations, and browser callbacks use the permitted direct-argument form. The fixtures contain data.

7. **CONFIRMED.** The supplied status names only the owned guide, test modules, and oracle fixtures. In-memory comparisons returned `INVENTORY_CONTENT_EQUAL true` and confirmed that each fixture’s rendered patch content equals its live parsed content. Changed-version controls returned false.

8. **UNDECIDABLE in this lane.** The retained writer logs support its scoped gates. They do not establish the complete verifier-owned claim covering build, the whole test chain, distribution, scaffold audit, and unchanged status across an ordinary run. The claims file expressly assigns that ruling to the Orchestrator.

Additional findings remain bounds.

9. **Bound — U7 consumption.** [readOracleControl](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:389) requires `window.bootstrap.Button` and puts official identity into every reading. It cannot directly read Veneer’s standalone control under the same contract. U7 must distinguish observable-state comparison from official identity verification. This does not force U4b to implement U7’s comparison mechanism.

10. **Bound — wording controls predicate selection.** [scanOracleObligation](C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:475) selects predicates by complete obligation sentences. Those sentences function as machine identifiers despite appearing to be ordinary prose. Record that maintenance constraint; wording changes alone do not force this round.

Verdict: fix round with claims 4 and 6.