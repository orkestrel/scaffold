## Verdict — UTIL-SPACING (`usp`), round 1 checker (claims 1, 6, 8)

**Scope note.** Per the claims preamble, the `git apply --check` clause of claim 1 is an Orchestrator ruling already settled and taken as given; I did not re-run it (no execution tools). Everything else below is read directly from `/home/user/scaffold/.orkestrel/veneer/units/usp.diff`, `usp-status.txt`, `usp-shared.patch`, `b-utilities-usp-report.md`, and `b-utilities-usp-brief.md`.

### 1. Scope and delta — **CONFIRMED**

- `usp-status.txt:1-8` lists exactly the 8 owned files (`app/browser/sections/{Interaction,Spacing}Section.ts`, `src/styles/utilities/_{interaction,spacing}.scss`, `tests/app/browser/sections/{Interaction,Spacing}Section.test.ts`, `tests/src/styles/utilities/{interaction,spacing}.test.ts`) — all within the brief's Owned set (`b-utilities-usp-brief.md:99-101`).
- `usp.diff:1-933` touches exactly those same 8 files and no others.
- `usp-shared.patch` (read in full across three passes) touches exactly: `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.css`, `tests/fixtures/tailwind/{consumer,preflight}.css`, `tests/fixtures/tailwind/markup.html`, `guides/veneer.md` — every one is in the brief's Shared list (`b-utilities-usp-brief.md:103-118`), matching the report's own diffstat (`b-utilities-usp-report.md:26-32`).
- No line touches a vendored file, `tests/fixtures/oracle/**`, `src/browser/**`, `src/core/**`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `package.json`, `README.md`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, or `tests/setupServer.ts` (only `tests/setupServer.test.ts`, which is Shared, is touched).

### 6. Sections, specimens, and registries — **CONFIRMED**

- `usp.diff:19-27,47-55` — `SpacingSection`/`InteractionSection` both extend `SpecimenSection`, constructed with `SPACING_COPY`/`SPACING_SPECIMENS` and `INTERACTION_COPY`/`INTERACTION_SPECIMENS` respectively (names read from `usp-shared.patch` `app/browser/constants.ts` hunk, lines 439-539 of the first patch read): `Margin steps`, `Padding steps`, `Side margins`, `Side padding`, `Auto margins`, `Responsive spacing`; `Text selection`, `Pointer events` — matching the brief (`b-utilities-usp-brief.md:170`).
- No specimen markup carries a `style=` attribute (verified directly in the constants.ts hunk); both section tests assert `region.querySelector('[style]')).toBeNull()` (`usp.diff:187,322`) — a real executed assertion, not a presence check. I sampled the specimen class names (`card`, `vstack`, `gap-2`, `ratio-4x3`, `d-flex`, `container-fluid`, `row-cols-2`, `w-50`) against classes already used elsewhere in the codebase's shipped utilities; I did not cross-check every one against the oracle inventory directly, so this sub-point rests on a sample.
- Section proofs derive populations from setup tables, not restated literals: `usp.diff:288-306,346-356` use `SPACING_SIDE_CASES`/`SPACING_STEP_CASES` by iteration.
- Construction order: `usp.diff:562-568` — `VisibilitySection`, `SpacingSection`, `InteractionSection`, `NavbarSection`, matching barrel order in `usp-shared.patch` (`app/browser/index.ts` hunk) and `Showcase.test.ts` region-name array (`'Visibility', 'Spacing', 'Interaction', 'Navbar'`).
- `CASCADE_KEYS` rows (`usp-shared.patch` `tests/setup.ts` hunk) read computed-style-readable properties: `margin-top`, `padding-top`, `margin-left`, `padding-left`, `user-select`, `pointer-events` — all legitimate.
- `tests/conformance.test.ts` and `tests/setupServer.test.ts` `listed`/dash-proof additions match the unit's key set (`m, mx, my, mt, me, mb, ms, p, px, py, pt, pe, pb, ps, user-select`) exactly, and `entryPaths` maps each to `utilities/spacing` or `utilities/interaction` consistently.
- `SPACING_STEP_CASES`, `SPACING_PROPERTY_CASES`, `SPACING_SIDE_CASES`, `USER_SELECT_VALUES`, `POINTER_EVENTS_VALUES` are all `Object.freeze`d and exported (`usp-shared.patch` `tests/setupStyles.ts` hunk lines 135-183), and bound to the inventory by a derivation test in `tests/setupStyles.test.ts` that reads inventory keys by grammar (`/^[mp][xytebs]?$/u`) rather than restating a literal list.

### 8. Law and report — **CONFIRMED**

- No `any`, no non-const-assertion `as` (only `['rest','density','retune'] as const` found, a permitted const assertion), no `!` non-null assertion (`requireValue` used throughout instead), no `@ts-ignore`/`@ts-expect-error`/`eslint-disable`, no mock/spy/fake — verified by direct reading of `usp.diff` in full and the relevant `usp-shared.patch` hunks.
- No nested named function declarations: every function inside the owned/shared diffs is either a class method or an anonymous callback passed directly (`.map`, `.filter`, `.flatMap`, `visitBreakpoint(width, () => ...)`), satisfying the sole exception.
- No new helper duplicates an installed `@orkestrel/test`/`@orkestrel/contract` export: the diff imports and uses `requireValue`, `build`, `mount`, `readHit`, `readPixels`, `readStyle`, `driveHold`, `releasePointer`, `traverseAccessible`, `findRule`, `visitBreakpoint` from those packages without re-implementing any of them.
- Added TSDoc/comments follow the token-noun rule (every backticked token I read is followed by a noun, e.g. "the `value` field", "the `pe` class", "the `auto` step") and no banned term from `.claude/rules/writing.md` was found in the sampled guide/TSDoc prose.

**Outside the claims (for the record, per claim 8's own requirement to list every count the report states):** `b-utilities-usp-report.md` states numerous numeric values: 22/18/8/267/19 "passed" counts across gates; "94 files, 1081 passed"; "42 files, 120 passed"; "109 passed and 1 skipped"; "551 selectors"/"551" cascade/"710 declarations"; "91 names"; "2 failed, 16 passed" and "1 failed" negative controls; "546 rows"/"540 of these rows"/"6 rows" ledger counts; per-file line counts (41, 11, 237, 198, 22, 21, 242, 112); diffstat line deltas; "1638 lines" and a SHA-256 digest for the patch. These are run-measurement values (`AGENTS.md` § Writing's "measurement reported with the run that produced it" exception) rather than editorial counts of a growing population, so I do not rule them a writing-law violation, but they are named here as the required listing.

## Attacked and held

- Whether the shared-file set matches the brief's Shared list exactly (attacked by comparing every file name in `usp-shared.patch` against `b-utilities-usp-brief.md:103-118`; held).
- Whether the owned/shared diff introduces `any`, `as`, `!`, or a nested named function (attacked by reading every hunk of `usp.diff`; held, only one const assertion found).

VERDICT: FAIL none; outside the claims: usp-report-count-listing (informational only, not a substantiated defect)
