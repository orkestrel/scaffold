# Unit U4a-inventory — the Bootstrap CSS inventory instrument

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You write one file and nothing else.

## Objective

Write `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.mjs`, a Node
instrument that parses the installed official `bootstrap.css` and `bootstrap.rtl.css` with
`postcss` and writes `research/inventory.json`: every selector, custom property, keyframe, and
media condition, grouped by component through its class-root prefix, the complete `:root`
variable list including the `-rgb` triplets and the `[data-bs-theme=dark]` retunes, and the RTL
differences per component. The Orchestrator runs it; you do not.

## Context

**Evidence.** The stylesheets are
`C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/dist/css/bootstrap.css` and
`C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/dist/css/bootstrap.rtl.css`, version
`5.3.8` per `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/package.json`. `postcss`
is installed in Veneer at `C:/Users/mikes/WebstormProjects/veneer/node_modules/postcss/`; import it
as `file:///C:/Users/mikes/WebstormProjects/veneer/node_modules/postcss/lib/postcss.mjs` (the
Orchestrator confirms the path before dispatch; if `Glob` cannot find it, report the listing of
`node_modules/postcss/lib/` and stop). The retained CSSOM instrument
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/instruments/cssom-probe.mjs`
shows the import and path forms this host supports.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Non-negotiable rules and § Design
laws for the module's shape (no `any`, no `as`, no nested function declarations beyond an
anonymous callback passed as an argument); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/portability.md`
for paths. The file is a research instrument, not package source: it may hold several top-level
functions and constants.

**Host.** Windows; run from the scaffold checkout with `node .orkestrel/veneer/research/inventory.mjs`.
Write the output to `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.json`.

**Component grouping.** Bootstrap's class roots are the first segment of each class name before a
`-`: `btn`, `dropdown`, `modal`, `offcanvas`, `nav`, `navbar`, `card`, `accordion`, `alert`,
`badge`, `breadcrumb`, `carousel`, `collapse` (with `collapsing`), `list-group`, `pagination`,
`placeholder`, `progress`, `spinner`, `toast`, `tooltip`, `popover`, `form` (with `form-control`,
`form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `was-validated`,
`valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`, `is-valid`,
`is-invalid`), `btn-group`, `btn-toolbar`, `close` (`btn-close`), `table`, `figure`, `img`,
`ratio`, `visually-hidden`, `stretched-link`, `text-truncate`, `vr`, `container`, `row`, `col`,
`g` (gutters), `d` (display), `flex`, `justify-content`, `align-items`, `align-self`, `order`,
`m`, `p`, `mt`, `mb`, `ms`, `me`, `mx`, `my`, `pt`, `pb`, `ps`, `pe`, `px`, `py`, `w`, `h`, `mw`,
`mh`, `vw`, `vh`, `text`, `fs`, `fw`, `lh`, `font`, `bg`, `border`, `rounded`, `shadow`,
`position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `overflow`, `float`, `object-fit`,
`opacity`, `z`, `user-select`, `pe` (pointer events, `pe-none`, `pe-auto`), `link`, `icon-link`,
`focus-ring`, `sticky`, `fixed`, `clearfix`, `lead`, `display` (`display-1` through `display-6`),
`blockquote`, `initialism`, `mark`, `small`, `h1` through `h6`, `list-unstyled`, `list-inline`. Put a
selector under every root it names (a selector naming `.btn` and `.dropdown-toggle` appears under
`btn` and under `dropdown`); put an element-only selector (`body`, `h1`, `button`, `[type=button]`,
`::selection`) under `reboot`; put a `:root` or `[data-bs-theme]` rule under `theme`; put a
`@keyframes` rule under its animation name's root (`spinner-border` under `spinner`,
`progress-bar-stripes` under `progress`, `placeholder-glow` under `placeholder`, `placeholder-wave`
under `placeholder`). Record any selector that matches no rule as `unassigned` rather than guessing.

## Unknowns

- Whether `postcss` parses `bootstrap.css` with no plugin; report the parser error verbatim if it
  does not.

## Scope

**Owned.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.mjs`.

**Shared (report-only).** none.

**Off-limits.** Everything else. Do not run the instrument; do not edit any package.

**What asserts the state this change ends.** Nothing yet; the Orchestrator's run produces
`inventory.json` and the plan's ledger consumes it.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Write` for the one file. No `Bash`.

## Execution

Perform the assignment directly and spawn nothing. Write the instrument so that it:

1. Reads the Bootstrap version from `node_modules/bootstrap/package.json` and the sha256 of each
   stylesheet, and records them at the top of the output.
2. Walks every rule with `postcss`'s `root.walkRules`, `walkAtRules`, and `walkDecls`: for each
   rule, the selector list split on top-level commas, each selector's class names, element names,
   attribute selectors, pseudo-classes, and pseudo-elements, its declarations as property and value,
   the enclosing `@media`, `@supports`, `@container`, or `@layer` condition, and the component
   roots it belongs to under the grouping rule.
3. Collects every custom property declaration (`--bs-*`) with its value and its selector, with the
   `:root` list, the `[data-bs-theme=dark]` list, and every component-scoped list separated; and
   every custom property reference (`var(--bs-*)`) with the property that consumes it.
4. Collects every `@keyframes` rule with its steps and every media condition string, deduplicated.
5. Repeats the walk for `bootstrap.rtl.css` and records, per component, the declarations that
   differ between the two (property, LTR value, RTL value, selector).
6. Writes `inventory.json` as one object: `version`, `digests`, `components` (keyed by root: the
   selectors, declarations, custom properties, keyframes, media conditions, and RTL differences for
   that root), `root` (the `:root` variable list), `dark` (the `[data-bs-theme=dark]` retunes),
   `references` (custom property to consuming properties), `keyframes`, `media`, `unassigned`, and
   `counts` (selectors, declarations, custom properties, keyframes, media conditions per component).
7. Prints one line per component with its selector count, then the unassigned count, and exits
   non-zero only when a stylesheet is missing or fails to parse.

Keep the root list, the reboot element set, and the theme selector set as frozen top-level
constants.

## Output

Your final message is a short list of: the file path; the root, reboot, and theme constants as
written; and any grouping decision you took that the rule above did not settle; and nothing else.

## Deviation contract

Stop and report on a `postcss` entry you cannot find. Decide, record, and carry on from the JSON
layout details, the selector-splitting method, and how you name a root the list omits.

## Acceptance criteria

1. The file parses: `node --check` succeeds (the Orchestrator runs it).
2. The constants named above are top-level and frozen.
3. The Orchestrator's run writes `inventory.json` with every key named in step 6.

## Review evidence

The written file; the Orchestrator's first run and its `inventory.json`.
