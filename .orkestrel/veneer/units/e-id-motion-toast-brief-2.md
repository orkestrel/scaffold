# Unit E-ID-MOTION-TOAST, continued — the fade case names each component's transitioned properties

Successor to `e-id-motion-toast-brief.md`, which stays in place unedited and still binds except where this brief
overrides it. What changed: the unit stopped on its deviation contract (`e-id-motion-toast-report.md`): the case
`fades the alert, toast, tooltip, popover, tab pane, and modal, and leaves each shown component its own opacity` in
`tests/src/styles/components/fade.test.ts` expects `transition-property` to equal `opacity` on the toast rows of
`FADE_COMPONENT_CASES`, and the toast now reads `opacity, transform`. The brief's search patterns could not match the
row spelling `toast fade show showing`; the defect is the brief's. This brief rules the fork, grants the files the
ruling needs, and sends the unit on. The work already in `/home/user/veneer-mtoast` (uncommitted over `6586b11`) stays.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-mtoast`, resumed.

## The ruling

1. **Keep the fade case exact.** Do not apply `tmp/units/mtoast-fade-test.patch`: a list that only has to include
   `opacity` would pass a component that starts transitioning an unintended property. Instead, each
   `FADE_COMPONENT_CASES` entry carries a `transitions` member, the frozen list of properties that component's fade
   compound transitions, in the order Chromium serializes `transition-property`. The toast's entry reads
   `['opacity', 'transform']`; every other entry reads `['opacity']`. The fade case compares each set's
   `transition-property` with its entry's list, joined as Chromium writes it.
2. **The `## Engine` Toast paragraph.** Apply the paragraph hunk of `tmp/units/mtoast-guide-report-only.patch`. The
   engine session owns that section; the Orchestrator sends it the hunk before the landing, as for the offcanvas clause.
3. **The § Compatibility toast selector row.** Apply that row's hunk of the same patch.

## Scope, added to the first brief's

**Owned, added.** In `tests/setupStyles.ts`, the `FADE_COMPONENT_CASES` entries and the type or doc block they carry;
in `tests/setupStyles.test.ts`, the `FADE_COMPONENT_CASES` case (pin the new member: every list is frozen, non-empty,
and names `opacity`); in `tests/src/styles/components/fade.test.ts`, the fade case and its comment; in `guides/veneer.md`,
the `## Engine` Toast paragraph and the § Compatibility toast selector row.

## Execution

Perform the assignment directly and spawn nothing.

1. Search `tests/` for every other reading of a toast's `transition-property`, `transitionProperty`, or transition list,
   by the spellings `toast fade`, `toast show`, `.toast`, and `toastCascade`, and report the search. Stop if a hit sits
   outside the owned set.
2. Apply the ruling. Run the fade case red first on the ruled table with the toast entry set to `['opacity']`, then green
   with `['opacity', 'transform']`.
3. Add a plant, `fade-transitions`, logged and restored byte-identically: the toast entry's list set to `['opacity']`. It
   fails the fade case with an `AssertionError`. Re-run the round's earlier plants.
4. Run every Acceptance gate of the first brief, logged under `tmp/units/` with the `-2` suffix. `npm run test:src:styles`
   over the whole project joins the criteria: it exits 0.

## Output

Write `tmp/units/mtoast-report-2.md` and return the same text, covering the whole unit: the stop, the ruling applied, the
search, the red and green readings, the plant table, the gate table, the `## Engine` hunk as applied,
`tmp/units/mtoast-2.diff` (`git diff 6586b11`), and `tmp/units/mtoast-2-status.txt`. State no count in prose.

## Deviation contract

As the first brief's, and stop when the Execution step 1 search finds a reading outside the owned set.
