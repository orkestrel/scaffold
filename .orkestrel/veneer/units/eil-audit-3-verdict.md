# E-ID-LAYOUT audit, round 3 — the Orchestrator's reconciliation (2026-09-25)

Claims: `eil-audit-3-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`eil-audit-3-objective-verdict.md`, thread `01a0d5fc-cb89-73f0-9625-c98687af8a5f`); the subjective lane, `reviewer` on
Opus 5.5 (`eil-audit-3-subjective-verdict.md`); and `checker` on Sonnet (`eil-audit-3-checker-verdict.md`). The unit
was written by `opus` on Opus 5.5, so the objective lane ran on an engine that did not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 2 | BROKEN | CONFIRMED | — | Dropped on the record as a claims-file fault: "keeps the tag's default" was written for class presence, and a utility such as `.d-block` or `.border-0` overrides the one property it names, which is the direct control the tenets require. Both lanes found the substance held: no selector reads a tag's context or a class's presence. |
| 3 | BROKEN | BROKEN | — | Broken: the flex `figure` encloses the attributed quotation footer's end margin, so the figure box reads 63.14px against Bootstrap's 51px. Addendum 3 returns `figure` to block flow. The `.figure` width (148.44px against 169.64px) follows Veneer's caption type and is recorded as a typography departure. L1. |
| 4 | CONFIRMED | CONFIRMED | — | Held. |
| 5 | CONFIRMED | CONFIRMED | — | Held. |
| 6 | CONFIRMED | CONFIRMED | UNRESOLVED | Held on the rows; the gate clause is dropped on the record, because a claims file carries no gate claim (`../plan.md` § Process corrections). |
| 7 | BROKEN | BROKEN | CONFIRMED | Broken: "lays the figure class pattern out as the release does" names its reference, and no assertion compares Bootstrap. L2. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| L1: the flex figure encloses the footer margin | both lanes, claim 3 | Holds; Addendum 3. | E-ID-LAYOUT round 4 (`e-id-layout-brief-4.md`) |
| L2: the `.figure` case title | both lanes, claim 7 | Holds; the subjective lane's title, verbatim. | E-ID-LAYOUT round 4 |
| L3 (CASE-MATRICES): inline case matrices in `figure.test.ts` | objective | Holds (`.claude/rules/tests.md`). | E-ID-LAYOUT round 4 |
| L4 (UNRUN-INTEGRATION): the briefs named `integration.test.ts` under `app:browser`, which excludes it | objective | Holds; the Orchestrator's brief named a command that cannot run the file. The landing chain runs it through `test:journey`, with and without capture. | The E-ID landing chain |
| L5: the E-ID-FLOW collision (a flex figure plus a figure margin) had no carrier | subjective referral A | Closed by Addendum 3. | E-ID-LAYOUT round 4 |
| L6: the flex display may no longer earn its place | subjective referral B | Ruled in Addendum 3. | E-ID-LAYOUT round 4 |
| L7: `button:not([class], [data-bs-target])` contradicts Addendum 2 | subjective referral C | Holds. | The E-ID-BUTTON design round (`e-id-button-design-brief.md`) |

VERDICT: FAIL 3, 7; outside the claims: L3, L4
