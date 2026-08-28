# First distributable inventory — after the dependency update (2026-08-28)

State of the published surfaces after the fleet dependency update, the `scaffold overwrite` pass,
and the process 0.0.9 re-pins, before any src-audit fix lands. Derived from the campaign
instruments (`distdiff.mjs` rebuilt-`dist/`-versus-tarball comparison, `manifestdiff.mjs`
consumer-visible manifest split; controls recorded under Instruments in
`npm-audit-deps-findings.md`). Publishing is the user's decision and is held by the 2026-08-28
ruling; the second inventory after the fix phase supersedes this one for the actual wave.

## What the dependency update moved

The update touched development declarations almost everywhere (`@orkestrel/probe` `^0.0.11` and
`@orkestrel/scaffold` `^0.0.59` development pins across the fleet, `@modelcontextprotocol/conformance`
`0.2.0-alpha.11` in `mcp`) and peer declarations in `middleware`, `probe`, and `test`. A
development bump obliges no publish. A peer declaration is part of the packed manifest, so those
packages move on their own account even with `dist/` byte-stable.

## Movers, grouped by publish layer

| Layer | Package | Published | Moved surface | Cause |
| --- | --- | --- | --- | --- |
| L0 | `test` | `0.0.11` | manifest | peer `vitest` `^4.1.11` |
| L2 | `middleware` | `0.0.18` | manifest | peer `@orkestrel/server` `^0.0.17` |
| L3 | `lsp` | `0.0.5` | manifest | runtime `@orkestrel/process` `^0.0.9` |
| L3 | `mcp` | `0.0.27` | manifest | runtime `@orkestrel/process` `^0.0.9` |
| L3 | `sea` | `0.0.13` | manifest | runtime `@orkestrel/process` `^0.0.9` |
| L3 | `scaffold` | `0.0.59` | `dist/src`, `dist/host`, manifest | pre-existing stale generated pins and vendored catalog; runtime `@orkestrel/process` `^0.0.9` |
| L4 | `probe` | `0.0.11` | manifest | peer `oxlint` `^1.80.0`, `typescript` `^6.0.3`, `vitest` `^4.1.11`; runtime `lsp`/`mcp` re-pins follow their releases |

Every other package: rebuilt `dist/` byte-stable against its tarball and every manifest change
development-only, so the campaign branch commits satisfy the obligation and no publish follows
from the dependency update.

## Publish order for this standing state

Layer order over the movers, honoring runtime pins:

1. `test` (L0), `middleware` (L2) — independent of every other mover.
2. `lsp`, `mcp`, `sea` (L3) — the process 0.0.9 runtime re-pin. `scaffold` (L3) on its own
   account in the same round.
3. `probe` (L4) — re-pin `@orkestrel/lsp` and `@orkestrel/mcp` to the round-2 releases, gates,
   publish.
4. Propagation, no publish: fleet development re-pins of the released versions ride the next
   ordinary commit in each repo.

The fix phase moves more distributables (the all-succeed and kind-purity rulings are behavioral),
so this order is a record of the pre-fix state, not the wave to run.
