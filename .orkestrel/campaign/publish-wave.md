# The four-package publish wave

The campaign state, for a session that picks this up cold. Each package's own briefs, verdicts, and
unit reports live in that package's `.orkestrel/<name>/`. This file records only what spans them.

## The goal and its exit criterion

Bring `@orkestrel/process`, `@orkestrel/mcp`, `@orkestrel/probe`, and `@orkestrel/scaffold` to
production readiness and publish them. The criterion: every audit finding is implemented, repaired,
retained, or intentionally excluded on evidence; the gates are green in each repository; and the four
are on the registry in layer order.

## Layer order, and what moves

Derived from runtime `dependencies` alone, and re-derived rather than remembered:

```text
process 0.0.4  →  { mcp 0.0.20, scaffold 0.0.45 }  →  probe 0.0.1
```

Registry state read 2026-08-20: process 0.0.3, mcp 0.0.19, scaffold 0.0.44, probe absent.

Every third-party `@orkestrel` pin across the four is already at registry latest — contract 0.0.12,
emitter 0.0.7, sse 0.0.5, tool 0.0.11, websocket 0.0.9, router 0.0.10, server 0.0.14, queue 0.0.9,
timeout 0.0.7, console 0.0.9, markdown 0.0.9, template 0.0.4. Zero drift.

Only these pins move in the wave, and none forces a source change:

| Consumer | Pin | To |
| -------- | --- | -- |
| `mcp` | `@orkestrel/process` | `^0.0.4` |
| `scaffold` | `@orkestrel/process` | `^0.0.4` |
| `probe` | `@orkestrel/mcp` | `^0.0.20` |

`mcp` imports only `Process` and `PROCESS_GRACE`, neither renamed by process 0.0.4's `run` to
`execute` change. `scaffold` already followed that rename.

All four manifests carry `publishConfig.access: public` and a `prepublishOnly` chain. `probe` is a
first publish, so its packument serves 404 for minutes after a successful upload — treat that as
pending rather than failed.

`script` is present on this host, so the TTY the npm approval flow needs is satisfiable here.
`npm whoami` returns 401: the credential is the owner's and the login needs them at the keyboard.

## What the audits found

Every package was audited by GPT-5.6 Sol, an engine that wrote none of the fixes. All four returned
FAIL. Each verdict is in that package's `.orkestrel/<name>/`.

- **process** — a count in a test comment; a positional tally in a public helper's contract; a guide
  claim that flagship fences are transcribed when several are not. The packed-artifact claim came
  back UNRESOLVED because the read-only sandbox denied npm its cache; that reading is the
  Orchestrator's to take with `npm run build && npm pack --dry-run`.
- **mcp** — two transport release defects, both now fixed and pushed; a guide that asserts checks the
  parity gate and the policy suite never execute; a distribution gate that never inspects the packed
  file inventory; counts surviving in test comments.
- **probe** — containment is lexical, so a symlink lets it write and delete outside the workspace;
  the sweep deletes a caller's own unmarked file; a receipt is minted over an instrument failure;
  the public surface carries pass-through factories and a rename-only getter; the error axis
  overlaps so a caller cannot tell their fault from the tool's.
- **scaffold** — the count ban quotes positional references in the line that bans them; it does not
  decide `both`; positional references survive across the canon; campaign-added instructions carry
  clauses that argue rather than direct.

## Rulings taken from the chair

- **Module resolution is left exactly as declared.** Every package in the wave sets
  `module: ESNext`, `moduleResolution: bundler`, `target: ESNext`, and `lib: ESNext, DOM,
  DOM.Iterable`, with an `engines` floor of Node 22.12 or later. Two audit lanes tested resolution
  under a `node10`/`node16`/`bundler`/`nodenext` matrix on their own initiative and reported `node10`
  failures — mcp has no `typesVersions`, and probe resolves its root but not its `./server` subpath.
  Neither is a defect: `node10` appears in no configuration this fleet owns. Add no `typesVersions`,
  and add no declaration of non-support either. The owner's ruling: do not constrain beyond what is
  declared, in either direction.

  The stale `sideEffects` row probe carries for an unshipped `src/bin/main.ts` is unrelated to
  resolution, and it is scaffold-generated — `compilers.ts` emits the source entry for any blueprint
  with a bin. It is a successor scaffold finding, not a probe fix and not a wave fix: changing it
  re-plans the manifest of every target for dead weight that breaks nothing.

- **mcp's stdio release finding is a bound or a documented limit, not a re-pin.** The audit proposed
  re-pinning to a `@orkestrel/process` release that closes inherited-pipe iteration. No such release
  exists: 0.0.4 documents the opposite as intended, and its own remedy is a `timeout`.
- **probe's `createProbe` and `createProbeServer` are deleted.** `.claude/rules/architecture.md`
  names a pass-through factory for deletion, and a first publish is the only free moment.
- **probe's `Inspection` stays exported.** The design lane refuted the audit here with a rule
  citation: an implementation file may not hold a module-scope interface, so `types.ts` is its only
  home and a type there is barrelled by construction. "Intern it" means "delete it", and the guide
  publishes the coordinator seam that uses it on purpose.
- **No count detector ships in this wave.** The objective lane measured a bounded cardinal-list
  detector clean with working controls, and measured an ordinal detector at a false-positive rate
  high enough that an unconditional gate would be suppressed rather than obeyed. The cardinal design
  is recorded for a successor campaign; adding it mid-wave would redden targets the wave does not
  touch.

## A bench fact this campaign measured

A bench sandbox denies a **loopback listener**, alongside the grandchild process and the nested
install already recorded in § Bench laws. Measured in `@orkestrel/mcp`: `listen EPERM` on
`0.0.0.0:24678` and on `127.0.0.1`, with neither the browser nor the server project able to collect,
while the same suites exited 0 on the host. A subject needing a real local server is unmeasurable
inside a bench.

## Order of remaining work

Writers serialize per checkout. Different repositories run concurrently.

- **process** — PFIX (Sol) closes the three findings; then the Orchestrator takes the pack reading;
  then gates.
- **mcp** — MFIX-B (Sol) closes the guide truth, the packed inventory gate, and the count sweep;
  then the Orchestrator takes the distribution reading the bench cannot; then gates.
- **scaffold** — SFIX-A (Sol) closes the canon findings and lands the bench fact; then gates.
- **probe** — PBFIX6 (Sol), then PB-S1 (surface), then PB-E1 (core error axis), then PB-E2 (server
  error axis), then PB-D1 (guide voice, Opus), then gates. This is the longest chain and probe is the
  last layer, so it does not block the others.

Each finished unit gets an audit lane on an engine that did not write it, then an independent
`verifier` for the authoritative gates.
