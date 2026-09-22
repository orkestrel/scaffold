<!-- Unit F4 HOST-OBSERVATIONS, run 3: `sol` on GPT-6 Astra (codex exec, workspace-write with the network-access override), thread 01a0c98c-d357-76d2-b5c4-2fa40da49f7b, returned 2026-09-22 with tracked edits in ten files and a stop on the fixture formatting gate. Brief: f4-brief-3.md over f4-brief-2.md and f4-brief.md, with f4-terrain.md. Journal: tmp/codex/f4-3.jsonl (launch journal, swept at acceptance). Retained verbatim; the Orchestrator closes the unit under f4-brief-4.md. -->

# F4 HOST-OBSERVATIONS — report 3

The unit stopped on the oracle fixture's formatting gate and write restriction. The Button restoration matrix ran red before the prescribed engine change and green after it. The assignment remains incomplete.

The effective instruction is `tmp/units/f4-brief-3.md`, over `f4-brief-2.md` and `f4-brief.md`. This report supersedes the earlier report paths for this run. The role was `sol` on GPT-6 Astra, with no spawned agents.

The obligations reached the following states.

- **Obligation 1 — recorder:** `tests/setup.ts` declares the readonly generic `EventReading` interface without DOM dependencies. `tests/setupBrowser.ts` exports `recordEvents`, which composes the installed `createRecorder` function and snapshots the event, target, current target, related target, and composed path inside an abort-scoped listener. `tests/setupBrowser.test.ts` adds attached-host and detached-host assertions, event identity, delivery order, related-target presence and absence, unrelated-event exclusion, and abort behavior. Its export inventory includes the helper. The recorder proof has not run.
- **Obligation 2 — event assertions:** `tests/src/browser/Button.test.ts` and `tests/src/browser/helpers.test.ts` read the target from the recorder's snapshot. The Button case retains its hook recorder, count, event identity, event flags, detail, and completed-state assertions. The helper case retains its event type, detail identity, and flags. These repaired cases have not run; the filtered matrix commands skipped them.
- **Obligation 3 — receipts:** `tests/setupConformance.ts` adds `OracleFixture.browser`, records `browser.version()`, requires a saved string, and removes that provenance field from the metadata comparison. Its doc comment states that distinction. `tests/setupConformance.test.ts` adds differing-build, missing-build, and non-string-build assertions beside the retained version-change assertion. The refresh wrote `tests/fixtures/oracle/button.json`, and a subsequent comparison passed. The README table has not changed. The altered-fixture proof has not run.
- **Obligation 4 — restoration:** `src/browser/Button.ts` adds the `#classified` field, records original class-attribute presence, and removes the restored empty class attribute only when construction found it absent. No existing engine line changed. `tests/setup.ts` adds the readonly `ButtonRestoration` interface. `tests/setupBrowser.ts` exports `BUTTON_RESTORATIONS`, and its export inventory is updated. `tests/src/browser/Button.test.ts` crosses the prescribed class and pressed attributes and asserts membership, the order of other tokens, and attribute presence and value. The existing consumer-edit case is unchanged. An additional case covers consumer class tokens added to an originally classless host; that additional case has not run. The matrix's red and green readings follow.
- **Obligation 5 — delegated release:** `src/browser/Delegate.ts` and the named removal, movement, and reacquisition cases were read. The guide paragraph has not been written.
- **Obligation 6 — registry term:** The rename has not started. `SpecimenManager` and `specimens` remain, and no rename-completion claim is made.
- **Obligation 7 — stripe scopes:** `tests/src/styles/tokens.test.ts` adds the dark-to-light canonical-name check beside the retained light-to-dark check. The stripe case asserts declaration in the light scope beside its retained dark assertion. The styles project has not run.

The following commands produced the development readings on Linux on 2026-09-22. Every npm command used the brief's npm 11 directory on `PATH`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm --version` | 0 | `11.19.1` |
| `npm run test:src:browser -- -t "restores original membership and attribute presence"` before the engine change | 1 | 4 failed, 16 passed, 43 skipped |
| The same matrix command after the engine change | 0 | 20 passed, 43 skipped |
| `npm run check:src:browser` after the engine change | 0 | No diagnostics |
| `npm run lint:check` after the engine change | 0 | No diagnostics; later proof edits followed this run |
| The same matrix command with temporary serialized-class logging | 0 | 20 passed, 43 skipped; observations follow |
| `node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/src/browser/Button.test.ts tests/src/browser/helpers.test.ts tests/setupConformance.ts tests/setupConformance.test.ts tests/src/styles/tokens.test.ts` | 0 | Scoped formatting; the oracle JSON was excluded |
| `ORACLE_REFRESH=1 npm run test:conformance` | 0 | 10 passed |
| `npm run test:conformance` without the refresh flag | 0 | 10 passed |
| `npm run format:check` | 1 | Only `tests/fixtures/oracle/button.json` reported a formatting issue |
| `git diff --check` | 0 | No whitespace errors |

The unrepaired matrix failed this assertion, located at line 196 during that run.

```ts
expect(host.hasAttribute('class')).toBe(classes !== undefined)
```

The failure was `AssertionError: expected true to be false // Object.is equality`. Each failed case had an absent original class attribute, crossed with `aria-pressed` absent, `"true"`, `"false"`, or `"mixed"`. The green run used the same command and assertions after the engine change. Its selected matrix cases all passed.

No complete gate chain ran after the final tracked edit. The final tracked edit was the oracle refresh; the later conformance comparison passed, and the format check stopped the unit. The full `test:src:browser`, `test:setup:browser`, `test:setup`, `test:src:styles`, `check`, and `test:guides` gates have not run. The report's policy reading is recorded at the end.

The event-field sweep used the following command over the owned TypeScript files and the styles subtree, which includes the rename population.

```sh
rg -n 'currentTarget|relatedTarget|composedPath\(|\btarget\b' tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/src/browser/Button.test.ts tests/src/browser/helpers.test.ts tests/setupConformance.ts tests/setupConformance.test.ts tests/src/styles
```

The command exited 0 because it found matches. Review found no host-varying field read from a stored event after dispatch. Direct event-field reads remain inside the listeners in `recordEvents`, `recordState`, and `recordButtonOracle`. Post-dispatch target assertions read `EventReading.target`. Other matches name host variables, event-construction options, types, comments, or strings. The same pattern over `README.md`, `guides/veneer.md`, and `tests/fixtures/oracle/button.json` found guide prose and a selector-engine inventory row, with no stored-event read. This is a text-sweep result over those paths, not an executed proof of recorder behavior.

The serialized-class observations came from the matrix command with temporary logging, which was removed before scoped formatting. Every row held for `aria-pressed` absent, `"true"`, `"false"`, and `"mixed"`.

| Original class attribute | After toggle and destruction | Observation |
| --- | --- | --- |
| Absent | Absent | Presence restored after the engine repair |
| `"active btn"` | `"btn active"` | Active token order changed |
| `" active  btn "` | `"btn active"` | Whitespace collapsed and active token order changed |
| `"btn"` | `"btn"` | Serialized value unchanged |
| `""` | `""` | Empty attribute remained present |

The assertions do not compare serialized class strings. Membership, other-token order, class presence, and pressed-attribute presence and value passed across the matrix.

The fixture's exact browser string is `141.0.7390.37`. The requested header-diff command exited 0 and printed the following opening output.

```diff
diff --git a/tests/fixtures/oracle/button.json b/tests/fixtures/oracle/button.json
index 7686a33..5c9ab3c 100644
--- a/tests/fixtures/oracle/button.json
+++ b/tests/fixtures/oracle/button.json
@@ -1,12 +1,16 @@
 {
 	"version": "5.3.8",
 	"component": "btn",
+	"browser": "141.0.7390.37",
 	"steps": [
 		{
 			"name": "button.initial",
 			"before": {
 				"events": [],
-				"classes": ["btn", "btn-primary"],
+				"classes": [
+					"btn",
+					"btn-primary"
+				],
 				"attributes": {
 					"type": "button",
 					"class": "btn btn-primary",
@@ -26,7 +30,10 @@
 			},
 			"after": {
 				"events": [],
-				"classes": ["btn", "btn-primary"],
+				"classes": [
+					"btn",
+					"btn-primary"
+				],
 				"attributes": {
 					"type": "button",
 					"class": "btn btn-primary",
@@ -49,7 +56,10 @@
 			"name": "button.click.toggle",
 			"before": {
 				"events": [],
-				"classes": ["btn", "btn-primary"],
+				"classes": [
```

No step reading changed. Review of the full diff found array-layout changes and the browser header. The following character-diff command independently showed the browser member as the only non-whitespace addition and no non-whitespace removal; it exited 0.

```sh
git diff --word-diff=porcelain --word-diff-regex='[^[:space:]]' -- tests/fixtures/oracle/button.json | grep -E '^[+-]'
```

Its output was as follows.

```text
--- a/tests/fixtures/oracle/button.json
+++ b/tests/fixtures/oracle/button.json
+"browser": "141.0.7390.37",
```

The `npm test` whole-chain reading is **not run**. No whole-chain result is inferred from the filtered matrix or conformance runs.

The final `git status --porcelain` command exited 0 and reported only owned files.

```text
 M src/browser/Button.ts
 M tests/fixtures/oracle/button.json
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/styles/tokens.test.ts
```

The final `git diff --stat` command exited 0 and reported the following changes.

```text
 src/browser/Button.ts             |   3 +
 tests/fixtures/oracle/button.json | 397 ++++++++++++++++++++++++++++++--------
 tests/setup.ts                    |  27 +++
 tests/setupBrowser.test.ts        |  44 ++++-
 tests/setupBrowser.ts             |  49 ++++-
 tests/setupConformance.test.ts    |   8 +
 tests/setupConformance.ts         |  23 ++-
 tests/src/browser/Button.test.ts  |  37 +++-
 tests/src/browser/helpers.test.ts |   9 +-
 tests/src/styles/tokens.test.ts   |   6 +-
 10 files changed, 510 insertions(+), 93 deletions(-)
```

The stopping deviation is a conflict between the required format gate and the permitted fixture writer.

- **Expected:** The refresh produces the browser provenance, and the required format gate reaches exit 0 within the owned write scope.
- **Found:** The refresh writer in the off-limits `tests/conformance.test.ts` file serializes with `JSON.stringify(recording, undefined, '\t')`. This expands arrays that the formatter keeps inline. `npm run format:check` exits 1 and names only `tests/fixtures/oracle/button.json`.
- **Exact restriction:** The original brief's standing conditions say the refresh command “is the only way the fixture changes”; its owned scope permits that fixture “through the refresh command only, never by hand.” The general scoped-formatting allowance does not explicitly exempt this fixture-specific restriction.
- **Done:** The refresh and subsequent comparison passed. The generated fixture is intact. The prescribed Button repair and its matrix have red-then-green evidence.
- **Not done:** No formatter or manual edit changed the fixture. Its writer remains untouched. The README receipt, guide paragraph, registry rename, and complete final gates remain unfinished.

Other deviations and limits are recorded as follows.

- Some initial long-file reads exceeded the requested bounded-read form and produced truncated output. The orchestration contract was reread in bounded stretches, and further reads used symbols and bounded regions. This was a reading-process deviation.
- No `prove` tool is registered in this session, and the brief confines tools to the CLI's read, patch, and shell tools. Direct Vitest supplied the restoration control: the unrepaired engine failed the prescribed presence assertion, and the repaired engine passed. No probe-server receipt is claimed.
- The optional `.oxfmtignore` lookup exited 1 because that file does not exist. The brief does not require it, so this was not a missing-required-file stop.
- No runtime export was added to `tests/setup.ts` or `tests/setupConformance.ts`; their existing export-inventory assertions were not edited. Their runtime results remain unverified because the setup project did not run.
- The temporary matrix logging is removed. No probe file was created. No commit, push, installation, dependency change, off-limits write, or agent delegation occurred.
- The driver journal path and session identifier were not supplied to this executor. Their provenance is unverified in this report.

After writing this report, `npm run test:policy` exited 0 with 109 passed and 1 skipped. This policy reading does not close the unfinished gate chain.