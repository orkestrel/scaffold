# Unit docs-proposal-audit-2 — falsify the fix round on `PROPOSAL.md`

Successor of `tmp/units/docs-proposal-audit-brief.md`. What changed: round 1 (`tmp/units/docs-proposal-audit-verdict.md`) returned the findings that `tmp/units/docs-proposal-fix-brief.md` carried as fixes 1 to 21; the writer applied them (`tmp/units/docs-proposal-fix-report.md`). This round attacks the fix round's own rulings first, then re-verifies the mechanical items, and re-reads the document as a whole for anything the fixes broke.

## Role and lane

Three blind lanes read this one brief:

- Subjective lane: `reviewer` on Opus 5 — whether the rewritten passages read as one decision, whether the Option 1 cost is now stated the same way everywhere, whether Option 2's worked example now shows what it claims.
- Objective lane: `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench — pointer truth of every pointer the fixes touched or added, the checks tables, the rename rows, the README-region scope.
- `checker` on Sonnet, in addition — the mechanical re-sweep: counts, the rule id, the fragment, the refused table, the probes, the substitution table, headings and introductions, and a fresh sample of pointers.

Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command.

## Fix spans (from the fix report)

Fix 1 `:649-654`, `:961`, `:1051`, `:1087`, `:1118`, `:1266`, flag `:966-968`; fix 2 `:366-367`, `:611-619`, `:884-885`; fix 3 `:699`, `:724-730`, `:754-757`, `:770-800`; fix 4 `:10-16`, `:30-33`, `:62`, `:584-588`, `:679-683`, `:1115-1117`; fix 5 `:208-217`, `:90-92`, `:1052-1055`, `:1186-1188`, `:983-984`, `:1102-1104`, `:476-478`, `:446`; fix 6 `:528`, `:837`; fix 7 `:510`, `:810`; fix 8 `:1042`; fix 9 `:1235`, `:1237`, `:1240`, `:1254-1259`; fix 10 `:103-106`, `:842`, `:929-932`; fix 11 `:86-95`; fix 12 `:432-437`, `:1195-1202`; fix 13 `:290-291`; fix 14 `:321-322`, `:580-581`; fix 15 `:894-901`; fix 16 `:833`; fix 17 `:197`, `:219-227`, `:533`, `:1078`; fix 18 `:235-236`; fix 19 `:1092`, `:1099-1101`; fix 20 `:649-656`; fix 21 `:393-396`, `:1152-1157`. The writer's own flags: `:615` (the line counts cite the reconciliation's record; the Orchestrator has since run the command, see `tmp/units/docs-proposal-format-2.txt`), `:534` (a `Pinned removals` row added on the writer's own decision), `:842` and `:929-932` (mechanism the first unit builds), `:1254-1259` (fixture marker names are the writer's choice).

## Subject

`/home/user/scaffold/PROPOSAL.md` after fix round 1. Read the fix report first for the line spans each fix occupies, then the file in full.

## Already established

- Round 1 held claim 2 (versions and measurements), claim 7 (the substitution sweep), claim 12 (humans and agents), and the Option 1 and Option 3 worked examples verbatim; do not re-report those unless a fix broke them.
- The Orchestrator re-ran `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` after the fix; its output is in `tmp/units/docs-proposal-format-2.txt`.

## Claims

Attack each; default to refuting where the evidence is thin.

1. Every fix 1 to 21 is applied as its prescription reads, or is reported under Not applied with a reason the evidence supports. (Objective and checker walk all of them; subjective rules on 3, 4, 9, 12, 20, 21.)
2. The fix round's own rulings are sound: (a) the body-rendering rule added to Option 2's mechanism is consistent with R1 and with the passage shown; (b) Option 1's cost statement in the blockquote, Summary, glance table, Claim 5, and Migration agree word for word on what is obliged; (c) the rewritten :195 row cites what the two sweeps actually return; (d) the ROADMAP attribution is either dropped or correctly scoped to `contract`; (e) probe 3's branches are exhaustive.
3. Every pointer the fixes touched or added resolves to text that says what the sentence says (`src/core/constants.ts:186-201`, `:195`; `src/core/types.ts:9-18`; `guides/scaffold.md:864-866`, `:961-965`; `tests/guides.test.ts:89`, `:109-117`; `ROADMAP.md:67-129`; the README line spans named for the Stage 3 region).
4. No count in prose remains anywhere in the file; `69`, the line counts by commit, and the guide line range each carry their command or are gone. (Checker sweep of every numeral outside a table cell.)
5. `policy/summary` appears nowhere; `policy/tsdoc-voice` carries the proposal flag once; the sibling refusal form is named.
6. Every sentence introducing a list, table, or fence is complete; every heading is sentence case; no substitution-table term in a banned sense entered with the fixes.
7. The Refused table gives one reason per row and its header is true; every probe names a command or a comparison with its branches.
8. The checks tables rule on every SB half, and Option 2's TE row is a regeneration guard; Options 1 and 2 agree on the direct-to-barrel half.
9. The rename rows carry every surviving site with its catching check.
10. Nothing the fixes changed contradicts a ruling R1 to R10, and the document still leads with the decision an owner can act on.

## Threshold

The document lands when claims 1, 3, 4, 5, 6, 7, 8, and 9 hold and any failure under 2 or 10 is a wording fix the Orchestrator can apply as a serial patch with the lane's exact prescription. A false pointer, a count in prose, a banned-sense term, or a fix silently not applied is a further fix-round item.

## Output

Return per-claim verdicts with evidence (quote and line in `PROPOSAL.md`, and the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
