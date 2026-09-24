# Unit THEME (`ct`) round 2 report: brief `b-cross-ct-brief-3.md`

The THEME test populations the audit named each sit in a setup file or derive from the population
that owns them. The registry rule's added-selector branch has a plant that reddens on its mutation.
The breakpoint alias case proves X8, and the guide's breakpoint token paragraph states the limit.
Every acceptance gate exits 0 except the `npm run test:setup` command, which exits 1 on a timing
failure in an oracle case this unit did not touch. § Observation gives that reading. No stop
condition fired: the X8 proof shows the `.d-md-none` declaration holding at its compiled width.

## Observation: the oracle case timing

- Command: `npm run test:setup` in the scratch copy. Exit 1, result line
  `Tests  1 failed | 303 passed (304)`. The failing case is
  `tests/setupServer.test.ts > server setup > records and reads official control state and rejects contradicted or absent obligation steps`,
  with `Error: Test timed out in 10100ms.` (`ct2-gate-8.log.txt`, `ct2-gate-8b.log.txt`, and
  `ct2-setup-1.log.txt`).
- The load average read 11.68, 12.65, 12.29 at the `ct2-gate-8b.log.txt` run. Sibling units in
  `/home/user/veneer-ff`, `/home/user/veneer-fp`, and `/home/user/veneer-fu` held live Vitest
  processes.
- The case alone passes in 7342ms:
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup -t "records and reads official control state"`,
  exit 0, `Tests  1 passed | 303 skipped (304)` (`ct2-oracle-alone.log.txt`).
- The round-2 edit to the `tests/setupServer.test.ts` file adds a case and renames a case. It does
  not touch the oracle case or its budget. The deciding run is the Orchestrator's.

## Populations and their homes

| Population | Where it sat | Home | Mutation that reddens the case reading it |
| --- | --- | --- | --- |
| `controls` | `ColorModeSection.test.ts`, the nesting case | The `COLOR_MODE_CONTROLS` constant in `tests/setup.ts`, frozen, exported, and documented, with a row in the export list of `tests/setup.test.ts` and a case there that holds each selector unique in a frozen list (shared patch) | S3 |
| `dark` | `conformance.test.ts`, the ledger `describe` block | Derived: the `theme` key's recorded rules in the inventory whose selector opens with `[data-bs-theme=dark] `, each declaration of each. The case also holds the derived properties equal to the `COMPONENT_DARK_ASSETS` constant, a separate record of the same rules (shared patch) | C1, C2 |
| `retuned` | `theme.test.ts`, the role tier case | Derived: the roles in the `TOKEN_NAMES.color` group whose `--bs-{role}` fill alias the `THEME_DARK_ADDITIONS` constant lists. That constant records the dark-scope names Veneer adds because its primary and secondary fills retune. The case refuses an empty derivation | M1, D1 |
| `tiers` | `alert.test.ts`, the contextual role case | The `THEME_TIER_ALIASES` constant in `tests/setupStyles.ts`, frozen, exported, and documented, pairing each tier with its `--bs-*` alias suffix (shared patch). The read-back case in `tests/setupStyles.test.ts` held its own copy of the same pairs; it reads the constant, and the export list names it | A1 |

The `alert.test.ts` case filters out the pairs the release writes alike and asserts on the rest. It
keys the release values by alias name through the `THEME_TIER_ALIASES` constant, builds each pair
of this role's alias and another role's alias, drops a pair whose aliases the release gives the
same value, refuses an empty remainder, and asserts that no remaining pair resolves alike on the island.
The nested ternary and its triple read of the release map are gone.

The `tests/setupServer.ts` file needed no edit. The derivation replaced the conformance table, and
the `collectAdditions` remark reads true for each branch of the registry rule.

## The registry plant (R1)

- Case: `tests/setupServer.test.ts > server setup > records a registry name an added selector declares, and names the planted name beside it`.
- Plant: `@layer components { .btn-planted { --vn-palette-blue: #0d6efd; --vn-planted: 0 } }`
  against the pinned inventory with the `btn` key shipped. The inventory records the
  `.btn-planted` selector nowhere, so the walk takes the added-selector branch. The case holds the
  ledger to `btn | .btn-planted | — | selector` and `btn | --vn-planted | — | property`. The
  `collectAdditions` function with an empty registry adds `btn | --vn-palette-blue | — | property`,
  so the registry is the only reason the canonical name is absent.
- Mutation R1 deletes the `if (registry.includes(property)) continue` line from the added-selector
  branch of the `collectAdditions` function. The plant case fails at the ledger assertion and
  receives the extra `btn | --vn-palette-blue | — | property` row. The round-1 case, renamed
  `records a registry name a recorded selector declares, and names the planted name beside it`,
  passes under the same mutation, which is the gap the subjective lane's R1 named
  (`ct2-mutation-R1.log.txt`).
- Command: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup -t "registry name"`,
  exit 1 under R1. Without the mutation the same command exits 0 with the recorded-selector case and the
  added-selector case passing
  (`ct2-r1-green.log.txt`).

## The breakpoint alias proof (X8)

- Case: `tests/src/styles/tokens.test.ts > token cascade > moves the md breakpoint alias with a token override, and holds the condition the ramp compiled`.
- The case reads the compiled md width, `768px`, from the `RETAINED_LENGTH_ALIASES` row for the
  `--vn-breakpoint-md` token. It mounts a `.d-md-none` element and reads the
  `--bs-breakpoint-md` alias and the element's `display` value at a 668px viewport and at an
  868px viewport, through the `visitBreakpoint` helper. It sets the `--vn-breakpoint-md` token to
  `968px` on the document element and takes the same readings.
- Readings without the override: `768px` and `block` at 668px, `768px` and `none` at 868px. With
  the override: `968px` and `block` at 668px, `968px` and `none` at 868px. The alias moves with the
  token. The `breakpoint-up(md)` declaration is the control: it holds at 868px, the viewport where
  a condition that followed the token would read `block`. The 668px reading shows the instrument
  reaches the condition, because the element reads `block` there.
- Mutation B1 writes the alias as the compiled width,
  `--bs-breakpoint-#{$name}: #{map.get(breakpoints(), $name)};`, in the `_tokens.scss` partial of the
  scratch copy. The case fails at the overridden assertion: the alias reads `768px` where the case
  expects `968px` (`ct2-mutation-B1.log.txt`). Command:
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/tokens.test.ts -t "md breakpoint"`,
  build exit 0, test exit 1.
- Guide: the breakpoint token paragraph in § Tokens, which opens "Veneer keeps Bootstrap's
  breakpoint names verbatim", states that the build compiles the widths into every media
  condition, that a document-scope override of a `--vn-breakpoint-*` token moves the
  `--bs-breakpoint-*` alias and no condition, the measured `968px` and 868px example, and the
  proof that reads it (shared patch).

## The round-1 accounts, corrected (claims 7 and 8)

The section mutations are S1, S2, and S3. S1 drops the dark island's attribute and S2 drops the
nested island's attribute; each reddens the nesting case and the mode case of
`ColorModeSection.test.ts`. S3 drops the nested island's toggler and reddens the nesting case. The
export proof is S4. S4 drops the section's row from the `app/browser/index.ts` barrel. Under S4
the `ColorModeSection.test.ts` suite fails to import, so no section assertion runs. The index
proof, `tests/app/browser/index.test.ts > exports the showcase surface…`, runs and catches the
missing export. S4 proves the export, not the section.

These round-1 cases ran red against the unfixed tree:

- `theme.test.ts`: the role tier case, the secondary case, and the light and dark link cases
  (`ct-red-theme.log.txt`).
- `theme.test.ts`: the V13 tier case and the light-mode and dark-mode alert contrast cases
  (`ct-v13-red-theme.log.txt`).
- `setupServer.test.ts`: the registry case for a recorded selector (`ct-red-x3.log.txt`).

These round-1 cases are bound by a named mutation instead:

- `theme.test.ts`: the nested-island case for the names the light scope leaves to the document
  scope passed against the unfixed tree, because the cascade met its claim. M5 reddens it.
- `conformance.test.ts`: the theme presence, dark-rule plant, and ledger cases, by M7.
- `ColorModeSection.test.ts`: the section cases, by S1, S2, and S3.
- `index.test.ts`: the export, by S4.

This round's added cases are each bound by a named mutation. Each proves a rule the tree carries,
so none has an unfixed tree to run red against:

- The added-selector registry case, by R1.
- The md breakpoint alias case, by B1.
- The `COLOR_MODE_CONTROLS` case in `tests/setup.test.ts` asserts the list is non-empty, unique,
  and frozen. S3 binds the nesting case that reads the list.

## Mutation log

The `ct2-mutate.py` script applies each mutation to a file in the scratch copy, rebuilds the
styles where the file is a partial, runs the command, and writes the file's own bytes back with a
digest check. The `ct2-mutations.log.txt` log records the site, the command, the build and test
exits, the summary line, and the failing and passing case names. Each red run's full output is in
`ct2-mutation-<id>.log.txt`. Every mutation's test exit is 1, and every digest check passes.

| Id | Site | Failing case |
| --- | --- | --- |
| R1 | the `collectAdditions` function, `tests/setupServer.ts`: the registry check in the added-selector branch deleted | `records a registry name an added selector declares…` |
| B1 | the `_tokens.scss` partial: the `--bs-breakpoint-*` alias written as the compiled width | `moves the md breakpoint alias with a token override…` |
| M1 | the `$dark` map, `_tokens.scss`: the `secondary` and `secondary-rgb` entries reverted to the light slate | `resolves every role tier and the body tokens per island over nested modes` |
| D1 | the `THEME_DARK_ADDITIONS` constant, `tests/setupStyles.ts`: the `--bs-secondary` row deleted | `resolves every role tier…`, at the `--vn-color-secondary-base` token |
| A1 | the `$dark` map, `_tokens.scss`: the `dark-border` entry set to the gray-700 step the `light` role's border takes | `in dark > paints the light alert…` and `in dark > paints the dark alert…`, at the held-apart assertion |
| C1 | the `guides/veneer.md` file: the `theme` compatibility row deleted | `measures the dark component rules under the theme key…`, which receives `[[], []]` |
| C2 | the `COMPONENT_DARK_ASSETS` constant, `tests/setupStyles.ts`: the `--bs-navbar-toggler-icon-bg` row deleted | `measures the dark component rules under the theme key…`, at the agreement with the derived sites |
| S3 | the `COLOR_MODE_SPECIMENS` constant, `app/browser/constants.ts`: the nested island's navbar toggler deleted | `nests a dark island in a light surface and a light island in the dark one…` |

Under A1 the light-mode alert cases pass. The release gives the `light` and `dark` roles the same
text emphasis in light mode, and the filter drops that pair alone.

## Gates

The `ct2-gates.sh` script ran each gate. The `ct2-gates.log.txt` file records each gate's place,
command, exit, and result line, and `ct2-gate-<n>.log.txt` holds each full log. The scratch copy
was a `git archive ac74459` extract at `tmp/probe/ct2-copy` with a hard-linked `node_modules`
directory, an empty `.git` directory, the `ct2-shared.patch` edits, and the owned files. A
`diff -rq` over the copy and a clean extract, excluding `node_modules`, `dist`, `.git`, and `tmp`,
listed only the owned and shared files. A planted `any` and `debugger` in a copy-only file made
the `npm run lint:check` command exit 1 there (`ct2-lint-plant.log.txt`), and the plant file was
deleted.

| # | Where | Command | Exit | Result line |
| --- | --- | --- | --- | --- |
| 1 | worktree | `npx oxfmt --config .oxfmtrc.json --check tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts` | 0 | `Finished in 260ms on 6 files using 4 threads.` |
| 2 | worktree | `npm run lint:check` | 0 | none; the `oxlint` linter prints nothing on a clean run |
| 3 | scratch copy | `npx oxfmt --config .oxfmtrc.json --check tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts guides/veneer.md tests/conformance.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts` | 0 | `Finished in 24763ms on 12 files using 4 threads.` |
| 4 | scratch copy | `npm run lint:check` | 0 | none |
| 5 | scratch copy | `npm run check` | 0 | none; the `tsc` and `vue-tsc` compilers print nothing on a clean run |
| 6 | scratch copy | `npm run build:src` | 0 | `✓ built in 5.63s` |
| 7 | scratch copy | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts` | 0 | `Tests  73 passed (73)` |
| 8 | scratch copy | `npm run test:setup` | 1 | `Tests  1 failed \| 303 passed (304)`; § Observation |
| 9 | scratch copy | `npm run test:conformance` | 0 | `Tests  26 passed (26)` |
| 10 | scratch copy | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| 11 | scratch copy | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ColorModeSection.test.ts` | 0 | `Tests  4 passed (4)` |

The `git apply --check` command passes on the worktree for the `ct2-shared.patch` file. The scratch
copy and the clean extract under `tmp/probe/` are deleted, and `tmp/probe/` holds nothing the unit
created.

## Touched files

The unit wrote these owned files in the worktree:

- `tests/src/styles/theme.test.ts`: the role tier case derives its retuned roles from the
  `THEME_DARK_ADDITIONS` constant and refuses an empty derivation.
- `tests/src/styles/tokens.test.ts`: the md breakpoint alias case, with the `visitBreakpoint`
  helper import.
- `tests/src/styles/components/alert.test.ts`: the contextual role case reads the
  `THEME_TIER_ALIASES` constant and filters the release-alike pairs out of its assertion.
- `tests/setupServer.test.ts`: the added-selector registry case, and the round-1 registry case
  renamed for the branch it reaches.
- `tests/app/browser/sections/ColorModeSection.test.ts`: the nesting case reads the
  `COLOR_MODE_CONTROLS` constant and refuses an empty list.

The `ct2-shared.patch` file carries these edits against `ac74459`:

- `guides/veneer.md`: the breakpoint limit in the breakpoint token paragraph.
- `tests/conformance.test.ts`: the derived dark sites and their agreement with the
  `COMPONENT_DARK_ASSETS` constant.
- `tests/setup.ts` and `tests/setup.test.ts`: the `COLOR_MODE_CONTROLS` constant, its export row,
  and its case.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: the `THEME_TIER_ALIASES` constant, the
  `THEME_GRAY_TIERS` remark pointing at it, its export row, and the read-back case reading it.

No guide sentence names a moved constant, so no other sentence reads false.

## Review evidence

Every file sits in `/home/user/veneer-ct2/tmp/units/`.

- `ct2.diff` (SHA-256 `e198bf93623960a13c62be894044b558a764af1092a2375b64413c1c6090fcff`), the
  owned diff against `ac74459`.
- `ct2-status.txt` (SHA-256 `a54c772445fd0aece961e633c1a534b2b7800ecb94898d93a05613d234227f2d`),
  the owned modified files and nothing else.
- `ct2-shared.patch` (SHA-256 `af127564d91ef3a672aacb336b6c1d616bfd057570bdf675eab81738b4935cd4`).
- `ct2-mutations.log.txt`, `ct2-mutation-<id>.log.txt`, `ct2-mutate-run.log.txt`, and the
  `ct2-mutate.py` instrument.
- `ct2-gates.sh`, `ct2-gates.log.txt`, `ct2-gate-<n>.log.txt`, and `ct2-gate-8b.log.txt`.
- `ct2-oracle-alone.log.txt`, `ct2-r1-green.log.txt`, `ct2-lint-plant.log.txt`, and the
  development runs `ct2-styles-1.log.txt`, `ct2-setup-1.log.txt`, `ct2-conformance-1.log.txt`,
  `ct2-guides-1.log.txt`, `ct2-section-1.log.txt`, `ct2-check-copy.log.txt`,
  `ct2-build-copy.log.txt`, `ct2-lint-copy.log.txt`, and `ct2-lint-worktree.log.txt`.
- `ct2-sync.sh` and `ct2-patches.sh`, which copy the owned files into the scratch copy and write the
  patch, the diff, and the status. The `ct2-patches.sh` script refuses to run without the scratch
  trees.

Deviation state: none open.
