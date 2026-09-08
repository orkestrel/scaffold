# Brief — `d7n-workflow-converge-fix` (workflow's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/workflow` from the committed tip `1151786` (clean; install the guide head start first per the handoff's `head-start.sh`, and confirm `sha256sum node_modules/@orkestrel/guide/dist/src/core/index.js | cut -c1-8` reads `2b76b363`; the closure re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install anything else, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-workflow-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 13, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, § Ruling 24, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-workflow-audit-verdict.md` (items WF1 to WF7) and the three lanes it names; the pilot `/home/user/fleet/abort/guides/abort.md` and `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/middleware/guides/middleware.md` (its `### Shapers` table, the closest sibling of item 1).

## Items

1. **`### Shapes` (WF1, Ruling 25).** `guides/workflow.md` about `:350` replaces "A `Shape` cell holds the interface the shape value compiles into." with "A `Shape` cell holds the constant's declared type." and each cell holds the value's declared type in bare-member form read from `src/core/shapers.ts` (or wherever the shape values are declared): `ObjectShape<{ id, name, description?, … }>` in declaration order, `?` on an `optionalShape` member. The compiled interface stays named in the description where the block already names it.
2. **`### Constants` (WF2, Ruling 21).** About `:366`, `:370`, `:371`: `false` → `boolean`, `1024` → `number`, `2_147_483_647` → `number`. The descriptions already carry the literals; the doc blocks do not move.
3. **All-caps emphasis (WF3).** `guides/workflow.md` `DUAL-store` (about `:195` and `:1091`) and `FIRST` (about `:1414`) lowered; the remarks of every block the converge unit rewrote (`src/core/factories.ts:344-354`, `src/core/constants.ts:78-89`, `src/core/types.ts:2113-2138`); then every other hit `grep -rnE '\b[A-Z]{3,}\b' src guides/workflow.md README.md` finds outside a code token, lowered keeping its contrast, and the grep ruled hit by hit in the report (acronyms, HTTP tokens, error codes, filenames, and code literals stay).
4. **The repeated remarks (WF4, Ruling 7).** `src/core/types.ts` at `:179/:182`, `:361/:364`, `:165/:168`, `:229/:234`; `src/core/factories.ts:340-344`, `:257-264`, `:291-303`; `src/core/stores/MemoryWorkflowStore.ts:7-15`; `src/core/errors.ts:10-15`; `src/core/WorkflowPersistence.ts:5-9`: the `@remarks` sentence the description now states is pruned, keeping every fact the description does not carry. The descriptions stay, so `npm run docs` stays at zero.
5. **The titled fence's lead-in (WF5, Ruling 21).** The sentence at about `:25` ending in a colon moves below `### Author a definition and run it` (about `:27`), ending without the colon, so the heading is followed by the sentence and then the fence; `:25`'s paragraph keeps a sentence introducing the section.
6. **The count (WF6).** `src/core/types.ts`'s `WorkflowStoreInterface` description ("three async primitives (`get` / `set` / `delete`)") names the members without the number, in the form `guides/workflow.md` about `:647` already uses; `--to guide` carries it to the cell.
7. **The closing items (WF7, Rulings 13, 20, 21, 24, 25, 26, 28).** The drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own cases appended; the `Shape` idiom where a table lacks it (a table of `const` rows heads `Shape`; a function row in a table carrying `Shape` holds its signature, a guard row the type it narrows to, a class row the interface it implements, with the Ruling 26 and 28 sentences where such rows sit; a dedicated guard table carries the guard sentence alone); `#` links; a lead-in sentence before every fence directly under a heading; the README's `## Install` and `## Usage` fences directly under their headings.
8. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/workflow.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/workflow.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c "A \`Shape\` cell holds the constant's declared type." guides/workflow.md` reads at least 2; `grep -c 'compiles into' guides/workflow.md` reads 0; `grep -nE '^\| \`[A-Z_]+\` +\| const +\| \`(false|true|[0-9_]+|'"'"'[^'"'"']*'"'"')\` ' guides/workflow.md` prints nothing; `grep -nE 'DUAL-store|\bFIRST\b' guides/workflow.md` prints nothing; `grep -c 'three async primitives' src/core/types.ts guides/workflow.md` reads 0 for each; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/workflow.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/workflow.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-workflow-converge-fix-report.md`: per item the hunk (the sweeps summarized by file with one example), per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a fence move that reddens the titled pair. Decide ancillary matters (exact wording) and record them.
