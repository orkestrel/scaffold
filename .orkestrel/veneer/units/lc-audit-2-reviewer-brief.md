# Audit round 2 — LABEL (`lc`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: the proofs, the names, and the guide
prose against the successor brief. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/lc-audit-2-claims.md`, weighted to
claims 2, 3, 5, and 6, the proofs and the names first: rule whether each assertion distinguishes its mutation, whether the F3 names hold one term per concept, and whether each sentence reads true; the worktree is
`/home/user/veneer-lc2`.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only, under
`/home/user/scaffold/.orkestrel/veneer/units/`: `lc-2.diff`, `lc-2-status.txt`,
`b-label-lc-report-2.md`, `b-label-lc-brief-2.md`, `lc-instruments/`, `lc-audit-verdict.md` and its lane
verdicts; the worktree `/home/user/veneer-lc2`. A native subagent, clean context; perform the assignment directly and
spawn nothing; edit nothing; run nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else: per-claim verdicts with `file:line` evidence and, for a claim
about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN
standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
