# Unit D2 — guide-render: the renderers and the replacers, in `@orkestrel/guide`

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the subjective lane's unit (API shape and naming). Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing.

## Objective

`@orkestrel/guide` produces guide text from source entries (`renderSurface`, `renderMethods`, `renderExample`), rewrites one compared cell or one titled fence inside an existing guide's text through the parser's provenance spans, and rewrites one description paragraph or one titled `@example` body inside a doc block's text — every function returning text and writing nothing — so that the vendored `scripts/docs.ts` seed (D5) can carry a change across in either direction and the gate (D4) never calls a writer.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md` (§ Shared test infrastructure, § Probes), `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md` § Instruments.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md`, `plan.md` (decisions 1 to 6 and § Re-baseline), `orchestrator-measurements.md` (§ P1, § P1b, § P4, § P6, § P7), `d1-guide-readers-report.md` (the landed readers, the transform, and the decisions the unit took).
3. The code, at this checkout's tip: `src/core/types.ts` (`SurfaceSymbol`, `MethodEntry`, `MethodGroup`, `SourceExample`, `SourceComment`, `Drift`, `GuideFence`, `GuideInterface`, `SourceInterface`), `src/core/helpers.ts` (`extractCellText`, `findColumnIndex`, `extractSurface`, `extractMethods`, `normalizeComment`, `normalizeSummary`, `extractSourceComments`, `collectSummaries`, `collectExamples`, `extractFences`, `extractTagline`, `findDrift`), `src/core/constants.ts` (`KIND`, `SUMMARY`, `SURFACE`, the section names), `src/core/Guide.ts`, `guides/guide.md` (§ Surface, § Methods, § The extraction model, § The check catalog, § Patterns), `tests/**`.
4. The installed `@orkestrel/markdown` declaration at `node_modules/@orkestrel/markdown/dist/src/core/index.d.ts`: `createMarkdown(input)` returns a `MarkdownInterface` whose `span(node)` gives a node's source span (`MarkdownSpan { start, end }`) and whose `map(rewrite)` rewrites copy-on-write with derivations; `renderMarkdown(node)` renders a node to Markdown text; `TableNode { header, rows, align }` holds inline cells; `rewriteDocument(document, rewrite)`; `parseProvenance(markdown)`. Read the declaration for the exact shapes before designing; the Orchestrator read it at dispatch and names no more than this.
5. The Orchestrator's instruments, read-only: `/home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/p1/p1-render.mjs` with `p1-render.log.txt` (a committed, column-aligned table re-renders one-space padded and not byte-identical; the render is idempotent over its own output; an in-cell edit diffs the render) and `p1b-oxfmt-align.log.txt` (`oxfmt --write` over the padded render restores the committed bytes exactly).

## What is fixed

- **Renderers produce fresh guide text from source entries.** `renderSurface(symbols: readonly SurfaceSymbol[]): string` renders a `Name | Kind | Summary` table, one row per symbol, the name as a code span, the kind as the keyword, the summary as the entry's text (an absent summary renders an empty cell). `renderMethods(group: MethodGroup): string` renders the H4 code-span heading of the interface and its `Name | Summary` table. `renderExample(example: SourceExample): string` renders the heading of the example's title (an untitled example renders no heading) and a fence with the example's language and code. Each renders through the parser's own `renderMarkdown` over a node the function builds, so the text is what the package parses back, and each is a pure function of its argument.
- **Guide-side replacement rewrites one cell or one fence inside an existing guide's text.** Two functions, whose names you settle within the single-word law and record: one takes the guide's text, a compared key (a `computeSymbolKey` symbol key or an `Owner.member` key), and a summary, and returns the guide's text with that row's `Summary` cell replaced and nothing else changed outside the table's span; the other takes the guide's text, a title, and a `SourceExample`, and returns the text with the fence under the heading of that title replaced (language and body) and nothing else changed outside the fence's span. Each locates its node through the package's own readers (`extractSurface`, `extractMethods`, `extractFences`, `findColumnIndex`) and the parser's `span`, rebuilds the node, renders it with `renderMarkdown`, and splices the render into the text at the span. A key or title that matches no row or fence, and a table without a `Summary` column, return the text unchanged and report the miss through the return shape you choose (state it: a result record, or `undefined` for "unchanged"); never throw for a miss.
- **Source-side replacement rewrites one doc block's text.** `replaceSummary(comment: string, summary: string): string` takes one doc block's raw text (the `/** … */` span as it sits in the file, with its indentation and continuation markers) and returns the same block with its description paragraph (the text before the first block tag) replaced by the summary, wrapped at the block's existing width, the blank separator line before the first tag kept, every tag line untouched, the indentation and markers preserved. `replaceExample(comment: string, example: SourceExample): string` replaces the body of the `@example` tag carrying the example's title (the fence's language and code) and leaves an untitled or differently titled `@example` alone; a block with no such tag returns unchanged. Both are pure over the block's text; the seed (D5) finds the block in the file through `extractSourceLines` and `extractSourceComments` and splices the returned text — that lookup is outside this unit unless you find the replacers cannot be tested without it, in which case add the smallest locator and record it.
- **Round trip.** For any `SurfaceSymbol` list with summaries, `extractSurface(createMarkdown(renderSurface(symbols)).document)` equals the list; the same for `renderMethods` through `extractMethods`, and for `renderExample` through `extractFences` (title, language, code). A rendered table re-rendered is byte-identical (P1's idempotence). After `npx oxfmt --write` over a file carrying the rendered text, `extractSurface` still returns the same list, and a two-table fixture that started column-aligned ends column-aligned again with the one replaced cell changed (P1b).
- **Types** in `src/core/types.ts`, every property readonly, one-word names; any new record (a replacement result) gets its shape, guard, and contract in `shapers.ts`, `validators.ts`, and `factories.ts`.
- **`guides/guide.md`** states every new function in its Helpers table with its `Summary`-column description, describes the propagation direction in prose (the guide fence wins on example content, the seed decides direction, the gate never writes), and its parity test decides the rows.
- **Nothing writes a file, nothing reads a file**, and no `render*` or `replace*` function reaches for the file system; `Source` stays text-only.

## Evidence at dispatch

FILLED_AT_DISPATCH: D1's landing commit, `git status --short` (clean), the `SUMMARY` constant line, the `extractCellText` and `findColumnIndex` lines, the markdown package version, `oxfmt` version.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `guides/guide.md`, `tests/src/core/**`, `tests/guides.test.ts` (this checkout's own parity rows).
- Off-limits: everything else, the vendored pair, `tests/distribution.test.ts`, `package.json`, `package-lock.json`, `configs/**`, `README.md`, `src/core/Guide.ts` and `src/core/sources/Source.ts` unless a criterion needs a one-line change there (report it).
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npx oxfmt --config .oxfmtrc.json --check <file>`, `npm run test:src:core`, `npm run test:guides`, `npm run lint:check`, `npm run check`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Unknowns

- Whether `MarkdownInterface.span` gives a table node and a code-block node a span whose text re-parses to the same node (P6 read the collectors, not a round trip). Measure it first; if a span is absent for either node, stop and report.
- The names of the guide-side pair; propose and record the reason.
- Whether `replaceSummary`'s re-wrap can keep every block in `src/core/helpers.ts` byte-identical when the summary is unchanged (the identity case). Measure over that file's blocks and report the count of blocks that would move; if any moves, the wrapping is wrong.

## Acceptance criteria, cheapest first

1. `grep -n "export function render\|export function replace" src/core/helpers.ts` prints the renderers and the doc-block replacers; `grep -rn "node:fs\|writeFile\|readFile" src` prints nothing new.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with, present and green: each renderer's round trip through its reader; the guide-side pair over a fixture built from scaffold's committed Surface table (a copy of `guides/scaffold.md`'s `## Surface` table and one `## Methods` table) proving the one cell changed and every other byte outside the table's span unchanged, with the miss cases; the doc-block replacers over blocks carrying `@param`, `@returns`, `@remarks`, and two `@example` tags, proving the tags and the separator survive and the identity case is byte-stable; a negative control for each replacer drawn from outside its membership (a single-star block comment, a block with no `@example`).
4. `npm run test:guides` exits 0 with the guide's Helpers table carrying every new name.

**Observations, not criteria.** `npm test` as a whole; report its reading.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d2-guide-render-report.md`: each function with `file:line` and its signature, the names you chose and why, the answer to each Unknown with the measurement, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims, and a finding for the next change wherever a seed (D5) will need a locator this unit did not build. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a span is absent for a table or a fence, when a criterion needs an off-limits file, when the identity case cannot be byte-stable without changing `normalizeComment`, or when a gate fails outside the owned files. Naming beyond the fixed names, the return shape of a miss, and the test wording are yours to decide and record.
