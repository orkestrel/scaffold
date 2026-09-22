# Audit lane — `reviewer` on Opus, subjective lane, F8a PROFILES

`reviewer` on Opus (native subagent, clean context). You hold the **subjective** lane (API feel,
naming, guide voice, the shape a consumer meets) over the claims in
`.orkestrel/veneer/units/f8a-audit-claims.md`, which names the evidence; the design is
`/home/user/scaffold/.orkestrel/veneer/f8-design-verdict.md`. The subject tree is the worktree
`/home/user/veneer-f8` (uncommitted writes over `6e74ec9`); read the actual diff
`.orkestrel/veneer/units/f8a.diff` and the status `.orkestrel/veneer/units/f8a-status.txt`.
Law: `/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,tests,styles,workspace,documentation,writing}.md`.
Read-only; edit nothing, run nothing that writes, spawn nothing.

Beyond the claims, rule on: the names `CASCADE_PREFIX`, `collectLayerOrder`,
`collectCustomProperties`, and the plugin name `veneer-tailwind-candidates` under `names.md`; the
profile names and the table's shape as a consumer reads them; the recipe fences' readability and
whether a consumer can copy one without reading the surrounding prose; the case titles in
`tests/tailwind/profiles.test.ts` (named for what they prove); the guide's voice under `writing.md`
(no counts, no `should`, sentence-case headings, links introduced by `see`); and whether the
exclusion line's one-home sentence reads true.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
