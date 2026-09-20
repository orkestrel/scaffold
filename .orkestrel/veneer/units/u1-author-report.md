U1-author stopped before implementation under the brief's deviation contract. The baseline `test:config` gate requires a `setup` project that the off-limits `vite.config.ts` file does not register. No source, test, configuration, manifest, or guide was changed.

The blocking deviation has the following evidence.

- Expected: `npm.cmd run test:config` passes before return, while the Orchestrator registers the Node `setup` project through `scaffold repair` after return.
- Found: the existing `tests/setupBrowser.test.ts` file already selects `setup` in the configuration proof. At `tests/config.test.ts:207`, `globSync('tests/setup*.test.ts', { cwd: root }).length > 0` adds that required project. The project list at `vite.config.ts:387` contains `setupBrowser` but no `setup` factory or configuration.
- Exact evidence: `tests/config.test.ts:288:11` throws `Error: setup has no project factory or configuration`. The full baseline gate and the isolated case each reproduce that failure.
- Done: ran the requested baseline measurements and isolated the configuration failure. Preserved the checkout and wrote this report.
- Not done: implementation, mutation controls, final gates, and builds. Passing the configuration proof requires changing an off-limits file or running the repair reserved for the Orchestrator. Deleting the browser setup proof would violate the assignment.
- Required action: the Orchestrator must resolve the missing `setup` registration before this unit can meet its configuration acceptance criterion. No hypothesis is needed; the selection condition and missing registration are directly visible.

The measurements before editing were taken on 2026-09-20. These are baseline results, not final acceptance results.

| Command | Exit | Final result lines |
| --- | --- | --- |
| `npm.cmd run lint:check` | 1 | `tests/setupConformance.ts:10:1`, `:13:1`, and `:16:1`: `error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.` |
| `npm.cmd run check` | 1 | `error TS5058: The specified path does not exist: 'configs/src/tsconfig.styles.json'.` |
| `npm.cmd run test:src` | 0 | `Test Files  2 passed (2)`; `Tests  2 passed (2)`; `Duration  3.84s` |
| `npm.cmd run test:app` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  1.55s` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)`; `Duration  2.85s` |
| `npm.cmd run test:config` | 1 | `Test Files  1 failed (1)`; `Tests  1 failed \| 172 passed \| 1 skipped (174)`; `Duration  4.34s` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  343ms` |
| `npm.cmd run test:guides` | 1 | `Test Files  1 failed (1)`; `Tests  no tests`; `Duration  674ms` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  1.35s` |
| `npm.cmd run test:journey` | 1 | `No test files found, exiting with code 1` |

The configuration failure reports this exact assertion site.

```text
FAIL  |config| tests/config.test.ts > root configuration > registers every workspace project with its fixed include and setup files
Error: setup has no project factory or configuration
 ❯ tests/config.test.ts:288:11
```

The guide failure reports this exact diagnostic.

```text
FAIL  |guides| tests/guides.test.ts [ tests/guides.test.ts ]
Error: Missing manifest row: guides/veneer.md
 ❯ requireValue node_modules/@orkestrel/test/src/core/helpers.ts:532:30
 ❯ tests/guides.test.ts:40:14
```

The journey command reports the absent `tests/app/browser/integration.test.ts` suite for `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, and `journey:dark-390`. The browser projects that collected tests launched successfully. The setup browser run reported `Port 63315 is in use, trying another one...` and then passed.

The isolated confirmation used this command.

```text
npx.cmd vitest run --config vite.config.ts --project config -t "registers every workspace project with its fixed include and setup files"
```

It exited 1 with these final result lines and the same missing-project diagnostic.

```text
Test Files  1 failed (1)
     Tests  1 failed | 173 skipped (174)
  Duration  1.06s
```

The file path list contains only the report created by this unit.

- `tmp/codex/u1-author-report.md`

No planted control ran. `PLANT-VUE`, `PLANT-ESCAPE`, `PLANT-TYPE`, `PLANT-BOOTSTRAP`, and `PLANT-PEER` were never installed, so there is no red output or green-after-removal result to report. The journey toggle and refusal mutations were not run. No plant requires removal.

The RTL mechanism remains undecided because implementation stopped before the styles step. The `vue-tsc` question remains unanswered: `npm.cmd run check` stopped at the missing styles TypeScript configuration before reaching `check:app:browser`, and no journey suite was authored.

No shared-file patch is proposed at this stop. The required configuration repair belongs to the Orchestrator under the brief; this unit did not edit `package.json` or `vite.config.ts` and did not run `scaffold repair`.

The final gate chain was not run. This includes `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run test:src`, `npm.cmd run test:src:styles`, `npm.cmd run test:app`, `npm.cmd run test:journey`, `npm.cmd run test:policy`, `npm.cmd run test:config`, `npm.cmd run test:setup:browser`, `npm.cmd run test:conformance`, and `npm.cmd run test:guides`. The temporary Node setup configuration and its command were not created or run. Distribution, release-mode distribution, Edge journeys, and captures were not run.

The review evidence shows no tracked changes: `git diff --stat` and `git status --porcelain` returned no file rows. Git also reported `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied`. The report exists under the ignored `tmp/` directory and therefore does not appear in ordinary status output. The built-tree inspection returned `dist/ is absent`.
