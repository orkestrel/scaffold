# Unit CL4 — the remaining Reboot tags and the `reboot` key (brief 3)

Succeeds `cl4-brief-2.md`, which with `cl4-brief.md` beneath it stays in
force for everything this brief does not name. Both are left unedited. What changed and why: you
stopped under brief 2 (`cl4-report.md`) because the built cascade emits `:before` and
`:after` where the pinned inventory carries `*::before` and `*::after`, and every file that could
close the gap was off-limits. **The stop was right and the finding is real.** This brief rules it
and grants what the ruling needs.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `d822d59`, with your own
unfinished CL4 change in the working tree: `guides/veneer.md` carries the `reboot` row as
`shipped` and its `Excluded` rows, and `tests/conformance.test.ts` reads
`['btn', 'reboot']`. Continue from that state without restoring or resetting anything. Perform
the assignment directly and spawn nothing.

## The ruling

`*::before` and `::before` and `:before` select the same elements. The minifier
(`cssMinify: 'lightningcss'`) legitimately downlevels the authored `*::before` to the legacy
`:before`, so the cascade ships the selector and the scan reports it missing because it compares
text rather than meaning. The defect is in the comparison, not in `_reset.scss` and not in your
partials. Do not change `src/styles/_reset.scss`, do not re-author the selector to defeat the
minifier, and do not exclude a selector that ships.

**I measured the blast radius before ruling, and it is two selectors.** Reading the pinned
inventory's 117 `reboot` selectors against the built cascade by the scan's own rule: 64 are
absent, and of those exactly two — `*::before` and `*::after` — are present under the equivalence
this brief grants. The other 62 are the tags you have not shipped yet plus the eight excluded
combinations, which is your ordinary work. So the grant below closes exactly the spelling gap and
nothing else, and if it closes more than two you have made it too wide.

## What this brief grants

`tests/setupStyles.ts`, for `normalizeComplexSelector` alone, and `tests/setupStyles.test.ts`,
for its cases. Add a canonicalization to that function, narrow and proven:

1. Fold a legacy single-colon pseudo-element to its double-colon form, for the four the CSS
   specification defines that way and no others: `:before`, `:after`, `:first-line`,
   `:first-letter`. A single-colon pseudo-class must not be touched, so match the four names
   exactly and only where a pseudo-element is legal.
2. Drop a universal that precedes a pseudo-element in the same compound, so `*::before` and
   `::before` canonicalize together. Do not drop a universal anywhere else: `* + *` and
   `.a *` keep theirs.

Its proof in `tests/setupStyles.test.ts` must show, with cases that fail before your change:

- the four legacy spellings canonicalize to their double-colon forms, and a pseudo-class with a
  similar name (`:first-child`, `:focus`) does not;
- `*::before`, `::before`, and `:before` all canonicalize to one string;
- `* + *`, `.a *`, and `a *::before` keep the universals the rule does not target;
- **a genuinely absent selector still reports absent**: the canonicalization must not make the
  scan pass for a selector the cascade does not ship in any spelling. Prove it by canonicalizing
  a selector the built cascade has no equivalent of and reading that it is unchanged and still
  missing.

Record in your report, from the built cascade and the pinned inventory: how many inventory
selectors the exact rule misses before your change and after it, so the record shows the
canonicalization closed two and left your own work to you.

## Everything else

Brief 1's and brief 2's Objective, Context, Scope, Execution, Output, Deviation contract, and
Acceptance criteria stand, with these additions:

- Scope gains the two files named under § What this brief grants, for those purposes only.
  `tests/setupConformance.ts`, `src/styles/_reset.scss`, `tests/fixtures/**`, and the vendored
  files stay off-limits.
- Your Output adds the before-and-after miss counts and the canonicalization's cases.
- Acceptance criterion: `npm run test:conformance` is green with the `reboot` row `shipped`,
  `listed` reading `['btn', 'reboot']`, every partial landed, and red on any one shipped selector
  removed from its partial — the criterion brief 1 already carries, now reachable.
- Your Deviation contract keeps brief 2's addition and gains one: **stop and report** if the
  canonicalization would have to widen beyond the two rules above to make the scan green. That
  would mean the cascade ships a selector in a form this ruling did not anticipate, which is my
  decision, not yours.
