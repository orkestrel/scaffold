# Unit F5e SETUP-CONVENTION — report

Every obligation is done. The deviation that stands: acceptance criterion 6 cannot reach green inside
the owned files, because `tests/setupBrowser.ts` is off-limits and its TSDoc still names
`tests/setupCases.ts`. The exact patch for it is later in this report, under § Deviations.

## Obligation 1 — the styles setup module is one module again

`tests/setupStyles.ts` now carries every export of the deleted `tests/setupCases.ts` and
`tests/setupCalibration.ts`, each once, unrenamed, with its declaration and doc body unchanged
apart from the doc references listed later. The module reads as sections under one header, each
introduced by a `//` comment: the cascade readers, direction predicates, and selector grammar
(currently around line 15); the frozen case tables and markup strings (currently around line 780);
the retained value lists and settled readings (currently around line 2045). `BootstrapScope` and
`BOOTSTRAP_SCOPE_PATTERNS` are local declarations instead of imports, and `TOKEN_NAMES` from
`@src/core` joined the import block.

Doc references rewritten inside the merged module, each because its target moved:

- In the `extractBootstrapVariables` doc, the retained value tables are named as later in this
  module rather than in `tests/setupCalibration.ts`.
- In the `ELEMENT_TAGS` doc, the partial-column reader is `tests/setupStyles.test.ts` rather than
  `tests/setupCases.test.ts`.
- In the `VENEER_GUIDE_PATH` doc, the Node-only counterpart is `tests/setupServer.ts` rather than
  `tests/setupConformance.ts`.
- In the `BOOTSTRAP_ROOT_VARIABLES`, `BOOTSTRAP_DARK_VARIABLES`, `RETAINED_COLOR_ALIASES`,
  `RETAINED_LENGTH_ALIASES`, and `CUSTOMIZATION_RECIPE` docs, the asserting proof is
  `tests/setupStyles.test.ts` rather than `tests/setupCalibration.test.ts`, and the
  `extractBootstrapVariables` reader is named as earlier in this module rather than in
  `tests/setupStyles.ts`.

`tests/setupStyles.test.ts` now carries the cases of the folded proofs in one
`describe('styles setup')` block, in section order matching the module, with a `//` comment before
the case-table cases and before the calibration cases. The inventory case of each folded proof is gone, replaced by
one exact sorted-list comparison over `Object.keys(setup)`.

Files touched: `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`,
`tests/src/styles/**` (import lines only), and the deleted `tests/setupCases.ts`,
`tests/setupCases.test.ts`, `tests/setupCalibration.ts`, `tests/setupCalibration.test.ts`.

**Merged inventory size: 98 exports.** Read from the passing case, which reddens on a mutation —
see § The inventory case distinguishes its mutation.

## Obligation 2 — the Node-only helpers are the server setup module

`git mv tests/setupConformance.ts tests/setupServer.ts` and
`git mv tests/setupConformance.test.ts tests/setupServer.test.ts`, both recorded as renames by
`git status`. No export's name or body changed.

The module header now reads:

```text
// Server setup: the Node-only helpers the conformance and distribution proofs measure this
// workspace with — the Bootstrap identity digests, the readers over the guide and the built
// cascade, the oracle recorder, the specifier reader, and the source, build, and dependency
// sweeps. Node-only, so it takes `node:*` imports and anchors every path it reads at
// `WORKSPACE_ROOT`. The `conformance` project loads it from `tests/conformance.test.ts`, the
// `distribution` project from `tests/distribution.test.ts`, and the `setup` project from
// `tests/setupServer.test.ts` and `tests/setupStyles.test.ts`, each of which reads the installed
// cascade through `readBootstrapCascade`. A helper added here runs under every one of them.
```

The proof's header names the server setup module, and its `describe('setupConformance')` is now
`describe('server setup')`. Its inventory case is unchanged apart from that rename.

Importers updated to `./setupServer.js`: `tests/conformance.test.ts`, `tests/distribution.test.ts`,
`tests/setupStyles.test.ts`, `tests/setupServer.test.ts`, and (before their deletion)
`tests/setupCases.test.ts` and `tests/setupCalibration.test.ts`.

## Obligation 3 — the load-time listener is a fixture

`git mv tests/setupListeners.ts tests/fixtures/entryListener.ts`, content and load-time behaviour
unchanged. `tests/src/browser/index.test.ts` imports `'../../fixtures/entryListener.js'` inside the
recorded action.

**The policy sweep admits the placement.** `npm run test:policy` exits 0 with
`Tests  109 passed | 1 skipped (110)`. It refused nothing, so this obligation did not stop.
`npm run test:src:browser` exits 0 with `Tests  65 passed (65)`, which is the run of the case that
reads the listener.

## Obligation 4 — the guide

`guides/veneer.md` § Files drops the `tests/setupCases.ts` and `tests/setupCalibration.ts` rows and
carries these rows in their place, padded to the table's existing 142-character row width:

```text
| `tests/setupStyles.ts`                  | The cascade readers, direction predicates, normalizer, case tables, and retained value lists.    |
| `tests/setupServer.ts`                  | The Node-only digests, readers, oracle recorder, and sweeps the conformance proofs measure with. |
| `tests/fixtures/entryListener.ts`       | The document listener installed at load that the browser entry proof records.                    |
```

These § Files sentences changed, and nothing else in the section:

- The mandated-pair paragraph names `MANDATED_TAG_PAIRS` in `tests/setupStyles.ts`.
- The setup-module paragraph now splits the modules by host rather than by content kind, naming
  `tests/setupStyles.ts` as the host-independent module and `tests/setupServer.ts` as the Node-only
  one.
- § Deferred selectors names `readDeferrals` in `tests/setupServer.ts`.

§ Tests names the proof by its new path: `[the Node-only readers and recorder](../tests/setupServer.test.ts)`.

`npm run test:guides` exits 0, which is the gate over the guide's relative links and its linked test
files.

## The inventory case distinguishes its mutation

The merged inventory case is `expect(Object.keys(setup).sort()).toEqual([98 names].sort())`. The
mutation that must make it fail is one added or removed export of the merged module. Planting
`export const PLANTED_PROBE = 1` at the end of `tests/setupStyles.ts` turned
`npm run test:setup` red: exit 1, `Tests  1 failed | 146 passed (147)`, with `+   "PLANTED_PROBE",`
in the diff the failure printed. Removing the plant returned it to exit 0,
`Tests  147 passed (147)`. The plant was appended and stripped as an exact byte suffix; the file's
diffstat is identical before and after, and every gate in the following chain ran after the
removal.

## Commands and exit codes

The following chain ran after the final edit to the tree, which was the plant removal in
`tests/setupStyles.ts`. Every reading is from that run.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm --version` | 0 | `11.19.1` |
| `npm run format:check` | 0 | all matched files correctly formatted |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | no diagnostics |
| `npm run build` | 0 | built |
| `npm run build:src` | 0 | built |
| `npm run test:setup` | 0 | `Tests  147 passed (147)` |
| `npm run test:setup:browser` | 0 | `Tests  45 passed (45)` |
| `npm run test:src:styles` | 0 | `Tests  413 passed (413)` |
| `npm run test:src:browser` | 0 | `Tests  65 passed (65)` |
| `npm run test:conformance` | 0 | `Tests  11 passed (11)` |
| `npm run test:guides` | 0 | `Tests  18 passed (18)` |
| `npm run test:policy` | 0 | `Tests  109 passed | 1 skipped (110)` |

These ran earlier in the unit, after the guide edit and before the plant, over a tree whose only
later change was the plant and its removal:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:src:core` | 0 | `Tests  8 passed (8)` |
| `npm run test:app` | 0 | `Tests  26 passed (26)` |
| `npm run test:journey` | 0 | `Tests  88 passed | 4 skipped (92)` |
| `npm run test:config` | 0 | `Tests  173 passed | 1 skipped (174)` |
| `npm run test:distribution` | 0 | `Tests  13 passed | 4 skipped (17)` |

**Observation, not a criterion.** I did not run the whole chain `npm test`. Every project it visits
ran here individually and exited 0, so the chain's expected reading is green, but that is an
inference rather than a measurement, and the authoritative whole-suite run belongs to the
Orchestrator after this unit exits.

## Acceptance criteria

| Criterion | State | Evidence |
| --- | --- | --- |
| 1. `ls tests/*.ts` holds the fixed set | met | `config.test.ts conformance.test.ts distribution.test.ts guides.test.ts policy.test.ts setup.test.ts setup.ts setupBrowser.test.ts setupBrowser.ts setupPolicy.ts setupServer.test.ts setupServer.ts setupStyles.test.ts setupStyles.ts` |
| 2. `format:check`, `lint:check`, `check` exit 0 | met | preceding table |
| 3. `test:setup`, `test:setup:browser` exit 0 | met | preceding table |
| 4. `build:src && test:src:styles && test:src:browser && test:conformance` exit 0 | met | chain exit 0 |
| 5. `test:guides`, `test:policy` exit 0 | met | preceding table |
| 6. the name sweep prints nothing | **not met** | TSDoc in the off-limits `tests/setupBrowser.ts`; see § Deviations |
| 7. `git status --porcelain` lists owned files only | met | status output that follows |

## Deviations

### Criterion 6 cannot be met inside the owned files

- **Expected.** `grep -rn 'setupCases|setupCalibration|setupConformance|setupListeners' tests src app guides configs vite.config.ts` prints nothing.
- **Found.** It prints these lines, each TSDoc inside `tests/setupBrowser.ts`:

```text
tests/setupBrowser.ts:994: *   `tests/setupCases.ts` names.
tests/setupBrowser.ts:996: *   `MANDATED_TAG_PAIRS` table in `tests/setupCases.ts`. A nesting reported for one of them is not
```

- **Evidence of the conflict.** The brief's Scope names `tests/setupBrowser.ts` off-limits, and
  Obligation 1 states that nothing under it changes. Criterion 6 bounds its sweep over all of
  `tests`, which includes that file. No edit inside the owned files can clear the sweep.
- **Done or not done.** Every obligation is done. This criterion alone is not met.
- **Hypothesis.** The criterion was written from the importer list, which is import statements
  only, and each remaining hit is prose rather than an import.

The patch, for the Orchestrator to apply serially. Locate it by the `scanPositionalPairs` TSDoc
block, at its `@param tags` and `@param mandated` tags.

```diff
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@
  * @param tags - The tags to mount, such as the distinct values the `ELEMENT_TAGS` table in
- *   `tests/setupCases.ts` names.
+ *   `tests/setupStyles.ts` names.
  * @param mandated - The ancestor and descendant pairs the HTML content model mandates, such as the
- *   `MANDATED_TAG_PAIRS` table in `tests/setupCases.ts`. A nesting reported for one of them is not
+ *   `MANDATED_TAG_PAIRS` table in `tests/setupStyles.ts`. A nesting reported for one of them is not
  *   a finding, because the markup has nowhere else to write that child.
```

That patch changes comment text only, so it moves no gate. I did not run any gate with it applied.

### No other deviation

No moved export is pinned differently in its new home. The policy sweep refused nothing. No gate
failed inside the owned files. Every file the brief names resolved.

## Choices I settled and recorded

The deviation contract gives these to me.

- **Section order inside the merged module.** Readers and predicates first, then the case tables,
  then the calibration values, matching the order the header sentence names them in.
  `extractBootstrapVariables` references `BOOTSTRAP_SCOPE_PATTERNS` from a later section; the
  reference is inside a function body, so it resolves at call time and `npm run check` and
  `npm run lint:check` both exit 0 over it.
- **The merged inventory case title.** `exports the cascade readers, the direction predicates, the
  selector grammar the normalizer stands on, the frozen case tables, and the retained value lists`.
- **The fixture's file name.** `tests/fixtures/entryListener.ts`, after the
  `ENTRY_LISTENER_CONTROL` export it carries.
- **Duplicate import statements.** Merging the case and calibration modules into the styles module left some proofs importing
  `setupStyles.js` more than once. I merged each file's named imports into one statement:
  `tests/setupBrowser.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/styles/mixins.test.ts`,
  `tests/src/styles/tokens.test.ts`, `tests/src/styles/components/button.test.ts`,
  `tests/src/styles/components/table.test.ts`, `tests/src/styles/elements/button.test.ts`. Every
  other `tests/src/styles/**` file changed one import specifier and nothing else.
- **Unused named imports dropped.** The old `tests/setupCases.test.ts` imported names its
  cases never referenced outside the inventory string list — every `BUTTON_*` and `TEXT_*` name and
  `IMAGE_SOURCE`. The merged proof imports only what its cases reference; the merged inventory case
  reads those names through `Object.keys(setup)`.

## `git status --porcelain`

```text
 M guides/veneer.md
 M tests/conformance.test.ts
 M tests/distribution.test.ts
R  tests/setupListeners.ts -> tests/fixtures/entryListener.ts
 M tests/setupBrowser.test.ts
 D tests/setupCalibration.test.ts
 D tests/setupCalibration.ts
 D tests/setupCases.test.ts
 D tests/setupCases.ts
RM tests/setupConformance.test.ts -> tests/setupServer.test.ts
RM tests/setupConformance.ts -> tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/browser/index.test.ts
 M tests/src/styles/components/button.test.ts
 M tests/src/styles/components/container.test.ts
 M tests/src/styles/components/grid.test.ts
 M tests/src/styles/components/icon-link.test.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/components/link.test.ts
 M tests/src/styles/components/list.test.ts
 M tests/src/styles/components/quote.test.ts
 M tests/src/styles/components/ratio.test.ts
 M tests/src/styles/components/table.test.ts
 M tests/src/styles/components/type.test.ts
 M tests/src/styles/elements/a.test.ts
 M tests/src/styles/elements/abbr.test.ts
 M tests/src/styles/elements/address.test.ts
 M tests/src/styles/elements/b.test.ts
 M tests/src/styles/elements/blockquote.test.ts
 M tests/src/styles/elements/button.test.ts
 M tests/src/styles/elements/code.test.ts
 M tests/src/styles/elements/details.test.ts
 M tests/src/styles/elements/dl.test.ts
 M tests/src/styles/elements/fieldset.test.ts
 M tests/src/styles/elements/figure.test.ts
 M tests/src/styles/elements/heading.test.ts
 M tests/src/styles/elements/hr.test.ts
 M tests/src/styles/elements/iframe.test.ts
 M tests/src/styles/elements/img.test.ts
 M tests/src/styles/elements/input.test.ts
 M tests/src/styles/elements/kbd.test.ts
 M tests/src/styles/elements/label.test.ts
 M tests/src/styles/elements/mark.test.ts
 M tests/src/styles/elements/ol.test.ts
 M tests/src/styles/elements/optgroup.test.ts
 M tests/src/styles/elements/output.test.ts
 M tests/src/styles/elements/p.test.ts
 M tests/src/styles/elements/pre.test.ts
 M tests/src/styles/elements/progress.test.ts
 M tests/src/styles/elements/samp.test.ts
 M tests/src/styles/elements/select.test.ts
 M tests/src/styles/elements/small.test.ts
 M tests/src/styles/elements/strong.test.ts
 M tests/src/styles/elements/sub.test.ts
 M tests/src/styles/elements/sup.test.ts
 M tests/src/styles/elements/svg.test.ts
 M tests/src/styles/elements/table.test.ts
 M tests/src/styles/elements/textarea.test.ts
 M tests/src/styles/elements/tr.test.ts
 M tests/src/styles/elements/ul.test.ts
 M tests/src/styles/elements/var.test.ts
 M tests/src/styles/index.test.ts
 M tests/src/styles/integration.test.ts
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/tokens.test.ts
 M tests/src/styles/utilities/gap.test.ts
```

## `git diff --stat HEAD`

```text
 guides/veneer.md                                   |   25 +-
 tests/conformance.test.ts                          |    2 +-
 tests/distribution.test.ts                         |    2 +-
 .../entryListener.ts}                              |    0
 tests/setupBrowser.test.ts                         |    3 +-
 tests/setupCalibration.test.ts                     |  107 --
 tests/setupCalibration.ts                          |  491 ------
 tests/setupCases.test.ts                           |  601 -------
 tests/setupCases.ts                                | 1269 --------------
 ...etupConformance.test.ts => setupServer.test.ts} |   10 +-
 tests/{setupConformance.ts => setupServer.ts}      |   14 +-
 tests/setupStyles.test.ts                          |  689 +++++++-
 tests/setupStyles.ts                               | 1772 +++++++++++++++++++-
 tests/src/browser/index.test.ts                    |    2 +-
 tests/src/styles/components/button.test.ts         |    4 +-
 tests/src/styles/components/container.test.ts      |    2 +-
 tests/src/styles/components/grid.test.ts           |    2 +-
 tests/src/styles/components/icon-link.test.ts      |    2 +-
 tests/src/styles/components/image.test.ts          |    2 +-
 tests/src/styles/components/link.test.ts           |    2 +-
 tests/src/styles/components/list.test.ts           |    2 +-
 tests/src/styles/components/quote.test.ts          |    2 +-
 tests/src/styles/components/ratio.test.ts          |    2 +-
 tests/src/styles/components/table.test.ts          |    4 +-
 tests/src/styles/components/type.test.ts           |    2 +-
 tests/src/styles/elements/a.test.ts                |    2 +-
 tests/src/styles/elements/abbr.test.ts             |    2 +-
 tests/src/styles/elements/address.test.ts          |    2 +-
 tests/src/styles/elements/b.test.ts                |    2 +-
 tests/src/styles/elements/blockquote.test.ts       |    2 +-
 tests/src/styles/elements/button.test.ts           |    8 +-
 tests/src/styles/elements/code.test.ts             |    2 +-
 tests/src/styles/elements/details.test.ts          |    2 +-
 tests/src/styles/elements/dl.test.ts               |    2 +-
 tests/src/styles/elements/fieldset.test.ts         |    2 +-
 tests/src/styles/elements/figure.test.ts           |    2 +-
 tests/src/styles/elements/heading.test.ts          |    2 +-
 tests/src/styles/elements/hr.test.ts               |    2 +-
 tests/src/styles/elements/iframe.test.ts           |    2 +-
 tests/src/styles/elements/img.test.ts              |    2 +-
 tests/src/styles/elements/input.test.ts            |    2 +-
 tests/src/styles/elements/kbd.test.ts              |    2 +-
 tests/src/styles/elements/label.test.ts            |    2 +-
 tests/src/styles/elements/mark.test.ts             |    2 +-
 tests/src/styles/elements/ol.test.ts               |    2 +-
 tests/src/styles/elements/optgroup.test.ts         |    2 +-
 tests/src/styles/elements/output.test.ts           |    2 +-
 tests/src/styles/elements/p.test.ts                |    2 +-
 tests/src/styles/elements/pre.test.ts              |    2 +-
 tests/src/styles/elements/progress.test.ts         |    2 +-
 tests/src/styles/elements/samp.test.ts             |    2 +-
 tests/src/styles/elements/select.test.ts           |    2 +-
 tests/src/styles/elements/small.test.ts            |    2 +-
 tests/src/styles/elements/strong.test.ts           |    2 +-
 tests/src/styles/elements/sub.test.ts              |    2 +-
 tests/src/styles/elements/sup.test.ts              |    2 +-
 tests/src/styles/elements/svg.test.ts              |    2 +-
 tests/src/styles/elements/table.test.ts            |    2 +-
 tests/src/styles/elements/textarea.test.ts         |    2 +-
 tests/src/styles/elements/tr.test.ts               |    2 +-
 tests/src/styles/elements/ul.test.ts               |    2 +-
 tests/src/styles/elements/var.test.ts              |    2 +-
 tests/src/styles/index.test.ts                     |    7 +-
 tests/src/styles/integration.test.ts               |    2 +-
 tests/src/styles/mixins.test.ts                    |    3 +-
 tests/src/styles/tokens.test.ts                    |    8 +-
 tests/src/styles/utilities/gap.test.ts             |    2 +-
 67 files changed, 2540 insertions(+), 2575 deletions(-)
```

## `ROADMAP.md` patch (report-only)

The stale module names follow. The F5b row names no module, so it needs no patch.

§ Standing conditions, the Bootstrap version-pin row, `Site` column:

```diff
--- a/ROADMAP.md
+++ b/ROADMAP.md
-| The conformance setup pins Bootstrap by version and tarball identity through its `BOOTSTRAP_VERSION` constant. | ... | `tests/setupConformance.ts` |
+| The conformance setup pins Bootstrap by version and tarball identity through its `BOOTSTRAP_VERSION` constant. | ... | `tests/setupServer.ts` |
```

Apply it as the literal substring `tests/setupConformance.ts` to `tests/setupServer.ts` on that
row, so the cell padding is decided by whoever re-aligns the table.

§ Routing, the `F5a ACCOUNTING-SPLIT` row, outcome column:

```diff
-the styles setup module split into case tables and readers
+the styles setup module split into case tables and readers, folded back by F5e SETUP-CONVENTION
```

The roadmap carries no `F5e` row, so the Orchestrator decides whether to add one.

## Claims of mine that are unverified

- The whole-chain `npm test` reading, as stated in § Commands and exit codes. I inferred it; I did
  not measure it.
- The `ROADMAP.md` patches are untested. That file is report-only here, so I applied no patch to it
  and ran no gate over it.
- The `tests/setupBrowser.ts` patch is untested for the same reason.
