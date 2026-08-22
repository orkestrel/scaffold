# Unit fetch-U3 report: the value host, landed

Role `implementer`, engine Claude Opus 5, in the scaffold checkout. Brief:
`unit-fetch-u3-brief.md`. Returned 2026-08-22; every criterion green; no deviation;
one design resolution and one recorded limit.

## Landed

- `Host` in `src/server/types.ts` and `MaterializerOptions.host?: string | Host`;
  `isHost` and the `isMaterializerOptions` union arm.
- `copiesToHost` in `src/server/helpers.ts`: emits entries in the release manifest's
  own order, keeps `storage` and `executable` declarations, recomputes each `digest`
  over the fill's bytes and the membership digest, and answers `undefined` on any
  non-`found` row or undeclared path — beside `stageBytes`, which writes exactly the
  destinations a mutation needs under their storage names with their declared bits.
- The Materializer `#root`/`#value` split with `#own` (clone then re-guard),
  `#verify` (the `TARGET` refusal matrix: membership digest not covering the
  membership, duplicate destinations, duplicate storage claims, fill not covering
  exactly the declared entries, digest-missed bytes), and the `#fill` lifecycle.
- Test rows: the equivalence row, the one-byte control carrying its own internal
  negative, the refusal matrix, `copiesToHost` and `stageBytes` rows with green
  controls, `isHost` rows; guide table rows; `host.json` regenerated after the guide
  rows moved (the staleness gate red then green).

## The design resolution inside the brief's discretion

`WriteTransaction.copy` is the only mode-carrying entry point and needs a physical
source; writing a value host through `write` would silently strip the executable bit
from the vendored scripts, and no verb compares modes. A value host therefore fills a
private `mkdtemp` root per mutating `#apply` call, staged by `stageBytes`, copied
from, and removed in a `finally`; `audit` never fills because it never writes.
Mode-equivalence between a value host and a staged root is pinned by test.

## Failing-first evidence

Red produced by reverting exactly the two contract lines and restoring from a
scratchpad copy: the type red (the `TS2322` set over the value-host rows) and the
runtime red — `6 failed | 388 passed | 5 skipped (399)`, every failure the
options-shape refusal, including the equivalence row and the one-byte control. Green
after restore, then `395 passed | 5 skipped (400)` with the storage-collision row
added. `config` project red `1 failed | 42 passed` on the stale inventory, green
`43 passed` after `build:inventory`.

## Gate evidence

Scoped format and lint exit 0 on the source files (the owned test files carry the
consolidation's standing formatter reds, proved not-mine by the scratchpad-copy
method); `check:src:core` and `check:src:server` exit 0; the observational root
typecheck reports only the standing sites (the validators site shifted :98 to :100
under U3's import); `src:server` `395 passed | 5 skipped (400)` exit 0; `config`
`43 passed (43)` exit 0.

## Recorded limit

A process killed mid-mutation leaves the `#fill` `mkdtemp` root behind under the OS
temp directory — the same shape `stageInventory` already carries, now on a
consumer-facing write path. Carried to U5's guide narrative as a stated limit.

The `hexToContent` extraction was not needed: a value host's bytes reach the target as
bytes through `stageBytes`, never as decoded text; U2's carry stands for a third
consumer if one appears.
