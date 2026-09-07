// Lowers all-caps emphasis in the doc blocks and module banners under `src/core`.
// Each pair must match exactly once; a miss or a duplicate stops the run.
import { readFileSync, writeFileSync } from 'node:fs'

const EDITS = [
	['src/core/Markdown.ts', 'keeping the AST and a COPY of the span map', 'keeping the AST and a copy of the span map'],
	['src/core/Markdown.ts', 'and is NOT re-validated', 'and is not re-validated'],
	['src/core/Markdown.ts', 'reads the region of the ORIGINAL constructor string', 'reads the region of the original constructor string'],
	['src/core/Markdown.ts', 'A node reports the region THIS handle holds', 'A node reports the region this handle holds'],
	['src/core/Markdown.ts', 'it returns a NEW `Markdown`', 'it returns a new `Markdown`'],
	['src/core/Markdown.ts', 'Returns THE deep traversal', 'Returns the deep traversal'],

	['src/core/helpers.ts', 'Every function is PURE, TOTAL, and referentially transparent', 'Every function is pure, total, and referentially transparent'],
	['src/core/helpers.ts', 'The `parse*` ENTRY POINTS that thread', 'The `parse*` entry points that thread'],
	['src/core/helpers.ts', 'three or more of the SAME', 'three or more of the same'],
	['src/core/helpers.ts', 'header row IMMEDIATELY followed by a delimiter row', 'header row immediately followed by a delimiter row'],
	['src/core/helpers.ts', 'inside a cell is NOT a separator', 'inside a cell is not a separator'],
	['src/core/helpers.ts', 'starts a NEW block kind', 'starts a new block kind'],
	['src/core/helpers.ts', 'SAME length, the CommonMark rule', 'same length, the CommonMark rule'],
	['src/core/helpers.ts', 'The closer must be EXACTLY `run` backticks', 'The closer must be exactly `run` backticks'],
	['src/core/helpers.ts', 'Locates a link `[text](href)` at `start` — the text runs to a BALANCED `]`', 'Locates a link `[text](href)` at `start` — the text runs to a balanced `]`'],
	['src/core/helpers.ts', 'Scans a link `[text](href)` at `start` — the text runs to a BALANCED `]`', 'Scans a link `[text](href)` at `start` — the text runs to a balanced `]`'],
	['src/core/helpers.ts', 'The parsed inline nodes (NOT yet coalesced)', 'The parsed inline nodes (not yet coalesced)'],
	['src/core/helpers.ts', 'to its CANONICAL markdown source', 'to its canonical markdown source'],
	['src/core/helpers.ts', 'contributes the projection ONLY:', 'contributes only the projection:'],
	['src/core/helpers.ts', 'WRONG, which is what the round-trip anchor law', 'wrong, which is what the round-trip anchor law'],
	['src/core/helpers.ts', 'survives a re-parse only BETWEEN', 'survives a re-parse only between'],
	['src/core/helpers.ts', 'paragraph BEFORE it.', 'paragraph before it.'],
	['src/core/helpers.ts', 'Reads a projection as BLOCK content', 'Reads a projection as block content'],
	['src/core/helpers.ts', 'Reads a projection as INLINE content', 'Reads a projection as inline content'],
	['src/core/helpers.ts', 'THE element mapping, and the only place', 'The element mapping, and the only place'],
	['src/core/helpers.ts', 'text included. Every OTHER', 'text included. Every other'],
	['src/core/helpers.ts', 'padding moves OUTSIDE the marker', 'padding moves outside the marker'],
	['src/core/helpers.ts', 'A span padded on BOTH sides', 'A span padded on both sides'],
	['src/core/helpers.ts', 'a chain bounded by THAT cap', 'a chain bounded by that cap'],
	['src/core/helpers.ts', 'link or image is KEPT — `[text]()` — since a bad URL', 'link or image is kept — `[text]()` — because a bad URL'],
	['src/core/helpers.ts', 'the fixpoint that matters is the\n * PROJECTED AST, not the input bytes', 'the fixpoint that matters is the\n * projected AST, not the input bytes'],
	['src/core/helpers.ts', 'receives ONE folded `T` per inline node', 'receives one folded `T` per inline node'],
	['src/core/helpers.ts', 'walk order across ALL cells', 'walk order across all cells'],
	['src/core/helpers.ts', 'document ROOT is never passed', 'document root is never passed'],
	['src/core/helpers.ts', "A table's inline cells and a list's items ARE rewritten.", "A table's inline cells and a list's items are rewritten too."],
	['src/core/helpers.ts', 'UNCHANGED (by reference, not rebuilt', 'unchanged (by reference, not rebuilt'],
	['src/core/helpers.ts', 'so the anchor law below is a law', 'so the anchor law that follows is a law'],

	['src/core/shapers.ts', 'Shapers are `ContractShape` VALUES, not functions', 'Shapers are `ContractShape` values, not functions'],
	['src/core/shapers.ts', 'Only the NON-recursive', 'Only the non-recursive'],

	['src/core/types.ts', 'Addresses a half-open region of the ORIGINAL markdown string', 'Addresses a half-open region of the original markdown string'],
	['src/core/types.ts', 'ORIGINAL source region the node was produced from', 'original source region the node was produced from'],
	['src/core/types.ts', 'back to the region of the ORIGINAL', 'back to the region of the original'],
	['src/core/types.ts', "The run's DERIVED", "The run's derived"],
	['src/core/types.ts', 'LAST segment whose `offset` equals `p`', 'last segment whose `offset` equals `p`'],
	['src/core/types.ts', '(escapes resolved, NOT yet HTML-escaped)', '(escapes resolved, not yet HTML-escaped)'],
	['src/core/types.ts', 'ALREADY folded to `T`', 'already folded to `T`'],
	['src/core/types.ts', 'to ONE folded `T` per inline node', 'to one folded `T` per inline node'],
	['src/core/types.ts', 'It is NOT a leaf:', 'It is not a leaf:'],
	['src/core/types.ts', 'the nodes of THAT document', 'the nodes of that document'],
	['src/core/types.ts', 'carries the region ENCLOSING its parts', 'carries the region enclosing its parts'],
	['src/core/types.ts', 'keyed by the nodes of the OUTPUT, and each entry names the DIRECT', 'keyed by the nodes of the output, and each entry names the direct'],
	['src/core/types.ts', "the output identity's OWN span", "the output identity's own span"],
	['src/core/types.ts', 'returns a NEW {@link MarkdownInterface} instance', 'returns a new {@link MarkdownInterface} instance'],
	['src/core/types.ts', 'Returns THE deep traversal', 'Returns the deep traversal'],
	['src/core/types.ts', 'where THIS handle holds coordinates', 'where this handle holds coordinates'],
	['src/core/types.ts', 'A text run the PARSE joined', 'A text run the parse joined'],
	['src/core/types.ts', 'only a REWRITE output that holds no region', 'only a rewrite output that holds no region'],

	['src/core/validators.ts', 'narrow an ALREADY-PARSED MarkdownNode', 'narrow an already-parsed MarkdownNode'],
]

const texts = new Map()
for (const [file, from, to] of EDITS) {
	const text = texts.get(file) ?? readFileSync(file, 'utf8')
	const at = text.indexOf(from)
	if (at === -1) throw new Error(`no match in ${file}: ${JSON.stringify(from)}`)
	if (text.indexOf(from, at + 1) !== -1) throw new Error(`duplicate in ${file}: ${JSON.stringify(from)}`)
	texts.set(file, text.slice(0, at) + to + text.slice(at + from.length))
}
for (const [file, text] of texts) writeFileSync(file, text)
process.stdout.write(`files rewritten: ${[...texts.keys()].join(', ')}\n`)
