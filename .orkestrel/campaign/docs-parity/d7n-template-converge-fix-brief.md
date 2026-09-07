# Brief — `d7n-template-converge-fix` (template's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/template` from the committed tip `cf8858e` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-template-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 14, § Ruling 15, § Ruling 18, § Ruling 19; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice5-audit-verdict.md`; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68`; `tests/guides.test.ts` (the executed fence cases).

## Items

1. **The `Shape` idiom and its placement (P1).** Move the convention sentence from under the `### Types` table (`guides/template.md:55-56`) to between the heading and the table, in Ruling 15's one wording; every interface row's cell holds data members as bare names with `?`, `plus` its call-signature members; `TemplateManagerEventMap`'s cell reads `{ register, remove, clear }` (Ruling 19); every alias's own literal with `\|`; the `### Constants` table (`:60-65`) heads `Shape` with each constant's declared type under Ruling 12's constants sentence (Ruling 18: the literals the executed fence at `:67-79` demonstrates stay there, and a literal a reader needs is named in the description). Every other table carrying an interface or type row takes the column the same way.
2. **All-caps in the blocks (P2).** `src/core/constants.ts:11`, `:16`, `:18` (`FIRST`, `RAW`, `NOT`); `src/core/helpers.ts:59`, `:61`, `:137`, `:143` (`ANY`, `WITHOUT`); `src/core/templates/Template.ts:140`; `src/core/templates/TemplateManager.ts:34-35`, `:130` → plain wording, keeping every fact; sweep every owned block once more (`grep -nE '\b[A-Z]{3,}\b'`, ruling each hit; real tokens stay).
3. **The titled fence (P3, Ruling 14).** The titled fence (`:147-157`) repeats the `## Surface` fence (`:19-27`); extend the titled fence to show what the Surface fence does not (seed several templates, then `find` and `has`), keep the heading, carry the body into the block with `npm run docs -- --to source`, and extend the executed case in `tests/guides.test.ts` that pins that fence (never delete an assertion).
4. **Propagation.** `npx oxfmt --write <paths>`; `--to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/template.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. The convention sentence's Ruling 15 wording between `### Types` and its table and above every other table carrying `Shape`; `grep -n '| interface *| `{[^`]*:' guides/template.md` and `grep -n 'register: \[' guides/template.md` print nothing; `grep -nE '\b(FIRST|RAW|ANY|WITHOUT)\b' src/core/constants.ts src/core/helpers.ts` prints nothing.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-template-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters and record them.
