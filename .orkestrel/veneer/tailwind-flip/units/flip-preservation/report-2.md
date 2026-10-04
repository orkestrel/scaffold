# Flip-preservation-2 report — stopped

The gate reads **zero unattributed departures**, but rejects **14 dependent preflight departures at each width** on carousel indicator buttons. The focused command exits **1** with **28 rejected readings**. The first brief's preflight stop and the failing-title stop remain in force. No tracked file changed after this gate run. Nothing is committed.

## Findings

The measured population is the main region's component carriers and lifted-rule descendants, grouped by tag, sorted classes, nearest `data-bs-theme`, and open state. Both faces read the same mounted elements. Each physical/logical pair counts once under its physical name, with departing logical names retained in `logical`. Every population element receives the box check; longhands use the first element per signature and its ancestors in document order. These readings cover Chromium, the default light variant, element longhands, and the widths shown; they do not cover pseudo-element longhands or other interaction states.

The focused run reports the following counts. The preflight column includes dependent causes and therefore overlaps the dependent column; the stored `causes.preflight` counter counts direct preflight only and is 0 at both widths. All 14 dependent readings at each width have `cause: 'preflight', through: 'color'`; the assertion reads those causes and rejects them.

| Width | Elements | Signatures | Utility | Resolved | Dependent | Admitted | Excluded chrome / outer shell | Preflight including dependent | Unattributed | Inherited |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 9611 | 1455 | 3282 | 72 | 14 | 3 | 218 | 14 | 0 | 0 |
| 390 | 9611 | 1455 | 3284 | 14 | 14 | 3 | 218 | 14 | 0 | 0 |

The exclusion count is the collected carrier population outside `main`: it includes the banner, skip link, Contents region, and outer shell carriers. The gate collects 9829 carriers before the main-region restriction. No carrier outside main enters attribution.

The bounded exclusions and box readings are:

| Width | Layout | Typography | Invisible | Tab-size / shorthand | Position-area | Grid tracks | Boxes before | Lost boxes | Width timer, seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 3336 | 0 | 3220 | 1455 | 0 | 7 | 9358 | 0 | 27.4779 |
| 390 | 2620 | 0 | 3216 | 1455 | 0 | 2 | 9168 | 0 | 20.9344 |

The case's internal timer is **48.5274 s**, its runner timer **48.991 s**, Vitest wall time **59.05 s**, and launcher wall time **60.657 s**, uncapped. The internal timer is **4.4726 s below** the archived partition's 53 s focused reading and below the 300 s case timeout. The case's contribution inside a full journey is unmeasured: that run was not reached. The archived 449 s and 487 s journey readings remain comparison references, not measurements of this tree. No other test suite ran alongside this focused command.

### Remaining groups

There are no remaining unattributed groups. The remaining rejected groups are preflight through `color`. Both signatures belong to **Slides with indicators, controls, and captions**, in the figure labelled by `carousel-slides-title`. The representative elements are the empty `Route 1` and `Route 2` indicator buttons in `app/browser/sections/carousel.html`; signature grouping also covers matching elements elsewhere.

Each following row occurs once per signature at **1280 and 390**, for 28 rejected readings in the focused run. Both faces' dependent value equals that element's `color`; no logical twin applies to these properties.

| Signature | Element | Classes | Longhand | Bootstrap | Tailwind + layer | Cause |
| --- | --- | --- | --- | --- | --- | --- |
| `["button",["active"],"light",false]` | button | active | caret-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | column-rule-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | outline-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | text-decoration-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | text-emphasis-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | -webkit-text-fill-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",["active"],"light",false]` | button | active | -webkit-text-stroke-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | caret-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | column-rule-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | outline-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | text-decoration-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | text-emphasis-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | -webkit-text-fill-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |
| `["button",[],"light",false]` | button | none | -webkit-text-stroke-color | rgb(0, 0, 0) | rgb(33, 37, 41) | preflight through color |

The first run's explicitly named residuals have these outcomes:

| Earlier residual | Outcome at both widths |
| --- | --- |
| `dl.row`, `margin-bottom`, 16px → 0px | admitted; `logical: ['margin-block-end']`; reason `typography-documented-description` |
| `dd.col-sm-9`, `margin-bottom`, 8px → 0px | admitted; `logical: ['margin-block-end']`; same reason |
| `dd.col-sm-8`, `margin-bottom`, 8px → 0px | admitted; `logical: ['margin-block-end']`; same reason |
| Active carousel indicator, `text-decoration-color`, rgb(0, 0, 0) → rgb(33, 37, 41) | dependent preflight through color; rejected |
| Classless carousel indicator, `text-decoration-color`, rgb(0, 0, 0) → rgb(33, 37, 41) | dependent preflight through color; rejected |
| Header face button, `z-index`, 1 → auto | outside main; excluded with chrome; no component departure recorded |

Every required admitted signature occurs at each width; `missing` is empty. The figure has no literal `id`; its `aria-labelledby="typography-documented-description-title"` identifies the prescribed specimen, and the reason records `typography-documented-description`.

### Deviation

**Expected:** no preflight or unattributed departure outside the admitted set after the ruled attribution changes.

**Found:** zero unattributed, but 14 dependent preflight readings per width remain outside the admitted set. The failing title is `showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths` in `journey:light-1280`. It is absent from the lanes file's Host-bound set.

**Evidence:** the complete canonical inventory is [readings-2.json](readings-2.json). The unabridged command streams are [gate-2.log](gate-2.log) and [gate-2.err](gate-2.err). The assertion at `tests/app/browser/integration.test.ts:1282` reads `AssertionError: expected [ …(28) ] to deeply equal []`.

**Done:** continued the inherited edits; centralized `PHYSICAL_LONGHANDS` in `tests/setupStyles.ts` with TSDoc and a Chromium mapping proof; routed attribution and partition normalization through it; counted twins once; retained dependent causes with `through: 'color'`; restricted the gate to main; classified the prescribed description-list margins as admitted; added focused helper cases; ran check, lint, format, and the focused gate.

**Not done:** production controls, caption rows, a guide sentence for acceptance, the full setup/browser/journey suites, and full-journey timing. No fold, exclusion expansion, source, sheet, guide, or configuration edit was made.

**One hypothesis:** the remaining rejection is at the boundary between dependent attribution and the invisible-color exclusion. The indicator markup carries no text, the gate excludes a textless element's own `color`, and dependent attribution calls `attributeDeparture(element, 'color', …)` without propagating that exclusion. This records preflight for the dependents. The run does not establish a visible component break. No follow-up mutation or browser probe ran after the stop.

## Controls

The production stripped-curation and planted-preflight controls were not reached because the ordinary gate failed at both widths. Neither has a failing line from this run, and neither mutated the page. The caption wrong-value control was not reached. No control result is claimed for them.

The development helper selection passed **8 tests**, with **132 excluded by the title filter**, in **12.62 s** Vitest wall time, exit **0**. It exercised the browser mapping with each logical declaration removed as a control; physical/logical utility attribution with the carrier class removed; the inherited resolved-to-preflight control; twin counting; a dependent color that follows the color and a text-decoration color that does not; description-list admission removed by changing the figure identifier; and the existing planted-preflight and lost-box helper controls. The removal control inside the existing preservation case requires the comparison to throw `to deeply equal []`. These helper controls do not replace the unrun production controls.

The exact development command was:

```text
npx vitest run --config vite.config.ts --project setup:browser tests/setupStyles.test.ts tests/setupBrowser.test.ts -t 'logical|dependent colors|description-list spacing|component carriers|planted preflight|retained Bootstrap'
```

Rendered claims used Vitest Chromium, not `prove`: the installed `@orkestrel/probe` 0.0.19 runtime creates a specification with the `threads` pool. No probe receipt is claimed.

## Caption rows and guide sentence

No `TAILWIND_READINGS` row was added. The F7 specimens and S7 description-list caption remain unmeasured by this continuation; no three-face caption readings are claimed. The continuation brief places this work after a passing gate.

The guide remains unchanged. No guide sentence was advanced for acceptance because the gate failed. The target row remains **Tailwind + layer**; the conditional proposal in the first report is not a passing claim.

## Acceptance

The final sequence ran in the prescribed order up to the stop. Read-only final diff, digest, and status commands followed it for the report. Browser gates after the focused gate did not run.

| Command | Expected | Measured | Exit |
| --- | --- | --- | --- |
| `npm run check` | No type errors | Passed on final tracked tree; 55.591 s launcher | 0 |
| `npm run lint:check` | No warnings or errors | Passed on final tracked tree; 1.672 s launcher | 0 |
| `npm run format:check` | Owned files formatted, tree check clean | All matched files formatted; 4.233 s launcher | 0 |
| Focused gate, exact command below | No rejected component departures | 1 failed, 21 skipped by title selection; 28 rejected dependent preflight readings; 60.657 s launcher | 1 |
| `npm run test:setup:browser` | Setup project passes | Not run after stop; focused development result is not a full-suite result | Not run |
| `npm run test:app:browser` | App browser project passes | Not run after stop | Not run |
| `npm run test:journey` | Failures confined to Host-bound set | Not run after stop; the focused added title itself is not host-bound | Not run |
| `git diff --check` | No whitespace errors | No output | 0 |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | Both prescribed digests unchanged | Both match | 0 |
| `git status --porcelain` | Only owned files | Exactly the owned paths listed below | 0 |

The exact focused command was:

```text
npx vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t "attributes every component departure" tests/app/browser/integration.test.ts
```

The five owned files were formatted with `npx oxfmt --config .oxfmtrc.json --write` before the acceptance format check. Later type and lint corrections were formatted only in their touched owned files.

Earlier attempts are retained separately. `check-2` exited 2 on an `exactOptionalPropertyTypes` mismatch in the report fields; `check-2b` passed. `lint-2` exited 1 on two unsupported second arguments to `expect` and a shadowed `elements` binding. After those fixes, `check-2c`, `lint-2b`, and `format-2` passed in order on the final tracked tree. Their complete outputs and exits remain in the correspondingly named `.log` and `.err` files in this folder. No failure output is overwritten.

## Digests and tracked status

The final digest command reports:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  dist/src/bootstrap/index.css
b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662  dist/src/tailwindcss/index.css
```

HEAD remains `bc35a3e`. The final `git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

The changes include the first run's uncommitted work. No subagent, install, network request, commit, or write outside the owned files and `tmp/units/flip-preservation` ran in this continuation. The unit remains unaccepted at the specified deviation stop.
