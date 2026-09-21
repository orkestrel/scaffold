# Unit CL8 — the grid: rows, columns, and offsets

## Role and engine

`sol` on **`gpt-6-astra`** (never Sol), through `codex exec` with `--sandbox workspace-write` and
`-C C:/Users/mikes/WebstormProjects/veneer`. You are the engine reading this brief inside your own
CLI: perform the assignment directly and spawn nothing. You are the sole writer in this checkout.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Ship Veneer's grid layout rules — the row, its column children, the row-column counts, and the
offsets — reading the tokens the container already publishes, and prove them by driving a real
viewport and reading resolved values.

## Terrain and rulings already taken

Terrain: `.orkestrel/veneer/units/cl8-scout-report.md` in the scaffold checkout, with the
corrections in this section, which supersede it where they differ. The Orchestrator measured every
fact in this section from `tests/fixtures/oracle/inventory.json` directly.

**The pinned inventory keys by class prefix, so two of your keys are buckets.** Under
`components.row` sit 44 grid rows and 36 `.row-gap-*` rows; under `components.col` sit 84 grid
columns and 3 `.col-form-label*` rows. The `.row-gap-*` selectors are recorded identically under
`components['row-gap']`. **Your unit ships the grid selectors only.** The rulings under Obligation
3 say what happens to the rest; do not ship them and do not invent a home for them.

The grid selector families, measured:

| Key | Families this unit ships | Rows |
| --- | --- | --- |
| `row` | `.row`; `.row > *`; `.row-cols-auto > *`; `.row-cols-{n} > *`; `.row-cols-{bp}-auto > *`; `.row-cols-{bp}-{n} > *` | 44 |
| `col` | `.col`; `.col-auto`; `.col-{n}`; `.col-{bp}`; `.col-{bp}-auto`; `.col-{bp}-{n}` | 84 |
| `offset` | `.offset-{n}`; `.offset-{bp}-{n}` | 71 |

`{bp}` ranges over the breakpoint infixes the ramp carries above zero. `{n}` ranges over the column
steps, and the offset steps start at zero only in their breakpoint-scoped form. **Derive every range
from the inventory and the ramp, never from this table**, which is a map rather than an authority.

**A breakpoint-scoped row carries its own `condition` field**, for example
`"condition": "@media (min-width: 576px)"`, on the selector row inside the key. The key's own
`media` array is empty. This is how the container key records its caps too.

**Rulings already taken, which you implement rather than reconsider:**

- **Veneer ships logical properties and proves the physical resolution.** The inventory records
  `margin-left`, `padding-left`, `padding-right`, `width`, and `max-width`; the container partial
  ships `margin-inline`, `padding-inline`, `inline-size`, and `max-inline-size`, and its proof reads
  the physical sides back from the browser. Follow that. `margin-top` becomes
  `margin-block-start`, and `row-gap` stays as it is because it has no logical twin.
- **The Bootstrap custom property is an alias over Veneer's own token.** The container declares
  `--bs-gutter-x: var(--vn-gutter-x)` and then reads `--bs-gutter-x`. The row does the same, so a
  consumer can retune either. Read `src/styles/components/_container.scss` before writing.
- **The gutter tokens already exist** — `--vn-gutter-x` and `--vn-gutter-y`, with leaves under
  `TOKEN_NAMES.gutter`. This unit adds no token. Column widths and offsets are percentages of the
  grid's own division, which are structural rather than a retunable scale, so they take no token.
  `.claude/rules/styles.md` bars literal **colors**, not literal lengths.
- **The column loop's shape differs from the container's.** The container accumulates one growing
  selector list because each cap applies to every earlier variant. A column rule does not
  accumulate: each breakpoint-scoped rule is its own prefixed selector under its own condition.
  Write the loop the grid needs; do not copy the container's accumulation.
- **Drive every generated family with one `@each` over a shared list.** `.claude/rules/styles.md`
  bars repeating per-variant blocks. A written-out ladder of twelve column widths is such a block.

## Obligation 1 — the partial

Create `src/styles/components/_grid.scss` under `@layer components` and load it once from
`src/styles/index.scss` beside the other component partials, in the order that file already holds.

Emit, from loops rather than written-out rules:

- the row rule, declaring the gutter aliases and reading them for its negative margins and row gap;
- the row's direct-child rule, taking its share of the gutter as inline padding and its block start
  margin from the vertical gutter;
- the row-column counts, unconditioned and per breakpoint, including the `auto` member;
- the columns: the flexible member, the `auto` member, and the numbered widths, unconditioned and
  per breakpoint;
- the offsets, unconditioned and per breakpoint.

Every declaration's property and value must match what the inventory records for that selector,
with the logical substitutions the rulings name. Read the inventory's `declarations` array for the
key rather than reproducing Bootstrap from memory.

## Obligation 2 — the keys' accounting

This is the obligation the family exists for. Read `tests/setupConformance.ts` before deciding
anything here.

- **`offset` ships whole.** Its properties object is empty, so the empty-properties branch of
  `collectShippedComponents` admits it on selector rows alone. Add it to the listed value in
  `tests/conformance.test.ts` in sorted position, and give the guide a shipped selector row per
  family.
- **`row` and `col` do not ship whole in this unit**, because `.row-gap-*` and `.col-form-label*`
  remain. Record each as a deferred selector with its reason and the unit that closes it:
  `.row-gap-*` to CL8b, which ships the step utilities that set the same custom properties;
  `.col-form-label*` to the Forms family, because those three selectors carry form-label typography
  and no form key records them, so nothing else will force them. Do not add `row` or `col` to the
  listed value, and do not ship a selector to make a key list.
- **Report the deferral mechanism you used.** If the guide has no deferred-selector section, or the
  conformance run has no way to record a deferral, say so in your report as a deviation rather than
  inventing one.

## Obligation 3 — the proof reads the browser

Write `tests/src/styles/components/grid.test.ts`, following
`tests/src/styles/components/container.test.ts` as the pattern: `visitBreakpoint` for real viewport
resizes, and `readStyle`, `readPixels`, and `readToken` for resolved values. Case tables live in
`tests/setupStyles.ts` and carry no assertions of their own.

- Read the row's negative margins and its child's padding back as physical sides, at the default
  gutter and after overriding each gutter token on the element.
- Read a numbered column's used width against its share of the row, at and around the boundary each
  breakpoint-scoped variant activates, so an unconditioned variant and a breakpoint variant are
  distinguished by a real resize rather than by the rule's text.
- Read an offset's resolved inline start margin the same way.
- Read the row-column count's effect on its children's width.
- **Bind every generated list to its source.** CL7's audit found a variant table that no assertion
  tied to the ramp, so a later ramp boundary would have shipped a class with no reading. Assert that
  the breakpoint infixes your tables carry are exactly the ramp's non-zero names, the way
  `tests/setupStyles.test.ts` now asserts the container token keys against that ramp, and that the
  column steps your tables carry are exactly the steps the inventory records.
- **Prove one reading can fail.** Change one emitted value in the partial, record the command and
  its failing output, restore the exact change, and record the same command green. Report both
  readings and confirm the partial is byte-identical afterwards.

## Obligation 4 — the showcase section

Extend the existing `LayoutSection` rather than adding a section: it already carries the container
specimens and this is the same family. Add grid specimens — a row with numbered columns, a row with
auto and flexible columns, an offset, and a row-column count — and extend
`tests/app/browser/sections/LayoutSection.test.ts` for what you add.

**Carried from CL7's audit, to close while you are in these files:** the showcase wiring in
`app/browser/index.ts` and `app/browser/Showcase.ts` places the layout section out of the
alphabetical order its neighbours hold, `tests/setupStyles.test.ts` places the container tables out
of the order its neighbours hold, and `app/browser/constants.ts` annotates the layout copy constant
where every sibling copy constant is unannotated. Fix all three.

## Unknowns

The Orchestrator does not know these and has not guessed. Settle each from the tree and report what
you found.

- **Whether the guide and the conformance run already carry a deferred-selector mechanism**, and
  what shape a deferral row takes. Obligation 2 depends on it. If none exists, report that rather
  than inventing one, and leave `row` and `col` unlisted with the reason in your report.
- **Whether `.col`, `.col-auto`, and the `auto` row-column members need the flex shorthand the
  inventory records or a longhand equivalent**, given that the inventory's flattened declarations
  record `flex` and the rules elsewhere in this tree prefer longhands. Read what the container and
  the other shipped partials do and follow the tree.
- **Whether a row-column count rule and a column width rule collide on the same child**, and if so
  which the cascade must win. Read the inventory's ordering and preserve it.
- **Whether the shared-block sweep reports anything** once the grid partial exists. Run
  `npm run test:setup -- tests/setupStyles.test.ts` and read it. If it reports a shared block,
  extract it to `src/styles/_mixins.scss`, which this brief grants you for that purpose alone.

## Scope

**Owned, and yours to write:**

- `src/styles/components/_grid.scss` (new)
- `src/styles/index.scss` (the one load line)
- `tests/src/styles/components/grid.test.ts` (new)
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the grid case tables and their assertions,
  and CL7's carried ordering fix)
- `tests/conformance.test.ts` (the listed value)
- `guides/veneer.md` (the compatibility rows and the deferral rows for these keys, nothing else)
- `app/browser/sections/LayoutSection.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`,
  `app/browser/index.ts` (the grid specimens and CL7's carried ordering and annotation fixes)
- `tests/app/browser/sections/LayoutSection.test.ts`
- `src/styles/_mixins.scss`, **only** if the shared-block sweep reports a shared block

**Off-limits:** `tests/setupConformance.ts` and its proof; `tests/fixtures/**`; `package.json`;
`configs/**`; `src/core/constants.ts` and `src/styles/_tokens.scss` (this unit adds no token — if
you conclude it needs one, stop and report rather than adding it); every other partial and every
other proof; every path `scaffold repair` restores, including `tests/setupPolicy.ts` and
`tests/policy.test.ts`.

## Execution

You are the engine reading this brief inside your own CLI. Do the work yourself and spawn nothing.

Host facts, so you do not rediscover them: the shell is Git Bash on Windows; `npm.cmd` is the
runnable entry; a grandchild process and a nested install are denied by the sandbox, so record any
proof needing one as an observation naming the exact command instead of running it; the probe tool
is unavailable to you and its refusal is expected, not a fault. `tmp/` is expected to be dirty and
is not part of your scope.

The gate chain, in order, is `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Run the styles project on Edge as well with
`PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`. `npm run build:src:styles` must precede any
reading of the built cascade.

## Output

Return as your final message, and write nothing outside this checkout:

1. What you shipped, by key and family, and what you deferred with its reason.
2. Each Unknown, with what you found and the evidence.
3. The red-then-green readings, with the exact commands and their failing and passing output, and
   the digest proving the partial is unchanged afterwards.
4. The binding assertions you added, quoted.
5. The gate chain's exit codes and final result lines, on both engines.
6. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
7. Anything you could not close, and any of your own claims you want flagged.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: how the loops are
factored, where each rule sits in the partial, how the case tables are shaped, which specimens the
section gains, and the wording of any guide row. Stop and report if you conclude this unit needs a
token, if the sandbox rejects a write inside your owned set, or if an Unknown resolves in a way that
makes an acceptance criterion unreachable.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade carries every grid selector the inventory records
   under `row`, `col`, and `offset`, at the condition it records, with nothing extra.
4. `npm run test:setup` exits 0, including the shared-block sweep and your binding assertions.
5. `npm run test:conformance` exits 0 with `offset` listed, and `row` and `col` not listed.
6. `npm run test:src:styles` exits 0 on managed Chromium and on Edge.
7. `npm run test:app:browser` and `npm run test:guides` exit 0.
8. `npm test` exits 0.
9. The status lists only files this brief owns.
