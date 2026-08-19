# Unit 3 audit — reconciliation

Two lanes ran against commit `f7104c7`, both on engines that did not write it. The unit was written
by GPT-5.6 Sol; the subjective lane ran on Opus 5 and the mechanical lane on the cheap native tier.

The Orchestrator rules below. A lane's verdict is a proposal.

## Mechanical lane — `VERDICT: FAIL`

Confirmed 11 claims, refuted 3, left 1 unproven.

### Refutations upheld

**Claim 2 — a boot arming failure terminates the host process.** Upheld, and it independently
reproduces the Orchestrator's own finding O1 from a different reading. `Probe.ts:70` assigns
`this.#warmth = this.#warm()` with no handler attached, and `#warm` re-throws after emitting. Nothing
observes that promise until `prove` or `destroy`. Node ends the process on the unhandled rejection
before any caller exists.

This defect is larger than it looks, because it is what breaks the delivery of the toolchain refusal
in claim 14. The stages refuse correctly; the refusal reaches the caller as a process death rather
than as an error on `prove`.

### Refutations dropped, with the reason

**Claim 10 — exported function names.** Dropped. The lane is right that `createProbe` and
`createProbeServer` are two words and right that `AGENTS.md` § Design laws permits exactly that for a
module-scope helper. The claim's own wording was wrong, not the code. A brief defect, recorded here
rather than charged to the unit.

**Claim 14 — no refusal when the toolchain disagrees with the gate.** Dropped. The lane read
`Probe.#version` in isolation and concluded no refusal exists. The refusals live in the stages, one
per peer, and the Orchestrator read all three:

```text
$ grep -n "does not share" src/server/stages/*.ts
TypeStage.ts:87:  throw new Error('The type stage does not share the workspace TypeScript installation')
RuntimeStage.ts:80:  throw new Error('The runtime stage does not share the workspace Vitest installation')
```

`TypeStage:84-87` and `RuntimeStage:77-80` each compare `resolveWorkspaceModule(workspace, name)`
against `import.meta.resolve(name)` and refuse on disagreement. `LintStage` needs no comparison,
because it never loads a second copy: `resolveWorkspaceBinary` reads the workspace's own
`oxlint/package.json` `bin` field and `LintStage:90` spawns `process.execPath` against that entry, so
the copy it runs is the workspace copy by construction.

That resolution is also the portable one. It spawns a real Node entry rather than the extensionless
`node_modules/.bin/oxlint` shim, which Windows `CreateProcess` cannot execute and which a restricted
sandbox refuses — the same failure that made the vendored `tests/config.test.ts` report `EPERM` under
the bench.

### Unproven claim settled

**Claim 5 — expiry destroys the hung stage and a later claim is served.** The lane had no execution
tool and correctly marked it `UNPROVEN` rather than guessing. Unit 3's own instrument settles the
mechanism:

```text
DEADLINE rejected=true elapsed=5014ms expiries=1 survived=true
```

The claim is confirmed on that evidence. It still owes a committed test, which is unit 4b's
criterion 11, not a fix-round item.

## Orchestrator findings

O1 is upheld and carries into the fix round. O2 was closed by the unit's own cleanup before the
commit. O3 and O4 carry, and O4 survives the mechanical lane having missed it:

```text
$ sed -n '32p' src/server/factories.ts
			parameters: Object.fromEntries(Object.entries(compileSchema(CLAIM_SHAPE))),
```

O3 is upheld for a reason the lane did not weigh. The lane ruled the inline
`ReturnType<typeof createStdioServer>` acceptable because the commit introduces no new type. Guide
parity decides it instead: a public return type that has no name cannot appear in the guide's surface
table as a resolvable export, so unit 4c cannot document `createProbeServer` without one.
