# Audit lane — `reviewer` on Opus, subjective lane, f8c-b-fix

`reviewer` on Opus 5.5 (native subagent, clean context). You hold the **subjective** lane (API
feel, naming, guide voice, TSDoc and comment voice, the shape a consumer and a showcase reader meet)
over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2-audit-claims.md`, which names the evidence and
the unknowns; every target this lane rules on is a numbered claim there or a finding outside the
claims to the BROKEN standard. The subject tree is the worktree `/home/user/veneer-f8b` (uncommitted writes); the
review evidence is `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-4.diff` (the whole diff against the checkpoint `b9c0b0a` after rounds 2, 3, and 4), `f8c-b-4-status.txt`, and `f8c-b-1.diff` (the round-1 diff, for the delta) and the report `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-2-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,tests,styles,browser,application,documentation,writing}.md`.
The rounds 3 and 4 that followed the claims file closed the round-2 analyst finding 9 (bare code tokens as sentence subjects) with the briefs `/home/user/veneer-f8b/tmp/units/f8c-b-brief-3.md` and `f8c-b-brief-4.md` and the reports `f8c-b-report-3.md` and `f8c-b-report-4.md`; rule on those passages too, as findings outside the claims where they fail, and on the whole `### Tailwind` section of `guides/veneer.md` and the TSDoc of `tests/setupService.ts` and `tests/setupServer.ts` for voice.
Read-only; edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict on a proof, the mutation you named and whether the assertion distinguishes
it), findings outside the claims to the BROKEN standard, referrals, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
