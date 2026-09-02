# Audit brief — unit ollama-fixup, checker lane

## Role and engine

`checker` on Claude Sonnet (mechanical conformance), a native subagent in a clean context.
Read-only: Read, Grep, Glob. You audit directly and spawn nothing; you never edit.

## Subject

The fix-up of `@orkestrel/ollama` after its breaking unit at `6a92c05`. The brief the writer
executed is `/home/user/scaffold/tmp/units/breaking/ollama-fixup-brief.md`; the writer's returned
report is `/home/user/scaffold/tmp/units/breaking/ollama-fixup-report.md`; the actual diff is
`/home/user/scaffold/tmp/units/breaking/ollama-fixup.diff` and the actual status is
`/home/user/scaffold/tmp/units/breaking/ollama-fixup.status`; the tree is `/home/user/fleet/ollama`
at the commit the dispatch names. Rule on the tree and the diff, never on the report's
self-assessment.

## Claims — rule each CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, with evidence

1. The options type of `OllamaHTTPError` is declared as `OllamaHTTPErrorOptions` in
   `src/server/types.ts`, and `src/server/errors.ts` imports and uses that name; the guide
   Surface row in `guides/ollama.md` and the errors test import and name it the same way.
2. No occurrence of `OllamaErrorOptions` survives, word-boundary and case-insensitively, under
   `src`, `tests`, `guides/ollama.md`, or `README.md`.
3. The diff carries the rename and nothing else: no declaration, member, TSDoc sentence, or test
   assertion changes beyond the name; import lists stay sorted.
4. The status lists only the brief's owned files (`src/server/types.ts`, `src/server/errors.ts`,
   `guides/ollama.md`, `tests/src/server/errors.test.ts`); nothing under `.claude/`, `configs/`,
   `tests/setupPolicy.ts`, `tests/policy.test.ts`, `package.json`, `package-lock.json`, or a
   vendored guide mirror.
5. Gates: rule UNRESOLVED unless the report quotes the exact command and exit code for every
   gate, in which case CONFIRMED on the quoted evidence; the Orchestrator's landing chain is the
   authoritative run.

## Output

Per-claim verdicts with `file:line` evidence; findings outside the claims, each with why it
matters and what right looks like; then exactly one terminal line: `PASS` or
`FAIL <claim numbers>`.
