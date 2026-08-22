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

## Bench record

The Cursor Grok absorption lane ran on its second attempt. Its first attempt timed out at 300s with
an empty journal and was discarded; the run that returned wrote 15871 bytes to
`tmp/cursor/grok-scaffold-49.log`. Read a bench's liveness from its journal rather than from its
driver's status line: an empty journal at one reading is not a dark bench when the driver is still
retrying.

Grok could not answer what moved between 0.0.46 and 0.0.49: the checkout is shallow at `650c0cb`
with no tags, so no release diff is reachable from it. That question stays open and is not load
bearing for this wave, whose input is the 0.0.49 tree as it stands.

Grok's finding that `declare` reads ranges from the target's own manifest, checks them live against
the registry, pins each to the latest its major admits, and refuses to insert a name the manifest
does not already declare, is what makes the planned-dependency pre-step necessary rather than
optional.
