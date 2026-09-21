# CL7 scout — report

Engine: Cursor Grok 4.6 through the Cursor CLI, read-only, under `units/cl7-scout-brief.md`.
Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/cl7-scout.jsonl` (stderr journal
empty). Session id `f6457c6c-5bf7-47db-af82-97746fd5c09b`.

Taken while CL5b was writing in the same checkout. CL5b's grant covers `src/styles/_mixins.scss`,
the four extraction partials, `tests/setupConformance.ts`, and three test files; it does not touch
the breakpoint ramp, the breakpoint case table, the pinned fixture, or the guide, which are this
map's subjects. Re-check the ramp reading against the landed tree before CL7's brief rests on it.

The distillate follows, with the raw stream's HTML entities restored.

## 1. The `container` key

The entry starts at `tests/fixtures/oracle/inventory.json:6480`; its summary at `:114329` records
34 selectors, 97 declarations, and 2 properties. The entry's own `media` field is empty
(`:7781`): every condition sits on a selector object as its own `condition`, not on that array.
The `properties` keys are `--bs-gutter-x` and `--bs-gutter-y` (`:7718-7778`), and they are the
only custom properties on the key.

**The unconditioned fluid shell**, seven selectors carrying the same seven declarations
(`--bs-gutter-x: 1.5rem`, `--bs-gutter-y: 0`, `width: 100%`, the two inline paddings computed
from the gutter, and the two automatic inline margins): `.container` (`:6483-6518`),
`.container-fluid` (`:6521-6556`), and `.container-xxl` through `.container-sm`
(`:6559-6746`). The fluid variant never appears under a media condition.

**The breakpoint-scoped maximum widths**, twenty selectors, each its own object with one class,
one condition, and one `max-width`:

| Condition | `max-width` | Classes |
| --- | --- | --- |
| `min-width: 576px` (`:6749-6776`) | `540px` | `.container-sm`, `.container` |
| `min-width: 768px` (`:6779-6821`) | `720px` | adds `.container-md` |
| `min-width: 992px` (`:6824-6881`) | `960px` | adds `.container-lg` |
| `min-width: 1200px` (`:6884-6956`) | `1140px` | adds `.container-xl` |
| `min-width: 1400px` (`:6959-7046`) | `1320px` | adds `.container-xxl` |

A named variant starts capping at its own boundary and then shares the plain container's larger
caps. The container widths are not the ramp widths.

**The unconditioned navigation combinators**, seven selectors carrying `display: flex`,
`flex-wrap: inherit`, `align-items: center`, and `justify-content: space-between`:
`.navbar > .container` and one per container variant (`:7049-7228`).

## 2. The ramp

The map is at `src/styles/_mixins.scss:76-77`. Four members read it: `breakpoints()` returning
the map (`:76-77`), `breakpoint($name)` returning one width and erroring on an unknown name
(`:82-87`), `breakpoint-up($name)` which emits content unwrapped at the zero boundary and
otherwise wraps it in a width-at-least query (`:94-102`), and `breakpoint-down($name)` which
emits nothing at the zero boundary and otherwise wraps in a width-below query (`:110-116`).

`src/styles/_tokens.scss` walks the ramp twice to emit the Veneer breakpoint tokens (`:296-297`)
and their Bootstrap aliases (`:385-386`). **No token's name contains `container` or `gutter`.**
The space scale runs `--vn-space-1` through `--vn-space-8` plus `--vn-space-12` and
`--vn-space-24` (`:241-250`), and the twelfth is `1.5rem` scaled by density, matching the
inventory's gutter value as a number rather than as a named gutter token.

**No inventory condition is orphaned.** Every one of the key's conditions matches a named
`breakpoint-up` at the same pixel width, and `breakpoint-down` is unused by this key. The
difference is spelling, not coverage: the fixture stores the legacy minimum-width form while the
mixin emits the range form, and `parseMediaWidth` (`tests/setupStyles.ts:1528-1533`) treats them
as one boundary. The mixins express when a rule applies, never the payload widths, which exist
only on the inventory entries.

## 3. The tables and probes

`BREAKPOINT_CASES` (`tests/setupStyles.ts:345-353`) is a frozen list pairing each boundary with
readings below, at, and above it, over `375`, `576`, `768`, `992`, `1200`, and `1400`. The first
is not a ramp name, and the zero boundary is not a table entry. No export's name contains
`CONTAINER`.

The mixin proof (`tests/src/styles/mixins.test.ts:126-224`) walks the breakpoint token names and
asserts, for each non-zero name, that the emitted conditions parse to the resolved token width,
and that the zero boundary emits unwrapped content and no lower rule. It then requires the case
table to carry a boundary equal to each token width and drives `visitBreakpoint` to assert
content applies at and above the boundary and not below.

`parseMediaWidth` (`:1535-1543`) extracts a width from either spelling and changes no viewport.
The member that changes width is `visitBreakpoint`, which the mixin proof imports from
`tests/setupBrowser.js`, outside this map's read list.

**A container proof can drive a width change through existing infrastructure.** The case table
and the viewport visitor already apply below, at, and above each published boundary and read
computed style, so a container proof can mount the classes and assert their maximum width at
those readings, including the sub-boundary floor. What does not exist is an expected-value table
for the container payload widths; pinning those would be new rows.

## 4. The deferral rows

The deferred-selectors table is `guides/veneer.md:212-289`. **No row names a navigation selector
or a container-adjacent one.** The seven navigation combinators on the container key are
therefore on the key and not deferred.

The compatibility table (`:766-816`) carries no row whose Component is `container`; the last
class rows before the button are the figure rows at `:784`.
