# Design brief: fold `Retention` into `execute`

## Decision already taken

The repository owner has ruled, after being shown that `Retention` is published API with guide
surface and an executed example: remove the `Retention` class and fold its accounting into
`execute`, accepting the breaking change and the republish it forces. That ruling is not open.
Do not re-argue it. Do not propose keeping `Retention`.

The owner added one requirement: "make sure that you preserve the tests somehow and apply it to
`execute` so that it is kept hardened."

## The single question

`execute` moves into `src/server/helpers.ts` in the same change, so whatever replaces `Retention`
must be legal inside `helpers.ts`. Rule on the exact replacement shape.

## Context

Read `/home/user/scaffold/AGENTS.md`, then `/home/user/scaffold/.claude/rules/architecture.md`,
`names.md`, `typescript.md`, and `tests.md`. Read the real files before ruling.

### What `Retention` does

`src/server/Retention.ts:14-43`. Two `#` counters, `delivered` and `retained`, and one method:

```ts
retain(chunk: unknown, limit: number): Buffer | undefined {
	if (!Buffer.isBuffer(chunk)) return undefined
	this.#delivered += chunk.byteLength
	const room = limit - this.#retained
	if (room <= 0) return undefined
	const slice = chunk.byteLength <= room ? chunk : Buffer.from(chunk.subarray(0, room))
	this.#retained += slice.byteLength
	return slice
}
```

### How `execute` uses it

`src/server/execution/execute.ts`. Two instances, one per stream, at lines 99-100. Read at line
132 for `truncated: outRetention.delivered > limit || errRetention.delivered > limit`. Called at
lines 166-173:

```ts
child.stdout.on('data', (chunk: unknown) => {
	const retained = outRetention.retain(chunk, limit)
	if (retained !== undefined) outChunks.push(retained)
})
child.stderr.on('data', (chunk: unknown) => {
	const retained = errRetention.retain(chunk, limit)
	if (retained !== undefined) errChunks.push(retained)
})
```

### Constraints that bind the answer

1. `helpers.ts` is a centralized kind file. Every declaration in it is exported, and it holds no
   class. `.claude/rules/architecture.md` § Centralized-file pattern and § Kind purity.
2. No function may be declared or assigned inside another function. The only in-body function
   expressions permitted are an anonymous callback passed directly as an argument and an anonymous
   function returned directly as the result. § Functions and orchestration.
3. `helpers.ts` must not import `factories.ts`: `factories.ts` imports `Process.ts`, which imports
   `helpers.ts`, so that edge is a cycle. Verify this yourself.
4. Public interface properties are readonly. `AGENTS.md` non-negotiables.
5. Reusable and public types live in `src/server/types.ts`.
6. A pattern repeated twice is centralized. § System constraints.
7. `trimHead` and `trimTail` already exist in `helpers.ts` at lines 40 and 69. Read them before
   proposing a new byte-slicing helper; rule on whether either already covers this and whether
   your proposal duplicates them.

## Rule on exactly these

1. **The replacement shape.** Name the exact declarations that replace `Retention`: their
   signatures, their file, and their names. Show the resulting `execute` stdout and stderr
   handlers as code, and show the `truncated` expression.
2. **Duplication.** Your shape will be used by two streams. State precisely what is duplicated
   between the two call sites and why that is or is not a violation of the centralize-twice rule.
   If your shape duplicates `trimHead`, say so and fix it.
3. **Naming.** Name every new declaration against `.claude/rules/names.md` § Standalone helpers
   and § Fixed derivation/construction forms.
4. **Types.** State whether any new type is needed in `src/server/types.ts`, and whether
   `RetentionInterface` is deleted or repurposed.
5. **Preserving the hardening.** `tests/src/server/Retention.test.ts` proves delivered and
   retained totals across a truncating stream. `tests/guides.test.ts:1294` executes the guide's
   `Retention` example. Rule on exactly where each proof lands so the owner's requirement is met:
   which test file, which `describe`, and what it asserts against `execute` or against the new
   declarations. Name what would be lost if it were simply deleted.

## Scope

Read-only. Propose; edit nothing. Perform this assignment directly and spawn nothing.

## Output

Per question: the ruling in one sentence, then the reasoning, then the exact rule text with its
file and section. Include the concrete code you propose. Flag anything you could not verify.
