# LEDGER (`cl`) report

Unit: LEDGER (`cl`), `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-cl` (branch
`unit/cl` from `42fd88e`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/b-cross-cl-brief.md`.
Nothing committed. Deviation state: no stop; the ancillary decisions are recorded under § Decisions.

The ledger reads the release's media conditions and keyframes, per rulings X6 and X7. The priority
case compares each priority at its selector, property, and condition, and it reddens on the
`.offcanvas-sm` swap that the old set comparison passes. The inventory reader keeps a `__proto__`
digest key.

## Touched files

The worktree carries edits to owned files only (`.orkestrel/veneer/units/cl-status.txt`):

- `tests/setupServer.ts`: the row types, the `media` inventory member, the null-prototype digest
  and component maps, the condition-aware `SheetReader` reading, the media and keyframes readers
  and helpers, the keyframes presence gate, the `collectAdditions` keyframe refusal, and their TSDoc.
- `tests/setupServer.test.ts`: the proofs, each with its plant, and the fixture inventories that
  gain the `media` member.

```text
 tests/setupServer.test.ts | 413 +++++++++++++++++++++++++++++++++++++++++++-
 tests/setupServer.ts      | 427 ++++++++++++++++++++++++++++++++++++++++++----
 2 files changed, 805 insertions(+), 35 deletions(-)
```

The shared patch `.orkestrel/veneer/units/cl-shared.patch` targets `42fd88e`, and `git apply --check` exits 0 on
the worktree:

```text
 guides/veneer.md          |   82 +++++++++++++++++++++++++++----
 tests/conformance.test.ts |  120 ++++++++++++++++++++++++++++++++-------------
 tests/setupStyles.test.ts |    1
```

The patch carries these changes:

- `tests/conformance.test.ts`: the priority case, rewritten as a condition-keyed comparison with
  the offcanvas keys as a membership floor, and the `media conditions and keyframes` describe block
  with the media and keyframes parity cases.
- `guides/veneer.md`: the `### Media conditions` and `### Keyframes` subsections placed before the
  `### Deferred selectors` subsection, the § Styles priority sentence, the § Files row for the
  `tests/setupServer.ts` module, and the § Tests conformance and helper sentences.
- `tests/setupStyles.test.ts`: `media: []` on the untyped inventory literal passed to the
  `scanCompatibilityPresence` function. This file sits outside the brief's shared list, but the
  change breaks its typecheck. See § Decisions.

The review evidence sits at the following paths:

- `/home/user/veneer-cl/.orkestrel/veneer/units/cl.diff`
- `/home/user/veneer-cl/.orkestrel/veneer/units/cl-status.txt`
- `/home/user/veneer-cl/.orkestrel/veneer/units/cl-shared.patch`
- `/home/user/veneer-cl/.orkestrel/veneer/units/cl-instruments/cl-mutations.log.txt`
- `/home/user/veneer-cl/.orkestrel/veneer/units/cl-instruments/cl-report.md`

## Readers and row types

The following declarations are exported from the `tests/setupServer.ts` module:

```ts
export interface ConditionRow {
	readonly condition: string // this cascade's form, `{breakpoint}` template kept
	readonly recorded: string | undefined // the release's form; undefined for a `—` cell
	readonly writer: string // the `Written by` cell
}
export interface KeyframesRow {
	readonly name: string
	readonly component: string // the `Key` cell
	readonly motion: string // the `Reduced motion` cell
}
export interface OracleInventory {
	// version, digests, components as before
	readonly media: readonly string[] // the inventory's top-level `media` list
}
export interface SheetDeclaration {
	// selector, property, value, important, layer as before
	readonly condition: string | undefined // enclosing non-layer at-rules, outermost first, joined by ` and `
}

export function readConditions(path?: string): readonly ConditionRow[]
export function readKeyframes(path?: string): readonly KeyframesRow[]
export function collectBreakpoints(declarations: readonly SheetDeclaration[]): ReadonlyMap<string, string>
export function renderBreakpointTemplate(template: string, width: number): string
export function expandConditions(rows: readonly ConditionRow[], ramp: ReadonlyMap<string, string>): readonly ConditionRow[]
export function normalizeMediaFeature(feature: string): string // was module-private; spacing canonicalized
export function collectMediaFeatures(conditions: ReadonlyArray<string | undefined>): readonly string[]
export function collectDeclarationPriorities(declarations: readonly SheetDeclaration[]): ReadonlyMap<string, readonly boolean[]>
```

The following existing functions change behavior:

- `normalizeMediaCondition`: removes the at-rule keyword from every conjunct, and spaces each
  feature the way the expanded compile writes it. For example, `(width>=576px)` and
  `(forced-colors:active)` from the built cascade become the spaced forms.
- `readOracleInventory`: requires a top-level `media` array of strings, and refuses a non-string
  entry with the `Invalid oracle inventory media <value>` message. It writes the digests and the
  components into objects that have no prototype.
- `scanCompatibilityPresence`: for a shipped selector row, requires each animation the vocabulary
  records to be defined. Otherwise it returns the
  `Shipped component <key> is missing keyframes <name>` message.
- `collectAdditions`: checks the record before the name. An animation that any key records is not
  an addition. An animation the record lacks becomes an addition of the shipped key whose name it
  opens with. When no shipped key's name opens it, the function throws the
  `Keyframes <name> answers to no shipped component` error.

## Coverage matrix

Every mutation run is retained in `.orkestrel/veneer/units/cl-instruments/cl-mutations.log.txt`. Each entry records the mutated
site before and after, the command, the exit, the summary lines, and the failing case names. The
drivers are `.orkestrel/veneer/units/cl-instruments/cl-mutate.py`, `.orkestrel/veneer/units/cl-instruments/cl-mutate-2.py`, and
`.orkestrel/veneer/units/cl-instruments/cl-mutate-swap.py`. The specs are `.orkestrel/veneer/units/cl-instruments/cl-mutations-owned.json`,
`.orkestrel/veneer/units/cl-instruments/cl-mutations-shared.json`, `.orkestrel/veneer/units/cl-instruments/cl-mutations-shared-2.json`, and
`.orkestrel/veneer/units/cl-instruments/cl-mutations-shared-3.json`.

| Gate or case | Plant or mutation | Result and failing case |
| --- | --- | --- |
| Presence scan keyframes gate | M1: the gate's `!keyframes.includes(name)` test made unreachable | `test:setup` exit 1, `1 failed \| 294 passed`: "refuses a shipped component whose recorded animation the cascade does not define, which the ledger does not read" |
| Presence scan, real cascade | C5: `@keyframes placeholder-wave` deleted from the built cascade | `test:conformance` exit 1: "carries every shipped component selector and custom property in the built cascade" (`Shipped component placeholder is miss…`) and the keyframes parity case, which also reads the built cascade; the ledger cases stay green |
| `collectAdditions` refusal | M2: the throw replaced by `continue` | `test:setup` exit 1, `1 failed \| 294 passed`: "refuses an animation the inventory records under no key and no shipped key name opens" |
| `__proto__` digest key | M3: `Object.setPrototypeOf(digests, null)` removed | `test:setup` exit 1, `1 failed \| 294 passed`: "keeps a digest and a component the inventory records under the __proto__ key" |
| Inventory `media` member | M8: the reader returns `media: []` | `test:setup` exit 1, `1 failed \| 294 passed`: "pins the copied inventory release and digests and reads its component vocabulary" |
| Condition-keyed priorities (fixture) | M4: key written without the condition | `test:setup` exit 1, `1 failed \| 294 passed`: "keys each declaration's priority by its selector, property, and condition, so a priority swapped between conditions differs" |
| `SheetReader` condition | M5: the `condition` member forced to `undefined` | `test:setup` exit 1, `3 failed \| 292 passed`: the new and the existing conditional-block `SheetReader` cases and the priorities case |
| Feature spacing | M6: the range-spacing rewrite removed | `test:setup` exit 1, `3 failed \| 292 passed`: the normalization case, the features case, and the priorities case |
| Feature spacing, real sheets | C7: the same removal in the scratch copy | `test:conformance` exit 1, `2 failed \| 22 passed`: the priority case (its offcanvas membership floor) and the media parity case |
| Template subtraction | M7: the `- 0.02px` offset multiplied by zero | `test:setup` exit 1, `1 failed \| 294 passed`: "expands each templated condition over the nonzero boundaries of a ramp" |
| Priority case (conformance) | C1: `.offcanvas-sm { background-color }` made important below the boundary and normal above it in the built cascade | `test:conformance` exit 1, `1 failed \| 23 passed`: "compares each declaration's priority on both sheets at its selector, property, and condition" (both keys named) |
| Priority case control | C1b: the `42fd88e` set comparison with the same swap held | `test:conformance` exit 0, `24 passed`, so the old case passes the swap |
| Media parity case | C2: the `print` row removed | `test:conformance` exit 1, `1 failed \| 23 passed`: "writes exactly the media conditions the guide table states, each in the form the release writes" |
| Media parity case | C6: `@media (min-width:600px){.x{color:red}}` planted in the built cascade | `test:conformance` exit 1, `1 failed \| 23 passed`: the media parity case |
| Keyframes parity case | C3: the `placeholder-wave` row removed | `test:conformance` exit 1, `1 failed \| 23 passed`: "defines exactly the animations the guide table names, each under the shipped key that records it" |
| Keyframes parity case | C4: the `placeholder-glow` Key cell set to `spinner` | `test:conformance` exit 1, `1 failed \| 23 passed`: the keyframes parity case |
| Guides gate with a row removed | C2g: the `print` row removed | `test:guides` exit 0, `19 passed`; the parity cases live in the conformance proof, not in the guides proof |

Two readings did not get an isolated red run:

- The media case's § Additions clause, which requires each `—` row's condition to be an Additions
  `Condition` cell, has no isolated red. Every guide mutation that breaks it also breaks another
  clause of the same case.
- The components half of the null-prototype change is asserted in the `__proto__` case. The M3
  mutation reverts only the digests half.

## Failing-first runs

The failing-first run for the owned proofs used the added tests before any implementation:

- Command: `npm run test:setup`, which runs
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
- Red: exit 1, `Tests  12 failed | 283 passed (295)`. The log is
  `.orkestrel/veneer/units/cl-instruments/cl-setup-red.log.txt`.
- Green: exit 0, `Tests  295 passed (295)`. The log is `.orkestrel/veneer/units/cl-instruments/cl-setup-green.log.txt`.
- Baseline before the unit: exit 0, `Tests  285 passed (285)`. The log is
  `.orkestrel/veneer/units/cl-instruments/cl-setup-baseline.log.txt`.

The following cases were red in that run:

- the export list case
- the pins case: the `media` reading
- "keeps a digest and a component the inventory records under the __proto__ key"
- "reads the media condition and keyframes rows only within their Styles subsections"
- "refuses a shipped component whose recorded animation the cascade does not define, which the
  ledger does not read"
- "refuses an animation the inventory records under no key and no shipped key name opens"
- "reads a minified condition and a condition under several at-rules in the range notation"
- "collects each feature a list of conditions writes, once, in the range notation"
- "collects the breakpoint ramp a sheet declares, at the first declaration of each name"
- "expands each templated condition over the nonzero boundaries of a ramp"
- "keys each declaration's priority by its selector, property, and condition, so a priority
  swapped between conditions differs"
- "reads each declaration with the conditional at-rules around it and no layer among them"

Some assertion lines were added after the red run. The direct `normalizeMediaFeature` lines and the
`renderBreakpointTemplate` lines were added to cases that were already red; M6 and M7 turn those
cases red again. The existing conditional-block `SheetReader` expectation was updated to carry the
`condition` member, and M5 turns it red again.

The failing-first runs for the conformance cases in the shared patch are recorded in the mutation
log:

- The parity cases were run on a guide without the subsections (C8, `test:conformance`): exit 1,
  `2 failed | 22 passed`. Both parity cases failed with
  `Condition row <header>: missing Styles / Media conditions subsection` and
  `Keyframes row <header>: missing Styles / Keyframes subsection`.
- The priority case's defect run is C1 (red). Its control is C1b: the old case stays green with
  the swap.

## Gates

The gates ran in the scratch copy at `/home/user/veneer-cl/tmp/probe/cl-scratch`:

- `.orkestrel/veneer/units/cl-instruments/cl-scratch.sh` builds the copy from the worktree's tracked files, links the
  worktree's `node_modules`, runs `git init` so the worktree's `tmp` ignore rule does not hide the
  copy, and applies the `cl-shared.patch` file.
- `.orkestrel/veneer/units/cl-instruments/cl-gates.sh final` runs the gates in the following order. The log is
  `.orkestrel/veneer/units/cl-instruments/cl-gates-final.log.txt`, with one `.orkestrel/veneer/units/cl-instruments/cl-gate-final-<gate>.log.txt` log per
  gate.
- The copy was deleted after the run, with the probes. The same scripts rebuild it.

| Command as run | Script body | Exit | Result line |
| --- | --- | --- | --- |
| `npm run format:check` | `oxfmt --config .oxfmtrc.json --check .` | 0 | `All matched files use the correct format.` (`Finished in 10677ms on 415 files using 4 threads.`) |
| `npm run lint:check` | `oxlint --config .oxlintrc.json --deny-warnings .` | 0 | No diagnostics printed. Control: a planted `export const PLANT: any = 1` reddens it with `typescript(no-explicit-any)`, exit 1; with the plant removed, exit 0 |
| `npm run check` | `tsc --noEmit --project tsconfig.json && npm run check:src && npm run check:app` | 0 | The chain ends at `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` with no diagnostics |
| `npm run build:src` | `npm run build:src:core && npm run build:src:browser && npm run build:src:styles` | 0 | `dist/src/styles/index.css  241.54 kB │ gzip: 30.05 kB`, `✓ built in 1.68s` |
| `npm run test:setup` | `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup` | 0 | `Tests  295 passed (295)` |
| `npm run test:conformance` | `vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance` | 0 | `Tests  24 passed (24)` |
| `npm run test:guides` | `node --experimental-strip-types tests/guides.test.ts` | 0 | `Tests  19 passed (19)` |
| `npm run test:policy` | `vitest run --config vite.config.ts --no-cache --reporter=dot --project policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |

The `test:policy` gate is an addition beyond the criteria. It checks the surface-name and
banned-term rules against the new exports and prose. The whole suite and the `test:service` script
are left to the Orchestrator.

## Guide tables as written

The `### Media conditions` table:

| Condition                                 | Bootstrap 5.3.8                           | Written by                                                            |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| `(width >= {breakpoint})`                 | `(min-width: {breakpoint})`               | The `breakpoint-up` mixin, and the `breakpoint-each` mixin through it |
| `(width < {breakpoint})`                  | `(max-width: {breakpoint} - 0.02px)`      | The `breakpoint-down` mixin                                           |
| `(prefers-reduced-motion: reduce)`        | `(prefers-reduced-motion: reduce)`        | The `reduced-motion` mixin, and the `transition` mixin through it     |
| `(prefers-reduced-motion: no-preference)` | `(prefers-reduced-motion: no-preference)` | The smooth-scrolling rule in the `src/styles/_reset.scss` partial     |
| `print`                                   | `print`                                   | The print pass in the `src/styles/utilities/_display.scss` partial    |
| `(forced-colors: active)`                 | —                                         | The `forced-colors` mixin, and the `forced-ring` mixin through it     |

The `### Keyframes` table:

| Name                   | Key           | Reduced motion                                                                                                                                                            |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `progress-bar-stripes` | `progress`    | Stopped: the `.progress-bar-animated` rule sets its `animation` property to none, so the stripes stand still.                                                             |
| `spinner-border`       | `spinner`     | Slowed: the `.spinner-border` rule sets the `--bs-spinner-animation-speed` property to a `1.5s` duration, twice its resting `0.75s` duration, and the ring keeps turning. |
| `spinner-grow`         | `spinner`     | Slowed: the `.spinner-grow` rule sets the `--bs-spinner-animation-speed` property to a `1.5s` duration, twice its resting `0.75s` duration, and the dot keeps pulsing.    |
| `placeholder-glow`     | `placeholder` | Unchanged: the release writes no reduced-motion rule for a placeholder, so the glow runs.                                                                                 |
| `placeholder-wave`     | `placeholder` | Unchanged: the release writes no reduced-motion rule for a placeholder, so the wave runs.                                                                                 |

The reduced-motion reading comes from a postcss walk of the installed
`bootstrap/dist/css/bootstrap.css` stylesheet. Under `(prefers-reduced-motion: reduce)`, the release
writes these rules:

- `.progress-bar { transition: none }`
- `.progress-bar-animated { animation: none }`
- `.spinner-border, .spinner-grow { --bs-spinner-animation-speed: 1.5s }`

The resting spinner speed is `0.75s`. The release writes no reduced-motion rule for the
`.placeholder-glow .placeholder` or `.placeholder-wave` animation site. The Veneer partials write
the same treatments: the progress partial through the `reduced-motion` mixin, and the spinner
partial through the same mixin. The placeholder partial writes none.

## Decisions

- **The condition-aware reading is a `SheetReader` member, not a separate reader.** The reader
  already walks every declaration's ancestors for its `layer` member, and it is the only reader
  that carries importance. The `readCascadeBlocks` helper carries values but not priority. So the
  `condition` member sits beside the `layer` member on the `SheetDeclaration` type, from the same
  parse.
- **The priority comparison splits selector lists.** The `collectDeclarationPriorities` helper
  splits each selector list and normalizes each member. In the probe over the real sheets, this
  compared 5340 keys where the condition-keyed raw-selector reading compared 3434. Both readings
  found 0 mismatches. The raw-selector reading lost no pair that the set comparison had compared.
- **The brief's `key` arrow function is absent at `42fd88e`.** OFFCANVAS's version builds the pair
  inline. That inline map building moves to the `collectDeclarationPriorities` helper, and the case
  keeps only the comparison.
- **The `normalizeMediaFeature` helper is exported and tested.** It was a hidden module helper, and
  this unit changes it.
- **Animations are attributed record first.** An animation that a withheld key records stays
  outside the ledger, as that key's selectors do, and it is not thrown. The objective lane's
  wording threw whenever the `matchShippedKey` helper found no key. X7's "unattributed" wording and
  X1's record-first rule decide this case.
- **The components map is also written with no prototype.** It is in the same reader and has the
  same defect class. The `__proto__` case asserts both maps.
- **The media case reads the built cascade.** The published artifact writes minified conditions,
  such as `(width>=576px)`. The spacing canonicalization is what makes those conditions comparable,
  and C7 shows that a regression there reddens both conformance cases.
- **The `{breakpoint}` ramp comes from the release's `--bs-breakpoint-*` declarations.** It is
  read through the `collectBreakpoints` helper, not from the cascade. So the Condition-side check
  also holds this cascade's widths against the release. The `xs` boundary is skipped at zero. The
  release's exclusive upper bound is written as the `{breakpoint} - 0.02px` template, which the
  `renderBreakpointTemplate` helper evaluates.
- **The Bootstrap cells are compared by equality.** The expanded Bootstrap cells must equal the
  inventory's `media` features, which is stronger than the verdict's "in the list".
- **The Keyframes row field is named `component`.** The table column is `Key`, as X7 fixes it. The
  field keeps one term with the `component` field of the other row types.
- **The § Files row is reworded to fit the table.** It reads "the rows of every guide table a proof
  reads", which is 233 characters against the table's 242-character widest cell. A longer cell
  reflowed the whole § Files table, which would have been a large three-way merge surface.
- **The `tests/setupStyles.test.ts` file is patched.** Its untyped inventory literal fails the
  typecheck once `OracleInventory` gains the `media` member. The family record lists this file as
  shared and report-only, and the brief's list does not name it. The fix is the one-line patch in
  `cl-shared.patch`. No edit was made in the worktree.
- **The new guide sections sit before `### Deferred selectors`.** They sit with the other § Styles
  ledger tables.

## Observations

- **"Alone" holds for the written fixture.** In the fixture, deleting the keyframe reddens only the
  presence scan: `collectLedger` returns `{ departures: [], additions: [] }` with and without the
  keyframe. In the real run (C5), the keyframes parity case also reddens, because it reads the same
  built cascade. The ledger cases stay green there.
- **RESIDUE may conflict at landing.** RESIDUE's digest pin case sits in the same
  `tests/setupServer.test.ts` region as this unit's pins-case edits, so the three-way merge can
  conflict there. The `Object.keys(inventory.digests)` reading works on the prototype-free map.
  X9 limits RESIDUE's `inventory.json` edit to the `digests` map, so the top-level `media` list
  that this reader requires stays in place. This was not measured against RESIDUE's diff.
- **The duplicated § Styles importance fragment (planner N10) is untouched.** The verdict does not
  give it to LEDGER.
- **Carriers.** This unit closes claim 4 of `oc-audit-verdict.md` and claim 3 of
  `dr-audit-verdict.md`. The fold into `ROADMAP.md` § Carriers is the Orchestrator's.
