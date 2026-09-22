# B-FORMS terrain brief

Read-only absorption. Do not edit, write, or create any file. Return evidence only — no design, no
recommendation, no raw file dump. Cite every fact as `file:line`, quoting at most one line per
pointer.

Campaign: Veneer (`/home/user/veneer`, HEAD `6e74ec9`), a Bootstrap 5.3.8 baseline. Governing law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/styles.md`, `tests.md`,
`documentation.md`.

The B-FORMS family will add these keys as a Bootstrap 5.3.8 baseline: `form`, `form-control`,
`form-select`, `form-check`, `form-range`, `form-floating`, `input-group`, `was-validated`,
`valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`, `is-valid`, `is-invalid`.

Produce a terrain record with these sections:

A. **The oracle surface per key.** From `/home/user/veneer/tests/fixtures/oracle/inventory.json`
(keyed by component name — read the shape of one entry first and describe it) and
`/home/user/veneer/node_modules/bootstrap/scss/forms/` (`_form-control.scss`, `_form-select.scss`,
`_form-check.scss`, `_form-range.scss`, `_floating-labels.scss`, `_input-group.scss`,
`_validation.scss`, `_labels.scss`, `_form-text.scss`, with `_forms.scss`, `_variables.scss`,
`_variables-dark.scss`, `_maps.scss`, `mixins/_forms.scss`, and the other `mixins/` files as they
apply): every selector, every `--bs-*` custom property the component declares, every SVG data URI
the release embeds (the check, radio, switch, select, and validation icons, with the variable each
comes from), every at-rule condition (media, `prefers-reduced-motion`, `[data-bs-theme=dark]`), and
the Sass variables and mixins it depends on. Name the rows the inventory's `rtl` fields carry and
mark them excluded (no right-to-left support in this campaign). Name every `:disabled`,
`[readonly]`, `:focus`, `:checked`, `:indeterminate`, `::placeholder`, `::file-selector-button`,
`::-webkit-*` and `::-moz-*` pseudo the release styles, per key.

B. **Veneer's pattern for a shipped component.** Read
`/home/user/veneer/src/styles/components/_button.scss` and `_table.scss` with
`/home/user/veneer/tests/src/styles/components/button.test.ts` and `table.test.ts`, the showcase
sections under `/home/user/veneer/app/browser/sections/`, `/home/user/veneer/app/browser/constants.ts`,
`/home/user/veneer/src/styles/index.scss` and `src/styles/_tokens.scss`, the readers
`collectShippedComponents` and `readOracleInventory` in `/home/user/veneer/tests/setupServer.ts`,
`/home/user/veneer/tests/conformance.test.ts`, and `/home/user/veneer/guides/veneer.md`
(§ Compatibility rows, § Departures for `btn` and `table`). Also read the accounting shape that
lands next from the uncommitted worktree `/home/user/veneer-f5b`: `collectLedger`, `Addition`,
`scanLedgerDrift`, `readDepartures`, and `readAdditions` in `/home/user/veneer-f5b/tests/setupServer.ts`,
and the per-component ledger tables (in `/home/user/veneer-f5b/guides/veneer.md` § Departures and
§ Additions, or under `/home/user/veneer-f5b/guides/ledger/` if that directory exists). Record how
a component key becomes: a partial, a layer placement, a proof, a showcase section and specimen
constants, a guide row set, a ledger row set, and a conformance entry — each with the exact symbol
and file the next unit copies from.

C. **What already ships from the family.** Grep `/home/user/veneer/src/styles` and
`/home/user/veneer/dist/src/styles/index.css` (if present) for each B-FORMS key's class selectors and
`--bs-form-*` / `--bs-<key>` tokens, and for the form-related element rules Veneer's `elements`
layer already carries (`input`, `select`, `textarea`, `label`, `fieldset`, `legend`, `button`,
`[type=range]`, `::file-selector-button`, the calendar-picker rule); report each key as shipped,
partial, or absent, with file and line, and name which release declarations the elements layer
already covers so the component partial must not restate them.

D. **Elements and Mailbox learnings.** In `/home/user/elements` and `/home/user/mailbox`, list the
files that style, test, or capture a text input, select, checkbox, radio, switch, range, floating
label, input group, or validation state (`src/styles/components/` partials named `_input`, `_field`,
`_select`, `_check`, `_switch`, `_form*` are known starting points), and distil what each proves or
renders that the Veneer unit must match or consciously depart from, one line each with the pointer.
Name any SVG-icon handling (how a data URI is tokenized, where its colour comes from, how dark mode
changes it) those trees settled.

E. **Sizing.** For each key, the count of selectors and declarations in the inventory entry, and
the mechanisms the family splits along (text controls, selects, checks and switches, range,
floating labels, input groups, validation), so the Orchestrator can split the family into units by
mechanism.

Capture `git -C /home/user/veneer status --porcelain` before and after; it prints nothing on a
clean tree, and you must leave it that way. Do not touch `/home/user/veneer-f5b`'s status either.
