# Brief — unit guide-regex (the optional-method member reader in @orkestrel/guide)

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/guide`. Fully specified mechanical unit. Perform the assignment directly and spawn nothing.

## Objective

Make the two member readers in `src/core/helpers.ts` extract an optional method that carries a type-parameter list, so `\ttransaction?<R>(scope: DriverScope<R>): Promise<R>` yields `transaction`, with a failing-first test that names the defect.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/typescript.md`, `tests.md`, `writing.md`; the package guide `guides/guide.md`.

**Defect (database-subj-10, refuter CONFIRMED).** `extractMemberMethods` (`src/core/helpers.ts:1195`) and `extractExampleMethods` (`src/core/helpers.ts:1528`) match members with `/^\t(?:async )?\*?(\w+)(<.*>)?\??\(/`, which admits the optional marker only after the type-parameter list (`name<T>?(`), the reverse of TypeScript, so `transaction?<R>(` never matches and `source.methods('DriverInterface')` in a consumer omits it. The repair: `/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/` at both sites. `name(`, `name?(`, `name<T>(`, `async name(`, and `*name(` keep matching.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`. Never run `npm install`, `npm ci`, or anything that rewrites `node_modules` or the lockfile. Do not commit, stage, push, or run any discarding git command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`); undo an edit by editing.

**Measurements.** The gate chain is green at the committed tip (`git rev-parse --short HEAD`).

## Unknowns

Whether the TSDoc above either function, or `guides/guide.md`, states the `name(` shape in a way that now needs the optional-with-generics form named. Read both; where a sentence would become false, amend it in the same unit and record the site.

## Scope

**Owned.** `src/core/helpers.ts`; `tests/src/core/helpers.test.ts`; `guides/guide.md` only where a sentence about these two functions needs the amendment; `tests/guides.test.ts` only if a fence transcription of either function changes.

**Off-limits.** Everything else, including `package.json`, `package-lock.json`, `node_modules/**`, every vendored file, and every other checkout.

## Method

1. Read `extractMemberMethods` and `extractExampleMethods` and the existing tests for them in `tests/src/core/helpers.test.ts`.
2. Add, to each function's existing `describe` block, a test named for what it proves (an optional method with a type-parameter list is extracted) using body lines such as `'\ttransaction?<R>(scope: DriverScope<R>): Promise<R>'` beside an ordinary member, asserting the sorted names include `transaction`. Keep a case proving `name?(` and `name<T>(` still match.
3. Run `npm run test:src:core -- tests/src/core/helpers.test.ts` and record the exact failing count (the new tests must be red).
4. Apply the regex at both sites. Re-run the same command and record the passing count.
5. Run `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`; read each exit code.
6. Sweep `src/core/helpers.ts` for any other regex of the shape `(<.*>)?\??\(` and report each site; change none outside the two named without stopping and reporting first.

## Output

Write `/home/user/scaffold/tmp/units/guide-regex-report.md` with: the failing-first proof (command, failing count, passing count), the two diff hunks, each gate command with its exit code, the sweep result, and every deviation. Return the same content.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when the repair contradicts a rule, when a test outside the two functions goes red, or when a required edit falls outside Owned. Decide, record, and carry on from an ancillary question (the test case's name, its placement in the file).

## Acceptance criteria

1. The new test cases are collected and red before the regex change (recorded count) and green after it.
2. Both sites carry `/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/`.
3. `format:check`, `lint:check`, `check`, and `test:guides` exit 0.
4. The report names every touched file and the sweep result.
