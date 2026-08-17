# T6b unit: pool — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/pool` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/pool` onto test 0.0.5 + scaffold 0.0.38 and apply its two T6 sweep
rows: migrate `createGate` uses to native `Promise.withResolvers`, and replace the
`createErrorRecorder` alias with `createRecorder` inline.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol turns out to live in a vendored file, stop and report.
- The fleet verified Node >=22.12 and TS 6.0.3 here, so `Promise.withResolvers<T>()` is
  available natively. Measure your own tree: grep for the symbols before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `createGate` → native: find the local `createGate` declaration in `tests/`
   and every call site (`grep -rn "createGate" tests/ src/ app/ 2>/dev/null`). Read the
   declaration's returned shape first, then migrate each call site mechanically to
   `Promise.withResolvers<T>()`: the returned promise stays the promise; the
   open/resolve member becomes `resolve`; a reject member becomes `reject`. Keep each
   site's awaited expressions and assertions unchanged. Delete the declaration and its
   type/export rows last. If any site's mapping is not mechanical, stop and report it.
4. Row B — `createErrorRecorder` alias: find its declaration in `tests/` and every call
   site. Replace each call with
   `createRecorder<readonly [error: unknown, event: string]>()` imported from
   `@orkestrel/test`, keeping each site's variable name and assertions unchanged. Delete
   the alias declaration. If a site's tuple shape differs, keep that site's actual shape
   and note it.
5. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing from this tree; a non-mechanical mapping; a red
gate you did not cause or cannot close by formatting your own edits; repair errors.
Ancillary choices are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with its exit code and summary counts, deviations or "none".
