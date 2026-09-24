<!-- Checker: checker on Sonnet, workflow wf_9bef6fe3-fa2, brief ff-audit-checker-brief.md. -->

## Verdict — checker, claims 1, 3, 8 (FOCUS-FRAME round 1)

### Claim 1 — Scope

- **CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/ff-status.txt:1-3` lists exactly `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, `tests/setup.ts` (` M` each) — no SCSS partial, no `tests/setupBrowser.ts`, no `app/**` file.
- **CONFIRMED.** `ff-shared.patch:1-2` diff header touches only `guides/veneer.md`; the body (`ff-shared.patch:1-95`) edits only prose sentences in § Form control/select/check/range and § Input group/Tests — no table row or ledger structure is touched.

### Claim 3 — The helpers

- **CONFIRMED.** `computeRingReach` (`ff.diff:1756-1772`, mapped to `tests/setup.ts`) reads `box-shadow` layers (splitting on top-level commas), zeroes an `inset` layer, and reads `outline-style`/`outline-width`/`outline-offset`, taking the max. The proof at `ff.diff:1618-1633` exercises `rgba`, `oklab`, `color(srgb …)`, and multi-layer `rgb` syntaxes; `ff.diff:1636-1656` covers outline `auto`/`solid`/`none`; `ff.diff:1658-1675` covers a combined shadow+outline case.
- **CONFIRMED.** `computeCroppedEdges` (`ff.diff:1791-1802`) pushes `top`, `right`, `bottom`, `left` in that order; the proof at `ff.diff:1684-1702` asserts exactly that order and names each crossed edge.
- **UNRESOLVED.** "Each helper proof reddens on its named mutation and on nothing else" needs a run to confirm. The only evidence is the writer's own instrument, `ff-instruments/ff-mutations.log.txt:1-16`, which quotes commands and exit codes it produced itself — no independent lane re-ran `npm run test:setup` against the three named mutations (`reach-outline`, `reach-inset`, `cropped-left`). Structural reading of the implementation is consistent with the log's claimed failure sets, but per the falsification law that consistency reads a proof, it does not run one. Command to supply: `npm run test:setup` with each of the three mutations at `ff-instruments/ff-mutations.log.txt:2-24` applied in turn.
- **CONFIRMED.** Both helpers are exported with TSDoc (`ff.diff:1731-1756`, `ff.diff:1775-1791`) and both names are added to the export-list proof (`ff.diff:1609-1610`, `tests/setup.test.ts`).

### Claim 8 — Law and report

- **CONFIRMED.** No added line in `ff.diff` matches `any`, a type assertion (`as X`), a non-null assertion (`!`), a suppression comment, a nested function declaration, or a mock/spy/fake-clock construct; the only `(event) => {…}` arrow is an anonymous callback passed directly to `addEventListener` (`ff.diff:338-346`), the permitted exception.
- **CONFIRMED.** No new hardcoded case population was added; new locals (`switched`, `reaches`, `cropped` maps) are per-run accumulators, and driven cases still iterate `DRIVEN_KEYS`/`CASCADE_KEYS`/`FORM_FLOATING_SPECIMENS`, pre-existing in `tests/setup.ts`.
- **PARTIALLY CONFIRMED / PARTIALLY UNRESOLVED** on "the report quotes each gate's command and result line from its log":
  - CONFIRMED for `npm run test:setup` (`ff-instruments/ff-setup-green.log.txt:32` → `Tests 304 passed (304)`, matches report line 123), the two journey runs (`ff-instruments/ff-capture-final4-dark-1280.log.txt:79` and `…-light-390.log.txt:77`, both `Tests 47 passed (47)`, matching report lines 124-125), and `npm run test:guides` (`ff-instruments/ff-guides.log.txt:11` → `19 passed (19)`, matching report line 126).
  - UNRESOLVED for `npx oxfmt --check`, `npm run lint:check`, and `npm run check` (report lines 120-122): no retained log for any of the three exists under `ff-instruments/` (only `ff-gate-setup.log.txt` is present and contains no matching output). Command to supply: re-run the three and retain the logs.
- **Counts the report states** (quoted tool-output values, exempt as measurements reported with their run): `Tests 304 passed (304)`; `Tests 47 passed (47)` (×2, dark-1280 and light-390); `Tests 19 passed (19)`; `Tests 5 failed | 299 passed (304)`; pixel-diff counts `768`, `1160`, `0` (×3 rows); reach value `2`; load average `12 to 13`. No banned temporal word (`currently`, `now`, `new`, `latest`, `soon`, `once`, `since`) appears in `b-focus-frame-report.md` (swept, no matches).
- **Code tokens the report leaves without a following noun** (writing.md § Code tokens, `b-focus-frame-report.md`): `` `switched` `` (line 8, ends the sentence); `` `e4a6d7c` `` and `` `git diff --stat` `` (line 18); `` `:hover` `` and `` `releasePointer` `` (lines 43-44); `` `cropped` `` before "is" (line 54); `` `box-shadow` `` and `` `none` `` (line 81); `` `const shot: HTMLElement = lifted` ``, `` `specimen` ``, `` `cropped` `` (line 85); `` `PATH` ``, `` `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` ``, `` `ff-capture.sh` ``, `` `npm run build:src` `` (line 128); `` `traverseAccessible` `` (line 155); `` `list-group-actions-focus` `` (line 157); `` `FrameRegion` ``, `` `tests/setup.ts` `` (line 163). These are findings against `.claude/rules/writing.md` § Code tokens, outside the numbered claims.

### Referrals

None — every open item above is a named UNRESOLVED sub-clause with the exact command needed, not a judgment call.

VERDICT: FAIL 3, 8; outside the claims: writing.md § Code tokens violations in `b-focus-frame-report.md` (listed above)
