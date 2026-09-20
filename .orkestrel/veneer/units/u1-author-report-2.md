U1-author stopped before implementation under the brief's deviation contract. The amended brief requires a guard in `src/browser/guards.ts`, while scaffold's architecture rule requires guards in `validators.ts`. No source, test, configuration, manifest, or guide was changed.

The blocking deviation is:

- Expected: implement `isThemeMode(value: unknown): value is ThemeMode` in `src/browser/guards.ts`, as `u1-author-brief-2.md:92` requires.
- Found: `../scaffold/.claude/rules/architecture.md:22` assigns guards solely to `*/validators.ts`. At line 153 it states: “The kind table is mandatory whether or not an instrument can see the violation.” The exhaustive function-file list in `configs/policy.ts:158-174` includes `validators.ts` and excludes `guards.ts`.
- Exact stop instruction: `u1-author-brief.md:266-267` says, “Stop and report” on “a rule that forbids a file this brief names.”
- Done: read the briefs in order, identified the placement conflict, ran the required baseline measurements, and overwrote the previous report.
- Not done: implementation, mutation controls, builds, and final acceptance gates. No implementation fix was attempted because the named-file conflict itself triggers the stop.
- Required resolution: amend the brief to own and require `src/browser/validators.ts` and its mirrored proof instead of `src/browser/guards.ts`, or resolve the rule in scaffold. This unit did neither. No hypothesis is needed.

The measurements before editing were taken at `a5de4c4` on 2026-09-20. These are baseline results, not final acceptance results.

| Command | Exit | Final result lines |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | `npm notice run @orkestrel/veneer@0.0.1 lint:check`; `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 1 | `error TS5058: The specified path does not exist: 'configs/src/tsconfig.styles.json'.` |
| `npm.cmd run test:src` | 0 | `Test Files  2 passed (2)`; `Tests  2 passed (2)`; `Duration  4.31s (transform 34ms, setup 36ms, import 42ms, tests 9ms, environment 0ms)` |
| `npm.cmd run test:app` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  4.09s (transform 0ms, setup 11ms, import 13ms, tests 3ms, environment 0ms)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)`; `Duration  2.48s (transform 139ms, setup 22ms, import 469ms, tests 1.78s, environment 0ms)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)`; `Duration  4.28s (transform 369ms, setup 23ms, import 1.22s, tests 2.84s, environment 0ms)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  327ms (transform 48ms, setup 31ms, import 56ms, tests 5ms, environment 0ms)` |
| `npm.cmd run test:guides` | 1 | `Test Files  1 failed (1)`; `Tests  4 failed \| 13 passed (17)`; `Duration  591ms (transform 36ms, setup 19ms, import 308ms, tests 23ms, environment 0ms)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  3.13s (transform 0ms, setup 9ms, import 8ms, tests 3ms, environment 0ms)` |
| `npm.cmd run test:journey` | 1 | `No test files found, exiting with code 1` |

The guide failures match the amendment's baseline. The exact findings are:

```text
guides/veneer.md has no ## Methods section.
guides/veneer.md has no ## Tests section.
guides/veneer.md has no documented method groups.
guides/veneer.md has no mapped self import.
guides/veneer.md has no links.
guides/veneer.md has no test links.
```

The failing assertions are `documents populated method groups` at `tests/guides.test.ts:84`, `imports only real exports in every ```ts fence` at line 101, `resolves every relative link` at line 104, and `links only to test files that exist` at line 107.

The journey command finds no `tests/app/browser/integration.test.ts` for `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, or `journey:dark-390`. The baseline browser projects that collected tests launched successfully. The configuration baseline passes; the previous report's missing-`setup` blocker did not recur.

The changed-file path list is:

- `u1-author-report.md`

The controls have no red or green-after-removal readings because none was planted:

| Control | Red output | Green after removal |
| --- | --- | --- |
| `PLANT-VUE` | Not run | Not run; never planted |
| `PLANT-ESCAPE` | Not run | Not run; never planted |
| `PLANT-TYPE` | Not run | Not run; never planted |
| `PLANT-BOOTSTRAP` | Not run | Not run; never planted |
| `PLANT-PEER` | Not run | Not run; never planted |
| Journey: omit the toggle act | Not run | Not run; never mutated |
| Refusal: render `Sign in` | Not run | Not run; never mutated |

The required implementation decisions remain unmade:

| Item | Reading |
| --- | --- |
| RTL mechanism | Not chosen; stopped before the styles step. |
| `vue-tsc` unknown | Unanswered for the proposed journey imports. `check` stopped at the missing styles configuration before reaching `check:app:browser`; no journey suite was authored. |
| App alias used to reach the engine | None; the engine and its app consumer were not implemented. |
| Shared-file patch | None proposed. No change to `package.json`, `vite.config.ts`, or vendored files was attempted. |

The final acceptance gate chain was not run. This applies to every command below; the earlier table records baseline executions only.

```text
npm.cmd run format:check
npm.cmd run lint:check
npm.cmd run check
npm.cmd run build
npm.cmd run test:src
npm.cmd run test:src:styles
npm.cmd run test:app
npm.cmd run test:journey
npm.cmd run test:policy
npm.cmd run test:config
npm.cmd run test:setup
npm.cmd run test:setup:browser
npm.cmd run test:conformance
npm.cmd run test:guides
```

No throwaway setup configuration was created. Distribution, release-mode distribution, Edge journeys, and captures were not run.

The review evidence shows no tracked changes: `git diff --stat` and `git status --porcelain` returned no file rows. Git also reported `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied`. The report is under ignored `tmp/` and therefore does not appear in ordinary status output. The built tree is absent; `rg --files dist` returned:

```text
rg: dist: IO error for operation on dist: The system cannot find the file specified. (os error 2)
```
