# Precondition census — scaffold 0.0.49 release wave

Taken 2026-08-22, before any target was written to. Every row comes from
`node /home/user/scaffold/dist/bin/main.js audit --json --target <repo>` — the wave's own 0.0.49
CLI reading each target explicitly, never the target's installed binary.

## Fleet

48 repositories under `/home/user` declare an `@orkestrel/*` name. Every one sits on its
`origin/main`, clean, with no unpushed commits, and every local version equals what the registry
serves.

## Deletion exposure: none

`overwrite` deletes only findings whose `drift` is `foreign`. **No target carries a foreign
finding.** The destructive step is inert across the whole fleet, so the wave deletes nothing.

Read `drift` for this, never `ownership`. The audit's `content`, `birth`, and `presence` values are
ownership; `drift` takes `aligned`, `stale`, `missing`, or `foreign`, and only the last is a
deletion candidate.

## Missing planned dependency

29 targets do not declare `@orkestrel/probe`, which `overwrite` refuses to proceed without. The
remaining 19 already declare it, or runtime-depend on it, or are `probe` itself — the planned set is
derived per target from its own audit, never added uniformly.

## Drift populations

The fleet splits by how far behind each target's vendored host is.

- **Heavy, 40 or more stale paths** — `abort budget console csv database emitter form guide html
  indexeddb interpret markdown msg ndjson ollama pool rater reason relation server sqlite sse table
  template terminal timeout tool websocket workspace`. Their drift concentrates in the
  `orchestration` group (42 paths in `abort`), meaning the vendored contract, rules, and skills.
- **Light, 1 to 39** — `agent brief browser contract mcp middleware probe process program qualifier
  queue router scaffold sea supervisor worker workflow`.
- **None** — `test toolbox`.

## Runtime-range drift

28 of the 48 declare at least one `@orkestrel` runtime range older than the version the registry
serves, so `overwrite`'s `declare` step moves published surface in each and obliges a bump:
`abort budget console csv database emitter form guide html indexeddb interpret markdown ndjson
ollama probe rater reason relation sea server sqlite supervisor table template terminal timeout
tool workspace`.

`scaffold` is not among them: its runtime pins already name exactly what the registry serves, which
is what keeps a mid-wave scaffold release from re-vendoring targets the wave has already visited.

## Bench substitution on the record

The Cursor Grok absorption lane for this campaign is **dark**. Its journal at
`tmp/cursor/grok-scaffold-49.log` stayed 0 bytes with no live process, and a bench unit with no
journal ran on its driver's engine rather than on Grok. Its questions were answered instead by the
Opus planner reading scaffold's source directly and by the measurements recorded here.
