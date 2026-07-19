# Scaffold

> A synchronous, deterministic **package-blueprint compiler** for the `@orkestrel` line:
> a closed, JSON-serializable **`Blueprint`** (name, surfaces, dependencies, overrides…)
> is compiled into a **`Plan`** — an ordered list of **`Artifact`**s, each carrying an
> `origin` that says whether its content was host-copied, template-filled, or computed —
> and every downstream product (the files on disk, a review document, an audit of an
> existing package, a dry-run summary) is **projected** from that one `Plan`, never
> authored separately.
> FORWARD: a `Blueprint` is **drafted** into artifacts — the §1.2 variant matrix as data
> (`SURFACE_MATRIX`) selects the `exports` map, the per-surface configs, and the test
> projects; caller **`overrides`** layer over the shipped defaults — the fail-closed
> **gate** validates the name, surfaces, and dependencies, and a passing plan is **pinned**
> (`trace` + `hash` derived from content, never authored).
> REVERSE: `planToReview` / `planToSummary` render the plan for humans; `diffPlan` audits
> it against a target's current content and returns **drift findings as data**; the server
> surface's `Materializer` is the impure WRITE step.
> LIVE: the server surface's `Sync` entity fetches each declared dependency's guide and
> registry version from upstream — reporting freshness, refreshing mirrors under an explicit
> apply — the ONLY part of the system that touches the network.
> This module runs no `git`, invokes no `npm`, and embeds no LLM; its only network access is
> the server `Sync` entity's read-only fetch of upstream guides and registry versions. The
> core is pure (no `node:*`, no clocks, no randomness — `trace` and `hash` derive from
> content alone), and writing lives behind an explicit apply on the server surface. A
> blueprint that fails the gate yields a visible INCOMPLETE `Scaffolding` carrying the
> questions — a half-formed package is worse than a question, so the gate fails closed rather
> than emitting.
> Every discriminant names its axis, never `kind` / `type` (AGENTS §4.4): `origin` splits
> how an artifact's content is produced, `group` splits the artifact groups, `surface`
> splits the environment faces, `category` splits declared members, `drift` splits audit
> verdicts, `freshness` splits sync currency, `stage` splits the pipeline phases, `code`
> splits coded errors. Source: [`src/core`](../../src/core) + [`src/server`](../../src/server)
>
> - the [`src/bin`](../../src/bin) CLI. The core surfaces through `@src/core`, the materializer
>   and sync through `@src/server`; the bin is an executable, not a barrel.

The problem this module solves: standing up (or auditing) an `@orkestrel` package is a
mechanical projection of the line's conventions onto a name — the exports map for the
variant, the per-surface build configs, the barrels, the guide stubs, the parity harness —
yet the only tool the line had was `scripts/scaffold.sh`: a
core-only bash script whose every template is a **frozen heredoc**, so when a convention
moves, each repo's copy silently rots and the char-width table padding is hand-rolled with
`printf` byte math a UTF-8 cell defeats. This package **fully replaces** that script.
Rendered defaults ship as **versioned package data** — frozen `TemplateDefinition`s filled
by `@orkestrel/template`'s pure engine — so a convention change is a version bump here, not
a hand-edit in every repo. The module is deliberately **mechanism, never policy** (AGENTS
§21): the judgment calls (the name, the description, the keywords, which surfaces, which
dependencies, any template override) belong to the caller — a human, or an agent following
a `/scaffold` command — while this module supplies the closed vocabularies, the variant
matrix as data, the exact-record validation, the fail-closed gate, the deterministic pin,
and the lossless projections. Separating the WHAT (the `Blueprint`) from the HOW (the
`Plan` and its writes) is the whole design: because the plan and the audit are pure data,
the same engine that _creates_ a package can **audit** an existing one (`diffPlan` against
its current content — the SCAFFOLD.md §13.3 consistency checklist, now returned as
findings) and **repair** only what drifted. Scaffold is the line's conformance engine, not
merely its generator. And because the vendored dependency mirrors and pinned ranges
themselves drift as upstream moves, the server `Sync` entity is the freshness arm — it
fetches each declared `@orkestrel` dependency's guide and registry version from upstream and
reports (or, under an explicit apply, refreshes) what has fallen behind.

The compiler's core stands on four runtime dependencies — `@orkestrel/contract` (the shape
DSL behind the `Blueprint` / `Plan` contracts), `@orkestrel/emitter` (the observation
side-channels), `@orkestrel/markdown` (the AST + `renderMarkdown` the guide-table emitter
rides), and `@orkestrel/template` (whose pure `fillTemplate` LEAF carries the rendered
defaults, with NO `TemplateManager` inside the compiler — the core stays pure and
stateless). The bin adds two more, consumed ONLY at the executable: `@orkestrel/terminal`
(interactive blueprint prompts) and `@orkestrel/console` (the reporter + spinner). Because
`@orkestrel/terminal` is an L3 package, `@orkestrel/scaffold` sits at **L4** in the line's
dependency layering.

## Surface

Compile a `Blueprint` into a `Scaffolding`, then project the `Plan` it carries — the whole
core path is pure and synchronous; writing lives on the server surface:

```ts
import { blueprint, createCompiler, dependency, planToReview } from '@orkestrel/scaffold'

const compiler = createCompiler()

const scaffolding = compiler.compile(
	blueprint('router', {
		description: 'A tiny hash-router. Part of the @orkestrel line.',
		keywords: ['router', 'hash', 'spa'],
		surfaces: ['core', 'browser', 'server'],
		dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
	}),
)

scaffolding.complete // true — the gate passed
if (scaffolding.plan) {
	scaffolding.plan.artifacts.length // every file the package needs, ordered
	planToReview(scaffolding.plan) // the copy-ready dry-run review document
}

compiler.emitter.on('block', (questions) => questions.length)
compiler.destroy()
```

`compile()` is genuinely SYNCHRONOUS and runs the fixed three-stage pipeline
`[draft, gate, pin]`; a failing gate yields a visible INCOMPLETE `Scaffolding` (`plan`
absent, `questions` populated) rather than throwing. Compilation, review, summary, and
audit are ALL pure — no clocks, no randomness, no `node:*`, no I/O. The package has THREE
faces: the pure **core** (`@orkestrel/scaffold`), the server face
(`@orkestrel/scaffold/server`) — the impure `Materializer` writes and the `Sync` fetches —
and the **bin** CLI (`src/bin/scaffold.ts`, the `scaffold` executable). The Surface below
documents the two LIBRARY faces, marked **(server)** where server-only; the bin is an
EXECUTABLE, not a barrel — it exports NO public members, so `SURFACES` stays closed at three
(`Surface` names the SCAFFOLDED package's environment faces, unrelated to scaffold's own
three code faces). The core and the `Materializer` are deterministic and synchronous; the
bin AND the server `Sync` entity are legitimately Promise-based — the bin's interactive
prompt flow (`@orkestrel/terminal`) and `Sync`'s upstream fetches are async orchestration
AROUND the synchronous `compile` / write, never inside them.

### Types

| Type                    | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Surface`               | type      | `'core' \| 'browser' \| 'server'` — the environment surface an artifact or member belongs to (the SCAFFOLDED package's faces, not scaffold's own).                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Origin`                | type      | `'host' \| 'template' \| 'computed'` — how an `Artifact`'s content is produced: `host` byte-copied from the vendored data root, `template` filled from a frozen `TemplateDefinition` by `@orkestrel/template`'s pure fill engine, `computed` derived by the core's §4.2/§4.3 combination logic; the axis that decides whether it carries `source` (host) or `content` (template / computed).                                                                                                                                                                                                    |
| `Group`                 | type      | `'manifest' \| 'configs' \| 'source' \| 'tests' \| 'guides' \| 'docs' \| 'orchestration'` — the closed artifact-group vocabulary a plan selects over.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Category`              | type      | `'type' \| 'constant' \| 'factory' \| 'entity'` — what a declared `Member` IS in the scaffolded surface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `Drift`                 | type      | `'aligned' \| 'stale' \| 'missing' \| 'foreign'` — one `Finding`'s verdict against the target's current content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `Freshness`             | type      | `'current' \| 'behind' \| 'missing' \| 'failed'` — one `GuideSync` / `VersionSync`'s currency against upstream (`missing` = an upstream `404`, `failed` = a transport fault).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `CompileStage`          | type      | `'draft' \| 'gate' \| 'pin'` — the three fixed pipeline phases, in order.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ScaffoldErrorCode`     | type      | `'INVALID' \| 'BLOCKED' \| 'DESTROYED' \| 'TARGET' \| 'WRITE' \| 'FETCH'` — coded `ScaffoldError` reasons.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `Dependency`            | interface | `{ name, range }` — one runtime `@orkestrel/*` dependency; drives its `package.json` entry, the build externals, and its `guides/src/<dep>.md` mirror — byte-correct for a dep this package vendors (contract / emitter / markdown / template / terminal / console / guide), a `host`-origin POINTER the caller syncs otherwise.                                                                                                                                                                                                                                                                |
| `Override`              | interface | `{ path, content }` — one caller template override; `content` REPLACES the rendered artifact at `path`, never partially merges. An override whose `path` matches no planned artifact, or targets a `host`-origin path, is a BLOCKING question — never a silent add.                                                                                                                                                                                                                                                                                                                             |
| `Blueprint`             | interface | `{ name, description, keywords, surfaces, dependencies, version, engines, overrides }` — the closed, JSON-serializable package spec.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `Member`                | interface | `{ name, category, summary, surface }` — one declared public export of the scaffolded package; derived by `blueprintToMembers`, never authored.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `Artifact`              | interface | `{ path, group, origin, surface?, content?, source? }` — one file in a `Plan`; `content` present for `template` / `computed`, `source` (a host-relative path) for `host`.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Plan`                  | interface | `{ blueprint, groups, artifacts, trace?, hash? }` — the compiled, ordered artifact list plus the selection it covers; `trace` / `hash` filled by the pin.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Finding`               | interface | `{ path, group, drift }` — one audit drift result.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Audit`                 | interface | `{ findings, clean, complete, questions, drifted, missing, foreign }` — the whole diff of a plan against a target's content; a `Compiler.audit` over a gate-failing blueprint sets `complete: false` with the gate's `questions` and zero findings, while `diffPlan` over an existing plan is always `complete: true`.                                                                                                                                                                                                                                                                          |
| `Question`              | interface | `{ field, text, blocking, candidates? }` — one validation issue; `blocking: true` fails the gate closed, `false` is an advisory that rides a complete result.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Validation`            | interface | `{ valid, questions, warnings }` — the semantic pass over a blueprint; returns, never throws.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `GuideSync`             | interface | `{ name, path, content, freshness }` — one dependency guide fetched from upstream (`content`) at its `path`, plus its `freshness` verdict against the caller-supplied reference (see `guides`).                                                                                                                                                                                                                                                                                                                                                                                                 |
| `VersionSync`           | interface | `{ name, range, latest, freshness }` — one dependency's declared `range` against the registry `latest`, plus its `freshness` verdict.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `SyncReport`            | interface | `{ target, guides, versions, clean, failed }` — the whole outcome of a `Sync.pull`: the fetched `guides` + `versions`, `clean` (no drift AND no failures), and the `failed` count.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `PlanSummary`           | interface | `{ name, surfaces, groups, artifacts, host, template, computed }` — the dry-run tally.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `CompileRecord`         | interface | `{ stage, input, output, failed, error? }` — a structured input/output snapshot of one pipeline phase.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `CompileFailure`        | interface | `{ stage, code, message }` — a visible marker for a stage that failed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `Scaffolding`           | interface | `{ blueprint, plan?, questions, stages, failures, complete, digest }` — the full, replayable outcome of one `compile()` call.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `PlanRecord`            | interface | `{ id, plan, version, hash }` — a versioned, content-hashed `Plan` inside a `PlanManager`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `MaterializeResult`     | interface | `{ target, written, copied, skipped }` — the outcome of one materialization **(server)**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `CompilerEventMap`      | type      | `Compiler`'s push observation surface (AGENTS §13) — `compile(scaffolding)` · `audit(audit)` · `block(questions)` · `error(error)` · `destroy()`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `CompilerOptions`       | interface | `{ on?, error? }` — input to `createCompiler`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `CompilerInterface`     | interface | The compilation orchestrator contract — `emitter` + `compile` / `audit` / `destroy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `PlanManagerEventMap`   | type      | `PlanManager`'s push observation surface — `add(id)` · `remove(id)` · `destroy()`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `PlanManagerOptions`    | interface | `{ plans?, on?, error? }` — input to `createPlanManager`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `PlanManagerInterface`  | interface | The plan registry contract (AGENTS §9) — `emitter` / `size` + `has` / `plan` / `plans` / `add` / `remove` / `destroy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MaterializerEventMap`  | type      | `Materializer`'s push observation surface **(server)** — `copy(path)` · `write(path)` · `done(result)` · `error(error)` · `destroy()`.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MaterializerOptions`   | interface | `{ host?, on?, error? }` — input to `createMaterializer` **(server)**; `host` is the vendored-data root host-origin artifacts are copied FROM (defaults to the nearest package root at or above the working directory).                                                                                                                                                                                                                                                                                                                                                                         |
| `MaterializerInterface` | interface | The materialization contract **(server)** — `emitter` + `materialize` / `repair` / `destroy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `SyncEventMap`          | type      | `Sync`'s push observation surface **(server)** — `guide(name)` · `version(name)` · `write(path)` · `done(report)` · `error(error)` · `destroy()`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `SyncOptions`           | interface | `{ on?, error?, guides?, registry?, concurrency?, retries?, strict?, limit? }` — input to `createSync` **(server)**; the endpoint bases + branch are INJECTABLE (`guides.base` default `raw.githubusercontent.com`, `guides.branch` default `main`, `registry.base` default `registry.npmjs.org`, `guides.timeout` / `registry.timeout` default 10s), `concurrency` default 6, `retries` default 0, `strict` default false, `limit` (max response body bytes; declared `Content-Length` or streamed total, whichever trips first — an overflow is a transport fault) default 5,242,880 (5 MiB). |
| `SyncInterface`         | interface | The upstream-synchronization contract **(server)** — `emitter` + `guides` / `versions` / `pull` / `write` / `destroy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

The `Blueprint` and the `Plan` are the two closed contracts — every field is a `string`,
`readonly` array, or record, so both round-trip JSON and both cross a tool / RPC boundary
unchanged. `Artifact` is discriminated by `origin`: a `host` artifact names a `source` (the
host-relative path the server byte-copies from the vendored data root) and carries NO
`content` (the pure core never reads host bytes); a `template` artifact carries `content`
FILLED from a frozen `TemplateDefinition` by `@orkestrel/template`'s pure `fillTemplate`
engine (`missing: 'error'` — an unresolved token fails loud, never silently blanks); a
`computed` artifact carries `content` DERIVED by the core's own §4.2/§4.3 combination logic
(the `exports` map, the entry re-pointing). The token-collision boundary is a HARD rule:
only genuinely templated PROSE artifacts (the README, the guide stubs, file headers) pass
through the fill engine; a STRUCTURAL file (a JSON or TS config, anything that could
legitimately contain a literal `{{…}}`) is ALWAYS `computed`, never `template`, so a stray
`{{` in a tsconfig can never be mistaken for a placeholder. That single `origin` axis is
what keeps the core pure while still describing files it cannot itself read.

### Constants

| API                       | Kind  | Summary                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SURFACES`                | const | The three `Surface` values, frozen — compose with `literalOf(...)` / `parseEnum(...)`.                                                                                                                                                                                                                                                                                           |
| `ORIGINS`                 | const | The three `Origin` values, frozen.                                                                                                                                                                                                                                                                                                                                               |
| `GROUPS`                  | const | The seven `Group` values, frozen — the artifact-group selection vocabulary.                                                                                                                                                                                                                                                                                                      |
| `CATEGORIES`              | const | The four `Category` values, frozen.                                                                                                                                                                                                                                                                                                                                              |
| `FRESHNESS`               | const | The four `Freshness` values, frozen — the currency axis `Sync` reports on.                                                                                                                                                                                                                                                                                                       |
| `COMPILE_STAGES`          | const | `['draft', 'gate', 'pin']`, frozen — the pipeline phases in order.                                                                                                                                                                                                                                                                                                               |
| `SURFACE_MATRIX`          | const | The §1.2 variant matrix as data: per `Surface`, its `configs/src` files, Vitest project label, `exports` subpath, and build formats — the per-surface layer `blueprintToPlan` reads BENEATH the SCAFFOLD.md §4.2/§4.3 combination rules it applies on top.                                                                                                                       |
| `HOST_PATHS`              | const | The byte-copied host artifact paths (AGENTS.md, CLAUDE.md, SCAFFOLD.md, LICENSE, `.claude`, `scripts/*` — the SessionStart hooks + `mirror.sh` + `scaffold.sh` today — `.editorconfig`, `.gitattributes`, `.gitignore`, `.oxfmtrc.json`, `.oxlintrc.json`, `.oxlintignore`, `.prettierignore`, `.github/workflows/ci.yml`), frozen; `scaffold.sh` leaves this set at retirement. |
| `NAME_PATTERN`            | const | The `/^[a-z][a-z0-9-]*$/` package-name RegExp (the `scaffold.sh` name law, now data).                                                                                                                                                                                                                                                                                            |
| `DEPENDENCY_NAME_PATTERN` | const | The `/^@orkestrel\/[a-z][a-z0-9-]*$/` dependency-name RegExp — every `Dependency.name` must be `@orkestrel`-scoped and NAME_PATTERN-shaped after the scope, closing the traversal vector a hand-built `../`-laced name would open through the pointer-artifact and `Sync.write` path derivation.                                                                                 |
| `DEFAULT_VERSION`         | const | `'0.0.1'` — the starting version the `blueprint` builder fills.                                                                                                                                                                                                                                                                                                                  |
| `DEFAULT_ENGINES`         | const | `'>=22'` — the `engines.node` range the `blueprint` builder fills.                                                                                                                                                                                                                                                                                                               |
| `COMPILER_ID`             | const | `'compiler'` — the default id for a `Compiler` orchestrator.                                                                                                                                                                                                                                                                                                                     |
| `TEMPLATES`               | const | The shipped, versioned `TemplateDefinition` data every `template`-origin artifact fills against (README, the own-guide stub, the guides index, the source/test stubs) — placeholders documented per entry, frozen.                                                                                                                                                               |

```ts
import {
	CATEGORIES,
	DEPENDENCY_NAME_PATTERN,
	FRESHNESS,
	GROUPS,
	HOST_PATHS,
	NAME_PATTERN,
	ORIGINS,
	SURFACES,
	TEMPLATES,
} from '@orkestrel/scaffold'

SURFACES // ['core', 'browser', 'server']
ORIGINS // ['host', 'template', 'computed']
GROUPS // ['manifest', 'configs', 'source', 'tests', 'guides', 'docs', 'orchestration']
CATEGORIES // ['type', 'constant', 'factory', 'entity']
FRESHNESS // ['current', 'behind', 'missing', 'failed']
NAME_PATTERN.test('router') // true
NAME_PATTERN.test('Router') // false — the package-name law rejects a leading capital
DEPENDENCY_NAME_PATTERN.test('@orkestrel/contract') // true
DEPENDENCY_NAME_PATTERN.test('@orkestrel/../etc') // false — closes the traversal vector
HOST_PATHS.includes('scripts/mirror.sh') // true — the mirror stays in the orchestration set
HOST_PATHS.includes('scripts/scaffold.sh') // true today — leaves HOST_PATHS at retirement
TEMPLATES.entity.placeholders // [{ name: 'pascal', … }] — the entity stub's one token
```

A closed-set field that does not fit a listed value is a signal the request is mis-scoped,
not licence to invent a value — the exact-record validators below reject an off-vocabulary
literal, and the shapers compile the same tuples into the JSON Schema `enum`s, so the
vocabulary cannot drift between the guard, the parser, and the schema.

### Errors

| API               | Kind     | Summary                                             |
| ----------------- | -------- | --------------------------------------------------- |
| `ScaffoldError`   | class    | Carries a `ScaffoldErrorCode` + optional `context`. |
| `isScaffoldError` | function | Narrow a caught value to a `ScaffoldError`.         |

```ts
import { isScaffoldError, ScaffoldError } from '@orkestrel/scaffold'

try {
	throw new ScaffoldError('INVALID', 'Blueprint failed the exact-record contract')
} catch (error) {
	if (isScaffoldError(error)) error.code // 'INVALID'
}
```

Throws are reserved for caller misuse (AGENTS §12): `createBlueprint` on off-contract data
throws `INVALID`, any method after `destroy()` throws `DESTROYED`, and on the server surface
a non-vacant target throws `TARGET` while a failed write throws `WRITE`. A failing gate is
NOT an error — it fails closed into an incomplete `Scaffolding` whose `failures` carry a
`BLOCKED` marker, mirroring the brief compiler's visible-incomplete outcome. `FETCH` is
server/bin-only: the `Sync` entity throws it ONLY under `strict` mode when an upstream fetch
fails (or on wrap-level misuse), naming the failing URL in `context`; in the default COLLECT
mode a per-dependency `404` becomes `freshness: 'missing'` and any transport error / other
non-2xx becomes `freshness: 'failed'`, captured on the `SyncReport` rather than thrown.

### Validators

Total guards (AGENTS §14) COMPILED from the shapers below via the contract package's
`createContract` — one shape declaration is the single source, so `isBlueprint`,
`parseBlueprint`, and the JSON Schema can never drift. Adversarial input (junk, cycles,
hostile prototypes) returns `false`, never throws. Every record guard is EXACT: an extra
key fails, which is why the builders below omit absent optional keys.

| API            | Kind  | Narrows to                                                                                                                                        |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isDependency` | const | `Dependency` — `name` a non-empty string, `range` a non-empty string.                                                                             |
| `isOverride`   | const | `Override` — `path` / `content` non-empty strings.                                                                                                |
| `isBlueprint`  | const | `Blueprint` — `surfaces` on-vocabulary and non-empty; `name` a non-empty string (the `NAME_PATTERN` law is the semantic pass's, not the guard's). |
| `isMember`     | const | `Member` — `category` an on-vocabulary `Category`, `surface` an on-vocabulary `Surface`.                                                          |
| `isArtifact`   | const | `Artifact` — `group` / `origin` on-vocabulary; `content` xor `source` per `origin`.                                                               |
| `isPlan`       | const | `Plan` — the whole exact-record contract, section guards composed.                                                                                |
| `isSyncReport` | const | `SyncReport` — the whole exact-record sync contract, `guide` / `version` sections composed.                                                       |

```ts
import {
	blueprint,
	isBlueprint,
	isDependency,
	isPlan,
	validateBlueprint,
} from '@orkestrel/scaffold'

isDependency({ name: '@orkestrel/contract', range: '^0.0.5' }) // true
isBlueprint({ name: 'router', surfaces: ['core'] }) // false — sections missing (exact record)

// NAME_PATTERN is the semantic pass's job, not the shape's — so the guard passes an
// off-pattern name and validateBlueprint is what rejects it:
const offPattern = blueprint('Router', { surfaces: ['core'] }) // a complete spec; name off NAME_PATTERN
isBlueprint(offPattern) // true — the shape polices STRUCTURE only
validateBlueprint(offPattern).valid // false — the semantic pass owns the NAME_PATTERN law

isPlan({ blueprint: {}, groups: [], artifacts: [] }) // false — blueprint off-contract
```

### Parsers

The coercing counterparts of the guards, COMPILED from the same shapes through the contract
package's `createContract` — a guard-valid value round-trips unchanged, an off-contract
value returns `undefined`, and neither ever throws (AGENTS §14). This is the parse-then-trust
boundary for a stored plan, a tool argument, or an agent's emission.

| API               | Kind  | Returns                                                          |
| ----------------- | ----- | ---------------------------------------------------------------- |
| `parseBlueprint`  | const | a `Blueprint` from `unknown` / a JSON string, else `undefined`.  |
| `parsePlan`       | const | a `Plan` from `unknown` / a JSON string, else `undefined`.       |
| `parseSyncReport` | const | a `SyncReport` from `unknown` / a JSON string, else `undefined`. |

```ts
import { blueprint, isBlueprint, parseBlueprint } from '@orkestrel/scaffold'

const json = JSON.stringify(blueprint('router', { surfaces: ['core'] })) // a complete, on-contract spec
const parsed = parseBlueprint(json) // Blueprint | undefined
parsed && isBlueprint(parsed) // true — a non-undefined parse always satisfies the guard
parseBlueprint('{"name":"router"}') // undefined — sections missing (exact record), never throws
```

### Shapers

The `Blueprint` and `Plan` contracts declared ONCE as contract `ContractShape` values
(AGENTS §14 heavy machinery, earned here: validation, the JSON Schema a tool boundary needs,
and seeded test blueprints must stay in lockstep). Each shaper is a function returning a
fresh shape value; `blueprintShape()` / `planShape()` compose the section shapes, and the
module's own validators and parsers are compiled from them at the barrel.

| API               | Kind     | Builds…                                                                                                                                                                                                                                 |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dependencyShape` | function | the `Dependency` object shape.                                                                                                                                                                                                          |
| `overrideShape`   | function | the `Override` object shape.                                                                                                                                                                                                            |
| `blueprintShape`  | function | the `Blueprint` object shape — `surfaces` a `literalShape(SURFACES)` array with `min: 1`; `name` a plain `min: 1` string, NOT pattern-constrained, so `generate` stays satisfiable (the `NAME_PATTERN` law lives in the semantic pass). |
| `memberShape`     | function | the `Member` object shape — `category` / `surface` literal shapes.                                                                                                                                                                      |
| `artifactShape`   | function | the `Artifact` object shape — `origin` a `literalShape(ORIGINS)`; `content` / `source` optional.                                                                                                                                        |
| `planShape`       | function | the whole `Plan` object shape, section shapes composed; `trace` / `hash` optional.                                                                                                                                                      |
| `syncReportShape` | function | the `SyncReport` object shape — `guide` + `version` array sub-shapes (each with a `literalShape(FRESHNESS)`) composed; `isSyncReport` / `parseSyncReport` compile from it.                                                              |

```ts
import {
	artifactShape,
	blueprintShape,
	dependencyShape,
	memberShape,
	overrideShape,
	planShape,
	syncReportShape,
} from '@orkestrel/scaffold'
import { createContract, schemaToParameters, seededRandom } from '@orkestrel/contract'

const contract = createContract(blueprintShape())
contract.schema // the full JSON Schema — hand to a tool boundary via schemaToParameters
contract.generate(seededRandom(42)) // a reproducible, on-contract seed blueprint for tests
schemaToParameters(contract.schema) // the open tool-parameters record, no `as` anywhere

// The section shapes `blueprintShape` / `planShape` compose — each is a fresh, independent
// `ContractShape` value, usable on its own contract:
createContract(dependencyShape()).schema // the `Dependency` section schema alone
createContract(overrideShape()).schema // the `Override` section schema alone
createContract(memberShape()).schema // the `Member` section schema alone
createContract(artifactShape()).schema // the `Artifact` section schema alone
createContract(planShape()).schema // the whole `Plan` schema, section shapes composed
createContract(syncReportShape()).schema // the `SyncReport` schema — the compiled `isSyncReport` source
```

### Builders

Lowercase value builders — every builder returns a fresh object and OMITS absent optional
keys entirely, so its output round-trips the exact-record validators above.

| API          | Kind     | Builds…                                                                                                                                                                                                                |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dependency` | function | a `Dependency` from name / range.                                                                                                                                                                                      |
| `override`   | function | an `Override` from path / content.                                                                                                                                                                                     |
| `member`     | function | a `Member` from name / category / summary / surface (`surface` defaults `'core'`).                                                                                                                                     |
| `blueprint`  | function | a `Blueprint` from a name + a partial of the rest — `version` / `engines` default (`DEFAULT_VERSION` / `DEFAULT_ENGINES`), `surfaces` defaults `['core']`, and `keywords` / `dependencies` / `overrides` default `[]`. |

```ts
import { blueprint, dependency, override } from '@orkestrel/scaffold'

const spec = blueprint('router', {
	description: 'A tiny hash-router. Part of the @orkestrel line.',
	keywords: ['router', 'hash'],
	surfaces: ['core', 'browser'],
	dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
	overrides: [override('README.md', '# @orkestrel/router\n\nHand-written readme.\n')],
})
spec.version // '0.0.1' — the builder default
spec.engines // '>=22' — the builder default
```

### Helpers

Pure, exported utility functions (AGENTS §4.3) — the referentially-transparent leaves
behind the `Compiler`, the `Sync` entity, and the projection surface. Projections use the
`{noun}To{Noun}` idiom (AGENTS §4.6.1): each consumes a WHOLE and returns a derived view of it.

| API                      | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blueprintToMembers`     | function | Derive the declared public `Member[]` from a blueprint (name → Pascal → the canonical inventory per surface) — the SINGLE source both the source stubs and the guide Surface tables read. The skeleton vocabulary is deliberately the four `Category` buckets (`type` / `constant` / `factory` / `entity`); standalone helpers, validators, and shapers are hand-authored in implementation, not scaffolded.                      |
| `blueprintToPlan`        | function | The full pure compilation: draft the artifacts — the SCAFFOLD.md §4.2/§4.3 COMBINATION rules (multi-surface OMITS the top-level `package.json` `types`; a single-variant server-/browser-only retargets its lone surface to the `.` root, `main` / `module` re-pointed) OVER the per-surface `SURFACE_MATRIX` rows, plus `HOST_PATHS` and overrides — then pin; optionally scoped to a `Group[]` selection (default: all groups). |
| `pinPlan`                | function | Return a fresh `Plan` with `trace` (the one-line derivation summary) and `hash` (a canonical structural digest) filled — deterministic, no timestamps, no run-specific data.                                                                                                                                                                                                                                                      |
| `validateBlueprint`      | function | The semantic pass over a blueprint — name against `NAME_PATTERN` (and a 203-char bound, so the published `@orkestrel/<name>` fits npm's 214-character cap), non-empty on-vocabulary `surfaces`, well-formed `dependencies`, no duplicate members, `version` shaped `\d+.\d+.\d+`, `engines` shaped `>=\d+`, no duplicate override paths, and no empty override content. Returns a `Validation`, never throws.                     |
| `manifestToDependencies` | function | Parse a `package.json` text into `readonly Dependency[]`, keeping the `DEPENDENCY_NAME_PATTERN` entries across `dependencies` / `devDependencies` / `peerDependencies` (all three, deduplicated) — pure, never throws.                                                                                                                                                                                                            |
| `rangeToFreshness`       | function | Compare a declared `range` to the registry `latest`: `'current'` iff the range's `^0.0.N` exact pin equals `latest`, else `'behind'` (the `0.0.x` exact-pin law); the `missing` / `failed` verdicts come from the fetch layer, not this pure comparison.                                                                                                                                                                          |
| `diffPlan`               | function | The AUDIT projection: diff a plan's artifacts against a caller-supplied `Readonly<Record<string, string>>` of the target's current content, returning an `Audit` of drift findings — pure, no I/O.                                                                                                                                                                                                                                |
| `planToReview`           | function | Project a `Plan` into a copy-ready markdown review document — the artifact table by group, the members table, the summary; the diff-first dry run.                                                                                                                                                                                                                                                                                |
| `auditToReview`          | function | Project an `Audit` into a markdown drift report — findings grouped by `drift`, aligned entries elided; what `repair` will touch.                                                                                                                                                                                                                                                                                                  |
| `syncToReview`           | function | Project a `SyncReport` into a markdown freshness report via `alignTable` — the sibling of `auditToReview`, guides + versions grouped by `freshness`.                                                                                                                                                                                                                                                                              |
| `planToSummary`          | function | Project a `Plan` into a `PlanSummary` — the artifact tally by `origin`, the surfaces, and the covered groups.                                                                                                                                                                                                                                                                                                                     |
| `pascalCase`             | function | Derive the PascalCase entity name from a lowercase-hyphen package name (`'my-router'` → `'MyRouter'`) — hyphens are word breaks.                                                                                                                                                                                                                                                                                                  |
| `alignTable`             | function | Build a formatter-width-aligned GFM table string from header + row cell strings (+ optional `readonly TableAlign[]`) — the guide Surface-table emitter.                                                                                                                                                                                                                                                                           |

```ts
import {
	alignTable,
	blueprintToMembers,
	blueprintToPlan,
	diffPlan,
	manifestToDependencies,
	pascalCase,
	planToReview,
	planToSummary,
	rangeToFreshness,
	validateBlueprint,
} from '@orkestrel/scaffold'

const plan = blueprintToPlan(spec)
plan.hash // '7b1c9e04' — canonical FNV-1a digest of the plan's content, stable across runs
plan.trace // 'router · core+browser · groups:7 · artifacts:21' — derived, never authored

pascalCase('my-router') // 'MyRouter' — hyphens are word breaks
blueprintToMembers(spec) // [{ name: 'RouterOptions', category: 'type', surface: 'core' }, …]
planToSummary(plan) // { name: 'router', artifacts: 21, host: 12, template: 6, computed: 3, … }
planToReview(plan) // '# Scaffolding router\n## Artifacts\n| Path | Group | Origin |\n…'
validateBlueprint(spec) // { valid: true, questions: [], warnings: [] }

const current = { 'package.json': '{ "name": "@orkestrel/router" }' }
diffPlan(plan, current) // { findings: [...], clean: false, complete: true, drifted: 1, missing: 20, foreign: 0 }

manifestToDependencies('{"dependencies":{"@orkestrel/contract":"^0.0.5"}}') // [{ name: '@orkestrel/contract', range: '^0.0.5' }]
rangeToFreshness('^0.0.5', '0.0.5') // 'current' — pinned to latest
rangeToFreshness('^0.0.5', '0.0.7') // 'behind' — a newer patch is published

alignTable(['API', 'Kind'], [['`createRouter`', 'function']]) // '| API           | Kind     |\n| … |'
```

`alignTable` builds a markdown `TableNode` (each cell's string parsed with `parseInline`)
and serializes it through `@orkestrel/markdown`'s `renderMarkdown`, which contributes the
STRUCTURE — `\|`-escaping any literal pipe inside a cell and emitting the alignment delimiter
row — at a flat 1-space cell padding. `alignTable` then re-pads BOTH the cells AND the
delimiter row to per-column codepoint width; that re-pad is the whole capability, matching
oxfmt's markdown re-padding so a generated guide passes `format:check` without a formatter
run — the char-width-padding problem `scaffold.sh` hand-rolled with byte-counting `printf`,
now typed and tested. The `\|`-escape is load-bearing: an unescaped pipe in a cell would
split it into two columns and silently corrupt the table. Its optional `readonly
TableAlign[]` is the `@orkestrel/markdown` alignment type, imported at the call site, never
re-exported here (AGENTS §6).

### Factories

| API                  | Kind     | Builds…                                                                                                                                                                          |
| -------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `createCompiler`     | function | A `CompilerInterface` — the compilation orchestrator, seeded from `CompilerOptions`.                                                                                             |
| `createPlanManager`  | function | A working `PlanManagerInterface`.                                                                                                                                                |
| `createBlueprint`    | function | Validate and return a `Blueprint` from plain data — throws `ScaffoldError('INVALID', …)` on failure (structure AND the semantic pass, so an off-`NAME_PATTERN` name throws too). |
| `createMaterializer` | function | A `MaterializerInterface` **(server)** — the materialization entity, seeded from `MaterializerOptions`.                                                                          |
| `createSync`         | function | A `SyncInterface` **(server)** — the upstream-synchronization entity, seeded from `SyncOptions`.                                                                                 |

```ts
import { createBlueprint, createCompiler, createPlanManager } from '@orkestrel/scaffold'

const compiler = createCompiler() // owns a typed emitter, no sub-engines
compiler.destroy()

const plans = createPlanManager()
plans.size // 0
plans.destroy()

createBlueprint({ name: 'Router', surfaces: [] }) // throws ScaffoldError('INVALID', …)
```

### Entities

| API            | Kind  | Summary                                                                                                                                                                                                            |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Compiler`     | class | The compilation orchestrator — runs the three-stage pipeline and the audit projection, owns a typed emitter.                                                                                                       |
| `PlanManager`  | class | The self-owning, versioned/hashed plan registry (AGENTS §9) — record ids default to each plan's own content hash.                                                                                                  |
| `Materializer` | class | The materialization entity **(server)** — the impure WRITE surface; writes a plan (green-field) or repairs drift (into-existing).                                                                                  |
| `Sync`         | class | The upstream-synchronization entity **(server)** — the impure FETCH sibling of `Materializer`; fetches dependency guides + registry versions, refreshes vendored mirrors under the containment law. Promise-based. |

The server surface also ships three helpers and its factories:

| API            | Kind     | Summary                                                                                                                                              |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isVacant`     | function | **(server)** Whether a target path is absent, empty, or contains nothing but a `.git` directory — the green-field target law.                        |
| `readTarget`   | function | **(server)** Read a target's current content at a set of relative paths into a `Record<string, string>` — the I/O that feeds the pure `diffPlan`.    |
| `readManifest` | function | **(server)** Read `target/package.json` text; an absent manifest throws `ScaffoldError('TARGET', …)` — the read that feeds `manifestToDependencies`. |

```ts
import { createMaterializer, isVacant } from '@orkestrel/scaffold/server'

const target = './packages/router'
isVacant(target) // true — absent, empty, or nothing but a .git dir

const materializer = createMaterializer()
const result = materializer.materialize(plan, target) // writes every artifact; throws TARGET if not vacant
result.written // ['package.json', 'tsconfig.json', 'src/core/index.ts', …] — rendered files
result.copied // ['AGENTS.md', 'LICENSE', '.claude/settings.json', …] — host-origin byte copies
materializer.destroy()
```

## Methods

The public methods of each behavioral interface — one table per type, keyed by its
backticked name, every call-signature member listed (the `readonly` data members —
`emitter` on `Compiler`; `emitter` / `size` on `PlanManager`; `emitter` on `Materializer`
and `Sync` — stay in the Surface rows above). Each implementing class exposes exactly its
interface's methods, so this doubles as the per-instance method surface (AGENTS §22). The
bin (`src/bin/scaffold.ts`) is a thin procedural entrypoint — it implements NO behavioral
interface and carries no Methods table (it exports no public members, and §22 parity
excludes `src/bin`).

#### `CompilerInterface`

`compile` and `audit` are genuinely SYNCHRONOUS and pure — the compiler holds no I/O. After
`destroy()` every method except the getter and `destroy` itself throws
`ScaffoldError('DESTROYED', …)`; `destroy()` is idempotent and tears the emitter down LAST.

| Method    | Returns       | Behavior                                                                                                                                                                                                                                                                                           |
| --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compile` | `Scaffolding` | Run the three-stage pipeline over a `Blueprint` (optionally scoped to a `Group[]` selection), returning a complete or visible-incomplete result.                                                                                                                                                   |
| `audit`   | `Audit`       | Compile the blueprint (optionally group-scoped), then diff the plan against the caller-supplied current target content — drift findings as data, no I/O. A gate-failing blueprint returns an `Audit` with `complete: false`, the gate's blocking `questions`, and ZERO findings — no plan to diff. |
| `destroy` | `void`        | Idempotent teardown — emits `destroy`, then destroys the emitter LAST.                                                                                                                                                                                                                             |

A groups-scoped `Scaffolding`'s `plan`, materialized into a VACANT target, writes only THOSE
groups' artifacts — a deliberate partial tree, not a complete package. Full package creation
uses the unscoped `compile` (no `groups` argument); `repair` — which reads an existing target's
`Audit` rather than assuming vacancy — is the primary scoped consumer.

```ts
import { blueprint, createCompiler } from '@orkestrel/scaffold'

const compiler = createCompiler()
const spec = blueprint('timeout', {
	description: 'A typed timeout. Part of the @orkestrel line.',
	surfaces: ['core'],
})

const scaffolding = compiler.compile(spec)
scaffolding.stages.map((record) => record.stage) // ['draft', 'gate', 'pin']
scaffolding.complete // true
scaffolding.plan?.hash // pinned

const audit = compiler.audit(spec, { 'package.json': '{ "name": "@orkestrel/timeout" }' })
audit.clean // false — the current target is nearly empty
audit.missing // 19 — everything but package.json is absent
compiler.destroy()
```

#### `PlanManagerInterface`

The self-owning, ordered registry over plans (AGENTS §9). `add` re-pins the plan and mints
each record's `id` FROM its content `hash` — the hash IS the identity, so distinct content
always mints a fresh record at `version: 1`; re-adding a plan whose content is unchanged
resolves to the SAME id and returns the existing record untouched, `version` never
incrementing. The array overload of `remove` is declared FIRST (AGENTS §9.2) so an id list
resolves to the batch form. A call after `destroy()` throws `ScaffoldError('DESTROYED', …)`.

| Method    | Returns                   | Behavior                                                                                              |
| --------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `has`     | `boolean`                 | Whether a plan with the given id is registered.                                                       |
| `plan`    | `PlanRecord \| undefined` | Look up ONE registered plan record by id (AGENTS §9.1 singular accessor).                             |
| `plans`   | `readonly PlanRecord[]`   | List ALL registered plan records (AGENTS §9.1 plural accessor).                                       |
| `add`     | `PlanRecord`              | Register (or re-register) one plan; emits `add`.                                                      |
| `remove`  | `boolean` (or `void`)     | Remove LISTED plans by id, ONE plan by id, or ALL plans (AGENTS §9.2); emits `remove` per removed id. |
| `destroy` | `void`                    | Idempotent teardown — clears the collection, emits `destroy`, then destroys the emitter LAST.         |

```ts
import { blueprint, blueprintToPlan, createPlanManager } from '@orkestrel/scaffold'

const plans = createPlanManager()
const record = plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] })))
record.id === record.hash // true — id minted from content, deterministic
record.version // 1
plans.has(record.id) // true
plans.plan(record.id) // the PlanRecord, or undefined
plans.plans() // every registered record
plans.remove(record.id) // true
plans.destroy()
```

#### `MaterializerInterface`

**(server surface.)** The impure WRITE entity — `node:fs` writes behind an explicit call.
`materialize` is green-field: it refuses any target `isVacant` rejects
(throwing `ScaffoldError('TARGET', …)`), then byte-copies each `host` artifact from the
`host` root and writes each `template` / `computed` artifact's rendered `content`, failing
fast on any write error (`WRITE`). `repair` is into-existing: it skips the vacancy check and
writes ONLY the `missing` / `stale` artifacts an `Audit` names. After `destroy()` every
method throws `DESTROYED`; teardown is idempotent, emitter last.

| Method        | Returns             | Behavior                                                                                                                           |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `materialize` | `MaterializeResult` | Write a whole plan into a VACANT target — host copies + rendered writes; throws `TARGET` if the target is non-empty beyond `.git`. |
| `repair`      | `MaterializeResult` | Write ONLY the artifacts an `Audit` marks `missing` / `stale`, into an EXISTING target — the drift-repair path, no vacancy check.  |
| `destroy`     | `void`              | Idempotent teardown — emits `destroy`, then destroys the emitter LAST.                                                             |

```ts
import { blueprint, blueprintToPlan, diffPlan } from '@orkestrel/scaffold'
import { createMaterializer, readTarget } from '@orkestrel/scaffold/server'

const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
const materializer = createMaterializer()

// Green-field: write everything into a fresh, vacant directory.
materializer.materialize(plan, './packages/budget-new')

// Repair: audit an existing package, then write back only what drifted.
const audit = diffPlan(
	plan,
	readTarget(
		'./packages/budget',
		plan.artifacts.map((a) => a.path),
	),
)
materializer.repair(plan, audit, './packages/budget')
materializer.destroy()
```

#### `SyncInterface`

**(server surface.)** The impure FETCH sibling of `Materializer` — Promise-based,
network-only. Every method reads upstream over HTTPS with a 10-second per-request timeout
(`AbortSignal.timeout`) and bounded `concurrency` (default 6, never an unbounded
`Promise.all`); the default COLLECT posture captures each dependency's `freshness` (`404` →
`missing`, transport / non-2xx → `failed`) into the report, while `strict` mode instead
throws `ScaffoldError('FETCH', …)` naming the failing URL. `pull` and `write` are the two
halves of a sync — `pull` reads and reports (NO writes), `write` commits the fetched guides
under the containment law. After `destroy()` every method throws `DESTROYED`; teardown is
idempotent, emitter last.

| Method     | Returns                           | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `guides`   | `Promise<readonly GuideSync[]>`   | Fetch each named dependency's guide from the branch HEAD and verdict its `freshness` against an OPTIONAL `current` reference — a caller-supplied `Readonly<Record<string, string>>` of local-mirror content keyed by dependency name (the caller-supplied-reference pattern `diffPlan` uses for target content). WITH the map: a fetched guide byte-equal to its entry is `current`, differing or absent-from-map is `behind`. WITHOUT the map: a successful fetch is ALWAYS `behind` (no reference means it needs syncing). An HTTP `404` is `missing`, a transport fault `failed`, either way. Emits `guide` per resolution. |
| `versions` | `Promise<readonly VersionSync[]>` | Fetch each named dependency's registry `latest` and compare it to the declared `range` via `rangeToFreshness`; emits `version` per resolution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pull`     | `Promise<SyncReport>`             | Read `target/package.json` (`readManifest`), resolve its declared `@orkestrel` deps (`manifestToDependencies`), READ the target's existing `guides/src/<short>.md` mirrors into the `current` reference map (absent files simply omitted), then fetch guides (WITH that map) + versions and return a `SyncReport` — so `pull`'s `GuideSync` freshness is genuinely target-relative. NO writes; emits `done`.                                                                                                                                                                                                                   |
| `write`    | `Promise<readonly string[]>`      | Write a report's fetched guides into `target/guides/src` under the containment law (filenames derived from `DEPENDENCY_NAME_PATTERN`-validated names, never a traversal); returns the written paths and emits `write` per file.                                                                                                                                                                                                                                                                                                                                                                                                |
| `destroy`  | `void`                            | Idempotent teardown — emits `destroy`, then destroys the emitter LAST.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

```ts
import { createSync } from '@orkestrel/scaffold/server'

const sync = createSync() // defaults: raw.githubusercontent.com, branch main, registry.npmjs.org
const report = await sync.pull('.') // reads ./package.json, fetches guides + versions, NO writes
report.clean // false — a mirror or a range fell behind
report.guides.filter((guide) => guide.freshness === 'behind') // stale vendored mirrors
report.versions.filter((version) => version.freshness === 'behind') // out-of-date ranges

const written = await sync.write(report, '.') // commit the refreshed guides under guides/src
sync.destroy()
```

## Contract

These invariants hold across `src/core` + `src/server` ↔ `scaffold.md`:

1. **DOC ↔ SOURCE bijection.** Every `function` / `class` / `const` / `interface` / `type`
   row in the `## Surface` tables is a real export of the scaffold library source (core or
   server), and every such export appears as a Surface row — exhaustive, both directions
   (AGENTS §22). The scan covers `src/core` + `src/server` ONLY; `src/bin` is EXCLUDED — the
   bin is an executable with no public exports. Adding, renaming, or removing a library
   export breaks the parity gate until the doc is reconciled.
2. **Deterministic, synchronous, immutable — in the core and the `Materializer` (§11).** Same
   `Blueprint` + same `Group` selection → the same `Scaffolding`, every time — no clocks, no
   randomness, no I/O in the core, nothing async. `pinPlan`'s `trace` and `hash` derive from
   the plan's CONTENT alone (paths, origins, sources, and rendered content — everything the
   blueprint fully determines), and the `PlanManager` mints record ids from that hash, so
   re-adding an unchanged plan is a version no-op. The **bin** AND the server `Sync` entity
   are legitimately Promise-based — the bin's prompt flow and `Sync`'s upstream fetches
   orchestrate AROUND the synchronous `compile` / write, never inside them; the core and the
   `Materializer` stay synchronous. No input is ever mutated; every builder, projection, and
   pipeline stage returns a fresh value.
3. **Three origins, one token boundary.** An `Artifact`'s `origin` is exhaustive and
   load-bearing: `host` artifacts byte-copy from the vendored data root (server-only I/O, no
   inline `content`); `template` artifacts fill a frozen `TemplateDefinition` through
   `@orkestrel/template`'s pure `fillTemplate` with `missing: 'error'` (an unresolved token
   fails LOUD, never silently blanks); `computed` artifacts derive from the core's own
   §4.2/§4.3 combination logic. Only genuinely templated PROSE artifacts fill; every
   STRUCTURAL (JSON / TS) file is `computed`, so a literal `{{…}}` in a config is never
   mistaken for a placeholder. There is NO `TemplateManager` inside the compiler — the core
   uses only the template package's fill LEAF and stays pure and stateless.
4. **Fail closed at the gate.** A non-empty set of BLOCKING questions (a bad name, empty or
   off-vocabulary `surfaces`, a malformed dependency, an override that matches no planned
   artifact or targets a `host`-origin path) yields `complete: false`, an ABSENT `plan`, the
   `questions` on `Scaffolding.questions`, and a `CompileFailure` coded `BLOCKED` — never a
   throw, never a half-formed plan. A NON-blocking question (e.g. a non-vendored dependency's
   mirror pointer) rides a COMPLETE result as an advisory. Emitting a partly-valid package
   skeleton is worse than returning the question that blocks it.
5. **One plan, many projections; projections never add.** `planToReview`, `planToSummary`,
   `diffPlan`, `auditToReview`, and (on the server) `materialize` are pure views over the
   pinned plan — the review renders exactly the plan's artifacts, the summary counts exactly
   them, the audit compares exactly them, and materialization writes exactly them. Nothing
   downstream is authored separately, so the files on disk, the review, the audit, and the
   summary cannot disagree with the plan or one another.
6. **The variant matrix is data (§21).** A blueprint's `surfaces` — any §1.2 combination:
   core-only, core+server, core+browser+server, server-only, browser-only, core+browser —
   drives the `package.json` `exports` shape, the per-surface `configs/src` files, the Vitest
   projects, and the conditional consequences (`@vitest/browser-playwright` as a devDependency
   IFF a browser surface; `tests/setupBrowser.ts` / `tests/setupServer.ts` IFF those
   surfaces). `SURFACE_MATRIX` is the per-surface layer; ABOVE it `blueprintToPlan` applies
   the SCAFFOLD.md §4.2/§4.3 COMBINATION rules — a multi-surface package OMITS the top-level
   `types` field, a single-variant (server-only / browser-only) retargets its lone surface to
   the `.` root with `main` / `module` re-pointed (browser-only using flat ESM conditions).
   Adding a surface changes the PLAN, not the compiler; the core-only single path
   `scaffold.sh` hard-coded is now one row of a table.
7. **Mechanism, never policy + scoped mirrors (§21).** The module decides NOTHING about a
   package's identity: the caller owns `name` / `description` / `keywords` / `dependencies`
   and any template `overrides`; the compiler owns the rendering, the closed vocabularies,
   the gate, the pin, and the projections. An absent override means the canonical shipped
   default; a present override REPLACES the rendered artifact at its `path`, never partially
   merges. Dependency guide mirrors scope by the vendored-guides law (Law #2 — one vendored
   copy per runtime dependency): THIS repo vendors all six runtime deps' guides (contract /
   emitter / markdown / template / terminal / console) plus `guide.md` alongside its own —
   seven mirror files. A scaffolded package's `Dependency` therefore gets a BYTE-CORRECT
   OFFLINE mirror only when scaffold vendors that dep's guide (the seven above); any OTHER
   `@orkestrel` dependency yields NO fabricated mirror — the plan emits a `host`-origin
   POINTER artifact, surfaced as a NON-blocking Question. Those shipped mirrors are the
   OFFLINE BASELINE — correct for offline creation; the server `Sync` entity is the FRESHNESS
   path for ANY declared `@orkestrel` dependency (vendored or not), fetching the current guide
   and range from upstream and superseding the baseline when the network is available.
8. **Diff-first, write-last.** `compile`, `audit`, `blueprintToPlan`, `diffPlan`,
   `planToReview`, `planToSummary`, and `Sync.pull` are report-only; the ONLY writing acts in
   the package are the server surface's `materialize` / `repair` / `Sync.write`, each gated
   behind an explicit call (and the bin's `--apply`). The dry-run review is the default
   posture everywhere — you always see the plan (or the drift, or the freshness) before a
   byte is written.
9. **Guard totality and single-source parity (§14).** Every validator is a total `Guard` —
   adversarial input returns `false`, never throws. `isBlueprint` / `isPlan` / `isSyncReport`
   / the section guards are COMPILED from `blueprintShape()` / `planShape()` /
   `syncReportShape()` through the contract package's `createContract`, so the guard, the
   parser, the JSON Schema, and the seeded generator are lockstep by construction — an
   off-vocabulary literal, a missing section, or an extra key fails all four identically.
   `NAME_PATTERN` is deliberately NOT a shape refinement (contract's `compileGenerator` throws
   on a pattern-constrained string it cannot sample), so `generate` stays satisfiable; the
   name law lives in the SEMANTIC pass (`validateBlueprint`, the gate, and `createBlueprint`),
   not the compiled contract.
10. **Coded errors (§12).** Every throw out of this module is a `ScaffoldError` with a
    machine-readable code (`INVALID` / `DESTROYED` from the core, `TARGET` / `WRITE` / `FETCH`
    from the server) and a `context` carrying the offending path, field, or URL; `BLOCKED` is
    a contained failure marker on a `Scaffolding`, never thrown, and in `Sync`'s default
    collect mode a fetch fault is a captured `freshness`, not a throw. `catch` blocks narrow
    with `isScaffoldError`, never `as`.
11. **Observation is a pure side-channel (§13).** The `Compiler` owns a typed emitter
    (`CompilerEventMap` — `compile` / `audit` / `block` / `error` / `destroy`); the
    `PlanManager`, the server `Materializer`, and the server `Sync` own their own. Every event
    is emitted directly and synchronously, AFTER the outcome it reports; only complete
    `compile()` calls emit `compile`, and a gated one emits `block` instead. `audit()` emits
    `audit` after its outcome and NEVER `compile`; a gated `audit()` emits `block` then
    `audit`. A stage throw inside `compile` / `audit` is CONTAINED as a `CompileFailure` on the
    result AND emitted on the domain `error` event for observability. Listener isolation is the
    emitter's own — a throwing listener routes to the `error` OPTION handler, never onto the
    domain `error` event. `destroy()` is idempotent and tears the emitter down LAST.
12. **Network is server/bin-only.** ONLY the server `Sync` entity touches the network — the
    core, the `Compiler`, the `Materializer`, every projection, and every guard are
    network-free. `Sync` fetches over HTTPS with a per-request 10-second timeout
    (`AbortSignal.timeout`), no retries by default (opt in via `retries`), bounded concurrency
    (default 6, never an unbounded `Promise.all`), and TLS / proxy configured through the
    ENVIRONMENT (never a verification bypass); it reads guides from `raw.githubusercontent.com`
    and versions from `registry.npmjs.org` (both `base`s injectable). A failed fetch is EITHER
    a thrown `ScaffoldError('FETCH', …)` naming the URL (under `strict`) OR a captured
    `freshness: 'failed'` (the default collect mode) — never an unhandled rejection.
13. **DOC ↔ SOURCE method bijection.** Every behavioral interface's `## Methods` table lists
    exactly its public methods (call-signature members) — exhaustive, both directions — and
    each implementing class exposes the same public methods, no more (AGENTS §22). The bin
    implements no interface and is excluded, as in invariant 1.

This package **fully replaces** `scripts/scaffold.sh`. The bash
script froze every template as a heredoc and derived only a core-only package from a name;
this module renders the whole §1.2 variant matrix from versioned `TemplateDefinition` data,
so a convention change is a version bump here rather than a hand-edit in every repo's copy.

Deliberately absent: any **git** operation (no `git init` / `git clone` — the caller prepares
the vacant target, and the package stops at the file boundary), any **npm** INVOCATION (no
`npm install`, no lockfile generation — the caller runs the gates; the `Sync` entity's read
of registry version METADATA is an HTTPS GET, not an npm invocation), any **LLM** (the
authoring judgment is the caller's, per invariant 7), a foreign template ecosystem (the
module renders only the `@orkestrel` line's own conventions, versioned in this package),
asynchronous compilation, and plan persistence (`JSON.stringify(plan)` out, `parsePlan` back
in). Three sibling engines were considered and REJECTED, each for a concrete reason:
**`@orkestrel/reason`** — the gate is regex / set-membership / path-matching checks a reason
`Check`'s comparisons cannot express, and facet deduction already IS `SURFACE_MATRIX` plus the
§4.2/§4.3 combination rules, so there is no inference gap for a reasoner to fill;
**`@orkestrel/interpret`** — there is no natural-language input to interpret and no
`ReasonResult` to render; and **`@orkestrel/relation`** — a plan's artifacts are one ORDERED
list, fully served by the guards, `diffPlan`, and the summary, so no graph layer is needed
(revisit only if cross-artifact dependency edges ever earn their keep).

## Patterns

### Compiling a package with full variant control

The forward path end to end: blueprint → draft → gate → pin → materialize. The
`SURFACE_MATRIX` selects the `exports` shape, the per-surface configs, and the test projects
from the declared `surfaces`, so one call scaffolds any variant.

```ts
import { blueprint, createCompiler, dependency } from '@orkestrel/scaffold'
import { createMaterializer } from '@orkestrel/scaffold/server'

const compiler = createCompiler()
const scaffolding = compiler.compile(
	blueprint('database', {
		description: 'A minimal-interface data layer. Part of the @orkestrel line.',
		keywords: ['database', 'storage', 'query'],
		surfaces: ['core', 'browser', 'server'], // the full three-surface variant
		dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
	}),
)

scaffolding.complete // true
scaffolding.plan?.groups // ['manifest', 'configs', 'source', 'tests', 'guides', 'docs', 'orchestration']

if (scaffolding.plan) {
	const materializer = createMaterializer()
	materializer.materialize(scaffolding.plan, './packages/database') // green-field, vacant target
	materializer.destroy()
}
compiler.destroy()
```

### Selecting artifact groups — partial generation

`compile`'s optional `Group[]` scopes the plan to a subset — regenerate just the configs and
guides after a convention bump, leaving hand-written source untouched.

```ts
import { blueprint, createCompiler } from '@orkestrel/scaffold'

const compiler = createCompiler()
const spec = blueprint('sqlite', { surfaces: ['server'] })

const scaffolding = compiler.compile(spec, ['configs', 'guides']) // only these two groups
scaffolding.plan?.artifacts.every(
	(artifact) => artifact.group === 'configs' || artifact.group === 'guides',
) // true
compiler.destroy()
```

### Failing closed — the blocking path

An off-`NAME_PATTERN` name (or an override that matches nothing, or one targeting a host path)
is a BLOCKING question: the gate stops, no plan is pinned, and the `Scaffolding` carries the
question — the caller fixes it and re-compiles. No half-formed package ever leaves the
pipeline.

```ts
import { blueprint, createCompiler } from '@orkestrel/scaffold'

const compiler = createCompiler()
const scaffolding = compiler.compile(blueprint('My-Router', { surfaces: ['core'] }))

scaffolding.complete // false — the gate failed closed
scaffolding.plan // undefined — nothing to project, deliberately
scaffolding.questions // [{ field: 'name', text: 'Name must match ^[a-z][a-z0-9-]*$', blocking: true }]
scaffolding.failures // [{ stage: 'gate', code: 'BLOCKED', message: '1 blocking question' }]
compiler.emitter.on('block', (questions) => questions.length) // fires instead of `compile`
compiler.destroy()
```

### Auditing an existing package — the conformance engine

The audit is pure core: the server reads the target's current content (`readTarget`), the
core diffs it against the plan (`diffPlan`), and the drift comes back as data — the
SCAFFOLD.md §13.3 consistency checklist, mechanized. No byte is written.

```ts
import { auditToReview, blueprint, blueprintToPlan, diffPlan } from '@orkestrel/scaffold'
import { readTarget } from '@orkestrel/scaffold/server'

const plan = blueprintToPlan(blueprint('abort', { surfaces: ['core'] }))
const current = readTarget(
	'./packages/abort',
	plan.artifacts.map((artifact) => artifact.path),
)

const audit = diffPlan(plan, current)
audit.clean // false — the repo drifted from the line's conventions
audit.findings.filter((finding) => finding.drift === 'stale') // e.g. [{ path: '.oxfmtrc.json', … }]
auditToReview(audit) // '# Drift — abort\n## Stale\n| Path | Group |\n…'
```

`diffPlan` compares by content equality: a `template` / `computed` artifact whose rendered
content the target does not match is `stale`; one the target lacks is `missing`; a target
file the plan does not own is `foreign`. A `host`-origin artifact carries no `content` (the
pure core never read the canonical host bytes), so it is audited by PRESENCE only — `missing`
or `aligned`, never `stale`; deep host-file drift is caught by the server's own mirror pass,
not by the pure diff.

### Repairing drift — write only what changed

Repair chains the audit into the server surface: `materialize` refuses a non-vacant target,
so repairing an EXISTING package goes through `repair`, which writes only the `missing` /
`stale` artifacts the audit named.

```ts
import { blueprint, blueprintToPlan, diffPlan } from '@orkestrel/scaffold'
import { createMaterializer, readTarget } from '@orkestrel/scaffold/server'

const plan = blueprintToPlan(blueprint('abort', { surfaces: ['core'] }))
const audit = diffPlan(
	plan,
	readTarget(
		'./packages/abort',
		plan.artifacts.map((a) => a.path),
	),
)

const materializer = createMaterializer()
const result = materializer.repair(plan, audit, './packages/abort') // only the drifted files
result.written // ['.oxfmtrc.json', 'configs/src/tsconfig.core.json'] — nothing aligned is touched
materializer.destroy()
```

### Layering template overrides

Mechanism-never-policy in practice: the package renders the canonical defaults; a caller who
needs a bespoke file supplies an `override` whose `content` replaces the rendered artifact at
that path. An absent override means the default — the caller opts into exactly the files they
want to own. An override that matches NO planned artifact, or that targets a `host`-origin
path (host bytes are governed by the mirror, not per-package overrides), is a BLOCKING
question — a typo'd path fails the gate closed rather than silently adding a stray file.

```ts
import { blueprint, blueprintToPlan, override } from '@orkestrel/scaffold'

const readme = '# @orkestrel/router\n\nA hash-router with a hand-written readme.\n'
const plan = blueprintToPlan(
	blueprint('router', { surfaces: ['core'], overrides: [override('README.md', readme)] }),
)
plan.artifacts.find((artifact) => artifact.path === 'README.md')?.content === readme // true
```

### Serving blueprints at a tool boundary

The shape DSL payoff: the SAME declaration that compiled the guard serves the tool schema and
the test data — an MCP tool that accepts blueprints cannot drift from the validator that
checks them, and the plan it returns is JSON all the way down.

```ts
import { blueprintShape, blueprintToPlan, parseBlueprint } from '@orkestrel/scaffold'
import { createContract, schemaToParameters, seededRandom } from '@orkestrel/contract'

const contract = createContract(blueprintShape())

const tool = {
	name: 'scaffold_package',
	description: 'Compile an @orkestrel package blueprint into a plan.',
	parameters: schemaToParameters(contract.schema), // the JSON Schema, no `as` anywhere
}

// In the handler: the string boundary is parseBlueprint; the payload is then trusted typed data.
function handle(argument: string): string {
	const incoming = parseBlueprint(argument)
	return incoming ? blueprintToPlan(incoming).hash : 'Rejected: not a valid blueprint.'
}

contract.generate(seededRandom(7)) // a reproducible on-contract blueprint — the test fixture, for free
```

### Targeted sync in an existing repo

`Sync.pull` reads the target's `package.json`, resolves its declared `@orkestrel`
dependencies, and fetches each one's upstream guide and registry version — reporting freshness
as data, writing nothing. `syncToReview` renders it; only an explicit `write` (the bin's
`--apply`) commits the refreshed mirrors. To scope to a dependency SUBSET, resolve with
`manifestToDependencies` and call `guides(deps)` / `versions(deps)` directly.

```ts
import { syncToReview } from '@orkestrel/scaffold'
import { createSync } from '@orkestrel/scaffold/server'

const sync = createSync({ concurrency: 6 })
const report = await sync.pull('.') // all declared @orkestrel deps
syncToReview(report) // '# Sync — 2 behind\n## Guides\n| Name | Freshness |\n…'
report.guides.filter((guide) => guide.freshness !== 'current') // the stale / missing mirrors

if (report.failed === 0) await sync.write(report, '.') // refresh the vendored mirrors under guides/src
sync.destroy()
```

### Auditing with live drift

`scaffold audit` layers TWO drift sources: the structural `diffPlan` (the plan vs the target
on disk) and — under `--live` — the `Sync` freshness pass (each dependency's guide vs upstream
HEAD, each range vs the registry latest). Any drift is a nonzero exit, so it doubles as a CI
conformance gate. `audit` NEVER writes.

```ts
import { blueprintToPlan, diffPlan } from '@orkestrel/scaffold'
import { createSync, readTarget } from '@orkestrel/scaffold/server'

const plan = blueprintToPlan(spec) // `spec` — the blueprint reconstructed for this repo
const structural = diffPlan(
	plan,
	readTarget(
		'.',
		plan.artifacts.map((artifact) => artifact.path),
	),
)

// --live: `pull` reads the target's own guides/src mirrors into the reference map ITSELF, so
// its GuideSync freshness is genuinely target-relative (a target-free `guides(deps)` with no
// reference would instead read every fetched guide as 'behind').
const sync = createSync()
const report = await sync.pull('.')
sync.destroy()

const drifted =
	!structural.clean ||
	report.guides.some((guide) => guide.freshness !== 'current') ||
	report.versions.some((version) => version.freshness !== 'current')
process.exitCode = drifted ? 1 : 0 // ANY drift fails the CI gate
```

### Offline and failure posture

`Sync` is built for an enterprise network. Each request carries a 10-second
`AbortSignal.timeout`, there are no retries by default (opt in with `retries`), concurrency is
bounded (default 6, never an unbounded `Promise.all`), and TLS / proxy come from the
environment (never a verification bypass). The DEFAULT posture is COLLECT-and-report: a
per-dependency failure becomes a captured `freshness` (`404` → `missing`, transport →
`failed`) on the `SyncReport`, so one unreachable dep never sinks the whole run. `strict` flips
a failure into a thrown `ScaffoldError('FETCH', …)` that names the URL — for a CI gate that
must go red on any network fault.

```ts
import { isScaffoldError } from '@orkestrel/scaffold'
import { createSync } from '@orkestrel/scaffold/server'

// Collect mode (default): partial failure is DATA, not a throw.
const collect = createSync({ registry: { base: 'https://registry.example.internal' } })
const report = await collect.pull('.')
report.failed // 1 — one dep's registry was unreachable; the rest resolved
report.versions.find((version) => version.freshness === 'failed') // the captured failure
collect.destroy()

// Strict mode: any fetch fault throws, naming the URL — the CI-gate posture.
const strict = createSync({ strict: true, retries: 2 })
try {
	await strict.pull('.')
} catch (error) {
	if (isScaffoldError(error)) error.code // 'FETCH'
}
strict.destroy()
```

### The `scaffold` bin — three subcommands, one build target

The CLI is its OWN build target — `src/bin/scaffold.ts`, an executable, not a barrel. It
opens with a `#!/usr/bin/env node` shebang, parses argv with `node:util`'s `parseArgs` (no
foreign arg parser), and dispatches on THREE subcommands: **`new`** creates a package
(resolving any `--deps` to the registry `latest` → `^latest` ranges, fetching their guides
into the plan), **`sync`** refreshes an existing repo's vendored dependency mirrors and
reports range drift, and **`audit`** runs the structural conformance check (plus, under
`--live`, guide-vs-HEAD and range-vs-latest freshness). It narrates through
`@orkestrel/console` and prompts interactively through `@orkestrel/terminal`'s `createTerminal`
when a required argument is absent (a real TTY; a piped run falls back to the flags and the
terminal's non-TTY readline path). Report-only is the default posture of all three; only
`--apply` writes, `audit` NEVER writes, and the exit codes gate CI — `new` nonzero on a block
or write failure, `sync` nonzero only under `--strict` with failures, `audit` nonzero on ANY
drift.

```ts
// The `#!/usr/bin/env node` shebang is re-emitted by the build's `output.banner`, not source.
import { parseArgs } from 'node:util'
import {
	blueprint,
	blueprintToPlan,
	createCompiler,
	dependency,
	diffPlan,
	manifestToDependencies,
	planToReview,
	planToSummary,
	SURFACES,
	syncToReview,
} from '@src/core'
import { createMaterializer, createSync, readManifest, readTarget } from '@src/server'
import { createReporter, createSpinner } from '@orkestrel/console'
import { createServerSink } from '@orkestrel/console/server'
import { createTerminal } from '@orkestrel/terminal/server'

const { values, positionals } = parseArgs({
	allowPositionals: true,
	options: {
		surfaces: { type: 'string' },
		deps: { type: 'string' },
		target: { type: 'string' },
		apply: { type: 'boolean', default: false },
		strict: { type: 'boolean', default: false },
		live: { type: 'boolean', default: false },
	},
})

const sink = createServerSink()
const reporter = createReporter({ sink, width: sink.columns })
const [command, argument] = positionals // 'new' | 'sync' | 'audit'
const target = values.target ?? '.'

if (command === 'sync') {
	const sync = createSync({ strict: values.strict })
	const report = await sync.pull(target)
	reporter.line(syncToReview(report))
	if (values.apply) await sync.write(report, target)
	sync.destroy()
	process.exit(values.strict && report.failed > 0 ? 1 : 0) // nonzero only under --strict with failures
} else if (command === 'audit') {
	const deps = manifestToDependencies(readManifest(target))
	const plan = blueprintToPlan(
		/* the blueprint reconstructed for this repo */ blueprint(argument ?? 'pkg'),
	)
	let drifted = !diffPlan(
		plan,
		readTarget(
			target,
			plan.artifacts.map((a) => a.path),
		),
	).clean
	if (values.live) {
		const sync = createSync()
		const guides = await sync.guides(deps)
		const versions = await sync.versions(deps)
		sync.destroy()
		drifted ||= [...guides, ...versions].some((entry) => entry.freshness !== 'current')
	}
	process.exit(drifted ? 1 : 0) // ANY drift fails — the CI gate
} else {
	// `scaffold new <name>` — creation.
	const terminal = createTerminal()
	const name =
		argument ??
		(await terminal.input({ message: 'Package name', validate: { pattern: '^[a-z][a-z0-9-]*$' } }))
	const picked =
		values.surfaces?.split(',') ??
		(await terminal.checkbox({ message: 'Surfaces', choices: [...SURFACES], min: 1 }))
	const surfaces = SURFACES.filter((surface) => picked.includes(surface)) // narrow to Surface[], no `as`

	// --deps resolve latest from the registry → ranges pin ^latest; their guides fetch into the plan.
	const sync = createSync()
	const versions = await sync.versions(
		(values.deps?.split(',') ?? []).map((name) => dependency(name, '*')),
	)
	sync.destroy()
	const deps = versions.map((version) => dependency(version.name, `^${version.latest}`))

	const compiler = createCompiler()
	const scaffolding = compiler.compile(blueprint(name, { surfaces, dependencies: deps }))
	if (!scaffolding.plan) {
		reporter.status('error', scaffolding.questions.map((question) => question.text).join('; '))
		compiler.destroy()
		process.exit(1)
	}
	reporter.section('Plan')
	reporter.line(planToReview(scaffolding.plan)) // dry-run default: show the review
	const summary = planToSummary(scaffolding.plan)
	reporter.table({
		columns: [{ label: 'Origin' }, { label: 'Count', align: 'right' }],
		rows: [
			['host', String(summary.host)],
			['template', String(summary.template)],
			['computed', String(summary.computed)],
		],
	})
	if (values.apply) {
		const spinner = createSpinner({ message: 'materializing', sink })
		spinner.start()
		const materializer = createMaterializer()
		const result = materializer.materialize(scaffolding.plan, values.target ?? `./${name}`)
		materializer.destroy()
		spinner.success(`wrote ${result.written.length + result.copied.length} files`)
	}
	compiler.destroy()
}
```

The build wiring follows the §7 two-file wrapper pattern: `configs/src/tsconfig.bin.json`
sets `types: ["node"]` and uses the `rootDir` trick (the broad `../../src` root with a scoped
`include: ["../../src/bin/**/*.ts"]`) so the bin can type-check against `@src/core` source;
`configs/src/vite.bin.config.ts` is a lib build with `entry` → `dist/bin/scaffold.js`,
`formats: ['es']`, externals `node:*` / `@orkestrel/*` / `@src/*`, an `output.banner`
re-emitting the `#!/usr/bin/env node` shebang, and NO dts plugin (an executable ships no
declarations). `package.json` declares `"bin": { "scaffold": "./dist/bin/scaffold.js" }`, and
`build:src` chains the bin build LAST (after core and server) so the executable links against
fresh sibling builds. Invocation follows the tool's life: `npm run scaffold` pre-publish (the
repo's own script), `npx @orkestrel/scaffold` post-publish, and `node_modules/.bin/scaffold`
once it is a devDependency of a consumer.

```sh
# new — create a package (dry-run prints the plan; --apply writes):
npx @orkestrel/scaffold new router --surfaces core,browser,server
npx @orkestrel/scaffold new router --deps @orkestrel/contract --apply --target ./packages/router

# sync — refresh vendored dep mirrors + report range drift (nonzero only under --strict):
npx @orkestrel/scaffold sync --target . --apply
npx @orkestrel/scaffold sync --deps @orkestrel/contract,@orkestrel/emitter --strict

# audit — structural conformance, +live freshness; nonzero on ANY drift (the CI gate):
npx @orkestrel/scaffold audit --live
```

### Retiring `scaffold.sh` — the replacement path

The rendered defaults ship as **versioned package data**: each is a frozen
`TemplateDefinition` (a `name`, a `content` string with `{{token}}` placeholders, and its
`placeholders`) filled by `@orkestrel/template`'s pure `fillTemplate` with `missing: 'error'`
— NOT bespoke string interpolation, and NOT a `TemplateManager` (the compiler carries no
sub-engine). The byte-copied governance files (`HOST_PATHS`) ship as vendored data under the
package root, which the server's `Materializer` copies from its `host` root. So the staleness
that rotted the frozen bash heredocs cannot happen: there is ONE versioned source of truth,
and `npm update @orkestrel/scaffold` propagates a convention change to every consumer.

At retirement `@orkestrel/scaffold` becomes a universal devDependency of every package
(joining `@orkestrel/guide` as line-wide dev tooling), every repo swaps its
`"scaffold": "bash scripts/scaffold.sh"` script for `"scaffold": "scaffold"` against the
server bin, and `scripts/scaffold.sh` leaves BOTH the mirrored orchestration set and
`HOST_PATHS` (`mirror.sh` remains). The line-wide SCAFFOLD.md §2 / §4 tables gain the scaffold
devDependency at that RETIREMENT time — not now, while the bash script still bootstraps the
fleet.

### Practices

- **Dry-run first, always** — `compile` / `blueprintToPlan` / `planToReview` and `Sync.pull` /
  `syncToReview` are report-only; read the plan (or the audit, or the freshness) before ever
  writing. Writing is opt-in (the server's `materialize` / `repair` / `Sync.write`, the bin's
  `--apply`).
- **One blueprint, one package** — a compound request (two packages) is two `compile` calls,
  not one blueprint with a wider `surfaces` list; `surfaces` selects the variant of ONE
  package, never bundles several.
- **Audit before you edit a fleet repo** — `diffPlan` turns the SCAFFOLD.md §13.3 checklist
  into findings; add `--live` for guide + range freshness; repair the `missing` / `stale` set
  with `repair`, refresh mirrors with `Sync.write`, and leave `aligned` / `current` untouched.
- **Override, don't fork** — need a bespoke file? Add one `override` for that path; the rest
  stay canonical and keep tracking the shipped templates. Never copy the whole plan to change
  one file.
- **Reference deps by their real range** — a `dependency('@orkestrel/contract', '^0.0.5')`
  drives the `package.json` entry, the vendored guide mirror (when scaffold ships it), and the
  build externals from one declaration; declare exactly what `src/` imports (SCAFFOLD.md §4.5).
- **Collect by default, `strict` for CI** — leave `Sync` in collect mode for an interactive
  freshness report; flip `strict: true` only where a network fault MUST fail the run (a CI
  gate), and inject `guides.base` / `registry.base` at a local fixture for hermetic tests.
- **Gate untrusted blueprints twice** — `parseBlueprint` for shape at the boundary,
  `validateBlueprint` for semantics; reserve `createBlueprint`'s throw for programmer-error
  contexts where invalidity is a bug (§12).
- **Store `pinPlan` output, not drafts** — the `hash` is the identity;
  `JSON.stringify(plan)` out, `parsePlan` back in, and the `PlanManager` recognizes the
  unchanged content as the same version.
- **Keep the target vacant for creation** — `materialize` refuses a non-empty target
  (throwing `TARGET`); repair into an existing package with `repair`, never by clearing it
  first.
- **Destroy when done** — `destroy()` releases the emitter; a destroyed `Compiler` /
  `PlanManager` / `Materializer` / `Sync` throws `DESTROYED` on use (narrow with
  `isScaffoldError`).

## Tests

- [`tests/guides/src/parity.test.ts`](../../tests/guides/src/parity.test.ts) — the
  `## Surface` ↔ `src/core` + `src/server` bijection (value + type exports; `src/bin` is
  EXCLUDED — the executable has no public exports) and the `## Methods` ↔ interface-method
  bijection, across both library surfaces.
- [`tests/src/core/Compiler.test.ts`](../../tests/src/core/Compiler.test.ts) — the three-stage
  pipeline, stage order and records, group-scoped compilation, the `audit` projection,
  override layering, fail-closed blocking (questions + `BLOCKED` failure + absent plan), event
  sequences (`compile` vs `block`, `audit`), idempotent `destroy`, `DESTROYED` throws.
- [`tests/src/core/PlanManager.test.ts`](../../tests/src/core/PlanManager.test.ts) —
  content-hash IS the id, distinct content mints a fresh record at `version: 1`, an
  unchanged re-add returns the existing record with `version` never incrementing, batch
  `remove` all-or-nothing, per-event emissions, destroy semantics.
- [`tests/src/core/helpers.test.ts`](../../tests/src/core/helpers.test.ts) — every projection
  (`blueprintToMembers` inventory, `blueprintToPlan` variant coverage + `SURFACE_MATRIX`
  wiring + the §4.2/§4.3 combination rules, template-fill vs computed origins + the
  token-collision boundary, `planToReview` / `auditToReview` / `syncToReview` table emission,
  `planToSummary` counts, `diffPlan` drift verdicts incl. host presence-only,
  `manifestToDependencies` across all three sections deduplicated, `rangeToFreshness` exact-pin
  law, `pinPlan` determinism), `validateBlueprint` errors + warnings, `pascalCase`, and
  `alignTable` (oxfmt-width padding, `\|` escaping, alignment delimiter row).
- [`tests/src/core/builders.test.ts`](../../tests/src/core/builders.test.ts) — every builder's
  output shape (defaults filled, absent optional keys omitted, exact-guard round-trips).
- [`tests/src/core/validators.test.ts`](../../tests/src/core/validators.test.ts) — each guard
  accepts valid / rejects invalid + adversarial junk, exact-record semantics, off-vocabulary
  literal rejection, `parseBlueprint` / `parsePlan` / `parseSyncReport` ↔ guard soundness.
- [`tests/src/core/shapers.test.ts`](../../tests/src/core/shapers.test.ts) — `blueprintShape` /
  `planShape` / `syncReportShape` compilation through `createContract`: guard/parser/schema/generator
  lockstep, generated values satisfy their guards.
- [`tests/src/server/Materializer.test.ts`](../../tests/src/server/Materializer.test.ts) —
  green-field `materialize` into a vacant temp dir (host copies + rendered writes), `TARGET`
  refusal on a non-vacant target, `repair` writing only drifted artifacts, `isVacant` /
  `readTarget` against a real `node:fs` fixture, `WRITE` fail-fast, event sequences, destroy
  semantics.
- [`tests/src/server/Sync.test.ts`](../../tests/src/server/Sync.test.ts) — a real `node:http`
  fixture serving guide bytes at `/<name>/<branch>/guides/src/<name>.md` and registry JSON
  `{"dist-tags":{"latest":"0.0.N"}}` at the URL-encoded scoped path, with `guides.base` /
  `registry.base` injected (§16 no-mocks): asserts fetching + writing under the containment
  law, the `freshness` verdicts (incl. `404` → `missing` and timeout → `failed`), the `strict`
  `FETCH` throw naming the URL, the bounded `concurrency`, the `guide` / `version` / `write` /
  `done` event order, and `DESTROYED`.
- [`tests/src/server/integration.test.ts`](../../tests/src/server/integration.test.ts) —
  the full flow against the fixture: `new` → `sync` → `audit --live` (compile → materialize →
  audit clean → mutate a file → audit drift → repair clean; then a stale mirror synced current);
  a scaffolded package whose deps are all vendored (contract / emitter / markdown / template /
  terminal / console) runs its own gates green by construction, while a dep outside that set
  leaves its mirror a pointer plus a non-blocking Question.
- [`tests/src/bin/scaffold.test.ts`](../../tests/src/bin/scaffold.test.ts) — the bin's three
  subcommands: `new` (`parseArgs` flag decoding, a non-interactive piped compile + dry-run
  review + summary table, the interactive fallback driven by a scripted fake terminal, and
  `--apply` writing into a temp directory), `sync` (report + `--apply` write, `--strict` exit
  code), and `audit` (`--live` drift → nonzero exit) against the `node:http` fixture.

## See also

- `SCAFFOLD.md` — the manual packaging recipe this module automates: the
  variant matrix (§1.2), the per-file inventory (§3), the exports shapes (§4.3), the config
  wrappers (§7), the audit checklist (§13.3), and the `scaffold.sh` fast-path this package
  retires.
- [`contract.md`](contract.md) — the guards, shapers, and `createContract` machinery the
  validators compile from, and `schemaToParameters` / `seededRandom` for the tool boundary.
- [`emitter.md`](emitter.md) — the typed emitter behind the compiler's, manager's,
  materializer's, and sync's observation surfaces.
- [`markdown.md`](markdown.md) — the AST + `renderMarkdown` writer `alignTable` builds the
  guide Surface tables on (`parseInline`, `TableNode`, `TableAlign`).
- [`template.md`](template.md) — the `TemplateDefinition` + pure `fillTemplate` engine (`missing:
'error'`) that carries the rendered defaults.
- [`terminal.md`](terminal.md) — the `createTerminal` `PromptFormInterface` the bin drives for
  interactive blueprint building (with a non-TTY readline fallback).
- [`console.md`](console.md) — the `createReporter` / `createSpinner` + server `createServerSink`
  the bin narrates the plan, sync, and materialization through.
- [`AGENTS.md`](../../AGENTS.md) — the rules; §4 naming, §9 managers, §11 determinism, §12
  errors, §13 emitters, §14 totality, §21 mechanism-never-policy, §22 documentation-as-contracts.
- [`README.md`](../README.md) — the package index.
