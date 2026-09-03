# Unit conform-markdown — report

Every row is `applied` or `noop`. No deviation. The gate chain is green in order, and
`git status --short` lists only files under Owned.

## Rows

| Row              | Disposition | Evidence                                                                                        |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| markdown-subj-1  | applied     | `MarkdownHandlers` → `MarkdownHandlerMap` at every swept site; old-name sweep empty             |
| markdown-subj-2  | applied     | `guides/markdown.md` See-also line replaced; `§\d` sweep clean in that file                     |
| markdown-subj-3  | applied     | `guides/README.md` lines 3 and 51 replaced                                                      |
| markdown-subj-4  | applied     | `guides/src` row deleted; By-directory table tightened to the html sibling's form               |
| markdown-subj-5  | applied     | `normalizeInlines`'s `@param breaks` in the required boolean form; `Whether` sweep clean in src |
| markdown-obj-1   | applied     | `collapseSpace` reused at both sites; control red 2/604, green 604/604                           |
| markdown-obj-2   | applied     | Flagship-fence transcriptions added to `tests/guides.test.ts`; control red 2/58, green 58/58    |
| markdown-obj-3   | applied     | `performance.now()` at both readings; `Date.now(` sweep empty package-wide                       |
| markdown-obj-4   | applied     | `LinkScan` and `EmphasisScan` in `types.ts`; both annotations and both guide rows land           |
| fleet-F1         | noop        | No `isBrowserVuePath` anywhere in the package, and no browser environment                        |
| fleet-F2         | noop        | The package's only class is `Markdown`, whose first members are its `#` fields                   |

### markdown-subj-1 — `MarkdownHandlers` → `MarkdownHandlerMap`

Renamed the interface at `src/core/types.ts` and updated every site the refuter swept:
`types.ts` (the declaration, the `MarkdownHandler` TSDoc link, and the
`MarkdownInterface.fold` row), `src/core/Markdown.ts` (import, TSDoc, signature),
`src/core/helpers.ts` (import, `foldNode` TSDoc, `@example`, signature),
`guides/markdown.md` (Types rows, the Helpers `foldNode` signature, the Methods `fold`
row, and both `import type` fences plus their annotated tables), and both test files.

The two amendments landed as written: the Types-table row key is now
`MarkdownHandlerMap<T>` and stays in its original position beside
`MarkdownHandler<TNode, T>`, whose sentence now reads "the building block of a
`MarkdownHandlerMap` table". Column padding was re-derived so every table row still
measures the same width (Types rows 291 characters, Helpers signature cells 139).

`README.md` carries no occurrence, as the refuter recorded.

### markdown-subj-2, markdown-subj-3, markdown-subj-4 — guide and README parity

`guides/markdown.md`'s See-also `AGENTS.md` line and `guides/README.md`'s lines 3 and 51
now carry the repaired form, matching `/home/user/fleet/html/guides/README.md`.

The `guides/src` By-directory row is deleted and the table tightened to its remaining
`src/core` row, byte-for-byte the shape the html sibling carries. The finder's
alternative was not applied. The mirror inventory now lives once, in the Dependency
reference prose, which names `contract.md`, `html.md`, `guide.md`, and `scaffold.md`
and names `probe.md` and `test.md` nowhere — the sibling's state, as the refuter ruled.

### markdown-subj-5 — the boolean parameter's TSDoc form

`src/core/helpers.ts` `normalizeInlines`'s `@param breaks` now reads the required
"If `true`, …; if `false`, …" form. The signature, the `@remarks`, and the guide's
Helpers row are unchanged.

### markdown-obj-1 — reuse `collapseSpace`

`collapseSpace` joins the existing `@orkestrel/html` value import between `attributeOf`
and `foldNode as foldHTMLNode`, matching that list's ASCII order. `projectionToInlines`
and the `img` arm of `projectHTMLNode` now call it. `projectHTMLLeaf`'s
`leaf.value.replace(/\s+/g, ' ')` is untouched. No guide edit was needed.

Neither site had a test pinning the collapse-and-trim contract before this row, so the
swap was unproven. Two cases now pin it, one per site.

### markdown-obj-2 — flagship fence transcriptions

`tests/guides.test.ts` gains a `describe('flagship fences', …)` section after the
manifest loop, in the shape `/home/user/fleet/contract/tests/guides.test.ts` and
`/home/user/fleet/budget/tests/guides.test.ts` use. Every ```ts fence of
`guides/markdown.md` whose `//` comments claim a value or a behaviour is transcribed
against `@src/core`, with a presence guard beside it reading the transcribed lines out
of `files['guides/markdown.md']`.

The transcribed fences are the source-provenance fence, the escaped-spelling fence, the
`parseProvenance` fence, the rewrite-provenance fence, the absent-provenance fence, the
offset-bearing
`scanInlineSource` fence, the house-rule element-policy fence, the construct-and-narrow
fence, the adoption fence, the filter-and-flatten fence, the rewrite-chain fence, the
reduce fence, the fold fence, the streaming fence, the sync-iteration fence, the
async-iteration fence, the standalone projections fence, the scanner fence, the
guide-parity extraction fence, and the contract-fixture fence.

No transcription disagreed with the code, so there is no guide-drift finding to report.

The adoption fence, the house-rule fence, and the guide-parity extraction fence each
declare a named function of their own. Keeping the declaration inside its case would
nest a function in a body, which `AGENTS.md` § Design laws refuses, so each sits at the
test file's module scope with the fence's own name and body — the form
`tests/setup.test.ts` already uses for its derivation helpers. That is the one ancillary
decision this row took, recorded here.

The file's header comment said "The four constants below", which is a count over a set
anyone can add to and was already false. It now reads "The constants below".

### markdown-obj-3 — `performance.now()`

Both readings of the linear-time case in `tests/src/core/parsers.test.ts` now use
`performance.now()`. Nothing else in the case changed and the 1000 ms ceiling was not
re-derived.

### markdown-obj-4 — `LinkScan` and `EmphasisScan`

`src/core/types.ts` declares both interfaces immediately after `EmphasisBounds`, in the
file's TSDoc form. `scanLink` and `scanEmphasis` are annotated with them, and both names
joined the type import block in its existing order. `EmphasisNode` and `LinkNode` became
unused imports in `helpers.ts` once the inline shapes went, so they left the block.

The guide's two Types rows sit after the `EmphasisBounds` row, and the `scanLink` /
`scanEmphasis` signature cells now name the types.

### fleet-F1 — `isBrowserVuePath` residue

`noop`. Read `/home/user/fleet/markdown/tests/setup.ts` in full: it declares no
`isBrowserVuePath` and its header comment names none. A word-boundary sweep for
`isBrowserVuePath` over the checkout excluding `node_modules` returns no match. The
workspace has no browser environment: the glob
`/home/user/fleet/markdown/{src,app,tests}/**/{browser,setupBrowser.ts}` returns no file.
`tests/setup.ts` exports the markdown assertion family, the projection fixtures, the
corpora, and the adversarial builders, so its sole-export branch does not apply either.

### fleet-F2 — the `id` field ahead of the `#` fields

`noop`. A `\bclass \w+` sweep over `src` finds one class, `Markdown`
(`src/core/Markdown.ts:54`); the other two hits are the word `class` inside comments. Its
first members are `readonly #document` (`:55`) and `readonly #spans` (`:56`). A
`readonly id: string` sweep over `src` returns no match, so no class in this package has
the shape the row names.

## Files touched

| File                             | Change                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/core/types.ts`              | Renamed `MarkdownHandlers` to `MarkdownHandlerMap`; added `LinkScan` and `EmphasisScan`      |
| `src/core/Markdown.ts`           | Renamed the `fold` handler-table type in the import, the TSDoc, and the signature            |
| `src/core/helpers.ts`            | Renamed type; named both scan returns; reused `collapseSpace`; repaired the boolean TSDoc    |
| `guides/markdown.md`             | Renamed type across tables and fences; added the two Types rows; repaired the See-also line  |
| `guides/README.md`               | Dropped the `AGENTS §22` citations and the `guides/src` By-directory row                     |
| `tests/guides.test.ts`           | Added the flagship-fence transcription section and its module-scope fence helpers            |
| `tests/src/core/helpers.test.ts` | Renamed type; added the collapse-and-trim case for each `collapseSpace` site                 |
| `tests/src/core/Markdown.test.ts`| Renamed the handler-table type at the import and the four annotated tables                    |
| `tests/src/core/parsers.test.ts` | Swapped both `Date.now()` readings for `performance.now()`                                   |

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

Every capture is the unedited runner output of one invocation, under
`/home/user/work/evidence/markdown-proofs/`.

### markdown-obj-1

Command: `npm --prefix /home/user/fleet/markdown run test:src:core`.

- Control: both call sites planted with the non-collapsing `.trim()` body the row
  replaces. Red — `Tests  2 failed | 602 passed (604)`, the two failures being
  `projectionToInlines > collapses every whitespace run of the flattened text and drops
  its edge whitespace` and `projectHTMLNode > collapses every whitespace run of an image
  alternative text and drops its edge whitespace`.
  File: `markdown-obj-1-control-red.txt`.
- After the repair: `Tests  604 passed (604)`. File: `markdown-obj-1-green.txt`.

### markdown-obj-2

Command: `npm --prefix /home/user/fleet/markdown run test:guides`.

The section is new, so it has no pre-repair red of its own; the control proves each half
of the pair fires. Two defects were planted at once, one per half, and both removed
afterwards:

- executed half — `scanEmphasis` in `src/core/helpers.ts` returned `located.end + 1`;
- presence half — `guides/markdown.md`'s `link?.end // 21` comment read `// 22`.

Red — `Tests  2 failed | 56 passed (58)`: `scans one inline construct at a time and
degrades an unclosed one to undefined` (the transcription, on the source defect) and
`carries the scanner fence lines the transcription copies` (the presence guard, on the
guide drift). File: `markdown-obj-2-control-red.txt`.

After removing both plants: `Tests  58 passed (58)`. File: `markdown-obj-2-green.txt`.
The `src/core/helpers.ts` and `guides/markdown.md` diffs carry no residue of either
plant.

`markdown-obj-2-first-run.txt` is the section's first execution, before the last two
fence pairs were added: `Tests  54 passed (54)`. Every transcription agreed with the code
on that first run, which is why the control above exists — a suite that has never been
red proves nothing until something makes it red.

### markdown-obj-3

The swap can only make the reading more precise, never larger, so no plant can redden it
in a way that names the defect. Green after the change:
`npm --prefix /home/user/fleet/markdown run test:src:core` → `Tests  604 passed (604)`.
File: `markdown-obj-3-green.txt`.

### markdown-subj-1, markdown-subj-2, markdown-subj-3, markdown-subj-4, markdown-subj-5, markdown-obj-4

Naming, placement, and documentation rows. Their proof is the sweep that the old form is
gone (§ Sweeps) beside the gate that proves the new one (§ Gates) — `check` for the
renamed and newly named contracts, `test:guides` for the guide rows the parity assertions
key on.

## Sweeps

Every pattern was run with the `Grep` tool over `/home/user/fleet/markdown` excluding
`node_modules/**`, except where a narrower path is named.

| Pattern                                                          | Path                | Result                                                     |
| ---------------------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| `MarkdownHandlers`                                               | package             | 0                                                          |
| `markdownhandlers\|MarkdownHandlered\|MarkdownHandlering` (`-i`) | package             | 0                                                          |
| `MarkdownHandlerMap\|LinkScan\|EmphasisScan` (before the change) | package             | 0 — the collision check                                    |
| `readonly node: (LinkNode\|EmphasisNode); readonly end`          | package             | 0                                                          |
| `@param \w+ - (Whether\|whether)`                                | `src`               | 0                                                          |
| `@param \w+ - (Whether\|whether)`                                | package             | 1, `tests/setupPolicy.ts` — vendored, off-limits           |
| `\.replace\(/\\s\+/g, ' '\)\.trim\(\)`                           | package             | 0                                                          |
| `replace\(/\\s\+/g`                                              | `src`               | 2 — `helpers.ts:454` (`''`) and `:2384` (no trim), both kept |
| `Date\.now\(`                                                    | package             | 0                                                          |
| `§\d`                                                            | package             | Hits in the vendored mirrors `guides/contract.md` and `guides/guide.md`, plus `tests/setup.ts:54`; none in `guides/markdown.md` or `guides/README.md` |
| `isBrowserVuePath`                                               | package             | 0                                                          |
| `\bclass \w+`                                                    | `src`               | 1 class, `Markdown`                                        |
| `readonly id: string`                                            | `src`               | 0                                                          |

Count sweeps over the rows that delete an enumeration, ruled by sense:

| Pattern                                                                                                                                        | Path                   | Ruling                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b` (`-i`)                                                                        | `guides/README.md`     | 2 hits. `the two conversion directions` names a closed pair — permitted. `this package's two runtime dependencies` is a count — reported, outside every row |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b` (`-i`)                                                                        | `tests/guides.test.ts` | Every hit ruled. `Two fences … declare` and `chains two rewrites` were counts I had authored and are now gone; the rest are pronouns, singular references, or transcribed markdown data (`'one'`, `'two'`, `# One`) |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` (`-i`) | package                | 3 hits, none mine: `compilers.test.ts:197` reports the `MAX_DEPTH` value under measurement — permitted; `guides/html.md` and `guides/contract.md` are vendored mirrors |

## Gates

Run in order, one command per call, from `/home/user/fleet/markdown`. Every capture is
under `/home/user/work/evidence/markdown-proofs/`.

| Gate                | Command                     | Exit | Reading                                                    | File                    |
| ------------------- | --------------------------- | ---- | ------------------------------------------------------------ | ----------------------- |
| `npm run format:check` | `oxfmt --check .`        | 0    | `All matched files use the correct format.` on 47 files    | `gate-format-check.txt` |
| `npm run lint:check`   | `oxlint --deny-warnings .`| 0   | no diagnostic                                              | `gate-lint-check.txt`   |
| `npm run check`        | `tsc --noEmit` ×2         | 0    | no diagnostic                                              | `gate-check.txt`        |
| `npm run build`        | `vite build` + `copy`     | 0    | `✓ built in 4.86s`, `Copied: dist/src/core/index.d.ts …`   | `gate-build.txt`        |
| `npm test`             | five projects             | 0    | src:core 604, policy 111, config 46, setup 24, guides 58   | `gate-test.txt`         |

No failure excerpt: no gate reported one.

`git status --short` lists only modified files under Owned, and no untracked file:

```text
 M guides/README.md
 M guides/markdown.md
 M src/core/Markdown.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/Markdown.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/parsers.test.ts
```

**Observation, not a criterion.** The `npm test` reading above was taken inside this
unit's own exec. The Orchestrator takes the deciding run after the unit exits.

## Breaking

`markdown-subj-1` renames the published type `MarkdownHandlers<T>` to
`MarkdownHandlerMap<T>`. `markdown-obj-4` adds `LinkScan` and `EmphasisScan` and narrows
two published return annotations from structurally identical anonymous shapes, which is
source-compatible for every consumer.

No fleet consumer imports `MarkdownHandlers`. The only in-fleet importer of
`@orkestrel/markdown` is `@orkestrel/guide`, which imports `BlockNode`, `InlineNode`,
`MarkdownDocument`, `TableNode`, `flattenText`, `isCodeBlockNode`, `isCodeSpanNode`,
`isEmphasisNode`, `isHeadingNode`, `isImageNode`, `isLinkNode`, `isTableNode`,
`walkNodes`, and `createMarkdown`, and none of the renamed ones. The rename is therefore breaking to the published type surface and to no in-fleet
package, exactly as the brief records.

Consumer edits obliged: none.

## Shared-file patches

None. Every edit landed inside Owned. No file under `/home/user/fleet/` outside this
checkout, and no vendored dependency guide mirror, was changed.

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a
file outside Owned, or required a consumer edit to keep this package's gates green.

## Observations for the Orchestrator

These sit outside every row of this brief and have no carrier here.

1. **`tests/setup.ts:54` cites `AGENTS §1 / §16`.** The line reads
   ``// AGENTS-forbidden; §1 / §16). Thin assert-and-narrow wrappers over `@src/core`'s``.
   It is a source comment inside claim S6's stated population, and the refuter's note on
   `markdown-subj-2` flagged it as needing its own carrier. This unit did not touch it,
   because no row carries it. It is the only remaining `§\d` hit in a package-owned file.
2. **`guides/README.md:20` states a count.** "one of this package's two runtime
   dependencies" tallies the runtime dependency set, which can grow. The line sits in the
   Dependency reference prose, which `markdown-subj-4` does not reach.
3. **`tests/setupPolicy.ts` carries a `@param … Whether` block.** It is the vendored
   scaffold file and is off-limits here; the repair belongs to
   `@orkestrel/scaffold`'s own `dist/host` surface.
4. **`guides/markdown.md` and `guides/html.md` both lack a `renderHTML` fence that
   asserts the sanitizer's output byte for byte.** The new `drives every standalone
   projection and traversal from a bare node` case asserts
   `renderHTML(markdown.document)` returns `'<h1>Hi</h1><p>Text.</p>'`, which is the only
   `renderHTML` value the guide claims in a fence. The Sanitization policy section's
   claims — the `src` widening, the refused-URL behaviour, `align` over `style` — sit in
   prose and in a ```text fence, so no fence transcription reaches them. They are proved
   in `tests/src/core/compilers.test.ts` rather than left unproven, but a successor round
   wanting the guide's own prose bound would need executed assertions beside those
   sentences.
