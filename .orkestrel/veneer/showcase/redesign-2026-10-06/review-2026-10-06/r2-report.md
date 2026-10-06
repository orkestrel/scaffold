# S-R2 delivery

The implementation removes the foreground utility from every affected button, makes the 29 action specimens solid secondary buttons, leaves Grid outlined and active, and selects the header outline variant from the color mode. No commit was created. The [complete patch](redesign-r2.patch) changes 21 owned files (288 insertions, 110 deletions).

All final gates pass: app:browser 245/245, setup:browser 204/204, full journey 94/94 across four variants, both type checks, formatter, lint, diff check, and guide parity (20/20). The [gate ledger](redesign-r2-gates.md) includes every command, folder, exit, bare result, and final `git status --porcelain`.

The comparison exits 67 as expected. After encoding the supplied empty host-bound set in its supported JSON form, it reports 27 differences, all classified in [the line-by-line comparison](redesign-r2-compare-classified.md). Eight resolved-row lines, eight stdout lines, and eight journal lines reflect closed component-preservation signature counts falling by two; two signature-coverage lines reflect the button class substitutions; one ordered-row line reflects those same changed values at unchanged positions. Engine, Tailwind, header geometry, census, contrast, and partition readings remain identical. The [mechanical proof](redesign-r2-compare-proof.md) checks complete payloads and signature counts, not only their labels.

## Button changes

Every class list in the following table is complete. A row naming several buttons applies the same old and new list to each named button.

| Section and buttons | Old classes | New classes |
| --- | --- | --- |
| Input group: Track, Copy; Buttons: Settings, Save draft; Modal: Open the static dialog, Open the centered dialog, Open the scrollable dialog; Offcanvas: Open the end panel, Open the top panel, Open the bottom panel; Stacks: Reset; Visually hidden: Shipment settings, Download the manifest; Engine states: List, Order notes; Navbar: Search | `btn btn-outline-secondary text-body-emphasis` | `btn btn-secondary` |
| Badge: Notifications | `btn btn-outline-secondary text-body-emphasis position-relative` | `btn btn-secondary position-relative` |
| Buttons: Add member; Spinners: Syncing | `btn btn-outline-secondary text-body-emphasis d-inline-flex align-items-center gap-2` | `btn btn-secondary d-inline-flex align-items-center gap-2` |
| Collapse: Delivery details | `btn btn-outline-secondary text-body-emphasis collapsed` | `btn btn-secondary collapsed` |
| Offcanvas: Open the sm drawer | `btn btn-sm btn-outline-secondary text-body-emphasis d-sm-none mb-2` | `btn btn-sm btn-secondary d-sm-none mb-2` |
| Offcanvas: Open the md drawer | `btn btn-sm btn-outline-secondary text-body-emphasis d-md-none mb-2` | `btn btn-sm btn-secondary d-md-none mb-2` |
| Offcanvas: Open the lg drawer | `btn btn-sm btn-outline-secondary text-body-emphasis d-lg-none mb-2` | `btn btn-sm btn-secondary d-lg-none mb-2` |
| Offcanvas: Open the xl drawer | `btn btn-sm btn-outline-secondary text-body-emphasis d-xl-none mb-2` | `btn btn-sm btn-secondary d-xl-none mb-2` |
| Offcanvas: Open the xxl drawer | `btn btn-sm btn-outline-secondary text-body-emphasis d-xxl-none mb-2` | `btn btn-sm btn-secondary d-xxl-none mb-2` |
| Tooltips: Draft | `btn btn-sm btn-outline-secondary text-body-emphasis` | `btn btn-sm btn-secondary` |
| Clearfix: Previous page | `btn btn-outline-secondary text-body-emphasis float-start` | `btn btn-secondary float-start` |
| Clearfix: Next page | `btn btn-outline-secondary text-body-emphasis float-end` | `btn btn-secondary float-end` |
| Tailwind: Subscribe | `btn btn-outline-secondary text-body-emphasis rounded-pill rounded-full` | `btn btn-secondary rounded-pill rounded-full` |
| Engine states: Grid | `btn btn-outline-secondary text-body-emphasis active` | `btn btn-outline-secondary active` |
| Header choices: “Bootstrap”, “Tailwind, no layer”, “Tailwind + layer”, “Light”, “Dark” — selected | `btn btn-outline-secondary active` | Light mode: `btn btn-sm btn-outline-dark active`; dark mode: `btn btn-sm btn-outline-light active` |
| The same header choices — unselected | `btn btn-outline-secondary text-body-emphasis` | Light mode: `btn btn-sm btn-outline-dark`; dark mode: `btn btn-sm btn-outline-light` |
| Contents — folded | `btn btn-sm btn-outline-secondary text-body-emphasis` | Light mode: `btn btn-sm btn-outline-dark`; dark mode: `btn btn-sm btn-outline-light` |
| Contents — open | `btn btn-sm btn-outline-secondary active` | Light mode: `btn btn-sm btn-outline-dark active`; dark mode: `btn btn-sm btn-outline-light active` |

The Input group caption changes `input-group btn btn-outline-secondary` to `input-group btn btn-secondary`. No other affected caption names the removed variant or utility. Accessible names, IDs, data attributes, ARIA attributes, and disabled states are preserved.

## Reading subjects

- `TAILWIND_READINGS`: Subscribe is the `Pill radius beside rounded-full` subject. Its measured property remains `border-top-left-radius`; `rounded-pill rounded-full` remains present, so the expected value remains `800px` under Bootstrap, unexcluded Tailwind, and Tailwind with the layer. No Tailwind expected value changes.
- `collectContrastSubjects`: none of the changed specimens is a member. Its page heading, Containers lead, caption title, and Contents link keep their expectations.
- `COMPONENT_TABLES`: Delivery details; the static, centered, and scrollable modal openers; the end, top, and bottom panel openers; and the sm, md, lg, xl, and xxl drawer openers are named subjects. Their class changes preserve the accessible names and the state expectations. The full journey checks those expectations.
- Header class pins: selected and unselected choices and the summary take the per-mode variants in the preceding table. `readShowcaseChrome` normalizes only selection and announcement; it no longer plants `text-body-emphasis`.
- Header color expectations are measured from the rendered variants and held to the existing 4.5:1 bar, including hover and pointer press. The all-outline case compares each foreground with an independently mounted solid counterpart, removes and restores pre-existing `active`, confirms actual `:hover` and `:active`, and rejects the planted emphasis utility.
- Component-preservation expectations are re-derived from the changed class signatures: in both widths, light `signatures` and `exclusions.excluded` move 1747 → 1745; dark moves 1751 → 1749. Every other payload field remains identical. Signature coverage changes only by the intended class substitutions, with every resulting key and count verified.
- `integration.test.ts` contains no pin naming the old header classes. Its dynamic header rows are retained and classified in the comparison.

## Deviations and controls

| Expected | Found and evidence | Disposition | Hypothesis |
| --- | --- | --- | --- |
| The brief describes 30 solid replacements plus Grid | The cited JSON says 30 affected specimens total; the checkout has 29 action/control specimens plus Grid. The complete section patch lists them. | Done: changed every named specimen; Grid retains its outline variant. | The prose total included Grid. |
| The owned Showcase methods are named as `start` and `#select`, while the change requires no foreground utility on Contents | `#drive` also restored `text-body-emphasis` when the disclosure folded. | Done: removed that one restoration line; retained its `active` toggle and drawer behavior. | The brief's method list omitted the restoration site. |
| The new population case fits the default test budget | `redesign-r2-focused-1` exits 1: the population case times out at 15000ms, and its unfinished cleanup causes three subsequent ambiguous-control failures; 108 cases pass. | Done: a 180000ms case budget, bounded by the cited 254.9s/64-outline probe. The isolated case passes in `redesign-r2-outline-1` (67.44s test time). | The default budget covers a single behavior, not this serial population walk. |
| Pointer release leaves the observed face unchanged | The installed `releasePointer` releases at the held coordinates; the initial contrast run's subsequent subject colors showed the selected face could change. | Done: the reader releases outside the page, then calls `releasePointer` to clear its marker; the tests assert the face announcement remains unchanged. | Releasing over a choice completes a click. |
| A regression control must fail at the original defect | `redesign-r2-mutation-1` exits 1 with exactly the named outline case failing: `bootstrap: Grid hover: expected rgb(0, 0, 0) not to be rgb(0, 0, 0)`. | Done: restored Grid before the project gates; the permanent test also plants and removes the utility under each face. | The important utility overrides Bootstrap's state foregrounds. |
| Formatting stays confined to changed tokens | Oxfmt also wraps the unchanged service-status paragraph in `modal.html`; its words remain identical. | Done: retained canonical formatting for the required file gate. | The existing line did not match the installed formatter. |
| The prescribed comparator accepts the supplied host-bound file | It exits 67 before reading evidence: `Evidence format: Error: Host-bound section contains no titles`. The supplied Markdown says every host-bound category has no titles. | Done: preserved that report; reran the unchanged comparator against equivalent JSON `[]` in this worktree. This permits no failures; the candidate has none. No shared tool or input was edited. | The Markdown reader retained a nonempty-set assumption after the host-bound titles were retired. |
| The comparator's row-order diagnostic identifies a moved row | It reports `dark-390: ordered rows differ` even though all 211 retained rows stay in place; only component-preservation payloads at positions 184, 191, 198, 205 change. | Done: verified every ordered row after only the two expected count substitutions, using the supplied moves exclusions. Classified as a consequence of the permitted component readings. | The comparator compares complete row strings when checking order. |

## Gate evidence

The companion [gate ledger](redesign-r2-gates.md) records the exact commands, folders, exits, and bare terminal results. The queue's browser observation is Chromium 141.0.7390.37; this unit makes no Chromium 153 claim.
