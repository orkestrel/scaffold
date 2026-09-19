# Unit R-A-2 — checker brief

## Role and engine

`checker` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, and `Glob` and no
shell, in the checkout `C:/Users/mikes/WebstormProjects/roughnotes` at the tip the dispatch
message names, after unit R-A-2 returned (the tree carries its uncommitted edits). You read the
unit's report at `tmp/units/r-a-2-report.md`, the briefs at `tmp/units/r-a-brief.md` and
`tmp/units/r-a-brief-2.md`, and the tree, and you report mechanical facts; you rule on nothing
subjective and edit nothing.

## Criteria — report each as MET or UNMET with the lines it rests on (file:line)

1. `grep -rn "keeps its own action beside the open menu" app/ guides/` matches nothing, and the
   replacement reason (the layer's reachability reading counts a control the open dialog covers)
   appears once in `app/browser/App.vue` and once in `guides/README.md` (quote both).
2. The home subscribe invite's section carries an accessible name equal to the region word its
   control's suffix names, or the control's suffix equals the section's existing accessible name
   (quote the `HomeView.vue` lines); `COPY.join`, if it survives, sits in the region-copy block of
   `app/browser/constants.ts` (quote the block).
3. In `ProductsView.vue` and `MediaView.vue`, the empty notice's recovery link no longer reads
   the bare `Contact`; the screen's continuation still does (quote both lines in each file). The
   census test drives the data states the product guide's table declares, naming the Absent rows
   at least (quote the state list in the setup module).
4. `SHELL_NAMES`, `ROUTES`, `readHeading`, `followRoute`, and `readShared` are exported from
   `tests/app/browser/setup.ts` and imported by `tests/app/browser/App.test.ts`; none is declared
   in the test file (quote the import line and grep the test file for each declaration).
5. `tests/app/browser/helpers.test.ts` carries a `buildName` case asserting the composed form and
   the leading label (quote it).
6. `guides/README.md`: no sentence states the announced-state settle as existing unless the setup
   module settles on the announced state (quote `readMenuSettled` or its replacement and the guide
   sentence together); the shell-destination paragraph's rule has no example contradicting it; the
   speech-input sentence is gone and Label in Name is stated; the trigger's `aria-expanded` sentence
   names it as a state the layer settles on; the redundancy cost is recorded; no line exceeds the
   file's width where its neighbours wrap (report the longest line's length).
7. `App.vue` gates the navigation hide on the offcanvas instance's shown state, not on the `show`
   class, and watches the location, not the view (quote the lines); `App.test.ts` carries a case
   for a navigation issued between `show` and `shown` and a case for a same-view hash change with
   the menu open (name them).
8. The report carries each control `R-A-2-C1` through `R-A-2-C4` with a command and a reading, the
   census population over the data states it walked, the diff stat, and `git status --short`; the
   diff touches only owned files (R-A's list plus `tests/app/browser/helpers.test.ts`,
   `tests/app/browser/setup.ts`, `guides/README.md`, `ProductsView.vue`, `MediaView.vue`, listing
   views with a recovery link, `app/core/constants.ts`); no `TODO`, `.only`, `.skip`, or `it.todo`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing.

## Output

Return, as your final message and nothing else, one line per criterion, `MET` or `UNMET`, with
the quoted lines it rests on, and the terminal line `CHECK: PASS` or `CHECK: FAIL <criteria>`.
