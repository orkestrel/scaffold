# Unit breaking-middleware — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **adopt-upstream-budget** — applied: npm run check red on entry named exactly one adoption: BudgetOptions.consume -> consumer at src/core/middlewares.ts:603 (createLimiter's per-key bucket). No other staged upstream rename reached this package's imports; the second and third check passes (check:src:core, check:src:server) then ran clean, so the adoption list was that single row.
- **referral s11-Q2** — applied: SessionStoreInterface.set(session, now) replaces set(id, session, now); both stores derive the id from session.id. S is constrained to extends SessionInterface on SessionStoreInterface, SessionEntry, SessionOptions, MemorySessionStore, DatabaseSessionStore (already defaulted to Session) and createMemorySessionStore. MemorySessionStore is therefore no longer a general expiring LRU over non-session payloads: its tests moved from MemorySessionStore<string> with 'payload' values to Session entities.
- **s11b-Q1a (option)** — refused: REFUSED per ruling. AGENTS.md § Design laws: "**Minimal public API.** Add or substantively expand a capability with its first real consumer; do not speculate. This is a creation gate, never a later visibility gate." No capacity member added to AssetOptions; the finiteness requirement already stated on AssetOptions.source and in the guide's Assets section is unchanged and closes the referral. No edit.
- **s11-01** — applied: Both leaf files are class-free. src/core/helpers.ts no longer imports Session (restoreSession left with s11-02). src/server/helpers.ts no longer imports MultipartParser or MultipartError: resolveDefaultDirectory was deleted (s11-04) and parseMultipartRequest moved to the new src/server/parsers.ts, which keeps its parse* name under the vendored policy sweep's factories/parsers name gate. Verified: helpers.ts and validators.ts in both environments now import only types, constants, and sibling leaves.
- **s11-02** — applied: restoreSession -> createRestoredSession(value: unknown): Session | undefined, moved from src/core/helpers.ts to src/core/factories.ts, routed through the new Session mutators. stores/DatabaseSessionStore.ts imports it from '../factories.js'. Its tests moved from tests/src/core/helpers.test.ts to tests/src/core/factories.test.ts.
- **s11-04** — applied: resolveDefaultDirectory deleted (a one-line delegate to MultipartParser.directory()). parseMultipartRequest now calls MultipartParser.directory() directly. The guide's Helpers - node row is gone; the test that stat'd the memoized directory now drives the real default path (parse with no directory option, stat dirname(file.path)) and still asserts mode 0o700.
- **s11-06** — applied: MultipartError.reason -> code; MultipartReason -> MultipartErrorCode; MULTIPART_REASON_STATUS -> MULTIPART_STATUS. isMultipartError narrows on 'code'. HTTPError (the base) declares no code member, so there is no collision. The literal values ('limit' | 'malformed' | 'rejected') are unchanged - the ruling named the type and constant only.
- **s11-12 + s11-15 (data)** — applied: SessionInterface.data -> state: ReadonlyMap<string, unknown>, with required one-word set/delete/clear mutators on the interface and on Session (which now holds a #state field and exposes a readonly getter). transferSessionData reads from.state and writes through to.set; createRestoredSession writes through session.set; snapshotSession reads session.state. isSession checks id, a Map state, and all three mutators. SessionSnapshot.data is deliberately unchanged - it is the persisted wire member, not the entity member, and no ledger row moves it.
- **s11-14** — applied: SessionTransport -> SessionTransportInterface across types, factories, middlewares, tests, and the guide (Types row, Methods group key, createCookieTransport/createHeaderTransport rows, fences).
- **s11-15** — applied: SessionCursors.lastSeen -> seen and createdAt -> created, inherited by SessionRow and SessionEntry, carried through sessionColumns in src/core/shapers.ts (the database column names move with the row), both stores, sessionExpired, and the guide. ClientInfo -> Client, with ClientState.client retyped.
- **s11-17** — applied: MultipartLimits regrouped to { file: { size, count }, field: { size, count }, total } with required members, and a new MultipartLimitsInput carries the caller's partial form (MultipartOptions.limits names it). resolveMultipartLimits(limits: MultipartLimitsInput | undefined): MultipartLimits replaces the Required<MultipartLimits> return, resolving one default per omitted leaf. MultipartParser reads limits.file.count / limits.file.size / limits.field.count / limits.field.size.
- **s11-18** — applied: Suffix test run and reported: @orkestrel/guide's Source.methods('UploadedFile') over src/server returns [] - the interface declares no call signature through its extends chain into MultipartFile (MultipartFile and UploadedFileInput also return []). names.md § Type-level identifiers puts plain non-behavioral data at {Entity}, so UploadedFileInterface -> UploadedFile. PartHeaders.contentType -> mime, with parsePartHeaders's return shape and MultipartParser's destructuring updated.
- **s11-23** — refused: REFUSED per ruling. .claude/rules/names.md § Standalone helpers: "A one-word helper is valid only when its meaning and arguments are unmistakable: `delay`, `clamp`, `tokenize`, `similarity`." only(paths, handler) and except(paths, handler) meet that test. .claude/rules/architecture.md § Kind purity gates names only in two files - "Every exported function in `parsers.ts` is named `parse*`. Every exported function in `factories.ts` is named `create*`." - and neither reaches middlewares.ts. No edit; createScoped also rejected.
- **s11-24** — applied: SessionOptions.require -> required (option, its TypeError message, and the guide row). SessionOptions.ends removed together with the unscoped `context.method === 'DELETE'` short-circuit in createSession. The guide's session contract item now states that the battery installs no route and that a consumer ending a session on DELETE mounts its own handler over control.destroy(). Two tests that drove `ends` were deleted with the capability.
- **s11-25** — refused: REFUSED per ruling. AGENTS.md § Design laws: "**Absence is `undefined`.** Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`." Dropping the boolean arm would make `fallback: {}` the on-switch - an empty-object sentinel - and would leave a binary behavioural switch expressed as object-or-absent rather than as the boolean the sibling law requires ("**Boolean behavior.** A binary behavioral switch is a boolean, not a two-literal union."). StaticOptions.fallback keeps `boolean | { exclude? }`. No edit.
- **s11-27** — applied: New exported validateSessionLimits(limits: SessionLimits | undefined): void in src/core/helpers.ts throws TypeError on a non-finite or non-positive ttl or lifetime; both MemorySessionStore's and DatabaseSessionStore's constructors call it, so the same malformed ttl is now refused by either store. createDatabaseSessionStore gained the matching @throws row. MemorySessionStore's four hand-rolled ttl/lifetime throws collapsed into the one call; its capacity and evict guards stay local because they are its own options. Direct coverage added in tests/src/core/helpers.test.ts.
- **s11b-11** — applied: UploadedFileInput's `mime` remark now states the same three-step chain its twin UploadedFileInterface (now UploadedFile) states: sniffed when a signature matches, otherwise the declared Content-Type, otherwise DEFAULT_CONTENT_TYPE. Documentation row only - the h12 ruling this brief carries reshapes the finding away from changing MultipartParser's `mime: detected ?? declared`, which is unchanged.
- **s11-08 guide** — applied: The Validators - core intro was a bare noun phrase ("The total `(unknown) => value is T` guards, each safe against any input:"). Rewritten as a complete sentence per .claude/rules/writing.md § Structure: "Each guard below is total: it accepts any input, returns `false` off-shape, and never throws."

## Symbols moved

- restoreSession → createRestoredSession (src/core/helpers.ts → src/core/factories.ts)
- resolveDefaultDirectory → removed (src/server/helpers.ts)
- parseMultipartRequest → moved (src/server/helpers.ts → src/server/parsers.ts, name unchanged)
- validateSessionLimits → added (src/core/helpers.ts)
- SessionTransport → SessionTransportInterface
- ClientInfo → Client
- SessionInterface.data → SessionInterface.state (ReadonlyMap) + set/delete/clear
- Session.data → Session.state (getter over #state) + set/delete/clear
- SessionCursors.lastSeen → seen
- SessionCursors.createdAt → created
- sessionColumns.lastSeen → seen
- sessionColumns.createdAt → created
- SessionStoreInterface.set(id, session, now) → set(session, now)
- SessionStoreInterface<S> → SessionStoreInterface<S extends SessionInterface>
- SessionEntry<S> → SessionEntry<S extends SessionInterface>
- SessionOptions<S, TState> → SessionOptions<S extends SessionInterface, TState>
- MemorySessionStore<S> → MemorySessionStore<S extends SessionInterface>
- createMemorySessionStore<S> → createMemorySessionStore<S extends SessionInterface>
- SessionOptions.require → required
- SessionOptions.ends → removed
- MultipartError.reason → MultipartError.code
- MultipartReason → MultipartErrorCode
- MULTIPART_REASON_STATUS → MULTIPART_STATUS
- UploadedFileInterface → UploadedFile
- PartHeaders.contentType → PartHeaders.mime
- MultipartLimits.{file,files,field,fields,total} → MultipartLimits.{file:{size,count},field:{size,count},total}
- MultipartLimitsInput → added (src/server/types.ts)
- resolveMultipartLimits: Required<MultipartLimits> → MultipartLimits
- BudgetOptions.consume → consumer (upstream adoption at src/core/middlewares.ts:603)
- buildSession → added (tests/setup.ts)

## Files touched

- /home/user/fleet/middleware/src/core/types.ts
- /home/user/fleet/middleware/src/core/Session.ts
- /home/user/fleet/middleware/src/core/helpers.ts
- /home/user/fleet/middleware/src/core/factories.ts
- /home/user/fleet/middleware/src/core/validators.ts
- /home/user/fleet/middleware/src/core/shapers.ts
- /home/user/fleet/middleware/src/core/middlewares.ts
- /home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts
- /home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts
- /home/user/fleet/middleware/src/server/types.ts
- /home/user/fleet/middleware/src/server/constants.ts
- /home/user/fleet/middleware/src/server/errors.ts
- /home/user/fleet/middleware/src/server/helpers.ts
- /home/user/fleet/middleware/src/server/parsers.ts
- /home/user/fleet/middleware/src/server/MultipartParser.ts
- /home/user/fleet/middleware/src/server/middlewares.ts
- /home/user/fleet/middleware/src/server/index.ts
- /home/user/fleet/middleware/tests/setup.ts
- /home/user/fleet/middleware/tests/setup.test.ts
- /home/user/fleet/middleware/tests/src/core/Session.test.ts
- /home/user/fleet/middleware/tests/src/core/helpers.test.ts
- /home/user/fleet/middleware/tests/src/core/factories.test.ts
- /home/user/fleet/middleware/tests/src/core/middlewares.test.ts
- /home/user/fleet/middleware/tests/src/core/stores/MemorySessionStore.test.ts
- /home/user/fleet/middleware/tests/src/core/stores/DatabaseSessionStore.test.ts
- /home/user/fleet/middleware/tests/src/server/helpers.test.ts
- /home/user/fleet/middleware/tests/src/server/middlewares.test.ts
- /home/user/fleet/middleware/guides/middleware.md

## Tests changed

- tests/src/core/Session.test.ts — rewritten for state + mutators; added delete-reports-false and clear-empties-state cases
- tests/src/core/stores/MemorySessionStore.test.ts — every MemorySessionStore<string>/'payload' scenario reworked onto Session entities and set(session, now)
- tests/src/core/stores/DatabaseSessionStore.test.ts — set(session, now); session.set/state; the stricter guard reads value.state
- tests/src/core/factories.test.ts — createMemorySessionStore<Session>; new createRestoredSession block (rebuild, __proto__ own-key, malformed refusals) received from helpers.test.ts
- tests/src/core/helpers.test.ts — restoreSession import and tests removed; transferSessionData and isSession reworked onto entities; new isSession mutator-absence case; snapshotSession split out of the old round-trip block; new validateSessionLimits block
- tests/src/core/middlewares.test.ts — require→required; the two `ends` tests deleted with the capability; recording store wrapper set(value, now); regenerate carries state; CSRF session stubs use buildSession
- tests/src/server/helpers.test.ts — every limits bag regrouped; error.reason→error.code; parsePartHeaders assertions on mime; resolveDefaultDirectory test replaced by a default-path staging proof; new resolveMultipartLimits default-matrix block
- tests/src/server/middlewares.test.ts — limits regrouped; CapstoneState.session typed SessionInterface
- tests/setup.ts / tests/setup.test.ts — new buildSession scenario builder plus its two proofs

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format.
Finished in 2634ms on 66 files using 4 threads.
- `npm run lint:check` → exit 0 — > oxlint --config .oxlintrc.json --deny-warnings .  (no diagnostics)
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && check:src:core && check:src:server — all clean
- `npm run build` → exit 0 — Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- `npm test` → exit 0 — src:core+src:server: Test Files 8 passed (8), Tests 417 passed | 1 skipped | 1 todo (419); policy 111 passed; config 46 passed; setup 23 passed; guides 38 passed. The skip and the todo are pre-existing (a Windows-only reserved-name case and an it.todo at tests/src/server/helpers.test.ts:1186); my diff touches neither.

## Diff stat

```text
27 files changed, 864 insertions(+), 747 deletions(-) tracked, plus one new untracked file src/server/parsers.ts (71 lines). Largest: guides/middleware.md 311, tests/src/core/helpers.test.ts 159, src/server/helpers.ts 142, tests/src/server/helpers.test.ts 140, tests/src/core/stores/MemorySessionStore.test.ts 123, src/core/types.ts 90.
```

Status at return (writer's reading): `All eighteen rows closed: fifteen applied, three refused with the rule text quoted, none stopped. The full gate chain is green in order.`
Built `dist/` moves: true

## Observations

- Prose sweep run and every hit classified. Word-boundary search over src, tests, guides, README.md for SessionTransport (excluding SessionTransportInterface), ClientInfo, lastSeen, createdAt, MultipartReason, MULTIPART_REASON_STATUS, UploadedFileInterface, restoreSession, resolveDefaultDirectory returned zero hits. Surviving hits of member-level names are all permitted senses: `reason` appears four times as English prose about a `read` contract, a rejection-handler parameter, and two distribution-test comments; `contentType` survives only as local variables reading the HTTP Content-Type header, multipartBoundary's parameter, and the test fixture MultipartPartInput.contentType (a raw-header mirror, which names.md § General vocabulary sanctions), never as PartHeaders; `consume` survives as BudgetInterface.consume, the upstream method, which did not move; `require` survives as English and as the 'require-corp' COEP value; `ends` survives as the English verb; `data` survives only as SessionSnapshot.data and unrelated SSE bodies.
- SessionSnapshot.data was left alone deliberately. No ledger row moves it, and it is the persisted wire member inside the SessionRow.session column, so renaming it would change the stored JSON shape of every existing row. names.md § Rejected naming still bans `data` as a generic word, so this is a real remaining hit for a successor unit that can carry a migration.
- transferSessionData and buildClientInfo keep their names. Each embeds the old member or type name (`Data`, `ClientInfo`), but neither is a ledger edit and both are public exports whose external consumers are not in breaking-radius.json. Neither matches a word-boundary search for the renamed name, so acceptance criterion 1 holds either way. transferSessionState and buildClient are the successor renames if the Orchestrator wants them.
- s11-17 needed a name the ledger did not settle. MultipartLimits is now the effective, defaults-applied shape and MultipartLimitsInput the caller's partial one, mirroring the UploadedFile / UploadedFileInput pair already in that file. The alternative (keeping MultipartLimits partial and naming the resolved form separately) needed a second term for the same concept, which AGENTS.md § Design laws forbids. MultipartOptions.limits therefore names MultipartLimitsInput; a MultipartLimits value still satisfies it structurally.
- The s11-02 ruling introduces an import cycle: src/core/factories.ts imports stores/DatabaseSessionStore.ts and that class now imports createRestoredSession back from factories.ts. Both edges are value imports used inside function bodies, so nothing is read at module-evaluation time. Probed both built faces: node against dist/src/core/index.js and index.cjs resolves createRestoredSession, MemorySessionStore.set/get and DatabaseSessionStore correctly, and dist/src/server/index.cjs resolves parseMultipartRequest and resolveMultipartLimits with resolveDefaultDirectory gone. .oxlintrc.json registers no import/no-cycle rule. It is still an edge running downward from a class-importing file into a class file, which architecture.md § Kind purity describes as the shape to avoid; cloners.ts or a core parsers.ts would break it without a rename.
- tests/setup.ts now imports @src/core for buildSession, so every Vitest project loads src/core at setup rather than only the src:* projects. All projects share the tsconfig path aliases in vite.config.ts, and policy, config, setup, guides and distribution all pass.
- test:distribution was not run: the brief excludes it while dependency tarballs are staged. All fifteen staged tarballs verified with `node /home/user/work/verify-stage.mjs middleware` before any edit.
- npm run check on entry produced exactly one error, the BudgetOptions.consume row. Because tsc stops the chain at the first failing project, that reading covered the root project only; the two scoped src projects ran clean on the next pass, confirming no further upstream adoption was hiding behind it.

## Deviations

- None that stopped a row. The Deviation contract's stop conditions did not fire: no target name collided with an existing export (MultipartError.code was checked against HTTPError, which declares status, context and a brand but no code), no two rows moved the same symbol differently, and no rename required an off-limits file. package.json, package-lock.json, tests/setupPolicy.ts, tests/policy.test.ts, configs/**, .claude/**, and the vendored guide mirrors are untouched — confirmed by git status.
- Decided and carried on, per the contract's ancillary clause: the MultipartLimitsInput name and split (recorded above); the placement of createRestoredSession at the end of factories.ts; the wording of every rewritten TSDoc first sentence; and the choice to make buildSession a shared tests/setup.ts helper with its own setup.test.ts proof rather than repeat a two-line entity build across three suites.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/middleware.diff`,
`tmp/units/breaking/middleware.status`.
