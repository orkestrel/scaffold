# Unit O2-fix — three test-infrastructure findings of audit round O2-R1

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified, taste-free unit. Perform the assignment directly and spawn nothing. You are the sole
writer in `C:\Users\mikes\WebstormProjects\ollama` for the life of this unit.

## Objective

Close findings F3, F4, and F5 of `o2-audit-subjective.md` in the ollama test infrastructure,
exactly as specified, with the core and setup suites green.

## Context

- Record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o2-audit-subjective.md`
  § Findings F3, F4, F5 (read them; they name the lines).
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md`, `names.md`, `typescript.md`.
- Host: Windows 11, Git Bash. Never `npm install`, `git add`, `commit`, `stash`, `checkout`,
  `restore`, `reset`, `clean`, or `git mv`.
- Measurements: the ollama HEAD is `24662ef` (O3 committed 2026-09-14), tracked tree clean;
  `test:src:core` reports 4 files and 100 tests passing and `test:setup` 3 files and 96 tests
  (`../scaffold/.orkestrel/campaign/o3-gates.log.txt`). O3 added relay fixtures to
  `tests/setupServer.ts` after the finding was written; the `RecordedRequest.text` member the
  finding cites is unchanged by O3 — re-locate it by name, not by line.
- A test is named for what it proves, never for a finding label.

## Items

1. **F3 — fold the near-duplicate pre-aborted cases** in `tests/src/core/OllamaProvider.test.ts`
   (the two cases the finding cites by line: each builds a refusing transport, issues a pre-aborted
   call then a live one, and asserts `transport.signals.length === 1` with `signals[0].aborted`
   false). Keep one case. Give it the premise the base's ordering makes real: assert that the
   headers-hook recorder stays empty across the pre-aborted call, so the case proves that a
   pre-aborted call reaches neither the hook nor the transport. Name it for that.
2. **F4 — name the control's link to its guards.** In the deadline control the finding cites (it
   records the header hook's signal and asserts `transport.signals` is empty), add a one-sentence
   comment stating that the base passes one combined signal to the header hook and to the
   transport, which is why the hook's signal stands in for the transport's in this control.
3. **F5 — make `RecordedRequest.text` required** in `tests/setupServer.ts`, because
   `createRecordingProxy` sets it on every capture. Update the structural literal in
   `tests/setup.test.ts` that the finding cites so it carries a `text` (type that helper's return
   as `RecordedRequest`).

## Scope

**Owned.** `tests/src/core/OllamaProvider.test.ts` (items 1 and 2 only), `tests/setupServer.ts`
(item 3 only), `tests/setup.test.ts` (item 3 only).

**Shared (report-only).** None.

**Off-limits.** Everything else, including `src/**`, `guides/**`, `tests/service/**`,
`tests/src/core/integration.test.ts`, configuration, the vendored set, `package.json`,
`package-lock.json`, `node_modules/**`.

**Tools and limits.** `npm run lint:check`, `npm run check`, `npm run test:src:core`,
`npm run test:setup` (read-only); never `lint`, `format`, `build`, `test`, or `test:service`;
never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o2-fix-report.md` and
return the same text: `Touched files` with `git diff --stat`; per item, the exact change and the
command that proves the suites green with counts; `Deviation`; `Status` (`git status --porcelain`
verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
an item needs a file outside Owned or when the cited lines no longer match the finding's
description. Decide, record, and carry on from the folded test's name and the comment's wording.

## Acceptance criteria

1. `npm run lint:check` and `npm run check` exit 0.
2. `npm run test:src:core` and `npm run test:setup` exit 0; the core count drops by one case.
3. Exactly one pre-aborted case remains and it asserts the hook recorder is empty.
4. `grep -n "text?: string" tests/setupServer.ts` returns nothing.
5. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the checker reads
the diff.
