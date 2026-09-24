# Audit round 2 — PASSIVE-FRAMES (`fp`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: the specimens, the re-shot frames, the names, and the guide
prose against the successor brief. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/fp-audit-2-claims.md`, weighted to
claims 2, 3, 4, and 7: open every added or re-shot frame at `light-1280` and `dark-390` under
`/home/user/veneer-fp/tmp/capture/states/` and rule whether it shows the state its scenario names.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only, under
`/home/user/scaffold/.orkestrel/veneer/units/`: `fp-2.diff`, `fp-2-status.txt`, `fp-shared-2.patch`,
`b-passive-frames-report-2.md`, `b-passive-frames-brief-2.md`, `fp-instruments/`, `fp-audit-verdict.md` and its lane
verdicts; the worktree `/home/user/veneer-fp`. A native subagent, clean context; perform the assignment directly and
spawn nothing; edit nothing; run nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else: per-claim verdicts with `file:line` evidence and, for a claim
about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN
standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
