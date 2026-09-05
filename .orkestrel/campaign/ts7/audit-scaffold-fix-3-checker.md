<!-- workflow wf_6724360c-683, agent a1c7026e1372f16fe, captured from journal.jsonl -->

## Per-claim verdicts

**1. Each of the seven edits reads at its site as written — CONFIRMED.**
Edit 1: `guides/scaffold.md:1153-1154` reads "With the option set to `''`, the rollup resolves global types against the lib files of the compiler `@microsoft/api-extractor` bundles, 5.9.3 at 7.59.0. That holds for every generated workspace whatever `typescript` major it installs, so a public declaration resolves only the lib types that compiler provides." — verbatim. Edit 4: `tests/src/core/compilers.test.ts:1440` reads "a rollup on the 7 major" and `:1444` reads "rolls no declaration up" — both verbatim (report's claimed line shift to 1439/1443 is stale; the actual file matches the brief's cited lines exactly). Edit 5: `tests/setupServer.ts:1655-1656` carries the prescribed `@param versions` text and `:1677-1681` the renamed signature and `published` binding, verbatim. Edit 6: `tests/src/core/constants.test.ts:191` reads "the control the preceding assertion needs" — verbatim. Edit 7: `tests/setupServer.ts:1683` carries the prescribed guard verbatim, and `tests/setupServer.test.ts:542-546` (brief cites `:542-544`, a one-line citation undershoot, content unaffected) asserts all three throws with the prescribed message.

**2. The § Dependency floors paragraph — CONFIRMED.**
"cleared" appears nowhere in `guides/scaffold.md:1148-1162`. Column count of every line: 1148=80, 1149=92, 1150=94, 1151=96, 1152=95, 1153=96, 1154=92, 1155=96, 1156=74, 1157=98, 1158=93, 1159=99, 1160=100 (the paragraph's longest, matching the report), 1161=98, 1162=21 (last line). Every line but the last that ends short of 100 has a next word that does not fit (checked line 1148: next word 26 chars pushes to 107; line 1156: next word 30 chars pushes to 105), so no line ends short while the next word fits. Comparing against the pre-round-4 paragraph text recovered from the round-3 audit lanes (`tmp/units/ts7-audit-scaffold-fix-2-subjective.md:31` finding F1 and `-objective.md:30` finding F1, quoting the paragraph verbatim before this round), the only content difference is edit 1's targeted sentence; every other sentence is identical, only rewrapped.

**3. Every prose hunk obeys `.claude/rules/writing.md` § Substitutions — CONFIRMED.**
Swept `PROPOSAL.md`, `ROADMAP.md`, `guides/scaffold.md`, the `tests/setupServer.ts` TSDoc, and the `tests/src/core/compilers.test.ts` / `tests/src/core/constants.test.ts` comments in the diff for the substitution-table terms, `above`/`below`, and a count of a growable set. `ROADMAP.md` diff line 76 replaces "a new rule" with "an added rule" (fixing a banned term); `ROADMAP.md` diff line 68 puts the condition first ("When `vue-tsc` runs against 7, delete…"). No hit for `should`, `via`, `just`, `simply`, `once` (temporal), `new`/`latest` (dating a value), `e.g.`/`i.e.`/`etc.`, or `above`/`below`; every positional reference uses `preceding` (`constants.test.ts:191`). No sentence states a count of a growable set; version numbers (`5.9.3`, `7.59.0`, `6`, `7`) are values, not counts.

**4. `buildPackument` guard and test row — CONFIRMED.**
`tests/setupServer.ts:1681-1685`: `published = ['']` for both `buildPackument('')` and `buildPackument([''])`, and `published.some((entry) => entry.length === 0)` is `true` for each, so both throw; `buildPackument([])` throws on `latest === undefined`. `tests/setupServer.test.ts:542-546` asserts all three call forms throw the exact message.

**5. `host.json` moves only two digests — CONFIRMED.**
The diff's only `host.json` hunk (lines 142-161) changes the `guides/scaffold.md` entry's `digest` and the trailing root `digest`; no other line in that file's diff.

**6. No file outside the three units' owned sets changed; `src/core/templates.ts` absent — REFUTED (in part).**
`src/core/templates.ts` is confirmed absent from both the diff and `tmp/units/ts7-seven-fix-3.status.txt`. The first clause does not hold as stated: `tmp/units/ts7-seven-fix-3.status.txt:10-11` lists `?? .orkestrel/campaign/ts7/probe-fix-2-report.md` and `?? .orkestrel/campaign/ts7/seven-fix-3-report.md`, two files outside every owned set named in `tmp/units/ts7-seven-fix-brief.md:45`, `tmp/units/ts7-seven-fix-2-brief.md:44`, and `tmp/units/ts7-seven-fix-3-brief.md:38` — all three briefs list `.orkestrel/**` as off-limits. This repeats the shape the round-3 checker refuted for the same claim over `.orkestrel/campaign/ts7/ledger.md` and `orchestrator-measurements.md` (`tmp/units/ts7-audit-scaffold-fix-2-checker.md:17`). Attribution is unresolved from this evidence: these may be Orchestrator retention copies per `.agents/orchestration.md` § Dispatch anatomy rather than a unit's own write, but the claim as written ("no file outside the three units' owned sets changed") is false on the tracked tree state regardless of who wrote them.

## Findings outside the claims

- Attribution of `.orkestrel/campaign/ts7/probe-fix-2-report.md` and `seven-fix-3-report.md` is unresolved: refer to the Orchestrator to confirm these are its own retention writes rather than a builder-unit scope breach, per the same referral the round-3 checker made for the analogous `.orkestrel/` files.
- Edit 7's citation `tests/setupServer.test.ts:542-544` undershoots the actual five-line test body at `542-546`; the content lands correctly, so this is a citation-precision note only.

VERDICT: FAIL 6; outside the claims: none
