# Design report: online-first versions, guides, and host files

## Decision

Adopt one rule: resolve and validate the local floor, attempt the live source, and select one usable baseline before mutation.

A live answer wins. A transport fault, rate refusal, timeout, byte-bound refusal, or integrity refusal selects the distributed floor when that floor can answer the same request. An authoritative registry `404` or a registry response with no admitted version does not fall back, because writing a version the registry says is absent can produce an uninstallable manifest.

Every result carries its baseline:

- `live` means the returned bytes or version passed the live-source checks.
- `distributed` means the installed package supplied the answer after the live attempt failed.
- `local` means `--from` explicitly replaced the network strategy for host files.

A degraded mutation returns its complete result, prints the fallback reason, and exits `1`. This preserves the warning that the existing `FETCH` refusal protects. An unresolved mutation refuses before writing, except that `overwrite` retains its existing rule: host repair and deletion already committed remain committed if the catalog phase fails.

Put the policy in the `Upstream` methods, over one shared binary reader. Do not build a generic fallback function. Registry absence, guide absence, and host-set absence have different meanings, so one generic policy would conceal the decisions that must remain explicit.

## Host fetch mechanism

Use one recursive Git tree request followed by raw fetches only for entries whose distributed bytes do not match the tree’s blob identifier.

The options have these costs:

| Option | Cost | Ruling |
| --- | --- | --- |
| Raw fetch per file | One request per installed entry on every operation. It has the smallest implementation but repeats unchanged transfers. | Reject. |
| Git tree plus changed raw files | One API request plus one raw request per changed entry. It permits local blob comparison and detects a branch movement between the tree and raw reads. | Adopt. |
| Codeload tarball | One archive transfer, but it downloads unrelated repository content, requires redirect handling, decompression, and a tar parser. | Reject. |

GitHub caps an unauthenticated REST client at `60` requests per hour per originating IP. An authenticated client normally receives `5,000` requests per hour. The design spends one REST request per host-baseline attempt; raw changed-file requests do not consume that documented REST bucket. Treat any undocumented raw-host throttling as a transport failure and select the distributed floor. See [GitHub REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2026-03-10).

GitHub caps a recursive tree response at `100,000` entries or `7 MB` and marks an incomplete response as truncated. Refuse a truncated tree and select the floor. See [Git Trees API](https://docs.github.com/en/rest/git/trees).

The built `dist/host/manifest.json` dated 2026-08-21 retains `937,942` file bytes, with `guides/scaffold.md` the largest entry at `98,969` bytes. The existing artifact and call ceilings cover that surface with substantial margin.

### Inventory ruling

The installed manifest produced by `stageHost` drives the fetch. Its expanded destination entries and roots are the exact floor inventory. `HOST_PATHS` remains the authoring inventory, while the installed manifest is its release-expanded form.

Ignore a path added to upstream `main` when that path is absent from the installed manifest. It becomes eligible after a scaffold release stages it into the floor. If `main` removes an installed entry, the live host candidate is incomplete and the whole operation selects the distributed floor. The live path never deletes an entry that the installed release still owns.

Keep the manifest’s executable flags. Do not derive executable behavior from Git tree modes because `EXECUTABLE_PATHS` deliberately makes staging host-independent.

The existing staging and manifest authority is in [helpers.ts](/C:/Users/mikes/WebstormProjects/scaffold/src/server/helpers.ts:1158), while the installed-root reconciliation is in [Materializer.ts](/C:/Users/mikes/WebstormProjects/scaffold/src/server/Materializer.ts:460).

## Host baseline atomicity

A host baseline must be all live or all distributed.

Reuse a distributed file without downloading it when its Git blob identifier matches the tree entry. That file still belongs to the live baseline because the tree proves byte identity. Report the live tree object identifier as `revision`.

If any required entry is missing, duplicated, truncated, oversized, not a regular blob, or mismatched after download, discard every live candidate byte and return the complete distributed floor. Never combine changed bytes from `main` with unrelated bytes from the installed release.

This rule prevents:

- `audit` from comparing against a baseline that never existed.
- `repair` from writing neighboring files from different revisions.
- A branch movement during the fetch from producing a mixed target.

`WriteTransaction` remains atomic against an ordinary thrown failure. Its documented process-termination limit remains unchanged.

## Version ruling

Use each declared exact floor as the version fallback. The package-generated tool floors originate in `BASE_DEV_DEPENDENCIES` and its environment tables. An existing target’s exact caret or tilde lower bound is its retained floor.

Apply these rules per dependency:

- A live admitted version returns `baseline.source: 'live'`.
- A transport, timeout, `5xx`, rate, or byte-bound failure returns the exact floor with `baseline.source: 'distributed'`.
- A registry `404` remains `lookup: 'missing'`.
- A readable packument with no admitted version remains `lookup: 'failed'`.
- A request with no valid exact floor remains unresolved.
- The `^0.0.0` placeholder used for a `new --deps` package is not a usable floor.

A complete pin set may contain live and floor rows. This softens the existing hard refusal only where every row still has a concrete version. The result records each row’s provenance, the command prints each fallback cause, and the command exits `1`. An unresolved row retains the hard `FETCH` refusal and prevents writes.

This preserves the earlier campaign’s core invariant: no mutation writes a dependency without a concrete answer. It relaxes only the requirement that every concrete answer came from the same run’s registry access.

The existing request and pin paths are in [Upstream.ts](/C:/Users/mikes/WebstormProjects/scaffold/src/server/Upstream.ts:179) and [CLI.ts](/C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:581).

## Guide ruling

Stage the repository’s package-guide mirrors into `dist/host` so the installed package has a real guide floor. Replace the individual guide rows in `HOST_PATHS` with the `guides` inventory, then compile only the target’s declared guide artifacts into its plan. Do not materialize the whole guide directory into every target.

Use one raw request per requested package guide. A tree request per package repository would add an API request to save at most one raw request, so it cannot reduce work for this surface.

Apply these rules per guide:

- A successful live read returns `baseline.source: 'live'`.
- When the target mirror is absent, a failed live read uses the distributed guide when present.
- When the target mirror equals the distributed guide, report the distributed baseline and skip the write.
- When the target mirror exists and differs from the distributed guide, retain the target mirror after a failed live read. Report the failed verdict and exit `1`. Do not roll a possibly newer mirror back to the release floor.
- When the live read, distributed floor, and target mirror provide no bytes, the mutation refuses before writing.

Keep the bounded pool at concurrency `6`. Raising it increases burst pressure across GitHub hosts without reducing transferred bytes.

Do not add conditional requests. A conditional request needs a stored validator from an earlier response. This design forbids a cache or state file, and each guide URL is read only once per operation. GitHub also excludes an HTTP `304` from the primary REST rate only when the request is correctly authorized, while this reader is deliberately unauthenticated. See [GitHub REST API best practices](https://docs.github.com/en/rest/using-the-rest-api/best-practices-for-using-the-rest-api?apiVersion=2022-11-28).

Keep the existing exact byte comparison between fetched content and `observed`. It already skips unchanged writes. A second digest would not skip the network request and would weaken an exact comparison into a derived comparison.

## Trust and integrity

Treat `main` as the trusted mutable source, matching the existing guide policy. TLS authenticates the GitHub endpoints. It does not prove that a branch change was authorized by project policy.

Add a content-consistency check for host files:

- Read the recursive tree through `api.github.com`.
- Accept only regular blob entries for required paths.
- Compute each Git blob identifier from `blob <byte-length>\0<bytes>`.
- Compare reused floor bytes and fetched raw bytes with the tree identifier.
- Reject a raw response that does not match the tree.

Git documents that object identifiers cover the object header and bytes, not the bare file alone. See [Git object storage format](https://git-scm.com/docs/user-manual#object-details).

This check proves that every accepted live file belongs to one observed Git tree. It does not protect against a malicious change already accepted into `main`, and Git’s SHA-1 object identifier is not a substitute for signed-release trust. A signed tag or pinned commit would change the adopted trust model and defeat automatic branch propagation.

Treat these responses as suspicious and select the complete distributed floor:

- A truncated or malformed tree.
- A required path that is missing or duplicated.
- A non-blob or symlink-mode entry.
- A declared size above `MAX_ARTIFACT_BYTES`.
- A raw body whose length or blob identifier differs from the tree.
- A response that exceeds the response or call budget.
- A redirect, invalid UTF-8 guide, or unexpected empty representation.

If the distributed manifest or its bytes fail validation, throw `TARGET` or `FETCH` and write nothing. A fallback is valid only when the floor itself is valid.

## Per-verb semantics

The command behavior is:

| Verb | Online behavior | Offline or degraded behavior |
| --- | --- | --- |
| `new` | Resolve one live host baseline, live versions, and live declared guides before opening the target. Compose the selected guide bytes into the host plan and materialize through one transaction. | Use the distributed host and missing-guide floors. Use concrete version floors after transport failures. Any unresolved version or guide refuses with `FETCH` and leaves the target untouched. A complete floor-backed creation writes, reports provenance, and exits `1`. |
| `audit` | Compare against one live host tree and report live version answers. Do not fetch guide mirrors because `audit` does not own their bytes. | Compare against the distributed host floor and report floor version answers. Write nothing. Any floor selection or unresolved release makes the exit nonzero. |
| `repair` | Audit and repair through the same live host result. Pin from live versions. Do not refresh existing guide mirrors. | Repair through the distributed host floor and use concrete version floors. Missing declared guides may be restored from the distributed guide floor. An unresolved version refuses before writes. A floor-backed repair exits `1`, even when its terminal audit is aligned. Existing host files can be replaced with older distributed bytes; the baseline report makes that rollback explicit. |
| `catalog` | Require a complete live organization list and complete catalog packuments before changing the package table. Refresh guides from their live repositories and pin from those live rows. | An unavailable or incomplete fleet catalog retains the hard `FETCH` refusal and writes nothing because no distributed structured membership can prove that a package was removed. After a complete catalog answer, a failed guide uses its floor when the target is absent or equal to that floor; otherwise the target mirror remains untouched. Safe resolved mirrors and the complete table may write, with exit `1` when a guide did not come from live. |
| `overwrite` | Repair and delete through one live host baseline, then run the `catalog` policy. | Repair and delete through the distributed host floor when host fetching fails. If fleet cataloging then fails, keep those host writes, return the existing partial-run `note`, and exit `1`. Guide retention and version-floor behavior match `catalog`. |

The guide transaction therefore softens only after fleet membership and catalog rows are complete. It never rewrites the catalog table from partial membership, never empties a failed mirror, and never replaces an existing differing mirror with an older floor.

## Public contract

Add these declarations to the authoritative type files before implementation:

```ts
export type Baseline =
	| {
			readonly source: 'live'
			readonly revision?: string
			readonly note?: never
	  }
	| {
			readonly source: 'distributed'
			readonly note: string
			readonly revision?: never
	  }
	| {
			readonly source: 'local'
			readonly revision?: never
			readonly note?: never
	  }

export interface ReleaseInput {
	readonly name: string
	readonly range: string
	readonly floor?: string
}

export type Release =
	| {
			readonly name: string
			readonly range: string
			readonly lookup: 'found'
			readonly baseline: Baseline
			readonly latest: string
			readonly major?: number
			readonly note?: never
	  }
	| {
			readonly name: string
			readonly range: string
			readonly lookup: 'missing' | 'failed'
			readonly note: string
			readonly major?: number
			readonly baseline?: never
			readonly latest?: never
	  }

export type Mirror =
	| {
			readonly name: string
			readonly path: string
			readonly lookup: 'found'
			readonly baseline: Baseline
			readonly content: string
			readonly observed?: string
			readonly note?: never
	  }
	| {
			readonly name: string
			readonly path: string
			readonly lookup: 'missing' | 'failed'
			readonly note: string
			readonly observed?: string
			readonly baseline?: never
			readonly content?: never
	  }
```

Add the server-side host and option declarations:

```ts
export interface HostFile {
	readonly path: string
	readonly hex: string
	readonly executable: boolean
}

export interface HostFloor {
	readonly files: readonly HostFile[]
	readonly roots: readonly string[]
}

export type HostResult =
	| {
			readonly files: readonly HostFile[]
			readonly roots: readonly string[]
			readonly baseline: {
				readonly source: 'live'
				readonly revision: string
				readonly note?: never
			}
	  }
	| {
			readonly files: readonly HostFile[]
			readonly roots: readonly string[]
			readonly baseline: {
				readonly source: 'distributed'
				readonly note: string
				readonly revision?: never
			}
	  }
	| {
			readonly files: readonly HostFile[]
			readonly roots: readonly string[]
			readonly baseline: {
				readonly source: 'local'
				readonly revision?: never
				readonly note?: never
			}
	  }

export interface UpstreamBounds {
	readonly timeout?: number
	readonly limit?: number
	readonly budget?: number
}

export type UpstreamEventMap = {
	readonly release: readonly [release: Release]
	readonly mirror: readonly [mirror: Mirror]
	readonly host: readonly [result: HostResult]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

export interface UpstreamOptions {
	readonly guides?: {
		readonly base?: string
		readonly branch?: string
		readonly bounds?: UpstreamBounds
	}
	readonly host?: {
		readonly api?: string
		readonly base?: string
		readonly branch?: string
		readonly bounds?: UpstreamBounds
	}
	readonly registry?: {
		readonly base?: string
		readonly bounds?: UpstreamBounds
	}
	readonly concurrency?: number
	readonly retries?: number
	readonly on?: EmitterHooks<UpstreamEventMap>
	readonly error?: EmitterErrorHandler
}

export interface UpstreamInterface {
	readonly emitter: EmitterInterface<UpstreamEventMap>
	lookup(releases: readonly ReleaseInput[]): Promise<readonly Release[]>
	fetch(
		names: readonly string[],
		current: Snapshot,
		floor: Snapshot,
	): Promise<readonly Mirror[]>
	host(floor: HostFloor): Promise<HostResult>
	catalog(): Promise<readonly CatalogEntry[]>
	destroy(): void
}
```

Change the materializer input from a path to the validated baseline:

```ts
export interface MaterializerOptions {
	readonly host?: HostResult
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

export function readHostFloor(host?: string): HostFloor
```

Add provenance to machine-readable verb results:

```ts
export interface NewResult extends MaterializeResult {
	readonly host: Baseline
	readonly releases: readonly Release[]
	readonly mirrors: readonly Mirror[]
}

export interface AuditResult extends Audit {
	readonly host: Baseline
	readonly releases: readonly Release[]
}

export interface RepairResult extends MaterializeResult {
	readonly host: Baseline
	readonly audit: Audit
	readonly releases: readonly Release[]
}

export interface CatalogResult extends MaterializeResult {
	readonly entries: readonly CatalogEntry[]
	readonly mirrors: readonly Mirror[]
	readonly dropped: readonly string[]
	readonly releases: readonly Release[]
}

export interface OverwriteResult extends CatalogResult {
	readonly host: Baseline
	readonly audit: Audit
	readonly note?: string
}
```

Do not add a `degraded` flag. Derive degradation from a distributed baseline or an unresolved mirror.

## Option and environment symmetry

Use these process mappings:

- `ORKESTREL_SCAFFOLD_REGISTRY` → `registry.base`
- `ORKESTREL_SCAFFOLD_GUIDES` → `guides.base`
- `ORKESTREL_SCAFFOLD_HOST` → `host.base`
- `ORKESTREL_SCAFFOLD_HOST_API` → `host.api`

Keep branch selection programmatic. Environment variables select deployment endpoints, not source-control policy.

Require `host.base` and `host.api` together when either is overridden. Refuse a split configuration that could read a tree from one authority and bytes from another.

An explicit `--from` host produces `baseline.source: 'local'` and skips host networking. It does not disable registry or guide reads.

## Bounds

Use endpoint-specific defaults:

- Registry responses retain `MAX_REGISTRY_BYTES` and `MAX_TOTAL_REGISTRY_BYTES`.
- Guide files use `MAX_ARTIFACT_BYTES` per response and `MAX_TOTAL_ARTIFACT_BYTES` per call.
- Host tree responses may use `MAX_REGISTRY_BYTES`; each host file remains capped at `MAX_ARTIFACT_BYTES`; the whole host call uses `MAX_TOTAL_ARTIFACT_BYTES`.
- Every consumed byte, including bytes from a refused response, spends the call budget.
- Host bodies remain binary until hashing and hex encoding. Decode only registry JSON and guide text.

## Implementation units

### Contract and inventory

Owned files:

- `src/core/types.ts`
- `src/core/constants.ts`
- `src/core/compilers.ts`
- `src/core/validators.ts`
- `src/server/types.ts`
- `src/server/validators.ts`

Acceptance criteria:

- The declarations match the proposed contract.
- `HOST_PATHS` stages the guide floor while compiled plans select only declared dependency guides.
- The target’s own guide remains excluded.
- Guards accept every valid baseline branch and refuse cross-branch fields.
- Core and server typechecks pass.

### Host-floor reader

Owned files:

- `src/server/helpers.ts`
- `tests/src/server/helpers.test.ts`

Dependencies: contract and inventory.

Acceptance criteria:

- `readHostFloor` verifies the manifest, storage membership, roots, SHA-256 digest, per-file bounds, and total bounds.
- It returns destination-keyed bytes and executable flags.
- A malformed manifest, missing storage object, duplicate destination, or oversized floor is refused.
- The existing `stageHost` output remains the only release-floor producer.

### Upstream engine

Owned files:

- `src/server/Upstream.ts`
- `tests/src/server/Upstream.test.ts`
- `tests/setupServer.ts`

Dependencies: contract and host-floor reader.

Acceptance criteria:

- The loopback fixture drives tree, raw host, registry, and guide endpoints natively.
- An unchanged host floor needs no raw-file body.
- Changed bytes matching the advertised blob are accepted.
- A hash mismatch, branch race, truncated tree, missing installed entry, symlink mode, redirect, timeout, rate refusal, or exhausted budget returns the complete floor.
- No result mixes live and distributed host bytes.
- An upstream-added path is ignored.
- Registry transport failure uses a valid exact floor; registry `404` does not.
- Guide live, distributed, retained-target, and unresolved outcomes match the ruling.
- Cancellation still rejects the whole in-flight call with `DESTROYED`.

### Materializer baseline integration

Owned files:

- `src/server/Materializer.ts`
- `tests/src/server/Materializer.test.ts`

Dependencies: host-floor reader and Upstream engine.

Acceptance criteria:

- Audit, materialize, and repair read one immutable `HostResult`.
- Live and distributed host results hydrate the same plan shape.
- `new` can compose selected mirror bytes into the initial transaction.
- A failed guide never empties or overwrites an existing differing mirror.
- Audit-to-repair reconfirmation still detects target movement.

### Verb policy

Owned files:

- `src/bin/types.ts`
- `src/bin/helpers.ts`
- `src/bin/CLI.ts`
- `src/bin/main.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/bin/helpers.test.ts`
- `tests/src/bin/main.test.ts`

Dependencies: Materializer baseline integration.

Acceptance criteria:

- Every verb follows the stated preflight, write, report, and exit behavior.
- Every JSON result exposes the baseline provenance required by its type.
- A degraded complete mutation exits `1` after reporting its result.
- An unresolved `new`, `repair`, or `catalog` request writes nothing.
- `overwrite` retains committed host work when cataloging fails.
- The environment variables map to the declared option groups.
- `--from` bypasses only host networking.

### Guide and distribution parity

Owned files:

- `guides/scaffold.md`
- `guides/README.md`
- `tests/guides.test.ts`
- `tests/distribution.test.ts`
- `ROADMAP.md` if the implementation closes or carries an existing row

Dependencies: verb policy.

Acceptance criteria:

- The guide documents baseline provenance, network endpoints, bounds, fallback exits, and the `--from` exception.
- The packed artifact contains the staged guide floor and a valid host manifest.
- Public declarations and method tables remain in barrel parity.
- The release artifact installs and drives host and guide floor fallback without repository files outside the tarball.

## Release note requirements

The release note must state:

- `new`, `audit`, `repair`, and `overwrite` attempt the scaffold host on GitHub before using `dist/host`.
- `new`, `catalog`, and `overwrite` attempt dependency guides before using the staged guide floor.
- Host bytes are accepted only as one Git tree baseline.
- A host path added to `main` does not enter targets until a scaffold release adds it to the installed inventory.
- Distributed fallback and retained guide mirrors produce explicit provenance and a nonzero exit.
- An offline `repair` can replace host content with the older distributed floor.
- `--from` disables host networking and reports a local baseline.
- The guide and host endpoint environment variables accompany the registry override.
- The package remains unauthenticated, redirect-free, and bounded.

## Risks

- Trusting mutable `main` lets a merged host-file defect reach targets before a package release.
- Shared-IP REST exhaustion can cause distributed fallback in CI.
- A distributed host repair can roll back bytes written from a later live tree.
- Guide retention can leave repositories on different guide revisions; the result reports the unresolved rows.
- Git blob verification proves tree consistency, not authorization of the branch change.
- A live path addition waits for a release because atomic fallback requires a distributed counterpart.
- Expanding the guide floor increases the tarball size.
- A process terminated during `WriteTransaction.commit()` can still leave the target mixed; this campaign does not add journaling.