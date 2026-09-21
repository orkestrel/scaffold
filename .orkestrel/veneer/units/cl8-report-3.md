<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c613-7c01-7bc1-a356-338fef2f7f17, launched by units/cl8-3.sh, journalled at tmp/codex/cl8-3.jsonl
and swept at acceptance; the thread id is the durable handle. This run closed both stops: it made
the one granted change to the conformance proof's component set and carried the gate chain green
on managed Chromium and Edge. The extraction, the container-preservation comparison, the sweep, the
binding assertions, and the mutation control are recorded in units/cl8-report-2.md. -->

CL8's required gate chain is green on managed Chromium, and the required styles, browser-setup, and app-browser gates are green on Edge. The retained implementation remains uncommitted at HEAD `a9172df`. This report closes the blockers in the earlier stop reports under `cl8-brief-3.md`.

The change in this run adds the grid keys only to the component-set assertion in `tests/setupConformance.test.ts`, in the case `skips engine and CSS obligations whose Proof cell is a dash`. The added members sit beside the existing members as follows:

```diff
 				'blockquote',
 				'btn',
+				'col',
 				'display',
@@
 				'list-unstyled',
 				'mark',
+				'offset',
 				'reboot',
+				'row',
 				'small',
```

No other line or case in that file changed. `tests/setupConformance.ts` and the container browser proof remain unchanged. No gate required a further fix.

The retained grid implements the row and its children, automatic and numbered row-column counts, flexible/automatic/numbered columns, and offsets, including their breakpoint variants. The guide lists `col`, `offset`, and `row`. Every withheld `.row-gap-*` name remains deferred to `CL8b`; `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm` remain deferred to `Forms`. Conformance passes with those deferrals and no deferred selector emitted. The extraction, container-preservation comparison, sweep, binding assertions, and mutation control remain recorded in `tmp/units/cl8-report-2.md`.

The following commands ran on Windows on 2026-09-21 through Git Bash and `npm.cmd`. The logging script, `tmp/units/cl8-gate-3.sh`, preserves the command's exit code before reading its log. Log names in this table are relative to `tmp/units/`.

| Command | Exit | Final result lines | Log |
| --- | --- | --- | --- |
| `npm.cmd run format:check` | `0` | `All matched files use the correct format.` | `cl8-format-3.log` |
| `npm.cmd run lint:check` | `0` | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics | `cl8-lint-3.log` |
| `npm.cmd run check` | `0` | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics | `cl8-check-3.log` |
| `npm.cmd run build` | `0` | `✓ built in 539ms` | `cl8-build-3.log` |
| `npm.cmd run test:setup` | `0` | `Test Files 3 passed (3)`; `Tests 142 passed (142)` | `cl8-setup-3.log` |
| `npm.cmd test` | `0` | Ends after guides: `Test Files 1 passed (1)`; `Tests 18 passed (18)` | `cl8-test-3.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | `0` | `Test Files 53 passed (53)`; `Tests 349 passed (349)` | `cl8-edge-styles-3.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | `0` | `Test Files 1 passed (1)`; `Tests 33 passed (33)` | `cl8-edge-setup-browser-3.log` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | `0` | `Test Files 9 passed (9)`; `Tests 24 passed (24)` | `cl8-edge-app-browser-3.log` |

The complete `npm.cmd test` chain reached every following command. These are results within that run, retained in `cl8-test-3.log`; its `&&` chain advanced after each command and exited `0`.

| Command within the chain | Exit | Final result lines |
| --- | --- | --- |
| `npm run test:src`, core/browser portion | `0` | `Test Files 8 passed (8)`; `Tests 51 passed (51)` |
| `npm run test:src:styles` | `0` | `Test Files 53 passed (53)`; `Tests 349 passed (349)` |
| `npm run test:app` | `0` | `Test Files 9 passed (9)`; `Tests 24 passed (24)` |
| `npm run test:journey` | `0` | `Test Files 4 passed (4)`; `Tests 84 passed \| 4 skipped (88)` |
| `npm run test:policy` | `0` | `Test Files 1 passed (1)`; `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:config` | `0` | `Test Files 1 passed (1)`; `Tests 173 passed \| 1 skipped (174)` |
| `npm run test:setup` | `0` | `Test Files 3 passed (3)`; `Tests 142 passed (142)` |
| `npm run test:setup:browser` | `0` | `Test Files 1 passed (1)`; `Tests 33 passed (33)` |
| `npm run test:conformance` | `0` | `Test Files 1 passed (1)`; `Tests 10 passed (10)` |
| `npm run test:guides` | `0` | `Test Files 1 passed (1)`; `Tests 18 passed (18)` |

The default browser resolver returned `{}` with the installed pinned executable at `C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe`, selecting managed Chromium. The Edge override returned `{"launchOptions":{"channel":"msedge"}}`. The reported skips remain the existing capture-only journey cases, the target-inapplicable local writing-table case, and the unavailable-extractor case, which skips because API Extractor is installed. No skip or tolerance changed.

The retained findings are closed inside the owned scope:

- `npm.cmd run test:conformance` caught a blank line separating the grid deferrals from their table. `readDeferrals` returned no grid deferrals, and the run exited `1` with `Shipped component row is missing selector .row-gap-0` and `Tests 3 failed | 7 passed (10)`. Removing that blank line and formatting the owned rows produced exit `0` with `Tests 10 passed (10)`. The logs are `tmp/units/cl8-conformance-red-2.log` and `tmp/units/cl8-conformance-green-2.log`. Conformance also passes in this run's complete chain.
- `npm.cmd test`, at `test:journey`, caught the layout specimens' unshipped `border` and `p-2` classes. The census reported `expected [ 'border', 'p-2' ] to deeply equal []` and `Tests 4 failed | 80 passed | 4 skipped (88)`. Removing the unused wrappers from the owned specimens produced `Tests 84 passed | 4 skipped (88)`. The failing log is `tmp/units/cl8-test-2.log`; the corrected journey result appears in `tmp/units/cl8-test-final-2.log` and this run's `tmp/units/cl8-test-3.log`.

The precision reading is resolved without a code change. Brief 3 records that unminified source emits `.col-4: 33.33333333%` and `.col-7: 58.33333333%`, exactly matching the inventory; the build's CSS minifier shortens those values to `33.3333%` and `58.3333%`. The earlier `199.984px` reading under an exact-equality probe is not a defect in the partial. The emitted-selector instrument continues to compare selectors and media conditions; browser assertions retain their shipped tolerance. No built-cascade value-equality gate was added, no tolerance was tightened, and no arithmetic changed. The final partial still has the retained mutation-restoration SHA-256 digest:

```text
d315484bd133235d5e0d27ef5b83d5090f68e526f8d8f53eb56b62e20b3f9433
```

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
 tests/setupConformance.test.ts                   |   3 +
 tests/setupStyles.test.ts                        | 103 +++++++++++++++++++++--
 tests/setupStyles.ts                             |  29 +++++++
 13 files changed, 239 insertions(+), 19 deletions(-)
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

Every listed path is owned by the effective briefs. `git diff --check` exits `0`. Nothing remains unclosed within this assignment. No agent was spawned, no dependency was installed, and no commit or push was made. Final acceptance remains with the Orchestrator.
