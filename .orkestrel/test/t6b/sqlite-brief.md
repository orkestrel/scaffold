# T6b unit: sqlite — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/sqlite` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/sqlite` onto test 0.0.5 + scaffold 0.0.38 and apply its T6 sweep rows:
hand-rolled `mkdtemp` temp directories → `createScratch`, same-file error capture →
`captureError`, and the dead `isBrowserVuePath` deletion.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files. Read
  `/home/user/scaffold/tmp/t6b/shared-rows.md` for Row Z — that text is part of this
  brief.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them.
- `createScratch(options?)` from `@orkestrel/test/server` allocates an owned temp
  directory: `{ path, write(target, text), read(target), has(target), remove(target),
destroy() }` — read the installed declaration for the exact members before mapping. A
  site needing raw byte writes or database-file handles keeps using `scratch.path` with
  `node:fs` directly; only allocation and removal must migrate.
- `captureError(fn)` from `@orkestrel/test` returns the thrown value or `undefined` —
  replace same-file try/catch blocks that exist only to capture a throw for assertion.
  A catch block that does more than capture stays.
- Measure your own tree: grep for `mkdtemp` and try/catch capture patterns before
  editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `mkdtemp` sites → `createScratch`: allocation and removal migrate; raw fs
   operations against `scratch.path` stay. A site whose lifecycle cannot map (the
   directory outlives the test file, or removal is asserted separately): stop and
   report it.
4. Row B — same-file capture-only try/catch → `captureError`. Capture-plus-work blocks
   stay, noted.
5. Row Z — dead `isBrowserVuePath` per the shared text.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; an unmappable scratch lifecycle; a red gate
you did not cause or cannot close by formatting your own edits; repair errors. Row B
retentions are recorded, not deviations. Ancillary choices are yours — decide, record,
continue.

## Output

Report: per-row sites found, edited, and retained-with-reason (file:line), the exact
`git diff --stat`, each gate command with exit code and summary counts, deviations or
"none".
