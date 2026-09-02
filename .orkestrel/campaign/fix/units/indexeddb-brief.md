# Unit breaking-indexeddb — apply the deferred breaking repairs in indexeddb

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to indexeddb — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/indexeddb.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/indexeddb.md`:

- **s16-10** (mixed): Drop | null from every published query parameter (CursorOptions.query, records/keys/count, readRecords) and retype IndexedDBStoreInterface.path / IndexedDBStore.path from KeyPath | null to KeyPath | undefined, returning the omitted definition path instead of null. — edits: CursorOptions.query change [src/browser/types.ts:210]; IndexedDBIndexInterface.records change [src/browser/types.ts:263]; IndexedDBIndexInterface.keys change [src/browser/types.ts:264]; IndexedDBIndexInterface.count change [src/browser/types.ts:268]; IndexedDBStoreInterface.path change [src/browser/types.ts:290]; IndexedDBStoreInterface.records change [src/browser/types.ts:297]; IndexedDBStoreInterface.keys change [src/browser/types.ts:298]; IndexedDBStoreInterface.count change [src/browser/types.ts:301]; IndexedDBTransactionStoreInterface.records change [src/browser/types.ts:330]; IndexedDBTransactionStoreInterface.keys change [src/browser/types.ts:331]; IndexedDBTransactionStoreInterface.count change [src/browser/types.ts:334]; IndexedDBStore.path change [src/browser/IndexedDBStore.ts:48]; readRecords change [src/browser/helpers.ts:130]
- **s16-12** (remove): Delete the exported rangeExactKey and rangeBetweenKeys wrappers; callers use IDBKeyRange.only and IDBKeyRange.bound. — edits: rangeExactKey remove [src/browser/helpers.ts:187]; rangeBetweenKeys remove [src/browser/helpers.ts:240] — guide: guides/indexeddb.md rangeExactKey and rangeBetweenKeys helper rows, the IDBKeyRange fences, and the batching note that names rangeExactKey
- **s16-15** (mixed): Widen IndexedDBCursorInterface.value to Row | undefined and store undefined for a non-record cursor value instead of masking to {}. — edits: IndexedDBCursorInterface.value change [src/browser/types.ts:232]; IndexedDBCursor.value change [src/browser/IndexedDBCursor.ts:50] — guide: guides/indexeddb.md contract item that a cursor value cannot be undefined and masks a non-record to {}
- **s16-17** (mixed): Remove IndexedDBUpgradeContext.create, drop, store, index, and deindex and extract stores.create/stores.drop plus indexes.create/indexes.drop, after resolving the collision with the existing stores name list. — edits: IndexedDBUpgradeContext.stores change [src/browser/types.ts:128]; IndexedDBUpgradeContext.create remove [src/browser/types.ts:129]; IndexedDBUpgradeContext.drop remove [src/browser/types.ts:130]; IndexedDBUpgradeContext.store remove [src/browser/types.ts:131]; IndexedDBUpgradeContext.index remove [src/browser/types.ts:150]; IndexedDBUpgradeContext.deindex remove [src/browser/types.ts:165] — guide: guides/indexeddb.md IndexedDBUpgradeContext Surface row, Methods rows for create/drop/store/index/deindex, auto-commit paragraph naming those members, and the context.create('meta', …) fence

The fix-round audit findings for this package that this unit also carries:

- s16-08 branches: collapse each isArray overload pair in src/browser/IndexedDBStore.ts (get, has, remove) into one call whose argument is narrowed once, or state the overload-selection reason in a comment
- cross-package: guide unit — make Source.methods follow extends so an interface can share a member set; then indexeddb declares the shared member set once and IndexedDBStoreInterface extends it

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s16-10: no published query parameter admits `null`; `path` returns `KeyPath | undefined`.
- s16-12: `rangeExactKey` and `rangeBetweenKeys` are deleted with their rows, fences, and the batching note.
- s16-15: the cursor value is `Row | undefined` with no `{}` mask; the guide contract item and the cursor pattern are rewritten to the new behavior with an executed assertion.
- s16-17: `IndexedDBUpgradeContext.stores` becomes a manager exposing `names`, `create(name, definition)`, `drop(name)`, and `open(name)`; `indexes` exposes `create(store, definition)` and `drop(store, name)`; the top level declares no `create`, `drop`, `store`, `index`, or `deindex`. The existing `stores: readonly string[]` list becomes `stores.names`.

**Vocabulary.** The naming rule text this phase lands in scaffold's `.claude/rules/names.md`; this
checkout's vendored copy predates it, so apply the text as quoted here:

From `.claude/rules/names.md` § Standalone helpers (scaffold, landed 2026-09-01, fix rounds applied):

- A helper prefix has one project-wide meaning:
  - `extract*` extracts structure.
  - `infer*` derives.
  - `compute*` calculates deterministically.
  - `matches*` is a predicate.
  - `build*` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents; see `create*` and `*Of` in § Fixed derivation/construction forms.
  - `read*` obtains a value from a live host object, a stream position, or a byte layout, returns it or throws, and never coerces; a coercing helper is `parse*` in § Fixed derivation/construction forms.
  - `resolve*` picks the effective value from options and defaults.
  - `scan*` walks a structure and returns its findings.
  - `describe*` takes a finding and returns the human-readable message that names it.
  - `normalize*` returns the canonical form of a value of the same type.
  - `collect*` gathers members into a collection.
  - `render*` produces text or markup from a value that is not a finding.
  - `supports*` is a capability predicate and narrows no type.

From § Fixed derivation/construction forms:

- A form's contract binds a new name; `.claude/rules/architecture.md` § Kind purity names the retained names that keep a form outside its file, such as `createWriteDirectory` and `isVacant`.
- `is*`: total `Guard<T>`; never throws; returns false off-shape.
- `parse*`: coercion producing `T | undefined`; cross-type conversion never belongs in a guard.
- `create*`: the factory form; `.claude/rules/architecture.md` § Kind purity states what a factory is and where it lives.
- `*Of`: combinator named for its constituents, combining them into a container/guard/value, such as `arrayOf(guard)` or `boundsOf(min, max)`.

From § General vocabulary:

- An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing, and its TSDoc names the source it mirrors: the `foreignKeys` key mirrors the `PRAGMA foreign_keys` statement, and the `keepAlive` key mirrors the Ollama `keep_alive` field.
- Mirror no banned word: a mirrored name never uses `kind` or `type` as a member name, and never uses a word § Rejected naming lists. A Compound File Binary (CFB) directory entry's object-type byte takes a named discriminant.

Unchanged and still binding, § Fixed lifecycle vocabulary: `clear` resets state without destroying the entity (`reset` is a banned synonym); `execute` runs a unit of work (`run` and `exec` are banned synonyms); `destroy` ends the entity (`shutdown` is a banned synonym). § Tallies: a lone unambiguous tally is `count`. Placement: `.claude/rules/architecture.md` § Kind purity decides what a factory is and where every function lives; the name form follows placement.

External consumers of each moved symbol (for the record
only; their units follow): `.orkestrel/campaign/fix/breaking-radius.json`.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/quality.md`, `.claude/rules/workspace.md`,
`.claude/rules/portability.md` (all vendored in the repository); skill
`orkestrel-harden-package` in its structural lane with `references/centralization.md`; guide
`guides/indexeddb.md`.

**Host.** Linux, bash. Repository /home/user/fleet/indexeddb on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`.

**Measurements.** `contract`, `guide`, `html`, `markdown`, `test` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract (traversal spines interned as SchemaShaper/ValueInferer/SampleInferer with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults, matchesISOInstant; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). W-DEV landed in @orkestrel/test and @orkestrel/guide (renamed helpers; Source.methods follows extends so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs indexeddb` to see the rows); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Adopt every renamed upstream symbol this package uses in the same change; the typecheck against the staged closure is the list. Do not run npm install..

## Unknowns

none.

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/indexeddb.md`, `guides/README.md` rows for this package, the package's own `README.md`
(it ships in `files` and its fences name the surface), and the parity `INTERNAL` list where the
package keeps one.

**Shared (report-only).** none.

**Off-limits.** `package.json`, `package-lock.json`, `AGENTS.md`, `.claude/**`, `.agents/**`,
`.codex/**`, `.cursor/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, vendored
dependency guide mirrors (`guides/<other-package>.md`), `.orkestrel/**`, `tmp/**`, and every file
outside the repository.

**What asserts the state this change ends.** Every test that names a renamed or removed symbol,
every guide row and fence that spells it, every `@example`, the parity test's `INTERNAL` list, and
any fixture or snapshot carrying the old name. Derive the set by running the suite after the
rename; the red tests are the list.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` is allowed only to converge after `npm run lint`,
then the non-mutating chain proves the state.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Work row by row in the
listed order (a row's `prerequisite` rows first). For each: re-verify the symbol at its ledger
location, apply the rename or removal with every in-package consumer, rewrite the TSDoc first
sentence in the third-person form where you touch a block, move the guide row and every fence,
and update or remove the tests that named the old surface. Sweep prose too: a renamed interface member or helper also appears in backticks, in `{@link}` targets, and in guide sentences, and the parity test resolves only exports, so run a word-boundary search for every old name over `src`, `tests`, and `guides` after the rename and classify every hit before you report. TTTDD binds: change `types.ts` first
where the row moves a contract. Where a row removes a capability, delete its tests and guide
rows with it. After the last row, run the centralization sweep from `references/centralization.md`
over the files you touched, then the gate chain:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per row — applied, or refused with the rule text that refuses it, or stopped
with the deviation; the symbols moved (`from → to`, or removed); files touched; the tests
changed; the gate results with an excerpt for any failure; `git diff --stat`; whether the built
`dist/` moves (always yes for a rename). Delivered as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a row's target name collides with an existing export, when two rows move the
same symbol differently, when a rename would require a change in an off-limits file, or when the
gate chain fails for a cause you cannot attribute. Decide, record, and carry on from the placement
of a moved block within its file and the wording of a rewritten TSDoc sentence.

## Acceptance criteria

1. `grep -rn '\b<old-name>\b' src tests guides` returns no hit for any renamed or removed symbol
   (excluding a deliberate "renamed from" note in a commit-facing comment, which this unit does not
   write).
2. `npm run check` exits 0.
3. `npm run lint:check` and `npm run format:check` exit 0.
4. `npm run build` exits 0 and `npm test` exits 0.
5. `guides/indexeddb.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
