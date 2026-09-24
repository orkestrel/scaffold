# BCF round 4 report — the navbar's derived infixes and the containment remarks

B-g and B-h are closed, and every gate the brief names exits 0. The navbar selector case reddens on an
added infix. The guide does not change, so the `bcf-shared-2.patch` file stands. Nothing is committed.

## B-g: the navbar selector case derives its infixes

- **Change.** The render case in the `tests/app/browser/sections/NavbarSection.test.ts` file derives
  its infixes from the `BREAKPOINT_INFIXES` constant in the `tests/setupStyles.ts` file, and keeps the
  bare `.navbar-expand` entry through the empty infix.
  - Before: `...['', '-sm', '-md', '-lg', '-xl', '-xxl'].flatMap((infix) => [`
  - After: `...['', ...BREAKPOINT_INFIXES.map((step) => `-${step}`)].flatMap((infix) => [`
  - The import line takes the `BREAKPOINT_INFIXES` constant beside the `NAVBAR_SELECTORS` constant.
- **Red run `navbar-infix-added`.** An infix is added at the use site:
  `[...BREAKPOINT_INFIXES, 'xxxl'].map(…)`.
  - Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts`
  - Result: exit 1, `Tests 1 failed | 27 passed (28)`.
  - Only the case "renders every navbar form and every state set in markup through the shared
    section contract" reddens. It reads the `.navbar-expand-xxxl` selector as unrendered.
  - The site, command, exit, summary, and failing case are in the `.orkestrel/veneer/units/bcf-instruments/bcf-mutations-4.log.txt`
    file. The whole output is in the `bcf-mutation-4-navbar-infix-added.log.txt` file, and the runner
    is the `bcf-mutate-4.py` file.

## B-h: the `MenuContainment` remarks cover both kinds of menu

The remarks on the `MenuContainment` interface in the `tests/setupBrowser.ts` file changed. The
helper's code did not.

- Before: "A capture frame is shot on a specimen's own box, and a shown menu is positioned out of flow,
  so it adds nothing to that box: a menu reaching past any edge of its specimen is cropped out of the
  frame that claims to show it. Each entry is the label of the specimen holding the menu, once per
  menu."
- After: "A capture frame is shot on a specimen's own box. A shown menu positioned out of flow adds
  nothing to that box and can reach past any edge of it, where the frame that claims to show the menu
  crops it. A shown menu in flow grows the box that holds it. The helper measures both kinds the same
  way, against the specimen's box as laid out. Each entry is the label of the specimen holding the
  menu, one entry per menu."

This change is prose only, so it has no red run. The round-2 mutations `helper-menu-spilled` and
`helper-empty-population` bind the helper's behaviour, and the round-3 cascade reading measures an
in-flow menu growing its specimen.

## Gates

Every command ran from the `.orkestrel/veneer/units/bcf-instruments/bcf-gates-4.sh` file after the last source edit and after the
mutation restore. The summary is in the `bcf-gates-4.log.txt` file, and each command's whole output
is in its `bcf-gates-4-<step>.log.txt` file.

- `npx oxfmt --config .oxfmtrc.json --check tests/app/browser/sections/NavbarSection.test.ts tests/setupBrowser.ts`:
  exit 0, "All matched files use the correct format."
- `npm run lint:check`: exit 0. The runner prints no summary line.
- `npm run check`: exit 0. The runner prints no summary line.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts`:
  exit 0, `Test Files 5 passed (5)`, `Tests 28 passed (28)`.
- `npm run test:setup:browser`: exit 0, `Test Files 1 passed (1)`, `Tests 75 passed (75)`.

No run showed a timing failure.

## Files

- **This round's edits:** the selector case and its import in the
  `tests/app/browser/sections/NavbarSection.test.ts` file, and the `MenuContainment` remarks in the
  `tests/setupBrowser.ts` file.
- **Records under `/home/user/veneer-bcf/tmp/units/`:**
  - `bcf-4.diff`, the whole diff against `f4e5693` with rounds 2 to 4 together;
  - `bcf-4-status.txt`;
  - `bcf-mutations-4.log.txt`, with the `bcf-mutate-4.py` runner;
  - `bcf-gates-4.sh` and `bcf-gates-4.log.txt`;
  - `bcf-report-4.md`.
- **The shared patch that stands:** `bcf-shared-2.patch`.

## Deviation state

No stop. The wording of the remarks and the form of the derived list were settled within scope.
