## M1

Chosen predicate: a CommonJS entry’s selected Node path must traverse an explicit `require` condition. A resolving `default` branch is insufficient because TypeScript still treats that package as ESM-only.

Indexeddb selector readings:

```text
before: {"commonjs":true,"control":true}
after:  {"commonjs":false,"control":true}
```

The dual-entry control remained `true`.

Regression firing control:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose \
  --project src:core tests/src/core/templates.test.ts \
  -t "selects dual entries and excludes ESM-only entries from CommonJS compile probes"

exit 1
Received: [true, false, ["./dual", "./module"]]
Expected: [true, false, ["./dual"]]
```

After restoring the predicate:

```text
exit 0
Tests  1 passed | 21 skipped
```

The emitted-classifier slice also exited `0`, including dual declarations, runtime conditions, fallback targets, and the CommonJS selector.

M1 falsifies this `guides/scaffold.md` sentence:

> A subpath whose Vite resolution lands under `dist/src/browser/` is driven in a real browser and the Node drives retire for it; every other subpath is imported where the ESM set resolves a target and required where the CommonJS set resolves one.

## M2

The release-skew assertion runs an in-process offline `CLI` audit over a temporary target. The planned setup seed produces no `setup` question. A retained seed from another release produces the uncovered `tests/setupGlobal.ts` question.

Its firing control changed the planned seed to the retained seed:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose \
  --project guides tests/guides.test.ts \
  -t "reports a retained setup seed when the planned release seed differs"

exit 1
Received: []
Expected: [{ field: "setup", ... }]
```

The fallback-target assertion extracts the emitted proof’s real classifier declarations with TypeScript, transpiles them, and executes them in a VM. It covers paths outside the package and `.`, `..`, and `node_modules` segments. Fallback members are skipped and omitted from collection; standalone targets remain resolved and collected.

Its firing control removed package-target validation from fallback resolution:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose \
  --project guides tests/guides.test.ts \
  -t "skips rejected package targets only while traversing fallback lists"

exit 1
Received fallback targets: "../outside.cjs", "./x/./outside.cjs",
"./x/../outside.cjs", "./x/node_modules/outside.cjs"
Expected: "./valid.cjs"
```

After restoring the controls:

```text
npm run test:guides
exit 0
Tests  16 passed
```

## Acceptance evidence

```text
npx oxlint --config .oxlintrc.json --deny-warnings <owned files>
exit 0

npx oxfmt --config .oxfmtrc.json --check <owned files>
exit 0

npm run check
exit 0

npm run test:guides
exit 0
```

The full `src:core` templates project did not close inside this sandbox:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot \
  --project src:core tests/src/core/templates.test.ts

exit 1
Error: spawnSync /opt/node22/bin/node EPERM
```

The formatter fixed-point, emitted typecheck, and browser-resolver cases hit that grandchild-process denial. The in-process emitted-classifier slice exited `0`. Settle the full reading with the same command on the host.

The regenerated indexeddb distribution proof passed `oxfmt --check`, but its release drive could not reach the registry:

```text
npx vitest run --config vite.config.ts --configLoader runner --no-cache \
  --reporter=verbose --project distribution --mode release

exit 1
Error: The release gate requires a reachable npm registry, and npm ping did not answer
```

Settle indexeddb end to end on the host after regeneration:

```text
cd /home/user/orkestrel/indexeddb
npm run test:distribution -- --mode release
```

The formal proof receipt was unavailable:

```text
MCP tool call requires approval, but approval policy is never
```

All `tmp/fix-m/` probes and the staged indexeddb copy were removed.

Weak claim: explicit `require` is a declaration-of-support predicate. It intentionally does not infer CommonJS support from a bare `.cjs` target; the brief’s fleet evidence says no affected subpath depends on that inference.
---

## Orchestrator's integration note

The unit's sandbox again blocked the readings that matter, and again it reported them rather than
ruling. Both settled on the host.

**Full templates project:**

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/templates.test.ts
 Test Files  1 passed (1)
      Tests  22 passed (22)
exit: 0
```

**Gate chain:** `format:check`, `lint:check`, `check`, `test:guides` all exit 0.

**The reading this unit exists for.** The end-to-end run that found the defect reported
`1 failed | 5 passed | 2 skipped`. After M1, against a proof regenerated from the rebuilt candidate
and installed into the real target:

```text
1 written, 121 unchanged, 0 removed in /home/user/orkestrel/indexeddb.
 Test Files  1 passed (1)
      Tests  6 passed | 2 skipped (8)
exit: 0
```

The previously failing case now passes. This is the first time the repaired proof has run green end
to end in a real target.

## The unit's flagged weak claim, bounded

It flagged this itself: the predicate requires an explicit `require` condition and deliberately does
not infer CommonJS support from a bare `.cjs` target. So a package publishing
`{".": "./index.cjs"}` as a bare string would be excluded from the CommonJS compile probe despite
being consumable from CommonJS.

That is a false negative — missing coverage — rather than the false red it replaced, so it fails
quiet. Swept across every fleet manifest: no subpath anywhere uses a bare-string exports entry, so it
reaches nothing today. Recorded as a roadmap row rather than fixed here, because closing it means
inferring format from the target's extension and the package's `type`, which is a wider change than
this unit owns.
