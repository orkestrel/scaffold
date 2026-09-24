# THEME report for rounds 2 and 3 of the `ct` unit: the `b-cross-ct-brief-3.md` brief and the `b-cross-ct-brief-4.md` brief

The THEME test populations the round-1 audit named each live in a setup file or derive from the
population that owns them. The registry rule's added-selector branch has a plant that reddens on
its mutation. The breakpoint alias case proves X8, and the guide's breakpoint token paragraph
states the limit. Round 3 names the controls in the `COLOR_MODE_CONTROLS` constant's TSDoc block,
binds the `tests/setup.ts` file's constant case to its own mutations, and cites the round-1 log
behind each round-1 mutation. Every acceptance gate exits 0 over the round-3 tree. No stop
condition fired: the X8 proof shows the `.d-md-none` declaration holding at its compiled width.

## Round 3 changes

- CONTROL-DOC-TALLY. The TSDoc block of the `COLOR_MODE_CONTROLS` constant names the controls that
  carry a retuned image: the select, the switch, the navbar toggler's icon, and the accordion
  button. The positional wording is absent. This is the only difference between the
  `ct2-shared-2.patch` patch and the `ct2-shared.patch` patch, and the `ct2-shared-2.patch` patch
  supersedes it whole.
- The setup case's mutations. Mutation U1 appends a duplicate of the `'p'` selector to the
  `COLOR_MODE_CONTROLS` list. Mutation U2 drops the `Object.freeze` call from the list. Each
  reddens the `tests/setup.test.ts > shared setup > names each color mode control once, in a frozen list`
  case: under U1 the uniqueness assertion receives 6 where it expects 7, and under U2 the freeze
  assertion receives the `false` value where it expects the `true` value. The logs are the `ct2-mutation-U1.log.txt`
  log and the `ct2-mutation-U2.log.txt` log, and the `ct2-mutations-2.log.txt` log records both.
  Unmutated, the same case passes in gate 12.
- A setup-project run needs the built cascade, because the `tests/setupService.test.ts` suite
  refuses to load without the `dist/src/styles/index.css` file. The unbuilt U1 and U2 runs also
  reddened that suite's import, so they are retained apart as the `ct2-mutation-U1-unbuilt.log.txt`
  log, the `ct2-mutation-U2-unbuilt.log.txt` log, and the `ct2-mutations-2-unbuilt.log.txt` log,
  and are not evidence. The evidence runs follow a `npm run build:src` build in the scratch copy
  (the `ct2-build-copy-2.log.txt` log), and each reddens the named case alone.
- The gate instrument. The `ct2-gates-2.sh` script strips terminal color codes before it reads a
  result line, so its record carries the guides gate's result line that the `ct2-gates.sh` script
  missed.
- Owned files. Round 3 changes no owned file, so the `ct2-2.diff` diff equals the `ct2.diff` diff.

## Populations and their homes

| Population | Test file | Home | Mutations that redden the case reading it |
| --- | --- | --- | --- |
| The `controls` list | The `ColorModeSection.test.ts` file, in the nesting case | The `COLOR_MODE_CONTROLS` constant in the `tests/setup.ts` file, frozen, exported, and documented, with a row in the export list of the `tests/setup.test.ts` file and a case there that holds the list non-empty, unique, and frozen (shared patch) | S3 for the nesting case; U1 and U2 for the setup case |
| The `dark` list | The `conformance.test.ts` file, in the ledger `describe` block | Derived: each declaration of each rule the inventory records under the `theme` key whose selector opens with the `[data-bs-theme=dark] ` prefix. The case also holds the derived properties equal to the `COMPONENT_DARK_ASSETS` constant, a separate record of the same rules (shared patch) | C1, C2 |
| The `retuned` list | The `theme.test.ts` file, in the role tier case | Derived: the roles in the `TOKEN_NAMES.color` group whose `--bs-{role}` fill alias the `THEME_DARK_ADDITIONS` constant lists. That constant records the dark-scope names Veneer adds because its primary and secondary fills retune. The case refuses an empty derivation | M1, D1 |
| The `tiers` list | The `alert.test.ts` file, in the contextual role case | The `THEME_TIER_ALIASES` constant in the `tests/setupStyles.ts` file, frozen, exported, and documented, pairing each tier with its alias suffix (shared patch). The read-back case in the `tests/setupStyles.test.ts` file reads the constant in place of its own copy of the same pairs, and the export list names it | A1 |

The contextual role case in the `alert.test.ts` file filters out the pairs the release writes
alike and asserts on the rest. It keys the release values by alias name through the
`THEME_TIER_ALIASES` constant, builds each pair of this role's alias and another role's alias,
drops a pair whose aliases the release gives the same value, refuses an empty remainder, and
asserts that no remaining pair resolves alike on the island. It carries no nested ternary.

The `tests/setupServer.ts` file carries no edit. The derivation takes the place of the conformance
table, and the remark on the `collectAdditions` function reads true for each branch of the
registry rule.

## The registry plant (R1)

- The case is the `tests/setupServer.test.ts > server setup > records a registry name an added selector declares, and names the planted name beside it`
  case.
- The plant is the `@layer components { .btn-planted { --vn-palette-blue: #0d6efd; --vn-planted: 0 } }`
  sheet, read against the pinned inventory with the `btn` key shipped. The inventory records the
  `.btn-planted` selector nowhere, so the walk takes the added-selector branch. The case holds the
  ledger to the `btn | .btn-planted | — | selector` row and the `btn | --vn-planted | — | property`
  row. With an empty registry the `collectAdditions` function adds the
  `btn | --vn-palette-blue | — | property` row, so the registry is the only reason the canonical
  name is absent.
- Mutation R1 deletes the `if (registry.includes(property)) continue` line from the added-selector
  branch of the `collectAdditions` function. The plant case fails at the ledger assertion and
  receives the extra `btn | --vn-palette-blue | — | property` row. The round-1 registry case,
  titled `records a registry name a recorded selector declares, and names the planted name beside it`
  in this round, passes under the same mutation, which is the gap the round-1 subjective lane's R1
  named (the `ct2-mutation-R1.log.txt` log).
- Under R1 the `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup -t "registry name"`
  command exits 1. Unmutated, the same command exits 0 with the recorded-selector case and the
  added-selector case passing (the `ct2-r1-green.log.txt` log).

## The breakpoint alias proof (X8)

- The case is the `tests/src/styles/tokens.test.ts > token cascade > moves the md breakpoint alias with a token override, and holds the condition the ramp compiled`
  case.
- The case reads the compiled md width, the `768px` value, from the `RETAINED_LENGTH_ALIASES` row
  for the `--vn-breakpoint-md` token. It mounts a `.d-md-none` element and reads the
  `--bs-breakpoint-md` alias and the element's `display` value at a 668px viewport and at an 868px
  viewport, through the `visitBreakpoint` helper. It sets the `--vn-breakpoint-md` token to the
  `968px` value on the document element and takes the same readings.
- Without the override, the readings are the `768px` alias with a `block` display at 668px and the
  `768px` alias with a `none` display at 868px. With the override, they are the `968px` alias with
  a `block` display at 668px and the `968px` alias with a `none` display at 868px. The alias moves
  with the token. The `breakpoint-up(md)` declaration is the control: it holds at 868px, the
  viewport where a condition that followed the token would read a `block` display. The 668px
  reading shows the instrument reaches the condition, because the element reads a `block` display
  there.
- Mutation B1 writes the alias as the compiled width, the
  `--bs-breakpoint-#{$name}: #{map.get(breakpoints(), $name)};` declaration, in the `_tokens.scss`
  partial of the scratch copy. The case fails at the overridden assertion: the alias reads the
  `768px` value where the case expects the `968px` value (the `ct2-mutation-B1.log.txt` log). The
  command is the
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/tokens.test.ts -t "md breakpoint"`
  command, with build exit 0 and test exit 1.
- The breakpoint token paragraph of the guide's § Tokens section, which opens "Veneer keeps
  Bootstrap's breakpoint names verbatim", states that the build compiles the widths into every
  media condition, that a document-scope override of a `--vn-breakpoint-*` token moves the
  `--bs-breakpoint-*` alias and no condition, the measured 968px and 868px example, and the proof
  that reads it (shared patch).

## The round-1 accounts (claims 7 and 8)

The section mutations are S1, S2, and S3, and the export proof is S4. Each retained round-1 log
sits under the `/home/user/scaffold/.orkestrel/veneer/units/ct-instruments/` directory.

- S1 drops the dark island's attribute. The nesting case and the mode case of the
  `ColorModeSection.test.ts` file fail at their mode-sequence assertions (the
  `ct-mutation-S1-dark-attribute.log.txt` log).
- S2 drops the nested island's attribute, with the same failing assertions (the
  `ct-mutation-S2-nested-attribute.log.txt` log).
- S3 drops the nested island's toggler. The nesting case fails at its surface-local membership
  assertion (the `ct-mutation-S3-control-dropped.log.txt` log).
- S4 drops the section's row from the `app/browser/index.ts` barrel. The `ColorModeSection.test.ts`
  suite fails to import, so no section assertion runs. The index proof, the
  `tests/app/browser/index.test.ts > exports the showcase surface…` case, runs and catches the
  missing export (the `ct-mutation-S4-section-unexported.log.txt` log). S4 proves the export, not
  the section.

These round-1 cases fail against the tree without their fix, as their red logs show:

- The role tier case, the secondary case, and the light and dark link cases of the
  `theme.test.ts` file (the `ct-red-theme.log.txt` log).
- The V13 tier case and the light-mode and dark-mode alert contrast cases of the `theme.test.ts`
  file (the `ct-v13-red-theme.log.txt` log).
- The registry case for a recorded selector in the `setupServer.test.ts` file (the
  `ct-red-x3.log.txt` log).

These round-1 cases are bound by a named mutation instead:

- The nested-island case of the `theme.test.ts` file, for the names the light scope leaves to the
  document scope, passes against the tree without the round-1 fix, because the cascade meets its
  claim there (the `ct-red-theme.log.txt` log). M5 makes the dark scope declare the
  `--bs-border-radius` property and reddens it (the `ct-mutation-M5-dark-redeclares.log.txt` log).
- The theme presence, dark-rule plant, and ledger cases of the `conformance.test.ts` file, by M7,
  which removes the `theme` compatibility row (the `ct-mutation-M7-theme-withheld.log.txt` log).
- The section cases of the `ColorModeSection.test.ts` file, by S1, S2, and S3.
- The export in the `index.test.ts` file, by S4.

The cases rounds 2 and 3 add are each bound by a named mutation. Each proves a rule the tree
carries, so no tree without a fix exists to run it red against:

- The added-selector registry case, by R1.
- The md breakpoint alias case, by B1.
- The color mode control case in the `tests/setup.test.ts` file, by U1 and U2.

## Mutation log

The `ct2-mutate.py` script and its successor, the `ct2-mutate-2.py` script, apply each mutation to
a file in the scratch copy, rebuild the styles where the file is a partial, run the command, and
write the file's own bytes back with a digest check. The `ct2-mutations.log.txt` log (mutations R1 to
S3) and the `ct2-mutations-2.log.txt` log (U1 and U2) record the site, the command, the build and
test exits, the summary line, and the failing and passing case names. Each red run's full output
is its `ct2-mutation-<id>.log.txt` log. Every mutation's test exit is 1, and every digest check
passes.

| Id | Site | Failing case |
| --- | --- | --- |
| R1 | The `collectAdditions` function in the `tests/setupServer.ts` file, without the registry check in the added-selector branch | The `records a registry name an added selector declares…` case |
| B1 | The `_tokens.scss` partial, with the `--bs-breakpoint-*` alias written as the compiled width | The `moves the md breakpoint alias with a token override…` case |
| M1 | The `$dark` map in the `_tokens.scss` partial, with the `secondary` entry and the `secondary-rgb` entry set to the light slate | The `resolves every role tier and the body tokens per island over nested modes` case |
| D1 | The `THEME_DARK_ADDITIONS` constant in the `tests/setupStyles.ts` file, without the `--bs-secondary` row | The `resolves every role tier…` case, at the `--vn-color-secondary-base` token |
| A1 | The `$dark` map in the `_tokens.scss` partial, with the `dark-border` entry set to the gray-700 step the `light` role's border takes | The `in dark > paints the light alert…` case and the `in dark > paints the dark alert…` case, at the held-apart assertion |
| C1 | The `guides/veneer.md` file, without the `theme` compatibility row | The `measures the dark component rules under the theme key…` case, which receives the `[[], []]` value |
| C2 | The `COMPONENT_DARK_ASSETS` constant in the `tests/setupStyles.ts` file, without the `--bs-navbar-toggler-icon-bg` row | The `measures the dark component rules under the theme key…` case, at the agreement with the derived sites |
| S3 | The `COLOR_MODE_SPECIMENS` constant in the `app/browser/constants.ts` file, without the nested island's navbar toggler | The `nests a dark island in a light surface and a light island in the dark one…` case |
| U1 | The `COLOR_MODE_CONTROLS` constant in the `tests/setup.ts` file, with a duplicate of the `'p'` selector at its end | The `names each color mode control once, in a frozen list` case, at the uniqueness assertion |
| U2 | The `COLOR_MODE_CONTROLS` constant in the `tests/setup.ts` file, without its `Object.freeze` call | The `names each color mode control once, in a frozen list` case, at the freeze assertion |

Under A1 the light-mode alert cases pass. The release gives the `light` role and the `dark` role
the same text emphasis in light mode, and the filter drops that pair alone.

## Gates

The `ct2-gates-2.sh` script runs each gate over the round-3 tree. The `ct2-r3-gates.log.txt` log
records each gate's place, command, exit, and result line, and each full log is its
`ct2-r3-gate-<n>.log.txt` log. The scratch copy is a `git archive ac74459` extract at the
`tmp/probe/ct2-copy` path with a hard-linked `node_modules` directory, an empty `.git` directory,
the `ct2-shared-2.patch` edits, and the owned files. The script's header comment names the
`ct2-shared.patch` patch; the copy carries the `ct2-shared-2.patch` edits. A `diff -rq` comparison
of the copy against a clean extract, excluding the `node_modules`, `dist`, `.git`, and `tmp`
directories, lists only the owned and shared files. A planted `any` type and `debugger` statement
in a copy-only file make the `npm run lint:check` command exit 1 there (the
`ct2-r3-lint-plant.log.txt` log), and the plant file is removed.

| # | Where | Command | Exit | Result line |
| --- | --- | --- | --- | --- |
| 1 | Worktree | The `npx oxfmt --config .oxfmtrc.json --check tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts` command | 0 | The `Finished in 216ms on 6 files using 4 threads.` line |
| 2 | Worktree | The `npm run lint:check` command | 0 | None; the `oxlint` linter prints nothing on a clean run |
| 3 | Scratch copy | The `npx oxfmt --config .oxfmtrc.json --check tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts guides/veneer.md tests/conformance.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts` command | 0 | The `Finished in 18057ms on 12 files using 4 threads.` line |
| 4 | Scratch copy | The `npm run lint:check` command | 0 | None |
| 5 | Scratch copy | The `npm run check` command | 0 | None; the `tsc` compiler and the `vue-tsc` compiler print nothing on a clean run |
| 6 | Scratch copy | The `npm run build:src` command | 0 | The `✓ built in 3.53s` line |
| 7 | Scratch copy | The `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts` command | 0 | The `Tests  73 passed (73)` line |
| 8 | Scratch copy | The `npm run test:setup` command | 0 | The `Tests  304 passed (304)` line |
| 9 | Scratch copy | The `npm run test:conformance` command | 0 | The `Tests  26 passed (26)` line |
| 10 | Scratch copy | The `npm run test:guides` command | 0 | The `Tests  20 passed (20)` line |
| 11 | Scratch copy | The `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts` command | 0 | The `Tests  4 passed (4)` line |
| 12 | Scratch copy | The `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup -t "color mode control"` command | 0 | The `Tests  1 passed \| 303 skipped (304)` line |

The `git apply --check` command passes on the worktree for the `ct2-shared-2.patch` patch. The
scratch copy and the clean extract are removed, and the `tmp/probe/` directory holds nothing the
unit made.

Round 2's setup gate is a timing observation over the round-2 tree. There, the `npm run test:setup`
command exits 1 with the `Tests  1 failed | 303 passed (304)` line, and the
`records and reads official control state and rejects contradicted or absent obligation steps`
case reports the `Error: Test timed out in 10100ms.` error at a load average of 11.68, 12.65, and
12.29 (the `ct2-gate-8.log.txt` log and the `ct2-gate-8b.log.txt` log). That case alone passes in
7342ms (the `ct2-oracle-alone.log.txt` log).
Gate 8 over the round-3 tree exits 0; no load reading is retained for that run.

## Touched files

The unit's owned edits in the worktree, unchanged in round 3:

- The `tests/src/styles/theme.test.ts` file: the role tier case derives its retuned roles from the
  `THEME_DARK_ADDITIONS` constant and refuses an empty derivation.
- The `tests/src/styles/tokens.test.ts` file: the md breakpoint alias case, with the import of the
  `visitBreakpoint` helper.
- The `tests/src/styles/components/alert.test.ts` file: the contextual role case reads the
  `THEME_TIER_ALIASES` constant and filters the release-alike pairs out of its assertion.
- The `tests/setupServer.test.ts` file: the added-selector registry case, and the round-1 registry
  case titled for the branch it reaches.
- The `tests/app/browser/sections/ColorModeSection.test.ts` file: the nesting case reads the
  `COLOR_MODE_CONTROLS` constant and refuses an empty list.

The `ct2-shared-2.patch` patch carries these edits against the `ac74459` commit:

- The `guides/veneer.md` file: the breakpoint limit in the breakpoint token paragraph.
- The `tests/conformance.test.ts` file: the derived dark sites and their agreement with the
  `COMPONENT_DARK_ASSETS` constant.
- The `tests/setup.ts` file and the `tests/setup.test.ts` file: the `COLOR_MODE_CONTROLS` constant
  with the controls named in its TSDoc block, its export row, and its case.
- The `tests/setupStyles.ts` file and the `tests/setupStyles.test.ts` file: the
  `THEME_TIER_ALIASES` constant, the `THEME_GRAY_TIERS` remark pointing at it, its export row, and
  the read-back case reading it.

No guide sentence names a moved constant, so no other sentence reads false.

## Review evidence

Every file sits in the `/home/user/veneer-ct2/tmp/units/` directory.

- The `ct2-2.diff` diff, with the
  `e198bf93623960a13c62be894044b558a764af1092a2375b64413c1c6090fcff` SHA-256 digest: the owned diff
  against the `ac74459` commit over both rounds.
- The `ct2-2-status.txt` status, with the
  `a54c772445fd0aece961e633c1a534b2b7800ecb94898d93a05613d234227f2d` SHA-256 digest: the owned
  modified files and nothing else.
- The `ct2-shared-2.patch` patch, with the
  `c5b756206d01264603d258daf42449437efeafff857dd8e76ea193f0442fed52` SHA-256 digest.
- The mutation records: the `ct2-mutations.log.txt` log, the `ct2-mutations-2.log.txt` log, each
  `ct2-mutation-<id>.log.txt` log, the `ct2-mutate-run.log.txt` log, the `ct2-mutate-run-2.log.txt`
  log, the unbuilt U1 and U2 records named in § Round 3 changes, and the `ct2-mutate.py` and
  `ct2-mutate-2.py` instruments.
- The round-3 gate records: the `ct2-gates-2.sh` script, the `ct2-r3-gates.log.txt` log, each
  `ct2-r3-gate-<n>.log.txt` log, the `ct2-r3-lint-plant.log.txt` log, and the
  `ct2-build-copy-2.log.txt` log.
- The round-2 gate records: the `ct2-gates.sh` script, the `ct2-gates.log.txt` log, each
  `ct2-gate-<n>.log.txt` log, the `ct2-gate-8b.log.txt` log, the `ct2-oracle-alone.log.txt` log,
  the `ct2-r1-green.log.txt` log, the `ct2-lint-plant.log.txt` log, and the development-run logs
  whose names open with the `ct2-` prefix.
- The `ct2-sync.sh` script, the `ct2-patches.sh` script, and its successor, the `ct2-patches-2.sh`
  script, which copy the owned files into the scratch copy and write the patch, the diff, and the
  status. Each patch script refuses to run without the scratch trees.

Deviation state: none open.
