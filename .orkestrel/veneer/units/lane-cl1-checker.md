<!-- workflow wf_e37cd732-c28, agent a7b6ebca404478b0b, label unknown, retained 2026-09-21 -->

## Claim table (checker lane — `[mechanical]` claims only)

**Claim 5** (scope and law) — CONFIRMED
- Status output lists exactly `guides/veneer.md`, `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` (`tmp/audit/cl1-status.txt:1-7`). No `tests/conformance.test.ts`, `src/**`, `app/**`, `tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, or vendored file (`vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`) appears. No new proof under `tests/src/styles/`.
- Law sweep over `cl1-diff.patch.txt`: no `any`, no suppression comment, no `public`/`private`/`protected`, no parameter property, no `it.skip`/`describe.skip`/`.only`, no plant residue (`PLANT`, `cl1-viewport-set`, `cl1-viewport-read`) — grep returned zero matches. Only non-`const` `as`-usage in the diff is `as setup` (import alias, not a type assertion) and one prose line; the sole type assertion is `'shipped' as const` (`cl1-diff.patch:418`).
- Helper placement/naming: `resolveOracleButton`, `pressOracleKeys`, `holdOraclePointer` are new exports in `tests/setupBrowser.ts` (veneer `tests/setupBrowser.ts:282-342`), each `{verb}{Noun}`, and each is imported and exercised in `tests/setupBrowser.test.ts` (`tests/setupBrowser.test.ts:114,116,121`). `visitBreakpoint`/`BREAKPOINT_CASES` are new exports in `tests/setupStyles.ts` (`tests/setupStyles.ts:6-35`), imported and exercised in both `tests/setupStyles.test.ts:12,60,106` and `tests/setupBrowser.test.ts:22-23`. No unexported module-scope helper or case matrix found in either touched test file.
- Export-inventory assertions equal live export sets: verified directly — `tests/setupBrowser.test.ts:101-124` matches every value export in `tests/setupBrowser.ts` exactly (interfaces excluded, as expected); `tests/setupStyles.test.ts:56-107` matches every value export in `tests/setupStyles.ts` exactly; `tests/setupConformance.test.ts:48-80` is unchanged and matches `tests/setupConformance.ts`'s value exports exactly.

**Claim 6** (the guide) — split
- Guide-sentence portion CONFIRMED: `guides/veneer.md` diff shows exactly one changed line (`cl1-diff.patch:1-10`), introducing the `### Deferred selectors` table's `Excluded` terminal-owner meaning; no other guide line changed.
- `test:guides` / `test:policy` green portion UNDECIDABLE: no gate-run evidence was supplied to this lane — only the report's own claim exists, and per the audit rule a report's quoted command/exit code evidences nothing until a lane that ran it supplies the reading. This sub-claim is not resolvable by a read-only checker; it belongs to claim 7's verifier lane.

## Probe readings

- Scope: CONFIRMED (see claim 5).
- Export inventories: CONFIRMED (see claim 5), all three sets listed above.
- `listed` in `tests/conformance.test.ts` still reads `['btn']`: CONFIRMED — `tests/conformance.test.ts:55`.
- Helper placement and names: CONFIRMED (see claim 5).
- Guide sentence: CONFIRMED (see claim 6).
- Law sweep: CONFIRMED clean (see claim 5).

## Extra findings

None. No implementation defect found within the mechanical scope reviewable by read-only inspection of the diff and live files.

**Verdict: accept**
