# Unit CL5 — typography and content classes (brief 2)

Succeeds `units/cl5-brief.md`, which stays in force for everything this brief does not name. That
brief is left unedited. What changed and why: a `checker` scope read
(`units/cl5-scope-read-report.md`) checked brief 1 against the tree and returned amendments,
every one folded in here. Read brief 1 first, then this delta.

## Corrections to brief 1

1. **The showcase barrel.** `app/browser/index.ts:1-5` is five wildcard re-exports, so it needs
   one line per new section file and nothing more. The new specimen tables reach the barrel
   through its existing constants re-export, so `app/browser/constants.ts` needs no export
   statement of its own.

2. **The `listed` condition.** The function is `collectShippedComponents`
   (`tests/setupConformance.ts:597-618`), not `deriveListed`. A component other than `engine`
   joins when its selector rows are non-empty and every one is `shipped`, and either its variable
   rows are non-empty and every one is `shipped` or its variable rows are empty and the
   inventory's projected properties array for that key is empty (`:602-616`). Every key this unit
   owns has an empty properties list, so each joins on its selector rows alone and **needs no
   variable row**. `tests/conformance.test.ts:55` currently reads `['btn', 'reboot']`.

3. **The ledger-derived case that changes.** Exactly one case in `tests/setupConformance.test.ts`
   has a population this unit moves: line 752 asserts the component set equals
   `['btn', 'reboot', 'engine']`, inside the dash-proof case at line 747, and it reads the whole
   compatibility table. Update that one. The cases at lines 615, 642, and 659 filter to the
   button component first and control their own population; leave them alone.

4. **The showcase proof is owned unconditionally.** `tests/app/browser/Showcase.test.ts:58`
   asserts the exact region-label sequence `['Showcase', 'Buttons', 'Content']`, which adding two
   sections makes false. Own that file for that assertion. Line 40 counts the main wrapper and
   line 105 counts sections after destroy; neither is affected, so leave both.

5. **No guard refuses this unit's selectors.** Brief 1's first Unknown is settled: no predicate in
   `tests/setupConformance.ts` refuses a compound selector, a combinator, a pseudo-class, or a
   pseudo-element. `scanCompatibilityPresence` (`:633-687`) checks presence by normalized selector
   string against the built cascade and the inventory, and the `MANDATED_TAG_PAIRS` remark at
   `:775-802` concerns the elements layer, which a components-layer partial does not enter.
   `.blockquote > :last-child`, `.list-inline-item:not(:last-child)`, and
   `.blockquote-footer::before` each pass once shipped and present in the built cascade. Ship them.

6. **The image class's axis.** Brief 1's second Unknown is settled as a ruling rather than a
   choice: no coded predicate governs it, because the direction-sensitive scan covers inline-axis
   longhands, shorthands, and keywords and does not include `max-width` or `height`. Follow the
   precedent at `src/styles/elements/_img.scss:4-5` and ship the logical properties. **Record the
   departure from Bootstrap's physical properties as a guide row**, because no gate enforces it
   and an unrecorded departure is exactly what CL4's audit sent back.

7. **What the calibration record measures.** It carries sections for tag families only, and no row
   for any class selector this unit ships. So brief 1's binding sentence resolves this way: the
   heading and display class twins bind to the tokens their tag partials read, under this unit's
   ruling; **every other value this unit ships is retained from Bootstrap's own line**, and your
   report names Bootstrap's line for each. Do not claim a calibration binding for a class the
   record does not measure.

8. **What the heading departure actually is, measured.** Brief 1's ruling stands, and the guide
   row it calls for must say more than "fixed rather than fluid". The Orchestrator read the
   pinned inventory's `font-size` declarations against `src/styles/_tokens.scss:221-233`:

   | Key | Bootstrap's capped size | The token its tag reads | Equal |
   | --- | --- | --- | --- |
   | `h1` | `2.5rem` | `--vn-size-8` `2.25rem` | no |
   | `h2` | `2rem` | `--vn-size-7` `1.875rem` | no |
   | `h3` | `1.75rem` | `--vn-size-6` `1.5rem` | no |
   | `h4` | `1.5rem` | `--vn-size-5` `1.25rem` | no |
   | `h5` | `1.25rem` | `--vn-size-4` `1.125rem` | no |
   | `h6` | `1rem` | `--vn-size-3` `1rem` | yes |
   | `display-1` to `display-6` | `5rem` to `2.5rem` | `--vn-display-1` to `--vn-display-6`, same values | yes |

   So the two families depart differently, and one guide row cannot cover both honestly. The
   display twins ship Bootstrap's capped value unchanged and depart only by being unconditional
   where Bootstrap's grow with the viewport below the `xl` width. The heading twins depart on the
   value itself at every level but `h6`, each smaller than Bootstrap's cap, as well as being
   unconditional. Write a row for each family saying which of those two things it does. Take
   your own reading of the shipped values before writing either row, and report both readings.

9. **The shared-block rule, granted up front.** `.claude/rules/styles.md` moves a declaration
   block shared by two partials into `src/styles/_mixins.scss`, and CL4's audit sent that finding
   back twice, so this unit closes it rather than meeting it at a deviation stop. **This brief
   grants `src/styles/_mixins.scss`** for the mixins a block shared by two of this unit's
   partials needs, and for nothing else: change no existing mixin. Before your gate chain, sweep
   every pair of partials under `src/styles/components/`, including the button partial you do not
   own, and extract each shared block of two or more identical declarations. Report the sweep's
   population, its pairs, and its result. If a pair you find sits in the button partial alone
   with one of yours and extracting it would change a resolved reading, stop and report rather
   than extracting it.

10. **An obligation carried from CL4b.** `tests/app/browser/sections/ContentSection.test.ts`
    compares rendered markup against the specimen table's own `markup` values, and the literal
    tag sequence beside it controls element names alone. So changing an attribute value or a code
    sample's text inside a specimen leaves every assertion in that file green. CL4b closed the
    name half of this and its brief scoped out the markup half, which was the Orchestrator's
    under-scoping rather than that unit's. You own the file already. Give the markup assertion an
    independent control in the form the file's existing controls take, and prove it the way CL4b
    proved its own: plant a change to one specimen's markup that no current assertion catches,
    record the red run, restore it, and record the green run. Give the two sections you write the
    same control from the start, so their proofs do not repeat this gap.

## Owned set, restated in full

Brief 1's Owned list, with `tests/app/browser/Showcase.test.ts` added, the showcase barrel entry
narrowed to the two section re-export lines, and `src/styles/_mixins.scss` added for correction 9
alone. Brief 1's Off-limits list otherwise stands unchanged, and `src/styles/components/_button.scss`
becomes writable only for a shared-block extraction the sweep finds, never for any other edit.

## Acceptance criteria, amended

Brief 1's criteria stand, with these corrections:

- Criterion 1 reads `collectShippedComponents` rather than any other name, and expects each owned
  key present in `tests/conformance.test.ts`'s `listed` value with no variable row added.
- A criterion is added: the component set at `tests/setupConformance.test.ts:752` and the region
  sequence at `tests/app/browser/Showcase.test.ts:58` are both updated to the state this unit
  finishes in, and no other case in either file is touched.
- A criterion is added: the guide carries a departure row for the image class shipping logical
  properties where Bootstrap ships physical ones, one row for the heading twins departing on the
  value at every level but `h6` as well as on the condition, and one row for the display twins
  shipping Bootstrap's capped value unconditionally. Each row rests on a reading you took.
- A criterion is added: no two partials under `src/styles/components/` share a block of two or
  more identical declarations, and the sweep that establishes it is recorded with its population,
  its pairs, and its result.
- A criterion is added: a change to one specimen's markup that no current assertion catches
  reddens the content section's proof, recorded red then green, and the two new sections carry
  the same control.
