# Check brief — U3-fix-2 (scaffold), mechanical closure of the round-2 prescriptions

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing. Every edit in this unit adopts a round-2 lane's prescription verbatim, so this round closes with the checker and the verifier; the reviewer lanes do not re-run.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-fix-2-brief.md` (edits 1 to 7) and its report `u3-fix-2-report.md`; the prescriptions came from `u3-fix-audit-subjective.md` (claim 9, findings A, B, C) and `u3-fix-audit-objective.md` (claim 9, the first two findings outside the claims), reconciled in `u3-fix-audit-verdict.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Design laws and § Writing, `.claude/rules/writing.md`, `.claude/rules/tests.md` § Shared test infrastructure.

## Review evidence

The fix-2 slice as the actual diff and status: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-fix-2.diff.txt` and `u3-fix-2.status.txt`; read the changed files at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The leaves bullet of `.claude/rules/workspace.md` § Configuration authority carries the placement waiver for every leaf with the reason that no `configs/types.ts` exists for a leaf to import, names `configs/helpers.ts`, `configs/browsers.ts`, and `configs/policy.ts` without a tally, and wraps at 100 columns; the `configs/policy.ts` bullet ends at "resolves in all of them." with no waiver sentence; no other bullet changed; the strings `either vendored leaf` and `extend that waiver` appear nowhere in the file.
2. The `vites.src.browser` seed's two comment lines in `src/core/templates.ts` are byte-identical to the `vites.src.server` seed's, and nothing else in either seed changed.
3. The compilers test case `reaches core through the rewrite in every emitted published face` asserts the whole two-line comment in one `toContain` and no split span remains.
4. `tests/config.test.ts` declares `let extractorPath: string | undefined` and no `extractorResolved`; the two skips read `extractorPath === undefined` and `extractorPath !== undefined`; the existence assertion reads a narrowed value with no assertion operator; the comment above the resolution stays.
5. The roll-up proof builds its fixture through `createPolicyScratch` (writes through `scratch.write`, closes with `scratch.destroy()` in the `finally`), and `mkdirSync(resolve(root, 'tmp'))`, the hand `mkdtempSync`, and the hand `rmSync` are gone from that case — or, where the report records the fixture-root refusal edit 5 names, the case stands unchanged and the report quotes the exact error and command.
6. The roll-up proof asserts that no `orkestrel-declarations-` entry is present in `os.tmpdir()` after the builds that was absent before, with a comment naming what that proves.
7. The `isExtractorModule` cases include a true case whose `Extractor` and `ExtractorConfig` carry `invoke` and `prepare` only through their prototype chain, with a comment naming what it proves — or the report records the guard's refusal under Deviation.
8. Nothing outside the brief's owned files and regions changed, and the report's file list, criteria, and deviations match the diff.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
