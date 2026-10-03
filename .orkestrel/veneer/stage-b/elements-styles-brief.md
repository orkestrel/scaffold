# Unit elements-styles — what the elements styles hold for the Veneer styles surface

## Role and engine

Mapper on Grok 4.7 Extra High, reached through the Cursor bench. Read-only.

## Objective

`@orkestrel/veneer` ships Bootstrap 5.3.8's cascade in `src/bootstrap` and will ship its own look in `src/styles` (the Veneer styles surface, chunk 3): `--vn-*` tokens, the `veneer` token and class registry groups, theme packs through `retune`, and the CSS its native browser surfaces need beyond Bootstrap's sheet. The user names the `mikesaintsg/elements` checkout as a source of ideas and information for that surface. Map what elements' styles hold, so the Orchestrator can build the inventory of what the Veneer styles must take over and what they must come up with. Do not design Veneer; report what elements does, where, and how it relates to Veneer's records.

## Context

- Elements checkout: `C:\Users\mikes\WebstormProjects\elements` at `3b41900`. Cite it as `elements:<path>:<line>`.
- Veneer checkout: `C:\Users\mikes\WebstormProjects\veneer` at `dc4654b`. Read `ROADMAP.md` § Cascade contract, § Standing shape, § Style centralization, and § Sequence; `src/styles/` whole; `src/bootstrap/` only to tell what Bootstrap's sheet already covers; and `guides/veneer.md` § Styles.
- Standing rulings for chunk 3 (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\plan.md`, chunk 3): take the carried mechanisms of `absorb-styles-source` (factors, motion tokens, contrast rule, `retune`) and drop the Elements-look values `absorb-styles-identity` marks `identity`. Those distillates are under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\distillates\`; cite them as `scaffold:.orkestrel/veneer/distillates/<file>:<line>`. Where elements today differs from those distillates, report the difference.

## Read in elements

1. `src/styles/` whole: the tokens, mixins, `elements/`, `components/`, `composables/`, `modifiers/`, `surfaces/`, and `themes/`.
2. The guides `guides/styles.md`, `guides/tokens.md`, `guides/surfaces.md`, `guides/mixins.md`, `guides/modifiers.md`, `guides/components.md`, and `guides/showcase.md`.

## Report

1. **Token system.** The scales, factors, roles, and theme-pack shape elements uses (names, values, derivation), with citations, and how a theme overrides them.
2. **Native-surface CSS.** Every rule elements writes for a native browser surface: `dialog` and `::backdrop`, `[popover]` and `:popover-open`, `details` and `::details-content`, anchor positioning, `@starting-style` and `transition-behavior`, `interpolate-size`, `scrollbar-gutter`, `:focus-visible`, `inert`, scroll snap, and any other; what each rule neutralises or styles, with citations.
3. **Component and element looks.** Per component family that has a Bootstrap counterpart (alert, badge, button, card, carousel, collapse and accordion, dropdown, list group, modal, nav and tabs, navbar, offcanvas, pagination, popover, progress, spinner, toast, tooltip, forms, tables), what elements styles and how, in one or two lines each with citations.
4. **Relation to Veneer.** For each item in parts 1 to 3: whether Bootstrap's sheet in `src/bootstrap` already covers it (cite the partial), whether the Veneer styles surface would take it over, or whether it is new ground the surface would come up with; and whether it falls under the identity-drop ruling.

## Output

Your final message is the document, under 10,000 characters per turn. If it exceeds that, answer parts 1 and 2 in this turn and end with the line `CONTINUES`; the Orchestrator resumes you for parts 3 and 4. The Orchestrator writes each turn to `tmp/units/elements-styles-<n>.md`. No process diary.

## Status rules

- Cite only lines you read. Mark a claim you could not verify by reading as `unverified`.

## Scope

- Owned: none. Read-only. Edit no file in either checkout. Perform the assignment yourself and spawn nothing.

## Deviation contract

On any conflict with this brief, stop and report: expected, found, evidence, done or not done, and one hypothesis.
