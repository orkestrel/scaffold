# Unit brief — D1 guide-readers: both sides of the parity read into one form, in `@orkestrel/guide`

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit (Sol's by the plan's routing, run on Opus with the substitution recorded while the Codex bench is dark). Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing.

## Objective

`@orkestrel/guide` reads the compared facts from both sides — a guide's Surface and Methods `Summary` cells, its fences with their heading titles, and its H1 tagline; a source's doc-block description paragraphs, its member doc paragraphs, and its titled `@example` bodies — into one normalized form, and `findDrift` names every disagreement with both sites, so a package's `tests/guides.test.ts` can refuse the tree while its guide and its TSDoc disagree. No renderer and no writer in this unit (D2 owns them).

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md` (§ Shared test infrastructure, § Probes), `.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/quality.md` § Instruments.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md`, `plan.md` (decisions 1 to 5 bind this unit), `orchestrator-measurements.md` (P1, P3, P4, P5, P6), and `absorb-distillate.md` § B and § C.
3. The code, at this checkout's current tip: `src/core/types.ts` (`ExportKeyword`, `SurfaceSymbol`, `SourceLine`, `MethodGroup`, `GuideFence`, `GuideInterface`, `SourceInterface`), `src/core/Guide.ts`, `src/core/sources/Source.ts`, `src/core/helpers.ts` (`extractSourceLines`, `findKindIndex`, `extractSurface`, `extractMethods`, `extractExampleLines`, `extractExamples`, `extractExampleMethods`, `findUnexampled`, `extractFences`, `findMissingSymbols`, `computeSymbolKey`, `normalizeIdentifier`), `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `guides/guide.md` (§ Surface, § Methods, § The extraction model, § The check catalog, § Patterns, § Tests), and `tests/**`.
4. The Orchestrator's instrument that already pairs both sides by name over scaffold's guide and doc blocks: `/home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/p3/p3-equality.mjs` with its log `p3-equality.log.txt`. It is a probe, not a design: its table reader is line-shaped and its source reader uses `parseSync`; this unit's readers are the package's own text scanners, and `parseSync` appears only as the control in the suite.

## What is fixed (the plan's decisions 1 to 5)

- **The compared unit is the description paragraph**: on the source side, the doc block's text from its opening to its first block tag; on the guide side, the `Summary` cell. The first sentence is not extracted as its own fact.
- **The transform, stated on the interface that carries it**: source side, `{@link X}` and `{@link A.b}` become the code token of the target text (`{@link X | text}` becomes the code token of `text`), continuation markers and line breaks collapse to single spaces; guide side, `**emphasis**` and `_emphasis_` drop to their text, `[text](target)` drops to `text`, `\|` unescapes; code spans stay code spans on both sides; leading and trailing whitespace trims. Nothing else is transformed. Outside the comparison, stated in `guides/guide.md`: `@param`, `@returns` and the `Returns` column, `@remarks` and narrative, and the H1 tagline (read, not compared, until a source declares `@packageDocumentation`).
- **The `Summary` column is located by header text**, exactly as `findKindIndex` locates `Kind`; a Surface or Methods table without a `Summary` column, a row with no code-span name, and a row whose name pairs with no export are findings, never silent skips. `Shape`, `Signature`, `Value`, and `Returns` columns are guide-only data and stay unread by the comparison.
- **Examples pair by title**: a `GuideFence` gains `readonly title?: string`, the flattened text of its nearest preceding heading; a source `@example` with a title claims the fence of that title; the bodies compare after the doc-comment unwrapping (the continuation marker `* ` and the block's leading indentation removed, per-line trailing whitespace trimmed) and the fence language compares too. An untitled `@example` keeps its presence role for `findUnexampled`.
- **Types**, in `src/core/types.ts`, every property readonly, one word each: `SurfaceSymbol` gains `readonly summary?: string` (optional, so no consumer's hand-built symbol breaks; `computeSymbolKey` is unchanged); `MethodEntry { readonly name: string; readonly summary?: string }` is new and `MethodGroup.methods` becomes `readonly MethodEntry[]`, as does the return of `SourceInterface.methods(name)`; `SourceExample { readonly name: string; readonly title?: string; readonly code: string; readonly language?: string }` is new and `SourceInterface.examples()` and `examples(name)` return `readonly SourceExample[]`; `Drift { readonly key: string; readonly guide?: string; readonly source?: string }` is new, `key` being the symbol key (`computeSymbolKey`), the `Owner.member` key, or the example title, and an absent side `undefined`; `GuideInterface` gains `tagline(): string | undefined` (the H1 blockquote's text). Update `surfaceSymbolShape`, `methodGroupShape`, `isSurfaceSymbol`, `isMethodGroup`, and the contracts in `factories.ts` to the new shapes, and add shapes, guards, and contracts for the new records in the same files.
- **`findDrift(guide, source): readonly Drift[]`** in `src/core/helpers.ts`, joining the `find*` family: over the Surface pairing the existing bijection computes (a symbol on both sides), the Methods pairing per `MethodGroup`, and the titled examples; it reports a disagreement with both texts, a side missing its text with that side `undefined`, and never a symbol the SB or MB checks already report as absent. It reduces a package's new checks to an empty-array assertion, which is the catalog's contract.
- **The readers extend the package's own text scanners**: the description reader is a sibling of `extractExampleLines` over the `jsdoc` spans `extractSourceLines` aligns; the `Summary` locator is a sibling of `findKindIndex`; the fence title comes from the heading walk `Guide` already does; `Source` stays text-only and I/O-free (`Source.ts:24-28`), and no compiler and no parser enters `src/**`.
- **The control**, in `tests/src/core/**`: `parseSync` from `vite` (a development dependency this checkout already declares) reads `ParseResult.comments` by range and attaches each doc block to the export it precedes; the suite compares the text reader's paragraphs against that reading over fixtures carrying an overload set, a doc block separated from its declaration by a blank line, a doc block inside a template literal, and a re-export-only barrel, and asserts each miss the text reader is allowed (state them) and no other. This is the permanent control the plan names; it imports `vite` in the test tier only.
- **`guides/guide.md`** states every new type and function in its tables (the Types, Helpers, and Methods tables), the transform, what is outside the comparison, the four new checks the catalog gains (SQ Surface summary equality, MQ Methods summary equality, EQ example equality, and TQ tagline read — name TQ only if a check exists for it), and the example-title pairing, in the guide's own voice; the parity test of this checkout decides the rows.
- **Nothing is rendered or written**: no `render*`, no `replace*`, no file I/O.

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `src/core/Guide.ts`, `src/core/sources/Source.ts`, `src/core/shapers.ts`, `src/core/validators.ts`, `src/core/factories.ts`, `src/core/constants.ts` (only if a new constant is needed), `guides/guide.md`, `tests/src/core/**`, `tests/guides.test.ts` (this checkout's own parity rows and any `MethodGroup.methods` consumer).
- Off-limits: everything else, the vendored pair, `tests/distribution.test.ts`, `package.json`, `package-lock.json`, `configs/**`, `README.md`.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run test:src:core`, `npm run test:guides`, `npm run lint:check`, `npm run check`. Never `npm install` (it restores the registry scaffold over the installed head start), `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2; `node_modules/@orkestrel/scaffold` is the campaign's head start installed with `--no-save`; the tree is committed and clean apart from `tmp/`; this checkout's oxlint is 1.81.0 and its oxfmt is the version `package.json` declares; the host's command classifier refuses `npx scaffold …`, and this unit needs no scaffold command.

## Unknowns

- Which doc-block shapes the text reader misses against the `parseSync` control; the unit measures and states them.
- Whether the H1 blockquote is reachable from the document `Guide` already parses without a second pass; the unit reports how it read it.

## Acceptance criteria, cheapest first

1. `grep -rn "from 'typescript'\|from 'vite'\|from \"vite\"" src` prints nothing; `grep -n "readonly summary?: string\|interface MethodEntry\|interface SourceExample\|interface Drift\|tagline(): string" src/core/types.ts` prints one line each.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:src:core` exits 0 with, present and green: the description reader over the transform's every clause; the `Summary` locator with a header-variant fixture and a missing-column finding; the fence title; `findDrift` with a negative control drawn from outside its membership rule (a symbol both SB halves already report) and a positive control planting one disagreement per kind (Surface, Methods, example) and asserting both sites; the `parseSync` control over the four fixture shapes.
4. `npm run test:guides` exits 0 over this checkout's own guide, with the guide's Types, Helpers, and Methods tables carrying every new name.

## Output

Write `/home/user/fleet/guide/tmp/units/docs-d1-guide-readers-report.md`: each type and function's change in one line with `file:line`, the transform as implemented, the misses the text reader is allowed against the control and why, how the tagline was read, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims, and a finding for the next change wherever a guide row this unit met needs a `Summary` column it lacks. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a decision under What is fixed cannot be met without a compiler or a parser in `src/**`, when a criterion needs an off-limits file, when this checkout's own guide cannot carry a `Summary` column without a structural change beyond the tables, or when a gate fails outside the owned files. Helper naming beyond the names fixed here, the internal shape of the readers, and the test case wording are yours to decide and record.
