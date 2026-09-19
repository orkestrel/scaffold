S2's required gates pass. The restricted TypeScript import is replaced with Vite's Oxc parser. The separate inventory proof reports the stale vendored hashes the brief anticipated. Independent acceptance remains with the Orchestrator.

The baseline was `a8bb50d8` on Windows on 2026-09-17. Initial `git status --short` showed only the untracked `.orkestrel/campaign/` directory. This unit changes `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`, and `guides/scaffold.md`. The documentation rule and duplicate-test deletion already belong to the checkpoint.

The selected reading uses `parseSync` from `vite`, already imported by the vendored module. `readSkillExports` reads exact keys in the installed package's exports map, selects explicit declaration paths through `types`, `import`, and `default`, and reads declarations without loading runtime entries. The installed `@orkestrel/test` version is `0.0.16`. Its `dist/src/core/index.d.ts` supplies `waitForCondition` and `WaitOptions`; its `dist/src/browser/index.d.ts` supplies `clickAccessible` and `CaptureVariant`. The unit proofs exercise those installed entries and report `@orkestrel/test/missing` as lacking an installed declaration entry.

The probe `node tmp/probe/s2-oxc.mjs` confirms the installed declaration forms and that Oxc preserves a named import preceded by a comment. Its initial fixture failed because a semicolon after an ambient class body is invalid; correcting the fixture produced exit 0. The installed guide package supplies Markdown fences. Its declaration extractor excludes enums, and the earlier measured fence-import helper omits commented bindings, so neither replaces the Oxc reading required by this brief.

The reader supports exported functions, variables, classes, enums, interfaces, types, local export lists, relative star exports, and named re-exports, including aliases and type forms. Fixtures exercise those forms, declaration-extension mapping, and a star cycle. Default exports, `export =`, ambient modules, namespace re-exports, non-relative re-exports, unresolved targets, and invalid syntax refuse the reading. Wildcard exports-map keys, arrays, runtime-only entries, and workspace aliases are unsupported. The reader's TSDoc states these boundaries. Local export lists are not typechecked, and ambiguous star exports are not resolved semantically.

The sweep reads named Orkestrel value and type imports in Markdown fences in `SKILL.md` and its named references, including nested fences, aliases, comments, and multiline imports. Prose, table cells, indented code, default bindings, namespace bindings, and non-Orkestrel imports are outside its coverage. It checks names, not signatures or runtime behavior. The documentation rule and guide state that taught symbols belong in import fences. The real skill family passes unchanged; its taught APIs still appear outside the checked import population until S3 adds the fences.

Out-of-base ruling: reject the package. A generated workspace need not install a package outside `BASE_DEV_DEPENDENCIES`, so skipping it would leave the taught API unchecked. S2-C4 pins this with the installed but out-of-base `@orkestrel/contract` package.

The control commands are:

```text
P: npm.cmd run test:policy -- -t 'unexported|exported value and type|outside the base'
Q: npm.cmd run test:policy -- -t 'exported value and type'
D: npm.cmd run test:setup -- tests/setupPolicy.test.ts -t 'reads declaration forms'
```

The controls have these measurements. The earlier negative-control readings are retained from `tmp/codex/s2-report-2.md`, as the successor brief directs; the passing readings were repeated against Oxc.

| Control | Proof | Command | Failed before | Passed after |
| --- | --- | --- | --- | --- |
| S2-C1 | rejects an unexported value binding in a skill fence | P | 1, earlier run | 1 |
| S2-C2 | rejects an unexported type binding in a skill fence | P | 1, earlier run | 1 |
| S2-C3 | accepts exported value and type bindings from root and browser entries | Q | 1, with `waitForCondition` omitted from the reader's result | 1, omission removed |
| S2-C4 | rejects a fenced package outside the base dependency set | P | 1, earlier run | 1 |
| S2-C5 | reports an unexported binding against its named reference file | P | 1, earlier run | 1 |
| S2-C6 | core suite after deleting the duplicated refusal case | `npm.cmd run test:src:core` | 0; earlier pre-deletion run had 422 passed | 421 |

Command P originally reported 4 failed, 1 passed, and 102 skipped, exit 1. Its Oxc run reports 5 passed and 102 skipped, exit 0. Command Q reports 1 failed and 106 skipped with the omission, exit 1, then 1 passed and 106 skipped after restoration, exit 0. Command D reports 1 failed and 52 skipped with enum support removed, exit 1, then 1 passed and 52 skipped after restoration, exit 0. All mutations are removed.

Deleted at the checkpoint: `tests/src/core/compilers.test.ts` case “refuses the Vitest invocation record a project row is called with.” Surviving proof: `tests/config.test.ts` case “keeps Vitest invocation fields out of project configurations.” Reading the deleted case and surviving case confirms that each drives every registered callable project factory with the invocation sentinel. The surviving proof adds a factory returning the sentinel fields and requires the assertions to throw. Its focused execution passes. `tests/config.test.ts` remains unchanged.

The gate measurements are:

| Command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run test:policy` | 0 | Baseline: 107 passed; final: 107 passed |
| `npm.cmd run test:setup` | 0 | Baseline: 127 passed, 3 skipped; final: 139 passed, 3 skipped |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t Skill` | 0 | 20 passed, 33 skipped |
| `npm.cmd run check` | 0 | Root, core, server, and bin typechecks pass, including the final run; no test totals |
| Formatter command F | 0 | Every specified file passes |
| Lint command L | 1, then 0 | Initial callback-shadow warnings corrected; final run has no diagnostics |
| `npm.cmd run test:src:core` | 0 | 421 passed |
| `npm.cmd run test:guides` | 0 | 23 passed |
| `npm.cmd run test:config -- -t 'keeps Vitest invocation fields'` | 0 | 1 passed, 173 skipped |
| `npm.cmd run test:config -- -t 'keeps the committed host inventory'` | 1 | 1 failed, 173 skipped; expected stale inventory observation |
| `git diff --check` | 0 | No whitespace errors |

The scoped formatting and lint commands were:

```text
F: node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/setupPolicy.test.ts tests/policy.test.ts tests/src/core/compilers.test.ts .claude/rules/documentation.md guides/scaffold.md
L: node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/setupPolicy.test.ts tests/policy.test.ts tests/src/core/compilers.test.ts .claude/rules/documentation.md guides/scaffold.md
```

The inventory proof reports: `The committed host inventory is stale at .claude/rules/documentation.md, guides/scaffold.md, tests/policy.test.ts, tests/setupPolicy.ts`. Inventory regeneration and `dist/host` regeneration remain the Orchestrator's build step. No required criterion remains unclosed in this executor's measurements. The whole `npm.cmd test` chain and build were not run. No commit, push, installation, dependency change, or off-limits tracked edit was made.

Least-certain claims: portability beyond this Windows run, import coverage for syntactically invalid fences, and semantic correctness of local export lists or ambiguous star exports. The executed controls prove the documented syntax inventory and diagnostics; they do not establish those broader claims. The `prove` MCP tool was blocked by the dispatch, so no receipt is claimed.

Bench journal: `tmp/codex/s2-3.jsonl`. Session: `01a0b06b-6e6d-7381-9cba-3e4e4e80af57`.