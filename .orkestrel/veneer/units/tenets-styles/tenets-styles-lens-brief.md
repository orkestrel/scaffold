# X-TENETS-STYLES — lens brief (subjective lanes)

## Role and engine

`reviewer` on Opus 5.5, one lens of the X-TENETS-STYLES audit, in a clean context and blind to the other lenses. The
dispatch names your lens and its claims. The objective lane, `analyst` on GPT-6 Astra, rules every claim beside you.

## Objective

Per-claim verdicts on your lens's claims in
`/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-audit-claims.md`, and findings outside the
claims where the shipped styles break a tenet your lens covers.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). The judge is
`/home/user/veneer-probe/ROADMAP.md` § Tenets and § Exit criterion. Evidence, all read-only: the claims file and every
path it names; the worktree `/home/user/veneer-probe` (Veneer `main` at `0865c67`, with its compiled cascade in
`dist/src/styles/index.css`); the latest landing chain log
`/home/user/scaffold/.orkestrel/veneer/units/eid-landing/eid-land-3.log.txt` (the chain on `14fe489`, the parent of
`0865c67`'s styles); Bootstrap 5.3.8 at `/home/user/veneer-probe/node_modules/bootstrap/`; Elements at
`/home/user/elements`. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing;
edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts on your lens's claims, each with
`file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it;
findings outside the claims to the BROKEN standard, each naming the tenet it breaks; one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
