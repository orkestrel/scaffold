# Audit lane — `checker` on Sonnet, mechanical claims, T1 TEST-SCOPED and T2 TEST-FORCED-COLORS

## Role and lane

`checker` on Sonnet, a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell, no
writes). You rule the mechanically checkable claims with one piece of evidence per item. Perform the
audit directly and spawn nothing.

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/t1-t2-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/tmp/audit/t1-t2-audit-evidence.md` is the review evidence with the full diff
`t1-t2.diff` and the gate log `t1-t2-gates.log.txt` beside it. Rule claims 7, 8, 9, 11, and 12; for
every other claim return `UNRESOLVED` with the sentence "judgment claim, referred to the lanes".
For claim 8 the installed declarations are `/home/user/test/src/core/index.ts` and
`/home/user/test/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`. For claim 9 compare
each new export's doc-block description paragraph in `/home/user/test/src/browser/helpers.ts` with
its `Summary` cell in `/home/user/test/guides/test.md` § Surface, byte for byte after collapsing
whitespace, and check each `Voice` row the diff changed against the throwing site in the source.
For claim 12 name every pattern you swept and the paths it covered.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape).

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order with
`file:line` or the grep result as evidence, findings outside the claims, the attacked-and-held list,
referrals, and one terminal line. No process diary. Your final message is the verdict.
