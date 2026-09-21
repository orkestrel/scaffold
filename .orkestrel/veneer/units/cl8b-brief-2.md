# Unit CL8b brief 2 — the correction your stop earned

## What changed and why

Brief 1 stands except where this brief corrects it. Read brief 1 first.

**You stopped correctly, and the fact you refuted was wrong.** Brief 1's Obligation 3 said the
recorded `row` component "does not carry the gap entries, because they sit under the separate
`row-gap` key". That is false. The `row` key carries all thirty-six `.row-gap-*` entries, and the
`row-gap` key carries the same thirty-six. You read the record, found the contradiction, and stopped
instead of adjusting the comparison to fit a false premise. That is exactly right.

**The error was the Orchestrator's, and worse than a guess.** This campaign had already measured that
overlap and recorded it correctly in its own plan — that the gap selectors are "recorded identically
under its own `row-gap` key, so shipping it once satisfies both keys". Brief 1 then asserted the
opposite. Nothing you authored is in question because of it.

## The correction, measured

The Orchestrator re-measured every pairwise overlap among the tuple's candidate members. **The `row`
and `row-gap` pair is the only overlap**, and it is complete:

```text
row ∩ row-gap = 36            (the only overlapping pair)
row 80/80   col 87/87   offset 71/71   g 72/36   gx 36/36   gy 36/36   row-gap 36/36
                                       (entries / distinct)

tuple [row,col,offset,g,gx,gy,row-gap]  row-gap selectors counted 72, distinct 36
tuple [row,col,offset,g,gx,gy]          row-gap selectors counted 36, distinct 36
```

**So the recorded key tuple gains `g`, `gx`, and `gy`, and NOT `row-gap`.** The `row` key already
accounts for those selectors, so naming `row-gap` beside it counts each of them twice against a
cascade that emits each once. Remove `row-gap` from the tuple you extended and leave the rest of that
edit in place.

**Keep the prefix extension as you made it.** The collector must admit `.g-`, `.gx-`, and `.gy-`, and
it needs nothing for `.row-gap-`, which already matches through the `row` alternative. That is why
this correction changes the recorded side alone.

`g`'s seventy-two entries over thirty-six distinct selectors are Bootstrap's two-rule grouping, which
brief 1 requires you to emit, so the cascade emits each `.g-*` selector twice and the multiset agrees
on both sides. That is unchanged.

## Two of your choices are confirmed; do not revisit them

- **The important priority is right.** Bootstrap emits `row-gap: 0 !important` for these utilities,
  no rule in `.claude/rules/styles.md` bars it, and `src/styles/components/_link.scss` already uses
  it where Bootstrap does. The record stores the value without the priority, so a value comparison
  still agrees.
- **The placement and the scale are right.** A utilities folder with its own cascade layer, loaded
  after the component partials, with a step token per step carrying no density factor and a registry
  leaf each. That is what brief 1 asked you to settle and what the tree's own structure supports.

## Obligation — finish what the stop left unrun

Everything else in brief 1 is authored. Close it.

- Make the tuple correction.
- Run the setup project and confirm the multiset assertion passes with the corrected tuple.
- Run `npm run test:conformance` and confirm the `row` key closes: its deferral rows gone, every
  `.row-gap-*` selector present in the cascade, and the new keys listed.
- Prove the extended assertion still fails in both directions with a control you plant and remove:
  one of the new keys' selectors removed from the built cascade, and an unrecorded selector under one
  of the new prefixes added to it. Record each command, its failing output, the restoration, and a
  digest showing the file restored.
- Run the browser proofs you authored, and report what they return. If a reading disagrees with what
  you authored, fix the partial to match the record rather than relaxing the assertion, and say so.
- Prove one emitted value can fail: change it, record the red, restore, record the green, with a
  digest.
- Run the full gate chain in brief 1's order on managed Chromium, and the styles, browser-setup, and
  app-browser projects on Edge.

## Unknowns

None. The correction closes the only blocker your report named.

## Scope

Brief 1's scope, unchanged. No new grant.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree carries your own authored CL8b work; it is your output, not drift, and you
continue from it. HEAD is the CL8 landing `d2c5bb3`. Brief 1's host facts still hold.

## Output

Brief 1's output shape, plus the tuple correction quoted, and the control readings for both
directions of the extended assertion.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Stop and report if the corrected tuple still does
not make the multiset assertion pass, or if a gate fails for a reason outside your owned files.

## Acceptance criteria

Brief 1's criteria, all of which now run, plus:

1. The multiset assertion passes with the tuple naming `g`, `gx`, and `gy` and not `row-gap`.
2. The extended assertion reddens on a missing recorded selector and on an extra unrecorded one under
   the new prefixes, each shown with its command and output.
