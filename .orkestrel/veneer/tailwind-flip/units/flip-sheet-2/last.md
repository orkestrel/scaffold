Stopped with a conflict between the prescribed `tr` witness and its required removal control. The fold is incomplete and uncommitted.

Expected: deleting `:where(.table) tr` makes the prescribed witness depart from Bootstrap alone.

Measured: Bootstrap alone, the recipe, and the recipe with that scoped rule removed all read `rgb(166, 181, 204)` on each cell border. The equality assertion passes; the removal assertion fails.

Evidence: [the witness case](/home/user/veneer/tests/src/tailwindcss/index.test.ts:218), implementing brief rulings 5–6. The [agent-operation contract](/home/user/scaffold/.agents/orchestration.md) § Deviation protocol requires stopping when a conflict blocks the objective.

Hypothesis: `.table-primary` supplies the row’s border color, so this witness cannot expose removal of the weaker scoped rule. A plain-row control needs a separate ruling. I left the assertion intact.

1. Acceptance results follow. “Not run” has no exit code.

| Criterion | Expected | Measured | Exit |
|---|---|---|---|
| `build:src:bootstrap` | Build succeeds; required digest | Pass; digest matches | 0 |
| `build:src:tailwindcss`; writers twice | Build succeeds; records repeat identically | Build passes; writers not run | 0 / — |
| `check:src:bootstrap` | Pass | Not run | — |
| `check:src:tailwindcss` | Pass | Not run | — |
| `check` | Pass | Not run | — |
| `lint:check` | Pass | Not run | — |
| `format:check` | Pass | Not run; edits remain unformatted | — |
| `test:src:bootstrap` | Pass | Not run | — |
| `test:src:tailwindcss` | Pass | Exact npm command not run; direct configured suite has 4 passing tests and 1 failure | 1 |
| `test:setup` | Pass | Not run | — |
| `test:setup:browser` | Pass | Not run | — |
| Conformance: `Tailwind compatibility recipe` | Pass | Not run | — |
| `git diff --check` | No whitespace errors | Pass; empty output | 0 |

The failed command was `npx vitest run --config configs/src/vite.tailwindcss.config.ts`. Its complete output follows, with terminal styling removed:

```text
 RUN  v4.1.11 /home/user/veneer

 ❯ |src:tailwindcss (chromium)| tests/src/tailwindcss/index.test.ts (5 tests | 1 failed) 2561ms
     × pins every curation witness against the lifted sheet and rejects each removed repair 2177ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |src:tailwindcss (chromium)| tests/src/tailwindcss/index.test.ts:218:2 > tailwindcss entry > pins every curation witness against the lifted sheet and rejects each removed repair
AssertionError: removed scoped :where(.table) tr: expected [ 'rgb(166, 181, 204)', …(3) ] to not deeply equal [ 'rgb(166, 181, 204)', …(3) ]

Compared values have no visual difference.

 ❯ tests/src/tailwindcss/index.test.ts:268:66
    266|    })
    267|    expect(readings[1], `${row.form} ${row.selector}`).toEqual(readings…
    268|    expect(readings[2], `removed ${row.form} ${row.selector}`).not.toEq…
       |                                                                  ^
    269|   }
    270|  })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 4 passed (5)
   Start at  09:49:46
   Duration  14.20s (transform 0ms, setup 530ms, import 92ms, tests 2.56s, environment 0ms)
```

The ellipses are Vitest’s own output, not report truncation.

2. The source and [guide table](/home/user/veneer/guides/veneer.md:1288) contain the prescribed 30 reboot, 10 restore, and 6 scoped rows. The table summarizes their longhands; grouped names remain separate guide rows.

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
| scoped | `:where(.table) thead`, `:where(.table) tbody`, `:where(.table) tfoot`, `:where(.table) tr`, `:where(.table) th`, `:where(.table) td` | `border-top-color, border-right-color, border-bottom-color, border-left-color` |

These edits use the [audit disposition table and items 2–4, 8](/home/user/scaffold/tmp/codex/flip-curation-audit-last.md), the [probe’s measured rows](/home/user/veneer/tmp/probes/flip4/curation.json), and [design verdict §12](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md), as amended by the brief’s appended rulings.

3. The passing derivation case computes and pins **7 scoped copies**, alongside **73 normal reboot originals** and **72 curated copies**. The scoped sequence follows the restore rows and precedes components.

| Original selector | Scoped copy selector |
|---|---|
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) thead` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tbody` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tfoot` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tr` |
| `th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) td` |

The derivation test passes its declaration-sequence and placement comparisons, including its existing planted controls. The witness case reaches the `tr` removal failure before testing the final `th` and `td` rows.

4. The precedence case is **not implemented**. No exhaustive copy/component pairs, measured specificities, source-order pairs, or planted `.table tr` failure are claimed.

5. The [scratch border-width case](/home/user/veneer/tmp/units/flip-sheet-2/readings.test.ts) passes, exit 0. Each tuple is top, right, bottom, left.

| Witness | Bootstrap alone | Preflight plus tuned sheet |
|---|---|---|
| `a.card-link` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `svg.bi` inside `.btn` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.btn-check[type=checkbox]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.form-range[type=range]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |

Limit: this scratch case loads raw preflight in `base` beside the tuned sheet. It does **not** use the compiled recipe, so the exact requested recipe-width measurement remains unfinished.

6. SHA-256 measurements follow.

| Artifact | Digest |
|---|---|
| Default Bootstrap, before and after | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `$layered: false`, before | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| `$layered: false`, after | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| Built Tailwind sheet | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` |
| Fixture recipe, unchanged | `bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487` |
| App recipe, unchanged | `5ded778d82f8057384cc69fcd8c0333d312dd931dc2004d6f21f6999789c70eb` |

Neither writer run occurred. Record repeatability and record `sheet` equality to the built digest remain unproved.

7. Observations follow.

- `npm run test:integration` was not run; no Tailwind describe outcomes are claimed.
- Per ruling 8 and audit item 6, grid-track and `position-area` departures are geometry exclusions.
- The `a.nav-link` color channels require the scrollspy state snapshot.
- `-webkit-text-fill-color` is not invisible by definition.
- Launch HEAD was `1b15a22`, carrying U4’s commit. Launch `git status --porcelain` was empty.
- No U4-owned code, guide prose, recipe record, or probe file was changed. No agent was spawned and nothing was committed.

8. The edited tracked files are exactly those in final `git status --porcelain`:

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

The ignored working artifacts belong to this unit under [tmp/units/flip-sheet-2](/home/user/veneer/tmp/units/flip-sheet-2). Every entry under [tmp/probes/flip4](/home/user/veneer/tmp/probes/flip4)—including its `sass/`, `sheets/`, `out/`, and `report/` trees, curation records, scripts, logs, and measurements—belongs to `flip-probe-3`, is **not mine**, and was left unchanged.