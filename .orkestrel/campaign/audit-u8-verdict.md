1. **CONFIRMED** — `#waiting` stores the shared promise; native exit and `#kill` call the same idempotent `#wait` method (`src/server/Process.ts:97`, `src/server/Process.ts:388`, `src/server/Process.ts:397`, `src/server/Process.ts:496`). `#settle` owns no close timer (`src/server/Process.ts:404`). The fix diff removes `#cutoff`, `#cut`, and the fresh `waitForClose` call (`tmp/audit-u8.diff:6`, `tmp/audit-u8.diff:16`, `tmp/audit-u8.diff:39`). The helper remains at `src/server/helpers.ts:699`.

2. **BROKEN** — The host-owned run is recorded at `tmp/audit-u8-brief.md:24`. It refutes a second full `drain` interval, but not every timing difference. In the unfixed path, `#kill` awaited a separate close listener (`tmp/audit-u8.diff:39`). That listener resolves only when host `close` arrives or its own deadline expires (`src/server/helpers.ts:703`). The original cutoff settles public state and destroys the read ends before host `close` is delivered (`src/server/Process.ts:414`, `src/server/Process.ts:418`). Event-loop work between destruction and host `close` therefore delays the unfixed `stop`, while the fixed shared promise has already settled. Narrow the ruling to “no second full drain interval”; do not claim behavioral timing identity. No removed latency pin remains in the test suite.

3. **CONFIRMED** — The preamble and row comment describe latch, resolution, delivery, and finality only (`tests/src/server/Process.test.ts:1247`, `tests/src/server/Process.test.ts:1284`, `tests/src/server/Process.test.ts:1288`). The host-close timing language was removed by `tmp/audit-u8.diff:81` and `tmp/audit-u8.diff:87`. The source comment discusses listener registration order, not arrival latency (`src/server/Process.ts:393`).

4. **BROKEN** — The paragraph names native exit and initiated termination, but then says “a child still running never meets” the bound (`guides/process.md:294`). The detailed section says an unconfirmed termination can reach the cutoff while the child remains running (`guides/process.md:382`), as does the contract (`src/core/types.ts:130`). Replace the false clause with: “The cutoff ends observation; it does not terminate the child.”

5. **CONFIRMED** — The `lines` remark defines loss against the terminal moment and records the trailing-partial exception (`src/core/types.ts:222`). `PROCESS_DRAIN` names native exit and initiated termination as arming conditions (`src/core/constants.ts:7`) and retains the dated measurements (`src/core/constants.ts:11`).

6. **BROKEN** — The implementation retains the settled guards (`src/server/Process.ts:379`, `src/server/Process.ts:388`), terminal-value ordering (`src/server/Process.ts:408`), native-exit arming (`src/server/Process.ts:157`), and the sole production `waitForClose` call (`src/server/Process.ts:398`). The hazard assertions remain (`tests/src/server/Process.test.ts:1282`). However, the changed guide clause at `guides/process.md:296` contradicts `guides/process.md:384` and `src/core/types.ts:132`, which falsifies the claim’s no-contradiction requirement.

## Findings outside the claims

None.

VERDICT: FAIL - 3 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims