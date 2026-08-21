# Unit E3: program owns its definition at arrival

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/program`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

The ROADMAP row (B18): read-once ownership at guarded doors — clone → guard → seal → refuse —
so a per-read getter (or a caller retaining its reference) cannot defeat containment. brief
already implements the pattern (`brief/src/core/cloners.ts:39-46` snapshot-then-guard;
`BriefCompiler.#snapshot` clone-then-freeze). program does NOT: `Program` stores the CALLER'S
`definition` object by alias (`src/core/Program.ts:83`, `:89`) after a structural assert, and
every later read re-enters that shared object (`:133`, `:149`), so a caller mutating the
object it passed changes a validated program's behaviour after the fact. Close it.

## Context

Authority: `AGENTS.md`; `.claude/rules/typescript.md` (immutability — never leak mutable
internal references; own caller inputs), `.claude/rules/patterns.md` (declared ecosystem
capabilities — reuse before writing), `.claude/rules/architecture.md`, `.claude/rules/tests.md`,
`.claude/rules/writing.md`. Guide `guides/program.md`, granted only for sentences the changed
ownership semantics oblige.

Capability facts (verified 2026-08-21): `@orkestrel/contract` (a declared dependency) publishes
`cloneJSONRecord` and `cloneJSONValue`; program's own `src/core/helpers.ts` carries
`copyJSONValue` (proven by its tests, including the own-`__proto__` case); no declared
dependency publishes a deep freeze (brief's `freezeDeep` is brief's own and program does not
depend on brief — adding a dependency is forbidden). Verify which clone primitive fits
`ProgramDefinition`'s actual shape (read the type first — if it is JSON-shaped throughout, the
JSON cloners fit; if any member carries a function or class instance, name it and choose the
ownership mechanism that honours it, recording the choice).

The design's shape (verify each step against the source before adopting):

1. At construction, own the definition: clone the caller's value with the fittest declared
   primitive, run the existing `assertProgramDefinition` against the OWNED copy, seal the copy
   (a local exported deep-freeze helper in `src/core/helpers.ts` is acceptable if no declared
   primitive exists — export and test it per the centralization law), and store only the copy.
2. The public `definition` member keeps its declared type; it now returns the sealed owned
   copy. No new member, no getter proliferation.
3. Make-false sweep FIRST: grep `tests/` and `guides/` for assertions that pass a definition
   and then mutate it, assertions on `definition` identity (`toBe` against the passed object),
   and guide sentences describing the storage. Report every hit; a hit outside your grant
   stops the unit before edits.

## Proofs, in `tests/src/core/Program.test.ts` (or the file the sweep names as the right home)

- Failing-first: a caller constructs a program, mutates the object it passed (a rating line's
  value, a notice's text), and the program's behaviour is asserted unchanged — red before the
  fix (the mutation leaks), green after.
- The stored `definition` is deeply frozen: a write attempt on a nested member throws or
  leaves the value unchanged (assert per the host's strict-mode semantics).
- Every pre-existing proof passes.

## Scope

- Owned: `src/core/Program.ts`, `src/core/helpers.ts` (only if the freeze helper lands there),
  `src/core/types.ts` (only if a declaration genuinely needs it — report first),
  `tests/src/core/Program.test.ts`, `tests/src/core/helpers.test.ts` (only for the freeze
  helper's own proofs), `guides/program.md` sentences per the sweep.
- Off-limits: everything else. Standing entries: ` M src/core/helpers.ts` and
  ` M tests/src/core/helpers.test.ts` carry unit M2's landed guards — your edits ride them,
  touch nothing M2 wrote; ` M package.json` may carry a campaign `prepack` line by the time
  you run — if `scripts.prepack` is absent, ADD `"prepack": "npm run build"` beside
  `prepublishOnly` as part of this unit; if present, leave the file.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`. The sandbox denies network. Use `npx.cmd`.

## Acceptance criteria, in this order

1. The make-false sweep report.
2. `git status --porcelain` adds exactly the owned files to the standing entries.
3. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. The failing-first pair recorded.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core`
   exits 0; report totals against the baseline you read first.
7. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The complete diff; the sweep report; raw output and exit code per criterion including the
failing-first pair; the clone-primitive choice with its reason; any deviation. No process
diary.

## Deviation contract

Stop on: `ProgramDefinition` carrying a member no owning mechanism can honour (name it — that
is a design finding); a sweep hit outside the grant; a criterion unreachable. Helper naming,
proof placement, and TSDoc wording are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, after the first launch stopped on a path mismatch

The stop was correct: the class lives in its entity subfolder. Every mention of
`src/core/Program.ts` reads as `src/core/programs/Program.ts`, and the matching test file is
the one under `tests/src/core/` that proves that class (locate it by name and report the
path). The grant is corrected accordingly; everything else in the brief is unchanged. Re-run
from the top.
