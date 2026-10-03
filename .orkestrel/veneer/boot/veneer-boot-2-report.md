Completed on `veneer-boot` at commit `e3d962f2156b4abce1906830725dba569a9bdb34`. The acceptance gates pass and `git status --porcelain` is empty. No agents were spawned; nothing was pushed or published.

The implementation retains D1's explicit plugin selection and opt-in tip boot, D2's `Veneer` rename and consumer migrations, and D4's touch ownership, live-description, and stylesheet-anchor proofs. The departure table retains the prior run's removal of 4 `tip-boot` rows and addition of 6 measured rows across `touch-ownership`, `tip-description:live:hide`, `tip-description:live:destroy`, and `anchor-stylesheet`. Stage B remains outside this unit.

The review findings were repaired as follows.

| Finding | Repair | Evidence |
| --- | --- | --- |
| Claim 3 | The `boot=false` control routes `createBootstrapPlugins()` alone. | A mutation making the collection return both tip plugins with `boot: true` fails only the false control; restoration passes. |
| Claim 4 | Scope examples use `veneer` in the class, factory, interface, and guide. The link reads “boot and registry proofs.” | Text checks fail before repair and pass afterward; guide parity passes. |
| Claim 6 | The composition proof uses an `integration` departure ledger, compares its scenario-filtered rows, and asserts empty `unused` and `unproven` collections. | Bypassing `ledger.compare` fails the consumption case; restoration passes. |
| Claim 8 | Corrected collection and scope summaries and boot prose. The Node guide proof pins the fence to the browser transcription's source and launches no browser child. | Changing the transcription to `createVeneer(document)` fails the guide pin; restoration passes. Text checks and summary parity pass. |
| Low findings | Simplified the live-description filter to `row.scenario === label`; taught the scan that ledger-label form; removed unused `exception` fields; corrected defaults, boolean TSDoc, and reader throws; moved helper imports before tests and merged the named repeated imports; renamed the collection bundle variable and positively asserted `createVeneer` retention; used the unfiltered collection in the delegation proof. | Text checks, the label-recognition mutation, the omitted-bundle mutation, and the scoped browser run pass after restoration. |

Red-before and green-after commands were run on Windows. Filtered tests are reported separately from passing tests. All mutations were restored.

| Subject | Command | Red | Green |
| --- | --- | --- | --- |
| Collection-only control | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Veneer.test.ts -t 'matches Bootstrap page script tip initialization'` | Exit 1; 1 failed, 1 passed, 49 filtered | Exit 0; 2 passed, 49 filtered |
| Departure consumption | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/integration.test.ts` | Exit 1; 1 failed, 7 passed | Exit 0; 8 passed |
| Fence transcription | `npm run test:guides` | Exit 1; 1 failed, 14 passed | Exit 0; 15 passed |
| Text and import findings | `node tmp/codex/review-text-check.ts` | Exit 1; 18 failed, 1 passed | Exit 0; 19 passed |
| Ledger-label recognition | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/integration.test.ts -t 'requires every departure scenario'` | Exit 1; 1 failed, 7 filtered | Exit 0; 1 passed, 7 filtered |
| Positive bundle assertion | `node tmp/codex/boot-command.ts exec -- vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution -t 'explicit Bootstrap collection'` | Exit 1; 1 failed, 23 filtered | Exit 0; 1 passed, 23 filtered |

The scoped command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Veneer.test.ts tests/src/browser/Tip.test.ts tests/src/browser/helpers.test.ts tests/src/browser/factories.test.ts tests/src/browser/integration.test.ts` passed 260 tests across 5 files, exit 0. The text checker proves only the named text and import conditions; browser and distribution tests prove behavior.

The manual census used `vitest list --config vite.config.ts --project <project> --json=tmp/codex/list-<project>.json` through the worktree-local scratch runner. Filename colons became hyphens. Every collection exited 0.

| Project | Files | Listed tests |
| --- | ---: | ---: |
| `src:browser` | 26 | 782 |
| `setup` | 2 | 149 |
| `setup:browser` | 2 | 101 |
| `app:browser` | 8 | 220 |
| `distribution` | 1 | 17 |

`tests/src/browser/Veneer.test.ts` is collected; `Engine.test.ts` is absent. Distribution's runtime report includes 7 additional inapplicable export-mode cases as skipped. Distribution collection and execution kept installation scratch under `tmp/codex/boot-scratch`. The broken scaffold discovery script was not run.

The final acceptance results follow in the required order.

| Command | Exit | Result |
| --- | ---: | --- |
| `npm run format:check` | 0 | 357 files checked |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | Root and scoped source/application checks pass |
| `npm test` | 0 | 1,897 passed, 2 skipped, 1 todo; corrected run completed in 532,752 ms |
| `npm run build` | 0 | Source and application builds pass |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution` | 0 | 17 passed, 7 skipped; invoked through `boot-command.ts` for local scratch |
| Old-name sweep | 0 | 7 retained `createEngineTable` matches only |
| `git diff --check` | 0 | No whitespace errors |
| `git commit -F tmp/codex/boot-2-commit.txt` | 0 | One commit on `veneer-boot` |
| `git status --porcelain` | 0 | Empty |

The `npm test` counts by project are recorded here.

| Project | Passed | Skipped / todo |
| --- | ---: | --- |
| `src:core` + `src:browser` | 796 | — |
| `src:bootstrap` | 14 | — |
| `src:tailwindcss` | 3 | — |
| `src:styles` | 15 | 1 todo |
| `src:vue` | 1 | — |
| `app:core` + `app:browser` | 221 | — |
| `app:vue` | 1 | — |
| Browser journeys | 60 | — |
| Vue journeys | 4 | — |
| `policy` | 119 | 1 skipped |
| `config` | 227 | 1 skipped |
| `setup` | 149 | — |
| `setup:browser` | 101 | — |
| `conformance` | 117 | — |
| `integration` | 54 | — |
| `guides` | 15 | — |

The styles todo belongs to the later Veneer styles chunk. Policy skips the scaffold-owned substitution-table comparison; config skips the unavailable-extractor control because the extractor is installed. Journey statechart rows were not changed.

The old-name sweep was:

```text
rg -n 'createEngine|EngineInterface|EngineOptions|EngineInteraction|ENGINE_(ROOT|DESTROYED|DESTROY)|startJourneyEngine|journeyEngine|Engine\.test|Engine\.ts' src app tests guides/veneer.md ROADMAP.md
```

Its retained matches occur only in `app/browser/factories.ts`, `tests/app/browser/factories.test.ts`, and `tests/app/browser/index.test.ts`.

One invocation deviation was corrected. **Expected:** `npm test` uses its normal temporary-directory environment; distribution installs use the worktree override. **Found:** I initially applied the distribution override to `npm test`, which exited 1 in `config` with 2 failures and 225 passes. **Evidence:** `tmp/codex/boot-2-test.err` records a non-JSON “No files” response at `tests/config.test.ts:2976` and an outside-path assertion at line 3256 receiving `true`. **Done:** reran the complete unchanged test chain with the normal environment; it exited 0, including 227 config passes. **Not done:** no scaffold file was edited and no assertion was weakened. **Hypothesis supported by the rerun:** placing configuration scratch inside the ignored worktree `tmp/` directory caused both failures.

The final test, build, and distribution journals are `tmp/codex/boot-2-test-normal.log`, `tmp/codex/boot-2-build.log`, and `tmp/codex/boot-2-distribution.log`, with adjacent `.err` files recording exit codes. No acceptance work remains.
