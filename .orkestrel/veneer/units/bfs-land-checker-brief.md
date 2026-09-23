# Audit lane — `checker` on Sonnet, the bfs landing's integration edits

`checker` on Sonnet (native subagent, clean context, read-only). You verify that the Orchestrator's
integration edits at the B-FORMS-CLOSE-SPECIMENS landing carry the lanes' exact text. The landed
commits on `/home/user/veneer` are `54536c1` (the unit with its integration edits) and `dd855e9`
(the guide sentences moved into § Input group classes); read the files at the current head
`dd855e9` through your Read and Grep tools; you run nothing. Rule each item CONFIRMED or BROKEN with
`file:line`:

1. `guides/veneer.md` § Input group classes carries the three sentences in
   `/home/user/scaffold/.orkestrel/veneer/units/bfs-guide-sentences.txt` verbatim apart from
   wrapping, in the paragraph holding the sentence "The page frame the capture journey writes
   shows the `Input group button` specimen's control under keyboard focus", after it; the range
   section's paragraph (holding "the ring paints on a part with no resolved reading") does not
   carry them; the sentences appear once in the file.
2. `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and `app/browser/constants.ts` carry
   the seven replacements of `/home/user/scaffold/.orkestrel/veneer/units/bfs-integration-2.py`
   verbatim (each `new` string), and no `old` string remains.
3. Every replaced sentence follows `writing.md`: no count, no position name, no banned term, a
   code token followed by a noun (a CSS token its own noun), one idea per sentence.

Law: `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/writing.md`. Edit
nothing, run nothing, spawn nothing. Use absolute paths.

Output: per-item verdicts with `file:line`, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
