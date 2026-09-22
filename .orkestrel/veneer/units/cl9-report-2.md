<!-- sol on gpt-6-astra, exit 0, retained 2026-09-22. Codex exec thread
01a0c701-ebc7-7bc3-80e4-2d0061554495, launched by units/cl9-2.sh, journalled at
tmp/codex/cl9-2.jsonl and swept at acceptance; the thread id is the durable handle. The fix round
round 1 forced: the shared normalizer's escaped-colon guard, the accent fallback's proof, the
shared role list, the freeze assertions, and the parked pointer. -->

CL9 brief 2's corrections are implemented within the existing owned set. HEAD remains `8c70787`. The accepted CL9 implementation and its retained evidence in `tmp/units/cl9-report.md` stand. This report covers the fix round under `tmp/units/cl9-brief-2.md`, with `tmp/units/cl9-brief.md` governing unchanged obligations. No commit, push, dependency installation, or delegation was performed.

**Escaped-colon guard and presence proof.** In `tests/setupStyles.ts`, `normalizeComplexSelector` uses the same literal-aware preceding-colon guard as its legacy pseudo-element neighbour:

```ts
if (
	top &&
	step.char === ':' &&
	!(previous?.char === ':' && !previous.literal) &&
	complex.startsWith(':nth-child(even)', step.index)
) {
	normalized += ':nth-child(2n)'
	consumed = step.index + ':nth-child(even)'.length
	continue
}
if (top && step.char === ':' && !(previous?.char === ':' && !previous.literal) && legacy)
	normalized += ':'
```

The regression case in `tests/setupStyles.test.ts` is named `matches even-child selectors after an escaped colon through the shared presence scanner`. It obtains shipped selector rows from `readCompatibility`, requires a nonempty row set, and passes this inert inventory to the real `scanCompatibilityPresence` function:

```ts
const inventory = {
	version: BOOTSTRAP_VERSION,
	digests: {},
	components: {
		table: { selectors: ['.escaped\\::nth-child(even)'], properties: [] },
	},
}
expect(
	scanCompatibilityPresence(rows, inventory, [], '.escaped\\::nth-child(2n) {}'),
).toBeUndefined()
expect(scanCompatibilityPresence(rows, inventory, [], '.escaped\\::nth-child(odd) {}')).toBe(
	'Shipped component table is missing selector .escaped\\::nth-child(even)',
)
```

The exact command ran before and after the guard edit:

```text
npm.cmd run test:setup -- "--testNamePattern=matches even-child selectors after an escaped colon"
```

Before the fix, the collected case failed at the presence assertion:

```text
AssertionError: expected 'Shipped component table is missing se…' to be undefined
Expected: undefined
Received: "Shipped component table is missing selector .escaped\\::nth-child(even)"
Test Files  1 failed | 2 skipped (3)
     Tests  1 failed | 150 skipped (151)
EXIT: 1
```

After the fix, the same command passed:

```text
Test Files  1 passed | 2 skipped (3)
     Tests  1 passed | 150 skipped (151)
EXIT: 0
```

The logs are `tmp/units/cl9-round2-guard-red.log` and `tmp/units/cl9-round2-guard-green.log`. The odd-progression assertion also proves the scanner does not accept every emitted spelling. Filtered runs skip unrelated cases; no skip was added to the suite.

**Accent fallback and mutation proof.** The existing light/dark layering case in `tests/src/styles/components/table.test.ts` sets `--bs-table-accent-bg` to `rgb(220, 210, 200)` and reads that exact inset-shadow color on the unstriped cell. The accent stays set while the case reads the distinct stripe, active, and hover colors and their precedence. The initial default-transparent assertion remains a separate reading.

The added reading is:

```ts
table.style.setProperty('--bs-table-accent-bg', 'rgb(220, 210, 200)')
expect(extractShadowLayers(readStyle(even, 'box-shadow'))).toEqual([
	{ color: 'rgb(220, 210, 200)', lengths: [0, 0, 0, 9999], inset: true },
])
```

The mutation instrument replaces only the compiled shadow chain's final `var(--bs-table-accent-bg)` fallback with `transparent`. It edits the built LTR and RTL cascades after `npm.cmd run build:src:styles`; no partial declaration is changed. These commands planted the mutation, ran the browser proof, restored the saved bytes, and repeated the proof:

```text
node tmp/units/cl9-round2-control.mjs plant
node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/table.test.ts "--testNamePattern=paints stripe, active, and hover layers"
node tmp/units/cl9-round2-control.mjs restore
node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/table.test.ts "--testNamePattern=paints stripe, active, and hover layers"
```

The mutated cascade failed the accent assertion in light and dark mode:

```text
- "color": "rgb(220, 210, 200)"
+ "color": "rgba(0, 0, 0, 0)"
Test Files  1 failed (1)
     Tests  2 failed | 38 skipped (40)
EXIT: 1
```

After byte restoration, the same browser command passed:

```text
Test Files  1 passed (1)
     Tests  2 passed | 38 skipped (40)
EXIT: 0
```

The logs are `tmp/units/cl9-round2-accent-{plant,red,restore,green}.log`. Each restored CSS file reports SHA-256 `787bdd8c0571639e85461b239780e6c2f4fd2d8ed3465ce930013ca4e53c6c90` and `BYTE MATCH true`. The mutated digest was `d62910c93e24c7f415dc191107096b6bc4aa0e95e9de5911807517db490f7999`.

**Shared role list and cascade comparison.** The table partial imports `../tokens` and loops over `tokens.$aliased`, replacing its local `$roles` declaration. The token module's `$aliased` list matches the recorded Bootstrap roles; its broader `$roles` list also contains Veneer's `tertiary` role. No rule body changed.

The comparison ran these commands around the role-list edit:

```text
npm.cmd run build:src:styles
node tmp/units/cl9-round2-control.mjs snapshot
npm.cmd run build:src:styles
node tmp/units/cl9-round2-control.mjs compare
```

Every command exited 0. The instrument compares buffers directly with `assert.deepEqual`, then reports the digest. Its comparison output was:

```text
COMPARE dist/src/styles/index.css
SHA256 787bdd8c0571639e85461b239780e6c2f4fd2d8ed3465ce930013ca4e53c6c90
BYTE MATCH true
COMPARE dist/src/styles/index.rtl.css
SHA256 787bdd8c0571639e85461b239780e6c2f4fd2d8ed3465ce930013ca4e53c6c90
BYTE MATCH true
EXIT: 0
```

No emitted byte moved. Evidence is in `tmp/units/cl9-round2-role-{before-build,snapshot,after-build,compare}.log`.

**Freeze assertions.** The existing table-family setup proof includes `TABLE_ROLE_CASES` in its container-freeze loop and asserts that each entry is frozen. It also checks the responsive rows' `readings` arrays and the geometry rows' `cell` and `row` arrays. The source tables already met these assertions.

**State release.** The stripe-token mutation case removes its active and hover classes, releases the pointer with the browser locator's `unhover` method, and restores the token in `finally`. The contextual-color loop removes the active class after each reading and releases the pointer after the hover reading. The earlier canonical-color loop and layering case also release their hover pointers. The full table command, `npm.cmd run test:src:styles -- tests/src/styles/components/table.test.ts`, exits 0 with `Test Files 1 passed (1)` and `Tests 40 passed (40)`; its log is `tmp/units/cl9-round2-table.log`.

**Unknowns resolved.** I read every branch of `normalizeComplexSelector`. The neighbouring legacy-colon branch already tests `previous.literal`; the universal-selector branch also checks literal status before treating the preceding character as syntax. Whitespace and combinator branches require the nonliteral `top` condition. The forward colon checks follow an unescaped top-level `*` or `:` directly, so an escaped colon would instead have a backslash in the checked position. No other branch has the defective preceding-colon shape, and no further file needs a guard change.

The presence proof needs no fixture file. Its inert inventory and CSS strings live in the owned `tests/setupStyles.test.ts` case beside the normalizer proofs. `tests/setupConformance.ts` and `tests/fixtures/**` were not edited. The guide rows, conformance listing, and comparison tuple retain their accepted round-1 contents.

The supplemental probe call returned `MCP tool call requires approval, but approval policy is never`. It issued no receipt. The executed Vitest controls establish the escaped-selector presence behavior and the accent fallback's resolved browser paint; no probe receipt is claimed.

**Final gate chain.** The final source passed the required ordered chain on Windows, using managed Chromium for its browser projects. The commands, exit codes, and final results are:

| Command | Exit | Final result |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` / `Finished in 841ms on 202 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | No diagnostics; `EXIT: 0` |
| `npm.cmd run check` | 0 | Final `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` completed; `EXIT: 0` |
| `npm.cmd run build` | 0 | Final app build: `✓ built in 595ms`; `EXIT: 0` |
| `npm.cmd test` | 0 | Every project in the following table passed; `EXIT: 0` |

The whole test chain reported these final result lines:

| Project | Test Files | Tests |
| --- | --- | --- |
| src:core and src:browser | `8 passed (8)` | `51 passed (51)` |
| src:styles | `55 passed (55)` | `397 passed (397)` |
| app:browser | `10 passed (10)` | `26 passed (26)` |
| journey | `4 passed (4)` | `84 passed \| 4 skipped (88)` |
| policy | `1 passed (1)` | `109 passed \| 1 skipped (110)` |
| config | `1 passed (1)` | `173 passed \| 1 skipped (174)` |
| setup | `3 passed (3)` | `151 passed (151)` |
| setup:browser | `1 passed (1)` | `33 passed (33)` |
| conformance | `1 passed (1)` | `10 passed (10)` |
| guides | `1 passed (1)` | `18 passed (18)` |

The `test:setup` command ran within that chain, including the presence regression and widened freeze assertions. Existing conditional skips retain the reasons recorded in the accepted report. Final gate logs are `tmp/units/cl9-round2-{format-check,lint-check,check,build,test}.log`; the executed chain is `tmp/units/cl9-round2-gates.sh`.

The requested Edge projects also passed:

| Command | Exit | Final result lines |
| --- | --- | --- |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files 55 passed (55)`; `Tests 397 passed (397)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | 0 | `Test Files 1 passed (1)`; `Tests 33 passed (33)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files 10 passed (10)`; `Tests 26 passed (26)` |

Edge logs are `tmp/units/cl9-round2-edge-{src-styles,setup-browser,app-browser}.log`. Formatting, lint, typechecking, and building are browser-independent gates. The build retains API Extractor's bundled-TypeScript warning; it exits 0. Browser style runs retain the dependency externalization warnings and exit 0.

**Actual diff and status.** The final `git diff --stat` output is:

```text
 app/browser/Showcase.ts            |   2 +
 app/browser/constants.ts           |  42 ++++++++
 app/browser/index.ts               |   1 +
 guides/veneer.md                   | 172 +++++++++++++++++++++-----------
 src/styles/index.scss              |   1 +
 tests/app/browser/Showcase.test.ts |   3 +
 tests/app/browser/index.test.ts    |   3 +
 tests/conformance.test.ts          |   1 +
 tests/setupConformance.test.ts     |   1 +
 tests/setupStyles.test.ts          | 153 +++++++++++++++++++++++++++-
 tests/setupStyles.ts               | 197 +++++++++++++++++++++++++++++++++++--
 11 files changed, 512 insertions(+), 64 deletions(-)
```

The final `git status --porcelain --untracked-files=all` output, including its stderr warnings, is:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/TableSection.ts
?? src/styles/components/_table.scss
?? tests/app/browser/sections/TableSection.test.ts
?? tests/src/styles/components/table.test.ts
```

Every listed path belongs to the briefs' owned set. The stat omits untracked files; the status includes them. Evidence and this report are under ignored `tmp/units/`. `git diff --check` exits 0 with no output. No required correction or gate remains open.
