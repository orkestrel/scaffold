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
- 2026-11-20: L3 published, each tarball served, and each release commit pushed (round 3), except capture: its development range names guide `^0.0.34`, which served in the same round, so capture settles and publishes with L4. No package from L4 on depends on capture.
- 2026-11-20: capture and L4 published and each release commit pushed (round 4). mcp's release-mode distribution proof composes agent 0.0.47, which requires a provider model; mcp's release commit carries the fixture repair. capture 0.0.12's tarball answered 404 for about 30 minutes after the registry listed the version, then 200.
- Same-layer development closures order the rest: agent's closure names probe 0.0.33, so browser and probe publish first, then agent, then ollama and toolbox, which name agent at runtime, then study.
- 2026-11-20: browser and probe settled. Probe's release-mode distribution proof passed. Browser's failed the five cases its release gate requires a Linux host for, as on 0.0.34 and 0.0.35, and its ordinary mode passed 15 and skipped 9; browser's release commit states the limit.
- 2026-11-20: ollama's `test:service` passed 83 of 84 against the user's daemon at 11434. The dedicated-daemon case, which refuses 11434, passed 1 of 1 against a provisioned 0.40.16 daemon at 127.0.0.1:11435 that was stopped after the run. Ollama's release commit carries both readings.

## Publish procedure

For each layer, L2 first:

1. For each package from L3 on, after its upstream layer serves: restore the committed lockfile from `HEAD`, run `npm install --prefer-online` on Node 22, run `npm run test:distribution -- --mode release`, and amend the lockfile into the release commit. For ollama, also run `npm run test:service` with the user's daemon up.
2. Take the user's one-time code, run `window.ts --publish` for the layer, and confirm each tarball serves.
3. Push each release commit. For agent, push from `agent-release`, then post "AGENT RELEASED" to the agent session.

After L7, release scaffold: re-pin its runtime ranges, run `scaffold catalog --all`, build, and run its chain. Then close the wave per `wave.md` § Close the wave.

Remaining rounds, one one-time code each:

1. browser and probe: published, each tarball served, and each release commit pushed (round 5, 2026-11-20).
2. agent: published from `agent-release`, its tarball served, `a51863eb` pushed, and "AGENT RELEASED" posted (round 6, 2026-11-20).
3. ollama and toolbox: published, each tarball served, and each release commit pushed (round 7, 2026-11-20).
4. study: published, its tarball served, and `de4e789` pushed (round 8, 2026-11-20).
5. scaffold: published 0.0.145, its tarball served, and `4fc341671` pushed (round 9, 2026-11-20): the visit re-pin `956762f5f`, the catalog refresh `5bcb5febd`, and the release.
6. Close the wave per `wave.md` § Close the wave: visit every other catalog package with `--regenerate` to re-pin its trailing development ranges and adopt scaffold 0.0.145, and push each visit whose gates pass, whose ruling reads dist same and ranges same, and whose self-pin hits all sit in vendored mirrors. Agent's visit belongs to the agent session, which owns that checkout.

Run each batch's settle steps (Publish procedure step 1) under one lane ticket on Node 22, so no other ticket runs between a package's install and its distribution proof.

- 2026-11-20: the close round closed and pushed contract and every L1 package, then csv and console, each ruled dist same and ranges same. Agent's close visit is the agent session's (9b0c36dc). Learn and train adopted 0.0.145 (learn 9e2522d, train dd301bd). The round resumes behind the agent session's two solo qualification windows, under the protocol the three sessions agreed on 2026-11-20: one queued heavy ticket per session, a solo ticket announced first, and a queued ticket that yields to higher-priority work on request.

Findings for the debrief:

- The layer plan ignores development edges inside a layer: capture names guide and agent names probe, each in its own layer, so each published one round late.
- capture 0.0.12's tarball answered 404 for about 30 minutes after the registry listed the version.
- Browser's release-mode distribution gate fails five cases on Windows for want of a `/proc` table and a FIFO, as on 0.0.34 and 0.0.35.
- Ollama's dedicated-daemon service case needs a second daemon at 127.0.0.1:11435 (ROADMAP 114).
- After `repair` moves the ranges, the first `swap --pin` exits 1 because every package changed during the install, and a second run exits 0 (train, 2026-11-20).
- `lane.ts` cannot start `npm` or `npm.cmd` on Windows; spawn `npm-cli.js` through Node.
- A visit's pin step re-pinned scaffold's own `vitest` and left `@vitest/browser-playwright` at `^5.1.0`.

Next action: finish the close round, then take a registry sweep and close ROADMAP 43 when it lists no trailing range.
