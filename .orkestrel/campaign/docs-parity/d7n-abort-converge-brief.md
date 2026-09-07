# Brief — A.2 `d7n-abort-converge` (the pilot: abort under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/abort` from the committed baseline `7d8b1dd` (clean; `@orkestrel/guide@0.0.18` installed `--no-save`, the tip's vendored delta and the seed landed, the drop-in adapted to the record shapes). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/abort.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`. This is the fleet pilot: report every reader or seed defect you meet with the exact seed line that produced it, because the guide's release waits on your report.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/abort/guides/abort.md`, `README.md`, `tests/guides.test.ts`, `src/core/**` whole.
3. The reference shapes at the guide's `c25c689`: `/home/user/fleet/guide/tests/guides.test.ts:94-127` (the pin and the README case) and `:196-204` (the equality case inside the manifest loop); `/home/user/fleet/guide/guides/guide.md:1-24` and `/home/user/fleet/guide/README.md:1-12` (the tagline and the pitch as one blockquote, the opening paragraph carrying the displaced sentences); `/home/user/fleet/guide/guides/guide.md:202-213` (the `### Classes` table).
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 5, 7, 10; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P19.

## What is fixed

- The tables (`grep -n '^| API\|^| Type\|^| Method' guides/abort.md`): Factories `:25`, Helpers `:31`, Validators `:38`, Entities `:44` head `API | Kind | Summary` already; Types `:50` heads `Type | Kind | Shape` and gains `Summary` (`Type | Kind | Shape | Summary`), the type literal staying in `Shape` and the clause after the em dash moving into the doc block verb-first; Methods `:65` heads `Method | Returns | Behavior` and renames `Behavior` to `Summary`. The first column's header text (`API`, `Type`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone.
- `### Entities` (`:42`) heads a table whose every row's `Kind` is `class`, so it becomes `### Classes` (ruling 5).
- The seed: `npm run docs` reads `rows read: 1, disagreements found: 9` on this baseline (P19; no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block (P19: `written: 6, reported: 3` after the Methods header rename — the reported rows being the two Types rows without a `Summary` column and the pitch); `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`.
- Ruling 7: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept.
- The tagline: the H1 blockquote (`guides/abort.md:3-5`, two paragraphs with bold runs) becomes one noun phrase in plain text and code spans with no link; the displaced sentences fold into the guide's opening prose after the blockquote; the README (`README.md:3-9`, a paragraph) gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries.
- The titled pair (ruling 3): title exactly one `@example` — `createAbort`'s block at `src/core/factories.ts:29` is the primary factory — with the flattened text of the § Patterns heading whose first fence demonstrates it (`### Create and abort`, `:85`, is the candidate; read its body for a three-backtick run or `*/` first, and confirm the heading text occurs once in the document); carry the body in with `npm run docs -- --to source` and read the result. Every other block stays untitled.
- The gate cases in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; abort declares `@orkestrel/contract`, so `isNonEmptyString` is importable, but write the pin's title filter as a local type predicate so the shape is the one every package copies): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the both-sides form (`${GUIDE_SPEC} pairs: guide [...] source [...]` when no title pairs); the README case with two `not.toBeUndefined()` guards before `toBe`. Import `findDrift` beside the existing readers.
- The guide's § Tests paragraph, where it lists the checks the suite wires, gains SQ, MQ, and EQ if it names checks.

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener) and the prose sweep reads `guides/abort.md` and `README.md`.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/abort.md`, `README.md`, the doc blocks under `src/core/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/core/**` code outside doc blocks.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names the class table.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each Types row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-abort-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe. Decide ancillary matters (where a folded sentence sits) and record them.
