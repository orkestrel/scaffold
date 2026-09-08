# Audit brief — U2-fix-2 (round 3 over unit U2 policy-plugin)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and `checker` (Sonnet). The round-3 fix was written by `builder` on Sonnet, so each reviewer lane audits work an engine other than its own wrote. Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Round 2 (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-audit-verdict.md`) passed every claim and carried the findings that the round-3 brief `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-2-brief.md` prescribes as edits 1 to 8; the fix report is `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-2-report.md`. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`.

## Review evidence

The whole U2 change including both fix rounds, as the actual diff and status: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-2.diff.txt` and `u2-fix-2.status.txt`. Read the diff in full; read the changed files at their new state where the diff is not enough. `host.json` is stale until the verifier's `build` regenerates it; do not count it.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. Every prose site the round-2 lanes named now names the right instrument: the type-probe bullet in `.claude/rules/tests.md` sends a leaked probe to the plugin's placement rules; the `Proves` cells in `.claude/rules/tests.md` and `.claude/rules/workspace.md` are bare clauses listing the sweep's laws; `.claude/rules/architecture.md` calls the manual pass "cleanup pass" at both sites and "the sweep" names only the policy sweep; each table stays aligned and each edited line wraps at 100 columns.
2. `inspectPolicyWiring` replaces every occurrence of `inspectPolicyPopulations`, its behaviour and messages are unchanged, and its controls in `tests/policy.test.ts` cover a missing rule, a missing population, and a non-record configuration; the real-configuration control and the imports it alone used are gone from that file, and `tests/config.test.ts`'s parity case still proves the real configuration.
3. `isPolicyRecord` is exported once, carries a type predicate and no assertion, has its own control, and both readers route every record test through it with each branch's behaviour unchanged.
4. `pathToPolicyRelative` strips a trailing separator from `cwd`, its TSDoc states the anchoring precondition (the workspace root under the `lint` scripts, the package directory under `RuleTester`), the unanchored fallback, and the unfolded drive-letter case, and the block wraps at the file's width.
5. The nested-folder invalid case carries the membership suffix its sibling invalid cases carry, and the `scripts/read.ts` fixture comment names the `debugger` statement as the arrival control.
6. Round 2's passing claims 1 to 12 still hold on the tree: the `cwd`-anchored equality match, the `FUNCTION_RULE` name, the architecture prose, the sweep's single construction path, the parity case calling the reader, no compiler specifier, no import in the plugin, single-homed registers, `RuleTester` pairs per rule, no skipped test.
7. Nothing outside the round-3 brief's owned files changed beyond `host.json` and the campaign folder.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
