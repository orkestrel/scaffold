# Audit lane — `analyst` on GPT-6 Astra, objective lane, F4 HOST-OBSERVATIONS

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer`. You hold the **objective** lane: correctness under adverse orderings,
constraints, test sufficiency, and mechanical conformance. Say which lane you held. You are the
bench engine reading this brief inside your own CLI: perform the audit directly and spawn nothing.

Your engine (Astra, through the `sol` route, thread `01a0c98c-d357-76d2-b5c4-2fa40da49f7b`) wrote
the run 3 half of this unit: the recorder, the repaired event cases, the fixture provenance and
refresh, the engine's class-attribute restoration and its matrix, and the stripe assertions. Attack
that half harder than the rest: a clean pass on your own engine's work is the least valuable result
you can return. Opus 5 wrote the run 4 half (the fixture formatting, the README rows, the guide
paragraph, the rename).

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/f4-audit-claims.md` is the one claims file every lane reads: the
subject, what the round decides, what is already established, the numbered claims, the unknowns,
and the threshold. `/home/user/scaffold/tmp/audit/f4-audit-evidence.md` is the review evidence: the
status output, the diffstat, `f4-core.diff` and `f4-rename.diff` beside it, the gate log
`f4-gates.log.txt`, and the run 3 report. Rule on every claim; claims 1 to 7, 10, 12, 13, and 14
are yours first, and rule the rest too.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, `documentation.md`,
`writing.md`, `quality.md` § Falsification); `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md`
(the verdict shape); `/home/user/veneer/guides/veneer.md`; `/home/user/scaffold/guides/test.md`
§ Surface for the installed `@orkestrel/test`.

## What you can execute

Read-only commands in the Veneer checkout: `grep`, `ls`, `cat`, `sed -n`, `git status`,
`git diff`, `git log`, and `node -e` or `node <script>` that writes nothing. The sandbox denies the
loopback listener vitest's browser mode binds, so run no browser project and no Playwright
recording: the gate log is your executed evidence for claims 5, 7, 10, 11, and 13, and you rule on
whether its readings could pass the mutations you name. You may run `node_modules/.bin/tsc --noEmit -p configs/src/tsconfig.browser.json`
and `node_modules/.bin/oxlint --config .oxlintrc.json <file>` on owned files. Never edit, never
write under the tree, never run a mutating gate.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input, state, or interleaving and the
smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the evidence
missing), findings outside the claims each substantiated to the `BROKEN` standard, the
attacked-and-held list, and one terminal line. Cite `file:line` for every verdict. No process diary.
Your final message is the verdict.
