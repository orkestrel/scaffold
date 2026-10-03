# Unit elements-engine — native surfaces and API ideas in the elements engine

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only.

## Objective

The user names the `mikesaintsg/elements` checkout as guidance for the API they want and as a source of research on native browser surfaces. Map what elements' browser engine and its research hold that bears on stage B of `@orkestrel/veneer`'s browser engine: the native browser system surfaces and APIs added to the engine wherever it does not use them yet, opt-in under a blank-slate engine. Elements is guidance, never a source to copy. Do not design Veneer; report what elements does, where, and what it learned.

## Context

- Elements checkout: `C:\Users\mikes\WebstormProjects\elements` at `3b41900`. Cite it as `elements:<path>:<line>`.
- Veneer checkout: `C:\Users\mikes\WebstormProjects\veneer` at `dc4654b`. Its engine is `src/browser`; cite it as `path:line`.
- Veneer's earlier distillate of elements' factories is `tmp/units/browser-elements-distillate.md` (2026-10-02); read it first and go deeper than it, citing elements directly.

## Read in elements

1. `src/browser/` whole: `factories/`, `composables/`, `inspector/`, and the root files (`schema.ts`, `taxonomy.ts`, `types.ts`, and the rest).
2. The guides `guides/composables.md`, `guides/elements.md`, `guides/patterns.md`, `guides/inspector.md`, `guides/w3c.md`, and the corpus under `guides/w3c/` (at least `interactions.md`, `renderings.md`, `aria.md`, and the element cards for `dialog`, `details`, `summary`, `button`, `menu`, and the popover-related attributes).
3. `ROADMAP.md`, `MAP.md`, `AGENTS.md` (only the parts about browser behavior and API shape), and `docs/superpowers/specs/`.

## Report

1. **Native surfaces in use.** One row per native surface or API elements uses (the Popover API, `<dialog>`, `CloseWatcher`, `<details>` and `<summary>`, invoker commands, `interestfor`, `inert`, anchor positioning, `@starting-style`, View Transitions, observers, and any other): where (`elements:path:line`), what it drives, how a consumer opts in, and any limit or bug elements records about it.
2. **API shapes.** The `create*` factories and composables, by name: options, returned members, events, teardown, and how defaults are kept separate from the core (the user's blank-slate convention); note every place elements composes a native surface with scripted behavior.
3. **Research and rulings.** Every recorded finding about browser behavior, specs, or Chromium (in the guides, the roadmap, the specs, the W3C corpus): the claim, its citation, and whether it names a source.
4. **Mapping to Veneer subjects.** For each of Veneer's subjects (Alert, Button, Carousel, Collapse and accordions, Dropdown, Modal, Offcanvas, Popover, Scrollspy, Tab, Toast, Tooltip; `Backdrop`, `Trap`, `Lock`, `Placement`, the transition wait, the boot scope), which elements surface or idea bears on it, with citations, and what Veneer's tip does today.

## Output

Your final message is the document, under 10,000 characters per turn. If it exceeds that, answer parts 1 and 2 in this turn and end with the line `CONTINUES`; the Orchestrator resumes you for parts 3 and 4. The Orchestrator writes each turn to `tmp/units/elements-engine-<n>.md`. No process diary.

## Status rules

- Cite only lines you read. Mark a claim you could not verify by reading as `unverified`.

## Scope

- Owned: none. Read-only. Edit no file in either checkout. Perform the assignment yourself and spawn nothing.

## Deviation contract

On any conflict with this brief, stop and report: expected, found, evidence, done or not done, and one hypothesis.
