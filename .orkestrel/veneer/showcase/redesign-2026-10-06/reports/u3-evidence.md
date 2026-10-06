# U3 evidence

Worktree: `/home/user/.wave/veneer-redesign` (`WT`). Run root: `/home/user/veneer/tmp/units/journey-cost/runs` (`RUNS`). No commit made. Only the four owned test files changed.

Implementation and the full journey are complete. Acceptance is blocked by the reproducible U2 disclosure focusout defect: the final application suite has 242 passed / 1 failed. The brief forbids editing `app/`; the proposed five-line repair remains unapplied. The delivered diff is [redesign-u3.diff](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3.diff), 415 insertions and 46 deletions across the four files.

## Commands

Every queued command below expands through:

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder RUNS/FOLDER --kind KIND --cwd WT -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

`FOLDER` is the table's folder; `KIND` is `command`, except the full journeys use `journey`. `WT` and `RUNS` above stand for their absolute paths. These abbreviations describe the actual commands; they are not shell variables.

| Command key | COMMAND |
| --- | --- |
| format write | `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts` |
| format check | `WT/node_modules/.bin/oxfmt --config WT/.oxfmtrc.json --check tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts` |
| lint | `WT/node_modules/.bin/oxlint --config WT/.oxlintrc.json --deny-warnings tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts` |
| typecheck | `WT/node_modules/.bin/tsc --noEmit --project WT/tsconfig.json` |
| setup | `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project setup:browser` |
| app | `WT/node_modules/.bin/vitest run --config WT/vite.config.ts --configLoader runner --no-cache --reporter=dot --project app:browser` |
| journey | `CAPTURE=0 WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=RUNS/FOLDER/report.json` |
| navigation | `CAPTURE=0 WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --no-cache --reporter=dot --testNamePattern 'J1 arrives\|J3 browses\|scrollspy-1280'` (the actual regex uses literal `|`, without backslashes) |
| setup row | setup command plus `--testNamePattern 'drives every face and color-mode row through the header buttons'` |
| drawer | app command plus `--testNamePattern 'folds the contents into a drawer under the lg breakpoint and opens it from the Contents disclosure'` |
| partition witness | `CAPTURE=0 WT/node_modules/.bin/vitest run --config WT/configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-390 --testNamePattern 'partitions the shared names'` |
| classification | `node WT/tmp/units/redesign-u3-classify.ts` |

The direct compare command (run for each candidate folder listed in the results) is:

```sh
node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline RUNS/task75-u3-journey-1 --baseline RUNS/task75-u3-journey-2 --baseline RUNS/landing-7853d17-2-journey --candidate RUNS/FOLDER --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.md --registration 94/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out RUNS/FOLDER/compare.md
```

## Readings

The `Header height` logs agree for both Light and Dark and both unplanted passes:

| Face | 390 | 768 | 1280 |
| --- | ---: | ---: | ---: |
| Bootstrap | 116 px | 48 px | 48 px |
| Tailwind, no layer | 116 px | 48 px | 48 px |
| Tailwind + layer | 116 px | 48 px | 48 px |

The drawer case records `Contents pick Tab landing {"role":"button","name":"Shipping and delivery","section":"accordion"}`. It asserts `button.accordion-button`. The focused drawer run `redesign-u3-drawer-2` proves the link hit tests over Tooltips and Popovers, all 72 links, Escape, heading-click dismissal, and resize/planted-open controls before reaching the failing focusout assertion.

## Deviations

| Expected | Found and evidence | Action/status | Hypothesis |
| --- | --- | --- | --- |
| Shift+Tab from Containers through Contents to Dark folds the drawer. | `redesign-u3-app-1` and `redesign-u3-drawer-2` fail the visibility/class predicate after 5 seconds. Dark receives focus. U2 `d195bcf` installs a `focusout` listener on the panel but none on the sibling disclosure (`app/browser/Showcase.ts:117`). | Required assertion retained. Proposed `redesign-u3-u2-focusout.patch` passes `git apply --check` but is **not applied**; editing `app/` requires scope authorization. | The second reverse Tab leaves the disclosure, so neither the panel listener nor the click listener sees that transition. |
| Prescribed `clickAccessibleWithin('Contents', 'link', name)` resolves every section. | All four J3 variants in `redesign-u3-journey-1` fail at Background: two matches. The installed helper uses substring name matching. | `clickContents` uses the browser provider's exact scoped role/name locator; setup proof covers Background, Float, Text. | Exact names distinguish Background from Color and background, Float from Floating labels, Text from Text truncation. |
| J1 can use the existing `readPerception('Contents')`. | Both 390 variants in `redesign-u3-journey-1` report the region is not visible. The reader requires positive wrapper dimensions; U2's fixed panel leaves its region wrapper zero-height. | Read normalized `innerText` from the rendered panel; preserve both uppercase-label assertions. | Rendered panel text is the relevant perception surface after U2 moved it out of flow. |
| Next Tab after a fragment pick can use `pressKeys`. | U2 and the drawer case read body as active after the click. Installed `pressKeys` refuses body focus. | Send that one Tab through `userEvent.keyboard`, then assert the exact native focus landing. | Browser fragment-navigation focus origin remains at the picked section despite activeElement being body. |
| Header-neutrality case needs no edit (later brief bullet). | The brief's earlier explicit U2 ruling requires `auto-margin` attribution and its negative control. | Implemented the specific ruling: only the two named margin properties on a declared `ms-auto` element; the same captured departure stays unexplained when that class is removed for classification. | Used auto margins vary with already-attributed sibling widths. |
| Every initial gate is green. | Setup's header statechart timed out at 69 seconds; app's unchanged mapped-breakpoint case exhausted its 60-second budget; a journey Scrollspy row received no scrollend within 5 seconds. | Preserve failures and run targeted/full verification; no host-bound waiver, changed timeout, or row removal. | Timing may vary; only rerun results can establish whether the failures recur. |
| First full journey produces four artifacts and a classified design compare. | Eleven failures leave no portfolio artifacts; wrapper exits 65, child exits 1. Compare exits 67 with missing dark-1280.txt. | Run repaired candidate in fresh `redesign-u3-journey-2`; keep run 1 untouched. | Failed J1/J3 leave required states unplaced, preventing portfolio output. |
| Drawer routes execute in the brief's listed order. | The proven U2 focusout defect stops the original case before independent pick/hit-test/resize assertions. | Moved the same focusout proof to the end, after returning to 390; kept its exact keyboard route and failing predicate. | Ordering independent assertions exposes the remaining evidence without weakening the failing requirement. |
| All CPU work uses the host queue. | Initial lint invocations followed the brief's explicit direct-lint instruction. | Final lint and formatter gates use fresh queued folders, following the user's stricter queue direction. | The direct-gate bullet conflicts with the broader queue instruction. |

## First compare classification

`redesign-u3-journey-1/compare.md`, exit 67:

- **Outside** — `Evidence format: Error: Missing dark-1280.txt in /home/user/veneer/tmp/units/journey-cost/runs/redesign-u3-journey-1`. This is missing proof caused by the failed J1/J3 test adaptation, not an accepted design difference.

## Gate results

All folder names below resolve under `RUNS`. Each contains the wrapper's command in `start.json`, exit in `end.json`, and unabridged `stdout.log` / `stderr.log`.

| Command key | Folder | Exit | Bare result |
| --- | --- | ---: | --- |
| format write | redesign-u3-format-1 | 0 | Finished on 4 files. |
| typecheck | redesign-u3-typecheck-1 | 0 | No diagnostics. |
| setup | redesign-u3-setup-1 | 1 | 1 failed, 202 passed; 203 total. Header statechart timed out. |
| app | redesign-u3-app-1 | 1 | 2 failed, 241 passed; 243 total. Mapped-breakpoint timeout and drawer focusout failure. |
| journey | redesign-u3-journey-1 | 65 (child 1) | 11 failed, 83 passed; 94 total. Four missing portfolio artifacts. |
| compare | redesign-u3-journey-1 | 67 | Different: 1 difference; evidence format refused. |
| setup row | redesign-u3-setup-row-1 | 0 | 1 passed, 202 skipped; 203 total. |
| drawer | redesign-u3-drawer-2 | 1 | 1 failed, 242 skipped; 243 total. Focusout failure; remaining drawer assertions passed. |
| format write | redesign-u3-format-2 | 0 | Finished on 4 files. |
| navigation | redesign-u3-navigation-1 | 0 | 10 passed, 84 skipped; 94 total across four variants. |
| format write | redesign-u3-format-3 | 0 | Finished on 4 files. |
| app | redesign-u3-app-2 | 1 | 1 failed, 242 passed; 243 total. Only the U2 focusout defect remains. The unchanged mapped-breakpoint test passes. |
| setup | redesign-u3-setup-2 | 0 | 203 passed; 203 total. Both files pass, including the formerly timed-out header statechart. |
| typecheck | redesign-u3-typecheck-2 | 0 | No diagnostics. |
| format check | redesign-u3-format-check | 0 | All matched files use the correct format. |
| lint | redesign-u3-lint-check | 0 | No warnings or errors. |
| journey | redesign-u3-journey-2 | 0 | 94 passed; 94 total; all four variants pass; four artifacts copied. |
| compare | redesign-u3-journey-2 | 67 | Different: 669 differences. Every line classified below. |
| partition witness | redesign-u3-partition-witness | 0 | 2 passed, 22 skipped; 24 total in the dark-390 project. |
| classification | redesign-u3-classification | 0 | 669 lines classified; no unclassified line. |
| classification (with order proof added) | redesign-u3-classification-order | 0 | 669 lines classified; all 12 baseline/variant row-order proofs equal after substituting component-preservation payloads. |

Direct `git -C WT diff --check`: exit 0, no output. Direct `git -C WT status --porcelain`: exit 0:

```text
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

Initial direct lint exposed conditional-expect and shadowing diagnostics; after repair it exited 0 with no warnings or errors. The final queued lint below is the authoritative result for the delivered bytes.

## Final compare classification

[Every one of the 669 difference lines, classified individually and preserved in full](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-differences.md). The source is [the untouched compare output](/home/user/veneer/tmp/units/journey-cost/runs/redesign-u3-journey-2/compare.md).

| Classification against the literal §6 set | Lines |
| --- | ---: |
| Predicted — signature coverage, partition rows, Partition population and Partition lines/Journal copies | 114 |
| Predicted — Component preservation lines/Journal copies | 336 |
| Predicted — J3 minimum heading margins | 12 |
| Predicted — J1/J2 Contents Journal additions | 12 |
| Outside — component-preservation resolved rows | 168 |
| Outside — dark-390 row-order gate | 3 |
| Outside — unexcluded Partition control counts, in Lines and Journal | 24 |
| **Total: 474 predicted; 195 outside, attributed to U1/U2 below** | **669** |

The strict classification deliberately does not stretch “Component preservation line” to silently cover resolved rows, or “Partition” to cover the separately named “Partition control”. No contrast, engine, Tailwind-reading, 390-header, or Header-statechart difference occurs.

Outside evidence:

- **168 component-preservation rows:** these are the same `summary` object emitted as the explicitly predicted Component preservation line at `tests/app/browser/integration.test.ts:1582`, then serialized into a resolved row at line 1593. [All field deltas against all three baselines](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-preservation-deltas.json) are retained. Closed-state signatures increase by 3 (1744→1747 light, 1748→1751 dark); associated exclusion bookkeeping changes, and every state's excluded population decreases by 99. U1 `28ef330` adds `z-0` to selected card bodies, splitting their signatures; U2 `d195bcf` replaces two navigation copies with one and adds the disclosure. These are the signature/excluded changes the verdict explicitly predicts for that same summary's logged representation. U3 changed neither its collectors nor its summary/row serialization.
- **3 row-order lines:** all are dark-390, the host of those preservation rows. The comparator checks ordered complete row strings, so changed values trigger this gate even when row positions are unchanged. [The order proof](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-order-proof.json) applies the comparator's declared signature/partition moves, then replaces only the preservation JSON payload with a placeholder. All 12 baseline/variant comparisons are equal; 211 retained rows remain in the same sequence for dark-390. Thus no unexplained row movement exists.
- **24 unexcluded partition-control lines:** each baseline says 3107 at both widths; the candidate says 3109 at 1280 and 3111 at 390. The queued [diagnostic log](/home/user/veneer/tmp/units/journey-cost/runs/redesign-u3-partition-witness/stdout.log) locates exactly two new clause-1 violations on U2's `#contents-panel` at 1280: padding-top and padding-bottom, expected 12 px, substituted unexcluded reading 16 px. At 390 it finds those same two plus padding-left and padding-right, expected 16 px, substituted reading 24 px. This exact U2 panel signature is introduced by `d195bcf` in `createShell`; its added `px-4` brings it into the shared-name population. The control deliberately substitutes unexcluded readings. The actual tuned-face partition still has zero violations at both widths.

Additional diagnostic deviation: to locate the partition-control witnesses, one temporary `console.info` was added inside the owned journey test and run through the queue. It was removed by restoring the verified file. SHA-256 before and after restoration is identical: `a0dd8803d9de17c067fa9f13686a49a8b7e37bc7061d0a6aff8eed75ae6fdf95`. No diagnostic change remains in the delivered diff. The hypothesis that U2's new shared-name panel explains the extra control failures is supported by the exact 2/4 padding witnesses.

The earlier setup timeout, mapped-breakpoint timeout, and Scrollspy event timeout did not recur in their final full suites. They remain recorded; no timeout, statechart row, host-bound entry, or assertion was weakened. The focusout defect remains reproducible across three application/drawer runs, and the [proposed U2 patch](/home/user/.wave/veneer-redesign/tmp/units/redesign-u3-u2-focusout.patch) remains unapplied.
