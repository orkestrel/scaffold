# Unit M2: guard the foreign validation results program dereferences

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/program`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

`validateProgramDefinition` (`src/core/helpers.ts:566-568`, `:591-593`, `:609-611`) spreads
`.errors` and `.warnings` off values returned by foreign engines (`qualifier.validate(...)`,
`engine.validate(...)`) without guarding them. Route those dereferences through the published
guards so a misbehaving engine produces a clean validation error instead of a crash.

## Context

Authority, inside this checkout: `AGENTS.md`; `.claude/rules/patterns.md` § Foreign contracts
(validate what you dereference; enforce the published contract and no more),
`.claude/rules/typescript.md`, `.claude/rules/tests.md`, `.claude/rules/names.md`,
`.claude/rules/writing.md`. Guide: `guides/program.md` read-only.

The published guards: `isQualificationValidationResult` from `@orkestrel/qualifier`
(`qualifier/src/core/validators.ts:162-163` aliases reason's guard) and
`isReasonValidationResult` from `@orkestrel/reason`. Program already imports from both packages
(`findRule`/`logicalPremises` from qualifier; `findDuplicates`/`formatField` from reason), so no
dependency is added. `Program.ts` already guards `qualify` with `isQualificationResult`
(`src/core/Program.ts:19`, `:150`) — follow that precedent's shape.

Design latitude, recorded in your report: when a foreign result fails its guard, the function
reports it as a validation ERROR entry naming which engine returned an off-contract value (the
function's contract is returning `{ errors, warnings }`, so a throw would change its shape for
a fault the caller cannot prevent). If you find that contract reading wrong against the
declared types, stop and report instead of choosing silently.

## Scope

- Owned: `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`.
- Off-limits: everything else, including `src/core/types.ts`, `src/core/Program.ts`,
  `guides/**`, `package.json`.
- The checkout is clean.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`; restore any temporary edit by rewriting
  text and prove with `git diff`. Your sandbox denies network and mounts `.git` read-only.

## Execution

Perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` lists exactly the owned files.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check src/core/helpers.ts tests/src/core/helpers.test.ts`
   exits 0 (use `npx.cmd`; plain `npx` is refused by PowerShell policy on this host).
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts tests/src/core/helpers.test.ts`
   exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first: a new test drives `validateProgramDefinition` with a minimal scripted engine
   whose `validate` returns an off-contract value (a boundary stub implementing the real
   interface minimally — sanctioned; never a mock of program-owned behaviour). Record the
   command and its failure BEFORE the fix (the current code crashes or misbehaves), then the
   same command green after.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/helpers.test.ts`
   — every pre-existing proof passes; report totals.

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair;
the design-latitude decision with its reason; any deviation. No process diary.

## Deviation contract

A conflict with the primary objective — the guards not importable, the contract reading wrong,
a criterion needing an off-limits file — stops the unit with the report. Message wording and
test naming are yours.
