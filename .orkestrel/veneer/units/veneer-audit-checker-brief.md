# Audit lane — `checker` on Sonnet, mechanical claims

## Role and lane

`checker` on Sonnet, a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell, no
writes). You rule the mechanically checkable claims with one piece of evidence per item. Perform
the audit directly and spawn nothing.

## Subject, evidence, and claims

`/home/user/scaffold/.orkestrel/veneer/veneer-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/.orkestrel/veneer/units/veneer-audit-evidence.md` is the review evidence with the executed
probe readings beside it. Rule claims 1, 15, 16, 17, 19, 20, 21, and 23; for every other claim
return `UNRESOLVED` with the sentence "judgment claim, referred to the lanes". For claim 17 the
installed Test surface is `/home/user/veneer/node_modules/@orkestrel/test/dist/src/index.d.ts` and
`dist/src/browser/index.d.ts` (the tip `00e2b87`, installed as a tarball). For claim 20 name every
pattern you swept and the paths it covered, and exclude the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts`.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `styles.md`, `documentation.md`);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape).

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order with
`file:line` or the grep result as evidence, findings outside the claims, the attacked-and-held list,
referrals, and one terminal line. No process diary. Your final message is the verdict.
