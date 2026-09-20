<!-- planner on native Opus 5, Agent dispatch; U7 design round, SUBJECTIVE lane; the harness wrote no transcript file for this agent, so the answer is retained from its returned message verbatim; retained 2026-09-20 -->

## Lane

I held the **subjective** lane (shape, naming, ergonomics, the API a consumer meets, placement). The objective lane ran on another engine and I did not see it.

# Rulings

## 1. The engine's contract

**Ruling.** `src/browser/Button.ts` is one class over one host, with no listener of its own.

```ts
// src/browser/types.ts
export interface ButtonDetail { readonly pressed: boolean }
export interface ButtonEventMap { readonly toggle: CustomEvent<ButtonDetail> }
export interface ButtonHooks { readonly toggle?: (event: CustomEvent<ButtonDetail>) => void }
export interface ButtonOptions { readonly on?: ButtonHooks }
export interface ButtonInterface {
	readonly host: HTMLElement
	readonly pressed: boolean
	toggle(): boolean
	destroy(): void
}
```

- `pressed` derives from the host's `active` class, read live in the getter, the way `ColorMode.mode` reads its attribute. `aria-pressed` is an output written from the class, never a second source (`AGENTS.md` § Design laws, "Derive state"; the official source flips the class and writes the attribute from the toggled result; the landed oracle predicate asserts that relation).
- `toggle()` writes the class first, then the attribute, and returns the new state (mirrors `ColorMode.toggle()`). No disabled guard: refusal is carried by the CSS (`pointer-events: none`) and the host's own `disabled`.
- `destroy()` restores what the constructor found: `active` membership and `aria-pressed` restored to its initial `getAttribute` result (including removal); two `#` fields hold the readings, `null` admitted because `getAttribute` is an external format. A departure from the official `dispose()`, recorded in § Departures from Bootstrap.
- One event, `toggle`, dispatched after the write, `bubbles: true`, `cancelable: false`, detail `{ pressed }`; wire type `toggle.vn.button` held by `BUTTON_TOGGLE` in `constants.ts`. The official Button dispatches nothing, so no `*.bs.*` type may be claimed.
- Dispatch and binding through `src/browser/helpers.ts`: `emitEvent(host, type, detail)` and `bindEventMap(host, hooks, signal)` with an `AbortSignal` so `destroy()` releases listeners (`patterns.md` DOM variant).
- `ButtonOptions` carries only `on`; the host is a required positional first parameter.

Alternatives refused: a cancelable `toggle` before the write plus `toggled` after (a veto with no consumer; earns its place at Collapse); deriving `pressed` from `aria-pressed` (markup with `class="btn active"` and no attribute would read as released).

## 2. Option validation

**Ruling.** `@orkestrel/contract` stays a devDependency; U7 declares no runtime dependency. Button's options are a typed literal; the untrusted input is the host (`instanceof HTMLElement`); a needed predicate goes in `validators.ts` beside `isColorModeState`. The first real consumer of a contract-backed parser is `data-bs-config` merging, which arrives with the first component that declares options. Cost of the alternative: every consumer installs a second package to validate a record with one optional member, and the runtime closure stops being empty at the first component rather than at the first that needs it; reversing later is breaking, adding later is not.

## 3. The factory

**Ruling.** No `createButton`, no `factories.ts`; consumers write `new Button(host)` (the wrapper test; the U1-conform precedent).

## 4. The compatibility boundary

**Ruling.** `./browser/auto` is a published runtime entry that installs the data API and exports nothing. The Bootstrap-spelled method set does not ship in U7.

- Module `src/browser/auto.ts`, two statements: import `Delegate`, construct one on the document. The runtime-entry clause of `architecture.md` describes this shape but enumerates three fixed names; U7 needs that enumeration extended to `src/<environment>/auto.ts` in scaffold's canon before it implements; the vendored propagation rides the next scaffold release.
- The delegation is a class: `src/browser/Delegate.ts`, `constructor(options?: DelegateOptions)` with `root` defaulting to `document`, readonly `root`, `destroy()`; one listener through an `AbortController`; `closest('[data-bs-toggle="button"]')`; `preventDefault()`; one engine per host through a `WeakMap` private to the instance; exported from `src/browser/index.ts`, so `./browser` stays listener-free on import and a consumer can delegate on a subtree.
- Manifest: `exports["./browser/auto"]` with `types` and `default`; `sideEffects` gains the built path beside `**/*.css`. A second build needs a package-owned wrapper, `configs/src/vite.auto.config.ts`, emitting `dist/src/browser/auto.js` with `emptyOutDir` off, chained as `build:src:auto` after `build:src:browser`. `./browser/auto` ships a declaration (the distribution walk asserts `undeclared` empty).
- The method spellings are recorded, not shipped: `getInstance` breaks the accessor rule (`names.md`, no `get*`), `dispose` is a synonym for `destroy`; the wire-body exemption reaches transliterated fields, not a foreign class's method set. § Compatibility records each spelling with Veneer's equivalent.
- Test files: `tests/src/browser/Delegate.test.ts` (the delegated click from a child element, reuse, removal), `tests/src/browser/auto.test.ts` (importing the entry registers exactly one document listener).

Alternatives: a `ButtonAdapter` class carrying the four spellings (needs a second rule exemption against two naming rules and gives the auto entry an export surface owing parity rows); deferring `./browser/auto` (Button would ship without its most visible compatibility promise).

## 5. The CSS

**Ruling on scope.** A subset ships and the rest is deferred on the record. The inventory's `btn` key spans Button, Close button, Button group, Button toolbar, Badge, Placeholders, Input group, and the overlay headers; the ledger assigns `btn-close`, `btn-group`, `btn-toolbar` to Passive. Shipping the key whole drags six components into U7.

**Ruling on the check.** The presence proof keys off rows, not component-wide aggregation: each component gets a `selector`-kind row and a `variable`-kind row, each `shipped` obliging the official selector set and custom-property set; `listed` becomes `['btn']`. The cross-cutting engine rows move off component `btn` to component `engine`. A deferral table `### Deferred selectors` lands under § Styles listing each official selector or custom property Button does not ship with its owning unit; a new reader asserts every deferred name is a member of the official set, the shipped set less the deferred set is present in the built cascade, and no deferred name is present. Deferred groups: `.btn-close` family and `--bs-btn-close-*` (Passive); the overlay-header `.btn-close` rules (Overlays); `.btn-group*`, `.btn-toolbar`, `.dropdown-toggle-split` (Passive, Disclosure); `.input-group*` (Forms); `.btn .badge` (Passive); `.placeholder.btn::before` (Passive). `.btn-group-lg > .btn` and `.btn-group-sm > .btn` ship as comma-mates of the size blocks.

**Ruling on the partials.** `elements/_button.scss` in `@layer elements`, single-tag selectors only, the bare-button calibration row; `components/_button.scss` in `@layer components`; every declaration logical; each official selector literal in the built cascade (comma lists fine; no `:is()` consolidation).

**Ruling on the variant loop.** Elements' way: `@each $role in tokens.$roles`; the mix direction is theme-dependent, so `--vn-state-mixer` (black end in light, white end in dark) with `--vn-state-hover` and `--vn-state-active` percentages enter the `$light`/`$dark` maps and the theme closure; one mode-free expression per state; percentages from the run-6 measured strings, proved on both receipts, departures recorded where a string cannot be reproduced.

**Ruling on the bindings.** Every `--bs-btn-*` name less the close family declared on `.btn`: padding to `--vn-space-6`/`--vn-space-3`; font to `--vn-font-sans`, `--vn-size-2`, `--vn-weight-body`, `--vn-line-body`; color to `--vn-text-body-base`, bg and border-color `transparent`; border-width `--vn-border-width`, radius `--vn-radius-base`; box-shadow and active-shadow `none`; focus-box-shadow `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`; focus-shadow-rgb `--vn-color-primary-rgb`; hover/active color `--vn-text-body-base`; hover/active bg the state mix over transparent; hover/active border transparent; disabled color/bg/border the resting values; disabled-opacity Bootstrap's own value retained and recorded. Filled roles take `--vn-color-{role}-base` fill and border with white text; outline roles the role colour for text and border over transparent, filled on hover; `.btn-link` the link tokens. `.btn-tertiary` and `.btn-outline-tertiary` ship as Veneer additions with departure rows and specimens.

## 6. The journeys and captures

**Shell.** A `sections/` family opens: `app/browser/sections/ButtonSection.ts`, `SectionInterface { readonly host; destroy() }` in `app/browser/types.ts`, `Showcase` holds `readonly #sections` and destroys them in order. The section renders the oracle's own markup with the oracle's accessible names beside the variant grid; `data-bs-toggle` specimens are driven by the auto entry, every other specimen gets `new Button(host)`; no host carries both.

**Oracle comparison.** The journey compares a shared projection (ordered classes, `aria-pressed`, ordered attribute mutations, click cancellation, focused name, refusal), not `identity` or `events`; the projection helper lives in `tests/setup.ts`.

**Journeys.** Click and keyboard through the rendered surface with `waitForState`; disabled refusal through `readRefusal` on the native `disabled` button and the `aria-disabled` anchor, asserted against the exact sentence read from the installed module; ring through `readRing` after `traverseAccessible`; contrast per variant and state through `readContrast` with `buildContrast`; hover through `hoverAccessible`, active through `holdAccessible`/`releasePointer`; reduced motion through `stageMedia`/`releaseMedia`; the delegated click on a child element. No statechart table.

**Captures.** Theme is a variant; states are rest, pressed, disabled, outline, focus, hover, active, each placed from the journey that reaches it; `PLACED` equals `STATES`.

**Bound 13.** Keep the mounting constructor and the `void` in the entry: a constructed showcase is a mounted showcase; `ColorMode`'s constructor already acts; a `mount()` adds a second lifecycle verb and an unmounted state `destroy()` must tolerate.

## 7. Distribution and the guide

The generic distribution walk already covers `./browser/auto`; U7 adds one Veneer case: a page linking the packed `./styles`, importing `./browser` and `./browser/auto`, rendering a `.btn.btn-primary` with `data-bs-toggle="button"`, clicking it, reading `active`, `aria-pressed`, and one resolved paint value (catches a dropped side-effect import). The guide, section by section: § Surface, § Methods, § Examples, § Styles (partials and `### Deferred selectors`), § Tokens (bindings, state-mixer tokens, retained values), § Compatibility (rows flipped, engine rows to `engine`, the data-API row), § Departures (restoring `destroy()`, the method-spelling mapping, tertiary), § Showcase, § Tests. The `focus-ring` mixin earns its place (two callers).

## 8. Unit decomposition

A serial chain: **U7-rule** (`builder`, scaffold: the runtime-entry clause names `src/<environment>/auto.ts`), **U7a CSS** (`sol`), **U7b engine, delegation, and the published entry** (`sol`, after U7-rule and U7a), **U7c shell, journeys, captures** (`opus`), **U7d conformance contract** (`sol`: row-keyed selection and `readDeferrals` with planted controls), **U7e guide** (`opus`); one audit round per unit with the lanes swapped by writer, `checker` where mechanical, one `verifier` over the chain.

# Tensions

1. Engine rows move to component `engine`. 2. Row-keyed shipped status adds a kind. 3. The deferral table sits under § Styles. 4. No runtime dependency on `@orkestrel/contract`, against the plan's stated intent. 5. No shipped method adapter. 6. `Delegate` as the name. 7. `toggle()` returns the new state. 8. The `WeakMap` on `Delegate`. 9. `.btn-tertiary` ships. 10. `.btn-group-lg > .btn` and `-sm` ship. 11. The mounting constructor stays. 12. State-mixer tokens enter the theme closure U3 authored.

# Risks

The presence check has never fired (settle with a planted shipped row first); tree-shaking can disarm the auto entry (the bundled distribution case is the only proof); the second browser build may collide with the first (`emptyOutDir`, script order); `declarationRollup` may not produce a declaration for an export-free entry; the disabled refusal sentence must be read from the installed module and asserted exactly; the hover and active tints may not reproduce from a token (decide from the run-6 strings first); the elements-layer button rule restyles the shell's own control and its captures; the auto entry's bundle grows with every engine; the scaffold amendment propagates only with a release.
