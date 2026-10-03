# Design pass — browser stage B: native surfaces, the Bootstrap umbrella, and the Veneer styles hand-off

## Subject

`@orkestrel/veneer` (checkout `C:\Users\mikes\WebstormProjects\veneer`, `main` at `9885975`). Its browser engine `src/browser` is the drop-in replacement of Bootstrap 5.3.8's JavaScript engine (stage A). The user defined stage B on 2026-10-03: the native browser system surfaces and APIs added to the engine wherever it does not use them yet. This pass designs stage B and stops short of implementation. The user's further rulings of 2026-10-03: the engine is a blank slate (every piece provided, each default a separate convenience that forces nothing); a `createVeneer` call with no plugins routes nothing; tip start-at-boot is an opt-in plugin option; `toggle.vn.button` stays. Stage A's completion (the blank slate, the rename, the remainder rows) is landing separately as the unit `veneer-boot`; design against its shapes as `tmp/units/stage-b-design-agent-2.md` § Synthesized ruling D1, D2, and D4 state them, with the user's two later rulings applied (`toggle.vn.button` kept; no default plugins).

The user also asked that this pass produce two inventories: what is created now under the Bootstrap umbrella (the engine and the Bootstrap face), and what remains for the Veneer styles surface (`src/styles`, chunk 3) to take over and to come up with.

## Inputs

Read every input; the standing contract and law come first.

- Contract and law: `AGENTS.md`; `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\` (`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `browser.md`, `styles.md`); `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\browser-convention-verdict.md` (rulings 1 to 17); `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\browser-design-verdict.md` (rulings and the user's answers); `ROADMAP.md` (§ Cascade contract, § Standing shape, § Style centralization, § Sequence); `guides/veneer.md` § Browser entry, § Bootstrap, § Styles.
- The native-surface inventory: `tmp/units/native-inventory-1.md`, `tmp/units/native-inventory-2.md`.
- Primary-source research: `tmp/units/native-research-agent-0.md` to `-3.md` (overlays, positioning, motion, disclosure), `-4.md` (the critic's gaps), `-5.md` to `-10.md` (the gap answers).
- Measurements in Chromium 153: `tmp/units/browser-feasibility-report.md` with its JSON; `tmp/codex/browser-stage-b-design-verdict.md` § D3 (the four first-scoped pieces); `tmp/codex/stage-b-measurements.md` (every other surface, including the close-request veto, flag states, scroll lock, accessibility mapping, invoker commands, `CloseWatcher`, disclosure, carousel pseudo-elements, motion, and DOM APIs).
- The first design pass over the four pieces: `tmp/units/stage-b-design-agent-0.md` and `-1.md` (two planners) and `-2.md` (the judge).
- The elements engine, which the user names as API guidance and research: `tmp/units/elements-engine-1.md`, `-2.md`; the elements styles: `tmp/units/elements-styles-*.md`; the chunk 3 and 5 map: `tmp/units/veneer-remainder-3.md`; the chunk 3 distillates under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\distillates\` (`absorb-styles-source`, `absorb-styles-identity`, `absorb-styles-plan`, `absorb-styles-reports`).
- The code at the tip where a ruling needs it.

## Questions

### W1 — per subject

For each of Alert, Button, Carousel (with `Swipe`), Collapse and accordions, Dropdown, Modal, Offcanvas, Popover, Scrollspy, Tab, Toast, Tooltip, and the shared mechanisms `Backdrop`, `Trap`, `Lock` and `Hold`, `Placement`, the transition wait, and the boot scope's delegated listeners: which native surfaces stage B adds (rule on every candidate the inventory and research name: add, defer with the blocking measurement, or refuse with the evidence), and for each added surface:

- The opt-in shape under the blank slate (a plugin option, a component option, a separate plugin factory, a detected author CSS declaration, or markup), consistent across subjects. A Bootstrap page that never opts in keeps stage A's behavior byte for byte.
- The mechanics against the tip's code and against Bootstrap's contract: writes, events and their cancelability (the measured close-request veto decides which `hide.bs.*` vetoes survive), focus, top-layer order, accessibility.
- The departure rows, under the opted piece's scenario prefix, and the oracle case that consumes each.
- Where any CSS lives: the consumer's stylesheet through an executed guide fence, the Bootstrap face (only what `guides/veneer.md` § Bootstrap admits), or the Veneer styles surface.

### W2 — cross-cutting

Rule the cross-cutting questions the inventory and research raise: one top-layer order across dialogs, popovers, and toasts against Bootstrap's z-index scale; one close-request model; one focus model (`Trap`, `inert`, `showModal`, `focusgroup`); one scroll lock owner; one transition model (`getAnimations()`, `@starting-style`, View Transitions) and its reduced-motion behavior; invoker commands beside the `data-bs-*` data API; the newer DOM APIs (`moveBefore`, `checkVisibility`, `scrollIntoView({ container })`, ARIA element reflection).

### W3 — the Bootstrap umbrella inventory

List what stage B creates under the Bootstrap umbrella: every public type, option, plugin factory, component change, error code, guide section and fence, and departure row family, each with its subject, its unit, and its proof.

### W4 — the Veneer styles inventory

List what the Veneer styles surface must take over and come up with, as the inventory that opens chunk 3: the native-surface CSS stage B leaves to the consumer or to Veneer (dialog and `::backdrop`, popover resets, `@starting-style` motions, details and disclosure, carousel markers), the token system and theme pack (from the elements styles and the distillates, under the standing rule that Elements-look values marked `identity` are dropped unless the user rules otherwise), the `veneer` registry groups, and every open decision chunk 3 needs from the user. Separate what Bootstrap's sheet already covers from what Veneer must add.

### W5 — units

Split stage B into implementation units (not to be started in this stretch) with exclusive file ownership, order, and lane (GPT-6 Astra for objective units, Claude Opus 5.5 for subjective ones), the measurement each unit must re-run, and the lanes-log predictions the showcase session needs.

## Output

One section per question, W1 to W5, with types and TSDoc as they would land where a public contract changes, the alternatives considered and the ruling on each, citations as `path:line`, and the risks with what over-correcting would break. Then a list of what the pass could not decide and what the user must rule. No process diary.
