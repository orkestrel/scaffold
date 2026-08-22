# Design report

## Ruling

Scaffold must treat an existing `peerDependencies` range as caller-owned data. No registry floor may rewrite it. Runtime and development declarations retain full-triple floors because those declarations govern installed production code and the workspace’s build/test toolchain, respectively.

The Vitest-project precondition must carry artifact-group scope. A custom project blocks writes to `configs`, not writes to `docs`, `orchestration`, or another unrelated group.

## Verified facts and corrections

- The guide claim that peers pass through unchanged is false for `0.0.49`. [guides/scaffold.md](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:939) says they pass through. [manifestToDependencies](C:/Users/mikes/WebstormProjects/scaffold/src/core/helpers.ts:833) erases the declaration section, [#pin](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:811) produces `^<served-version>` by package name, and [replaceManifestRanges](C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:1481) applies that name across `dependencies`, `devDependencies`, and `peerDependencies`. The landed tests explicitly require the defective behavior in [compilers.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/src/core/compilers.test.ts:71) and [Materializer.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/src/server/Materializer.test.ts:1132).

- The brief’s “before it selects a group” wording is literally wrong. `repair` parses the group selection before calling `#assertTarget` at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:323), as does `overwrite` at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:429). The real defect is that `#assertTarget` receives no group selection and therefore applies every target question to the whole run.

- The brief’s runtime-dependency explanation is incomplete. A `devDependencies` range selects local development and test tooling. A runtime `dependencies` range states what production package npm must install for a consumer, not merely what the publisher tested against. [npm’s package guidance](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file/) makes that distinction.

- The peer conflict is valid. `4.1.10` does not satisfy `^4.1.11`, so no version can satisfy that range and an exact `4.1.10` peer together. npm can reject an incompatible peer graph with `ERESOLVE`; ignoring peers requires the exceptional `--legacy-peer-deps` behavior. [npm configuration documentation](https://docs.npmjs.com/cli/using-npm/config/) describes those resolver rules. The caret expansion is `>=4.1.11 <5.0.0`, per [node-semver](https://github.com/npm/node-semver#caret-ranges-123-025-004).

- The exact probe, test-package, and supervisor incidents are recorded in the landed campaign records and `ROADMAP.md`. Scaffold source proves the mechanism and the refusal path. It cannot independently establish the bytes of foreign tarballs or another repository’s target at the time of the wave.

## Peer declaration rulings

### Stop writing existing peers

- Option: Preserve every existing `peerDependencies` value byte-for-byte.
- Cost: Scaffold no longer raises a stale or invalid peer range for the caller.
- Recommendation: Adopt this option. A peer declares compatibility supplied at the consumer boundary. Raising it without compatibility evidence converts an author’s supported range into a registry-currency guess.

A peer can be optional, but if the consumer installs it, its version still has to satisfy the declared range. Optionality does not make an incompatible installed peer valid.

### Derive a major-line peer range

- Option: Replace a peer with a major-line range such as `^4.0.0`.
- Cost: This broadens compatibility below the author’s tested minimum and still overwrites caller intent. It is especially unsound below `1.0.0`: `^0.0.3` admits no later release, while `^0` admits the whole pre-`1.0.0` line. [node-semver’s caret rules](https://github.com/npm/node-semver#caret-ranges-123-025-004) confirm that difference.
- Recommendation: Reject this option. A registry version cannot prove API compatibility across a major line.

### Blueprint peer absent from an existing target

- Option: Insert a peer when a derived blueprint names it.
- Cost: Inserting requires rewriting caller-owned manifest structure, which the `declare` method explicitly refuses to do.
- Recommendation: Distinguish creation from repair:

  - A caller-supplied `Blueprint.peers` row is written exactly during `materialize` into a vacant target.
  - CLI derivation from an existing target must not invent a peer or feed target peers into `Blueprint.dependencies`.
  - `repair`, `catalog`, and `overwrite` must leave an absent peer absent.
  - A direct `Materializer.repair` call also leaves it absent because `package.json` is birth-owned; only `declare` mutates its range regions.

### Runtime and development floors

- Option: Retain full-triple floors for `dependencies` and planned `devDependencies`.
- Cost: A runtime raise can force a release cascade or a distinct installed copy. A development raise can expose toolchain incompatibility during local gates.
- Recommendation: Retain them.

For runtime declarations, the raise is a real production requirement. For `@orkestrel/*` packages at `0.0.x`, the caret selects one release, which is why a runtime change requires dependent re-pinning and publication.

For development declarations, the raise selects the toolchain the workspace builds and tests with. Development declarations do not enter a consumer’s production install.

### Publication gate

- Option: Rely on unit assertions that peer text did not change.
- Cost: This proves scaffold’s rewrite policy but not npm installability.
- Recommendation: Use complementary proofs:

  - Core and server tests must assert that a name shared by `devDependencies` and `peerDependencies` receives a development-floor raise while its peer text remains exact.
  - Scaffold’s distribution project must create local package tarballs that reproduce the peer graph, run the real npm resolver, and prove the preserved peer installs. Its negative control must substitute the narrowed peer and observe `ERESOLVE`.
  - Each published package carrying peers needs its own distribution proof with a representative co-peer. A generic pack/install with no co-peer witness can miss the defect because npm may install a version satisfying the narrowed range.

## Per-verb dependency consequences

| Verb | Required behavior |
| --- | --- |
| `new` | The CLI emits no peer because it accepts no peer option. A library caller’s `Blueprint.peers` entries are emitted exactly. Registry replacement changes runtime and development ranges only. |
| `audit` | It reports runtime and planned-development release evidence. It does not report peer “staleness,” because registry currency is not peer compatibility. |
| `repair` | It repairs selected artifacts and raises declared runtime and planned-development floors. It never changes, inserts, or removes a peer. |
| `catalog` | It can keep a peer package in the declared-name set used for guide mirrors. Its manifest rewrite changes runtime and development ranges only. |
| `overwrite` | Its online and offline range paths follow the same rule as `repair`. Peer bytes remain caller-owned. |
| `Materializer.declare` | Its type admits runtime and development pins only. Supplying a peer rewrite is impossible through the typed API. |

## Group-scoped precondition rulings

### Apply the check after group selection

- Option: Continue treating every target question as a whole-run refusal.
- Cost: A conflict in `vite.config.ts` blocks unrelated vendored changes.
- Recommendation: Attach `groups: ['configs']` to the custom-project question. Filter target questions against the selected groups before refusing or reporting them.

A selection containing `configs` and another group must refuse atomically before any write. A selection excluding `configs` proceeds.

### Import target-owned Vitest projects into the plan

- Option: Infer custom project definitions from package scripts or the existing Vite configuration.
- Cost: A project label does not supply its include patterns, environment, setup, imports, or factory. Parsing arbitrary Vite source would duplicate TypeScript analysis and violate the repository’s analyzer boundary.
- Recommendation: Reject automatic adoption. Keep custom projects target-owned. The plan must not pretend that a label is a project definition.

A separate explicit extension contract could be designed when a real consumer supplies complete project definitions. It is outside these rows.

### Audit behavior

- Option: Keep reporting every project advisory regardless of audit scope.
- Cost: `audit --groups docs` reports a conflict outside the population it claims to inspect.
- Recommendation:

  - A default audit or an audit selecting `configs` reports the non-blocking project question, including `groups: ['configs']`, and still reports ordinary findings.
  - An audit selection excluding `configs` omits that question.
  - The question remains non-blocking. An aligned audit does not become drift solely because the target owns a custom project.

### Refusal message

- Option: Continue saying that scaffold writing verbs cannot operate on the workspace.
- Cost: The message prescribes removing valid target behavior and hides the usable group path.
- Recommendation: Name the blocking group and the safe alternative:

```text
The configs group is blocked because the manifest at <target> names Vitest projects the planned configuration does not register: <names>. Remove those scripts, provide a supported project extension, or exclude configs from --groups.
```

### Other preconditions with the same shape

The sweep found related cases:

- The dependency-membership question in [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:1173) shares the defect. Missing planned tooling is relevant when writing `configs` or content-owned `tests`, not when writing `docs` or `orchestration`. Give it `groups: ['configs', 'tests']`.

- The `overwrite` dirty-tree refusal is also broader than its selected deletion candidates. A dirty source file blocks `overwrite --groups docs` even when no selected candidate reaches that file. The `Materializer.remove` contract deliberately refuses a dirty tree wholesale, so changing it requires a separate destructive-path ruling. Do not silently relax it in this release.

The following preconditions are load-bearing and remain whole-run:

- Version completeness remains load-bearing because `repair`, `catalog`, and `overwrite` declare runtime and development ranges independently of artifact-group selection. Authoritative registry absence cannot produce an installable pin.
- A readable git repository remains load-bearing for `overwrite`, because tracked content is its recovery mechanism.
- Host-manifest integrity remains whole-surface because the host is accepted as one authenticated baseline.
- Plan, audit, destination-byte, and deletion-candidate preconditions are already derived from the selected plan or actual write set.

## Proposed types and signatures

Add these contracts to `src/core/types.ts`:

```ts
/** The declared dependency sections read from an existing package manifest. */
export interface ManifestDependencySet {
	readonly runtime: readonly Dependency[]
	readonly development: readonly Dependency[]
	readonly peer: readonly Dependency[]
}

/** The dependency sections a range-writing operation may change. */
export interface DependencyPinSet {
	readonly runtime: readonly Dependency[]
	readonly development: readonly Dependency[]
}
```

Revise `Question` as follows:

```ts
export interface Question {
	readonly field: string
	readonly message: string
	readonly blocking: boolean
	readonly groups?: readonly Group[]
	readonly candidates?: readonly string[]
}
```

`groups` names the artifact groups that make the question relevant. Absence means the question applies regardless of group selection.

Change the core signatures verbatim:

```ts
export function manifestToDependencies(manifest: string): ManifestDependencySet

export function replaceManifestRanges(
	manifest: string,
	pins: DependencyPinSet,
): string | undefined

export function replacePlanRanges(
	plan: Plan,
	pins: DependencyPinSet,
): Plan | undefined
```

Change the server contract verbatim:

```ts
declare(pins: DependencyPinSet, target: string): MaterializeResult
```

Change the executable contract verbatim:

```ts
export interface VersionResolution {
	readonly releases: readonly Release[]
	readonly pins: DependencyPinSet
	readonly baseline?: Baseline
	readonly forced: boolean
	readonly complete: boolean
}
```

Change the decision-bearing private signatures verbatim:

```ts
async #versions(
	declared: ManifestDependencySet,
	offline: boolean,
): Promise<VersionResolution>

#pin(
	releases: readonly Release[],
	declared: ManifestDependencySet,
): DependencyPinSet

#projectQuestion(target: string, blueprint: Blueprint): Question | undefined

#dependencyQuestion(target: string, blueprint: Blueprint): Question | undefined

#targetQuestions(
	target: string,
	blueprint: Blueprint,
	groups?: readonly Group[],
): readonly Question[]

#assertTarget(
	target: string,
	blueprint: Blueprint,
	groups?: readonly Group[],
): void
```

`manifestToDependencies` must preserve declaration class. Runtime and development rows enter version resolution. Peer rows remain available for catalog guide-name discovery but never enter `#versions`, `#pin`, `replaceManifestRanges`, or `Materializer.declare`.

## Unit decomposition

### Dependency-section contract

Owned files:

- `src/core/types.ts`
- `src/core/helpers.ts`
- `src/core/validators.ts`
- `src/core/compilers.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/core/validators.test.ts`
- `tests/src/core/compilers.test.ts`

Acceptance criteria:

- Manifest parsing preserves runtime, development, and peer sections.
- A repeated name can exist in development and peer sections without losing either range.
- Plan replacement changes runtime and development ranges only.
- A caller-supplied blueprint peer is emitted exactly.
- The core project passes.

### Materializer range boundary

Owned files:

- `src/server/types.ts`
- `src/server/Materializer.ts`
- `tests/src/server/Materializer.test.ts`

Acceptance criteria:

- `declare` accepts `DependencyPinSet`.
- Runtime and development declarations can move independently.
- A peer sharing the same name remains byte-identical.
- An undeclared runtime or development pin still refuses before writing.
- The server project passes.

### CLI version and group policy

Owned files:

- `src/bin/types.ts`
- `src/bin/helpers.ts`
- `src/bin/CLI.ts`
- `tests/src/bin/helpers.test.ts`
- `tests/src/bin/CLI.test.ts`

Acceptance criteria:

- `audit`, `repair`, `catalog`, and `overwrite` exclude peers from pin resolution.
- Catalog guide discovery still sees declared `@orkestrel/*` peers.
- `repair --groups orchestration,docs` proceeds against a target carrying custom Vitest projects.
- A `configs` selection refuses before writing and names `configs`.
- A mixed selection containing `configs` refuses atomically.
- Scoped audit output includes only questions relevant to its groups.
- The dependency-membership question is limited to `configs` and `tests`.
- The bin project passes.

### Resolver regression proof

Owned file:

- `tests/distribution.test.ts`

Acceptance criteria:

- A locally packed repaired target installs beside a local exact co-peer through the real npm resolver.
- The target’s preserved peer range admits the witness.
- Replacing that peer with the raised floor makes the control install fail with `ERESOLVE`.
- The distribution project passes in release mode.

### Guide, inventory, and release record

Owned files:

- `guides/scaffold.md`
- `tests/guides.test.ts`
- `host.json`
- `ROADMAP.md`

Acceptance criteria:

- The guide distinguishes runtime, development, and peer semantics.
- The guide states that existing peers pass through unchanged and that blueprint peers are emitted exactly.
- The guide documents group-scoped project refusals and scoped audit questions.
- Public surface tables include the added types and changed signatures.
- Guide parity passes.
- The host inventory carries the changed `guides/scaffold.md` digest.
- The closed roadmap rows are removed after implementation and verification.

## Release effect

The release note must say:

> Existing `peerDependencies` ranges are caller-owned and no scaffold verb raises them. Runtime and planned development floors still track registry releases. `repair` and `overwrite` apply custom Vitest-project conflicts only when the selected groups include `configs`; scoped runs for unrelated groups proceed. Audit reports the conflict as a non-blocking, group-scoped question.

It must also identify the breaking library contract: `manifestToDependencies` returns grouped declaration classes, range replacement and `Materializer.declare` accept `DependencyPinSet`, and `Question` can carry `groups`.

The vendored byte that moves is `guides/scaffold.md`. Regenerate `host.json`; the build then changes `dist/host/guides/scaffold.md` and the generated `dist/host/manifest.json`. No package dependency is added.

## Risks

- The signature changes break library consumers. Update every repository consumer in the same release wave; add no compatibility overload.
- Pass-through preserves an author’s invalid peer range. That is the correct ownership boundary, so package-specific distribution tests remain necessary.
- A local resolver witness proves the measured conflict shape, not every possible peer graph.
- Hard-coded question groups can drift from artifact ownership. Tests must cover excluded, included, and mixed selections.
- Adding `Question.groups` changes machine-readable audit output.
- The dirty-tree refusal remains broader than selected overwrite candidates. Keep that residual explicit until its destructive-path contract receives a separate ruling.