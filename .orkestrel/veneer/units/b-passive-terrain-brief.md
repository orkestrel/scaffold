# B-PASSIVE terrain brief

Read-only absorption. Do not edit, write, or create any file. Return evidence only — no design, no
recommendation, no raw file dump. Cite every fact as `file:line`, quoting at most one line per
pointer.

Campaign: Veneer (`/home/user/veneer`), a Bootstrap 5.3.8 baseline. Governing law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/styles.md`, `tests.md`,
`documentation.md`.

The B-PASSIVE unit will add these keys as a Bootstrap 5.3.8 baseline: `btn-close`, `badge`,
`breadcrumb`, `btn-group`, `btn-toolbar`, `card`, `list-group`, `pagination`, `placeholder`,
`progress`, `spinner`.

Produce a terrain record with these sections:

A. **The oracle surface per key.** From `/home/user/veneer/tests/fixtures/oracle/inventory.json`
(135 components keyed by name — read the shape of one entry first and describe it) and
`/home/user/veneer/node_modules/bootstrap/scss/` (`_close.scss`, `_badge.scss`, `_breadcrumb.scss`,
`_button-group.scss`, `_card.scss`, `_list-group.scss`, `_pagination.scss`, `_placeholders.scss`,
`_progress.scss`, `_spinners.scss`, with `_variables.scss`, `_variables-dark.scss`, `_maps.scss`,
and `mixins/` as they apply): every selector, every `--bs-*` custom property the component
declares, every keyframe, every at-rule condition (media, `prefers-reduced-motion`,
`[data-bs-theme=dark]`), and the Sass variables and mixins it depends on. Name the rows the
inventory's `rtl` fields carry and mark them excluded (no right-to-left support in this campaign).

B. **Veneer's pattern for a shipped component.** Read
`/home/user/veneer/src/styles/components/_button.scss` and `_table.scss` with
`/home/user/veneer/tests/src/styles/components/button.test.ts` and `table.test.ts`, the showcase
sections `/home/user/veneer/app/browser/sections/ButtonSection.ts` and `TableSection.ts`,
`/home/user/veneer/app/browser/constants.ts`, `/home/user/veneer/src/styles/index.scss` and
`src/styles/_tokens.scss`, the readers `collectShippedComponents` and `readOracleInventory` in
`/home/user/veneer/tests/setupServer.ts`, `/home/user/veneer/tests/conformance.test.ts`, and
`/home/user/veneer/guides/veneer.md` (§ Bootstrap family rows, § Compatibility rows, § Departures
from Bootstrap for `btn` and `table`). Record how a component key becomes: a partial, a layer
placement, a proof, a showcase section and specimen constants, a guide row set, and a conformance
entry — each with the exact symbol and file the next unit copies from.

C. **What already ships from the family.** Grep `/home/user/veneer/src/styles` and
`/home/user/veneer/dist` (if present) for each B-PASSIVE key's class selectors and `--bs-<key>`
tokens; report each key as shipped, partial, or absent, with file and line.

D. **Elements and Mailbox learnings.** In `/home/user/elements` and `/home/user/mailbox`, list the
files that style, test, or capture a badge, card, list group, breadcrumb, pagination, progress,
spinner, placeholder, close button, or button group (`src/styles/components/_badge.scss`,
`_avatar.scss`, `_dot.scss` in Elements are known starting points), and distil what each proves or
renders that the Veneer unit must match or consciously depart from, one line each with the pointer.

E. **Sizing.** For each key, the count of selectors and declarations in the inventory entry, so the
Orchestrator can split the family into units by mechanism.

Capture `git -C /home/user/veneer status --porcelain` before and after; it prints nothing on a
clean tree, and you must leave it that way.
