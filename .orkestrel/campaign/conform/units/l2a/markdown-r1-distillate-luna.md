## Question
For every row of unit conform-markdown, what does the tree carry now, what did the diff change, and does the report match the tree?

## Evidence

### Per-row findings

- **markdown-subj-1**
  - **Site now:** `src/core/types.ts:471-473` retains `MarkdownHandler` and declares `export interface MarkdownHandlerMap<T>`. The surrounding TSDoc now names the map.
  - **Diff at site:** `conform-markdown.diff:303` — `@@ -450,7 +472,7 @@`; the added line is `+export interface MarkdownHandlerMap<T> {`. The operative repair is present. Related references are updated in `src/core/Markdown.ts:4,157-158`, `src/core/helpers.ts:26,2841,2847,2854`, the guide, and tests.
  - **Old form sweep:** Pattern `\bMarkdownHandlers\b`; inflections `markdownhandlers|markdownhandlered|markdownhandlering` (`-i`); paths `src/**`, `tests/**`, `guides/markdown.md`, `guides/README.md`, `README.md`; no hits.
  - **Report reading:** `markdown-subj-1 | applied | MarkdownHandlers → MarkdownHandlerMap at every swept site; old-name sweep empty` (`conform-markdown-report.md:8`). It matches the tree.
  - **Proof reading:** Naming row; the report records the empty sweep and green `check`/`test:guides` gates.

- **markdown-subj-2**
  - **Site now:** `guides/markdown.md:896-898` contains the repaired See-also sentence, followed by the unchanged README link.
  - **Diff at site:** `conform-markdown.diff:119` — `@@ -894,5 +896,5 @@`; the added line contains the operative replacement verbatim.
  - **Old form sweep:** Pattern `AGENTS\s*§\s*\d+`; path `guides/markdown.md`; no hits.
  - **Report reading:** `guides/markdown.md See-also line replaced; §\d sweep clean in that file` (`conform-markdown-report.md:9`). It matches the tree.
  - **Proof reading:** Documentation row; the report’s `§\d` sweep agrees with the independent sweep.

- **markdown-subj-3**
  - **Site now:** `guides/README.md:3` has no citation. `guides/README.md:51` reads the repaired repository-rules sentence.
  - **Diff at site:** `conform-markdown.diff:5` and `:27` contain the two relevant hunks; both added repairs are present.
  - **Old form sweep:** Pattern `AGENTS\s*§\s*\d+`; path `guides/README.md`; no hits.
  - **Report reading:** `guides/README.md lines 3 and 51 replaced` (`conform-markdown-report.md:10`). It matches the tree.
  - **Proof reading:** Documentation row; the independent citation sweep is empty.

- **markdown-subj-4**
  - **Site now:** `guides/README.md:13-15` contains only the `src/core` directory row. The stale `guides/src` row is absent.
  - **Diff at site:** `conform-markdown.diff:13` — `@@ -10,10 +10,9 @@`; the added table contains only the `src/core` row.
  - **Old form sweep:** Patterns `guides/src|Dependency mirrors`; path `guides/README.md`; no hits.
  - **Report reading:** `guides/src By-directory row deleted; By-directory table tightened to the html sibling's form` (`conform-markdown-report.md:11`). It matches the tree.
  - **Proof reading:** Placement/documentation row; the independent old-path sweep agrees.

- **markdown-subj-5**
  - **Site now:** `src/core/helpers.ts:2169-2172` documents `breaks` with the required `If true …; if false …` form.
  - **Diff at site:** `conform-markdown.diff:204` — `@@ -2167,8 +2168,8 @@`; the operative replacement appears in the added lines.
  - **Old form sweep:** Pattern `@param\s+\w+\s+-\s+(Whether|whether)`; path `src/**`; no hits.
  - **Report reading:** `normalizeInlines`'s `@param breaks` uses the required boolean form; `Whether` sweep is clean in `src` (`conform-markdown-report.md:12`). It matches the tree.
  - **Proof reading:** Documentation row; the independent sweep agrees.

- **markdown-obj-1**
  - **Site now:** `src/core/helpers.ts:2357` calls `collapseSpace` for flattened projection text. `src/core/helpers.ts:2545` calls it for image alternative text. `src/core/helpers.ts:2384` retains the intentional non-trimming replacement.
  - **Diff at site:** `conform-markdown.diff:215` — `@@ -2353,11 +2354,7 @@`; added `const value = collapseSpace(...)`. `conform-markdown.diff:228` — `@@ -2545,7 +2542,7 @@`; added `const alt = collapseSpace(...)`. Both repairs are present.
  - **Old form sweep:** Pattern `\.replace\(/\\s\+/g, ' '\)\.trim\(\)`; package path excluding `node_modules`; no hits. Remaining `replace(/\s+/g` hits are `helpers.ts:454` and `:2384`, both intentionally retained.
  - **Report reading:** `collapseSpace reused at both sites; control red 2/604, green 604/604` (`conform-markdown-report.md:13`). It matches the tree.
  - **Proof reading:** `markdown-obj-1-control-red.txt` exists and records `Tests  2 failed | 602 passed (604)` (`:70`). `markdown-obj-1-green.txt` records `Tests  604 passed (604)` (`:11`). The control failures name both repaired sites.

- **markdown-obj-2**
  - **Site now:** `tests/guides.test.ts:209-211` ends the manifest loop; the new flagship-fence section begins at `:258`. Executed assertions and presence guards cover the documented fences, including scanner, rendering, folding, streaming, provenance, projections, and fixtures.
  - **Diff at site:** `conform-markdown.diff:385` — `@@ -168,3 +209,483 @@`; the added `describe('flagship fences', ...)` and transcription tests are present.
  - **Old form sweep:** No removed or renamed form; sweep not applicable.
  - **Report reading:** `Flagship-fence transcriptions added to tests/guides.test.ts; control red 2/58, green 58/58` (`conform-markdown-report.md:14`). It matches the tree.
  - **Proof reading:** `markdown-obj-2-control-red.txt` exists and records `Tests  2 failed | 56 passed (58)` (`:952`), with failures in the executed scanner assertion and presence guard. `markdown-obj-2-green.txt` records `Tests  58 passed (58)` (`:11`). The first-run file records `Tests  54 passed (54)` (`markdown-obj-2-first-run.txt:11`).

- **markdown-obj-3**
  - **Site now:** `tests/src/core/parsers.test.ts:624` and `:626` both use `performance.now()`.
  - **Diff at site:** `conform-markdown.diff:1003` — `@@ -621,9 +621,9 @@`; both added `performance.now()` readings are present.
  - **Old form sweep:** Pattern `Date\.now\(`; package path excluding `node_modules`; no hits.
  - **Report reading:** `performance.now()` is used at both readings; `Date.now(` sweep is empty (`conform-markdown-report.md:15`). It matches the tree.
  - **Proof reading:** This is test instrumentation, not product behavior. `markdown-obj-3-green.txt` records `Tests  604 passed (604)` (`:11`). No failing-first control was applicable to the clock-source substitution.

- **markdown-obj-4**
  - **Site now:** `src/core/types.ts:103-118` declares `LinkScan` and `EmphasisScan`, each with readonly `node` and `end`. `src/core/helpers.ts:907` and `:1009` use those return types. Guide rows appear at `guides/markdown.md:24-25`, and signatures use them at `:110-111`.
  - **Diff at site:** `conform-markdown.diff:265` — `@@ -96,6 +96,28 @@`; the two interfaces are present. Annotation hunks at `:186` and `:195`, and guide hunks at `:37` and `:57`, contain the operative repairs.
  - **Old form sweep:** Pattern `readonly node:\s*(LinkNode|EmphasisNode);\s*readonly end`; package path excluding `node_modules`; no hits.
  - **Report reading:** `LinkScan and EmphasisScan in types.ts; both annotations and both guide rows land` (`conform-markdown-report.md:16`). It matches the tree.
  - **Proof reading:** Naming/placement row; the old inline-shape sweep is empty and the guide rows are present.

- **fleet-F1**
  - **Site now:** `tests/setup.ts:1-5` has no `isBrowserVuePath`; its exports remain. No `src/browser`, `app/browser`, or `tests/setupBrowser.ts` exists.
  - **Diff at site:** No diff hunk; the helper is already absent.
  - **Old form sweep:** Pattern `isBrowserVuePath`; package path excluding `node_modules`; no hits.
  - **Report reading:** `noop. No isBrowserVuePath anywhere in the package, and no browser environment` (`conform-markdown-report.md:17`). It matches the tree.
  - **Proof reading:** No-op row; the helper sweep and browser-path searches agree.

- **fleet-F2**
  - **Site now:** `src/core/Markdown.ts:54-56` declares the only implementation class and starts it with `#document` and `#spans`; no public `id` field exists.
  - **Diff at site:** No diff hunk; the named class shape is absent.
  - **Old form sweep:** Pattern `readonly id: string`; path `src/**`; no hits. Class sweep `\bclass \w+`; path `src/**`; only `Markdown` is a class declaration.
  - **Report reading:** `noop. The package's only class is Markdown, whose first members are its # fields` (`conform-markdown-report.md:18`). It matches the tree.
  - **Proof reading:** No-op row; the class and field sweeps agree.

### Across-unit evidence

**Scope.** The status artifact lists only owned paths (`conform-markdown.status:1-9`):

- `guides/README.md` — owned by `markdown-subj-3` and `markdown-subj-4`.
- `guides/markdown.md` — owned by `markdown-subj-1` through `markdown-subj-4` and `markdown-obj-4`.
- `src/core/Markdown.ts` — owned by `markdown-subj-1`.
- `src/core/helpers.ts` — owned by `markdown-subj-1`, `markdown-subj-5`, `markdown-obj-1`, and `markdown-obj-4`.
- `src/core/types.ts` — owned by `markdown-subj-1` and `markdown-obj-4`.
- `tests/guides.test.ts` — owned by `markdown-obj-2`.
- `tests/src/core/Markdown.test.ts` — owned by `markdown-subj-1`.
- `tests/src/core/helpers.test.ts` — owned by `markdown-subj-1` and `markdown-obj-1`.
- `tests/src/core/parsers.test.ts` — owned by `markdown-obj-3`.

No shared or off-limits path appears. Every diff hunk belongs to a file named by a row’s `Where`; there are no unscoped hunks. The diff contains no added `.skip(`, `.only(`, `.todo(`, retry, timeout, TODO, FIXME, `console.`, or `debugger` residue (`conform-markdown.diff`, added-line sweep).

**Residue.** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`; paths `src/**` and `tests/**`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: the only hits are the existing documentation examples `src/core/Markdown.ts:174` and `:180` using `console.log`. No added residue exists.

**Parity.**

| Entity | Type contract | Guide parity |
|---|---|---|
| `MarkdownInterface` | `document` at `src/core/types.ts:592`; call signatures `walk`, `find`, `filter`, `span`, `map`, `reduce`, `fold`, `stream` at `:602-642` | `MarkdownInterface` Surface row at `guides/markdown.md:56`; matching Methods rows at `:205-212` |
| `MarkdownHandlerMap` | Readonly handler properties `document`, `heading`, `paragraph`, `thematicBreak`, `blockquote`, `codeBlock`, `list`, `listItem`, `table`, `text`, `emphasis`, `codeSpan`, `break`, `link`, `image` at `src/core/types.ts:475-508` | Types row names the complete handler table at `guides/markdown.md:52` |
| `LinkScan` | Readonly `node` and `end` at `src/core/types.ts:103-108` | Types row at `guides/markdown.md:24`; `scanLink` signature at `:110` |
| `EmphasisScan` | Readonly `node` and `end` at `src/core/types.ts:114-119` | Types row at `guides/markdown.md:25`; `scanEmphasis` signature at `:111` |
| `Markdown` | Implements `MarkdownInterface` at `src/core/Markdown.ts:54`; `document` getter and interface methods are present | Implementing-class prose at `guides/markdown.md:182`; Methods table at `:201-212` |

Public API identifiers added or changed in guide lines — `LinkScan`, `EmphasisScan`, `LinkNode`, `EmphasisNode`, `MarkdownHandler`, `MarkdownHandlerMap`, `scanLink`, `scanEmphasis`, and `foldNode` — are exported through `src/core/index.ts:1-9` via the relevant star exports. Documentation links such as `AGENTS.md`, `README.md`, and `src/core` are paths, not barrel symbols.

**Gates.** The report’s gate table (`conform-markdown-report.md:236-255`) states:

- `npm run format:check` → `oxfmt --check .` → exit `0`; `All matched files use the correct format.`
- `npm run lint:check` → `oxlint --deny-warnings .` → exit `0`; no diagnostic.
- `npm run check` → `tsc --noEmit` ×2 → exit `0`; no diagnostic.
- `npm run build` → `vite build` + `copy` → exit `0`; built and declaration copied.
- `npm test` → five projects → exit `0`; source, policy, config, setup, and guides readings are recorded in `gate-test.txt:14-71`.

**Breaking.** The report states that `markdown-subj-1` renames published `MarkdownHandlers<T>` to `MarkdownHandlerMap<T>`, while `LinkScan` and `EmphasisScan` add named structural return contracts (`conform-markdown-report.md:276-287`). It states that no in-fleet consumer imports `MarkdownHandlers` and that consumer edits are none (`:280-288`). A word-boundary sweep for `MarkdownHandlers` across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding the markdown checkout and vendored guide mirrors, has no hits. The excluded mirror `/home/user/fleet/guide/guides/markdown.md:42-43,113,195,652,657,755,776` still contains the old name.

**Writing sweep.** Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`; added lines restricted to `guides/**`, `README.md`, added source comments, and added test titles/comments: no hits. Pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over the same added prose: no hits.

## Distillate

markdown-subj-1: `src/core/types.ts:472` now declares `MarkdownHandlerMap` | diff present yes | old form hits 0 | report matches yes  
markdown-subj-2: `guides/markdown.md:897` has the repaired See-also line | diff present yes | old form hits 0 | report matches yes  
markdown-subj-3: `guides/README.md:3,51` has repaired prose | diff present yes | old form hits 0 | report matches yes  
markdown-subj-4: `guides/README.md:13-15` has no `guides/src` row | diff present yes | old form hits 0 | report matches yes  
markdown-subj-5: `src/core/helpers.ts:2171` has the required boolean wording | diff present yes | old form hits 0 | report matches yes  
markdown-obj-1: `src/core/helpers.ts:2357,2545` uses `collapseSpace` | diff present yes | old form hits 0 | report matches yes  
markdown-obj-2: `tests/guides.test.ts:258+` contains executed fence transcriptions and guards | diff present yes | old form hits 0 | report matches yes  
markdown-obj-3: `tests/src/core/parsers.test.ts:624,626` uses `performance.now()` | diff present yes | old form hits 0 | report matches yes  
markdown-obj-4: `src/core/types.ts:103-118` names both scan results | diff present yes | old form hits 0 | report matches yes  
fleet-F1: `isBrowserVuePath` is absent and no browser environment exists | diff present no | old form hits 0 | report matches yes  
fleet-F2: `Markdown` starts with private fields and has no public `id` field | diff present no | old form hits 0 | report matches yes  

Scope tags: all paths in `conform-markdown.status:1-9` are owned; no shared or off-limits paths appear.

Residue: added-line residue sweep is empty. Tree residue has only existing `console.log` examples at `src/core/Markdown.ts:174,180`.

Writing hits: none in added prose lines under the requested pattern and paths.

Parity: `MarkdownInterface` methods match `guides/markdown.md:205-212`; its `document` property is represented at `guides/markdown.md:56`. `MarkdownHandlerMap`, `LinkScan`, and `EmphasisScan` are documented at `guides/markdown.md:24-25,52`, and their exports flow through `src/core/index.ts:1-9`.

## Unknowns

- The authoritative landing gate was not independently rerun; only the writer’s captured gate evidence was available.
- The full `markdown-obj-2-control-red.txt` body exceeded the file-read response limit, but its failure names and matching `Tests  2 failed | 56 passed (58)` summary were reached at `:10-31` and `:951-952`.
- The provided status artifact was used for containment; a separate live status command was unavailable after the readonly shell request was rejected.

## Journal

Driver-owned.

## Deviation

No subject-tree change was observed. All requested substantive paths, diff evidence, status evidence, report sections, proof summaries, and sweeps were reached. The only read limitation was the size-capped raw control log noted under Unknowns.