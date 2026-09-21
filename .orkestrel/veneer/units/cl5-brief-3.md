# Unit CL5 — fix round (brief 3)

Succeeds `units/cl5-brief-2.md`, which with `units/cl5-brief.md` beneath it stays in force for
everything this brief does not name. Both are left unedited. What changed and why: CL5's round-1
audit (`.orkestrel/veneer/cl5-audit-verdict.md`) ran four lanes. The verifier's chain is green on
both browsers, the checker accepts, and **two** findings come back to you. Both are proofs that
cannot fail on the thing they exist to catch. Both are inside the set briefs 1 and 2 grant you.

The audit also raised guide-row findings. The user has ruled that this campaign's audits cover
implementation only and that guide prose is the bare minimum to pass, so those are recorded as
bounds for the unit that owns the guide and are **not** in this round. Do not touch
`guides/veneer.md`.

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `5240e36`, with your own CL5 work in the working
tree. Continue from it without restoring or resetting anything. Perform the assignment directly
and spawn nothing.

## The findings

1. **The heading twin's colour assertion cannot fail (subjective lane, finding 12).**
   `tests/src/styles/components/type.test.ts:36` is the only colour assertion on the class, and
   it compares against the value the class inherits from the host's own inline colour, because
   `--bs-heading-color` resolves through `--vn-text-heading` to `inherit`. Deleting
   `color: var(--bs-heading-color)` from `src/styles/components/_type.scss` leaves that assertion
   green, and it is the one declaration of the twin block the case does not compare against the
   tag. The proof one directory over already carries the control:
   `tests/src/styles/elements/heading.test.ts` mounts a host with an explicit
   `--bs-heading-color` and reads it back. Give the class case the same host and read both the
   tag and the class through it, so deleting that declaration reddens and every declaration of
   the twin block is pinned.

2. **The token retune proves one level out of twelve (objective lane, claim 3).**
   `tests/src/styles/components/type.test.ts` retunes one size token and one display token and
   reads them back through one heading level and one display level. Every other level is asserted
   against its default value only, so a literal equal to a level's default would pass unnoticed
   there. The source is a loop today, which is why the two lanes disagreed on whether the claim
   holds; the proof's job is to catch the edit that replaces the loop. Extend the retune so every
   heading level and every display level is read back through a retuned token. Keep the existing
   default-value cases.

## Not yours

The audit assigned these elsewhere. Do not act on any of them and do not widen your scope to
reach them:

- The heading block and the image sizing block duplicated across the element and component
  folders. A successor owns the element partials and the mixins file; your sweep was correctly
  bounded and your carried finding was right.
- The three specimen sections sharing one body. A successor owns all three section files.
- `.mark`, `.figure`, and `.figure-caption` disagreeing with the tags beneath them. A successor
  owns the element partials involved.
- Every guide-row finding, including the heading row's condition clause and the unrecorded
  block-axis rewrites. The unit that owns the guide carries them.

## Scope

Briefs 1 and 2's owned set, minus `guides/veneer.md`, which this round does not touch. Nothing is
added. `src/styles/elements/**`, `src/styles/_mixins.scss`, `tests/setupConformance.ts`,
`tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files stay off-limits.

## Execution

1. Finding 1 first, with the red proof: delete the colour declaration, run the type proof, record
   the failure, restore it, and record the green run. That ordering proves the control before the
   matrix grows around it.
2. Finding 2, then run the type proof.
3. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5-report-2.md` in the Veneer checkout and return it: each finding's change with
its site; the red-then-green pair for finding 1; the retune matrix's shape and what it reads;
each step's exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`; every plant's removal. Keep it short: what
changed, what it reads, what ran.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol, with every stop condition briefs 1 and 2 carry.
Settle yourself: how the retune matrix is written; where the colour host sits in the case.
**Stop and report** if the colour control cannot be made to fail, if a retuned level reads a
value the loop does not explain, or if closing a finding needs a file this brief does not grant.

## Acceptance criteria

1. Deleting the class block's colour declaration reddens the type proof, recorded red then green.
2. Every heading level and every display level is read back through a retuned token, and the
   existing default-value cases still stand.
3. `guides/veneer.md` is absent from the diff.
4. Every gate exits 0 on managed Chromium and Edge.
5. The status lists only the files briefs 1 and 2 own, plus the barrel proof already declared.
