# Unit B2: recheck the veneer showcase through the browse server

## Role and engine

GPT-6 Astra lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host. Perform the work yourself and spawn nothing. This unit is exploratory: it writes nothing tracked and commits nothing.

## Objective

Drive the built showcase the way an agent would, through the `browse` MCP server of `@orkestrel/browser` 0.0.20 and only its own tools, and report what an agent can and cannot check on the page: arrival, both header axes, the contents, every live component family, and one recorded journey replayed as-is.

## Context

- **Checkout.** `/home/user/.wave/veneer-wt-sc`, a worktree of veneer detached at `fc4c4a2` (the showcase with the statecharts, rigor, and polish rounds), with its own `node_modules`. Write only under its ignored `tmp/` and under `/home/user/.wave/b2/`. Run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true` before every `npm` or `node` command and vite through `./node_modules/.bin/`.
- **The page.** `showcase/browser.html` is the committed single-file build. Serve it with `./node_modules/.bin/vite preview --config configs/app/vite.showcase.config.ts --port 4790 --strictPort` (confirm the URL it serves `browser.html` at), and stop the server at the end by its port.
- **The browse server.** Start it over stdio as a local MCP registration does: `node node_modules/@orkestrel/browser/dist/bin/main.js` with `BROWSE_HEADLESS=true`, `BROWSE_EXECUTABLE=/opt/pw-browsers/chromium`, and `BROWSE_ROOT` set to a directory under `tmp/`. Drive it with a scratch client under `tmp/` built on `createMCPClient` from `@orkestrel/mcp` and `createStdioClientTransport` from `@orkestrel/mcp/server`, resolved from the installed browser package; `/home/user/.wave/check-live.mjs` and `/home/user/.wave/drive-browse.mjs` are working examples. List the tools first and use each tool as its description says; never reach the page through Playwright, CDP, or `evaluate`-style escapes, because the question is what the agent-facing tools can do.
- **Known gaps, filed as browser `ROADMAP.md` items 6 to 8 (`/home/user/browser/ROADMAP.md`):** the server sets no viewport (pages render at its launch default), the toolset saves a screenshot only inside a replay, and a click after a smooth scroll can fail its hit test with the uncoded `No node found at given location`. Confirm or refute each with a transcript excerpt; report any further gap as a proposed item in the same form (the gap, the code it changes cited as `path:line` under `/home/user/browser/src/`, and the run behind it).
- **Ownership.** The page (`app/browser/`) and its tests belong to this session; the engine (`src/browser/`) belongs to another session. Report a page defect with the fragment and line; report an engine defect with the transcript and the Bootstrap behaviour it departs from (`node_modules/bootstrap/js/src/`), for the engine session.

## Do

1. **B1 arrival.** Navigate and look: the banner, the four header buttons with their pressed states, the status sentence, and the contents.
2. **B2 and B3 header axes.** Switch to `Bootstrap with Tailwind` and back, and to `Dark` and back; read the status sentence after each.
3. **B4 contents.** Follow at least eight contents links spread across all groups, reading the landing heading after each; record them as one journey and replay it; when a click fails after a smooth scroll, record what a `wait` or a `look` between clicks changes.
4. **B5 live components.** Through `click`, `press`, `type`, `look`, `read`, and `wait` only, drive one door into and one door out of each family on the page: button toggle, alert dismiss, collapse, accordion, tab with the arrow keys, dropdown with an item, tooltip, popover, toast show and dismiss, carousel next and an indicator, offcanvas open and Escape, modal open, Escape, and the static dialog's refusal, the dialog's nested menu, the navbar toggler, and the scrollspy. Report per family whether the tools reached each door and what the view reported after it.
5. **B6 recorded journey.** Record one journey over the live components (open the archive dialog, close it, open the side panel, close it), save it with a description, replay it as-is, and report its step count and result.
6. Stop the preview server and the browse server; leave the tracked tree clean (`git status --porcelain` empty).

## Output

Your final message is the report: one row per check with its result and a transcript excerpt; every page defect, engine defect, and browse gap with its evidence and owner; items 6 to 8 confirmed or refuted; proposed browser `ROADMAP.md` items in full; the paths of the driver, the transcripts, and the saved journeys under `tmp/`.

## Deviation contract

Stop and report when the browse server cannot start, when the sandbox refuses an action, or when a check would need a tracked edit.
