# E-ID-ANCHOR report — anchored visibility on the promoted overlays

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-anchor` (branch `unit/anchor`, base
`0a0a252`). Nothing is committed. Every gate in Execution step 4 exits 0. The computed value is
`anchors-visible` on this host's Chromium 141.0.7390.37 (`/opt/pw-browsers/chromium-1194`) with
the rule shipped, so no stop condition fired.

## Placement ruling: one rule per partial, through one mixin

I read how the ledger attributes a combined rule before choosing, and the reading contradicts the
brief. The brief says a rule whose `:where()` names the keys' classes "reaches each
component's measurement". It does not. The `attributeSelector` function returns one key: the
longest shipped key any class opens with (`matchSelectorKey`). `dropdown` is 8 characters long and
`tooltip` and `popover` are 7 each, so the combined rule attributes to `dropdown` alone.

The probe (`anchor-instruments/anchor-attribution-probe.test.ts.txt`, log
`anchor-instruments/anchor-attribution-probe.log.txt`) ran `collectLedger` on the compiled cascade with the
combined rule planted in the components layer:

```text
PROBE control {"unrecorded":[],"stale":[],"unattributed":[]}
PROBE one {"unrecorded":["dropdown | :where(.dropdown-menu, .tooltip, .popover):popover-open | — | selector | —","dropdown | :where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility } | — | declaration | anchors-visible"],...}
```

An earlier run of the probe, taken at the base, also planted the per-partial shape and attributed
each of those rules to its own key (`dropdown`, `tooltip`, `popover`). Its output was not kept in a
log. The shipped ledger's mutation log, in the mutation table later in this report, shows the same
per-key attribution.

The ruling:

- Each partial writes its own rule, so each component's ledger records its own addition, and each
  partial styles only its own class.
- Under D46 the dropdown, tooltip, and popover rules are one technique that shares one decision (E29 and D47), and a
  divergence among them is a defect. The rules therefore come from one mixin,
  `anchor-visibility($class)`, in `src/styles/_mixins.scss`. The mixin emits
  `:where(.#{$class}):popover-open { position-visibility: anchors-visible }`.
- `findDuplication` does not force this choice. Its floor sits above a one-declaration block.

A combined rule would also have needed an unowned file. The existing button-reboot case in
`tests/src/styles/mixins.test.ts` reads every components-layer rule whose selector starts with
`:where(`, and either shape reddens it, as the mid-run log `anchor-instruments/anchor-mid.log.txt` shows. The
mixin brings that file into the owned set.

## Changes

- `src/styles/_mixins.scss`: adds the `anchor-visibility($class)` mixin and its comment.
- `src/styles/components/_dropdown.scss`: `@include anchor-visibility(dropdown-menu)` after the `.dropdown-menu.show` rule.
- `src/styles/components/_tooltip.scss`: `@include anchor-visibility(tooltip)` after the `.tooltip.show` rule.
- `src/styles/components/_popover.scss`: `@include anchor-visibility(popover)` after the `.popover` rule.
- `tests/src/styles/components/dropdown.test.ts`: adds the anchored visibility case. The enumeration case admits `:where(.dropdown-menu):popover-open`, and its title and comment are revised.
- `tests/src/styles/components/tooltip.test.ts`: adds the `tooltip anchored visibility` case. The enumeration case admits `:where(.tooltip):popover-open`, and its title and comment are revised.
- `tests/src/styles/components/popover.test.ts`: adds the `popover anchored visibility` case. The enumeration case admits `:where(.popover):popover-open`, and its title and comment are revised.
- `tests/src/styles/mixins.test.ts`: the button-reboot population narrows to rules whose whole selector is one `:where()` group, with a comment saying why. A mixin case reads every `position-visibility` declaration in the built text.
- `guides/veneer.md`: adds a `selector` row and a `declaration` row per component to § Additions. Each of § Dropdown classes, § Tooltip classes, and § Popover classes gains a paragraph stating the rule, the build difference, the mixin, and the consumer override, and its proof sentence names the new reading.

The diffstat from `git diff 0a0a252 --stat` is:

```text
 guides/veneer.md                             | 45 ++++++++++++++++++++++++---
 src/styles/_mixins.scss                      | 11 +++++++
 src/styles/components/_dropdown.scss         |  4 +++
 src/styles/components/_popover.scss          |  4 +++
 src/styles/components/_tooltip.scss          |  4 +++
 tests/src/styles/components/dropdown.test.ts | 46 ++++++++++++++++++++++++++--
 tests/src/styles/components/popover.test.ts  | 44 ++++++++++++++++++++++++--
 tests/src/styles/components/tooltip.test.ts  | 44 ++++++++++++++++++++++++--
 tests/src/styles/mixins.test.ts              | 28 +++++++++++++++--
```

### Enumeration titles under the seam ruling

- The tooltip title is "writes the recorded tooltip selectors, the anchored visibility selector on
  the open popover state, and no other components-layer selector naming a tooltip class". The
  popover title has the same shape.
- Each comment keeps the invariant: a missing selector and an extra selector each report there, and
  a second rule on a recorded selector leaves the reading unchanged. It adds that the admitted
  selector is this cascade's addition, recorded in § Additions, so it is read beside the key's list.
- The dropdown case reads only which recorded selectors are missing. It has no `Set` equality, and
  the seam ruling's interface does not list it. So its title says only "with every recorded
  selector and the anchored visibility selector on the open popover state" and claims no "no
  other" rejection. Its comment states that a missing selector reports, while an extra selector and
  a second rule on a recorded selector leave the reading unchanged.

### Additions rows

The `Reason` cell is identical within each pair. It is kept under the column's existing 223-character
width, so the table does not repad. The dropdown cell reads: "Chromium 141 starts the property at
`always`, so the open menu restates the `anchors-visible` value Chromium 153 starts at, and a
promoted menu whose toggle is clipped out of view is not painted on either build." The tooltip and
popover cells name the tip or the popover and its trigger.

## Failing-first and green readings

The new cases are named for what they prove:

- `dropdown classes > computes anchored visibility while the promoted menu is open and the initial value while it is closed, and yields to a consumer class`
- `tooltip anchored visibility > computes anchored visibility while the promoted tip is open and the initial value while it is closed, and yields to a consumer class`
- `popover anchored visibility > computes anchored visibility while the promoted popover is open and the initial value while it is closed, and yields to a consumer class`

Each case works the same way:

1. It asserts `CSS.supports('position-visibility', 'anchors-visible')`.
2. It reads the initial value off a bare element on the same page.
3. It promotes the key's element with `popover="manual"` and `showPopover()`.
4. It reads `anchors-visible` while the element is open, and the initial value before the show and
   after `hidePopover()`.
5. It reads `always` on a twin that carries an unlayered consumer class declaring
   `position-visibility: always` without `!important`.

The command was the same both times:
`npm run test:src:styles -- tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts -t "computes anchored visibility"`

| Reading | Log | Result |
| --- | --- | --- |
| Base (tests only, no rule) | `anchor-instruments/anchor-red.log.txt` | exit 1; `Tests  3 failed \| 68 skipped (71)`; each fails `AssertionError: expected 'always' to be 'anchors-visible'` |
| After the rule | `anchor-instruments/anchor-green.log.txt` | exit 0; `Tests  3 passed \| 68 skipped (71)` |

In the base reading, the closed-state assertion passed first, with an initial value of `always`, and
the open-state assertion is the one that failed.

## Mutation

The mutation deleted the mixin's `position-visibility: anchors-visible;` line with `sed`. Sass then
dropped the empty rule, and the built cascade carried no `:popover-open` selector. The file was
restored from a backup copy, and the checksums in `anchor-instruments/anchor-mutation-sha.txt` match the
pre-mutation `4d912fc4…af535`.

| Proof | Log | Mutated reading |
| --- | --- | --- |
| dropdown anchored visibility case | `anchor-instruments/anchor-mutation-styles.log.txt` | FAIL, `AssertionError: expected 'always' to be 'anchors-visible'` |
| tooltip anchored visibility case | same | FAIL, `AssertionError: expected 'always' to be 'anchors-visible'` |
| popover anchored visibility case | same | FAIL, `AssertionError: expected 'always' to be 'anchors-visible'` |
| dropdown enumeration case | same | FAIL, `AssertionError: expected [ Array(1) ] to deeply equal []` |
| tooltip enumeration case | same | FAIL, `AssertionError: expected [ …(21) ] to deeply equal [ …(22) ]` |
| popover enumeration case | same | FAIL, `AssertionError: expected [ …(33) ] to deeply equal [ …(34) ]` |
| mixins anchored visibility case | same | FAIL, `AssertionError: expected [] to deeply equal [ { …(3) }, { …(3) }, { …(3) } ]` |
| Styles run, 4 files | same | exit 1; `Tests  7 failed \| 113 passed (120)` |
| Conformance ledger | `anchor-instruments/anchor-mutation-conformance.log.txt` | exit 1; only `cascade ledger > names no addition the compiled cascade no longer emits` fails, `Tests  1 failed \| 44 passed (45)`, and it lists the stale rows (`dropdown`, `tooltip`, and `popover`, each with its `selector` row and its `{ position-visibility } \| declaration \| anchors-visible` row) |

After the restore, I edited one comment sentence in the mixin, replacing "the rule weighs no more
than the open state" with "the rule's specificity is the open state's alone". The final
`_mixins.scss` hash is `90fc3744…eac540`. The gate table that follows is the run after that edit.

## Tailwind search

- The pattern `position-visibility|anchors-visible|popover-open` matches nothing under
  `tests/service/tailwind/` or `src/styles/` other than the added rule and mixin.
- `position-visibility` matches nothing under `node_modules/tailwindcss/` (version 4.3.3) or
  `node_modules/@tailwindcss/`.
- So neither a Tailwind profile nor the Tailwind consumer pairing reads the property.

## Gates

Each gate ran from `anchor-instruments/anchor-gates.sh` on the final tree, after a full `npm run build`
(`anchor-instruments/anchor-build.log.txt`, exit 0).

| Gate | Log | Result |
| --- | --- | --- |
| `npm run format:check` | `anchor-instruments/anchor-format-check.log.txt` | exit=0, "All matched files use the correct format." |
| `npm run lint:check` | `anchor-instruments/anchor-lint-check.log.txt` | exit=0 |
| `npm run check` | `anchor-instruments/anchor-check.log.txt` | exit=0 |
| `npm run test:src:styles` | `anchor-instruments/anchor-test-src-styles.log.txt` | exit=0, `Tests  1533 passed (1533)` |
| `npm run test:conformance` | `anchor-instruments/anchor-test-conformance.log.txt` | exit=0, `Tests  45 passed (45)` |
| `npm run test:guides` | `anchor-instruments/anchor-test-guides.log.txt` | exit=0, `Tests  26 passed (26)` |
| `npm run test:policy` | `anchor-instruments/anchor-test-policy.log.txt` | exit=0, `Tests  109 passed \| 1 skipped (110)` |

These are my own readings. The authoritative run belongs to `verifier`.

## Diff and status

- `anchor.diff` holds `git diff 0a0a252`.
- `anchor-status.txt` holds `git status --short`: the owned files listed under
  Changes, each ` M`, and nothing else.

## Observations

- An earlier conformance run failed `runtime boundaries > bundles no forbidden runtime into a
  published JavaScript entry` with `ENOENT dist/src/core/index.js` (`anchor-instruments/anchor-conformance-pre.log.txt`).
  The worktree had only `dist/src/styles` built. It passed after `npm run build`, and my change
  cannot reach it.
- The styles log carries Sass deprecation warnings from `tests/src/styles/fixtures/contrast.scss`,
  which this unit does not touch.
- `npm run test:setup` exits 0 as an extra reading, not a brief gate (`anchor-instruments/anchor-test-setup.log.txt`).
- The new cases share one shape. A shared helper would belong in the off-limits
  `tests/setupBrowser.ts` or `tests/setupStyles.ts`, so each case stays inline, as the enumeration
  cases already do.
- The guide states the computed value and what the platform does under it. It does not state E29's
  focus limit: a suppressed overlay keeps its open state, its focus, and the engine's events. That
  behaviour belongs to J-ANCHOR-VISIBLE's proof in the engine session.
- The tooltip engine promotes with `popover="hint"` and the placement engine with `manual`, and
  `:popover-open` matches both. The cases drive `manual`, as the brief specifies.
- The playwright-core manifest names Chromium 153 (revision 1243), but the configured browsers
  directory holds only `chromium-1194` (141.0.7390.37). The measured initial value `always` confirms
  that the suite ran on 141.

## Deviation state

No stop fired. I settled these choices within the owned scope:

- one rule per partial through the `anchor-visibility` mixin;
- the case titles and comments;
- the Reason cells;
- the subsection paragraphs;
- the narrowing of the button-reboot population in `mixins.test.ts`.

The brief's premise that a combined `:where()` rule reaches each component's measurement is false.
The attribution evidence earlier in this report shows why.
