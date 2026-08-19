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

## Unit 5 — bring the workspace onto scaffold 0.0.42 (Orchestrator)

Re-pin, install, re-vendor, prove the gates. Brief: `u5-brief.md`.

Discovered while de-risking unit 4c: `scaffold overwrite` re-pins two development dependencies,
refreshes the catalog table, and vendors five dependency guides this workspace has never carried,
all in the same verb. None of that belongs to the unit that writes the package guide. It also brings
in the repaired vendored `tests/config.test.ts`, which resolves Oxlint through `createRequire`
instead of spawning the `node_modules/.bin/oxlint` shim that Windows cannot execute and a restricted
sandbox refuses.

Network-dependent work belongs to the Orchestrator's own tracked commands, because a bench sandbox
denies the network.

## Order, revised again

Unit 3's two repair rounds, then 5, then 4a, then 4b, then 4c. Unit 5 ran early, out of that order,
because the republish wave landed mid-campaign and every later unit had to run against the final
vendored host rather than one a later step would replace.

Each writing unit commits before the next is dispatched. Each nontrivial unit is audited by an engine
that did not write it.

### Audits run beside the next writer, not before it

A read-only audit lane and a writing unit can run at the same time, and the campaign is long enough
that they must. The isolation rule is what makes it safe: give the lanes a git worktree pinned at the
commit under audit, with `node_modules` symlinked from the main checkout, and give the writer the
live tree. Neither sees the other.

So each phase from here is: commit the writer, cut a worktree at that commit, then launch the audit
lanes on the worktree and the next writing unit on the live tree together.

Two things this does not license. Two writers still never share the main checkout. And an audit whose
verdict decides whether the next unit should run at all still blocks it — parallelism is for a lane
whose findings become a successor brief, not for one that could invalidate the work running beside
it.

### The design fork the campaign acquired

`O9` is not a repair and does not belong to any unit above. The three stages disagree about
`Case.files`, and the disagreement includes a false green. Its brief is `o9-design-brief.md` and it
runs as a two-lane design round, then its own implementation unit. Both halves of the remedy are
already measured, so the round rules on shape rather than feasibility.

It sits after the proof units. Nothing in 4a, 4b, or 4c depends on it, and it will add proofs of its
own that would otherwise be written twice.

## Standing obligations unit 4 inherits

- The hand guard `isClaim` and `compileGuard(CLAIM_SHAPE)` must agree across a hostile population.
  `shapers.ts` sits above the leaf pair, so `validators.ts` may not import it and the two are
  written separately; only a test holds them together. A 15-value population including an empty
  project, an empty control reason, a bad stage, an extra key, a null-prototype object, and a
  throwing `Proxy` currently shows zero disagreements.
- `computeReceipt` issues only when every case check is clean and the control failed at its
  declared stage. Its refusals are the proof that matters: the wrong stage, no failure at all, and
  a dirty case each return `undefined`.

## Exit criterion, restated

The campaign began with an implicit end: build the package. Three repair rounds, a design fork, and a
six-lens sweep have since changed what "built" means, so the end is restated here explicitly. A plan
that names work but not its end can only be abandoned, never finished.

The campaign is complete when all of the following hold, and not before:

1. Units 1, 2, 3, and 5 are landed, audited by an engine that did not write them, and committed.
   **Done.**
2. The proof units 4a, 4b, and 4c are landed and committed, and `npm test` reports no skipped and no
   todo test.
3. Every high-severity sweep finding that an independent verifier **reproduced** is closed, and each
   closure carries a test that was red before the fix and green after.
4. The candidate-source defect is closed, or is explicitly excluded on evidence with the contract
   text changed to match what the package actually promises. A receipt that certifies runtime evidence
   over source the runtime never ran is not something this package can ship with silently, so the one
   outcome not available is leaving the contract as it stands.
5. The five gates pass in order, run by an executor independent of every writer, and guide parity
   passes.
6. `PROBE.md` describes what shipped, including every measurement that moved and every claim this
   campaign withdrew.

## What is deliberately outside it

Recorded against the capability that owns them, for the next change rather than this one:

- Any sweep finding a verifier **refuted** or could not reproduce. A finding nobody can substantiate
  is dropped on the record, not carried.
- Medium and low findings that survive verification but are not on the path to criterion 3 or 4. They
  are real and they are enumerated in `seam-sweep-findings.md`; they are not what closes this campaign.
- Publishing. That is the user's decision and the user's credential, and nothing here presumes it.
- The scaffold release that would correct the published self-pin. The source is repaired and `main` is
  green; shipping that correction is a separate decision.

## The rule this restatement obeys

Re-baselining changes which units run. It never changes the goal. Criterion 3 is bounded by what
verification reproduces rather than by what an audit claimed, which is a narrowing the evidence
justifies. Criterion 4 is an addition the original exit criterion already required, because the design
this package implements states that an agent proves source it has only thought of. Neither is a
rescope, and a rescope would need the user.
