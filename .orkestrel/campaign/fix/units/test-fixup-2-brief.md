# Unit test-fixup-2 — close the test unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The three survivors the audit found in `@orkestrel/test` are corrected and a full old-name sweep
over `src`, `tests`, and `guides` returns only CSS value syntax and DOM property references.

## Context

**Findings, each with its ruling** (from the objective lane's verdict on the test unit):

1. `/home/user/fleet/test/src/browser/helpers.ts:1474` — the `findRule` remarks read "on `style`
   where the subject is the rendered result"; `style` names no export. Replace the backticked
   `style` with `readStyle`.
2. `/home/user/fleet/test/guides/test.md:456` — "`states` and `paths` hand out snapshots" names a
   `PortfolioInterface` member that is now `placements` (the guide's own Types row at `:214`
   already reads `{ variant, placements, paths, files }`). Replace `` `states` `` with
   `` `placements` `` in that sentence. `PortfolioOptions.states` elsewhere is the input registry
   and stays.
3. `/home/user/fleet/test/tests/src/browser/helpers.test.ts:55` — `parseCSSColor` sits in the
   slot `resolveColor` held, between `resolveAccessible` and `resolveRendered`. Move it to its
   case-insensitive sorted position after `parseColor` (`:30`), keeping every other specifier in
   place.
4. Re-run the sweep over `src`, `tests`, and `guides` for the whole old-name set — `style`,
   `token`, `rootToken`, `pixels`, `contrast`, `rgba`, `colorEqual`, `resolveColor`, and
   `states` — with word boundaries, including backticked and `{@link}` forms in prose. Report
   every remaining hit with its line and classify it: CSS value syntax (`rgba(`), the DOM
   `.style` property, `PortfolioOptions.states`, or a survivor. Correct any survivor.

**Law.** `AGENTS.md`; `.claude/rules/documentation.md` § Parity (a renamed interface member's
prose moves with it even though the parity test resolves only exports).

**Host.** Linux, bash. Repository `/home/user/fleet/test`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed.
Do not run `npm install`.

## Unknowns

none.

## Scope

**Owned.** `src/browser/helpers.ts`, `guides/test.md`, `tests/src/browser/helpers.test.ts`, and
any other file under `src/`, `tests/` (except the vendored policy pair), or `guides/test.md`
where step 4 finds a survivor.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the three edits, run
the sweep, correct any survivor, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the changed lines (before and after); the sweep command and every hit with its
classification; each gate command with its exit code and an excerpt for any failure;
`git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a sweep hit cannot be classified, or when a gate fails for a cause you cannot
attribute.

## Acceptance criteria

1. `rg -n '`style`|\{@link style\}' src guides` returns no hit; `rg -n '`states`' guides/test.md`
   returns only sentences about `PortfolioOptions.states`.
2. `parseCSSColor` follows `parseColor` in the named import list of
   `tests/src/browser/helpers.test.ts`.
3. The sweep report classifies every hit and names no survivor.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
