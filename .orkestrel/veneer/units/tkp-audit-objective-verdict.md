1. **CONFIRMED — Coverage.** [tokens.test.ts:687](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:687) contains the named token cases, with overrides on ancestors, shipped consumers inside, and twins outside. Every inside assertion reads a resolved consumer property. The frozen-consumer mutations listed under claim 2 distinguish these assertions from token-presence checks. The retained `tkp-tokens.log.txt:61` records the cases passing.

2. **CONFIRMED — Consumer assertions and mutation kills.** The assertions distinguish every retained mutation from the passing case. Each log records an `AssertionError` at the inside reading, after the corresponding twin assertions. Each also records successful byte-identical restoration and an empty styles diff.

   Log paths below resolve under `/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/logs/`; assertion lines resolve in `tests/src/styles/tokens.test.ts`.

   | Mutation | Distinguishes passing case | Assertion line | Log read |
   |---|---|---:|---|
   | Anchor link base replaced with its rest color | Yes; overridden color fails | 711 | `tkp-plant-link-base-anchor.log.txt:38` |
   | Link-button base replaced with its rest color | Yes; overridden color fails | 712 | `tkp-plant-link-base-button.log.txt:38` |
   | Anchor hover color replaced with its rest hover color | Yes; overridden hover color fails | 740 | `tkp-plant-link-hover-anchor.log.txt:46` |
   | Link-button hover color replaced with its rest hover color | Yes; overridden hover color fails | 743 | `tkp-plant-link-hover-button.log.txt:37` |
   | Anchor decoration replaced with `underline` | Yes; expects `overline` | 760 | `tkp-plant-link-decoration-anchor.log.txt:44` |
   | Link-button decoration replaced with `underline` | Yes; expects `overline` | 761 | `tkp-plant-link-decoration-button.log.txt:37` |
   | Valid-border alias replaced with its rest color | Yes; overridden border fails | 804 | `tkp-plant-form-valid-border.log.txt:37` |
   | Valid-feedback alias replaced with its rest color | Yes; overridden feedback fails | 807 | `tkp-plant-form-valid-feedback.log.txt:44` |
   | Invalid-border alias replaced with its rest color | Yes; overridden border fails | 831 | `tkp-plant-form-invalid-border.log.txt:37` |
   | Invalid-feedback alias replaced with its rest color | Yes; overridden feedback fails | 834 | `tkp-plant-form-invalid-feedback.log.txt:37` |
   | Hover mix token replaced with `12%` | Yes; expects alpha `0.5` | 861 | `tkp-plant-state-hover.log.txt:37` |
   | Active mix token replaced with `22%` | Yes; expects alpha `0.6` | 889 | `tkp-plant-state-active.log.txt:38` |
   | State mixer replaced with its rest color | Yes; expects the red mixer’s paint | 911 | `tkp-plant-state-mixer.log.txt:38` |
   | Disabled opacity replaced with `0.65` | Yes; expects `0.3` | 923 | `tkp-plant-button-opacity.log.txt:44` |
   | Description-term weight replaced with `600` | Yes; expects `800` | 935 | `tkp-plant-weight-heading.log.txt:43` |
   | Button easing references replaced with `ease` | Yes; expects `linear` | 947 | `tkp-plant-ease-standard.log.txt:44` |

   The driver’s replacements match the shipped declarations at [tkp-plant.py:23](/home/user/scaffold/.orkestrel/veneer/units/tkp-instruments/tkp-plant.py:23). The decoration-button mutation changes the resting and hover declarations together; its recorded failure establishes the resting assertion’s sensitivity, without separately certifying the hover assertion.

3. **UNRESOLVED — The mode-scope mechanism is supported; the plain-ancestor observation lacks retained execution evidence.** [tokens.test.ts:776](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:776) states the reason and uses `data-bs-theme="light"` ancestors. [theme-tokens:526](/home/user/veneer-tkp/src/styles/_mixins.scss:526) declares the aliases, emitted at [the root:493](/home/user/veneer-tkp/src/styles/_tokens.scss:493) and [mode scopes:21](/home/user/veneer-tkp/src/styles/_theme.scss:21). **No validation rule reads either canonical form token directly**: feedback reads the alias at [_validation.scss:19](/home/user/veneer-tkp/src/styles/components/_validation.scss:19), and control borders read it at [line 45](/home/user/veneer-tkp/src/styles/components/_validation.scss:45).

   The form mutation logs named under claim 2 establish sensitivity to the alias declarations. They never remove the ancestor’s mode attribute. The unchanged plain-ancestor reading appears only in the writer’s report. Retain a browser case using the same fixtures without `data-bs-theme`, asserting unchanged border and feedback readings, to settle that part.

4. **CONFIRMED — Real input and cleanup.** The attack that these cases merely apply synthetic state classes fails: [tokens.test.ts:727](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:727) uses trusted hover and checks `:hover`; [line 872](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:872) holds the pointer and checks `:active`; [line 916](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:916) supplies native `disabled` attributes. Motion is reduced for hover and press, and [line 688](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:688) registers pointer and media cleanup. The state and opacity mutations under claim 2 fail at paint assertions after state setup succeeds. Static disabled fixtures require no pointer action.

5. **CONFIRMED — Stacking row.** The duplicate-row and missing-alias attacks fail against [veneer.md:7200](/home/user/veneer-tkp/guides/veneer.md:7200): the merged row contains the named tokens and aliases. `tkp-tokens.log.txt:30` records the reference-map case passing; `tkp-test-guides.log.txt:15` records `exit=0`. Changing a stated stack value would produce drift at [tokens.test.ts:141](/home/user/veneer-tkp/tests/src/styles/tokens.test.ts:141). Alias-cell completeness is established by reading the row; the value assertion does not prove alias completeness.

6. **UNRESOLVED — Gate results hold; historical host load is unsupported.** The retained logs establish `exit=0` for check (`tkp-check.log.txt:29`), lint (`tkp-lint-check.log.txt:5`), tokens (`tkp-tokens.log.txt:78`), guides (`tkp-test-guides.log.txt:15`), and the policy rerun (`tkp-test-policy-2.log.txt:15`). `tkp-test-src-styles.log.txt:2915` records `Tests 1516 passed (1516)`. The initial policy log records a 5000 ms timeout at `tkp-test-policy.log.txt:13`.

   No retained instrument log records the claimed load near 20 or CPU capacity. That assertion appears only at [token-proofs-report.md:78](/home/user/scaffold/.orkestrel/veneer/units/token-proofs-report.md:78). Supply contemporaneous telemetry or remove that unsupported clause. The timeout itself does not establish its cause.

7. **CONFIRMED — Scope and code law.** The retained diff and status match the live worktree byte-for-byte and name only `tests/src/styles/tokens.test.ts` and `guides/veneer.md`. Inspection and a TypeScript AST check found no prohibited syntax or hidden function in the added block. The callbacks are direct test-registration callbacks. The passing assertions recorded in `tkp-tokens.log.txt:61` exercise the expected literals against resolved readings; the mutations under claim 2 demonstrate that those expectations reject frozen consumers. The titles describe the properties their assertions read.

Findings outside the claims: none substantiated to the BROKEN standard.

Attacked and held: the frozen-consumer attacks preserve the twins’ rest readings correctly. Mode-scope form overrides exercise the alias chain; they do not establish a plain-ancestor regression guard. The stacking value proof remains valid without claiming to validate its Alias cell.

VERDICT: FAIL 3, 6; outside the claims: none