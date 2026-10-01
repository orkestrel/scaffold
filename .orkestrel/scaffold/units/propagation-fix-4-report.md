# Propagation fix 4 report

The emitted sheet projects collect their proofs after the repair. Acceptance remains incomplete: the packed adopter reaches `test:setup`, which fails because the generated manifest has no such script. Work stopped under the brief's deviation contract.

## Cause and repair

`src/core/compilers.ts:982` registers sheet projects by wrapper filename. Vitest 4.1.11 defaults a file project's root to that wrapper's directory (`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:11210`) and resolves collection against `test.dir || test.root` (`:10833`). The emitted `sheetProject` omitted `test.root`, so its `tests/src/styles/**/*.test.ts` glob searched beneath `configs/src`.

The generated wrapper sets neither `root` nor `dir`. Veneer's wrapper also sets neither; its root project array does not register that wrapper. The brief's proposed CSS-face root was not the cause.

`src/core/templates.ts:180` supplies the workspace root in the sheet factory's test configuration:

```diff
 name: { label: name, color: 'magenta' },
+root: resolveWorkspacePath('.'),
 isolate: false,
```

`tests/config.test.ts:76` adds `collects each selected sheet proof from the effective project root and rejects a wrong root`. It loads each selected sheet wrapper, resolves its include globs, requires the entry proof and the themes proof where present, and confirms that the wrapper-directory control collects nothing and fails the same membership assertion.

The final case was driven in the generated sheet workspace with only the repaired root removed: 1 failed, 198 filtered. Restoring that root produced 1 passed, 198 filtered. The same command was used:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project config tests/config.test.ts -t "collects each selected sheet proof"
```

The original `npm run test:src:styles` exited 1 with no collected files. After rebuilding and regenerating, that command exited 0 with 2 files and 2 tests passed. `npm run test:src:print` exited 0 with 1 file and 1 test passed. Vitest's collected-file reading was:

```text
[src:print (chromium)] tests/src/print/index.test.ts
[src:styles (chromium)] tests/src/styles/index.test.ts
[src:styles (chromium)] tests/src/styles/themes/index.test.ts
```

## Files changed

Changes relative to the captured starting bytes are:

- `src/core/templates.ts`: sheet test root.
- `tests/config.test.ts`: selected-face collection case and control.
- `host.json`: regenerated configuration-proof digest and aggregate digest through `npm run build`.

The configuration-proof inventory digest changed from `716f62af1974b53f6d01bfa289e896bc623ce07c7c4cc19b996ab1649342b386` to `f4eec29973fe6e4703fc9bbd74dbb80b1f4520667c806c7e76c2507e95da9143`. The aggregate digest changed from `18c622fdc2ce293832433ae511d93891425c10d0f1aa4ec00b5dea6ee63eaf88` to `6f7c376d4167db7fa8b237ef2d09e52c275fa65a491f90bdb4275a9cc4d4a3ed`.

Identity-set changes: none; this checkout does not materialize `sheetProject`. Guide changes: none. Changes outside the owned set: none. Earlier campaign changes were preserved. Unit scripts, logs, baseline copies, and this report remain under `tmp/units/propagation-fix-4-*` for review.

## Packed adopter readings

The adopter ran from the packed CLI. Its observed steps were:

| Step | Exit | Duration | Test reading |
| --- | --- | --- | --- |
| Pack and consumer install | 0 | not reported | none |
| Generate | 0 | not reported | none |
| Install | 0 | npm reported 7 s | none |
| `lint:check` | 0 | 918 ms | none |
| `check` | 0 | 12131 ms | none |
| `build` | 0 | 17918 ms | none |
| `test:src` | 0 | 9857 ms | core/browser/Vue: 3 passed; styles/themes: 2 passed; print: 1 passed |
| `test:app` | 0 | 2897 ms | 3 passed |
| `test:setup` | 1 | 189 ms | no tests ran |

The generated-script failure is quoted verbatim:

```text
adopter: test:setup: exit 1, 189 ms
npm error Missing script: "test:setup"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\mikes\scoop\persist\nodejs-lts\cache\_logs\2026-10-01T05_26_13_840Z-debug-0.log
```

The adopter's closing reading was:

```text
adopter: wall time 59033 ms; scratch removed: true
```

Downstream readings are:

- `test:setup:browser`, `test:config`, `test:policy`, `test:journey`, `test:journey:vue`, `build:showcase`, and `build:showcase:vue`: not reached.
- Browser and Vue page stamps against `computeStamp`: none; not reached.
- CSS consumer result: none; not reached. The sheet builds and Chromium proofs passed.
- Repair byte comparison: none; not reached.
- Stale audit finding: none; not reached.

The full distribution command completed naturally: exit 1; 1 failed, 9 passed, 1 skipped; Vitest duration 200.27 s; measured command duration 200842 ms. The failing assertion is `tests/distribution.test.ts:286`. The oracle was not edited.

## Desk scratch readings

Generated guide index: none. Generated showcase and journey scripts: none. Generated factory-body reading: none. The prescribed `desk` generation follows distribution and was not run after the required stop.

The reproduction directory `C:/Users/mikes/AppData/Local/Temp/scaffold-fix-4` and the adopter directory `C:/Users/mikes/AppData/Local/Temp/propagation-adopter-QDB9wc` were removed and their absence confirmed. No unit-created scratch directory or probe remains.

## Commands and results

In this table, `<owned files>` means `src/core/templates.ts tests/config.test.ts host.json`. The runner used `npm exec --` for the installed executables requested through `npx`; the final format check used `npx` directly. Output was read without a failure-filtering pipeline.

| Command | Exit | Test count or result |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` | 0 on each run | owned scope formatted; inventory ignored by formatter |
| `npx tsc --noEmit --project tsconfig.json` | 0 on each run | none |
| `npm run check:src:core` | 0 on each run | none |
| `npx oxlint --config .oxlintrc.json src tests configs` | 1, then 0 | assertion lint defects repaired |
| `npm run test:src:core` | 0 | 479 passed |
| `npm run build` | 0 on each run | host and inventory regenerated |
| `npm run test:src:bin` | 0 | 286 passed |
| `npm run test:setup` | 0 | 188 passed, 3 skipped |
| `npm run test:config` | 0 | 198 passed, 1 skipped |
| `npm run test:policy` | 0 | 118 passed |
| `npm run test:guides` | 0 | 45 passed |
| `npm run lint:check` | 0 | none |
| `npm run test:distribution` | 1 | 1 failed, 9 passed, 1 skipped |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | 0 on each run | correct format |
| `git diff --check` | 0 on each run | no whitespace errors |

Scratch and regression commands produced:

| Command | Exit | Test count or result |
| --- | --- | --- |
| `node dist/bin/main.js new sheets --target <os.tmpdir()>/scaffold-fix-4 --src core,browser --app core,browser --styles --themes --extend styles:print --offline` | 0 initially; 1 with retained dependencies; 0 after complete removal | generated workspace; intervening non-vacant-target refusal |
| Scratch `npm install --ignore-scripts --prefer-offline --no-audit --no-fund` | 0 on each run | installed only in scratch |
| Scratch `npm run test:src:styles` | 1 before repair; 0 after repair | no files before; 2 files and 2 tests passed after |
| Scratch `npm run test:src:print` | 0 | 1 file and 1 test passed |
| Focused config command quoted under Cause and repair | 1 before repair; 0 after repair | 1 failed, then 1 passed; 198 filtered per run |
| Same command with final root-removal control, then restoration | 1, then 0 | 1 failed, then 1 passed; 198 filtered per run |
| `node node_modules/vitest/vitest.mjs list --config vite.config.ts --project src:styles --project src:print --filesOnly` | 0 | collected files quoted under Cause and repair |

The capped TypeScript drivers ran through `node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal <log> --errors <errors> --cap <seconds> -- node <driver>`. Every launch ended uncapped. Driver results were:

| Driver under `tmp/units/` | Cap | Exit | Result |
| --- | --- | --- | --- |
| `propagation-fix-4-reproduce.ts` | 600 s | 1 | expected collection failure |
| `propagation-fix-4-pin.ts` | 120 s | 1 | expected regression failure |
| `propagation-fix-4-repair.ts` | 600 s | 1 | build passed; non-vacant regeneration refused |
| `propagation-fix-4-regenerate.ts` | 600 s | 0 | sheet scripts and config case passed |
| `propagation-fix-4-gates.ts`, initial run | 900 s | 1 | stopped at owned assertion lint defects |
| `propagation-fix-4-gates.ts`, corrected run | 900 s | 1 | stopped after distribution completed; 357084 ms |
| `propagation-fix-4-control.ts` | 120 s | 0 | expected failing control and passing restoration |
| `propagation-fix-4-close.ts` | 120 s | 0 | format, whitespace, ownership, and cleanup checks |

Read-only `git status --porcelain`, `Get-Content`, and successful `rg` inspections exited 0. Windows wildcard-path `rg` attempts exited 1 and were replaced with directory searches using `-g`. Unit-relative `git diff --no-index` commands exited 1 for expected differences. These commands ran no tests.

## Deviations and stop

Expected: the packed adopter completes every declared step and downstream reading. Found: its unconditional `test:setup` invocation fails with a missing-script error. Evidence: the bare failure quoted under Packed adopter readings and `tests/distribution.test.ts:286`. Done: sheet collection repaired, regression and control proved, checkout gates through lint passed, distribution allowed to finish, scratch removed. Not done: downstream adopter readings and `desk` readings. Hypothesis: the adopter requests the optional Node setup script for a selection that emits no Node setup proof.

The reproduction harness initially retained `node_modules` and `package-lock.json` during regeneration. The CLI correctly refused the non-vacant target. The owned scratch was then removed completely, regenerated, and reinstalled.

The initial scoped lint run rejected a conditional assertion and a `toThrow` call without an expected message. Both were corrected inside the owned case; the prescribed gate sequence was restarted and passed through `lint:check`.

The closing read-only format check ran during distribution's remaining cases and again after distribution completed. No implementation continued after the generated-script stop. No subagent, commit, checkout dependency installation, or tree-wide mutating lint or format command was used.
