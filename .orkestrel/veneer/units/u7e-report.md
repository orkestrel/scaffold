<!-- Retained from veneer/tmp/units/u7e-report.md. Native lane: opus on Opus 5 (Agent dispatch, clean context), over Veneer 92aad70, 2026-09-21; brief u7e-brief.md. Bounds 1, 2, 4, 5a, 5b corrected; bound 3 true as written; one further false sentence in § Showcase corrected under the objective; four incomplete enumerations recorded, not edited; every gate exit 0. -->

# Unit U7e report — `guides/veneer.md` after U7

## Outcome

Every bound is closed: bounds 1, 2, 4, 5a, and 5b are corrected at their sites, and the
§ Compatibility unknown is ruled true as written with no edit. One further correction outside the
bounds is recorded under § Deviation-contract correction, for the Orchestrator to rule on. Every
gate the brief names exits 0. The working tree carries `guides/veneer.md` alone.

## Bound 1 — § Showcase (line 728 at launch)

Before:

```text
The private application renders the Veneer heading, the Dark mode button, and a Showcase region.
Its button drives the controller and announces the selected mode. The application barrel is a
workspace implementation surface and is outside this guide's published API tables.
```

After:

```text
The private application renders the Veneer heading, the Dark mode button, a Showcase region, and a
Buttons region carrying every declared button specimen. Its button drives the controller and
announces the selected mode, and its entry constructs a `Delegate` instance beside the showcase.
The application barrel is a workspace implementation surface and is outside this guide's published
API tables.
```

Evidence read against the tree at `92aad70`:

- `app/browser/Showcase.ts` line 66 returns `[new ButtonSection(this.#main)]`, so the section mounts
  after the region the `SHOWCASE_COPY.region` copy names.
- `app/browser/sections/ButtonSection.ts` line 51 labels the region from `BUTTON_COPY.region`, which
  is `'Buttons'` at `app/browser/constants.ts` line 13, and line 56 renders every `BUTTON_SPECIMENS`
  row into the grid.
- `app/browser/main.ts` line 9 constructs the `Showcase` instance and line 14 constructs the
  `Delegate` instance.

The shell stylesheet needs no sentence here. `app/browser/styles/_shell.scss` declares its own
`shell` layer carrying `color-scheme` per mode and the `.specimens` layout class, and paints
nothing, so no claim this section makes about the published cascade is falsified by it. The
paragraph named no shell stylesheet before the edit and names none after it.

## Bound 2 — § Tests (line 744 at launch)

Before:

```text
The application proofs drive the shell through its interface; see
[showcase mounting and destruction](../tests/app/browser/Showcase.test.ts) and
[showcase journeys](../tests/app/browser/integration.test.ts).
```

After:

```text
The application proofs drive the shell through its interface; see
[showcase mounting and destruction](../tests/app/browser/Showcase.test.ts),
[specimen rendering and engine ownership](../tests/app/browser/sections/ButtonSection.test.ts), and
[showcase journeys](../tests/app/browser/integration.test.ts).
```

The link text names what the proof reads: `tests/app/browser/sections/ButtonSection.test.ts` covers
specimen rendering in table order, the nested label, the variant population, engine ownership
against the published selector, release on destruction, and a second destruction. The list takes
the same form the § Tests style-proofs sentence already uses, with `and` closing the penultimate
line. No setup-proof sentence was added, because § Tests lists no setup proof.

## Bound 3 — § Compatibility Proof cells (the brief's unknown)

True as written, no edit. The Button rows sit at lines 676 to 686 at launch. Every Proof cell
carries either a recording step name (`button.initial`, `button.click.toggle`,
`button.click.release`, `button.pressed.click`, `button.disabled.click`) or an em dash. No cell
states what is compared, so no cell is made false by the landed journey.

The § Compatibility prose about that column also stays true:

- Line 665 at launch: `tests/conformance.test.ts` reads the rows and compares their named steps with
  the official Button recording. `tests/conformance.test.ts` line 80 calls
  `scanOracleObligation(row, recording)` for every row, and that function at
  `tests/setupConformance.ts` line 804 resolves the row's Proof step in the recording and runs the
  bound predicate over it.
- Line 709 at launch: a named Proof step obliges the official recording to agree with the row. Same
  mechanism.
- Lines 670 to 672 at launch: Button's forced-colors reading remains open because the installed
  `MediaOptions` contract stages print and motion only. The installed declaration at
  `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` line 1621 declares the optional `print`
  and `motion` members and no other.

The live coverage bound 3 names is real and is claimed by no cell:
`tests/app/browser/integration.test.ts` drives the recording step for step at line 473 and again
under staged reduced motion at line 487, asserting `comparison.driven` equals `comparison.recorded`
on each axis.

## Bound 4 — § Departures from Bootstrap (line 604 at launch)

One row added, after the `--vn-focus-width`, `--vn-focus-opacity` row and before the
`--vn-font-sans` row, in the table's own three-column shape and padded to its existing widths:

```text
| `--bs-btn-focus-shadow-rgb` | `var(--vn-color-primary-rgb)`, declared for consumers and read by no Veneer rule, because `--bs-btn-focus-box-shadow` carries its own ring expression | Each role's own channel triplet, read by `--bs-btn-focus-box-shadow` as `rgba(var(--bs-btn-focus-shadow-rgb), 0.5)` |
```

Evidence:

- `src/styles/components/_button.scss` line 18 declares
  `--bs-btn-focus-shadow-rgb: var(--vn-color-primary-rgb)` on `.btn`, and line 19 declares
  `--bs-btn-focus-box-shadow: 0 0 0 var(--vn-focus-width) var(--vn-focus-color)`, which names no
  channel triplet. Lines 101 and 191 are the only focus-ring includes, and each passes
  `$shadow: var(--bs-btn-focus-box-shadow)`.
- `src/styles/elements/_button.scss` line 47 includes the mixin with its default shadow,
  `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`.
- No role block retunes `--bs-btn-focus-shadow-rgb`; the guide already records that the ring stays
  primary for every role.
- The built cascade agrees: `dist/src/styles/index.css` declares
  `--bs-btn-focus-shadow-rgb:var(--vn-color-primary-rgb)` once and carries zero occurrences of
  `var(--bs-btn-focus-shadow-rgb)`.
- Bootstrap 5.3.8 reads it: `node_modules/bootstrap/dist/css/bootstrap.css` line 2968 declares
  `--bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5)` on `.btn`, and
  each role block from line 3041 onward declares its own triplet.

The § Tokens binding row at line 525 at launch is unchanged: it states the binding correctly, and
the departure is what the table owed.

## Bound 5a — § Styles, the proof-subject sentence (line 166 at launch)

Before:

```text
project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and the cases
that read the shipped cascade read the rules the browser resolved from that file rather than the
declarations the SCSS sources carry.
```

After:

```text
project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and a case
reading that file reads the rules the browser resolved from it rather than the declarations the
SCSS sources carry.
```

`tests/src/styles/tokens.test.ts` line 12 imports `../../../dist/src/styles/index.rtl.css?raw`, a
second built stylesheet the browser never resolved into rules, so the claim narrows to the cases
that read the file the `setupFiles` array loads.

## Bound 5b — § Departures from the workspace rows (line 242 at launch)

Before:

```text
The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each of its tables:
a `src/styles/` row in the environment table, a `@src/styles` row in the alias table, and the
matching rows of its build-output, test-project, and scoped-check tables. Veneer's pilot departs
from those rows as follows, and each departure names its cause.
```

After:

```text
The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each table it keys
by environment: a `src/styles/` row in the environment table, a `@src/styles` row in the alias
table, and the matching rows of its build-output, test-project, and scoped-check tables. Veneer's
pilot departs from those rows as follows, and each departure names its cause.
```

The named list was already right and is untouched. `.claude/rules/workspace.md` carries a styles row
in the environment table (line 24), the alias table (line 49), the build-output table (line 99), the
test-project matrix (line 122), and the typecheck-scope table (line 216). Its cross-cutting
workspace-proof table (lines 133 to 142) and its script-intent table (lines 235 to 251) carry none,
and neither is keyed by environment, so the replacement clause states what separates them. The
paragraph's following lines were rewrapped to the file's width with no wording change.

## Deviation-contract correction outside the bounds

§ Showcase, the styles-entry paragraph (line 738 at launch), carried a negative that U7a made false.
Corrected:

Before:

```text
baseline. It ships no component treatments. The document baseline also declares
`interpolate-size: allow-keywords`, and `tests/src/styles/elements/html.test.ts` reads it there.
```

After:

```text
baseline. It also ships the bare button treatment in the `elements` layer and the `.btn` treatments
in the `components` layer, and no treatment for another component. The document baseline also
declares `interpolate-size: allow-keywords`, and `tests/src/styles/elements/html.test.ts` reads it
there.
```

Evidence: `src/styles/index.scss` loads `elements/button` and `components/button`, and
`src/styles/components/_button.scss` emits `.btn` and every variant, size, link, check-label, and
disabled treatment inside `@layer components`. The `components/` directory holds `_button.scss`
alone and the `elements/` directory holds `_html.scss`, `_body.scss`, and `_button.scss`, so no
other component is treated.

Why this was corrected rather than reported: the unit's Objective binds every sentence U7a, U7b,
U7c, or the tidy unit made false; the sentence sits in § Showcase, which bound 1 names; and the fix
stays inside the one owned file and adds no example, section, or explanation. It is recorded here
separately because the bounds did not enumerate it. Reverting it is one sentence if the Orchestrator
rules it outside this unit.

## Observations, not edited

Each of the following is an incomplete enumeration rather than a false assertion, and each sits
outside the bounds the brief names. None was edited.

- § Tests, the browser-proofs sentence (line 748 at launch), names the controller and the guard. U7b
  landed `tests/src/browser/Button.test.ts`, `Delegate.test.ts`, `helpers.test.ts`, and
  `index.test.ts` beside them. The brief bounds § Tests to the application-proofs sentence.
- § Surface, the intro (lines 7 and 8 at launch), says the core entry publishes the token registry
  and the types that read it, and the browser entry publishes the color-mode controller. U7b added
  `AppError` and `isAppError` to core and the Button, Delegate, helper, and guard exports to
  browser, each carrying its own Surface row.
- § Tokens (line 504 at launch) says the `focus-ring` mixin takes a color, a width, and an optional
  shadow expression. `src/styles/_mixins.scss` line 21 also declares the `$highlight` and `$reset`
  parameters U7a added. The rest of that paragraph is true: the mixin's forced-colors block writes
  `outline: $width solid $highlight`, and `--vn-focus-highlight` resolves to the system `Highlight`
  color in both modes.
- § Departures from the workspace rows (line 274 at launch) says the proofs under
  `tests/src/styles/` prove the cascade, the tokens, the theme, the mixins, and the elements. U7a
  added `tests/src/styles/components/button.test.ts`. That bullet's own claim — that no proof
  asserts the alias, the project registration, or the configuration plugins — stays true.

## Gates

Every command ran in `C:/Users/mikes/WebstormProjects/veneer` on the edited tree.

| Command                    | Exit | Final lines                                                                                     |
| -------------------------- | ---- | ----------------------------------------------------------------------------------------------- |
| `npm run format:check`     | 0    | `All matched files use the correct format.` / `Finished in 786ms on 96 files using 16 threads.` |
| `npm run test:guides`      | 0    | `Test Files  1 passed (1)` / `Tests  18 passed (18)`                                            |
| `npm run test:policy`      | 0    | `Test Files  1 passed (1)` / `Tests  109 passed \| 1 skipped (110)`                             |
| `npm run test:conformance` | 0    | `Test Files  1 passed (1)` / `Tests  8 passed (8)`                                              |
| `npm test`                 | 0    | `Test Files  1 passed (1)` / `Tests  18 passed (18)`, the `guides` project closing the chain    |

The `npm test` chain's projects, in run order, with the log retained at
`u7e-test.log.txt.txt`:

- `src:core` and `src:browser`: 8 files, 51 tests passed.
- `src:styles`: 9 files, 104 tests passed.
- `app:browser`: 3 files, 10 tests passed.
- `journey`: 4 files, 80 passed and 4 skipped.
- `policy`: 109 passed and 1 skipped.
- `config`: 173 passed and 1 skipped.
- `setup`: 3 files, 121 tests passed.
- `setup:browser`: 27 tests passed.
- `conformance`: 8 tests passed.
- `guides`: 18 tests passed.

## Git

`git diff --stat`:

```text
 guides/veneer.md | 32 +++++++++++++++++++-------------
 1 file changed, 19 insertions(+), 13 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M guides/veneer.md
```

The repository's `.gitignore` file ignores `tmp`, so this report and the retained suite log do not
appear in that output.
