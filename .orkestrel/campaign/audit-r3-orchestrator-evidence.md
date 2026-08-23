# Round 3 — evidence the Orchestrator took, not a lane

Everything here was run by the Orchestrator, on the host, and is supplied to the round rather than
derived by it. Dated 2026-08-23.

## The two reds the concurrent sweep produced were load artifacts

Both re-ran alone after every slice exited, per `.agents/orchestration.md` § Writing concurrency.

`@orkestrel/process`, `tests/src/server/execution/executeSync.test.ts`, scoped to the one file:

```text
=== process: executeSync alone ===
 Test Files  1 passed (1)
      Tests  13 passed (13)
```

Under the sweep it had failed one assertion — a 6000ms grandchild-readiness deadline missed by
5.7ms, with two gate slices running on a 4-CPU container. The file is the target's own, not a
scaffold-generated proof.

`supervisor`, `tests/app/browser/setupPortfolio.test.ts`, scoped to the one file:

```text
=== supervisor: setupPortfolio alone ===
 Test Files  1 passed (1)
      Tests  37 passed (37)
```

Under the sweep it had reported one capture artifact registered but hollow
(`choice-narrow-light.png`), which is a browser capture that lost its write to contention. Scaffold
wrote nothing into `supervisor` at all — its `overwrite` was refused for the pre-existing
configs-group reason — so no reading in that checkout can be the candidate's.

Both reds were contention. The re-propagation is clean across the fleet.

## C1's remaining unknown, swept

The question the brief left open: does any published `exports` target in the fleet carry an
extension `isModule` now classifies as an asset, or no extension at all? Swept across every
`package.json` in `/home/user/orkestrel/*` plus `/home/user/supervisor` and `/home/user/scaffold`,
walking condition objects and fallback arrays. Instrument:
`scratchpad/audit/r3/sweep-targets.mjs`.

Result: every target resolves to `.js`, `.mjs`, `.cjs`, `.d.ts`, `.d.cts`, or `.d.mts`, except one
shape that every package shares — `"./package.json": "./package.json"`.

Two readings follow, and they point opposite ways:

- **The `.json` classification is right.** `isModule('./package.json')` is `false`, so the subpath
  partitions to `excluded` rather than `undeclared`, which is what the code comment claims for it.
  No package ships a declaration for its own manifest, so demanding one would be a false red.
- **The extensionless branch has no live case.** `dot === -1` returning `true` is exercised by
  nothing in the fleet, so no published target has ever taken it.

**Correction, made after an independent refuter ran it.** This section first argued that the
extensionless branch rests on a reason holding for the CommonJS loader and not the ES module one,
because the ESM loader rejects an unknown extension. **That is wrong, and it was the Orchestrator's
own unverified reasoning rather than a measurement.** Node resolves an extensionless file's format
through `ESM_FILE_FORMAT`, which reads the nearest `package.json` `type` field: `module` loads it as
an ES module and an absent or `commonjs` value loads it as CommonJS. A refuter built both fixtures
and drove each through a real specifier from a consumer with the package in `node_modules`. No run
produced `ERR_UNKNOWN_FILE_EXTENSION`. This package declares `engines.node` `>=22.12.0` and the
reading was taken on `v22.22.2`.

So the extensionless branch is correct under both module systems, the guide sentence describing it
is true, and the emitted proof's ESM drive over such a target succeeds rather than asserting
something false. The claim is withdrawn.

The lesson is the one `.agents/orchestration.md` already states: an unverified belief the
Orchestrator states becomes a fact for every unit downstream. This one entered the record as
"recorded, not asserted" and would still have shaped the fix round had a refuter not run it.

## Probe readings already carried in the brief

- `oxfmt` leaves `export function setup(): void {}\n` byte-identical, so C5's formatter vector does
  not fire.
- A Vitest `projects` function entry is called with
  `{"command":"serve","mode":"test","isPreview":false,"isSsrBuild":false}`.

## C7 settled: the environment outranks a project `.npmrc`

The subjective lane returned C7 `UNRESOLVED` because it has no Bash and the brief required npm's
config precedence to be verified rather than assumed. The Orchestrator ran it. Instrument:
`scratchpad/audit/r3/npmrc2/probe.sh`.

The first attempt read `false` for both keys with no environment override, which is the control
failing rather than an answer: `npm` treats a directory as a project only when a manifest is present,
so the `.npmrc` was not being read at all. With `package.json` added the control binds, and
`npm config list` names the file it read:

```text
; "project" config from .../npmrc2/.npmrc
legacy-peer-deps = true
strict-peer-deps = true
```

The readings:

```text
--- control: does the project .npmrc read at all? (expect true) ---
  legacy-peer-deps = true
  strict-peer-deps = true
--- with the environment pin the proof uses (expect false if env outranks) ---
  legacy-peer-deps = false
  strict-peer-deps = false
```

So a spawned `npm` takes the environment over a project `.npmrc` for both keys. FIX-H's pinning
premise holds, and the comment stating it is true.

## Two sub-claims of C9 closed by direct reading

- **`host.json` carries the rewritten guide.** `sha256sum guides/scaffold.md` and the inventory's
  entry for that destination are both
  `c5fd8d870642e5400f560daf9fff67e2b78bc3036cc5e06d40369ec6af7cedb3`. No drift.
- **`isModule('./x.d.mts')` returns `false`, not `true`.** The lane's `.d.mts` sub-finding rests on
  reading `.mts` as a member of `MODULE_EXTENSIONS`; the member is `.mjs`. Run:

```text
  ./x.d.ts           -> isModule false
  ./x.d.cts          -> isModule false
  ./x.d.mts          -> isModule false
  ./x.mjs            -> isModule true
  ./x.node           -> isModule false
  ./x.json           -> isModule false
  ./x.wasm           -> isModule false
  ./dist/feature     -> isModule true
  ./LICENSE          -> isModule true
```

The declaration set and the runtime-target test are disjoint, which is what the guide claims. The
sub-finding is refuted on `diagnosis-wrong`.

## C5's release-boundary vector is not open on this release

`git diff` across the version's whole range over `src/core/templates.ts`, filtered to the setup and
global seed literals, returns nothing: no `tests/setup*.ts` seed moved in 0.0.50. So whatever the
mechanism permits, it does not fire on this publish.
