# BCF round 3 report — the collapsed bar's in-flow menu and the release's static placement attribute

R5 and R6 are closed in the files this round owns, `app/browser/constants.ts` and
`tests/app/browser/sections/NavbarSection.test.ts`. Every gate the brief names exits 0. Each added case
ran red first. No guide sentence goes false, so the `bcf-shared-2.patch` file stands, and there is no
`bcf-shared-3.patch` file. Round 2's files are untouched. Nothing is committed.

## R6 — the release's static placement attribute

- **Change.** The shown menu in the `Navbar opened` specimen carries the `data-bs-popper="static"`
  attribute. The release's dropdown script writes that attribute in its `this._inNavbar` branch
  (`Manipulator.setDataAttribute(this._menu, 'popper', 'static')` in
  `node_modules/bootstrap/js/src/dropdown.js`, around line 314). With it, every shown menu in the
  `NAVBAR_SPECIMENS` table carries the attribute: the `Navbar opened` menu and the
  `Navbar hanging menu` menu.
- **TSDoc.** The `NAVBAR_SPECIMENS` remarks record that every shown menu carries the attribute, and that
  the placement rule moves the opened bar's in-flow menu down by the spacer gap alone. The sentence
  that the audit found contradicting the `Navbar opened` specimen is replaced.
- **Proof.** The case "marks every shown menu in a bar with the static placement attribute the
  dropdown script writes" was added to the `NavbarSection.test.ts` file.
  - Its population is the `NAVBAR_SPECIMENS` rows whose markup opens a menu, and the case asserts
    that population is non-empty.
  - It asserts that the menus it reads come from exactly those specimens, and that each carries the
    `static` value.
- **Red run before the fix.** The section command in the Gates section ran with the case added and
  the constants file unchanged. Result: exit 1, `Tests 1 failed | 27 passed (28)`. The case reads
  `{ name: 'Navbar opened', placement: null }`. Evidence: the `bcf-3-red-before-fix.log.txt` file.
- **Mutation `r6-opened-menu-attribute-dropped`.** The attribute is removed from the `Navbar opened`
  menu. Only this case reddens, with exit 1 and `Tests 1 failed | 27 passed (28)`.
- **Cascade reading.** The browser read the `Navbar opened` menu before and after the fix, at the
  `app:browser` project's default 414-pixel viewport. A bar with no expansion class is collapsed at
  every width. Evidence: the `bcf-3-cascade.log.txt` file, which holds the before and after readings and the
  instrument.

| Reading | Before (no attribute) | After (`data-bs-popper="static"`) |
| --- | --- | --- |
| `position` | `static` | `static` |
| `top` | `auto` | `100%` |
| `left` | `auto` | `0px` |
| `margin-top` | `0px` | `2px` (the `--bs-dropdown-spacer` value) |
| Gap from the toggle's bottom to the menu's top | 0 px | 2 px |
| Specimen height | 307 px | 309 px |

The `.dropdown-menu[data-bs-popper]` rule's `top` and `left` values take no effect on a static menu.
Its `margin-top` value moves the menu down by the spacer gap and grows the specimen by that gap.

- **Stop-condition check.** The resting-key journey case ran alone against the changed specimen. It
  compares each `CASCADE_KEYS` row's declared property and reads each copy's pointer entry. The
  `navbar-opened` row reads `display` on the `.navbar-collapse.show` selector.
  - Command: `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-390* -t 'reads every resting cascade key'`.
  - Result: exit 0, `Tests 1 passed | 45 skipped (46)`, in the `bcf-3-resting-dark-390.log.txt` file.
  - No proof reddens on the 2-pixel move, so the stop condition does not fire. The frame's pixels
    are the Orchestrator's capture observation at landing.

## R5 — the collapsed bar's in-flow menu

- **Proof.** The case "keeps every open menu in a bar without an expansion class in the flow of its
  column" was added to the `NavbarSection.test.ts` file.
  - It iterates the `NAVBAR_SPECIMENS` table and reads every shown menu whose `.navbar` element
    carries no class opening with `navbar-expand`.
  - It asserts that population is non-empty, and that each menu's computed `position` value is
    `static`, as the release's `.navbar-nav .dropdown-menu` rule writes.
- **Red run.** The `r5-opened-menu-absolute` mutation adds the `position-absolute` class to the
  `Navbar opened` menu. The case reddens, reading `{ name: 'Navbar opened', position: 'absolute' }`.
  The room case at the 390 and 1280 widths reddens with it, with exit 1 and
  `Tests 3 failed | 25 passed (28)`.
- **Comment.** The comment in the render case states what the following cases read.
  - Before: "An open menu lies in a collapsed bar's column or hangs from an expanded bar's row, and
    the following cases read where each one lands."
  - After: "The following cases read the static placement attribute on every open menu, the in-flow
    position of each open menu in a bar carrying no expansion class, the out-of-flow position of the
    open menu in the always-expanded bar, and the room each specimen keeps for its open menus."
- **Hang-case comment.** The comment above the hang case no longer restates the attribute claim.
  - Before: "The dropdown script writes the static placement attribute on a menu inside a bar, so
    the menu opens under its toggle through the stylesheet alone."
  - After: "The menu carries the static placement attribute, so it opens under its toggle through the
    stylesheet alone."

The `bcf-mutations-3.log.txt` file holds every mutation's site, command, exit, summary, and failing
cases. The runner is the `bcf-mutate-3.py` file, and each run's whole output is in its
`bcf-mutation-3-<name>.log.txt` file.

## Gates

Every command ran from the `.orkestrel/veneer/units/bcf-instruments/bcf-gates-3.sh` file after the last source edit and after
every mutation restore. The summary is in the `bcf-gates-3.log.txt` file, and each command's whole
output is in its `bcf-gates-3-<step>.log.txt` file.

- `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts`
  — exit 0, "All matched files use the correct format."
- `npm run lint:check` — exit 0. The runner prints no summary line.
- `npm run check` — exit 0. The runner prints no summary line.
- `npm run test:setup` — exit 0, `Test Files 4 passed (4)`, `Tests 299 passed (299)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts`
  — exit 0, `Test Files 5 passed (5)`, `Tests 28 passed (28)`.
- `npm run test:guides` did not run, because the guide does not change. I searched the guide for
  `data-bs-popper`, `placement attribute`, `spacer`, and `opened bar`. No sentence claims that a
  navbar menu lacks the attribute, and the collapsed-bar sentence ("opens in the column's flow and
  pushes the links after it down") stays true.

No run showed a timing failure.

## Files

- **This round's edits:** `app/browser/constants.ts` (the `Navbar opened` menu's attribute and the
  `NAVBAR_SPECIMENS` remarks) and `tests/app/browser/sections/NavbarSection.test.ts` (the added cases
  and the rewritten comments). No other file changed, and no named case in another file went false.
- **Records under `/home/user/veneer-bcf/tmp/units/`:**
  - `bcf-3.diff`, the whole diff against `f4e5693` with rounds 2 and 3 together;
  - `bcf-3-status.txt`;
  - `bcf-mutations-3.log.txt` and `bcf-mutate-3.py`;
  - `bcf-3-red-before-fix.log.txt`;
  - `bcf-3-cascade.log.txt`;
  - `bcf-3-resting-dark-390.log.txt`;
  - `bcf-gates-3.sh` and `bcf-gates-3.log.txt`;
  - `bcf-report-3.md`.
- **The patch that stands:** `bcf-shared-2.patch`.
- **The `tmp/probe/` directory** holds nothing of this unit.

## Deviation state

No stop. These choices are settled within scope:

- the case titles;
- the added cases, which sit before the hang case;
- the wording of each rewritten comment;
- the `position-absolute` utility class as the R5 mutation's way of making the menu absolute.
