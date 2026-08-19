# Unit 3 fix round — five defects the audit reconciled

## Role and engine

`implementer` on Claude Opus 5. GPT-5.6 Sol wrote the code you are repairing, so this round is on a
different engine by design. You are the sole serial writer in `/workspace/probe`.

## Objective

Close the five defects below. Each names its evidence. Change nothing else.

## Context

Read before acting:

1. `/workspace/probe/AGENTS.md` and every rule under `/workspace/probe/.claude/rules/` that governs
   the files you touch.
2. `/workspace/probe/src/core/types.ts` and `/workspace/probe/src/server/types.ts`.
3. The full findings record, `/home/user/scaffold/.orkestrel/probe/u3-orchestrator-findings.md`, and
   the reconciliation, `/home/user/scaffold/.orkestrel/probe/u3-audit-reconciliation.md`.

The subject is commit `f7104c7`. All five gates are green at that commit, so any gate that reddens
under your change is your change.

## Findings

### F1 — a boot arming failure terminates the host process

`Probe.ts:70` assigns `this.#warmth = this.#warm()`, and `#warm` re-throws after emitting `error`
(`:118`). Nothing observes that promise until `prove` (`:82`) or `#destroy` (`:201`). A failure during
arming is an unhandled rejection before any caller exists, and Node ends the process.

Reproduced in isolation by the Orchestrator:

```text
$ node warmth.mjs
entry-started
entry-listening
Error: arming failed
EXIT=1
```

This is worse than it reads. The toolchain-agreement refusals in `TypeStage:84-87` and
`RuntimeStage:77-80` are delivered through arming, so today a probe that does not share the gate's
compiler kills its host instead of refusing to serve.

Observe the stored promise at construction so the rejection is handled, and keep the stored promise
rejecting so `prove` still reports the arming failure to its caller. Both properties must hold: a
construction that swallows the failure is a different defect.

### F2 — every probe host inherits a failing exit code from boot

The resident Vitest sets `process.exitCode = 1` when a run reports a failure. Arming deliberately
fails a control, so this fires at boot before any claim is served:

```text
$ node arm-exit.mjs
exitCode right after arming, before any user claim: 1
EXIT=1
```

The Model Context Protocol server process therefore always exits 1, which a harness can report as a
crash, and any consumer embedding `createProbe` inherits it.

`RuntimeStage` owns the side effect, so `RuntimeStage` contains it. The Orchestrator measured that
reading the value before the run and restoring it after works and preserves the findings:

```text
$ node contain.mjs
bare inspect:      findings=1 exitCode=1
contained inspect: findings=1 exitCode=undefined
EXIT=0
```

Restore the previous value rather than assigning a literal, so a host that had deliberately set a
non-zero exit code keeps it.

### F3 — the bin test starts a real server inside the test worker

`tests/src/bin/main.test.ts` does `await import('../../../src/bin/main.js')`. That entry is in the
manifest's `sideEffects` and importing it runs `createProbeServer(createProbe()).start()`, so the test
boots a real probe, spawns a real Oxlint child, boots a nested Vitest, and attaches a JSON-RPC reader
to the worker's stdio. It passes while hiding all of it and leaks the arming dependency:

```text
$ rm -f tmp/probe/arm-*.ts && npm run test:src:bin
Test Files  1 passed (1)   Duration 3.72s   EXIT=0
$ ls -A tmp/probe
arm-7cce5711-26e5-4965-a2a5-c7ae3a745ef0.ts
```

Stop the bleeding only. Make the test assert something true about the entry without importing it —
that the built `dist/bin/main.js` exists and begins with a shebang is enough. A later unit owns the
real proof, which drives the entry as a spawned child process; do not write that proof here.

### F4 — a double round-trip stands in for one spread

```text
$ sed -n '32p' src/server/factories.ts
			parameters: Object.fromEntries(Object.entries(compileSchema(CLAIM_SHAPE))),
```

The only thing it changes is the type. `compileSchema` returns `JSONSchema` and `createTool` declares
`parameters?: Readonly<Record<string, unknown>>`, and an interface has no index signature:

```text
$ tsc --noEmit --strict schema-probe.ts
schema-probe.ts(3,7): error TS2322: Type 'JSONSchema' is not assignable to type 'Readonly<Record<string, unknown>>'.
  Index signature for type 'string' is missing in type 'JSONSchema'.
```

The same probe's spread line reports nothing, so `{ ...compileSchema(CLAIM_SHAPE) }` satisfies the
identical requirement in one allocation.

### F5 — the server factory's return type has no name

`factories.ts:26` returns `ReturnType<typeof createStdioServer>`. `@orkestrel/mcp` declares that
return as an anonymous object type, so the `ReturnType` construction is correct and there is no
upstream name to import. Its placement is wrong: `AGENTS.md` requires a reusable or public type to be
declared in a `*/types.ts` file.

Guide parity is what makes this binding rather than cosmetic. A later unit documents this package,
and every backticked API in a guide must resolve to a real public export. A return type spelled
inline cannot appear in the guide's surface table.

Declare the alias in `src/server/types.ts`, give it a single descriptive name, and use that name in
the signature.

## Scope

- **Owned**: `src/server/Probe.ts`, `src/server/stages/RuntimeStage.ts`, `src/server/factories.ts`,
  `src/server/types.ts`, `tests/src/bin/main.test.ts`.
- **Off-limits**: everything else. Specifically `src/core/**`, `src/server/helpers.ts`,
  `src/server/stages/TypeStage.ts`, `src/server/stages/LintStage.ts`, `src/server/index.ts`,
  `src/bin/main.ts`, `tests/src/core/**`, `tests/src/server/**`, `guides/**`, `package.json`,
  `vite.config.ts`, `configs/**`, and every dotfile.
- **Tools**: read, write, and `Bash` for validation only.
- **Permissions**: do not commit, push, tag, publish, install a dependency, or run a destructive
  command. Do not add an npm package. Do not read, print, or copy any secret.

## Criteria

1. F1 closed: a probe whose arming fails does not terminate the host process, and `prove` on that
   probe rejects with the arming failure. Prove both halves with a throwaway script and paste its
   output.
2. F2 closed: `process.exitCode` is unchanged by arming and by any `prove`, and a host that set a
   non-zero exit code before constructing a probe still has it afterwards. Paste the output.
3. F2 does not weaken detection: a control that fails still reports its findings, with the same count
   as before the change.
4. F3 closed: `npm run test:src:bin` exits 0, and `tmp/probe/` holds no file afterwards.
5. F4 closed: `factories.ts` carries no `Object.fromEntries(Object.entries(…))`.
6. F5 closed: `src/server/types.ts` declares the alias, `factories.ts` uses it, and it reaches the
   server barrel.
7. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test` each
   exit 0. Run them in that order.
8. `git diff --stat` touches only the five owned files.

## Execution

Perform this assignment directly. Spawn no subagent.

## Deviation contract

Stop and report when reality conflicts with the primary objective: a finding whose fix needs an
off-limits file, a criterion that contradicts another, or a gate that reddens for a reason your change
does not explain. Report expected, found, the exact command and its output, whether the work is done,
and at most one short hypothesis.

Decide an ancillary question yourself and record it: the alias's exact name, the wording of a comment,
and how the throwaway proof scripts are structured are yours. Delete every throwaway script before you
finish.

## Output

Return exactly these five sections, and no process diary.

1. **Files written** — each path with a one-line statement of what changed.
2. **Validation** — each of the five gates with its exit code.
3. **Acceptance evidence** — criteria 1 through 8, each with the command and output that closes it.
4. **Deviation** — the contract above, or `None`.
5. **Decisions** — ancillary decisions you made, or `None`.
