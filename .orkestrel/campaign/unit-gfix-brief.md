# Unit G-fix: program seal honesty (batch audit claim 7 + F8)

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/program`. Ruling record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-batch-reconciliation.md`
claim 7 — read it, plus the reviewer detail in `audit-batch-reviewer-report.md` claim 7 and
finding F8, same folder. You perform the assignment directly and spawn nothing beyond probes
under `tmp/` that you delete after reading. This unit adopts the ruled prescriptions; a
departure stops the unit.

## The findings

1. **Contain the clone-and-seal faults.** `src/core/programs/Program.ts:88` calls
   `structuredClone` before any guard, so a function or symbol in a `Check.value` slot
   escapes as a raw `DataCloneError`, and `#seal`'s `Object.freeze` over a typed array
   throws a raw `TypeError`. Contain each and republish it as the coded `'DEFINITION'`
   `ProgramError` refusal with the original fault attached as the cause, matching the
   class's documented construction failures.
2. **State the seal's ownership limit.** The seal owns the plain-object graph and does not
   own the contents of a `Map`, `Set`, or `Date` reached through `Check.value` — they
   survive the clone mutable. State that on the definition's documentation home
   (`src/core/types.ts` TSDoc for `ProgramDefinition`) and in `guides/program.md` where the
   deep-ownership sentences at `program.md:656-657` currently over-claim; correct the
   `Program.ts:64-65` TSDoc the same way.
3. **Fence both.** A proof that a `Map`-valued check survives construction and its contents
   mutate afterward (the stated limit, pinned with its reason beside the assertion, the way
   `program`'s validators fence their prototype residual); a proof that a function-valued
   check refuses with the coded `'DEFINITION'` error and a cause; a proof that a
   typed-array-valued check refuses the same way rather than throwing raw.

## Scope

- Owned: `src/core/programs/Program.ts`, `src/core/types.ts` (TSDoc only),
  `guides/program.md` (the named passages), `tests/src/core/programs/Program.test.ts`.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.
  The sandbox denies network and grandchild processes.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus your owned files;
   report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the function-valued-check case red against the unfixed constructor (raw
   `DataCloneError` instead of the coded refusal), green after; the typed-array case
   likewise.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0; totals reported.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion including the failing-first pairs; any
deviation. No process diary.

## Deviation contract

Stop on: a prescription that cannot be implemented as ruled; an existing proof the fix
reddens whose intent conflicts with the prescription; a criterion unreachable. Wording within
the fixed content is yours: decide, record, carry on.
