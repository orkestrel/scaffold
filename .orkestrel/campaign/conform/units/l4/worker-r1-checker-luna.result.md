1. CONFIRMED — Row endpoints are present in `src/server/factories.ts:41`, `src/server/index.ts:5`, `tests/setupServer.ts:22`, `tests/guides.test.ts:203-250`, `tests/src/server/helpers.test.ts:239,275,727`, and the fixture clocks. `git status --short` lists only the reported owned files. F1 and F2 sweeps also produce no matching residue.

2. not held

3. CONFIRMED — Old-name sweeps over `README.md`, `guides/worker.md`, `guides/README.md`, `src/**/*.ts`, and `tests/**/*.ts` are empty for `spawnThread(s|ed|ing)?`, lowercase `dispatch` calls/imports, and `QueueExecution`. `Dispatch` at `src/server/Dispatch.ts:54` is the published replacement.

4. not held

5. REFUTED — Surface parity is represented at `guides/worker.md:57-115`, `src/server/index.ts:1-5`, and `tests/guides.test.ts:194-256`. However, the required `AGENTS §` sweep over touched files is non-empty: `guides/worker.md:20`, `guides/README.md:3`, `src/core/types.ts:6`, and `tests/setupServer.ts:3`. Remove those citations from touched files.

6. not held

7. CONFIRMED — `git status --short` and `git diff --name-status` contain only Owned paths. No `package-lock.json`, `node_modules`, or off-limits path appears. The only new barrel row is the intentional `Dispatch` publication at `src/server/index.ts:5`; no compatibility alias or shim is present.

8. not held

9. CONFIRMED — Added-line sweeps over the diff are empty for `TODO`, `FIXME`, `debugger`, deferred text, and commented-out code. The added `console.log` calls at `guides/worker.md:78-80` and `src/server/Dispatch.ts:50` are runnable examples, not debug residue. The diff’s 26 paths match the report’s disposition table.

Findings outside the claims

none

Referrals

- Orchestrator: Can the landing run settle claim 8’s independent gate reading? The gate chain is defined in `package.json:61-79`; this read-only lane does not hold that run.

VERDICT: FAIL 5

Journal

Left for the driver.

Deviation

No tree change. No requested file was inaccessible.