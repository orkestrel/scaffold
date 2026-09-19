# Unit S2 — report (round 2 brief, stopped on the lint restriction; superseded by s2-brief-3.md)

Thread `01a0b060-6ac2-7931-9bba-40dfcbe67f0f`, journal `tmp/codex/s2.jsonl` (swept at acceptance), 598 s. The stop is a real conflict: `.oxlintrc.json` (vendored to every workspace) forbids importing `typescript` under `tests/**` because the in-process compiler API is not a surface the fleet uses. Orchestrator ruling: the lint policy stands; the successor replaces the compiler API with a declaration-file walker over the export forms tsc emits, and a fence-import parser that strips comments, keeping everything else this round landed.

S2 stopped under the brief's deviation contract. The implementation is partial and is not ready for acceptance.

Expected: the brief permits TypeScript's compiler API because `typescript` belongs to `BASE_DEV_DEPENDENCIES`. Found: `.oxlintrc.json:437-451` applies a `no-restricted-imports` rule to tests that rejects that API. The scoped lint command reports:

```text
tests/setupPolicy.ts:21:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
```

The lint configuration is outside the owned files. No restriction was changed or suppressed. Work stopped when this conflict surfaced; no alternative declaration walker was implemented.

The selected reader uses TypeScript 6.0.3: `resolveModuleName` with Bundler resolution and ESNext imports, followed by `createProgram` and `checker.getExportsOfModule`. It reads declarations without importing the runtime entry. The probe command `node tmp/probe/s2-declarations.mjs` confirmed these installed entries from `@orkestrel/test` 0.0.16:

- `node_modules/@orkestrel/test/dist/src/core/index.d.ts` exports `waitForCondition`.
- `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` exports `clickAccessible`.
- The planted `s2MissingBinding` name is absent from each entry, and `@orkestrel/test/missing` does not resolve.

The implementation reuses the installed guide package's Markdown fence reader. The probe showed that its `extractFenceImports` helper omits a named binding preceded by a comment, so the implementation uses TypeScript's import parser. Scoped unit proofs cover declaration re-exports, aliases, exports-map restrictions, missing declarations, nested fences, and exclusion of prose, table cells, comments, and quoted import text. The probe remains under `tmp/probe/` as evidence.

Out-of-base ruling: reject the package. Generated workspaces need not install a package outside `BASE_DEV_DEPENDENCIES`; silently skipping it would leave its taught symbols unchecked. S2-C4 uses `@orkestrel/contract`, which is installed in this checkout but is outside that base set.

The sweep reads named Orkestrel value and type imports in fences in `SKILL.md` and its named references. It checks exported names, not call signatures or runtime behavior. Prose, table cells, indented code, default imports, namespace imports, and non-Orkestrel imports are outside the check. The reader's TSDoc, documentation rule, and scaffold guide state the coverage and limits.

The following control measurements use command P:

```text
npm.cmd run test:policy -- -t 'unexported|exported value and type|outside the base'
```

| Control | Test | Failing before | Passing after |
| --- | --- | --- | --- |
| S2-C1 | rejects an unexported value binding in a skill fence | 1 | 1 |
| S2-C2 | rejects an unexported type binding in a skill fence | 1 | 1 |
| S2-C3 | accepts exported value and type bindings from root and browser entries | 0; already passed | 1 |
| S2-C4 | rejects a fenced package outside the base dependency set | 1 | 1 |
| S2-C5 | reports an unexported binding against its named reference file | 1 | 1 |
| S2-C6 | deletion verified with `npm.cmd run test:src:core` | 0 at baseline | Not run after deletion |

Command P reported 4 failed, 1 passed, and 102 skipped before implementation, with exit 1. The same command reported 5 passed and 102 skipped afterward, with exit 0. Exact violation arrays assert the file, specifier, and missing binding. S2-C3 has no mutation-based red measurement.

Deleted: `tests/src/core/compilers.test.ts` case “refuses the Vitest invocation record a project row is called with,” including its unused root-configuration import and the associated comment text. Surviving proof: `tests/config.test.ts` case “keeps Vitest invocation fields out of project configurations.” Reading confirmed that the surviving case drives every registered callable project factory with the invocation sentinel. Its planted factory returns the sentinel fields and must make the assertions throw. That file was not changed or executed during this unit.

The following gate results were measured on Windows on 2026-09-17. The baseline was `4c4edd93`; initial status contained only the untracked `.orkestrel/campaign/` directory.

| Command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run test:policy` | 0 | Baseline: 102 passed |
| `npm.cmd run test:setup` | 0 | Baseline: 119 passed, 3 skipped |
| `npm.cmd run test:src:core` | 0 | Before deletion: 422 passed |
| Command P | 1, then 0 | Control totals stated in the preceding paragraph |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t 'readSkillExports\|inspectSkillImports'` | 1 | Shell quoting failure; no tests collected |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t Skill` | 1, then 0 | Initially 1 failed, 7 passed, 33 skipped; after correcting the declaration fixture, 8 passed, 33 skipped |
| `npm.cmd run check` | 0 | Root, core, server, and bin typechecks passed before the deletion and final fixture correction; no test totals |
| Scoped formatter command F | 1 | Formatting issues in `tests/setupPolicy.ts` and `tests/setupPolicy.test.ts` |
| Scoped lint command L | 1 | Restricted TypeScript import, conditional expectation, and shadowed `entry` binding |

The failed declaration fixture used an ambient declaration that TypeScript included among exports. Replacing it with an explicit export list made the fixture express the intended hidden declaration; the reader did not change.

Command F was:

```text
node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/setupPolicy.test.ts tests/policy.test.ts tests/src/core/compilers.test.ts .claude/rules/documentation.md guides/scaffold.md
```

Command L was:

```text
node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/setupPolicy.test.ts tests/policy.test.ts tests/src/core/compilers.test.ts .claude/rules/documentation.md guides/scaffold.md
```

Not closed: the import restriction, the remaining lint diagnostics, formatting, final typechecking, the full post-change policy and setup suites, the post-deletion core suite, and `npm.cmd run test:guides`. The real skill family passed only at baseline; its post-change sweep remains unverified. No whole test chain, build, or inventory proof ran. `host.json` and `dist/host` remain unregenerated as the brief requires.

Least-certain claims: portability beyond the measured Windows host; complete import coverage beyond the exercised fence forms; the positive control's ability to detect an over-rejecting reader; and post-deletion suite health. None is claimed as accepted.

The modified tracked files are the owned documentation rule, scaffold guide, policy proof, policy setup module, policy setup proof, and compiler proof. No commit, push, install, or off-scope edit was made. The `prove` MCP tool was unavailable under the brief's stated restriction; no receipt is claimed. Bench journal: `tmp/codex/s2.jsonl`; session: `01a0b060-6ac2-7931-9bba-40dfcbe67f0f`.