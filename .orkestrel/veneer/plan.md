# Veneer execution plan

Use [`tenets.txt`](tenets.txt) to judge every unit and [the evidence index](research.md) to locate
source pointers. Treat every file under `research/` as dated observation, never as accepted Veneer
behavior.

Every browser proof in this plan runs through the journey skill and its references: the journey
axis with its variant projects, the refusal family, the resolved-style matrix, the statechart table
run and mounted in the harness, and the capture portfolio. U1 registers that axis in Veneer; U3 uses
it for the token contract; every component from Button on uses all of it to test, audit, and refine
what renders. No separate pilot fixture exists: Button is the first journey. The statechart family
opens at the first component whose entity carries a real state vocabulary (Collapse, with
`closed`, `opening`, `open`, `closing`), with its table in `tests/setupBrowser.ts`; Button's engine
state is one boolean, and a table over it would need the two-literal union `AGENTS.md` bars.

Run the units in this order. U1 is five dispatches in one checkout, one writer at a time. U2 runs
beside U1 in the Elements checkout. U4a and U5 run after U1-gate and write nothing in Veneer that
survives. U3 starts after U2 and U4a close. U6 runs in the Test checkout beside U3. U4b runs in
Veneer after U1-conform, which follows U3. U7 starts after U4b and U6 close, and finishes
completely before any other component opens. The Vue environment is deferred; § Deferred: Vue environment fixes its shape.

## Authority and routing

- Read Scaffold's [AGENTS.md](../../AGENTS.md), [CLAUDE.md](../../CLAUDE.md),
  [orchestration](../../.agents/orchestration.md), and every rule in AGENTS.md's rule map. Read
  `.claude/rules/styles.md`, `workspace.md`, `tests.md`, `browser.md`, `application.md`,
  `documentation.md`, and `names.md` before touching a Veneer file.
- Use [package hardening](../../.agents/skills/orkestrel-harden-package/SKILL.md) for every
  implementation unit, [package alignment](../../.agents/skills/orkestrel-align-packages/SKILL.md)
  for the Test-package unit, [journey proof](../../.agents/skills/orkestrel-prove-journey/SKILL.md)
  and its references for every browser proof, [falsify](../../.agents/skills/orkestrel-falsify/SKILL.md)
  for every audit round, and [enterprise Bootstrap](../../.agents/skills/enterprise-bootstrap/SKILL.md)
  for visual craft, and [polish surface](../../.agents/skills/orkestrel-polish-surface/SKILL.md) for
  every verdict on a capture portfolio. Elements' identity and the owned implementation override a
  stock Bootstrap recipe.
- Route by engine as the user fixed on 2026-09-20: Cursor carries Grok 4.6 only
  (`cursor-grok-4.6-high`, versioned entry, `--mode=ask`, read-only); Codex carries `gpt-6-astra`
  only, never `gpt-5.6-sol`; the `planner`, `reviewer`, and `opus` lanes run as native Claude
  subagents. Record the Astra substitution against the transport pin in every routing ledger.
- Grok returns distillates with `file:line` pointers and writes nothing. The Orchestrator writes
  every file under `research/`, runs every instrument, and runs every network-dependent or
  `scaffold`-verb command: `npm install`, `npm ci`, `npx playwright install`, `npm pack`,
  `scaffold repair`, `scaffold audit`. `verifier` runs the authoritative gate chain. `builder` writes
  a fully specified instrument. Astra through `sol` implements each objective unit; native Opus
  through `opus` implements the token contract.
- Audit every implementation unit with the objective and subjective lanes on one claims file, plus
  `checker` where the criteria are mechanical. Where Astra wrote the unit, `reviewer` on Opus holds
  the objective lane and `analyst` on Astra the subjective lane; where Opus wrote it, `analyst`
  holds the objective lane and `reviewer` the subjective lane and is told its engine wrote the work.
- Write every brief to `units/<unit>-brief.md` before launch, capture the report beside it, and
  retain both under `.orkestrel/veneer/` as the unit returns. Write audit claims to
  `tmp/audit/<unit>-audit-claims.md` and the verdict to `.orkestrel/veneer/<unit>-audit-verdict.md`.

| Unit    | Writes                                                    | Role and engine                                                                                                         |
| ------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| U1-del  | Veneer, one deletion commit                               | Orchestrator                                                                                                            |
| U1-pre  | Veneer manifest, barrels, seeds (pre-authored so Astra works with tooling) | Orchestrator                                                                                           |
| U1-rep  | Veneer vendored files and gate chains, passes 1 to 3      | Orchestrator                                                                                                            |
| U1-rep4 | Veneer Node setup proof, guides index, repair pass 4      | Orchestrator                                                                                                            |
| U1-author | Veneer styles axis, theme engine, shell, setup modules, proofs, boundary controls, distribution stage (U1a and U1b merged) | `sol` on Astra; runs 1 and 2 stopped on brief defects, run 3 is the effective run |
| U1-gate | nothing                                                   | `verifier` on Sonnet, then the Orchestrator's `audit`                                                                   |
| U2      | Elements `node_modules`, `research/calibration*`          | `grok` for the map, `builder` for the instrument, Orchestrator for runs and the record                                  |
| U4a     | `research/inventory*`, `obligations.md`, `ledger.md`      | `builder` for the instrument, `grok` for the reading, Orchestrator for runs and the records                             |
| U5      | one temporary Veneer test, `research/instruments.md`      | Orchestrator                                                                                                            |
| U3      | Veneer styles, core, styles tests, the guide's token sections | `opus` on Opus 5; audit `analyst` objective, `reviewer` subjective                                                   |
| U6      | Test checkout; Veneer's installed tarball                 | `sol` on Astra; audit `reviewer` objective, `analyst` subjective; Orchestrator packs and installs                        |
| policy-styles-entry | scaffold `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `host.json` (commit `e8a34296`) | `builder` on Sonnet; objective review `reviewer` on Opus; vendored into Veneer by `repair --offline` |
| U3-policy | WITHDRAWN 2026-09-20 (`units/u3-policy-withdrawal.md`): scaffold `tests/setupPolicy.ts`, `tests/policy.test.ts`, `guides/scaffold.md` restored to HEAD, the diff retained | `builder` on Sonnet, ten briefs; reviews 1 to 5 `reviewer` on Opus alone (recorded deviation); rounds 6 to 9 both lanes; `verifier` each round. The unit widened a gate to admit a file the user ruled is drift |
| U1-conform | Veneer `src/browser`, `app`, their tests, `tests/setupConformance*.ts`, `tests/conformance.test.ts`, `tests/distribution.test.ts`, the guide's shell section, a manifest patch | `opus` on Opus 5; audit `analyst` objective, `reviewer` subjective, `checker`; `verifier` |
| U-styles | Veneer `configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `src/styles/index.ts`, `app/browser/main.ts` (the styles import), `package.json` (report-only), `guides/veneer.md` (the styles-axis section) | design `planner` on Opus and `analyst` on Astra; writer per the design; audit both lanes and `checker`; `verifier` |
| U4b     | Veneer conformance, oracle recorder, oracle fixtures      | `sol` on Astra; audit swapped as U6                                                                                     |
| U7      | Veneer Button and its consumers                           | design `planner` and `analyst`; `sol` on Astra; audit `reviewer` objective, `analyst` subjective, `checker`; `verifier` |

## Standing conditions

| Condition                                                                                                                                                                                                                                             | Consequence                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scaffold content-owns the root `tsconfig.json`, `vite.config.ts`, and every `configs/src/*.config.ts` and `configs/app/*.config.ts` it plans, except the birth-owned `configs/app/vite.journey.config.ts` (`src/core/compilers.ts:924-1090`). `repair` replaces a drifted content-owned copy. | Register every package-owned project and build in a wrapper Scaffold does not plan, and run it through `--config` alone. Never edit a content-owned file; never carry a `--project` name the root does not register (`src/bin/CLI.ts:1023-1030`).       |
| The root configuration exports `resolveWorkspacePath`, `mergeOverride`, and the factories only; `resolve` and the browser options are module-local; `environmentBoundary` in `configs/helpers.ts` admits no `src/styles` owner; `mergeConfig` concatenates arrays. | Declare the styles project directly in its wrapper from `../helpers.js` and `../browsers.js`; replace `include` and `setupFiles` rather than merging them.                                                                                              |
| Scaffold selects `conformance`, `guides`, `journey`, `setup`, and `setup:browser` from exact-case files (`guides/scaffold.md` § Reading a target) and never recreates a birth-owned entry test.                                                            | Author every selecting file and every entry proof before `repair`; a project whose include resolves no file fails the gate.                                                                                                                              |
| The policy mirror rule maps a test to a module through `scss` and `css` partials (`tests/setupPolicy.ts:239-246`, `stemToPolicyCandidates`); it exempts `integration.test.ts` by name; it runs test-to-module only.                                     | Name every styles test for the partial it proves. Use a temporary `integration.test.ts` for a browser probe. Never suffix a test with `.node` or `.browser`.                                                                                             |
| The `probe` project pins `pool: 'threads'` and `@orkestrel/test/browser` imports `vitest/browser` at module scope.                                                                                                                                    | Run a browser probe as a temporary `tests/src/browser/integration.test.ts`, deleted before the readings are committed; never through `tmp/probe/` or `prove`.                                                                                             |
| Chrome is not installed on this host; Edge `153.0.4234.48` is; Playwright `1.63` resolves managed revision `chromium-1243`, which is absent, while `chromium-1234` (Chromium `151.0.7922.34`) is present.                                              | Install the pinned revision with `npx playwright install chromium` in U1-rep. Take the two receipts on managed Chromium (default resolution) and Edge (`PLAYWRIGHT_CHANNEL=msedge`). Record the Chrome receipt as open until the user installs Chrome.  |
| Chromium and Edge enumerate custom properties on a `CSSStyleRule.style` read through `document.styleSheets`, inside a `@layer`, and under a scoped selector ([instruments](research/instruments.md)).                                                     | The token parity test reads names from the CSSOM in the browser; no Node-side parser is needed.                                                                                                                                                          |
| Bootstrap `5.3.8` resolves to tarball integrity `sha512-HP1SZDqaLDPwsNiqRqi5NcP0SSXciX2s9E+RyqJIIqGo+vJeN5AJVM98CXmW/Wux0nQ5L7jeWUdplCEf0Ee+tg==`, shasum `6401a10057a22752d21f4e19055508980656aeed`; its package ships `dist/css/bootstrap{,.rtl}.css`, `dist/js/bootstrap.bundle.js`, and `js/src/*.js`. | Pin that identity in the conformance setup and refuse a differing installed copy.                                                                                                                                                                        |
| Registry on 2026-09-20: `@orkestrel/test` `0.0.18`, `@orkestrel/contract` `0.0.17`, `@orkestrel/scaffold` `0.0.75`, `vitest` `5.0.1`, `playwright` `1.63.0`, `sass` `1.104.1`, `tailwindcss` `4.3.3`.                                                | Pin `vitest` to the `^4.1.11` line that `@orkestrel/test` peers and Scaffold's base set declares; do not adopt Vitest 5.                                                                                                                                 |
| Veneer's lockfile at `fc36cec` describes the legacy manifest.                                                                                                                                                                                         | Regenerate it with `npm install` from the authored manifest before the first `npm ci`; record the lockfile digest in `node_modules/.orkestrel-lock.sha256` per `CLAUDE.md`.                                                                             |
| Veneer's tree is clean at `fc36cec` with no `node_modules`; Elements at `3b41900`, Mailbox at `8b54542`, Test at `f49bc7f` (`0.0.18`), all clean.                                                                                                     | Every unit reads `git status --porcelain` before and after; the legacy itemized tree stays reachable at `fc36cec`.                                                                                                                                       |
| A `codex exec` sandbox denies network, runs PowerShell with script execution disabled (`npm.cmd run x`), blocks `prove`, and cannot write outside its `-C` root.                                                                                      | Put those facts in every Astra brief's Host and Standing rows.                                                                                                                                                                                           |
| Scaffold `0.0.76` is published (2026-09-20, `units/scaffold-release-0.0.76.md`): the vendored-only release carrying the styles rule's literal-colour clause ("the one file a literal color may appear in is `_tokens.scss`") and the styles side-effect entry. A target reads the rule files from the installed package (`node_modules/@orkestrel/scaffold/dist/host/claude/rules/`), not from its own tree. | Test and Veneer re-pin to `^0.0.76`, run `repair`, and prove their gates (Test: `units/test-repin-0.0.76.sh`; Veneer after U3 lands, with the U6 Test tarball reinstalled in the same install command, because a later `--no-save` install reverts an earlier one). A package documents itself in `guides/<package>.md` alone; a stray-guide red is the package's drift, never a policy question. |

## Build this product

Build `@orkestrel/veneer`: Elements' compact appearance and interaction motion, Bootstrap 5.3.8's
documented class, markup, variable, data-attribute, event, and method contracts, an owned JavaScript
engine, tag-only semantic defaults, and explicit class control.

| Decision      | Required implementation                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime       | Declare `@orkestrel/*` runtime packages only, each with its first consumer. Keep Vue, `@vue/reactivity`, Bootstrap, Popper, Tailwind, and every other non-Orkestrel package development-only; `vue` may appear only as an optional peer, and only after the deferred `./vue` entry exists. Enforce through the manifest sections, a transitive relative-import closure from every published barrel, a foreign-specifier and escaping-import sweep over `src/**`, `app/**`, and `tests/**`, the rolled-up declarations' specifiers, and the installed-consumer proof. |
| Prior art     | Adapt Elements' motion, tokens, and native-first factories and Mailbox's Bootstrap-class engines into owned code under Scaffold's conventions. Import no sibling source and no `@vue/reactivity`. Reuse `@orkestrel/contract` at the option boundary of every entity when the first entity lands.                                                                                              |
| Semantics     | Give a bare tag only what is true of every instance of that tag: UA repair, platform-stripped affordance, its single fixed meaning, and HTML-mandated pairings. Infer no component from ancestors, descendants, siblings, roles, or tag combinations. Reserve composition for explicit classes.                                                                                                 |
| Class control | Let a class override a tag default at equal or lower specificity through cascade-layer order. Initialize every component-local token at the component root so a nested unrelated component inherits no variant. Keep Bootstrap's class-anchored structures.                                                                                                                                   |
| Identity      | Take typography, spacing, radius, border, elevation, palette, and motion values from Elements' measured specimens. Keep theme, density, and radius as independent factor tokens. Prove each shipped theme on rendered specimens.                                                                                                                                                                |
| Tokens        | Keep `--vn-*` canonical in `_tokens.scss`. Bind every `:root` variable Bootstrap 5.3.8 declares and every `--bs-{component}-*` variable to `--vn-*` values. Support `data-bs-theme` islands. Add no `--set-*` vocabulary. Publish the TypeScript token registry `TOKEN_NAMES` from `src/core`: a frozen, grouped, typed map whose leaves are the `--vn-*` names, the map every test reads a token through and every consumer maps against. SCSS holds the values; ship no TypeScript value duplication, no generated authoritative CSS, and no authored-value snapshot. |
| CSS           | Author SCSS under Scaffold's centralized partial rules and ship compiled standalone LTR and RTL CSS that needs no Sass, Tailwind, external stylesheet, or consumer build. Declare the cascade-layer order once in `_tokens.scss`. Load `_mixins.scss` only from consuming partials. Publish granular component CSS only with a consumer and a proved dependency closure.                   |
| JavaScript    | Publish `./browser` as a pure entry that attaches no document listener on import, and `./browser/auto` as the explicit data-API side-effect entry. No placement row admits a side-effect module under `src/browser/` today, so U7's design round names the file `./browser/auto` resolves to; where no row admits it, the ruling lands as a scaffold rule change before U7 implements it, and U7 owns the manifest `exports` and `sideEffects` entries for it. Model each component as one class with `#` fields, a readonly plain state, one-word methods, and a typed `CustomEvent` model on the host element with a namespaced wire type, dispatched and subscribed through the shared dispatch and listener helpers in `src/browser/helpers.ts` and bound from `options.on` through one `bindEventMap` helper (`.claude/rules/patterns.md`). |
| Compatibility | Treat Bootstrap's data attributes, `*.bs.*` event types, and option keys as a declared wire body per `.claude/rules/names.md` § General vocabulary, projected over the same engine at one translation boundary. The exemption reaches transliterated fields, not a foreign class's method set: `getInstance`, `getOrCreateInstance`, and `dispose` are rejected names, so the Bootstrap-spelled method surface lives in an adapter the design round places behind the `./browser/auto` entry, never on an engine class, and no instrument reads a method name, so a green gate proves nothing about it. Keep Veneer's native API in Orkestrel naming. |
| Vue           | Deferred. Keep the engine framework-agnostic; write no Vue code in the package or the shell until the Vue environment opens. When it opens, it is a further environment beside core, browser, and styles: `src/vue/` with its own scoped TypeScript and Vite wrappers, its own tests, and the `./vue` export, with `vue` an optional peer the consumer installs, and it opens only after a scaffold change carries `src/vue` through `.claude/rules/workspace.md` (environments, aliases, test project matrix, typecheck scopes). § Deferred: Vue environment fixes the shape. |
| Native APIs   | Prefer Chromium platform APIs where they satisfy the contract. Keep Bootstrap-class hosts working without conversion to `dialog` or `popover` markup; a native popover supplies no modal focus containment, so the engine owns it for `.modal` hosts.                                                                                                                                         |
| Browsers      | Target managed Chromium and Edge stable explicitly, record each receipt separately, and infer no support range from Tailwind or Bootstrap's Browserslist.                                                                                                                                                                                                                                      |

Exclude from the compatibility claim: Bootstrap's Sass source API, unchanged `bootstrap` imports,
`window.bootstrap`, jQuery, and every contextual Reboot rule that pairs two bare tags. Record each
excluded row in `guides/veneer.md` § Compatibility with its reason, report every exclusion to the user at the
owning unit's acceptance, and add no tag-pair allowlist.

## Exit criterion

The campaign ends when every row of the compatibility ledger is implemented, intentionally excluded
with a recorded reason the user has seen, or retained as an accepted difference; every shipped Veneer
addition has the same closing evidence as a compatibility row; the standalone packed CSS and the
Orkestrel-only runtime pass the installed-consumer proof on every recorded receipt; the accepted
appearance and motion carry captured acceptance against Elements' specimens, ruled through the
`orkestrel-polish-surface` skill; the guide claims only what those proofs show; and the gate chain
is green. The Vue environment and publication are separate
user-directed tasks.

## Foundation units

### U1 Workspace adoption

Five dispatches in the Veneer checkout, each from a clean committed baseline. Read
[context](research/context.md), [runtime](research/runtime.md), [packages](research/packages.json),
and [testing](research/testing.md) § Sibling source vs lock.

**U1-del (Orchestrator).** Delete the legacy tree in one commit whose message names `fc36cec` as the
reference for the itemized Bootstrap tree, the `--bs-*` to `--vn-*` binding table, the derived shade
formulas, and the legacy statechart suites: `src/styles/bootstrap/`, `src/styles/tokens.css`,
`src/styles/tokens.ts`, `src/styles/helpers.ts`, `src/styles/constants.ts`, `src/styles/types.ts`,
`src/styles/tailwindcss.css`, `src/styles/index.css`, `app/browser/helpers.ts`,
`app/browser/styles/main.css`, the body of `app/browser/index.html`, the legacy `tests/**`,
`demo/showcase.html`, `ROADMAP.md`, and the legacy `guides/*.md`. After the commit,
`rg "from 'bootstrap'|import 'bootstrap'" app src` returns nothing.

**U1a (`sol` on Astra).** Author, without installing anything:

- The manifest: name `@orkestrel/veneer`, version `0.0.1`, `publishConfig.access` public, `files`
  limited to `dist/src` and `README.md`, `sideEffects` limited to CSS, exports `.` (core),
  `./browser`, and `./styles` to `./dist/src/styles/index.css`, the generated script set in the
  generated form with `build:src:styles`, `check:src:styles`, and `test:src:styles` added to their
  chains, and development dependencies only: Scaffold's base set, `@microsoft/api-extractor`,
  `@vitest/browser-playwright`, `playwright`, `sass`, `vue`, `@vitejs/plugin-vue`, `vue-tsc`,
  `bootstrap` (oracle only), `tailwindcss`, `@tailwindcss/vite`, `postcss`, and
  `vite-plugin-singlefile`. `vue`, `@vitejs/plugin-vue`, and `vue-tsc` are the tooling the app axis
  plans and `audit` asks for; no `.vue` file exists until the Vue environment opens. Drop
  `@popperjs/core`. Declare no runtime dependency and no peer.
- `src/core/{types,constants,index}.ts` and `src/browser/{types,index}.ts` as empty barrels beside
  their `types.ts`; `app/browser/index.ts` as the application barrel.
- `configs/app/vite.journey.config.ts` with the variants `light-1280`, `dark-1280`, `light-390`,
  and `dark-390`, and the `ProvidedContext` augmentation for `variant`, `variants`, and `capture` in
  `tests/setupBrowser.ts`.
- `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, and `tests/setupStyles.ts`,
  each declaring only what `@orkestrel/test` does not export; `tests/setupStyles.ts` loads
  `tests/setup.css` and the built `dist/src/styles/index.css` and fails loudly when the build is
  absent, so every styles test reads the shipped cascade.
- The project-selecting proofs in their final shape: `tests/conformance.test.ts` with
  `tests/setupConformance.ts`, `tests/guides.test.ts` over the `GuideCommand` class,
  `tests/setupBrowser.test.ts`, and `tests/app/browser/integration.test.ts` carrying the journey
  declaration with the families the shell owes.
- The entry proofs `repair` never recreates: `tests/src/core/index.test.ts` asserting the barrel's
  export set, `tests/src/browser/index.test.ts` asserting the entry attaches no document or window
  listener on import, and `tests/app/browser/main.test.ts` for the shell.
- The runtime-boundary controls in the conformance proof: the manifest declares none of `vue`,
  `@vue/*`, `bootstrap`, `@popperjs/*`, `tailwindcss`, or `@tailwindcss/*` under `dependencies`,
  `peerDependencies`, or `optionalDependencies`; a transitive closure over relative imports from
  `src/core/index.ts`, `src/browser/index.ts`, and `src/styles/index.ts` resolves no file outside
  `src/`; no import under `src/**`, `app/**`, or `tests/**` names a foreign runtime specifier or
  resolves outside the workspace; every import specifier in the rolled-up `dist/src/**/*.d.ts` and
  the built `dist/src/**/*.js` starts with `@orkestrel/` or is relative; the installed Bootstrap
  matches the pinned identity. Give each control a fixture in the shape the LSP conformance suite's
  `readForbiddenDependency` and `readForbiddenSource` prove, and record each control's inspected
  population beside its result.

**U1-rep (Orchestrator).** Run `npm install` to regenerate the lockfile from the manifest, then
`npm ci`, then `npx playwright install chromium`, then
`node ../scaffold/dist/bin/main.js repair --target ../veneer`; read its report and commit what it
writes. Add `npm run test:journey` to the `test` script after `npm run test:app`. Confirm the
repaired root defines `appJourney`, the manifest carries `test:journey`, `test:conformance`,
`test:guides`, and `test:setup:browser`, and `audit` reports no question a plan step leaves open.

**U1b (`sol` on Astra).** Author, against the repaired root:

- The styles axis: `src/styles/index.ts` importing `./index.scss`; an `index.scss` barrel that
  loads `_tokens.scss` and `_theme.scss` stubs with `@use` and never loads `_mixins.scss`;
  `configs/src/vite.styles.config.ts` declaring the `src:styles` browser project directly —
  `outputBoundary('dist/src/styles')` from `../helpers.js`, the provider from `resolveBrowser` in
  `../browsers.js`, `include` `tests/src/styles/**/*.test.ts` and `setupFiles` `setup.ts`,
  `setupBrowser.ts`, `setupStyles.ts` written as replacements — and a `lib` build over
  `src/styles/index.ts` emitting `dist/src/styles/index.css` and `index.rtl.css`;
  `configs/src/tsconfig.styles.json` as the check-only scope.
- The shell application: `app/browser/index.html` and `app/browser/main.ts` in plain TypeScript,
  importing the styles entry and nothing else, with the theme control the journeys drive; no
  Bootstrap import and no Vue code anywhere.
- A replacement `tests/distribution.test.ts` keeping the generated export checks and adding a
  Veneer consumer page to the real-browser stage: the packed CSS loaded standalone and the
  `./browser` entry imported with its `@orkestrel` closure from `node_modules` and nothing else,
  executed offline.

**U1-gate (`verifier`, then Orchestrator).** `npm run check`, `npm run build`, `npm test`, and
`npm run test:journey` on managed Chromium, then `npm test` with `PLAYWRIGHT_CHANNEL=msedge`; then
`audit`, quoted verbatim.

Close on: the deletion commit; `audit` exit `0` with the styles wrapper and journey wrapper present
and no question; every project's include resolving at least one file; the boundary controls red on
a planted `src/browser/probe.ts` importing `vue`, a planted `tests/` import of `../../../elements/src`,
a planted `Ref` return type in a rolled declaration, and a planted `bootstrap` import in
`app/browser/main.ts`, then green restored; `test:journey` running four `journey:<variant>`
projects each collecting `tests/app/browser/integration.test.ts` alone; the distribution stage green
on both receipts; the gate chain green; the manifest's runtime closure empty; the two browser
configurations and the open Chrome receipt named in `guides/README.md`. Claim no component, token,
or appearance from this unit.

Off-limits for U1a and U1b: every vendored path `repair` writes, the root `vite.config.ts` and
`tsconfig.json`, and every content-owned `configs/src/*.config.ts` and `configs/app/*.config.ts`.

### U2 Visual calibration

Run beside U1; it touches Elements only. Read [motion](research/motion.md) and
[context](research/context.md) § Elements.

- Orchestrator: `npm ci` in Elements at `3b41900`, `npm run build:showcase`, and record the digest of
  the built `dist/showcase/index.html` beside its commit. Commit nothing in Elements.
- Grok: map, with `file:line`, which showcase route and element renders each specimen — body copy,
  each heading level, a bare `<button>`, `button.primary`, `button.subtle`, `button.small`,
  `button.large`, a disabled button, a bare `<dialog>` modal, a `<details>`, a `[popover]` panel, a
  `[popover='hint']`, and `aside[popover]` — and which partial and factory produce each state and
  motion. Grok returns the map; the Orchestrator writes it.
- Builder: write `research/calibration.mjs`, a Playwright instrument over the built showcase that, per
  specimen, state (rest, hover, focus-visible, active, disabled, open, closed), and `data-mode`,
  reads the resolved `font-family`, `font-size`, `line-height`, `font-weight`, `padding`,
  `border-width`, `border-radius`, `color`, `background-color`, `border-color`, `box-shadow`,
  `transition`, `transition-duration`, `transition-timing-function`, the focus-ring `box-shadow`,
  and for each motion the frame-by-frame `opacity`, `transform`, `block-size`, and completion time;
  emulates reduced motion once per motion and records what still moves; and writes
  `research/calibration/<browser>/calibration.json` and
  `research/calibration/<browser>/<specimen>--<state>--<mode>.png`.
- Orchestrator: run it on managed Chromium and on Edge; write `research/calibration.md` as the table
  of accepted foundation values and departures, naming the browser and date per reading.

Close on: both browsers' `calibration.json` and captures and `calibration.md` present and named in
[research.md](research.md); every foundation token U3 declares traceable to a row there. Accept no
Veneer appearance from this unit.

### U4a Compatibility inventory and ledger

After U1-gate; writes only under `research/`. Read [upstream](research/upstream.md) and
[conformance](research/conformance.md).

- Builder: write `research/inventory.mjs`, which parses the installed `bootstrap/dist/css/bootstrap.css`
  and `bootstrap.rtl.css` with `postcss` from Veneer's `node_modules` and writes
  `research/inventory.json`: every selector, custom property, keyframe, and media condition,
  grouped by component through its class-root prefix, the complete `:root` variable list including
  the `-rgb` triplets and the `[data-bs-theme=dark]` retunes, and the RTL differences per component.
- Orchestrator: run it from the Veneer checkout and record the Bootstrap identity it read.
- Grok: read each `bootstrap/js/src/*.js` and the 5.3 documentation pages for data attributes,
  option keys with defaults, static and instance methods, event types with cancelability, keyboard
  behavior, dismissal rules, and initialization forms, per component, and return the rows as its
  distillate. Discover from the official artifacts alone; never from Veneer.
- Orchestrator: write `research/obligations.md` from the distillate and `research/ledger.md`
  assigning every inventory and obligation row to a unit or a recorded exclusion, with Button's
  rows marked as the first accepted scope and every excluded Reboot tag pairing listed with its
  reason.

Close on: the inventory, obligations, and ledger present and indexed; every row owned; the
exclusions reported to the user.

### U5 Instrument probes

Orchestrator-owned, after U1-gate. Answer each remaining question in
[testing](research/testing.md) § Unresolved questions with a temporary
`tests/src/browser/integration.test.ts`, run on both receipts and deleted after the readings are
recorded:

- whether `userEvent.hover` on a resolved control matches `:hover` and changes a used property;
- whether a pointer hold reachable through the provider or `cdp()` produces `:active` and a release
  clears it;
- whether `getComputedStyle(element, '::after')`, `'::backdrop'`, and `'::details-content'` return
  used values inside the tester document;
- whether `cdp()` with `Emulation.setEmulatedMedia` switches `prefers-reduced-motion` and `print`
  for the tester document, and whether the switch restores;
- which token and theme syntax capabilities the tester engines expose that U3 and Button consume,
  including `@property` registration where used.

Record each answer with its command, browser, and reading in `research/instruments.md`. A negative
reading on an instrument the provider can reach is U6's obligation; a negative reading on a class the
provider cannot reach at all names the row it leaves open, and that row stays open on the record.

### U3 Token contract

After U2 and U4a close. Role `opus` on Opus 5; audit `analyst` objective and `reviewer` subjective.
Read [tokens](research/tokens.md), [platform](research/platform.md), [instruments](research/instruments.md),
`research/calibration.md`, `research/inventory.json`, and `.claude/rules/styles.md`.

- Make `src/styles/_tokens.scss` the authored-value authority: the cascade-layer order declared once,
  and `:root` `--vn-*` tokens for factors (density, radius, elevation, motion), palette, semantic
  color roles with the subtle, emphasis, and border tiers, surface and text tiers, spacing scale,
  type scale and families, radius scale, border, elevation, motion durations and easings, focus ring,
  and the z-index ladder. Take every value from `calibration.md`; where Elements and Bootstrap
  disagree, take Elements and record the departure in `guides/veneer.md` § Departures from Bootstrap.
- Declare the `--bs-*` root compatibility scope in `_tokens.scss` as aliases of `--vn-*` for the
  complete `:root` list in `research/inventory.json`, in one pass.
- Make `src/styles/_theme.scss` the theme authority: `[data-bs-theme='dark']` retunes the
  theme-varying tokens through attribute selectors so a nested island retunes, and `color-scheme`
  follows the attribute. Keep density and radius as factor tokens.
- Make `src/styles/_mixins.scss` declaration-only — `transition` with its reduced-motion pair,
  `reduced-motion`, `forced-colors`, `focus-ring`, `palette-each`, `breakpoint-down` — loaded by
  consuming partials with `@use '../mixins' as *` and never by `index.scss`.
- Add the document baseline every specimen depends on: `elements/_html.scss` (`interpolate-size`,
  `text-size-adjust`, `scroll-padding`) and `elements/_body.scss` (font, `color-scheme`, canvas
  and text colors). Add nothing else to `elements/`.
- Publish the name map: `src/core/types.ts` declares `TokenName`, the union of every `--vn-*` name,
  and `TokenMap`, the readonly grouped record whose leaves are `TokenName` values;
  `src/core/constants.ts` declares the frozen `TOKEN_NAMES: TokenMap`. Import no CSS, touch no DOM,
  and register no listener in `src/core`; prove that in `tests/src/core/index.test.ts` (no test file
  exists solely for `constants.ts`, per `.claude/rules/tests.md`).
- Tests, all in the `src:styles` project and named for their partials. `tokens.test.ts` collects
  every `:root` rule through `readRules()` over the built LTR cascade and again over the built RTL
  cascade loaded into the tester document, unions their custom-property names, partitions them on
  the `--vn-` and `--bs-` prefixes, asserts bidirectional equality between the `--vn-` partition and
  `TOKEN_NAMES`' leaves and between the `--bs-` partition and the inventory's `:root` list, and
  refuses a name in neither partition; asserts the representative resolved values `calibration.md`
  records through consuming properties; overrides a token on a mounted island and reads the
  consumer property and geometry on the island and on an unchanged neighbor; sets an invalid value
  and reads the consumer's fallback; declares a two-token cycle and reads the consumer's
  guaranteed-invalid result; nests a dark island inside light and reads both. `theme.test.ts` drives
  `data-bs-theme` and reads the retuned consumers. `mixins.test.ts` reads a transition and its
  reduced-motion result through a mounted specimen. `index.test.ts` walks the cascade through
  `readRules()` and rejects any rule in the elements layer whose selector combines two bare tags
  outside the HTML-mandated pairings, with a planted control rule that must be rejected.
- Guides: the package has one guide, `guides/veneer.md`. Add to it the token sections — the
  reference map, the Bootstrap variables Veneer retains, the customization recipe, the departures
  from Bootstrap, and the deferred names — and transcribe the recipe fence into
  `tests/src/styles/integration.test.ts`. No `guides/tokens.md`: the vendored stray-guide rule
  refuses a second guide, and that refusal is the convention (user ruling, 2026-09-20).

Close on: the parity test red on a planted unmapped `:root` name, on a mapped name removed from
SCSS, and on a `:root` declaration relocated into a scoped rule, each restored green; consumer,
geometry, island, cycle, and invalid-value readings green on both receipts; `src/core` proven
listener-free and DOM-free; guide parity green; `check`, `build`, and `test` green.

### U6 Test gaps

After U5; in the Test checkout beside U3. Role `sol` on Astra under package alignment; audit
`reviewer` objective and `analyst` subjective. Read `guides/test.md` § Surface and § Limits and
`research/instruments.md`.

- Add to `@orkestrel/test/browser` what U5 proved reachable and Button consumes: a journey verb that
  hovers a resolved control by role and name, a press-and-release pair for `:active`, a `readStyle`
  overload that reads a named pseudo-element, and a media-emulation helper for reduced motion and
  print that restores on cleanup. Name each in the unit's design round; keep every name one word on
  the entity and `{verb}{Noun}` for a helper.
- Prove each in Test's own browser suite with a negative control, document it in `guides/test.md`,
  and keep the surface parity green.
- Orchestrator: build and pack Test, install the tarball into Veneer's development slot, record the
  replaced range and the tarball digest, and run Veneer's consumer proof. Keep Test's publication and
  the registry re-pin separate.

Close on: Test's gates green; the tarball installed and recorded; a Veneer test importing each new
export green on both receipts.

### U1-conform Veneer tree conformance

After U3's audit round closes and U3 lands; in Veneer. Role `opus` on Opus 5 (placement, naming,
and voice); audit `analyst` objective, `reviewer` subjective, and `checker`; then `verifier`. The
findings are `veneer-conformance-verdict.md` (the half no writer owned during the audit) and the
placement claims of U3's audit round (the other half). Items, each with its rule:

- Flatten `src/browser/color-mode/ColorMode.ts` to `src/browser/ColorMode.ts` and
  `app/browser/showcases/Showcase.ts` to `app/browser/Showcase.ts`, mirror the tests, update the
  barrels and imports, delete both folders (`architecture.md` § Entity subfolders; `names.md`
  § Files and folders).
- Rename `ColorScheme` to `ColorModeState` and `isColorScheme` to `isColorModeState`; set
  `COLOR_MODE_KEY` to `'color-mode'` (one concept, one term).
- Delete the pass-through factories `createColorMode` and `createShowcase`, their barrel rows,
  and `tests/src/browser/factories.test.ts`, folding its cases into the class tests; callers
  construct directly (`architecture.md` § Wrapper test).
- `app/browser/main.ts` imports the concrete module, never its own barrel; `index.html` titles
  the document `Veneer`; the `Showcase` constructor keeps to fields and calls one `#mount()`.
- `app/browser/styles/_shell.scss` takes the app's own cascade layer, `app/browser/styles/index.scss`
  declares the order, and the deferred-work comment becomes a present-tense statement
  (`styles.md`; `AGENTS.md` § TTTDD).
- Move the built-artifact case out of `tests/conformance.test.ts` into `tests/distribution.test.ts`
  (`tests.md` § Root proofs); rename `tests/setupConformance.ts` helpers by the prefix table
  (`extract*`, `scan*`, `collect*`, `compute*`; `readManifestMember` stays) and `WORKSPACE_PATH`
  to `WORKSPACE_ROOT`, updating every importer.
- Move the load-time listener control out of `tests/src/browser/fixtures/constants.ts` into a
  `tests/setup*.ts` module named for what it does, delete the folder, and repoint the dynamic
  import. A `fixtures/` folder under a test directory holds only data files a proof loads (SCSS,
  JSON), never a TypeScript declaration.
- Record in `guides/veneer.md` § Shell that the shell is framework-free by design while scaffold
  mandates the Vue toolchain for an `app/browser` environment.
- Return, report-only, the `package.json` patch removing `@tailwindcss/vite` and `tailwindcss`
  until the Tailwind unit declares them with their first consumer; `postcss` stays (U3 consumes
  it). The Orchestrator applies the patch and runs `npm install`.
- The shell's styles import and the styles wrapper belong to U-styles, the pilot unit, not here.

Close on: every test project green on managed Chromium and Edge; `scaffold audit` reporting no
drift; the guide parity green; no `fixtures/` folder holding TypeScript; the audit round's
placement claims confirmed.

### U-styles The styles-environment pilot

After U1-conform closes; in Veneer. The design round closed on 2026-09-20
(`styles-axis-design-verdict.md`: both lanes agreed on every question; RTL struck by the user).
Two serialized writers: U-styles-config on `sol` (Astra) for the wrapper composed from the root's
`srcBrowser()`, the `{ label, color }` project name, the `test:src` aggregation, and the cascade
load moved out of `tests/setupStyles.ts` into the shape the Orchestrator's `setupFiles` probe
selects; then U-styles-guide on `opus` for the `## Styles` section of `guides/veneer.md` (between
`## Examples` and `## Tokens`: the loading fence, `### Files`, `### Scripts`, `### Departures from
the workspace rows` with the generator sentence) and the `guides/README.md` sentence. Then the
audit round (both lanes, `checker`), then `verifier`. `tests/setup.css` arrives with the Tailwind
unit. The user's decision of 2026-09-20:
Veneer pilots the `src/styles` environment scaffold does not generate; implement nothing in
scaffold. Measured on 2026-09-20 against `.claude/rules/workspace.md`: present and matching —
`src/styles/index.ts` importing `./index.scss`; `configs/src/tsconfig.styles.json` check-only with
`lib` `ESNext` and `types` `vite/client`; `build:src:styles`, `check:src:styles`, and
`test:src:styles` chained into `build:src`, `check:src`, and `test`; `dist/src/styles/index.css`
from an ES lib build; the `src:styles` project on Playwright Chromium with `setup.ts`,
`setupBrowser.ts`, and `setupStyles.ts`. Departures the design round rules on: no `@src/styles`
alias (the root `tsconfig.json` is content-owned, so the shell imports the entry by relative path);
`configs/src/vite.styles.config.ts` imports the leaves `helpers.js` and `browsers.js` and
re-derives the alias table and the browser provider instead of composing the root's `srcBrowser`
factory with replaced `include`, `setupFiles`, name, and build; the project name is a bare string
where the root's projects use `{ label, color }`; the `./styles` export points at the CSS file and
the manifest's `sideEffects` need a ruling (the `index.rtl.css` twin is out of scope by the
user's ruling of 2026-09-20: it stays as emitted, unexported, and no unit spends on it);
`test:src:styles` builds
before it tests where no other `test:src:*` script does; the root projects list cannot register
`src:styles`. Each departure the design round keeps is recorded in `guides/veneer.md` under a
section a later scaffold generator can read as the pilot's shape.

Close on: every departure either closed or recorded with its cause in the guide; `scaffold audit`
reporting no drift; the whole gate chain green on managed Chromium and Edge; `test:distribution`
resolving `./styles` from the packed tarball.

### U4b Conformance and oracle

After U-styles closes; in Veneer. Role `sol` on Astra; audit `reviewer` objective and `analyst`
subjective. Read [conformance](research/conformance.md), `research/inventory.json`, and
`research/obligations.md`.

- Extend `tests/conformance.test.ts` (Node) to assert, for every component `guides/veneer.md` § Compatibility
  marks accepted, that the official selector set and custom-property set for that component are
  present in the built `dist/src/styles/index.css`; a component the guide accepts and the test omits
  fails, and a component the test lists and the guide does not fails.
- Author the oracle inside the same project: `tests/setupConformance.ts` (package-owned; `scaffold
  repair` restores no `setupConformance` module, and U4b owns it) gains a recorder that launches
  Playwright directly, loads a fixture page carrying only the pinned official
  `bootstrap.css` and `bootstrap.bundle.js`, drives the official component markup through Playwright
  actions by role and name — click, keyboard, hover, pointer hold and release, reduced-motion
  emulation — and records the ordered event types, class changes, attribute changes, focus targets,
  and refusals as `tests/fixtures/oracle/<component>.json` (the `fixtures/` form this checkout
  already uses). The recorder writes a fixture only under `ORACLE_REFRESH=1`; every ordinary run
  re-records live, compares with the committed file, and fails when the file is missing or differs;
  because the recorder launches Playwright inside the `conformance` project that `test` runs, U4b's
  brief sizes that project's timeout from a contended run. Cross-check each fixture against the component's rows in
  `guides/veneer.md` § Compatibility — event types, cancelability, keyboard behavior, dismissal — and fail on
  a row the recording contradicts or omits. Record Button's fixture in this unit.
- Add a `## Compatibility` section to `guides/veneer.md` with the ledger's Button rows, the
  accepted list, and the exclusions; every later component unit adds its rows there. No second
  guide: the package documents itself in `guides/veneer.md` alone, and `tests/conformance.test.ts`
  reads the accepted list from that section through the installed `@orkestrel/guide` reader that
  `tests/guides.test.ts` already imports, never through a local Markdown scan.

Close on: the accepted-list control red then green; the missing-fixture and differing-fixture
controls red then green; the cross-check red on a planted contradicting row; official JavaScript
executing nowhere outside the recorder; guide parity green.

### U7 Button

After U4b and U6 close. The first component and the journey pilot. Design round first (`planner`
and `analyst` on one brief, ruling among others on how the `.active` class and `aria-pressed` derive
from the engine's `pressed` state), then `sol` on Astra implements, then the audit round (`reviewer`
objective, `analyst` subjective, `checker`), then `verifier`.

Scope, from the ledger's Button rows and Elements' button treatment:

- CSS: `elements/_button.scss` gives a bare `<button>` Elements' compact neutral default and its
  same-element states. `components/_button.scss` owns `.btn`, every `.btn-{variant}` and
  `.btn-outline-{variant}` class the ledger's Button rows name, `.btn-link`, `.btn-sm`, `.btn-lg`, `.btn-check` with its label,
  `.active`, `.show`, `.disabled`, `:disabled`, `fieldset:disabled .btn`, anchor hosts with
  `aria-disabled`, every `--bs-btn-*` variable Bootstrap declares bound to `--vn-*`, the focus ring,
  hover and active tints derived from the variant fill as Elements does, forced-colors fallbacks, RTL,
  and the 150 ms feedback transition with its reduced-motion pair.
- Engine: `src/browser/Button.ts` (flat: a lone class nests only when a family exists, per
  `.claude/rules/architecture.md` § Entity subfolders; a family's design round decides its folder
  when a sibling lands) as one class over a `<button>` or anchor host with a
  readonly `pressed` state, `toggle()`, and `destroy()`, where `toggle()` toggles the host's `active`
  class and writes `aria-pressed` from the toggled result as `js/src/button.js` does; the `toggle`
  event on the host with a namespaced wire type; option validation through `@orkestrel/contract`
  (declared as the first runtime dependency); `createButton` in `factories.ts`; repeated
  construction, destruction during work, detached hosts, and consumer-attribute restoration proven
  in `tests/src/browser/Button.test.ts`.
- Compatibility boundary: `data-bs-toggle="button"` through the `./browser/auto` entry with one
  delegated listener and its removal, which calls `preventDefault` and resolves its host through
  `closest('[data-bs-toggle="button"]')`, proven from a click on a child element; the `Button` static
  and instance spellings (`getInstance`, `getOrCreateInstance`, `toggle`, `dispose`) in the adapter
  the design round places behind the `./browser/auto` entry, never on the engine class, because the
  wire-body exemption reaches transliterated fields and no instrument reads a method name; the
  design round records that placement in `guides/veneer.md` § Compatibility before it widens to
  another component.
- Journeys, in `tests/app/browser/integration.test.ts` on the journey axis, driving the shell's
  Button section: click and keyboard toggling with `aria-pressed` and the `.active` class read
  through the rendered surface; disabled refusal through the exact voice; a covered action refused
  through the exact voice, uncovered through the interface, and activated; focus ring through
  `readRing` after real focus; contrast per variant and per state through `readContrast` with its
  control (the variant names the theme); hover and active through the U6 verbs; reduced motion
  through the U6 helper; anchor and native hosts; no statechart table (Button's state is one
  boolean; the family opens at Collapse); captures of every
  variant by state by theme placed from the journeys that reach them, with the always-on filename
  and placement proofs and the capture-run membership proof; a planted failing journey whose journal
  and tree artifacts are retained while the run stays red; the oracle fixture compared on the same
  markup and actions. Resolved-style readings stay in the styles suite.
- Consumers: the distribution stage exercises the packed CSS, `./browser`, and `./browser/auto`
  offline as a vanilla consumer; the shell's Button section drives the engine from plain
  TypeScript, and its own tests cover mount, engine-to-view and view-to-engine updates, target
  replacement, destruction during pending work, listener release, and remount through the shell
  interface.
- Guide and shell: `guides/veneer.md` § Browser opens with Button, § Compatibility marks Button
  accepted, and § Styles gains the button partials; the shell's first section renders every button
  specimen with the theme control; parity green.

Accept Button only when every applicable row of § Close each component on browser evidence has its
instrument and its evidence on every recorded receipt, with Elements' button captures beside Veneer's for the
accepted departures. A row whose instrument the provider cannot reach stays open on the record; it
never passes.

## Close each component on browser evidence

- Freeze the scope from the ledger's rows and the requested Veneer additions before the design
  round. Read the prior art the ledger names, the installed Test surface, and the platform
  references. Write the rendered-contract ledger before implementation: source, fixture, state,
  token binding, action or passive observation, consumer observable, independent expectation,
  artifact.
- Implement CSS and behavior together. Define disposal and post-disposal behavior; prove repeated
  initialization, cancellation, detached hosts, concurrent instances, destruction during work,
  resource release, and restoration of consumer-owned attributes where the component has them.

| Obligation        | Closing evidence                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens            | Override canonical and compatible variables in their documented scopes and read the consumer property and geometry on the target and an unchanged neighbor; exercise fallbacks, invalid values, cycles, and nested themes against independent expectations.                            |
| Semantics/classes | Move the bare tag through unrelated hosts with equal inherited inputs and read equal results; prove class control and local-token isolation; prove utility ownership in the supported Tailwind recipes after the Tailwind unit lands.                                                    |
| States/access     | Reach hover, active, focus-visible, disabled, checked, open, and ARIA states through real input; prove activation, refusal, focus ownership and restoration, hit targets, geometry, clipping, and overflow.                                                                             |
| Paint             | Read resolved consumers and explicit pseudo-elements; measure composed contrast and focus within the reader's capability; leave image, gradient, mask, and blend measurements open until an instrument exists.                                                                         |
| Motion            | Record properties, duration, easing, distance, completion, and interruption policy; observe entry and exit frames, cancellation and reversal, reduced motion, and destruction; settled endpoints or `getAnimations()` alone prove nothing.                                            |
| Lifecycle         | Compare ordered events, cancellation, completion, dismissal, and cleanup against the oracle fixture; prove zero-duration and reduced-motion completion without a fixed fallback timer.                                                                                                 |
| Coordinates       | Run the applicable theme, density, radius, viewport, direction, print, and media cases; record managed Chromium and Edge separately.                                                                                                                                                   |
| Artifacts         | Generate style rows, journals, accessible and focus evidence, statechart results where the entity carries a state vocabulary, and captures from the journeys reaching those states; observe motion separately from settled captures; rule on the capture portfolio through `orkestrel-polish-surface`. |
| Distribution      | Pack and install with the declared Orkestrel closure in isolation; exercise the accepted CSS, JavaScript, and declarations offline from a vanilla consumer.                                                                                                |

Update the guide, the shell, parity, and the ledger together. Run scoped checks during the work
and the acceptance gates in order. Obtain the audit round and the Orchestrator's ruling. Start the
successor only after the fixed scope closes; route an unrelated finding to the ledger row that owns
it.

## Component queue

Open each family as bounded units in mechanism order. Use the ledger to decide completeness.

| Family                | Members and ordering                                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content/layout        | Reboot equivalents as tag-only defaults, typography, links, images, figures, containers, grid, gutters, tables; classify the optional CSS Grid separately.                                                                 |
| Passive               | Close button, Badge, Breadcrumb, Button group, Card, List group, Pagination, Placeholders, Progress, Spinners.                                                                                                             |
| Forms                 | Form control, Select, Checks and radios, Switches, Range, Input group, Floating labels, Form layout, Validation.                                                                                                           |
| Disclosure/navigation | Collapse before Accordion; Navs, Tabs, Dropdown, Navbar, Scrollspy.                                                                                                                                                       |
| Overlays/feedback     | Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel; introduce focus containment, scroll locking, anchor positioning, sanitization, and transition coordination with their first consumer.                          |
| Helpers/utilities     | Every helper and utility group Bootstrap documents, authored as Veneer CSS inside the standalone bundle, so a drop-in consumer needs no Tailwind build; the Tailwind profiles are an additional supported combination.      |
| Cross-cutting         | Color modes, breakpoints, RTL, print, variable overrides, transitions, reduced motion, and the Tailwind profiles; close the applicable coordinates inside each component and open the Tailwind unit after Button and Card. |

Each component unit's design round checks its class, interface, options, and factory names against
the hosted guides' `## Surface` tables (`.claude/rules/names.md` § Fleet name ownership) before
implementation and records the resolution: `Progress`, `Spinner`, `Table`, `Form`, `Range`, and
`Theme` are already owned by other packages, as `Theme` was when it stopped U1-author run 3.

Tailwind unit: keep standalone Veneer, with its own utility CSS, as the baseline; for a consumer who
already builds Tailwind, qualify prefixed Tailwind theme and utilities without Preflight as a second
supported profile; qualify an unprefixed profile separately,
omitting the conflicting Bootstrap utilities and naming structural classes explicitly; prove normal
and important precedence separately; keep the compiler input apart from the browser-ready CSS.

Treat Avatar, Empty state, Splitter, Stepper, Tag, Rating, the pickers, Range slider, Disclosure,
Keyboard hint, Code, Stat, Chart, Timeline, Skeleton, Dot, Sidebar, Floater, native Details and
Dialog, Drag and Drop, enhanced Select and Table, Menu, Pointer, and Inspector as candidates. Promote
one only with a real consumer and a bounded contract.

## Deferred: Vue environment

Open this unit only on the user's instruction, after the component queue has enough accepted
components to consume. It adds Vue as a further environment, never as a dependency of the engine,
and its prerequisite is a scaffold unit that carries `src/vue` through `.claude/rules/workspace.md`
(the environments table, the aliases, the test project matrix, the typecheck scopes); a Veneer unit
never invents a published environment the fleet canon does not list.

- Place the adapters under `src/vue/` with `types.ts`, `composables/` or `factories.ts` as the
  design round rules, and an `index.ts` barrel. Each adapter projects one engine class's readonly
  state and events through the consumer's Vue lifecycle and owns nothing the engine owns.
- Author the axis by hand the way the styles axis is authored: `configs/src/vite.vue.config.ts` for
  the `dist/src/vue` build and the `src:vue` browser test project, `configs/src/tsconfig.vue.json`
  for the check-only scope, `tests/src/vue/**` mirrored tests, and the `build:src:vue`,
  `check:src:vue`, and `test:src:vue` scripts wired into their chains through `--config` alone.
- Export it as `./vue` in the manifest, pointing at `dist/src/vue`. Declare `vue` under
  `peerDependencies` with `peerDependenciesMeta.vue.optional` set to `true`, so a consumer who never
  imports `./vue` installs nothing, and a consumer who does installs their own Vue.
- Extend the runtime-boundary controls: the `./vue` entry's closure may import `vue` and nothing
  else foreign; every other entry's closure still may not; the built `dist/src/vue/index.js` keeps
  `vue` as an external specifier; the installed-consumer proof gains a Vue consumer beside the
  vanilla one and proves the vanilla consumer still resolves with Vue absent.
- Give `guides/veneer.md` § Vue an executable recipe per adapter, transcribed into
  `tests/src/vue/integration.test.ts`, and drive each adapter through the shell interface for mount,
  updates in each direction, target replacement, unmount during pending work, listener release, and
  remount.

## Deferred: Showcase target

The demonstration surface is the shell, `app/browser`, and the plan uses that one term for it.
Scaffold's `showcase` target (`configs/app/vite.showcase.config.ts`, the `build:showcase` script,
`demo/showcase.html`, the showcase column of `guides/README.md`) is a separate single-file build
no unit has authored; `vite-plugin-singlefile` sits in U1's manifest with no consumer until one
does. Open that unit after U7 from the shell's own entry, or strike the dependency with it.

## Re-baseline record

Each entry names what changed in the plan and why, on the date it changed.

- 2026-09-20, U1: U1a and U1b run as one Astra unit, U1-author, after the Orchestrator seeded the
  manifest, barrels, wrappers, and proofs (U1-pre) and ran three repair passes (U1-rep), so the
  bench unit works with installed tooling and a registered root. Briefs and reports under
  `units/u1-*`.
- 2026-09-20, U1-rep4 added: the generated configuration proof selected a Node `setup` project
  from the browser setup proof while `repair` registers it only from a Node setup proof. The seeded
  conformance setup proof made the runtimes include `node`; repair pass 4 registered `setup`. The
  scaffold defect (proof glob broader than the generator) is recorded as a separate scaffold task,
  not fixed in this campaign.
- 2026-09-20, U1-author transformed: the package's first behavioral export, the theme engine
  (`createTheme`, `ThemeInterface`, `THEME_ATTRIBUTE`, `THEME_KEY`, `isThemeMode`), ships in U1
  because the guides checker requires a documented method group and a guide over an empty surface
  cannot pass truthfully; the shell's `Dark mode` control is its first consumer. It carries no
  token and no component. The Vue decision and the runtime boundary are unchanged.
- 2026-09-20, U4a routing: Grok read `bootstrap/js/src` (`units/u4a-obligations-*`); the 5.3
  documentation pages went to the native `researcher` because the Cursor print-mode lane cannot
  reach the web (`units/u4a-docs-*`), a recorded substitution. The inventory instrument took two
  `builder` briefs and one Orchestrator line (four helper roots). The ledger's unit assignments are
  the Orchestrator's, fixed in `units/u4a-ledger-brief.md`, and a `builder` materialized them.
  U4a no longer waits for U1-gate: nothing it reads or writes depends on U1.
- 2026-09-20, U5 satisfied: the temporary probe suite ran in Veneer's `src:browser` project on
  managed Chromium and Edge before U1-author landed (no writer was live), every question in
  [instruments](research/instruments.md) answered positively, and the suite is retained as
  `units/u5-probe.test.ts` with its logs. The `:active` reading names the tester-iframe scale a
  press helper must apply; that is U6's obligation.
- 2026-09-20, U1-author run 3 stopped on two conflicts the briefs caused: the vendored surface
  policy rejected the styles side-effect entry the workspace rule prescribes (a scaffold defect,
  fixed in scaffold and vendored into Veneer by repair before run 4), and `Theme`, `ThemeOptions`,
  and `createTheme` are owned by `@orkestrel/console`; the engine's names are `ColorMode`
  (class), `ColorModeInterface`, `ColorModeOptions`, `ColorScheme` (`'light' | 'dark'`),
  `createColorMode`, `isColorScheme`, `COLOR_MODE_ATTRIBUTE`, and `COLOR_MODE_KEY`, all free in
  the hosted guides on 2026-09-20. Run 3's styles axis work stays in the tree as the unit's own.
- 2026-09-20, U1-author landed: run 4 stopped only on the `package.json` plant the bench sandbox
  refused (the Orchestrator took `PLANT-PEER` on the host, `units/u1-plant-peer.log.txt`) and was
  checkpointed as `9d64c66`; run 5 finished the distribution stage, the guide, and the README and
  landed as `ae0221d` with every gate green on managed Chromium in its report
  (`units/u1-author-report.md`). U1-gate (`verifier`), the audit round (`reviewer` objective,
  `analyst` subjective on Astra, `checker`) on `u1-audit-claims.md`, and the push follow.
- 2026-09-20, U1 accepted at Veneer `b661142` after six audit rounds
  (`u1-audit-verdict.md`, `u1-fix-audit-verdict.md`): round 1 refuted two claims and added six
  findings; the fix rounds (`units/u1-fix-brief.md` through `-7.md`, on `builder`) closed them
  and, at the RTL guard, replaced a text-pattern check with a postcss-parsed scanner whose
  predicates are exported and proved on every edge form the lanes named, under a scope ruling
  the Orchestrator widened twice (three-value radii, the slash form, the `background` shorthand,
  `float`/`clear`, whole-token keywords). The verifier ran the full chain, `test:distribution`
  included, on managed Chromium and the browser projects on Edge at every round. Three
  non-blocking limits (N17 to N19) carry into U3. Veneer pushed to origin.
- 2026-09-20, U3 design round closed (`u3-design-verdict.md`): both lanes found the calibration
  narrower than the token scope; the Orchestrator answered with calibration run 6 (variant fills,
  subtle tiers, canvas), the `srgb-probe` and `paint-probe` instruments, and the value-source
  law (calibration row, else Bootstrap's own value recorded as retained, else not declared). The
  U3 brief (`units/u3-brief.md`) carries the rulings; `opus` runs it after U1 is accepted, in the
  same checkout.
- 2026-09-20, U6 accepted on substance at audit round 6 (`u6-audit-verdict-6.md`): the media
  settle records the first stage's readings on a `MEDIA_STAGE` root marker and releases to exactly
  them, the pointer marker is recorded after the press send resolves and kept until the release
  send resolves, every option is read once, and the refusal paths carry their cleanup failure as
  `cause`; both lanes and the verifier (Chromium chain, Edge twice) agree at every round from 4 on.
  Briefs 6 to 9 were prose and single-assertion passes on a native `builder`. The U3-policy unit
  reached its eighth audit round (`u3-policy-audit-verdict-2.md` withdrew the round-3 ruling on
  index-linked mirrors after both lanes rejected it; a directory-index row is the authorship
  evidence, catalog membership the only mirror evidence). A brief of the Orchestrator's that
  granted the source and the guide but not the test file its addendum named cost U6 one extra
  round; recorded against the brief checklist.
- 2026-09-20, self-audit on the user's instruction (workflow `veneer-campaign-self-audit`, run
  `wf_6a6bf589-88d`: eight lenses over the records, the checkouts, and the Orchestrator's own
  process; every finding attacked by two refuters; the surviving set retained as
  `units/self-audit-findings.md`). What it changed: the native audit lanes' dispatch texts are
  retained as briefs (they had lived in launch arguments alone); every retained record cites its
  evidence by the retained path (`units/retention-rewrite.mjs`); the routing ledger gains the two
  scaffold-writing units; the standing conditions gain the unreleased vendored change; U4b's
  guide bullet carries the stray-guide and concept-index constraints U3 found; the U3 fix brief is
  replaced (`units/u3-brief-3.md`) because its Bootstrap reader specified one rule where the
  stylesheet declares many, it claimed a re-vendor that had not happened, and it dropped a
  checker count; the elevation lengths, the font stack departure, the Bootstrap-value proofs, the
  factor proofs, the tier proof, and the helper homes join that brief from the tenets and
  Veneer-tree lenses. Two process breaches are recorded against the Orchestrator: the policy
  unit's briefs 5 and 7 ordered a role to run `git checkout --` in another checkout, which the
  permission floor bars (brief 7 was stopped and re-issued as brief 8 with a copy-back restore),
  and the styles-rule clause was committed alone with the host inventory stale (it lands with the
  inventory in the release commit). The U3-policy unit ran the objective lane alone for five
  rounds; round 6 ran both lanes, and the subjective lane withdrew the Orchestrator's ruling on
  index-linked mirrors (`u3-policy-audit-verdict.md`). From this point every native lane's brief
  is a file before its launch, every fan-out is a workflow, and every round runs both lanes.
- 2026-09-20, the scaffold release grew a second vendored change and a rule clause. The U3 unit
  found the vendored prose policy refuses a second top-level guide, which every package with more
  than one published face needs; the U3-policy unit (`units/u3-policy-brief.md` through `-5.md`)
  admits a guide the workspace's own `guides/README.md` links, over five rounds of objective
  review that caught, in order, stale prose, a global regex carrying `lastIndex`, an index scan
  reading fenced text, an assertion pinning this checkout's own guide census inside a file every
  target vendors, and a link pattern rejecting ordinary CommonMark forms. The styles rule now
  permits a literal colour in the token value map alone (scaffold `9b22b165`), which the U3 audit
  asked for. Both ride the vendored-only release, so Test and Veneer re-pin from `^0.0.73` and
  `^0.0.75` to it before either publishes. The release needs a one-time code from the user.
- 2026-09-20, U6 design round closed (`u6-design-verdict.md`) and U6 dispatched to Astra in the
  Test checkout (`units/u6-brief.md`, `units/u6.sh`) while U3 runs in Veneer. The Orchestrator's
  `media-probe` settled the lanes' open questions (`matchMedia('print')` follows emulation; the
  `::` check precedes `CSS.supports`), and the Test browser project's `fileParallelism: false`
  closes the cross-file media leak. The skill vocabulary update (`orkestrel-prove-journey`
  `references/layer.md`, `styles.md`) is added as a scaffold unit after Test publishes.
- 2026-09-20, U2 satisfied: run 5 on managed Chromium and Edge read settled endpoints
  (`units/u2-distill-2-report.md` § Settled check names the hint surface's 95% alpha mix as the
  only non-endpoint string), the record is [calibration](research/calibration.md), and the index
  names the instrument, the readings, and the record. U4a satisfied the same day (inventory,
  obligations, ledger present and indexed; exclusions listed in the ledger for the user). U3's
  design round opened on both lanes from `units/u3-design-brief.md`.
- 2026-09-20, U2 instrument corrections, each from a probe or a reading rather than a guess
  (`units/u2-reach-fix.mjs`, `u2-reach-fix-2.mjs`, `u2-reach-fix-3.mjs`, run logs
  `units/u2-run-<n>.log.txt`): first-match locators and unique per-specimen reaches from the DOM
  probe; DOM-valid dialog selectors because the motion sampler resolves a reach with
  `querySelector`; a document reload per route so an open top-layer surface cannot intercept the
  next click; and settle waits after every mode switch, state drive, and close, because Grok's
  distillate of run 4 (`units/u2-distill-report.md`) read colours mid-transition and overlay
  `closed` rects mid-close. The record in `research/calibration.md` cites the run that produced it.
- 2026-09-20, U2: the calibration instrument's light-mode wait assumed a `data-mode="light"`
  attribute the showcase never writes; an Orchestrator probe read the absent attribute and the
  instrument treats absence as light. Retained beside the run logs.
- 2026-09-20, U3-policy withdrawn on the user's ruling that a package documents itself in one
  guide, `guides/<package>.md`, never split into smaller guides. `guides/tokens.md` came from this
  plan's U3 text, copied from the Elements guide layout; the vendored policy refused it as a stray
  guide and the U3-policy unit spent ten builder briefs and nine audit rounds widening the rule to
  admit it, which `.claude/rules/documentation.md` forbids ("a parity failure identifies drift;
  never suppress or weaken the test"). The three scaffold files are restored to HEAD, the diff is
  retained (`units/u3-policy-diff-10.patch.txt`, `units/u3-policy-withdrawal.md`), and the release
  shrinks to the styles clause and the styles side-effect entry (the standing-conditions row
  measures it). U3 is **transformed**: brief 4 (`units/u3-brief-4.md`, superseding the never-run
  brief 3) folds the token sections into `guides/veneer.md`, deletes `guides/tokens.md`, and
  points the map and the README at the one guide; Veneer's stray-guide red closes by that fold.
  U4b is **transformed** the same way: the compatibility ledger is a `## Compatibility` section
  of `guides/veneer.md`, with no re-vendor prerequisite. Process rule from this entry: before a
  plan or brief names a file or an exported name, check it against scaffold's `AGENTS.md`, the
  rule map, the fleet's existing layout, and the hosted guides' `## Surface` tables; a vendored
  gate's refusal in a unit report is a plan defect first.
- 2026-09-20, plan conformance audit (`units/plan-conformance-brief.md`; `checker` on Sonnet and
  `reviewer` on Opus through workflow `wf_a12cf13d-5bf`; verdict `plan-conformance-verdict.md`).
  Every remaining unit was read against scaffold's law and the fleet's layout after the user's
  ruling. Corrected in this entry's commit: Button is the first journey but not the first
  statechart (its state is one boolean; the family opens at Collapse); `./browser/auto` and the
  Bootstrap-spelled method surface are design-round placements, not instrument-proved ones;
  `tests/src/core/constants.test.ts` struck for `index.test.ts`; `tests/setupConformance.ts`
  recorded as package-owned; `tests/fixtures/oracle/`; `Button.ts` flat; `guides/browser.md`,
  `guides/styles.md`, and `guides/vue.md` folded into `guides/veneer.md` sections; one term,
  "shell", for `app/browser`, with scaffold's `showcase` target deferred as its own unit; the
  fleet-name check added to every component design round; utilities ship as Veneer CSS with the
  Tailwind profiles additional; `src/vue` gated on a scaffold canon change;
  `orkestrel-polish-surface` bound for portfolio verdicts; the counts and `once` hits rewritten.
  Carried to U3's audit claims because the writer is live: `resetSpecimens` is a banned lifecycle
  synonym (`clearSpecimens`), and each new setup helper must name the installed export it overlaps
  (`render`, `readContrast`, `matchesColor`) or yield to it.
- 2026-09-20, Veneer tree conformance audit, first half (`units/veneer-conformance-brief.md`;
  `checker` on Sonnet and `reviewer` on Opus through workflow `wf_41491b15-74c`; verdict
  `veneer-conformance-verdict.md`), opened by the user's question why `ColorMode` sits in a nested
  `color-mode` folder. **Added** U1-conform (Veneer, `opus`, after U3 lands) carrying every
  accepted finding. Two findings (the shell's deep styles import, the whole-configuration styles
  wrapper) were first carried as a scaffold unit S1 and then withdrawn the same day: the Grok
  scout (`units/s1-scout-report.md`, session `08309c0b`) read `guides/scaffold.md` stating that
  scaffold emits no styles axis and a workspace adds the axis by hand, so the wrapper is the
  documented practice and both findings are bounds. Generating the axis is a scaffold feature
  proposal under § User decisions pending, not a conformance fix. U4b now follows U1-conform.
  Process rule: a `fixtures/` folder under a test directory holds only data files a proof loads,
  never a TypeScript declaration.
- 2026-09-20, the user decided the styles-axis question: Veneer is the pilot for the styles
  environment scaffold does not generate, nothing is implemented in scaffold, and Veneer's axis
  must conform to `workspace.md`'s documented shape and every convention. **Added** U-styles
  after U1-conform, opened by a design round on the departures the census measured; U4b follows
  U-styles. The same day the user ruled that no time or tokens go to RTL or comparable
  variations: the design round's RTL proposals (a `./styles/rtl` export, a plugin rename, a
  departure row) are struck, and the twin stays as emitted and unexported.
- 2026-09-20, scaffold `0.0.76` published (`units/scaffold-release-0.0.76.md`). The first upload
  attempt ran `prepublishOnly` inside the code's life and stopped on unswept self-pin fixtures;
  the layer was then prepared per the publish skill (sweep, gates outside the window), the stored
  npm session proved expired, and the user logged in and uploaded. Test re-pins first
  (`units/test-repin-0.0.76.sh`); Veneer re-pins after U3 lands. Process rule: prepare the layer
  and prove the gates before asking for a code, and read `npm whoami` before asking.
- 2026-09-20, U3 accepted (`u3-audit-verdict-10.md`) and landed in Veneer by pathspec. The unit
  ran as brief 4 (the fold of the withdrawn policy into `guides/veneer.md`) and successor briefs
  5 to 13, with audit rounds 2 to 10 (`u3-audit-verdict-2.md` onward, claims and lane reports
  beside each). Rounds 4 to 8 chased the selector guard's reading of `:is()` and `:where()`
  through seven doors; round 8 ruled the functional lists out of the grammar (the guard reads
  Veneer's own elements layer, which writes none), brief 12 removed the expansion readers, and
  round 9 confirmed the guard's behaviour on every input either lane tried, refuting only six
  readings that lacked a case; brief 13 (`builder`) added them with a red proof and round 10
  accepted. Every later unit that names `tests/setupStyles.ts` reads its grammar sentence as the
  contract: strings, escapes, groups, identifiers, combinators, and comma lists, with a fence
  refusing the namespace separator, `:has()`, the `of` clause, comments, and functional lists.
  Process findings: a lane brief written by substitution from the previous round carries stale
  claim numbers, so every round's briefs and claims are written fresh; a read-only lane receives
  the rendered diff and status; the verifier runs beside the lanes, so the gate claim is ruled by
  the Orchestrator from the retained gate report and is never put to a lane. Next in order:
  `units/veneer-repin-0.0.76.sh`, then U1-conform.

- 2026-09-20, U1-conform accepted (`u1-conform-audit-verdict-5.md`) and landed in Veneer by
  pathspec. The unit ran as brief 1 (`opus`: the flat classes, one term for the mode axis, the
  factories deleted, the shell entry and stylesheet, the conformance and distribution split, the
  helper prefixes, the listener control in `tests/setupListeners.ts`, the guide rows, the manifest
  patch the Orchestrator applied) and successor briefs 2 to 6 from four audit rounds
  (`u1-conform-audit-verdict.md` onward, claims and lane reports beside each): the app stylesheet
  entry loads its partial with `@use` and the partial opens with the `shell` order; the mount
  helper loads the published cascade so the showcase paints from the `elements` layer and the
  guide's showcase sentence claims only that; the cascade readers take the sheets they walk with
  the document's as the default; the conformance extractor reads a template-literal `require`
  and parses with parentheses dropped. Rulings recorded on the way: the `scaffold audit` `setup`
  question for `tests/setupListeners.ts` is accepted (a same-stem proof cannot load in the Node
  `setup` project; the behaviour is proved in `src:browser`); `computeArtifactDigest` keeps
  scaffold's `computeFileDigest` name for scaffold under fleet name ownership; the package's
  bare-token register (a code token with no kind word after it) is a package-wide pass for a later
  unit, never settled sentence by sentence; a constructor that mounts, and the `void` it costs the
  entry, is U7's question. U-styles-config gains the criterion that `test:conformance` is green
  with `dist/` absent, which closes U1-conform's criterion 3. Next in order: U-styles-config on
  `sol`, then U-styles-guide on `opus`, then U4b.

## User decisions pending

- Chrome is not installed; the plan takes managed Chromium and Edge as the two receipts and records
  the Chrome receipt as open. Installing Chrome closes it without a plan change.
- U1-del deletes the legacy tree from the working tree and keeps it at `fc36cec`. Say so if the
  tree must stay in the working tree instead.
- Every ledger exclusion is reported at the owning unit's acceptance; an exclusion the user rejects
  reopens as a row.
- Decided 2026-09-20: Veneer is the pilot for the styles environment scaffold does not generate.
  Nothing is implemented in scaffold; Veneer's hand-authored axis must match the shape
  `.claude/rules/workspace.md` documents as far as the content-owned root `tsconfig.json` and
  `vite.config.ts` allow, follow every other convention, and record each forced departure in
  `guides/veneer.md` so a later scaffold generator has the pilot to read. Unit U-styles carries
  it; the Grok map of scaffold's compilers stays retained (`units/s1-scout-report.md`).

## Finish the package

Move each unit's contract into `guides/veneer.md` as the unit begins. Keep `ROADMAP.md` absent until a
sequenced plan of record belongs in the package. Use Roughnotes as a migration example without
changing it. Retain this plan and the research pointers; retire streams, drafts, and audit scratch
after acceptance per the debrief skill's retention reference.
