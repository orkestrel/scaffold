# Unit U4a-ledger — obligations and the compatibility ledger

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You write three files and nothing else. The assignments this brief fixes are the
Orchestrator's decisions; you materialize them, you do not re-decide them.

## Objective

Write `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/obligations.md` (every
Bootstrap 5.3.8 JavaScript and theming obligation, merged from the source and documentation
readings), `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/ledger.md` (every
inventory and obligation row assigned to a unit or a recorded exclusion), and the index rows in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research.md` that name the inventory,
the obligations, and the ledger.

## Context

**Evidence.**

- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json` — the CSS
  inventory the Orchestrator generated from the installed `bootstrap.css` and `bootstrap.rtl.css`
  (version `5.3.8`, digests inside). Keys: `version`, `digests`, `components` (one key per class
  root, each with `selectors`, `declarations`, `properties`, `keyframes`, `media`, `rtl`), `root`
  (the `:root` variables), `dark` (the `[data-bs-theme=dark]` retunes), `references`, `keyframes`,
  `media`, `unassigned`, `counts`. Read `counts` for the per-root totals; read a component's
  `selectors` only where the ledger row needs a representative selector.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4a-obligations-report.md` —
  Grok's reading of `bootstrap/js/src` (session `df7e1e1c-0b2f-47c1-b37b-d555a2985f95`): per
  component and utility, the `Distillate` tables `Obligation | Kind | Source` with `file:line`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u4a-docs-report.md` — the
  researcher's reading of the 5.3 documentation pages: per page, the `Distillate` tables
  `Obligation | Kind | Page`.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` § Build this product
  (the product decisions and the exclusion sentence), § Component queue (the family units), and
  § U7 Button.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research.md` — the index; read its
  table shape and add rows in the same shape.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing and
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` for the prose: no counts in
prose, tables for rows, `must`/`can`, present tense, dates as `YYYY-MM-DD`.

**Units the ledger assigns to.** Exactly these names, spelled this way:

| Unit                     | Owns                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `U3 Tokens`              | every `root` variable, every `dark` retune, every per-component `--bs-{component}-*` custom property the inventory lists under a component's `properties`, the `color-mode()` and `data-bs-theme` island contract, the `theme` component key                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `U7 Button`              | the `btn` component's selectors and the Button plugin's obligations (`toggle`, `data-bs-toggle="button"`, `.active` + `aria-pressed`, `dispose`, `getInstance`, `getOrCreateInstance`), plus the cross-cutting engine obligations that land with the first component: `BaseComponent` (`NAME`, `VERSION`, `DATA_KEY`, `EVENT_KEY`, `dispose`, `getInstance`, `getOrCreateInstance`), `Config` (`Default`, `DefaultType`, `data-bs-config` merge order, type checking), `EventHandler` (namespaced `*.bs.*` types, `defaultPrevented` cancelability, `relatedTarget` payload), `Data`, `Manipulator`, `SelectorEngine`, and the `data-bs-*` kebab-case option mapping |
| `Content/layout`         | `reboot` (tag-only rows only, see exclusions), `container`, `row`, `col`, `g`, `gx`, `gy`, `offset`, `table`, `caption`, `figure`, `img`, `lead`, `display`, `blockquote`, `initialism`, `mark`, `small`, `h1` through `h6`, `list-unstyled`, `list-inline`, `link`, `icon-link`, `ratio`, `vr`, and the Reboot documentation rows                                                                                                                                                                                                                                                                                                                                                              |
| `Passive`                | `btn-close`, `close`, `badge`, `breadcrumb`, `btn-group`, `btn-toolbar`, `card`, `list-group`, `pagination`, `placeholder`, `progress`, `spinner`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Forms`                  | `form`, `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `was-validated`, `valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`, `is-valid`, `is-invalid`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Disclosure/navigation`  | `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`, `scrollspy`, and the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Overlays/feedback`      | `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, `carousel`, `transition`, and the Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel plugin obligations, with the utilities `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory`                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Helpers/utilities`      | every remaining utility root: `visually-hidden`, `stretched-link`, `text-truncate`, `d`, `flex`, `justify-content`, `align-items`, `align-self`, `align-content`, `align`, `order`, `m`, `p`, `mt`, `mb`, `ms`, `me`, `mx`, `my`, `pt`, `pb`, `ps`, `pe`, `px`, `py`, `gap`, `column-gap`, `row-gap`, `w`, `h`, `mw`, `mh`, `vw`, `vh`, `min`, `text`, `fs`, `fw`, `lh`, `font`, `fst`, `bg`, `border`, `rounded`, `shadow`, `position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `overflow`, `float`, `object-fit`, `opacity`, `z`, `user-select`, `focus-ring`, `sticky`, `fixed`, `clearfix` |
| `Cross-cutting`          | the `media` conditions (breakpoints, `prefers-reduced-motion`, print), the RTL mechanism (each component's `rtl` differences stay on that component's row with a note that `Cross-cutting` owns the mechanism), `keyframes` as a group, and the `DOMContentLoaded` and `data-bs-*` auto-initialization rows (the `./browser/auto` entry)                                                                                                                                                                                                                                                                                                                                              |
| `Tailwind`               | nothing from the inventory; one row noting the profiles open after Button and Card                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Any component key in `inventory.json` this table omits goes to the family whose members it
resembles, with a `decided by builder` note in the row; never drop it.

**Exclusions, with the reason to record verbatim.**

| Row                                                                                                                                     | Reason                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| every `reboot` selector that combines two or more bare element names through a combinator (`ol ol`, `ul ul`, `legend + *`, `ol ul`, `dl dd`-style rows) with no class | contextual Reboot rule pairing two bare tags; the product decision infers no component from tag combinations |
| `jQueryInterface` and every `$.fn` row                                                                                                  | jQuery integration is outside the compatibility claim                                                                              |
| `window.bootstrap` and the UMD global                                                                                                   | the global namespace is outside the compatibility claim                                                                            |
| every Sass variable, map, and mixin row the documentation lists (`$alert-*`, `button-variant()`, `color-mode()` as a Sass API)          | Bootstrap's Sass source API is outside the compatibility claim; the `data-bs-theme` island behavior it compiles to stays in `U3 Tokens` |
| `popperConfig`, `boundary`, `reference`, `display`, `fallbackPlacements`, `offset` options as Popper pass-through                        | Popper is development-only; the owning unit accepts the key on the wire body and positions through platform anchoring, recorded as an accepted difference |
| `allowList`, `sanitize`, `sanitizeFn` are not excluded                                                                                  | (do not exclude; `Overlays/feedback` owns the Sanitizer)                                                                            |

**Standing conditions.** The ledger names units, never people. `U7 Button` is the first accepted
scope; mark its rows `accepted scope`. Every other row's status is `open`. A row cannot be both
excluded and assigned.

## Scope

**Owned.** `research/obligations.md`, `research/ledger.md`, the new rows in `research.md`.

**Off-limits.** Everything else, including `inventory.json`, both reports, and `plan.md`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Write`, `Edit`. No `Bash`.

## Execution

Perform the assignment directly and spawn nothing.

1. **`obligations.md`.** Open with the sources (both report paths, the Grok session id, the
   date `2026-09-20`, the Bootstrap version). Then one `##` section per component in this order:
   `Cross-cutting engine`, `Alert`, `Button`, `Carousel`, `Collapse`, `Dropdown`, `Modal`,
   `Offcanvas`, `Popover`, `ScrollSpy`, `Tab`, `Toast`, `Tooltip`, `Color modes`, `Reboot`, then
   `## Utilities` with one `###` per utility module. In each section one table
   `Obligation | Kind | Source | Documentation` merging the two distillates: a row that both
   readings state carries both citations; a row only the source states carries `—` under
   Documentation; a row only the documentation states carries `—` under Source. Keep the
   `Kind` vocabulary of the source reading (`attribute`, `option`, `method`, `event`, `keyboard`,
   `dismissal`, `transition`, `initialization`) and add `accessibility` and `variable` from the
   documentation reading. Do not paraphrase away a default value or a type.
2. **`ledger.md`.** Open with the sources and the unit table above (copy it). Then
   `## CSS rows`: one table `Root | Selectors | Declarations | Custom properties | Keyframes | Media | RTL rows | Unit | Status | Note`
   with one row per `components` key of `inventory.json`, values from `counts` and the length of
   the component's `rtl` list, sorted by unit then root. Then `## Token rows`: one row per
   `root` variable and one per `dark` retune, `Variable | Scope | Unit | Status` (all `U3 Tokens`,
   `open`), grouped by their `--bs-` prefix so the table stays readable. Then
   `## Obligation rows`: one row per obligation in `obligations.md`,
   `Component | Obligation | Kind | Unit | Status | Note`. Then `## Exclusions`: one row per excluded
   item, `Row | Reason`, listing the concrete reboot selectors you excluded by reading the `reboot`
   component's `selectors` and applying the two-bare-tags rule. Then `## Accepted scope`: the rows
   marked for `U7 Button`. Close with `## Unassigned`, which must be an empty table or absent.
3. **`research.md`.** Add rows for `research/inventory.mjs` and `inventory.json`,
   `research/obligations.md`, and `research/ledger.md` in the existing table's shape, each with a
   one-line purpose.

## Output

Your final message is a short list of: the three paths; the row totals per unit and per status as
a table; the excluded reboot selectors as written; any inventory key the unit table omitted and
the family you gave it; and nothing else.

## Deviation contract

Stop and report on an inventory key you cannot place even by resemblance, or on a distillate row
whose `Kind` is outside the vocabulary above. Decide, record, and carry on from table ordering
and the wording of a `Note`.

## Acceptance criteria

1. Every `components` key of `inventory.json` appears exactly once in `## CSS rows`.
2. Every obligation row of `obligations.md` appears exactly once in `## Obligation rows` or
   `## Exclusions`.
3. `## Unassigned` is empty.
4. `research.md` names all three artifacts.

## Review evidence

The three written files; the Orchestrator's cross-check of row totals against `inventory.json`.
