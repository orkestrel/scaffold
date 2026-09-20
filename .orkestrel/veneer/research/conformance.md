# Evidence addendum — veneer-proof-map

Read-only. No design, plan, or recommendation. Suites were not run. Appearance claims are source intent, not rendered proof.

## Git status

This unit wrote nothing. Last measured state (prior map, 2026-09-19): Scaffold `main` `b838db3d` with untracked `.orkestrel/`; Veneer `fc36cec`, Elements `3b41900`, Mailbox `8b54542`, Roughnotes `4a59192` — each `main...origin/main` clean.

---

## Installed primitives (facts, not proposals)

**@orkestrel/test `0.0.18`** is installed in Scaffold and Roughnotes (`node_modules/@orkestrel/test/package.json`). Runtime dependency: `@orkestrel/contract ^0.0.17`. Public faces: `.`, `./browser`, `./server`. Core declarations include `StateTransition`, `StateScenario`, `waitForText`, `createRecorder`, `waitForCondition`, `createHostileValues` (`guides/test.md:133–185`; `dist/src/core/index.d.ts`). Browser declarations include `pressKeys`, `build`, `mount`, `readCensus`, `readContrast`, journey variants (`dist/src/browser/index.d.ts:16–75`; `guides/test.md:306`). Journey skill (`orkestrel-prove-journey/SKILL.md:32–45`) names families Journey, Refusal, Matrix, Statechart, Transport, Capture.

**@orkestrel/contract `0.0.17`** is installed in Scaffold, Roughnotes, and MCP. Zero runtime dependencies (`package.json:73–88`). Guards, combinators, parsers, shape DSL.

**MCP** also installs `@orkestrel/test 0.0.15` (older than Roughnotes). Veneer, Elements, and Mailbox declare no `@orkestrel/*`.

User standing condition: Veneer CSS and JS must ship without runtime dependencies. That is intent. Package maps below are facts.

---

## Slice: Elements and Mailbox browser engines

### Runtime dependency facts

| Package  | Runtime                                          | Dev                                                     | Official Bootstrap package |
| -------- | ------------------------------------------------ | ------------------------------------------------------- | -------------------------- |
| Elements | `@vue/reactivity ^3.5.35` (`package.json:59–60`) | `vue ^3.5.35`, `sass`, `tailwindcss`                    | none                       |
| Mailbox  | `@vue/reactivity ^3.5.35` (`package.json:52–53`) | `vue ^3.5.35`, `sass`, `tailwindcss`, `bootstrap-icons` | none                       |

`vue` is not a runtime dependency. Factories import `@vue/reactivity` (`effectScope`, `ref`, `readonly`). Composables import `vue` (`watch`, `shallowRef`, `computed`). Guide: Mailbox `guides/composables.md:94–103`.

Elements `createTheme` also imports `attempt` from `@elements/core` (`src/browser/theme.ts:17`) — local core, not `@orkestrel/contract`.

### Ownership split (proven in source)

Factory owns DOM mutation, listeners, classes, events, `@vue/reactivity` state, and `destroy()`. Composable is a Vue lifecycle adapter that resolves refs, constructs the factory, and disposes on `onCleanup`. Mailbox `guides/composables.md:79–133`. Elements `guides/README.md:93–95`. Example: Elements `useDialog.ts:18–41` → `createDialog`; Mailbox `useModal.ts:15–39` → `createModal`.

`destroy()`: remove listeners, `scope.stop()`, clear state classes, cancel transitions, close native popovers. Actions remain callable after destroy; auto-triggers are gone (`composables.md:123–133`; Elements `createPopover.ts:54–57`).

### Public factory sets

**Elements** (`src/browser/factories/index.ts`): `createAlert`, `createAside`, `createButton`, `createCarousel`, `createDetails`, `createDialog`, `createDrag`, `createDrop`, `createFocus`, `createForm`, `createMenu`, `createNav`, `createPointer`, `createPopover`, `createSelect`, `createTable`, `createTabs`, `createTheme`, `createToast`, `createTooltip`. Inspector is barrelled (`src/browser/index.ts:15`).

**Mailbox** (`src/browser/factories/index.ts`): `createAlert`, `createButton`, `createCarousel`, `createCollapse`, `createDetails`, `createDialog`, `createDrag`, `createDrop`, `createDropdown`, `createFocus`, `createForm`, `createModal`, `createOffcanvas`, `createPointer`, `createPopover`, `createScrollSpy`, `createSelect`, `createTab`, `createTable`, `createTheme`, `createToast`, `createTooltip`. Inspector exists under `src/browser/inspector/` and is **not** re-exported from `src/browser/index.ts`.

Elements has no `createModal` / `createOffcanvas` / `createCollapse` / `createDropdown`. Mailbox has no `createAside` / `createMenu` / `createNav` / `createTabs` (it has `createTab` + `createScrollSpy`).

### Disclosure / overlay / theme — what the code owns

**Native-tag engines (Elements primary; Mailbox also ships these):**

- `createDialog` — host **must** be `<dialog>` (`assertElement`, `helpers.ts:1471–1489`). Browser owns top-layer, modal Tab trap, `::backdrop`, `showModal()` scroll lock. Factory owns cancelable `show`/`hide` events, Escape/backdrop dismiss, non-modal scroll lock, `runTransition` (`createDialog.ts:15–28, 55–99`). No JS `CSS.supports` / `showPopover` feature test anywhere under `src/browser`.
- `createDetails` — native `[open]` + `toggle`; no JS height animation; accordion via sibling `deactivate` events (`createDetails.ts:6–22`).
- `createAside` (Elements only) — native Popover API: `showPopover` / `hidePopover`, light-dismiss for `popover="auto"`, CSS `:popover-open` + `@starting-style`. Factory does **not** write `[data-aside-open]`, does **not** trap focus, does **not** lock scroll, does **not** reimplement Escape (`createAside.ts:6–51`).
- `createPopover` / `createTooltip` — `panel.showPopover({ source: anchor })`; placement via CSS Anchor Positioning (`positionArea`, `position-try-fallbacks`), not Popper (`createPopover.ts:22–46, 197`; Mailbox `createPopover.ts:59–63, 214`). Mailbox also writes Bootstrap placement classes (`.bs-popover-{side}`, `.popover-native`) (`helpers.ts:743–810`; `composables.md:417–418`).
- `createMenu` (Elements) / `createDropdown` (Mailbox) — compose `createPopover`; Mailbox adds `.dropdown-menu` semantics, arrow-key roving, Home/End (`createDropdown.ts:17–21`).

**Bootstrap-class engines (Mailbox only):**

- `createModal` — `.modal` / `.show` / optional `.modal-backdrop`; **JS** focus trap via `createFocus`; **JS** `lockBodyScroll`; ARIA `role="dialog"`; not gated to `<dialog>` (`createModal.ts:16–40, 67–89`). Comments note a native `<dialog>` close cascade is possible if a consumer wires that tag (`createModal.ts:101–106`).
- `createOffcanvas` — `.offcanvas.show`, sibling backdrop, `createFocus` trap, scroll lock (`createOffcanvas.ts:21–44, 68–80`).
- `createCollapse` — height transition `.collapse` / `.collapsing` / `.show`; accordion via `mailbox:collapse:deactivate` (`createCollapse.ts:14–68`).

**Theme:**

- Elements: singleton in `theme.ts`; `data-mode` for light/dark (`system` **removes** the attribute); `data-theme` for cores `default` \| `auroramoon` \| `eclipse` \| `honeymoon` \| `lagunamoon`; CSS `@media (prefers-color-scheme: dark)` owns OS-follow (`theme.ts:26–47`; `createTheme.ts:12–24`; cores in `themes/_core.scss:4–14`).
- Mailbox: singleton in `createTheme.ts`; `data-bs-theme` and `data-bs-core`; `light-dark()` + `[data-bs-theme='dark']` (`createTheme.ts:21–37`; types `ThemeModeSetting`, `ThemeCore` at `types.ts:8–20`). Deprecated `core` field kept on `ThemeChangeDetail` (`types.ts:86–98`).

**Focus:** `createFocus` is a Tab-wrap trap with `activate`/`deactivate` and restore (`createFocus.ts:6–30`). Elements `createDialog` does **not** call it (native dialog trap). Mailbox `createModal` / `createOffcanvas` **do**.

**Keyboard:** Dialog Escape via native `cancel` (`createDialog.ts:106–114`). Popover `dismiss.escape` (`createPopover.ts:68`). Dropdown roving keys (`createDropdown.ts:17–21`). Collapse has no keyboard owner in the factory; markup/trigger wiring is the caller’s.

**Cleanup:** `runTransition` + `TRANSITION_FALLBACK_MS` (Mailbox `constants.ts` documented at `composables.md:457`). Body scroll lock is a process-global counter (`composables.md:439`).

**Native-platform fallback:** No `CSS.supports` / `HTMLElement.prototype.showPopover` branch in Elements or Mailbox `src/browser`. Native APIs are called directly. Elements `_tokens.scss:229–231` mentions a “select listbox in fallback mode” as a **z-index consumer**, not a JS polyfill. `createSelect` can **mirror** a hidden native `<select>` for form data (`createSelect.ts:43–56` Elements; Mailbox `createSelect.ts:30–44`).

### Proven reusable code vs incompatible copied assumptions

**Reusable as written (same files, different product assumptions):** factory/`effectScope`/`destroy` split; namespaced cancelable `show`/`hide` + notification `open`/`close`; native `<dialog>` / `<details>` / Popover API; CSS anchor positioning; `createFocus` as an optional trap; `assertElement` tag gating; theme singleton with CSS-owned OS-follow.

**Incompatible if copied as Veneer runtime without rewrite:** `@vue/reactivity` as a runtime dependency; Mailbox Bootstrap class writers (`.show`, `.collapsing`, `.modal-open`, `.bs-popover-*`); Elements `--set-*` + `data-mode`/`data-theme` vs Mailbox `--bs-*` + `data-bs-theme`/`data-bs-core`; overlay as native `<dialog>`/`<aside popover>` vs overlay as `.modal`/`.offcanvas` + JS trap; Elements event prefix `elements:` vs Mailbox `mailbox:`; local `@elements/core` vs `@orkestrel/contract`. Copying Mailbox `createModal` into a native-dialog Veneer (or the reverse) copies the wrong host contract.

This is evidence of what exists, not a ruling on which Veneer should adopt.

---

## Slice: Veneer Bootstrap CSS conformance

**Oracle input.** `cascade.node.test.ts:13–24` concatenates **Veneer’s own** `src/styles/index.css` via `bundleSource()` (`setupServer.ts:45–56`) and compares the ordered declaration list to `tests/src/styles/__fixtures__/cascade.snapshot.txt`. Tokens are rendered from `tokens.ts`, not from disk `tokens.css` (`setupServer.ts:41–43`). Update path: `UPDATE_SNAPSHOT=1` or missing fixture writes the fixture (`cascade.node.test.ts:18–20`).

**It does not read official Bootstrap CSS.** Grep of Veneer tests/guides/src found no `node_modules/bootstrap`, `bootstrap/dist`, or `bootstrap.css` comparison. `src/styles/bootstrap/index.css:1–5` states the compiled vendor `bootstrap.css` was **itemized** into partials. Header claims Bootstrap v5.3.8 (`base/_variables.css:8` per prior map).

**Runtime dependency fact (distinct from dependency-free intent):** Veneer `package.json:47–50` declares `bootstrap ^5.3.8` and `@popperjs/core ^2.11.8`. Showcase `app/browser/main.ts` and tests `tests/setupBrowser.ts:12` **import Bootstrap JS**. Prior map: install tree’s `node_modules/bootstrap/package.json` was absent.

**Other oracles (self, not upstream):**

- `rendered.test.ts:4–59` — computed-style matrix of showcase HTML under `data-bs-theme` light/dark; Vitest snapshot (`vitest -u`). Resolved values, still a **self-golden**.
- `scale-audit.node.test.ts:54–76` — component `--bs-*` spacing/type/z-index/opacity must be `var(--vn-*)`; identity `0`/`1` and badge `em` exceptions. Brand hex literals denylisted (`:29–50`). Not an official-CSS compare.
- `layers.node.test.ts:11–46` — layer order `theme, reset, base, components, utilities`; unlayered token bags only.
- `interop.test.ts` — class-name collision set vs Tailwind (prior map). Policy: Bootstrap wins (`guides/tailwind.md` in prior map).

**Fixture membership.** Cascade fixture is the full concatenated declaration list. Rendered fixture is every showcase element × a fixed property list (`rendered.test.ts:14–37`). Negative control: scale-audit offenders must be `[]`; layers offenders must be `[]`. No control that official Bootstrap CSS would disagree.

**Coverage holes.** No independent read of installed `bootstrap` CSS. No digest pin of an official artifact. No test that fails when itemized CSS drifts from `node_modules/bootstrap` while the self-snapshot is updated in lockstep. JS widget tests drive **official Bootstrap JS** against Veneer CSS (`setupBrowser.ts:12`) — that is JS-behavior vs CSS, not CSS-vs-official-CSS. Visual acceptance of Elements look is **not** among these oracles.

---

## Slice: MCP, Ollama, LSP official-tool conformance

### Manifest runtime vs official tools

| Package                    | Runtime dependencies                                                                         | Official tool                                      | Where it lives             |
| -------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------- |
| `@orkestrel/mcp 0.0.32`    | `@orkestrel/{codec,contract,emitter,process,sse,tool,websocket}` (`mcp/package.json:97–105`) | `@modelcontextprotocol/conformance 0.2.0-alpha.11` | **devDependency** (`:108`) |
| `@orkestrel/ollama 0.0.18` | `@orkestrel/{agent,budget,contract,ndjson,tool}` (`:74–79`)                                  | `ollama 0.6.3`                                     | **devDependency** (`:94`)  |
| `@orkestrel/lsp 0.0.9`     | `@orkestrel/{contract,emitter,process}` (`:86–89`)                                           | `vscode-languageserver-protocol ^3.18.2`           | **devDependency** (`:103`) |

Official packages are not runtime dependencies. Process idea: keep the tracked upstream in development and prove isolation of published source.

### Mechanisms

**MCP** (`tests/conformance.test.ts`, `tests/setupConformance.ts`):

- Spawns the **installed** runner `@modelcontextprotocol/conformance/dist/index.js` (`setupConformance.ts:51–58`) against a real loopback Streamable HTTP server built from this package (`:1–12, 1578+`).
- Spec revision `2026-07-28` (`:58`). Identity fixture `orkestrel-conformance` (`:61–64`).
- Server baseline is **per-scenario** `passed`/`failed`, not a lone total (`conformance.test.ts:57–120, 300–302`). Client mode compared to the runner’s own `list` (`:339–342`; `CONFORMANCE_CLIENT_SCENARIOS` written down so exclusion is a decision, `:81–95`).
- `auth/*` family excluded: package publishes no OAuth client (`:72–90`).
- Tasks schema: vendored mirror digest pin before row compares (`conformance.test.ts:195–204`; scaffold `guides/mcp.md:4963–4971`).
- Runner version must match the manifest pin (`conformance.test.ts:296–297`).
- Gate: `test:conformance` is in `npm test` (`package.json:75`). Distribution is a **separate** `prepublishOnly` project (`:93`, `tests/distribution.test.ts:1–13`) packing the artifact into a throwaway consumer.

**Ollama** (`tests/conformance.test.ts:1–13`):

- Compile-time `expectTypeOf` of **this package’s send/read shapes** against official `ChatRequest` / `Message` / `ChatResponse` / `Tool` from `ollama`. Runtime `expectTypeOf` is a no-op; authoritative gate is `npm run check` (`:7–9`).
- Direction: subset we send extends official; official response extends our read type (`:15–20, 101–104`). `readonly` vs mutable arrays compared field-by-field to avoid a variance false fail (`:26–29`).
- Starts no daemon (`:3–5`). Live daemon is the `service` project (`guides/ollama.md:351`).

**LSP** (`tests/conformance.test.ts`, `tests/setupConformance.ts`):

- Authorities: vendored `metaModel.json` (digest pin, `conformance.test.ts:243–252`; refresh recipe `guides/lsp.md:306–314`) **and** installed `vscode-languageserver-protocol` types/guards.
- Isolation: `PROTOCOL_FAMILY` = `vscode-languageserver-protocol`, `vscode-languageserver-types`, `vscode-jsonrpc` (`setupConformance.ts:147–151`). `readForbiddenDependency` refuses those names in `dependencies` / `peerDependencies` / `optionalDependencies` (`:441–451`). `readForbiddenSource` walks `src/**` imports (`:559–566`). Assertions: `conformance.test.ts:224–240`.
- Pins: installed release line `3.18.x`, lockfile = installed, declared range = approved (`:266–296`).
- Structure rows cover the **subset this package speaks**, not the whole protocol (`conformance.test.ts:92–157`; `guides/lsp.md:312–314`).
- Distribution: same generated pack-and-install proof as MCP (`tests/distribution.test.ts`), on `prepublishOnly`, not on `test`.

### Negative controls and discovery

- MCP: runner `list` vs recorded client set (a scenario the runner adds fails); digest mismatch throws at load; `EXPECTED_RED` names remaining red rows (empty in the recorded file). Fixture tools exist so the **runner** can fail the **library**.
- Ollama: official field rename/remove fails the index access at `tsc` — the second mechanism is the official package, not a self-derived type.
- LSP: a protocol-family import in `src/` or a runtime dependency field fails; an unpinned metaModel byte fails before rows run; lock/installed/declared disagree fails.
- Scaffold law: `tests/conformance.test.ts` **selects** the `conformance` project (`guides/scaffold.md:618–619`; `.claude/rules/workspace.md:156–159`). Empty include is not a pass. `conformance` stays in `test`; `distribution` is pack/install and is not a substitute.

### Reusable process ideas (not domain copy)

Pin the official artifact (digest or installed version) independently of the snapshot of this package. Compare per named coordinate so a dropped scenario cannot hide in a total. Keep the official package out of published `dependencies`. Put live-runner work in `conformance` (hermetic loopback still gated by `test`) and pack-install in `distribution`. Record intentional gaps as named red rows or named exclusions (`auth/*`), not as skipped silence.

---

## Slice: Guide and skill coverage

**Read this unit**

- Scaffold: `AGENTS.md`, `.agents/orchestration.md`, named `.claude/rules/*`, `guides/README.md` (concept/directory map), `ROADMAP.md` closed journey/`@orkestrel/test` items, `guides/scaffold.md` conformance/distribution registration (`:1978–1997`), `guides/mcp.md` Declared conformance gaps (`:4932–4978`), `guides/lsp.md` Conformance (`:304–314`), `guides/ollama.md` hermetic vs service (`:351, 361`), `guides/test.md` surface for `StateTransition` / `pressKeys` / `waitForText`.
- Align-packages: `SKILL.md`, `references/integration.md`, `references/fleet.md`.
- Prove-journey: `SKILL.md` families table (`:32–45`).
- Elements `guides/README.md` concept headings: Tokens, Modifiers, Elements, Components, Surfaces, Composables, Taxonomy, Patterns, Mixins, Events, Tailwind interop, Core, Traversals, W3C corpus, Inspector (`:20–225`). `guides/styles.md` cascade/layers/file layout (`:9–80`).
- Mailbox `guides/composables.md` Factory Layer + shared infrastructure (`:79–176, 380–465`). `guides/styles.md` philosophy `1.1–1.8` (`:138–203`) and composable↔partial contract (`:586–712`).

**Unread bound (named, not absorbed)**

- Prove-journey `references/{layer,captures,styles,statechart,decide}.md` (skill requires them before journey work; this unit did not run journeys).
- Elements `guides/{tokens,elements,components,surfaces,composables,modifiers,patterns}.md` bodies; `guides/w3c/**`; `contribute.md`.
- Mailbox `guides/composables.md` Part 4 per-composable bodies after the headings; `guides/styles.md` Parts 5–8.
- MCP `guides/mcp.md` remainder beyond Declared conformance gaps.
- Live `tmp/capture` frames; gate output; npm registry.

---

## Slice: Elements visual tokens (source intent)

From `src/styles/_tokens.scss` and `src/styles/_theme.scss`. Not rendered.

**Typography.** `--set-font-size-base: 0.875rem` on `<body>` (rem stays on UA 16px) (`_tokens.scss:198`). `--set-line-height-base: 1.5` (`:199`). `--set-font-family-base: system-ui, -apple-system, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif, emoji stacks` (`:200–202`). Headings use rem in `_h1-h6.scss` (cited from token comments `:188–196`).

**Spacing.** `--set-gap: calc(var(--spacing) * 3)` (comment 0.75rem) (`:209`). `--set-stack-spacing: 1em` (`:210`). `--set-cluster-spacing: calc(var(--spacing) * 3)` (`:211`). `--set-sticky-offset: 0px` (`:219`). `--set-density-factor: 1` (`:264`); cores: eclipse `1.1`, others `1` (`themes/_eclipse.scss:15` etc.).

**Radii.** `--set-border-radius: var(--radius-md)` (`:175`). `--set-border-width: 1px` (`:176`). `--set-radius-factor: 1` (`:265`). Unlayered scale: `--radius-xs` 0.125rem … `--radius-3xl` 1.5rem, each `* var(--set-radius-factor)` (`:277–283`). Cores: honeymoon `0`, auroramoon `0.5`, eclipse `0.25`, lagunamoon `1.5`.

**Elevation.** `--set-box-shadow-small` / `--set-box-shadow` / `--set-box-shadow-large` dual-layer `color-mix` blacks (`:299–307`). Z-index: sticky 1020, fixed 1030, dropdown 1040, modal 1050, popover 1070, tooltip 1080, toast 1090 (`:239–245`). Native popovers/dialogs use top layer; these tokens remain for in-flow/fallback stacking (`:227–233`).

**Palette / theme families.** `@theme` primary pinned `oklch(48% 0.255 264)` (not a Tailwind step) (`_theme.scss:103`). Secondary `var(--color-slate-600)`, tertiary violet-600, success green-700, warning amber-700, danger red-700, information sky-700 (`:104–109`) with forced `-700` emission values (`:123–126`). Light canvas `var(--color-white)`, surface slate-50, surface-raised slate-100, text slate-900, border slate-300 (`:137–158`). Dark canvas `oklch(21% 0.013 256)`, primary lift `oklch(70% 0.15 233)` (`:288–291` / `:435–438`). Cores retune `--color-*` plus radius/density factors (`themes/_core.scss:4–10`). Mode axis is `data-mode`; name axis is `data-theme`.

**Motion.** `--set-transition-duration: 150ms` (`_tokens.scss:92`). Substantial motion `--set-motion-duration: 250ms`, `--set-motion-timing-function: cubic-bezier(0.32, 0.72, 0, 1)`, `--set-motion-slide-distance: 0.5rem` (`:148–160`). Focus ring `--set-focus-box-shadow-width: 0.1875rem`, opacity `0.45` (`:35–36`). Disabled opacity `0.5` (`:62`). Hover/active mix 88%/78%, tint 8%/14% (`:84–87`).

TS mirror of `--set-*` / `--color-*` names: `src/browser/tokens.ts:18–119`. Tailwind `--spacing` / `--radius-*` / `--color-slate-*` are **not** re-mirrored; Tailwind is the authority (`tokens.ts:9–11`).

---

## Unresolved inputs

- Official Bootstrap CSS bytes vs Veneer’s itemized tree (install of `bootstrap` was absent in the prior reading; this unit found no oracle that would use it).
- Whether `showPopover` / `<dialog>` / CSS anchor positioning fail closed in browsers that lack them (no feature-detect in source).
- Rendered Elements vs Mailbox vs Veneer vs Roughnotes (no screenshots, no browser).
- Gate results; registry versions; prove-journey reference files listed above; Mailbox Part 4 per-composable bodies; Elements token/component guide bodies.
- Whether Veneer’s `@popperjs/core` runtime dependency is reached by published CSS (declared; call-site in published `src/styles` unread this unit; showcase JS imports `bootstrap`, which typically pulls Popper).
