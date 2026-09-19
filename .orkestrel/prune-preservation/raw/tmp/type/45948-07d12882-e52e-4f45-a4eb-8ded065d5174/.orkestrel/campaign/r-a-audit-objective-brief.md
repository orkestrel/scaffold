# Roughnotes unit R-A audit — objective lane

## Role and lane

`analyst` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `read-only` sandbox with
`-C C:/Users/mikes/WebstormProjects/roughnotes`. You hold the **objective lane** — correctness,
constraints, what the markup, the tests, and the installed declarations actually permit. Opus 5
wrote the unit, so your engine is the one that did not write it: the objective lane is yours by
default, and a clean pass from you is the round's most valuable reading only when every attack is
named.

## Subject, claims, evidence, unknowns, threshold

Read `tmp/audit/r-a-audit-claims.md` — the one claims file both lanes are pointed at — and every
file it names. Read `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md`
§ Verdict shape and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md`
§ Falsification for the conduct inside the round; this checkout carries no rules of its own and
names the sibling scaffold checkout as its authority.

The Orchestrator's gate readings over the subject tree are named in the claims file.

Your sandbox is read-only. Non-mutating commands are permitted (`git diff`, `git show`, `cat`,
`sed -n`, `rg`, `node -e` over a read); the shell is PowerShell with script execution disabled, so
use `npm.cmd run <script> -- <args>` where you attempt a scoped vitest run, and a browser project
needs a write the sandbox refuses — report such a vector `UNRESOLVED` with the exact command and
the Orchestrator runs it. The installed journey layer is under `node_modules/@orkestrel/test/dist/`.

Perform the assignment directly and spawn nothing. Edit nothing. Write nothing under the tree;
your report is your final message alone.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
