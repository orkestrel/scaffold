# Unit brief — D2-fix-2: one key grammar behind the readers and the locator, and the round-2 findings

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing.

## Objective

The compared-key grammar exists once in `src/core/helpers.ts`, exported as `collectKeys` and run by `extractExports`, `extractMemberMethods`, and `locateComment` alike, with a corpus-scale control pinning the member and owner rules; and every finding `d2-audit-verdict.md` round 2 carries closes as prescribed here (H1 to H7).

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-brief.md`, `d2-fix-report.md`, `d2-audit-verdict.md` (round 2), `d2-fix-audit-subjective.md` (claim 10 and F1 to F5), `d2-fix-audit-objective.md` (claim 9 and findings 1 to 3).
3. The files you own at their uncommitted state.

## Standing conditions

- The tree carries D2 and D2-fix uncommitted across `guides/guide.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`; that state is what you edit. Never a discard-class git command, never a commit, never `npm install`, never `npm run build`.
- `node_modules/@orkestrel/scaffold` is the campaign's head start installed with `--no-save`.
- Linux, bash, Node v22.22.2; the host's command classifier refuses `npx scaffold …`, and this unit needs no scaffold command.

## Edits, exact

**H1. One key grammar.** Export `collectKeys(lines: readonly SourceLine[]): ReadonlyMap<SourceLine, string>` from `src/core/helpers.ts` beside `collectSummaries`: for every column-zero export head, the `computeSymbolKey` symbol key; for every one-tab callable member inside an owner (a column-zero `export class` or `export interface` head closed by the first column-zero `}`), the `Owner.member` key. Route `extractExports`, `extractMemberMethods`, and `locateComment` through it so the export-head pattern, the member pattern, and the owner-close rule each exist once in the file (`grep -c` over the file finds each pattern once); where `extractExports` needs the keyword beside the key, derive it from the same match rather than a second pattern, and record how. Rewrite `locateComment`'s TSDoc (`src/core/helpers.ts:2740-2742`) to describe what the code then does. Cases: `collectKeys` over the D1 control fixtures and a member fixture; a corpus-scale member control — for every `Owner.member` key `extractDeclaration` with `extractMemberMethods` reports over this package's own `src/`, `locateComment`'s located block carries that member's summary — beside the declaration-side control at `tests/src/core/helpers.test.ts:4027`; a guide row for `collectKeys`. The tip's cases for the two readers stay green with no case weakened.

**H2. `spliceSpan`'s parameter.** `src/core/helpers.ts:2351`: the `@param span` names both producers — the region `MarkdownInterface.span` reports for a Markdown node, or `locateComment` reports for a doc block.

**H3. The sentence at `src/core/helpers.ts:1688-1690`** becomes: "A summary that needs one of those constructs takes another shape: name the construct in prose rather than expecting the comparison to converge it."

**H4. `below`.** `tests/src/core/helpers.test.ts:2926`: `following` in place of `below`; sweep the owned files for `above` and `below` used as pointers and recast each.

**H5. `readBlocks` and `readSummary`** in `tests/src/core/helpers.test.ts` become `extractBlocks` and `extractSummary` (the package's word for structure taken from a string), every call site included.

**H6. The delimiter set on its own terms.** `src/core/helpers.ts:1675-1677`: state the located set as one backtick per side, no inner backtick, no adjacent backtick, the way `guides/guide.md:344` does, and drop the `buildCell` appositive or requalify it as "the delimiter shape `buildCell` emits".

**H7. The report.** Your report cites `src/core/helpers.ts:1721-1723` for the over-length token sentence and `tests/guides.test.ts:401` for the transcription guard, and it backs the D2-fix report's "no Vitest cache directory survives" sentence with a named search over `node_modules/.vite*` and `node_modules/.vitest` and its result, or drops the sentence and rests the probe disclosure on the tree search and the ignored-path and history argument.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `guides/guide.md`, `tests/src/core/**`, `tests/guides.test.ts`, `tmp/**`.
- Off-limits: everything else, `tests/setup.ts` included, `package.json`, `package-lock.json`, `configs/**`, `README.md`, `src/core/Guide.ts`, `src/core/sources/Source.ts`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides`, `npm test`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -c "^export (?:async )?" src/core/helpers.ts`-style counts, stated as the exact commands you ran, show the export-head pattern, the member pattern, and the owner-close rule once each; `grep -n "export function collectKeys" src/core/helpers.ts` prints one line; `grep -rn "readBlocks\|readSummary\|below" tests/src/core/helpers.test.ts` prints nothing.
2. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with the `collectKeys` cases and the corpus-scale member control present, and the tip's reader cases unchanged.
4. `npm run test:guides` exits 0 with the `collectKeys` row present.
5. Observation: `npm test` exit code and last lines.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d2-fix-2-report.md`: one line per edit H1 to H7 with `file:line` at the final tree, how `extractExports` derives the keyword from the shared match, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims; no count in prose. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when routing a reader through `collectKeys` changes any tip case's reading, when a criterion needs an off-limits file, or when a gate fails outside the owned files. The record shape `collectKeys` maps to, if a bare string cannot carry what `extractExports` needs, is yours to decide and record, with its shape, guard, and contract in the centralized files.
