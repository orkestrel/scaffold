# E-ID-BUTTON-CASCADE audit — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, the truth and voice of each added sentence against the shipped code, naming, and design fit with Veneer's tenets (`/home/user/veneer-ebc/ROADMAP.md` § Tenets). The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree `/home/user/veneer-ebc` holds the change uncommitted over `e07b3a6`: read its files, never edit them. The design verdict `/home/user/scaffold/.orkestrel/veneer/e-id-button-design-verdict.md` binds the design; rule the implementation against it, and name any design-fit defect the verdict did not foresee as a finding outside the claims. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
