# Unit A3-fix-3 — type imports first in every guide fence

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified unit. Perform the assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit.

## Objective

In every `ts` fence of `guides/agent.md` whose `import type` line follows a value import, move the
type import first, keeping each fence mirrored on a titled source `@example` byte-equal to it.

## Context

- The checker's finding: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a3-fix-2-audit-mechanical.md`
  claim 11 — the wire-contract fence (§ Surface → Shapes and contracts, near line 534) and two
  fences near lines 1170 and 1208 (the second is "Observing an agent") place
  `import { … } from '@orkestrel/agent'` before `import type { ProviderInterface } from '@orkestrel/agent'`.
  Re-locate each by text; sweep the whole guide for the pattern and fix every site.
- Parity: a guide fence under a heading that equals a titled `@example` on a source declaration
  must stay byte-equal to it (`.claude/rules/documentation.md`). For each fence you reorder, grep
  `src/core/**` for a matching `@example` title and reorder the source fence identically; if the
  fence has no source twin, the guide alone changes. `tests/guides.test.ts` may carry a presence
  guard quoting a fence line — keep those lines' text unchanged (only their order moves).
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\typescript.md` (import order).
- Host: Windows 11, Git Bash. HEAD is `610a567`, tree clean apart from `node_modules`. Never
  `npm install`, `git add`, `commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or `git mv`.

## Items

1. Sweep `guides/agent.md` for fences where an `import type` line follows a value `import` line;
   list them in the report with their heading.
2. Reorder each so type imports come first, and mirror the reorder on the titled source `@example`
   where one exists.
3. Run `npm run test:guides`, `npm run format:check`, `npm run lint:check`, and `npm run check`.

## Scope

**Owned.** `guides/agent.md` (import lines inside fences only) and the `@example` fences of
`src/core/**` that mirror a reordered guide fence (import lines only).

**Off-limits.** Everything else.

**Tools and limits.** The read-only scripts in item 3; never `lint`, `format`, `build`, `test`,
or a mutating command; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-fix-3-report.md` and
return the same text: the fences found (heading and line), the source twins reordered, the gate
commands with counts, `Deviation`, and `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report when a reorder would break a presence guard or a parity pair you cannot keep
equal inside Owned. Decide, record, and carry on from anything else.

## Acceptance criteria

1. No `ts` fence in `guides/agent.md` places a value import before an `import type` line.
2. `npm run test:guides` exits 0 at its prior count (43); `format:check`, `lint:check`, `check`
   exit 0.
