<!-- journal: tmp/codex/f8c-design-analyst.jsonl (swept at acceptance); codex thread 01a0cb5e-3bb1-7de0-afd7-8316b3233a72; retained from tmp/codex/f8c-design-analyst-last.md -->
**Proposal — analyst on GPT-6 Astra, objective lane.** Move the Tailwind proofs into `service`. Preserve F8’s behavioral claims, with an explicit browser normalization step where PostCSS cannot reproduce CSSOM readings.

1. **Readers: move syntax readings to Node; keep browser interpretation in Chromium.**

   Parse compiled CSS with installed PostCSS. Read layer statements, layer order, layer blocks, selectors, custom properties, shared names, and declaration importance from that AST. Do not reconstruct CSSOM objects or load a synthetic stylesheet merely to extract important names.

   There is a material exception: **authored declaration names are not a replacement for browser-normalized declaration names**. The existing preflight reader enumerates `CSSStyleDeclaration`, and the proof compares properties such as `border-top-style`. Direct compilation in this lane found the universal preflight declaration authored as `border: 0 solid`. Replacing the browser reading with `Declaration.prop` would change the measured population. Select rules in Node, then let Chromium normalize their declaration text before collecting the properties used in computed comparisons. Do not implement a shorthand expander.

   Keep computed readings inside anonymous callbacks passed directly to `page.evaluate`. Return copied strings and plain records; compare them in Node. Never return live style objects or place assertions inside the browser callback.

   These decisions follow the existing [declaration reader](/home/user/veneer-f8b/tests/setupBrowser.ts:1596), [preflight comparison](/home/user/veneer-f8b/tests/tailwind/preflight.test.ts:113), and [parser reuse and function laws](/home/user/scaffold/AGENTS.md:34).

   The proposed exports and their proofs are as follows. Unless another home is named, the home is `tests/setupService.ts`, and pure behavior is proved in `tests/setupService.test.ts`.

   | Export | Contract and required proof |
   |---|---|
   | `readLayerStatement` | Read the first non-comment AST node; require a statement-form `@layer`. Prove comments, empty input, a leading style rule, and a leading generated `properties` statement. Do not search forward for a preferred answer. |
   | `collectLayerOrder` | Collect first declarations across ordered roots, retaining unfilled layers. Prove repeated statements, block declarations, and cascade-before-profile ordering. Bound this reading to the layer structure the compiled fixtures use. |
   | `collectLayerRules` | Select rules belonging to the requested layer, retaining nested conditional rules. Prove that relabeling `theme` removes its reading while leaving declarations elsewhere discoverable. |
   | `collectFilledLayers` | Preserve the existing block-presence contract, including repeated blocks; distinguish statements from blocks. |
   | `collectSelectors` | Collect style-rule selectors in order, including nested rules, excluding keyframe steps. Prove nested media rules and a keyframe control. |
   | `collectClassNames` | Derive distinct decoded class names from AST selectors. Reuse `walkSelector` and `readIdentifier`; prove adjacent classes, escapes, functional selectors, and refusal to interpret attribute-string contents as classes. |
   | `collectSharedNames` | Intersect independently supplied sheets. Prove disjoint, empty, repeated, and overlapping inputs against literal expected names. |
   | `collectImportantNames` | Collect class names from rules carrying important declarations. Prove normal versus important declarations and nested rules. Reuse this export in the completeness and planted-importance cases. |
   | `collectCustomProperties` | Collect declared custom properties from style rules. Prove ordinary properties and `@property` registration metadata do not masquerade as declarations. |
   | `collectInlineSources` | Walk PostCSS `source` at-rules, then interpret the bounded inline syntax. Prove quoted lists, whitespace, exclusions, ordinary file sources, empty lists, malformed inline forms, and comments containing directive text. |
   | `carriesVeneerSignature` | Recognize the Veneer token namespace inside its `theme` block. Prove a foreign theme alone fails, and that deleting the Veneer declarations fails. |
   | `requireTailwindCandidates` | Derive sorted candidates and require the calibration names. Prove empty CSS and each missing floor member throw, while an additional class joins the result. |
   | `readTailwindCascade` | Read the built cascade from an explicit workspace root and report a missing build with `npm run build:src:styles`. Prove real present and absent files using `createScratch`. |
   | `TailwindService`, `tailwind` | Own readiness, compilation, browser lifetime, case isolation, and raw browser readings. Prove live behavior through the service files; importing the module into the ordinary setup proof must cause no compilation or browser launch. |
   | `NEUTRAL_MARKUP`, in `tests/setupStyles.ts` | Move the existing case table unchanged; retain its overlap-completeness assertion in the preflight proof. |
   | `collectFencedBlocks`, in `tests/setupStyles.ts` | Keep the text-to-document, language-filtering contract, but implement it through `extractFences(createMarkdown(source).document)`. Retain its setup proof, including nested fences. |

   Put new reusable contracts in `tests/types.ts` before implementation. Keep existing guide readers, `collectTypeSelectors`, and `ELEMENT_TAGS` in `tests/setupStyles.ts`.

   Do not substitute `collectSelectorClasses` without accounting for its narrower contract: it deliberately excludes functional arguments. Do not preserve the wrapper’s regex as a second class-reading mechanism. See [the existing selector reader](/home/user/veneer-f8b/tests/setupServer.ts:1328) and [shared selector grammar](/home/user/veneer-f8b/tests/setupStyles.ts:337).

   Remove these browser exports and migrate their dedicated assertions: `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`, `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`, and `collectInlineSources`. Retain `readCascadeSheet`, `collectLayerRules`, `collectLayerOrder`, `collectSheetRules`, `collectCustomProperties`, and their supporting browser infrastructure. Their surviving consumers include `collectLayer` and the standalone styles proof; see [the layer reader](/home/user/veneer-f8b/tests/setupBrowser.ts:1304) and [the styles document proof](/home/user/veneer-f8b/tests/src/styles/index.test.ts:23). Update helper inventories and comments alongside the moves.

2. **Readiness: perform preparation in the setup module, before profile compilation.**

   Register service-only lifecycle hooks in `tests/setupService.ts`. A root `beforeAll` hook can inspect `suite.file.projectName`; the installed runner exposes that field. Only the `service` project starts the exported service instance. The ordinary `setup` project may import and prove pure exports without invoking the external tooling. This is project routing, not a readiness skip.

   `TailwindService.start()` must:

   - Read and validate `dist/src/styles/index.css`, naming `npm run build:src:styles` on failure.
   - Derive candidates from that artifact, require `container`, `table`, `col-1`, `caption-top`, and `caption-bottom`, and write `tmp/tailwind/candidates.txt`.
   - Import the installed compiler and plugin and compile a minimal positive input that must emit a known utility.
   - Resolve browser options through `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)`, reject a remote connection as the oracle does, and launch headless Chromium.
   - Throw on any failure, with the failed prerequisite identified. Clean up any resources already acquired.

   Candidate generation belongs here, never in a proof’s own `beforeAll`. Profile compilation must follow readiness rather than occur during module import.

   **Do not describe ordinary `setupFiles` as process-wide initialization.** The supplied factory declares setup files, not `globalSetup`; initialization must tolerate execution for each isolated proof file. Derive and overwrite the same deterministic candidate file during each file’s readiness phase. Do not introduce a global cache or another configuration departure merely to promise one execution across the whole invocation.

   The rule requires loud readiness and service isolation; see [tests.md:147](/home/user/scaffold/.claude/rules/tests.md:147). The generated factory supplies Node, disabled Vitest browser mode, 120000 ms budgets, and disabled file parallelism; see [templates.ts:549](/home/user/scaffold/src/core/templates.ts:549). The lifecycle discriminator is declared in [the installed runner](/home/user/veneer-f8b/node_modules/@vitest/runner/dist/tasks.d-DEYaIMIu.d.ts:624).

3. **Scene: use a browser per proof file and a fresh document per case.**

   Use the exported `TailwindService` class and `tailwind` instance in `tests/setupService.ts`. Give the entity single-word methods: `start`, `compile`, `mount`, `load`, `read`, `properties`, `clear`, and `destroy`.

   Their responsibilities are concrete:

   - `compile(path)` reads the source and invokes `postcss([tailwindcss()]).process(source, { from: absolutePath })`. It retains the real source path for import and `@source` resolution.
   - `mount(markup)` creates an isolated page/context, writes a standards-mode scratch HTML document with the standalone cascade linked first, and navigates using `pathToFileURL`.
   - `load(css)` appends an awaited stylesheet after that cascade.
   - `read(selector, properties?)` returns raw computed snapshots for all matching subjects and throws when the expected population is absent. The `html` subject addresses the document root.
   - `properties(blocks)` uses detached browser style declarations to obtain canonical property names from Node-selected declaration blocks. It never injects these parsing specimens into the measured cascade.
   - `clear()` releases the case’s page/context and scratch allocation.
   - `destroy()` also closes the browser, including after partial initialization.

   The service setup owns `beforeAll`/`afterAll`; `afterEach` clears case resources. Cleanup must survive compilation, navigation, and assertion failures.

   Prefer scratch HTML over `setContent`: it matches the existing oracle and makes the loaded document and cascade explicit. Use `createScratch` directly, without a renamed wrapper. Its installed contract supplies owned files and cleanup; see [the installed scratch API](/home/user/veneer-f8b/node_modules/@orkestrel/test/dist/src/server/index.d.ts:149). The browser precedent is [recordButtonOracle](/home/user/veneer-f8b/tests/setupServer.ts:2251).

   No motion or viewport matrix is required: these cases compare static declarations on the same document under unchanged conditions. That does **not** establish equality across arbitrary viewports. Keep the page conditions stable, avoid interactions that start transitions, and retain the measured browser version with host evidence.

   Preserve the distinction between the compiled sheet’s order and the document’s established order. A profile may begin with `properties`; the already-loaded standalone cascade must still establish Veneer’s named layers first.

4. **Files: adopt the conventional service tree and retain the existing fixture paths.**

   Move the proofs to:

   - `tests/service/tailwind/profiles.test.ts`
   - `tests/service/tailwind/consumer.test.ts`
   - `tests/service/tailwind/preflight.test.ts`

   Keep `tests/fixtures/tailwind/{consumer.css,markup.html,preflight.css,unexcluded.css}` and `tests/setup.css`. Replace `?raw` imports with anchored `readFileSync` calls and `?inline` imports with service compilation. Update relative imports after moving the proofs.

   Keep `tests/setup.css` as the canonical `tailwind` profile and exclusion-list home. Its existing source paths remain correct because the fixtures do not move. Update its project comment.

   Keep the Tailwind-free standalone case under `tests/src/styles/index.test.ts`. Retain the browser signature reader and its foreign-theme control in `tests/setupBrowser.test.ts`; the service proof independently establishes the actual compiled sheets’ signature contents.

   This placement follows [the cross-cutting proof table](/home/user/scaffold/.claude/rules/tests.md:59) and preserves the accepted profile arrangement in [the F8 verdict](/home/user/veneer-f8b/tmp/units/f8-design-verdict.md:27).

5. **Scripts and configuration: register the generated service project and remove the wrapper.**

   Declare exactly:

   ```json
   "test:service": "vitest run --config vite.config.ts --no-cache --reporter=dot --project service"
   ```

   Append `&& npm run test:service` after `npm run test:distribution -- --mode release` in `prepublishOnly`. Remove `test:src:tailwind` and its clause from `test:src`. Do not add service execution to `npm test`.

   Delete `configs/src/vite.tailwind.config.ts`. After the setup module and scripts exist, the Orchestrator runs the tracked `scaffold repair --groups configs` command. The implementation unit does not hand-edit `vite.config.ts`.

   No other authored `configs/` change is required. Reuse `configs/browsers.ts`; leave styles and TypeScript wrappers intact. No dependency, export, runtime requirement, or lockfile change is required.

   The direct Node compiler needs no stylesheet alias: the supplied probe and this lane’s independent compilation resolved the consumer fixture verbatim. Removing its cascade import removed the Veneer signature and `.btn` while preserving `.px-8`. See [the import probe](/home/user/veneer-f8b/tmp/units/f8c-probe-import.mjs:13) and [its retained output](/home/user/veneer-f8b/tmp/units/f8c-probe-import.log.txt:1).

   The exact script and gate placement are already asserted by [the configuration proof](/home/user/veneer-f8b/tests/config.test.ts:730). The publishing-workspace rule is [workspace.md:156](/home/user/scaffold/.claude/rules/workspace.md:156).

6. **Guide and record: describe the Node compiler and driven browser, and close the F8b findings.**

   Replace the wrapper paragraph at [veneer.md:382](/home/user/veneer-f8b/guides/veneer.md:382) with:

   > The `service` project compiles the profiles in Node through the installed `@tailwindcss/postcss` plugin and drives Chromium to read their computed styles. `tests/setupService.ts` verifies readiness and derives `tmp/tailwind/candidates.txt` from the built cascade before profile compilation. Each case loads the standalone cascade before its compiled profile.

   Follow it with:

   > Run `npm run build:src:styles`, then `npm run test:service`. The service command requires the built cascade and a launchable Chromium. Readiness failures fail the run. The publishing gate runs the service proofs after the distribution proofs.

   Replace the generalized bundler claim at [veneer.md:312](/home/user/veneer-f8b/guides/veneer.md:312) with:

   > Keep every `@import` ahead of the `@source` rules. Vite’s bundled `postcss-import` drops a cascade import placed after a `@source` rule. The recipes retain the import-first form even though the direct Tailwind PostCSS compiler accepts the trailing form.

   Preserve D16’s import ordering and add a structural proof of that ordering; direct Tailwind compilation alone cannot detect its removal.

   Apply the following documentation changes:

   | Location | Required change |
   |---|---|
   | Profile table and Tailwind links | Point to the service paths; replace `shared.test.ts` with `consumer.test.ts`. |
   | § Files | Drop the Tailwind wrapper row; replace `tests/tailwind/` with `tests/service/`; add `tests/setupService.ts` and describe readiness, compilation, and browser ownership. |
   | § Departures | Reword the `tests/setup.css` row to say the service project reads and compiles it per case. Retain the composable-versus-bare-import departure. Remove any surviving claim that the Tailwind project or wrapper is a styles-axis configuration departure. |
   | § Scripts | Add `test:service`, its build prerequisite, and its `prepublishOnly` placement. Revise the introductory sentence, which currently describes only styles-target scripts. |
   | § Tests | Describe Node compilation and Chromium measurements; link the service proofs and `setupService.test.ts`. |
   | `guides/README.md` | Extend the styles-proof description to distinguish standalone browser proofs from service pairing proofs. |
   | `ROADMAP.md` | Update the F8 row and the obsolete `tests/tailwind/` placement record. Preserve the later-unit obligation to extend exclusions when required. |

   Fold the remaining audit findings into the same change:

   - Move `NEUTRAL_MARKUP` into setup infrastructure.
   - Centralize important-name derivation and remove its synthetic stylesheet injection.
   - Reimplement `collectFencedBlocks` through the installed guide primitive. This lane verified equal results for the actual guide and nested blockquote/list fences.
   - Resolve the alias-documentation finding by deleting the alias-bearing wrapper.
   - Rename the consumer proof.
   - Delete the tautological preflight inequalities and their control claim.
   - Rename the case to “keeps every property the elements layer declares, and records every property the profile moves.”

   The findings are recorded in [the F8b reviewer verdict](/home/user/veneer-f8b/tmp/units/f8b-audit-reviewer-verdict.md:44). Documentation must describe executed behavior, not merely contain matching names; see [documentation.md:42](/home/user/scaffold/.claude/rules/documentation.md:42).

7. **Unit: use an `opus` implementation unit with an Orchestrator regeneration checkpoint.**

   Assign the unit to native Opus, because the acceptance work launches Chromium. Keep the reader migration, lifecycle, proofs, scripts, and documentation together: splitting them would leave intermediate ownership and import graphs inconsistent.

   The unit owns:

   - The old Tailwind proof files and their service replacements.
   - `tests/setupService.ts`, `tests/setupService.test.ts`, and required `tests/types.ts` contracts.
   - `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`.
   - Any narrowly required shared-selector change in `tests/setupServer.ts` and its sibling proof.
   - `tests/setup.css` comments and Tailwind fixtures where a proof requires a controlled correction.
   - The removed Tailwind wrapper and `package.json` scripts.
   - `guides/veneer.md`, `guides/README.md`, and the F8-related `ROADMAP.md` records.

   The Orchestrator owns generated configuration changes. Published source, dependencies, and vendored policy/configuration proofs remain outside the writer’s scope.

   Before regeneration, the unit defines contracts, implements infrastructure, moves proofs, declares scripts, and runs the root typecheck plus the narrow setup-helper proofs. It then hands control to the Orchestrator for `scaffold repair --groups configs`. After regeneration, the unit builds styles and runs `test:config`, `test:setup`, `test:setup:browser`, and each service file through the generated project. The authoritative final gates follow independent review.

   Acceptance requires the following mutations to redden their named proofs while preserving collection and imports:

   | Proof | Required mutation |
   |---|---|
   | Setup readers | Replace ordered layer collection with block-only collection; omit a nested rule; drop a compound/escaped class; classify a normal declaration as important; silently accept malformed inline syntax. Each relevant focused case must fail. |
   | Readiness | Supply an absent cascade, a candidate population missing a floor member, a real compiler input that cannot resolve, and an unusable executable in isolated host probes. Require actionable failure, no skip, and cleanup. |
   | Setup isolation | Import the setup module under the ordinary `setup` project with service prerequisites unavailable. Pure helper cases must still execute without compilation or browser launch. |
   | Profiles | Remove a composable import, relabel its `theme` block, remove a candidate source, or alter the order statement. Positive emission, membership, or ordering assertions must fail. |
   | Recipe parity | Remove the cascade import from only the guide fence. Exact recipe comparison must fail. Move an import after `@source`; the import-order assertion must fail even if Node compilation succeeds. |
   | Consumer completeness | Remove a required exclusion or introduce an extra excluded name. Exact derived-set equality must fail. |
   | Consumer computed equality | Compile the excluded recipe without its exclusion line. The shared-name snapshot comparison must fail, including the `.col-1` control. |
   | Importance | Remove `!important` from the planted declaration while retaining the competing Tailwind rule. Require the branch and winning-value assertions to fail. |
   | Tailwind-only utility | Remove `px-8` from the scanned markup or prevent its generation. Require generated-rule and resolved-padding assertions to fail. |
   | Preflight | Remove a guide row, add a fabricated row, and edit a recorded value in separate runs. Exact measured-versus-recorded equality must fail. Plant a change to a reboot-owned property and require the preservation assertion to fail. |
   | Browser signature | Make the reader select any `theme` block. The foreign-theme control must fail. |
   | Generated configuration and scripts | Remove service registration or its publish-chain clause in an isolated control. The existing configuration proof must fail. |

   The preflight property-normalization proof must also distinguish an authored `border` shorthand from Chromium’s canonical declaration population. Retain repeated raw measurement captures to compare the migrated proof against the F8b record.

   Real red runs replace the removed tautologies. The required discipline is stated in [tests.md:35](/home/user/scaffold/.claude/rules/tests.md:35), [tests.md:337](/home/user/scaffold/.claude/rules/tests.md:337), and [AGENTS.md:85](/home/user/scaffold/AGENTS.md:85).

8. **Exit criterion: close F8 in the service shape.**

   F8 closes when:

   - The standalone styles document remains Tailwind-free.
   - The profile sources and consumer recipe compile through the installed PostCSS plugin in Node, with the consumer import resolving through the manifest.
   - Candidate discovery derives from the built cascade and passes its floor.
   - Every shared name satisfies the importance-or-exclusion rule, and real Chromium snapshots prove the consumer pairing.
   - The importance plant and Tailwind-only padding override remain effective controls.
   - Reboot-owned properties retain their standalone values, and the preflight departure table equals the measured population in every direction.
   - Structural and browser reader proofs survive the migration, including shorthand normalization and sheet identity.
   - The service project is generated, discovered, reachable through the exact script and `prepublishOnly`, and absent from the publishing workspace’s default test chain.
   - The obsolete wrapper, script, proof paths, and documentation claims are removed.
   - The guide and roadmap describe the accepted arrangement.
   - Required ordinary gates, isolated distribution/service gates, mutation evidence, and cleanup checks pass.
   - The manifest and published cascade retain no Tailwind runtime requirement.

   This amends the project and gate portions of [F8’s exit criterion](/home/user/veneer-f8b/tmp/units/f8-design-verdict.md:110), while retaining its product claims.

9. **Unsettled evidence and the probes that close it.**

   This proposal does not claim that the migrated TypeScript or Chromium proofs have run.

   | Unsettled point | Settling probe |
   |---|---|
   | Chromium property normalization and preflight parity | On the native host, compare the old CSSOM property population with the proposed detached-declaration normalization for the compiled reset and reboot rules. Require equal populations and unchanged departure rows before accepting the migration. |
   | Browser identity behind “pinned Chromium” | Record the requested pinned executable, effective resolver choice, and launched browser version. The resolver permits overrides and fallback revisions, so calling it alone does not prove the exact pin was launched. Require the designated pin for acceptance or obtain an explicit ruling on the existing fallback policy; see [browsers.ts:269](/home/user/veneer-f8b/configs/browsers.ts:269). |
   | Setup-hook isolation and invocation frequency | Run the generated service project with readiness instrumentation, then run `test:setup` with service prerequisites unavailable. Confirm readiness precedes every profile compile and never runs for ordinary helper proofs. |
   | Compilation inside Vitest’s Node project | Run the verbatim consumer fixture through `test:service` after regeneration. The standalone Node probe establishes native compilation; the generated project must establish that its module-loading context preserves that result. |
   | Case cleanup after partial failure | On the host, fail compilation or navigation after allocating resources, then execute a subsequent case. Confirm closed contexts, removed scratch files, and an uncontaminated standalone baseline. |

   None of these gaps authorizes smaller assertion populations, regenerated departure rows without diagnosis, skipped readiness, or a return to the browser wrapper.