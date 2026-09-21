# Unit U7f-harness — a throwaway capture harness over Elements' built showcase

## Role and engine

`builder` on native Sonnet: a fully specified, taste-free instrument. Perform the assignment
directly and spawn nothing. You write one script and its readme line; you run it once to prove
it produces the portfolio; you edit nothing else.

## Objective

One self-contained Node script, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-harness.mjs`,
that opens Elements' built showcase (`C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html`,
a single self-contained file; route `#/button`) in managed Chromium through Playwright, and
writes Elements' button portfolio at the same variants and states Veneer's portfolio uses, so
a verdict lane can place the two side by side. The plan's U7 acceptance owes "Elements' button
captures beside Veneer's"; Elements has no capture harness of its own (scout:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/elements-button-scout-report.md`).

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
`.claude/rules/portability.md`, and
`.agents/skills/orkestrel-polish-surface/references/capture-harness.md` § One call, one
lifecycle and § Capture the full portfolio (the script is a spawned harness in that reference's
sense: one call, its own lifecycle, teardown on every exit path).

Facts (verified by the Orchestrator, 2026-09-21):

- Playwright 1.63.0 is installed at `C:/Users/mikes/WebstormProjects/veneer/node_modules/playwright`
  with managed Chromium; import it by absolute file URL from the script, install nothing.
- Elements' showcase build is one file, `dist/showcase/index.html` (about 1.5 MB), hash-routed;
  the button page is `#/button` (`elements/app/browser/router.ts:137`). Open it as a `file://`
  URL. If the page refuses to boot from `file://` (module scripts, fetches), serve the file's
  directory with a minimal `node:http` static server inside the script, wait for a served
  response, and tear it down before returning; never leave a child or a listener behind.
- Theme: the page's write path sets `data-mode` on the root element (`elements/src/browser/theme.ts:71`;
  `'system'` removes it). Set `document.documentElement.setAttribute('data-mode', 'light' | 'dark')`
  through `page.evaluate` after boot, and confirm the attribute before shooting. The palette
  `<select aria-label="Theme">` stays at its default.
- Specimens (`elements/app/browser/pages/ButtonPage.vue`): the variants section carries a
  `button.primary` (`:100`); the pressed host is `#button-toggle` (`:694`), which `createButton`
  drives (`aria-pressed`, `.active`); hover and active are live CSS `:hover` and `:active`;
  focus-visible paints on Tab, not on click (`elements/src/styles/surfaces/_focus.scss:5`).
  Read `ButtonPage.vue` to fix the exact selectors before writing them; state each in the
  readme line.
- Veneer's naming law: `<state>--<variant>.png`, variants `light-1280`, `light-390`,
  `dark-1280`, `dark-390`, states `rest`, `pressed`, `focus`, `hover`, `active`. Veneer's frames
  are page frames for rest, pressed, and focus and element frames (the specimen's border box)
  for hover and active, because a page shot moves the pointer off the specimen.

## Unknowns

Whether the showcase boots from `file://`; whether `#button-toggle` sits inside the initial
viewport at 390 (scroll it into view before driving it, and say so); the exact selectors.
Report each under Output.

## Scope

Owned: `u7f-harness.mjs`, `u7f-harness-readme.md` (one paragraph: how to
run it, the selectors it drives, the unknowns as found), and the output directory
`C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements/` (created by the script,
emptied by the script on each run before writing). Off-limits: every file in every other
directory, both checkouts' source trees included. Tools: Read, Grep, Glob, Write, Bash (to run
the script with `node`).

## Execution

1. Write the script. For each variant (theme × viewport width, height 800): boot the page,
   set the theme, wait for the button page's variants section to render, then in order:
   - `rest`: full-page capture with nothing hovered, focused, or pressed;
   - `pressed`: click `#button-toggle`, confirm `aria-pressed="true"`, full-page capture, click
     again to restore and confirm `"false"`;
   - `focus`: from a neutral state, press Tab until `document.activeElement` is the primary
     specimen (bound the walk at 60 presses; report the count), full-page capture, then blur;
   - `hover`: move the pointer to the primary specimen's centre, confirm
     `element.matches(':hover')`, element capture, then move the pointer to `(0, 0)`;
   - `active`: move to the centre, mouse down, confirm `matches(':active')`, element capture,
     mouse up.
   Write beside the frames one `<variant>.txt` per variant carrying the page's ARIA snapshot of
   the variants section (`locator.ariaSnapshot()`) taken at rest, then one JSON line per step
   `{"action","trigger","result"}`, then the console messages the page emitted (an empty list
   is a reading). Name the frames `elements-button-primary-<state>--<variant>.png`.
2. Run `node u7f-harness.mjs` from the scaffold root once; then list the output
   directory. Open two frames yourself (Read) and confirm each shows the state it claims.
3. Do not run the script a second time after the listing, so the portfolio the Orchestrator
   reads is the one you listed.

## Output

Return, and write to `u7f-harness-report.md`: the readme paragraph; the run's
console output; the output directory listing with byte sizes; the two frames you opened and
what each shows; each unknown as found; the exact `git status --porcelain` of the scaffold
checkout (which must show nothing under `tmp/`, an ignored directory).

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the static-server fallback,
the scroll-into-view, the Tab bound, the wait conditions. Stop on: the showcase failing to
boot both ways; a state the page cannot reach by the input named (report the frame as absent
with the reason, and continue with the rest).

## Acceptance criteria

1. The script runs to completion from a single `node` call and leaves no process or listener.
2. Every reachable state × variant has a frame named by the law, and each variant has its
   `.txt` artifact with a non-empty ARIA snapshot and its step log.
3. The report names each unknown's resolution and any absent frame with its reason.
