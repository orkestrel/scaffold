# Audit A13d — close the U13f round and the U13 chain (`@orkestrel/ollama`: the page proof)

## Role and lane

One brief, two blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b–U13f). The setup project's inert controls
  are yours to execute (`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose
  --project setup tests/setupServer.test.ts -t <name>`; if Vitest's writes are refused under the
  sandbox, drive the exported helpers through a non-writing Node loader as A13c did and say so);
  live vectors are `UNRESOLVED` with the exact command. Every evidence file is staged beside this
  brief in `tmp/codex/`.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U13f carrier closed at
  the `file:line` the report names; the red-first and mutation logs; scope; the probe. Read the
  evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the ollama tree
  at `C:/Users/mikes/WebstormProjects/ollama`.

Perform the audit directly and spawn nothing. This round closes the chain: rule on every claim and
name any remaining defect with its vector, or state the chain is closed.

## Subject

The `ollama` checkout at checkpoint `295fecb` plus the working tree after U13b, U13c, U13e, U13f
(brief `U13f-ollama-page-fix-brief.md`, report `U13f-ollama-page-fix-report.md`). Previous verdicts:
`A13c-audit-analyst.md` (`FAIL 1, 3, 5, 9`), `A13c-audit-checker.md` (`PASS`). Installed:
`@orkestrel/browser` 0.0.16 (per-call `timeout`, no `signal` — the report's declaration table),
`@orkestrel/test` 0.0.14 (`retryUntil`, `waitForCondition`, `createTeardown`), `@orkestrel/timeout`
(declared development dependency; `createTimeout` is a controllable deadline).

## Review evidence

- `U13f-diff.patch.txt` (`git diff HEAD`) and `U13f-page.test.ts.txt` (the untracked page proof);
  `U13e-diff.patch.txt` and `U13e-page.test.ts.txt` for the delta.
- `U13f-ollama-page-fix-report.md` — the writer's report with the red-first and mutation logs.
- `U13f-ollama-gates-orchestrator.log.txt`, `U13f-ollama-gates-test-full.log.txt` — the
  Orchestrator's gates after U13f.
- `U13f-ollama-service-verbose.log.txt` — the Orchestrator's authoritative whole-`service` run.
- `collide3-ollama-after-u13f.txt` — the export-name collision probe.

## Numbered falsifiable claims

1. **A partial run never retries.** `acceptPageAttempt` (`tests/setupServer.ts:1342`) reads
   `fault`, absent outcome, serialized `failure`, absent result, `result.partial`, then tool
   selection; only a COMPLETED answer without a dispatched tool answers `false`. Execute the
   hermetic proof (`tests/setupServer.test.ts:555`) and the A13c vector
   (`{turns:[0],tools:[],result:{content:"starting",partial:true}}`). Falsify with a reading that
   still retries though another launch cannot clear it.
2. **One attempt deadline governs the lifecycle.** `boundPageAttempt` (`setupServer.ts:1145`) races
   acquisition and observation against `AbortSignal.timeout(allowance)` through
   `expirePageAttempt` (`:1110`), releases the session in a `finally`, and settles an acquisition
   the deadline outran before rethrowing; `createPageSession` refuses an already-aborted signal
   and hands it to the readiness wait. Rule whether any operation inside the attempt can outlive
   the allowance unobserved (a browser command with its own `timeout` longer than the remaining
   allowance is cut by the race; is anything not raced?), and whether an expiry can leak a browser
   (the live control `ends an over-long attempt on its own allowance and leaves no browser behind`
   reddened under two mutations — `U13f-ollama-page-fix-report.md`).
3. **`PAGE_BOUNDS` states what the code runs**: shares inside one allowance (`command`, `ready`,
   `read`, `evaluate`, `run` inside `evaluate`), `attempt + command ≤ case`,
   `attempts × attempt ≤ budget ≤ retry`; no sum over operations the dependency does not expose;
   the proof (`setupServer.test.ts:743`) asserts membership and containment.
4. **The ruling (b) is correct**: the installed `@orkestrel/browser` accepts a per-call `timeout`
   and no signal (the report's table over `dist/src/core/index.d.ts:211,1554,1574,1859,2340,2968,
   3006`), so racing the attempt is the only deadline the surface allows; and `AbortSignal.timeout`
   rather than the declared `@orkestrel/timeout` `createTimeout` is right for a one-shot deadline
   with no control surface (rule on it).
5. **The prose is true** (`guides/ollama.md:124`, `:359`, `:368`): the retry rule, the one deadline,
   the shares, the control.
6. **Nothing re-implements an installed export**; `expirePageAttempt` and `boundPageAttempt` collide
   with nothing and do a job no installed export does (rule on `waitForAbort` from
   `@orkestrel/test` against `expirePageAttempt`).
7. **Nothing else moved**: the four owned files only; `tests/setup.ts`, `tests/setupService.ts`,
   `tests/setupService.test.ts` byte-unchanged from U13c; no `src/**`, manifest, lockfile, or
   `scaffold repair` file; no headless Edge left running.
8. **The authoritative service run is green** (`U13f-ollama-service-verbose.log.txt`), the control
   included, within its bound; the gates exit 0.
9. **The chain is whole.** Every FAIL from A13, A13b, and A13c names a closing test or a recorded
   ruling in the tree.
10. **Ship the ollama tree as the next patch release** after the `guides/agent.md` mirror refresh?
    Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:` (or `outside:
none — chain closed`), and ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
