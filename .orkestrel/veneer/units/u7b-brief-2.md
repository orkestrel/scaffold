# Unit U7b — successor brief 2: the error contract

## What changed and why

This brief supersedes `u7b-brief.md`; that brief stands, and `u7b-report.md`
is the baseline: `Button`, `Delegate`, the helpers, the guards, and every proof are complete in
the working tree with every gate exit 0 on Chromium and Edge and both controls red and restored.
The unit reported one deviation: `Button`'s constructor refusals throw a native `TypeError`,
while `.claude/rules/typescript.md` § Errors and outcomes requires an `AppError` for a programmer
error or invalid argument, with a machine-readable `code`, an optional `context`, and a guard
such as `isAppError`, declared in a centralized `errors.ts` (`architecture.md` § Centralized
files). The package declares no error class yet and the brief granted no `errors.ts`: the
Orchestrator's omission.

Ruling: the error class is host-independent and every environment refuses the same way, so it
lives in `src/core/errors.ts` and reaches the browser through the core barrel. Its shape:
`class AppError extends Error` with `readonly code: string` and `readonly context?: Readonly<Record<string, unknown>>`,
constructed as `new AppError(message, code, context?)` (`name` set to `'AppError'`, the cause
forwarded through the native options where given), and `isAppError(value: unknown): value is AppError`
exported beside it. `ButtonInterface` and the option types do not change.

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7b-brief.md`, verbatim, with the standing clause: an existing assertion in an
owned file that enumerates a population your change grows (an export-set equality) is yours to
update in the same step; record it. `HEAD` is `91e5906`; the working tree carries your brief-1
work, uncommitted. Continue from it; do not restore or reset anything. Audits cover
implementation only: make no wording, comment, or guide-prose change beyond what the code
requires.

## Scope

As in brief 1, with these grants: `src/core/errors.ts` (new), `src/core/types.ts` (an
`AppErrorInterface` if a public shape is owed beyond the class, else untouched),
`src/core/index.ts` (the barrel line), `tests/src/core/errors.test.ts` (new),
`tests/src/core/index.test.ts` (the export-set case). Everything else stands.

## Execution

1. Declare `AppError` and `isAppError` in `src/core/errors.ts`; export them from the core barrel;
   prove in `tests/src/core/errors.test.ts` the `code`, the `context`, the `name`, the
   `instanceof` chain, the cause, and the guard's refusals (a native `Error`, an object with a
   `code`, `undefined`); add both names to the core export-set case.
2. `Button`'s constructor refusals (an invalid host; a host already owned) throw `AppError` with a
   distinct `code` each (the spelling is yours; record it) and a `context` naming the host's tag;
   the browser proofs assert `isAppError` and the codes instead of `TypeError`; where the browser
   barrel's consumers need the guard, import it from the core barrel rather than re-exporting it.
3. Run, in order, and record each command's final lines: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build:src:core`,
   `npm.cmd run build:src:browser`, `npm.cmd run test:src:core`, `npm.cmd run test:src:browser`,
   `npm.cmd run test:setup:browser`, `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser`.

## Output

Write `u7b-report-2.md` and return its content: the error class and guard as
declared; the codes `Button` throws; the export-set names added; each gate's final lines on both
engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`. Do not
repeat report 1.

## Acceptance criteria

1. `AppError` and `isAppError` are exported from `src/core` and proven; `Button` throws `AppError`
   for both refusals and the proofs assert the guard and the codes; no `TypeError` is thrown by
   the package's own code.
2. Every gate in item 3 exits 0 on managed Chromium and Edge.
3. `git status --porcelain --untracked-files=all` shows only brief 1's owned set plus the files
   granted here and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report with report 1.
