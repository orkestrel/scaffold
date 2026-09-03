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
- **Latest packages.** The user ruled that every repository the campaign works on must sit on the catalog's latest `@orkestrel/*` packages, terrain first, because its scaffold pin (`^0.0.38`) trails the structural changes. Units V-test and V-form run the fleet visit (`orkestrel-publish` § Visit a repository) in parallel now; V-terrain runs after U6 returns and re-stages the packed test tarball after its full install. Each visit is a development-dependency bump: re-pin, gates green, commit, no version bump. The terrain visit precedes the terrain gates, the capture runs, and the audit round, so no finding there can come from a stale package.

## Visit round, 2026-09-02

- Both visit units (`test`, `form`) stopped at step 2: `scaffold overwrite` refuses a tree carrying
  the unit's own step-1 re-pin, and the brief forbade committing and `--dirty`. Ruling: the wave's
  commit between step 1 and step 2 is the Orchestrator's. `visit-overwrite-brief.md` supersedes
  step 2 for every target; the Orchestrator committed each re-pin, ran the overwrite and the audit
  from the committed baseline, installed, formatted, and dispatched `verifier` for the gates.
- `test`: re-pins committed at `c4487af`; overwrite exit 0 (3 written, 0 removed); audit exit 0 with
  the TypeScript-major question alone; floors raised for `@types/node`, `oxfmt`, `oxlint`,
  `vite-plugin-dts`; install and format exit 0, format rewrote nothing.
- `form`: scaffold re-pin committed at `eab32a5`; overwrite exit 0 (4 written, 0 removed); audit
  exit 0 with the TypeScript-major question alone; same floors raised; the declare step moved the
  runtime `@orkestrel/contract` range to `^0.0.15`, restored by hand to `^0.0.13`; install and
  format exit 0; `npm ls` dedupes contract to one copy at 0.0.13 across the tree.
- Catalog regenerated in scaffold (`node dist/bin/main.js catalog`, exit 0): contract `0.0.13` to
  `0.0.15`, process `0.0.8` to `0.0.9`. Contract 0.0.14 and 0.0.15 published 2026-09-01; process
  0.0.9 published 2026-08-28 and still declares contract `^0.0.13`; emitter 0.0.8, form 0.0.3, and
  every other dependent declare `^0.0.13`. The cascade has not begun.
- Ruling on contract: a published package's runtime range stays at `^0.0.13` in this campaign,
  because moving one package ahead of its own runtime dependency publishes out of layer order and
  installs two copies of contract in every consumer. An unpublished application may take the
  declared range, measured by its gates. The contract cascade is a fleet release wave the user
  decides; it is carried in the campaign report as a finding outside the exit criterion.

## U6 terrain reference, returned 2026-09-02

- Green on every acceptance gate; report retained as `terrain-reference-report.md`; tests committed
  in terrain as "Prove the shell through the published journey layer".
- Layer finding: `resolveRendered` and the named-region resolver pass `includeHidden: true`, and
  the role engine's name computation then includes `aria-hidden` descendants, so an icon glyph
  beside a control's text defeats every exact match. Measured with a glyph-free region as the
  control. Successor unit U3s3 (`test/tmp/units/resolve-hidden-brief.md`) dispatched to the Opus
  `implementer`, standing in for Sol (bench dark), with seven browser proof cases and the
  red-then-green requirement. After it lands: repack the test tarball, re-stage it in terrain, and
  dispatch a terrain successor to close the refusal family's reachable half, `readPerception` on
  the first-run dialog, and the dialog mount by region name.
- Terrain visit dispatched from the committed baseline on `visit-terrain-brief.md` (`--dirty`
  allowed there alone, after a read-only audit records the deletion plan).
- Orchestrator incident: the terrain commit was made with `git add <files>` then a bare
  `git commit`, which swept the user's staged lockfile deletion into it. Repaired by restoring the
  index entry from the parent, amending, and re-staging the deletion with `git rm --cached`; the
  working-tree file was never touched. Rule for the rest of the campaign: in a tree carrying a
  user's staged change, commit with explicit pathspecs (`git commit -- <paths>`), never a bare
  commit over the index.

## U3s3 resolver fix, returned 2026-09-02

- Committed in test at `c98f3ba`. Mechanism: a visible pass without `includeHidden` decides every
  returned, refused, or ambiguous element; a hidden pass matches `computeNamePattern` and only
  chooses between the absent and not-visible voices. Bound recorded in the report: a hidden icon
  whose content is a word reads as absent; a punctuation-only difference reads as not visible.
  `readPerception` drops `includeHidden`; an `aria-hidden` control or region is now refused.
- Proof: 4 failed | 193 passed before, 203 passed after on the helpers file; browser project 234.
  Full chain dispatched to `verifier` (`gates-resolve-brief.md`).
- Tarball rebuilt from `c98f3ba` at 17:23 into `tmp/tarballs/orkestrel-test-0.0.11.tgz`; the packed
  browser entry carries `computeNamePattern`. Re-stage into terrain after the visit returns, then
  dispatch U6s on `terrain-successor-brief.md`.
- Audit claim 23 stands as written; the auditor reads `resolve-hidden-report.md`.

## Terrain visit closed, 2026-09-02

- Visit committed in terrain as "Bring terrain to scaffold 0.0.59 and the catalog" through
  pathspecs that exclude the lockfile pair (135 files; 85 plan-foreign paths removed; 28
  no-nested-functions sites repaired with tested exported helpers; app suite 916 before new tests,
  951 with them; every gate green). Report retained as `visit-terrain-report.md`.
- The wave's stale-catalog-body remedy run by the Orchestrator: deletion committed (`e168051`),
  `scaffold overwrite --dirty` staged the floor copy (2 written, 0 removed), audit exit 0 with the
  two terrain-owned questions, body identical to the floor outside the marker region, restore
  committed (`6b20567`).
- Rebuilt test tarball re-staged with `npm install --no-save`; installed browser entry digest
  `24319964f0eaac64` equals the tarball's. Tree carries only the user's lockfile pair.
- Findings carried for scaffold: the distributed probe floor in 0.0.59 reads `^0.0.10` while
  scaffold's own manifest declares `^0.0.11`; the 0.0.60 release ships the current floor.
  Terrain-owned questions left open on purpose: proofs for `tests/setup.ts` and
  `tests/setupBrowser.ts`; the TypeScript major.
- Contract duplication measured: terrain's root contract 0.0.15 beside nested 0.0.13 under every
  published dependent typechecks clean, so an application may lead the fleet; a published package
  still may not.
- Iteration-2 `underwriting-form-inputs` with-skill: 17/17, the agent grader enumerating a control
  on every check listed, run or open. Baseline reused from iteration 1 (`old_skill/REUSED.md`).
- U6s dispatched on `terrain-successor-brief.md`.

## Audit round 1, 2026-09-02

- Lanes: `reviewer` (Opus, subjective) FAIL 5 broken / 4 unresolved / 6 findings; `grok` objective
  FAIL 9 broken / 2 findings; `grok` checker FAIL 9 broken / 0 findings. Reconciliation in
  `campaign-audit-verdict.md`; every retained finding names one carrier.
- Fix round dispatched in parallel across three checkouts: FX1 skills (Opus `implementer`,
  scaffold; checker's two extra voice lines and the third `control` sense sent in flight), FX2
  test layer (Opus standing in for Sol), FX3 terrain suite (Opus). FX4, the form guide's category
  case, done by the Orchestrator: twelve cells recased to the catalog headings, guides test 48
  passed, committed at form `8ef0785`.
- Fix-round auditor: Grok, the engine that wrote none of the fixes. Then verifiers per checkout,
  the rebuilt tarball re-staged into terrain after FX3 exits, terrain re-filmed, and the
  toolbar eval's grading, the benchmark, and the viewer.
- Carried to the user as product observations, not campaign fixes: terrain's armed Delete is
  `btn-outline-danger` against the bootstrap skill's solid-variant rule (readings per variant
  arrive with FX3); the contract 0.0.15 cascade; scaffold 0.0.60 ships the current probe floor.
- FX2 returned: committed in test at `ba6303a`. F6 closed with `<name>: build refused` and the
  refusal as `cause` (ruling: no inlined message, because it would need a second rendering site
  or a new export); F1 renamed; F5 sentence recorded. G2 falsified on evidence: the fence is routed
  through `ROUTED_FENCES` to the browser helpers test, which asserts every printed value. Tarball
  rebuilt at 18:27 (core entry carries the new voice); re-stage into terrain after FX3 exits.
  Full chain dispatched to `verifier` (`gates-fx2-brief.md`).
- FX1 returned: committed in scaffold at `4fb7ff2` (13 files; duplicate-sweep instrument with its
  own negative control retained in the report). Orchestrator closed the one count it left
  ("both viewports and both themes") in the same commit. Verifier dispatched
  (`gates-fx1-brief.md`).
- Iteration 2 evaluation: form eval 17/17 (agent-graded), toolbar eval 9/9 (one mechanical row
  overridden on evidence); old skill 82.5%, new skill 100.0%. Static viewer sent to the user;
  benchmarks retained as `benchmark-iteration-{1,2}.md`. The eval worktree was removed.
- FX3 returned: committed in terrain as "Close the audit round's findings against the reference
  suite" (2 files, 338+/94-). C19, F2, F3, F4 closed; eight runs green; twelve frames re-filmed and
  read complete. Measured mechanism behind F2: the layer's `captureFrame` shoots the body at the
  pane's declared height, so a body taller than the pane is clipped to the runner's canvas. The
  suite's fix declares a 1900 px pane for the 390 variants, which costs them a true phone height.
  Ruling: that is a layer defect this campaign owns; FX2b in test makes the shot cover the
  document and exports the frame reader, then FX3b in terrain restores the 844 px pane, adopts
  the layer's reader, and moves its census and escape negative controls through the read root
  (claim 3 alignment). Product observation for the user: the armed Delete reads 4.045 against the
  dark themes, under the 4.5 text bar, on `btn-outline-danger`.
- FX2b returned: committed in test at `df4a0b6` (7 files with the two returned patches applied by
  the Orchestrator as serial integration: the factories case that asserted the viewport leak, and
  the `CAPTURE_PANE` doc). Measured: `releasePane` never restored the viewport (414x896 to 390x844
  and back only on an explicit set); a 1600 px document in an 844 px pane painted white from the
  fold. Both proved red then green; browser project 240 passed. Tarball rebuilt and re-staged in
  terrain (digest `66b98aae9bf8043e`). FX3b dispatched; verifier dispatched
  (`gates-fx2b-brief.md`).
- FX3b returned and stopped on its deviation contract: the 844 px pane, the layer's `readFrame`,
  and both controls through the root are done and green in the four ordinary runs and the two
  1280 capture runs; the two 390 capture runs are red at the capture proof because the rebuilt
  layer still clips (integer scroll height under a fractional body box: one row; no re-read after
  a viewport-bound rule reflows against the taller pane: 29 rows). The rebuilt `releasePane`
  hand-back broke the suite's stage-then-release resize; the suite calls `page.viewport` itself.
  Committed in terrain at `7a27ee8` as the honest state; FX2c dispatched in test
  (`fix-capture-successor-brief.md`); terrain chain verifier dispatched at that commit; lane B
  runs after the layer lands and terrain re-films.
- FX2c returned: committed in test at `e13f5d5`. `captureFrame` measures the larger of the body's
  box rounded up and the scroll height, restages while the height grows (bound
  `CAPTURE_STAGINGS = 3`), and refuses a document that never settles; three cases red then green
  (209 to 212), browser project 243. Tarball 0.0.12 rebuilt and re-staged in terrain (version
  0.0.12 in `node_modules`). Re-film and the final prepublish chain running in parallel; lane B
  follows the re-film.
- Re-film on the `e13f5d5` build: the 1280 runs 11 passed each; the empty-schedule 390 frames
  now end on the surface's floor (one runner row closed); the populated schedule refused with
  `never settled after 3 restagings: 1716 over a 1712 pane` (covered heights 1675, 1694, 1712,
  1716 — geometric convergence outside the bound). Ruling: the pane only paints the body's box
  and the shot clips to it, so restaging may overshoot by the last growth without adding rows.
  FX2d dispatched (`fix-capture-overshoot-brief.md`). Lane B launched in parallel on claims 8,
  14, 16, 17, 19; claims 15 and 22 go to a final lane after the next re-film.
- Lane B: claims 8, 14, 16, 17, 19 CONFIRMED. FX2d stopped (overshoot on the box reading adds
  canvas rows; the content edge survives an oversized pane). FX2e dispatched
  (`fix-capture-edge-brief.md`): `measureContent` over the union of element bottoms, overshoot
  on that reading, final staging at the exact content height, refusal kept. Scaffold's own
  prepublish chain runs in parallel at the 0.0.60 bump for early evidence.
