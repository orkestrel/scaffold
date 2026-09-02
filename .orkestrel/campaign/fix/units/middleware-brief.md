# Unit breaking-middleware — apply the deferred breaking repairs in middleware

## Role and engine

`implementer` on Claude Opus 5, reached as a native subagent (the Sol bench is dark; substitution
recorded). You perform the assignment directly and spawn nothing.

## Objective

Apply every breaking row assigned to middleware — renames, removals, signature and option-key
changes, and the behavior rulings — with every in-package consumer, test, guide row, parity list,
and `@example` updated atomically, so the package's own gate chain reads green against the new
surface. No compatibility alias, re-export, or shim.

## Context

**Evidence.** The rows, each with its ledger record in
`.orkestrel/campaign/fix/breaking-ledger.json`, its finding text and corrected repair under
`## <id>` in `.orkestrel/campaign/fix/middleware.md`, and the writer's deferral note in
`.orkestrel/campaign/fix/reports/middleware.md`:

- **referral s11-Q2** (signature): Change set to set(session, now), constrain S extends SessionInterface on SessionStoreInterface, SessionOptions, MemorySessionStore, DatabaseSessionStore, and createMemorySessionStore, and derive id from session.id, which removes MemorySessionStore as a general expiring LRU over non-session payloads. — edits: SessionStoreInterface.set change [src/core/types.ts:371]; SessionStoreInterface change [src/core/types.ts:369]; SessionOptions change [src/core/types.ts:486]; MemorySessionStore.set change [src/core/stores/MemorySessionStore.ts:90]; MemorySessionStore change [src/core/stores/MemorySessionStore.ts:36]; DatabaseSessionStore.set change [src/core/stores/DatabaseSessionStore.ts:72]; createMemorySessionStore change [src/core/factories.ts:107] — guide: guides/middleware.md SessionStoreInterface Methods, createMemorySessionStore factory row, and store set(id, session, now) fences
- **referral s11b-Q1a (option)** (option-key): Add a capacity member to AssetOptions with LRU eviction across identities, brotlis, and tags; the documentation-only finiteness requirement is already applied. — edits: AssetOptions change [src/server/types.ts:46] — guide: guides/middleware.md Assets section (finiteness requirement already stated)
- **s11-01** (mixed): Remove the Session and MultipartParser class imports from the leaf pair; restoreSession cannot leave helpers.ts under its current name, and resolveDefaultDirectory has no legal home outside the leaf except deletion (parseMultipartRequest can keep the parse* name in parsers.ts). — edits: restoreSession rename → createRestoredSession [src/core/helpers.ts:585]; resolveDefaultDirectory remove [src/server/helpers.ts:426] — guide: guides/middleware.md restoreSession and resolveDefaultDirectory Surface rows
- **s11-02** (rename): Move restoreSession to factories.ts as createRestoredSession(value): Session | undefined. — edits: restoreSession rename → createRestoredSession [src/core/helpers.ts:585] — guide: guides/middleware.md restoreSession Surface row and fences
- **s11-04** (remove): Delete resolveDefaultDirectory; parseMultipartRequest should call MultipartParser.directory() after that function leaves the leaf. — edits: resolveDefaultDirectory remove [src/server/helpers.ts:426] — guide: guides/middleware.md resolveDefaultDirectory Surface row
- **s11-06** (mixed): Rename MultipartError.reason to code and rename MultipartReason and MULTIPART_REASON_STATUS with it; the replacement type/constant names are not settled. — edits: MultipartError.reason rename → code [src/server/errors.ts:27]; MultipartReason rename [src/server/types.ts:131]; MULTIPART_REASON_STATUS rename [src/server/constants.ts:5] — guide: guides/middleware.md MultipartReason Types row, MULTIPART_REASON_STATUS Constants row, and MultipartError Methods/error rows
- **s11-12** (mixed): Retype SessionInterface.data to ReadonlyMap and add required one-word set/delete/clear mutators on the interface (and Session), routing transferSessionData and restoreSession through them. — edits: SessionInterface.data change [src/core/types.ts:309]; Session.data change [src/core/Session.ts:20] — guide: guides/middleware.md SessionInterface data remarks and session fences that write session.data directly
- **s11-14** (rename): Rename SessionTransport to SessionTransportInterface. — edits: SessionTransport rename → SessionTransportInterface [src/core/types.ts:451] — guide: guides/middleware.md SessionTransport Types row, Methods group key, createCookieTransport/createHeaderTransport rows, and fences
- **s11-15** (mixed): Rename SessionCursors.lastSeen/createdAt (inherited by SessionRow and SessionEntry) to seen/created, rename ClientInfo to Client, and rename SessionInterface.data; the replacement noun for data is not settled. — edits: SessionCursors.lastSeen rename → seen [src/core/types.ts:400]; SessionCursors.createdAt rename → created [src/core/types.ts:401]; ClientInfo rename → Client [src/core/types.ts:289]; SessionInterface.data rename [src/core/types.ts:309] — guide: guides/middleware.md ClientInfo, SessionInterface.data, SessionRow/SessionCursors rows, and session snapshot fences
- **s11-17** (mixed): Regroup MultipartLimits to { file: { size, count }, field: { size, count }, total } and change resolveMultipartLimits's published return type to match. — edits: MultipartLimits.file change [src/server/types.ts:101]; MultipartLimits.files remove [src/server/types.ts:102]; MultipartLimits.field change [src/server/types.ts:103]; MultipartLimits.fields remove [src/server/types.ts:104]; resolveMultipartLimits change [src/server/helpers.ts:401] — guide: guides/middleware.md MultipartLimits Types row and createMultipart limits remarks
- **s11-18** (mixed): Rename UploadedFileInterface to UploadedFile and rename PartHeaders.contentType (and parsePartHeaders's return shape); the replacement for contentType is not settled. — edits: UploadedFileInterface rename → UploadedFile [src/server/types.ts:163]; PartHeaders.contentType rename [src/server/types.ts:179] — guide: guides/middleware.md UploadedFileInterface Types row and parsePartHeaders/createUploadedFile rows
- **s11-23** (rename): Rename only and except to createOnly and createExcept; reject createScoped. — edits: only rename → createOnly [src/core/middlewares.ts:881]; except rename → createExcept [src/core/middlewares.ts:906] — guide: guides/middleware.md only and except Surface rows, contract item on only/except, and fences
- **s11-24** (mixed): Rename SessionOptions.require to required and delete ends together with the unscoped DELETE short-circuit in createSession. — edits: SessionOptions.require rename → required [src/core/types.ts:495]; SessionOptions.ends remove [src/core/types.ts:496] — guide: guides/middleware.md SessionOptions Types row (require/ends) and session DELETE contract/fences
- **s11-25** (union-member): Drop the boolean arm of StaticOptions.fallback so the key is only { exclude? }, with absence meaning off and {} meaning on. — edits: StaticOptions.fallback change [src/server/types.ts:82] — guide: guides/middleware.md StaticOptions Types row and Static SPA-fallback fence that uses fallback: true
- **s11-27** (behavior): Make DatabaseSessionStore throw TypeError on a malformed ttl/lifetime the way MemorySessionStore already does, via one shared validator called from both constructors. — edits: DatabaseSessionStore change [src/core/stores/DatabaseSessionStore.ts:52]; createDatabaseSessionStore change [src/core/factories.ts:134] — guide: guides/middleware.md createDatabaseSessionStore factory row (no @throws today) versus createMemorySessionStore

The fix-round audit findings for this package that this unit also carries:

- s11b-11: give src/server/types.ts:177 the three-step mime chain its twin at :141-143 states
- s11-08 guide: write the Validators — core intro as a complete sentence or drop it to match the sibling sections

**Rulings.** The Orchestrator's rulings for this package, reconciled from the two blind design
lanes in `.orkestrel/campaign/fix/breaking-plan.md`; a row marked REFUSED closes refused with the
rule text quoted in the report and no edit:

- s11-01 is the carrier of s11-02 and s11-04: `restoreSession` → `createRestoredSession` in `factories.ts`; `resolveDefaultDirectory` is deleted (a one-line delegate). The keep-the-name move is unavailable because the vendored policy sweep name-gates `factories.ts` (`create*`) and `parsers.ts` (`parse*`).
- s11-06: `MultipartError.code`, `MultipartErrorCode`, `MULTIPART_STATUS` replace the reason family.
- s11-12 with s11-15 as one edit: `SessionInterface.data` → `state`, a `ReadonlyMap` with `set`, `delete`, and `clear` mutators; the interface `@remarks`, the `Session` TSDoc, and the guide move. `values` and `store` are refused (collide with `Map.prototype.values` and `SessionStoreInterface`).
- s11-18: `PartHeaders.contentType` → `mime`; `UploadedFileInterface` drops its suffix only if it declares no call signature (test it and report).
- s11-24: the `ends` option and the DELETE short-circuit go.
- referral s11-Q2: `SessionStoreInterface.set(session, now)` with `S extends SessionInterface` on the interface, options, both stores, and the factory, per `.orkestrel/campaign/fix/referrals-middleware-report.md`.
- s11-14, s11-17, s11-27: as the ledger has them.
- s11-23: REFUSED. `only` and `except` keep their names: names.md § Standalone helpers permits a one-word helper whose meaning and arguments are unmistakable, and no `create*` gate reaches `middlewares.ts`.
- s11-25: REFUSED. The boolean `fallback` arm stands: dropping it makes `fallback: {}` mean on, an empty-object sentinel AGENTS.md § Design laws bans.
- referral s11b-Q1a (option): REFUSED. AGENTS.md § Design laws, Minimal public API; the finiteness documentation already landed and closes the referral.
- Quote each refusing rule's text in the report.

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
`guides/middleware.md`.

**Host.** Linux, bash. Repository /home/user/fleet/middleware on branch `claude/orkestrel-npm-audit-deps-14ibta`,
committed clean at the launch, `node_modules` installed. Network reaches the registry; you do not
need it. Do not run `npm install`.

**Measurements.** `abort`, `budget`, `codec`, `contract`, `database`, `emitter`, `guide`, `html`, `indexeddb`, `markdown`, `router`, `server`, `sqlite`, `test`, `timeout` (see `.orkestrel/campaign/fix/tarballs.json` for the tarball, version, and the registry range still declared) (dependency tarballs already staged by the Orchestrator with
`npm install --no-save` and verified file-by-file against their register rows, so this package's
imports of a renamed upstream symbol resolve; the manifest still declares the registry range and
stays untouched). `test:distribution` is not in `npm test` and is not a criterion while a tarball is
staged.

**Control identifiers.** none. A test is named for what it proves, never for a control label.

**Standing conditions.** L0 landed: @orkestrel/contract at 2c15840 (main's latest reconciled; traversal spines interned with no state parameter on any door; ValueToSchemaOptions.limits.depth/.properties with ValueToSchemaLimits; INTRINSICS.reflect.{read,write,members,present,describe,define,prototype,apply,construct} replacing the flat reveal/declare/parent and the flat Reflect keys; validateShape, buildStringFaults/buildNumberFaults/buildArrayFaults with a trailing pattern argument, matchesISOInstant, ownPattern; expansion is number | undefined), @orkestrel/msg (category discriminants, MSG_CATEGORY_*), @orkestrel/sse (clear() replaces reset()). L1 landed so far: @orkestrel/budget (BudgetOptions.consumer replaces consume), @orkestrel/csv (renderTSV gone; ParseOptions.comment has no false arm; parseInteger/parseReal/parseBoolean in parsers.ts), @orkestrel/html (HTMLHandlerMap, HTMLSanitizeOptions, HTMLDistillOptions; the create*Contract doors deleted), @orkestrel/ndjson (clear() replaces reset()); indexeddb and sqlite are still in flight and their registry-equivalent tips are staged. W-DEV landed in @orkestrel/test (readStyle, readToken, readRootToken, readPixels, parseCSSColor, matchesColor; PortfolioInterface.placements) and @orkestrel/guide (helpers renamed verb-first; Source.methods follows extends, so an extending interface's Methods table must list inherited members). Every one of these is staged from its committed tip in this checkout's closure and verified (run `node /home/user/work/verify-stage.mjs middleware`); this checkout's tests/guides.test.ts already imports the renamed guide helpers. Run npm run check first and read the red as the adoption list; adopt every renamed upstream symbol in the same change. Do not run npm install..

## Unknowns

Some rows carry no target name (the distillation left alternatives under Unknowns in the chunk report); the plan's ruling for each is stated in the row summary above, and where it is not, stop and report the row..

## Scope

**Owned.** `src/**`, `app/**` (if present), `tests/**` except the vendored policy pair,
`guides/middleware.md`, `guides/README.md` rows for this package, the package's own `README.md`
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
5. `guides/middleware.md` names every new symbol and no removed one (`npm run test:guides` is inside
   `npm test`).

**Observations, not criteria.** The whole-suite `npm test` timing on this loaded host; report a
timing-suspect failure with the failing test's name and leave it for the Orchestrator's
authoritative re-run.

## Review evidence

The actual diff (`git diff`) and the actual status output (`git status --short`) at return, which
the Orchestrator renders for the audit lanes.
