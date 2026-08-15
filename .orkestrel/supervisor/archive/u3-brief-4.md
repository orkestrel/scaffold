# U3 fix round 3 (micro) — one flaky wait, Orchestrator-diagnosed

`tests/app/browser/integration/RosterManager.test.ts` ("holds and updates...") failed twice in
full-chain runs and passed solo both times. The cause is in its structure: `client.next()`'s
resolver and the manager's reactive write are two consumers of one arrival, and the test asserts
`expect(await initial).toEqual(attached.snapshot)` in the same tick — under suite load the
manager's write can land a beat later (same for the `published` comparison). Fix the wait
discipline only: after each arrival, wait on the MANAGER'S fact (the shared bounded reactive wait
from tests/setupBrowser.ts, or an equivalent bounded loop) before comparing; never assume
same-tick equality between the transport's promise and the manager's ref. No product code, no
other test. Report the diff.
