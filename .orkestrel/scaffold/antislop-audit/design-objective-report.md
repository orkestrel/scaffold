# Objective-lane report

## Claims C1–C15

1. **C1 — CONFIRMED.** The dependency attack failed. Installed Oxlint 1.78.0 accepts `jsPlugins`, exports `oxlint/plugins-dev`, and loaded a plain ESLint-shaped plugin without `@oxlint/plugins` or another dependency ([E1/E6](/home/user/scaffold/tmp/design-lanes-evidence.md:5)). Fleet vendoring is structurally available through `HOST_PATHS` and `nameToHostArtifacts` ([constants.ts:123](/home/user/scaffold/src/core/constants.ts:123), [compilers.ts:1387](/home/user/scaffold/src/core/compilers.ts:1387)). Adopt an Orkestrel-owned plugin. Treat anti-slop only as MIT prior art. Protect against future Oxlint API drift with the real-binary test in Q18.

2. **C2 — BROKEN.** The proposed call list exceeds the written convention. The contract bans mocks, module replacement, spies, and fake clocks when simulating project-owned behavior ([AGENTS.md:49](/home/user/scaffold/AGENTS.md:49)); it does not categorically ban `vi.unmock` or `vi.hoisted`, neither of which inherently creates a mock, spy, or fake. Anti-slop itself limits its module rule to `mock`, `doMock`, and `unstable_mockModule`, and explicitly treats `vi.spyOn` as valid. Adopt a narrower rule for operations that create module replacement, mock functions, spies, or fake time. Do not blacklist ordering or cleanup helpers without first changing the canon.

3. **C3 — BROKEN.** The contract explicitly bans TypeScript `private`, bans `readonly` parameters, and requires implementation state to use `#` fields ([AGENTS.md:46](/home/user/scaffold/AGENTS.md:46), [architecture.md:46](/home/user/scaffold/.claude/rules/architecture.md:46)). It does not ban every `public` or `protected` method modifier. Shape the rule around the actual law: reject `private`, reject parameter properties and accessibility-declared non-`#` state, and reject `readonly` parameters. Do not reject an otherwise valid public method merely because it spells `public`.

4. **C4 — CONFIRMED.** A disable comment currently bypasses configured rules, while the contract requires fixing the cause instead of using `eslint-disable` ([AGENTS.md:42](/home/user/scaffold/AGENTS.md:42)). `oxlint-disable` is the equivalent suppression mechanism under the repository’s named linter, not a new anti-slop convention. E6 proves comments are available to a plain plugin rule, and E3 found zero current violations ([evidence](/home/user/scaffold/tmp/design-lanes-evidence.md:35)). Adopt the rule for both directive namespaces.

5. **C5 — BROKEN as attributed, but the proposed discipline should be adopted.** Anti-slop does not give every rule RuleTester coverage: `no-chained-type-assertions.ts`, `no-shape-in-symbol-names.ts`, and `no-unknown-parameters.ts` have no sibling test. Orkestrel independently requires failing controls and targeted tests ([AGENTS.md:82](/home/user/scaffold/AGENTS.md:82), [tests.md:103](/home/user/scaffold/.claude/rules/tests.md:103)). Correct the claim to: every Orkestrel-authored rule must receive valid and invalid RuleTester cases, plus configured-binary coverage as described in Q18.

6. **C6 — CONFIRMED, with the ruling already constrained.** Oxlint exempts `as const` while the prose bans type assertions without an exception ([E2](/home/user/scaffold/tmp/design-lanes-evidence.md:19), [AGENTS.md:41](/home/user/scaffold/AGENTS.md:41)). Under the standing constraint, the explicit ruling must be: const assertions are not sanctioned. Sanctioning them would require a prior change to the authoritative contract.

7. **C7 — CONFIRMED rejection.** Even `allowInTypeGuards` would leave parsers and other total boundary logic exposed. The repository requires accepting `unknown` and narrowing through guards, and uses `typeof` in real boundary handling such as `src/bin/helpers.ts:158–174`. The measured rule produced 64 findings. Reject `no-runtime-typeof`.

8. **C8 — CONFIRMED rejection.** “Accept `unknown` and narrow with guards” is explicit ([AGENTS.md:40](/home/user/scaffold/AGENTS.md:40)). Public guards and parsers such as `parseBlueprint(value: unknown)` and `isFilesystemPath(value: unknown)` require that input contract. The rule produced 34 findings. Reject `no-unknown-parameters`.

9. **C9 — CONFIRMED rejection.** The foreign-contract rules expressly permit carrying a wide foreign record without narrowing it ([patterns.md:132](/home/user/scaffold/.claude/rules/patterns.md:132)). `Record<string, unknown>` also correctly represents owned JSON-like and hostile fixture surfaces. The rule produced 44 findings. Reject `no-unsafe-dictionary-type`.

10. **C10 — CONFIRMED rejection.** `*Shape` and `ContractShape` are fixed project vocabulary ([names.md:152](/home/user/scaffold/.claude/rules/names.md:152)); `shapers.ts` is a designated centralized file ([architecture.md:26](/home/user/scaffold/.claude/rules/architecture.md:26)). The 43 findings attack the canon itself. Reject `no-shape-in-symbol-names`.

11. **C11 — CONFIRMED rejection.** The 36 findings are omission expressions compatible with `exactOptionalPropertyTypes` and the `undefined`-absence law. Anti-slop proposes another construction style, but the repository does not prohibit this one. Reject `no-conditional-empty-object-spread`.

12. **C12 — CONFIRMED rejection.** `Reflect.get` at [src/server/helpers.ts:64](/home/user/scaffold/src/server/helpers.ts:64) is guarded by `holds` and reads hostile `unknown` without an assertion. The three `Reflect.apply` sites in `tests/config.test.ts` drive typed dynamic configuration proofs. The anti-slop rule assumes ordinary asserted access remains available; this repository forbids that alternative. Reject both rules.

13. **C13 — BROKEN as stated.** The assertion ban is not “already enforced” in total: E2 proves `as const` passes the installed built-in rule. The adoption conclusion remains rejection because all non-const behaviors targeted by these three anti-slop rules are already rejected by `consistent-type-assertions: never`. Close the separate const-assertion gap from C6 with one Orkestrel rule instead of adopting three overlapping rules.

14. **C14 — CONFIRMED rejection.** A direct rerun reproduced all 47 findings. They include intentional hostile-data contracts such as [cloners.test.ts:99](/home/user/scaffold/tests/src/core/cloners.test.ts:99), boundary fixtures at [parsers.test.ts:70](/home/user/scaffold/tests/src/core/parsers.test.ts:70), and public JSON-like output at [compilers.ts:109](/home/user/scaffold/src/core/compilers.ts:109). Replacing those annotations with inference changes the evidence the tests and contracts deliberately carry. Reject `no-known-value-widening`.

15. **C15 — BROKEN.** Zero findings prove current cleanliness, not an existing convention. No authoritative rule bans `object` parameters or aliases resolving exactly to `unknown`. Permanent rules for either would therefore import policy rather than enforce the current contract. Reject both until the canon explicitly adopts their underlying invariant.

## Open questions Q16–Q19

### Q16 — Rule homes

Keep the policy sweep for path-aware placement and mirror rules. Put AST-local and token-local rules in the Oxlint plugin.

Move nested-function enforcement wholesale to the plugin, option **(c)**. Retain module-function placement as a distinct policy-sweep rule, but remove its nested-body logic. This gives the no-nested-functions law one complete AST traversal and one home. The current sweep does not enter declared-function or class-method bodies ([E7](/home/user/scaffold/tmp/design-lanes-evidence.md:91)).

This recommendation depends on a missing `.vue` probe. Before removing any existing enforcement, prove whether `jsPlugins` visit Vue SFC script blocks. If they do not, do not claim fleet-wide completion until one Vue-capable, single-home mechanism exists.

### Q17 — Plugin and test placement

Place the fleet plugin at `tests/setupLint.ts` and reference it from `.oxlintrc.json` as `./tests/setupLint.ts`.

This matches the existing pattern for fleet-wide policy infrastructure without placing host tooling in published `src`, private `app`, or the restricted `configs` leaves. Add `tests/setupLint.ts` to `HOST_PATHS` beside `tests/setupPolicy.ts`, and vendor it atomically with the changed `.oxlintrc.json`. Keep semantic cases in the existing `tests/policy.test.ts`. Export individual rule objects for those tests while providing the framework-required default plugin export.

### Q18 — Testing form and project ownership

Use both forms:

- The `policy` project owns RuleTester valid/invalid cases for every rule, including shadowed globals, imported aliases, computed access, and controls that prove each rule can fail.
- The `config` project runs the real Oxlint binary over a temporary fixture tree. It proves `.oxlintrc.json` resolves the vendored path, loads the plugin, enables every rule, and emits each configured rule name.

Do not use `conformance`: these rules do not measure drift from an official behavior. Do not add a project; `policy` and `config` already own the two distinct questions.

### Q19 — Missed items and fleet blast radius

One omitted anti-slop rule needs an explicit ruling: reject `no-unknown-returns`. E5 found five uses, all in `tests/setup*.ts` boundary loaders and readers. Returning `unknown` is honest at those boundaries; the caller must narrow it.

The matrix underestimates rollout risk. Zero counts exist only for this checkout, while `.oxlintrc.json` and the proposed plugin would be repaired fleet-wide. Before enabling the rules, run the exact staged plugin over every target and record per-rule violations. Vendor the plugin, config, and tests in one host release. Also settle the Vue SFC reachability probe. Beyond the implementation patterns already retained by C1, no other anti-slop rule should be adopted.

## Deviation findings

- C2 overstates the mock law by naming helpers the authority does not ban categorically.
- C3 overstates the privacy law by extending it to all `public` and `protected` syntax.
- C5 describes universal anti-slop RuleTester coverage that the subject repository does not contain.

No prescribed path was missing, and no supplied probe output contradicted a reproduced measurement. Claims about fleet-wide cleanliness and Vue SFC coverage were dropped because the brief identifies them as unmeasured.