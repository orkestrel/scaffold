# Landing check — `checker` on Sonnet, CLOSE-REGISTRY (`cr`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The cr audit (`units/cr-audit-verdict.md`) broke claim 6 on prose and carried the reviewer's F1 to an integration edit the Orchestrator applied in `/home/user/veneer-cr` through `units/cr-probe-cr-integration.py`. Rule on these claims by reading alone:

1. `units/cr-integration.diff` (the difference between `units/cr.diff`, the audited diff, and `units/cr-2.diff`, the diff after the edit) changes only doc-block and comment paragraphs in `tests/setup.ts` and `tests/setup.test.ts` and one case title; `units/cr-2-status.txt` names the same files `units/cr-status.txt` names and no other.
2. In `/home/user/veneer-cr/tests/setup.test.ts` the driven-row case's comment reads "A bare stem is the resting frame under a second name, the `rest` state is the resting table's own, and a scenario opening with another subject's stem sorts beside a specimen its frame does not show." and its title reads "names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name".
3. In `/home/user/veneer-cr/tests/setup.ts` the `CASCADE_KEYS` doc block reads "sits in the {@link DRIVEN_KEYS} table." and "That is what separates these from the rows of the {@link DRIVEN_KEYS} table, where a journey drives or reads the state its scenario names before it shoots the frame."; the `DRIVEN_KEYS` doc block reads "These rows sit apart from the {@link CASCADE_KEYS} table because" and "once for each state its family drives or reads."; every other word of those paragraphs is unchanged from `units/cr.diff`'s text.
4. Each code token in the edited paragraphs is followed by a noun; the paragraphs state no count and use no term `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally; no edited line exceeds 100 columns.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
