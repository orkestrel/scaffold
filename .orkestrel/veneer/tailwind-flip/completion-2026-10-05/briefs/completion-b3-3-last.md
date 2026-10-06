B3 stopped at lint. The placement repair, `curated` split, mapped scoped-witness baseline, and gate widening are present, but acceptance is incomplete.

The [report](/home/user/veneer/tmp/units/completion-b3/report.md), [candidate.patch](/home/user/veneer/tmp/units/completion-b3/candidate.patch), and [status.txt](/home/user/veneer/tmp/units/completion-b3/status.txt) are written.

Expected: lint passes before the remaining acceptance gates. Found:

- `tests/app/browser/integration.test.ts:1259`: `vitest(no-conditional-expect)`.
- `tests/setupStyles.test.ts:122`: `vitest(valid-expect)` rejects the assertion’s second argument.

The [brief](/home/user/scaffold/tmp/codex/completion-b3-brief.md) requires stopping on a failure outside `host-bound.md`. The report includes an exact, unapplied corrective patch. Typecheck, full setup-browser tests, Tailwind tests, and `completion-b3-journey-after` were not run.

The placement repair requires an inline declaration plus the engine’s `data-popper-placement` marker and an open panel’s `show` class, or its tip arrow. Both 390 px popovers now attribute `translate: 50px → 37px` to `dependent`. Removing the marker check makes the outside `div.cargo-probe` control fail; restoring it passes.

The recipe-only planted copy departs from opacity `1` to `0.37` on a non-witness element. Direct, uncached, and indexed readers return `curated`. Replacing that result with `resolved` fails the control.

The complete probe matrix reads zero `preflight`, zero `unattributed`, and no lost boxes after the repair and split. Counts below are before → after; P means preflight, U unattributed, R resolved, and C curated.

| Theme | Width | State | P | U | R | C | Copy hits |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| light | 1280 | closed | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | tooltip | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | popover | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | dropdown | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | modal | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | offcanvas | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| light | 1280 | toast | 0→0 | 0→0 | 99→99 | —→0 | 0→0 |
| dark | 1280 | closed | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | tooltip | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | popover | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | dropdown | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | modal | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | offcanvas | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| dark | 1280 | toast | 0→0 | 0→0 | 102→102 | —→0 | 0→0 |
| light | 390 | closed | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| light | 390 | tooltip | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| light | 390 | popover | 0→0 | 1→0 | 28→28 | —→0 | 0→0 |
| light | 390 | dropdown | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| light | 390 | modal | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| light | 390 | offcanvas | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| light | 390 | toast | 0→0 | 0→0 | 28→28 | —→0 | 0→0 |
| dark | 390 | closed | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | tooltip | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | popover | 0→0 | 1→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | dropdown | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | modal | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | offcanvas | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |
| dark | 390 | toast | 0→0 | 0→0 | 31→31 | —→0 | 0→0 |

The corrected mapped tuned-sheet copy check records **zero hits and zero eligible forcing trials**, versus probe-4’s 1,960 pre-map border-color hits. The recipe comparison also records zero hits. Zero eligible trials limits the conclusion: no departing tuple reached copy forcing after utility attribution. The planted control separately proves the cause split.

An earlier tuned-only diagnostic recorded 980 hits using the wrong withheld-utility lookup. That result is superseded by the corrected audit using `LIFTED`, as probe-4 does. Its diagnostic fields remain in `out/after.json`; the preservation matrix is unaffected.

No curation rows were derived or folded. No `JOURNEY_PLACEMENTS.preservation` change is needed. The widened test source covers both themes and the six open states within the existing width halves, rebuilding its index after DOM changes. Its acceptance journey remains unrun.

Every queued command used the required lock and runner. The saved report records the full command arguments and links for both launches. Results are:

| Queue folder suffix¹ | Command or purpose | Exit | Seconds |
| --- | --- | ---: | ---: |
| parity-red | Nested-declaration control | 1, intended | 16.550 |
| parity-green | Nested-declaration proof | 0 | 21.227 |
| probe-before | Initial probe; missing bundle dependency | 1 | 26.735 |
| journey-before | Full before journey | 0 | 493.962 |
| probe-before-2 | Before matrix | 0 | 409.249 |
| probe-control | Extracted-reader control | 0 | 0.917 |
| probe-before-copy | Before copy-baseline matrix | 0 | 488.282 |
| format | Prior owned-file formatting | 0 | 0.309 |
| lint | Prior scoped lint | 0 | 0.467 |
| placement-green | Placement control | 0 | 13.337 |
| placement-red | Marker-removal control | 1, intended | 11.394 |
| probe-placement | Repaired 390 px popovers | 0 | 58.008 |
| placement-outside-red | Outside-element marker control | 1, intended | 12.481 |
| curated-red | Removed cause split | 1, intended | 13.867 |
| controls-green | Placement and copy controls | 0 | 8.155 |
| probe-after | Complete after-split matrix | 0 | 634.210 |
| copycheck-after | Recipe copy check | 0 | 304.478 |
| format-3 | Owned-file `oxfmt --write` | 0 | 0.323 |
| tunedcheck-after | Corrected tuned-sheet copy check | 0 | 282.425 |
| format-check-3 | `npm run format:check` | 0 | 4.257 |
| lint-check-3 | `npm run lint:check` | 1 | 1.473 |

¹ Each folder is `/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-SUFFIX`.

The before journey passed with 94 tests and zero skipped in **493.962 seconds**. No after duration exists. Before preservation readings took 8.2146 seconds at 1280 px and 6.7213 seconds at 390 px; complete halves including controls took 11.5364 and 9.661 seconds. No cost conclusion is available.

`git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

No commit or sub-agent was created. The previously ruled index repair and its proof remain.