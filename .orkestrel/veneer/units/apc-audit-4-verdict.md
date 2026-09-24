# AP-COLOR audit, round 4 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apc-audit-4-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apc-audit-4-objective-verdict.md`, thread `01a0d58f-4f6d-7653-903c-71e608af112d`); the
subjective lane, `reviewer` on Opus 5.5 (`apc-audit-4-subjective-verdict.md`); and `checker` on Sonnet
(`apc-audit-4-checker-verdict.md`). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine
that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | BROKEN | BROKEN | CONFIRMED | Dropped on the record as a claims-file fault: `apc-4.diff` holds the owned test alone while `apc-3.diff` holds every file, so "differs in those two lines alone" compares unlike scopes. Both lanes found the substance held: the statuses match, and the test's section differs from round 3's in the two titles and the blob `index` line alone. Round 5's claims compare like scopes with a controlled instrument. |
| 2 | BROKEN | BROKEN | UNRESOLVED | Broken: the K1 title says the emphasis class follows a retuned body text, and no assertion reads the emphasis class after the body-text retune. The title was the Orchestrator's wording in `ap-color-brief-4.md`, which also forbade the assertion that would make it true. M1. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| M1: the K1 title claims the emphasis class follows a body-text retune | both lanes, claim 2 | Holds. The fix adds the assertion, red first, rather than narrowing the title. | AP-COLOR round 5 (`ap-color-brief-5.md`) |
| M2 (O1): the density-and-channel case reads the emphasis class and its title never names it; round 3's reconciliation carried this nowhere | subjective | Holds, and the carry was missed. | AP-COLOR round 5 |
| M3: the retained mutation runner's emphasis-opacity selector no longer matches the renamed title, and a runner that selects nothing can read as a pass | subjective referral | Holds. | AP-COLOR round 5, a successor runner that refuses an empty selection |
| M4: the retained report named launch paths and round 1's shared patch | subjective referral | Holds on the Orchestrator's retention; the retained report and check file now name retained paths and `apc-shared-3.patch`. | Closed by the Orchestrator at retention |

## The seam ruling

This is the fourth round at one seam: a `color.test.ts` title that names more or less than its assertions read. Each
retitle relocated the gap. The recurrence has no direction, so the seam takes a ruling instead of a fifth retitle:

- **Invariant.** A case title in `tests/src/styles/utilities/color.test.ts` names every element its assertions read
  and every condition under which it reads that element. An assertion that only proves a retune reached its scope,
  such as the `.text-bg-primary` consumer, is a control and the title need not name it.
- **Bound.** Never widen a title to an element or a condition no assertion reads. Close a gap by adding the assertion
  that proves the named property, red first under a named mutation; narrow the title only where the property is
  false.
- **Interface.** Every case in that file, swept once in round 5, with a per-case record in the round-5 report.

Both lanes proposed a fix for claim 2: the objective lane the narrower title, the subjective lane the added assertion.
The ruling takes the added assertion, because it proves the ruled behaviour instead of describing the gap.

VERDICT: FAIL 2; outside the claims: M1, M2, M3
