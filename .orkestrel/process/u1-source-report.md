# Unit report U1 — source

Role `implementer`, engine Opus 5 (native). Routing note: the unit is objective and
constraint-heavy and belongs to the Sol `sol` route; the Codex bench is dark this session, so
Opus 5 ran it. Substitution recorded.

## What changed

`src/server/Retention.ts` and `src/server/execution/{execute,executeSync,detach}.ts` deleted, the
directory with them. `src/server/helpers.ts` gained the three moved functions and `captureChunk`.
`src/server/index.ts` dropped four rows. `src/server/types.ts` dropped `RetentionInterface` and its
now-unused `Buffer` type import.

Diffstat over `src/`: 364 insertions, 436 deletions across 7 files.

## The fold as it landed

```ts
child.stdout.on('data', (chunk: unknown) => {
	const captured = captureChunk(chunk, limit + 1 - outRetained)
	if (captured === undefined) return
	outRetained += captured.byteLength
	outChunks.push(captured)
})
```

with `truncated: outRetained > limit || errRetained > limit`.

## The unit's own mutation probe

The unit did not reason about the `limit + 1` bound; it ran it. It wrote a probe to `tmp/probe/`,
the workbench `vite.config.ts` designates and `tsconfig.json` excludes, reverted the bound to
`limit`, and recorded the failure:

```
× the capture bound > never delivers a split multibyte sequence at limit 3
AssertionError: expected 'aa�' to be 'aa'
```

That reproduces the Orchestrator's independent reading against the published 0.0.8 artifact
exactly. Restored, the same command reported 5 passed. The probe was deleted; `git status` carries
no residue.

## Deviation the unit reported, and the Orchestrator's ruling

Acceptance criterion 5, `npm run check`, exited 2 with exactly two errors, both
`Module '"@src/server"' has no exported member 'Retention'`, in `tests/guides.test.ts` and
`tests/src/server/Retention.test.ts`. The root `tsconfig.json` declares no `include` and excludes
only `node_modules`, `dist`, and `tmp`, so `npm run check` typechecks `tests/` as well.

The criterion was unreachable from the unit's owned files. That is a defect in the brief, not in
the unit: `.agents/orchestration.md` § Check the brief before you send it requires reading each
criterion against the off-limits list and either granting the file or striking the criterion, and
the Orchestrator did not. The correct criterion was `npm run check:src`, which the unit ran and
which exited 0. The unit refused to touch a test to make a gate pass, which is the required
behaviour. Recorded for the debrief.

## Orchestrator's independent verification

Not the unit's self-report. Run after the unit exited, with no writer in the tree:

- `npm run check:src` — exit 0
- `npm run lint:check` — exit 0
- `src/server/helpers.ts` exports 31 functions, against a baseline of 27 plus the three moved
  functions plus `captureChunk`
- `src/server/index.ts` carries 6 rows
- `grep -rn Retention src/` returns nothing
- `src/server/execution` does not exist
