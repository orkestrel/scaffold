I’ll gather the Tailwind wiring, scaffold rules, and Veneer cascade evidence as citations only, and I’ll check Veneer’s git status before and after so the tree stays clean.The Tailwind package is not installed under either fleet checkout, so the shared-class intersection and the preflight-versus-reboot pairing were not read from package files. `git -C /home/user/veneer status --porcelain` was rejected by the environment on the opening attempt and was not run again; this session used only read tools.

## A. The fleet's Tailwind wiring

**Versions.** Neither checkout names `@tailwindcss/vite`. Both declare the PostCSS plugin and `tailwindcss` as `^4.3.0`, and both lockfiles pin `4.3.0`.

- `/home/user/elements/package.json:63` — `"@tailwindcss/postcss": "^4.3.0",`
- `/home/user/elements/package.json:71` — `"tailwindcss": "^4.3.0",`
- `/home/user/elements/package-lock.json:1802` — `"version": "4.3.0",` under `node_modules/@tailwindcss/postcss`
- `/home/user/elements/package-lock.json:3133` — `"version": "4.3.0",` under `node_modules/tailwindcss`
- `/home/user/elements/package-lock.json:3134` — `"resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.3.0.tgz",`
- `/home/user/mailbox/package.json:56` — `"@tailwindcss/postcss": "^4.3.0",`
- `/home/user/mailbox/package.json:64` — `"tailwindcss": "^4.3.0",`
- `/home/user/mailbox/package-lock.json:1798` — `"version": "4.3.0",` under `node_modules/@tailwindcss/postcss`
- `/home/user/mailbox/package-lock.json:3127` — `"version": "4.3.0",` under `node_modules/tailwindcss`

**`tests/setup.css`.** No `postcss.config.*` exists in either checkout.

Elements declares eight layers, then the bare import, then two `@source` rules:

- `/home/user/elements/tests/setup.css:22` — `@layer theme, base, elements, components, surfaces, composables, modifiers, utilities;`
- `/home/user/elements/tests/setup.css:24` — `@import 'tailwindcss';`
- `/home/user/elements/tests/setup.css:26` — `@source '../src/styles';`
- `/home/user/elements/tests/setup.css:27` — `@source '../tests';`

Mailbox declares five layers, the bare import, a theme import, then two `@source` rules:

- `/home/user/mailbox/tests/setup.css:9` — `@layer theme, reset, base, components, utilities;`
- `/home/user/mailbox/tests/setup.css:11` — `@import 'tailwindcss';`
- `/home/user/mailbox/tests/setup.css:15` — `@import '../src/styles/theme.css';`
- `/home/user/mailbox/tests/setup.css:17` — `@source '../src/styles';`
- `/home/user/mailbox/tests/setup.css:18` — `@source '../tests';`

**Plugin attachment.** The plugin is constructed in each root `vite.config.ts`. The `configs/**` wrappers call those factories and do not name PostCSS themselves (`/home/user/elements/configs/src/vite.browser.config.ts:17` calls `srcBrowser`; `/home/user/elements/configs/src/vite.styles.config.ts:20` calls `srcStyles`; `/home/user/mailbox/configs/src/vite.browser.config.ts:4` is `defineConfig(srcBrowser())`; `/home/user/mailbox/configs/src/vite.styles.config.ts:20` calls `srcStyles`).

Elements attaches the plugin on `srcBrowser` and `srcStyles`. `appBrowser` and `appStyles` extend those factories and do not replace `css`.

- `/home/user/elements/vite.config.ts:8` — `import tailwindcss from '@tailwindcss/postcss'`
- `/home/user/elements/vite.config.ts:164` — `const postcss = { plugins: [tailwindcss()] }`
- `/home/user/elements/vite.config.ts:185` — `css: { postcss },` inside `srcBrowser`
- `/home/user/elements/vite.config.ts:208` — `setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],`
- `/home/user/elements/vite.config.ts:231` — `css: { postcss },` inside `srcStyles`
- `/home/user/elements/vite.config.ts:241` — `setupFiles: ['./tests/setup.ts', './tests/setupStyles.ts'],`
- `/home/user/elements/vite.config.ts:285` — `setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],` inside `appBrowser`
- `/home/user/elements/vite.config.ts:309` — `setupFiles: ['./tests/setup.ts', './tests/setupStyles.ts'],` inside `appStyles`
- `/home/user/elements/vite.config.ts:319` — `projects: [srcCore, srcBrowser, srcStyles, guides, appCore, appBrowser, appStyles],`

Mailbox attaches the plugin on `srcStyles` and `appBrowser` only. `srcBrowser` sets `css` to the Sass deprecation silencer and does not name the plugin.

- `/home/user/mailbox/vite.config.ts:8` — `import tailwindcss from '@tailwindcss/postcss'`
- `/home/user/mailbox/vite.config.ts:118` — `css: silenceBootstrapDeprecations,` inside `srcBrowser`
- `/home/user/mailbox/vite.config.ts:131` — `setupFiles: ['./tests/setupBrowser.ts'],`
- `/home/user/mailbox/vite.config.ts:162` — `postcss: { plugins: [tailwindcss()] },` inside `srcStyles`
- `/home/user/mailbox/vite.config.ts:167` — `setupFiles: ['./tests/setup.ts', './tests/setupStyles.ts'],`
- `/home/user/mailbox/vite.config.ts:240` — `css: { postcss: { plugins: [tailwindcss()] } },` inside `appBrowser`
- `/home/user/mailbox/vite.config.ts:257` — `setupFiles: ['./tests/setupBrowser.ts'],`

**Setup wiring.**

- `/home/user/elements/tests/setupBrowser.ts:33` — `import './setup.css'`
- `/home/user/elements/tests/setupBrowser.ts:34` — `import '../src/styles/index.scss'`
- `/home/user/elements/tests/setupStyles.ts:27` — `import './setup.css'`
- `/home/user/elements/tests/setupStyles.ts:28` — `import '../src/styles/index.scss'`
- `/home/user/mailbox/tests/setupStyles.ts:16` — `import './setup.css'`
- `/home/user/mailbox/tests/setupStyles.ts:17` — `import '../src/styles/index.scss'`
- `/home/user/mailbox/tests/setupBrowser.ts:9` — `export * from './setup'` and that file has no `setup.css` import
- `/home/user/mailbox/tests/src/browser/inspector/presentation.test.ts:78` — `import '../../../setup.css'`
- `/home/user/mailbox/tests/src/browser/inspector/presentation.test.ts:79` — `import '../../../../src/styles/index.scss'`

The same layer line is also in the app entries: `/home/user/elements/app/browser/styles/main.css:22` and `:24` (`@import 'tailwindcss';`), `/home/user/mailbox/app/browser/styles/main.css:18` and `:20`.

**Proofs that assert a Tailwind utility or a preflight rule.** The catalogs those proofs consult are hand-maintained lists, each citing the docs site rather than the installed package:

- `/home/user/elements/tests/setup.ts:386` — `// Source: https://tailwindcss.com/docs (v4 reference, last reviewed`
- `/home/user/elements/tests/setup.ts:391` — `export const TAILWIND_SINGLE_TOKEN_UTILITIES: readonly string[] = [`
- `/home/user/mailbox/tests/setup.ts:134` — `// Source: https://tailwindcss.com/docs (v4 reference, reviewed 2026-05).`
- `/home/user/mailbox/tests/setup.ts:137` — `export const TAILWIND_SINGLE_TOKEN_UTILITIES: readonly string[] = [`

Elements assertions:

- `/home/user/elements/tests/src/styles/integration.test.ts:78` — `it('a Tailwind margin utility (.m-4) applies on top of .primary', () => {`
- `/home/user/elements/tests/src/styles/integration.test.ts:85` — `it('a Tailwind shadow utility (.shadow-lg) applies on top of .primary', () => {`
- `/home/user/elements/tests/src/styles/integration.test.ts:92` — `it('a Tailwind background utility wins over a variant background', () => {`
- `/home/user/elements/tests/src/styles/integration.test.ts:108` — `it('no framework modifier shares a name with a Tailwind bare-name utility', () => {`
- `/home/user/elements/tests/src/styles/integration.test.ts:134` — `const mustContain = ['inline', 'block', 'flex', 'grid', 'hidden', 'container', 'rounded']`
- `/home/user/elements/tests/src/styles/elements/_lists.test.ts:33` — `it('a bare `<ol>` paints `list-style-type: decimal` (Tailwind preflight reset is reversed)', () => {`
- `/home/user/elements/tests/src/styles/elements/_lists.test.ts:40` — `expect(style(ol, 'list-style-type')).toBe('decimal')`
- `/home/user/elements/tests/src/styles/modifiers/_local.test.ts:86` — `expect(TAILWIND.has(name)).toBe(false)`
- `/home/user/elements/tests/guides/modifiers.test.ts:127` — `const collisions = Array.from(MODIFIER_NAMES).filter((name) => TAILWIND_NAMES.has(name))`
- `/home/user/elements/tests/guides/styles.test.ts:51` — `it('tests/setup.css declares the canonical layer order', () => {`
- `/home/user/elements/tests/guides/styles.test.ts:89` — `it('the framework layers sit between the Tailwind bookends (base … utilities)', () => {`

Mailbox assertions:

- `/home/user/mailbox/tests/src/styles/integration.test.ts:97` — `describe('Tailwind preflight is the base reset', () => {`
- `/home/user/mailbox/tests/src/styles/integration.test.ts:100` — `expect(style(el, 'box-sizing')).toBe('border-box')`
- `/home/user/mailbox/tests/src/styles/integration.test.ts:218` — `it('.border-b paints the translucent border color, not the dark text color', () => {`
- `/home/user/mailbox/tests/src/styles/integration.test.ts:229` — `describe('no mailbox class collides with a Tailwind bare-name utility', () => {`
- `/home/user/mailbox/tests/src/styles/integration.test.ts:251` — `for (const n of ['flex', 'grid', 'hidden', 'rounded', 'border', 'shadow', 'truncate']) {`
- `/home/user/mailbox/tests/src/styles/_base.test.ts:407` — `it('restores bullets / numbers (overrides the Tailwind preflight list-style:none)', () => {`
- `/home/user/mailbox/tests/src/styles/_base.test.ts:411` — `expect(style(ul, 'list-style-type')).toBe('disc')`
- `/home/user/mailbox/tests/src/styles/_tokens.test.ts:181` — `it('declares an @layer rule with reset/base/components/utilities/theme order', () => {`
- `/home/user/mailbox/tests/src/styles/_tokens.test.ts:194` — `if (rule.cssText.startsWith('@layer ') && rule.cssText.includes('components')) {`

That last test's comment names an order the source does not declare. The source order is `/home/user/mailbox/src/styles/_tokens.scss:30` — `@layer theme, reset, base, components, utilities;`

Other `@layer` hits under `tests/` (`patterns.test.ts`, `_local.test.ts` layer-wrapper cases, `_aside.test.ts`, presentation comments) assert a framework folder layer, not a Tailwind utility or a preflight rule.

**Elements guide sentences on the Tailwind contract.**

`guides/styles.md`:

- `:3` — Tailwind v4 is named as the base of the framework.
- `:11` — the layer order lives in the consumer entry before `@import "tailwindcss"`, and Tailwind's `@layer theme, base, components, utilities` merges as a no-op.
- `:14` — `@layer theme, base, elements, components, surfaces, composables, modifiers, utilities;`
- `:15` — `@import 'tailwindcss';`
- `:22` — `theme` is Tailwind's, for `@theme` blocks.
- `:23` — `base` is Tailwind preflight.
- `:29` — `utilities` is Tailwind, last.
- `:116` — Tailwind owns the color ramps, the scale tokens, every utility class, and preflight; the framework does not redeclare them.
- `:143` — utilities last, so an explicit utility wins.
- `:203` — the app entry declares the layer order, imports Tailwind, sets `@source`, and imports the framework SCSS; PostCSS is required because the Vite plugin would skip Sass output.
- `:221` — a consumer brings their own Tailwind v4 setup.
- `:225` and `:227` repeat the layer line and `@import 'tailwindcss';`
- `:238` — `@import '@elements/styles';`
- `:274` — CSS-aware tests load `tests/setup.css` then `src/styles/index.scss`.

`guides/tokens.md`:

- `:9` — Tailwind-owned tokens are consumed via `var()` and never redeclared.
- `:365` — Tailwind preflight leaves the UA 16 px on `body`.
- `:488` — do not invent utility classes Tailwind already ships.

`guides/mixins.md:281` — no mixin that duplicates a Tailwind utility.

`guides/components.md:144` — `.tiles` and `.split` are distinct from Tailwind's `.grid`, which only sets `display: grid`.

`guides/modifiers.md`:

- `:21` — no Shape dimension; Tailwind owns `.rounded`.
- `:22` — no `.outline` style; Tailwind owns `.outline`.
- `:36` — no modifier name shadows a Tailwind single-token utility, because utilities sit above modifiers.
- `:303` — names that collide with Tailwind single-token utilities are refused.
- `:332` — do not reuse a Tailwind utility class name as a framework modifier.

`guides/patterns.md:15` — the full `@layer` order also carries Tailwind's `theme`, `base`, and `utilities`.

`guides/patterns.md:152` — names do not collide with `TAILWIND_SINGLE_TOKEN_UTILITIES`.

`guides/composables.md:45` — Tailwind v4 exposes `prefers-reduced-motion` as a class variant.

`guides/composables.md:250` — `.flex`, `.grid`, and `.block` on a `[popover]` defeat the UA `display: none`.

`README.md`:

- `:3` — the framework is layered on Tailwind v4.
- `:27` — `npm install elements tailwindcss @tailwindcss/postcss`
- `:46` — the consumer layer line.
- `:47` — `@import 'tailwindcss';`
- `:51` — declare the order before the import so Tailwind's narrower order merges as a no-op.
- `:66` — the framework expects the PostCSS plugin, not the Vite plugin.
- `:72` — `'@tailwindcss/postcss': {},`
- `:174` — Tailwind owns `.rounded`, `.outline`, and `text-*`.

## B. Scaffold's rules

`/home/user/scaffold/.claude/rules/workspace.md:188` — `tests/setup.css` declares cascade-layer order before `@import 'tailwindcss'` and its `@source`.

`/home/user/scaffold/.claude/rules/workspace.md:189` — browser setup wires `setup.css`.

`/home/user/scaffold/.claude/rules/workspace.md:190` — styles setup loads `setup.css` and the compiled cascade.

`/home/user/scaffold/.claude/rules/styles.md:51` — declare cascade-layer order once in the consumer entry before `@import 'tailwindcss'`, so utilities win predictably.

`/home/user/scaffold/.claude/rules/tests.md` has no `tailwind`, `setup.css`, or `@layer` match.

A search of `/home/user/scaffold/.agents/skills` for `tailwind` returned no matches. The nine skills are `enterprise-bootstrap`, `orkestrel-align-packages`, `orkestrel-build-application`, `orkestrel-debrief`, `orkestrel-falsify`, `orkestrel-harden-package`, `orkestrel-polish-surface`, `orkestrel-prove-journey`, and `orkestrel-publish`. Two files use the word preflight for a capture portfolio, not for Tailwind:

- `/home/user/scaffold/.agents/skills/orkestrel-prove-journey/references/captures.md:122` — the polish-surface campaign owns preflight, verdicts, and reconciliation.
- `/home/user/scaffold/.agents/skills/orkestrel-polish-surface/references/capture-harness.md:87` — repair a portfolio that fails preflight before dispatching it.

## C. Veneer today

`/home/user/veneer/src/styles/_tokens.scss:4` — `@layer theme, reset, base, elements, components, utilities;`

`/home/user/veneer/src/styles/index.scss:1` — `@use 'tokens';` and the barrel continues through `reset`, `elements/*`, `components/*`, and `utilities/gap` (`:55` is `@use 'utilities/gap';`). There is no Tailwind import.

`/home/user/veneer/package.json` has no `tailwind` match. No `tests/setup.css` exists.

`configs/src/vite.styles.config.ts` is the styles project. It spreads `srcBrowser()` and replaces the test fields:

- `/home/user/veneer/configs/src/vite.styles.config.ts:46` — `name: { label: 'src:styles', color: 'cyan' },`
- `/home/user/veneer/configs/src/vite.styles.config.ts:52` — `'./dist/src/styles/index.css',` is the last `setupFiles` entry, after `setup.ts`, `setupBrowser.ts`, and `setupStyles.ts`.

Root `vite.config.ts` projects and the CSS each config loads:

| Project | CSS the config loads |
| --- | --- |
| `srcCore` (`:104`) | none; `setupFiles` is `./tests/setup.ts` (`:117`) |
| `srcBrowser` (`:125`) | none in the config; `setupFiles` is `setup.ts` and `setupBrowser.ts` (`:153`) |
| `appBrowser` (`:166`) | none in the config; same setup pair (`:188`). `app/browser/main.ts:1` imports `../../src/styles/index.scss` and `:2` imports `./styles/index.scss` |
| `appShowcase` (`:200`) | extends `appBrowser`; `:229` sets `cssMinify: 'lightningcss'` |
| `appJourney` (`:243`) | spreads `appBrowser` (`:247`) |
| `policy`, `config`, `setup`, `guides`, `conformance`, `distribution`, `probe` | node setup only (`setup.ts`) |
| `setupBrowser` (`:312`) | `setup.ts` and `setupBrowser.ts` (`:319`); no stylesheet import at the top of `setupBrowser.ts` |

`src:styles` is not in the root `projects` array (`/home/user/veneer/vite.config.ts:402`).

How the cascade reaches a browser document:

- `/home/user/veneer/tests/setupStyles.ts:1` — the module reads no document and imports no stylesheet.
- `/home/user/veneer/tests/setupBrowser.ts:134` — `mountShowcase` does `await import('../src/styles/index.scss')`
- `/home/user/veneer/tests/setupBrowser.ts:135` — then `await import('../app/browser/styles/index.scss')`
- `/home/user/veneer/tests/app/browser/sections/ButtonSection.test.ts:22` — the same pair of stylesheet imports
- `/home/user/veneer/guides/veneer.md:224` — none of the setup modules imports a stylesheet; the styles project loads the built cascade through `setupFiles`

Layer-order case: `/home/user/veneer/tests/src/styles/index.test.ts:33` — `expect(order).toEqual(['theme', 'reset', 'base', 'elements', 'components', 'utilities'])`

**§ Styles does not state the important-utility contract or the Tailwind conflict rule.** The section runs from `/home/user/veneer/guides/veneer.md:114` through the departures that end at `:459`. The only Tailwind mention in that span is the deferred `tests/setup.css` row:

- `:448` — the `tests/setup.css` file arrives with the Tailwind unit.
- `:449` — the workspace rows describe it as cascade-layer order ahead of `@import 'tailwindcss'` and its
- `:450` — `@source` rule. Veneer declares no Tailwind dependency and carries no such file, so it lands with
- `:451` — the unit that adds one.

The unlanded wording is Obligation 6 in `/home/user/scaffold/.orkestrel/veneer/units/f6-brief.md:189` — every Bootstrap utility ships with its `!important` as Bootstrap writes it. `:193` — where a class name exists in Bootstrap and in Tailwind, Bootstrap's declaration wins.

`ROADMAP.md` at the requested lines:

- `:7` — that carries the Elements, Mailbox, Tailwind, and Vue obligations.
- `:27` — Keep Vue, `@vue/reactivity`, Bootstrap, Popper, Tailwind, and every other non-Orkestrel package out of runtime requirements; external packages may be devDependencies.
- `:41` — Remain compatible with Tailwind CSS without requiring it.
- `:42` — Let consumers combine Veneer with Tailwind while retaining control over resets, utilities, component classes, and tokens. Prove the supported combinations in the browser. Veneer must also work independently of Tailwind.
- `:133` — Open Tailwind after the accounting unit, on D2.
- `:144` — the Tailwind `!important` workaround is in the refuse list.
- `:148` — Make Bootstrap and Tailwind compatible, Bootstrap favoured on conflict: every Bootstrap utility
- `:149` — ships with its `!important` as Bootstrap writes it, a consumer overrides one with its own
- `:150` — `!important`, and where a class name exists in both libraries Bootstrap's declaration wins (D2,
- `:236` — `each token group moves a resolved consumer property.` The Tailwind exit sentence is the following item at `:240`: the standalone profile and each supported combination proved in the browser.
- `:263` — F6 closes, among other things, the important-utility contract with its escape and the Tailwind conflict rule stated (D6). The row is not marked landed.
- `:374` — Tailwind tooling is F8; the Orchestrator installs `tailwindcss` and its PostCSS plugin as development dependencies (D2).

## D. Shared class names and shared elements

**Inventory component keys** (first key line under `components`). Each key's selectors are the `selectors` array that follows that line. A second copy of the same keys begins at `:114182` under `counts`.

`progress` `:8`, `spinner` `:609`, `placeholder` `:1152`, `theme` `:1418`, `reboot` `:2822`, `h6` `:4969`, `h5` `:5053`, `h4` `:5137`, `h3` `:5241`, `h2` `:5345`, `h1` `:5449`, `small` `:5553`, `mark` `:5582`, `lead` `:5629`, `display` `:5667`, `list-unstyled` `:6019`, `list-inline` `:6057`, `initialism` `:6133`, `blockquote` `:6171`, `img` `:6293`, `figure` `:6395`, `container` `:6480`, `row` `:7784`, `col` `:9869`, `offset` `:12376`, `g` `:13795`, `gx` `:15526`, `gy` `:16397`, `table` `:17268`, `form` `:19238`, `form-control` `:26124`, `form-select` `:28872`, `form-check` `:30427`, `btn` `:31727`, `form-range` `:38276`, `form-floating` `:38925`, `input-group` `:40251`, `dropdown` `:41593`, `valid-tooltip` `:45081`, `valid-feedback` `:45282`, `invalid-tooltip` `:45448`, `invalid-feedback` `:45649`, `was-validated` `:45815`, `is-valid` `:46791`, `is-invalid` `:47286`, `btn-group` `:47781`, `transition` `:48816`, `collapse` `:48970`, `collapsing` `:49056`, `btn-toolbar` `:49180`, `nav` `:49246`, `navbar` `:50778`, `offcanvas` `:54415`, `card` `:60344`, `list-group` `:61864`, `accordion` `:64941`, `breadcrumb` `:66035`, `pagination` `:66345`, `badge` `:67288`, `alert` `:67536`, `btn-close` `:68372`, `toast` `:69027`, `modal` `:69666`, `tooltip` `:71953`, `popover` `:73020`, `carousel` `:74982`, `clearfix` `:76793`, `text` `:76840`, `link` `:78544`, `focus-ring` `:80547`, `icon-link` `:80772`, `ratio` `:80990`, `fixed` `:81215`, `sticky` `:81335`, `hstack` `:81907`, `vstack` `:81963`, `visually-hidden` `:82019`, `stretched-link` `:82269`, `text-truncate` `:82352`, `vr` `:82399`, `align` `:82473`, `float` `:84620`, `object-fit` `:85060`, `opacity` `:85935`, `overflow` `:86040`, `d` `:86278`, `shadow` `:87817`, `position` `:87903`, `top` `:88017`, `bottom` `:88084`, `start` `:88151`, `end` `:88218`, `translate-middle` `:88285`, `border` `:88365`, `w` `:89250`, `mw` `:89355`, `vw` `:89384`, `min` `:89413`, `h` `:89461`, `mh` `:89566`, `vh` `:89595`, `flex` `:89624`, `justify-content` `:91062`, `align-items` `:91786`, `align-content` `:92391`, `align-self` `:93115`, `order` `:93839`, `m` `:94801`, `mx` `:95644`, `my` `:96865`, `mt` `:98086`, `me` `:98929`, `mb` `:99772`, `ms` `:100615`, `p` `:101458`, `px` `:102182`, `py` `:103230`, `pt` `:104278`, `pe` `:105002`, `pb` `:105764`, `ps` `:106488`, `gap` `:107212`, `row-gap` `:107936`, `column-gap` `:108660`, `font` `:109708`, `fs` `:109737`, `fst` `:109941`, `fw` `:109989`, `lh` `:110132`, `bg` `:110218`, `user-select` `:110965`, `rounded` `:111086`, `visible` `:112275`, `invisible` `:112304`, `z` `:112333`.

**Tailwind files read.** `/home/user/elements/node_modules/tailwindcss/` is absent (`package.json` there was not found; a search for `preflight.css` under `/home/user` found nothing). No preflight stylesheet, theme stylesheet, or utilities source was read. A fetch of the published `4.3.0` package was rejected. There is therefore no second pointer for any class or any preflight rule.

Inventory definitions for the candidate names, one property each. These are the Bootstrap side only.

| Class the inventory defines | Pointer | Property that line sets |
| --- | --- | --- |
| `.container` | `inventory.json:6483` | `:6495` `width` `100%` (after gutter custom properties at `:6486`) |
| `.visible` | `:112278` | `:112282` `visibility` `visible` |
| `.invisible` | `:112307` | `:112311` `visibility` `hidden` |
| `.fixed-top` | `:81218` | `:81222` `position` `fixed` |
| `.sticky-top` | `:81338` | `:81346` `position` `sticky` |
| `.border` | `:88368` | `:88372` `border` `var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)` |
| `.rounded` | `:111089` | `:111093` `border-radius` `var(--bs-border-radius)` |
| `.shadow` | `:87820` | `:87824` `box-shadow` `var(--bs-box-shadow)` |
| `.d-flex` | `:86393` | `:86397` `display` `flex` |
| `.d-grid` | `:86323` | display `grid` on the following declaration |
| `.d-block` | `:86309` | `:86313` `display` `block` |
| `.text-truncate` | `:82355` | `:82359` `overflow` `hidden` |
| `.float-start` | `:84623` | `:84627` `float` `left` |
| `.float-end` | `:84637` | `:84641` `float` `right` |
| `.clearfix::after` | `:76796` | `:76803` `clear` `both` |
| `.text-start` | `:77009` | `:77013` `text-align` `left` |
| `.text-end` | `:77023` | `:77027` `text-align` `right` |
| `.text-center` | `:77037` | `:77041` `text-align` `center` |
| `.bg-primary` | `:110221` | `:110229` `background-color` `rgba(var(--bs-primary-rgb), var(--bs-bg-opacity))` |
| `.w-100` | `:89295` | `:89299` `width` `100%` |
| `.h-100` | `:89506` | `:89510` `height` `100%` |
| `.m-0` | `:94804` | `:94808` `margin` `0` |
| `.p-0` | `:101461` | `:101465` `padding` `0` |
| `.gap-0` | `:107215` | `:107219` `gap` `0` |
| `.order-0` | `:93856` | `:93860` `order` `0` |
| `.opacity-0` | `:85938` | `:85942` `opacity` `0` |
| `.overflow-hidden` | `:86057` | `:86061` `overflow` `hidden` |
| `.object-fit-contain` | `:85063` | `:85071` `object-fit` `contain` |
| `.align-baseline` | `:82476` | `:82480` `vertical-align` `baseline` |
| `.justify-content-start` | `:91065` | `:91069` `justify-content` `flex-start` |
| `.top-0` | `:88020` | `:88024` `top` `0` |
| `.bottom-0` | `:88087` | the declaration sets `bottom` |
| `.start-0` | `:88154` | the declaration sets `left` or the recorded inset; the selector line is the class |
| `.end-0` | `:88221` | selector present |
| `.focus-ring:focus` | `:80550` | `:80554` `outline` `0` |
| `.visually-hidden` | `:82022` | `:82026` `width` `1px` |

A search for the exact selector strings `.flex`, `.grid`, `.block`, `.truncate`, `.sticky`, `.fixed`, and `.sr-only` in `inventory.json` returned no matches. The inventory's names for those ideas are `.d-flex`, `.d-grid`, `.d-block`, `.text-truncate`, `.sticky-top`, `.fixed-top`, and `.visually-hidden`.

**Reboot elements.** The `reboot` selectors array runs from `inventory.json:2823` to `:4962`. `counts.reboot.selectors` is recorded as `117` at `:114212`. Preflight properties were not read, so none of these are paired. Properties below are the inventory side only, one cited declaration each.

- `*` `:2825` sets `box-sizing` `border-box` (`:2828`); `*::before` `:2839` and `*::after` `:2853` do the same.
- `body` `:2867` sets `margin` `0` (`:2870`), plus font, color, text-align, background, and tap-highlight through `:2907`.
- `hr` `:2917` sets `margin` `1rem 0` (`:2920`), `border` `0`, `border-top`, and `opacity` `0.25`.
- `h6` `:2947` sets `margin-top` `0` (`:2950`), `margin-bottom` `0.5rem`, `font-weight` `500`, `line-height` `1.2`, and `color`. The same heading shape is recorded for `h1` through `h5` (`elements` lines `:2971` through `:3121`).
- `p` `:3271` sets `margin-top` `0` (`:3274`) and `margin-bottom` `1rem`.
- `abbr[title]` `:3289` sets `text-decoration` `underline dotted` (`:3296`) and `cursor` `help`.
- `address` `:3319` sets `margin-bottom` `1rem` and `font-style` `normal`.
- `ol` `:3341` and `ul` `:3355` set `padding-left` `2rem`.
- `dt` sets `font-weight` `700` (`:3482`); `dd` `:3493` sets `margin-bottom` `0.5rem`.
- `code` `:3755` sets `font-family` `var(--bs-font-monospace)`.
- `figure` `:3945` sets `margin` `0 0 1rem`.
- `img` `:3959` and `svg` `:3973` set `vertical-align` `middle`.
- `table` sets `border-collapse` `collapse` (`:3994`) and `caption-side` `bottom`.
- `button` `:4195` sets `border-radius` `0`.
- `button:focus:not(:focus-visible)` `:4209` sets `outline` `0`.
- `[hidden]` `:4949` sets `display` `none` (`:4953`). The recorded declaration has no separate important field.

Other reboot tags named by non-empty `elements` arrays in that span, whose declarations were not read in this pass: nested `ol`/`ul`, `dl`, `blockquote`, `b`, `strong`, `small`, `mark`, `sub`, `sup`, `a`, `pre`, `kbd`, `samp`, `caption`, `th`, `thead`, `tbody`, `tfoot`, `tr`, `td`, `label`, `input`, `select`, `optgroup`, `textarea`, `fieldset`, `legend`, `output`, `iframe`, `summary`, `progress`.

## E. Primary-source facts

None of these files were present to read: `/home/user/elements/node_modules/tailwindcss/README.md`, `index.css`, `preflight.css`, `theme.css`, `utilities.css`. The lockfile's published artifact for the pinned version is `/home/user/elements/package-lock.json:3134`.

Unretrieved from that package, so not stated here: the cascade-layer names and their order, the `@import 'tailwindcss'` variants (`tailwindcss/preflight`, `tailwindcss/theme`, `tailwindcss/utilities`), the `@source` form, the `important` modifier on the import, and how a consumer `@layer` statement before the import interacts with Tailwind's layers.

The published pages for that version, not fetched in this session: [Preflight](https://tailwindcss.com/docs/preflight), [Theme](https://tailwindcss.com/docs/theme), and [Functions and directives](https://tailwindcss.com/docs/functions-and-directives). The package page for the pinned release is [tailwindcss 4.3.0](https://www.npmjs.com/package/tailwindcss/v/4.3.0).

What the fleet itself writes, which is not the package, is the consumer order placed before the import: `/home/user/elements/tests/setup.css:22` then `:24`, and `/home/user/mailbox/tests/setup.css:9` then `:11`.

## F. Sizing

Shared class names with a pointer on each side: none. The Tailwind side was not on disk, so no intersection was computed.

Preflight rules overlapping reboot, with a property on each side: none, for the same reason. The inventory records `117` reboot selectors at `inventory.json:114212`.