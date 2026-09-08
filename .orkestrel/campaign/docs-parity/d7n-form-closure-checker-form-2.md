Lane held: checker form

**Claim 1 — scope honesty.** PASS. `d7n-form-close-2.status.txt` lists exactly `M guides/form.md`. `d7n-form-close-2.diff.txt` touches only two hunks in `guides/form.md`: the `Shape`-idiom convention sentence plus the three previously empty `Shape` cells (`Form`, `createForm`, `FormError`, `isFormError`) for item 1/2 (Rulings 26, 28), and the new `### Abandoning a parked answer` heading plus lead-in sentence before the second Park-as-Promise fence for item 3 (Rulings 21, 22). Nothing else appears in the diff; `tests/guides.test.ts` was not touched, consistent with the report's own statement that it "was not edited by this unit" (`d7n-form-close-2-report.md:71`).

**Claim 2 — report citations and no count in prose.** FAIL.
- Citation error: `d7n-form-close-2-report.md:40-41` cites the `FormError` constructor signature as "read from `src/core/errors.ts:29`". Direct read of `/home/user/fleet/form/src/core/errors.ts` shows line 29 is the doc-comment line `* @param context - Optional structured failure details.`; the actual constructor declaration `constructor(code: FormErrorCode, message: string, context?: JSONRecord) {` sits at line 31. This citation does not match the tree the unit left.
- The other three citations check out exactly: `src/core/factories.ts:33` is `export function createForm(schema: FormSchema, options?: FormOptions): FormInterface` (report line 31-32); `src/core/errors.ts:45` is `export function isFormError(input: unknown): input is FormError` (report line 33-34); `src/core/Form.ts:56` is `export class Form implements FormInterface` (report line 38-39).
- No count-in-prose violation found: every number in the report is a line-address citation (a permitted locator), not a count of a growable set.

**Claim 3 — first checker's findings closed in the tree.** PASS.
- No empty `Shape` cell remains in a table carrying the column: `guides/form.md:108,110,115,117` now hold `FormInterface`, the `createForm` signature, the constructor signature, and `FormError` respectively.
- Function row (`createForm`) holds its signature (Ruling 26); guard row (`isFormError`) holds the type it narrows to, `FormError` (Ruling 26).
- Class rows hold the interface implemented (`Form` → `FormInterface`, matching `src/core/Form.ts:56 export class Form implements FormInterface`) or the constructor signature where none is implemented (`FormError`) (Ruling 28).
- `FormEventMap` still holds bare member names `{ fill, validate, disable, enable, submit, clear, abandon }` (Ruling 19), unaffected by this diff and previously verified.
- The sibling-fence defect the first checker raised at `guides/form.md:1247-1249` (a second fence with no lead-in and no own heading under `### Park-as-Promise: \`answer\``) is closed: the tree now reads `### Park-as-Promise: \`answer\`` (line 1226) with its fence (1236-1249), then a new `### Abandoning a parked answer` heading (1251) with its own lead-in sentence (1253-1254) before the second fence (1256-1269) — satisfying Rulings 21 and 22.
- README fences (Ruling 24) sit directly under their headings in `/home/user/fleet/form/README.md`: `## Install` → fence, `## Development` → fence, with no intervening prose; `## Usage` carries a lead-in sentence before its fence, matching the pilot's shape.
- The drop-in's lines 1-3 in `/home/user/fleet/form/tests/guides.test.ts` equal the pilot `/home/user/fleet/abort/tests/guides.test.ts` lines 1-3 byte for byte. The region from `const root = ` (form line 105, pilot line 47) through the manifest loop's closing brace (form line 329, pilot line 258) is identical outside the package's own README-fence test block and its later flagship-fence `describe` block, confirmed by direct comparison of both files (Rulings 13, 20, 21). This finding is unaffected by the current diff, which touches only `guides/form.md`.

**Findings outside the claims.** None beyond the citation error recorded under Claim 2.

**Referrals.** None; the citation mismatch is mechanical (a location that does not match the file it names), not a judgment call.

VERDICT: FAIL 2
