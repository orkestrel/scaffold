# d7n Msg native Guide adoption report

## Outcome

Complete and frozen in the owned product scope. `tests/guides.test.ts` now executes the public
`GuideCommand` directly under Node. It preserves Msg's package-specific membership policy and the
executed flagship assertions.

## Touched paths

- Product: `C:/Users/mikes/WebstormProjects/msg/tests/guides.test.ts`
- Dispatch report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-msg-native-adopt-report.md`

No shared-file patch is required. No other Msg product path is changed.

## Obligation mapping

| Obligation | Implementation |
| --- | --- |
| Native shared entry | Imports `GuideCommand`, `readInventory`, and `createVitest` directly and calls `execute` with an anonymous async callback. |
| Native alias safety | Keeps type imports static. Loads `@src/core`, Vitest registration, and `setupServer.js` inside the callback. |
| Complete inventory | Uses `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, and `*.md`. |
| Fresh command context | Reads `files`, `report`, `root`, and `rows` from the callback. Resolves the Msg guide row from `rows`. |
| Shared parity reports | Uses `report.input`, `report.fences`, `report.examples.titles`, `report.pitch`, `report.methods`, `report.drift`, `report.examples.functions`, `report.examples.methods`, `report.imports`, `report.links`, and `report.tests`. |
| Msg membership policy | Retains `INTERNAL`, its anti-staleness assertion, direct/barrel parity assertions, guide/barrel parity assertions, hidden-declaration assertion, and non-empty guide surface assertion through public row primitives. |
| Non-vacuous populations | Requires the Msg row, verifies `GUIDE_SPEC` is present, checks the title report for the resolved Msg row, and checks the pitch report. |
| Flagship proof | Preserves every flagship expression and returned-value assertion, the real `test.msg` fixture through `readFixture`, and the `MSGError` source presence guard. |
| Current command prose | Replaces the obsolete docs-command reference with `npm run test:guides` and the native direction flags. |

## Defect proof

Baseline command:

```text
node --experimental-strip-types tests/guides.test.ts
```

Baseline exit: `1`. Node failed while resolving the static runtime `@src/core` import:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from C:\Users\mikes\WebstormProjects\msg\tests\guides.test.ts
```

Failing test count: unavailable. Module loading failed before Vitest started or collected a test.

Post-change command:

```text
node --experimental-strip-types tests/guides.test.ts
```

Post-change exit: `0`. Vitest reported `Test Files 1 passed (1)` and `Tests 30 passed (30)`.

## Scoped validation

| Command | Result |
| --- | --- |
| `node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/guides.test.ts` | Exit `0`; the owned file is formatted. |
| `node_modules/.bin/oxlint --config .oxlintrc.json tests/guides.test.ts` | Exit `0`; no diagnostics. |
| `npm run test:guides` | Exit `0`; `Test Files 1 passed (1)`, `Tests 30 passed (30)`. |
| `node --experimental-strip-types tests/guides.test.ts` | Exit `0`; `Test Files 1 passed (1)`, `Tests 30 passed (30)`. |
| `git -C C:/Users/mikes/WebstormProjects/msg diff --check -- tests/guides.test.ts` | Exit `0`; no whitespace errors. |

Product diffstat:

```text
tests/guides.test.ts | 698 ++++++++++++++++++++++-----------------------------
1 file changed, 298 insertions(+), 400 deletions(-)
```

Final Msg status contains only `M tests/guides.test.ts`.

## Limit

The public report does not expose an exception seam for Msg's `INTERNAL` declaration set. The
entry therefore keeps that package policy and its anti-staleness check through the public row
`source` primitives. Root owns broad gates and the supported removal of `scripts/docs.ts`; neither
was run or changed here.
