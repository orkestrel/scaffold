#!/usr/bin/env python3
"""Fold 47 (D41): the B families ship cascade keys with static state classes; the plugin
obligations form the J-ENGINE phase after the baseline; E-VUE follows J-ENGINE; the three engine
carrier rows re-carry to J-ENGINE; the stale `0.0.19` standing condition is struck. Each edit
matches once or the fold refuses."""
import pathlib, re, sys

path = pathlib.Path('/home/user/veneer/ROADMAP.md')
text = path.read_text()

def replace_once(old, new):
    global text
    if text.count(old) != 1:
        sys.exit(f'fold 47 refused: {text.count(old)} matches for {old[:70]!r}')
    text = text.replace(old, new)

def replace_row(prefix, cells):
    global text
    pattern = re.compile(r'^\| ' + re.escape(prefix) + r' +\|[^\n]*$', re.M)
    found = pattern.findall(text)
    if len(found) != 1:
        sys.exit(f'fold 47 refused: {len(found)} rows for {prefix!r}')
    text = pattern.sub(lambda m: '| ' + prefix + ' | ' + ' | '.join(cells) + ' |', text)

replace_once(
    '`F` opens the foundation, `B` the Bootstrap baseline, `E` the build-on work, and `X` the close.',
    '`F` opens the foundation, `B` the Bootstrap baseline, `E` the build-on work, `J` the engine after the baseline (D41), and `X` the close.',
)
replace_row('B-COLLAPSE … B-SCROLLSPY', [
    '`opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict',
    'Veneer',
    'B-PASSIVE-CLOSE',
    'the disclosure and navigation family\'s cascade keys (`collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`) in the cascade, the showcase, the proofs, and the ledger, every state class rendered statically; `scrollspy` (no cascade) and the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations deferred with J-ENGINE as owner (D41)',
])
replace_row('B-MODAL … B-CAROUSEL', [
    '`opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict',
    'Veneer',
    'B-COLLAPSE … B-SCROLLSPY',
    'the overlays and feedback family\'s cascade keys (`modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, `carousel`) in the cascade, the showcase, the proofs, and the ledger, every state class rendered statically; the plugin obligations and the utilities deferred with J-ENGINE as owner (D41)',
])
replace_row('E-VUE', [
    '`opus` on Opus 5.5',
    'Veneer',
    'J-ENGINE',
    'the `src/vue` environment and its `./vue` package export with no declared dependency of any kind, proved by a real Vue consumer under `tests/` (D3)',
])
# J-ENGINE row after E-IDENTITY
pattern = re.compile(r'^(\| E-IDENTITY +\|[^\n]*\n)', re.M)
if len(pattern.findall(text)) != 1:
    sys.exit('fold 47 refused: E-IDENTITY row')
j_row = ('| J-ENGINE | `opus` on Opus 5 and `sol` on Astra per unit, after its own terrain and design rounds | Veneer | B-CROSS, E-IDENTITY | '
         'Bootstrap JavaScript replaced by Veneer\'s own TypeScript engine over native browser systems, with no runtime dependency outside `@orkestrel/*` and each candidate ruled on before it enters, Elements and Mailbox read for mechanisms and lessons: one unit per plugin obligation (Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel) with lifecycle, cancellation, focus, motion, and cleanup proved per component, the shared mechanisms (the cancelable pre-change event, the entity-neutral binder, the generalized delegation, the focus primitive, placement, transition completion) landing with their first consumer, and the `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` utilities ruled native-first (D41) |\n')
text = pattern.sub(lambda m: m.group(1) + j_row, text)
# family queue bullets
replace_once(
    '- **B-COLLAPSE … B-SCROLLSPY** — `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`,\n  `scrollspy`, with the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations.',
    '- **B-COLLAPSE … B-SCROLLSPY** — `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`;\n  `scrollspy` has no cascade and is deferred to J-ENGINE with the Collapse, Dropdown, Tab, and\n  ScrollSpy plugin obligations (D41).',
)
old_modal = re.search(r'- \*\*B-MODAL … B-CAROUSEL\*\* — `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`,\n  `carousel`, with the Modal[^\n]*\n[^\n]*\n[^\n]*`TemplateFactory` utilities\.', text)
if old_modal is None:
    sys.exit('fold 47 refused: B-MODAL bullet')
text = text.replace(old_modal.group(0),
    '- **B-MODAL … B-CAROUSEL** — `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`,\n  `carousel`; the Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel plugin\n  obligations and the `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and\n  `TemplateFactory` utilities are J-ENGINE\'s (D41).')
# carrier rows
replace_once('the Navbar unit of B-COLLAPSE … B-SCROLLSPY closes their behaviour; F5 classified them (landed)',
             'the J-ENGINE Collapse unit closes their behaviour (D41); F5 classified them (landed)')
replace_once('B-COLLAPSE moves all three (F6 FOUNDATION recorded the shape, `04114c5`)',
             'J-ENGINE\'s first cancelable-event unit moves all three (D41; F6 FOUNDATION recorded the shape, `04114c5`)')
replace_once('B-COLLAPSE rules release-on-removal (F4 HOST-OBSERVATIONS recorded the present semantics, `af673cb`)',
             'J-ENGINE rules release-on-removal (D41; F4 HOST-OBSERVATIONS recorded the present semantics, `af673cb`)')
# stale standing condition
pattern = re.compile(r'^\| The registry serves `@orkestrel/test` `0\.0\.19`[^\n]*\n', re.M)
if len(pattern.findall(text)) != 1:
    sys.exit('fold 47 refused: 0.0.19 row')
text = pattern.sub('', text)
# rulings bullet before ## Routing
replace_once('\n## Routing\n',
    '\n- Close the baseline before the engine (D41). Each `B` family ships its cascade keys with every\n  state class rendered statically, and the Tailwind compatibility proofs stay green over them; the\n  plugin obligations and the utilities form J-ENGINE after the baseline, on native browser systems,\n  with no runtime dependency outside `@orkestrel/*` and each candidate ruled on, Elements and\n  Mailbox read for mechanisms and lessons.\n\n## Routing\n')
path.write_text(text)
print('fold 47 applied')
