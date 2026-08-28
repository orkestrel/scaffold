# Unit U1 — source: move the three functions, fold `Retention` away

## Role and engine

`implementer`. Engine: Opus 5 (native). Routing note: this unit is objective and
constraint-heavy, so it belongs to the Sol `sol` route; the Codex bench is dark this session (the
`codex` CLI does not resolve on this host), so Opus 5 runs it. The substitution is recorded.

## Context

Read `/home/user/process/tmp/units/shared-context.md` first. It carries the rulings already taken,
the authority list, the host conditions, the green baseline, and the execution contract. Everything
in it binds you.

## Objective

Leave `src/server` with no `execution/` folder and no `Retention` class, with `execute`,
`executeSync`, and `detach` living in `src/server/helpers.ts` under their existing names, and with
`npm run check` and `npm run lint:check` green.

## Owned files

- `src/server/helpers.ts` — edit.
- `src/server/index.ts` — edit.
- `src/server/types.ts` — edit.
- `src/server/Retention.ts` — delete.
- `src/server/execution/execute.ts` — delete.
- `src/server/execution/executeSync.ts` — delete.
- `src/server/execution/detach.ts` — delete.
- `src/server/execution/` — the directory itself must be gone.

## Off-limits

Everything else. Specifically: all of `tests/`, all of `guides/`, `README.md`, `package.json`,
`package-lock.json`, `configs/`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json`,
`src/core/**`, `src/server/Process.ts`, `src/server/ProcessManager.ts`, `src/server/Session.ts`,
`src/server/Supervisor.ts`, `src/server/factories.ts`.

The test suite will be red at the end of your unit, because the tests still import `Retention` and
still sit under `tests/src/server/execution/`. That is expected and is unit U2's work. Do not touch
a test to make it pass.

## The work

### 1. Move the three functions into `src/server/helpers.ts`

Append them at the end of the file, after `buildExecuteResult`, in this order: `execute`,
`executeSync`, `detach`. That order puts the asynchronous engine first and keeps every callee
declared before its callers, which is the file's existing reading order. Reorder no existing
export. Add no section banner comments.

Carry each function's TSDoc across verbatim, including its `@remarks`, `@example`, and every
`{@link}`. Their `../helpers.js` imports disappear, because the callees are now siblings in the
same file. Merge every remaining import into the file's existing import block: `import type`
declarations before value imports, no blank line between consecutive imports of the same kind, and
no duplicate specifier.

### 2. Fold `Retention` away

Replace `Retention` with one new exported helper and two local tallies. This shape was ruled by
two blind design lanes and the ruling is recorded at
`/home/user/scaffold/.orkestrel/process/fold-reconciliation.md`. Do not redesign it.

#### The helper

Add this to `src/server/helpers.ts` immediately after `trimHead` and before `snapshotCommand`,
so it sits with the byte-bounding family it composes with:

```ts
export function captureChunk(chunk: unknown, room: number): Buffer | undefined {
	if (!Buffer.isBuffer(chunk) || room <= 0) return undefined
	if (chunk.byteLength <= room) return chunk
	return Buffer.from(chunk.subarray(0, room))
}
```

Write its TSDoc to this repository's standard: a first sentence in the third person with an `-s`
verb that does not repeat the symbol name, a `@remarks` block, `@param` for each parameter,
`@returns`, and a runnable `@example`. The remarks must state three things, because each is a
decision a reader would otherwise misread: that a chunk which is not a buffer contributes nothing
and reports `undefined` rather than throwing, because a stream `data` listener is typed `unknown`;
that the cut is byte-exact and may land inside a multibyte sequence, because
{@link buildExecuteResult} performs the single code-point-boundary trim over the whole capture;
and that a caller must give the capture one byte more room than its limit, so that final trim can
read the first excluded byte and retreat off a split sequence.

#### The wiring in `execute`

Delete `import { Retention } from '../Retention.js'` and add nothing in its place. Replace the two
`new Retention()` bindings with two tallies declared beside the existing `spawned`, `expired`, and
`aborted` bindings:

```ts
let outRetained = 0
let errRetained = 0
```

The two stream handlers become:

```ts
child.stdout.on('data', (chunk: unknown) => {
	const captured = captureChunk(chunk, limit + 1 - outRetained)
	if (captured === undefined) return
	outRetained += captured.byteLength
	outChunks.push(captured)
})
child.stderr.on('data', (chunk: unknown) => {
	const captured = captureChunk(chunk, limit + 1 - errRetained)
	if (captured === undefined) return
	errRetained += captured.byteLength
	errChunks.push(captured)
})
```

The `truncated` argument at what is currently `execute.ts:132` becomes:

```ts
truncated: outRetained > limit || errRetained > limit,
```

#### Why the extra byte, and what it changes

This is a deliberate behaviour repair, ruled in scope, and it is the one place your unit changes
what the package does rather than where its code lives.

`trimHead(bytes, limit)` returns `bytes` unchanged whenever `bytes.byteLength <= limit`, so with a
capture capped at exactly `limit` the code-point retreat in `buildExecuteResult` never runs.
`execute` therefore ships output that can end mid-sequence, which contradicts its own remarks and
`guides/process.md:935-936`. The Orchestrator confirmed this against the published 0.0.8 artifact:
`execute` over the bytes of `aa€` at `limit: 3` returns `"aa\ufffd"`, while the same run at
`limit: 2` returns `"aa"` clean. Capturing one byte past `limit` gives that trim the lookahead byte
it reads, and a simulation over 90 limit-and-chunking combinations reported 36 replacement
characters under the old bound and none under the new one.

The derivation is exact rather than approximate: capture saturates `retained` at `limit + 1`, so
`retained > limit` holds precisely when the old `delivered > limit` held. Do not add a `delivered`
tally back; `AGENTS.md` § Design laws requires deriving that fact rather than storing a second one.

Add one sentence to `execute`'s own `@remarks` naming the extra captured byte and why it exists, in
the register the surrounding remarks already use. A maintainer meeting `limit + 1 - outRetained`
with no explanation reads it as an off-by-one.

### 3. Remove the `Retention` declarations

- Delete `src/server/Retention.ts`.
- Delete the `RetentionInterface` declaration from `src/server/types.ts`.
- Delete `import type { Buffer } from 'node:buffer'` at `src/server/types.ts:1`. Confirm first that
  `RetentionInterface.retain` was its only use; the Orchestrator's search found no other, but
  verify rather than trust.
- Delete the `export * from './Retention.js'` row and the three `./execution/*.js` rows from
  `src/server/index.ts`.

## Deviation contract

Stop and report if any of these does not hold, rather than working around it:

- a symbol you need is not exported from where the brief says it is;
- deleting the `Buffer` type import from `types.ts` breaks a declaration the brief did not name;
- the fold cannot reproduce the class's behaviour for a case the brief did not anticipate;
- `npm run check` reports an error you cannot fix inside your owned files.

Where the brief leaves a detail open — the exact wording of a TSDoc line you must write fresh, the
position of one import within its kind group — decide it, record the decision in your report, and
carry on.

## Acceptance criteria

Ordered cheap-first. Run each yourself and paste its real output in your report.

1. `src/server/execution/` does not exist: `test ! -e src/server/execution && echo gone`.
2. `src/server/Retention.ts` does not exist, and `grep -rn "Retention" src/` returns nothing.
3. `src/server/index.ts` contains exactly the rows for `types`, `helpers`, `factories`, `Process`,
   `ProcessManager`, and `Session`, and no others.
4. `npm run lint:check` exits 0.
5. `npm run check` exits 0.
6. `grep -c "^export function\|^export async function" src/server/helpers.ts` reports 31: the
   baseline of 27, plus `execute`, `executeSync`, `detach`, and `captureChunk`.

## Output

Return: what you changed per file; the fold's final code for the two stream handlers and the
`truncated` expression; each acceptance command with its real pasted output; every decision you
made where the brief left a detail open; and anything you could not close, named rather than
worked around. No process diary.
