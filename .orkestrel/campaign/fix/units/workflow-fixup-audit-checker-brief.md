# Audit brief — unit workflow-fixup, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The fix-up of `@orkestrel/workflow` after its breaking unit at `bcf8ab4`. The brief the writer
executed is `/home/user/scaffold/tmp/units/breaking/workflow-fixup-brief.md`; the writer's returned
report is `/home/user/scaffold/tmp/units/breaking/workflow-fixup-report.md`; the actual diff is
`/home/user/scaffold/tmp/units/breaking/workflow-fixup.diff` and the actual status is
`/home/user/scaffold/tmp/units/breaking/workflow-fixup.status`; the tree is `/home/user/fleet/workflow`
at the commit the dispatch names. Rule on the tree and the diff, never on the report's
self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every finding the fix-up brief numbers ends closed in the ruled form at the file and line the
   report names, or stopped with a deviation report; nothing landed as a variant of the ruling.
2. `scanSnapshotContext` is exported and called at the cloner and no `locateSnapshotContext`
   survives; `createWorkflowTree` takes `(definition, captured)` at its declaration, every call
   site, and its `@example`; `RunHolder` is absent from `src/core/index.ts` and present in
   `INTERNAL`; `#schedule` and `#idleAPI` are absent from `src/browser`.
3. No removed-field wording survives: the `functions?.[run]` TSDoc, the `for its run` comment,
   the `'run' in snapshot` assertion, the `captured-runs`, `noRun`, and `emptyRun` fixtures, and
   any Runner fence naming a consumer handler `run(...)`.
4. The guide names `ControllerInterface` and `TaskControllerInterface` at the layer summary, the
   `RunnerHandler` row, the Patterns substrate paragraph, and the per-unit handle section, and
   its persisting section states the pre-release `run` key, the `RESTORE` refusal, and the
   rewrite.
5. The finding-4 red-then-green record names the command, the failing assertion and count under
   the planted `behavior: undefined`, and the green run with the plant removed, and
   `src/core/helpers.ts` carries only the rename afterwards.
6. The status lists only the brief's owned files; nothing under `.claude/`, `configs/`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a
   vendored guide mirror.
7. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
