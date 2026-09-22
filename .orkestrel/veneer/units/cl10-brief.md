# Unit CL10 — the icon-link, ratio, and vertical-rule keys

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`. Perform the assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Ship the three helper keys — the icon link with its hover and reduced-motion behaviour, the aspect
ratio box with its named ratios, and the vertical rule — and prove each by reading the browser.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact about
these keys lives in one place, `.orkestrel/veneer/units/cl10-terrain.md`, with the instrument that
produced it. Read it first and take every count, family, declared property, condition, and value from
there.

That separation is deliberate. A brief earlier in this campaign restated a measurement, the copy
drifted from the original, and the unit reading the record cold was the only reader positioned to
refuse. **If this brief and the terrain record disagree, the record and the tree win, and you stop and
report the disagreement rather than resolving it.**

The terrain record also closes four questions by measurement. Read its final section before writing:
it settles the preference condition, the ratio arithmetic and **the precision that differs from the
grid's**, and the vertical rule's token question.

## Rulings already taken, which you implement rather than reconsider

- **Veneer ships logical properties and proves the physical resolution**, as the container, grid, and
  table partials do. Read them before writing.
- **An undefined class in a combinator ships.** The icon key's combinator names Bootstrap Icons'
  class, which nothing in Veneer defines. CL7 ruled this when the container shipped its navigation
  combinators: the declarations are self-contained on the element Veneer owns, and the rule matches
  nothing until a consumer brings the markup. Ship it, and record the undefined class as a bound for
  the guide, as CL7 did.
- **The Bootstrap custom property is an alias over Veneer's own**, where the record reads one. The
  token file already declares the alias the vertical rule needs, so read it rather than adding
  anything.
- **A transition never ships without its reduced-motion pair.** The styles rule requires it and the
  record's own shape carries it, so these agree rather than conflict.
- **Take the rounding scale from this key's record, not from the grid partial.** The terrain record
  names the difference. A value the eye calls identical still reddens the comparison.

## Obligation 1 — the partials

Create one partial per key under the components layer, each loaded once from the styles barrel in the
order that file already holds. `.claude/rules/architecture.md` and the class-placement convention
decide whether a lone class sits flat or in a folder — read them and follow what the tree already
does rather than inventing a placement.

Emit every family the terrain record names, taking each declaration's property and value from the
record, with the logical substitutions the rulings name. Drive the named ratios from a loop over a
list rather than writing them out.

**Settle the vendor-prefixed properties the record carries**, which the terrain record names. Read
what the shipped partials already do for that class of difference and follow it. Whichever way it
goes, record it — if the cascade omits them, that is a departure the guide states.

## Obligation 2 — the accounting

Read `tests/setupConformance.ts` before deciding anything here.

- The terrain record names which of the three keys carries a custom property. That one needs a
  shipped variable row; the other two do not, because their properties objects are empty and the
  empty-properties branch admits them on selector rows alone. Verify each against the record.
- Give the guide a shipped selector row per family per key, and add all three keys to the listed value
  in `tests/conformance.test.ts` and to the assertion in `tests/setupConformance.test.ts` that
  enumerates every component carrying guide rows, each in sorted position.
- Any selector you do not ship takes a deferral row naming its owner and reason.

## Obligation 3 — extend the emitted-vocabulary comparison

The styles setup proof compares the built cascade's selector and media-condition multiset against the
record minus the guide's deferrals, for the keys its tuple names. Bring all three keys into it.

The tuple is the `as const` array inside the case that binds that multiset, in
`tests/setupStyles.test.ts`. The collector and its selector prefix are in `collectGridVocabulary` in
`tests/setupStyles.ts`. Locate each by its surrounding code rather than by a line number.

**The terrain record establishes that no other key carries any of these selectors**, so all three can
join the tuple without double-counting — the failure a sibling unit hit and stopped on.

Prove the extension in both directions with controls you plant and remove: a recorded selector removed
from the built cascade, and an unrecorded selector under one of these prefixes added to it. Record
each command, its failing output, the restoration, and a digest showing the file restored.

## Obligation 4 — the proofs read the browser

Follow the container, grid, and table proofs. Real mounts, resolved values, case tables in the setup
module carrying no assertions of their own.

- Read the icon link's layout and its underline treatment, and read the hover and focus behaviour at
  the state each applies to.
- **Read the reduced-motion behaviour under the preference, not from the rule's text.** The browser
  setup exposes how to drive a preference; read it and use it. If it cannot, say so and read what you
  can, naming the limit.
- Read each named ratio's resolved box against its own aspect, and read the child's fill.
- Read the vertical rule's resolved width, its stretch, and its paint.
- Bind the case tables to their sources so a later addition reddens: the ratios against the record,
  and anything keyed by role or step against its own list.
- **Set any mutation where the declaration it must affect can see it**, and restore it afterwards. A
  mutation on a mounted wrapper cannot move a token declared at the document root; a sibling unit's
  audit caught a proof that missed this.
- Prove one emitted value can fail: change it, record the red, restore, record the green, with a
  digest.

## Obligation 5 — the showcase

Add specimens for all three keys to the section the design row names, or to a new section if the tree's
own grouping calls for one — decide from what the existing sections do and say why. Extend or add the
proofs for what you ship, including the section's registration if you add one.

## Unknowns

Settle each from the tree and the record, and report what you found.

- **Whether the browser setup can drive the reduced-motion preference.** Named in Obligation 4.
- **Whether the three keys want three partials or fewer**, against the placement convention and what
  the tree already does. The design row names three files; if the convention says otherwise, follow
  the convention and say so.
- **Whether the shared-block sweep reports anything** once these partials exist. If it does, the fix
  reaches the partial the block is shared with; stop and report rather than extracting one side.

## Scope

**Owned:** the new partials and their proofs; `src/styles/index.scss`; `tests/setupStyles.ts` and
`tests/setupStyles.test.ts`; `tests/conformance.test.ts`; `tests/setupConformance.test.ts` for the one
enumerating assertion; `guides/veneer.md` for these keys' rows; the showcase section or sections you
extend or add, their constants, any registration in the showcase and the application barrel, and the
proofs of each.

**Off-limits:** `tests/setupConformance.ts`; `tests/fixtures/**`; `package.json`; `configs/**`;
`src/styles/_tokens.scss` and `src/core/constants.ts` — the terrain record establishes no token is
needed, so if you conclude one is, stop and report rather than adding it; every other partial and
proof; every path `scaffold repair` restores.

## Execution

Perform the assignment directly and spawn nothing. You are a native writer, not a bench unit: you run
the gates yourself in this checkout.

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Run the styles, browser-setup, and app-browser projects on Edge as well
through `PLAYWRIGHT_CHANNEL=msedge`. `npm run build:src:styles` must precede any reading of the built
cascade. `tmp/` is expected to be dirty and is not in your scope.

## Output

1. What you shipped, by key and family, and what if anything you deferred with its reason.
2. Where you put each partial and why, and how many you made.
3. Each Unknown, with what you found.
4. The red-then-green readings, with exact commands and output and the digests.
5. The departures you recorded, including the vendor-prefixed properties.
6. The gate chain's exit codes and final result lines, on both engines.
7. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
8. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: each partial's internal
order, how the ratio loop is factored, the case tables' shape, and which specimens the showcase gains.
Stop and report if this brief and the terrain record disagree, if you conclude a token is needed, if
the sweep's fix would reach a partial this brief does not grant, or if the record contradicts a ruling
above.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade carries every selector the record carries under the
   three keys, at its condition, with nothing extra.
4. `npm run test:setup` exits 0, including the extended comparison and its controls.
5. `npm run test:conformance` exits 0 with all three keys listed and every withheld name deferred.
6. `npm run test:src:styles` exits 0 on managed Chromium and on Edge.
7. `npm run test:app:browser` and `npm run test:guides` exit 0.
8. `npm test` exits 0 whole.
9. The status lists only files this brief owns.
