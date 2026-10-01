# propagation-audit-1: reviewer verdict (subjective lane)

Saved verbatim by the Orchestrator from the lane's final message (the lane has no Write tool).

**Lane:** subjective. This lane covers design fit, API shape and vocabulary, placement, and whether the rule and guide text agree with the code. It ran on Claude Opus 5.5 with Read, Grep, and Glob only, and edited nothing.

## Deviations

- **No verdict file was written.** This lane has no Write tool, so the Orchestrator saved this message to this path.
- **No `git diff --stat` reading.** This lane has no shell, and the dispatch did not include the diff. The changed-file population comes from the session-start `git status` snapshot: 45 modified files plus untracked `.orkestrel/scaffold/`. Every ruling is a reading of the working tree.
- **propagation-4 changed a file while it was being read** (deviation contract). `src/core/templates.ts` changed between two of my reads:
  - The sheet folder barrels moved from `elements/index.scss`, `components/index.scss`, and `utilities/index.scss` to `elements/_index.scss`, `components/_index.scss`, and `utilities/_index.scss` (now lines 1467–1469).
  - `appShowcase(override?)` writing to `output = 'dist/showcase'` became `appShowcase(mode: string, override?)` writing to `output = 'showcase'` (now lines 480–482).
  - Line offsets shifted by roughly 17 to 115 lines.

  At my last read, `src/core/compilers.ts:523` still emits the `show` script that copies `dist/showcase/index.html` to `demo/showcase.html`. These edits reach claim 5 (the seed set) and claim 10 (the folder-barrel and showcase sentences). I stopped reading those moving surfaces. The affected parts are ruled `UNRESOLVED`. Every `templates.ts` line cited in this verdict is from the later read.

## Verdicts

1. **BROKEN.**
   - **Defect:** `ViteMachinery` stores both `frameworks` and a `vue` boolean (`src/core/types.ts:139-141`; set at `src/core/compilers.ts:785`). Ruling 1 says "`ViteMachinery.vue` becomes `frameworks`". The `AGENTS.md` derive-state law ("never store a second flag … that can drift") forbids the second flag, and `ViteMachinery` is public. A caller can build `{ frameworks: [], vue: true }`, which is guard-shaped and contradictory.
   - **Readers:** only two read `vue` (`compilers.ts:909` and `compilers.ts:1046`), plus the TSDoc example at `compilers.ts:766` and the tests at `tests/src/core/compilers.test.ts:1408,1449`.
   - **Fix:** delete `vue` from `ViteMachinery` (`types.ts:140-141`) and from `blueprintToMachinery` (`compilers.ts:785`). Read `machinery.frameworks.includes('vue')` at `compilers.ts:909` and `:1046`. Update the example and both assertions.
   - **What held:** the rest of the claim. Every member name is one word. The guards in `validators.ts:178-204` are total compositions. `parseExtension` (`parsers.ts:16-23`) returns any guard-valid input unchanged and checks every text candidate with `isExtension` before returning it. For example, `'browser:vue:'` gets an excess segment and returns `undefined`, and `' styles:print'` fails the surface literal.

2. **BROKEN.**
   - **Defect:** the migration guard always sets `blocking: true` (`src/bin/CLI.ts:1362-1369`), whether or not the verb writes. `audit` adds it to its questions (`CLI.ts:1407`), so `auditToExit` returns `EXIT_DRIFT` (`src/bin/helpers.ts:324-326`) even when every finding is aligned.
   - **Contract conflict:** an audit then holds a blocking question beside non-empty findings, which contradicts the `Audit` and `Question` contracts (`src/core/types.ts:564`, `:578`: "A blocking question means the gate refused the blueprint, so `findings` is empty"). The claim says `audit` reports the move without blocking. It does not.
   - **Input:** any target whose `app/browser/**` holds a `.vue` file and whose plan is otherwise aligned.
   - **Fix:** set `blocking: writing` at `CLI.ts:1367`. `#assertTarget` (`CLI.ts:1416-1421`) throws on every question a writing verb collects, so `repair` and `overwrite` still refuse. Add an audit case asserting `blocking: false` and a clean exit.
   - **What held:** the marker reading in `targetToSurfaces` and `targetToExtensions` (`helpers.ts:990-1055`). Reserved names are skipped. A case collision is refused before name validation. Sheets are sorted by code unit. A tree with `index.scss` and no `sheet.ts` reads as absent. This matches ruling 1 and guide lines 1136–1152.

3. **CONFIRMED** (within this lane).
   - **What held:** `--themes` refuses without `--styles`, and `--showcase` refuses without `--app browser` (`CLI.ts:240-243`). Browser axes come from both selections (`CLI.ts:244`). The `--extend` entries are validated, deduplicated, given their axes, and gated on `--styles` (`helpers.ts:1065-1089`). A repeated flag is refused (`helpers.ts:248-251`). Journey stays implied by `--app browser` (`CLI.ts:252`).
   - **Agreement:** these match `application.md` lines 7–10 and the guide's refusal table at lines 1120–1132.
   - **Referred:** the exit code and the "writes nothing" behavior go to the objective lane.

4. **CONFIRMED** (within this lane).
   - **What held:** the base `appBrowser` factory has no `vue()` (`templates.ts:389-421`). `appVue` builds on it and replaces the plugins (`templates.ts:423-446`). The plugin import depends on `machinery.vue` (`compilers.ts:909`). The root checker is `vue-tsc` only when `application` holds `vue`, that is, on the `app` axis (`compilers.ts:352`), and `check:src:vue` uses `tsc` (`compilers.ts:385-386`).
   - **Attack that held:** a `src`-only `vue` extension. It adds the plugin import for `srcVue` and `setup:browser` and puts nothing under `app/browser`.
   - **Referred:** the full emitted-file sweep goes to the objective lane. The `axes: []` hole is finding F1.

5. **UNRESOLVED.** propagation-4 rewrote the sheet seed while it was being read (see Deviations). Settling this needs the planned artifact list read again after propagation-4 lands, plus the objective lane's enumeration of each listed path, its ownership, and the script and manifest fields.

6. **CONFIRMED** (within this lane).
   - **The `resolveExternal` engine** (`configs/helpers.ts:344-361`):
     - It refuses `vue` and `vue/*` unless a peer admits them.
     - It always refuses the `@vue/` prefix.
     - It does not catch `vue-router`, because the match is `id === name || id.startsWith(name + '/')`.
     - It returns `false` for the `@src/` and `@app/` aliases.
     - It externalizes `node:`, `@orkestrel/`, peers, and siblings.

     This matches ruling 3 and `browser.md:16-18`.
   - **The face shape:**
     - The aliases come from `compilers.ts:828-836`.
     - The scripts come from `compilers.ts:385-399`, `:430`, `:449`, `:491-493`, and `:510-518`.
     - The `./vue` ES export comes from `compilers.ts:115-121`.
     - The `src/vue` wrapper rolls up declarations with both rewrites (`templates.ts:976-1010`).
     - Both `vue` projects add `vue` to `optimizeDeps` (`templates.ts:229`, `:428`).
   - **Referred:** the planned-file enumeration goes to the objective lane. The naming and message defects in this area are findings F3 and F4.

7. **BROKEN.**
   - **Defect:** the lint-block proof never runs the linter. `tests/config.test.ts:1954-2027` parses `.oxlintrc.json`, compiles each pattern with JavaScript `new RegExp(regex)`, and calls `.test(source)` in-process. The real `oxlint` binary is spawned only for the policy-rule fixture (`config.test.ts:2049` onward). The claim requires the controls to go "through the real linter".
   - **Mutation the proof cannot catch:** a pattern that JavaScript's engine and oxlint's engine read differently. The `src/vue` and `app/vue` blocks depend on negative lookahead (`.oxlintrc.json:236`, `:428`). Both assertions still pass while the linter's own reading is unproven.
   - **Fix:** write each refused and each admitted import into a scratch fixture under its owner directory, next to the vendored `.oxlintrc.json`. Run the binary the same way the policy-wiring case does. Assert one `no-restricted-imports` diagnostic per refused source and none per admitted source.

8. **UNRESOLVED.** The only evidence for byte identity of the self-plan and for `host.json` equalling the vendored bytes is the writers' reports. Settling it needs `node dist/bin/main.js audit --offline --json` on this checkout and a byte comparison of `host.json`, both of which belong to the objective lane. The placement part holds as read:
   - `configs/helpers.ts:1-21` imports `vite` and `node:` modules only.
   - The module-scope functions in `templates.ts` sit inside template strings.

9. **BROKEN.**
   - **Method-shorthand bypass:** `reportNested` returns early for any method or accessor `FunctionExpression` (`configs/policy.ts:834`) before any position check. So `function configure() { const options = { on: { thing() { return 1 } } }; return create(options) }` passes the rule. Its arrow-property twin is refused at `tests/config.test.ts:1108-1111`. That is a function kept in a local binding, which `architecture.md:167` forbids.

     **Fix:** for an object-literal `Property` with method, `get`, or `set`, admit it only when `functionToPolicyPosition` of its containing `ObjectExpression` is an admitted callback or result position. Leave `MethodDefinition` as it is: the class cases at `config.test.ts:1019-1025` stay valid. Add the method-in-local-binding twin as an invalid case. Today, deleting `isPolicyMethod(node) ||` reddens the accessor case at line 1064, while no case pins the bypass.
   - **The four law sentences do not state the same admission:**
     - `AGENTS.md:62` admits a callback "as a member of an object or array literal".
     - `centralization.md:31-33` admits it "inside an object or array literal".
     - Both of those admit computed-key and spread members, which `architecture.md:169` and the rule refuse (`config.test.ts:1113-1121`).
     - `centralization.md:3-5` also states that the law lives in `architecture.md` and that the reference adds only the sweep, and then lines 31–33 restate the law. `writing.md` § Instruction files ("Give a rule one home") forbids that.

     **Fix:** make `AGENTS.md:62` read "except a callback passed as an argument or returned as the result; `.claude/rules/architecture.md` § Functions and orchestration bounds the literal positions it climbs". Cut `centralization.md:31-33` back to a pointer.

10. **BROKEN.** Two parts disagree with the tree and two parts are unresolved.
    - **Themes alias:** `workspace.md:61` lists the aliases each face gets. The generator also emits `@src/styles/themes` → `./src/styles/themes/sheet.ts` (`compilers.ts:838`, asserted at `tests/src/core/compilers.test.ts:214`). No rule, no guide sentence, and no emitted file uses it, and it is the only alias that targets `sheet.ts`. Ruling 2 calls themes a target, not a face. Recommended fix: delete `compilers.ts:838` and its assertion. Otherwise, add the row to `workspace.md` § Aliases and to the guide.
    - **`setup:browser` and Vue:** `workspace.md:148-149` requires `vue` in `optimizeDeps.include` "where the project renders Vue". `setup:browser` gets `vue()` whenever a `vue` extension exists (`compilers.ts:1046`), and guide lines 991–993 say its proofs can render the extension's components. Yet the factory uses the base `optimizeDeps` (`templates.ts:616-619`). Fix: emit `optimizeDeps: { include: [...optimizeDeps.include, 'vue'] }` there whenever `machinery.vue` is set, the way `srcVue` and `appVue` do.
    - **Unresolved because propagation-4 is mid-edit:**
      - The `_index.scss` sentence (`styles.md:71`) moved toward agreement while it was being read.
      - The showcase and journey sentences do not match the generator at this reading. They are `workspace.md:115`, `:121`, `:179-182`, `:271`, and `:285-287`, `documentation.md:26-27`, and the matching guide sentences at lines 1213–1228. The generator still has the `show` script (`compilers.ts:523`), no `test:journey:<framework>`, and `appJourney(variant, variants)` with no mode (`templates.ts:451`).
    - **What agrees with the tree:**
      - the `sheet.ts` entry;
      - the `@src/<name>`, `@src/vue`, and `@app/vue` aliases;
      - `setup:browser` collecting both browser proofs while `setup` excludes them (`templates.ts:588`, `:622`; `CLI.ts:992`);
      - the guide's ownership table at lines 1159–1168;
      - `browser.md:14-18`;
      - `AGENTS.md:27-28`.

## Findings outside the claims

- **F1. Extensions that occupy nothing pass every check.**
  - **Gap:** `isBrowserExtension` admits `axes: []` (`validators.ts:192`), and `blueprintToQuestions` (`compilers.ts:2750-2853`) has no rule about extensions at all. That differs from the src and app duplicate checks at lines 2795–2812, the vendor duplicate check at line 2829, and the showcase and journey advisories at lines 2838–2853.
  - **Input:** `createBlueprint('paper', { app: ['browser'], extensions: [{ surface: 'browser', name: 'vue', axes: [] }] })`.
  - **Effect:** it plans the Vue development dependencies (`compilers.ts:290-293`) and sets `machinery.vue` (`compilers.ts:771-785`), which adds the root `@vitejs/plugin-vue` import (`compilers.ts:909`), and it plans no face. The same silence covers `axes: ['src']` with no `src/browser`, and a styles extension with `styles: false`.
  - **Layer:** the extension rules live only in the CLI's `selectionToExtensions` (`helpers.ts:1065-1089`), so a library caller of the compiler gets no question.
  - **Fix:** in `blueprintToQuestions`, block on a repeated extension. Add a non-blocking question for empty axes, for an axis whose selection lacks `browser`, and for a styles extension without `styles`. Make the dependency and machinery projections depend on occupied axes.
  - **Bound:** keep the `axes: []` text form of `parseExtension` that the guide documents.
- **F2. `targetToSurfaces` misuses the `Surface` term.** It returns `styles`, `themes`, and `showcase` (`helpers.ts:990-1009`), but `Surface` names what an extension extends (`types.ts:6-7`). `themes` is a target and `showcase` belongs to the browser surface, so this breaks the one-term rule in `AGENTS.md`. The guide's line 632 ("`--themes`, `--showcase` … select the surfaces") repeats the mix-up. Fix: rename the helper to `targetToFacts`, matching the guide's "structural facts", and reword line 632.
- **F3. One list, two names.**
  - **Mismatch:** `FrameworkDefinition.packages` holds the refused package prefixes, and the same list becomes `ExternalOptions.refused` (`compilers.ts:1363`; `configs/helpers.ts:324`).
  - **Second issue:** `sources` holds file suffixes; the compiler calls the same values `suffix` at `compilers.ts:1330`.
  - **Docs:** neither member of the public interface has TSDoc (`types.ts:32-38`).
  - **Fix:** rename `packages` to `refused` and `sources` to `suffixes` in `FrameworkDefinition`, `FRAMEWORK_MATRIX` (`constants.ts:35-47`), the call sites at `compilers.ts:1330,1336,1363`, and the tests. Version 0.0.82 is unpublished, so the rename costs nothing outside this tree.
- **F4. The refusal message gives a remedy that cannot work for a refused scope.** For `@vue/runtime-core` with `peers: ['vue']`, `resolveExternal` throws (`configs/helpers.ts:349-352`) with "declare its public package in peerDependencies …". Its own remarks (`:335-336`) and `browser.md:17-18` say declaring the peer never admits `@vue/*`. Fix: give a refused scope its own message that names the public package to import instead. (This file is owned by propagation-4; this is the reading as it stood.)
- **F5. Ruling 3's single external engine is only half applied.** The `srcBrowser` and `srcServer` root factories still write their own external predicates (`compilers.ts:928-958`), beside `resolveExternal` in the core and Vue wrappers. Fix: send both through `resolveExternal`, passing the resolved core entry as a sibling the way the Vue wrapper does (`compilers.ts:1342-1351`). Bound: `@src/core` has to stay external, keeping its `output.paths` rewrite.
- **F6. The `src/bin` block misses the Vue face.** The block at `.oxlintrc.json:552` refuses `vue`, `@vue/`, and `@src/browser`, but not `@src/vue`, `@orkestrel/<name>/vue`, or a relative `vue` or `src/vue` directory. The `src/server` block at line 284 refuses all of these. Fix: extend line 552 with the line-284 alternatives.
- **F7. The `app/vue` barrel gets the wrong seed.** `app/vue/index.ts` gets `// TODO: [Feature] Export the browser extension API.` (`compilers.ts:1511-1518`, `templates.ts:1480`). A private application barrel exports no extension API, and every other `app` barrel gets the empty seed (`compilers.ts:1467-1475`). Fix: seed `app/vue/index.ts` with `ARTIFACT_TEMPLATES.source.empty`.
- **F8. The themes barrel seed uses `@forward`.** It is `@forward 'default'` (`templates.ts:1475`). `styles.md:32` and `:71` load barrels with `@use`, and veneer's `src/styles/themes/index.scss` uses `@use 'default'`. A `@forward` in a compiled entry also exposes `_default`'s members to anything that `@use`s the barrel. Fix: `@use 'default';`.
- **F9. A themes-only `check` runs the whole-tree typecheck twice.** `check` runs `tsc --noEmit --project tsconfig.json` (`compilers.ts:366`) and then `check:src`, which repeats `tsc --noEmit -p tsconfig.json` (`:377`). Fix: emit `check:src` only when it has scoped members, and leave it out of `check` otherwise.
- **F10. The `NewCommand` remarks skip the new flags.** `src/bin/types.ts:58-66` documents `src`, `app`, `dependencies`, `bin`, and `from`, but not `styles`, `themes`, `showcase`, or `extensions`. It does not say that `extensions` is the selection behind `--extend`, which `patterns.md` § Options wants explained in `@remarks`. Fix: add those four fields to the remarks.
- **F11. `SURFACES` is unused.** `SURFACES` (`constants.ts:26`) has no use anywhere under `src/`, and both guards write the surface literals inline (`validators.ts:190`, `:199`). That conflicts with the `AGENTS.md` minimal-API law, which creates a capability with its first consumer. Fix: use it in the guards, or remove it.

## Attacked and held

- **`isSheetName` and the reserved list.** `RESERVED_SHEET_NAMES` is built from `ENVIRONMENTS`, `FRAMEWORKS`, `bin`, `styles`, and `themes` (`constants.ts:70-76`). That matches `workspace.md` § Environments and guide lines 1087–1089.
- **The `./browser` export added even when browser owns the root** (`compilers.ts:118-121`). It looks like a double export, and it is deliberate: the Vue declaration rewrite and the sibling map name that subpath (`compilers.ts:1347`).
- **`fileParallelism: false` in `sheetProject`.** It looks like a tuning setting that `tests.md` would forbid without a stated need, and it reproduces veneer's `vite.config.ts:175`.
- **The `resolveExternal` name.** The design verdict already ruled on `resolve*` against `is*`, so this lane does not reopen it.
- **The nested-function climb barriers in `functionToPolicyPosition`** (`policy.ts:519-545`). Each barrier has a case that catches its removal:
  - dropping `parent.computed !== true` reddens `config.test.ts:1118`;
  - climbing through a spread reddens `:1113`;
  - climbing out of a getter body reddens `:1123`.
- **`reportFunction` keeps its direct-callback admission** (`policy.ts:953-958`).
- **The setup proof routing.** `#derive` maps both browser proofs to the `browser` runtime (`CLI.ts:992`), the `setup` factory excludes both (`templates.ts:588`), and `tests.md` and `workspace.md` agree.
- **`AGENTS.md:27-28`** (which faces each extension may import) matches the admitted sets of the `src/vue` and `app/vue` blocks as read (`.oxlintrc.json:236`, `:428`).

VERDICT: FAIL 1, 2, 5, 7, 8, 9, 10; outside the claims: F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11
