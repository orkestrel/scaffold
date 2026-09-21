<!-- grok on cursor-grok-4.6-high, Cursor CLI 2026.09.18-9a7762b, session
b32f5e61-5780-4df3-8a16-dbb2543aa7f9, journalled at tmp/cursor/cl8-scout.jsonl and swept at
acceptance; the session id is the durable handle. Subject tree at Veneer a9172df, confirmed clean
before and after the read-only run. Retained 2026-09-21. -->

# CL8 scout — the grid and gutter keys, and what CL7 left for them

## 1. The six keys by generation rule

| Key | Selectors | Properties object | Shape |
| --- | --- | --- | --- |
| `row` | 80 | `--bs-gutter-x`, `--bs-gutter-y` | declares the gutter properties on `.row` and reads them on `.row` and `.row > *` |
| `col` | 87 | empty | column steps 1 to 12 across the breakpoint infixes |
| `offset` | 71 | empty | column steps across the breakpoint infixes |
| `g` | 72 | `--bs-gutter-x`, `--bs-gutter-y` | spacer steps 0 to 5 across the breakpoint infixes, both axes |
| `gx` | 36 | `--bs-gutter-x` | spacer steps across the breakpoint infixes, one axis |
| `gy` | 36 | `--bs-gutter-y` | spacer steps across the breakpoint infixes, one axis |

Shared axes across the keys: spacer steps 0 to 5, column steps 1 to 12, and the breakpoint infix
`sm|md|lg|xl|xxl`. Every key's key-level `media` array is empty; breakpoint scoping lives per
selector as a `condition` field.

Consequence for the listing: `col` and `offset` have empty properties objects, so the
empty-properties branch of `collectShippedComponents` admits them on selector rows alone. `row`,
`g`, `gx`, and `gy` have non-empty properties and need a shipped variable row per property.

## 2. What the row and column keys need from each other

`--bs-gutter-x` and `--bs-gutter-y` are declared by `row` (on `.row`), by `g`, and by `gx` and
`gy`; they are read by `row`'s `.row` and `.row > *` rules. **`row` must ship first**: the
utilities only override a property the row rule declares and reads.

`col` and `offset` declare and read no custom property. They couple to `row` as flex children
only.

## 3. The container pattern CL8 follows

The ramp loop sits at `src/styles/components/_container.scss:19-29`: an `@each` over
`breakpoints()` that skips the zero boundary, accumulates the selector list, and sets the cap
inside `breakpoint-up`. The proof pattern is `tests/src/styles/components/container.test.ts`,
driving `visitBreakpoint` and reading through `readStyle`, `readPixels`, and `readToken`.

Reusable members named by the scout: `breakpoints()` and `breakpoint-up` (`_mixins.scss:82-109`);
`--vn-gutter-x` and `--vn-gutter-y` with `TOKEN_NAMES.gutter` (`_tokens.scss:311-312`,
`constants.ts:280-283`); the space tokens (`_tokens.scss:248-256`); and `BREAKPOINT_CASES`
(`setupStyles.ts:390-398`).

## 4. The gutter tokens as they now stand

`--vn-container-*`, `--vn-gutter-x` and `--vn-gutter-y` (defaults `1.5rem` and `0`), the
breakpoint tokens, and the space tokens all exist. The scout's assessment: the three gutter
utility keys need no new gutter-scale token, because the space scale already covers the utility
steps — its twelfth member equals the gutter default and its zero member equals the block default
— and the row rule wants the same gutter tokens the container already uses.

## 5. The guide and the deferrals

No deferred-selector row names a grid selector. The container key's compatibility rows
(`guides/veneer.md:753-770`) are the pattern: a selector row per official selector, and a variable
row per custom property. `col` and `offset` take selector rows only; `row`, `g`, `gx`, and `gy`
take selector rows plus variable rows.

## Unknowns the scout flagged rather than resolved

- **Physical against logical properties.** The row and column declarations use physical properties
  (`margin-left`, `padding-left`, `padding-right`) where the container shipped logical ones
  (`padding-inline`, `margin-inline`, `max-inline-size`). Named as a difference, not resolved.
- **The column loop's shape differs from the container's.** Column breakpoint rules are distinct
  prefixed selectors each carrying its own `min-width` condition, rather than the container's
  single accumulating selector list. A grid partial's loop therefore cannot copy the container's.
- **The `g` key splits each class across separate inventory entries**, one property each, rather
  than one entry carrying both declarations.
- **The guide's token tables name neither `--vn-container-*` nor `--vn-gutter-*`**, though the
  compatibility rows reference them. Already carried to CL12.
