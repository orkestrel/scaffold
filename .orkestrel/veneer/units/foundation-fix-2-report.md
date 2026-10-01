# foundation-fix-2 report

Stopped under the deviation contract. G8 passes its scoped checks and Vue entry mutation control. G9's first guide run rejects the prescribed method-free surface. G10 and the final gates are not run.

## Blocking deviation

- **Expected:** The guide describes the token registry and states that no behavioural interface exists. The registered report assertions pass without inventing methods.
- **Found:** `report.sections` rejects the absence of documented method groups.
- **Evidence:** `npm run test:guides` exits 1, reporting 1 failed test and 11 passed tests. The failing assertion is `tests/guides.test.ts:41`. Its finding is:
  `{ spec: 'guides/veneer.md', text: 'guides/veneer.md has no documented method groups.' }`
  The installed `node_modules/@orkestrel/guide/dist/src/server/index.js:3311` adds this finding whenever `row.guide.methods().length === 0`.
- **Done:** Added the guide, index, parity proof, guides project, test-chain registration, README pitch, and package description. Kept every report assertion.
- **Not done:** Did not weaken parity, invent a behavioural interface, edit the dependency, implement G10, or run the closing gates.
- **Hypothesis:** The guide package requires a documented method group even for a package exposing only constants and types.

## Group results

The scoped commands report the following results:

| Group | Change or proof | Command | Exit |
| --- | --- | --- | --- |
| G8 | Browser entry appends a main containing the Veneer heading. Vue retains its shipped entry and Veneer Vue heading. Both headings carry tabindex 0 for the journey resolver's reachability contract. | `npm run test:app` | 0 |
| G8 | Browser journey imports the shipped entry, resolves the level-1 heading, checks rendering and reachability, verifies the injected variant, and proves the prescribed interactive roles absent. | `npm run test:journey` | 0 |
| G8 | Vue journey mounts the app container and imports the shipped entry, then makes the equivalent interface assertions. Cleanup removes the mounted surface. | `npm run test:journey:vue` | 0 |
| G8 | Browser setup contains the ProvidedContext augmentation for variant, variants, and capture. It exports no helper or value, so no setupBrowser proof was added. | `npm run test:policy` | 0 |
| G8 | Capture placement, filename expansion, uniqueness, and written-path membership pass for both browser viewports. | `CAPTURE=1 npm run test:journey` — environment variable set in PowerShell | 0 |
| G8 control | Emptying app/vue/main.ts leaves collection valid and fails the heading resolver in both viewport executions: 2 failed tests. | `npm run test:journey:vue` | 1 |
| G8 restored | Restoring app/vue/main.ts restores both viewport executions: 2 passed tests. | `npm run test:journey:vue` | 0 |
| G9 | Guide and parity wiring execute. Surface, summaries, examples, imports, links, tests, pitch, input, and declarations pass; the required-sections assertion fails. | `npm run test:guides` | 1 |
| G10 | none — not started after the guide refusal | none | none |

The policy run reports 112 passed tests and 1 skipped test. Each ordinary journey command reports 2 passed viewport executions. The app command reports 2 passed core/browser tests and 1 passed Vue test.

## First guide surface result

`report.surface` is `[]` on the first guides run. It names no undocumented export and accepts the empty browser and Vue barrels in the guide's combined source scope. The blocking result comes from `report.sections`, not surface parity.

## Journey verbs and captures

The suites use `resolveAccessible('heading', name)`, `isRendered`, `isReachable`, and the provider's role-and-name resolver. The Vue fixture uses `mount`. Both suites use `createPortfolio`, `expandCaptures`, and `place`. They import the real application entries.

Journey and Refusal are declared and checked against the families proved. Capture is added under the injected flag. Refusal asserts empty populations for button, link, textbox, checkbox, combobox, menuitem, and tab. No click, typing, or Tab traversal runs; these screens expose no controls in those roles.

The capture run writes:

- `tmp/captures/states/browser-home--desktop.png`
- `tmp/captures/states/browser-home--compact.png`

Vue capture execution: none. Refusal mutation control: none before the stop.

## Files changed by this unit

The implementation changes these files:

- `app/browser/main.ts`
- `app/vue/Example.vue`
- `tests/app/browser/integration.test.ts`
- `tests/app/vue/integration.test.ts`
- `tests/setupBrowser.ts`
- `guides/veneer.md`
- `guides/README.md`
- `README.md`
- `tests/guides.test.ts`
- `vite.config.ts`
- `package.json`

The report is written to `tmp/units/foundation-fix-2-report.md`. The mutation to `app/vue/main.ts` is restored; its final diff is empty.

## Other deviations and naming decisions

The observed differences and choices are:

- The starting checkout contains foundation-fix-1 changes as staged and unstaged edits. `git log -1 --oneline` reports `ec25f9e Establish the style, Vue, and app surfaces for the veneer foundation.` Those inherited changes were retained.
- The off-limits journey wrapper declares desktop and compact viewports, contrary to the brief's single-variant assumption. Both remain enabled. The suites follow the brief's explicit instruction to omit Matrix, Statechart, and Transport.
- Kept `Example.vue`: its PascalCase entity name satisfies the naming rule. Used browser-home and vue-home as capture states to distinguish the application surfaces.
- Added `tabIndex: 0` and `tabindex="0"` because the installed reachability predicate requires a nonnegative tab index. The headings retain their native heading roles.
- The first journey runs print Vite dependency-optimization reload warnings and pass. Subsequent capture and Vue mutation/restoration runs pass or fail as stated without those warnings. No off-limits configuration was edited.
- The brief prohibits a whole-tree build in Tools and limits and requests it in Close. Execution stops before that conflict needs resolution.
- Formatting, lint, and comprehensive typechecking remain unmeasured for this unit. No dependency was installed and no sub-agent was spawned.

## Final gate exit codes

The stop leaves every closing gate unrun:

| Gate | Exit code |
| --- | --- |
| `npm run format:check` | none — not run |
| `npm run lint:check` | none — not run |
| `npm run check` | none — not run |
| `npm run build` | none — not run |
| `npm test` | none — not run |

## Checkout evidence

`git status --porcelain` exits 0 and lists the unit's edits alongside the inherited foundation changes. It lists `guides/veneer.md` and `tests/guides.test.ts` as untracked.

`git diff --stat` exits 0 and reports 33 files changed, 509 insertions, and 572 deletions across the checkout's unstaged diff. That measurement includes inherited edits and excludes staged-only and untracked files; it is not this unit's isolated change count.

Showcase rebuild and repeat-build comparison: none.
