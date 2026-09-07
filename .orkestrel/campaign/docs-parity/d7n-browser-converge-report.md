# Report — P.2 `d7n-browser-converge` (browser under the equality gate)

`guides/browser.md` passes the equality gate. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`, and both write directions read `written: 0`. Every acceptance criterion is met. Two defects met on this baseline are reported and not fixed: one is a red test outside my owned files, the other a seed reader limit.

- Checkout `/home/user/fleet/browser`, baseline `44fb2e7` (clean at start). Nothing committed, installed, or discarded; no `git checkout`, `restore`, `stash`, `reset`, or `clean` ran.
- Wall clock: 2026-09-07T20:30:44Z to 2026-09-07T21:04:50Z (34m06s).
- Instruments, all under the gitignored `tmp/d7n-browser-converge/` inside this checkout: `dropin.mjs`, `shapes.mjs`, `tables.py`, `members.py`, `blocks.py`, `facts.py`, `tagline.py`, `cells.py`, `parse.py`, `third.py`, with the work files `methods.tsv`, `rewrites.tsv`, `shapes-core.txt`, `shapes-server.txt`, and the logs `docs-00.txt` … `docs-06.txt`, `red-first.txt`, `to-guide-1.txt`, `to-source-1.txt`, `src-core.txt`, `src-server.txt`.

## Touched files

| File | Change |
| ---- | ------ |
| `tests/guides.test.ts` | The drop-in rebuilt from the pilot's canonical text: the equality case, the example-title pin, the README case, `GUIDE_SPEC`, `README.md` in `ROOT_FILES`, the amended header line |
| `guides/browser.md` | Table headers, the `Shape` idiom and its convention sentences, `#### Classes`, every `Summary` cell, the tagline and its displaced prose, the titled fence's heading, the voice sweep, a new `## Tests` section |
| `README.md` | The pitch blockquote and the onboarding paragraph beneath it |
| `src/core/types.ts`, `src/server/types.ts` | 186 interface-member doc blocks written; description paragraphs rewritten; the facts the retired cells carried restored |
| `src/core/constants.ts`, `src/server/constants.ts` | Each constant's literal named in its description paragraph; the retired `Value` column's facts restored |
| `src/core/errors.ts`, `src/server/errors.ts` | Each error's code named in its description; the guard descriptions given code spans |
| `src/core/factories.ts`, `src/server/factories.ts` | Each factory states the contract it returns; `createBrowser` carries the titled `@example` |
| `src/core/helpers.ts`, `src/core/parsers.ts`, `src/core/compilers.ts`, `src/server/helpers.ts` | Description paragraphs rewritten where the guide cell carried what the block lacked |

Diffstat: `15 files changed, 1455 insertions(+), 899 deletions(-)`.

`git diff -U0 -- src/` filtered to lines that are neither comment text nor blank reports **0** lines: no code token moved.

## Criterion 1 — red-first on the unconverged tree

`PATH=/opt/npm11/bin:$PATH npm run test:guides` after adding the cases, before any convergence — `Test Files 1 failed (1)`, `Tests 3 failed | 198 passed (201)`, exit 1. The three cases and their first lines, verbatim from `tmp/d7n-browser-converge/red-first.txt`:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/browser.md pairs: guide [\"Surface\",\"Surface\",\"Errors\",\"Helpers\",\"Server\",\"Errors\",\"Helpers\",\"Extended helpers\",\"CDPTransportInterface\", … ,\"Drive the core client directly over an injected transport\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:117:20

 FAIL  |guides| tests/guides.test.ts > Browser > keeps every compared summary and example equal to its source
AssertionError: expected [ …(617) ] to deeply equal []
+   "guides/browser.md function createCDPClient: guide \"Create a `CDPClientInterface` bound to the given `CDPTransportInterface`.\" source \"Creates a CDP client bound to the given transport.\"",
+   "guides/browser.md function createBrowserSnapshot: guide \"Create a navigable `BrowserSnapshotInterface` over decoded `BrowserSnapshotInput` data.\" source \"Creates a navigable browser snapshot from decoded serializable data.\"",
```

After convergence the same command reads `Test Files 1 passed (1)`, `Tests 201 passed (201)`, exit 0.

The pin's guide list carries the fence titles and the source list is empty, which is the state Ruling 3 closes. The equality case reports 617 where `npm run docs` reports 618, because the seed compares the pitch and `findDrift` does not.

## Criterion 2 — the headers and the class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`, `Signature`, or `Returns`. No table keeps a `Value` column.

- **`Behavior` → `Summary`** in all 37 `## Methods` tables (`| Method | Returns | Summary |`).
- **`#### Constants`**, core and server: `| Constant | Kind | Value |` → `| Constant | Kind | Shape | Summary |`, `Shape` holding the declared type (Ruling 18, and the brief's "never `Signature`"). The literal each `Value` cell carried moved into the declaration's description paragraph; the check under Criterion 3 names the outcome per row.
- **`#### Errors`**, core and server: `| Error | Kind | Extends | Code | Summary |` → `| Error | Kind | Signature | Summary |`, `Signature` holding `extends Error` or `extends BrowserError`. The retired `Code` column's literal moved into each error's description; a scripted check confirms every one of the nine codes is present in its row's new `Summary`.
- **Guard tables**, core and server: `| Guard | Kind | Narrows to |` → `| Guard | Kind | Shape | Summary |`. The narrowed-type cells are byte-identical to the baseline's (checked).
- **`#### Types`**, core and server, and **`#### Extended types`**: each gained `Summary`, and the extended table gained `Shape` between `Kind` and `Summary` (Ruling 15).
- **`#### Entities` → `#### Classes`** at both sites; every row's `Kind` is `class` in each. No stale `Entities` reference remains (`grep -n 'Entities\|#entities' guides/browser.md README.md guides/README.md` returns nothing). No class is documented under its own H3, so no `### Classes` row had to be added.
- The `#### Extended constants and entities` table is mixed (`const` and `class` rows) and keeps its heading and its `| API | Kind | Summary |` headers, per Ruling 5.
- First-column headers are untouched (Ruling 10): `API`, `Constant`, `Error`, `Guard`, `Type`, `Method`.

**Convention sentences**, one per table carrying `Shape`, between the heading and the table:

- `#### Types` (core), `#### Extended types`: Ruling 15's wording verbatim, plus one added sentence this guide needs — `An extended interface's name comes before `plus`, with the members it adds after.` — because the guide has 11 extending interfaces and the ruled sentence covers no extension. The added sentence is `test`'s converged wording, and it is added the way Ruling 15 adds a guard or constants sentence.
- `#### Types` (server): Ruling 15's wording alone; that table has no extending row.
- `#### Constants` ×2: `A `Shape` cell holds the constant's declared type.`
- Guard tables ×2: `In a guard table a `Shape` cell holds the type the guard narrows to.`

**Hand-rebuild verification.** Every table was split on a pipe not preceded by a backslash. `tmp/d7n-browser-converge/cells.py` compares the rebuilt guide against `git show HEAD:guides/browser.md`:

```text
rows in baseline: 671 rows now: 671
keys missing now: []
keys added now: []
non-Summary cells moved in columns 1 and 2: 0
```

No row was lost or added and no key or `Kind` cell moved. Columns 3 and later moved only where this report names the header change.

## Criterion 3 — the doc blocks rewritten first, then propagated

Direction followed Ruling 6: every block carrying less than its cell was rewritten before any propagation, and the baseline worklist (`tmp/d7n-browser-converge/docs-00.txt`) holds every original cell.

**186 interface members gained a doc block.** The baseline reported 201 method rows as `guide absent source absent`: the guide side was unreachable behind the `Behavior` header, and the interface members carried no doc block at all. Renaming the header exposed the guide's text, which was then rewritten third-person verb-first into each member's own block (`tmp/d7n-browser-converge/methods.tsv`). The remaining 15 rows are `BrowserPageInterface`'s inherited members, which the reader resolves through `BrowserFrameInterface`'s blocks; documenting the base closed all 15 (`source absent` count fell from 201 to 0 in one run). Each imperative cell became a third-person sentence, each noun-phrase cell gained a verb (`One page by index, or the first page.` → `Returns one page by index, or the first page.`), and each compound sentence had its later verbs agreed (`Close the underlying connection and release resources.` → `Closes the underlying connection and releases its resources.`).

**84 description paragraphs rewritten by hand** (`tmp/d7n-browser-converge/rewrites.tsv`), by family:

- **The five factories** state the contract they return: `createCDPClient`, `createBrowserSnapshot`, `createBrowser`, `createCDPTransport`, `createBrowserWriter`.
- **The nine error classes** name their code, which the retired `Code` column carried: `BrowserError`, `BrowserSelectorError`, `CDPError`, `CDPConnectionError`, `CDPTimeoutError`, `BrowserResultLimitError`, `BrowserConnectionError`, `BrowserNotConnectedError`, `BrowserDestroyedError`.
- **The nine guards** put the narrowed type in a code span (`Narrows an unknown value to a `BrowserError`.`), which the writing rules require and the source text lacked.
- **The constants whose literal a reader needs** name it in the description (Ruling 18): `BROWSER_DEFAULT_TIMEOUT_MS`, `BROWSER_WAIT_POLL_INTERVAL_MS`, `BROWSER_DEFAULT_VIEWPORT_WIDTH`, `BROWSER_DEFAULT_VIEWPORT_HEIGHT`, `BROWSER_CODEGEN_BINDING_NAME`, `BROWSER_RESULT_LIMIT`, `BROWSER_RESULT_LIMIT_SENTINEL_PREFIX`, `BROWSER_STOP_LOADING_TIMEOUT_MS`, `BROWSER_FRAME_WORLD_NAME`, `BROWSER_SNAPSHOT_NODE_LIMIT`, `BROWSER_DEFAULT_CDP_PORT`, `BROWSER_DEFAULT_HOST`, `BROWSER_CDP_PROTOCOL`, `BROWSER_CDP_VERSION_PATH`, `BROWSER_CDP_LIST_PATH`, `BROWSER_HEADLESS_ARG`, `BROWSER_PROFILE_PREFIX`, `BROWSER_KILL_GRACE_MS`, `BROWSER_PORT_PROBE_TIMEOUT_MS`, `BROWSER_TRANSPORT_LOSS_DEFER_MS`, `BROWSER_PROCESS_EXIT_CAUSE`, `BROWSER_TRANSPORT_LOSS_CAUSE`, `BROWSER_STORE_ENV_KEY`, `BROWSER_STORE_LINK_NAME`.
- **The decoders and compilers** whose cell carried a behavior or a failure the block did not: `compileGuardedEvaluateExpression`, `normalizeCodegenActions`, `parseCodegenNavigateAction`, `compileCodegenScript`, `readEvaluationResult`, `readBrowserFrames`, `readRareStringData`, `readRareBooleanData`, `readRareIntegerData`, `parseBrowserRect`, `readBrowserAttributes`, `readBrowserSnapshot`, `isBrowserNodeQuery`, `fetchCDPTargets`, `extractBrowserChord`, `readBrowserAXValue`, `readBrowserAccessibility`, `readBrowserCookie`, `readBrowserCookies`, `readBrowserCoverageRanges`, `readBrowserHeaders`, `readBrowserMetrics`, `readBrowserProfile`, `readBrowserProfileFrame`, `readBrowserQuad`, `readBrowserRemoteValue`, `readBrowserScriptCoverage`, `readBrowserScriptIdentifier`, `readBrowserStack`, `readBrowserStorageEntries`, `readBrowserStorageOrigin`, `readBrowserStreamChunk`, `readBrowserStyleCoverage`, `validateBrowserInputOptions`.
- **The two extending interfaces** name their base in the description, because the `Shape` cell holds the members and Ruling 7 puts the relationship in the paragraph: `BrowserPageInterface`, `BrowserSnapshotInterface`.

**Seven facts restored** into blocks that lacked what the retired cell carried (`tmp/d7n-browser-converge/facts.py`): `BrowserSnapshotInput` (the round-trip form), `BrowserActionOptions` (`strict` defaults to `true`, confirmed at `src/core/BrowserLocator.ts:279`), `BROWSER_CODEGEN_SOURCE` (a `contenteditable` fill captured through `input` events), `BROWSER_ENV_PATH_KEYS` (the two key names), `BROWSER_EXECUTABLE_PATHS` (`win32` left empty), `BROWSER_WINDOWS_ROOT_FALLBACKS` (the three environment variables), `BROWSER_STORE_DEFAULT_DIRS` (`/opt/pw-browsers`).

**Two remark sentences pruned** because the rewritten description now repeats them: `normalizeCodegenActions` (the collapse rule) and `BrowserError` (the machine-readable `code`).

**Facts deliberately not carried across**, because the doc block's `@remarks` already held them: `decodeBase64` (the pure-JS note), `findSystemBrowsers` (the resolution precedence and the `'chromium'` default), `removeBrowserProfile` (the guarded temp-directory check), `launchBrowserProcess` (the POSIX and Windows teardown difference), `readFirstLine` (the `where` carriage return), `CDPClientOptions` (the `error` dispatch paths), `CDPTarget` (`category` mirrors `type`), `BrowserDiscoveryResult`, `SystemBrowserOptions`, `BrowserCDPOptions`, `BrowserOptions`, `BrowserWalkOptions`, `BrowserNode`. Each was read in the tree before the cell was overwritten.

**Prose truth corrections.** `readBrowserCookies`: the guide cell said `Network.getCookies`; the code sends `Storage.getCookies` (`src/core/BrowserCookieManager.ts:36`), so the source sentence stands and the guide's is retired. `BrowserPage`: the guide cell said "a single browser page or frame"; the class is top-level only, so the block's "top-level browser page, including its target lifecycle and child frames" stands.

**No landing beside a table was needed.** Every fact a retired cell carried fitted a description paragraph or an existing `@remarks`, so no fact was moved into guide-body prose under Ruling 7.

**Rows whose literal stayed in `Shape`** — every type-alias row, 36 of them, whose cell holds the alias's own type literal: `CDPTransportEventMap`, `CDPHandler`, `CDPClientEventMap`, `BrowserWaitUntil`, `BrowserWaitState`, `BrowserCodegenAction`, `BrowserCodegenEventMap`, `BrowserCodegenLanguage`, `BrowserSessionFunction`, `BrowserRect`, `BrowserWalkOrder`, `BrowserSiblingRelation`, `BrowserNodePredicate`, `BrowserEngine`, `BrowserConnection`, `BrowserStatus`, `SystemBrowser`, `BrowserEventMap`, `BrowserBindingHandler`, `BrowserContextEventMap`, `BrowserDialogCategory`, `BrowserDownloadEventMap`, `BrowserDownloadStatus`, `BrowserMouseButton`, `BrowserNetworkEventMap`, `BrowserOperationOptions`, `BrowserPageEventMap`, `BrowserPagesFunction`, `BrowserRouteHandler`, `BrowserSameSite`, `BrowserScreenshotScale`, `BrowserSelector`, `BrowserTeardownFunction`, `BrowserTransitionFunction`, `BrowserWebSocketEventMap`, `BrowserWorkerCategory`. In each Constants table the literal did **not** stay in `Shape`: the declared type heads that column and the literal sits in the description, per Ruling 18.

**The `--to guide` run**, after the rewrites:

```text
$ npm run docs -- --to guide
wrote guides/browser.md
rows read: 1, disagreements found: 552, written: 551, reported: 1
next: npm run format
$ npx oxfmt --config .oxfmtrc.json --write guides/browser.md
$ npm run docs
rows read: 1, disagreements found: 1          (the pitch alone)
```

A second `--to guide` after the restored facts read `disagreements found: 6, written: 5, reported: 1`.

## Criterion 4 — the titled pair

The primary factory is `createBrowser`, the first `create*` the facts block lists. The first fence demonstrating it is the server quickstart under `## Surface`, a structural heading, so Ruling 9 applies: a heading one level deeper was added directly above that fence, worded as the demonstration it shows — `### Connect to a browser and drive a page`. `grep -n '^#\+ Connect to a browser and drive a page' guides/browser.md` returns one line, and the whole string occurs once in the document. The fence body carries no three-backtick run and no `*/`. No fence moved and the `## Surface` heading stays.

The block was titled first (`@example Connect to a browser and drive a page` in `src/server/factories.ts`), and `grep -rn '@example \S' src --include=*.ts` returns that one line: every other block stays untitled.

Both fence bodies were read before the write. The guide fence demonstrates strictly more than the block's example — the block had the import, `createBrowser()`, and `connect()`; the fence adds the `headless` option, `create()`, `click()`, `screenshot()`, and `destroy()` — so the fence is the fuller side, the block is the one extended, and nothing was deleted (Ruling 14).

`--to source` ran last, after `npm run docs` read the summaries at zero:

```text
$ npm run docs
rows read: 1, disagreements found: 1          (the pair alone)
$ npm run docs -- --to source
wrote src/server/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and the README carries the same blockquote with the same line breaks under its own H1:

```text
> A lightweight Chrome DevTools Protocol automation layer for Chromium-family
> browsers: an environment-agnostic core that drives pages, frames, locators, and
> DOM snapshots over an injected transport, and a Node runtime that finds,
> launches, and connects to the browser itself.
```

The displaced sentences fold into the guide's opening paragraph, which now carries `CDPClient`, `BrowserContext`, `BrowserPage`, `BrowserSnapshot`, and `BrowserCodegen`; the host-free claim (`WebSocket`, `node:*`, filesystem); the `article()` capability through `@orkestrel/html`; the Node pieces `WebSocketCDPTransport`, `Browser`, and the filesystem writer; the two published specifiers; and the `Source:` line with its links, which cannot live in a link-free tagline. It restates none of the tagline's clauses.

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline clause: it names `createBrowser`, the default context, the drive surfaces, injecting a `CDPTransportInterface` off Node, and the `@orkestrel` line. Its old paragraph, which duplicated the core and server inventories, is what the blockquote and the guide now carry.

`npm run test:guides` ran after the README edit (the objective lane's M9): `Tests 201 passed (201)`, exit 0.

## The `## Tests` section

The guide carried none, so one was added at the end, naming the suites that prove it. Its first entry names the equality gate descriptively, with no SQ/MQ/EQ/RQ identifier: the `## Surface` bijection, each `## Methods` table against its interface's call-signature members, every `Summary` cell against its declaration's description paragraph, the titled `Connect to a browser and drive a page` fence against the `@example` block of that title (named by its title, as the pilot names `Create and abort`), and the README pitch against the tagline. The remaining entries group the core and server suites by capability, each link resolving — the guides suite's `resolves every relative link` and `links only to test files that exist` cases pass.

## The voice sweep over prose I own

All-caps emphasis corrected in `guides/browser.md`: `DOC ↔ SOURCE` (two headings), `ONE`, `WITHOUT` (twice), `RESUMABLE`, `NOT` (three sites), `LOCAL DETACH ONLY` (twice), `SAME`, `EXACTLY`, `BOTH`. The source blocks the seed writes from carried `IN-PAGE` and `START` (`compileGuardedEvaluateExpression`, `BROWSER_RESULT_LIMIT`, `BROWSER_RESULT_LIMIT_PATTERN`); each was corrected in the block before propagation, so the cells read in the guide's own voice. Every clause break I wrote uses the spaced em dash.

Counts in prose recast, naming the members instead: `its two readonly members`, `exhaustive, both directions` (two sites), `apply BROWSER_KILL_GRACE_MS three times`, `exactly the two BrowserSnapshotInput members`, `copies and freezes both arrays`, and the README's `two entry points`. `both` was kept where the sentence names its members (`both the HTML and text fields`, `both the core and server entry points`). Retained numbers are values: a rectangle's four numbers, a two-node comparison's arity.

No rewritten sentence borrows a sibling export's name as its product noun. Every extended comment line was rewrapped to its block's width, because the formatter does not reflow comment prose; `npx oxfmt --check` over every owned path exits 0.

A sweep for the substitution table's unconditional rows over `guides/browser.md` and `README.md` (`grep -nEi '\b(via|just|simply|easy|easier|currently|leverage|utilize|performant|robust|and/or|in order to|e\.g\.|i\.e\.|etc\.)\b'`) returns nothing; `npm run test:policy`'s prose sweep confirms it.

## The drop-in's canonical text

`tests/guides.test.ts` was rebuilt from `/home/user/fleet/abort/tests/guides.test.ts` by substitution rather than by hand (`tmp/d7n-browser-converge/dropin.mjs`), so it matches the pilot byte for byte outside the constants. `diff -u` against the pilot now reports only:

- the header line, which reads "The constants that follow are this package's own" (Ruling 13 as amended);
- `GUIDE_SPEC = 'guides/browser.md'`, `MODULES`, and `INTERNAL`, this package's own constants;
- the `createRecorder` and `createAbort` imports and the pilot's `flagship fences` block, which are abort's package-specific executed proof rather than shared drop-in text.

The `INTERNAL` doc block reads "the assertion that follows it fails when a name here stops being stranded". The equality case sits directly after the methods loop and before the examples case, and the examples case is named `documents an example for every Surface function`. `README.md` is in `ROOT_FILES`, whose comment takes the pilot's wording, and the pin uses the guard-and-continue loop with no local type predicate and the both-sides failure line. `GUIDE_SPEC` is used at every site that reads the guide's path: the pin, the README case, and the manifest-row lookup.

## Criterion 6 — the seed at zero

```text
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0                                   EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check <the 15 owned paths>
All matched files use the correct format.                              EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <the 13 owned .ts paths>
                                                                       EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run check
tsc --noEmit --project tsconfig.json; tsc -p configs/src/tsconfig.core.json;
tsc -p configs/src/tsconfig.server.json                                EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
Test Files 1 passed (1); Tests 201 passed (201)                        EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run test:policy
Test Files 1 passed (1); Tests 90 passed | 1 skipped (91)              EXIT 0
```

Observations, not criteria:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:src:server
Test Files 6 passed (6); Tests 148 passed (148)                        EXIT 0
$ PATH=/opt/npm11/bin:$PATH npm run test:src:core
Test Files 1 failed | 38 passed (39); Tests 1 failed | 461 passed (462) EXIT 1
```

The one `src:core` failure is the pre-existing defect reported next; it is red on the untouched baseline too.

## Criterion 8 — the working tree

`git status --short` lists the owned files and nothing else:

```text
 M README.md
 M guides/browser.md
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/server/constants.ts
 M src/server/errors.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
```

## Defects met

**1. `BROWSER_HAR_CREATOR.version` is stale at the baseline, and a test outside my owned files is red because of it.** P.1 bumped `package.json` to `0.0.16`; `src/core/constants.ts` still declares `version: '0.0.15'` inside `BROWSER_HAR_CREATOR`, and `tests/src/core/BrowserHARManager.test.ts:23` compares the two. Measured on the untouched baseline before any edit of mine:

```text
$ npx vitest run --project src:core tests/src/core/BrowserHARManager.test.ts -t 'stamps archives'
 FAIL  |src:core| BrowserHARManager > stamps archives with the version the manifest declares
AssertionError: expected '0.0.15' to be '0.0.16'
 ❯ tests/src/core/BrowserHARManager.test.ts:23:39
 Test Files  1 failed (1)   Tests  1 failed | 5 skipped (6)
```

The fix is a code token in `src/core/constants.ts`, which this unit owns only as doc blocks, so it is left for the Orchestrator. The seed produced it: no `docs` line names it, because the constant's description never carried the version. Every future package whose P.1 bumps the version while a constant stamps it will meet the same red.

**2. The seed's alias reader truncates an intersection type, and no gate objects.** `npm run docs` does not read a `Shape` cell, so the defect surfaced only in my own review. My extractor is not the seed, but the seed's readers share the shape of the problem and the campaign's record should carry it: an alias declared across lines with a trailing `&` reads as its first arm alone. The declaration is

```text
src/core/types.ts:860:export type BrowserOperationOptions = BrowserPointerOptions &
src/core/types.ts:861:	BrowserClickOptions &
src/core/types.ts:862:	BrowserDragOptions
```

and the first generated cell read `` `BrowserPointerOptions &` ``. I corrected it by hand to `` `BrowserPointerOptions & BrowserClickOptions & BrowserDragOptions` ``, then ran a scan for every cell ending in an operator and for every brace member with no matching declaration line: both report zero. The general point for the guide: nothing reads a `Shape` cell, so a cut one passes every gate, which is why the brief's hand-rebuild comparison exists and why I ran the two scans.

No reader or seed defect was met in `@orkestrel/guide` itself: the readers located every cell after the headers changed, `replaceCell` disturbed no cell outside the written column (671 rows compared, zero non-`Summary` cells moved), `--to source` wrote the titled example alone at `written: 1`, and the P16 comparator's terms held — a `{@link}` tag compares as its target's code token, so no `{@link}` in a description paragraph had to be unwrapped.

## Ancillary decisions, recorded

- **The `Shape` idiom for an extending interface.** The ruled sentence covers no extension, so the cell reads `Base plus { data } plus calls`, `test`'s converged form, and the convention sentence gains one added sentence stating it. `BrowserPageInterface` is the only cell carrying two `plus` tokens.
- **An interface that declares no own members** takes its bases alone: `BrowserLocatorClickOptions` reads `` `BrowserPointerOptions plus BrowserClickOptions` ``.
- **`BrowserCodegenAction`**, an alias over a discriminated union of object literals, takes bare member names with the discriminant's literal kept, following Ruling 19: `` `{ action: 'navigate', url } \| { action: 'click', selector } \| … ` ``. Its members' types stay in the declaration.
- **The retired `Code` column's literal** went into each error's description paragraph rather than into prose beside the table, because a description paragraph can hold it and Ruling 7 reserves the prose landing for facts no compared block can hold.
- **The new `### Connect to a browser and drive a page` heading** sits directly under `## Surface`, with the fence's introducing sentence between it and the fence, reworded from "Server quickstart — connect to (or launch) a browser, open a page, drive it:" to "Connect to an already-running browser, or launch one, then open a page and drive it:". The core quickstart fence that follows it in the same section now reads under that heading; I added no second heading, because Ruling 9 adds exactly one and adding another would add a section.
- **The `## Tests` entries are grouped** rather than one bullet per suite, because the package carries 45 test files; every file is named and linked across the group bullets.
- **`## See also`** was not added. The pilot carries one; this guide never had one, and the brief scopes neither it nor `guides/README.md`.

## Deviation state

No deviation stopped the unit. Every item in the brief is closed and every acceptance criterion is met. The two defects reported are the Orchestrator's to route: the stale `BROWSER_HAR_CREATOR.version` needs a writer with `src/core/constants.ts` code in scope, and the truncated-intersection reading is recorded for the campaign rather than for this checkout.

The vendored `tests/config.test.ts` case that reads the shared temporary directory was not run under load, so it carries no reading here.
