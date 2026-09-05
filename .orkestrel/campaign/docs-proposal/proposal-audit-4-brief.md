# Unit docs-proposal-audit-4 — confirm the round-3 patches on `PROPOSAL.md`

Successor of `tmp/units/docs-proposal-audit-3-brief.md`. What changed: round 3 (`tmp/units/docs-proposal-audit-3-verdict.md`) returned pointer and framing findings with exact prescriptions; the Orchestrator applied them through `.orkestrel/campaign/docs-proposal/instruments/round-3-patches.py`. This round is the checker alone: every patch is a prescription adopted verbatim or a renumbering.

## Role and lane

`checker` on Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing; you are read-only and run no command.

## Subject

`/home/user/scaffold/PROPOSAL.md` (1301 lines), the round-3 patch script, and the round-3 objective verdict at `tmp/units/docs-proposal-audit-3-objective.md` for the prescriptions.

## Claims

1. Every `rep` call in the round-3 script sits at its new site in `PROPOSAL.md` with the script's `new` string, and its `old` string appears nowhere in the file.
2. The probe list under `## Probes before the first unit` is numbered 1 to 5 without a gap, no item is a settled reading, and no prose elsewhere in the file names a probe by a number that moved.
3. Every pointer the patches added or changed resolves to text that says what its sentence says: `guides/scaffold.md:3-7` (the blockquote), `:9-27` (the paragraphs `README.md:6-23` mirror), `README.md:44` (the blank line between the flags at `:42-43` and the first per-verb heading at `:45`), `src/server/Materializer.ts:386-396`, `:1112-1161`.
4. The README head is now framed as one region per span at every site (`grep` the file for `head region` and `README region`, and rule each hit).
5. The patched spans carry no count in prose without its command, no substitution-table term in a banned sense, and complete introductions; `oxfmt` formatting is the Orchestrator's to run and is already recorded clean.

## Output

Per-claim verdicts with evidence (quote and line, the patch tag, the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.
