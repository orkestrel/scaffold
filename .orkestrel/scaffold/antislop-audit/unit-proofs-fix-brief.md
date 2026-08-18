# Unit U34-fix: close the three gate findings in the proofs unit

Successor to `tmp/unit-proofs-brief.md`. That unit's work stands: the suppression sweep, its
controls, the RuleTester cases, and the wiring test are landed and behaviorally correct
(`test:policy` 59/59 and `test:config` 25/25 pass in the Orchestrator's unconstrained environment —
the `spawnSync EPERM` you reported was your sandbox denying nested spawn from a Vitest worker, and
it will reproduce for you again; do not chase it). Three findings from the gates you could not run
remain, all in your same owned files.

## Role and engine

`sol` route — GPT-5.6 Sol implementer, journaled CLI, sandbox workspace-write, sole serial writer.
Perform directly; spawn nothing.

## The three findings

1. **`lint:check` red — `eslint(no-useless-concat)`** at `tests/setupPolicy.ts:177` and `:187`: the
   composed suppression tokens `'oxlint' + '-disable'` and `'eslint' + '-disable'`. Keep the
   self-match-avoidance property (the scanning pattern must never match its own definition — that
   constraint and its comment stay) but compose without literal-literal `+` concatenation, for
   example `['oxlint', '-disable'].join('')`. No disable directive, no rule-config change.
2. **`format:check` red** on `tests/config.test.ts`. Converge it with
   `node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/config.test.ts` (scoped to the
   owned file; never tree-wide).
3. **`check` red — TS2345** at `tests/config.test.ts:465` and `:500`: `PolicyRuleInterface` is not
   assignable to `RuleTester.run`'s `Rule` parameter (`CreateRule | CreateOnceRule`; the reported
   missing `createOnce` means the `CreateRule` branch failed structurally first). Read the actual
   declarations in `node_modules/oxlint/dist/plugins-dev.d.ts` (`Rule`, `CreateRule`, the context
   and visitor and report-descriptor types) and make the call typecheck under the repository's
   strict settings with NO type assertion, NO `any`, NO suppression comment, and NO new dependency.
   The likely levers, in preference order:
   - widen the structural interfaces in `configs/policy.ts` (they are yours to change for this fix:
     ownership below) so the rule objects are genuinely assignable — for example a report
     descriptor whose `node` member is wide enough, and visitor/context members whose parameter
     types accept what oxlint actually passes;
   - if the visitor-key node parameter types are the blocker, accept the wider node shape and
     narrow inside the reporter with the existing field guards.
   Constraints that bound the fix: the plugin file keeps zero imports (type-only imports from
   `oxlint/plugins-dev` are FORBIDDEN in `configs/policy.ts` — the leaf law admits no import and
   `plugins-dev` exports only `RuleTester` anyway; a type-only import inside `tests/config.test.ts`
   is permitted if it helps, since tests already import RuleTester from there); the rules'
   observable behavior must not change (the RuleTester cases and the recorded fixture outputs pin
   it); `reportMocking`/`reportPrivacy` stay exported module-scope functions with the one-line
   visitor adapters.

## Context

- Baseline: commit 24a6eb7 plus U34's uncommitted edits to the three test files — read
  `git status`/`git diff` first; the working tree is the subject.
- Rules: AGENTS.md non-negotiables; `.claude/rules/typescript.md`; `.claude/rules/tests.md`.
- Environment: network denied; `.git` read-only (no index-locking commands); `tmp/` dirty.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
  `configs/policy.ts` (for finding 3 only — behavior-preserving type widening; its rule logic and
  messages are off-limits).
- Off-limits: everything else, `.oxlintrc.json` included.
- Validation allowed: `npm run check`, `npm run lint:check`, `npm run format:check`,
  `npm run test:policy` (all read-only or scoped as stated); the scoped oxfmt write above. Expect
  `npm run test:config` to fail ONLY on the sandbox `EPERM` in the spawn test; every other test in
  it must pass.

## Output

1. `git diff` of the owned files (the delta from the tree you found, not from the commit).
2. Exit codes: `npm run check`, `npm run lint:check`, `npm run format:check`,
   `npm run test:policy`, and `npm run test:config` (with the expected sandbox-EPERM failure named
   if it appears, and no other failure).
3. One line per finding: closed how.
4. Deviation findings, or `none`.

## Deviation contract

Stop and report if assignability cannot be reached without an assertion, an `any`, a suppression,
or an import into `configs/policy.ts`; or if closing finding 3 would change either rule's observable
behavior. Everything narrower — helper naming, which interface widens — is yours to decide and
record.

## Acceptance criteria

- `npm run check`, `npm run lint:check`, `npm run format:check` exit 0.
- `npm run test:policy` exits 0 with 59 passing.
- `npm run test:config` shows every test passing except (in your sandbox only) the spawn-EPERM
  wiring test.
- `configs/policy.ts` still has zero imports and unchanged rule behavior, messages, and exports.
