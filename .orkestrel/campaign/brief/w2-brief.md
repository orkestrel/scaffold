# Unit W2 — brief INTERPRETATION_MEMBERS

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Move the `Interpretation` member-name literal into `src/core/constants.ts` as
`INTERPRETATION_MEMBERS`, pin its completeness at compile time, and land its parity, in
`/home/user/orkestrel/brief`.

## Context

**Evidence.** The literal: `src/core/BriefCompiler.ts:284-299` inside `#read` — members `text`,
`normalized`, `intent`, `entities`, `subject`, `definition`, `mappings`, `ambiguities`,
`prompt`, `stages`, `failures`, `complete`, `confidence`, `digest`. Consumers: `#own(...,
members)` at `:304` and `captureValue(live, members)` at `:327`. `Interpretation` lives in
`@orkestrel/interpret` at its `src/core/types.ts:280-295` (installed declaration under
`node_modules/@orkestrel/interpret`). `src/core/constants.ts:4-88` currently exports
`TASK_OPERATIONS`, `TASK_DOMAINS`, `OUTPUT_FORMATS`, `RISK_SEVERITIES`, `DEFAULT_BRIEF_TURNS`,
`GATE_ID`, `LINE_BREAK_PATTERN`, `SINGLE_LINE_PATTERN`, `BLANK_PATTERN`.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`,
`documentation.md`, `writing.md`, `quality.md` § Instruments. Skill: `orkestrel-harden-package`
(implementation-unit phases). Guide: `guides/brief.md`.

**The ruling to implement (fixed).** Declaration in `src/core/constants.ts`:

```ts
export const INTERPRETATION_MEMBERS = Object.freeze([
	/* the members, in the literal's order */
] satisfies readonly (keyof Interpretation)[])
```

Compile-time completeness pin, placed beside the consumer's capture case in
`tests/src/core/BriefCompiler.test.ts`:

```ts
expectTypeOf<(typeof INTERPRETATION_MEMBERS)[number]>().toEqualTypeOf<keyof Interpretation>()
```

Both `BriefCompiler` call sites import and use the constant; the method-local literal is gone.
The constant's TSDoc carries no count (the sibling entries' counted openings are recorded
elsewhere — do not copy them, do not fix them). Guide row and runnable example in
`guides/brief.md`; `tests/guides.test.ts` parity covers the new export through the existing
mechanism.

**Host.** POSIX bash at `/home/user/orkestrel/brief`; full local access; the `prove` tool of the
`probe` MCP server is armed through this workspace's `probe` project.

**Measurements.** `npm run test:src:core` green at HEAD.

**Control identifiers.** The completeness pin's negative control: a copy of the constant missing
one member must fail the core typecheck. A test is named for what it proves, never for this
control.

**Standing conditions.** none.

## Unknowns

Whether `expectTypeOf` needs the `satisfies` element type to stay narrow through `Object.freeze`
— the `prove` receipt settles it before you rely on the shape; report the receipt line verbatim.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/BriefCompiler.ts`, `guides/brief.md`,
`tests/src/core/BriefCompiler.test.ts`, `tests/guides.test.ts` (only where parity requires a
transcription row).

**Shared (report-only).** none.

**Off-limits.** `src/core/types.ts`, `package.json`, everything else.

**What asserts the state this change ends.** `tests/guides.test.ts` parity (new export must be
documented); `tests/src/core/BriefCompiler.test.ts` capture cases. Both owned.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash scoped: `npx tsc --noEmit -p
configs/src/tsconfig.core.json`, scoped lint, `npm run test:src:core`, `npm run test:guides`,
and the `prove` tool. No tree-wide mutating commands, no git state changes, no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/orkestrel/brief/tmp/units/w2-report.md`: the declaration as landed, the
`prove` receipt line verbatim, the consumer diff summary, the guide row, and the validation
results. Return the same content as your final message.

## Deviation contract

Stop and report if the `satisfies` shape cannot keep the element type narrow enough for the
equality pin (the `prove` run refusing is the evidence). Wording and example content are yours.

## Acceptance criteria

1. `npx tsc --noEmit -p configs/src/tsconfig.core.json` green.
2. The `prove` receipt earned for the completeness claim (case: the constant as declared plus
   the equality pin compiles; control: the same with one member removed fails at the type
   stage). Quote the closing line.
3. `npm run test:src:core` green; `npm run test:guides` green.
4. The literal is gone from `BriefCompiler.ts` and both call sites take the constant.

**Observations, not criteria.** The whole-suite `npm test` is the Orchestrator's run after you
exit.

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
