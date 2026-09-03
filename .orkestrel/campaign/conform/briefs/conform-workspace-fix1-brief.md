# Unit conform-workspace fix round 1 — the report's sweep record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-workspace-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/workspace`.

## Objective

Close the round-1 objective lane's refutation of claim 4 (`units/l3/workspace-objective-r1.md` § What closes claim 4), on the record: § Sweeps carries an old-form sweep for every row whose repair removed or replaced a prose form, the obj-3 row carries the symbol-shaped sweeps, and the `npm run test:setup` control row states what it is.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (name the pattern and the paths behind every sweep result; record a permitted hit as permitted).

**The lane's readings.** The report's § Sweeps (`report.md:96-107`) records no sweep for obj-5 (`readProperty`), obj-6 (the inline arms `readonly text: string; readonly language: string` and `readonly base64: string; readonly mime: BinaryMIME`), subj-2 (`defaults to an in-memory driver`, `controls case sensitivity`), or subj-3 (the factory-only `@example` body, `createDatabaseWorkspaceStore()` inside `src/core/workspaces/stores/DatabaseWorkspaceStore.ts`); the obj-3 row at `:102` records `function range`, which matches the adopted `rangeOf`; the `npm run test:setup` row at `:78` carries `—` in its Red cell. The lane ran each sweep and each read empty over the population.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rniE '<pattern>' /home/user/fleet/workspace/README.md /home/user/fleet/workspace/guides/workspace.md /home/user/fleet/workspace/guides/README.md /home/user/fleet/workspace/src /home/user/fleet/workspace/tests` (drop `-i` for a case-sensitive pattern; narrow the paths where a row names a narrower population), one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-workspace-report.md`.

**Off-limits.** Everything else.

## Rows

1. Run and add a § Sweeps row for each: `readProperty(s|ed|ing)?` case-insensitive (rule the `guides/test.md` hits as the vendored `@orkestrel/test` mirror of that package's own export); `readonly text: string; readonly language: string` and `readonly base64: string; readonly mime: BinaryMIME` (rule the declarations at `src/core/types.ts:7-16` as the named arms); `defaults to an in-memory driver` and `controls case sensitivity` case-insensitive; `createDatabaseWorkspaceStore\(\)` over `src/core/workspaces/stores/DatabaseWorkspaceStore.ts` (rule `src/core/factories.ts:126` as the factory's own example if the wider population is swept).
2. Replace the `function range` row with `\brange\s*\(`, `function range\b`, and `const range\b` over the population, each run and recorded, and rule the English-noun `range` hits permitted by sense.
3. Rewrite the `npm run test:setup` row's Red cell to state that obj-1's failing-first proof is the stores control in the preceding row and this run is a green-only observation.
4. Append a `## Fix round 1` section naming the rows added or rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. § Sweeps carries a run pattern, population, and result for obj-3, obj-5, obj-6, subj-2, and subj-3.
2. The report's authored prose states no count; no file under `/home/user/fleet` changed.
