# U3 fix round 4 (micro) — the test's design was the defect

Third finding at the same seam; the Orchestrator now rules on the design. The real failure
(chain-deterministic, full block below): the run transitions pending→running within 2ms, the
manager consumes BOTH frames, and the harness's captured `published` frame is one behind — so
`expect(attached.snapshot).toEqual(published)` compares the manager's newest truth to a stale
capture. Frame-identity assertions are wrong by design against a complete-snapshot wire.

```text
AssertionError at tests/app/browser/integration/RosterManager.test.ts:64
- "status": "pending",  (captured frame)
+ "status": "running",  (manager's snapshot, updated +2ms)
```

Ruling: rewrite this test's assertions as CONVERGENCE assertions. After start: poll the manager's
snapshot until it is defined; assert executors and membership, not frame identity. After the
bearer start: poll until `snapshot.runs` contains the workflow id (any status — the wire may show
pending or running); assert the entry's stable fields (id, paused false, created <= updated).
After the stop: poll until the id is absent and appears in `departed` with its last-seen state.
Remove the `client.next()` frame-capture comparisons entirely (the harness's `next()` seam may
stay for arrival pacing, but no assertion equates a captured frame with the manager's fact).
Revert nothing else; the APP_LIMIT harness change and your earlier poll additions are superseded
by this rewrite where they overlap. No product code.

Report: the rewritten test body diff, git status --porcelain.
