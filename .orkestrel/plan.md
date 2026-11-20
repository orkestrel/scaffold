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
- `scaffold` re-pins its runtime `@orkestrel/contract` range at L3, after its runtime dependencies serve.

## Rulings

- 2026-11-20, the user: agent publishes from a clone of `origin/main` at `fdd0996e`, apart from the agent session's unpushed work. The agent session holds its pushes until scaffold posts "AGENT RELEASED", then rebases onto the released `origin/main`.
- 2026-11-20, the user: learn and train are unpublished and outside the wave; they adopt after it closes.
- 2026-11-20, the user: study's session is told its L7 visit before it runs.
- 2026-11-20, the user: every visit passes `--regenerate`, which replaces the lockfile and `node_modules` from the manifest when an install fails `ERESOLVE`.

## ROADMAP items this wave meets

- **43:** this wave re-pins every catalog package to the served contract, tool, server, and mcp releases, which supersedes the 2026-10-01 leftovers. Close it when the exit criterion holds.
- **69:** its trigger, "the next fleet wave", is met. The wave runs the layer tools as throwaway drivers under `tmp/`. Promote the bump, self-pin sweep, release chain, and release-commit writer into an `orkestrel-publish` script with a proof after the wave closes. Owner: scaffold.

## State

- 2026-11-20: L1 published and pushed (round 1). The user ruled the rest of the wave release-ready without publishing overnight: L3 to L7 prove against local tarballs of their unpublished upstream candidates (swap.ts), and the lockfile and the release-mode distribution proof wait for the morning publish.
- 2026-11-20: agent releases from the clone  cut at .

Next action: when L2 is release-ready, run L3 in tarball mode, then L4 to L7, then publish layer by layer with the user's codes.
