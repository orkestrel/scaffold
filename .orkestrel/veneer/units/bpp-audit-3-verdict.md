# Audit verdict — B-PASSIVE-PROSE (`bpp`), round 3, the second fix round (2026-09-23)

Subject: `bpp-3.diff` against `87ff1d0` in `/home/user/veneer-bpp`, `bpp-3-status.txt`, the report `b-passive-prose-report-3.md`; claims `bpp-audit-3-claims.md`; effective brief `b-passive-prose-brief-4.md`. Lanes: the objective lane on `reviewer` on Opus 5.5 (`bpp-audit-3-objective-verdict.md`), substituted for `analyst` on Astra (Codex bench dark on quota), and `checker` on Sonnet (`bpp-audit-3-checker-verdict.md`), blind. The writer was `builder` on Sonnet; the objective lane ran on an engine that did not write it. The subjective lane was not run, for the reason round 2 recorded (a doc-comment noun round over the fixed D42 vocabulary presents no subject for it).

| Claim | Objective (Opus) | Checker | Reconciled |
| --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Every tag carries its noun | BROKEN on the meaning clause: the `collectImportantNames` sentence inverts the call direction (the brief's own example wording caused it) | — | BROKEN: fixed at integration with the lane's wording ("the proofs of the {@link collectImportantNames} helper pass as the longhands each name has to cover") |
| 3 Round-2 claim 8 and the observation | CONFIRMED | UNRESOLVED on the whole-file grep | CONFIRMED: the Orchestrator's own probe `grep -n "this function" tests/setupServer.ts tests/setupStyles.ts` in the worktree returns only `tests/setupStyles.ts:31` (the `compileBreakpointRamp` remark, outside the round) |
| 4 Law and report | BROKEN: counts in the report ("One deviation"; "both real files") | — | BROKEN on the report only: the report is retained as returned with the faults on record; no code change follows |

Findings outside the claims: O1 (two `@remarks` opening with a lowercase "the" at the `attributeSelector` and `LAYER_COMPONENTS` sites) — fixed at integration ("The …"); O2 (the report's positive control planted a bare tag on the tag's own line, so it cannot distinguish a pattern blind across a comment continuation) — settled by the Orchestrator's own control: a copy of `tests/setupServer.ts` with the noun removed after `{@link collectRuleLonghands}` at line 1910, whose next word sits after the ` *   ` continuation, makes the pattern `\{@link [^}]+\}(\s*\n\s*\*)?\s*(?!(helper|constant|method|member)\b)[a-z]` print that site, while the pattern over the real files returns nothing (exit 1). The lane's referrals (the ambiguous "this helper" near `collectDeclarationReads`, orphaned line fragments from single-line reflows, comment lines past the wrap width) are prose findings and take no fix round (ROADMAP § Protocol).

Integration: `bpp-integration.py` applied the three exact edits in the worktree (captured as `bpp-integration.diff`; the whole-worktree diff as `bpp-4.diff` with `bpp-4-status.txt`); the landing checker verifies them with the § Tests patch at landing.

VERDICT: FAIL 2, 4; outside the claims: O1, O2 — claim 2 and O1 closed by the integration edit, claim 4 on the record, O2 settled by the Orchestrator's control
