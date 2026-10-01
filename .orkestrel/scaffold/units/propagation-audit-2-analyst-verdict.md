# Propagation audit 2 — objective verdict

The generated configuration proof rejects supported sheet-only selections, and the setup mirror accepts a commented import as coverage. Guide parity passes but does not detect those failures.

Executor: analyst, GPT-6 Astra. No subagents. The audit covers the working tree read on 2026-10-01.

## Starting diff

The starting `git diff --stat` reading follows. The closing reading is identical.

```text
 .../orkestrel-harden/references/centralization.md  |    4 +-
 .agents/skills/orkestrel-journey/SKILL.md          |   79 +-
 .../orkestrel-journey/references/captures.md       |    6 +-
 .../skills/orkestrel-journey/references/decide.md  |    6 +-
 .../skills/orkestrel-journey/references/layer.md   |   10 +-
 .../orkestrel-journey/references/statechart.md     |    6 +-
 .../skills/orkestrel-journey/references/styles.md  |   18 +-
 .claude/rules/application.md                       |   26 +-
 .claude/rules/architecture.md                      |    4 +-
 .claude/rules/browser.md                           |    9 +
 .claude/rules/documentation.md                     |    3 +-
 .claude/rules/styles.md                            |   36 +-
 .claude/rules/tests.md                             |   25 +-
 .claude/rules/workspace.md                         |  226 +++--
 .claude/skills/orkestrel-journey/SKILL.md          |    2 +-
 .oxlintrc.json                                     |  148 ++-
 .prettierignore                                    |    2 +-
 AGENTS.md                                          |    8 +-
 configs/helpers.ts                                 |  166 +++-
 configs/policy.ts                                  |  125 +--
 configs/src/vite.bin.config.ts                     |    5 +-
 configs/src/vite.core.config.ts                    |   12 +-
 guides/README.md                                   |   14 +-
 guides/scaffold.md                                 |  577 ++++++++---
 host.json                                          |   52 +-
 src/bin/CLI.ts                                     |   47 +-
 src/bin/constants.ts                               |   12 +
 src/bin/helpers.ts                                 |  128 +++
 src/bin/types.ts                                   |    7 +
 src/core/compilers.ts                              |  852 +++++++++++++---
 src/core/constants.ts                              |   70 +-
 src/core/factories.ts                              |    3 +
 src/core/parsers.ts                                |   34 +-
 src/core/templates.ts                              |  638 +++++++++++-
 src/core/types.ts                                  |   57 +-
 src/core/validators.ts                             |   99 ++
 tests/config.test.ts                               | 1014 +++++++++++++++++++-
 tests/distribution.test.ts                         |  224 ++++-
 tests/guides.test.ts                               |  928 +++++++++++++++++-
 tests/policy.test.ts                               |   11 +
 tests/setup.ts                                     |    3 +
 tests/setupPolicy.test.ts                          |  273 +++++-
 tests/setupPolicy.ts                               |  301 +++++-
 tests/setupServer.test.ts                          |   48 +-
 tests/setupServer.ts                               |   41 +-
 tests/src/bin/CLI.test.ts                          |  287 +++++-
 tests/src/bin/helpers.test.ts                      |  119 +++
 tests/src/core/compilers.test.ts                   | 1003 +++++++++++++++++--
 tests/src/core/constants.test.ts                   |    5 +
 tests/src/core/factories.test.ts                   |    3 +
 tests/src/core/parsers.test.ts                     |   33 +-
 tests/src/core/templates.test.ts                   |  176 +++-
 tests/src/core/validators.test.ts                  |   54 ++
 vite.config.ts                                     |   50 +-
 54 files changed, 7295 insertions(+), 794 deletions(-)
```

## Claims

| Claim | Status | Deciding evidence and smallest correction where broken |
| --- | --- | --- |
| 1. First-round rulings closed | CONFIRMED | The removed machinery flag and documented recipe members are in `src/core/types.ts:140` and `src/core/types.ts:30`. `src/bin/CLI.ts:1367` uses `blocking: writing`; the aligned-audit and writing-refusal case at `tests/src/bin/CLI.test.ts:154` passed. `configs/policy.ts:842` gates object methods/accessors by their literal position and preserves the `MethodDefinition` exemption. The admitted/local-binding twins at `tests/config.test.ts:1426` passed. The occupied-axis, repeated-extension, advisory, empty-barrel, recipe, and setup-optimization controls at `tests/src/core/compilers.test.ts:265` through its adjacent cases passed. The source projections retain `resolveExternal`, remove the themes alias, and omit an empty `check:src`; `src/bin/helpers.ts:990` supplies `targetToFacts`, `src/bin/types.ts:62` documents creation, and `src/core/validators.ts:179` derives `isSurface` from `SURFACES`. Global-seed/proof controls at `tests/src/core/templates.test.ts:810` and `tests/src/bin/CLI.test.ts:3182` passed. Reintroducing the duplicate flag, changing the migration question to blocking, accepting the local-binding twin, or restoring the retired recipe keys contradicts these assertions. |
| 2. Vue follows the extension | CONFIRMED | `src/core/compilers.ts:367` derives source and application faces separately and selects the root Vue checker only for an occupied application Vue face. The axis matrix at `tests/src/core/compilers.test.ts:265` checks absent, source-only, application-only, and combined occupancy across dependencies, aliases, wrappers, scripts, exports, source, and tests. It passed. Making the root checker depend on source-only Vue would fail its explicit `axes.includes('app')` expectation; adding Vue to the base browser dependencies would fail the extension-free controls. |
| 3. Styles surface | BROKEN | The seeds and projections exist, including partial barrels, setup siblings, and the themes-only tokens dependency: `src/core/templates.ts:1497`, `src/core/templates.ts:1508`, `src/core/compilers.ts:1545`, and `src/core/compilers.ts:1813`. Their generated configuration proof nevertheless fails for supported standalone selections. The actual vendored alias case throws for a styles-only workspace at `tests/config.test.ts:476`; the themes-only selection also fails at `tests/config.test.ts:239` with `Missing script build:src:styles`. Reproduction A ran those cases in generated scratch workspaces and retained a passing core-plus-styles-plus-themes control. Correct the alias population to include sheet faces and permit a genuinely alias-free themes-only workspace. Check standalone `build:src:themes` when the base face is absent; require relative build order only when both targets exist. Add those generated configurations to the regression population. |
| 4. Vue faces | CONFIRMED | `configs/helpers.ts:408` admits Node/fleet imports, declared peer subpaths, and normalized sibling paths; it refuses an implementation scope before peer admission and returns false for workspace aliases. `tests/config.test.ts:2920` attacks bare/subpath peer admission, a peer-prefix near miss, Windows sibling spelling, both refusal messages, and an implementation-scope package explicitly listed as a peer. All passed. The real-linter matrix also passed both Vue import directions and the executable restrictions. Removing the scope-first refusal would fail the explicit `@vue/runtime-core` peer control. |
| 5. Modes | CONFIRMED | `src/core/templates.ts:457` replaces journey include/exclude/provide fields after choosing the application. `src/core/templates.ts:485` places the stamp plugin after the single-file plugin, preserves the root showcase directory, and renames the written page in `writeBundle`. `src/core/compilers.ts:367` emits the selected mode scripts and publishing rebuild chain. A fresh generated workspace loaded the actual showcase and journey wrappers in development, production, test, browser, and Vue modes using real installed dependencies; the probe passed its output-root, application-root, inclusion, exclusion, provided-value, and undeclared-mode assertions. Undefined-mode fallback and inherited-name refusal passed at `tests/config.test.ts:2856`. Digest vectors, repeat-stamp rejection, malformed stamps, and a malformed closing-head line passed at `tests/config.test.ts:2873` and `tests/config.test.ts:2889`. The arrival seed at `src/core/templates.ts:1559` asserts the heading, exact refusal, resolved display and viewport per variant, and capture paths under the flag. Removing the development fallback or accepting the duplicate stamp contradicts the executed controls. Full packed-adopter execution is addressed separately in claim 12. |
| 6. Real lint matching | CONFIRMED | `tests/config.test.ts:2371` runs every isolated configured pattern through the installed binary; `tests/setupPolicy.ts:3846` requires a debugger diagnostic for every fixture, preventing an uncollected file from reading as admission. The test collects all mismatches before asserting and proves the assertion rejects disabled restrictions at `tests/config.test.ts:2490`. The complete case and the environment matrix at `tests/config.test.ts:2510` passed. Fresh scheme, dot-segment, and sheet-alias pairs independently produced the refusal/admission readings in reproduction C. The final override uses the anchored root glob `./*.{cjs,cts,js,mjs,mts,ts}` alongside its explicitly named tests/configs/scripts populations; it does not replace nested environment restrictions. |
| 7. Vendored proofs enumerate from the tree | BROKEN | Tree enumeration and the advertised mutation controls are present: `tests/setupPolicy.ts:3749`, `tests/setupPolicy.ts:3767`, `tests/setupPolicy.ts:3805`, `tests/config.test.ts:112`, `tests/config.test.ts:245`, `tests/config.test.ts:2510`, `tests/config.test.ts:3386`, and `tests/config.test.ts:2889`. However, reproduction A disproves the claimed conditional-population behavior. Independently, `tests/setupPolicy.ts:539` scans shared-proof imports with a regex that matches inside block comments. Reproduction B leaves an exporting setup module uncovered but returns no violations. The existing controls at `tests/setupPolicy.ts:2735`, wired by `tests/policy.test.ts:61`, do not distinguish a real import from commented text. Correct the configuration cases as in claim 3. Read actual import/export declarations through the already available Vite parser, and add a commented-import control while retaining the real shared import, sibling proof, augmentation, and inventory-vendoring admissions. |
| 8. Identity and vendoring | CONFIRMED | The checkout audit reported no non-aligned content-owned configuration; its exact metadata projection is quoted in reproduction D. Its exit was 1 because the result also contained drift outside that bounded configuration claim. The independently rerun inventory case at `tests/config.test.ts:1202` passed. `configs/helpers.ts:1` imports only Vite and `node:` modules. `src/core/templates.ts:1483` and the other template tables contain data, with generated behavior held as text. `vite.config.ts:340` retains the probe factory, and the successful fresh probes demonstrate collection through it. Altering a vendored digest is detected by the inventory case; deleting the probe project prevents the named probe commands from collecting. |
| 9. Contract, derivation, and creation | CONFIRMED | `src/core/validators.ts:205` composes extension guards from the declared contract primitives; `src/core/parsers.ts:29` accepts guard-valid values before parsing text and validates the resulting candidate. Hostile-input and round-trip tests passed in the validator/parser files. `src/bin/CLI.ts:968` reads the physical facts and every additional marker into the derived blueprint. Marker presence/absence controls passed in `tests/src/bin/helpers.test.ts:166` and `tests/src/bin/CLI.test.ts:2139`. Creation refusals and the unknown `--surfaces` option passed in the CLI/helper cases. The controls distinguish absent markers from present markers, malformed extension text from supported text, and creation validation from the advisory compiler questions. |
| 10. Rules and guide agree with the tree | BROKEN | `npm run test:guides` passed, including Surface/doc parity, but `guides/scaffold.md:1311` claims the vendored proof requires a nonempty population only when a marker exists. Reproduction A contradicts that sentence. The root-setup enforcement claim also exceeds the regex implementation exposed by reproduction B. The requested assertion attacks had different outcomes: removing the development fallback breaks the executed resolver assertion at `tests/guides.test.ts:999`; changing the digest algorithm breaks the vectors at `tests/guides.test.ts:1009`; deleting the emitted journey's actual refusal assertions while retaining its family declaration, imports, mount, and heading text is invisible to the journey-content assertions at `tests/guides.test.ts:1074`. Those assertions inspect source strings and do not execute the refusal behavior claimed at `guides/scaffold.md:1295`. Correct the instruments from claims 3 and 7 and add a behavioral or mutation-sensitive assertion for the journey sentence. Retain the passing parity and resolver/digest controls. |
| 11. Placement and shape | CONFIRMED | The added package contracts at `src/core/types.ts:6` and `src/bin/types.ts:73` use readonly, single-word members. The added projections, guards, parser, and factory changes remain in their kind files and are exposed through the star-only barrel at `src/core/index.ts:1`. Their doc paragraphs passed guide parity; their behavioral cases passed in the corresponding files. The policy literal climb at `configs/policy.ts:519` stops at bindings, spreads, computed keys, and function bodies; its admitted/refused syntax controls passed. Scoped Oxlint over added source, configuration, and proof files and the root TypeScript check both exited 0. Configuration leaves retain the explicit placement exception in `.claude/rules/workspace.md:66`; template strings do not introduce runtime functions into `templates.ts`. The added external resolver composes refusal, peer, sibling, and alias rules, and the mode factories add project/output composition rather than rename-only forwarding. |
| 12. Completeness | UNRESOLVED | Known generator gaps are the standalone configuration-proof failures, the setup-mirror comment bypass, and the journey guide assertion gap described in claims 3, 7, and 10. The complete exit criterion at `.orkestrel/scaffold/plan.md:22` additionally requires generated-workspace acceptance and a release. The packed-adopter case at `tests/distribution.test.ts:193` performs packing/installation and runs mutating build scripts; those operations are forbidden to this lane. I did not execute it or substitute the propagation-6 report for a passing run. After the identified repairs, an authorized verifier must run the complete packed-adopter/release gates and supply their bare outputs. Veneer adoption and fleet migration remain later units as the brief specifies. |

## Reproductions

### A. Supported standalone plans fail their own configuration proof

Materialize `blueprintToConfigArtifacts`, `blueprintToSourceArtifacts`, `blueprintToTestArtifacts`, and `blueprintToManifest` for these selections under `tmp/probes/`. Copy the current vendored configuration proof and leaves. Link the real checkout package into each fixture so its public import resolves; use installed ancestor dependencies, without installation.

The selections were:

- Styles fixture: `createBlueprint('paper', { src: [], styles: true, themes: true })`.
- Themes fixture: `createBlueprint('paper', { src: [], styles: false, themes: true })`.
- Control: `createBlueprint('paper', { src: ['core'], styles: true, themes: true })`.

Run from each generated directory:

```text
node ../../../node_modules/vitest/vitest.mjs run --config vite.config.ts --project config tests/config.test.ts -t "resolves every declared alias|loads each selected sheet and framework"
```

The deciding bare output was:

```text
propagation-styles — exit 1
Error: The workspace selects no alias target
tests/config.test.ts:476:34
Tests  1 failed | 1 passed | 197 skipped (199)

propagation-themes — exit 1
Error: Missing script build:src:styles
tests/setupPolicy.ts:3796:40
tests/config.test.ts:239:18
Error: The workspace selects no alias target
tests/config.test.ts:476:34
Tests  2 failed | 197 skipped (199)

propagation-control — exit 0
Tests  2 passed | 197 skipped (199)
```

The control reached the same assertions and passed. These failures do not show that the stylesheet seed or themes token import is invalid.

### B. A commented import satisfies the setup mirror

The probe wrote an empty `tests/setup.ts` and an uncovered `tests/setupCanvas.ts` containing `export const CANVAS = 1`. A real import from `tests/setup.test.ts` correctly produced no violation. Replacing that proof with the following text still produced no violation:

```ts
/*
import { CANVAS } from './setupCanvas.js'
*/
export {}
```

The expected mirror violation failed through the real inspector:

```text
npx vitest run --config vite.config.ts --project probe tmp/probes/propagation-mirror.test.ts
exit 1
AssertionError: expected [] to deeply equal [ ObjectContaining{…} ]

- Expected
+ Received

- [
-   ObjectContaining {
-     "path": "tests/setupCanvas.ts",
-     "rule": "mirror",
-   },
- ]
+ []

Tests  1 failed (1)
```

The real-import control passed before the commented-import assertion failed. Preserve real shared imports when correcting this bypass.

### C. Fresh real-Oxlint pairs

Each family was read from the current `src/vue` override, isolated in a scratch configuration, and applied to an actual import through `node node_modules/oxlint/bin/oxlint --no-ignore --config <scratch-config> entry.ts`.

The recorded readings were:

```text
{"family":"URL schemes","source":"web+audit:entry","exit":1}
entry.ts:1:1: error eslint(no-restricted-imports): 'web+audit:entry' import is restricted from being used by a pattern. help: imports must not use non-Node URL schemes
{"family":"URL schemes","source":"node:crypto","exit":0}

{"family":"noncanonical dot","source":"../feature/deeper/../../entry.js","exit":1}
entry.ts:1:1: error eslint(no-restricted-imports): '../feature/deeper/../../entry.js' import is restricted from being used by a pattern. help: internal import paths must not contain noncanonical dot segments
{"family":"noncanonical dot","source":"../../feature/entry.js","exit":0}

{"family":"sibling sheet","source":"@src/paper-print","exit":1}
entry.ts:1:1: error eslint(no-restricted-imports): '@src/paper-print' import is restricted from being used by a pattern. help: Vue faces must not depend on sibling sheet faces
{"family":"sibling sheet","source":"@src/browser","exit":0}
```

### D. Checkout audit and inventory

`node dist/bin/main.js audit --offline --json` exited 1. The complete JSON includes observed file bytes; the following probe output projects every non-aligned content-owned finding without those payloads:

```json
{
  "command": "node dist/bin/main.js audit --offline --json",
  "exit": 1,
  "contentDrift": [
    {
      "path": "AGENTS.md",
      "group": "docs",
      "ownership": "content",
      "drift": "stale"
    }
  ],
  "questions": []
}
```

This confirms the configuration-specific claim, not a clean whole-checkout audit.

The independent inventory rerun was:

```text
npx vitest run --config vite.config.ts --project config tests/config.test.ts -t "keeps the committed host inventory"
exit 0
Test Files  1 passed (1)
Tests  1 passed | 198 skipped (199)
```

## Executed checks

These commands were read bare. The counts are measurements from this lane's runs.

| Command | Result |
| --- | --- |
| `npx vitest run --config vite.config.ts --project config tests/config.test.ts` | Exit 0; 198 passed, 1 skipped. |
| `npm run test:guides` | Exit 0; 45 passed. |
| `npx vitest run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/templates.test.ts tests/src/core/constants.test.ts tests/src/core/factories.test.ts` | Exit 0; 348 passed. |
| `npx vitest run --config vite.config.ts --project src:bin tests/src/bin/CLI.test.ts tests/src/bin/helpers.test.ts` | Exit 0; 284 passed. |
| `npx vitest run --config vite.config.ts --project setup tests/setupPolicy.test.ts tests/setupServer.test.ts` | Exit 0; 168 passed, 3 skipped. |
| `npx vitest run --config vite.config.ts --project policy tests/policy.test.ts` | Exit 0; 118 passed. |
| `npx vitest run --config vite.config.ts --project probe tmp/probes/propagation-modes.test.ts` | Exit 0; 1 passed. Real generated wrappers; dependencies resolved from the installed veneer checkout without changing it. |
| `npx tsc --noEmit --project tsconfig.json` | Exit 0; no diagnostics. |
| `npx oxlint --config .oxlintrc.json src/core src/bin configs tests/config.test.ts tests/setupPolicy.ts tests/guides.test.ts tests/distribution.test.ts tests/setupServer.ts` | Exit 0; no diagnostics. |
| `git diff --check` | Exit 0; no output. |

No full distribution, release, or cross-platform pass is claimed.

## Findings

none

## Attacked and held

The themes barrel uses `@use '../tokens';` before `@use 'default';`, so its order statement comes from the shared tokens module without placing a CSS rule before Sass imports. The standalone failure is in the vendored proof.

The setup module containing only an indented Vitest augmentation remains outside the top-level export population, as explicitly tested at `tests/setupPolicy.test.ts:155`. The commented shared import bypass does not justify rejecting that augmentation.

## Cleanup

The closing `git diff --binary` output exactly matched the stored baseline. `git status --porcelain` matched the starting tracked modifications and retained only the pre-existing untracked `.orkestrel/scaffold/` entry. No tracked file changed.

All probe files, generated scratch workspaces, and junctions created by this lane were deleted. `rg --files --hidden tmp/probes` returned no paths, exit 1. The verdict file is this lane's only retained write.

VERDICT: FAIL 3, 7, 10, 12; outside the claims: none

