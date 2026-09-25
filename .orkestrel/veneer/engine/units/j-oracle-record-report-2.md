# J-ORACLE-RECORD round 2 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-oracle-record-brief-2.md`.

---

Round 2 is complete: every obligation O-R1 through O-R9 is closed. All six acceptance commands exit 0, and nothing is committed. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record` at base `9ea360d`, and I did not merge `main`.

## Files touched

- **`tests/setupServer.ts`:**
  - The plugin types are rewritten to the renamed vocabulary.
  - `PluginAction` is a union discriminated by `gesture`.
  - The reader now records own text, parent, and scroll offsets, from one page evaluation per reading.
  - Every lookup by label is an own-property lookup.
  - The case matrix now lives here as the `PLUGIN_SAMPLE_*` constants.
  - `launchOracleBrowser` cleans up in every failure path.
  - The `recordPluginOracle` remark is the sentence the brief fixed, and the other "both" sentences name their members.
  - The ScrollSpy scenario sets `data-bs-smooth-scroll="true"`, so each library scrolls its own root to the linked section.
- **`tests/setupServer.test.ts`:** the plugin block is rewritten over the moved constants. It adds these cases:
  - an authored `__proto__` label;
  - a `constructor` label;
  - a comparator case covering every facet;
  - a transform passed to `compileVeneerRuntime`;
  - freeze checks on both attribute tables;
  - a live page read through one report;
  - scratch and browser clean-up when the drive throws.

  The `click.nothing` refusal case is gone, and the export list is updated.
- **`tests/conformance.test.ts`:** the plugin case reads its fixture through `readPluginFixture`.
- **`tests/fixtures/oracle/{collapse,alert,tab,scrollspy,dropdown,carousel,modal,offcanvas,toast,tooltip,popover}.json`:** re-recorded with `ORACLE_REFRESH=1` on Chromium 153 and formatted with oxfmt.
- **`tmp/j-oracle/`:**
  - The mutation plant, `mutation.test.ts`, sits beside its runner. `mutations.py` copies it into `tmp/probe/` for each row and deletes the copy afterwards.
  - `suite-fault.test.ts`, the file the SUITE row runs beside the plant.
  - `round1-classify.py`.
  - The splice scripts and all logs.

Diffstat:
```
 tests/conformance.test.ts            |    3 +-
 tests/fixtures/oracle/alert.json     |  346 +++++--
 tests/fixtures/oracle/carousel.json  | 1064 +++++++++++++++------
 tests/fixtures/oracle/collapse.json  | 1152 ++++++++++++++++-------
 tests/fixtures/oracle/dropdown.json  |  792 +++++++++++-----
 tests/fixtures/oracle/modal.json     | 1708 ++++++++++++++++++++++++----------
 tests/fixtures/oracle/offcanvas.json | 1044 +++++++++++++++------
 tests/fixtures/oracle/popover.json   |  536 ++++++++---
 tests/fixtures/oracle/scrollspy.json |  564 ++++++++---
 tests/fixtures/oracle/tab.json       |  708 ++++++++++----
 tests/fixtures/oracle/toast.json     |  644 +++++++++----
 tests/fixtures/oracle/tooltip.json   |  396 ++++++--
 tests/setupServer.test.ts            |  419 +++++----
 tests/setupServer.ts                 |  931 ++++++++++++------
 14 files changed, 7388 insertions(+), 2919 deletions(-)
```

## Renamed and added declarations

Every rename below updates every consumer and the export list, and leaves no alias.

- **Renames:**
  - `PluginEngine` → `PluginLibrary = 'bootstrap' | 'veneer'`, and `PluginRuntime.engine` → `library`.
  - `PluginFixture` → `PluginRecording { version; plugin; browser; steps }`. `version` is documented as the tracked Bootstrap release, for a recording of either library.
  - `PluginReading` → `PluginReport { nodes; locked; animating; span }`.
  - `inferPluginState(report: PluginReport, authored: readonly string[]): PluginState`.
  - `EngineFacet = 'element' | 'class' | 'attribute' | 'visibility' | 'text' | 'parent' | 'scroll' | 'focus' | 'lock'`.
  - `compileVeneerRuntime(transforms: readonly Plugin[] = []): Promise<PluginRuntime>`.
  - `driveOracleBrowser` → `launchOracleBrowser<T>(drive: (browser: Browser, scratch: ScratchInterface) => Promise<T>): Promise<T>`.
  - `ORACLE_OMITTED_ATTRIBUTES` and `ORACLE_REFERENCE_ATTRIBUTES` → `PLUGIN_OMITTED_ATTRIBUTES` and `PLUGIN_REFERENCE_ATTRIBUTES`.
- **Reshaped:**
  - `PluginAction = PluginTargetAction | PluginPressAction | PluginWheelAction | PluginPointAction | PluginCallAction`, discriminated by `gesture`. `PluginGesture` is removed.
  - `readPluginState(page: Page, spawned: readonly string[], authored: readonly string[]): Promise<PluginState>`.
  - `scanPluginFixture(recording: PluginRecording, fixture: PluginRecording): string | undefined`.
  - `drivePluginAction(page: Page, action: PluginAction, library: PluginLibrary): Promise<void>`.
  - `EngineDeparture` values widen to `string | number | boolean | undefined`.
  - `PluginElement` gains `text?`, `parent?`, and `scroll?: PluginOffset`.
  - `PluginNode` gains `text`, `parent: number | undefined`, and `scroll: PluginOffset | undefined`.
- **Added:**
  - `PluginOffset { top; left }`.
  - `reportPluginPage(spawned: readonly string[]): PluginReport`, the one in-page evaluation that both `readPluginState` and `settlePluginState` use.
  - `PLUGIN_SAMPLE_SCENARIO`, `PLUGIN_SAMPLE_RECORDING`, `PLUGIN_SAMPLE_REPORT`, `PLUGIN_SAMPLE_OFFICIAL`, and `PLUGIN_SAMPLE_DIVERGENT`.

## Red readings on round 1's source (verbatim)

The two O-R1 cases, from `tmp/j-oracle/round2-red-labels.log.txt`:
```
 × |setup| tests/setupServer.test.ts > server setup > plugin oracle > keeps an authored __proto__ label as an own element through serialization 16ms
   → expected false to be true // Object.is equality
 × |setup| tests/setupServer.test.ts > server setup > plugin oracle > reports a constructor label one side lacks as an absent element 9ms
   → own.classes is not iterable
TypeError: own.classes is not iterable
 ❯ collectEngineDepartures tests/setupServer.ts:4824:65
      Tests  2 failed | 122 skipped (124)
```

Round 1's classifier, run on the SUITE row's report (`tmp/j-oracle/round1-classify.log.txt`):
```
suites: [('oracle-mutation.test.ts', 'failed', 1), ('oracle-suite-fault.test.ts', 'failed', 0)]
round 1 classifier: KILLED AssertionError: expected [ { plugin: 'collapse', …(6) }, …(47) ] to strictly equal []
```
The round 2 classifier reads the same kind of report as `REFUSED | 1 other suite(s) failed: oracle-suite-fault.test.ts`.

## Re-recorded fixtures

All 11 plugin fixtures were re-recorded; every Bootstrap case passed and matched its fixture (`round2-refresh.log.txt`). `button.json` is byte-identical: hash `ed3d873446e3ee9aabed1c4e309dbbccb7dfa587`, not in `git status`. Two census runs produced identical departures (`cmp` clean).

## Census table with the new facets

The census compares Veneer at `9ea360d` against the fixtures, under both motion preferences unless a row says otherwise. The new facets add one departure. On a smooth-scroll click, Bootstrap scrolls the spy to 544 and Veneer to 600. Bootstrap subtracts the spy's own page offset from the section's offset inside the spy; Veneer lands on the section's top. No text or parent departure appears in any plugin.

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

The plant is `tmp/j-oracle/mutation.test.ts`, sha256 `2ce5189a750b1decbd4f2469bdba522786c1d67ad7ecf63736cc3812cdc348c4`. The run ends with `sources unchanged` and `mismatches: none`.

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
| dropdown.parent | PARENT: Dropdown appends its menu to the body when it shows | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'dropdown', …(6) }, …(15) ] to strictly equal [] |
| scrollspy.destination | SCROLL: ScrollSpy scrolls one section past the one the link names | KILLED | KILLED | 1 | AssertionError: expected [ { plugin: 'scrollspy', …(6) }, …(1) ] to strictly equal [] |
| control.equivalent | CONTROL: Collapse writes aria-expanded through an equivalent spelling | HELD | HELD | 0 | the whole run reports success |
| control.boom | BOOM: Collapse throws inside its trigger write | REFUSED | REFUSED | 1 | Error: The veneer collapse page reported boom; boom; boom; boom; boom; boom; boom; boom |
| control.unbound | UNBOUND: the row names a span Collapse.ts lacks | REFUSED | REFUSED | 1 | Build failed with 1 error: |
| control.suite | SUITE: a killing Collapse plant beside a suite that fails to collect | REFUSED | REFUSED | 1 | 1 other suite(s) failed: oracle-suite-fault.test.ts |

## Acceptance output (verbatim tails)

- `npm run format:check`: exit 0, `All matched files use the correct format.` `Finished in 13348ms on 487 files using 16 threads.`
- `npm run lint:check`: exit 0, `oxlint --config .oxlintrc.json --deny-warnings .` with no findings.
- `npm run check`: exit 0, last step `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`.
- `npm run test:policy`: exit 0, `Test Files  1 passed (1)`, `Tests  109 passed | 1 skipped (110)`.
- `npm run test:conformance`: exit 0, `Test Files  1 passed (1)`, `Tests  42 passed (42)`, `Duration  108.10s`.
- `npm run test:setup`: exit 0, `Test Files  4 passed (4)`, `Tests  333 passed (333)`, `Duration  20.27s`.

## `git status --short`
```
 M tests/conformance.test.ts
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

No stop and no shared-file patches.

- **Host-rule breach.** A leftover census comparison loop invoked `npx node -e ""` with an empty program, against the no-`node -e` rule. It ran nothing and changed nothing.
- **Mid-run edit.** I made a comment-only edit to `tests/setupServer.ts` while the mutation run was in progress. No behaviour changed.
- **Choices within scope:**
  - The ScrollSpy scenario sets `data-bs-smooth-scroll="true"`, so the destination mutation measures a scroll each library drives.
  - An empty own text and a missing parent are left out of an element, not recorded as `''`.
  - The document's scroll is recorded on its scrolling element, `html`.
  - The first sentence of the `recordPluginOracle` remark is kept verbatim as the brief fixed it, though it opens with "Both libraries".
- **Standing conditions:**
  - The `@throws When …` form is unchanged; J-THROWS carries it.
  - The repeated build pattern stays in the vendored `configs/`; the scaffold carries it.
  - The fixtures come from Chromium 153 only.
  - The conformance project still needs `npm run build:src` in the worktree, because its cascade cases read `dist`.
