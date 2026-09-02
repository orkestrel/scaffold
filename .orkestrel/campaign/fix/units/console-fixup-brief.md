# Unit console-fixup — close the console unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The prose findings the objective and subjective lanes raised outside their claims are closed as
ruled in `@orkestrel/console` at commit `a35c93f`: the moved capture TSDoc names the mechanism the
body uses, the README fences import the published specifier, the options TSDoc links the class
that consumes the options, the two sink factories open in the third person, and one guide sentence
keeps its pairing form.

## Context

**Findings, each with its ruling.**

1. **F1 (objective) — `src/core/factories.ts:139` and `:159`.** The moved `createCaptureResult`
   TSDoc says the capture "stops in a `finally`" while the body calls `capture.destroy()` on the
   sync success path, in the sync `catch`, and in each promise handler (`Capture.destroy()` calls
   `stop()`). Ruling: rewrite both sentences to the mechanism the code uses — `destroy()` runs on
   every path, sync or async, success or failure, and stops the capture, so `console` is restored
   when `fn` throws or rejects. Change no code.
2. **F2 (objective; the subjective lane observed the same) — `README.md:28`, `:48`, and every
   other README fence importing `@src/core`, `@src/browser`, or `@src/server`.** `README.md` ships
   in `files`, so `.claude/rules/documentation.md` § Guide examples applies: fences import through
   the published specifier. Ruling: `@src/core` → `@orkestrel/console`; `@src/browser` →
   `@orkestrel/console/browser`; `@src/server` → `@orkestrel/console/server` (confirm the subpaths
   against `package.json` `exports` before editing; report the mapping you used).
3. **RC-1 (subjective) — `src/core/types.ts:386, 460, 720, 860, 1010, 1149`.** Each options block
   reads "Options for the {@link LoggerInterface} constructor." (and the same for
   `LoggerManagerInterface`, `ReporterInterface`, `CaptureInterface`, `SpinnerInterface`,
   `ProgressInterface`); an interface has no constructor. Ruling: each names the class:
   "Options for the {@link import('./Logger.js').Logger} constructor." with the matching class
   module at each of the other five sites (`LoggerManager`, `Reporter`, `Capture`, `Spinner`,
   `Progress`). Use the `import('./X.js').X` link form the file already uses at `:932`.
4. **RC-2 (subjective) — `src/browser/factories.ts:15` and `src/server/factories.ts:14`.** The
   first sentences read "Create the browser `%c` …" and "Create the server TTY …" in blocks the
   unit edited. Ruling: "Creates the browser `%c` …" and "Creates the server TTY …"; change
   nothing else in those blocks.
5. **Observation (subjective), ruled in — `guides/console.md:402`.** The sentence pairs
   "`Capture` / `ProcessCapture`" and "per-level / per-stream" with a slash and then "at
   `DEFAULT_CAPTURE_LIMIT` and `DEFAULT_STREAM_LIMIT`" with `and`. Ruling: the third pair uses the
   same slash form.

Referral R-1 (`createCaptureResult` as a `create*` name for a function that runs a callback) stands
as the s09-07 ruling fixed it and is recorded for the next change; make no edit for it. Referral
R-2 (the guides test maps no `@orkestrel/console/server` specifier) is pre-existing and recorded;
make no edit for it.

**Law.** `AGENTS.md`; `.claude/rules/typescript.md` (TSDoc first sentence, third person);
`.claude/rules/documentation.md` § Guide examples and § Parity; `.claude/rules/writing.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/console` at commit `a35c93f`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings.

**Standing conditions.** none.

## Unknowns

Whether `tests/guides.test.ts` or a README test resolves the README's fence specifiers (report
what the guides project does with them after the edit).

## Scope

**Owned.** `src/core/factories.ts` (the `createCaptureResult` TSDoc only), `README.md` (fence
specifiers only), `src/core/types.ts` (the six options sentences only), `src/browser/factories.ts`
and `src/server/factories.ts` (one first sentence each), `guides/console.md:402` (one sentence).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the rulings in
order, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the README specifier mapping used; each gate command with its exit code and an excerpt
for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when `package.json` `exports` carries no subpath a README fence needs, or when a
gate fails for a cause you cannot attribute after the re-run. Decide, record, and carry on from
the exact wording of a TSDoc sentence.

## Acceptance criteria

1. `rg -n 'finally' src/core/factories.ts` returns no hit in the `createCaptureResult` TSDoc.
2. `rg -n "@src/" README.md` returns no hit.
3. `rg -n 'Options for the \{@link [A-Za-z]+Interface\} constructor' src` returns no hit.
4. The two sink factories' first sentences begin "Creates".
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
