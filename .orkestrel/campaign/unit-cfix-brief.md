# Unit C-fix: contract recognition (batch audit claims 1+3, F1-F3)

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/contract`. Ruling record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-batch-reconciliation.md`
claims 1 and 3 — read it, plus the reviewer detail in `audit-batch-reviewer-report.md`
claims 1/3 and findings F1-F3, same folder. You perform the assignment directly and spawn
nothing beyond probes under `tmp/` that you delete after reading. This unit adopts the ruled
prescriptions; a departure from them stops the unit.

## The findings

1. **Identity brand.** The constructor stamps the brand property with the instance itself;
   `isContractError` requires `descriptor.value === value`. Cross-copy recognition stays
   (the stamp rides the instance, and the `Symbol.for` symbol is registry-global); a
   transparent `Proxy` over a genuine error now answers `false` because the forwarded
   descriptor's value is the target, not the proxy. State the transparent-wrapper refusal in
   the `isContractError` TSDoc.
2. **Pin recognition's intrinsics.** `src/core/errors.ts:80-85` reads
   `Object.getPrototypeOf`, `Object.getOwnPropertyDescriptor`, and `Symbol.for` live per
   call. Route the reads through the package's own `INTRINSICS` captures
   (`src/core/constants.ts`) and a module-scope-captured brand symbol; dissolve the private
   static capture pair at `errors.ts:21-22` into the central table (F2). Add liar-intrinsic
   proofs: with `Object.getOwnPropertyDescriptor` replaced by `() => undefined` a genuine
   error still answers `true`; with it replaced by `() => ({ value: true })` a forgery still
   answers `false`; restore each after.
3. **Brand-deciding controls.** Two controls whose only failing condition is the brand:
   the transparent proxy (answers `false`), and a `ContractError` subclass instance carrying
   the exact `name` and a declared `code` with the brand property deleted (answers `false`).
   Keep every existing control green.
4. **The empty-population sweep.** The `OWNED_STATICS` corpus in `tests/setup.ts` draws from
   an empty risk set after the static removal (reviewer claim 3 names the derivation at
   `tests/setup.ts:757-770`). Replace it with a sweep that names its membership over what
   recognition actually reads, or retire it with the reason recorded in place.
5. **The guide (F1, F3).** `guides/contract.md:1035` describes a "forged-brand" control that
   dies at the prototype gate — make the sentence true of the controls that now exist. In
   the errors section, price the forgeable-stamp residual the way `contract.md:1021` prices
   the record brand: `Symbol.for` is registry-global, so a forger can stamp its own instance
   with its own identity and pass; state that cost and what the brand does buy
   (cross-copy recognition, refusal of accidental lookalikes and transparent wrappers).

## Scope

- Owned: `src/core/errors.ts`, `src/core/constants.ts` (only what the intrinsics routing
  needs), `src/core/types.ts` (TSDoc only, if the contract surface documents recognition
  there), `tests/setup.ts` (the named sweep), `tests/src/core/errors.test.ts`,
  `tests/src/core/integration.test.ts`, `guides/contract.md` (the named passages).
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.
  The sandbox denies network and grandchild processes.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus your owned files;
   report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Failing-first: the proxy control and the brand-stripped-subclass control each red against
   the unfixed predicate (or an equivalent probe recording the old predicate's answer), green
   after; the `() => undefined` liar proof red against the unfixed recognition (a genuine
   error answering `false`), green after.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0; totals reported.
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion including every failing-first pair; any
deviation. No process diary.

## Deviation contract

Stop on: a prescription that cannot be implemented as ruled (report the exact obstacle); an
existing control the fix reddens whose intent conflicts with the prescription; a criterion
unreachable. Wording within the fixed content is yours: decide, record, carry on.
