# F8d IMPORTANCE-LONGHANDS — audit claims

## Subject

The F8d unit's uncommitted writes in `/home/user/veneer-f8d` (detached at `cdf7f55`, the session
branch with F8c and FLOATING landed), written by `opus` from `/home/user/veneer-f8d/tmp/units/f8d-brief.md`
(the design fixed there: `StageRule.important`, `collectRuleLonghands`, the new
`collectImportantNames` signature, the equality case, the branch case's plant, the
partial-importance case). One round so far: this one. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/f8d.diff` (the whole diff against `cdf7f55`),
`f8d-status.txt`, and the report `/home/user/scaffold/.orkestrel/veneer/units/f8d-report.md` (the
Unknowns' answers, the failing-first record, the mutation record, the deviations). The mutation
readings are the writer's.

## What the round decides

Whether F8d lands on the session branch after the SELECT and mixin landings, and whether the
writer's recorded decisions stand: `LonghandRule` declared in `tests/setupServer.ts` with the same
members as `StageRule` (the import direction is `setupService` → `setupServer`), which the writer
flagged; a name with no longhands is not returned; the branch plant in the longhand form
(`grid-column-start: 5 !important; grid-column-end: 5 !important`); the exclusion reading as a
module-scope `exclusion` constant; the plants as case-local strings. The brief's evidence was wrong
on one fact (the instrument compiles `.col-1 { grid-column: 1 }`, not `span 1 / span 1`; Chromium
expands it to the same two longhands), which the writer recorded.

## Already established — do not re-run

The writer's gate table (`npm run check` 0; `test:setup` 236 passed; `build:src:styles` and
`test:service` 18 passed in 10.76 s; `test:guides` 18 passed) is the writer's reading; the
Orchestrator's landing chain settles it. Two earlier `test:setup` runs timed out under host load in
untouched oracle cases (the deciding re-run is the Orchestrator's). The sandbox for the objective
lane is read-only with no browser and runs no Vitest project: `npm run check`, `node -e`, and the
Node readers are allowed; the service proof's settling command is named where a claim needs it.

## Unknowns

- Whether Chromium's `getPropertyPriority` reading is stable across the shorthand forms the
  instrument emits (`grid-column: 1`): the writer measured `grid-column: 5 !important` expanding to
  both longhands important; rule whether the proof pins the case the consumer meets.

## The threshold

A finding is worth more than a clean pass: this round lands the rule the guide states. `CONFIRMED`
requires naming the attack that failed; a claim about a proof is ruled on the mutation named and
whether the assertions distinguish it. Rule every claim CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The rule runs per longhand.** `collectImportantNames(rules, longhands)` returns a name only
   when every longhand in `longhands.get(name)` is in the union of `important` over the rules whose
   selector's classes include the name, in the map's order; the writer's plant (the condition
   replaced by `important.length > 0`) reddens the partial-importance case and the
   `tests/setupServer.test.ts` case "keeps a name out whose importance covers only some of its
   longhands, or another longhand". Rule from the assertions whether they distinguish the per-name
   reading, and name the mutation each case would miss.
2. **`collectRuleLonghands`.** The union per name, in first-seen order, over the rules whose
   selector's classes include the name; its proof distinguishes a rule naming the class in a
   compound selector from one naming a different class, and a name no rule declares maps to an
   empty list (or is absent: rule which, and whether the equality case's reading needs one or the
   other).
3. **`StageRule.important` and `expand`.** `expand` fills `important` from
   `getPropertyPriority(name) === 'important'` per expanded longhand; the `expand` proof pins
   `grid-column: 5 !important` expanding to `grid-column-start` and `grid-column-end`, both
   important, and `important: []` on a normal rule; the proof's expectation of Chromium's order
   (normal declarations before important ones) is a measured fact rather than an authored one.
   Rule whether the proof would redden if Chromium withheld priority on an expanded longhand.
4. **The consumer proof.** The equality case reads the longhands from `stage.expand(instrumentProfile)`
   and the importance from `stage.expand(readBuiltCascade())`; the branch case plants both longhands
   important and reads what the rule claims; the partial-importance case plants one longhand and
   asserts `col-1` is not important and stays among the excluded names; the failing-first record
   (1 failed of 8, then 8 passed; 1 failed of 117, then 117 passed) binds the new case to the rule.
   Name the settling command for the browser readings.
5. **The interface.** `LonghandRule` in `tests/setupServer.ts` duplicates `StageRule`'s members;
   rule whether one declaration is the lawful shape (`StageRule` re-exported or declared as
   `LonghandRule`, given the import direction `setupService` → `setupServer`), per
   `architecture.md`'s centralization and `AGENTS.md`'s no-superfluous-wrapper law, and whether
   `LonghandRule` is the right name for a rule shape whose members are the selector, its longhands,
   and the important ones among them.
6. **The guide.** § Tailwind states the per-longhand rule once (the sentence "The importance branch
   runs over the names Veneer declares important on some longhand" is replaced by the per-longhand
   wording), the § Files `tests/setupServer.ts` row names the shared-name readings, and every
   changed sentence follows `writing.md` (a noun after each code token, no banned term, no count,
   prose lines at or under 100 columns).
7. **Law and scope.** Across the diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback; readonly members; no helper whose job an
   installed `@orkestrel/test` export does; the status is the six owned files and nothing else;
   `tmp/probe/` is absent. Run `npm run check` and report its exit code as evidence here (the
   objective lane).
