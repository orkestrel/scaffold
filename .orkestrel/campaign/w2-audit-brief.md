# Audit W2 — the process-helper family, setup project, wait conversions (probe)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim;
CONFIRMED needs evidence, BROKEN needs the failing reading and the smallest fix. Terminal
line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline f501f99,
writer GPT-5.6 Sol). The tracked diff is at `/home/user/scaffold/tmp/units/w2.diff`; the NEW
UNTRACKED files `tests/setup.test.ts` and `tests/setupServer.test.ts` are also the unit's —
read them directly. The writer's report is `/home/user/scaffold/tmp/codex/w2-last.md`; the
ruling is `/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` ruling 11 with the
site map in `.orkestrel/campaign/g-probe-tests.md`. Supplied host evidence
(Orchestrator-run, authoritative): `test:setup` complete and green, `test:config` complete
and green, `test:src:server` complete and green, `test:src:bin` complete and green.

## Claims

1. The family moved whole: `readFixtureServer`, `waitForFixtureServer`, `killFixtureServer`,
   `isProcessLive`, `readSignalEnding` are exported from `tests/setupServer.ts` with no copy
   left behind, `readHostEnding` and `readInputRefusal` stay local, and every consumer
   imports the moved helpers.
2. The setup project registered per the vendored proof's demands (the `setup` factory in
   `vite.config.ts`, `test:setup` in `package.json`, the `test` chain invoking it) and the
   config proof passes complete — the writer's note that the release wave re-checks this
   scaffold-owned region is recorded.
3. The wait conversions match the map: every class (a) poll site converted to
   `waitForCondition` (verify the conversion list against the map), every class (b) settling
   wait retained, every unmatched site retained. No conversion changed what a test proves.
4. The new setup proofs are real: `tests/setup.test.ts` covers `WORKSPACE_ROOT`;
   `tests/setupServer.test.ts` covers live and dead process readings, the fixture-server
   pair, and signal endings — with real children, no mocks.
5. The red-first record binds (the missing exports produced the recorded red), and the diff
   obeys the repository laws in its reach (no `any`, no assertions, helper TSDoc forms,
   off-limits files untouched: `tests/config.test.ts`, `tests/policy.test.ts`,
   `tests/setupPolicy.ts`, `src/**`, guides).

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
