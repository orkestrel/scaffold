# foundation-design — analyst proposal

## Answers

Paths beginning `veneer/` or `scaffold/` resolve under `C:/Users/mikes/WebstormProjects/`. Recommendations describe the proposed contract, not completed implementation.

1. **Ship `./bootstrap` unlayered: option (i).**

   Preserve Bootstrap’s selectors, declarations, values, importance, conditional ancestry, and authored order. Define “the same output” as equality of the ordered syntax trees after removing comments and formatting metadata. Do not remove a layer wrapper, change a literal into a variable, reorder declarations, or discard unsupported declarations during that comparison. File bytes may differ in comments and formatting; the CSS program must not. Bootstrap’s import stack supplies the ordering authority. (`veneer/ROADMAP.md:14`; `veneer/node_modules/bootstrap/scss/bootstrap.scss:15`; `veneer/node_modules/bootstrap/scss/bootstrap.scss:47`.)

   A normal Bootstrap declaration beats a layered normal Tailwind declaration for the same property. A Bootstrap important declaration beats a normal Tailwind declaration, but loses to a layered important declaration. Therefore, shared-name ownership also requires the generation exclusions described in answer 2. Importance alone cannot settle declarations that affect different properties.

   Consumer overrides retain Bootstrap’s behavior: specificity decides between unlayered declarations of equal importance, then source order breaks ties. A consumer’s later equal-specificity `!important` overrides a Bootstrap important utility. Tokens work where the declaration reads that token; overriding a global variable does not automatically override a component-local variable. These precedence rules follow [CSS cascade sorting](https://www.w3.org/TR/css-cascade-5/#cascade-sort).

   **Measurement:** `npm run test:probe -- tmp/probes/foundation-design-analyst.test.ts`, from `veneer`, passed on Windows with Chromium `153.0.8010.12`. Against installed Bootstrap, a later `button { border-radius: 19px }` left `.btn` at `6px`; a later `.d-flex { display: block !important }` produced `block`; a later `.btn { --bs-btn-border-radius: 19px }` produced `19px`. In both sheet orders, a layered normal `.container` width lost to Bootstrap, while layered important `display: grid` defeated Bootstrap’s important `display: flex`. These readings establish the proposed override contract, not completion of the recreation.

   One authored Sass source **can** produce unlayered and layered forms through a configurable `$layered: false !default` and a wrapping mixin. Compile the forms separately: Sass configuration belongs to a module’s first load. The same probe compiled one authored body in both modes and confirmed that `@at-root (without: layer)` retained its media condition while removing its layer. See [Sass module configuration](https://sass-lang.com/documentation/at-rules/use/#configuration). Do not publish or implement the alternate form without its first consumer.

   The roadmap sentence “Bootstrap cascade-layer order is the single `bootstrap` layer” does **not** survive. Replace it with “The Bootstrap surface is unlayered and preserves Bootstrap 5.3.8’s authored cascade.” The prior important-lifting recommendation was explicitly awaiting the user’s ruling; it is evidence, not an adopted contract. (`veneer/ROADMAP.md:71`; `scaffold/.orkestrel/veneer/important-layer-design-verdict.md:3`.)

2. **Use a shared prelude, with an explicit first-load requirement beside real Tailwind.**

   Publish `./layers` as a declaration-only CSS subpath. Its top-level order is:

   ```css
   @layer theme, reset, base, elements, components, surfaces, composables, modifiers, utilities;
   ```

   Repeat that order at the start of `./tailwindcss` and `./styles`. Keep `./bootstrap` free of additional statements so its recreation proof remains exact. For independently authored rules sharing a top-level layer, reserve ordered sublayers—`compatibility` before `veneer`—and declare those suborders in the same prelude. Neither face may introduce direct declarations into another face’s sublayer. Real Tailwind retains its own direct declarations in `theme`, `base`, `components`, and `utilities`.

   The allowed ownership is:

   | Face | Declaration ownership |
   |---|---|
   | `./bootstrap` | Unlayered Bootstrap CSS only |
   | `./tailwindcss` | Compatibility sublayers under `theme`, `reset`, `base`, `elements`, `components`, and `utilities` |
   | `./styles` | Veneer sublayers under those names; exclusive ownership of `surfaces`, `composables`, and `modifiers` |
   | `./styles/themes` | Scoped, unlayered token overrides, as answer 4 specifies |
   | `./layers` | Order statements only |

   Declaring an order name does not grant ownership of declarations in that layer. Thus Tailwind’s prelude may name `surfaces` without emitting surface rules. `surfaces`, `composables`, and `modifiers` all precede `utilities`.

   A consumer loading real Tailwind must establish `./layers`, or its exact expanded statements, **before Tailwind’s first layer declaration**. Subsequent sheet order is independent at the designated layer boundaries. A statement arriving later cannot move an existing layer. Nor can any prelude resolve conflicting declarations deliberately placed in the same layer at equal specificity. See [layer ordering](https://www.w3.org/TR/css-cascade-5/#layer-order).

   **Measurement:** `npm run test:probe -- tmp/probes/foundation-design-analyst.test.ts` tested every permutation of the Bootstrap, compatibility, and styles witnesses with a stylesheet using Tailwind’s stated layer order. With the prelude first, every permutation resolved the utilities witnesses to `margin-top: 4px` and `padding-top: 5px`. With Tailwind first and the prelude omitted, every permutation instead resolved `2px` and `3px`. This measured browser ordering using representative rules; it did **not** run the Tailwind compiler.

   Derive shared class names against real Tailwind in the compatibility proofs. Exclude normal shared names and names whose Tailwind declarations add uncovered properties. Retain an important-name exemption only when the proof establishes complete property coverage against normal Tailwind output. A global-important Tailwind profile must exclude every shared name. This preserves the useful part of F8-R4 while closing its incomplete-property and competing-importance cases. (`scaffold/.orkestrel/veneer/f8-design-verdict.md:50`; `scaffold/.orkestrel/veneer/units/important-layer-design-planner-proposal.md:16`.)

   Refuse the proposed single-sheet Tailwind bundle containing layered Bootstrap. It would make Bootstrap’s override behavior depend on the import path and would require a distinct conformance contract. Keep the faces independently consumable.

   Keep all recipe imports before `@source` directives. The earlier processor ruling distinguishes that requirement from browser handling of unknown at-rules. The recorded preflight success belongs to the earlier cascade and must be rerun against this proposal. (`scaffold/.orkestrel/veneer/f8-design-verdict.md:126`; `scaffold/.orkestrel/veneer/units/decisions-round-2.md:369`; `scaffold/tmp/units/absorb-engine-terrain-distillate.md:46`.)

3. **Prove authored equality with the toolchain parser; prove rendering in Chromium.**

   Use the PostCSS parser already owned by Vite’s installed toolchain, resolved through that toolchain’s dependency boundary rather than an undeclared top-level import. Do not add another CSS parser. Vite declares PostCSS, and the previous campaign already separated structural PostCSS readings from computed Chromium readings. (`veneer/node_modules/vite/package.json:61`; `scaffold/.orkestrel/veneer/f8c-design-verdict.md:15`.)

   Compare ordered trees containing:

   - Rule selectors, including their order and grouping.
   - Every declaration’s property, value, importance, and position, including duplicates and fallback declarations.
   - Every at-rule’s name, parameters, child order, and nesting.
   - Empty rules and at-rules where present.

   Remove comment nodes, including the Vite marker, and parser formatting/location metadata. Preserve value strings, custom-property payloads, selector syntax, and conditional contexts. Normalize only parser-identified formatting; do not globally collapse whitespace. Reject every additional layer in the Bootstrap face. Pin the installed Bootstrap version and artifact digest separately.

   The mandatory control changes a declaration in a copied reference and must fail equality. Additional controls change importance, move a rule, and change an enclosing media condition. Foundation acceptance proves the instrument against fixtures; the Bootstrap chunk closes the actual recreation assertion. That assertion is explicitly deferred in the working tree. (`veneer/tests/src/bootstrap/index.test.ts:56`.)

   CSSOM alone is insufficient for authored equality. **Measurement:** `npm run test:probe -- tmp/probes/foundation-design-analyst.test.ts` read `1297` top-level rules from the official sheet in Chromium and detected a changed `font-weight`. The same run found identical CSSOM serialization for `.sample { color: red; color: blue; -unsupported-probe: 1 }` and `.sample { color: blue }`. A CSSOM-only comparator would miss those authored differences.

   Place the proofs as follows:

   | Subject | Runtime and project |
   |---|---|
   | Official artifact version/digest; ordered recreation equality; real Tailwind compilation and mapping comparison | Node, `conformance` |
   | File loaders and caches | Node, `setup` |
   | CSSOM traversal, resolved style, tokens, themes, source-order controls | Chromium, `src:bootstrap`, `src:tailwindcss`, `src:styles`; themes belong to `src:styles` |
   | Browser/style infrastructure | `setup:browser`, with browser-only style helpers proved in Chromium |
   | Cross-face composition | Chromium-driven `integration` |
   | Packed CSS imports, Sass export resolution, declaration closure | Node-driven `distribution`, launching the consumer toolchain/browser where required |

   Restore `src:styles` to the matrix’s Chromium environment and apply the same CSS surface kind to Bootstrap and Tailwind. Keep Node filesystem loading in `setupServer.ts`; browser projects consume built CSS through browser-compatible loading. Do not import that Node setup module into Chromium. Local compiler conformance belongs in `conformance`, not a live-service project. (`scaffold/.claude/rules/workspace.md:123`; `scaffold/.claude/rules/workspace.md:135`; `scaffold/.claude/rules/workspace.md:160`; `scaffold/.claude/rules/tests.md:194`; `veneer/configs/src/vite.styles.config.ts:23`.)

4. **Keep the default theme opt-in and apply tokens at each mode boundary.**

   Loading the pack makes it available; `data-vn-theme="default"` activates it. A pack root without `data-bs-theme` starts in light mode. A pack root placed inside a dark ancestor must explicitly carry `data-bs-theme="dark"` if it is to start dark. Nested light and dark islands receive their corresponding declarations.

   Use this selector structure, with token declarations supplied by the styles chunk:

   ```css
   @scope ([data-vn-theme="default"]) to ([data-vn-theme]) {
     :scope[data-vn-theme="default"] {
       /* Complete light token defaults. */
     }

     :scope[data-bs-theme="light"],
     :scope [data-bs-theme="light"] {
       /* Mode-dependent light tokens and aliases. */
     }

     :scope[data-bs-theme="dark"],
     :scope [data-bs-theme="dark"] {
       /* Mode-dependent dark tokens and aliases. */
     }
   }
   ```

   The scope boundary stops the outer pack’s selectors at another pack root. It does not stop inherited custom properties; each activated pack must declare its own complete defaults. The selector specificity also lets scoped `--bs-*` overrides beat Bootstrap’s root and mode declarations in either sheet order. Emit these token overrides **unlayered**. Keeping them in `theme` would lose against unlayered Bootstrap declarations on the same element. Scope boundaries follow [CSS scoped styles](https://www.w3.org/TR/css-cascade-6/#scoped-styles).

   **Measurement:** `npm run test:probe -- tmp/probes/foundation-design-analyst.test.ts` loaded official Bootstrap and this scheme in both orders. The pack root resolved the light witness, the nested dark island resolved the dark witness, and a light island inside it returned to light. A separate element carrying only `data-bs-theme="dark"` retained Bootstrap’s `#dee2e6` token and received no pack witness. The control wrapping the pack in `@layer theme` lost its Bootstrap-token overrides on both mode islands.

   A consumer setting only `data-bs-theme` therefore receives Bootstrap’s modes and the base Veneer sheet’s defaults, without the optional pack. The existing compound selectors cannot express the proposed island behavior. (`veneer/src/styles/themes/_default.scss:4`.)

   Preserve the existing Sass route while adding built CSS through conditions:

   ```json
   "./styles/themes": {
     "sass": "./src/styles/themes/index.scss",
     "default": "./dist/src/styles/themes/index.css"
   }
   ```

   Add a themes build target after the parent styles build, with output restricted to `dist/src/styles/themes`; its cleanup must never clear `dist/src/styles`. Prove both build orders or explicitly enforce parent-before-themes in every aggregate script. Keep themes out of `./styles`. The existing export supplies only SCSS. (`veneer/package.json:59`; `veneer/ROADMAP.md:30`; `veneer/configs/src/vite.styles.config.ts:11`.)

   Re-declare mode-dependent aliases where their inputs change. Preserve D51a’s distinction between mode-dependent aliases and root-only values; inherited aliases do not recompute merely because a descendant changes an input token. (`scaffold/.orkestrel/veneer/units/decisions-round-2.md:629`.)

5. **Trim the Veneer registry to declarations that ship; preserve external wording in Bootstrap keys.**

   Keep `TOKEN_NAMES.veneer` as an empty group until real public Veneer tokens ship. Remove the speculative leaves and update their examples atomically. The styles token file presently declares only layer order, while the registry and core proof expose undeclared names. (`veneer/src/styles/_tokens.scss:1`; `veneer/src/core/constants.ts:18`; `veneer/tests/src/core/index.test.ts:8`.)

   Use literal custom-property names as the flat keys of `TOKEN_NAMES.bootstrap`, with the same strings as values. For example, `TOKEN_NAMES.bootstrap['--bs-primary-bg-subtle']` retains the external spelling without inventing shortened vocabulary or an artificial `base` leaf. For Veneer-owned tokens, use the same lookup form when they arrive. The group already supplies the namespace; another grouping hierarchy is unnecessary.

   This replaces keys such as `subtle`, `emphasis`, `line`, and `base`, whose values carry longer Bootstrap terms. Treat those literal keys as the declared external-format mirror under the naming rule. (`veneer/src/core/constants.ts:347`; `veneer/src/core/constants.ts:415`; `veneer/src/core/constants.ts:479`; `scaffold/.claude/rules/names.md:120`.)

   Define the populations precisely:

   - `bootstrap`: the public variables in Bootstrap’s combined root/light block, rather than every component-local `--bs-*` declaration.
   - `veneer`: public global defaults declared by the base styles sheet. Component-local implementation variables stay outside that registry; theme packs override names rather than invent public names absent from the base contract.

   Assert set equality in both directions, key/value identity, and absence of duplicate aliases. Rename a registry key, add a sheet declaration, and remove a sheet declaration in separate controls. The working Bootstrap proof already compares both populations and has renamed/appended controls; extend it to the shipped recreation when that chunk lands. Until then, describe Bootstrap names as pinned upstream names, not declarations already shipped by Veneer. (`veneer/tests/src/bootstrap/index.test.ts:24`; `veneer/src/core/types.ts:15`.)

6. **Adopt an optional Vue peer, explicitly amending the tenet.**

   The dependency-free injected adapter is technically viable, but D3 explicitly replaced that recommendation with a consumer-supplied Vue face. Restoring injection silently would reverse that ruling. (`scaffold/.orkestrel/veneer/units/decisions-round-2.md:31`.)

   The alternatives have these contracts:

   | Choice | Consumer import and resolution |
   |---|---|
   | **Optional peer — adopt** | The application declares `vue`, imports Vue APIs from `vue`, and imports composables from `@orkestrel/veneer/vue`. Veneer declares `peerDependencies.vue` plus `peerDependenciesMeta.vue.optional`. Strict dependency graphs can connect the face to the consumer’s Vue instance. |
   | npm hoisting — refuse | The imports are identical, but Veneer declares no relationship to Vue. Success depends on the installation layout; it is not a portable package contract. |
   | Injection — refuse under D3 | The application imports primitives from `vue` and an adapter factory from `@orkestrel/veneer/vue`, then passes those primitives. Veneer imports no Vue runtime or Vue declaration types. pnpm/PnP have no missing Vue edge inside Veneer, but this changes the adopted consumer API. |

   An optional peer permits consumers that never import `./vue` to omit Vue. It does not make a Vue runtime import work when Vue is absent. npm documents optional peers as consumer-provided integrations; Yarn PnP diagnoses undeclared dependencies, and pnpm’s strict layout follows declared dependency edges. See [npm optional peers](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#peerdependenciesmeta), [Yarn PnP dependency protection](https://yarnpkg.com/features/pnp), and [pnpm’s dependency layout](https://pnpm.io/symlinked-node-modules-structure).

   After the amendment, externalize `vue` and its supported subpaths. Continue refusing direct `@vue/*` imports unless separately declared: a peer on `vue` does not authorize imports of Vue’s internal dependencies. Keep core and browser free of Vue imports. The foundation’s refusal is deliberate and must change with the contract, not be removed incidentally. (`veneer/configs/helpers.ts:336`; `veneer/configs/src/vite.vue.config.ts:36`.)

   **Unverified here:** packed consumers under pnpm strict layout and Yarn PnP. The acceptance run must install the packed package in isolated fixtures, compile and execute a real composable with consumer-provided Vue, and prove that root/browser remain usable without Vue. No install was permitted in this lane.

7. **Amend scaffold’s rule and align the roadmap with the selected cascade.**

   The conflict is explicit: the rule requires `_theme.scss`, automatic theme loading, folder-owned layers, and a consumer-only order declaration; the roadmap prescribes separate theme packs and different face orders. Neither document can silently override the other. (`scaffold/.claude/rules/styles.md:19`; `scaffold/.claude/rules/styles.md:25`; `scaffold/.claude/rules/styles.md:53`; `veneer/ROADMAP.md:55`; `veneer/ROADMAP.md:71`.)

   Apply these exact replacements in scaffold’s `.claude/rules/styles.md`:

   - Replace the `_theme.scss` table row’s filename and responsibility with:  
     **“`themes/` — Token-only theme packs and their `index.scss` compilation barrel.”**
   - Add the kind-file row:  
     **“`_reset.scss` — The surface’s reset declarations, when that surface owns a reset.”**
   - Replace the sentence at line 25 with:  
     **“Compile each surface through `index.scss`, which loads `tokens`, the applicable reset, and output partials with `@use`; compile optional theme packs through `themes/index.scss`, and never load them from the main surface barrel.”**
   - Replace the sentence at line 27 with:  
     **“Put theme token overrides under their activation and mode selectors in `themes/`; keep structural and component rules out of theme packs.”**
   - Replace line 53 with:  
     **“Assign each authored partial to its surface’s declared layer or sublayer; a pinned external recreation preserves the reference artifact’s layer placement, and a token-only theme pack may remain unlayered when overriding an unlayered reference.”**
   - Replace line 54 with:  
     **“Define one composition order, repeat it unchanged in each participating layered surface, and establish it in the consumer entry before any external sheet first declares those layers.”**

   Exact recreation also conflicts with rules that would replace literal colors or add reduced-motion declarations absent from the reference. Add this bounded exception:

   **“For a surface whose contract is exact recreation of a pinned external CSS artifact, preserve the reference declarations and order; apply tokenization and accessibility additions in the separate authored extension surface.”**

   Replace the literal-color prohibition with:

   **“Outside a pinned recreation, write literal colors only as custom-property values in `_tokens.scss` or token-only theme packs.”**

   These changes address actual obstacles to equality, rather than approving arbitrary exceptions. (`scaffold/.claude/rules/styles.md:42`; `scaffold/.claude/rules/styles.md:51`; `veneer/ROADMAP.md:14`.)

   Replace `ROADMAP.md:71` with:

   **“The Bootstrap surface is unlayered and preserves Bootstrap 5.3.8’s authored cascade. The layered faces share the order `theme, reset, base, elements, components, surfaces, composables, modifiers, utilities`, with ordered face-owned sublayers wherever they share a layer. Only styles emits declarations in `surfaces`, `composables`, and `modifiers`. Every layered face declares the complete order, and consumers establish it before real Tailwind. Optional theme packs emit scoped, unlayered token overrides.”**

   Apply these as proposed upstream changes before implementation; do not edit scaffold-owned copies in Veneer.

8. **Gate showcase freshness by rebuilding and comparing the complete artifact.**

   Keep production outputs at `showcase/browser.html` and `showcase/vue.html`, selected by the existing modes, with no copy step. The content hash removes timestamp churn but does not by itself prove that a page matches its application. The working hash helper hashes its supplied text, and the showcase invokes it from an HTML transformation hook. (`veneer/ROADMAP.md:41`; `veneer/configs/helpers.ts:438`; `veneer/configs/app/vite.showcase.config.ts:45`.)

   The freshness gate must run the real showcase configuration for each mode into an isolated scratch output, then compare the resulting complete HTML with the corresponding tracked page. The scratch output is a test destination, not the production copy workflow. Fail on a missing page, a byte difference, or a stamp inconsistent with its defined payload.

   Define the stamp payload as the final inlined HTML with the stamp element omitted. Test an application JavaScript change, an SFC template change, and a stylesheet change in scratch fixtures. Each must invalidate the old artifact. Hashing an intermediate HTML shell must not pass those controls. Rebuilding unchanged inputs must reproduce the same page.

   Put the freshness assertion in the Node `config` project because it proves generated configuration output. Promote the capability into scaffold’s configuration proof rather than hand-editing its vendored test. Keep journey behavior in `journey:<variant>`; mode selection chooses the browser or Vue suite, and those suites drive the application entry. (`scaffold/.claude/rules/workspace.md:135`; `scaffold/.claude/rules/workspace.md:138`; `veneer/configs/app/vite.journey.config.ts:25`.)

   **Unverified here:** complete-artifact freshness and stamp timing after single-file inlining. The required run is the promoted freshness case under `npm run test:config`, with the scratch mutation controls. A hash-helper unit test alone does not close it.

9. **Propagate the behaviors into scaffold in dependency order.**

   Scaffold’s environment union still names only `core`, `browser`, and `server`; its showcase generator still describes a browser application and a copy-based output. These are generator changes, not durable Veneer patches. (`scaffold/src/core/types.ts:4`; `scaffold/src/core/constants.ts:13`; `scaffold/src/core/compilers.ts:410`.)

   | Priority | Vendored behavior and evidence | Durable scaffold carrier |
   |---|---|---|
   | CSS surface foundation | CSS wrappers select separate outputs, disable CSS minification, and collect face tests without duplicate setup collection. (`veneer/configs/src/vite.bootstrap.config.ts:13`; `veneer/tests/config.test.ts:104`.) | Add a CSS surface kind with named entries, CSS/SCSS exports, build/check wrappers, Chromium projects, optional theme targets, and independent output cleanup. Keep surface names out of the host-environment union. |
   | Vue environment | `configs/helpers.ts` recognizes Vue workspace modules, boundary owners, browser-side restrictions, and protected imports. `.oxlintrc.json` adds `src/vue` and `app/vue` restrictions. (`veneer/configs/helpers.ts:136`; `veneer/configs/helpers.ts:454`; `veneer/.oxlintrc.json:221`; `veneer/.oxlintrc.json:397`.) | Add `vue` on both src/app axes across types, matrices, compiler output, aliases, Vite boundaries, policy generation, and scoped checks. Classify both Vue axes as browser-side targets; preserve legal Vue-to-browser imports and refuse core/server-to-Vue imports. |
   | Type resolution | `tsconfig.json` adds `@app/vue` and package self-paths. The root check remains plain `tsc`. (`veneer/tsconfig.json:28`; `veneer/package.json:72`.) | Generate selected Vue aliases and public self-paths from the same source of truth. Select root `vue-tsc` when the root includes SFCs; keep plain `tsc` for TypeScript-only scopes. Test an error inside an SFC, not merely resolution of a shim. |
   | Published build closure | `isCoreBuildExternal` externalizes builtins, fleet packages, and peers; `isVueBuildExternal` handles sibling/browser and peer edges; `rewriteBrowserSpecifier` repairs declaration references. (`veneer/configs/helpers.ts:336`; `veneer/configs/helpers.ts:370`; `veneer/configs/src/vite.vue.config.ts:18`.) | Propagate reusable externalization and sibling-specifier rewriting through library templates and helper proofs. Validate declared runtime dependencies separately from externalization. Apply the optional-peer decision through Veneer’s package policy. |
   | Showcase/journey modes | Helpers choose output, HTML entry, presence, and journey path; configuration proofs check selection and root output. (`veneer/configs/helpers.ts:387`; `veneer/configs/helpers.ts:402`; `veneer/configs/helpers.ts:417`; `veneer/configs/helpers.ts:432`; `veneer/tests/config.test.ts:573`.) | Generate mode-aware factories and thin wrappers, preserving the user’s root showcase paths and per-mode journey collection. Leave adopter viewport data in the package-owned wrapper. |
   | Artifact stability | `computeStamp` supplies content hashing; `.prettierignore` excludes generated `showcase/`. (`veneer/configs/helpers.ts:450`; `veneer/tests/config.test.ts:2144`; `veneer/.prettierignore:7`.) | Propagate the final-artifact stamp mechanism, freshness gate, and generated-output exclusions. |
   | Configuration proof coverage | The vendored test adds helper membership, externalization controls, Vue boundary cases, face collection, mode cases, and sibling declaration-rollup controls. (`veneer/tests/config.test.ts:104`; `veneer/tests/config.test.ts:2099`; `scaffold/tmp/units/foundation-audit-verdict.md:55`.) | Generate cases from selected environments/surfaces; retain mutation controls and sibling-output preservation. Do not hard-code Veneer’s face list in every adopter. |
   | Package-owned policy | The rule permits only the shared helper, browser, and policy leaves. Veneer’s temporary Vue-import refusal is product policy. (`scaffold/.claude/rules/workspace.md:64`; `veneer/configs/helpers.ts:325`.) | Admit a birth-owned `configs/package.ts` leaf for package-specific build policy, imported through the root configuration. Repair preserves it. It imports no workspace source and receives explicit inputs. Generic mechanisms remain in scaffold-owned helpers. |

   Acceptance requires regeneration and repair in a scratch adopter, followed by configuration, boundary, and declaration-closure proofs. A second repair must preserve the generated result and the package-owned leaf.

## Proposal

**`.`** ships token-name data and derived types, with no CSS or runtime framework dependency. It has no layers. Bootstrap names mirror the pinned root/light public variables; Veneer names enter with real declarations. Consumers use the names to write custom properties at the scopes that declare or consume them. Bidirectional registry proofs and packed declaration resolution establish the contract. This retains core’s stated responsibility while removing speculative leaves. (`veneer/ROADMAP.md:25`; `veneer/src/core/types.ts:12`.)

**`./browser`** ships the native interaction engine, without Bootstrap JavaScript or Vue. It owns no stylesheet layers. Consumers control behavior through its eventual public contracts and presentation through the documented CSS variables and explicit classes. Chromium behavior proofs and application journeys establish interaction correctness; package proofs reject forbidden runtime imports. (`veneer/ROADMAP.md:11`; `veneer/ROADMAP.md:26`; `veneer/ROADMAP.md:17`.)

**`./vue`** ships composables over the browser engine, with Vue supplied through an optional peer after the tenet amendment. It owns no layers. Vue lifecycle/reactivity integrate with engine behavior without duplicating the engine. Real Vue mount/unmount proofs, browser journeys, externalization checks, and strict package-manager consumer fixtures establish the contract. The face continues to export its composables rather than re-exporting the browser API. (`veneer/ROADMAP.md:27`; `veneer/configs/src/vite.vue.config.ts:13`.)

**`./bootstrap`** ships an unlayered recreation of Bootstrap `5.3.8`, plus its authored Sass entry. Its override paths are Bootstrap’s tokens, specificity, source order, and qualifying consumer importance. Ordered parser equality proves the full CSS program; Chromium proves the override witnesses and rendered scenarios. No layered alternate ships in this proposal. (`veneer/ROADMAP.md:14`; `veneer/package.json:53`.)

**`./tailwindcss`** ships compatibility mappings and rules, without importing Bootstrap’s implementation or the real Tailwind runtime. It uses the compatibility sublayers defined in answer 2 and shares the complete prelude. Consumer utilities and tokens provide customization; the documented generation recipe reserves shared class names for Bootstrap. Real Tailwind compilation, derived collision coverage, and Chromium composition proofs establish the map. (`veneer/ROADMAP.md:15`; `veneer/ROADMAP.md:75`.)

**`./styles`** ships Veneer’s tokens, semantic defaults, and recorded additions. It owns its designated sublayers plus `surfaces`, `composables`, and `modifiers`, before `utilities`. Tokens are the primary override path. A layered normal rule cannot replace an unlayered Bootstrap literal; an intentional property override must be explicitly designed and recorded, including any required importance. This cost is part of choosing faithful Bootstrap output. Chromium proofs judge each addition against the composed cascade. (`veneer/ROADMAP.md:16`; `veneer/ROADMAP.md:18`; `veneer/ROADMAP.md:63`.)

**`./styles/themes`** ships separately compiled, opt-in token packs through CSS and Sass export conditions. Packs emit scoped, unlayered overrides and no component rules. Consumers select a pack, set light/dark boundaries, and override tokens at those scopes. Chromium proves nested modes, pack boundaries, absence of activation, and both sheet orders; distribution proves CSS-only and Sass consumption. (`veneer/ROADMAP.md:30`; `veneer/src/styles/themes/index.scss:1`.)

## Tenet conflicts

- **“Vue [is] not … a peer dependency.”** A runtime-importing Vue face needs a declared relationship for strict package resolution. Smallest amendment: **“The consumer supplies Vue. The Vue face declares Vue as an optional peer; core and browser require no Vue installation. Bootstrap and Tailwind are neither runtime dependencies nor peers. Direct runtime dependencies remain `@orkestrel/*` only.”** This proposal does not enact that amendment. (`veneer/ROADMAP.md:12`; `scaffold/.orkestrel/veneer/units/decisions-round-2.md:31`.)

- **Unqualified “Bootstrap wins on a shared class.”** An arbitrary independently generated Tailwind sheet can carry competing layered importance or additional properties. Exact unlayered Bootstrap cannot suppress every such declaration while retaining its override behavior. Smallest clarification: **“Bootstrap owns shared class names in the documented collision-exclusion recipes; explicit consumer important variants remain overrides.”** The compatibility map must prove those recipes rather than promise control over arbitrary external CSS. (`veneer/ROADMAP.md:15`; `scaffold/.orkestrel/veneer/f8-design-verdict.md:50`; browser measurement in answer 1.)

## Units

These units establish the foundation contracts and instruments before the implementation chunks open; they do not claim that placeholder faces already satisfy the future recreation or engine proofs.

| Unit | Owned files | Acceptance criterion | Must not touch |
|---|---|---|---|
| Contract alignment | Scaffold `styles.md`, `workspace.md`, relevant guide; Veneer `ROADMAP.md`, guide | Accepted tenet decisions and exact rule amendments agree; layer ownership, theme activation, token populations, and proof locations are explicit | Cascade, engine, or composable implementation |
| Scaffold CSS surfaces | Scaffold types, matrices, compilers, templates, configuration proofs | Scratch adopter emits CSS/SCSS/theme targets and Chromium projects; setup collected once; output cleanup isolated; repair reproducible | Veneer-owned style rules |
| Scaffold Vue and policy | Scaffold environment generation, helpers, policy/config proofs, package-leaf rule | Both Vue axes fenced; root SFC errors detected; sibling declarations resolve; package policy survives repair | Product composables or silent peer-tenet change |
| Scaffold showcase/journey | Scaffold factories, mode helpers, config proofs, ignore template | Root output paths preserved; final-content stamp stable; stale scratch application/page controls fail; each mode collects its suite | Application product behavior |
| Veneer foundation adoption | Package/config wrappers, regenerated scaffold-owned files, root paths and scripts | Uses released scaffold behavior; no hand-maintained vendored divergence; every required project reachable | Bootstrap/Tailwind/styles chunk implementation |
| Composition contract | Layer prelude/export, face token preludes, composition fixtures and proofs | Face permutations agree after the required prelude; late-prelude control fails; sublayer ownership enforced | Bootstrap declarations or bundled alternate cascade |
| Recreation instrument | `tests/setupServer.ts`, conformance proof, browser style infrastructure | Ordered parser comparison detects value, importance, order, and context mutations; CSSOM loss control retained; actual recreation remains explicitly deferred | Invented passing cascade assertion |
| Registry correction | `src/core/constants.ts`, `types.ts`, core/registry proofs, examples | Speculative Veneer leaves removed; external keys preserved; bidirectional controls pass; descriptions distinguish pinned from shipped names | CSS values or new token capabilities |
| Theme foundation | Theme barrel/pack structure, theme build/export, selector fixtures, guide | CSS and Sass routes build independently; scoped-selector and layer controls reproduce answer 4; no fabricated public token added for testing | Main styles theme inclusion |
| Consumer closure | Distribution fixtures and proofs | CSS imports retained; Sass subpaths compile through package exports; declarations close; optional-peer fixtures pass when authorized | Dependency installation or publication without the corresponding authorization |

## Alternatives refused

- **Layered Bootstrap with important declarations lifted out:** restores the ordinary important escape but still changes normal precedence. The prior recommendation did not establish drop-in equality and awaited a ruling. (`scaffold/.orkestrel/veneer/important-layer-design-verdict.md:18`; `scaffold/tmp/units/foundation-audit-verdict.md:26`.)
- **Layered Bootstrap with documented divergence:** requires weakening the recreation promise and changes consumer importance behavior. (`veneer/ROADMAP.md:14`; `scaffold/tmp/units/foundation-audit-verdict.md:42`.)
- **A shared order statement as a repair for Tailwind loaded first:** cannot reposition existing layers; the browser control in answer 2 demonstrated the different result.
- **A Tailwind entry that embeds layered Bootstrap:** introduces a second Bootstrap precedence contract and makes separate face composition ambiguous.
- **CSSOM as the complete recreation oracle:** discarded declarations made distinct authored programs compare equal in the executed control.
- **Compound theme selectors or layered Bootstrap-token overrides:** the former miss mode islands; the latter lost to Bootstrap in the executed control. (`veneer/src/styles/themes/_default.scss:5`.)
- **Keeping undeclared Veneer token leaves:** exposes a customization contract without a declaring sheet. (`veneer/src/core/constants.ts:18`; `veneer/src/styles/_tokens.scss:1`.)
- **npm hoisting as Vue’s package contract:** depends on incidental layout; strict consumer resolution remains an acceptance obligation.
- **Restoring injection without a ruling:** D3 explicitly superseded it. (`scaffold/.orkestrel/veneer/units/decisions-round-2.md:33`.)
- **A content hash as the entire showcase freshness proof:** hashes establish identity of their input, not correspondence to the application; the complete rebuild comparison is required. (`veneer/configs/helpers.ts:450`; `veneer/configs/app/vite.showcase.config.ts:50`.)
- **Further hand-edits to vendored configuration:** preserve behavior only until repair; the durable carrier is scaffold generation plus a permitted package-owned policy leaf. (`veneer/ROADMAP.md:47`; `scaffold/.claude/rules/workspace.md:64`.)