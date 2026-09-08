# Brief — `d7n-interpret-close-3` (interpret: Ruling 27's guard sentence and the no-data-member rows)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/interpret` from the committed tip `6f3ba38` (clean; the final guide tarball `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-interpret-close-3/` inside this checkout.

## Read first

`/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 27 (the second and third bullets); `/home/user/fleet/interpret/guides/interpret.md` lines 120 to 135 and 220 to 232.

## The unit

1. In the `### Validators` section (about line 227), the interface convention sentence ("A `Shape` cell holds an interface's data members …") in front of "In a guard table a `Shape` cell holds the type the guard narrows to." is deleted; the guard sentence stands alone between the section's prose and the table.
2. In the `### Types` table (about lines 125 to 130), each interface row whose `Shape` cell is a bare member list — `NormalizerInterface` (`normalize`), `ExtractorInterface`, `ClarifierInterface`, `FormatterInterface`, `GeneratorInterface`, `NarratorInterface` — takes the form `{} plus <members>`, for example `{} plus normalize` and `{} plus phrase, label, line, value, describe, narrate`. Move no other cell.
3. `npx oxfmt --config .oxfmtrc.json --write guides/interpret.md`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0`.

## Scope

Owned: `guides/interpret.md`. Off-limits: everything else.

## Acceptance criteria, cheapest first

1. `git status --short` lists `guides/interpret.md` only.
2. `grep -c 'In a guard table' guides/interpret.md` reads 1 and `grep -B2 'In a guard table' guides/interpret.md | grep -c "an interface's data members"` reads 0; `grep -c '{} plus ' guides/interpret.md` reads at least 1 and every stage and manager row named in item 2 carries it; `grep -nE '^\| \`[A-Za-z]+Interface\` +\| interface +\| \`[a-z][^\`{]*\` ' guides/interpret.md` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check guides/interpret.md` exits 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/d7n-interpret-close-3-report.md`: the hunk as a diff, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if `npm run docs` reports a disagreement. Decide nothing else.
