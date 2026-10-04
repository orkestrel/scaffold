Committed `92a980af23758462491422b812aff00bb701d14c` on `discovery-configs`. Vitest selects each gate; the census compares its returned identities. The required gates passed on that commit. Nothing was pushed or published.

The regression command was identical against the script from `8da606341` and the repaired script:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts -t "F1|F2|F3|F4|F5|O2|X2|lets Vitest apply"
```

The baseline batch recorded **8 failed, 29 filtered out**, exit 1. The repaired batch recorded **8 passed, 29 filtered out**, exit 0. Each finding in the following table contributed the stated result to that command. Logs: `tmp/codex/discovery-4-all-red.log` and `discovery-4-all-green.log`; their `.err` files contain the failure details and exits.

| Finding | Change | Red | Green |
| --- | --- | --- | --- |
| F1 | Pass browser project negation to Vitest; retain `web (chromium)` as an ungated identity. The proof uses real Playwright Chromium. | 1 failed | 1 passed |
| F2 | Pass positional file filters to the gate listing; leave the other file ungated. | 1 failed | 1 passed |
| F3 | Exclude `vitest bench` from ordinary test gates; retain the existing rejection of `vitest list`. | 1 failed | 1 passed |
| F4 | Remove browser suffix folding and merge the exact browser identities returned across modes. | 1 failed | 1 passed |
| F5 | Prefer any reaching script chain when classifying an empty project, independently of manifest order. | 1 failed | 1 passed |
| O2 | Recognize the Vitest runner after Node options and through `npm exec vitest`. | 1 failed | 1 passed |
| X2 | Invert the benchmark proof: benchmark-only collection does not expand the test universe. | 1 failed | 1 passed |
| Selecting arguments | Let Vitest apply test-name patterns, exclusions, line filters, and shards; complementary name patterns cover the full project. | 1 failed | 1 passed |

The discovery test file recorded **37 passed**, and the final skills gate recorded **92 passed**. Earlier behavioral coverage remains, with expectations revised where the brief replaces folding or filtered universes. A separate real-browser proof compared full and `--filesOnly` project identities. The installed Vitest 4.1.11 source emits the project’s name in both forms (`cli-api.CnMVyzaz.js`, `formatFilesAsJSON` and `formatCollectedAsJSON`).

The installed CLI source (`node_modules/vitest/dist/chunks/cac.uFydS1Z4.js`) and its collection path supplied the selecting arguments: positional files and lines; `--root`/`-r`, `--config`/`-c`, `--mode`, `--project`, `--dir`, `--exclude`, `--testNamePattern`/`-t`, `--tagsFilter`, `--changed`, `--shard`, `--browser`, `--browser.enabled`, `--browser.name`, `--typecheck`, `--typecheck.enabled`, `--typecheck.only`, `--typecheck.tsconfig`, and `--typecheck.allowJs`. Collection also retains `--configLoader`, `--environment`, `--dom`, `--globals`, `--pool`, `--execArgv`, `--experimental.vcsProvider`, `--experimental.preParse`, and `--includeTaskLocation`. The script reads option spellings and value arity from installed CLI help, preserves boolean values, and drops nonselecting options such as reporters, cache settings, and color.

Each config/mode has an unfiltered full universe. Identical listing arguments are cached. Gate listings use `--filesOnly` except for name, tag, line, and shard selection, which need full collection. The installed file-only path bypasses task filtering and the shard sequencer. No project matcher, browser suffix fold, or browser-name list remains.

Parity and O1: the opening comment and skill row state that Vitest selects and the census compares. The template sweep comment immediately precedes its `emitted workspaces under their own gates` block. This comment move has no behavioral red/green test; its evidence is the committed diff and the passing policy and formatting gates.

Distribution: installing fixtures use `createDistributionScratch`, which allocates under the checkout’s `tmp` directory and initializes a Git boundary. The non-installing proof that explicitly runs outside the checkout retains its external scratch directory. `TEMP`, `TMP`, and `TMPDIR` were not overridden. The containment assertion failed before any install under the original allocator. Its red and green command was:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project distribution tests/distribution.test.ts -t "runs the complete selection"
```

Red: **1 failed, 11 filtered out**, exit 1. Green: **1 passed, 11 filtered out**, exit 0. The helper’s Git-ignore boundary proof passed with a control that remained ignored without that boundary. Its command was `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project setup tests/setupServer.test.ts -t createDistributionScratch` (**1 passed**). The full setup file recorded **80 passed, 3 skipped**. The required unmodified `npm run test:distribution` result appears in the gate table.

The census measurements used this absolute-path command from each workspace root, on Windows on 2026-10-03:

```text
node C:\Users\mikes\WebstormProjects\scaffold-wt-discovery\.agents\skills\orkestrel-harden\scripts\discovery.ts
```

| Workspace | Before wall time / exit | After wall time / exit |
| --- | --- | --- |
| Scaffold | 9.570 s / 0 | 25.106 s / 0 |
| Veneer | 49.584 s / 3 | 107.880 s / 3 |

The host snapshots came from `Get-Process chrome,msedge,node,codex`. Cells give process count / working-set MiB; no Chrome process was present. Full PID, CPU-counter, and memory readings are in `tmp/codex/discovery-4-{before,after}-{scaffold,veneer}-load.json`.

| Measurement | msedge | node | codex |
| --- | --- | --- | --- |
| Scaffold before | 95 / 1916 | 13 / 1128 | 6 / 441 |
| Veneer before | 95 / 1916 | 15 / 1857 | 6 / 441 |
| Scaffold after | 101 / 2014 | 18 / 2006 | 8 / 578 |
| Veneer after | 101 / 2014 | 22 / 2504 | 8 / 578 |

These wall times include changing host load. The measured cost is acceptable for one discovery audit. Repeated five-minute census runs on these workspaces would be too expensive for a routine audit because discovery alone would approach a full test run. That is an audit-cost judgment, not an implementation target or cap.

The following census output is the output paired with those timings. The measurements preceded the fixture-containment test addition; the final setup gate therefore reports one additional passing test. Veneer retains its reported ungated projects; no veneer source was edited.

scaffold, before:

```text
discovery: config           1 file(s)   227 test(s) gate=test > test:config
discovery: distribution     1 file(s)    11 test(s) gate=prepublishOnly > test:distribution
discovery: guides           1 file(s)    45 test(s) gate=test > test:guides
discovery: policy           1 file(s)   120 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            3 file(s)   205 test(s) gate=test > test:setup
discovery: skills          14 file(s)    84 test(s) gate=test > test:skills
discovery: src:bin          3 file(s)   300 test(s) gate=test > test:src:bin
discovery: src:core         8 file(s)   468 test(s) gate=test > test:src:core
discovery: src:server       5 file(s)   480 test(s) gate=test > test:src:server
discovery: templates        1 file(s)    56 test(s) gate=prepublishOnly > test:templates
discovery: probe is a workbench no chain runs; it collects nothing
discovery: tests/agents/skills/orkestrel-dispatch/scripts/bench.test.ts .runIf(×1
discovery: tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts .skipIf(×1
discovery: tests/config.test.ts .skipIf(×4 timeout:×2
discovery: tests/distribution.test.ts .skipIf(×5 timeout:×9
discovery: tests/policy.test.ts .skipIf(×1
discovery: tests/setupPolicy.test.ts timeout:×2
discovery: tests/setupServer.test.ts .skipIf(×5 timeout:×13
discovery: tests/src/bin/main.test.ts timeout:×3
discovery: tests/src/core/templates.test.ts timeout:×4
discovery: tests/src/server/Upstream.test.ts timeout:×1
discovery: tests/src/server/WriteTransaction.test.ts .skipIf(×3
discovery: tests/src/server/helpers.test.ts .skipIf(×6
```

scaffold, after:

```text
discovery: config           1 file(s)   227 test(s) gate=test > test:config
discovery: distribution     1 file(s)    11 test(s) gate=prepublishOnly > test:distribution
discovery: guides           1 file(s)    45 test(s) gate=test > test:guides
discovery: policy           1 file(s)   120 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            3 file(s)   205 test(s) gate=test > test:setup
discovery: skills          14 file(s)    92 test(s) gate=test > test:skills
discovery: src:bin          3 file(s)   300 test(s) gate=test > test:src:bin
discovery: src:core         8 file(s)   468 test(s) gate=test > test:src:core
discovery: src:server       5 file(s)   480 test(s) gate=test > test:src:server
discovery: templates        1 file(s)    56 test(s) gate=prepublishOnly > test:templates
discovery: probe is a workbench no chain runs; it collects nothing
discovery: tests/agents/skills/orkestrel-dispatch/scripts/bench.test.ts .runIf(×1
discovery: tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts .skipIf(×1
discovery: tests/config.test.ts .skipIf(×4 timeout:×2
discovery: tests/distribution.test.ts .skipIf(×5 timeout:×9
discovery: tests/policy.test.ts .skipIf(×1
discovery: tests/setupPolicy.test.ts timeout:×2
discovery: tests/setupServer.test.ts .skipIf(×5 timeout:×13
discovery: tests/src/bin/main.test.ts timeout:×3
discovery: tests/src/core/templates.test.ts timeout:×4
discovery: tests/src/server/Upstream.test.ts timeout:×1
discovery: tests/src/server/WriteTransaction.test.ts .skipIf(×3
discovery: tests/src/server/helpers.test.ts .skipIf(×6
```

veneer, before:

```text
discovery: [object Object] (chromium)   6 file(s)    34 test(s) gate=test > test:app:vue
discovery: app:browser      8 file(s)   226 test(s) gate=test > test:app
discovery: app:core         1 file(s)     1 test(s) gate=test > test:app
discovery: app:vue (chromium)   1 file(s)     1 test(s) gate=none
discovery: config           1 file(s)   227 test(s) gate=test > test:config
discovery: conformance      1 file(s)   117 test(s) gate=test > test:conformance
discovery: distribution     1 file(s)    17 test(s) gate=prepublishOnly > test:distribution
discovery: guides           1 file(s)    15 test(s) gate=test > test:guides
discovery: integration      1 file(s)    54 test(s) gate=test > test:integration
discovery: journey:dark-1280 (chromium)   2 file(s)    19 test(s) gate=test > test:journey:vue
discovery: journey:dark-390 (chromium)   2 file(s)    14 test(s) gate=test > test:journey:vue
discovery: journey:light-1280 (chromium)   2 file(s)    14 test(s) gate=test > test:journey:vue
discovery: journey:light-390 (chromium)   2 file(s)    17 test(s) gate=test > test:journey:vue
discovery: policy           1 file(s)   119 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            2 file(s)   149 test(s) gate=test > test:setup
discovery: setup:browser    2 file(s)   102 test(s) gate=test > test:setup:browser
discovery: src:bootstrap (chromium)   1 file(s)    14 test(s) gate=none
discovery: src:browser     26 file(s)   787 test(s) gate=test > test:src
discovery: src:core         2 file(s)    14 test(s) gate=test > test:src
discovery: src:styles (chromium)   2 file(s)    15 test(s) gate=none
discovery: src:tailwindcss (chromium)   1 file(s)     3 test(s) gate=none
discovery: src:vue (chromium)   1 file(s)     1 test(s) gate=none
discovery: app:vue (chromium) collects tests but no root script chain reaches it
discovery: src:bootstrap (chromium) collects tests but no root script chain reaches it
discovery: src:styles (chromium) collects tests but no root script chain reaches it
discovery: src:tailwindcss (chromium) collects tests but no root script chain reaches it
discovery: src:vue (chromium) collects tests but no root script chain reaches it
discovery: probe is a workbench no chain runs; it collects nothing
discovery: tests/config.test.ts .skipIf(×4 timeout:×2
discovery: tests/distribution.test.ts .skip(×2 .runIf(×4
discovery: tests/policy.test.ts .skipIf(×1
discovery: tests/setupBrowser.test.ts timeout:×1
discovery: tests/src/styles/index.test.ts .todo(×1
```

veneer, after:

```text
discovery: [object Object] (chromium)   6 file(s)    34 test(s) gate=test > test:app:vue
discovery: app:browser (chromium)   8 file(s)   226 test(s) gate=test > test:app
discovery: app:core         1 file(s)     1 test(s) gate=test > test:app
discovery: app:vue (chromium)   1 file(s)     1 test(s) gate=none
discovery: config           1 file(s)   227 test(s) gate=test > test:config
discovery: conformance      1 file(s)   117 test(s) gate=test > test:conformance
discovery: distribution     1 file(s)    17 test(s) gate=prepublishOnly > test:distribution
discovery: guides           1 file(s)    15 test(s) gate=test > test:guides
discovery: integration (chromium)   1 file(s)    54 test(s) gate=test > test:integration
discovery: journey:dark-1280 (chromium)   2 file(s)    19 test(s) gate=test > test:journey:vue
discovery: journey:dark-390 (chromium)   2 file(s)    14 test(s) gate=test > test:journey:vue
discovery: journey:light-1280 (chromium)   2 file(s)    14 test(s) gate=test > test:journey:vue
discovery: journey:light-390 (chromium)   2 file(s)    17 test(s) gate=test > test:journey:vue
discovery: policy           1 file(s)   119 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            2 file(s)   149 test(s) gate=test > test:setup
discovery: setup:browser (chromium)   2 file(s)   102 test(s) gate=test > test:setup:browser
discovery: src:bootstrap (chromium)   1 file(s)    14 test(s) gate=none
discovery: src:browser (chromium)  26 file(s)   787 test(s) gate=test > test:src
discovery: src:core         2 file(s)    14 test(s) gate=test > test:src
discovery: src:styles (chromium)   2 file(s)    15 test(s) gate=none
discovery: src:tailwindcss (chromium)   1 file(s)     3 test(s) gate=none
discovery: src:vue (chromium)   1 file(s)     1 test(s) gate=none
discovery: app:vue (chromium) collects tests but no root script chain reaches it
discovery: src:bootstrap (chromium) collects tests but no root script chain reaches it
discovery: src:styles (chromium) collects tests but no root script chain reaches it
discovery: src:tailwindcss (chromium) collects tests but no root script chain reaches it
discovery: src:vue (chromium) collects tests but no root script chain reaches it
discovery: probe is a workbench no chain runs; it collects nothing
discovery: tests/config.test.ts .skipIf(×4 timeout:×2
discovery: tests/distribution.test.ts .skip(×2 .runIf(×4
discovery: tests/policy.test.ts .skipIf(×1
discovery: tests/setupBrowser.test.ts timeout:×1
discovery: tests/src/styles/index.test.ts .todo(×1
```

The final gate sequence ran on the committed tip in the required order. Every result was read without an output filter.

| Command | Exit | Result | Wall time |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | Passed | 4.284 s |
| `npm run lint:check` | 0 | Passed | 0.882 s |
| `npm run check` | 0 | Passed | 10.455 s |
| `npm run test:skills` | 0 | 92 passed | 122.922 s |
| `npm run test:policy` | 0 | 120 passed | 3.860 s |
| `npm run test:guides` | 0 | 45 passed | 8.897 s |
| `npm run test:config` | 0 | 227 passed, 1 skipped | 10.897 s |
| `npm run build` | 0 | Passed | 14.177 s |
| `npm test` | 0 | 1938 passed, 11 skipped | 340.234 s |
| `npm run test:distribution` | 0 | 11 passed, 1 skipped | 207.692 s |

`git diff --check`: exit 0. Final `git status --porcelain`: empty. The report and run artifacts remain under the ignored `tmp/codex` directory.

Deviations and unsuccessful verification: the prescribed standalone execution was used; no subagents were spawned. A committed distribution-fixture change replaced the earlier untracked environment override, as the brief permits. An intermediate discovery-file run recorded 34 passed and 1 failed at the checkout-census status assertion; its cause was not established. The direct census returned exit 0, the complete file rerun recorded 37 passed, and both final skills runs passed. No final gate timed out, and no test budget was increased.