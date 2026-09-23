# F8c-B MOVE — audit claims

Subject: the F8c-B unit's uncommitted writes in `/home/user/veneer-f8b` over the checkpoint
`b9c0b0a` (F8c-A READERS as accepted after its round-3 audit), written by `opus` from
`/home/user/veneer-f8b/tmp/units/f8c-b-brief.md` under the design
`/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md` (rulings 1, 4, 5, 6, 8; D23, D24; the
round-3 claim 8 carried). Evidence: `/home/user/scaffold/tmp/audit/f8c-b.diff` (the whole diff,
untracked files as additions, deletions included), `f8c-b-status.txt`, the report
`/home/user/scaffold/tmp/audit/f8c-b-report.md`; the mutation instrument and log sit at
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8cb-mutate.py` and
`f8cb-mutations.log.txt`. The deleted browser proofs are readable at
`git show b9c0b0a:tests/tailwind/profiles.test.ts` (and `shared.test.ts`, `preflight.test.ts`) for
the case-by-case comparison. Every lane rules each claim CONFIRMED, BROKEN, or UNRESOLVED with
`file:line`; a claim about a proof is ruled on the mutation named and whether the assertions
distinguish it.

1. **The service proofs keep every measured fact.** `tests/service/tailwind/profiles.test.ts`,
   `consumer.test.ts` (from `shared.test.ts`), and `preflight.test.ts` run in Node under the
   `service` project; structural readings go through `new SheetReader(css)` (`statement`, `order`,
   `layers`, `variables`, `selectors`, `names`, `declarations`), computed readings through `stage`
   (`open` in `beforeAll`, `clear` in `afterEach`, `destroy` in `afterAll`; `read`, `load`,
   `expand`); the profiles compile through `compileProfile` from their own paths at module top
   level; the guide's fences through `collectFencedBlocks(readFileSync(VENEER_GUIDE_PATH, 'utf8'))`;
   no `?raw` or `?inline` import remains; `CANDIDATE_FLOOR` is imported, not repeated. Compare each
   deleted case with its successor per the report's tables: every assertion naming a measured fact
   survives or is replaced by one the report names (`reads Veneer's sheet while a Tailwind
   stylesheet is loaded` → `fills the preflight theme block with no token in Veneer's namespace`,
   with `readCascadeSheet` still proved in `tests/setupBrowser.test.ts` and
   `tests/src/styles/index.test.ts`; the important-branch case narrowed to the longhands Tailwind's
   own rule declares, observation 3, while `leaves every shared name resolving …` still compares
   every longhand). Rule whether the narrowing keeps the guide's claim that Bootstrap wins every
   shared name, and whether the structural document-order reading (observation 1) proves what the
   old live-document reading proved.
2. **The deletions are complete and nothing dangles.** `tests/tailwind/` (three files and the
   directory), `configs/src/vite.tailwind.config.ts`, the `test:src:tailwind` script and its
   `test:src` clause are gone; `tests/setupBrowser.ts` and its proof lose `loadSheet`,
   `readLayerStatement`, `collectFilledLayers`, `collectSelectors`, `collectClassNames`,
   `collectSharedNames`, `collectDeclaredProperties`, `readComputedSnapshot`, `InlineSource`, and
   `collectInlineSources` with their cases and inventory rows; `readCascadeSheet`'s TSDoc points at
   `tests/src/styles/index.test.ts` and `tests/setupBrowser.test.ts`; every name ruling 1 keeps is
   kept; the kept cases load sheets through `scene.load(...).sheet`; the report's `grep -rnw`
   readings reproduce (no consumer of a deleted name under `tests src app configs guides`; the
   criterion-6 grep returns nothing); readiness is the only writer of `tmp/tailwind/candidates.txt`.
3. **`tests/setup.css`.** The header comment names the `service` project, readiness deriving and
   writing the candidate list, and the exclusion line's role; every non-comment line is
   byte-identical to `b9c0b0a` (rule with a `diff` of the lines after the comment).
4. **The guide, the README, and the roadmap** (ruling 6). § Files: the wrapper row gone,
   `tests/tailwind/` → `tests/service/tailwind/`, a `tests/setupService.ts` row in the table's
   grammar; the profile table's proof links and every inline proof link to the new paths
   (`shared.test.ts` → `consumer.test.ts`); the import-placement sentence narrowed to Vite's bundled
   `postcss-import` with the recipe import-first; the executed-recipe paragraph's resolution
   sentence; the service-project paragraph in place of the wrapper paragraph (`npm run
   test:service`, `prepublishOnly`, readiness verifying the compiler, the cascade, the browser, and
   the list); the § Departures rows naming the wrapper; § Scripts gains `test:service`; § Tests names
   the three pairings at their paths; F8b F6 struck with its comment and its case retitled; the
   guide sentence on the important branch ends "for every property that rule declares";
   `guides/README.md`'s Veneer row takes `[tests/service](../tests/service)` and its stylesheet
   paragraph names the Tailwind proofs; `ROADMAP.md`'s F8 row states F8c's shape without a count,
   and the mirror-law standing-condition row's path reads `tests/service/tailwind/` (deviation 1,
   accepted as a true-fact fix). Prose follows `writing.md`; most of the `guides/veneer.md` diff is
   table re-padding.
5. **D24 lands.** `tests/conformance.test.ts`'s forbidden-runtime case skips
   `tests/setupService.ts`, `tests/setupService.test.ts`, and every path under `tests/service/`
   with the reason beside the filter; the bundle and manifest cases are unchanged; with the
   exemption transiently removed the case reads `1 failed | 16 skipped (17)` naming
   `@tailwindcss/postcss` at `tests/setupService.ts` and the file's SHA-256 `0b099508…c1f41b`
   is restored; no other path is exempt.
6. **The round-3 claim 8 lands.** `resolveBrowserTarget` returns `undefined` when `connectOptions`
   is present, before the pinned fallback; `Readiness` gains `endpoint` (deviation 2, accepted: the
   pure leaf needs the evidence to tell the refusals apart) filled from `connectOptions?.wsEndpoint`;
   `scanReadiness` refuses an endpoint first with the sentence naming the local-browser
   requirement and `PLAYWRIGHT_WS_ENDPOINT`, then a missing executable with the existing install
   sentence; `PASSING_READINESS` carries `endpoint: undefined`; the endpoint case asserts the
   `undefined` target beside a pinned executable and the refusal sentence; the pre-fix code reddens
   it (`1 failed | 22 passed (23)`); the channel and executable branches are unchanged.
7. **The mutations bind.** `container` removed from the exclusion line reddens three profiles cases
   (`3 failed | 14 passed (17)`); the departure row `a` / `border-bottom-style` removed from the
   guide table reddens the preflight moved-properties case; the cascade import moved after the
   `@source` rules in the guide's `tailwind` fence reddens the consumer recipe-equality case (the
   brief predicted the profiles proof; rule that the consumer case is the one that reads line
   order and that the profiles proof has no such reading to bind); the `@source inline(…)` control
   emptied in `unexcluded.css` reddens two profiles cases; `!important` dropped from the planted
   `.col-1` declaration reddens the important-branch case; every file's SHA-256 matches before and
   after each reverse edit (the log).
8. **Scripts and configuration** (ruling 5). `package.json` loses `test:src:tailwind` and its
   `test:src` clause and nothing else; `test` does not run `test:service`; `prepublishOnly` runs it
   after the release distribution check; the wrapper file is gone; the root `vite.config.ts` is
   untouched and registers the `service` project.
9. **The law holds.** Across the diff: no `any`, `as`, `!`, or suppression; no nested function
   beyond a callback passed or returned directly; readonly interface members; one-word entity
   members; `{verb}{Noun}` helpers; no mock, spy, or fake (the compiler and the browser are real;
   the moved proofs drive `stage` and `SheetReader`); `tests/service/**` sits outside the vendored
   mirror law (`test:policy` green, no case asks for a mirror).
10. **Scope is honest.** The status lists the owned and shared files the brief names plus
    `ROADMAP.md`'s one-row fix (deviation 1); `tmp/probe/` is absent; the shared-file TSDoc patch on
    `collectInlineSources` (deviation 3) is not applied and is carried to the Orchestrator's
    integration edit at landing; no vendored file is touched.
11. **Gates.** `format:check`, `lint:check`, `check` exit 0; `test:policy` `109 passed | 1
    skipped`; `test:config` `173 passed | 1 skipped`; `build:src:styles && test:service` `17
    passed (17)` in 9.7 s wall at load 1.30; `test:setup` `200 passed`; `test:setup:browser` `59
    passed` (68 at the checkpoint, the difference the deleted reader cases); `test:src` exits 0
    running no Tailwind project; `test:conformance` `17 passed`; `test:guides` `18 passed`.
    UNRESOLVED until the Orchestrator's independent chain at the F8c landing; rule `npm run check`
    yourself where the sandbox allows it.
