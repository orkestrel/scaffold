# Reconciliation — the distribution-proof design round

Both lanes ran on one brief, in clean contexts, blind to each other. `planner` held the
subjective lane on Opus 5. `analyst` carried the objective lane to GPT-5.6 Sol over the Codex
bridge; its journal is `tmp/codex/distribution-design.jsonl`, thread
`01a02cc8-a45f-7523-9b7b-cb0029c89c3b`, and the journal records Sol reading the brief and the
source first-hand, so the lane reached its engine rather than answering from the driver's.

## What both lanes reached independently

- **Generate the proof; never vendor it.** A vendored file is byte-identical across every
  target, so it cannot name the package it proves and cannot import `@orkestrel/test`, whose
  every consumer is itself a target. Content vendoring would also replace the bespoke proofs in
  `brief`, `mcp`, `probe`, `process`, and `scaffold`.
- **Delete `Blueprint.distribution`.** The field is a derived duplicate of "this workspace
  publishes", and deriving it from the proof's own presence is what makes the emission
  unreachable. Both lanes named `blueprint.src.length > 0` as the replacement, which is the
  `publishes` predicate already declared at `src/core/compilers.ts:295`.
- **Preserve the bespoke proofs by never comparing their bytes.**
- **Write the manifest script region too.** Generating only the file leaves every target needing
  a hand edit to `prepublishOnly`, which is where `--mode release` gets dropped.
- **Derive the proof's assertions from the installed `exports` map and the built declarations,
  not from the blueprint.** The proof then measures the artifact a consumer installs rather than
  the specification that produced it.
- **Keep the proof out of `host.json`.** No vendored byte moves, so this is a `dist/src` release.
- **Leave package semantics to the package.** No generated brand check, no named API call.

## Where they disagreed, and the ruling

**Ownership: birth or presence.** Ruled **presence**, against the subjective lane.

`src/core/types.ts` defines the terms: `presence` "claims only that the file exists: audit
compares existence, and a write restores an absent file and never touches present bytes", while
`birth` "claims only the file's creation: audit never compares it and always reports it
aligned".

The subjective lane chose birth and argued presence "would restore a deleted proof, which sounds
protective and in practice fights a package that replaced the generated file with a better one".
That argument does not survive the definition: presence never touches present bytes, so a
package that replaced the file keeps its replacement untouched. The lane reasoned about presence
as though it were content.

Presence is also the only option that serves the goal. Under birth, `audit` reports a target
missing its proof as aligned, so nothing in the fleet ever reports which packages still lack it.
Under presence, the absence is drift and `repair` closes it.

**Manifest write safety.** Ruled Sol's **compare-and-swap against a recognized predecessor
state, refusing without mutation** when a target's chain was customized, over the subjective
lane's additive write. The census makes the refusal free today: every package lacking the proof
carries the same scaffold-generated chain shape, and every package carrying the proof already
names `--mode release`.

**Declaration reading.** Ruled Sol's **compiler checker over module symbols**, which resolves
aliases and re-exports, over a declaration-text walk. The existing `process` proof walks
statements and would miss a re-export.

**Export tallies.** Neither lane's tallies survive. `AGENTS.md` § Writing refuses a count over a
set anyone can add to, and name-set equality against the declarations is strictly stronger than
a count anyway.

## Measured shapes that size the branches

Taken 2026-08-23 from the committed census over all 48 packages.

- **Browser face** — `console`, `database`, `indexeddb`, `mcp`, `router`, `test`, `workflow`.
- **Server face** — `browser`, `console`, `database`, `mcp`, `middleware`, `ollama`, `probe`,
  `process`, `router`, `scaffold`, `sea`, `server`, `sqlite`, `supervisor`, `terminal`, `test`,
  `toolbox`, `websocket`, `worker`, `workflow`.
- **Styles face** — none. Build no styles branch.
- **`bin` manifest key** — `probe` and `scaffold` only, and no package exports `dist/bin`
  through its `exports` map.
- **No `require` condition** — `indexeddb` alone.
- **Cannot import `@orkestrel/test`** — `test` alone.

## The open scope decision

Sol requires a real-browser branch for a browser face: bundle an installed-package consumer with
the declared Vite toolchain, drive it in Playwright Chromium, and compare its runtime keys with
its declaration exports. A Node `import` of a browser bundle proves nothing, so the requirement
is sound. It is also the most expensive and most fragile stage in the design, it reaches the
seven browser-face packages, and Sol flags that a workspace with no launchable Chromium cannot
establish it while the release gate must fail rather than pass on missing evidence.

That cost is the user's call, and it is put to them rather than absorbed.
