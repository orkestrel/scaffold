# Brief — `d7n-agent-converge-fix` (agent's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/agent` from the committed tip `54e7199` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-agent-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 13, § Ruling 18, § Ruling 20, § Ruling 21, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-agent-audit-verdict.md` (items A1 to A9) and the two reviewer lanes it names; `/home/user/scaffold/tmp/units/d7n-agent-close-brief.md`; the pilot `/home/user/fleet/abort/guides/abort.md` (its `### Validators` and `### Constants` tables) and `/home/user/fleet/abort/tests/guides.test.ts`.

## Items

1. **`### Constants` (A1, Ruling 18).** `guides/agent.md` about `:418-430` heads `| API | Kind | Shape | Summary |` under "A `Shape` cell holds the constant's declared type." between the section's prose and the table, each cell the declared or widened type read from `src/core/constants.ts`, never a literal type; every literal already sits in its description.
2. **`### Validators` (A2, Ruling 20).** About `:486-494` heads `| API | Kind | Shape | Summary |` with `Message`, `Section`, `ConversationSnapshot` (each `value is X` read from `src/core/validators.ts`) under "In a guard table a `Shape` cell holds the type the guard narrows to." followed by the existing sentence that an error guard stays in the Errors table.
3. **The methods-only interfaces (A3, Ruling 27).** `ChannelInterface` (about `:554`), `AuthorityInterface` (about `:564`), and every other interface row whose cell is a bare member list take `{} plus <members>`.
4. **The `@remarks` emphasis (A4).** Every all-caps emphasis in the `@remarks` and comment lines of the blocks under `src/**` is lowered keeping its contrast — `src/core/types.ts:108-116`, `:199-224`, `:1721-1765`, `:1836-1844`, `:2002-2003`, `src/core/ThinkSplitter.ts:17-20`, `src/core/factories.ts:64-66`, and every other hit `grep -rnE '\b[A-Z]{3,}\b' src` finds outside a code token; the grep ruled hit by hit in the report (acronyms, codes, and code literals stay; fence comments in `guides/agent.md` stay).
5. **The repeated remarks (A5, Ruling 7).** `src/core/types.ts` at `ProviderInterface.stream` (about `:170-177`) and `ConversationInterface.compact` (about `:1830-1840`): the `@remarks` sentence the description now states is pruned, keeping any fact the description does not carry.
6. **The tallies (A6).** `guides/agent.md:786` "two summarizer calls per compaction" and `:830` "the two halves of one exchange" name the members (the `summary` and `compact` calls; advertising and dispatch) or recast without the number; where the sentence sits in a compared cell, edit the block and `--to guide`.
7. **The stray comment lines (A7).** Every doc block ending ` *` then ` */` (the rewritten blocks in `src/core/types.ts`, `src/core/helpers.ts`, `src/core/scopes/Scope.ts`) drops the empty comment line, and the double empty comment line at `src/core/types.ts:527-528` becomes one; `npm run docs` stays at zero.
8. **The topic headings (A8).** `guides/agent.md:213`, `:315`, `:340` become `###` (the titled pair compares flattened text, and `guide.methods()` reads `####` under `## Methods` alone — confirm `npm run docs` and `test:guides` after the change).
9. **The closing items (A9, Rulings 13, 20, 21, 25, 26, 28).** Every item `d7n-agent-close-brief.md` lists: the `Shape` idiom where a table lacks it (a table of `const` rows heads `Shape`; a function row in a table carrying `Shape` holds its signature, a guard row the type it narrows to, a class row the interface it implements, with the Ruling 26 and 28 sentences where such rows sit); `#` links; the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own cases appended; a lead-in sentence before every fence directly under a heading.
10. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/agent.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/agent.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c "A \`Shape\` cell holds the constant's declared type." guides/agent.md` reads at least 1; `grep -c 'In a guard table' guides/agent.md` reads 1; `grep -nE '^\| \`[A-Za-z]+Interface\` +\| interface +\| \`[a-z][^\`{]*\` ' guides/agent.md` prints nothing; `grep -rnE '\b(OWNS|LIVE|RETAINS|MINTS|FOREIGN|MANUAL|SPLIT|CLEAN|IMPLICIT|RECLASSIFIES|OVERRIDES|NOTHING|THROWS)\b' src` prints nothing; `grep -cE 'two summarizer calls|the two halves' guides/agent.md` reads 0; `grep -rnB1 '^\s*\*/' src --include=*.ts | grep -cE '^\S+-[0-9]+-\s*\*$'` reads 0; `grep -nE '^#### ' guides/agent.md | awk -F: '$1 < 378'` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/agent.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/agent.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-agent-converge-fix-report.md`: per item the hunk (the sweeps summarized by file with one example), per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a heading move that reddens the titled pair. Decide ancillary matters (exact wording) and record them.
