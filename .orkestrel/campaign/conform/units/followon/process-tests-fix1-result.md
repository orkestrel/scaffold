## Fix round 1

**Applied.** The round-1 checker's refutation of claim 1 named three cases in `tests/src/server/processes/Process.test.ts` whose `finally` killed a held descendant but never called the primary child's own `destroy()`. Added `await child.destroy()` to each case's `finally`, keeping the existing descendant `SIGKILL` and asserting nothing inside the `finally`:

- `freezes the evidence tail at the barrier while the descendant keeps writing` (:873-909) — added `await child.destroy()`.
- `stops the stderr event and the evidence tail at the same instant` (:911-971) — added `await child.destroy()`.
- `ends an in-flight lines read when destroy resolves` (:973-1020) — `finally` previously destroyed only `control`; added `await child.destroy()`.

Every other `waitForCondition` call site in the file already sits in a case whose `finally` awaits the primary child's `destroy()`.

| Gate | Command | Exit |
| --- | --- | --- |
| `format:check` | `npm --prefix /home/user/fleet/process run format:check` | 0 |
| `lint:check` | `npm --prefix /home/user/fleet/process run lint:check` | 0 |
| `check` | `npm --prefix /home/user/fleet/process run check` | 0 |
| `build` | `npm --prefix /home/user/fleet/process run build` | 0 |
| `test` | `npm --prefix /home/user/fleet/process test` | 0 |

`cd /home/user/fleet/process && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/processes/Process.test.ts` read green in `/home/user/work/evidence/process-proofs/fix1-process-test.txt`: 58 passed, 1 skipped (59), exit 0.

`cd /home/user/fleet/process && npx scaffold audit --offline` printed its single zero-drift line:

```
0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 9.
```

Files touched: `/home/user/fleet/process/tests/src/server/processes/Process.test.ts`, `/home/user/scaffold/tmp/units/followon/process-tests-report.md`.
