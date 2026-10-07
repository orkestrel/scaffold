# The Tailwind removal (landed on veneer `main` at `67a3143`, 2026-10-07)

The user's order: "get rid of the tailwindcss surface completely, everywhere from this veneer repo, it's no longer to be a part of this repo." Three Opus units on separate worktrees at `433cc3e` (`units.md`), merged as `25f5839` (the sheets, the server-side proofs, the configs, the manifest, the prose) and `29fca02` (the showcase and the browser-side proofs) with the guide realignment `67a3143`; 84 files, 2,278 insertions, 79,599 deletions against `433cc3e`; `grep -ri tailwind` over the tree outside `node_modules`, `dist`, `tmp`, and `.git` returns nothing.

## Files

- `units.md`: what each unit deleted, rewrote, kept, and read.
- `gates.md` and `gates.json`: the gate chain on the landing (every suite, the journey 85 of 85, format after the realignment).
- `compare-67a3143.md`: the journey compare of `runs/tw-journey-2` against `runs/landing-a1db33f-journey`: 705 rows, lines, and journal entries removed (the Tailwind readings, the three-face engine rows, the preservation, partition, containment, and progress rows), 24 added (the contrast readings under the one sheet in both color modes, the Clipboard copy journal, the census and 390-header lines), 0 changed, and the row order of the four variants, which the removals move. The compare's registration gate refuses the count change (85 against 109) by design.
- `mcp-handshake.ts`: the stdio handshake used to prove the MCP servers start (`initialize`, `tools/list`).

## The page

`showcase/browser.html` built twice to sha256 `882ca266dc5680a2b3322bebffa84e7af2071753533b4e31233a475234dbd76d` (957,951 bytes; `runs/tw-page-1`, `-2`): 80 sections, the Tailwind section gone and a Clipboard copy section added last, one sheet in light and dark.

## MCP servers (2026-10-07, after the landing)

The project entries in the Claude Code configuration spawn `node node_modules/@orkestrel/browser/dist/bin/main.js` (`browse`, with `BROWSE_EXECUTABLE`) and `node node_modules/@orkestrel/probe/dist/bin/main.js` (`probe`) from the veneer checkout on demand; no server process persists between sessions, so a restart is the next spawn. Handshakes from the checkout: `browse 0.0.26`, 22 tools; `probe 0.0.21`, 1 tool (`prove`), which answers after a warm-up longer than 20 s. Probe 0.0.21 is the registry's latest. The re-pin (`931f18c`: `@orkestrel/browser` `^0.0.27`, the lockfile, the `guides/browser.md` mirror and the catalog table through `scaffold catalog`) puts 0.0.27 behind the `browse` entry; its handshake from the checkout reads `browse 0.0.27`, 19 tools (0.0.26 listed 22: `look`, `plain`, and `tabs` left the surface upstream). Gates on the re-pin: config 227, policy 119, setup 139, guides 15 (`runs/repin-*`).
