## Question
Map every `CONFIRMED` ruling against the reconciliation rules and sweep breaking identifiers for fleet consumers.

## Evidence

### `program-obj-1` — breaking: false
- Fold candidate: `program-obj-7` — “with `isArray<Subject>(subjectsOrSubject)` (`program-obj-7`)”.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-2` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-3` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-4` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-5` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-6` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-7` — breaking: false
- Fold candidate: `program-obj-1` — “inside the `RecordingReason.reason` implementation that `program-obj-1` introduces”.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-8` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-obj-9` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-1` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-2` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `STATUS_PRECEDENCE` — no hit outside `program`; no source consumer.

### `program-subj-3` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `buildNotices`, `buildLimits` — no hit outside `program`; no source consumer.

### `program-subj-4` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `size` — word-boundary hits occur in unrelated fleet and scaffold APIs and prose; no hit is a consumer of `ProgramManagerInterface.size`, and no mirror hit exists.

### `program-subj-5` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-6` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-7` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-8` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-9` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-10` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-11` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-12` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-13` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `by` — word-boundary hits occur as ordinary prose and unrelated identifiers; no hit is a consumer of `AggregateInput.by` or `AggregateDefinition.by`, and no mirror hit exists.

### `program-subj-14` — breaking: false
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `program-subj-16` — breaking: true
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: `tallyProgram` — no hit outside `program`; no source consumer.

## Distillate
- Confirmed ids: `program-obj-1`, `program-obj-2`, `program-obj-3`, `program-obj-4`, `program-obj-5`, `program-obj-6`, `program-obj-7`, `program-obj-8`, `program-obj-9`, `program-subj-1`, `program-subj-2`, `program-subj-3`, `program-subj-4`, `program-subj-5`, `program-subj-6`, `program-subj-7`, `program-subj-8`, `program-subj-9`, `program-subj-10`, `program-subj-11`, `program-subj-12`, `program-subj-13`, `program-subj-14`, `program-subj-16`.
- Rule 1 flagged: `program-obj-1`, `program-obj-7`.
- Rule 2 flagged: none.
- Rule 3 flagged: none.
- Breaking rulings: `program-subj-2`, `program-subj-3`, `program-subj-4`, `program-subj-13`, `program-subj-16`.
- Source-consumer checkouts: none.
- Unrelated lexical hits: `size` and `by` across fleet and scaffold sources and documentation.
- Mirror hits: none.
- Sweep sites unreadable: none.

## Unknowns
none

## Journal
Leave for the driver.

## Deviation
none