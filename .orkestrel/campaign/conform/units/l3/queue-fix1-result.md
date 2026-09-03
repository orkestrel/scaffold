## Fix round 1

Closed the round-1 objective lane's findings F-1, F-2, F-3, and F-5, all on the record.

- F-1: the queue-obj-4 row now reads `noop by composition`, and the Composition note's first sentence states that queue-obj-5 removed the row's precondition rather than that a repair moved the import.
- F-2: the malformed sweep cell now carries the pattern that ran, `grep -rniE '\b(entryOf|memoryStore|failingSaveStore|QueueExecution)\b'`, over `src`, `tests`, `guides`, and `README.md`, with its empty result.
- F-3: § Shared-file patches now names `/home/user/fleet/worker/guides/worker.md` with the `QueueExecution` → `QueueContext` and `execution` → `context` substitutions at the `WorkerHandler` shape row (`:98`) and the `ServeWorkerOptions` Surface row (`:103`, `:198`), and lists the prose sites at `:19`, `:149`, `:152`, `:199`, `:204`, `:280`, `:283`, and `:427` for worker's unit to read by sense.
- F-5: the out-of-scope findings now cite `DatabaseQueueStore.test.ts:194`, `MemoryQueueStore.test.ts:12`, and `tests/guides.test.ts:47`.

No file under `/home/user/fleet` changed.
