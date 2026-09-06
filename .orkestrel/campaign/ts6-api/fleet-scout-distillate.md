I'll scout every checkout under `/home/user/fleet/` read-only and report the package, lockfile, Vite config, proof, importer, setup, and git evidence you listed.Forty-eight package manifests are in view. Next I’ll walk the fleet directories and collect the package, lockfile, Vite, proof, and git evidence in parallel.Manifests look uniform so far. Next I’ll pull names, `files`/`exports`, lockfile hits, Vite dts usage, proof heads, compiler importers, and git state.Lockfiles and Vite configs are consistent so far. I’ll finish exports faces, remaining `dist/src` rows, compiler importers, proof heads, setup files, and git state.Compiler hits landed in tests, not source. I’ll close the remaining exports, peer ranges, extra importers, and git state next.Fleet walk: every immediate checkout under `/home/user/fleet/` (`abort`, `agent`, `brief`, `browser`, `budget`, `codec`, `console`, `contract`, `csv`, `database`, `emitter`, `form`, `guide`, `html`, `indexeddb`, `interpret`, `lsp`, `markdown`, `mcp`, `middleware`, `msg`, `ndjson`, `ollama`, `pool`, `probe`, `process`, `program`, `qualifier`, `queue`, `rater`, `reason`, `relation`, `router`, `sea`, `server`, `sqlite`, `sse`, `table`, `template`, `terminal`, `test`, `timeout`, `tool`, `toolbox`, `websocket`, `worker`, `workflow`, `workspace`). Each directory’s `package.json` `name` is `@orkestrel/<dir>`.

`git status --short` and `git log -1` were refused by this session’s command allowlist. Branch is taken from `.git/HEAD`. Last-commit subject is the first line of `.git/COMMIT_EDITMSG`. Tree cleanliness is unmeasured.

---

## Fleet-wide invariants

**`package.json` (every checkout)**  
- `typescript`: `^6.0.3` (devDependency).  
- `@orkestrel/probe`: `^0.0.12` is **absent** only on `@orkestrel/probe`; present on every other checkout.  
- `vite-plugin-dts`: `^5.1.0` (devDependency).  
- `@microsoft/api-extractor`: `^7.59.0`.  
- `@orkestrel/scaffold`: `^0.0.63`.  
- `@typescript/typescript6`: **absent**.  
- `src` publishes: `files` contains `"dist/src"` on every checkout.  
- `exports` never names `./styles` or `./bin`.  
- `@orkestrel/probe` also has `peerDependencies.typescript` `^6.0.3` (`package.json:118`) with `peerDependenciesMeta.typescript.optional` (`package.json:125`), plus `"bin": { "probe": "dist/bin/main.js" }` (`package.json:21`) and `files` `"dist/bin"` (`package.json:26`).

**`package-lock.json` (every checkout)**  
- `node_modules/vite-plugin-dts` present (one `"node_modules/vite-plugin-dts":` key).  
- `node_modules/@typescript/typescript6`: **no hits**.

**`configs/src/vite.*.config.ts`**  
- `declarationRollup(`: **no hits**.  
- Every `vite.core.config.ts`, `vite.server.config.ts`, and `vite.browser.config.ts` has `import dts from 'vite-plugin-dts'` at line 2 and `dts(` at line 12 (core/server) or line 13 (browser).  
- Only extra config: `probe/configs/src/vite.bin.config.ts` — no `vite-plugin-dts` import, no `dts(`, no `declarationRollup(`.

**`tests/distribution.test.ts`**  
- Present on every checkout.  
- Head imports the `typescript` specifier. **No** `createRequire` hit.

**`src/`, `configs/`, `app/`, `scripts/`**  
- Pattern hits: **none**.  
- `app/`: no files.

**`tests/setupPolicy.ts`**  
- Every checkout: `import * as ts from 'typescript'` at `tests/setupPolicy.ts:12`.

**Git**  
- Every `.git/HEAD`: `ref: refs/heads/claude/orkestrel-npm-audit-deps-14ibta`.

---

## Per checkout

Faces = `exports` keys mapped to `dist/src/{core,server,browser}` (`.` counts as the face its path names). Lock line = first `node_modules/vite-plugin-dts` hit. Proof = quoted import in the first 40 lines. Compiler importers outside the proof = files under `src|tests|configs|app|scripts` with a `typescript` specifier import, excluding `tests/distribution.test.ts`.

### abort `@orkestrel/abort` 0.0.9
1. faces: **core**. dts yes. extractor/scaffold/probe as invariant.  
2. lock `package-lock.json:3204`. typescript6 none.  
3. `vite.core.config.ts` exists — import `vite-plugin-dts` `:2`, `dts(` `:12`.  
4. proof exists: `tests/distribution.test.ts:23` `import ts from 'typescript'`.  
5. `tests/setupPolicy.ts:12` `from 'typescript'`; `tests/distribution.test.ts:23` `from 'typescript'` / `import ts `.  
6. `setupServer.ts` / `setupConformance.ts` absent.  
7. branch `claude/orkestrel-npm-audit-deps-14ibta`. status unmeasured. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### agent `@orkestrel/agent` 0.0.20
Same shape as abort except version. lock `:3249`. Vite: `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### brief `@orkestrel/brief` 0.0.7
faces: **core**. lock `:3230`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### browser `@orkestrel/browser` 0.0.15
faces: **core**, **server** (`./server` at `package.json:42`). lock `:3204`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. `setupConformance.ts` absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### budget `@orkestrel/budget` 0.0.9
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### codec `@orkestrel/codec` 0.0.2
faces: **core**. lock `:3217`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### console `@orkestrel/console` 0.0.12
faces: **core**, **browser** (`package.json:40`), **server** (`package.json:46`). lock `:3359`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `tests/distribution.test.ts:29` `import ts from 'typescript'`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### contract `@orkestrel/contract` 0.0.16
faces: **core**. lock `:3217`. `vite.core.config.ts` `:2`/`:12`. proof `tests/distribution.test.ts:14` `import ts from 'typescript'`. Hits: `tests/setupPolicy.ts:12` `from 'typescript'`; `tests/distribution.test.ts:14`; `tests/setupServer.ts:18` `from 'node:vm'`; `tests/setupServer.test.ts:4` comment `` `node:vm` ``; `tests/setupServer.test.ts:7` `from 'node:vm'`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### csv `@orkestrel/csv` 0.0.6
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### database `@orkestrel/database` 0.0.13
faces: **core**, **browser** (`package.json:39`), **server** (`package.json:45`). lock `:3359`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `:29`. Hits: `tests/setupPolicy.ts:12`; `tests/distribution.test.ts:29`; `tests/setupServer.ts:10` `from 'typescript'`; `tests/setupServer.ts:16` `from 'typescript'`; `tests/setupServer.test.ts:1` `from 'typescript'`; `tests/setupServer.test.ts:10` `from 'typescript'`. `tests/setupServer.ts` exists and names `typescript` at `:10`, `:16`, `:347` (`prefix: 'database-typescript-'`). COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### emitter `@orkestrel/emitter` 0.0.9
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### form `@orkestrel/form` 0.0.5
faces: **core**. lock `:3171`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### guide `@orkestrel/guide` 0.0.17
faces: **core**. lock `:3188`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### html `@orkestrel/html` 0.0.8
faces: **core**. lock `:3219`. `vite.core.config.ts` `:2`/`:12`. proof `tests/distribution.test.ts:14` `import ts from 'typescript'`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### indexeddb `@orkestrel/indexeddb` 0.0.10
faces: **browser** (`.` → `./dist/src/browser/index.js` at `package.json:28–35`; no `./core` / `./server` keys). lock `:3359`. Vite: `vite.browser.config.ts` `:2`/`:13`. proof `:29`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### interpret `@orkestrel/interpret` 0.0.12
faces: **core**. lock `:3218`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### lsp `@orkestrel/lsp` 0.0.6
faces: **core**, **server** (`package.json:40`). lock `:3220`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. Hits: `tests/setupPolicy.ts:12`; `tests/distribution.test.ts:23`; `tests/setupConformance.ts:37` `import ts from 'typescript'`. `tests/setupServer.ts` exists, no `typescript` hit. `tests/setupConformance.ts` exists and names `typescript` at `:37`. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### markdown `@orkestrel/markdown` 0.0.13
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### mcp `@orkestrel/mcp` 0.0.28
faces: **core**, **browser** (`package.json:41`), **server** (`package.json:47`). lock `:4760`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `:29`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. `tests/setupConformance.ts` exists; pattern `typescript` **no hits**. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### middleware `@orkestrel/middleware` 0.0.19
faces: **core**, **server** (`package.json:44`). lock `:3209`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### msg `@orkestrel/msg` 0.0.9
faces: **core**. lock `:3202`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### ndjson `@orkestrel/ndjson` 0.0.9
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### ollama `@orkestrel/ollama` 0.0.14
faces: **server** (`.` → `dist/src/server`). lock `:3291`. Vite: `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### pool `@orkestrel/pool` 0.0.10
faces: **core**. lock `:3203`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### probe `@orkestrel/probe` 0.0.12
faces: **core**, **server** (`package.json:47`). lock `:3189`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`; `vite.bin.config.ts` neither. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Run the type stage's compiler as a process over a mirror of the workspace`.

### process `@orkestrel/process` 0.0.10
faces: **core**, **server** (`package.json:40`). lock `:3219`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### program `@orkestrel/program` 0.0.12
faces: **core**. lock `:3248`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### qualifier `@orkestrel/qualifier` 0.0.13
faces: **core**. lock `:3218`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### queue `@orkestrel/queue` 0.0.12
faces: **core**. lock `:3202`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### rater `@orkestrel/rater` 0.0.13
faces: **core**. lock `:3218`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### reason `@orkestrel/reason` 0.0.9
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### relation `@orkestrel/relation` 0.0.11
faces: **core**. lock `:3202`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### router `@orkestrel/router` 0.0.13
faces: **core**, **browser** (`package.json:39`), **server** (`package.json:45`). lock `:3359`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `:29`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### sea `@orkestrel/sea` 0.0.14
faces: **server**. lock `:3204`. Vite: `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### server `@orkestrel/server` 0.0.18
faces: **server**. lock `:3203`. Vite: `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### sqlite `@orkestrel/sqlite` 0.0.10
faces: **server**. lock `:3204`. Vite: `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### sse `@orkestrel/sse` 0.0.6
faces: **core**. lock `:3203`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### table `@orkestrel/table` 0.0.4
faces: **core**. lock `:3219`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### template `@orkestrel/template` 0.0.6
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### terminal `@orkestrel/terminal` 0.0.14
faces: **core**, **server** (`package.json:39`). lock `:3216`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### test `@orkestrel/test` 0.0.13
faces: **core**, **browser** (`package.json:32`), **server** (`package.json:38`). lock `:3346`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `:29`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### timeout `@orkestrel/timeout` 0.0.9
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Re-pin the development ranges to the released fleet`.

### tool `@orkestrel/tool` 0.0.13
faces: **core**. lock `:3204`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### toolbox `@orkestrel/toolbox` 0.0.12
faces: **core**, **server** (`package.json:40`). lock `:3307`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### websocket `@orkestrel/websocket` 0.0.11
faces: **server**. lock `:3204`. Vite: `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### worker `@orkestrel/worker` 0.0.11
faces: **core**, **server** (`package.json:40`). lock `:3213`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.server.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### workflow `@orkestrel/workflow` 0.0.17
faces: **core**, **browser** (`package.json:39`), **server** (`package.json:45`). lock `:3370`. Vite: `vite.core.config.ts` `:2`/`:12`; `vite.browser.config.ts` `:2`/`:13`; `vite.server.config.ts` `:2`/`:12`. proof `:29`. importers: `tests/setupPolicy.ts:12`. `tests/setupServer.ts` exists, no `typescript` hit. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

### workspace `@orkestrel/workspace` 0.0.7
faces: **core**. lock `:3202`. `vite.core.config.ts` `:2`/`:12`. proof `:23`. importers: `tests/setupPolicy.ts:12`. setup files absent. COMMIT_EDITMSG: `Align the lint script with the host's shape`.

Compiler-importer file counts outside `tests/distribution.test.ts`: **1** on every checkout except **database = 3** (`tests/setupPolicy.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`) and **lsp = 2** (`tests/setupPolicy.ts`, `tests/setupConformance.ts`). `require('typescript')` and `from "typescript"`: **no hits**.

---

## Closing table

| name | version | vite-plugin-dts | compiler importers outside proof | vite.*.config.ts shape | proof head | tree clean |
| --- | --- | --- | --- | --- | --- | --- |
| abort | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| agent | 0.0.20 | yes | 1 | dts | compiler | unmeasured |
| brief | 0.0.7 | yes | 1 | dts | compiler | unmeasured |
| browser | 0.0.15 | yes | 1 | dts | compiler | unmeasured |
| budget | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| codec | 0.0.2 | yes | 1 | dts | compiler | unmeasured |
| console | 0.0.12 | yes | 1 | dts | compiler | unmeasured |
| contract | 0.0.16 | yes | 1 | dts | compiler | unmeasured |
| csv | 0.0.6 | yes | 1 | dts | compiler | unmeasured |
| database | 0.0.13 | yes | 3 | dts | compiler | unmeasured |
| emitter | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| form | 0.0.5 | yes | 1 | dts | compiler | unmeasured |
| guide | 0.0.17 | yes | 1 | dts | compiler | unmeasured |
| html | 0.0.8 | yes | 1 | dts | compiler | unmeasured |
| indexeddb | 0.0.10 | yes | 1 | dts | compiler | unmeasured |
| interpret | 0.0.12 | yes | 1 | dts | compiler | unmeasured |
| lsp | 0.0.6 | yes | 2 | dts | compiler | unmeasured |
| markdown | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| mcp | 0.0.28 | yes | 1 | dts | compiler | unmeasured |
| middleware | 0.0.19 | yes | 1 | dts | compiler | unmeasured |
| msg | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| ndjson | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| ollama | 0.0.14 | yes | 1 | dts | compiler | unmeasured |
| pool | 0.0.10 | yes | 1 | dts | compiler | unmeasured |
| probe | 0.0.12 | yes | 1 | dts (core, server); neither (bin) | compiler | unmeasured |
| process | 0.0.10 | yes | 1 | dts | compiler | unmeasured |
| program | 0.0.12 | yes | 1 | dts | compiler | unmeasured |
| qualifier | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| queue | 0.0.12 | yes | 1 | dts | compiler | unmeasured |
| rater | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| reason | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| relation | 0.0.11 | yes | 1 | dts | compiler | unmeasured |
| router | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| sea | 0.0.14 | yes | 1 | dts | compiler | unmeasured |
| server | 0.0.18 | yes | 1 | dts | compiler | unmeasured |
| sqlite | 0.0.10 | yes | 1 | dts | compiler | unmeasured |
| sse | 0.0.6 | yes | 1 | dts | compiler | unmeasured |
| table | 0.0.4 | yes | 1 | dts | compiler | unmeasured |
| template | 0.0.6 | yes | 1 | dts | compiler | unmeasured |
| terminal | 0.0.14 | yes | 1 | dts | compiler | unmeasured |
| test | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| timeout | 0.0.9 | yes | 1 | dts | compiler | unmeasured |
| tool | 0.0.13 | yes | 1 | dts | compiler | unmeasured |
| toolbox | 0.0.12 | yes | 1 | dts | compiler | unmeasured |
| websocket | 0.0.11 | yes | 1 | dts | compiler | unmeasured |
| worker | 0.0.11 | yes | 1 | dts | compiler | unmeasured |
| workflow | 0.0.17 | yes | 1 | dts | compiler | unmeasured |
| workspace | 0.0.7 | yes | 1 | dts | compiler | unmeasured |

---

## Coverage

**Directories walked:** `/home/user/fleet` listing; then for each of `abort`, `agent`, `brief`, `browser`, `budget`, `codec`, `console`, `contract`, `csv`, `database`, `emitter`, `form`, `guide`, `html`, `indexeddb`, `interpret`, `lsp`, `markdown`, `mcp`, `middleware`, `msg`, `ndjson`, `ollama`, `pool`, `probe`, `process`, `program`, `qualifier`, `queue`, `rater`, `reason`, `relation`, `router`, `sea`, `server`, `sqlite`, `sse`, `table`, `template`, `terminal`, `test`, `timeout`, `tool`, `toolbox`, `websocket`, `worker`, `workflow`, `workspace`: `package.json`, `package-lock.json`, `configs/src/vite.*.config.ts`, `tests/`, `src/`, `configs/`, `app/`, `scripts/`, `.git/HEAD`, `.git/COMMIT_EDITMSG`.

**Globs:** `*/package.json`; `**/configs/src/vite.*.config.ts`; `**/tests/distribution.test.ts`; `**/tests/setupServer.ts`; `**/tests/setupConformance.ts`; `**/app/**`; `**/scripts/**`; `**/src/**`; `**/package-lock.json`.

**Patterns:** `"name"`; `"version"`; `"typescript"`; `"vite-plugin-dts"`; `"@microsoft/api-extractor"`; `"@orkestrel/scaffold"`; `"@orkestrel/probe"`; `@typescript/typescript6`; `"dist/src"`; `"\./(core|server|browser|styles|bin)"`; `"\./(styles|bin)"`; `"bin":`; `node_modules/vite-plugin-dts`; `node_modules/@typescript/typescript6`; `vite-plugin-dts`; `dts(`; `declarationRollup(`; `from ['"]typescript['"]`; `require\(['"]typescript['"]\)`; `import ts `; `node:vm`; `createRequire`; `typescript` (on setup files); `^import ts from 'typescript'$`.

**Not collected:** `git status --short` line count; `git log -1 --format=%s` (allowlist refused the `git` binary).