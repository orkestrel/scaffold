# What remains, measured

The Orchestrator's own reading, taken while CL9 was live. The instrument is
`units/remaining-keys-probe.mjs`, which compares every key the pinned record carries against the keys
the conformance listing admits, at the CL8b landing.

## The scale

```text
keys in the record   135
listed as shipped     27
not yet listed       108

selectors shipped    781
selectors remaining 2771
```

So the package ships a fifth of the recorded selector surface and a fifth of the keys. **That is the
number to plan against**, and it was not knowable before: each unit has reported its own key's
accounting, and no artifact until now stated the whole.

## What this says about the plan

**The Content/layout family closes at 31 keys of 135.** CL9 adds the table key and CL10 adds the
icon-link, ratio, and vertical-rule keys, all four confirmed unlisted. After that the family's keys
are done and the remaining 104 keys belong to the six later families.

**One plan line was stale and is corrected.** The handoff's campaign paragraph described CL10 as
images and figures. Those keys are already listed — they shipped with the content work — and the
design verdict's unit table gives CL10 the icon-link, ratio, and vertical-rule keys, which the
handoff's own later section already said. The paragraph now agrees with the table.

## The remaining keys, grouped as the later families will take them

Sizes are selector counts from the record. Grouping is the Orchestrator's reading of the key names
against the family names the campaign already uses, not a design decision — each family's own design
round owns its unit split.

- **Forms** — `form` (195), `form-control` (79), `form-floating` (42), `form-check`, `form-select`,
  `form-range`, `input-group` (44), `placeholder`, and the validation set `valid-feedback`,
  `valid-tooltip`, `invalid-feedback`, `invalid-tooltip`, `is-valid`, `is-invalid`,
  `was-validated`. The largest single key in the record is here.
- **Disclosure and navigation** — `navbar` (88), `dropdown` (85), `nav` (42), `pagination`,
  `breadcrumb`, `accordion`, `collapse`, `collapsing`, `btn-group`, `btn-toolbar`, `btn-close`.
- **Overlays and feedback** — `offcanvas` (112), `modal` (56), `popover` (49), `tooltip`, `toast`,
  `alert`, `progress`, `spinner`, `badge`, `carousel`.
- **Passive** — `card`, `list-group` (67).
- **Helpers and utilities** — the long tail, and the largest group by key count: the spacing set
  (`m`, `mx`, `my`, `mt`, `mb`, `ms`, `me`, `p`, `px`, `py`, `pt`, `pb`, `ps`, `pe`, each 42 or fewer),
  the display and flex set (`d` 77, `flex` 72, `align` 108, `align-items`, `align-content`,
  `align-self`, `justify-content`, `order` 48), the sizing set (`w`, `h`, `mw`, `mh`, `vw`, `vh`,
  `min`), the type set (`fs`, `fst`, `fw`, `lh`, `font`, `text` 66, `text-truncate`), the paint set
  (`bg`, `border`, `rounded` 45, `shadow`, `opacity`), the position set (`position`, `top`, `bottom`,
  `start`, `end`, `fixed`, `sticky`, `translate-middle`, `z`), the remaining gap keys (`gap`,
  `column-gap`), the stack keys (`hstack`, `vstack`), and `object-fit`, `overflow`, `user-select`,
  `visible`, `invisible`, `visually-hidden`, `clearfix`, `stretched-link`, `float`, `focus-ring`.
- **Cross-cutting** — `theme` and `transition`, which are mechanisms rather than class families.

## What the shape suggests, for the design round of each family to rule on

The utilities are many keys of few selectors each, and most carry one declaration over a step or a
role list crossed with the breakpoint ramp — the shape CL8b just shipped for the gap steps, with the
same two questions each time: which scale the steps read, and whether the record groups the classes.
The components are few keys of many selectors each with large custom-property sets, the shape CL9 is
shipping now.

**That asymmetry is worth carrying into the planning**: a utilities family is many small units that
share one mechanism, and a component family is few large units that each need their own. Nothing here
decides either split; each family's design round does.
