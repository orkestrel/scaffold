# Brief — `d7n-form-converge-fix` (form's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/form` from the committed tip `ee1fa2b` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `9fd4adc5…` — the caa97b2 pack; the closing sweep re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-form-converge-fix/` inside this checkout; your own red-first control on a file you own is yours to plant and reverse.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Sentence and paragraph order; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 18, § Ruling 20; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-form-audit-verdict.md` (items F1 to F9 and where each came from); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-form-converge-report.md`; the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole and its guide `/home/user/fleet/abort/guides/abort.md:1-30` for the opening's shape; `/home/user/fleet/template/guides/template.md:55-62` (a constants table under its sentence).

## Items

1. **The constants table (F1, Rulings 18 and 20).** `guides/form.md:118-152` `### Constants` heads `| API | Kind | Shape | Summary |`, each constant's declared type in `Shape` (`readonly FieldControl[]`, `readonly string[]`, `Readonly<Record<FieldControl, readonly string[]>>`, `readonly FormStatus[]`, `Readonly<Record<FieldRuleName, string>>`, `RegExp`, `number` — read each from `src/core/constants.ts`), under the sentence "A `Shape` cell holds the constant's declared type." alone, between the section's prose and the table. Each budget's description paragraph in `src/core/constants.ts` names its literal ("Caps the number of fields one schema may declare, at 512."; `PATTERN_LIMIT` 256, `FIELD_LIMIT` 512, `GROUP_LIMIT` 64, `CHOICE_LIMIT` 1024, `LIST_LIMIT` 1024, `NAME_LIMIT` 128, `STRING_LIMIT` 65536, `TEXT_LIMIT` 1048576, `NODE_LIMIT` 16384) so the cell carries it through `--to guide`; the section prose at `:125-128` that defers each value to another section is recast to what stays true (the `### Budgets` table at `:764` keeps its own use).
2. **The guard table (F2, Ruling 20).** `guides/form.md:155-173` `### Guards` heads `| API | Kind | Shape | Summary |`, each cell the type the guard narrows to (read each `value is X` return type in `src/core/guards.ts` or where the guards live), under the sentence "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table.
3. **The Controls table (F3, Ruling 15).** `guides/form.md:246` drops the `Its own options` column, keeping `Control | Value | Notes`; a fact that column alone carried (none expected: the members sit in the `Shape` cells at `:62-73`) moves into `Notes`.
4. **List items named by position (F4).** `guides/form.md:803` "Contract 10 states:" and `:936` "Contract 4 states the exact partial-state boundary." name the invariant by its bolded title from `## Contract`.
5. **The `clear` row (F5).** `src/core/types.ts` `FormInterface.clear`'s description reads "Returns every answer to the ones the form opened with." with the `{@link FormInterface.baseline}` reference in `@remarks`; then `--to guide`.
6. **The opening paragraph (F6).** `guides/form.md:7` opens with the bolded thesis "A terminal prompt and a browser form are the same abstraction." and the renders/keyboard/socket sentence follows "Rendering is the browser's contribution, and it lives in the browser, not here." — every sentence kept.
7. **`FormInterface`'s description (F7).** `src/core/types.ts:455` names the contract rather than the thing ("Declares the contract a form exposes: the state it holds and the calls that move it." or your own sentence of that shape), so the pair with `Form`'s "Implements `FormInterface` exactly, …" reads as interface and implementation; then `--to guide`.
8. **Overload families (F8, Ruling 7).** The first declared overload's description of `fill` (`src/core/types.ts:521`), `disable` (`:551`), and `enable` (`:577`) states the family ("Answers one field, or several at once."; "Takes one field, several fields, or every field out of the form."; "Puts one field, several fields, or every field back into the form."), so the cell is true on its own; the prose at `guides/form.md:1534-1536` keeps only the all-or-nothing check; then `--to guide`.
9. **The drop-in's bytes (F9, Rulings 13 and 20).** `tests/guides.test.ts`: `/Interface$/u` at `:220` and `:281` reads `/Interface$/`; `resolveRoot(import.meta)` at `:99` reads `new URL('../', import.meta.url)` (drop the `resolveRoot` import if nothing else in the file uses it; `tests/setup.ts` is off-limits and keeps its export); the region from `const root = ` through the manifest loop's closing brace then equals the pilot's byte for byte, the README-fence case at `:119-131` and the package's own cases staying appended.
10. **Propagation.** `npx oxfmt --write <paths>` after edits; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/form.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/form.md tests/guides.test.ts src/core/types.ts src/core/constants.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -n '^| API *| Kind *| Shape *| Summary' guides/form.md` lists the Constants and Guards tables; `grep -c "A \`Shape\` cell holds the constant's declared type." guides/form.md` reads 1 and `grep -c 'In a guard table' guides/form.md` reads 1; `grep -n 'Its own options\|Contract [0-9]* states\|/Interface$/u\|resolveRoot' guides/form.md tests/guides.test.ts` prints nothing; `diff <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' /home/user/fleet/abort/tests/guides.test.ts) <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' tests/guides.test.ts)` prints nothing or only appended package-specific cases.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `test:src:core` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-form-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the exact wording of a recast description) and record them.
