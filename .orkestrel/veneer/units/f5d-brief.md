# Unit F5d PHYSICAL — the cascade reverts to Bootstrap's physical properties (D11)

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at `/home/user/veneer`, from the
commit that follows the F5a landing (F9 re-pinned `@orkestrel/test` to 0.0.20 on top of it) on a
clean tracked tree (the launch prompt names the commit). Perform the
assignment directly and spawn nothing. Do not commit, push, install a dependency, or run a
destructive command. Do not run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean`. The Orchestrator lands the work.

## Objective

Every declaration the cascade writes as a logical property becomes the physical property Bootstrap
5.3.8 writes for the same rule, every proof reads that physical property, the direction machinery
that policed logical-only declarations is gone, and the guide says the cascade is physical. The
user ruled this on 2026-09-22 (D11: "revert to bootstrap").

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** The measurements live in
`./tmp/units/f5d-terrain.md` (the logical declarations per file and per property name in
`src/styles/**`, the proofs that read them, the direction machinery's exports and their one
outside consumer, and the guide sentences), and the oracle inventory
`tests/fixtures/oracle/inventory.json` records, per selector, the property names and values
Bootstrap writes (read it through `readOracleInventory` in `tests/setupServer.ts`, or parse
it directly in a probe). Read the terrain first. Where this brief and those records disagree, the
records and the tree win, and you stop and report the disagreement rather than resolving it. The
terrain's `tests/**` readings predate F5a's landing; re-take them at launch with the terrain's own
commands, because F5e returned the root setup modules to the fleet's fixed set (the case tables
live in `tests/setupStyles.ts`, the Node-only helpers in `tests/setupServer.ts`).

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`,
`/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`,
`/home/user/scaffold/.claude/rules/architecture.md`, `/home/user/scaffold/.claude/rules/styles.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`.
Skill: none. Guide: `/home/user/veneer/guides/veneer.md` and `/home/user/veneer/ROADMAP.md`
§ Rulings (read, never edit): D2 and D6 (Bootstrap's declarations exactly; Bootstrap wins on a
conflict), D5 (no right-to-left support; F6 removes the built twin and its plugin, you remove the
direction machinery that served it), D7 (no alias or shim: a physical property replaces its
logical twin, never sits beside it), D11 (this unit).

**Installed primitives.** `@orkestrel/test` 0.0.20 (`/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`;
`readRules`, `findRule`, `readCascade`, `readCensus`, `readStyle`, `readPixels`; the guide
`## Surface` in `/home/user/scaffold/guides/test.md`), `postcss` and `sass` under `node_modules`.
A helper whose job an installed export does is a defect.

**Host.** Linux, bash, Node 22; run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm `npm --version` prints `11.19.1`). Chromium 141.0.7390.37 at `/opt/pw-browsers`.
Foreground commands are capped at 10 minutes; `npm run test:src:styles` takes about one minute.

**Measurements.** In the terrain. Take none into this brief. The one you take yourself, first:
walk the unminified compile (`sass` with `style: 'expanded'`, `loadPaths: ['src/styles']`) with
`postcss` and list every declaration whose property name is logical (the terrain's pattern), with
its selector, so the population you revert is the compiled one and not only the authored one
(a mixin can emit a logical property from one authored line into many rules). Record that listing
in your report before you change a line, and the same walk after, which must be empty.

**Control identifiers.** none. Name every test for what it proves.

**Standing conditions.** The tracked tree is clean at the launch commit; `tmp/` is untracked and
ignored. `tests/setupPolicy.ts` and `tests/policy.test.ts` are restored by `scaffold repair` and
off-limits. `tests/fixtures/oracle/inventory.json` never changes here. The built cascade
`dist/src/styles/index.css` is minified; the styles project loads it through `setupFiles`, so run
`npm run build:src:styles` before the styles project after every source edit. `tests/distribution.test.ts`
reads the packed cascade and runs only in release mode against the registry; it is off-limits and
its logical reads are reported as a patch.

## Unknowns

- The physical twin of each two-axis logical shorthand under Bootstrap's own writing: `padding-inline: A B`
  becomes `padding-left: A; padding-right: B` in the order Bootstrap writes for that rule (read
  the inventory's declarations for the same selector and copy its property order); where the
  inventory has no such selector (a Veneer addition), write left then right, top then bottom, and
  say so per site in the report.
- Whether any proof reads a logical property through the resolved style (`readStyle(el, 'padding-inline-start')`)
  in a way the physical read changes numerically (it must not: the same box resolves the same
  pixels). Report any case whose expected value had to change and why.

## Scope

**Owned.** Every file under `src/styles/**` (the declarations only; no token, layer, or selector
change), `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the direction machinery and its
cases removed), `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (case-table property names),
`tests/setupBrowser.test.ts` and `tests/setup.ts` where the terrain lists a logical read,
`tests/src/styles/**` (every proof that reads a logical property; `index.test.ts` loses the
"declares no physical inline-axis property anywhere in the shipped cascade" case), and
`guides/veneer.md` § Styles and § Deferred selectors sentences that name logical properties or
direction neutrality, and the § Departures (F5b's ledger does not exist yet; the pre-F5b
§ Departures from Bootstrap table) `img` row.

**Shared (report-only).** `tests/distribution.test.ts` (its logical reads return as an exact
patch), `tests/app/browser/integration.test.ts` (one logical read returns as a patch),
`ROADMAP.md`.

**Off-limits.** `src/browser/**`, `src/core/**`, `app/**`, `configs/**`, `vite.config.ts`,
`tsconfig.json`, `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
`tests/src/browser/**`, `tests/src/core/**`, `tests/app/**`, `tests/journey/**`,
`tests/distribution.test.ts`, `tests/fixtures/**`, `README.md`, `ROADMAP.md`, and every guide
section this brief does not name.

**What asserts the state this change ends.** Every `tests/src/styles/**` case the terrain lists
(re-derive at launch with the terrain's `tests/**` command); the `index.test.ts` physical-property
case; the `tests/setupStyles.test.ts` cases over `PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`,
`SIDE_KEYWORD_PROPERTIES`, the shorthand splitters, `matchesDirectionSensitive`,
`filterAsymmetricDeclarations`, and `scanPhysicalDeclaration` (search bound:
`grep -n 'PHYSICAL_LONGHANDS\|EDGE_SHORTHANDS\|SIDE_KEYWORD\|scanPhysicalDeclaration\|filterAsymmetric\|matchesDirectionSensitive\|splitTopLevelValues\|matchesEdgeShorthand\|matchesRadiusShorthand\|matchesSideKeyword\|normalizeValueToken' tests/setupStyles.test.ts`);
the styles setup module's export inventory case; the case-table freezes in `tests/setupStyles.test.ts`
whose values name a logical property; `tests/guides.test.ts` over the sections you edit.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands, `grep`, `git
status`, `git diff`, `node` for a probe under `tmp/probe/` (delete every probe before you return),
and `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>` scoped to files you own.
No install, no commit, no push, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Measure first, then the
source by file, then the proofs, then the machinery removal, then the prose, then the gates.

## Obligations

### Obligation 1 — the source

For each logical declaration the compiled walk lists, write the physical property Bootstrap writes
for that rule: `inline-size` to `width`, `block-size` to `height`, `min-`/`max-` twins likewise;
`margin-inline-start` to `margin-left`, `-end` to `-right`, `margin-block-start` to `margin-top`,
`-end` to `-bottom`; the two-axis shorthands `padding-inline`, `padding-block`, `margin-inline`,
`border-inline`, `border-block` to their two physical longhands (or the physical four-value
shorthand where Bootstrap's own rule writes one; copy the inventory's form); `inset-*` to
`top`/`right`/`bottom`/`left`; `border-start-start-radius` to `border-top-left-radius`,
`border-start-end-radius` to `border-top-right-radius`, `border-end-start-radius` to
`border-bottom-left-radius`, `border-end-end-radius` to `border-bottom-right-radius`;
`text-align: start` to `left`, `end` to `right`. A mixin that emits a logical property changes once
at the mixin. Change no value, no token, no selector, no layer.

### Obligation 2 — the proofs

Update every proof that reads a logical property to read the physical one, keeping each expected
value (the same box resolves the same pixels; a changed expectation is a report item, never a
silent edit). Update the case tables in `tests/setupStyles.ts` whose keys name logical properties.
Return the `tests/distribution.test.ts` and `tests/app/browser/integration.test.ts` reads as
exact patches.

### Obligation 3 — the direction machinery

Delete from `tests/setupStyles.ts` the direction tables and scanners the terrain lists, their
cases in `tests/setupStyles.test.ts`, their inventory rows, and the `index.test.ts` case that
forbade physical inline-axis declarations. Keep `splitTopLevelValues` and `normalizeValueToken`
only where another export still imports them (the typecheck names it); report the kept and
deleted sets by symbol.

### Obligation 4 — the prose

Rewrite the guide sentences that name logical properties, direction neutrality, or a physical
longhand policy so they state that the cascade writes Bootstrap's physical properties (D11), and
correct the `img` departure row (its logical properties are gone; if no departure remains for the
row, delete the row and say so). Leave the byte-stream and writing-direction sentence to F6 (D5).

## Output

Write `./tmp/units/f5d-report.md` and return its full content as your final message, nothing else:
the compiled logical-declaration listing before and the empty listing after; per obligation what
changed with the files touched; the kept and deleted machinery symbols; every site where the
inventory supplied no property order and the order you chose; every proof whose expected value
changed and why; the two patches; the commands you ran with exit codes, the gate chain run after
your final edit and said to be so; `git status --porcelain` and `git diff --stat`; every deviation
and every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a
declaration with no physical twin (a logical property Bootstrap never writes for that rule and
whose physical form changes the rendered box); a proof whose expected pixels change under the
physical read; a compile that still emits a logical property after the source is physical; a gate
that cannot reach green inside your owned files; a required file this brief names that does not
resolve. Decide, record, and carry on from: longhand order where the inventory is silent, case
titles, doc wording.

## Acceptance criteria

1. The compiled walk after your edits lists no logical property (the report shows the command and
   its empty output).
2. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
3. `npm run build:src && npm run test:src:styles` exits 0.
4. `npm run test:setup` and `npm run test:setup:browser` exit 0 with the machinery's inventory rows
   gone.
5. `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
6. `grep -rnE '(margin|padding|border|inset)-(inline|block)|\b(inline|block)-size\b|border-(start|end)-(start|end)-radius|text-align:\s*(start|end)' src/styles tests/src/styles tests/setupStyles.ts tests/setupStyles.ts guides/veneer.md` prints nothing.
7. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The whole-chain `npm test` reading; the journey suite's reading;
the distribution project (registry-gated).

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return.
