<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c5fe-2c37-7e23-9a93-5f86b44bd64b, launched by units/cl8-2.sh, journalled at tmp/codex/cl8-2.jsonl
and swept at acceptance; the thread id is the durable handle. The unit STOPPED under its deviation
contract again, on a second scope gap: tests/setupConformance.test.ts enumerates every component
with guide rows as a literal set, and brief 1 made that proof off-limits. units/cl8-brief-3.md
carries the grant. Everything else in briefs 1 and 2 is implemented and proved here. -->

CL8 is incomplete. The extraction and its container-preservation proof pass, but the full gate chain reaches an off-limits proof that excludes the required grid keys. Work stopped at HEAD `a9172df`, with the authored changes retained and uncommitted.

The blocker is `tests/setupConformance.test.ts:932`. Its `skips engine and CSS obligations whose Proof cell is a dash` case compares the guide's component set with a literal set that omits `col`, `offset`, and `row`. Brief 1 requires those guide rows and explicitly excludes `tests/setupConformance.ts` and its proof. Brief 2 leaves that exclusion intact. The scaffold `.agents/orchestration.md` deviation protocol requires: “Stop when a conflict prevents the primary objective or requires an unowned change.” The needed successor grant is `tests/setupConformance.test.ts` for updating that component-set assertion to include the required keys. That file remains unchanged.

The final `npm.cmd test` run exited `1`; `cl8-test-final-2.log.txt` records the failure:

```text
FAIL |setup| tests/setupConformance.test.ts > setupConformance > skips engine and CSS obligations whose Proof cell is a dash
AssertionError: expected Set{ 'row', 'col', 'offset', …(21) } to deeply equal Set{ 'blockquote', 'btn', …(19) }

The received set additionally contains:
  "col"
  "offset"
  "row"

❯ tests/setupConformance.test.ts:932:53

Test Files  1 failed | 2 passed (3)
     Tests  1 failed | 141 passed (142)
```

The implementation carried forward and completed within scope is as follows. These are implemented families, not a claim that CL8 is accepted.

| Key | Implemented families | Deferrals and reason |
| --- | --- | --- |
| `row` | `.row`, `.row > *`, automatic and numbered row-column counts, unconditioned and breakpoint-scoped; gutter aliases over the existing Veneer tokens | Every inventory `.row-gap-*` name has its own `CL8b` row because the gutter step utilities own it. |
| `col` | Flexible, automatic, and numbered columns, unconditioned and breakpoint-scoped | `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm` belong to `Forms`; they carry form-label typography, and the `col` bucket is their only inventory record. |
| `offset` | Unconditioned offsets and breakpoint-scoped offsets, including breakpoint zero | None. |

The partial uses the shared Sass breakpoint ramp, per-family lists, logical sizing and margins, and existing gutter tokens. It adds no token and is loaded once beside the container partial. The inventory reading confirms empty properties objects for `col` and `offset`; `row` owns `--bs-gutter-x` and `--bs-gutter-y`. The guide includes shipped selector-family rows and the row's variable rows. The conformance list includes `col`, `offset`, and `row` in sorted position.

The Layout section contains numbered columns, automatic and flexible columns, an offset, and a row-column count. Its proof covers their rendered selectors. The carried ordering and annotation fixes remain: Layout precedes Link in the showcase import list and application barrel; the layout copy uses inferred typing and no longer imports `SectionCopy`; `CALIBRATED_TIERS` precedes the container imports; the `LINK_*` entries precede `LIST_CLASS_CASES` in the imports and exports assertion. The exports assertion's already-correct container entries were not moved.

The extraction introduces these mixins in `src/styles/_mixins.scss`:

| Mixin | Body and callers |
| --- | --- |
| `alias-gutters` | Emits the horizontal and vertical Bootstrap aliases over Veneer's tokens. Called by the container shell and `.row`. |
| `pad-gutters` | Emits full inline size and half-gutter inline padding. Called by the container shell and `.row > *`. Its content slot preserves the child's intervening `max-inline-size` declaration. |

Only the shared declarations in `_container.scss` changed, becoming mixin calls. No other container line changed.

The container comparison uses `cl8-container-comparison.mjs`. Before editing the extraction sites, `npm.cmd run build:src:styles` exited `0` and ended with `✓ built in 491ms`. The instrument parsed `dist/src/styles/index.css` with PostCSS and retained every rule containing a container selector, including navigation combinators. For each rule it recorded its position among all rules, selector list, enclosing layers and media conditions, and ordered declarations including importance. It saved the original cascade and the records under ``.

After extraction, the same build command exited `0` and ended with `✓ built in 491ms`. The instrument compared the parsed records without sorting declarations or rules. It also compared the entire cascade byte-for-byte. Negative controls reversed a declaration list and moved a global rule position; each was rejected. A final comparison after the later builds returned the same result:

```text
Container comparison: identical selectors, ancestor conditions/layers, global rule positions, and ordered declarations.
Negative controls: reversed declarations and moved global rule position each rejected.
Whole cascade byte-identical: true
final: 7 container rules; SHA-256 f9e83cb469f7de33cce51af0487e09cc6a616d206700936ff25f04b4254568c3
```

The before, after, and final container-record digests are identical. Their records are `cl8-container-before.json`, `cl8-container-after.json`, and `cl8-container-final.json` under ``. `git diff --exit-code -- tests/src/styles/components/container.test.ts` exited `0`. The unchanged container proof passes in the full styles project on managed Chromium and Edge.

The shared-block sweep passes. `npm.cmd run test:setup -- tests/setupStyles.test.ts` exited `0`, reporting `Test Files 1 passed (1)` and `Tests 82 passed (82)`. The direct `scanStyleBlocks()` reading is retained in `cl8-sweep-2.json`; its full output follows:

```json
{
  "files": [
    "_mixins.scss",
    "_reset.scss",
    "_theme.scss",
    "_tokens.scss",
    "components/_button.scss",
    "components/_container.scss",
    "components/_grid.scss",
    "components/_image.scss",
    "components/_link.scss",
    "components/_list.scss",
    "components/_quote.scss",
    "components/_type.scss",
    "elements/_a.scss",
    "elements/_abbr.scss",
    "elements/_address.scss",
    "elements/_b.scss",
    "elements/_blockquote.scss",
    "elements/_body.scss",
    "elements/_button.scss",
    "elements/_code.scss",
    "elements/_details.scss",
    "elements/_dl.scss",
    "elements/_fieldset.scss",
    "elements/_figure.scss",
    "elements/_heading.scss",
    "elements/_hr.scss",
    "elements/_html.scss",
    "elements/_iframe.scss",
    "elements/_img.scss",
    "elements/_input.scss",
    "elements/_kbd.scss",
    "elements/_label.scss",
    "elements/_mark.scss",
    "elements/_ol.scss",
    "elements/_optgroup.scss",
    "elements/_output.scss",
    "elements/_p.scss",
    "elements/_pre.scss",
    "elements/_progress.scss",
    "elements/_samp.scss",
    "elements/_select.scss",
    "elements/_small.scss",
    "elements/_strong.scss",
    "elements/_sub.scss",
    "elements/_sup.scss",
    "elements/_svg.scss",
    "elements/_table.scss",
    "elements/_textarea.scss",
    "elements/_tr.scss",
    "elements/_ul.scss",
    "elements/_var.scss"
  ],
  "pairs": 1275,
  "shared": []
}
```

The Unknowns resolve as follows:

| Unknown | Finding and evidence |
| --- | --- |
| Flex shorthand | The inventory records `flex: 1 0 0` for flexible columns and `flex: 0 0 auto` for automatic, numbered, and count rules. The partial retains those shorthands. Explicit browser assertions pass with `1 0 0px` for the active flexible column and `0 0 auto` for the others. Before a breakpoint activates, the row child resolves to `0 0 auto`. The build shortens the latter shorthand to `none`; the browser expands it back. |
| Row-column and column collision | The flexible rule precedes the row-column counts; numbered columns follow them. At every tested active boundary, a numbered fourth-step column in a count-of-two row occupies approximately 200px of a 600px row, while its flexible sibling occupies 300px. Before activation, each occupies 600px. These assertions pass on Chromium and Edge. |
| Shared blocks after extraction | The full population includes `_mixins.scss` and every partial under `src/styles/`. The sweep reports `shared: []`; no other partial requires extraction. |
| Setup assertions about mixins | Before editing `_mixins.scss`, I read the setup proof. It includes that file in the sweep, compiles the breakpoint ramp to bind token and grid names, and exercises breakpoint refusal and gating. It does not pin the extracted gutter declarations' text or require a different mixin population. The scoped setup proof passes unchanged apart from the already-owned grid bindings and ordering fixes. |

The gutter browser proof passes at the default values and after canonical and alias overrides. Default inline margins are `-12px`, and child inline padding is `12px`. Setting the canonical horizontal gutter to `2rem` produces `-16px` margins and `16px` padding; setting its vertical counterpart to `0.5rem` produces a `-8px` row top margin and an `8px` child top margin. Direct aliases of `3rem` and `1rem` produce `-24px` inline margins, `24px` padding, and `-16px`/`16px` top margins. The row resolves `row-gap` to `normal`. No row-gap declaration was added.

The numbered widths, offsets, row-column counts, automatic widths, flexible widths, and cascade collisions pass at the breakpoint boundary and its neighboring viewports. The unconditioned cases run at 375px and 1401px. The right-to-left offset resolves on the right physical margin. No shipped browser assertion was relaxed, and no browser failure required changing the partial.

The emitted-selector instrument, `cl8-emission.mjs`, reads the built cascade through PostCSS and compares its complete grid selector/media-condition multiset with the raw inventory rows after excluding the deferred families. It normalizes selector whitespace and equivalent minimum-width notation. It reports an exact match, with no extra grid selector. Controls removing a breakpoint condition and adding `.row-gap-0` are rejected. Its emitted records are `cl8-built-grid-2.json`.

The required emitted-value control changed only the row's `margin-inline` factor from `-0.5` to `-0.25`. The command was identical for the failing and passing runs:

```text
npm.cmd run test:src:styles -- tests/src/styles/components/grid.test.ts -t 'resolves the default gutter'
```

The failing run exited `1`; `cl8-control-red-2.log.txt` records:

```text
FAIL |[object Object] (chromium)| tests/src/styles/components/grid.test.ts:18:2 > grid gutters > resolves the default gutter and canonical and alias overrides on physical sides
AssertionError: expected -6 to be -12 // Object.is equality

- Expected: -12
+ Received: -6

❯ tests/src/styles/components/grid.test.ts:27:41
expect(readPixels(row, 'margin-left')).toBe(-12)

Test Files  1 failed (1)
     Tests  1 failed | 13 skipped (14)
```

After restoring the exact bytes, the command exited `0`; `cl8-control-green-2.log.txt` records:

```text
Test Files  1 passed (1)
     Tests  1 passed | 13 skipped (14)
```

The skips are the command's name filter. The complete grid suite subsequently passes. `cl8-mutation.mjs` saves the original bytes, verifies that only the intended mutation is present before restoration, restores the saved bytes, and asserts byte equality. The original, restored, and final partial share this SHA-256 digest:

```text
d315484bd133235d5e0d27ef5b83d5090f68e526f8d8f53eb56b62e20b3f9433
```

The binding assertions added to `tests/setupStyles.test.ts` include the following exact excerpts:

```ts
expect(
	new Map(
		GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary !== 0).map(({ name, boundary }) => [
			name,
			boundary,
		]),
	),
).toEqual(boundaries)

expect(GRID_COLUMN_STEPS).toEqual(
	inventory.components.col?.selectors.flatMap((selector) => {
		const match = /^\.col-(\d+)$/u.exec(selector)
		return match ? [Number(match[1])] : []
	}),
)
expect(GRID_COUNT_STEPS).toEqual(
	inventory.components.row?.selectors.flatMap((selector) => {
		const match = /^\.row-cols-(\d+) > \*$/u.exec(selector)
		return match ? [Number(match[1])] : []
	}),
)

for (const key of ['col', 'offset', 'row'] as const) {
	expect(new Set(generated[key])).toEqual(
		new Set(
			inventory.components[key]?.selectors.filter(
				(selector) =>
					!selector.startsWith('.row-gap-') && !selector.startsWith('.col-form-label'),
			),
		),
	)
}
```

The `boundaries` map comes from compiling the shared Sass ramp. The `generated` lists expand the breakpoint, column, count, and offset tables, excluding unconditioned offset zero. Thus the offset list is bound through complete selector membership. Additional assertions require frozen tables, frozen breakpoint entries and readings, and the exact neighboring viewport readings. These bindings pass in the scoped setup run and in the full setup run; the latter fails in the excluded conformance proof.

Conformance exposed and closed a defect in the retained guide edit. A blank line separated the grid deferrals from their table, so `readDeferrals()` returned no grid deferrals. `npm.cmd run test:conformance` initially exited `1` with `3 failed | 7 passed (10)` and `Shipped component row is missing selector .row-gap-0`. Removing that blank line and formatting the owned rows makes the same command exit `0`:

```text
Test Files  1 passed (1)
     Tests  10 passed (10)
```

The reader then lists `col`, `offset`, and `row`, reads every grid deferral, and returns no presence failure. The reading is retained in `cl8-accounting-2.json`. No deferred selector is emitted. The conformance machinery and its proof were not edited.

The full test chain also exposed and closed a retained specimen defect. The grid markup used the unshipped `border` and `p-2` classes. The journey census rejected them with `expected [ 'border', 'p-2' ] to deeply equal []`; the initial chain reported `4 failed | 80 passed | 4 skipped (88)` for journeys. Removing those unused wrappers from the owned layout specimens makes the next chain report `84 passed | 4 skipped (88)`. The journey proof remains unchanged. Its capture-only cases account for those skips.

The final gate chain ran in the required order on Windows on 2026-09-21. Browser projects used managed Chromium unless the command selected Edge. Logs use the `cl8-` prefix shown in the table.

| Command | Exit | Final result | Log suffix |
| --- | --- | --- | --- |
| `npm.cmd run format:check` | `0` | `All matched files use the correct format.` | `format-final-2.log` |
| `npm.cmd run lint:check` | `0` | `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics | `lint-final-2.log` |
| `npm.cmd run check` | `0` | Ends with `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics | `check-final-2.log` |
| `npm.cmd run build` | `0` | `✓ built in 538ms` | `build-final-2.log` |
| `npm.cmd test` | `1` | `Test Files 1 failed \| 2 passed (3)`; `Tests 1 failed \| 141 passed (142)` in setup | `test-final-2.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | `0` | `Test Files 53 passed (53)`; `Tests 349 passed (349)` | `edge-2.log` |

The final `npm.cmd test` chain completed these projects before stopping:

| Project command | Exit | Result |
| --- | --- | --- |
| `test:src`, core/browser portion | `0` | `8 passed (8)` files; `51 passed (51)` tests |
| `test:src:styles`, managed Chromium | `0` | `53 passed (53)` files; `349 passed (349)` tests |
| `test:app`, app:browser project | `0` | `9 passed (9)` files; `24 passed (24)` tests |
| `test:journey` | `0` | `4 passed (4)` files; `84 passed \| 4 skipped (88)` tests |
| `test:policy` | `0` | `109 passed \| 1 skipped (110)` tests |
| `test:config` | `0` | `173 passed \| 1 skipped (174)` tests |
| `test:setup` | `1` | `1 failed \| 141 passed (142)` tests; blocker quoted earlier |

`test:setup:browser` and `test:guides` were not reached. Conformance passed independently before the chain. The app:browser project passed through `test:app`; the equivalent `npm.cmd run test:app:browser` alias was not separately invoked. A successor must close the excluded setup assertion and finish the required green chain and guide gate.

An additional raw-width probe is flagged, not claimed green. It required exact equality with 200px, beyond the shipped test's `toBeCloseTo(..., 1)` assertion, and returned `199.984px` for Veneer's `.col-md-4` on a 600px row. A subsequent exact comparison with unminified Bootstrap returned `200px` for Bootstrap and failed too. The built Veneer percentage is `33.3333%`; the inventory records `33.33333333%`. The optional probe did not reach its Edge capture or write its final readings artifact. Its failures are retained in `cl8-browser-readings-2.log.txt` and `cl8-browser-readings-final-2.log.txt`. No shipped assertion was changed to absorb that difference. The passing suite establishes the authored tolerance and cascade behavior, not exact subpixel equality with unminified Bootstrap.

The PowerShell logging wrapper was refused by the host's script-execution policy before invoking npm. Subsequent logged commands used Git Bash and `npm.cmd`, with native exit codes. The probe MCP was unavailable as the brief anticipated. No dependency installation or process-tree proof was attempted. Browser runs reported module-externalization warnings, and configuration tests reported API Extractor's bundled TypeScript-version warning; neither was their failing result.

The actual `git diff --stat` output follows. It excludes the untracked grid partial and proof.

```text
 app/browser/Showcase.ts                          |   2 +-
 app/browser/constants.ts                         |  28 +++++-
 app/browser/index.ts                             |   2 +-
 app/browser/sections/LayoutSection.ts            |   2 +-
 guides/veneer.md                                 |  55 ++++++++++++
 src/styles/_mixins.scss                          |  11 +++
 src/styles/components/_container.scss            |   6 +-
 src/styles/index.scss                            |   1 +
 tests/app/browser/sections/LayoutSection.test.ts |  13 +++
 tests/conformance.test.ts                        |   3 +
 tests/setupStyles.test.ts                        | 103 +++++++++++++++++++++--
 tests/setupStyles.ts                             |  29 +++++++
 12 files changed, 236 insertions(+), 19 deletions(-)
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
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/components/_grid.scss
?? tests/src/styles/components/grid.test.ts
```

Every reported path is owned by the effective briefs. `git diff --check` passes. Git also reports the standing host warning:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

No agent was spawned, and no commit or push was made. The extraction is proven unchanged, the required grid control is red then green, and the owned browser proofs pass on Chromium and Edge. CL8 remains blocked on the excluded setup proof and is not ready to land.
