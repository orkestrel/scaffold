1. **CONFIRMED.** Held the objective lane. The successor delta preserves the prewrite guards, staging scope, and blob checks. In-memory comparison found identical predecessor/successor source hash maps and no omitted predecessor entries. Successor review inputs remain mandatory at execution (`tmp/release/retain-anchor-unit.mjs:13`, `:155`).

2. **BROKEN.** Cross-origin rewriting corrupts an existing qualified evidence reference. Actual `rewriteRecord` execution on `tmp/audit/anchor-closing-subjective-report.md:5` changes:

   ```text
   tmp/release/scaffold-0.0.75/tmp/units/anchor-repair-evidence/red.log.txt:16
   ```

   into:

   ```text
   tmp/release/scaffold-0.0.75/../../../../raw/candidate/tmp/units/anchor-repair-evidence/red.log.txt:16
   ```

   Relative to the operational record, that resolves to `operational/canonical/tmp/raw/candidate/tmp/units/anchor-repair-evidence/red.log.txt`, rather than the manifest’s `raw/candidate/tmp/units/anchor-repair-evidence/red.log.txt` target (`manifest-4.json:874`). The `after.diff` reference at the same report’s line 9 suffers the same corruption.

   The added aliases match inside a longer path (`tmp/release/retain-anchor-unit.mjs:96`, `:107`). The limitations record dismisses these known retained artifacts as historical/external context (`:108`). In-memory predecessor execution preserves the original references; successor execution corrupts them.

   Smallest repair: map the complete canonical-relative candidate references before shorter aliases, prevent partial replacement inside longer paths, and pin these actual references with retained-target resolution assertions. Preserve fenced text and ambiguous-origin refusal.

3. **CONFIRMED.** The retained red/green receipts name the same proof command and bind their instrument hashes to the preserved predecessor and effective successor. I executed the proof in memory with only receipt writing removed; its assertions passed. The proof covers the reproduced effective links, explicit selectors, unqualified collision, entry-order independence, and fenced context (`mapping-proof.mjs:14`, `:30`). It doesn’t cover the qualified-reference regression identified here. The report expressly leaves actual retention and staged identity pending (`anchor-retention-report-2.md:43`).

Findings fitting no claim: none.

Attacked and held: Unique cross-origin effective links resolve correctly. Explicit origin selectors survive reversed entry order; unqualified collisions remain unchanged. Fenced execution text remains unchanged. These successful boundaries don’t justify rewriting a suffix within a longer qualified reference.

VERDICT: FAIL 2; outside the claims: none
