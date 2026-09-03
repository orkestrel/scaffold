## 1. CONFIRMED
Applied repairs are present in `guides/scaffold.md:16-18,225-226,388-401,1508-1514`, `README.md:10-12,72-75`, `package.json:65`, source TSDoc and sanitizer code, and the mirrored tests. `ReadAllowance` remains the documented noop at `src/server/types.ts:347-357`. Fleet-F1 has no helper in `tests/setup.ts`; fleet-F2 has no matching `id` field in `src/`.

## 2. not held

## 3. CONFIRMED
The word-boundary sweep `\b(extractFenceImports|findMissingSymbols)\b` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md` returned no matches. The case-insensitive `-s`, `-ed`, and `-ing` old-form sweep over the same documentation surfaces also returned no matches. Current replacements appear at `tests/guides.test.ts:6-18,102-188`.

## 4. not held

## 5. CONFIRMED
No source export changed; the barrels remain at `src/core/index.ts:1-11` and `src/server/index.ts:1-7`. Guide Surface and Methods tables are present at `guides/scaffold.md:223-226,388-401,429-470`. Guide fences import published specifiers, with no `@src/` imports. The `AGENTS §` sweep over `src/`, `tests/`, `guides/scaffold.md`, `guides/README.md`, and `README.md` returned no matches.

## 6. not held

## 7. REFUTED
`host.json:680-684,772-775` is modified, but the brief's Owned scope at `tmp/units/conform/conform-scaffold-brief.md:33` does not include `host.json`. The report also acknowledges this outside-scope change. No package-lock, node_modules, or off-limits file evidence was found, but the Owned-scope conjunct fails.

## 8. not held

## 9. CONFIRMED
The targeted sweep `\b(TODO|FIXME|XXX|debugger)\b` over the changed source and test files returned no matches. Existing `deferred` matches are unrelated pre-existing domain prose at `src/core/helpers.ts:230-259` and `tests/src/server/helpers.test.ts:1405,1530`. The changed additions contain no commented-out code or debug residue. The disposition table accounts for the applied and noop surfaces shown by the tree.

## Findings outside the claims
none

## Referrals
- Orchestrator: Will `host.json` be added to the unit's Owned scope or removed from this unit's diff before acceptance? The brief excludes it at `tmp/units/conform/conform-scaffold-brief.md:33`, while the tree changes it at `host.json:680-684,772-775`.

VERDICT: FAIL 7

## Journal
Leave for the driver.

## Deviation
The containment shows Orchestrator records under `.orkestrel/**`, the Orchestrator's `tests/guides.test.ts` adoption, and the unit's `host.json` change outside Owned. The brief excludes the first two from unit scope. No file could not be read.