# Probe P4 — A1 reproductions: the batch-abort interleaving (claim 2) and `parse` identity (2026-09-15)

Instrument: `tool/tmp/probe-a1.mjs`, run by the Orchestrator against the built tool dist (U1b tree) and the installed `@orkestrel/contract` 0.0.17.

Reading (verbatim):

```json
{
  "asyncAbort": { "entered": 1, "results": [ { "id": "a", "success": true, "value": "done" }, { "id": "b", "success": true, "value": "ran" } ] },
  "syncAbort":  { "entered": 0, "results": [ { "id": "a", "success": true, "value": "done" }, { "id": "b", "success": false, "error": "sync" } ] },
  "parse": { "sameReferenceForValid": false, "parsedValid": { "amount": 3 }, "coerced": { "amount": 5 }, "extraKept": false, "extra": { "amount": 3 } }
}
```

What this established:

- Claim 2 (reviewer `BROKEN`) reproduces: when an earlier call aborts the shared signal after an `await`, the later sibling's handler enters and succeeds; when it aborts synchronously inside the dispatch pass, the later sibling is refused with a `ToolFailure` naming the reason. The runtime matches its documentation; the claim and the test name overstate it. Fix per the reviewer: guide wording, test rename, and an executed asynchronous case.
- `contract.parse` returns a fresh object even for already-valid input, coerces a numeric string to a number, and drops undeclared keys. Orchestrator ruling for U1c: with `contract`, `Tool.execute` forwards `contract.parse(args)` (an owned, normalized copy in the schema's types) to the handler; without `contract`, the raw record is forwarded unchanged. Bound: this changes nothing for tools without a contract, and a handler that relied on undeclared keys under a contract was relying on something the advertised schema never promised.

Claim 11 (analyst `BROKEN`) also reproduces by reading: the registry fence at `guides/tool.md:218-220` evaluates `tools.tool('add')` and `tools.definitions()`; the transcription at `tests/guides.test.ts:184-204` executes neither.
