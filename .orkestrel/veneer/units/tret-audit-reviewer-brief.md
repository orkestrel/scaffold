# TOKEN-RETIRE audit — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, whether the retirement's mechanism reads as one decision, the truth and voice of the guide prose and the partial comments, naming, and design fit. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/tret-audit-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/veneer-tret/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape); Veneer's `ROADMAP.md` § Tenets in the worktree; the tenet verdict the claims file names. Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree `/home/user/veneer-tret` holds the change committed as `a5a85d8` over `1deced0`: read its files, never edit them; the diff is `tret-instruments/tret.diff`. Weigh especially claims 3, 4, and 5: whether `role-each`'s `$aliased` parameter, the `:root` loop's filter, and the `none` default are the right shape and names for the retirement, or whether a single source for the aliased roles would read better; whether each proof is named for what it proves; and whether the guide's tertiary paragraph and tables tell a consumer plainly what the tertiary role carries and why. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
