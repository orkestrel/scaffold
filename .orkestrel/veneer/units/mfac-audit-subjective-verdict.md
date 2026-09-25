**E-ID-MOTION-FACTOR audit: subjective lane (`reviewer` on Opus 5.5)**

I held the subjective lane. I read every file the claims name and the worktree `/home/user/veneer-mfac`. I edited nothing and ran nothing. Any behavioural reading that is my own derivation rather than an executed run is labelled as derived.

## Verdicts

**1. CONFIRMED.**
- **Evidence:**
  - Each owned case passes: `/home/user/scaffold/.orkestrel/veneer/units/mfac-instruments/mfac-green.log.txt` lines 112–591, `exit=0`.
  - On the base partials each case fails at the ratio: `mfac-red.log.txt` lines 595, 634, 656, 690, 712, and 751.
  - A grep of `/home/user/veneer-mfac/src/styles` (`_tokens.scss` excluded) for literal durations returns only these sites: `_collapse.scss:20,29`, `_modal.scss:66`, `_offcanvas.scss:88`, `_carousel.scss:42,81,194`, and `_accordion.scss:34` (the chevron). It also returns the animations in `_placeholder.scss`, `_spinner.scss`, and `_progress.scss:76`.
- **Mutation:** restore the release literal at any owned site. At factor `2` the ratio then reads `1`, and the case fails with an `AssertionError`. The assertions tell that mutation apart from the passing case.
- **Bound:** the accordion case samples color, background-color, box-shadow, and border-bottom-left-radius, but not border-color. The button's border does not change on collapse, so no transition runs for it. A literal restored on that one entry alone is caught only by the ledger row (Referral R3).

**2. BROKEN.** The descriptive parts hold: the `0.15s` sites read `--vn-motion-feedback`, the other two sites use the `calc` form, and every easing stays the release's. The per-site form is still two decisions, and it produces two scoping behaviours for one factor.
- **Failing state (derived, not executed):**
  - The root motion factor is `1`, and `<div style="--vn-factor-motion: 2">` wraps a `.form-floating` control and a `.nav.nav-tabs`. Lift the label and activate the tab.
  - The label's transform transition reads 200ms, because `/home/user/veneer-mfac/src/styles/components/_form-floating.scss:53-54` substitutes `var(--vn-factor-motion)` on the label itself. The progress bar behaves the same way, because `_progress.scss:27` declares the factor read on `.progress`.
  - The nav link stays at 150ms, because it reads `--vn-motion-feedback`, which is substituted once on `:root` (`/home/user/veneer-mfac/src/styles/_tokens.scss:448`).
  - This falsifies the guide's own model at `/home/user/veneer-mfac/guides/veneer.md` lines 7110–7114 for these two sites: "A subtree that sets a factor alone keeps the root's lengths". The case comes from the mechanism that paragraph states. It also cuts across the placement rule TOKEN-PROOFS is writing (`/home/user/scaffold/.orkestrel/veneer/plan.md` lines 113–116).
- **Design fit:**
  - These two partials are the only ones in `src/styles` that read a factor directly (grep for `vn-factor-` outside `_tokens.scss`).
  - The form departs from the binding verdict opening, "Every value below reads a `--vn-*` token scaled by `--vn-factor-motion`" (`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:14`).
  - The same partial's header comment states two different conventions for "no token carries this value". Lengths multiply `--vn-space-8` by the release's ratio (`_form-floating.scss:5-7`), while the duration multiplies the factor (`_form-floating.scss:9-11`).
  - The stated reason is value coincidence: "because no motion token resolves to that duration" (guide around line 5352, `_progress.scss:25-26`). That reason goes false when E-ID-MOTION-CAROUSEL adds `--vn-motion-slide` at `calc(600ms * var(--vn-factor-motion))` (verdict line 24). The guide's own rule would then move the progress fill onto a token the verdict named for a kind of motion, a slide.
- **Required change (recommended option):**
  1. In `_form-floating.scss:53-54`, write `calc(var(--vn-motion-feedback) / 1.5)`.
  2. In `_progress.scss:27`, write `calc(var(--vn-motion-feedback) * 4)`. Both forms resolve the release value at factor `1`, mirror the partial's own length convention, and keep every factor read in `_tokens.scss`.
  3. Rewrite both comments (`_form-floating.scss:9-11`, `_progress.scss:25-26`). Give the reason by the kind of motion, never by value.
  4. Update the matching guide text:
     - the ledger Veneer cells (around lines 8251 and 9355–9358);
     - the departure bullets (around 4409–4413 and 5350–5353);
     - the progress paragraph (around 5335–5338);
     - the second sentence of § Factors (around 7106–7107), which becomes "reads a `--vn-motion-*` token or a multiple of one".
  5. Add a case to `tests/src/styles/components/form-floating.test.ts` that sets the factor on a wrapper alone and asserts the label keeps the root duration.
- **Options not recommended:**
  - Adding kind-named tokens to `_tokens.scss` needs the Orchestrator, because the file is outside the owned set.
  - Keeping the direct form and documenting the scoping exception at lines 7110–7114 is refused, because it ships two behaviours for one factor.

**3. CONFIRMED.**
- **Evidence:**
  - The red and green logs are cited under claim 1.
  - `mfac-plant-pagination.log.txt:113,157,159` and `mfac-plant-floating.log.txt:110,137,139` each show an `AssertionError`, `exit=1`, and `restored=identical`.
  - The titles name what each case proves, and every case comment is true of the driven change.
- **Mutation:** the literal restored at a site. It is killed at the ratio, and the assertions distinguish it.
- **Bound:** the proofs set the factor only on the document element. They cannot tell the direct-factor form from the token form, so they do not guard the scoping behaviour in claim 2.

**4. CONFIRMED.**
- **Evidence:** removing the navbar row fails "records every measured value difference in the guide ledger" with an `AssertionError` naming that row (`mfac-plant-ledger.log.txt:48-56`), and the file restores identically (line 90). `mfac-conformance.log.txt:12,16` shows 26 passed and `exit=0`.
- **Mutation:** row removal. The assertion names the row, so it distinguishes.
- **Note:** the two direct-factor rows change with claim 2's fix.

**5. CONFIRMED on the text at this tree.**
- The exception list matches the source grep under claim 1.
- The easing sentences hold: no `--vn-ease-*` token resolves to `ease-in-out` (`_tokens.scss:450-452`).
- Read at the root, "doubles at a factor of `2`" and "no transition at a factor of `0`" hold per the green log.
- Two items carry elsewhere. The sentence "or multiplies the release's own duration by the factor" (around line 7106) changes with claim 2. The clause "as their own sections record" points the reader at the contradiction in F1.

**6. CONFIRMED.**
- **Evidence:** `/home/user/veneer-mfac/tests/src/browser/Tab.test.ts:64` pins `'0.15s, 0.15s, 0.15s'`. `mfac-engine-read.log.txt:13-18` shows 79 passed and `exit=0`.
- **Mutation:** any nav duration other than `0.15s` at factor `1` reddens that line. This change produces none.
- **Process note for the Orchestrator:** the unit continued past its brief's stop clause (`e-id-motion-factor-brief.md:114-115`). You have already carried the pin to J-MOTION-PROOFS-B (`plan.md:107-112`).

**7. UNRESOLVED.**
- **What holds:**
  - The patch text matches the claim.
  - The retained `/home/user/veneer-mfac/tmp/units/patch/verify/patched/` sources call `motion()`.
  - `patch/verify/base.css` and `patched.css` agree at every line that reads the factor (lines 135–136, 3756, and 5755 in each).
  - `.claude/rules/styles.md` lines 45–48 do move a pattern two partials share when both carry one decision.
- **What is open:** whole-file byte identity rests on the writer's `cmp`, and no `cmp` output is retained. `cmp base.css patched.css` settles it (Referral R4).
- **Design ruling:** if claim 2's fix lands, `motion()` has no caller and the patch must not land. If the direct form stays, `motion` fits the naming precedent that `breakpoint` and `heading-size` set. The cost is that it hides the direct factor read that causes the scoping split in claim 2.

**8. CONFIRMED.**
- `mfac-status.txt` lists only owned files, and the `src` hunks of the diff touch only the named partials.
- The gate logs read `exit=0`: format line 6, check 30, lint 6, conformance 16, guides 16, and policy 16.
- The styles suite reads 115 files passed and `exit=0` (`mfac-styles-suite.log.txt:8198-8203`).

## Findings outside the claims

**F1. The guide now states opposite rules for the same condition.**
- **Where:** at this tree, the following sections say that no token resolves, so the value is a literal and the factor does not rescale it:
  - carousel, around guide lines 5791–5792: "Bootstrap's literals, because no published motion token resolves to the `0.6s` duration";
  - collapse, around 4681–4683, and `_collapse.scss:9-10`;
  - modal, around 5575, and `_modal.scss:63`;
  - offcanvas, around 5895–5896.

  This unit's text says the reverse, that no token resolves, so the value scales: the progress bullet (around 5350–5353, the same `0.6s`), the floating-label bullet (around 4409–4413), and § Factors (around 7106–7107), which sends the reader to "their own sections".
- **Why it matters:** the guide is the package's one current voice. A reader cannot tell which rule governs a duration that no token resolves.
- **What right looks like:** each of E-ID-MOTION-COLLAPSE, E-ID-MOTION-MODAL, E-ID-MOTION-OFFCANVAS, and E-ID-MOTION-CAROUSEL rewrites its sentence when it lands. If FACTOR lands first, name those four units as carriers per § Carry every finding, or land FACTOR after them. The unit's report names the same carriers for the § Factors strike list.

**F2. Some prose fails the first-read standard or uses two terms for one concept.**
- `/home/user/veneer-mfac/src/styles/components/_accordion.scss:50` reads "reads the feedback token the accordion declares it over". Write instead: "The button's transition reads the `--bs-accordion-transition` property, whose durations are the `--vn-motion-feedback` token."
- One fact appears as "which no motion token resolves to" (nav, guide around 4888) and as "no published token resolves to that easing" (pagination, around 5219). Use one term in both places.

## Attacked and held

- The guide's pagination and navbar prose is true of the diff.
- Animations do not read the factor. § Factors says "transition duration", which bounds the claim.
- The carousel fade hold (`opacity 0s 0.6s`) is a delay, not a duration.
- The guide lines around 4425 and 5337 were left unwrapped. That is cosmetic only.

## Referrals to the objective lane (`analyst` on Astra)

- **R1:** Execute claim 2's subtree vector. Set the factor on a wrapper only, then read the form-floating label and a nav tab with `sampleTransition`. My reading is derived: I expect 200ms for the label and 150ms for the tab.
- **R2:** Rule `.claude/rules/tests.md` lines 183–190 on the factor-sweep block (`['1','2','0'].map` with set, mount, drive, sample, clear). It repeats inline across the new cases and `fade.test.ts:200`, and `tests/setupBrowser.ts` is a report-only shared file.
- **R3:** Confirm that the ledger alone guards the accordion `border-color` entry.
- **R4:** Run `cmp` on `/home/user/veneer-mfac/tmp/units/patch/verify/base.css` and `patched.css`.

VERDICT: FAIL 2, 7; outside the claims: F1, F2
