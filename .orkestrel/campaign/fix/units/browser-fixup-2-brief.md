# Unit browser-fixup-2 — emit close on the connect-race teardown

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/browser` at commit `9563556` emits `close` exactly once when `close()` interrupts a
pending `connect()`, so the contract sentence "`close` fires after an explicit teardown" holds
on every explicit teardown.

## Context

**Finding and ruling (objective lane A on the fix-up).** `src/core/CDPClient.ts:207-218` tears
the transport down when `close()` races `connect()`, with `#expected` set so `#onClose` at
`:272` emits no `drop`; `#close()` then returns at `:237` because `#connected` is false, before
the `emit('close')` at `:254`. The path emits neither `close` nor `drop`, while
`src/core/types.ts:43-44` states "`close` fires after an explicit teardown" and `close()`'s own
TSDoc (`CDPClient.ts:187-189`) documents the race as supported. Ruling: in `#connect()`, after
the `try { await this.#transport.close() } finally { this.#active = false }` block and before
the `throw`, emit `close` once with `this.#emitter.emit('close')`. Leave `#close()` as it is (it
returns early on that path, so `close` fires once). Restate `src/core/types.ts:43-44` as
"`close` fires after an explicit teardown, including one that interrupted a pending
`connect()`". In `tests/src/core/CDPClient.test.ts:374-387` (the race case), add `close` and
`drop` recorders wired before the race and assert `close.count` is 1 and `drop.count` is 0
after both promises settle; build the recorders as the file's `emitter` cases at `:391-406` do.
Insert the failing proof first: add the assertions, run
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/CDPClient.test.ts`,
record the failing assertion (`close.count` expected 1) and count, land the emission, and
record the same command green.

**Law.** `AGENTS.md` § TTTDD; `.claude/rules/tests.md`; `.claude/rules/typescript.md`. Read the
copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's
`.claude/rules/` differs.

**Host.** Linux, bash. Repository `/home/user/fleet/browser` at commit `9563556`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** The stub transport's `close()` in `tests/setup.ts:121-128` emits
transport `close` when the transport was started, so the race path drives `#onClose`.

## Unknowns

none.

## Scope

**Owned.** `src/core/CDPClient.ts` (the connect-race block only), `src/core/types.ts` (the
`CDPClientEventMap` remark only), `tests/src/core/CDPClient.test.ts` (the race case only), and
`guides/browser.md` only where it restates the `close` sentence.

**Off-limits.** Every other file, every other checkout. Mutate no source file for a control;
the red proof is the new assertion before the emission lands.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` only to converge after `npm run lint`; then the
non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the ruling in the
order given, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the finding closed with the file and line of each change, or stopped with the
deviation; the red-then-green record (command, failing assertion, count, then the green run);
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the emission makes another `CDPClient` test red, or when a gate fails for a
cause you cannot attribute after the re-run. Decide, record, and carry on from the wording of a
sentence.

## Acceptance criteria

1. The race case asserts `close.count` 1 and `drop.count` 0, went red before the emission, and
   is green after it.
2. `src/core/types.ts` states the race case in the `close` sentence.
3. The gate chain exits 0.
4. `git status --short` lists only owned files.
