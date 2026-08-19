# Unit 3 — findings the Orchestrator carries into the audit round

These are read from the working tree while unit 3 was still running. Each carries the run behind it.
The audit lanes rule on them alongside their own.

## O1 — a boot arming failure kills the host process

`src/server/Probe.ts:70` assigns `this.#warmth = this.#warm()`. `#warm` emits `error` and then
re-throws (`:118`). Nothing observes `#warmth` until `prove` (`:82`) or `#destroy` (`:201`). A
failure during arming is therefore an unhandled rejection before any caller exists, and Node's
default policy ends the process.

Reproduced in isolation:

```text
$ node warmth.mjs
entry-started
entry-listening
Error: arming failed
    at #warm ...
EXIT=1
```

The bin entry constructs a probe and never calls `prove`, so a workspace whose arming fails gets
exit 1 with a raw Node stack instead of the probe's own diagnostic.

Direction: observe the stored promise at construction so the rejection is handled, and keep the
stored promise rejecting so `prove` still reports the arming failure to its caller.

## O2 — instrument debris ships in the bin entry

`src/bin/main.ts` writes `probe-entry-started` and `probe-entry-listening` to stderr, and
`dist/bin/main.js` carries both. They were added to locate the criterion 4 hang. A Model Context
Protocol stdio server's stderr is what a harness surfaces as server log output, so these are
product, not scratch. Remove both.

## O3 — a public return type is spelled inline

`src/server/factories.ts:37` returns `ReturnType<typeof createStdioServer>`. `@orkestrel/mcp`
declares that return as an anonymous object type (`index.d.ts:385`), so there is no upstream name to
import and the `ReturnType` construction itself is correct. Its placement is not: `AGENTS.md`
requires a reusable or public type to be declared in `*/types.ts` before implementation. Name it
there and use the name in the signature.

## O4 — a double round-trip stands in for one spread

`src/server/factories.ts:31` writes `Object.fromEntries(Object.entries(compileSchema(CLAIM_SHAPE)))`.
The only thing it changes is the type: `compileSchema` returns `JSONSchema`, and `createTool`
declares `parameters?: Readonly<Record<string, unknown>>`.

```text
$ tsc --noEmit --strict schema-probe.ts
schema-probe.ts(3,7): error TS2322: Type 'JSONSchema' is not assignable to type 'Readonly<Record<string, unknown>>'.
  Index signature for type 'string' is missing in type 'JSONSchema'.
TSC_EXIT=2
```

The same probe's line 5 spreads and reports nothing, so `{ ...compileSchema(CLAIM_SHAPE) }` satisfies
the identical requirement in one allocation. The pair of calls is a superfluous wrapper.

## O5 — every probe host inherits a failing exit code from boot

The resident Vitest sets `process.exitCode = 1` on the host process when a run reports a failure, and
the probe never contains it. Arming deliberately fails a control, so this fires at boot, before the
probe has served a claim.

```text
$ node arm-exit.mjs
exitCode right after arming, before any user claim: 1
EXIT=1
```

It is not the user's control that does it. A claim whose control passes leaves the same value,
because arming already set it:

```text
$ node exitcode.mjs
exitCode at start: undefined
exitCode after a claim whose control PASSES: 1
exitCode after a claim whose control FAILS: 1
exitCode after destroy: 1
```

The Model Context Protocol server process therefore always exits 1, which a harness can report as a
crash, and any consumer embedding `createProbe` in its own tool inherits the same.

`RuntimeStage` owns the side effect, so `RuntimeStage` contains it. Reading the value before the run
and restoring it after works, and preserves the findings:

```text
$ node contain.mjs
bare inspect:      findings=1 exitCode=1
contained inspect: findings=1 exitCode=undefined
EXIT=0
```

## O6 — the bin test starts a real server inside the test worker

`tests/src/bin/main.test.ts` does `await import('../../../src/bin/main.js')`. That entry is listed in
the manifest's `sideEffects`, and importing it runs `createProbeServer(createProbe()).start()`. The
test therefore boots a real probe, spawns a real Oxlint child, boots a nested Vitest, and attaches a
JSON-RPC reader to the worker's stdio.

The test passes and hides all of it:

```text
$ rm -f tmp/probe/arm-*.ts && npm run test:src:bin
Test Files  1 passed (1)
     Tests  1 passed (1)
  Duration  3.72s
EXIT=0
$ ls -A tmp/probe
arm-7cce5711-26e5-4965-a2a5-c7ae3a745ef0.ts
```

Arming takes about 4.3 s and the worker is torn down at 3.7 s, so the leaked file is the arming
dependency abandoned mid-run. The assertion the starter test makes — that the entry exports nothing —
is true whether or not any of that happened.

Drive the entry as a spawned child process instead, which is what unit 4b already owes. No test
imports a side-effectful entry.

## Measured latency, for the record

Taken against the built `dist` in `/workspace/probe`, deadline 60 s.

```text
boot + first prove: 4351 ms   (arming is the whole of it)
warm prove x5:      median 492 ms, min 485 ms, max 505 ms
  case type 56 ms    case lint 72 ms    case runtime 245 ms
  control type 56 ms control lint 76 ms control runtime 258 ms
```

One warm `prove` returns a six-check verdict with a receipt in under half a second.
