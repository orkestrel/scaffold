# Unit TIP (`tp`), round 2 report

Every fix from P1 through P6 is at its site. The gates exit 0 on the rebuilt validation copy. Each
mutation run that P1, P5, and the P6 width assertion name, and each run on a case this round edits
or adds, goes red. The `tp-shared-2.patch` file passes the `git apply --check` command on a fresh
`2a3f223` extract and supersedes the `tp-shared.patch` file whole. Deviation state: none. No stop
was raised, and the ancillary choices the deviation contract grants are recorded under Decisions.

## Artifacts

All paths were under `/home/user/veneer-tp/tmp/units/` and are retained in `.orkestrel/veneer/units/` (the diff, status, and shared patch) and `.orkestrel/veneer/units/tp-instruments/` (every other file).

- `tp-report-2.md`: this report.
- `tp-shared-2.patch`: the revised shared patch against `2a3f223`. The `git apply --check --verbose`
  command exits 0 on a fresh `git archive 2a3f223` extract, run with
  `GIT_CEILING_DIRECTORIES=/home/user/veneer-tp/tmp/probe`.
- `tp-2.diff`: the owned-file diff, captured as round 1 captured it.
- `tp-2-status.txt`: the owned-file status. Every owned file is untracked (`??`).
- `tp-mutations-2.log.txt`: each mutation run's site, the text it replaced, the command, the build
  and vitest exits, the summary, and the names of the failing cases.
- `tp-mutate-2.py`: the mutation runner that wrote that log.
- `tp-gates-2.sh` and `tp-gates-2.log.txt`: the gate script and its log on the validation copy.
- `tp-wt-fmt-2.log.txt` and `tp-wt-lint-2.log.txt`: the worktree format and lint runs.
- `tp-shared-2-vs-1.diff` and `tp-owned-2-vs-1.diff`: round 2 against round 1, for the shared
  files and the owned files.

The validation copy under `tmp/probe/` was rebuilt from `2a3f223`, the owned files, and the
`tp-shared-2.patch` file. It is deleted, and `tmp/` holds only `units/`.

## Fixes

### P1: the T-box and P-box mutations (claim 3)

- Site: the `_tooltip.scss` and `_popover.scss` files, mutated on the validation copy only, with a
  stylesheet rebuild before each run. The shipped files are unchanged.
- Reading: every run below exited 0 on the build and 1 on vitest.

| Run         | Change                                                                                         | Result                           | Failing case                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| T-box inset | `--bs-tooltip-padding-x: var(--vn-space-4);` written as `--bs-tooltip-padding-x: 0.5rem;`       | `Tests  1 failed \| 8 passed (9)`  | tooltip box > caps, pads, rounds, and sizes the inner box from its own slots and the density and type scales            |
| T-box size  | `--bs-tooltip-font-size: var(--vn-size-2);` written as `--bs-tooltip-font-size: 0.875rem;`     | `Tests  1 failed \| 8 passed (9)`  | the same case                                                                                                           |
| P-box inset | `--bs-popover-body-padding-y: var(--vn-space-8);` written as `--bs-popover-body-padding-y: 1rem;` | `Tests  1 failed \| 10 passed (11)` | popover box > caps, borders, rounds, pads, and sizes the box from its own slots and the density and type scales         |
| P-box size  | `--bs-popover-header-font-size: var(--vn-size-3);` written as `--bs-popover-header-font-size: 1rem;` | `Tests  1 failed \| 10 passed (11)` | the same case                                                                                                           |

The command for the tooltip runs was
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts`.
The popover runs used the same command with the `tests/src/styles/components/popover.test.ts` file.

### P2: the `Untitled popover` specimen (claims 5a and 7)

The `app/browser/constants.ts` file gets a specimen appended to the `POPOVER_SPECIMENS` constant:

```ts
Object.freeze({
	name: 'Untitled popover',
	markup:
		'<div class="viewport"><div class="popover bs-popover-bottom position-absolute top-50 start-50 translate-middle" role="tooltip" id="untitled-popover"><div class="popover-arrow position-absolute start-50 translate-middle-x"></div><h3 class="popover-header"></h3><div class="popover-body">Its header is empty, so its body shows alone below the arrow.</div></div></div>',
}),
```

- The `POPOVER_SPECIMENS` TSDoc:
  - Before: "No specimen renders an empty header either: the release's template removes an empty header
    before the popover renders."
  - After: that sentence is removed, and the remarks add "The `Untitled popover` specimen sits below
    its host with an empty header, which the `.popover-header:empty` rule removes from the flow, so
    the popover shows its body alone."
- The `tests/setup.ts` file:
  - The `CaptureSubject` type gains the `'Untitled popover'` member.
  - The `CASCADE_KEYS` constant gains the row
    `{ scenario: 'untitled-popover', subject: 'Untitled popover', selector: '.popover-header:empty + .popover-body', property: 'color' }`.
  - Its remarks drop the sentences beginning "An empty popover header is declined as well".
- The `guides/veneer.md` file, § Popover classes:
  - Before: "It renders no empty header either, because the release's template removes an empty
    header before the popover renders, so the rule that hides one guards markup the release's plugin
    never writes; the capture registry declines that frame, and the proof reads the rule."
  - After: "The `Untitled popover` specimen sits below its host with an empty header, which the
    `.popover-header:empty` rule removes from the flow, so it shows its body alone."
- The Popover `plugin` row:
  - Before: "the `.popover-header` element takes the title and the `.popover-body` element the
    content, an empty one removed".
  - After: "the release removes the `.popover-header` or `.popover-body` element when its title or
    content is falsy".
- The `PopoverSection.test.ts` file (owned):
  - The contract case is retitled "renders one popover per explicit placement and an untitled
    popover alone in a frame through the shared section contract".
  - The expected names become `[...TIP_PLACEMENTS.map(...), 'Untitled popover']`.
  - The explicit-side loop still iterates the `TIP_PLACEMENTS` table.
  - An untitled block asserts the popover's class list
    (`popover bs-popover-bottom position-absolute top-50 start-50 translate-middle`), the
    `untitled-popover` id, the template order `DIV popover-arrow`, `H3 popover-header`, and
    `DIV popover-body`, a header with no child nodes, and a body with text.
  - The id-uniqueness check reads `rendered.length`, and the layout-readings length reads
    `POPOVER_SPECIMENS.length`.
- Reading:
  - The section gate passes with `Tests  9 passed (9)`, and the setup gate passes with
    `Tests  146 passed (146)`. The `tests/setup.test.ts` file checks the `CASCADE_KEYS` row's
    selector shape, its unique subject and selector, and the scenario order in the `CAPTURE_KEYS`
    constant. No scoped gate paints the row's frame; the `CAPTURE=1` run does.
  - Mutation run: writing the untitled header as `<h2 class="popover-header"></h2>` gave
    `Tests  1 failed | 4 passed (5)`, and the contract case failed.
  - Mutation run: giving the untitled header the title `Untitled` gave the same summary and the same
    failing case.

### P3: the `h3` header (claim 5b)

- The `app/browser/constants.ts` file: each placement specimen's `<h2 class="popover-header">…</h2>`
  element becomes `<h3 class="popover-header">…</h3>`.
- The TSDoc:
  - Before: "Each header is an `h2` element, the level under the page's `h1` element, because a
    region carries no heading of its own."
  - After: "Each header is the release template's `h3` element."
- The guide:
  - Before: "Each header is an `h2` element, the level under the page's `h1` element."
  - After: "Each header is the release template's `h3` element."
- The `PopoverSection.test.ts` file: the expectation `'H2 popover-header'` becomes
  `'H3 popover-header'`, and a comment names "the `h3` header".
- Reading: the section gate passes, and the `h2` mutation under P2 reddens the contract case.

### P4: every utility on the arrow (claims 5c and 7)

- Before, in the TSDoc of the `TOOLTIP_SPECIMENS` and `POPOVER_SPECIMENS` constants and in § Tooltip
  classes and § Popover classes: "…utilities on the tip and the `translate-middle-x` or
  `translate-middle-y` utility on its arrow."
- After, at each of those sites: "…utilities on the tip, and the `position-absolute` utility with the
  `start-50` and `translate-middle-x` utilities, or the `top-50` and `translate-middle-y` utilities,
  on its arrow." The popover sites say "on the popover" and "on each popover".
- Reading: the guides gate passes with `Tests  19 passed (19)`, and the section contract case still
  asserts each arrow's class list.

### P5: binding the `TIP_ARROW_PROPERTIES` constant to the inventory (claim 6)

- The `tests/setupStyles.test.ts` file gains the case "reads every box, offset, border width, and
  border color the release records on either arrow". It does the following:
  - collects every property the inventory records on a selector containing `.tooltip-arrow` or
    `.popover-arrow`;
  - expands a `border-width` or `border-color` shorthand into its longhand on each side the
    `TIP_PLACEMENTS` table pins;
  - keeps the width, height, offset, and side border width and color properties;
  - asserts that the `TIP_ARROW_PROPERTIES` constant has no duplicate and equals that set.
- A comment in the same file changes "its first triangle" to "its `::before` triangle".
- Reading:
  - The setup gate passes with `Tests  146 passed (146)`.
  - Mutation run: dropping the `'border-left-color'` entry from the `TIP_ARROW_PROPERTIES` constant
    in the `tests/setupStyles.ts` file gave `Tests  1 failed | 125 passed (126)` under
    `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`.
    The failing case was "tip case tables > reads every box, offset, border width, and border color
    the release records on either arrow".

### P6: prose, titles, the width limit, and the owners (claims 7 and 8, and the fade referral)

- The `plugin` rows in § Compatibility:
  - The Tooltip row adds "sets the `show` class, and the `fade` class when the tip is animated".
  - The Popover row's "sets the `fade` and `show` classes" becomes "sets the `show` class, and the
    `fade` class when animated".
  - Both rows are quoted whole under Decisions.
- § Tooltip classes adds: "No tooltip rule reads the `fade` class the plugin sets on an animated tip."
- The arrow's direction:
  - In the guide, "its triangle paints the tip's fill on the side toward the host" becomes "its
    triangle paints the tip's fill on its border facing the tip, so it points at the host".
  - The `tooltip.test.ts` arrow case is retitled from "…paints the triangle side toward it in the
    fill" to "hangs the arrow from the edge facing the host and paints the tip's fill on its border
    facing the tip, so it points at the host".
  - The `popover.test.ts` arrow case is retitled from "…paints the border under the fill toward it"
    to "hangs the arrow past the edge facing the host and paints the edge color under the fill on its
    borders facing the popover, so it points at the host".
  - The mutation comments on those cases read "a placement's rules written for another side".
- The triangle names:
  - "the first" and "the second" become "the `::before` triangle" and "the `::after` triangle" in
    the guide's popover arrow paragraph, in the `_popover.scss` comment, and in the `popover.test.ts`
    comment.
  - The sweep of added lines also caught "its first triangle" in the `setupStyles.test.ts` file,
    which P5 lists.
- Placement wording: "on each side of its host" becomes "at each explicit placement" in the Tooltip
  and Popover region paragraphs.
- The tooltip arrow's reason:
  - Before: "…are Bootstrap's literals, because no space step resolves to either."
  - After: "…are Bootstrap's literals, because an arrow is geometry rather than spacing and does not
    follow the density factor."
- The width limit: the `PopoverSection.test.ts` file gains the case "wraps each popover narrower than
  its cap at the 390 variant and holds it at the cap at 1280". It reads every popover's box width
  through the `visitBreakpoint` helper from the `tests/setupBrowser.ts` file, and asserts
  `narrow.filter((width) => width >= 276)` equals `[]` and `wide` equals
  `POPOVER_SPECIMENS.map(() => 276)`.
- The `reset-text` comment in the `_mixins.scss` file: "resolves `start`, so" becomes "resolves the
  `start` keyword, so".
- The outside-ledger sentence:
  - Before: "…recorded as an Elements decision for J-ENGINE, which opens and closes a popover."
  - After: "…recorded as an Elements decision for its owners: J-ENGINE opens and closes a popover,
    and CROSS-FADE ships the `.fade` rule."
- Readings:
  - Width limit: inverting the filter to `width < 276` gave `Tests  1 failed | 4 passed (5)` under
    `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/PopoverSection.test.ts`,
    and the width case failed.
  - Retitled tooltip arrow case: in the `_tooltip.scss` file's placement map, the `top` entry was
    given `side: bottom` and `edge: top`. After a rebuild, vitest gave
    `Tests  5 failed | 4 passed (9)`. The failing cases were the retitled arrow case, the automatic
    placement case, the colors case in light and in dark, and the rules case.
  - Retitled popover arrow case: in the `_popover.scss` file's placement map, the `end` entry was
    given `side: left` and `edge: right`. After a rebuild, vitest gave
    `Tests  3 failed | 8 passed (11)`. The failing cases were the retitled arrow case, the automatic
    placement case, and the rules case.
  - Sweep: the added lines of the `tp-shared-2.patch` file and the owned files carry no positional
    triangle name, no "each side of its host", and no temporal `new` or `now`. The phrase "the arrow
    each placement turns toward the host" stays in the region copy, because an arrow does turn toward
    its host there.

## Gates

The following gates ran on the rebuilt validation copy. The log is the `tp-gates-2.log.txt` file.

| Gate        | Command                                                                                                                                                                                                          | Result                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| check       | `npm run check`                                                                                                                                                                                                  | exit 0                                        |
| build       | `npm run build:src`                                                                                                                                                                                              | exit 0                                        |
| styles      | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/src/styles/mixins.test.ts` | exit 0, `Tests  31 passed (31)`               |
| sections    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TooltipSection.test.ts tests/app/browser/sections/PopoverSection.test.ts`                  | exit 0, `Tests  9 passed (9)`                 |
| setup       | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts`                                                                               | exit 0, `Tests  146 passed (146)`             |
| conformance | `npm run test:conformance`                                                                                                                                                                                       | exit 0, `Tests  22 passed (22)`               |
| guides      | `npm run test:guides`                                                                                                                                                                                            | exit 0, `Tests  19 passed (19)`               |
| policy      | `npm run test:policy`                                                                                                                                                                                            | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| showcase    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`                                                    | exit 0, `Tests  5 passed (5)`                 |
| format      | `npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check` over every changed file                                                                                                              | exit 0                                        |
| lint        | `npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore` over every changed TypeScript file                                                                                                            | exit 0                                        |

The following gates ran in the worktree:

- `npm run format:check` exits 0 with "All matched files use the correct format. Finished in 8483ms
  on 359 files using 4 threads."
- `npm run lint:check` exits 0 and prints no diagnostic.

## Mutation log

The `tp-mutations-2.log.txt` file retains each run, and each run went red. The following list names
what each run changed:

- the T-box inset: `--bs-tooltip-padding-x` written as `0.5rem`;
- the T-box text size: `--bs-tooltip-font-size` written as `0.875rem`;
- the P-box inset: `--bs-popover-body-padding-y` written as `1rem`;
- the P-box text size: `--bs-popover-header-font-size` written as `1rem`;
- the P5 binding: the `'border-left-color'` entry dropped from the `TIP_ARROW_PROPERTIES` constant;
- the P6 width limit: the 390 filter inverted to `width < 276`;
- the retitled tooltip arrow case: the `top` placement entry given the bottom side and the top edge;
- the retitled popover arrow case: the `end` placement entry given the left side and the right edge;
- the edited section contract: the untitled header written as an `h2` element;
- the edited section contract: the untitled header given the title `Untitled`.

After the last run the runner restored every mutated file and rebuilt the stylesheet, and the
rebuild exited 0.

## Decisions

- **Plugin rows.** Each row fits the 448-character Obligation column, so the table keeps its padding.
  To fit, the Tooltip row drops "constructed by a consumer", the `sanitize: true` default, and the
  `setContent` method, and the Popover row drops "construction" and "sanitizing". The rows read:
  - "Tooltip: no data API; `placement: 'top'` and `trigger: 'hover focus'` defaults; `show` and
    `hide` methods; cancelable `show.bs.tooltip` and `hide.bs.tooltip` events; an `id` attribute a
    trigger's `aria-describedby` attribute names; placement writes the `bs-tooltip-auto` class and
    `data-popper-placement` attribute; sets the `show` class, and the `fade` class when the tip is
    animated; `Sanitizer` and `TemplateFactory` utilities. Owner: J-ENGINE."
  - "Popover: extends Tooltip, inheriting its methods and ARIA under `.bs.popover` events;
    `content: ''`, `offset: [0, 8]`, `placement: 'right'`, and `trigger: 'click'` defaults; the
    release removes the `.popover-header` or `.popover-body` element when its title or content is
    falsy; placement writes the `bs-popover-auto` class and `data-popper-placement` attribute; sets
    the `show` class, and the `fade` class when animated. Owner: J-ENGINE."
  - If the Orchestrator wants the dropped facts kept, the alternative is a wider column that re-pads
    the whole table. I did not take it.
- **P5 binding form.** The case derives the recorded arrow properties from the inventory, expands the
  border shorthands over the `TIP_PLACEMENTS` sides, and filters with the geometry pattern. It does
  not compare against a literal list.
- **Untitled body copy.** "Its header is empty, so its body shows alone below the arrow."
- **Untitled `CASCADE_KEYS` row.** The row reads the `color` property on the
  `.popover-header:empty + .popover-body` selector. That selector exists only when the header is
  empty, and the body rule sets the color.
- **Re-flow.** The paragraphs these fixes touch in the guide and the TSDoc are re-flowed to the
  formatter's width.
- **Criterion 4.** Compared with the `tp-shared.patch` file, the `tp-shared-2.patch` file differs
  only in the `app/browser/constants.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`,
  `tests/setup.ts`, and `tests/setupStyles.test.ts` files. Each difference is at a site P1 through P6
  names, or is a re-flow of a paragraph one of those fixes touches. The `tp-shared-2-vs-1.diff` file
  holds every hunk.

## Observations

- The following runs are left to the Orchestrator at landing, as the brief states: the whole
  `npm run test:setup` command, the journey, `CAPTURE=1`, `test:service`, and the whole styles
  project. The `Untitled popover` capture frame is first produced by that `CAPTURE=1` run.
- The paragraph under the stacking table is unchanged from the base. The MODAL unit rewrites it.
- Nothing was written into the session scratchpad. It was read only for the npm 11 `PATH` entry in
  the `tp-env.sh` file.
