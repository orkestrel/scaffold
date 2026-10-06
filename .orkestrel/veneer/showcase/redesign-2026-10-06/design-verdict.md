# Showcase redesign verdict (S-R1)

Ruled on 2026-10-06 by the cloud session over the design round of the same date, read at veneer `9fb2be1`. The round's inputs sit beside this file: `scout.json` (the read-only reconnaissance), `proposals.json` (three blind planner proposals), `judge.json` (scores, synthesis, grafts, refutations, units), and `critic.json` (gaps, unverified claims, breaches). The user's words that govern the round: "it should still be comprehensive as it is but a better design and with each thing isolated and especially improve the sidebar since on mobile the full thing shows and is not gracefully collapsed and expanded", and the review loop "with you regenerating and pushing the showcase to origin main for me to review".

## 1. The round

| Planner | Lens | Contracts | Mobile | Isolation | Effort | Risk | Total | Hours |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `offcanvas-lg` drawer opened from a header link | 4 | 4 | 2 | 3 | 2 | 15 | 9 |
| 2 | sticky `details` bar, section frames, paint isolation | 3 | 3 | 5 | 1 | 2 | 14 | 18 |
| 3 | in-flow `details` with section rules | 5 | 2 | 3 | 4 | 4 | 18 | 8 |

The judge takes proposal 3 as the base and grafts proposal 1's overlay panel and proposal 2's paint isolation. The critic finds seven gaps, five unverified claims, and one breach. The rulings that follow adopt the synthesis with nine amendments.

## 2. Rulings

1. **Base.** The synthesis stands: one document, 72 sections, native disclosure semantics, an overlay drawer under the `lg` breakpoint, section and chapter rules, paint isolation, one test seam for every Contents click, a landing that compares against a predicted set of journey differences.
2. **Toggle element (critic breach 1).** The toggle is a `details.d-lg-none.ms-auto > summary.btn.btn-sm.btn-outline-secondary.text-body-emphasis[aria-controls="contents-panel"]` reading `Contents`, placed in the header controls after the Color mode group. The `details` element's `open` attribute is the single source of the drawer's state. The five-button contract is amended: the header holds exactly five `button` elements, and under `lg` its accessibility tree exposes a sixth control of role `button`, the disclosure, reading `collapsed` or `expanded`. J2's path at 390 and the banner's focus listing carry it. A sixth `button` element is refused because `#select` would have to learn to skip it; a link is refused because Space does not activate a link and a link that does not navigate misstates its role.
3. **Graceful fold (critic gap 3).** The drawer opens and folds with Bootstrap's own transition classes and no engine: open adds `showing` and swaps to `show` when the panel's `transform` transition ends; fold adds `hiding` and removes `show` and `hiding` when the transition ends. A computed `transition-duration` of 0 s (reduced motion, or the panel from `lg`) completes the swap in the same task. A route that fires while a transition runs cancels the pending completion; `transitioncancel` completes it. The fold routes are the synthesis's five: a panel link pick with its hash navigation left to run, Escape with focus returned to the summary, `focusout` to an element outside the panel and the details, a document click outside both, and `#offset` reading the panel's position as not `fixed`. No trap, no `role="dialog"`, no `aria-modal`, no backdrop, no scroll lock.
4. **Paint isolation (critic gap 2).** `z-0` goes on every specimen card body in which a descendant resolves a z-index of 3 or more at rest, unless the card body holds an element that leaves the card's box when shown or at rest: a live dropdown, a live modal or offcanvas, a toast container, or any descendant with computed `position: fixed`. The set is derived from the mounted page, not from a reading of the sources. The hit-order case proves the header over every isolated layer at 390 and 1280, the shown live toast hit-testing to itself, and the frozen tooltip taking the hit when its card body loses `z-0`.
5. **Rhythm.** Every section except its group's last gains `pb-4 border-bottom` in `createShell`'s members map; `createSection` and the 8 px landing stay. Every group `h2` adds `border-primary`, so a chapter rule reads stronger than a section rule. Proposal 2's heading rows, anchor chips, caption chips, and table heads wait for the first visual check (§ 7).
6. **The 768 px row (critic unverified 3).** The U2 lane measures the header at 768 × 1024 under the three faces with the summary rendered. Where the header exceeds one 48 px row under any face, the version span gains `d-md-none d-lg-inline`; where it does not, the span stays and the reading is recorded. No estimate lands.
7. **Current-section marker.** Deferred. As specified it rewrites the class list of links carrying the shared name `py-1` from an asynchronous observer, so the partition's `signature coverage` row would depend on timing. A later round can mark the current link through `aria-current` alone.
8. **Native group (critic gaps 4 and 5).** Nothing of the Native group lands in this round. B4 lands the slot `{ id: 'native', title: 'Native surfaces' }` between `interactions` and `tailwindcss`, never empty, with the census `LIVE_GROUP` as a set holding `interactions` and `native`, the `#interactions` pointer-events exemption widened in the same landing, pair rows (`row row-cols-1 row-cols-xl-2 g-4` holding a `Default` and an `Opt-in` figure with caption badges and variant-named openers), the group's own tables, and a nested `createVeneer` scope over the group as the opt-in route composed at both boot sites (`app/browser/main.ts` and `startJourneyVeneer`). The B3 fence question (the showcase loads no page stylesheet; the native modal needs its fence) is an open ruling for B3's opening, recorded in § 8.
9. **Landing set (critic gap 1).** The predicted-difference set gains the partition rows and lines, the component preservation line beyond its `excluded` field, and the banner focus listing. § 6 lists the whole set.

## 3. The design

**Shell** (`app/browser/factories.ts`, `createShell`). The body row reads `row gx-5`, so the main column keeps its width at 390, 768, and 1280 and the empty Contents column adds no vertical gutter under `lg`. The Contents region is `section#contents.col-lg-3[aria-label="Contents"]`, holding one `div#contents-panel.offcanvas-lg.offcanvas-start.sticky-lg-top.vh-100.overflow-y-auto.px-4.px-lg-0.py-3` that wraps the single `createContents` nav. The flowing copy and the `d-none d-lg-block` wrapper are gone. The panel is the chrome's only `.sticky-lg-top` element, so `#offset` writes the same two inline properties: under `lg` they put the fixed drawer's top at the header's bottom and stop it at the viewport bottom; from `lg` they bound the sticky sidebar. `createContents` renders `row row-cols-2 row-cols-lg-1 g-3 gx-lg-0`.

**Header.** The controls wrapper gains the `details` disclosure of ruling 2 after the Color mode group and before the status sentence. The summary carries the choices' look: `text-body-emphasis` folded, `active` open. From `lg` the `details` does not render and is no tab stop.

**Drawer** (`app/browser/Showcase.ts`). Bootstrap's `.offcanvas-lg` rules in the built sheet supply the geometry: under `lg` the panel is fixed, hidden, and translated off the start edge; `showing`, `show`, and `hiding` make it visible; `show` without `hiding` and `showing` clear the transform; reduced motion removes the transition. The class protocol and the routes are ruling 3's. Opening leaves focus on the summary; the panel follows the header in DOM order, so Tab reaches `Containers`. Every listener carries the mount's signal.

**Paint isolation** (`app/browser/sections/*.html`). Ruling 4's rule, derived from the mounted page. The frozen tooltips and popovers (`z-index` 1080 and 1070 with no stacking ancestor) are the reason: they paint over the 1045 drawer and over the `z-3` header.

**Rhythm.** Ruling 5.

## 4. Contracts

Kept from the brief: 72 sections in one document under `h2#group-ID` in `main > div`; exactly five `header button` elements with labels, values, and `aria-pressed`; two group names; the status sentence; the sticky header at or under 30 % of the viewport height; groups on one row from 768; the Contents region with exactly one rendered nav holding the uppercase group labels; every link reachable at 390 (after the open step) and 1280; the panel's `top` and `max-height` as the only inline style at rest; registry-only class tokens plus `slide`, the 16 icon names, and `TAILWIND_CLASSES`; no engine and no `role="dialog"` on the chrome; the `collapse` class absent; main column widths at 1280 and 390; section titles, captions, specimen names, icon names, and the `@app/browser` export list.

Amended: the Tab order under `lg` reads skip link, five buttons, `Contents`, then the first Contents link when the drawer is open; the banner's role listing exposes six button-role controls under `lg`.

## 5. Units

| Unit | Engine | Checkout | Owns | Hours |
| --- | --- | --- | --- | --- |
| U1 paint isolation | astra (Codex) | `/home/user/.wave/veneer-isolation` at `9fb2be1` | `app/browser/sections/*.html` (class additions on card bodies only); `tests/app/browser/Showcase.test.ts` (one added case) | 3 |
| U2 shell and drawer | opus | `/home/user/.wave/veneer-redesign` at `9fb2be1` | `app/browser/factories.ts`; `app/browser/Showcase.ts`; `tests/app/browser/factories.test.ts` | 3.5 |
| U3 journey rewiring | astra (Codex) | `veneer-redesign` after U1 and U2 | `tests/setupBrowser.ts` (showcase section); `tests/setupBrowser.test.ts`; `tests/app/browser/integration.test.ts`; `tests/app/browser/Showcase.test.ts` | 5 |
| U4 guide and records | opus | a prose worktree after U2 | `guides/veneer.md` § Showcase; `ROADMAP.md` | 1.5 |
| U5 land and deliver | the session | `/home/user/veneer` | `showcase/browser.html`; commits; pushes; the Artifact | 2.5 |

U1 and U2 run in parallel on disjoint files; U1's commit is cherry-picked into `veneer-redesign` before U3 starts. U3 and U4 run in parallel after U2; U4 cites the two case titles fixed in the briefs: `keeps every specimen layer under the sticky header at narrow and wide viewports` (U1) and `folds the contents into a drawer under the lg breakpoint and opens it from the Contents disclosure` (U3). The briefs sit under `briefs/` beside this file.

## 6. Landing

U5 runs, inside the host queue: the gates (`format:check`, `lint:check`, `check`, `test:app:browser`, `test:setup:browser`, `test:policy`, `test:guides`, the full journey with `CAPTURE=0`); a candidate journey compared against the three baselines `task75-u3-journey-1`, `task75-u3-journey-2`, and `landing-7853d17-2-journey` (no journey evidence moved between `7853d17` and `9fb2be1`: those commits touch comments, timeouts, a `src:browser` case, the guide, and the roadmap); `CAPTURE=1` once, with one read of `arrival`, `contents-drawer`, `contents-index`, `group-rhythm`, `tooltips`, and `popovers` at 390 and 1280; `npm run build`, then `npm run build:showcase` twice with equal hashes.

The compare exits 67 by design. The landing accepts a difference only in this set, and refuses any other. The set names a reading wherever the evidence carries it: a `Resolved values` row (the compare strips the variant prefix from a row), a gated stdout line, and the Journal copy of that line with its `info:` prefix all count as the same reading (amended 2026-10-06 at the landing, where the literal reading of the first draft left 246 journal copies and prefix-stripped rows outside the set; `landing/classify-compare.ts` beside this file is the classifier):

- the `signature coverage` rows and the `partition:` rows at light-1280 and light-390, and the gated `Partition population` and `Partition` lines (every element that gains a shared name moves the counts: `z-0`, `pb-4`, `px-4`, `ms-auto`);
- the `Component preservation` summary wherever it appears: the gated line, its journal copy, and the `STATE component preservation` rows per state, width, and color mode (`card-body` signatures split by `z-0`; the `excluded` population falls by 99 per state because the second navigation copy is gone); the `Row order` flag of `dark-390`, which hosts those rows, follows from their values alone;
- the `Partition control` counts of the unexcluded face (3107 to 3109 at 1280 and 3111 at 390: the panel's `py-3` and `px-4` join the shared-name population; the tuned face keeps zero violations);
- the J1 and J2 Journal entries at 390 (the open step; `Contents` in the path);
- J3's `minimum heading margin` in every variant (the rules lengthen sections);
- the banner and Contents trees in `tmp/journey/VARIANT.txt`, and the `Focus order of the banner` section at 390;
- the states count, 77.

A contrast, engine, Tailwind-reading, `390 header`, or `Header statechart` difference refuses the landing. The page commits with the unit, the branch pushes, then `main` by refspec; the committed bytes publish as a private Artifact for the user's review, with the file sent directly as the backup.

## 7. Deferred to the first visual check

Put to the user with the first landed page, as a menu:

1. the per-section frames of proposal 2 (heading row with an anchor chip and a rule), against the rules of ruling 5;
2. caption chips and table heads (`thead.small`, `tbody.table-group-divider`);
3. the current-section marker through `aria-current`;
4. a scroll lock while the drawer is open (needs an inline style on `body`, which moves the inline-style contract).

## 8. Open rulings carried to stage B

- **B3 fence.** `browser-stage-b-verdict.md` rules that the stylesheet fences never enter the showcase, and the showcase forbids a page stylesheet; the native modal demo needs its fence. The user rules at B3's opening whether and where the showcase loads a fence.
- **Native route.** Ruling 8's nested `createVeneer` scope is the recommended route for B4; the user confirms it at B4's opening.

## 9. Corrections to the brief

- Seven Contents click sites in `tests/setupBrowser.ts`, not four: the arrangers at :3831, :4110, :4489, :4509, :4718, :5202, and :5796.
- The default viewport of the `app:browser` and `setup:browser` suites is 414 px, under `lg`, so the contrast case, the offset case, and the population reading need the open step.
- The checkout is `9fb2be1`, not `ab7a8e7`.
- The 768 px header row has little slack; ruling 6 measures it.
