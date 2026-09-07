# Brief — `d7n-table-converge-fix` (table's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/table` from the committed tip `d86a5a8` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-table-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 18; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice5-audit-verdict.md`; the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row).

## Items

1. **The drop-in (T1).** `tests/guides.test.ts`: hoist `documented` and the mapped `examples` out of the `it` body (`:277-284`) to the examples loop's own scope above its `describe`, matching the pilot's `:209-228` byte for byte; line 2 reads "The constants that follow are this package's own"; the `INTERNAL` sentence reads "the assertion that follows it fails when a name here stops being stranded". Show `diff <(sed -n '/^describe(/,$p' /home/user/fleet/abort/tests/guides.test.ts) <(sed -n '/^describe(/,$p' tests/guides.test.ts)` in the report (empty, or only a package-specific case appended after the pilot's last case).
2. **The `Shape` column (T2, Ruling 15).** Every `## Surface` table in `guides/table.md` that carries an `interface` or `type` row heads `Shape` between `Kind` and `Summary` under Ruling 15's one convention sentence placed between the section heading and the table; each interface row's data members as bare names with `?`, `plus` its call-signature members by name (read `src/core/types.ts`); each alias's own literal with `\|`; a `### Constants` table heads `Shape` with the declared type (Ruling 18) and a literal a reader needs is named in the description paragraph, then `--to guide`. A description that is only a member list is rewritten to state what the type represents.
3. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs -- --to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/table.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. The convention sentence's Ruling 15 wording above every table carrying `Shape`; `grep -n '| interface *| `{[^`]*:' guides/table.md` prints nothing; the drop-in diff against the pilot is empty or an appended case.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-table-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters and record them.
