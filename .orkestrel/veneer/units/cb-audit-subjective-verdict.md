# Verdict — cb round 1, subjective lane (workflow wf_19d09be7-986)

1. **Scope: CONFIRMED.** The file `cb-status.txt` (lines 1–8) lists exactly the brief's owned paths (`b-cross-cb-brief.md:47-49`), and `_shell.scss` changes only the control rule and its comment (`cb.diff:5-19`). The shared patch touches `guides/veneer.md`, `tests/conformance.test.ts`, `app/browser/Showcase.ts`, `app/browser/constants.ts`, `tests/app/browser/Showcase.test.ts`, and `tests/app/browser/integration.test.ts` (`cb-shared.patch:1,98,119,131,145,159`). Every one of them is in the brief's Shared list (`b-cross-cb-brief.md:51-54`). The apply clause is the Orchestrator's check, taken as given.

2. **B1 and B2, the cascade: CONFIRMED.**
   - The universal rule in `cb-cascade-after.txt:1` carries `margin:0`, `inherit` for font family, size, and line height, `border-radius:0`, `text-transform:none`, and `-webkit-appearance:button`, and nothing else. That is exactly what `node_modules/bootstrap/scss/_reboot.scss:390-393,406-415,418-421,452-456` writes on `button`.
   - The calibrated surface and every state branch sit under `button:not([class],[data-bs-target])` (`cb-cascade-after.txt:2-8`). That covers hover, active, focus-visible with its forced-colors ring, disabled, and reduced motion.
   - The reboot's focus, role, typed-input, and enabled-cursor rules are byte-identical before and after (`cb-cascade-before.txt` against `cb-cascade-after.txt:9-12`).
   - Design fit: the elements partial reads as the release's reboot plus a named bare subject (`/home/user/veneer-cb/src/styles/elements/_button.scss:4-21`). The comment ties the attribute exclusion to the guide's rule that an element rule never treats a tag by its position. That rule is in `guides/veneer.md:799`.

3. **The coverage: CONFIRMED.**
   - My own search closes the gap the report's searches leave.
     - The report's searches do not reach `app/browser/sections/ButtonSection.ts:64`, which renders the Button specimens through `createElement(specimen.tag)`.
     - They also miss the badge template at `app/browser/constants.ts:1503-1511`.
     - I searched `tag: 'button'` in `constants.ts:36-231,1503`. Every button that path renders is in the `btn` family, which the report does list. The form set is complete.
   - `cb-matrix.txt` moves only additions the bare rule supplied: font family, size, and line height, radius, color, transition, ring, disabled opacity, and pointer-events.
     - The `btn-close` padding change from 3.5px to 5px (`cb-matrix.txt:4-5`) is the release's own `.25em` padding following the inherited size. It is not a lost release declaration.
     - The release's own declarations, such as the `.btn-close` transition, are unchanged. `_close.scss` declares no transition.
   - As a design account the matrix is honest: each row names only the mutations its proof actually distinguishes. The list-group row's proof gap is finding F1.

4. **The proofs: UNRESOLVED.**
   - Red and green hold.
     - `cb-red.log.txt:424-555` shows exactly the six added or extended cases failing, each for the reason the report names (`Tests  6 failed | 153 passed (159)`).
     - The green run is `cb-green.log.txt`.
   - Each proof's mutation is distinguished (`cb-mutations.log.txt:1-110`):
     - **Carousel case:** with the `[data-bs-target]` exclusion dropped, the resting pip's radius reads 6 against 0 (`cb.diff:164`).
     - **Close case:** with the selector widened, `transition-property` reads the calibrated list against `all` (`cb.diff:212`).
     - **Nav and list-group cases:** with the disabled branch unscoped, opacity reads 0.65 against 1.
     - **Dropdown case:** with the focus-visible branch unscoped, the shadow ring reads against `none`.
     - **Elements case:** it reddens under every mutation.
   - Unresolved clause: "the restored build is byte-equal to the fixed build". `cb-mutate.sh:68` compares only the source partial (`cmp "$FIXED" "$PARTIAL"`), and `cb-mutations.log.txt:113` records only "restored partial equals the fixed copy". The report's line 157 ("cmp reported no difference" against `cb-after-index.css`) is the writer's word alone.
     - To settle it: a retained `cmp dist/src/styles/index.css .orkestrel/veneer/units/cb-instruments/cb-after-index.css` taken after the restore build.

5. **B4, the showcase hook: CONFIRMED.**
   - The wiring is consistent end to end:
     - The constant holds `'data-control'` (`cb-shared.patch:139-141`).
     - `Showcase.ts` sets it with `setAttribute` and no longer assigns a class (`cb-shared.patch:126-127`).
     - The shell selects `[data-control]` (`/home/user/veneer-cb/app/browser/styles/_shell.scss:28`).
   - Mutation: keep the class hook. `cb-app-unpatched.log.txt:912-930` shows the affordance case failing on `rgb(239, 239, 239)` against `rgb(107, 107, 107)`. The assertion `expect(dark).toStrictEqual(light)` (`Showcase.test.ts:317`) tells the reboot-only control apart from the bare one.
   - Name: `data-control` keeps the shell's word, matches the existing `data-specimen` hook (`tests/setupBrowser.ts:287`), and stays outside `data-bs-*`. `names.md` has no data-attribute rule it breaks. The shell comment at `_shell.scss:23-27` states why the hook is an attribute, and the explanation is correct.

6. **B5, the ledger: CONFIRMED.**
   - The patch removes exactly the stale departure rows at `cb-shared.patch:51-54`, which match report lines 210–213.
   - It removes exactly the stale Additions rows at `cb-shared.patch:62-75`, which match report lines 231–244.
   - It adds exactly the unrecorded rows at `cb-shared.patch:76-82`, which match report lines 219–225.
   - Each Reason is true beside its literal selector.
   - The forced-colors literals equal the compiled selector (`cb-shared.patch:106,115` against `cb-cascade-after.txt:7`).
   - The scratch runs pass: conformance `Tests  22 passed (22)` (`cb-scratch-conformance.log.txt:11`), and guides with the file passed (`cb-scratch-guides.log.txt:10`). I read the retained logs.

7. **B3, the guide and comments: BROKEN.**
   - **The § Files row is false** (`cb-shared.patch:9`). It says the calibrated surface is "on a button no class claims".
     - A `<button class="">` and a resting carousel indicator `<button data-bs-target="#harbor" data-bs-slide-to="1">` are both buttons no class claims. Neither receives the surface (`cb-cascade-after.txt:2`), and the unit's own cases prove both at `cb.diff:363` and `cb.diff:151,159-164`.
     - The phrase also makes a third term for one concept. The code and guide already say "bare button" (`button.test.ts:29`, `_shell.scss:20`, `cb-shared.patch:40`), and § Styles says "carries no `class` attribute and no `data-bs-target` attribute" (`cb-shared.patch:17-18`).
     - Fix: rewrite the row as "…and the calibrated surface and its states on a button with no `class` attribute and no `data-bs-target` attribute, in the elements layer."
     - Recommended, not required: define "bare button" once in the § Styles paragraph by those two attributes, and use it in the § Files row and the B5 Reasons (`cb-shared.patch:76-82`). This also rules the verdict's B5 wording "a button no class claims" imprecise. It survives only because every Reason sits beside the exact selector.
   - **The § Styles list overclaims** (`cb-shared.patch:19-24`). "At the release's values: no margin, … and the button appearance" is followed by "takes that reboot and nothing more from the `elements` layer".
     - A classed enabled button also gets the reboot's `cursor: pointer` from the elements layer (`cb-cascade-after.txt:12`), and the list omits it. A reader would conclude the cursor stays the default arrow.
     - Fix: add "and the pointer cursor while enabled" to the list, or drop "and nothing more".
   - **The `data-bs-target` sentence is too long** (`cb-shared.patch:24-26`). It chains three ideas with "because … and … so".
     - Fix: split it. "The `data-bs-target` attribute keeps the release's carousel indicators out as well, because the release gives a resting indicator no class. The attribute sits on the tag itself, so the rule still treats the tag by what it carries rather than by where the markup puts it."
   - **The § Showcase text was not rewrapped** (`cb-shared.patch:94`). One line runs to about 190 characters, where the paragraph otherwise wraps at 100. The sentence content is true.
   - What holds:
     - § Styles states the scope, the classed reboot, the reason for the exclusion, and the `btn` advice without claiming `btn` equals the bare surface.
     - § Tailwind is true (`guides/veneer.md:876,909`).
     - The dropped close and integration comments were false after the change.
     - The close case's title states the release's absent transition.

8. **Law and report: BROKEN.**
   - Code: no `any`, suppression, `!`, or nested function was added. The only `as` is a const assertion (`cb.diff:382`).
   - Report, rule that a code token takes a noun:
     - Line 130 has a bare `cmp` and a bare `dist/src/styles/index.css`.
     - Line 150 has a bare `transition-property`.
     - Line 157 has a bare `cmp`.
     - Line 271 has a bare `setAttribute(SHOWCASE_CONTROL, '')`.
     - Fix: "the `cmp` command", "the `dist/src/styles/index.css` file", "the `transition-property` property", and "the `setAttribute(SHOWCASE_CONTROL, '')` call".
   - Report, result lines:
     - The scratch `npm run build:src` row gives "build completed" (report line 194). The log's result line is `✓ built in 1.41s` (`cb-scratch-build.log.txt:56`).
     - The `npm run check` rows (report lines 180 and 200) paraphrase instead of quoting a line.
     - Fix: quote each gate's literal final line.
   - Temporal words: the only hit is "run once" at line 104, used as a count, which the rule permits.
   - Counts the report states, for the record. All are values from a run, not tallies:
     - `8 files changed, 267 insertions(+), 41 deletions(-)` (line 29)
     - `Tests  6 failed | 153 passed (159)` (lines 133 and 162)
     - `Tests  159 passed (159)` (lines 134 and 182)
     - `3 failed | 156 passed (159)`, which appears on three mutation rows
     - `2 failed | 157 passed (159)`, `1 failed | 158 passed (159)`, `4 failed | 155 passed (159)`, and `1 failed | 148 passed (149)` (lines 163–169)
     - `Tests  1233 passed (1233)` and the baseline `1228 passed (1228)` (line 183)
     - `220.53 kB │ gzip: 28.23 kB` (line 181)
     - `22 passed (22)`, `19 passed (19)`, `4 passed (4)`, `149 passed (149)`, and `109 passed | 1 skipped (110)` (lines 195–199)
     - The measurements 6px→0, 0.65→1, 14px→16px, and 24px→19.2px, and `rgb(239, 239, 239)` against `rgb(107, 107, 107)`

**Findings outside the claims**

- **F1. The list-group proof falls short of B6.**
  - B6 (`b-cross-cb-design-verdict.md:40-42`) requires the list-group proof to read the disabled button against its anchor on font metrics, and the focused forms on outline and shadow.
  - The extended case (`/home/user/veneer-cb/tests/src/styles/components/list-group.test.ts:143-155`) reads only pointer-events, color, background, opacity, and corners.
  - `cb-matrix.txt:59-68` shows the showcased `button.list-group-item-action` (`constants.ts:1444,1449`) changed on font-size, line-height, and the keyboard ring.
  - Mutations that leave the case green: dropping `font-size: inherit` and unscoping focus-visible. The list-group case is absent from both failing lists (`cb-mutations.log.txt:29-32,90-93`). The exit criterion ("every showcased component button form reads equal to its anchor … on the V9 properties") is therefore unproven for this form.
  - Fix: add a case like the dropdown case (`cb.diff:235-290`).
    - Compare the disabled button to `a.list-group-item-action.disabled` on font-family, font-size, and line-height.
    - Focus an enabled button and an anchor action through the keyboard, and hold their outline-style and box-shadow equal, with the anchor's shadow pinned to `none`.
    - Retain the red runs under the font-size and focus-visible mutations.

- **F2. A proof comment in two added cases is false.**
  - `tests/src/styles/elements/button.test.ts:68-69` and the nav case (`cb.diff:324-326`) both justify the wrapper `font: 20px/30px serif` as "type metrics no shipped token resolves to".
  - `--vn-size-5: 1.25rem` (`/home/user/veneer-cb/src/styles/_tokens.scss:260`) resolves to 20px. The root is 16px: `cb-matrix.txt:52` reads the menu's `1rem` as 16px. `--vn-line-body: 1.5` (`_tokens.scss:272`) resolves to 30px at that size.
  - The rival reading the comment says the case rules out would therefore pass. Writing `font-size: var(--vn-size-5); line-height: var(--vn-line-body)` on the universal rule would read `size: 20, line: 30`, exactly as `inherit` does. I derived this from the token values; I did not run it.
  - Fix: use wrapper metrics that match no token and no token ratio, for example `font: 19px/29px serif`. 19px matches no size token and 29/19 matches no line token. Update the expected `size` and `line` values, and the nav case's 20 and 30, to match.

**Attacked and held**

- **Showcase search.** I searched `app/` for every button form outside the report's searches: the section path `ButtonSection.ts:64`, the specimen data rows, and the badge template. Every form is `btn`-family, so claim 3 holds.
- **Classless triggers.** The `[data-bs-target]` exclusion also takes the bare surface off a classless modal or collapse trigger. That is correct under B1, and the attribute wording in § Styles covers it.
- **Close-test waits.** The `waitForAnimations` calls left in `close.test.ts:72,112,118,125` are harmless and match the idiom the rest of the suite uses.
- **Showcase class attribute.** No test asserts the showcase control carries no `class` attribute. The affordance case catches one indirectly, because the reboot-only fill differs between modes.
- **Carousel title.** The title's "with no ring" refers to the calibrated shadow ring, which is this codebase's usage (`focus-ring` mixin). The user agent's outline is held equal across both pip states rather than asserted absent.
- **§ Tailwind placement.** The added paragraph sits between the order-line and exclusion-line paragraphs, splitting that pair (`guides/veneer.md:915-919`). It would read better after the consumer-pairing paragraph, which already covers `px-8` over `.btn` (`guides/veneer.md:909`). This is a note, not a finding.

**Referrals**

- **To the objective lane:** the byte-equality clause in claim 4, and whether F2's rival mutation passes when run.

Lane held: subjective, `reviewer` on Opus 5.5.

VERDICT: FAIL 4, 7, 8; outside the claims: F1, F2
