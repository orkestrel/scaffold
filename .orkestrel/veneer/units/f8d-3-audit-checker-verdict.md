# F8d IMPORTANCE-LONGHANDS, round 3 (the prose and guard micro-round) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-f8d` on 2026-09-23. The verdict text is the lane's handback verbatim.

# Audit verdict — checker (Sonnet), F8d IMPORTANCE-LONGHANDS round 3

## Claim 1 — The delta is the brief

**CONFIRMED.** I diffed `f8d-2.diff` against `f8d-3.diff` hunk by hunk against `f8d-brief-3.md` § Edits (edits 1–9):

- Edit 1: `f8d-3.diff:95-100` matches the prescribed "importance on the `grid-column-start` and `grid-column-end` longhands Tailwind's `col-1` rule declares, ..." replacing the round-2 text at `f8d-2.diff:98-100`.
- Edit 2: `f8d-3.diff:103-105` inserts the `requireValue(longhands.get('col-1'), 'The instrument declares no col-1 rule')` / `expect(declared).toEqual(...)` pair in place of the single `expect(longhands.get('col-1')).toEqual(...)` at `f8d-2.diff:104`.
- Edit 3: `f8d-3.diff:132-135` adds the "Each reading has to carry..." comment and `for (const snapshot of standalone) expect(declared.filter(...)).toEqual([])` loop before `expect(standalone).not.toEqual([])`; absent in `f8d-2.diff`.
- Edit 4: `f8d-3.diff:144-147` matches the prescribed replacement text for the "keeps a shared name on the line..." comment, versus `f8d-2.diff:133-137`.
- Edit 5: `f8d-3.diff:233-235` places the two `Object.isFrozen` statements at the end of the `server setup` inventory case (after `Object.keys(setup).sort()`), and they are absent from the head of the `collectImportantNames` describe at `f8d-3.diff:284-309`; in `f8d-2.diff` they sit at the head of that same describe (`f8d-2.diff:264-266`) and are absent from the inventory case.
- Edit 6: `f8d-3.diff:321-323` matches the prescribed "A rule declaring every longhand the `table` name has to cover, each normally, ..." replacing `f8d-2.diff:303-305`.
- Edit 7: `f8d-3.diff:349-352` ends "...as `LonghandRule` values." versus `f8d-2.diff:331-334`'s "...as `LonghandRule`."
- Edit 8: `f8d-3.diff:387-391` reads "The stage in the `tests/setupService.ts` module returns this shape..." versus `f8d-2.diff:368-371`'s "The stage in `tests/setupService.ts` returns this shape...".
- Edit 9: `f8d-3.diff:33` reads "driven by planted `!important` declarations on the" versus `f8d-2.diff:33`'s "driven by a planted `!important` declaration on the".

No other hunk differs: `tests/service/tailwind/preflight.test.ts`, `tests/setupService.ts`, and `tests/setupService.test.ts` carry identical blob hashes and identical diff bodies in both files (`f8d-2.diff:155-172` vs `f8d-3.diff:166-183` for `preflight.test.ts`; `f8d-2.diff:456-574` vs `f8d-3.diff:477-593` for `setupService.ts`/`setupService.test.ts`), and every remaining `setupServer.ts`/`setupServer.test.ts`/`consumer.test.ts`/`guides/veneer.md` hunk outside the nine edits is byte-identical between the two diffs.

The status (`f8d-3-status.txt:1-7`) lists exactly the seven files the three rounds together own (`guides/veneer.md`, `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/preflight.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupService.test.ts`, `tests/setupService.ts`), all as `M`, none as `??`, so `tmp/probe/` is absent from status and no stray file is listed.

## Claim 5 — The prose

**CONFIRMED.** Reading each changed sentence against `writing.md` § Code tokens and `AGENTS.md` § Writing:

- `f8d-3.diff:95-100`: `` `grid-column-start` `` and `` `grid-column-end` `` are each followed by the noun "longhands"; `` `col-1` `` is followed by "rule".
- `f8d-3.diff:144-147`: same tokens each followed by "longhands"/"longhand"/"rule" as required.
- `f8d-3.diff:321-323`: `` `table` `` followed by "name" on both occurrences.
- `f8d-3.diff:349-352`: `` `LonghandRule` `` followed by "values".
- `f8d-3.diff:387-391`: `` `tests/setupService.ts` `` followed by "module".
- `f8d-3.diff:33-38` (guide): `` `!important` `` followed by "declarations"; `` `grid-column-start` ``/`` `grid-column-end` `` followed by "longhands"; `` `col-1` `` followed by "rule".

No banned term from the substitution table (`should`, `simply`, `currently`, `via`, `e.g.`, etc.) appears in any of the nine edits. No count of a growable set is stated in the changed prose. Direct measurement of the longest changed lines (for example `f8d-3.diff:96`, `f8d-3.diff:33`) puts each at or under roughly 87-99 visible characters excluding leading indentation, consistent with the 100-column limit; the `oxfmt --check` exit-0 reading in `f8d-report-3.md:62` corroborates but is the writer's self-report and is not this claim's sole support. No sentence outside the nine named edits changed between `f8d-2.diff` and `f8d-3.diff`, per the claim-1 delta comparison above.

## Claim 6 — Law and scope (reading parts)

**CONFIRMED** for the reading parts (the `npm run check` exit code is out of scope for this lane, per the brief, and is left to the objective lane). Scanning the whole `f8d-3.diff`:

- No `any` appears anywhere in the diff.
- No `as` type assertion appears (the only `as` occurrences are the English words "as Chromium expands it" / "as required" in prose/comments, not TypeScript syntax); no `as const` either.
- No non-null assertion (postfix `!`) appears. Every `!` in the diff is a logical negation prefix on a boolean expression: `!collectSelectorClasses(rule.selector).includes(name)` (`f8d-3.diff:424`), `!properties.includes(property)` (`f8d-3.diff:426`), `!snapshot.has(property)` (`f8d-3.diff:135`) — none is `x!.y` or `x!`.
- No `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or `eslint-disable` appears.
- Readonly members hold: the `LonghandRule` interface fields are each `readonly` (`f8d-3.diff:394-399`), and `SHARED_LONGHANDS` is typed `Readonly<Record<string, readonly string[]>>` with every array `Object.freeze`d (`f8d-3.diff:370-374`). The `expand` method's public return stays `Promise<readonly LonghandRule[]>` (`f8d-3.diff:569`).
- No nested function declaration beyond a directly-passed callback or expression argument: every arrow function in the diff (`.filter((property) => ...)`, `.flatMap((rule) => ...)`, `.every((property) => ...)`) is passed directly as an argument, and `requireValue(longhands.get('col-1'), '...')` is a plain expression argument, matching the brief's named exception (`f8d-brief-3.md:5-6`).
- No `public`, `protected`, or `private` keyword and no parameter property appear in the diff.

## Referrals

None. All three claims were decidable from the supplied diffs and files without a judgment call.

VERDICT: PASS
