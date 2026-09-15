# Probe P17 — the writer-only live mutation controls, replayed by the Orchestrator (2026-09-15; A13e-O 4, A13f-O 8)

Instrument: `P17-controls.sh.txt` with `P17-mutate.mjs.txt`, run from the ollama checkout on the host in the real Edge against the live daemon; `tests/setupServer.ts` restored from a byte copy after each control (SHA-256 prefix `2f7a869f2ede373e` before and after all three; the copy includes the Orchestrator's one-sentence TSDoc fix K13-fix taken just before).

- Control A (U13g mutation 1 — the catch drops the losing acquisition's release): `releases the acquisition its deadline outran instead of waiting on it` FAILS — `expected undefined to be an instance of Error` (the stranded browser still answers). Reproduced.
- Control B (U13g mutation 2 — the post-release signal read removed): `refuses an attempt whose release crossed its allowance` FAILS — `expected 'undefined' to be 'the page attempt released its browser…'`. Reproduced.
- Control C (U13e mutation 2a — the page driver reports the turn after the dispatching one): `executes a page tool through an agent over a live Ollama relay…` FAILS — `expected 1 to be +0` (the `dispatched.turn === 0` pin). Reproduced.

Closes A13e-O claim 4 and A13f-O claim 8's live-replay half.
