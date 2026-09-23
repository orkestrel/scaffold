
## Deviations

1. **The acceptance criteria need report-only files.**
   - Expected: criteria 2–6 green in the worktree.
   - Found: the styles proof reads `dist/src/styles/index.css` (`configs/src/vite.styles.config.ts`
     `setupFiles`), which carries the partial only when `src/styles/index.scss` loads it. The
     section needs `COLLAPSE_COPY` and `COLLAPSE_SPECIMENS` in `app/browser/constants.ts` and the
     barrel row. The guide, the `listed` literal, and the service markup fixture are shared as
     well.
   - Evidence: the worktree's `npm run check` exits 2 with `TS2724` on the missing exports. In the
     scratch copy, the collapse proof is red (8 of 8) before the barrel line and green after it.
   - Done: all owned work. Every shared change is a patch that `git apply --check` accepts on the
     worktree. Every gate is green in a copy with the patches applied (copied with hardlinked
     `node_modules`; no shared file in the worktree was edited).
   - Hypothesis: the brief's criteria assumed the B-PASSIVE shape, where shared files were
     writable in the worktree.
2. **`tests/fixtures/tailwind/markup.html` is off-limits in the brief.**
   - Found: it is off-limits under the brief's `tests/fixtures/**` exception list, and criterion 6
     requires it. The family record's off-limits entry excepts "COLLAPSE's Tailwind fixtures"
     without naming them, so the two documents disagree on this file.
   - Evidence: with the fixture at `87ff1d0`, the consumer proof fails
     `derives the shared class names, and mounts an element for every one of them` with `collapse`
     unmounted.
   - Done: returned as a one-line patch. The file is not edited.
3. **The baseline predates B-PASSIVE-ORDER.**
   - Found: `87ff1d0` does not carry B-PASSIVE-ORDER. Main (`72fdde4`) does, through `f898502`.
     The `index.scss` hunk of the patch against `87ff1d0` fails on main
     (`patch -p1 --dry-run`: `1 out of 1 hunk FAILED`). Every other hunk applies there.
   - Done: a post-BPO patch for `src/styles/index.scss` and `tests/conformance.test.ts` follows. It
     carries the barrel line, the `listed` addition, and the order-case extension, with the
     `transitions` token mapped to the `collapse` stem.
   - Evidence: in the scratch copy with that patch, `test:conformance` exits 0 (22 passed). With
     `collapse` loaded after `button-group`, the order case exits 1.
4. **The mid-campaign ruling on `.collapsing` is applied.**
   - Change: the brief's collapsing-height and collapsing-width specimens are replaced by
     `Horizontal collapse shown` and `Horizontal collapse hidden`. `.collapsing` renders no
     specimen and no frame, because its resting paint is empty (D17).
   - Proof: the class is proved on probe elements, through its declared and resolved readings
     under `stageMedia({ motion: false })`. The installed `stageMedia` function takes
     `MediaOptions`, and `REDUCED_MOTION` is the condition text the case compares.
   - Records: the decline is written in the `CASCADE_KEYS` remarks, in § Collapse classes, and in
     the `COLLAPSE_SPECIMENS` remarks.
5. **The journey's declared-table case needs a patch.** `tests/app/browser/integration.test.ts`
   case `names a specimen the showcase declares, or its own region, as every scenario subject`
   reddened on the four new subjects. It needs `COLLAPSE_SPECIMENS` in its import and its declared
   list, and that patch is included. No driven frame is added.
6. **Criterion 4's wording is read as follows.**
   - "`readPixels` below the bottom edge" is implemented as the installed `readHit` function on
     the clipped child's centre, which sits below the panel's edge.
   - "`grep -c`" on the minified cascade returns one line, so criterion 3 reports the rule list and
     an occurrence tally instead.
7. **§ Showcase may collide with CLOSE-GUIDE.** The guide patch adds one clause to § Showcase in
   the `87ff1d0` enumeration voice. If CLOSE-GUIDE's rewrite of § Showcase lands first, drop that
   clause.

Choices settled within scope:

- Specimen names and copy.
- The card host for every panel, so a hidden panel's frame is its header.
- The hidden rows' `.card:has(> …)` selectors with `height`.
- `collapse` after `col-12` on the exclusion line (the proof compares sorted names).
- The Files row after `_pagination.scss`.
- The compatibility rows after the pagination rows, and the plugin row after the last engine row.
- The literal `0.35s ease` value.

## ROADMAP.md

No patch. The family row and the J-ENGINE carrier rows already read as D41 fold 47 left them, and
the § Surface sentence now agrees with the carrier row for `emitEvent`, `bindEventMap`, and
`Delegate` ("J-ENGINE's first cancelable-event unit moves all three"). The family row closes at the
family's exit criterion, not at this unit.

## What the unit could not close

- **The capture run and its frames.** `CAPTURE=1 npm run test:journey` is the Orchestrator's run.
  The four registered scenarios were placed without capture at every variant.
- **`.collapsing` frames.** They are declined by ruling (D17). The class has no frame at any
  variant.
- **The worktree's own `npm run check`, styles, section, conformance, guide, and service gates.**
  These go green only after the shared patches integrate (Deviation 1).
- **A later `.fade` unit.** B-CROSS owns `.fade`, which also lives in the release's
  `transitions` partial. The post-BPO order case maps `transitions` to `collapse`, so the `.fade`
  unit rules on that mapping when it gives `.fade` a partial.

Instruments (Orchestrator scratchpad, not in the tree):

- `co-unit-tools/gates.sh`, `mutate.py`, `apply-guide.py`, `sync-owned.sh`, `section.md`,
  `plugin-cell.txt`, and `logs/`.
- The validation copy `co-unit-check/`, which holds hardlinked `node_modules`. Delete it with
  `rm -rf` on that directory only.
- Both directories sit under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/`.

## Shared-file patches

Unified diff against `87ff1d0`. `git -C /home/user/veneer-co apply --check` accepts it. It changes
12 files (153 insertions, 7 deletions): `src/styles/index.scss`, `app/browser/constants.ts`,
`app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/setup.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
`guides/veneer.md`, and `tests/fixtures/tailwind/markup.html`. `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/setup.test.ts`, and `ROADMAP.md` need no change.

```diff
