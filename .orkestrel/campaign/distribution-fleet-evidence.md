# Fleet evidence — the distribution proof

Measured 2026-08-23 on Linux, Node v22.22.2, over every directory under `/home/user` whose
`package.json` declares an `@orkestrel/*` name. The instruments are committed beside this file:
`census.mjs` reads manifests only, and `entail.mjs` runs `npm pack --dry-run --json
--ignore-scripts` per target and compares the packed file list against every target the
`exports` map names.

## Who carries the proof

`brief`, `mcp`, `probe`, `process`, and `scaffold` carry `tests/distribution.test.ts`.

Every other package lacks it: `abort`, `agent`, `browser`, `budget`, `console`, `contract`,
`csv`, `database`, `emitter`, `form`, `guide`, `html`, `indexeddb`, `interpret`, `markdown`,
`middleware`, `msg`, `ndjson`, `ollama`, `pool`, `program`, `qualifier`, `queue`, `rater`,
`reason`, `relation`, `router`, `sea`, `server`, `sqlite`, `sse`, `supervisor`, `table`,
`template`, `terminal`, `test`, `timeout`, `tool`, `toolbox`, `websocket`, `worker`,
`workflow`, and `workspace`.

The same set lacks the `test:distribution` script and the `prepublishOnly` row naming it. That
is the consequence of the missing file rather than a separate defect: `src/bin/CLI.ts:981`
derives the blueprint's `distribution` field from the file's presence, and
`src/core/compilers.ts:298` gates the project, the script, and the row on that field.

## What the census settles

Every package declaring the row also names `--mode release`, so no target carries a
`prepublishOnly` chain that would let the proof skip inside the publish gate.

`@orkestrel/test` is declared everywhere except `test` itself, which cannot depend on itself.
A generated proof that imports `createScratch` therefore needs one branch for that package.

`typescript` is declared in every package, so a generated stage that parses declarations with
the compiler API resolves its dependency in every target.

`indexeddb` declares no `require` condition anywhere in its `exports` map. A generated proof
that drives a CommonJS entry must select that stage from the subpath's declared conditions
rather than assume one exists.

No package declares `private`, and every package has a `src` directory.

## What the entailment probe settles

Every package's tarball carries a file for each target its `exports` map names. Command per
target, run from that target's root:

```text
npm pack --dry-run --json --ignore-scripts
```

`--ignore-scripts` suppresses `prepack`, so the reading is taken against the `dist` already on
disk — which is what a publish run with `--ignore-scripts` ships. Every target reported
`dist=true` and `RESOLVES`, with no missing target and no error.

This closes the risk that a publishing package cannot satisfy a distribution proof it is given.
Nothing in the fleet would be handed an unsatisfiable gate.

## Coverage

The population is directories under `/home/user` only. A package published from another
checkout, or one not cloned here, is outside this reading. The probe measures the packed file
list against the `exports` map; it does not load any entry, so it proves the files ship and not
that they resolve at runtime.
