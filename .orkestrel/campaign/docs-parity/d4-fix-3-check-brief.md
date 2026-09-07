# Checker brief — D4-fix-3 (the audit round's prose and shape corrections)

## Lane

`checker`, Sonnet, mechanical conformance. Read only this brief and the evidence it names at the absolute paths it gives; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The brief `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-fix-3-brief.md` and its report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-fix-3-report.md`; the round-1 verdict `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-audit-verdict.md`. The evidence: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-fix-3.diff.txt` and `/home/user/scaffold/.orkestrel/campaign/docs-parity/d4-fix-3.status.txt` (the whole uncommitted tree against `HEAD`, so D4, its fix rounds, and this round appear together), and the changed files at their new state under `/home/user/scaffold`.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. L1: the equality bullet in `.claude/rules/documentation.md` reads exactly as the brief quotes, and the voice bullet after it is unchanged.
2. L2: the `guides` row's `Proves` cell in `.claude/rules/workspace.md` is byte-equal to the `tests/guides.test.ts` row's `Proves` cell in `.claude/rules/tests.md`, ignoring the cells' padding, and `git diff -w` over `workspace.md` against `HEAD` touches only that cell and the separator row.
3. L3: the comment above `keeps every compared summary and example equal to its source` reads exactly as the brief quotes.
4. L4 and L5: no `[...group.methods]` spread remains, `listed` is built from `group.methods.map((method) => method.name).sort().join(', ')`, and the README case asserts `pitch` before `tagline`.
5. L6 and L7: the report records identical `sha256sum host.json` readings across the re-run, `host.json`'s diff against `HEAD` changes digests alone over the same entry set, and the report states the four cases' lines at the final tree with no count of a growable set in its prose.
6. Scope: the status file lists exactly `.claude/rules/documentation.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`, `host.json`, and `tests/guides.test.ts`; `.claude/rules/tests.md`'s diff against `HEAD` is D4's row change alone (this round did not touch it); every `file:line` the report cites matches the files at their new state.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
