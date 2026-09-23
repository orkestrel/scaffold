# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-PROSE (`bpp`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, 5, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/bpp-audit-claims.md` by reading alone: claim 1 (the
diff against `87ff1d0` and the status; the untouched files; doc comments only in the two setup
files), claim 3 (each named site in the diff carries its noun), claim 5 (a sample of the listed
proof files exists under `/home/user/veneer-bpp/tests/`, no listed style proof already has a link
under `## Tests` of `/home/user/veneer-bpp/guides/veneer.md`, and each proposed link phrase follows
`.claude/rules/writing.md` § Code tokens, references, and links), and claim 6 (`writing.md`
conformance of every changed comment; no `any`, `as`, `!`, suppression, mock, or nested function
beyond a callback passed directly; no helper duplicating an installed `@orkestrel/test` export; the
report's criterion lines against the diff). The subject tree is `/home/user/veneer-bpp`
(uncommitted writes over `87ff1d0`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bpp.diff`, `bpp-status.txt`, the brief
`b-passive-prose-brief.md`, and the report `b-passive-prose-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,names}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, 5, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
