# Unit brief — D3-pre-fix: the voice-converge fix round, in scaffold

## Role and engine

`builder`, Sonnet, a native Claude Code subagent: every edit below is fully specified. Sole writer in `/home/user/scaffold`, whose tree carries D3-pre's uncommitted work. Perform the assignment directly and spawn nothing. This brief succeeds `tmp/units/docs-d3pre-voice-brief.md`, which stays in force wherever this brief is silent.

## Objective

The audit's findings on D3-pre close: two array constants stop describing a count, seven merged description paragraphs regain their separator, every pattern and glob constant in the two vendored policy files opens with the same verb, one interface member and one skill sentence read cleanly, and the inventory is regenerated — with every D3-pre criterion still green.

## Read first

`/home/user/scaffold/.orkestrel/campaign/docs-parity/d3pre-audit-subjective.md`, `d3pre-audit-checker.md`, `d3pre-audit-objective.md`, and `d3pre-verify-report.md` (the findings below cite them), then `.claude/rules/typescript.md` § Comments and API documentation and `.claude/rules/writing.md`.

## Edits, each exact

1. **`tests/setupServer.ts`, the `CORE_GENERATED` block** (opens at the line `* Counts the artifacts the compiler itself supplies for a plan selecting \`src/core\` alone.`): the first sentence becomes `Lists the artifacts the compiler itself supplies for a plan selecting \`src/core\` alone.`; in its `@remarks`, the sentence beginning `Counted from a real compile rather than summed from parts, because the generated set grows every time the emitter gains a group and a hand-written sum goes stale on each one.` becomes `Read from a real compile rather than assembled by hand, because the generated set grows every time the emitter gains a group and a hand-written list goes stale on each one.` The `CORE_GENERATED_COUNT` block keeps `Counts …`.
2. **`tests/setupServer.ts`, the `FLEET_BIRTH_PATHS` block** (opens `* Counts the planned paths a repair leaves alone because the workspace owns them.`): the first sentence becomes `Lists the planned paths a repair leaves alone because the workspace owns them.`; in its `@remarks`, `Counted from the plan so it tracks the emitter:` becomes `Read from the plan so it tracks the emitter:`. The `FLEET_BIRTH_COUNT` block keeps `Counts …`.
3. **Restore the separator in seven description paragraphs.** In each block, keep the first sentence as the description paragraph, insert a blank ` *` line after it, and start the remaining sentences on the next line as a second paragraph, exactly as `git show HEAD:<file>` shapes that block (compare against HEAD for each):
   - `configs/policy.ts`, the `isPolicyDomain` block: paragraph one `Reports whether a path is a direct module of a fleet-registered function domain.`; paragraph two `The registered folder is a workspace-relative path, compared by equality after the linter's own directory is stripped from the given path.`
   - `configs/policy.ts`, the `functionToPolicyRegion` block: paragraph one `Returns the module-scope statement that owns a policy function, or \`undefined\` when none does.`; paragraph two `A class declaration or class expression on the way up ends the search, because the placement law reads module regions rather than class members.`
   - `tests/setupPolicy.ts`, the `parseSkillPrompt` block: paragraph one `Parses the default prompt from the canonical skill interface shape.`; paragraph two `Each value is a non-empty single-quoted scalar in which \`''\` carries an apostrophe.`
   - `tests/setupPolicy.ts`, the `matchesSkillToken` block: paragraph one `Reports whether a default prompt names one skill's token in complete form.`; paragraph two `A skill directory name is lowercase letters and hyphens, so a match followed by either continues a longer name and names a different skill.`
   - `tests/setupPolicy.ts`, the `inspectPolicyRuleMap` block: paragraph one `Inspects the discovered rule family against the root instruction file's rule map.`; paragraph two `A workspace with no rule file has no rule map to keep, so the population is empty there.`
   - `tests/setupPolicy.ts`, the `inspectPolicyFilenamePaths` block: paragraph one `Inspects an explicit path population for a name a Windows checkout cannot hold.`; paragraph two `Each path is read through its own final segment, because the population lists every directory as its own entry. A Windows host refuses the reserved characters and folds a case collision into one file, so those two boundaries are proven from a path population rather than from written files.`
   - `tests/setupPolicy.ts`, the `inspectPolicyControl` block: paragraph one `Writes a control to a real temporary workspace and runs the production sweep over it.`; paragraph two `The control's rule selects the sweep: \`skill\` inspects the canonical family, \`bridge\` inspects provider bridges, and every other rule inspects the whole workspace route.`
   Re-wrap each paragraph at 100 columns as the file's other blocks are wrapped.
4. **One verb for a pattern or a glob, in both vendored files.** In `configs/policy.ts` and `tests/setupPolicy.ts`, every exported constant whose value is a regular expression or a glob string or glob list (the names end in `_PATTERN`, `_GLOB`, or `_GLOBS`; list each site you find with `grep -n "_PATTERN\|_GLOB" configs/policy.ts tests/setupPolicy.ts`) opens its doc block with `Matches`, keeping the rest of the sentence: for example `Describes the …` and `Lists the lint populations the placement rules run over, as the Oxlint configuration declares them.` become `Matches the …` and `Matches the lint populations the placement rules run over, as the Oxlint configuration declares them.` A constant that already opens with `Matches` is unchanged. Report each site and its opener before and after.
5. **`configs/policy.ts`, the `PolicyContext.cwd` member block**: `/** The directory Oxlint resolves \`filename\` against. */` becomes `/** Names the directory Oxlint resolves \`filename\` against. */`.
6. **`.agents/skills/enterprise-bootstrap/references/frontend-design.md`**: the sentence `Keep a word only where it helps the reader understand the design, and therefore use the design.` becomes `Keep a word only where it helps the reader understand the design, and so use it.`
7. **Regenerate the inventory**: `npm run build` then `npm run build:inventory`, because edits 3 to 5 move vendored bytes.

## Scope

- Owned: `tests/setupServer.ts`, `configs/policy.ts`, `tests/setupPolicy.ts`, `.agents/skills/enterprise-bootstrap/references/frontend-design.md`, `host.json` (regenerated only).
- Off-limits: everything else, including the instruments under `.orkestrel/` and every other file D3-pre touched.
- Permitted commands: `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run build:inventory`, `npm run test:policy`, `npm run test:config`, `npm run test:setup`, `npm run test:src:server`, `git diff`, `git show`, `git status`, `node` over the two instruments read-only. Never `npm install`, a discard-class git command, a commit, or an edit to an off-limits file.

## Acceptance criteria, cheapest first

1. `grep -n "Counts the artifacts the compiler itself\|Counts the planned paths a repair leaves" tests/setupServer.ts` prints nothing; `grep -c "^ \* Matches" configs/policy.ts tests/setupPolicy.ts` prints the counts you report as the sites of edit 4.
2. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2` still prints `FLAGGED 0 NODOC 35`; `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1` still prints `HITS 0`.
3. `npm run build` exits 0, then `npm run build:inventory` exits 0; a second `npm run build:inventory` leaves `sha256sum host.json` unchanged.
4. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
5. `npm run test:policy`, `npm run test:config`, `npm run test:setup`, `npm run test:src:server` each exit 0.

## Output

Write `/home/user/scaffold/tmp/units/docs-d3pre-fix-report.md`: each edit with `file:line` before and after (edit 4 as a site list), each criterion with exit code and last lines, `git status --short` and `git diff --stat` against `HEAD` (which carries D3-pre and this round together), and, as corrections to D3-pre's report, that five skill references moved in the inventory and that `configs/helpers.ts` grew by 9 lines. Return the same as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a block named above does not match its quoted text, when a gate fails outside the owned files, or when the inventory does not regenerate. Wrapping inside a paragraph is yours.
