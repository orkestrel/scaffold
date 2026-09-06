# Brief — U2 policy-plugin (scaffold)

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. This is Sol's unit by work class (constraint-heavy, mechanical precision); it runs on the Opus `implementer` because the Codex bench is dark, and the substitution is recorded in the campaign ledger. You are the sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Remove every use of the in-process `typescript` API from the vendored policy sweep by moving its syntax-shaped rules into the oxlint `policy` plugin at `configs/policy.ts`, so that `tests/setupPolicy.ts` and `configs/policy.ts` name no compiler specifier, every register those rules read lives in `configs/policy.ts` alone, and every moved rule carries a `RuleTester` pair. The fleet stays on TypeScript 6.0.3; every replacement must use only a surface that TypeScript 7 also ships, and the oxlint plugin surface is one.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`, then `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md` (§ Policy instruments and § Configuration authority), `writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/plan.md` § Decision 3 and § Re-baseline (the constraints M8 and M13 fixed), and `m8m13-report.md` in full (what a rule's `context` exposes; how `RuleTester` treats `filename`).
3. The code: `/home/user/scaffold/configs/policy.ts` (the plugin today: `PolicyNode`, `PolicyExpression`, `PolicyContext` with `report` alone, the existing rules), `/home/user/scaffold/tests/setupPolicy.ts` in full (the sweep: which rules call `createSourceFile`, `forEachChild`, `is*`, `canHaveModifiers`, `getModifiers`, the `SyntaxKind` walk; the registers `CENTRAL_SOURCE_FILES`, `FUNCTION_SOURCE_FILES`, `DATA_SOURCE_FILES`, `DATA_EXEMPT_FILES`, `FUNCTION_DOMAIN_FOLDERS`, the ambient-suffix list; `POLICY_SOURCE_GLOB` and `POLICY_PORTABILITY_SOURCE_GLOB`; the `POLICY_CONTROLS` rows), `/home/user/scaffold/tests/policy.test.ts`, `/home/user/scaffold/tests/config.test.ts` (the `RuleTester` block near lines 720 to 800), `/home/user/scaffold/.oxlintrc.json` (`jsPlugins`, the per-`files` overrides enabling `policy/*` rules).
4. `/home/user/scaffold/.orkestrel/campaign/ts6-api/inventory-distillate.md` § the vendored pair, for the per-site inventory.

## What is fixed

- **Which rules move.** Every rule in `tests/setupPolicy.ts` whose reading needs the syntax tree: the placement rules keyed on the declaration kind and the file name (the export, type, function, data, constant, class, parser, factory, and domain families) and the line-ending rules (a `split` before a `trim`, an `os.EOL` read, an `EOL` import from `node:os`). Confirm the set by reading the code rather than from this list; the acceptance criterion is that the sweep names no compiler.
- **Which stay in the sweep with no compiler:** the suppression rule, the rule-map parity, the path-population rules, the manifest script rule, the mirrored-test placement rules, and the skill and bridge families — every rule whose reading is text or paths.
- **The registers get one home**, `configs/policy.ts`, and `tests/setupPolicy.ts` imports them from `../configs/policy.js`. `configs/policy.ts` itself declares no import (`.claude/rules/workspace.md` § Configuration authority). Where a sweep rule and a plugin rule both read a register, they read the same export.
- **A rule keys on the file path's suffix**, never its absolute prefix, because `RuleTester` resolves a case's `filename` against oxlint's own package folder (`m8m13-report.md` § Run 4) while the CLI passes the absolute path. `PolicyContext` gains `readonly filename: string` and the `sourceCode` members a rule reads (measured present: `text`, `getAllComments()`, `getCommentsBefore(node)`, `getText(node)`), typed minimally in the style the file already uses; `getJSDocComment` throws under oxlint 1.80.0 and is never called.
- **Every moved rule ships a `RuleTester` pair in `tests/config.test.ts`**: an invalid case named for the membership boundary it attacks and a valid case drawn from outside that boundary, each carrying the `filename` suffix the rule keys on, under `languageOptions: { parserOptions: { lang: 'ts' } }` as the existing block does. Name a test for what it proves, never for a control identifier from this brief. Delete the `POLICY_CONTROLS` rows the moved rules leave without a reader, or re-express them; no row stays that nothing runs.
- **Population.** `.oxlintrc.json` enables the placement rules over `src/**` and `app/**` (matching `POLICY_SOURCE_GLOB`) and the line-ending rules over `src/**`, `app/**`, and `configs/**` (matching `POLICY_PORTABILITY_SOURCE_GLOB`); ambient declaration files stay outside every population as `POLICY_AMBIENT_SUFFIXES` keeps them outside the sweep today. Do not add a restricted-import row for `typescript` in this unit: the generated proof and two test files still import the compiler until later units land, and that row is U6's.
- **Vendored bytes.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`, and `.oxlintrc.json` are host inventory: scaffold is their canon, so editing them here is right, and `host.json` is regenerated by `npm run build` later (not by you).

## Scope

- Owned: `/home/user/scaffold/configs/policy.ts`, `/home/user/scaffold/tests/setupPolicy.ts`, `/home/user/scaffold/tests/policy.test.ts`, `/home/user/scaffold/tests/config.test.ts`, `/home/user/scaffold/.oxlintrc.json`.
- Off-limits: every other file, including `host.json`, `src/**`, `guides/**`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/src/**`. If a criterion needs a file outside the owned set, stop and report.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, a tree-wide `format` or `lint --fix`, `npm install`, or `npm run build`; never commit. Undo an edit by editing. Scoped formatting of an owned file with `npx oxfmt --config .oxfmtrc.json --write <file>` is permitted.

## Host facts

Linux, bash, Node v22.22.2, npm 10 on PATH, oxlint 1.80.0, typescript 6.0.3, vitest 4. The tree is committed and clean apart from `tmp/`. `npm run test:policy` and `npm run test:config` each run in under a minute; `npm run check` under two.

## Unknowns

Whether every `POLICY_CONTROLS` row of a moved rule maps one-to-one onto a `RuleTester` case, or some rows need a scratch-workspace shape that `inspectPolicyWorkspace` alone can drive; report which rows took which shape.

## Acceptance criteria, cheapest first

1. `grep -n "from 'typescript'\|require('typescript')" tests/setupPolicy.ts configs/policy.ts` prints nothing; `grep -n '^import' configs/policy.ts` prints nothing.
2. Each register named in § What is fixed exists in `configs/policy.ts` alone (`grep -rn 'CENTRAL_SOURCE_FILES\s*=' tests configs` shows one definition).
3. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0.
4. `npm run test:policy` and `npm run test:config` exit 0, and every moved rule's `RuleTester` pair is present (name each pair in the report).
5. `npm run check` exits 0.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u2-policy-plugin-report.md`: the rules moved (name → plugin rule id) and the rules kept; the registers' new home; the `RuleTester` pairs by name; the `.oxlintrc.json` populations; each command from the criteria with its exit code and last lines; `git status --short` and `git diff --stat`; what you could not close and which of your own claims you flag. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, at most one hypothesis) when: a rule cannot be expressed on the plugin surface the report measured; a moved rule needs a register the sweep reads from a file you do not own; a criterion needs an off-limits file; or a gate fails for a reason outside the owned files. Ancillary choices (rule id spelling, the order of cases, where a helper sits inside the owned files) are yours to make, record, and carry on from.
