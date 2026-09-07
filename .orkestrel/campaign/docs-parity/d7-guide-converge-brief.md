# Brief — U2 `d7-guide-converge` (the guide's own guide under `Summary`, the pitch, the titles, and the gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, and the gate cases. Sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing. Do not commit; the Orchestrator commits.

## Objective

`guides/guide.md` passes the equality gate this package publishes: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; `Guide`, `Source`, and `SourceManager` carry rows; the titled `@example` blocks of decision 5 equal their § Patterns fences; the H1 blockquote is one noun phrase and the README's pitch is the same text; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence turns it green; and `npm run build && npm run docs` exits 0 with no line printed.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity (the equality bullets and the voice bullet); `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/guide/guides/guide.md` whole; `/home/user/fleet/guide/README.md` whole; `/home/user/fleet/guide/tests/guides.test.ts` whole.
3. Scaffold's landed shapes as the reference: `/home/user/scaffold/tests/guides.test.ts:165-212` (the equality case, the pin, the README case) and `/home/user/scaffold/README.md`, `/home/user/scaffold/guides/scaffold.md:1-10` (the pitch and the tagline as one blockquote).
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-plan.md` rulings 1, 2, 3, 5, 8; `orchestrator-measurements.md` § P16 (what the seed writes and leaves).

## What is fixed

Read from the tree at U1's commit (`ed1527d`, clean, `version` `0.0.18`, the readers reaching every declaration head). Line numbers below are from that tree.

The tables (`grep -n '^| Name\|^| Method' guides/guide.md`: Types `:32`, Constants `:60`, Helpers `:79`, Parsers `:154`, Shapers `:164`, Validators `:178`, Factories `:192`, Methods `:250`, `:263`, `:295`; the H3 sections `### \`Guide\`` `:204`, `### \`Source\`` `:213`, `### \`SourceManager\`` `:229`) and their headers after this unit:

| Table | Header now | Header after |
| --- | --- | --- |
| Types | `Name \| Kind \| Shape` | `Name \| Kind \| Shape \| Summary` — `Shape` keeps the type literal; the clause after the em dash moves into the doc block (verb-first) and reaches the cell by the seed |
| Constants | `Name \| Kind \| Behavior` | `Name \| Kind \| Value \| Summary` — the quoted literal moves to `Value` |
| Helpers, Parsers, Factories | `Name \| Kind \| Signature \| Behavior` | `Name \| Kind \| Signature \| Summary` |
| Shapers | `Name \| Kind \| Builds` | `Name \| Kind \| Shape \| Summary` — the structural literal stays in `Shape` |
| Validators | `Name \| Kind \| Narrows to / Tests \| Behavior` | `Name \| Kind \| Summary` — every `Narrows to / Tests` cell reads `value: unknown` and goes |
| Methods (each interface) | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |

- A new `### Classes` table under `## Surface`, `Name \| Kind \| Summary`, placed after `### Factories` and before `### \`Guide\``, with rows for `Guide`, `Source`, `SourceManager` (`Kind` `class`), so `extractSurface` meets the row before the H3 (it keeps the first symbol per key); the H3 sections stay as narrative.
- The seed: `npm run build && npm run docs` reports; `npm run docs -- --to guide` writes every located `Summary` cell from the doc block and prints `next: npm run format`; `npm run docs -- --to source` writes a titled fence body into its block. P16 measured the `--to guide` round trip: `written: 109`, no cell outside the column disturbed, oxfmt restoring alignment. The direction is Ruling 6's: the doc block is rewritten first where the cell carries information the block lacks, then `--to guide` propagates.
- The `SourceInterface.examples` cell adopts the first overload's paragraph (the compared text); the second overload's block is outside the comparison.
- The tagline: the H1 blockquote becomes exactly
  `A pure, I/O-free guides-parity toolkit: the \`Guide\` and \`Source\` readers, the \`findDrift\` comparison, and the renderers and replacers that carry a change across.`
  and the README gains the same blockquote under its H1 with the same line breaks. The `Source:` link and the `Published through` sentence fold into the guide's opening paragraph; no link inside the blockquote (a link flattens to its text on one side).
- The README keeps `## API` (`tests/guides.test.ts:50-81` reads it); its opening paragraph drops the bijection claim the pitch carries and keeps the onboarding (devDependency, the test file, the vitest project).
- Titles (decision 5), each block titled with its fence heading verbatim: `createGuide` "Construct a `Guide` from markdown text"; `createSource` "Construct a `Source` from an inline files record"; `createSourceManager` "Resolve a fence's import specifier to the right `Source`"; `findDrift` "Compare a guide against the source it documents"; `extractSourceLines` "Project source into physical code lines"; the `GuideInterface.tagline` member block "Read a guide's tagline". The guide fence wins on content: carry each fence body into its block with `--to source` and read the result. Unpaired by ruling: "The bijection assertion shape", "Resolve directory and file targets", "Carry a summary across into the guide" (compositions), "List the fence languages a package allows" (a four-backtick body no three-backtick block encloses), and the class blocks (constructor door beside the factory door). Read each titled fence body for a backtick run before titling.
- The gate cases, in this file's house form (`string[]` collected, `expect(...).toEqual([])`): the equality case inside the manifest loop's `describe(entry.concept)` block, one line per drift `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side; the pin at file scope on `GUIDE_SPEC` in the both-sides form (`${GUIDE_SPEC} pairs: guide [...] source [...]` when no title pairs); the README case with the two `not.toBeUndefined()` guards before `toBe`.
- § Tests (`:795-801`) states the suite does not wire SQ, MQ, or EQ and that the tables head `Shape`, `Signature`, `Behavior`, `Builds`, and `Returns`; after this unit it states the suite wires them and the tables head `Summary`.
- The guide's own § The check catalog EQ row (`:555`) and § The extraction model already state the widened reach (U1); do not restate. The § Patterns headings sit at `:648-786`; the tagline blockquote at `:3-9` carries the `Source:` link at `:9`.

## Standing conditions

- The seed reads `dist/`: `npm run build` before every `npm run docs`.
- The vendored voice rule reads every doc block you rewrite (third-person verb opener) and `policy/no-banned-term` reads every comment; the vendored prose sweep reads every authored Markdown file for the banned terms.
- `npm run format` after edits and after each seed write; the acceptance gate is `format:check`.
- Discard-class git commands are denied; undo an edit by editing.
- No install; the head-started scaffold stays as it is.

## Scope

- **Owned:** `guides/guide.md`, `README.md`, the doc blocks under `src/core/**` (description paragraphs and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`.
- **Off-limits:** every vendored file, `tests/setup.ts`, `tests/src/**`, `tests/fixtures/**`, `package.json`, `tsconfig.json`, `guides/README.md`, `src/core/**` code outside doc blocks.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the equality case, the pin, and the README case; run `npm run test:guides` and record the failing cases and the first lines of each failure (the equality worklist's count line, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; the `### Classes` rows exist before the H3s.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and `npm run format`; the report names each Types and Constants row whose literal moved sideways and each block rewritten by hand.
4. The titles land; `npm run docs -- --to source` and `npm run format`; the report names each pair and each fence left unpaired with its reason.
5. The blockquote and the pitch are one text; the guide's opening paragraph carries the source link and the entry sentence; the README keeps `## API`.
6. § Tests states the suite wires SQ, MQ, and EQ.
7. `npm run build && npm run docs` exits 0 with no line printed.
8. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:guides` exit 0 (the red-first cases now green).
9. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7-guide-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the row table of what moved where, the pairs and the unpaired fences, the sentences changed in README and the opening paragraph, and the claims you flag.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot enclose; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit. Decide ancillary matters (where a folded sentence sits, a row's order) and record them.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you return.
