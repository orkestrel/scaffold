<!-- codex exec, gpt-6-astra, read-only -C WebstormProjects; U7 design round, OBJECTIVE lane; journal u7-design-analyst.jsonl (ephemeral); thread 01a0c0be-0b6d-7581-bd7c-a7321697a382; exit 0; retained 2026-09-20 -->

These are proposed rulings, not acceptance.

**The engine’s contract**

Recommend `src/browser/Button.ts`, with authoritative contracts in `src/browser/types.ts`:

```ts
interface ButtonOptions {
	readonly host: HTMLButtonElement | HTMLAnchorElement
	readonly on?: ButtonHooks
}

interface ButtonInterface {
	readonly host: HTMLButtonElement | HTMLAnchorElement
	readonly pressed: boolean
	toggle(): void
	destroy(): void
}
```

`ButtonHooks` exposes the optional, single-word `toggle` hook. Its argument is a typed `CustomEvent` carrying a readonly `{ pressed: boolean }` detail. Define the event map and detail in `types.ts`; bind hooks through `bindEventMap`, and dispatch and subscribe through the shared DOM helpers required by the plan.

Recommend these semantics:

- `pressed` reads `host.classList.contains('active')` on every access. The class is authoritative; `aria-pressed` is its accessibility projection.
- Construction validates, snapshots the state it may restore, and binds supplied hooks. It does not normalize attributes. The oracle’s initial Toggle has no `aria-pressed`.
- `toggle()` calls `classList.toggle('active')`, then writes `aria-pressed` from that returned boolean, then dispatches `toggle.vn.button`.
- The event bubbles and is **not cancelable**. It reports a completed synchronous operation. Returning `false` or calling `preventDefault()` cannot undo the operation.
- Preserve Bootstrap’s programmatic behavior: an active instance’s `toggle()` has no disabled-state or animation guard. Interaction boundaries refuse disabled activation.
- `destroy()` removes owned subscriptions and restores original `aria-pressed` presence/value and original `active` membership. Preserve unrelated classes and attributes added by the consumer. Do not restore the entire old `class` string.
- Destruction is idempotent. Later `toggle()` calls do nothing. The getter continues to describe the host.
- Reject simultaneous direct ownership of the same host; release that ownership on destruction. Reconstructing after destruction succeeds. The adapter provides its own reuse boundary. Mixing direct and adapter ownership of one host is unsupported and must fail clearly.
- The engine owns no document click listener and does not independently duplicate the shell’s or adapter’s activation listener.

Test contradictory initial class/ARIA values, external class edits, absent attributes, detached hosts, concurrent distinct hosts, repeated construction, reentrant destruction from a toggle listener, and preservation of unrelated consumer edits.

**Alternatives and costs.** An internal pressed field duplicates mutable DOM state. Deriving from ARIA contradicts Bootstrap’s operation when markup disagrees. Requiring class and ARIA agreement needs an additional normalization policy and changes the initial oracle reading. A cancelable event before mutation offers veto semantics, but creates a new transition protocol and reentrancy obligations that Button does not need.

**Deciding evidence:** `AGENTS.md`’s derived-state law; `patterns.md`’s DOM event variant; installed Bootstrap `js/src/button.js`; `tests/fixtures/oracle/button.json`. The fixture records ordered `class`, then `aria-pressed` mutations and no custom Button lifecycle event. `toggle.vn.button` is a documented Veneer addition, never a claimed Bootstrap event.

**Option validation**

Recommend moving `@orkestrel/contract` from development-only use to `dependencies`, as the U7 plan proposes. Use its installed primitive guards where their semantics match, and retain the actual DOM-host invariant in `validators.ts`.

The installed surface supports primitive guards, `objectOf`, optional guards, and `instanceOf`. `objectOf` admits unknown members and handles hostile member reads. `isRecord` specifically excludes class instances, so it must not be used casually as a synonym for “options object.” A host guard must recognize actual supported DOM hosts, including the documented realm policy.

Read option members into an owned snapshot and validate the values used for construction. Do not validate one getter result and later use a different result. Invalid options fail before mutation or listener registration.

Do **not** introduce `createContract` merely to validate this shape. Its installed contract eagerly produces schema, parser, auditor, reporter, and generator capabilities. DOM elements and callbacks supply no serialization/generation requirement that earns that machinery.

**Alternatives and costs.** A small handwritten domain predicate avoids a runtime dependency and is defensible if the orchestrator changes the plan. It still must be total under hostile input and must not duplicate installed generic primitives. The dependency adds consumer installation and distribution-closure obligations, although the installed Contract package declares no runtime dependency of its own.

**Deciding evidence:** `patterns.md`’s capability-reuse and small-contract rules; `package.json`; installed Contract declarations and manifest; plan § U7.

**The factory**

Recommend deleting `createButton` from the proposed implementation, exports, examples, and guide.

`new Button({ host, on })` already establishes the construction boundary. A factory returning that expression adds nothing.

**Alternative and cost.** A factory could survive if it owned registration, host creation, or another actual lifecycle. Introducing those responsibilities solely to preserve the factory expands the API without a consumer. Instance reuse belongs to the compatibility adapter’s `getOrCreateInstance`.

**Deciding evidence:** `architecture.md`’s wrapper test, the brief’s standing factory ruling, and the U1-conform cleanup precedent.

**The compatibility boundary**

Recommend a narrowly sanctioned subpath module:

| File | Responsibility |
|---|---|
| `src/browser/auto/index.ts` | Star-export barrel for the compatibility surface and its activation entry |
| `src/browser/auto/main.ts` | Imports the adapter and invokes its registration; declares no module-scope data or functions |
| `src/browser/auto/ButtonAdapter.ts` | Compatibility identity, instance registry, delegated activation, and disposal |
| `src/browser/auto/types.ts` | Adapter contracts |
| `src/browser/auto/constants.ts` | Selector and compatibility identity constants |

The barrel can star-export `main.ts`; that module exports no names but activates the module graph. The pure `src/browser/index.ts` must never export or import this auto entry.

This placement requires a **scaffold rule change before implementation**. The current rules admit neither this subpath runtime entry nor an `auto` folder by inference. Sanction the explicit entry layout and its activation relationship while retaining the ordinary star-only barrel and centralized-file rules. Record the external-method naming exception at this boundary; the wire-body exemption does not already authorize those methods.

Expose `ButtonAdapter`, with Bootstrap’s `getInstance`, `getOrCreateInstance`, `toggle`, and `dispose` spellings. Keep them off `Button`. Retain the applicable Bootstrap identity values as compatibility metadata; do not imply that Veneer’s package version is Bootstrap’s version.

Use a private `WeakMap` keyed by the resolved host. A registry entry owns its engine; repeated `getOrCreateInstance` returns the same adapter. `dispose()` calls the engine’s `destroy()` and removes the mapping. A subsequent lookup/create obtains a fresh instance. Attribute restoration is an explicit departure from Bootstrap disposal.

Registration should:

- Install a single native `click` delegate per document, immediately; delegation needs no DOM-ready scan.
- Resolve an element target and then `closest('[data-bs-toggle="button"]')`; validate the resulting host.
- Call `preventDefault()` for a recognized button action.
- Refuse disabled user activation, including native disabled state, `.disabled`, and `aria-disabled="true"`.
- Obtain the adapter and call `toggle()` exactly once.
- Retain its removal mechanism. Recommend static single-word `start(document)` and `destroy()` operations for registration and removal; removing delegation does not silently dispose adapters consumers still hold.

Bootstrap’s namespaced registration string is not a native DOM event type. Listen to `click`, not `click.bs.button.data-api`.

Keep native button keyboard activation native. Enabled anchors need their consumer-authored `role="button"` and valid focusability. Enter follows native anchor activation. If Space activation is included, implement it explicitly at the interaction boundary, with keydown scroll prevention and keyup activation, and record it as a Veneer addition. Do not toggle on native button key events as well as their generated clicks.

Prove child-element delegation in **`tests/src/browser/auto/integration.test.ts`**, including dynamically inserted hosts, cancellation, reuse, listener removal, disabled refusal, disposal, and recreation.

Publish `./browser/auto` with declaration and JavaScript targets, and mark its emitted activation entry as side-effectful. A manifest edit alone is insufficient: the current browser build has a single entry, and `declarationRollup` rejects a multi-entry configuration. Prefer a separate auto build wrapper producing `dist/src/browser/auto/index.js` and `index.d.ts`, reusing the installed single-entry mechanism. Its relationship to the pure engine must be explicit and tested.

**Alternatives and costs.** A flat `auto.ts` is shorter but needs exceptions for runtime placement and any re-exports. A registration-only function preserves pure imports but does not meet the explicit side-effect-entry contract. Per-host listeners simplify local ownership but fail the delegated data-API requirement.

**Deciding evidence:** `architecture.md`, `names.md`, plan § Build this product, installed Bootstrap source, `package.json`, `configs/src/vite.browser.config.ts`, and `configs/helpers.ts`.

**The CSS**

Recommend the required split:

- `elements/_button.scss`, in `elements`: bare button appearance and same-element states.
- `components/_button.scss`, in `components`: Bootstrap class vocabulary and its state relationships.
- `index.scss`: loads those output partials.
- `_mixins.scss`: shared button treatment only where the element and component partials actually repeat it, including transition and focus treatment.

The bare default should reproduce the calibrated 14px/21px type, 6px block padding, 12px inline padding, borderless neutral surface, and 6px radius. `.btn` supplies the class-controlled treatment on native and anchor hosts. Include every standalone filled and outline variant: primary, secondary, success, info, warning, danger, light, and dark. Include tertiary as a documented Veneer addition if retained in the frozen scope.

Use Elements’ runtime tint mechanism:

```css
color-mix(in srgb, var(--vn-button-fill) 88%, var(--vn-text-strong))
color-mix(in srgb, var(--vn-button-fill) 78%, var(--vn-text-strong))
```

Add the strong-text token with Elements’ light endpoint and white dark endpoint. Existing `--vn-text-emphasis-base` is black in light mode and is not that calibrated endpoint. The percentages and strong-text mixing are visible in Elements’ source; compare the result to the recorded browser readings before claiming calibration. Derive on the component so local fill overrides affect its states.

Recommend this binding contract. A suffix in the left column follows `--bs-btn-`. Button-specific `--vn-button-*` values are component-scoped defaults; global scales and theme values remain centralized.

| Compatible suffix | Canonical binding or derivation |
|---|---|
| `padding-x` | `--vn-button-padding-inline` → `--vn-space-6` |
| `padding-y` | `--vn-button-padding-block` → `--vn-space-3` |
| `font-family` | `--vn-font-sans` |
| `font-size` | `--vn-button-size` → `--vn-size-2` |
| `font-weight` | `--vn-weight-body` |
| `line-height` | `--vn-line-body` |
| `color` | `--vn-button-color` |
| `bg` | `--vn-button-fill` |
| `border-width` | `--vn-border-width` |
| `border-color` | `--vn-button-border` |
| `border-radius` | `--vn-button-radius` → `--vn-radius-base` |
| `hover-color` | `--vn-button-hover-color` |
| `hover-bg` | `--vn-button-hover-fill`, derived by the hover mix |
| `hover-border-color` | `--vn-button-hover-border` |
| `active-color` | `--vn-button-active-color` |
| `active-bg` | `--vn-button-active-fill`, derived by the active mix |
| `active-border-color` | `--vn-button-active-border` |
| `disabled-color` | `--vn-button-disabled-color` |
| `disabled-bg` | `--vn-button-disabled-fill` |
| `disabled-border-color` | `--vn-button-disabled-border` |
| `disabled-opacity` | `--vn-button-opacity`; propose `0.5`, subject to rendered calibration |
| `box-shadow` | `--vn-button-shadow`, default `none` |
| `active-shadow` | `--vn-button-active-shadow`, default `none` |
| `focus-shadow-rgb` | `--vn-color-primary-rgb` by default |
| `focus-box-shadow` | `--vn-button-focus-shadow`, using `--vn-focus-width`, `--vn-focus-opacity`, and the compatible focus-channel override |

Filled variants bind fill/border to `--vn-color-{role}-base`; disabled colors retain the resting palette. Outline variants use a transparent resting fill and the role’s border/text, then a filled treatment on activation. `.btn-link` binds to the existing link tokens and decoration. `.btn-sm` uses space-2/space-4, size-1, and radius-small; `.btn-lg` uses space-4/space-8, size-3, and radius-large.

Preserve compatible-variable overrides through the final consuming declarations. In particular, changing `--bs-btn-focus-shadow-rgb` must change the ring; merely declaring the variable would satisfy presence while breaking its contract.

The focus default is the calibrated primary ring. Any stronger outline or foreground adjustment needed for accessibility is a separately recorded departure, established by measurement. Forced-colors treatment uses system colors for face, text, highlight, disabled text, and a visible outline; centralize those color values as tokens to obey Veneer’s color rule.

Implement `.active`, `.show`, checked-label relationships, focus on `.btn-check` with chrome on its label, native and fieldset disabled states, and disabled anchors. Keep persistent pressed state distinct from a held pointer’s `:active` state. Transition color, background-color, border-color, box-shadow, and opacity through `--vn-motion-feedback` and `--vn-ease-standard`, with the existing reduced-motion mixin. Strike RTL work.

**Inventory ruling:** recommend a recorded subset, not indiscriminate shipment of the whole `btn` inventory.

The actual inventory includes input-group rules, button groups/toolbars, split dropdown rules, `.btn .badge`, close buttons and their container relationships, and `.placeholder.btn::before`. These are not all standalone Button rules.

Its property set likewise includes:

- `--bs-gradient`, already bound to `--vn-surface-gradient`; outline treatment can disable its component-local use.
- `--bs-btn-close-color`, `-bg`, `-opacity`, `-hover-opacity`, `-focus-shadow`, `-focus-opacity`, `-disabled-opacity`, and `-filter`.

Leave the close-button bindings with the `btn-close` owner. `--bs-btn-close-filter` already carries a documented retained Bootstrap value; do not falsely claim it is canonicalized by U7. Its image/mask design belongs to that later unit.

Keep the pinned inventory unchanged. Add an explicit partition naming each shipped selector/property and each deferred entry’s owner and reason. Validate exhaustive membership and reject unknown exclusions. The conformance proof must check every shipped member against the built cascade and retain an independent declared shipped-component list.

The present checker cannot support that partition: it checks the entire inventory only when every guide row for `btn` is shipped. Change that deliberately, with negative controls. Recommend a dedicated CSS obligation selecting the CSS population independently from engine obligations.

**Alternatives and costs.** Shipping the whole inventory avoids changing presence semantics but expands U7 into neighboring components and image assets. Silently filtering by a `.btn` prefix loses evidence and is unacceptable. Bootstrap’s Sass shade/tint functions also fix values at compilation and fail the runtime-token and Elements-treatment requirements.

**Deciding evidence:** `styles.md`; calibration; Elements’ button source; `_tokens.scss`, `_theme.scss`, and `_mixins.scss`; the actual oracle inventory; `tests/conformance.test.ts`.

**The journeys and captures**

Grow `Showcase.ts` with a Button section. Do not open a speculative `Section` family. Keep specimen definitions and copy in the app’s centralized data files.

Resolve the constructor-mount finding by adding a one-word `mount()` operation. Construction prepares ownership; `mount()` attaches and binds. The entry becomes:

```ts
new Showcase(document.body).mount()
```

Make mounting idempotent while mounted. `destroy()` releases resources permanently; remount through a new instance. Update `mountShowcase` to call `mount()`. Test mounting into a replacement target through the shell interface and reconstruction into the original target.

Use the journey axis for the user-facing proofs:

- Reach click, Space, and Enter through accessible controls; read `aria-pressed`, `.active`, role, and focus from the rendered surface.
- Assert the exact disabled and covered refusal sentence: `Interactive target "<name>" is not visible and focus-reachable`. Uncover through a visible control, then activate.
- Use `hoverAccessible`, `holdAccessible`, and `releasePointer`; register release before holding because release can generate the click.
- Establish keyboard focus before `readRing`. For checked inputs, pass the label as the `worn` element.
- Read contrast for each enabled variant/state/theme, with `buildContrast` controls straddling the chosen threshold. Record disabled appearance separately.
- Use `stageMedia({ motion: false })`, with `releaseMedia` registered before staging. That API does not accept a forced-colors option.
- Exercise native and anchor hosts, checked inputs and labels, geometry, clipping, and hit targets.
- Observe transition frames, reversal, interruption, completion, and destruction separately from settled captures. Button’s logical state remains synchronous.

**The installed paint readers currently prevent closing the full paint obligation.** Their implementation accepts legacy RGB and a limited `color(srgb …)` syntax. It cannot read the calibrated `oklch()` foregrounds/fills or `oklab()` shadow. Its modern-color expression also rejects negative channels present in recorded mixes. `readLayers` can silently skip an unreadable painted layer, producing a misleading contrast result.

Recommend a Test-owned prerequisite that fixes color reading and refusal behavior, then adopts the tested release. Existing `readPaintedColor` helps with calibration but is not a substitute for the required composed `readContrast` and `readRing` proofs. Do not change product colors merely to make the instrument readable. Keep unsupported opacity-composition, image, gradient, and mask claims explicitly bounded.

For captures, declare specimen/state keys separately from injected theme/viewport variants; use filenames such as `button-primary-hover--dark-390.png`. Place each capture immediately after its journey reaches the state. Preserve an always-on placement set: a disabled portfolio records nothing. Assert filename membership and uniqueness ordinarily, then actual path membership in capture runs. Use the portfolio’s `captureFrame` byte readback.

Ensure capture staging preserves the state being photographed. Resizing can change pointer position relative to a specimen; capture must not label an unverified frame “hover” or “active.” Captured theme must match the filename.

Retain the intentionally failing journey’s journal and tree artifacts while its control run remains red. Capture evidence in failure-safe teardown before removing the mounted tree. Do not leave an unconditional planted failure in the ordinary acceptance suite.

Replay the oracle’s markup and action order against Veneer, including ordinary/reduced modes and hold/release. Compare compatibility observables, not raw object equality with irrelevant Bootstrap identity or Veneer-only events removed indiscriminately. Keep an explicit projection and prove its exclusions; separately assert the new event. The existing conformance test compares official Bootstrap to its fixture—it does not yet compare Veneer.

**Alternatives and costs.** A `Section` abstraction adds lifecycle and placement work before a sibling requires it. Keeping constructor mounting avoids an API change but preserves the entry’s discarded instance and combines preparation with attachment. CSS-only state fixtures are useful style proofs but cannot replace journeys.

**Deciding evidence:** plan § U7 and § Close each component; U1-conform constructor-mount finding; current shell/journeys; installed Test declarations and implementation.

**Distribution and the guide**

Add an offline Button consumer proof alongside the existing generic distribution checks. The current stage pings the registry and installs from it; it does not meet the offline requirement.

Prepare an isolated installation from the packed Veneer artifact and the declared runtime closure. With Contract promoted, stage its exact installed release as well. Disable registry access for the offline installation and consumer drive.

Exercise:

- Packed `./styles` through a real stylesheet link, reading Button paint and geometry.
- Packed `./browser` through an explicit engine consumer, proving import alone activates nothing.
- Packed `./browser/auto` through a side-effect-only import, proving production tree-shaking retains activation.
- Child clicks, keyboard activation, disposal/restoration, and delegated-listener removal.
- Published declarations through consumer compilation and every declared export target through actual resolution.
- Browser requests restricted to the owned local server; no undeclared runtime package available accidentally.

Update only `guides/veneer.md`:

| Section | Required change |
|---|---|
| `Surface` | Engine, options, hooks/events, guards/helpers, constants, and the separately identified auto surface |
| `Methods` | Exact interface method tables, including adapter lifecycle |
| `Examples` | Explicit engine use, hooks, CSS loading, auto activation, and teardown |
| `Compatibility` | Proven Button obligations shipped; explicit additions, exclusions, narrower boundaries, and deferred ownership |
| `Styles` | Button partials, bindings, layer ownership, state treatments, and departures |
| `Showcase` | Actual Button specimens and controls |
| `Tests` | Engine, adapter, styles, journeys, oracle comparison, and offline distribution proofs |

Extend parity’s module map for `./browser/auto`. Do not import its side-effect entry into the Node-only guide runner merely to test names; use the appropriate declaration inventory and browser execution proof.

Preserve the landed Compatibility grammar: `Component`, `Kind`, `Obligation`, `Proof`, `Status`; statuses are `accepted` and `shipped`; `-` means no oracle step. The reader scans tables in that section, so a casually added table with different columns will fail. `scanOracleObligation` matches specific obligation sentences; wording changes require corresponding predicate changes.

Do not flip all existing `btn` rows to shipped. Split composite engine obligations and reassign transition, dismissal, sanitizer, configuration, selector-engine, and excluded jQuery work on the record. Bootstrap Button has no transition-event pair; the generic documentation wording cannot manufacture one.

**Alternatives and costs.** Reusing the registry stage is cheaper but supplies no offline proof. Marking every row shipped triggers CSS checking at the price of false implementation claims. Keeping every row accepted avoids that falsehood but leaves Button’s CSS check dormant. The explicit ownership and CSS-status split costs checker work and preserves meaningful evidence.

**Deciding evidence:** `tests/distribution.test.ts`, `tests/setupConformance.ts`, current guide grammar, `documentation.md`, and the standing single-guide ruling.

**Unit decomposition**

Recommend a serial chain with CSS and behavior implemented together. A CSS-only accepted unit would conflict with the component closure rule. Documentation changes accompany their implementation; the final unit consolidates the guide and evidence.

| Order and unit | Role | Owned files | Acceptance criteria and closure rows |
|---|---|---|---|
| **Prerequisite: entry placement and scope** | Scaffold rule owner and orchestrator | Applicable scaffold architecture/naming rules and enforcement; Veneer plan and research ledger; proposed rendered-contract ledger; guide compatibility boundaries; explicit Button inventory partition | Sanction auto entry placement and external method spellings. Freeze exact shipped/deferred selector, property, and engine populations. Record artifact and independent expectation for each applicable contract. Establishes scope; closes no browser-evidence row. |
| **Prerequisite: paint readers** | Test package owner | Test’s color, backdrop, contrast, and ring implementations and mirrored proofs; then Veneer manifest/lockfile adoption | Real browser controls cover calibrated color spaces, out-of-gamut readings, unreadable layers, and documented opacity limits. No local replacement reader. Enables Paint closure; does not itself close Veneer’s Paint row. |
| **U7 Button implementation** | `sol` | `src/browser/Button.ts`, root browser types/constants/validators/helpers/barrel; auto module; button SCSS partials and shared tokens/mixins; token registry; browser auto build wrapper; manifest/lockfile; mirrored engine/adapter/style tests; conformance partition/checker/setup proofs; corresponding guide rows | Validate options before effects; ordered mutation/event and restoration proofs; reuse/removal/child delegation; real checked/disabled/focus states; token override and neighbor isolation; calibrated tints and reduced motion; emitted auto entry and declarations. Closes Button’s Tokens and Semantics/classes evidence, and supplies component-level States/access, Paint, Motion, and Lifecycle evidence. |
| **U7 Shell and journeys** | `sol` | `app/browser/Showcase.ts`, types/constants/main and necessary shell styles; `tests/setupBrowser.ts` and its proof; shell tests; `tests/app/browser/integration.test.ts`; oracle comparison setup/proofs; corresponding guide rows | Explicit mount lifecycle; engine/view updates; replacement targets; listener release and remount; complete real-input journeys; oracle comparison; failure-artifact control; portfolio filename, placement, and capture membership proofs. Closes States/access, Paint, Motion, Lifecycle, applicable Coordinates, and Artifacts, subject to actual provider capability and portfolio review. |
| **U7 Offline consumer and closure** | `sol`, followed by assigned audit/verifier roles | `tests/distribution.test.ts`, extracted distribution setup and its proof; guide/parity files; plan and ledger evidence records | Isolated offline installation and vanilla CSS/browser/auto behavior; declaration resolution; final guide truth and compatibility status; scoped checks and ordered gates; separate Chromium and Edge receipts; Elements/Veneer capture comparison. Closes Distribution and consolidates every applicable closure row for the orchestrator’s ruling. |

Treat direction/RTL and Tailwind ownership as outside the authorized U7 work. Exercise applicable theme, density, radius, viewport, print, reduced-motion, and forced-colors coordinates. A provider refusal leaves its evidence row open.

**Alternative and cost.** A single `sol` unit reduces handoffs but combines unresolved rule, instrument, CSS, lifecycle, packaging, and evidence boundaries. The serial chain makes each prerequisite concrete without presenting partial work as accepted Button completion.

**Risks**

- The broad `btn` inventory and mixed guide statuses can produce either unintended scope expansion or a dormant presence check.
- Installed paint readers cannot currently support the calibrated surface. Successful RGB controls alone would conceal this gap.
- Elements’ white foregrounds and translucent focus treatment must be measured in dark and tinted states; calibration does not establish accessibility.
- Separate browser builds can duplicate engine ownership state. The implementation must prove its chosen direct/auto ownership boundary and side-effect retention.
- Broad cross-cutting ledger rows exceed what Button’s oracle drives. Reassignment requires an explicit scope ruling.
- Attribute restoration can overwrite later consumer changes unless ownership is limited to the exact attributes and class token the engine manages.
- Portfolio resizing and pointer release can change the state after it was asserted.
- The current oracle lacks disposal, disabled programmatic toggling, contradictory initial state, and anchor Space activation. Those require additional proofs or explicit departures; they cannot be inferred from the fixture.