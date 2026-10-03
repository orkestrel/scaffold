# Veneer boot report

Stopped under the brief's deviation contract. The implementation is uncommitted and is not accepted. No push or publication occurred. No agents were spawned.

## Changes by ruling

- **D1:** Added `VeneerOptions` and `TipPluginOptions`; made `createVeneer` default to an empty plugin list; made tip boot opt-in; conditioned the load subscription on a listed boot entry. Migrated Bootstrap callers and composed the showcase and journey tip opt-ins inline. Added behavioral bare-scope, plugin-option, oracle initialization, and source/packed-consumer proofs. Removed the default tip-boot departures. Button contracts remain unchanged.
- **D2:** Renamed the scope class, implementation, mirrored test, interfaces, options, interaction, error codes, factory, journey helper, and journey value. Updated consumers, guide references, the executed Bootstrap boot fence, and the roadmap. Rebuilt `showcase/browser.html`. The specified old-name sweep passes.
- **D4/R13:** Extracted `bindTouch`, retaining per-lifetime ownership. Added a native listener reader with a `0 → 1 → 0` sentinel control and a composition comparison measuring Bootstrap `[1,1,0,0]` against Veneer `[1,2,1,0]`.
- **D4/M1:** Added live-description comparisons through hide and destroy, for both profiles, shared hosts, and author removal of panel tokens. Kept the live-token implementation.
- **D4/M4:** Added a dedicated computed-anchor and author-follower reader, lifecycle comparisons, and inline/important controls. The stylesheet case measures Bootstrap `(120,220)` against Veneer's `(5,5)` fallback during placement. Kept placement behavior and the general transcript exclusions.

Stage B was not implemented. Full verification, discovery, and acceptance remain incomplete.

## Red-before and green-after evidence

The following commands were run on Windows. Filtered-out tests are reported as skipped by Vitest; they are not added skip declarations.

| Subject | Exact command | Red | Green |
| --- | --- | --- | --- |
| D1 defaults | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/factories.test.ts tests/src/browser/plugins.test.ts -t 'keeps a bare scope\|declares tip boot'` | Exit 1; 2 failed, 13 filtered out, before changing defaults | Exit 0; 2 passed, 13 filtered out |
| D1 bundles | `node tmp/codex/boot-command.ts exec -- vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution -t 'explicit Bootstrap collection\|packed createVeneer-only'` | Exit 1; 2 failed, 22 filtered out, under the restored-default-collection mutation | Exit 0; 2 passed, 22 filtered out, after restoring the empty default and rebuilding |
| R13 comparison | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/integration.test.ts -t 'retains each touch workaround'` | Exit 1; 1 failed, 6 filtered out, before adding measured departure rows | Exit 0; 1 passed, 6 filtered out |
| R13 helper | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t 'binds independent lifetimes'` | Exit 1; 1 failed, 37 filtered out, under the empty-touch-population mutation | Exit 0; 1 passed, 37 filtered out |
| M1 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Tip.test.ts -t 'preserves live page description'` | Exit 1; 2 failed, 151 filtered out, under the remove-all-description-tokens mutation | Exit 0; 2 passed, 151 filtered out |
| M4 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Placement.test.ts -t 'measures stylesheet anchor masking'` | Exit 1; 1 failed, 2 passed, 200 filtered out, under the preserve-computed-stylesheet-name mutation | Exit 0; 3 passed, 200 filtered out |

All implementation mutations were restored. The packed proof's initial substring check also matched documentation text; the final assertion checks function declarations. `boot-command.ts` invokes npm through its JavaScript entry and places distribution scratch inside the worktree.

The types-first command, `npx tsc -p configs/src/tsconfig.browser.json --noEmit`, exited 1 with 9 expected consumer diagnostics after renaming the contracts and before migrating implementations.

## Departure rows

Removed 4 `tip-boot` rows: tooltip and popover `title` and `data-bs-original-title` readings. Their replacement oracle proof compares both explicit boot against Bootstrap initialization and the collection alone against untouched Bootstrap hosts.

Added the following 6 rows.

| Scenario | Path | Bootstrap | Veneer |
| --- | --- | --- | --- |
| `touch-ownership` | `host::1` | `1` | `2` |
| `touch-ownership` | `host::2` | `0` | `1` |
| `tip-description:live:hide` | `host::description` | `<unset>` | `page` |
| `tip-description:live:destroy` | `host::description` | `@panel page` | `page` |
| `anchor-stylesheet` | `reference::anchor` | `--author-sheet` | `none` |
| `anchor-stylesheet` | `follower::position` | `120,220` | `5,5` |

## Acceptance status

The ordered acceptance sequence was not started after the last edit because discovery failed. Earlier development runs are listed separately where available; none substitutes for final acceptance.

| Required command or condition | Final exit/count | Earlier evidence |
| --- | --- | --- |
| `npm run format:check` | Not run | `npm run format`: exit 0 |
| `npm run lint:check` | Not run | `npm run lint`: exit 0 |
| `npm run check` | Not run | Scoped browser and root TypeScript checks ran without diagnostics before later edits |
| `npm run test:src:core` | Not run | — |
| `npm run test:src:browser` | Not rerun after final edits | Exit 1; 56 failed, 724 passed across 26 files. Subsequent edits repaired migration gaps; the full project remains unverified |
| `npm run test:setup` | Not run | — |
| `npm run test:setup:browser` | Not run | — |
| `npm run test:app:browser` | Not run | — |
| `npm run test:guides` | Not rerun after final edits | Exit 0; 15 passed, including the browser boot-fence execution |
| `npm run test:policy` | Not run | — |
| `npm run test:journey` | Not run | Statechart rows were not edited; behavior remains unverified |
| `npm run build` | Not run as final acceptance | Exit 0 during the bundle mutation proof; browser output rebuilt after restoring the mutation |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution` | Full project not run | Targeted source/packed proofs: exit 0, 2 passed |
| Old-name sweep | Exit 0; only retained identifiers matched | Details follow |
| `git diff --check` | Exit 0 | No whitespace errors |
| One commit on `veneer-boot` | Not done | No acceptance commit |
| Empty `git status --porcelain` | Not satisfied | Worktree contains implementation changes and staged renames |

`npm ci --ignore-scripts` exited 0. `npm run build:showcase` exited 0 and updated `showcase/browser.html`.

The sweep command was:

```text
rg -n 'createEngine|EngineInterface|EngineOptions|EngineInteraction|ENGINE_(ROOT|DESTROYED|DESTROY)|startJourneyEngine|journeyEngine|Engine\.test|Engine\.ts' src app tests guides/veneer.md ROADMAP.md
```

It returned 7 matches, all `createEngineTable`, in `app/browser/factories.ts`, `tests/app/browser/factories.test.ts`, and `tests/app/browser/index.test.ts`. These identifiers are retained by D2 item 3.

Commit hash: none. HEAD remains `9885975f0d359ef5aab14a1a536a4fcaa53430b6` on `veneer-boot`.

## Deviations

The [hardening skill](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-harden/SKILL.md) requires: “Run `node .agents/skills/orkestrel-harden/scripts/discovery.ts` and rule on every flag and marker it reports”. The root contract requires running its installed JavaScript twin. That reader failed before producing the required evidence; the brief's deviation contract directed the stop.

**Discovery failure.** Expected: the mandatory scaffold discovery script returns a census that can be audited. Found: it exited 1 before returning a census. Evidence: `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js --config vite.config.ts --projects src:core,src:browser,setup,setup:browser,app:browser,distribution --json` threw `SyntaxError: Unexpected token 'v', "[vite] (cli"... is not valid JSON`. Its `listCollected` function finds the first `[` in stdout and passes the remaining text to `JSON.parse`; this run's first bracket belonged to `[vite] (client) [optimizer] scanning dependencies...`. Done: preserved changes and recorded the failure. Not done: no scaffold-owned file was changed, no final gates were claimed, and no commit was made. Hypothesis: Vite's optimizer logging is incompatible with this discovery reader's JSON framing.

**External temporary install.** Expected: every installation stays inside the worktree. Found: the discovery command collected the distribution suite without the temporary-directory override used for the explicit distribution runs, causing an installation at `C:\Users\mikes\AppData\Local\Temp\distribution-OfFIrv\consumer`. Evidence: its installed `node_modules/@orkestrel/veneer/package.json` exists, with creation time `2026-10-03 00:52:23`. This was my invocation error. Done: identified and resolved the exact fixture path before attempting cleanup. Not done: the fixture remains because deletion was rejected. Hypothesis: test collection executes the distribution module's top-level staging code.

Automatic approval review rejected deletion of `C:\Users\mikes\AppData\Local\Temp\distribution-OfFIrv`, with the stated reason “blocked by policy.” No alternative deletion mechanism was attempted.
