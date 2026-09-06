# Check brief — U2-fix-3 (round 4 over unit U2 policy-plugin: the Orchestrator's integration edit)

`checker`, Sonnet, a fresh context. Read only this brief and the evidence it names; run no command; edit nothing. Perform the assignment directly and spawn nothing.

## Subject

The Orchestrator applied four one-line edits the round-3 lanes prescribed verbatim, briefed in `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-3-brief.md`, reported in `u2-fix-3-report.md`. Round 3's verdict is `u2-fix-2-audit-verdict.md`. The whole U2 change as it now stands: `u2-fix-3.diff.txt` and `u2-fix-3.status.txt` in the same folder. `host.json` is stale until the verifier's `build`; do not count it.

## Claims

1. `tests/config.test.ts`: the fixture comment reads "the following absence assertion reads" and no `below` or `above` pointer remains in the lines this unit touched.
2. `tests/setupPolicy.ts`: `inspectPolicyConfiguration` tests `overrideRules` with `!isPolicyRecord(overrideRules)` alone, and the manifest reader tests `manifest` and `record` through `isPolicyRecord`; no inline `typeof x !== 'object' || x === null || Array.isArray(x)` test remains anywhere in the file.
3. `configs/policy.ts`: the `pathToPolicyRelative` block states the root-directory prefix sentence and still wraps within 100 columns.
4. Nothing outside `tests/config.test.ts`, `tests/setupPolicy.ts`, and `configs/policy.ts` changed between `u2-fix-2.diff.txt` and `u2-fix-3.diff.txt`.
5. Round 3's passing claims 1 to 7 still hold on this tree.

## Output

Per claim, the verdict (PASS, FAIL with `file:line`, or CANNOT RULE) and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`. No process diary; state no count in a sentence.
