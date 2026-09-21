<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c5f2-9da5-7330-8336-7f691acb7e7f, launched by units/cl8.sh, journalled at tmp/codex/cl8.jsonl
and swept at acceptance; the thread id is the durable handle. The unit STOPPED under its
deviation contract before the gate chain: the shared-block sweep reported declarations shared with
the container partial, which brief 1 made off-limits. units/cl8-brief-2.md carries the grant. -->

CL8 is incomplete. The shared-block sweep found declarations shared with the off-limits container partial. Completing the required extraction needs permission in a successor brief to edit `src/styles/components/_container.scss`. The working changes remain uncommitted at HEAD `a9172df`.

The brief grants `_mixins.scss` for a reported shared block, but excludes every other partial. The scaffold [styles rule](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/styles.md) requires: “If a pattern appears in at least two partials, move it to `_mixins.scss`.” It also requires: “A one-partial pattern stays inline; do not create a mixin for one caller.” Extracting only the grid side would leave the container declarations duplicated and create a mixin with one caller. Work stopped under the brief’s deviation contract. Neither `_container.scss` nor `_mixins.scss` was edited.

The implementation present in the working tree is as follows; these are authored changes, not a claim of accepted shipment.

| Key | Authored families | Recorded deferrals |
| --- | --- | --- |
| `row` | `.row`, `.row > *`, automatic and numbered row-column counts, including breakpoint variants; gutter aliases over the existing Veneer tokens | Every inventory `.row-gap-*` name, individually assigned to `CL8b`, which owns the gutter step utilities |
| `col` | Flexible, automatic, and numbered columns, including breakpoint variants | `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm`, assigned to `Forms` because they carry form-label typography and the `col` bucket is their only inventory record |
| `offset` | Unconditioned numbered offsets and breakpoint offsets, including breakpoint zero | None |

The inventory reading confirmed empty properties objects for `col` and `offset`, and `--bs-gutter-x` and `--bs-gutter-y` for `row`. The retained scaffold `plan.md` file, in its CL8 re-baseline, names `Forms` as the form-label owner. Guide selector-family rows, the row variable rows, and sorted conformance-list entries are authored. Their integration with the guide reader and presence scan has not run.

The grid uses shared lists and breakpoint loops, logical sizing and margins, and no added token. Layout specimens cover numbered columns, automatic and flexible columns, an offset, and a row-column count. Their section proof is extended. The carried layout import/export ordering and copy annotation fixes are authored, as are the setup import and exports-assertion ordering fixes. Existing showcase construction order remains unchanged; the alphabetical slip was in its import list.

The Unknowns have these outcomes.

| Unknown | Finding and evidence |
| --- | --- |
| Flex shorthand or longhands | The inventory records `flex: 1 0 0` for flexible columns and `flex: 0 0 auto` for automatic and numbered widths and row-column counts. Searching the shipped SCSS found flex display, wrapping, and direction declarations, but no flex-sizing precedent. The grid retains the inventory shorthand. Browser resolution has not run. |
| Row-column and column collision | The authored cascade places flexible columns before row-column counts and numbered columns after them. The browser proof asserts that the count overrides a flexible column and that a numbered width overrides the count. This behavior remains unverified because the browser proof has not run. |
| Shared-block sweep | Failed. The container and row share the gutter aliases. The container and row-child rule also share full inline size and inline gutter padding. The required extraction reaches the off-limits container partial. |

The sweep command was `npm.cmd run test:setup -- tests/setupStyles.test.ts`, with exit code `1`. Its log is `tmp/units/cl8-setup-initial.log`. The failure identifies these shared declarations.

```text
components/_container.scss:11 and components/_grid.scss:6
--bs-gutter-x: var(--vn-gutter-x)
--bs-gutter-y: var(--vn-gutter-y)

components/_container.scss:11 and components/_grid.scss:15
inline-size: 100%
padding-inline: calc(var(--bs-gutter-x) * 0.5)
```

The test output reports the failing assertion and final result as follows.

```text
FAIL  |setup| tests/setupStyles.test.ts > styles setup > carries no shared written declaration block across style partials
AssertionError: expected [ { left: { …(3) }, …(2) }, …(1) ] to deeply equal []

❯ tests/setupStyles.test.ts:198:24
expect(sweep.shared).toEqual([])

Test Files  1 failed (1)
     Tests  1 failed | 81 passed (82)
```

The requested emitted-value red-then-green browser reading has not run. No mutation was planted, and no restoration claim is made. The SHA-256 digest of the authored partial at the stop is `84A4CD53655616763E44F9212E243D6F3E38D89AA2E96247D3CFD9B84B11A810`; this is a stop-state digest, not evidence of a completed mutation/restoration cycle.

The following binding assertions were added to `tests/setupStyles.test.ts`. The scoped setup run passed the binding case; its failure was the shared-block case.

```ts
expect(new Map(GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary !== 0).map(({ name, boundary }) => [name, boundary]))).toEqual(boundaries)

expect(GRID_COLUMN_STEPS).toEqual(inventory.components.col?.selectors.flatMap((selector) => {
	const match = /^\.col-(\d+)$/u.exec(selector)
	return match ? [Number(match[1])] : []
}))

expect(GRID_COUNT_STEPS).toEqual(inventory.components.row?.selectors.flatMap((selector) => {
	const match = /^\.row-cols-(\d+) > \*$/u.exec(selector)
	return match ? [Number(match[1])] : []
}))

for (const key of ['col', 'offset', 'row'] as const) {
	expect(new Set(generated[key])).toEqual(new Set(inventory.components[key]?.selectors.filter((selector) => !selector.startsWith('.row-gap-') && !selector.startsWith('.col-form-label'))))
}
```

The `boundaries` map comes from compiling the shared Sass breakpoint ramp. The `generated` lists expand the breakpoint, column, count, and offset case tables, excluding unconditioned offset zero. The membership assertion binds the complete generated selector vocabulary to the inventory after excluding the withheld families. Frozen-table and boundary-reading assertions are also authored.

Gate evidence is limited to the commands executed before the stop.

| Command | Engine | Exit code | Final result |
| --- | --- | --- | --- |
| `npm.cmd run build:src:styles` | Vite/Sass on Windows | `0` | `✓ built in 489ms` |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts` | Vitest Node setup | `1` | `Test Files 1 failed (1)`; `Tests 1 failed \| 81 passed (82)` |
| `npm.cmd run format:check` | Host | Not run | Stopped before gate chain |
| `npm.cmd run lint:check` | Host | Not run | Stopped before gate chain |
| `npm.cmd run check` | Host | Not run | Stopped before gate chain |
| `npm.cmd run build` | Host | Not run | Stopped before gate chain |
| `npm.cmd test` | Managed Chromium and Node projects | Not run | Stopped before gate chain |
| `npm.cmd run test:setup` | Node | Not run | Only the scoped setup command ran |
| `npm.cmd run test:conformance` | Host/browser oracle | Not run | Presence and listing unverified |
| `npm.cmd run test:src:styles` | Managed Chromium | Not run | Browser readings unverified |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | Edge | Not run | Browser readings unverified |
| `npm.cmd run test:app:browser` | Managed Chromium | Not run | Showcase proof unverified |
| `npm.cmd run test:guides` | Node | Not run | Guide parity unverified |

The actual `git diff --stat` output is as follows. Git excludes the untracked grid files from this statistic.

```text
 app/browser/Showcase.ts                          |  2 +-
 app/browser/constants.ts                         | 24 ++++++++--
 app/browser/index.ts                             |  2 +-
 app/browser/sections/LayoutSection.ts            |  2 +-
 guides/veneer.md                                 | 56 ++++++++++++++++++++++
 src/styles/index.scss                            |  1 +
 tests/app/browser/sections/LayoutSection.test.ts | 12 +++++
 tests/conformance.test.ts                        |  3 ++
 tests/setupStyles.test.ts                        | 61 ++++++++++++++++++++----
 tests/setupStyles.ts                             | 27 +++++++++++
 10 files changed, 175 insertions(+), 15 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is as follows.

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/sections/LayoutSection.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/components/_grid.scss
?? tests/src/styles/components/grid.test.ts
```

Git also emitted this warning; the status and diff commands returned output.

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

The required scope correction is to grant `_container.scss` for replacing the shared declaration blocks with mixin calls. The successor work must finish that extraction, format and validate the authored changes, verify the guide deferrals and built selector conditions, run the browser mutation control, and run the remaining gates. No dependency was installed, no agent was spawned, and no commit or push was made.

Flagged interpretation: the inventory’s `.row` declaration array contains no `row-gap` property. Vertical gutters use its negative block-start margin and its children’s positive block-start margins. The authored partial follows that inventory, and its browser case expects `row-gap: normal`. This interprets the brief’s “row gap” as the inventory’s vertical gutter spacing, rather than adding a declaration absent from the baseline. That browser assertion has not run. The result is not ready to land.
