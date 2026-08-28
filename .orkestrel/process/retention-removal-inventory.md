# Inventory: every edit the `Retention` removal obliges

The owner ruled on 2026-08-28, after being shown that `Retention` is published API, that the class
is removed and its accounting folded into `execute`. This inventory is the complete set of places
that ruling reaches, read first-hand from the tree. The fold shape itself is ruled separately.

## Source

- `src/server/Retention.ts` — the whole file. Delete.
- `src/server/types.ts:63-78` — the `RetentionInterface` declaration. Delete.
- `src/server/types.ts:1` — `import type { Buffer } from 'node:buffer'`. Its only other use is
  `RetentionInterface.retain` at line 76, so the import goes with it. Verified by search.
- `src/server/index.ts:4` — `export * from './Retention.js'`. Delete.
- `src/server/execution/execute.ts:12,99,100,132,167,171` — the import, the two instances, the
  `truncated` read, and the two `retain` calls. Replaced by the folded shape.

## Tests

- `tests/src/server/Retention.test.ts` — the whole file. Delete, and land its proof on the
  replacement per the owner's requirement that the hardening survive.
- `tests/guides.test.ts:48` — the `Retention` import.
- `tests/guides.test.ts:106-107` — the `Retention` and `RetentionInterface` rows in `REFUSALS`.
  That list is compared against the neighbouring face's published surface, so it fails if the rows
  stay after the exports go.
- `tests/guides.test.ts:543-549` — the flagship-fence transcription asserting the guide's
  `Retention` example, including `delivered`.
- `tests/guides.test.ts:1294-1299` — the second executed assertion of the same example.

## Guide

- `guides/process.md:78` — the `Retention` class row in the Surface table.
- `guides/process.md:209` — the `RetentionInterface` row in the types table.
- `guides/process.md:226-241` — the `#### RetentionInterface` section: its prose, its method
  table, and its runnable example fence.
- `guides/process.md:1480-1481` — the `tests/src/server/Retention.test.ts` inventory bullet.

## Survives

- `guides/process.md:119` — the `### Retention helpers` heading. It groups `trimHead`, `trimTail`,
  and `buildExecuteResult`, which are byte-bounding helpers rather than the class. It stays, and
  it is where a new retention helper is documented.

## Consequence for the release

Removing `Retention` and `RetentionInterface` deletes two names from the published
`@orkestrel/process/server` surface. That is a material change to the distributable and a breaking
change for any consumer importing either name, so it obliges a version bump and a publish. This is
the opposite of the relocation's own reading, which obliges neither.
