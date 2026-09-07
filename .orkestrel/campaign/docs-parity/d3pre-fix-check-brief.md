# Checker brief — D3-pre-fix (the voice-converge fix round)

## Lane

`checker`, Sonnet, mechanical conformance over the fix round: the edits the fix brief specified landed exactly, nothing else moved beyond D3-pre's accepted diff, and the readings the report claims are what the diff shows. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fix brief: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d3pre-fix-brief.md`. The fix report: `d3pre-fix-report.md`. The round-1 verdict that ruled the findings: `d3pre-audit-verdict.md`. The evidence: `d3pre-fix.diff.txt` and `d3pre-fix.status.txt` (the whole uncommitted tree against `HEAD`, so D3-pre's accepted work and this round appear together) and, for the baseline of D3-pre alone, `d3pre-voice.diff.txt` and `d3pre-voice.status.txt`. Read the changed files under `/home/user/scaffold` at their new state where a hunk is not enough.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `tests/setupServer.ts`: the `CORE_GENERATED` and `FLEET_BIRTH_PATHS` blocks open `Lists …` with the `@remarks` reworded exactly as the fix brief's edits 1 and 2 quote, and the `_COUNT` siblings still open `Counts …`.
2. The seven blocks the fix brief's edit 3 names carry a blank ` *` separator between the first sentence and the rest, and the split matches the wording the brief quotes; no other block moved in this round.
3. Every `_PATTERN`, `_GLOB`, and `_GLOBS` constant in `configs/policy.ts` and `tests/setupPolicy.ts` opens `Matches`, and the report's site list names each one the diff changed.
4. `configs/policy.ts` `PolicyContext.cwd` opens `Names the directory …`; `frontend-design.md` carries `and so use it.`.
5. The status file lists no path outside the union of D3-pre's owned set and the fix brief's owned set; the instruments under `.orkestrel/` are untouched; `host.json` changed only by regeneration (digest values alone).
6. The report's corrections stand against the diff: five skill references moved in the inventory, and `configs/helpers.ts` grew by 9 lines.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
