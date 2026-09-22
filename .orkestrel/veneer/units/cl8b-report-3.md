<!-- sol on gpt-6-astra, exit 0, retained 2026-09-22. Codex exec thread
01a0c677-f113-73b1-a2ce-1444c6222c19, launched by units/cl8b-3.sh, journalled at
tmp/codex/cl8b-3.jsonl and swept at acceptance; the thread id is the durable handle. The fix round
round 1 forced: the density proof corrected at the root with a positive control, the ramp preamble
extracted, the sweep's folder guard widened, the important priority pinned, and the showcase list
derived from the registry. -->

CL8b brief 3 is implemented. The corrected density and priority cases fail under their required controls and pass after restoration. The extraction preserves the compiled cascade byte for byte. The full gate chain passes with managed Chromium, and the styles, browser-setup, and app-browser projects pass on Edge.

The effective assignment is `cl8b-brief-3.md` over briefs 2 and 1. This report supersedes `cl8b-report-2.md` for the findings brief 3 carries. HEAD remains `d2c5bb3`. No commit, push, dependency installation, or agent dispatch occurred.

The accepted `g`, `gx`, `gy`, and `row-gap` rules, density-free step values, guide rows, deferral deletions, conformance listing, and corrected tuple remain unchanged. The utilities remain in their own layer and folder, and the step tokens remain under `TOKEN_NAMES.gap`. The `row` key remains closed. The `gap` and `column-gap` keys remain assigned to the utilities family.

The corrected density case in `tests/src/styles/utilities/gap.test.ts` is quoted in full. Its padding reads the density-derived space token on the same row whose gutters and gap are measured. The root factor changes that padding from 6 px to 12 px; the `finally` block removes the mutation, and the last assertion reads 6 px again. The step-retune assertions remain in the case.


```ts
it('keeps the steps independent of density and follows a retuned step on every axis', () => {
		const host = specimens.mount(
			`<div class="row"><div></div></div><div class="row g-4 row-gap-4" style="padding-top: var(${TOKEN_NAMES.space[3]})"><div></div></div>`,
		)
		const baseline = requireValue(host.querySelector('.row'), 'No default row')
		const row = requireValue(host.querySelector('.g-4'), 'No retuned row')
		const child = requireValue(row.firstElementChild, 'No retuned child')
		expect(readPixels(row, 'padding-top')).toBe(6)
		document.documentElement.style.setProperty(TOKEN_NAMES.factor.density, '2')
		try {
			expect(readPixels(row, 'padding-top')).toBe(12)
			expect(readPixels(row, 'margin-left')).toBe(readPixels(baseline, 'margin-left'))
			expect(readPixels(child, 'padding-left')).toBe(12)
			expect(readPixels(row, 'margin-top')).toBe(-24)
			expect(readPixels(row, 'row-gap')).toBe(24)
			host.style.setProperty(TOKEN_NAMES.gap[4], '2rem')
			expect(readPixels(row, 'margin-left')).toBe(-16)
			expect(readPixels(child, 'padding-left')).toBe(16)
			expect(readPixels(row, 'margin-top')).toBe(-32)
			expect(readPixels(child, 'margin-top')).toBe(32)
			expect(readPixels(row, 'row-gap')).toBe(32)
			expect(readPixels(baseline, 'margin-left')).toBe(-12)
		} finally {
			document.documentElement.style.removeProperty(TOKEN_NAMES.factor.density)
		}
		expect(readPixels(row, 'padding-top')).toBe(6)
	})
```

The density control rewrites the built `--vn-gap-*` declarations to `calc(<length> * var(--vn-factor-density))`. It changes no source token. The arrival control moves the factor assignment from the document element back to the mounted wrapper. The priority control removes the important flag from the built row-gap declarations. The instrument saves the original bytes before each plant and restores those bytes afterwards.

The exact control commands and their decisive output follow. Each filtered run collects the named case; the reported skipped cases are excluded by the command's test-name filter.


```text
bash cl8b-run.sh density-plant-3 node cl8b-evidence-3.mjs plant density
MUTATED declarations=6
ORIGINAL dist/src/styles/index.css SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
PLANTED dist/src/styles/index.css SHA256=b3cc20fc154b8ad5bf6ca07e3ee96c531aa7ddbdc01f55638fc1f85efd143853
EXIT=0

bash cl8b-run.sh density-red-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps the steps independent"
AssertionError: expected -24 to be -12 // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed | 7 skipped (8)
EXIT=1

bash cl8b-run.sh density-restore-3 node cl8b-evidence-3.mjs restore density
RESTORED dist/src/styles/index.css SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
ORIGINAL SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
EXIT=0

bash cl8b-run.sh density-green-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps the steps independent"
 Test Files  1 passed (1)
      Tests  1 passed | 7 skipped (8)
EXIT=0
```



```text
bash cl8b-run.sh arrival-plant-3 node cl8b-evidence-3.mjs plant arrival
ORIGINAL tests/src/styles/utilities/gap.test.ts SHA256=90a8f964762382ad73aecf4a6c1ca866f2e4a05350a93040efabc94fd410f48d
PLANTED tests/src/styles/utilities/gap.test.ts SHA256=dded6e14c60f85e3c6ae928634673e76aeab428169ac1124eda2368eb268ba33
EXIT=0

bash cl8b-run.sh arrival-red-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps the steps independent"
AssertionError: expected 6 to be 12 // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed | 7 skipped (8)
EXIT=1

bash cl8b-run.sh arrival-restore-3 node cl8b-evidence-3.mjs restore arrival
RESTORED tests/src/styles/utilities/gap.test.ts SHA256=90a8f964762382ad73aecf4a6c1ca866f2e4a05350a93040efabc94fd410f48d
ORIGINAL SHA256=90a8f964762382ad73aecf4a6c1ca866f2e4a05350a93040efabc94fd410f48d
EXIT=0

bash cl8b-run.sh arrival-green-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps the steps independent"
 Test Files  1 passed (1)
      Tests  1 passed | 7 skipped (8)
EXIT=0
```



```text
bash cl8b-run.sh priority-plant-3 node cl8b-evidence-3.mjs plant priority
MUTATED declarations=36
ORIGINAL dist/src/styles/index.css SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
PLANTED dist/src/styles/index.css SHA256=5657d7be46ecb69ec837eff6af1ef584a7c0f9f9f3d7b0b392db02e91f51495c
EXIT=0

bash cl8b-run.sh priority-red-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps row-gap priority"
AssertionError: expected 7 to be 24 // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed | 7 skipped (8)
EXIT=1

bash cl8b-run.sh priority-restore-3 node cl8b-evidence-3.mjs restore priority
RESTORED dist/src/styles/index.css SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
ORIGINAL SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
EXIT=0

bash cl8b-run.sh priority-green-3 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "keeps row-gap priority"
 Test Files  1 passed (1)
      Tests  1 passed | 7 skipped (8)
EXIT=0
```

The shared ramp preamble lives in `src/styles/_mixins.scss` as the following mixin.


```scss
@mixin breakpoint-each {
	@each $name, $boundary in breakpoints() {
		$infix: '';
		@if $boundary != 0 {
			$infix: '-#{$name}';
		}
		@include breakpoint-up($name) {
			@content ($infix, $boundary);
		}
	}
}
```

The callers are `src/styles/components/_grid.scss` and `src/styles/utilities/_gap.scss`, respectively.


```scss
@include breakpoint-each using ($infix, $boundary) {
	// Existing grid rules.
}

@include breakpoint-each using ($infix, $_boundary) {
	// Existing gap rules.
}
```

The mixin yields the boundary as well as the infix so the grid retains its existing zero-boundary offset condition without rewriting that condition. The gap caller needs only the infix. Each partial retains its layer, selector grouping, declarations, and order.

The extraction comparison used the installed PostCSS parser in `cl8b-evidence-3.mjs`. It selects grid rules by the row, col, and offset prefixes, excluding row-gap, and gap rules by the g, gx, gy, and row-gap prefixes. It compares nonempty ordered rule populations, including grouped selectors, declarations and importance, and ancestor layer/media conditions. It also compares the complete CSS buffers, including every rule outside those populations, for LTR and RTL output.

The before build preceded the snapshot; the after build followed the extraction. These commands all exited 0.


```text
bash cl8b-run.sh before-build-3 npm.cmd run build:src:styles
bash cl8b-run.sh snapshot-3 node cl8b-evidence-3.mjs snapshot
bash cl8b-run.sh after-build-3 npm.cmd run build:src:styles
bash cl8b-run.sh compare-3 node cl8b-evidence-3.mjs compare
```

The final comparison, after the gates rebuilt the cascade, returned the same result.


```text
bash cl8b-run.sh final-compare-3 node cl8b-evidence-3.mjs compare
index.css grid: ordered rules equal SHA256=3de53a6ab4cb85040e5f33fbb65f0e43d4183aa7fe55ad5eeebe25c77ad8d0f0
index.css gap: ordered rules equal SHA256=0bc2bf688b0ad342ff24b81624c658a0cada500027de511376506460e7beca06
index.css: exact bytes equal SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
index.rtl.css grid: ordered rules equal SHA256=3de53a6ab4cb85040e5f33fbb65f0e43d4183aa7fe55ad5eeebe25c77ad8d0f0
index.rtl.css gap: ordered rules equal SHA256=0bc2bf688b0ad342ff24b81624c658a0cada500027de511376506460e7beca06
index.rtl.css: exact bytes equal SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6

EXIT=0
```

The comparison also failed under the priority-removal control: `bash cl8b-run.sh compare-red-3 node cl8b-evidence-3.mjs compare` exited 1 with `AssertionError [ERR_ASSERTION]: Expected values to be strictly equal`. Its grid comparison passed, and its gap comparison failed. After restoration, the same comparison through the `compare-green-3` label exited 0. The comparison therefore detects declaration-priority changes as well as proving the extraction unchanged.

The folder guard in `tests/setupStyles.test.ts` requires an elements, components, and utilities leaf before asserting the absence of shared declaration blocks.


```ts
for (const folder of ['elements', 'components', 'utilities'])
	expect(sweep.files.some((path) => dirname(path) === folder)).toBe(true)
expect(sweep.shared).toEqual([])
```

The priority case uses the existing `specimens.load` method. Its plain row proves that the competing unlayered sheet arrived, while its utility row must retain 24 px. The control output quoted earlier shows the utility falling to the consumer's 7 px when importance is removed.


```ts
it('keeps row-gap priority over a later unlayered consumer rule', () => {
		const host = specimens.mount('<div class="row row-gap-4"></div><div class="row"></div>')
		specimens.load('.row { row-gap: 7px }')
		const row = requireValue(host.querySelector('.row-gap-4'), 'No utility row')
		const baseline = requireValue(host.querySelector('.row:not(.row-gap-4)'), 'No consumer row')
		expect(readPixels(baseline, 'row-gap')).toBe(7)
		expect(readPixels(row, 'row-gap')).toBe(24)
	})
```

The Gutter steps specimen in `app/browser/constants.ts` derives its list with `Object.keys(TOKEN_NAMES.gap)`. Its proof in `tests/app/browser/sections/LayoutSection.test.ts` iterates the same registry keys and requires a rendered child under each corresponding gutter class. Neither site retains the literal step list. The setup proof still binds the registry leaves and step table to the pinned record.

The Unknowns close on executed evidence. The tree's existing Sass `@content` mechanism carries arguments through `using`; the build and exact-output comparison confirm it supports these callers. The existing stylesheet loader appends the consumer sheet to the document head and records it for `specimens.clear()`; the browser case and priority-removal control confirm it reaches the intended cascade position. No alternate loader or content mechanism was added.

The gate chain ran on Windows on 2026-09-21 in the required order. Each command's full output is retained in `cl8b-<label>.log.txt`, with the label shown in the command.

| Command | Exit | Final result |
| --- | --- | --- |
| `bash cl8b-run.sh gate-format-3 npm.cmd run format:check` | 0 | `All matched files use the correct format.` |
| `bash cl8b-run.sh gate-lint-3 npm.cmd run lint:check` | 0 | `EXIT=0`; no diagnostics. |
| `bash cl8b-run.sh gate-check-3 npm.cmd run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, then `EXIT=0`. |
| `bash cl8b-run.sh gate-build-3 npm.cmd run build` | 0 | `✓ built in 575ms`, then `EXIT=0`. |
| `bash cl8b-run.sh gate-test-3 npm.cmd test` | 0 | `Test Files  1 passed (1)`; `Tests  18 passed (18)`; `EXIT=0`. |

The full test chain reports these actual result lines. Every listed segment exited 0; the shell chain reached its end.

| Project | Test files | Tests |
| --- | --- | --- |
| Core and browser source | `8 passed (8)` | `51 passed (51)` |
| Styles | `54 passed (54)` | `357 passed (357)` |
| App browser | `9 passed (9)` | `24 passed (24)` |
| Journeys | `4 passed (4)` | `84 passed \| 4 skipped (88)` |
| Policy | `1 passed (1)` | `109 passed \| 1 skipped (110)` |
| Configuration | `1 passed (1)` | `173 passed \| 1 skipped (174)` |
| Setup | `3 passed (3)` | `147 passed (147)` |
| Browser setup | `1 passed (1)` | `33 passed (33)` |
| Conformance | `1 passed (1)` | `10 passed (10)` |
| Guides | `1 passed (1)` | `18 passed (18)` |

The setup segment includes the widened folder guard and corrected multiset tuple. Conformance includes the closed row vocabulary and the g, gx, gy, and row-gap listing. The existing conditional skips concern disabled capture, the absent target-local term file, and the unavailable-extractor scenario when the extractor is installed. No CL8b case is skipped in the full run.

The requested Edge projects returned these results.

| Command | Exit | Final result lines |
| --- | --- | --- |
| `bash cl8b-run.sh edge-styles-3 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files  54 passed (54)`; `Tests  357 passed (357)` |
| `bash cl8b-run.sh edge-setup-browser-3 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  33 passed (33)` |
| `bash cl8b-run.sh edge-app-browser-3 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files  9 passed (9)`; `Tests  24 passed (24)` |

The browser-host instrument also ran through the `browser-host-3` and `browser-edge-host-3` labels using `node --experimental-strip-types cl8b-browser-host-2.mjs`, with `env PLAYWRIGHT_CHANNEL=msedge` on the Edge invocation. Each exited 0. Managed Chromium resolved without overrides to `C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe`, version `153.0.8010.12`. Edge resolved through `{"launchOptions":{"channel":"msedge"}}`, version `153.0.4234.48`. Browser externalization warnings and API Extractor's compiler-version notice remain in the logs and did not fail a gate.

The actual `git diff --stat` output follows.


```text
 app/browser/constants.ts                         | 22 +++++-
 guides/veneer.md                                 | 85 ++++++++++--------------
 src/core/constants.ts                            |  8 +++
 src/styles/_mixins.scss                          | 13 ++++
 src/styles/_tokens.scss                          |  6 ++
 src/styles/components/_grid.scss                 | 64 ++++++++----------
 src/styles/index.scss                            |  1 +
 tests/app/browser/sections/LayoutSection.test.ts | 10 +++
 tests/conformance.test.ts                        |  4 ++
 tests/setupConformance.test.ts                   |  4 ++
 tests/setupStyles.test.ts                        | 44 +++++++++++-
 tests/setupStyles.ts                             | 12 +++-
 12 files changed, 185 insertions(+), 88 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output, including stderr warnings, follows.


```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M app/browser/constants.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/components/_grid.scss
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/utilities/_gap.scss
?? tests/src/styles/utilities/gap.test.ts
```

Every reported worktree path is owned by the briefs. The untracked gap partial and proof are absent from the diff statistic. The report, instruments, snapshots, and logs remain under ignored `tmp/`. The `git diff --check` command exits 0.

No assigned repair or requested CLI gate remains open. The expected probe-tool restriction remains: the showcase claim's `prove` call returned `MCP tool call requires approval, but approval policy is never` before execution. It produced no receipt. This report's behavioral evidence is the executed browser controls and CLI gates, not a probe receipt. Final acceptance remains with the Orchestrator.
