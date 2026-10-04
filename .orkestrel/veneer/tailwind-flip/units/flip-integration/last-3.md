U4’s integration work passes **54/54 cases**. Acceptance remains blocked by one **U6-owned, non-host-bound** failure in `test:setup:browser`; its files remain untouched. Nothing was committed.

The record results are:

| Record | Rows before → after | Result |
|---|---:|---|
| `preflight.json` | 2598 → 2595 | `chromium: 141`; both writer repeats preserve identical bytes |
| `incompatible.json` | 2326 → 1870 | Changed under `[built, unexcluded]`; both repeats write nothing |

These changes were inherited from the second run and verified again. SHA-256 values against `HEAD` are:

```text
preflight.json
before 50227e6ebdf9441368685a248dc780efa70c9aec1ab83451516b360ead91f66d
after  b268723cd388e7711e535fa0d153295a256f9018da6d8b61718fd11b42728430

incompatible.json
before ae0c20e3819134e94333b9375592ef2d658f9330ce3648e5462d8cd8b953c124
after  315d0306b2e68ca0fa44a50f550c77606e07300565707ebf364be3931fe6cd5f
```

The preflight diff contains 14 updated, 16 removed, and 13 added rows:

| Element | Longhands changed |
|---|---|
| Form controls and their recorded pseudos | Removed 16 `row-rule-color` rows |
| `button` | Updated `background-color` |
| `input`, `textarea` | Updated `inline-size`, `width`, `perspective-origin`, `transform-origin` |
| `select` | Updated `background-color`, `block-size`, `height`, `perspective-origin`, `transform-origin` |
| `table` | Added eight physical/logical border-color rows |
| `img::backdrop` | Added `overflow-block`, `overflow-inline`, `overflow-x`, `overflow-y`, and `overflow-clip-margin` |

The 2595-versus-2594 prediction difference is five image-backdrop additions minus four predicted `html` font-family additions absent from this reading. No row was discarded. The pre-regeneration portable reading accepts **502 reproduced and 2096 skipped rows**, with eight permitted unrecorded `table` rows. See the [complete preflight diff](/home/user/veneer/tmp/units/flip-integration/preflight-diff.json).

The incompatible diff adds 304 rows and removes 760, with no retained row’s values changed. Only `border` and `border-0` through `border-5` change, on the eight physical/logical border-style longhands. See the [incompatible diff](/home/user/veneer/tmp/units/flip-integration/incompatible-diff-3.json).

The reverse-order measurements report **no differing witness longhands and no incompatible-delta differences**. The unexcluded text opens with its banner, `@layer properties;`, then the shared order statement.

The witness case passes using the recipe’s `base` declarations and upstream `bootstrap-reboot.css` as the independent reboot declaration source. Every heading reads **`rgb(33, 37, 41)`**. Heading `line-height` compares at the declared **1.2 ratio**; no other moved R-minus-P property required a ratio exception.

CSSOM exposes omitted border colors from `border: 0 solid` as `initial`. The case classifies those physical border-color longhands as `currentColor`, as the ruling requires. No other witness value-class exception was needed.

The measured per-witness counts are:

| Witness | Inherit | Current color | Absolute/resolved |
|---|---:|---:|---:|
| `h1` | 2 | 4 | 22 |
| `h2` | 2 | 4 | 22 |
| `h3` | 2 | 4 | 22 |
| `h4` | 2 | 4 | 22 |
| `h5` | 2 | 4 | 22 |
| `h6` | 2 | 4 | 22 |
| `p` | 0 | 4 | 22 |
| `a[href]` | 5 | 4 | 22 |
| `img` | 0 | 4 | 26 |
| `svg` | 0 | 4 | 24 |
| `ul` | 0 | 4 | 25 |
| `button` | 20 | 4 | 29 |
| `input[type=text]` | 20 | 4 | 28 |
| `small` | 0 | 4 | 23 |
| `table` | 4 | 0 | 24 |
| `hr` | 1 | 4 | 23 |
| `label` | 0 | 4 | 22 |
| `legend` | 0 | 4 | 22 |
| `pre` | 0 | 4 | 26 |
| `code` | 0 | 4 | 26 |
| `kbd` | 0 | 4 | 26 |
| `mark` | 0 | 4 | 22 |
| `sup` | 0 | 4 | 27 |
| `sub` | 0 | 4 | 27 |
| `figure` | 0 | 4 | 22 |
| `dl` | 0 | 4 | 22 |
| `dt` | 0 | 4 | 22 |
| `dd` | 0 | 4 | 22 |
| `blockquote` | 0 | 4 | 22 |
| Page `body` | 0 | 4 | 22 |

See the [class-count artifact](/home/user/veneer/tmp/units/flip-integration/witness-classes.json).

The case dispositions in `preflight reset drift` are:

| Case | Disposition |
|---|---|
| `pins the live moved rows in both directions with planted and removed controls` | Amended: version gate, unconditional portable branch, both controls, and three-face composition readings |
| `restores every recorded longhand with base revert counters and fails with counters stripped` | Deleted: retired counter mechanism |
| Thumbnail case | Amended and renamed `keeps preflight and thumbnail max-width and lets an unlayered consumer win` |
| `keeps preflight declarations by value class and reboot declarations that preflight never writes` | Added: witness comparison and deleted-base/reset controls |

The dispositions in `compiled Tailwind compatibility recipe` are:

| Case | Disposition |
|---|---|
| `keeps hidden elements hidden and records the display utility departure` | Amended: three faces and bare `hidden="until-found"` |
| `places properties below reset and rejects a separate Veneer sheet loaded first` | Kept; renamed binding to `tuned`; 2px/1px readings pass |
| Bare-image/list restoration case | Amended and renamed `reads preflight on bare headings, paragraphs, images, and lists and rejects a deleted base` |
| Sized-image case | Amended and renamed `lets preflight auto height override a sized image attribute under both Tailwind faces`; 24px/48px/48px |
| `keeps a reset layer value under the recipe and rejects a revert mirror` | Deleted; replaced by the witness case |

The dispositions in `computed Tailwind class relationships` are:

| Case | Disposition |
|---|---|
| Shared-name partition case | Amended and renamed `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap`; 192 utilities and 17 components |
| `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` | Deleted; replaced by the record case’s composition clause |
| Collapse case | Amended compositions; compares class deltas and explicitly pins visibility |
| Disjoint-layer case | Amended: exempts exactly `(0, 1)`, proves their overlap, and retains `(2, 3)` |
| Composed-border case | Amended raw composition; adds recipe-only bare `border-2: solid` |
| `refuses a separate Bootstrap sheet beside the recipe because its important utility wins` | Added: 16px/12px/16px |
| `pins the recipe CSSOM declaration sequence to the tuned sheet with the measured merge` | Added with planted-rule control |

Two comparison details were settled:

- Literal delta-map equality differs for `border-black`: it is inert on Tailwind’s black baseline but changes the recipe’s baseline. The implementation compares rendered values over the **union of both delta sets**.
- `border-0` is repeated in isolation yet incompatible in the raw composition. The case pins that measured exception.

`readPreflightValues` also required correction: Chromium reused a preceding host’s backdrop reading. Each element receives an isolated frame. The regression fails with the original reader (`visible` versus `clip`) and passes with the correction. The scoped instrument suite passes **34 cases**.

The CSSOM sequence contains **8042 tuned rows and 8041 recipe rows**. Its sole omitted declaration is:

```text
context:  ""
layer:    bootstrap
selector: .dropstart .dropdown-toggle::after
property: display
value:    inline-block
priority: ""
```

Empty layer blocks contribute no declaration rows. **No extra difference** appears.

The three host-bound titles map as follows:

| Original title | Fate and successor exit |
|---|---|
| `preflight reset drift > pins the live moved rows in both directions with planted and removed controls` | Kept and amended; **0** |
| `preflight reset drift > restores every recorded longhand with base revert counters and fails with counters stripped` | Deleted; witness successor **0** |
| `computed Tailwind class relationships > restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` | Deleted; record composition successor **0** |

The ordered acceptance results are recorded in the [gate log](/home/user/veneer/tmp/units/flip-integration/gates-3.log) and [error log](/home/user/veneer/tmp/units/flip-integration/gates-3.err):

| Command | Exit / result |
|---|---|
| Writers through `vite.writers.config.ts`, twice | **0, 0**; both files only; identical digests and status |
| `npm run test:setup` | **0**; 153 passed |
| `npm run test:setup:browser` | **1**; 125 passed, one U6-owned failure |
| Integration `-t "preflight reset drift"` | **0**; 3 passed |
| Integration `-t "compiled Tailwind compatibility recipe"` | **0**; 4 passed |
| Integration `-t "computed Tailwind class relationships"` | **0**; 6 passed |
| `npm run test:integration` | **0**; 54 passed |
| `npm run check` | **0** |
| `npm run lint:check` | **0** |
| `npm run format:check` | **0** |
| `git diff --check` | **0** |
| Both sheet digest checks | **0**; prescribed values unchanged |

The unresolved failure is:

```text
tests/setupBrowser.test.ts:827
specimen readings >
reads every Tailwind reading the caption claims under both stylesheet sets
```

Expected image/list values: `inline`, `disc`. Found: `block`, `none`. This title is **not host-bound**. Its expectations reside in U6’s off-limits `TAILWIND_READINGS`; no U6 file was changed.

The fresh baseline `npm run test:integration` exited **1**, with 8 failed and 46 passed. Every failing title and ruling is:

| Failing title | Host-bound? |
|---|---|
| `preflight reset drift > restores every recorded longhand with base revert counters and fails with counters stripped` | Yes |
| `compiled Tailwind compatibility recipe > restores bare images and lists to lifted Bootstrap and rejects a removed mirror` | No |
| `compiled Tailwind compatibility recipe > keeps the height attribute of a sized image under the recipe and rejects a revert mirror` | No |
| `compiled Tailwind compatibility recipe > keeps a reset layer value under the recipe and rejects a revert mirror` | No |
| `computed Tailwind class relationships > partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe` | No |
| `computed Tailwind class relationships > restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` | Yes |
| `computed Tailwind class relationships > keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed` | No |
| `computed Tailwind class relationships > keeps every pair of built sheets disjoint in each shared layer` | No |

The final integration run has **no failing title**. `cross-face composition` remains byte-identical.

The final sheet digests are:

```text
bootstrap
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f

tailwindcss
f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40
```

The writers remain at [preflight-record.test.ts](/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts), [incompatible-record.test.ts](/home/user/veneer/tmp/units/flip-integration/incompatible-record.test.ts), and [vite.writers.config.ts](/home/user/veneer/tmp/units/flip-integration/vite.writers.config.ts).

Edited tracked files, including inherited U4 changes, are:

- [preflight.json](/home/user/veneer/tests/fixtures/tailwindcss/preflight.json)
- [incompatible.json](/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json)
- [integration.test.ts](/home/user/veneer/tests/integration.test.ts)
- [setup.ts](/home/user/veneer/tests/setup.ts)
- [setup.test.ts](/home/user/veneer/tests/setup.test.ts)
- [setupStyles.ts](/home/user/veneer/tests/setupStyles.ts)
- [setupStyles.test.ts](/home/user/veneer/tests/setupStyles.test.ts)

This run formats only `integration.test.ts`, `setupStyles.ts`, and `setupStyles.test.ts`. All required acceptance commands ran. No build ran; no build skip line was emitted.

Final `git status --porcelain` is:

```text
 M tests/fixtures/tailwindcss/incompatible.json
 M tests/fixtures/tailwindcss/preflight.json
 M tests/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

No uncommitted U3 entries appear. The 110 ignored `flip-probe-3` files are **not mine**, remain untouched, and are listed in [foreign-files-3.txt](/home/user/veneer/tmp/units/flip-integration/foreign-files-3.txt).