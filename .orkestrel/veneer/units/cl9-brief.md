# Unit CL9 — the table key

## Role and engine

`sol` on **`gpt-6-astra`** (never Sol), through `codex exec` with `--sandbox workspace-write` and
`-C C:/Users/mikes/WebstormProjects/veneer`. You are the engine reading this brief inside your own
CLI: perform the assignment directly and spawn nothing. You are the sole writer in this checkout.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Ship Veneer's table classes — the base table with its cells and sections, the bordered, borderless,
striped, striped-columns, active, and hover variants, the contextual variants, the group divider,
the caption class, and the responsive wrappers — and prove them by reading the browser.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact about
this key lives in one place, `.orkestrel/veneer/units/cl9-terrain.md`, staged beside this brief, with
the instruments that produced it. Read it before anything else and take every count, family, media
condition, property, and boundary from there.

That separation is deliberate. A brief that restates a measurement is a second copy that can drift
from the first, and this campaign has already spent a round on exactly that: a brief asserted the
opposite of a measurement the campaign had already recorded, and the unit reading the record cold was
the only reader positioned to refuse. **If this brief and the terrain record ever disagree, the
terrain record and the tree win, and you stop and report the disagreement rather than resolving it.**

## Rulings already taken, which you implement rather than reconsider

- **Veneer ships logical properties and proves the physical resolution**, as the container and grid
  partials do. Read them before writing.
- **The downward direction is new here.** This key's breakpoint-scoped families are recorded under
  maximum widths, so they use the downward breakpoint mixin. You are its first production consumer;
  the terrain record names what reading it carries.
- **Veneer's downward mixin stays as it is.** It emits the modern range form where the record carries
  the older maximum-width spelling with a fractional boundary. The two select the same viewports. The
  equivalence belongs in the comparison, not in the emission — do not change the mixin to match the
  record's spelling.
- **That equivalence is arithmetic, not a string rewrite**, and the emitted-vocabulary comparison
  does not yet know it. Teaching it is Obligation 3.
- **This key can join the emitted-vocabulary comparison on its own account.** The terrain record
  establishes that no other key carries any of its selectors, checked against every key rather than
  by prefix, so adding it to the recorded tuple cannot double-count.
- **The caption class ships here.** The terrain record establishes it is recorded under this key
  alone, so no other unit will ever carry it and deferring it would leave it unaccounted.

## Obligation 1 — the partial

Create the table partial under the components layer and load it once from the styles barrel in the
order that file already holds. Emit every family the terrain record names, taking each declaration's
property and value from the record rather than from Bootstrap from memory, with the logical
substitutions the rulings name.

Drive the generated families from loops over shared lists. The contextual variants are a family over
a role list, and the responsive wrappers a family over the ramp — neither is written out.

**The design row gives this unit a state token for the striped background.** Decide from the record
what that token must carry and whether the striped, active, and hover variants read it or the
Bootstrap accent variables, and say in your report what you decided and why. If the record shows the
token is not needed, say that instead of adding one.

## Obligation 2 — the accounting

Read `tests/setupConformance.ts` before deciding anything here.

- The terrain record names this key's custom properties. Each one needs a shipped variable row,
  because the key's properties object is not empty.
- Give the guide a shipped selector row per family, and add the key to the listed value in
  `tests/conformance.test.ts` and to the assertion in `tests/setupConformance.test.ts` that
  enumerates every component carrying guide rows, each in sorted position.
- Any selector you do not ship takes a deferral row naming its owner and reason. Do not ship a
  selector into this partial merely to avoid a deferral row, and do not leave one withheld without a
  row.

## Obligation 3 — extend the emitted-vocabulary comparison, and teach it the downward direction

The styles setup proof compares the built cascade's selector and media-condition multiset against the
record minus the guide's deferrals, for the keys its tuple names. Bring this key into it.

**Its condition normalizer currently equates only the upward spelling**, which is a rewrite over the
same number. This key's conditions are downward, where the record's boundary and the mixin's boundary
differ by a fraction as well as in spelling. Teach the normalizer that equivalence.

Then prove the extension in both directions with controls you plant and remove: a recorded selector
removed from the built cascade, and an unrecorded selector under this key's prefix added to it.
**Add a third control for the normalizer itself**: a condition whose boundary is shifted off the
equivalence must redden, or the normalizer is equating too much. Record each command, its failing
output, the restoration, and a digest showing the file restored.

## Obligation 4 — the proof reads the browser

Follow the grid and container proofs. Real viewport visits, resolved values, case tables in the setup
module carrying no assertions of their own.

- Read the cell padding, the vertical alignment, and the border behaviour the record specifies, on
  the base table and on each variant that changes them.
- Read the striped, active, and hover variants through what they paint, at the state they apply to.
- **Read the responsive wrapper on both sides of its boundary.** Its condition is a maximum width, so
  the wrapper's behaviour must be read below the boundary and read to be absent at and above it.
  That is the reading this unit exists to get right, and it is the first downward reading in the
  package.
- Bind the case tables to their sources the way the grid's are bound, so a later addition reddens.
- **Set any factor or token mutation where the declaration it must affect can see it**, and restore
  it afterwards. A mutation on a mounted wrapper cannot move a token declared at the document root;
  the tree carries a case named for that distinction and a sibling unit's audit has already caught a
  proof that missed it.
- Prove one emitted value can fail: change it, record the red, restore, record the green, with a
  digest.

## Obligation 5 — the showcase

Add a table section, registered the way the existing sections are, with specimens for the base table
and each variant family, and a proof for what you add.

## Unknowns

Settle each from the tree and the record, and report what you found.

- **What the state token must carry**, named under Obligation 1.
- **How this key's custom properties layer**, which the terrain record flags: several are a state
  pair over a base pair. Read the record's declarations rather than assuming the layering.
- **Whether the responsive wrapper's overflow behaviour can be read** by a real viewport resize, or
  whether it needs a different reading to be falsifiable.
- **Whether the shared-block sweep reports anything** once this partial exists. If it does, the fix
  reaches the partial the block is shared with; stop and report rather than extracting one side.

## Scope

**Owned:** the new table partial and its proof; `src/styles/index.scss`; `src/styles/_tokens.scss`
and `src/core/constants.ts` for a state token if the record requires one; `tests/setupStyles.ts` and
`tests/setupStyles.test.ts`; `tests/conformance.test.ts`; `tests/setupConformance.test.ts` for the
one enumerating assertion; `guides/veneer.md` for this key's rows; the new showcase section, its
constants, its registration in the showcase and the application barrel, and the proofs of each.

**Off-limits:** `tests/setupConformance.ts`; `tests/fixtures/**`; `package.json`; `configs/**`; every
other partial and every other proof; every path `scaffold repair` restores.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing.

Host facts: the shell is Git Bash on Windows and `npm.cmd` is the runnable entry; a grandchild
process and a nested install are denied by the sandbox, so record any proof needing one as an
observation naming the exact command; the probe tool is unavailable and its refusal is expected; the
PowerShell script-execution policy refuses a logging wrapper, so log through Git Bash; `tmp/` is
expected to be dirty and is not in your scope. `npm run build:src:styles` must precede any reading of
the built cascade.

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Run the styles, browser-setup, and app-browser projects on Edge as well
through `PLAYWRIGHT_CHANNEL=msedge`.

## Output

1. What you shipped, by family, and what if anything you deferred with its reason.
2. Each Unknown, with what you found and the evidence.
3. The normalizer's new equivalence, quoted, with its three controls.
4. The red-then-green readings, with exact commands and output and the digests.
5. The gate chain's exit codes and final result lines, on both engines.
6. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
7. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the partial's internal
order, how the loops are factored, the case tables' shape, the token's name if one is needed, and
which specimens the section gains. Stop and report if this brief and the terrain record disagree, if
the sweep's fix would reach a partial this brief does not grant, or if the record contradicts a
ruling above.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade carries every selector the record carries under this
   key, at its condition, with nothing extra.
4. `npm run test:setup` exits 0, including the extended comparison and its three controls.
5. `npm run test:conformance` exits 0 with the key listed and every withheld name deferred.
6. `npm run test:src:styles` exits 0 on managed Chromium and on Edge.
7. `npm run test:app:browser` and `npm run test:guides` exit 0.
8. `npm test` exits 0 whole.
9. The status lists only files this brief owns.
