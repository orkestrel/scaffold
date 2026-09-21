# Unit CL2 report — Content/layout tokens and breakpoint mixins

`opus` on native Opus 5, sole writer in `C:/Users/mikes/WebstormProjects/veneer`, from HEAD
`00a5bdc` with a clean tracked tree. Brief: `cl2-brief-2.md`. Nothing committed, nothing
pushed, no `git checkout`, `restore`, `stash`, `reset`, or `clean` run.

## Per item, as landed

### Item 1 — tokens

| Change | Site |
| --- | --- |
| `--vn-space-12: calc(1.5rem * var(--vn-factor-density))`, `--vn-space-24: calc(3rem * …)` | `src/styles/_tokens.scss:240-241`, after `--vn-space-8` |
| `--vn-display-1: 5rem` through `--vn-display-6: 2.5rem` | `src/styles/_tokens.scss:220-225`, after the `--vn-size-*` ramp |
| `'state-stripe': 5%` in `$light` and `$dark` | `src/styles/_tokens.scss:23`, `:65` |
| `--vn-state-stripe` in the theme closure, beside hover and active | `src/styles/_mixins.scss:136` |
| Registry leaves `space.12`, `space.24` | `src/core/constants.ts:183-184` |
| Registry group `display` with leaves `1` through `6` | `src/core/constants.ts:200-207` |
| Registry leaf `state.stripe` | `src/core/constants.ts:242` |

`src/core/types.ts` needed no edit: `TokenMap` is `typeof TOKEN_NAMES`, and `TokenLeaf` already
reduces a nested frozen group to its string leaves, so the `display` group's arrival is carried by
the existing types. `tests/src/core/index.test.ts` needed no edit either: its assertions are
generic over the registry (export set, freeze, path law, uniqueness) and enumerate no token name.
Its export-set assertion names `AppError`, `TOKEN_NAMES`, and `isAppError`, which this change
leaves unchanged.

### Item 2 — mixins and the one Sass source

| Change | Site |
| --- | --- |
| `@function breakpoints()` returning `(xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px)` | `src/styles/_mixins.scss:3-11` |
| `@function breakpoint($name)`, `@error` on a name the map lacks | `src/styles/_mixins.scss:13-21` |
| `@mixin breakpoint-up($name)` taking `@content` | `src/styles/_mixins.scss:23-37` |
| `@mixin breakpoint-down($name)` taking `@content` | `src/styles/_mixins.scss:39-52` |
| `--vn-breakpoint-*` emitted by `@each` over `breakpoints()` | `src/styles/_tokens.scss:287-289` |
| `--bs-breakpoint-*` emitted by `@each` over `map.keys(breakpoints())` | `src/styles/_tokens.scss:376-378` |
| `@use 'sass:map'` added for that second walk | `src/styles/_tokens.scss:2` |

**The one-source choice: a `@function` in `_mixins.scss`.** The styles rule gives `_mixins.scss`
`@function` values and `@mixin` emitters, so the widths sit inside a function there rather than as
a map in `_tokens.scss`. Three facts decided it. `_tokens.scss` loads `mixins`, so a map declared
in `_tokens.scss` is unreachable from the mixins, while a value in `_mixins.scss` is reachable from
both. A consumer partial loads `../mixins` and not `../tokens`, so a map passed as an argument
would force every caller to reach a file the rule does not route it to. And a function returning
the map lets `_tokens.scss` walk the same entries it emits from, so the token declarations and the
media conditions are one expression apart rather than two lists. `breakpoint($name)` sits beside it
because the guarded lookup would otherwise be repeated in each mixin, and `breakpoints()` cannot
serve a mixin that needs one width while `breakpoint()` cannot serve a walk that needs the names.

**The `breakpoint-down(xs)` choice: emit nothing, no refusal.** `breakpoint-up(xs)` emits its
content unwrapped because the zero boundary is at or below every viewport; the mirror of that is
that no viewport is below it, so `breakpoint-down(xs)` emits no rule. The pair then stays total
over every published name: a partial walking the ramp reads the region each name names and needs no
case of its own at either end, which is the shape a responsive utility scale calls for. A refusal
would make the family partial in one direction only, and the reading it would refuse is not an
unknown region but an empty one. The compile-time refusal is reserved for what is genuinely not a
region: a name the ramp does not carry, which `breakpoint()` refuses with `@error`.

**Condition shape.** `(width >= #{$width})` and `(width < #{$width})`, interpolated so Sass emits
the range syntax rather than evaluating the comparison. The number in each condition is the token's
value exactly; no `575.98px` form is emitted anywhere.

### Item 3 — proofs

| Proof | Site |
| --- | --- |
| Space ramp at both densities | `tests/src/styles/tokens.test.ts` — "continues the space ramp at its index law…" |
| Display sizes, and their independence from the density factor | `tests/src/styles/tokens.test.ts` — "resolves each display size to the retained Bootstrap step…" |
| Stripe percentage in each mode, beside hover and active | `tests/src/styles/tokens.test.ts` — "resolves the stripe percentage to the retained Bootstrap tint…" |
| Conditions equal the resolved tokens; `xs` wraps nothing and gates nothing | `tests/src/styles/mixins.test.ts` — "emits each condition at the width its own published token resolves to" |
| Viewport below, at, and above each boundary | `tests/src/styles/mixins.test.ts` — "applies the up content at and above each boundary…" |
| Unknown name refused at compile time; `xs` emission shape | `tests/setupStyles.test.ts` — "refuses a breakpoint name the ramp does not carry…" |
| `collectMediaConditions` reader | `tests/setupBrowser.ts`; case in `tests/setupBrowser.test.ts` — "reports the gate around a selector…" |
| `parseMediaWidth` reader | `tests/setupStyles.ts`; case in `tests/setupStyles.test.ts` — "reads the width out of either spelling…" |
| Fixture classes per name and direction | `tests/src/styles/fixtures/mixins.scss`, driven by `@each … in breakpoints()` |

**The Unknowns, answered.** The readers already in `tests/setupBrowser.ts` could not answer which
gate holds which selector: `readRules` and `collectNestedRules` both report the media rule and the
rule it holds as separate entries, and `collectScopeProperties` reads custom properties rather than
gates. One reader was added there, `collectMediaConditions(rules, selector)`, which walks from each
`CSSMediaRule` down to the selector it was asked about and returns that rule's `conditionText`. It
sits in the browser module because it reads live CSSOM rule objects, which is CL1's ruling and the
placement `collectScopeProperties` already holds. `parseMediaWidth(condition)` sits in
`tests/setupStyles.ts` because its subject is CSS text.

**The serialization, read on both engines.** Both managed Chromium and Edge return the range syntax
verbatim, unnormalized, for every name:

```text
[[], ["(width >= 576px)","(width < 576px)"], ["(width >= 768px)","(width < 768px)"],
 ["(width >= 992px)","(width < 992px)"], ["(width >= 1200px)","(width < 1200px)"],
 ["(width >= 1400px)","(width < 1400px)"]]
```

Read through a temporary `console.log` inside the mixins proof, identical on both engines, then
removed; `grep -c console tests/src/styles/mixins.test.ts` returns `0`. `parseMediaWidth` still
accepts the `min-width` and `max-width` spellings, because the comparison it serves is on the value
rather than on one engine's current serialization.

### Item 4 — guide

| Change | Site |
| --- | --- |
| `--vn-display-1` through `--vn-display-6` row, value and `bootstrap` source | § Tokens → Reference map → Type |
| `--vn-space-12`, `--vn-space-24` row, value and `bootstrap` source | § Tokens → Reference map → Space, border, radius, and elevation |
| `--vn-state-stripe` row, value and `bootstrap` source | § Tokens → Button states and bindings |
| Breakpoint paragraph: the one Sass source, the mixin pair, the `xs` behaviour, the build refusal | § Tokens → Reference map → Motion, focus, validation, breakpoints, and stacking |
| `breakpoint-down` mixin row deleted | § Tokens → Deferred names |
| Intro sentence naming the state tokens as shared | § Tokens → Button states and bindings |

Two prose edits beyond a row were required by the code change and are inside § Tokens. The
`--vn-state-stripe` row made the section's opening sentence ("Button uses the following canonical
defaults") false on its own, so one clause names the state tokens as shared. Deleting the
`breakpoint-down` deferred row removed the guide's only mention of the mixins, so the breakpoint
paragraph now names the pair, the single Sass source, the `xs` behaviour in both directions, and
the build refusal. The formatter reflowed the column widths of the three tables that gained a row;
that reflow is the bulk of the guide's diffstat.

## Red then green

Each pair is `npm run test:src:styles` or `npm run test:setup`, run in this checkout on managed
Chromium unless named otherwise.

| Subject | Command | Red | Green |
| --- | --- | --- | --- |
| Registry ahead of the cascade, plus the three value proofs | `npm run test:src:styles` | 5 failed, 102 passed (107) | 107 passed (107) |
| Planted unmapped registry name `--vn-space-48` | `npm run test:src:styles` | 2 failed, 105 passed (107) | 107 passed (107) |
| Breakpoint proofs before the mixins and the fixture | `npm run test:src:styles` | 2 failed, 107 passed (109) | 109 passed (109) |
| Planted 1 px move of `sm` in the Sass source (`576px` → `577px`) | `npm run test:src:styles` | 2 failed, 107 passed (109) | 109 passed (109) |
| Planted removal of `breakpoint()`'s `@error` guard | `npm run test:setup` | 1 failed, 125 passed (126) | 126 passed (126) |

Failing test names, first red:

- `tokens.test.ts > token cascade > declares the canonical registry and the compatibility list at the document scope`
- `tokens.test.ts > token cascade > declares the same partitions in the right-to-left cascade`
- `tokens.test.ts > token cascade > continues the space ramp at its index law, and rescales both new steps with the density factor`
- `tokens.test.ts > token cascade > resolves each display size to the retained Bootstrap step, and leaves it outside the density scale`
- `tokens.test.ts > token cascade > resolves the stripe percentage to the retained Bootstrap tint in each mode`

Failing test names, breakpoint red:

- `mixins.test.ts > breakpoint mixins > emits each condition at the width its own published token resolves to`
- `mixins.test.ts > breakpoint mixins > applies the up content at and above each boundary, and the down content below it`

Failing test names, 1 px source plant:

- `mixins.test.ts > breakpoint mixins > applies the up content at and above each boundary, and the down content below it`
- `tokens.test.ts > token cascade > resolves every retained length token to the length Bootstrap declares for its alias`

Failing test name, `@error` guard plant:

- `setupStyles.test.ts > styles setup > refuses a breakpoint name the ramp does not carry, and gates each name it does`

**What the 1 px plant reddens, and why that is the right guard.** The widths have one Sass source,
so moving that source moves the token and the condition together and the condition-equals-token
assertion stays green by construction. The independent expectations are the ones that redden:
`RETAINED_LENGTH_ALIASES` in `tests/setupStyles.ts` pins each breakpoint against Bootstrap's own
literal, and the viewport proof requires every non-zero boundary to be a boundary `BREAKPOINT_CASES`
drives, which a `577px` ramp no longer satisfies. Both declarations sit outside the Sass source and
cannot be moved by it.

**Every plant's removal.**

- `--vn-space-48` removed from `src/core/constants.ts`; `grep -c "vn-space-48" src/core/constants.ts` returns `0`.
- `577px` restored to `576px` in `src/styles/_mixins.scss`; `grep -c "577px" src/styles/_mixins.scss` returns `0`.
- The `@error` guard restored in `breakpoint()`; the function reads with its `map.has-key` refusal in place.
- The serialization `console.log` removed from `tests/src/styles/mixins.test.ts`; `grep -c console` returns `0`.
- A tree-wide sweep for `vn-space-48`, `577px`, `CONDITION-SERIALIZATION`, and `console.log` over `src`, `tests`, and `guides` returns one pre-existing hit only: `src/browser/helpers.ts:30`, a TSDoc example this unit did not touch.

## Resolved values

Read from the built cascade in the browser, root font size 16 px.

| Token | Density `1` | Density `1.25` |
| --- | --- | --- |
| `--vn-space-1` | 2 px | 2.5 px |
| `--vn-space-12` | 24 px | 30 px |
| `--vn-space-24` | 48 px | 60 px |
| `--vn-display-1` | 80 px | 80 px |
| `--vn-display-2` | 72 px | 72 px |
| `--vn-display-3` | 64 px | 64 px |
| `--vn-display-4` | 56 px | 56 px |
| `--vn-display-5` | 48 px | 48 px |
| `--vn-display-6` | 40 px | 40 px |

`--vn-state-stripe` resolves to `5%` at `[data-bs-theme='light']` and at `[data-bs-theme='dark']`,
read beside `--vn-state-hover` `12%` and `--vn-state-active` `22%` in each. The display sizes carry
no density factor, so they hold at `1.25`; that is asserted rather than assumed.

Emitted cascade readings, from `dist/src/styles/index.css` after `npm run build:src:styles`:
`--vn-breakpoint-xs:0`, `-sm:576px`, `-md:768px`, `-lg:992px`, `-xl:1200px`, `-xxl:1400px`, each
with its `--bs-breakpoint-*` alias reading `var(--vn-breakpoint-<name>)`; `--vn-state-stripe`
declared in three scopes; and `@media (width` appearing zero times, so `_mixins.scss` still emits no
top-level CSS.

## Gates

Run in the brief's order. Managed Chromium unless the row names Edge.

| Gate | Exit | Final reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 756ms on 96 files using 16 threads.` |
| `npm run lint:check` | 0 | no diagnostic output |
| `npm run check` | 0 | no diagnostic output |
| `npm run build` | 0 | `✓ built in 380ms` |
| `npm run test:src:core` | 0 | `Tests 8 passed (8)` |
| `npm run test:src:styles` | 0 | `Tests 109 passed (109)` |
| `npm run test:setup` | 0 | `Tests 126 passed (126)` |
| `npm run test:setup:browser` | 0 | `Tests 33 passed (33)` |
| `npm run test:conformance` | 0 | `Tests 8 passed (8)` |
| `npm run test:guides` | 0 | `Tests 18 passed (18)` |
| `npm run test:policy` | 0 | `Tests 109 passed | 1 skipped (110)` |
| `npm test` | 0 | `51 (51)`, `109 (109)`, `11 (11)`, `84 passed \| 4 skipped (88)`, `109 passed \| 1 skipped (110)`, `173 passed \| 1 skipped (174)`, `126 (126)`, `33 (33)`, `8 (8)`, `18 (18)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` | 0 | `Tests 109 passed (109)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Tests 33 passed (33)` |

## Tree state

`git diff --stat`:

```text
 guides/veneer.md                      |  65 ++++++++++++---------
 src/core/constants.ts                 |  11 ++++
 src/styles/_mixins.scss               |  51 ++++++++++++++++
 src/styles/_tokens.scss               |  30 ++++++----
 tests/setupBrowser.test.ts            |  25 +++++++-
 tests/setupBrowser.ts                 |  36 ++++++++++++
 tests/setupStyles.test.ts             |  31 ++++++++++
 tests/setupStyles.ts                  |  32 ++++++++++
 tests/src/styles/fixtures/mixins.scss |  17 ++++++
 tests/src/styles/mixins.test.ts       | 106 +++++++++++++++++++++++++++++++++-
 tests/src/styles/tokens.test.ts       |  80 +++++++++++++++++++++++++
 11 files changed, 442 insertions(+), 42 deletions(-)
```

`git status --porcelain --untracked-files=all`:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/fixtures/mixins.scss
 M tests/src/styles/mixins.test.ts
 M tests/src/styles/tokens.test.ts
```

`cl2-report.md` is untracked and `tmp/` is ignored, so it does not appear. `src/core/types.ts`
and `tests/src/core/index.test.ts` are owned and unmodified, for the reasons under item 1. No
off-limits path was touched: `src/styles/elements/**` and `components/**` are unchanged, and the
`visitBreakpoint` and `holdOraclePointer` bodies are unchanged — the breakpoint proof calls
`visitBreakpoint` and edits nothing in it.

## Deviation state

One deviation, settled inside an owned file and recorded here rather than stopped on, because
§ Deviation protocol reserves a stop for a conflict that prevents the objective or needs an unowned
change, and this needed neither.

**What.** The brief scopes `tests/setupStyles.test.ts` to "a CSS-text helper and its export
inventory". One further case was added there: "refuses a breakpoint name the ramp does not carry,
and gates each name it does".

**Why.** Acceptance criterion 2 requires the mixins to refuse an unknown name at compile time, and
the brief requires the `breakpoint-down(xs)` choice to be proved. Neither is reachable from the
browser: `sass`'s `compileString` is a Node API, and the `src:styles` project runs under Playwright.
`tests/setupStyles.test.ts` is the one granted file that runs in Node, and it already holds the
precedent for exactly this proof — "refuses an asset key the dark map does not declare" compiles the
shipped partials with `compileString(…, { loadPaths: ['src/styles'] })` and reads the `@error`
`_theme.scss` raises. Leaving the refusal unproven would have shipped an authored behaviour with no
gate, which `.claude/rules/tests.md` and the TTTDD law both refuse.

**Cost if refused.** The case is one `it` in a file the unit already edits; reverting it costs the
compile-time refusal proof and the `xs` emission-shape proof, and leaves criterion 2 half closed.

Ancillary choices settled inside scope, as the deviation contract allows: where the Sass source
sits and where each reader sits (recorded under items 2 and 3); the `breakpoint-down(xs)` behaviour
(recorded under item 2); the guide rows' wording inside the tables' shape (recorded under item 4).

## Acceptance criteria

1. **Met.** Registry and cascade agree on `--vn-space-12`, `--vn-space-24`, `--vn-display-1`
   through `-6`, and `--vn-state-stripe`; the bidirectional equality is green and red on the planted
   `--vn-space-48`; the values resolve as recorded at density `1` and at `1.25`.
2. **Met.** `breakpoint-up` and `breakpoint-down` read `breakpoints()`, the same function
   `_tokens.scss` emits `--vn-breakpoint-*` from; an unknown name is refused at compile time, proved
   red on the guard's removal; every emitted condition's width equals the resolved token, read from
   the loaded fixture's media rules; the gating is driven from the viewport below, at, and above
   each boundary; the 1 px source plant reddens the viewport proof and the retained-length proof and
   green is restored.
3. **Met.** `npm run test:guides` exits 0 with the new rows and without the `breakpoint-down`
   deferred-name row.
4. **Met.** Every gate in the brief's item 5 exits 0, and the browser gates exit 0 on managed
   Chromium and on Edge.
5. **Met.** The status shows the owned files alone; the report sits under the ignored `tmp/`.
