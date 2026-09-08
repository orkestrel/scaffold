# Report — `d7n-contract-close`

## The predecessor's hunks

The predecessor left two hunks uncommitted in `/home/user/fleet/contract`, both ruled correct and kept as-is (no further edit needed):

1. **`tests/guides.test.ts` header (lines 2-3).** Changed from the tip's `"The constants below are this / package's own, and are the only part a sibling package changes."` to the pilot's `"The constants that follow are this / package's own, as is the executed section that closes the file."` Verified against `/home/user/fleet/abort/tests/guides.test.ts:2-3` byte for byte. Kept.
2. **`tests/guides.test.ts` equality case (formerly lines 205-211).** Removed the package's own `findDrift`-timing comment and the `}, 30_000)` override, restoring the case to the pilot's plain `})` with the default budget. Confirmed by re-running `npm run test:guides`, which passes the equality case under the default budget (Acceptance 6). Kept.

No hunk was discarded; both matched an item's requirement (item 3's byte-for-byte convergence with the pilot region).

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** Already complete on the resumed tree: convention sentences and `Shape` columns present for the tables at `guides/contract.md:198, 299, 359, 379, 487, 527, 599, 654` (verified by `grep -n 'A `Shape` cell holds' guides/contract.md`, eight matches). Verified every row the brief listed by name (`Failure`, `GuardShapeRead`, `BoundsRead`, `StringGuardOptions`, `ReadValueOptions`, `ContainOptions`, `ShapeProperty`, `Success`, the `*Shape`/`*ShapeOptions` families, `ContractCode`, `ContractErrorContext`, `ContractErrorOptions`, the cloner interfaces, `ShapeValidatorInterface`, `ContractInterface`, `ContractCompilerInterface`, the four function-type aliases, `Fault`, `ExtraFault`, `AuditFault`, `FaultKind`, `FaultConstraint`, the JSON-surface types) carries a correct bare-name brace cell, `plus` where a call-signature member exists (`{} plus clone`, `{ expansion } plus validate`, `{ schema, is } plus parse, audit, explain, generate`), and no member spells its type. No extended-interface row and no off-canon guard or constants table exist. No edit needed.
2. **Member references.** `npm run docs` reports `rows read: 1, disagreements found: 0`; no `{@link Owner#member}` / `{@link #member}` site disagrees. No edit needed.
3. **The drop-in's canon (Rulings 13 and 20).** Confirmed by direct diff of the `const root = ` line through the manifest loop's closing brace against `/home/user/fleet/abort/tests/guides.test.ts`'s same region: every difference is a package-specific binding permitted by the item (the `@src/core` import block, `FENCE_LANGUAGES` carrying `'text'`, `GUIDE_SPEC`, `MODULES`, and the populated `INTERNAL` list) — the shared body (`new URL('../', import.meta.url)`, `/Interface$/` with no flag, every comment, no per-case budget, `findDrift` called inside the `it`) matches byte for byte. The package-specific `RUNTIME_CLASSES` case sits after the manifest loop's closing brace, as required. Header lines 1-3 equal the pilot's; `INTERNAL`'s doc comment carries the pilot's sentence.
4. **Fence lead-ins (Ruling 21).** Confirmed present and correct: `### Narrowing `unknown`` → "Guard a value against each candidate type in turn, narrowing it before use." (`guides/contract.md:824`); `### Guards narrow, parsers coerce` → "A guard rejects a wrong-typed value outright, while a `*Field` parser reads a nested path and coerces it." (`:903`); `### Declaring a shape` → "Declare an object shape from the builders, then derive its static type with `Infer`." (`:958`).
5. **Propagation.** Confirmed at Acceptance 5.

## Acceptance criteria

1. `git status --short` → `M guides/contract.md`, `M tests/guides.test.ts`. Owned files only.
2. `grep -n '| interface *| `{[^`]*:' guides/contract.md` → no output. `grep -n '…' guides/contract.md` → only prose/code-fence occurrences (`Guard<…>` in running text, inline code-comment ellipses), none inside a `Shape` cell.
3. Region diff against the pilot (`const root = ` through the manifest loop's closing brace) prints only the permitted package-specific bindings listed above; the manifest loop body and every comment match byte for byte; lines 2-3 equal the pilot's.
4. `npx oxfmt --check guides/contract.md tests/guides.test.ts` → "All matched files use the correct format." exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, no output.
5. `npm run docs` → `rows read: 1, disagreements found: 0` exit 0. `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`. `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 70 passed (70)`, `Duration 2.08s`, exit 0 — the equality case ran under the default budget (no per-case override in the file). `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, `Duration 1.28s`, exit 0.

Wall clock for this unit's own commands: `npm run docs` 5.325s; `npx oxfmt --check` 1238ms; `npx oxlint` well under a second; `npm run test:guides` 6.835s; `npm run test:policy` 1.921s.

## Deviations

None. No `Shape` cell Ruling 12 could not express, the equality case is green under the default budget, no gate outside the owned files went red, and `npm run docs` reported zero disagreements throughout.
