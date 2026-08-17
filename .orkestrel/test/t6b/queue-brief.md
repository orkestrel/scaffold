# T6b unit: queue — re-pin, repair, sweep rows

Role: `builder` (native cheap tier). Executor: you perform this assignment directly in
`/workspace/queue` and spawn nothing. Sole writer in that tree. Commit nothing; the
Orchestrator commits and pushes.

## Objective

Bring `orkestrel/queue` onto test 0.0.5 + scaffold 0.0.38 and apply its three T6 sweep
rows: migrate `createGate` to native `Promise.withResolvers`, adopt `requireValue` in
place of the local `requireElement`, and replace the `createErrorRecorder` alias with
`createRecorder` inline.

## Context

- `AGENTS.md` and `.claude/rules/` in the tree govern code substance. Read
  `.claude/rules/tests.md` before editing test files.
- The registry serves `@orkestrel/test` 0.0.5 and `@orkestrel/scaffold` 0.0.38. Network
  is available; installs are permitted for this unit.
- `npx scaffold repair` restores vendored files (`tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `.claude/settings.json`, and configs it
  owns). Repair-rewritten files are expected diff; NEVER hand-edit any of them. If a
  row's symbol lives in a vendored file, stop and report.
- Node >=22.12 / TS 6.0.3 verified fleet-wide: `Promise.withResolvers<T>()` is native.
- Measure your own tree: grep for each symbol before editing.

## Steps

1. In `package.json` devDependencies set `"@orkestrel/test": "^0.0.5"` and
   `"@orkestrel/scaffold": "^0.0.38"`. Run `npm install`.
2. Run `npx scaffold repair`. Do not edit what it wrote.
3. Row A — `createGate` → native: find the local declaration in `tests/` and every call
   site. Read the declaration's returned shape first, then migrate each site to
   `Promise.withResolvers<T>()` (promise stays promise; open/resolve becomes `resolve`;
   reject becomes `reject`). Keep awaited expressions and assertions unchanged. Delete
   the declaration and its type last. Non-mechanical mapping at any site: stop, report.
4. Row B — `requireElement` → `requireValue`: find the local `requireElement` guard and
   its call sites. `requireValue` from `@orkestrel/test` narrows `T | undefined` and
   throws on absence; a `requireElement(array, index)` site becomes
   `requireValue(array[index])`. Replace each site, update imports, delete the local
   declaration. If a site's semantics differ from that mapping, stop and report it.
5. Row C — `createErrorRecorder` alias: replace each call with
   `createRecorder<readonly [error: unknown, event: string]>()` imported from
   `@orkestrel/test`, keeping variable names and assertions. Delete the alias. A site
   with a different tuple shape keeps its actual shape; note it.
6. Validate: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test` —
   all green, read bare. If format:check fails only on files you edited, run
   `npx oxfmt --config .oxfmtrc.json <those files>` then re-run format:check.

## Scope

Owned: `package.json`, `package-lock.json`, `tests/**` except the vendored files named
above. Off-limits: everything else, `src/**`, vendored files, `.claude/**`, secrets.

## Deviation contract

Stop and report on: a row symbol missing; a non-mechanical mapping; a red gate you did
not cause or cannot close by formatting your own edits; repair errors. Ancillary choices
are yours — decide, record, continue.

## Output

Report: per-row sites found and edited (file:line), the exact `git diff --stat`, each
gate command with exit code and summary counts, deviations or "none".
