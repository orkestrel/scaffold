# Verify report — U3-fix-2 (scaffold), the whole U3 change

## 1. `node node_modules/typescript/bin/tsc --version`
Exit: 0
```
Version 6.0.3
```

## 2. `npm run format:check`
Exit: 0
```
> @orkestrel/scaffold@0.0.63 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 6163ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`
Exit: 0
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

## 4. `npm run check`
Exit: 0
```
> @orkestrel/scaffold@0.0.63 check
> tsc --noEmit --project tsconfig.json && npm run check:src

> @orkestrel/scaffold@0.0.63 check:src
> npm run check:src:core && npm run check:src:server && npm run check:src:bin

> @orkestrel/scaffold@0.0.63 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/scaffold@0.0.63 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json

> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```

## 5. `npm run build`
Exit: 0. The `build:inventory` step regenerated `host.json` as expected.
```
build-host: staged 121 file(s) into dist/host

> @orkestrel/scaffold@0.0.63 build:inventory
> node -e "import('./dist/src/server/index.js').then((m)=>{const p=process.argv[1]??'host.json',n=m.stageInventory(process.cwd(),p).entries.length;console.log('build-inventory: staged '+n+' file(s) into '+p)})"

build-inventory: staged 121 file(s) into host.json
```

## 6. `npm test`
Exit: 0. Every project passed; no red row, so no re-run was needed.
```
 Test Files  3 passed (3)
      Tests  245 passed (245)
   Duration  10.77s

 Test Files  1 passed (1)
      Tests  77 passed (77)
   Duration  729ms

 Test Files  1 passed (1)
      Tests  111 passed | 1 skipped (112)
   Duration  4.05s

 Test Files  2 passed (2)
      Tests  70 passed (70)
   Duration  1.08s

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Duration  2.77s
```

## 7. `cmp dist/src/server/index.d.ts .../ts6/u1/scaffold-server/rollup.d.ts`
Exit: 0 — byte-identical. Does not decide the gate line.

## 8. `diff dist/src/core/index.d.ts .../ts6/u1/scaffold-core/rollup.d.ts`
Exit: 1 (expected, non-red). Does not decide the gate line.

Hunk 1 (lines 1246,1248c1246,1248): the current build's (`<`) `configs/src/vite.*.config.ts` sample text uses `declarationRollup` from `../helpers.js` for `core`, `browser`, and `server`, each calling `declarationRollup({...})` with a `rewrite: rewriteCoreSpecifier` option (for `browser`/`server`) or a `types: ['node']` option (for `core`). U1's baseline (`>`) instead imports `dts` from `vite-plugin-dts` directly and configures it with `bundleTypes` (a boolean or an `extractorConfig` object) and, for `browser`/`server`, a `beforeWriteFile` callback containing a literal `{{replacement}}` placeholder token.

Hunk 2 (line 2632a2633,2662): the current build (`<` side, i.e. nothing) has no corresponding declaration. U1's baseline (`>`) adds a documented `nameToRewrite(name: string): string` function declaration with full TSDoc (`@param`, `@returns`, `@remarks`, `@example`), describing how it derives the `{{replacement}}` substitution text for a workspace's `beforeWriteFile` branch.

## 9. `ls "$(node -p 'require("node:os").tmpdir()')" | grep -c "orkestrel-declarations-"`
Reading: `0` (expected). Does not decide the gate line.

## 10. `git status --short`
Working tree carries the modifications and untracked campaign artifacts for U3/U7 (edits in `configs/`, `src/core/`, `tests/`, `guides/scaffold.md`, `host.json`, `.claude/rules/workspace.md`, and numerous untracked `.orkestrel/campaign/ts6-api/*` files). No cleanup performed; nothing discarded.

## Anomalies
None. No flake, no re-run needed, no cache weirdness observed.

GATES: GREEN
