# Unit conform-program fix round 2 — the `@throws` form, the report's sweeps and pointers, six prose sites

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/program`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutations of claims 2, 3, 4, and 9 and its findings O1 to O6 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r2-sol.md`); R1 and R2 are ruled: one fix round closes the record and the tree, and the six prose sites fold here rather than into a successor unit, because every one sits in a file this unit touched. The round-2 checker passed.

## Context

Read first: `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation (write a thrown error as "Thrown when …"); `/home/user/scaffold/AGENTS.md` § Writing (never state a count; never name a list item by its position); `/home/user/scaffold/.claude/rules/writing.md` § Sentence and paragraph order and § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`, never `above` or `below`); the report `/home/user/scaffold/tmp/units/conform/conform-program-report.md` § Rows, § Sweeps, § Fix round 1.

Standing conditions: the checkout carries the conform-program unit's uncommitted edits (18 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>` with `<project>` one of `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **Claim 2, the `@throws` form** — sweep `@throws` over `src`; every row this unit added or split reads `@throws {@link ProgramError} Thrown when <condition> (\`'<CODE>'\`).` — the lane names `src/core/types.ts:400,408,425,445,498,515,534`, `src/core/programs/Program.ts:246`, and `src/core/programs/ProgramManager.ts:99,120,141,165,242,259,278`; rewrite every row that does not open with "Thrown when", on the interface and mirrored on the class. Record the sweep with the count of rows the pattern `@throws \{@link ProgramError\} Thrown when` matches beside the count `@throws` matches, both from the command.
- **Claim 3, the sweep record** — the report's inflection sweep row (§ Sweeps, the case-insensitive `(s|es|ed|ing)` pattern) names the full alternation: `status_precedence|buildnotices|buildlimits|tallyprogram|isbrowservuepath|buildqualification|builddefinition|scriptedqualifier|scriptedreason|logicalpremises|qualificationdefinition|rulingdefinition|linedefinition|ratingdefinition`; re-run it over `src`, `tests`, `guides/program.md`, `guides/README.md`, and `README.md` and record the result.
- **Claim 4, the documentation rows' sweeps** — for each documentation row (program-subj-1, -5, -6, -7, -8, -9, -10, -11, -12, -14 and program-obj-11), § Sweeps carries the pattern and paths that prove the old form gone; add the missing ones, including `\{@link [^}]+\}s|\`FieldPath\`s|\`\{\{token\}\}\`s` and `\(default ` over `src` and `guides/program.md`, each with its result.
- **Claim 9, the pointers** — refresh every `file:line` in the disposition table and the row sections from the current tree (the lane names `RecordingReason` at `tests/setup.ts:92`, `createRecordingEngine` at `:609`, `count` at `src/core/types.ts:402` and `src/core/programs/ProgramManager.ts:110`); sweep the report for every `tests/setup.ts:`, `src/core/types.ts:`, `ProgramManager.ts:`, `Program.ts:`, and `helpers.ts:` pointer and check each.
- **O1 to O6, the prose sites** — `tests/setup.test.ts:4` "Each contract below is asserted" → "Each following contract is asserted"; `:465` "matches a hand-written table of the first four subjects" → "matches the hand-written fixture table"; `:723` "give the property rating two lines a scope can tell apart" → "give the property rating distinct scoped lines"; `tests/guides.test.ts:48` "the second assertion below fails when" → name the assertion ("the internal-symbol assertion fails when"); `guides/program.md:932` "as shown above — matching" → "as the preceding example shows — matching"; `tests/src/core/programs/ProgramManager.test.ts:157` "hundreds of programs" → "a generated program collection" (the title reads "preserves count, lookup, order, and fresh arrays for a generated program collection"). Then sweep `\b(above|below)\b` and `\b(hundreds|dozens|two|three|four|five|six|seven|eight|nine|ten) (subjects|lines|programs|fixtures|entries|cases|tests)\b`, case-insensitive, over `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src`, `guides/program.md`, `guides/README.md`, and `README.md`, and rule every hit (the reason engine's `'above'` and `'below'` comparison operators are permitted).
- **Report** — append `## Fix round 2` naming the objective lane's file, each item, the sweeps, and the sites.

## Scope

Owned: `src/core/types.ts`, `src/core/programs/Program.ts`, `src/core/programs/ProgramManager.ts` (the `@throws` rows), `tests/setup.test.ts`, `tests/guides.test.ts`, `guides/program.md`, `tests/src/core/programs/ProgramManager.test.ts` (the six prose sites), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the `@throws` sweep's two measurements with the command; each rewritten prose site with `file:line`; the claim-3 and claim-4 sweep rows as recorded; the pointers refreshed; the `above|below` and count sweeps with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped `src:core`, `setup`, and `guides` runs over the files you touched.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a `@throws` row names a condition the code does not raise, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: the exact wording of a condition.

## Acceptance criteria

1. `grep -rnE "@throws \{@link ProgramError\}" src | grep -v "Thrown when"` returns nothing.
2. The report's § Sweeps carries the full inflection alternation and a row per documentation row; no disposition pointer names a line that does not carry what it claims.
3. The six prose sites read as prescribed and the `above|below` and count sweeps return only permitted hits.
4. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
