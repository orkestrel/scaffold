# Retained Guide reader correction report

Journal tmp/claude/d7n-guide-heading-close-fix.jsonl; session 9adca1da-f1cf-4d9c-96ea-1edb01135f1b. The returned body follows unchanged. Prose counts remain report defects, not package work.

Unit complete. Report follows.

## Unit d7n-guide-heading-close-fix — report

Baseline matched the brief: `0accc1509113e67e2362a51cd9789e5b05005879`, clean status, branch `claude/orkestrel-npm-audit-deps-14ibta`. No deviation stopped the unit.

### R1 — reader named as the actor

- `src/core/helpers.ts:1502-1504` (`extractSurface` `@remarks`): "Heading padding, emphasis, and links preserve that identity. Additional visible text or code spans refuse admission." → "Surrounding spaces, emphasis, and links preserve that identity. This reader refuses a heading carrying any other visible text or an additional code span."
- `guides/guide.md:324-326`: same replacement with `extractSurface` as the named subject: "Surrounding spaces, emphasis, and links preserve that identity. `extractSurface` refuses a heading carrying any other visible text or an additional code span."
- Supported forms unchanged: padding, generic annotation, emphasis, and link wrappers still described as preserving identity.

### R2 — implementation expression removed from the guide

- `guides/guide.md`: deleted "The heading boundary compares `extractCellText(block.children).trim()` with the raw value from `findFirstCode` before generic normalization."
- The public rule stays in the preceding sentence ("every H3 entity heading whose trimmed compared inline content is exactly its backticked code-span name").
- The implementation detail remains in `src/core/helpers.ts:1501-1502` as `@remarks` through `{@link}` targets.
- No `block.children` or `extractCellText(` text remains anywhere under `guides/`.

### R3 — dedup sentence moved beside `extractSurface`

- `guides/guide.md:326-329`: "Surface entries retain encounter order and deduplicate by name + keyword: … the same name under another keyword remains distinct." now closes the `extractSurface` run, immediately before "`extractMethods` scopes to `## Methods`". Moved verbatim; behavior wording unchanged.
- `guides/guide.md:333`: the sentence's former site now reads "… so the bijection key is always the bare name. `extractLinks` walks the …".

### R4 — `extractCellText` tag block widened to its heading use

- `src/core/helpers.ts:976-977`: `@param cell - The cell's inline nodes` → `@param cell - The inline nodes to flatten`; `@returns The cell's text, code spans included` → `@returns The compared text, code spans included`.
- Parameter name `cell` and the public signature are unchanged, so the `Signature` cell at `guides/guide.md:127` still matches.

### R5 — fixture named for its demonstration heading

- `tests/setup.ts:15`: `ENTITY_HEADING_GUIDE` → `DEMONSTRATION_HEADING_GUIDE`. Document bytes and doc comment unchanged.
- Importers updated: `tests/src/core/Guide.test.ts:4` and `:31`; `tests/src/core/helpers.test.ts:77-82` and `:1083`.
- A repository-wide search for `ENTITY_HEADING_GUIDE` outside `node_modules` returns nothing.

### R6 — case matrix relocated to the setup file

- `tests/setup.ts:26-39`: added `EntityHeadingCase` (`readonly [heading: string, surface: readonly SurfaceSymbol[]]`) and `ENTITY_HEADING_CASES`, carrying the eight rows verbatim in their original order. `SurfaceSymbol` joins the existing `import type … from '@src/core'` line at `tests/setup.ts:2`.
- `tests/src/core/helpers.test.ts:1077-1080`: registration stays in the test file as `it.each(ENTITY_HEADING_CASES)(…)`; the body and its `expect(extractSurface(document)).toEqual(expected)` assertion are byte-identical to before.

### Unchanged boundaries

- `src/core/helpers.ts:1516-1548` (`extractSurface` body), `findFirstCode`, `normalizeIdentifier`, `extractCellText` body, the table branch, section selection, encounter order, and keyword-sensitive deduplication are untouched.
- No public signature, type shape, export, assertion, or case row changed. F1 refused: no image-specific admission policy, no heading/table reordering, no earlier-entry enrichment.
- `src/core/types.ts` needed no edit; its `GuideInterface.surface` remarks carry no padding or refusal sentence, so R1 has no site there. No compared `Summary` cell moved, because R1 and R4 touched only `@remarks` and tag lines.

### Touched paths

- `guides/guide.md` — two hunks in "The extraction model".
- `src/core/helpers.ts` — two hunks, both inside doc blocks.
- `tests/setup.ts` — three hunks: type import, rename, added type and matrix.
- `tests/src/core/helpers.test.ts` — three hunks: import block, `it.each` registration, fixture reference.
- `tests/src/core/Guide.test.ts` — two hunks: import and constructor argument.

### Decisions to review

- I shortened the case label from `'applies the entity-heading boundary to %s'` to `'applies the heading boundary to %s'`. With the matrix extracted, the hugged registration head measured 101 columns against the `printWidth` of 100 in `.oxfmtrc.json` (tab counted as `tabWidth` 2), and I could not run `oxfmt` to settle which shape it emits. The shorter label holds the line at 94 columns under either accounting and matches the "heading boundary" term the source and guide already use. Settled as incidental prose in owned scope; flagged because the verdict quoted the longer label.
- `ENTITY_HEADING_CASES` and `EntityHeadingCase` have no sibling `describe` in `tests/setup.test.ts`, matching the state `DEMONSTRATION_HEADING_GUIDE` was already in. That file is outside owned scope and the verdict declined Ref-2. Report-only.

### Validation

Unrun. I executed no command: no format, lint, typecheck, focused test, docs, or gate chain. Every claim here is a read of the edited files, not a run. Root owns the focused source tests, the docs and parity checks, and the full package gate chain. I do not accept this work.

