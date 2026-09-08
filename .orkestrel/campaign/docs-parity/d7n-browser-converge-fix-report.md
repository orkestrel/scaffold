# Report — `d7n-browser-converge-fix` (browser's fix round on the audit's findings)

Every item in the brief is closed and every acceptance criterion is met. `npm run docs` reads `rows read: 1, disagreements found: 0`, both write directions read `written: 0`, and `test:guides`, `test:policy`, and the `test:src:core` observation are green. No deviation stopped the unit.

- Checkout `/home/user/fleet/browser`, baseline `b41f54c` (clean at start). Nothing committed, installed, or discarded; no `git checkout`, `restore`, `stash`, `reset`, or `clean` ran.
- Wall clock: 2026-09-08T01:25:27Z to 2026-09-08T01:44:00Z.
- Instruments, all under the gitignored `tmp/d7n-browser-converge-fix/` inside this checkout: `edit-src.py` (the source doc-block edits as exact single-occurrence replacements, with a width assertion), `edit-docs.py` (the guide and README edits plus the mixed table's split), `cells.py` (the guide's table cells compared against `HEAD`, padding ignored), and `probe-table.md` (the oxfmt markdown-table probe).

## Touched files

| File | Change |
| ---- | ------ |
| `src/core/errors.ts` | `CDPConnectionError`'s compound rewrapped, `CDPError`'s `@remarks` reduced to its branching guidance, `{@link BROWSER_RESULT_LIMIT}` restored |
| `src/core/helpers.ts` | `readBrowserScriptIdentifier`, `readBrowserQuad`, and `readRareBooleanData` rewrapped so `off-shape` sits on one line |
| `src/core/types.ts` | The transport's description settled, and `CDPClientOptions`, `BrowserPageOptions`, `BrowserCodegenOptions` given their backticked tokens |
| `src/server/types.ts` | `BrowserOptions` and `WebSocketCDPTransportOptions` given their backticked tokens; `local detach only` and `remote` lowered |
| `src/core/constants.ts` | `BROWSER_RESULT_LIMIT_PATTERN`'s literal in its description and its rationale in a new `@remarks`; `BROWSER_WAIT_POLL_INTERVAL_MS`'s slack and readiness-probe facts restored; `string length`/`bytes` lowered; `BROWSER_CODEGEN_SOURCE`'s `@remarks` reflowed |
| `src/core/BrowserDiagnostics.ts` | The retired term left the compared cell behind `guides/browser.md:475` |
| `guides/browser.md` | The core quickstart's own heading and lead-in, the surfaces named by what they are, the mixed table split by kind, the pointers, the transport's prose term, and the propagated cells |
| `README.md` | The `createCDPClient` fence and the classes named in the guide pointer |

Diffstat: `8 files changed, 121 insertions(+), 109 deletions(-)`.

`tmp/d7n-browser-converge-fix/cells.py` against `git show HEAD:guides/browser.md`: `keys in baseline: 549 keys now: 549`, `keys missing now: []`, `keys added now: []`. The changed cells it names are exactly the propagated descriptions listed under items B1, B3, B5, and B7. Every other guide table line in the diff is column padding oxfmt rewrote after the widened `BROWSER_RESULT_LIMIT_PATTERN` cell.

## Item 1 (B1, Ruling 22) — hyphens at line ends

`src/core/errors.ts`:

```diff
- * connectable state — not connected, closed while connecting, or the connection dropped mid-
- * request — under the code `BROWSER_CDP_CONNECTION_ERROR`.
+ * connectable state — not connected, closed while connecting, or the connection dropped
+ * mid-request — under the code `BROWSER_CDP_CONNECTION_ERROR`.
```

`src/core/helpers.ts`, the same rewrap at each site:

```diff
- * Decodes the `Page.addScriptToEvaluateOnNewDocument` result, throwing a `BrowserError` off-
- * shape.
+ * Decodes the `Page.addScriptToEvaluateOnNewDocument` result, throwing a `BrowserError`
+ * off-shape.
- * Decodes the first `DOM.getContentQuads` quad and its center, throwing a `BrowserError` off-
- * shape.
+ * Decodes the first `DOM.getContentQuads` quad and its center, throwing a `BrowserError`
+ * off-shape.
- * Decodes CDP snapshot sparse boolean data into a set of node indexes, skipping every off-
- * shape entry.
+ * Decodes CDP snapshot sparse boolean data into a set of node indexes, skipping every
+ * off-shape entry.
```

The sweep over every doc block under `src/**` found no further compound break:

```text
$ grep -rnE '[a-z]-$' src --include=*.ts
                                                                       EXIT 1 (no match)
```

The pre-fix run of that same command named `src/core/errors.ts:58`, `src/core/helpers.ts:476`, `:1417`, and `:1585` and nothing else, which is the whole population the item carries.

## Item 2 (B2, Ruling 22) — the core quickstart's heading

`guides/browser.md:38-41`:

```diff
-Core quickstart — drive the CDP client directly over any transport that
-satisfies `CDPTransportInterface`:
+### Drive the core client over an injected transport
+
+Drive the CDP client from any environment over a transport that satisfies
+`CDPTransportInterface`:
```

The heading sits at the level of `### Connect to a browser and drive a page`, with one lead-in sentence between it and the fence. The titled pair reads at zero: `npm run docs` reports no disagreement, and `tests/guides.test.ts`'s `pairs at least one example title across the guide and the source` passes, so the titled heading keeps only its own fence.

## Item 3 (B3, Ruling 22) — code tokens in cells

`src/core/types.ts`:

```diff
- * Represents a dumb text transport CDPClient sends and receives JSON-RPC frames over.
+ * Represents the text pipe a `CDPClient` sends and receives JSON-RPC frames over.
- * Describes the options for creating a CDPClient.
+ * Describes the options for creating a `CDPClient` instance.
- * Describes the options for creating a browser page.
+ * Describes the options for creating a `BrowserPage` instance.
- * Describes the options for creating a BrowserCodegen recorder.
+ * Describes the options for creating a `BrowserCodegen` recorder.
```

`src/server/types.ts`:

```diff
- * Describes the options for creating a Browser.
+ * Describes the options for creating a `Browser` instance.
- * Describes the options for creating a WebSocketCDPTransport.
+ * Describes the options for creating a `WebSocketCDPTransport` instance.
```

`guides/browser.md:965`, the prose that names the same concept:

```diff
-The text pipe a `CDPClientInterface` sends and receives JSON-RPC frames over.
+The text pipe a `CDPClient` sends and receives JSON-RPC frames over.
```

The guide cell at `:226` and that prose now name the transport the same way. `npm run docs -- --to guide` carried each rewritten description into its cell.

## Item 4 (B4) — surfaces by position

`guides/browser.md:16`:

```diff
-listening on the CDP endpoint; and a filesystem-backed browser writer. Import the first surface from
-`@orkestrel/browser` and the second from `@orkestrel/browser/server`. Source:
-[`src/core`](../src/core) (through `@src/core`) and [`src/server`](../src/server) (through
-`@src/server`).
+listening on the CDP endpoint; and a filesystem-backed browser writer. Import the
+environment-agnostic core from `@orkestrel/browser` and the Node runtime from
+`@orkestrel/browser/server`. Source: [`src/core`](../src/core) (through `@src/core`) and
+[`src/server`](../src/server) (through `@src/server`).
```

## Item 5 (B5, Ruling 22) — the retired term

`guides/browser.md:462` and `:474`, the mixed table split by kind with every row, column, and cell kept:

```diff
-#### Extended constants and entities
+#### Extended constants
 …
 | `BROWSER_VISIBILITY_SOURCE`    | const | Holds the in-page visibility predicate source, … |
+
+#### Extended classes
+
+| API | Kind | Summary |
+| --- | ---- | ------- |
 | `BrowserAccessibility`         | class | Captures Chromium Accessibility-domain snapshots for one page. |
```

The split point is the const-to-class boundary the rows were already sorted at, asserted by `edit-docs.py` before the splice. `cells.py` reports no row lost and none added.

The section's lead paragraph and one compared cell carried the term too, and criterion 4's grep reaches each, so both are closed here:

```diff
-The focused CDP feature layer is grouped into small entities. Managers expose
+The focused CDP feature layer is grouped into small classes. Managers expose
```

```diff
 src/core/BrowserDiagnostics.ts
- * Groups the diagnostic subentities beneath one page.
+ * Groups the tracing, coverage, performance, and profiler classes beneath one page.
```

That cell behind `guides/browser.md:475` names the classes the constructor builds — `BrowserTracing`, `BrowserCoverage`, `BrowserPerformance`, `BrowserProfiler` (`src/core/BrowserDiagnostics.ts:34-37`).

`README.md:57`:

```diff
-For the full surface — the CDP dispatch core, the `BrowserContext` /
-`BrowserPage` / `BrowserCodegen` entities, the server transports, and usage
+For the full surface — the CDP dispatch core, the `BrowserContext`,
+`BrowserPage`, and `BrowserCodegen` classes, the server transports, and usage
```

This package's `tests/guides.test.ts` carries no case that reads guide headings, so the heading split reddens nothing outside the owned files; `npm run test:guides` is green after it.

## Item 6 (B6) — the README's front door

`README.md:46-52`:

```diff
-import { CDPClient } from '@orkestrel/browser'
-import type { CDPTransportInterface } from '@orkestrel/browser'
-
-const transport: CDPTransportInterface = /* your injected transport */
-const client = new CDPClient({ transport })
+import { createCDPClient } from '@orkestrel/browser'
+
+const client = createCDPClient({ transport }) // transport: CDPTransportInterface
 await client.connect()
 const result = await client.send('Page.navigate', { url: 'https://example.com' })
+await client.close()
```

The fence now teaches the factory and the transport comment the guide's core fence teaches, and closes the client it opened. `createCDPClient` is a real export of `@orkestrel/browser` (`src/core/factories.ts:24`); this suite carries no README-fence case, so no gate reads it.

## Item 7 (B7, Rulings 7 and 18) — `BROWSER_RESULT_LIMIT_PATTERN`

`src/core/constants.ts:123`:

```diff
  * Matches the in-page result-limit sentinel error message, anchored immediately after the
- * `Error:` (optionally `Uncaught Error:`) prefix that Chromium prepends to a thrown error's
- * description, so the guard's own throw is recognized only at the start of the message rather
- * than wherever the substring happens to occur.
+ * `Error:` (optionally `Uncaught Error:`) prefix Chromium prepends to a thrown error's
+ * description, `/^(?:Uncaught )?Error: \[\[ORKESTREL_BROWSER_RESULT_LIMIT\]\](\d+)/`.
+ *
+ * @remarks
+ * The anchor matches the guard's own throw only at the start of the message, rather than
+ * wherever the substring happens to occur.
```

The literal is the declaration's own (`src/core/constants.ts:132`, the template string's escapes resolved), and it reaches the guide whole:

```text
guides/browser.md:88 | `BROWSER_RESULT_LIMIT_PATTERN` | const | `RegExp` | Matches the in-page result-limit sentinel error message, anchored immediately after the `Error:` (optionally `Uncaught Error:`) prefix Chromium prepends to a thrown error's description, `/^(?:Uncaught )?Error: \[\[ORKESTREL_BROWSER_RESULT_LIMIT\]\](\d+)/`. |
```

## Item 8 (B8) — dropped facts and a repeated remark

`src/core/constants.ts:136`:

```diff
-/** Sets the poll interval while waiting for a selector to appear, `100` milliseconds. */
+/**
+ * Sets the poll interval while waiting for a selector to appear, `100` milliseconds.
+ *
+ * @remarks
+ * A wait adds the same interval as slack to its own CDP call timeout, so the in-page poll
+ * expires before the call carrying it. Host-side CDP readiness probes wait it out between
+ * attempts.
+ */
```

Both restored facts were read in the tree before they were written: the slack at `src/core/BrowserNavigationManager.ts:63` and `src/core/BrowserLocator.ts:282` (`timeout + BROWSER_WAIT_POLL_INTERVAL_MS`), and the readiness-probe delay at `src/server/helpers.ts:388`.

`src/core/errors.ts:45`:

```diff
  * @remarks
- * Carries the originating `method` plus the CDP error's own `code`,
- * `message`, and `data` (when present) in `context`, so callers can branch
- * on the protocol-level error instead of parsing the message string.
+ * Branch on the protocol-level error in `context` instead of parsing the message string.
```

The description already names `method`, `code`, `message`, and `data` in the context, so the remark keeps the branching guidance alone.

## Item 9 (B9) — the link and the emphasis

```diff
 src/core/errors.ts
- * Reports that an `evaluate()`/`content()` result exceeded `BROWSER_RESULT_LIMIT` and was
- * rejected in-page before it could overflow the CDP transport frame, under the code
+ * Reports that an `evaluate()`/`content()` result exceeded {@link BROWSER_RESULT_LIMIT} and
+ * was rejected in-page before it could overflow the CDP transport frame, under the code
```

```diff
 src/core/constants.ts
- * This counts UTF-16 STRING LENGTH (`String#length`), not transport BYTES —
+ * This counts UTF-16 string length (`String#length`), not transport bytes —
```

```diff
 src/server/types.ts
- *   attached browser this is a LOCAL DETACH ONLY because other clients may
+ *   attached browser this is a local detach only, because other clients may
    share its targets. Idempotent.
- * - `close` — graceful REMOTE shutdown: best-effort sends CDP `Browser.close`
+ * - `close` — graceful remote shutdown: best-effort sends CDP `Browser.close`
```

The local-versus-remote contrast survives in the words themselves. The tag rewrap keeps the guide cell unchanged, because the compared form renders `{@link X}` as its target's code token — `npm run docs` reports no disagreement for `BrowserResultLimitError`.

### The all-caps sweep

Pattern: `\b[A-Z]{3,}\b`. Paths: `src/**/*.ts` and `guides/browser.md`, the brief's own argument list.

```text
$ grep -rnE '\b[A-Z]{3,}\b' src --include=*.ts guides/browser.md
```

Ruled hit by hit, the remaining population is data tokens alone:

- Protocol, format, and domain abbreviations: `CDP`, `JSON`, `RPC`, `URL`, `CSS`, `HAR`, `DOM`, `HTML`, `HTTP`, `PDF`, `PNG`, `JPEG`, `CPU`, `GPU`, `TLS`, `UTF`, `ARIA`, `CHIPS`, `CRLF`, `RFC`, `UTC`, `API`, `AST`, `POSIX`, `README`.
- HTTP methods in guide prose: `GET`, `POST`.
- Environment variable names: `PATH`, `HOME`, `PROGRAMFILES`, `LOCALAPPDATA`.
- POSIX signal names and error codes: `SIGTERM`, `SIGKILL`, `TERM`, `KILL`, `EPERM`, `ESRCH`.
- DOM `tagName` values inside the `BROWSER_CODEGEN_SOURCE` template string: `TEXTAREA`, `INPUT`, `SELECT` (`src/core/constants.ts:301`, `:305`, `:316`).

`STRING`, `LENGTH`, `BYTES`, `LOCAL`, `DETACH`, `ONLY`, and `REMOTE` were in that population before this round and are not in it after.

The `FIRST` hit at `src/server/helpers.ts:330` is emphasis rather than a data token, and it sits outside this unit's owned files. It is reported as a patch under § Off-limits patch and was not edited.

## Item 10 (B10) — `BROWSER_CODEGEN_SOURCE`'s remark

`src/core/constants.ts:236`:

```diff
  * @remarks
- * Attaches capturing-phase listeners for `click`, `input` (fill), and
- * `change` (select) on `document`, builds a stable CSS selector for the
- * target element, and forwards each action to the CDP binding
- * ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. A `contenteditable`
- * fill is captured through `input` events, the same way an input or a textarea is.
- * Guarded to
- * install exactly once per document (`window[name]` sentinel) so repeated
- * injection on every new document is idempotent.
+ * Attaches capturing-phase listeners for `click`, `input` (fill), and `change` (select) on
+ * `document`, builds a stable CSS selector for the target element, and forwards each action
+ * to the CDP binding ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. A
+ * `contenteditable` fill is captured through `input` events, the same way an input or a
+ * textarea is. Guarded to install exactly once per document (`window[name]` sentinel) so
+ * repeated injection on every new document is idempotent.
```

The block's width is the file's doc-block width, `printWidth` 100 in `.oxfmtrc.json`; `edit-src.py` asserts no doc line it wrote exceeds it. The doc lines at `src/core/types.ts:341`, `:1761`, `:1767`, and `:2001` exceed it; each is baseline text this round did not touch, and each is reported under § Observations.

## Item 11 (B11) — pointers

```diff
 guides/browser.md:219
-family's — see [`BrowserSnapshotInterface`](#browsersnapshotinterface) below.
+family's — see [`BrowserSnapshotInterface`](#browsersnapshotinterface) later.
 guides/browser.md:1088
-member it inherits from `BrowserFrameInterface`, whose own behavior the table
-above states.
+member it inherits from `BrowserFrameInterface`, whose own behavior the
+preceding table states.
 guides/browser.md:1144
-entire serialized form; every method below derives structure from them on
+entire serialized form; every method that follows derives structure from them on
```

## Item 12 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/browser.md README.md src/core/errors.ts src/core/helpers.ts src/core/constants.ts src/core/types.ts src/server/types.ts src/core/BrowserDiagnostics.ts
Finished in 986ms on 8 files using 4 threads.                          EXIT 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
wrote guides/browser.md
rows read: 1, disagreements found: 12, written: 12, reported: 0        EXIT 0

$ npx oxfmt --config .oxfmtrc.json --write guides/browser.md
Finished in 1005ms on 1 files using 4 threads.                         EXIT 0
```

## Acceptance criteria

### Criterion 1 — the working tree

```text
$ git status --short
 M README.md
 M guides/browser.md
 M src/core/BrowserDiagnostics.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/types.ts
```

Owned files only. `src/core/BrowserDiagnostics.ts` is a doc block under `src/**`, inside the owned scope, and carries the cell criterion 4's `entities` grep reaches. The instruments sit under `tmp/`, which the root `.gitignore` file ignores.

### Criterion 2 — format, lint, and typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/browser.md README.md src/core/errors.ts src/core/helpers.ts src/core/constants.ts src/core/types.ts src/server/types.ts
All matched files use the correct format.
Finished in 999ms on 7 files using 4 threads.                          EXIT 0

$ npx oxfmt --config .oxfmtrc.json --check src/core/BrowserDiagnostics.ts
Finished in 5ms on 1 files using 4 threads.                            EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings src
                                                                       EXIT 0

$ PATH=/opt/npm11/bin:$PATH npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
                                                    (no diagnostics)   EXIT 0
```

### Criterion 3 — the seed at zero, both directions

```text
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0                                   EXIT 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0
```

### Criterion 4 — the greps

```text
$ grep -n 'mid- \|off- ' guides/browser.md
                                                                       EXIT 1 (no output)
$ grep -rnE '[a-z]-$' src --include=*.ts
                                                                       EXIT 1 (no output)
$ grep -c '^### Drive the core client over an injected transport' guides/browser.md
1                                                                      EXIT 0
$ grep -n 'entities\|the first surface\|the second from' guides/browser.md README.md
                                                                       EXIT 1 (no output)
$ grep -c 'createCDPClient' README.md
3                                                                      EXIT 0
$ grep -c 'new CDPClient' README.md
0                                                                      EXIT 1
$ grep -c '{@link BROWSER_RESULT_LIMIT}' src/core/errors.ts
1                                                                      EXIT 0
$ grep -nE '\b(STRING LENGTH|BYTES|LOCAL DETACH ONLY|REMOTE)\b' src/core/constants.ts src/server/types.ts
                                                                       EXIT 1 (no output)
$ grep -nw 'below\|above' guides/browser.md
                                                                       EXIT 1 (no output)
```

### Criterion 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
Test Files  1 passed (1); Tests  201 passed (201)
Duration  2.25s                                                        EXIT 0

$ PATH=/opt/npm11/bin:$PATH npm run test:policy
Test Files  1 passed (1); Tests  90 passed | 1 skipped (91)
Duration  1.40s                                                        EXIT 0
```

Observation, not a criterion:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:src:core
Test Files  39 passed (39); Tests  462 passed (462)
Duration  6.85s                                                        EXIT 0
```

The `BROWSER_HAR_CREATOR.version` red the P.2 report met is gone: the version successor at `b41f54c` is this round's baseline, and `tests/src/core/BrowserHARManager.test.ts` passes inside that run. No timing red occurred under the host's load.

## Off-limits patch (report-only)

`src/server/helpers.ts:330-331` carries all-caps emphasis and a `below` pointer in an implementation comment. The brief's owned scope is doc blocks under `src/**`, so this `//` comment was not edited. Exact patch for serial integration:

```diff
--- a/src/server/helpers.ts
+++ b/src/server/helpers.ts
@@
-	// Caller-supplied args come FIRST so a script path (for example `node <script>`,
+	// Caller-supplied args come first so a script path (for example `node <script>`,
 	// used to spawn a Node stand-in executable cross-platform in tests) lands
-	// as an early positional argv entry ahead of the CDP flags below —
+	// as an early positional argv entry ahead of the CDP flags that follow —
 	// Chromium itself accepts flags in any order, so production is unaffected.
```

## Ancillary decisions, recorded

- **The noun after each class token.** The brief's example ends at the token, and `.claude/rules/writing.md` § Code tokens requires a following noun, so each options cell reads "creating a `X` instance" — the fleet's proven `` `DriverInterface` instance `` idiom — except `BrowserCodegenOptions`, whose cell already carried the informative noun `recorder` and keeps it.
- **The transport's sentence.** The brief's wording is taken verbatim, so the compared cell reads "Represents the text pipe a `CDPClient` sends and receives JSON-RPC frames over." and the prose at `guides/browser.md:965` reads "The text pipe a `CDPClient` sends and receives JSON-RPC frames over." The description keeps the third-person `-s` verb `policy/no-malformed-summary` requires, and the prose keeps the noun phrase it always had; `CDPClientInterface` in that prose became `CDPClient` so the two sites name one term.
- **The lead-in under the new heading.** "Drive the CDP client from any environment over a transport that satisfies `CDPTransportInterface`:" — one complete sentence, in the imperative form the sibling heading's lead-in at `:25` uses, and not a restatement of the heading.
- **The split tables' convention sentence.** Neither `#### Extended constants` nor `#### Extended classes` carries a `Shape` column, so neither takes Ruling 15's convention sentence, and neither gained an introducing sentence: this guide introduces a table only where the `Shape` column's convention sentence sits directly before it, and the section's lead paragraph at `:457` already introduces the constants table and the classes table.
- **`BROWSER_RESULT_LIMIT_PATTERN`'s literal placement.** The pattern sits as a trailing appositive, the form the neighbouring constants already use (`BROWSER_RESULT_LIMIT_SENTINEL_PREFIX`, `BROWSER_FRAME_WORLD_NAME`), rather than as a second sentence.
- **The reflow width.** Every rewrapped block wraps at the file's own doc-block width, `printWidth` 100, and `edit-src.py` asserts it after writing.

## Observations

- The doc lines at `src/core/types.ts:341`, `:1761`, `:1767`, and `:2001` exceed the block width and are baseline text this round did not touch. `oxfmt` does not reflow comment prose, so no gate reads them.
- `src/core/types.ts:63`'s `@remarks` reads "the text pipe the client sends/receives JSON-RPC frames over", which already carries the settled term but writes the pair as a slash; it is outside every item this brief names.

## Deviation state

No deviation stopped the unit. No gate outside the owned files went red, no cell resisted Ruling 12, and no test outside the owned files reads a heading this round split.
