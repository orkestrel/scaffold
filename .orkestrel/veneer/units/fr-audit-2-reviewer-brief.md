# Audit round 2 — FORMS-FRAMES (`fr`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: the specimens, the added frames, the names, and the guide
prose against the successor brief. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/fr-audit-2-claims.md`, weighted to
claims 4, 5, and 6: open every added or re-shot frame at `light-1280` and `dark-390` under
`/home/user/veneer-fr/tmp/capture/states/` and rule whether it shows the state its scenario names.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, read-only, under
`/home/user/scaffold/.orkestrel/veneer/units/`: `fr-2.diff`, `fr-2-status.txt`, `fr-shared-2.patch`,
`b-forms-frames-report-2.md`, `b-forms-frames-brief-2.md`, `fr-instruments/`, `fr-audit-verdict.md` and its lane
verdicts; the worktree `/home/user/veneer-fr`. A native subagent, clean context; perform the assignment directly and
spawn nothing; edit nothing; run nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else: per-claim verdicts with `file:line` evidence and, for a claim
about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN
standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
