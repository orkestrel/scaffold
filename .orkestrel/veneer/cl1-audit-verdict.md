# CL1 — audit verdict

Subject: unit CL1, the Content/layout proof contract, in the Veneer checkout, written by `sol`
on Astra under `units/cl1-brief.md` (amended once on its scope read: a line number and the
journey file named as an unowned consumer), report `units/cl1-report.md`, over the U7f-fix
landing `060ce02`. Claims: `cl1-audit-claims.md`. Evidence rendered for the read-only lanes:
`units/cl1-diff.patch.txt` and `units/cl1-status.txt`. Scope: implementation only, by the
user's ruling.

## Round 1, 2026-09-21

Astra wrote the unit, so the lanes are swapped: Opus holds the objective lane and Astra the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_e37cd732-c28` | `units/cl1-audit-reviewer-brief.md`, `units/lane-cl1-reviewer.md` | fix round on claim 5 (finding 8); findings 9 to 11 |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c330-0f53-7163-b4a9-52bb53045196`, exit 0 | `units/cl1-audit-analyst.sh`, `units/cl1-audit-analyst-report.md` | fix round on claim 5 (the `resolve*` prefix) |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/cl1-audit-checker-brief.md`, `units/lane-cl1-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/cl1-gate-brief.md`, `units/lane-cl1-verifier.md` | every step exit 0 (eighteen steps, `npm test`, the Edge setup, styles, and journey runs, the read-only `scaffold audit`) |

Claims 1 to 4 CONFIRMED by the reviewer and the analyst (the exclusion scanner's membership
check and nested absence, the property-free admission with Button still withheld, the
root-scoped drive whose hold reproduces the installed verb body because the installed verb takes
only a name, the breakpoint helper's restore under a failing async visit); claim 6's guide half
CONFIRMED by the reviewer and the checker and its gate half from the verifier (`test:guides`
green; `test:policy` runs inside `npm test`, green); claim 7 CONFIRMED from the verifier. Claim
5 REFUTED twice on different conjuncts: the analyst on the helper's name (`resolveOracleButton`
reads a live target and throws, the `read*` contract, where `resolve*` picks from options) and
the reviewer on placement (`visitBreakpoint` is a browser helper in the host-independent styles
module, kept loadable through a dynamic import, with its cases split into the browser proof
against the sibling-proof rule). Reviewer 9 (the hold's cleanup drops the pressed-state error
when the release rejects) and 10 (the unit identifier in two test data) are cheap and carried.
Reviewer 11 (the root-bounded resolver takes the first reachable match inside a root) is
recorded as the residual bound the duplicate-name control does not reach. The analyst's note
that the earlier `resolveButton` has the same prefix defect is recorded as a bound for CL11,
which owns that helper's consumers.

### Findings carried into the fix round (`units/cl1-brief-2.md`)

1. Analyst 5: `resolveOracleButton` renamed `readOracleButton`, with its callers, import,
   inventory, and cases.
2. Reviewer 8: `visitBreakpoint` moved to `tests/setupBrowser.ts` over the static `page` import;
   `BREAKPOINT_CASES` stays in the styles module; both inventories updated.
3. Reviewer 9: the hold's cleanup rethrows the original error with the release rejection as
   `cause`.
4. Reviewer 10: the two test data named for what they are.

### Terminal (round 1)

Verdict: fix round. `units/cl1-brief-2.md` on Astra; Opus stays the objective auditor.

## Round 2 (2026-09-21, the fix round under `units/cl1-brief-2.md`)

Lanes: reviewer on Opus 5 holding the OBJECTIVE lane (`units/lane-cl1-2-reviewer.md`,
workflow `wf_6d2440af-6b2`); analyst on Astra holding the SUBJECTIVE lane
(`units/cl1-audit-2-analyst-report.md`, thread `01a0c341-527e-75f3-87ba-df727d88fc3e`, exit 0);
checker on Sonnet (`units/lane-cl1-2-checker.md`); verifier on Sonnet
(`units/lane-cl1-2-verifier.md`) over `units/cl1-gate-brief.md`. Astra wrote the unit and the
fix, so the lanes stay swapped from round 1. Claims: `cl1-audit-claims-2.md`; evidence
`units/cl1-diff-2.patch.txt` and `units/cl1-status-2.txt` over the base `060ce02`.

| Claim | Reviewer (objective, Opus) | Analyst (subjective, Astra) | Checker | Verifier |
| --- | --- | --- | --- | --- |
| 1 `readOracleButton` | CONFIRMED (`tests/setupBrowser.ts:303`, callers, import, inventory, cases; no `resolveOracleButton` outside `node_modules`) | CONFIRMED | CONFIRMED | — |
| 2 `visitBreakpoint` home | CONFIRMED (`tests/setupBrowser.ts:38-46` over the static import; no node project loads the browser setup; inventories moved) | CONFIRMED | CONFIRMED | — |
| 3 hold cleanup `cause` | CONFIRMED (`tests/setupBrowser.ts:359-366`, the installed verb's shape at `index.js:599-606`; case `setupBrowser.test.ts:253-285` with a real release rejection) | CONFIRMED | CONFIRMED | — |
| 4 test data names | CONFIRMED (identity assertion; `.unreachable-selector` absent from the pinned inventory) | CONFIRMED | CONFIRMED | — |
| 5 scope, law, gates | CONFIRMED static half; gate half assigned to the verifier | UNDECIDABLE as a whole, no blocker | CONFIRMED mechanical half; gate half deferred | every step exit 0 on Chromium and Edge; `scaffold audit` reports only the pre-existing `setupListeners` note and the three registry majors |

Reconciliation. Every claim is CONFIRMED by every lane that could rule on it, and the verifier
closes claim 5's gate half: `format:check`, `lint:check`, `check`, `build`, `test:setup`,
`test:setup:browser`, `test:conformance`, `test:src:styles`, `test:app:browser`, `test:journey`,
`test:guides`, the whole `npm test` chain, and the Edge runs of the browser setup, the styles
project, and the journeys all exit 0, with the status identical before and after. The analyst's
UNDECIDABLE on claim 5 is the gate half it could not run, which the verifier ran.

Reviewer extra findings, non-blocking, carried as bounds:

6. `visitBreakpoint` restores in a bare `finally`, so a restore rejection would replace the
   action's failure (the class claim 3 closed in the hold). No case reaches a rejecting
   `page.viewport`. Carrier: the next unit that owns `tests/setupBrowser.ts` (CL11; a unit that owns the file for another reason does not
   take them).
7. `holdOraclePointer` has no case for the unreachable-after-scrolling refusal or for the
   pressed-state miss with a successful release. Same carrier.

No lane found an implementation defect that forces another round.

### Terminal (round 2)

Verdict: accept. Land with `units/cl1-land.sh`.
