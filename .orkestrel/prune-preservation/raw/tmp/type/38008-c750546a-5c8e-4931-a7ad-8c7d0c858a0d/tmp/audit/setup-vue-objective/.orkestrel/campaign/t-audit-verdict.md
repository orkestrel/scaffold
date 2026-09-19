# Units T1 and T2 — audit verdict (round 1)

Subject: units T1 (checkpoint `8f74726`) and T2 (checkpoint `17d8b61`) in the `@orkestrel/test`
checkout, claims in `t-audit-claims.md`. Ruled 2026-09-17.

**Ruling: FAIL — fix round T3 dispatched.** Both lanes rejected. Every sharp finding below was
reproduced by the Orchestrator in the browser (`t-audit-reproduction.log.txt`, probe retained as
`t-audit-probe.test.ts.txt`) or by a run, before ruling.

## Lanes that ran

| Lane | Role and engine | Verdict | Report |
| ---- | --------------- | ------- | ------ |
| Objective | `analyst` — `gpt-6-astra` on the Codex bench, read-only, rooted in the test checkout | FAIL 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 18, 19, 20, 21 | `t-audit-objective-report.md` |
| Subjective | `reviewer` — Opus 5, native (the writers' engine, told to attack harder) | FAIL 6, 9, 13, 14, 16, 21; outside: F1–F4 | `t-audit-subjective-report.md` |

The objective lane cannot launch a browser, so it returned its browser vectors as `UNRESOLVED`
with exact fixtures; the Orchestrator ran the ones that predicted a defect. No checker ran: the
criteria were behavioural.

## Orchestrator runs that settled a claim

| Claim | Run | Reading |
| ----- | --- | ------- |
| 9 | `npm run test:distribution -- --mode release` at `17d8b61` | the registry-backed consumer compile passed in 4,740 ms (`t-distribution-release.log.txt`) — CONFIRMED |
| 13 | the writers' mutation passes re-run bare (`t-mutations.sh`): T1 pass 2 `2 failed | 114 passed` core and `22 failed | 282 passed` browser; T2 `apply1` 6 failed, `apply2` 8 failed (one case more than the writer's 7 — the file gained a case after that reading), `apply3` 2 failed, every pass restored to zero tracked changes | the recorded reds are the mechanisms' — CONFIRMED for those passes; T1 pass 1 re-run with its own commands (`runtime`: core `2 failed | 114 passed`, browser `16 failed | 288 passed`; `resolution`: `npm run check` exit 2) — CONFIRMED in full (`t-mutations.log.txt`) |
| 3 | probe: an abort reason whose message is shaped like the timeout voice | rethrown by identity, unaugmented — held |
| 4 | probe: five settled `waitForAnimations` waits on one instrumented signal | listener count 0 before and after — held (the lane's leak derivation was wrong) |
| 15 | probe: two rows named `same`, the second failing | results per row correct, `failures` names one `same` — held |
| 17 | probe: a builder returning `undefined` under `StateScenario<…, undefined>` | phases `[]`, status `passed`, `passed` 1 — **BROKEN** |
| 16 | probe: a state reader that throws | `execute()` rejects and the root stays `running` — **BROKEN** |
| 5 | probe: a hostile `tabIndex` getter throwing `undefined` | `readRefusal` returns `undefined` and throws nothing — reproduced |
| 6 (objective half) | probe: `quota: Number.MAX_SAFE_INTEGER + 1` | accepted; an overwrite under quota consumes it as documented; the seed is copied — reproduced, minor |

## Findings carried to T3

| Finding | Source | Carrier |
| ------- | ------ | ------- |
| A builder returning `undefined` skips every phase and the row counts as passed (`context !== undefined` guards the phases) | objective 17, reproduced | T3 item 1 |
| A throwing `state` reader, or a non-`Error` phase throw, rejects `execute()` and leaves the root at `running` while four published sentences promise a terminal pair | objective 16, subjective 16, reproduced | T3 item 2 |
| A re-run clears the tally and the row results but not the rendered state | subjective F3 | T3 item 3 |
| `createStorage` cannot intercept named-property access (`Storage`'s index signature), and the guide sells substitutability ("goes wherever a real one goes", "rather than a shaped object") the mechanism does not have | subjective 6 | T3 item 4 (bound the claim; no `Proxy`) |
| `quota` accepts an unsafe integer | objective 6, reproduced | T3 item 5 |
| `readRefusal` reads a hostile `throw undefined` as resolved, because `captureError` conflates the two | objective 5, reproduced | T3 item 6 |
| `waitForText`: the empty-expectation refusal has no Contract sentence (only a fence comment), and `absent` contained in `text` is unsatisfiable yet burns the budget | objective 12, subjective F2 | T3 item 7 |
| The guide's statechart fences are not the executed table: `SCENARIOS` declares fewer rows than the harness fence's `total // 4`, and `MISMATCHED` omits its phases so the documented error is not what executes | objective 19 (the subjective lane confirmed the elision as legible; both are right — the fence reads well and does not run) | T3 item 8 |
| `README.md` ships the pre-T1 dependency shape (`:166` "and nothing else", `:12-13`) | subjective F1 | T3 item 9 |
| Contract rule 14 names `waitForEvent` as the only parking member; `waitForAnimations` parks too | subjective F4 | T3 item 10 |
| The `playState === 'running'` exclusion has no control | subjective referral | T3 item 11 |
| `: build refused` is spelled in core and in the harness with nothing tying them, and the harness's per-row refusal sentence is never asserted | subjective referral | T3 item 12 |
| The `pending`→`idle` trail asserts one browser's record batching (`added p p ol` as one record) and the pause case asserts a tail under 40 ms — host readings dressed as controls | subjective referral, T2's own least-certain claims 5 and 6 | T3 item 13 |
| `waitForState` keys its augmentation on another helper's message prefix rather than on the recorded thrown value | subjective 3 observation | T3 item 14 |
| `buildCensus` tokens are literals a consumer cascade could declare | subjective 8 adjacent | T3 item 15 |
| The `STATECHART_STATUSES` example reaches the terminal pair by index | subjective 20 minor | T3 item 16 |

## Confirmed on evidence, no carrier

Claims 1, 2, 3, 4, 7, 8, 10, 11, 12 (subjective), 14 (structural half), 15, 17 (semantics), 18,
20 (structure) held with the attacks recorded in the lane reports; claim 9 by the release-mode
distribution run; claim 13 by the mutation re-run.

## Dropped on the record

The objective lane's `UNRESOLVED` demands on claims 2, 7, 8, 10, 18, and 20 name no predicted
defect — each asks for a broader audit case (focus boundaries, census over fragments and templates
and a cross-origin sheet, control certification against a consumer cascade, slotted and inert
shadow subjects, getter-versus-edited-markup comparisons, pause tail discrimination). The
subjective lane attacked each by reading and held it. Per `orkestrel-falsify` § Reconcile and rule,
an unsubstantiated attack is a claim for a successor brief, not a finding; they are recorded here
and not carried.

## Where the lanes disagreed, and the ruling

- **Claim 19.** The objective lane executed the guide's `MISMATCHED` fence and got
  `arrange is not a function`; the subjective lane read the fence as a legible elision naming the
  rows the suite pins. Both right about different objects: the fence reads well and does not run.
  `.claude/rules/documentation.md` rules it — run the example and read what it returns — so the
  fences must be complete and executable, in the compact shape the suite itself uses (shared phase
  functions). Carried.
- **Claim 4.** The objective lane derived a listener leak from the source; the probe showed none.
  Held on the measurement.
- **Claim 5.** The objective lane predicted the `throw undefined` conflation; the subjective lane
  ruled the fixture sound and the mechanism correct. The probe reproduced the conflation; the fix
  is a local `try`/`catch` rather than `captureError`, which changes nothing the subjective lane
  ruled on. Carried as minor.

## Routing of the fix

`opus` (Opus 5, native), the writers' engine, because the proofs run in Playwright and the bench
cannot launch a browser. Every item adopts a lane's prescription verbatim where one was given, so
the round closes on the unit's mutation probes plus the Orchestrator's reproduction probe turning
green over the fixed tree; an item that departs from its prescription gets a cross-engine round
on `gpt-6-astra`.

VERDICT: FAIL 5, 6, 12, 16, 17, 19, 21; outside the claims: F1, F2, F3, F4, and the three subjective referrals

## Closure

Unit T3 adopted every prescription verbatim (three precisions recorded inside their shapes) with a mutation per item, and the Orchestrator's reproduction probe over its tree reads claims 5, 6, 16, and 17 closed and 3, 4, 15 held (`t-audit-reproduction.log.txt`); the full chain is green in the Orchestrator's reading (`t3-gates-summary.txt`). Per `.claude/rules/quality.md` § Rounds and verdicts, the round closes on those probes without a fresh audit round. T3 committed in the test checkout.
