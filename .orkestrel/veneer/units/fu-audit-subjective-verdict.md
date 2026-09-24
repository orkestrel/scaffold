<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_34cd1842-3f4, brief fu-audit-reviewer-brief.md. -->

1. **Scope and P9: CONFIRMED.** `/home/user/scaffold/.orkestrel/veneer/units/fu-status.txt:1-7` lists only the owned files: `app/browser/constants.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/browser/integration.test.ts`, and the `FocusRingSection`, `LinkSection`, and `VisibilitySection` section proofs.
   - The status file does not list `src/styles/utilities/_color-bg.scss` or its proof, so neither differs from `cf5e447`.
   - `/home/user/scaffold/.orkestrel/veneer/units/fu-shared.patch` changes only `guides/veneer.md`. Its hunks sit in § Showcase (patch lines 3, 31, and 58) and in the § Tests link list (patch lines 81 and 89). No hunk touches a ledger row.
   - No off-limits path appears in the status file.
   - Not a proof claim, so no mutation applies.

2. **Links: BROKEN.**
   - **What holds:**
     - Each state has its resting row (`tests/setup.ts` diff lines 799-834) and its driven rows (diff lines 849-857).
     - The population comes from `DRIVEN_KEYS` filtered by `LINK_SPECIMENS` (`fu.diff:277-278`).
     - Each frame is an element frame on the `p-2` wrapper (`fu.diff:325-327` and `:351`). This matches the lift pattern in the `nav-underline-focus` case (`/home/user/veneer-fu/tests/app/browser/integration.test.ts:1955-1995`).
     - The `main` guard is present (`fu.diff:331`).
     - The `link-state-undriven` mutation reddens the held check (`fu-mutations.log.txt:36-46`). That mutation removes the drive, and the `:hover` and `:focus-visible` matches tell it apart from the passing case.
     - The split specimen lines are required by the pointer's reach. `fu-hover-reach.log.txt:142-146` and `:210-212` show the hover succeeding up to about x 914 and timing out from x 919 on.
   - **What breaks:** the claim that the case asserts each state at its shot through a key the class's own rule writes.
     - The key check covers only links whose class list carries a `-hover` token: `integration.test.ts:2357` adds them to the `stepped` set, and `:2475` filters on that set.
     - `color` is left out of every link's check (`:2333-2334`).
     - So `role-links-*` and `body-emphasis-link-hover` and `-focus` assert only the `:hover` or `:focus-visible` match.
   - **Mutation that the case cannot tell apart:** delete the `&:hover, &:focus` block in `/home/user/veneer-fu/src/styles/utilities/_link.scss:29-36`.
     - Under that mutation, `held`, `framed === driven`, and `restored` all stay true, and the body-emphasis rows are never in the `stepped` set.
     - The `body-emphasis-link-hover` frame would then show the resting paint under a name that claims the 0.75 step, and the case stays green.
   - **Smallest fix:** in the link-state case, assert that `color` moved from rest for the `.link-body-emphasis` link.
     - That helper's rule is `!important` in the utilities layer, so the bare `a:hover` element rule cannot move this link's color. The comment's reason for leaving color out does not hold for this link.
     - For the role-link rows, assert that the paint did not move. That pins the documented departure at `guides/veneer.md:5602-5604`.

3. **Focus rings: CONFIRMED.**
   - The resting rows for primary through danger read `--bs-focus-ring-color` (`fu.diff:759-794`). The default ring's resting row reads `box-shadow` (`fu.diff:753-758`). The focus rows are at `fu.diff:843-848`.
   - The case asserts:
     - one ring link per specimen (`fu.diff:150-155`);
     - the state at the shot (`:215-219`);
     - each ring inside its frame (`:222-237`, `:256`);
     - `none` at rest and after blur (`:257`);
     - distinct rings (`:259`).
   - **Mutation `role-rings-default`** (`fu-mutations.log.txt:3-22`): with every role class removed, all rings collapse to one value. The case reports `expected 1 to be 7`, so the assertion tells the mutation apart.
   - **Mutation `ring-frame-unpadded`** (`:24-34`): without the padding, the ring crosses the frame edge, and the inside-edge array reddens.
   - Every added ring frame shows the ring whole inside the padding, for example `primary-focus-ring-focus--light-1280.png`, `warning-focus-ring-focus--dark-390.png`, and `danger-focus-ring-focus--dark-390.png`.

4. **The focusable container: CONFIRMED.**
   - The specimen is at `fu.diff:76-80`.
   - The journey case asserts `:focus-within` and not `:focus` (`fu.diff:479`, `:496`). It reads the width at rest, revealed, framed, and after blur (`:460`, `:480`, `:485`, `:489`, `:497-499`).
   - The section case asserts the same states (`fu.diff:618-636`).
   - **Mutation `container-always-hidden`:** adding the `visually-hidden` class keeps the container at 1px. Both cases report `expected 1 to be greater than 1` (`fu-mutations.log.txt:48-65`), so the width assertion tells the mutation apart.
   - The frames agree. `focusable-container-focus--light-1280.png` and `--dark-390.png` show the revealed sentence, and `focusable-container--light-1280.png` and `--dark-390.png` show it hidden.

5. **Derived populations: CONFIRMED.**
   - The section proofs read their specimen names from the tables (`fu.diff:528-530`, `:559-561`, `:585-587`).
   - **Mutation `emphasis-link-merged`:** when the emphasis link rejoins `Role links`, the filtered count goes from `[1]` to `[9]` (`fu-mutations.log.txt:79-89`).
   - **Mutation `default-ring-unrested`:** with the row removed, the driven-row case returns the orphaned row (`:67-77`). Both assertions tell their mutation apart.

6. **P18: CONFIRMED.**
   - The helper-key paragraph orders its regions Type, Media, Links, Layout, Float, Flex, Text, Color (`fu-shared.patch:18-27`). `/home/user/veneer-fu/app/browser/Showcase.ts:124-127` and `:163-175` mount them in that order, and each region appears once.
   - The viewport run orders Toast, Modal, Offcanvas, Overflow, Position, Sizing, Navbar (`fu-shared.patch:42-47`), which matches `Showcase.ts:154-179`.
   - The repeated Flex clause, the repeated list clause, and the dangling Offcanvas run are gone (patch lines 7-17 and 52-54).
   - Every rewritten sentence reads true against the showcase. A clarity regression in the same sentence is filed as finding F2.

7. **The frames: BROKEN.**
   - **Frames that show their state:** every ring frame; `role-links-focus--light-1280.png` and `body-emphasis-link-focus--light-1280.png` (outline visible); `body-emphasis-link-hover` (the 0.75 paint at both variants); `link-opacity-hover` (the 10% step visibly faded); `underline-opacity-hover` (the 0% step loses its underline); `icon-links-hover` and `-focus` (the arrow is shifted at both variants); and `focusable-container-focus`.
   - **`role-links-focus--dark-390.png` does not show the focus state.** It shows no focus indicator, and the role-link paint does not change under focus (documented at `guides/veneer.md:5602-5604`). The frame is indistinguishable from `role-links--dark-390.png`. The report's own reading records the outline as `rgb(16, 16, 16)` on the dark canvas (`b-util-frames-report.md:178-182`).
   - **`underline-offsets-hover`:** the case drives the smallest step, `link-offset-1-hover` (`fu-hover-reach.log.txt:164`). Its shift from `auto` to `1.75px` is not visible in `underline-offsets-hover--light-1280.png` at the supplied resolution. The only visible change at `dark-390` is the bare `a:hover` color, which the case itself says proves nothing about the class. `Hover offset 3` sits at about x 215-315, which the pointer can reach.
   - **Smallest fix:**
     - Re-shoot `role-links-focus--dark-390` after FOCUS-FRAME's dark focus-indicator fix (the P2 class) lands. The carrier is FOCUS-FRAME plus a recapture.
     - Drive `underline-offsets-hover` on the largest hover step, for example by choosing the last `-hover` link for that specimen, or by putting `link-offset-3-hover` first in the hover line (`constants.ts` `LINK_SPECIMENS`, `Underline offsets`).

8. **Law and report: CONFIRMED.**
   - The diff adds no `any`, no `as`, no non-null `!` (only logical negation), no suppression, no nested declaration (only inline callbacks), and no mock, spy, or fake clock.
   - The case populations come from `DRIVEN_KEYS` and the specimen tables. The focusable-container case has a single subject.
   - The result lines match the logs: `fu-gate-format.log.txt:3`, `fu-gate-setup.log.txt:48`, `fu-gate-setup-2.log.txt:32`, `fu-gate-sections.log.txt:975-976`, `fu-gate-build.log.txt:56`, `fu-capture-light-1280.log.txt:79`, `fu-capture-dark-390.log.txt:81`, `fu-gate-guides.log.txt:11`, and `fu-scratch-policy.log.txt:11`.
   - The `npx` gate commands appear only in the report, because the logs do not echo them. The `npm run` gates echo their scripts.
   - For the record, counts and position words in the report:
     - Counts of a set that can grow: "one limit" (line 17) and "the same two places" (line 153).
     - Ordinal naming by position: "first run" (lines 185 and 197).
     - Permitted uses: "both" at lines 12, 14, 95, 114, 148, and 179 names its members; "three-way" at line 22 names a kind of merge; the run tallies, ratios, pixel and millisecond values, and the diffstat are measurements.
     - No banned temporal word appears (`now`, `new`, `latest`, `soon`, `currently`, `once`, `since`).
   - Code tokens the report leaves without a noun:
     - line 1: `fu`; line 3: `opus`, `unit/fu`, `cf5e447`;
     - line 29: `LINK_SPECIMENS`; line 30: `role-links-hover`, `role-links-focus`;
     - lines 51-52: `body-emphasis-link`, `color`, `body-emphasis-link-hover`, `body-emphasis-link-focus`;
     - line 56: `LinkSection.test.ts`; line 58: `LINK_SPECIMENS`;
     - lines 64-65: `Link opacity`, `Underline offsets`, `Underline opacity`, `Underline colors`;
     - lines 67-71: the row tokens and their property tokens;
     - lines 99-106: `FOCUS_RING_SPECIMENS`, `Default focus ring`, `Primary focus ring`, `Dark focus ring`, and the row stems;
     - lines 112 and 114: `FocusRingSection.test.ts`, `FocusRingSection`;
     - line 121: `default-focus-ring`, `.focus-ring`, `box-shadow`, `none`;
     - line 123: `tests/setup.test.ts`; line 129: `Focusable container`, `VISIBILITY_SPECIMENS`;
     - lines 131-133: the row tokens; line 139: `VisibilitySection.test.ts`;
     - line 148: `light-focus-ring-focus`, `dark-focus-ring-focus`; line 149: `tests/src/styles/components/focus-ring.test.ts`;
     - line 155: `node_modules/playwright-core/lib/coreBundle.js`; line 157: `display.test.ts`, `overflow.test.ts`;
     - lines 181-182: the frame filenames and `tmp/capture/dark-390.txt`;
     - lines 226 and 229: `LinkSection`, `tests/setup.test.ts`;
     - lines 237-247: each touched-file path before its colon.

**Orchestrator rulings**
- **Light and dark rings stay unframed: retained.**
  - Any stem for these specimens must carry the role word, because the specimen name is the role's name. Renaming them would break the rule that one concept takes one term.
  - Framing them therefore needs a ruling on the registry law, not a unit edit. The limit is recorded in `tests/setup.ts:596-599` and `fu-shared.patch:62-67`.
- **Three-way overlap with FOCUS-FRAME: retained.** No supplied evidence bears on it.

**Findings outside the claims**
- **F1. Counts in shipped prose.** `AGENTS.md` § Writing says never state a count.
  - `/home/user/veneer-fu/tests/setup.ts:602` and `fu-shared.patch:69` both say "Three states lie outside the journey's variants". The set of states outside the variants can grow.
  - `/home/user/veneer-fu/app/browser/constants.ts:2839` says "which are the two conditions the focusable helper answers to".
  - Fix: write "These states lie outside the journey's variants" in both places, and "which are the conditions the focusable helper answers to".
- **F2. The viewport sentence lost its antecedent** (`fu-shared.patch:42-48`).
  - The clause "the frame clips what a card under the `visible` value spills and gives the axis cards a bounded height to share" followed "every Overflow specimen" in the base text. After the reordering it follows the `Navbar with offcanvas` specimen, so "a card" and "the axis cards" have no clear referent.
  - Fix: name the Overflow region in the clause: "the frame clips what an Overflow card under the `visible` value spills and gives the Overflow axis cards a bounded height to share."
- **F3. The Visibility region's visible copy omits the added specimen.**
  - `/home/user/veneer-fu/app/browser/constants.ts:2825` describes the invisible word, the visually hidden phrase, and the skip link, and says "Press Tab to reach the skip link". The `Focusable container` specimen also reveals on Tab, and the copy does not mention it.
  - Brief defect: `VISIBILITY_COPY` was neither owned nor off-limits (`b-util-frames-brief.md:70-78`), so the unit left it and reported it (`b-util-frames-report.md:183-184`).
  - Fix: add the container to the paragraph, for example "…a skip link that appears only while it holds focus, and a container that appears while the link inside it holds focus. Press Tab to reach each link."
  - `VisibilitySection.test.ts` reads the paragraph from the constant, so the edit needs no change to that proof.

**Attacked and held**
- **`role-links-hover` at both variants** matches the resting paint. That is the documented departure at `guides/veneer.md:5602-5604`, not a frame defect.
- **Resting role-ring frames:** the six frames (`primary-focus-ring--light-1280.png` through `danger-focus-ring--dark-390.png`) look alike, differing only in their labels. The driven-row registry law requires a resting row for each subject, and each pairs with its focus frame. This is acceptable.
- **`icon-links-focus--light-1280.png`:** the outline steps at its right edge around the shifted icon. It is still whole inside the frame.
- **`skip-link--light-1280.png`** still frames the skip-link paragraph, although the skip-link row's selector also matches the container's paragraph.
- **`FOCUS_RING_SPECIMENS` names:** the names are built at run time by capitalizing each role (`constants.ts`, `FOCUS_RING_SPECIMENS`). `Primary focus ring` therefore appears as a literal only in `tests/setup.ts`. This is plain enough to hold.

**Referrals**
- **To the objective lane (claim 2):** run the `_link.scss:29-36` hover-block deletion against the link-state case, and confirm it stays green.
- **To the Orchestrator:** the lift, frame, and inside-edge block repeats across `integration.test.ts:1955-2026` and the three cases this unit added (around lines 2238-2290, 2369-2445, and 2510-2535). The natural extraction target is `tests/setupBrowser.ts`, which was off-limits (`b-util-frames-brief.md:75`). Name a carrier, and check whether a duplication gate applies.
- **Dispatch defect: none.**

VERDICT: FAIL 2, 7; outside the claims: F1, F2, F3
