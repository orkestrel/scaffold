## Question

Map every `CONFIRMED` ruling against rules 1–3 and identify consumers of breaking identifiers.

## Evidence

### `worker-obj-1`

- `breaking`: `true`
- Fold candidate: `worker-obj-1`; `worker-subj-4` names it as “the single carrier for this symbol's fate” ([conform-worker.json:572](/home/user/work/reports/conform-worker.json:572)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: `spawnThread` → `createThread`; `dispatch` wrapper removed. No source consumer and no mirror hit.

### `worker-obj-2`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-3`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-6`

- `breaking`: `false`
- Fold candidate: `none`; its dependency on `worker-obj-1` is sequencing, not the same defect and edit.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-7`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-8`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-9`

- `breaking`: `false`
- Fold candidate: `none`; the referenced fence changes have distinct operative edits.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-10`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-obj-11`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-1`

- `breaking`: `false`
- Fold candidate: `worker-subj-11` — “`src/server/types.ts:10-11` is owned by worker-subj-11, whose repair deletes that whole sentence” ([conform-worker.json:548](/home/user/work/reports/conform-worker.json:548)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-2`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-4`

- `breaking`: `true`
- Fold candidate: `worker-obj-1` — “its repair deletes the `dispatch` wrapper and publishes the `Dispatch` class instead” ([conform-worker.json:572](/home/user/work/reports/conform-worker.json:572)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: `dispatch` is removed by the `worker-obj-1` carrier. No source consumer and no mirror hit.

### `worker-subj-6`

- `breaking`: `false`
- Fold candidate: `none`; its default-wording edits and `worker-subj-15`'s `workerData` edit differ.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-8`

- `breaking`: `false`
- Fold candidate: `worker-subj-9` — “worker-subj-9, which owns temporal `once` at `:84`” ([conform-worker.json:604](/home/user/work/reports/conform-worker.json:604)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-9`

- `breaking`: `false`
- Fold candidate: `worker-subj-9`; `worker-subj-8` assigns it ownership of the temporal `once` edit ([conform-worker.json:604](/home/user/work/reports/conform-worker.json:604)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-10`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-11`

- `breaking`: `false`
- Fold candidate: `worker-subj-11`; `worker-subj-1` states that its repair owns `src/server/types.ts:10-11` ([conform-worker.json:548](/home/user/work/reports/conform-worker.json:548)).
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-13`

- `breaking`: `false`
- Fold candidate: `none`; the fence-body edit differs from `worker-obj-1`'s symbol move and `worker-obj-9`'s transcription.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-14`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

### `worker-subj-15`

- `breaking`: `false`
- Fold candidate: `none`; the `workerData` documentation, default wording, and `via` substitution are distinct edits.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Breaking sweep: not applicable.

## Distillate

- Confirmed ids: `worker-obj-1`, `worker-obj-2`, `worker-obj-3`, `worker-obj-6`, `worker-obj-7`, `worker-obj-8`, `worker-obj-9`, `worker-obj-10`, `worker-obj-11`, `worker-subj-1`, `worker-subj-2`, `worker-subj-4`, `worker-subj-6`, `worker-subj-8`, `worker-subj-9`, `worker-subj-10`, `worker-subj-11`, `worker-subj-13`, `worker-subj-14`, `worker-subj-15`.
- Rule 1 flagged: `worker-obj-1` / `worker-subj-4`; `worker-subj-1` / `worker-subj-11`; `worker-subj-8` / `worker-subj-9`.
- Rule 2 flagged: `none`.
- Rule 3 flagged: `none`.
- Breaking identifiers: `spawnThread` → `createThread`; `dispatch` removed.
- Source-consumer checkouts: `none`.
- Mirror hits: `none`.
- Sweep sites unreadable: `none`.

## Unknowns

none

## Journal

Leave for the driver.

## Deviation

none