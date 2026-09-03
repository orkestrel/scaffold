## 1. CONFIRMED
The report lists every unit and fleet row with `applied` or `noop` at `/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md:8-22`. The no-op conditions remain true: `ReadAllowance` at `src/server/types.ts:347-357`, no `isBrowserVuePath` in `tests/`, and no matching public `id` field in `src/`.

## 2. not held

## 3. CONFIRMED
The word-boundary sweep `\b(extractFenceImports|findMissingSymbols)\b` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md` returned no matches. The targeted case-insensitive old-form sweep over the changed guide and README sentences returned no matches. Current replacements appear at `tests/guides.test.ts:6-18,102-188`.

## 4. not held

## 5. CONFIRMED
The core and server barrels remain aligned at `src/core/index.ts:1-11` and `src/server/index.ts:1-7`. The changed Surface rows are present at `guides/scaffold.md:226-227,390-402`. Guide fences use published `@orkestrel/scaffold` specifiers; the `@src/` sweep is empty. The `AGENTS §` sweep over the required source, test, guide, and README paths is empty.

## 6. not held

## 7. CONFIRMED
The unit-scoped status contains no `package-lock.json`, `node_modules/**`, or off-limits file. `package.json:65` contains only the named script correction. `host.json` is read as Owned under the round-2 brief because `build:inventory` generates it. The changed barrels contain no compatibility alias, re-export, or shim. Campaign records and the Orchestrator's `tests/guides.test.ts` adoption are excluded from the unit subject.

## 8. not held

## 9. CONFIRMED
The unit hunks in `/home/user/work/evidence/conform-scaffold.diff:1642-2169` add no TODO, deferred row, commented-out code, or debug residue. The report's disposition table at `/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md:8-22` accounts for each unit change and no-op.

## Findings outside the claims
none

## Referrals
- Orchestrator: Will the fleet-wide `lint` drift remain a separate fleet task? The scaffold manifest is corrected at `package.json:65`, while the unit brief records differing fleet manifests.
- Orchestrator: Will the landing gate run `build` after the final `HOST_PATHS` edit so `host.json` remains generated from the shipped guide bytes? The ordering is defined at `package.json:84-90`.

VERDICT: PASS

## Journal
Leave for the driver.

## Deviation
No tree change. Every named file was readable.