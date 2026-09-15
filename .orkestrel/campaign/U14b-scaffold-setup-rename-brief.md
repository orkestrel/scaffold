# Unit U14b-scaffold — `@orkestrel/scaffold`: the callers U14's brief left out (successor to U14-scaffold)

## Role and engine

`builder` on Sonnet, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/scaffold` checkout while this unit runs.

## Why a successor

U14 renamed `tests/setupServer.ts`'s `readErrorCode` to `captureScaffoldCode` and updated the
callers its brief named. The brief's caller set came from a search over two files, not from the
suite, and the Orchestrator's gate run after U14 (`tmp/units/gates-scaffold-after-u14-check.out.txt`)
names three more:

```text
tests/src/server/Materializer.test.ts(42,2): error TS2305: Module '"../../setupServer.js"' has no exported member 'readErrorCode'.
tests/src/server/Upstream.test.ts(23,2): error TS2305: Module '"../../setupServer.js"' has no exported member 'readErrorCode'.
tests/src/server/WriteTransaction.test.ts(17,10): error TS2305: Module '"../../setupServer.js"' has no exported member 'readErrorCode'.
```

`npm run test` after U14: `src:server` project `38 failed | 408 passed | 6 skipped (452)`, all in
those three files (`gates-scaffold-after-u14-test.out.txt`).

## Objective

In each of the three files, rename the import and every call of `readErrorCode` to
`captureScaffoldCode` (same signature: a thunk in, `ScaffoldErrorCode | undefined` out), and
re-sort the import block with `npx oxfmt --config .oxfmtrc.json tests/src/server/Materializer.test.ts
tests/src/server/Upstream.test.ts tests/src/server/WriteTransaction.test.ts` after the rename.
Then derive the caller set from the suite, not from a search: `npm run check` must name no
remaining `readErrorCode` import from `setupServer`, and `grep -rn "readErrorCode" tests/
--include=*.ts` must return nothing (the installed `@orkestrel/test/server` `readErrorCode`, if any
test imports it from that package, is a different export and stays — report any such line).

## Context

Dirty checkout as U14 (the Orchestrator's rule edits, D4-1b, D4-2b, D4-3, U14; `.orkestrel/`;
`guides/supervisor.md`); the Orchestrator's build has regenerated `dist/` and `host.json` — leave
them. `npm run test:policy` is green (U14). Do not touch `tests/setupServer.ts`,
`tests/setupServer.test.ts`, or `tests/src/server/helpers.test.ts` (U14's finished files).

## Scope

**Owned.** `tests/src/server/Materializer.test.ts`, `tests/src/server/Upstream.test.ts`,
`tests/src/server/WriteTransaction.test.ts`. **Off-limits.** Everything else.

## Output

Final message: per file, the import line before and after and the number of call sites renamed
as a value from the run (`grep -c`); `git diff --stat` for the three files; the readings of
`npm run check` (expected exit 0), `npm run test:src:server -- tests/src/server/Materializer.test.ts
tests/src/server/Upstream.test.ts tests/src/server/WriteTransaction.test.ts` (report the counts;
the documented sandbox-only `Ollama setup` failures do not apply here — this runs on the host),
`npx oxlint --config .oxlintrc.json --deny-warnings <the three files>`,
`npx oxfmt --config .oxfmtrc.json --check <the three files>`; the tree-wide `grep` result;
deviation state.

## Acceptance criteria

1. `npm run check` exit 0.
2. The three files' tests pass (report the counts).
3. No `readErrorCode` import from `setupServer` remains anywhere under `tests/`.
4. Only the three owned files changed.
