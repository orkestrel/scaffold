# Unit conform-queue fix round 1 — the report's record

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-queue-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/queue`.

## Objective

Close the round-1 objective lane's findings F-1, F-2, F-3, and F-5 (`units/l3/queue-objective-r1.md`), all on the record: the queue-obj-4 disposition states what landed; the malformed sweep pattern is replaced by the one that ran; § Shared-file patches names worker's guide sites; the out-of-scope findings cite the lines where their sites sit.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (name the pattern and the paths behind every sweep result).

**The lane's readings.** Line numbers are the report's at 19:5x UTC and can have moved; read each site before changing it.

- F-1: the row table (`report.md:13`) records queue-obj-4 as `applied`, while no edit implements the row's move — queue-obj-5 deleted `entryOf`, the type import's only consumer, and the import went with it (the Composition note at `report.md:33-40`). Rewrite the disposition as `noop by composition` and restate the note's first sentence so it says the row's precondition was removed by queue-obj-5 rather than that the repair was performed.
- F-2: the sweep row at `report.md:92` records `queueexecution\|entryOf\|memoryStore(\|failingSaveStore`, whose escaped form carries an unclosed group and cannot run. Re-run `\b(entryOf|memoryStore|failingSaveStore|QueueExecution)\b` case-insensitively with `grep -rniE` over `/home/user/fleet/queue/src`, `/home/user/fleet/queue/tests`, `/home/user/fleet/queue/guides`, and `/home/user/fleet/queue/README.md`, and replace the cell with the pattern run and its result.
- F-3: `/home/user/fleet/worker/guides/worker.md` carries `QueueExecution` at `:103` and `:198`, and `:98` documents `WorkerHandler` as `(input, resource, execution) => …`, whose third parameter the report's own `worker/src/core/types.ts:44` patch renames to `context`; prose mentions of the binding sit at `:19`, `:149`, `:152`, `:199`, `:204`, `:280`, `:283`, and `:427`. § Shared-file patches (`report.md:151-261`) states the guide obligation in prose (`:268-270`) with no path or patch. Add a `worker/guides/worker.md` entry naming those sites with the substitutions `QueueExecution` → `QueueContext` and `execution` → `context` in the shape row and the Surface row, and the prose sites listed for worker's unit to read by sense. Read the file to confirm each line before naming it.
- F-5: the out-of-scope findings (`report.md:300-312`) cite `DatabaseQueueStore.test.ts:206`, `MemoryQueueStore.test.ts:11`, and `tests/guides.test.ts:36`; the sites sit at `:194`, `:12`, and `:47`. Correct the three line numbers.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rniE '<pattern>' /home/user/fleet/queue/src /home/user/fleet/queue/tests /home/user/fleet/queue/guides /home/user/fleet/queue/README.md`, one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-queue-report.md`.

**Off-limits.** Everything else.

## Rows

1. F-1: the disposition and the Composition note.
2. F-2: the sweep cell, re-run.
3. F-3: the worker guide entry under § Shared-file patches.
4. F-5: the three line numbers.
5. Append a `## Fix round 1` section naming the rows rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. The queue-obj-4 row reads `noop by composition` and its note states the precondition's removal.
2. The sweep cell carries a pattern that runs and its result.
3. § Shared-file patches names `worker/guides/worker.md` with its sites and substitutions.
4. The report's authored prose states no count; no file under `/home/user/fleet` changed.
