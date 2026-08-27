# Campaign: propagate the 0.0.57 canon split across the fleet

Date: 2026-08-27. Operator: the Orchestrator, session `claude/scaffold-proposal-impl-nabmm9`.
Subject: every `orkestrel/*` repository, re-pinned to what the registry serves and migrated onto
the canon split that `@orkestrel/scaffold` 0.0.55 introduced.

## What the campaign did to each target

Re-pin every `@orkestrel` range across `dependencies`, `devDependencies`, `peerDependencies`, and
`optionalDependencies` to the version the registry served on 2026-08-27; install; delete the
pre-split catalog agent so `repair` restores the floor body; run `scaffold overwrite`; prove the
sweep with `scaffold audit` exiting 0; run the mutating `format`; then run `format:check`,
`lint:check`, `check`, and `npm test`. Push to `main` only when every gate exits 0.

The visit ran in parallel slices of disjoint repositories, each slice strictly serial inside
itself, per `.agents/skills/orkestrel-publish/references/wave.md`. The gate on the push is what
keeps a red target off `main`: reading "is the tree dirty" instead of "did this target pass" is
what pushes a red target the moment one exists.

## Landed on main

`orkestrel/scaffold` at `2f2cb65`, carrying the 0.0.56 and 0.0.57 releases.

`orkestrel/contract` at `efbca90`. It was already split, so its visit was the re-pin, the catalog
table refresh, and the re-fetched `guides/scaffold.md`.

These targets took the full pre-split migration and landed green: abort, agent, browser, budget,
console, csv, database, emitter, form, guide, html, indexeddb, interpret, lsp, markdown, mcp,
middleware, msg, ndjson, ollama, pool, process, program, qualifier, queue, rater, reason, relation,
router, sea, server, sqlite, sse, table, template, terminal, test, timeout, tool, toolbox,
websocket, worker, workflow, workspace, and probe.

A sweep comparing each checkout's `HEAD` against `git ls-remote origin main` reported 46 of 47
targets matching.

## Held back

**`brief`** — committed locally, not pushed. One test fails deterministically:

```text
tests/src/core/helpers.test.ts > briefToMarkdown >
  references a path and never inlines what lives at it
AssertionError: expected 19 to be greater than 20
```

The test reads this repository's own `AGENTS.md` as a corpus of real file content and guards that
the corpus is substantial with `expect(substantial.length).toBeGreaterThan(20)`. The canon split
replaced the vendored `AGENTS.md` with the pointer, whose trimmed lines longer than 40 characters
number 19. The behaviour under test still holds — no line of the corpus appears in the rendered
brief. The guard's own assumption is what the split falsified. Fix by lowering the guard, or by
drawing the corpus from a file the split does not shrink, such as the installed canon `AGENTS.md`
under `node_modules/@orkestrel/scaffold/dist/host/`.

**`supervisor`** — no visit landed. Its `package.json` carries the re-pin and nothing else ran,
because the install refuses:

```text
npm error ERESOLVE unable to resolve dependency tree
npm error Found: @orkestrel/server@0.0.15
npm error Could not resolve dependency:
npm error peer @orkestrel/server@"^0.0.14" from @orkestrel/mcp@0.0.25
```

The published `@orkestrel/mcp` 0.0.25 declares a peer range of `@orkestrel/server` `^0.0.14`, and
the registry serves `server` 0.0.15. Any consumer taking both at what the registry serves hits
this. The `mcp` checkout now declares the peer at `^0.0.15` and that fix is on `main`, so the block
clears when `mcp` republishes. Until then `supervisor` installs only by holding `server` at
`^0.0.14` or by waiving peer resolution, and waiving it writes a lockfile that does not describe a
resolvable tree.

`supervisor` is also the one target whose local `version` runs ahead of the registry: the
manifest reads 0.0.2 and the registry serves 0.0.1.

## The republish debt this exposed

Testing each final runtime and peer set against the published packument, rather than against "did
my step move a pin", is what `wave.md` § Rule on the bump requires. That test reports a debt far
larger than this campaign created.

Most of the drift already stood on `main` before the visit. For `pool`, `process`, `program`,
`qualifier`, `queue`, `router`, and `worker` the visit moved no runtime or peer range at all, and
their manifests still disagree with their packuments. Their `main` branches have been carrying
unpublished runtime re-pins.

What the visit added on top:

| Package      | Added by this campaign                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `agent`      | runtime `workflow` `^0.0.14` → `^0.0.15`                                                                                |
| `guide`      | runtime `markdown` `^0.0.11` → `^0.0.12`                                                                                |
| `mcp`        | peer `server` `^0.0.14` → `^0.0.15`                                                                                      |
| `middleware` | peer `database` `^0.0.11` → `^0.0.12`, peer `server` `^0.0.14` → `^0.0.15`                                              |
| `toolbox`    | runtime `terminal` `^0.0.12` → `^0.0.13`, runtime `workflow` `^0.0.14` → `^0.0.15`                                     |
| `supervisor` | runtime `contract` `^0.0.12` → `^0.0.13`, `database` `^0.0.11` → `^0.0.12`, `emitter` `^0.0.7` → `^0.0.8`, `process` `^0.0.4` → `^0.0.6`, `workflow` `^0.0.13` → `^0.0.15` |

Read the `supervisor` row against its pre-visit manifest rather than against the packument: its
visit never committed, so a comparison keyed to the visit commit reports its whole drift as
standing debt.

Closing the debt republishes these, in layer order, where `*` marks a package whose own manifest
moved and the rest follow because a runtime dependency of theirs republishes:

```text
L2  middleware *, pool *, process *, router *
L3  guide *, lsp, mcp *, qualifier *, queue *, scaffold, sea, server
L4  probe, program *, worker *, workflow
L5  agent *, supervisor *
L6  ollama, toolbox *
```

Under `0.0.x` a caret pins one exact release, so a dependent sees a new version only after it
re-pins and republishes. Publishing any of these reaches no consumer on its own.

## Findings outside the visit

`scaffold` still ships a stale catalog table. Its `.claude/agents/orkestrel.md` names
`@orkestrel/scaffold` at 0.0.54, and `host.json` lists that path, so the file is published surface.
Regenerating it with `scaffold catalog` moves `dist/host` and therefore obliges a scaffold bump and
release rather than being a free refresh.

Every target's `scaffold audit` reports the same dependency finding: `typescript declares major 6,
while the registry serves major 7`. It is a finding rather than a drift, and no gate fails on it.

## Instruments

The campaign's scripts are `repin.mjs` (surgical range rewrite over a manifest), `visit.sh` (one
target's visit, pushing only on green), `worker.sh` (one serial slice), `packument.sh` (read the
published runtime and peer sets), `oblige.mjs` (test the final set against the packument and close
the cascade), and `attribute.mjs` (split drift into standing and session-added).

One harness defect is worth recording, because it produced a false red. `visit.sh` runs `npm test`
without a preceding `npm run build`. Only `probe` has entry tests under `tests/src/bin` that read a
built `dist/bin/main.js`, so only `probe` was affected: it reported a missing module plus timeouts
in its process-spawning tests while three slices ran concurrently. Built and re-run alone on an
idle container it passes src 218, policy 111, config 46, setup 3, and guides 13, and it is on
`main`. A timing failure taken under load is a question rather than an answer, and the deciding
re-run belongs to the Orchestrator after the units exit.
