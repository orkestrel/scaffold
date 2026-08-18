# Audit round: the four hand-edited repositories of the propagation campaign

## Role and engine

Audit lane on **GPT-5.6 Sol**. Opus 5 wrote all five units under audit and is recorded dark
(three consecutive 529s), so per the substitution table the surviving engine takes the audit; the
cross-engine requirement is satisfied because the writer was Opus.

## Posture

Attempt refutation, not confirmation. A claim you cannot break is CONFIRMED with the evidence that
convinced you. A claim you break is BROKEN with the exact failing input, state, or interleaving,
plus the smallest correct fix. Rule UNRESOLVED where you need an execution your sandbox denies —
your sandbox blocks loopback `listen`, outbound network, and some `spawnSync`; report those as
sandbox-blocked, never as failures. PLAUSIBLE-only reasoning is a source review, not a verdict —
label it.

You MAY execute: run vitest inside any of the four repositories for in-process tests. Do not edit
any tracked file. Scratch work goes under `/home/user/scaffold/tmp/` only.

## The units and their evidence

All units repaired violations of the fleet's vendored policy rules (`policy/no-mocking`,
`policy/no-keyword-privacy`).

| Repo | Unit | Diff | Report |
| --- | --- | --- | --- |
| `/workspace/browser` | API widening: `protected` removed, `request`/`raw` deleted, `send` widened with `timeout?`, `assert`/`update` published | `/home/user/scaffold/tmp/audit-browser.diff` (contains BOTH units) | `/home/user/scaffold/tmp/browser-api-unit.report.md` |
| `/workspace/browser` | Fake timers → real 20 ms timeouts in `BrowserPage.test.ts`, `CDPClient.test.ts` | same diff | `/home/user/scaffold/tmp/faketimer-browser.report.md` |
| `/workspace/console` | Fake timers → real 10 ms interval; 17 `getTimerCount` sites → observable sink assertions | `/home/user/scaffold/tmp/audit-console.diff` | `/home/user/scaffold/tmp/faketimer-console.report.md` |
| `/workspace/agent` | Fake timers → real 25 ms deadlines; 3 `getTimerCount` sites → recorded-signal + resource-count assertions | `/home/user/scaffold/tmp/audit-agent.diff` | `/home/user/scaffold/tmp/faketimer-agent.report.md` |
| `/workspace/ollama` | 4 `getTimerCount` sites → recorded-signal assertions through a refusing transport | `/home/user/scaffold/tmp/audit-ollama.diff` | `/home/user/scaffold/tmp/faketimer-ollama.report.md` |

Executed evidence already produced for you (the Orchestrator ran these; your sandbox cannot):

- `/home/user/scaffold/tmp/fleet3/browser.test.log`, `console.test.log`, `agent.test.log` — each
  repo's full `npm test` green under a contended 4-way-parallel fleet wave (2026-08-18).
- `/home/user/scaffold/tmp/ollama-test.log` plus `ollama-format:check.log`, `ollama-lint:check.log`,
  `ollama-check.log` — ollama's four gates green after its unit.
- Each unit report carries its own red/green or probe record; treat those as the writer's claims,
  not as your evidence, and re-derive what you can.

## Numbered claims — attack each

**B1.** The browser assert-coverage table is accurate against the current source: every one of the
14 rerouted CDP sites is reachable only through a public method that already asserts on entry, none
sits in `#close`/`#destroy`, and the sole behavior delta is the close-race the report names.
Re-derive this from `/workspace/browser/src/core/BrowserPage.ts` yourself; do not trust the table.

**B2.** The new `send` per-call-timeout test in `BrowserFrame.test.ts` fails if the `timeout`
argument is dropped on the forwarding line. Decide by reading `BrowserFrame.send`, `CDPClient.send`,
and the test; if you can run it in-process, do.

**B3.** The four (now five) `.includes('location.href')` fixture matchers cannot match a wrong
in-flight expression: no other expression those scripted fixtures see contains `location.href` as a
substring. Read the fixtures and every expression the tests send.

**B4.** Guide and interface parity is complete and mutual for the three members: `assert` and
`update` have `## Methods` rows and interface entries with the throw condition documented; `send`'s
row states the per-call timeout; no phantom row exists. Check `BrowserPageInterface`'s table does
NOT gain an `assert` row (the class member is `override`, excluded from the parity population — the
report's Deviation 1 explains why; verify the mechanism in
`/workspace/browser/node_modules/@orkestrel/guide` declarations if needed).

**B5.** Keeping the name `update` and refusing a `sync()` reconciler is consistent with
`.claude/rules/names.md` (one term per concept: `BrowserDownloadInterface.update`) and the
minimal-API law — and `#handleFrameNavigated` genuinely reconciles `url` after an out-of-band
`send('Page.navigate', …)`, making a manual resync path redundant. Verify that handler fires for
out-of-band navigations by reading the subscription wiring.

**T1.** Each of console's 17 replaced leak guards still reddens for the leak it names: a spinner
left running at `interval: 10` writes into a 40 ms settle window, so "sink count unchanged across
SETTLE" binds. The writer's probe recorded ≥2 writes per window with a 0-write stopped control.
Re-derive the arithmetic and, if you can, re-run `tests/src/core/Spinner.test.ts` five consecutive
times hunting a timing flake — these are real timers on a contended host.

**T2.** Console's modulo-cycle assertion (`painted[i] === cycle[i % 3]`, length ≥ 3) is at least as
strong as the fixed `['a m','b m','c m']` pin against the two defects the old test bound: a timer
that does not repeat, and a tick that does not advance the frame index. Try to construct a defective
Spinner behavior that passes the new form but would have failed the old one.

**T3.** Agent's recorded-signal instrument binds: the `ScriptedCall.signal` addition records the
run's own AbortSignal, an expiring leaked deadline aborts exactly that signal, and the writer's
mutation (removing `timeout?.clear()` from `src/core/Agent.ts:271`) reddened exactly the three
rewritten tests. Verify the wiring from `Agent.ts` to the scripted provider, and that no OTHER test
depends on `ScriptedCall`'s previous shape.

**T4 — the contradiction. Rule on it.** Agent's early-break test asserts a before/after reading of
`process.getActiveResourcesInfo()` filtered to `'Timeout'` with no net gain. Ollama's unit measured
that exact instrument and REJECTED it: "under background churn 20 of 40 clean runs reported a
nonzero delta in both directions." Both units cannot be right unless the contexts differ materially.
Decide: is agent's use reliable (for example, because the surrounding test controls all timers it
arms, or the assertion tolerates unrelated churn), or is it a latent flake that will redden a future
contended wave? If the latter, name the observable replacement — ollama's report shows the shape.
This claim decides a follow-up unit, so rule it carefully and run the test file repeatedly if your
sandbox permits (agent's tests are in-process scripted providers; they may run).

**T5.** Ollama's one recorded weakening (the async-headers-hook test no longer proves the deadline
was cleared, because the rejecting hook means no transport call and no recorded signal) is real,
honestly recorded, and correctly compensated: deleting the `timeout.clear()` in the catch at
`src/server/OllamaProvider.ts:329-335` now reddens three tests observably. Verify by reading which
tests exercise that catch path. Also rule whether the missing injection seam for the deadline is a
genuine `.claude/rules/tests.md` "missing seam" finding that deserves a follow-up capability row, or
an acceptable documented gap.

**T6.** Ollama's `createRefusingTransport` is a sanctioned boundary stub, not a reimplementation of
project-owned behavior: it implements the transport interface minimally to drive the system under
test, and `tests/setup.test.ts`'s new cases prove the helper itself per that file's contract.

**T7.** Browser's stale-timer poisoning proof binds: `#waitForLoadEvent` overwrites `#loadTimer`
without clearing a predecessor, so a leaked 20 ms timer from the failed navigate rejects the
subsequent reload window; the test's `performance.now()` guard proves the firing moment sits inside
that window. Re-derive from `src/core/BrowserPage.ts:935` region. Also rule whether the real 1 s
wait for the `BROWSER_STOP_LOADING_TIMEOUT_MS` cap is acceptable or wants a source seam.

**T8.** Mechanical closure, all four repos: no `useFakeTimers`, `advanceTimersByTime`,
`getTimerCount`, `useRealTimers`, or `setSystemTime` remains under `tests/src/`; no test was
deleted, skipped, or `.todo`'d (counts: browser 108=108, console 37=37, agent 116=116, ollama 29→30
plus setup 55→59); no `oxlint-disable`/`eslint-disable` was introduced anywhere. Verify by grep and
by reading the diffs' test registrations.

## Output

A per-claim table: claim, verdict (CONFIRMED / BROKEN / UNRESOLVED / PLAUSIBLE), evidence with
`file:line` pointers, and whether you executed or only read. For every BROKEN claim, the smallest
correct fix. Then the claims you could not break either way. Then any finding outside the claims,
briefly. End with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL` — FAIL if any claim
is BROKEN.

No process diary.
