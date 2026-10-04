The census and generated-config repairs are committed. All required gates pass, including `npm test` and `npm run test:distribution`. Both requested timing sets passed without detected browser-test overlap. Timeout budgets are unchanged.

| Commit | Change |
| --- | --- |
| `465fb2d4ffc1e937f2f55393a564b515d28b73cd` | Gate discovery rows by every collected test identity |
| `8da606341b04f0c4d60b24a89043e4ef7e9aa6f9` | Name generated browser instances from merged project labels |

The census regressions used this command against `245248689` and the repaired script:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts
```

| Review item | Change and measured regression |
| --- | --- |
| 1(a), X1 | Only a listing that collects an identity can gate it or enter its row's `units`. The named-but-uncollected regression failed before and passed after. |
| 1(b) | Vitest file arguments stay inside that invocation's project gate. Only non-Vitest commands create file gates. The shared-file regression failed before and passed after. |
| 1(c) | Merge gate evidence per `[file, projectName, name]`; flag a row containing an ungated identity. The partially gated row regression failed before and passed after. |
| 1(d) | Fold only `chromium`, `firefox`, and `webkit`, read from the installed provider declarations. The `core (legacy)` regression failed before and passed after. |
| Wildcard filter | Match the whole project name using Vitest's wildcard semantics. The `src:*` regression failed before and passed after. |
| Negated filter | Match Vitest's `!` exclusion expression. The `!browser` regression failed before and passed after. |
| Case filter | Use Vitest's case-insensitive matching. The `Core` regression failed before and passed after. |
| Command position | Recognize direct, Node, npx, and Vitest-path invocations; reject `npm ls vitest` and `vitest list` as gates. The command-position regression failed before and passed after. |
| X2 | List a benchmark gate in `benchmark` mode by default. The benchmark-mode regression failed before and passed after. |

The original regression run measured **9 failed, 19 passed**, exit 1; the repaired run measured **28 passed**, exit 0. Each table row measured **1 failed before and 1 passed after** under that command. Logs: `tmp/codex/census-red.log` and `tmp/codex/census-green.log`.

Veneer's census exposed an additional empty-workbench fallback error during implementation. The command below measured **1 failed, 28 filtered** before its repair and **1 passed, 28 filtered** afterward. The final discovery file has **29 passing tests**, included in the passing skills gate.

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts -t "empty workbench"
```

The opening comment and hardening `SKILL.md` now state the per-test rule. Entirely empty, explicitly named projects retain their previous interpretation. An unrelated unfiltered listing cannot turn an empty workbench into a gated empty project.

Filter semantics came from installed Vitest's `dist/chunks/index.UpGiHP7g.js:40-45` and `cli-api.CnMVyzaz.js:14111-14118`. Browser names came from `@vitest/browser-playwright/dist/index.d.ts:7`; Vitest's `BrowserInstanceOption` declares optional `name`, and its naming sites use `??=`. No guessed suffix list or substitute filter semantics were used.

The generated factories declare unnamed default instances. `mergeOverride` assigns each still-unnamed instance `${label} (${browser})` using the merged label. Explicit names survive. `appVue` and `appJourney` discard inherited names before applying their labels; sheet integration merges its override before naming.

Live proof command:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project templates tests/src/core/templates.test.ts -t "live browser factory names"
```

| Live Chromium proof | Red evidence | Green evidence |
| --- | --- | --- |
| Default `srcBrowser`, `srcVue`, `appBrowser`, `appVue`, `appJourney`, `sheetProject`, `setupBrowser`, and sheet `integration` | Each failed with the template source from `81ac20857`: 8 failed cases | Each passed: 8 passing cases |
| Overridden labels for `srcBrowser`, `srcVue`, `appBrowser`, `appVue`, `sheetProject`, `setupBrowser`, and sheet `integration` | Each failed with `245248689`: 7 failed cases | Each passed: 7 passing cases |
| Added unnamed instance beside an explicitly named instance | Failed with `245248689`: 1 failed case | Passed: 1 passing case; explicit name retained |

Every case compares real wrapper and nested-root Vitest listings. Against `81ac20857`, the matrix measured **16 failed, 40 filtered**, exit 1. Against `245248689`, it measured **8 failed, 8 passed, 40 filtered**, exit 1. After the repair it measured **16 passed, 40 filtered**, exit 0. Logs: `templates-red-base`, `templates-red-tip2`, and `templates-green` under `tmp/codex/`.

The entire template test file runs in the isolated `templates` project, excluded from `src:core` and registered as `test:templates` in `prepublishOnly`. At the committed tip, `npm run test:templates` measured **56 passed**, exit 0, in **150,272 ms** (`tmp/codex/templates-final-0-test-templates.log`). Generated-text expectations were updated; the compiler file measured **194 passed**, exit 0, using:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts
```

X3 is closed: the naming paragraph moved from the journey section to `guides/scaffold.md`'s generated-workspace section and describes overridden labels, added instances, and preserved explicit names. The configuration parity test retains exact byte comparison with an explicit expected overlay for this package's isolated templates project.

Veneer's census ran from `C:/Users/mikes/WebstormProjects/veneer` with this absolute script path:

```text
node C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/.agents/skills/orkestrel-harden/scripts/discovery.ts --json
```

It exited **3** in **54,883 ms**. `empty=[]`, `undiscovered=[]`, and `workbenches=["probe"]`. The existing wrapper/root instance-name differences correctly remain ungated:

| Project | Files | Tests | Gate reported |
| --- | ---: | ---: | --- |
| `[object Object] (chromium)` | 6 | 34 | `test > test:app:vue` |
| `app:browser` | 8 | 226 | `test > test:app` |
| `app:core` | 1 | 1 | `test > test:app` |
| `app:vue (chromium)` | 1 | 1 | Ungated |
| `config` | 1 | 227 | `test > test:config` |
| `conformance` | 1 | 117 | `test > test:conformance` |
| `distribution` | 1 | 17 | `prepublishOnly > test:distribution` |
| `guides` | 1 | 15 | `test > test:guides` |
| `integration` | 1 | 54 | `test > test:integration` |
| `journey:dark-1280 (chromium)` | 2 | 19 | `test > test:journey:vue` |
| `journey:dark-390 (chromium)` | 2 | 14 | `test > test:journey:vue` |
| `journey:light-1280 (chromium)` | 2 | 14 | `test > test:journey:vue` |
| `journey:light-390 (chromium)` | 2 | 17 | `test > test:journey:vue` |
| `policy` | 1 | 119 | `test > test:policy` |
| `probe` | 0 | 0 | `test:probe`; workbench |
| `setup` | 2 | 149 | `test > test:setup` |
| `setup:browser` | 2 | 102 | `test > test:setup:browser` |
| `src:bootstrap (chromium)` | 1 | 14 | Ungated |
| `src:browser` | 26 | 787 | `test > test:src` |
| `src:core` | 2 | 14 | `test > test:src` |
| `src:styles (chromium)` | 2 | 15 | Ungated |
| `src:tailwindcss (chromium)` | 1 | 3 | Ungated |
| `src:vue (chromium)` | 1 | 1 | Ungated |

The raw census, including collecting `units` and file markers, is `tmp/codex/veneer-census-final.log`; its exit record is `veneer-census-final.err`. Veneer was neither edited nor installed into.

The timeout comparison used `npm run test:src:core` on this Windows host with Node 24.21.0. The baseline ran from the detached worktree at `tmp/worktrees/discovery-timeouts`, revision `81ac20857de61da81e9c167141b18f55567ea448`; final-tip runs used `8da606341b04f0c4d60b24a89043e4ef7e9aa6f9`.

The accepted measurements followed external Vitest process exits. `Get-Process chrome,msedge,node` and command-line snapshots were recorded before and after each run. No external Vitest command appeared in those snapshots. Existing Edge processes, WebStorm Vue and Tailwind language servers, Oxlint LSP, probe servers, and agent launchers remained. The evidence is limited to those process snapshots.

| Accepted run log under `tmp/codex/` | Revision | Passed | Exit | Vitest duration | Command wall time |
| --- | --- | ---: | ---: | ---: | ---: |
| `baseline-controlled-0-0-test-src-core.log` | `81ac20857` | 507 | 0 | 30.64 s | 32,836 ms |
| `baseline-controlled-1-0-test-src-core.log` | `81ac20857` | 507 | 0 | 30.94 s | 31,566 ms |
| `baseline-controlled-2-0-test-src-core.log` | `81ac20857` | 507 | 0 | 31.25 s | 31,877 ms |
| `tip-controlled-0-0-test-src-core.log` | `8da606341` | 468 | 0 | 26.37 s | 26,963 ms |
| `tip-controlled-1-0-test-src-core.log` | `8da606341` | 468 | 0 | 26.46 s | 27,045 ms |
| `tip-controlled-2-0-test-src-core.log` | `8da606341` | 468 | 0 | 26.66 s | 27,250 ms |

No accepted run timed out. The final core count excludes the isolated templates project, whose committed-tip run passed separately. The process snapshots use the matching `*-before.json` and `*-after.json` prefixes; `controlled-timings.log` records both revisions and acceptance results.

Every earlier standalone core run is retained below. These are excluded from the controlled comparison because external browser work resumed during the batch or run.

| Earlier run log under `tmp/codex/` | Revision/content | Passed | Exit | Vitest duration | Command wall time |
| --- | --- | ---: | ---: | ---: | ---: |
| `baseline-0-test-src-core.log` | `81ac20857`; uncontrolled batch | 507 | 0 | 39.11 s | 39,757 ms |
| `baseline-1-test-src-core.log` | `81ac20857`; uncontrolled batch | 507 | 0 | 54.95 s | 55,887 ms |
| `baseline-2-test-src-core.log` | `81ac20857`; uncontrolled batch | 507 | 0 | 59.05 s | 59,957 ms |
| `baseline-quiet-0-test-src-core.log` | `81ac20857`; overlap detected afterward | 507 | 0 | 38.68 s | 39,344 ms |
| `final3-0-test-src-core.log` | Final content before commit; concurrent browser work | 468 | 0 | 31.90 s | 32,617 ms |

The overlapping work included `browser-wt-browse` browser/service tests and benchmarks, and `veneer-wt-page` browser tests, journey tests, and browser probes. The attempted quiet batch stopped before starting another test when its snapshot detected that work. The accepted measurements ran after waiting for those processes.

The common gates ran after the census's last edit (`final2-*`) and after the templates' last edit (`final3-*`). Each exit was read from its retained output.

| Command | Census exit | Templates exit | Final measured tests |
| --- | ---: | ---: | --- |
| `npm run format:check` | 0 | 0 | — |
| `npm run lint:check` | 0 | 0 | — |
| `npm run check` | 0 | 0 | — |
| `npm run test:skills` | 0 | 0 | 84 passed |
| `npm run test:policy` | 0 | 0 | 120 passed |
| `npm run test:guides` | 0 | 0 | 45 passed |
| `npm run test:config` | 0 | 0 | 227 passed, 1 skipped |
| `npm run build` | Not required | 0 | — |
| `npm test` | Not required | 0 | See project results below |
| `npm run test:distribution` | Not required | 0 | 11 passed, 1 skipped |

The final build, `npm test`, and distribution command ran in that order. The packed adopter's `test:config` measured **227 passed, 1 skipped**, exercising its generated browser configurations. The distribution command completed in **248,482 ms**.

| Project within final `npm test` | Passed | Skipped |
| --- | ---: | ---: |
| `src:core` | 468 | 0 |
| `src:server` | 480 | 7 |
| `src:bin` | 300 | 0 |
| `policy` | 120 | 0 |
| `config` | 227 | 1 |
| `setup` | 205 | 3 |
| `skills` | 84 | 0 |
| `guides` | 45 | 0 |

`npm test` completed in **253,196 ms**, exit 0. Logs are `tmp/codex/final3-9-test.log` and `final3-10-test-distribution.log`.

Deviations and unsuccessful verification: additional timing attempts were needed because of external browser work. An early guides run timed out at its existing 5,000 ms budget and passed unchanged on retry. Inventory drift was repaired by regenerating `host.json`. An intermediate full test run failed on stale compiler expectations; those were repaired and the final full run passed. Distribution initially measured **3 failed, 8 passed, 1 skipped** because fixtures under ignored `tmp` inherited its ignore rules. An earlier templates run measured **1 failed, 55 passed** for that scratch-location issue. Non-install gates regained the normal temporary directory, and a Git boundary around the worktree-local distribution scratch directory fixed the adopter harness. No product budget changed. An intermediate gate chain was stopped when the empty-workbench regression was discovered. No stopped or failed run is presented as passing.

Installs remained inside this worktree. No root dependency was added, and nothing was pushed or published. Final `git diff --check` exits 0; `git status --porcelain` is empty.
