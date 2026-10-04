# Unit flip-journeys-4 — finish U6 with the same-page baseline

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Complete unit U6 exactly as the earlier briefs specify (`/home/user/scaffold/tmp/codex/flip-journeys-brief.md` with its appended rulings, `flip-journeys-2-brief.md`, `flip-journeys-3-brief.md`), starting from the partial tree the third run left uncommitted, under the ruling in § The same-page baseline. The third run's report is `/home/user/scaffold/tmp/codex/flip-journeys-3-last.md`; the violations are listed in `/home/user/veneer/tmp/units/flip-journeys/third-violations.md`.

## State at launch

`git status --porcelain` reads three modified tracked files, all U6's: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`. Done: everything but the partition case's baseline and the final gates (see the third report). The partition case reads 8112 elements per face at 1280 in 16.5 s and reports 2416 violations: 2376 clause-3 border colors where a page element sits in a dark color-mode context (`div.bg-dark.border.rounded.p-2` reads `rgb(73, 80, 87)`, the dark `--bs-border-color`, against a scratch reference of `rgb(222, 226, 230)`), and 40 clause-1 "departure" flags computed from scratch deltas.

## The same-page baseline

The scratch-frame reference cannot model the page's context: a Bootstrap utility declares `var(--bs-border-color)`, a Tailwind utility `var(--tw-border-style)`, and the page resolves each inside wrappers (`data-bs-theme`, local custom properties) a lone element in a scratch frame lacks. The baseline for a face is therefore the same element under another face, read on the same page.

Rulings:

1. **Clause V (shared utilities under `unexcluded`).** For every element carrying a shared utility name and every longhand Bootstrap's rule for that name declares (shorthand-expanded), the `unexcluded` reading equals the `bootstrap` reading of the same element. Skips: the masked border width (Bootstrap alone `0px` with style `none`), and a `border-*-style` longhand Bootstrap's rule declares through a shorthand whose style value is a custom property the element's context changes. Report the skip counts.
2. **Clause C (shared component names under both Tailwind faces).** For every element carrying one of the 17 shared component names and every longhand Bootstrap's rule for that name declares, the `unexcluded` and `tailwindcss` readings equal the `bootstrap` reading of the same element, with the same skips as clause V.
3. **Clause U (shared utilities under `tailwindcss`).** For every element carrying a shared utility name and every longhand Tailwind's rule for that name declares with a context-free value, the `tailwindcss` reading equals the resolved declared value: read it once per name in a scratch frame under the Tailwind compile alone (Tailwind's own `--spacing`, `--radius-*`, `--color-*`, and `--tw-*` properties resolve there as on the page because Tailwind defines them at `:root` or through `@property`); a declared value that is `inherit`, `currentColor`, `auto`, a percentage, or a `var()` of a property Tailwind does not define is skipped and counted. The "departure expected" sub-assertion of the third run (a scratch Tailwind-alone against a scratch Bootstrap-alone delta) is removed: the delta is proved by clause U against clause V on the same element where the two values differ (report how many utility longhands differ between the `tailwindcss` and `unexcluded` readings, as the measured partition, without asserting a count).
4. **Zero violations** after these rules is the assertion; a remaining violation is reported with its key, longhand, face, expected, and read values, and is a stop.
5. **Controls** stay and must each still fail the case: the planted `.mt-3` reading, the restored withheld important (`.mt-3 { margin-top: 1rem !important }` appended to the recipe turns the `tailwindcss` reading to 16px on an `.mt-3` element), the `unexcluded` inverse (the `unexcluded` face read as if it were `tailwindcss` fails clause U), and the stripped curation (removing a curated copy changes a component witness on the page, if one exists; else state that no page element exercises it and drop that control).

## Scope deltas against the earlier briefs

None beyond § The same-page baseline.

## Acceptance criteria

The `flip-journeys-3` brief's list, bare, in order, each with its exit in the report.

## Return shape

As the earlier briefs, plus the clause counts and skips, the measured utility-delta count, the partition case's seconds, the 390px header reading, and the full journey wall time against 235 s. Nothing committed.

## Deviation contract

As the earlier briefs, with ruling 4 replacing the third run's stop.
