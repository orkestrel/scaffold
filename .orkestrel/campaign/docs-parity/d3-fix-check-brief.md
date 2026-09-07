# Checker brief — D3-fix (the scaffold-policy fix round)

## Lane

`checker`, Sonnet, mechanical conformance over the fix round: the edits the fix brief specified landed exactly, nothing else moved beyond D3's audited diff, and the readings the report claims are what the diff shows. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fix brief: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d3-fix-brief.md` (edits E1 to E14). The fix report: `d3-fix-report.md`. The round-1 verdict that ruled the findings: `d3-audit-verdict.md`. The evidence: `d3-fix.diff.txt` and `d3-fix.status.txt` (the whole uncommitted tree against `HEAD`, so D3's audited work and this round appear together) and, for the baseline of D3 alone, `d3-scaffold-policy.diff.txt` and `d3-scaffold-policy.status.txt`. Read the changed files under `/home/user/scaffold` at their new state where a hunk is not enough.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. E1: `no-malformed-summary` stands at every site the brief lists (`.oxlintrc.json`, the `configs/policy.ts` register, `tests/setupPolicy.ts` `POLICY_WIRING_RULES`, the two `tests/config.test.ts` sites, `guides/scaffold.md`, `.claude/rules/typescript.md`, `PROPOSAL.md`), `no-imperative-summary` appears nowhere in those files, and `VOICE_RULE` and the message ids `voice` and `name` are unchanged.
2. E2: the three `tests/policy.test.ts` cases carry the bodies the brief quotes — the accounting case reads the own name and a catalog row from the tree with the two `throw` narrowings, the population case asserts `guides/README.md` and `POLICY_CATALOG_FILE` in place of `guides/scaffold.md` and `POLICY_TERM_FILE`, and the currency case is `it.skipIf(!isPolicyFile(process.cwd(), POLICY_TERM_FILE))(…)` with the quoted comment above it and its body unchanged; the import list gained `isPolicyFile`, `POLICY_CATALOG_FILE`, `readPolicyGuide`, and `readPolicyPackage` in the list's order.
3. E3 and E11: the invalid case `rejects a description read past its first block tag` is gone; the valid case the brief quotes sits directly after `accepts a word from the stop set after the opener`; `rejects an opener from the stop set [membership: opening words ending in s that name no verb]` is the stop-set invalid case's name; the helper case `reads a description paragraph up to its first block tag` stays; and the report's revert reading names the failing count with the new case reporting `name`, the restore, the green count, and a `git diff --stat -- configs/policy.ts` reading that matches the diff file.
4. E4 and E5: the `.claude/rules/typescript.md` bullet and the `.claude/rules/writing.md` bullet read exactly as the brief quotes, and no other line of either file moved in this round beyond D3's audited diff.
5. E6, E7, E8, E10: `unconditional` or `unconditionally` stands at `configs/policy.ts` (the `POLICY_BANNED_TERMS` remark and the `TERM_RULE` doc line), `tests/setupPolicy.ts` (`inspectPolicyProse`), and `guides/scaffold.md`, with `in every sense` at none of them; the two comment-type doc lines read as E7 quotes; `POLICY_PROSE_EXCLUSIONS` replaces `POLICY_PROSE_ROOTS` at the declaration, the remark, and the walk; the stray message reads `guide is the package's own, the map, or a catalog row` at the `inspectPolicyProse` site and the control.
6. E9: `readPolicyGuide` is declared with the quoted doc block before `isPolicyMirror`, both predicates' bodies are the two-line forms the brief gives, their doc blocks stay, and the quoted case sits in `describe('prose policy')` after the accounting case.
7. E12: the `tests/policy.test.ts` index entry reads exactly as quoted, and the quoted paragraph sits in § Ownership and drift between the paragraph ending `restore those files when their bytes drift or the files are missing.` and the `tests/distribution.test.ts` paragraph.
8. E13 and E14: the report's symbol tables cite `file:line` values that match the files at their new state for every symbol named (check each `tests/setupPolicy.ts` and `tests/policy.test.ts` row and at least the `configs/policy.ts` rule rows), its `PROSE_POLICY_CONTROLS` table lists the stray control, its strike names `configs/policy.ts` and the whitespace-only gap, and the two `sha256sum host.json` readings it records are identical.
9. Scope: the status file lists exactly D3's nine files plus `PROPOSAL.md`, and `PROPOSAL.md`'s hunk is the one token; the instruments under `.orkestrel/` are untouched; `host.json` changed only by regeneration (digest values alone, the same entry set).

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
