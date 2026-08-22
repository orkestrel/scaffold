# Unit fetch-U1 deviation: a live concurrent writer in the scaffold checkout

Recorded 2026-08-22. U1 (Sol implementer, the digest chain and committed inventory)
stopped under its deviation contract with two findings; the Orchestrator's triage
follows.

## Finding 1 — a brief scope error, ordinary

`ManifestEntry.digest` makes `buildManifestEntry` in `tests/setupServer.ts` false, and
the brief did not grant that file. The resume amendment grants it. U1's evidence
survives: digest emission red `1 failed | 156 skipped` then green
`1 passed | 160 skipped`; the membership control green; the staleness gate red
`Error: The committed host inventory is stale at guides/scaffold.md` then
`43 passed` after regeneration; `host-inventory: entries=108`; the probe restoration
digest recorded.

## Finding 2 — a second live writer, campaign-stopping

U1 observed `ScratchInterface` edits appearing in `tests/setupServer.ts` during its
run. The Orchestrator verified: the tree carries the test-helper consolidation stream's
work — the local `TestWorkspaceInterface` family deleted, `ScratchInterface` adopted
from `@orkestrel/test/server`, sweep edits across `Materializer.test.ts`,
`WriteTransaction.test.ts`, `main.test.ts`, and `config.test.ts` — and the dirty set
CHANGED between two consecutive Orchestrator readings, so the writer is live now.
`tests/src/server/helpers.test.ts` carries both campaigns' edits in one file.

## State preserved

- The complete mixed diff: `tmp/collision/mixed-tree-2026-08-22.patch` (2089 lines),
  with the status listing beside it.
- U1's landed surface by file, from its brief scope and report: `package.json` (the
  regeneration script), `src/core/constants.ts` (`HOST_INVENTORY_PATH`),
  `src/server/helpers.ts` (digest emission, `hexToDigest`, `stageInventory`),
  `src/server/types.ts` (`ManifestEntry.digest`), `src/server/validators.ts`,
  `guides/scaffold.md` (table rows), the untracked `host.json`, the staleness gate in
  `tests/config.test.ts`, and part of `tests/src/server/helpers.test.ts`.

## Ruling

No writer dispatches into this checkout until the concurrent stream is committed or
paused — writer serialization cannot hold against a writer this session does not
control, and the immediate hazard runs both ways: either session's blanket commit would
take the other's partial work. The campaign holds at U1-partial; the resume path is the
brief amendment granting `tests/setupServer.ts` plus a fresh dispatch from a clean
committed baseline. The user coordinates the sessions.
