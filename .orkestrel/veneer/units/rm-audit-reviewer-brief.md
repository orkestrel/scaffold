# RM-SCAFFOLD audit — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, the truth and voice of each added sentence and comment against the shipped code, naming, and design fit with the design verdict and scaffold's rules. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/rm-audit-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold-rm/AGENTS.md`; `/home/user/scaffold-rm/.claude/rules/{workspace,tests,architecture,patterns,portability,typescript,names,documentation,writing,quality}.md`; the falsification law in `.claude/rules/quality.md`; the skill `/home/user/scaffold-rm/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/release-mode-design-verdict.md`. The worktree `/home/user/scaffold-rm` holds the change uncommitted over `392aa1e0`: read its files, never edit them. The unit's report names a report-only patch to `src/core/compilers.ts` and an observation about the `journey` wrapper template; rule each as a finding outside the claims if it breaks a rule. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
