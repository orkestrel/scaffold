# Unit F8c-B MOVE, round 2 — the fix round over the F8c-B audit

Successor to `tmp/units/f8c-b-brief.md`. What changed and why: the audit round
(`tmp/units/f8c-b-audit-analyst-verdict.md`, `FAIL 1, 2, 11`; `f8c-b-audit-reviewer-verdict.md`,
`FAIL 4, 5, 6, 7, 9, 11`, referrals R1 to R4; reconciled in `f8c-b-audit-verdict.md`) found prose
defects and extraction defects in the unit's files, and the Orchestrator ruled D25 (the
import-placement sentence), D27 (the document-order reading's stated limit), and carries deviation 3
(the `collectInlineSources` TSDoc) into this round. The original brief stays in place unedited; its
Objective, Context, Scope, Execution, Output, and Deviation contract bind here except where this
brief states otherwise.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8b`, a git worktree on branch `unit/f8b` at the checkpoint `b9c0b0a` with the
round-1 writes uncommitted in the tree (the state the audit ruled on). Perform the assignment
directly and spawn nothing. Use absolute paths under `/home/user/veneer-f8b` for every command and
file, and run every npm and npx command from `/home/user/veneer-f8b`; your shell may start
elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`, `git stash`, `git
reset`, `git clean`, or `git checkout-index`; undo a transient plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red under
its named mutation and green after the exact reverse edit, and the gates in § Acceptance criteria
are green.

## Context

**Evidence.** The verdicts cite by line at the round-1 tree: `guides/veneer.md` around lines 240
(the § Files `tests/setupService.ts` row), 311 to 318 (the import-placement paragraph), 382 to 384
(the important-branch sentence), 628 to 648 (§ Scripts); `tests/service/tailwind/consumer.test.ts`
around lines 23 to 24 (`INSTRUMENT_PATH` and the consumer path), 61 (the guide read), 178 (the
important plant), 203 to 219 (the important-branch comparison and its comment);
`profiles.test.ts` around lines 26 to 27, 40 (the order case), 163 to 167; `preflight.test.ts`
around lines 23 and 139; `tests/setupServer.ts` around line 1678 (`collectInlineSources`'s `@param
source` TSDoc naming a `?raw` import); `tests/setupStyles.ts` declares `VENEER_GUIDE_PATH` and is
loaded by browser projects, so a `node:fs` loader cannot live there; `tests/setupServer.ts` is the
Node home (`readBuiltCascade` is the pattern). Locate every site by its symbol; the line numbers
are approximate.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,workspace,typescript,names,architecture,patterns,documentation,writing}.md`.
Skill: none. Guide: `guides/veneer.md` § Tailwind, § Files, § Scripts (owned).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/{core,browser,server}/index.d.ts`),
`@orkestrel/guide`, `@orkestrel/markdown`: read the surface before declaring a helper; a helper whose
job an installed export does is a defect.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed. Sibling units and gate chains
share the container (load 2 to 6): a timeout is a timing reading you report. `prettier` must never
run; `oxfmt` is the formatter.

**Measurements.** Taken by the Orchestrator: `scanForbiddenSource` reads import specifiers
(`extractSpecifiers`, `tests/setupServer.ts` around line 801), so string literals never trip it;
`grep -rn "candidates.txt\|CANDIDATES_PATH" tests configs src app` returns `tests/setupService.ts`,
its proof, `tests/setup.css:13`, `tests/fixtures/tailwind/preflight.css:5`, and
`unexcluded.css:7` (the last three are `@source` read directives); the `probe` MCP server is
registered but unapproved in this session, so the `prove` tool is unavailable.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** `npm run test:service` runs the three service proofs (17 cases) after
`npm run build:src:styles`; the conformance case is green with the D24 exemption in place;
`tests/setupServer.ts` is owned here for deviation 3 and finding 6 alone.

## Unknowns

- The names of the exported fixture-path constants and the guide loader (finding 6): settle them
  within `names.md` (`{QUALIFIER}_{NOUN}` for constants, `read{Noun}` for a loader that obtains text
  from a file) and report them.

## Carried findings

1. **Reviewer 4(a).** In `guides/veneer.md` the important-branch sentence claims the important
   declaration is what the element resolves for every property Tailwind's rule declares; Tailwind's
   `.col-1` declares `grid-column-start` and `grid-column-end`, the plant declares only the first.
   Rewrite the sentence to what the proof measures: with the exclusion line dropped and Tailwind's
   own rule on the page, the element resolves what the cascade alone resolves for every property
   that rule declares. Reword the comment at the comparison in `consumer.test.ts` the same way.
2. **Reviewer 4(b).** The § Files `tests/setupService.ts` row nests a closed list inside a relative
   clause. Use the colon grammar of the `tests/setupServer.ts` row: the service setup; the readiness
   that verifies the compiler, the built cascade, the pinned browser, and the candidate list; the
   profile compiler; and the stage that reads what a page resolves.
3. **Reviewer 4, non-blocking.** § Scripts names one concept as "the publish chain" and "the
   `prepublishOnly` chain": use the second term in both places; give "Its readiness … before it"
   its referents (the service project's readiness, before `test:service`).
4. **Reviewer R1.** Take the executed mutation the comparison lacks: plant
   `@layer components { .col-1 { color: rgb(1, 2, 3) !important } }` in place of the
   `grid-column-start` plant, run `npm run test:service`, record that the important-branch
   comparison reddens (`grid-column-start` moves `auto` to `1` under the instrument while `col-1`
   stays in the branch), revert by the exact reverse edit, and record green with the file's SHA-256
   before and after. No source change unless the comparison fails to redden, in which case stop and
   report.
5. **D25 (reviewer R2).** In the import-placement paragraph of § Tailwind, keep the sentence stating
   the CSS syntax rule and cite it (CSS Cascading and Inheritance Level 5, § "Layer Ordering", and
   CSS Syntax Level 3, § "The `@import` rule": an `@import` rule is valid only ahead of every rule
   other than `@charset` and `@layer` statements), restate the Vite sentence as a consequence of that
   rule (a processor that follows the syntax drops a late import, and the cascade import is the one
   a consumer loses), and keep the closing clause that the recipes write their imports first so the
   rule holds whichever tool inlines them. Add no test.
6. **Reviewer R4.** Export the repeated fixture paths and the guide loader from the setup modules:
   the `consumer.css`, `preflight.css`, `unexcluded.css`, and `markup.html` paths as frozen
   constants in `tests/setupService.ts` (one home for the Tailwind fixtures, inventoried and proved
   to resolve to existing files), and one `read{Noun}` loader in `tests/setupServer.ts` that returns
   the guide's text through `VENEER_GUIDE_PATH` (inventoried and proved); route every repeat in the
   three service proofs through them.
7. **D27 (analyst 1).** State the document-order reading's limit where a reader meets it: in the
   profiles proof's order case comment (the order is the first placement of each layer across the
   linked cascade followed by the loaded profile; the sheet sequence is fixed by `stage.open` and
   `stage.load`, not observed) and in the guide's sentence on the order line under § Tailwind.
8. **Deviation 3 (round 1).** In `tests/setupServer.ts`, the `collectInlineSources` `@param source`
   TSDoc names a `?raw` import; reword it to a profile read from its file or the CSS fences of a
   guide holding a profile.
9. **Analyst 2.** No code change: the report's grep result was incomplete; the round-2 report states
   the complete result (the three `@source` read directives).

## Scope

**Owned.** `tests/service/tailwind/profiles.test.ts`, `consumer.test.ts`, `preflight.test.ts`;
`tests/setupService.ts` and `tests/setupService.test.ts`; `tests/setupServer.ts` and
`tests/setupServer.test.ts` (findings 6 and 8 alone); `guides/veneer.md` (§ Tailwind, § Files,
§ Scripts).

**Shared (report-only).** `ROADMAP.md` (return a patch if a fact moves); every other file a sibling
unit owns (none in this worktree).

**Off-limits.** `vite.config.ts`, `package.json`, `tests/conformance.test.ts`, `tests/setup.css`,
`tests/fixtures/**` (content), `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `configs/**`, `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, `src/**`, `app/**`, `guides/README.md`, every
other file, and the vendored files.

**What asserts the state this change ends.** The service proofs themselves (owned); the setup
inventories in `tests/setupService.test.ts` and `tests/setupServer.test.ts` (owned); `test:guides`
over the guide's links (run it); derived by running `npm run test:service`, `npm run test:setup`,
and `npm run test:guides`, bounded by a word-boundary grep for each new export name over `tests/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src` and `npm run build:src:styles`; no `git mv`; `git add -N` only to
render diff evidence; no `npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

Validate with scoped `npx oxfmt --config .oxfmtrc.json --write` over the owned files, then
`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`,
`npm run build:src:styles && npm run test:service`, `npm run test:setup`, `npm run test:conformance`,
and `npm run test:guides`, all from `/home/user/veneer-f8b`.

## Output

Write `/home/user/veneer-f8b/tmp/units/f8c-b-report-2.md` and return the same text: each carried
finding with what closed it; the export names settled; the R1 mutation table (plant, command, red
reading, the case that reddens, green after revert, SHA-256 before and after); the gate exits with
counts; `git status --porcelain`; `git diff b9c0b0a --stat`; and deviations per § Deviation
protocol in `/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on any file outside § Scope a gate names, on the R1 comparison failing to redden, and on
any ruling the tree contradicts. Decide, record, and carry on from the export names, the exact
wording within the sentences this brief prescribes, and the placement of the constants in the setup
module's sections.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:policy` and `npm run test:conformance` exit 0.
3. `npm run build:src:styles && npm run test:service` exits 0 with the three proof files collected.
4. `npm run test:setup` exits 0 with the new exports inventoried and proved.
5. `npm run test:guides` exits 0.
6. `git status --porcelain` lists the round-1 files plus the owned files this round touches, and
   nothing else.

**Observations, not criteria.** The `test:service` wall time; any timeout under load.

## Review evidence

The report and the diff of every owned file against `b9c0b0a`, untracked files as additions.
