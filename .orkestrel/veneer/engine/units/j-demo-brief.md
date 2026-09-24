# Unit J-DEMO — the showcase's Engine region: live Bootstrap markup the mounted Delegate drives, and the engines the data API cannot start

## Role and engine

`opus` on Opus 5.5, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/demo` (branch `unit/demo` from Veneer `main` `c692c3e`). Perform the assignment directly and spawn nothing.

## Objective

A person running `npm run dev` in Veneer sees, at the top of the showcase, an Engine region whose specimens react: a collapse and an accordion open and close from their toggles, a dropdown opens, tabs switch, an alert dismisses, a modal and an offcanvas open from their triggers and close from their dismiss buttons and Escape, a toast shows from a button and dismisses, tooltips show on hover and focus, a carousel slides from its controls and indicators, and a scrollspy marks the section in view — every one driven by the shipped engines through Bootstrap's own markup, with a real-journey proof per specimen and the guide's showcase parity rows.

## Context

**The state (the Orchestrator's reading of `main`, 2026-09-24).** `app/browser/main.ts` constructs `new Showcase(document.body)` and `new Delegate()` over the document, so the data-attribute routes are live for the page's whole life; the showcase's specimens are static styling markup (`app/browser/constants.ts`, `*_SPECIMENS` arrays of `MarkupSpecimen { name, markup }` rendered by `SpecimenSection` into `<div data-specimen="…">` containers under a `<section aria-label>` with a lead paragraph) and carry no trigger but `data-bs-toggle="button"`, so nothing on the page reacts. `ButtonSection` is the one section that constructs engines: it renders each specimen and records `new Button(element)` in `#engines` for its `destroy` (around lines 60 to 76). `Showcase.#mount` (around line 106) builds the header and the lead region, then returns the section list in render order (`ButtonSection` first); `tests/app/browser/Showcase.test.ts` asserts that region order (around line 111) and `tests/app/browser/index.test.ts` the barrel's export list; `guides/veneer.md` § Showcase (from line 10304) documents each region with a parity paragraph naming its proof file under `tests/app/browser/sections/`.

**The engines and their routes.** `Delegate` (`src/browser/Delegate.ts`, `#activate` around line 520) routes a click through button, collapse, alert, tab, dropdown, carousel, modal (and its dismiss), toast dismiss, offcanvas (and its dismiss); it adopts carousels whose ride attribute reads `load` at construction (around line 496). Read `guides/veneer.md` § Delegation for what each route reads (`data-bs-toggle`, `data-bs-target`, `href`, `data-bs-dismiss`, `data-bs-parent`, `data-bs-slide`, `data-bs-slide-to`, `data-bs-ride`) and the defaults in `src/browser/constants.ts` (`*_ATTRIBUTES`, `*_SELECTORS`). `Toast` has no data-API show: `new Toast(host)` and `toast.show()` (`ToastInterface`, `types.ts` around line 2047). `Tooltip` is not delegated: read `TooltipOptions` (`types.ts` around line 1590) and `guides/veneer.md` `#### Tooltip` for the construction over a trigger and the `descendants` option that gives a container's matching descendants tooltips of their own; `Tooltip` reads `data-bs-title`, `data-bs-placement`, and the trigger words from the host's attributes. `ScrollSpy` (`#### ScrollSpy`): read whether the delegate constructs it from `data-bs-spy="scroll"`; where it does not, the section constructs `new ScrollSpy(panel, …)` itself. Every engine's `destroy()` restores its host.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/application.md` (app composition, entries, lifecycle), `browser.md`, `architecture.md` (centralized declarations: the copy and the specimens in `app/browser/constants.ts`, the section class in `app/browser/sections/`), `names.md`, `typescript.md`, `tests.md` (real journeys: `userEvent`, `pressKeys`, the journey helpers `tests/setupBrowser.ts` and `@orkestrel/test/browser` expose; no mocks), `documentation.md` (the guide's showcase paragraph and proof link per region), `writing.md`. Skill: `enterprise-bootstrap` for the markup's craft where you need it (the markup is Bootstrap 5.3's own documented examples, with Veneer's fictional courier copy the other specimens use). Standing decisions: E6 (greenfield), E9 (departures stated), E12 (one engine per host per click).

**Host.** Windows 11, Git Bash; the worktree root; `npm.cmd`/`npx.cmd` resolve as `npm`/`npx`; Chromium 153 through Playwright; `npm run test:app -- <file>` runs one app test file; `npm run dev` serves the app (do not leave it running). The `prove` MCP server is not reachable to a subagent; record that you made no call. Scoped tests: one test file per obligation while you work, the whole app project once before the report (`npm run test:app`), no builds except `npm run build:app` once at the end.

## Obligations

- **D1 The region.** `app/browser/sections/EngineSection.ts`: a section (the `SectionInterface` shape) that renders the Engine region — `ENGINE_COPY` (region name `Engine`, a lead paragraph saying the page's `Delegate` drives these specimens through Bootstrap's data attributes and the section constructs the engines the data API cannot start) and `ENGINE_SPECIMENS` in `app/browser/constants.ts` — reusing `SpecimenSection` for the rendering where its shape fits (extend it or compose it; do not copy its body) and constructing, after the markup is in the document, the engines the data API cannot start: a `Toast` per toast specimen with its show button bound to `toast.show()`, one `Tooltip` per tooltip trigger or one over the specimen container with `descendants`, and a `ScrollSpy` where the delegate has no route; `destroy()` destroys them in construction order and removes the nodes. The section mounts first in `Showcase.#mount`'s list so it is the first region under the lead, and `index.ts` exports it.
- **D2 The specimens** (each a `MarkupSpecimen` with a name; the markup is Bootstrap 5.3's documented example for the component with the courier copy; ids prefixed `engine-` so they collide with no other specimen):
  1. Collapse: a toggle button (`data-bs-toggle="collapse" data-bs-target="#engine-collapse" aria-expanded aria-controls`) and a `.collapse` card.
  2. Accordion: `.accordion` with two items, headers as `data-bs-toggle="collapse"` buttons with `data-bs-parent`.
  3. Dropdown: `.dropdown` with a `data-bs-toggle="dropdown"` toggle and a `.dropdown-menu` of items.
  4. Tabs: `.nav.nav-tabs` of `data-bs-toggle="tab"` buttons over a `.tab-content` of panes.
  5. Alert: `.alert.alert-dismissible.fade.show` with a `data-bs-dismiss="alert"` close button.
  6. Modal: a `data-bs-toggle="modal" data-bs-target="#engine-modal"` button and a `.modal.fade` with dialog, header, body, and a `data-bs-dismiss="modal"` button.
  7. Offcanvas: a `data-bs-toggle="offcanvas"` button and an `.offcanvas.offcanvas-start` with a `data-bs-dismiss="offcanvas"` close button.
  8. Toast: a "Show toast" button and a `.toast` (role `status`) with a `data-bs-dismiss="toast"` close button, shown by the section's `Toast`.
  9. Tooltip: three buttons with `data-bs-toggle="tooltip"`, `data-bs-title`, and `data-bs-placement` top, right, bottom.
  10. Carousel: `.carousel.slide` with three items, indicators (`data-bs-slide-to`), and prev/next controls (`data-bs-slide`), without `data-bs-ride` so it moves only from its controls.
  11. ScrollSpy: a scrollable panel of three headed sections beside a `.nav` of links, marked per `#### ScrollSpy`.
  Where an engine's route needs an attribute the guide names that Bootstrap's example lacks, add it and say so in the report.
- **D3 The proofs, real journeys.** `tests/app/browser/sections/EngineSection.test.ts`, mounting the section over a real `Delegate` (construct one over the test's host as `main.ts` does over the document) and driving each specimen the way a person does: click the collapse toggle and read the panel's `show` token after its settle; open an accordion item and see the other close; open the dropdown and read `aria-expanded` and the menu's `show`; click the second tab and read the pane; dismiss the alert and see it leave; open the modal from its trigger, read the dialog visible and the body locked, close it from its button, then open it again and press Escape; open the offcanvas and close it from its button; click the toast's button and read the toast `show`, then dismiss it; hover and focus a tooltip trigger and read a tip in the document, then leave; click the carousel's next control and the second indicator; scroll the spy panel and read the active link. Use the journey helpers the setup exposes (`waitForAnimations`, `pressKeys`, `userEvent`, the trusted pointer where a real press is the only path) and the existing section tests as the pattern; each case names what it proves. A `Showcase.test.ts` region-order assertion and the `index.test.ts` export list gain the section.
- **D4 The guide.** § Showcase gains an Engine paragraph in the pattern of its neighbours: what the region renders, that the page's `Delegate` drives it through the data API, which engines the section constructs itself, and the proof link `[engine specimens](../tests/app/browser/sections/EngineSection.test.ts)`; `npm run test:guides` green.
- **D5 The chain.** Scoped while you work; once at the end, `tmp/j-demo/acceptance.sh`: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:policy`, `npm run test:app`, `npm run build:app`, each exit recorded.
- **D6 The report.** The specimens and their engines per obligation, each case's title and its reading, the guide paragraph, the chain's exit lines, `git status --short`, `git diff --stat`, and the deviation state. No process diary.

## Scope

**Owned.** `app/browser/sections/EngineSection.ts` (new), `app/browser/constants.ts` (the `ENGINE_*` declarations), `app/browser/types.ts` (only if a new declaration is needed), `app/browser/index.ts`, `app/browser/Showcase.ts` (the mount list), `tests/app/browser/sections/EngineSection.test.ts` (new), `tests/app/browser/Showcase.test.ts` and `tests/app/browser/index.test.ts` (the lists), `guides/veneer.md` § Showcase (the paragraph), `tmp/j-demo/**`.

**Off-limits.** `src/**` (every engine and its tests), `app/browser/main.ts`, `tests/setupBrowser.ts`, the vendored files, `ROADMAP.md`, and every file not owned. An engine defect you meet is a report-only finding with its reproduction, never an engine edit: state it and demonstrate the specimen as far as the engine allows.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format` or lint `--fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message, per D6.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the copy, the specimen order, whether the tooltip uses `descendants` or one engine per trigger, how the toast button binds. Stop and report — expected, found, evidence, done or not done, one hypothesis — when a route the guide documents does not fire on Bootstrap's markup (an engine defect), when `Showcase.test.ts` or the capture registry refuses the new region for a reason outside your files, or when a gate outside the owned files is red at the baseline (record it as standing and continue).

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `EngineSection.test.ts` green with a case per specimen driven through real input; `Showcase.test.ts` and `index.test.ts` green with the section.
3. `npm run test:app`, `npm run test:guides`, `npm run test:policy`, and `npm run build:app` exit 0 once at the end.
4. The status lists the owned files only.
