The repairs are committed as `25fb91359daec163b29afe68a7b3265577ad0db0`. All required gates pass. Historical failure attribution has the limits stated in this report.

The findings map to these changes and regression runs.

| Finding | Change | Evidence |
| --- | --- | --- |
| 1–3 | Pass gate arguments verbatim; remove only the prescribed output/execution options using installed CLI arity. Preserve negation, boolean values, separator tokens, passWithNoTests, allowOnly, and strictTags. | A, C |
| 4 | Ignore mergeReports, listTags, and clearCache invocations as gates. | A |
| 5 | Give root/directory invocations their own universe; omit a pinned config when the gate has none. | B |
| 6, 8, F-b | Add task locations to full listings; match file, project, name, line, and column. Add partial line/tag gates with duplicate names and a negated flag before a file filter. | A |
| 7 | Allocate installing fixtures in system temp; reject node_modules in an ancestor. Keep a checkout-local consumer as the dependency-leak control. | D, distribution gate |
| 9, F-a | Restore the hard checkout assertion. Detect changed test files and repeat collection; refuse another change during that retry. | A, B |
| F-c | Determine empty rows through Vitest listings, including browser instance selection across modes. | B |
| 10, F-d | Document all exit-2 categories and the workbench rule requiring no chain containing ` > `. | C for the gate/option diagnostic; policy and guides for the documentation gates |
| Cost | Reuse the universe for an argument-free gate. | C: config loads decrease from 2 to 1 |

The regression commands use this executable and file prefix, followed by the named filter.

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project skills tests/agents/skills/orkestrel-harden/scripts/discovery.test.ts

A: -t "keeps duplicate|passes a negated|passes explicit|passes passWith|refuses reporting|reads this checkout"
B: -t "gate root|empty browser|workbench file appears"
C: -t "no arguments|names the gate|allowOnly and strictTags"

D: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project setup tests/setupServer.test.ts -t createDistributionScratch
```

| Run | Red against the original implementation | Green with the repair |
| --- | --- | --- |
| A | Exit 1; 6 failed, 1 passed | Exit 0; 8 passed, including the renamed explicit-mode test |
| B | Exit 1; 3 failed | Exit 0; 3 passed |
| C | Exit 1; 3 failed | Exit 0; 3 passed |
| D | Exit 1; 1 failed: the isolated import unexpectedly succeeded | Exit 0; 1 passed: isolated import fails with ERR_MODULE_NOT_FOUND and the checkout control succeeds |

The red census runs used `92a980af2` without changing the real Vitest implementation. The complete discovery file recorded 48 passed before the final collection-option case; the final skills gate and its repeat inside `npm test` each recorded 104 passed, including the complete discovery file. The setup file recorded 80 passed and 3 skipped.

The distribution evidence does not establish stale packuments as the cause of this checkout's earlier failure. The retained `tmp/codex/discovery-4-distribution-red.err` records a location assertion failure: system temp was rejected because the test expected the checkout's tmp directory. That run failed before installation. Before changing the allocator, a generated adopter's `npm install --package-lock-only --ignore-scripts --prefer-offline --no-audit --no-fund` completed with exit 0. The online refresh, `npm install --package-lock-only --ignore-scripts --prefer-online --offline=false --no-audit --no-fund`, also exited 0. The scaffold records describe historical stale packuments for contract and Vite, but this run did not reproduce that condition. The final unmodified distribution command proves the system-temp fixtures work on this host.

The census race is reproduced and repaired. In B, a real config creates `tmp/probes/appeared.test.ts` while loading the release universe, after the base probe gate has listed its files. The original census reports `ungated: ["probe"]` and exits 3. The repaired census detects the changed file population, repeats collection, reports the probe gate, and exits 0. The earlier checkout failure's exact trigger remains unverified because its retained log contains only the failed status assertion. The hard checkout assertion passes in A and the final skills runs.

These are the final required gate results, read from their complete retained output.

| Command | Exit | Wall time |
| --- | ---: | ---: |
| `npm run format:check` | 0 | 4.220 s |
| `npm run lint:check` | 0 | 0.890 s |
| `npm run check` | 0 | 9.231 s |
| `npm run test:skills` | 0 | 165.937 s |
| `npm run test:policy` | 0 | 3.550 s |
| `npm run test:guides` | 0 | 8.170 s |
| `npm run test:config` | 0 | 12.035 s |
| `npm run build` | 0 | 13.147 s |
| `npm test` | 0 | 359.957 s |
| `npm run test:distribution` | 0 | 248.685 s |
| `git diff --check` | 0 | — |

The final project counts are skills 104 passed, policy 120 passed, guides 45 passed, and config 227 passed with 1 skipped. The `npm test` run recorded core 468 passed; server 480 passed with 7 skipped; bin 300 passed; policy 120 passed; config 227 passed with 1 skipped; setup 206 passed with 3 skipped; skills 104 passed; and guides 45 passed. The distribution gate recorded 11 passed and 1 skipped.

The census command was `node C:/Users/mikes/WebstormProjects/scaffold-wt-discovery/.agents/skills/orkestrel-harden/scripts/discovery.ts`, run from each checkout. The output and measured wall times follow.

scaffold: exit 0, 17.718 s wall time.

```text
discovery: config           1 file(s)   227 test(s) gate=test > test:config
discovery: distribution     1 file(s)    11 test(s) gate=prepublishOnly > test:distribution
discovery: guides           1 file(s)    45 test(s) gate=test > test:guides
discovery: policy           1 file(s)   120 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            3 file(s)   206 test(s) gate=test > test:setup
discovery: skills          14 file(s)   104 test(s) gate=test > test:skills
discovery: src:bin          3 file(s)   300 test(s) gate=test > test:src:bin
discovery: src:core         8 file(s)   468 test(s) gate=test > test:src:core
discovery: src:server       5 file(s)   480 test(s) gate=test > test:src:server
discovery: templates        1 file(s)    56 test(s) gate=prepublishOnly > test:templates
discovery: probe is an empty workbench; no chain containing " > " names it
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

veneer: exit 3, 74.544 s wall time.

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
discovery: journey:dark-1280 (chromium)   2 file(s)    27 test(s) gate=test > test:journey:vue
discovery: journey:dark-390 (chromium)   2 file(s)    21 test(s) gate=test > test:journey:vue
discovery: journey:light-1280 (chromium)   2 file(s)    21 test(s) gate=test > test:journey:vue
discovery: journey:light-390 (chromium)   2 file(s)    23 test(s) gate=test > test:journey:vue
discovery: policy           1 file(s)   119 test(s) gate=test > test:policy
discovery: probe            0 file(s)     0 test(s) gate=test:probe
discovery: setup            2 file(s)   149 test(s) gate=test > test:setup
discovery: setup:browser (chromium)   2 file(s)   115 test(s) gate=test > test:setup:browser
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
discovery: probe is an empty workbench; no chain containing " > " names it
discovery: tests/app/browser/integration.test.ts .skipIf(×1
discovery: tests/config.test.ts .skipIf(×4 timeout:×2
discovery: tests/distribution.test.ts .skip(×2 .runIf(×4
discovery: tests/policy.test.ts .skipIf(×1
discovery: tests/setupBrowser.test.ts timeout:×1
discovery: tests/src/styles/index.test.ts .todo(×1
```

Veneer's exit 3 reports ungated app:vue, src:bootstrap, src:styles, src:tailwindcss, and src:vue rows. The census preserves the returned `[object Object] (chromium)` project name. No veneer files were edited.

Deviations and verification limits: historical failure causes are bounded by the evidence stated earlier. Explicit `--mode test` keeps its own gate listing while sharing the default universe, so its invocation-count assertion changes from 2 to 3 to preserve arguments verbatim. An intermediate config gate recorded 1 failed, 226 passed, and 1 skipped because the skill changes made `host.json` stale; regeneration repaired it before the complete final gate chain. No timeout budget was raised. No subagent was spawned, and nothing was pushed or published. Final `git status --porcelain` is empty.
