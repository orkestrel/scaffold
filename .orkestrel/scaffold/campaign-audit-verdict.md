# Campaign audit — round 1 verdict and reconciliation (2026-09-02)

Subject: `tmp/units/audit-brief.md` (claims 1–26) over the skills, the `@orkestrel/test`
additions and resolver fix, the form guide, the terrain reference suite, the fleet visits, and the
capture portfolio at scaffold `3df4e22`, test `c98f3ba`, form `56e7d9f`, terrain `93677fb`.

## Lanes

| Lane       | Role       | Engine       | Ran | Verdict                                                     |
| ---------- | ---------- | ------------ | --- | ----------------------------------------------------------- |
| Subjective | `reviewer` | Opus 5       | yes | FAIL — 5 broken, 4 unresolved, 6 findings outside the claims |
| Objective  | `grok`     | Cursor Grok  | yes | FAIL — 9 broken, 0 unresolved, 2 findings outside the claims |
| Checker    | `grok`     | Cursor Grok  | yes | FAIL — 9 broken (1, 2, 3, 4, 6, 7, 19, 21, 25), 0 unresolved, 0 findings outside the claims |

Sol is dark this session; Grok holds the objective lane by the user's standing ruling. Both Grok
lanes ran one at a time on the bench, journals under `tmp/cursor/`.

## Reconciliation per claim

| Claim | Subjective | Objective | Ruling                                                                                                                                                                     | Carrier |
| ----- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1     | CONFIRMED  | BROKEN    | Rule line by line under `AGENTS.md` § Instruction files: rationale stays only where it changes a judgment call.                                                           | FX1     |
| 2     | CONFIRMED  | BROKEN    | Same as 1 for the named lines in `layer.md`, `styles.md`, `capture-harness.md`.                                                                                             | FX1     |
| 3     | BROKEN     | BROKEN    | Add a second negative control through the extraction door for the two class instruments; a translucent-stack control for composited contrast.                                | FX1     |
| 4     | CONFIRMED  | BROKEN    | The step row already scopes the fixed set and names the indicator's set; word it as one rule. Substance stands.                                                             | FX1     |
| 5     | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 6     | BROKEN     | BROKEN    | Rung 4 points at the exception; absolute never-take sentences removed or conditioned.                                                                                       | FX1     |
| 7     | BROKEN     | BROKEN    | Restatements cut to pointers; one statechart trigger.                                                                                                                       | FX1     |
| 8     | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 9     | BROKEN     | CONFIRMED | Orchestrator ran the question: `captureFrame` reads back and compares bytes (`helpers.ts` 1930–1931) and has the path-mismatch voice (1927). Subjective lane stands.        | FX1     |
| 10    | CONFIRMED  | CONFIRMED | Stands; one-word tightening carried.                                                                                                                                       | FX1     |
| 11    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 12    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 13    | CONFIRMED  | CONFIRMED | Stands; the build-rejection prefix is F6.                                                                                                                                  | FX2     |
| 14    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 15    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 16    | UNRESOLVED | CONFIRMED | Objective lane read the ruling and the manifest (no `dependencies`); stands pending the checker's catalog survey.                                                            | checker |
| 17    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 18    | CONFIRMED  | CONFIRMED | Stands; case inconsistency between the table cells and the bullets carried as a small fix.                                                                                 | FX4     |
| 19    | CONFIRMED  | BROKEN    | Orchestrator ran the question: `setup.ts` 1328 waits on `document.querySelector('.modal-backdrop')`. Objective lane stands.                                                | FX3     |
| 20    | CONFIRMED  | CONFIRMED | Stands; the 390 truncation is F2.                                                                                                                                          | FX3     |
| 21    | BROKEN     | BROKEN    | `negative control` where the instrument sense is meant; bare `variant` reserved for the capture axis; `state` qualified.                                                     | FX1     |
| 22    | CONFIRMED  | CONFIRMED | Stands.                                                                                                                                                                    | —       |
| 23    | UNRESOLVED | CONFIRMED | Objective lane read the two passes and the report's red-then-green; the verifier's full chain at `c98f3ba` (`gates-resolve-report.md`) is the executed evidence. Stands.  | —       |
| 24    | UNRESOLVED | CONFIRMED | Objective lane read the visit reports and manifests; the checker re-reads the ranges.                                                                                       | checker |
| 25    | CONFIRMED  | BROKEN    | Both lanes fault the meta-row's placement; it moves to open the checklist and binds the deliverable's checks file.                                                          | FX1     |
| 26    | UNRESOLVED | CONFIRMED | Objective lane traced every helper and the `#teardown` read; the terrain gate chain was green at the visit. Stands.                                                         | —       |

The checker names the same nine claims as the objective lane and adds two voice lines
(`orkestrel-prove-journey/SKILL.md` 54, `capture-harness.md` 38) and a third sense of `control`
(the interactive target, `SKILL.md` 66–67), sent to FX1 in flight. Claims 16 and 24 it confirmed,
so both stand.

## Findings outside the claims

| Finding | Source           | Ruling                                                                                                                                                       | Carrier |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| F1      | subjective       | Confirmed by grep (`guides/test.md` 1205). Rename.                                                                                                           | FX2     |
| F2      | subjective       | Confirmed by the Orchestrator on `schedule-empty--light-390.png`. Fix the capture staging; pin frame height; re-film.                                        | FX3     |
| F3      | subjective       | Class assert at `setup.ts` 1402 confirmed. Re-pin on rendered facts; measure the armed Delete per variant; no repaint under `app/**`; the outline reading is carried to the user as a product observation. | FX3     |
| F4      | both             | The skill's law stands; the plan's exclusion was not on evidence. Declare and prove the transport family, or name the missing seam.                          | FX3     |
| F5      | subjective       | Export stays `extractStyles` per the ecosystem ruling; prose names the reading by its export; the guide records the reason.                                  | FX1, FX2 |
| F6      | subjective       | Confirmed by reading `executeScenarios`. Prefix the build phase with the transition name and `cause`; correct `@throws` and the guide.                         | FX2     |
| G2      | objective        | Confirmed by grep: `tests/guides.test.ts` has no transcription of the `readClasses` / `extractStyles` fence. Transcribe.                                      | FX2     |

## Fix round

- FX1 `fix-skills-brief.md` — Opus `implementer`, scaffold. Auditor: Grok (the other lane).
- FX2 `fix-test-brief.md` — Opus `implementer` standing in for Sol, test. Auditor: Grok.
- FX3 `fix-terrain-brief.md` — Opus `implementer`, terrain. Auditor: Grok.
- FX4 — the form guide's category case, an Orchestrator-owned one-line unit with form's guides
  test as its gate.

Round 1 verdict: FAIL. The round closes when the fix units return, the fix-round audit on an
engine that did not write them passes, and the verifier reads every chain green.

## Fix round, lane A (Grok objective, 2026-09-02)

Ruled on claims 1–13 and 18–21 over `fix-scaffold.patch` (`3df4e22..4fb7ff2`), `fix-test.patch`
(`c98f3ba..ce89721`), and `fix-form.patch`: FAIL — 2 broken (8, 19), 5 unresolved (14–17, 22,
deferred to lane B), 0 findings outside the claims. Claim 8's residue was four bare
instrument-sense `control` hits (`inspection.md` 14–15, `decide.md` 18,
`bootstrap-reference.md` 357); closed by the Orchestrator at scaffold `1a7602e`, and claim 19
follows. Lane B re-reads claim 8 at that commit with the terrain claims.

## Fix round, lane B (Grok objective, 2026-09-02)

Ruled on claims 8, 14, 16, 17, and 19 at scaffold `1a7602e`, test `e13f5d5`, terrain `7a27ee8`:
all five CONFIRMED (the vocabulary re-read, no selector reach on any journey path, the statechart
on rendered facts with the armed Delete measured and no `app/**` change, the transport family
declared and proved through the store seam, every round-1 finding carried). Claims 15 and 22
wait on the final layer build and the re-film (lane C).

FX2d stopped on its deviation contract: the body's box is the larger of the content and the
pane, so an overshoot on the box reading adds canvas rows. FX2e carries the content-edge
mechanism.
