# Brief — U2-fix-2 (scaffold), successor of `u2-fix-brief.md`

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing. Every edit is prescribed; where one cannot be applied as written, stop and report (expected, found, evidence, done or not done, at most one hypothesis).

## Objective

Close the round-2 findings in `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-fix-audit-verdict.md`: the prose names the right instrument everywhere, the wiring reader takes the repository's term and one guard, its controls are its own, the anchoring helper states its precondition and strips a trailing separator, and the new cases and comments follow their siblings.

## Read first

`/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`; then `tests/setupPolicy.ts` (the readers near lines 356 to 472), `tests/policy.test.ts` (lines 400 to 436 and its import block), `tests/config.test.ts` (lines 1120 to 1130, 1240 to 1246, 1372 to 1386, and the parity case that calls the reader), `configs/policy.ts` (lines 218 to 232), `.claude/rules/tests.md` (lines 53 and 106 to 108), `.claude/rules/workspace.md` (line 128), `.claude/rules/architecture.md` (lines 53 and 146).

## Host facts

Linux, bash, Node v22.22.2, npm 10. The tree carries U2's and U2-fix's uncommitted edits and a regenerated `host.json`; do not touch `host.json`. `npm run build` and any tree-wide `format` or lint `--fix` are barred; scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>` is permitted to realign a table you edited. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; never commit.

## Edits

1. `.claude/rules/tests.md`, the type-probe bullet: replace "a leaked one fails the placement sweep, because a probe filename is not a centralized kind file." with "a leaked one fails the `policy` plugin's placement rules, because a probe filename is not a centralized kind file." and re-wrap the bullet at 100 columns.
2. `.claude/rules/tests.md` line 53 and `.claude/rules/workspace.md` line 128: the `Proves` cell becomes "The path- and text-shaped policy laws: mirrors, suppressions, the rule map, filenames, manifest scripts, skills, and bridges" (drop "The sweep proves"); realign each table with the scoped formatter.
3. `.claude/rules/architecture.md`: replace "cleanup sweep" with "cleanup pass" at both of its occurrences (the implementation bullet near line 53 and the kind-purity bullet near line 146); re-wrap if a line moves past 100 columns.
4. Rename `inspectPolicyPopulations` to `inspectPolicyWiring` in `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`; keep its TSDoc's first sentence and its message strings.
5. In `tests/setupPolicy.ts`, export a guard `isPolicyRecord(value: unknown): value is Readonly<Record<string, unknown>>` returning `typeof value === 'object' && value !== null && !Array.isArray(value)`, placed beside `normalizePolicyPath` with a one-line TSDoc ("Whether a parsed configuration value is a plain record rather than an array or a primitive."); route every inline record test in `inspectPolicyConfiguration` and `inspectPolicyWiring` through it (`!isPolicyRecord(x)` for the negated forms, `isPolicyRecord(x)` for the positive ones), leaving each branch's behaviour unchanged.
6. In `tests/policy.test.ts`: delete the control `reports nothing for the real configuration over the plugin rules and glob populations` and every import it alone used (`policyPlugin`, `POLICY_PLACEMENT_GLOBS`, `POLICY_ENDING_GLOBS`, and `readFileSync` or `join` if nothing else in the file uses them); add a control `reports a configuration that is not a record` asserting `inspectPolicyWiring([], [], [])` equals `['Oxlint configuration must be a record']`; add a control `admits a plain record and refuses an array, null, and a primitive` over `isPolicyRecord` with `{}` true and `[]`, `null`, and `'record'` false. `tests/config.test.ts`'s parity case keeps the real-configuration proof.
7. `configs/policy.ts`, `pathToPolicyRelative`: strip any trailing `/` from the normalized `cwd` before building the prefix; rewrite its TSDoc as a wrapped block comment stating: the workspace-relative path when the file sits under the directory the linter resolved it against, else the path as given; the linter resolves each file against its own directory, the workspace root under the `lint` scripts and its package directory under `RuleTester`, so a file outside that directory keeps its path and matches no registered domain folder, because a registered folder is workspace-relative; a drive-letter case difference between the two arguments is not folded.
8. `tests/config.test.ts`: append ` [membership: module function syntax whose file is absent from the function register]` to the name `rejects a function in a nested folder whose suffix matches a registered domain` (match the exact suffix wording its sibling invalid cases in the same block carry, if it differs); extend the comment above the `scripts/read.ts` fixture with one sentence naming the `debugger` statement as the arrival control the root `no-debugger` rule reports, which proves the file entered the run the absence assertion reads.

## Scope

- Owned: `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`.
- Off-limits: every other file, `host.json` and `guides/scaffold.md` included.

## Acceptance criteria, cheapest first

1. `grep -rn 'inspectPolicyPopulations' tests configs` prints nothing; `grep -n 'cleanup sweep' .claude/rules/architecture.md` prints nothing; `grep -n 'The sweep proves' .claude/rules/tests.md .claude/rules/workspace.md` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check <every owned file>` exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts tests/config.test.ts` exits 0.
4. `npm run test:policy` exits 0.
5. `npm run test:config` exits 0 apart from the host-inventory case, which the verifier's `build` closes; record it if red.
6. `npm run check` exits 0.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u2-fix-2-report.md`: per edit the exact diff hunk; each criterion's command with its exit code and last lines; `git status --short`; what you could not close and which of your own claims you flag. Return the same content as your final message. No process diary.
