# foundation-fix-1 report

Stopped under the deviation contract. The owned repairs are implemented and their scoped commands passed, but the literal single-collection criterion requires a decision about off-limits journey projects. Final tree-wide gates were not run.

## Blocking deviation

- **Expected:** Acceptance criterion 3 requires that no test file be collected by two projects.
- **Found:** `tests/app/vue/integration.test.ts` is collected by both `journey:desktop (chromium)` and `journey:compact (chromium)`.
- **Evidence:** `node node_modules/vitest/vitest.mjs list --config configs/app/vite.journey.config.ts --mode vue --json` exited 0 and listed the same file and test under both projects. `configs/app/vite.journey.config.ts:20` declares the viewport variants; line 29 maps them to projects; line 35 gives each the same suite. The browser branch repeats this arrangement at line 63.
- **Done:** Removed duplicate setup collection from the face projects. Completed the owned changes through G7. `npm run test:journey:vue` exited 0, reporting 2 passed files and 2 passed tests.
- **Not done:** Changed neither the off-limits journey configuration nor its tests. Did not claim the literal single-collection criterion or final gates passed.
- **Hypothesis:** The criterion intended to prohibit accidental setup/face duplication while permitting deliberate viewport executions.

## Group results

| Group | Changes and evidence | Command | Exit |
| --- | --- | --- | --- |
| G1 | Formatted the roadmap table without wording changes; added the typed Vue declaration; replaced the premature cascade assertion with the named roadmap todo. | `npx oxfmt --config .oxfmtrc.json --write ROADMAP.md` | 0 |
| G1 | Root checking passes with the Vue declaration. Repeated after G4 removed static built imports, before the following build. | `npx tsc --noEmit --project tsconfig.json` | 0 |
| G1 | Bootstrap layer and version proof passes. | `npm run test:src:bootstrap` | 0 |
| G2 | Face projects include only face proofs; standalone Vue tests build browser and Vue first; config proof checks wrapper includes. | `npm run test:config` | 0 |
| G3 | Added the Vue lint override and build boundary, reverse core/server classification, and `@vue/*` refusal with legal controls. | `npm run test:config` | 0 |
| G4 | Consolidated loaders into `tests/setupServer.ts`, deleted the setup pairs, and replaced static built imports. Scratch proofs cover fresh reads, cached reads, module loading, missing-file commands, version, and root-name extraction. | `npm run test:setup` | 0 |
| G5 | Removed marker declarations while preserving layer order. Added exact Bootstrap registry/CSS set comparison and renamed-leaf/added-CSS-name controls. Updated the registry comment and deferred the Veneer token proof explicitly. | `npm run test:src:bootstrap` | 0 |
| G5 | Tailwind order and Bootstrap refusals pass. | `npm run test:src:tailwindcss` | 0 |
| G5 | Styles order and Bootstrap-layer refusal pass. | `npm run test:src:styles` | 0 |
| G5 | Vendored policy accepts the changes at this point. | `npm run test:policy` | 0 |
| G6 | Vue declarations use rollup and composed rewrites; removed the trailing declaration compiler command; set stylesheet side effects and excluded CSS-face JavaScript stubs. Read the emitted `dist/src/vue/index.d.ts`. | `npm run build:src:vue` | 0 |
| G6 | Dynamic namespace proofs pass after the standalone script builds both faces. | `npm run test:src:vue` | 0 |
| G6 | Rewriter controls and a real declaration build prove sibling specifier rewriting and preservation of a sibling declaration. | `npm run test:config` | 0 |
| G7 | Vue app config derives from `appBrowser()` and replaces its owned fields; removed duplicate alias construction. | `npm run test:config` | 0 |
| G7 | Vue application proof passes. | `npm run test:app:vue` | 0 |
| G7 | Vue viewport proofs pass, but reveal the collection conflict. | `npm run test:journey:vue` | 0 |
| G7 | Vue application builds. | `npm run build:app:vue` | 0 |

The setup run collected `tests/setupServer.test.ts` alone: 6 passed tests. The Bootstrap face run reported 2 passed tests and 1 roadmap todo; the styles face reported 1 passed test and 1 roadmap todo. The final scoped config run reported 179 passed tests and 1 existing conditional skip. Formatting of the owned files exited 0; `git diff --check` exited 0.

## Installed reuse

Read scaffold's `guides/test.md` Surface and the installed `@orkestrel/test/server` declaration surface. Neither exports a cached stylesheet reader or built-module loader. `readInventory` reads an inventory without the required cache or build-command diagnostic, so it does not replace this family.

Reused `createScratch` from `@orkestrel/test/server`, `resolveRoot` and `requireValue` from `@orkestrel/test`, and `isRecord` and `isString` from `@orkestrel/contract`. Scratch loader fixtures live under the workspace's `tmp/` and are destroyed in `finally` blocks. No dependency was installed.

## Rewriter decision and naming

`declarationRollup` accepts one rewrite callback. Composed `rewriteCoreSpecifier` with the added `rewriteBrowserSpecifier`; no rollup API change was needed. The browser rewriter handles `@src/browser` and relative browser entry specifiers. A real rollup test checks both rewritten imports and an unchanged sibling declaration, with an unrewritten build as its control.

Kept the brief's required helper and constant names. Named the sole internal map `ARTIFACT_CACHE` because it holds both stylesheet text and module namespaces. Named the namespace `namespace`, the resolved file `target`, and the altered registry `renamed`; no public registry keys or values changed.

## Other deviations and limits

- G1's static-import replacement and build-independent typecheck completed in G4, following G1's explicit assignment of that replacement to G4.
- No wrapper-include expectations existed in `tests/config.test.ts`; added a proof that loads each face wrapper and checks its include list.
- The boundary's importer-environment check already admitted `vue`; retained it and extended the owner union and target classification.
- The Bootstrap wrapper inherits the root resolver so its required `@src/core` import resolves without a duplicate alias table.
- Corrected an added config assertion that called nonexistent `createPolicyScratch().read`; the corrected proof uses `readFileSync` and passes.
- The brief prohibits whole-tree `npm run build` under Tools and limits but requests it under Close. It was not executed before the collection stop.
- No roadmap wording, off-limits source, vendored policy implementation, or dependency manifest fields outside the owned fields were edited. No sub-agents were spawned.
- Full format, lint, check, build, and test results remain unmeasured after the final changes. The scoped runs are not final gate evidence.

## Final gate exit codes

| Gate | Exit code |
| --- | --- |
| `npm run format:check` | none — not run after the stop |
| `npm run lint:check` | none — not run after the stop |
| `npm run check` | none — not run after the stop |
| `npm run build` | none — not run after the stop |
| `npm test` | none — not run after the stop |

## Files changed

`git diff --stat` exited 0 and reported:

```text
 .oxlintrc.json                         | 44 ++++++++++++++++++
 ROADMAP.md                             | 26 +++++------
 configs/app/vite.vue.config.ts         | 25 +++--------
 configs/helpers.ts                     | 35 ++++++++++++---
 configs/src/vite.bootstrap.config.ts   |  7 +--
 configs/src/vite.styles.config.ts      |  2 +-
 configs/src/vite.tailwindcss.config.ts |  5 +--
 configs/src/vite.vue.config.ts         | 41 +++++++++--------
 package.json                           | 12 +++--
 src/core/constants.ts                  |  6 +--
 src/styles/_tokens.scss                |  6 ---
 src/tailwindcss/_tokens.scss            |  6 ---
 tests/config.test.ts                   | 82 ++++++++++++++++++++++++++++++++--
 tests/setupBootstrap.test.ts           | 45 -------------------
 tests/setupBootstrap.ts                | 63 --------------------------
 tests/setupStyles.test.ts              | 60 -------------------------
 tests/setupStyles.ts                   | 43 ------------------
 tests/setupTailwindcss.test.ts         | 62 -------------------------
 tests/setupTailwindcss.ts              | 43 ------------------
 tests/setupVue.test.ts                 | 35 ---------------
 tests/setupVue.ts                      | 59 ------------------------
 tests/src/bootstrap/index.test.ts      | 55 ++++++++++++++++++++---
 tests/src/styles/index.test.ts         | 24 +++++-----
 tests/src/tailwindcss/index.test.ts    | 18 ++++----
 tests/src/vue/index.test.ts            | 20 ++++++---
 25 files changed, 295 insertions(+), 529 deletions(-)
```

The status also lists added `app/vue/vue.d.ts` and untracked `tests/setupServer.ts` and `tests/setupServer.test.ts`, which ordinary `git diff --stat` omits. `git status --porcelain` exited 0 and listed only owned paths. The report is saved at `tmp/units/foundation-fix-1-report.md`.
