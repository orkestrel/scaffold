# Audit lane — `checker` on Sonnet, the bft landing's integration edits

`checker` on Sonnet (native subagent, clean context, read-only). You verify that the Orchestrator's
integration edits at the B-FORMS-CLOSE-TABLES landing carry the lanes' exact text. The landed
commit is `d06945c` on `/home/user/veneer` (read it with `git -C /home/user/veneer show d06945c --
guides/veneer.md tests/setupServer.ts tests/setupServer.test.ts` through your Read and Grep tools on
the files at the commit `c5c4179` head of `/home/user/veneer`; you run nothing). Rule each item
CONFIRMED or BROKEN with `file:line`:

1. `guides/veneer.md` § Input group classes carries the paragraph in
   `/home/user/scaffold/.orkestrel/veneer/units/bft-guide-paragraph.txt` verbatim apart from
   wrapping, in place of the paragraph that began "The text control and select classes carry no
   radius of their own in this cascade", and the sentence that followed it ("The addon takes no
   position…") is unchanged.
2. `tests/setupServer.ts` and `tests/setupServer.test.ts` carry the six replacements of
   `/home/user/scaffold/.orkestrel/veneer/units/bft-integration-2.py` verbatim (each `new` string),
   and no `old` string remains.
3. Every replaced sentence follows `writing.md`: no count, no banned term, a code token followed
   by a noun (a CSS token its own noun).

Law: `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/writing.md`. Edit
nothing, run nothing, spawn nothing. Use absolute paths.

Output: per-item verdicts with `file:line`, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
