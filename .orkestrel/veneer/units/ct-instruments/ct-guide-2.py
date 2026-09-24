"""Writes the THEME unit's V13 guide edit into the scratch copy's guides/veneer.md: the light and
dark roles move to a Role table after the Tier table, so the tier template no longer expands over
them, and a Token table states their release tiers in each mode. Run from the scratch copy's root
after ct-guide.py; it refuses a site whose old text is absent or repeated."""

import sys

GUIDE = 'guides/veneer.md'
guide = open(GUIDE).read()


def replace(old, new):
    global guide
    count = guide.count(old)
    if count != 1:
        sys.exit(f'site found {count} times: {old[:120]!r}')
    guide = guide.replace(old, new, 1)


replace(
    """| `light`     | `var(--vn-gray-100)`                                    | `bootstrap` — no Elements specimen renders it                                          | `--bs-light`     |
| `dark`      | `var(--vn-gray-900)`                                    | `bootstrap` — no Elements specimen renders it                                          | `--bs-dark`      |
""",
    '',
)
replace(
    """contrast the release gives its own. Each role's tiers are oklab mixes over that role's own fill,
so a retuned fill carries its whole family with it.""",
    """contrast the release gives its own. Each of these roles' tiers is an oklab mix over that role's
own fill, so a retuned fill carries its whole family with it.""",
)
replace(
    """negative red channel its `color-mix()` serialization reports.

#### Text and surface""",
    """negative red channel its `color-mix()` serialization reports.

The `light` and `dark` roles take the release's own tiers rather than the mixes. Each of their fills
sits beside the surface in one mode and beside the text in the other, and there a mix leaves an
alert's text on a fill of nearly its own color. Each tier is a gray step, apart from the `light`
role's subtle tier in light and the `dark` role's subtle tier in dark, which no gray step holds: the
release mixes its `100` step half with white for the first and its `800` step half with black for
the second, and the `src/styles/_tokens.scss` partial writes each result as its literal. The
`tests/src/styles/theme.test.ts` proof resolves every one of these tiers in each mode against the
release's value, and reads the `alert-light` and `alert-dark` classes' text against their fill at
no less contrast than the release gives them.

| Role    | Fill                 | Source                                        | Alias        |
| ------- | -------------------- | --------------------------------------------- | ------------ |
| `light` | `var(--vn-gray-100)` | `bootstrap` — no Elements specimen renders it | `--bs-light` |
| `dark`  | `var(--vn-gray-900)` | `bootstrap` — no Elements specimen renders it | `--bs-dark`  |

| Token | Light | Dark | Source | Alias |
| --- | --- | --- | --- | --- |
| `--vn-color-light-subtle`, `--vn-color-light-emphasis`, `--vn-color-light-border` | `#fcfcfd`, `var(--vn-gray-700)`, `var(--vn-gray-200)` | `var(--vn-gray-800)`, `var(--vn-gray-100)`, `var(--vn-gray-700)` | `bootstrap` — the release's `light` tiers | `--bs-light-bg-subtle`, `--bs-light-text-emphasis`, `--bs-light-border-subtle` |
| `--vn-color-dark-subtle`, `--vn-color-dark-emphasis`, `--vn-color-dark-border` | `var(--vn-gray-400)`, `var(--vn-gray-700)`, `var(--vn-gray-500)` | `#1a1d20`, `var(--vn-gray-300)`, `var(--vn-gray-800)` | `bootstrap` — the release's `dark` tiers | `--bs-dark-bg-subtle`, `--bs-dark-text-emphasis`, `--bs-dark-border-subtle` |

#### Text and surface""",
)

open(GUIDE, 'w').write(guide)
print('written')
