# J-ORACLE-RECORD round 3 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-oracle-record-brief-3.md`.

---

Round 3 is complete and every obligation from the round-2 audit is closed. All six acceptance commands exit 0. The new facets add no departure to the census, and nothing is committed. The work is in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record` on top of `c66e317`. I did not merge `main`.

## Files touched
- **`tests/setupServer.ts`:**
  - Each element now records its tag.
  - An ordered `content` facet replaces own text: text runs with whitespace collapsed, and child elements by label.
  - Scroll offsets are recorded exactly as the platform reports them.
  - The comparator reports `tag` and `content` differences.
  - `drivePluginAction` ends in a `never` check.
  - The R3-5 wording is applied.
  - The samples are reshaped, and the witness table and its reader are added.
  - The prevented-show control gains one expected row (see the deviation state).
- **`tests/setupServer.test.ts`:**
  - Adds the witness case, which runs once per witness.
  - Updates the labelling, comparator, guard, and live-page cases.
  - Corrects the test title and the export list.
- **`tests/fixtures/oracle/*.json`:** all 11 plugin fixtures are re-recorded.
- **`tmp/j-oracle/`:** round-3 scripts, `never-probe.py`, the updated plant (`mutation.test.ts`) and runner (`mutations.py`), and the logs. `tmp/probe/fraction.test.ts` holds the fractional-scroll probe.

Diffstat:
```
 tests/fixtures/oracle/alert.json     |  638 ++++++-
 tests/fixtures/oracle/carousel.json  | 1778 +++++++++++++++++-
 tests/fixtures/oracle/collapse.json  | 2448 ++++++++++++++++++++++--
 tests/fixtures/oracle/dropdown.json  | 1602 +++++++++++++++-
 tests/fixtures/oracle/modal.json     | 3414 ++++++++++++++++++++++++++++++++--
 tests/fixtures/oracle/offcanvas.json | 2058 ++++++++++++++++++--
 tests/fixtures/oracle/popover.json   | 1040 ++++++++++-
 tests/fixtures/oracle/scrollspy.json | 1050 ++++++++++-
 tests/fixtures/oracle/tab.json       | 1500 ++++++++++++++-
 tests/fixtures/oracle/toast.json     | 1218 +++++++++++-
 tests/fixtures/oracle/tooltip.json   |  750 +++++++-
 tests/setupServer.test.ts            |   87 +-
 tests/setupServer.ts                 |  361 +++-
```

## Declarations
- **Added:**
  - `type PluginContent = { readonly text: string } | { readonly element: string }`
  - `type PluginNodeContent = { readonly text: string } | { readonly position: number }`
  - `interface PluginWitness { name; pages: Record<PluginLibrary, string>; setup: Record<PluginLibrary, string>; authored; departures }`
  - `PLUGIN_WITNESSES: readonly PluginWitness[]`
  - `readPluginWitness(browser: Browser, witness: PluginWitness): Promise<readonly EngineDeparture[]>`
- **Changed:**
  - `PluginElement` gains `tag: string` and `content?: readonly PluginContent[]`, and loses `text?`.
  - `PluginNode` gains `content: readonly PluginNodeContent[]` and loses `text`.
  - `EngineFacet` gains `'tag' | 'content'` and loses `'text'`.
  - `PluginOffset` holds unrounded values.

## Red readings on round 2's source, per obligation
- **R3-1, R3-2, and R3-3** (`tmp/j-oracle/round3-red-witnesses.log.txt`). I added the witness table, its reader, and the witness case while the reader and comparator still ran round 2's code:
```
 × reports 'a fractional scroll offset' between two readings      → expected [] to strictly equal [ { plugin: 'witness', …(6) } ]
 × reports 'a button replaced by a div under the …' between two readings → expected [] to strictly equal [ { plugin: 'witness', …(6) } ]
 × reports 'swapped siblings' between two readings                → expected [] to strictly equal [ { plugin: 'witness', …(6) } ]
 × reports 'text placed after a child element ins…' between two readings → expected [] to strictly equal [ { plugin: 'witness', …(6) } ]
      Tests  4 failed | 125 skipped (129)
```
  - The scroll witness tells `10` from a fraction. Chromium snaps an unzoomed scroller's offset to whole pixels, at device scale factor 1 and at 4, so a plain `10.25` never reaches the reader. The probe is `tmp/probe/fraction.test.ts`. The witness therefore uses a scroller zoomed threefold: a `10.25` write there reads back as `10.333333015441895`. The comparator-level case also covers 40 against 40.25.
- **R3-4** (`round3-red-never.log.txt`). `never-probe.py` plants an unhandled `PluginDragAction` in a copy of `setupServer.ts`. On round 2's source it compiles with `tsc exit 0`. After the fix, `round3-green-never.log.txt` reads `tsc exit 2` and `error TS2322: Type 'PluginDragAction' is not assignable to type 'never'.`
- **R3-5** is prose only and has no red reading.

## Fixtures
All 11 were re-recorded with `ORACLE_REFRESH=1`, and all 12 Bootstrap cases passed. `button.json` keeps hash `ed3d873446e3ee9aabed1c4e309dbbccb7dfa587` and is absent from `git status`.

## Census
The table matches round 2, and two runs produced byte-identical departures.

| Plugin | Element | Facet | Name | Bootstrap 5.3.8 | Veneer | Steps |
| --- | --- | --- | --- | --- | --- | --- |
| collapse, alert, tab | — | — | — | — | — | no departure |
| scrollspy | `spy` | scroll | `top` | `544` | `600` | click.third |
| dropdown | `menu` | attribute | `data-popper-placement` | `bottom-start` | `bottom` | click.toggle, press.down, press.down.again, press.toggle, click.toggle.again |
| dropdown | `menu` | attribute | `popover` | (absent) | `manual` | same steps |
| carousel | `carousel` | class | `pointer-event` | absent | present | every action step |
| modal | `trigger`, `static-trigger`, `+.modal-backdrop[0]` | attribute | `inert` | (absent) | `` | click.trigger, click.trigger.again, click.trigger.third, click.static, press.static.escape, point.static.backdrop |
| modal | `static` | attribute | `inert` | (absent) | `` | click.trigger, click.trigger.again, click.trigger.third |
| modal | `modal` | attribute | `inert` | (absent) | `` | click.static, press.static.escape, point.static.backdrop |
| offcanvas | `trigger`, `scroll-trigger`, `scrolling` | attribute | `inert` | (absent) | `` | click.trigger, click.trigger.again, click.trigger.third |
| offcanvas | `document` | focus | — | `trigger` | `body` | point.backdrop, under reduced motion only |
| toast | `toast` | class | `hide` | present | absent | click.close, call.hide, call.still, click.still.close |
| toast | `still` | class | `hide` | present | absent | click.still.close |
| tooltip | `focus-trigger` | attribute | `data-bs-original-title` | `Focus tip` | (absent) | every step, `initial` included |
| tooltip | `+.tooltip[0]` | attribute | `popover` | (absent) | `hint` | hover.trigger, focus.trigger, call.show |
| popover | `+.popover[0]` | attribute | `popover` | (absent) | `manual` | click.trigger, press.trigger, click.away, click.body, click.trigger.close |
| popover | `+.popover[1]` | attribute | `popover` | (absent) | `manual` | click.body |

## Mutation table (`tmp/j-oracle/mutations.log.txt`)
The plant's sha256 is `f2c334902ceb5ab7770e944396f81e494b8b78d87943a1b48590c468cbf20f5d`. The run ends with `sources unchanged` and `mismatches: none`.

| Row | Planted difference | Expected | Reading | Exit | First failure line |
| --- | --- | --- | --- | --- | --- |
| collapse.expanded | Collapse writes the wrong aria-expanded value on each trigger | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'collapse', …(6) }, …(47) ] to strictly equal [] |
| alert.connected | Alert completes its close without removing the alert | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'alert', …(6) }, …(15) ] to strictly equal [] |
| tab.selected | Tab leaves the outgoing control aria-selected="true" | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tab', …(6) }, …(11) ] to strictly equal [] |
| scrollspy.active | ScrollSpy leaves the old link active | KILLED | KILLED | 1 | AssertionError: expected [ Array(12) ] to strictly equal [] |
| dropdown.expanded | Dropdown leaves the toggle aria-expanded="true" after closing | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'dropdown', …(6) }, …(5) ] to strictly equal [] |
| carousel.current | Carousel leaves aria-current on the outgoing indicator | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'carousel', …(6) }, …(21) ] to strictly equal [] |
| modal.hidden | Modal leaves aria-hidden="true" on the open modal | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'modal', …(6) }, …(11) ] to strictly equal [] |
| offcanvas.modal | Offcanvas omits aria-modal="true" while open | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'offcanvas', …(6) }, …(7) ] to strictly equal [] |
| toast.showing | Toast keeps the showing token after a completed show | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'toast', …(6) }, …(15) ] to strictly equal [] |
| tooltip.described | Tooltip writes a description id that names no tip | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tooltip', …(6) }, …(19) ] to strictly equal [] |
| popover.auto | Popover marks its tip with another auto token than bs-popover-auto | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'popover', …(6) }, …(11) ] to strictly equal [] |
| tooltip.text | TEXT: Tooltip writes a wrong title into its tip | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tooltip', …(6) }, …(5) ] to strictly equal [] |
| tooltip.tag | TAG: Tooltip builds its inner tip element as a span | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tooltip', …(6) }, …(5) ] to strictly equal [] |
| tooltip.order | ORDER: Tooltip builds its tip with the inner element before the arrow | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tooltip', …(6) }, …(5) ] to strictly equal [] |
| tooltip.placement | PLACEMENT: Tooltip writes its title beside the inner element | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'tooltip', …(6) }, …(5) ] to strictly equal [] |
| dropdown.parent | PARENT: Dropdown appends its menu to the body when it shows | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'dropdown', …(6) }, …(15) ] to strictly equal [] |
| scrollspy.destination | SCROLL: ScrollSpy scrolls one section past the one the link names | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'scrollspy', …(6) }, …(1) ] to strictly equal [] |
| control.equivalent | CONTROL: Collapse writes aria-expanded through an equivalent spelling | HELD | HELD | 0 | the whole run reports success |
| control.boom | BOOM: Collapse throws inside its trigger write | REFUSED | REFUSED | 1 | Error: The veneer collapse page reported boom; boom; boom; boom; boom; boom; boom; boom |
| control.unbound | UNBOUND: the row names a span Collapse.ts lacks | REFUSED | REFUSED | 1 | Build failed with 1 error: |
| control.suite | SUITE: a killing Collapse plant beside a suite that fails to collect | REFUSED | REFUSED | 1 | 1 other suite(s) failed: oracle-suite-fault.test.ts |

There is no fractional-scroll row. A plugin's scroll cannot land on a fraction in these pages: Chromium snaps an unzoomed scroller to whole pixels, and no scenario zooms one.

## Acceptance output
- `npm run format:check`: exit 0, `All matched files use the correct format.` `Finished in 11396ms on 487 files using 16 threads.`
- `npm run lint:check`: exit 0, no findings.
- `npm run check`: exit 0.
- `npm run test:policy`: exit 0, `Tests  109 passed | 1 skipped (110)`.
- `npm run test:conformance`: exit 0, `Test Files  1 passed (1)`, `Tests  42 passed (42)`, `Duration  100.62s`.
- `npm run test:setup`: exit 0, `Test Files  4 passed (4)`, `Tests  337 passed (337)`, `Duration  16.05s`.

## `git status --short`
```
 M tests/fixtures/oracle/alert.json
 M tests/fixtures/oracle/carousel.json
 M tests/fixtures/oracle/collapse.json
 M tests/fixtures/oracle/dropdown.json
 M tests/fixtures/oracle/modal.json
 M tests/fixtures/oracle/offcanvas.json
 M tests/fixtures/oracle/popover.json
 M tests/fixtures/oracle/scrollspy.json
 M tests/fixtures/oracle/tab.json
 M tests/fixtures/oracle/toast.json
 M tests/fixtures/oracle/tooltip.json
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

## Deviation state
There was no stop and no off-limits or shared-file patch.

- **Control row added.** The prevented-show control now reports one more departure: the body's `content` loses the backdrop. The content facet makes this real, and the first acceptance run of `test:conformance` read red on it. I added it to that control's expected list in `PLUGIN_CONTROLS`, and the control's step and seam are unchanged.
- **How content is read:**
  - Adjacent text nodes form one run, including across a comment, and the comment itself is left out.
  - Whitespace is collapsed but not trimmed, and an empty run is dropped.
  - The `head` element is left out of `html`'s content.
  - Content is omitted when empty.
- **Clean-up.** I removed the probe's scratch directory, `tmp/j-oracle/never/`, after the green reading.
