# TEST-MATRICES audit: `checker` on Sonnet

`checker` on Sonnet, a native read-only subagent, holding the mechanical lane. Perform the review directly and spawn nothing. Read `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/tests.md`, `typescript.md`, and `writing.md` first.

## Subject

The unit TEST-MATRICES (`builder` on Sonnet), brief `/home/user/scaffold/.orkestrel/veneer/units/tm-brief.md`, committed as `0bc5bca` in the worktree `/home/user/test-tm` over `7104241`, and cherry-picked as `46336ac` onto `/home/user/test`, with the Orchestrator's fix `7911f63` above it (`tm-fix-brief.md`, `tm-fix.diff`: the guides runner imports the setup module by its `.ts` path). Evidence under `/home/user/scaffold/.orkestrel/veneer/units/`: `tm.diff` (the unit's diff), `tm-status.txt`, `tm-report.md` (the writer's report), `tm-full-gates.log.txt` (the Orchestrator's full chain at `46336ac`, red at `test:guides`), `tm-fix-gates.log.txt`, and `tm-full-gates-2.log.txt` (the full chain at `7911f63`; it may still be growing when you start, so read its `=== ... exit=` lines last).

## Claims

Rule on every numbered claim, under the given ruling, in `/home/user/scaffold/.orkestrel/veneer/units/tm-audit-claims.md`. `analyst` on GPT-6 Astra rules on the same file blind beside you.

## Output

Per claim: CONFIRMED, BROKEN, or UNRESOLVED, with `file:line` evidence. Then findings outside the claims to the BROKEN standard, then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`.
