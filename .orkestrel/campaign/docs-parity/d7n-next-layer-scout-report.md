I'll read the brief and every instruction it references first, then collect only the evidence it asks for.The brief is a Grok executor scout. Iâ€™ll load the remaining referenced contracts, then collect only the evidence slice.Next Iâ€™ll load the publish and fleet references, the live handoff, and the catalog so the evidence slice has a complete authority chain.Catalog and campaign records are loaded. Next Iâ€™ll pull the remaining catalog rows, the graph instruments, and the sibling manifests for the layer after Contract, Codec, Msg, SSE, and Test.The graphâ€™s L1 set is identified. Iâ€™ll now read live sibling manifests, capture/prep scripts, and candidate git state.Question: Locate retained instruments, preparation evidence, and package state for the dependency layer after Contract, Codec, Msg, SSE, and Test.

Evidence:

Catalog `.claude/agents/orkestrel.md:48-92` Layer L1 membership equals graph `d7n-layer-graph-report.md:12-21`: abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool. Each live sibling `package.json` declares runtime `@orkestrel/contract` `^0.0.16` only. No `peerDependencies`, `optionalDependencies`, or `peerDependenciesMeta`. Development edges name `@orkestrel/guide` `^0.0.17`, `@orkestrel/probe` `^0.0.12`, `@orkestrel/scaffold` `^0.0.63`, `@orkestrel/test` `^0.0.13` and are excluded from layer membership.

Catalog Version cells lag the live/graph local versions (catalog abort `0.0.9` vs live `0.0.10`, budget `0.0.9`/`0.0.10`, csv `0.0.6`/`0.0.7`, emitter `0.0.9`/`0.0.10`, html `0.0.8`/`0.0.9`, indexeddb `0.0.10`/`0.0.11`, ndjson `0.0.9`/`0.0.10`, sqlite `0.0.10`/`0.0.11`, timeout `0.0.9`/`0.0.10`, tool `0.0.13`/`0.0.14`). Graph registry column still lists Contract `0.0.16` / Codec `0.0.2` / Msg `0.0.9` / SSE `0.0.6` / Test `0.0.13`. Retained `tmp/pass/d7n-initial-published-reading/registry-*.stdout.txt` `dist-tags.latest` reads Contract `0.0.17`, Codec `0.0.3`, Msg `0.0.10`, SSE `0.0.7`, Test `0.0.14`, Guide `0.0.17`, Scaffold `0.0.63`.

| Package | Declared runtime | Local version | Checkout | Tip = packed `origin/main` | Closure / other retained | GuideCommand |
| --- | --- | --- | --- | --- | --- | --- |
| abort | contract `^0.0.16` | `0.0.10` | `claude/orkestrel-npm-audit-deps-14ibta` | `3dad185df1df4168102c3f49905756e2d7861b6a` | `d7n-abort-closure-verdict.md`; `d7n-abort-audit-verdict.md` | absent (`abort/tests/guides.test.ts:5-20` `createGuide` drop-in; `scripts.docs` present) |
| budget | contract `^0.0.16` | `0.0.10` | same branch | `37ada20224611c3030f06881f58c64058b2ed030` | `d7n-budget-closure-verdict.md` | absent (`budget/tests/guides.test.ts:5-20`) |
| csv | contract `^0.0.16` | `0.0.7` | same branch | `b806d9ce4766e47e6cec0214fc0e11b29ffe2abe` | `d7n-csv-closure-verdict.md` | absent (`csv/tests/guides.test.ts:5-20`) |
| emitter | contract `^0.0.16` | `0.0.10` | same branch | `045aacac087fae27d918dd748fc59b96c5c6561e` | `d7n-emitter-closure-verdict.md` | absent (`emitter/tests/guides.test.ts:5-20`) |
| html | contract `^0.0.16` | `0.0.9` | same branch | `0b953169d8a541a8b2bc91f0170c301bd5b9cdca` | `d7n-html-closure-verdict.md`; isolated stage `d7n-html-artifact-stage-verdict.md` (`Contract ^0.0.17`, SHA256 `970077f8671a978c271e7a790b78a6b44772d1f60d4e944fc381526c916c334b`) | absent (`html/tests/guides.test.ts:55-69`) |
| indexeddb | contract `^0.0.16` | `0.0.11` | same branch | `951eace557488d36107a027b93df5e14826d3e25` | `d7n-indexeddb-closure-verdict.md` | absent (`indexeddb/tests/guides.test.ts:5-20`) |
| ndjson | contract `^0.0.16` | `0.0.10` | same branch | `0a5504b01a1b37f9589aa7401ed3a06d523945dd` | `d7n-ndjson-closure-verdict.md` | absent (`ndjson/tests/guides.test.ts:7-21`) |
| sqlite | contract `^0.0.16` | `0.0.11` | same branch | `74bd42f40f662270d743dbb1f342ce3acaf5abad` | `d7n-sqlite-closure-verdict.md` | absent (`sqlite/tests/guides.test.ts:6-21`) |
| timeout | contract `^0.0.16` | `0.0.10` | same branch | `7e06bcb95c41c345a38e66af1cbb6a1a27427c4f` | `d7n-timeout-closure-verdict.md` | absent (`timeout/tests/guides.test.ts:5-20`) |
| tool | contract `^0.0.16` | `0.0.14` | same branch | `c9755ef35b3649beccd5e9bcdf193f05c702fc4c` | `d7n-tool-closure-verdict.md` | absent (`tool/tests/guides.test.ts:6-21`) |

No `d7n-<pkg>-native-*` or `d7n-<pkg>-publish-prepared-verdict.md` exists for those packages. Local `refs/heads/main` files are absent. Cached survey `git-status.stdout.txt` for abort, html, and tool is empty (`evidence/d7n-layer-survey-diagnostic/`). Live porcelain was not read.

Accepted archives named by `install-foundation-tooling.sh:8-34` and landings:

- Guide `tmp/pass/packed/d7n-guide-native-entry-final/orkestrel-guide-0.0.18.tgz`, SHA256 `cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7` (`d7n-guide-native-tooling-landing.md:13-14`)
- Scaffold `tmp/pass/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz`, SHA256 `5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c` (`d7n-guides-api-product-landing.md:13`)

Overwrite semantics: `guides/scaffold.md` `overwrite` repairs, catalogs, and deletes unplanned tracked members on a clean tree (`guides/scaffold.md:482`, `727`, `1054`).

Reusable scripts (prefer these; do not author another pipeline):

- Graph/registry capture â€” frozen `.orkestrel/campaign/docs-parity/instruments/d7/windows/layer-capture-final/main.mjs`; scratch `tmp/pass/layer-capture/`. Invocation: `node <main.mjs> <abs-fleet-root> <absent-output-dir> <abs-npm-cli.js> <abs-git.exe>`. Proven args in `evidence/d7n-layer-survey-diagnostic/run.json:2-4,56`: root `C:/Users/mikes/WebstormProjects`, npm `C:/Users/mikes/scoop/apps/nodejs-lts/current/node_modules/npm/bin/npm-cli.js`, git `C:/Users/mikes/scoop/apps/git/current/cmd/git.exe`. Outputs: `run.json`, `rows.jsonl`, per-package `package.before.json` / `package.after.json`, lock copies, `git-*.stdout.txt`, `npm-view.stdout.txt`. Occupied output is refused (`functions.mjs:14-16`).
- Visit actions â€” `tmp/pass/foundation-action.sh` (copy of `instruments/d7/foundation-native/foundation-action.sh`). Args: `<package> <native|guides|to-guide|to-source|prepublish|format|lock|install|audit|overwrite|help> <label> <Ns>`. `overwrite` runs `node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite --offline`. Allowlist is `contract|codec|msg|sse|test` only (`foundation-action.sh:26-28`).
- Full preparation â€” `tmp/pass/finish-foundation-native.sh <package> <expected-commit>`: overwrite, audit, `npm pkg delete scripts.docs`, `catalog`, Guide mirror, lock, `npm ci`, tooling overlay, format, prepublish, pack. Requires campaign branch and that same allowlist (`finish-foundation-native.sh:57-65`).
- No-save tooling overlay â€” `tmp/pass/install-foundation-tooling.sh <package> <label>`: `npm install --no-save --ignore-scripts --package-lock=false` of the Guide, Scaffold, Contract, HTML, Markdown, and Test archives above; same allowlist (`install-foundation-tooling.sh:20-22,44`).
- Pack/compare â€” `tmp/pass/pack-foundation-final.sh <package> <label>` against retained foundation baselines; allowlist plus hardcoded pending versions (`pack-foundation-final.sh:40-47`).
- Registry/git reading â€” `tmp/pass/read-foundation-release.sh <label>` writes `registry-<pkg>.stdout.txt` JSON (arrays) and per-repo `branch.txt` / `head.txt` / `status.txt`; population is codec, contract, msg, sse, test, guide, scaffold (`read-foundation-release.sh:60-72`).
- Guide-only overwrite apply â€” `instruments/d7/guide-native-adoption/apply-guide-native-tooling.mjs <canonical-guide-path> <output> preview|apply` refuses any target other than the Guide checkout (`apply-guide-native-tooling.mjs:73-74`).

Distillate: The next runtime/peer/optional layer candidates, from live manifests and the retained graph, are abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, and tool. Each still pins Contract `^0.0.16` while the retained registry reading already serves Contract `0.0.17`. Canonical checkouts remain on the campaign branch at their closure tips, with packed `origin/main` equal to those tips; local `main` is not checked out. Native `GuideCommand` construction has not landed. The reusable capture and visit carriers exist; the visit/pack/tooling allowlists still name only the initial layer. HTML has an isolated staged tarball with Contract `^0.0.17`; canonical HTML is unchanged. Root owns the next-layer decision, lock refresh, allowlist reuse, and any upload.

Unknowns:

- Live `git status --porcelain` for every candidate (shell `git -C` was refused; cached survey status files are empty).
- Fresh L1 packuments (retained `read-foundation-release.sh` output does not include those packages).
- Whether `package-lock.json` already resolves Contract `0.0.17` under the declared `^0.0.16` pin.
- Whether `origin/main` moved after the packed-refs SHAs (brief forbids fetch).
- Audit-verdict files for budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool (only abortâ€™s `d7n-abort-audit-verdict.md` is present under that name).
- How root will reuse `foundation-action.sh` / `finish-foundation-native.sh` once the allowlist is the blocker.

Journal: `tmp/cursor/d7n-next-layer-scout.jsonl`, session `09033e5e-7a0c-4593-87c0-1c5f06967b39`.

Deviation: Live candidate `git status --short --branch` did not run; branch and tip come from `.git/HEAD` and packed-refs. No source, manifest, or `publish.txt` edit. This is evidence, never acceptance.
