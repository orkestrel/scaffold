# Unit breaking-contract — apply the deferred breaking repairs in contract

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to contract — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/contract.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/contract.md`:

- **s03-01** (mixed): Intern the nine exported traversal spines as class # methods and drop their visited/memo/ancestors/depth parameters from the published surface, leaving schemaToShape, valueToSchema, samplesToSchema, canonicalStringify, and isJSONValue as the doors. — edits: schemaNodeToShape remove [src/core/shapers.ts:1087]; buildShapeFromNode remove [src/core/shapers.ts:912]; buildObjectShape remove [src/core/shapers.ts:783]; inferValue remove [src/core/inferers.ts:380]; inferArray remove [src/core/inferers.ts:459]; inferObject remove [src/core/inferers.ts:576]; inferSamples remove [src/core/inferers.ts:768]; inferRecordSamples remove [src/core/inferers.ts:895]; canonicalizeValue remove [src/core/helpers.ts:1728] — guide: guides/contract.md Shapers/Inferers surface rows for the spines; cited export-law justification at the schemaNodeToShape family
- **s03-06** (option-key): Rename ValueToSchemaOptions.maxDepth and maxProperties to depth and breadth. — edits: ValueToSchemaOptions.maxDepth rename → depth [src/core/types.ts:475]; ValueToSchemaOptions.maxProperties rename → breadth [src/core/types.ts:476] — guide: guides/contract.md ValueToSchemaOptions row and maxDepth/maxProperties Inferers rows
- **s03-10** (rename): Rename the exported validateShapeDepth door to validateShape. — edits: validateShapeDepth rename → validateShape [src/core/compilers.ts:74] — guide: guides/contract.md validateShapeDepth compiler rows and the refuseExpansion remark that keeps that name
- **s03-13** (mixed): Retype ShapeValidatorInterface.expansion from number to number | undefined and return undefined before the first successful validate() and after a failed one, instead of the documented 0 sentinel. — edits: ShapeValidatorInterface.expansion change [src/core/types.ts:1034]; ShapeValidator.expansion change [src/core/ShapeValidator.ts:131]
- **s03-22** (rename): Rename the published INTRINSICS keys describe/reveal, define/declare, and prototype/parent while keeping the table flat; replacement words are not settled. — edits: INTRINSICS.describe rename [src/core/constants.ts:99]; INTRINSICS.define rename [src/core/constants.ts:101]; INTRINSICS.prototype rename [src/core/constants.ts:103]; INTRINSICS.reveal rename [src/core/constants.ts:117]; INTRINSICS.declare rename [src/core/constants.ts:119]; INTRINSICS.parent rename [src/core/constants.ts:121]
- **s03-23** (rename): Rename createStringFaults, createNumberFaults, and createArrayFaults to the build* forms. — edits: createStringFaults rename → buildStringFaults [src/core/helpers.ts:2259]; createNumberFaults rename → buildNumberFaults [src/core/helpers.ts:2328]; createArrayFaults rename → buildArrayFaults [src/core/helpers.ts:2397] — guide: guides/contract.md createStringFaults / createNumberFaults / createArrayFaults compiler rows

The fix-round audit findings for this package that this unit also carries:

- s03-07 rename half: rename isValidISOInstant to matchesISOInstant with its guide row and the classifyFormat call site
- s03-24 siblings: give ShapeCloner, SchemaCloner, and JSONCloner the class-scoped frozen empty-peer pattern main landed in ContractCompiler (7e762ab), dropping their per-instance #empty* fields
- s03-02 guide: move the CONTRACT_CODES row into the ContractError section beside ContractCode
- report amendment: mark s03-24 superseded in the Dispositions list

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s03-22: keep the flat `Object` and `Number` operations; gather the proxy-visible operations under one frozen `reflect` sub-entity: `INTRINSICS.reflect.read`, `.write`, `.members`, `.present`, `.describe`, `.define`, `.prototype`, `.apply`, `.construct`. The axis is proxy visibility. Every in-package reader of the old flat keys moves.
- s03-06: group under `limits`: `ValueToSchemaOptions.limits.depth` and `limits.properties`, matching the `MultipartLimits` precedent; `breadth` is refused.
- s03-23: the `build*` names as the ledger has them.
- s03-13: `expansion` is `number | undefined`; the guide row and its fence transcription move to the new behavior.
- s03-01: the traversal spines become `#` methods and no published signature carries a state parameter; the doors keep their signatures.

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
`guides/contract.md`.

**Host.** Linux, bash. Repository /home/user/fleet/contract on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`.

**Measurements.** `guide`, `html`, `markdown`, `test` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** The W-DEV wave landed in @orkestrel/test (browser style helpers renamed to readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends); both are staged in this checkout's closure, so tests that name a renamed helper move in this unit..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/contract.md`, `guides/README.md` rows for this package, and the parity `INTERNAL` list
where the package keeps one.

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
5. `guides/contract.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
