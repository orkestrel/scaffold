# Unit F8d IMPORTANCE-LONGHANDS — the shared-name rule computed per longhand

## Role and engine

`opus` on Opus 5.5 (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8d`, a git worktree detached at `cdf7f55` (the session branch with F8c and
FLOATING landed; `node_modules` installed by the Orchestrator). The service proof drives Chromium,
which the bench sandbox denies, so this objective unit runs natively. Perform the assignment
directly and spawn nothing. Use absolute paths under `/home/user/veneer-f8d` for every command and
file, and run every npm and npx command from `/home/user/veneer-f8d`. Do not commit, push, install,
or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`; undo a plant by the exact reverse edit.

## Objective

`collectImportantNames` and the consumer proof's equality compute importance over the longhands
Tailwind's rule for each shared name declares, so that a shared name leaves the exclusion line only
where Veneer declares every one of those longhands with `!important`, and the equality case and
the branch case enforce that one rule with a failing-first proof.

## Context

**Evidence.** Read on 2026-09-23 at `cdf7f55` (line numbers approximate; locate each site by its
text): `tests/setupServer.ts` around line 1713, `collectImportantNames(reader: SheetReader)` returns
every class name of any selector with an important declaration, while its TSDoc (around lines 1700
to 1711) already states the per-longhand rule; `tests/setupService.ts` around lines 59 to 64
(`StageRule { selector; properties }`) and around line 457 (`StageManager.expand(css)` parses a
sheet in the page and returns each style rule's selector and `Array.from(rule.style)`);
`tests/service/tailwind/consumer.test.ts` around lines 115 to 138 (the equality case "derives the
shared class names, and mounts an element for every one of them": `important =
collectImportantNames(cascade)` and `expect([...excluded].sort()).toEqual(shared.filter((name) =>
!important.includes(name)).sort())`), around lines 170 to 216 (the branch case "keeps an important
shared declaration whatever the recipe withholds": the plant `.col-1 { grid-column-start: 5
!important }`, `branch = shared.filter((name) => important.includes(name))`, the longhands read from
`stage.expand(instrumentProfile)` filtered by `collectSelectorClasses`); `guides/veneer.md` § Tailwind
around lines 386 to 391 (the rule stated per longhand) and 402 to 412 (the equality paragraph, whose
sentence "The importance branch runs over the names Veneer declares important on some longhand"
states the old semantics); `tests/setupServer.test.ts` and `tests/setupService.test.ts` (the
export-name inventories and the proofs of `collectImportantNames` and `expand`; locate by name).
Tailwind's `.col-1` rule declares `grid-column: span 1 / span 1`, which Chromium expands to
`grid-column-start` and `grid-column-end`, so the present plant covers one of the two longhands.

**Design (fixed).**

- `StageRule` gains `readonly important: readonly string[]`, the longhand names whose priority is
  `important` (`rule.style.getPropertyPriority(name) === 'important'` for each name of
  `Array.from(rule.style)`), and `expand` fills it.
- `tests/setupServer.ts` exports `collectRuleLonghands(rules: readonly StageRule[], names: readonly
  string[]): ReadonlyMap<string, readonly string[]>`, the union, per name, of the properties of
  every rule whose selector's classes (`collectSelectorClasses`) include the name, in first-seen
  order (a pure leaf; `StageRule` is imported as a type from `./setupService.js` only if that
  import direction is already used, otherwise declare the rule shape it needs as a readonly
  interface in `tests/setupServer.ts` and have `StageRule` satisfy it structurally: settle this from
  the existing import graph and report it).
- `collectImportantNames(rules: readonly StageRule[], longhands: ReadonlyMap<string, readonly
  string[]>): readonly string[]` returns each name of `longhands` whose every longhand is in the
  union of `important` over the rules whose selector's classes include the name, in the map's
  order; a name whose importance covers only some of its longhands is not returned. Its TSDoc
  keeps the rule statement and names the two inputs.
- The equality case reads `longhands = collectRuleLonghands(await stage.expand(instrumentProfile),
  shared)` and `important = collectImportantNames(await stage.expand(readBuiltCascade()),
  longhands)`; the branch case plants importance on every longhand Tailwind declares for `col-1`
  (`.col-1 { grid-column-start: 5 !important; grid-column-end: 5 !important }`, or the shorthand
  with `!important`, whichever expands to both; report which) and computes `important` the same
  way over the planted cascade; a new case "keeps a shared name on the line while its importance
  covers only some of the longhands Tailwind declares" plants `.col-1 { grid-column-start: 5
  !important }` alone and asserts `col-1` is not in `collectImportantNames`'s result and stays
  among the excluded names the equality holds.

**Failing-first proof.** Write the new case and the changed equality against the old
implementation first: record the command and the red count (the old per-name reading returns
`col-1` under the one-longhand plant); implement; record the same command green. Mutation for the
new function: an implementation that ignores `longhands` (returns per name) reddens the new case;
record it as a plant with its exact reverse edit.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,patterns,documentation,writing}.md`;
D24 and D27 in `/home/user/veneer-f8d/tmp/units/decisions-round-2.md`;
`/home/user/veneer-f8d/tmp/units/f8-design-verdict.md` and `f8c-design-verdict.md`. Skill: none.
Guide: `guides/veneer.md` § Tailwind (owned: the importance sentences) and § Files (the
`tests/setupServer.ts` and `tests/setupService.ts` rows, where a new export changes them).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/{core,server}/index.d.ts`):
read the surface before declaring a helper; a helper whose job an installed export does is a
defect.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Sibling units and a gate chain share the container: a
timeout is a timing reading you report. `prettier` must never run; `oxfmt` is the formatter. The
service proofs need `npm run build:src:styles` first.

**Measurements.** `npm run build:src:styles && npm run test:service` exits 0 at `cdf7f55` (the
landing chain of 2026-09-23 04:43 UTC); `npm run test:setup` exits 0.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** none.

## Unknowns

- The import direction between `tests/setupServer.ts` and `tests/setupService.ts` for the
  `StageRule` type: settle from the existing imports and report.
- Whether Chromium reports `getPropertyPriority` per expanded longhand for a shorthand written with
  `!important`: measure in the `expand` proof and report.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupService.ts`,
`tests/setupService.test.ts`, `tests/service/tailwind/consumer.test.ts`, `guides/veneer.md`
(§ Tailwind's importance sentences and the § Files rows named under Law).

**Shared (report-only).** `ROADMAP.md` (return the F8d row's closing text).

**Off-limits.** `tests/setup.css`, `tests/fixtures/**`, `tests/service/tailwind/profiles.test.ts`,
`preflight.test.ts`, `src/**`, `app/**`, `configs/**`, `package.json`, `package-lock.json`, the
vendored files, and every other file.

**What asserts the state this change ends.** The consumer proof, the setup inventories and proofs
(`npm run test:setup`), and `npm run test:guides`; derived by running them, bounded by a
word-boundary grep for `collectImportantNames` and `collectRuleLonghands` over `tests/` and
`guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src` and `npm run build:src:styles`; no `npm install`; no git
command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --write` over the owned files, then
`npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files, `npm run
check`, `npm run test:setup`, `npm run build:src:styles && npm run test:service`, and `npm run
test:guides`, all from `/home/user/veneer-f8d`.

## Output

Write `/home/user/veneer-f8d/tmp/units/f8d-report.md` and return the same text: the Unknowns'
answers; each change with its site; the failing-first record (command, red count, green count) and
the mutation record; the gate exits with counts; the ROADMAP closing text; `git status
--porcelain`; `git diff cdf7f55 --stat`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on any file outside § Scope a gate names, on the new case failing to redden against
the old implementation, and on any ruling the tree contradicts. Decide, record, and carry on from
the helper's exact name within the `{verb}{Noun}` form, the case titles, and the sentences' wording
within the rule this brief fixes.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the new export inventoried and proved.
3. `npm run build:src:styles && npm run test:service` exits 0 with the consumer proof's cases, the
   new case included.
4. `npm run test:guides` exits 0.
5. The failing-first record shows the new case red against the old implementation and green after.
6. `git status --porcelain` lists the owned files and nothing else.

**Observations, not criteria.** The `test:service` wall time; any timeout under load.

## Review evidence

The report and the diff of every owned file against `cdf7f55`.
