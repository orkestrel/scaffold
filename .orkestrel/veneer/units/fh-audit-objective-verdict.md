1. **CONFIRMED — Scope and gates.** The scope attack found no extra tracked file: the live diff matches `fh.diff` byte-for-byte, and `fh-status.txt:1` lists only the owned files. The guide hunks lie within § Tests; `fh-shared.patch:4` removes only the specified § Showcase paragraph. I read the format, lint, check, setup, browser-setup, guides, policy, and source-build logs. The capture results are `62 passed (62)` with exit 0 in `fh-instruments/fh-journey-dark-1280-4.log.txt:76`, `fh-journey-light-390-3.log.txt:76`, and `fh-journey-dark-390-1.log.txt:78`. These establish the recorded runs, not independent browser execution by this lane.

2. **BROKEN — Helper placement and naming.** The claim places `readImageRegion` and `measureDifference` in `tests/setup.ts`; they actually live at `tests/setupBrowser.ts:197` and `tests/setupBrowser.ts:158`. They use browser image and canvas APIs, so their present environment is correct. Correct the claim rather than moving them into host-independent setup.

   The universal naming statement also fails: lifted elements use `host`, `specimen`, `copied`, `base`, `expanded`, and `collapsed`; see `tests/app/browser/integration.test.ts:487`, `:1048`, `:2604`, and `:2846`. The report itself admits alternative names at `b-frame-helpers-report.md:69`.

   The extraction otherwise holds. An AST inspection of the journey found the reported lifted cases calling the shared methods, no generic `querySelector` calls, and no remaining private focus crop or pixel-reading implementation. The region interface and fault reader reside at `tests/setup.ts:3416` and `:3480`; their browser-dependent companions have proofs at `tests/setupBrowser.test.ts:280`.

3. **CONFIRMED — Tab drives and carousel behavior.** The attempted scripted-target-focus counterexample does not exist in the focus-frame path. `tests/setupBrowser.ts:1006` focuses the wrapper, then calls the installed traversal implementation, whose loop sends Tab at `node_modules/@orkestrel/test/dist/src/browser/index.js:878`. The reported focus scenarios call that method.

   The dropdown uses the default padded wrapper at `tests/app/browser/integration.test.ts:1742`; its retained dark frame visibly shows the outline. The captioned and fading carousel assertions require zero reach and no outline at `:1927` and `:2011`. Those expectations agree with `src/styles/components/_carousel.scss:115` and Bootstrap’s `scss/_carousel.scss:112`. The original implementation brief’s demand for carousel outlines was wrong.

   The scripted-focus mutation distinguishes the outline-bearing cases through their pixel assertions; `fh-instruments/fh-mutation-4-drive.log.txt:77` records their failures. That filtered run does not establish separate mutation coverage for every shadow-based or carousel drive.

4. **CONFIRMED — Pointer watcher.** The dropped-park attack is distinguished from the passing case. `tests/setupBrowser.ts:988` parks the pointer, and `:991` installs the descendant-entry listener through the main frame’s capture. `tests/setup.ts:3486` turns recorded entries into a fault naming their elements. The validation and floating cases consume those faults at `tests/app/browser/integration.test.ts:901` and the corresponding floating-case assertions.

   I read `fh-instruments/fh-mutation-5-park.log.txt:77`: the accordion fails with the entered button and body named. The unpadded-carousel failure independently records an entry in `fh-journey-light-390-2.log.txt:77`. Wrapper padding is deliberately excluded from specimen entries; that exclusion is correct.

5. **BROKEN — “Near 1” overstates the comparison.** The retained light skip-link reading is `0.1452991452991453`, and the list-group reading is `0.4861878453038674`; see `tmp/units/fh-final/light-390/light-390.txt:2112` and `:2062`. The dark narrow skip link also reads about `0.151` at `tmp/units/fh-final/dark-390/dark-390.txt:2112`. The light skip-link capture shows a wrapped inline link, whose outline does not occupy its whole bounding-box strip.

   The arithmetic correctly divides differing RGBA pixels by the clipped region’s area at `tests/setupBrowser.ts:163`. The implemented assertion requires a positive difference, not proximity to 1 (`tests/setup.ts:3489`). Correct the claim to describe positive paint detection and its limited coverage.

   The retained mutation evidence is valid within its named scope:

   - Crop removal: `fh-mutation-1-crop.log.txt:78`; the exact cropped-edge assertion at `tests/setupBrowser.test.ts:274` distinguishes the mutation.
   - Pixel-check removal in the helper proof: `fh-mutation-2-guard.log.txt:78`; the positive-number assertion at `tests/setupBrowser.test.ts:315` rejects the resulting `undefined`.
   - Pixel-check removal in the journey: `fh-mutation-3-guard.log.txt:78`; explicit presence assertions distinguish it for the list-group, menu, and skip link. The container passes this mutation because its assertion accepts an absent outline reading.
   - Scripted-focus replacement: `fh-mutation-4-drive.log.txt:77`; the list-group, menu, skip-link, and container assertions reject zero outline difference.
   - Pointer-park removal: `fh-mutation-5-park.log.txt:77`; the accordion assertion rejects the named entries.

   The transparent-outline control at `tests/setupBrowser.test.ts:320` distinguishes an unpainted outline from painted pixels. The comparison does not establish complete outline coverage.

6. **CONFIRMED — Restoration, defaults, and clipping repair.** The rejection attack is handled by the awaited action inside `finally` at `tests/setupBrowser.ts:929`. Connected specimens return through their marker; detached copies are removed. The restoration assertions at `tests/setupBrowser.test.ts:223` and `:234` would distinguish deletion of the restoration statements; the detached-copy assertion at `:238` distinguishes leaving the copy attached. The retained browser-setup run passes at `fh-instruments/fh-setup-browser.log.txt:81`.

   Padding defaults to enabled, and the reachable maximum uses the runner window at `tests/setupBrowser.ts:920`. The clip regression uses `x: -3, width: 10` and expects width 7 at `tests/setupBrowser.test.ts:291`. Restoring the old full-width calculation distinguishes that input: `fh-instruments/fh-mutations.log.txt:5` records the red result `[10, 4, 160]` against `[7, 4, 112]`, followed by the green run. The corrected endpoint calculation is at `tests/setupBrowser.ts:210`.

7. **BROKEN — Frame geometry is reported incorrectly.** The report says padding changes grow frames by 16 CSS pixels “in each dimension” (`b-frame-helpers-report.md:103`). The retained default-ring frame changes from `390×37` to `390×53`: its width does not grow. The focusable-container frame changes from `390×58` to `390×95`, gaining additional height through wrapping. See `fh-instruments/fh-compare-light-390.txt:10` and `:14`; direct PNG-header readings reproduce these dimensions, and the captures show the reflow.

   Correct the report to describe fixed wrapper width, reduced content width, padding-height changes, and wrapping. The comparison instrument checks hashes and dimensions; it cannot establish that every resized image differs only geometrically. No dark-390 baseline is supplied for that variant’s universal comparison.

   The narrower-specimen measurements and named unpadded-frame identities hold against direct file comparison. Equal-size changes are confined to the reported animation families. The dark dropdown capture visibly shows its outline.

8. **BROKEN — Prose overclaims behavior and omits token nouns.** `guides/veneer.md:9939` says the journey lifts each driven specimen, but the driven toggle is photographed in place at `tests/app/browser/integration.test.ts:679`. Bound the sentence to lifted specimens and retain the valid in-place toggle behavior.

   Added prose leaves code tokens without nouns: the method links at `tests/setupBrowser.ts:797`, the `Error` token at `:951`, and the `outline: 0` declaration at `guides/veneer.md:9953` and `tests/app/browser/integration.test.ts:1924`. Add the corresponding method, instance, and declaration nouns. The carried plaintext comment is corrected at `tests/app/browser/integration.test.ts:2438`.

   The report states these counts:

   - A shared-file patch (`b-frame-helpers-report.md:4`); “two methods” (`:8`); “both pure helpers” (`:37`); “both check-group cases” (`:42`); “both carousel cases” (`:49`); “one sentence” (`:80`); a test title and guide sentence (`:149`); “two box helpers” (`:161`); and a mode-token sentence (`:167`). Replace expandable prose tallies with names. The class also exposes the existing placement methods, making “two methods” inaccurate.
   - Recorded mutation results: `1 failed | 4 passed | 75 skipped (80)`; `3 failed | 3 passed | 56 skipped (62)`; `4 failed | 2 passed | 56 skipped (62)`; and `1 failed | 5 passed | 56 skipped (62)` (`:119`).
   - Recorded clip results: `1 failed | 79 passed (80)` and `80 passed (80)` (`:129`).
   - Recorded gate results: `313 passed`, `20 passed`, `80 passed`, `109 passed | 1 skipped (110)`, and `62 passed` for each named capture variant (`:141`).
   - The diff measurement `6 files changed, 1602 insertions(+), 2147 deletions(-)` (`:155`) matches the live diff.
   - The earlier setup observation states `1 failed | 312 passed (313)` (`:194`); the supplied setup log retains the later passing run.

**Outside the claims — LOCAL-OUTLINE-FACTORY: BROKEN.** `tests/setupBrowser.test.ts:181` adds a private `createOutlines` factory, called at `:311` and `:321`. The shared-test-infrastructure rule requires reusable factories in exported setup infrastructure. Move the factory into `tests/setupBrowser.ts` and import it. Its real portfolios and existing behavioral assertions remain appropriate.

**Attacked and held:** The scripted focus at `tests/app/browser/integration.test.ts:2194` establishes the reference pixels for a pressed-state comparison; it does not produce a focus-frame scenario. The resting cascade’s private copy lift is outside the driven-frame extraction. The page-strip branch at `:989` takes no frame and still uses Tab traversal.

VERDICT: FAIL 2, 5, 7, 8; outside the claims: LOCAL-OUTLINE-FACTORY