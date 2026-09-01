# Fix report: form

## Dispositions

- **s14-16** applied (src/core/helpers.ts, src/core/Form.ts, src/core/parsers.ts, tests/src/core/helpers.test.ts, tests/src/core/index.test.ts, guides/form.md): Re-verified: 12 mutable sites and 1 sealed site were still present. Added the exported leaves `defineEntry` and `freezeEntry` to helpers.ts and routed all 13 sites through them (Form.ts 7, helpers.ts 2, parsers.ts 4). Kept the two descriptor shapes apart as the finding requires: `freezeEntry` alone writes `configurable: false, writable: false` for parsers.ts `parseValues`. Ancillary choices mine: the second helper is named `freezeEntry` because a frozen property is exactly non-writable plus non-configurable; the pair sits at the top of helpers.ts ahead of `matchesField`. The `values` getter now walks `Object.entries(this.#values)` rather than `Object.keys` plus an index read, because `noUncheckedIndexedAccess` types the index read as possibly absent and the leaf takes a present value; the answer population is identical. Unit-tested both leaves against a `__proto__` key, including the contrast that plain assignment creates no own entry there. Both are additive exports, so the barrel reaches them under new names and the guide Helpers table and the barrel inventory test were updated.
- **s14-17** applied (src/core/constants.ts, src/core/validators.ts, tests/src/core/constants.test.ts, tests/src/core/index.test.ts, guides/form.md): Re-verified: the per-control inline allowlists were still in `isFormField`. Added `FIELD_BASE_KEYS` and the frozen `FIELD_KEYS: Readonly<Record<FieldControl, readonly string[]>>` to constants.ts, each control's entry composed from `FIELD_BASE_KEYS` plus its own members. `isFormField` now reads `FIELD_KEYS[control]`, dropping about 115 lines of branch. I checked every list against `FieldBase` and the twelve variant interfaces in types.ts before moving them; all matched, so this is a move rather than a behavior change. Both constants are additive exports, documented in the guide Constants table and pinned by a constants test that asserts the base prefix, the per-control tail, uniqueness, and freezing.
- **s14-18** applied (src/core/validators.ts, tests/src/core/validators.test.ts): Applied what the two lane corrections share: no `RULE_NAMES` constant, no `Object.keys` cast, and the `rule` guard derived from the one typed source `RULE_MESSAGES`. On the mechanism the lanes differ, and the difference is not genuine: `keyOf`'s documented and implemented semantics are own-key membership by `Object.hasOwn`, which is exactly what the second lane's proposed `isFieldRuleName` would compute, so that helper would be a wrapper AGENTS.md forbids where an installed `@orkestrel/*` primitive already matches. Used `keyOf(RULE_MESSAGES)`, adding no export. I read the installed 0.0.15 implementation to confirm behavior is unchanged for this record: `keyOf` also admits a symbol or a numeric key whose text matches, and `RULE_MESSAGES` has neither, so the accepted set stays exactly the nine strings `literalOf` named. Added a test that walks `Object.keys(RULE_MESSAGES)` and asserts acceptance, plus refusals for `custom`, the inherited `toString`, and a number.
- **s14-21** applied (src/core/helpers.ts, tests/src/core/helpers.test.ts, tests/src/core/index.test.ts, guides/form.md): Both lanes agree the leaf belongs in helpers.ts beside `formatMessage` rather than in factories.ts, and agree on the signature; applied that. Added `createFieldError(field, rule, limit, messages?)` returning the frozen `FieldError`, and reduced all 11 named-rule sites in `evaluateField` to one push each. The `custom` push at the end is untouched, as both lanes require: it carries the validator's own message and no rule name. TSDoc is third-person per the fleet ruling, and its `@example` is what satisfies the guide's example-per-function parity check. Unit-tested default copy, `{limit}` substitution, override precedence, an unrelated override being ignored, and freezing.
- **s14-22** applied (src/core/Form.ts, tests/src/core/Form.test.ts, guides/form.md): Applied the reshaped repair, not the finding's original line: the constructor now owns first through `attempt(() => cloneFormSchema(schema))`, rethrows a `FormError` the clone raised, maps any other throw to the existing `SCHEMA` refusal with the same message and the same `context.problems` payload, and runs `isFormSchema` and `auditSchema` against the owned copy, storing that same object. This mirrors the clone-then-guard order `parseForm` already uses. Treated as `applied` rather than `deferred_breaking` because the package's own constructor TSDoc already pins the intent — `It is copied, and the copy is what the form asks` — and the code did not meet it. I inserted the failing proof before relying on the fix: a `meta` Proxy with a `getOwnPropertyDescriptor` trap that answers differently per read runs red on the pre-change order (`expected 5 to be 1`, and the form stored a 65537-character string `auditSchema` never saw, breaching `STRING_LIMIT`) and green after (one read, stored value equals the audited value). I avoided module-scope constants for the refusal text because the guide parity suite forbids hidden module-scope declarations; the diagnostic string appears once. Guide updated: Contract invariant 3 now states the clone is the only read of the caller's object, and the Owning what arrives section says the guard and audit run against the copy.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2190ms on 48 files using 4 threads. (First run reported guides/form.md, src/core/validators.ts, tests/src/core/helpers.test.ts; converged with npm run lint then npm run format, per the brief, then re-ran clean.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics, exit 0
- npm run build: pass — vite build ... built in 3.07s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts — exit 0
- npm test: pass — src:core 9 files / 183 tests passed; policy 1 / 111 passed; config 1 / 46 passed; setup 1 / 13 passed; guides 1 / 48 passed — exit 0

## Diffstat

```text
 guides/form.md                    | 114 ++++++++++++-----------
 src/core/Form.ts                  |  74 +++++----------
 src/core/constants.ts             |  33 +++++++
 src/core/helpers.ts               | 186 ++++++++++++++++++++------------------
 src/core/parsers.ts               |  30 +-----
 src/core/validators.ts            | 134 +--------------------------
 tests/src/core/Form.test.ts       |  29 +++++-
 tests/src/core/constants.test.ts  |  23 +++++
 tests/src/core/helpers.test.ts    |  90 ++++++++++++++++++
 tests/src/core/index.test.ts      |   5 +
 tests/src/core/validators.test.ts |  11 +++
 11 files changed, 382 insertions(+), 347 deletions(-)
```

- dist moves: true

## Deviations

Three items for the record; none stopped the unit.

1. s14-18 lane difference, resolved rather than reported as a conflict. One lane says replace the inline `literalOf(...)` with `keyOf(RULE_MESSAGES)`; the other says add a local `isFieldRuleName` guard doing `isString(value) && Object.hasOwn(RULE_MESSAGES, value)`. I read the installed @orkestrel/contract 0.0.15 implementation of `keyOf`: it collects own members and tests membership, so the two produce the same guard. AGENTS.md requires reusing an installed primitive whose semantics match and forbids wrapping it to rename it, so this is a detail the repository's own law settles rather than a genuine conflict. Applied `keyOf`, adding no export. Flagging it so the audit lane can overturn the reading if it disagrees.

2. s14-22 carries one observable message change in an edge case, and I judged it inside the applied class. A schema that is BOTH structurally invalid AND carries a `meta` the clone cannot own now reports the clone's `Field "<name>" has metadata that cannot be owned` instead of `The schema is not a form schema`. Both are `FormError` coded `SCHEMA`, and each message is one the constructor already produced for its own case; only which of them wins when both faults are present has moved. Every single-fault path keeps its exact message and its exact `context.problems` payload, and the whole suite is green. If the audit rules that the combined-fault ordering is itself a published behavior, the finding becomes `deferred_breaking` whole.

3. New exports added, all additive and all reachable through the existing star-export barrel under new names: `defineEntry`, `freezeEntry`, `createFieldError`, `FIELD_BASE_KEYS`, `FIELD_KEYS`. Four of the five are named by their findings' repair lines; `freezeEntry` is the second helper s14-16 requires so the sealed descriptor at parsers.ts is not flattened into the mutable one. The package's guide parity suite makes any module-scope declaration public — it fails on hidden declarations — so none of these could have stayed local. Each has a guide Surface row and a unit test.
