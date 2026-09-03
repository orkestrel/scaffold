## Question
Map every `CONFIRMED` refuter ruling against the reconciliation rules and breaking sweep.

## Evidence

### lsp-obj-2
breaking: `false` (`/home/user/work/reports/conform-lsp.json:306`)

Ground: “Import `createScratch` from `@orkestrel/test/server` when a proof needs real files.” (`/home/user/work/reports/conform-lsp.json:302`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-obj-3
breaking: `false` (`/home/user/work/reports/conform-lsp.json:314`)

Ground: “Confirm each assertion would fail for the defect it claims to catch.” (`/home/user/work/reports/conform-lsp.json:310`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-obj-5
breaking: `false` (`/home/user/work/reports/conform-lsp.json:330`)

Ground: “Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.” (`/home/user/work/reports/conform-lsp.json:326`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-obj-6
breaking: `false` (`/home/user/work/reports/conform-lsp.json:338`)

Ground: “Measure an elapsed interval with `performance.now()`, never `Date.now()`.” (`/home/user/work/reports/conform-lsp.json:334`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-obj-7
breaking: `false` (`/home/user/work/reports/conform-lsp.json:346`)

Ground: “`tests/integration.test.ts` drives features across environments.” (`/home/user/work/reports/conform-lsp.json:342`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-1
breaking: `false` (`/home/user/work/reports/conform-lsp.json:354`)

Ground: “Add `readonly on?: EmitterHooks<{Entity}EventMap>` and `readonly error?: EmitterErrorHandler` to options.” (`/home/user/work/reports/conform-lsp.json:350`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-2
breaking: `false` (`/home/user/work/reports/conform-lsp.json:362`)

Ground: “State a prerequisite and the failure behavior wherever the symbol has either.” (`/home/user/work/reports/conform-lsp.json:358`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-3
breaking: `false` (`/home/user/work/reports/conform-lsp.json:370`)

Ground: “A row obliges a documented, runnable example, so a class kept public without one is drift that parity cannot see.” (`/home/user/work/reports/conform-lsp.json:366`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-4
breaking: `false` (`/home/user/work/reports/conform-lsp.json:378`)

Ground: “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.” (`/home/user/work/reports/conform-lsp.json:374`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-5
breaking: `false` (`/home/user/work/reports/conform-lsp.json:386`)

Ground: “These rules govern prose a developer reads, including chat replies, reports, guides, README files, and commit messages.” (`/home/user/work/reports/conform-lsp.json:382`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-6
breaking: `false` (`/home/user/work/reports/conform-lsp.json:394`)

Ground: “Give the reader what they need for the task at hand, and nothing else.” (`/home/user/work/reports/conform-lsp.json:390`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-7
breaking: `false` (`/home/user/work/reports/conform-lsp.json:402`)

Ground: “A declared wire body — a type whose members transliterate an external wire format field for field — keeps the external field names, `type` and `kind` included, and its TSDoc names the format it transliterates.” (`/home/user/work/reports/conform-lsp.json:398`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

### lsp-subj-8
breaking: `false` (`/home/user/work/reports/conform-lsp.json:410`)

Ground: “An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing, and its TSDoc names the source it mirrors.” (`/home/user/work/reports/conform-lsp.json:406`)

- Fold candidate (rule 1): `none`
- Off-limits repair (rule 2): `none`
- Consumer-only repair (rule 3): `none`
- Breaking sweep: not applicable; `breaking` is `false`.

## Distillate
- Confirmed IDs: `lsp-obj-2`, `lsp-obj-3`, `lsp-obj-5`, `lsp-obj-6`, `lsp-obj-7`, `lsp-subj-1`, `lsp-subj-2`, `lsp-subj-3`, `lsp-subj-4`, `lsp-subj-5`, `lsp-subj-6`, `lsp-subj-7`, `lsp-subj-8`.
- Rule 1 flagged IDs: `none`.
- Rule 2 flagged IDs: `none`.
- Rule 3 flagged IDs: `none`.
- Source-consumer checkouts: `none`.
- Sites the sweep could not read: `none`; no confirmed ruling has `breaking: true`.

## Unknowns
none.

## Journal
left for the driver.

## Deviation
none.