# Unit CL7 — fix round (brief 3)

Succeeds `units/cl7-brief-2.md`, which with `units/cl7-brief.md` beneath it stays in force for
everything this brief does not name. Both are left unedited. What changed and why: CL7's round-1
audit (`.orkestrel/veneer/cl7-audit-verdict.md`) ran four lanes and every one accepted. The
verifier's chain is green on both browsers, and both engines independently compiled the partial
and compared the built cascade against the pinned inventory.

Two findings come back, neither forced by a lane. Both are inside the set briefs 1 and 2 grant
you, and the first is a silent-failure path that the user's baseline ruling makes worth closing
now rather than carrying.

## The findings

1. **The cap loop is bound to the ramp; the container token set is not.** The loop emits a cap
   reading `--vn-container-<name>` for every non-zero member of the ramp, but nothing asserts
   that the ramp's non-zero names and the container token keys are the same set. The only
   ramp-to-token assertion runs one way: it checks that each width case has a breakpoint case.

   **Failure scenario, and it is silent.** A later layout unit adds a ramp boundary. The loop
   emits a cap rule whose variable names an undeclared property, the declaration is invalid at
   computed-value time, and the maximum width falls back to none. That boundary then caps
   nothing, while the token partition proof, the presence scan, and the container proof all stay
   green, because each checks a different thing and none checks this.

   Add one assertion in the styles setup proof that the non-zero ramp names and the container
   token keys are the same set, in both directions. Prove it can fail: add a ramp member without
   its token, record the red run, remove it, record the green run.

2. **The container proof's direction axis cannot fail.** Every property it asserts is
   direction-symmetric under the writing mode it runs in: the widths come from logical
   properties, and both physical paddings and both physical margins are asserted equal to each
   other. So the second direction cannot fail unless the first already has, and it doubles the
   viewport round-trips for no reading. It is also the only direction axis anywhere under the
   styles proofs, so it diverges from every sibling, and the user has ruled that this campaign
   spends nothing on direction variation.

   Remove the direction axis and keep every reading it was wrapping. Report the case count and
   the suite's duration before and after, so the saving is on the record.

## Not yours

The audit raised three more. Do not act on any of them.

- Two cosmetic ordering slips and one annotation that names a type its siblings leave implicit.
  No gate reads either and neither has a failure scenario; they go to the unit that next owns
  each file.
- The guide's token table describes the space member as read by the gutter scale, which this unit
  made false, and the new container and gutter tokens have no row there. No gate requires either.
  Both belong to the guide's owner.

## Scope

Briefs 1 and 2's owned set, unchanged. Nothing is added.

## Execution

1. Finding 1, with its red proof.
2. Finding 2, with the before and after case count and duration.
3. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `tmp/units/cl7-report-2.md` in the Veneer checkout and return it: the new assertion and its
red-then-green pair with the plant's removal; the direction axis removed with the case count and
duration before and after; each step's exit code and final lines on both engines; the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`. Keep it short.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol, with every stop condition briefs 1 and 2 carry.
Settle yourself: where the set assertion sits and how it is written. **Stop and report** if
removing the direction axis changes any reading, or if the set assertion cannot be made to fail.

## Acceptance criteria

1. The non-zero ramp names and the container token keys are asserted equal as sets in both
   directions, and adding a ramp member without its token reddens that assertion, recorded red
   then green.
2. The container proof carries no direction axis, every reading it had is retained, and the case
   count and duration before and after are in the report.
3. Every gate exits 0 on managed Chromium and Edge.
4. The status lists the same paths as round 1, with no addition.
