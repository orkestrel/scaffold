The port matches scaffold, but the return documentation is false and the control claim overstates what the position case distinguishes.

The per-claim verdicts are:

| Claim | Verdict | Deciding evidence |
|---|---|---|
| 1 | **CONFIRMED** | Byte comparison of the function declarations in `vite.config.ts:107` and `:137` against `git show f83ee063:vite.config.ts` in scaffold returned identical. Altered-text controls returned different. |
| 2 | **REFUTED** | The report names the documentation adaptations, and the TSDoc frame and application wording are justified. The `@returns` adaptation at `vite.config.ts:82` is incorrect, so not every difference is justified. |
| 3 | **REFUTED** | “Every base entry” does not survive replacement. Executing the extracted source with installed Vite returned `[replacement, repeatedBase]` for base `[originalBase, repeatedBase]` and override `[replacement]`, all sharing a name. The assertion that the original base entry survives failed. `tests/conformance.test.ts:240` explicitly requires its replacement. |
| 4 | **CONFIRMED** | Each behavior enumerated in the unit brief has a case at `tests/conformance.test.ts:197`, `:213`, `:232`, `:251`, `:269`, and `:287`, plus a retained subject-mutation script and failure log. The position instrument’s isolation violation is a finding below. |
| 5 | **REFUTED** | Every added case contains an assertion-failing control, but the position case controls against bare `mergeConfig`, not the first draft (`tests/conformance.test.ts:243`). Executing its assertions against the first draft and port returned true for each; bare Vite returned false. |
| 6 | **CONFIRMED** | AST comparison against `b432653:tests/conformance.test.ts` found every existing case unchanged. `tmp/units/r1-test.log.txt` records `11 passed (11)`. The Vue case at `tests/conformance.test.ts:160` still checks plugin multiplicity; its bare-merge control requires `2` and rejects `1`. An independent read-only execution reproduced those values. |
| 7 | **CONFIRMED** | `tests/config.test.ts:321` filters registered factories, rejects an empty population, invokes every factory with the sentinel, and checks every sentinel field. The sentinel includes `command` and `mode`. Installed Vite declares those fields in `ConfigEnv` at `node_modules/vite/dist/node/index.d.ts:3321`. Factories that ignore arguments need no merge refusal; applicable factories receive the discriminating pair. |
| 8 | **CONFIRMED** | The wrapper calls `appBrowser()` (`configs/app/vite.browser.config.ts:4`); journey configurations do likewise (`vite.config.ts:265`). Their factory bodies are unchanged, and the undefined-override return is unchanged. The retained ported and draft captures compare equal; the control capture compares unequal. The capture erases plugin implementation details (`tmp/probe/r1capture.test.ts:20`), so source inspection is necessary alongside that measurement. |
| 9 | **UNSETTLED** | `git diff b432653` confirms implementation changes only in the owned TypeScript files, with no vendored-file changes. The unrestricted historical claim is not established: ignored instruments exist under `tmp/probe/`, outside the literal owned list, and the evidence contains no pre-unit inventory of ignored files. Git status cannot establish whether transient writes occurred. |
| 10 | **CONFIRMED** | TypeScript AST inspection of the changed files found no `any`, type assertion, or non-null assertion. A control containing each prohibited syntax form was detected. The suppression-pattern scan over those files found no suppression comments. |
| 11 | **CONFIRMED** | Case-insensitive `deprecat` searches over `tmp/units/r1-build.log.txt` and `tmp/units/r1-test.log.txt` returned no matches. The search detected a synthetic `DEPRECATION WARNING` control. This verdict concerns the retained runs. |

The retained mutation results substantiate claim 4:

| Instrument under `tmp/units/` | Recorded result |
|---|---|
| `r1-red-nested.log.txt` | `1 failed \| 10 passed (11)` |
| `r1-red-caller-duplicate.log.txt` | `1 failed \| 10 passed (11)` |
| `r1-red-position.log.txt` | `2 failed \| 9 passed (11)` |
| `r1-red-taken-once.log.txt` | `1 failed \| 10 passed (11)` |
| `r1-red-numbered-name.log.txt` | `1 failed \| 10 passed (11)` |
| `r1-red-discriminant.log.txt` | `1 failed \| 10 passed (11)` |

The findings are:

- **P2 — False return contract.** [vite.config.ts:82](C:/Users/mikes/WebstormProjects/roughnotes/vite.config.ts:82) promises preservation of every base entry, while matching overrides replace base objects. Describe preservation of **base positions**, with matching replacements and appended unmatched overrides.
- **P2 — Added reusable helpers violate the test-infrastructure placement contract.** [tests/conformance.test.ts:70](C:/Users/mikes/WebstormProjects/roughnotes/tests/conformance.test.ts:70), `:85`, and `:92` introduce reusable local helpers. Scaffold’s `.claude/rules/tests.md:173` requires shared test infrastructure in setup modules. Passing gates do not resolve this source-level contract violation.
- **P2 — The position mutation lacks the required isolated failure record.** `tmp/units/r1-red-position.log.txt:14` and `:35` show failures in the position and base-repeat cases. Scaffold’s `.claude/rules/tests.md:41` requires a defect’s instrument to redden exactly its named case. Scope that instrument to the position case and retain its result; keep the useful overlapping assertion.
- **P3 — The control claim misidentifies its comparison.** [tests/conformance.test.ts:243](C:/Users/mikes/WebstormProjects/roughnotes/tests/conformance.test.ts:243) correctly names bare Vite as its control. Claim 5 incorrectly describes every control as contrasting against the first draft. This is an evidence-description failure, not a merge regression.

The hazard rulings are:

- **The `@returns` rewrite:** It overstates base-entry preservation. Read alone, it cannot correctly predict replacement in the base-repeat example. The remarks explain replacement accurately, but do not repair the contradictory return line.
- **The nested-entry residual:** The remarks at `vite.config.ts:94` explicitly limit selection to named top-level objects. The case at `tests/conformance.test.ts:197` proves preserved nesting and top-level multiplicity, not resolved deduplication. Installed Vite recursively flattens plugins at `node_modules/vite/dist/node/chunks/node.js:36926`; duplicate resolved names remain consistent with this documented limit.
- **The Python instruments:** Python resolves on this host (`Python 3.14.7`), so the language choice does not prevent reproduction here. Every red script places its mutation inside `try` and restores the captured text in `finally`, including subprocess-launch and ordinary exception paths. Missing targets exit before writing. Forced process termination or a failed restoration write remains outside that protection.
- **The Vue case’s changed reason:** Its assertions still bind the behavior they name: plugin multiplicity. Replacement instead of map collapse is a valid changed mechanism. The bare-merge control still discriminates.
- **The overlapping mutation:** The overlap is honest. Both failing assertions inspect the replacement object, and the log shows assertion failures rather than collection or harness failures. The base-repeat case separately checks the surviving repeated object at `tests/conformance.test.ts:259`. The overlap does, however, violate the required isolation of the retained instrument.

The scoped Vitest command failed before collection because the sandbox denied creation of Vite’s temporary configuration file. The host command that settles fresh conformance execution is `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project conformance`. Runtime observations here used read-only, in-memory execution of extracted source; gate verdicts rely on the retained logs.

VERDICT: REJECT