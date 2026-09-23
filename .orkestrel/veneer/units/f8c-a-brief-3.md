# Unit F8c-A READERS, round 3 — the fix round over the F8c-A audit

Successor to `tmp/units/f8c-a-brief.md` and `f8c-a-brief-2.md`. What changed and why: the audit
round (`tmp/units/f8c-a-audit-analyst-verdict.md`, `FAIL 1, 3, 4, 5, 7, 10`;
`f8c-a-audit-reviewer-verdict.md`, `FAIL 2, 3, 4, 9, 10; outside the claims: F1 to F4`, with
referrals R1 to R7) found defects and prose faults in the unit's files, and the Orchestrator ruled
D23 on the names and the teardown. The Orchestrator has run `scaffold repair --groups configs`, so
the root `vite.config.ts` registers the `service` project and `npm run test:config` and
`npm run test:policy` are green at the checkpoint. The original briefs stay in place unedited.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8b`, a git worktree on branch `unit/f8b` at the checkpoint `5099318` (F8c-A as
returned plus the regenerated root configuration). Perform the assignment directly and spawn
nothing. Use absolute paths under `/home/user/veneer-f8b` for every command and file, and run
every npm and npx command from `/home/user/veneer-f8b`; your shell may start elsewhere. Do not
commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`,
or `git checkout-index`; undo a transient plant by the exact reverse edit.

## Objective

Every finding listed under § Carried findings is closed in the owned files, each proof change goes
red under its named mutation and green after the exact reverse edit, and the gates in § Acceptance
criteria are green.

## Context

**Design.** `tmp/units/f8c-design-verdict.md` (rulings 1 to 3 bind), amended by D23 below. Law:
`/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,workspace,typescript,names,architecture,patterns,writing}.md`.
Skill: none. Guide: `guides/veneer.md` § Tailwind (read only; F8c-B owns its prose).

**D23 (the Orchestrator's ruling, amending rulings 1 and 3).** `StageManager.properties(css)` is
renamed `expand(css)`: a method is a verb, and `expand` states what it does (expands each rule's
declarations to the longhand names Chromium assigns). `SheetReader.properties` is renamed
`variables`: the reading is custom properties alone, and `properties` already names any property
in `SheetDeclaration.property`, `StageRule.properties`, and the `read(selector, properties?)`
parameter, which keep their names. `StageManager` composes `createTeardown()` from
`@orkestrel/test` for its release order: `open` registers each release (the scratch, the browser)
as it acquires it, `destroy` runs the list and empties it, so `destroy` after a failed `open`
releases what was acquired and `destroy` on a never-opened stage is a no-op; `connected` stays a
derived getter.

**Evidence.** The verdicts cite by line at the checkpoint: `tests/setupServer.ts` `SheetReader`
around line 1392 (`#collect` around 1561, `#framed` around 1588, `#layer` around 1571),
`readBuiltCascade` around 1157; `tests/setupService.ts` `Readiness` around 24, `CASCADE_PATH` 42,
`resolveBrowserExecutable` 130, `verifyReadiness` 161, `compileProfile` 202, `StageManager` 221,
the `stage` TSDoc around 423; `tests/setupService.test.ts` `READY` at 28, the first-refusal case
around 55, the floor case around 91, the lifecycle case around 215, the failed-open case around
278; `tests/setupStyles.test.ts` the `NEUTRAL_MARKUP` case around 777; `tests/setupStyles.ts`
`MANDATED_TAG_PAIRS` around 2399, the long TSDoc line around 1026. `configs/browsers.ts`
`resolveBrowser` (around line 289) returns `{ launchOptions: { executablePath } }`,
`{ launchOptions: { channel } }`, or `{ connectOptions: { wsEndpoint } }`, and a verified system
channel is what `StageManager.open` and `recordButtonOracle` launch. `createTeardown():
TeardownInterface` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts` around line 192 and
718: `count`, `add(handler)`, `destroy()` in reverse registration order). Locate every site by its
symbol; the line numbers are approximate.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` built. Sibling
units and gate chains share the container (load 2 to 10): a timeout is a timing reading you
report. `prettier` must never run; `oxfmt` is the formatter.

**Standing conditions.** `npm run test:service` reports no test files until F8c-B writes
`tests/service/**`; that reading is expected and is not a gate here. `tests/tailwind/**` and
`tests/setupBrowser.ts` consume none of the renamed members. Readiness runs at import in the
`setup` project and writes `tmp/tailwind/candidates.txt`; the wrapper still writes the same file
(transitional, F8c-B).

**Control identifiers.** none; name every test for what it proves.

## Unknowns

- Whether the mandated content-model pairs the neutral markup relies on are all listed by
  `MANDATED_TAG_PAIRS`: read the content model of each tag the markup renders and settle the list,
  reporting each pair added.
- Whether the dynamic compiler import needs one shared loader for the readiness gate and
  `compileProfile`: settle it (one exported leaf, tested, is the expected shape), reporting the name.

## Carried findings

1. **Analyst 1; reviewer R4.** `SheetReader.declarations` drops a declaration nested inside a
   conditional block (`@layer components { .card { @media (width > 0px) { color: red !important } } }`
   reads no declaration, and `collectImportantNames` misses it; the installed compiler emits that
   shape for `container`). Walk declarations in source order, resolve each one's enclosing selector
   (the nearest style-rule ancestor) and layer (the nearest layer ancestor), and keep the keyframe
   exclusion. `#framed` excludes only unprefixed keyframes: `@-webkit-keyframes spin { from { … } }`
   reports `from` as a selector; extend the exclusion to vendor-prefixed keyframes. Regression
   cases: a declaration under `@media` inside a style rule inside `@layer` read with its layer,
   selector, and importance; a prefixed keyframe step excluded from `selectors`; a `@keyframes`
   block present in the `declarations`, `layers`, and `collectImportantNames` cases so deleting the
   guard in either reading reddens a case. Mutations: the conditional walk reverted to direct
   children only; the prefixed exclusion dropped; the `#framed` guard removed from `declarations`
   and from `layers` (each reddens its named case).
2. **Analyst 5; reviewer 5.** The `NEUTRAL_MARKUP` case derives the required tags from the tag
   list the markup must cover rather than from the markup, so a removed `hr` reddens it, and checks
   each mandated relative so an `optgroup` outside a `select` reddens it; `MANDATED_TAG_PAIRS` gains
   the pairs the markup relies on (§ Unknowns). Mutations: `hr` removed from the markup; `optgroup`
   unwrapped from `select`.
3. **Analyst 7.** The `READY` fixture in `tests/setupService.test.ts` is consumed by several cases:
   export it from `tests/setupService.ts` under a `{QUALIFIER}_{NOUN}` name, frozen, with TSDoc, and
   add it to the inventory case.
4. **Reviewer F1, D23.** Rename `StageManager.properties(css)` to `expand(css)` and
   `SheetReader.properties` to `variables`, with their TSDoc, cases, case titles, and inventory rows.
5. **Reviewer F2.** Restructure `tests/setupService.test.ts`: one owned `StageManager` opened in
   `beforeAll`, cleared in `afterEach`, destroyed in `afterAll`; one case per behaviour (a loaded
   sheet over the cascade; the default snapshot without custom properties; the longhand reading
   with a nested rule and the page's own reading unchanged; `clear`; the second-open refusal); the
   failed-open `destroy` case and the never-opened `destroy` case on their own instances; the
   first-refusal case split into a pass case and an order case; the floor case under
   `describe('CANDIDATE_FLOOR')`. A mutation to `expand` reddens the `expand` case alone.
6. **Reviewer F3.** In `tests/setupService.ts`: name the conditions the gates check without a
   count; state that the leaf fixes the order of refusals rather than that the gates run cheapest
   first; give the floor refusal its real cause (the cascade or the class grammar lost a family);
   replace temporal `once` with `after`; rewrite the possessive code tokens; reword the `stage`
   remark as a convention (a proof file shares this instance; construct a `StageManager` only to
   read a cascade under another root). Reflow the long TSDoc line in `tests/setupStyles.ts`.
7. **Reviewer F4.** Declare `CASCADE_PATH` in `tests/setupServer.ts`, make `readBuiltCascade`
   default to `resolve(WORKSPACE_ROOT, CASCADE_PATH)`, import it in `tests/setupService.ts`, and
   move the inventory rows.
8. **Reviewer R1.** The browser gate passes what the stage launches: when `resolveBrowser` names an
   `executablePath`, the file must exist and the refusal names `npx playwright install chromium`;
   when it names a channel or a WebSocket endpoint, the gate passes with that name as its evidence
   (no launch). Cases drive each branch with literal provider options. Mutation: the channel
   branch refusing (its case reddens).
9. **Reviewer R2.** The compiler gate imports `@tailwindcss/postcss` dynamically inside the gather
   so a missing package produces the refusal naming `npm ci`, keeping the compiler's own error as
   the `cause`; the module-scope static import goes; `compileProfile` loads the compiler the same
   way (§ Unknowns). Cases: the refusal carries the cause; the loader resolves the installed
   plugin. Mutation: the loader swallowing the error (the cause case reddens).
10. **Reviewer R3.** `SheetReader`'s TSDoc states that a nested layer block reads by its written
    name (`inner`), while a statement places `outer.inner`; no code change.
11. **Reviewer R6, D23.** `StageManager` composes `createTeardown()` per D23; the failed-open and
    never-opened `destroy` cases prove the release order and the no-op.
12. **Observations, not obligations.** R5 (two writers of the candidate list until F8c-B); R7
    (the stage cases' launches beside the oracle's budget): measure `npm run test:setup` after the
    restructure and report its wall time and load.

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupService.ts`,
  `tests/setupService.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`.
- Off-limits: `vite.config.ts`, `package.json`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
  `tests/tailwind/**`, `tests/setup.css`, `tests/fixtures/**`, `configs/**`, `tests/config.test.ts`,
  `tests/policy.test.ts`, `tests/setupPolicy.ts`, `src/**`, `guides/**`, `ROADMAP.md`, every
  other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:policy`, `npm run test:config`,
`npm run test:setup`, and `npm run test:src:tailwind`, all from `/home/user/veneer-f8b`.

## Output

Write `/home/user/veneer-f8b/tmp/units/f8c-a-report-3.md` and return the same text: each carried
finding with what closed it, the mutation table (mutation, command, red reading, the case that
reddens, green after revert, SHA-256 before and after), the pairs added to `MANDATED_TAG_PAIRS`,
the compiler loader's name, the `test:setup` timing, the gate exits with counts, `git status
--porcelain`, `git diff 5099318 --stat`, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any verdict ruling or D23 the tree
contradicts. Settle yourself: the fixture's and the loader's names within `names.md`, the case
titles, the TSDoc wording, the order of the restructured cases.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:policy` and `npm run test:config` exit 0.
3. `npm run test:setup` exits 0 with every case § Carried findings names present.
4. `npm run test:src:tailwind` exits 0.
5. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** The `test:setup` timing; the `test:service` no-files reading; any
timeout under load.

## Review evidence

The report and the diff of every owned file against `5099318`.
