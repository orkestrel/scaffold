# Contrast of the shipped pairings under the token candidates

No candidate keeps every pairing that Bootstrap 5.3.8 ships at or above its Bootstrap-alone ratio. Base 500 reads worse on 78 of 142 pairings at its best family choice (warning amber, info cyan) and fails 4.5:1 on 22 text pairings, 17 of which pass under Bootstrap alone; Base 600 reads worse on 74 of 142 pairings at its best family choice (warning amber, info cyan) and fails 4.5:1 on 15 text pairings, 8 of which pass under Bootstrap alone; Ramp roles reads worse on 44 of 142 pairings at its best family choice (warning yellow, info cyan) and fails 4.5:1 on 18 text pairings, 11 of which pass under Bootstrap alone. Bootstrap alone fails 4.5:1 on 9 text pairings.

`contrast.ts` in `/home/user/veneer/tmp/probes/tokens` computes every figure in this file and in `contrast.json` (2026-10-04, Bootstrap 5.3.8, Tailwind 4.3.3, Node v22.22.2). Tailwind hexes come from `tailwind-theme.json`; Bootstrap-alone hexes come from `inventory.json`, and the run asserts that Bootstrap's algebra over `_variables.scss` reproduces each of them.

## Candidates

The four candidates differ in where each role color comes from:

- Bootstrap alone: the literal hexes of the lifted sheet.
- Base 500: each theme color's base is Tailwind step 500 of its family, `$light` is gray-100, `$dark` is gray-900, every Bootstrap gray takes Tailwind gray at the same step, and Bootstrap's algebra derives hover (15%), active (20%), text-emphasis (shade 60%), bg-subtle (tint 80%), border-subtle (tint 60%), the dark roles (tint 40%, shade 80%, shade 40%), the table bg (tint 80%), the link hover (shade 20%), the dark link (tint 40%), the input focus border (tint 50%), and the dark validation colors (tint 40%).
- Base 600: as Base 500 with step 600 for the theme-color bases.
- Ramp roles: base 600, hover 700, active 800, bg-subtle 100, border-subtle 200, text-emphasis 800, table bg 100; dark text-emphasis 300, bg-subtle 950, border-subtle 700; link 600, link hover 700, dark link 300, dark link hover 200, input focus border 300, dark validation colors 300. `$light` is gray-100 with hover 200 and active 300; `$dark` is gray-900 with hover 800 and active 700, lighter like Bootstrap's tint. Bootstrap's gray roles map step for step, `mix($gray-100, $white)` maps to gray-50, and `mix($gray-800, $black)` maps to gray-950.

Every candidate keeps the shipped text colors (`#fff` and `#000`), because Tailwind white and black are the same values. Table stripe, active, and hover backgrounds follow Bootstrap's factors (5%, 10%, 7.5%) over each candidate's table bg. Warning runs once with amber and once with yellow; info runs once with cyan and once with sky.

## Marks

Each cell carries the ratio, truncated to 2 decimals, and these marks:

- `AA`: 4.5:1 or more, the normal-text threshold.
- `3:1`: from 3:1 to below 4.5:1, enough for large text and UI components only.
- `fail`: below 3:1.
- `↓`: the ratio is below the Bootstrap-alone ratio of the same pairing.
- `†`: Bootstrap's `color-contrast()`, rerun over that background, emits the other text color; a Sass-switch build that recomputes text colors changes this pairing, while a literal substitution keeps the shipped text.

## Totals per candidate

The following table counts, for each candidate and each warning and info family, the pairings that read worse than Bootstrap alone, the text pairings that fail 4.5:1, the text pairings that fail 4.5:1 although they pass under Bootstrap alone, and the backgrounds where `color-contrast()` flips the text color:

| Candidate | Warning | Info | Worse than Bootstrap | Text below 4.5:1 | Below 4.5:1, passing in Bootstrap | Text color flips |
| --- | --- | --- | --- | --- | --- | --- |
| Bootstrap alone | n/a | n/a | 0 | 9 | 0 | 0 |
| Base 500 | amber | cyan | 78 | 22 | 17 | 8 |
| Base 500 | amber | sky | 78 | 22 | 17 | 8 |
| Base 500 | yellow | cyan | 78 | 22 | 17 | 8 |
| Base 500 | yellow | sky | 78 | 22 | 17 | 8 |
| Base 600 | amber | cyan | 74 | 15 | 8 | 3 |
| Base 600 | amber | sky | 74 | 16 | 9 | 3 |
| Base 600 | yellow | cyan | 74 | 15 | 8 | 3 |
| Base 600 | yellow | sky | 74 | 16 | 9 | 3 |
| Ramp roles | amber | cyan | 51 | 18 | 11 | 6 |
| Ramp roles | amber | sky | 51 | 19 | 12 | 6 |
| Ramp roles | yellow | cyan | 44 | 18 | 11 | 6 |
| Ramp roles | yellow | sky | 44 | 19 | 12 | 6 |

Each row counts 142 pairings, 138 of them text.

## Text pairings below 4.5:1

The following list names, per candidate, every text pairing below 4.5:1 across both warning and both info families; a name ending in `@amber` or `@sky` belongs to that family only:

- Bootstrap alone (9): `btn-outline-primary-dark` 3.42, `btn-outline-secondary-dark` 3.28, `btn-outline-success-dark` 3.40, `btn-outline-danger-dark` 3.40, `btn-outline-warning` 1.63, `list-group-warning-action-dark` 4.32, `btn-outline-info` 1.95, `btn-outline-light` 1.05, `btn-outline-dark-dark` 1.00.
- Base 500 (24): `btn-primary@blue` 3.76, `btn-outline-primary@blue` 3.76, `badge-primary@blue` 3.76, `link@blue` 3.76, `btn-outline-secondary-dark@gray` 3.66, `btn-success@green` 2.21, `btn-success-hover@green` 3.03, `btn-success-active@green` 3.40, `btn-outline-success@green` 2.21, `badge-success@green` 2.21, `valid@green` 2.21, `btn-danger@red` 3.80, `btn-outline-danger@red` 3.80, `badge-danger@red` 3.80, `invalid@red` 3.80, `btn-outline-warning@amber` 2.13, `btn-outline-warning@yellow` 1.91, `btn-outline-info@cyan` 2.36, `btn-outline-info@sky` 2.70, `btn-outline-light@gray` 1.10, `btn-outline-dark-dark@gray` 1.00, `alert-dark@gray` 3.96, `list-group-dark@gray` 3.96, `list-group-dark-action@gray` 4.34.
- Base 600 (18): `btn-outline-primary-dark@blue` 3.38, `btn-outline-secondary-dark@gray` 2.34, `btn-success@green` 3.21, `btn-success-hover@green` 4.31, `btn-outline-success@green` 3.21, `badge-success@green` 3.21, `valid@green` 3.21, `btn-outline-danger-dark@red` 3.72, `btn-outline-warning@amber` 3.19, `btn-outline-warning@yellow` 2.93, `btn-outline-info@cyan` 3.61, `btn-outline-info@sky` 4.02, `btn-outline-info-dark@sky` 4.41, `btn-outline-light@gray` 1.10, `btn-outline-dark-dark@gray` 1.00, `alert-dark@gray` 3.96, `list-group-dark@gray` 3.96, `list-group-dark-action@gray` 4.34.
- Ramp roles (25): `btn-outline-primary-dark@blue` 3.38, `btn-outline-secondary-dark@gray` 2.34, `btn-success@green` 3.21, `btn-outline-success@green` 3.21, `badge-success@green` 3.21, `valid@green` 3.21, `btn-outline-danger-dark@red` 3.72, `btn-warning-hover@amber` 4.17, `btn-warning-active@amber` 2.96, `btn-outline-warning@amber` 3.19, `btn-warning-hover@yellow` 4.25, `btn-warning-active@yellow` 3.07, `btn-outline-warning@yellow` 2.93, `btn-info-hover@cyan` 3.97, `btn-info-active@cyan` 2.90, `btn-outline-info@cyan` 3.61, `btn-info-hover@sky` 3.58, `btn-info-active@sky` 2.79, `btn-outline-info@sky` 4.02, `btn-outline-info-dark@sky` 4.41, `btn-outline-light@gray` 1.10, `btn-outline-dark-dark@gray` 1.00, `alert-dark@gray` 3.96, `list-group-dark@gray` 3.96, `list-group-dark-action@gray` 4.34.

## UI pairings below 3:1

The following list names, per candidate, every UI pairing below 3:1:

- Bootstrap alone (3): `focus-ring` 1.40, `focus-ring-dark` 1.29, `focus-border` 2.05.
- Base 500 (3): `focus-ring` 1.35, `focus-ring-dark` 1.39, `focus-border` 1.87.
- Base 600 (3): `focus-ring` 1.44, `focus-ring-dark` 1.26, `focus-border` 2.19.
- Ramp roles (3): `focus-ring` 1.44, `focus-ring-dark` 1.26, `focus-border` 1.81.

## Tables per family

Each following table holds one theme color under one Tailwind family; the page rows (body, links, focus, validation) sit with the family that feeds them.

### Primary on blue

The following table measures the 24 pairings of `primary` with the Tailwind blue family; worse than Bootstrap: Base 500 12, Base 600 9, Ramp roles 6:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-primary text on bg | light | text | 4.50 AA | 3.76 3:1 ↓ † | 5.24 AA | 5.24 AA |
| .btn-primary:hover text on hover bg | light | text | 5.83 AA | 4.96 AA ↓ | 6.74 AA | 6.83 AA |
| .btn-primary:active text on active bg | light | text | 6.43 AA | 5.46 AA ↓ | 7.35 AA | 8.82 AA |
| .btn-outline-primary text on the light body | light | text | 4.50 AA | 3.76 3:1 ↓ | 5.24 AA | 5.24 AA |
| .btn-outline-primary text on the dark body | dark | text | 3.42 3:1 | 4.71 AA | 3.38 3:1 ↓ | 3.38 3:1 ↓ |
| .text-bg-primary (badge) text on bg | light | text | 4.50 AA | 3.76 3:1 ↓ † | 5.24 AA | 5.24 AA |
| .alert-primary text-emphasis on bg-subtle | light | text | 10.27 AA | 9.75 AA ↓ | 10.71 AA | 7.23 AA ↓ |
| .alert-primary text-emphasis on bg-subtle | dark | text | 7.45 AA | 8.11 AA | 7.02 AA ↓ | 8.15 AA |
| .list-group-item-primary text-emphasis on bg-subtle | light | text | 10.27 AA | 9.75 AA ↓ | 10.71 AA | 7.23 AA ↓ |
| .list-group-item-primary action hover: emphasis on border-subtle | light | text | 11.87 AA | 12.79 AA | 11.31 AA ↓ | 14.76 AA |
| .list-group-item-primary text-emphasis on bg-subtle | dark | text | 7.45 AA | 8.11 AA | 7.02 AA ↓ | 8.15 AA |
| .list-group-item-primary action hover: emphasis on border-subtle | dark | text | 9.36 AA | 8.27 AA ↓ | 10.34 AA | 6.83 AA ↓ |
| .table-primary text on bg | light | text | 15.97 AA | 16.48 AA | 15.66 AA ↓ | 17.21 AA |
| .table-primary text on striped bg | light | text | 14.37 AA | 14.82 AA | 14.08 AA ↓ | 15.40 AA |
| .table-primary text on active bg | light | text | 12.77 AA | 13.21 AA | 12.59 AA ↓ | 13.82 AA |
| .table-primary text on hover bg | light | text | 13.54 AA | 14.00 AA | 13.26 AA ↓ | 14.56 AA |
| link color on the light body | light | text | 4.50 AA | 3.76 3:1 ↓ | 5.24 AA | 5.24 AA |
| link hover color on the light body | light | text | 6.43 AA | 5.46 AA ↓ | 7.35 AA | 6.83 AA |
| link color on the dark body | dark | text | 6.38 AA | 8.22 AA | 6.79 AA | 9.78 AA |
| link hover color on the dark body | dark | text | 7.69 AA | 9.65 AA | 8.34 AA | 12.47 AA |
| focus ring (primary at alpha .25) composited on white | light | ui | 1.40 fail | 1.35 fail ↓ | 1.44 fail | 1.44 fail |
| focus ring (primary at alpha .25) composited on the dark body | dark | ui | 1.29 fail | 1.39 fail | 1.26 fail ↓ | 1.26 fail ↓ |
| .form-control:focus border (tint 50) on the light body | light | ui | 2.05 fail | 1.87 fail ↓ | 2.19 fail | 1.81 fail ↓ |
| .form-control:focus border (tint 50) on the dark body | dark | ui | 7.50 AA | 9.44 AA | 8.08 AA | 9.78 AA |

### Secondary on gray

The following table measures the 16 pairings of `secondary` with the Tailwind gray family; worse than Bootstrap: Base 500 6, Base 600 8, Ramp roles 1:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-secondary text on bg | light | text | 4.68 AA | 4.83 AA | 7.55 AA | 7.55 AA |
| .btn-secondary:hover text on hover bg | light | text | 6.09 AA | 6.22 AA | 9.24 AA | 10.30 AA |
| .btn-secondary:active text on active bg | light | text | 6.60 AA | 6.81 AA | 9.85 AA | 14.67 AA |
| .btn-outline-secondary text on the light body | light | text | 4.68 AA | 4.83 AA | 7.55 AA | 7.55 AA |
| .btn-outline-secondary text on the dark body | dark | text | 3.28 3:1 | 3.66 3:1 | 2.34 fail ↓ | 2.34 fail ↓ |
| .text-bg-secondary (badge) text on bg | light | text | 4.68 AA | 4.83 AA | 7.55 AA | 7.55 AA |
| .alert-secondary text-emphasis on bg-subtle | light | text | 10.51 AA | 10.61 AA | 11.73 AA | 13.33 AA |
| .alert-secondary text-emphasis on bg-subtle | dark | text | 7.84 AA | 7.72 AA ↓ | 6.57 AA ↓ | 13.67 AA |
| .list-group-item-secondary text-emphasis on bg-subtle | light | text | 10.51 AA | 10.61 AA | 11.73 AA | 13.33 AA |
| .list-group-item-secondary action hover: emphasis on border-subtle | light | text | 12.47 AA | 12.37 AA ↓ | 10.89 AA ↓ | 16.96 AA |
| .list-group-item-secondary text-emphasis on bg-subtle | dark | text | 7.84 AA | 7.72 AA ↓ | 6.57 AA ↓ | 13.67 AA |
| .list-group-item-secondary action hover: emphasis on border-subtle | dark | text | 9.53 AA | 9.74 AA | 12.74 AA | 10.30 AA |
| .table-secondary text on bg | light | text | 16.35 AA | 16.33 AA ↓ | 15.43 AA ↓ | 19.08 AA |
| .table-secondary text on striped bg | light | text | 14.72 AA | 14.70 AA ↓ | 13.86 AA ↓ | 17.12 AA |
| .table-secondary text on active bg | light | text | 13.06 AA | 13.07 AA | 12.39 AA ↓ | 15.29 AA |
| .table-secondary text on hover bg | light | text | 13.88 AA | 13.86 AA ↓ | 13.07 AA ↓ | 16.20 AA |

### Success on green

The following table measures the 18 pairings of `success` with the Tailwind green family; worse than Bootstrap: Base 500 9, Base 600 9, Ramp roles 8:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-success text on bg | light | text | 4.53 AA | 2.21 fail ↓ † | 3.21 3:1 ↓ † | 3.21 3:1 ↓ † |
| .btn-success:hover text on hover bg | light | text | 5.87 AA | 3.03 3:1 ↓ † | 4.31 3:1 ↓ † | 4.94 AA ↓ |
| .btn-success:active text on active bg | light | text | 6.45 AA | 3.40 3:1 ↓ † | 4.77 AA ↓ | 7.13 AA |
| .btn-outline-success text on the light body | light | text | 4.53 AA | 2.21 fail ↓ | 3.21 3:1 ↓ | 3.21 3:1 ↓ |
| .btn-outline-success text on the dark body | dark | text | 3.40 3:1 | 8.00 AA | 5.51 AA | 5.51 AA |
| .text-bg-success (badge) text on bg | light | text | 4.53 AA | 2.21 fail ↓ † | 3.21 3:1 ↓ † | 3.21 3:1 ↓ † |
| .alert-success text-emphasis on bg-subtle | light | text | 10.35 AA | 8.08 AA ↓ | 9.29 AA ↓ | 6.49 AA ↓ |
| .alert-success text-emphasis on bg-subtle | dark | text | 7.66 AA | 9.58 AA | 8.49 AA | 10.66 AA |
| .list-group-item-success text-emphasis on bg-subtle | light | text | 10.35 AA | 8.08 AA ↓ | 9.29 AA ↓ | 6.49 AA ↓ |
| .list-group-item-success action hover: emphasis on border-subtle | light | text | 12.20 AA | 14.71 AA | 13.12 AA | 17.39 AA |
| .list-group-item-success text-emphasis on bg-subtle | dark | text | 7.66 AA | 9.58 AA | 8.49 AA | 10.66 AA |
| .list-group-item-success action hover: emphasis on border-subtle | dark | text | 9.36 AA | 5.55 AA ↓ | 7.36 AA ↓ | 4.94 AA ↓ |
| .table-success text on bg | light | text | 16.18 AA | 17.54 AA | 16.67 AA | 19.12 AA |
| .table-success text on striped bg | light | text | 14.49 AA | 15.75 AA | 14.94 AA | 17.08 AA |
| .table-success text on active bg | light | text | 12.98 AA | 14.09 AA | 13.33 AA | 15.29 AA |
| .table-success text on hover bg | light | text | 13.75 AA | 14.91 AA | 14.13 AA | 16.19 AA |
| valid feedback color on the light body | light | text | 4.53 AA | 2.21 fail ↓ | 3.21 3:1 ↓ | 3.21 3:1 ↓ |
| valid feedback color on the dark body | dark | text | 6.59 AA | 10.61 AA | 8.77 AA | 12.66 AA |

### Danger on red

The following table measures the 18 pairings of `danger` with the Tailwind red family; worse than Bootstrap: Base 500 13, Base 600 10, Ramp roles 3:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-danger text on bg | light | text | 4.52 AA | 3.80 3:1 ↓ † | 4.76 AA | 4.76 AA |
| .btn-danger:hover text on hover bg | light | text | 5.91 AA | 5.08 AA ↓ | 6.26 AA | 6.42 AA |
| .btn-danger:active text on active bg | light | text | 6.49 AA | 5.58 AA ↓ | 6.84 AA | 8.35 AA |
| .btn-outline-danger text on the light body | light | text | 4.52 AA | 3.80 3:1 ↓ | 4.76 AA | 4.76 AA |
| .btn-outline-danger text on the dark body | dark | text | 3.40 3:1 | 4.66 AA | 3.72 3:1 | 3.72 3:1 |
| .text-bg-danger (badge) text on bg | light | text | 4.52 AA | 3.80 3:1 ↓ † | 4.76 AA | 4.76 AA |
| .alert-danger text-emphasis on bg-subtle | light | text | 10.21 AA | 9.58 AA ↓ | 10.01 AA ↓ | 6.85 AA ↓ |
| .alert-danger text-emphasis on bg-subtle | dark | text | 7.15 AA | 7.29 AA | 6.14 AA ↓ | 8.42 AA |
| .list-group-item-danger text-emphasis on bg-subtle | light | text | 10.21 AA | 9.58 AA ↓ | 10.01 AA ↓ | 6.85 AA ↓ |
| .list-group-item-danger action hover: emphasis on border-subtle | light | text | 11.46 AA | 11.62 AA | 9.92 AA ↓ | 14.45 AA |
| .list-group-item-danger text-emphasis on bg-subtle | dark | text | 7.15 AA | 7.29 AA | 6.14 AA ↓ | 8.42 AA |
| .list-group-item-danger action hover: emphasis on border-subtle | dark | text | 9.46 AA | 8.45 AA ↓ | 9.99 AA | 6.42 AA ↓ |
| .table-danger text on bg | light | text | 15.72 AA | 15.71 AA ↓ | 14.59 AA ↓ | 17.22 AA |
| .table-danger text on striped bg | light | text | 14.10 AA | 14.06 AA ↓ | 13.14 AA ↓ | 15.47 AA |
| .table-danger text on active bg | light | text | 12.65 AA | 12.65 AA ↓ | 11.75 AA ↓ | 13.76 AA |
| .table-danger text on hover bg | light | text | 13.35 AA | 13.34 AA ↓ | 12.42 AA ↓ | 14.60 AA |
| invalid feedback color on the light body | light | text | 4.52 AA | 3.80 3:1 ↓ | 4.76 AA | 4.76 AA |
| invalid feedback color on the dark body | dark | text | 6.10 AA | 7.27 AA | 5.79 AA ↓ | 9.24 AA |

### Warning on amber

The following table measures the 16 pairings of `warning` with the Tailwind amber family; worse than Bootstrap: Base 500 12, Base 600 12, Ramp roles 14:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-warning text on bg | light | text | 12.88 AA | 9.83 AA ↓ | 6.56 AA ↓ | 6.56 AA ↓ |
| .btn-warning:hover text on hover bg | light | text | 13.73 AA | 10.91 AA ↓ | 7.80 AA ↓ | 4.17 3:1 ↓ † |
| .btn-warning:active text on active bg | light | text | 14.04 AA | 11.31 AA ↓ | 8.25 AA ↓ | 2.96 fail ↓ † |
| .btn-outline-warning text on the light body | light | text | 1.63 fail | 2.13 fail | 3.19 3:1 | 3.19 3:1 |
| .btn-outline-warning text on the dark body | dark | text | 9.46 AA | 8.31 AA ↓ | 5.54 AA ↓ | 5.54 AA ↓ |
| .text-bg-warning (badge) text on bg | light | text | 12.88 AA | 9.83 AA ↓ | 6.56 AA ↓ | 6.56 AA ↓ |
| .alert-warning text-emphasis on bg-subtle | light | text | 7.21 AA | 7.98 AA | 9.32 AA | 6.36 AA ↓ |
| .alert-warning text-emphasis on bg-subtle | dark | text | 10.82 AA | 9.81 AA ↓ | 8.54 AA ↓ | 10.36 AA ↓ |
| .list-group-item-warning text-emphasis on bg-subtle | light | text | 7.21 AA | 7.98 AA | 9.32 AA | 6.36 AA ↓ |
| .list-group-item-warning action hover: emphasis on border-subtle | light | text | 17.05 AA | 15.43 AA ↓ | 13.34 AA ↓ | 16.87 AA ↓ |
| .list-group-item-warning text-emphasis on bg-subtle | dark | text | 10.82 AA | 9.81 AA ↓ | 8.54 AA ↓ | 10.36 AA ↓ |
| .list-group-item-warning action hover: emphasis on border-subtle | dark | text | 4.32 3:1 | 5.43 AA | 7.35 AA | 5.03 AA |
| .table-warning text on bg | light | text | 18.95 AA | 18.00 AA ↓ | 16.88 AA ↓ | 18.84 AA ↓ |
| .table-warning text on striped bg | light | text | 16.99 AA | 16.10 AA ↓ | 15.20 AA ↓ | 16.89 AA ↓ |
| .table-warning text on active bg | light | text | 15.19 AA | 14.47 AA ↓ | 13.49 AA ↓ | 15.10 AA ↓ |
| .table-warning text on hover bg | light | text | 16.08 AA | 15.22 AA ↓ | 14.31 AA ↓ | 15.98 AA ↓ |

### Warning on yellow

The following table measures the 16 pairings of `warning` with the Tailwind yellow family; worse than Bootstrap: Base 500 12, Base 600 12, Ramp roles 7:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-warning text on bg | light | text | 12.88 AA | 10.99 AA ↓ | 7.14 AA ↓ | 7.14 AA ↓ |
| .btn-warning:hover text on hover bg | light | text | 13.73 AA | 12.08 AA ↓ | 8.47 AA ↓ | 4.25 3:1 ↓ † |
| .btn-warning:active text on active bg | light | text | 14.04 AA | 12.48 AA ↓ | 8.95 AA ↓ | 3.07 3:1 ↓ † |
| .btn-outline-warning text on the light body | light | text | 1.63 fail | 1.91 fail | 2.93 fail | 2.93 fail |
| .btn-outline-warning text on the dark body | dark | text | 9.46 AA | 9.29 AA ↓ | 6.04 AA ↓ | 6.04 AA ↓ |
| .text-bg-warning (badge) text on bg | light | text | 12.88 AA | 10.99 AA ↓ | 7.14 AA ↓ | 7.14 AA ↓ |
| .alert-warning text-emphasis on bg-subtle | light | text | 7.21 AA | 7.65 AA | 9.08 AA | 6.36 AA ↓ |
| .alert-warning text-emphasis on bg-subtle | dark | text | 10.82 AA | 10.34 AA ↓ | 8.94 AA ↓ | 10.93 AA |
| .list-group-item-warning text-emphasis on bg-subtle | light | text | 7.21 AA | 7.65 AA | 9.08 AA | 6.36 AA ↓ |
| .list-group-item-warning action hover: emphasis on border-subtle | light | text | 17.05 AA | 16.15 AA ↓ | 13.95 AA ↓ | 18.05 AA |
| .list-group-item-warning text-emphasis on bg-subtle | dark | text | 10.82 AA | 10.34 AA ↓ | 8.94 AA ↓ | 10.93 AA |
| .list-group-item-warning action hover: emphasis on border-subtle | dark | text | 4.32 3:1 | 4.94 AA | 6.88 AA | 4.93 AA |
| .table-warning text on bg | light | text | 18.95 AA | 18.35 AA ↓ | 17.22 AA ↓ | 19.54 AA |
| .table-warning text on striped bg | light | text | 16.99 AA | 16.43 AA ↓ | 15.41 AA ↓ | 17.54 AA |
| .table-warning text on active bg | light | text | 15.19 AA | 14.67 AA ↓ | 13.78 AA ↓ | 15.61 AA |
| .table-warning text on hover bg | light | text | 16.08 AA | 15.54 AA ↓ | 14.65 AA ↓ | 16.50 AA |

### Info on cyan

The following table measures the 16 pairings of `info` with the Tailwind cyan family; worse than Bootstrap: Base 500 12, Base 600 12, Ramp roles 9:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-info text on bg | light | text | 10.72 AA | 8.87 AA ↓ | 5.80 AA ↓ | 5.80 AA ↓ |
| .btn-info:hover text on hover bg | light | text | 11.63 AA | 9.96 AA ↓ | 7.03 AA ↓ | 3.97 3:1 ↓ † |
| .btn-info:active text on active bg | light | text | 12.01 AA | 10.31 AA ↓ | 7.55 AA ↓ | 2.90 fail ↓ † |
| .btn-outline-info text on the light body | light | text | 1.95 fail | 2.36 fail | 3.61 3:1 | 3.61 3:1 |
| .btn-outline-info text on the dark body | dark | text | 7.87 AA | 7.50 AA ↓ | 4.90 AA ↓ | 4.90 AA ↓ |
| .text-bg-info (badge) text on bg | light | text | 10.72 AA | 8.87 AA ↓ | 5.80 AA ↓ | 5.80 AA ↓ |
| .alert-info text-emphasis on bg-subtle | light | text | 7.65 AA | 8.25 AA | 9.67 AA | 6.44 AA ↓ |
| .alert-info text-emphasis on bg-subtle | dark | text | 10.03 AA | 9.34 AA ↓ | 8.21 AA ↓ | 9.29 AA ↓ |
| .list-group-item-info text-emphasis on bg-subtle | light | text | 7.65 AA | 8.25 AA | 9.67 AA | 6.44 AA ↓ |
| .list-group-item-info action hover: emphasis on border-subtle | light | text | 15.59 AA | 14.61 AA ↓ | 12.78 AA ↓ | 16.89 AA |
| .list-group-item-info text-emphasis on bg-subtle | dark | text | 10.03 AA | 9.34 AA ↓ | 8.21 AA ↓ | 9.29 AA ↓ |
| .list-group-item-info action hover: emphasis on border-subtle | dark | text | 5.06 AA | 5.90 AA | 8.01 AA | 5.27 AA |
| .table-info text on bg | light | text | 17.99 AA | 17.50 AA ↓ | 16.49 AA ↓ | 18.72 AA |
| .table-info text on striped bg | light | text | 16.16 AA | 15.71 AA ↓ | 14.76 AA ↓ | 16.84 AA |
| .table-info text on active bg | light | text | 14.43 AA | 14.02 AA ↓ | 13.25 AA ↓ | 14.96 AA |
| .table-info text on hover bg | light | text | 15.27 AA | 14.85 AA ↓ | 14.05 AA ↓ | 15.84 AA |

### Info on sky

The following table measures the 16 pairings of `info` with the Tailwind sky family; worse than Bootstrap: Base 500 12, Base 600 12, Ramp roles 9:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-info text on bg | light | text | 10.72 AA | 7.76 AA ↓ | 5.22 AA ↓ | 5.22 AA ↓ |
| .btn-info:hover text on hover bg | light | text | 11.63 AA | 8.86 AA ↓ | 6.43 AA ↓ | 3.58 3:1 ↓ † |
| .btn-info:active text on active bg | light | text | 12.01 AA | 9.32 AA ↓ | 6.97 AA ↓ | 2.79 fail ↓ † |
| .btn-outline-info text on the light body | light | text | 1.95 fail | 2.70 fail | 4.02 3:1 | 4.02 3:1 |
| .btn-outline-info text on the dark body | dark | text | 7.87 AA | 6.55 AA ↓ | 4.41 3:1 ↓ | 4.41 3:1 ↓ |
| .text-bg-info (badge) text on bg | light | text | 10.72 AA | 7.76 AA ↓ | 5.22 AA ↓ | 5.22 AA ↓ |
| .alert-info text-emphasis on bg-subtle | light | text | 7.65 AA | 8.74 AA | 9.90 AA | 6.53 AA ↓ |
| .alert-info text-emphasis on bg-subtle | dark | text | 10.03 AA | 9.00 AA ↓ | 7.85 AA ↓ | 8.33 AA ↓ |
| .list-group-item-info text-emphasis on bg-subtle | light | text | 7.65 AA | 8.74 AA | 9.90 AA | 6.53 AA ↓ |
| .list-group-item-info action hover: emphasis on border-subtle | light | text | 15.59 AA | 13.88 AA ↓ | 12.40 AA ↓ | 15.78 AA |
| .list-group-item-info text-emphasis on bg-subtle | dark | text | 10.03 AA | 9.00 AA ↓ | 7.85 AA ↓ | 8.33 AA ↓ |
| .list-group-item-info action hover: emphasis on border-subtle | dark | text | 5.06 AA | 6.48 AA | 8.69 AA | 5.85 AA |
| .table-info text on bg | light | text | 17.99 AA | 17.09 AA ↓ | 16.21 AA ↓ | 18.26 AA |
| .table-info text on striped bg | light | text | 16.16 AA | 15.32 AA ↓ | 14.61 AA ↓ | 16.38 AA |
| .table-info text on active bg | light | text | 14.43 AA | 13.67 AA ↓ | 13.00 AA ↓ | 14.64 AA |
| .table-info text on hover bg | light | text | 15.27 AA | 14.48 AA ↓ | 13.80 AA ↓ | 15.48 AA |

### Light on gray

The following table measures the 16 pairings of `light` with the Tailwind gray family; worse than Bootstrap: Base 500 9, Base 600 9, Ramp roles 7:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-light text on bg | light | text | 19.92 AA | 19.08 AA ↓ | 19.08 AA ↓ | 19.08 AA ↓ |
| .btn-light:hover text on hover bg | light | text | 14.14 AA | 13.49 AA ↓ | 13.49 AA ↓ | 16.96 AA |
| .btn-light:active text on active bg | light | text | 12.40 AA | 11.90 AA ↓ | 11.90 AA ↓ | 14.26 AA |
| .btn-outline-light text on the light body | light | text | 1.05 fail | 1.10 fail | 1.10 fail | 1.10 fail |
| .btn-outline-light text on the dark body | dark | text | 14.63 AA | 16.12 AA | 16.12 AA | 16.12 AA |
| .text-bg-light (badge) text on bg | light | text | 19.92 AA | 19.08 AA ↓ | 19.08 AA ↓ | 19.08 AA ↓ |
| .alert-light text-emphasis on bg-subtle | light | text | 7.97 AA | 9.86 AA | 9.86 AA | 9.86 AA |
| .alert-light text-emphasis on bg-subtle | dark | text | 10.91 AA | 13.33 AA | 13.33 AA | 13.33 AA |
| .list-group-item-light text-emphasis on bg-subtle | light | text | 7.97 AA | 9.86 AA | 9.86 AA | 9.86 AA |
| .list-group-item-light action hover: emphasis on border-subtle | light | text | 17.70 AA | 16.96 AA ↓ | 16.96 AA ↓ | 16.96 AA ↓ |
| .list-group-item-light text-emphasis on bg-subtle | dark | text | 10.91 AA | 13.33 AA | 13.33 AA | 13.33 AA |
| .list-group-item-light action hover: emphasis on border-subtle | dark | text | 8.17 AA | 10.30 AA | 10.30 AA | 10.30 AA |
| .table-light text on bg | light | text | 19.92 AA | 19.08 AA ↓ | 19.08 AA ↓ | 19.08 AA ↓ |
| .table-light text on striped bg | light | text | 17.91 AA | 17.12 AA ↓ | 17.12 AA ↓ | 17.12 AA ↓ |
| .table-light text on active bg | light | text | 15.88 AA | 15.29 AA ↓ | 15.29 AA ↓ | 15.29 AA ↓ |
| .table-light text on hover bg | light | text | 16.80 AA | 16.20 AA ↓ | 16.20 AA ↓ | 16.20 AA ↓ |

### Dark on gray

The following table measures the 18 pairings of `dark` with the Tailwind gray family; worse than Bootstrap: Base 500 5, Base 600 5, Ramp roles 3:

| Pairing | Mode | Kind | Bootstrap alone | Base 500 | Base 600 | Ramp roles |
| --- | --- | --- | --- | --- | --- | --- |
| .btn-dark text on bg | light | text | 15.42 AA | 17.74 AA | 17.74 AA | 17.74 AA |
| .btn-dark:hover text on hover bg | light | text | 9.52 AA | 11.25 AA | 11.25 AA | 14.67 AA |
| .btn-dark:active text on active bg | light | text | 8.01 AA | 9.46 AA | 9.46 AA | 10.30 AA |
| .btn-outline-dark text on the light body | light | text | 15.42 AA | 17.74 AA | 17.74 AA | 17.74 AA |
| .btn-outline-dark text on the dark body | dark | text | 1.00 fail | 1.00 fail | 1.00 fail | 1.00 fail |
| .text-bg-dark (badge) text on bg | light | text | 15.42 AA | 17.74 AA | 17.74 AA | 17.74 AA |
| .alert-dark text-emphasis on bg-subtle | light | text | 5.47 AA | 3.96 3:1 ↓ | 3.96 3:1 ↓ | 3.96 3:1 ↓ |
| .alert-dark text-emphasis on bg-subtle | dark | text | 13.00 AA | 12.45 AA ↓ | 12.45 AA ↓ | 13.67 AA |
| .list-group-item-dark text-emphasis on bg-subtle | light | text | 5.47 AA | 3.96 3:1 ↓ | 3.96 3:1 ↓ | 3.96 3:1 ↓ |
| .list-group-item-dark action hover: emphasis on border-subtle | light | text | 10.12 AA | 4.34 3:1 ↓ | 4.34 3:1 ↓ | 4.34 3:1 ↓ |
| .list-group-item-dark text-emphasis on bg-subtle | dark | text | 13.00 AA | 12.45 AA ↓ | 12.45 AA ↓ | 13.67 AA |
| .list-group-item-dark action hover: emphasis on border-subtle | dark | text | 11.50 AA | 14.67 AA | 14.67 AA | 14.67 AA |
| .table-dark text on bg | light | text | 15.42 AA | 17.74 AA | 17.74 AA | 17.74 AA |
| .table-dark text on striped bg | light | text | 13.29 AA | 15.56 AA | 15.56 AA | 15.56 AA |
| .table-dark text on active bg | light | text | 11.30 AA | 13.40 AA | 13.40 AA | 13.40 AA |
| .table-dark text on hover bg | light | text | 12.32 AA | 14.56 AA | 14.56 AA | 14.56 AA |
| body color on body bg | light | text | 15.42 AA | 17.74 AA | 17.74 AA | 17.74 AA |
| body color on body bg | dark | text | 11.84 AA | 12.05 AA | 12.05 AA | 12.05 AA |

## Checks

The run asserts these checks before it writes; a failed check exits nonzero:

- WCAG ratio of #ffffff on #000000 is 21 and of a color on itself is 1; #0d6efd on #ffffff lies in (4.5, 4.51); a 20% tint of #0d6efd differs from the 80% tint #cfe2ff (reversed-weight control); Bootstrap color-contrast() picks #ffffff on #0d6efd and #000000 on #ffc107; #0d6efd at alpha .25 over #ffffff composites to #c3dbff.
- Every Bootstrap-alone pairing reads its foreground and background from the lifted sheet's literal (inventory.json selector and property, 348 lookups), and Bootstrap's algebra over the _variables.scss bases reproduces each of those literals exactly; every Bootstrap-alone role color occurs in the lifted sheet; Bootstrap's color-contrast() reproduces every shipped text color.

## Not measured

The following pairings sit outside this measurement:

- Disabled buttons (the base pairing at opacity .65 over an unknown backdrop), the button focus shadow (`--bs-btn-focus-shadow-rgb` at alpha .5), and the active list-group item, whose colors swap the alert pair and read the same ratio.
- Nav pills, pagination, dropdown, and progress active states, which pair `#fff` with the primary base and read the `.btn-primary` ratio.
- `--bs-secondary-color` and `--bs-tertiary-color` (body color at alpha .75 and .5), the `.text-*-emphasis` utilities on the body, and the indigo, purple, pink, orange, and teal hues, which no component pairs with text.
- Table variant text in dark mode: Bootstrap does not redefine `.table-*` under `[data-bs-theme=dark]`.
- A ramp whose warning and info hover and active step lighter (500 and 400), the direction of Bootstrap's tint for dark-text variants; Ramp roles here steps darker (700 and 800) for every chromatic family, as the round's candidate definition states.
- Table variant text as the body color: Bootstrap ships `#000` (`#fff` on `.table-dark`) from `color-contrast()`, and these rows measure that shipped text.

## Reproduce

Run the script twice from the veneer checkout and compare the JSON:

```sh
node tmp/probes/tokens/contrast.ts
cp /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/contrast.json /tmp/contrast-first.json
node tmp/probes/tokens/contrast.ts
cmp /tmp/contrast-first.json /home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/measurements/contrast.json
```
