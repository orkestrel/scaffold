## Claims

1. **CONFIRMED** — The tree contains the applied/noop states at `src/core/helpers.ts:421`, `src/browser/Navigator.ts:57-170`, `tests/guides.test.ts:190-315`, and `tests/setup.ts:1-40`. The `isBrowserVuePath` sweep is empty; F2 finds no class `readonly id` field.

2. not held

3. **CONFIRMED** — Identifier sweeps over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md` find no old `route` export/call, `TypeError`, `hashListener`, or `popListener`. Remaining `route` at `src/core/DispatchGroup.ts:41` is a local binding; remaining `reason` hits are ordinary prose or `AbortSignal.reason`.

4. not held

5. **CONFIRMED** — Method tables match interfaces at `src/core/types.ts:342-372`, `:574-605`, and `src/browser/types.ts:119-127`, with guide tables at `guides/router.md:180-238`. Published subpaths are mapped at `tests/guides.test.ts:41-47`; fences use published specifiers. The `AGENTS\s*§|§\s*[0-9]+` sweep over all named paths is empty.

6. not held

7. **CONFIRMED** — `git status --short` and `git diff --name-only` list only paths permitted by the Owned row. Sweeps restricted to `package-lock.json`, `node_modules`, and off-limits paths are empty. The barrels remain star exports only; no compatibility alias or shim is present.

8. not held

9. **CONFIRMED** — Added-line sweeps for TODO, deferred work, commented executable code, debug markers, skips, retries, and fixed timers are clean. The only intentional added `console.log` is the documented fence at `guides/router.md:457`; `src/core/types.ts:13` is prose, not commented-out code. The report’s integration section records the `tests/setup.test.ts` patch represented in the diff.

## Findings outside the claims

none

## Referrals

- Orchestrator: Will landing apply the recorded scaffold baseline repair for stale `configs/browsers.ts`? The file is off-limits and unchanged.
- Orchestrator: Will a successor prose unit resolve the U1/U3/U6 citations at `src/core/types.ts:214`, `src/core/constants.ts:63`, `:78`, `:94`, and `tests/src/core/Dispatcher.test.ts:15`, `:20`?
- Orchestrator: Will the successor prose unit replace the growable-set phrase “three faces” at `tests/guides.test.ts:38` with the named core, browser, and server faces?
- Orchestrator: Will landing run the independent gate chain that claim 8 reserves for acceptance?

## Claims attacked and held

Held: claims 1, 3, 5, 7, and 9.  
Claims 2, 4, 6, and 8 are not held.

VERDICT: PASS

## Journal

Leave for the driver.

## Deviation

No tree change observed. No brief-named file was unreadable. All required sweeps ran.