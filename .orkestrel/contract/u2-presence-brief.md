# Unit u2-presence — compile-time presence bitmask and constant hoists

## Role and engine

`implementer`, Opus 5 (recorded substitution for the dark Sol bench). Native subagent: perform
the assignment directly yourself and spawn nothing.

## Objective

Replace the per-call presence machinery in the compiled object plans of
`/home/user/contract/src/core/ContractCompiler.ts` with the probe-proven compile-time form, in
all four families:

- Guard (`#guardOf`, object case, near lines 877-945): compile-time null-prototype `positions`
  record over the required keys plus a full mask; per call, one pass over the captured `keys`
  ORs `1 << positions[key]` (through `INTRINSICS.own(positions, key)`) and compares against the
  full mask. The current `collectMembers`/`matchesMember` form stays, verbatim, as the branch
  taken when the required-key count is not maskable.
- Parser (object case, near lines 1145-1208, presence at 1162/1170): same mechanism for its
  required-presence decision.
- Auditor (object case, near lines 1422-1490): entry-position mask over declared entries for
  the per-entry presence test, plus HOIST `collectMembers(declaredKeys)` (line ~1444) to plan
  build — it is a compile-time constant rebuilt per call today.
- Reporter (object case, near lines 1676-1745): same entry-position mask, plus hoist the
  `known` set (built per call from entry keys at ~1691-1696 through `admitMember`) to plan
  build as a compile-time set.

## Context

- Read first: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
  `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, then the
  four object-case blocks in `ContractCompiler.ts` and the existing four-door matrix and
  Set-sabotage tests in `/home/user/contract/tests/src/core/compilers.test.ts` (near lines
  4795-4826 and 4989-5127).
- The proven mechanism in built-JS form: `.orkestrel/contract/u2-patch.mjs` (guard) and
  `.orkestrel/contract/u2b-patch.mjs` (auditor) under `/home/user/scaffold/` — read both
  `replacement` templates; your TypeScript implements exactly that mechanism, extended to the
  parser and reporter by the same pattern.
- Probe verdicts backing this unit: parity IDENTICAL over 1170 comparisons; paired A/B medians
  0.838 medium `is`, 0.880 medium `audit`, 0.867 deep `is`, 0.932 deep `audit`
  (`.orkestrel/contract/u2-ab.out`, `u2b-ab.out`).
- Constraint the objective design lane fixed: presence stays decided over the `enumerableKeys`
  snapshot. Never test presence with `Object.hasOwn` on the caller VALUE — a non-enumerable own
  required key must stay absent, or `is` accepts what the parser treats as missing.
- Baseline: the tree is clean at e5b81ae (U1 landed). Node v22.22.2.

## Scope

- Owned: `src/core/ContractCompiler.ts`; `src/core/constants.ts` (one named width bound
  constant, UPPER_SNAKE_CASE, frozen semantics per the constants law — name it yourself within
  `.claude/rules/names.md`); `tests/src/core/compilers.test.ts` (added cases; see acceptance).
- Off-limits: every other file. No tree-wide format/lint runs; validate scoped.
- Do not commit, push, install, or run any git state-discarding command.

## Added tests (name each for what it proves)

1. A declaration whose required key is literally `__proto__` still decides presence correctly
   through all four doors (the positions record is null-prototype own data).
2. A declaration with more required keys than the width bound takes the retained collection
   branch and agrees with a narrow twin through all four doors (drive both branches with
   ordinary values; no test hooks).
3. The existing Set-sabotage and four-door-matrix pins stay green UNMODIFIED.

## Deviation contract

Stop and report when: a source block differs materially from what this brief describes; any
existing test reddens; the mechanism forces an edit outside scope. Ancillary choices (constant
name, local variable names, where the added cases sit) are yours: decide, record, continue.

## Output (your final message)

The exact diff of owned files; commands run with tail lines; decisions recorded, one line each.
No process diary.

## Acceptance criteria (cheap first)

1. `npx tsc --noEmit -p configs/src/tsconfig.core.json` green.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts` green including added cases; then the ContractCompiler test file likewise green.
3. `npx oxfmt --config .oxfmtrc.json --check` and `npx oxlint --config .oxlintrc.json --deny-warnings` green on owned files.
4. Diff confined to owned files.
5. Observation, not a criterion: any timing reading. The deciding parity and A/B runs are the
   Orchestrator's after you exit.
