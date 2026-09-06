# Audit brief — U2-fix (round 2 over unit U2 policy-plugin)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, vocabulary, guide voice), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the rules permit), and `checker` (Sonnet: mechanical conformance, scope honesty, each prescribed edit against its prescription). The fix was written by `builder` on Sonnet, so every lane audits work an engine other than its own wrote. Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Round 1 (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-audit-verdict.md`) failed claims 10, 11, and 13 and carried five findings outside the claims. The fix brief `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-brief.md` prescribed eight edits F1 to F8; the fix report is `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-report.md`. The round-1 lanes are `u2-audit-subjective.md` and `u2-audit-objective.md` in the same folder. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md` § Policy instruments, `.claude/rules/architecture.md`, `.claude/rules/names.md`, `.claude/rules/writing.md`.

## Review evidence

The whole U2 change including the fix, as the actual diff and status: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix.diff.txt` and `u2-fix.status.txt`. Read the diff in full; read the changed files at their new state where the diff is not enough. `host.json` is stale until the verifier's `build` regenerates it; do not count it.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `isPolicyDomain(filename, cwd)` compares the registered folder by equality after stripping the linter's directory, and the nested-suffix path (`src/server/execution/nested/src/server/execution/thing.ts`) is neither exempted from `no-misplaced-function` nor reported by `no-malformed-domain`; the two added cases bind that, and every call site passes `context.cwd`.
2. `pathToPolicyRelative` returns the workspace-relative path under both drivers measured in `m8m13-report.md` (CLI absolute path with `cwd` the workspace root; `RuleTester` with `cwd` oxlint's own directory and the declared filename appended), and the unanchored fallback is stated in its TSDoc.
3. `FUNCTION_RULE` and `reportFunction` replace every occurrence of the old names; the rule id and message id are unchanged; `PolicyContext` gains `cwd` and nothing else, readonly.
4. Every sentence in `.claude/rules/architecture.md` § What the policy instruments prove names the instrument its proof belongs to, no pronoun attaches to the wrong instrument, the ambient sentence describes the code's per-rule refusal over a population that reaches those files, and each bullet wraps at the file's column width.
5. The `policy` rows of `.claude/rules/workspace.md` and `.claude/rules/tests.md` and the `guides/scaffold.md` bullet state the sweep's laws (mirrors, suppressions, the rule map, filenames, manifest scripts, skills, bridges) and nothing the plugin now proves; each table stays aligned.
6. `tests/policy.test.ts`'s workspace case is named for what it proves.
7. The real-binary case asserts the presence of the `debugger` diagnostic over `scripts/read.ts` beside the absence of the line-ending diagnostic, so the absence has evidence its input arrived.
8. `createPolicyViolation` is the single construction path for `PolicyViolation` in `tests/setupPolicy.ts`, its optional `line` never writes an `undefined`-valued key, and no object literal of that record remains.
9. `inspectPolicyPopulations` reports a rule no record enables and a population no override declares, its controls in `tests/policy.test.ts` cover a missing rule, a missing population, and the real configuration, and the `tests/config.test.ts` parity case calls it rather than walking the configuration inline; `POLICY_WIRING_RULES` is unchanged.
10. The builder's self-flagged deviation (`ReadonlyArray<readonly string[]>` for the prescribed `readonly (readonly string[])[]`) is the same type and is what the lint configuration requires.
11. Round 1's passing claims 1 to 9 still hold on the fixed tree (no compiler specifier, no import in the plugin, single-homed registers, `RuleTester` pairs per rule, suffix keys, populations, no skipped test, scope honesty).
12. Nothing outside the fix brief's owned files changed beyond `host.json` and the campaign folder, and no `POLICY_CONTROLS` row is left that nothing runs.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
