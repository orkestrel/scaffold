# Unit F-ARM — reorder the project-deadline fixture so boot cannot inherit the heavy tree

## Role and engine

`implementer` on Claude Opus 5, native subagent. Perform the assignment directly and spawn
nothing beyond what the tests themselves spawn.

## Objective

Adopt the ARM-AUDIT verdict's fix (`tmp/codex/arm-audit-last.md`) in
`tests/src/server/Probe.test.ts`, case
`expires caller-named project resolution and serves through the recycled type stage`
(near line 798). Do not commit.

## The root cause, as established

The fixture writes `generated/**` (10,000 files) and the include-heavy
`projects/tsconfig.generated.json` BEFORE constructing the `Probe` with `deadline: 2_000`. Boot's
own control inspections race that same deadline, and the runtime stage's boot scan walks the whole
scratch workspace, so under the three-project `test:src` load boot expires. A rejected boot never
emits `arm` and surfaces no error (`Probe.ts:200-216`, recovery only on the next `prove`), so the
event-only guard waits forever whatever its budget.

## The fix

1. Reorder the case: keep the small root files (`package.json`, `tsconfig.json`,
   `src/core/index.ts`, `vite.config.ts`, the `node_modules` link, `tmp/probe/.keep`) before
   construction; construct the `Probe` and await the `arm` race NEXT, over that small tree; THEN
   write `generated/**` and `projects/tsconfig.generated.json`; then run the existing expiry
   assertion unchanged.
2. Before the recovery claim (the `served` prove against `tsconfig.json`), remove the generated
   tree and the generated project file, so the recovery prove's runtime scan is small again. Use
   the scratch helper's own removal mechanism if `tests/setupServer.ts` provides one; otherwise a
   direct `node:fs` removal of the two paths under `scratch.path` is acceptable in this
   server-project test.
3. Rewrite the comment above the arm race (added during diagnosis) to state the actual
   constraint: boot's inspections race the case's 2-second deadline, so the arm wait happens over
   the small tree, and a rejected boot would never emit `arm`. Size the guard for a contended
   spawn-and-initialize — keep a generous value (60_000 is fine) — and leave the case timeout at
   240_000.
4. Touch nothing else in the file, and no other file.

## Validation

- The scoped file run: `npx vitest run --config vite.config.ts --reporter=dot --project src:server tests/src/server/Probe.test.ts` green.
- The exact reproducer, the binding evidence: `npm run test:src` (the three-project invocation
  that failed five times) green. Report its closing counts.
- `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts` and
  `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts` clean;
  `npx tsc --noEmit --project tsconfig.json` clean.

## Scope

**Owned.** `tests/src/server/Probe.test.ts`.
**Off-limits.** Everything else, including `src/**` and `tests/setupServer.ts`.
**Tools.** Read, Grep, Glob, Edit, Bash. No git state changes, no commit.

## Standing conditions

The tree carries the uncommitted 0.0.5 release prep (version bump, mcp ^0.0.23 re-pin) and the
diagnosis-era guard values (150_000 guard, 240_000 timeout) — yours to reshape per the fix, not
to revert wholesale. `tmp/codex/` holds the audit journal; leave it.

## Output

Write `/home/user/orkestrel/probe/tmp/units/f-arm-report.md`: the reordered case's structure, the
diff, and each validation's closing line. Return the same content as your final message.

## Deviation contract

Stop and report — expected, found, exact evidence — if the reorder breaks the expiry assertion
(the resolution no longer exceeds the 2-second deadline once boot is armed first), if the
recovery claim still expires after the tree removal, or if `npm run test:src` stays red. Case
naming and comment wording are yours within the writing rules.

## Acceptance criteria

1. The reordered case lands as specified.
2. `npm run test:src` — the five-times-red reproducer — closes green.
3. The scoped format, lint, and typecheck validations close clean.
