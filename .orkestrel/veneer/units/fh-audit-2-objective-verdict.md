1. **CONFIRMED — P1.** Disabling outline collection at `tests/setupBrowser.ts:1061` is distinguished from the passing case. Positive-number assertions reject the resulting undefined readings at `tests/app/browser/integration.test.ts:1331`, `:1752`, `:2781`, and `:3136`. The link case checks scenario membership and rejects absent or nonpositive readings at `:3061`. I read `fh-instruments/fh2-p1-red.log.txt:78`: every targeted case fails at its outline assertion, including every link focus row. The restored filter passes in `fh2-p1-green.log.txt:76`. The attack no longer escapes through the container or link cases.

2. **CONFIRMED — F1.** The factory at `tests/setupBrowser.ts:778` explicitly enables each portfolio and assigns its distinct directory. The journey uses it at `tests/app/browser/integration.test.ts:173`; the helper proofs use it at `tests/setupBrowser.test.ts:296`, `:321`, and `:331`. Inspection found no remaining local outline factory.

   Swapping or misplacing either directory breaks the corresponding path assertion at `tests/setupBrowser.test.ts:301`. Disabling either portfolio returns undefined through the installed implementation at `node_modules/@orkestrel/test/dist/src/browser/index.js:3416`, which also fails that assertion. These assertions distinguish the specified mutations; the supplied evidence contains no executed factory-mutation run. I read the passing helper-suite log, `fh-instruments/fh2-setup-browser-2.log.txt:81`.

3. **BROKEN — N1 and N2 do not cover every owned call site.** The helper proofs still bind focus results as `whole` and `cropped` at `tests/setupBrowser.test.ts:249` and `:258`, and as `reading` and `unpainted` at `:322` and `:332`. The same proofs lift an element named `host` at `:249` and `:258`. The detached-copy proof uses `copy`, rather than the claimed `copied`, at `:224`. The focus example also retains `reading` at `tests/setupBrowser.ts:1012`.

   Rename the helper-proof bindings and example consistently, using separate scopes where needed to avoid shadowing. The journey’s result bindings and lift arguments satisfy the rename, and the worn-element option is consistently renamed at `tests/setupBrowser.ts:738`, `:1021`, and `tests/app/browser/integration.test.ts:1089`. This finding concerns incomplete naming, not changed focus behavior.

4. **CONFIRMED — C1.** The press case calls the shared image reader at `tests/app/browser/integration.test.ts:2220` and indexes the decoded image’s centre. No private decode remains there. I compared the recorded form-press rows in `tmp/units/fh-final/dark-1280/dark-1280.txt:2103` and `tmp/units/fh-final/light-390/light-390.txt:2090` with the corresponding rows in `tmp/capture/`; they match exactly. An in-memory changed-channel control makes that comparison fail.

   The earlier box-relative region fails in `fh-instruments/fh2-journey-dark-1280.log.txt:78` and `fh2-journey-light-390.log.txt:78`. The corrected press filters pass in `fh2-press-dark-1280.log.txt:77` and `fh2-press-light-390.log.txt:77`. Thus the original clipping failure is distinguished from the repaired path.

   Checked element reads replace the named inline guards at `tests/app/browser/integration.test.ts:937`, `:2643`, and `:2718`. The page-link name assertion at `:938` rejects selection of the wrong link.

5. **CONFIRMED — Gates and patch.** The stale-evidence attack found that the live diff’s SHA-256 matches the retained `fh-2.diff` exactly. The final edited file predates the final gate sequence. I read the final logs: formatter at `fh-instruments/fh2-format-2.log.txt:3`, lint at `fh2-lint-2.log.txt:5`, check at `fh2-check-2.log.txt:29`, setup at `fh2-test-setup-2.log.txt:32`, browser setup at `fh2-setup-browser-2.log.txt:81`, guides at `fh2-test-guides-2.log.txt:11`, and the dark and light journey logs at `fh2-journey-dark-1280-2.log.txt:77` and `fh2-journey-light-390-2.log.txt:77`. Each ends with exit 0. The runner at `fh2-gates-2.sh:14` enables capture for the journeys.

   I independently ran the nonmutating patch check against the current tree; it exited 0. These findings establish the retained gate runs, not browser execution by this lane.

6. **BROKEN — W1 retains prose violations.** The changed comment at `tests/app/browser/integration.test.ts:936` names the page-strip item by position: “its second item is the first page.” Name the Page 1 link and its relationship to the previous-page arrow instead. The changed documentation at `tests/setupBrowser.ts:736` leaves the worn-parameter token without its noun. Add “parameter” after that token.

   The repaired outline-declaration wording, padding qualification, pointer-recording description, and fault-row description hold. The changed throws tags use the required “Thrown when” form.

   The report states these counts:

   - Prose tallies: an entry per focus key (`b-frame-helpers-report-2.md:12`, `:68`); an outline factory (`:14`); an options constant (`:18`); a directory (`:20`); a name and binding per call site (`:24`); and a loop for the nav specimens (`:35`). It also tallies the journey and helper consumers (`:17`), nav specimens (`:35`), variants (`:41`, `:91`), carousel comments (`:47`), and P1 runs (`:72`) with “both.”
   - P1 measurements: `5 failed | 57 skipped (62)` and `5 passed | 57 skipped (62)`; the failing link assertion reports 3 entries (`:65`, `:68`, `:71`). The retained logs support these measurements.
   - Final gate measurements: setup 313 passed, browser setup 81 passed, guides 20 passed, and each named journey 62 passed (`:85`).
   - Earlier journey measurements: `1 failed | 61 passed (62)` at each variant (`:91`), supported by the first-pass logs.
   - Diff measurement: `6 files changed, 1736 insertions(+), 2218 deletions(-)` (`:101`), matching the live diff.

**Outside the claims:** none substantiated.

**Attacked and held:** An absent outline remains correct for shadow-only focus cases; P1 requires presence specifically where an outline paints. The press case’s scripted focus establishes reference pixels rather than a focus-frame scenario. Input-specific guards and detached-copy guards remain appropriate.

VERDICT: FAIL 3, 6; outside the claims: none