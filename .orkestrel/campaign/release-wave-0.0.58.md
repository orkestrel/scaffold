# Release wave 0.0.58 — 2026-08-27

The wave republished every package whose distributable moved after the 0.0.57 propagation, in
rounds ordered over runtime and peer dependency edges, and closed with a fleet propagation pass.

## Rounds on the registry

- R1: guide 0.0.15, pool 0.0.9, process 0.0.7, qualifier 0.0.12, queue 0.0.11, router 0.0.12
- R2: lsp 0.0.4, program 0.0.11, sea 0.0.12, server 0.0.16, worker 0.0.10, workflow 0.0.16
- R3: agent 0.0.19, mcp 0.0.26, middleware 0.0.18
- R4: probe 0.0.10, toolbox 0.0.10, ollama 0.0.13
- R5: scaffold 0.0.58

Each round's preparation re-pinned every `@orkestrel` range to what the registry served, bumped
from the registry-served version, regenerated the lockfile so it carries the release version, ran
`prepublishOnly` green, and pushed before its upload window. Each upload was confirmed from the
registry's versions list. A dist-tag read can lag the versions list and did for toolbox 0.0.10.

## Rulings

- TypeScript stays `^6.0.3`, per the user's instruction and the fix-round record: TypeScript 7
  drops the JS compiler API that `tests/setupPolicy.ts`, the `unplugin-dts` build, and `probe`
  depend on.
- A peer pin names a registry version the way a runtime pin does, so `mcp` and `middleware`
  publish after `server`. `mcp` 0.0.26 ships peer `@orkestrel/server` `^0.0.16`.
- `supervisor` is excluded from the wave by the user's instruction. Its checkout carries local
  commits only; nothing pushed, nothing published.
- `ollama`'s service gate ran against a live daemon stood up from the user's environment script;
  `test:service` passed under 0.0.13.
- scaffold's manifest fixture snapshots derive dev-dependency floors from scaffold's own manifest,
  so the release regenerated them; the reviewed diff carried exactly the guide, probe, and
  scaffold pin moves.

## Propagation

Every fleet target except `supervisor` received the propagation visit: re-pin to the post-wave
registry sweep, lockfile regeneration, `scaffold overwrite --dirty` — the waiver covers the
visit's own uncommitted re-pin — `scaffold audit` exit 0, format, and the acceptance gates, then
one commit pushed to `main`. Every target reported PROPAGATED. `probe` ran alone so its
timing-sensitive suite read an idle container. scaffold's own catalog table was regenerated after
its publish, so the catalog row for scaffold names 0.0.58.
