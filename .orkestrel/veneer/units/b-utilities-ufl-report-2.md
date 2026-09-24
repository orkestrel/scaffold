# UTIL-FLOW (`ufl`) round 2 report

The `opus` role on Opus 5.5, as a native subagent in the `/home/user/veneer-ufl` worktree (the
`unit/ufl` branch from the `2a3f223` commit). This round executes the
`b-utilities-ufl-brief-2.md` brief, which carries fixes U1 to U5 from the `ufl-audit-verdict.md`
verdict.

## Outcome

Every fix from U1 to U5 sits at its site. U1 and U4 each have a retained red run. Every criterion
gate passes on the rebuilt validation copy. The `ufl-shared-2.patch` file applies to a fresh
`2a3f223` extract, and the `ufl-routeb-2.patch` file applies over that patch and the owned files.
Neither patch differs from its round-1 predecessor outside the sites U1 to U5 name. No deviation is
open.

## Fixes

### U1: case populations move to setup tables and derivations

- **Where:** in the `tests/setupStyles.ts` file (shared), after the `OBJECT_FIT_PAINT_CASES` table
  and before the `RATIO_CASES` table.
  - **Added:** the frozen `HIT_CORNERS` table, which pairs an inset with corner descriptors. Each
    descriptor names the `DOMRect` edge across the box and the edge down it.
  - **Added:** the `computeCornerPoints` helper. It moves each corner of a live rectangle inward by
    the inset, so every coordinate is still read from the live rectangle.
  - **Added:** the frozen `STRETCHED_LINK_HOSTS` table. Each row pairs a host whose link carries or
    lacks the helper with the element each corner reaches.
- **Binding:** the `tests/setupStyles.test.ts` file (shared) adds the case
  `binds the hit corners to the edges the stretched link records and the stretched-link hosts to those corners`.
  - It derives the edge vocabulary from the zero-valued offsets that the inventory records for the
    `stretched-link` key.
  - It checks that the corners pair every across-edge with every down-edge once.
  - It derives each host row's hits from the corners and from whether the link is stretched.
  - It pins the `computeCornerPoints` helper against a fixture rectangle and checks the freeze.
  - The export list gains the `HIT_CORNERS`, `STRETCHED_LINK_HOSTS`, and `computeCornerPoints`
    names.
- **Before and after:** `tests/src/styles/components/stretched-link.test.ts` (owned).
  - Before: `(['.stretched', '.bare'] as const).map((selector) => …)` and corner literals such as
    `{ x: box.left + 2, y: box.top + 2 }`.
  - After: the hosts are built from the `STRETCHED_LINK_HOSTS` table, and each reading is
    `computeCornerPoints(box).map(({ x, y }) => document.elementFromPoint(x, y)?.localName)`.
  - The nearest-ancestor, dark-island, and layer cases read every corner through the same helper.
    The layer case's expectation is the bare host row's hits.
- **Before and after:** `tests/app/browser/sections/LinkSection.test.ts` (owned).
  - Before: a local array of corner literals, expected equal to `[true, true, true, true]`.
  - After: `computeCornerPoints(card).map(…)`, expected equal to `HIT_CORNERS.corners.map(() => true)`.
- **Before and after:** `tests/app/browser/sections/FloatSection.test.ts` (owned).
  - Before: the hand-listed selectors `'.float-start, .float-end, .float-md-end'` and
    `'.float-start, .float-end'`.
  - After: the `FLOAT_CLASSES` constant, derived from the `FLOAT_VALUES` table and the
    `GRID_BREAKPOINT_CASES` table, and the `FLOATING` selector, derived from it for the sides that
    float.
  - A check was added that every `float-*` class a specimen carries is one the release writes.
- **Name decision:** the added tables are named `HIT_CORNERS` and `STRETCHED_LINK_HOSTS`, as the
  deviation contract allows.
- **Red runs** (retained in `.orkestrel/veneer/units/ufl-instruments/ufl-mutations-2.log.txt`):
  - `hit-corner-dropped`: the bottom-right descriptor is removed from the `HIT_CORNERS` table. The
    binding case fails. Result line: `Tests  1 failed | 122 passed (123)`.
  - `stretched-host-dropped`: the bare host row is removed from the `STRETCHED_LINK_HOSTS` table.
    The binding case fails. Result line: `Tests  1 failed | 122 passed (123)`.
  - `float-side-dropped`: the `end` row is removed from the `FLOAT_VALUES` table. The
    `FloatSection > renders every declared specimen through the shared section contract` case
    fails. Result line: `Tests  1 failed | 2 passed (3)`.

### U2: prose forms

- **Before and after:** the opening comment of `src/styles/utilities/_overflow.scss` (owned).
  - Before: "None of the three entries is responsive, so the walk writes each at the empty infix alone."
  - After: "The `overflow`, `overflow-x`, and `overflow-y` entries are not responsive, so the walk writes each at the empty infix alone."
- **Before and after:** the TSDoc of the `OBJECT_FIT_PAINT_CASES` table.
  - Before: "The last region sits where every value paints both pictures".
  - After: "The region centred low in the box, at x 52 and y 54, sits where every value paints the wide and the narrow picture".
- **Before and after:** a comment in the object-fit binding in `tests/setupStyles.test.ts`.
  - Before: "across the two pictures".
  - After: "across the wide and the narrow picture".
- **Before and after:** the comment on the `cover-block` mixin (Route B).
  - Before: "Places a box over the whole of its containing block on the physical edges, the run the card's image overlay and the stretched link's generated box both write."
  - After: "Emits the run that places a box over the whole of its containing block on the physical edges, which the card's image overlay and the stretched link's generated box write."
- **Sweep of every added line for the same forms:**
  - The `OVERFLOW_AXIS_CASES` TSDoc says "the x value and the y value of a row differ" in place of "the two values of a row differ".
  - The `OBJECT_FIT_FIXTURE` TSDoc says "on the x and the y axis" in place of "on both axes".
  - The binding comments say "Each axis row pairs an x value with a different y value" and "the standard declaration each one writes after any prefixed alias", and the `last` binding variable becomes the `standard` binding variable.
  - The `Float sides` specimen says "This text wraps between the floated cards."
  - The guide replaces "clears both sides", "in both writing directions", and "on both axes" with the left and right sides, the left-to-right and right-to-left directions, and the x and y axes.
  - The owned proofs make the same replacements in comments and case names.
  - In the object-fit infix-order case, a destructuring that named images by position gives way to `querySelector` readings by class.
- **Readings:** the scoped `oxfmt --check` and `oxlint` runs pass, and the gate runs listed under § Gates pass with these texts.

### U3: the Object fit copy

- **File:** the `OBJECT_FIT_COPY` constant's paragraph in `app/browser/constants.ts` (shared).
- **Before:** "then a tall picture whose box changes its value at the md boundary."
- **After:** "then a tall picture that switches from contain to cover at the md boundary."
- The guide does not repeat this sentence, so no guide edit follows.
- **Reading:** the `ObjectFitSection` proof holds the rendered paragraph equal to the constant, and
  the section gate passes.

### U4: a failing-first run for the `cover-block` mixin

- **Mutation:** with the `ufl-routeb-2.patch` file applied on the copy, the `right: 0` declaration
  is deleted from the `cover-block` mixin, and the styles are rebuilt.
- **Command:** the mixins proof, the stretched-link proof, and the card proof, run under
  `configs/src/vite.styles.config.ts`.
- **Result:** build exit 0, command exit 1, `Tests  7 failed | 34 passed (41)`. The failing cases:
  - the mixins cover case, `declaration mixins > covers the whole of its containing block on every physical edge`;
  - every stretched-link case that reads the generated box's corners or edges;
  - the card overlay case, `card geometry > bounds the overlay to the card box and pads it from its own slot`.
- The mixin was restored afterward. The run is retained in `.orkestrel/veneer/units/ufl-instruments/ufl-mutations-2.log.txt`.

### U5: region order

- `app/browser/Showcase.ts` constructs `FloatSection`, `ObjectFitSection`, `OverflowSection` in
  that order. Round 1 constructed the overflow section ahead of the object-fit section.
- `app/browser/index.ts` exports the sections in the same order.
- `tests/app/browser/Showcase.test.ts` expects the region labels `'Float'`, `'Object fit'`,
  `'Overflow'` and spreads the specimen tables in that order.
- `tests/app/browser/index.test.ts` compares a sorted key list, so its order does not follow
  construction, and it needed no edit.
- In `guides/veneer.md`, the `### Object fit utilities` section precedes the
  `### Overflow utilities` section. In § Tests, the object-fit utilities link precedes the
  overflow utilities link. The specimen links were already alphabetical in that order.
- **Reading:** the section gate passes, including the `Showcase` proof's order case.

## Gates

The worktree readings cover owned files only:
- `npm run format:check`: exit 0, "All matched files use the correct format."
- `npm run lint:check`: exit 0.

The rebuilt validation copy at `tmp/probe/base` was built from `2a3f223`, the owned files, the
`ufl-shared-2.patch` file, and the `ufl-routeb-2.patch` file. The script is
`.orkestrel/veneer/units/ufl-instruments/ufl-gates-2.sh`, and the logs are `.orkestrel/veneer/units/ufl-instruments/ufl-2-gate-*.log.txt`. The copy was deleted
after the readings.

| Gate | Command | Result |
| --- | --- | --- |
| Type check | `npm run check` | exit 0 |
| Build | `npm run build:src` | exit 0 |
| Style proofs (round-1 command) | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` over the owned float, overflow, object-fit, clearfix, and stretched-link proofs | exit 0, `Tests  43 passed (43)` |
| Route B proofs | the same command over `tests/src/styles/mixins.test.ts` and `tests/src/styles/components/card.test.ts` | exit 0, `Tests  35 passed (35)` |
| Section proofs (round-1 command) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over the Float, Overflow, Object fit, Link, `Showcase`, and index proofs | exit 0, `Tests  17 passed (17)` |
| Styles setup | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | exit 0, `Tests  123 passed (123)`, the duplication case included |
| Conformance | `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |
| Guides | `npm run test:guides` | exit 0 |
| Policy | `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| Scoped format over the patched shared files and the Route B files | `oxfmt --check --ignore-path=/dev/null` | exit 0 |
| Scoped lint over the patched TypeScript | `oxlint --deny-warnings --no-ignore` | exit 0 |

The whole `npm run test:setup` project, `npm run test:service`, the journey, and `CAPTURE=1` are the
Orchestrator's observations. This round changes no shared name and no Tailwind fixture, so
mid-campaign note 3's profile cases have no further name from this unit to read.

## Patches and captures

- `.orkestrel/veneer/units/ufl-shared-2.patch` supersedes the round-1 shared patch whole.
  - `git apply --check` passed with exit 0 on a fresh `git archive 2a3f223` extract under
    `tmp/probe/`.
  - Against round 1, it changes only the `app/browser/Showcase.ts`, `app/browser/index.ts`,
    `app/browser/constants.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setupStyles.ts`,
    `tests/setupStyles.test.ts`, and `guides/veneer.md` files, at the U1, U2, U3, and U5 sites.
  - The line-level interdiff is `.orkestrel/veneer/units/ufl-instruments/ufl-2-shared-interdiff.txt`.
- `.orkestrel/veneer/units/ufl-routeb-2.patch` supersedes the round-1 Route B patch whole.
  - `git apply --check` passed with exit 0 over the applied shared patch and the owned files.
  - The applied tree matched the validation copy.
  - Against round 1, it changes only the comment on the `cover-block` mixin (U2).
- `.orkestrel/veneer/units/ufl-2.diff` and `.orkestrel/veneer/units/ufl-2-status.txt` are captured as in round 1: the
  `git diff 2a3f223` output, then a `/dev/null` diff for each untracked owned file.
- The mutation log is `.orkestrel/veneer/units/ufl-instruments/ufl-mutations-2.log.txt`, and its instrument is
  `.orkestrel/veneer/units/ufl-instruments/ufl-mutate-2.sh`. The comment reflow instrument is `.orkestrel/veneer/units/ufl-instruments/ufl-reflow.py`.

## Deviations

None. Choices recorded:
- The `computeCornerPoints` helper joins the U1 tables. The corner arithmetic would otherwise
  repeat in every hit-test case, and the tests rule refuses a duplicate helper.
- The helper takes a plain rectangle, so the setup module still reads no document.
- The float "sides" wording and the other non-blocking observations that the verdict dropped stay
  as they were.
