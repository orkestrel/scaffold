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
