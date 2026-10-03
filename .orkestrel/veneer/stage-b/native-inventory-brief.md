# Unit native-inventory — native browser surfaces the engine could carry, per plugin, at dc4654b

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only.

## Objective

The user defines stage B of `@orkestrel/veneer`'s browser engine as the native browser system surfaces and APIs added to the engine wherever it does not use them yet. Stage A, the drop-in replacement of Bootstrap's JavaScript engine in `src/browser`, is closed. Map, for every plugin and every shared mechanism, which native surfaces and APIs could carry its behavior in Chromium, what the tip uses today, what Bootstrap's contract demands that a native surface must reconcile, and what the records already measured or refused. Do not design or recommend; report evidence and the open questions each candidate raises.

## Context

- Checkout root: `C:\Users\mikes\WebstormProjects\veneer`, tip `dc4654b` on `main`. Chromium is the only target (Chromium 153.0.8010.12 through Playwright 1.63.0).
- The user's rulings: the engine leans on native browser systems and APIs wherever Bootstrap's expectations and the native behavior can be reconciled, decided case by case (`scaffold:.orkestrel/veneer/plan.md`, the ruling of 2026-10-02 opening the browser engine); the engine stays a blank slate, providing every piece with each default a separate convenience (2026-10-03).
- Campaign records (read-only, outside the checkout) are under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\`. Cite them as `scaffold:.orkestrel/veneer/<file>:<line>`.

## Read

1. `scaffold:.orkestrel/veneer/browser-design-verdict.md` whole: ruling 1 (stage B as first scoped), the per-plugin table (its native columns and what stage A refused), and the open questions with the user's answers.
2. `tmp/units/browser-feasibility-report.md` and the entries of `tmp/units/browser-feasibility-measurements.json` it names (the feature census and every family reading).
3. `tmp/units/browser-design-planner-proposal.md` and `tmp/units/browser-design-analyst-proposal.md`: their native-mechanism analysis per plugin.
4. `tmp/units/browser-elements-distillate.md`: the `mikesaintsg/elements` checkout's `create*` factories, which the user names as guidance for the API they want; note every native surface those factories use.
5. `tmp/units/browser-engine-distillate.md`: Bootstrap's engine per plugin, for the behavior a native surface must reproduce.
6. `src/browser` at the tip: every place it uses or avoids a native surface.

## The inventory

Cover these subjects: Alert, Button, Carousel (and `Swipe`), Collapse (and accordions), Dropdown, Modal, Offcanvas, Popover, Scrollspy, Tab, Toast, Tooltip, and the shared mechanisms `Backdrop`, `Trap`, `Lock` and `Hold`, `Placement`, the transition wait, and the boot scope's delegated listeners.

Candidate surfaces to consider for each subject, at least: the Popover API (`popover="auto"`, `"manual"`, `"hint"`, `showPopover({ source })`, `beforetoggle` and `toggle`), `<dialog>` (`showModal`, `show`, `closedby`, `requestClose`, the `cancel` event), `CloseWatcher`, `<details>` and `<summary>` (including exclusive `name` groups and `::details-content`), invoker commands (`commandfor`, `command`, the `command` event, custom `--` commands), `interestfor`, `inert`, anchor positioning (already used by `Placement`), `@starting-style` and `transition-behavior: allow-discrete`, `interpolate-size` and `calc-size()`, `scrollbar-gutter`, View Transitions, scroll snap and the CSS carousel features (`::scroll-marker`, `::scroll-marker-group`, `::scroll-button`, `scroll-target-group`), scroll-driven animations, `IntersectionObserver` and `ResizeObserver`, the `hidden="until-found"` attribute and `beforematch`, `focusgroup` where Chromium ships it, and `ElementInternals` or custom states where relevant. Report a candidate as `unverified` when the records hold no measurement of it in this Chromium.

## Output

Your final message is the document, under 10,000 characters per turn. If the inventory exceeds that, answer the subjects Alert through Dropdown in this turn and end with the line `CONTINUES`; the Orchestrator resumes you for the rest. The Orchestrator writes each turn to `tmp/units/native-inventory-<n>.md`. No process diary.

One table per subject with the columns `surface`, `tip` (`used`, `not used`, or `refused in stage A` with the record), `Bootstrap contract to reconcile` (the writes, events, focus, or timing a native surface would change, with a citation), `measured` (the record and reading, or `unverified`), and `open question`. Then, after the last subject, a list of the candidates that cut across subjects (for example a shared top-layer order) with their evidence.

## Status rules

- Cite only lines you read, as `path:line` at the tip or `scaffold:...` for the records.
- Mark a claim you could not verify by reading as `unverified`.

## Scope

- Owned: none. Read-only. Edit no file. Perform the assignment yourself and spawn nothing.

## Deviation contract

On any conflict with this brief, stop and report: expected, found, evidence, done or not done, and one hypothesis.

## Acceptance criteria

1. Every subject has a table.
2. Every citation is a line you read.
3. `git status --porcelain` is unchanged by this lane, apart from files other lanes create.
