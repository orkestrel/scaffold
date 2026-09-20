# Test-package evidence for Veneer

Read-only absorption. No suite, build, install, or browser ran. Facts below are **declared** (manifest/types/guide), **locked**, **installed**, **source**, or **inferred**. Nothing here is an executed product proof.

---

## Versions

| Surface                                               | Version and identity                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sibling source `C:/Users/mikes/WebstormProjects/test` | **Declared** `0.0.18` (`package.json:3`). Runtime dep `@orkestrel/contract` `^0.0.17`. Peer `vitest` `^4.1.11`. Browser-mode devDeps `@vitest/browser-playwright` `^4.1.11`, `playwright` `^1.63.0`. No `ROADMAP.md`. Authority: sibling `AGENTS.md` defers to Scaffold; guide index `guides/README.md` points at `guides/test.md`. |
| Scaffold declared                                     | `@orkestrel/test` `^0.0.18` (`package.json:108`).                                                                                                                                                                                                                                                                                   |
| Scaffold locked / installed                           | `node_modules/@orkestrel/test` **0.0.18**, resolved `https://registry.npmjs.org/@orkestrel/test/-/test-0.0.18.tgz`, integrity `sha512-G2i/aAxCWgydoDhvQdv77ziU2mGAzR5XvV5skfGuH0EDZV5/e5Ze9r4iP4Es6S7CUlikTbl4eIr0QyHQ0yPrNw==` (`package-lock.json:440-444`). Consumer contract is `dist/src/{core,browser,server}/index.d.ts`.    |
| Veneer                                                | **Does not declare** `@orkestrel/test`. Local `style` / `token` / `pixels` / `findRule` in `tests/setupStyles.ts:26-66`. Local `mount` / `runScenarios` / Bootstrap `instance.show()` in `tests/setupBrowser.ts:19-115`. Duplicate `StateScenario` imported from `./setup.js` (`Modal.test.ts:4`).                                  |

Sibling source export names for the journey/statechart/style family match the installed `0.0.18` declarations. Whether the sibling working tree has unpublished edits is **unverified** (no git porcelain sampled this session). Do not treat sibling source as published until a pack/install of that tree is the consumer.

---

## Dependency direction and connection map

```text
@orkestrel/test          host-independent types, waits, table runner
        ^
        |  types + executeScenario / executeScenarios / STATECHART_* / waitFor*
        |
@orkestrel/test/browser  vitest/browser page + userEvent (throws at Node import)
        ^
        |  verbs, readers, capture, harness
        |
consumer setup + integration.test.ts
        ^
        |  inject('variant'|'variants'|'capture') from appJourney
        |
configs/app/vite.journey.config.ts  (Scaffold birth wrapper)
```

- **Runtime:** Browser Mode only. `src/browser/index.ts:6-8` imports `vitest/browser` at module scope. Core (`@orkestrel/test`) has no DOM and no provider.
- **Provider:** `page` / `userEvent` from `vitest/browser` (`helpers.ts:16`). Trusted clicks and keys go through that provider. Journey viewport for a capture is `page.viewport` inside `stagePane` (`helpers.ts:2336`). Journey **act** viewport is the Vitest project `browser.viewport` Scaffold writes in `appJourney` (`templates.ts:352-371`), not `stagePane`.
- **Fixture:** `build` / `mount` / `render` (`helpers.ts:1274+`). Workspace setup may wrap them (`test/tests/setupBrowser.ts:30` `buildFixture`). Veneer's `mount` is a local duplicate, not this package.
- **Action (person):** `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`, `typeAccessible`, `fillAccessible`, `pressKeys`, `traverseAccessible`.
- **Action (synthetic):** `createPointerEvent`, `createDragEvent`, `typeInput`, `commitInput`. Layer forbids these as the journey drive (`layer.md` What it drives).
- **Transition table:** `StateTransition` + `StateScenario` in `@orkestrel/test` (`src/core/types.ts:279-326`).
- **Expected outcome:** `assert` phase of `StateScenario`; also journey `expect` on `readPerception` / `readStates` / `readStyle` / `readRefusal`. The runner does not invent expected states.
- **Journal:** `createJournal` (`factories.ts:220`). Manual `record`. Not wired into verbs or the harness.
- **Capture:** `createPortfolio` → `place` → `captureFrame` (`factories.ts:119-157`, `helpers.ts:2463`). Independent of `executeScenario` / `createHarness`.

**Real in-repository consumers (package's own suite, not a product app):**

| Mechanism                                     | Consumer                                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Trusted click / keys                          | `tests/src/browser/helpers.test.ts:742` `clickAccessible`; `:1075` with `pressKeys` path                                              |
| Native disclosure + table                     | `tests/src/browser/factories.test.ts:1424` `executeScenarios(DISCLOSURE_SCENARIOS, buildDisclosure)`                                  |
| Harness                                       | `factories.test.ts:898` `createHarness`                                                                                               |
| Portfolio                                     | `factories.test.ts:174` `place` disabled; `:204` enabled write                                                                        |
| Style / pixels / contrast / ring / animations | `helpers.test.ts:1611` `waitForAnimations` + `readStyle` / `readPixels` / `readContrast`                                              |
| Scaffold wiring (not a journey)               | `src/core/templates.ts:847` emits `import type { JourneyVariant } from '@orkestrel/test'`; `appJourney` provide at `templates.ts:364` |

Veneer `Modal.test.ts:9-42` drives Bootstrap `instance.show()` through a local `runScenarios`. That is **not** a consumer of `@orkestrel/test`.

---

## Public signatures usable for real-input journeys and statecharts

**Barrel `@orkestrel/test` (core):** `JourneyVariant`, `StateTransition`, `StateScenario`, `StatechartStatus`, `WaitOptions`, `TextWaitOptions`, `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`, `executeScenario`, `executeScenarios`, `buildRefusal`, `waitForText`, `waitForCondition`, `waitForDelay`, `requireValue`.

**Barrel `@orkestrel/test/browser`:** everything in installed `dist/src/browser/index.d.ts`. Installed and sibling source agree on these names. There is **no** `hoverAccessible`, `dragAccessible`, `emulateMedia`, or `readStyle(element, property, pseudo)`.

### Trusted input (provider-backed)

| Export                  | Signature (source)                         | Drive                                                                  |
| ----------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| `clickAccessible`       | `(name) => Promise<void>` / `(role, name)` | `resolveRendered` then `userEvent.click` (`helpers.ts:391-394`)        |
| `clickAccessibleWithin` | `(region, role, name)`                     | region-scoped role query then `userEvent.click` (`:414-438`)           |
| `clickDisclosure`       | `(name)`                                   | native `<summary>` + `isReachable` then `userEvent.click` (`:460-473`) |
| `typeAccessible`        | `(name, text)`                             | click, select-all, `userEvent.keyboard` (`:492-496`)                   |
| `fillAccessible`        | `(name, text)`                             | `userEvent.fill` (`:515-516`)                                          |
| `pressKeys`             | `(keys)`                                   | refuses body/unfocused, then `userEvent.keyboard` (`:543-548`)         |
| `traverseAccessible`    | `(name) => Promise<HTMLElement>`           | `userEvent.tab` loop (`:563-592`)                                      |

`clickAccessible` uses `resolveRendered`, not `resolveAccessible`. Comments say a click must not fail on a target the act itself scrolls into view (`helpers.ts:271-272`). Viewport-gated resolution is `resolveAccessible` (`:352-362`).

### Synthetic / unit-test-only

| Export                      | Why it is not a journey verb                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `createPointerEvent`        | `new PointerEvent` for `dispatchEvent` (`factories.ts:44-52`)                             |
| `createDragEvent`           | `new DragEvent` + `DataTransfer` (`:81-87`)                                               |
| `typeInput` / `commitInput` | sets `.value` and dispatches a plain `Event`, never `InputEvent` (`helpers.ts:1401-1424`) |

### Passive reads (no input)

Perception: `readPerception`, `readPage`, `readFocus`, `readValue`, `readRefusal`, `readText`, `readRole`, `readName`, `readStates`, `describeTree`, `describeFocus`.

Style/geometry: `readStyle`, `readToken`, `readRootToken`, `readPixels`, `readContrast`, `readLayers`, `readBackdrop`, `readRing`, `readHit`, `isReachable`, `isRendered`, `isOutsideViewport`, `measureContent`, `readCascade`, `readClasses`, `readCensus`, `readRules`, `findRule`, `findKeyframes`, `extractStyles`, `extractOrphans`, `readRows`.

`readBackdrop` is **ancestor `background-color` compositing**, not CSS `::backdrop` (`helpers.ts:1727-1728`).

---

## Capability matrix (requested acts)

Unavailable is used only after reading the published export and implementation. Provider-only primitives are named as **provider setting**, not as package APIs.

| Need                                                 | `@orkestrel/test/browser`                                                                                                                                                                                                                                                                 | Provider (`vitest/browser` in test's `node_modules`)                                                                                                   | Notes                                                                                                                                                                                                                                                        |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hover                                                | **Unavailable** as a published verb. No `hover*` export in sibling `helpers.ts` / `factories.ts` or installed `index.d.ts`.                                                                                                                                                               | `userEvent.hover` / `unhover` declared (`context.d.ts:315-324`). Layer forbids reaching past published verbs for keys; hover has no published wrap.    | Prior plan sentence “no verified hover journey verb” is **confirmed for the package barrel**. It is **not** confirmed as “Playwright cannot hover.” Calling `userEvent.hover` from a Veneer journey is a workspace helper / layer defect, not a package API. |
| Press / release (pointer down without up; `:active`) | **Unavailable.** Clicks are full `userEvent.click`.                                                                                                                                                                                                                                       | `userEvent.click` only in the wrapped verbs. No `pointerdown`/`mouseup` split on the `UserEvent` interface read here (`context.d.ts:280-370`).         | `:active` paint is unverified without a hold-down instrument.                                                                                                                                                                                                |
| Drag                                                 | **Unavailable** as a journey verb. `createDragEvent` is constructed.                                                                                                                                                                                                                      | `userEvent.dragAndDrop` (`context.d.ts:370`). Preview provider unsupported.                                                                            | Same classification as hover: provider primitive, missing general helper.                                                                                                                                                                                    |
| Keyboard focus                                       | **Available.** `traverseAccessible`, `pressKeys`, `clickAccessible`.                                                                                                                                                                                                                      | `userEvent.tab` / `keyboard`.                                                                                                                          | `pressKeys` throws `Key sequence "<keys>" was sent with nothing focused` (`helpers.ts:543-546`).                                                                                                                                                             |
| Native state                                         | **Partial.** `readStates` reads `:disabled`, `aria-*`, native `checked`, native `<details>.open` via summary (`helpers.ts:909-942`). Drive: `clickDisclosure` for native summary; `clickAccessible` + `waitForState` for ARIA.                                                            | —                                                                                                                                                      | `:checked` / `:disabled` / `[open]` become true only after real DOM/input. No reader for `:hover` or `:active`. Native `<dialog showModal>` without `aria-modal` is **outside** `isReachable`'s modal filter (`helpers.ts:80-82`).                           |
| Pseudo-element / `::backdrop` used-style             | **Unavailable** as a published reader. `readStyle` is `getComputedStyle(element).getPropertyValue` with no pseudo argument (`helpers.ts:2158-2159`). Package source never calls `getComputedStyle(el, '::…')`.                                                                            | CSSOM `getComputedStyle(el, '::after')` is a native observation. Whether `::backdrop` is readable in Vitest's iframe is **unverified** here (not run). | `readBackdrop` must not be mistaken for `::backdrop`.                                                                                                                                                                                                        |
| Print / reduced-motion emulation                     | **Unavailable** in the package. Vitest `page` wrapper exposes `viewport`, `screenshot`, `mark` — **no** `emulateMedia` in `context.d.ts:812-835`.                                                                                                                                         | Playwright `Page.emulateMedia` exists upstream; not on this `page` façade. `cdp()` is exported (`context.d.ts:942`).                                   | Reaching CDP or an unwrapped Playwright page is a provider/workspace path, not a published helper.                                                                                                                                                           |
| Viewport variation                                   | **Available for capture** via `stagePane` / `releasePane` / `captureFrame`. **Journey act size** is Scaffold `appJourney` `browser.viewport` (`templates.ts:368`) plus `page.viewport` if a suite calls it. Guide: do not use stage/release as a journey resize (`helpers.ts:2310-2313`). | `page.viewport(width, height)` (`context.d.ts:816`).                                                                                                   | `JourneyVariant` is serializable `{ name, width, height }` (`core/types.ts:242-249`). `CaptureVariant.apply` is suite-side, synchronous, not provided over Vitest `provide`.                                                                                 |
| Theme variation                                      | **No theme API.** `CaptureVariant.apply?: () => void` (`browser/types.ts:73-78`) is a document hook (attribute/class). Skill: drive a visible theme control through journey verbs when the surface has one.                                                                               | —                                                                                                                                                      | Veneer-specific: which attribute (`data-bs-theme` vs Veneer axes) is a fixture contract.                                                                                                                                                                     |
| Animation settling                                   | **Available.** `waitForAnimations(element, options?)` parks on `animation.finished` (`helpers.ts:1200-1251`). Default budget `1000` ms.                                                                                                                                                   | —                                                                                                                                                      | **Skips** infinite iterations and non-`running` playState. Own test: `helpers.test.ts:1650` resolves while infinite spin still runs. Settled endpoints are not a motion proof.                                                                               |
| Screenshots / pixel observation                      | **Available.** `captureFrame`, `createPortfolio.place`, `readFrame`. `readFrame` returns `{ width, height, floor }` (`types.ts:55-62`) — decoded size and bottom-row single color, not a full pixel grid or EXIF.                                                                         | `page.screenshot` (`helpers.ts:2481-2484`). Path relative to the **calling test file**.                                                                | Byte readback via `commands.readFile` (`:2496`). Capture metadata is filename `state--variant.png` (`factories.ts:146`), not embedded theme/engine tags.                                                                                                     |
| Browser selection                                    | **Not a test-package API.** Test repo `configs/browsers.ts:285-310` `resolveBrowser`: `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, `PLAYWRIGHT_CHANNEL`, managed Chromium, bundled, system `chrome`/`msedge`, Windows default `msedge`.                                        | Scaffold copies this into generated workspaces. Veneer uses its own `createBrowserProvider` (`vite.config.ts:25-41`), not Scaffold's helper.           | Engine bound: one engine per gate (`styles.md` The engine bound). Chromium-only cannot close a public range.                                                                                                                                                 |
| Capture metadata                                     | Registry + variant name + directory + enabled flag. `files` = `expandCaptures`. Disabled `place` returns `undefined` and records nothing (`factories.ts:139`).                                                                                                                            | —                                                                                                                                                      | Always-on placement proof must use the suite's own set, because disabled `place` never hits the registry (`captures.md`).                                                                                                                                    |

---

## Capture versus statechart; honest failure evidence; outcome APIs

**Capture is separate from the table runner.** `executeScenario` / `executeScenarios` / `createHarness.execute` never call `place` or `captureFrame`. A consumer may call `place` inside `act`/`assert` or after a journey assertion. `decide.md` The harness run tells a decision round to place frames **inside** a harness run; that is composition, not a package coupling.

**Failed / refused transitions:**

| Runner                                    | On failure                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `executeScenarios`                        | Stops at the first throw. Message `"<name>: <phase message>"` with `cause` (`core/helpers.ts:642-654`, `:682-694`). Later rows never start. No capture unless the consumer already placed.                                                                                                                                                    |
| `createHarness.execute`                   | Continues past a failing row. Writes `data-statechart-result="failed"`, names the row in `failures`, terminal `status` `passed` \| `failed` (`factories.ts:492-529`). A `state` reader throw writes `failed` then **rejects**; that row is not counted failed (`types.ts:366-369`). Markup + announcer remain. Still no automatic screenshot. |
| Enabled `place` after a throwing `assert` | Never reached if the test aborts first. A failed transition can emit harness markup evidence without a PNG.                                                                                                                                                                                                                                   |

**APIs that check outcomes (throw / refuse) rather than merely record:**

- Resolver voices and `readRefusal` (`helpers.ts:748+`)
- `pressKeys` unfocused
- `waitForState` / `waitForText` / `waitForAnimations` exhaustion
- `executeScenario` `assert` phase
- `captureFrame` path mismatch and byte mismatch (`helpers.ts:2491-2497`); unsettled height (`:2470-2473`)
- `createPortfolio` unregistered variant/state / duplicate place
- `buildContrast` cannot straddle (`helpers.ts:2650`)
- `readCensus` empty walk
- `readContrast` missing foreground or (without `floor`) no opaque layer (`:1768-1778`)
- `readRing` returns `undefined` (not a throw) for no `:focus-visible`, UA `outline-style: auto`, or fill-only focus (`:1824-1841`) — treat `undefined` as unmeasured, not a pass (`styles.md`)

**APIs that record without judging:** `createJournal.record`, `describeTree`, `describeFocus`, `readRules` / `findRule` (discovery).

---

## Token / style / geometry semantics and limits

| API                           | Success                                                                                                                                 | Absence / failure                                                                               | Limit                                                                                                                                                                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `readToken` / `readRootToken` | Trimmed custom-property string; dashes optional (`helpers.ts:2186-2208`)                                                                | Absent and declared-empty are `''`. Unmounted inherits nothing → `''`.                          | Not used-value. `var()` to undeclared computes inherited color via `parseCSSColor` (`:1543-1545`).                                                                                                                                                                          |
| `readStyle`                   | Trimmed `getPropertyValue` (`:2158`)                                                                                                    | `''` when unresolved.                                                                           | Element only. No pseudo. CSSOM resolved value, not used/painted.                                                                                                                                                                                                            |
| `readPixels`                  | `Number.parseFloat` of that string (`:2234-2236`)                                                                                       | Non-finite → **`0`**. `'auto'` / `'none'` / `''` all contribute 0.                              | Unit not checked. Pair with `readStyle` when 0 vs invalid matters (guide + `styles.md`). Veneer local `pixels` uses NaN instead (`setupStyles.ts:32-35`) — different sentinel; do not copy it.                                                                              |
| `parseColor`                  | `rgb()` / `rgba()` / `color(srgb …)` (`:1499-1520`)                                                                                     | `undefined` for keywords/hex/`oklch`                                                            | Text-only half.                                                                                                                                                                                                                                                             |
| `parseCSSColor`               | Mounts a probe, assigns `style.color`, reads computed (`:1553-1561`)                                                                    | CSSOM-refused → `undefined`. Missing `var()` is **not** refused.                                | Probe removed in `finally`.                                                                                                                                                                                                                                                 |
| `matchesColor`                | Channel tolerance 0.5 (`:1589-1601`)                                                                                                    | Unreadable side → `false`, no throw                                                             |                                                                                                                                                                                                                                                                             |
| `readContrast`                | WCAG ratio after compositing ancestor `background-color` (`:1768`)                                                                      | Throws `Computed foreground color is unavailable` or `Computed background color is unavailable` | **Unsupported paint:** images, gradients, masks, mix-blend, filters, `::backdrop` overlay are outside `readLayers` (only non-zero `backgroundColor`; skip alpha 0; stop at opaque). If those matter, obligation stays open unless `readFrame` / another paint path is used. |
| `readRing`                    | Max contrast of outline color or first box-shadow color vs parent backdrop                                                              | `undefined` cases above                                                                         | Requires real `:focus-visible`.                                                                                                                                                                                                                                             |
| `readHit`                     | `elementFromPoint` at bounding-box centre (`:215-221`)                                                                                  | `undefined` if outside viewport or nothing hit                                                  | `pointer-events: none` cover is invisible to the hit test. Shadow retargets to host. Playwright click point can differ (first content quad) (`:174-179`).                                                                                                                   |
| `isReachable`                 | connected, `checkVisibility`, non-zero box, `tabIndex >= 0`, not disabled, no `[inert]`, inside shown `[aria-modal="true"]` (`:96-116`) | `false`                                                                                         | Does **not** ask viewport. Native modal `<dialog>` without `aria-modal` leaves background reachable here.                                                                                                                                                                   |
| `findRule`                    | First `CSSStyleRule` whose `selectorText` **includes** the fragment (`:2014-2018`)                                                      | `undefined`                                                                                     | Discovery. `.card` matches `.card:hover`. Cross-origin sheets skipped in `readRules` (`:1976-1983`).                                                                                                                                                                        |
| `waitForAnimations`           | Returns when no finite running animation remains                                                                                        | Throws if detached or budget exceeded                                                           | Infinite CSS animations ignored (`helpers.test.ts:1650`).                                                                                                                                                                                                                   |

**Published instrument controls** (append, read, remove): `buildContrast`, `buildEscapes`, `buildCensus` (`styles.md` The published controls).

**Guide parity / artifact readers:** `describeTree` / `describeFocus` / journal `steps`+`output` / capture filenames compose the decide artifact (`decide.md`). `prove` cannot judge a browser project (`decide.md` The limit). Installed `@orkestrel/probe` in the **test** repo is `^0.0.16`; Scaffold's probe pin was not re-read this pass.

**Package/consumer helpers not to copy as a Veneer runtime:** `build`/`mount`/`render`, `createStorage`, `clearStorage`, `createTeardown`, `createRecorder`. Development-only.

---

## Sibling source vs lock vs Scaffold-installed

- **Declared / locked / installed in Scaffold:** `0.0.18` tarball above. Public barrels: `.` core, `./browser`, `./server`.
- **Sibling source:** same version string and the same export set for this family. Installed consumers cannot import sibling `src/`.
- **Guide vs barrel:** `guides/test.md` documents `hover` only as a `findRule` substring example (`:518` / `:2955`), not as a verb. A guide that names a capability is not availability. Availability is the barrel.
- **Elements/mailbox** (prior report): they do not import this package; local readers remain. That is unchanged.

---

## Gap classification (not design)

| Kind                                 | What it is                                                                                                                                                                                                                                               |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Package defect**                   | None claimed from this read. Infinite-animation skip and `readPixels`→0 are documented contracts, not silent bugs.                                                                                                                                       |
| **Missing general helper**           | Journey-shaped hover; journey-shaped drag; pointer press/release for `:active`; media emulation for print / `prefers-reduced-motion`; `readStyle` with a pseudo subject; `::backdrop` used-style reader. Provider already has `hover` and `dragAndDrop`. |
| **Provider setting**                 | `userEvent.hover` / `dragAndDrop`; `page.viewport`; `PLAYWRIGHT_EXECUTABLE_PATH` / `CHANNEL` / `WS_ENDPOINT`; Vitest `instances: [{ browser: 'chromium' }]`; optional `cdp()`.                                                                           |
| **Veneer-specific fixture contract** | Specimen markup; which theme attribute; token override host vs neighbor; packing without runtime packages; replacing local `runScenarios` + Bootstrap `show()` with journey `act`; isolated official JS oracle.                                          |

The prior report's “geometry and contrast unpublished in Veneer” stands: Veneer still uses local `style`/`pixels`. The prior “no hover verb on the inspected test surface” stands **for the package**. It understated the provider `userEvent.hover` declaration.

---

## Narrowest existing composition paths (evidence only)

**Foundation browser pilot** — compose what already exists; no new API:

1. Add `@orkestrel/test` `^0.0.18` as a Veneer **devDependency** (absent today).
2. Adopt Scaffold journey axis: `configs/app/vite.journey.config.ts` (`templates.ts:847-861`) + `appJourney` provide (`:364`) + `tests/app/browser/integration.test.ts`.
3. Resolve the executable the way Scaffold `resolveBrowser` / Veneer `createBrowserProvider` already do (this host previously needed Edge; not re-run here).
4. Drive with `clickAccessible` / `pressKeys` / `traverseAccessible`. Read with `readStyle` + `readPixels` (pair them), `readToken` for custom properties, `readContrast` / `readHit` / `readRing` after real focus. Settle with `waitForAnimations`. Place with `createPortfolio` after the assertion. Bind `buildContrast` in the same run.
5. Theme: visible control if one exists; otherwise synchronous `CaptureVariant.apply` setting the attribute the CSS actually reads.
6. Hover / print / reduced-motion / `::backdrop` **cannot close** on this path until a published helper or an accepted native CSSOM observation is in the unit's contract.

**Complete Button unit** — same door, plus:

- Table typed on Button's real states/events, `act` through `clickAccessible` / `pressKeys`, `assert` through `readStates` / `readPerception` / used-property `readStyle`, run with `executeScenarios` and the same table in `createHarness`.
- Disabled: real `disabled` / `aria-disabled` and `readRefusal` exact voice, not a class imitation.
- Toggle: `waitForState(..., 'pressed=true')`.
- Hover/active/print/reduced-motion remain the missing-helper rows unless the unit scopes them out or a test-package helper lands first.

Veneer's current `runScenarios` + `instance.show()` (`setupBrowser.ts:78-115`, `Modal.test.ts:9-18`) is the **anti-path**: it proves the Bootstrap runtime API, not the interface.

---

## Unresolved questions and the smallest experiment that would settle each

No product proof ran. Each experiment is named so a later lane can execute it.

| Open question                                                                                                                | Why it is open                                                                                                   | Settle by                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does `userEvent.hover(resolveRendered(name))` in Vitest Playwright actually match `:hover` used-style on this host's engine? | Provider declares hover; package does not wrap it; CSS `:hover` matching under Playwright is historically flaky. | One browser-mode probe: mount a rule `.x:hover { padding: 32px }`, `userEvent.hover` the button, `readPixels` padding; control: no hover keeps 16px. Record engine from `configs/browsers.ts` resolution. |
| Can `getComputedStyle(el, '::before' \| '::after' \| '::backdrop')` return used values inside the Vitest tester iframe?      | Package does not wrap it; Elements historically commented backdrop unreadability.                                | Same probe: `::after` content/mask; open `<dialog>`/`modal` and read `::backdrop`. Negative: host `background-color` unchanged while overlay paints.                                                      |
| Does Playwright reduced-motion / print reach the tester document without `emulateMedia` on Vitest `page`?                    | `page` façade has no `emulateMedia`. `cdp()` exists.                                                             | Probe `cdp()` `Emulation.setEmulatedMedia` vs a `@media (prefers-reduced-motion: reduce)` / `@media print` used-property. If CDP is required, that is a provider path, not a package helper.              |
| Pointer `:active` without a published press/release verb                                                                     | `userEvent.click` completes the gesture.                                                                         | Probe Playwright `locator`/`cdp` mouse down, read used-style, mouse up. If no trusted hold exists, `:active` stays a missing helper.                                                                      |
| Sibling source vs published tarball byte identity                                                                            | Version strings match; no dist↔src diff and no git porcelain this session.                                       | `git status` / `git describe` in the test repo; `diff` installed `index.d.ts` against sibling built `dist` if a local build exists.                                                                       |
| Veneer + installed `0.0.18` typecheck of a journey import                                                                    | Veneer has no dependency.                                                                                        | After a deliberate install (out of this unit): `tsc` of one file importing `clickAccessible` from `@orkestrel/test/browser` in Veneer's browser test project.                                             |
| `prove` vs Veneer browser projects                                                                                           | Skill limit belongs to installed probe. Scaffold/Veneer probe versions not re-read.                              | Read each workspace's `@orkestrel/probe` guide + runtime pool pin; quote the receipt/no-receipt line.                                                                                                     |

---

## Evidence limits

- No tests, builds, servers, or browsers executed.
- External Playwright/Vitest hover reliability pages not fetched.
- Neighbor git status not sampled.
- Veneer component CSS partials and official Bootstrap oracle pages not re-absorbed (out of this brief's deepen-the-test-package scope).
- `userEvent.hover` **behavior** is declaration-only until a browser probe runs.
