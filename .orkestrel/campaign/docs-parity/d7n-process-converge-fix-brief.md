# Brief — `d7n-process-converge-fix` (process's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/process` from the committed tip `20b5f3f` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `9fd4adc5…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-process-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 13 and its amendments, § Ruling 15, § Ruling 18, § Ruling 20, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-process-audit-verdict.md` (items P1 to P11); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-process-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-process-close-brief.md` (the closing generator's lists: the region diff, the header diff, the fences, the tables); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `/home/user/fleet/form/guides/form.md:118-175` (a constants table and a guard table under their sentences, landed by form's fix round) and `/home/user/fleet/form/src/core/constants.ts` (budgets naming their literals).

## Items

1. **The drop-in's bytes (P1, Rulings 13, 20, and 21).** `tests/guides.test.ts`: lines 1 to 3 equal the pilot's; the `INTERNAL` block's doc comment carries the pilot's sentence; the region from `const root = ` through the manifest loop's closing brace equals the pilot's byte for byte — `const sources = createSourceManager(...)` keeps the pilot's name (the package's own code reads `sources` where it read `sourceManager`), `/Interface$/` with no flag at `:442` and `:508`, the `names.length` guard at `:497` dropped or lifted into a package-owned case — with the package's own file-scope block (`FACES`, `SOURCES`, `REFUSALS`, `describe('public package faces')`) moved after the pilot's README case and before the manifest loop, and the package's own `documents at least one method group` case moved after the pilot's examples loop inside the loop's `describe`. The closing brief's region diff shows the current state.
2. **The lost nuance (P2).** `tests/src/server/processes/Supervisor.test.ts:113` reads "An override sized barely past the race turns a contended run into a red gate reporting a timeout."
3. **The count (P3).** `guides/process.md:518` "Two moments arm the bound." is deleted; the sentences that follow carry the paragraph.
4. **One sentence, two rows (P4).** `src/server/processes/ProcessManager.ts:15` describes what the class does (launches, evicts, and destroys the supervised children it keys) and `src/core/types.ts:730` what the contract is; `ProcessErrorCode` (`src/core/types.ts:812-813`) names its arms in its description (`spawn`, `timeout`, `input`, `duplicate`, `protocol`, `invalid`); then `--to guide`.
5. **The guard table (P5, Ruling 20).** `guides/process.md:86-92` heads `| API | Kind | Shape | Summary |` with `ProcessError` in the cell, under "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table.
6. **The constants table (P6, Rulings 18 and 20).** `guides/process.md:160-178` drops `Value`, heads `| API | Kind | Shape | Summary |` with each constant's declared type (`number`, `string`, the `readonly` tuple's type for `PROCESS_ERROR_CODES` — read `src/core/constants.ts`), under "A `Shape` cell holds the constant's declared type." alone; each literal a reader needs is named in its declaration's description paragraph ("Names the default cooperative POSIX window, 5000 ms, …"; `PROCESS_PATHEXT`'s string) so `--to guide` carries it; the owned case `documents the constant values its Surface table prints` (`tests/guides.test.ts:776-789`) reads each literal from the description paragraph beside the row (or from an executed fence) instead of from a `Value` column, and `PROSE_CONSTANTS` keeps its meaning or goes if the distinction no longer exists; the mirrors of that table elsewhere in the guide (the report names them) take the same shape.
7. **The opening clause (P7).** `guides/process.md:13-14` "while `detach` returns without waiting for anything" becomes the fact the tagline lacks (`detach` attaches no stdio and never observes the child's exit) or is dropped.
8. **Pointers (P8).** `tests/src/server/processes/Supervisor.test.ts:104` and `:112`: `below` becomes `that follows` or `later`.
9. **`both` (P9).** `guides/process.md:1031` names `execute` and `executeSync` in the sentence.
10. **Fence lead-ins (P10, Ruling 21).** One complete sentence between each heading and its fence at `guides/process.md:1244`, `:1253`, `:1275`, `:1301`, and at any other fence directly under a heading.
11. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/process.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`, the comments in `tests/src/server/processes/Supervisor.test.ts` (items 2 and 8; no code token moves). Off-limits: everything else, including `README.md`, `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/setup*.ts`, and every other file under `tests/src/**`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/process.md tests/guides.test.ts src/core/types.ts src/core/constants.ts src/server/processes/ProcessManager.ts tests/src/server/processes/Supervisor.test.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `diff <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' /home/user/fleet/abort/tests/guides.test.ts) <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' tests/guides.test.ts)` prints only the package's own appended block and case; `grep -c 'stops being stranded' tests/guides.test.ts` reads 1 (after joining wrapped lines); `grep -n '/Interface$/u\|sourceManager' tests/guides.test.ts` prints nothing; `grep -n 'Two moments\|below\b' guides/process.md tests/src/server/processes/Supervisor.test.ts` prints nothing; `grep -c 'barely past the race' tests/src/server/processes/Supervisor.test.ts` reads 1; `grep -n '^| API *| Kind *| Shape *| Summary' guides/process.md` lists the Guards and Constants tables and `grep -c '| Value |' guides/process.md` reads 0; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/process.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:server` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-process-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the lead-in sentences, the exact descriptions) and record them.
