# Unit ISINSTANCE-FIX — successor brief 3: the round-2 audit's findings

This brief supersedes `isinstance-fix-brief-2.md` for the unit's third round, run on the same uncommitted tree in the same checkout. What changed and why: the round-2 audit (`units/isinstance-fix-audit-2-verdict.md`) confirmed the comment, the proofs, and the scope, broke one word of the remark (the compiler drops a union member by subtype, not by assignability; the Orchestrator's probe `contract-isinstance-probe-subtype.ts` confirms it), and adopted three bounds. Every ruling is an edit here.

## Role and engine

`sol` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox workspace-write -C C:/Users/mikes/WebstormProjects/contract` from this file. The executor that opens this brief is the Astra engine inside its CLI: the sole writer in that checkout (`main` at `743e4a3`, the round-1 and round-2 edits uncommitted).

## Objective

Make the remark's false-branch sentence exact, land the three wording bounds, and keep every gate green.

## Context

**Evidence.** `units/isinstance-fix-audit-2-verdict.md`, `units/isinstance-fix-audit-2-reviewer-verdict.md` (claim 2's derivation from the checker's narrowing code and its counterexample; the bounds), `units/contract-isinstance-probe-subtype.ts` (the probe: `Tagged extends Base { readonly tag?: string }`, the false branch keeps `Base | null`).

**Law, host, and standing conditions.** As in `isinstance-fix-brief.md`. `package.json` stays off-limits.

## The edits

- **H1 (claim 2).** In the `@remarks`, the false-branch sentence says the false branch drops each member of the declared union that is a subtype of the instance type and keeps the rest, so a subclass that adds no member narrows its base out as well (and a subclass that adds only an optional member does not).
- **H2 (bounds).** In the internal comment, "its own `Symbol.hasInstance`" becomes "its `Symbol.hasInstance`"; in the remark, "returning an object" becomes "returning an object (or `any`)"; in `tests/src/core/validators.test.ts`, import `instanceOf` from the `@src/core` barrel beside the file's other combinator imports, dropping the relative path.
- **H3 (the proof of H1).** Add, beside the `Same` case, the optional-member case: `class Tagged extends Base { readonly tag?: string }` with the assignability control (`const assignable: Tagged = new Base()`) and the false-branch assertion `expectTypeOf(value).toEqualTypeOf<Base | null>()` in the false branch of `isInstance(value, Tagged)` over `value: Base | null`, with a runtime assertion beside it.

## Scope, execution, tools, and limits

As in `isinstance-fix-brief-2.md`.

## Output

Your final message is the report: per edit H1 to H3, what changed; the exact new sentences; the output of `npm run check`, the scoped oxlint and oxfmt checks over the three owned files, `npm run test:src`, `npm run test:guides`, and `npm run build:src:core` verbatim; `git status --short` and `git diff --stat`. No process diary.

## Acceptance criteria

1. `npm run check` exits 0. 2. The scoped oxlint and oxfmt checks exit 0. 3. `npm run test:src` passes every test. 4. `npm run test:guides` exits 0. 5. `npm run build:src:core` exits 0 and the emitted declaration is unchanged from round 1. 6. `grep -n "assignable to the instance type\|its own \`Symbol.hasInstance\`\|combinators.js'" src/core/validators.ts tests/src/core/validators.test.ts` returns no hit.

## Review evidence

The actual diff and `git status --short`, captured by the Orchestrator as `isinstance-fix-3.diff` and `isinstance-fix-3-status.txt`, and the report.
