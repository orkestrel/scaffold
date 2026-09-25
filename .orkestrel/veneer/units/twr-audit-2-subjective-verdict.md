# TAILWIND-RECIPE audit round 2: subjective lane verdict

**Lane:** subjective (design fit, naming, the truth and voice of the prose), held by `reviewer` on Opus 5.5 in a clean context. The writer was `opus` on Opus 5.5, which is this lane's own engine, so I attacked the work harder. This lane is read-only. Every mutation below is derived from reading the source and the retained logs. I executed none of them.

## Per-claim verdicts

**1. Source isolation: CONFIRMED.**
- `compileProfile` in `/home/user/veneer-twr/tests/setupService.ts` (around line 362) passes `base: scratch.path` and destroys the scratch directory in `finally`. Its TSDoc (around lines 347–351) states the mechanism plainly.
- Mutation: drop the `base` option. The case `scans only the markup the profile's own source rules name, and nothing the working directory carries` then fails at `toEqual(['flex'])`. The log `twr-instruments/r2/twr-2-setup-before.log.txt` (lines 138–139) shows that exact state failing: `AssertionError: expected [ 'pointer-events-auto', …(135) ] to deeply equal [ 'flex' ]`. The assertions distinguish the mutation.
- The case's second half is a working control: it shows that the plugin's default, on the same bytes, emits names beyond `flex`.
- `twr-2-isolation-probe.log.txt` (lines 5, 7, 13, and 15) shows two things:
  - The isolated set is a subset of the unisolated set.
  - Under isolation, the markup line adds `.hidden` and `.px-8` and nothing else.
- The service suite stays green (`twr-2-test-service.log.txt`, `Tests 24 passed (24)`, `exit=0`).

**2. The markup line is load-bearing: BROKEN, on its prose half.** The plant half holds:
- `twr-2-plant-markup-final.log.txt` (lines 46–47) fails `the preflight recipe > resolves the cascade import, scans the markup line, …` with `AssertionError: … to include '.px-8'`.
- `twr-2-plant-markup-consumer-final.log.txt` (lines 46–74) fails the consumer pairing's order case, its override case, and its surface case with assertions.
- `twr-2-plant-markup-before.log.txt` (lines 23–26) fails the fence case alone.
- Mutation: remove the line. The assertions distinguish it.

The prose half fails. Some consumer-facing sentences state that the markup line bounds what Tailwind scans, and the round's own measurement shows that this is false for a recipe built as shipped:
- **What the guide tells the consumer.** `/home/user/veneer-twr/guides/veneer.md:3344-3346` says "Tailwind fills a layer only for the utilities it generates from the markup your `@source` rule names … A build whose markup uses no Tailwind utility therefore fills no layer at all". Lines 3364–3365 say the `@source './src'` line "names your own markup directory, which is what Tailwind scans to decide which utilities to generate."
- **Falsifying state.** `twr-2-isolation-probe.log.txt` lines 1–2 and 8 compile `consumer.css` (the `tailwind` recipe) with the plugin's default base, which is what a consumer's build uses. With the markup line removed, the compile still emits `.px-8`, `.sepia-390`, and `.ring`, and the line adds nothing (`cwd with the line, not without it: []`). Line 6 lists utilities such as `.flex`, `.grid`, and `.ring`, which that build generates from text outside any `@source` directory.
- **The round documents the same fact itself.** `tests/setupService.ts:347-349` says an import with no `source(…)` argument "leaves that detection on, as each recipe the guide ships does". `tests/setup.css:7` says "a consumer's recipe drops `source(none)`".
- **Contrast inside the edited paragraph.** Line 3401 says "The workspace compiles each recipe as written". Lines 3409–3412 then describe a detection root that no consumer following the recipe gets.
- **Why it matters.** The tenet asks for "deliberate control over … utilities" through a documented, executed recipe. The proof now reads an environment the recipe does not produce, and the guide tells the consumer that the environment is theirs.
- **Smallest correct fix (prose).** In § Tailwind, around lines 3344–3346 and 3364–3365, state that each recipe's import leaves Tailwind's automatic source detection on. The consumer's build then also scans the project it runs from, and the `@source` line adds the markup directory. Then state that the workspace roots detection at an empty directory so that the proofs read the markup line alone. Also correct the sentence "fills no layer at all".
- **Design alternative (see referral R3).** Write `source(none)` on each recipe's Tailwind import, the way `tests/setup.css:12` does. The existing consumer sentences then become true in a consumer's build, "as written" becomes literal, and the isolation stays harmless (`setupService.ts:351`).

**3. Fixture paths: CONFIRMED.**
- The `consumer` group follows `.claude/rules/names.md` § Group options by entity: a group noun with one-word leaves.
- Its `tailwind` and `preflight` leaves mirror the top-level profile keys, so `TAILWIND_PATHS.consumer.preflight` reads as "the consumer's `preflight` recipe" next to `TAILWIND_PATHS.preflight`, the profile.
- `recipes` was not available as the group noun, because the round-1 F3 ruling reserves `recipe` for the fence.
- A grep for `fixtures/tailwind` under `/home/user/veneer-twr/tests` finds paths only in `tests/setupService.ts` (lines 69–87) and in the expected population of `tests/setupService.test.ts` (around lines 138–143). No test resolves a fixture path of its own.
- The census reads `Object.values(TAILWIND_PATHS.consumer)` (`profiles.test.ts`, around line 200), so a recipe added to the group joins it without an edit.
- The TSDoc (`setupService.ts:63-77`) and the case title are true. The shape costs the case one string-or-group flattening (`setupService.test.ts`, around line 131), which is acceptable.
- The `tests/fixtures/tailwind/` row has a wording defect, recorded as F3.

**4. The comparison helper: CONFIRMED.**
- `collectMovedLonghands` fits the `collect*` prefix: it gathers moved longhands into a collection.
- The line-shaped return fits every caller:
  - Emptiness with `toEqual([])`: `consumer.test.ts` lines 184, 224, 477, and 509, and `preflight.test.ts` line 197.
  - One line with `toContain`: `consumer.test.ts` line 257.
  - A non-empty predicate: `consumer.test.ts` line 468.
- The lines are also what makes a failure readable. `twr-2-plant-order-paired-final.log.txt` (lines 70–85) prints `.btn border-top-style: solid became none` per longhand.
- The source walks every property of every standalone reading (`setupServer.ts`, around lines 818–826). It never throws, because `String(settled)` handles `undefined`.
- The proof separates equal readings (separate maps in another key order), a changed value, and a missing value or missing pair. Mutations the cases kill:
  - Compare by key order.
  - Walk the paired map instead of the standalone map.
  - Skip a standalone reading that has no pair.
  - Return an empty list.
- Mutation the cases do not kill: report only the first moved longhand of each reading. No proof case has two moves in one reading. See R1.
- The site left at `preflight.test.ts:190` computes moved property names so it can intersect them with `lower` and `declared`. The site at lines 244–249 asserts each declared longhand by `tag | property | value` and records `kept`. Neither site builds the report.

**5. The floors: CONFIRMED.**
- `COMPONENT_FLOOR` and `OVERLAP_FLOOR` are frozen exports (`setupService.ts`, lines 127 and 147). The frozen checks and export-list rows are at `setupService.test.ts:52-67` in the diff.
- A grep for `FLOOR` under `tests/service` finds only imports.
- `OVERLAP_FLOOR` follows the `{QUALIFIER}_FLOOR` form of `CANDIDATE_FLOOR`, and its qualifier names the population it bounds: the derived overlap.
- The TSDoc summary of `COMPONENT_FLOOR` is inaccurate; see F2.

**6. Titles and prose: BROKEN, on one edited sentence.**
- `/home/user/veneer-twr/guides/veneer.md:3413-3414` reads "the markup's `px-8` utility is generated, a reading a recipe without its markup line fails".
- The sentence drops `that` and stacks one noun phrase on another, so it cannot be understood on the first read. `.claude/rules/writing.md` § Sentence and paragraph order says "Keep the helper words `that` … Do not drop one for brevity", and `AGENTS.md` § Writing requires first-read wording.
- Fix: "the markup's `px-8` utility is generated, and a recipe without its markup line fails that reading;".

The rest of claim 6 holds:
- The retitled order case (`consumer.test.ts:371`) names each assertion it makes: the import, `.px-8`, the order, and a `base` block with selectors.
- The component case title (line 404) says that each floor class moves (line 480).
- `served` is the only identifier for the stage manager that serves the compiled recipe (lines 339, 458, and 505). `recipe` and `recipes` as identifiers name only fences (lines 78–105).
- Line 3401 says "compiles each recipe as written".
- Lines 3524–3527 name "the importance branch" and "the rule for leaving the exclusion line".
- Line 3426 makes "The consumer pairing" the actor that mounts the components fixture.
- The edited prose states no count.

**7. R2 to R5: CONFIRMED.**
- R2: `twr-2-plant-order-paired-final.log.txt` (lines 34–85) fails the order case, the component case, and the shared-name case with assertions. Mutation: delete the order line. The assertions distinguish it.
- R3: `twr-2-timing-3.log.txt` (lines 2 and 24) reads 9074 ms at a load average of 20.50. 2 × 9074 + 5000 = 23148 = `COMPONENT_TIMEOUT` (`setupService.ts:186`), and the TSDoc records the run.
- R4: `twr-2-base-probe.log.txt` shows `Tests 1 passed`, and `probe/twr-2-base.test.ts:20` shows `@layer base {}` reading `[]`. Mutation: an empty `base` block. The assertion distinguishes it.
- R5: `twr-2-gates.sh:25` echoes `+ $*` before each command.

**8. The compiler type: CONFIRMED.**
- `import type tailwindcss from '@tailwindcss/postcss'` types both `importCompiler` and `ReadinessOptions.compiler` (diff, around lines 959–1076).
- No `as` appears except the tuple `as const` at `consumer.test.ts:466`, which `.claude/rules/typescript.md` § Types permits for fixing a tuple's arity.
- `twr-2-check.log.txt` ends `exit=0`. Whether the types are right belongs to the objective lane.

**9. Scope and gates: CONFIRMED.**
- `twr-2-status.txt` lists only owned files.
- The `tests/setupServer.ts` hunk is the helper alone. The `tests/setupServer.test.ts` hunks are the import, the export-list row, and the `describe` block.
- Each gate log in `twr-instruments/r2/` opens with its command and ends `exit=0`: oxfmt, check, lint, build, service (`24 passed`), setup (`150 passed`), guides, and policy (`109 passed | 1 skipped`).
- These are the writer's own logs. The authoritative run belongs to `verifier`.

**10. Test-file data outside this round: CONFIRMED, with a correction.**
- None of the four constants appears in the round's diff lines, so they predate round 1.
- `ORDER` and `CONTROL_VARIABLES` (`profiles.test.ts:16,22`) are data tables. `.claude/rules/tests.md` § Shared test infrastructure says "Data tables and case matrices belong in a setup file at any size."
- `EXECUTED_SOURCE` and `SHIPPED_SOURCE` (`consumer.test.ts:37-38`) are single-string constants, not tables. The rules that reach them are `AGENTS.md` "Centralize by kind" and the § rule "Export every reusable … constant".
- Their home is beside `TAILWIND_PATHS.consumer`, because they describe the line those fixtures change. `CONTROL_VARIABLES` belongs beside the `instrument` key it describes.

## Findings outside the claims

**F1: One identifier names two different compiled sheets across sibling proofs.**
- In `consumer.test.ts:48-49`, `preflightSource` and `preflightProfile` hold `TAILWIND_PATHS.consumer.preflight`, the `preflight` recipe.
- In `profiles.test.ts:27,30` and `preflight.test.ts:28`, the same names hold `TAILWIND_PATHS.preflight`, the `preflight` profile: a different file, which writes `source(none)` and scans the candidate list.
- Round 2 edited lines 48–49 when it introduced the key ruling that separates these two files. The local names then erase that separation, which breaks `AGENTS.md` "One concept, one term". This is the same class as the round-1 F3 ruling.
- Fix: rename the `consumer.test.ts` locals to `consumerPreflightSource` and `consumerPreflightProfile`, after the key path and the `consumer-preflight.css` filename. Update their uses at lines 81, 342, 358, 372, 438, and 439. That leaves `preflightProfile` naming the profile in every file.

**F2: The `COMPONENT_FLOOR` summary misstates what the floor bounds.**
- `setupService.ts:118-119` says "the component classes the `preflight` recipe has to leave where the cascade puts them before a reading over the rest of the component rules means anything".
- The case reads every component rule it matches at rest, the floor classes' rules included (`consumer.test.ts:454-469`). There is no "rest".
- The floor's role is coverage: each floor class is reached on a longhand the reset writes (lines 472–476) and moves on the control (line 480).
- The § Files row sends readers to this module for "the floors … of their proofs".
- Fix, parallel to `OVERLAP_FLOOR`: "Lists the component classes the `preflight` recipe's component reading has to reach, on a longhand Tailwind's reset also writes, before its equality means anything."

**F3: The pronoun in the § Files fixtures row can attach to the wrong profiles.**
- `guides/veneer.md:3270` reads "The `preflight` profile, the unexcluded instrument, the executed consumer profile of each recipe, the markup those profiles scan, …".
- "Those profiles" can attach to the `preflight` profile, which scans the candidate list and not `markup.html`. `.claude/rules/writing.md` requires naming the noun after `these` or `those` where the reader could attach it elsewhere.
- The same row calls the files "consumer profile", while the TSDoc (`setupService.ts:71-74`) calls them recipes.
- Fix: "…, the executed copy of each recipe, the markup those copies scan, …".

## Attacked and held

- **The `served` name.** A past participle is the boolean form in `names.md`. It holds here: the file names readings by page role (`standalone`, `paired`, `dropped`), and "the served page" reads plainly.
- **"scans the markup line" in both order titles.** The phrase could read as scanning the directive itself. It holds, because the compiler does process the `@source` rule, and the assertion is on the utility that rule's markup yields.
- **The `markup` key outside the `consumer` group.** It is shared by both recipes and is not itself a recipe, so the group's TSDoc ("holds each recipe") stays exact.
- **Fabricated labels at call sites.** The labelled standalone input forces labels at `[[tag, held]]` and `[['col-1', column]]`. That label is the diagnostic the line carries, so it earns its place.

## Referrals

- **R1 (to the objective lane).** No case in `setupServer.test.ts` has two moved longhands in one reading. A mutation that reports only the first move per reading survives the helper's own proof, although the TSDoc promises one line per moved longhand.
- **R2 (to the objective lane).** The "4 CPUs" in the `COMPONENT_TIMEOUT` TSDoc (`setupService.ts:184`) has no retained evidence. A grep for `nproc` and `CPU` in `twr-instruments/r2/` comes back empty, so it rests on the writer's report alone.
- **R3 (to the Orchestrator).** Under claim 2, choose between the prose fix and writing `source(none)` on each recipe's import. The second changes the shipped recipe and both consumer fixtures, and requires re-running both pairings.

VERDICT: FAIL 2, 6; outside the claims: F1, F2, F3
