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
| CSS           | Author SCSS under Scaffold's centralized partial rules and ship compiled standalone CSS that needs no Sass, Tailwind, external stylesheet, or consumer build (the `index.rtl.css` twin stays as emitted and unexported by the user's ruling of 2026-09-20; no unit spends work on it). Declare the cascade-layer order once in `_tokens.scss`. Load `_mixins.scss` only from consuming partials. Publish granular component CSS only with a consumer and a proved dependency closure.                   |
| JavaScript    | Publish `./browser` as a pure entry that attaches no document listener on import. The data API is `Delegate`, a class exported from that same barrel that a consumer's own entry constructs; the package takes no subpath export, side-effect entry, build wrapper, or manifest row that scaffold does not generate, and scaffold's rules are never amended to fit a package idea (the user's ruling of 2026-09-20). Model each component as one class with `#` fields, a readonly plain state, one-word methods, and a typed `CustomEvent` model on the host element with a namespaced wire type, dispatched and subscribed through the shared dispatch and listener helpers in `src/browser/helpers.ts` and bound from `options.on` through one `bindEventMap` helper (`.claude/rules/patterns.md`). |
| Compatibility | Treat Bootstrap's data attributes, `*.bs.*` event types, and option keys as a declared wire body per `.claude/rules/names.md` § General vocabulary, projected over the same engine at one translation boundary. The exemption reaches transliterated fields, not a foreign class's method set: `getInstance`, `getOrCreateInstance`, and `dispose` are rejected names, so no Bootstrap-spelled method ships anywhere; `guides/veneer.md` § Compatibility records each spelling's mapping onto the native API, and no instrument reads a method name, so a green gate proves nothing about it. Keep Veneer's native API in Orkestrel naming. |
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
from the engine's `pressed` state), then the chain `u7-design-verdict.md` § The chain fixes: U7d,
U7a, and U7b on `sol` (Astra), U7c and U7e on `opus`, each followed by its audit round with the
lanes swapped by writer (`reviewer` objective and `analyst` subjective after a `sol` unit, the
reverse after an `opus` unit), `checker` where the criteria are mechanical, then `verifier`.
Test-paint, in the Test checkout, precedes U7c.

The package's surface stays `.`, `./browser`, `./server`, and `./styles`. U7 adds no subpath
export, no side-effect entry, no build wrapper, and no manifest row (the user's ruling of
2026-09-20, recorded in `u7-design-verdict.md` § The user's correction).

Scope, from the ledger's Button rows and Elements' button treatment:

- CSS: `elements/_button.scss` gives a bare `<button>` Elements' compact neutral default and its
  same-element states. `components/_button.scss` owns `.btn`, every `.btn-{variant}` and
  `.btn-outline-{variant}` class the ledger's Button rows name, `.btn-link`, `.btn-sm`, `.btn-lg`, `.btn-check` with its label,
  `.active`, `.show`, `.disabled`, `:disabled`, `fieldset:disabled .btn`, anchor hosts with
  `aria-disabled`, every `--bs-btn-*` variable Bootstrap declares bound to `--vn-*`, the focus ring,
  hover and active tints derived from the variant fill as Elements does, forced-colors fallbacks,
  and the 150 ms feedback transition with its reduced-motion pair. A `btn` selector the partials
  do not ship sits in the `### Deferred selectors` table under `guides/veneer.md` § Styles, and the
  presence check reads that table.
- Engine: `src/browser/Button.ts` (flat: a lone class nests only when a family exists, per
  `.claude/rules/architecture.md` § Entity subfolders; a family's design round decides its folder
  when a sibling lands) as one class over a `<button>` or anchor host with a
  readonly `pressed` state derived from the host's `active` class, `toggle()`, and `destroy()`,
  where `toggle()` toggles the host's `active` class, writes `aria-pressed` from the toggled
  result as `js/src/button.js` does, then dispatches the non-cancelable bubbling `toggle` event
  with the namespaced wire type and returns the state; hooks through the `on` option bound by
  `bindEventMap`; hand predicates in `validators.ts` and `@orkestrel/contract` unchanged as a
  devDependency (no runtime dependency in U7: Button declares no option a guard would earn); no
  factory; repeated construction, destruction during work, detached hosts, double-ownership
  refusal, and consumer-attribute restoration proven in `tests/src/browser/Button.test.ts`.
- Compatibility boundary: `data-bs-toggle="button"` through `Delegate`, a class exported from the
  existing `./browser` barrel that a consumer's own entry constructs (the showcase's `main.ts`
  does in U7c): one delegated native `click` listener on its root and its removal in `destroy()`,
  which calls `preventDefault`, resolves its host through `closest('[data-bs-toggle="button"]')`,
  refuses a disabled host, and drives one engine per host from a private `WeakMap`, proven from a
  click on a child element; importing `./browser` registers no listener. The Bootstrap method
  spellings (`getInstance`, `getOrCreateInstance`, `toggle`, `dispose`) are not shipped;
  `guides/veneer.md` § Compatibility records each spelling's mapping (`getOrCreateInstance` is the
  delegation's reuse, `dispose` is `destroy`, `getInstance` unpublished).
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
- Consumers: the distribution stage exercises the packed CSS and `./browser` from the packed
  archive as a vanilla consumer that imports `Button` and constructs a `Delegate`; the shell's
  Button section (`app/browser/sections/ButtonSection.ts`, the first member of the `sections/`
  family behind `SectionInterface`) drives the engine from plain TypeScript, and its own tests
  cover mount, engine-to-view and view-to-engine updates, target replacement, destruction during
  pending work, listener release, and remount through the shell interface.
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

- 2026-09-20, U-styles-config accepted (`u-styles-config-audit-verdict-2.md`) and landed in Veneer
  by pathspec. The unit ran on `sol` (Astra) as brief 1 and a `builder` brief 2 from one audit
  round with the lanes swapped: the wrapper composes the root's `srcBrowser()` and replaces
  `plugins`, `build`, and the test fields by assignment; the `src:styles` project is named like
  every root project and loads the built cascade through its `setupFiles` array;
  `tests/setupStyles.ts` imports no stylesheet; `test:src` chains `test:src:styles`; the
  published digests are unchanged. Two rulings: the design verdict's reason for assignment over
  the root merger was false (the merger replaces a same-named plugin, and every output boundary
  shares one name; it is the browser environment boundary the merger keeps and the arrays it
  concatenates that force assignment), corrected in the wrapper's comment and in
  U-styles-guide's departure list, with `styles-axis-design-verdict.md` standing as the record of
  what was believed; and the brief's criterion that `test:setup` be green with `dist/` absent
  overstated the import removal's reach, because two cases in `tests/setupStyles.test.ts` read
  the built artifacts by U3's design, so the criterion is `test:conformance` green with `dist/`
  absent and `test:setup` red on those two cases alone. Next in order: U-styles-guide on `opus`,
  then U4b.

- 2026-09-20, U-styles-guide accepted (`u-styles-guide-audit-verdict-2.md`) and landed in Veneer
  by pathspec. The unit ran on `opus` as brief 1 and brief 2 from one audit round: `## Styles`
  sits between the examples and the tokens with the files, the scripts, and the departures from
  the workspace rows, each read from the tree; the README points at § Styles for the face's
  build and loading and at § Tokens for what it declares. The round refuted sentences the tree
  contradicted (which cases read the shipped cascade, who plants the core boundary, the coverage
  the styles proofs carry) and the register (bare code tokens, one count), and brief 2 rewrote
  them. Recorded, not carried: the subjective lane's referral on whether the RTL artifact ought
  to be built and published at all is outside the campaign by the user's ruling. U-styles is
  closed: the pilot's shape and every departure with its cause are in the guide for a later
  scaffold generator to read. The same day the user ruled that rounds focus on implementation
  rather than on comments and doc sentences: from here a prose finding is a bound the verdict
  records and the next implementation unit owning the file carries, never a fix round of its own;
  a claims file puts no lane's weight on wording. Next in order: U4b on `sol`, then U7.

- 2026-09-20, U7 design round closed (`u7-design-verdict.md`; `planner` on Opus subjective,
  `analyst` on Astra objective, one brief). U7 is transformed into a serial chain: U7-rule (the
  runtime-entry clause of `architecture.md` admits `src/<environment>/auto.ts`), Test-paint (the
  Test package's paint readers read `oklch()` and the modern spaces and refuse an unreadable
  layer; a prerequisite the objective lane measured, packed into Veneer as a head start), U7d (a
  row-keyed presence check with `selector` and `variable` rows, engine rows moved to component
  `engine`, a deferral reader with planted controls, run first so the check fires before CSS
  lands), U7a (the two button partials, the mixer tokens and `focus-ring` mixin, a recorded
  subset of the `btn` inventory with the rest deferred by owner), U7b (`Button`, `Delegate`, the
  `auto` entry, its build wrapper and manifest rows), U7c (a `sections/` family in the shell,
  the journeys, the captures, the oracle projection, the consumer case), U7e (the guide). Struck
  from the plan's U7 text: `createButton` (the wrapper test), RTL (the user's ruling),
  `@orkestrel/contract` as a runtime dependency (Button declares no options a guard would earn;
  the first consumer is `data-bs-config` merging), and the statechart table (already struck). The
  mounting constructor stays (the round refused reviewer bound 13 with reason). Open to the user:
  the Bootstrap method spellings behind `./browser/auto` break two naming rules wherever they
  sit; the chain ships the data API and `Delegate` and records the spellings' mapping in
  § Compatibility unless the user grants a naming exemption for a `ButtonAdapter`.

- 2026-09-20, U4b accepted (`u4b-audit-verdict-2.md`) and landed in Veneer by pathspec. The
  unit ran on `sol` (Astra) as brief 1 and successor briefs 2 and 3 from one audit round with
  the lanes swapped (the cross-check bound to the recorded actions through a data table, an
  explicit pressed attribute, the comparison over the fixture's JSON form with its exclusion
  list honoured, the native `click` recorded, two keyboard rows without a ledger source
  removed, and `@orkestrel/markdown` declared by the user's ruling that an Orkestrel package may
  be declared): `tests/conformance.test.ts` carries the oracle (a Playwright
  recorder launched from the Node `conformance` project over the official Bootstrap 5.3.8 CSS and
  bundle in a scratch page, driving the official Button markup by role and name, with and without
  reduced motion), the fixture `tests/fixtures/oracle/button.json` written only under
  `ORACLE_REFRESH=1` and compared live on every ordinary run, the cross-check of the fixture
  against `guides/veneer.md` § Compatibility through the guide reader, and the presence check of
  every shipped component's official selector and custom-property set in the built cascade
  against a pinned inventory copy; four planted controls reddened and were restored; the
  recorder's timeout is measured from a contended run. `## Compatibility` sits between the tokens
  and the showcase with Button's rows `accepted` and the proof step each names. Rulings: Chromium
  launches from a Node Vitest worker inside the bench sandbox on this host, so a recorder unit
  can prove itself there; the inventory ships as data under `tests/fixtures/oracle/` rather than
  being read from the campaign folder. Next in order: U7 Button, opened by a design round
  (`units/u7-design-brief.md`).

- 2026-09-20, the user's correction on U7: the `./browser/auto` entry, its build wrapper, its
  manifest rows, and the scaffold rule amendment that admitted it were the Orchestrator's
  invention ("you're making up surfaces, follow our project conventions"), carried into the plan's
  U7 text and through the design round. Struck: U7-rule (its commit `bff4ed94` reverted as
  `48afc878`), the `auto` entry, the second build, the manifest rows, and the Bootstrap method
  spellings. Transformed: the data API is `Delegate`, a class exported from the existing
  `./browser` barrel that a consumer's own entry constructs (the showcase's `main.ts` in U7c);
  § Compatibility records each Bootstrap spelling's mapping. Standing rule from here: a package
  takes no surface scaffold does not generate, and scaffold's rules are never amended to fit a
  package idea; a plan line that names such a surface is put to the user before the design round.
  U7b's scope shrinks to `src/browser/*` and its proofs; the chain is otherwise unchanged.

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
- 2026-09-20, Test-paint accepted and landed in Test as `00e2b87` (brief 2 on Astra, thread
  `01a0c0e0-703a-7813-af36-724868193281`; verdict `test-paint-audit-verdict.md`, four lanes
  accepting, the verifier's whole chain exit 0 on Chromium and Edge). `parseColor` reads the
  modern spaces through ten exported `convert*` helpers, `readLayers` refuses an unreadable
  painted layer, and `readRing` reads a modern-colour ring; the prerequisite the U7 design
  round's objective lane named is closed. The packed tarball (`orkestrel-test-0.0.18.tgz`, digest
  `9a764548…`) vendors into Veneer through `units/test-paint-vendor.sh` between U7d's exit and
  U7a's launch, so no install runs beside a live writer. Bounds carried to the next Test change
  are listed in the verdict; none reopens this unit. Test 0.0.18 stays the manifest version.
  Ruled: `convert*` is an admissible helper prefix with one meaning, without a rule edit. U7d
  launched the same hour (thread `01a0c0f6-9147-7e72-96de-23d64790e7ca`, HEAD `1b80ccb`);
  U7c's brief is drafted at `units/u7c-brief.md` for launch after U7b lands.
- 2026-09-20, U7d accepted and landed in Veneer as `7da6bb1` (Astra, thread
  `01a0c0f6-9147-7e72-96de-23d64790e7ca`; verdict `u7d-audit-verdict.md`, four lanes accepting).
  The presence check keys off Button's `selector` and `variable` rows, `readDeferrals` reads the
  empty `### Deferred selectors` table, the cross-cutting rows carry `engine`, and the U4b bounds
  (exact binding first, explicit `events`, the non-serializable fixture finding, the
  manifest-rooted cascade path) are closed. Added: `u7d-bounds` (`opus`, native; brief
  `units/u7d-bounds-brief.md`), because vendoring the Test-paint tarball made two
  `tests/setupBrowser.test.ts` cases false (they asserted the installed reader's old limits) and
  the verifier's whole chain went red on them; the unit restates what the paint wrappers add and
  closes reviewer findings 15, 16, 17, 19, 20, and 24. It precedes U7a so U7a starts green. U7a's
  brief names that flipping the rows to `shipped` arms the live presence gate (finding 18).
  Findings 21 and 22 (two deferral grammars in the guide) are carried to U7e.
- 2026-09-20, u7d-bounds accepted and landed in Veneer as `2bc922d` (Opus, native; verdict
  `u7d-bounds-audit-verdict.md`, four lanes accepting, the verifier's whole chain exit 0). The
  whole chain is green again: the canvas and the installed reader were measured equal on every
  colour tried, so the paint wrappers' doc blocks state the agreement and their two cases assert
  it; the shipped set requires every CSS row of a category shipped; the working-directory case
  asserts the digest; the pinned-release case reads through the manifest-rooted constants; an
  incomplete deferral row is labelled by position; every named binding must reach a ledger row
  and the unreachable `Dispatches click` entry is deleted. Added: `u7-setup-tidy` (native, after
  U7a lands and before U7b): remove `readPaintedColor` and `matchesPaintedColor` and compare the
  styles proofs through the installed `matchesColor` (§ No superfluous wrappers), pin
  `pool: 'forks'` on the `setup` project, one Bootstrap pin and one digest imported across the
  setup modules, the `readCompatibility` row label by position, the reach assertion over
  fallback bindings with a refusal that names the binding, and the wording bounds the verdict
  lists. U7a launched on the landing (Astra, thread named in `units/u7a.sh`'s journal).
- 2026-09-20, U7a's first launch stopped before editing (thread
  `01a0c12a-a2e9-7ab3-badc-3546bcc95ea2`, `units/u7a-report.md`): the brief withheld
  `tests/conformance.test.ts`, whose explicit `listed` array the row flip to `shipped` must name
  (U7d's two-sided shipping rule). The Orchestrator's scope error; `units/u7a-brief-2.md` grants
  the array alone and relaunched as thread `01a0c12d-f205-77b3-aff2-22beb621e0f8`
  (`units/u7a-2.sh`). The `u7-setup-tidy` brief is drafted (`units/u7-setup-tidy-brief.md`) for
  dispatch after U7a lands.
- 2026-09-20, U7a's second launch stopped before editing (thread
  `01a0c12d-f205-77b3-aff2-22beb621e0f8`, `units/u7a-report-2.md`): the inherited brief deferred
  the whole `--bs-btn-close-*` family while `_mixins.scss` already declares
  `--bs-btn-close-filter` as a U3 retention the guide records, and the presence scanner refuses
  a deferred name the cascade carries. Ruled: that property is the U3 exception, retained where
  it is, outside U7a's deferrals and binding rows; every other close-family name is deferred.
  `units/u7a-brief-3.md` carries the ruling and relaunched (`units/u7a-3.sh`).
- 2026-09-20, U7a's third launch stopped after the Elements partial (thread
  `01a0c133-8cd8-7240-9305-42f99bdcae37`, `units/u7a-report-3.md`): the styles build merges
  `border-block: 0; border-inline: 0` into `border: 0`, the CSSOM expands that shorthand into
  `border-left-*` and `border-right-*` longhands, and the physical-axis guard in
  `tests/src/styles/index.test.ts` refuses every physical longhand it meets. Ruled: the guard
  over-reaches; a physical longhand whose opposite-side twin appears in the same rule with an
  identical value is a symmetric shorthand and is admitted; `units/u7a-brief-4.md` grants the
  guard's helper, its cases, and the guard case, keeps the brief-3 work in the tree, records the
  forced-colours reading as an open row (the installed `MediaOptions` stages `print` and `motion`
  only; a Test-side bound), and relaunched (`units/u7a-4.sh`).
- 2026-09-20, U7a's fourth launch stopped on the export-inventory case in
  `tests/setupStyles.test.ts` that the new `filterAsymmetricDeclarations` export grows (thread
  `01a0c13c-794d-73e3-950e-0089eb3b523e`, `units/u7a-report-4.md`); the guard helper, its
  cases, and the rewritten guard case landed in the tree and the styles project passed. Four
  stops in one unit, each on a file or an assertion the change makes false that the brief did
  not name: `units/u7a-brief-5.md` adds a standing clause for the unit (an enumerating
  assertion the owned change grows is the unit's to update, recorded in the report) and
  relaunched (`units/u7a-5.sh`). Standing lesson for every later brief: derive the owned set by
  running the suite against the change's shape (the export-set, parity, and inventory cases),
  not from the files that declare the thing changing.
- 2026-09-20, U7a's fifth launch completed the implementation (thread
  `01a0c144-d819-7343-a531-d0fdf62a76aa`, `units/u7a-report-5.md`): both partials, the mixer
  and Button tokens, the `focus-ring` mixin, the proofs on Chromium and Edge, the deferral
  partition, the shipped rows with `listed = ['btn']`, four controls red and restored, every gate
  exit 0, cascade digest `d544aae8…`. It stopped on its own contract review: the case matrices
  sit inline in the Button test files while `tests.md` places them in a setup file, and the
  setup-file grant covered one helper alone. `units/u7a-brief-6.md` grants the tables and
  relaunched (`units/u7a-6.sh`). The forced-colours reading is an open row (Test-side bound:
  `MediaOptions` gains a forced-colours axis).
- 2026-09-20, U7a round 1 audited on the brief-6 tree under the user's narrowed scope
  (implementation only; no wording, comment, or guide-prose findings): the verifier's whole
  chain exit 0 on Chromium and Edge, the checker accepts, the analyst and the objective
  reviewer each rule a fix round. Carried into `units/u7a-brief-7.md` (Astra, the fix round):
  the outline active and ring proofs; the `light` role's white-on-white text with a contrast
  case per role and mode; the state tokens moved into `theme-tokens`; `userEvent` replaced by
  the installed helpers; the `focus-ring` mixin decoupled from the button token group; the
  disabled shadow read through `--bs-btn-box-shadow`; the bare `.btn:active` superset dropped
  with an unchecked-label case; the mixin proof's guarded keystroke; the light mixer end as
  the text token. Not carried: the unread `--bs-btn-focus-shadow-rgb` (a departure row for
  U7e), the symmetric-pair admission's enforcement trade, the Edge configuration remark (the
  verifier's Edge run closed it).
- 2026-09-20, U7a's fix round (brief 7, thread `01a0c172-44b3-7ff0-a300-9c01f9c289e4`,
  `units/u7a-report-7.md`) closed findings 3 (state tokens inside `theme-tokens`) and 5 (the
  `focus-ring` mixin's neutral `--vn-focus-highlight` and `--vn-focus-reset` defaults) and
  stopped on finding 9: binding the light mixer to the text token breaks every light-mode
  calibration proof, so the reviewer's premise (the literal is the text token's sRGB rendering)
  is refuted by measurement. Ruled: the literal endpoint stays as the calibration's measured
  value; the retuning case is deleted. `units/u7a-brief-8.md` carries the reversion and the
  remaining findings 6, 7, 2, 4, 8, 1, the controls, and the gates.
- 2026-09-20, U7a brief 8 (thread `01a0c17a-c664-7020-9ffd-03ecd2280140`, `units/u7a-report-8.md`)
  closed findings 9 (reverted on measurement), 6, and 7 and stopped on finding 2: the brief's
  4.5:1 text-over-fill floor for every role and mode fails on the calibrated dark fills (dark
  primary reads 2.59:1 at rest, white over `oklch(0.7 0.15 233)`), which are Elements' measured
  values and not U7a's to change; the `light` role's black foreground made every light-role
  state pass. Ruled: the floor applies to the `light` role alone (the defect the reviewer named);
  the other roles' ratios are pinned at their measured values so a regression reads, and the
  dark-fill contrast is recorded for the user as a design question outside the campaign's exit
  criterion. `units/u7a-brief-9.md` carries the ruling and the remaining findings 4, 8, 1, the
  controls, and the gates.
- 2026-09-20, U7a brief 9 (thread `01a0c188-437b-7041-ba8f-36e85a57c179`, `units/u7a-report-9.md`)
  closed every finding of the round (the `light` role's black foreground with the floor for
  that role and the other roles' ratios pinned; `userEvent` replaced by `pressKeys`,
  `hoverAccessible`, `clickAccessible`; the mixin proof's guarded keystroke; the outline active
  and ring proofs), ran `PLANT-LIGHT` and `PLANT-CHECK` red and restored byte-for-byte, and
  stopped on lint: `vitest/no-conditional-expect` rejects the contrast case's floor-or-pin
  branch. `units/u7a-brief-10.md` splits the population into two tables with unconditional
  assertions and runs the remaining gates. The measured dark-fill ratios (dark primary 2.59:1
  at rest under white text) are recorded for the user as a design question outside this unit.
- 2026-09-20, U7a brief 10 (thread `01a0c198-a0e8-78a2-b3fa-4c506a08b474`, `units/u7a-report-10.md`)
  completed the fix round: the contrast population split into `BUTTON_CONTRAST_FLOOR_CASES` (the
  `light` role at the 4.5 floor) and `BUTTON_CONTRAST_RATIO_CASES` (every other role pinned),
  no conditional expect, every gate exit 0 on Chromium and Edge, the 90 contrast readings equal
  to report 9's on both engines, cascade digest `14cbc6fa…`. Round 2 of the audit launched on
  the fix-round tree: the objective reviewer on Opus (the engine that did not write it), the
  subjective analyst on Astra, the checker, and the verifier, on `u7a-audit-claims-2.md`.
- 2026-09-20, U7a accepted (round 2: four lanes accepting, the verifier's whole chain exit 0
  on Chromium and Edge, cascade digest `14cbc6fa…`) and landed in Veneer as `12e1bd6`
  (verdict `u7a-audit-verdict.md`). Carried: the unread `--bs-btn-focus-shadow-rgb` departure
  row (U7e), the dark-fill contrast question (the user), the forced-colours reading (a
  Test-side `MediaOptions` axis). Next: `u7-setup-tidy` on the landing, then U7b.
- 2026-09-21, `u7-setup-tidy` returned green on Opus from the U7a landing `12e1bd6`
  (`units/u7-setup-tidy-report.md`): the paint wrappers deleted and every styles proof comparing
  through the installed `matchesColor`; `pool: 'forks'` pinned on the `setup` project with the
  measured `process.chdir` refusal named; one release pin and one CSS digest in
  `tests/setupConformance.ts`; `describeIncompleteRow` labelling both readers' refusals by
  position and column; the reach case over every binding with the unreachable `btn | event`
  fallback deleted and the `names no events` refusal; two controls red and restored; every gate
  exit 0 on Chromium and Edge. One resolution recorded for the ruling: the forced-colours case
  compares computed strings directly because the installed reader's probe sits inside the
  forced-colours emulation (a Test-side bound). Audit launched: the objective analyst on Astra,
  the subjective reviewer on Opus, the checker, and the verifier, on
  `u7-setup-tidy-audit-claims.md`.
- 2026-09-21, `u7-setup-tidy` accepted (four lanes accepting; verdict
  `u7-setup-tidy-audit-verdict.md`) and landed in Veneer as `91e5906`. At integration the
  Orchestrator reverted the unit's `vite.config.ts` pool pin: the root Vite configuration is
  scaffold's vendored file (`scaffold audit` reported it stale), so the pin is a scaffold-side
  bound for the user to direct, and the working-directory case's comment names the default
  `forks` pool instead. Carried: the `event` binding apparatus returns with the first real
  `btn | event` ledger row; the installed reader's forced-colours limit is a Test-side bound.
  Next: U7b on the bench from `91e5906`.
- 2026-09-21, U7b returned complete on Astra from the tidy landing `91e5906` (thread
  `01a0c1cf-d569-7140-8e47-d0a6d15c56bd`, `units/u7b-report.md`): `Button` and `Delegate` flat
  in `src/browser/`, `emitEvent` and `bindEventMap` in `helpers.ts`, the `isButtonHost` and
  `isButtonEvent` guards, the barrel registering no listener on import, the two controls red and
  restored, every gate exit 0 on Chromium and Edge; no new surface. One deviation: the
  constructor refusals throw a native `TypeError` where `typescript.md` requires an `AppError`
  with a `code` and a guard, and the brief granted no `errors.ts` (the Orchestrator's omission).
  Ruled: `AppError` and `isAppError` live in `src/core/errors.ts` (host-independent, reached
  through the core barrel). `units/u7b-brief-2.md` carries the ruling and relaunched
  (`units/u7b-2.sh`).
- 2026-09-21, U7b brief 2 (thread `01a0c1de-e09c-7c51-a98c-540ba05517ab`, `units/u7b-report-2.md`)
  landed the error contract in the tree: `AppError` (`code`, optional `context`, the cause
  forwarded) and `isAppError` in `src/core/errors.ts`, `Button`'s refusals `BUTTON_HOST_INVALID`
  and `BUTTON_HOST_OWNED`, every gate exit 0 on Chromium and Edge. Audit launched on the
  brief-2 tree: the objective reviewer on Opus (lane swap), the subjective analyst on Astra,
  the checker, and the verifier, on `u7b-audit-claims.md`.
- 2026-09-21, U7b round 1 audited on the brief-2 tree (implementation only): the checker
  accepts; the analyst and the objective reviewer each rule a fix round; the verifier reads
  every gate green except `test:guides`, which the eighteen new exports fail (brief 1 kept the
  guide off-limits and omitted that gate: the Orchestrator's errors). Carried into
  `units/u7b-brief-3.md` (Astra, thread named in `units/u7b-3.sh`'s journal): the anchor
  write-order observation; the delegate never throwing out of its listener on an owned host
  (an owned host is left to its owner); the owned set pruned of disconnected hosts on each
  click; the guide's parity minimum (one Surface row per export, the method tables). Round 2
  audits the fix with Opus as the engine that did not write it.
- 2026-09-21, U7b brief 3 (thread `01a0c1ee-e5ae-7b61-a1a7-e4c780920eba`, `units/u7b-report-3.md`)
  completed the fix round: the anchor write-order case red on a planted reversal and green;
  the delegate catching only `BUTTON_HOST_OWNED` and leaving an owned host to its owner (two
  cases recording no browser error event); the disconnected-host pruning on each delegated
  click with restoration of the detached hosts; the guide's parity minimum for the eighteen
  exports with `test:guides` green; every gate exit 0 on Chromium and Edge. Round 2 launched on
  the fix-round tree: the objective reviewer on Opus (the engine that did not write it), the
  subjective analyst on Astra, the checker, and the verifier, on `u7b-audit-claims-2.md`.
- 2026-09-21, U7b round 2 on the brief-3 tree: the analyst, the checker, and the verifier
  (fourteen steps exit 0, `npm test` and `test:guides` included) accept; the objective reviewer
  rules one more fix: the prune key brief 3 fixed (`isConnected`) is document connectivity, not
  root membership, so a fragment-rooted host is rebuilt on every click and a host moved out of
  the root is never released. The key was the Orchestrator's. `units/u7b-brief-4.md` (Astra)
  changes it to `this.#root.contains(host)` with two cases; round 3 audits the fix.
- 2026-09-21, U7b briefs 4 to 6 on Astra (threads `01a0c219-dbbc-70e3-aa7f-cac926de5ac1`,
  `01a0c220-c9f3-7391-b4dd-bbaa5b2bde02`, `01a0c225-2cd3-77e0-9611-bb7e36232cbd`; reports
  `units/u7b-report-4.md` to `-6.md`): brief 4 landed the root-membership key with its two
  cases (red on the old key, green on the new) and stopped on lint at the `toThrowError` alias;
  brief 5 replaced the alias and stopped on `format:check`, the shortened calls fitting one line
  under a brief that forbade any further change; brief 6 ran the scoped formatter on the owned
  file (the path form probed read-only on the host first) and every gate to completion on
  Chromium and Edge. The two stops were the Orchestrator's over-tight briefs. Round 3 launched
  on the brief-6 tree on `u7b-audit-claims-3.md`.
- 2026-09-21, U7b round 3: the objective reviewer on Opus, the subjective analyst on Astra, and
  the checker accept (claims 1 to 3 CONFIRMED; the prune predicate and the acquisition guard
  now one rule); the verifier settles claim 4 with every step exit 0 (`npm test`, `test:guides`,
  Chromium and Edge, the read-only `scaffold audit`). Verdict accept; landed as Veneer `0cbb563`
  through `units/u7b-land.sh`. Observations outside the unit: `tests/setupListeners.ts` has no
  proof file (a bound for the next setup unit); the registry serves later majors of
  `@vitest/browser-playwright`, `typescript`, and `vitest` (the user's call). U7c dispatches on
  Opus over `0cbb563` with the U7b landing's `Delegate` reading (root membership) in its message.
- 2026-09-21, U7c dispatched on native Opus over Veneer `0cbb563` after a clean checker scope
  read of `units/u7c-brief.md` against the landed tree (`units/u7c-scope-read-brief.md`,
  `units/u7c-scope-read-report.md`: every named path resolves, every re-taken reading holds,
  every falsified assertion is owned, no vendored path owned). The dispatch message
  (`units/u7c-dispatch-message.txt`) carries the re-taken readings, the root-membership
  `Delegate` rule, and the scoped formatter and lint rewrites as granted forms, so a line-fit or
  alias diagnostic is not a stop. Opus writes, so the U7c audit gives the objective lane to the
  Astra analyst and the subjective lane to the Opus reviewer.
- 2026-09-21, U7c brief 1 returned complete on Opus (`units/u7c-report.md`): the `sections/`
  family with `ButtonSection` over the frozen specimen table, the projection, the journeys, the
  capture registry, the `./browser` consumer case; every gate exit 0 on Chromium and Edge;
  deviations D1 to D8 settled in scope. Round 1 (the Astra analyst objective, the Opus reviewer
  subjective, the checker, the verifier on `u7c-audit-claims.md`): the verifier green on every
  step; the judging lanes rule a fix round on the partial ownership-partition proof, the
  self-comparing exclusion assertion, the dark ring sweep over one specimen, the unexported
  oracle driver and case matrices in the test file, the teardown without `finally`, the
  entity-subfolder barrel, the `.btn`-bound helper named generally, and the distribution reader
  carrying a non-export reading. Carried as `units/u7c-brief-2.md` on Opus (the Astra analyst
  stays the objective auditor). Guide bounds 1 to 10 carried to U7e in
  `units/u7c-guide-bounds.md`; Test-side findings (element frames blank beyond roughly 900 px at
  the 1280 variant, page frames clearing `:hover`, `readStates` announcing `disabled`) recorded
  for the Test 0.0.19 release unit; the paint calibration readings join the user's open design
  question.
- 2026-09-21, U7c brief 2 returned complete on Opus (`units/u7c-report-2.md`): the eight
  round-1 findings closed; the case matrices and the oracle driver moved to the setup files
  (`collectPainted` over the rendered surface because the `src/browser` environment boundary
  refuses a static app import in `tests/setupBrowser.ts`); every gate exit 0 on Chromium and
  Edge. Round 2: the checker accepts and the verifier is green on every step; the analyst and
  the reviewer substantiate four test-layer findings (the ring ratio pinned only relative to the
  same run, the next case mounting after a failed teardown, the setup proofs' cleanup ordering,
  `Showcase.test.ts` re-declaring the ownership rule with a tautological close). Carried as
  `units/u7c-brief-3.md` on Opus. Reviewer finding 10 (`driveOracle` scopes the host reading
  only) is carried to the unit that adds the second section.
- 2026-09-21, U7c brief 3 returned complete on Opus (`units/u7c-report-3.md`): the calibrated
  `FOCUS_RING` table pinned per mode, the teardown marker refusing the next mount, the setup
  proofs' cleanup under `finally`, `Showcase.test.ts` over `BUTTON_SELECTOR` with a non-empty
  guard. Round 3: all four lanes accept (the verifier green on every step, the whole chain's
  exit read from its log). Verdict accept; landed as Veneer `92aad70` through
  `units/u7c-land.sh`. U7 (Button) is closed on browser evidence except the guide, which U7e
  corrects to the landed truth (bounds in `units/u7c-guide-bounds.md` and
  `units/prose-bounds-carry.md`). Carried forward: reviewer round-2 finding 10 to the second
  section's unit; the Test-side `captureFrame` and `readStates` findings to the Test 0.0.19
  release unit; the paint calibration readings and the two deferral grammars to the user.
- 2026-09-21, re-baseline after U7c: **added** U7f, the Button portfolio verdict the U7 acceptance
  clause and the exit criterion already require ("captured acceptance against Elements'
  specimens, ruled through the `orkestrel-polish-surface` skill"). A Grok scout of the Elements
  checkout (`units/elements-button-scout-report.md`) finds no capture harness, no state grid,
  and no rendered comparison artifact there, only the numeric calibration Veneer already reads
  from Elements' built showcase, so the Elements side is produced by a throwaway spawned harness
  the Orchestrator owns (`units/u7f-harness-brief.md`, `builder`), and the verdict round runs
  the three lanes the skill names (subjective design fit, objective state truth, mechanical
  inventory) on one portfolio: Veneer's 48 frames and per-variant artifacts from the U7c
  capture run (preflighted: non-blank frames, non-empty accessibility trees, step logs, empty
  console logs) beside Elements' frames. U7e (the guide) runs in parallel because it owns
  `guides/veneer.md` alone. **Unchanged**: the component queue after U7. Not a rescope: the exit
  criterion already named the captured acceptance.
- 2026-09-21, U7e returned complete on Opus (`units/u7e-report.md`): five bounds corrected in
  `guides/veneer.md`, the § Compatibility unknown true as written, one further false sentence
  (the styles entry "ships no component treatments") corrected under the objective; audited by
  the Astra analyst alone plus the verifier under the user's ruling on guides (recorded in
  `u7e-audit-verdict.md`); accepted and landed as Veneer `7f6d5f6`. U7f round 1 (three lanes on
  Veneer's 48 frames beside Elements' twenty): `ANOTHER ROUND(2, 4, 5, 6, 9, 10, 12)`; the
  harness gaps closed by rounds 2 and 3 of the spawned harness (`units/u7f-harness-3.mjs`,
  the padded focus-ring frame, the settled theme and pointer shots, the States section and the
  toggle host's pressed-moment state); the Veneer-side findings (the shell control's affordance
  inverting with the theme, the hover and active frames shot inside the transition, the tree
  taken only at arrival) carried as `units/u7f-fix-brief.md` on Opus over `7f6d5f6`, whose
  `CAPTURE=1` run regenerates the portfolio for round 2.
- 2026-09-21, U7f-fix landed as Veneer `060ce02` after two audit rounds (`u7f-fix-audit-verdict.md`):
  the header control's border in the `shell` layer, the pointer frames shot with reduced motion
  and the pane staged around them (a measured deviation: the capture's own pane staging moved the
  document from under the pointer, and the handed-back layout reads the opposite of the frame),
  the pressed-moment tree, then the test-sufficiency fixes the audit found (the deciding hover
  readings in the re-staged pane, the arrival tree selected by a property only a tree carries,
  `releasePane` in the teardown, the pointer released before `home-dark`, the header-and-`main`
  invariant). Process rule recorded: the capture run comes last before portfolio evidence is
  assembled (`units/u7f-recapture.sh`). Round 2 of the portfolio verdict launched on the
  regenerated Veneer portfolio beside the round-3 Elements portfolio (`units/u7f-verdict-brief-2.md`).
  Test-side bounds carried to the Test 0.0.19 release unit: `captureFrame` re-establishing the
  pointer after it stages the pane and leaving the pane staged until its caller releases it.
- 2026-09-21, U7f accepted: the Button portfolio verdict converged in round 3 (`u7f-verdict.md`),
  every item RENDERED-PROVEN against Veneer's final portfolio over `060ce02` beside Elements'
  round-4 harness portfolio. **U7 (Button) is closed on browser evidence**: the ledger's accepted
  rows implemented (U7a, U7b, U7c), the guide corrected (U7e), the shell repaired and the proofs
  strengthened (U7f-fix), and the captured acceptance against Elements' specimens ruled through
  the `orkestrel-polish-surface` skill. Reported to the user at this acceptance: the recorded
  departures (pressed fill, disabled dimming) and the design questions (the outline pair, the
  dark primary contrast, the latched fill, the dark dimmed-versus-active cyan, the control's
  treatment), the Test-side bounds for the 0.0.19 release unit, and the forced-colours axis.
  Next: the Content/layout family's design round (`units/content-layout-design-brief.md`) on the
  Grok terrain map, then its units in mechanism order per § Component queue.
- 2026-09-21, the Content/layout family's design round reconciled (`content-layout-design-verdict.md`;
  planner `units/content-layout-design-planner-report.md`, analyst
  `units/content-layout-design-analyst-report.md`, Grok map `units/content-layout-scout-report.md`).
  **Added** the family's units CL0 to CL13 in mechanism order with their routing ledger (CL0
  calibration in Elements; CL1 contract, CL3, CL4, CL6, CL7, CL8, CL9 on Astra; CL2, CL5, CL10,
  CL11, CL12 on Opus; CL13 the portfolio verdict), the token rulings (`--vn-space-12`,
  `--vn-space-24`, `--vn-display-1` to `-6`, `--vn-state-stripe`; consumer fallbacks for the
  link opacities and `--bs-body-text-align`), the one-table exclusion grammar with `Excluded` as
  a terminal owner, `page.viewport` as the breakpoint axis, Bootstrap's own values as the grid's
  source with the pinned official page as the portfolio's second side (an accepted difference
  to report), and the probes each unit takes first. The exit criterion is unchanged: every
  `Content/layout` row implemented, excluded with a reason the user sees, or retained. Next:
  CL0 (Grok specimen map, then the calibration instrument) beside CL1 (Astra), each after a scope
  read.
- 2026-09-21, CL0 landed in scaffold's record (`40cbbd9a`): the content calibration instrument
  `research/calibration-content.mjs` (a sibling of the accepted instrument, which stays
  byte-identical), its readings on managed Chromium and Edge in both modes, and the record
  `research/calibration-content.md` (one table per surface across the eighteen surfaces the Grok
  map named, every specimen attached), indexed from `research.md`; CL3, CL6, and CL9 bind their
  values to it. CL1 (the proof contract, Astra) runs in Veneer beside it.
- 2026-09-21, CL1 landed in Veneer as `00a5bdc` after two audit rounds (`cl1-audit-verdict.md`;
  briefs `units/cl1-brief.md` and `units/cl1-brief-2.md`, reports `units/cl1-report.md` and
  `units/cl1-report-2.md`, the landing log `units/cl1-land.log.txt`). Round 2 accepted on every
  lane: the reviewer on Opus held the objective lane and the Astra analyst the subjective lane
  (Astra wrote the unit and the fix), the checker ruled the mechanical claims, and the verifier
  ran every gate green on managed Chromium and Edge. What landed: the conformance scanner's
  terminal `Excluded` owner with membership and nested-absence checks, the property-free
  admission on the selector row, the root-scoped oracle drive (`readOracleButton`,
  `pressOracleKeys`, `holdOraclePointer` reproducing the installed hold's body with the release
  rejection as `cause`), `BREAKPOINT_CASES` frozen in `tests/setupStyles.ts`, and
  `visitBreakpoint` in `tests/setupBrowser.ts` over the static `page` import with restore in
  `finally`. Bounds carried, not defects: reviewer 6 (`visitBreakpoint` restores in a bare
  `finally`, so a restore rejection would replace the action's failure) and reviewer 7 (the
  hold's unreachable-after-scrolling refusal and its pressed-state miss with a successful release
  have no case) go to CL11, which owns `tests/setupBrowser.ts` for the helpers (a unit that owns the file for another reason does not take them); the
  analyst's note that U7c's `resolveButton` carries the same prefix defect stays with CL11.
  **Unchanged:** CL2 to CL13. Next: CL2 (Opus) after its scope read
  (`units/cl2-scope-read-brief.md`), then CL3 (Astra) with its scroll-behavior probe.
- 2026-09-21, CL2 dispatched on Opus under `units/cl2-brief-2.md` after the scope read
  (`units/cl2-scope-read-report.md`) found brief 1 naming breakpoint mixins that did not exist;
  brief 2 made them authored work over one Sass source. The unit landed the tokens
  (`--vn-space-12`, `-24`, `--vn-display-1` to `-6`, `--vn-state-stripe`), the `breakpoints()`
  function in `_mixins.scss` from which `_tokens.scss` emits the breakpoint tokens and the
  `breakpoint-up` and `breakpoint-down` mixins read their range-syntax conditions, the
  compile-time refusal of an unknown name, `collectMediaConditions` in the browser setup and
  `parseMediaWidth` in the styles setup, and the proofs at both depths (`units/cl2-report.md`).
  Round 1 (`cl2-audit-verdict.md`): every claim confirmed and every gate green on both engines;
  one defect forces a fix round (a hidden module-scope regex constant in `tests/setupStyles.ts`,
  found by the analyst and the reviewer alike), with three reviewer test-sufficiency findings
  carried (the reader case's same-width gates, an assertion that cannot fail, the stripe
  placement unbound by its proof). Ruled on the reviewer's referral: a Node-side Sass compile
  proof of a partial's refusal lives in `tests/setupStyles.test.ts` beside its precedent,
  because no Node project includes the styles proofs and the config is vendored. The fix round
  runs on Opus under `units/cl2-brief-3.md`; Astra stays the objective auditor. **Unchanged:**
  CL3 to CL13.
- 2026-09-21, CL2 landed in Veneer as `9f5ffda` after two audit rounds (`cl2-audit-verdict.md`;
  briefs `units/cl2-brief-2.md` and `units/cl2-brief-3.md`, reports `units/cl2-report.md` and
  `units/cl2-report-2.md`, the landing log `units/cl2-land.log.txt`). Round 2 accepted on every
  lane: the Astra analyst held the objective lane (Opus wrote the unit and the fix), the Opus
  reviewer the subjective lane, the checker ruled the mechanical claims, and the verifier ran
  every gate green on managed Chromium and Edge. What landed: `--vn-space-12`, `--vn-space-24`,
  `--vn-display-1` to `-6`, `--vn-state-stripe` in the registry and the cascade; the
  `breakpoints()` function in `_mixins.scss` as the one source of the breakpoint widths, from
  which `_tokens.scss` emits `--vn-breakpoint-*` and the `--bs-*` aliases and the
  `breakpoint-up` and `breakpoint-down` mixins read range-syntax conditions (`xs` unwrapped
  upward, nothing downward; an unknown name refused at compile time); `collectMediaConditions`
  in the browser setup and `parseMediaWidth` in the styles setup; proofs at both depths and the
  compile-time refusal proof in `tests/setupStyles.test.ts` (the ruled home of a Node-side Sass
  compile proof). Bound carried, not a defect: reviewer 6 of round 2 (the stripe assertion binds
  the dark closure alone) goes to CL5, which next owns `tests/src/styles/tokens.test.ts`.
  **Unchanged:** CL3 to CL13, and every later unit consumes the mixins through
  `breakpoint-up`/`breakpoint-down` rather than a literal width. Next: CL3 (Astra) after its
  scope read, with the scroll-behavior probe first.
- 2026-09-21, CL3 dispatched on Astra under `units/cl3-brief-2.md` after the scope read
  (`units/cl3-scope-read-report.md`) amended four rows of brief 1 (no `sections/` aggregate in the
  app barrel; no `reboot` row in the guide's Compatibility table, which CL4 adds as `shipped`;
  the departure rows under `### Departures from Bootstrap`; the design reports' paths) and took
  the launch readings. The unit stopped under the deviation protocol (`units/cl3-report.md`):
  brief 2 bound the code family's paint to `--vn-text-code`, whose value is Bootstrap's pink,
  while CL0's record reads Elements' inline code as the body text colour on a 12 % tint of it,
  and the token files were off-limits. Its scroll-behaviour probe passed the journey suite on
  both browsers with the rule planted. **Added** to CL3 by `units/cl3-brief-3.md` (the ruling,
  under the design's "adapt values, never selectors"): `--vn-text-code` resolves to the body
  text (`--bs-code-color` still aliases it; a departure row), a new `--vn-surface-code` token
  in the theme closure with its registry leaf, proof, and guide row; brief 3 grants
  `_tokens.scss`, `_mixins.scss`, `src/core/constants.ts`, and `tests/src/styles/tokens.test.ts`
  for exactly that, and narrows the token stop to a token neither CL2 nor brief 3 grants. The
  landing allowlist and the audit kit follow. **Unchanged:** CL4 to CL13.
- 2026-09-21, CL3 returned under brief 3 (`units/cl3-report-2.md`, thread
  `01a0c397-fde9-7752-a904-3d76bff7ba31`): the reset partial, the twenty text tag partials with
  mirrored proofs, the code family tokens under brief 3's ruling (`--vn-text-code` as the body
  text, `--vn-surface-code` at 12 %), `ContentSection`, and the guide rows; every gate green on
  both browsers; every proof red then green. The report names three calibration limits it
  could not close inside its grant. **Ruled:** the link colours' equality with the record is
  CL6's (the links unit retunes the link map; CL3 binds the tokens, which is the mechanism);
  the muted text of `address` and `dd` (Elements' `--color-text-muted`, light
  `oklch(0.446 0.043 257.281)`, dark `oklch(0.704 0.04 256.788)`) and the raised surface of
  `pre`, `samp`, and `var` (Elements' `--color-surface-raised`, light `oklch(0.968 0.007 247.896)`,
  dark `oklch(0.265 0.014 256)`; Veneer's `--vn-surface-raised` differs slightly) are a token
  gap of the same class as the code family. **Added:** CL3b on Opus, after CL3 lands and before
  CL4: a `--vn-text-muted` token (theme maps, closure, `text.muted` leaf, proof, guide row),
  the `--vn-surface-raised` retune to the record (with whatever proof pins the old value), and
  the rebinding of `_address.scss`, `_dl.scss`, `_pre.scss`, `_samp.scss`, and `_var.scss` with
  their proofs' rows. CL3 lands with those limits recorded in its report and claims. The `b`
  tag stays with CL4. CL3's round-1 audit runs on the swapped lanes (Opus reviewer objective,
  Astra analyst subjective) with the checker and the verifier. **Unchanged:** CL4 to CL13.
