# Fleet wave: contract 0.0.27, codec 0.0.13, and scaffold 0.0.144

## Goal

Every published `@orkestrel` package serves a release whose runtime ranges name `@orkestrel/contract` `^0.0.27` and `@orkestrel/codec` `^0.0.13` where it depends on them, and whose development ranges name `@orkestrel/scaffold` `^0.0.144` with that release's overwrite applied.

**Exit criterion:** a registry sweep after the last layer lists no trailing `@orkestrel` range in any catalog package, and every release commit is pushed after its version is served.

## Governing skills

- `orkestrel-publish` (`.agents/skills/orkestrel-publish/SKILL.md`): visits, bump rulings, layer preparation, windows, and the close.
- `orkestrel-parallel`: one heavy lane ticket at a time on the host lane.

## Order

The catalog table in `.claude/agents/orkestrel.md` fixes the layers (`wave.ts --plan`).

- L0 `contract` 0.0.27 and L1 `codec` 0.0.13 are served (2026-11-20).
- Every other package in L1 to L7 owes a visit, a bump, and a publish.
- `scaffold` releases last, after L7 serves: no package depends on it at runtime, so one release re-pins its runtime ranges (contract, console, markdown, process, and template) and refreshes the catalog with every version the wave published.

## Rulings

- 2026-11-20, the user: agent publishes from a clone of `origin/main` at `fdd0996e`, apart from the agent session's unpushed work. The agent session holds its pushes until scaffold posts "AGENT RELEASED", then rebases onto the released `origin/main`.
- 2026-11-20, the user: learn and train are unpublished and outside the wave; they adopt after it closes.
- 2026-11-20, the user: study's session is told its L7 visit before it runs.
- 2026-11-20, the user: every visit passes `--regenerate`, which replaces the lockfile and `node_modules` from the manifest when an install fails `ERESOLVE`.

## ROADMAP items this wave meets

- **43:** this wave re-pins every catalog package to the served contract, tool, server, and mcp releases, which supersedes the 2026-10-01 leftovers. Close it when the exit criterion holds.
- **69:** its trigger, "the next fleet wave", is met. The wave runs the layer tools as throwaway drivers under `tmp/`. Promote the bump, self-pin sweep, release chain, and release-commit writer into an `orkestrel-publish` script with a proof after the wave closes. Owner: scaffold.

## State

- 2026-11-20: L1 published and pushed (round 1). The user ruled the rest of the wave release-ready without publishing overnight.
- 2026-11-20: agent releases from the clone `agent-release` cut at `fdd0996e`.
- 2026-11-20: the first L2 night run resolved `node` from the user registry PATH to Node 24, which failed two router tests; the driver now puts its own Node first on PATH, and every chain ran on Node 22.
- 2026-11-20: L2 to L7 are release-ready and unpublished, each a local `Release <version>` commit on `main`, unpushed:
  - L2: console 0.0.23, csv 0.0.17, database 0.0.29, form 0.0.21, markdown 0.0.24, msg 0.0.20, pool 0.0.24, process 0.0.23, reason 0.0.21, router 0.0.25, sse 0.0.17, table 0.0.20, template 0.0.17, tool 0.0.26, websocket 0.0.22.
  - L3: capture 0.0.12, guide 0.0.34, interpret 0.0.26, lsp 0.0.18, qualifier 0.0.25, queue 0.0.26, rater 0.0.25, relation 0.0.27, sea 0.0.26, server 0.0.31, terminal 0.0.29, workspace 0.0.22.
  - L4: brief 0.0.21, mcp 0.0.46, middleware 0.0.37, program 0.0.24, worker 0.0.26, workflow 0.0.32.
  - L5: browser 0.0.36, probe 0.0.33, agent 0.0.48 (clone `agent-release`).
  - L6: ollama 0.0.45, toolbox 0.0.36. L7: study 0.0.29.
- L2 chains ran whole, distribution included. L3 to L7 chains ran against packed tarballs of their unpublished upstream candidates, staged through npm `overrides` because `swap.ts`'s single-pin proofs refuse a whole-wave staging, with `test-distribution` omitted. Each holds its staged lockfile uncommitted. Ollama also omitted `test-service`: the daemon on 11434 was down, and the user ruled it is not restarted.
- Repairs the wave needed, each its own commit: server's guide names router for 0.0.31 (server `cceff06`); capture's closure budget sized from a contended run (capture `9d6116e`); mcp's distribution composition moved to the wave's releases (mcp `587b84d`); browser's HAR creator stamped 0.0.36 (browser `0370c43`); toolbox's scripted provider names its model (toolbox `cac49cb`).
- Declaration-only renames from the server scope's WebWorker library (test, worker, middleware, toolbox) keep every public name; each release commit names its rename.
- Chromium builds 1254 and 1255 are installed for the browser projects.
- 2026-11-20: L2 published, each tarball served, and each release commit pushed (round 2). L3 settles against the registry: each package's lockfile is installed from the registry, its release-mode distribution proof runs, and both are amended into its release commit, whose message names the `npm pack` staging.

## Publish procedure

For each layer, L2 first:

1. For each package from L3 on, after its upstream layer serves: restore the committed lockfile from `HEAD`, run `npm install --prefer-online` on Node 22, run `npm run test:distribution -- --mode release`, and amend the lockfile into the release commit. For ollama, also run `npm run test:service` with the user's daemon up.
2. Take the user's one-time code, run `window.ts --publish` for the layer, and confirm each tarball serves.
3. Push each release commit. For agent, push from `agent-release`, then post "AGENT RELEASED" to the agent session.

After L7, release scaffold: re-pin its runtime ranges, run `scaffold catalog --all`, build, and run its chain. Then close the wave per `wave.md` § Close the wave.

Next action: publish L3 with the user's one-time code after each L3 package settles.
