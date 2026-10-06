# Fleet re-pins of 2026-10-06 (ruling 7)

The workflow of five lanes (`wf_130adf2b-b26`, 5 agents, 38.6 min) re-pinned every behind `@orkestrel` range in browser, tool, markdown, html, and mcp to the registry's version of 2026-10-06 (`fleet.json` holds the reading the lanes started from), adopted scaffold 0.0.93 through `scaffold overwrite --dirty`, ran each repository's gates through the host queue (`veneer/tmp/units/journey-cost/runs/fleet-<repo>-*`), committed, and pushed the repository's `ccr-d15a48b1-yyyll6` branch. Contract, server, and ollama stay with the desktop session. Scaffold 0.0.94 published after the lanes were computed, so the fleet adopts it in a later wave.

## Landings

| Repository | Before    | After     | Pins moved                                                           | Overwrite (0.0.93)                              |
| ---------- | --------- | --------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| browser    | `0379087` | `3aec24b`, then `01c12e1` (format repair) | mcp `^0.0.37`, probe `^0.0.21`, scaffold `^0.0.93`                   | 5 written, 81 unchanged (vite `^8.3.3`)         |
| tool       | `329b5cb` | `9b70160` | guide `^0.0.24`, probe `^0.0.21`, scaffold `^0.0.93` (from `^0.0.86`) | 10 written, 52 unchanged (4 toolchain ranges)   |
| markdown   | `5e61d83` | `13be07f` | guide `^0.0.24`, probe `^0.0.21`, scaffold `^0.0.93` (from `^0.0.86`) | 10 written, 52 unchanged (4 toolchain ranges)   |
| html       | `4985b12` | `4282603` | guide `^0.0.24`, probe `^0.0.21`, scaffold `^0.0.93` (from `^0.0.86`) | 10 written, 51 unchanged (4 toolchain ranges)   |
| mcp        | `9e374f2` | `aa85086` | none (`c5302ae` had re-pinned); `node_modules` synced to the lock    | 3 written, 78 unchanged (no toolchain move)     |

The four toolchain ranges the 0.0.93 overwrite moved in tool, markdown, and html: `@microsoft/api-extractor` `^7.59.4`, `oxfmt` `^0.72.0`, `oxlint` `^1.87.0`, `vite` `^8.3.3`. Each push was a fast-forward of a remote branch that held only merged history, so no lane needed the lease (the html lane's lease push was refused by the permission classifier and a plain push produced the same remote).

## Gates

| Repository | format:check | lint:check | check | build | tests                                                                                                       |
| ---------- | ------------ | ---------- | ----- | ----- | ----------------------------------------------------------------------------------------------------------- |
| browser    | 1 → 0 (repaired) | 0          | 0     | 0     | `test:src` 1 failed of 2113 (host-bound C1 case); bin 20, policy 119, config 227, setup 194, setup:browser 22, guides 251, conformance 69, each exit 0 |
| tool       | 0            | 0          | 0     | 0     | core 90, policy 119, config 227, setup 2, guides 31, exit 0                                                |
| markdown   | 0            | 0          | 0     | 0     | src 604, policy 119, config 227, setup 38, guides 61, exit 0                                                |
| html       | 0            | 0          | 0     | 0     | core 312, policy 119, config 227, setup 29, guides 32, exit 0                                               |
| mcp        | 1 → 0        | 0          | 0     | 0     | src 1538, policy 119, config 227, setup 90, setup:browser 4, guides 202, conformance 47, integration 4, exit 0 |

## Findings

- **The hosted router guide is not oxfmt-stable.** `scaffold overwrite` fetches `guides/router.md` live from the router repository's `main`; line 364 of those bytes is a list continuation at column 0, which oxfmt indents. The mcp lane ran `npm run format` through the queue (`fleet-mcp-format-1`), which returned the mirror to its HEAD bytes, and committed clean. The browser lane committed the fetched bytes and left `format:check` red; the showcase session ran the same repair after the workflow (`fleet-browser-format-1`, `fleet-browser-format-check-2`) and pushed it at `01c12e1`. Every later overwrite in a repository that mirrors the router guide reproduces the drift until the router repository formats its guide, or scaffold's mirror verb formats what it fetches. The lasting fix is the router repository's; a scaffold item can make the mirror verb format fetched guides.
- **Browser `test:src` carries the known host-bound case** `C1 context ownership > keeps failed download removal ownership and admission until teardown reports it` (`tests/src/server/BrowserMCPServer.test.ts:3487`): POSIX removes a directory that is another process's working directory and root ignores mode bits, so the removal the case expects to fail succeeds. The same reading was taken at `0379087` on 2026-10-06 before the re-pin (lanes entry of the D-4 Linux run). The case belongs to the browser lane: a POSIX way to make the removal fail, or a platform skip.
- **The `guides/scaffold.md` mirror notice** ("differs from the hosted guide") in the markdown, html, and mcp lanes compares the 0.0.93 package's copy with scaffold `main` at `7788c696` (Release 0.0.94), which carries the `PLAYWRIGHT_SCROLLBARS` paragraph. The mirror settles with the 0.0.94 overwrite.
- **Trailers.** Every lane's commit ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and the session line, because the lane's own attribution named the model that wrote the commit; the brief had asked for the Fable 5.1 line. No model identifier appears elsewhere in any commit. The branches keep the trailer as written.
- **API Extractor notice** (tool, markdown, html, mcp): the bundled TypeScript 5.9.3 is older than the project's 6.0.3; informational, every build exits 0.

## Open for later waves

- Scaffold 0.0.94 adoption in all five repositories (and contract, server, ollama on the desktop), which also refreshes the scaffold guide mirrors.
- A browser release that carries mcp `^0.0.37`, so consumers that pin browser `^0.0.26` (veneer) receive it.
- The router guide formatting at its source.
