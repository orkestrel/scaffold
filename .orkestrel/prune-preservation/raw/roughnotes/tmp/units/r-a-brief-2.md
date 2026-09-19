# Unit R-A-2 — successor to `tmp/units/r-a-brief.md`

Read `tmp/units/r-a-brief.md` first and in full; it stays unedited, and every section of it binds
here except where this file changes it. **What changed and why:** R-A landed (`tmp/units/r-a-report.md`,
checkpoint `86a9ef6`); its audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/r-a-audit-verdict.md`,
lane reports beside it, reproductions under `r-a-audit-reproduction/`) found that the compact-menu
exception's stated reason is false, that the naming rule is not one rule, that the empty-catalog
states carry a bare `Contact` on two controls, that the census infrastructure sits in the test file,
that `buildName` has no mirrored case, that the guide overstates, that the hide gate misses a
navigation during the opening animation and a same-view navigation, and that the applied guide
patch left one unwrapped line. Read the verdict's Findings carried table before anything else: it
names each finding's reproduction and the prescription this unit adopts.

## The items to land

1. **The true reason (verdict row 2).** Replace the reason in `app/browser/App.vue` (the comment
   beside the menu action's `aria-label`, around `:53-55`) and in `guides/README.md` (the sentence
   "because the compact masthead keeps its own action beside the open menu") with the true one: the
   journey layer's reachability reading counts a control the open dialog covers, so the name is
   split to keep resolution unambiguous until the layer models the modal. Keep the `Menu` suffix.
2. **One naming rule (rows 3 and 9).** Give the home subscribe invite's section the accessible
   name its control's suffix names — `aria-label` or `aria-labelledby` on the section so that
   `Join the community` is the region's name — or suffix the control with the section's existing
   accessible name; one of the two, and the guide's sentence then predicts every announced name.
   State the rule the code follows in the guide: a shell destination announces the navigation it
   belongs to (`Site`), whichever surface renders it; a utility or footer link announces its
   cluster; a screen's own control keeps the bare label. Move `COPY.join` to the region-copy block
   in `app/browser/constants.ts` if the key survives.
3. **The empty-state collisions (row 4).** With `createCatalog({ products: [] })` on `/products` and
   `createCatalog({ assets: [] })` on `/media`, the notice's recovery link and the screen's
   continuation both read `Contact` (four on `/media`, one per channel). Name the recovery links
   with the channel vocabulary the product already carries (each channel's own label), keep the
   continuation's bare `Contact`, and extend the census to drive the data states the product
   guide's table declares — the Absent rows first (`/products`, `/media`, `/magazine`, `/shop`,
   `/marketplace` with an empty catalog or a query matching nothing), then the refused and accepted
   form states. The reproduction that must turn green: the Orchestrator's probe reads
   `readRefusal('Contact')` as `undefined` on `/media` and `/products` with the empty catalog at
   both widths (`r-a-audit-reproduction/probe-1.test.ts.txt`, the claim-5 case).
4. **The census infrastructure (row 5).** Move `SHELL_NAMES`, `ROUTES`, `readHeading`,
   `followRoute`, and `readShared` from `tests/app/browser/App.test.ts` into the browser test setup
   module `tests/app/browser/setup.ts` (the module unit R-B later relocates), exported and named for
   the act, per `.claude/rules/tests.md` in the scaffold checkout.
5. **The mirrored case (row 6).** Add a `buildName` case to `tests/app/browser/helpers.test.ts`
   (owned this round): the composed form, the separator, and the label leading.
6. **The guide (rows 7 and 8).** In `guides/README.md`: state the disclosure settle as what exists
   today (the suite settles on the framework's classes until R-B moves it to the announced state) —
   or drop the settle sentence and let R-B's guide patch add it; make the shell-destination
   paragraph state the rule item 2 fixes with no example contradicting its predicate; replace the
   speech-input sentence with the checkable standard (the visible label leads every composed name,
   so Label in Name holds); state the trigger's `aria-expanded` as a state the layer settles on and
   an assistive technology may not announce, because focus has moved into the dialog before it
   flips; record the redundancy cost (a cluster's name repeated in each of its links) as a taken
   tradeoff; rewrap the paragraph at `:222` at the file's width. Every sentence names what the
   markup has.
7. **The hide gate and the watcher (row 10).** Gate the navigation hide on the offcanvas instance's
   shown state rather than the painted `show` class, so a navigation during the opening animation
   still hides the dialog, and watch the location rather than the view, so a same-view navigation
   hides it too. Prove both in `tests/app/browser/App.test.ts` (a navigation issued between `show`
   and `shown`; a hash change from `/products/roughnotes-pro` to `/products/advantage-plus` with
   the menu open — the Orchestrator's probe read the menu staying open,
   `r-a-audit-reproduction/probe-2.test.ts.txt`). The guide's sentence "the shell hides the dialog
   when `location` changes" then states what the code does.

## Scope, as changed

**Owned, in addition to R-A's list.** `tests/app/browser/helpers.test.ts`, `tests/app/browser/setup.ts`
(the census infrastructure and name constants), `guides/README.md` (owned this round, not shared),
`app/browser/components/ProductsView.vue`, `MediaView.vue`, and any listing view whose empty
notice carries a recovery link, `app/core/constants.ts` where a channel label lives.

Everything else in R-A's Off-limits list stays off-limits; `tests/app/browser/integration.test.ts`
changes only where a renamed control is targeted.

## Controls

`R-A-2-C1` — the census over the declared data states is red on `/media` and `/products` (naming
the `Contact` collision) before item 3 and green after. `R-A-2-C2` — the hide-gate and same-view
cases are red before item 7 and green after. `R-A-2-C3` — the `buildName` case, the invite's
section name, and the shell-name pin green; `npm run test:app:browser` and `npm run test:journey`
exit 0. `R-A-2-C4` — scoped format and lint over owned files exit 0; `npm run check` exits 0;
`npm run format:check` names `vite.config.ts` alone; `npm run test:policy` exits 0 (it sweeps
`guides/README.md`).

## Everything else

The Output (`tmp/units/r-a-2-report.md`, with the same sections R-A's Output names plus the census
population over the data states it walked), the Deviation contract, the Execution line, and the
Review evidence sections stand as R-A states them. Baseline: the checkpoint the dispatch message
names. The provisional `Get started, Menu` name stays this round; R-B removes it after the
roughnotes re-pin to test 0.0.18.
