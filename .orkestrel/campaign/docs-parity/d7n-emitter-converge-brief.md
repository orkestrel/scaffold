# Brief — P.2 `d7n-emitter-converge` (emitter under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/emitter` from the committed baseline `3c0e3de` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/emitter.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/emitter/guides/emitter.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-emitter-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/emitter.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/emitter.md function createEmitter: guide "Create an `EmitterInterface<TMap>`, optionally with initial `on` hooks." source "Creates a typed event emitter — the foundational observable primitive."
guides/emitter.md function extractKeys: guide "Extract an object's own enumerable keys, typed as its key union." source "Extracts the own enumerable keys of a mapped object, typed as its key union."
guides/emitter.md class Emitter: guide "The typed synchronous emitter; entities own one as `#emitter`." source "Implements a typed synchronous event emitter — the foundational observable primitive of the codebase. Stateful entities OWN one as a `#emitter` field and expose it through `readonly emitter`; they never inherit from it."
guides/emitter.md type EventMap: guide absent source "Maps each event name to the argument tuple its listeners receive."
guides/emitter.md type EmitterHandler: guide absent source "Represents a listener for one event's argument tuple."
guides/emitter.md type EmitterErrorHandler: guide absent source "Represents the emitter's OWN listener-error handler — invoked when a listener throws during `emit`, with the caught error and the (stringified) event name."
guides/emitter.md type EmitterHooks: guide absent source "Declares the initial event listeners for an emitter — the reserved `on` option: a partial map of event name to its handler, wired at construction."
guides/emitter.md interface EmitterOptions: guide absent source "Configures `createEmitter` and the `Emitter` constructor."
guides/emitter.md interface EmitterInterface: guide absent source "Represents a typed synchronous event emitter — the foundational observable primitive. Entities OWN one as `#emitter` and expose `readonly emitter`; they never inherit from it."
guides/emitter.md EmitterInterface.on: guide absent source "Registers a listener for an event. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.once: guide absent source "Registers a listener that removes itself after its first call. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.off: guide absent source "Removes a listener registered for an event, including one registered through `once`."
guides/emitter.md EmitterInterface.emit: guide absent source "Invokes an event's listeners synchronously, in registration order. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.count: guide absent source "Returns the live listener count."
guides/emitter.md EmitterInterface.clear: guide absent source "Drops registered listeners, leaving the emitter usable and `destroyed` unchanged."
guides/emitter.md EmitterInterface.destroy: guide absent source "Tears down the emitter: drops every listener and sets `destroyed` to `true`. Idempotent."
guides/emitter.md pitch: readme absent tagline "The foundational observable primitive: a typed, synchronous event emitter. Every stateful entity in the codebase — a queue, a database table, an agent — that has lifecycle transitions or observable operations owns one `Emitter<TMap>` as a `#emitter` field and exposes it through a `readonly emitter` property; consumers subscribe through `entity.emitter.on(...)`. Composition, never inheritance: an entity threads its event map and an optional error handler into the emitter and otherwise forgets it exists. It is deliberately small. There is no scheduler — `emit` fires listeners in the current tick, in registration order. There is no listener cap, no `max`-listeners warning, and no `console` output. `on` returns `void`, not an `Unsubscribe`. What it does carry is the one invariant a fan-out primitive can't omit: a throwing listener is isolated so it can never take down its siblings or the emit loop. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 17
exit 1
```

## Facts for emitter (taken 2026-09-07T15:12Z by facts.sh)

- Checkout `/home/user/fleet/emitter`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `3c0e3de`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 0 | banned 2 | src/core/Emitter.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                    | Tests                                 |
    8:| ------- | -------------------------- | ------------------------- | ------------------------------------- |
    9:| Emitter | [`emitter.md`](emitter.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                      |
    14:| ---------- | -------------------------- |
    15:| `src/core` | [`emitter.md`](emitter.md) |
- Guide `guides/emitter.md`: 218 lines. Headings:
    1:# Emitter
    7:## Surface
    36:### Factories
    42:### Helpers
    48:### Entities
    54:### Types
    67:## Methods
    71:#### `EmitterInterface`
    85:## Contract
    99:## Patterns
    101:### Standalone emitter
    118:### Own an emitter
    174:### Manage listeners
    200:### Practices
    208:## Tests
    215:## See also
- Table headers in `guides/emitter.md` (a header row is the row before a `| ---` row):
    38: | API             | Kind     | Summary                                                                 |
    44: | API           | Kind     | Summary                                                          |
    50: | API       | Kind  | Summary                                                        |
    56: | Type                  | Kind      | Shape                                                                                                       |
    75: | Method    | Returns  | Behavior                                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    52:  `Emitter` | class
- H1 blockquote (`guides/emitter.md`):
    3: > The foundational observable primitive: a typed, **synchronous** event emitter. Every stateful entity in the codebase — a queue, a database table, an agent — that has lifecycle transitions or observable operations **owns** one `Emitter<TMap>` as a `#emitter` field and exposes it through a `readonly emitter` property; consumers subscribe through `entity.emitter.on(...)`. Composition, never inheritance: an entity threads its event map and an optional error handler into the emitter and otherwise forgets it exists.
    4: >
    5: > It is deliberately small. There is no scheduler — `emit` fires listeners in the current tick, in registration order. There is no listener cap, no `max`-listeners warning, and no `console` output. `on` returns `void`, not an `Unsubscribe`. What it _does_ carry is the one invariant a fan-out primitive can't omit: a throwing listener is isolated so it can never take down its siblings or the emit loop. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Create a standalone emitter, subscribe, and fire events synchronously:
- README (`README.md`) first lines:
    # @orkestrel/emitter
    
    A typed, **synchronous** event emitter — the foundational observable
    primitive that stateful entities (a queue, a database table, an agent) own to
    expose their lifecycle transitions and observable operations. Deliberately
    small: no scheduler (listeners fire in the current tick, in registration
    order), no listener cap, no `console` output. What it does carry is the one
    invariant a fan-out primitive can't omit — a throwing listener is isolated so
    it can never take down its siblings or the emit loop; the throw routes to an
    optional `error` handler instead of being rethrown. Part of the `@orkestrel`
    line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    103: fence under "### Standalone emitter"
    122: fence under "### Own an emitter"
    178: fence under "### Manage listeners"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:29:export function createEmitter<TMap extends EventMap>(
    src/core/Emitter.ts:49:export class Emitter<TMap extends EventMap> implements EmitterInterface<TMap> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:1
    src/core/helpers.ts:1
    src/core/Emitter.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    3:// `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES` constants are this
    20:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    50:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    95:		for (const group of guide.methods()) {
    96:			const members = source.methods(group.interface).map((method) => method.name)
    104:					expect(findMissing(members, documented)).toEqual([])
    107:					expect(findMissing(documented, members)).toEqual([])
    113:							: findMissing(
    114:									source.methods(entity).map((method) => method.name),
    132:				findUnexampled(
    135:					source.examples().map((example) => example.name),
    140:		for (const group of guide.methods()) {
    151:							? source.examples(group.interface).map((example) => example.name)
    155:									.concat(source.examples(entity).map((example) => example.name))
    156:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    168:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 208:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/emitter.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/emitter.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-emitter-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
