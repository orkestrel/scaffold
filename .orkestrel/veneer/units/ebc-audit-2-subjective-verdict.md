**Lane:** subjective (design fit, the truth of titles and prose, naming, voice), held by `reviewer` on Opus 5.5. This engine wrote round 3, so I attacked round 3's work harder. Round 4 was written by `builder` on Sonnet.

**Dispatch note:** I could not run anything in this lane. Every verdict rests on the retained logs, the instruments, `/home/user/scaffold/.orkestrel/veneer/units/ebc-4.diff`, `/home/user/scaffold/.orkestrel/veneer/units/ebc-4-status.txt`, and the `/home/user/veneer-ebc` worktree, read as they are.

## Per-claim verdicts

**1. Kills — CONFIRMED.**
- **Kills:** `ebc-instruments/r3/logs/ebc-3-mutations-final.log.txt:1-52` marks every case in the report's mutation table as `KILL`, each with an `AssertionError`.
- **Each kill tells the mutation apart from the passing case** (each named mutation is killed, and the log shows why):
  - `class`: the "Emptied control" readings flip from the surface to the browser's values (`ebc-3-mutation-class-final.log.txt:573-605`).
  - `target`: the mixin case's longhands go from `[]` to the full list (`ebc-3-mutation-target-final.log.txt:505-508`).
  - `spacing`: the mixin case expects `letter-spacing`, and the `.btn` case gains `letter-spacing` between the paired forms (`ebc-3-mutation-spacing-final.log.txt:507`, `:536`, `:547`).
  - `nav`: `:where(button.nav-link)` goes missing, and the nav link reads radius 6, the surface's font family, and the retuned shadow (`ebc-3-mutation-nav-final.log.txt:473`, `:495-502`).
  - `important`: a list of four important longhands against `[]` (final log, line 17).
  - `no-surface`: `400` against `700`, and `1px`/`6px` against `6px`/`12px` (final log, lines 46 and 50).
- **Restores:** every restore line reads byte-identical, with digest `94711449…` for `_button.scss` and `f5b49541…` for `_nav.scss`. Round 4 restores the same `_button.scss` digest (`ebc-instruments/r4/ebc-4-mutation-state-spacing.log.txt:4`).
- **Caveat:** these `.btn` kills were read on the round-2 form of the case. See Referral R1.

**2. Reduced motion — CONFIRMED.**
- **Order:** `ebc-instruments/r3/probe/revert-3.mjs:82-84` calls `emulateMedia` before `setContent`. The log reads `rest reduced: true / true` for every form (`ebc-3-probe-revert.log.txt:58-66`).
- **What differs:** only values the class writes. These are colour serializations, `outline-color` following `color`, the focus shadow written in another notation, and the dropdown weight from `_dropdown.scss:239` `font-weight: var(--vn-weight-body)` (log lines 6-53).
- **Probe control:** if reduced motion were turned on after the first reading, `rest reduced` would read `false`, so the log tells the two orders apart. The difference list is not blind, because it does report the class-written differences.

**3. `.btn` in every state — CONFIRMED.**
- **States read:** `tests/src/styles/elements/button.test.ts:197-278` reads every form at rest, and each enabled form hovered, pressed, and keyboard-focused. Disabled is read at rest, and checked in every state.
- **Exact admission:** `toEqual` holds the focused state to exactly `['appearance', 'outline-offset']` (`tests/setupStyles.ts` `BUTTON_FORM_DIFFERENCES`).
- **Browser probe:** the `none` row reads button `0px` and link `1px` (`ebc-3-probe-btn-focus.log.txt:4`).
- **Kill:** `state-spacing` kills the shipped case by its title with an `AssertionError` (`r4/ebc-4-mutation-state-spacing.log.txt:3`). The same patch's full run shows `letter-spacing` added to the hovered and pressed readings of all six enabled forms (`ebc-3-mutation-state-spacing-item3-patch.log.txt:547-699`), so the case tells that mutation apart.
- **Title:** the title is true of what the case reads.

**4. Tailwind anchor — CONFIRMED.**
- **Anchor:** `tests/service/tailwind/consumer.test.ts:320-325` anchors the plain button to `6px`/`12px`/`700` and a shadow other than `none`.
- **Kill:** `no-surface` gives `{ top: '1px', left: '6px' }` against `{ top: '6px', left: '12px' }` (final log, line 50), so the anchor tells the mutation apart.
- **Fixture:** `tests/fixtures/tailwind/markup.html` is absent from `ebc-4-status.txt`, so it matches `e07b3a6`.

**5. Term — CONFIRMED.**
- **Sweep:** `ebc-3-bare-sweep.log.txt` has no remaining hit that names the button surface on the tag. The two hits naming the `.btn` class alone are `_button.scss:135` and `components/button.test.ts:199`. The rest name other things: a bare anchor (`tests/setupStyles.ts:3018`), Button hosts that render bare (`tests/setup.ts:2933`), panels, imports, and tags.
- **My own search:** I searched `/home/user/veneer-ebc` (excluding `node_modules`, `dist`, `tmp`, and `.git`) for `BARE` (case-sensitive) and for `bare[- ](button|veil|specimen|treatment|fill)|bare `button`|bare hover` (case-insensitive).
  - Inside `src/`, `tests/`, `app/`, and `guides/`: no `BARE` constant and no button-surface sense.
  - Outside that scope: the historical unit name `BARE-BUTTON` at `ROADMAP.md:297`.
- **Round 4:** its hunks (`ebc-4.diff:770-811`, `:1176-1278`) add no `bare`.

**6. Titles, comments, and names — CONFIRMED.**
- **Tag proof title:** `elements/button.test.ts:84` states the utility exception that lines 143-164 assert as `{ ...values, ...written }`.
- **Reboot comment:** `_button.scss:4-5` names exactly the three declarations at lines 7-9.
- **Rename:** `BUTTON_KEPT_LONGHANDS` appears at `tests/setupStyles.ts:3216`, `tests/setupStyles.test.ts:373`, and `tests/src/styles/mixins.test.ts:22`, `:207-219`. Nothing in the tree names `BUTTON_REBOOT_LONGHANDS`.
- **Badge comment:** `BadgeSection.test.ts:55-57` matches `ebc-3-probe-badge.log.txt:2`: `btn` alone reads `oklch(0.208 0.042 265.755)`, `colorIsBodyText: true`, and background `rgba(0, 0, 0, 0)`.

**7. Scope and law — BROKEN, on the title clause.**
- **What holds:**
  - Scope: `ebc-3-status.txt` equals `ebc-4-status.txt`. The hunk headers of `ebc-3.diff` and `ebc-4.diff` differ only in `tests/setupStyles.ts` and `tests/src/styles/elements/button.test.ts`, which are the patch's two files.
  - Code law: the only `as` is `as const`, which `typescript.md:29` permits. The diff has no nested function declarations and no hidden helper.
- **What breaks:** the diff changes two cases whose titles no longer state what they prove.
  - `tests/src/styles/components/accordion.test.ts:42` says "…and the dark icon rule, and no other rule on the accordion classes". The case now also admits `:where(button.accordion-button)` (`ebc-4.diff:880-885`).
  - `tests/src/styles/components/carousel.test.ts:44` says "…and no other rule on their classes". The case now admits `:where(button.carousel-control-prev, button.carousel-control-next)` and `:where(.carousel-indicators [data-bs-target])` (`ebc-4.diff:931-937`).
- **Why it matters:** these are not recorded selectors. The guide's § Outside the ledger says the ledger measures none of them (`ebc-4.diff:206-212`). Only the comments above the titles were updated. This is the same defect class as round 1's claim 11.
- **My reading of the claim:** I read "added or changed case title" as the title of any case the diff adds or changes. Under the strictest reading (title text only), this becomes a finding outside the claims, and the round still fails.
- **Smallest fix:** retitle both cases to name the button reboot. For example: `writes the recorded accordion selectors, the dark icon rule, and the button reboot on the header's button form, and no other rule on the accordion classes`, and the matching form for the carousel.

## Findings outside the claims

**F1 — the tag proof's holder comment misstates what a button the surface misses reads.**
- **Where:** `tests/src/styles/elements/button.test.ts:85-86` says "a button the surface misses reads the release's reboot instead, which differs from the surface in both."
- **Why it is false:** rounds 1 and 2 removed the release's inherited type and square corners from the reboot `button` rule (`_button.scss:6-10`). A button the surface misses therefore reads the browser's own type, not the release's reboot.
- **Failing input:** the `class` mutation's "Emptied control" reads `font-family: Arial`, `font-size: 13.3333px`, and `line-height: normal` (`ebc-3-mutation-class-final.log.txt:590-592`, `:627-630`). The holder is `600 19px/29px serif`, and the release's reboot would inherit that.
- **Contrast:** a button that does carry the release's reboot reads `serif`/`29` (`ebc-3-mutation-nav-final.log.txt:495-497`).
- **Why it matters:** this is the class of false-comment defect the last round accepted as its F1.
- **Fix:** use the wording round 3 already gave the Tailwind twin at `consumer.test.ts:308-310`: "reads the release's reboot and the browser's own values instead, which differ from the surface in the weight and the shadow."

## Attacked and held

- **The `outline-offset` admission is by name, not by value.** A surface leak of `outline-offset` onto `.btn` under focus would stay green, because the pair still differs in that longhand. The leak is unreachable in paint, since `outline-style` reads `none` on both `.btn` forms (`ebc-3-probe-btn-focus.log.txt:1-3`). The mixin case pins the surface's longhand set. It is not a defect. Asserting the values `0px` and `1px` would close it if the Orchestrator wants that.
- **`components/button.test.ts:199` reads `BUTTON_SURFACE_VALUES.step` for the `.btn` class.** This holds: the step belongs to the veil, which the guide says the `button` rule and the `.btn` class share.
- **The carousel indicator reboot is a structural selector.** It is the release's own component selector, the design verdict names it, and it breaks no Veneer tenet.

## Referrals (objective lane)

- **R1:** the `important` and `spacing` kills of the `.btn` forms case were measured on the round-2 case, which round 4 replaced. The killed title is "…apart from the button appearance" (`ebc-3-mutations-final.log.txt:20`, `:28`). No retained run shows those mutations against the shipped case.
- **R2:** round 4 kept only the kills tail of its `state-spacing` run (`r4/ebc-4-mutation-state-spacing.log.txt`), not the whole run that round 3's item 1 required. The distinguishing diff exists only in the round-3 pre-apply log.

VERDICT: FAIL 7; outside the claims: F1