# Unit CL4 — the prefixed file-button selector (brief 4)

Succeeds `cl4-brief-3.md`, which with briefs 2 and 1 beneath it stays in force for
everything this brief does not name. All three are left unedited. What changed and why: you
stopped under brief 3's deviation contract (`cl4-report-2.md`) because the build drops
the authored `::-webkit-file-upload-button` and keeps `::file-selector-button`. **The stop was
right.** This brief rules it, and it is the last ruling this unit needs.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `d822d59`, with your own CL4
work in the working tree. Continue from it without restoring or resetting anything. Perform the
assignment directly and spawn nothing.

## What I measured before ruling

Reading the pinned inventory's 117 `reboot` selectors against your rebuilt cascade by the scan's
own rule, with your canonicalization applied: 141 selectors are emitted, 12 are absent, and your
canonicalization recovers the two reset spellings. Of the ten that remain, nine are the
exclusions you already wrote into the deferral table (`ol ol`, `ul ul`, `ol ul`, `ul ol`,
`pre code`, `a > code`, `kbd kbd`, `legend + *`, `::-moz-focus-inner`) and exactly one is new:
`::-webkit-file-upload-button`. So this is a one-selector ruling, and your partials are otherwise
complete against the pinned row.

## The ruling

`::file-selector-button` is the standard selector and it ships; `::-webkit-file-upload-button` is
the WebKit-prefixed alias of the same control part, and the build's CSS targets make it
redundant, so the minifier drops it. Do not fight the minifier and do not canonicalize the two
together: they are different selectors with different support, and folding them would let the
scan pass for a cascade that genuinely lacked either one, which is what brief 3's falsification
case exists to prevent.

Exclude it, and make the source agree:

1. Remove the authored `::-webkit-file-upload-button` rule from `src/styles/elements/_input.scss`.
   Keeping a rule the build drops is dead source, and worse, a later change to the build's
   targets would emit it and break the exclusion, which requires the name to be **absent** from
   the cascade.
2. Add its row to the guide's `### Deferred selectors` table with Owner `Excluded`, on the shape
   your other nine rows use. Its reason is that the standard `::file-selector-button` ships the
   same control part and the build's targets make the prefixed alias redundant, so it is absent
   from the cascade by the build's own decision rather than by omission.
3. Record in your report that the exclusion set is now ten rows, and that the scan's absence
   check passes for the new row because the rule is gone from the source.

## Everything else

Briefs 1 to 3's Objective, Context, Scope, Execution, Output, Deviation contract, and Acceptance
criteria stand. Scope gains nothing: `src/styles/elements/_input.scss` and `guides/veneer.md`
are already yours. Finish the unit under brief 1's acceptance criteria, which this ruling makes
reachable: `npm run test:conformance` green with the `reboot` row `shipped` and `listed` reading
`['btn', 'reboot']`, red on any one shipped selector removed from its partial and restored, every
excluded row absent from the cascade, every partial's values proven on both receipts, the
`ContentSection` specimens rendering, and the whole gate chain green on managed Chromium and
Edge.

Your deviation contract keeps brief 3's stop conditions. One more: **stop and report** if any
further inventory selector proves unemittable, rather than excluding it yourself. Two rulings in,
the pattern is that the build's own transformations decide what ships, and each one is a product
question I answer rather than a workaround you apply.
