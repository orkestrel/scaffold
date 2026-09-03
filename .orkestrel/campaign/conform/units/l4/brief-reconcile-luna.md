## Question

Map every `CONFIRMED` refuter ruling against the four reconciliation rules and identify source consumers of breaking changes.

## Evidence

### `brief-obj-1`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Place `import type` declarations before value imports.” (`.claude/rules/typescript.md`, Syntax and imports)

### `brief-obj-3`

- `breaking`: `true`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Absence is `undefined`. Never invent sentinels such as `''`.” (`/home/user/scaffold/AGENTS.md`, Design laws)
- Breaking sweep: No identifier is renamed or removed. The changed export `deriveStatement` has no source consumer outside `/home/user/fleet/brief`.

### `brief-obj-4`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “That proof has a home: `tests/guides.test.ts` executes the flagship fences.” (`/home/user/scaffold/.claude/rules/documentation.md`, Parity)

### `brief-subj-1`

- `breaking`: `true`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Module helpers ... default to `{verb}{Noun}`.” (`/home/user/scaffold/.claude/rules/names.md`, Standalone helpers)
- Breaking sweep: `task→buildTask`, `reference→buildReference`, `manifest→buildManifest`, `outcome→buildOutcome`, `given→buildGiven`, `example→buildExample`, `citation→buildCitation`, `gap→buildGap`, `risk→buildRisk`, `output→buildOutput`, `proof→buildProof`, `brief→buildBrief`, `gateDefinition→buildGateDefinition`. No source consumer outside `/home/user/fleet/brief`; no mirror hit.

### `brief-subj-2`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Falsify a prose claim the way you falsify a code claim.” (`/home/user/scaffold/.claude/rules/documentation.md`, Parity)

### `brief-subj-3`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “A sentence about behavior must be true of the code.” (`/home/user/scaffold/.claude/rules/documentation.md`, Parity)

### `brief-subj-4`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Generic words: `data`, `info`, `item`, `thing`, `obj`.” (`/home/user/scaffold/.claude/rules/names.md`, Rejected naming)

### `brief-subj-5`

- `breaking`: `false`
- Fold candidate: `brief-subj-5 ↔ brief-subj-6`. The overlapping repair is named by `brief-subj-6`: “helpers.ts:100 takes the combined form in brief-subj-5.”
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Describe a boolean parameter as ‘If `true`, …; if `false`, …’.” (`/home/user/scaffold/.claude/rules/typescript.md`, Comments and API documentation)

### `brief-subj-6`

- `breaking`: `false`
- Fold candidate: `brief-subj-5 ↔ brief-subj-6`. The overlapping repair is named by `brief-subj-5`: “Apply the same form to the `blocking` field wherever brief-subj-6's repair rewrites the gap block.”
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Write a default as ‘Default: …’.” (`/home/user/scaffold/.claude/rules/typescript.md`, Comments and API documentation)

### `brief-subj-7`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “One concept, one term. Do not alternate synonyms.” (`/home/user/scaffold/AGENTS.md`, Design laws)

### `brief-subj-8`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “One concept, one term. Do not alternate synonyms.” (`/home/user/scaffold/AGENTS.md`, Design laws)

### `brief-subj-9`

- `breaking`: `false`
- Fold candidate: `none`.
- Off-limits repair: `none`.
- Consumer-only repair: `none`.
- Basis: “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.” (`/home/user/scaffold/.claude/rules/typescript.md`, Comments and API documentation)

## Distillate

- CONFIRMED ids: `brief-obj-1`, `brief-obj-3`, `brief-obj-4`, `brief-subj-1`, `brief-subj-2`, `brief-subj-3`, `brief-subj-4`, `brief-subj-5`, `brief-subj-6`, `brief-subj-7`, `brief-subj-8`, `brief-subj-9`.
- Rule 1 flagged: `brief-subj-5`, `brief-subj-6`.
- Rule 2 flagged: none.
- Rule 3 flagged: none.
- Rule 4 flagged: `brief-obj-3`, `brief-subj-1`.
- Source-consumer checkouts: none.
- The sweep could not read: none.

## Unknowns

none

## Journal

## Deviation

none