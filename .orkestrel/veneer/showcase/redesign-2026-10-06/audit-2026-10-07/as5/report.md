AS5 is implemented within the owned files. **Acceptance is not green:** two obsolete negative controls fail because R3 makes their planted percentages correct. Both files are outside the ownership list and remain untouched.

The [diff](/home/user/.wave/veneer-audit-links/tmp/units/as5/as5.diff) contains 16 owned files, 439 insertions and 172 deletions. The [complete evidence report](/home/user/.wave/veneer-audit-links/tmp/units/as5/report.md) records every deviation, evidence, resolution and hypothesis. No commits were made.

`./bootstrap` remains byte-identical:

| Check | Before | After |
|---|---:|---:|
| Bytes | 332,388 | 332,388 |
| Baseline `cmp` exit | 0 | 0 |

`git diff --check` passes; `git diff --stat -- src/browser` is empty.

The new `$unscoped` form defaults to empty in Bootstrap and maps `a` in Tailwind. It copies the complete link, hover and placeholder-undo rules at reboot specificity before components. No scoped breadcrumb row was added.

| Recipe proof | Light | Dark |
|---|---|---|
| Bare link and classed anchor without `href` | Underline; `rgb(21,93,252)` | Underline; `rgb(142,197,255)` |
| Hover | `rgb(17,74,202)` | `rgb(165,209,255)` |
| Neither `href` nor class | Inherited color; none | Inherited color; none |
| `no-underline`, `nav-link`, button anchor | None | None |

The undo rule contains literal `inherit`/`none`; disabling the three copies removes the bare-link underline. Component appearance remains intact.

All 16 percentage names now emit through the unchanged **unlayered important** emitter. Importance makes them beat Tailwind’s normal declarations.

| Reading | Recipe | Tailwind alone |
|---|---:|---:|
| `w-100`, 640px parent | 640px | 400px |
| `top-50` | 50% | 200px |
| `start-100` | 100% | 400px |
| Planted `w-full` | 640px | — |

| Derivation | Before | After |
|---|---:|---:|
| Withheld names | 192 | 176 |
| Dropped longhands | 104 | 100 |
| Names with dropped longhands | 62 | 58 |
| Logical equivalents | 84 | 80 |
| Initial values | 14 | 14 |
| Supplied | 6 | 6 |
| Exclusions | 1,833 | 1,833 |

The confinement case is **inverted** to `returns percentage names to Bootstrap markup beyond the sizing matrix`: canonical Bootstrap names work throughout the showcase again. All **11** carousel image sites use `d-block w-100`. The chrome substitution case remains unchanged.

The journey has **98 cases / 0 skipped**, with unchanged case entries, existing row-key order and statechart rows. Its result is **97 passed / 1 failed**, solely the obsolete progress control.

All **282 comparison differences** are [individually classified](/home/user/.wave/veneer-audit-links/tmp/units/as5/comparison-classification.md):

| Classification | Differences |
|---|---:|
| Expected preservation summaries, lines and journals | 168 |
| Expected bare-link readings | 57 |
| Raw row-order refusals from changed payloads/new rows | 4 |
| Signature-coverage findings | 2 |
| Partition-population findings | 24 |
| Partition-counter findings | 12 |
| New stripped-copy-control findings | 8 |
| Failed progress-control journal findings | 6 |
| Failed-title finding | 1 |

The aggregate findings follow the allowed markup changes and three new link copies. Partition violations remain empty. The seven failure-related findings remain unresolved pending the control patch.

Both showcase builds exited 0 and produced the same SHA-256:

`afc878dde8d8497db71cf55351a9aeacf73f2c3db71a173e54a2310d86e48df4`

The [rebuilt page](/home/user/.wave/veneer-audit-links/tmp/units/as5/showcase/browser.html) is archived; tracked showcase output was restored after acceptance captures.

Recaptures at **390 light, 1280 light and 390 dark** succeeded, with 72 sections under each face and no page errors. I inspected all five requested sections under Bootstrap and the layer against the supplied baseline. Links are blue and underlined; slides fill their parents; sizing bars and offset markers read percentages; the badge is visible at its canonical anchor. [Numeric readings](/home/user/.wave/veneer-audit-links/tmp/units/as5/capture-summary.json) confirm eight bars, seven visible slides and 27 offsets per face/viewport/theme combination. Slides have zero width error; offsets differ by at most 0.438px through rounding.

Every invocation’s **exact command, folder, exit and bare result**, including failed attempts and reruns, is in the [gate ledger](/home/user/.wave/veneer-audit-links/tmp/units/as5/gates.md). Final gate results are:

| Command | Folder suffix after `as5-` | Exit | Bare result |
|---|---|---:|---|
| `npm run build` | `build-final-01` | 0 | All src/app builds passed |
| `npm run format:check` | `format-01` | 0 | 369 files correctly formatted |
| `npm run lint:check` | `lint-03` | 0 | No diagnostics |
| `npm run check` | `check-01` | 0 | All TypeScript checks passed |
| `npm run test:src:tailwindcss` | `tailwindcss-02` | 0 | 14 passed |
| `npm run test:src:bootstrap` | `bootstrap-01` | 0 | 14 passed |
| `npm run test:src:styles` | `styles-01` | 0 | 15 passed; 1 existing todo |
| `npm run test:setup:browser` | `setup-browser-01` | 0 | 205 passed |
| `npm run test:app:browser` | `app-browser-01` | 1 | 245 passed; obsolete half-stage control failed |
| `npm run test:integration` | `integration-01` | 0 | 60 passed |
| `npm run test:guides` | `guides-01` | 0 | 20 passed |
| `npm run test:policy` | `policy-01` | 0 | 119 passed; 1 existing skip |
| `npm run test:config` | `config-01` | 0 | 227 passed; 1 existing skip |
| `npm run test:setup` | `setup-01` | 0 | 186 passed |
| `npm run test:conformance` | `conformance-01` | 0 | 130 passed |
| Full journey with JSON reporter | `journey-02` | 1 | 97 passed; obsolete progress control failed |
| Journey compare | `compare-02` | 67 | 282 differences, all classified |
| `npm run build:showcase` | `showcase-01`, `showcase-02` | 0 each | Equal hashes |
| Requested recaptures | `capture-390-light-01`, `capture-1280-light-01`, `capture-390-dark-01` | 0 each | No page errors |
| Capture measurement proof | `capture-proof-01` | 0 | All nine combinations passed |

`git status --porcelain`:

```text
 M app/browser/factories.ts
 M app/browser/recipe.json
 M app/browser/sections/carousel.html
 M app/browser/sections/position-utilities.html
 M app/browser/sections/tailwindcss.html
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/app/browser/factories.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/integration.test.ts
 M tests/setupBrowser.ts
 M tests/src/tailwindcss/index.test.ts
```

Authorize the [two-line control patch](/home/user/.wave/veneer-audit-links/tmp/units/as5/proposed-controls.patch): progress `w-25` → `w-50`, and half-stage `w-50`/`h-50` → `w-75`/`h-75`?

This requires confirmation because the brief’s explicit ownership list excludes `tests/app/browser/integration.test.ts` and `tests/app/browser/Showcase.test.ts`. Once authorized, I can apply the patch, update its guide description, and rerun app/browser, journey and comparison gates.