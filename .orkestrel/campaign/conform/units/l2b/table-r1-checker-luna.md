I’m applying the brief’s checker lane: claims 1, 3, 5, 7, and 9 only. I will use the tree and independent read-only sweeps; the writer’s report will not establish a verdict.## Claims

1. **CONFIRMED** — The tree contains the applied row changes, leaves `table-subj-2` unchanged with its deviation evidence, and has clean `fleet-F1` and `fleet-F2` sweeps. Evidence: `tests/src/core/Table.test.ts:1-68`, `src/core/tables/RowManager.ts:138-145`, `src/core/tables/PaginationManager.ts:68-76`, `guides/table.md:1355-1358`, and the supplied failed probes.

2. **not held**

3. **CONFIRMED** — Case-insensitive `should(s|ed|ing)?\b` sweeps returned no matches across `src`, `tests`, `guides/table.md`, `guides/README.md`, and `README.md`. The old tally-form boundary sweep and the whole-checkout `isBrowserVuePath` sweep excluding `node_modules` also returned no matches.

4. **not held**

5. **CONFIRMED** — `src/core/index.ts:1-9` and `guides/table.md:69-241` retain matching public surfaces. Method tables at `guides/table.md:1212-1288` match the interfaces, with readonly data documented in the Surface section. Parity checks remain at `tests/guides.test.ts:131-223`; guide fences use `@orkestrel/table`. No `AGENTS §` citation remains.

6. **not held**

7. **CONFIRMED** — `conform-table.status:1-10` lists only files under Owned. The actual diff contains no package-lock, node_modules, off-limits, compatibility-alias, compatibility-re-export, or shim change.

8. **not held**

9. **CONFIRMED** — The added-line sweep over `conform-table.diff` returned no `TODO`, deferred, debug, skipped, only, retry, timeout, or commented-code residue. The disposition-to-diff comparison accounts for every applied row and shows no hunk for the stopped or noop rows.

## Findings outside the claims

none

## Referrals

- **Orchestrator:** Rule whether `table-subj-2` remains stopped. `src/core/Table.ts:65-76` rethrows `cloneSchema` errors, and `tests/src/core/Table.test.ts:92-115` contains an alternating-read proof with the expected message at line 114; the supplied deep-vector probe fails at `table-subj-2-deep-vector.txt:15-16`, while `guides/table.md:1298` retains the disputed wording.

## Claims attacked and held

Claims 1, 3, 5, 7, and 9 were attacked through direct tree comparison, boundary and inflection sweeps, barrel-to-guide comparison, status/diff scope checks, and added-line residue checks. No held claim was refuted.

VERDICT: PASS

## Journal

left for driver

## Deviation

None. No tree changes were made, and no required file was unreadable.