# Unit u5-union — anyOf diagnostic short-circuit with its behavior ruling

## Role and engine

`implementer`, Opus 5 — this unit is natively subjective-lane work: it carries a behavior
ruling into the guide and a new pin beside the mechanism. Native subagent: perform the
assignment directly yourself and spawn nothing.

## Objective

Implement, in `/home/user/contract/src/core/ContractCompiler.ts`, the probe-proven anyOf
short-circuit in the union plans of `#auditOf` (near lines 1501-1525) and `#reportOf` (near
lines 1748-1790): when the union is not exclusive, return the empty report at the FIRST clean
variant, before running later variant plans. `oneOf` keeps its full tally in both families,
untouched.

## The ruling this unit ships (code, guide, and pin together)

The observable change: on an earlier variant's acceptance, a later variant's plan no longer
runs, so a coded refusal that later variant would have raised (an object variant's prototype
probe under a hostile prototype) is no longer reached. The ruling adopted by the design round:
union diagnostic acceptance is decided by the first clean variant in declaration order, the
same way the compiled guard and parser already stop at the first accepting variant — the
diagnostic families join the family consensus rather than keeping a stricter side effect
nothing pins or documents.

- Guide: update the union sentences for `compileAuditor` and `compileReporter` in
  `/home/user/contract/guides/contract.md` (the anyOf acceptance sentence and the
  `compileReporter` mirror) to state first-clean-variant acceptance in declaration order.
  State the rule; no nanosecond figures.
- Pin (new test in `/home/user/contract/tests/src/core/compilers.test.ts`): an anyOf union
  whose FIRST variant accepts a value while its SECOND variant is an object variant that would
  raise a coded refusal on that value's hostile prototype — `audit` and `explain` return `[]`.
  Beside it, the preserved refusal: when NO variant is clean, the same hostile value still
  produces the union's documented report (or the coded refusal, whichever the current code
  produces — pin what shipped behavior does on the no-clean path, unchanged).

## Context

- Read first: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
  `.claude/rules/documentation.md`, `.claude/rules/tests.md`; then both union plans and the
  existing union tests near `tests/src/core/compilers.test.ts:3358-3376` and `:3909-3944`, and
  the guide's union diagnostic rows.
- Proven mechanism in built-JS form: `/home/user/scaffold/.orkestrel/contract/u5-patch.mjs`.
- Probe verdicts: P1 preview count 100 per 100 valid deep audits (the losing variant's built
  and discarded report); marginal A/B 0.857 deep audit with flat union-free controls; parity
  IDENTICAL (`u5-ab.out`, `p1-p2-p3-p5.out`).
- The four-door agreement invariant (`audit(v).length === 0` iff `is(v)` for readable stable
  values) is UNCHANGED by this mechanism: the guard already stops at the first accepting
  variant.

## Scope

- Owned: `src/core/ContractCompiler.ts` (the two union plans),
  `tests/src/core/compilers.test.ts` (the new pins), `guides/contract.md` (the union
  sentences). Off-limits: everything else; every existing test stays green unmodified.
- No tree-wide format/lint. No commit, push, install, git-state commands.

## Deviation contract

Stop and report when: a union plan differs materially; any existing test reddens; the guide
sentence cannot state the ruling truthfully. Ancillary choices are yours: decide, record,
continue.

## Output

Exact diff; commands with tails; recorded decisions. No process diary.

## Acceptance criteria (cheap first)

1. Scoped typecheck green.
2. `tests/src/core/compilers.test.ts` green including both new pins; ContractCompiler suite
   green unmodified.
3. `npm run test:guides` green.
4. oxfmt and oxlint clean on owned files; diff confined to owned files.
5. Observation, not a criterion: timing. The Orchestrator re-runs parity and A/B after exit.
