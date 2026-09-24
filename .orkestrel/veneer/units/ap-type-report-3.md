# AP-TYPE round 3 report

**Result:** round 3 is complete and did not stop. It carries J1 to J5 from `apt-audit-2-verdict.md`, and every
acceptance criterion passed on the first run. No rule changed: the `src/` hunks of `apt-3.diff` are identical to those
of `apt-2.diff`.

- Unit: AP-TYPE round 3, `opus` on Opus 5.5, native.
- Worktree: `/home/user/veneer-apt`, uncommitted over `712ae72`.
- Brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-type-brief-3.md`.

## Changes by site

**J3, the mixin case title** (`tests/src/styles/mixins.test.ts`). The case over `FLUID_SIZE_CASES` is retitled
"applies the responsive rule to a $size rem size against a $root px root below the 1200px boundary and caps it at the
size from the boundary". The title is true for the 1rem row, which the rule holds, as well as for the rows it scales.

**J5, the mixin label.**
- `tests/src/styles/mixins.test.ts`: `describe('fluid size mixin')` is now `describe('font size mixin')`.
- `tests/setupStyles.ts`: the `FLUID_SIZE_CASES` TSDoc now says "the `font-size` mixin proof".

**J2, § Font utilities** (`guides/veneer.md`).
- "This partial writes each size class's fluid value" now reads "The `src/styles/utilities/_font.scss` partial
  writes each size class's fluid value".
- The precedence sentence keeps its claim that a size class beats a heading or display class on the same element. It
  now ends: "an element carrying the `.h1` and `.fs-6` classes resolves the responsive size derived from the
  `--vn-size-3` token".

**J4, the font proof paragraph** (`guides/veneer.md`, owned this round). It now opens: "The
`tests/src/styles/utilities/font.test.ts` proof reads each size class against its heading class and under its
retuned size token, and the size class on a heading tag, below and from the 1200px boundary, at the 390, 1199, 1200,
and 1280 viewports. It also reads …". The rest of its list is unchanged.

**J1, the report.** The failing-first and mutation sections that follow correct the round-2 report.

**Formatting.** Every changed file was formatted only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json` over
the files themselves. The two edited guide paragraphs are rewrapped by hand to 100 columns.

## Failing-first

This round changed no `src/` byte and no assertion, so the round-2 baseline run and mutation logs still describe the
proofs. The baseline run (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-baseline-proofs.log.txt`) puts the owned source partials back to their
`712ae72` bytes.
- Result: 34 failed and 39 passed of 73 collected.
- `mixins.test.ts` failed to load with `[sass] Undefined mixin`.
- Every partial was restored with `identical=True`.

Some of the size proofs pass on the baseline. The following table names, for each one, every mutation that reddens
it, with each mutation's own reading, from `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-<name>.log.txt`.

| Proof that passes on the baseline | Mutation: reading |
| --- | --- |
| Default legend, light and dark (`fieldset.test.ts`) | cap: `24.24px`, not `24px`, at 1280. `xxl-cap`: `24.24px`, not `24px`, at 1280. `xxl`: 21.4029, not 21.57, at 390 |
| `display-1 fs-2` override (`font.test.ts`) | important: `30.6px`, not `30px`, at 1280. `xxl-cap`: `30.6px` at 1280. `xxl`: `29.2286px`, not `30px`, at 1280 |
| `.fs-3` layer escape (`font.test.ts`) | important: `24.24px`, not `24px`, at 1280. `xxl-cap`: `24.24px` at 1280. `xxl`: `23.6914px`, not `24px`, at 1280 |
| `fs-6 fs-1` later-value case (`font.test.ts`) | guard: `.fs-6` reads `18.358px`, not `16px`, at the runner's default 414px viewport |
| `h6` 12px floor case (`heading.test.ts`) | guard: 16.86, not 12, at 390 |
| `<h1 class="fs-6">` (`font.test.ts`) | guard: 18.43, not 16, at 390 |
| `.h5` and `.h6` defaults (`type.test.ts`), `.fs-5` and `.fs-6` defaults (`font.test.ts`) | guard: `.h6` and `.fs-6` read 18.43, not 16, at 390 |
| `.h4` default (`type.test.ts`) and `.fs-4` default (`font.test.ts`) | none: regression pins. At a 16px root the 20px size has zero excess over the 1.25rem floor, so no rule mutation moves it |

The remaining tests in the owned files that pass on the baseline assert colour, line-height classes, weights, styles,
infixes, mark, and the text classes. None of them reads a size this unit changes.

## Mutations

The mutation runs are round 2's (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutate.py`). Each log records build exit 0, test exit 1, and one
`identical=True` restore per file.

| Mutation | Proofs it reddens (reading) | Failed of 119 | Log |
| --- | --- | --- | --- |
| Literal size in place of the token: `heading-size(1)` returns `2.25rem` | The `h1` retune rows in `type.test.ts` and `font.test.ts` (`.h1` and `.fs-1` read `36px`, not `101px`, at 1200); the `heading-size` value-function proof in `mixins.test.ts` | 3 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal.log.txt` |
| Literal size in the cap only | The same `h1` retune rows (`36px`, not `101px`, at 1200) | 2 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-literal-cap.log.txt` |
| Cap removed from the mixin | Capped readings at 1280, including `.display-1` (`83.6px`, not `80px`) and the legend (`24.24px`, not `24px`) | 38 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-cap.log.txt` |
| Boundary moved to `xxl` everywhere | See the list after this table (`.h1` reads `33.9429px`, not `36px`, at 1200; `h1` 25.6114, not 26.28, at 390) | 40 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl.log.txt` |
| Boundary moved to `xxl` in the caps only | See the list after this table (`.h1` reads `36.96px`, not `36px`, at 1280; `.display-1` `83.6px`, not `80px`) | 40 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-xxl-cap.log.txt` |
| `max()` guard removed | The `h6` 12px floor case (16.86, not 12, at 390); the heading family, light and dark (at `h5` and `h6`); the `.h5`, `.h6`, `.fs-5`, and `.fs-6` defaults; `<h1 class="fs-6">`; the later-value case; the 1rem mixin row | 10 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-guard.log.txt` |
| `.fs-*` caps without `!important` | `.fs-*` at 1280 (`.fs-1` reads `36.96px`, not `36px`); the `.fs-*` retune rows; the override and layer-escape cases | 11 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/apt-2-mutation-important.log.txt` |

Both boundary mutations redden the same proofs, and only the ones that read a size with excess over the floor:
- `heading.test.ts`: the heading family, light and dark; the 32px `h5` floor row.
- `type.test.ts`: the `.h1` to `.h3` class cases; every `.display-*` case; every heading and display retune row.
- `font.test.ts`: the `.fs-1` to `.fs-3` cases; every `.fs-*` retune row; the override and layer-escape cases.
- `fieldset.test.ts`: the default legend, light and dark; the 40px legend.
- `mixins.test.ts`: the 3rem and the 2.25rem-at-20px mixin rows.

Neither boundary mutation reddens these zero-excess proofs, because the mutations cannot move them:
- the `.h4` to `.h6` and `.fs-4` to `.fs-6` defaults;
- the 12px `h6` floor row;
- `<h1 class="fs-6">`;
- the 1rem mixin row.

## Gates

Every gate ran through `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gates.sh` with npm 11 from `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments/env.sh`. Nothing ran `npm run build` or
`npm run build:src`.

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-format-check.log.txt` |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-lint-check.log.txt` |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-check.log.txt` |
| `npm run test:src:styles` | 0; 1439 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0; 320 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0; 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0; 20 passed | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-gate-test-guides.log.txt` |
| `grep -rn -E "(^|[^-])fluid\(" src tests guides` | 1 (no match) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-grep-fluid.log.txt` |
| `src/` hunks of `apt-3.diff` against `apt-2.diff` | 0 (identical) | `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-src-hunks.log.txt` |

`git diff 712ae72 --stat` names only owned and shared files (`/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-3/apt-3-diffstat.txt`).

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apt-3.diff`: `git diff 712ae72` over the owned files.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-shared-3.patch`: rewritten from the final tree over `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, and `guides/veneer.md`.
- `/home/user/scaffold/.orkestrel/veneer/units/apt-3-status.txt`: `git status --short`.

## Observations

- The journey and `npm test` were not run, per the brief.
- The guide patch still re-pads the whole `reboot` departure table, as in rounds 1 and 2.
