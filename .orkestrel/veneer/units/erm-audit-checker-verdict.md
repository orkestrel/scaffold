## Verdict — ER-MECH audit, checker lane (claims 6–8)

**Claim 6 — The guide.** CONFIRMED.
- Heading order: `guides/veneer.md:10236` `## Compatibility`, `:10542` `## Hosts`, `:10584` `## Showcase`, `:10722` `## Tests` (read directly via grep on `/home/user/veneer-erm/guides/veneer.md`). Hosts sits after Compatibility and before Tests.
- `### Supported hosts` (`guides/veneer.md:10570-10577`) holds exactly the verdict's four rows (`chromium`/`linux`, `chromium`/`win32`, `msedge`/`win32`, `chrome`/`—`), each with a non-`—` Owner (`ER-LINUX`, `ER-WIN`, `ER-WIN`, `ER-CHROME`).
- `### Receipts` (`guides/veneer.md:10579-10582`) is a header row plus column-alignment row only, no data row.
- Read the added prose (`guides/veneer.md:10544-10568`) line by line: every sentence states a definition or a conditional mechanism ("when the distribution project runs in release mode… fails unless a passing receipt names…"), never an assertion that a receipt or a passing result currently exists. No sentence claims a receipt not present in the empty Receipts table or a behavior the diff's tests do not exercise.

**Claim 7 — Reuse and law.** CONFIRMED.
- `VERSION_PATTERN` imported from `@orkestrel/scaffold` in `tests/setupServer.ts` (`erm.diff:494`) and used in `readRuntime` (`erm.diff:610`) and `readReceipts` (`erm.diff:742-743`), not copied.
- `compareVersions` and `VERSION_PATTERN` imported from `@orkestrel/scaffold` in `tests/guides.test.ts` (`erm.diff:132`) and used in the floor gate (`erm.diff:204-207`).
- Export inventory: `BUILD_PATTERN`, `readReceipts`, `readRuntime`, `readSupportedHosts` all added to the `Object.keys(setup)` assertion in `tests/setupServer.test.ts` (`erm.diff:286`, `294-296`; confirmed present at `/home/user/veneer-erm/tests/setupServer.test.ts:504,579-581`). `Runtime`, `Receipt`, `SupportedHost` are type-only interfaces and correctly absent from this runtime-keys list, consistent with how `CompatibilityRow` (also type-only) is already excluded.
- Read every line of `erm.diff`: no `any`, no `as` type assertion, no non-null `!` assertion, no `@ts-ignore`/`@ts-expect-error`/`eslint-disable`, no nested `function` declarations (only arrow callbacks passed directly as arguments to `.flatMap`/`.some`/`.filter`), no new module-scope helper left undeclared — `selectSubsectionTables`, `selectTableColumns`, `readTableCells`, `describeIncompleteRow` are pre-existing imports/exports from `setupStyles.ts`, reused rather than duplicated (verified no `function selectSubsectionTables` etc. defined in `setupServer.ts`, and `selectTableColumns`/`readTableCells` already imported at `tests/setupServer.ts:41,43` before this diff's additions).
- Every added test/case title states what it proves: e.g. `'names a supported host in every receipt'`, `'holds a passing receipt for every supported host that names no owner'`, `'names no owner on a supported host that holds a passing receipt'`, `'holds every receipt at or above the package.json Node and npm floors'`, `'names a package.json script in every receipt command'`, `'holds each supported host and each receipt once'`, `'reads supported hosts only within their Hosts subsection and refuses a missing column or cell'`, `'reads receipts only within their Hosts subsection and refuses each malformed cell'`, `'reads the build the launched browser reports and the Node and platform npm reports'`, `'refuses a run no npm script launched, a user agent naming no npm version, and a remote browser'`, `'holds a passing receipt on the channel, platform, and build this run launched'` — each names the property under test, none is a control-name placeholder.

**Claim 8 — Scope.** CONFIRMED.
- `erm-status.txt` lists exactly `guides/veneer.md`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts` (all ` M`).
- `erm.diff` carries hunks for exactly the same five files (diff headers at `erm.diff:1,69,124,238,467`).
- The brief's Owned list (`er-mech-brief.md:58-59`) names exactly these five paths (`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`, and the `## Hosts` section of `guides/veneer.md`). Status and diff name the same files, and every changed path is owned.

**Findings outside the claims**: none. (Considered the `` Default: `process.env`. `` phrasing at `tests/setupServer.ts:1157` against the token-noun rule; it matches a pervasive pre-existing convention across the tree — `guides/scaffold.md:337-338`, `tests/setupService.ts:50,322`, `src/browser/types.ts:8,14,52,58,184,451,453` — so it is not a defect this diff introduces.)

**Attacked and held**: claims 6, 7, 8 as detailed above; no adjacent behavior found that resembles a defect.

VERDICT: PASS