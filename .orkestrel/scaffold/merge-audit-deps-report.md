# Unit M1 report — reconcile the audit-deps branch into main

## Deviation: the branch adopts `@orkestrel/guide` names the registry does not publish

Acceptance criterion 2 is not met, and the cause is not a clash between the two sides. It is the
branch's own commit `cced24a` against the dependency the branch itself pins.

- **Expected.** `npm run check` green on the merged sources.
- **Found.** Two errors, both in `tests/guides.test.ts`, and nothing else:

```text
tests/guides.test.ts(7,2): error TS2724: '"@orkestrel/guide"' has no exported member named 'extractFenceImports'. Did you mean 'extractFences'?
tests/guides.test.ts(9,2): error TS2724: '"@orkestrel/guide"' has no exported member named 'findMissingSymbols'. Did you mean 'missingSymbols'?
```

- **Evidence.**
  - `cced24a Adopt the renamed guide helpers in the parity test` rewrites the import to
    `extractFenceImports`, `findMissingSymbols`, and `computeSymbolKey`, stating that
    `@orkestrel/guide` renamed them "in its breaking unit".
  - The branch's own `package.json` pins `"@orkestrel/guide": "^0.0.15"`, and its own
    `package-lock.json` resolves that to `0.0.15` with the same integrity hash `main` resolves. The
    branch did not raise the pin with the adoption.
  - `npm view @orkestrel/guide versions --json` lists `0.0.1` through `0.0.15`. `0.0.15` is the
    newest published version.
  - The installed `0.0.15` publishes the old names at runtime. `node tmp/probe-guide-exports.mjs`:

    ```text
    fenceImports true
    extractFenceImports false
    missingSymbols true
    findMissingSymbols false
    symbolKey true
    computeSymbolKey false
    ```

  - `npm run test:guides` fails the same way: `5 failed | 33 passed | 1 skipped (39)`, every failure
    `findMissingSymbols is not a function` or `extractFenceImports is not a function`.
- **Done.** Every other conflict is resolved, every other gate is green, and every other auto-merged
  file is read and repaired. `tests/guides.test.ts` is left exactly as the merge produced it, with
  the branch's adopted names intact.
- **Not done.** The choice between the two remedies. Both are one edit, and the decision is not
  mine to take:
  - Keep the adoption and raise the pin, when the renaming `@orkestrel/guide` release is about to
    publish. Nothing in this tree changes; the fleet's publish order settles it.
  - Walk the adoption back to `fenceImports` and `missingSymbols` at the import and its seven call
    sites, when that release is not imminent. This reverts a branch commit's intent, which the
    brief's first resolution rule forbids me to do unasked.
- **Hypothesis.** `cced24a` was written against an unpublished `@orkestrel/guide` working tree in the
  fleet campaign and shipped ahead of the release that carries the names.

The merged guide's parity is nonetheless proved green. `tmp/probe-parity.mjs` runs the five blocked
assertions against the merged tree with the names `0.0.15` publishes:

```text
checked Test surface 162 fence imports 89
PARITY GREEN
```

Every source export has its guide row, the guide names no symbol the source lacks, the barrel
matches the sources both ways, and every fence import of `@orkestrel/test` resolves. The five
blocked cases pass the moment the dependency question is settled either way.

## Conflicted files

### `package.json`

Main moved `@types/node` to `^26.4.1`; the branch's dependency sweep read `^26.4.0` on 2026-08-28.
The resolution takes `^26.4.1`. Everything else in the manifest auto-merged as the union at the
newer range: main's `oxfmt ^0.66.0`, `oxlint ^1.81.0`, `vite-plugin-dts ^5.1.0`, `@orkestrel/probe
^0.0.11`, and `@orkestrel/scaffold ^0.0.59`, and the branch's `peerDependencies.vitest ^4.1.11`
raised from `^4.1.0`. `version` stays `0.0.12`.

### `package-lock.json`

Left conflicted, as the brief directs. The conflict is the same single `@types/node` line inside the
root package's mirrored manifest, at line 16. `npm install` regenerates it.

### `src/browser/constants.ts`

Main added `CAPTURE_STAGINGS` with its restaging rationale; the branch rewrote `CONTENT_ROLES`'s
first sentence into the third person. The resolution keeps `CAPTURE_STAGINGS` with every fact
intact and its first sentence migrated to the branch's voice — `Bounds the restagings one capture
takes before it refuses a document whose height never settles.` — and takes the branch's
`Names the roles whose accessible name is the text a reader can see inside them.`

### `src/browser/types.ts`

Main added the `FrameReading` interface; the branch rewrote `CaptureVariant`'s first sentence. The
resolution keeps `FrameReading` with main's facts, in the branch's voice: the block opens
`Represents one written frame, read back from the file a capture produced.`, each member opens with
`Holds`, and the `@remarks` reference to `colorEqual` becomes `matchesColor`, which is the name the
merged tree publishes. `CaptureVariant` takes the branch's sentence.

### `src/core/helpers.ts`

Both sides added one type import to a sorted list — main `StateScenario`, the branch
`SignalRegistration`. The resolution keeps both in sorted position. Both symbols are used in the
merged file: `dropRegistration` takes `SignalRegistration`, and `executeScenario` and
`executeScenarios` take `StateScenario`.

### `tests/src/browser/helpers.test.ts`

Three conflicts, all in one sorted import list. Main added `computeNamePattern`, `measureContent`,
and `readClasses` beside the old `contrast`; the branch removed `colorEqual` and `contrast` and added
`matchesColor`, `parseCSSColor`, `readContrast`, `readPixels`, `readRootToken`, `readStyle`, and
`readToken`. The resolution keeps every added name in sorted position and keeps no renamed-away name.

### `tests/src/core/helpers.test.ts`

Two conflicts, both in import lists. Main added `RecorderInterface`, `StateScenario`,
`createRecorder`, `executeScenario`, and `executeScenarios`; the branch added `SignalRegistration`,
`buildRetryExhausted`, `checkBounds`, and `dropRegistration`. The resolution keeps every one, in
sorted position, and both sides' cases run.

### `guides/test.md`

Six conflicts.

| Region | Main wanted | The branch wanted | The resolution keeps |
| ------ | ----------- | ----------------- | -------------------- |
| Core Helpers table | `executeScenario` and `executeScenarios` rows | `checkBounds`, `buildRetryExhausted`, and `dropRegistration` rows, wider columns, and the `dropRegistration` reach paragraph | Every row, at the branch's column widths, with main's rows appended and the branch's paragraph after the table |
| Browser Helpers table | An `extractStyles` row, and the `style`, `token`, `rootToken`, and `pixels` rows | The `readStyle`, `readToken`, `readRootToken`, and `readPixels` rows | The `extractStyles` row followed by the four renamed rows |
| Portfolio prose | Whole-document coverage and the viewport handed back after a placement, naming `states` | The same passage naming `placements` | Main's facts naming `placements`, rewrapped at 100 columns |
| Candidate table | An `A statechart transition table and its runner` row | An `An outcome triple` row | Both rows, at main's column widths, the outcome triple first |
| Core test inventory bullet | The statechart runner cases | The `checkBounds`, `buildRetryExhausted`, and `dropRegistration` cases | Both sentence groups after the shared opening, the branch's first, rewrapped |
| Browser test inventory bullet | The `measureContent`, `readFrame`, `readClasses`, `extractStyles`, staging-height, and coverage cases, naming `style` | The base inventory rewrapped, naming `readStyle` | Main's full inventory naming `readStyle`, rewrapped |

No fence sits inside any conflict, so no transcribed or routed fence moved.

## Silent clashes found in auto-merged files

Two, both caught by reading and confirmed by the gates.

- **`src/browser/helpers.ts`.** Main's `measureContent` calls `pixels` at five sites; the branch
  renamed that helper to `readPixels`. Repaired. This file merged clean and would have failed
  `check` on it.
- **`tests/src/browser/helpers.test.ts`.** Main's `readFrame` floor assertion calls
  `style(document.documentElement, 'background-color')`; the branch renamed that helper to
  `readStyle`. Repaired.

A scan for every renamed-away name as a call across `src`, `tests`, `configs`, and `scripts` now
returns only CSS `rgba(...)` literals and the HTML `style` attribute in prose. A scan of
`guides/test.md` and `README.md` for the renamed-away names as code tokens returns only the HTML
`style` attribute.

## Voice migration carried onto main's additions

The branch's `5aff09d` states a whole-of-`src` rule: every doc block opens with a third-person verb
sentence. Main's statechart additions landed after that migration and were never subject to it, so
the merged tree would carry a hole in the branch's own invariant. I decided to close it, because the
brief's rule to keep the branch's voice where the sides meet is meaningless if main's new blocks
alone keep the old voice. Facts unchanged in every case:

| File | Symbol | Was | Now |
| ---- | ------ | --- | --- |
| `src/core/constants.ts` | `STATECHART_ATTRIBUTES` | `The attributes a statechart harness publishes, …` | `Names the attributes a statechart harness publishes, …` |
| `src/core/constants.ts` | `STATECHART_STATUSES` | `Every value a statechart harness reports …` | `Lists every value a statechart harness reports …` |
| `src/core/types.ts` | `StateTransition` | `One row of a statechart table: …` | `Represents one row of a statechart table: …` |
| `src/core/types.ts` | `StateTransition.name` | `The row's name, which is prepended …` | `Holds the row's name, which is prepended …` |
| `src/core/types.ts` | `StateTransition.from` | `The state the row arranges before it acts.` | `Holds the state the row arranges before it acts.` |
| `src/core/types.ts` | `StateTransition.event` | `The event the row applies to the arranged entity.` | `Holds the event the row applies to the arranged entity.` |
| `src/core/types.ts` | `StateTransition.to` | `The state the row asserts the entity reached.` | `Holds the state the row asserts the entity reached.` |
| `src/core/types.ts` | `StateScenario.transition` | `The row this scenario drives.` | `Holds the row this scenario drives.` |

A rescan of every doc block under `src` against the branch's set now reports no un-migrated opening.

## The merged export surface

Carry these names to the skills' references and to terrain's suite.

**Renamed by the branch, applied to main's additions.** All browser.

| Was | Now |
| --- | --- |
| `colorEqual` | `matchesColor` |
| `contrast` | `readContrast` |
| `pixels` | `readPixels` |
| `rgba` | `parseCSSColor` |
| `rootToken` | `readRootToken` |
| `style` | `readStyle` |
| `token` | `readToken` |

One interface member renamed with them: `PortfolioInterface.states` is now
`PortfolioInterface.placements`. `CaptureOptions.states`, the registry input, keeps its name.

**Added by the branch.** `Success`, `Failure`, `Result`, `SignalRegistration`, `checkBounds`,
`buildRetryExhausted`, and `dropRegistration` in core; `readErrorCode`, `readIdentity`, and
`requireContained` in server.

**Added by main.** `StateTransition`, `StateScenario`, `STATECHART_ATTRIBUTES`,
`STATECHART_STATUSES`, `executeScenario`, and `executeScenarios` in core; `FrameReading`,
`CAPTURE_STAGINGS`, `computeNamePattern`, `readClasses`, `extractStyles`, `measureContent`, and
`readFrame` in browser.

**Removed.** Nothing beyond the seven renamed-away browser names. Measured against the branch tip,
the merged surface removes nothing at all; measured against main, it removes exactly those seven.
The merged tree publishes 162 source exports, against 152 on main and 149 on the branch.

## Gates, with the lockfile still conflicted

| Command | Result |
| ------- | ------ |
| `npm run format:check` | exit 0 — `All matched files use the correct format.` on 59 files |
| `npm run lint:check` | exit 0 |
| `npm run check` | **exit 2** — the two `tests/guides.test.ts` errors under Deviation, and nothing else |
| `npm run check:src` | exit 0 — core, browser, and server projects each clean |

The runner tolerates the conflicted lockfile; Vitest reads `node_modules`, not `package-lock.json`.
Every project ran.

| Project | Result |
| ------- | ------ |
| `test:src:core` | exit 0 — 107 passed |
| `test:src:browser` | exit 0 — 246 passed |
| `test:src:server` | exit 0 — 143 passed, 9 skipped |
| `test:policy` | exit 0 — 111 passed |
| `test:config` | exit 0 — 46 passed |
| `test:setup` | exit 0 — 24 passed |
| `test:guides` | **exit 1** — 5 failed, 33 passed, 1 skipped; every failure is the deviation |

The browser project reads 246, which is the reading main's `7ef64b8` recorded, so the capture and
resolver work survives the renames intact. The src projects together read 496 passed and 9 skipped,
against the 476 passed and 9 skipped main's `87d8a01` recorded, the difference being the branch's
added leaf cases.

`test:src:core` was re-run after the voice migration and still reads 107 passed.

I did not run `npm run build` or `npm run test:distribution`: both build from a tree whose lockfile
is still conflicted, and the authoritative sweep is the Orchestrator's after `npm install`.

## `git status --porcelain`

```text
M  configs/browsers.ts
UU guides/test.md
UU package-lock.json
UU package.json
UU src/browser/constants.ts
M  src/browser/factories.ts
MM src/browser/helpers.ts
UU src/browser/types.ts
 M src/core/constants.ts
M  src/core/factories.ts
UU src/core/helpers.ts
MM src/core/types.ts
M  src/server/constants.ts
M  src/server/factories.ts
M  src/server/helpers.ts
M  src/server/types.ts
M  tests/guides.test.ts
M  tests/src/browser/factories.test.ts
UU tests/src/browser/helpers.test.ts
UU tests/src/core/helpers.test.ts
M  tests/src/server/helpers.test.ts
```

The index is untouched: I ran no `git add`, and the `UU` entries stay for the Orchestrator to stage.
Only `package-lock.json` still holds conflict markers.

Diffstat against `HEAD`, excluding `package-lock.json`:

```text
 configs/browsers.ts                 |  30 +--
 guides/test.md                      | 442 ++++++++++++++++++++----------------
 package.json                        |   2 +-
 src/browser/constants.ts            |  21 +-
 src/browser/factories.ts            |   2 +-
 src/browser/helpers.ts              |  91 ++++----
 src/browser/types.ts                |  84 +++----
 src/core/constants.ts               |   4 +-
 src/core/factories.ts               |  25 +-
 src/core/helpers.ts                 | 104 ++++++---
 src/core/types.ts                   | 106 ++++++---
 src/server/constants.ts             |   6 +-
 src/server/factories.ts             |  62 ++---
 src/server/helpers.ts               |  92 +++++---
 src/server/types.ts                 |  57 ++---
 tests/guides.test.ts                |  14 +-
 tests/src/browser/factories.test.ts |  14 +-
 tests/src/browser/helpers.test.ts   | 190 ++++++++--------
 tests/src/core/helpers.test.ts      |  92 +++++++-
 tests/src/server/helpers.test.ts    |  87 +++++++
 20 files changed, 917 insertions(+), 608 deletions(-)
```

`package-lock.json` reads `1 file changed, 5 insertions(+), 1 deletion(-)`, which is the retained
conflict alone.

## Instruments

Both are under `tmp/`, which is gitignored, and both are acceptance evidence for claims in this
report.

- `tmp/probe-guide-exports.mjs` — reads the installed `@orkestrel/guide` at runtime and prints
  which of the old and renamed names it publishes.
- `tmp/probe-parity.mjs` — runs the five blocked parity assertions against the merged tree using the
  names `0.0.15` publishes.

## Claims not closed

- **`npm run check` is red** on the two `tests/guides.test.ts` imports. The remedy is the
  Orchestrator's choice, stated under Deviation. Nothing else in the tree blocks it.
- **`npm run build` and `npm run test:distribution` did not run.** Both belong after `npm install`
  regenerates the lockfile.
- **The merged `guides/test.md` candidate-table ordering is mine.** I placed the branch's outcome
  triple before main's statechart row, at main's column widths. Neither side stated an order.
- **The rewrapping of three guide passages is mine.** Blocks 3, 5, and 6 were rewrapped greedily at
  100 columns, the width the branch's own rewrap used. No word changed except `states` to
  `placements` and `style` to `readStyle`.
- **I did not verify the merged tree against `@orkestrel/probe` or `@orkestrel/scaffold` behaviour.**
  Both are development pins the auto-merge took at main's newer range, and no gate I ran exercises a
  difference.
