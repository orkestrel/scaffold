# UTIL-DISPLAY (`ud`) audit, round 2: subjective-lane verdict

I held the **subjective** lane on Opus 5.5. I read the sources and the retained logs and ran nothing. Opus 5.5 also wrote this work, so I attacked its test-shape and prose choices hardest. The dispatch had no defect: it named no report path and assigned no command.

Evidence paths: the claims file, diff, patch, report, and logs are under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree is `/home/user/veneer-ud`. A line in a patched shared file is given as the patch line and the resulting file line: patch line N of `app/browser/constants.ts` is file line N+1676, patch line N of `tests/setupStyles.ts` is file line N+947, and patch line N of the § Display and § Flex guide hunk is file line N+1551.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED on scope and content. The removal clause is wrong as written.**
- **What holds:**
  - `ud-2-status.txt:1-12` lists only the owned files.
  - The six files that must be byte-identical keep round 1's blob ids. For example, `ud-2.diff:3` and `ud.diff:3` are both `09fd7a0`, and `_display.scss` is `156d852` in both. The same holds for `_flex.scss`, `_vertical-align.scss`, `_stacks.scss`, and `FlexSection.ts`.
  - `ud-shared-2.patch` touches exactly the named shared files, and `apply-check.log.txt:8-9` shows `git apply --check exit=0` with an `index` line for every file.
  - The round-1 hunks of every file the rulings do not name are unchanged apart from their headers.
  - The patch adds no line to a vendored file, a sibling unit's file, `src/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- **The removal clause:** against `e4e6a40`, the patch removes base line 446 of the guide (`ud-shared-2.patch:215`). It no longer removes the base lines round 1 removed (449-451). No base word is lost: line 446 comes back split around the ruled sentence at `ud-shared-2.patch:216-219`.
- The round-1 § Tailwind sentence and the `FLEX_COPY` clause were never base lines, so the patch cannot "remove" them. This repeats round 1's claims-file fault. I refer the exact diff-line wording to the objective lane.

**2. The mutations and the matrix: CONFIRMED.**
- **`display-mode-override`:**
  - The mutation plants a dark `.d-inline-flex { display: block !important }` rule inside the `utilities` layer, after the print block (`logs/record/display-mode-override.log.txt:20-22`).
  - It reddens only the mode case: `1 failed | 36 passed (37)` (`:8-9`), with the restore digest `equal=True` (`:4`).
  - The case's assertion expects `'inline-flex'` inside the dark island (`display.test.ts` mode case), so it tells this mutation apart from the passing run.
- **`vstack-direction-dropped`:** it reddens the layout case and the layer case (`vstack-direction-dropped.log.txt:9-10`).
- **The control** reads `37 passed (37)` and `6 passed (6)` (`record/control.log.txt:6`, `:8`).
- **The matrix:** `logs/matrix.md.txt:47` reads `unreddened: []`. The report's matrix (`b-utilities-ud-report-2.md:215-245`) matches it after the collapsing the report declares at `:211-213` and `:247-248`: the boundary rows are merged, and the alias names for the one important-dropping edit are folded into one. I refer literal equality to the objective lane.

**3. The section proofs: BROKEN on 4c.** 4a and 4b hold.

- **4a holds.**
  - Each render case asserts `expect(region.querySelector('[style]')).toBeNull()` directly after the region lookup (`DisplaySection.test.ts:24`, `FlexSection.test.ts:24`).
  - **Mutation:** `style="width: 40px"` on a specimen element. The assertion tells it apart: pre-fix green, recorded red on both render cases, `2 failed | 4 passed (6)` (`record/inline-style-added.log.txt:10-12`).
- **4b holds, and the form fits.**
  - The case reads `shorter` over `:scope > span` (`FlexSection.test.ts:110-112`) and expects `[false, true, true]` (`:130`).
  - **Mutation:** drop `align-items: center` from `.hstack`. The assertion tells it apart: the recorded run reads `expected [ false, false, false ] to deeply equal [ false, true, true ]` (`record/hstack-center-dropped.log.txt:405`), and the pre-fix run was green.
  - A start or end alignment keeps the text items shorter but moves them off centre, and the zero-offset assertion (`:126`) catches that. So the two readings together pin centring.
  - Excluding the tall item's `false` is correct, because the tall item sets the row's height.
  - The comment (`:127-129`) states the reason plainly.
- **4c: the label proof checks only the first element that carries each class.**
  - **Where:** `FlexSection.test.ts:61-67`.
  - **What is wrong:** `region.querySelector(...)` returns the first match only. Two classes each sit on two items: the fill row carries `flex-fill` on its first and last items, and the grow row carries `flex-grow-0` on its first and last items (`ud-shared-2.patch:160`, `constants.ts:1836`). The later item of each pair is never read.
  - **Mutation:** relabel the last fill-row item `<div class="flex-fill">Fill</div>`, or the last grow-row item `<div class="flex-grow-0">Fixed</div>`.
  - **Does the proof tell it apart?** No. The first match still carries the full name, so the case stays green. `label-bare` only reddens because each `align-self-*` class is unique (`record/label-bare.log.txt:11`, `:357`).
  - **Why it matters:** claim 4c and the proof's own comment (`FlexSection.test.ts:43-46`, "labels every element carrying one") both say every element is checked. The proof checks the first one.
  - **What right looks like:** replace the `requireValue(region.querySelector(...))` block with this:
    ```ts
    const elements = [...region.querySelectorAll(`[data-specimen="${name}"] ${context}.${label}`)]
    expect(elements, `No ${label} element in ${name}`).not.toEqual([])
    for (const element of elements)
    	expect([element, ...element.children].map((node) => node.textContent)).toContain(label)
    ```
    Then log a mutation that relabels the last `flex-fill` item and shows the render case turning red, beside a green control.
- **The doc comment states the convention** (`ud-shared-2.patch:82-85`, `constants.ts:1758-1761`), and the patched markup follows it:
  - the aligned items, aligned content, and aligned self items carry `align-*-${key}` labels (`:124`, `:140`, `:154`);
  - the fill, grow, and shrink rows carry the full class names (`:160`);
  - the tall sibling keeps `Tall`, and the stacks keep prose labels (`:171`, `:176`).
- **Optional wording, not a defect.** Each wrap item carries `flex-shrink-1` but is labelled `flex-wrap`, `Second`, or `Third` (`:106`). The same class pair is labelled `flex-shrink-1` in the shrink row (`:160`). The remark never says that `flex-shrink-1` there is a supporting class that undoes the column class's `flex: 0 0 auto`, so a reader applying the stated convention sees a counterexample. "Every item that demonstrates a class" would also read closer to the proof as "every element carrying a demonstrated class".

**4. The retained evidence: CONFIRMED.**
- **Conformance:** `gates/conformance-verbose.log.txt:30` and `:34` read `22 passed (22)` with exit 0.
- **The cascade instrument:**
  - **Mutation:** plant a `.d-probe` rule. The instrument tells it apart: `EXTRA .d-probe|`, `extra=1`, vitest exit 1 (`cascade-planted.log.txt:8-9`, `:46`), with the restore digest `equal=true` (`:47`).
  - The clean run reads `inventory=343 present=343 missing=0 unimportant=0 customImportant=0 extra=0`, exit 0 (`cascade-clean.log.txt:7`, `:16`).
- **The Tailwind controls:**
  - Control A reads `2 failed | 16 passed (18)` and control B reads `4 failed | 14 passed (18)` (`tailwind/control-a.log.txt:154`, `control-b.log.txt:262`).
  - Every restore digest is equal (`control-a.log.txt:159`, `control-b.digests.txt:1-6`).
  - The clean runs before and after both read `18 passed (18)`.

**5. The guide: CONFIRMED.**
- **The § Tailwind sentence** matches the ruling word for word. It sits directly after the gap-steps sentence (`ud-shared-2.patch:216-218`, guide lines 450-452), and the round-1 sentence listing `.flex-row` is gone.
- **Every class-token subject takes its noun:**
  - `the .d-md-flex class lays` (`:233`);
  - `the .d-print-none class hides … the .d-print-block class shows … the .d-none class hides` (`:240-241`);
  - `the .flex-fill class` (`:259`);
  - `The .hstack and .vstack stack helpers` (`:261`);
  - `an element carrying the .flex-fill and .flex-grow-0 classes resolves a flex-grow value of 0` (`:266-267`);
  - the matching `.flex-grow-0` and `.flex-md-fill` sentence (`:268-269`);
  - `as the .hstack and .gap-3 classes do together` (`:274`).
- **The print-block sentence** reads exactly as ruled (`:238-239`).
- **The spelling:** `vertical-alignment` is the only spelling in the patched guide (`:205`, `:230`, `:293`, `:332`), and the base guide has no open-spelled form.
- **The paragraph:** `FLEX_COPY.paragraph` has no resize clause (`:75`, `constants.ts:1751`).
- **Every other hunk:** the Files rows, the compatibility rows, the § Showcase clause, and the § Tests links match round 1. Apart from the ruled edits, the Display and Flex sections change only by rewrap.
- **Banned-term sweep:**
  - Pattern: `should|simply|eas(y|ier|ily)|just|currently|now|new|latest|utiliz|leverag|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you|and/or|since|once|above|below|please|dummy|ensure|guarantee`, case-insensitive.
  - Paths: the `+` lines of `ud-shared-2.patch` and `ud-2.diff`, and `b-utilities-ud-report-2.md`.
  - Every hit is in a permitted sense: spatial `below` and `above`, `once` meaning one time, and `new` as a keyword.

**6. The case tables: BROKEN on the `FlexRestingValue` interface's documentation.** Everything else holds.

- **Where:** `ud-shared-2.patch:1036-1039` (`tests/setupStyles.ts:1983-1986`).
- **What is wrong:** the members `declared` and `computed` have no TSDoc.
- **Why it matters:**
  - The named precedent, `InputGroupCase` (`/home/user/veneer-ud/tests/setupStyles.ts:4289-4297`), documents each member.
  - So does every other interface in that file, for example `ShadowLayer` (`:202-209`), `PreflightDeparture` (`:1064-1073`), and `FormRangeCase` (`:3598-3610`). A multiline search for an undocumented first member returns no interface in `tests/setupStyles.ts`.
  - `.claude/rules/typescript.md:77` requires complete TSDoc on every public export.
  - That file also names data interfaces with the verb "Carries", and this interface's summary says "Describes".
- **What right looks like:**
  ```ts
  /** Carries the inline declaration a flex proof rests an element on, beside the value a computed style reports for it. */
  export interface FlexRestingValue {
  	/** Holds the value the proof writes inline on the element. */
  	readonly declared: string
  	/** Holds the value a computed style reports for that declaration. */
  	readonly computed: string
  }
  ```
- **What holds:**
  - The shapes: `DISPLAY_VALUES`, `ALIGN_VALUES`, `FLEX_ENTRY_CASES` with named `{ prefix, property, values: { key, value } }` fields, and `FLEX_RESTING_VALUES` all sit directly after `GAP_STEP_CASES`. Every level is frozen, and each constant's summary uses a third-person `-s` verb (`ud-shared-2.patch:895-1053`).
  - The single-word members follow `.claude/rules/names.md`.
  - The `Record` annotation earns the interface: the flex proof indexes the table by an arbitrary property.
  - The binding case sits directly after the gap-steps case (`ud-shared-2.patch:831-883`; the gap-steps case is `/home/user/veneer-ud/tests/setupStyles.test.ts:1372-1404`).
  - **Binding-case mutations:** each of `display-values-reordered`, `align-value-dropped`, `flex-entry-value-changed`, `flex-resting-written`, and `flex-table-unfrozen` reads `1 failed | 109 passed (110)` on that case alone, and the control reads `110 passed (110)` (`logs/setup/*.log.txt:5-6`). The assertions tell each mutation apart.
  - **The local `RESTING_DISPLAY` scalar is permitted.** It is neither a data table nor a case matrix under `.claude/rules/tests.md:187`, and only one proof reads it. The tree keeps scalars like this local, for example `FLOATED` (`form-floating.test.ts:30`), `CARET` (`form-select.test.ts:28`), and the ruled `GAP_KEYS` (`gap.test.ts:9`).
  - The style proofs and the section proofs import the tables.

**7. The `CaptureStem` type: CONFIRMED.**
- The `tests/setup.ts` and `tests/setup.test.ts` hunks (`ud-shared-2.patch:566-630`) match round 1's (`ud-shared.patch:270-311`, `:406-423`).
- **Mutation:** restore the space-only conditional. The assertion tells it apart: the stem becomes `fill,-grow,-and-shrink`, and the typed constant fails TS2322 at `npm run check` (round 1's objective lane ran this).
- **Mutation:** make `buildStem` keep commas. `expect(buildStem(…)).toBe(listed)` turns red at run time.
- The change is type-only, apart from the appended registry rows.

**8. Law and report: BROKEN on a count in a constants doc comment.**

- **Where:** `ud-shared-2.patch:87` (`app/browser/constants.ts:1763`), in the `FLEX_SPECIMENS` remark: "size their items with column classes so three items overflow one line at every width".
- **What is wrong:** "three items" tallies the wrap specimen's items, a set a later edit can grow. The sentence needs no number, so `AGENTS.md` § Writing ("NEVER state a count … Delete a count you find") applies. Claim 8 extends that rule to the constants doc comments.
- **What right looks like:** "…size their items with column classes so the items overflow one line at every width…".
- **What holds:**
  - The delta adds no `any`, no `!`, no suppression, and no mock. Its only assertion is the const assertion `as const` (`FlexSection.test.ts:99`).
  - Every function is a callback passed directly as an argument.
  - The new exports are constants and one interface, so none duplicates an `@orkestrel/test` export.
  - The report records each gate's command, with output that matches `logs/gates/`. The lint, check, and build gates print no summary line, and the report describes that correctly (`gates/lint-check.log.txt:7`, `check.log.txt:31`).
  - The report bounds each choice it names (`report:373-400`).
  - § Observations records that the styles configuration does not collect `tests/setupStyles.test.ts` (`:404-407`), and it records the externalization warnings (`:408-412`).
  - No growable-set count appears in the report's prose.

**Numbers the report states.** Each is a measurement tied to its run, so none is a finding outside the claims:
- `1098 insertions, 0 deletions` (`:38-39`) and `665 insertions(+), 10 deletions(-)` (`:45-46`).
- `1 failed | 36 passed (37)` (`:64-65`), `2 failed | 35 passed (37)` (`:71-72`), `37 passed (37)` and `6 passed (6)` (`:74`).
- `110 passed (110)` and `1 failed | 109 passed (110)` for each setup control (`:178-183`).
- `6 passed (6)`, `2 failed | 4 passed (6)`, and `1 failed | 5 passed (6)` (`:195-196`).
- The mutation-record tallies (`:264-288`):
  - `37 passed (37)` and `6 passed (6)`;
  - `1 failed | 36 passed (37)` for each single-case mutation;
  - `7 failed | 30 passed`;
  - `20 failed | 17 passed` for each important-dropping mutation;
  - `15 failed | 22 passed`, `12 failed | 25 passed`, `5 failed | 32 passed`, and `2 failed | 35 passed`;
  - the sections' `1 failed | 5 passed` and `2 failed | 4 passed`.
- `22 passed (22)` (`:292`, `:295`).
- `inventory=343 present=343 missing=0 unimportant=0 customImportant=0`, with `extra=1` planted and `extra=0` clean (`:311-316`).
- `18 passed (18)`, `2 failed | 16 passed (18)`, and `4 failed | 14 passed (18)` (`:324-327`).
- The gate lines (`:350-356`):
  - `4 passed (4)` / `37 passed (37)`;
  - `4 passed (4)` / `11 passed (11)`;
  - `19 passed (19)`;
  - `109 passed | 1 skipped (110)`;
  - `4 passed (4)` / `251 passed (251)`;
  - `22 passed (22)`;
  - `3 passed (3)` / `18 passed (18)`.
- `100 columns` (`:392`), `Test Files 4 passed (4)` (`:405-406`), `46 such lines` (`:411`), and a load average of `20.14 on 4 CPUs` (`:413`).

## Findings outside the claims

None.

## Attacked and held

- **The centring reading excludes the vertical rules.** It reads only `:scope > span`, and each `.vr` stretches by design. The offset comment's "each rule" at `FlexSection.test.ts:124-125` means each vertical rule. The comment is correct but ambiguous in a CSS file; "each vertical rule" is an optional clarity fix.
- **"At both variants" in the test title** follows the sibling section proofs' use of "variant" for a viewport, for example "the 1280 variant" at `LayoutSection.test.ts:103`.
- **Importing `tests/setupStyles.ts` into an `app:browser` proof has precedent** (`tests/app/browser/integration.test.ts:98`).
- **The name `ALIGN_VALUES` is ruled** (`ud-audit-verdict.md:24`), and its summary rules out reading it as the flex alignment values.
- **The short § Tailwind line after the inserted sentence** is the ruled trade-off to keep the three-way merge hunk small.

## Referrals

- **To the objective lane:**
  - Claim 1: the exact diff-line wording of the removal clause.
  - Claim 2: literal equality between the report's collapsed matrix and `matrix.md.txt`.
  - Test sufficiency: nothing binds the `contents` value of `RESTING_DISPLAY` against `DISPLAY_VALUES`, while `FLEX_RESTING_VALUES` gets exactly that binding (`ud-shared-2.patch:871-874`).
  - § Observations names only the `path` module (`report:408-412`), but the gate log also shows `fs`, `url`, and `source-map-js` externalized (`gates/styles-proofs.log.txt:13-25`).
- **To the Orchestrator:**
  - Rule whether the `families` case matrix in `FlexSection.test.ts:47-56` falls under `.claude/rules/tests.md:187`, as the round-1 ruling applied that rule, or under the one-use `GAP_KEYS` ruling (`us-audit-verdict.md:25`). If it stays local, labelled tuple elements (`[name: string, context: string, properties: readonly string[]]`) match `tests/setupStyles.ts:1741` and `:2457`.
  - The retained report still names launch paths such as `tmp/units/ud-2.diff`, `tmp/units/ud-2-status.txt`, and `tmp/units/ud-instruments-2/tools/mutate.py` (`report:40-41`, `:187`). These need rewriting to their retained paths at retention.
  - The describe title `'vertical alignment utilities'` (`vertical-align.test.ts:12`) is the only open spelling of that compound modifier outside the guide. This is optional.

VERDICT: FAIL 3, 6, 8; outside the claims: none
