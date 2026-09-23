# Unit B-PASSIVE-C-3 report — completing `tmp/units/b-passive-c-brief-2.md`

Every finding of the round-2 brief is closed in the owned files. Each proof change runs red under its
named mutation and green after the exact reverse edit. Every card and list-group frame and
accessibility artifact is regenerated for the four variants. The acceptance gates exit 0.
`npm run test:setup` is red on the two standing blockers the brief names and on nothing else.

Executor: `opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bc`.

## State at resumption

I read the worktree's diff and untracked files before any change. The interrupted run had already
landed every finding. The tree left one defect, a proof-quality one, which the next section records.

| Finding | Reading at resumption | Evidence in the tree |
| --- | --- | --- |
| 1 — palette consequence | Closed | `list-group tokens` palette case retunes the palette token and `--vn-color-primary-base` one at a time on the document element and reads the selected row's paint; `LIST_GROUP_PALETTE_CASES` gained a `paint` column bound to the recorded `.list-group-item.active` declarations in `tests/setupStyles.test.ts`. |
| 2(a) — tab guard | Closed | The resting link sits inside `.card-header-tabs` beside the active one. |
| 2(b) — action guard | Closed | `LIST_GROUP_ACTION_HOSTS` and `LIST_GROUP_ACTION_MARKUP` (resting and `active`, anchor and button); every host is driven in each state case; binding rows in `tests/setupStyles.test.ts`. |
| 2(c) — group children | Closed | The card-group case mounts both cards with header, `.card-img-top`, body, `.card-img-bottom`, and footer, and reads the facing and outer corner of each child. The card-list case mounts the group first, last, and enclosed. |
| 2(d) — override shadowing | Closed | Both override cases set the retune on an ancestor, assert the release values, then set it on the component and assert it lands. |
| 3 — specimens | Closed | `Card group` renders `.card-img-top` and `.card-footer` on the first and last cards and a header and `.card-img-bottom` on the middle one; `Card list corners` places the group first in one card and last in another; `CardSection.test.ts` asserts every `.card-group > .card:not(:first-child)` / `:not(:last-child)` child and both `.card > .list-group` ends; `card-list-corners` is in `CASCADE_KEYS` and `CaptureSubject`. |
| 4 — anchors | Closed in markup and proofs; not measured | Every `.card-link`, header `.nav-link`, and list-group action anchor carries `href="#main"`; both section proofs assert it. The frames post-dated the last `constants.ts` edit, but no keyboard-walk reading and no artifact reading reached a report. |
| 5 — guide | Closed | No tally in § Card classes; both barrel sentences read "The component partial loads in the components layer, at the barrel's Bootstrap order"; `active` and `disabled` written as the class words; the button-host sentence matches finding 2(b). |
| 6 — `LIST_GROUP_KEYS` doc block | Closed | States the element frame of the lifted specimen, the reading after the shot, and D7's measured reasons (page frame loses the hover; in-place element frame blank at the 390-wide variants). |
| 7 — minor | Closed | The comment above the `#{''}` declarations in `_card.scss` (its compile claim checked with `sass`: `--x: #{''}` emits `--x: ;`, the same empty declaration `--y: ;` emits); the card-group title reads "only at and above its boundary". |

## Change this round

- `tests/src/styles/components/list-group.test.ts`: the palette case title was
  `'paints a selected row from $token and leaves it where the primary role moves'`, and two rows
  share the token `--vn-palette-blue`, so two cases carried one title and the red reading named no
  single row. The title is `'paints $paint on a selected row through $property and leaves it where
  the primary role moves'`. No assertion changed.

No other source file was edited. The capture journeys rewrote the portfolio under
`tmp/capture/states/`. Every other write this round was a transient plant, reverted by its exact
reverse edit and checked by SHA-256.

## Per finding — mutation, red, green

Each proof ran with the exact command shown, under the plant, then again after the exact reverse
edit. The harness is `scratchpad/mut/run.sh` with `scratchpad/mut/plant.py`, which refuses a plant
whose anchor text does not occur exactly once. Here `scratchpad` is
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad`, and each red log is
`scratchpad/mut/<name>.red.txt`.

Styles command: `npm run test:src:styles -- tests/src/styles/components/<file>`.

| Finding | Mutation (plant) | Red reading | Failing case and assertion | Green reading |
| --- | --- | --- | --- | --- |
| 1 | `_list-group.scss`: `--bs-list-group-active-bg: var(--vn-palette-blue)` written `#0d6efd` | `list-group.test.ts`: exit 1, 1 failed, 32 passed (33) | `list-group tokens > paints 'background-color' on a selected row through '--bs-list-group-active-bg' …`; the paint does not follow the palette retune (`list-group.test.ts:314`) | exit 0, 33 passed (33) |
| 2(a) | `_card.scss`: `.card-header-tabs .nav-link.active` written `.card-header-tabs .nav-link` | `card.test.ts`: exit 1, 1 failed, 23 passed (24) | `card geometry > paints an already active header tab into the cap and pulls each header navigation flush`; the resting tab takes the cap fill (`card.test.ts:229`) | exit 0, 24 passed (24) |
| 2(b) | `_list-group.scss`: `:not(.active)` dropped from the hover, focus, and press rules | `list-group.test.ts`: exit 1, 3 failed, 30 passed (33) | `list-group actions > paints a resting action on 'hover' / 'focus' / 'active' and leaves a selected one alone, on either host`; the selected anchor `Ash` and the selected button `Fir` read the driven paint and lift `1` instead of their own fill and lift `2` | exit 0, 33 passed (33) |
| 2(c) | `_card.scss`: `.card-group > .card:not(:last-child) > .card-img-top,` removed from its selector list | `card.test.ts`: exit 1, 1 failed, 23 passed (24) | `card groups > joins its cards into one row only at and above its boundary`; `expected 5 to be +0` on the facing corner (`card.test.ts:380`) | exit 0, 24 passed (24) |
| 2(d) card | `_card.scss`: `--bs-card-spacer-x` moved from `.card` to a `:root` rule in the same layer, so the release value still resolves and an ancestor's value leaks | `card.test.ts`: exit 1, 1 failed, 23 passed (24) | `card tokens > shadows an ancestor retune and takes the compatibility properties set on the card`; `expected 30 to be 16` (`card.test.ts:268`) | exit 0, 24 passed (24) |
| 2(d) list group | `_list-group.scss`: `--bs-list-group-item-padding-x` moved from `.list-group` to a `:root` rule | `list-group.test.ts`: exit 1, 1 failed, 32 passed (33) | `list-group tokens > shadows an ancestor retune and takes the compatibility properties set on the group`; `expected 30 to be 16` (`list-group.test.ts:334`) | exit 0, 33 passed (33) |

The 2(d) plants hoist the declaration rather than delete it. A deletion leaves the slot unresolved,
which reddens the geometry, token, and factor cases as well. The hoist removes the component's own
declaration and keeps the release value, so it reddens only the case that names shadowing.

The section proofs were checked the same way. Command:
`npm run test:app -- tests/app/browser/sections/<file>`.

| Finding | Mutation (plant in `app/browser/constants.ts`) | Red reading | Failing assertion | Green reading |
| --- | --- | --- | --- | --- |
| 3 | `Card group`: the first card's `<div class="card-footer">Ready</div>` removed | `CardSection.test.ts`: exit 1, 1 failed, 1 passed (2) | `.card-group > .card:not(:last-child) > .card-footer` matches nothing (`CardSection.test.ts:66`) | exit 0, 2 passed (2) |
| 4 | `Card base`: `href="#main"` removed from the `Route` link | `CardSection.test.ts`: exit 1, 1 failed, 1 passed (2) | the href filter returns `[ <a class="card-link"> ]` (`CardSection.test.ts:72`) | exit 0, 2 passed (2) |
| 4 | `List group actions`: ` href="#main"` removed from `Dispatch lane` | `ListGroupSection.test.ts`: exit 1, 1 failed, 1 passed (2) | the href filter returns the anchor (`ListGroupSection.test.ts:85`) | exit 0, 2 passed (2) |

A first plant for the last row left a space before `>`. It reddened on the `innerHTML` comparison at
`ListGroupSection.test.ts:39`, the wrong assertion, so I discarded that reading. The row above is
the corrected plant.

## Partials' SHA-256

| File | At resumption | After this round |
| --- | --- | --- |
| `src/styles/components/_card.scss` | `832dc6717bda30279dbb0c8240c6e93423923c9dff499415ec67fb8833b3d1f6` | `832dc6717bda30279dbb0c8240c6e93423923c9dff499415ec67fb8833b3d1f6` |
| `src/styles/components/_list-group.scss` | `6249c8cf075f871ee33c63e56eb02f00a72eef6cc13a796395225765773855b9` | `6249c8cf075f871ee33c63e56eb02f00a72eef6cc13a796395225765773855b9` |
| `app/browser/constants.ts` (plant target) | `8b0b484f1e7a779fd1a960b5e5da0e1731cecc602fcd43dbf95a4771f0f6aee0` | `8b0b484f1e7a779fd1a960b5e5da0e1731cecc602fcd43dbf95a4771f0f6aee0` |

Every plant's log records the file's SHA-256 before the plant, under it, and after the revert. Each
revert matches the value before its plant.

## Keyboard-walk durations

The `before` run strips `href="#main"` from every card and list-group anchor except `Dispatch
lane`, which the round-1 markup also left reachable. The `after` run uses the committed markup. Both
runs are `npm run test:journey -- --reporter=json`, all four variants, taken 2026-09-23 around 00:26
UTC at load average 4.2 to 4.6. Script: `scratchpad/mut/walk.sh`. Both runs exited 0 with 104 passed
(104). The reporter does not name the project per row, so each cell lists the four variant readings
unlabelled.

| Case | Before (s) | After (s) |
| --- | --- | --- |
| `journey > toggles a native host and an anchor host through the keyboard` | 10.04, 10.68, 10.12, 11.55 | 10.67, 10.02, 10.99, 10.14 |
| `journey > paints a focus ring on every variant reached through the keyboard` | 6.29, 5.48, 5.57, 5.60 | 5.36, 5.23, 5.28, 5.30 |
| `journey > reaches and operates the mode control through the keyboard` | 0.64, 0.55, 0.51, 0.33 | 0.45, 0.63, 0.30, 0.43 |
| `journey > drives one list-group action to hover, focus, and press, and photographs each state` | 1.87, 1.84, 1.66, 1.76 | 1.08, 1.35, 1.03, 1.24 |

The added links cost these runs no measurable time. The Card and List group regions render after the
Button region, so traversal to `Toggle`, `Anchor`, and the painted variants ends before it reaches
them. This is an observation. The authoritative timing run belongs to the Orchestrator.

## Frames and artifacts

I ran `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` once per variant, from
00:28:14 UTC (`scratchpad/mut/capture.sh`):

| Variant | Exit | Reading | Wall |
| --- | --- | --- | --- |
| `light-1280` | 0 | 26 passed (26) | 62.3s |
| `dark-1280` | 0 | 26 passed (26) | 75.5s |
| `light-390` | 0 | 26 passed (26) | 50.1s |
| `dark-390` | 0 | 26 passed (26) | 54.2s |

A script read `tests/setup.ts` and checked `tmp/capture/states/` for every `card*` and `list-group*`
scenario and every `Card*` and `List group*` subject, across the four variants. It found no frame
and no artifact missing, and none older than the capture start. Each frame is
`<scenario>--<variant>.png`; each artifact is `<stem>--<variant>-accessibility.txt`. The scenarios
are:

```text
card-base  card-rule  card-images  card-overlay  card-list  card-list-corners  card-tabs  card-pills
card-group  list-group-base  list-group-active  list-group-disabled  list-group-actions
list-group-actions-hover  list-group-actions-focus  list-group-actions-active  list-group-numbered
list-group-flush  list-group-horizontal  list-group-horizontal-sm  list-group-horizontal-md
list-group-horizontal-lg  list-group-horizontal-xl  list-group-horizontal-xxl  list-group-roles
```

Each artifact for a subject with anchors records every link in its tree and in its focus order, at
every variant:

| Subject | Focus order recorded (identical at all four variants) |
| --- | --- |
| `Card base` | `link "Batch"`, `link "Route"` |
| `Card tabs` | `link "Open"`, `link "Closed"` |
| `Card pills` | `link "Inbound"`, `link "Outbound"` |
| `List group disabled` | `link "Oak"`, `link "Elm"` (tree: `link "Oak" [disabled]`, `button "Ash" [disabled]`, `link "Elm"`) |
| `List group actions` | `link "Dispatch lane"`, `button "Holding lane"`, `link "Return lane"` (tree marks `Return lane` `[current]`) |

Every other card and list-group subject renders no control and records `No control inside this
subject is reachable`. The accessible names are distinct within each subject, and `Dispatch lane`,
the name the journey's pointer verbs resolve, occurs once in the showcase. I read the
`card-group--light-1280` frame: the joined row shows the top images, the footers, and the middle
card's header and bottom image. The `card-list-corners--light-390` frame shows the group opening
one card and closing the other.

## Gates

`npx oxfmt --config .oxfmtrc.json --write` ran over the owned TypeScript files I could have touched;
it changed nothing. The chain ran in order after the final edit (`scratchpad/mut/gates.sh`, logs
`scratchpad/mut/gate-<script>.log.txt`):

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | no diagnostic |
| `npm run build:src` | 0 | built |
| `npm run test:src:styles` | 0 | 60 files, 473 passed (473) |
| `npm run test:app` | 0 | 12 files, 30 passed (30) |
| `npm run test:conformance` | 0 | 17 passed (17) |
| `npm run test:guides` | 0 | 18 passed (18) |

These are observations, not criteria:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:setup` | 1 | 2 failed, 161 passed (163) |
| `npm run test:policy` | 0 | 109 passed, 1 skipped (110) |
| `npm run test:journey` (whole, twice, in the walk) | 0 | 104 passed (104) each |

The two `test:setup` reds are the standing blockers the brief names, and no other test fails:

- `tests/setupServer.test.ts > server setup > skips engine and CSS obligations whose Proof cell is a dash`:
  the `Set` literal lacks `card` and `list-group` (off-limits; the Orchestrator's integration edit).
- `tests/setupStyles.test.ts > styles setup > carries no shared written declaration block across style partials`:
  the sweep case B-SWEEP-2 closes.

## Touched files

This round edited only `tests/src/styles/components/list-group.test.ts` (the palette case title)
and regenerated `tmp/capture/states/**`.
The worktree's full unit diff, carried from rounds 1 and 2, is unchanged otherwise. `git diff --stat`
over tracked files:

```text
 app/browser/Showcase.ts               |   4 +
 app/browser/constants.ts              | 124 +++++++++++++++++
 app/browser/index.ts                  |   2 +
 guides/ledger/departures.md           |  22 ++++
 guides/veneer.md                      | 228 +++++++++++++++++++++++---------
 src/styles/index.scss                 |   2 +
 tests/app/browser/Showcase.test.ts    |   6 +
 tests/app/browser/index.test.ts       |   6 +
 tests/app/browser/integration.test.ts |  94 +++++++++++++
 tests/conformance.test.ts             |   2 +
 tests/setup.test.ts                   |  21 ++-
 tests/setup.ts                        | 184 ++++++++++++++++++++++++++
 tests/setupStyles.test.ts             | 191 +++++++++++++++++++++++++++
 tests/setupStyles.ts                  | 242 ++++++++++++++++++++++++++++++++++
 14 files changed, 1065 insertions(+), 63 deletions(-)
```

The untracked files hold these line totals: `_card.scss` 218, `_list-group.scss` 169, `card.test.ts`
388, `list-group.test.ts` 442, `CardSection.ts` 20, `ListGroupSection.ts` 20, `CardSection.test.ts`
104, `ListGroupSection.test.ts` 120.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/CardSection.ts
?? app/browser/sections/ListGroupSection.ts
?? src/styles/components/_card.scss
?? src/styles/components/_list-group.scss
?? tests/app/browser/sections/CardSection.test.ts
?? tests/app/browser/sections/ListGroupSection.test.ts
?? tests/src/styles/components/card.test.ts
?? tests/src/styles/components/list-group.test.ts
```

The status lists only the unit's paths. `tests/app/browser/Showcase.test.ts` is unchanged this
round. It spreads `CARD_SPECIMENS`, so `Card list corners` needs no edit there, and the shared-file
patch is empty.

## Deviations

None. I settled one ancillary choice myself: the palette case title, recorded under § Change this
round.

## Observations for the Orchestrator

- **The class-disabled anchor is keyboard reachable.** Under the `href="#main"` ruling, `List group
  disabled`'s `Oak` anchor carries `aria-disabled="true"` and is announced `[disabled]`, but it stays
  in the focus order (`list-group-disabled--*-accessibility.txt`). `pointer-events: none` does not
  remove it from the tab order. The ruling fixed the attribute, so I left the markup as ruled; whether
  the specimen also takes `tabindex="-1"` is the Orchestrator's decision.
- The `Card list corners` specimen stacks its two cards with no gap between them, because the
  specimen wraps them in no layout. The frame is legible, but the two cards touch.
