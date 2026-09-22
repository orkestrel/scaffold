# Audit lane — `analyst` on GPT-6 Astra, objective lane, F6 FOUNDATION

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), reached through `codex exec --sandbox read-only`
rooted at `/home/user/veneer-f6` (a git worktree of Veneer, detached at `07fc3c3` plus the unit's uncommitted
writes). You hold the **objective** lane: correctness, constraints, and what the code and contracts
permit. Say which lane you held. You are the bench engine reading this brief inside your own CLI:
perform the audit directly and spawn nothing. Opus 5.5 wrote this unit; you are the engine that
did not write it, so a claim the report makes is a claim to attack.

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/f6-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/tmp/audit/f6-audit-evidence.md` names the review evidence: the status
output, the diff `f6.diff` (against `07fc3c3`), the unit's report, the brief, and the gate log when
present. Rule on every claim; claims 1, 2, 3, 4, 5, 7, 8 are yours first, and rule the rest too.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`tests.md`, `workspace.md`,
`names.md`, `typescript.md`, `architecture.md`, `documentation.md`, `writing.md`, `quality.md`
§ Falsification); `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict
shape); `/home/user/veneer/guides/veneer.md` as it stands in the subject checkout.

## What you can execute

Read-only commands in the worktree: `grep`, `ls`, `cat`, `sed -n`, `git status`, `git diff`,
`git show 07fc3c3:<path>`, and `node -e` or `node <script>` that writes nothing (read the guards against the installed `@orkestrel/contract` declarations under `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`; list `dist/src/styles/` only if it already exists). The sandbox denies the loopback listener
vitest's browser mode binds, so run no browser project; the gate log, when present, is your
executed evidence for the browser claims. You may run `npm run test:setup`, `npm run test:policy`,
and `node_modules/.bin/tsc --noEmit --project tsconfig.json`, with npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`), because the host's npm 10 fails the package's engine check. The
gate log at `/home/user/scaffold/tmp/audit/f6-gates.log.txt` is complete when its last line reads
`=== gates done`; read it last. Never edit, never write under the tree, never run a mutating gate.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input and the smallest correct fix,
`UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the evidence missing), findings
outside the claims each substantiated to the `BROKEN` standard, the attacked-and-held list, and
one terminal line. Cite `file:line` for every verdict. No process diary. Your final message is
the verdict.
