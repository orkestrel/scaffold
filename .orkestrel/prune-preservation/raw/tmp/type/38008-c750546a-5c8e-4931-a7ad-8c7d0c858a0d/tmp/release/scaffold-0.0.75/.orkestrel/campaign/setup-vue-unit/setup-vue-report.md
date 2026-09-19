# Generated Vue browser setup repair

The root compiler emits `plugins: [vue()]` on the `setupBrowser` factory when the existing `ViteMachinery.vue` selection is true. Source is frozen for independent audit and the Orchestrator's rebuilt consumer run. This report does not accept the unit.

## Scope and baseline

The effective brief is `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/setup-vue-fix-brief.md`. The writing checkout is `C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75`, on `recovery/scaffold-0.0.75`, committed baseline `dc98373d5872d7a1d4a4337e2bce64be0ab70097`. Initial Git status was clean. Preserve other checkouts, manifest pins, user Codex changes, orchestration, rules, skills, wrapper ownership, and unrelated runtime behavior.

The unit used the package-hardening capability lane and its contract, centralization, and hardening references. The public contract remains unchanged. No shared-file patch is requested. The writer installed nothing and ran no build, tree-wide mutating gate, commit, push, or publish.

## Capability evidence

| Capability | Change and evidence |
| --- | --- |
| Application Vue browser setup | The browser template carries a conditional plugin span. The compiler fills that span from `machinery.vue`. The installed consumer regression imports `SetupComponent.vue` through `tests/setupBrowser.ts`, mounts through Vue `createApp`, and checks the rendered DOM in Chromium. Its red is retained; its rebuilt green is an outstanding parent command. |
| Non-Vue browser setup | The compiler fills the plugin span with empty text when the app/browser pipeline is absent. The selection pin checks standalone browser setup and src/browser setup carry no Vue call/import/dependency. Formatter cases exercise those selections. |
| Existing root selection | `blueprintToMachinery`, root imports, dependency selection, public types, runtime selection, and `mergeOverride` are unchanged. `setupBrowser` still returns `mergeOverride(project, override)`. The Node-only selection pin checks the browser factory and Vue import remain absent. |
| Discovery, configs, formatting, guide | Existing compiler/template suites pass. The template formatter corpus includes browser application setup, browser library setup, and standalone browser setup. The guide documents the selected Vue behavior; guide parity passes. |

## Defect red and green

The Orchestrator ran the installed consumer before the source repair. The exact command was:

```text
npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t "renders a Vue SFC through the generated browser setup project"
```

The run exited 1 and reported `Tests 1 failed | 7 skipped (8)`, duration `30.03s`. The log is `tmp/setup-vue-consumer-red.log.txt` in this checkout. The inner Chromium run imported the setup helper and failed Vite import-analysis at the component's `</script>` because the setup project lacked the Vue transform. The outer collected regression failed its exit-code assertion. The source remained at baseline until the Orchestrator returned that reading.

The generated host came from the actual packed baseline artifact through `installPackedScaffold` and `installGeneratedWorkspace`, using `createBlueprint('proof', { app: ['browser'], setup: ['browser'] })`. The regression writes its real component and paired setup proof only after that generated workspace has installed. It launches the generated Vitest entry through the installed `@orkestrel/process` `executeSync` export and selects `setup:browser`. Scratch cleanup runs in `finally`. The red host was under the system temporary directory with the `scaffold-vue-setup-install-` prefix.

The compiler selection regression ran before and after the source edit with the same command:

```text
npm.cmd run test:src:core -- tests/src/core/compilers.test.ts -t "selects Vue for browser setup only when the browser application selects it"
```

The red exited 1 and reported `Tests 1 failed | 129 skipped (130)`. The green exited 0 and reported `Tests 1 passed | 129 skipped (130)`. The red asserted the missing `setupBrowser` Vue plugin; the green also executed its no-Vue boundary assertions.

## Probe receipt and limits

The `probe` MCP tool checked candidate drafts of the actual compiler and browser template under `configs/src/tsconfig.core.json`. Its focused runtime case asserted the selected setup Vue plugin. The control replaced the compiler draft with its baseline while retaining the candidate template. Candidate type/lint/runtime stages reported no issue. Control type/lint stages passed, and its named runtime assertion failed. The persistent compiler pin carries that assertion and the boundary assertions.

The closing line is:

```text
receipt probe:a7d202bf232f569af64d9d0e8edb5e53:runtime:typescript@6.0.3:oxlint@1.83.0:vitest@4.1.11:configs/src/tsconfig.core.json@8e9a45d777a98c3ae5e45e4bd78032fb
```

This receipt covers compiler/template drafts and conditional emission. It does not prove the installed Chromium consumer. That claim requires the real packed and installed consumer run, outside the tool's stages. The retained original consumer red is the omission control for that regression.

## Scoped validation

The commands ran in the writing checkout on Windows, 2026-09-18:

```text
npm.cmd run test:src:core -- tests/src/core/compilers.test.ts tests/src/core/templates.test.ts
```

Exit 0; `Tests 163 passed (163)`, duration `21.17s`. The expected malformed-peer config-load rejection printed its existing Vite warning. The suites passed.

```text
npm.cmd run test:guides
```

Exit 0; `Tests 23 passed (23)`, duration `4.06s`.

```text
node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check src/core/compilers.ts src/core/templates.ts tests/distribution.test.ts tests/setupServer.ts tests/src/core/compilers.test.ts tests/src/core/templates.test.ts guides/scaffold.md
node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings src/core/compilers.ts src/core/templates.ts tests/distribution.test.ts tests/setupServer.ts tests/src/core/compilers.test.ts tests/src/core/templates.test.ts
node node_modules/typescript/bin/tsc --noEmit -p tmp/units/tsconfig.setup-vue.json
git diff --check
```

Every command exited 0. The temporary TypeScript project extends the root config and names only the owned compiler/template/test/setup inputs. Oxfmt reported the matched files use the correct format. Oxlint and TypeScript printed no diagnostic.

The overlap inspection used installed declarations of `@orkestrel/template` for filling the conditional span, `@orkestrel/test/server` for real scratch ownership, `@orkestrel/process/server` for executing the generated test runner, and `@orkestrel/contract` for existing guards. The release checkout resolves `@orkestrel/test` 0.0.18, `@orkestrel/template` 0.0.8, `@orkestrel/process` 0.0.13, and `@orkestrel/contract` 0.0.17. No overlapping general primitive was introduced.

## Touched paths and diffstat

The tracked source/test/guide changes are:

```text
guides/scaffold.md
src/core/compilers.ts
src/core/templates.ts
tests/distribution.test.ts
tests/setupServer.ts
tests/src/core/compilers.test.ts
tests/src/core/templates.test.ts
```

The measured diffstat is:

```text
 guides/scaffold.md               |  5 ++++
 src/core/compilers.ts            |  6 ++++-
 src/core/templates.ts            |  2 +-
 tests/distribution.test.ts       | 53 +++++++++++++++++++++++++++++++++++++++-
 tests/setupServer.ts             | 43 ++++++++++++++++++++++++++++++++
 tests/src/core/compilers.test.ts | 26 ++++++++++++++++++++
 tests/src/core/templates.test.ts |  3 +++
 7 files changed, 135 insertions(+), 3 deletions(-)
```

Git status reports exactly those tracked paths modified. Temporary unit artifacts are this report and `tmp/units/tsconfig.setup-vue.json`; the consumer red log is retained at `tmp/setup-vue-consumer-red.log.txt`. No assertion, suppression, dependency addition, deferred implementation, or wrapper was introduced.

## Outstanding parent commands

After this writer exits, rebuild the release artifact and rerun the exact installed consumer command given in the defect section. Record that same command's passing measurement and log beside its red. Then dispatch the independent audit and authoritative full release chain. The least certain claim is the repaired packed consumer's Chromium result: the unit has retained its red and conditional-emission green, but the post-rebuild installed run has not executed during this writer's turn. Linux gates were not run.
