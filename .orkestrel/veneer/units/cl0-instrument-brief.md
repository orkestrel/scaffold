# Unit CL0 — the Content/layout calibration instrument over Elements' built showcase

## Role and engine

`builder` on native Sonnet: a fully specified instrument. Perform the assignment directly and
spawn nothing. You write one script and run it once to prove it; the Orchestrator takes the
accepted run and indexes the record.

## Objective

`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.mjs`,
a sibling of the accepted instrument `research/calibration.mjs` (read it first: its digest
check, viewport, root font size, settle wait, browsers, modes, `setMode`, the style readers,
the capture writer, the output shape under `research/calibration/<browser>/`), that reads
Elements' content specimens per mode on managed Chromium and Edge and writes the readings
under `research/calibration-content/<browser>/` plus a rendered record
`research/calibration-content.md` (one table per surface: property, light, dark, per browser,
with the run's date and the showcase digest in its header). The record is what the
Content/layout units (CL3 text tags, CL6 links, CL9 tables) bind their values to.

## Context

The specimen map with `file:line` pointers is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl0-scout-report.md`
(section 1 the surfaces with route, page, DOM path, and partial; section 2 the properties to
read and the light and dark token values; section 3 the mode write path, including the note
that `calibration.mjs`'s `setMode` comment describes the boot default rather than a post-toggle
`writeMode('light')`; section 4 what the accepted instrument already does and what it lacks:
`margin-*`, `text-decoration*`, `border-collapse`, `border-spacing`, hover states on anchors
and table rows, custom-property dumps). Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`
and `.claude/rules/typescript.md` (the script is JavaScript in the accepted instrument's style:
no `any`, readonly data, `{verb}{Noun}` helpers), `portability.md`. The accepted instrument
imports Playwright from `file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs`;
do the same, install nothing.

Surfaces and states: paragraphs (`p`, and the `p + p` rhythm read as the second paragraph's
`margin-block-start`), headings `h1` to `h6`, lists `ul`, `ol`, `dl` with `dt` and `dd` (the
list's own margins and padding and a nested item's), `blockquote`, `hr`, anchors at rest and
hover (colour, `text-decoration-line`, `-color`, `-thickness`, `text-underline-offset`),
tables bare, striped, and bordered where the showcase carries them (a cell's padding, border,
`border-collapse`, `border-spacing`, the caption's paint, a row's background at rest and
hover), `figure` and `figcaption`, `img`, the code family (`code`, `pre`, `kbd`, `samp`,
`var`), `small`, `mark`, `abbr`, `address`, `sub`, `sup`. Read the properties the scout's
section 2 lists for each, plus `font-size`, `line-height`, `font-weight`, `color`,
`background-color`, and the four margins and paddings on every surface, and dump the
`--set-*` and `--color-*` custom properties the scout names for the surface in each mode.

Host: Windows, Git Bash; the showcase is a single self-contained file the accepted instrument
opens as `file://`; both browsers are installed (managed Chromium through Playwright, Edge
through `channel: 'msedge'` as the accepted instrument does); the run is read-only against
Elements and writes only under `research/calibration-content/` and the record file.

## Unknowns

Whether an anchor's hover paint needs a settle longer than the accepted `SETTLE_MS`; read
the showcase's declared transitions on `a` and settle accordingly, recording the wait.

## Scope

Owned: `.orkestrel/veneer/research/calibration-content.mjs`, `research/calibration-content.md`,
the directory `research/calibration-content/`, and `cl0-instrument-report.md` in the
scaffold checkout. Off-limits: `research/calibration.mjs` and `research/calibration/` (the
accepted run stays untouched), everything under Elements and Veneer, every other file. Tools:
Read, Grep, Glob, Write, Bash (to run the script with `node` from the scaffold root).

## Execution

1. Write the script. Mirror the accepted instrument's structure; verify the showcase digest;
   for each browser and mode, navigate to each surface's route, resolve the specimen by the
   scout's DOM path, drive the hover states the surface has, read the properties and the custom
   properties, and write `readings.json` under the browser's directory. Render the record from
   the readings.
2. Run `node .orkestrel/veneer/research/calibration-content.mjs` once from the scaffold root.
   Open the record and confirm every surface has a row per property per mode per browser;
   name any surface the showcase does not carry as absent, with the route you looked at.
3. Do not run it a second time after the listing.

## Output

Write `cl0-instrument-report.md` and return it: the script's surfaces and properties
as landed, the run's console output, the output listing with byte sizes, the record's header,
the absent surfaces with their reason, and the scaffold checkout's
`git status --porcelain -- .orkestrel` (the new files and nothing else changed).

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the settle waits, the exact
DOM path where the scout's pointer and the live page disagree, the record's column order. Stop
on: the showcase digest not matching the accepted instrument's; a browser that fails to launch.

## Acceptance criteria

1. The script runs to completion from one `node` call and leaves no process behind.
2. `research/calibration-content.md` carries one table per surface with light and dark
   readings on both browsers, the run date, and the showcase digest; every absent surface is
   named with its reason.
3. `research/calibration.mjs` and `research/calibration/` are byte-identical to before.
