# Unit CL3b — the muted text and raised surface tokens (brief 2)

Supersedes `cl3b-brief.md`, which is left unedited and whose every other section stays
in force. What changed and why: the scope read
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3b-scope-read-report.md`)
confirmed every path, line, and calibration value brief 1 states, and confirmed the dark anchor
hazard chain from source. It also found one assertion outside brief 1's owned set that the
hazard reaches, and two guide rows that describe the same chain. This brief names them and fixes
the ruling item 1 was left to settle.

## The ruling item 1 was left to settle

`tests/src/styles/integration.test.ts:92` asserts the dark border tier as
`color-mix(in oklab, #66bb6a 50%, oklch(0.235 0.013 256))` — today's raised literal, reached
through `$dark`'s `anchor`. The record's raised value differs from it, so letting the retuned
value flow into the anchor would falsify that assertion, and the file is not yours. **Take the
pin branch:** set `$dark`'s `anchor` to the literal `oklch(0.235 0.013 256)` in the same edit
that retunes `raised`, so the anchor is unchanged, every dark role tier keeps its value, and
`integration.test.ts` stays true unedited. Item 1's measurement still runs and is still reported:
it is the evidence that the pin worked, not a choice between branches.

Record in the report that the dark anchor and the dark raised surface are now separate values,
with the reason: the anchor is the mix base every dark role tier is calibrated against (U7's
accepted Button portfolio), and the raised surface is a Content value the record fixes.

## The guide rows this touches

`guides/veneer.md:400` (§ Tokens, semantic roles) documents the dark border tier as
`color-mix(in oklab, {fill} 50%, var(--vn-surface-raised))`, and `:433-434` explains the raised
surface and that mix. Under the pin branch the formula's text is no longer true of the dark
anchor, which now reads a literal rather than the token. Both rows are inside the § Tokens
grant brief 1 gives you: correct them to what the code does, in the table's existing shape, and
say in the report which rows you changed. This is the parity minimum, not a prose pass.

## Everything else

Brief 1's Role, Objective, Context, Unknowns, Scope, Execution items 2 to 8, Output, Deviation
contract, and Acceptance criteria stand unchanged, with these additions:

- Scope keeps `tests/src/styles/integration.test.ts` **off-limits**. If your measurement shows a
  dark role tier moving after the pin, stop and report it: something reaches the anchor that
  this brief has not accounted for.
- Acceptance criterion 1 reads: item 1's measurement is reported with both readings, the dark
  anchor is pinned to `oklch(0.235 0.013 256)`, and no dark role tier's resolved value differs
  from its value at `9bb306e`.
- The Output adds: which guide rows you corrected, and the `integration.test.ts:92` reading
  taken from the built cascade before and after (read it, do not edit it).
