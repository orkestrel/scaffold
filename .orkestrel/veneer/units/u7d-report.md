<!-- Retained from u7d-last.md (the exec's --output-last-message file). Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7d.jsonl, thread 01a0c0f6-9147-7e72-96de-23d64790e7ca, exit 0, 2026-09-20 18:49. Links in the body point at the unit's tmp/u7d/ instruments in the Veneer checkout. -->

U7d is complete against HEAD `1b80ccb`. The required gates pass. The planted controls fail for their intended reasons and are restored. No commit, install, delegation, scaffold repair, tree-wide formatting, lint fix, or build ran.

The per-file changes and exact diffs are:

| File | Diff |
| --- | --- |
| `tests/setupConformance.ts` | Adds readonly `DeferralRow`, `readDeferrals`, `collectShippedComponents`, and `scanCompatibilityPresence`. Selects exact oracle obligations before fallbacks; adds explicit `OracleBinding.events` and `matchesOracleEvents`; returns the invalid-fixture finding on serialization failure; resolves Bootstrap CSS from its manifest. See [exact diff](C:/Users/mikes/WebstormProjects/veneer/tmp/u7d/setupConformance.ts.patch). |
| `tests/setupConformance.test.ts` | Retains existing cases and adds written Markdown/CSS readings, shipped-row selection, engine/CSS proof skipping, binding precedence and event-member readings, unserializable fixtures, and a changed-working-directory cascade reading. Fixture statuses are explicit so U7a can ship the guide rows. See [exact diff](C:/Users/mikes/WebstormProjects/veneer/tmp/u7d/setupConformance.test.ts.patch). |
| `tests/conformance.test.ts` | Uses the exported row-keyed readers, retains explicit `listed = []`, and compares the complete sorted shipped array with that list, rejecting missing or extra keys. See [exact diff](C:/Users/mikes/WebstormProjects/veneer/tmp/u7d/conformance.test.ts.patch). |
| `guides/veneer.md` | Adds Button's selector row, revises its existing variable row, moves shared obligations to `engine`, documents CSS shipping, and adds the empty deferral table under Styles. See [exact diff](C:/Users/mikes/WebstormProjects/veneer/tmp/u7d/veneer.md.patch). |
| `tests/setupStyles.ts` | Unchanged. Its browser-visible `BOOTSTRAP_CASCADE_PATH` remains intact. |
| `u7d-report.md` | Records this report; ignored by git under `tmp/`. |

The complete actual diff is [final.diff.patch](C:/Users/mikes/WebstormProjects/veneer/tmp/u7d/final.diff.patch). Instruments and logs are under `tmp/u7d/`.

The landed row grammar is:

- Compatibility keeps `Component | Kind | Obligation | Proof | Status`. `CompatibilityRow.category` remains a string. Status accepts `accepted` or `shipped`; a Proof dash becomes `undefined` and the obligation scanner skips it.
- Button's `selector` row says “Every official `.btn` selector the ledger assigns to Button is present in the built cascade; the deferred selectors are listed under § Styles”. Its `variable` row says “Every official `--bs-btn-*` custom property less the deferred ones is declared”. Each carries Proof `—` and Status `accepted`.
- `engine` names shared official engine obligations and never enters the shipped CSS component set.
- A component enters the shipped set when its selector and variable rows are shipped. Each shipped CSS row independently obliges its vocabulary, so a selector-only shipping claim also runs the selector check.
- Styles → Deferred selectors uses `Name | Owner | Reason`. Every cell is required; Name accepts plain text or a Markdown code span. Owner names the unit that removes the row when it ships the name. The landed table is empty.
- Deferred names must occur literally in an official selector/property set belonging to a component with a CSS row. Inventory membership associates names with components; a shared name applies to every matching key. The scanner refuses an unknown name and every deferred name present in CSS, even while rows are accepted. For each shipped row it requires the official set minus deferrals. Selector presence uses `normalizeComplexSelector`; property presence requires a declaration, not a `var()` reference.
- Oracle event expectations come from `OracleBinding.events`, never obligation prose. Exact obligations win before undefined-obligation fallbacks. An empty event requirement cannot prove an event claim.

The controls ran through `npm.cmd run test:conformance`; each exited 1 with `Tests 1 failed | 7 passed (8)`:

| Control | Red reading | Restore proof |
| --- | --- | --- |
| PLANT-SHIPPED | Flipped only Button's selector row to shipped. “Shipped component btn is missing selector .btn-check”. | Guide and proof byte-equal to saved buffers. |
| PLANT-DEFERRED-UNKNOWN | Added `.u7d-unknown`. “Deferred name .u7d-unknown is outside the official inventory for btn”. | Guide and proof byte-equal to saved buffers. |
| PLANT-DEFERRED-PRESENT | Added `.btn` and handed the scanner the written `tmp/u7d/present.css` fixture. “Deferred name .btn is present in the built cascade”. | Guide and proof byte-equal to saved buffers. |
| PLANT-LISTED | Changed the explicit list to `['btn']` while the guide shipped no key. “Guide shipped components and conformance component list must agree: expected [] to deeply equal [ 'btn' ]”. | Guide and proof byte-equal to saved buffers. |

Every control restore compared exact bytes. At those restores the guide SHA-256 was `f4e0f0ac1033074b0f2c7f86024753accb7a2abd3992ccdd8da925e7fb70b3c4`; the conformance proof SHA-256 was `679a1520153d29762540f81720b241f98821e3cda0389f9d609e731249bb7926`. These hashes precede scoped formatting. The executable instruments are `tmp/u7d/control.mjs` and `tmp/u7d/controls.cmd`; each control's complete red output is in its same-named `.log` file. No test is named for a control.

Development verification recorded these readings:

- `test:setup` and `test:conformance` passed after the guide rows, presence check, deferral reader, restored controls, binding fixes, and cascade-path fix. Logs use the `item1`, `item2`, `item3`, `item5`, `item6`, and `item7` prefixes under `tmp/u7d/`.
- The case checkpoint initially reported `1 failed | 99 passed (100)`: code-span deferral names retained backticks. The reader changed to the Markdown parser's `flattenText` projection; the same setup command passed `100 passed (100)`, followed by conformance `8 passed (8)`. See `item4-setup.log` and `item4-fixed-*.log`.
- `npm.cmd run test:setup -- -t 'selects an exact event obligation|returns an invalid-fixture'` reported `2 failed | 100 skipped (102)` before implementation: the exact click binding was absent and a cyclic fixture threw a TypeError. The same command passed `2 passed | 100 skipped (102)` after implementation. See `bindings-red.log` and `bindings-green.log`.
- `npm.cmd run test:setup -- -t 'reads the manifest-rooted'` failed with ENOENT under the scratch working directory, then passed after the path fix. See `path-red.log` and `path-green.log`. Filtered-run skips are runner selection; the final setup gate runs every case.

The final gates ran on Windows on 2026-09-20 through `tmp/u7d/gates.cmd`. Edge used the command-shell equivalent, `set PLAYWRIGHT_CHANNEL=msedge`, before invoking npm. The final output is:

`npm.cmd run format:check` — exit 0. Final lines:

```text
Checking formatting...

All matched files use the correct format.
Finished in 748ms on 82 files using 16 threads.
```

`npm.cmd run lint:check` — exit 0. Final lines:

```text
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

`npm.cmd run check` — exit 0. Final lines:

```text
npm notice run @orkestrel/veneer@0.0.1 check:src:styles
npm notice run tsc --noEmit -p configs/src/tsconfig.styles.json
npm notice run @orkestrel/veneer@0.0.1 check:app
npm notice run npm run check:app:browser
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

`npm.cmd run test:setup` — exit 0. Final lines:

```text
 Test Files  3 passed (3)
      Tests  103 passed (103)
   Start at  18:48:34
   Duration  6.13s (transform 189ms, setup 78ms, import 1.39s, tests 5.48s, environment 0ms)
```

`npm.cmd run test:conformance` — exit 0. Final lines:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  18:48:41
   Duration  3.76s (transform 79ms, setup 31ms, import 646ms, tests 2.92s, environment 0ms)
```

`npm.cmd run test:guides` — exit 0. Final lines:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  18:48:46
   Duration  495ms (transform 50ms, setup 31ms, import 303ms, tests 6ms, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:conformance` — exit 0. Final lines:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  18:48:47
   Duration  4.17s (transform 83ms, setup 32ms, import 650ms, tests 3.35s, environment 0ms)
```

`git diff --check` exited 0 with no output. The actual `git status --porcelain` output is:

```text
 M guides/veneer.md
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
```

Git also printed the brief's known missing-global-ignore permission warning and exited 0. The report and instruments are under ignored `tmp/`; no off-limits tracked file changed.

Resolved deviations use the expected/found/evidence/done shape:

| Expected | Found and exact evidence | Done |
| --- | --- | --- |
| Item 7 locates `readBootstrapCascade` in `tests/setupStyles.ts`. | The live declaration is in owned `tests/setupConformance.ts`; `tests/setupStyles.ts` owns the browser-visible path constant. | Fixed the actual Node reader in its existing home and preserved the browser constant. The changed-working-directory proof ran red then green. |
| Button gains a variable row; category may be a union. | The baseline already carries a Button variable row, and `CompatibilityRow.category` is `string`. | Reworded the existing row rather than duplicating it; retained the type shape. |
| The shipped-key definition requires selector and variable shipping; PLANT-SHIPPED flips the selector alone. | A component-only presence scan would leave that required control unexercised. | Kept the component-list rule and made each shipped CSS row enforce its own set. The selector-only control failed on `.btn-check`. |
| The Name/Owner/Reason table identifies each component's deferrals. | The prescribed grammar carries an owning unit but no Component column. | Used exact inventory membership among the guide's CSS component keys; documented how shared names apply. |

The brief blocks `prove`, so no probe receipt is claimed. Executed fixture cases and planted controls supply the evidence reported here. Acceptance criteria's “gates in item 6” was read as the explicitly named Gates item 8. No unresolved stop condition remains.