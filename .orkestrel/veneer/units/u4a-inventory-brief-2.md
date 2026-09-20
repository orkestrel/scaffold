# Unit U4a-inventory — successor brief 2

## What this supersedes

This brief supersedes `u4a-inventory-brief.md`, which stays in place unedited. Every
section of that brief stands except where this file amends it. The same role and engine apply:
`builder` on native Sonnet, performing the assignment directly and spawning nothing, writing only
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/inventory.mjs`.

## Why a successor

The Orchestrator ran the instrument on 2026-09-20 (`u4a-inventory-run.log.txt`). It
parsed both stylesheets, wrote `inventory.json` with every key, and reported `unassigned: 326`.
Reading those selectors shows they fall into named gaps in the grouping constants rather than
into genuinely unassignable rules:

| Selectors                                                                                             | Count | Missing root or rule                                          |
| ----------------------------------------------------------------------------------------------------- | ----- | ------------------------------------------------------------- |
| `.offset-*` (grid column offsets, responsive)                                                         | 71    | root `offset`                                                 |
| `.align-content-*` (responsive) and `.align-baseline`, `.align-top`, `.align-middle`, `.align-bottom`, `.align-text-top`, `.align-text-bottom` | 42 | roots `align-content` and `align` |
| `.gx-*`, `.gy-*` (responsive gutters)                                                                 | 72    | roots `gx` and `gy`                                           |
| `.gap-*`, `.column-gap-*`, `.row-gap-*` (responsive)                                                  | 72    | roots `gap`, `column-gap`, `row-gap`                          |
| `h1` … `h6`, `thead`, `tbody`, `tfoot`, `tr`, `output`, `*::before`, `*::after`, `abbr[title]`, `a:not([href]):not([class])`, `[type=button]`, `[type=reset]`, `[type=submit]`, `[type=search]`, `[role=button]`, `[hidden]`, `[list]:not([type=date])…` | 30 | the reboot rule must catch every selector with no class name |
| `.page-item`, `.page-link`, `.active > .page-link`                                                    | 9     | root `page`, grouped under `pagination`                       |
| `[data-bs-theme=light]`                                                                               | 3     | theme selector `[data-bs-theme=light]` and its quoted form    |
| `.fade`, `.fade:not(.show)`                                                                           | 2     | root `fade`, grouped under `transition`                       |
| `.dropup`, `.dropend`, `.dropstart`                                                                   | 4     | roots grouped under `dropdown`                                |
| `.tab-content`, `.tab-pane`                                                                           | 2     | root `tab`, grouped under `nav`                               |
| `.min-vw-100`, `.min-vh-100`                                                                          | 2     | root `min`                                                    |
| `.fst-italic`, `.fst-normal`                                                                          | 2     | root `fst`                                                    |
| `.caption-top`                                                                                        | 1     | root `caption`, grouped under `table`                         |

## Amended execution

1. Add the roots the table names. Where the table says "grouped under", record the selector under
   that existing component key rather than creating a new key: `page` → `pagination`, `fade` →
   `transition` (a new key for the `.fade` and `.collapsing`-free transition helpers), `dropup`,
   `dropend`, `dropstart` → `dropdown`, `tab` → `nav`, `caption` → `table`. Keep a frozen alias map
   for those groupings beside `ROOTS`.
2. Change the reboot rule so that every selector whose parsed class list is empty and that is not
   a theme selector lands under `reboot`, whatever elements, attributes, or pseudo-selectors it
   carries. `REBOOT_ELEMENTS` may stay as documentation of the elements Bootstrap's reboot names,
   but the rule no longer depends on it.
3. Add `[data-bs-theme=light]` and `[data-bs-theme="light"]` to `THEME_SELECTORS`.
4. Keep everything else as it is, including the output layout, the digests, and the exit rules.

## Amended acceptance criteria

1. `node --check` succeeds (the Orchestrator runs it).
2. The Orchestrator's run reports `unassigned: 0`. If a selector remains that no rule in this brief
   covers, name it in your final message with the root you would add, and stop there rather than
   inventing a rule.

## Output

Your final message is a short list of: the file path; the roots and alias map you added; the reboot
rule as written; and any selector you expect to remain unassigned, with your reasoning; and
nothing else.
