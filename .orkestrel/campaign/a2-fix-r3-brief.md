# Unit A2-fix-r3 — one prose precision and three hygiene items from audit round A2-fix-R2

The Orchestrator fills § Measurements at dispatch, after unit A3-fix-2 commits.

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified unit. Perform the assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit.

## Objective

Close the analyst's claim-1 prose finding and the three hygiene items of claim 10 in
`a2-fix-r2-audit-objective.md`, exactly as specified, with the core and guide gates green.

## Context

- Record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a2-fix-r2-audit-objective.md`
  (claims 1 and 10) and `design-reconciliation.md` § "Audit round A2-fix-R2".
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` (§ Writing: never a count);
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md` (shared fixtures live in the
  setup module), `typescript.md` (import order: type imports before value imports),
  `documentation.md` (a titled `@example` equals the guide fence under its heading), `writing.md`.
- Host: Windows 11, Git Bash. `node_modules` holds the packed `@orkestrel/guide` from `9863e77`.
  Never `npm install`, `git add`, `commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or
  `git mv`.
- Measurements: the agent HEAD is `057871c` (A3-fix-2 committed 2026-09-14), tree clean apart
  from `node_modules`. Host gates at that commit (`../scaffold/.orkestrel/campaign/a3-fix-2-gates.log.txt`):
  `format:check`, `lint:check`, `check`, `build` exit 0; `test:src:core` 23 files / 753 tests;
  `test:setup` 54 tests; `test:guides` 43 tests. A3-fix-2 split the relay example into two titled
  halves (`createRelay`'s is "Mounting the relay on your server", `createRelayProvider`'s is
  "Reaching the relay from the browser") and rewrote the guide's relay paragraph and wire-shapes
  clause; re-locate each site P1 and P3 name by its text, and where a sentence P1 names no longer
  exists, say so and change only what remains.

## Items

**P1 — the serializer sentence, precise.** Wherever the class remarks of `RelayProvider`
(`src/core/providers/RelayProvider.ts`) and the guide (`guides/agent.md`, the relay paragraph in
§ Surface → The relay and the wire-shapes clause) say that a custom serializer is ignored or that
`body` refuses no serializer, restate the rule as: the wire body is an owned snapshot of the
projection read through property descriptors, so a serializer reachable only through a `get` trap
or a prototype is never consulted; an own function-valued property such as a `toJSON` method is a
value outside JSON and is refused before fetching, with the clone's failure as the refusal's
`cause`. Keep the Summary cells equal to the description paragraphs (`test:guides`).

**P2 — the shared fixture in the setup module.** Move the `RELAY_RESULT_FRAME` constant declared
in `tests/src/core/providers/RelayProvider.test.ts` into `tests/setup.ts` beside the other relay
fixtures, exported with a one-sentence doc block, and import it in the test file.

**P3 — the type import first.** In `createRelay`'s `@example` fence (`src/core/factories.ts`)
and its mirror in `guides/agent.md` under the same heading, and in any other fence A3-fix-2 or
A2-fix-r2 gave an `import type` line, place the `import type` line before the value imports;
keep the source fence and the guide fence byte-equal.

**P4 — no count phrase.** Already closed by A3-fix-2, which rewrote both `@remarks` sentences when
it split the relay example ("its example is the server half this one pairs with"; "the browser
half of that pair"). Verify with `grep -n "composes the two" src/core` returning nothing, and
change nothing for this item.

## Scope

**Owned.** `src/core/providers/RelayProvider.ts` (doc blocks only), `src/core/factories.ts` (doc
blocks only), `guides/agent.md` (the sentences and fences P1 and P3 name only), `tests/setup.ts`
(the moved fixture only), `tests/src/core/providers/RelayProvider.test.ts` (the import only).

**Off-limits.** Everything else, including every other `src/**` and `tests/**` file,
`tests/guides.test.ts`, `README.md`, `guides/README.md`, `package.json`, `package-lock.json`,
`node_modules/**`.

**Tools and limits.** `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run test:src:core`, `npm run test:guides` (read-only); never `lint`, `format`, `build`,
`test`, or a mutating command; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a2-fix-r3-report.md` and
return the same text: `Touched files` with `git diff --stat`; per item, the exact change; the
gate commands with counts; `Deviation`; `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
an item needs a file outside Owned or when a Summary cell cannot equal its paragraph after P1.
Decide, record, and carry on from wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:core` and `npm run test:guides` exit 0 at their prior counts.
3. `grep -n "RELAY_RESULT_FRAME" tests/src/core/providers/RelayProvider.test.ts` shows only the
   import; `grep -n "composes the two" src/core` returns nothing; every fence's `import type`
   line precedes its value imports.
4. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.
