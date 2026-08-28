# Reconciliation: the fold shape

Two blind Opus lanes ruled on how `Retention` is replaced. The Sol bench is dark this session, so
Opus 5 ran every lane; the substitution is recorded here and in the audit verdict.

## Where the lanes agreed

- No new type. `RetentionInterface` is deleted rather than repurposed, and
  `src/server/types.ts:1` drops its now-unused `import type { Buffer } from 'node:buffer'`.
- The two stream handlers stay anonymous arrow callbacks passed directly to `.on`, which the
  no-nested-functions rule permits by name.
- The import graph stays acyclic, and `helpers.ts` becomes a genuine leaf.
- `tests/src/server/Retention.test.ts` must die in the same commit as `src/server/Retention.ts`,
  or the policy sweep's `mirror` rule fires.
- The `REFUSALS` rows at `tests/guides.test.ts:106-107` must go with the barrel exports.
- Both lanes, independently, found the same latent defect described in the following section.

## Where they diverged, and the ruling

The subjective lane proposed one new exported helper plus a capture bound of `limit + 1`. The
objective lane proposed no new declaration, calling the existing `trimHead` once per chunk.

**Ruled for the subjective lane's shape, on evidence.**

The objective lane's per-chunk `trimHead` does not close the defect. It trims only the chunk the
cut lands inside, so when the remaining room ends exactly at a chunk boundary and a multibyte
sequence spans that boundary, the concatenation still ends mid-sequence and `trimHead` cannot see
the next chunk. The subjective lane's bound moves the one trim to the concatenation, where it sees
every byte.

That is a measurement, not a preference. A simulation over the payload `aa€bb€€` across 7 limits
and 6 chunkings, 90 cases, reported 36 replacement characters under today's bound and 0 under
`limit + 1`. The instrument is not blind: it detects the defect in the current form, which is what
makes its clean result on the fix meaningful.

The objective lane's "no new declaration" is also weaker on duplication: without a helper, the
guard-and-slice logic is written inline twice, once per stream.

## The defect both lanes found

`execute` documents, and `guides/process.md:935-936` promises, that a bounded capture never splits
a UTF-8 sequence. It does. `buildExecuteResult` applies `trimHead(bytes, limit)`, and `trimHead`
returns early whenever `byteLength <= limit`. `Retention` caps the retained bytes at exactly
`limit`, so that early return always fires and the code-point retreat never runs.

Confirmed by running the published artifact, not by reading it: `execute` over the bytes of `aa€`
with `limit: 3` returns `"aa�"`. The control, the same run at `limit: 2` where the bound lands
on a code-point boundary, returns `"aa"` clean.

## Ruling on scope

The fix lands in this change rather than being recorded for the next one.

The guide already promises the fixed behaviour, so the repair makes the code match its published
contract rather than changing what the package promises. `.claude/rules/documentation.md` treats a
prose claim the code contradicts as a defect of the same kind as a wrong return value. The owner
also asked that `execute` be "kept hardened" through this change, and the fold rewrites this exact
path. The release is already breaking on the owner's `Retention` ruling, so the repair costs no
additional release.

This is a behaviour change beyond a pure move, and it is reported to the owner as one.

## The shape

One new export in `src/server/helpers.ts`, placed after `trimHead`:

```ts
export function captureChunk(chunk: unknown, room: number): Buffer | undefined
```

`execute` holds `let outRetained = 0` and `let errRetained = 0` beside its existing `spawned`,
`expired`, and `aborted` bindings, captures with a room of `limit + 1 - retained`, and derives
`truncated: outRetained > limit || errRetained > limit`. That derivation is exact:
`retained === min(delivered, limit + 1)`, so `retained > limit` holds precisely when
`delivered > limit`, which is what the class computed.

`delivered` disappears entirely. It was a second tally over a fact the code already carries, and
`AGENTS.md` § Design laws requires deriving such a fact rather than storing it.
