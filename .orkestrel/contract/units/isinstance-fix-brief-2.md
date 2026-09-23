# Unit ISINSTANCE-FIX — successor brief 2: the audit's findings

This brief supersedes `isinstance-fix-brief.md` for the unit's second round, run on the same uncommitted tree in the same checkout. What changed and why: the audit (`units/isinstance-fix-audit-verdict.md`, reconciling the objective lane held by Opus 5.5, the subjective lane on Astra, and the checker) broke the internal comment's stated reason and two remark sentences and asked for proofs that pin the constraint; the Orchestrator's settling probes are in that verdict. Every ruling is an edit here.

## Role and engine

`sol` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/contract` from this file. The executor that opens this brief is the Astra engine inside its CLI: the sole writer in that checkout (`main` at `743e4a3`, the round-1 edits uncommitted in `src/core/validators.ts`, `tests/src/core/validators.test.ts`, and `tests/src/core/combinators.test.ts`).

## Objective

Make every sentence of `isInstance`'s comment and remark true of the compiler and the runtime, and pin the constraint with proofs, with every round-1 acceptance command green again.

## Context

**Evidence.** `units/isinstance-fix-audit-verdict.md` (every ruling and the Orchestrator's two settling probes), `units/isinstance-fix-audit-reviewer-verdict.md` (claims 1 and 3, O1 with the exact assertions), `units/isinstance-fix-audit-analyst-verdict.md` (claim 1's structural-subclass counterexample), `units/contract-isinstance-probe-structural.ts` (the four false-branch readings against the built declaration: a structurally identical subclass's false branch is `null`, a subclass adding a member keeps `Base | null`, `Function` keeps `string`, `Object` gives `never`).

**Law, host, and standing conditions.** As in `isinstance-fix-brief.md`. `package.json` stays off-limits: the bump is the release step.

## The edits

- **G1 (claim 1, the comment).** Replace the internal comment above the body with the runtime reason: the `isFunction` check keeps a non-callable right-hand side answering `false` without consulting its own `Symbol.hasInstance` and without a contained `TypeError`, which is the published behaviour; the body stays verbatim.
- **G2 (claims 1 and 3, the remark).** In the `@remarks`: replace "the false branch keeps the declared type" with the qualified sentence: the false branch drops each member of the declared union that is assignable to the instance type and keeps the rest, so a subclass that adds no member narrows its base out as well; replace the `Object`-and-`Function` sentence with one naming `Object` alone ("a constructor whose instance type admits primitives structurally, such as `Object`, makes the false branch unsound; use `isObject` for that check"); separate the two `Function` facts (a value typed `Function` cannot be passed, because the `Function` interface has no construct signature; the constructor `Function` can, through `FunctionConstructor`'s construct signature, and narrows to `Function`).
- **G3 (O1, the proofs).** In the `isInstance narrowing` cases of `tests/src/core/validators.test.ts`, add: `Expect<Equal<Parameters<typeof isInstance>[1], Parameters<typeof instanceOf>[0]>>` (import `instanceOf` from the combinators module and the `AnyConstructor` type); `Expect<Equal<AnyConstructor extends Parameters<typeof isInstance>[1] ? true : false, false>>`; `Expect<Equal<Function extends Parameters<typeof isInstance>[1] ? true : false, false>>`; and the qualified false-branch proof: with `class Base { readonly base = true }` and `class Same extends Base {}`, `value: Base | null` narrows to `Same` in the true branch and to `null` in the false branch (`expectTypeOf(value).toEqualTypeOf<null>()`), beside the existing `Derived` case that keeps `Base | null`. Each new compile-time assertion sits in a case with a runtime assertion. Measure the red reading first: with the round-1 signature's constraint changed to `=> unknown` in a scratch copy, the three constraint assertions must fail `npm run check` (record the diagnostics), then restore the constraint and record the green reading.
- **G4 (parity).** The guide row's Summary still equals the description paragraph (unchanged); `npm run test:guides` proves it.

## Unknowns

1. Whether `Parameters<typeof instanceOf>[0]` and `Parameters<typeof isInstance>[1]` compare equal under `Equal` as written (both `abstract new (...args: never) => object`, the type parameters erased to their constraints): measure and, where the erasure differs, assert each against the literal constraint type instead, and report.

## Scope

**Owned.** `src/core/validators.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/combinators.test.ts`. **Off-limits.** Every other file, `package.json`, `package-lock.json`, `README.md`, `guides/contract.md`, and the vendored files. **Tools and limits.** As in `isinstance-fix-brief.md`.

## Execution

**The Astra engine inside its CLI:** perform the assignment directly and spawn nothing; write only under the checkout and the system temporary directory.

## Output

Your final message is the report (captured from the exec's last-message file): per edit G1 to G4, what changed; the exact new comment and remark; the G3 red reading (the diagnostics under the `=> unknown` constraint) and the green reading; the Unknown's answer; the output of every acceptance command verbatim; `git status --short` and `git diff --stat`. No process diary.

## Deviation contract

As in `isinstance-fix-brief.md`. Ancillary choices you settle yourself: the sentences' exact wording beyond the facts fixed here, the proof case titles. Stop and report when a proof cannot be expressed without `@ts-expect-error` (banned) or when a sentence this brief fixes contradicts a compiler reading you take.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` and `npx oxfmt --config .oxfmtrc.json --check` over the three owned files exit 0.
3. `npm run test:src` passes every test.
4. `npm run test:guides` exits 0.
5. `npm run build:src:core` exits 0 and `dist/src/core/index.d.ts` declares `isInstance` with the round-1 signature (quote the line).
6. The G3 red reading names the three constraint assertions as the failing lines under the `=> unknown` constraint.

## Review evidence

The actual diff and `git status --short`, captured by the Orchestrator as `isinstance-fix-2.diff` and `isinstance-fix-2-status.txt`, and the report.
