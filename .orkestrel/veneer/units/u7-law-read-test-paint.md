<!-- checker on native Sonnet, workflow wf_8a54447e-081, agent a156dd61387a9d462; law read of the pending document; retained 2026-09-20 -->

## Table 1 — Forbidden actions, surface additions, package additions, rule amendments, vendored-file touches, invented names, or contradicted rulings

| Line | Text | Rule (file:line) | Departure |
|---|---|---|---|
| brief-1:87–88 | "Export the conversions it composes as their own helpers (`convert\*` per the helper-prefix table)" | `.claude/rules/names.md:91-106` (§ Standalone helpers, the fixed-meaning prefix list) | The cited "helper-prefix table" lists `extract*`, `infer*`, `compute*`, `matches*`, `build*`, `read*`, `resolve*`, `scan*`, `describe*`, `normalize*`, `collect*`, `filter*`, `render*`, `supports*` only; `convert*` is absent. The instruction misattributes rule support to a form the table does not admit. `convert*` remains permitted only under the general `{verb}{Noun}` standalone-helper default (`names.md:85-87`), never under "the helper-prefix table" as the brief states it. |
| brief-1:105–106 and brief-1:129–130 (acceptance criterion 4) | "**Gates.** `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run test:src:browser`, `npm.cmd run test:guides`, `npm.cmd run test:policy`" / "`format:check`, `lint:check`, `check`, the browser proof, `test:guides`, and `test:policy` exit 0" | `AGENTS.md` § Work process, "Quality gates before commit, in order": `npm run format:check → npm run lint:check → npm run check → npm run build → npm test` | The named gate chain requires `npm run build` between `check` and `test`. The brief's Gates step and its matching acceptance criterion omit `build` entirely. |
| brief-2:25–29 | "As in the previous brief... Write the report to `tmp/units/test-paint-report-2.md`." | same rows as above | Brief 2 supersedes only item 3 (the ring reading); its Gates and Acceptance-criteria sections carry brief 1's omission of `npm run build` forward unchanged. |

No other line in either brief instructs an executor to do something a rule forbids: no npm package is added (brief 1:76 states "Add no dependency: the conversions are native arithmetic," which the `AGENTS.md` non-negotiable rule requires), no surface beyond `browser` (an admitted surface) is touched, no scaffold rule is amended, no vendored or content-owned file outside the package's own `guides/test.md` is edited, and no standing ruling (surfaces limited to core/browser/server/styles, Vue as a deferred service, no RTL work, one guide per package) is contradicted. The off-limits list (brief-1:69-71, inherited by brief 2) correctly excludes `src/core/**`, `src/server/**`, `tests/setup*.ts`, and `package.json`.

## Table 2 — File paths the documents tell an executor to create or edit

| File path | Rule row that places it |
|---|---|
| `src/browser/helpers.ts` | `.claude/rules/architecture.md:21` (Centralized-file pattern: "Pure helpers \| `*/helpers.ts`") |
| `src/browser/types.ts` (conditional) | `.claude/rules/architecture.md:18` (Centralized-file pattern: "Interfaces/types \| `*/types.ts`") |
| `tests/src/browser/helpers.test.ts` (the mirrored proof file(s), brief-1:68) | `.claude/rules/tests.md:13-14` ("Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`") |
| `guides/test.md` | `.claude/rules/names.md:216` (Files and folders: "Guide \| lowercase domain: `agents.md`") |
| `tmp/units/test-paint-report.md` (brief 1) | no row — an orchestration dispatch artifact under `.agents/orchestration.md` § Dispatch anatomy, not a code-placement rule |
| `tmp/units/test-paint-report-2.md` (brief 2) | no row — same as preceding |

Neither document adds a surface beyond core, browser, server, or styles; both scope entirely to the existing `src/browser` environment of `@orkestrel/test`.
