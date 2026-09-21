# Unit CL8 brief 2 — the scope correction the stop required, and the work it blocked

## What changed and why

Brief 1 stands in full. This brief adds a grant and names the work that brief 1's scope prevented.
Read brief 1 first; every ruling, obligation, and criterion in it holds except where this brief says
otherwise.

**You stopped correctly.** The shared-block sweep reported the grid partial sharing declarations
with `src/styles/components/_container.scss`, brief 1 made that file off-limits, and extracting only
one side would have left the container's declarations duplicated and created a mixin with one
caller. Both outcomes break `.claude/rules/styles.md`. Stopping and reporting was the right move
under the deviation contract, and your report named the sweep's exact output and the correction it
needs.

**The defect was the Orchestrator's, not yours.** Brief 1 told you to follow the container's alias
pattern — `--bs-gutter-x: var(--vn-gutter-x)` declared and then read — which is itself a
two-declaration block, and then withheld the file that pattern lives in. The grant below is that
correction. Nothing you authored is in question because of it.

## Your flagged interpretation is correct; keep it

You flagged that the inventory's `.row` record carries no `row-gap` property, so the vertical gutter
works through the row's negative block-start margin and its children's positive one, and your proof
expects the `row-gap` property to resolve to its initial value. **That reading is right and it
stands.** The Orchestrator re-measured: `.row` declares the gutter aliases, `display`, `flex-wrap`,
and the three negative margins, and nothing else; every `row-gap` declaration under the `row` key
belongs to a `.row-gap-*` utility, which this unit defers. Brief 1's phrase "its negative margins
and row gap" conflated the vertical-gutter mechanism with the CSS property of that name, and was
loose. Follow the inventory, as you did. Do not add a declaration the baseline does not carry.

## The grant

Added to brief 1's owned set, for the extraction and for nothing else:

- **`src/styles/components/_container.scss`** — to replace its shared declaration blocks with calls
  to the extracted mixins. Change no other line of that file, and change nothing it emits.
- **`src/styles/_mixins.scss`** — brief 1 granted this conditionally for exactly this case; the
  condition is now met, so it is granted outright for the extracted mixins.

Everything else in brief 1's off-limits list stays off-limits, including
`tests/src/styles/components/container.test.ts`. If the extraction is correct, that proof does not
move: it reads resolved values from the browser, and the emitted cascade does not change.

## Obligation A — extract both shared blocks

The sweep named two blocks. Extract each to `src/styles/_mixins.scss` and call it from both callers.

- The gutter aliases the container shell and the row both declare.
- The full inline size with half the horizontal gutter as inline padding, which the container shell
  and the row's direct child both carry.

Each block has two callers after extraction, so neither creates a one-caller mixin. Name each mixin
for what it does under `.claude/rules/styles.md` § Naming; the naming is yours to settle.

**The container's emitted CSS must not change.** That is the criterion that makes this extraction
safe rather than a refactor with a blast radius. Prove it: build the cascade before the extraction
and after it, and compare the container selectors' emitted declarations. Report the comparison and
the method you used. If a declaration moves, order included, stop and report rather than adjusting
the container to match.

Then re-run the sweep and report that it finds nothing shared, over a population that still
includes `_mixins.scss`.

## Obligation B — the work the stop left unrun

Brief 1's obligations are authored but unverified. Close each.

- **The red-then-green control**, which brief 1 § Obligation 3 requires and which has not run.
  Change one emitted value in the grid partial, record the command and its failing output, restore
  that exact change, and record the same command green. Report both readings and the digest showing
  the partial is byte-identical afterwards.
- **The browser readings.** Your report lists the row-column-count against numbered-column cascade
  behaviour as authored but unverified, and the flex shorthand as unresolved against browser
  resolution. Run the proof and report what the browser returns. If a reading disagrees with what
  you authored, fix the partial to match the inventory rather than relaxing the assertion, and say
  so.
- **The conformance run**, which decides whether the guide's selector, variable, and deferral rows
  are the rows the machinery requires. Your report authored them without running the reader or the
  presence scan. Run `npm run test:conformance` and report what it says. Brief 1's ruling stands: a
  key with shipped rows and a deferral per withheld name lists, and a deferred name present in the
  built cascade is a failure.
- **The full gate chain**, in brief 1's order, on managed Chromium and with the styles project also
  on Edge.

## Unknowns

- **Whether the extraction changes the sweep's reading for any partial other than the container and
  the grid.** The population is every partial under `src/styles/`, so a mixin body is itself a block
  the sweep reads. Report the sweep's output rather than only its exit code.
- **Whether `tests/setupStyles.test.ts` asserts anything about the mixins file's contents** that the
  extraction moves. Read that proof before editing `_mixins.scss` and report what you found.

## Scope

Brief 1's scope, plus the two files named under § The grant. No other change.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree already carries your authored CL8 changes; they are your own output, not
drift, and you continue from them rather than starting over. HEAD is the CL7 landing `a9172df`.

The host facts in brief 1 § Execution still hold. The `~/.config/git/ignore` permission warning your
report noted is a standing condition of this host and affects nothing.

## Output

Brief 1's output shape, plus:

1. The extraction: each mixin, its callers, and the before-and-after comparison of the container's
   emitted declarations with the method that produced it.
2. The sweep's full output after the extraction, not only its exit code.
3. Each Unknown above, with what you found.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the mixins' names,
their parameter shape if any, and where they sit in `_mixins.scss`. Stop and report if the
extraction would change what the container emits, if the sweep still reports a shared block after
it, or if a browser reading contradicts the inventory in a way the partial cannot satisfy.

## Acceptance criteria

Brief 1's criteria, all of which now run, plus:

1. The shared-block sweep reports nothing shared, over a population including `_mixins.scss`.
2. The container selectors' emitted declarations are unchanged by the extraction, shown by a
   before-and-after comparison rather than asserted.
3. `tests/src/styles/components/container.test.ts` is unchanged and passes.
