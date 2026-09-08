# Brief — `d7n-rater-converge-fix` (rater's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/rater` from the committed tip `41ae09c` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-rater-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13 and its amendments, § Ruling 15, § Ruling 20, § Ruling 21, § Ruling 23; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-rater-audit-verdict.md` (items RT1 to RT8); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-rater-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-rater-close-brief.md`; the pilot's guard table `/home/user/fleet/abort/guides/abort.md:46-52` and its suite `/home/user/fleet/abort/tests/guides.test.ts:1-3`.

## Items

1. **The Validators guard table (RT1, Ruling 20).** `guides/rater.md:126-140` heads `| API | Kind | Shape | Summary |`, each cell the type the guard narrows to (`Stage`, `LineDefinition`, `RatingDefinition`, `Evidence`, `WorksheetFactor`, `WorksheetGroup`, `Step`, `Worksheet`, `LineResult`, `RatingResult` — read each `value is X` in `src/core/validators.ts`), under "In a guard table a `Shape` cell holds the type the guard narrows to." between the section's prose and the table; the sentence pointing the reader at the declarations is deleted.
2. **The paragraph at `:88-92` (RT2).** The `emitter` and `[Methods](#methods)` sentence stays as the Types table's note; the `LineResult` `amount` and `RatingResult` `success` rules move into the § Surface paragraph at `:56-62` that states what a failed line carries, the trailing clause closed ("is `true`").
3. **Fence lead-ins (RT3, Ruling 21).** One complete sentence between each heading or table and its fence at `guides/rater.md:104`, `:142`, `:265` (the titled fence: what the demonstration builds), `:299`, and at any other fence directly under a heading.
4. **`rate`'s description (RT4).** `src/core/types.ts:175-177` reads "Rates an array of lines, or a {@link RatingDefinition}, against one subject over the shared quantitative engine."; then `--to guide`.
5. **The README's link (RT5).** `README.md:3-13`'s onboarding sentence that names `ReasonInterface` links `@orkestrel/reason` the way the replaced paragraph did.
6. **The test name (RT6).** `tests/guides.test.ts:379` reads "returns equal results from the array-of-lines and rating-definition `rate` overloads".
7. **The closing items (RT7, Rulings 13 and 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state).
8. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/rater.md`, `README.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/rater.md README.md tests/guides.test.ts src/core/types.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c 'In a guard table' guides/rater.md` reads 1 and `grep -n '^| API *| Kind *| Shape *| Summary' guides/rater.md` lists the Validators table; `grep -n 'documented on the guard' guides/rater.md` prints nothing; `grep -c '{@link RatingDefinition}' src/core/types.ts` reads at least 1; `grep -c 'orkestrel/reason' README.md` reads at least 2 (the link and the import); `grep -n 'both Methods fence' tests/guides.test.ts` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/rater.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-rater-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the lead-in sentences, the paragraph's exact wording) and record them.
