# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5a ACCOUNTING-SPLIT

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer`. You hold the **objective** lane: correctness under adverse inputs,
constraints, test sufficiency, and what the code and contracts permit. Say which lane you held.
You are the bench engine reading this brief inside your own CLI: perform the audit directly and
spawn nothing.

Opus 5 wrote this unit. You are the engine that did not write it, so your lane is the one that
must not defer to the report: a claim the report makes is a claim to attack, never evidence.

## Subject, evidence, and claims

`/home/user/scaffold/.orkestrel/veneer/f5a-audit-claims.md` is the one claims file every lane reads: the
subject, what the round decides, what is already established, the numbered claims, the unknowns,
and the threshold. `/home/user/scaffold/.orkestrel/veneer/units/f5a-audit-evidence.md` names the review
evidence: the status output, the diff `f5a.diff`, the unit's report, the gate log when present,
and the base commit for behaviour comparison. Rule on every claim; claims 1, 2, 5, 7, 8, 10, 11,
and 15 are yours first, and rule the rest too.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, `styles.md`,
`documentation.md`, `writing.md`, `quality.md` § Falsification);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape);
`/home/user/veneer/guides/veneer.md`; `/home/user/scaffold/guides/test.md` § Surface for the
installed `@orkestrel/test`.

## What you can execute

Read-only commands in the Veneer checkout: `grep`, `ls`, `cat`, `sed -n`, `git status`,
`git diff`, `git show d93bb85:<path>`, `git log`, and `node -e` or `node <script>` that writes
nothing (for example, a `postcss` walk or an export-name diff between `git show d93bb85:tests/setupStyles.ts`
and the three modules). The sandbox denies the loopback listener vitest's browser mode binds, so
run no browser project and no Playwright recording: for claims 5, 6, and 13 the gate log, when
present, is your executed evidence, and you rule on whether the assertions could pass the
mutations you name. You may run the Node `setup` and `conformance` projects if they start inside
the sandbox (`npm run test:setup`, `npm run test:conformance` after confirming `dist/` exists; do
not build), and `node_modules/.bin/tsc --noEmit --project tsconfig.json` (the root project the `check` script
runs first, which covers the setup files). Never edit, never write under the tree,
never run a mutating gate.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input, state, or interleaving and the
smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the evidence
missing), findings outside the claims each substantiated to the `BROKEN` standard, the
attacked-and-held list, and one terminal line. Cite `file:line` for every verdict. No process
diary. Your final message is the verdict.
