# Audit brief: unit setup-axis (abort and emitter)

## Role and engine

`checker` on Claude Sonnet, a native subagent in a clean context, read-only. Perform the audit directly and spawn nothing; never edit.

## Subject

The uncommitted units in `/home/user/fleet/abort` (tip 7aee9fd) and `/home/user/fleet/emitter` (tip 67433a5), written by `builder` from `/home/user/scaffold/tmp/units/followon/setup-axis-brief.md`; the report `/home/user/scaffold/tmp/units/followon/setup-axis-report.md`; the evidence `/home/user/work/evidence/conform-abort.diff`, `conform-abort.status`, `conform-emitter.diff`, `conform-emitter.status`. The exemplar is `/home/user/fleet/sqlite/tests/setup.test.ts` on tip 225bb1c. The removed hunks emitter regains are at `/home/user/scaffold/.orkestrel/campaign/conform/units/conform-emitter.diff.txt:215-237` (`package.json`) and `:499-524` (`vite.config.ts`).

## Claims

Rule each claim CONFIRMED, REFUTED, or NOT-EVIDENCED with `file:line` evidence read from the tree, never from the report.

1. `/home/user/fleet/abort/tests/setup.ts` consists of its two-line header comment and nothing else, and no file under `/home/user/fleet/abort/src`, `tests`, `vite.config.ts`, or `package.json` names `isBrowserVuePath`.
2. `/home/user/fleet/abort/tests/setup.test.ts` and `/home/user/fleet/emitter/tests/setup.test.ts` are each byte-identical to the exemplar.
3. `/home/user/fleet/emitter/package.json` carries `"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"` as the last row of `scripts` after `"prepack": "npm run build"`, and its `test` chain reads `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`; no other field of `package.json` differs from tip 67433a5.
4. `/home/user/fleet/emitter/vite.config.ts` carries the `setup` project export between `config` and `guides`, identical to the removed hunk, and lists `setup` between `config` and `guides` in the default export's `projects` array; nothing else in the file differs from tip 67433a5.
5. The status evidence for each checkout lists only the paths the brief's § Scope owns (abort: `tests/setup.ts`, `tests/setup.test.ts`; emitter: `tests/setup.test.ts`, `package.json`, `vite.config.ts`), and the diff evidence carries no other hunk.
6. The report names, per checkout, `test:setup`, `format:check`, `lint:check`, `check`, `build`, and `test` each with exit 0 and the audit's single zero-drift summary line. The independent gate reading is the Orchestrator's deciding run at landing, which no read-only lane can take: rule that reading NOT-EVIDENCED, never FAIL.
7. No `.skip`, `.only`, `.todo`, retry, or inflated timeout enters either diff, and no TODO or commented-out code.

## Output

Per-claim verdicts with evidence, under 120 words each; findings outside the claims, each with the exact prescription that closes it; and exactly one terminal line `PASS` or `FAIL <claim numbers>`.
