1. **CONFIRMED — Scope and delta.** The scope attack found no additional path or unrelated edit. The worktree’s tracked files equal `2a3f223`; `git apply --check` against `tp-shared-3.patch` exits 0. The retained fresh-extract check also records successful application and byte comparison (`tp-instruments/tp-check-3.log.txt:1`). In-memory reconstruction confirms that the owned diff equals the worktree and that the round-2 and round-3 diff/status pairs are identical.

   Against round 1, shared changes are confined to `app/browser/constants.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`, `tests/setup.ts`, and `tests/setupStyles.test.ts`. Against round 2, only the plugin rows and table padding change. The owned changes match the prescribed specimen, assertion, and comment repairs (`tp-instruments/tp-owned-2-vs-1.diff:1`, `tp-instruments/tp-shared-2-vs-1.diff:1`).

2. **CONFIRMED — Box mutations.** I read `tp-instruments/tp-mutations-2.log.txt:3` and the passing style run at `tp-instruments/tp-gates-2.log.txt:3`. Each mutation records a successful rebuild, a failing test exit, and the named box case. The assertions distinguish the mutations:

   | Mutation | Distinguishing assertion | Retained log |
   |---|---|---|
   | Tooltip horizontal padding becomes `0.5rem` | Density retuning requires `16px`, rather than the literal’s `8px` (`tests/src/styles/components/tooltip.test.ts:138`). | `tp-mutations-2.log.txt:3` |
   | Tooltip font size becomes `0.875rem` | Retuning the size token requires `20px` (`tooltip.test.ts:145`). | `tp-mutations-2.log.txt:10` |
   | Popover body vertical padding becomes `1rem` | Density retuning requires `32px` (`tests/src/styles/components/popover.test.ts:147`). | `tp-mutations-2.log.txt:17` |
   | Popover header font size becomes `1rem` | Retuning the size token requires `24px` (`popover.test.ts:157`). | `tp-mutations-2.log.txt:24` |

   Matching default values therefore cannot conceal a literal binding. These rulings use retained browser runs and assertion inspection, not a browser run performed during this audit.

3. **CONFIRMED — Untitled specimen and headers.** The specimen has bottom placement, its own identifier, an empty `h3` header, and populated body (`tp-shared-3.patch:135`). Its capture subject and resting row select the body’s `color` property (`tp-shared-3.patch:1063`, `:1135`), which the popover body rule sets (`src/styles/components/_popover.scss:161`). The selected body remains a rendered box; the hidden header is only the selector’s preceding sibling.

   The decline text is removed from the TSDoc, registry remarks, and guide. Every header in `POPOVER_SPECIMENS` uses the release template’s `h3` element (`tp-shared-3.patch:115`; `node_modules/bootstrap/js/src/popover.js:27`). The section population includes the untitled specimen while placement assertions still derive from `TIP_PLACEMENTS` (`tests/app/browser/sections/PopoverSection.test.ts:30`, `:43`, `:144`).

   The attacks were an untitled `h2` header and a populated untitled header. The assertions distinguish them through the child-tag sequence and empty `childNodes` collection (`PopoverSection.test.ts:89`). Each retained run fails the contract case (`tp-instruments/tp-mutations-2.log.txt:66`, `:73`); the section control passes (`tp-instruments/tp-gates-2.log.txt:6`). This confirms the registration and proof, not an already-produced capture frame.

4. **BROKEN — Universal arrow-property coverage.** The assertion that “no arrow property the release records escapes the table” is false. The inventory records `display`, `position`, `content`, and `border-style` on arrow selectors (`tests/fixtures/oracle/inventory.json:71068`, `:71090`). The binding deliberately filters those properties out (`tp-shared-3.patch:1274`), and `TIP_ARROW_PROPERTIES` omits them (`:1431`). A read-only enumeration reproduced these exclusions.

   The narrower proof works: it derives dimensions, offsets, border widths, and border colors from the inventory, expands the shorthands, and compares the resulting set. Dropping `border-left-color` is distinguished by the equality assertion. The retained run fails precisely that binding case (`tp-instruments/tp-mutations-2.log.txt:31`); an independent in-memory comparison also rejects the dropped entry.

   The utility sentences name the required positioning and translation utilities (`tp-shared-3.patch:50`, `:98`, `:208`, `:276`). The smallest correction is to narrow the claim’s universal clause to the property categories the table documents and checks. The evidence does not require expanding that table’s contract.

5. **CONFIRMED — P6 repairs.** The plugin rows distinguish unconditional shown-state handling from animation-dependent fading (`tp-shared-3.patch:810`). With animation disabled, the release still adds `show` and skips `fade` (`node_modules/bootstrap/js/src/tooltip.js:217`, `:319`).

   The retained placement attacks change the tooltip’s top entry and the popover’s end entry. The assertions distinguish these changes through the expected edge coordinates, painted border, and triangle offsets (`tests/src/styles/components/tooltip.test.ts:168`; `tests/src/styles/components/popover.test.ts:194`). Their retitled cases fail in `tp-instruments/tp-mutations-2.log.txt:46` and `:57`.

   The width case includes every specimen, rejects widths at or above `276px` at viewport width 390, and requires `276px` at viewport width 1280 (`tests/app/browser/sections/PopoverSection.test.ts:164`). Its inverted filter fails the named case (`tp-instruments/tp-mutations-2.log.txt:39`); the passing control is `tp-instruments/tp-gates-2.log.txt:6`.

   The added triangle descriptions use the pseudo-element names; the guide uses explicit-placement wording and gives each arrow’s literals the geometry rationale (`tp-shared-3.patch:194`, `:261`). The mixin comment names the `start` keyword, and the outside-ledger sentence names J-ENGINE and CROSS-FADE (`:880`, `:378`).

6. **CONFIRMED — Plugin-row obligations.** The omission attack fails: the final rows retain the restored construction, sanitizing, and method clauses alongside the round-2 clauses (`tp-shared-3.patch:810`).

   The release supports the Tooltip row’s consumer construction and absence of automatic data-API initialization, defaults, methods, and cancelable events (`node_modules/bootstrap/js/src/tooltip.js:58`, `:105`, `:184`, `:242`, `:326`, `:631`; `dom/event-handler.js:282`). It creates the identifier, writes the trigger’s ARIA reference, adds the automatic-placement class, and writes the placement attribute (`tooltip.js:206`, `:313`, `:315`, `:432`). Its template factory receives the configuration and sanitizes through the sanitizer utility (`tooltip.js:334`; `util/template-factory.js:141`).

   Popover inherits the constructor and instance methods, spreads Tooltip defaults, supplies its stated overrides, and maps title/content into the header/body (`popover.js:20`, `:42`, `:62`). Its name supplies the event namespace through the inherited base machinery (`popover.js:52`; `base-component.js:73`). Falsy **resolved content** reaches removal; an empty element remains truthy and takes the element branch (`util/template-factory.js:121`). That adjacent empty-element case does not falsify the corrected row.

7. **CONFIRMED — Retained round-1 confirmations.** The semantic-drift attack fails. Reconstruction shows no executable change to the partials’ declarations, reset mixin, registry ordering, or barrel/showcase ordering; the altered partial and mixin text is commentary. The corresponding sites remain `src/styles/components/_tooltip.scss:43`, `src/styles/components/_popover.scss:43`, and `tp-shared-3.patch:882`, `:901`, `:1029`.

   Removing reset declarations remains distinguishable: the fixture compares the reset element against independently declared values and verifies that the staged values differ (`tp-shared-3.patch:1604`). I read the retained decoration and line-breaking failures at `tp-instruments/tp-mutations.log.txt:31` and `:38`, and the restored style run at `tp-instruments/tp-gates-2.log.txt:3`. The changed untitled registration is addressed under claim 3.

8. **BROKEN — Law and report.** The exact-command requirement remains unmet. The round-2 report abbreviates the format and lint commands as running “over every changed file” or “every changed TypeScript file” (`b-modal-tp-report-2.md:222`). The actual arguments exist in `tp-instruments/tp-gates-2.log.txt:24`. Copy those complete command lines into a successor report. The retained gate results themselves agree with the reported results; I read `tp-gates-2.log.txt`, `tp-gates-3.log.txt`, and the worktree format/lint logs.

   The added documentation also retains false wording:

   - The Popover TSDoc says “one per explicit placement,” although the untitled specimen adds another bottom placement (`tp-shared-3.patch:93`, `:127`, `:135`). Describe the placement specimens and the untitled specimen without that cardinality claim.
   - The Popover guide paragraph still says the plugin sets `fade` without the animation condition (`tp-shared-3.patch:273`). With `animation: false` and the default template, the release skips that class (`node_modules/bootstrap/js/src/tooltip.js:311`, `:319`, `:365`). Apply the condition already present in the compatibility row.

   The syntax attack found no introduced prohibited type assertion, non-null assertion, unrestricted type, or forbidden nested function. AST inspection covered introduced TypeScript nodes in `tp-2.diff` and `tp-shared-3.patch`; the text sweep found no introduced suppression, mock, spy, or fake.

   **Outside finding `report-counts` — BROKEN.** The reports retain growable-set tallies in authored prose: “Both rows” (`b-modal-tp-report-2.md:155`) and “one hunk” (`b-modal-tp-report-3.md:106`). These violate the count rule independently of whether the stated quantities are accurate. Replace those phrases with the named rows and the compatibility-table location. Preserve actual run-result quantities as evidence.

   The requested count record follows:

   | Report location | Counts stated |
   |---|---|
   | Round 2, `:40`–`:43` | Mutation summaries: failed/passed/total `1/8/9` and `1/10/11`, repeated for inset and size. |
   | Round 2, `:84`, `:95`, `:100`–`:102` | Quoted specimen multiplicity; `9` and `146` passed; header mutations `1/4/5`, with the second result described as the same summary. |
   | Round 2, `:127`, `:142`, `:144` | `19` passed; `146` passed; binding mutation `1/125/126`. |
   | Round 2, `:155` | “Both rows.” |
   | Round 2, `:191`, `:196`, `:200` | Mutation summaries `1/4/5`, `5/4/9`, and `3/8/11`. |
   | Round 2, `:215`–`:221` | Passing populations `31`, `9`, `146`, `22`, `19`, and `5`; policy `109` passed plus `1` skipped of `110`. |
   | Round 2, `:228` | Formatting population `359` files using `4` threads. |
   | Round 3, `:22`, `:106`, `:115` | Target text matches “once”; “one hunk”; `16` changed files, `1028` insertions, `220` deletions. |
   | Round 3, `:126`–`:128`, `:134`, `:149` | `22` and `19` passed; policy `109` passed plus `1` skipped of `110`; `359` files using `4` threads; earlier conformance result `6` failed plus `16` passed of `22`. |

   Viewport dimensions, CSS lengths, column width, durations, versions, exit codes, and reference identifiers are values rather than population tallies.

**Attacked and held:** Matching default literals do not defeat the retune assertions. Truthy empty elements correctly remain distinct from falsy content. The hidden untitled header does not make its selected body invisible. Compatibility-table padding is a formatting consequence, and the unchanged stacking paragraph remains MODAL’s assigned work.

VERDICT: FAIL 4, 8; outside the claims: report-counts