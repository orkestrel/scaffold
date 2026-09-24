# FOCUS-FRAME (`ff`) report, round 2

This report covers round 1 and round 2 of the unit and replaces the `ff-report.md` report. Round 2 closes each finding the audit verdict carried to this unit:

- **AUTO-OUTLINE-GUARD:** the skip-link and list-group focus cases read their `auto` outline from pixels, with a suppressed-outline control. The guard reddens on a scripted-focus drive at dark-1280.
- **Claim 3:** the ring-reach tables live in frozen setup constants, and the helper keeps only logic a proof row decides.
- **Claim 5:** in the converted grouped-alignment frame the pointer release guards nothing, so the pointer watcher moved to the accordion focus case, where deleting the release reddens it.
- **Claim 6:** the list-group row's pixel control and every drive row of the release reading are retained. They also correct the round-1 mechanism statement: a scripted focus alone that follows a pointer press leaves the `:focus-visible` pseudo-class unmatched.
- **Prose findings:** the guide patch restricts § Tests to the converted scenarios, and the prose findings are fixed.

The unit edited only its owned files and did not stop. The items for other owners are in § Scope, deviation state, and observations.

## Findings and the changes that close them

### AUTO-OUTLINE-GUARD: a pixel guard on the `auto` outline

- **Change.**
  - The skip-link case ("reveals the skip link under keyboard focus and photographs the revealed link with its outline") and the list-group case ("drives one list-group action to hover, focus, and press, and photographs each state") each shoot their padded wrapper through a guard portfolio as painted and with the outline suppressed inline.
  - Each shot is written under the `tmp/capture/guard/painted` directory or the `tmp/capture/guard/suppressed` directory.
  - The case reads the fraction of pixels that differ from the frame's floor, through the `measureVariation` function, in the strip the outline paints above the focused element. The `computeRingBand` helper in the `tests/setup.ts` module returns that strip.
  - The case asserts that the painted strip varies (the `outline.get('painted')` reading is greater than 0) and that the suppressed strip does not (the `outline.get('suppressed')` reading is 0). The suppressed frame is the negative control: it shows that the strip reads the surface alone where no outline paints.
  - Each case also asserts that the reach is greater than 0 ahead of the guard's reading.
- **Readings from the filtered capture runs** (the `outline` field of the `skip link` and `list-group action paint` readings in the `.orkestrel/veneer/units/ff-instruments/ff-final-2/dark-1280.txt` manifest and the `.orkestrel/veneer/units/ff-instruments/ff-final-2/light-390.txt` manifest):

  | Case | dark-1280 painted | dark-1280 suppressed | light-390 painted | light-390 suppressed |
  | --- | --- | --- | --- | --- |
  | skip link | 1 | 0 | 0.145 | 0 |
  | list-group row | 0.995 | 0 | 0.486 | 0 |

  The skip link wraps at 390 wide, so its strip spans the line's full width and only the link's part of it paints.
- **Red runs at dark-1280.** Each run changed the case's drive and restored it. The mutation log records the diff for each run.
  - Skip link, Tab replaced by a scripted `link.focus()` call: reddens the skip-link case at the `link.matches(':focus-visible')` assertion (`expected false to be true`).
  - Skip link, a scripted focus plus an `{ArrowRight}` key press: reddens the skip-link case at the `outline.get('painted')` assertion (`expected 0 to be greater than 0`).
  - List-group row, Tab replaced by a scripted `host.focus()` call: reddens the list-group case at the reach assertion ahead of the guard (`expected 0 to be greater than 0`), because the row paints no outline.
  - List-group row, a scripted focus plus an `{ArrowRight}` key press: reddens the list-group case at the `outline.get('painted')` assertion (`expected 0 to be greater than 0`).
  - Control removed: the suppressed state set the outline color instead of suppressing the outline. This reddens the skip-link case at the `outline.get('suppressed')` assertion (`expected 1 to be +0`), so the control's assertion distinguishes a painted strip from an unpainted one.

### Claim 3 (R2): the helper tables and the logic no row decided

- **Tables moved.** The `shadows` table, the `outlines` table, and the `worn` table moved out of the `tests/setup.test.ts` proof. Each is a frozen, exported constant in the `tests/setup.ts` module, with TSDoc and a row interface:
  - the `RING_SHADOW_CASES` constant, with the `RingShadowCase` interface;
  - the `RING_OUTLINE_CASES` constant, with the `RingOutlineCase` interface;
  - the `RING_WORN_CASES` constant, with the `RingWornCase` interface.

  The proofs iterate them and refuse an empty table.
- **Logic no row decided, removed.** The helper's parenthesis-aware split and its color-function stripping were each removed with the tables in place. `npm run test:setup` passed each removal with `Tests  304 passed (304)` (the `reach-plain-split` and `reach-no-strip` runs in the mutation log). No computed shadow carries a pixel length inside a color function, so no row can decide either one. The `computeRingReach` helper therefore splits at every comma and reads lengths directly. Its TSDoc states why a plain split holds: a layer's lengths and its `inset` keyword follow its color.
- **The split itself stays decided.** The inset-beside-outer row of the `RING_SHADOW_CASES` constant reads 2 only with the layers split. The `reach-no-split` mutation reddens the shadow proof.
- **Mutation results over the helpers** (the command is `npm run test:setup` throughout; the reddened cases are named exactly as the logs print them):

  | Mutation | Reddens |
  | --- | --- |
  | `reach-no-split` (the value read as one layer) | "reads a ring reach from the largest outer shadow layer, whatever color syntax precedes it" |
  | `reach-outline` (the outline dropped from the maximum) | "reads a ring reach from an outline as its width plus its offset, unless its style is none" and "reads the larger of a ring shadow and an outline worn together" |
  | `reach-inset` (the inset test replaced) | the shadow proof |
  | `reach-offset` (the offsets dropped) | the shadow proof |
  | `reach-outline-offset` (the outline offset dropped) | the outline proof |
  | `cropped-left` and `cropped-top` (the reach dropped from one edge) | "lists each edge a grown box crosses, in top, right, bottom, left order" |
  | `ring-band-inside` (the strip moved inside the box) | "returns the strip a ring paints above a box, outside the box and a reach tall" |

  The outline mutation reddens the outline proof and the worn-pair proof, because the worn-pair proof's outline row reads the outline too. The round-1 statement that each proof reddened on its own mutation alone was false for that mutation.

### Claim 5: the pointer release in the converted frame

- **Reading.** The converted grouped-alignment case (round-1 code, watcher in place) was run at dark-1280 with the `releasePointer` call deleted. It passed (`Tests  1 passed | 46 skipped (47)`), so the watcher read an empty list. The pointer probe, a copy of the journey under the `.orkestrel/veneer/units/ff-instruments/ff-probes-2` directory with the release deleted in every converted focus case, shows the reason. The parked pointer enters only the wrapper element (`DIV.p-3`) in that case: it rests in the wrapper's bottom padding.
- **Where the pointer lands on the specimen.** The same probe records the pointer entering the specimen, with the release deleted, in these cases:
  - the valid and invalid controls;
  - the floating field;
  - the list-group rows;
  - the accordion's leading button and body.
- **Change.**
  - The watcher moved to the accordion focus case, which records every element of its specimen the pointer enters while the frame is readied and shot.
  - The grouped-alignment case keeps its release, and its comment states that the release guards nothing in that frame at 1280 wide.
  - Deleting the accordion release at dark-1280 reddens the accordion case ("reaches a collapsed accordion button through the keyboard and lifts its ring over the items beside it"). The failure is `expected [ 'Delivery windows', …(2) ] to strictly equal []`.

### Claim 6: P2's readings, retained whole

The drive probe (`ff-drives-veneer.test.ts` and `ff-drives-release.test.ts` under the `.orkestrel/veneer/units/ff-instruments/ff-probes-2` directory) measured Veneer's cascade and the Bootstrap 5.3.8 stylesheet on their own documents. Each row shoots the padded wrapper through the frame manager as painted and with the outline suppressed inline, and counts the differing pixels. The `ff-out-R2-DRIVES-VENEER.json` output and the `ff-out-R2-DRIVES-RELEASE.json` output hold every row, and the computed outline reads `auto 1px 1px` in every row whose pseudo-class matched.

| Drive | Match | Release light skip | Release light row | Release dark skip | Release dark row | Veneer light skip | Veneer light row | Veneer dark skip | Veneer dark row |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Scripted focus, no press | matched | 768 | 5176 | 1160 | 7766 | 668 | 5164 | 1010 | 7748 |
| Tab, no press | matched | 768 | 5176 | 1160 | 7766 | 668 | 5164 | 1010 | 7748 |
| Press, scripted focus | unmatched | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Press, scripted focus, `{ArrowRight}` key | matched | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Press, Tab | matched | 768 | 5176 | 1160 | 7766 | 668 | 5164 | 1010 | 7748 |

The "Match" column records whether the `:focus-visible` pseudo-class matched.

- The ruling stands: Veneer and the release behave alike, so no SCSS partial changed.
- The row the round-1 report stated with a Shift press is the key-press row: the pseudo-class matches and no outline paints.
- A scripted focus with no key press leaves the pseudo-class unmatched. The UTIL-FRAMES link focus case uses the key-press row's drive (see § Scope, deviation state, and observations).

### Claim 8: law and report

- The case matrices live in setup constants (see Claim 3).
- This report follows each code token with a noun, and it states run measurements and quoted log lines as values rather than as tallies.
- Every gate's log is retained and named in § Gates.
- The positive-reach statements name the range thumb as the exception: its host reads a reach of 0.

### GUIDE-FOCUS-UNIVERSAL, F3, F4, and F5: the prose

- **GUIDE-FOCUS-UNIVERSAL.** The § Tests paragraph in the `ff-shared-2.patch` patch names the converted scenarios and describes the padded frame, the reach and crop reading, the release, the accordion watcher, the Tab drive, and the pixel guard for those scenarios alone. It ends: "The other focus scenarios keep the placement and the drive their journey case states."
- **F3.** Every added comment names the `:focus-visible` pseudo-class and the `readRing` function with their nouns, and so does the patch.
- **F4.** The § Form check classes paragraph and the § Input group classes paragraph are reflowed to the 100-column width.
- **F5.** The `computeRingReach` TSDoc states that the frames "differed at most 2 CSS pixels past the link's box".

## Round-1 findings, standing

### P3: the checked label and the hover face

- **The Column center fill.**
  - Cause: the resting cascade case cloned the Vertical group specimen with its radios named `column-alignment`. Inserting the copy's checked radio unchecked the specimen's own, so the light pass left the specimen unchecked for the dark pass to copy.
  - Probe reading (the `ff-out-P3-RADIO-*.json` outputs under the `.orkestrel/veneer/units/ff-instruments/ff-probes` directory): the specimen's radio read `checked: false` with its named copy lifted and removed. With the copy's radio names removed, the specimen's radio read `checked: true`.
  - Fix: each radio in a copy drops its `name` attribute. The `switched` list asserts that every copy and its specimen check the same controls.
  - Proof: `expected [ 'light-1280|vertical-group' ] to strictly equal []` on the defect, and a pass with the fix.
- **The Row copy hover face.**
  - Cause: the case's own mode switch left the pointer at the Dark mode control, and the page frame's staging moved Row copy under it.
  - Proof on the page-frame form: `["Row copy"]` with the pointer left, and a pass with it released.
  - The lifted grouped-alignment frame holds no Row copy button. The watcher lives in the accordion case (see Claim 5).

### P1: the converted scenarios

Each converted scenario is an element frame of its specimen, lifted into a wrapper carrying the `p-3` class (16 CSS pixels measured) and the `tabindex="-1"` attribute. Each case reaches focus with Tab and asserts that the ring reach is positive, except for the range thumb, and that no ring or region edge is cropped.

- The "Frame at `e4a6d7c`" column is read from the `.orkestrel/veneer/units/ff-instruments/ff-baseline/dark-1280.txt` manifest.
- The frame columns for this tree are read from the round-1 capture manifests under the `.orkestrel/veneer/units/ff-instruments/ff-final` directory. Round 2 changed no frame geometry.
- Reach is in CSS pixels.

| Scenario | Frame at `e4a6d7c`, dark-1280 | Frame in this tree, dark-1280 | Frame in this tree, light-390 | Region | Reach |
| --- | --- | --- | --- | --- | --- |
| `primary-focus` frame | 1280×800 page frame, region at x 0 | 1280×67 | 390×67 | host | 3 |
| `valid-control-focus` frame | 1280×800 page frame, region at x 0 | 1280×91 | 390×91 | control | 3 |
| `invalid-control-focus` frame | 1280×800 page frame, region at x 0 | 1280×91 | 390×91 | control | 3 |
| `check-group-focus` frame | 1280×800 page frame | 1280×67 | 390×67 | checked label | 3 |
| `range-focus` frame | 1280×800 page frame, region at x 0 | 1280×62 | 390×62 | specimen | 0 on the host; the ring sits on the thumb |
| `form-floating-empty-focus` frame | 1280×800 page frame, region at x 0 | 1280×90 | 390×90 | field | 3 |
| `form-select-base-focus` frame | 1280×800 page frame, region at x 0 | 1280×70 | 390×70 | select | 3 |
| `form-control-text-focus` frame | 1280×800 page frame, region at x 0 | 1280×70 | 390×70 | control | 3 |
| `close-control-focus` frame | 1280×800 page frame, region at x 0 | 1280×56 | 390×56 | control | 4 |
| `form-check-box-focus` frame | 1280×800 page frame, region at x 0 | 1280×58 | 390×58 | row; ring read on the box | 3 |
| `input-group-button-focus` frame | 1280×800 page frame, region at x 0 | 1280×70 | 390×70 | specimen; ring read on the control | 3 |
| `nav-base-focus` frame | 1280×800 page frame, region at x 0 | 1280×69 | 390×106 | link | 4 |
| `accordion-base-focus` frame | 1280×800 page frame, region at x 0 | 1280×245 | 390×287 | specimen; ring read on the button | 4 |
| `skip-link-focus` frame | 1280×800 page frame | 1280×53 | 390×74 | link | 2 |
| `navbar-collapsed-focus` frame | 1280×1803 page frame | 1280×88 | 390×88 | toggler | 4 |
| `default-focus-ring-focus` frame | 1280×800 page frame, region at x 0 | 1280×53 | 390×53 | link | 3 |
| `focus-ring-roles-focus` frame | 1280×800 page frame | 1280×53 | 390×164 | danger link | 3 |
| `list-group-actions-focus` frame | 1280×115 unpadded element frame, region at x 0 | 1280×147 | 390×147 | row | 2 |

- Replacing the text-control case's wrapper with its specimen reddens the case with `expected [ 'top', 'right', 'bottom', 'left' ] to strictly equal []`. That run is in the `ff-mutations.log.txt` log.
- The range thumb's ring shows in its frame. Chromium withholds the thumb's computed style, so the frame is that ring's only evidence.

### P2: the dark indicators

- **Valid and invalid controls: Veneer matches the release.** Veneer paints the release's 25% role-triplet ring at the width the `--vn-focus-width` token sets, 3px against the release's 4px, which the guide records as `tokenized`. In dark mode the ring reads a contrast ratio of 1.282 (valid) and 1.112 (invalid) in Veneer, and 1.312 and 1.248 in the release. The frames in this tree show each ring whole. No fix.
- **Skip link and list-group row: the computed paint matches the release's.** The drive caused the missing outline, as the Claim 6 table shows. Tab restores the outline in the skip-link case and the list-group case, and the pixel guard holds it.

## Gates

Every command ran in the `/home/user/veneer-ff` directory. The `PATH` variable carried the npm 11 entry, and the `PLAYWRIGHT_BROWSERS_PATH` variable was set to `/opt/pw-browsers` for the journey runs. Each log is retained under the `tmp/units` directory.

| Command, exactly as run | Exit | Result line | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check tests/app/browser/integration.test.ts tests/setup.ts tests/setup.test.ts` | 0 | `All matched files use the correct format.` | the `ff-2-gate-format.log.txt` log |
| `npm run lint:check` | 0 | the log prints the command and no diagnostic | the `ff-2-gate-lint.log.txt` log |
| `npm run check` | 0 | the log prints each typecheck command and no diagnostic | the `ff-2-gate-check.log.txt` log |
| `npm run test:setup` | 0 | `Tests  305 passed (305)` | the `ff-2-gate-setup.log.txt` log |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280*" -t "reveals the skip link\|drives one list-group action\|collapsed accordion button\|checked label of the grouped alignment control when"` | 0 | `Tests  4 passed \| 43 skipped (47)` | the `ff-capture-r2-filtered-dark-1280.log.txt` log |
| the same command with the `--project "journey:light-390*"` argument | 0 | `Tests  4 passed \| 43 skipped (47)` | the `ff-capture-r2-filtered-light-390.log.txt` log |
| `npm run test:guides`, in a scratch copy under the `tmp/probe` directory with the `ff-shared-2.patch` patch applied | 0 | `Tests  19 passed (19)` | the `ff-2-gate-guides.log.txt` log |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md`, in the same scratch copy | 0 | `All matched files use the correct format.` | the `ff-2-gate-guide-format.log.txt` log |

- The pipe characters in the `-t` pattern are escaped in the table. The command ran with plain `|` characters.
- The round-1 gate logs are the `ff-gate-format.log.txt`, `ff-gate-lint.log.txt`, `ff-gate-check.log.txt`, `ff-gate-setup.log.txt`, and `ff-guides.log.txt` logs, beside the round-1 capture logs.
- Round 2 changed these journey cases, and the filtered capture runs select them:
  - "reveals the skip link under keyboard focus and photographs the revealed link with its outline"
  - "drives one list-group action to hover, focus, and press, and photographs each state"
  - "reaches a collapsed accordion button through the keyboard and lifts its ring over the items beside it"
  - "rings the checked label of the grouped alignment control when Tab reaches it"
- Round 2 changed only comments in the other converted cases.
- The unfiltered capture variants are the Orchestrator's at landing.

## Artifacts

- The mutation log is the `.orkestrel/veneer/units/ff-instruments/ff-mutations-2.log.txt` file. Each entry records:
  - the site and the mutation, or for a journey run the unified diff (the `ff-mut2-*-dark-1280.diff.txt` files);
  - the command, the exit status, and the result line;
  - every case the mutation reddened, the assertion, and the log path.

  Line numbers in the journey entries refer to the mutated file. The round-1 log, the `ff-mutations.log.txt` file, stands for the round-1 runs.
- The shared patch is the `.orkestrel/veneer/units/ff-shared-2.patch` file. It is written against `e4a6d7c`, touches the `guides/veneer.md` guide alone, and replaces the `ff-shared.patch` patch whole.
- The diff and status are the `.orkestrel/veneer/units/ff-2.diff` file (round 1 and round 2 against `e4a6d7c`) and the `.orkestrel/veneer/units/ff-2-status.txt` file. The status lists the `tests/app/browser/integration.test.ts` file, the `tests/setup.ts` file, and the `tests/setup.test.ts` file as modified, and nothing else.
- The frames from the round-2 filtered runs, with their manifests, are under the `.orkestrel/veneer/units/ff-instruments/ff-final-2` directory, and the guard frames are under its `guard` directory. The round-1 frames are under the `ff-baseline` directory and the `ff-final` directory.
- The round-2 probes and their outputs are under the `.orkestrel/veneer/units/ff-instruments/ff-probes-2` directory: the drive probe and the pointer probe. The `tmp/probe` directory is deleted.

## Scope, deviation state, and observations

- **Scope.** The unit edited only its owned files and did not stop.
- **Name for the moved watcher.** The accordion case names its padded wrapper `wrapper`, because the case uses `lifted` for its z-index reading. The name split across cases is F2, which FRAME-HELPERS carries.
- **Report-only items:**
  - The pixel-guard block repeats in the skip-link case and the list-group case. The F1 helper that FRAME-HELPERS carries in the `tests/setupBrowser.ts` file would hold that block beside the lift block.
  - The structural box type the `computeCroppedEdges` helper and the `computeRingBand` helper use would name the `FrameRegion` interface if that interface lived in the `tests/setup.ts` module (R3, FRAME-HELPERS).
  - The UTIL-FRAMES link focus case reaches focus with a scripted `link.focus()` call and an `{ArrowRight}` key press. That drive is the Claim 6 table's key-press row: the pseudo-class matches and no outline paints, so that unit's dark frames show none. Tab from a wrapper paints the outline.
  - The `dropdown-menu-focus` scenario and the `captioned-carousel-focus` scenario keep their placements and drives (R5, FRAME-HELPERS).
