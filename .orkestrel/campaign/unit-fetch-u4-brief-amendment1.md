# Unit fetch-U4, amendment 1: the unblocked host baseline, and Sol routing

This amendment supplements `unit-fetch-u4-brief.md` after its deviation stop. The
original stands except where this file changes it. Written 2026-08-22, before the
resumed dispatch. The stop's evidence and the Orchestrator's rulings are in
`unit-fetch-u4a-brief.md`; U4a lands them, and this unit consumes them.

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`,
rooted at `C:/Users/mikes/WebstormProjects/scaffold`. Routed to Sol under
`routing-amendment-cost.md`. You perform the assignment directly inside your sandbox
and spawn nothing beyond the scoped commands named here. Your sandbox denies network,
so every proof drives the loopback fixtures the suite already builds.

## What U4a landed, and what it changes about the original brief

Read the landed shapes yourself rather than trusting this summary; it names what to
look for, not what is true.

- A shared exported predicate in `src/core/helpers.ts` answering whether a vendored
  path's bytes another surface owns — the `guides/*.md` mirrors and
  `CATALOG_AGENT_PATH`. `Materializer` calls it, and so do you.
- `copiesToHost(copies, floor: Host): Host | undefined` — it overlays live copies onto
  the floor, requires every host-owned declared entry to be `found`, and keeps the
  floor's bytes for deferred entries.
- `readHostFloor(root?: string): Host`, exported from `src/server/helpers.ts`,
  resolving the installed vendored root when given no argument.
- `Lookup = 'found' | 'missing' | 'unmatched' | 'failed'` — `unmatched` is a read
  answer admitting no version, `failed` is a read that did not complete.

**The host baseline sequence replaces the original brief's**, which could not produce a
fill:

1. When `--from` names a root, pass that string as `MaterializerOptions.host`
   unchanged, take no host network, and leave `provenance.host` absent — the surface
   was neither read live nor from the installed floor.
2. Otherwise read the floor with `readHostFloor()`. Derive the request set from its
   manifest's destinations minus the deferred ones, using the shared predicate. Ask
   `vendor` for exactly that set, with the bytes best placed to minimize fetches — the
   target's own bytes where the verb has a target, the floor's own bytes for `new`.
   Assemble `copiesToHost(copies, floor)`. Pass `host: fill ?? floor`, so the
   materializer receives a `Host` value on both sides and the verb reports
   `provenance.host` as `live` when a fill was assembled and `floor` when it was not.

**The version rule sharpens with the split union**: `found` is live; `failed` takes the
exact floor with `provenance.versions: 'floor'`; `missing` and `unmatched` are
authoritative absence and keep the existing `FETCH` refusal for the verbs the original
brief names. A row with no concrete floor keeps the refusal too. The original brief's
named unknown is closed by U4a — do not re-verify it, and never compare a note's text
to discriminate.

## Amended criteria

Criterion 4's dark-repository row now has a reachable live side, so it gains a partner
recorded in the same pair: an **aligned live host run** where every host-owned path's
digest matches and `provenance.host` reads `live`, proving the surface can actually go
live. A green live-side reading is what the deviation stop's evidence showed was
missing; without it the fallback rows pass vacuously against a surface that never
works. Everything else in criteria 1 through 6 stands, and criterion 3's typecheck is
unscoped because the tree typechecks clean at your start.

## Scope changes

`src/server/**` stays off-limits: U4a landed every server change this unit needs, and a
further one is a deviation to report rather than an edit to make. The original brief's
owned set is otherwise unchanged.
