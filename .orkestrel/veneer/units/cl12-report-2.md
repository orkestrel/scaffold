<!-- sol on Astra (gpt-6-astra), bench unit, journal tmp/codex/cl12-2.jsonl, thread
01a0c817-1493-74f2-acc7-64b3667db0e2, exit=0. Sole writer in the Veneer checkout, continuing the
authored CL12 tree from eb1cd71. Round 1 was written natively by Opus 5, so this fix round went to
an engine that did not write it. Retained 2026-09-22. Its brief is cl12-brief-2.md over
cl12-brief.md; its measurements are cl12-fix-terrain.md. It carries four corrections to
cl12-report.md, whose body is left unchanged. -->

CL12 round 2 corrects the container cascade sentence and the deferred-name justification in `guides/veneer.md`. The required gates exited 0, and the full-suite observation returned native exit 0. The effective brief is `tmp/units/cl12-brief-2.md`, over `cl12-brief.md`; this report corrects the specified claims in `cl12-report.md`.

The checkout remains at `eb1cd71`. Round 1's authored work is preserved. No table row changed or was added, and `guides/README.md` is unchanged. No code, dependency, or scaffold-owned file changed. No agent was spawned, and nothing was committed or pushed.

**Corrected container sentence and its reading.** Under Tokens → Space, border, radius, and elevation, the paragraph reads:

> The container partial applies each width inside the `breakpoint-up` mixin for the name that width carries, and each rule names that name and every narrower one, so a capped container takes the width of the widest boundary the viewport has crossed: `.container-sm` reads `--vn-container-sm` from 576px, `--vn-container-md` from 768px, and `--vn-container-xxl` from 1400px. `.container-fluid` reads no cap.

This adopts the wording supplied in `cl12-fix-terrain.md`, “The sentence the cascade falsifies.” I checked it against the built media rules, rather than against the replaced sentence. `node tmp/cl12-2/readings.mjs` parses `dist/src/styles/index.css` with the installed PostCSS parser and returned these rules:

| Media condition | Selectors receiving the cap | `max-inline-size` |
| --- | --- | --- |
| `(width>=576px)` | `.container,.container-sm` | `var(--vn-container-sm)` |
| `(width>=768px)` | `.container,.container-sm,.container-md` | `var(--vn-container-md)` |
| `(width>=992px)` | `.container,.container-sm,.container-md,.container-lg` | `var(--vn-container-lg)` |
| `(width>=1200px)` | `.container,.container-sm,.container-md,.container-lg,.container-xl` | `var(--vn-container-xl)` |
| `(width>=1400px)` | `.container,.container-sm,.container-md,.container-lg,.container-xl,.container-xxl` | `var(--vn-container-xxl)` |

Each successive rule retains the narrower selectors. Thus `.container-sm` takes its own token at `576px <= width < 768px`, then the wider tokens at their boundaries, including `--vn-container-lg` at 992px and `--vn-container-xl` at 1200px. At 1400px and wider it takes `--vn-container-xxl`. The partial's `list.append` loop and `breakpoint-up` call agree with this emitted reading.

**Fluid clause measured before editing.** The parsed cascade includes `.container-fluid` in the shared gutter, inline-size, padding, and margin rule and in the navbar flex rule. Neither declares a maximum width, and none of the media cap rules selects `.container-fluid`.

I also ran `node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/container.test.ts` before editing. It exited 0: `Test Files 1 passed (1)` and `Tests 25 passed (25)`. Its “reads every variant around the $boundary boundary” cases measure computed `max-width` and rendered width. For `.container-fluid`, they assert `max-width: none` and width equal to the viewport immediately before, at, and after the 375, 576, 768, 992, 1200, and 1400px boundaries. The same cases verify the accumulating caps on the named containers. The post-edit full suite ran this proof again. The rebuilt cascade was also re-read after the gate chain and matched the table.

**Corrected deferred-name justification.** Under Tokens → Deferred names, the replacement sentence reads:

> No reader parses this table, and none of these names belongs to the pinned inventory `scanCompatibilityPresence` checks against, so each row records what its name waits on instead of the owner and reason `readDeferrals` requires of the § Styles table.

This follows `cl12-fix-terrain.md`, “The half-true justification.” The operative distinction is membership in the pinned inventory, not whether a name is standard CSS. The inventory reading finds no `scroll-padding` member. `readOracleInventory` projects selector names and custom-property keys from the fixture; `scanCompatibilityPresence` rejects a deferral absent from that vocabulary. The standard `scroll-padding` property therefore does not contradict the replacement sentence. No cascade change is involved in this correction.

**Reader unknown closed.** Before editing, I searched `tests/`, `src/`, `app/`, and `configs/` for the guide path, its path constant, `readDeferrals`, `readCompatibility`, `Deferred names`, `Waiting on`, and the container paragraph. The guide-opening population agrees with brief 2: `tests/setupConformance.ts`, `tests/guides.test.ts`, `tests/setupStyles.ts`, `tests/conformance.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupConformance.test.ts`.

The conformance readers select Styles → Deferred selectors and Compatibility. The guide gate reads the API projections, examples, and other parity data; the raw-text proof checks the customization fence. Neither corrected sentence changes those inputs. The readings instrument compares the saved round-1 guide with the edited guide through the installed Markdown and Guide projections: Styles, Compatibility, Surface, Methods, and fences remain identical. A negative control changing the Styles deferral heading produces a different projection. Every table row also remains byte-identical. The separate guide and conformance gates passed. No reader's parsed contract changed.

**Corrections to round 1's report.** These carry `cl12-fix-terrain.md`, “Four report corrections this round carries.” They require no further guide edits.

- **Range rows can be checked.** A completeness check can expand the guide's gray endpoints through the registry and recover the intervening names. The audit lane executed that expansion. Round 1's literal rows remain accepted, but its claim that range notation cannot be checked is false.
- **Grammar unification is possible in the unread-to-read direction.** Changing the Tokens table's columns to `Name | Owner | Reason` while retaining its location leaves the Styles reader's section projection unchanged; the audit lane measured that equality in memory. Changing columns is not relocating rows. Moving those names into the Styles table fails the scanner's inventory-membership condition. Changing the Styles table to the unread table's shape removes the required `Owner` column. Those failures do not make every direction of grammar unification impossible. The accepted guide keeps its existing shapes.
- **The truth sweep was narrower than an instrument-derived census.** `tmp/cl12/claims.mjs` uses a hand-selected probe array rather than deriving every behavioral claim from the guide. `tmp/cl12/ledger.mjs` emits an obligation only when it contains a backticked class and a backticked token. The pre-edit false mark obligation contained no token, so that instrument cannot have produced the finding credited to it. The correction to the mark row is accepted; the reported discovery account is not reproducible. Round 1 does not establish that every behavioral sentence was checked.
- **The proposed completeness gate cannot fail for the missing-row defect it is meant to catch.** Searching for backticked names anywhere in Tokens still finds the mark names in neighboring prose after their table rows are deleted. Check the tables' name cells and their required value, source, and alias columns instead, including the light/dark shape where applicable. Require a negative control that deletes a mark row while leaving its prose references intact and makes the gate fail. Define how range and composite name cells expand, or convert them to explicit names. Round 1's cost estimate also omitted composite rows: the fix terrain records four registered tokens absent as full names everywhere in the guide because their rows express them only as suffix fragments. The successor must account for those composites as well as ranges.

**Gate freshness and results.** The final guide edit was at **2026-09-22 07:54:52 UTC**. I ran the gate chain after that edit, in the required order: format, lint, check, build, and the full suite, followed by separately reported guide, conformance, and policy readings. There were no subsequent guide edits. The guide's SHA-256 remained `ADA43FD94AD85E7ECFB5A2D5EEB00200F63E6DFE82E978DE6136241AC6730A0B` through the final verification.

The following start times are UTC on 2026-09-22. Commands used the Windows `npm.cmd` entry. Logs and the exit-code record are under `tmp/cl12-2/`.

| Command | Start | Native exit | Final result |
| --- | --- | --- | --- |
| `npm run format:check` | 07:55:27 | 0 | `All matched files use the correct format.` / `Finished in 810ms on 208 files using 16 threads.` |
| `npm run lint:check` | 07:55:43 | 0 | `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics |
| `npm run check` | 07:55:57 | 0 | Final invocation: `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics |
| `npm run build` | 07:56:19 | 0 | `✓ built in 595ms` |
| `npm test` | 07:59:00 | 0 | Final guides project: `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| `npm run test:guides` | 08:00:59 | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` |
| `npm run test:conformance` | 08:01:18 | 0 | `Test Files 1 passed (1)` / `Tests 10 passed (10)` |
| `npm run test:policy` | 08:01:46 | 0 | `Test Files 1 passed (1)` / `Tests 109 passed \| 1 skipped (110)` |

The initial full-suite capture began at 07:56:43 UTC and reported every project passing, but PowerShell returned shell exit 1 after converting npm notices into `NativeCommandError` records. That shell result was not treated as npm's native exit. The table reports the completed repeat using `cmd.exe` redirection, which returned native exit 0; its full log is `tmp/cl12-2/05-test-native.log.txt`. The initial capture remains in `05-test.log.txt`.

The repeated full-suite log reports: source 51 passed; styles 411 passed; application 26 passed; journey 88 passed and 4 skipped; policy 109 passed and 1 skipped; config 173 passed and 1 skipped; setup 156 passed; setup browser 42 passed; conformance 10 passed; guides 18 passed. This is the unit's observation. The authoritative full-suite reading remains the Orchestrator's after this unit exits. `git diff --check` also exited 0.

**Actual diff and status.** These outputs include round 1's authored changes over HEAD. The diff against the saved round-1 guide contains only the container paragraph and justification replacements.

`git diff --stat` returned:

```text
 guides/veneer.md | 63 +++++++++++++++++++++++++++++++++++++++++++++++++-------
 1 file changed, 56 insertions(+), 7 deletions(-)
```

`git status --porcelain --untracked-files=all` returned the following output, including its stderr warnings, and exited 0:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M guides/veneer.md
```

**Limits and remaining work.** The fluid and reader unknowns are closed by the readings described here. No brief/terrain conflict affecting the corrections arose, and neither correction required code changes. The `prove` tool is unreachable under this brief; **no receipt was issued**, and these test readings are not receipts.

Nothing in this fix round remains open. The completeness gate and the undeclared range/composite conventions remain successor work. The mirror instrument's base-name comparison remains assigned to the next sweep, and compatibility-row granularity remains the cross-cutting unit's work. No style pass or reopening of accepted round-1 work occurred.