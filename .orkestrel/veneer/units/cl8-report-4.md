<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c62c-e030-7cc3-821a-d0157e9388c0, launched by units/cl8-4.sh, journalled at tmp/codex/cl8-4.jsonl
and swept at acceptance; the thread id is the durable handle. The fix round round 1 forced: the
emitted-vocabulary proof retained with controls in both directions, the readings assertion made
falsifiable, and the three non-forcing findings closed. -->

CL8 brief 4 is implemented. The required controls fail at their named assertions and pass after restoration. The full gate chain passes on managed Chromium, and the required Edge projects pass. The work remains uncommitted at HEAD `a9172df`; final acceptance belongs to the Orchestrator.

The emitted-vocabulary proof lives in `tests/setupStyles.test.ts`, beside the grid table bindings. Its exported collector, `collectGridVocabulary`, lives in `tests/setupStyles.ts`. The assertion reads `dist/src/styles/index.css` through the existing `readBuiltCascade` function. Its independent expected operand comes from the pinned inventory's selector and condition fields, minus the guide's actual deferrals. The retained assertion is:

```ts
it('binds the built grid selector and media-condition multiset to the inventory minus deferrals', () => {
	const deferred = new Set(readDeferrals().map(({ name }) => name))
	const recorded = (['row', 'col', 'offset'] as const)
		.flatMap((key) => {
			const component = oracle.components[key]
			return component.selectors
				.filter(({ selector }) => !deferred.has(selector))
				.map((entry) => {
					const rule = `${entry.selector} {}`
					return 'condition' in entry ? `${entry.condition} { ${rule} }` : rule
				})
		})
		.join('\n')
	expect(collectGridVocabulary(readBuiltCascade())).toEqual(collectGridVocabulary(recorded))
})
```

The collector retains duplicate selector/condition pairs, normalizes selector spacing through the existing `normalizeComplexSelector` function, and equates minimum-width notation with its range spelling. It retains enclosing media conditions in order. Its population includes grid-prefix selectors, including withheld families. It never reads declaration values. Literal collector expectations cover normalization, nested media ancestry, duplicate rules, withheld names, and exclusion of a container selector.

The placement Unknown is closed within scope. The setup proof tests its sibling collector against the real cascade and inventory, alongside the existing grid bindings. The conformance proof establishes guide listing and presence; its inventory projection drops conditions. This comparison requires neither a change to that projection nor an edit to `tests/setupConformance.ts`.

The duplication Unknown is also closed. `scanStyleBlocks` reads authored SCSS declaration blocks without expanding includes; it does not read the built cascade. Its subject and traversal differ from this PostCSS selector/media comparison. The shared built-file read and selector normalization already have reusable implementations, which this proof imports. No duplicate file loader or selector parser was added.

The emission controls ran through `tmp/units/cl8-run-controls-4.sh`. Each artifact control first ran `npm.cmd run build:src:styles`, exiting `0`. The plant and restoration instrument is `tmp/units/cl8-controls-4.mjs`; the combined record is `tmp/units/cl8-controls-4.log`.

For the missing-selector control, the instrument removed `.col-md-1` from the built cascade, including its rule when no other selector remained. It left the inventory and case tables unchanged. The exact failing and restored command was:

```text
npm.cmd run test:setup -- tests/setupStyles.test.ts -t 'binds the built grid selector'
```

The failing output in `tmp/units/cl8-missing-red-4.log` identifies the missing selector at its recorded condition:

```text
FAIL |setup| tests/setupStyles.test.ts > styles setup > binds the built grid selector and media-condition multiset to the inventory minus deferrals
- Expected
+ Received
-   "[\".col-md-1\",[\"(width>=768px)\"]]",

Test Files  1 failed (1)
     Tests  1 failed | 84 skipped (85)
EXIT_CODE=1
```

For the extra-selector control, the instrument appended `.offset-12 { margin-inline-start: 100% }` to the built cascade. That selector is outside the recorded offset vocabulary. The same command failed; `tmp/units/cl8-extra-red-4.log` records:

```text
FAIL |setup| tests/setupStyles.test.ts > styles setup > binds the built grid selector and media-condition multiset to the inventory minus deferrals
- Expected
+ Received
+   "[\".offset-12\",[]]",

Test Files  1 failed (1)
     Tests  1 failed | 84 skipped (85)
EXIT_CODE=1
```

After each plant, the instrument verified that the file still matched the planted bytes, restored its saved original bytes, and asserted byte equality. The same test command then returned this output, retained separately in `cl8-missing-green-4.log` and `cl8-extra-green-4.log` under `tmp/units/`:

```text
Test Files  1 passed (1)
     Tests  1 passed | 84 skipped (85)
EXIT_CODE=0
```

The original, restored, and final built cascade share this SHA-256 digest:

```text
8fedc7d988febfafd9b0ff05b300a8709f7acf385ec0e62363cc8dfb38950a97
```

Finding 2 is closed by literal viewport rows. The expectation no longer derives the readings using the construction's arithmetic:

```ts
expect(GRID_BREAKPOINT_CASES.map(({ boundary, readings }) => [boundary, ...readings])).toEqual([
	[0, 375, 1401],
	[576, 575, 576, 577],
	[768, 767, 768, 769],
	[992, 991, 992, 993],
	[1200, 1199, 1200, 1201],
	[1400, 1399, 1400, 1401],
])
```

The control narrowed the construction in `tests/setupStyles.ts` from `[boundary - 1, boundary, boundary + 1]` to `[boundary, boundary + 1]`, leaving the zero-boundary readings intact. The failing and restored command was:

```text
npm.cmd run test:setup -- tests/setupStyles.test.ts -t 'pins the grid viewport readings'
```

The failure in `tmp/units/cl8-readings-red-4.log` was the literal-readings assertion. Its diff removed the expected `575`, `767`, `991`, `1199`, and `1399` readings:

```text
FAIL |setup| tests/setupStyles.test.ts > styles setup > pins the grid viewport readings on each side of every breakpoint
AssertionError: expected [ [ +0, 375, 1401 ], …(5) ] to deeply equal [ [ +0, 375, 1401 ], …(5) ]

Test Files  1 failed (1)
     Tests  1 failed | 84 skipped (85)
EXIT_CODE=1
```

The instrument restored the saved bytes, and `tmp/units/cl8-readings-green-4.log` records:

```text
Test Files  1 passed (1)
     Tests  1 passed | 84 skipped (85)
EXIT_CODE=0
```

The original, restored, and final `tests/setupStyles.ts` share this SHA-256 digest:

```text
3326a1bdf5c0a79229e427fc54c49899e36b10b5715e48cd1e1c8358e70d942c
```

The filtered control runs account for their skipped cases. The complete setup project subsequently passed without those filters. The probe MCP was unavailable as the brief anticipated; these executed mutation controls are the evidence, with no probe receipt claimed.

The remaining findings are closed as follows:

- Finding 3: the browser consumers identify the unconditioned variant with `boundary === 0`, matching the generated-vocabulary consumer. The grid binding compares the complete zero-boundary name array with the compiled ramp's own zero keys: `expect(GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary === 0).map(({ name }) => name)).toEqual(ramp.zero)`. An additional zero-boundary table row changes that array rather than disappearing into a filtered-out population or a set.
- Finding 4: `compileBreakpointRamp` owns the Sass source, load paths, compilation, and parsed boundaries. It returns the non-zero members in `members` and the zero keys in `zero`, allowing the zero binding without another compilation implementation. The grid and container cases call it, and the exports assertion names it. Sass loads dynamically when the Node proof calls the helper.
- Finding 5: the showcase assertion uses `[data-specimen]:not([data-specimen="Navigation containers"]) .${name}`. Appending specimens no longer changes which specimen it excludes.

The accepted partial, extraction, guide rows, deferrals, and conformance listing were not edited in this round. The partial retains its earlier restoration digest, `d315484bd133235d5e0d27ef5b83d5090f68e526f8d8f53eb56b62e20b3f9433`. The precision ruling remains resolved: this proof compares selectors and conditions; browser assertions keep their existing tolerances, and the partial's arithmetic is unchanged.

The prior closed findings remain recorded in `tmp/units/cl8-report-3.md`: `npm.cmd run test:conformance` caught the blank line that disconnected the grid deferrals from their table, and `npm.cmd test` at the journey census caught the unshipped `border` and `p-2` specimen classes. Their fixes remain in place. Conformance and journeys pass in this run.

The gate commands ran on Windows on 2026-09-21 through Git Bash and `npm.cmd`. `tmp/units/cl8-run-gates-4.sh` runs the ordered chain, and `tmp/units/cl8-gate-4.sh` records each command's exit status before reading its log. Log paths in the following table are relative to `tmp/units/`.

| Command | Exit | Final result lines | Log |
| --- | --- | --- | --- |
| `npm.cmd run format:check` | `0` | `All matched files use the correct format.` | `cl8-format-4.log` |
| `npm.cmd run lint:check` | `0` | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics | `cl8-lint-4.log` |
| `npm.cmd run check` | `0` | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics | `cl8-check-4.log` |
| `npm.cmd run build` | `0` | `✓ built in 555ms` | `cl8-build-4.log` |
| `npm.cmd test` | `0` | Ends after guides: `Test Files 1 passed (1)`; `Tests 18 passed (18)` | `cl8-test-4.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | `0` | `Test Files 53 passed (53)`; `Tests 349 passed (349)` | `cl8-edge-styles-4.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | `0` | `Test Files 1 passed (1)`; `Tests 33 passed (33)` | `cl8-edge-setup-browser-4.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | `0` | `Test Files 9 passed (9)`; `Tests 24 passed (24)` | `cl8-edge-app-browser-4.log` |

The complete `npm.cmd test` chain reached these results. Each command exited `0`, as established by the advancing `&&` chain and its final exit status:

| Command within the chain | Final result lines |
| --- | --- |
| `test:src`, core/browser portion | `Test Files 8 passed (8)`; `Tests 51 passed (51)` |
| `test:src:styles`, managed Chromium | `Test Files 53 passed (53)`; `Tests 349 passed (349)` |
| `test:app`, managed Chromium | `Test Files 9 passed (9)`; `Tests 24 passed (24)` |
| `test:journey` | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)` |
| `test:policy` | `Test Files 1 passed (1)`; `Tests 109 passed \| 1 skipped (110)` |
| `test:config` | `Test Files 1 passed (1)`; `Tests 173 passed \| 1 skipped (174)` |
| `test:setup` | `Test Files 3 passed (3)`; `Tests 145 passed (145)` |
| `test:setup:browser`, managed Chromium | `Test Files 1 passed (1)`; `Tests 33 passed (33)` |
| `test:conformance` | `Test Files 1 passed (1)`; `Tests 10 passed (10)` |
| `test:guides` | `Test Files 1 passed (1)`; `Tests 18 passed (18)` |

The browser resolver reading in `tmp/units/cl8-browsers-4.log` returns `{}` for the default with pinned Chromium at `C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe`, and `{"launchOptions":{"channel":"msedge"}}` for Edge. The existing journey, policy, and config skips remain unchanged. Vite reported module-externalization warnings and an initial Sass dependency-optimization reload; the browser projects completed successfully. No configuration or skip was changed.

The actual `git diff --stat` output follows. It excludes the untracked grid partial and proof.

```text
 app/browser/Showcase.ts                          |   2 +-
 app/browser/constants.ts                         |  28 +++-
 app/browser/index.ts                             |   2 +-
 app/browser/sections/LayoutSection.ts            |   2 +-
 guides/veneer.md                                 |  55 ++++++++
 src/styles/_mixins.scss                          |  11 ++
 src/styles/components/_container.scss            |   6 +-
 src/styles/index.scss                            |   1 +
 tests/app/browser/sections/LayoutSection.test.ts |  19 ++-
 tests/conformance.test.ts                        |   3 +
 tests/setupConformance.test.ts                   |   3 +
 tests/setupStyles.test.ts                        | 160 ++++++++++++++++++++---
 tests/setupStyles.ts                             |  78 +++++++++++
 13 files changed, 340 insertions(+), 30 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output follows:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/sections/LayoutSection.ts
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/components/_container.scss
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/components/_grid.scss
?? tests/src/styles/components/grid.test.ts
```

Git also emitted the standing host warning:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Every listed path is owned by the effective briefs. `git diff --check` exits `0`. Nothing remains unclosed within brief 4. No agent was spawned, no dependency was installed, and no commit or push was made.
