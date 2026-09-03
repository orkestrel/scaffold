# Audit verdict: unit conform-mcp

Subject: the uncommitted unit in `/home/user/fleet/mcp` (brief `briefs/conform-mcp-brief.md` with its addendum, audit brief `briefs/conform-mcp-audit-brief.md`, fix briefs `briefs/conform-mcp-fix1-brief.md` and `conform-mcp-fix2-brief.md`, report `reports/conform-mcp-report.md`, evidence `units/conform-mcp.diff.txt` and `units/conform-mcp.status.txt`, proofs under `/home/user/work/evidence/mcp-proofs/`), implemented by a direct Opus `implementer` (`units/l3/mcp-implement-direct.md`) from the Luna-reconciled rulings, its fix rounds written by GPT-5.6 Sol through the Cursor bench.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/mcp-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/mcp-r1-checker-luna.result.md`) | FAIL 3 with F-1, F-2 |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/l3/mcp-objective-r1-sol.md`) | FAIL 3, 4, 7 with O1, O2 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l3/mcp-r2-distill-grok.result.md`) | distillate |
| 2 | checker | `checker` on Luna, run before and after fix round 2 (`units/l3/mcp-r2-checker-luna.result.md` PASS, `mcp-r2b-checker-luna.result.md` PASS) | PASS |
| 2 | objective | Sol through the Cursor bench (`units/l3/mcp-objective-r2-sol.md`) | FAIL 4 with O1, R1 |

Subjective lane: not run in the audit rounds, by the round's design. The objective lane ran on Sol; absorption on Luna in round 1 and Grok 4.6 in round 2.

Fix round 1, a Sol writer (`units/l3/mcp-fix1-sol-result.md`): the `capacity` residue rewritten to the `session` group and the test-side shim removed, the obj-5 and subj-2 proofs re-run under their red commands with a new subj-1 forwarding control, the predicate cases and their population moved to `tests/src/core/helpers.test.ts`, the `MCPSession` busy-wait replaced by `waitForDelay`, the checker's two `should` sites folded. Fix round 2, a Sol writer (`units/l3/mcp-fix2-sol-result.md`): the subj-2 control reshaped to fail by assertion (red `1 failed, 34 passed` with no timeout, green `35 passed`, same command), the guides transcription's local loopback replaced by the shared `createMemoryTransport`. No round-3 objective lane ran: round 2's one refutation and its finding were closed by adopting the lane's prescriptions with their own red and green, and the re-run checker passed on the fixed tree.

## Rulings

- Round 1, claims 3, 4, 7 and the checker's claim 3 with F-1, F-2: closed by fix round 1; confirmed by both round-2 lanes.
- Round 1 O1 (the predicate placement) and O2 (the busy-wait): closed by fix round 1.
- Round 2, claim 4 and O1: closed by fix round 2.
- The re-stage after server's landing refused on mcp's dirty manifest (`units/l3/mcp-restage-refused.log`): mcp lands on the closure it was audited against, imports no symbol server renamed, and re-stages after landing with its gates re-run as the wave's re-pin check (`ledgers/followons.md`).
- Breaking rows (`MCP_WEBSOCKET_SUBPROTOCOL` moved to core, the predicates renamed `supports*`, `MCPCompletionInterface`, the `deferral` and `producer` keys, the `session` group, `push` and `replay` without `now`): probe is the one fleet dependent and imports none of them; it re-pins at the wave.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/mcp`, recorded in `units/land-mcp.log` and `units/conform-mcp.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1's refutations closed by fix round 1, round 2's by fix round 2, the checker passing on the fixed tree), pending the deciding run at landing.
