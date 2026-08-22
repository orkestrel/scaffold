# Unit scratch-paths: write and link answer the contained path

## Role and engine

Role `implementer`, engine **Claude Opus 5**, in the main checkout at
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn
nothing beyond the suites you run. Read before editing: `AGENTS.md`, `.claude/rules/`
`typescript.md`, `names.md`, `tests.md`, `documentation.md`, and the scratch section of
the package's guide.

## The ruling this unit lands

The scaffold repository's `createWorkspace` wrapper over `createScratch` is being
dissolved fleet-wide, and its one genuine improvement moves upstream: `write` and
`link` return the resolved absolute contained path, the way `ensure` already does. The
Orchestrator verified the seam 2026-08-22: `ScratchInterface.write` and `link` return
`void` (`src/server/types.ts:15` and the `link` row) while `ensure` returns the
absolute path, and the implementation already computes the resolved path — `write`
holds it as `candidate` (`src/server/factories.ts:69-77`) and discards it. The
wrapper's other delta — fusing `requireValue` into `read` so absence throws — is ruled
NOT adopted: `read` answering `undefined` is the absence law, and
`requireValue(scratch.read(...))` is the supported composition. Record that ruling in
the report; change nothing about `read`.

## The change

- `ScratchInterface.write(target, text): string` — returns the absolute path of the
  written file. TSDoc gains the return line; the throws and containment prose stand.
- `ScratchInterface.link(target, source): string` — returns the absolute path of the
  created link, whatever host mechanism produced it. Same treatment.
- The implementation returns the `candidate` each member already resolves. No other
  member changes; `read`, `has`, `names`, `ensure`, `remove`, `destroy` stand.
- The return-type move from `void` to `string` is additive for every existing
  consumer; no consumer updates exist in this unit's scope.

## Failing-first requirement

Add the rows before the implementation change, and record the red run: for `write`, a
nested relative target and an absolute contained target each assert the returned value
equals the resolved absolute path of the file the row then reads back; for `link`, the
returned value equals the resolved absolute path at which `has` then finds the link.
Against the current `void` members the assertions fail on `undefined`; record the exact
command and counts, land the change, record the same command green.

## Scope

- Owned: `src/server/types.ts` (the two member rows), `src/server/factories.ts`, the
  scratch rows of the package guide (locate it; update the member table and any prose
  the return change touches), `tests/src/server/factories.test.ts` or wherever the
  scratch suite actually lives (locate first, report the path), and `tests/guides.test.ts`
  only if a `toContain` string pins a sentence the change rewrites — check and report.
- Standing and off-limits: the staged deletion `.orkestrel/test/wait-for-condition-plan.md`
  and everything else `git status --porcelain` lists at your start; every file not named.
- No commits, no installs, no mutating git commands, no tree-wide format or lint fix.
- Host facts: Windows 11; the `npm` PowerShell shim is blocked — `npm.cmd` / `npx.cmd`
  from the repository root.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus owned files;
   report before and after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` over the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. The failing-first pair recorded with exact commands and counts.
5. The scratch suite's project and the guides project each exit 0 under the package's
   own scoped scripts; totals reported.

## Output

The complete diff, the red-then-green record, per-criterion exit codes and totals, the
suite-location and guide-pin check results, the recorded not-adopted ruling on `read`,
and any deviation (expected, found, exact evidence, done or not done, at most one short
hypothesis). No process diary.

## Deviation contract

Stop on: the scratch members living somewhere this brief's line pointers contradict; a
consumer inside this repository that the return change breaks; a criterion unreachable;
an off-limits file needing an edit. TSDoc wording within the rules and the test rows'
exact shapes are yours: decide, record, carry on.
