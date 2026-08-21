# Unit E2: the cross-copy brand for `ContractError`

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/contract`. You perform the assignment directly and spawn
nothing: do the work yourself inside this session.

## Objective

Make `isContractError` recognize a `ContractError` across an ESM/CJS copy boundary, the way
`@orkestrel/process` 0.0.4 fixed `isProcessError`, and pin it with a proof.

## Context

Authority, inside this checkout: `AGENTS.md`; `.claude/rules/typescript.md`,
`.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/names.md`,
`.claude/rules/writing.md`. Guide: `guides/contract.md`, granted only for the sentences the
changed recognition semantics oblige. Skill: none.

The defect (recorded in the fleet plan): `ContractError`'s brand is a private field
`readonly #brand = true` (`src/core/errors.ts:47`), tested through the pinned
`ContractError.guard` (`:106-117`, `:138`), and `isContractError` (`:204-206`) delegates to it.
Private fields are per-module, so a second ESM or CJS copy's `isContractError` refuses the
first copy's instances.

The proven pattern to adopt — read it first-hand at
`C:/Users/mikes/WebstormProjects/process/src/core/errors.ts` (read-only, off-limits to edits):
the constructor sets `Object.defineProperty(this, Symbol.for('@orkestrel/process.error'),
{ value: true })` (`:27`); the guard reads that key through `getOwnPropertyDescriptor` and also
requires `isError`, a non-`Error.prototype` prototype, the exact `name`, and a declared `code`
(`:53-65`); the TSDoc remarks state the cross-copy recognition (`:38-42`). Also read process's
own proof of the boundary case in `process/tests/` and mirror its shape where this checkout's
build layout admits it.

Your adoption: the symbol is `Symbol.for('@orkestrel/contract.error')`; the guard's `name`
check is `'ContractError'`; the declared-code check uses this package's own code set. Whether
the `#brand` field and the `guard()` static survive beside the new mechanism is yours to rule
from their call sites — delete what becomes a second recognition mechanism that can disagree
(one concept, one term), keep what a consumer contract still needs, and record the ruling.

## Scope

- Owned: `src/core/errors.ts`, `tests/src/core/errors.test.ts`, and in `guides/contract.md`
  only the recognition-semantics sentences.
- Off-limits: everything else, including `src/core/types.ts` unless a declaration the change
  obliges lives there (if so, stop and report first), `package.json`, and every file in other
  repositories (process is read-only reference).
- Standing condition: the checkout was `npm install`ed on 2026-08-21 and its `node_modules` is
  present; the tree is clean.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`; restore any temporary edit by rewriting
  text and prove with `git diff`. The sandbox denies network and mounts `.git` read-only. Use
  `npx.cmd` — plain `npx` is refused by PowerShell policy here.

## Execution

Perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` lists exactly the owned files.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. Failing-first: a proof that constructs a `ContractError` whose brand crosses a module-copy
   boundary — mirror process's own proof mechanism; where its mechanism needs an artifact this
   sandbox cannot build, simulate the second copy the way process's test does, and if no
   faithful simulation exists STOP and report rather than shipping a proof that cannot fail.
   Record the command red before the fix and green after.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/errors.test.ts`
   — every pre-existing proof passes; report totals.
7. As an observation: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   totals.

## Output

The complete diff; raw output and exit code per criterion including the failing-first pair; the
`#brand`/`guard()` ruling with its call-site evidence; any deviation. No process diary.

## Deviation contract

A conflict with the primary objective — the pattern not transplantable, a criterion unreachable,
a needed declaration outside scope — stops the unit with the report. Message wording, test
naming, and TSDoc phrasing are yours: decide, record, carry on.

## Amendment 1, 2026-08-21, after the first launch stopped

The first run stopped correctly on a standing condition this brief missed: the fleet-wide
`npm install` (run by the Orchestrator on 2026-08-21, after this brief was written) refreshed
`package-lock.json` — the manifest pins `@orkestrel/test` at `^0.0.7` and the old lockfile held
0.0.6, so the install moved the lockfile. That ` M package-lock.json` entry is now a STANDING
condition: expected, off-limits, left exactly as found. Criterion 1 reads: `git status
--porcelain` lists exactly the owned files BEYOND the standing ` M package-lock.json` entry.
Everything else in the brief is unchanged.

## Amendment 2, 2026-08-21, after the second run completed its core

Your core work (errors.ts, errors.test.ts, guides/contract.md) stands in the working tree —
keep it. The removal makes two proofs in `tests/src/core/integration.test.ts` false, and that
file is now OWNED:

- `error recognition > pins the one member on the recognition path against replacement`
  (near `:542`) pins the removed `guard` descriptor. Its SUBJECT is gone. Replace it with a
  proof pinning the new mechanism's equivalent defense: brand installation uses the
  `defineProperty` captured at module evaluation, so replacing `Object.defineProperty` (and
  restoring it in a `finally`) after import affects neither construction nor recognition of an
  error built while it was replaced.
- `no caller-reachable member decides a membership answer > refuses to define its error class
  when its own pin cannot be installed` (near `:1053`) forces the old pin to fail and expects
  class definition to refuse. Rule on it against what the new static block actually defends: if
  the refusal semantics genuinely no longer exist, DELETE the proof and state that the defense
  it pinned was the removed mechanism's, replaced by the captured-define invariant above; if a
  narrower refusal survives in the static block you kept, re-pin that instead. Record the
  ruling either way.
- Sweep the same file for any OTHER assertion naming `guard` or the old `#brand` and treat it
  the same way; report each.

Then re-run: scoped format/lint on the newly owned file; `npx.cmd tsc --noEmit --project
tsconfig.json`; and the full
`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`,
which must now exit 0 — it replaces the old criterion 7 observation as a criterion. Everything
else in the brief and its Amendment 1 stands.
