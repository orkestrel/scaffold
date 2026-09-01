# Unit scout-hotpath (S1) — where the per-call nanoseconds go in contract's compiled families

## Role and engine

Cursor Grok (`cursor-grok-4.6-high`), read-only repository scouting lane. You are the bench
engine reading this brief inside your own CLI: perform the assignment directly yourself and
spawn nothing.

## Objective

Map, with `file:line` pointers, the per-call execution structure of the compiled artifacts in
`/home/user/contract/src/core/` — what runs on EVERY `is`/`parse`/`audit`/`explain`/`generate`
call after compilation — so a designer can attribute the measured per-call cost. Evidence only;
no decisions, no edits.

## Context

- Measured baseline (2026-09-01, node v22.22.2, medium = flat object of a handful of leaves,
  deep = nested object with a union and arrays): `is` 2327/7611 ns per op (medium/deep),
  `parse` 2623/7677, `audit` 4874/21269, `explain` 4302/14798, `generate` 5481/18003. The
  designer's hypothesis to check against the source — NOT to confirm, to attribute: per-call
  overhead (dispatch indirection, per-call allocation, intrinsic-call layers) dominates over
  the raw data walk.
- The compile-time paths (constructor, `#build*`, working-set release) are already mapped from
  the prior campaign; do not re-map them. Your subject is what a COMPILED artifact executes per
  call.
- Read the source tree at `/home/user/contract/src/core/` (files such as
  `ContractCompiler.ts`, `compilers.ts`, `validators.ts`, `combinators.ts`, `parsers.ts`,
  `helpers.ts`, `constants.ts`, `cloners.ts`, `inferers.ts`). Read at depth; that is this
  lane's job.

## Questions (bounded)

1. For a compiled guard (`is`): trace one call on a valid flat object value from the returned
   function inward — every function boundary crossed, every `INTRINSICS.*` / `Reflect.*`
   indirection, every allocation (arrays, objects, closures, iterators, spreads), every
   `WeakMap`/`Map` read or write, per call. Name each with `file:line`.
2. Same for the compiled parser on a valid value: what it allocates per call (result objects,
   owned copies, cloner work) and where coercion branches.
3. Same for `audit` and `explain` on a small value: fault-array construction, path tracking,
   per-node bookkeeping — what allocates and what indirects per call.
4. Same for `generate`: randomness plumbing, per-node seed dispatch, allocation.
5. Cross-cutting: `#trackGuard`/`#trackFaults` per-call memo behavior (WeakMap allocation per
   call?), the `contain`/`attempt` wrapper cost on entry points, the `INTRINSICS` table (what it
   wraps, which wrapped calls sit on per-call paths vs compile-time paths), and any per-call
   `try`/`catch`, `Object.freeze`, or property-definition work.
6. Note every site where a value crosses a `Reflect.apply(fn, undefined, args)` boundary on the
   per-call path, and every place a fresh closure or array is created per CALL (not per compile).

## Scope and containment

Read-only. `/home/user/contract/src/core/` and `/home/user/contract/tests/` only (tests only to
confirm observable pins). No writes, no installs, no credential reads. Distill — no raw dumps;
quote at most a line or two per pointer.

## Output (exact shape)

`Question` / `Evidence` (numbered per-call traces with `file:line`) / `Distillate` (a per-family
cost attribution table: boundary crossings, allocations per call, intrinsic indirections per
call) / `Unknowns` / `Deviation`.
