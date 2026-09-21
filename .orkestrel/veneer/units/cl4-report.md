<!-- CL4 stop report (brief 2 over brief 1), sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl4.jsonl (swept at acceptance), thread 01a0c440-c01e-7da1-bc12-9bc0a535d6f6, exit 0, retained 2026-09-21. A deviation stop: the built cascade emits the legacy pseudo-element spelling the pinned inventory does not carry. -->

# CL4 report

Stopped: the rebuilt cascade does not satisfy the reset-selector premise in `cl4-brief-2.md`. CL4 is incomplete. The initial conformance failure identifies `*::before`, before it reaches the assigned missing tag partials.

The effective assignment is `cl4-brief-2.md` over `cl4-brief.md`. Execution used the sol role on Astra, directly in the Veneer checkout, with no agents spawned. HEAD remains `d822d59`; the tracked tree was clean at entry.

## Deviation

Expected: brief 2 says `*`, `*::before`, `*::after`, and `[hidden]` already satisfy their inventory rows through `src/styles/_reset.scss`, and directs CL4 to ship nothing for them.

Found: the source carries those spellings, but a fresh production build emits this reset layer, read with PostCSS from `dist/src/styles/index.css`:

```css
@layer reset{*,:before,:after{box-sizing:border-box}[hidden]{display:none!important}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}}
```

The pinned inventory requires `*::before` and `*::after`. The emitted `:before` and `:after` spellings do not match the fixed comparison rule. Rebuilding and repeating `npm.cmd run test:conformance` reproduces the same failure:

```text
Shipped component reboot is missing selector *::before
```

The governing [deviation protocol](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md) states: “Stop when a conflict prevents the primary objective or requires an unowned change.” The briefs prohibit edits to `_reset.scss`, `tests/setup*.ts`, `tests/fixtures/**`, and `configs/**`; brief 2 also fixes the comparison rule and prohibits adding these reset selectors. I have not changed those surfaces or worked around the mismatch in an owned partial. The Orchestrator must resolve the emitted-selector/comparison contract before this assignment can close.

## Comparison rule

`scanCompatibilityPresence` parses the built CSS with PostCSS and walks every rule recursively, across every layer and nesting depth. It splits selector lists and compares each member by exact equality after `normalizeComplexSelector` normalizes whitespace and combinator spacing. It does not canonicalize universal selectors, pseudo-element colon spelling, case, vendor prefixes, or quotes.

A shipped selector row requires every projected inventory selector except names in the deferral table. An `Excluded` name must match a whole selector or property name in any inventory component, then remain absent from the entire built cascade. Substrings do not match. `readDeferrals` requires nonempty Name, Owner, and Reason cells.

`readOracleInventory` projects each selector entry's `selector` field and each component's property keys. A direct read of the pinned fixture confirms that `reboot.properties` is empty. No custom-property obligation belongs to the Reboot row.

## Changes left for review

The guide contains the `reboot` selector row as `shipped`, and `listed` reads `['btn', 'reboot']`, as required for the initial red reading. These are unfinished changes that deliberately leave conformance red; they are not a claim of completed shipping. The scoped formatter aligned the affected guide table.

The following guide rows have Owner `Excluded`:

| Name | Reason |
| --- | --- |
| `ol ol` | Nested list treatment infers styling from tag composition. |
| `ul ul` | Nested list treatment infers styling from tag composition. |
| `ol ul` | Nested list treatment infers styling from tag composition. |
| `ul ol` | Nested list treatment infers styling from tag composition. |
| `pre code` | Contextual code treatment infers styling from tag composition. |
| `a > code` | Contextual code treatment infers styling from tag composition. |
| `kbd kbd` | Nested keyboard treatment infers styling from tag composition. |
| `legend + *` | Sibling clearing infers layout from adjacency to a legend. |
| `::-moz-focus-inner` | This Gecko-only pseudo-element is unreachable on the managed Chromium and Edge receipts. |

The conformance scan passes the exclusion membership and absence checks before returning the missing reset selector.

No partial was added or changed. `_b.scss`, `_figure.scss`, `_img.scss`, `_svg.scss`, `_table.scss`, `_tr.scss`, `_label.scss`, `_input.scss`, `_select.scss`, `_optgroup.scss`, `_textarea.scss`, `_fieldset.scss`, `_output.scss`, `_iframe.scss`, `_details.scss`, and `_progress.scss` remain unimplemented; `_button.scss` remains unchanged. There are no CL4 selector/value bindings to report. The index, mirrored proofs, ContentSection specimens, and guide files/departure rows remain unchanged.

## Executed evidence

The commands ran on Windows with the default managed Chromium configuration. No Edge run occurred.

| Command | Exit | Final result |
| --- | --- | --- |
| `npm.cmd run test:conformance` — initial reading | 1 | `Test Files 1 failed (1)`; `Tests 1 failed \| 7 passed (8)`; duration `3.95s` |
| `npm.cmd run build:src:styles` | 0 | `dist/src/styles/index.css 55.45 kB`; `dist/src/styles/index.rtl.css 55.45 kB`; `built in 398ms` |
| `npm.cmd run test:conformance` — after rebuilding | 1 | `Test Files 1 failed (1)`; `Tests 1 failed \| 7 passed (8)`; duration `3.93s` |
| `./node_modules/.bin/oxfmt.cmd guides/veneer.md tests/conformance.test.ts` | 0 | `Finished in 492ms on 2 files using 16 threads.` |
| `git diff --check` | 0 | No output. |

The failed test is `Bootstrap component oracle > carries every shipped component selector and custom property in the built cascade`. Both conformance runs report the same missing `*::before` selector. The official Button behavior case passes in those runs.

Logs are `cl4-conformance-initial.log.txt`, `cl4-build-baseline.log.txt`, and `cl4-conformance-rebuilt.log.txt`. A Node inline inspection initially failed because PowerShell removed its argument quotes; the subsequent stdin-fed Node/PostCSS inspection exited 0 and returned the reset layer quoted earlier. This inspection did not mutate source.

No red-then-green pair completed. No wrong-value plant or selector-removal plant was made, so no plant remains to remove. The initial required red reading exposed the stop condition before implementation.

## Acceptance gates

The ordered acceptance chain did not start after the stop condition. The earlier conformance runs are development readings, not a completed gate chain.

| Gate | Exit and final lines |
| --- | --- |
| `npm.cmd run format:check` | Not run. |
| `npm.cmd run lint:check` | Not run. |
| `npm.cmd run check` | Not run. |
| `npm.cmd run build` | Not run. |
| `npm.cmd run test:src:styles` | Not run. |
| `npm.cmd run test:conformance` | Development runs exited 1; results recorded earlier. |
| `npm.cmd run test:app:browser` | Not run. |
| `npm.cmd run test:journey` | Not run. |
| `npm.cmd run test:guides` | Not run. |
| `npm.cmd run test:policy` | Not run. |
| `npm.cmd run test:setup` | Not run. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | Not run. |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | Not run. |

## Working-tree evidence

The actual `git diff --stat` output is:

```text
 guides/veneer.md          | 136 +++++++++++++++++++++++++---------------------
 tests/conformance.test.ts |   2 +-
 2 files changed, 74 insertions(+), 64 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M tests/conformance.test.ts
```

Git also reports that `C:\Users\mikes/.config/git/ignore` cannot be accessed because permission is denied. The report and execution logs live under ignored ``, so they do not appear in porcelain output. The full actual diff is saved at `cl4-diff.patch`. Only owned tracked files changed. Nothing was committed.
