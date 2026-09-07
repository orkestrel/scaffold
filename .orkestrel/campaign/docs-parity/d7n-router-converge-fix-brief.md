# Brief — `d7n-router-converge-fix` (router's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/router` from the committed tip `9af89c9` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…` — its compared form drops a link target's `import('./module.js').` part and keeps `Owner#member` whole). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-router-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 9, § Ruling 12, § Ruling 13 and its amendment, § Ruling 14, § Ruling 15, § Ruling 18; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice5-audit-verdict.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-router-converge.diff.txt` (the flattened links); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68`; `/home/user/fleet/table/guides/table.md` for a Ruling 9 heading above a `## Surface` fence (`### Open a table`).

## Items

1. **The drop-in (R1).** `tests/guides.test.ts`: hoist the mapped `examples` out of the `it` body (`:236-242`) to sit beside `documented` at the examples loop's scope, matching the pilot byte for byte; the `INTERNAL` sentence at `:57` reads "the assertion that follows it fails when a name here stops being stranded"; line 2 reads "The constants that follow are this package's own". Show the diff against the pilot from `describe(` on.
2. **The `Shape` idiom (R2, Rulings 12 and 15).** The `### Types` convention sentence (`guides/router.md:120-121`) takes Ruling 15's one wording; every interface row's cell holds data members as bare names with `?`, then `plus` and its call-signature members by name (never `+` or `/`); every alias's own literal spelled whole with `\|` (no `…`); read `src/core/types.ts` and `src/browser/types.ts`. Every other `## Surface` table carrying an interface or type row heads `Shape` the same way; a `### Constants` table heads `Shape` with the declared type (Ruling 18) and a literal a reader needs is named in the description, then `--to guide`.
3. **The titled pair (R3).** The package's primary factory is `createRouter` (`### Factories`, the `## Surface` fence at `:22-39` demonstrates it). Under Ruling 9 add `### Register and match` (or the verb phrase the fence supports) directly above that fence's paragraph, title `createRouter`'s `@example` with that heading's text, remove the title from `createListener`'s block (`src/server/handlers.ts:79`, the `Basic server` fence keeps its heading and body), then `npm run docs -- --to source` carries the fence body into `createRouter`'s block; under Ruling 14 the fence gains nothing the block lacks and loses nothing. Re-read the pin's both-sides line: the title set on each side is that one heading.
4. **The links (R4).** Restore every `{@link import('./x.js').Name}` the converge diff flattened to a code span inside a description paragraph (`src/core/Group.ts:5`, `src/core/DispatchGroup.ts:5`, `src/core/constants.ts:8`, `:36`, `src/core/types.ts`, and any other site the diff shows); `npm run docs` under the installed readers must stay at zero because the compared form drops the module part.
5. **Propagation.** `npx oxfmt --write <paths>`; `--to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/router.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`; `grep -rn '@example \S' src/` prints exactly `createRouter`'s block.
4. The convention sentence's Ruling 15 wording above every table carrying `Shape`; `grep -n '| interface *| `{[^`]*:' guides/router.md`, `grep -n '…' guides/router.md`, and `grep -n '} + \|/' guides/router.md` inside `Shape` cells print nothing; the drop-in diff against the pilot is empty or an appended case.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-router-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 12 cannot express, or a restored link the readers still render with its module part. Decide ancillary matters and record them.
