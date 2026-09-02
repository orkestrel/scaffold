# Plan of record — skills campaign (accepted direction 2026-09-02)

The user accepted every recommendation in `design-reconciliation.md` § Questions for the user.

## Exit criterion

The campaign ends when each capability below is implemented, audited by a lane whose engine did
not write it, and gated green by an independent verifier. Anything found outside these rows is
recorded against the row that owns it for the next campaign.

| Capability | Closes when |
| --- | --- |
| A. `enterprise-bootstrap` catalog | `references/inputs.md` catalogs every input category with default affordance, markup, alternates, and the fixed state set; names no Orkestrel package; `SKILL.md` routes to it |
| B. `enterprise-bootstrap` instruments | `references/inspection.md` states each instrument as property, population, reading, control, and coverage; the custom-CSS exception is bounded by a measured vendor failure; `SKILL.md` "Mechanical proof" is a pointer |
| C. `orkestrel-prove-journey` consumption | `layer.md` imports from `@orkestrel/test/browser`; `captures.md` names `createPortfolio` and keeps the always-on proofs; `SKILL.md` carries the families table, the `variant` axis, and the statechart family; `statechart.md`, `decide.md`, `styles.md` exist and are named |
| D. `orkestrel-polish-surface` fold | `capture-harness.md` makes the journey run the portfolio source where a Vitest browser project can drive the surface and adds the statechart-outcome row |
| E. `@orkestrel/test` additions | `StateTransition`, `StateScenario`, `executeScenarios`, `STATECHART_ATTRIBUTES` in core; `readClasses`, `extractStyles` in browser; tests with controls; guide parity; gates green |
| F. `form` crosswalk | `form/guides/form.md` maps every `FieldControl` member to one catalog category; guides parity green |
| G. `terrain` reference | setup imports the published helpers; the focus proof uses `contrast` and `readRing` with its negative control still red; a browser `integration.test.ts` carries the journey, refusal, matrix, and statechart families |
| H. Records | `host.json` regenerated; scaffold `ROADMAP.md` carries the probe browser-lane defects, the `readOrigin` probe, the `elements`/`veneer` dedupe, and the glyph registry; skill-creator evaluation run and shown to the user |
| I. Release | `@orkestrel/test` published, scaffold bumped and published, fleet re-pinned and repaired, in one wave, on the user's approval |

## Units and routing ledger

Sol is dark (`bench-ledger.md`). Every nontrivial writer runs on Opus 5 `implementer`; the
substitution is recorded here once and applies to each unit. Cheap tiers stay on Sonnet.

| Unit | Repository | Role / engine | Owns | Depends on |
| --- | --- | --- | --- | --- |
| U1 test-additions | test | `implementer` / Opus 5 | `src/core/{types,constants,helpers,index}.ts`, `src/browser/{types,helpers,index}.ts`, `tests/src/core/helpers.test.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md` | — |
| U2 bootstrap-skill | scaffold | `implementer` / Opus 5 | `.agents/skills/enterprise-bootstrap/SKILL.md`, `references/inputs.md`, `references/inspection.md`, `.claude/skills/enterprise-bootstrap/SKILL.md` | — |
| U3 form-crosswalk | form | `implementer` / Opus 5 | `guides/form.md` | U2 (category list) |
| U4 journey-skill | scaffold | `implementer` / Opus 5 | `.agents/skills/orkestrel-prove-journey/**`, `.claude/skills/orkestrel-prove-journey/SKILL.md` | U1 (export names), U2 (same checkout) |
| U5 polish-harness | scaffold | `implementer` / Opus 5 | `.agents/skills/orkestrel-polish-surface/references/capture-harness.md` | U4 |
| U6 terrain-reference | terrain | `implementer` / Opus 5 | `tests/setupBrowser.ts`, `tests/app/browser/styles/tokens.test.ts`, `tests/app/browser/integration.test.ts`, `package.json` pin | U1 packed tarball, U4 |
| U7 records | scaffold | Orchestrator | `host.json` (regenerated), `ROADMAP.md` | U2, U4, U5 |
| U8 audit | all | `reviewer` / Opus 5 (subjective); objective lane on Cursor Grok per the user's ruling; `checker` on Grok | — | U1–U7 |
| U9 gates | each repo | `verifier` / Sonnet | — | U8 |
| U10 evaluation | scaffold `tmp/` | skill-creator loop, runs on Opus 5 | `tmp/skill-workspace/**` | U2, U4 |
| U11 release | fleet | `orkestrel-publish`, user approval | — | U9 |

## Order

Wave 1 in parallel: U1 (test) and U2 (scaffold). Wave 2: U3 (form) after U2; U4 (scaffold) after
U1 and U2. Wave 3: U5 after U4; U6 after U1's tarball and U4. Wave 4: U7. Wave 5: U8, U9, U10.
Wave 6: U11.

Writers never overlap inside one checkout. Every writer starts from a committed checkpoint.

## Mid-campaign instructions and deviations (2026-09-02)

- **Voice.** The user ruled that every skill line must read as a directive for an executing agent in the voice of `AGENTS.md` and the rule files. Carried into every pending brief as an acceptance criterion, into a successor unit U2b over the three files U2 produced, and into the audit round as a claim.
- **Ecosystem reuse.** The user ruled that every addition to an `@orkestrel/*` package must be reconciled against the published line through the guide mirrors under `guides/`. The Orchestrator skipped the `orkestrel` dispatch the execution loop names at absorb; unit U1r now runs it over U1's additions while U1 is in flight, and U1 gets a successor brief if a ruling changes an export. Recorded as a dispatch deviation for the debrief.
- **Orchestrator direct edit.** After U3 returned, the Orchestrator changed one printed path in `form/guides/form.md` from the `scaffold/`-prefixed form to the target-relative form and committed it with the unit; the audit round covers it.
