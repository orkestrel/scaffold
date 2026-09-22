# Unit CL9 brief 2 — the fix round the audit forced

## What changed and why

Brief 1 stands. This brief carries the findings round 1 forced and nothing else. The audit's full
reasoning is `.orkestrel/veneer/cl9-audit-verdict.md`; each finding below names the lane that found
it.

**Round 1 accepted your implementation.** Both judgment lanes independently reconciled the record
against the built cascade and agreed the key ships whole — twenty-nine recorded entries, nothing
extra, nothing deferred. The objective lane checked your downward arithmetic in binary64 at every
recorded boundary and showed the rounding is exact, and ruled the direction preserved because the
upward rewrite runs first and its output cannot match the downward pattern. Your departures, your
role-colour arithmetic, your responsive probe, and your loops all confirmed. Gates green on both
engines under an independent verifier. Nothing in this brief reopens any of that.

## Finding 1 — the even-child guard ignores an escaped colon (subjective lane, forcing)

**What the lane proved.** The branch you added to the shared selector normalizer guards on the
preceding character being a colon, to avoid rewriting inside a legacy pseudo-element. It tests that
character alone. So an escaped colon — one that is part of a class name — reads to it as a
pseudo-element marker and blocks the rewrite. A record spelling and a cascade spelling of the same
selector then stay distinct. The lane ran the shared presence scanner with one recorded and the other
emitted and got a missing-selector diagnostic.

**The fix is already written next door.** The guard immediately following yours, in the same
function, tests both the character and whether it was literal. Make yours do the same.

**This reaches every key, not only yours.** The conformance module imports this normalizer, so the
guard is wrong for every component's presence scan. The lane confirmed no already-shipped key's
normalization moves today, so this is a latent defect rather than a live regression — fix it as one.

Pin it with a case that goes through the **shared presence scanner**, not only through the
comparison, because that is where the blast radius lies. Prove the case fails with the guard as it
stands and passes after the fix.

## Finding 2 — the accent fallback is untested (subjective lane, forcing)

Your layering is legible and correct; the lane said so. But the case sets eight table variables and
never sets the accent one, while asserting the unstriped cell paints transparent. An unset variable
and a literal in the fallback's place both yield transparent, so that assertion cannot tell a chain
that reads the accent from one that ignores it. Replacing the final fallback with a literal would
pass every assertion in the case.

Set the accent variable to a distinct value, read it on an unstriped cell, and then verify the stripe
and state precedence while it remains set. Prove the corrected case fails when the final fallback is
replaced by a literal, and restore.

## Finding 3 — the partial re-declares the shared role list (objective lane, forcing)

Your role loop declares its own list, character for character identical to the token module's. Both
sibling component partials use the shared one instead. The styles rule requires driving a per-variant
block with one loop over a **shared** list.

Failure scenario the lane named: a role added to the token source reaches the sibling families and
not this one, and no gate sees it — because the record fixes this key's roles, and the
emitted-vocabulary comparison compares against the record rather than against the token source.

Use the shared list. The lane's reading is that this changes no emitted byte; confirm that by
comparing the built cascade before and after, and say so.

## Finding 4 — the freeze assertions are narrower than the siblings' (objective lane)

Your freeze loop omits one of the new tables entirely and checks only the container, where the grid
and link proofs also assert each row is frozen. Nothing is wrong today — the source is fully frozen —
but the assertion would not catch an unfrozen row added later. Add the missing table and the per-row
check.

## Finding 5 — the state iterations park the pointer (objective lane)

Each state iteration ends by hovering the cell and leaves the added class in place, and clearing the
specimen does not move the pointer. If a later iteration's cell lands under the resting cursor, a
reading resolves the hover paint instead of the one it set — which for one role differs from the
recorded stripe by enough to breach the tolerance. The same shape appears twice in the file.

Failure scenario: a layout change moves a specimen under the parked cursor and a contextual-colour
case reddens on a colour it never applied.

Release the state at the end of each iteration — move the pointer off the specimen, or remove the
added class — the way the earlier case in the same file already removes its class.

## Unknowns

- **Whether the corrected guard needs the same treatment anywhere else in the normalizer.** You are
  changing a shared function; read its other branches and say whether any has the same shape.
- **Whether pinning the escaped case through the presence scanner needs a fixture the tree does not
  have.** If it does, say what you added and where.

## Scope

Brief 1's owned set, unchanged. No new grant. `tests/setupConformance.ts` stays off-limits: the
normalizer you are fixing lives in `tests/setupStyles.ts`, which you own, and the conformance module
only imports it.

Do not touch the partial's rules beyond the role-list change, the guide rows, the conformance
listing, or the comparison's tuple. Round 1 accepted them.

## Execution

You are the engine reading this brief inside your own CLI. Perform the assignment directly and spawn
nothing. The working tree carries your own authored CL9 work; it is your output, not drift. HEAD is
the CL8b landing `8c70787`. Brief 1's host facts still hold.

## Output

1. The corrected guard, quoted beside its neighbour, with the presence-scanner case that pins it and
   its red-then-green proof.
2. The corrected accent case, with its red-then-green proof against a literal fallback.
3. The role-list change, with the before-and-after comparison of the built cascade showing no emitted
   byte moved.
4. Findings 4 and 5, each with what you changed.
5. Both Unknowns, with what you found.
6. The full gate chain's exit codes and final result lines, on managed Chromium and on Edge.
7. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: where the new cases
sit among their siblings, and how the state release is written. Stop and report if the role-list
change moves an emitted byte, if the guard fix would reach a file this brief does not grant, or if a
gate fails for a reason outside your owned files.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0, and the built cascade is unchanged by the role-list change, shown by a
   comparison rather than asserted.
4. The escaped-colon case fails with the guard as it stands and passes after the fix, shown through
   the shared presence scanner with its command and output.
5. The accent case fails when the final fallback is replaced by a literal.
6. `npm run test:setup` exits 0, including the widened freeze assertions.
7. `npm test` exits 0 whole.
8. The styles, browser-setup, and app-browser projects exit 0 on Edge.
9. The status lists only files the two briefs own.
