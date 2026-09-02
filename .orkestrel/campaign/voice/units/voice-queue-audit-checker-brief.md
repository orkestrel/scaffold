# Audit brief — unit voice-queue, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The TSDoc voice unit of `@orkestrel/queue` in `/home/user/fleet/queue`. The brief the writer executed is
`/home/user/scaffold/tmp/units/voice/voice-queue-brief.md`; the actual diff is `/home/user/scaffold/tmp/units/voice/voice-queue.diff` and the actual
status `/home/user/scaffold/tmp/units/voice/voice-queue.status`; the writer's report is `/home/user/scaffold/tmp/units/voice/voice-queue-report.md`.
Rule on the diff, the status, and the tree, never on the report's self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. Every hunk in the diff changes comment text only: no `-`/`+` line pair differs outside a
   `/** … */` block or a `//` comment. Quote any hunk that touches a code token.
2. Every backtick token, `{@link …}`, and URL in a rewritten block is byte-identical to the
   removed line; quote any that changed.
3. The status lists only files under `src/` or `app/`; nothing under `tests/`, `guides/`,
   `README.md`, `package.json`, `package-lock.json`, `.claude/`, `configs/`,
   `tests/setupPolicy.ts`, or `tests/policy.test.ts`.
4. Grep the tree's `src/` and `app/` for a doc block whose first line opens with an imperative
   verb (`Create`, `Return`, `Build`, `Check`, `Determine`, `Narrow`, `Resolve`, `Read`,
   `Write`, `Parse`, `Validate`, `Compile`, `Decode`, `Encode`, `Run`, `Start`, `Stop`,
   `Open`, `Close`, `Register`, `Remove`, `Add`, `Get`, `Set`, `Emit`, `Send`, `Wrap`,
   `Format`, `Render`, `Normalize`, `Merge`, `Apply`, `Load`, `Save`, `Convert`,
   `Extract`, `Collect`, `Report`, `Describe`, `Infer`, `Derive`, `Compute`, `Map`,
   `Filter`, `Select`, `Match`, `Find`, `List`, `Count`, `Measure`, `Trim`, `Split`,
   `Join`, `Serialize`, `Deserialize`, `Handle`, "Ensure") followed by a space or a
   backtick, and for `@returns` followed by `Whether`, `\`true\``, or `true `; the sweep
   returns no hit.
5. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
