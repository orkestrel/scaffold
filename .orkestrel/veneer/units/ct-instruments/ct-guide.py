"""Writes the THEME unit's guide edits into the scratch copy's guides/veneer.md.

Reads the measured theme departures from tmp/units/ct-ledger.json.txt (the ledger dump the
tmp/units/ct-ledger.test.ts.txt probe wrote) and replaces each site by its exact old text, refusing
any site whose old text is absent or repeated. Run from the scratch copy's root.
"""

import json
import sys

GUIDE = 'guides/veneer.md'
LEDGER = '../../units/ct-ledger.json.txt'

guide = open(GUIDE).read()


def replace(old, new):
    global guide
    count = guide.count(old)
    if count != 1:
        sys.exit(f'site found {count} times: {old[:120]!r}')
    guide = guide.replace(old, new, 1)


def cell(value):
    if value is None:
        return '—'
    if value == '':
        return '(empty)'
    return f'`{value}`'


ledger = json.load(open(LEDGER))
rows = [
    '| '
    + ' | '.join(
        [
            f"`{row['component']}`",
            f"`{row['selector']}`",
            f"`{row['property']}`",
            '—' if row.get('condition') is None else f"`{row['condition']}`",
            cell(row.get('recorded')),
            cell(row.get('emitted')),
            row['departure'],
        ]
    )
    + ' |'
    for row in ledger['departures']
]
if any('`' in value for row in ledger['departures'] for value in (row.get('recorded') or '', row.get('emitted') or '')):
    sys.exit('a measured value carries a backtick')

theme_table = '\n'.join(
    [
        '#### `theme`',
        '',
        'The `theme` key records the document scope, the light and dark scopes, the breakpoint aliases,',
        'the smooth-scroll rule, and the dark component rules, and each row sits where the release writes',
        'the declaration, whatever partial writes it here. The `dropped` rows are the names the release',
        'repeats in its light scope although no mode changes them. Veneer declares each of them at `:root`',
        'alone, and a light island inherits each one from `:root` through every island around it, so a',
        'light island nested in a dark one reads the document value; the',
        '`tests/src/styles/theme.test.ts` proof reads every such name there. The dark component rules the',
        'form select, form check, navbar, and accordion partials write match the release and carry no row.',
        '',
        '| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |',
        '| --- | --- | --- | --- | --- | --- | --- |',
        *rows,
        '',
    ]
)

replace(
    """| `icon-link` | `.icon-link > .bi` | `transition`                    | —         | `0.2s ease-in-out transform`                                  | `transform var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized |

### Additions""",
    """| `icon-link` | `.icon-link > .bi` | `transition`                    | —         | `0.2s ease-in-out transform`                                  | `transform var(--vn-motion-feedback) var(--vn-ease-standard)` | tokenized |

"""
    + theme_table
    + """
### Additions""",
)

# X4: the reboot `:root` Reason.
replace(
    '| selector    | The reset layer writes this rule, and the release writes the same declaration under `:root`, which its inventory records under the `theme` key this package does not ship. |',
    '| selector    | The reset layer answers to `reboot`, whose vocabulary records no `:root` rule; the release records the same declaration under the `theme` key, whose comparison matches it. |',
)

# X2 and X3: the theme additions.
replace(
    """| `focus-ring`   | `.focus-ring:focus { outline }`                               | `@media (forced-colors: active)`""",
    """| `focus-ring`   | `.focus-ring:focus { outline }`                               | `@media (forced-colors: active)`""",
)
additions_tail_start = guide.index('| `focus-ring`   | `.focus-ring:focus { outline }`')
additions_tail_end = guide.index('\n', additions_tail_start)
guide = (
    guide[: additions_tail_end + 1]
    + '\n'.join(
        [
            '| `theme` | `[data-bs-theme=light] { color-scheme }` | — | declaration | The light scope names its scheme as the dark scope does, so a light island nested in a dark one returns its form controls and scrollbars to the light scheme. |',
            '| `theme` | `--bs-primary` | — | property | The primary fill retunes in dark, and an alias declared at `:root` alone keeps the light fill inside a dark island, so the dark scope declares it again. |',
            '| `theme` | `--bs-primary-rgb` | — | property | The primary triplet retunes in dark with its fill, so the dark scope declares its alias again. |',
            '| `theme` | `--bs-focus-ring-color` | — | property | The ring mixes the primary fill, which retunes in dark, so the dark scope declares the ring again. |',
            '| `theme` | `--bs-secondary` | — | property | The secondary fill retunes in dark, and an alias declared at `:root` alone keeps the light fill inside a dark island, so the dark scope declares it again. |',
            '| `theme` | `--bs-secondary-rgb` | — | property | The secondary triplet retunes in dark with its fill, so the dark scope declares its alias again. |',
        ]
    )
    + '\n'
    + guide[additions_tail_end + 1 :]
)

# X2: the compatibility row, after the last toast row and before the engine rows.
toast_variable = guide.index('| toast            | variable       |')
toast_end = guide.index('\n', toast_variable)
guide = (
    guide[: toast_end + 1]
    + '| theme | selector | Every official theme selector ships: the document scope, the light and dark scopes, and the breakpoint aliases from the `_tokens.scss` and `_theme.scss` partials in the theme layer; the smooth-scroll rule from the `_reset.scss` partial in the reset layer; and the dark caret, knob, toggler icon, and chevron rules from the `_form-select.scss`, `_form-check.scss`, `_navbar.scss`, and `_accordion.scss` partials in the components layer. Resolved scopes, nested islands, and the dark roles are proved in the `tests/src/styles/theme.test.ts` proof. | — | shipped |\n'
    + guide[toast_end + 1 :]
)

# V10: the secondary role row and the retune sentence.
replace(
    '| `secondary` | `oklch(0.446 0.043 257.281)`                        | `elements` — secondary fill                        | `--bs-secondary` |',
    "| `secondary` | `oklch(0.446 0.043 257.281)`, dark `var(--vn-gray-600)` | `elements` — secondary fill in light; the dark fill is the release's `bootstrap` value | `--bs-secondary` |",
)
replace(
    """Only the primary fill retunes by mode. Each role's tiers are oklab mixes over that role's own fill,
so a retuned fill carries its whole family with it.""",
    """Only the primary and secondary fills retune by mode. The dark secondary fill is the release's own,
because Elements' slate reads about 2.3 to 1 against the dark canvas; the
`tests/src/styles/theme.test.ts` proof holds a secondary label in a dark island to at least the
contrast the release gives its own. Each role's tiers are oklab mixes over that role's own fill,
so a retuned fill carries its whole family with it.""",
)
replace(
    """The percentages are Elements' own, and the `tests/src/styles/tokens.test.ts` proof resolves each
measured role's tier against the color Elements renders for it.""",
    """The percentages are Elements' own, and the `tests/src/styles/tokens.test.ts` proof resolves each
measured role's tier against the color Elements renders for it. No reading measures the dark
secondary tiers, which follow the release's fill.""",
)

# V12: the link hover row and its paragraph.
replace(
    '| `--vn-link-hover-base`, `-rgb` | `color-mix(in srgb, var(--vn-link-base) 80%, black)`, `10, 43, 137`                              | `color-mix(in srgb, var(--vn-link-base) 80%, black)`, `63, 148, 190`                              | `derived` — the resting link shaded toward black in each mode                                  | `--bs-link-hover-color`, `--bs-link-hover-color-rgb` |',
    '| `--vn-link-hover-base`, `-rgb` | `color-mix(in srgb, var(--vn-link-base) 65%, black)`, `8, 35, 112` | `color-mix(in srgb, var(--vn-link-base) 65%, white)`, `141, 210, 244` | `derived` — the resting link carried 35% toward black in light and toward white in dark | `--bs-link-hover-color`, `--bs-link-hover-color-rgb` |',
)
replace(
    """`--vn-link-base` departs from Bootstrap's own link color, and the preceding Links row states the
value each mode carries. Bootstrap paints `#0d6efd` in light and `#6ea8fe` in dark, and shades its
hover toward black in light and toward white in dark. Veneer carries the primary fill toward the
body text in each mode instead, and shades the hover toward black in each mode. The departure ledger
carries no link row, because its comparison reaches no theme-scope token; § Outside the ledger
records that limit, and the preceding Links table is where a canonical link value is recorded. The
`tests/src/styles/elements/a.test.ts` proof reads the `a` tag's resting and hover colors in each
mode against the recorded readings of `--vn-link-base` and `--vn-link-hover-base`.""",
    """`--vn-link-base` departs from Bootstrap's own link color, and the preceding Links row states the
value each mode carries. Bootstrap paints `#0d6efd` in light and `#6ea8fe` in dark, and carries its
hover 20% toward black in light and 20% toward white in dark. Veneer carries the primary fill toward
the body text in each mode instead, and carries the hover the release's way in each mode, 35% of the
way. Veneer's resting link is darker than the release's in light, so a 20% step there reads as no
step; at 35%, each mode's hover and resting colors differ by at least the contrast between the
release's own hover and resting colors. The `#### theme` table in § Departures records each
`--bs-link-*` alias against the release's value, and the preceding Links table is where a canonical
link value is recorded. The `tests/src/styles/elements/a.test.ts` proof reads the `a` tag's resting
and hover colors in each mode against the recorded readings of `--vn-link-base` and
`--vn-link-hover-base`, and the `tests/src/styles/theme.test.ts` proof reads each mode's hover
direction and step against the release's pair.""",
)

# X1: the retained theme-scope variables.
replace(
    """palette token where the release writes a literal. The release records those theme-scope declarations
under its `theme` vocabulary rather than under the `carousel` key, so no ledger row measures them
there. The `carousel` key measures the same variables where the `.carousel-dark` class declares
them, and its rows in § Departures record the black the class paints through
`--vn-palette-black-base`.""",
    """palette token where the release writes a literal. The release records those theme-scope declarations
under its `theme` vocabulary rather than under the `carousel` key, so the `#### theme` table in
§ Departures measures them there. The `carousel` key measures the same variables where the
`.carousel-dark` class declares them, and its rows in § Departures record the black the class paints
through `--vn-palette-black-base`.""",
)
replace(
    """`--bs-btn-close-filter` belongs to the `btn` vocabulary instead, so § Departures measures it, and
its rows there record the empty light-scope declaration this cascade writes against the filter the
release records.""",
    """The theme scopes declare `--bs-btn-close-filter` the same way, and the release records those
declarations under the `theme` key too, whose table carries no row for them: each scope writes the
release's own value, empty in light and the inversion in dark.""",
)

# X1 and X3: the canonical-token paragraph outside the ledger.
replace(
    """Canonical token values are the first. § Reference map records each `--vn-*` value beside the Bootstrap
name it answers to, and a value that differs is a difference this ledger never reads, because the
theme scopes the tokens are declared in belong to the release's `theme` vocabulary rather than to a
shipped component. `--vn-font-sans` drops""",
    """Canonical token values are the first. The release records no `--vn-*` name, so the ledger compares
no canonical value: the `#### theme` table in § Departures compares each `--bs-*` alias the theme
scopes declare with the release's value, and records an alias reading a canonical token as
`tokenized`. § Reference map records each `--vn-*` value beside the Bootstrap name it answers to,
and the `collectAdditions` function treats every name the `TOKEN_NAMES` registry carries as recorded
there rather than as an addition. `--vn-font-sans` drops""",
)
replace(
    """The `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and
`--bs-carousel-control-icon-filter` declarations in the theme scopes belong to that `theme`
vocabulary for the same reason, so § Bootstrap variables Veneer retains records them; the
`carousel` key measures only the declarations its dark class writes.""",
    """The `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and
`--bs-carousel-control-icon-filter` declarations in the theme scopes answer to the `theme` key, whose
table measures them, and § Bootstrap variables Veneer retains records them; the `carousel` key
measures only the declarations its dark class writes.""",
)

# X11: the Color modes section, ahead of the first class section.
replace(
    """### Table classes
""",
    """### Color modes

The `theme` key ships whole. The `:root` selector carries the light closure, and the
`[data-bs-theme='light']` and `[data-bs-theme='dark']` selectors carry each mode's closure. A
document reads the light closure from `:root` until the `ColorMode` controller writes the
`data-bs-theme` attribute on its root.

Each mode selector is a plain attribute selector, so any element carrying the attribute opens an
island, and every token beneath that element takes the island's mode. A custom property carries its
`var()` references already substituted, so each mode scope declares again every token whose value
the mode changes, every tier mixed from one, and every `--bs-*` alias reading one. A light island
nested in a dark one therefore returns its subtree to the light closure. A name no mode changes is
declared at `:root` alone, and every island inherits it from there.

The mode scopes retune tokens and paint nothing. An island paints its own surface and text through
the `bg-body` and `text-body` utilities, or through a component that reads the body tokens. Each
scope sets the `color-scheme` property, so a form control and a scrollbar inside an island take the
island's scheme.

The select's caret, the unchecked switch's knob, the navbar toggler's icon, and the accordion's
chevrons are images a data URI carries, not tokens. The form select, form check, navbar, and
accordion partials each write the dark image on a component rule under any dark ancestor, as the
release does, so a light island nested in a dark one keeps the dark images. § Bootstrap variables
Veneer retains names each variable.

§ Reference map gives every token's value in each mode, the primary and secondary fills that retune
and the link hover included.

The Color modes region renders one specimen: a light surface holding a dark island that holds a
nested light island. Each surface carries body text, a button, a select, a switch, a navbar toggler,
and an accordion button.

The `tests/src/styles/theme.test.ts` proof reads the scopes in the browser: each mode's body tokens
and scheme, a nested island the controller returns to the light closure, every role tier across
nested islands, the dark secondary fill against the release's contrast, each mode's link hover
against the release's direction and step, and each name the light scope leaves to `:root` inside a
nested island. The `tests/src/styles/tokens.test.ts` proof resolves the reference map in each mode.

### Table classes
""",
)

# X11: the showcase paragraph, after the fade paragraph.
replace(
    """The Toast region renders no toast carrying the `showing` class, and the capture registry declines""",
    """The Color modes region renders the `Nested islands` specimen, whose surfaces each declare their own
mode, so the specimen renders the same arrangement in both page modes. The capture registry reads
its frame on the dark island, and the frame covers the whole specimen; see
[color mode specimens](../tests/app/browser/sections/ColorModeSection.test.ts) and
[theme scopes](../tests/src/styles/theme.test.ts).

The Toast region renders no toast carrying the `showing` class, and the capture registry declines""",
)

# X11: the tests link.
replace(
    """[color specimens](../tests/app/browser/sections/ColorSection.test.ts),
""",
    """[color specimens](../tests/app/browser/sections/ColorSection.test.ts),
[color mode specimens](../tests/app/browser/sections/ColorModeSection.test.ts),
""",
)

open(GUIDE, 'w').write(guide)
print('theme rows', len(rows))
