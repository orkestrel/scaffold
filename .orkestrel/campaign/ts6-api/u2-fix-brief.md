# Brief — U2-fix (scaffold), successor of `u2-policy-plugin-brief.md`

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Every edit below is prescribed; where a prescription cannot be applied as written, stop and report (expected, found, evidence, done or not done, at most one hypothesis) rather than improvising.

## Objective

Close the findings of U2's audit round (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-audit-verdict.md`): the domain match anchors to the workspace root, the function rule takes its own name, the rule prose names the instrument each proof belongs to, the sweep's violation record has one construction path, and the population wiring has one exported reader.

## Read first

`/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/workspace.md` § Policy instruments; then `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` in full; then the audit lanes `u2-audit-subjective.md` and `u2-audit-objective.md` under `.orkestrel/campaign/ts6-api/` for the evidence behind each finding. `m8m13-report.md` § What the context exposes records that `context.cwd` is the linted workspace root under the CLI and the oxlint package directory under `RuleTester`, and that `RuleTester` resolves a case's `filename` against that same directory.

## Host facts

Linux, bash, Node v22.22.2, npm 10. The tree carries U2's uncommitted edits and a regenerated `host.json`; do not touch `host.json`. `npm run build` and any tree-wide `format` or lint `--fix` are barred; scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>` is permitted where a check reports one of your owned files. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; never commit.

## Findings and their edits

**F1 — `isPolicyDomain` anchors to the workspace root (claim 11, both lanes).**
- In `configs/policy.ts`, add `readonly cwd: string` to `PolicyContext` beside `filename`, with a one-line TSDoc naming it the directory oxlint resolves the file against.
- Add an exported helper `pathToPolicyRelative(filename: string, cwd: string): string` beside `pathToPolicyFolder`: normalize both arguments' separators to `/`; when the normalized filename starts with the normalized `cwd` followed by `/`, return the remainder; otherwise return the normalized filename unchanged. TSDoc: the workspace-relative path when the file sits under the directory the linter resolved it against, else the path as given.
- Change `isPolicyDomain(filename: string)` to `isPolicyDomain(filename: string, cwd: string)`: compute `relative = pathToPolicyRelative(filename, cwd)`, take `file = pathToPolicyFile(relative)` and `folder = pathToPolicyFolder(relative)`, and match `FUNCTION_DOMAIN_FOLDERS.some((registered) => folder === registered)` by equality alone; delete the `endsWith` clause and rewrite the TSDoc to state that the registered folder is a workspace-relative path compared by equality after the linter's own directory is stripped. Pass `context.cwd` at every call site (`reportFunction`, `reportDomain`, and any other reader).
- In `tests/config.test.ts`, add under `no-misplaced-function` an invalid case named "rejects a function in a nested folder whose suffix matches a registered domain" with `filename: 'src/server/execution/nested/src/server/execution/thing.ts'` (choose a registered folder from `FUNCTION_DOMAIN_FOLDERS` and nest it under itself the same way) holding `export function run(): void {}` and expecting one `function` diagnostic, and under `no-malformed-domain` a valid case named "accepts a nested folder whose suffix matches a registered domain" with the same filename holding `export const VALUE = 1`.

**F2 — the function rule takes its own name (claim 10, subjective).** Rename `PLACEMENT_RULE` to `FUNCTION_RULE` and `reportPlacement` to `reportFunction` in `configs/policy.ts` (the constant, the reporter, every reference, every TSDoc naming them; the rule id `no-misplaced-function` and the message id `function` stay), and in `tests/config.test.ts` (the import and every use).

**F3 — the rule prose names its instrument (claim 13, both lanes).** In `.claude/rules/architecture.md` § What the policy instruments prove, apply these sentence replacements and re-wrap each edited bullet at the file's 100-column width:
- "Each reads declaration syntax, file name, and workspace text, never meaning." → "The plugin reads declaration syntax and file name; the sweep reads paths and workspace text; neither reads meaning."
- The bullet "It proves that no source, test, config, or script file carries …" → open with "The sweep proves that …".
- The bullet "It proves that every `.claude/rules/*.md` file has a rule-map row …" → open with "The sweep proves that …".
- The bullet "It cannot write a filename the host refuses." → open with "The sweep cannot write …".
- The bullet "It does not prove a collection is frozen." → open with "The plugin does not prove …".
- The bullet "It does not tell one function kind from another." → open with "The plugin does not tell …", and inside it "no later version of the sweep claims more" → "no later version of the plugin claims more".
- The bullet "It reports no `data` violation in `helpers.ts`." → open with "The plugin reports no …".
- The ambient bullet → "No placement or line-ending rule inspects an ambient declaration file: `.d.ts`, `.d.mts`, and `.d.cts` are outside their reach. The lint population reaches those files, and each of those rules refuses the file by its name, because an ambient declaration file is not a module in the kind table."
- The bullet "It does not inspect class-expression members." → open with "The plugin does not inspect …".
- "are review findings, not red tests." → "are review findings, not instrument diagnostics."
- The bullet "It does not decide barrel membership." → open with "The plugin does not decide …".
- "whether or not a test can see the violation." → "whether or not an instrument can see the violation."

**F4 — the placement law's other carriers (objective, outside the claims).** Replace the `policy` row's Proves cell in `.claude/rules/workspace.md` (the project table) and in `.claude/rules/tests.md` (the path table), and the `tests/policy.test.ts` bullet in `guides/scaffold.md` § Tests, so each reads that the sweep proves the path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges; keep each table aligned (run the scoped formatter on the file after editing).

**F5 — the workspace case's name (objective).** In `tests/policy.test.ts`, rename `enforces placement and mirrors over the real workspace` to `enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace`.

**F6 — the absence assertion gets a presence control (objective).** In the real-binary case of `tests/config.test.ts`, add a `debugger` statement to the scratch `scripts/read.ts` fixture, run the case once to read the exact `code` oxlint reports for it over that file, and assert that string is present in `violationCodes` directly before the existing `not.toContain('policy(no-host-line-endings) scripts/read.ts')`.

**F7 — one construction path for the violation record (subjective F1).** Give `createPolicyViolation` a fourth optional parameter `line?: number`, returning `{ rule, path, message }` when it is `undefined` and `{ rule, path, line, message }` otherwise (no `undefined`-valued key), update its TSDoc, and route the two object-literal sites in `tests/setupPolicy.ts` (the suppression push and the skill TODO push) through it.

**F8 — one exported population reader (subjective F2 and the objective referral).** In `tests/setupPolicy.ts`, beside `inspectPolicyConfiguration`, export `inspectPolicyPopulations(configuration: unknown, rules: readonly string[], populations: readonly (readonly string[])[]): readonly string[]`: it returns a violation line per rule id that no top-level `rules` record and no override's `rules` record enables, and a violation line per population whose `files` list no override declares exactly; it uses the same record guards `inspectPolicyConfiguration` uses. Add its controls to `tests/policy.test.ts`: a configuration missing one rule reports that rule, one missing a population reports it, and the real `.oxlintrc.json` with the plugin's declared rule ids and `[POLICY_PLACEMENT_GLOBS, POLICY_ENDING_GLOBS]` reports nothing. Replace the inline walk in the `enables every plugin rule over the population its law names` case of `tests/config.test.ts` with a call to the reader and `toEqual([])`, keeping the two `declared` containment assertions. `POLICY_WIRING_RULES` stays as it is.

## Scope

- Owned: `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/rules/architecture.md`, `.claude/rules/workspace.md`, `.claude/rules/tests.md`, `guides/scaffold.md` (the one bullet named in F4 only).
- Off-limits: every other file, `host.json` included.

## Acceptance criteria, cheapest first

1. `grep -n -E 'PLACEMENT_RULE|reportPlacement' configs/policy.ts tests/config.test.ts` prints nothing; `grep -n 'endsWith' configs/policy.ts` prints no line inside `isPolicyDomain`.
2. `npx oxfmt --config .oxfmtrc.json --check <every owned file>` exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts tests/config.test.ts` exits 0.
4. `npm run test:policy` exits 0 with the new population-reader controls present.
5. `npm run test:config` exits 0 (the host-inventory case is green again only after the verifier's `build`; if that one case alone is red, record it and treat the criterion as met).
6. `npm run check` exits 0; `npm run test:guides` exits 0.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u2-fix-report.md`: per finding, the exact diff hunk; each criterion's command with its exit code and last lines; `git status --short` and `git diff --stat`; what you could not close and which of your own claims you flag. Return the same content as your final message. No process diary.
