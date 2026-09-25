# TAILWIND-RECIPE audit round 2 — claims

Subject: TAILWIND-RECIPE round 2 in `/home/user/veneer-twr` (uncommitted over Veneer `21c821a`, both rounds), briefed by
`tailwind-recipe-brief-2.md`, which carries the findings `twr-audit-verdict.md` failed. Written by `opus` on Opus 5.5
and reported in `tailwind-recipe-report-2.md`. Evidence: `twr-2.diff` (`git diff 21c821a` plus the untracked fixtures),
`twr-2-status.txt`, and `twr-instruments/r2/` (the isolation probe and its log, the plant and gate drivers, the timing
readings, the R4 probe under `probe/`, and every log). All paths sit under `/home/user/scaffold/.orkestrel/veneer/units/`.
A mutation counts as a kill only when the failing case's message names an assertion failure. Rule every claim.

1. **Source isolation.** `compileProfile` in `tests/setupService.ts` compiles with the plugin's `base` option set to an
   empty scratch directory it creates and removes, so automatic source detection reads nothing the working directory
   carries, while imports and `@source` rules still resolve against the profile's own directory. Isolation removes only
   classes that repository text outside the markup generates, and changes no case's reading. The `compileProfile` case
   in `tests/setupService.test.ts` fails when `compileProfile` drops the `base` option.
2. **The markup line is load-bearing.** With `@source './markup.html';` removed from `consumer-preflight.css`, the
   preflight recipe's order case fails at `.px-8` with an `AssertionError` (`twr-2-plant-markup-final.log.txt`); with
   it removed from `consumer.css`, the consumer pairing's cases fail with assertions
   (`twr-2-plant-markup-consumer-final.log.txt`); and before the fix the same plant left `.px-8` green
   (`twr-2-plant-markup-before.log.txt`). Every sentence and comment that states the markup line's effect states what
   the cases prove.
3. **Fixture paths.** `TAILWIND_PATHS` holds `components` and a frozen `consumer` group keyed by profile (`tailwind`,
   `preflight`); every leaf key is one word, and the group shape follows `.claude/rules/names.md` where no single word
   names `consumer-preflight.css`. Every Tailwind test reads each fixture through a key, and no test resolves a fixture
   path of its own. The constant's TSDoc, its case title, and the § Files row are true. The exclusion-line census reads
   every recipe in the `consumer` group.
4. **The comparison helper.** `collectMovedLonghands` in `tests/setupServer.ts` is pure, never throws, and returns one
   line per moved longhand in reading order, with a missing value reported as `became undefined`; its cases in
   `tests/setupServer.test.ts` distinguish equal readings, a changed value, and a missing value; it is in the
   export-list case. Every inline copy of the moved-longhand report in `tests/service/tailwind/` goes through it, and
   the two sites the report leaves in place in `preflight.test.ts` are not copies of that report.
5. **The floors.** `COMPONENT_FLOOR` and `OVERLAP_FLOOR` are frozen exports of `tests/setupService.ts` with export-list
   rows, no test file declares a floor table, and `OVERLAP_FLOOR` names what the former `FLOOR_TAGS` bounds.
6. **Titles and prose.** The retitled order and component cases name what each asserts; the stage manager that serves the
   compiled recipe is `served`, and `recipe` names only a guide fence in `consumer.test.ts`; § Tailwind says "compiles
   each recipe as written", names the importance branch and the rule for leaving the exclusion line where the `gap-3`
   paragraph refers to them, and makes the consumer pairing the actor that mounts the components fixture; the edited
   prose follows `.claude/rules/writing.md` and states no count.
7. **R2 to R5.** The paired plant re-ran on the final `consumer.test.ts` and fails with assertions
   (`twr-2-plant-order-paired-final.log.txt`); `COMPONENT_TIMEOUT` is sized from the contended reading
   (`twr-2-timing-3.log.txt`, 9074 ms at load 20.50) plus slack, and its TSDoc records that run; the base-layer
   assertion fails on an empty `@layer base {}` block (`twr-2-base-probe.log.txt`); the gate driver echoes each command
   before it runs.
8. **The compiler type.** `importCompiler` and `ReadinessOptions.compiler` take the installed plugin's own type, so the
   compile can pass `base`, with no `as`, no `any`, and no assertion, and every other consumer of those names still
   typechecks.
9. **Scope and gates.** The status names only owned files; the hunks in `tests/setupServer.ts` and
   `tests/setupServer.test.ts` are the helper, its proof, its import, and its export-list row alone; the oxfmt check,
   `npm run check`, `npm run lint:check`, `npm run build:src`, `npm run test:service` (24 passed), the setup files
   (150 passed), `npm run test:guides`, and `npm run test:policy` exit 0 in `twr-instruments/r2/`.
10. **Test-file data outside this round.** `EXECUTED_SOURCE` and `SHIPPED_SOURCE` in `consumer.test.ts`, and `ORDER` and
    `CONTROL_VARIABLES` in `profiles.test.ts`, predate round 1 and are data tables that `.claude/rules/tests.md` §
    Shared test infrastructure places in a setup module.
