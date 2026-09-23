# Landing check — `checker` on Sonnet, B-PASSIVE-ORDER (`bpo`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The bpo round-2 audit
(`units/bpo-audit-2-verdict.md`) broke claim 2 on the composition case's comment, fixed by an
integration edit the Orchestrator applied in `/home/user/veneer-bpo` through
`units/bpo-probe-bpo-integration.py` before the landing (Veneer `f898502`). Rule on these claims by
reading alone:

1. `units/bpo-integration.diff` changes only the comment inside the case `reads a nested card as
   absolute, the barrel resolving the tie in the release order` in
   `tests/src/styles/components/ratio.test.ts`, and nothing else.
2. The comment in `/home/user/veneer-bpo/tests/src/styles/components/ratio.test.ts` reads "The
   `.ratio > *` selector and the `.card` selector both declare the `position` property at
   specificity `(0,1,0)`, so the partial that loads later wins the tie. The release loads its
   helpers, the `_ratio.scss` partial among them, after the `card` partial, so a card nested in a
   ratio box reads the `absolute` value from the ratio rule rather than the `relative` value from
   its own." with the case body unchanged.
3. Every code token in that comment is followed by a noun; it states no count and uses no term
   `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally; the same
   text appears in the landed commit `git -C /home/user/veneer show f898502:tests/src/styles/components/ratio.test.ts`
   (read the worktree copy; the Orchestrator confirms the landing separately).

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit
nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with
`file:line`, findings outside the claims to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
