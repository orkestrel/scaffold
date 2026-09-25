LANE: eir-reviewer

I held the subjective lane: shape, naming, whether each proof is named for what it proves, guide truth and voice, and design fit. I did not write this work. `builder` wrote it on Sonnet. My lane has read-only tools, so every mutation below is worked out from source and none was run. The retained evidence holds no run output for either mutation (see R2).

1. **Scope — CONFIRMED.**
   - `/home/user/scaffold/.orkestrel/veneer/units/eir-status.txt` lists `guides/veneer.md` plus the owned files `_button.scss`, `_hr.scss`, `_tr.scss`, `button.test.ts`, and `hr.test.ts`.
   - Every hunk in `/home/user/scaffold/.orkestrel/veneer/units/eir.diff` stays inside the claimed set:
     - `_hr.scss` (diff :109–110), `_tr.scss` (:122–123), and the `.btn` alias (:83–84);
     - the `.btn-check` hiding (:92–97);
     - the proofs (:135, :143–144, :152–168, :182–186);
     - the guide rows: the stripe row (:27), the `.btn-check` clip departure (:42), the `.btn` border-width departure (:50), the `hr` ledger row (:58–59), and the five `.btn-check` addition rows (:67–71).
   - The rest of the token table (:9–34) is formatter column re-padding with no content change.

2. **Hook — CONFIRMED (from source).**
   - `/home/user/veneer-eir/src/styles/elements/_hr.scss:8`, `/home/user/veneer-eir/src/styles/elements/_tr.scss:12`, and `/home/user/veneer-eir/src/styles/components/_button.scss:23` → `:61` all read `var(--bs-border-width)`. A custom property inherits, so a scope that sets it moves each one.
   - `.btn` has executed proof: `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/eir-test-src-styles.log.txt:8200` reads "expected 3 to be 1".
   - Mutation: `_hr.scss:8` reads `--vn-border-width` again. That property resolves to 1px from `_tokens.scss:417`, and the scope at `hr.test.ts:27` does not set it. So the assertion at `/home/user/veneer-eir/tests/src/styles/elements/hr.test.ts:29` (`'3px'`) fails, and the proof tells the mutation apart from the pass.
   - The default-1px control is already in place: `TEXT_HR_CASES` (`tests/setupStyles.ts:1351`) pins it.
   - The claim cites `eir-instruments/` as its evidence, but that folder holds only the script, not its output (R2).

3. **Toggle — CONFIRMED (from source).**
   - `/home/user/veneer-eir/src/styles/components/_button.scss:127-131` matches `/home/user/veneer-eir/node_modules/bootstrap/dist/css/bootstrap.css:2490-2494` exactly.
   - `/home/user/veneer-eir/tests/src/styles/components/button.test.ts:391-399`:
     - Tab from "Before check" reaches the input (:393).
     - Space checks it (:395).
     - The label's ring then reads `[[0,0,0,3]]` (:397).
   - Mutation: `pointer-events: none` becomes `display: none`. The input leaves the tab order, so Tab lands on the label (`tabindex="0"`) and `:393` fails. The assertions tell the mutation apart.
   - The case does not bind the clip-path→clip change, and does not need to: it passes under the old hiding too. `:364` binds that change.

4. **Records — CONFIRMED on substance.**
   - The stripe row states the ruling from `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md:18`: keep 5%, below the 7.5% hover and 10% active overlays, consistent with `guides/veneer.md:3718-3719`.
   - The deleted `.btn-check` and `.btn` rows describe properties that now equal Bootstrap's declarations or are no longer declared.
   - The `hr` row restated as `declared` matches `_hr.scss:8`, where `currentColor` is the remaining departure.
   - The conformance ledger passes: `eir-test-conformance.log.txt:10-11` shows 26 of 26.
   - The row's voice and shape are a separate defect, filed as F2.

5. **The off-limits assertion — BROKEN.**
   - These parts hold:
     - `/home/user/veneer-eir/tests/src/styles/components/button-group.test.ts:567,587` asserts 1px under a 3px scope.
     - The ruling makes that false (log :8199–8211).
     - The case title at `:564` stays true after the patch, and becomes more exact.
   - The part that fails: the patch is not the whole correction.
     - The comment at `:581-583` says: "The children carry the Button family's own radius **and border width** rather than the two names retuned here".
     - After the patch, `:587` asserts 3px directly under that comment, so the comment contradicts the assertion it explains.
   - Fix: extend the returned patch to rewrite `:581-583`. Suggested text: "The children carry the Button family's own radius, so the retune leaves each child's corners where Button put them; their border width reads the retuned `--bs-border-width`, as the overlap does, so the pulled-back child still paints one shared line."
   - The `-3` at `:579` and the `3` at `:587` then prove together that the overlap equals the border it overlaps.

6. **Law — BROKEN.**
   - These parts hold:
     - The diff adds no `any`, `as`, `!`, suppression, nested declaration, or hidden helper. `(ring) => ring.lengths` is a callback passed directly as an argument, which is allowed.
     - The `hr` title at `hr.test.ts:26` is accurate.
   - The toggle title at `/home/user/veneer-eir/tests/src/styles/components/button.test.ts:384` is not named for what it proves.
     - The title is "…and **keeps** the label focus paint". "Keeps" means the paint holds through the toggle.
     - The case reads the ring only after Space (:396–399).
   - Mutation: remove `.btn-check:focus-visible + .btn` from the selector list at `_button.scss:99`.
     - The label then shows no ring while the unchecked input is focused.
     - `.btn-check:checked:focus-visible + .btn` (`:105`) still paints the ring after Space, so the case stays green while the title is false.
     - The assertions do not tell this mutation apart from the pass.
   - Fix: after `:393`, assert `input.matches(':focus-visible')` and the `[[0,0,0,3]]` ring on the label before pressing Space. Keep the post-Space reads. Retitling instead (for example "checks the hidden checkbox from the keyboard and paints its label's focus ring") is the weaker option.

**Findings outside the claims**

- **F1 — stale guide binding.**
  - `/home/user/veneer-eir/guides/veneer.md:7089` lists `--bs-btn-border-width` as bound to `var(--vn-border-width)` on `.btn`. The shipped value is `var(--bs-border-width)` (`_button.scss:23`).
  - This row is in the table that describes the mechanism the unit changed, and the unit edited this guide. `test:guides` passed, so no parity gate covers the row.
  - A consumer reading it concludes that a `--bs-border-width` retune leaves buttons alone, which is the opposite of the ruling.
  - Fix: change the cell to `var(--bs-border-width)`.
- **F2 — stripe row breaks the Source column's form and leaks campaign vocabulary.**
  - `/home/user/veneer-eir/guides/veneer.md:7058` reads "Bootstrap's 5%, kept by the E-IDENTITY ruling; …".
  - Every sibling row (`:7055-7066`) opens with a backticked origin (`elements`, `bootstrap`, `derived`), then an em dash and a reason. This row drops the origin label.
  - "E-IDENTITY ruling" names a campaign artifact that lives outside the package. A guide reader cannot resolve it (`writing.md` § Claims: claim only what the reader can check).
  - The builder copied this text verbatim from `e-id-record-brief.md:38`, so the Orchestrator's brief carries the defect.
  - Fix: "`bootstrap` — retained `$table-striped-bg-factor`, kept below the table's 7.5% hover and 10% active overlays".

**Attacked and held**

- The retune hook covers root retunes only. `--bs-border-width` is declared at `:root` alone (`_tokens.scss:544`; ledger `guides/veneer.md:9776` drops it from the light scope). A `--vn-border-width` set on a nested scope therefore no longer moves `hr`, `tr`, or `.btn`. The 47 existing `--bs-border-width` readers already behave this way, so this matches the ruling's "one hook" design. No guide sentence promises a scoped `--vn-border-width` retune for these elements.
- The toggle specimen's label carries `role="button" tabindex="0"`. Bootstrap's documented markup has neither, and the attributes add a second tab stop. The sibling cases (`:343`, `:359`) use the same specimen, and the input is still reached first, so this changes no verdict.
- The Button proof paragraph at `guides/veneer.md:7133-7136` does not mention the keyboard toggle case. This is not a parity row, so it is not filed as a finding.

**Referrals (to the objective lane)**

- **R1:** the returned patch's hunk header (`/home/user/scaffold/.orkestrel/veneer/units/e-id-record-report.md:93`, `@@ -584,7 +584,7 @@`) declares 7 lines, but the hunk body holds 5. Decide whether `git apply` accepts it as written.
- **R2:** the retained evidence holds no output from either mutation run. `eir-mutation.sh` writes its results to `/tmp/*-mutation-run.log`, outside the retained set, so the exit-1 readings exist only in the writer's report (`e-id-record-report.md:55-56`).
- **R3:** the report's gate table says `test:src:styles` exited 0 (`e-id-record-report.md:71`), but `eir-test-src-styles.log.txt:8219-8220` records a failure.
- **R4:** `tr.test.ts` was owned by this unit, but no test proves that a `--bs-border-width` retune moves table cell borders. Decide whether that is a test-sufficiency gap.

VERDICT: FAIL 5, 6; outside the claims: F1, F2
