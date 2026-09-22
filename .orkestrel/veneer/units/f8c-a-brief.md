# Unit F8c-A READERS — the compiled-sheet readers, the service readiness, and the stage

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8b`, a git worktree on branch `unit/f8b` at the checkpoint `d9c03a2` (F8b
SHARED-PREFLIGHT as returned; the F8b findings this unit carries are named below). Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-f8b` for every
command and file, and run every npm and npx command from `/home/user/veneer-f8b`; your shell may
start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`, `git stash`,
`git reset`, `git clean`, or `git checkout-index`.

## Objective

`tests/setupServer.ts` exports `SheetReader` and its helpers; `tests/setupService.ts` exists with
the readiness leaf and shell and the `StageManager` stage; `tests/setupService.test.ts` proves them;
`tests/setupStyles.ts` gains `NEUTRAL_MARKUP` and reroutes `collectFencedBlocks`; `package.json`
declares `test:service` and extends `prepublishOnly`; and every proof that exists today stays green.
This unit is additive: it deletes nothing a live proof consumes, so `npm run test:src:tailwind`
stays green throughout, and F8c-B MOVE (after the Orchestrator regenerates the root configuration)
does the moves and deletions.

## Context

**Design.** `tmp/units/f8c-design-verdict.md` (D19; rulings 1 to 3, 5, and 7 bind this unit; where
this brief and the verdict disagree, the verdict wins; where the verdict and the tree disagree,
stop and report). The proposals it reconciles are staged beside it
(`f8c-design-planner-proposal.md`, `f8c-design-analyst-proposal.md`); the verdict names what was
taken from each. The F8 design (`tmp/units/f8-design-verdict.md`) rulings 1 to 5 and 7 to 11 stand.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,workspace,typescript,names,architecture,patterns,writing}.md`.
Skill: none. Guide: `guides/veneer.md` § Tailwind (read; F8c-B owns its prose).

**Evidence.** `tests/setupServer.ts`: `SpecifierReader` (around line 730) is the entity form to
match; the module imports `postcss`'s `parse` and `AtRule` (line 23), `createScratch` (line 15),
`chromium` (line 22), and `resolveBrowser`/`resolvePinnedBrowser` (line 24); `recordButtonOracle`
(around line 2251) is the Chromium precedent (launch options, scratch page, `page.goto`, `finally`);
`collectSelectorClasses` (around line 1328) and `walkSelector`/`readIdentifier` are the class-name
grammar to reuse, and `configs/src/vite.tailwind.config.ts` line 10 (`CASCADE_CLASS`) the copy to
retire in F8c-B. `tests/setupBrowser.ts`: `collectInlineSources` (around line 1661) with its
`InlineSource` type and cases in `tests/setupBrowser.test.ts` (move them; leave the browser copy in
place for F8c-B to delete, or re-export nothing — settle by leaving the browser copy untouched this
round). `tests/setupStyles.ts`: `collectFencedBlocks` (around line 1025), the section "The frozen
case tables and markup strings the style proofs drive their scenarios from" (around line 1118),
`VENEER_GUIDE_PATH`; `tests/tailwind/preflight.test.ts` lines 24 to 63 hold `NEUTRAL_MARKUP`.
`@orkestrel/guide` exports `extractFences(document)` (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts`
around line 795). `tests/setupServer.test.ts` already launches Chromium through
`recordButtonOracle` (around lines 396 and 445), so the `setup` project is where the stage's
lifecycle is proved. The probes: `tmp/units/f8c-probe-import.mjs` and `f8c-probe-profiles.mjs` with
their logs (the compile path and the profile compilations in Node). The scaffold `service` factory
(`/home/user/scaffold/src/core/templates.ts`, the `service` template): Node, `setupFiles:
['./tests/setup.ts', './tests/setupService.ts']`, 120000 ms budgets, `fileParallelism: false`.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` built. Sibling units
and gate chains share the container (load 5 to 40): a timeout is a timing reading you report.
`prettier` must never run; `oxfmt` is the formatter.

**Standing conditions.** After `tests/setupService.ts` exists and `test:service` is declared,
`npm run test:config` reddens on the missing `service` project until the Orchestrator runs
`scaffold repair --groups configs`; that red is expected and you report its exact case name. Never
edit `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, or
`configs/**`. `tests/setup.css`'s `@source` names `../tmp/tailwind/candidates.txt`; readiness writes
that file.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

- Whether `SheetReader` collides with a hosted `## Surface` name: run `npm run test:policy` as soon
  as the export exists; on a collision, stop and report the claimant.
- The `test:setup` cost of readiness: measure `npm run test:setup` wall time before and after and
  report both.

## Obligations

1. **`SheetReader`** in `tests/setupServer.ts` per ruling 1: the class, `SheetLayer`, and
   `SheetDeclaration` contracts (declared in the same module, the tree's convention), TSDoc in the
   file's voice, `#` fields, lazy derivation from one parse, no `as`, no `!`, no nested functions.
   Helpers beside it: `collectSharedNames(names, others)`, `collectImportantNames(reader)`, and
   `collectInlineSources(source)` with `InlineSource` (moved from `tests/setupBrowser.ts`; the
   browser copy stays until F8c-B). Cases in `tests/setupServer.test.ts`, each over a literal
   stylesheet: `statement` (a leading comment, an empty sheet, a leading style rule, a leading
   `properties` statement); `order` (repeated statements, block declarations, a cascade before a
   profile); `layers` (the relabelled-`theme` plant empties the layer's reading while `properties`
   still finds each variable); `names` (adjacent classes, escapes, functional selectors, an
   attribute string's contents refused); `selectors` (nested media, a keyframe control excluded);
   `properties` (an `@property` registration is not a declaration); `declarations` (important
   versus normal); `collectSharedNames` (disjoint, empty, repeated, overlapping);
   `collectImportantNames` (one name important in one rule and normal in another);
   `collectInlineSources` (its moved cases, refusal included). Add each export to the inventory case.
2. **Readiness** in `tests/setupService.ts` per ruling 2: `Readiness`, `scanReadiness`,
   `verifyReadiness`, the top-level `await verifyReadiness()`, the candidate derivation through
   `new SheetReader(cascade).names` with the floor (`container`, `table`, `col-1`, `caption-top`,
   `caption-bottom`), written to `tmp/tailwind/candidates.txt`, sorted, one name per line. Cases in
   `tests/setupService.test.ts`: every refusal sentence and the gate order driven with literal
   `Readiness` values; the real gates green; the sentence a missing cascade produces (through a
   scratch root, never by deleting `dist/`); the floor's refusal on a cascade missing one member.
3. **The stage** per ruling 3: `StageManager` and `stage`, `compileProfile(path)`. Cases in
   `tests/setupService.test.ts`: `compileProfile` over a two-line recipe written to a scratch path
   (emits a known utility) and a refusal on an unresolvable import; the stage's lifecycle with a
   real launch (`open`, a `mount` and a `load`, `read` returning the loaded declaration's resolved
   value, `properties` returning the longhands Chromium assigns an authored `border: 0 solid`,
   `clear` emptying what the case loaded, `destroy` after `open` and after a failed `open`).
4. **`tests/setupStyles.ts`**: `NEUTRAL_MARKUP` moved into the case-table section, exported,
   inventoried, imported by `tests/tailwind/preflight.test.ts` in place of its local declaration;
   `collectFencedBlocks` rerouted through `extractFences(createMarkdown(source).document)` with its
   TSDoc's reason kept and one case added for a fence nested in a list.
5. **`package.json`**: add `"test:service": "vitest run --config vite.config.ts --no-cache
   --reporter=dot --project service"` beside the other `test:*` scripts and append
   `&& npm run test:service` to `prepublishOnly` after `npm run test:distribution -- --mode release`.
   Keep `test:src:tailwind` and its `test:src` clause (F8c-B removes them).
6. **Mutations**, each applied transiently, run, recorded, and reverted by the exact reverse edit:
   `SheetReader.order` collecting blocks only (the order case reddens); a nested rule omitted from
   `selectors` (the nested-media case); an escaped class dropped from `names`; a normal declaration
   classified important; malformed inline syntax accepted silently; the readiness gates reordered
   (the first-refusal case); one refusal sentence changed; `compileProfile` given an unresolvable
   import expecting success (the refusal case).

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupService.ts`,
  `tests/setupService.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
  `tests/tailwind/preflight.test.ts` (the `NEUTRAL_MARKUP` import only), `package.json` (the two
  script lines only).
- Off-limits: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, the other `tests/tailwind/**`
  files, `tests/setup.css`, `tests/fixtures/**`, `configs/**`, `vite.config.ts`,
  `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `src/**`, `guides/**`,
  `ROADMAP.md`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:policy`, `npm run test:setup`,
`npm run test:src:tailwind`, and `npm run test:config` (expected red on the missing project), all
from `/home/user/veneer-f8b`.

## Output

Write `/home/user/veneer-f8b/tmp/units/f8c-a-report.md` and return the same text: the export set
with its proofs, the mutation table (mutation, reading, the case that reddens), the two
`test:setup` timings, the gate exits with counts and the exact `test:config` red, `git status
--porcelain`, `git diff d9c03a2 --stat`, and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, on a `SheetReader` collision, and on any
verdict ruling the tree contradicts. Settle yourself: member and case names within `names.md`, the
TSDoc wording, the scratch fixtures' content, the stage's private field names.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy` exit 0.
2. `npm run test:setup` exits 0 with the `SheetReader`, readiness, stage, and `NEUTRAL_MARKUP`
   cases present.
3. `npm run test:src:tailwind` exits 0.
4. `npm run test:config` reports the missing `service` project as its only red.
5. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** The `test:setup` timings; any timeout under load.

## Review evidence

The report and the diff of every owned file against `d9c03a2`.
