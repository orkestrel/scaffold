# Fix dossier: form

Verified fix-producing findings for the `form` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s14-16 — DRIFT

16. package=form file=`/home/user/fleet/form/src/core/Form.ts:97-103`, `:116-121`, `:127-132`, `:160-165`, `:283-288`, `:457-462`, `:599-604`; `helpers.ts:435-440`, `:456-461`; `parsers.ts:28-33`, `:53-58`, `:67-72`, `:137-142` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice), § Kind purity verdict=CONFIRMED
    wrong: one six-line `Object.defineProperty(target, name, { value, enumerable: true, configurable: true, writable: true })` idiom — the prototype-safe record write — is copied across three files. It is non-trivial (its whole point is bypassing a `__proto__` setter) and reusable, so the rule requires one exported, unit-tested implementation with every duplicate routed through it. I checked the installed `@orkestrel/contract` declaration for an existing primitive: it exports `appendEntries` for the array form of this defect and nothing for the record form, so a local helper is correct rather than a reimplementation.
    repair: add `export function defineEntry(target: Record<string, T>, name: string, value: T): void` to `helpers.ts` (or a name the package prefers in `{verb}{Noun}` form), route all thirteen sites through it, and unit-test it against a `__proto__` key. Note `parsers.ts:137-142` writes `configurable: false, writable: false` and must keep that difference — give it its own second helper or a parameter, and do not flatten the two.

## s14-17 — DRIFT

17. package=form file=`/home/user/fleet/form/src/core/validators.ts:130-239` rule=`.claude/rules/architecture.md` § Kind purity, § System constraints verdict=CONFIRMED
    wrong: `isFormField` carries the permitted-key allowlist per control as inline array literals, and the `FieldBase` prefix (`control`, `name`, `label`, `help`, `group`, `hidden`, `disabled`, `locked`, `rule`, `meta`) is written out verbatim in each branch. That is module data living inside a guard, duplicated per control, and it silently drifts from `FieldBase` and the variant interfaces in `types.ts` the moment a member is added. The policy sweep cannot see it because the literals are function-scoped.
    repair: declare a frozen `FIELD_KEYS: Readonly<Record<FieldControl, readonly string[]>>` in `constants.ts`, composed from one `FIELD_BASE_KEYS` constant plus each control's own members, and have `isFormField` read `FIELD_KEYS[control]`. Table's single inline list at `table/src/core/validators.ts:93` is genuinely single-use and correctly folded into its caller, so it is not the same finding.

## s14-18 — DRIFT-RESHAPE

18. package=form file=`/home/user/fleet/form/src/core/validators.ts:417-427` rule=`AGENTS.md` § Design laws (derive state); `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
    wrong: `isFieldError` spells the named-rule list out as `literalOf('required', 'minimum', …)`, a third copy of a fact already stated by `FieldRule`'s members (`types.ts:140-151`, from which `FieldRuleName` is derived at line 160) and by `RULE_MESSAGES`'s keys (`constants.ts:27-37`). Adding a rule to `FieldRule` leaves this guard rejecting a `FieldError` the package itself produces, and nothing fails.
    repair: add `export const RULE_NAMES: readonly FieldRuleName[] = Object.freeze(Object.keys(RULE_MESSAGES))` to `constants.ts` — `RULE_MESSAGES` is already typed `Record<FieldRuleName, string>`, so the compiler holds it complete — and have `isFieldError` build its `rule` guard from that one source.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: delete the `RULE_NAMES` constant from the repair. In `validators.ts` replace the inline `literalOf(...)` with `keyOf(RULE_MESSAGES)` from `@orkestrel/contract`, importing `RULE_MESSAGES` from `./constants.js`. That derives the guard from the one typed source, adds no new export, and needs no type assertion.

**Lane DRIFT-RESHAPE/high:** amend: keep the single source but derive by membership, not by key list — add `export function isFieldRuleName(value: unknown): value is FieldRuleName { return isString(value) && Object.hasOwn(RULE_MESSAGES, value) }` to `validators.ts` and have `isFieldError` pass it as the `rule` guard. Do not add `RULE_NAMES` built from `Object.keys`; that line requires a banned `as`.

## s14-21 — DRIFT-RESHAPE

21. package=form file=`/home/user/fleet/form/src/core/helpers.ts:185-191`, `:225-231`, `:263-269`, `:283-289`, `:298-304`, `:309-315`, `:321-327`, `:331-337`, `:345-351`, `:359-365`, `:376-382` rule=`.claude/rules/architecture.md` § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
    wrong: `evaluateField` repeats one `errors.push(Object.freeze({ field: field.name, message: formatMessage(rule, operand, messages), rule }))` construction throughout its body, varying only the rule name and the operand. The value construction is a factory, and repeating it inline is what makes the function long enough to hide its logic.
    repair: add `createFieldError(field: FormField, rule: FieldRuleName, limit: number | string | undefined, messages?: …): FieldError` to `factories.ts` — a factory constructing a value, so `create*` is the required form and `factories.ts` the required file — and reduce each site to one `errors.push(createFieldError(...))` line. Keep the `custom` push at line 388 separate: it carries the validator's own message and no rule name.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: extract the construction as an exported pure leaf in `form/src/core/helpers.ts`, beside the `formatMessage` it already calls, not in `factories.ts`. Keep `factories.ts` holding `createForm` alone so the leaf pair stays free of any edge into a class-importing file. Everything else in the finding stands: reduce each of the eleven sites to one push, keep the `custom` push at `:388` separate, and unit-test the new leaf.

**Lane DRIFT-RESHAPE/high:** amend: put `createFieldError(field: FormField, rule: FieldRuleName, limit: number | string | undefined, messages?: Readonly<Partial<Record<FieldRuleName, string>>>): FieldError` in `helpers.ts` beside `formatMessage`, not in `factories.ts`, mirroring `createStringFaults`/`createNumberFaults`/`createArrayFaults` in `@orkestrel/contract`'s `helpers.ts`. Everything else in the finding — reducing each site to one `errors.push(...)` line and leaving the `custom` push at :388 alone — stands.

## s14-22 — DRIFT-RESHAPE

22. package=form file=`/home/user/fleet/form/src/core/validators.ts:271` (`isBoundedJSONRecord(meta)`), `cloners.ts:42` (`cloneJSONRecord(field.meta)`), `helpers.ts:792` (`attempt(() => node[key])` inside `auditSchema`) rule=`.claude/rules/patterns.md` § Foreign contracts verdict=CONFIRMED
    wrong: a caller-supplied `meta` record — foreign data this package carries but does not own until it clones — is read on the guard path, again on the audit walk, and again on the clone, and `Form`'s constructor runs all three in sequence (`Form.ts:80-90`). The rule fixes the discipline as own at arrival, validate the owned copy, and read the foreign object exactly once, because no result may depend on the read count. A `meta` carrying an accessor answers each read independently, so the value validated need not be the value stored.
    repair: clone `meta` once at the boundary and run the guard and the audit against the owned copy: have `Form`'s constructor take ownership through `cloneFormSchema` first, then validate and audit the owned schema. Whether an accessor-bearing `meta` is reachable through the shipped API and what it can achieve is a correctness question for the objective lane; this finding rules only that the read discipline the rule fixes is not followed.

### Verification

**Judge (DRIFT-RESHAPE/high):** I reproduced the exploit myself: it is real, and it defeats the EXCEPTION. The guide and the guard's `@remarks` document only the ACCESSOR case, which the clone refuses; a Proxy carrying a `get` trap over a data-descriptor target is a different case, and there the clone succeeds and stores a value t

**Lane DRIFT-RESHAPE/high:** amend: own first through a total step, then validate the owned copy. Wrap the ownership call so a non-`FormError` throw is mapped to `FormError('SCHEMA', 'The form schema is unusable: The schema is not a form schema')`, then run `isFormSchema` and `auditSchema` against the owned schema and store that same object. Mirror the clone-then-guard order `parseForm` already uses at `parsers.ts:23-83`. Do not call `cloneFormSchema` bare ahead of the guard.

**Lane EXCEPTION/medium:** drop

