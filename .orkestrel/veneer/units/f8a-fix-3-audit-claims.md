# F8a PROFILES round 3 — audit claims

Subject: the second fix round `opus` wrote in `/home/user/veneer-f8` from
`/home/user/veneer-f8/tmp/units/f8a-brief-3.md` over the round-2 verdict
(`/home/user/scaffold/.orkestrel/veneer/units/f8a-fix-audit-analyst-verdict.md`, `FAIL 1, 3, 5`).
Evidence: `/home/user/scaffold/tmp/audit/f8a-fix-3.diff` (the whole diff against `6e74ec9`,
untracked files as additions), `f8a-fix-3-status.txt`, the report
`/home/user/scaffold/tmp/audit/f8a-report.md` (its `## Round 3` section), and the gate chain log
`/home/user/scaffold/tmp/audit/f8a-fix-3-gates.log.txt` (complete when its last line reads
`=== gates done`; read it last). Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`.

1. **The theme reading is scoped.** `collectLayerRules(name, sheets)` in `tests/setupBrowser.ts`
   returns the rules inside one named layer block with no cascade resolution; `collectLayer` routes
   through it and keeps its refusal; it is exported, inventoried, and cased in
   `tests/setupBrowser.test.ts`; the control case in `tests/tailwind/profiles.test.ts` reads
   `--spacing` and `--font-weight-bold` from `collectLayerRules('theme', [instrument])` and the
   control rules from `collectLayerRules('utilities', [instrument])`, and plants the same compiled
   bytes with `@layer theme {` relabelled, where the scoped reading reports nothing; the report's
   pair of readings (relabelled block red under the scoped reading, green under a whole-sheet
   reading) is what the assertions distinguish.
2. **The guide's empty-emission statement is bounded.** § Tailwind's paragraph after the profile
   table states the composable case (a build whose markup uses no utility fills no layer) first and
   the bare import second (preflight fills `base` and reads its own font variables, so the
   `preflight` profile carries `theme` and `base` whatever the markup uses); the fixture assertion
   `fills Tailwind reset only under the preflight profile` (`['theme', 'base']`) agrees; the
   generated-`properties` paragraph is unchanged in substance.
3. **The directive reader parses every supported form.** `collectInlineSources` reads either
   quotation mark and whitespace inside the parentheses, counts the `@source … inline(` occurrences,
   and refuses by name the first one the grammar does not match; its case carries the single-quoted,
   whitespace, unquoted-refusal, and mismatched-pair controls; the copy-equality case reads the
   guide's `css` fences alone (both fences and the fixture stay in the compared population, asserted
   non-empty); the mutation "the guide's first exclusion copy rewritten with single quotes and
   `col-7` removed" reddens it as the report records.
4. **Scope is honest.** The status lists the five tracked files and the four untracked paths of the
   earlier rounds and nothing else; the guide was restored (`grep -c 'not inline("' guides/veneer.md`
   prints 2 and no single-quoted copy remains); `tmp/probe/` is absent; `package-lock.json`,
   `src/**`, `tests/setupStyles.ts`, `configs/helpers.ts`, and the vendored files are untouched.
5. **The gate chain is green**, `test:src:tailwind` included (UNRESOLVED if the log lacks
   `=== gates done` when you read it).
