# Unit foundation-design — the foundation contract of `@orkestrel/veneer`

One brief for two blind lanes: `planner` on Claude Opus 5.5 (subjective: API shape, vocabulary, package layout, guide voice) and `analyst` on GPT-6 Astra (objective: cascade semantics, resolution, toolchain, proofs). Neither lane sees the other's answer. Each lane performs the work itself and spawns nothing; a lane edits no file.

## Objective

Propose one coherent contract for the six surfaces the foundation publishes (`.`, `./browser`, `./vue`, `./bootstrap`, `./tailwindcss`, `./styles` with `./styles/themes`), such that every tenet the user set holds or the exact tenet that cannot hold is named with the smallest amendment, and such that every successor chunk (the Bootstrap cascade, the Tailwind map, the Veneer styles, the browser engine, the Vue composables) can build on it without a re-baseline.

## The tenets (the user's, verbatim from `C:\Users\mikes\WebstormProjects\veneer\ROADMAP.md` § Tenets)

- The browser face owns the interaction engine. Do not implement that engine with Bootstrap JavaScript at runtime.
- The consumer supplies Vue. Bootstrap, Tailwind, and Vue are not runtime dependencies and not peer dependencies. Runtime dependencies are `@orkestrel/*` only.
- No right-to-left sheet.
- The Bootstrap surface recreates Bootstrap 5.3.8 in authored source order with the same output. The pin is the map. Pin `bootstrap` at `5.3.8` as a `devDependency`. Import official `bootstrap` only from tests and setup; those proofs compare against the exported CSS.
- The Tailwind surface maps Tailwind. Do not recreate Tailwind. The map feeds a compatibility layer tested the same way against the real Tailwind package, imported only from tests and setup. Bootstrap wins on a shared class.
- The styles surface is Veneer's own layer. It records additions against the Bootstrap pin. It does not copy the Bootstrap cascade or the Tailwind map.
- Semantic tags get useful defaults. Do not infer a component from tag position. Classes stay the explicit control.
- CSS variables are the customization contract. The rendered browser result decides UI correctness.
- Prefer native browser APIs.

A tenet is the user's decision. Where a proposal cannot satisfy one, say which, why, and the smallest amendment; never silently reinterpret it.

## Evidence (read these; cite `path:line`)

- The foundation tree: `C:\Users\mikes\WebstormProjects\veneer` (branch `main`, tip `ec25f9e` plus the uncommitted `foundation-fix-1` repairs; read the working tree). `ROADMAP.md` § Standing shape, § Configs, § Style centralization; `package.json`; `src/*/_tokens.scss`; `src/styles/themes/_default.scss`; `src/core/constants.ts`; `configs/src/*.config.ts`; `tests/setupServer.ts`; `tests/src/*/index.test.ts`.
- The round-1 audit: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\foundation-audit-verdict.md`, with the lane reports `foundation-audit-analyst-verdict.md` (Astra measured claims 11, 12, and 14 in Chromium) and `foundation-audit-reviewer-verdict.md` beside it.
- The prior campaign's rulings on these exact questions, all under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\`: `important-layer-design-verdict.md` (option (a): emit every `!important` outside the layers through `@at-root (without: layer)`, keep normal declarations layered; the user never ruled), `units/important-layer-design-planner-proposal.md`, `units/important-layer-design-analyst-proposal.md`, `f8-design-verdict.md` (the Tailwind profiles and the layer order `theme, reset, base, elements, components, utilities`; R4 the shared-name rule: an important Veneer declaration wins by importance in any order, a normal shared name is excluded from Tailwind's generation), `f8c-design-verdict.md`, `units/decisions-round-2.md` D2, D6, D11, D16, D25, D51, D51a.
- The distillates: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\absorb-styles-plan-distillate.md` (Bootstrap recreation facts, token facts, proof facts), `absorb-engine-terrain-distillate.md` (the consumer Tailwind preflight probe, zero departures), `absorb-engine-rulings-distillate.md`.
- The law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`; `.claude/rules/styles.md`, `workspace.md`, `tests.md`, `names.md`, `architecture.md`, `documentation.md`, `patterns.md` under `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\`. `AGENTS.md` § Authority and loading: rules state how to write, guides and the roadmap state what to build; on conflict, stop and report.
- Bootstrap 5.3.8's exported CSS: `C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\dist\css\bootstrap.css` and its Sass under `node_modules\bootstrap\scss\` (the authored source order is `scss/bootstrap.scss`; every utility carries `!important`; no `@layer` anywhere).
- CSS Cascading and Inheritance Level 5, § Cascade layers and § Cascade sorting order: for normal declarations, unlayered beats layered and later layers beat earlier ones; for important declarations the layer order reverses and unlayered important comes last.

## Established facts (the Orchestrator verified each; do not re-derive)

1. Wrapping the recreation in `@layer bootstrap` makes (a) a consumer's unlayered normal declaration beat every Bootstrap declaration regardless of specificity, (b) a Bootstrap `!important` utility beat a consumer's later unlayered `!important`, and (c) leaves the relative order inside the layer intact (Astra, Chromium run).
2. When `./bootstrap` (`@layer bootstrap;`) and `./tailwindcss` (`@layer theme, reset, base, elements, components, utilities;`) load in either order, the position of `bootstrap` relative to `utilities` flips with the load order (Astra, Chromium run).
3. The theme pack's compound selectors `[data-vn-theme='default'][data-bs-theme='light|dark']` do not reach a nested `[data-bs-theme="dark"]` island, and a consumer who sets only `data-bs-theme` receives nothing from the pack (Astra, Chromium run).
4. `TOKEN_NAMES.bootstrap` equals the 117 names of Bootstrap 5.3.8's `:root, [data-bs-theme=light]` block (proved two ways after `foundation-fix-1`). `TOKEN_NAMES.veneer` names roughly 150 `--vn-*` properties that no sheet declares; the `styles` face ships only its layer-order statement.
5. The consumer Tailwind preflight probe of the prior campaign read zero departures across every engine scenario with the old cascade layered as `theme, reset, base, elements, components, utilities` and Tailwind's own layers merged into it (`absorb-engine-terrain-distillate.md`, the last row of its table).
6. `isVueBuildExternal` refuses `vue`, `vue/*`, and `@vue/*` in the published `./vue` build; the built `dist/src/vue/index.js` is empty today. Under pnpm's strict layout or Yarn PnP, a bare `vue` import inside `dist/src/vue/index.js` does not resolve unless the package declares `vue` (as a dependency, a peer, or an optional peer); under npm it resolves through hoisting.
7. The vendored `.claude/rules/styles.md` names `_mixins.scss`, `_tokens.scss`, `_theme.scss`, and `index.scss`; requires `index.scss` to load `tokens`, `theme`, and the output partials; requires each partial to use its folder's own layer; and requires one cascade-layer order declared in the consumer entry before `@import 'tailwindcss'`. The roadmap replaces `_theme.scss` with a `themes/` folder that `index.scss` does not load, gives each face its own order statement, and wraps every Bootstrap partial in one `bootstrap` layer.
8. The CSS-face proofs run in Node over the built text; the rule matrix in `workspace.md` places `src:styles` in Playwright Chromium with `setupStyles.ts`. No browser project exists for a CSS face today.

## Questions (answer every one; number the answers)

1. **The `./bootstrap` layer contract.** Rule between: (i) ship `./bootstrap` unlayered, byte-faithful, a drop-in; (ii) ship it layered with every `!important` lifted out through `@at-root (without: layer)` per the prior verdict's option (a); (iii) ship it layered and document the divergence. For the option you adopt, state what "the same output" means as a provable equality, what "Bootstrap wins on a shared class" means for a normal declaration and for an important one, and what a consumer's override path is (its own `!important`, a token, source order). State whether one authored Sass source can emit both an unlayered and a layered form (a module variable and one wrapping mixin) and whether the roadmap sentence "Bootstrap cascade-layer order is the single `bootstrap` layer" survives.
2. **Cross-face composition.** How do `./bootstrap`, `./tailwindcss`, and `./styles` compose so the result does not depend on which sheet the document loads first, and so a consumer who loads real Tailwind (whose own order is `theme, base, components, utilities`) beside them gets a deterministic order? Consider one shared order statement emitted at the top of every face, a `./layers` prelude subpath loaded first, and the `tailwindcss` face importing the layered form of the Bootstrap Sass so that `./tailwindcss` is the one sheet a Tailwind consumer loads. Say which layer names each face may declare and where Veneer's `surfaces`, `composables`, and `modifiers` layers sit relative to `utilities`.
3. **The recreation proof.** Define the instrument that proves `./bootstrap` equals Bootstrap 5.3.8's exported CSS: what is compared (rules, selectors, declarations, values, importance, at-rule context, source order), what is normalized (comments, whitespace, the Vite marker, a layer wrapper if any), which parser reads both sides (the browser's CSSOM through a constructable stylesheet in Chromium, or the toolchain's own parser; `AGENTS.md` admits no second parser for CSS), and the control that must fail (one declaration changed in a copy). Then place every CSS-face proof: which run in Node over text, which in Chromium over resolved style, and in which Vitest project each lives under the `workspace.md` matrix.
4. **Themes.** Give the selector scheme for `data-vn-theme` packs that reaches Bootstrap colour-mode islands and states what a consumer who sets only `data-bs-theme` receives; rule whether the default pack is opt-in or on by default; and give the CSS-only consumer a built theme entry (an export shape and a build target) without folding themes into `./styles`.
5. **The token registry.** Rule the scope of `TOKEN_NAMES.veneer` before the styles chunk declares its tokens (keep, trim to what ships, or defer) and the key scheme of both groups against `names.md` § General vocabulary (the `bootstrap` group keys `subtle`, `emphasis`, `border`, `line`, and `base` shorten Bootstrap's own words `bg-subtle`, `text-emphasis`, `border-subtle`, `line-height`, and `box-shadow`); state the proof that pins each group to its sheet in both directions.
6. **Vue without a dependency.** Reconcile the tenet "the consumer supplies Vue, not a peer dependency" with a `./vue` face that must call Vue at runtime. Weigh: an optional peer (`peerDependencies` plus `peerDependenciesMeta.vue.optional`, a tenet amendment), documenting an npm-hoisting requirement, and the prior campaign's design "an adapter that takes the consumer's reactivity and lifecycle primitives by injection and imports nothing" (`units/decisions-round-2.md` D3 and the roadmap ruling that preceded it). State the consumer's import in each case and what pnpm and Yarn PnP do.
7. **The styles rule against the roadmap.** Draft the smallest amendment that removes the conflict in fact 7: either the rule file gains the `themes/` folder, per-face order statements, and the one-layer face, or the roadmap conforms to the rule. State the amendment as the exact sentences to change in `.claude/rules/styles.md` or `ROADMAP.md`.
8. **The showcase and journey conventions.** The user fixed `showcase/browser.html` and `showcase/vue.html` at the repository root with no copy step. Propose the gate that fails when a page is stale relative to its application, given the stamp is a content hash after `foundation-fix-2`, and say which Vitest project holds it.
9. **Scaffold propagation.** List every behaviour the five hand-edited vendored files carry (`configs/helpers.ts`, `tests/config.test.ts`, `tsconfig.json`, `.oxlintrc.json`, `.prettierignore`) with the scaffold change that carries each: a `vue` environment on both axes, the CSS faces as a surface kind, the showcase and journey mode helpers, the root check through `vue-tsc` when Vue is selected, and a home for a package-owned config leaf if one is needed. Order them by what unblocks the veneer chunks first.

## Output

Return exactly this document, no process diary:

```markdown
# foundation-design — <lane> proposal

## Answers
1. …
9. …

## Proposal
The contract as a whole: one paragraph per surface (`.`, `./browser`, `./vue`, `./bootstrap`, `./tailwindcss`, `./styles`, `./styles/themes`), each naming what it ships, its layer names, its override path, and its proof.

## Tenet conflicts
One bullet per tenet a proposal cannot satisfy, with the smallest amendment.

## Units
A table of the units that implement the proposal on the foundation before any chunk opens: unit, owned files, acceptance criterion, and what it must not touch.

## Alternatives refused
One bullet per alternative, with the evidence that refuses it.
```

Cite `path:line` for every fact you take from the tree or the records. Where a claim needs a run you cannot make, label it unverified and name the run.
