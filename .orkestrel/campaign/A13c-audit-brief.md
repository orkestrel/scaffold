# Audit A13c — close the U13e round (`@orkestrel/ollama`: the page proof after A13b)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b, U13c, U13e). Do not attempt a browser or
  daemon run; the setup project runs in the sandbox and its inert controls are yours to execute.
  Name each unexecuted live vector as `UNRESOLVED` with its exact command and read the
  Orchestrator's logs under Review evidence. Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U13e carrier closed at
  the `file:line` the report names; the red-first and control logs; scope; the probe. Read the
  evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the ollama
  tree at `C:/Users/mikes/WebstormProjects/ollama`.

Perform the audit directly and spawn nothing. Assume the round left one defect and go looking for it.

## Subject

The `ollama` checkout at checkpoint `295fecb` plus the working tree after U13b, U13c, and U13e
(brief `U13e-ollama-page-fix-brief.md`, report `U13e-ollama-page-fix-report.md`). The previous
round: `A13b-audit-analyst.md` (`FAIL 1, 2, 5, 6, 10, 11, 14`), `A13b-audit-checker.md` (`PASS`).
Installed: `@orkestrel/test` 0.0.14 (`retryUntil` — read its source for what it catches and what
it rethrows), `@orkestrel/browser` 0.0.16, `@orkestrel/agent` 0.0.22, `@orkestrel/tool` 0.0.14.

## Review evidence

- `U13e-diff.patch.txt` (`git diff HEAD`: the tracked files) and `U13e-page.test.ts.txt` (the
  untracked page proof in full). `U13c-diff.patch.txt` is the previous state, for the delta.
- `U13e-ollama-page-fix-report.md` — the writer's report with the red-first and control logs and
  the receipt.
- `U13e-ollama-gates-orchestrator.log.txt`, `U13e-ollama-gates-test-full.log.txt` — the
  Orchestrator's gates after U13e.
- `U13e-ollama-service-verbose.log.txt` — the Orchestrator's authoritative run of the whole
  `service` project in a real Edge against the live daemon.
- `collide3-ollama-after-u13e.txt` — the export-name collision probe.

## Numbered falsifiable claims

1. **Only a sampling miss retries.** The attempt producer never throws — acquisition, every read,
   and the release are retained on the attempt as `fault` — and `acceptPageAttempt`
   (`tests/setupServer.ts:1246`) is the predicate `retryUntil` rethrows from: a fault, a record with
   neither reading, and a serialized `PageOutcome.failure` throw; only a model that answered without
   dispatching the tool answers `false`. Execute the hermetic proof
   (`tests/setupServer.test.ts:554`; `npx.cmd vitest run --config vite.config.ts --no-cache
   --reporter=verbose --project setup tests/setupServer.test.ts -t acceptPageAttempt`) and read
   `retryUntil`'s source to confirm a predicate exception escapes. Falsify with a failure the
   producer can still throw, or a reading the predicate retries that another launch cannot clear.
2. **The receipt is pinned by turn on both wires**, present in the next-turn `role: 'tool'`
   message and absent from the dispatching turn's request on the relay AND the daemon, with
   `dispatched.turn === 0` (`page.test.ts:296,315`); the report's controls 2a and 2b reddened.
3. **One attempt allowance the case contains.** `PAGE_BOUNDS` (`tests/setupServer.ts:617`):
   `commands × command + ready + reads × read + evaluate = attempt` (95 000 ms) ≤ `case`
   (110 000); `run < evaluate`; `read < evaluate`; `attempts × attempt ≤ budget ≤ retry`; the proof
   (`setupServer.test.ts:665`) enumerates every allowance an attempt can spend. Falsify with a
   deadline `createPageSession` or `readOutcome` spends that the sum omits, or an admissible
   schedule that exceeds `case` while every inner bound holds.
4. **The operation table is proven at runtime.** `scanPageOperations` is gone with its tests;
   `page.test.ts:122` reads `Object.keys(globalThis.page)` in the real browser against
   `OPERATIONS` (`:85`); the hermetic `PAGE_DOCUMENT` proof is a presence guard worded as one
   (`setupServer.test.ts:543`).
5. **The guide's recorder sentence is true** (`guides/ollama.md:368`): request recorders (browser
   log, Resource Timing drain, fixture record) and fault recorders (page error recorder, console
   recorder) are the ones the assertions read; contract 13's retry rule (`:124`) states claim 1.
6. **`acceptPageAttempt` and `PageAttempt` collide with nothing installed** and do a job no
   installed export does; `acceptPageAttempt` reading `PAGE_TOOL.name` is one declaration, not a
   hidden coupling.
7. **Nothing else moved.** Only `tests/setupServer.ts`, `tests/setupServer.test.ts`,
   `tests/service/page.test.ts`, and `guides/ollama.md` changed this round; `tests/setup.ts`,
   `tests/setupService.ts`, `tests/setupService.test.ts` carry U13c's diff unchanged; no `src/**`,
   manifest, lockfile, or `scaffold repair` file.
8. **The authoritative service run is green** (`U13e-ollama-service-verbose.log.txt`): every
   `relay`, `tools`, and `page` case passed on the host within its bound; the gates exit 0.
9. **Would you ship the ollama tree as the next patch release** once `guides/agent.md` is refreshed
   from the agent checkout? Name what must change first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:`, and ONE terminal
line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
