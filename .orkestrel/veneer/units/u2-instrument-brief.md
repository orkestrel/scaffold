# Unit U2-instrument — the Elements calibration instrument

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You write one file and nothing else.

## Objective

Write `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs`, a
Playwright instrument that opens Elements' built showcase, drives every specimen in the map below
into every state it has, reads the resolved styles and motion frames, and writes the readings and
captures per browser. The Orchestrator runs it; you do not.

## Context

**Evidence.** The specimen map is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u2-map-report.md`
(Grok, 2026-09-20): read its `Distillate` table first and its `Evidence` rows for every selector,
accessible name, and route. The built showcase is
`C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html`, built from commit `3b41900`,
sha256 `cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`, a single self-contained
file that opens from a `file://` URL and routes by hash (`#/button/button-bare` and the like). The
retained CSSOM instrument `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments/cssom-probe.mjs`
shows the import form and the two browser launches this host supports; copy both.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Non-negotiable rules and § Design
laws for the module's shape (no `any`, no `as`, no nested function declarations beyond an anonymous
callback passed as an argument); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/portability.md`
for paths; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/motion.md` for what
the readings must distinguish. The file is a research instrument, not package source: it may hold
several top-level functions and constants.

**Installed primitives.** Playwright from `file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs`
(managed Chromium revision `1243` is installed, so `chromium.launch()` with no executable path
works; Edge through `chromium.launch({ channel: 'msedge' })`). Node `node:fs/promises`,
`node:path`, `node:url`, `node:crypto` for the digest.

**Host.** Windows; run from the scaffold checkout with `node .orkestrel/veneer/research/calibration.mjs`.
Write outputs under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration/<browser>/`
where `<browser>` is `chromium` or `msedge`. Read the specimen selectors from the map; never guess a
name.

**Measurements.** None taken; the instrument takes them.

**Control identifiers.** none.

**Standing conditions.** The showcase's theme control has the accessible name
`Switch theme (currently light)` or `Switch theme (currently dark)`; the mode attribute is
`data-mode` on `<html>`. The details specimen's content pseudo-element is `::details-content`. The
showcase pages drive native APIs for dialog, details, popover, and drawer; no factory runs there.

## Unknowns

- Whether `getComputedStyle(element, '::details-content')` returns used values in these browsers;
  read it and record the raw reading either way.
- Whether `page.emulateMedia({ reducedMotion: 'reduce' })` takes effect on an already-loaded
  `file://` page; call it before navigation for the reduced-motion pass.

## Scope

**Owned.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs`.

**Shared (report-only).** none.

**Off-limits.** Everything else. Do not run the instrument; do not open a browser; do not edit the
map or any package.

**What asserts the state this change ends.** Nothing yet; the Orchestrator's run produces the
readings the plan's U3 consumes.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Write` for the one file. No `Bash`.

## Execution

Perform the assignment directly and spawn nothing. Write the instrument so that it:

1. Verifies the showcase digest before reading anything, and refuses to run on a different file.
2. Launches each browser in turn (`chromium` default, then `msedge` by channel), at a `1100 x 800`
   viewport, with a fixed `16px` root font, and records `browser.version()` beside every reading.
3. For each specimen in the map's table, navigates to its route, waits for the reach target, and
   for each applicable state reads, on the specimen element, the resolved `font-family`, `font-size`,
   `line-height`, `font-weight`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`,
   `border-top-width`, `border-top-left-radius`, `color`, `background-color`, `border-top-color`,
   `box-shadow`, `outline`, `transition-property`, `transition-duration`,
   `transition-timing-function`, `opacity`, `transform`, and `translate`, plus the element's
   `getBoundingClientRect()` width and height, in light mode and then in dark mode. States: `rest`;
   `hover` through `locator.hover()`; `focus-visible` by pressing `Tab` from the document body until
   `document.activeElement` is the specimen (bounded to the count of focusable elements on the page,
   recording the trail); `active` through `page.mouse.move` to the element's centre then
   `page.mouse.down()`, read, then `page.mouse.up()`; `disabled` for the disabled specimen only;
   `open` and `closed` for dialog, details, popover, hint, and drawer.
4. For each motion (modal dialog open and close, non-modal dialog open and close, details open and
   close, popover open and close, hint open and close, drawer open and close): triggers the action
   through the control the map names, then samples once per animation frame for `700ms` the
   specimen's `opacity`, `transform`, `translate`, `display`, and for details the pseudo-element's
   `block-size` and `opacity` through `getComputedStyle(details, '::details-content')`, and for the
   dialog and drawer the `::backdrop` `background-color` and `backdrop-filter`; records the first
   frame, the frame the value stopped changing, the elapsed milliseconds to that frame, and the
   `getAnimations()` count at the start; and repeats the same motion once with
   `emulateMedia({ reducedMotion: 'reduce' })` set before navigation, recording what still changed.
5. Captures a screenshot per specimen per state per mode as
   `<browser>/<specimen>--<state>--<mode>.png`, clipped to the specimen's bounding box padded by
   `16px`, and for each motion a screenshot at its settled open frame.
6. Writes `<browser>/calibration.json` with every reading keyed by specimen, state, and mode, the
   motion frames, the browser version, the date, the showcase digest, and every unknown it met
   (an element it could not reach, a reading that returned empty), and exits non-zero only when the
   digest check fails or a browser cannot launch.

Keep the specimen list, the state list, and the property list as frozen top-level constants so
the Orchestrator can read what was measured without running it.

## Output

Your final message is a short list of: the file path; the specimen, state, and property constants
as written; the three places where the instrument may need a selector adjustment if the map was
wrong; and nothing else.

## Deviation contract

Stop and report on a specimen the map does not give a reach for. Decide, record, and carry on from
the sampling budget, the padding, and the JSON layout.

## Acceptance criteria

1. The file parses: `node --check` succeeds (the Orchestrator runs it).
2. The constants named above are top-level and frozen.
3. Every specimen in the map's table appears in the specimen constant with its route and reach.

## Review evidence

The written file; the Orchestrator's first run and its `calibration.json`.
