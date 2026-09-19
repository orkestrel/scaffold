# Require the named browser setup case to pass

The generated Vue consumer regression reads Vitest's JSON result and requires the named browser setup case to have `status: 'passed'`. The regression preserves the child exit-code assertion, verbose project/path discovery assertions, and unconditional scratch destruction. The conditional compiler/template repair remains frozen.

The effective brief is `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/setup-vue-fix-brief-3.md`. This successor report replaces earlier reports only for the consumer proof's execution requirement. Preserve the earlier source, red/green, reporter, and scoped-suite evidence.

## Reproduced false green

The parent instrument at `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/run-setup-vue-skip-control.ps1` changed the generated fixture's registration from `it(...)` to `it.skip(...)` in the isolated control checkout and ran:

```text
npm.cmd run test:distribution -- --mode release tests/distribution.test.ts -t "renders a Vue SFC through the generated browser setup project"
```

The existing proof incorrectly accepted that skipped child: the outer run exited 0 and reported `Tests 1 passed | 7 skipped (8)`, duration `26.06s`. The retained log is `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/setup-vue-skipped-control.log.txt`. The instrument restored original fixture bytes and verified their SHA256. This false green precedes this successor patch and demonstrates the proof defect.

## Owned correction

Only `tests/distribution.test.ts` changed in this successor. The child runner carries `--reporter=verbose`, `--reporter=json`, and `--outputFile.json=tmp/setup-vue-results.json`. The proof reads the report inside its generated scratch workspace and uses the installed `@orkestrel/contract` `parseJSON`, `isRecord`, `isArray`, and `isString` exports to narrow unknown data.

The proof selects the result whose filename resolves to the generated `tests/setupBrowser.test.ts` path. The proof selects assertions whose exact `title` is `renders the Vue component through the browser setup helper`. The expected array contains that assertion with `status: 'passed'`, so absence, duplicate matching cases, skipped status, todo status, and failed status cannot satisfy the assertion. Child failures still fail the preceding exit-code assertion.

The reporter contract was read from installed Vitest 4.1.11 declarations at `node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts`, its JSON reporter implementation at `node_modules/vitest/dist/chunks/index.UpGiHP7g.js`, and its CLI option definitions at `node_modules/vitest/dist/chunks/cac.uFydS1Z4.js`. The implementation writes `testResults`, `name`, `assertionResults`, `title`, and `status`; the CLI supports reporter arrays and reporter-specific output files. The contract primitive declarations came from `node_modules/@orkestrel/contract/dist/src/core/index.d.ts`. No handwritten reporter parser, reusable helper, new type, or dependency was introduced.

## Scoped validation

The commands ran in the release writing checkout on Windows, 2026-09-18:

```text
node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts
node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings tests/distribution.test.ts
node node_modules/typescript/bin/tsc --noEmit -p tmp/units/tsconfig.setup-vue.json
git diff --check -- tests/distribution.test.ts
```

Each final command exited 0. An intermediate lint run reported callback shadowing; the callback's containing result binding was renamed to `paired`, and the same lint command passed. The scoped TypeScript project retains the owned inputs recorded by the original unit.

The cumulative tracked distribution diff against the unit baseline is `81 insertions, 2 deletions`, as measured by `git diff --numstat -- tests/distribution.test.ts`. This successor adds JSON result emission and execution assertions only. The parent-owned `host.json` change and all prior source/test/guide changes were preserved. No shared-file patch is requested. No install-dependent command, build, install, commit, publish, or delegation ran.

## Parent replay and controls

After this writer exits, run the same filtered release distribution command in the release checkout and retain the passing output. This successor changes tests only, so the source artifact needs no rebuild.

For the omission control, retain the original missing-plugin red from the source repair. For execution controls, copy the revised `tests/distribution.test.ts` into the existing isolated audit checkout while preserving its patched fixture and built artifact provenance. Run the existing guarded skip instrument again. The exact registration string remains unchanged in `tests/setupServer.ts`, so that instrument can retain its mutation and SHA256 restoration mechanism. The same filtered command must exit nonzero at the named-case JSON assertion when the child registration is skipped.

Use separate guarded fixture mutations and retain a log for each. Change the generated registration's `it(...)` to `it.todo(...)` to exercise todo status. Rename the generated case's title to a different title while preserving its body to exercise absence of the required named case. Change its expected rendered marker from `'vue'` to a different value to exercise child assertion failure. The filtered outer command must fail for every control. Preserve the original bytes before each mutation, restore them in `finally`, and verify the original SHA256 after restoration. Replay the positive after all controls.

The revised installed consumer run and mutation readings remain outstanding parent evidence. The writer has verified the TypeScript, lint, and formatting of the revision and inspected the installed reporter contract; the writer has not executed the install-dependent revised proof. This report does not claim acceptance or final runtime green.
