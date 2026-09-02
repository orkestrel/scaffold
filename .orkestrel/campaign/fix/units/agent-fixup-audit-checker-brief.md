# Audit brief — unit agent-fixup, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The fix-up of `@orkestrel/agent` after its breaking unit at `df12fab`. The brief the writer
executed is `/home/user/scaffold/tmp/units/breaking/agent-fixup-brief.md`; the writer's returned
report is `/home/user/scaffold/tmp/units/breaking/agent-fixup-report.md`; the actual diff is
`/home/user/scaffold/tmp/units/breaking/agent-fixup.diff` and the actual status is
`/home/user/scaffold/tmp/units/breaking/agent-fixup.status`; the tree is `/home/user/fleet/agent`
at the commit the dispatch names. Rule on the tree and the diff, never on the report's
self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every finding the fix-up brief numbers ends closed in the ruled form at the file and line the
   report names, or stopped with a deviation report; nothing landed as a variant of the ruling.
2. No moved-symbol wording survives: `chunk.type` or `delta.type` in any example, the `consume`
   option key in the `estimateMessages` TSDoc or the guide fence comment, the `<base64>` result
   placeholder, "seed seam" or "analogue of the seed" in the guide, and "INTERNAL precursor" in
   the `RunOutcome` remark.
3. The `AgentJobError` guide row names the `partial` policy apart from the `partial` result flag,
   matching `src/core/errors.ts`.
4. The status lists only the brief's owned files; nothing under `.claude/`, `configs/`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a
   vendored guide mirror.
5. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
