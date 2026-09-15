# Unit A3-fix — the `AgentProvider` Surface row returns once the guide grammar admits it

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified, taste-free unit. Perform the assignment directly and spawn nothing. You are the sole
writer in `C:\Users\mikes\WebstormProjects\agent` for the life of this unit.

## Objective

With the fixed `@orkestrel/guide` installed, restore the `AgentProvider` Surface row in
`guides/agent.md`, remove the clause-1 sentence that recorded the grammar gap, and leave
`npm run test:guides` green.

## Context

- The agent HEAD is `8dbe522` (A3 committed), tree clean apart from `node_modules`, where the
  Orchestrator installed the packed `@orkestrel/guide` from unit G1 (`--no-save`; the declared
  range `^0.0.18` in `package.json` is untouched). Read
  `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\g1-receipt.md` for the install reading.
- Why: A3 (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a3-report.md`
  § Deviation) removed the `AgentProvider` row because the gate's grammar could not see an
  `export abstract class`; G1 fixed the grammar, so the gate now requires the row again and
  accepts the fence's import.
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (a Summary cell
  equals the export's doc-block description paragraph; the `Shape` cell follows the Classes
  subsection's stated rule), `writing.md`.
- Host: Windows 11, Git Bash. Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
  `restore`, `reset`, `clean`, or `git mv`.

## Items

1. Run `npm run test:guides` first and record its failing names verbatim: expect
   `documents every barrel export` naming `AgentProvider` (the row is missing) and nothing else.
2. In `guides/agent.md` § Surface → Classes, add the `AgentProvider` row in the table's existing
   column form, its `Kind` `class`, its `Shape` cell per the subsection's rule for a class row
   (read how `RelayProvider`'s row is written and match it), and its `Summary` equal to the
   description paragraph of the doc block on `export abstract class AgentProvider` in
   `src/core/AgentProvider.ts`, whitespace-collapsed as `findDrift` compares it.
3. In § Contract, clause 1, remove the sentence recording that an abstract class sits outside the
   parity grammar and that `AgentProvider` carries no Surface row; keep the rest of the clause.
4. Run `npm run test:guides` again and record the passing count; then `npm run format:check`
   and `npm run lint:check`.

## Scope

**Owned.** `guides/agent.md` (the row and the clause-1 sentence only).

**Off-limits.** Everything else, including `src/**`, `tests/**`, `README.md`,
`guides/README.md`, `package.json`, `package-lock.json`, `node_modules/**`.

**Tools and limits.** `npm run test:guides`, `npm run format:check`, `npm run lint:check`;
never `lint`, `format`, `build`, `test`, or a mutating command; never install, commit, or read a
credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-fix-report.md` and
return the same text: the failing names before, the exact row added, the sentence removed, the
green run's counts, `format:check` and `lint:check` exit codes, `Deviation`, and `Status`
(`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the first run fails on anything other than the missing row, or when the row's Summary cannot equal
the source paragraph without a change outside Owned. Decide, record, and carry on from the row's
position in the table.

## Acceptance criteria

1. `npm run test:guides` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0.
3. `grep -c "AgentProvider" guides/agent.md` is greater than before, and the clause-1 sentence
   about the grammar is gone (`grep -n "reflection grammar" guides/agent.md` returns nothing).
