# Unit docs-proposal-audit-3 — confirm the round-2 patches on `PROPOSAL.md`

Successor of `tmp/units/docs-proposal-audit-2-brief.md`. What changed: round 2 (`tmp/units/docs-proposal-audit-2-verdict.md`) returned wording and table-cell findings, each with a lane's exact prescription, plus two items the Orchestrator ruled (the README head regions; the multi-region splice). The Orchestrator applied them as serial patches through the recorded script `.orkestrel/campaign/docs-proposal/instruments/round-2-patches.py`, whose `rep(tag, old, new)` calls carry the exact old and new text of every patch. This round confirms each patch against its prescription and reads the whole for anything a patch broke; it is the Orchestrator's own writing, so it is audited like any unit.

## Role and lane

Two blind lanes read this one brief:

- Objective lane: `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench — patch truth against prescription, pointer truth of every pointer a patch added (`src/server/Materializer.ts:386-396`, `:953-974`, `:1112-1161`, `:1155`; `src/core/constants.ts:122-123`, `:290`, `:299`; `/home/user/fleet/table/package.json:70`; `README.md:3-4`, `:6-23`, `:27-28`, `:31-34`, `:39-40`, `:42-43`, `:45-100`, `:102-105`, `:107-116`; `guides/scaffold.md:1-13`, `:15-27`, `:35-36`, `:39-42`, `:477-478`, `:518-530`, `:542-543`, `:547-550`, `:1367-1376`, `:1379-1383`; `ROADMAP.md:127-128`), and the soundness of the two Orchestrator rulings against R1 to R10 and Lens O's constraints.
- `checker` on Sonnet, in addition — every patch located at its new site and compared with the `new` string in the script; headings, introductions, counts, and substitution terms re-swept over the patched spans; the file's structure unchanged elsewhere.

Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command.

## Subject

`/home/user/scaffold/PROPOSAL.md` after the round-2 patches (1307 lines), the patch script, and the round-2 lane verdicts at `tmp/units/docs-proposal-audit-2-{subjective,objective,checker}.md` for the prescriptions.

## Already established

- Round 2 held claims 1, 3, 4, 5, 7, 8 and claim 2 (a), (b), (d); do not re-report those unless a patch broke them.
- The Orchestrator ran `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` after the patches (clean) and `git diff --check` (clean); a `verifier` runs the tree-wide gates beside this round.

## Claims

1. Every `rep` call in the patch script adopts its lane's prescription as the round-2 verdict states it, or carries an Orchestrator ruling the round-2 verdict file names; no patch changed text outside its anchor.
2. The README head ruling is sound: one region per span, each with a named guide source, `README.md:6-23` inside, the per-verb sections outside; the mechanism row and the Stage 3 paragraph now agree; the pitch span is the same at every site.
3. The splice ruling is sound and consistent with R4: the Materializer pointers say what the sentences say, the risk row and probe 3 no longer contradict R4, and probe 3's replacement names a proof the first unit can run.
4. Every pointer a patch added resolves to text that says what the sentence says.
5. The rename rows (Option 1 and Option 2) now carry every surviving site with a check or `none`.
6. The patched spans carry no count in prose without its command, no banned-sense term, and every introduction is a complete sentence; both retitled headings are sentence case, and every cross-reference to them still resolves.
7. The file's section order, tables, and fences outside the patched spans are unchanged from round 2 (compare the section map: `# Documentation pipeline proposal`, `## Summary`, `## What the evidence shows`, the three options, `## Recommendation and order`, `## Refused on the evidence`, `## Probes before the first unit`, `## Record`).

## Threshold

The document lands when every claim holds. A failure is a further serial patch with the lane's exact prescription.

## Output

Per-claim verdicts with evidence (quote and line in `PROPOSAL.md`, the patch tag, and the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
