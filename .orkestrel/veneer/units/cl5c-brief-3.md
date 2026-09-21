# Unit CL5c — brief 3, the mark ruling's missing grants

Succeeds `units/cl5c-brief-2.md`, which with `units/cl5c-brief.md` beneath it stays in force for
everything this brief does not name. Both are left unedited.

What changed and why: you stopped on obligation 2's mark ruling and reported two files the brief
did not grant. **Your deviation report is correct on both readings, and the scope was short, not
the ruling.** This brief grants exactly those two files and nothing else. Every other obligation
you closed stands; do not redo any of it, and continue from your own working tree.

## The Orchestrator's defect, stated so the record is honest

Brief 2's correction was drafted against the styles rule's prose and checked against neither the
shared-block sweep CL5b had just landed nor the registry partition the token proof asserts. Both
were knowable before dispatch and one of them the Orchestrator had commissioned. Your hypothesis
names this exactly.

**Reading 2 is the gate working as designed.** CL5b shipped that sweep so a duplicated block
reddens the suite the moment it is written rather than surfacing in an audit two rounds later.
It did precisely that, on the first unit to write one after it landed. That is a validation, not
an obstacle, and you were right to refuse every alternative inside the granted scope: perturbing
a property's spelling to drop the intersection games the instrument, and leaving the tag on the
user-agent rule makes the twin equal by coincidence, which is the property the ruling exists to
establish.

## The grants

1. **`src/styles/_mixins.scss`, for one mixin and nothing else.** The shared treatment, named for
   what it emits in the file's established vocabulary, beside `heading-text` and `image-size`
   which CL5b landed. Both the tag partial and the class partial include it and keep their own
   selectors. Change no existing mixin.

2. **`src/core/constants.ts`, for two registry leaves and nothing else.** The Orchestrator read
   the file: the `text` group carries a `highlight` leaf at `:133` and the `surface` group carries
   one at `:149`. Add a `mark` leaf beside each. The registry path law gives the names without a
   choice, since a leaf's value is `--vn-` plus its registry path joined with hyphens: the text
   leaf is `--vn-text-mark` and the surface leaf is `--vn-surface-mark`, which are the names your
   patch already proposed.

`tests/src/styles/tokens.test.ts` asserts the root partition equals the registry, so it should
pass once the registry carries the leaves, without being edited. If it still refuses, stop and
report rather than editing it: that would mean the partition has a second author this brief has
not found.

## The Unknown this brief does not settle

Whether any gate requires a guide row for a new token. The Orchestrator found the guide read by
the guides proof, the conformance setup, and the styles setup, and found no assertion comparing
the guide's token table against the registry, but did not prove the absence.

**So: write no guide row unless a gate refuses without one.** If one does, write the row itself
and nothing around it, name the gate and its message in your report, and keep every other guide
section untouched. Guides are the bare minimum to pass, which is the user's standing ruling.

## Scope

Briefs 1 and 2's owned set, plus the two files named here for the purposes named here, plus
`guides/veneer.md` for a single token row **only if a gate refuses without it**. Everything else
stays off-limits, including every other partial, `tests/setupConformance.ts`, `tests/fixtures/**`,
`package.json`, and the vendored files.

## Execution

1. The mixin, the two registry leaves, the two tokens in `src/styles/_tokens.scss`, and the two
   includes.
2. `npm run build:src:styles`, then the tag's proof unedited, then `npm run test:setup` so the
   sweep rules on the result, then the token proof.
3. The comparison case your patch describes: mount the tag and an element carrying the class in
   one host and assert the resolved paint and padding equal. Prove it can fail.
4. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5c-report-2.md` in the Veneer checkout and return it: the mixin's name and its
consumers; the two registry leaves; the tag's paint before and after; the sweep's result; the
comparison case and the mutation that reddens it; whether a gate required a guide row and which;
each step's exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`. Keep it short.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol, with every stop condition briefs 1 and 2 carry.
Settle yourself: the mixin's name; where the comparison case sits. **Stop and report** if the
tag's resolved paint moves, if the token proof still refuses after the registry carries the
leaves, or if closing this needs a file beyond the two granted here and the conditional guide row.

## Acceptance criteria

1. An element carrying the mark class and the bare mark tag render the same paint and padding,
   because both include one mixin reading two tokens, proved by a comparison in one host, and a
   divergence reddens it.
2. The tag's resolved paint is unchanged from `4f817db`, shown by a reading before and after, and
   the tag's existing proof passes unedited.
3. `npm run test:setup` reports no shared written declaration block.
4. The token proof passes with the registry carrying the two leaves and no edit to that proof.
5. `src/core/constants.ts` gains exactly two leaves and `src/styles/_mixins.scss` exactly one
   mixin.
6. Every gate exits 0 on managed Chromium and Edge.
7. The status lists only the files briefs 1 to 3 own.
