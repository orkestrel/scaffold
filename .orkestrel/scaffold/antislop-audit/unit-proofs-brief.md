# Unit U34: the suppression sweep rule and the plugin proofs

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, sandbox workspace-write, main checkout, sole
serial writer from a clean committed baseline (U2's plugin is already landed and committed). You
perform the assignment directly and spawn nothing.

## Objective

Two proofs land in this unit:

1. The policy sweep gains the `'suppression'` rule: no source, test, config, or script file
   carries an `eslint-disable*` or `oxlint-disable*` directive.
2. `tests/config.test.ts` gains the plugin proofs: RuleTester valid/invalid cases per authored
   rule, plus one real-binary wiring proof that the repository's actual `.oxlintrc.json` loads the
   plugin and enables every configured rule.

## Context — read before writing

- `AGENTS.md` non-negotiables bind; `.claude/rules/tests.md` (test contract, probes, adequacy),
  `.claude/rules/architecture.md` § What the policy sweep proves (the suppression row is already
  written — you are implementing it), `.claude/rules/workspace.md` § Tooling (the two instruments
  and their assignment rule).
- Read the existing idiom first-hand: `tests/setupPolicy.ts` (PolicyRule, PolicyControl,
  POLICY_CONTROLS, inspectPolicyWorkspace, inspectPolicyControl), `tests/policy.test.ts` (the
  control loops — new POLICY_CONTROLS entries register automatically), and `tests/config.test.ts`
  (its existing describe blocks, import style, and `createScratch` usage).
- The plugin under proof: `configs/policy.ts` (committed by the previous unit). Its contract, fixed:
  default export `{ meta: { name: 'policy' }, rules: { 'no-mocking', 'no-keyword-privacy' } }`;
  named exports `MOCKING_RULE` and `PRIVACY_RULE`; messageIds `mock`, `spy`, `clock`, `stub` on
  no-mocking and `keyword` on no-keyword-privacy. `.oxlintrc.json` enables both at error plus
  `typescript/parameter-properties` and (if present in the config — read it; the previous unit may
  have removed it on a deviation) `typescript/explicit-member-accessibility` with `no-public`.
- RuleTester comes from `oxlint/plugins-dev` (an export of the installed oxlint devDependency; no
  new packages). It is the vendor's own harness driving the real rule — not a mock.
- Skill: none.
- Environment: linux; repo /home/user/scaffold; network DENIED in your sandbox; `tmp/` git-ignored
  and expected dirty; `.git` mounted read-only — no git command that takes the index lock;
  read-only `git diff`/`status` fine.

## Design constraints, fixed

**Suppression rule (`tests/setupPolicy.ts`):**

- `PolicyRule` gains `'suppression'`.
- The scanned population is an exported constant beside the other globs, covering
  `{src,app,tests,configs,scripts}/**/*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}` plus root
  `*.{cjs,cts,js,mjs,mts,ts}`.
- The scan reports any occurrence of an `eslint-disable` or `oxlint-disable` token (including the
  `-next-line` and `-line` forms — substring match on the base tokens covers them).
- **The instrument must not report itself.** The needle regex and every fixture/control string
  containing a directive must be composed from parts (for example `'oxlint' + '-disable'`) so the
  scanning pattern never matches its own definition or its controls' definitions. One comment at
  the composition site states this constraint — that is a fact the code cannot show.
- Fold the scan into `inspectPolicyWorkspace` so the existing repository-policy test enforces it,
  and export the scan function itself per the centralized-export law.
- Add at least one `POLICY_CONTROLS` entry (rule `'suppression'`, `membership` stated) whose
  fixture file carries a composed directive; the existing `instrument negative controls` loop in
  `tests/policy.test.ts` registers it automatically. Add a second physical control proving the
  boundary: a directive in a file OUTSIDE the scanned population (for example `guides/sample.md`)
  reports nothing.
- `inspectPolicyControl` currently routes `'skill'` to the family sweep and everything else to
  `inspectPolicyWorkspace`; confirm the new rule reaches the scan through that route and adjust the
  routing only if the control cannot otherwise fire.

**Plugin proofs (`tests/config.test.ts`):**

- One new describe block for the policy plugin. Follow the file's existing import and helper idiom
  exactly (read how it imports configs leaves and `createScratch`).
- RuleTester cases: for `MOCKING_RULE`, at least one invalid case per messageId (`mock`, `spy`,
  `clock`, `stub` — e.g. `vi.mock('./x')`, `jest.fn()`, `vi.useFakeTimers()`, `vi.stubEnv('A','1')`,
  including one computed-access spelling `vi['mock']('./x')`) and valid cases proving the
  boundary: `createRecorder()` calls, a member named `mock` on a non-vi object
  (`registry.mock('./x')`), and `vi.clearAllMocks()`-style members outside the banned set. For
  `PRIVACY_RULE`: invalid `private` and `protected` members (method and property), valid `#` fields
  and unannotated members.
- Label every invalid case's `it` (or the tester's case labels, matching how RuleTester reports)
  so the block's labels carry `[membership: …]` in the surrounding `it`/`describe` titles, matching
  `tests/policy.test.ts`'s control-label form.
- Assert on rule ids and messageIds only, never on message text.
- The real-binary wiring proof: build a `createScratch` fixture tree carrying one violation per
  configured rule (the two policy rules and each enabled built-in), run the installed
  `node_modules/.bin/oxlint` with `--config <repo>/.oxlintrc.json` over it via a spawned process,
  and assert every expected rule id appears in the output. Then run the same binary over a clean
  fixture and assert zero findings. The negative control is what proves a silently no-op config
  cannot pass. Note: the jsPlugins specifier `./configs/policy.ts` resolves relative to the config
  file, so the repo's real plugin loads whatever directory the fixture lives in.
- The fixture and case strings contain banned member spellings as STRING content — that is safe for
  the plugin (it reads member expressions) — but never write a literal disable directive in this
  file; compose any needed directive text from parts as above.
- Size the spawn's timeout from a contended full-suite run, not an isolated one, per
  `.claude/rules/tests.md` § Expensive proofs.

## Unknowns

- Whether RuleTester's reported case naming surfaces per-case labels in Vitest output; if it does
  not, carry the `[membership: …]` label on the wrapping `it` blocks. Settle by running.
- Whether `.oxlintrc.json` still carries `explicit-member-accessibility` after the previous unit's
  deviation handling — read the config and prove exactly what it enables, no more.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`.
- Off-limits: everything else, including `configs/policy.ts`, `.oxlintrc.json`,
  `src/`, `guides/`, `package.json`, `.claude/`, `.orkestrel/`.
- Validation allowed: `npm run test:policy`, `npm run test:config`, `npm run lint:check`,
  `npm run format:check`, `npm run check` (read-only variants only), throwaway fixtures under
  `tmp/`. No `--fix`, no mutating `format`, no `build`, no full `npm test`, no git writes, no
  installs.

## Execution

Perform the assignment directly. Spawn nothing.

## Output — the report, nothing else

1. `git status --porcelain` and the full `git diff` of the three owned files.
2. Exit-code truth with test counts for `npm run test:policy` and `npm run test:config`, and exit
   codes for `npm run lint:check`, `npm run format:check`, `npm run check`.
3. The proof that each new assertion can fail: for the suppression rule, the control firing; for
   the wiring proof, the clean-fixture zero and the violation-fixture rule-id list from the actual
   spawned output.
4. Deviation findings, or `none`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when:
the plugin's exports differ from the fixed contract above, RuleTester cannot drive a plain-object
rule, the wiring spawn cannot fire the plugin rules, or a gate reports failures your change did not
introduce. Fixture wording, case counts beyond the stated minimums, and helper naming are yours to
decide under the rules, record, and carry on.

## Acceptance criteria

- `npm run test:policy` and `npm run test:config` exit 0 with their counts reported.
- The suppression control fires; the out-of-population control does not; the repository sweep
  (`inspectPolicyWorkspace(process.cwd())`) returns `[]`.
- The wiring proof asserts every rule id `.oxlintrc.json` actually enables from the plugin and the
  new built-ins, and zero findings on the clean fixture.
- Every new assertion is keyed on rule ids or messageIds, never message text; no literal disable
  directive appears anywhere in the three files.
- `npm run lint:check`, `npm run format:check`, and `npm run check` exit 0 tree-wide.

## Review evidence

The diff and status in Output 1; an independent Opus design-fit audit follows in a later unit.
