# Brief — `d7n-brief-converge-fix` (brief's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/brief` from the committed tip `db926ac` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-brief-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 6, § Ruling 7, § Ruling 13 and its amendments, § Ruling 14, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-brief-audit-verdict.md` (items BR1 to BR12); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-brief-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-brief-close-brief.md` (the closing generator's lists); the pilot's README `/home/user/fleet/abort/README.md` and suite `/home/user/fleet/abort/tests/guides.test.ts` whole; `/home/user/fleet/form/guides/form.md:118-152` (a constants table under its sentence).

## Items

1. **The lead-in (BR1, Ruling 21).** `guides/brief.md:41-45`: the sentence "Compile a request into a `Briefing`, then project the brief it carries:" moves below `### Compile and project a brief` as the fence's lead-in; `## Surface` keeps a section lead that does not end in a colon, or none.
2. **The header (BR2, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's.
3. **The interleaved case (BR3, Ruling 20).** `reads a real inventory covering the documented source` (`tests/guides.test.ts:117-122`) moves after the pilot's README case, the pilot's block contiguous; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state).
4. **Fence comments (BR4).** `guides/brief.md:1007`, `:1049`, `:1053`: `DERIVED`, `MISSED`, `UNCHANGED` lowered (none of these fences is the titled pair).
5. **The duplicate line (BR5).** `guides/brief.md:1002-1003`: the second `stopped.brief` line reads a different member (`stopped.failures` or `stopped.questions.length`) with a true comment, or is deleted.
6. **`BriefError`'s clause (BR6, Ruling 7).** `src/core/errors.ts:3-22`: the `@remarks` names the readonly `code` on the `BriefErrorCode` vocabulary and the optional readonly `context`; the guide sentence at `:193` stays.
7. **`SINGLE_LINE_PATTERN` (BR7, Ruling 14).** `src/core/constants.ts:105` reads "Holds the positive form of {@link LINE_BREAK_PATTERN}, for a `stringShape` `pattern`."; then `--to guide`.
8. **The Constants table (BR8, Rulings 18 and 20).** `guides/brief.md:142` heads `| API | Kind | Shape | Summary |` under "A `Shape` cell holds the constant's declared type." between the section's prose and the table, the cells `readonly TaskOperation[]`, `readonly TaskDomain[]`, `readonly OutputFormat[]`, `readonly RiskSeverity[]`, `readonly (keyof Interpretation)[]`, `number`, `string`, `RegExp`, `RegExp`, `RegExp` read from `src/core/constants.ts:11`, `:27`, `:39`, `:48`, `:64`, `:87`, `:90`, `:102`, `:112`, `:125` (use the emitted declaration's type where a value is unannotated, as form did with `Readonly<RegExp>`); a literal a reader needs is named in its description (Ruling 18), then `--to guide`.
9. **The README (BR9, Ruling 6).** `README.md` carries the pilot's `## Install` and `## Usage` headings with one lead-in sentence before each fence, and a `## Requirements` line with the `engines` reading, in the pilot's shape at `/home/user/fleet/abort/README.md`; the pitch stays equal to the tagline.
10. **The event maps (BR10, Ruling 19).** `src/core/types.ts:415` and `:509` gain an `@remarks` naming what each event carries (`compile` the `Briefing`, `block` the blocking `Gap` list, `error` the thrown value, `destroy` nothing; `add` and `remove` the record id); the cells stay bare names.
11. **The closing items (BR11, Ruling 21).** One complete sentence between each heading and its fence wherever the closing brief lists one; the `INTERNAL` block carries the pilot's sentence.
12. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/brief.md`, `README.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/brief.md README.md tests/guides.test.ts src/core/errors.ts src/core/constants.ts src/core/types.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the region diff against the pilot prints only the package's appended cases; `grep -c "A \`Shape\` cell holds the constant's declared type." guides/brief.md` reads 1 and `grep -n '^| API *| Kind *| Shape *| Summary' guides/brief.md` lists the Constants table; `grep -nE '\b(DERIVED|MISSED|UNCHANGED)\b' guides/brief.md` prints nothing; `grep -c '## Requirements' README.md` reads 1 and `grep -c '^## Install\|^## Usage' README.md` reads 2; `grep -c 'stringShape' src/core/constants.ts` reads at least 1; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/brief.md README.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-brief-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the lead-in sentences, the README's exact lines) and record them.
