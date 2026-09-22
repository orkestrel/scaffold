# Audit lane — `analyst` on GPT-6 Astra, objective lane, F5d PHYSICAL

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer`. You hold the **objective** lane: correctness, constraints, and what
the code and contracts permit. Say which lane you held. You are the bench engine reading this
brief inside your own CLI: perform the audit directly and spawn nothing. Opus 5 wrote this unit;
you are the engine that did not write it, so a claim the report makes is a claim to attack.

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/f5d-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/tmp/audit/f5d-audit-evidence.md` names the review evidence: the status
output, the diff `f5d.diff` (renames as renames), the unit's report, the brief, and the gate log
when present, with `3ff4e9a` as the base for the export comparison. Rule on every claim; claims
1, 2, 3, 4, 5, and 7 are yours first, and rule the rest too.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`tests.md`, `workspace.md`,
`names.md`, `typescript.md`, `architecture.md`, `documentation.md`, `writing.md`, `quality.md`
§ Falsification); `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict
shape); `/home/user/veneer/guides/veneer.md`.

## What you can execute

Read-only commands in the Veneer checkout: `grep`, `ls`, `cat`, `sed -n`, `git status`,
`git diff`, `git show 3ff4e9a:<path>`, and `node -e` or `node <script>` that writes nothing (an
export-name and body comparison between the base modules and the merged ones). The sandbox denies
the loopback listener vitest's browser mode binds, so run no browser project; the gate log, when
present, is your executed evidence for the browser claims. You may run `npm run test:setup`,
`npm run test:policy`, and `node_modules/.bin/tsc --noEmit --project tsconfig.json`, with npm 11 on
`PATH` (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
because the host's npm 10 fails the package's engine check. Never edit,
never write under the tree, never run a mutating gate.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input and the smallest correct fix,
`UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the evidence missing), findings
outside the claims each substantiated to the `BROKEN` standard, the attacked-and-held list, and
one terminal line. Cite `file:line` for every verdict. No process diary. Your final message is
the verdict.
