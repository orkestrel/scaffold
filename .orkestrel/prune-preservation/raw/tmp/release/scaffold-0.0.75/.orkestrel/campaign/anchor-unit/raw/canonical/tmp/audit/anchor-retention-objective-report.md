1. **CONFIRMED.** Held the objective lane on GPT-5.6 Sol. The preconditions precede destination creation and staging: expected HEAD, empty index, absent destination, source/evidence hashes, required inputs, and native gate success (`tmp/release/retain-anchor-unit.mjs:134`, `:149`, `:155`, `:164`). Independent read-only hashing found no frozen-input drift. The script hash matches the effective wrong-HEAD receipt, which records exit `1`, absent destination, and unchanged empty index (`tmp/units/anchor-retention-evidence/wrong-head-5.json:15`). Exclusive writes prevent historical-file replacement (`tmp/release/retain-anchor-unit.mjs:75`).

2. **BROKEN.** Known references across canonical and candidate origins remain unresolved in operational Markdown. An in-memory invocation of the actual `rewriteRecord` function reproduced these failures without retention or staging:
   - Candidate `tmp/units/anchor-repair-report.md:5` retains its effective dispatch reference, `canonical tmp/units/anchor-repair-brief-2.md`.
   - Candidate `tmp/units/anchor-repair-report-3.md:5` retains `canonical tmp/units/anchor-repair-brief-3.md`.
   - Canonical `tmp/audit/anchor-repair-audit-claims-2.md:5` retains its candidate effective report reference, `tmp/units/anchor-repair-report-3.md`.

   The manifest explicitly retains these targets (`tmp/units/anchor-retention-evidence/manifest-3.json:466`, `:472`, `:670`). These are required dispatch/report connections, rather than external or fenced execution context. The cause is the same-origin restriction on relative mappings (`tmp/release/retain-anchor-unit.mjs:88`); the limitations collector then labels the missing mappings as historical or external context (`:101`).

   **Smallest fix:** map unambiguous known references across origins, retaining explicit origin selection where paths collide. The candidate successor report’s effective dispatch must resolve to `../../../../raw/canonical/tmp/units/anchor-repair-brief-3.md`. Preserve raw originals, fenced execution text, and source literals. Bind this correction with a control using the concrete cross-origin references.

3. **CONFIRMED.** The instrument names accepted source paths and controlled evidence paths explicitly, rejects an unexpected staged set, compares evidence blobs with disk bytes, and compares source blobs with Git clean-filter hashes (`tmp/release/retain-anchor-unit.mjs:12`, `:117`, `:122`, `:124`, `:175`). Its mutation path contains copying, metadata writes, and staging; it contains no install, commit, push, publish, cleanup, or source edit. The additive patch matches the inspected script, and independent syntax validation returned exit `0`. This confirms the implemented checks, not a successful future retention run.

**Findings fitting no claim:** None.

**Attacked and held:** Raw evidence selection excludes the named credential/archive/stream filename classes and pack artifacts. The concrete Markdown links examined after rewriting resolved to retained targets; the broken references are cross-origin prose references. Raw originals remain unaffected by that defect. Missing retention lane reports and retention root acceptance are intentional required inputs; their absence refuses execution before writes. Actual staging identity remains pending root execution and independent verification.

VERDICT: FAIL 2; outside the claims: none
