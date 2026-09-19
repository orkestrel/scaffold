# Unit 5 — the shell and the page primitives

`implementer` — Opus 5, native Claude subagent, checkout
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer from `b586ee6`.

## 1. Done / not done

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` over owned files | done | `All matched files use the correct format.` on 16 files |
| 2 | `oxlint --deny-warnings` over owned files | done | no diagnostics on 16 files |
| 3 | `npm run check` | done | exit 0; `tsc` root, `tsc` app/core, `vue-tsc` app/browser |
| 4 | Contracts declared in `types.ts` before implementation, readonly, single-word | done | `FrameOptions`, `SplitOptions`, `EntryOptions`, `NoticeOptions`, `ShellLink`, `ShellGroup`, `TrailStep`, `EntryFact`, `NoticeCategory`; typechecked before any SFC existed; no `any`, `as`, `!`, suppression, or authored `export default` |
| 5 | Footer from declared constants, triple at most twice in `App.vue` | done | `FOOTER_GROUPS`; triple count 19 at `HEAD`, 2 now |
| 6 | Brand lockup has exactly one definition | done | `Brand.vue`; `App.test.ts` compares the two rendered lockups' `outerHTML` |
| 7 | No authored class collides with a shipped Bootstrap utility name | done | instrument reading below |
| 8 | Heading order correct; footer groups carry real headings | done | `App.test.ts` proves the first heading is the view's `h1` inside `#main`, and the footer's `h2` titles equal `FOOTER_GROUPS` |
| 9 | One rank for `Get started`; no adjacent focus stops share a name | done | `App.test.ts` at 1280 and 390; journey artifacts show stops 11/12/13 and 7/8/9/10 |
| 10 | Every new component has a mirrored test | done | five suites, 21 cases; every pin proved able to fail |
| 11 | `npm run test:app:browser` | done | `38 passed (38)` files, `85 passed (85)` tests |
| 12 | `npm run test:journey` green for all four projects, integration suite unchanged | done | `4 passed (4)` files, 68 tests passed and 4 skipped of 72; `tests/app/browser/integration.test.ts` is unmodified in `git status` |

Not closed by this unit: guide parity for the new exports. `guides/README.md` is unit 9's.

## 2. The contracts

Each contract went into `app/browser/types.ts` and typechecked before its SFC existed. Every
member is one word and every property is readonly.

`FrameOptions` — `title`, `lead`, `trail`. `title` is the screen's only `h1`. `lead` is the
bounded introduction, painted `lead text-body-secondary measure`. `trail` is
`readonly TrailStep[]`, and `TrailStep` is `label` plus optional `path`; a step without a `path`
is the current page. The default slot carries the screen's sections and the frame spaces them;
the `next` slot carries the continuation. The frame refuses what the plan names by having no
member for it: no hero, no eyebrow, no minimum height, and no step the caller did not declare.

`SplitOptions` — `span` alone. `span` is how many of the twelve columns the primary region takes
from 992 px; the supporting region takes the rest. Default 7. This is data selecting a datum for
one operation, not a mode selecting an algorithm, so `.claude/rules/names.md` § Split behavioral
variants leaves it as one member. The markup is `row g-4 g-lg-5 align-items-start` with the
primary region first in the DOM, so unrelated regions never stretch to each other's height and
no CSS order contradicts reading order.

`EntryOptions` — `title`, `href`, `summary`, `facts`. `facts` is `readonly EntryFact[]` of
`label` and `value`. The title carries the destination and is the card's only interactive
element, so the `stretched-link` never nests one. There is no slot for a second control, which
is how the entry refuses nested interactive stretched links structurally rather than by
convention. Fact values take `figures-tabular`, the utility unit 4 generated, because a
publisher's prices, codes, and ISBNs are exactly what it exists for.

`NoticeOptions` — `category`, `title`, `detail`. `NoticeCategory` is
`'empty' | 'miss' | 'partial' | 'refusal'`: four irreducible modes, named on the `category` axis,
carrying no success and no progress member. The default slot carries the real recovery control.

None of these is a wrapper over a Bootstrap component. `Frame` composes a container, a heading, a
breadcrumb, and section rhythm; `Split` composes a grid row with an alignment invariant; `Entry`
composes a card with a one-link invariant; `Notice` composes a panel with a derived announcement.
`measure` stayed a width role in the stylesheet. No `Button`, `Card`, or `Alert` wrapper exists.

`Brand` takes no props. It is the shell's brand lockup and nothing else, so it needs no contract
in `types.ts`; the plan already places it outside the page primitives.

## 3. The shell

**C1 — the class triple.** 19 occurrences at `HEAD`, 2 now, both loops. No CSS alias was invented.
The utility bar renders `UTILITY_GROUPS` through one nested loop and the footer renders
`FOOTER_GROUPS` through another. Everything else in the shell uses `nav-link` or `btn`.

**C3 — the footer's destinations.** `FOOTER_GROUPS` in `constants.ts` declares Products,
Resources, and Company with their labels and destinations. The product destinations derive from
`PRODUCTS_PATH` rather than repeating `/products` as a literal.

**C4 — the brand lockup.** `Brand.vue` is the one definition. The navbar wraps it in
`<a class="navbar-brand">` and the footer in a `<p>`. The lockup itself carries no link, so the
same component serves both without a conditional element.

**S4 — one rank.** `Get started` is `btn btn-primary` in the compact masthead, the wide masthead,
and the drawer. Gold left the drawer: the plan narrows gold to the commit on navy, and
`Get started` is navigation into subscribe, not a commit. On the drawer's navy surface
`_theme.scss` already repaints `.btn-primary` white on navy, so the control still reads primary
there.

**S8 — adjacent focus stops.** At `HEAD`, `light-1280.txt` stops 12 and 13 were both
`link "Get started"`: the masthead's, then the home hero's. `HomeView.vue` is unit 6's and the
brief pins the shell control's name, so the fix was ordering. The theme control now takes the
terminal position in both masthead clusters, after the CTA. The grouping reads: destinations,
then the action those destinations lead to, then the display preference that belongs to no task.
The new artifacts read `11 Get started / 12 Use dark theme / 13 Get started` at 1280 and
`7 Get started / 8 Use dark theme / 9 Menu / 10 Get started` at 390. The cost is that the solid
CTA no longer anchors the right edge; the 1280 capture shows it still dominating the quiet
outline icon beside it.

**Heading order.** The offcanvas moved from before `<main>` to after it. Its `h2` titled `Menu`
no longer precedes every view's `h1`, and a dialog keeps the heading a dialog deserves.

**Footer headings.** The three `<p class="text-uppercase small fw-semibold">` titles became
`<h2 class="h6 text-uppercase fw-semibold">`, so the footer's groups are real headings sized
independently of their level. They sit after `<main>`, so they follow the view's `h1`.

**The `.mark` collision.** Bootstrap ships `mark, .mark { background-color: var(--bs-highlight-bg) }`
at `node_modules/bootstrap/dist/css/bootstrap.css:329`, and the authored rule painted the brand
badge instead. The class is now `.monogram`, which pairs with the existing `.wordmark`. That is the
only edit to `_signature.scss`.

**Criterion 7 instrument.** `tmp/units/u5-collisions.mjs` intersects every authored selector in
`_signature.scss` and `_theme.scss` with every class token in Bootstrap's shipped CSS. It reports
`btn btn-close btn-outline-primary btn-outline-secondary btn-primary btn-warning card
container-xl form-control form-select lead nav-link navbar-nav navbar-toggler offcanvas row`, and
each of those rules extends the Bootstrap element it names — a component variable override, a
box-shadow the disabled shadow mixin left unpainted, `.hero .lead` width, `.hero > .container-xl`
stacking, `.invite > .row` stacking, and the `:focus-visible` ring. None renames a shipped utility
to mean something else. `mark` is absent from that reading and was present before the rename.
Controls: the reader reports `mark` and `card` as shipped, so a shipped name in the authored set
surfaces; `monogram` and `roughnotes-undeclared-control` are absent from Bootstrap, so the reader
does not report every name it is handed.

**Other shell changes.** The utility bar's two clusters are now `UTILITY_GROUPS` with titles
`Contact` and `Logins` carried as each list's `aria-label`, so both link lists have a name without
adding a heading before `main`. Collapsing them into one loop removed the `d-none d-md-flex` that
hid the phone and email below `md`, so the phone number is now reachable on a phone. Measured
cost at 390: the utility bar is 69 px instead of one row, and `#main` starts at 205 px. The drawer's
literal `Contact` row became `MENU_ITEMS`, which is `NAV_ITEMS` plus Contact. Every one of the
shell's named controls kept its exact name.

## 4. Rulings on the unknowns

**`Notice` owns the announcement politeness; it is not a prop.** `refusal` takes `role="alert"`
and `empty`, `miss`, and `partial` take `role="status"`. Urgency is a property of the state, and
the state is already the component's discriminant, so a politeness prop would be a second member
that can contradict the first — which `AGENTS.md` § Derive state forbids. It also matches the
skill's rule that urgency is not inferred from visual styling: the refusal is assertive because
the reader's request was declined and they must act, not because it is painted red.

**The footer's three groups are one declared structure.** Three groups are three instances of one
shape — a titled list of destinations — so three constants would repeat that shape and force
three loops, which is the duplication C3 names. One `readonly ShellGroup[]` renders through one
nested loop. The column classes stayed in the template, so no presentation entered the data, and
the columns are now uniform at `col-6 col-md-4 col-lg-3` beside a `col-12 col-lg-3` brand column.

**`Frame` owns the continuation region.** Implementing it did not prove otherwise. It is one
`v-if="$slots.next"` block with a top rule, spaced by the frame's own rhythm. A fifth primitive
would add a component that renders a `div` and a border and carries no contract of its own, which
fails `AGENTS.md` § No superfluous wrappers. No fifth primitive was added.

## 5. Observations

**Failing-first evidence.** Every new pin was proved able to fail by mutating exactly one
load-bearing line, running the suite, and restoring. Instruments and logs:
`tmp/units/u5-mutations.py` with `u5-mutations.log.txt`, and
`tmp/units/u5-mutations-primitives.py` with `u5-mutations-primitives.log.txt`.

Shell round, `tests/app/browser/App.test.ts` plus `Brand.test.ts`, baseline `9 passed (9)`:

```
monogram class         | 3 failed | 6 passed (9)
shell href resolution  | 1 failed | 8 passed (9)
footer group heading   | 1 failed | 8 passed (9)
drawer action rank     | 1 failed | 8 passed (9)
adjacent focus names   | 1 failed | 8 passed (9)
restored               | 9 passed (9)
```

Primitive round, the four mirrored suites, baseline `12 passed (12)`: each of `frame refuses a
hero`, `frame bounds its lead`, `split top alignment`, `split default span`, `entry tabular
figures`, `entry equal height`, `notice announcement urgency`, and `notice icon` reported
`1 failed | 11 passed (12)`, and the restored tree reported `12 passed (12)`.

The `adjacent focus names` mutation reddened nothing on the first attempt, which found a defect in
the pin rather than in the shell: `readStops` compared the role and the name, so `button
"Get started"` beside `link "Get started"` read as different stops. Criterion 9 is about the name,
so the pin now compares the name alone.

**Capture mode at `light-390` failed twice on a 29 s click timeout in the marketplace journey,
then passed clean at 18/18.** Capture mode is not a criterion of this unit and `npm run test:journey`
is green at 4/4. Per `.agents/orchestration.md` § Writing concurrency rule 10, the deciding re-run
of a timing failure is the Orchestrator's after this unit exits. Full log:
`tmp/units/u5-capture-390.log.txt`.

**Captures read.** `tmp/units/u5-shell-1280.png`, `u5-shell-390.png`, and `u5-footer-1280.png` are
crops of `tmp/capture/states/home--light-1280.png` and `home--light-390.png`, produced by
`tmp/units/u5-crop.py`. The measurement instrument is `tmp/units/u5-measure.py`; it appends one
reporting case, reads the numbers, and restores the suite.

**Ancillary decisions recorded.**

- The prop contracts take the `{Entity}Options` form the `.claude/rules/names.md` type table fixes
  for options and config, not Vue's community `Props` suffix. A component's props are its options.
- `shellHref` is a module-scope function in `App.vue` beside the existing `hideMenu` and `onView`.
  `app/browser/helpers.ts` is off-limits this unit, so the shell owns the one place that turns a
  declared destination into an href. Units 6 to 9 may promote it.
- Every utility-bar anchor carries `rel="noreferrer"`. Every destination in that bar leaves this
  application, and the attribute is inert on a `tel:` or `mailto:` URL.
- `Entry` fixes its title at `h3`, which sets the rhythm `Frame` `h1` → section `h2` → entry `h3`.
- The footer keeps the phone and email rows even though the utility bar now shows them at every
  width. The footer is where a reader looks for contact details and the utility bar scrolls away.

**Not measured.** Contrast of the new footer headings and the utility bar's contact links on the
navy surface in each theme. The integration matrix reads `Shop catalog` at `15.538` on that same
surface with the same `link-body-emphasis` treatment, and the headings take the same inherited
foreground, but neither is a reading of those exact elements.

## 6. What I did not close, and why

- **Guide parity.** `guides/README.md` documents none of `Frame`, `Split`, `Entry`, `Notice`,
  `Brand`, the new types, or `MENU_ITEMS`, `UTILITY_GROUPS`, `FOOTER_GROUPS`, `NOTICE_MARKS`.
  The guide and `tests/guides.test.ts` are unit 9's; `tests/guides.test.ts` does not exist yet.
- **No view adopts a primitive.** The brief forbids it. Units 6, 7, and 8 carry that, and no view
  file was touched.
- **`Split` has no consumer yet**, so `span` ships with the default the current views' 7/5 and 6/6
  pairs need and nothing more. If a view needs another ratio the prop already takes it.
- **The theme-repaint question** carries no unit and this one did not open it.
