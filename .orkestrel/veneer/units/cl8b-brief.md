# Unit CL8b — the gutter and gap step utilities

## Role and engine

`sol` on **`gpt-6-astra`** (never Sol), through `codex exec` with `--sandbox workspace-write` and
`-C C:/Users/mikes/WebstormProjects/veneer`. You are the engine reading this brief inside your own
CLI: perform the assignment directly and spawn nothing. You are the sole writer in this checkout.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Ship the step utilities that set the grid's gutters and its row gap — the `g`, `gx`, `gy`, and
`row-gap` keys — from a step scale of their own, and close the `row` key by shipping the selectors
CL8 deferred to this unit.

## Terrain and rulings already taken

The Orchestrator measured every fact here from `tests/fixtures/oracle/inventory.json` and from the
installed Bootstrap distribution directly. The instruments are
`.orkestrel/veneer/units/cl8b-steps-probe.mjs` and `units/cl8b-shape-probe.mjs`, and the rulings
they produced are `units/cl8b-rulings.md`, which you read before editing.

**The keys and their shape:**

| Key | Entries | Distinct selectors | Properties object |
| --- | --- | --- | --- |
| `g` | 72 | 36 | `--bs-gutter-x`, `--bs-gutter-y` |
| `gx` | 36 | 36 | `--bs-gutter-x` |
| `gy` | 36 | 36 | `--bs-gutter-y` |
| `row-gap` | 36 | 36 | empty |

Each key runs the same axes: the steps zero through five, unconditioned and at every breakpoint
infix the ramp carries above zero. **Derive both ranges from the record and the ramp, never from
this table.**

**Every one of them sets the same step scale**, measured across all four keys and also across `gap`
and `column-gap`, which this unit does not ship:

```text
0 = 0    1 = 0.25rem    2 = 0.5rem    3 = 1rem    4 = 1.5rem    5 = 3rem
```

**Rulings already taken, which you implement rather than reconsider.** Each is argued in
`units/cl8b-rulings.md`; the summary here is binding and that file carries the reasoning.

- **The steps take a scale of their own, carrying no density factor.** Veneer's space tokens hold
  four of these values but every one of them is multiplied by the density factor, while
  `--vn-gutter-x` and `--vn-gutter-y` are not. Reading the space scale would make a utility and the
  default it overrides resolve to different lengths at any density but the identity. Declare a step
  token per step with a registry leaf, distinct from `--vn-gutter-x` and `--vn-gutter-y`, which are
  the axis's current values rather than scale entries. The scale's name is yours to choose under the
  registry path law and the naming rules.
- **The gutter classes ship as Bootstrap groups them, two rules per step.** Bootstrap's own
  distribution emits `.g-0, .gx-0 { --bs-gutter-x: 0 }` and `.g-0, .gy-0 { --bs-gutter-y: 0 }`, so
  the combined class appears in both rules and the record carries it twice. Emit that shape. A
  single rule per step carrying both declarations resolves identically in a browser and is still
  wrong here: the emitted-vocabulary proof CL8 retained compares a multiset, so a cascade carrying
  the combined selector once against a record carrying it twice reddens.
- **The `row-gap` classes carry one property each** and group with no other key's classes, so they
  ship as their own rules.
- **`gap` and `column-gap` are not this unit's.** They are the same mechanism and the same scale,
  but no Content/layout key requires them, so shipping them here would move the family's exit
  criterion. Leave them to the utilities family, which reuses this unit's scale.

## Obligation 1 — the partial

Ship the utilities from a loop over the shared step list and the ramp, in the placement the styles
rules give them. Read `src/styles/components/_grid.scss` first: it is the pattern, and its single
loop over the ramp with an empty infix at the zero boundary is the shape this unit repeats.

Decide where the partial sits and say why in your report. These are utilities rather than a
component, so read how the tree already separates those before choosing, and follow what it does
rather than inventing a placement.

## Obligation 2 — the accounting

- **Close the `row` key.** CL8 recorded every `.row-gap-*` name as deferred to this unit. Delete
  those deferral rows as you ship each name. The presence scan then requires each of them in the
  built cascade, which is what closing the key means.
- **List the new keys.** `g`, `gx`, and `gy` carry non-empty properties objects, so each needs a
  shipped variable row per property beside its selector rows. `row-gap` carries an empty properties
  object, so the empty-properties branch admits it on selector rows alone. Add each to the listed
  value in sorted position, and give the guide the rows each requires. Verify every one of those
  facts against the record before relying on it.
- **Leave no withheld name unrecorded.** If any selector under these keys does not ship, it takes a
  deferral row naming its owner and reason, the way CL8's do.

## Obligation 3 — the proofs

- **Extend the emitted-vocabulary proof to these keys.** CL8 retained an assertion comparing the
  built cascade's grid selector and media-condition multiset against the record minus the guide's
  deferrals. Bring these keys into it. Prove it still fails in both directions with a control you
  plant and remove, recording the command, its failing output, and the same command green.

  **Two edit sites make that extension load-bearing, and one of them reddens whether or not you make
  it.** The collector's prefix test in `tests/setupStyles.ts` admits a selector beginning `.row`,
  `.col`, or `.offset`, so `.row-gap-0` is already collected on the built side through the `row`
  alternative — while the recorded side reads `oracle.components['row']`, which does not carry the
  gap entries, because they sit under the separate `row-gap` key. **So the moment you ship
  `.row-gap-*`, that assertion goes red until its key tuple names `row-gap`.** That is the proof
  working, not a defect in it. The other site is the prefix test itself, which does not admit `.g-`,
  `.gx-`, or `.gy-` and must. Both files are yours. Make each edit deliberately and say in your
  report what each one was for; do not discover the redness and work backwards from it.
- **Read the browser.** Follow `tests/src/styles/components/grid.test.ts`: real viewport visits
  through `visitBreakpoint`, resolved values through `readStyle`, `readPixels`, and `readToken`.
  Read a step utility's effect on a row's resolved margins and its child's resolved padding, at and
  around the boundary each breakpoint variant activates, and read the row gap the same way. A
  utility that sets a custom property is proved by what the property does, not by reading the
  property back alone.
- **Bind the step list to its sources**, the way CL8's tables are bound: the steps your tables carry
  are exactly the steps the record carries, and the infixes are exactly the ramp's non-zero names.
- **Prove one reading can fail.** Change one emitted value, record the command and its failing
  output, restore the exact change, and record the same command green, with a digest showing the
  file restored.

## Obligation 4 — the showcase

Extend the existing layout section with specimens for the step utilities, and extend its proof for
what you add.

## Unknowns

- **Where the partial belongs.** Named in Obligation 1. Read the tree and follow it.
- **Whether the step scale needs a token per step or one scale the rules index.** Read how the
  existing scales are declared and follow the tree's own form.
- **Whether shipping these selectors changes the shared-block sweep's reading.** Run
  `npm run test:setup -- tests/setupStyles.test.ts` and read it. If it reports a shared block, this
  brief grants `src/styles/_mixins.scss` and the partial the block is shared with, for the
  extraction and nothing else — the rule bars a mixin with one caller, so the fix reaches both
  copies.

## Scope

**Owned:** the new partial and its proof; `src/styles/index.scss`; `src/styles/_tokens.scss` and
`src/core/constants.ts` for the step scale and its leaves; `tests/setupStyles.ts` and
`tests/setupStyles.test.ts`; `tests/conformance.test.ts`; `tests/setupConformance.test.ts` for the
one assertion that enumerates every component carrying guide rows; `guides/veneer.md` for the
compatibility rows and the deferral rows this unit deletes; the layout showcase section, its
constants, and its proof; and `src/styles/_mixins.scss` with the partial a shared block names, only
if the sweep reports one.

**Off-limits:** `tests/setupConformance.ts`; `tests/fixtures/**`; `package.json`; `configs/**`;
every other partial and proof; every path `scaffold repair` restores.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing.

Host facts: the shell is Git Bash on Windows and `npm.cmd` is the runnable entry; a grandchild
process and a nested install are denied by the sandbox, so record any proof needing one as an
observation naming the exact command; the probe tool is unavailable and its refusal is expected; the
PowerShell script-execution policy refuses a logging wrapper, so log through Git Bash; `tmp/` is
expected to be dirty and is not in your scope. `npm run build:src:styles` must precede any reading
of the built cascade.

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Run the styles, browser-setup, and app-browser projects on Edge as well
through `PLAYWRIGHT_CHANNEL=msedge`.

## Output

1. What you shipped, by key and family, and what if anything you deferred with its reason.
2. Where you put the partial and the step scale, and why.
3. Each Unknown, with what you found.
4. The red-then-green readings, with exact commands and output, and the digests showing each file
   restored.
5. The deferral rows you deleted, and the conformance run that proves the `row` key closed.
6. The gate chain's exit codes and final result lines, on both engines.
7. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
8. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the partial's
placement among its siblings, the scale's name and shape, how the loops are factored, and which
specimens the section gains. Stop and report if the sweep's fix would reach a file this brief does
not grant, if a gate fails for a reason outside your owned files, or if the record contradicts a
ruling above.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade carries every selector the record carries under
   the four keys, at its condition, in the grouping the record carries, with nothing extra.
4. `npm run test:setup` exits 0, including the emitted-vocabulary proof extended to these keys and
   the step bindings.
5. `npm run test:conformance` exits 0 with `g`, `gx`, `gy`, and `row-gap` listed, the `row` key's
   deferral rows gone, and every `.row-gap-*` selector present in the cascade.
6. `npm run test:src:styles` exits 0 on managed Chromium and on Edge.
7. `npm run test:app:browser` and `npm run test:guides` exit 0.
8. `npm test` exits 0 whole.
9. The status lists only files this brief owns.
