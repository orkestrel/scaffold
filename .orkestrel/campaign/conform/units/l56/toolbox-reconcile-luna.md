## Question

Map every `CONFIRMED` refuter ruling to reconciliation rules 1–3 and sweep breaking identifiers for real consumers.

## Evidence

### `toolbox-obj-1` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `relationKeyShape` — no source consumer.
- Basis: “Delete `relationKeyShape` and its TSDoc…”

### `toolbox-obj-2` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-3` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-4` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-5` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-6` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-7` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-obj-8` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-1` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `TerminalBridge`, `TerminalBridgeOptions` — no source consumer.
- Basis: “Delete `export * from './terminals/TerminalBridge.js'`…” and “Rename the interface `TerminalBridgeOptions` to `TerminalRoutesOptions`…”

### `toolbox-subj-2` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `databaseToolCode`, `relationToolCode` — no source consumer.
- Basis: “Rename `databaseToolCode` to `inferDatabaseCode`…” and “`relationToolCode` to `inferRelationCode`…”

### `toolbox-subj-3` — breaking: false
- Fold candidate: none; the related rulings name a shared writer, not a unique carrier.
- Off-limits repair: none.
- Consumer-only repair: none.
- Basis: “Delete the version numeral from each claim…”

### `toolbox-subj-4` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-5` — breaking: false
- Fold candidate: `toolbox-subj-8`; “constants.ts:226: delete the leading `Net-new: ` and, per toolbox-subj-8, name the constants it already links instead of counting them.”
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-6` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `invoke` — no source consumer; other word-boundary hits are unrelated prose, comments, or APIs.
- Basis: “Rename the member `invoke` to `execute`…”

### `toolbox-subj-7` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `ColumnKind`, `isColumnKind`, `compileColumnKind`, `columnKindShape`, and `type` — no source consumer; generic `type` hits are unrelated domain fields or prose.
- Basis: “Rename the type `ColumnKind` to `ColumnPrimitive`…” and “the member `type` to `primitive`…”

### `toolbox-subj-8` — breaking: false
- Fold candidate: `toolbox-subj-5`; “constants.ts:226 is also touched by toolbox-subj-5 … give both edits to one writer.”
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-9` — breaking: false
- Fold candidate: none; `guides/toolbox.md:348` is shared with related rulings, but no unique carrier is named.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-11` — breaking: false
- Fold candidate: none; `guides/toolbox.md:348` is shared with related rulings, but no unique carrier is named.
- Off-limits repair: none.
- Consumer-only repair: none.

### `toolbox-subj-12` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.

## Distillate

- CONFIRMED ids: `toolbox-obj-1`, `toolbox-obj-2`, `toolbox-obj-3`, `toolbox-obj-4`, `toolbox-obj-5`, `toolbox-obj-6`, `toolbox-obj-7`, `toolbox-obj-8`, `toolbox-subj-1`, `toolbox-subj-2`, `toolbox-subj-3`, `toolbox-subj-4`, `toolbox-subj-5`, `toolbox-subj-6`, `toolbox-subj-7`, `toolbox-subj-8`, `toolbox-subj-9`, `toolbox-subj-11`, `toolbox-subj-12`.
- Rule 1 flagged: `toolbox-subj-5`, `toolbox-subj-8`.
- Rule 2 flagged: none.
- Rule 3 flagged: none.
- Checkouts with source consumers: none.
- No vendored `guides/toolbox.md` mirror exists outside `toolbox`.
- Sites the sweep could not read: none.

## Unknowns

None.

## Journal

Driver-owned.

## Deviation

None in `/home/user/fleet/toolbox`.