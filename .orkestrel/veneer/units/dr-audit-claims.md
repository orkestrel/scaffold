# Audit claims — RESIDUE (`dr`), round 1

Subject: `dr.diff` and `dr-status.txt` (the worktree `/home/user/veneer-dr` against `fb0516d`), the
report `b-cross-dr-report.md`, and the logs under `dr-instruments/` (`dr-red.log.txt`,
`dr-green.log.txt`, `dr-gate.log.txt`, `dr-format.log.txt`, `dr-lint.log.txt`, `dr-check.log.txt`),
against the brief `b-cross-dr-brief.md` and the ruling X9 in
`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md`. The unit was written by `builder` on
Sonnet. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence, and
before confirming a claim about a proof names the mutation that would make the proof fail and whether
its assertion distinguishes it.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: RESIDUE runs
ahead of the rest of B-CROSS because it depends on no family landing (an order change, not a scope
change).

1. **Scope.** `dr-status.txt` and `dr.diff` touch `tests/fixtures/oracle/inventory.json` (the `digests`
   object only) and `tests/setupServer.test.ts` (the named pin case only), and nothing else.
2. **The digest.** `inventory.json` carries no `bootstrap.rtl.css` entry, stays valid JSON, and no file
   under `tests/`, `src/`, `app/`, or `guides/` reads that key.
3. **The pin.** The pin case asserts that `Object.keys(inventory.digests)` equals `['bootstrap.css']`;
   the retained red run (`dr-red.log.txt`) fails that case with the RTL entry present, and its
   assertion distinguishes a restored RTL entry, and any other added digest, from the passing case.
4. **Gates and report.** The retained logs read the setup project's `tests/setupServer.test.ts` run,
   `format:check`, `lint:check`, and `check` exit 0; the report writes each command as it ran with its
   result line and follows the writing rule; the lane lists every count the report states, for the
   record.
