1. **Acceptance**

All 13 acceptance criteria pass. No commits were made.

| Command / criterion | Expected | Measured | Exit |
|---|---|---|---:|
| `npm run build:src:bootstrap` | Build; unchanged default digest | Built; digest matches §6 | 0 |
| `npm run build:src:tailwindcss` | Build; measure new digest | Built; digest recorded in §6 | 0 |
| `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts` — twice | Equal record digests, sheet references, and Git status | Both runs: 2 tests passed; digests and status identical; both records reference the new sheet | 0, 0 |
| `npm run check:src:bootstrap` | No errors | Passed | 0 |
| `npm run check:src:tailwindcss` | No errors | Passed | 0 |
| `npm run check` | No errors | Passed | 0 |
| `npm run lint:check` | No errors or warnings | Passed | 0 |
| `npm run format:check` | All files formatted | Passed, 357 files | 0 |
| `npm run test:src:bootstrap` | All tests pass | 14 passed | 0 |
| `npm run test:src:tailwindcss` | Derivation, precedence, and witnesses pass | 6 passed | 0 |
| `npm run test:setup` | All tests pass | 150 passed | 0 |
| `npm run test:setup:browser` | All tests pass | 134 passed | 0 |
| `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts -t "Tailwind compatibility recipe"` | All selected cases pass | 12 passed; 107 skipped | 0 |
| `git diff --check` | No whitespace errors | No output | 0 |

Per-file formatting covered only `_tokens.scss`, the guide, the Tailwind sheet test, and conformance test. Guide prose and all existing table-cell contents remain unchanged.

Final acceptance had no failed gates. Initial measurement invocations exposed the old count pins and stale records; their failures were resolved. Their complete bare outputs follow, with terminal color escapes omitted.

Initial sheet measurement, exit 1:

```text
 RUN  v4.1.11 /home/user/veneer

stdout | tests/src/tailwindcss/index.test.ts:117:2 > tailwindcss entry > derives the tuned sequences by withholding, moving, copying, restoring, and nothing else
Derivation counts {"originals":73,"copies":72,"scoped":8}
stdout | tests/src/tailwindcss/index.test.ts:237:2 > tailwindcss entry > keeps every curated and scoped copy at its original's specificity before the component rules
Precedence count 80
 ❯ |src:tailwindcss (chromium)| tests/src/tailwindcss/index.test.ts (6 tests | 2 failed) 3370ms
     × derives the tuned sequences by withholding, moving, copying, restoring, and nothing else 76ms
     × keeps every curated and scoped copy at its original's specificity before the component rules 17ms

 Test Files  1 failed (1)
      Tests  2 failed | 4 passed (6)
   Start at  18:19:43
   Duration  12.15s (transform 0ms, setup 588ms, import 99ms, tests 3.37s, environment 0ms)

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:tailwindcss (chromium)| tests/src/tailwindcss/index.test.ts:117:2 > tailwindcss entry > derives the tuned sequences by withholding, moving, copying, restoring, and nothing else
AssertionError: expected 8 to be 7 // Object.is equality

- Expected
+ Received

- 7
+ 8

 ❯ tests/src/tailwindcss/index.test.ts:204:18
    202|    expect(originals).toBe(73)
    203|    expect(copies).toBe(72)
    204|    expect(scoped).toBe(7)
       |                  ^
    205|    const important = sequences.important.filter(
    206|     (entry) =>

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  |src:tailwindcss (chromium)| tests/src/tailwindcss/index.test.ts:237:2 > tailwindcss entry > keeps every curated and scoped copy at its original's specificity before the component rules
AssertionError: expected [ { …(4) }, …(79) ] to have a length of 79 but got 80

- Expected
+ Received

- 79
+ 80

 ❯ tests/src/tailwindcss/index.test.ts:293:17
    291|    }
    292|    console.info('Precedence count', pairs.length)
    293|    expect(pairs).toHaveLength(79)
       |                 ^
    294|    const readings = await readSpecificities(pairs.flatMap((pair) => [p…
    295|

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯

exit=1 signal=none capped=false duration_ms=13827
```

Initial conformance measurement before record regeneration, exit 1:

```text
 RUN  v4.1.11 /home/user/veneer

 ❯ |conformance| tests/conformance.test.ts (119 tests | 1 failed | 118 skipped) 129ms
     × pins the tuned-sheet statement sequence to the measured syntactic rewrites 127ms

 Test Files  1 failed (1)
      Tests  1 failed | 118 skipped (119)
   Start at  18:20:13
   Duration  1.34s (transform 683ms, setup 581ms, import 457ms, tests 129ms, environment 0ms)

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |conformance| tests/conformance.test.ts > Tailwind compatibility recipe > pins the tuned-sheet statement sequence to the measured syntactic rewrites
Error: Recipe sheet digest does not match
 ❯ readRecipe tests/setupServer.ts:1026:9
    1024|  }
    1025|  if (record.sheet !== createHash('sha256').update(readFileSync(TAILWIN…
    1026|   throw new Error('Recipe sheet digest does not match')
       |         ^
    1027|  return record
    1028| }
 ❯ tests/conformance.test.ts:1223:18

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

exit=1 signal=none capped=false duration_ms=3297
```

Conformance measurement after regeneration, before updating the statement pin, exit 1:

```text
 RUN  v4.1.11 /home/user/veneer

 ❯ |conformance| tests/conformance.test.ts (119 tests | 1 failed | 118 skipped) 1253ms
     × pins the tuned-sheet statement sequence to the measured syntactic rewrites 1251ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |conformance| tests/conformance.test.ts > Tailwind compatibility recipe > pins the tuned-sheet statement sequence to the measured syntactic rewrites
AssertionError: expected [ …(8573) ] to have a length of 8568 but got 8573

- Expected
+ Received

- 8568
+ 8573

 ❯ tests/conformance.test.ts:1302:38
    1300|    })
    1301|    const actual = requireValue(outputs[0])
    1302|    expect(collectStatements(actual)).toHaveLength(8568)
       |                                      ^
    1303|    expect(collectStatements(actual)).toEqual(collectStatements(normali…
    1304|    expect(actual.replace(/\/\*[\s\S]*?\*\//gu, '')).toBe(

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 118 skipped (119)
   Start at  18:21:09
   Duration  2.14s (transform 383ms, setup 402ms, import 329ms, tests 1.25s, environment 0ms)
```

The record guard required running the writers before completing conformance measurement. No witness equality or precedence invariant failed.

2. **Folded and excluded rows**

Added exactly **8 reboot, 1 restore, and 1 scoped row**. The table grows **46 → 56**: reboot **30 → 38**, restore **10 → 11**, scoped **6 → 7**.

| Form | Row | Documented specimen and element | Longhands |
|---|---|---|---|
| reboot | `alert-heading` | S1, [alerts.html](/home/user/veneer/app/browser/sections/alerts.html:158), `h4.alert-heading` inside `.alert` | `font-size, font-weight, margin-bottom, margin-block-end` |
| reboot | `card-subtitle` | S2, [card.html](/home/user/veneer/app/browser/sections/card.html:50), `h6.card-subtitle.mb-2.text-body-secondary` | `font-weight` |
| reboot | `card-header` | S3, [card.html](/home/user/veneer/app/browser/sections/card.html:226), `h5.card-header` inside `.card` | `font-size, font-weight` |
| reboot | `dropdown-header` | S4, [dropdowns.html](/home/user/veneer/app/browser/sections/dropdowns.html:31), `h6.dropdown-header` inside `.dropdown-menu` | `font-weight` |
| reboot | `display-6` | S5, [typography.html](/home/user/veneer/app/browser/sections/typography.html:72), `h1.display-6` | `margin-bottom, margin-block-end` |
| reboot | `list-inline` | S6, [typography.html](/home/user/veneer/app/browser/sections/typography.html:158), `ul.list-inline` | `margin-bottom, margin-block-end` |
| reboot | `figure` | S8, [figures.html](/home/user/veneer/app/browser/sections/figures.html:23), `figure.figure` | `margin-bottom, margin-block-end` |
| reboot | `placeholder-wave` | S9, [placeholders.html](/home/user/veneer/app/browser/sections/placeholders.html:67), `p.placeholder-wave` | `margin-bottom, margin-block-end` |
| restore | `img:where(.img-thumbnail)` | S10, [images.html](/home/user/veneer/app/browser/sections/images.html:48), normal-flow `img.img-thumbnail` | `display` |
| scoped | `:where(.navbar-text) a` | S11, [navbar.html](/home/user/veneer/app/browser/sections/navbar.html:136), `.navbar-text` link; witness adds its plain counterpart | `text-decoration-line` |

Evidence: probe [§ Current-table comparison and § Corpus comparison](/home/user/veneer/tmp/probes/flip5/report.md:7), corpus [§2 S1–S11](/home/user/scaffold/tmp/codex/documented-markup.md:1181), and the brief’s [appended rulings](/home/user/scaffold/tmp/codex/flip-fold-2-brief.md). The thumbnail uses the direct specimen measurement, `inline → block`, because fixed-point signature deduplication did not select it.

The following **19 derived rows remain excluded**, as appended ruling 2 requires:

| Rows | Count | Ruling |
|---|---:|---|
| `row`, `col-sm-9`, `col-sm-8` | 3 | Consumer owns the `dd` margin; corpus ruling for S7 |
| `table-group-divider`, `:where(.table-group-divider) td`, `table-active`, `a:where(.card-link)`, `a:where(.icon-link)`, `a:where(.icon-link-hover)`, `a:where(.stretched-link)` | 7 | Border-color differences on zero-width borders are invisible |
| `:where(.carousel-indicators) button` | 1 | Color difference on a textless indicator is invisible |
| `focus-ring-primary`, `focus-ring-secondary`, `focus-ring-success`, `focus-ring-danger`, `focus-ring-warning`, `focus-ring-info`, `focus-ring-light`, `focus-ring-dark` | 8 | Redundant with the accompanying `focus-ring` row |
| `icon-link-hover` | 1 | Redundant with the accompanying `icon-link` row |

The brief calls this set “19”; its explicit enumeration actually contains **20 rows**: `3 + 7 + 1 + 8 + 1`. All explicitly named exclusions were preserved.

The two current rows not reproduced by the probe, `:where(.table) tfoot` and `:where(.table) tr`, remain and pass their plain/hazard witnesses under appended ruling 3.

Literal entries were appended in the prescribed order. Witnesses use the specimen markup and wording. No emitter or helper was added; the showcase mapping remains unchanged.

3. **Witness element counts and readings**

Every row reads every matched element. All Bootstrap-alone readings equal the recipe readings; every row’s removal control differs.

- **One element each, 38 reboot rows:** `modal-title`, `offcanvas-title`, `popover-header`, `card-title`, `card-text`, `accordion-header`, `pagination`, `placeholder-glow`, `stretched-link`, `visually-hidden-focusable`, `alert-link`, `card-link`, `icon-link`, `link-primary`, `link-secondary`, `link-success`, `link-danger`, `link-warning`, `link-info`, `link-light`, `link-dark`, `link-body-emphasis`, `lead`, `display-1`, `display-2`, `display-3`, `display-4`, `display-5`, `list-unstyled`, `focus-ring`, `alert-heading`, `card-subtitle`, `card-header`, `dropdown-header`, `display-6`, `list-inline`, `figure`, `placeholder-wave`.
- **One element each, 11 restore rows:** `svg:where(.bi)`, `img:where(.figure-img)`, `img:where(.img-fluid)`, `img:where(.card-img)`, `img:where(.card-img-top)`, `img:where(.card-img-bottom)`, `input:where(.form-check-input)`, `input:where(.btn-check)`, `input:where(.form-range)`, `button:where(.accordion-button)`, `img:where(.img-thumbnail)`.
- **Two elements each, 7 scoped rows:** `:where(.table) thead`, `:where(.table) tbody`, `:where(.table) tfoot`, `:where(.table) tr`, `:where(.table) th`, `:where(.table) td`, `:where(.navbar-text) a`.

That is **63 matched elements per stylesheet condition**, or **189 readings across baseline, recipe, and removal**.

For the added navbar row, properties are `[text-decoration-line, color]`:

| Element | Bootstrap alone | Recipe | Row removed |
|---|---|---|---|
| Plain link | `underline`, `rgb(33, 37, 41)` | `underline`, `rgb(33, 37, 41)` | `none`, `rgb(33, 37, 41)` |
| Hazard link inside navbar | `underline`, `rgb(0, 0, 0)` | `underline`, `rgb(0, 0, 0)` | `none`, `rgb(0, 0, 0)` |

The component’s color survives the scoped copy. Complete per-row values are in [witnesses.md](/home/user/veneer/tmp/units/flip-sheet-3/witnesses.md) and [measurements.json](/home/user/veneer/tmp/units/flip-sheet-3/measurements.json), following the archived [§ The scoped-witness ruling](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet-2/brief-2.md:15).

4. **Derivation and conformance counts**

| Measurement | Before | After |
|---|---:|---:|
| Lifted originals | 73 | 73 |
| Curated copy rules | 72 | 72 |
| Restore rows | 10 | 11 |
| Scoped copy rules | 7 | 8 |
| Curated/scoped precedence pairs | 79 | 80 |
| Guide rows | 46 | 56 |
| Compiled statement count | 8568 | 8573 |
| Consumed `@source` directive | 1 | 1 |
| Empty reset rewrite | 1 | 1 |
| Empty bootstrap rewrites | 215 | 215 |
| Joined bootstrap blocks | 46 | 46 |
| Joined `:where(.table) th` selectors | 1 | 1 |
| Joined `.dropstart .dropdown-toggle::after` selectors | 1 | 1 |
| Joined 576px media blocks | 175 | 175 |
| Joined 768px media blocks | 175 | 175 |
| Joined 992px media blocks | 175 | 175 |
| Joined 1200px media blocks | 178 | 178 |
| Joined 1400px media blocks | 175 | 175 |
| Joined print media blocks | 10 | 10 |

The eight reboot additions extend the restrictions in the existing **72 curated copies**. They do not create eight additional rules. The Sass-literal test checks the guide against all three literal collections, with planted and removed controls in both directions.

5. **Precedence pairs**

All **80 rule pairs / 139 selector-member pairs** have equal original/copy specificity, remain in `bootstrap`, and precede the first component rule at index **167**. Complete original selectors, emitted copies, contexts, specificities, and positions are in [precedence.md](/home/user/veneer/tmp/units/flip-sheet-3/precedence.md).

Relevant amended copies and the new scoped copy:

| Original → copy containing the added class | Original → copy specificity | Copy index |
|---|---|---:|
| `h4` → `h4:where(…, .alert-heading, …)` | `(0,0,1) → (0,0,1)` | 11, 25, 27 |
| `h6` → `h6:where(…, .card-subtitle, …)` | `(0,0,1) → (0,0,1)` | 11, 31 |
| `h5` → `h5:where(…, .card-header, …)` | `(0,0,1) → (0,0,1)` | 11, 29 |
| `h6` → `h6:where(…, .dropdown-header, …)` | `(0,0,1) → (0,0,1)` | 11, 31 |
| `h1` → `h1:where(…, .display-6, …)` | `(0,0,1) → (0,0,1)` | 11, 13, 15 |
| `ul` → `ul:where(…, .list-inline, …)` | `(0,0,1) → (0,0,1)` | 39, 41 |
| `figure` → `figure:where(…, .figure, …)` | `(0,0,1) → (0,0,1)` | 82 |
| `p` → `p:where(…, .placeholder-wave)` | `(0,0,1) → (0,0,1)` | 33 |
| `a` → `:where(.navbar-text) a` | `(0,0,1) → (0,0,1)` | 166 |

The heading-class companions such as `.h6` retain `(0,1,0)`. The navbar component selector `.navbar-text a` retains `(0,1,1)` and wins its color.

The measured `h6` copy includes:

```css
h6:where(.modal-title, .offcanvas-title, .popover-header, .card-title, .card-text, .accordion-header, .pagination, .placeholder-glow, .stretched-link, .visually-hidden-focusable, .alert-link, .card-link, .icon-link, .link-primary, .link-secondary, .link-success, .link-danger, .link-warning, .link-info, .link-light, .link-dark, .link-body-emphasis, .lead, .display-1, .display-2, .display-3, .display-4, .display-5, .list-unstyled, .focus-ring, .alert-heading, .card-subtitle, .card-header, .dropdown-header, .display-6, .list-inline, .figure, .placeholder-wave)
```

The thumbnail is a restore entry, so it is covered by derivation and witness proofs rather than the curated/scoped copy-pair population. The missing-copy and late-copy controls still reject their planted departures. This preserves the archived [§ The precedence ruling](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet-2/brief-3.md:15).

6. **Digests**

| Artifact | Before | After |
|---|---|---|
| Default Bootstrap | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `$layered: false` | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| Tuned Tailwind sheet | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` | `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662` |

| Writer output | Run 1 | Run 2 |
|---|---|---|
| `tests/fixtures/tailwindcss/recipe.json` | `cdfd665d1a403c8c1bf7810ee4bea102ebcbd392cbe991968d05af35fd5b8a05` | `cdfd665d1a403c8c1bf7810ee4bea102ebcbd392cbe991968d05af35fd5b8a05` |
| `app/browser/recipe.json` | `93d6da5e61cd50229a618c9a00719bb290f014bab27d12e4f5b7f198e6df6c0d` | `93d6da5e61cd50229a618c9a00719bb290f014bab27d12e4f5b7f198e6df6c0d` |

Both records’ `sheet` equals the new tuned digest. Both writer runs have identical `git status --porcelain`. Only `sheet` and compiled `recipe` changed inside each record.

7. **Integration observation**

`npm run test:integration`: **exit 0; 58 tests passed**. No failing titles. Full output: [integration.log](/home/user/veneer/tmp/units/flip-sheet-3/integration.log).

No separate journey run was requested or performed.

8. **Edited files and final status**

- [src/tailwindcss/_tokens.scss](/home/user/veneer/src/tailwindcss/_tokens.scss): ten literal additions.
- [guides/veneer.md](/home/user/veneer/guides/veneer.md): ten curation rows; table formatting only.
- [tests/src/tailwindcss/index.test.ts](/home/user/veneer/tests/src/tailwindcss/index.test.ts): measured count pins and navbar color reading.
- [tests/conformance.test.ts](/home/user/veneer/tests/conformance.test.ts): statement pin, row totals, and bidirectional literal controls.
- [tests/fixtures/tailwindcss/recipe.json](/home/user/veneer/tests/fixtures/tailwindcss/recipe.json), [app/browser/recipe.json](/home/user/veneer/app/browser/recipe.json): regenerated exclusively through U3’s writers.

```text
 M app/browser/recipe.json
 M guides/veneer.md
 M src/tailwindcss/_tokens.scss
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/src/tailwindcss/index.test.ts
```