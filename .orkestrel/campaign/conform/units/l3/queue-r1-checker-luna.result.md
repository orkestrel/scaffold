1. **CONFIRMED** — The diff contains a corresponding hunk for every numbered repair; fleet-F1 and fleet-F2 have no-op evidence. Status lists only owned files: `/home/user/work/evidence/conform-queue.status:1-13`.

2. **not held**

3. **CONFIRMED** — Word-boundary and case-insensitive inflection sweeps for `QueueExecution`, `entryOf`, `memoryStore`, and `failingSaveStore` are empty across the required paths. `QueueContext` is present at `src/core/types.ts:114` and `guides/queue.md:75`. The report records the same sweep population at `conform-queue-report.md:88-98`.

4. **not held**

5. **CONFIRMED** — Surface and method parity are covered by `guides/queue.md:53-161` and `tests/guides.test.ts:70-180`; executable fences are asserted at `tests/guides.test.ts:189-220`. Published guide imports use `@orkestrel/queue` at `guides/queue.md:40,106,125,186,206`. The guide map enumerates all local mirrors at `guides/README.md:17-56`. The `AGENTS §` and numeric-section sweep is empty.

6. **not held**

7. **CONFIRMED** — `/home/user/work/evidence/conform-queue.status:1-13` lists only owned files, with no lockfile or `node_modules` entry. `src/core/index.ts:1-8` contains only normal barrel exports, and the old-symbol sweep found no compatibility alias or shim.

8. **not held** — The changed-addition sweeps found no `.skip`, `.only`, `.todo`, retry-control, or timeout-setting additions.

9. **CONFIRMED** — Added-line sweeps over `/home/user/work/evidence/conform-queue.diff:1-1809` found no TODO, deferred-work marker, debugger, console diagnostic, or commented-out executable statement. The report’s disposition entries correspond to the diff hunks.

Findings outside the claims

- **F-1** — `tests/src/core/stores/DatabaseQueueStore.test.ts:194`: replace the positional word `below` with `following`.
- **F-2** — `tests/src/core/stores/MemoryQueueStore.test.ts:12`: delete `four-method`, so the sentence reads “The cases cover the surface and its semantics.”
- **F-3** — `tests/guides.test.ts:47`: replace `the second assertion below fails` with `the internal-name assertion fails`.

Referrals

none

VERDICT: PASS

Journal

Left for the driver.

Deviation

None. No tree change occurred, and no required file was unread.