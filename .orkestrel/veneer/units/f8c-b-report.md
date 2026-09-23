# F8c-B MOVE: report (`f8c-b-brief.md`)

Executor: `opus` on Opus 5.5, a native Claude subagent. It was the sole writer in `/home/user/veneer-f8b` (branch `unit/f8b`, checkpoint `b9c0b0a`). Nothing is committed.

The Tailwind proofs run in Node under the `service` project from `tests/service/tailwind/`. The browser proofs, the wrapper, the `test:src:tailwind` script, and the browser readers they alone used are gone. Every gate the brief names exits 0. An edit to another `ROADMAP.md` row and a `Readiness` member added for claim 8 need your ruling. See § Deviations.

## Touched files

- `tests/service/tailwind/profiles.test.ts` (added): the stylesheet-profiles proof. It reads structure through `SheetReader` and opens no browser.
- `tests/service/tailwind/consumer.test.ts` (added, from `shared.test.ts`): the consumer-pairing proof. It reads structure through `SheetReader` and computed values through `stage`.
- `tests/service/tailwind/preflight.test.ts` (added): the preflight-pairing proof. `stage.expand` supplies its property population and `stage.read` its computed values. F8b F6 is struck and its case retitled.
- `tests/tailwind/` (deleted): the browser proofs.
- `configs/src/vite.tailwind.config.ts` (deleted).
- `package.json`: the `test:src:tailwind` script and its `test:src` clause are removed.
- `tests/setupBrowser.ts`: the deleted readers are removed (§ Deletions lists them). The TSDoc of `readCascadeSheet` now points at `tests/src/styles/index.test.ts` and `tests/setupBrowser.test.ts`. The stale remarks on `collectLayerRules` and `collectLayerOrder` are reworded.
- `tests/setupBrowser.test.ts`: the cases, imports, and inventory rows of the deleted readers are removed. The kept cases `walks every named sheet …` and `reads one named layer out of the sheets …` load their sheets through `scene.load(...).sheet` in place of `loadSheet`.
- `tests/setup.css`: the header comment is reworded. Every non-comment line is byte-identical; a `diff` of the lines after the comment against `b9c0b0a` is empty.
- `tests/conformance.test.ts`: the D24 exemption, with its reason written beside the filter.
- `tests/setupService.ts` and `tests/setupService.test.ts`: claim 8.
- `guides/veneer.md`: § Files, § Tailwind, § Scripts, § Departures from the workspace rows, and § Tests.
- `guides/README.md`: the Veneer row's Tests cell, and the stylesheet paragraph.
- `ROADMAP.md`: the F8 row, plus one standing-condition row (see § Deviations).

## Moved cases and the reading each takes

Structural readings go through `new SheetReader(css)`. Staged readings go through `stage`.

**`profiles.test.ts` (`stylesheet profiles`)**

| Case | Reading |
| --- | --- |
| `declares the one order line in every profile, and leaves the document order unmoved` | Structural: `statement` of each profile, and `order` of the cascade text followed by the profile text (observation 1) |
| `fills Tailwind reset only under the preflight profile` | Structural: `layers`, `variables`, `selectors` |
| `composes the theme and utilities imports, proved by a candidate the cascade never ships` | Structural: `layers` scoped to `theme` and `utilities`, and the relabelled-`theme` plant read through `layers` and `variables` |
| `places the generated properties layer before the order line, leaving the named layers in order` | Structural: `statement` (`['properties']`, a new assertion), `layers`, `order`, and the order of the cascade followed by the profile |
| `withholds every shared class name the exclusion line names, and emits them without it` | Structural: `selectors`, `names`, `collectSharedNames`, `collectInlineSources`. The floor is `CANDIDATE_FLOOR`, imported rather than repeated |
| `holds every written copy of the exclusion line equal to the profile that declares it` | Text: `collectFencedBlocks(readFileSync(VENEER_GUIDE_PATH))` and the fixture bytes |
| `declares the Tailwind parts each profile is named for, and repeats them in the instrument` | Text |
| `fills the preflight theme block with no token in Veneer's namespace` (replaces `reads Veneer's sheet while a Tailwind stylesheet is loaded`) | Structural: the `theme` declarations of the preflight profile carry no `--vn-` property, and those of the cascade do (observation 2) |

**`consumer.test.ts` (`the consumer pairing`)**

| Case | Reading |
| --- | --- |
| `executes the recipe the guide ships, apart from the markup line each one names` | Text |
| `resolves the cascade import, and declares the order the cascade puts the document in` | Structural: `order`, the `--vn-` token in the `theme` layer (the signature `readCascadeSheet` selects by), and the `components` and `utilities` selectors |
| `derives the shared class names, and mounts an element for every one of them` | Structural for the set, `collectImportantNames(cascade)`, and the exclusion line. Staged for mounting: `stage.read('[class~="NAME"]')` per shared name, so no name needs a selector escape |
| `leaves every shared name resolving to the declaration the cascade ships` | Staged: every longhand of every element carrying a shared name, read before and after `stage.load(consumerProfile)` |
| `keeps an important shared declaration whatever the recipe withholds` | Staged: the longhands that Tailwind's own rule for each branch name declares, from `stage.expand(instrumentProfile)`, read before and after the instrument loads (observation 3) |
| `moves a shared name when the exclusion line is dropped` | Staged: every longhand of `.col-1`, and the move `grid-column-start: auto became 1` |
| `overrides a component declaration with a utility Tailwind alone generates` | Structural: the `.px-8` declarations in `utilities`. Staged: those declarations resolved on a mounted probe element, then the button's padding |

**`preflight.test.ts` (`the preflight pairing`)**

| Case | Reading |
| --- | --- |
| `derives the overlapping tags and the properties the reset declares` | Structural: the overlap from the `selectors` of the `base` layer and `collectTypeSelectors`, and a premise that every non-custom declaration of the profile sits in `base`. Staged: the population comes from `stage.expand(preflightProfile)` (longhands; `border` is absent and `border-top-style` present) |
| `keeps every property the elements layer declares, and records every property the profile moves` (retitled under F8b F6) | Staged: `stage.read(tag, properties)` before and after the profile loads. The elements-layer longhands come from `stage.expand` over the declarations of that layer, one rule per declaration. The `not.toEqual` lines that could not fail are struck with their comment |

The migrated preflight rows match the F8b record. The measured-against-recorded `toEqual` over the unchanged guide table is green under Chromium 141's `expand` normalization.

## Deletions and the `grep -rn` readings

Deleted: `tests/tailwind/profiles.test.ts`, `tests/tailwind/shared.test.ts`, `tests/tailwind/preflight.test.ts`, and the directory itself; `configs/src/vite.tailwind.config.ts`; the `test:src:tailwind` script and its `test:src` clause. From `tests/setupBrowser.ts` and its proof: `loadSheet`, `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`, `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`, `InlineSource`, and `collectInlineSources`, with their cases and inventory rows. Every name the brief says to keep is kept.

The following readings were taken over `tests src app configs guides`:

- `grep -rnw NAME`, run once for each of `loadSheet`, `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`, `collectDeclaredProperties`, and `readComputedSnapshot`, returns nothing.
- `grep -rnw "collectSharedNames\|InlineSource\|collectInlineSources"`, with `tests/setupServer*`, `tests/service/`, and `tests/setupService.test.ts` filtered out, returns nothing. Those remaining hits are the Node declarations in `tests/setupServer.ts` and their consumers.
- Criterion 6: `grep -rn "test:src:tailwind\|src:tailwind\|vite.tailwind.config\|tests/tailwind/" --include=*.ts --include=*.md --include=*.json --include=*.css . --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=tmp` returns nothing (exit 1).
- The only writer of `tmp/tailwind/candidates.txt` is `verifyReadiness`. `grep -rn "candidates.txt\|CANDIDATES_PATH" tests configs src app` returns only `tests/setupService.ts` and its proof.

## Carried findings: failing-first readings

| Finding | Command | Before the fix | After the fix |
| --- | --- | --- | --- |
| D24 | `npx vitest run --config vite.config.ts --no-cache --project conformance -t "imports no forbidden runtime"` | `1 failed \| 16 skipped (17)`, `"forbidden": "@tailwindcss/postcss"` at `tests/setupService.ts`. The reading was taken with the exemption transiently removed and then restored by the exact edit: SHA-256 `0b099508…c1f41b` before and after | `1 passed \| 16 skipped (17)` |
| Claim 8 | `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupService.test.ts` | `1 failed \| 22 passed (23)`. The failing case is `resolveBrowserTarget › refuses a remote endpoint, because the stage launches a local browser and connects to none`, run against the pre-fix code | `23 passed (23)` |

**D24.** The case skips `tests/setupService.ts`, `tests/setupService.test.ts`, and every path under `tests/service/`, with the reason written beside the filter. The bundle and manifest cases are unchanged.

**Claim 8.** The fix changes the following:

- `resolveBrowserTarget` returns `undefined` when `connectOptions` is present, before it falls back to the pinned path.
- `Readiness` gains `endpoint`. `verifyReadiness` fills it from `connectOptions?.wsEndpoint`.
- The browser gate in `scanReadiness` refuses an endpoint first, with the sentence ``The stage launches a local browser and connects to none, so it cannot use the remote endpoint <endpoint>; unset `PLAYWRIGHT_WS_ENDPOINT` ``. It then refuses a missing executable with the existing `npx playwright install chromium` sentence.
- The endpoint case asserts both the `undefined` target (with a pinned executable beside it) and the refusal sentence.

The channel branch and the executable branch are unchanged. The pre-fix run is the mutation "the endpoint branch passing again".

## Mutations (obligation 5)

- Instrument: `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8cb-mutate.py`.
- Log: `f8cb-mutations.log.txt` beside it.
- Each mutation replaces exactly one occurrence, runs `npm run test:service -- --reporter=verbose`, and applies the exact reverse replacement.

| Mutation | Reading | Case that reddens | SHA-256 before = after |
| --- | --- | --- | --- |
| `container` removed from the exclusion line in `tests/setup.css` | `3 failed \| 14 passed (17)` | Profiles only: `withholds every shared class name …`, `holds every written copy of the exclusion line …`, `fills Tailwind reset only under the preflight profile` (the profile emits `.container`) | `1096b128…eefb8823` = |
| Row `a` / `border-bottom-style` removed from the preflight departure table in the guide | `1 failed \| 16 passed (17)` | `the preflight pairing › keeps every property the elements layer declares, and records every property the profile moves` | `e2ff852b…fb7bb` = |
| Cascade import moved after the `@source` rules in the `tailwind` fence of the guide | `1 failed \| 16 passed (17)` | `the consumer pairing › executes the recipe the guide ships, …`. The brief predicted the profiles proof; the recipe-equality case in the consumer proof is the one that reads line order | `e2ff852b…fb7bb` = |
| `@source inline("px-8 font-bold")` emptied in `unexcluded.css` (in place of the out-of-reach cascade `!important` plant) | `2 failed \| 15 passed (17)` | `stylesheet profiles › composes the theme and utilities imports, …` and `› places the generated properties layer before the order line, …` (without the control, no `properties` layer is generated) | `1d0283f2…fcb6d6fdc` = |

After every revert, the green reading is `3 passed (3)` files and `17 passed (17)` tests, exit 0.

As a check outside the table, dropping `!important` from the planted `.col-1` declaration in the consumer important-branch case reddens that case at `expect(branch).toContain('col-1')`. The file's SHA-256 was `75179578…4b31347` before and after the reverse edit.

## Gate exits

All gates were run from `/home/user/veneer-f8b`:

- `npm run format:check`: exit 0 (219 files).
- `npm run lint:check`: exit 0, with no diagnostics.
- `npm run check`: exit 0.
- `npm run test:policy`: exit 0, `109 passed | 1 skipped (110)`. No policy case asks for a mirror of `tests/service/**`.
- `npm run test:config`: exit 0, `173 passed | 1 skipped (174)`.
- `npm run build:src:styles && npm run test:service`: exit 0, `3 passed (3)` files, `17 passed (17)` tests. It took 9.7 s wall including the build, and Vitest reported 6.84 s at load 1.30.
- `npm run test:setup`: exit 0, `4 passed (4)` files, `200 passed (200)` tests.
- `npm run test:setup:browser`: exit 0, `59 passed (59)`, where the checkpoint reported 68. The drop is the deleted reader cases, and the inventory names no deleted export.
- `npm run test:src`: exit 0. It runs `src:core` and `src:browser` (`77 passed (77)`) and then `test:src:styles` (`58 passed (58)` files, `417 passed (417)` tests). No Tailwind project runs.
- `npm run test:conformance`: exit 0, `17 passed (17)`.
- `npm run test:guides`: exit 0, `18 passed (18)`. No `## Surface` row is owed.

The `test` script is unchanged and does not name `test:service`.

## `git status --porcelain`

```text
 M ROADMAP.md
 D configs/src/vite.tailwind.config.ts
 M guides/README.md
 M guides/veneer.md
 M package.json
 M tests/conformance.test.ts
 M tests/setup.css
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
 D tests/tailwind/preflight.test.ts
 D tests/tailwind/profiles.test.ts
 D tests/tailwind/shared.test.ts
?? tests/service/
```

## `git diff b9c0b0a --stat`

```text
 ROADMAP.md                          |   4 +-
 configs/src/vite.tailwind.config.ts |  71 ----------
 guides/README.md                    |  10 +-
 guides/veneer.md                    | 253 ++++++++++++++++++-----------------
 package.json                        |   3 +-
 tests/conformance.test.ts           |   9 ++
 tests/setup.css                     |  16 ++-
 tests/setupBrowser.test.ts          | 197 +++------------------------
 tests/setupBrowser.ts               | 257 +-----------------------------------
 tests/setupService.test.ts          |  25 +++-
 tests/setupService.ts               |  44 +++---
 tests/tailwind/preflight.test.ts    | 115 ----------------
 tests/tailwind/profiles.test.ts     | 209 -----------------------------
 tests/tailwind/shared.test.ts       | 250 -----------------------------------
 14 files changed, 236 insertions(+), 1227 deletions(-)
```

The untracked additions are `tests/service/tailwind/consumer.test.ts` (269 lines), `tests/service/tailwind/preflight.test.ts` (145 lines), and `tests/service/tailwind/profiles.test.ts` (220 lines). Most of the `guides/veneer.md` diff is `oxfmt` re-padding the § Files table and the § Scripts table: each gained a row, or a cell, wider than its column.

## Deviations

1. **A `ROADMAP.md` row outside the F8 row.** The standing-condition row on the mirror law named `tests/tailwind/` as the home of the Tailwind proofs. That is false after this unit, and criterion 6 reddens on it. The unit changed only that path to `tests/service/tailwind/`, within the cell's existing width. To revert, apply the exact reverse edit: `tests/service/tailwind/` back to `tests/tailwind/` in the phrase "so their home is … , outside that glob." Criterion 6 then reddens on that line.
2. **`Readiness` gains `endpoint`.** Design ruling 2 lists `compiler`, `cascade`, and `browser`. Claim 8 requires the browser gate to refuse an endpoint with a sentence of its own, and the pure leaf can only tell that case from a missing executable if the evidence carries it. `PASSING_READINESS` carries `endpoint: undefined`.
3. **Shared-file patch, not applied.** The `collectInlineSources` TSDoc in `tests/setupServer.ts` (owned for carried findings only) still gives a `?raw` import as its example. No proof reads a profile that way any more. The proposed patch:

   ```diff
   - * @param source - The stylesheet text, such as a `?raw` import of a profile or of a guide holding
   - *   a profile in a fence.
   + * @param source - The stylesheet text, such as a profile read from its file or the CSS fences of a
   + *   guide holding a profile.
   ```

4. **Ancillary choices settled in scope:**
   - The profiles proof opens no stage, because none of its readings is computed.
   - The profiles compile at module top level with `await compileProfile(...)`, once per file.
   - The preflight population and the elements-layer longhands are expanded in `beforeAll`, after `stage.open()`.
   - The README row takes `[tests/service](../tests/service)` in its Tests cell. The row lists the concept's test roots, and ruling 6 names the tests column. The stylesheet paragraph names the Tailwind proofs beside the styles suites.
   - The comments on `collectLayerRules` and `collectLayerOrder` in `tests/setupBrowser.ts`, and one comment in its proof, no longer describe a compiled Tailwind profile as their consumer.

## Observations

1. **Document layer order is taken structurally.** The stage exposes no layer-order reading, and the old document-order readings (`collectLayerOrder()` over the page) need a live document. The nearest reading is `new SheetReader(`${cascade}\n${profile}`).order`, which is the first-declaration order across the linked cascade followed by the profile. It is taken in `declares the one order line … document order unmoved` and in `places the generated properties layer …`.
2. **Case `reads Veneer's sheet while a Tailwind stylesheet is loaded`.** Its subject was the browser reader `readCascadeSheet`, which cannot run in Node. `tests/setupBrowser.test.ts` and `tests/src/styles/index.test.ts` still prove that reader against a planted foreign `theme` block. The moved case keeps the measured fact the reader depends on: the `theme` block of the preflight profile carries no `--vn-` token, and the block of the cascade does.
3. **Important-branch case under the stage viewport.** Under the stage's default 1280 px viewport, an all-longhand reading of the `.col-1` elements reported `width`, `inline-size`, `transform-origin`, and `perspective-origin` moving: `94.9844px became 106.656px`. The cause is the unexcluded instrument generating Tailwind's `.container` (`max-width: 80rem`), which widens the container that encloses the columns. The old browser iframe was narrow enough that neither container rule applied. The case now compares the longhands that Tailwind's own rule for each branch name declares, which is the claim the guide states. The guide sentence now ends "for every property that rule declares". The shipped-name case (`leaves every shared name resolving …`) still compares every longhand, and it is green at 1280 px.
4. **R5.** After the wrapper's deletion, readiness alone writes `tmp/tailwind/candidates.txt`. The last run wrote 484 names, where the wrapper's regular expression produced 527 in the Orchestrator's probe. Against that list the `tailwind` profile emits no selector and no layer block: its `layers` and its `selectors` both read `[]`. The instrument emits each `CANDIDATE_FLOOR` member.
5. **Timing.** The load averages were 0.89 to 1.31, and no run hit a timeout.
