# Audit A13e — close the U13g round and the U13 chain (`@orkestrel/ollama`: the page proof)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/ollama`):
  OBJECTIVE and cross-engine lane (Opus 5 wrote U13b–U13g). The setup project's hermetic proofs
  are yours to execute (`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose
  --project setup tests/setupServer.test.ts -t <name>`; if Vitest's writes are refused, drive the
  exported helpers through a non-writing Node loader as before and say so); live vectors are
  `UNRESOLVED` with the exact command. Every evidence file is staged beside this brief in
  `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane — the shape of
  `boundPageAttempt(bounds, acquire, observe)`, `releasePageAttempt`, `expirePageAttempt`,
  `describeFailure`, `PageAttemptBounds`, `PAGE_BOUNDS` with `release`; the names against
  `.claude/rules/names.md`; the guide's contract 13 and test bullets in the repository's voice.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — every U13g carrier closed at
  the `file:line` the report names; the red-first and mutation logs; scope; the probe; the chain
  walk (claim 9).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` (the Astra
lane reads the staged copies) and the ollama tree at `C:/Users/mikes/WebstormProjects/ollama`.
Perform the audit directly and spawn nothing. This round closes the chain: rule on every claim and
name any remaining defect with its vector, or state the chain is closed.

## Subject

The `ollama` checkout at checkpoint `295fecb` plus the working tree after U13b, U13c, U13e, U13f,
U13g (brief `U13g-ollama-page-fix-brief.md`, report `U13g-ollama-page-fix-report.md`). Previous
verdicts: `A13d-audit-analyst.md` (`FAIL 2, 3, 4, 5, 7, 9, 10`), `A13d-audit-checker.md` (`PASS`).
Installed: `@orkestrel/browser` 0.0.16 — the server entry declares `BrowserOptions.signal`
(`dist/src/server/index.d.ts:431`), the core entry's page-command options carry `timeout` only
(the report's corrected table); `@orkestrel/test` 0.0.14; `@orkestrel/contract` (`isError`).

## Review evidence

- `U13g-diff.patch.txt` (`git diff HEAD`) and `U13g-page.test.ts.txt` (the untracked page proof);
  `U13f-diff.patch.txt`, `U13f-page.test.ts.txt` for the delta.
- `U13g-ollama-page-fix-report.md` — the writer's report with the corrected declaration table, the
  red-first and mutation logs, the elapsed readings.
- `U13g-ollama-gates-orchestrator.log.txt`, `U13g-ollama-gates-test-full.log.txt` — the
  Orchestrator's gates after U13g.
- `U13g-ollama-service-verbose.log.txt` — the Orchestrator's authoritative whole-`service` run.
- `collide3-ollama-after-u13g.txt` — the export-name collision probe.
- `K-edge-residue.txt` — the Orchestrator's host residue reading after U13f (none headless).

## Numbered falsifiable claims

1. **The connection is cancelled through the supported signal.** `createPageSession` hands the
   attempt signal to `createBrowser` as `BrowserOptions.signal` (`tests/setupServer.ts:1073`); an
   expiry during launch or connect ends at the dependency (the launch-half control reads ~100 ms).
   Falsify with an acquisition step the signal does not reach.
2. **Completion is bounded on every path.** `boundPageAttempt` (`setupServer.ts:1231`) races
   acquisition and observation against the allowance, then `releasePageAttempt` (`:1177`) races the
   losing acquisition's settlement plus `session.destroy()` against the `release` share and throws
   (naming the stranded browser) rather than waiting; the signal is read after the observation and
   after the release; a release that crossed the allowance is a failure. Execute the hermetic
   proofs (`setupServer.test.ts:817`: satisfied path releases once; parked acquisition; parked
   release; crossed release) and rule whether any path still awaits an unbounded promise.
3. **The bounds are the guarantee.** `PAGE_BOUNDS` (`setupServer.ts:638`): `attempt` 85 000 +
   `release` 10 000 ≤ `case` 110 000; `attempts × (attempt + release) ≤ budget ≤ retry`;
   `command ≤ release`; the proof (`setupServer.test.ts:933`) asserts membership and every
   containment; no sum over dependency operations. Falsify with an admissible schedule whose
   completion exceeds `attempt + release`.
4. **The live controls assert elapsed completion** (`page.test.ts:560,623,670`): the over-long
   attempt, the delayed acquisition, the crossed release — each asserts the whole call's elapsed
   time against `allowance + release`, each reddened under a named mutation (the report's logs), each
   green in the authoritative run.
5. **The ruling is corrected everywhere**: the page-proof header, the `PAGE_BOUNDS` and
   `expirePageAttempt` remarks, `createPageSession`'s remarks, and contract 13 say the connection
   observes the signal and page commands are raced; no sentence still says the surface accepts no
   signal.
6. **The prose states the measured guarantee** (`guides/ollama.md:124`, `:359`, `:368`).
7. **The shape is right (reviewer's lane leads).** `boundPageAttempt(bounds, acquire, observe)`
   taking an acquisition function; the session constrained as `Pick<PageSessionInterface,
   'destroy'>`; `describeFailure` as an exported leaf over `isError`; `PageAttemptBounds`;
   `AbortSignal.timeout` over the declared `@orkestrel/timeout`. Rule on names and on whether any
   of these is a wrapper the design laws forbid.
8. **Nothing else moved; nothing re-implements an installed export.** The four owned files; the
   three untouched setup files byte-identical to U13f (the report's comparison); the probe clean;
   `waitForAbort`, `retryUntil`, `createTeardown`, `waitForCondition`, `isError` reused; no headless
   Edge after the run.
9. **The chain is whole.** Every FAIL from A13, A13b, A13c, and A13d names a closing test or a
   recorded ruling in the tree.
10. **The authoritative service run is green** (`U13g-ollama-service-verbose.log.txt`), controls
    included, within their bounds; the gates exit 0.
11. **Ship the ollama tree as the next patch release** after the `guides/agent.md` mirror refresh?
    Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or
`NOT-EVIDENCED`) with the evidence, findings outside the claims under `outside:` (or `outside:
none — chain closed`), and ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
Nothing else.
