## Question

Map every `CONFIRMED` refuter ruling against the reconciliation rules and sweep breaking identifiers for source consumers.

## Evidence

### relation-obj-1 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:407-412`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-2 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:415-420`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-3 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:423-428`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-4 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:431-436`
- Fold candidate: `relation-obj-4`; `relation-subj-12` names it: “same single-carrier constraint as relation-obj-4: one brief, one sentence.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-5 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:439-444`
- Fold candidate: `relation-obj-5`; `relation-subj-11` names it: “this row and relation-obj-5 are one edit to one line.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-6 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:447-452`
- Fold candidate: `relation-obj-6`; `relation-subj-7` says it is “merged with relation-obj-6 under one carrier.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-obj-8 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:463-468`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-2 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:479-484`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-3 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:487-492`
- Fold candidate: `relation-subj-10` for the shared README and guide wording: “Apply the same wording chosen in relation-subj-3 so the two edits agree.”
- Fold candidate: `relation-subj-3` for `src/core/types.ts:23`; `relation-subj-15` refers to “the same edit relation-subj-3 makes to this line.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-4 — breaking: true
Ruling: `/home/user/work/reports/conform-relation.json:495-500`
- Fold candidate: none.
- Off-limits repair: `package.json` version field — “The rename moves the published type surface and earns the version bump.”
- Consumer-only repair: none.
- Breaking sweep:
  - Renamed identifier: `RelationProps` → `LoadedMap`.
  - `RelationProps`: no source consumer.

### relation-subj-5 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:503-508`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-6 — breaking: true
Ruling: `/home/user/work/reports/conform-relation.json:511-516`
- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep:
  - Removed identifier: `TKey`.
  - `TKey`: no source consumer.

### relation-subj-7 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:519-524`
- Fold candidate: `relation-obj-6`; “merged with relation-obj-6 under one carrier.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-9 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:535-540`
- Fold candidate: none; overlapping sites have different operative changes.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-10 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:543-548`
- Fold candidate: `relation-subj-3` — “Apply the same wording chosen in relation-subj-3 so the two edits agree.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-11 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:551-556`
- Fold candidate: `relation-obj-5` — “this row and relation-obj-5 are one edit to one line.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-12 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:559-564`
- Fold candidate: `relation-obj-4` — “same single-carrier constraint as relation-obj-4: one brief, one sentence.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-13 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:567-572`
- Fold candidate: none; overlapping sites have different operative changes.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-14 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:575-580`
- Fold candidate: none; its dependency on `relation-subj-5` is sequencing, not the same site and change.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### relation-subj-15 — breaking: false
Ruling: `/home/user/work/reports/conform-relation.json:583-588`
- Fold candidate: `relation-subj-3` — “the same edit relation-subj-3 makes to this line — one carrier, one sentence.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

## Distillate

- Confirmed ids: `relation-obj-1`, `relation-obj-2`, `relation-obj-3`, `relation-obj-4`, `relation-obj-5`, `relation-obj-6`, `relation-obj-8`, `relation-subj-2`, `relation-subj-3`, `relation-subj-4`, `relation-subj-5`, `relation-subj-6`, `relation-subj-7`, `relation-subj-9`, `relation-subj-10`, `relation-subj-11`, `relation-subj-12`, `relation-subj-13`, `relation-subj-14`, `relation-subj-15`.
- Rule 1 flagged: `relation-obj-4`, `relation-subj-12`, `relation-obj-5`, `relation-subj-11`, `relation-obj-6`, `relation-subj-7`, `relation-subj-3`, `relation-subj-10`, `relation-subj-15`.
- Rule 2 flagged: `relation-subj-4`.
- Rule 3 flagged: none.
- Source-consumer checkouts: none.
- Breaking sweep identifiers: `RelationProps`, `TKey`; neither has a source consumer.

## Unknowns

none.

## Journal

left for the driver.

## Deviation

none.