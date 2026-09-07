Lines 428-429 not in that >100 list, so item 5's lines are within limits (irrelevant to claim 3 anyway, which is scoped to the `extractExamples` doc block only).

Now producing the verdict.

**Lane held: checker**

**Claims:**

1. **PASS** — Diff header lists exactly `guides/guide.md`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts` (`d7-guide-readers-fix.diff.txt:1,23,42,56`), no other file. `guides/guide.md` carries two hunks: `d7-guide-readers-fix.diff.txt:5-11` (§ extraction model, item 5) and `:14-22` (EQ row, item 1); `src/core/helpers.ts:2087-2091` diff hunk is item 2; `src/core/types.ts:379-52` diff hunk is item 3; `tests/src/core/helpers.test.ts:60-66` diff hunk is item 4. Every hunk maps to one of the five brief items.

2. **PASS** — `/home/user/fleet/guide/guides/guide.md:558` reads `body and fence language together. The block is an exported declaration head's own — a \`type\`, \`interface\`,`.

3. **PASS** — `/home/user/fleet/guide/src/core/helpers.ts:2090` reads `* grammar admits at column zero, so comment and template payload cannot qualify and the head`. No line in the surrounding doc block (`helpers.ts:2085-2103`) exceeds 100 columns; a repo-wide `>100`-column sweep does not flag any line in `2085-2103`. The rest of the paragraph (`:2088,2091-2093`) is unchanged from the diff's context lines.

4. **PASS** — `/home/user/fleet/guide/src/core/types.ts:382` reads `* no-argument overload instead.` with no trailing `axis` clause. The no-argument overload's paragraph, `types.ts:359-364`, is unchanged (matches the diff's unmodified context and the brief's `:359-364` citation).

5. **PASS** — `/home/user/fleet/guide/tests/src/core/helpers.test.ts:1776` reads `expect(extractExamples(source)).toStrictEqual([{ name: 'Widget', code: 'new Widget()' }])`.

6. **PASS** — `/home/user/fleet/guide/guides/guide.md:426-427` carries the dedupe sentence ending `...one block each.`, immediately followed at `:428-429` by `` `collectTitles` reads a module's head blocks before its documented members' blocks, so where a head and a member carry one title the head's block answers.`` — verbatim as the brief states it (`d7-guide-readers-fix-brief.md:21`) and after the dedupe sentence.

7. **FAIL** — The report's Criteria section (`d7-guide-readers-fix-report.md:52-102`) names each command and reproduces its output's last lines. But the closing prose at `d7-guide-readers-fix-report.md:104` reads "No deviations. All five before-texts were found verbatim and replaced. All gates green." — this states the count `five` in authored prose (not inside a quoted command-output block), which the claim requires the report to contain none of.

**Findings outside the claims:**

- None beyond the standing carried finding already resolved: the report's numeric test totals (`598 passed (598)`, `51 passed (51)`, `90 passed | 1 skipped (91)`) at `d7-guide-readers-fix-report.md:86,93,100` are verbatim reproductions of tool output inside code fences, not authored prose, so they do not trigger the same "count in prose" defect as claim 7's line.
- Per `d7-guide-readers-audit-verdict.md:12`, claim 6 and the report's gate readings were previously CANNOT RULE pending independent verification; that carry is closed here only for claim 6's text content (now PASS on tree evidence). The report's gate readings themselves (exit codes, pass counts) rest on the writer's self-report and remain unconfirmed by this checker lane, which read no command output — that verification is the `verifier` lane's assignment per this closure brief, not the checker's.

VERDICT: FAIL 7