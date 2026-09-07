# Audit verdict — U10 database-readers, round 1

Workflow `wf_4f619013-568`, 2026-09-07 01:49 to 02:02 UTC. Lanes on `u10-audit-brief.md`, blind, clean contexts: subjective `reviewer` (Opus 5) — `VERDICT: PASS`; objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench) — `VERDICT: PASS`; `checker` (Sonnet) — `VERDICT: PASS`; `verifier` (Sonnet) — `GATES: GREEN` over the database chain. Every lane ran. U10 is accepted on its claims.

## Findings outside the claims, ruled

- Carried into `u10-fix-brief.md` (a `builder` round, every edit exact): a signal-ended compiler child read as zero diagnostics (objective F1, a false green); a failed `--showConfig` dropping the caller's aliases (objective F2); a destructured export declarator vanishing (objective F3, ruled fail-closed); the `@remarks` on alias resolution (objective F6); `attributeGuideFences` for the fallback-naming helper (subjective 3); `resolveExportKeywords` for the keyword reader (subjective 4, ruled); `scanModuleSource` for the in-band-refusal reader, because `parse*` is bound to the `T | undefined` coercion (subjective 7, ruled); `form: 'module' | 'script'` for the boolean-noun member, the parser's own axis as an external-value union (subjective 5, ruled); the dead fixture members, the under-named case titles, the budget comment, the typographic apostrophes (subjective 1, 2, 8).
- Recorded for the next change over this package: the two recursive walks duplicate the statement grammar and use `visited` two ways (subjective 6); the parser-reader pattern duplicated between scaffold's and database's setups, whose owner is `@orkestrel/test` (the unit's own finding); the dropped phase headings `TypeScript config` and `Guide TypeScript config` (objective F4, fail-closed either way); the report's overstated "no `typescript` specifier" sentence against the required `typescript/bin/tsc` binary path (objective F5); `isTypeOnlyExport` keeping a predicate name (objective referral).
- Resolved by the Orchestrator: the probes at `tmp/u10probe/` are retained under `instruments/u10/`; the gate readings are the verifier's.
- Dropped: none.

VERDICT: PASS on the claims; the fix round closes the findings with `checker` and the verify brief before the commit.

## Round 2 (the fix round's closure)

Workflow `wf_33605fcb-da4`, 2026-09-07 02:20 to 02:25 UTC: `checker` (Sonnet) on `u10-fix-check-brief.md` — `VERDICT: PASS` on every claim (the revert-and-rerun narrative marked UNRESOLVED as writer-reported, the cases and exits it names verified); `verifier` (Sonnet) on `u10-verify-brief.md` — `GATES: GREEN` (`test:setup` 82 passed, `test:guides` 84 passed, `npm test` green across every project, no timing re-run needed). U10 accepted; committed by path on database's branch.

VERDICT: PASS — U10 accepted after U10-fix.
