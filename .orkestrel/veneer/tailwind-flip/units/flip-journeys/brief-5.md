# Unit flip-journeys-5 — finish U6 with the winner model

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U6 as the earlier briefs specify (`/home/user/scaffold/tmp/codex/flip-journeys-brief.md` with its appended rulings, `flip-journeys-2-brief.md`, `flip-journeys-3-brief.md`, `flip-journeys-4-brief.md`), starting from the partial tree the fourth run left uncommitted, with the partition case rebuilt on § The winner model, which replaces the clause definitions of the second, third, and fourth briefs where they differ. The fourth run's report is `/home/user/scaffold/tmp/codex/flip-journeys-4-last.md`; its violations are in `/home/user/veneer/tmp/units/flip-journeys/fourth-violations.md`.

## State at launch

`git status --porcelain` reads three modified tracked files, all U6's. Done: everything but the partition case and the final gates. The fourth run's same-page baseline removed the scratch-context errors and left 892 violations of three kinds: a competing class (`a.visually-hidden-focusable.d-inline-block.p-2` reads `padding-top: 0px`, because `.visually-hidden-focusable:not(:focus):not(:focus-within)` declares `padding: 0 !important`), a resolved `auto` margin read through its physical longhand (`div.me-auto` `margin-right`), and the 17 shared component names under `unexcluded` (`.container` `max-width` reads Tailwind's `1280px`), which the fourth brief wrongly expected to read Bootstrap's value. `lint:check` reads one error at `tests/app/browser/integration.test.ts:1032:37` (`readonly T[]` on a non-simple type; write `ReadonlyArray<T>`).

## The winner model

For each showcase element E carrying a shared name N (one of the 192 utilities or the 17 component names `caption-top`, `col-1` to `col-12`, `col-auto`, `collapse`, `container`, `table`), each face F, and each longhand L that either system's rule for N declares (shorthands expanded, logical longhands mapped to the physical longhand the page reads), the winning system is fixed by the cascade and the sheets:

| N | F = `unexcluded` | F = `tailwindcss` |
| --- | --- | --- |
| utility (192) | Bootstrap (its unlayered `!important` beats Tailwind's layered `utilities`) | Tailwind where Tailwind's rule declares L (Bootstrap's rule is withheld); otherwise no declaration from N |
| component (17) | Tailwind where Tailwind's rule declares L (its `utilities` layer beats Bootstrap's `bootstrap` layer); otherwise Bootstrap | Bootstrap (Tailwind's rule is excluded from the compile) |

Expected reading by winner:

- **Bootstrap wins:** the reading equals the same element's `bootstrap`-face reading (same-page baseline).
- **Tailwind wins:** the reading equals Tailwind's declared value for L, resolved once per name in a scratch frame under the Tailwind compile alone (Tailwind's `--spacing`, `--radius-*`, `--color-*`, `--container-*`, and `--tw-*` properties resolve there as on the page).
- **No declaration from N:** no comparison.

Skips, each counted and reported per clause, applied before a comparison:

1. **Competing class.** Another rule matching E (through a class, attribute, or pseudo-class other than `.N` alone) declares L in a sheet of the face and outranks N's rule on L (an unlayered `!important`, a later rule in the same layer at equal or higher specificity, a higher layer): read from the face's CSSOM once per element with `Element.matches`. The `.visually-hidden-focusable` padding is the measured instance.
2. **Resolved declared value.** The declared value of L in the winning rule is `auto`, a percentage, `inherit`, `currentColor`, a `calc()` of the viewport, or a `var()` of a property neither sheet defines at `:root`; applied to the physical longhand a logical declaration maps to (`me-auto` declares `margin-inline-end: auto`, read as `margin-right`).
3. **Masked border width.** A `border-*-width` longhand where the same element reads `border-*-style: none` under the `bootstrap` face.
4. **Geometry.** L is a layout-resolved longhand (`width`, `height`, `inline-size`, `block-size`, `min-*`, `max-*` when declared as a percentage or `auto`, `inset-*`, `top`, `right`, `bottom`, `left`, `grid-template-*`, `position-area`, `flex-basis` as a percentage).

The assertion is zero violations after the skips; a remaining violation is reported with its key, longhand, face, winner, expected, and read values, and is a stop. Report, as the measured partition, the count of (element, longhand) pairs where the `tailwindcss` and `unexcluded` readings differ on a utility name and on a component name.

Controls (each must fail the case alone): a planted `.mt-3` reading; the restored withheld important (`.mt-3 { margin-top: 1rem !important }` appended to the recipe turns the `tailwindcss` reading of an `.mt-3` element to 16px); the inverse (reading the `unexcluded` face under the `tailwindcss` column of the model); the stripped curation where a page element exercises a curated copy, else stated and dropped.

## Scope deltas against the earlier briefs

None beyond § The winner model. Fix the lint error in `tests/app/browser/integration.test.ts`.

## Acceptance criteria

The `flip-journeys-3` brief's list, bare, in order, each with its exit in the report.

## Return shape

As the earlier briefs, plus the comparison and skip counts per clause and skip kind, the measured partition counts, the partition case's seconds, the 390px header reading, and the full journey wall time against 235 s. Nothing committed.

## Deviation contract

As the earlier briefs, with the winner model's zero-violation assertion as the stop.
