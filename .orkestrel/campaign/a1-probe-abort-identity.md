# Orchestrator probe — A1 claim 3, the abort identity test (2026-09-14, commit cef565d)

Instrument: `a1-probe-abort-identity.mjs.txt` (run with Node 24 from the Orchestrator's scratchpad
against the built `agent/dist/src/core/index.js` at `cef565d`). Membership rule of the instrument:
a fixture `AgentProvider` subclass whose parser treats each chunk as one record, driven through
`stream` with an injected transport. Control drawn from outside the attacked path: case A, a
spec-conformant transport that rejects with `signal.reason`.

Readings, verbatim:

```text
A control (reject with signal.reason on deadline): ProviderAbortError partial={"content":""}
B attack (reject with own AbortError on deadline): OTHER DOMException: AbortError The operation was aborted.
C caller abort awaiting bytes: first delta = {"channel":"content","text":"first"} ; then ProviderAbortError partial={"content":"first"}
D deadline cleared after success: result = {"content":"done"} ; signal aborted after 60ms = false
E pre-aborted: ProviderAbortError partial={"content":""}
```

What the controls established: the instrument can see a `ProviderAbortError` (A, C, E) and a
cleared deadline (D), so a raw `DOMException` in B is a reading of the subject, not of the harness.
What they did not establish: the behaviour of Node's own `fetch` on abort (not exercised; the
transport was injected in every case).

Ruling input: claim 3 is BROKEN by case B. `AgentProvider.stream`'s catch wraps an error as
`ProviderAbortError` only when `error === combined.reason`; a transport that rejects with a fresh
`AbortError` after the same signal aborts is a legitimate `fetch` and bypasses the wrap. The
pre-campaign `OllamaProvider` wrapped on `combined.aborted` alone (`ollama/src/server/OllamaProvider.ts:283-292`
before O1), so this is a regression at the cancellation seam. Bound of the fix: wrap when
`combined.aborted` and the error is not itself a `ProviderAbortError` (a remote abort reported by
`read` keeps its own partial); never wrap when the signal is not aborted.
