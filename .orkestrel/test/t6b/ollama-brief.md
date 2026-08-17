# T6b unit: ollama — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/ollama` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/ollama` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
`waitForRequest`'s raw `setTimeout` → `waitForDelay`, and the dead `isBrowserVuePath`
deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted. Do NOT run any live-service (ollama daemon)
  project — `npm test` runs only the default projects and that is the required gate.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them.
- `waitForDelay(ms?)` from `@orkestrel/test` waits one host timer, defaulting to 0.
- Measure your own tree: grep for the symbols before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — find `waitForRequest` in `tests/` and its raw
   `new Promise(... setTimeout ...)` (or bare `setTimeout`) delay; replace that inline
   delay with `await waitForDelay(<same ms>)` imported from `@orkestrel/test`, keeping
   the helper's polling/retry structure otherwise unchanged. If the raw timer is doing
   something other than a plain delay (a race, an abort wire), stop and report.
4. Row Z — dead `isBrowserVuePath` per the shared text.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-plain-delay timer at Row A; a red gate
you did not cause or cannot close by formatting your own edits; repair errors. Ancillary
choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
