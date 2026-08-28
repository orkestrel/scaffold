# Unit report U3 — tests

Role `implementer`, engine Opus 5 (native). Routing note: the unit is judgment-bearing and its
natural objective route is the Sol `sol` bridge; the Codex bench is dark this session, so Opus 5
ran it. Substitution recorded.

## What changed

`tests/src/server/helpers.test.ts` absorbed the three execution suites as one `describe` per
subject, gained a `captureChunk` block beside `trimHead` and `trimTail`, and gained two
capture-bound rows on `execute`. `tests/guides.test.ts` dropped `Retention` from its import, its
refusal rows, and both executed assertions, and gained `captureChunk` in each place. The three
`execution/*.test.ts` files, their directory, and `Retention.test.ts` are deleted.

## Counts, reconciled

`test:src` moved from 9 files / 172 passed / 8 skipped to 5 files / 177 passed / 8 skipped.

- Files: 9 − 4 = 5. `Retention.test.ts` retired; three execution files folded in.
- Passing: 172 − 1 + 6 = 177. The one `Retention` row retired; four `captureChunk` rows and two
  `execute` rows added.
- Skipped: unchanged, all `it.skipIf(process.platform !== 'win32')` rows in `helpers.test.ts`.

The unit also counted `it` declarations across the pre-change files at `HEAD` — 49 + 15 + 13 + 5 =
82 — against 88 in the merged file, which is 82 plus the six it added. No test was lost in the fold.

## A finding the unit closed inside its own scope

The `REFUSALS` list for `@orkestrel/process` is compared for exact equality against the server
face's live published surface, so removing `Retention` and `RetentionInterface` was necessary but
not sufficient: `captureChunk` is a new server export and the list failed without it. The unit
measured the failure before fixing it and added the row. The file was its own, so this closed in
scope rather than as a deviation.

## Instrument control

The two `execute` rows guard a repair that landed in U1, so the unit could not redden them by
reverting source it did not own. It proved they discriminate with a throwaway probe under
`tmp/probe/` composing the real `captureChunk` and `trimHead` under each room arithmetic: the
published 0.0.8 arithmetic yields `aa�`, which the new assertion rejects. The probe was
deleted.

The truncation row is self-controlling: it asserts both ends of the boundary in one test, so an
`execute` that never reports `truncated` fails the 65-byte half and one that always reports it
fails the 64-byte half.

## Orchestrator's independent verification

### Mutation probe on the repair

Run by the Orchestrator after the unit exited, with no writer in the tree. Reverting the capture
bound from `limit + 1 - retained` to `limit - retained` in `src/server/helpers.ts` and running
`npm run test:src:server` reddened three tests, and the code-point test failed on exactly its
UTF-8 assertion:

```
AssertionError: expected 'aa�' to be 'aa' // Object.is equality
❯ tests/src/server/helpers.test.ts:1107
```

That reproduces the published 0.0.8 reading exactly. The file was restored from a byte-identical
copy and the suite re-run green at 174 passed / 8 skipped.

The revert reddens three tests rather than one, because the capture bound and the `truncated`
derivation are coupled: with the bound back at `limit`, `retained` saturates at `limit` and
`retained > limit` can never fire. The two collateral failures are artifacts of that coupling, not
harness breakage. The code-point test's own assertion is the clean detector.

### The `test:guides` count

The project moved from 108 to 103, which the Orchestrator resolved by membership rather than by
accepting a total. A worktree at `HEAD` produced the baseline test names, and the verbose listings
were diffed with timings stripped:

Removed — `RetentionInterface > Retention exposes no undocumented method`,
`RetentionInterface > documents at least one method`,
`RetentionInterface > documents every interface method`,
`RetentionInterface > documents no phantom method`,
`RetentionInterface examples > documents an example for every method`,
`flagship fences > retains the bounded stream head and reports both byte totals`, and
`unfenced TSDoc examples > retains the byte total Retention's example claims`.

Added — `flagship fences > bounds one delivered chunk and refuses one that is not a buffer` and
`unfenced TSDoc examples > returns what captureChunk's example claims`.

108 − 7 + 2 = 103. Every removed test was a parity test about `RetentionInterface` or its example,
both of which no longer exist. The asymmetry is structural: the guides suite generates a group of
parity tests per documented interface, and `captureChunk` is a function, so it generates no such
group. No coverage was lost.
