# LEDGER-RETUNE audit — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether the resolver, the classifier, and the scans are the right shape and names for the ledger, whether the API split (a synchronous `collectLedger` and an asynchronous `classifyValueGaps`) reads as one design, whether each proof is named for what it proves, and the truth and voice of the guide's ledger prose. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/veneer-lret/AGENTS.md`; `/home/user/scaffold/.claude/rules/{architecture,names,typescript,tests,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape); Veneer's `ROADMAP.md` § Tenets in the worktree; the design verdict and E32 the claims file names. Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree `/home/user/veneer-lret` holds the change uncommitted over `73326c7`: read its files, never edit them. Weigh especially claims 1, 3, 7, and 9: whether `retuned` and `restated` read as one decision in the legend, whether the reclassified rows (`lret-drift-members.txt`) each read true to a consumer, including the `th` `text-align` row the report flags, and whether `normalizeDeclaration`, which the report says has no consumer left, must be retired, kept, or given its consumer under `AGENTS.md` § Design laws. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
