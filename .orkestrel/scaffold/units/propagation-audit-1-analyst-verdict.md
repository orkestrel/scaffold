# Propagation audit 1 — objective verdict

The audit stopped under the brief's deviation contract after parallel edits reached the evidence. The starting snapshot has substantiated failures in claims 7, 9, and 10. Claims 4, 5, 6, and 8 require a quiescent reading before acceptance.

## Starting diff

The starting `git diff --stat` reading was:

```text
 .../orkestrel-harden/references/centralization.md  |   5 +-
 .agents/skills/orkestrel-journey/SKILL.md          |  79 ++--
 .../orkestrel-journey/references/captures.md       |   6 +-
 .../skills/orkestrel-journey/references/decide.md  |   6 +-
 .../skills/orkestrel-journey/references/layer.md   |  10 +-
 .../orkestrel-journey/references/statechart.md     |   6 +-
 .../skills/orkestrel-journey/references/styles.md  |  18 +-
 .claude/rules/application.md                       |  26 +-
 .claude/rules/architecture.md                      |   2 +-
 .claude/rules/browser.md                           |   8 +
 .claude/rules/documentation.md                     |   3 +-
 .claude/rules/styles.md                            |  36 +-
 .claude/rules/tests.md                             |  25 +-
 .claude/rules/workspace.md                         | 211 +++++----
 .claude/skills/orkestrel-journey/SKILL.md          |   2 +-
 .oxlintrc.json                                     | 116 +++++
 AGENTS.md                                          |   8 +-
 configs/helpers.ts                                 |  97 +++-
 configs/policy.ts                                  |  95 ++--
 configs/src/vite.core.config.ts                    |  12 +-
 guides/README.md                                   |  13 +-
 guides/scaffold.md                                 | 429 +++++++++++++----
 host.json                                          |  46 +-
 src/bin/CLI.ts                                     |  41 +-
 src/bin/constants.ts                               |  12 +
 src/bin/helpers.ts                                 | 130 ++++++
 src/bin/types.ts                                   |   4 +
 src/core/compilers.ts                              | 514 +++++++++++++++++++--
 src/core/constants.ts                              |  70 ++-
 src/core/factories.ts                              |   3 +
 src/core/parsers.ts                                |  25 +-
 src/core/templates.ts                              | 397 +++++++++++++++-
 src/core/types.ts                                  |  50 +-
 src/core/validators.ts                             |  48 ++
 tests/config.test.ts                               | 235 +++++++++-
 tests/guides.test.ts                               | 450 +++++++++++++++++-
 tests/setup.ts                                     |   3 +
 tests/src/bin/CLI.test.ts                          | 149 +++++-
 tests/src/bin/helpers.test.ts                      | 119 +++++
 tests/src/core/compilers.test.ts                   | 423 ++++++++++++++++-
 tests/src/core/constants.test.ts                   |   2 +
 tests/src/core/factories.test.ts                   |   3 +
 tests/src/core/parsers.test.ts                     |  31 +-
 tests/src/core/templates.test.ts                   |  81 +++-
 tests/src/core/validators.test.ts                  |  45 ++
 vite.config.ts                                     |   4 +-
 46 files changed, 3610 insertions(+), 488 deletions(-)
```

## Evidence boundary

Intermediate hash readings matched the starting values, including the reading before runs D and E. A later hash reading detected these changes:

| File | Starting SHA-256 | Later SHA-256 |
| --- | --- | --- |
| `src/core/templates.ts` | `8840ADCD87BD084F1FAFA80F147DC692A94DC5F886B1E1380444CAC7E52D9D82` | `1C4D4F508AD31993CA67FC2477B9801A0961AF31BD100C44034C7D0E2054E21E` |
| `configs/helpers.ts` | `3EB8EE48607E3F6DF093B01312CD8A743C57216C0524BD4F59B9FB05AEE95735` | `794D7A4BD2F07AE5A7E2B3469861EE893B556B31DC34792BC7E5FFF9DABA1443` |
| `.prettierignore` | `5289B99377A44A49D7C223FF8441A076082660B6D9CB0E77ADA9A6C638BFDF3C` | `FA3C916DE6F5D2A4C07EE65281DA26D21ACA8DB9974EC6199536FC7C36070E52` |

The changes reach emitted configurations and seeds in claims 4–6, vendoring in claim 8, and prose agreement in claim 10. Their content was not audited as a successor snapshot. The hash of `src/core/compilers.ts` remained `2412E3CCFBB68A8DF2CDFC784959DBE94A621F8D82EB8815CCDBF9401CCED9AF`; the watched core tests also remained unchanged. No further tests ran after detecting the deviation.

## Executed evidence

These commands ran without output filtering. Each exited 0. The output cells reproduce their result lines; these are scoped runs, not whole-project gates.

| Evidence | Command | Output |
| --- | --- | --- |
| A | `npx vitest run --config vite.config.ts --project src:core tests/src/core/validators.test.ts tests/src/core/parsers.test.ts` | `Test Files  2 passed (2)`; `Tests  116 passed (116)` |
| B | `npx vitest run --config vite.config.ts --project src:core tests/src/core/compilers.test.ts -t 'Vue face planning\|sheet planning\|browser application without extensions\|byte-identical'` | `Test Files  1 passed (1)`; `Tests  17 passed \| 133 skipped (150)` |
| C | `npx vitest run --config vite.config.ts --project config tests/config.test.ts -t 'no-nested-functions\|fences Vue faces\|resolves externals\|committed host inventory'` | `Test Files  1 passed (1)`; `Tests  26 passed \| 160 skipped (186)` |
| D | `npx vitest run --config vite.config.ts --project src:bin tests/src/bin/helpers.test.ts tests/src/bin/CLI.test.ts -t 'surface\|extension\|migration\|surfaces'` | `Test Files  2 passed (2)`; `Tests  9 passed \| 273 skipped (282)` |
| E | `npx vitest run --config vite.config.ts --project guides tests/guides.test.ts -t 'surfaces and extensions\|nested-function admission'` | `Test Files  1 passed (1)`; `Tests  13 passed \| 23 skipped (36)` |
| F | `npx tsc --noEmit --project tsconfig.json` | No TypeScript diagnostics. |

The skipped cases in B–E were excluded by the named test filters.

## Claims

| Claim | Status | Deciding evidence and required correction |
| --- | --- | --- |
| 1. Contract | CONFIRMED | `src/core/types.ts:7` declares the surface, axis, framework, and extension contracts; `src/core/types.ts:136` declares `frameworks` and the derived `vue` flag. `src/core/compilers.ts:769` computes that flag from the framework list. The extension guards compose the installed contract guards at `src/core/validators.ts:168`; `src/core/parsers.ts:16` returns guard-valid records unchanged and guards its constructed text result. Run A attacked hostile values, repeated axes, unsupported frameworks, reserved names, malformed text, and the empty-axis browser text form. `NAME_PATTERN` at `src/core/constants.ts:461` refuses uppercase spellings, preventing a valid case-colliding sheet name. Controls include accepted records and the deliberately non-total reader in `tests/src/core/validators.test.ts:76`. Removing the repeated-axis check or accepting a reserved name would fail the assertions at `tests/src/core/validators.test.ts:35`; rejecting empty axes would fail `tests/src/core/parsers.test.ts:12`. F found no contract diagnostics. |
| 2. Derivation | CONFIRMED | `src/bin/helpers.ts:990` reads the independent markers; `src/bin/helpers.ts:1016` collects physical framework axes, complete direct sheet pairs, reserved-name exclusions, code-unit sorting, and case refusals. `src/bin/CLI.ts:968` derives the blueprint, and `src/bin/CLI.ts:1362` adds the migration question. D exercised missing sheet markers, reserved directories, sorted faces, the case-folding host's uppercase refusal, and migration; E exercised both writing verbs. `tests/src/bin/CLI.test.ts:156` checks that audit returns its report with the migration question and repair preserves the existing configuration. Here “audit without blocking” means audit returns the report; the reported question itself correctly retains `blocking: true`. Removing the second sheet marker check would fail `tests/src/bin/helpers.test.ts:131`; removing the migration refusal would fail the retained-file and writing-verb assertions. |
| 3. Creation | CONFIRMED | `src/bin/CLI.ts:235` checks prerequisites and parses extensions before compiling or writing, assigns every selected browser axis, and derives journey from the browser application. `src/bin/helpers.ts:1065` refuses malformed, repeated, unsupported, reserved, and surface-less selections. D executed valid creation with both browser axes, styles, themes, and showcase. E executed the refusal table, including repeated flags and unknown `--surfaces`, and checked that the target was absent. The accepting control uses `browser:vue,styles:print`; omitting a prerequisite refusal or accepting repeated entries would fail those exit-code assertions, while a write before refusal would fail the target-absence assertion. |
| 4. Vue follows the extension | UNRESOLVED | B passed the independent both/src/app/none axis matrix in `tests/src/core/compilers.test.ts:45` and the framework-free browser case at `tests/src/core/compilers.test.ts:1399`; E passed its dependency/plugin checks. These discriminate app-only Vue checking from a src-only extension and from no extension. The emitted template source then changed. Re-read the changed template spans and rerun the emitted-file checks on a stable snapshot; the earlier pass does not certify the later bytes. |
| 5. Styles surface | UNRESOLVED | B passed `tests/src/core/compilers.test.ts:153`, which asserts seeds, ownership, wrappers, exports, packaging exclusions, setup registration, scripts, styles-only manifests, and standalone themes. E passed the guide's ownership and marker controls. Removing themes or a face from the planned population would fail the explicit path comparisons; removing a stub exclusion would fail the manifest assertions. `templates.ts` changed before the lane closed, so emitted seed and factory bytes require a stable rereading and rerun. The folder-name disagreement already established belongs to claim 10. |
| 6. Vue faces | UNRESOLVED | B passed the face-path, aliases, checker, export, and script assertions at `tests/src/core/compilers.test.ts:45` and the sibling/declaration rewrite assertions at `tests/src/core/compilers.test.ts:127`. C passed `tests/config.test.ts:2220`, including peers, subpaths, aliases, siblings, and the refused `@vue/` scope even when named as a peer. A mutation externalizing workspace aliases or admitting `@vue/runtime-core` would fail those controls. Both `templates.ts` and `configs/helpers.ts` then changed; the emitted wrapper and externalization engine require a stable rereading before confirmation. |
| 7. Lint blocks | BROKEN | The required proof is not implemented. `tests/config.test.ts:1939` reads JSON, locates overrides, constructs JavaScript `RegExp` instances at `tests/config.test.ts:1979`, and calls `pattern.test(source)` at `tests/config.test.ts:2006` and `tests/config.test.ts:2024`. C passed this regex test. It does not pass the Vue import matrix through Oxlint. The separate real-binary test at `tests/config.test.ts:2049` proves policy-plugin diagnostics, not these import directions. Changing a Vue override's severity to `off` leaves the regex matrix green because it never checks the severity. Smallest correction: drive every existing refused and admitted import case through the real linter at its owner's path, assert the specific import diagnostic or its absence, and retain a disabled-restriction control showing that the refusal proof fails. |
| 8. Identity and vendoring | UNRESOLVED | B passed the explicit configuration identity relation and its differing-blueprint control at `tests/src/core/compilers.test.ts:1783`. C passed the inventory-versus-vendored-bytes check at `tests/config.test.ts:785`. The initial `configs/helpers.ts` imports were limited to `vite` and `node:` modules; the initial `templates.ts` held frozen template data. The later changes to templates, helpers, and the vendored ignore file invalidate a closing identity/inventory confirmation. Settle this after the parallel writer finishes and the authorized writer refreshes inventory if required. This lane cannot run the mutating build. |
| 9. Callbacks | BROKEN | The claim's blanket refusal wording exceeds what the rule enforces. `configs/policy.ts:831` returns early for `isPolicyMethod(node)`; `configs/policy.ts:570` recognizes object methods and accessors, and `configs/policy.ts:590` stops ancestry checking at a class expression. C passed the existing accepting class-expression case at `tests/config.test.ts:1018` and the accessor case at `tests/config.test.ts:1064`, which reports the local bindings but no accessor diagnostic. Thus method/accessor syntax, and an arrow assigned inside a class-expression method, are not categorically refused. This is an existing documented limit, not a regression introduced by the literal climb: `.claude/rules/architecture.md:142` states the class-expression exclusion, and its sentence at line 169 says to refuse a *climb* through these positions. Smallest correction: narrow claim 9 to refusal by the literal-position climb and explicitly retain the existing method/class-expression exclusions. A blanket rejection requirement instead needs a separately specified rule change. The callback admission and placement-preservation controls themselves held. |
| 10. Rules and guide agree | BROKEN | The starting tree contradicts `.claude/rules/styles.md:71`: “Give each folder an `_index.scss` barrel that loads its partials with `@use`; keep the barrel when the folder is empty.” The source at the starting `src/core/templates.ts:1450` emits `elements/index.scss`, `components/index.scss`, and `utilities/index.scss`. The unchanged proof at `tests/src/core/compilers.test.ts:186` explicitly expects those names and passed in B. The supported sentence is: “The generator seeds each folder with an empty `index.scss` barrel.” Smallest implementation correction under the binding styles rule: seed `_index.scss` and update the exact-path assertions. Further starting-snapshot prose discrepancies are recorded next. The parallel edits prevented a complete closing sentence audit; this row does not certify their later resolution. |

## Starting-snapshot prose discrepancies

These discrepancies were read before the parallel-change stop. Template line references in this section address the starting hash recorded above. Later mode work is outside this verdict.

- **Showcase output and stamp:** `.claude/rules/application.md:34`, `.claude/rules/workspace.md:115`, `.claude/rules/workspace.md:121`, and `.claude/rules/workspace.md:271` describe pages under root `showcase/`, including `showcase/browser.html`. The rule at `.claude/rules/workspace.md:122` requires a SHA-256 final-page stamp. Starting `src/core/templates.ts:477` instead defines `appShowcase(override?)`, writes under `dist/showcase`, and inserts `new Date().toISOString()`. The supported sentence is: “The showcase builds the base browser application into `dist/showcase/index.html` with an ISO timestamp.”
- **Showcase modes and publishing:** `guides/scaffold.md:1213` says the showcase builds each application mode; line 1215 says its wrapper passes the mode; lines 1216–1218 declare extension scripts and publication rebuilding. `.claude/rules/workspace.md:285` states that publication rebuild. Starting `src/core/templates.ts:1083` calls `appShowcase()` without the mode. `src/core/compilers.ts:518` emits the base scripts and the `show` copy chain; `src/core/compilers.ts:531` emits no showcase rebuild in `prepublishOnly`. The supported sentence is: “The manifest emits the base showcase scripts and a `show` copy chain; publication does not rebuild showcase pages.”
- **Journey modes:** `.claude/rules/workspace.md:179` and `guides/scaffold.md:1221`–1225 describe a mode passed to `appJourney` and extension-specific journey scripts. Starting `src/core/templates.ts:1099` invokes `appJourney(variant, VARIANTS)`; `src/core/compilers.ts:456` emits the base `test:journey` only. The supported sentence is: “The wrapper invokes the base journey factory for each variant and the manifest declares the base journey script.”

The smallest correction for these mode discrepancies is to finish the assigned mode unit and rerun their executed prose assertions before treating those sentences as shipped behavior. This lane stopped instead of auditing that unit mid-edit.

## Findings

none

## Attacked and held

The empty-axis browser text parses to a guard-valid extension. Reserved sheet names are refused without rejecting `print`. Incomplete named sheet pairs are ignored. Audit reports migration while preserving its report channel. Browser creation without an extension remains framework-free in the tested snapshot. Styles-only and themes-only manifests omit JavaScript entry fields.

The callback climb admits named and anonymous members in call, constructor, return, and arrow-body positions. Its tested spread, computed-property, local-binding, and inner-binding controls remain refused. `reportFunction` at `configs/policy.ts:940` retains the direct-position and anonymity conditions that prevent the broader callback admission from admitting property-held functions into data files. None of these held cases establishes a blanket ban on method or class-expression syntax.

## Closing custody

This lane edited no tracked file, spawned no agent, created no probe or scratch directory of its own, installed nothing, and ran no build or mutating npm script. `Get-ChildItem tmp/probes -Force` returned no entries at closing. The only authored file is this verdict.

The closing `git status --porcelain` reading was:

```text
 M .agents/skills/orkestrel-harden/references/centralization.md
 M .agents/skills/orkestrel-journey/SKILL.md
 M .agents/skills/orkestrel-journey/references/captures.md
 M .agents/skills/orkestrel-journey/references/decide.md
 M .agents/skills/orkestrel-journey/references/layer.md
 M .agents/skills/orkestrel-journey/references/statechart.md
 M .agents/skills/orkestrel-journey/references/styles.md
 M .claude/rules/application.md
 M .claude/rules/architecture.md
 M .claude/rules/browser.md
 M .claude/rules/documentation.md
 M .claude/rules/styles.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M .claude/skills/orkestrel-journey/SKILL.md
 M .oxlintrc.json
 M .prettierignore
 M AGENTS.md
 M configs/helpers.ts
 M configs/policy.ts
 M configs/src/vite.core.config.ts
 M guides/README.md
 M guides/scaffold.md
 M host.json
 M src/bin/CLI.ts
 M src/bin/constants.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/parsers.ts
 M src/core/templates.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/constants.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/core/validators.test.ts
 M vite.config.ts
?? .orkestrel/scaffold/
```

VERDICT: FAIL 4, 5, 6, 7, 8, 9, 10; outside the claims: none
