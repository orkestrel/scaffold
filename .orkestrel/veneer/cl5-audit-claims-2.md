# CL5 audit — claims (round 2, the fix round under brief 3)

Subject: the whole CL5 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `5240e36` (the CL4b landing), after the fix round `opus` ran under
`.orkestrel/veneer/units/cl5-brief-3.md` (over briefs 2 and 1, in force beneath it). Round 1's
verdict is `.orkestrel/veneer/cl5-audit-verdict.md`; the fix report is `units/cl5-report-2.md`.
Evidence: the rendered diff `units/cl5-diff-2.patch.txt` and status `tmp/audit/cl5-status-2.txt`,
round 1's `units/cl5-diff.patch.txt` for a diff-to-diff reading, the live tree, and the built
`dist/src/styles/index.css`.

**Scope of this round.** Audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Report no wording, comment, doc-block, or guide-prose finding, and
rule on no guide row: the guide is out of this audit's scope entirely, and its facts are a bound
for the unit that owns it. Round 1's rulings carry unchanged and are not reopened, including
every claim it confirmed and every finding it assigned to a successor.

Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. The heading twin's colour assertion can now fail (subjective 12 closed).
   `tests/src/styles/components/type.test.ts` no longer compares the class's colour against a
   value the host supplies by inheritance. It compares the class against the tag on the default
   host, then mounts a second host declaring an explicit `--bs-heading-color` and reads that
   value back through both the tag and the class. Only the class's own
   `color: var(--bs-heading-color)` declaration can deliver it, because that property resolves
   through `--vn-text-heading` to `inherit`. Deleting the declaration reddens every heading level
   with the control's value expected (report-only red-then-green).

2. Every heading level and every display level is now read back through a retuned token
   (objective 3 closed). `tests/setupStyles.ts` gains two frozen tables pairing each level with
   the token its own level names, each carrying a retune value no level resolves by default. Two
   table-driven cases in the type proof mount a host declaring only that level's token and read
   the retuned value back, so a level naming a literal or a sibling's token resolves its default
   and reddens. The existing default-value cases still stand.

3. That matrix is proved to fire, not merely to exist. The unit planted a literal equal to one
   level's default size, which no default-value case can observe, and the matrix reddened at
   exactly that level; removing the plant returned the suite green (report-only red-then-green).
   The plant is gone and the partial is byte-identical to its pre-round state.

4. No source file changed in this round. Both fixes are test-side. The four component partials,
   the two section files, the showcase wiring, and the barrel carry exactly the content round 1
   audited, so round 1's confirmed claims about the shipped cascade stand unretested.

5. The setup module's proof grew with its new exports. `tests/setupStyles.test.ts` carries the
   two new table names in its export-name list, the rows of each table, and both tables in its
   frozen-table loop, matching how the sibling tables in that file are already covered.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl5-status-2.txt` is identical to round 1's
   status: the same paths, no additions and no removals. The round-2 diff differs from round 1's
   only in `tests/src/styles/components/type.test.ts`, `tests/setupStyles.ts`, and
   `tests/setupStyles.test.ts`. `guides/veneer.md` is byte-identical across the two rounds, which
   brief 3 required. `src/styles/**`, `app/browser/**`, `tests/setupConformance.ts`,
   `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are unchanged by this
   round. The added lines carry no `any`, no type assertion outside `as const`, no non-null
   assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property,
   no default export, no skipped case, and no case named for a control; no plant residue remains.
   Every gate exits 0 on managed Chromium and Edge, and the independent verifier's chain is green
   with the status identical before and after.
