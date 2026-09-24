<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_1626ffeb-c05, brief fp-audit-reviewer-brief.md. -->

**Lane: subjective, held by `reviewer` on Opus 5.5.** The unit was written by `opus` on Opus 5.5, so this lane audits work from its own engine. It read every frame the report lists, at `light-1280` and `dark-390`, under `/home/user/veneer-fp/tmp/capture/states/`.

## Per-claim verdicts

1. **CONFIRMED** — Scope.
   - `/home/user/scaffold/.orkestrel/veneer/units/fp-status.txt` lists exactly these files, and all of them are owned: `app/browser/constants.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/browser/integration.test.ts`, and the Button group, List group, and Placeholder section proofs.
   - `fp-shared.patch` touches `guides/veneer.md` alone. Its hunks are § Collapse (around line 3617), § Showcase (around 9250), and § Tests (around 9373). It changes no ledger row.
   - The Orchestrator ruled the § Showcase edit in scope. That ruling holds: the paragraph at `guides/veneer.md:9253-9257` says the grow spinners are declined, which the `grown` rows make false.
   - The § Collapse clause (`guides/veneer.md:3620-3621`, "the way it declines the grow spinners") went false the same way. It is in scope on the same grounds, although no ruling names it.

2. **CONFIRMED** — The grow spinners.
   - `grown` is in `CaptureState` (`tests/setup.ts`, around line 422), and the two driven rows are in `DRIVEN_KEYS`.
   - The case reads its population from `SPINNER_SPECIMENS`. It pauses at the keyframe whose `opacity` is `'1'` and asserts `paused`, opacity `1`, and transform `none` (`integration.test.ts`, near the `holds each grow spinner` case).
   - The frames show a whole disc inside the padding in every variant (`grow-spinner-grown--light-1280.png`, `grow-spinner-grown--dark-390.png`, `small-grow-spinner-grown--light-1280.png`, `small-grow-spinner-grown--dark-390.png`).
   - Mutation: M8 sets `currentTime = 0`. At the first step opacity is `0` and transform is `scale(0)`, so `readings` differs from `[name,'paused','1','none']`. The assertion distinguishes M8 (`fp-mutations.log.txt` M8: `Tests  1 failed | 49 skipped (50)`).
   - The "restores" sub-claim goes to referral R2.

3. **CONFIRMED** — Disabled buttons.
   - `disabled-buttons--light-1280.png` and `disabled-buttons--dark-390.png` show five dimmed hosts after one enabled host.
   - The case splits the forms off the shipped rule (`_button.scss:111-116`) and asserts exactly one host per selector, `DISABLED_OPACITY` with `none` on each dimmed host, `1` with `auto` on the enabled host, and the enabled host as the only tab stop.
   - Mutation: M1 removes `disabled` from the fieldset. `fieldset:disabled .btn` then matches no host and the count row reads `0`, so the assertion distinguishes M1 (log M1: `1 failed | 7 passed (8)`).
   - F2 covers the comparator and prose defects next to this claim.

4. **CONFIRMED** — Role hovers and pressed faces.
   - Hover frames:
     - Each of the 13 hover frames shows the lifted host with padding on every side, at both variants.
     - The filled roles show the mixed fill (`secondary-hover`, `tertiary-hover`, `success-hover`, `info-hover`, `warning-hover`, `danger-hover`).
     - The outline roles show the filled hover face (`outline-primary-hover` through `outline-danger-hover`).
   - Guard and assertion: the structural `main` guard precedes the shot, and `framed` holds `:hover` plus the hovered fill at the shot (the role pointer case).
   - Pressed specimen: `pressed-roles--light-1280.png` and `pressed-roles--dark-390.png` show every role once, filled and outline, light and dark included.
   - Mutations, all at case level in the log:
     - M2 drops `active`. The section's `active`/`aria-pressed` filter and its off-rest filter fail.
     - M5 disables the twins. Each twin paints the disabled face, so `face.join() !== twin.join()`.
     - M6 drops `secondary-hover`. The `Secondary` subject goes unframed and fails the `MODE_TOKEN` filter.
     - Each assertion distinguishes its mutation.
   - Given ruling: the ruling that the law stands and the four hovers are read with no frame holds on the evidence.
   - F1 covers the layout the pressed frame is shot in.

5. **CONFIRMED** — The link button.
   - `link-hover` and `link-active` show the link-hover color on the lifted host.
   - In `link-focus--light-1280.png` the ring clears all four edges. In `link-focus--dark-390.png` the ring is faint (P2 class) but inside the frame.
   - The ring comes from `.btn-link:focus-visible` → `focus-ring` (`_button.scss:195-200`), which paints a `box-shadow`.
   - The case asserts that each placed scenario is registered.
   - Mutation: M7 removes the padding. `region.x - reach*ratio` goes negative and `inside` differs from `[true,true,true,true]`, so the assertion distinguishes M7. The log shows only case-level failure, so the report's claim that M7 fails on the ring-inside assertion specifically is UNRESOLVED.
   - Adjacent behaviour: `link-hover` and `link-active` frames look the same. This is correct, because `_button.scss:183,185` sets both colors to `--vn-link-hover-base`.

6. **CONFIRMED** — List group roles.
   - The section case derives roles from rules carrying `--bs-list-group-active-bg`. The selected rows paint off their resting fill, so M4 reddens it (log M4: `1 failed | 2 passed (3)`).
   - The journey asserts that each hover fill is distinct, so M9 (every row primary) collapses the set size.
   - The journey asserts that no other row is hovered or focused at either shot, so M11 reddens it.
   - Distinctness of the pressed fill per role is not asserted. It follows only from the report's claim that the hover and press slots share one token. This is not broken, but it is thinner than the claim's wording.

7. **CONFIRMED** — The large placeholder.
   - `large-placeholder--light-1280.png` and `large-placeholder--dark-390.png` show two bars on one top edge, with the step at their bottom edges.
   - The case reads both `em` floors and asserts the ratio at `toBeCloseTo(…, 2)`, equal widths, and equal tops.
   - Mutation: M3 (`align-items-end`) moves the tops apart, so the assertion distinguishes it (log M3).

8. **BROKEN** — The frames.
   - Every frame is whole, and each shows its state, except one: `list-group-role-actions-active--dark-390.png`.
   - In that frame the pressed row is the dark role. Its fill cannot be told apart by eye from the same row at rest in `list-group-role-actions--dark-390.png`. Only the label brightens.
   - The same frame at `light-1280` reads clearly as a grey press.
   - Cause: the case always shoots the press on `rows.at(-1)` (`integration.test.ts:1660`, "the pressed frame on the last"). That picks the role whose press is weakest in the dark theme.
   - Fix: shoot the press on a named role whose pressed fill separates from rest in both modes, for example the secondary or danger row. Select it by its role class, not by its position.
   - The fill delta is referral R3.

9. **BROKEN** — Law and report.
   - The law part holds:
     - The diff adds no `any` and no `!` assertion; its only `as` is the `as const` in `PlaceholderSection.test.ts`.
     - It adds no suppression and no mock, spy, or fake clock.
     - Every callback is passed directly as an argument.
     - `MODE_TOKEN` (`tests/setup.ts:494`) is the only copy of the pattern, used by `setup.test.ts:95` and the role case.
   - The report part fails:
     - Report line 225 does not quote the app gate's command. It paraphrases the path arguments ("over the Button, Button group, … section proofs").
     - `fp-test-app.log.txt` records no command line, so the command as run cannot be recovered.
     - Fix: quote the exact `npx vitest run …` invocation with every path, and write it at the head of the log.
   - The other result lines match their logs: `fp-red-sections.log.txt:230`, `fp-green-sections.log.txt:90`, `fp-red-journey.log.txt:207`, `fp-green-journey.log.txt:126`, `fp-test-setup.log.txt:32`, `fp-test-app.log.txt:77`, `fp-capture-*.log.txt:78`, `fp-test-guides.log.txt:11`, and `fp-format.log.txt:3`.
   - For the record, the report states these counts and values, each as a measurement quoted with its run: the diffstat per-file figures, `7 files changed, 825 insertions(+), 21 deletions(-)`, `Tests 7 failed | 7 passed (14)`, `14 passed (14)`, `4 failed | 46 skipped (50)`, `4 passed | 46 skipped (50)`, `299 passed (299)`, `38 passed (38)`, `50 passed (50)` at each capture variant, `20 passed (20)`, `Tests 1 failed`, `npm 11`, and `10100ms`. It states no free-standing tally.
   - Temporal words: "first" at lines 11, 133, 184, 209, and 216; "then" at 61 and 67; "again" at 63; "next" and "after" at 289; "before" at 160, 176, 185, and 211. "once" at 19 and 95 is the count sense and is permitted.
   - Code tokens left without a noun:
     - line 56: `grow-spinner-grown`
     - line 57: `small-grow-spinner-grown`
     - lines 62-63: `paused`, `1`, `none`, `running`
     - line 73: `1`, `auto`
     - lines 77-79: `<stem>-hover` and the role subjects
     - line 100: `link-hover`, `link-focus`, `link-active`
     - line 104: `focus()`
     - line 105: `:focus-visible`
     - line 108: `outline: none`
     - lines 113-114: the scenario names
     - line 118: `action-hover-bg`, `action-active-bg`
     - line 260: the four refused stems
     - lines 280-281: the label list

## Findings outside the claims

**F1 — The pressed-faces frame shows a vertical group, not the face each host takes on its own.**
- Where: `app/browser/constants.ts:1024-1042` wraps each set in `btn-group-vertical`.
- What the frames show: `pressed-roles--light-1280.png` and `pressed-roles--dark-390.png` show squared inner corners and joined borders on every middle host.
- What the text claims: the TSDoc at `constants.ts:959-963` says "its frame is the held face of every role". The guide patch's § Tests paragraph says the light and dark pressed faces are "photographed through" this specimen.
- Why it matters: for `Light`, `Dark`, `Outline light`, and `Outline dark`, this is the only pressed frame. A held button on its own keeps all four rounded corners.
- Placement: these are Button states, but they sit in the Button group region. That region's copy (`constants.ts:889`) names neither the disabled forms nor the pressed faces. The Buttons copy (`constants.ts:19`) claims "every button … state".
- Fix: lay the pressed hosts out as separate buttons that don't join, for example two `d-flex flex-column align-items-start gap-2` columns inside the toolbar. Then extend `BUTTON_GROUP_COPY.paragraph` to name the disabled forms and the pressed role faces, or record why the Button group region carries them.
- Also: the added hosts lengthen the tab order the Button journey walks. The `BUTTON_GROUP_PAIR` remark (`constants.ts:908-911`) says that order is kept to what coverage needs.

**F2 — The disabled check sits beside the wrong comparator, and the prose describing the disabled specimen is wrong.**
- The `Disabled check` label is `btn-outline-primary` (`constants.ts:1021`), but the enabled host is `btn-primary`. `disabled-buttons--light-1280.png` shows a dimmed outline next to a filled enabled button, so the outline's own enabled treatment is not in the frame.
- The TSDoc at `constants.ts:952-957` says "behind one enabled host of the same variant". That is false for the check label.
- The TSDoc also says "Each form reaches a host no other form reaches". That is false too, because `.btn-check[disabled] + .btn` and `.btn-check:disabled + .btn` (`_button.scss:115-116`) both reach the one label. The section case's comment ("a host no other form paints") says the same false thing.
- The comment at `ButtonGroupSection.test.ts:292`, "none but the native one takes a tab stop", is wrong. The native disabled host takes no tab stop, and the enabled host is the only one.
- Fix:
  - Give the label `btn btn-primary`, which is Bootstrap's own toggle-button markup.
  - Say that the two check selectors share the label.
  - Rewrite the comment to "none but the enabled host takes a tab stop".

**F3 — The mode-token term drifts.**
- `tests/setup.ts:485-489` (the `MODE_TOKEN` TSDoc) and the guide patch's § Tests paragraph write "theme word".
- The established term is "mode token": the constant's own name, `setup.test.ts:91`, `setup.ts:450`, `guides/veneer.md:9370`, and `constants.ts:1478` and `1597`.
- Fix: write "mode token" in both places.

**F4 — One sentence in the guide patch is hard to read.**
- The sentence ends "…holds every role host beyond the filled primary and reads on it the face its pressed twin paints" (`fp-shared.patch`, § Tests hunk).
- Fix: "…holds every role host beyond the filled primary and asserts that its held face is the face its pressed twin paints."

**F5 — The same host population is defined in two places, and one idiom is hard to read.**
- The single-role Button population is written twice:
  - `constants.ts:1025-1034`: two regexes plus a `btn btn-link` exclusion.
  - `integration.test.ts:1380-1384`: one combined regex plus exclusions for the link and the filled primary.
- `constants.ts:1523` wraps the role list in an extra array only to name it inside `flatMap`.
- Fix: export one derived constant from `app/browser/constants.ts` holding the single-role Button class lists, and one holding the List group role words. Have the specimens and the case read those constants.

**F6 — The report and a test comment name rows by their position.**
- Report lines 116 and 277 say "the first row" and "the last row". `integration.test.ts:1660` says "the first role" and "the last".
- Those rows are the primary and dark roles. `AGENTS.md` § Writing forbids naming a list item by its position.
- Fix: name the rows by their roles.

## Attacked and held

- Adjacent behaviour that looks like a defect but is correct:
  - The outline hover frames show a filled face. `_button.scss:166-168` paints that face.
  - `Pressed outline <role>` matches `Pressed <role>`, because both mix the active state over the role base (`_button.scss:152-156` and `170-174`).
  - The light selected-row contrast (`list-group-role-selection--light-1280.png`) and the faint dark focus ring belong to the P4 and P2 rows, as the report states.
- The guide's passive class sections for Button group, List group, and Placeholder carry no region-content sentence, so the added specimens leave no prose there false.

## Referrals

- **R1 (objective lane).** `tests/setup.ts:449-451` and `guides/veneer.md:9369-9370` claim a mode token fails the typecheck. `CaptureStem` only lowercases the subject, so adding a `Light` subject would make `light-hover` typecheck, and only `setup.test.ts:91-99` refuses it. This text predates the unit, and the stopped row rests on it.
- **R2 (objective lane).** The grow-spinner case never calls `play()`. Its `resumed` assertion passes because `marker.replaceWith` reinserts the specimen and the CSS animation restarts. Name a mutation of the case that reddens that assertion, or rule it a proof that cannot fail.
- **R3 (objective lane).** Measure the fill delta between the pressed and resting dark role row at `dark-390` to settle claim 8.
- **R4 (objective lane).** The exit values the report gives for the format, lint, check, `test:setup`, app, and guides gates appear in no log. Only the capture logs close with `exit 0`. Also rule whether the `MODE_TOKEN` export is inside "the passive registry rows and their TSDoc".
- **R5 (Orchestrator).** The retained report still points to `tmp/units/` for the gate logs and the review evidence (lines 230-232 and 301-303), so the retention rewrite is incomplete. `guides/veneer.md:9232-9235` contains garbled sentence fragments that predate this unit.

VERDICT: FAIL 8, 9; outside the claims: F1, F2, F3, F4, F5, F6
