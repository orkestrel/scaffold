# E-ID-RECORD round 2 audit — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, the comment's and the guide cells' truth and voice against the shipped code, and whether round 1's subjective findings (claims 5 and 6, F1, F2 in `/home/user/scaffold/.orkestrel/veneer/units/eir-audit-subjective-verdict.md`) are closed. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet. The unit was written by `builder` on Sonnet.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/eir-audit-2-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree `/home/user/veneer-eir` holds the change uncommitted over `ca83afb`: read its files, never edit them. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 1, 2, and 4; rule every other claim too.
