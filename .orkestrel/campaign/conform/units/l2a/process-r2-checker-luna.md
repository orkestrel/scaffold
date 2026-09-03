1. CONFIRMED — Applied repairs are present in the changed source, guide, README, and test paths. Fleet no-op conditions are confirmed by clean `isBrowserVuePath` and public-`id` sweeps.

2. not held

3. CONFIRMED — No stale live paths or obsolete prose remain. Flat implementation paths appear only in the synthetic fixture at `tests/guides.test.ts:303-307`; actual files are nested under `src/server/processes/` and `tests/src/server/processes/`. Sweeps covered `src`, `tests`, `guides/process.md`, `guides/README.md`, and `README.md`.

4. not held

5. CONFIRMED — `guides/process.md:242-310` contains the required method groups and readonly Surface treatment; `guides/process.md:69-76` documents `Supervisor`; `guides/README.md:6-16` retains the source and test indexes; `tests/guides.test.ts:380-439,1298-1335` covers parity and example transcriptions. The `AGENTS §` sweep was clean.

6. not held

7. CONFIRMED — `/home/user/work/evidence/conform-process.status:1-18` lists only Owned paths. No package-lock, off-limits path, or compatibility alias appears; `src/server/index.ts:1-8` contains only direct star exports.

8. not held

9. CONFIRMED — The added-line sweeps over `/home/user/work/evidence/conform-process.diff` found no `TODO`, deferred-row, debug, console, or commented-out executable code. The status paths match the report’s touched-file table.

Findings outside the claims

- F-SUP-CLEANUP — `tests/src/server/processes/Supervisor.test.ts:52-86` and `:100-148` await condition budgets before entering cleanup. A timeout can leave the spawned engine, or its detached descendant, alive. Move those waits inside `try/finally`; retain an optional descendant PID, clean it conditionally, then always await `engine.destroy()`.

Referrals

- Orchestrator: decide whether the raw `Supervisor.stdout` stream is an intended semver surface, evidenced by `src/server/processes/Supervisor.ts:29-37` and `guides/process.md:226-233`.

Claims attacked and held

Claims 1, 3, 5, 7, and 9. Claims 2, 4, 6, and 8 were not held.

VERDICT: FAIL none; outside the claims: F-SUP-CLEANUP

Journal

Leave for the driver.

Deviation

No tree change. No named file was unreadable.