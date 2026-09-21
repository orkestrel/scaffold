<!-- workflow wf_6d2440af-6b2, agent a80538d16da058768, label checker:mechanical (checker on sonnet), retained 2026-09-21 -->

All four findings verified as closed in the tree. I now have sufficient evidence for all claims.

**Verdict**

## Claim table

1. **CONFIRMED** — `resolveOracleButton` renamed to `readOracleButton` in `tests/setupBrowser.ts:303`; callers updated at the key-press helper (`tests/setupBrowser.ts:318`, `pressOracleKeys`) and the pointer-hold helper (`tests/setupBrowser.ts:335`, `holdOraclePointer`), plus `ORACLE_ACTIONS` drive rows (`tests/setupBrowser.ts:255,260,275,287,292`); import and export-inventory assertion updated in `tests/setupBrowser.test.ts:43,123`; cases updated at `tests/setupBrowser.test.ts:405,408`. `resolveOracleButton` occurs nowhere in the tree (`Grep` over `C:/Users/mikes/WebstormProjects/veneer`: no matches).

2. **CONFIRMED** — `visitBreakpoint` lives in `tests/setupBrowser.ts:38-46` over the static `import { page, userEvent } from 'vitest/browser'` at `tests/setupBrowser.ts:22`; no dynamic `import('vitest/browser')` remains (the file's only dynamic imports, lines 74-76, load `.scss`/showcase modules, unrelated). `tests/setupStyles.ts` imports nothing from `vitest/browser` and reads no `window` (`Grep` returns no matches); `BREAKPOINT_CASES` stays frozen at `tests/setupStyles.ts:6-13`. The browser proof imports the helper from `./setupBrowser.js` (`tests/setupBrowser.test.ts:45`) and the table from `./setupStyles.js` (`tests/setupBrowser.test.ts:21`). The styles export inventory (`tests/setupStyles.test.ts:56-106`) no longer lists `visitBreakpoint`; the browser inventory (`tests/setupBrowser.test.ts:103-127`) does. The styles proof's title at `tests/setupStyles.test.ts:54` ("and nothing the document has to answer") holds. Restoration cases (sync failure, async failure that resizes, nested visit, following-case-at-original-size) present at `tests/setupBrowser.test.ts:59-104`.

3. **CONFIRMED** — `holdOraclePointer` (`tests/setupBrowser.ts:332-367`) wraps `releasePointer()` in its own `try`/`catch` (lines 359-366); on a plain pressed-state failure it re-throws the original `error` object; on a release rejection it throws `new Error(error.message, { cause })`, matching the installed `holdAccessible` verb's shape at `node_modules/@orkestrel/test/dist/src/browser/index.js:599-606`. The regression `tests/setupBrowser.test.ts:253-285` proves the cause surfaces on a real protocol rejection (`message: 'Interactive target "Toggle" did not enter the pressed state'`, `cause.message` matching the protocol error).

4. **CONFIRMED** — No control-named test datum remains: `tests/setupBrowser.test.ts:75` uses `'Breakpoint viewport reading failure'` (named for the reading); `tests/setupConformance.test.ts:389` uses `.unreachable-selector` (round 1 had `.cl1-outside` at the same site, confirmed by `cl1-diff.patch.txt:389`), and the matching expectation at `tests/setupConformance.test.ts:467` reads `'Excluded name .unreachable-selector is outside the official inventory'`. Both sites' assertions are updated consistently.

5. **[mechanical] CONFIRMED**, gate portion **UNRESOLVED** — Scope: `tmp/audit/cl1-status-2.txt` lists exactly `guides/veneer.md`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` (brief 1's seven files); `src/**`, `app/**`, `tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from both the status and the diff; no new file under `tests/src/styles/` (`Grep` for `diff --git a/tests/src/styles` returns none). Diff comparison against round 1 (`cl1-diff.patch.txt`) confirms `guides/veneer.md` and `tests/setupConformance.ts` carry byte-identical hunks in both rounds, and `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupConformance.test.ts` differ — exactly the claimed set. Export inventories for all three setup modules equal their live export sets (verified above). `listed` at `tests/conformance.test.ts:55` reads `['btn']`. Law sweep over `cl1-diff-2.patch.txt`: no `any`, no assertion outside `as const` (one pre-existing context-line `as const`, not new), no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no skipped case other than `it.runIf` (none present), no case named for a control, no `PLANT` residue. Round-1 confirmations (exclusion scanner at `tests/setupConformance.test.ts:439-471`, property-free admission at `tests/setupConformance.test.ts:473-490`, root-scoped drive via `ORACLE_ACTIONS` `drive(root)` signatures, breakpoint table `BREAKPOINT_CASES`) are undisturbed. The "2 records exit 0 on managed Chromium and Edge" and the verifier-lane reading rest solely on `.orkestrel/veneer/units/cl1-report-2.md`'s self-reported command output — per instruction, a writer's report is not evidence a checker can confirm from; that sub-clause is UNRESOLVED pending the independent verifier run the claim itself assigns.

## Extra findings

None. No additional implementation defect found: `holdOraclePointer`'s scroll/reachability logic, `collectShippedComponents`'s property-free branch, and `scanCompatibilityPresence`'s Excluded-owner branch were traced against their new test cases and each traced value matches the asserted expectation.

## Probe readings

- Scope: confirmed (files above).
- Export inventories: confirmed equal for `setupBrowser.ts`/`.test.ts`, `setupStyles.ts`/`.test.ts`, `setupConformance.ts`/`.test.ts`.
- `listed` in `tests/conformance.test.ts:55` reads `['btn']`: confirmed.
- Helper placement/names: `visitBreakpoint`, `readOracleButton`, `pressOracleKeys`, `holdOraclePointer`, `collectShippedComponents`, `scanCompatibilityPresence`, `readDeferrals` are all `{verb}{Noun}`, each exported from and cased in its host module's proof; no unexported module-scope helper found in touched test files.
- Guide sentence: one line changed in `guides/veneer.md`, confirmed by diff; no other guide line changed.
- Law sweep: clean, per claim 5 above.

Verdict: accept
