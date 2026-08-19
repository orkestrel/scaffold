# @orkestrel/probe — build plan

The design is `PROBE.md` in the scaffold repository. This file carries only the decomposition and
the ownership, so units do not collide. One writer at a time, each from a clean committed baseline.

## Unit 1 — contracts (`src/core`)

Owns `src/core/types.ts`, `src/core/constants.ts`, `src/core/shapers.ts`,
`src/core/validators.ts`, `src/core/helpers.ts`, `src/core/index.ts`.

- `Stage`, `Source`, `Case`, `Control`, `Claim`, `Finding`, `Check`, `Verdict`, `Toolchain`.
- `CLAIM_SHAPE`, one `ContractShape`, yielding both the JSON Schema `tools/list` publishes and the
  guard the tool applies on arrival, so the wire contract and the runtime guard cannot drift.
- `isClaim`, `isVerdict`.
- `formatVerdict`, the text an agent reads, shared by the tool result and the cold path.
- `computeReceipt`, pure, returning `string | undefined`, issuing nothing unless every check on the
  case is clean and the control failed at its declared stage.

Host-independent: no `node:` specifier reaches this environment.

## Unit 2 — stages (`src/server/stages`)

Owns `src/server/types.ts` (the `StageInterface` contract), `src/server/stages/TypeStage.ts`,
`src/server/stages/LintStage.ts`, `src/server/stages/RuntimeStage.ts`, `src/server/helpers.ts`.

Each stage is a class implementing one contract, so a consumer can run one stage alone.

- Type: a resident `ts.LanguageService` over a virtual path that is never written. Version every
  dependency snapshot by modification time; a host that versions only the probe serves stale
  source. Select the scoped project for a candidate source file and the root project for the test
  file.
- Lint: a resident `oxlint --lsp` process, virtual `textDocument/didOpen`, no file on disk.
  Resolve the binary through `createRequire` against the target's `package.json`, read the `bin`
  field, and spawn `process.execPath` against that entry, because `node_modules/.bin/oxlint` is a
  `.cmd` on Windows that `spawn` cannot execute.
- Runtime: a resident Vitest, `pool: 'threads'`, one fresh specification identity per revision
  through `createSpecification` and `runTestSpecifications`. Never `rerunFiles`. Evict each
  result after returning it.

## Unit 3 — coordinator, transport, entry

Owns `src/server/Probe.ts`, `src/server/factories.ts`, `src/server/index.ts`, `src/bin/main.ts`.

- `Probe` warms at construction and `prove` awaits that promise, so there is no `start` method and
  a second concurrent call waits rather than starting a second engine.
- Revalidate before every call: stat the workspace, `invalidateFile` what moved, re-version the
  type host's snapshots.
- Own the deadline outside the worker through `@orkestrel/timeout`, and recycle the runtime worker
  when it fires. An in-worker timeout cannot fire against a synchronous infinite loop.
- Arm at boot with a control that imports a dependency the arming mutates, and refuse to serve
  until the verdict changes with it. A control asserting `expect(2).toBe(3)` imports nothing and
  passes while the service serves stale source.
- Resolve the three peers from the workspace root at boot, expose them as `toolchain`, carry that
  on every verdict, and refuse to serve when the resolution disagrees with the gate commands.
- `createProbeServer` composes `createStdioServer(createMCPLegacy(mcp))`. The undecorated server
  answers a harness `tools/list` with `Invalid params: malformed modern request metadata`.
- `src/bin/main.ts` declares no module-scope constant and no module-scope function.

## Unit 4 — proofs and parity, split three ways

Re-baselined after unit 3 landed. The original single unit owned `tests/**` and `guides/**` together.
Three facts forced the split: the core proofs are pure and fast while the server proofs drive real
tools and take minutes, the guide is subjective work that belongs on Opus while both proof sets are
objective work that belongs on Sol, and the guide forces a scaffold configuration change the proof
units must not touch. The three own disjoint files and run in order.

### Unit 4a — core proofs (Sol)

Owns `tests/src/core/**`. Every pure leaf and every guard, including the two standing obligations
below. Brief: `u4a-brief.md`.

### Unit 4b — server and entry proofs (Sol)

Owns `tests/src/server/**` and `tests/src/bin/**`. The helpers, the three stages against the real
toolchain, the coordinator, and the built entry over spawned stdio. Carries the regression guards for
both reproduced defects. Brief: `u4b-brief.md`.

The `src:server` project runs at Vitest's five-second default and `vite.config.ts` is a scaffold
content-owned file, so a slow test there sets its own budget through `it(name, { timeout }, fn)`
rather than through the config.

### Unit 4c — guide and parity (Opus)

Owns `guides/probe.md`, `guides/README.md`, `tests/guides.test.ts`, `package.json`, and
`vite.config.ts` only through `npx scaffold overwrite`. Brief: `u4c-brief.md`.

Creating `tests/guides.test.ts` selects the `guides` Vitest project, so the template regenerates
`vite.config.ts` while the `test:guides` script must be added by hand. The vendored config proof
checks that the projects and the scripts agree, so both halves land together or neither does.

## Order, revised

1, then 2, then 3, then 4a, then 4b, then 4c. Each unit commits before the next is dispatched, and
each nontrivial unit is audited by an engine that did not write it.

## Standing obligations unit 4 inherits

- The hand guard `isClaim` and `compileGuard(CLAIM_SHAPE)` must agree across a hostile population.
  `shapers.ts` sits above the leaf pair, so `validators.ts` may not import it and the two are
  written separately; only a test holds them together. A 15-value population including an empty
  project, an empty control reason, a bad stage, an extra key, a null-prototype object, and a
  throwing `Proxy` currently shows zero disagreements.
- `computeReceipt` issues only when every case check is clean and the control failed at its
  declared stage. Its refusals are the proof that matters: the wrong stage, no failure at all, and
  a dirty case each return `undefined`.
