# TAILWIND-RECIPE audit — claims

Subject: TAILWIND-RECIPE in `/home/user/veneer-twr` (branch `unit/twr`, uncommitted over Veneer `21c821a`), briefed by
`tailwind-recipe-brief.md` to carry claim 11 and finding F2 of the tenets audit. Written by `opus` on Opus 5.5 and
reported in `tailwind-recipe-report.md`. Evidence: `twr.diff` (`git diff 21c821a`, with the two untracked fixtures'
diffs appended), `twr-status.txt`, and `twr-instruments/` (the plant drivers `twr-plant.sh` and `twr-plant.py`, the gate
driver `twr-gates.sh`, and the logs). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's
prose is not a claim subject. A mutation counts as a kill only when the failing case's message names an assertion
failure. Rule every claim.

1. **The fence is held line for line.** `tests/fixtures/tailwind/consumer-preflight.css` equals the `preflight` fence
   in `guides/veneer.md` § Tailwind apart from the `@source` line, which names the fixture markup. The rewritten case
   `the consumer pairing > executes each recipe the guide ships, apart from the markup line each one names` reads both
   fences from the guide and compares each with its fixture, so a guide edit that drops the order line, swaps two
   layers, or drops the Veneer import fails it (`twr-plant-order.log.txt`, `twr-plant-swap.log.txt`,
   `twr-plant-import.log.txt`).
2. **The compiled order is asserted.** `the preflight recipe > compiles to the order the cascade puts the document in,
   with Tailwind's reset in its base layer` reads the compiled recipe's layer order and the location of Tailwind's
   reset, and fails under the paired order, swap, and import plants.
3. **No component class loses a longhand, and the case can see one lose.** `keeps every longhand a component rule
   declares where the cascade alone resolves it, and moves one when the order line is dropped` derives, in Chromium,
   the longhands Tailwind's reset and each component class in `tests/fixtures/tailwind/components.html` both write,
   asserts that each resolves the same on the recipe page as on the cascade alone, and asserts that a control page
   built without the order line moves at least one. The derivation runs every time and names no longhand list by hand.
4. **Shared names resolve.** `leaves every shared name resolving, on the recipe alone, what the cascade resolves over
   Tailwind's reset` holds every name the two cascades share, and the paired exclusion plant fails it
   (`twr-plant-exclusion-paired.log.txt`).
5. **The recipe page is real.** The recipe page links the compiled recipe alone through a `StageManager` over a scratch
   directory, as `tests/setupService.test.ts` does, so the order line takes effect; no page stacks the recipe over an
   already-linked cascade.
6. **The prose reads whole and is true.** The § Tailwind prose the tenets audit found garbled reads as whole sentences,
   and every sentence the unit added or changed in § Tailwind, § Files, and § Tests states only what the cases execute.
7. **Fixture paths and repeated code.** The two fixtures resolve inside `consumer.test.ts` rather than through
   `TAILWIND_PATHS` in `tests/setupService.ts`, so `TAILWIND_PATHS`' TSDoc no longer lists every fixture, and the
   snapshot comparison expression is repeated inline across cases. Rule whether each is a defect under `AGENTS.md`
   (Centralize by kind; Consolidation) and `.claude/rules/tests.md` § Shared test infrastructure, and what closing it
   requires.
8. **Gates.** `npm run check`, `npm run lint:check`, the scoped oxfmt check, `npm run build:src`, `npm run
   test:service` (24 passed), `npm run test:guides`, and `npm run test:policy` exit 0 in `twr-instruments/`.
9. **Scope and law.** `twr-status.txt` names only `guides/veneer.md`, `tests/service/tailwind/consumer.test.ts`, and the
   two new fixtures; `src/**` is unchanged. The diff adds no `any`, prohibited assertion, non-null assertion,
   suppression, nested function declaration, hidden helper, mock, or fake; every literal it asserts is a reading; each
   case title states what the case proves.
