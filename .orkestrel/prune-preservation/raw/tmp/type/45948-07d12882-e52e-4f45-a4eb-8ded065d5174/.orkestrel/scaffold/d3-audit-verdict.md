# Unit D3 — audit verdict

Round three, 2026-09-17. Subject: unit D3's delta, closing the findings round two carried. Written by
Opus 5.

**Ruling: ACCEPT, subject to the independent gate run.** D3 adopted every prescription the round-two
verdict carried except one test-name string, and it closed the blocking finding with exactly the
mutation probe `.claude/rules/quality.md` § Rounds and verdicts permits in place of a fresh
cross-engine round. The one departure was verified directly by the Orchestrator and is an
improvement on the wording it replaced.

## Lanes that ran, and the one that did not

| Lane       | Role and engine                   | Verdict | Report              |
| ---------- | --------------------------------- | ------- | ------------------- |
| Gates      | `verifier` — Sonnet, native       | see `d3-verify-report.md` | authoritative chain on the final tree |
| Subjective | not run                           | —       | —                   |
| Objective  | not run                           | —       | —                   |

**Why neither adversarial lane ran this round, stated for this round rather than as a template.**
`.claude/rules/quality.md:84` permits a fix that adopts the auditor's prescription verbatim to close
with a mutation probe instead of a fresh audit round, and requires the cross-engine round only where
the fix departs.

D3's fixes map to that rule as follows.

- **Finding 1, the blocking one.** The round-two verdict required the predicate to return `false` for
  an entry it cannot inspect, matching `isPhysicalDirectory`, and expressly permitted a local
  `try`/`catch` rather than an import edge. D3 took the permitted mechanism, and then ran the
  prescribed probe: it planted D2's shipped predicate back into a generated workspace holding a real
  `EPERM` entry, recorded the whole vendored file collapsing to `Tests no tests`, restored the
  corrected predicate, and recorded `171 passed | 3 skipped (174)`. That is the disable-watch-restore
  shape rule 84 names, run against a real denied entry rather than a simulated one.
- **Findings 5 and 6.** D3 took the subjective lane's supplied wording verbatim.
- **Findings 3 and 4.** Mechanical and fully prescribed: carry `status` and the spawn error into four
  throw messages, and make one returned collection readonly. D3 proved finding 3 by rendering the
  shipped and corrected messages side by side against a real spawn fault and a real non-zero exit.
- **Finding 2, the departure.** The subjective lane supplied
  `[inapplicable where no src environment directory exists]`. D3 wrote
  `[inapplicable where src holds no recognized environment directory]` and stated its reason.

**The departure, ruled by the Orchestrator against the code.** `publishes` filters
`['core', 'browser', 'server']`, so the case is inapplicable when `src` holds none of those
directories — not when `src` holds no directory at all. The lane's wording could be read as any
directory under `src`, which would be false for a workspace carrying `src/utils` and no recognized
environment. D3's wording states what `!publishes` actually tests. The departure is accepted as an
improvement, and it is the only one, so it does not carry the round into a cross-engine pass.

The predicate itself was read directly and matches `isPhysicalDirectory` on both facts —
`isDirectory() && !isSymbolicLink()` — with the `catch` returning `false` for every inspection error
including the absent path that `throwIfNoEntry` previously excused.

## What the round-two verdict carried, and where each landed

| Finding | Severity | State |
| ------- | -------- | ----- |
| The predicate throws where the mechanism it matches returns false | HIGH | Closed. Local `try`/`catch` reading both facts. Proven by a mutation probe with a real `EPERM` entry and a recorded control |
| The case name contradicts the case's own invariant | HIGH | Closed, with the departure ruled preceding |
| The gate evidence does not cover the final tree | HIGH | Carried to the independent `verifier`, not to D3. That run is this verdict's remaining condition |
| Child-process failures lost decisive diagnostics | MEDIUM | Closed at four sites, with both `@throws` blocks stating what a failure carries. Proven against a real spawn fault, where the shipped message rendered `undefined` and the corrected one named the null status and `EINVAL` |
| A rewritten sentence is circular | — | Closed with the lane's wording |
| A rewritten clause is ungrammatical | — | Closed |
| The returned environment collection is mutable | LOW | Closed. `Readonly<NodeJS.ProcessEnv>`, matching its sibling |
| The retained instrument names launch copies | LOW | Closed. D3's instruments name retained `.orkestrel/scaffold/d2-instruments/` paths, so they keep reproducing after the sweep |

## Recorded, not carried

- **`TestNpm.environment` is also a mutable `NodeJS.ProcessEnv`** (D3's own observation). It is
  committed code predating this change and appears in no part of the uncommitted diff. Recorded
  against whoever next owns that interface.
- **`manifestPublishes` parses as subject plus verb** — carried forward from round two, where the
  subjective lane raised it and explicitly did not require it.
- **A cross-referencing `above` at `tests/distribution.test.ts:841`**, on a line no round touched.

## The seam's round count

Three rounds at this seam, which `.claude/rules/quality.md:87` names as the budget. Recorded as a
fact rather than a feeling: round one found a predicate that left the original defect alive in a
narrower population, round two found an error-handling divergence that could take the vendored file
down at module load, and round three found nothing new because it was a prescription-adoption round
rather than a fresh attack.

The recurrence had a direction — each round's defect sat one layer under the last, in the same
predicate — and the third round reached the mechanism itself rather than relocating again. The seam
is closed by a ruling rather than by another repair: **the test derives applicability from the same
physical-directory reading the product's own `targetToEnvironments` uses, and returns `false` for any
entry it cannot inspect.** The constraint bounding it against over-correction is that a workspace
declaring the axis and vendoring no face wrapper must still fail. The interface where a consumer
meets the obligation is the vendored `tests/config.test.ts` every target receives through `repair`.

VERDICT: ACCEPT — conditional on the independent `verifier` reporting the full chain green on the
final tree. A red there reopens this verdict.
