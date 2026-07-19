# Scaffold

> A synchronous, deterministic **package-blueprint compiler** for the `@orkestrel` line:
> a closed, JSON-serializable **`Blueprint`** (name, surfaces, dependencies, overrides…)
> is compiled into a **`Plan`** — an ordered list of **`Artifact`**s, each carrying an
> `origin` that says whether its content was host-copied, template-rendered, or computed —
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
> surface's `Materializer` is the only impure step — it writes.
> Nothing here runs `git`, `npm`, a network call, or an LLM: the core is pure (no `node:*`,
> no clocks, no randomness — `trace` and `hash` derive from content alone), and writing
> lives behind an explicit apply on the server surface. A blueprint that fails the gate
> yields a visible INCOMPLETE `Scaffolding` carrying the questions — a half-formed package
> is worse than a question, so the gate fails closed rather than emitting.
> Every discriminant names its axis, never `kind` / `type` (AGENTS §4.4): `origin` splits
> how an artifact's content is produced, `group` splits the artifact groups, `surface`
> splits the environment faces, `category` splits declared members, `drift` splits audit
> verdicts, `stage` splits the pipeline phases, `code` splits coded errors. Source:
> [`src/core`](../../src/core) + [`src/server`](../../src/server). Surfaced through the `@src/core` /
> `@src/server` barrels.

The problem this module solves: standing up (or auditing) an `@orkestrel` package is a
mechanical projection of the line's conventions onto a name — the exports map for the
variant, the per-surface build configs, the barrels, the guide stubs, the parity harness —
yet the only tool the line had was [`scripts/scaffold.sh`](../../scripts/scaffold.sh): a
core-only bash script whose every template is a **frozen heredoc**, so when a convention
moves, each repo's copy silently rots and the char-width table padding is hand-rolled with
`printf` byte math a UTF-8 cell defeats. This package **fully replaces** that script.
Templates ship as **versioned package data** — bump `@orkestrel/scaffold`, republish, and
every consumer inherits the new conventions instead of hand-editing a stale heredoc. The
module is deliberately **mechanism, never policy** (AGENTS §21): the judgment calls (the
name, the description, the keywords, which surfaces, which dependencies, any template
override) belong to the caller — a human, or an agent following a `/scaffold` command —
while this module supplies the closed vocabularies, the variant matrix as data, the
exact-record validation, the fail-closed gate, the deterministic pin, and the lossless
projections. Separating the WHAT (the `Blueprint`) from the HOW (the `Plan` and its writes)
is the whole design: because the plan and the audit are pure data, the same engine that
_creates_ a package can **audit** an existing one (`diffPlan` against its current content —
the SCAFFOLD.md §13.3 consistency checklist, now returned as findings) and **repair** only
what drifted. Scaffold is the line's conformance engine, not merely its generator.

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
audit are ALL pure — no clocks, no randomness, no `node:*`, no I/O. Materialization is the
one impure act, and it lives on the server surface (`@orkestrel/scaffold/server`), behind
an explicit call; the core never writes. The Surface below documents BOTH faces — the pure
core (`@orkestrel/scaffold`) and the materialization face marked **(server)** — since one
guide documents the union of a package's surfaces (SCAFFOLD.md §13.2).

### Types

| Type                    | Kind      | Shape                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Surface`               | type      | `'core' \| 'browser' \| 'server'` — the environment surface an artifact or member belongs to.                                                                                                                                                                                                                               |
| `Origin`                | type      | `'host' \| 'template' \| 'computed'` — how an `Artifact`'s content is produced; the axis that decides whether it carries `source` (host copy) or `content` (rendered / derived).                                                                                                                                            |
| `Group`                 | type      | `'manifest' \| 'configs' \| 'source' \| 'tests' \| 'guides' \| 'docs' \| 'orchestration'` — the closed artifact-group vocabulary a plan selects over.                                                                                                                                                                       |
| `Category`              | type      | `'type' \| 'constant' \| 'factory' \| 'entity'` — what a declared `Member` IS in the scaffolded surface.                                                                                                                                                                                                                    |
| `Drift`                 | type      | `'aligned' \| 'stale' \| 'missing' \| 'foreign'` — one `Finding`'s verdict against the target's current content.                                                                                                                                                                                                            |
| `CompileStage`          | type      | `'draft' \| 'gate' \| 'pin'` — the three fixed pipeline phases, in order.                                                                                                                                                                                                                                                   |
| `ScaffoldErrorCode`     | type      | `'INVALID' \| 'BLOCKED' \| 'DESTROYED' \| 'TARGET' \| 'WRITE'` — coded `ScaffoldError` reasons.                                                                                                                                                                                                                             |
| `Dependency`            | interface | `{ name, range }` — one runtime `@orkestrel/*` dependency; drives its `package.json` entry, the build externals, and its `guides/src/<dep>.md` mirror — byte-correct for a dep this package vendors (contract / emitter / markdown / guide), a `host`-origin POINTER the caller syncs otherwise (R3).                       |
| `Override`              | interface | `{ path, content }` — one caller template override; `content` REPLACES the rendered artifact at `path`, never partially merges. An override whose `path` matches no planned artifact, or targets a `host`-origin path, is a BLOCKING Question — never a silent add (R5).                                                    |
| `Blueprint`             | interface | `{ name, description, keywords, surfaces, dependencies, version, engines, overrides }` — the closed, JSON-serializable package spec.                                                                                                                                                                                        |
| `Member`                | interface | `{ name, category, summary, surface }` — one declared public export of the scaffolded package; derived by `blueprintToMembers`, never authored.                                                                                                                                                                             |
| `Artifact`              | interface | `{ path, group, origin, surface?, content?, source? }` — one file in a `Plan`; `content` present for `template` / `computed`, `source` (a host-relative path) for `host`.                                                                                                                                                   |
| `Plan`                  | interface | `{ blueprint, groups, artifacts, trace?, hash? }` — the compiled, ordered artifact list plus the selection it covers; `trace` / `hash` filled by the pin.                                                                                                                                                                   |
| `Finding`               | interface | `{ path, group, drift }` — one audit drift result.                                                                                                                                                                                                                                                                          |
| `Audit`                 | interface | `{ findings, clean, complete, questions, drifted, missing, foreign }` — the whole diff of a plan against a target's content; a `Compiler.audit` over a gate-failing blueprint sets `complete: false` with the gate's `questions` and zero findings (R4), while `diffPlan` over an existing plan is always `complete: true`. |
| `Question`              | interface | `{ field, text, blocking, candidates? }` — one validation issue; `blocking: true` fails the gate closed, `false` is an advisory that rides a complete result.                                                                                                                                                               |
| `Validation`            | interface | `{ valid, questions, warnings }` — the semantic pass over a blueprint; returns, never throws.                                                                                                                                                                                                                               |
| `PlanSummary`           | interface | `{ name, surfaces, groups, artifacts, host, template, computed }` — the dry-run tally.                                                                                                                                                                                                                                      |
| `CompileRecord`         | interface | `{ stage, input, output, failed, error? }` — a structured input/output snapshot of one pipeline phase.                                                                                                                                                                                                                      |
| `CompileFailure`        | interface | `{ stage, code, message }` — a visible marker for a stage that failed.                                                                                                                                                                                                                                                      |
| `Scaffolding`           | interface | `{ blueprint, plan?, questions, stages, failures, complete, digest }` — the full, replayable outcome of one `compile()` call.                                                                                                                                                                                               |
| `PlanRecord`            | interface | `{ id, plan, version, hash }` — a versioned, content-hashed `Plan` inside a `PlanManager`.                                                                                                                                                                                                                                  |
| `MaterializeResult`     | interface | `{ target, written, copied, skipped }` — the outcome of one materialization **(server)**.                                                                                                                                                                                                                                   |
| `CompilerEventMap`      | type      | `Compiler`'s push observation surface (AGENTS §13) — `compile(scaffolding)` · `audit(audit)` · `block(questions)` · `error(error)` · `destroy()`.                                                                                                                                                                           |
| `CompilerOptions`       | interface | `{ on?, error? }` — input to `createCompiler`.                                                                                                                                                                                                                                                                              |
| `CompilerInterface`     | interface | The compilation orchestrator contract — `emitter` + `compile` / `audit` / `destroy`.                                                                                                                                                                                                                                        |
| `PlanManagerEventMap`   | type      | `PlanManager`'s push observation surface — `add(id)` · `remove(id)` · `destroy()`.                                                                                                                                                                                                                                          |
| `PlanManagerOptions`    | interface | `{ plans?, on?, error? }` — input to `createPlanManager`.                                                                                                                                                                                                                                                                   |
| `PlanManagerInterface`  | interface | The plan registry contract (AGENTS §9) — `emitter` / `size` + `has` / `plan` / `plans` / `add` / `remove` / `destroy`.                                                                                                                                                                                                      |
| `MaterializerEventMap`  | type      | `Materializer`'s push observation surface **(server)** — `copy(path)` · `write(path)` · `done(result)` · `error(error)` · `destroy()`.                                                                                                                                                                                      |
| `MaterializerOptions`   | interface | `{ host?, on?, error? }` — input to `createMaterializer` **(server)**; `host` is the vendored-data root host-origin artifacts are copied FROM (defaults to this package's data).                                                                                                                                            |
| `MaterializerInterface` | interface | The materialization contract **(server)** — `emitter` + `materialize` / `repair` / `destroy`.                                                                                                                                                                                                                               |

The `Blueprint` and the `Plan` are the two closed contracts — every field is a `string`,
`readonly` array, or record, so both round-trip JSON and both cross a tool / RPC boundary
unchanged. `Artifact` is discriminated by `origin`: a `host` artifact names a `source`
(the host-relative path to byte-copy) and carries NO `content` (the pure core never reads
host bytes); a `template` / `computed` artifact carries the rendered `content` and no
`source`. That single axis is what keeps the core pure while still describing files it
cannot itself read.

### Constants

| API               | Kind  | Summary                                                                                                                                                                                                                                                    |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SURFACES`        | const | The three `Surface` values, frozen — compose with `literalOf(...)` / `parseEnum(...)`.                                                                                                                                                                     |
| `ORIGINS`         | const | The three `Origin` values, frozen.                                                                                                                                                                                                                         |
| `GROUPS`          | const | The seven `Group` values, frozen — the artifact-group selection vocabulary.                                                                                                                                                                                |
| `CATEGORIES`      | const | The four `Category` values, frozen.                                                                                                                                                                                                                        |
| `COMPILE_STAGES`  | const | `['draft', 'gate', 'pin']`, frozen — the pipeline phases in order.                                                                  
