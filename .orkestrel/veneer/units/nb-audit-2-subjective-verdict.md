NAVBAR (`nb`) audit, round 2. I held the **subjective** lane as `reviewer` on Opus 5.5, read-only. I ran nothing. Every reading below comes from the retained logs, the diff, the patches, and the worktree source. The writer (`opus`) runs on my engine, and I attacked the wording my own lane prescribed in round 1 as hard as the rest.

## Per-claim verdicts

**1. UNRESOLVED.**
- The file sets hold:
  - `nb-2-status.txt:1-5` lists the five paths.
  - `nb-2.diff` carries only those files.
  - The `theme.test.ts` blob (`cff2414`) and the `NavbarSection.ts` blob (`8f939bc`) equal round 1's (`nb.diff:2,26`).
  - `nb-shared-2.patch` touches the same fifteen files as `nb-shared.patch`.
  - Spot checks found identical hunks outside the five named files: ROADMAP, conformance, setupServer, Showcase, and index.
  - `nb-offlimits-2.patch` differs from round 1 only at `:11` ("flex flow").
  - The retirement patch differs from round 1 only in the deleted comment and in hunk context.
- Two clauses rest on the writer's report alone:
  - That `git apply --check` exits 0.
  - That each `index` line names the `a658879` blob.
- No retained log carries either reading. `patches.sh` writes the patches and records no apply check. Loose objects exist for `605d1a5`, `18b0a6d`, `daef14f`, `de17941`, and `93abb90` under `/home/user/veneer/.git/objects`, but an object's existence does not show that it is the `a658879` blob for that path.
- To settle it, run `git -C /home/user/veneer-nb apply --check` on each patch, and `git -C /home/user/veneer-nb rev-parse --short a658879:<path>` for each `index` line. I refer both to the objective lane.

**2. CONFIRMED.** Each log reads as the claim states:
- `built-cascade.log.txt`:
  - `:2` shows exit 0.
  - `:8-9` shows the count `0` and grep's exit 1.
  - `:11-15` shows the five media blocks.
  - `:18` shows the unconditional `.navbar-expand` rule.
- `theme-red-green.log.txt`:
  - `:4-7` shows the red run: exit 1, `expected '' to contain 'data:image/svg+xml'`, `1 failed | 5 passed (6)`.
  - `:9-12` shows the green run and the digest check.
- `retirement-asset.log.txt:5-14` shows the red run, the green run, and `_theme.scss` restored.
- The journey logs each read `1 failed | 40 passed (41)` with `expected [ 'collapsed' ] to deeply equal []` (`journey-light-390.log.txt:53,69`; `journey-dark-1280.log.txt:53,69`).
- `census-probe.log.txt:52,62-63` shows the probe run green and `index.scss` unchanged by digest.
- The killed run is kept (`journey-light-390-killed.log.txt:2`, exit 137), and `journey-rerun.sh:7` writes the final light-390 log.

Mutations named:
- The theme proof: the `a658879` case asserts the toggler icon in the dark scope. It reddens against the stage, and the rewritten case passes, so the proof tells the two apart.
- The retirement proof: an accordion icon planted in the dark scope reddens the `toBe('')` assertion, so the proof tells the two apart.

**3. CONFIRMED.** The claim's property holds.
- The specimen markup is at `nb-shared-2.patch:101`, and the attribute bar keeps its dark attribute at `:96`.
- The section proof asserts the class and the attribute at `nb-2.diff:423-428`.
- The doc block states the reason at `nb-shared-2.patch:63-65`, and the guide states it at `:251-252`.
- The settling run is `class-surface.log.txt`:
  - `:6`: with the `.navbar-dark,` line removed, the round-2 brand reads `rgb(0, 0, 0)` and the round-1 brand reads `rgb(255, 255, 255)`.
  - `:14`: as shipped, both read white.
  - `:16-17`: the partial is restored by digest.

Mutations named:
- The section proof: drop `navbar-dark`, or drop the light attribute. Each reads `1 failed | 1 passed (2)` (`mutations.log.txt:25-26`), and the `classList` and `getAttribute` assertions tell each apart.
- The class-surface instrument carries its own negative control. The round-1 markup reads white with and without the rule, and that is exactly the masking the round-2 markup removes.

The term these reason sentences use is a separate defect; see MODE-SCHEME.

**4. CONFIRMED.**
- `NAVBAR_COPY.paragraph` ends "each state set in markup" (`nb-shared-2.patch:48`).
- The section case title is at `nb-2.diff:304`.
- Every other case title in `navbar.test.ts` and `NavbarSection.test.ts` matches round 1 line for line (`nb.diff:430,495-1053` against `nb-2.diff:439,505-1062`), and that includes the dark-spelling case title at `nb-2.diff:863`.

**5. BROKEN.** Every rewrite the report lists is present:
- The guide: `nb-shared-2.patch:191-194`, `:229-230`, `:299-300`, `:307`, and `:137-138`.
- `.nav-tabs .dropdown-menu` sits at `_nav.scss:102`, and no deferral row names it.
- `_navbar.scss` comment: `nb-2.diff:126`.
- Doc blocks: `nb-shared-2.patch:55-58` and `:1120-1121`.
- Mixin comment: `nb-offlimits-2.patch:11`.
- `_tokens.scss`: `:391-400` and `:423-428`.
- Section comments: `nb-2.diff:398,410`.

The token-noun clause is false. Each of these added lines leaves a code token without its noun:
- `nb-shared-2.patch:1063`: "The release records `.navbar-toggler` unconditionally …". The fix round rewrote this sentence for the tally and left the token bare.
- `:1043`: "The release records `.nav-link` unconditionally …".
- `:1048`: "`.card-header-tabs .nav-link.active` is recorded under this key …".
- `:1148` ("each wrapped around {@link NAVBAR_MARKUP} and marked by") and `:1315` ("carrying that spelling around {@link NAVBAR_MARKUP}."). The `findDrift` function reads a `{@link}` tag as its target's code token. Every existing `{@link …}` in the tree takes the noun "constant", for example `/home/user/veneer-nb/tests/setupStyles.ts:59,140,3857,5735`, and the patch itself does so at `:1129`.

Fix each site:
- "records the `.navbar-toggler` selector"
- "records the `.nav-link` selector"
- "The `.card-header-tabs .nav-link.active` selector is recorded"
- "{@link NAVBAR_MARKUP} constant" at both sites

The report's own sweep covered the guide only (`b-collapse-nb-report-2.md:81`).

**6. CONFIRMED.**
- The table is declared, frozen at both levels, and documented at `nb-shared-2.patch:1313-1336`.
- The proof reads it through `it.each`, with the unchanged title, the selector check, and the inner loop variable `target`, at `nb-2.diff:862-892`.
- `tests/setupStyles.test.ts` handles it at `:757,771,928-941,987,995`. The binding at `:928-939` replaces round 1's literal list (`nb-shared.patch:736`).
- `mutations.log.txt:27-33` reads as claimed.

Mutations named:
- Unfreeze the table, unfreeze a row, or reorder the rows. Each reddens the setup case, and the freeze loops and the order-sensitive `toEqual` assertion tell each apart.
- Reorder the rows under the browser proof. It stays green (`:30`), which is recorded honestly: that proof reads each row on its own.
- Give a row markup that does not carry its `selector` value. By reading, the `[false, true]` match assertion reddens. This mutation was not run.

**7. UNRESOLVED.** Every clause backed by a log holds:
- Each `mutations.log.txt` row and its filter are at `:1-33`, and the outside stop is recorded at `:10`.
- The section mutations are at `:23-26`, and the `!important` mutation is at `:22`.
- The controls are at `:31-33`.
- The stage gates are at `gates.log.txt:1-12`, and the retirement gates at `retire-gates.log.txt:1-7`.

One clause rests on the report alone. `worktree-check.log.txt` carries the diagnostics and no exit line, so "exits 2" comes only from the report. Every diagnostic in that log is in an owned file and follows from a missing shared export: TS2724, TS2305, and the TS7006, TS7031, TS2345, and TS2347 errors that follow from them. That supports "alone". To settle the exit value, run `npm run check; echo "exit $?"` in the worktree. I refer this to the objective lane.

**8. BROKEN.**

What holds:
- The code law: my search of every patch and the owned diff for a non-null `!`, `as <Type>`, `: any`, `@ts-`, `eslint-disable`, and `vi.*` returned nothing. The only `as const` forms fix tuple literals (`nb-2.diff:739,889,1074`). No function is nested beyond a direct callback, and no helper is exported.
- The SCSS reads tokens, mixins, and `color-mix()`.
- The gate rows match the logs.
- The "disjoint" claim is dropped (`report:132-133`), and the card and dropdown choices are bounded (`:140-144`).

What is broken:
- **Counts.** The report states counts of growable sets, including a form the brief banned by name. See the list that follows.
- **Deviation fields.** D4 (`report:283-286`) and D5 (`:288-291`) carry no Evidence field.
- **Code-token nouns.** Many tokens in the report stand without a noun:
  - `:45`: "`navbar-dark` and `data-bs-theme="light"`".
  - `:117`: "`selector` is `.navbar-dark`".
  - `:126`: "against `NAVBAR_DARK_CASES`".
  - `:266`: "in `NavbarSection.ts`, `NavbarSection.test.ts`, or `navbar.test.ts`".
  - `:275`: "`_mixins.scss` and `_nav.scss` are untouched".
  - `:295`: "holds `accordion-icon` and `accordion-active-icon`".
  - `:298`: "`_theme.scss` and the undeclared-key case".
  - `:336`: "`.navbar-toggler:hover` is proved".

Counts the report states, recorded for the file:
- "becomes two sentences" (`b-collapse-nb-report-2.md:72`).
- "both inverted specimens sit on a `.card`" (`:141`).
- "Three of my runs were stopped" (`:233`).
- "passes on both variants" (`:304`). The brief banned "both variants" by name (`nb-brief-2.md:25`).

The quoted result lines, the exit codes 137 and 143, and "18:28 UTC" are measurements or values, so they are allowed.

**Outside question: the three inline loops.** All three are data tables, which `.claude/rules/tests.md:187` places in a setup file at any size. None is a loop-local pair of runtime readings. The contrast case is `tests/src/styles/components/table.test.ts:256-259`, which pairs values read inside the case and so cannot be declared in a setup file.
- **The `[target, property, slot]` loop (`nb-2.diff:885-892`)** repeats three rows of `NAVBAR_COLOR_CASES` (`nb-shared-2.patch:1253-1284`): the brand color, the plain link color, and the toggler border color, each with its consumer and property. Iterate `NAVBAR_COLOR_CASES` there instead, reading `readStyle(element, reads)` against `readToken(retuned, property)`. That removes the local table and also covers the disabled and active slots.
- **The `[viewport, expanded]` loop (`:736-751`)** is a case matrix. Its widths repeat the journey widths that `configs/app/vite.journey.config.ts:8-9` and the 390 variants declare. Move it to `tests/setupStyles.ts` as a documented, frozen table, and keep the literal expected steps, because they are the claim R16 corrects.
- **The `[selector, moves]` loop (`:1069-1081`)** is a case matrix. Move it to `tests/setupStyles.ts` beside the other navbar tables, frozen and bound in the freeze case.

## Findings outside the claims

- **MODE-SCHEME.** The reason sentences use "scheme", a term the guide uses nowhere. My search for `scheme` in `guides/veneer.md` returned no match.
  - Sites: `nb-shared-2.patch:251-252` ("sets its own scheme to light to show the class's paint"), `:63-65`, and `nb-2.diff:421-422`.
  - The guide calls this concept a mode (`guides/veneer.md:42-43`). It calls a light scope inside a dark one a "light island" (`:907,994,1782-1784,2382`), and so does this unit's own section (`nb-shared-2.patch:233-234`).
  - Why it matters: this breaks the design law "One concept, one term". The guide sentence also hides the markup a reader would copy.
  - The wording came from my own round-1 prescription, carried through the brief (`nb-brief-2.md:20`). That prescription was wrong.
  - Fix, guide: "…so the class bar carries the `data-bs-theme="light"` attribute, a light island inside the card, and the white it shows is the class's paint."
  - Fix, doc block and test comment: "…so the class bar opens a light island with its own `data-bs-theme` attribute, and the white it shows is the class's paint."

- **TOKENS-ICONS-HEADER.** The `$icons` comment is false for the toggler icon.
  - `nb-shared-2.patch:391-392` says the navbar toggler icon is one that "Bootstrap paints in one value across the light and dark modes".
  - The same comment block then calls it mode-varying (`:399-400`).
  - The partial gives it a dark value (`nb-2.diff:281,288`, from `tokens.$dark`), and `NAVBAR_DARK_CASES` pins a second, dark icon (`nb-shared-2.patch:1306-1310`).
  - The fix round rewrote this very sentence ("both modes" became "the light and dark modes").
  - Fix: "The forms glyphs and the navbar toggler icon at their light values, each as the escaped data URI the release compiles its own variable to." This matches the accurate "the navbar toggler's light icon" at `:788-789`.

- **LENGTH-SENTENCE.** The `NAVBAR_LENGTH_CASES` doc (`nb-shared-2.patch:1146-1148`) fails a first read: "the `target` field addresses the element whose property named by the `reads` field consumes it".
  - Fix: "the `target` field addresses the element that consumes it, and the `reads` field names the property read there".

- **NAV-HALF.** The `NAV_SELECTORS` doc contradicts itself.
  - `nb-shared-2.patch:1045` calls the list "the nav partial's half of the key's official vocabulary".
  - `:1048-1050` then lists a selector the card partial writes.
  - Round 1 said "the shipped half".
  - Fix: "It is the half of the key's official vocabulary that no navbar rule carries".

- **REPORT-COUNTS.** This is recorded for the file. The list is under claim 8.

- **INLINE-LOOPS.** The three loops belong in `tests/setupStyles.ts`, in the shapes the ruling under claim 8 states.

## Attacked and held

- **The light attribute on the class bar.** No dark surface other than a dark-mode card ships: my search for `.bg-dark` and `.text-bg-dark` under `src/styles` found nothing. `[data-bs-theme='light']` writes only custom properties and the `color-scheme` property (`/home/user/veneer-nb/src/styles/_theme.scss:10-13`), so the bar paints no light surface over the card. The icon reads dark through the card either way, and the doc block claims only the white text.
- **The class paint, adopted as a test.** The `TEXT_MODES` light row reads the `.navbar-dark` brand white inside a light scope (`nb-2.diff:1042-1059`). That is the instrument's property in permanent form. Mutation: drop the `.navbar-dark,` selector line, and the brand falls to the emphasis black, so the test reddens. This is by reading; the retained run used the "retunes every color" filter only.
- **The recorded choices.** The `selector` field earns its place: it binds the row order and drives the match assertion. The section case title reads cleanly and matches the copy.
- **The mixin comment.** "flex flow" is true for both callers: `.nav` sets `flex-wrap` and `.navbar-nav` sets `flex-direction`.
- **`_nav.scss`.** It is a landed sibling's file, but only the report-only off-limits patch touches it, under the given D2 ruling.
- **Guide wrap.** The round-2 edits left lines `nb-shared-2.patch:195` and `:252` unwrapped. No rule fixes a wrap width, and `format:check` passes. This is cosmetic.

## Referrals

- **To the objective lane:**
  - Claim 1: the `git apply --check` and `index`-blob clauses.
  - Claim 7: the exit value in `worktree-check.log.txt`.
- **To the Orchestrator:** the same inline static pairs already sit in landed code at `tests/src/styles/components/nav.test.ts:449-454` and `tests/src/styles/components/input-group.test.ts:373-377`. That carrier falls outside NAVBAR.

VERDICT: FAIL 1, 5, 7, 8; outside the claims: MODE-SCHEME, TOKENS-ICONS-HEADER, LENGTH-SENTENCE, NAV-HALF, REPORT-COUNTS, INLINE-LOOPS
