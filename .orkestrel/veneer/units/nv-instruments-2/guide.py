"""Writes the NAV unit's guide changes into the validation copy's guides/veneer.md (c3ac297 form).

Each edit asserts its anchor occurs exactly once, so a moved or missing site stops the run.
Usage: python3 guide.py <path-to-guides/veneer.md>
"""
import sys

path = sys.argv[1]
text = open(path).read()


def once(anchor):
    count = text.count(anchor)
    assert count == 1, (anchor[:80], count)


def after(anchor, addition):
    global text
    once(anchor)
    text = text.replace(anchor, anchor + addition)


def before(anchor, addition):
    global text
    once(anchor)
    text = text.replace(anchor, addition + anchor)


def swap(old, new):
    global text
    once(old)
    text = text.replace(old, new)


def row(cells, widths):
    return '| ' + ' | '.join(cell.ljust(width) for cell, width in zip(cells, widths)) + ' |\n'


# Files: the partial's row after the button group row.
files_anchor = next(line for line in text.splitlines(keepends=True) if line.startswith('| `src/styles/components/_button-group.scss`'))
after(files_anchor, '| `src/styles/components/_nav.scss` | The nav row, its links and their states, the tabs, pills, and underline forms, the filled and justified rows, and the tab panes in the components layer. |\n')

# The section between the toolbar section and the card section.
SECTION = '''### Nav classes

The nav key ships whole, less the navbar combinators it records: the nav row and its links, the
hover, focus, and disabled states, the tabs, pills, and underline forms with their active and shown
links, the menu a tab hangs, the filled and justified rows, and the tab panes. The component partial
loads between the button group partial and the card partial in the components layer, at the
barrel's Bootstrap order.

Every value the family paints is Bootstrap 5.3.8's own, apart from the forced-colors focus outline
§ Additions records. A length reads the Veneer scale token that already resolves to it, so the link
padding and the underline gap answer to `--vn-factor-density`. The underline stroke keeps the
release's `0.125rem` literal, because the token resolving to that length is a space token and a
stroke read through it would thicken and thin with the density factor. A color reads the
compatibility variable Bootstrap itself names. The active pill is the exception: Bootstrap paints it
with literals, so the pill slots read `--vn-palette-blue` and `--vn-palette-white-base`, which carry
that exact pair, and the active pill holds one fill in the light and dark modes while the links and
tabs around it retune.

Each published property is declared on the class that owns it: the link slots on the `.nav` class,
the tab slots on the `.nav-tabs` class, the pill slots on the `.nav-pills` class, and the underline
slots on the `.nav-underline` class. A declaration on an ancestor is outranked there, so the class
itself is where a consumer retunes one. The `.nav-link` rule reads `--bs-nav-link-font-size`, and no
rule declares it; `--bs-nav-link-font-weight` is declared empty, as the release leaves them, so a
link takes its parent's size and weight until a consumer sets either property.

The link's focus ring is the recorded quarter-rem shadow at a quarter of the palette blue, written as
a mix over that token because a partial declares no literal color. The ring answers to the
`:focus-visible` pseudo-class, so a link the keyboard reaches carries the ring and a link a pointer
presses takes the hover color alone. Under forced colors the same rule also writes an outline in the
system highlight color through the `forced-ring` mixin, because forced colors paint no shadow ring.

Each tab overlaps the strip's bottom border by one border width, so the active tab's bottom border
covers the strip line where the two meet. That bottom border takes the body surface color. A hovered
or focused tab takes the hover border and the `isolate` value of `isolation`, which the release
writes so an active neighbour does not paint over the tab's focus outline. A menu hanging from a tab
is pulled up by the same border width and loses its top corners; the menu's own box ships with the
dropdown key.

An item carrying the `show` class paints its link as the active one in the tabs, pills, and
underline forms. A filled row grows each item from its own content, so the items keep their
differing widths, and a justified row grows every item from a zero basis, so the items share the row
equally. A tab pane stays hidden until it carries the `active` class.

The state classes are set in markup. The `active` class, the `show` class, and the `disabled` class
render wherever a template puts them, and no rule here sets or clears one. The Tab and ScrollSpy
behaviors that move those classes from a click or from the scroll position are engine obligations
§ Compatibility records under the J-ENGINE owner.

The link transition carries Bootstrap's own `0.15s ease-in-out` rather than the motion tokens the
Button family reads, because this family ships the release's recorded surface. It is written through
the `transition` mixin, so the reduced-motion rule the release records beside it is emitted with it.

These are the key's recorded departures.

- **The navbar combinators are absent.** The `.navbar-nav .nav-link.active` selector, the
  `.navbar-nav .nav-link.show` selector, and the expanded-navbar padding rules belong to the navbar,
  and § Deferred selectors carries a row for each with the `Navbar` owner.

The `tests/src/styles/components/nav.test.ts` proof reads each resolved treatment in the browser: the
row layout, the inherited type size and weight, each published property beside the property it
drives and retuned from its own class, the ring under keyboard focus against a pointer press, the
forced-colors outline, the refused pointer on each disabled spelling, the hover slots under a real
pointer, each tab's overlap with the strip as painted geometry, the shown link against the active
one, the menu's squared corners, the filled and justified widths, the panes, the tabs inside a card
header, the density factor, the light and dark modes, and the transition collapse under the staged
preference.

'''
before('### Card classes\n', SECTION)

# The card section's header-navigation paragraph.
swap('''The `.card-header-tabs .nav-link.active` selector names the `.nav-link` class, which belongs to
Navigation. This partial declares no rule for that class and no rule selects it alone, so the
combinator matches nothing until a consumer brings the tab markup. It is the ruling the container's
navigation combinators and the icon link's `.bi` combinator already carry: the declarations are
self-contained on the element Veneer owns.
''', '''The `.card-header-tabs .nav-link.active` combinator names the `.nav-link` class, which the nav key
ships, and this partial writes the combinator because the release writes it in its own card partial.
The card specimens carry the release's header markup: a nav list carrying the `.nav-tabs` class or
the `.nav-pills` class beside the card's own header class, with each link inside its item. The
card's header rules tie with the nav rules on specificity, and the barrel loads the card partial
after the nav partial, as the release does, so a tabs strip inside a header drops the strip line and
its active tab paints in the card's own surface.
''')

# Deferred selectors: the navbar-bearing nav names after the last row.
deferred_anchor = next(line for line in text.splitlines(keepends=True) if line.startswith('| `.offcanvas-header .btn-close`'))
for name in [
    '.navbar-nav .nav-link.active',
    '.navbar-nav .nav-link.show',
    '.navbar-expand-sm .navbar-nav .nav-link',
    '.navbar-expand-md .navbar-nav .nav-link',
    '.navbar-expand-lg .navbar-nav .nav-link',
    '.navbar-expand-xl .navbar-nav .nav-link',
    '.navbar-expand-xxl .navbar-nav .nav-link',
    '.navbar-expand .navbar-nav .nav-link',
][::-1]:
    after(deferred_anchor, f'| `{name}` | Navbar | The owning component supplies this relationship. |\n')

# Departures: the nav table before the card table.
before('#### `card`\n', '''#### `nav`

| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- | --- | --- |
| `nav` | `.nav` | `--bs-nav-link-padding-x` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `nav` | `.nav` | `--bs-nav-link-padding-y` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `nav` | `.nav-link:focus-visible` | `box-shadow` | — | `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` | tokenized |
| `nav` | `.nav-pills` | `--bs-nav-pills-link-active-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `nav` | `.nav-pills` | `--bs-nav-pills-link-active-bg` | — | `#0d6efd` | `var(--vn-palette-blue)` | tokenized |
| `nav` | `.nav-underline` | `--bs-nav-underline-gap` | — | `1rem` | `var(--vn-space-8)` | tokenized |

''')

# Additions: the forced-colors outline after the close control's row.
additions_anchor = next(line for line in text.splitlines(keepends=True) if line.startswith('| `btn-close`    | `.btn-close:focus { outline }`'))
after(additions_anchor, '| `nav` | `.nav-link:focus-visible { outline }` | `@media (forced-colors: active)` | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there. |\n')

# Compatibility: the nav CSS rows after the pagination rows, the plugin rows after the last engine row.
pagination_anchor = next(line for line in text.splitlines(keepends=True) if line.startswith('| pagination       | variable'))
after(pagination_anchor, '''| nav | selector | Every official `.nav` selector ships in the components layer, the tabs, pills, underline, fill, justified, and tab-pane rules included, less the `.navbar` combinators recorded under § Styles; resolved behavior is proved in `tests/src/styles/components/nav.test.ts`. | — | shipped |
| nav | variable | Every `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, and `--bs-nav-underline-*` property the release declares is declared on its own class; each one is read beside the property it drives in `tests/src/styles/components/nav.test.ts`. | — | shipped |
''')
engine_anchor = next(line for line in text.splitlines(keepends=True) if line.startswith('| engine           | initialization | util/index.js: `getjQuery`'))
after(engine_anchor, '''| engine | plugin | Tab: `[data-bs-toggle="tab\\|pill\\|list"]` shows the pane its trigger names with `show()`; fires `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, and `shown.bs.tab` with `relatedTarget`, `show` and `hide` cancelable; arrow keys, `Home`, and `End` move focus; writes `role`, `aria-selected`, `tabindex`, and `active`, `show` on the pane, and in a dropdown, `active` on the toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE. | — | accepted |
| engine | plugin | ScrollSpy: `[data-bs-spy="scroll"]` observes the sections its `target` links name through `IntersectionObserver` (`rootMargin`, `threshold`, `offset`, `smoothScroll`); `refresh()`, `dispose()`; fires `activate.bs.scrollspy` with `relatedTarget` and no cancelable event; moves the `active` class. Owner: J-ENGINE. | — | accepted |
''')

open(path, 'w').write(text)
print('guide written')
