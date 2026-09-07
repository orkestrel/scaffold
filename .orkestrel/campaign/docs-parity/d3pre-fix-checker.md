Exactly 5 skill reference files changed (bootstrap-reference.md, frontend-design.md, utilities.md, field-testing.md, reconcile.md), matching all 5 digest updates in `host.json`. Claim 6 PASS.

Now compiling final verdicts.

## Per-claim verdicts

**Claim 1** — PASS. `tests/setupServer.ts:1483` (final) opens `Lists the artifacts the compiler itself supplies for a plan selecting \`src/core\` alone.` with `@remarks` reading `Read from a real compile rather than assembled by hand, because the generated set grows every time the emitter gains a group and a hand-written list goes stale on each one.` (`.orkestrel/campaign/docs-parity/d3pre-fix.diff.txt:2543-2552`). `CORE_GENERATED_COUNT` still opens `Counts the artifacts…` (`d3pre-fix.diff.txt:2560`). `FLEET_BIRTH_PATHS` opens `Lists the planned paths a repair leaves alone…` with remark `Read from the plan so it tracks the emitter:` (`d3pre-fix.diff.txt:2574,2580`); `FLEET_BIRTH_COUNT` still opens `Counts the planned paths…` (`d3pre-fix.diff.txt:2589`).

**Claim 2** — PASS. All seven blocks the brief names carry a blank ` *` separator with the exact quoted split, confirmed by diff context and, for `inspectPolicyFilenamePaths`, by direct file read (`tests/setupPolicy.ts:1174-1178`): `Inspects an explicit path population for a name a Windows checkout cannot hold.` / `Each path is read through its own final segment, because the population lists every directory as its own entry. A Windows host refuses the reserved characters and folds a case collision into one file, so those two boundaries are proven from a path population rather than from written files.` `configs/policy.ts` blocks `isPolicyDomain` and `functionToPolicyRegion` and `tests/setupPolicy.ts` blocks `parseSkillPrompt`, `matchesSkillToken`, `inspectPolicyRuleMap`, `inspectPolicyControl` each confirmed matching in `d3pre-fix.diff.txt`. No other separator-bearing block appears touched in the diff.

**Claim 3** — PASS. Every `_PATTERN`/`_GLOB`/`_GLOBS` constant in both files now opens `Matches`: 5 in `configs/policy.ts` (lines 190,199,209,214,217) and 8 in `tests/setupPolicy.ts` (lines 131,135,138,144,166,173,209,212), confirmed by direct grep of the final files — an exhaustive set matching the report's site list (13 total, no constant omitted).

**Claim 4** — PASS. `configs/policy.ts:51` reads `/** Names the directory Oxlint resolves \`filename\` against. */`. `.agents/skills/enterprise-bootstrap/references/frontend-design.md:106` reads `Keep a word only where it helps the reader understand the design, and so use it.`

**Claim 5** — PASS. `host.json`'s diff (`d3pre-fix.diff.txt:1017-1132`) changes only `"digest"` values, no path/destination/executable field. `d3pre-fix.status.txt` lists the identical file set as `d3pre-voice.status.txt` (D3-pre's own baseline) plus no new tracked path; the only untracked additions are the two evidence files under `.orkestrel/campaign/docs-parity/`, and no existing `.orkestrel/` instrument shows as modified in either status file.

**Claim 6** — PASS. `configs/helpers.ts` diff shows three doc-block rewrites (`ProjectScope`, `ExtractorOverride`, `ExtractorModule`), each replacing a 1-line comment with a 4-line block, net +3 lines each, totaling +9 lines (`d3pre-fix.diff.txt:330-362`). `host.json`'s digest changes touch exactly five `agents/skills/*/references/*.md` storage entries: `bootstrap-reference.md`, `frontend-design.md`, `utilities.md`, `field-testing.md`, and `reconcile.md` (`d3pre-fix.diff.txt:1040,1049,1058,1067,1076`).

VERDICT: PASS