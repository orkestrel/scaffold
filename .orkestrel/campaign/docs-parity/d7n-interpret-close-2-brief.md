# Brief — `d7n-interpret-close-2` (interpret: the published specifier in every doc-block example, and the slash pairs in compared cells)

## Role and engine

`builder` on Claude Sonnet. Sole writer in `/home/user/fleet/interpret` from the committed tip `714b889` (clean; the final guide tarball `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `2b76b363…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-interpret-close-2/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (the `and/or` row); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-interpret-converge-fix-report.md` § Observations (the two items this unit closes).

## The unit

1. **The published specifier.** In every doc-block `@example` under `src/core/**` that imports `from '@src/core'`, the specifier becomes `from '@orkestrel/interpret'`, the form `src/core/factories.ts` carries after the fix round. Change nothing else in those blocks. `grep -rn "from '@src/core'" src/core` then prints nothing.
2. **The slash pairs in compared cells.** In the doc blocks behind the `guides/interpret.md` cells that read "one `FieldMapping` / `Entity` value", "misuse / failure conditions", and "`add` / `remove` are the events" (find each in `src/core/types.ts` by its text), the `/` standing for a conjunction becomes `or` or `and` as the sentence means; then `PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide` carries the cells and `npx oxfmt --config .oxfmtrc.json --write guides/interpret.md src/core` reflows. Leave a `/` inside a code span or a path alone.
3. `npm run docs` reads `rows read: 1, disagreements found: 0` and both write directions read `written: 0`.

## Scope

Owned: the doc-block text under `src/core/**` and `guides/interpret.md` (through `--to guide` and the formatter only). Off-limits: everything else, including `tests/**`, `README.md`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `grep -rn "from '@src/core'" src/core` prints nothing; `grep -nE '`(FieldMapping|add)` / `|misuse / failure' guides/interpret.md` prints nothing.
3. `npx oxfmt --config .oxfmtrc.json --check guides/interpret.md src/core` and `npx oxlint --config .oxlintrc.json --deny-warnings src/core` exit 0.
4. `npm run docs` at zero; both directions `written: 0`.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` exits 0 (record the summary).

## Output

`/home/user/scaffold/tmp/units/d7n-interpret-close-2-report.md`: the hunks as a diff (the specifier hunks may be summarized by file with one example), per criterion the exact command and its last lines. No process diary. No count in prose.

## Deviation contract

Stop if `npm run docs` reports a disagreement `--to guide` does not clear, or if a `/` cannot be read as `and` or `or` (name it). Decide nothing else.
