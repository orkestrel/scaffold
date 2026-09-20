<!-- codex exec, gpt-6-astra, workspace-write -C veneer; journal u4b.jsonl (ephemeral, swept at acceptance); thread 01a0c0a6-16df-7661-be1a-f8616ff54dff; exit 0; the unit wrote this file at veneer/tmp/units/u4b-report.md and returned it as its last message; retained 2026-09-20 -->

U4b is implemented in the Veneer checkout at HEAD `ef1a563`. The required gates pass on Windows on 2026-09-20, including ordinary oracle comparisons on managed Chromium and Edge. Nothing was committed or installed, and no agent was spawned.

The file changes are as follows.

| File | Change |
| --- | --- |
| `tests/setupConformance.ts` | Defines the readonly compatibility, inventory, fixture, step, and reading shapes. Adds the guide reader, built-cascade reader, inventory reader, live Button recorder, control-state reader, obligation cross-check, and measured timeout. |
| `tests/setupConformance.test.ts` | Extends export membership and proves written compatibility tables, missing columns, invalid statuses, built CSS reads, missing artifacts, inventory identity and malformed input, live control readings, and contradicted or absent proof steps. |
| `tests/conformance.test.ts` | Adds shipped-selector and custom-property presence, equality between shipped keys and the explicit component list, refresh-only fixture writing, ordinary live comparison with a named differing step, and the compatibility-row cross-check. Retains reference identity and runtime-boundary proofs. |
| `tests/fixtures/oracle/inventory.json` | Copies the research inventory as data. Formatting changes its whitespace; a parsed comparison against the source returned `INVENTORY_CONTENT_EQUAL=true`. The setup proof pins its version and CSS/RTL digests. |
| `tests/fixtures/oracle/button.json` | Holds the live Bootstrap 5.3.8 Button recording. Managed Chromium and Edge match this same file. |
| `guides/veneer.md` | Adds Compatibility between Tokens and Showcase, with the prescribed columns, Button and assigned engine obligations, accepted statuses, proof-step names, exclusions, and status responsibilities. Adds conformance and setup-proof links under Tests. |
| `u4b-report.md` | Records the implementation and run evidence. |

`guides/README.md` remains unchanged. Its concept rows identify API parity targets rather than guide sections; its existing Veneer row already identifies the governing guide.

The fixture has `version`, `component`, `steps`, and `excluded` fields. Each step has a `name`, `before`, and `after` reading. Each reading carries ordered event names, classes, attributes, ordered mutation attribute names, click cancellation readings, the focused control's accessible name, the accessible snapshot, any refusal, and public Bootstrap identity values. Undefined fields are omitted from JSON. The `excluded` list is empty.

The recorder uses an owned scratch directory from `createScratch`. Its file-URL page loads copies of the installed official CSS and bundle through relative asset references. Its markup contains Toggle, the initially pressed Button variant, and the disabled anchor variant. Official JavaScript executes in that browser page; Node reads its bytes without importing or evaluating the bundle.

The following actions run under the `button.` prefix and repeat under the `button.reduced.` prefix with reduced-motion emulation.

| Step suffix | Recorded outcome |
| --- | --- |
| `initial` | Toggle has no active class or pressed attribute; no control is focused. |
| `click.toggle` | Active becomes present, aria-pressed becomes true, focus is Toggle, and the click default is prevented. |
| `click.release` | Active is removed and aria-pressed becomes false. |
| `keyboard.space` | Space activates Toggle and sets its pressed state. |
| `keyboard.enter` | Enter releases Toggle and clears its pressed state. |
| `hover` | Toggle remains released. |
| `pointer.hold` | Pointer down leaves Toggle released. |
| `pointer.release` | Pointer up activates Toggle. |
| `pressed.initial` | The Pressed variant starts active with aria-pressed true. |
| `pressed.click` | Clicking Pressed removes active and sets aria-pressed false; focus becomes Pressed. |
| `disabled.click` | Playwright reports `element is not enabled`; classes and attributes remain unchanged, and focus remains Pressed. |

Button records no custom lifecycle events. Successful activations record class and aria-pressed mutations and a prevented click. Consecutive ordinary runs match the fixture, including pointer hold/release and reduced motion. Browser launch succeeded inside the Node worker; no EPERM refusal occurred. No nondeterministic step required exclusion.

The contended recorder case took **2550 ms** while `npm.cmd run test:src` ran beside `npm.cmd run test:conformance -- --reporter=verbose`. Their logs are `tmp/u4b/contended-src.log` and `tmp/u4b/contended-conformance.log`; each command exited 0. The recorder case reports:

```text
records official Button behavior and matches each named fixture step 2550ms
```

`ORACLE_TIMEOUT` is **10,100 ms**, calculated as `2 × 2550 + 5000`, and is passed as the recorder cases' third argument to `it`. The root configuration remains unchanged.

The controls produced these readings, with no control retained in a test name or product file.

| Control | Red reading | Restore proof |
| --- | --- | --- |
| PLANT-ACCEPTED | Exit 1: `Shipped component alert is missing selector .alert: expected false to be true`. | Restored the guide from its saved bytes; `RESTORE_BYTES_EQUAL=true`. |
| PLANT-MISSING | Exit 1: `Missing oracle fixture: tests/fixtures/oracle/button.json; record with ORACLE_REFRESH=1`. | Moved the fixture back; `RESTORED=True`. Later ordinary conformance passed. |
| PLANT-DIFFER | Exit 1: `Oracle differs at step button.click.toggle`. The planted aria-pressed false disagreed with the live true reading. | Restored from `tmp/u4b/button.original`; a Buffer byte comparison returned `RESTORE_BYTES_EQUAL=true`. |
| PLANT-ROW | Exit 1: `Compatibility row btn \| event \| Dispatches invented.bs.button \| button.click.toggle: recording contradicts obligation`. | Restored the guide from its saved bytes; `RESTORE_BYTES_EQUAL=true`. |

Each control log reports `Tests 1 failed | 7 passed (8)`. The logs are `tmp/u4b/plant-accepted.log`, `plant-missing.log`, `plant-differ.log`, and `plant-row.log`. The final ordinary conformance runs pass after restoration.

The required gates exited 0. Their final lines follow; full output is retained under `tmp/u4b/gate-*.log`.

`npm.cmd run format:check`:

```text
All matched files use the correct format.
Finished in 917ms on 82 files using 16 threads.
```

`npm.cmd run lint:check` ended without diagnostics after:

```text
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

`npm.cmd run check`:

```text
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

`npm.cmd run test:setup`:

```text
Test Files  3 passed (3)
     Tests  88 passed (88)
  Start at  17:23:21
  Duration  3.62s (transform 196ms, setup 81ms, import 1.38s, tests 2.98s, environment 0ms)
```

`npm.cmd run test:conformance`:

```text
Test Files  1 passed (1)
     Tests  8 passed (8)
  Start at  17:23:26
  Duration  3.76s (transform 108ms, setup 32ms, import 680ms, tests 2.90s, environment 0ms)
```

`npm.cmd run test:guides`:

```text
Test Files  1 passed (1)
     Tests  18 passed (18)
  Start at  17:21:48
  Duration  493ms (transform 51ms, setup 31ms, import 309ms, tests 6ms, environment 0ms)
```

`npm.cmd run test:policy`:

```text
Test Files  1 passed (1)
     Tests  109 passed | 1 skipped (110)
  Start at  17:21:50
  Duration  1.96s (transform 93ms, setup 31ms, import 252ms, tests 1.52s, environment 0ms)
```

The existing policy skip is the substitution-table registration case guarded by `isPolicyFile(process.cwd(), POLICY_TERM_FILE)` at `tests/policy.test.ts:716`. This unit adds no skip.

With `PLAYWRIGHT_CHANNEL=msedge`, `npm.cmd run test:conformance`:

```text
Test Files  1 passed (1)
     Tests  8 passed (8)
  Start at  17:24:12
  Duration  4.28s (transform 103ms, setup 31ms, import 669ms, tests 3.42s, environment 0ms)
```

The implementation choices and deviations are recorded here.

- **Guide AST access:** Expected the guide package to provide section selection over the document. Found that `selectSectionBlocks` accepts a `MarkdownDocument`, while `GuideInterface` exposes projections without its document (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:1288` and `:2296`). Done: use the already-installed `@orkestrel/markdown` parser to supply the AST, then the guide package's section, column, and cell helpers. No local Markdown regex parser or dependency installation was introduced.
- **Inventory digests:** Expected to pin the copied inventory's declared digests. Found that the research artifact declares CSS and RTL CSS digests, without a bundle digest. Done: assert those exact fields and retain the independent bundle digest assertion in Bootstrap reference identity. The copied inventory's parsed content equals the research source.
- **Undriven engine obligations:** Expected dash proofs for obligations the Button recording cannot drive. Found shared transition, dismissal, configuration, selector, sanitizer, and jQuery obligations in the accepted ledger. Done: retain them as accepted rows with dash proofs and state their boundary in the guide. They are not represented as live Button proofs or shipped implementations.
- **Scoped lint:** The initial scoped check reported shadowing, an unqualified `toThrow`, and a readonly-array syntax diagnostic. Done: corrected each inside owned files; the scoped rerun and final lint gate exited 0.
- **Execution boundary:** No stop condition occurred. The brief marks the `prove` tool blocked, so it was not invoked and no receipt is claimed. `npm test`, distribution verification, and scaffold audit were not run, as assigned to the Orchestrator's verifier. No off-limits file was edited.

The actual tracked diff is saved at `tmp/u4b/final.diff`, and the status capture is `tmp/u4b/final-status.txt`. `git diff --check` exits 0. The final expanded porcelain status is:

```text
 M guides/veneer.md
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
?? tests/fixtures/oracle/button.json
?? tests/fixtures/oracle/inventory.json
```

The report and instruments are under ignored `tmp/`, so porcelain does not list them. Git emits the brief's known global-ignore permission warning and exits 0. HEAD remains `ef1a563`.
