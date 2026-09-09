I'll read the saved brief and every instruction it references before collecting evidence.Next I’ll load the grok role, the named rules, and the align-packages skill plus its references.Instructions are loaded. I’ll collect the bounded evidence next: types, guide, instruments, and Guide’s live inputs.I’ll read the public contracts, the guide’s CLI/host sections, and the retained repair/install instruments next.I’ll capture live git state, Guide’s tracked scripts, and whether the packed archives are actually on disk.Question: What supported compile/materialize/audit path and retained instruments apply the accepted Scaffold 0.0.64 packed host to Guide’s generated command and scripts without a source alias?

Evidence:

Public compile/materialize/audit inputs
- `Compiler.compile(blueprint, groups?)` and `Compiler.audit(blueprint, current, groups?)` take a `Blueprint` plus optional `Group[]`; core `audit` compares a `Snapshot`, not a directory (`src/core/types.ts:207-228`, `:588-613`).
- CLI reading verbs derive that blueprint from the target: name and `@orkestrel/*` packages from `package.json`; axes from shipped directories; `guides` from exact-case `tests/guides.test.ts` (`guides/scaffold.md:578-587`).
- `Materializer.audit(plan, target)`, `materialize(plan, target)`, `repair(plan, audit, target)`, `declare(regions, target)`, `remove(plan, audit, worktree, target)` (`src/server/types.ts:186-288`).
- CLI verbs: `audit` / `repair` / `overwrite` with `--groups`, `--offline`, `--from`, `--target`; `overwrite` also `--dirty` (`guides/scaffold.md:476-526`).

Packed host without a source alias
- `MaterializerOptions.host` is a directory or a `Host` value. A string defaults to the installed module’s vendored root, resolved from the module location, not the caller cwd. A directory with no manifest maps paths one to one. A `.tgz` is not a host (`src/server/types.ts:40-56`, `guides/scaffold.md:1346-1350`).
- `--from <path>` is that directory. Provenance omits a `--from` host because it is local (`guides/scaffold.md:509-510`, `:537`).
- Packed-without-checkout seams already used:
  - Install the tarball, then `new Materializer({ host: resolve(installed, 'dist', 'host') })` (`instruments/d7/windows/path-artifact-pilot/run.sh:31-32`, `functions.mjs:66-75`; tmp copy `tmp/pass/path-artifact-pilot/`).
  - Run the packed CLI so the default host is that binary’s `dist/host`: `node …/dist/bin/main.js repair --offline` (`instruments/d7/pass/rerepair.sh:12`; Windows launch copy `tmp/pass/rerepair.sh:12` still names `$SCR/tip/package/dist/bin/main.js`, which is absent).
- Accepted archive and extract exist: `tmp/pass/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz` (digest `5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c` in `artifacts.sha256:1`), CLI at `extract/package/dist/bin/main.js`, host at `extract/package/dist/host`. Packed from commit `5197231837183c2a2b7283f50da83ac7b704a027` (`actual-head.txt`), not the brief’s claimed Scaffold HEAD.

Generated scripts and overwrite/removal
- Writable script region is not a group. `repair` / `overwrite` write every computed direct `test:<project>` script, `test:probe`, and `test:bench` on every run; gate chains stay maintainer-owned; a declared value is replaced only when it already matches or is a recognized predecessor (`guides/scaffold.md:635-654`; `blueprintToWritableScripts` at `guides/scaffold.md:261`).
- Emission (outside `types.ts`): `test:guides` becomes `node --experimental-strip-types tests/guides.test.ts`; accepted predecessor is `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` (`src/core/compilers.ts:350-351`, `:446-458`). Guide’s manifest already holds that predecessor (`guide/package.json:75`).
- `tests/guides.test.ts` is package-owned and outside `HOST_PATHS`; scaffold does not synthesize or overwrite it (`guides/scaffold.md:1040-1043`).
- Host `scripts` directory is planned. Packed 0.0.64 host files: `scripts/codex.sh`, `scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh` (`extract/package/dist/host/manifest.json` destinations). No `scripts/docs.ts`.
- Guide working `scripts/`: those four plus `scripts/docs.ts`. `overwrite` deletes an unplanned tracked member when the tree is clean, observed bytes still match, and the path is not protected; birth-owned `scripts/service.sh` survives (`guides/scaffold.md:1053-1056`, `:727-731`). `repair` does not delete. `overwrite` refuses a dirty tree unless `--dirty`.

Manifest / lock fields the operation can change
- `declare` rewrites only named regions: `pins` (runtime and development ranges) and `scripts`. It never reads or writes `peerDependencies` / `peerDependenciesMeta`. A non-accepted script value is skipped; ranges still write (`src/server/types.ts:247-260`; `ManifestRegionSet` `src/core/types.ts:154-164`).
- `package.json` is birth-owned; regions rewrite in place; descriptions, keywords, extra scripts, and key order survive (`guides/scaffold.md:649-657`). Guide’s `docs` script is extra, not in the writable set.
- No verb writes `package-lock.json`. No-save install instruments pin `--no-save --package-lock=false --ignore-scripts`.
- Online `repair` FETCH-refuses writing a registry-absent version. `--offline` uses distributed floors; `catalog` has no offline form; `overwrite --offline` repairs and deletes, skips `catalog`, exits 1 with that in `note` (`guides/scaffold.md:491-493`, `:1212-1218`). Registry still serves scaffold `0.0.63` in Guide’s lock (`guide/package-lock.json:351-353`).

No-save Scaffold install inputs
- Guide declared: `@orkestrel/scaffold ^0.0.63`, contract `^0.0.16`, markdown `^0.0.13` (`guide/package.json:88-96`).
- Guide installed (live `node_modules/@orkestrel/*/package.json`): scaffold `0.0.63`; contract `0.0.17`; html `0.0.9`; markdown `0.0.14`; test `0.0.14`; console `0.0.12`; emitter `0.0.9`; process `0.0.10`; template `0.0.6`; probe `0.0.12`.
- Packed 0.0.64 runtime deps: console `^0.0.12`, contract `^0.0.16`, emitter `^0.0.9`, markdown `^0.0.13`, process `^0.0.10`, template `^0.0.6` (`scaffold/package.json:95-101`).
- Archives on disk: scaffold `0.0.64.tgz`; contract `tmp/pass/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz`; html `tmp/pass/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz`; markdown `tmp/pass/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz`; test `tmp/pass/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz`.
- `path-artifact-pilot/run.sh` installed only the scaffold tarball. `install-parity-guide.sh` / `prepare-scaffold-guides.sh` installed the unpublished contract/html/markdown/test set together so the consumer graph stayed pinned. Whether a scaffold-only `--no-save` into Guide would displace those already-installed unpublished packages was not run.

Instrument seams that reuse this path
- Packed CLI `repair --offline` in the target cwd: retained `instruments/d7/pass/rerepair.sh`, unit `instruments/d7/units/browser/d7n-browser-prep/repair.sh`, launch `tmp/pass/rerepair.sh` (stale `tip/package` path).
- Packed-host install then `Materializer({ host })`: `instruments/d7/windows/path-artifact-pilot/` and `tmp/pass/path-artifact-pilot/` (that copy’s installed host still carries `scripts/docs.ts`; accepted 0.0.64 host does not).
- Archive production: `instruments/d7/guides-extraction/pack-canonical-scaffold.sh` and `tmp/pass/pack-canonical-scaffold.sh`.
- No-save graph install (Guide-into-Scaffold, inverse of this visit): `install-parity-guide.sh` in retained and `tmp/pass`.
- Config-host follow-up, not the packed-host install: `instruments/d7/windows/run-guide-config-scout.sh`, `guide-config-host.sh`.

Live tree notes
- Guide branch ref `61182c3b727ae9ee410781c48a7008f22da41ff5` matches the brief.
- Scaffold branch ref file is `68f6ccebe17611d24993c51a26e4de1d3342451d`, not brief `454a37467d1a443492b8f4d31effefd201efa59b`, not pack commit `5197231837183c2a2b7283f50da83ac7b704a027`.
- Guide `scripts/` on disk: `codex.sh`, `cursor.sh`, `deps.sh`, `docs.ts`, `ollama.sh`. Git porcelain was not captured.

Distillate: The supported apply path is the packed 0.0.64 CLI or `Materializer` with `host` = that package’s `dist/host` (install the tarball, or invoke `extract/package/dist/bin/main.js`), then `repair` or `overwrite` with `--offline` and `--target` Guide. That writes the `test:guides` region from the Vitest predecessor to `node --experimental-strip-types tests/guides.test.ts` and restores planned `scripts/*` host files. Only `overwrite` can delete tracked `scripts/docs.ts`. It needs a clean git tree unless `--dirty`. It does not rewrite `package-lock.json` or peer ranges. `tmp/pass/rerepair.sh` still points at a missing `tip/package`; the accepted CLI is under `packed/d7n-scaffold-guides-api-accepted/extract/package`. A scaffold-only `--no-save` into Guide vs re-installing the unpublished contract/html/markdown/test set with it is unmeasured. `tests/guides.test.ts` stays author-owned.

Unknowns:
- Current `git status --porcelain` on both trees (harness rejected `git -C`).
- Whether Guide `scripts/docs.ts` is tracked, dirty, or protected at runtime.
- Whether Guide’s in-flight `tests/guides.test.ts` would make `overwrite` refuse without `--dirty`.
- Whether `npm install --no-save` of only `orkestrel-scaffold-0.0.64.tgz` into Guide keeps the installed contract/html/markdown/test tarball graph.
- Whether `$SCR/tip/package` can be reconstituted; it is absent now.
- Exact protected-path set beyond documented `scripts/service.sh` (`types.ts` does not name it).
- Live Guide `git ls-files -- scripts` (porcelain capture failed; disk listing is not tracking proof).

Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-guide-native-tooling-scout.jsonl`; `session_id` `4bbd9227-7b46-4969-a9c7-a76c705f48f7`.

Deviation: Harness rejected `git -C` porcelain/HEAD commands, so containment status is uncompared. Reading exceeded the brief’s `types.ts` bound into `src/core/compilers.ts`, `constants.ts`, and `factories.ts` for the generated `test:guides` string and `HOST_PATHS` membership, which those type files do not carry. Scaffold’s live branch ref does not match the brief’s named HEAD. `tmp/pass/rerepair.sh` names a `tip/package` CLI that is not present. No writes, installs, or tests were run.
