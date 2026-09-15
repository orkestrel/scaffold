# Audit A13b — close the U13c round (`@orkestrel/ollama`: the page proof after A13)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b and U13c). Do not attempt a browser or daemon
  run; name each unexecuted vector as `UNRESOLVED` with its exact command and read the
  Orchestrator's logs under Review evidence. Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U13c carrier closed at the
  `file:line` the report names; the red-first and mutation logs; scope; the probe. Read the evidence
  under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the ollama tree at
  `C:/Users/mikes/WebstormProjects/ollama`.

Perform the audit directly and spawn nothing. Assume the round left one defect and go looking for it.

## Subject

The `ollama` checkout at checkpoint `295fecb` plus the working tree after U13b (the page proof,
`tests/service/page.test.ts`, untracked) and U13c (the fix round; brief
`U13c-ollama-page-fix-brief.md`, report `U13c-ollama-page-fix-report.md`). The previous round's
verdicts: `A13-audit-reviewer.md`, `A13-audit-analyst.md`, `A13-audit-checker.md`. The installed
`@orkestrel/browser` 0.0.16 (`createBrowser`, `findSystemBrowser`), `@orkestrel/test` 0.0.14
(`createTeardown`, `waitForCondition`, `requireValue`, `retryUntil`, `captureError`, `readPage`),
`@orkestrel/guide` (`resolvePath`), `@orkestrel/agent` 0.0.22, `@orkestrel/tool` 0.0.14 (the
campaign tarball with the registry emitter).

## Review evidence

- `U13c-diff.patch.txt` — `git diff HEAD` (the tracked files: `guides/ollama.md`, `tests/setup.ts`,
  `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupService.ts`,
  `tests/setupService.test.ts`), and `U13c-page.test.ts.txt` — the untracked page proof in full.
- `U13c-ollama-page-fix-report.md` — the writer's report, with the red-first log, the mutation
  controls, the receipt, and the per-helper reuse rulings.
- `U13c-ollama-gates-orchestrator.log.txt` and `U13c-ollama-gates-test-full.log.txt` — the
  Orchestrator's gates after U13c (`format:check`, `lint:check`, `check`, `build`, `test`, all
  exit 0).
- `U13c-ollama-service-verbose.log.txt` — the Orchestrator's authoritative run of the whole
  `service` project (`relay`, `tools`, `page`) with the verbose reporter, in a real Edge against the
  live daemon.
- `collide3-ollama-after-u13c.txt` — the Orchestrator's export-name collision probe (35 files,
  `collisions: none`).
- `A13-audit-analyst.md`, `A13-audit-reviewer.md`, `A13-audit-checker.md` — the findings this round
  carried.

## Numbered falsifiable claims

1. **An attempt's observations are retained before any read can throw, and an infrastructure fault
   escapes the retry.** `page.test.ts:147-193`: a failing read inside the observation window still
   leaves the attempt's recorded requests and fault on the attempt; a `BrowserError` or a fixture
   fault rejects the case instead of consuming an attempt. The mutation controls 1a–1c reddened.
   Falsify with a failure path that still swallows the reading or retries a fault.
2. **The receipt is pinned by turn on both wires.** The tool result appears as the `role: 'tool'`
   message of relay request index 1 and daemon request index 1 — the turn after the dispatch at
   turn 0 — and is absent from index 0; the DOM receipt is cross-checked against both.
3. **Cleanup is registered as acquired through `createTeardown`.** `createPageSession`
   (`setupServer.ts:999-1062`) registers each release at its acquisition; the setup proof
   (`setupServer.test.ts:746`) starts a real fixture and shows the U13b sequential release stranding
   the listener; `browser.destroy()` before `connect()` is pinned as idempotent.
4. **`readOutcome` narrows a JSON string across the `evaluate` boundary and refuses every other
   reading**, with a hermetic proof (`setupServer.test.ts:596`); no second `readPage` remains.
5. **The bounds are ordered so the innermost fires first.** `PAGE_BOUNDS` (`setupServer.ts:610`):
   `run` < `evaluate` ≤ `case`; `attempts × (launch + run)` ≤ `budget` ≤ `retry`; the proof pins the
   ordering; `RETRY_BUDGET === testTimeout` in `setupService.test.ts` still holds. Falsify with a
   deadline that can fire outside its container.
6. **The page document proof binds.** `scanPageOperations` reads the served page's declared
   operations, refuses a commented one, a nested call, and a missing table; `PAGE_DOCUMENT` asserts
   the scanned set. Rule whether this reader is a bounded fixture reader or a second source analyzer
   (`AGENTS.md` § Project model forbids a second parser).
7. **No `null` sentinels remain** in the page script and the guard; absence is `undefined`.
8. **The error and console recorders are certified** by the deliberate fault control
   (`page.test.ts:329-341`; mutation control 7 reddened).
9. **The direct daemon case sends and asserts a prompt** (`CAPITAL`, `page.test.ts:66,411,427`);
   mutation control 5 reproduces the A13 analyst's confusion answer.
10. **Every helper is a reuse or a ruled local declaration.** `createTeardown`, `waitForCondition`,
    `requireValue`, `retryUntil` reused; `readOutcome`, `scanPageOperations`, `rootToPath`,
    `PAGE_BOUNDS`, `PAGE_OPTIONS` declared with a stated reason; `rootToPath` instead of the audit's
    `resolvePath` because `@orkestrel/guide` exports `resolvePath(directory, target)`. Rule on each:
    name any installed export that already does the job, and rule whether `rootToPath` takes the
    right form under `.claude/rules/names.md` § Fixed derivation/construction forms.
11. **Contract 13 and the `## Tests` bullets state what the suites prove** (`guides/ollama.md:124`,
    `:368`), the `ProviderError` with code `'HTTP'` and status `401` is asserted, and the mid-stream
    cancellation is NOT attributed to the page suite (it is `relay.test.ts`'s case).
12. **Nothing else moved.** Only the six tracked files and the untracked page proof; no manifest,
    version, lockfile, `scaffold repair` file, `src/**`, or `dist/**`; `guides/agent.md` untouched
    (its refresh is the Orchestrator's mirror step).
13. **The authoritative service run is green** (`U13c-ollama-service-verbose.log.txt`): every
    `relay`, `tools`, and `page` case passed on the host, within its bound.
14. **Would you ship the ollama tree as the next patch release** once `guides/agent.md` is
    refreshed from the agent checkout? Name what must change first if not.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence (`file:line`, the log line, or the exact command an unexecuted
vector needs), findings outside the claims under `outside:`, and ONE terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
