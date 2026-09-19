# Units T1 and T2 audit — objective lane

## Role and lane

`analyst` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `read-only` sandbox with
`-C C:/Users/mikes/WebstormProjects/test`. You hold the **objective lane** — correctness,
constraints, what the code, the installed declarations, and the browser actually permit, the
sufficiency of each control, and the truth of each guide sentence. The units were written on the
other engine, so no swap applies.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/t-audit-claims.md` — the one claims file
both lanes are pointed at — and every file it names (paths under `tmp/` and `.orkestrel/` are in
the scaffold checkout at `C:/Users/mikes/WebstormProjects/scaffold`; the subject tree is your
working directory). Read `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md`
§ Verdict shape and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md`
§ Falsification for the conduct inside the round.

The Orchestrator's own gate readings sit at
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/t1-gates-summary.txt` and
`t2-gates-summary.txt`.

Your sandbox is read-only and cannot launch a browser (a grandchild process is denied), so every
browser-side vector is reported `UNRESOLVED` with the exact fixture and command, and the
Orchestrator runs it in the `src:browser` project. Non-mutating commands are permitted (`git diff`,
`git show`, `cat`, `sed -n`, `rg`, `node -e` over the built `dist/` through a `file:///C:/...` URL
for a core-entry question); the shell is PowerShell with script execution disabled (`npm.cmd`).

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Your final message must be, and only be, the verdict shape `orkestrel-falsify` fixes: numbered
verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the input,
`UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
