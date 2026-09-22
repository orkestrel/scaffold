# Unit F5b ACCOUNTING-LEDGER — report 2 (the fix round)

`opus` on native Opus 5.5, sole writer in `/home/user/veneer-f5b` (worktree at `07fc3c3` plus the
first run's writes and the two granted `_button.scss` edits). Brief: `tmp/units/f5b-brief-2.md`.
Supersedes `tmp/units/f5b-report.md`. Every gate below ran after the final edit.

## Pre-edit measurements

Taken over the untouched worktree, through the first run's `collectDepartures` over
`compileExpandedCascade()`, the pinned inventory, and `collectShippedComponents(readCompatibility())`.
Shipped keys: 31. Compile 378 ms, comparison 916 ms. The comparison read green.

- Departures 880, by member: tokenized 639, dropped 165, aliased 50, declared 26, fallback 0.
- Additions 125, by category: selector 12, declaration 113, property 0, keyframes 0.
- Emitted blocks attributed to a shipped component: 722. Of those, 698 sat at a `(selector, condition)`
  pair the inventory records, 11 at a selector the inventory records under no such condition, and 13
  at a selector the inventory records nowhere.
- The unattributed set, by selector and layer: `:root` in `theme`, `[data-bs-theme=light]` in
  `theme`, `[data-bs-theme=dark]` in `theme`, `.caption-top` in `components`. The inventory records
  the three theme scopes under `theme`, which is not shipped, and `.caption-top` under `table`,
  which is.

The 11 condition-unrecorded sites were `button` under `@media (prefers-reduced-motion: reduce)` and
ten `.btn` focus-visible selectors under `@media (forced-colors: active)`. Every declaration at those
sites was silent, which is the population claim 3 names.

## Per obligation

### 1 — the comparison visits emitted sites (analyst 3)

`tests/setupServer.ts`. `indexRecordingKeys` builds the inventory's selector index once;
`attributeSelector(selector, layer, recording, shipped)` now answers by layer, then by inventory
membership, then by class prefix, and refuses with the selector named when a layer answers to a
withheld component while a shipped component records that selector. A selector recorded only under a
withheld key stops the ladder and stays outside the ledger. `collectAdditions` matches the emitted
site as `(selector, condition)` rather than selector alone, carries `condition` on every row, and
inspects an added selector's custom properties after recording the selector.

`Addition` gained `readonly condition: string | undefined`; `readAdditions` reads a `Condition`
column and refuses a table without one.

Red first, then green, all readings from `npm run test:setup` with the fix in place and the named
mutation applied to `tests/setupServer.ts` from a scratch snapshot:

| Mutation | Plant that reddened | Reading |
| --- | --- | --- |
| `declared` set taken from the selector's rules rather than the matched site's | `names an emitted rule the release records under no such condition`, `reports a planted selector, declaration, and animation name the inventory lacks`, `names a planted unrecorded difference, a planted stale row, and a planted unrecorded name` | 3 failed \| 138 passed (141) |
| membership branch removed from `attributeSelector` | `attributes an emitted selector the official inventory records under a shipped key`, and the same two population plants | 3 failed \| 138 passed (141) |
| added selector's custom-property loop emptied | `names a custom property an added selector declares`, and the same two population plants | 3 failed \| 138 passed (141) |

Restored file digest after every mutation:
`c75d99173e7e77e2b5ab5811948130a23ee61fe57f24676f5a3463dc754b22a1`.

The unattributed set after the change is the three theme scopes alone;
`attributeSelector('.caption-top', 'components', …)` returns `table`.

### 2 — the gates run the scanners the plants exercise (analyst 4)

`tests/setupServer.ts` exports `scanLedgerDrift(measured, written, describe)` returning
`LedgerDrift { unrecorded, stale }`, and `scanShippedDeferrals(deferrals, cascade)`. The
`cascade ledger` drift gates in `tests/conformance.test.ts` read their verdicts from two
`scanLedgerDrift` calls, and the deferral gate from `scanShippedDeferrals`; the plants drive the same
two functions.

Red first: replacing `scanLedgerDrift`'s two filters with empty results left
`npm run test:conformance` green at 17 passed — the tree carries no drift, so the gate cannot catch
its own predicate — while `npm run test:setup` reported `1 failed | 140 passed (141)` on
`names a planted unrecorded difference, a planted stale row, and a planted unrecorded name`. That
pair is the binding the claim asks for. Green after restore: 141 passed, 17 passed.

### 3 — an empty value is a value (analyst 5)

`tests/setupServer.ts`. `collectValueGaps` no longer folds `''` into `undefined` on either side.
`EMPTY_CELL` is `(empty)`, written bare like `—`; `describeValueCell` writes it and `readValueCell`
reads it back, so the row round-trips. `classifyDeparture('invert(1)', '')` answers `declared`,
because the cascade writes the declaration and only its value is empty.

Red first: restoring the `value === '' ? undefined` folding reddened
`reads an empty value cell as a value and an absent one as no declaration`,
`reports a planted tokenized, aliased, declared, dropped, and fallback difference against a written cascade`,
and the population plant — `3 failed | 138 passed (141)`.

The measured empty-value rows, refreshed in the guide:

```text
btn | .btn | --bs-btn-font-family | — | (empty) | var(--vn-font-sans) | tokenized
btn | :root | --bs-btn-close-filter | — | invert(1) grayscale(100%) brightness(200%) | (empty) | declared
btn | [data-bs-theme=light] | --bs-btn-close-filter | — | invert(1) grayscale(100%) brightness(200%) | (empty) | declared
```

The two filter rows moved from `dropped` to `declared`, which is the classification claim 5 requires.

The `:root` addition's reason is corrected. `node_modules/bootstrap/dist/css/bootstrap.css` lines
190-194 declare `:root { scroll-behavior: smooth }` under `@media (prefers-reduced-motion: no-preference)`,
so the release does not leave smooth scrolling to the consumer. The row survives obligation 1's
attribution change, because the rule sits in the `reset` layer and `LAYER_COMPONENTS` answers before
membership, so it is attributed to `reboot` while the inventory records `:root` under `theme`. The
reason now says that.

### 4 — the tag reader reports selected tags (analyst 7)

`tests/setupServer.ts`, `tests/setupStyles.ts`, `tests/conformance.test.ts`. `collectElementTags`
returns the selected tags and closes nothing; `collectMandatedRelatives(selected)` returns the
relatives the content model requires beside a selected tag that no rule selects; `ELEMENT_RELATIVES`
declares `details`, `li`, and `option`. The conformance case asserts the selected set equals the
`ELEMENT_TAGS` tag column less those relatives, and that `collectMandatedRelatives` returns exactly
that declared set. The `ELEMENT_TAGS` doc names the relatives and the binding.

Red first: restoring the pair expansion reddened
`drops a tag the elements layer stops selecting rather than restoring it from the content model` and
`names the tag each elements-layer compound selects and refuses a compound it cannot read` —
`2 failed | 139 passed (141)`. The retained plant removes every `dt` rule from a scratch cascade and
reads `['dl', 'summary']` back, with `collectMandatedRelatives(['dl', 'summary'])` reporting
`['dd', 'details', 'dt']` — the lost tag surfaces in both readings instead of being restored.

Measured in that run: the relatives the reader no longer restores are exactly `details`, `li`, and
`option`.

### 5 — fixtures in the setup module (analyst F1)

`LEDGER_GUIDE`, `LEDGER_CASCADE`, `LEDGER_INVENTORY`, and `LEDGER_SHIPPED` are exported frozen
fixtures of `tests/setupServer.ts` and carry inventory rows in the export case of
`tests/setupServer.test.ts`. `LEDGER_INVENTORY` is typed `OracleInventory` and gained a `table` key
recording `.caption-top`; `LEDGER_CASCADE` gained the `@media print` override, the `.caption-top`
rule, and a custom property on the added `.btn-tertiary` selector, so the planted world carries every
site class the comparison now visits.

### 6 — the counts

`guides/veneer.md` § Outside the ledger names the members it used to count, and "the third" is gone
with them. `tests/setupServer.ts` no longer says "seven cells".

```text
$ grep -n 'three classes of difference\|Two Elements behaviors' guides/veneer.md; grep -n 'seven cells' tests/setupServer.ts
(no output)
```

### 7 — the reviewer's findings

- **Claim 4 (deferral normalization).** The retained plant
  `names a deferred selector the built cascade ships whatever its combinator spacing` writes the
  deferral row as `.btn>.label` against a cascade emitting `.btn > .label`. Replacing
  `normalizeComplexSelector(row.name)` with `row.name` reddens it: `1 failed | 140 passed (141)`.
- **F-1.** The `:root` reason is corrected (obligation 3). I re-read every distinct § Additions
  reason against `node_modules/bootstrap/dist/css/bootstrap.css`. Two were false and are corrected:
  - `reboot | :root | selector` — the release does declare the same rule (`bootstrap.css:190-194`).
  - `table | .table > :not(caption) > * > * { border-color }` and `{ vertical-align }` — the old
    reason said the release sets them on each cell. It does not: `bootstrap.css:1876-1894` sets
    `vertical-align: top` and `border-color` on `.table` and `vertical-align` on `.table > tbody`
    and `.table > thead`, while `.table > :not(caption) > * > *` carries neither. The reason now
    says the release sets them on the table and its row groups.
  - Held after checking the release text: the heading and paragraph margin longhands
    (`bootstrap.css:217-223`, `:269-272`), the `button` reboot rules (`:447-497`, no paint, no
    `button:hover`, `button:active`, `button:focus-visible`, or `button:disabled`), `.btn-check`
    (`:2490-2499`, the `clip` rectangle and no disabled paint), `a.btn[aria-disabled=true]` (no
    `aria-disabled` anywhere in the release), `.btn-link` (`:3306-3320`, no `--bs-btn-hover-bg` or
    `--bs-btn-active-bg`), and `caption` (`:420-425`, longhand padding).
- **F-2.** The § Departures legend now reads: `dropped` writes no declaration at all, `declared`
  writes the value in a form or at a value the other members do not name, and an empty value against
  a recorded one is `declared` rather than `dropped` because the cascade writes the declaration.
  Obligation 3 wins and the legend says so. The introduction states that the comparison is textual
  and names `transparent` against `rgba(0, 0, 0, 0)` and `87.5%` against `0.875em` as rows whose
  computed values match.
- **F-3.** `collectDepartures` is `collectLedger` and `CascadeAddition` is `Addition`, with every
  consumer, inventory row, and guide sentence updated. `collectCascadeAdditions` is `collectAdditions`,
  because the brief's own criterion greps for `CascadeAddition` and that name carried the substring.
  `grep -rn 'collectDepartures\|CascadeAddition' tests guides` prints nothing.
- **F-4.** Every per-component heading is written `#### \`btn\``.
- **Property-fallback loop.** `collectValueGaps` holds the first claim on each
  `selector | condition | property` site and refuses the second with both keys and the site named.
  Plant: `refuses one emitted declaration two shipped components both claim`. Red first with the
  throw disabled: `1 failed | 140 passed (141)`. The real cascade produces no such collision.
- **Refresh command.** § Departures names `npm run build:src && npm run test:conformance` in the
  paragraph before the loop description.
- **§ Files row.** `tests/setupServer.ts` now reads: the installed and built cascade, the guide's
  compatibility, deferral, and ledger tables, the cascade comparison, and the elements-layer tag
  reader.

### 8 — the ledger's home — NOT DONE, deviation

See § Deviations.

## The population, before and after

Departures stayed at 880 rows. No departure row was added or struck; three rows changed cells and
two of those changed member.

| Member | Before | After |
| --- | --- | --- |
| tokenized | 639 | 639 |
| dropped | 165 | 163 |
| aliased | 50 | 50 |
| declared | 26 | 28 |
| fallback | 0 | 0 |

The rows that moved are `btn | :root | --bs-btn-close-filter` and
`btn | [data-bs-theme=light] | --bs-btn-close-filter`, from `dropped` with a `—` Veneer cell to
`declared` with an `(empty)` Veneer cell. The third changed row is
`btn | .btn | --bs-btn-font-family`, whose Bootstrap cell moved from `—` to `(empty)`.

Departures by component are unchanged except `btn`, which reads dropped 67, tokenized 213, aliased 2,
declared 4 (was dropped 69, declared 2).

Additions went from 125 to 157 rows. 32 rows were added and none struck.

| Category | Before | After |
| --- | --- | --- |
| selector | 12 | 13 |
| declaration | 113 | 144 |
| property | 0 | 0 |
| keyframes | 0 | 0 |

By component, before then after: `reboot` selector 9 → 10 and declaration 62 → 63; `btn` selector 3
→ 3 and declaration 43 → 73; `h1` through `h6` one declaration each, unchanged; `table` two
declarations, unchanged.

Every added row is a site the release records for no rule of that selector:

- `reboot | button { transition } | @media (prefers-reduced-motion: reduce)`.
- `reboot | button:focus-visible | @media (forced-colors: active) | selector`.
- Under `@media (forced-colors: active)`, `{ outline }` and `{ box-shadow }` on each of
  `.btn:focus-visible`, `.btn-check:focus-visible + .btn`, `.btn-check:checked + .btn:focus-visible`,
  `:not(.btn-check) + .btn:active:focus-visible`, `.btn:first-child:active:focus-visible`,
  `.btn.active:focus-visible`, `.btn.show:focus-visible`, `.btn-check:checked:focus-visible + .btn`,
  and `.btn-link:focus-visible`.
- Under the same query, `.btn { --bs-btn-color }`, `{ --bs-btn-bg }`, `{ --bs-btn-border-color }`,
  `{ --bs-btn-hover-color }`, `{ --bs-btn-hover-bg }`, `{ --bs-btn-hover-border-color }`,
  `{ --bs-btn-active-color }`, `{ --bs-btn-active-bg }`, `{ --bs-btn-active-border-color }`,
  `{ --bs-btn-disabled-color }`, `{ --bs-btn-disabled-bg }`, and `{ --bs-btn-disabled-border-color }`.

Their reasons are written from `src/styles/_mixins.scss` (the `transition` and `focus-ring` mixins)
and `src/styles/components/_button.scss:212-227` (the forced-colors variable rebind).

The `.caption-top` hole closed without adding a row: the cascade writes exactly the `caption-side`
the release records there, so the now-attributed selector produces neither a departure nor an
addition. The hole is proved closed by the planted `.caption-top` in `LEDGER_CASCADE` instead.

Comparison wall clock after the change: compile 264 ms, comparison 965 ms. The membership reading is
built once per comparison; walking it per rule cost 79 s in a measured probe before
`indexRecordingKeys` replaced it.

## Commands and exit codes

Each of the following ran from `/home/user/veneer-f5b` with npm 11.19.1 on `PATH`. The chain ran
after the final edit, in this order.

```text
npm run format:check      exit=0
npm run lint:check        exit=0
npm run check             exit=0
npm run build             exit=0
npm run test:setup        exit=0   Tests 141 passed (141)
npm run test:conformance  exit=0   Tests 17 passed (17)
npm run test:guides       exit=0   Tests 18 passed (18)
npm run test:policy       exit=0   Tests 109 passed | 1 skipped (110)
```

Earlier readings in the round, each recorded with its purpose: `npm run test:probe` for the
pre-edit and post-edit measurements and the table generation (exit 0 each time, probe deleted);
`npm run test:setup` once per mutation, restoring `tests/setupServer.ts` from a scratchpad snapshot
after each and confirming the digest.

## Acceptance criteria

1. `format:check`, `lint:check`, `check` — exit 0. **Met.**
2. `test:setup` exits 0 with the new plants and the moved fixtures' inventory rows — 141 passed, up
   from 134. **Met.**
3. `npm run build:src && npm run test:conformance` exits 0 over the refreshed ledger — 17 passed.
   **Met.**
4. `test:guides` and `test:policy` exit 0. **Met.**
5. The counts grep prints nothing. **Met.**
6. `ls guides/ledger.md` — **not met**, see § Deviations. `grep -rn 'collectDepartures\|CascadeAddition' tests guides`
   prints nothing. **Met.** `grep -c '^#### ' guides/veneer.md` prints 36, because the ledger's
   per-component headings did not move.
7. `git status --porcelain` lists the first run's files and nothing else. **Met** for the "nothing
   outside the owned set" clause; `guides/ledger.md` and `guides/README.md` are absent, per the same
   deviation.

## Tree state

`git status --porcelain`:

```text
 M guides/veneer.md
 M src/styles/components/_button.scss
 M src/styles/elements/_body.scss
 M src/styles/elements/_button.scss
 M tests/conformance.test.ts
 M tests/fixtures/oracle/inventory.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

`git diff --stat`:

```text
 guides/veneer.md                     | 1449 +++++++++++++++++++++++++++---
 src/styles/components/_button.scss   |    5 +-
 src/styles/elements/_body.scss       |    2 +-
 src/styles/elements/_button.scss     |    5 +-
 tests/conformance.test.ts            |   59 +-
 tests/fixtures/oracle/inventory.json | 1597 +++-------------------------------
 tests/setupServer.test.ts            |  496 ++++++++++-
 tests/setupServer.ts                 | 1214 +++++++++++++++++++++++++-
 tests/setupStyles.test.ts            |    7 +-
 tests/setupStyles.ts                 |   13 +-
 10 files changed, 3167 insertions(+), 1680 deletions(-)
```

Files this round touched, one line each:

- `tests/setupServer.ts` — `Addition` with its condition, `LedgerDrift`, `EMPTY_CELL`, the
  moved fixtures, `ELEMENT_RELATIVES`, `indexRecordingKeys`, `describeValueCell`, `readValueCell`,
  `scanLedgerDrift`, `scanShippedDeferrals`, `collectMandatedRelatives`; the site-wise additions
  walk, the empty-value comparison, the claim refusal, the attribution ladder, the expansion-free
  tag reader, and the renames.
- `tests/setupServer.test.ts` — the local fixtures removed, the import and export inventories
  updated, and the plants for every clause of this brief.
- `tests/conformance.test.ts` — the `cascade ledger` gates read `scanLedgerDrift`,
  `scanShippedDeferrals`, and `collectMandatedRelatives`.
- `tests/setupStyles.ts` — the `ELEMENT_TAGS` doc only: the relatives it carries and the binding
  the conformance case applies.
- `guides/veneer.md` — § Departures introduction, legend, refresh command, and all 880 rows under
  backticked per-component headings; § Additions introduction and all 157 rows with the `Condition`
  column; § Outside the ledger recast without counts; the § Files row.
- `src/styles/**`, `tests/fixtures/oracle/inventory.json`, `tests/setupStyles.test.ts` — untouched
  this round; they carry the first run's writes and the two grants.

## Deviations

1. **Obligation 8 is not done: `guides/ledger.md` cannot reach green, and the gate is outside my
   owned files.**
   - Expected: a second top-level guide at `guides/ledger.md`, with `npm run test:policy` exiting 0.
   - Found: `npm run test:policy` exits 1 on a stub file at that path.

     ```text
     AssertionError: expected [ { rule: 'prose', …(2) } ] to deeply equal []
     +   { "rule": "prose", "path": "guides/ledger.md",
     +     "message": "guide is the package's own, the map, or a catalog row" }
     ❯ tests/policy.test.ts:758  inspectPolicyWorkspace(process.cwd())
     ```

     `inspectPolicyProse` in `tests/setupPolicy.ts` reports every top-level `guides/<name>.md` whose
     name is neither this package's own (`veneer`), nor `README`, nor a row of the Orkestrel catalog.
     `ledger` is none of those, so the file is a stray. `tests/setupPolicy.ts` and
     `tests/policy.test.ts` are vendored scaffold files that `scaffold repair` restores, so no edit
     inside my owned set clears it.
   - Done or not done: **not done.** The tables stay in `guides/veneer.md` under `## Tokens`, and
     `guides/README.md` is untouched. Everything obligation 8 asked for that is independent of the
     move did land: `readDepartures` and `readAdditions` already take a path and the proofs drive
     them through it, the legend and the refresh command sit in the § Departures introduction, and
     the per-component headings are backticked.
   - Hypothesis: the scaffold convention is one authored top-level guide per package, so a second
     ledger document has to be either a nested path (`guides/ledger/<name>.md` passes
     `npm run test:policy`, measured) or a committed data file the same readers parse. Both are the
     Orchestrator's call, not mine.
   - The `ROADMAP.md` § Records patch obligation 8 asks for is therefore void. The first run's
     § Records patch still stands unchanged and is restated in § Shared files.
2. **`collectCascadeAdditions` renamed to `collectAdditions`, beyond the renames F-3 names.**
   Criterion 6 greps for `CascadeAddition`, and `collectCascadeAdditions` carries that substring, so
   the criterion could not pass while the old name stood. The name is also the one the renamed type
   asks for.
3. **`describeValue` renamed to `describeValueCell` mid-round.** `npm run test:policy` reported
   `surface name belongs to one package: describeValue (supervisor)` at `tests/setupServer.ts:1680`.
   The renamed pair reads `describeValueCell` and `readValueCell`.
4. **Ancillary choices taken and recorded.**
   - The attribution ladder is layer, then inventory membership, then class prefix. Membership ahead
     of the layer would have struck the `reboot | :root` addition row, which obligation 3 asks me to
     keep or strike on the evidence; keeping the layer first keeps the row and makes its reason true.
   - A membership hit on a withheld key stops the ladder rather than falling through to the class
     prefix, so a selector the release records under an unshipped key stays outside the ledger
     instead of being claimed by a prefix match.
   - `EMPTY_CELL` is `(empty)`, written bare. No CSS value takes that form, the reader round-trips
     it, and it reads on sight where a symbol would not.
   - `Addition` carries `condition` as a column rather than folding the at-rule into the `Name`
     cell, so the name shapes the guide already documents are unchanged.
   - `scanLedgerDrift` is generic over the row and takes the describer, so one scanner serves the
     departure and addition gates and both plants drive the same code.
   - An added selector contributes a `selector` row and a `property` row per custom property the
     component's vocabulary lacks, and no `declaration` row: the selector row already names the rule.

## Shared files, report-only

`ROADMAP.md` § Records, unchanged from the first run's patch:

```diff
-- Read the machine-read record from `guides/veneer.md` alone: § Compatibility, § Deferred
-  selectors, § Departures from Bootstrap, § Deferred names, and the additions table F5 ACCOUNTING
-  adds. Those sections are the definition of done.
+- Read the machine-read record from `guides/veneer.md` alone: § Compatibility, § Deferred
+  selectors, § Departures, and § Additions. Those sections are the definition of done.
```

In the F5c TOKENS-TRUTH row, the clause `§ Deferred names read or retired` was closed by the first
run and can be struck from that row's scope cell.

## Claims I flag as unverified

- The 32 new § Additions `reason` cells are authored prose bound by no measurement. They are written
  from `src/styles/_mixins.scss` and `src/styles/components/_button.scss`, and a wrong one reads as
  plausible. They are the right target for a checker lane.
- My F-1 re-read grouped the written reason cells by their exact text and ruled each distinct text
  on the release source. It did not re-read every cell against its own site, so a row carrying a
  text I judged true while that row's own site contradicts it would have passed.
- The `declared` rows the first run named as artefact candidates (`transparent` against
  `rgba(0, 0, 0, 0)`, the `em`-against-percentage font sizes, `0` against `0%`) are still recorded
  rather than excluded, and their computed values are still unmeasured in a browser. The
  § Departures introduction now says the comparison is textual and names them, which is the
  disclosure the reviewer's F-2 asked for, not a measurement.
- `npm test` as a whole chain was not run here. The timing-sensitive projects are the Orchestrator's
  reading.
