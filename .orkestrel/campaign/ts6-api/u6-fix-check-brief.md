# Check brief — U6-fix (scaffold), mechanical closure

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u6-fix-brief.md` (edits 1 to 12) and its report `u6-fix-report.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md`, `.claude/rules/tests.md` § Expensive proofs. The rulings behind the edits: `u6-audit-verdict.md`; the contended reading: `orchestrator-measurements.md` § The `config` project under contention.

## Review evidence

The fix's slice as an interdiff: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u6-fix.slice.diff.txt` (`a/`: the tree at U6's exit; `b/`: the tree now); the whole U6 change is `u6-fix.diff.txt`; the status is `u6-fix.status.txt`. The gate exits are the fix verifier's (`u6-fix-verify-report.md`), not this lane's to rule.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `PROPOSAL.md` states the fleet's ruling at the tool table's `typescript` row and at C12 in the brief's words (6.0.3 ships the in-process API, 7 drops it, the `tsc` command by ruling, the vendored lint configuration refusing the specifier) and nowhere states that no in-process compiler API is available; the dependency-delta paragraph bounds the parser's resolution to the ranges `parseSync` reports and no longer says "exactly".
2. `ROADMAP.md` opens the campaign row with the invariant the campaign establishes rather than a landed fact, carries no "today", states the `@packageDocumentation` row on what was measured (scaffold's own entry, the fixture probe of the same chain, the shipped plugin not driven) with no fleet-wide negative, and adds the `bin` planning row after the TSDoc-openers row.
3. The `config` rationale in `src/core/templates.ts` and `vite.config.ts` is byte-identical, names the linter's two capped children and the roll-up's compiler and extractor spawns, and the budget stays `60_000`.
4. `.oxlintrc.json` carries one added `overrides` entry whose `files` list names `tests/**`, `configs/**`, `scripts/**`, and the root files with the brief's globs and whose only rule is `no-restricted-imports` with the single `typescript` pattern and message in the environment blocks' shape; the seven environment blocks are unchanged; nothing else in the file moved.
5. The `DECLARATION_DEV_DEPENDENCIES` TSDoc's first sentence and the guide's Surface row no longer claim the executable case, the `@remarks` reads as the brief's sentence, and the guide row's other cells and padding are unchanged.
6. The slice touches only the owned files and regions; `host.json` and `package-lock.json` are unchanged from U6's exit; no changed prose line carries a substitution-table term or a stated count; the report's before/after lines match the slice.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
