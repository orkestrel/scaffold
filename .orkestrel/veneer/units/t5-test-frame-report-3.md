# Unit T5 round 3 report — park point, rejected release, host-independent proofs

Role and engine: `opus` on Opus 5.5, a native Claude subagent. Checkout `/home/user/test-tf`, uncommitted over
`80c419e`. Brief: `t5-brief-3.md`, read with the round-2 verdict and its three lane verdicts. Every log, instrument, and
mutation file is under `/home/user/test-tf/tmp/units/`.

## Outcome

- **P5, RA, H6, RB, RC, RD, W8: all closed** in the owned files. No stop condition was reached.
- **New proofs.** The three P5 proofs run red on the round-2 code and green on the final code. The RD proof is a
  coverage proof: it passes on the round-2 code, which already had the branch, and its own mutation reddens it.
- **Mutation runs.** Every mutation runs from its retained file against the final test file, whose SHA-256 digest is
  checked before and after the runs.
- **Gates.** Every gate the unit may run exits 0, and each log ends with the exit status the run itself wrote.
- **Left to the Orchestrator.** `npm run test:guides` needs a built `dist/`. The Veneer `journey:light-390` run uses
  another checkout. Neither is run here.

## Findings and changes

### P5: the park point

The `captureFrame` function now changes three things:

- **Scroll only an element the scroll moves.** A static check decides whether the document's scroll moves the
  element: walk the `offsetParent` chain from the element, and when it ends on a box whose computed `position` is
  `fixed`, the document's scroll does not move the element. The document scrolls only when that scroll moves the
  element and the element lies outside the pane.
- **Nudge off the park point.** After the scroll and the offset `rise` and `shift` are computed, the capture checks
  whether the element's final box covers the runner page's origin. Where it does, the frame moves `1 − top` rows down
  while the window has room below. Failing that, it moves `1 − left` columns right while the window has room on the
  right. For an element too large for the window, both bounds are infinite, because the provider then captures beyond
  the viewport.
- **Offset in either direction.** The offset is written whenever `rise` or `shift` is nonzero, so a nudge can move the
  frame down or right.

Readings behind the choice:

- `offsetParent` identifies a fixed box whose containing block is the viewport (`t5-3-probe-offsetparent.log.txt`).
  - A fixed box reads `null`.
  - A fixed box inside a transformed ancestor, or inside a `contain: paint` ancestor, reads that ancestor.
  - A sticky box reads its ordinary parent.
- A scroll-and-revert is not usable (`t5-3-probe-tentative.log.txt`). It fires one `scroll` event at an unchanged
  position, although it causes no `mouseover`. A real 60-row scroll does fire a `mouseover` on the content that
  arrives under the parked pointer.

Residual case, named in the TSDoc and the guide: an element that fits the window only by filling both its height and
its width stays on the park point.

### RA: the rejected release

The outer `finally` block is now `try { await releasePane() } finally { window.scrollTo(…) }`, so the scroll restore
runs even where the release rejects.

No proof covers this path. Making `releasePane` reject would need a project-owned stand-in or an unowned change. The
guarantee rests on the control flow alone, and this report states that.

### H6: host-independent proofs

- **Below-pane and scope proofs.** Each declares `height: max(844, window.top.innerHeight + 200)`. The scroll leaves
  the element at the pane's bottom, which lies 200 rows past the window, so each forces the offset on any host. Each
  expects 100 whole rows.
- **Fixed-panel proof.** It declares `10 × ceil((window.top.innerHeight + 100) / 7)` with no floor of 844. That gives
  a multiple of 10, so the panel's 30% and its top at 70% are whole rows. The panel's top lies at least 70 rows past
  the window, and the panel fits the window for any window of about 81 rows or more. The spacer is `declared + 2000`,
  so scrolling to 400 holds on any tester size.
- **Restore mutation.** It is credited to the scope proof's `style` attribute assertion alone. See the mutation table
  and its notes.

### RD: the no-attribute restore branch

A new case, "hands back a frame that carried no style attribute without one", removes the frame's `style` attribute,
captures an element that needs the offset, and asserts that the attribute is absent afterward. It then puts the saved
attribute back.

### W8: the prose

- **Scroll sentences.** In both the TSDoc and the guide, they are limited to "Where the document's scroll moves the
  element". They state that no scroll is taken for an element inside the pane or for a fixed element.
- **Deleted sentence.** "A fixed element that extends past the declared pane is shot as that pane shows it." is
  deleted.
- **"Moves nothing".** Where it was false, it now reads "is not offset".
- **Code-token noun.** The guide's layout rule says "the `captureFrame` function stages".
- **Scope proof comment (F3).** It reads: "A second frame the staging selector matches stands in for any other
  `iframe[data-vitest]` frame." A second comment gives the reason for the other value.
- **New paragraphs.** They name the park point, the nudge, and the residual case, and state that the scroll comes back
  even where the release rejects.

### RB and RC: retained mutations

Each mutation's exact text is retained as one JSON file in `tmp/units/t5-3-mutations/`. A file either replaces the
source with a saved copy or applies exact text edits, each of which must match once.

`tmp/units/t5-3-run.sh <name>` reads that file, applies it, runs the scoped suite, and logs the run to
`tmp/units/t5-3-mut-<name>.log.txt`. It then restores `src/browser/helpers.ts` from
`t5-3-helpers-final.ts.txt` and checks the restore with `cmp`.

All runs, the red run included, used the final test file:
- Its SHA-256 digest before the runs is in `t5-3-test-final.sha256.txt`, and `sha256sum -c` returned OK after them.
- The combined console output is in `t5-3-mutations-summary.log.txt`.

## New proofs: red and green

Every run uses the same command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame"`.

| Run | Source | Count | Log |
| --- | --- | --- | --- |
| Red | the round-2 `helpers.ts` (`t5-3-helpers-r2.ts.txt`, applied by the `red-r2.json` mutation file) | 3 failed, 23 passed, 334 skipped | `t5-3-mut-red-r2.log.txt` |
| Green | the final `helpers.ts` | 26 passed, 334 skipped | `t5-3-green.log.txt` |

Red readings on the round-2 code:

| Proof | Reading |
| --- | --- |
| "keeps a flush-left element the scroll brings to the top off the parked pointer" | `expected 1 to be +0`, a mouseover |
| "keeps a flush-left element the offset brings to the left edge off the parked pointer" | `expected 1 to be +0`, a mouseover |
| "leaves the document unscrolled for a fixed element that extends past the pane" | `expected 2 to be +0`, scroll events |

## Mutations

All mutations ran on the final test file.

| Mutation file | Reddens | Count | Log |
| --- | --- | --- | --- |
| `noscrollback.json` | below-pane (scroll 200); element refusal (scroll 100) | 2 failed, 24 passed | `t5-3-mut-noscrollback.log.txt` |
| `widened.json` | frame scope (second frame above the origin) | 1 failed, 25 passed | `t5-3-mut-widened.log.txt` |
| `toorigin.json` | both P5 proofs; the parked pointer inside the window; the held hover | 4 failed, 22 passed | `t5-3-mut-toorigin.log.txt` |
| `nonudge.json` | both P5 proofs (a mouseover each) | 2 failed, 24 passed | `t5-3-mut-nonudge.log.txt` |
| `scrollfixed.json` | the fixed element past the pane (2 scroll events) | 1 failed, 25 passed | `t5-3-mut-scrollfixed.log.txt` |
| `nooffset.json` | fixed panel; below-pane; `50vh`; frame scope (control); scrolled corner (no nudge without the offset) | 5 failed, 21 passed | `t5-3-mut-nooffset.log.txt` |
| `nocomposite.json` | fixed panel (panel culled) | 1 failed, 25 passed | `t5-3-mut-nocomposite.log.txt` |
| `edgereading.json` | fixed panel; `50vh`; `30vh`; tall element | 4 failed, 22 passed | `t5-3-mut-edgereading.log.txt` |
| `norestyle.json`, run on the scope proof alone | frame scope, on its `style` attribute assertion | 1 failed, 359 skipped | `t5-3-mut-norestyle.log.txt` |
| `norestyle-all.json`, the same edit over the whole group | frame scope; then leaked state in the no-attribute case, the held hover, and the page refusal | 4 failed, 22 passed | `t5-3-mut-norestyle-all.log.txt` |
| `emptystyle.json` | no-attribute restore (`expected true to be false`) | 1 failed, 25 passed | `t5-3-mut-emptystyle.log.txt` |

- **Distinction.** Each named proof asserts the property its mutation breaks: a height, a floor color, a scroll
  position, a mouseover count, a scroll-event count, the second frame's top, or the `style` attribute.
- **Restore mutation.** The isolated `norestyle` run fails on the attribute assertion. The received value carries the
  offset: `;top:-331px !important;left:0px !important;will-change:transform`. Under `norestyle-all`, the failures after
  the scope proof come from the offset leaking into later cases. They are not counted as proofs of the restore.
- **No mutation for RA.** The rejected-release path has no mutation, for the reason given under RA.

## Gates

`tmp/units/t5-3-gates.sh` ran these. Each log ends with the exit status the run itself wrote.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `t5-3-gate-format.log.txt` |
| `npm run lint:check` | 0 | No diagnostics | `t5-3-gate-lint.log.txt` |
| `npm run check` | 0 | Root and every `check:src` project clean | `t5-3-gate-check.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  358 passed \| 2 expected fail (360)` | `t5-3-gate-file.log.txt` |
| `npm run test:src:browser`, as an observation | 0 | `Tests  412 passed \| 2 expected fail (414)`, 44.88 s | `t5-3-gate-browser.log.txt` |
| `npm run test:guides` | — | Not run; needs a built `dist/` | — |

## Evidence files

- `tmp/units/t5-3.diff`, the whole change over `80c419e`. Diffstat: 3 files changed, 539 insertions, 34 deletions.
- `tmp/units/t5-3-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, and
  `tests/src/browser/helpers.test.ts`.
- The instruments:
  - `tmp/units/t5-3-run.sh`, the mutation runner.
  - `tmp/units/t5-3-gates.sh`, the gate runner.
  - `tmp/units/t5-3-mutations/*.json`, the retained mutation files.
- The saved sources:
  - `tmp/units/t5-3-helpers-final.ts.txt`, the final `helpers.ts`.
  - `tmp/units/t5-3-helpers-r2.ts.txt`, the round-2 `helpers.ts`.
  - `tmp/units/t5-3-test-r2.ts.txt`, the round-2 test file.

## Deviation state

- **Stop condition:** not reached. Avoiding the park point needed no file outside the owned set.
- **Shared-file patches:** none.
- **Residual case, stated.** An element that fits the runner's window only by filling both its height and its width
  stays on the park point.
- **Carried without a proof.** The scroll restore on a rejected `releasePane` rests on its `try` and `finally`
  structure alone.
- **For the Orchestrator.**
  - Re-run Veneer `journey:light-390` against a build of this tree. The brief requires that run to keep passing, and
    this unit may not touch the Veneer checkout.
  - Run `npm run build` and then `npm run test:guides`.
