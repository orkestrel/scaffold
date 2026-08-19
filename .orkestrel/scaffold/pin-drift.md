# The self-pin drift in the published 0.0.42

## What happened

The 0.0.42 release moved `package.json` to `0.0.42` and did not move the self-pin in
`src/core/constants.ts`. The test that binds them failed, so `main` was red from that release until
this repair. Verified pre-existing: the release commit touched `package.json`,
`package-lock.json`, and `tests/config.test.ts`, never `constants.ts`, and the failure reproduces
with the repair stashed.

`@orkestrel/test` had drifted the other way and nothing guarded it. The manifest installed `^0.0.7`
while `BASE_DEV_DEPENDENCIES` handed targets `^0.0.6`.

Confirmed against the published artifact rather than the source:

```text
$ node -e "…require('@orkestrel/scaffold/dist/src/core/index.cjs').BASE_DEV_DEPENDENCIES…"
   @orkestrel/guide = ^0.0.12
   @orkestrel/scaffold = ^0.0.41
   @orkestrel/test = ^0.0.6
```

## What it actually reaches, and what it does not

Do not overstate this. `BASE_DEV_DEPENDENCIES` reaches a target through `#dependencyQuestion` in
`src/bin/CLI.ts`, which filters the planned set to names the manifest does **not** already declare:

```text
const missing = Object.entries(blueprintToDevDependencies(blueprint))
    .filter(([name]) => !Object.hasOwn(dependencies, name) && !Object.hasOwn(development, name))
```

So an existing target that already declares `@orkestrel/scaffold` keeps its own pin. The stale value
is only ever offered for a name that is absent.

The re-pinning a target does receive comes from the registry instead, not from this set. Measured: a
throwaway copy pinned at `^0.0.41` with scaffold 0.0.41 installed ran `scaffold overwrite` and came
out at `^0.0.42` and `^0.0.7` — values `BASE_DEV_DEPENDENCIES` did not carry.

The real reach is therefore a workspace created fresh with 0.0.42, and any target missing the pin
entirely. Both get one version behind, and both self-correct at the next registry-reading verb.

## What still needs doing

The source is repaired and `main` is green at 959 tests. The published 0.0.42 tarball still carries
the stale values, so correcting what consumers install needs a release. That decision and its
credential belong to the user.

## The guard that was missing

Only the self-pin was tested. Nothing compared the rest of the fleet set against what scaffold
installs itself, which is why the `@orkestrel/test` drift was silent. A new assertion closes that,
and it failed before the fix naming the exact drift:

```text
- hands every fleet package the version it installs itself
+   "@orkestrel/test: base ^0.0.6, manifest ^0.0.7"
```

The self-pin stays exempt from it, because a manifest carries its own version as a bare version
rather than as a dependency of itself.

## The rest of the wave is clean

Every published manifest in the republish wave was read from the registry and every `@orkestrel`
runtime range compared against what the registry serves now. Zero drift across all eight:

```text
@orkestrel/scaffold@0.0.42    console ^0.0.8, contract ^0.0.12, emitter ^0.0.7, markdown ^0.0.9, template ^0.0.4
@orkestrel/test@0.0.7         (no runtime dependencies)
@orkestrel/database@0.0.11    contract ^0.0.12, emitter ^0.0.7, indexeddb ^0.0.8, sqlite ^0.0.8
@orkestrel/server@0.0.14      abort ^0.0.7, contract ^0.0.12, emitter ^0.0.7, router ^0.0.10, timeout ^0.0.7
@orkestrel/sea@0.0.8          contract ^0.0.12, emitter ^0.0.7
@orkestrel/terminal@0.0.11    console ^0.0.8, contract ^0.0.12, database ^0.0.11, emitter ^0.0.7, form ^0.0.2, sse ^0.0.5
@orkestrel/middleware@0.0.16  abort ^0.0.7, budget ^0.0.7, contract ^0.0.12, timeout ^0.0.7
@orkestrel/mcp@0.0.18         contract ^0.0.12, emitter ^0.0.7, sse ^0.0.5, tool ^0.0.11, websocket ^0.0.9
```

Layer order held too: `terminal@0.0.11` names `database ^0.0.11`, the version published in the same
wave, so the dependent went out after its dependency rather than beside it.

That is what makes the self-pin the wave's only defect, and it explains why nothing caught it. Every
check that guards this fleet reads the manifest's dependency ranges. `BASE_DEV_DEPENDENCIES` is not
one of them — it is source data that scaffold hands to other repositories, so it drifts in a place no
dependency audit looks.
