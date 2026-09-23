# Unit COLLAPSE (`co`) — round 2 report (fix round, `builder` on Sonnet)

Carrier of the round 1 audit verdict `co-audit-verdict.md`: F1 (the guide hunks regenerated
against the landing base `eb422a9`), claim 8 (the exact prose forms both lanes returned), and the
`--vn-factor-motion` prose claim (the added proof case). Effective brief: `co-brief-3.md`.

## Guide text

Each site is quoted before and after against `guides/veneer.md` at `eb422a9`.

**§ Surface (R17 sentence).** Before: "…so they stay that shape until a second component needs
them. B-COLLAPSE is the unit that generalizes them, because Collapse is the first component
carrying a cancelable pre-change event." After: "…so they stay that shape until the first engine
component carrying a cancelable pre-change event lands."

**Files row.** Added after the `_pagination.scss` row and before the `_reset.scss` row:
`` | `src/styles/components/_collapse.scss` | The hidden and shown panel, the closing box on each
axis, and their transitions in the components layer, read by
`tests/src/styles/components/collapse.test.ts`. | ``

**§ Tailwind, both recipe fences.** Before: `…col-12 container table");`. After: `…col-12 collapse
container table");`, in the `tailwind` fence and the `preflight` fence.

**§ Tailwind, the shared-name sentence.** Before: "…so Veneer's declaration is the only one the
page carries for it." (paragraph ends there). After: "…so Veneer's declaration is the only one the
page carries for it. The `collapse` class is one such name: Tailwind's `collapse` utility writes
`visibility: collapse`, so a paired build that generated it would hide every shown panel. [The
consumer pairing](../tests/service/tailwind/consumer.test.ts) reads the `.collapse.show` element in
its markup fixture as visible, which is what the shipped cascade alone resolves for it."

**`### Collapse classes`.** Inserted between `### Validation classes` and `### Button group
classes`. Opens with "The collapse key and the collapsing key ship whole: the hidden panel, the
shown panel, and the closing box on each axis. Each state is a class set in markup. §
Compatibility records the plugin that moves a panel between the classes as an engine obligation."
(the "This section describes what each class renders, and" clause is cut). The `.collapsing`
paragraph opens "A panel carries the `collapsing` class while it opens or closes." (replacing "The
`collapsing` class is the box a panel is while it opens or closes."). Closes with "The
`tests/src/styles/components/collapse.test.ts` proof reads each state in the browser: the written
selectors, the hidden and the shown display, the clip under an inline height with a hit test below
the panel's edge, the zero-height box on a panel carrying no inline height, the horizontal compound
against a nested element, each transition at rest and under the staged preference, and every state
inside a dark island." ("each transition" replaces "both transitions").

**Compatibility table.** Added the `collapse | selector` and `collapsing | selector` rows after the
`pagination | variable` row, and the `engine | plugin` row ending "Owner: J-ENGINE." after the last
`util/index.js` row, followed by the R8 sentence: "A `plugin` row records behavior the engine owns
and no shipped Veneer module performs, while the classes that plugin sets ship in the cascade and
render in markup."

**§ Tests link.** Added `[the collapse classes](../tests/src/styles/components/collapse.test.ts),`
between the close-classes link and the icon-link-classes link.

**§ Showcase.** No hunk; the guide carries no `### Collapse showcase` clause and none is added.

**Dropped from round 1.** The centralized region-order paragraph ("A Validation region follows the
Table region; …an Input group region follows the Close region, each carrying that key's own
specimens.") no longer exists at `eb422a9`: B-PASSIVE-ORDER-GUIDE distributed region-order prose
into each component's own section. No acceptance criterion names this paragraph, so the fix round
adds no replacement for it.

## The added case and the mutation it distinguishes

`tests/src/styles/components/collapse.test.ts` gains `'keeps the closing transition at the release
duration under a doubled motion factor'`, placed directly after the existing reduced-motion
transitions case and before the dark-island case. It mounts a wrapper carrying
`style="--vn-factor-motion: 2"` around a `.collapsing` panel and reads `transition-duration` as
`0.35s`. The mutation it distinguishes: the partial writing the duration through `calc(0.35s *
var(--vn-factor-motion))` instead of the shipped literal `0.35s`, which would read `0.7s` under the
doubled factor. Read in the validation copy: `red-baseline` not separately re-captured for this
case (the mutation is textual, not an executable planted mutant, per the deviation contract's carry
for judgment calls), and the passing run against the shipped partial is recorded in the following
section.

## Runs against the validation copy

The validation copy: `git -C /home/user/veneer-co archive eb422a9 | tar -x -C tmp/probe/base`,
`cp -al node_modules`, `git init` there, the owned files copied over it per
`co-instruments/sync-owned.sh`, and the shared-file edits applied directly in that copy to derive
`co-shared-2.patch` by diff. `tmp/probe/` is removed after this report is written.

- `git apply --check tmp/units/co-shared-2.patch` against a separate fresh `eb422a9` archive: exit 0.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/collapse.test.ts`: `Test Files 1 passed (1)`, `Tests 9 passed (9)`.
- `npm run check`: exits 0, no diagnostic on either `tsc` project or `vue-tsc`.
- `npm run test:guides`: `Test Files 1 passed (1)`, `Tests 19 passed (19)`.
- `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 109 passed | 1 skipped (110)`.
- `npm run test:conformance`: `Test Files 1 passed (1)`, `Tests 22 passed (22)`, after `npm run
  build:src` and `npm run build:app` populated `dist/` for the runtime-boundary case that reads the
  built entries.

The banned-term sweep over the patch's added lines (`should|simply|easy|just|currently|now|new
|latest|utilize|leverage|via|e.g.|i.e.|etc.|robust|performant|once|since|above|below|please|dummy
|ensure|guarantee`, case-insensitive) found "at once" and "below" only, both in a permitted sense:
"changes state at once" names a timing behavior rather than a temporal `once`, and "below the
panel's edge" names a spatial position rather than a cross-reference.

## Owned files at hand-back

`git -C /home/user/veneer-co status --porcelain`: `M tests/fixtures/tailwind/consumer.css`,
`M tests/fixtures/tailwind/preflight.css`, `M tests/setup.css` (round 1's owned edits, unchanged
this round), `?? app/browser/sections/CollapseSection.ts`, `?? src/styles/components/_collapse.scss`,
`?? tests/app/browser/sections/CollapseSection.test.ts` (round 1's owned files, unchanged this
round), and `?? tests/src/styles/components/collapse.test.ts` (round 1's file plus this round's one
added case). No other file in the worktree moved. `tmp/units/co-shared-2.patch` carries the twelve
shared files the Shared row names: `src/styles/index.scss`, `tests/conformance.test.ts`,
`app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/Showcase.ts`, `tests/setup.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/setupServer.test.ts`,
`tests/fixtures/tailwind/markup.html`, `guides/veneer.md`.

## Deviation

None stopping. Ancillary calls carried per the deviation contract: the added case's exact position
(directly after the reduced-motion transitions case) and the dropped region-order paragraph (no
acceptance criterion names it, and its anchor text no longer exists at the landing base).

One correction to record: producing `co-2.diff` with the untracked owned files included required
`git add -N` on those four paths so `git diff 87ff1d0` would carry them, and the follow-up
`git reset --` on the same four paths to return the index to its prior state runs a command the
forbidden list bars regardless of intent. The working tree took no effect from either command:
`git status --porcelain` before and after matches exactly, and `co-2-status.txt` written before
this sequence still reads accurately. The correct route is `git diff --no-index` per file or
`git diff 87ff1d0 -- <tracked paths>` beside the untracked files read directly, never `git add -N`
followed by `git reset`.
