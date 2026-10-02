# Veneer lanes: the engine session and the showcase session

Two Claude Code sessions write veneer at once. This file is their lane contract and their message log. Read it before each unit, and append to § Log whenever you land work the other lane consumes or touch a path outside your lane. The user's current word overrides this file; record the ruling here when it changes a lane.

## Sessions

| Session | Runs | Lane |
| --- | --- | --- |
| Engine session ("Orkestrel veneer foundation overhaul") | the user's Windows desktop; veneer `main` and worktrees `veneer-wt-*`; scaffold `main` | the Bootstrap and Tailwind faces, `src/core`, and the Bootstrap JavaScript engine; it uses the showcase as visual reference and as a test surface |
| Showcase session (cloud, `claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV`) | veneer branch `ccr-d15a48b1-yyyll6`; scaffold `.orkestrel/veneer/showcase/` | the showcase, the journeys, `browse`, and the cost of the journey and browse runs |

Neither session can message the other directly: `ListAgents` and the app's session list reach no cloud session. This file and the commit messages on veneer `main` are the channel.

## Paths

Exclusive paths. Write only your own; when a user request in your session needs the other lane's path, land it on veneer `main` and log it here.

| Lane | Paths |
| --- | --- |
| Engine | `src/core/`, `src/browser/`, `src/bootstrap/`, `src/tailwindcss/`, `src/styles/`, `src/vue/`, `tests/src/**`, `tests/integration.test.ts`, `tests/distribution.test.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `configs/policy.ts` and every scaffold-vendored file (through `scaffold overwrite` only), `.orkestrel/veneer/` outside `showcase/` |
| Showcase | `app/browser/`, `showcase/`, `tests/app/browser/`, `configs/app/vite.journey.config.ts`, `.orkestrel/veneer/showcase/` |

Shared files, split by section. Edit only your section; when a change must reach the other section (a contract migration), say so in the commit message and in § Log.

| File | Engine section | Showcase section |
| --- | --- | --- |
| `tests/setupBrowser.ts` | the oracle harness: `createOracle`, `runSteps`, `recordTranscript`, `compareTranscripts`, `readTipTranscript`, the departure families and ledgers, the `build*` engine fixtures, `PlacementRecorder`, `buildEnginePlugin`, `buildConflict` | the showcase and journey helpers: `buildShowcase`, `buildJourney`, the statecharts and scenarios (`FACE_SCENARIOS`, `THEME_SCENARIOS`, `buildPairScenarios`), `TAILWIND_READINGS`, the `collect*` and `read*` showcase readings |
| `tests/setupBrowser.test.ts` | the describe blocks for the oracle harness | the describe blocks for the showcase helpers |
| `tests/setupServer.ts` | the Tailwind compile helpers | the showcase server helpers |
| `guides/veneer.md` | the Core, Styles, Bootstrap, Tailwind, and Browser entries, the departure tables | the showcase sections |
| `ROADMAP.md` | the core, styles, and browser lines | the showcase lines |
| `package.json`, `vite.config.ts` | shared: change only with a § Log entry naming the change | same |

The user stated on 2026-10-02, in the engine session, that the engine session holds Bootstrap and Tailwind. `showcase/status.md` § Ownership boundary lists `src/bootstrap/` and `src/tailwindcss/` for the showcase session; this table moves them to the engine lane. Showcase session: confirm by updating your boundary, or raise it with the user.

## Rules

- **The environment boundary.** `tests/setupBrowser.ts` imports no value from `app/`, only types. Every `src:browser` suite imports the harness, and the boundary plugin refuses an application module on that graph ("Published modules cannot depend on private application modules"); pass application values to a helper as arguments, as `buildPairScenarios(FACES, THEMES)` does (veneer `e7b7c2b`).
- **The built page.** Never hand-merge `showcase/browser.html`. The side that merges rebuilds it with `npm run build:showcase` from the merged tree and commits the result.
- **Merges.** The engine session merges its worktree branches into veneer `main`. The showcase session merges `main` into `ccr-d15a48b1-yyyll6` before each unit and merges back into `main` when a unit is accepted. The merging side resolves a shared file by union, keeps the other side's section byte for byte, and logs the merge here.
- **Contract changes.** When the engine changes a contract the showcase consumes (`createEngine`, the plugin factories, the event constants, a harness export), it migrates the showcase's call sites on `main` in the same change and logs it here.
- **Behavior changes.** When an engine change moves what a journey or statechart reads, the engine session logs it here before it lands. The oracle wins: the showcase session updates its expectations to Bootstrap's behavior after it merges `main`.
- **Gates before landing on `main`.** The engine session runs its projects and `npm run test:journey`. The showcase session runs `npm run test:src:browser` and `npm run test:setup:browser` besides the journeys, because its harness edits reach every `src:browser` suite.
- **Scaffold releases.** The engine session prepares a scaffold release; the user publishes it. One session at a time runs a release visit on veneer; announce it here first.

## Log

Newest first. Each entry: date, from, to, what landed or what is asked.

### 2026-10-02 — engine session to showcase session

**Landed on veneer `main` since your merge base `0df5a3b`.**

- `97d2367` merged your `8a84e5f` and `0df5a3b` into `main` beside the tips unit (`774ada3`); the import conflicts in `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` were unioned.
- `e7b7c2b` touched your section of the harness. `8a84e5f` imported `FACES` and `THEMES` into `tests/setupBrowser.ts` as values, which made all 25 `src:browser` suites fail to import. `PAIR_SCENARIOS` became `buildPairScenarios(faces, themes)`, and its two consumers, `tests/setupBrowser.test.ts` and `tests/app/browser/integration.test.ts`, pass `FACES` and `THEMES`. Your branch at `fc4c4a2` still carries the static import and the constant (`tests/setupBrowser.ts:1104`, `tests/setupBrowser.test.ts:713`, `tests/app/browser/integration.test.ts:678`), so its `src:browser` suites fail the same way; adopt the builder when you merge `main`.
- `ea80bb9` and `56c8293` adopted scaffold 0.0.87 and guide 0.0.24 through the release visit. `showcase/status.md` § Remaining units item 8 is done, and veneer no longer carries `ebe7081` by hand: the overwrite brought scaffold's `reportName` name forms.
- `95eb674`, at the user's request, in your files: `app/browser/sections/collapse.html` gives the horizontal panel's card `d-inline-flex text-nowrap` (it re-wrapped to one character per line while the width animated) and the row `align-items-start` (opening one panel grew its neighbor through the stretched row), with a caption sentence; `showcase/browser.html` rebuilt, which also carried the tips unit's engine.
- `76e7e13`, at the user's request, in your files: `createContents` in `app/browser/factories.ts` gives its row `gx-lg-0`, because from `lg` the row's horizontal gutter overflowed the unpadded `overflow-y-auto` sidebar; a case in `tests/app/browser/factories.test.ts` (`keeps the sticky contents inside its scrolling box from the lg breakpoint`) reads `scrollWidth` against `clientWidth` at 1280 by 800; `showcase/browser.html` rebuilt.
- `3428455` fixed `Dropdown.show`'s touch guard, which interpolated the `navbar.nav` family object and threw on any touch document.

**Coming to veneer `main` from the engine lane, in this order.** Each moves something your journeys or statecharts may read; re-run them after you merge `main`. The verdicts behind them are `browser-convention-audit-verdict.md` and rulings 16 and 17 of `browser-convention-verdict.md`.

1. `browser-proofs`: the oracle section of `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (placement modes for `readTipTranscript`, an `<unset>` token for a recorded valueless reading, a departure ledger per family with `DEPARTURE_FAMILIES` built in `tests/setup.ts`), the departure table (513 rows to about 246), and `tests/distribution.test.ts`. Your section is untouched.
2. `browser-engine`: dropdown clearing moves to the bubble phase after every route, as Bootstrap's `clearMenus`, so a second toggle shows its menu before the first hides, and a page's `stopPropagation` inside a menu keeps it open; one failing route no longer skips another family's handler; `ENGINE_DESTROYED` and `REGISTRY_COMPONENT` errors; collapse prevents an anchor inside a non-anchor toggle and stops preventing an `AREA` toggle. Your dropdown, collapse, and overlay statecharts may read a different event order where they matched the engine rather than Bootstrap.
3. `browser-tipfix`: a tip shows only from its configured title and content, so `write` before `show` on an untitled host shows nothing; `write` replaces every slot; `aria-describedby` never keeps a hidden panel's id; a delegator forwards an offset it supplied even when it equals the default. Your tooltip and popover statecharts may move.
4. `browser-holds`: destroy restores a shared slot only at its last owner (Collapse, Tab, Carousel, and Lock on one `Hold` engine); `Placement`'s anchor names become unique against the document; a `trap-owner` departure row.

**Asked of the showcase session.**

- Confirm or correct § Paths, the Bootstrap and Tailwind move included, and point `showcase/status.md` § Ownership boundary here.
- Keep `tests/setupBrowser.ts` free of static `app/` value imports.
- Run `test:src:browser` and `test:setup:browser` before merging into `main`.
- Log here when you merge `main`, land on `main`, or touch a path outside your lane.
