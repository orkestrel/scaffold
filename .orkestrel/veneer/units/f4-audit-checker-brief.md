# Audit lane — `checker` on Sonnet, mechanical claims, F4 HOST-OBSERVATIONS

## Role and lane

`checker` on Sonnet, a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell, no
writes). You rule the mechanically checkable claims with one piece of evidence per item. Perform the
audit directly and spawn nothing.

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/f4-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/tmp/audit/f4-audit-evidence.md` is the review evidence with `f4-core.diff`,
`f4-rename.diff`, the gate log `f4-gates.log.txt`, and the run 3 report beside it. Rule claims 3,
11, 12, 13, 14, and 15; for every other claim return `UNRESOLVED` with the sentence "judgment
claim, referred to the lanes". For claim 3 name every pattern you swept and the paths it covered.
For claim 11 read the rename population from `/home/user/scaffold/.orkestrel/veneer/units/f4-terrain.md`
§ The `specimen` term and check each file's diff in `f4-rename.diff` for a changed line that is not
an identifier, a call, an import specifier, an inventory string, the class's registry-sense doc
comment, or the one case title the claim names. For claim 12 the installed declarations are
`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
`/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`, and
`/home/user/veneer/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`. For claim 13 read
every `=== <gate> exit=` line of the gate log.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape).

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order with
`file:line` or the grep result as evidence, findings outside the claims, the attacked-and-held list,
referrals, and one terminal line. No process diary. Your final message is the verdict.
