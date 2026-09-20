# Evidence map — veneer-context

Observed facts below. Inferred intent is labeled. No architecture or plan.

---

## Before status (recorded before reading)

| Repo                                                    | Branch | HEAD       | Status                                            |
| ------------------------------------------------------- | ------ | ---------- | ------------------------------------------------- |
| Scaffold `C:\Users\mikes\WebstormProjects\scaffold`     | `main` | `b838db3d` | `## main...origin/main` · untracked `.orkestrel/` |
| Veneer `C:\Users\mikes\WebstormProjects\veneer`         | `main` | `fc36cec`  | `## main...origin/main` (clean)                   |
| Elements `C:\Users\mikes\WebstormProjects\elements`     | `main` | `3b41900`  | `## main...origin/main` (clean)                   |
| Mailbox `C:\Users\mikes\WebstormProjects\mailbox`       | `main` | `8b54542`  | `## main...origin/main` (clean)                   |
| Roughnotes `C:\Users\mikes\WebstormProjects\roughnotes` | `main` | `4a59192`  | `## main...origin/main` (clean)                   |

---

## Authority conflicts

**Scaffold (current law for this session).** `AGENTS.md` + `.agents/orchestration.md` + `.claude/rules/styles.md` / `workspace.md` / `writing.md`. Styles environment is SCSS: `src/styles/index.ts` imports `./index.scss`; centralized `_tokens.scss` / `_mixins.scss` / `_theme.scss` / `index.scss` (`styles.md` lines 13–29; `workspace.md` line 35). Inspect declared `@orkestrel/*` before overlapping logic. Gates are non-mutating `format:check` → `lint:check` → `check` → `build` → `test`.

**Veneer AGENTS.md** is an older sibling copy (no orchestration contract, no `@orkestrel` reuse rule, `check` is `tsc` + `oxlint`). **Veneer ROADMAP.md:198–206** states CSS-first, **never Sass**; **ROADMAP.md:16–18, 511** explicitly does **not** adopt Elements’ `--set-*` / element-scoped model; `--bs-*` stays the binding seam.

**Elements AGENTS.md / Mailbox AGENTS.md** are older coding-standards copies. Elements `guides/contribute.md` is listed as workflow companion. Elements `ROADMAP.md` (all phase checkboxes unchecked) targets the opposite of current `guides/styles.md` principle 6: strip ancestry disambiguation; bare tags get universal-only styling; composition via platform signal or named class.

**Conflict (source).** Scaffold `styles.md` requires Sass centralization. Veneer law forbids Sass. User direction (brief) wants Veneer as a proper Orkestrel package, Elements look/feel, Bootstrap drop-in, Tailwind compatibility, tag-scoped semantic defaults, class composition. Those documents do not currently agree. This unit does not rule which wins.

**Catalog vs live.** Scaffold source `package.json` is `@orkestrel/scaffold` `0.0.75`. `.claude/agents/orkestrel.md` table still lists scaffold `0.0.73` and `@orkestrel/test` `0.0.17`. Roughnotes lock resolves scaffold `0.0.75` and test `0.0.18`. Catalog is tree copy, not live registry.

---

## Veneer

**Package shape (manifest).** `package.json`: name `veneer`, version `0.0.0`, `"private": true`. No `@orkestrel/` scope. Files: `src/styles`, `dist/src/styles`. Exports: `.` → `src/styles/index.ts` types + `src/styles/index.css` style/default; `./styles.css`, `./tokens.css`, `./tailwindcss.css`, `./bootstrap/*`. No `src/core`, `src/browser`, `src/server`. Runtime deps: `bootstrap` `^5.3.8`, `@popperjs/core` `^2.11.8`. Dev: `tailwindcss` `^4.3.1`, `@tailwindcss/vite`, Vitest/Playwright, TypeScript, Vite. **No `@orkestrel/*`. No `sass`.**

**Lock-resolved.** `bootstrap` `5.3.8`; `@popperjs/core` `2.11.8`; `tailwindcss` `4.3.1`.

**Installation.** `node_modules/bootstrap/package.json` and `node_modules/tailwindcss/package.json` **not present**. Dist `dist/src/styles/index.css` **not present**. Lockfile exists; install tree does not.

**Sass entry / tokens / cascade.** CSS-only. Barrel `src/styles/index.css:4–5` `@import './tokens.css'` then `./bootstrap/index.css`. TS barrel `src/styles/index.ts:5–10` side-effect CSS import; exports types, constants, helpers, tokens. Tokens authored in `src/styles/tokens.ts` (`tokenGroups`, `--vn-*`); generated `tokens.css` written only by `tests/src/styles/tokens.node.test.ts` (`npm run tokens`). Bootstrap layer order `src/styles/bootstrap/index.css:13` `@layer theme, reset, base, components, utilities`. Tokens unlayered (`_variables.css`). Partials self-declare layers. Reboot styles **bare tags** (`body`, `hr`, `h1`–`h6` plus `.h1`–`.h6` twins) in `base/_reboot.css:20–58`. Components are **Bootstrap class roots** (`.btn` in `_buttons.css:8`).

**Bootstrap target.** Itemized compiled Bootstrap **5.3.8** CSS. Showcase `app/browser/main.ts:1–8` also `import 'bootstrap'` (JS data API) plus `setupTooltip` / `setupPopover` / `setupSwitches`. Drop-in CSS is the itemized cascade; interactive widgets still assume Bootstrap JS.

**Tailwind.** Framework bundle Tailwind-free. Consumer entry `app/browser/styles/main.css:13–17`: `@layer tailwind, theme, reset, base, components, utilities`; `@import 'tailwindcss' layer(tailwind)`; then framework; then `tailwindcss.css`. Bridge `src/styles/tailwindcss.css:27–50` `@theme` maps `--color-primary` etc. to `--vn-*`; interop fix `.collapse { visibility: visible }` inside `@layer tailwind`. **Policy: Bootstrap wins collisions** (`guides/tailwind.md:44–48`). Residual: `.collapse` visibility. Guard: `tests/app/browser/interop.test.ts`.

**Runtime API.** Styles-only public TS: `TokenGroup` in `src/styles/types.ts:4–9`; `tokenGroups` / helpers / constants. No Vue composables, no factories. App helpers only for showcase.

**Build / test / guide.** Scripts: `dev`, `build` (`clean` + `build:styles` + `build:app`), `showcase`, `build:showcase`, `show` → `demo/showcase.html`, `tokens`, `check`, `test`, scoped `test:src:styles` / `test:app:browser` / `test:guides`. Guides: `guides/README.md`, `styles.md`, `tokens.md`, `tailwind.md`, `showcase.md`. ROADMAP phases 1–8 marked shipped. Tests: cascade snapshot, rendered-DOM golden, token triangle, scale-audit, layers, treeshake, switches, bundle, helpers; app statecharts for Modal, Offcanvas, Collapse, Alert, Tabs, Tooltip, Popover. Local `StateTransition` / `StateScenario` in `tests/setup.ts:13–29` (not `@orkestrel/test`). No `vite.journey.config.ts`.

**First in-repo consumer.** `app/browser` showcase. No other package in this sweep imports `veneer`.

---

## Elements

**Package shape.** `package.json`: name `elements`, version `0.0.1`, `publishConfig.access: public`. Description: “Semantic-first CSS/SCSS framework and Vue composable library, one partial per HTML element”. Files: `dist`, `README.md`. Exports: `./browser`, `./core`, `./styles` → compiled CSS, `./styles/scss`. Runtime: `@vue/reactivity` `^3.5.35`. Dev: `sass` `^1.100.0`, `tailwindcss` `^4.3.0`, `@tailwindcss/postcss`, Vue, Vitest. **No `@orkestrel/*`. No `bootstrap` package.**

**Lock-resolved.** `sass` `1.100.0`; `tailwindcss` `4.3.0`; `@vue/reactivity` `3.5.35`.

**Installation.** `node_modules/sass/package.json` and any `@orkestrel/*` **not present**.

**Sass entry / tokens / cascade.** `src/styles/index.scss:18–26` `@use` tokens, theme, themes, elements, components, surfaces, composables, modifiers. Mixins never loaded from the barrel. Layer order declared in **consumer** CSS: `theme, base, elements, components, surfaces, composables, modifiers, utilities` then `@import 'tailwindcss'` (`guides/styles.md:14–16`). Tokens: `--set-*` plus Tailwind `--color-*` / `--spacing` / `--radius-*`. Element-scoped tokens on the tag, not only `:root`. Themes: `data-theme` cores `auroramoon`, `eclipse`, `honeymoon`, `lagunamoon` orthogonal to `data-mode` (`themes/_core.scss:4–14`).

**Visual language (source intent, not rendered proof).** README: `<button class="primary large">` not `.btn-primary-lg`; bare `<dialog>` lifts; `.danger` on a form tints the cascade. Principle 6 (`guides/styles.md:129`): HTML element IS the component; ancestry disambiguates (`article > header` = card header; `body > aside` = sidebar). Class roots only when no semantic home (`.skeleton`, `.spinner`, `.badge`, `.dot`, `.tag`, `.stack` / `.cluster` / `.frame`). **Current code matches that:** `components/_article.scss:11–19` — bare `<article>` is a card with descendant header/footer slots, no class.

**ROADMAP (plan, not landed).** `ROADMAP.md:9–19` one-line rule: style the tag for what it always is; class or signal for what it sometimes becomes; combine two bare tags only when HTML mandates the pairing. Phases 0–7 checkboxes all `[ ]`. Target class names include `.card`, `.shell`; keep Elements modifier composition (`.tag.primary.filled`) on `--set-*`, adopt Mailbox root **names** not `--bs-*` (`ROADMAP.md:129–145`).

**Tag vs class.** Elements layer: one partial per HTML tag. Components layer: compositions via **bare-tag ancestry** (current) vs planned class/signal. Spec pairings (e.g. `details > summary`) remain allowed in the plan.

**Bootstrap.** Not a class-compatible drop-in. Guide claims “Bootstrap-parity defaults” for radius/gap/z-index/focus (`guides/styles.md:131–137`), not Bootstrap markup.

**Tailwind.** Base: preflight, scale tokens, every utility. Framework cedes utility names. Consumer `@theme` for semantic colors (SCSS `@theme` would be ignored). Utilities last so `p-8` beats framework padding.

**Runtime.** `src/browser/index.ts` exports tokens, modifiers, elements, taxonomy, patterns, events, factories, composables, traversals, inspector. Factories: `createAlert`, `createAside`, `createButton`, `createCarousel`, `createDetails`, `createDialog`, `createDrag`, `createDrop`, `createFocus`, `createForm`, `createMenu`, `createNav`, `createPointer`, `createPopover`, `createSelect`, `createTable`, `createTabs`, `createTheme`, `createToast`, `createTooltip`. Composables: matching `use*` (no `useCollapse` / `useModal` / `useOffcanvas` / `useDropdown` / `useScrollSpy` — those exist on Mailbox). Core: local compilers/parsers/shapers/validators (`src/core/index.ts`) — **not** `@orkestrel/contract`. Inspector exported.

**Build / test / guide.** `check` runs `oxlint --fix` then `vue-tsc` (mutating). `showcase` / `show` → `demo/showcase.html`. Tests mirror styles folders (elements, components, surfaces, modifiers, composables, integration) plus core, browser factories, inspector. No journey config. Guides under `guides/` including `w3c/` (not absorbed in this unit). `guides/README.md` too large to load whole (111308 chars) — unread beyond existence.

**First consumer.** Showcase app. README install string is `npm install elements tailwindcss @tailwindcss/postcss` (unscoped). No other repo in this sweep depends on it.

---

## Mailbox

**Package shape.** Name `mailbox`, version `0.0.1`, public publish. Description: “CSS/SCSS framework and Vue composable library with app showcase”. Exports: `./browser`, `./styles`, `./styles/scss`. **No `./core` export** even though `src/core/` exists with the same compiler/parser/shaper/validator set as Elements. Runtime: `@vue/reactivity` `^3.5.35`. Dev: `sass` `1.100.0`, `tailwindcss` `^4.3.0`, `bootstrap-icons` `^1.13.1`, Vue. **No `bootstrap` package. No `@orkestrel/*`.** No root `README.md` found.

**Lock-resolved.** `sass` `1.100.0`; `tailwindcss` `4.3.0`; `bootstrap-icons` `1.13.1`; `@vue/reactivity` `3.5.35`.

**Installation.** `node_modules/sass` and `@orkestrel/*` **not present**.

**Sass entry / tokens / cascade.** `src/styles/index.scss` three sections: Bootstrap-named components; `themes`; application extensions. `_tokens.scss:30` `@layer theme, reset, base, components, utilities`. `--bs-*` tokens, HSL triplets, `mixins.tint`. Themes: `data-bs-theme` plus cores `honeymoon` / `eclipse` / `auroramoon` / `lagunamoon`. Dark via `[data-bs-theme='dark']` and OS-follow (`themes/_modes.scss:21–29`). Factors `--bs-radius-factor` / `--bs-density-factor` rescale Mailbox **and** Tailwind (`guides/styles.md:42`).

**Role.** `guides/styles.md:9–25`: **own** Bootstrap-named components (no upstream Bootstrap import); Tailwind owns reset, scale tokens, utilities. Connector `@theme` in `src/styles/theme.css` (must be imported in consumer Tailwind entry). Unique utilities kept: `.text-bg-*`, `.link-*`, `.focus-ring`, `.icon-link`, `.stretched-link`, `.vstack` / `.hstack`, `.vr`, `.clearfix`, `.fixed-top` / `.sticky-*`, `.bg-gradient`.

**Bootstrap compatibility (source).** Class names `.btn`, `.alert`, `.card`, `.modal`, … keep Bootstrap names and cascade position (`guides/styles.md:140–145`). JS is Vue composables / factories, not Bootstrap’s JS. **Collision policy opposite Veneer:** three shared names `.collapse`, `.container`, `.table` sit in `@layer components`; Tailwind utilities later **win ties** (`guides/styles.md:45`).

**Tailwind coexistence.** Foundation model. Semantic `.bg-primary` and `.btn-primary` share `--bs-primary`. No-conflict test `tests/src/styles/integration.test.ts`.

**Runtime.** Browser barrel: tokens, helpers, factories, Vue composables (`useAlert` … `useTooltip`, including `useCollapse`, `useDropdown`, `useModal`, `useOffcanvas`, `useScrollSpy`, `useTab` — names Mailbox has that Elements does not). Inspector **exists** under `src/browser/inspector/` and is tested; **not** re-exported from `src/browser/index.ts`.

**Build / test / guide.** Same mutating `check` as Elements. `showcase` / `show` → `demo/showcase.html`. `serve` points at `dist/app/server/main.cjs` (server build unread). Style tests per partial; browser factory tests; inspector tests. Guides: `guides/styles.md`, `guides/composables.md`, `guides/w3c/*`. No ROADMAP.md. No journey config.

**First consumer.** Showcase. No other repo in this sweep depends on `mailbox`.

---

## Roughnotes (relevant surfaces)

**Consumer of upstream Bootstrap, not Veneer/Elements/Mailbox.** `app/browser/styles/index.scss:2–70` `@use 'bootstrap/scss/bootstrap' with ( … )` overriding Sass variables from `_tokens.scss` (`$primary: #0a2540`, Georgia headings, 0.75rem radius, custom spacers including steps 6 and 7). Then `@use 'theme'` / `signature`. No Veneer/Elements/Mailbox import.

**Manifest.** Private `roughnotes` `0.0.1`. Runtime: `@orkestrel/emitter` `^0.0.10`, `@orkestrel/router` `^0.0.15`. Dev: `@orkestrel/contract` `^0.0.17`, `guide` `^0.0.20`, `html` `^0.0.10`, `probe` `^0.0.16`, `scaffold` `^0.0.75`, `test` `^0.0.18`, `bootstrap` `^5.3.8`, `bootstrap-icons`, `sass` `^1.104.0`. **No tailwindcss in lockfile.** Scripts include `test:journey` in the `test` chain.

**Lock-resolved.** `@orkestrel/test` `0.0.18`; `@orkestrel/scaffold` `0.0.75`; `@orkestrel/contract` `0.0.17`; `bootstrap` `5.3.8`; `sass` `1.104.0`.

**Installation.** `@orkestrel/test` `0.0.18` **present** (`node_modules/@orkestrel/test/package.json`). Bootstrap icons tree observed under `node_modules`.

**Theme / menu.** `data-bs-theme` light/dark via `writeTheme` (`app/browser/helpers.ts:134`). Storage key `roughnotes-theme`. Compact menu is Bootstrap **Offcanvas** (`App.vue:151–226`): `data-bs-toggle="offcanvas"`, `aria-expanded` bound, `Offcanvas` from `bootstrap`. ROADMAP closed items name this: listing/footer accessible names and menu `aria-expanded` closed in Roughnotes `57b738f`.

**Journey proof.** `configs/app/vite.journey.config.ts:7–12` variants `light-1280`, `dark-1280`, `light-390`, `dark-390`. `tests/app/browser/integration.test.ts:128–134` families: `journey`, `refusal`, `matrix`, `transport`, plus `capture` when `inject('capture')`. Theme applied **through the masthead control** (`applyTheme` in `tests/setupBrowser.ts:1057–1070`). Capture dest `tmp/capture/states`; artifact `tmp/journeys/${VARIANT}.txt`. **Statechart family is not in `FAMILIES`.** Setup uses `@orkestrel/test` / `@orkestrel/test/browser` (contrast, census, refusal, journeys). Theme tests also drive `.btn` / `data-bs-theme` islands (`tests/app/browser/styles/theme.test.ts`).

**Visual files.** No `png`/`jpg`/`webp` under Roughnotes. Whether gitignored `tmp/capture` holds frames is **unread**.

---

## Scaffold lessons (accepted / relevant)

ROADMAP closed in Roughnotes `57b738f`: listing vs footer accessible names; menu `aria-expanded` + disclosure through the interface. Journey skill / `@orkestrel/test` closed items: `pressKeys`, `waitForText`, `readRefusal`, statechart example, skill-import inspector. `guides/test.md` notes `elements` and `veneer` each declare field-identical `StateTransition` / `StateScenario` in their own setup — fleet already writes this twice; `@orkestrel/test` now ships the pair.

`enterprise-bootstrap` skill: target **Bootstrap 5.3.x** class names and behaviors; hold a compatible skin to the same component contracts (`.agents/skills/enterprise-bootstrap/SKILL.md:56`).

`workspace.md`: styles surface is optional SCSS producing `index.css`; `src/styles/index.ts` imports `./index.scss`. Veneer imports `./index.css` instead.

`orkestrel-align-packages` / `orkestrel-prove-journey` loaded at skill headers. References `integration.md`, `fleet.md`, `layer.md`, `captures.md`, journey `styles.md`, `statechart.md`, `decide.md` **not fully read** (process contracts; not package source).

---

## Dependency graph

```
(no edges among veneer ↔ elements ↔ mailbox)

veneer  --runtime--> bootstrap@5.3.8, @popperjs/core@2.11.8
        --dev------> tailwindcss@4.3.1 …
        --orkestrel--> none (declared)
        --install--> missing (bootstrap/tailwindcss package.json absent)

elements --runtime--> @vue/reactivity@3.5.35
         --dev------> sass@1.100.0, tailwindcss@4.3.0, vue@3.5.35 …
         --orkestrel--> none
         --install--> missing

mailbox  --runtime--> @vue/reactivity@3.5.35
         --dev------> sass@1.100.0, tailwindcss@4.3.0, bootstrap-icons@1.13.1, vue …
         --bootstrap package--> none
         --orkestrel--> none
         --install--> missing

roughnotes --runtime--> @orkestrel/emitter, @orkestrel/router
           --dev------> @orkestrel/{contract,guide,html,probe,scaffold@0.0.75,test@0.0.18},
                        bootstrap@5.3.8, bootstrap-icons, sass@1.104.0
           --veneer/elements/mailbox--> none
           --tailwindcss--> none in lock
           --install--> @orkestrel/test 0.0.18 present

scaffold catalog (tree): no veneer / elements / mailbox rows
@orkestrel/style, @orkestrel/veneer: absent from catalog table
```

**Registry evidence:** not fetched this unit. Catalog is not live.

---

## Philosophy vs user direction

**User direction (brief, not evaluated):** convert Veneer into a proper Orkestrel package; preserve Elements look and feel; build on Elements and Mailbox useful work; drop-in Bootstrap replacement; Tailwind CSS compatibility; semantic defaults scoped to an individual tag; reserve component composition for classes; implement component by component.

| Topic               | Veneer (shipped)                                    | Elements (shipped code)                          | Elements ROADMAP (unchecked)        | Mailbox (shipped)                                           | Roughnotes                               |
| ------------------- | --------------------------------------------------- | ------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| Package             | private unscoped CSS lib                            | public unscoped dual CSS+TS                      | same repo, not landed               | public unscoped dual CSS+TS                                 | Orkestrel app + upstream Bootstrap Sass  |
| Look                | Bootstrap 5.3.8 itemized, `--vn-*` under `--bs-*`   | semantic tags + `--set-*` + orthogonal modifiers | de-promote tags; `.card` / `.shell` | Bootstrap class chrome + `--bs-*` + named cores             | Bootstrap Sass vars retuned (navy/serif) |
| Tag defaults        | Reboot + typography on tags; components are classes | Bare tag often **is** the component              | Bare tag universal-only             | `_base.scss` semantic tags; components are classes          | Bootstrap reboot via Sass                |
| Composition         | `.btn`, `.card`, …                                  | ancestry (`article > header`)                    | class or platform signal            | `.card-body` family pattern                                 | Bootstrap class markup                   |
| Sass                | forbidden                                           | required                                         | required                            | required                                                    | required                                 |
| Tailwind collisions | Bootstrap wins                                      | utilities last                                   | unchanged layers                    | Tailwind utilities win on `.collapse`/`.container`/`.table` | no Tailwind                              |
| JS                  | Bootstrap package                                   | factories + Vue `use*`                           | —                                   | factories + Vue `use*` (Bootstrap-named)                    | Bootstrap Offcanvas JS                   |
| Orkestrel           | none                                                | none (local core DSL)                            | —                                   | none (local core DSL; core unexported)                      | `@orkestrel/test` journeys               |

**Inferred (not a finding):** user direction aligns more with Elements ROADMAP + Mailbox class names than with Veneer’s shipped “never Sass / keep `--bs-*` / reject `--set-*`” rulings. Feasibility not assessed.

---

## Component / feature inventory

### Veneer CSS (itemized Bootstrap 5.3.8)

**Base:** `_variables.css` (unlayered `--bs-*` bound to `--vn-*`), `_reboot.css`, `_typography.css`, `_images.css`.  
**Layout:** `_containers`, `_grid`, `_tables`, `_forms`.  
**Components:** `_buttons`, `_transitions`, `_dropdown`, `_button-group`, `_nav`, `_navbar`, `_card`, `_accordion`, `_breadcrumb`, `_pagination`, `_badge`, `_alert`, `_progress`, `_list-group`, `_close`, `_toast`, `_modal`, `_tooltip`, `_popover`, `_carousel`, `_spinners`, `_offcanvas`, `_placeholders`.  
**Helpers / utilities / print:** `_helpers.css`, `_utilities.css`, `_print.css`.  
**Tokens:** factors (`--vn-space-factor` … `--vn-font-factor`), palette, spacing, type, radius, elevation, motion, z-index, semantic color roles; switches `data-bs-theme`, `data-vn-radius`, `data-vn-density`.  
**JS (showcase):** Bootstrap bundle + tooltip/popover init.  
**Not present:** Vue, Sass, inspector, factories, journey axis, `@orkestrel/*`.

### Elements

**Elements layer:** one SCSS partial per tag (substantive / reset / passthrough per `guides/elements.md` taxonomy). Documented cascade tags include `a`, `address`, `article`, `aside`, `audio`, `blockquote`, `button`, `canvas`, `code`/`kbd`/`samp`/`var`, `data`/`time`, `dd`/`dl`/`dt`, `details`, `dialog`, `embed`/`iframe`/`object`, `fieldset`, `figcaption`, `figure`, `footer`/`header`, `form`, `hgroup`, `hr`, `input`, `label`, `legend`, `main`, `mark`, `math`/`svg`, `menu`, `meter`/`progress`, `nav`, `output`, `pre`, `search`, `section`, `select`, `small`/`strong`/`u`, `summary`, `table` family, `textarea`, `video`. Override: `html`, `body`, `h1`–`h6` (shared `--set-heading-*`), `li`, `ol`/`ul`, `p`, `abbr`, `b`, `i`, `sub`/`sup`, `img`, `picture`. Passthrough includes `div`, phrasing, table internals, `datalist`/`option`.  
**Components:** `_body` (`body:has(main)` shell), `_main`, `_article` (card), `_aside` (rail/callout/alert/drawer), `_header`, `_footer`, `_nav`, `_search`, `_menu`, `_output` (toast), `_form`, `_div` (`.stack` `.cluster` `.frame` `.tiles` `.split` `.panes` `.muted` `.fill` `.fluid` …), `_avatar`, `_badge`, `_tag`, `_dot`, `_skeleton`, `_spinner`, `_role-group`.  
**Surfaces:** anchor-position, backdrop, focus, marker, placeholder, popover, scrollbar, selection, view-transition.  
**Composables CSS:** aside, carousel, dialog, select, tabs, toast.  
**Modifiers:** variants, sizes, styles, local, states, placements.  
**Themes:** default + auroramoon / eclipse / honeymoon / lagunamoon.  
**TS:** factories/composables listed above; inspector; taxonomy/patterns parity tests.

### Mailbox

**Bootstrap-named partials:** tokens, theme, base, grid, tables, forms, buttons, collapse, dropdown, select, button-group, nav, card, breadcrumb, badge, dot, alert, progress, list-group, close, floater, toast, modal, tooltip, popover, carousel, spinner, offcanvas, sidebar, pagination, accordion, placeholder, skeleton, utilities.  
**Themes:** `_modes` + auroramoon / eclipse / honeymoon / lagunamoon.  
**Extensions:** drag, avatar, empty-state, splitter, stepper, tag, rating, date-picker, time-picker, range-slider, disclosure, kbd, code, stat, chart, timeline, misc.  
**TS factories/composables:** Alert, Button, Carousel, Collapse, Details, Dialog, Drag, Drop, Dropdown, Focus, Form, Modal, Offcanvas, Pointer, Popover, ScrollSpy, Select, Tab, Table, Theme, Toast, Tooltip.

### Roughnotes app (Bootstrap consumer)

Shell: Bootstrap navbar/offcanvas/buttons/cards/forms. Theme: `data-bs-theme`. Styles: Sass variable overrides + `_theme` / `_signature`. Not a library inventory.

---

## Conformance / journey evidence

| Surface                    | What exists                                                                                                                                                                                                                                                                               | Hole                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Veneer                     | Node oracles (cascade snapshot `tests/src/styles/__fixtures__/cascade.snapshot.txt`, token codegen, layers, treeshake, scale-audit); browser rendered golden `tests/src/styles/rendered.test.ts` + `__snapshots__/rendered.test.ts.snap`; interop test; local statecharts vs Bootstrap JS | No `@orkestrel/test` journey axis; no capture portfolio; gates **not run** this unit           |
| Elements                   | Per-partial style tests; guide parity (`tests/guides/*` named in components.md); inspector tests                                                                                                                                                                                          | No journey config; ROADMAP contract tests not landed; gates not run                            |
| Mailbox                    | Per-partial style tests; `integration.test.ts` collision/no-conflict; factory tests                                                                                                                                                                                                       | No journey; inspector unexported; gates not run                                                |
| Roughnotes                 | Full journey families (except statechart undeclared); refusal; matrix via interface theme toggle; transport; optional capture                                                                                                                                                             | Frames on disk unread (`tmp/capture/states`); this unit did not execute `npm run test:journey` |
| Scaffold `@orkestrel/test` | Installed in Roughnotes `0.0.18`; catalog lists `0.0.17`                                                                                                                                                                                                                                  | Veneer/Elements/Mailbox do not depend on it                                                    |

**Assertions cite source only.** No test was executed. Do not read any suite as passing.

---

## Visual evidence and how to render

**No screenshot files** (`png`/`jpg`/`jpeg`/`webp`/`gif`) in Veneer, Elements, Mailbox, or Roughnotes.

**Source intent ≠ rendered proof.** Appearance claims above are from CSS/guides. The only committed “visual” oracles are Veneer’s **text** goldens (computed-style snapshot, cascade declaration list).

**Runnable showcase entries (commands not run):**

- Veneer: `npm run showcase` (`configs/app/vite.showcase.config.ts`); `npm run dev` (browser config); `npm run show` copies `dist/showcase/index.html` → `demo/showcase.html`. Tailwind-active cascade is `app/browser/styles/main.css`. Requires install (currently missing).
- Elements / Mailbox: same script names `showcase` / `show`; `demo/showcase.html` present.
- Roughnotes: `npm run dev` / `showcase`; journey captures when `CAPTURE=1 npm run test:journey`.

---

## Unresolved / unread

- Live npm registry versions (not fetched).
- Veneer/Elements/Mailbox `node_modules` beyond the missing `package.json` probes; `dist/` contents.
- Elements `guides/README.md` body; most `guides/w3c/*`; contribute.md workflow detail.
- Mailbox `guides/styles.md` remaining parts; `guides/composables.md`; whether `serve`/server app exists in dist.
- Align-packages `references/integration.md` and `fleet.md`; prove-journey remaining references; enterprise-bootstrap token/component/verification references beyond SKILL opening.
- Whether `tmp/capture` frames exist (likely gitignored).
- Rendered look of Elements vs Mailbox vs Veneer vs Roughnotes (no browser, no screenshots).
- Gate results.
- Whether Elements ROADMAP work has any uncommitted progress (git status clean → no).
- Historical journals (off-limits).
- First **external** consumer of Veneer/Elements/Mailbox: none found in this sweep; absence outside these repos unread.

---

## After status

Same as before. No repository modified.

| Repo       | Branch | HEAD       | Status           |
| ---------- | ------ | ---------- | ---------------- |
| Scaffold   | `main` | `b838db3d` | `?? .orkestrel/` |
| Veneer     | `main` | `fc36cec`  | clean            |
| Elements   | `main` | `3b41900`  | clean            |
| Mailbox    | `main` | `8b54542`  | clean            |
| Roughnotes | `main` | `4a59192`  | clean            |
