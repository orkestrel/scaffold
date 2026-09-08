# Report — `d7n-qualifier-prep`

Wall clock: 2026-09-07T21:05:47Z to 2026-09-07T21:09:55Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

Applied the pilot's shape from `/home/user/fleet/abort/tests/guides.test.ts:146-227` at each listed site.

Hunk 1 — methods loop (`tests/guides.test.ts:103-128`):

```diff
- const members = source.methods(group.interface)
+ const members = source.methods(group.interface).map((method) => method.name)
+ const documented = group.methods.map((method) => method.name)
  const entity = group.interface.replace(/Interface$/, '')
  ...
- expect(findMissing(members, group.methods)).toEqual([])
+ expect(findMissing(members, documented)).toEqual([])
  ...
- expect(findMissing(group.methods, members)).toEqual([])
+ expect(findMissing(documented, members)).toEqual([])
  ...
- entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+ entity === group.interface
+   ? []
+   : findMissing(
+       source.methods(entity).map((method) => method.name),
+       documented,
+     )
```

Hunk 2 — examples case (`tests/guides.test.ts:130-146`):

```diff
- expect(findUnexampled(names, fences, source.examples())).toEqual([])
+ expect(
+   findUnexampled(
+     names,
+     fences,
+     source.examples().map((example) => example.name),
+   ),
+ ).toEqual([])
```

Hunk 3 — examples loop (`tests/guides.test.ts:148-165`):

```diff
  for (const group of guide.methods()) {
    const entity = group.interface.replace(/Interface$/, '')
+   const documented = group.methods.map((method) => method.name)
+   const examples =
+     entity === group.interface
+       ? source.examples(group.interface).map((example) => example.name)
+       : source
+           .examples(group.interface)
+           .map((example) => example.name)
+           .concat(source.examples(entity).map((example) => example.name))
    describe(`${group.interface} examples`, () => {
      it('documents an example for every method', () => {
        const fences = guide
          .fences()
          .filter((fence) => fence.language === EXAMPLE_LANGUAGE)
          .map((fence) => fence.code)
-       const examples =
-         entity === group.interface
-           ? source.examples(group.interface)
-           : source.examples(group.interface).concat(source.examples(entity))
-       expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+       expect(findUnexampled(documented, fences, examples)).toEqual([])
      })
    })
  }
```

No other line in the suite changed. The `findMissing` sites at the import walk (`statement.names` against `face.surface().map((symbol) => symbol.name)`) and `names` against `surface` were already strings and were left as-is.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 and format named every site in `tests/setup.ts` (all `policy/no-malformed-summary`, none `policy/no-banned-term`):

| Line | Diagnostic | Before | After |
| --- | --- | --- | --- |
| 23 | no-malformed-summary | `Build every ordering of a list, so a case can drive an order-independent helper with each.` | `Builds every ordering of a list, so a case can drive an order-independent helper with each.` |
| 36 | no-malformed-summary | `` Build one `Finding` from the members a case cares about, defaulting the rest. `` | `` Builds one `Finding` from the members a case cares about, defaulting the rest. `` |
| 46 | no-malformed-summary | `Build a cyclic record for adversarial guard tests.` | `Builds a cyclic record for adversarial guard tests.` |
| 53 | no-malformed-summary | `Build a deeply nested record for adversarial guard tests.` | `Builds a deeply nested record for adversarial guard tests.` |
| 62 | no-malformed-summary | `` Build a null-prototype record carrying an own `__proto__` key for guard tests. `` | `` Builds a null-prototype record carrying an own `__proto__` key for guard tests. `` |
| 76 | no-malformed-summary | `Licensed-gate logical pass with an unscoped restriction ruling.` | `Builds a licensed-gate logical pass with an unscoped restriction ruling.` |
| 94 | no-malformed-summary | `Coastal referral ruling with seat-count message interpolation.` | `Builds a coastal referral ruling with seat-count message interpolation.` |
| 112 | no-malformed-summary | `Quantitative cap and excess passes followed by a logical TIV gate.` | `Builds quantitative cap and excess passes followed by a logical TIV gate.` |
| 141 | no-malformed-summary | `Scoped wind restriction leaving global eligibility eligible.` | `Builds a scoped wind restriction leaving global eligibility eligible.` |
| 156 | no-malformed-summary | `Scoped condition ruling that keeps the scope eligible.` | `Builds a scoped condition ruling that keeps the scope eligible.` |
| 200 | no-malformed-summary | `Multi-pass definition proving evidence snapshots for cross-pass and same-pass premises.` | `Builds a multi-pass definition proving evidence snapshots for cross-pass and same-pass premises.` |
| 213 | no-malformed-summary | `` Logical `gates` pass with a continuing condition ruling, followed by a quantitative `after` pass. `` | `` Builds a logical `gates` pass with a continuing condition ruling, followed by a quantitative `after` pass. `` |
| 228 | no-malformed-summary | `` Logical `gates` pass whose rule reads the dotted string key `qualification.cap`. `` | `` Builds a logical `gates` pass whose rule reads the dotted string key `qualification.cap`. `` |
| 239 | no-malformed-summary | `Answer every subject with {@link FAILING_RESULT}, one result per subject reasoned.` | `Answers every subject with {@link FAILING_RESULT}, one result per subject reasoned.` |
| 253 | no-malformed-summary | `Build an injected reason engine whose every pass fails operationally with a fixed trace/error.` | `Builds an injected reason engine whose every pass fails operationally with a fixed trace/error.` |

No `policy/no-banned-term` diagnostic printed; no fix needed on that rule.

`npm run test:policy` after the preceding fixes passed clean (`90 passed | 1 skipped (91)`, exit 0) with no `prose` rule failure naming a line in `guides/**` or `README.md`, so no further edit was needed there; the converge unit owns the remaining prose.

## Item 4 — the bump

`package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. `package-lock.json` untouched.

## Acceptance criteria

**1.** `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3, all fifteen `no-malformed-summary` sites listed above).

**2.**

- `npm run format:check` → `All matched files use the correct format.` exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` → no output, exit 0.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` (`check:src:core`) both silent, exit 0.

**3.**

- `npm run test:guides` → `Test Files 1 passed (1)` / `Tests 21 passed (21)`, exit 0.
- `npm run test:policy` → `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)`, exit 0.
- `npm run test:config` → `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)`, exit 0.

**4.** `npm run docs` — non-zero as expected, `rows read: 1, disagreements found: 63`, exit 1. Verbatim worklist:

```text
guides/qualifier.md type Eligibility: guide absent source "Represents the eligibility outcome axis."
guides/qualifier.md type QualificationEffect: guide absent source "Represents an authored ruling's eligibility impact."
guides/qualifier.md type QualificationPass: guide absent source "Represents one ordered derivation or rule pass."
guides/qualifier.md type QualificationProjection: guide absent source "Represents one pass's internal working projection."
guides/qualifier.md type QualificationContext: guide absent source "Represents the internal projection record stored under `QUALIFICATION_KEY`."
guides/qualifier.md interface RulingInput: guide absent source "Carries the optional fields `createRuling` accepts."
guides/qualifier.md interface QualificationInput: guide absent source "Carries the optional fields `createQualificationDefinition` accepts."
guides/qualifier.md interface Ruling: guide absent source "Represents an authored consequence for one rule in one logical pass."
guides/qualifier.md interface Premise: guide absent source "Represents display-neutral evidence for one condition, in one of two authoring modes. A CHECKED premise carries `field` and `comparison`; a DESCRIBED premise carries neither and renders from `description` instead. The checked form renders only when `field` and `comparison` are BOTH present, and `description` then goes unused; a premise missing either half of the checked pair renders as described instead. `met` is three-state: `true` (met), `false` (not met), or absent (not evaluated, rendered as unknown)."
guides/qualifier.md interface Finding: guide absent source "Represents one resolved ruling."
guides/qualifier.md interface Derivation: guide absent source "Represents one quantitative pass's audit result."
guides/qualifier.md interface QualificationDefinition: guide absent source "Represents a pure authored qualification definition."
guides/qualifier.md interface QualificationResult: guide absent source "Represents one subject's complete qualification outcome."
guides/qualifier.md type QualifierErrorCode: guide absent source "Represents a coded `QualifierError` programmer-error code."
guides/qualifier.md interface QualifierErrorContext: guide absent source "Represents the structured payload a `QualifierError` carries."
guides/qualifier.md type QualifierEventMap: guide absent source "Represents the push observation surface of a `QualifierInterface`."
guides/qualifier.md interface QualifierOptions: guide absent source "Carries the options for `createQualifier` / the `Qualifier` constructor."
guides/qualifier.md interface QualifierInterface: guide absent source "Owns or borrows one reason engine and returns eligibility."
guides/qualifier.md const DEFAULT_QUALIFIER_VALIDATE: guide "`true` — validate authored definitions before qualification." source "Holds the default definition validation policy for `createQualifier` / `Qualifier.qualify`."
guides/qualifier.md const QUALIFICATION_KEY: guide "`'qualification'` — the reserved internal projection namespace." source "Names the reserved internal projection namespace a pass's working projection is written under."
guides/qualifier.md const ELIGIBILITY_PRECEDENCE: guide "Severity order: `ineligible`, `referral`, `eligible`." source "Lists the eligibility severities in order — most to least severe."
guides/qualifier.md const EFFECT_ELIGIBILITIES: guide "Eligibility impact by `QualificationEffect`; `condition` remains eligible." source "Maps each `QualificationEffect` to its eligibility impact; `condition` remains eligible."
guides/qualifier.md class QualifierError: guide "Carries a `QualifierErrorCode` and an optional context record." source "Represents a coded programmer error thrown by the qualifier layer."
guides/qualifier.md function isQualifierError: guide "Safely narrows a caught value to `QualifierError`." source "Narrows a caught value to a `QualifierError`."
guides/qualifier.md const isEligibility: guide absent source "Determines whether a value is an `Eligibility` literal."
guides/qualifier.md const isQualificationEffect: guide absent source "Determines whether a value is a `QualificationEffect` literal."
guides/qualifier.md function isEligibilityRecord: guide absent source "Determines whether a value is an open string-keyed record of `Eligibility` values."
guides/qualifier.md function isPremise: guide absent source "Determines whether a value is an open result-side `Premise`."
guides/qualifier.md function isFinding: guide absent source "Determines whether a value is an open result-side `Finding`."
guides/qualifier.md function isDerivation: guide absent source "Determines whether a value is an open result-side `Derivation`."
guides/qualifier.md function isQualificationResult: guide absent source "Determines whether a value is an open `QualificationResult` returned by a qualifier."
guides/qualifier.md function isRuling: guide absent source "Determines whether a value is an exact `Ruling` record."
guides/qualifier.md function isQualificationPass: guide absent source "Determines whether a value is a `QualificationPass` (a quantitative or logical definition)."
guides/qualifier.md function isQualificationDefinition: guide absent source "Determines whether a value is an exact `QualificationDefinition` record."
guides/qualifier.md function interpolateMessage: guide "Interpolate `{{dotted.path}}` tokens against a subject." source "Interpolates `{{dotted.path}}` tokens in a message template against a subject."
guides/qualifier.md function renderComparison: guide "Render one comparison as a display-neutral phrase." source "Renders a `Premise` comparison as a display-neutral verb phrase."
guides/qualifier.md function renderValue: guide "Render scalar and structured expected values." source "Renders a structured or scalar expected value display-neutrally."
guides/qualifier.md function renderPremise: guide "Render one premise as a sentence." source "Renders one `Premise` into a display-neutral sentence."
guides/qualifier.md function checkToPremise: guide "Join an authored `Check` and evaluated `CheckResult`." source "Builds a `Premise` from an authored `Check` and its evaluated `CheckResult`."
guides/qualifier.md function ruleToPremises: guide "Re-evaluate one rule's atoms into rich premise evidence." source "Builds rich premises for one fired `Rule` by walking its premise atoms and re-evaluating each against the working subject."
guides/qualifier.md function findRule: guide "Locate one authored rule by id." source "Locates an authored `Rule` by id."
guides/qualifier.md function reasonResultToProjection: guide "Project one reason result into the internal qualification namespace." source "Projects one reason result into the internal qualification namespace."
guides/qualifier.md function quantitativeResultToDerivation: guide "Project a quantitative result into a `Derivation`." source "Projects a quantitative result into a `Derivation` audit record."
guides/qualifier.md function qualificationToRecord: guide "Wrap a `QualificationContext` under `QUALIFICATION_KEY`." source "Wraps a `QualificationContext` under `QUALIFICATION_KEY`."
guides/qualifier.md function mergeQualificationContext: guide "Copy-on-write merge one pass projection into the context." source "Merges one pass projection into the context, copy-on-write."
guides/qualifier.md function rulingToFinding: guide "Join a ruling, rule result, subject, and evaluator into a finding." source "Joins a ruling, its logical rule result, the pass, the pre-projection subject, and an evaluator into a `Finding`."
guides/qualifier.md function deriveFindingEligibility: guide "Derive eligibility from applied findings." source "Derives global eligibility from applied, unscoped findings."
guides/qualifier.md function combineEligibilities: guide "Return the most severe eligibility in a list." source "Returns the most severe `Eligibility` in a list."
guides/qualifier.md function deriveScopeEligibilities: guide "Derive one eligibility per finding scope." source "Derives one eligibility per finding scope."
guides/qualifier.md function describeMissingReferences: guide "Describe each ruling whose pass or rule does not exist." source "Describes each ruling whose pass or rule does not exist or whose pass is not logical, and each pass id shadowing the reserved `QUALIFICATION_KEY`."
guides/qualifier.md function hasReservedKey: guide "Whether a subject already owns `QUALIFICATION_KEY`." source "Determines whether a subject already owns the reserved `QUALIFICATION_KEY`."
guides/qualifier.md function assertSubject: guide "Narrow and reject malformed or reserved-key subjects." source "Asserts a value is a valid qualification `Subject`, narrowing it in place."
guides/qualifier.md function mapEngineError: guide "Map an engine throw to a typed `QualifierError`." source "Maps an engine throw caught while running one pass to a typed `QualifierError`."
guides/qualifier.md function describeEmptyLogicalPasses: guide "Describe each logical pass carrying no rulings." source "Describes each logical pass carrying no rulings."
guides/qualifier.md function describeUnreadDerivations: guide "Describe each quantitative pass never read by a later pass." source "Describes each quantitative pass never read by a later pass."
guides/qualifier.md function createQualifier: guide absent source "Creates one qualifier over a reason engine."
guides/qualifier.md function createQualificationDefinition: guide absent source "Creates a `QualificationDefinition`."
guides/qualifier.md function createRuling: guide absent source "Creates a `Ruling` — one authored consequence for one rule in one pass."
guides/qualifier.md class Qualifier: guide "Owns or borrows one reason engine, validates definitions, runs ordered passes, and returns eligibility." source "Runs ordered passes over one reason engine and returns eligibility."
guides/qualifier.md QualifierInterface.qualify: guide absent source "Qualifies one subject against one authored definition."
guides/qualifier.md QualifierInterface.validate: guide absent source "Validates one authored definition semantically, without running it."
guides/qualifier.md QualifierInterface.destroy: guide absent source "Destroys this qualifier, idempotently."
guides/qualifier.md pitch: readme absent tagline "A synchronous, deterministic eligibility engine. Pure, JSON-serializable `QualificationDefinition`s contain ordered `passes` (`quantitative` derivations and `logical` rulings) and are evaluated against subjects through one injected `@orkestrel/reason` engine. The result is a fresh `QualificationResult` with global `eligibility`, optional scoped eligibility, evidence-rich `findings`, quantitative `derivations`, a trace, and accumulated errors. `Qualifier` stops at eligibility — it reports whether and where a subject may proceed, never calculates line amounts, builds worksheets, totals rates, emits notices, decides authority, or aggregates a batch. Qualification never mutates its inputs: every result is a fresh object. The internal working projection under `QUALIFICATION_KEY` is discarded after each call and must never be forwarded to a downstream consumer. A failed qualification, a global `ineligible`, and a global `referral` are terminal — a caller that runs qualification ahead of a downstream step stops there. A scoped restriction removes only that named scope from what the caller selects next, so an excluded scope is never evaluated merely to discard its outcome. `Qualifier` either receives an injected `ReasonInterface` (never destroyed by `Qualifier`) or builds and OWNS its own engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch both quantitative and logical definitions — one it cannot dispatch surfaces `QualifierError('ENGINE')` wrapping the engine's throw. Every `qualify` call fires through `Qualifier`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 63
```

No deviation. Every instrument for this unit is under `/home/user/fleet/qualifier/tmp/d7n-qualifier-prep/`.

---

Orchestrator's annotation (2026-09-08, the audit): the rewritten-block table omits the `tests/setup.ts:228` rewrite and tallies rows; the tree is authoritative. The retained P.1 diff was captured as a working-tree diff and so omits the newly tracked `scripts/docs.ts`; `d7n-qualifier-prep.show.txt` re-captures the commit whole (objective F2).
