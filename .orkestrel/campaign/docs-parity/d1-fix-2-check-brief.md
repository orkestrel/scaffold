# Checker brief — D1-fix-2 (the guide-readers third round)

## Lane

`checker`, Sonnet, mechanical conformance over the third round: each ruling of `docs-d1-fix-2-brief.md` landed where the report says, the README patch the Orchestrator applied matches the report's, nothing outside the owned set plus `README.md` moved, and the report's readings match the diff. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fix brief: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-fix-2-brief.md`. The report: `d1-fix-2-report.md`. The round-2 verdict: `d1-audit-verdict.md` § Round 2. The evidence: `d1-fix-2.diff.txt` and `d1-fix-2.status.txt` (D1, D1-fix, D1-fix-2, and the Orchestrator's README patch together against `HEAD`). Read the changed files under `/home/user/fleet/guide` at their new state where a hunk is not enough.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `findUnnamed` is gone; `extractUnnamed(document)` stands in `src/core/helpers.ts` with its TSDoc; `GuideInterface.unnamed(): readonly string[]` is declared with its contract and cached once in `Guide`; `tests/guides.test.ts` asserts `guide.unnamed()` empty and imports nothing from `@orkestrel/markdown`; the RN catalog row names `guide.unnamed()`, writes the separator as space-pipe-space, and states the H3-only limit; the Helpers, Types, and Methods tables carry the new names.
2. The projection enumeration in the guide lists `tagline` and `unnamed`; `grep -rn "block-position" src guides tests` prints nothing and the replacement term appears at the sites the report lists; `\|` is stated as a guide-side clause.
3. `maskFences` exists, is exported and tested, and is wired at the four search sites the report names; the three fenced-body cases and the `maskFences` cases exist; the guide states the fenced-body rule.
4. The pairing rule is stated per title in the pairing paragraph, the EQ row, and `findDrift`'s TSDoc; `grep -n "A heading pairs one fence" src guides` prints nothing.
5. `README.md` carries the two tag-rule replacements, `tagline()` and `unnamed()` in the projections list, and the `findDrift` and `extractUnnamed` entries after `findMissingSymbols`; no `block-position` remains in it.
6. The status file lists exactly the D1 owned set plus `README.md`; the report's failing-first reading names cases that exist; every criterion carries an exit code; the flagged claims are stated as limits.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
