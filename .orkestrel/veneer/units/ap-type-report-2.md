# AP-TYPE round 2 report

**Result:** round 2 is complete and did not stop. It carries G1 to G5 from `apt-audit-verdict.md`, and every
acceptance criterion passed on the first run.

- Unit: AP-TYPE round 2, `opus` on Opus 5.5, native.
- Worktree: `/home/user/veneer-apt`, uncommitted over `712ae72`.
- Brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-type-brief-2.md`.
- One finding departs from the brief's G1 wording: the guard mutation reddens the `.h5`, `.h6`, `.fs-5`, and `.fs-6`
  defaults. Only the `.h4` and `.fs-4` defaults are pins that no rule mutation reaches. The failing-first section
  gives the log evidence.

## Changes by file

**G4, the rename.** The Sass function `fluid` is now `fluid-size`.
- `src/styles/_mixins.scss`: the declaration, the call inside the `font-size` mixin, and both comments. The comments
  are rewrapped to 100 columns.
- `src/styles/utilities/_font.scss`: the `$sizes` call and its comment.
- `tests/setupStyles.ts`: the `computeFluidSize` remarks.
- `guides/veneer.md`: the § Font utilities sentence.
- `grep -rn -E "(^|[^-])fluid\(" src tests guides` returns nothing and exits 1
  (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-grep-fluid.log.txt`).

**G2 and G4, the widths.** `tests/setupStyles.ts` splits the fluid-proof widths into two constants:
- `FLUID_WIDTHS` is `[390, 1199]`, the widths below the boundary.
- `CAPPED_WIDTHS` is `[1200, 1280]`, the widths at and above it.

Every fluid proof reads both constants:
- Below 1200, it compares with `computeFluidSize` within 0.005px, the only place a tolerance remains.
- At 1200 and 1280, it pins the exact token string with `readStyle(...).toBe('36px')`, and the line string where the
  case records one. It also asserts `readPixels(...).toBe(computeFluidSize(size, width))` exactly.

So 1199 and 1200 both stay among the widths each proof checks against the oracle: 1199 within the tolerance, 1200
exactly. The proofs this covers are:
- the heading family and the floor case in `heading.test.ts`;
- the `.h*`, `.display-*`, and both retune cases in `type.test.ts`;
- the `.fs-*` case, the retune case, and `<h1 class="fs-6">` in `font.test.ts`;
- the default and 40px legend in `fieldset.test.ts`;
- the mixin case in `mixins.test.ts`.

The four 1199-to-1200 continuity blocks, their `readings` maps, and their `requireValue` lookups are deleted, in
`type.test.ts`, `font.test.ts`, `fieldset.test.ts`, and `mixins.test.ts`. Case titles that read "at each journey
viewport" or "at each side of the boundary" now read "below and from the 1200px boundary".

**G4, the floor table.** `TYPE_THRESHOLD_CASES` is now `TEXT_FLOOR_CASES`. It sits beside `TEXT_HEADING_CASES`,
its only consumer's table. Its rows key the tag as `tag`, not `twin`. The case is retitled "applies the 1.25rem floor
to the live $token token on $tag under a $value retune, below and from the 1200px boundary".

**G5, the matrix.** The inline matrix in `tests/src/styles/mixins.test.ts` moves to `tests/setupStyles.ts` as
`FLUID_SIZE_CASES`: frozen, exported, with TSDoc, and imported by the test.

**Shared-file test registration.** `tests/setupStyles.test.ts`:
- registers `CAPPED_WIDTHS`, `FLUID_SIZE_CASES`, and `TEXT_FLOOR_CASES`, and drops `TYPE_THRESHOLD_CASES`;
- pins the values of both width constants and of the matrix, and checks that each is frozen;
- checks the floor table's rows and their disjointness from the defaults;
- adds `TEXT_FLOOR_CASES` to the text freeze list.

**G3, the guide.** In § Font utilities of `guides/veneer.md`:
- "The release writes none of these entries responsive, … no font class writes a breakpoint infix" becomes "None of
  these entries takes a breakpoint infix, so each class ships at the empty infix alone".
- The rule sentence now reads: "a heading or size class shrinks by the release's responsive rule over its
  `--vn-size-*` token, and a display class over its `--vn-display-*` token; from 1200px each class resolves its
  token".
- "after the walk" becomes "after every size class".
- The ledger rows are unchanged from round 1.

**Retained from round 1, unchanged.** The rule, its population, and these files:
- `src/styles/elements/_heading.scss`
- `src/styles/components/_type.scss`
- `src/styles/elements/_fieldset.scss`
- `tests/src/styles/fixtures/mixins.scss`

## Failing-first

`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-baseline-proofs.py` puts the owned source partials back to their `712ae72` bytes, rebuilds the
styles, runs the round-2 proofs, and restores the partials.
- Result: 34 failed and 39 passed of 73 collected.
- `mixins.test.ts` failed to load with `[sass] Undefined mixin`, because its fixture needs the `font-size` mixin. That
  is a load failure, not a rendered regression failure.
- Every partial was restored with `identical=True` (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-baseline-proofs.log.txt`).

Some of this unit's size proofs pass on the baseline. The following table names, for each one, the mutation that
reddens it, read from each `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-<name>.log.txt` failure list.

| Proof that passes on the baseline | Mutation that reddens it | Reading |
| --- | --- | --- |
| Default legend, light and dark (`fieldset.test.ts`) | cap (also both `xxl` mutations) | `legend` reads `24.24px`, not `24px`, at 1280 |
| `display-1 fs-2` override (`font.test.ts`) | important (also both `xxl` mutations) | `.fs-2` reads `30.6px`, not `30px`, at 1280 |
| `.fs-3` layer escape (`font.test.ts`) | important (also both `xxl` mutations) | `.fs-3` reads `24.24px`, not `24px`, at 1280 |
| `h6` 12px floor case (`heading.test.ts`) | guard | `h6` reads 16.86, not 12, at 390 |
| `<h1 class="fs-6">` (`font.test.ts`) | guard | the size reads 18.43, not 16, at 390 |
| `.h5` and `.h6` defaults (`type.test.ts`), `.fs-5` and `.fs-6` defaults (`font.test.ts`) | guard | `.h6` and `.fs-6` read 18.43, not 16, at 390 |
| `.h4` default (`type.test.ts`) and `.fs-4` default (`font.test.ts`) | none | regression pins: at a 16px root the 20px size has zero excess over the 1.25rem floor, so no rule mutation moves it |

The brief asks to record `.h4` to `.h6` and `.fs-4` to `.fs-6` as pins no rule mutation reaches. The logs refute that
for `.h5`, `.h6`, `.fs-5`, and `.fs-6`: without the guard, a size under the floor gets a negative excess and grows.
Only `.h4` and `.fs-4` are unreachable.

The other tests in the owned files that pass on the baseline assert properties this unit does not change: colour,
line-height classes, weights, styles, infixes, mark, and the text classes.

## Mutations

The runner is `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutate.py <name>`, the successor of `apt-mutate.py`. Its cap mutation now matches
`fluid-size($size)`. Each run applies one edit, rebuilds the styles, and runs the owned style proofs. It then writes
back the original bytes, and the log records one `identical=True` digest check per restored file.

| Mutation | Proof that reddened (reading) | Failed of 119 | Log |
| --- | --- | --- | --- |
| Literal size in place of the token: `heading-size(1)` returns `2.25rem` | `h1` retune rows in `type.test.ts` and `font.test.ts`: `.h1` and `.fs-1` read `36px`, not `101px`, at 1200 | 3 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal.log.txt` |
| Literal size in the cap only | the same rows: `.h1` and `.fs-1` read `36px`, not `101px`, at 1200 | 2 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal-cap.log.txt` |
| Cap removed from the mixin | capped readings at 1280: `.display-1` reads `83.6px`, not `80px`; `legend` `24.24px`, not `24px` | 38 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-cap.log.txt` |
| Boundary moved to `xxl` everywhere | every size proof | 40 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl.log.txt` |
| Boundary moved to `xxl` in the caps only | every size proof at 1280: `.display-1` reads `83.6px`, not `80px` | 40 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl-cap.log.txt` |
| `max()` guard removed | `h6` 12px floor case: `h6` reads 16.86, not 12, at 390 | 10 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-guard.log.txt` |
| `.fs-*` caps without `!important` | `.fs-*` at 1280: `.fs-1` reads `36.96px`, not `36px` | 11 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-important.log.txt` |

Every build exited 0, and every restore logged `identical=True`. The styles were rebuilt from the final sources after
the last run.

## Gates

Every gate ran through `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gates.sh`, with npm 11 from `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/env.sh`. Nothing ran `npm run build`
or `npm run build:src`; the only build was `npm run build:src:styles`, run by the styles gate and the mutation runs.
The formatter ran only as `./node_modules/.bin/oxfmt --config .oxfmtrc.json` over the files changed in this round.

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-format-check.log.txt` |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-lint-check.log.txt` |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-check.log.txt` |
| `npm run test:src:styles` | 0; 1439 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0; 320 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0; 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0; 20 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-gate-test-guides.log.txt` |
| `grep -rn -E "(^|[^-])fluid\(" src tests guides` | 1 (no match) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-grep-fluid.log.txt` |

Owned proofs, final run: 119 passed (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-proofs.log.txt`).

`git diff 712ae72 --stat` names only owned and shared files (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-diffstat.txt`).

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apt-2.diff`: `git diff 712ae72` over the owned files.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-shared-2.patch`: rewritten from the final tree; `git diff` over `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, and `guides/veneer.md`.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-2-status.txt`: `git status --short`.

## Observations

- The guide patch still re-pads the whole `reboot` departure table, as in round 1. The integration note in
  `/home/user/scaffold/.orkestrel/veneer/units/ap-type-report.md` still applies if AP-COLOR touches that table.
- The journey and `npm test` were not run, per the brief.
