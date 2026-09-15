# Unit G1 — `@orkestrel/guide` reflects `export abstract class`

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified, taste-free unit. Perform the assignment directly and spawn nothing. You are the sole
writer in `C:\Users\mikes\WebstormProjects\guide` for the life of this unit.

## Objective

Make the key grammar in `collectKeys` admit an `abstract` modifier on a class head, so a package
exporting `export abstract class Name` sees that class in `surface()` and `exports()` exactly as a
plain class, with a failing test first and the package's own gates green.

## Context

- Defect: `src/core/helpers.ts:2096` reads
  `/^export (?:async )?(function\*?|class|const|interface|type) (\w+)/`, which does not match the
  head `export abstract class AgentProvider<`. In the consuming package `@orkestrel/agent` the
  parity gate therefore reports the class as a missing import in every guide fence and refuses a
  Surface row for it (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a3-report.md`
  § Deviation carries the executed reading).
- The helper's TSDoc (`:2069-2090`) states the owner rule: an owner opens at a column-zero
  `export class` or `export interface` head. An abstract class head opens an owner the same way.
- Existing cases that drive `collectKeys` with `export class` heads: `tests/config.test.ts`
  around `:1008-1030` and `:1096`; the fixture at `tests/setup.ts:111`.
- Guide: `guides/guide.md` names the export heads at `:65`, `:133-134`, and `:572`; read those
  lines and, where a sentence enumerates the head forms the grammar admits, add the abstract
  class to it in the same form; where a sentence states the rule without enumerating, leave it.
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md`, `typescript.md`,
  `documentation.md` (parity: `npm run test:guides` must stay green), `writing.md`.
- Host: Windows 11, Git Bash. The tree is clean at `e2e1314` on `main`. Never `npm install`,
  `git add`, `commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or `git mv`. Never edit a
  vendored file.
- A test is named for what it proves.

## Items

1. **Failing test first.** Beside the existing `collectKeys` cases in `tests/config.test.ts`, add
   one case whose source is
   `['export abstract class Widget<T> {', '\twalk(): void', '}'].join('\n')` (through the same
   `extractSourceLines` path the neighbouring cases use) and which asserts the keys
   `['class Widget', 'Widget.walk']` in order. Run the narrowest command that collects it and
   record the failing count.
2. **The grammar.** Change the head pattern at `src/core/helpers.ts:2096` to
   `/^export (?:async )?(?:abstract )?(function\*?|class|const|interface|type) (\w+)/`. Update
   the TSDoc sentence that names the owner-opening heads so it reads
   "`export class`, `export abstract class`, or `export interface`". Re-run the same command and
   record the passing count.
3. **The guide.** Apply the rule under Context to `guides/guide.md`'s enumerations, if any, and
   keep `npm run test:guides` green.
4. **Read-only gates.** `npm run lint:check`, `npm run check`, `npm run test:src:core` (or the
   project that holds `tests/config.test.ts` — read `vite.config.ts` for its name), and
   `npm run test:guides`.

## Scope

**Owned.** `src/core/helpers.ts` (the pattern and its TSDoc sentence only), `tests/config.test.ts`
(one added case), `guides/guide.md` (the enumerations item 3 names only).

**Shared (report-only).** None.

**Off-limits.** Everything else, including `package.json`, `package-lock.json`, `dist/**`,
`node_modules/**`, configuration, and the vendored set.

**Tools and limits.** The read-only scripts in item 4 and `test:probe` if present; never `lint`,
`format`, `build`, `test`, or a mutating command; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\g1-report.md` and return
the same text: `Touched files` with `git diff --stat`; `Red then green` (the exact command, the
failing count, the passing count); `Guide` (the lines changed, or "none enumerates the forms");
`Scoped validation` (each command and its exit code with counts); `Deviation`; `Status`
(`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the pattern change breaks an existing case, when a guide sentence cannot be amended without
changing a Summary cell, or when a file outside Owned must change. Decide, record, and carry on
from the test's name and placement.

## Acceptance criteria

1. The added case was red and is green under the same command.
2. `npm run lint:check`, `npm run check`, the project run holding the case, and
   `npm run test:guides` exit 0.
3. `grep -n "abstract" src/core/helpers.ts` shows the pattern and the TSDoc sentence.
4. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator
takes the diff, runs the guide package's whole gate chain, and proves the fix in the consumer by
installing the packed tarball into `@orkestrel/agent` and re-running its parity gate.
