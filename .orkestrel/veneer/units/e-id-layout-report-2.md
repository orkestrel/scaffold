# E-ID-LAYOUT round 2 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eil`, baseline `ca83afb`

The Type section shows Bootstrap's horizontal description list inside a `.container-fluid` wrapper, and
`tests/app/browser/sections/TypeSection.test.ts` pins it. The wrapper is required: a bare `dl.row` overflows the Type
region by 12px on each side at 390 and 1280 pixels. Every gate the brief names exits 0. One observation: the
`app:browser` project excludes `tests/app/browser/integration.test.ts`, so the brief's command runs only the section
test (see § Observations).

## Specimen as shipped

The specimen sits in `TYPE_SPECIMENS` in `app/browser/constants.ts`, between `Inline list` and `Quotation`:

```ts
Object.freeze({
	name: 'Horizontal description list',
	markup:
		'<div class="container-fluid"><dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">A description beside its term.</dd><dt class="col-sm-3">Second term</dt><dd class="col-sm-9">Another description on the same line as its term.</dd></dl></div>',
}),
```

- The wrapper is `.container-fluid`, not `.container`. Every `.row` specimen in `app/browser/constants.ts` is wrapped
  in `.container-fluid`, including this section's `Line heights` specimen. Both wrappers keep the list inside the
  region (see the following reading).
- `tests/app/browser/sections/TypeSection.test.ts` pins the name, the markup, and the rendered tags `div`, `dl`, `dt`,
  `dd`, `dt`, `dd` in table order. That is the round-1 patch `tmp/units/eil-specimen.patch` with the wrapper added.

## Overflow reading

Instrument: `tmp/units/eil-2-overflow-probe.mjs`. The instrument loads the showcase from the worktree's Vite dev server
(`vite --config configs/app/vite.browser.config.ts --port 5391`, log `tmp/units/eil-2-dev.log.txt`, stopped by process
id after the reading). It reads the Type region's box and the `dl` box of the shipped specimen. It also injects each
candidate markup into the region and reads the same boxes. Logs: `tmp/units/eil-2-overflow-probe-before.log.txt`
(before the constants change, candidates only) and `tmp/units/eil-2-overflow-probe.log.txt` (after, with the shipped
specimen).

| Width | Type region | Bare `dl.row` | `.container` wrapper | `.container-fluid` wrapper (shipped) |
| --- | --- | --- | --- | --- |
| 390 | left 0, right 390 | left -12, right 402: overflows | left 0, right 390: inside | left 0, right 390: inside |
| 1280 | left 0, right 1280 | left -12, right 1292: overflows | left 70, right 1210: inside | left 0, right 1280: inside |

The shipped specimen stacks at 390 (`dt` y=0, `dd` y=21, `dt` y=50, `dd` y=71, each 390 wide). At 1280 it lays out
on one line per pair (`dt` x=0 w=320, `dd` x=320 w=960, second pair at y=29).

## Failing-first table

| Command | Before the constants change | After |
| --- | --- | --- |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/integration.test.ts` | exit 1, `Tests  1 failed \| 1 passed (2)`: `renders every Type specimen in table order inside the named region` (received the names without `Horizontal description list`) — `tmp/units/eil-2-red.log.txt` | exit 0, `Tests  2 passed (2)` — `tmp/units/eil-2-green.log.txt` |

## Gate table

| Gate | Exit | Log |
| --- | --- | --- |
| Section test command (preceding table) | 0, `Tests  2 passed (2)` | `tmp/units/eil-2-green.log.txt` |
| `npm run format:check` | 0 | `tmp/units/eil-2-format-check.log.txt` |
| `npm run lint:check` | 0 | `tmp/units/eil-2-lint-check.log.txt` |
| `npm run check` | 0 | `tmp/units/eil-2-check.log.txt` |

## Shared-file hunks

`app/browser/constants.ts`, in `TYPE_SPECIMENS`:

```diff
@@ -625,6 +625,11 @@ export const TYPE_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
 		markup:
 			'<ul class="list-inline"><li class="list-inline-item">First</li><li class="list-inline-item">Second</li><li class="list-inline-item">Last</li></ul>',
 	}),
+	Object.freeze({
+		name: 'Horizontal description list',
+		markup:
+			'<div class="container-fluid"><dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">A description beside its term.</dd><dt class="col-sm-3">Second term</dt><dd class="col-sm-9">Another description on the same line as its term.</dd></dl></div>',
+	}),
 	Object.freeze({
 		name: 'Quotation',
 		markup: '<blockquote class="blockquote"><p>A quotation within the document.</p></blockquote>',
```

The round-1 hunks for `tests/setupStyles.ts` and `guides/veneer.md` are unchanged (see `tmp/units/eil-report.md`).

## Diff and status

- Diff: `tmp/units/eil-2.diff` (`git diff ca83afb`): 10 files changed, 131 insertions(+), 19 deletions(-).
- Status: `tmp/units/eil-2-status.txt`. Round 2 adds `app/browser/constants.ts` and
  `tests/app/browser/sections/TypeSection.test.ts` to the round-1 set.

## Observations

- **The integration file does not run under `app:browser`.** The `appBrowser` factory in `vite.config.ts` excludes
  `tests/app/browser/integration.test.ts`, so the brief's command runs `TypeSection.test.ts` alone and reports one test
  file. The `appJourney` factory includes the integration file. It references `TYPE_SPECIMENS` only to collect declared
  specimen names, so it does not pin this specimen. Settling command, a timing-sensitive suite left to the
  Orchestrator: `npm run test:journey`.
- **The page already scrolls horizontally.** The document's `scrollWidth` is 608 at 390 and 1292 at 1280 before and
  after this change, from specimens in other regions. No child of any Type specimen extends past the viewport
  (scratch reading, not retained).

## Deviation state

None. The ancillary choice settled here is the `.container-fluid` wrapper, to match the house pattern for a `.row`
specimen.
