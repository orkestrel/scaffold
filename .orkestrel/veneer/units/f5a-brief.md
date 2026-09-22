# Unit F5a ACCOUNTING-SPLIT — the styles setup split and the rendered position proof

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at `/home/user/veneer`, from the
F4 landing commit on a clean tracked tree (the launch prompt names the commit). Perform the
assignment directly and spawn nothing. Do not commit, push, install a dependency, or run a
destructive command. Do not run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean`. The Orchestrator lands the work.

## Objective

Split `tests/setupStyles.ts` into modules that each hold one kind of thing, retire the hand-written
selector grammar for a rendered position-independence proof the browser's own selector engine
answers, move the one nested declaration to module scope, remove the duplicated text assertion, and
add the built-closure forbidden-runtime sweep, so the accounting units that follow read a module
whose parts have one job each.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** The measurements live in
`./tmp/units/f5-terrain-report.md` (the Grok distillate: § A the instruments, § B the guide tables,
§ C the styles setup module's stretches, export groups, and importers, § E the audit's named sites)
and `./tmp/units/position-probe.md` (the probe that fixes the rendered proof's predicate, with its
instrument and readings). Read both first. Where this brief and those records disagree, the records
and the tree win, and you stop and report the disagreement rather than resolving it. The
distillate was taken before F4 landed, so an import line it quotes may now read `scene` where it
read `specimens`; that is the only expected drift.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md` (§ the
setup modules: a setup file owns what an assertion needs and nothing an assertion is; a data table
belongs in a setup file at any size; every root `tests/setup*.test.ts` proof pairs with its sibling
module and runs in the Node `setup` project, `tests/setupBrowser.test.ts` excepted),
`/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`,
`/home/user/scaffold/.claude/rules/architecture.md`, `/home/user/scaffold/.claude/rules/styles.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`.
Skill: none. Guide: `/home/user/veneer/guides/veneer.md` (§ Tests names the proof files; § Styles
names the selector policy) and `/home/user/veneer/ROADMAP.md` § Rulings (read, never edit).

**Installed primitives.** `@orkestrel/test` `0.0.19` (`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts`
and `.../browser/index.d.ts`; the guide `## Surface` in `/home/user/scaffold/guides/test.md`),
`@orkestrel/contract` (`.../contract/dist/src/core/index.d.ts`), `postcss` `8.5.28` and `sass`
under `node_modules`. A helper, guard, wait, recorder, or reader whose job an installed export does
is a defect. `readRules`, `findRule`, `readCascade`, and `readCensus` are installed cascade
readers; the terrain § A names which local readers stand beside them and why.

**Host.** Linux, bash, Node 22; run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm `npm --version` prints `11.19.1`). Chromium 141.0.7390.37 at `/opt/pw-browsers`. The
browser projects run natively here. Foreground commands are capped at 10 minutes; `npm run
test:src:styles` takes about one minute.

**Measurements.** In the terrain and the probe record. Take none into this brief.

**Control identifiers.** none. Name every test for what it proves.

**Standing conditions.** The tracked tree is clean at the launch commit; `tmp/` is untracked and
ignored. The `setup` project's include is `tests/setup*.test.ts` less `tests/setupBrowser.test.ts`,
so a new root setup proof is discovered without a config change; `vite.config.ts` and
`configs/**` are off-limits. `tests/setupPolicy.ts` and `tests/policy.test.ts` are restored by
`scaffold repair` and off-limits. The built cascade `dist/src/styles/index.css` is minified; the
unminified compile is `sass` with `style: 'expanded'` as the retained probes do it.

## Unknowns

- Which grammar pieces `normalizeComplexSelector` needs after the tag-pair judgment is gone. You
  derive the set by deleting the tag-pair pieces first and letting the typecheck name what the
  normalizer still imports; report the kept set and the deleted set by symbol.
- The wall clock of the rendered proof over the elements layer on this host. Report it from the
  styles project's run.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, the new `tests/setupCases.ts` and
`tests/setupCases.test.ts`, the new `tests/setupCalibration.ts` and `tests/setupCalibration.test.ts`,
`tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (the position reader and its inventory
row, and the `BREAKPOINT_CASES` and `parseMediaWidth` imports), every file under
`tests/src/styles/**` (their imports move with the tables; `index.test.ts` and
`elements/input.test.ts` change substance), `tests/setupConformance.ts` and
`tests/setupConformance.test.ts` (the visitor, the built-closure sweep and its plant),
`tests/conformance.test.ts` (the built-closure case), `guides/veneer.md` § Tests and the § Styles
sentences that name the selector grammar or the tag-pair policy.

**Shared (report-only).** none.

**Off-limits.** `src/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`,
`package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/src/browser/**`, `tests/app/**`, `tests/fixtures/**`, `README.md`,
`ROADMAP.md`, and every guide section this brief does not name.

**What asserts the state this change ends.** The export inventory cases: "exports the scanner, the
predicates, the collectors, and the compatibility oracle, and nothing the document has to answer"
in `tests/setupStyles.test.ts` (the split makes it false; each new module gets its own inventory
case), "exports the showcase mount, the case matrices, the oracle drive, the recorders, and the
cascade readers" in `tests/setupBrowser.test.ts` (the position reader joins it), and "declares the
identity constants and the helpers the conformance proof measures with" in
`tests/setupConformance.test.ts` (the sweep joins it). Every `tests/src/styles/**` file that
imports a moved table (the terrain § C lists them by group). The guide § Tests paragraph that
links `tests/setupStyles.test.ts` by description (search bound: `grep -n 'setupStyles\|conformance readers' guides/veneer.md`).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands, `grep`, `git
status`, `git diff`, `node` for a probe under `tmp/probe/` (delete every probe before you return),
and `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>` scoped to files you own.
No install, no commit, no push, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Types first where a type
changes, then the implementation, then the proofs, then the prose, then the gates.

## Obligations

### Obligation 1 — the split

Three modules, each with one job, each with its own root proof in the `setup` project:

- `tests/setupCases.ts` (host-independent: no DOM, no `node:*`): every case table and markup string
  the terrain § C lists under case tables, plus `MANDATED_TAG_PAIRS` (it is a case table for the
  rendered proof, not grammar) and a new `ELEMENT_TAGS` table naming every tag the elements layer
  styles, with the mandated children beside their parents. Its proof carries the case-table
  freezes and inventory bindings that live in `tests/setupStyles.test.ts` today, and one case that
  reads `src/styles/elements/` and asserts every partial's tag is in `ELEMENT_TAGS` (so the table
  cannot go stale when a partial is added).
- `tests/setupCalibration.ts` (host-independent): the oracle value lists and the calibration
  readings the terrain § C lists (`BootstrapScope`, `BOOTSTRAP_SCOPE_PATTERNS`, `VENEER_GUIDE_PATH`,
  `BOOTSTRAP_ROOT_VARIABLES`, `BOOTSTRAP_DARK_VARIABLES`, `THEME_DARK_ADDITIONS`,
  `RETAINED_COLOR_ALIASES`, `RETAINED_LENGTH_ALIASES`, `CALIBRATED_TIERS`, `CUSTOMIZATION_RECIPE`,
  `FILL_ONLY_RECIPE`). Its proof carries their cases.
- `tests/setupStyles.ts` keeps the cascade readers, the compile helpers, the direction tables and
  scanners, the shadow-layer reader, and the selector normalizer with what it needs. Its proof keeps
  their cases.

Move each export once; change no export's name or behaviour in the move; update every importer;
give each module an inventory case that lists its exports exactly.

### Obligation 2 — retire the tag-pair grammar for the rendered proof

Delete `matchesLooseTagPair`, `scanUnreadForm`, `extractSelectorCompounds`, `extractCompoundTags`,
and every grammar piece only they used (report the deleted set and the kept set by symbol; the
normalizer's needs decide the kept set). Delete their cases.

Add to `tests/setupBrowser.ts` an exported reader that answers the judgment the grammar served,
with the predicate the probe fixes: given the elements-layer style rules (as `CSSStyleRule` values)
and the tag table, for every styled tag it compares the set of rules the browser's own `matches`
reports on that tag alone, nested inside each other tag outside the mandated pairs, and after each
other tag as a sibling, and returns the positional pairs it finds, as `<outer> > <inner>` and
`<outer> + <inner>` strings. Name it in `{verb}{Noun}` form (`scanPositional` reads well beside
`collectLayer`). It mounts through `scene`, reads rules through `Element.matches`, and parses no
selector.

Replace the case "joins no two bare tags in any elements-layer rule" in
`tests/src/styles/index.test.ts` with two cases: the shipped elements layer reports no positional
pair; and a scratch sheet loaded through `scene.load` carrying
`@layer elements { p:not(h1 + p) { margin: 0 } }` reports exactly `h1 + p` when its rules are
passed to the reader (the plant that proves the reader binds). Report the wall clock of the shipped
case.

Update the guide's § Styles sentences that describe the tag-pair policy so they name the rendered
proof rather than the grammar, and keep every deferral row that cites a contextual pair as it is.

### Obligation 3 — the visitor

Move the visitor object declared inside `extractSpecifiers` in `tests/setupConformance.ts` to module
scope as an exported constant with its own inventory row and a one-line doc comment; change no
behaviour.

### Obligation 4 — the duplicate text assertion

In `tests/src/styles/elements/input.test.ts`, remove the text-level assertion on
`::file-selector-button` that duplicates the resolved read, and keep the `-webkit-` internal parts
text-accounted with the reason stated in a comment beside them (the CSSOM cannot resolve them).

### Obligation 5 — the built-closure sweep

Add to `tests/setupConformance.ts` an exported sweep over the built JavaScript entries
(`dist/src/core/index.js`, `dist/src/browser/index.js`) that reports the first forbidden runtime
it finds by import specifier (through `extractSpecifiers`) or by bundled signature (`jQueryInterface`,
`EVENT_KEY`, `@popperjs`, `createApp`, `__vue`, `tailwind`), named in `{verb}{Noun}` form beside
`scanForbiddenSource`. Prove it in `tests/setupConformance.test.ts` with a scratch copy of an entry
carrying an appended signature (the plant), and add the case to `tests/conformance.test.ts` that
sweeps the real built entries and expects nothing. The case needs `dist/` built; state in its doc
that `npm run build:src` precedes it, as the presence cases already assume.

## Output

Write `./tmp/units/f5a-report.md` and return its full content as your final message, nothing else:
per obligation what changed with the files touched; the kept and deleted grammar symbols; the
rendered proof's wall clock; the commands you ran with exit codes, the gate chain run after your
final edit and said to be so; `git status --porcelain` and `git diff --stat`; every deviation and
every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a moved
export whose behaviour a case pins differently in its new home; a normalizer that cannot stand
without a tag-pair piece; the rendered proof reporting a positional pair on the shipped layer; a gate
that cannot reach green inside your owned files; a required file this brief names that does not
resolve. Decide, record, and carry on from: module-internal ordering, case titles, the reader's
exact signature within the rulings, doc wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the three inventory cases and the `ELEMENT_TAGS` partial case
   present.
3. `npm run test:setup:browser` exits 0 with the position reader in the inventory.
4. `npm run test:src:styles` exits 0 with the shipped-layer case and the planted-sheet case present.
5. `npm run build && npm run test:conformance && npm run test:setup` exit 0 with the sweep, its plant,
   and the visitor's inventory row present.
6. `npm run test:guides` and `npm run test:policy` exit 0.
7. `grep -rn 'matchesLooseTagPair\|scanUnreadForm\|extractSelectorCompounds\|extractCompoundTags' tests src guides` prints nothing.
8. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The whole-chain `npm test` reading; the rendered proof's wall clock.

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return.
