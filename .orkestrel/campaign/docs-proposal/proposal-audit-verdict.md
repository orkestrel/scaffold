# Audit verdict — docs-proposal round 1

Subject: `PROPOSAL.md` at 1203 lines (writer: `implementer` on Opus 5). Brief: `tmp/units/docs-proposal-audit-brief.md`. Lanes run, blind, in Workflow `wf_9d14854c-0b0`: subjective on `reviewer` (Opus 5); objective on `reviewer` (Opus 5) — the recorded substitution for the dark Sol bench (`codex` not installed on 2026-09-05); `checker` on Sonnet in addition. No lane returned empty; no lane was dropped.

Terminal lines: subjective `VERDICT: FAIL 5, 6, 9, 10; outside the claims: F2, F3, F4, F5, F6, F7`; objective `VERDICT: FAIL 1, 3, 4, 9; outside the claims: F1 to F10`; checker `VERDICT: FAIL 1, 6, 8, 11; outside the claims: none`.

Held across the lanes: claim 2 (every version and measurement reproduces against the installed declarations and the rollup), claim 5 in substance (every ruling R1 to R10 presented as ruled; the only divergence is a rule id), claim 7 (no substitution-table term in a banned sense, swept by two lanes), claim 12 (the humans-and-agents sections answer the owner's question), and the worked examples of Option 1 and Option 3 verbatim.

Reconciliation: every finding below carries into `tmp/units/docs-proposal-fix-brief.md` as exactly one numbered item; none is dropped. The fix round goes to the writer's engine (Opus `implementer`); its audit runs on `reviewer` (Opus) as the substitution for the dark Sol bench plus `checker` (Sonnet), and an item fixed by adopting the lane's prescription verbatim closes on the checker's confirmation.

| Item | Source | Carried as |
| --- | --- | --- |
| Rule id `policy/summary` departs from the ruled `policy/tsdoc-voice` unflagged | subjective 5, objective F4, subjective F6 | fix 1 |
| Counts without a run: `69` at :341-342, line counts by commit at :571-572, guide line range at :820-821 | subjective 6, checker 6, objective F10 | fix 2 |
| Option 2's closing remark paragraph is a merge presented as a move; body `{@link}` rendering rule absent | subjective 9, objective 9 | fix 3 |
| Option 1's fleet cost contradicts its own migration in the blockquote, Summary, glance table, and Claim 5; the "one amendment" price against :1037-1038 | subjective 10 | fix 4 |
| False pointer at :195 (`configs/policy.ts:197`, `:300`) | objective 1, checker 1 | fix 5a |
| `ROADMAP.md:127` is contract's row, cited as scaffold's seam at :83-84, :979-980, :1105 | objective 1 | fix 5b |
| `CANON_PATHS` cited at `src/core/constants.ts:125-131` | objective 1 | fix 5c |
| "Ownership narrative" at :443-445 names the `Origin` table | objective 1 | fix 5d |
| `:414` cites `:9-17` for a block ending at `:18` | subjective F7 | fix 5e |
| Option 1 checks table omits `SB, guide to barrel`; Option 2's TE row reports a regeneration guard as surviving with force | objective 3 | fix 6 |
| Rename rows drop surviving sites from the after column | objective 4 | fix 7 |
| Fragment introducing the fence at :969 | checker 8 | fix 8 |
| Compound reasons at :1148, :1150, :1153; probe 3 names no comparison | checker 11, subjective F3 | fix 9 |
| ":93 The fence executes" is false: the Compile fence has no transcription | objective F1 | fix 10 |
| :81-82 misreads which rule the doc block answers to | objective F2 | fix 11 |
| Stage 3 "closes the `npx scaffold` split" overstated | objective F3 | fix 12 |
| C2's red reading undated | objective F5 | fix 13 |
| `guide` declares no `@orkestrel/guide` edge | objective F6 | fix 14 |
| Section-ownership walk omits `## Library` | objective F7 | fix 15 |
| Options 1 and 2 disagree on the direct-to-barrel half | objective F8 | fix 16 |
| `guide.tests()` listed as unrun | objective F9 | fix 17 |
| "second class" names a position | subjective F2 | fix 18 |
| oxfmt `jsdoc` row and hover bullet unconditional | subjective F4 | fix 19 |
| Inherited doc-block defects (inflected code token) unnamed as a risk | subjective F5 | fix 20 |
| Writer's own flags at :366 and :1067 read more settled than their evidence | writer report | fix 21 |
