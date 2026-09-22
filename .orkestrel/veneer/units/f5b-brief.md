# Unit F5b ACCOUNTING-LEDGER — the departures and additions ledger the conformance proof reads

## Role and engine

`opus` on native Opus 5.5, the sole writer in the Veneer checkout at `/home/user/veneer`, from the
F5a landing commit on a clean tracked tree (the launch prompt names the commit). Perform the
assignment directly and spawn nothing. Do not commit, push, install a dependency, or run a
destructive command. Do not run `git checkout`, `git restore`, `git stash`, `git reset`, or
`git clean`. The Orchestrator lands the work.

## Objective

Give the guide one ledger of every place the built cascade departs from Bootstrap 5.3.8 and every
name it adds, keyed the way the oracle inventory is keyed, and give the conformance proof readers
and gates that redden on an unrecorded value difference, an unrecorded extra name, a stale
departure row, and a stale deferral row, each proved by a plant, so that "Veneer is a Bootstrap
baseline" is a measured statement rather than a written one.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** The measurements live in
`./tmp/units/f5-terrain-report.md` (§ B the guide tables and their readers, § D the value-gap
instruments and the unminified compile they use, § E the sites the audit named as unrecorded, § F
the inventory fixture's shape) and in the retained probe `./tmp/units/value-gap-probe.mjs` (the
comparison it runs and the logical-property map it applies). Read both first. Where this brief and
those records disagree, the records and the tree win, and you stop and report the disagreement
rather than resolving it. The distillate was taken before F4, F5a, F5e, and F5d landed: guide
line numbers have moved, the cascade and its proofs are physical (D11), the tag-pair grammar is
gone and `ELEMENT_TAGS` and `MANDATED_TAG_PAIRS` sit beside the case tables in
`tests/setupStyles.ts`, the Node-only helpers are `tests/setupServer.ts` (F5e), and the specifier
walk is the `SpecifierReader` class there (F5a). Locate every site by its symbol or its heading,
never by the distillate's line.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`,
`/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`,
`/home/user/scaffold/.claude/rules/architecture.md`, `/home/user/scaffold/.claude/rules/styles.md`,
`/home/user/scaffold/.claude/rules/documentation.md`, `/home/user/scaffold/.claude/rules/writing.md`.
Skill: none. Guide: `/home/user/veneer/guides/veneer.md` (§ Compatibility, § Deferred selectors,
§ Departures from Bootstrap, § Deferred names, § Bootstrap variables Veneer retains) and
`/home/user/veneer/ROADMAP.md` § Rulings (read, never edit): D2 and D6 (Bootstrap's set exactly,
Bootstrap wins on a conflict), D4 (the delegate refusal is F6's, not a departure row here), D5
(no right-to-left support: read nothing from the inventory's `rtl` fields), D7 (no aliasing, no
compatibility shim: a departure is recorded, never papered over with a second name).

**Installed primitives.** `@orkestrel/test` (`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts`
and `.../browser/index.d.ts`; the guide `## Surface` in `/home/user/scaffold/guides/test.md`),
`@orkestrel/contract` (`.../contract/dist/src/core/index.d.ts`), `postcss` and `sass` under
`node_modules`. A helper, guard, wait, recorder, or reader whose job an installed export does is a
defect. `readCompatibility`, `readDeferrals`, `readBuiltCascade`, `readBootstrapCascade`,
`collectShippedComponents`, `scanCompatibilityPresence`, and `readOracleInventory` in
`tests/setupServer.ts` are the existing table and cascade readers; the new readers stand
beside them and reuse their parsing.

**Host.** Linux, bash, Node 22; run every `npm` command with npm 11 on `PATH`:
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(confirm `npm --version` prints `11.19.1`). Chromium 141.0.7390.37 at `/opt/pw-browsers`. The
browser projects run natively here. Foreground commands are capped at 10 minutes; `npm run
test:conformance` runs in the Node `conformance` project and needs `npm run build:src` first for
the built cascade, as its presence cases already assume.

**Measurements.** In the terrain and the probe. Take none into this brief. The one you take
yourself, first: run the retained probe's comparison over the unminified compile (`sass` with
`style: 'expanded'` and `loadPaths: ['src/styles']`, exactly as the probe does it) and record its
per-component counts in your report; that reading is the population the ledger must account for.

**Control identifiers.** none. Name every test for what it proves.

**Standing conditions.** The tracked tree is clean at the launch commit; `tmp/` is untracked and
ignored. `tests/setupPolicy.ts` and `tests/policy.test.ts` are restored by `scaffold repair` and
off-limits. `tests/fixtures/oracle/inventory.json` is the accepted oracle; it changes here only
through the D5 script Obligation 5 fixes, never by hand.
`tests/guides.test.ts` compares each guide `Summary` cell with its export's doc paragraph and reads
the table shapes the parity command expects; a new table under § Compatibility's neighbours must
keep the guide's heading order and column form (a leading and trailing pipe, one header row, one
separator row).

## Unknowns

- The exact population of value differences after F4 and F5a landed. You measure it first (see
  **Measurements**) and report the per-component counts; the ledger's row count follows from it.
- Whether every difference the probe reports is a departure or a formatting artefact of the
  compile (a colour written in another notation, a shorthand the compile expands). Where the two
  values resolve to the same computed value, record no row and report the count you excluded on
  that ground; where they differ, record the row. Report both counts. The cascade is physical after
  F5d (D11), so no logical-to-physical map applies; a logical property the comparison still meets
  is a stop.

## Scope

**Owned.** `tests/setupServer.ts` and `tests/setupServer.test.ts` (the ledger types,
readers, and comparison, with their inventory rows and plants; the RTL digest and its reader
removed; the elements tag reader), `tests/conformance.test.ts` (the gates; the RTL digest assertion
removed; the tag-population case), `tests/setupStyles.ts` (the `ELEMENT_TAGS` doc only),
`tests/fixtures/oracle/inventory.json` (the `rtl` fields removed through the script only),
`guides/veneer.md` § Departures from Bootstrap (replaced by the two tables this brief
fixes), § Deferred names (its two rows read or retired by the reader), and § Bootstrap variables
Veneer retains (the two filters' rows move into the ledger; the prose names the ledger).

**Shared (report-only).** `ROADMAP.md` (a deferral row this unit retires or a departure it
cannot explain returns as an exact patch in the report).

**Off-limits.** `src/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`,
`package-lock.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/setupStyles.ts` beyond that doc, `tests/setupStyles.ts`, `tests/setupStyles.ts`,
`tests/setupBrowser.ts`, `tests/src/**`, `tests/app/**`, every other file under `tests/fixtures/**`,
`README.md`,
`ROADMAP.md`, and every guide section this brief does not name. A departure whose fix belongs in
`src/styles/**` is a ledger row with `departure` set from the union, never a source edit.

**What asserts the state this change ends.** The inventory case "declares the identity constants
and the helpers the conformance proof measures with" in `tests/setupServer.test.ts` (the new
exports join it); every `tests/guides.test.ts` parity reading over the sections you replace (run
`npm run test:guides` after the prose moves); the § Departures from Bootstrap prose that
`grep -n 'Departures from Bootstrap\|Deferred names\|No reader parses' guides/veneer.md` finds
(search bound: the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for the gate commands, `grep`, `git
status`, `git diff`, `node` for a probe under `tmp/probe/` (delete every probe before you return),
and `node_modules/.bin/oxfmt --config .oxfmtrc.json --write <owned file>` scoped to files you own.
No install, no commit, no push, no tree-wide mutating `format` or `lint --fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Types first, then the
readers and the comparison, then the plants and the gates, then the guide tables, then the gates.

## Obligations

### Obligation 1 — the ledger types

In `tests/setupServer.ts`, beside `CompatibilityRow` and `DeferralRow`, declare the readonly
`DepartureRow` (`component`, `selector`, `property`, `condition` — the enclosing at-rule text or
`undefined` when none — `recorded`, `emitted`, `departure`) and the readonly `AdditionRow`
(`component`, `name`, `category` — the axis that varies: `selector`, `declaration`, `property`,
`keyframes` — `reason`). `departure` is the literal union `'tokenized' | 'aliased' | 'declared' |
'fallback' | 'dropped'`: a value routed through a Veneer token, a value expressed through another
name, a value declared differently on purpose, a value that keeps Bootstrap's as a fallback, a
declaration the cascade omits. Those are irreducible modes of one axis; add no other member without
a measured row that needs it, and report such a row instead.

### Obligation 2 — the readers

Add `readDepartures` and `readAdditions`, reading the two guide tables the way `readDeferrals`
reads § Deferred selectors (same parsing, same heading discovery by section title, same refusal on
a malformed row), and `collectDepartures`, the comparison: given the unminified compiled cascade
(compile it the way the probe does, through `sass` with `style: 'expanded'`; export the compile
as `compileExpandedCascade` if no existing export does it) and the oracle inventory, it walks
every inventory selector of every shipped component, compares each recorded property directly
(the cascade is physical after F5d, so the probe's logical map is retired, not ported), and returns
every (`component`, `selector`, `property`,
`condition`, `recorded`, `emitted`) where the emitted value differs, plus every emitted selector,
custom property, and keyframe name in a shipped component's layer the inventory lacks (the
additions). Parse with `postcss`; read the enclosing at-rule as the condition. Read nothing from
the inventory's `rtl` fields (D5).

### Obligation 3 — the gates

In `tests/conformance.test.ts` under a describe named for the ledger, add cases that: every
difference `collectDepartures` reports has a row in § Departures (an unrecorded difference names
its component, selector, property, and the two values in the failure message); every departure row
still names a difference the comparison reports (a stale row is named); every addition the
comparison reports has a row in § Additions; every addition row still names an emitted name; and
every § Deferred selectors row still names a selector absent from the built cascade (a shipped
selector with a deferral row is named). Prove each gate in `tests/setupServer.test.ts` with
a plant over a scratch guide string and a scratch cascade string — a planted difference, a planted
stale row, a planted extra name — so each reader binds. Name the plants in the case titles by
what they prove, never as controls.

### Obligation 4 — the ledger rows

Replace § Departures from Bootstrap with two tables under the same parent section: `### Departures`
(columns `Component`, `Selector`, `Property`, `Condition`, `Bootstrap 5.3.8`, `Veneer`,
`Departure`) and `### Additions` (columns `Component`, `Name`, `Category`, `Reason`). Fill
`### Departures` from the comparison you measured, one row per difference, with the `departure`
member that names why. The token-keyed rows the old table carried survive only as the `tokenized`
rows the comparison reproduces; a token row the comparison no longer reports is retired and named
in your report. Fill `### Additions` with every measured extra, including the terrain § E sites:
`a.btn[aria-disabled='true']`, `.btn-tertiary`, `.btn-outline-tertiary`, the reboot-layer `:root`
motion rule, `html`, `var`, `figcaption`, `colgroup`, the `button` states, and `.btn-check`'s
hiding technique where it emits a declaration Bootstrap lacks; and the `dl`, `blockquote`, `code`,
`pre`, `kbd`, and `hr` structural changes as `declared` departures where the comparison reports
them. Record `--bs-btn-close-filter` and `--bs-carousel-control-icon-filter` as `fallback` rows
with their measured values, and move their sentences out of § Bootstrap variables Veneer retains
into a pointer at the ledger. Read § Deferred names through `readDeferrals`' pattern or retire it:
if a reader can bind its two rows to a measured absence, add the reader and the gate; if not,
delete the section and carry its two facts into the ledger or the deferral table, and say which in
the report.

### Obligation 5 — no right-to-left support in the conformance proof (D5)

Delete `BOOTSTRAP_RTL_CSS_DIGEST` and every read of it: the assertion in `tests/conformance.test.ts`
that pins the RTL CSS bytes (keep the CSS and bundle pins), its inventory row in
`tests/setupServer.test.ts`, and any `rtl` member `OracleInventory` or `readOracleInventory`
declares or reads. Remove the `rtl` field from every component in
`tests/fixtures/oracle/inventory.json` with a script under `tmp/probe/` that parses the JSON,
deletes that one field per component, and writes it back through `JSON.stringify` with a tab
indent, then formats the file with the scoped `oxfmt` command; delete the script before you
return, and report the digest of the file before and after. Touch no other field. F6 removes the
built `index.rtl.css` twin, its plugin, and its proofs; you remove nothing under `configs/**` or
`tests/setupStyles.test.ts`.

### Obligation 6 — the elements layer's tag population binds `ELEMENT_TAGS` (F5a reviewer F4)

The tag column of `ELEMENT_TAGS` in `tests/setupStyles.ts` is written by hand and bound to no
reading (its doc says so). Add to `tests/setupServer.ts` a reader over the unminified compile
that returns, for the `elements` layer, the set of type selectors its rules select (the leading
type token of each compound in each selector, read from the `postcss` rule's `selector` string —
this is a string read of compiled output, not a selector grammar, and it reports a compound it
cannot read rather than skipping it), and add the case to `tests/conformance.test.ts` that requires
that set to equal the distinct values of the table's tag column, with a plant in
`tests/setupServer.test.ts` over a scratch sheet that proves the reader binds. Correct the
table's doc to name the binding.

### Obligation 7 — the prose

Update the guide sentences that introduce the replaced sections so each names the reader that
parses it and the gate that reddens on drift, in the voice `.claude/rules/writing.md` fixes. Keep
every existing deferral row as it is unless the deferral gate names it as shipped, in which case
move it to the ledger and report it.

## Output

Write `./tmp/units/f5b-report.md` and return its full content as your final message, nothing else:
the measured per-component counts and the excluded-as-artefact count; per obligation what changed
with the files touched; every retired token row and every retired or moved deferral by name; the
commands you ran with exit codes, the gate chain run after your final edit and said to be so;
`git status --porcelain` and `git diff --stat`; the `ROADMAP.md` patch if any; every deviation and
every claim of your own you flag as unverified. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol, on: a
difference no `departure` member describes; a comparison that reports a shipped component absent
from the built cascade; a guide parity failure the table shape causes that the fixed columns cannot
satisfy; a gate that cannot reach green inside your owned files; a required file this brief names
that does not resolve. Decide, record, and carry on from: row order within a table, the reason
cell's wording, the readers' exact signatures within the rulings, case titles, doc wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the ledger readers, the comparison, and the compile export in
   the inventory case, and the three plants present.
3. `npm run build:src && npm run test:conformance` exits 0 with the ledger gates and the
   tag-population case present and passing over the real guide and the real built cascade.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `grep -n 'No reader parses' guides/veneer.md` prints nothing.
6. `grep -rn 'BOOTSTRAP_RTL_CSS_DIGEST\|"rtl"' tests/setupServer.ts tests/setupServer.test.ts tests/conformance.test.ts tests/fixtures/oracle/inventory.json` prints nothing.
7. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The whole-chain `npm test` reading; the comparison's wall clock.

## Review evidence

The Orchestrator takes the actual diff and the actual status output after you return.
