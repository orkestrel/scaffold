# Unit F5b ACCOUNTING-LEDGER — report 3 (the ledger's home)

Done. The departure and addition tables live in `guides/ledger/departures.md` and
`guides/ledger/additions.md`, `readDepartures` and `readAdditions` default to those paths, and every
gate the brief names exits 0. Effective brief: `tmp/units/f5b-brief-3.md`; it supersedes
`tmp/units/f5b-brief-2.md` for obligation 8 alone.

## Touched files

| File                        | Change                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `guides/ledger/departures.md` | Added. H1, tagline, `## Cascade` / `### Departures`, then the moved introduction, legend, refresh command, and every per-component table. |
| `guides/ledger/additions.md`  | Added. H1, tagline, `## Cascade` / `### Additions`, then the moved introduction and the addition table.  |
| `guides/veneer.md`            | § Departures and § Additions removed; § The ledger added in their place; three stale cross-references repointed. |
| `guides/README.md`           | § By concept gains a paragraph naming each ledger file and the gates that read them.                      |
| `tests/setupServer.ts`       | `readDepartures` and `readAdditions` default to the nested paths and read the `Cascade` section; `LEDGER_GUIDE` carries that section name. |
| `tests/setupServer.test.ts`  | The reader plants name the `Cascade` section in the refusal message, the planted document, and the two `selectSubsectionTables` calls. |
| `tests/guides.test.ts`       | The inventory pattern reads `guides/**/*.md`, so the nested files resolve for link parity.                |

`tests/conformance.test.ts` needed no edit this round: its `cascade ledger` gates call
`readDepartures()` and `readAdditions()` with no argument, so the changed defaults carry them to the
nested files. Its working-tree diff against `07fc3c3` is the fix round's, and its modification time
(19:17) precedes every write of this round (19:53 and later).

## What moved and what stayed

Moved to `guides/ledger/departures.md`, byte for byte: the § Departures introduction, the legend
paragraph naming `—`, `(empty)`, and each `Departure` member, the refresh command
`npm run build:src && npm run test:conformance`, and every `#### \`key\`` table.

Moved to `guides/ledger/additions.md`, byte for byte: the § Additions introduction and its single
table with the `Condition` column.

Stayed in `guides/veneer.md`: § Outside the ledger, § Customization, § Bootstrap variables Veneer
retains, § Reference map, and every other section. No table row sits under a per-component heading
there any more.

Each moved section carries no relative link, so the rewrite obligation for the new directory depth
had nothing to act on. The command that finds them is
`sed -n '841,2043p' guides/veneer.md | grep -n ']('` over the pre-move file, which returned nothing.

### The heading the new files take

Each ledger file opens at H1 with a blockquote tagline, then `## Cascade`, then the `### Departures`
or `### Additions` heading the readers walk to. The readers require a level-2 section holding a
level-3 subsection, and the brief's criterion fixes the per-component headings at level 4, so the
file needs a level-2 heading over the level-3 one. `Tokens` was that heading inside the guide, and it
names the wrong concept in a file that records declarations across every shipped component, so the
readers now name `Cascade`: everything in each file measures the built cascade, and the
`cascade ledger` gate carries the same word. The refusal message reads
`Addition row <header>: missing Cascade / Additions subsection`.

`guides/veneer.md` gains `### The ledger` where `### Departures` stood. A bare paragraph there would
have attached to § Customization, so the pointer takes its own heading, and § Outside the ledger
follows it.

## The README wording

```md
That guide's ledger sits beside it in the `ledger` directory.
[`ledger/departures.md`](ledger/departures.md) records every declaration the built cascade writes
differently from the Bootstrap 5.3.8 release, and [`ledger/additions.md`](ledger/additions.md)
records every name the cascade emits that the release's inventory lacks. The `cascade ledger`
gates in [`tests/conformance.test.ts`](../tests/conformance.test.ts) read each file through the
`readDepartures` and `readAdditions` helpers and redden on a difference no row records. Each file
records a measurement rather than a TypeScript surface, so neither adds a row to the concept index.
```

## The `ROADMAP.md` § Records patch (report-only, shared file)

Replace the first bullet under `## Records`:

```md
- Read the machine-read record from `guides/veneer.md` alone: § Compatibility, § Deferred
  selectors, § Departures from Bootstrap, § Deferred names, and the additions table F5 ACCOUNTING
  adds. Those sections are the definition of done.
```

with:

```md
- Read the machine-read record from `guides/veneer.md` and the ledger beside it: § Compatibility,
  § Deferred selectors, and § Outside the ledger in the guide, and the departure and addition
  tables in `guides/ledger/departures.md` and `guides/ledger/additions.md`. Those sections are the
  definition of done.
```

## Proof the moved gate can fail

The conformance gate reads the nested file rather than passing on an empty population. Planting
`var(--vn-size-4)` for `var(--vn-size-5)` in the `blockquote` font-size row of
`guides/ledger/departures.md` and running `npm run test:conformance` exited 1 with
`Tests 2 failed | 15 passed (17)`, naming both the unrecorded measured row and the stale planted
row. Restoring the row byte for byte and re-running the same command exited 0 with
`Tests 17 passed (17)`.

The `guides/**/*.md` pattern is load-bearing for the same reason. Reverting it to `guides/*.md` and
running `npm run test:guides` exited 1 with
`guides/veneer.md has a broken link: ledger/departures.md.` and the matching finding for
`ledger/additions.md`. Restoring the pattern returned the gate to `Tests 18 passed (18)`.

## Gate exits

Run on 2026-09-22 in `/home/user/veneer-f5b` with npm 11.19.1 on `PATH`.

| Command                     | Exit | Reading                                     |
| --------------------------- | ---- | ------------------------------------------- |
| `npm run format:check`      | 0    | All matched files use the correct format    |
| `npm run lint:check`        | 0    | No diagnostic                               |
| `npm run check`             | 0    | Every scoped project typechecks             |
| `npm run test:policy`       | 0    | `Tests 109 passed \| 1 skipped (110)`       |
| `npm run test:setup`        | 0    | `Tests 141 passed (141)`                    |
| `npm run build:src`         | 0    | `dist/src/styles/index.css 89.36 kB`        |
| `npm run test:conformance`  | 0    | `Tests 17 passed (17)`                      |
| `npm run test:guides`       | 0    | `Tests 18 passed (18)`                      |

`format:check`, `test:policy`, and `test:guides` were re-run after the final README edit and stayed
at those readings.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` exit 0 — met, per the preceding table.
2. `test:policy` exits 0 with both ledger files present — met. `guides/ledger/departures.md` and
   `guides/ledger/additions.md` were on disk for that run, and the prose sweep reads every authored
   Markdown file under the tree.
3. `npm run build:src && npm run test:conformance` exits 0 reading the nested files — met, and the
   planted-row run proves the read.
4. `test:guides` and `test:setup` exit 0 — met.
5. `grep -c '^#### ' guides/veneer.md` printed `36` before the move and prints `11` after;
   `grep -c '^#### ' guides/ledger/departures.md` prints `25`, and `11 + 25 = 36`.
6. `git status --porcelain` lists the fix round's files plus `guides/README.md`,
   `tests/guides.test.ts`, and the untracked `guides/ledger/` directory, and nothing else.

## `git status --porcelain`

```text
 M guides/README.md
 M guides/veneer.md
 M src/styles/components/_button.scss
 M src/styles/elements/_body.scss
 M src/styles/elements/_button.scss
 M tests/conformance.test.ts
 M tests/fixtures/oracle/inventory.json
 M tests/guides.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? guides/ledger/
```

## `git diff 07fc3c3 --stat`

```text
 guides/README.md                     |    8 +
 guides/veneer.md                     |  258 +++---
 src/styles/components/_button.scss   |    5 +-
 src/styles/elements/_body.scss       |    2 +-
 src/styles/elements/_button.scss     |    5 +-
 tests/conformance.test.ts            |   59 +-
 tests/fixtures/oracle/inventory.json | 1597 +++-------------------------------
 tests/guides.test.ts                 |    2 +-
 tests/setupServer.test.ts            |  496 ++++++++++-
 tests/setupServer.ts                 | 1214 +++++++++++++++++++++++++-
 tests/setupStyles.test.ts            |    7 +-
 tests/setupStyles.ts                 |   13 +-
 12 files changed, 1984 insertions(+), 1682 deletions(-)
```

The stat carries the first run's and the fix round's writes as well as this round's. The untracked
`guides/ledger/` directory does not appear in a diff; `guides/ledger/departures.md` is 276176 bytes
and `guides/ledger/additions.md` is 51599 bytes.

## This round's edits to `tests/setupServer.ts`

```ts
export const LEDGER_GUIDE = [
	'## Cascade',
```

```ts
export function readDepartures(
	path: string = resolve(WORKSPACE_ROOT, 'guides/ledger/departures.md'),
): readonly DepartureRow[] {
```

```ts
	for (const table of selectSubsectionTables(
		readFileSync(path, 'utf8'),
		'Cascade',
		'Departures',
		'Departure',
	)) {
```

```ts
export function readAdditions(
	path: string = resolve(WORKSPACE_ROOT, 'guides/ledger/additions.md'),
): readonly AdditionRow[] {
	const headers = ['Component', 'Name', 'Condition', 'Category', 'Reason']
	const rows: AdditionRow[] = []
	for (const table of selectSubsectionTables(
		readFileSync(path, 'utf8'),
		'Cascade',
		'Additions',
		'Addition',
	)) {
```

Each reader's `@param path` line names its own ledger file instead of the package guide.

## Decisions this unit settled

- **The paths are inline defaults, not exported constants.** Each path has one call site, the
  default itself; `tests/conformance.test.ts` calls each reader with no argument and
  `tests/setupServer.test.ts` passes scratch paths. `readCompatibility` and `readDeferrals` already
  inline their own default this way, and a constant would have to be added to the export-set
  assertion in `tests/setupServer.test.ts` for no reader to use.
- **`LEDGER_GUIDE` stays one planted document carrying both subsections.** The fixture proves the
  parsing contract each reader holds, and the split files are the production input; one scratch
  document still drives both readers and the subsection-boundary case.
- **The README takes a paragraph rather than a row.** The concept index's rows are the parity
  targets `tests/guides.test.ts` drives, and neither ledger file documents a TypeScript surface, so
  a row there would claim a surface that does not exist.
- **Link text is the file path as a code token**, matching `[`veneer.md`](veneer.md)` in
  `guides/README.md`.
- **Three cross-references in `guides/veneer.md` were repointed**, because the move made each one
  false: § Tokens' `Source`-column paragraph named the departures table as a table in that file;
  § Button states and bindings and § Bootstrap variables Veneer retains each named § Departures as a
  section of that file; and § Outside the ledger said a name reaches "neither table here". The first
  now names the factor table and the tier table alone, the next two link
  `ledger/departures.md`, and the last reads "neither ledger file".

## Deviations

None. No conflict prevented the objective and no unowned change was required. `ROADMAP.md` is
report-only and was not edited; its patch sits in the preceding section.

## Claims I flag unverified

- **The `## Cascade` heading is the right level-2 name.** It is a taste call inside the owned files,
  reached because the reader needs a level-2 heading and `Tokens` is false in the new home. An
  auditor can overturn it at the cost of the section name in `readDepartures`, `readAdditions`,
  `LEDGER_GUIDE`, the two new files, and the three assertions in `tests/setupServer.test.ts`.
- **The refresh command now appears in two places**: the § Departures introduction carries it, as
  obligation 1 requires byte for byte, and § The ledger in `guides/veneer.md` repeats it because
  `guides/ledger/additions.md` carries no refresh sentence of its own. Neither copy can drift toward
  a different command without the other going stale.
- **`npm test` was not run.** The brief scoped validation to the commands in the preceding gate
  table, and other worktrees' gate chains may run beside this one, so the authoritative tree-wide
  sweep belongs to an independent `verifier` after this unit exits.
- **The planted-row control was removed by copying the file back from a scratchpad copy taken before
  the plant**, and `diff` reported the restored file identical to that copy. No git command that
  discards a working-tree change was run.
