# Scaffold units S1, S2, S3 audit — verdict (Orchestrator, 2026-09-17)

Subject tip `0d03ec79`; claims `s-audit-claims.md`; lane reports `s-audit-objective-report.md`
(`reviewer`, Opus 5, 810 s) and `s-audit-subjective-report.md` (`analyst`, `gpt-6-astra`, thread
`01a0b103-3eb4-7eb3-a4e1-086e2dd88d78`, 942 s). Reproductions under `s-audit-reproduction/`.

## Lanes that ran

| Lane       | Role       | Engine        | Swap                                                                  | Terminal line                                                        |
| ---------- | ---------- | ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Objective  | `reviewer` | Opus 5        | Swapped: Opus wrote S3, S2-4, S2-5; Sol wrote S1                        | `VERDICT: FAIL 5, 7, 10, 17, 18, 19, 22, 23; outside the claims: F1, F2, F3, F4` |
| Subjective | `analyst`  | `gpt-6-astra` | Swapped, the same reason                                              | `VERDICT: FAIL 1, 4, 5, 7, 12, 16, 18, 20, 22, 23; outside the claims: none` |

No `checker` ran: the claims' mechanical rows (fence resolution, parity, format, lint) were taken
by the Orchestrator's own gate readings before the round, and each lane re-read them.

## Findings carried

| Finding | Source | Orchestrator reproduction | Carrier |
| ------- | ------ | ------------------------- | ------- |
| A browser application is born without the journey axis: `new --app browser` writes no wrapper, no `appJourney`, no `test:journey` (`CLI.ts:236` passes no `journey`) | subjective 23 (BROKEN, executed); objective 23 (BROKEN, by reading) | `c23-f1-probe.log.txt`: `wrapper present: no`, `test:journey in scripts: 0`, `appJourney in root: 0` | S4 ruling 1 |
| The manifest and the wrapper can disagree with no signal: writing the wrapper and repairing adds `test:journey` and leaves the `test` chain unchanged; deleting it and repairing leaves `test:journey` naming a missing config, and `audit` says nothing | subjective 1 (BROKEN, executed); objective F1 (by reading) | same log: after deletion `test:journey in scripts: 1`, `appJourney in root: 0`, `audit_EXIT=0` with no journey line | S4 ruling 2 |
| Two mutations of the emitted `appJourney` factory — the `include` widened to the glob, `enabled` set `false` — leave every S1 control green | objective 7 (BROKEN, include); subjective 7 (UNRESOLVED, `enabled`) | `c7-mutations-summary.txt`: `A_core/bin/config_EXIT=0`, `B_core/bin/config_EXIT=0`, baseline 0, tree restored | S4 ruling 3 |
| `tests/setupServer.ts:1530` states a count and an incomplete blind-spot inventory: a `require` reached through a member expression (`require.resolve`) is also outside the reading | objective 10 (BROKEN); subjective 10 CONFIRMED on the forms it exercised, which did not include the member expression | By reading `:1572` (`callee.type !== 'Identifier'`) | S4 ruling 4 |
| `inspectSkillImports`'s TSDoc states a narrower parse-error gate than `:1307` implements | objective F4 | By reading `:1289-1290` and `:1307` | S4 ruling 5 |
| The engine reopening condition has four homes and the ROADMAP row restates it in the sentence forbidding restatement; the skill's copy drops "journey or style" | objective 5, subjective 5 (both BROKEN) | `grep -n "declared size"` matched `templates.ts:1143`, `SKILL.md:330`, `guides/scaffold.md:963`, `ROADMAP.md:39` | S5 item 1 |
| The voices table's storage row always prints a quoted key while `buildDenial(operation, undefined)` omits it | subjective 12 | `dist/src/browser/index.js:2289`; `layer.md:159` | S5 item 2 |
| The ban row conflates a router navigation with a store read, and the corroboration bullet admits a router call | subjective 16 | `layer.md:270-280` | S5 item 3 |
| The Accept bullet demands a bar for every style instrument; only `buildContrast` takes one | objective 17 | `SKILL.md` Accept, `styles.md:115-119` | S5 item 4 |
| "A surface whose screens share one title is a finding" fixes a title scheme the section itself forbids | objective 18, subjective 18 | `SKILL.md:209-210`, `:222-223` | S5 item 5 |
| ROADMAP row 36 restates the condition and states no closing condition | objective 19 | `ROADMAP.md:39` | S5 item 6 |
| The cp1252 rule's review criterion misses a line that lost one code point and kept another; the paragraph explains rather than directs | subjective 20 (BROKEN); objective 20 (UNRESOLVED: which write path did the damage) | `c20-write-paths-summary.txt`: the patch tool and a byte-level PowerShell write both preserved `96ea d7`; neither run reproduced the damage, so the hazard is a text-encoding cmdlet or redirection, not the patch tool | S5 item 7 |
| `layer.md:10-11` claims every taught name is in its own fence while its tables teach the style, capture, and control names fenced in sibling references; the skill restates `.claude/rules/quality.md`'s instrument law in two places, carries a reassurance clause and a narrative opener | objective 22, subjective 22 | By reading `layer.md:10-11`, `:99-100`, `:264`; `styles.md:111`; `SKILL.md:285`; `statechart.md:46` | S5 item 8 |
| The skill states the setup proof and the journey axis as present in a fresh workspace, and never names `scaffold repair` | objective 23, subjective 23 | `c23-f1-probe.log.txt`; `SKILL.md:76`, `:168-171` | S5 item 9 (written for the post-S4 generator) |
| `CAPTURE=1 npm run test:journey` is POSIX-only | objective F2 | By reading `SKILL.md:95-96`, `captures.md:31-32` | S5 item 10 |
| `styles.md:125` states a count | objective F3 | By reading | S5 item 11 |

## Confirmed on evidence, no carrier

- Claims 2, 3, 6, 8, 9, 11, 13, 14, 15, 21 held in both lanes with the attacks recorded there.
- Claim 4 (`capture` reaches the browser): confirmed by reading in the objective lane; the
  subjective lane's UNRESOLVED names a browser run in a generated workspace. That run is taken in
  the roughnotes adoption unit, whose acceptance includes `test:journey` with and without
  `CAPTURE`; recorded there rather than as a fix here.
- Claim 17's other three attacks (the written artifact, the vocabulary sweep, the disk-membership
  proof) held.
- Claim 19's **Closed** rows are true at the tip; rows 27 and 29 stay open; rows 35 and 37 name
  real sites.
- Claim 20's one-home ruling held (the rule is stated in `.agents/transports/codex.md` alone).

## Dropped on the record

None.

## Where the lanes disagreed, and the ruling

- **Claim 10.** The subjective lane confirmed the TSDoc against the forms it ran; the objective
  lane broke it on the member-expression `require` it did not run and on the count. The ruling
  takes the objective lane's: the sentence claims a complete inventory and is not one.
- **Claim 12.** The objective lane read the statechart refusals as carried in `statechart.md`
  rather than dropped; the subjective lane read their absence from the `layer.md` table as
  incomplete. Ruling: one home per message. `layer.md` carries the layer's voices and states that
  the statechart and capture voices live in their references; the storage row is corrected.
- **Claim 19.** Row 36 keeps its number and its trigger; its closing condition is stated (the
  engine-selection design is adopted, or the limit is removed from the emitted doc block), and the
  restated condition is cut (claim 5).
- **Claim 20.** The measured write paths both preserve the code points, so the rule names the
  hazard it can name — a text-encoding shell write — and keeps the patch-tool remedy; the review
  criterion compares the set of code points above `0x7F` on each touched line before and after.

## Routing of the fix

Two writers, serial, one checkout. S4 (`sol`, `gpt-6-astra`, workspace-write) carries the
generator and vendored-test findings: the `new` default, the manifest–wrapper questions, the
`appJourney` pins, the two TSDoc blocks, and the guide. S5 (`opus`) carries the skill, `ROADMAP.md`,
and the transport rule, written against the generator S4 lands. Each unit's brief adopts the lanes'
prescriptions where it can; S4 ruling 2 (the question arms) and S5's claim 12, 19, and 20 rulings
depart from a prescription, so the round closes with a cross-engine audit over S4 and S5 — the
objective lane on Opus for S4 (Sol wrote it), on Sol for S5 (Opus wrote it) — plus a mutation
probe per adopted pin.
