# Design report: the subjective lane (Claude Opus 5, read-only)

## The strategy, stated once

**Every remote surface reads its live source first and falls back, whole, to the copy the
installed package distributes; each operation reports one baseline word per surface.**

One corollary makes every verb predictable without a table: **a surface falls back only
where the package actually distributes a copy. Where it distributes none, the surface
refuses.** Version floors ship inside the compiled templates, scaffold's own guides and
the vendored file set ship inside `dist/host`, and the registry's organization membership
ships nowhere — so the first three soften and the last stays hard.

Two words carry the axis, and both already exist in this repository's vocabulary:

- **`live`** — what the source serves at read time: the registry packument, or the
  package's own GitHub repository at a branch.
- **`floor`** — what the installed release distributes. `guides/scaffold.md` § Dependency
  floors already calls the released version ranges "floors"; this generalizes that word.

The brief's premise needs one correction: **no surface implements live-then-distributed
today, and the version surface does not either.** `BASE_DEV_DEPENDENCIES`
(`src/core/constants.ts:393`) is a generation-time seed consumed by the compiler; `#pin`
(`src/bin/CLI.ts:581-596`) refuses any non-`found` verdict, so `new`, `repair`, and
`catalog` throw `FETCH` and write nothing. Aligning means all three surfaces adopt one
new rule, and the version surface changes with them. That change closes a live
documentation defect: `guides/scaffold.md:898-901` states a workspace generated with no
network still receives the latest floor scaffold knew — false today, offline `new`
throws; ruling 4 makes it true.

## Ruling 1 — per-surface policy over one shared reader

`Upstream` is "the package's only network reader, and it never writes"
(`src/server/Upstream.ts:36-37`) and touches no filesystem. `Materializer` is the only
reader of the vendored root. Putting the fallback inside `Upstream` would give the
package a second reader of `dist/host`, a second manifest parse, and a second
reconciliation that can disagree with the first. So `Upstream` gains one verb that
fetches live host bytes and never falls back; the baseline choice is one line in the
verb: `new Materializer({ host: live ?? command.from })`. The framing: **the live host is
a `--from` that lives in memory** — a caller-supplied host value is exactly as trusted as
a caller-supplied host path.

## Ruling 2 — the host fetch mechanism

**Fetch a committed inventory from the repository first, then fetch by raw only the paths
whose live digest differs from the target's own bytes. The installed floor's manifest is
the membership authority. If the inventory produces no answer, the host surface is
`floor`.**

| Option | Cost | Verdict |
| --- | --- | --- |
| Per-file raw over the whole set | One request per vendored path on every verb; a multi-second, high-request-count `audit` repeated across a fleet from one CI address | Refused as the steady state |
| `api.github.com` `git/trees?recursive=1` | One request, never stale, sees added paths. But a second endpoint host on a 60-per-hour unauthenticated per-address budget — CI behind one address is where that budget dies and where this must work; a second hash algorithm (git blob SHA-1); a foreign JSON contract with a `truncated` flag; a two-base option group | Refused; named in Alternatives |
| Codeload tarball | One request, but gzip plus a tar parser written from nothing, carrying path-traversal handling this package would then own | Refused |
| **Committed inventory, raw blobs** | One endpoint host, one hash algorithm the package already uses (SHA-256: `computeDigest`, `computeFileDigest`, `computeManifestDigest`, `DIGEST_PATTERN`), one branch setting, one option group. Costs a generated file committed at the repository root and a regeneration obligation, closed by a gate | **Recommended** |

Steady state for an aligned target: one request. For a target one rules-edit behind: two.

**Which inventory drives the fetch.** The installed floor's manifest supplies membership,
roots, and executable flags. The live inventory supplies digests only. A path added
upstream is invisible until the next release — a feature: membership decides which paths
a target owns, which decides `overwrite`'s deletion candidates and `audit`'s foreign
set. Letting membership move without a release would let an unreleased commit create or
delete files in every target. **A live inventory cannot introduce a path, because the
path list comes from the release.** The user's goal survives: a rules TEXT change
propagates without a release; adding a rule FILE is membership and deserves the release
it already gets. A floor path the live inventory omits (an upstream deletion) makes that
row `missing`, which demotes the whole surface to `floor`; operationally, remove a
vendored path in the same change that ships the release.

`guides/*.md` stay out of the host fetch: `Materializer.#deferred`
(`src/server/Materializer.ts:679-681`) already carves them out of host hydration because
`mirror` owns those bytes.

## Ruling 3 — baseline atomicity

**All-or-nothing per surface per operation. No mixed baseline exists.** If any requested
path's live answer is not `found` — a fetch fault, a 404, a digest mismatch, a body over
the artifact ceiling, an inventory that will not parse — the whole host surface is
`floor` and nothing fetched is used. Reasons: `audit` against a chimera baseline has no
referent; `overwrite` deletes from membership, and mixed membership means mixed deletion
candidates; the report names the baseline in one word. Mechanism: `copiesToHost` answers
`undefined` when any requested row is not `found` — one testable leaf, reusing the
discipline `#assertFetched` (`src/bin/CLI.ts:567-578`) applies to the catalog
transaction. `provenance` on each verb result names the baseline; nothing else records
one — a per-row label under an all-or-nothing rule is a second copy of a fact the surface
already holds (derive-state law).

## Ruling 4 — per-verb semantics

Two rules generate the table: a surface falls back only where the package distributes a
copy; **a floor baseline the network forced is drift, and a floor baseline the operator
asked for is not.**

| Verb | Live | Floor forced | With `--offline` |
| --- | --- | --- | --- |
| `new` | Registry pins, host from `main` | Floor ranges written, host from `dist/host`, warning names both, exit `0` | Same bytes, no warning, exit `0` |
| `audit` | Registry releases, host from `main` | Compares against `dist/host`, `provenance.host` is `floor`, exit `1` | Compares against `dist/host`, exit answers drift alone |
| `repair` | Registry pins, host from `main` | Repairs from `dist/host`, floor ranges written, exit `1` | Same bytes, exit answers drift alone |
| `catalog` | Organization list, packuments, guide mirrors | No distributed copy of membership: `FETCH`, nothing written, exit `1` | Refused as a usage error |
| `overwrite` | Everything `repair` and `catalog` read | Offline half stands; the network half's `note` names the step, exit `1` | Runs the offline half and host from `dist/host`; the catalog half refused as for `catalog` |

`new` is the one verb whose exit code answers "was the workspace created", not "is this
target current", so a floor baseline does not raise it. The hard `FETCH` refusal softens
for `new` and `repair` — the floor ranges are bytes scaffold deliberately shipped and
documented as the offline product; what the refusal protected is preserved by the exit
code, and `--offline` is the explicit waiver. For `catalog` it stays: a stale package
table written as current is the fabrication the refusal exists to prevent. The guide
transaction splits: `#assertFetched` keeps its refusal over `entries`; it drops it over
`mirrors`, because each mirror is an independent file with its own precondition and
`Materializer.mirror` already skips a non-`found` row and keeps the target's existing
copy (`src/server/Materializer.ts:301-304`) — a foreign guide's floor is the target's own
previous mirror. This per-row softening is the one deliberate deviation from ruling 3.

## Ruling 5 — the contract (verbatim declarations)

```ts
export type Baseline = 'live' | 'floor'

export interface Provenance {
	readonly versions?: Baseline
	readonly guides?: Baseline
	readonly host?: Baseline
}

export type Copy =
	| {
			readonly path: string
			readonly lookup: 'found'
			readonly content: string
			readonly observed?: string
			readonly note?: never
	  }
	| {
			readonly path: string
			readonly lookup: 'missing' | 'failed'
			readonly note: string
			readonly observed?: string
			readonly content?: never
	  }

export const HOST_INVENTORY_PATH = 'host.json'

export interface ManifestEntry {
	readonly storage: string
	readonly destination: string
	readonly executable: boolean
	readonly digest: string
}

export interface Host {
	readonly manifest: HostManifest
	readonly bytes: Snapshot
}

export interface MaterializerOptions {
	readonly host?: string | Host
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

export interface UpstreamOptions {
	readonly registry?: {
		readonly base?: string
		readonly timeout?: number
	}
	readonly repository?: {
		readonly base?: string
		readonly branch?: string
		readonly timeout?: number
	}
	readonly concurrency?: number
	readonly retries?: number
	readonly limit?: number
	readonly budget?: number
	readonly on?: EmitterHooks<UpstreamEventMap>
	readonly error?: EmitterErrorHandler
}

// On UpstreamInterface:
vendor(paths: readonly string[], current: Snapshot): Promise<readonly Copy[]>

export type UpstreamEventMap = {
	readonly release: readonly [release: Release]
	readonly mirror: readonly [mirror: Mirror]
	readonly copy: readonly [copy: Copy]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

export function hexToDigest(hex: string): string
export function copiesToHost(
	copies: readonly Copy[],
	manifest: HostManifest,
): Host | undefined
export function stageInventory(checkout: string, path: string): HostManifest
export function environmentToUpstream(
	environment: Readonly<Record<string, string | undefined>>,
): UpstreamOptions | undefined
```

Each verb result gains `readonly provenance: Provenance`. The `guides` option group is
renamed `repository` (one raw content host serves guides and vendored files).
Environment: `ORKESTREL_SCAFFOLD_REGISTRY` keeps its meaning;
`ORKESTREL_SCAFFOLD_REPOSITORY` overrides the repository base; no third variable. Branch
stays a library option — a `--branch` flag invites repairing a target from an unreviewed
branch. One new flag: `--offline` on `new`, `audit`, `repair`, and `overwrite`;
`catalog --offline` is a usage error. `Copy` fetched-path equals target-relative path, so
the file fetched and the file answered for cannot drift.

## Ruling 6 — guides efficiency

Keep one bounded request per package, pool 6. No conditional requests and no digest
index: `If-None-Match` needs a stored validator — the cache the design laws forbid. Each
guide lives in a different repository, so no shared inventory can make one request answer
for the set. `Materializer.mirror` already skips the write when bytes match. The honest
gain — not fetching guides for verbs that do not need them — already holds.

## Ruling 7 — trust and integrity

- Transport floor unchanged: HTTPS or loopback, unauthenticated, `redirect: 'manual'`,
  per-response `limit`, per-call `budget`, per-request timeout, abort on teardown.
- Integrity added: every fetched file's bytes verified against the digest the live
  inventory declared; the inventory's membership digest verified with
  `computeManifestDigest`. A mismatch fails the row; ruling 3 demotes the surface. This
  is integrity, not authenticity — an attacker who can serve the files can serve a
  matching inventory; say so in the guide.
- Containment, free: membership comes from the release, so a live inventory naming a
  path outside the vendored set introduces nothing.
- Authenticity refused: a signature scheme with no key management is theatre; record the
  obligation on the interface.
- The real residual, named: fetched bytes govern agent behaviour in targets, and
  `.claude/settings.json` is content-owned, so a live read moves permission defaults
  with no release gate. Do not exclude it — excluded paths would give the two baselines
  different membership. Mitigations: `audit` previews what the live baseline would
  change; `--offline` pins to released bytes; `.claude/settings.local.json` stays
  outside `HOST_PATHS` and `matchesSensitivePath` (`guides/scaffold.md:967-972`).

Refusing a suspicious response looks like every other refusal: the row becomes `failed`
with a note naming the cause, the surface demotes to `floor`, the exit code rises.

## Ruling 8 — release note

- `repair`, `overwrite`, and `new` write vendored files fetched from the repository at
  `main` when reachable, from the installed `dist/host` when not; `audit` compares
  against the same baseline it would write.
- Each verb's JSON result carries `provenance`.
- `new` and `repair` no longer refuse when the registry is unreachable: floor ranges,
  raised exit. `catalog` still refuses.
- `--offline` takes the floor deliberately and does not raise the exit code.
- `UpstreamOptions.guides` renamed `repository`; `ORKESTREL_SCAFFOLD_REPOSITORY`.
- `ManifestEntry` carries `digest`; a host root staged by an earlier release is refused.
- Endpoints named: `registry.npmjs.org`, `raw.githubusercontent.com`.

## Alternatives

**A. Git trees API as the inventory** — one request, never stale, sees added paths;
refused on the unauthenticated per-address REST budget in CI, the second hash algorithm,
and the foreign JSON contract. If the budget is shown not to bind, this flips.

**B. Widen `Mirror` instead of adding `Copy`** — saves a type; refused on meaning: a
mirror is a copy of another package's guide, a vendored file is the canonical file
itself, and host bytes must flow through plan hydration (ownership, executable bit,
roots, deletion set), never through `Materializer.mirror`.

## Units

Routing: U2, U3, U4 run loopback fixtures — native implementer only. U1 is bench-safe.

- **U1 — inventory digests and the committed inventory** (Sol, bench-safe). Owns
  `ManifestEntry.digest`, `hexToDigest`, `stageInventory`, `stageHost` digest emission,
  `isManifestEntry`, `package.json` scripts, committed `host.json`, helpers tests,
  `tests/conformance.test.ts`, guide rows. Acceptance: per-entry digest equals
  `computeFileDigest`; membership digest moves when one entry digest moves (negative
  control); the conformance case fails when vendored bytes move without regeneration and
  passes after (mutation probe); scoped gates green.
- **U2 — the live reader** (Opus, native). Owns `Copy`, `HOST_INVENTORY_PATH`,
  `UpstreamOptions.repository`, `vendor`, `UpstreamEventMap.copy`, `Upstream.ts`,
  fixture routes plus request recorder, Upstream tests, guide rows. Acceptance: rows in
  input order; aligned target = one request (recorder-proved); one changed path = one
  further request; absent-from-live = `missing`; unreachable inventory fails every row;
  over-`limit` body fails its row; the rename leaves no `guides` option reference;
  suite green.
- **U3 — the value host** (Opus, native). Owns `Host`, the options union,
  `copiesToHost`, `Materializer.ts`, validators, Materializer tests, guide rows.
  Acceptance: value host hydrates identically to a staged root of the same bytes, with
  a one-byte negative control reporting `stale` on exactly that path; digest-uncovered,
  missing-bytes, and mismatched `Host` refuse `TARGET`; `copiesToHost` answers
  `undefined` on any non-`found` row and on an undeclared path; suite green.
- **U4 — the verbs** (Opus, native). Owns the CLI, `provenance`, `--offline`,
  `environmentToUpstream`, exit rules, bin tests. Acceptance: per verb, one
  live-endpoint and one dark-endpoint loopback run asserting written paths,
  `provenance`, exit code, warning line; `new` dark-registry writes floors exit 0;
  `repair` dark-repository writes staged root exit 1; `--offline` same bytes with
  drift-only exit; `catalog` dark writes nothing exit 1; `catalog --offline` usage
  error exit 2; partial-guide catalog writes the table, keeps the target mirror, names
  the skip, exit 1; suite green.
- **U5 — guide and release note** (Opus). Baselines section, verb-reads table, vendored
  data root section, integrity posture, `ROADMAP.md`. Guides suite green; every added
  fence executes.
- **U6 — correctness audit** (Sol): digest chain, atomicity, containment, exit rule.
- **U7 — design-fit audit** (reviewer): naming, one-sentence predictability, guide voice.
- **U8 — gates** (verifier).

## Tensions (for the Orchestrator to rule)

Committed inventory versus trees API; membership floors at the release; whole-surface
demotion on upstream deletion; `Copy` versus widened `Mirror`; `Provenance` versus
`Reading`; the `string | Host` union; the guides per-row softening as the one asymmetry;
`new`'s exit-code exception; `--branch` refused; `ManifestEntry.digest` breaking the
staged-host format at `0.0.x`.

## Risks

Stale committed inventory (closed by the mutation-probe-proved conformance gate); CI
request volume (recorder-measured); live bytes governing agent behaviour with no release
gate (accepted, mitigated); raw-host propagation lag (documented); non-UTF-8 vendored
file can never come live (fixture-proved demotion); one-time CRLF convergence for
pre-`.gitattributes` targets (fixture-proved); the rename and the `provenance` JSON
change (grep plus release note; bin tests assert the field).
