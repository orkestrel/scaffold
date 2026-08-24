## SD3 report

Baseline: `85f8df3`

Packing test: `rebuilds publishing workspaces before packing`.

It derives `publishes` from `private !== true` and asserts:

```ts
expect(prepack).toBe(publishes ? 'npm run build' : undefined)
```

The inline throwing control overwrites `prepack` with `npm run control` in a copied script record and expects the same assertion to throw.

The sentinel test, `keeps Vitest invocation fields out of project configurations`, invokes every project factory through `Reflect.apply` with sentinel environment fields. It asserts that none enter the returned configuration. A named control factory returns the sentinel fields and proves the loop throws.

The compiler pin already contained `expect(published.prepack).toBe('npm run build')` at baseline, so `tests/src/core/compilers.test.ts` required no edit.

### Control record

Command:

```text
npm run test:config -- -t "rebuilds publishing workspaces before packing"
```

Red:

```text
Test Files  1 failed (1)
Tests       1 failed | 45 skipped (46)
Expected: "npm run build"
Received: "npm run control"
```

Green, using the same command:

```text
Test Files  1 passed (1)
Tests       1 passed | 45 skipped (46)
```

### Guide sentence

Before:

> A publishing manifest carries `"prepack": "npm run build"` so a publish rebuilds `dist/` and cannot ship a stale artifact; the hook is publish-time only...

After:

> In publishing workspaces, the emitted `prepack` script runs `npm run build` so a publish rebuilds `dist/` and cannot ship a stale artifact; the hook is publish-time only...

### Gate tails

```text
oxfmt: All matched files use the correct format.
oxlint: exit 0
check:src:core: exit 0
focused config proof: 2 passed | 44 skipped (46)
focused compiler proof: 1 passed | 359 skipped (360)
git diff --check: exit 0
build:inventory: staged 108 file(s) into host.json
```

Full `npm run test:config` host observation:

```text
Tests  2 failed | 44 passed (46)
spawnSync /opt/node22/bin/node EPERM
```

The other failure observed the expected pre-generator inventory drift in `guides/scaffold.md` and `tests/config.test.ts`; the required final `build:inventory` run regenerated those digests. The proof MCP also could not start because its call required approval while the approval policy was `never`.

### Diff stat

```text
 guides/scaffold.md   |  6 +++---
 host.json            |  6 +++---
 tests/config.test.ts | 57 ++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 63 insertions(+), 6 deletions(-)
```

### Status

```text
 M guides/scaffold.md
 M host.json
 M tests/config.test.ts
```

Deviations: none.