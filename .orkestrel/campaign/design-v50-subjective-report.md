# Untrusted subjective design proposal

Lane held: subjective design. This report proposes a coherent contract and work shape. It does not reconcile the objective lane or accept the change.

## Source verification

The landed source supports the defects, with these corrections and limits:

| Brief claim | Ruling |
| --- | --- |
| Scaffold is at `0.0.49`. | Verified in [package.json](C:/Users/mikes/WebstormProjects/scaffold/package.json:3). |
| Caller peers pass through unchanged. | Wrong. The guide promises this at [guides/scaffold.md](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:944), but `replaceManifestRanges` includes `peerDependencies` in its writable sections at [src/core/compilers.ts](C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:1486). The tests explicitly require peer rewriting at [compilers.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/src/core/compilers.test.ts:79) and [Materializer.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/src/server/Materializer.test.ts:1132). |
| `repair` refuses before selecting groups. | Literally wrong. `repair` parses `--groups` before the refusal at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:323). The real defect is that `#assertTarget` receives no group selection at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:325), while the selected plan is surveyed later at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:328). |
| `repair --groups orchestration,docs` receives the same refusal. | Verified by structure. `#targetQuestions` and `#assertTarget` accept no group information at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:1205), so every repair selection meets the same project and dependency checks. |
| `audit` completes and reports the conflict. | Verified. `#inspect` adds target questions, then still surveys the selected plan at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:281). The project question is non-blocking. |
| The exact probe, published `@orkestrel/test`, and registry install failures occurred as described. | The landed source cannot verify registry state or historical tarball behavior. The mutation path that would produce those results is present and explicit. |
| The repository is committed and clean. | Verified from the working tree. |

## Design

### Declaration ownership

The ruling is: scaffold may raise ranges in `dependencies` and `devDependencies`. It must never write `peerDependencies` on an existing target.

| Question | Option | Cost | Recommendation |
| --- | --- | --- | --- |
| Stop writing peers | Treat `peerDependencies` as caller-owned compatibility data. | A stale or incompatible peer requires an explicit developer edit. Scaffold can no longer “repair” that declaration. | Adopt. This matches what a developer expects a peer range to mean and restores the guide’s existing promise. |
| Derive peers from a major line | Rewrite a peer such as `^4.1.0` to `^4`. | This broadens downward to versions the package may never have supported. For `0.x` packages, `^0` is much broader than the fleet’s compatibility model. It still overwrites a caller’s compatibility claim. | Reject. A different derivation does not fix the ownership error. |
| Blueprint names a peer for a vacant target | Emit that peer into the birth-owned manifest. | The blueprint author becomes responsible for the range they supplied. | Keep. Creation is the point where the blueprint owns the manifest shape. |
| Existing target never declared the peer | Add nothing. | Scaffold cannot introduce a peer merely because its internal blueprint knows the name. | Adopt. Absence remains caller-owned absence. |
| Raise runtime and development floors | Keep the full `major.minor.patch` floor. | Older releases inside the same major stop satisfying the generated workspace. | Keep. These declarations define the installed build, runtime, and test baseline scaffold owns. A peer instead defines consumer compatibility. |

A package appearing in `devDependencies` and `peerDependencies` makes the distinction visible: scaffold may raise the development floor while preserving the peer text byte-for-byte. That apparent mismatch is useful. It exposes a compatibility decision instead of silently rewriting it.

The verb consequences must be predictable:

- `new` emits blueprint peers exactly as supplied.
- `audit` does not classify a peer as a scaffold-owned stale floor.
- `repair` raises runtime and development declarations only.
- `catalog` raises fleet declarations found in runtime and development sections only. It may still fetch a peer package’s guide because guide membership is a separate concern.
- `overwrite` inherits the same range boundary from `repair` and `catalog`.
- Every writing verb leaves `peerDependenciesMeta` untouched.

### Group-scoped configuration preconditions

The ruling is: resolve the group selection first, then apply configuration preconditions only when `configs` is selected.

| Question | Option | Cost | Recommendation |
| --- | --- | --- | --- |
| Place the check after selection | Pass the normalized group selection into the target-question boundary. | A scoped run can succeed while another group remains conflicted. Its output must make that scope clear. | Adopt. `--groups` must constrain refusals as well as writes. |
| Put target projects in the plan | Parse or preserve arbitrary target Vitest configuration. | This makes a content-owned canonical file partly target-owned, requires a TypeScript configuration parser or an extension contract, and makes generated configuration unpredictable. | Reject. The plan must continue to describe scaffold’s fixed project vocabulary. |
| `audit` behavior | Report configuration questions only when the audited selection includes `configs`. | A docs-only audit no longer reminds the developer about unrelated configuration debt. | Adopt. A scoped audit must speak only for its scope. The default audit still reports the question and completes its comparison. |
| Refusal message | Name `configs` as the blocked group and `vite.config.ts` as the conflicting path. | Messages become slightly longer. | Adopt. Replace the whole-tool refusal with an exact boundary and an actionable narrower selection. |
| Other preconditions | Scope the planned-dependency question with the same rule. | A target may receive unrelated vendored changes while its toolchain remains incomplete. | Adopt. `#dependencyQuestion` has the same shape and the same “before writing configuration” rationale at [CLI.ts](C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:1173). |

A selected run containing `configs` must still refuse as one transaction. Scaffold must not silently drop the blocked group. A selection excluding `configs` proceeds.

The writing refusal must read like this:

```text
The configs group would replace vite.config.ts, but the manifest at TARGET names Vitest projects the planned configuration does not register: PROJECTS. Run again without configs, or remove those project scripts before writing configs.
```

The missing-dependency form must use the same frame:

```text
The configs group is blocked because the manifest at TARGET does not declare planned dependencies: PACKAGES. Add the named declarations before writing configs, or run again without configs.
```

### Proposed types and signatures

No new public data type is justified. Declaration class is already encoded by the manifest section. Adding a `section` property to every `Dependency` would leak writer mechanics into blueprints, releases, catalog rows, and upstream lookup.

Revise the existing type description, without changing its shape:

```ts
/** One package name and range, represented independently of its manifest section. */
export interface Dependency {
	readonly name: string
	readonly range: string
	readonly optional?: boolean
}
```

Keep the public signatures, but narrow their written contract to runtime and development sections:

```ts
export function replaceManifestRanges(
	manifest: string,
	dependencies: readonly Dependency[],
): string | undefined

export function replacePlanRanges(
	plan: Plan,
	dependencies: readonly Dependency[],
): Plan | undefined

declare(dependencies: readonly Dependency[], target: string): MaterializeResult
```

Their TSDoc must state verbatim:

```text
Rewrites matching values in `dependencies` and `devDependencies`.
Never reads or writes `peerDependencies` or `peerDependenciesMeta`.
Returns `undefined` when a named dependency appears in neither writable section.
```

Replace the bin helper with an ownership-specific name:

```ts
export function manifestToWritableDependencies(
	manifest: string,
	blueprint: Blueprint,
): readonly Dependency[]
```

This helper must inspect `dependencies` and `devDependencies`, preserve the existing fleet and planned-tool membership rules, and ignore `peerDependencies`.

Make target questions explicitly selection-aware:

```ts
#targetQuestions(
	target: string,
	blueprint: Blueprint,
	groups: readonly Group[] | undefined,
	writing = false,
): readonly Question[]

#assertTarget(
	target: string,
	blueprint: Blueprint,
	groups: readonly Group[] | undefined,
): void
```

When `groups` is absent, the selection means every group. When it excludes `configs`, `#targetQuestions` omits project and planned-dependency configuration questions.

### Guide and release contract

The guide must say:

- Blueprint peers are emitted during creation and pass through unchanged thereafter.
- Runtime and development declarations are scaffold-owned floors.
- Peer declarations express consumer compatibility and remain caller-owned.
- Release evidence used by writing verbs excludes peer-only declarations.
- Project and planned-dependency conflicts block `configs`, not unrelated groups.
- A default run still refuses when its selection includes `configs`.
- A scoped audit reports only questions belonging to its selected groups.
- A package-specific distribution proof can catch an unsatisfiable peer by packing the artifact and installing it beside the real companion package. Scaffold’s own regression gate must also prove every writing verb preserves peer bytes.

The `0.0.50` release note must state:

> Scaffold no longer rewrites `peerDependencies`. `new` preserves blueprint peer ranges, while `repair`, `catalog`, and `overwrite` raise only runtime and development floors. Configuration project and planned-tool conflicts block the `configs` group only, so other selected groups can be repaired without replacing `vite.config.ts`.

The vendored [guides/scaffold.md](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:939) file moves. Regenerating the inventory moves `host.json` and the built `dist/host/manifest.json`. No vendored configuration or policy test needs to move; install compatibility remains package-specific distribution evidence.

## Alternatives

### Normalize peers to a major range

This keeps automatic peer rewriting while changing its formula. It loses because it invents compatibility in versions the package author did not name, especially across pre-`1.0` lines.

### Merge target projects into generated configuration

This preserves custom Vitest projects while retaining `configs` writes. It loses because the plan would need to parse or import target-owned configuration, turning one canonical artifact into a hidden merge surface. That capability requires its own explicit extension design.

## Units

### Range ownership contract

Role and engine: `implementer` — GPT-5.6 Sol.

Owned files:

- `src/core/types.ts`
- `src/core/compilers.ts`
- `src/server/types.ts`
- `src/server/Materializer.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/server/Materializer.test.ts`

Acceptance criteria:

- Runtime and development occurrences move.
- Peer and peer-meta bytes remain unchanged.
- A name found only in a peer section is refused as absent from the writable declaration set.
- Existing override and resolution preservation remains proven.

### CLI ownership and group scope

Role and engine: `implementer` — GPT-5.6 Sol.

Depends on the range ownership contract.

Owned files:

- `src/bin/types.ts`
- `src/bin/helpers.ts`
- `src/bin/CLI.ts`
- `tests/src/bin/helpers.test.ts`
- `tests/src/bin/CLI.test.ts`

Acceptance criteria:

- `new`, `repair`, `catalog`, and `overwrite` preserve peer ranges.
- Writing-verb release evidence contains only writable declarations.
- `repair --groups orchestration,docs` proceeds against an unregistered custom project.
- A selection containing `configs` refuses before writing and names `configs`.
- `overwrite` follows the same group rule.
- Default and configs-scoped audits report the project question; a docs-scoped audit does not.
- The planned-dependency question follows the same scope.

### Guide and release surface

Role and engine: `opus` — Claude Opus 5.

Depends on the landed behavior.

Owned files:

- `guides/scaffold.md`
- `package.json`
- `package-lock.json`
- `host.json`

Acceptance criteria:

- The guide no longer describes peer ranges as scaffold floors.
- The command and result descriptions match every verb consequence.
- The configuration refusal text names the blocked group.
- The release note states the peer and group-selection changes.
- The vendored inventory records the revised guide bytes.

### Gate evidence

Role and engine: `verifier` — Terra.

Read-only ownership.

Acceptance criteria:

- Run the narrow core, server, bin, guide, config, and distribution projects affected by the change.
- Run the repository acceptance gates in their prescribed order.
- Inspect the packed `dist/host` inventory and published declarations.
- Report exit-code truth without fixing failures.

## Tensions

The objective lane must challenge these design judgments:

- Whether excluding peer-only declarations from writing-verb `releases` changes a relied-on machine-readable contract.
- Whether the planned-dependency question belongs solely to `configs`, or whether a selected artifact outside that group introduces a dependency reference.
- Whether a peer-only fleet package must remain in catalog guide membership while being absent from catalog range pins.
- Whether the writer’s existing all-names-must-resolve rule remains complete after writable dependency extraction.
- Whether a default selection containing `configs` must refuse atomically rather than write unblocked groups.

## Risks

- Existing library callers may rely on `declare` rewriting peers. The `0.0.x` policy permits the correction, but the release note must make the semantic break explicit.
- A development floor can move outside the caller’s peer range. That is an intentional visible conflict. The package’s real tests and distribution proof must force the author to resolve it.
- A scoped repair can finish clean while configuration remains conflicted. Reports and guide prose must identify the selected groups so “clean” is not read as whole-workspace alignment.
- A generic static peer-satisfiability gate would require semver behavior this repository does not own. Use real package installation in each package’s distribution proof instead of adding a parser or a coarse range heuristic.