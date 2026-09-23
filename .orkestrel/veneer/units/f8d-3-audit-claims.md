# F8d IMPORTANCE-LONGHANDS, round 3 (the prose and guard micro-round) — audit claims

## Subject

The F8d round-3 writes in `/home/user/veneer-f8d` (detached at `cdf7f55`, the round-1, round-2, and
round-3 writes uncommitted in the tree), written by `builder` on Sonnet from
`/home/user/veneer-f8d/tmp/units/f8d-brief-3.md` (the successor carrying the fix-round findings of
`/home/user/scaffold/.orkestrel/veneer/units/f8d-fix-audit-verdict.md`: the bare code tokens in the
changed comments, the header, the remark, and one guide clause; the branch case's reading going
vacuous; the freeze assertions' placement) over the round-2 writes. Rounds so far: round 1
(analyst FAIL 3, 4, 5, 6 with O1; reviewer FAIL 3, 4, 5, 6, 7; checker FAIL 6), round 2 (analyst
FAIL 5, 6; reviewer FAIL 5, 6, 7 with one referral; checker PASS), this round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/f8d-3.diff` (the whole diff against `cdf7f55`),
`f8d-3-status.txt`, the round-2 diff `f8d-2.diff` (for the delta), the brief `f8d-brief-3.md`
(the prescribed text of every edit), and the report `f8d-report-3.md` (the gate table; plant A,
the guard reddening with `expected [ 'grid-column-start', …(1) ] to deeply equal []`; plant B, the
partial-importance case reddening with `expected [ 'col-1' ] to not include 'col-1'`; each green
after the exact reverse edit). The plant readings are the writer's.

## What the round decides

Whether F8d lands on the session branch (base `cdf7f55`) with these writes, and whether the guard
shape stands: `declared` taken through `requireValue` from `longhands.get('col-1')` and each
`standalone` snapshot held to carry every declared longhand
(`expect(declared.filter((property) => !snapshot.has(property))).toEqual([])`), and the freeze
assertions in the `server setup` inventory case.

## Already established — do not re-run

The round-1 and round-2 rulings on claims other than the carried ones (one `LonghandRule`
declaration; the frozen record; the control rule distinguishing the `rule.properties` mutant; the
`arrayContaining` line removed); the analyst's `npm run check` exited 0 on round 2 and the writer
reports 0 on round 3; the sandbox for the objective lane is read-only with no browser and runs no
Vitest project (`npm run check`, `node -e`, and the Node readers are allowed); the Orchestrator's
landing chain settles the gates.

## Unknowns

- Whether the delta between `f8d-2.diff` and `f8d-3.diff` changed anything the brief did not
  prescribe: read the delta against `f8d-brief-3.md` § Edits.

## The threshold

`CONFIRMED` requires naming the attack that failed; a claim about a proof is ruled on the mutation
named and whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The delta between `f8d-2.diff` and `f8d-3.diff` consists of the edits
   `f8d-brief-3.md` § Edits prescribes (the comment of the branch case; `declared` through
   `requireValue`; the guard loop with its comment; the comment of the partial-importance case; the
   freeze assertions moved to the inventory case; the `table` comment; the header sentence; the
   `LonghandRule` remark; the guide clause) and nothing else; the status is the owned set of the
   three rounds and nothing else; `tmp/probe/` is absent.
2. **The guard binds.** In the branch case of `tests/service/tailwind/consumer.test.ts`, replacing
   `longhands.get(name) ?? []` with `[]` in the statement that builds `properties` reddens the guard
   (each snapshot lacking `grid-column-start` and `grid-column-end`), and no other assertion of the
   case reddens first; with the correct code the guard holds because `stage.read` returns a map
   keyed by the requested properties. Rule from the assertions and `stage.read` in
   `tests/setupService.ts`; name the settling command.
3. **The per-name plant still binds.** Replacing `properties.every((property) =>
   important.includes(property))` with `important.length > 0` in `collectImportantNames` reddens the
   partial-importance case's `expect(important).not.toContain('col-1')` (the writer's plant B
   record); rule from the assertions.
4. **The freeze assertions.** `expect(Object.isFrozen(SHARED_LONGHANDS)).toBe(true)` and the loop
   over `Object.values(SHARED_LONGHANDS)` sit at the end of the `server setup` inventory case in
   `tests/setupServer.test.ts` and nowhere else, the house pattern (`tests/setupService.test.ts`'s
   inventory case; `tests/setupStyles.test.ts`'s frozen-tables case).
5. **The prose.** Every changed comment, header sentence, remark, and guide clause carries the
   prescribed text: a noun after each code token (`grid-column-start` and `grid-column-end`
   longhands, the `col-1` rule and class, the `table` name, `LonghandRule` values, the
   `tests/setupService.ts` module, planted `!important` declarations), no banned term, no count of a
   growable set, no line past 100 columns, and no other sentence of the owned files changed.
6. **Law and scope.** Across the whole diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed directly (the guard's `filter` callback
   and the `requireValue` argument are such callbacks or expressions); readonly members. Run
   `npm run check` and report its exit code as evidence here (the objective lane).
