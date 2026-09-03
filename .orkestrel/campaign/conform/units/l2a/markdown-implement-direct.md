Unit complete. Report at `/home/user/scaffold/tmp/units/conform/conform-markdown-report.md`; evidence at `/home/user/work/evidence/conform-markdown.diff`, `/home/user/work/evidence/conform-markdown.status`, and `/home/user/work/evidence/markdown-proofs/`.

# Unit conform-markdown — report

Every row is `applied` or `noop`. No deviation. The gate chain is green in order, and `git status --short` lists only files under Owned.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| markdown-subj-1 | applied | `MarkdownHandlers` → `MarkdownHandlerMap` at every swept site; old-name sweep empty |
| markdown-subj-2 | applied | `guides/markdown.md` See-also line replaced; `§\d` sweep clean in that file |
| markdown-subj-3 | applied | `guides/README.md` lines 3 and 51 replaced |
| markdown-subj-4 | applied | `guides/src` row deleted; By-directory table tightened to the html sibling's form |
| markdown-subj-5 | applied | `normalizeInlines`'s `@param breaks` in the required boolean form; `Whether` sweep clean in src |
| markdown-obj-1 | applied | `collapseSpace` reused at both sites; control red 2/604, green 604/604 |
| markdown-obj-2 | applied | Flagship-fence transcriptions added to `tests/guides.test.ts`; control red 2/58, green 58/58 |
| markdown-obj-3 | applied | `performance.now()` at both readings; `Date.now(` sweep empty package-wide |
| markdown-obj-4 | applied | `LinkScan` and `EmphasisScan` in `types.ts`; both annotations and both guide rows land |
| fleet-F1 | noop | No `isBrowserVuePath` anywhere in the package, and no browser environment |
| fleet-F2 | noop | The package's only class is `Markdown`, whose first members are its `#` fields |

### markdown-subj-1 — `MarkdownHandlers` → `MarkdownHandlerMap`

Renamed the interface in `/home/user/fleet/markdown/src/core/types.ts` and updated every site the refuter swept: `types.ts` (declaration, the `MarkdownHandler` TSDoc link, the `MarkdownInterface.fold` row), `src/core/Markdown.ts`, `src/core/helpers.ts`, `guides/markdown.md`, and both test files.

Both amendments landed as written: the Types-table row key is `MarkdownHandlerMap<T>` and stays in its original position beside `MarkdownHandler<TNode, T>`, whose sentence now reads "the building block of a `MarkdownHandlerMap` table". Column padding was re-derived so every table row still measures the same width (Types rows 291 characters, Helpers signature cells 139). `README.md` carries no occurrence.

### markdown-subj-2, markdown-subj-3, markdown-subj-4 — guide and README parity

The See-also `AGENTS.md` lines in `guides/markdown.md` and `guides/README.md`, and `guides/README.md`'s tagline, now carry the repaired form matching `/home/user/fleet/html/guides/README.md`. The `guides/src` By-directory row is deleted and the table tightened to its remaining `src/core` row, the shape the html sibling carries. The finder's alternative was not applied.

### markdown-subj-5 — the boolean parameter's TSDoc form

`normalizeInlines`'s `@param breaks` now reads the required "If `true`, …; if `false`, …" form. Signature, `@remarks`, and the guide's Helpers row unchanged.

### markdown-obj-1 — reuse `collapseSpace`

`collapseSpace` joins the existing `@orkestrel/html` value import between `attributeOf` and `foldNode as foldHTMLNode`. `projectionToInlines` and the `img` arm of `projectHTMLNode` now call it. `projectHTMLLeaf`'s `leaf.value.replace(/\s+/g, ' ')` is untouched. No guide edit was needed.

Neither site had a test pinning the collapse-and-trim contract before this row, so the swap was unproven. Two cases now pin it, one per site.

### markdown-obj-2 — flagship fence transcriptions

`tests/guides.test.ts` gains a `describe('flagship fences', …)` section after the manifest loop, in the fleet shape. Every ```ts fence of `guides/markdown.md` whose `//` comments claim a value or a behaviour is transcribed against `@src/core`, with a presence guard beside it reading the transcribed lines out of `files['guides/markdown.md']`.

Transcribed: the source-provenance fence, the escaped-spelling fence, the `parseProvenance` fence, the rewrite-provenance fence, the absent-provenance fence, the offset-bearing `scanInlineSource` fence, the house-rule element-policy fence, the construct-and-narrow fence, the adoption fence, the filter-and-flatten fence, the rewrite-chain fence, the reduce fence, the fold fence, the streaming fence, the sync-iteration fence, the async-iteration fence, the standalone projections fence, the scanner fence, the guide-parity extraction fence, and the contract-fixture fence.

**No transcription disagreed with the code, so there is no guide-drift finding to report.**

Ancillary decision, recorded: the adoption fence, the house-rule fence, and the guide-parity extraction fence each declare a named function. Keeping the declaration inside its case would nest a function in a body, which `AGENTS.md` § Design laws refuses, so each sits at the test file's module scope with the fence's own name and body — the form `tests/setup.test.ts` already uses. The file's header comment said "The four constants below", a count that was already false; it now reads "The constants below".

### markdown-obj-3 — `performance.now()`

Both readings of the linear-time case in `tests/src/core/parsers.test.ts` use `performance.now()`. Nothing else changed; the 1000 ms ceiling was not re-derived.

### markdown-obj-4 — `LinkScan` and `EmphasisScan`

`src/core/types.ts` declares both interfaces immediately after `EmphasisBounds` in the file's TSDoc form. `scanLink` and `scanEmphasis` are annotated with them, and both names joined the type import block in order. `EmphasisNode` and `LinkNode` became unused imports in `helpers.ts` once the inline shapes went, so they left the block. The guide's two Types rows sit after the `EmphasisBounds` row, and the signature cells name the types.

### fleet-F1 — `noop`

Read `/home/user/fleet/markdown/tests/setup.ts` in full: no `isBrowserVuePath`, and its header comment names none. A word-boundary sweep over the checkout excluding `node_modules` returns no match. The glob `/home/user/fleet/markdown/{src,app,tests}/**/{browser,setupBrowser.ts}` returns no file, so there is no browser environment. `tests/setup.ts` exports the assertion family, the projection fixtures, the corpora, and the adversarial builders, so the sole-export branch does not apply.

### fleet-F2 — `noop`

A `\bclass \w+` sweep over `src` finds one class, `Markdown` (`src/core/Markdown.ts:54`); the other hits are the word inside comments. Its first members are `readonly #document` (`:55`) and `readonly #spans` (`:56`). A `readonly id: string` sweep over `src` returns no match.

## Files touched

| File | Change |
| --- | --- |
| `/home/user/fleet/markdown/src/core/types.ts` | Renamed `MarkdownHandlers` to `MarkdownHandlerMap`; added `LinkScan` and `EmphasisScan` |
| `/home/user/fleet/markdown/src/core/Markdown.ts` | Renamed the `fold` handler-table type in import, TSDoc, and signature |
| `/home/user/fleet/markdown/src/core/helpers.ts` | Renamed type; named both scan returns; reused `collapseSpace`; repaired the boolean TSDoc |
| `/home/user/fleet/markdown/guides/markdown.md` | Renamed type across tables and fences; added the two Types rows; repaired the See-also line |
| `/home/user/fleet/markdown/guides/README.md` | Dropped the `AGENTS §22` citations and the `guides/src` By-directory row |
| `/home/user/fleet/markdown/tests/guides.test.ts` | Added the flagship-fence transcription section and its module-scope fence helpers |
| `/home/user/fleet/markdown/tests/src/core/helpers.test.ts` | Renamed type; added a collapse-and-trim case for each `collapseSpace` site |
| `/home/user/fleet/markdown/tests/src/core/Markdown.test.ts` | Renamed the handler-table type at the import and the annotated tables |
| `/home/user/fleet/markdown/tests/src/core/parsers.test.ts` | Swapped both `Date.now()` readings for `performance.now()` |

```text
 guides/README.md                |  11 +-
 guides/markdown.md              |  24 +-
 src/core/Markdown.ts            |   6 +-
 src/core/helpers.ts             |  29 +--
 src/core/types.ts               |  30 ++-
 tests/guides.test.ts            | 525 +++++++++++++++++++++++++++++++++++++++-
 tests/src/core/Markdown.test.ts |  10 +-
 tests/src/core/helpers.test.ts  |  35 ++-
 tests/src/core/parsers.test.ts  |   4 +-
 9 files changed, 621 insertions(+), 53 deletions(-)
```

## Failing-first controls

Captures under `/home/user/work/evidence/markdown-proofs/`.

**markdown-obj-1** — `npm --prefix /home/user/fleet/markdown run test:src:core`.
- Control (both call sites planted with the non-collapsing `.trim()` body the row replaces): `Tests  2 failed | 602 passed (604)`, failing `projectionToInlines > collapses every whitespace run of the flattened text and drops its edge whitespace` and `projectHTMLNode > collapses every whitespace run of an image alternative text and drops its edge whitespace`. File `markdown-obj-1-control-red.txt`.
- After the repair: `Tests  604 passed (604)`. File `markdown-obj-1-green.txt`.

**markdown-obj-2** — `npm --prefix /home/user/fleet/markdown run test:guides`. The section is new, so the control proves each half of the pair fires. Two defects planted at once, both removed afterwards: `scanEmphasis` returned `located.end + 1` (executed half), and the guide's `link?.end // 21` comment read `// 22` (presence half).
- Control: `Tests  2 failed | 56 passed (58)` — `scans one inline construct at a time and degrades an unclosed one to undefined` and `carries the scanner fence lines the transcription copies`. File `markdown-obj-2-control-red.txt`.
- After removing both plants: `Tests  58 passed (58)`. File `markdown-obj-2-green.txt`. The source and guide diffs carry no residue of either plant.
- `markdown-obj-2-first-run.txt` is the section's first execution (`Tests  54 passed (54)`, before the last two fence pairs). Every transcription agreed with the code on that first run, which is why the control exists.

**markdown-obj-3** — the swap can only make the reading more precise, never larger, so no plant reddens it in a way that names the defect. Green after the change: `Tests  604 passed (604)`. File `markdown-obj-3-green.txt`.

**The naming, placement, and documentation rows** are proved by the sweeps below beside the gates.

## Sweeps

`Grep` over `/home/user/fleet/markdown` excluding `node_modules/**`, except where a narrower path is named.

| Pattern | Path | Result |
| --- | --- | --- |
| `MarkdownHandlers` | package | 0 |
| `markdownhandlers\|MarkdownHandlered\|MarkdownHandlering` (`-i`) | package | 0 |
| `MarkdownHandlerMap\|LinkScan\|EmphasisScan` (before the change) | package | 0 — the collision check |
| `readonly node: (LinkNode\|EmphasisNode); readonly end` | package | 0 |
| `@param \w+ - (Whether\|whether)` | `src` | 0 |
| `@param \w+ - (Whether\|whether)` | package | 1, `tests/setupPolicy.ts` — vendored, off-limits |
| `\.replace\(/\\s\+/g, ' '\)\.trim\(\)` | package | 0 |
| `replace\(/\\s\+/g` | `src` | `helpers.ts:454` (`''`) and `:2384` (no trim), both correctly kept |
| `Date\.now\(` | package | 0 |
| `§\d` | package | Hits in the vendored mirrors `guides/contract.md` and `guides/guide.md`, plus `tests/setup.ts:54`; none in `guides/markdown.md` or `guides/README.md` |
| `isBrowserVuePath` | package | 0 |
| `\bclass \w+` | `src` | one class, `Markdown` |
| `readonly id: string` | `src` | 0 |

Count sweeps over the rows that delete an enumeration, each hit ruled by sense: in `guides/README.md`, `the two conversion directions` names a closed pair (permitted) while `this package's two runtime dependencies` is a count (reported below, outside every row); in `tests/guides.test.ts`, the counts I had authored (`Two fences … declare`, `chains two rewrites`) are gone and the rest are pronouns, singular references, or transcribed markdown data. The numeral sweep's hits are `compilers.test.ts:197` reporting the `MAX_DEPTH` value under measurement (permitted) and the vendored mirrors.

## Gates

Run in order, one command per call, from `/home/user/fleet/markdown`.

| Gate | Exit | Reading | File |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` on 47 files | `gate-format-check.txt` |
| `npm run lint:check` | 0 | no diagnostic | `gate-lint-check.txt` |
| `npm run check` | 0 | no diagnostic | `gate-check.txt` |
| `npm run build` | 0 | `✓ built in 4.86s`, `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` | `gate-build.txt` |
| `npm test` | 0 | src:core 604, policy 111, config 46, setup 24, guides 58 | `gate-test.txt` |

No gate reported a failure, so there is no failure excerpt.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec. The Orchestrator takes the deciding run after the unit exits.

## Breaking

`markdown-subj-1` renames the published type `MarkdownHandlers<T>` to `MarkdownHandlerMap<T>`. `markdown-obj-4` adds `LinkScan` and `EmphasisScan` and narrows two published return annotations from structurally identical anonymous shapes, which is source-compatible for every consumer.

No fleet consumer imports `MarkdownHandlers`. The only in-fleet importer of `@orkestrel/markdown` is `@orkestrel/guide`, which imports `BlockNode`, `InlineNode`, `MarkdownDocument`, `TableNode`, `flattenText`, `isCodeBlockNode`, `isCodeSpanNode`, `isEmphasisNode`, `isHeadingNode`, `isImageNode`, `isLinkNode`, `isTableNode`, `walkNodes`, and `createMarkdown`, and none of the renamed ones.

**Consumer edits obliged: none.**

## Shared-file patches

None. Every edit landed inside Owned. No file outside this checkout, and no vendored dependency guide mirror, was changed.

## Deviations

None.

## Observations for the Orchestrator

Outside every row of this brief, with no carrier here.

1. **`/home/user/fleet/markdown/tests/setup.ts:54` cites `AGENTS §1 / §16`.** The line reads ``// AGENTS-forbidden; §1 / §16). Thin assert-and-narrow wrappers over `@src/core`'s``. It is a source comment inside claim S6's population and the refuter's note on `markdown-subj-2` flagged it as needing its own carrier. It is the only remaining `§\d` hit in a package-owned file.
2. **`/home/user/fleet/markdown/guides/README.md:20` states a count** — "one of this package's two runtime dependencies" tallies a set that can grow. It sits in the Dependency reference prose, which `markdown-subj-4` does not reach.
3. **`tests/setupPolicy.ts` carries a `@param … Whether` block.** Vendored and off-limits here; the repair belongs to `@orkestrel/scaffold`'s `dist/host` surface.
4. **The Sanitization policy section's claims are proved only outside the guide.** The `src` widening, the refused-URL behaviour, and `align` over `style` sit in prose and in a ```text fence, so no fence transcription reaches them. `tests/src/core/compilers.test.ts` proves them, but a successor round wanting the guide's own prose bound would need executed assertions beside those sentences.
