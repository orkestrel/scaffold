# LEDGER (`cl`) round 2 report

Unit: the LEDGER (`cl`) unit, round 2, `opus` on Opus 5.5 as a native subagent, in the
`/home/user/veneer-cl` worktree (the `unit/cl` branch, round 1 and round 2 edits uncommitted over the
`42fd88e` commit). Brief: the `b-cross-cl-brief-2.md` file. Nothing is committed. Deviation state: no
stop; the ancillary decisions are under § Decisions.

L-a, L-b, and L-c are closed. The guide prose wraps at 100 columns and its rewritten sentences read
true against the code. The added TSDoc gives each member token its noun, and the presence case title
names the recorded animations. The `collectAdditions` function refuses every animation no shipped key
records, the keyframes branch is gone, and the `keyframes` member of the `AdditionCategory` type is
removed. No shipped key escapes the presence gate's keyframes check.

## Review evidence

The Orchestrator retained each artifact: this report as `.orkestrel/veneer/units/b-cross-cl-report-2.md`,
the diff, status, and shared patch beside it, and every other file under
`.orkestrel/veneer/units/cl-instruments/`:

- the `cl-2.diff` file: the owned files against the `42fd88e` commit;
- the `cl-2-status.txt` file: the `git status --short` output and the diffstat;
- the `cl-shared-2.patch` file: the shared files against the `42fd88e` commit, superseding the
  `cl-shared.patch` file whole; the `git apply --check` command exits 0 on the worktree;
- the `cl-mutations-2.log.txt` file: every round 2 red run, with its sites, command, exit, summary,
  and failing cases;
- the `cl-report-2.md` file: this report.

The owned diffstat against the `42fd88e` commit reads as follows:

```text
 tests/setupServer.test.ts | 423 +++++++++++++++++++++++++++++++++++++++++-
 tests/setupServer.ts      | 459 +++++++++++++++++++++++++++++++++++++++++-----
 2 files changed, 822 insertions(+), 60 deletions(-)
```

The shared patch's stat reads as follows:

```text
 guides/veneer.md          |  330 +++++++++++++++++++++++++++------------------
 tests/conformance.test.ts |  122 ++++++++++++-----
 tests/setupStyles.test.ts |    1
```

The guide count grows against round 1 because the § Files table reflows under its rewritten row, as
the brief permits.

## L-a: the guide

The `.orkestrel/veneer/units/cl-instruments/cl-guide-2.py` instrument writes every round 2 guide hunk from the `42fd88e` text. It
wraps each paragraph at 100 UTF-8 bytes, keeps each code span and each link on one line, and refuses
a line that opens with a Markdown block marker. The oxfmt formatter then aligns the tables.

Each rewritten sentence reads as follows before and after. "Before" is the round 1 patch text, or
the `42fd88e` text where round 1 left the sentence alone.

- **The § Files row for the `tests/setupServer.ts` module.**
  - Before: "The Node-only readers: the installed and built cascades and the guide, the
    compiled-stylesheet reader, the shared-name readings, the rows of every guide table a proof
    reads, the cascade comparisons, and the elements-layer tag reader."
  - After: "The Node-only readers: the installed and built cascades and the guide text, the
    compiled-stylesheet reader, the shared-name readings, the guide's compatibility, deferral,
    departure, addition, media condition, and keyframes tables, the cascade comparisons, and the
    elements-layer tag reader."
  - The row is wider than the table's widest cell, so the whole § Files table reflows.
- **The § Keyframes treatment sentence.**
  - Before: "Each treatment is a rule of its own key, so each key's ledger compares the value its
    twin rule writes, and no proof reads the treatments as one group."
  - After: "Each written treatment is a rule of its own key, so each key's ledger compares the value
    its twin rule writes, and no proof reads the treatments as one group."
- **The § Keyframes routing sentence.**
  - Before: "The `collectAdditions` function refuses an animation the pinned inventory records
    under no key and no shipped key's name opens, so an animation reaches either this table or
    § Additions."
  - After: "The keyframes parity case refuses any animation the pinned inventory does not record
    under a shipped key, whether or not a row names it, and the `collectAdditions` function throws
    naming that animation, so no animation is an addition."
- **The § Additions `Category` cell sentence.** L-c removes the category, which makes this
  sentence false.
  - Before (`42fd88e` text): "The `Category` cell names what was added: a `selector` the
    release does not write, a `declaration` the release omits on a selector it does write, a custom
    `property` the component's official vocabulary lacks, or a `keyframes` animation it does not
    define."
  - After: "The `Category` cell names what was added: a `selector` the release does not write, a
    `declaration` the release omits on a selector it does write, or a custom `property` the
    component's official vocabulary lacks. An animation is never an addition; § Keyframes states how
    the ledger refuses one no shipped key records."
- **The § Tests conformance sentence.**
  - Before: "…check shipped CSS vocabulary and animations, compare each declaration's priority at
    its media condition…"
  - After: "…check shipped CSS vocabulary and recorded animations, compare each declaration's
    priority at its media condition…"

Every other round 1 sentence keeps its words and is reflowed only. That covers the § Styles priority
sentence, the § Media conditions paragraphs, the § Keyframes introduction, the rest of the
§ Keyframes parity paragraph, and the § Tests helper sentence.

The width check below counts in bytes and prints each added guide line past column 100, table rows
excluded. It prints nothing. Without the table-row filter it prints only rows of the § Files table,
the § Media conditions table, and the § Keyframes table. The log, with both readings, is the
`.orkestrel/veneer/units/cl-instruments/cl-width-2.log.txt` file.

```text
$ diff <(git show 42fd88e:guides/veneer.md) tmp/probe/cl-scratch/guides/veneer.md | grep '^>' \
    | sed 's/^> //' | LC_ALL=C awk 'length > 100' | grep -v '^|'
(no output)
```

## L-b: the TSDoc and the case title

Each rewritten doc sentence and title reads as follows before and after:

- **The remark on the `ConditionRow` type.**
  - Before: "`condition` is the form this cascade writes and `recorded` the form the release
    writes, … `recorded` is undefined … `writer` names the mixin or partial…"
  - After: "The `condition` member holds the form this cascade writes and the `recorded` member the
    form the release writes, … Either member can carry the `{breakpoint}` template, … The
    `recorded` member is undefined … The `writer` member names the mixin or partial…"
- **The remark on the `KeyframesRow` type.**
  - Before: "`component` is the shipped key … and `motion` the treatment…"
  - After: "The `component` member holds the shipped key … and the `motion` member holds the
    treatment…"
- **The remark on the `OracleInventory` type.**
  - Before: "`media` carries each media condition…"
  - After: "The `media` member carries each media condition…"
- **The remark on the `Addition` type.** This sentence is edited because the `keyframes` clause
  goes.
  - Before: "`name` is the selector for a `selector` addition, the custom-property name for a
    `property` addition, the keyframes name for a `keyframes` addition, and `selector { property }`
    for a `declaration` addition, … `condition` holds the at-rule text…"
  - After: "The `name` member is the selector for a `selector` addition, the custom-property name for
    a `property` addition, and the `selector { property }` text for a `declaration` addition, … The
    `condition` member holds the at-rule text… An animation is never an addition: the
    `collectAdditions` helper refuses one no shipped key records."
- **Round 1 helper docs that gain nouns.**
  - The `renderBreakpointTemplate` helper: "the release's `575.98px` reads as it writes it"
    becomes "the release's `575.98px` width reads as it writes it".
  - The `expandConditions` helper: "…an exclusive upper bound: `(max-width: 575.98px)` for the…"
    becomes "…an exclusive upper bound: the `(max-width: 575.98px)` feature for the…".
  - The `collectMediaFeatures` helper: "so `(width < 576px)` answers for…" becomes "so the
    `(width < 576px)` feature answers for…".
  - The `normalizeMediaFeature` helper: "as in `(width>=576px)` and `(forced-colors:active)`"
    becomes "as in the `(width>=576px)` and `(forced-colors:active)` features".
  - The `normalizeMediaCondition` helper: "as in `@media (width >= 576px) and @supports (…)`"
    becomes "as in the `@media (width >= 576px) and @supports (…)` condition".
- **The presence case title, in the `tests/conformance.test.ts` file (shared patch).**
  - Before: "carries every shipped component selector and custom property in the built cascade"
  - After: "carries every shipped component selector, custom property, and recorded animation in the
    built cascade"
  - A search of the worktree's `guides/`, `tests/`, and `ROADMAP.md` paths for the old title
    returned only its own line.

## L-c: the keyframe addition path

### Change

The keyframes loop in the `collectAdditions` function throws for any animation no shipped key
records, and it has no other branch:

```ts
for (const name of keyframes) {
	if (!shipped.some((key) => inventory.components[key]?.keyframes.includes(name) === true))
		throw new Error(`Keyframes ${name} is recorded under no shipped component`)
}
```

These consequences follow:

- **Withheld keys.** Round 1 left an animation that a withheld key records outside the ledger. The
  function refuses that animation, in line with the parity case.
- **Error message.** The message changes from "answers to no shipped component" to "is recorded
  under no shipped component", because a name no longer attributes anything.
- **Function docs.** The `@throws` tag and the remark on the `collectAdditions` function state the
  refusal. The remark gives the reason: the parity case refuses the same animations, so no green
  suite could hold one as an addition.
- **`LEDGER_INVENTORY` constant.** The fixture's `btn` key records the `btn-pulse` animation, and
  the `LEDGER_CASCADE` constant's doc says that animation is recorded under a shipped key. The
  planted world keeps an animation, and the ledger reads it as no addition.
- **`AdditionCategory` type.** The `keyframes` member is removed from the type and from the
  `isAdditionCategory` guard. The guard's proof asserts `isAdditionCategory('keyframes')` returns
  false.

### Search for the `keyframes` member of the `AdditionCategory` type

The search ran the following command:

```text
grep -rn "'keyframes'\|keyframes |\|| keyframes\|keyframes\` animation\|AdditionCategory" \
  tests app src guides configs --include=*.ts --include=*.md --include=*.vue
```

It ran before the change, over the worktree. It found these consumers, and each one is closed:

- the `AdditionCategory` type, the `isAdditionCategory` guard, and the branch in the
  `collectAdditions` function that wrote the member: all removed;
- the proofs asserting a `btn | btn-pulse | — | keyframes` addition, and the guard's
  `isAdditionCategory('keyframes')` assertion, in the `tests/setupServer.test.ts` file: rewritten;
- the § Additions `Category` sentence in the `guides/veneer.md` file: rewritten in the shared
  patch.

The search found no other consumer: no row of the guide's § Additions table carries the `keyframes`
category, and no case outside the `tests/setupServer.test.ts` file reads the member.

### Measurement of the presence gate's scope

The measurement asked whether any key that records animations has a shipped selector or variable row
but no shipped selector row. It ran the `tmp/probe/cl-measure.test.ts` probe through the
`npm run test:probe` script, over the real guide and inventory. The output is retained in the
`.orkestrel/veneer/units/cl-instruments/cl-measure-2.log.txt` file:

```text
progress | keyframes progress-bar-stripes | rows selector:shipped, variable:shipped | collectShippedComponents true
spinner | keyframes spinner-border, spinner-grow | rows selector:shipped, variable:shipped | collectShippedComponents true
placeholder | keyframes placeholder-glow, placeholder-wave | rows selector:shipped | collectShippedComponents true
… recording keyframes without a shipped selector row: []
```

No key escapes. The presence gate is unchanged, and no plant was owed. The probe was deleted after
the run.

## Red runs

Every run is in the `.orkestrel/veneer/units/cl-instruments/cl-mutations-2.log.txt` file. The drivers are the
`.orkestrel/veneer/units/cl-instruments/cl-mutate-3.py` script, a successor of the `cl-mutate-2.py` script that logs to the
round 2 file and accepts an empty site list for a failing-first run. The specs are the
`cl-red-2.json`, `cl-mutations-owned-2.json`, `cl-mutations-owned-3.json`, and
`cl-mutations-shared-4.json` files.

| Run | Plant or state | Command | Exit | Summary | Failing case |
| --- | --- | --- | --- | --- | --- |
| R1 failing-first | The rewritten proofs over the round 1 code | `npm run test:setup` | 1 | `Tests  4 failed \| 291 passed (295)` | "refuses an animation the inventory records under no shipped key, naming it, and admits one a shipped key records"; "reports a planted selector, declaration, and custom property the inventory lacks, and no recorded animation"; "names a planted unrecorded difference, a planted stale row, and a planted unrecorded name"; "names each departure member from the two values alone" |
| P1 | Any key's record admits an animation, a withheld key's included | `npm run test:setup` | 1 | `Tests  1 failed \| 294 passed (295)` | "refuses an animation the inventory records under no shipped key, naming it, and admits one a shipped key records" |
| P2 | A name opening with a shipped key admits an animation | `npm run test:setup` | 1 | `Tests  1 failed \| 294 passed (295)` | the same case |
| P3 | The `isAdditionCategory` guard admits the `keyframes` category again | `npm run test:setup` | 1 | `Tests  1 failed \| 294 passed (295)` | "names each departure member from the two values alone" |
| P4 | A `@keyframes btn-glow` rule no key records, planted in the scratch built cascade | `npm run test:conformance` | 1 | `Tests  1 failed \| 23 passed (24)` | "defines exactly the animations the guide table names, each under the shipped key that records it" |
| P5 | The `@keyframes placeholder-wave` rule deleted from the scratch built cascade | `npm run test:conformance` | 1 | `Tests  2 failed \| 22 passed (24)` | "carries every shipped component selector, custom property, and recorded animation in the built cascade" (retitled) and the keyframes parity case |

A run of the `npm run test:setup` script after the fix exits 0 with `Tests  295 passed (295)`, in the
`.orkestrel/veneer/units/cl-instruments/cl-setup-green-2.log.txt` file.

## Gates

The `.orkestrel/veneer/units/cl-instruments/cl-scratch-2.sh` script, a successor of the `cl-scratch.sh` script that takes the
patch as an argument, built the scratch copy at the `tmp/probe/cl-scratch` path with the
`cl-shared-2.patch` file applied. The `.orkestrel/veneer/units/cl-instruments/cl-gates-2.sh round2` command then ran the chain.
The log is the `.orkestrel/veneer/units/cl-instruments/cl-gates-round2.log.txt` file, with one
`.orkestrel/veneer/units/cl-instruments/cl-gate-round2-<gate>.log.txt` log per gate. The copy was deleted afterwards.

| Command as run | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` and `Finished in 10441ms on 415 files using 4 threads.` |
| `npm run lint:check` | 0 | No output. Control: a planted `tests/cl-plant.ts` file with an explicit `any` type exits 1, and exits 0 after removal |
| `npm run check` | 0 | No diagnostics |
| `npm run build:src` | 0 | `dist/src/styles/index.css  241.54 kB │ gzip: 30.05 kB`, `✓ built in 2.09s` |
| `npm run test:setup` | 0 | `Tests  295 passed (295)` |
| `npm run test:conformance` | 0 | `Tests  24 passed (24)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |

The `npm run test:policy` gate is an addition to the criteria. The whole suite and the
`npm run test:service` script are left to the Orchestrator.

## Decisions

- **Width criterion and tables.** Acceptance criterion 3 asks that no added guide line pass
  column 100. Every added prose line meets it. The table rows cannot, because a Markdown table row
  cannot wrap. The brief itself lets the § Files table reflow, which widens every row of that table.
  The width check above therefore excludes lines that open with the `|` character, and the
  `cl-width-2.log.txt` file lists the table rows it excluded.
- **Error message wording.** The refusal message reads "Keyframes <name> is recorded under no
  shipped component". The name no longer attributes an animation, so the record is what the message
  names.
- **§ Additions sentence.** The patch rewrites this sentence in the same round as the removal. The
  `keyframes` member's removal makes the sentence false, and the brief scopes the prose a change
  makes false to the unit.
- **Fixture and brief wording.** The `LEDGER_INVENTORY` constant records the `btn-pulse` animation
  under the shipped `btn` key, so the planted world keeps an animation. The alternative was to drop
  the rule from the `LEDGER_CASCADE` constant. The brief's "the L-c proof" is one case with its
  plants; the P1 and P2 plants are those plants.

## Observations

- **RESIDUE merge risk.** Round 1's note about the RESIDUE unit stands. Its digest pin case sits in
  the region of the `tests/setupServer.test.ts` file that this unit edits, so the three-way merge
  can conflict there.
