**Fix pass — 2026-10-06**

Applied all adopted findings in the detached checkout at `2ba68b9`. The required command queue passes; no commit or sub-agent was used. Source edits remain confined to `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/setupBrowser.ts`.

- `scanSheetRules` omits style rules nested inside style rules, directly or through grouping rules, and their descendants. Its TSDoc explains that readers do not resolve relative selectors and that omission produces an `unattributed`, fail-closed reading.
- `readPartitionRules` requires a defined selector at both declaration filters and removes the `?? ''` remapping. `PartitionEntry.selector` remains a string; the existing nested-declaration proof passes unchanged.
- `SheetEntry.selector` documents `selectorText` and `undefined` with backticks and explicitly gives `CSSNestedDeclarations` the enclosing style rule's selector.
- The placeholder proof pins `@supports (color: color-mix(in lab, red, red))` literally.
- Log labels describe their readings: `Nested container reading`, `Nested placeholder reading`, and `Nested attribution reading`.
- The report reclassifies `tests/src/tailwindcss/index.test.ts:495,552` as flat-input non-regression: both scans consume Sass-built sheets without nesting. `tests/integration.test.ts:554` remains walk evidence because its recipe contains the nested `::placeholder` block. The blanket reader-behavior claim is replaced with the reader-specific statements that follow.

The proof `refuses nested style rules and their descendants with unattributed readings beside a resolved flat control` emits only the `.a` entry for `.a { &.b { color: red } }`. Its readings are:

| Case | Reading |
| --- | --- |
| Nested rule, `.b` carrier | `unattributed` |
| Nested rule, `.a.b` carrier | `unattributed` |
| Nested style rule through `@media` | `unattributed` |
| Declaration beneath that nested style rule's `@supports` | `unattributed` |
| Flat `.a.b { color: red }` control | `resolved` |

Removing the refusal guard makes exactly this proof fail on the emitted `&.b` entry; restoring it makes the same targeted command pass. This mutation check follows the scaffold fix-round contract. The mutation's expected exit 1 is separate from the required acceptance queue, whose commands all exit 0.

The report-only deferred follow-up is to resolve nested style-rule selectors according to CSS nesting when an input carries them: `&` as `:is(<parent>)`, with an implicit descendant combinator otherwise. No follow-up was added to the tree.

The shared walk excludes nested style rules and their descendants before any consumer receives them. Other emitted entries reach readers as follows:

| Reader | Population admitted or excluded |
| --- | --- |
| `attributeDeparture` | Admits style rules and nested declarations with a selector. |
| `readPartitionRules` | Admits style rules and nested declarations with a selector; excludes grouping entries. |
| `mapTokenSheet` | Its style filter excludes nested declarations and grouping entries. Its band branch also reaches and can rewrite media rules nested in an emitted style rule. |
| `readSequences` | Its style filter excludes nested declarations and grouping entries. |
| `readKeyframes` | Admits keyframes and their frames; excludes nested declarations and grouping entries. |
| `collectSheetNames` | Admits style rules and keyframe declarations; excludes nested declarations and grouping entries. |
| `collectDeclaredLonghands` | Its style filter excludes nested declarations and grouping entries. |
| `flattenDeclarations` | Its style filter excludes nested declarations and grouping entries. |
| `readLayerNames` | Also reports a layer block nested in an emitted style rule; excludes nested declarations and other grouping entries. |
| `flattenRules` | Its style filter excludes nested declarations and grouping entries. |
| `readPlacement` | Its style filter excludes nested declarations and grouping entries. |
| `readLayerExceptions` | Its style filter excludes nested declarations and grouping entries. |
| `collectPreservationIndex` | Its style filter excludes nested declarations and grouping entries. |
| `collectComponentPreservation` | Its fallback style filter excludes nested declarations and grouping entries; the preservation index excludes them at construction. |
| `collectPartition` | Its direct scan admits property registrations and root style custom properties; nested declarations and grouping entries fail its style filter. Partition declarations consume the nested-aware `readPartitionRules` result. |

Neither the nested layer-block shape nor the nested media-rule shape occurs in these readers' current inputs. Direct attribution and indexed preservation do not have nested-declaration parity.

Every listed folder is under `/home/user/veneer/tmp/units/journey-cost/runs/`. Each command uses `flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`. `KIND` is `command` except for the journey.

| Folder | Command | Exit | Runner seconds | Result |
| --- | --- | --- | --- | --- |
| `completion-b2-fix-format-owned-1` | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts` | 0 | 0.327 | Formatted owned files |
| `completion-b2-fix-format-check-1` | `npm run format:check` | 0 | 3.919 | All matched files use the correct format |
| `completion-b2-fix-lint-check-1` | `npm run lint:check` | 0 | 1.639 | No diagnostics |
| `completion-b2-fix-check-1` | `npm run check` | 0 | 60.453 | Root, source, and app checks complete without diagnostics |
| `completion-b2-fix-refusal-mutation-1` | `npm run test:setup:browser -- tests/setupStyles.test.ts -t 'refuses nested style rules'` | 1 expected | 18.978 | 1 failed, 51 skipped |
| `completion-b2-fix-refusal-restored-1` | `npm run test:setup:browser -- tests/setupStyles.test.ts -t 'refuses nested style rules'` | 0 | 11.704 | 1 passed, 51 skipped |
| `completion-b2-fix-setup-1` | `npm run test:setup:browser` | 0 | 196.820 | 184 passed |
| `completion-b2-fix-tailwind-1` | `npm run test:src:tailwindcss` | 0 | 27.167 | 10 passed |
| `completion-b2-fix-integration-1` | `npm run test:integration` | 0 | 43.655 | 60 passed |
| `completion-b2-fix-app-browser-1` | `npm run test:app:browser` | 0 | 147.748 | 241 passed |
| `completion-b2-fix-journey-1` | Journey command that follows, with `--kind journey` | 0 | 470.129 | 94 passed; 4 test files passed |

The journey command after the PATH environment prefix is `env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/completion-b2-fix-journey-1/report.json`. Its failed-title list is `[]`; the JSON report records 94 passed, 0 failed, and 0 pending. Vitest reports 467.84 seconds; `end.json` records 470.129 runner seconds. The host-bound set is empty, and no failure was excused. The Orchestrator retains comparison against `jb1-1` and `jb1-2`; this pass makes no performance claim.

Every run has an empty instrumentation-error list. The targeted runs skip tests only because of their title filter. No acceptance command required a retry. Long commands used the scaffold dispatch launcher, with journals under `/home/user/veneer/tmp/units/completion-b2/fix-*.log` and caps of 2400 seconds for checks and 3600 seconds for the journey, including queue-wait allowance.

Regenerated [candidate.patch](/home/user/veneer/tmp/units/completion-b2/candidate.patch) and [status.txt](/home/user/veneer/tmp/units/completion-b2/status.txt). `git diff --check` exits 0. The final tracked status contains only the owned files:

```text
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```