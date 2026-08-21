# Design brief — consolidating the fleet's test helpers into `@orkestrel/test`

## Objective

Produce the design for one consolidated test-helper surface in `@orkestrel/test` that absorbs the
general-purpose helpers currently repeated across fifty-six repositories, and rule on every helper
family in the evidence. You produce a design proposal. You implement nothing and you edit nothing.

## Authority — read before acting

Read these in order, from `/home/user/scaffold`:

1. `AGENTS.md`
2. `.claude/rules/tests.md` — governs test helpers, setup placement, and the shared-infrastructure law
3. `.claude/rules/architecture.md` — centralized-file placement and the wrapper test
4. `.claude/rules/names.md` — helper naming and API shape
5. `.claude/rules/typescript.md`
6. `.claude/rules/quality.md` — evidence and falsification law
7. `.claude/rules/documentation.md` and `.claude/rules/writing.md`

The governing guide for the destination package is `/home/user/test/guides/test.md`.

## Evidence

Nine read-only Grok lanes read all 111 non-vendored setup modules across the fleet, 43,200 lines.
Every lane was verified complete against a `(repo, name)` join: zero symbols missing.

- Lane reports: `/home/user/scaffold/tmp/fleet/reports/{A1,A2,A3,A4,B1,B2,C1,C2,D1}.md`.
  Each carries one row per exported symbol as
  `REPO | FILE:LINE | NAME | KIND | SIGNATURE | BEHAVIOR | HOST | GENERAL | DUPLICATE`,
  then a `### Clusters` section grouping same-job symbols with their behavioral differences, then
  `### Notable bodies` and `### Unknowns`. **The Clusters sections are the most valuable input.**
- Folded row table: `/home/user/scaffold/tmp/fleet/rows.tsv`, tab-separated, columns
  `lane, repo, file:line, name, kind, signature, behavior, host, general, duplicate`.
- Destination's current surface: `/home/user/scaffold/tmp/fleet/destination-surface.md`.
- Destination source: `/home/user/test/src/{core,server,browser}/*.ts`.

Read the real source of any helper you rule on. A row's `BEHAVIOR` field is 15 words and is a
pointer, not a substitute for the body.

## Verified facts — established by measurement, do not re-derive or contradict without evidence

1. `@orkestrel/test` declares **zero runtime dependencies** and peers only on `vitest ^4.1.10`. It
   is a devDependency in all forty-eight dependents and a runtime dependency in none. Any design
   that adds a runtime dependency changes the package's contract and must argue for it explicitly.
2. The emitter-recorder family needs exactly one method from `EmitterInterface`:
   `on<K extends keyof TMap>(event: K, handler: EmitterHandler<TMap[K]>): void`
   (`/home/user/emitter/src/core/types.ts:44`). A structural parameter type therefore reaches it
   without depending on `@orkestrel/emitter`.
3. `EventSubscriber<TArgs>` already exists at `/home/user/test/src/core/types.ts:72` as the
   structural subscribe seam, and `waitForEvent` consumes it.
4. `guides/test.md` is 1,772 lines under a bijective parity gate (`tests/guides.test.ts`): every
   documented name must resolve and every public export must be documented. Each added export costs
   a Surface entry, a Methods entry where it is an interface, and a Patterns fence whose asserted
   values must be true.
5. The package publishes three entries: `.` (core, host-independent), `./server` (Node),
   `./browser` (DOM/Vue). There is no styles entry. The evidence contains 24 rows classified
   `styles`.
6. `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are vendored from
   `scaffold` `dist/host` and are excluded from this campaign: `.claude/rules/tests.md` requires
   their helpers to stay inside that set rather than import from `@orkestrel/test`.

## The population you must rule on

- **44 general helpers duplicated across three or more repositories.** Largest families:
  `recordEmitterEvents` / `isTotal` / `EmitterRecorders` at sixteen repositories each;
  `WORKSPACE_ROOT` at seven; `uniqueName`, `invokeRaw`, `createTestDatabase`, `deleteDatabase` at
  five; `createCleanups` / `CleanupRegistrar` / `CleanupRegistrarInterface` and the style
  primitives `style` / `render` / `mount` at four; `createManualClock`, `createResourceFactory`,
  `token` / `rootToken` / `rgba` / `pixels` / `findRule` / `colorEqual` / `build` / `buildElement`,
  the database seeds, and `EXTREME_NUMBERS` at three.
- **68 general helpers duplicated across exactly two repositories.**
- **296 sites whose lane flagged them as duplicating a symbol `@orkestrel/test` already exports.**
  57 carry no noted behavioral difference. **239 carry one**, and those are the campaign's real
  work: each is a near-duplicate whose variation either belongs upstream or does not.

## Questions the design must answer

Answer every one. Where the evidence cannot settle a question, say so and name what would.

1. **Per family, the ruling.** For each helper family in the evidence, rule: `adopt` (goes into
   `@orkestrel/test` as a new export), `widen` (an existing export absorbs the variation — say
   exactly how the signature changes and whether the change is source-compatible for current
   callers), `reject` (stays local; say why it is not general), or `defer` (name the blocker).
   Cover every one of the 44 three-or-more families and every one of the 239 differing sites'
   families. Group sites into families; do not emit 239 separate rulings.
2. **The emitter-recorder trio.** Sixteen repositories carry `EmitterRecorders`, `isTotal`, and
   `recordEmitterEvents`, and lane A3 reports the `isTotal` bodies match at every site while
   `recordEmitterEvents` differs only in a thrown message. Give the consolidated shape. State the
   parameter type that reaches an emitter without a dependency on `@orkestrel/emitter`, and rule on
   whether `isTotal` survives as a public export or becomes internal to the factory.
3. **Cleanup versus teardown.** `createTeardown` already exists. Four repositories carry
   `createCleanups` / `CleanupRegistrar`. Rule whether these are one concept. If they are, say
   which name survives and what happens to the other's behavior.
4. **`createManualClock`.** Three repositories carry it. `AGENTS.md` forbids fake clocks that
   simulate project-owned behavior, and `.claude/rules/tests.md` says never to replace the host
   clock. Rule on whether any form of this belongs in the package, and if so what makes it lawful.
5. **The database family.** `createTestDatabase`, `deleteDatabase`, `tempDatabasePath`, `seedUsers`,
   `seedStore`, `TEST_SEED`, `SEED_USER_STORES`, `SEED_STORE_STORES`, `TestDatabaseInterface`.
   Rule whether this is general test infrastructure or knowledge of `@orkestrel/database`'s domain
   that must stay with its consumers.
6. **The style primitives.** `.claude/rules/tests.md` already names `mount`, `render`, `build`,
   `style`, `token`, `rootToken`, `pixels`, `rgba`, `colorEqual`, and `findRule` as expected
   browser/style setup exports, and the fleet carries them at three to four sites each. Rule where
   they live, and rule on whether the 24 `styles`-host rows justify a fourth package entry or
   belong under `./browser`.
7. **`WORKSPACE_ROOT` versus `resolveRoot`.** Seven repositories declare the constant; the package
   exports the function. Rule which form is correct and why.
8. **Placement.** For every adopted symbol name the exact destination file under
   `/home/user/test/src/{core,server,browser}/` — `types.ts`, `constants.ts`, `helpers.ts`,
   `factories.ts`, or a new kind file — and justify it against `.claude/rules/architecture.md`'s
   kind table. Note that `factories.ts` admits only `create*` names.
9. **Naming.** Give every adopted symbol its final name under `.claude/rules/names.md`. Where the
   fleet's existing name breaks a rule, say so and give the replacement.
10. **Sequencing.** Propose the implementation units: what each owns, which files, what order, and
    which can run in parallel without sharing a file. A unit is one writer over disjoint files.
11. **What you would refuse.** Name anything in the evidence that looks like a consolidation
    candidate and should not be one, with the reason. A design that adopts everything has not
    exercised judgment.

## Scope

Read-only. Change no file. Run no writing command. You produce a proposal for the Orchestrator to
reconcile against an independent lane's proposal; you do not implement, and you do not accept.

## Execution

Perform this assignment directly and yourself. Spawn no subagent.

## Output

Return only:

- `Summary` — at most fifteen lines: the shape you are proposing and the judgment behind it.
- `Rulings` — a table: `family | sites | ruling | destination file | final name | note`.
- `Answers` — one numbered section per question above.
- `Units` — the proposed implementation units with owned files and order.
- `Refusals` — what you would not adopt, and why.
- `Risks` — what could make this design wrong.
- `Unknowns` — what the evidence could not settle, and what would settle it.

No process diary. Do not describe what you read.

## Acceptance criteria

- Every one of the 44 three-or-more families carries a ruling.
- Every ruling names a destination file that exists in the kind table, or names the new kind file.
- No adopted design adds a runtime dependency to `@orkestrel/test` without an explicit argument.
- Every adopted name satisfies `.claude/rules/names.md`, and every `create*` name sits in
  `factories.ts`.
- The proposal states the guide-parity cost of the surface it adds.
