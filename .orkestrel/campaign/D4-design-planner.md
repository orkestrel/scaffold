<!-- D4-S — planner (Opus 5, native), subjective design lane for the fleet duplicate-export gate and hosted guides. Retained verbatim from the completion notification, 2026-09-15 (434 s, 24 tool uses). Immutable. -->

I hold the **subjective** lane.

# Design

## 1. Hosting the guides

**Ruling: one `'guides'` directory entry on `CANON_PATHS`, and `guides/guide.md` and `guides/scaffold.md` leave `HOST_PATHS`.**

`CANON_PATHS` already carries exactly this meaning — "staged for reading rather than for a target" (`src/core/constants.ts:153-167`). The guide set is read by the policy sweep and served by `catalog`; no target needs it planted. A third list would invent a second word for a rule the codebase already has.

The disjointness refusal forces the move: no member of either list may sit beneath a member of the other (`src/core/constants.ts:169-172`), and `guides/guide.md` and `guides/scaffold.md` sit beneath `guides` (`src/core/constants.ts:149-150`).

That move removes a duplicate owner rather than a capability. `guides/**` is already presence-owned through `isDeferredPath` (`src/core/helpers.ts:191-193`), and `catalog` fetches a mirror for every declared dependency (`src/bin/CLI.ts:797-810`), so a target declaring `@orkestrel/guide` or `@orkestrel/scaffold` receives those guides from `catalog` regardless. Planting them made `repair` a second writer for bytes `catalog` owns.

Two facts make the change cheap. `guides` is already a `Group` and `inferGroup` already classifies the prefix (`src/core/constants.ts:28`; `src/core/helpers.ts:306`). `Upstream.#answer` already refuses any host path whose group is `guides` with the note "is a guide mirror the fleet serves" (`src/server/Upstream.ts:495-502`), so a canon guide path never live-fills from the vendored URL and the `dist/host` bytes stand without an edit there.

**One consequence I own.** With no guide left on `HOST_PATHS`, `selectHostPaths` (`src/core/helpers.ts:458-461`) filters nothing. Delete it, its barrel row, its call in `blueprintToHostArtifacts` (`src/core/compilers.ts:70`, `1602-1609`), its guide row, and its `@example`, per `.claude/rules/architecture.md` § Wrapper test. This is a published-surface removal and rides the same scaffold bump.

**The `catalog` fallback: extend the existing floor, add no verb and no flag.** `#fetch` already hands `upstream.fetch` a snapshot of the target's present guide bytes (`src/bin/CLI.ts:810`), and `#refresh` already derives `provenance.guides` as `'floor' | 'live'` and returns `EXIT_DRIFT` when any mirror is not live (`src/bin/CLI.ts:419-448`). Put the hosted guide set beneath that snapshot as the second floor: a name whose fetch fails and whose target copy is absent resolves from `dist/host/guides/<bare>.md`. The mirror is written, `provenance.guides` reads `'floor'`, and the exit stays `EXIT_DRIFT`. An offline `catalog` therefore plants the fleet's guides and says plainly that it served them from the floor. The vocabulary for "I could not reach upstream" already exists; reuse it.

**`audit` and a mirror older than the hosted copy: refuse the check.** `audit` compares planned bytes against present bytes, and guides sit outside that comparison deliberately (`src/core/helpers.ts:191-193`). A mirror newer than the hosted copy is the normal state the moment any package publishes after a scaffold release, so "older than the hosted copy" names no defect and a gate built on it fires on healthy trees. Staleness is decided where it is observable: the `catalog` run that reports `'floor'`.

**`supervisor`: fail the stage, never the sweep.** `stageHost` refuses when a catalog row in `.claude/agents/orkestrel.md` names a package with no `guides/<bare>.md` under the staged root. `@orkestrel/supervisor` has a row (`.claude/agents/orkestrel.md:86`) and no guide in the checkout. Either the guide arrives or the row goes; scaffold must not ship a host that silently weakens the fleet gate in every target. This recomputes from the table `scaffold catalog` regenerates, so no second list records it.

**Scaffold's own read path.** The sweep resolves the guide root as `node_modules/@orkestrel/scaffold/dist/host/guides` when that directory exists, and `<root>/guides` when it does not. A base package resolves in its own checkout through its `exports` map rather than through an installed copy, so the fallback fires exactly in scaffold and reads its source `guides/`. No package-name test, no branch anyone has to remember.

## 2. The rule

**Name: `surface`.** Added to the `PolicyRule` union (`tests/setupPolicy.ts:16-23`).

The fleet already calls this population the surface: `## Surface` in every guide, `Source.surface()`, `Guide.surface()`, `SurfaceSymbol`. `AGENTS.md` § Design laws fixes one term per concept, so `collision`, `namespace`, and `duplicate` each introduce a second word for a set that has one. The rule polices the fleet's surface; the message says what went wrong.

**Violation shape: unchanged.** `PolicyViolation` (`tests/setupPolicy.ts:31-37`) through `createPolicyViolation` (`tests/setupPolicy.ts:312-318`). `path` is the file declaring the name, `line` the declaration line, and `message` follows the sweep's existing form — a positive statement of the rule plus the evidence:

```
surface name belongs to one package: createChannel (agent)
```

**Subject population — the target's own live surface, in two readings.**

- Barrel exports through `createSource({ files, module }).surface()` over the environments present (`guide/src/core/types.ts:440-479`; `guide/src/core/sources/Source.ts:102-105`, `177-227`). Its `export * from './x.js'`-only reading is not a sampling risk, and I rule the unknown closed: `.claude/rules/architecture.md` § Barrel exports states "A barrel contains only `export * from './module.js'` declarations. Do not use named, default, namespace, or type-only barrel exports." The enumerator's population is the law's population, and a barrel outside it already violates a different rule. `test/src/core/index.ts:1-5` is pure star rows, as is scaffold's own core barrel.
- Setup helpers through `extractExports` (`guide/src/core/helpers.ts:1092-1116`) over `POLICY_TESTS_MODULE_GLOB` (`tests/setupPolicy.ts:145`), minus the vendored setup modules `HOST_PATHS` names (`src/core/constants.ts:137`). Without that subtraction the sweep judges the fleet's own policy helpers inside every target that received them.

I read the subject from the live barrel rather than from the target's own guide Surface deliberately. The guide is a projection that `Parity` keeps honest (`guide/src/core/Parity.ts:219-233`), but that honesty is the `guides` project's result, and a policy sweep that reads a drifted guide reports on stale data while its own project is green.

**Comparison population.** Every hosted guide's column-0 names through `createGuide().surface()` (`guide/src/core/helpers.ts:1517-1549`; `extractRowSymbol` at `guide/src/core/helpers.ts:1422-1439`), excluding `guides/<own>.md` where `<own>` comes from `readPolicyPackage` (`tests/setupPolicy.ts:1390-1402`).

**Identity: the bare name.** Environment is a `###` heading with an import specifier rather than a table column (`guides/test.md:213-215`), so an environment-qualified identity is not derivable from the comparison population at all, and the user's example — `createChannel` in agent core against test's browser entry — is precisely the pair an environment qualifier would miss. Keyword is dropped for the same reason it would be wrong: a consumer importing `interface Drift` from one package and `class Drift` from another meets one collision, not two concepts.

**Degraded population refuses rather than passes.** When no hosted guide root resolves and the workspace's own `guides/` does not cover every `readPolicyCatalog` row (`tests/setupPolicy.ts:1415-1430`), the sweep reports a `surface` violation naming the missing evidence. A weaker comparison set must be loud; `isPolicyStray` exists for the same reason (`tests/setupPolicy.ts:1478-1481`).

**Import law.** The sweep imports `node:` modules and `@orkestrel/guide`, which is a `BASE_DEV_DEPENDENCIES` member (`src/core/constants.ts:511-522`) the import-law control already marks declared (`tests/src/server/helpers.test.ts:425-461`). It reads `node_modules/@orkestrel/scaffold/dist/host/guides/**` with `node:fs`; `POLICY_PROSE_EXCLUSIONS` (`tests/setupPolicy.ts:239-245`) bounds the prose walk and does not bound this reader.

**Re-exports need no exception, and the unknown closes.** `@orkestrel/test` sits at L0 with no `@orkestrel/contract` runtime edge (`.claude/agents/orkestrel.md:90`) and a barrel of five star rows (`test/src/core/index.ts:1-5`), so `Success`, `Failure`, `Result`, and `JSONValue` are its own declarations rather than contract's re-exported. More generally, `.claude/rules/architecture.md` § Wrapper test forbids re-exporting a dependency's symbol, so a genuine re-export is already a violation of another rule and the `surface` rule carries no carve-out for one.

## 3. Phase-in of the existing collisions

**Ruling: grandfather by the hosted guide. No accepted-collision list, no ratchet file, no per-target allowlist.**

The rule reads: a subject name fires when another package's hosted guide claims it **and** the target's own hosted guide does not.

That single clause produces every property a ratchet was wanted for:

- The 113 names P6 measured over 5033 Surface rows on 2026-09-15 stay green, because each side's own hosted guide carries its half — `createChannel` at `guides/agent.md:394` and at `guides/test.md:338`.
- A name added since the installed scaffold was staged fires at once. That is the defect the user named.
- `waitForCondition` fires. A `tests/setup*.ts` helper appears in no guide Surface, so it has no grandfather anywhere.
- The set shrinks by itself. A rename lands, scaffold restages, the old name leaves the hosted guide, and it can never be reintroduced.
- The set cannot grow quietly. Growth needs a scaffold release whose `dist/host` diff shows the guide row that added the name.

I refuse the recorded list for the reason `.agents/orchestration.md:487-490` states: a document recording live state is stale from the moment it is written, and the next campaign reads it as current. The hosted guide already is that record, and `catalog` already maintains it.

**Release consequence, which is the practical argument.** Under grandfathering no target's published surface moves, so the wave is a re-pin-and-`repair` wave rather than a layered cascade. Fail-closed at once would redden most of the fleet simultaneously — the P6 list reaches from L0 (`codec`, `contract`, `msg`, `test`) to L6 (`ollama`, `toolbox`) — and every rename is a runtime-surface move that obliges its own layer-ordered republish (`.agents/orchestration.md:842-844`). That stops the release wave to fix documentation-era duplication, which is the opposite of what the trigger asked for.

**Setup helpers are fail-closed with no grandfather, and that half is unmeasured.** P6 read guides only. Size it before the gate ships (unit D4-M), because this is the one place the ruling can redden a target on the day it lands.

## 4. Resolving a collision

Four rules, applied in order. This round proposes them; the renames are later units.

**R1 — Reuse beats rename.** Where the colliding package can declare the owner as a dependency and the semantics match, delete the local declaration and import the owner's. `AGENTS.md` § Non-negotiable rules requires inspecting declared `@orkestrel/*` capabilities and reusing a primitive whose semantics match, and `.claude/rules/patterns.md` § Declared ecosystem capabilities gives the test. This closes `waitForCondition` and every setup-module duplicate, which is the trigger's own class.

**R2 — The subject keeps the name; the other names what its thing is.** `createChannel`: agent's is a domain entity a producer writes into and ends while a consumer drains it (`guides/agent.md:394`); test's is a console recorder that records each call and passes it on (`guides/test.md:338`). Agent keeps `createChannel`; test renames to the recorder it is. `isRecord`: contract publishes guards as its product, so msg takes R1 or renames.

**R3 — One specification, one implementation, in the lowest layer that needs it.** A pair transliterating one external specification, or implementing one engine twice, is extracted rather than renamed.

- JSON-RPC 2.0 across `lsp` (L3) and `mcp` (L4): one specification, two transliterations. The types and guards move to `lsp` and `mcp` depends on it.
- The document tree across `html` (L1) and `markdown` (L2): `markdown` already depends on `html` (`.claude/agents/orkestrel.md:65`), so the shared walker moves down to `html`.
- The row engine across `database` (L2) and `table` (L2): `table` owns the concept its own name states, so the rows move to `table` and `database` depends on it.

**R4 — No accept path.** A collision that reaches here has not been ruled on yet. It stays grandfathered and stays on the list until a later unit applies R1, R2, or R3. Nothing records an acceptance, because the hosted guide already is the record.

**Home.** R1–R4 land as a `## Fleet name ownership` section in `.claude/rules/names.md`, which the rule map assigns "Identifiers, API shape". The mechanism's prose lands in `.claude/rules/workspace.md` § Policy instruments and in `guides/scaffold.md`.

## 5. Units and order

See the `Units` section.

## 6. Exit criterion

This scaffold phase ends when each capability closes:

1. **Hosted guide set.** `dist/host/guides/` carries one guide per catalog row, and `stageHost` refuses a stage where a row has none. Closes implemented.
2. **Guide staging vocabulary.** `guides` is a `CANON_PATHS` directory entry, `HOST_PATHS` names no guide, `selectHostPaths` is deleted with its barrel row, guide row, and example, and `host.json` is regenerated. Closes implemented.
3. **Offline `catalog`.** A `catalog` run with no network writes every mirror from the hosted floor, reports `provenance.guides` as `'floor'`, and exits `EXIT_DRIFT`. Closes implemented.
4. **The `surface` rule.** `inspectPolicyWorkspace` reports a `surface` violation for a planted collision in a scratch target's barrel and in its `tests/setupServer.ts`, reports none for the target's own grandfathered name, and reports none for a vendored setup module's export. Closes implemented.
5. **Setup-helper blast radius.** The fleet-wide setup-export reading exists, and every name it finds ends as renamed, reused, or carried into a named successor unit. Closes implemented or intentionally excluded on evidence.
6. **Ownership rule.** R1–R4 are in `.claude/rules/names.md`, and the mechanism is in `guides/scaffold.md`, `guides/README.md`, and `.claude/rules/workspace.md` § Policy instruments, with guide parity green. Closes implemented.
7. **Propagation.** Scaffold bumps and publishes; every target re-pins, runs `repair`, and reports green gates. Closes implemented.
8. **The trigger.** `waitForCondition` is gone from the agent checkout's `tests/setupBrowser.ts` and imported from `@orkestrel/test`, and the gate would redden if it returned. Closes repaired.

The fleet's 113 collisions are **not** in this exit criterion. They are grandfathered by design, and each rename is a successor unit with its own layer-ordered release.

# Alternatives

**Alternative A — put the whole `guides/` tree on `HOST_PATHS`, planting every guide in every target.** It satisfies the offline requirement with no disjointness surgery and keeps `selectHostPaths` alive. It loses on three counts. It gives `repair` ownership of bytes `catalog` already owns, so a target that runs `catalog` and then `repair` gets two writers disagreeing about the same file. It puts the whole fleet's documentation into every target's tree, which every target then carries in its own diff, its own prose sweep, and its own `audit`. And it plants a guide for a package the target does not declare, which is a claim the target's own `catalog` run would not make. The chosen design ships the same bytes to the same readers without asking any target to hold them.

**Alternative B — a hosted ratchet file (`surface.json`) carrying the accepted-collision set, regenerated by `stageHost` and refused when it grows.** This is the strongest rival and it survives further than the per-target allowlist: it recomputes, it is monotone, and a growth attempt shows as a committed line. It loses because it stores a fact the hosted guides already determine. The accepted set *is* "which names each package published as of this release", and the guide set states that exactly. Adding `surface.json` creates a second answer to one question, and the failure mode is the ordinary one — the file and the guides disagree, and nobody can tell which is current. It also needs its own generator, its own committed artifact, its own refusal, its own tests, and its own guide row, for a capability the grandfather clause delivers in one comparison. I keep it in reserve for one case: if the setup-helper measurement (D4-M) shows the fail-closed half is too wide to land in one release, a ratchet scoped to setup helpers alone — which genuinely have no guide record — is the fallback, and it is narrow enough to be honest.

# Constraints

Objective lane.

# Refusals

Objective lane.

# Measurements

Objective lane.

# Units

| Unit | Role | Engine | Owned files | Dependencies | Acceptance criteria |
| --- | --- | --- | --- | --- | --- |
| **D4-M** — size the setup-helper half | `grok` | Cursor Grok (bridge) | none; read-only across every fleet checkout | none | Returns every `tests/setup*.ts` export name in every fleet checkout that matches a hosted guide Surface name, with `file:line` per hit and the excluded vendored modules named. States the search's path bound. |
| **D4-S** — supervisor's guide | `implementer` | Opus 5 (native) | `guides/supervisor.md` in the **supervisor** checkout | none | The guide exists with a `## Surface` table; supervisor's `npm run test:guides` is green; `createGuide().surface()` over it returns a non-empty set. |
| **D4-1** — host the guide set | `sol` | GPT-6 Astra (bridge) | `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/index.ts`, `src/core/compilers.ts`, `src/server/helpers.ts`, `host.json`, `tests/src/core/**`, `tests/src/server/helpers.test.ts` | D4-S for the refusal to pass | `'guides'` is a `CANON_PATHS` entry; `HOST_PATHS` names no guide; `selectHostPaths` and its barrel row, guide row, and example are gone with every call site updated; `stageHost` refuses a stage whose catalog rows are not all covered by a staged guide, proven with a negative control naming a row whose guide is removed; `host.json` regenerated; `npm run check` and `npm run test:src:core`, `test:src:server` green. |
| **D4-2** — the `catalog` floor | `sol` | GPT-6 Astra (bridge) | `src/server/Upstream.ts`, `src/bin/CLI.ts`, `tests/src/server/Upstream.test.ts`, `tests/src/bin/**` | D4-1 (shares `src/server/helpers.ts`; serialize) | A fetch that fails for a name with no target snapshot resolves from the hosted guide, writes the mirror, sets `provenance.guides` to `'floor'`, and returns `EXIT_DRIFT`; a live fetch still reads `'live'`; proven against a fixture upstream that refuses every request. No new verb, flag, or `Mirror` member. |
| **D4-3** — the `surface` rule | `sol` | GPT-6 Astra (bridge) | `tests/setupPolicy.ts`, `tests/policy.test.ts` | D4-1, D4-M | `'surface'` joins `PolicyRule`; `inspectPolicyWorkspace` includes the sweep; a scratch target with a planted barrel collision and a planted `tests/setupServer.ts` collision reports one violation each with the message form the design fixes; controls drawn from outside the population report nothing — the target's own grandfathered name, a vendored `tests/setupPolicy.ts` export, and a name in the target's own guide alone; a workspace with neither a hosted guide root nor full catalog coverage reports the degraded-population violation; `npm run test:policy` green. |
| **D4-4** — the prose | `implementer` | Opus 5 (native) | `guides/scaffold.md`, `guides/README.md`, `.claude/rules/names.md`, `.claude/rules/workspace.md` | D4-1, D4-2, D4-3 | `.claude/rules/names.md` carries `## Fleet name ownership` with R1–R4 as directives; `guides/scaffold.md` documents the staging change, the `catalog` floor, and the `surface` rule, and its Surface table no longer names `selectHostPaths`; `guides/README.md` § Line reference states that the host carries every guide; `npm run test:guides` green. |
| **D4-5** — gates | `verifier` | Sonnet (native) | none | D4-4 | `format:check` → `lint:check` → `check` → `build` → `test`, each run bare and its output read. |
| **D4-A1** — objective audit | `analyst` | GPT-6 Astra (bridge) | none | D4-5 | Per-claim verdicts against the numbered claims, with executed evidence per claim. |
| **D4-A2** — design-fit audit | `reviewer` | Opus 5 (native) | none | D4-5 | Per-claim verdicts on naming, message voice, vocabulary reuse, and wrapper removal. |
| **D4-A3** — mechanical conformance | `checker` | Cursor Grok (bridge) | none | D4-5 | `host.json` regenerated from the new path set; guide parity rows; scope honesty against each unit's owned-file list. |
| **D4-T** — the trigger | `builder` | Sonnet (native) | `tests/setupBrowser.ts` in the **agent** checkout | D4-3, scaffold released | `waitForCondition` is deleted there and imported from `@orkestrel/test`; the agent checkout's `test:policy` reports the violation before the edit and none after, with both counts recorded. |

**Order.** D4-M and D4-S run in parallel first. D4-1 → D4-2 → D4-3 serialize in the scaffold checkout, one writer at a time. D4-4 follows. D4-5 then D4-A1/D4-A2/D4-A3 in parallel. D4-T follows the scaffold release.

**Release obligation.** The `HOST_PATHS` and `CANON_PATHS` change moves the vendored path set, and `tests/setupPolicy.ts` and `tests/policy.test.ts` change bytes, so scaffold bumps and publishes (`.agents/orchestration.md:874-882`). Every target re-pins `@orkestrel/scaffold`, runs `repair`, and re-runs its gates. `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`, so a target green today can turn red on the setup-helper half — which is what D4-M sizes before any of this lands.

# Tensions

Named for the other lane to challenge.

1. **Moving `guides/guide.md` and `guides/scaffold.md` off `HOST_PATHS`, and deleting `selectHostPaths` with them.** I ruled the planted copies redundant with `catalog`. A target that never runs `catalog` loses them. I judge that acceptable because the same target reads its rules from `node_modules` already; the other lane may find a consumer path I did not.
2. **`stageHost` reading `.claude/agents/orkestrel.md` to refuse an incomplete host.** This couples staging to a prose table. The alternative is a scaffold-owned test rather than a refusal in the code. I chose the refusal because a test does not stop a release run, and an incomplete host silently weakens the gate in every target.
3. **Grandfathering by the hosted guide rather than a ratchet file.** The weakness is deliberate: a collision that survives a scaffold release without a rename becomes grandfathered, and only a reviewer reading the `dist/host` guide diff would catch a deliberate addition. Alternative B is the fallback.
4. **Bare-name identity over name-plus-keyword.** `Source` (guide, reason), `Position` (csv, workspace), and `Stage` (probe, rater) may be intentional co-existence that a keyword qualifier would still catch. Bare name catches more and grandfathering absorbs the cost today.
5. **Fail-closed setup helpers with no grandfather.** This is the one ruling that can redden a target on landing day, and its blast radius is unmeasured. I made it fail-closed because the user's trigger was exactly a setup-module duplicate.
6. **`@orkestrel/test` taking an `@orkestrel/contract` dependency** to close `Result`, `Success`, `Failure`, and `JSONValue` under R1. It moves `test` off L0 (`.claude/agents/orkestrel.md:90`). The closure cost looks nil because `@orkestrel/contract` is already a `BASE_DEV_DEPENDENCIES` member in every target (`src/core/constants.ts:511-522`), but `test` being dependency-free may be a deliberate property I cannot see the reason for.
7. **Reading the subject from the live barrel (`createSource`) rather than from the target's own guide.** Reading the guide would need one enumerator instead of two and would make the barrel-law assumption unnecessary. I refused it to keep the policy sweep independent of the `guides` project's result.

# Risks

- **The setup-helper half reddens the fleet on landing.** Evidence to settle: D4-M's fleet-wide reading of `tests/setup*.ts` exports against the hosted guide names, taken before D4-3 is briefed. If it is wide, Alternative B scoped to setup helpers is the fallback.
- **A target barrel is not pure star rows, so `Source.surface()` under-reads it and the gate passes a real collision.** Evidence: run `createSource({ module }).surface()` against every fleet checkout's `src/*/index.ts` and compare its count with `extractExports` over the same directories. A gap names the barrel to repair, not the enumerator to widen.
- **`guides` on `CANON_PATHS` changes `isCanonPath('guides/router.md')` to true** (`src/core/helpers.ts:221-223`), and that predicate feeds the live overlay and the executable's fetch list. Evidence: run `audit`, `repair`, and `catalog` against a fixture target before and after the list change, and compare the planned artifact sets. My reading of `Upstream.#answer` (`src/server/Upstream.ts:495-502`) says guides are already refused there, but the overlay's other readers are unverified by me.
- **A target holding `guides/guide.md` from a previous `repair` reads as foreign drift once the plan stops claiming it.** Evidence: `scaffold audit` against a target repaired under the old path set, run with the new host. If it reports drift, the migration needs a named step rather than a silent re-pin.
- **The hosted guide set grows the published package by the whole fleet's documentation.** Evidence: `npm pack --dry-run` before and after, comparing the tarball's unpacked size. If the growth is material, the fallback is staging a names-only projection of each guide's Surface instead of the guide bytes — which costs the offline `catalog` capability the user asked for, so measure before proposing it.
- **`repair` restoring the new `tests/setupPolicy.ts` into a target whose `@orkestrel/guide` pin is older than the enumerators the sweep calls.** Evidence: the declared range for `@orkestrel/guide` in `BASE_DEV_DEPENDENCIES` (`src/core/constants.ts:511-522`) against the version that first exported `createSource` and `createGuide`.
