## Question

Which behavioural changes on `claude/new-session-hxonen` above `origin/main` does the fixed 17-claim set fail to name?

## Evidence

Shell was blocked here; `git log` / full `git diff` were not run. Inventory is from the partial diff at `agent-tools/092fb216-fd05-4354-a942-a3f0a0c37d6f.txt` (README, guides, CLI, constants, factories, types, validators, server types/validators) plus HEAD reads of files that diff omitted (`compilers.ts`, `templates.ts`, `Materializer.ts`, `tests/distribution.test.ts` and related tests).

| Change | Pointer | Claim |
| --- | --- | --- |
| `Blueprint.distribution` removed (interface, JSDoc, guard, factory, CLI `#derive`) | `src/core/types.ts:214`, `src/core/validators.ts:292`, `src/core/factories.ts:57`, `src/bin/CLI.ts:966` | **6** |
| Publishing plans `DISTRIBUTION_TEST_PATH` with `ownership: 'presence'`; non-publishing plans none | `src/core/compilers.ts:1301-1316` | **3**, **6**, **7** |
| Generated proof selects browser via export `TARGET` prefix `BROWSER_OUTPUT`, not subpath name | `src/core/templates.ts:1144-1149`, `:1374` | **1** |
| Release mode: missing registry/browser evidence throws; non-release skips | `src/core/templates.ts:1140-1143`, `:1396-1402`, `:1604-1605` | **2** |
| Proof preamble: no package/export/cardinality that tracks the published surface | `src/core/templates.ts:1109-1114` | **8** |
| `RELEASE_PROOF_COMMAND`; `prepublishOnly` appends it | `src/core/constants.ts:251`, `src/core/compilers.ts:429-432` | **2** |
| `ManifestScript` / `ManifestRegionSet` / `MAX_SCRIPT_LENGTH` / guards | `src/core/types.ts:143-159`, `src/core/constants.ts:349`, `src/core/validators.ts:724`, `src/server/validators.ts:823` | **4** |
| `blueprintToWritableScripts` (publishing only; `accepted` predecessor without release row) | `src/core/compilers.ts:465-477` | **4**, **6** |
| `replaceManifestScripts`: refuse unrecognized chain whole; in-place replace/append only in scripts object | `src/core/compilers.ts:1744-1759` | **4** |
| `Materializer.declare` / `#redeclare`: scripts after ranges; refused scripts → keep range-rewritten text | `src/server/types.ts:252`, `src/server/Materializer.ts:416`, `:1154-1168` | **4** |
| `repair`/`overwrite` pass writable scripts; `catalog` passes `scripts: []` | `src/bin/CLI.ts:357`, `:419`, `:468-473` | **4** |
| `#setupQuestion`: silent if `blueprint.setup` or no `tests/`; empty seeds and `HOST_PATHS` excluded; audit-only | `src/bin/CLI.ts:1300-1337` | **5**, **11** |
| `#projectQuestion` subject is `replaceManifestScripts(...) ?? disk` before Vitest-project advisory | `src/bin/CLI.ts:1118-1124` | **UNCOVERED** |
| Guide/README: distribution not structural; presence plan-owned proof; script region; setup question; release fail; API rows | `guides/scaffold.md:538-553`, `:597-635`, `:884`, `:901-904`; `README.md:9` | **3**, **4**, **5**, **6**, **9**, **11** |
| Per-declaration `printing` assertion (narrowing extractor fails; added example does not move) | `tests/distribution.test.ts:314-332`, `:469` | **14** |
| Per-declaration tally excludes injected `controls` via `fenced` | `tests/distribution.test.ts:314-315`, `:332` | **15** |
| Driven-count floors `toBeGreaterThan(80)` / `(40)` instead of exact tallies | `tests/distribution.test.ts:537-541` | **10**, **16** |
| No `typescript` module import in `src/` (template string / property access only) | `src/core/templates.ts:1130`; `src/core/constants.ts` pin field | **13** |
| Package version `0.0.50` / vendored-byte release framing (outside requested diff paths; seen in `package.json`) | `package.json:3` | **12** |
| Generated-workspace `prepublishOnly` expected exit 0 in distribution suite | `tests/distribution.test.ts:873-880` | **17** |

Supporting tests for named surfaces (not separate product behaviours): `tests/src/core/compilers.test.ts` (`blueprintToWritableScripts` / `replaceManifestScripts`), `tests/src/bin/CLI.test.ts` (setup question / script repair), `tests/src/server/Materializer.test.ts` (script region refuse).

## Distillate

**UNCOVERED**

- `#projectQuestion` now audits the manifest **as a write would leave it** (`replaceManifestScripts(text, blueprintToWritableScripts(blueprint)) ?? text`) at `src/bin/CLI.ts:1123-1124`. Scaffold-accepted script chains raise no `projects` advisory; a refused region keeps disk text and the advisory still fires. Not named by claim 4 (writer), 5/11 (setup), or 9’s one-liner (guide truth / generate-or-refuse), even though `guides/scaffold.md:607-610` documents it.

## Sweep coverage

**Walked:** partial diff file above; `src/bin/CLI.ts`; `src/core/{types,constants,validators,factories,compilers,templates,index}.ts`; `src/server/{types,validators,Materializer}.ts`; `tests/distribution.test.ts`; greps over `tests/` and `guides/scaffold.md`; `README.md` hunk; `package.json` version/scripts.

**Not walked:** full `git log` / complete unified diff (shell blocked); line-by-line diffs of every `tests/src/**` file; `configs/`, `app/`, `host/` / vendored inventory; whether claim 17’s `prepublishOnly` actually exited 0 in a live run.
