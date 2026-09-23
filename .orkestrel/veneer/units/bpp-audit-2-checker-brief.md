# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-PROSE (`bpp`) round 2

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, 4, 5, and 7 of
`/home/user/scaffold/.orkestrel/veneer/units/bpp-audit-2-claims.md` by reading alone: claim 1 (the
diff against `87ff1d0` and the status; the untouched files; doc comments only in the two setup
files), claim 3 (the lowercase clause after the semicolon), claim 4 (no `{@link X} function` remains; the three named symbols read `helper` at every site), claim 5 (the `engine` field sentence), and claim 7 (the fed-case titles in `/home/user/veneer-bpp/tests/src/styles/components/button-group.test.ts` against the report; every file the § Tests patch lists exists under
`/home/user/veneer-bpp/tests/`; no listed style proof already has a link under `## Tests` of `/home/user/veneer-bpp/guides/veneer.md`; each proposed link phrase follows
`.claude/rules/writing.md` § Code tokens, references, and links; every count the report states, listed as a finding outside the claims). The subject tree is `/home/user/veneer-bpp`
(uncommitted writes over `87ff1d0`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bpp-2.diff`, `bpp-2-status.txt`, the effective brief
`b-passive-prose-brief-3.md`, and the report `b-passive-prose-report-2.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,names}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, 4, 5, and 7 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
