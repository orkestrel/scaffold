# Unit docs-proposal-fix — report

Returned by `implementer` on Opus 5 on 2026-09-05 (brief: `tmp/units/docs-proposal-fix-brief.md`); captured verbatim by the Orchestrator.

**Applied** — every fix in `/home/user/scaffold/PROPOSAL.md` (now 1292 lines):

1. **Rule ids.** `policy/tsdoc-voice` at `:649-654`, `:961`, `:1051`, `:1087`, `:1118`, `:1266`; the proposal flag and the sibling-refusal-form note at `:966-968`.
2. **Counts carry their run.** (a) `:366-367`. (b) `:611-619`, a table with a Command-or-record column. (c) `:884-885`.
3. **Option 2's worked example.** Claim at `:724-730`; the closing remark paragraph at `:754-757`; the body-rendering rule in the mechanism table at `:699`; the rendered passage's rule statement at `:770-773` and the passage at `:775-800`.
4. **Option 1's fleet cost.** Blockquote `:10-16`, Summary bullet `:30-33`, glance-table cell `:62`, Claim 5 `:679-683`, migration step `:584-588`; the `writing.md` amendment clause dropped at `:1115-1117`.
5. **Pointers.** (a) `:208` and `:211-217`. (b) `:90-92`, `:1052-1055`, `:1186-1188`. (c) `:983-984`, `:1102-1104`. (d) `:476-478`. (e) `:446`.
6. **Checks tables.** `SB, guide to barrel` row at `:528`; Option 2's TE row at `:837`.
7. **Rename rows.** Option 1 `:510`; Option 2 `:810`.
8. **Fragment.** `:1042`.
9. **One reason per refusal; a comparison per probe.** `:1235`, `:1237`, `:1240`; probe 3 at `:1254-1259`.
10. **`:93`.** `:103-106`; Option 2's benefit statements at `:842` and `:929-932`.
11. **Rule-per-site judgment.** `:86-95`.
12. **Stage 3's claim.** Head-region coverage at `:432-437`; the recommendation at `:1195-1202`.
13. **Date the reading.** `:290-291`.
14. **Population.** `:321-322`, `:580-581`.
15. **Section-ownership walk.** `:894-901`.
16. **Direct-to-barrel.** `:833`.
17. **`guide.tests()`.** Moved to the running-checks table at `:197`, ruling at `:219-221` and `:226-227`, option rows at `:533` and `:1078`.
18. **`:213-214`.** `:235-236`.
19. **Conditional `jsdoc`.** `:1092`, `:1099-1101`.
20. **Inherited defects.** Option 1 risk row at `:649-656`.
21. **Own flags.** Marker qualifier at `:393-396`; denylist judgment at `:1152-1157`.

**Format**: `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` → `All matched files use the correct format.` (exit 0).

**Sweeps**
- `grep -rniE '\b(should|simply|leverage)\b' src configs tests` → no output, exit 1.
- `grep -rniE 'substitution|banned' src configs tests` → `src/core/templates.ts:1442` ("declaration substitution"), `configs/policy.ts:197` and `:300` (mock-API "banned" messages), `tests/src/core/templates.test.ts:1382`, `tests/setupPolicy.ts:1819`, `tests/guides.test.ts:363`.
- `grep -rhE '^export (const|function|class|interface|type|enum)' src/bin | wc -l` → `69`.

**Not applied**: none.

**Flags**
- `:615`, the commit-attribution row: I did not run `git show <rev>:guides/scaffold.md | wc -l` — the brief bars git commands — so the row names that command and cites `tmp/units/docs-reconciliation.md:8` as the record the readings came from. The line counts themselves are the reconciliation's, not a run I took.
- `:534`, the `Pinned removals` row in Option 1's checks table: not named by any fix. I added it because fix 6's stated goal is making `:522` ("The table rules on every check in the catalog") true, and that check sits in the catalog table at `:196` while the option table omitted it. Table-shape decision recorded here.
- `:842` and `:929-932`: "their sites become one" rests on the render reading `@example`, which no code does yet; the sentence describes a mechanism the first unit builds, not measured behaviour.
- `:1254-1259`, probe 3: the fixture's marker names (`surface`, `methods`) are my choice, not evidence — the probe's branches are what the brief fixes.
