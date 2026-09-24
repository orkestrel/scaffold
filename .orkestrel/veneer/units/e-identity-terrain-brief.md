# Unit E-IDENTITY-TERRAIN — the element and table departures E-IDENTITY still rules

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and returns the journal
path, the session id, and Grok's answer. Grok performs the reading itself and spawns nothing.

## Objective

For each site below, state what Bootstrap 5.3.8 ships, what Veneer ships, what the Elements identity ships, which
Veneer guide row records the difference, and which Veneer test pins the Veneer value, so the design round can rule
which departures stay.

## Context

**Evidence.** Veneer checkout `/home/user/veneer-read` (detached at Veneer `main` `b1d314d`): source `src/styles/`, guide
`guides/veneer.md` (its departure and addition tables), tests `tests/src/styles/`. Bootstrap 5.3.8 at
`/home/user/veneer-read/node_modules/bootstrap/` (`scss/_reboot.scss`, `scss/_type.scss`, `scss/_tables.scss`,
`scss/forms/_form-check.scss`, `scss/_variables.scss`, and `dist/css/bootstrap.css`). Elements checkout
`/home/user/elements` (`src/styles/`).

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `grep` only. Write nothing.

## Unknowns

None.

## Scope

Read-only. Write nothing.

## Execution

Answer with `file:line` citations and no raw dumps, one section per site:

1. **Table stripe.** `--bs-table-striped-bg` and the `--vn-state-stripe` token it reads (Veneer
   `src/styles/components/_table.scss`), the token's light and dark values and where they are declared, Bootstrap's
   `$table-striped-bg-factor` and compiled value, the stripe the table proof in
   `tests/src/styles/components/table.test.ts` pins, and every guide row that states a stripe value.
2. **`dl`, `dt`, `dd`.** Every declaration Veneer writes (`src/styles/elements/_dl.scss`) against Bootstrap's reboot
   declarations for the same selectors.
3. **`blockquote`.** Veneer `_blockquote.scss` against Bootstrap's reboot and `.blockquote` type rules.
4. **`code`, `pre`, `kbd`, `samp`.** Veneer `_code.scss`, `_pre.scss`, `_kbd.scss`, `_samp.scss` against Bootstrap's
   reboot.
5. **`hr`.** Veneer `_hr.scss` against Bootstrap's reboot `hr`, value by value.
6. **`.btn-check`.** Veneer's hiding declarations for `.btn-check` against Bootstrap's
   (`scss/forms/_form-check.scss`).

For each site end with one line: "Departure recorded: yes (`guides/veneer.md:LINE`) or no", "Pinned by:
`file:line` or none", and "Elements: its value with `file:line`, or none".

## Output

The sections in order, each a short table of property, Bootstrap value, Veneer value, Elements value, and citations,
then the three closing lines. Under 1200 words. No recommendations.
