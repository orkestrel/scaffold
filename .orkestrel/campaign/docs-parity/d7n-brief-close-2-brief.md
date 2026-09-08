# Brief — `d7n-brief-close-2` (brief: the Shapers table's `Shape` column)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/brief` from the committed tip `950e0a7` (clean; the final guide tarball `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-brief-close-2/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, and § Ruling 25; `/home/user/fleet/brief/guides/brief.md` § Shapers (the table at about line 312) and § Constants (the table the fix round gave its `Shape` column, at about line 142, the model for this one); `/home/user/fleet/brief/src/core/shapers.ts`.

## The unit

The `### Shapers` table's rows are `const` shape values, so it is a constants table under Ruling 18 and heads `Shape`. Do this:

1. Between the section's last prose paragraph and the table, add the constants sentence on its own line: `A \`Shape\` cell holds the constant's declared type.`
2. Head the table `| API | Kind | Shape | Summary |` and give every row its declared type per Ruling 25: `textShape` and `lineShape` hold `\`StringShape\`` (their annotation in `src/core/shapers.ts`); every `objectShape(...)` value holds `ObjectShape<{ members }>` with the property record in the bare-member form Ruling 19 gives an object literal, the members read from the `objectShape({ ... })` call in `src/core/shapers.ts` in declaration order, an optional property marked `?` where the call wraps it as optional. Example: `\`ObjectShape<{ operation, domain, statement }>\`` for `taskShape`. Move no `API`, `Kind`, or `Summary` cell.
3. `npx oxfmt --config .oxfmtrc.json --write guides/brief.md`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0` (the table's `Summary` cells are compared and did not move).

## Scope

Owned: `guides/brief.md`. Off-limits: everything else.

## Acceptance criteria, cheapest first

1. `git status --short` lists `guides/brief.md` only.
2. `grep -c "A \`Shape\` cell holds the constant's declared type." guides/brief.md` reads 2 (the Constants table's and this one); `grep -n '^| API *| Kind *| Shape *| Summary' guides/brief.md` lists the Shapers table beside the Constants and guard tables; every Shapers row has a non-empty `Shape` cell.
3. `npx oxfmt --config .oxfmtrc.json --check guides/brief.md` exits 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/d7n-brief-close-2-report.md`: the hunk as a diff, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a row's members cannot be read from a single `objectShape` call (a composed or spread shape), naming the row; stop if `npm run docs` reports a disagreement. Decide nothing else.
