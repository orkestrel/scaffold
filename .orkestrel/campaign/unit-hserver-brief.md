# Unit H-server: process liveness, socket close, scratch retry, cookie jar

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing.

## Objective

Land the reconciled server additions for `@orkestrel/test` 0.0.8: `isRunning`,
`waitForSocketClose`, `destroyScratch`, and the cookie jar — types first, fully proved, with
their guide Surface rows so parity stays green.

## Context

Authority, inside this checkout: `AGENTS.md`; `.claude/rules/typescript.md`,
`.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`,
`.claude/rules/tests.md` (fixture servers bind `127.0.0.1` on ephemeral ports;
performance.now for elapsed intervals), `.claude/rules/documentation.md`,
`.claude/rules/writing.md`. Guide: `guides/test.md` — granted for your own Surface/Voices rows
ONLY; a later unit owns narrative. Skill: none.

The working tree carries every earlier unit of this wave (including unit H-core's additions in
`src/core` — `WaitOptions` with `{ budget?, interval?, signal? }` lives in `src/core/types.ts`
and is importable from server code through the core barrel) plus the user's manifest/lockfile
entries. Leave everything standing. The supervisor originals, for reference only (read-only,
another repository): `hasProcess` at `supervisor/tests/setupServer.ts:419-432`,
`waitForSocketClose` at `:612-615`, the destroy retry at
`supervisor/tests/setupApplicationServer.ts:157-184`, the cookie jar at `:53-83`.

## The design, fixed by the reconciled round (design2-reconciliation.md)

Types in `src/server/types.ts`:

```ts
export interface CookieJarInterface {
	readonly header: string | undefined
	read(name: string): string | undefined
	capture(response: Response): readonly string[]
}
```

Helpers in `src/server/helpers.ts`:

1. `isRunning(pid: number): boolean` — `process.kill(pid, 0)` liveness with the Linux `/proc`
   zombie refinement from the supervisor original; total; documents itself as an instantaneous
   observation, not ownership (pid reuse). The zombie branch's unproven-on-this-host status is
   recorded in the file's own comment idiom.
2. `waitForSocketClose(socket: Socket, options?: WaitOptions): Promise<void>` — resolves on
   `close`; tolerates ONLY `ECONNRESET` as a forced close; any other error rejects; the budget
   bounds the wait and its rejection names the wait; listeners are removed on every settlement.
3. `destroyScratch(scratch: ScratchInterface, options?: WaitOptions): Promise<void>` — retries
   `scratch.destroy()` until it stops throwing, measured with `performance.now()`, defaults
   budget 10000 and interval 25; on exhaustion rejects with
   `Scratch directory was not destroyed within <budget>ms` carrying the LAST host error as
   `cause`. It does not change `ScratchInterface.destroy`, which stays synchronous.

Factory in `src/server/factories.ts`:

4. `createCookieJar(): CookieJarInterface` — captures `Set-Cookie` fields off a real
   `Response` through `headers.getSetCookie()`, stores by cookie name, honours a `Max-Age=0`
   deletion (case and spacing tolerant), returns the unmodified wire fields from `capture`,
   and renders `header` as the `name=value` join or `undefined` when empty. Name-based only —
   no domain/path selection, no persistence; the TSDoc states that boundary.

## Tests

In `tests/src/server/helpers.test.ts` and `tests/src/server/factories.test.ts`, following each
file's idiom:

- `isRunning`: the current process's own pid true; a child that has exited false (spawn a
  short-lived real child and wait for its exit); an invalid pid false.
- `waitForSocketClose`: real loopback sockets on ephemeral ports — an already-closed socket;
  an ordinary close; a peer-reset (`ECONNRESET`) tolerated; a budget expiry rejecting with the
  named wait; listener cleanup after settlement.
- `destroyScratch`: immediate success; success after transient throws (drive a REAL transient
  hold — an open file handle inside the scratch released between attempts — never a fake);
  exhaustion carrying the last real error as `cause`; no retry after success.
- cookie jar: a real `Response` built from `Headers` with several `Set-Cookie` fields;
  replacement; `Max-Age=0` deletion with casing/spacing variants; a field with no `=`; the
  empty jar's `undefined` header; `capture` returning the unmodified wire fields.

## Guide rows

Surface rows for the helpers, the factory, and `CookieJarInterface` (plus its `## Methods`
table if the guide's idiom for behavioural interfaces requires one — it does; follow the
`ScratchInterface` table's shape). Rows only; no narrative sections.

## Scope

- Owned: `src/server/types.ts`, `src/server/helpers.ts`, `src/server/factories.ts`,
  `tests/src/server/helpers.test.ts`, `tests/src/server/factories.test.ts`, and in
  `guides/test.md` your own new rows and the `CookieJarInterface` methods table only.
- Off-limits: `src/core/**`, `src/browser/**`, `tests/setupServer.ts`, `package.json`,
  `vite.config.ts`, `tests/guides.test.ts` unless a parity list there names interfaces (check
  first; if the methods-parity population is enumerated there, adding `CookieJarInterface` to
  it IS granted — report the line).
- No commits, installs, or git checkout/restore/stash/reset/clean. Use `npx.cmd`.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxfmtrc.json --deny-warnings` corrected to
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` and
   `npx.cmd tsc --noEmit -p configs/src/tsconfig.server.json` exit 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:server`
   exits 0; report totals against the standing baseline (`87 passed | 8 skipped` plus whatever
   H-core added to core — read your own baseline first and record it).
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0.

## Output

The complete diff; raw output and exit code per criterion with baselines; any deviation
decisions. No process diary.

## Deviation contract

Stop on a conflict with the primary objective — a design element contradicting an authority
file, a criterion unreachable from the owned files, parity red outside your rows. TSDoc
wording, test naming, fixture shapes, and row phrasing are yours: decide, record, carry on.
