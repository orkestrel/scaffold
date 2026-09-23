# Landing check — `checker` on Sonnet, CLOSE-MOTION (`cm`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The cm audit (`units/cm-audit-verdict.md`) broke claim 6 on the styles setup module's head comment, fixed by an integration edit the Orchestrator applied in `/home/user/veneer-cm` through `units/cm-probe-cm-integration.py`. Rule on these claims by reading alone:

1. `units/cm-integration.diff` (the difference between `units/cm.diff` and `units/cm-2.diff`) changes only the head comment of `tests/setupStyles.ts`; `units/cm-2-status.txt` names the same files `units/cm-status.txt` names and no other.
2. The head comment of `/home/user/veneer-cm/tests/setupStyles.ts` reads "A helper that reads a file or a process belongs in the `tests/setupServer.ts` module, and a helper that drives a document belongs in the `tests/setupBrowser.ts` module." with every other word of the comment unchanged and the comment wrapped at 100 columns.
3. Every code token in the head comment is followed by a noun; it states no count and uses no term `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
