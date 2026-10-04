Stopped on a conflict with the original brief’s precedence requirement. U2b remains incomplete and uncommitted.

Expected: every curated or scoped copy has lower specificity than a component rule it could meet, or equal specificity with earlier source order.

Measured: clicking `<button class="focus-ring">Archive action</button>` makes both rules match:

| Rule | Specificity | Built sheet line | Shared declaration |
|---|---|---:|---|
| `button:focus:not(:focus-visible):where(…)`, including `.focus-ring` | `(0,2,1)` | 835 | `outline: 0` |
| `.focus-ring:focus` | `(0,2,0)` | 7653 | `outline: 0` |

Both rules sit in `bootstrap`. The copy outranks the component despite appearing earlier. Chromium reports `:focus = true`, `:focus-visible = false`, and computed outline `rgb(0, 0, 0) none 0px`.

This is a counterexample to ruling 7’s specificity assertion; the identical declarations do not establish a visual regression. Changing the required assertion or the prescribed preserved reboot specificity needs a ruling. The [agent-operation contract](/home/user/scaffold/.agents/orchestration.md), § Deviation protocol, requires stopping when a conflict blocks the objective.

Hypothesis: ruling 7 intends to prohibit precedence introduced by copying, while permitting the reboot’s existing precedence.

1. Acceptance results follow. “Not run” has no exit code; inherited build artifacts are not reported as builds executed during this run.

| Criterion | Expected | Measured this run | Exit |
|---|---|---|---|
| `build:src:bootstrap` | Successful build; prescribed digest | Not run; existing artifact digest matches | — |
| `build:src:tailwindcss` | Successful build; digest recorded | Not run; existing digest recorded below | — |
| U3 writers, twice | Equal record digests and status across runs | Neither run performed | — |
| `check:src:bootstrap` | Pass | Not run | — |
| `check:src:tailwindcss` | Pass | Not run | — |
| `check` | Pass | Not run | — |
| `lint:check` | Pass | Not run | — |
| `format:check` | Pass after owned-file formatting | Neither formatting nor gate performed | — |
| `test:src:bootstrap` | Pass | Not run | — |
| `test:src:tailwindcss` | Pass | Exact npm command not run; direct configured suite passes 5 tests | — |
| `test:setup` | Pass | Not run | — |
| `test:setup:browser` | Only the stated U6 failure permitted | Not run | — |
| Conformance: `Tailwind compatibility recipe` | Pass | Not run | — |
| `test:integration` observation | Every failing title recorded | Not run | — |
| `git diff --check` | No whitespace errors | Empty output | 0 |

These direct sheet commands each exited 0 with 5 passing tests:

```text
npx vitest run --config configs/src/vite.tailwindcss.config.ts
npx vitest run --config configs/src/vite.tailwindcss.config.ts --silent=false --reporter=verbose
```

The scoped-witness repair passes: every matched element equals Bootstrap alone, and every row’s removal control differs. The border-width assertions also pass.

The diagnostic command exited 1:

```text
npx vitest run --config tmp/units/flip-sheet-2/vite.precedence.config.ts
```

Its complete output follows:

```text
 RUN  v4.1.11 /home/user/veneer

stdout | tmp/units/flip-sheet-2/precedence.test.ts > measures the focused button copy against the focus ring component
{"state":{"focused":true,"visible":false,"outline":"rgb(0, 0, 0) none 0px"},"pairs":[{"selector":".focus-ring:focus","specificities":[{"a":0,"b":2,"c":0}],"properties":[{"name":"outline","value":"0","implicit":false,"text":"outline: 0;","disabled":false,"range":{"startLine":7653,"startColumn":4,"endLine":7653,"endColumn":15},"longhandProperties":[{"name":"outline-color","value":"initial"},{"name":"outline-style","value":"initial"},{"name":"outline-width","value":"0px"}]},{"name":"outline-color","value":"initial"},{"name":"outline-style","value":"initial"},{"name":"outline-width","value":"0px"}],"line":7652,"layers":[{"text":"bootstrap","range":{"startLine":7651,"startColumn":7,"endLine":7651,"endColumn":16},"styleSheetId":"style-sheet-29704-1"}]},{"selector":"button:focus:not(:focus-visible):where(.modal-title, .offcanvas-title, .popover-header, .card-title, .card-text, .accordion-header, .pagination, .placeholder-glow, .stretched-link, .visually-hidden-focusable, .alert-link, .card-link, .icon-link, .link-primary, .link-secondary, .link-success, .link-danger, .link-warning, .link-info, .link-light, .link-dark, .link-body-emphasis, .lead, .display-1, .display-2, .display-3, .display-4, .display-5, .list-unstyled, .focus-ring)","specificities":[{"a":0,"b":2,"c":1}],"properties":[{"name":"outline","value":"0","implicit":false,"text":"outline: 0;","disabled":false,"range":{"startLine":835,"startColumn":4,"endLine":835,"endColumn":15},"longhandProperties":[{"name":"outline-color","value":"initial"},{"name":"outline-style","value":"initial"},{"name":"outline-width","value":"0px"}]},{"name":"outline-color","value":"initial"},{"name":"outline-style","value":"initial"},{"name":"outline-width","value":"0px"}],"line":834,"layers":[{"text":"bootstrap","range":{"startLine":833,"startColumn":7,"endLine":833,"endColumn":16},"styleSheetId":"style-sheet-29704-1"}]}]}

 ❯ |flip-sheet-3-precedence| tmp/units/flip-sheet-2/precedence.test.ts (1 test | 1 failed) 488ms
   × measures the focused button copy against the focus ring component 487ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |flip-sheet-3-precedence| tmp/units/flip-sheet-2/precedence.test.ts > measures the focused button copy against the focus ring component
AssertionError: copy specificity must not exceed the matching component: expected 201 to be less than or equal to 200
 ❯ tmp/units/flip-sheet-2/precedence.test.ts:36:109
     34|   const left = requireValue(copy.specificities[0])
     35|   const right = requireValue(component.specificities[0])
     36|   expect(left.a * 10000 + left.b * 100 + left.c, 'copy specificity mus…
       |                                                                                                             ^
     37|  } finally {
     38|   await browser.close()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  09:59:14
   Duration  1.59s (transform 343ms, setup 590ms, import 341ms, tests 488ms, environment 0ms)
```

The source-line ellipsis is Vitest’s output. The native specificity readings are also saved in [precedence-reading.json](/home/user/veneer/tmp/units/flip-sheet-2/precedence-reading.json).

2. The folded table contains **30 reboot, 10 restore, and 6 scoped rows**. Each separately named reboot or restore row reads exactly **1 element**.

| Form | Classes or selectors | Longhands |
|---|---|---|
| reboot | `modal-title`, `offcanvas-title`, `card-title`, `accordion-header` | `font-size, font-weight` |
| reboot | `popover-header` | `font-weight` |
| reboot | `card-text`, `pagination`, `placeholder-glow`, `lead`, `display-1`, `display-2`, `display-3`, `display-4`, `display-5`, `list-unstyled` | `margin-block-end, margin-bottom` |
| reboot | `stretched-link`, `visually-hidden-focusable`, `card-link` | `color, text-decoration-color, text-decoration-line` |
| reboot | `icon-link` | `color, text-decoration-line` |
| reboot | `alert-link`, `link-primary`, `link-secondary`, `link-success`, `link-danger`, `link-warning`, `link-info`, `link-light`, `link-dark`, `link-body-emphasis` | `text-decoration-line` |
| reboot | `focus-ring` | `color` |
| restore | `svg:where(.bi)`, `img:where(.figure-img)`, `img:where(.img-fluid)` | `display` |
| restore | `img:where(.card-img)`, `img:where(.card-img-top)`, `img:where(.card-img-bottom)` | `max-width` |
| restore | `input:where(.form-check-input)`, `input:where(.btn-check)`, `input:where(.form-range)` | `color` |
| restore | `button:where(.accordion-button)` | `font-weight` |
| scoped | `:where(.table)` followed by `thead`, `tbody`, `tfoot`, `tr`, `th`, or `td` | Four physical border colors; `tbody` also reads `border-top-width` |

The inventory follows the [audit’s disposition table and items 2–4 and 8](/home/user/scaffold/tmp/codex/flip-curation-audit-last.md), [probe curation](/home/user/veneer/tmp/probes/flip4/curation.json), and [design verdict §12](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md), amended by the supplied briefs.

The scoped readings follow. Color tuples are top, right, bottom, left. `D` means `rgb(222, 226, 230)`, `F` means `rgb(33, 37, 41)`, `V` means `rgb(166, 181, 204)`, and `B` means `rgb(0, 0, 0)`. Bootstrap alone and the recipe agree on every tuple shown.

| Scoped selector | Elements read | Plain reading | Hazard reading | Recipe with repair removed |
|---|---:|---|---|---|
| `:where(.table) thead` | 1 | `D,D,D,D` | Not prescribed | `F,F,F,F` |
| `:where(.table) tbody` | 2 | `D,D,D,D`; top width `0px` | Divider: `F,D,D,D`; top width `2px` | Both `F,F,F,F`; widths remain `0px` and `2px` |
| `:where(.table) tfoot` | 1 | `D,D,D,D` | Not prescribed | `F,F,F,F` |
| `:where(.table) tr` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Plain `F,F,F,F`; variant unchanged |
| `:where(.table) th` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Both `B,B,B,B` |
| `:where(.table) td` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Both `B,B,B,B` |

3. The passing derivation proof computes and pins **73 originals, 72 curated copies, and 7 scoped copies**. The scoped copies are:

| Original selector | Copy selector |
|---|---|
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) thead` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tbody` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tfoot` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tr` |
| `th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) td` |

4. The precedence measurement is the focused-button counterexample reported earlier. The exhaustive precedence case and its planted `.table tr` control remain **unimplemented**. No exhaustive pair coverage or planted-control failure is claimed.

5. The witness case measures these widths under the **compiled recipe**. Each tuple is top, right, bottom, left.

| Witness | Bootstrap alone | Compiled recipe |
|---|---|---|
| `a.card-link` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `svg.bi` inside `.btn` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.btn-check[type=checkbox]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.form-range[type=range]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |

6. SHA-256 readings follow. No Sass source changed during this continuation; the drop-in files are the preceding run’s before/after artifacts, rehashed here.

| Artifact | Digest |
|---|---|
| Existing default Bootstrap sheet | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `$layered: false`, saved before artifact | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| `$layered: false`, saved after artifact | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| Existing Tailwind sheet | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` |
| Fixture recipe, unchanged | `bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487` |
| App recipe, unchanged | `5ded778d82f8057384cc69fcd8c0333d312dd931dc2004d6f21f6999789c70eb` |

Neither writer ran. Digests across two writer runs, record `sheet` equality, and writer status repeatability remain unproved.

7. Observations follow.

- `test:integration` was not run; no integration failure titles are claimed.
- Grid-track and `position-area` departures remain geometry exclusions.
- The `a.nav-link` color channels require the scrollspy state snapshot.
- `-webkit-text-fill-color` is not invisible by definition.
- Launch HEAD was `1b15a22`, carrying U4’s commit. The ten modified tracked files matched this continuation’s authorized launch state.
- No agent was spawned, no unowned tracked file changed, and nothing was committed.

8. This continuation edited the [guide’s scoped rows](/home/user/veneer/guides/veneer.md:1330) and the [witness case](/home/user/veneer/tests/src/tailwindcss/index.test.ts:218). The remaining tracked modifications were inherited. Formatting remains pending.

Final `git status --porcelain` is:

```text
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_reset.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

The diagnostic files are under [tmp/units/flip-sheet-2](/home/user/veneer/tmp/units/flip-sheet-2). Every entry under [tmp/probes/flip4](/home/user/veneer/tmp/probes/flip4), including its `sass/`, `sheets/`, `out/`, and `report/` trees, belongs to `flip-probe-3`, is **not mine**, and remains unchanged.