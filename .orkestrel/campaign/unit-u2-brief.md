# Unit U2: Channel's stale comment and missing example

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/agent`. You perform the assignment directly and spawn nothing.

## Objective

Two corrections the canon ruling left in agent, from design round 3 (S2):

1. `tests/src/core/Channel.test.ts:5-7` claims `Channel` is "MODULE-INTERNAL … (not
   barrel-exported)" and relatively imported, while line 2 imports it from `@src/core` and the
   barrel exports it. Rewrite the comment to state what the tests actually pin — the
   write/read decoupling and the lost-wakeup case — asserting nothing about barrel membership
   or import paths.
2. `src/core/Channel.ts` is the one barrelled class under `src/core` with no `@example` in its
   TSDoc, and the barrel rule binds a row to a runnable example. Add one: construct a
   `Channel`, push a value, close it, and drain it with `for await`, importing from
   `@orkestrel/agent` (published specifier, per the guide-example law). Mirror the `@example`
   idiom of a sibling such as `src/core/Conversation.ts`.

## Context

Authority in this checkout: `AGENTS.md`, `.claude/rules/typescript.md` (TSDoc shape),
`.claude/rules/documentation.md` (guide examples import the published specifier),
`.claude/rules/writing.md`. Read `src/core/Channel.ts` fully first; the example must match the
class's real API.

## Scope

- Owned: `src/core/Channel.ts` (TSDoc only — no code change), `tests/src/core/Channel.test.ts`
  (the header comment only — no assertion change).
- Off-limits: everything else. The checkout is clean.
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` lists exactly the owned files.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0 (no behaviour change), and
   `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The diff; raw output and exit code per criterion. No process diary.

## Deviation contract

Stop if the guides project reds on your example (that is a parity-shape finding). Comment
wording is yours.
