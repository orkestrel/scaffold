## Question
Reconcile every `CONFIRMED` ruling in `refuter.rulings` against the fixed rules and sweep breaking identifiers across the specified fleet paths.

## Evidence

### `qualifier-obj-1`
- `breaking`: `true`
- Fold candidate: `qualifier-subj-3`; shared carrier `qualifier-obj-1`. Clause: “Same defect as qualifier-obj-1 with the correct names; one carrier.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: Renames `qualificationDefinition` → `createQualificationDefinition` and `rulingDefinition` → `createRuling`.  
  - `/home/user/fleet/program/guides/qualifier.md:35,42,44,73,74,226,227,246,288,304,305,312,313,329,336,337,368,374,375,453,505,534,540,568,570,595,614,717,723,727,731` — `mirror`
  - `/home/user/fleet/program/tests/setup.test.ts:22,176,180`
  - `/home/user/fleet/program/tests/src/core/helpers.test.ts:76,477,478,496,497,510,523,609,626,647,666,667,690,691,709,730,746,759,777`
  - `/home/user/fleet/program/tests/src/core/factories.test.ts:4,15,17,35,36,45,70,90`
  - `/home/user/fleet/program/tests/src/core/validators.test.ts:34,493`
  - `/home/user/fleet/program/tests/src/core/programs/Program.test.ts:64,434,435,445,887,914,935,959,1018`
  - `/home/user/fleet/program/tests/src/core/programs/ProgramManager.test.ts:13,14,83,85`
  - `/home/user/fleet/program/tests/setup.ts:15,530,536,554,560,595,597,630,642,648,667,674,723,729,801,807,853,942,948,952`
  - `/home/user/fleet/program/README.md:31,50,56`
  - `/home/user/fleet/rater/tests/src/core/Rater.test.ts:105` — negative-presence assertion, not a consumer

### `qualifier-obj-2`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-3`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-4`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-5`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-6`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-7`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-8`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-9`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-obj-10`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-1`
- `breaking`: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: Renames `describeComparison` → `renderComparison`, `describeValue` → `renderValue`, and `describePremise` → `renderPremise`. Clause: “Rename describeComparison → renderComparison, describeValue → renderValue, describePremise → renderPremise.”
  - `/home/user/fleet/program/guides/qualifier.md:206,207,208,231` — `mirror`
  - `/home/user/fleet/rater/tests/src/core/Rater.test.ts:115,116,117` — negative-presence assertion, not a consumer

### `qualifier-subj-2`
- `breaking`: `true`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: Renames `premiseCheck` → `checkToPremise` and `logicalPremises` → `ruleToPremises`. Clause: “Rename premiseCheck → checkToPremise and logicalPremises → ruleToPremises.”
  - `/home/user/fleet/program/src/core/helpers.ts:34,228,265`
  - `/home/user/fleet/program/guides/qualifier.md:209,210,232` — `mirror`
  - `/home/user/fleet/rater/tests/src/core/Rater.test.ts:119,137` — negative-presence assertion, not a consumer

### `qualifier-subj-3`
- `breaking`: `true`
- Fold candidate: `qualifier-obj-1`; shared carrier `qualifier-obj-1`. Clause: “One row shared with qualifier-subj-3.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: Renames `qualificationDefinition` → `createQualificationDefinition` and `rulingDefinition` → `createRuling`.
  - `/home/user/fleet/program/guides/qualifier.md:35,42,44,73,74,226,227,246,288,304,305,312,313,329,336,337,368,374,375,453,505,534,540,568,570,595,614,717,723,727,731` — `mirror`
  - `/home/user/fleet/program/tests/setup.test.ts:22,176,180`
  - `/home/user/fleet/program/tests/src/core/helpers.test.ts:76,477,478,496,497,510,523,609,626,647,666,667,690,691,709,730,746,759,777`
  - `/home/user/fleet/program/tests/src/core/factories.test.ts:4,15,17,35,36,45,70,90`
  - `/home/user/fleet/program/tests/src/core/validators.test.ts:34,493`
  - `/home/user/fleet/program/tests/src/core/programs/Program.test.ts:64,434,435,445,887,914,935,959,1018`
  - `/home/user/fleet/program/tests/src/core/programs/ProgramManager.test.ts:13,14,83,85`
  - `/home/user/fleet/program/tests/setup.ts:15,530,536,554,560,595,597,630,642,648,667,674,723,729,801,807,853,942,948,952`
  - `/home/user/fleet/program/README.md:31,50,56`
  - `/home/user/fleet/rater/tests/src/core/Rater.test.ts:105` — negative-presence assertion, not a consumer

### `qualifier-subj-4`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-5`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-6`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-7`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-8`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-9`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-10`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-11`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-13`
- `breaking`: `false`
- Fold candidate: `qualifier-obj-6`; shared carrier `qualifier-obj-6`. Clause: “This is the single carrier for qualifier-subj-13.”
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

### `qualifier-subj-14`
- `breaking`: `false`
- Fold candidate: `none`
- Off-limits repair: `none`
- Consumer-only repair: `none`
- Breaking sweep: `not applicable`

## Distillate
- Confirmed ids: `qualifier-obj-1`, `qualifier-obj-2`, `qualifier-obj-3`, `qualifier-obj-4`, `qualifier-obj-5`, `qualifier-obj-6`, `qualifier-obj-7`, `qualifier-obj-8`, `qualifier-obj-9`, `qualifier-obj-10`, `qualifier-subj-1`, `qualifier-subj-2`, `qualifier-subj-3`, `qualifier-subj-4`, `qualifier-subj-5`, `qualifier-subj-6`, `qualifier-subj-7`, `qualifier-subj-8`, `qualifier-subj-9`, `qualifier-subj-10`, `qualifier-subj-11`, `qualifier-subj-13`, `qualifier-subj-14`
- Rule 1 flagged: `qualifier-obj-1`, `qualifier-subj-3`, `qualifier-obj-6`, `qualifier-subj-13`
- Rule 2 flagged: `none`
- Rule 3 flagged: `none`
- Rule 4 flagged: `qualifier-obj-1`, `qualifier-subj-1`, `qualifier-subj-2`, `qualifier-subj-3`
- Source-consumer checkout: `program`
- Non-consumer sweep hits: `rater` negative-presence assertions
- Unreadable sweep sites: `none`

## Unknowns
`none`

## Journal
Leave for the driver.

## Deviation
`none`