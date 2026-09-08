# Brief — `d7n-tool-close-2` (tool: the closing checker's findings)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/tool` from the committed tip `053d9c1` (clean; the final guide tarball `0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-tool-close-2/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 15, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, § Ruling 22, § Ruling 24, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-tool-closure-checker-tool.md` (the checker's findings this unit closes); the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/guides/abort.md`; `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature) and `/home/user/fleet/abort/guides/probe.md` (class rows carrying the interface implemented).

## Items

1. **Ruling 20.** The `### Validators` table (about lines 62-68) heads `| Name | Kind | Shape | Summary |` with `isToolCall` and every other guard row holding the type it narrows to (read each `value is X` in `src/core/validators.ts`), under "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table; the `Signature` column goes.

Then `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0`. Move no `Summary` cell by hand.

## Scope

Owned: `guides/tool.md`, `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/tool.md` prints nothing (no empty `Shape` cell in a table that carries the column); the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/tool.md` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check guides/tool.md tests/guides.test.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` exit 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/d7n-tool-close-2-report.md`: per item the hunk as a diff, per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if a `Shape` cell cannot be expressed under Rulings 25, 26, and 28 (name the row and what you read), if `npm run docs` reports a disagreement `--to guide` does not clear, or if a gate outside the owned files goes red. Decide the wording of a heading or a lead-in sentence yourself and record it.
