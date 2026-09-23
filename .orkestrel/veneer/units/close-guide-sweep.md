# CLOSE-GUIDE sweep ledger

This ledger rules every hit of the token-noun pattern and the link pattern over the whole
`guides/veneer.md` guide, at `88684bc` and after the unit's edits.

## Patterns and population

- **Token pattern.** A code span (single or double backtick) followed by a comma, or by a space and
  one of the terrain's lowercase verbs: `is are reads writes carries names sits holds follows loads
  ships keeps takes returns emits paints binds drives records refuses omits moves leaves stays
  becomes means covers lists adds declares compiles resolves matches includes uses sets has have
  does can may will reaches answers renders mounts`. The sweep joins each block of consecutive
  non-blank lines before matching, so a token at a line end followed by a verb on the next line is
  a hit too; the terrain's line grep is a subset of this population.
- **Link pattern.** A Markdown link `[text](target)` not immediately preceded by `see`, and not a
  continuation (`, ` or `and `) of a list a `see` opens.
- **Paths.** `guides/veneer.md` at `88684bc` (read through `git show 88684bc:guides/veneer.md`)
  and the working-tree `guides/veneer.md` after the edits. Fenced code blocks are excluded; table
  rows and headings are swept and ruled.
- **Rerun.** The same sweep over the edited guide returns only rows ruled permitted; no row ruled
  fixed remains.

The line columns are approximate; locate a row by its quoted text and section. A `—` in the
`88684bc` column marks a hit the edits introduced, and a `—` in the after-edits column marks a hit
the edits removed.

## Rulings

| Quoted text | Section | Line at `88684bc` | Line after edits | Ruling |
| --- | --- | --- | --- | --- |
| `Delegate` are | Surface | 65 | — | fixed |
| `emitEvent`, | Surface | 66 | — | fixed |
| `bindEventMap`, | Surface | 66 | — | fixed |
| `Delegate` are | Surface | 66 | — | fixed |
| `theme, reset, base, elements, components, utilities`, | Styles | 149 | — | fixed |
| `2rem`, | Styles | 179 | 183 | permitted as a CSS value |
| [token parity and values](../tests/src/styles/tokens.test.ts) | Styles | 178 | — | fixed |
| `elements/`, | Files | 272 | 276 | permitted as a noun following a token list |
| `components/`, | Files | 272 | 276 | permitted as a noun following a token list |
| `tests/setupStyles.ts` lists | Files | 279 | — | fixed |
| `tests/setupBrowser.ts` mounts | Files | 281 | — | fixed |
| `:is()` is | Files | 284 | — | fixed |
| `tests/setupStyles.ts`, | Files | 291 | — | fixed |
| `tests/setup.ts` carries | Files | 294 | — | fixed |
| `integration.test.ts` names | Files | 298 | — | fixed |
| `src/styles/`, | Files | 298 | — | fixed |
| `tests/src/styles/integration.test.ts` reads | Files | 300 | — | fixed |
| `theme`, | Tailwind | 316 | 321 | permitted as a table cell |
| `base`, | Tailwind | 316 | 321 | permitted as a table cell |
| [layer order and position independence](../tests/src/styles/index.test.ts) | Tailwind | 314 | 319 | permitted as a table cell |
| [stylesheet profiles](../tests/service/tailwind/profiles.test.ts) | Tailwind | 315 | 320 | permitted as a table cell |
| [stylesheet profiles](../tests/service/tailwind/profiles.test.ts) | Tailwind | 316 | 321 | permitted as a table cell |
| [stylesheet profiles](../tests/service/tailwind/profiles.test.ts) | Tailwind | 330 | — | fixed |
| `@charset`, | Tailwind | 344 | — | fixed |
| `base`, | Tailwind | 364 | — | fixed |
| `1`, | Tailwind | 391 | 394 | permitted as a CSS value |
| `tests/fixtures/tailwind/preflight.css`, | Tailwind | 408 | — | fixed |
| `container`, | Tailwind | 414 | 418 | permitted as a noun following a token list |
| `table`, | Tailwind | 414 | 418 | permitted as a noun following a token list |
| `col-1`, | Tailwind | 414 | 418 | permitted as a noun following a token list |
| `caption-top`, | Tailwind | 414 | 418 | permitted as a noun following a token list |
| `caption-bottom` are | Tailwind | 414 | — | fixed |
| [The consumer pairing](../tests/service/tailwind/consumer.test.ts) | Tailwind | 412 | — | fixed |
| `npm run build:src:styles`, | Tailwind | 444 | — | fixed |
| `base`, | Tailwind | 447 | — | fixed |
| [The preflight pairing](../tests/service/tailwind/preflight.test.ts) | Tailwind | 451 | — | fixed |
| `Tag`, | Tailwind | 463 | 466 | permitted as a noun following a token list |
| `Property`, | Tailwind | 463 | 466 | permitted as a noun following a token list |
| `Standalone`, | Tailwind | 463 | 466 | permitted as a noun following a token list |
| `tests/src/styles/fixtures/mixins.scss`, | Scripts | 688 | — | fixed |
| `npm run build:src:styles`, | Scripts | 692 | — | fixed |
| `npm run build`, | Scripts | 693 | — | fixed |
| `.caption-bottom` returns | Table classes | 702 | — | fixed |
| `bottom`, | Table classes | 705 | 708 | permitted as a CSS value |
| `--bs-icon-link-transform`, | Helper classes | 736 | 738 | permitted as a CSS property |
| `.bi`, | Helper classes | 738 | — | fixed |
| `_tokens.scss` declares | Helper classes | 753 | — | fixed |
| `--vn-border-width` is | Helper classes | 754 | 756 | permitted as a CSS property |
| `tests/src/styles/components/icon-link.test.ts`, | Helper classes | 758 | 760 | permitted as a noun following a token list |
| `tests/src/styles/components/ratio.test.ts`, | Helper classes | 758 | 760 | permitted as a noun following a token list |
| `var(--vn-motion-feedback) var(--vn-ease-standard)`, | Helper classes | 771 | 773 | permitted as a CSS function |
| `--vn-factor-motion`, | Helper classes | 772 | 774 | permitted as a CSS property |
| `.btn` does | Helper classes | 772 | — | fixed |
| `translate3d(0.25em, 0, 0)` moves | Helper classes | 774 | 776 | permitted as a CSS function |
| `--vn-palette-white-base`, | Pagination classes | 791 | 793 | permitted as a CSS property |
| `--bs-pagination-active-bg`, | Pagination classes | 795 | 797 | permitted as a CSS property |
| `--bs-pagination-active-border-color`, | Pagination classes | 796 | 798 | permitted as a CSS property |
| `2`, | Pagination classes | 807 | 809 | permitted as a CSS value |
| `3`, | Pagination classes | 808 | 810 | permitted as a CSS value |
| `tests/src/styles/components/pagination.test.ts` reads | Pagination classes | 822 | — | fixed |
| `--bs-border-width`, | Button group classes | 833 | 834 | permitted as a CSS property |
| `--vn-border-width`, | Button group classes | 834 | 835 | permitted as a CSS property |
| `.dropdown-toggle` keeps | Button group classes | 851 | — | fixed |
| `src/styles/components/_button.scss`, | Button group classes | 855 | — | fixed |
| `tests/src/styles/components/button-group.test.ts` reads | Button group classes | 858 | — | fixed |
| `--bs-border-radius`, | Progress classes | 893 | 894 | permitted as a CSS property |
| `_tokens.scss` declares | Progress classes | 893 | — | fixed |
| `--vn-radius-base`, | Progress classes | 894 | 895 | permitted as a CSS property |
| `--bs-secondary-bg`, | Progress classes | 895 | 896 | permitted as a CSS property |
| `#0d6efd`, | Progress classes | 909 | 910 | permitted as a CSS value |
| `var(--vn-palette-blue)`, | Progress classes | 910 | 911 | permitted as a CSS function |
| `rgba(var(--vn-palette-white-rgb), 0.15)`, | Progress classes | 914 | 917 | permitted as a CSS function |
| `tests/src/styles/components/progress.test.ts` reads | Progress classes | 916 | — | fixed |
| `tests/src/styles/components/spinner.test.ts` reads | Spinner classes | 938 | — | fixed |
| `xs`, | Placeholder classes | 943 | 946 | permitted as a noun following a token list |
| `sm`, | Placeholder classes | 943 | 946 | permitted as a noun following a token list |
| `em`, | Placeholder classes | 950 | 953 | permitted as a CSS value |
| `rgba(0, 0, 0, 0.8)`, | Placeholder classes | 965 | 968 | permitted as a CSS function |
| `rgba(var(--vn-palette-black-rgb), 0.8)`, | Placeholder classes | 966 | 969 | permitted as a CSS function |
| `mask-position`, | Placeholder classes | 974 | 977 | permitted as a CSS property |
| `tests/src/styles/components/placeholder.test.ts` reads | Placeholder classes | 979 | — | fixed |
| `--vn-size-3`, | Form label classes | 997 | 999 | permitted as a CSS property |
| `--vn-space-2`, | Form label classes | 1005 | 1007 | permitted as a CSS property |
| `--vn-space-3`, | Form label classes | 1007 | 1009 | permitted as a CSS property |
| `--vn-space-4`, | Form label classes | 1007 | 1009 | permitted as a CSS property |
| `--bs-border-width`, | Form label classes | 1007 | 1009 | permitted as a CSS property |
| `--vn-size-3`, | Form label classes | 1008 | 1010 | permitted as a CSS property |
| `--vn-size-5`, | Form label classes | 1008 | 1010 | permitted as a CSS property |
| `--vn-line-body`, | Form label classes | 1008 | 1010 | permitted as a CSS property |
| [The form label classes](../tests/src/styles/components/form-label.test.ts) | Form label classes | 1018 | — | fixed |
| [the styles setup proof](../tests/setupStyles.test.ts) | Form label classes | 1025 | — | fixed |
| `--vn-space-2`, | Form control classes | 1049 | 1051 | permitted as a CSS property |
| `--vn-space-3`, | Form control classes | 1049 | 1051 | permitted as a CSS property |
| `--vn-space-4`, | Form control classes | 1049 | 1051 | permitted as a CSS property |
| `--vn-space-6`, | Form control classes | 1050 | 1052 | permitted as a CSS property |
| `--vn-space-8`, | Form control classes | 1050 | 1052 | permitted as a CSS property |
| `--vn-size-2`, | Form control classes | 1050 | 1052 | permitted as a CSS property |
| `--vn-size-3`, | Form control classes | 1050 | 1052 | permitted as a CSS property |
| `::-webkit-date-and-time-value`, | Form control classes | 1094 | 1098 | permitted as a noun following a token list |
| `::-webkit-datetime-edit`, | Form control classes | 1094 | 1098 | permitted as a noun following a token list |
| `--vn-space-2`, | Form select classes | 1138 | 1141 | permitted as a CSS property |
| `--vn-space-3`, | Form select classes | 1138 | 1141 | permitted as a CSS property |
| `--vn-space-4`, | Form select classes | 1138 | 1141 | permitted as a CSS property |
| `--vn-space-6`, | Form select classes | 1138 | 1141 | permitted as a CSS property |
| `[multiple]`, | Form select classes | 1144 | — | permitted as a noun following a token list |
| `--bs-body-bg`, | Form select classes | 1171 | 1176 | permitted as a CSS property |
| `--bs-body-color`, | Form select classes | 1171 | 1176 | permitted as a CSS property |
| `--bs-border-width`, | Form select classes | 1171 | 1176 | permitted as a CSS property |
| [The select classes](../tests/src/styles/components/form-select.test.ts) | Form select classes | 1175 | — | fixed |
| [the styles setup proof](../tests/setupStyles.test.ts) | Form select classes | 1189 | — | fixed |
| `[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)`, | Form check classes | 1212 | — | fixed |
| `--vn-space-12`, | Form check classes | 1222 | 1225 | permitted as a CSS property |
| `--vn-space-1`, | Form check classes | 1222 | 1225 | permitted as a CSS property |
| `--vn-space-8`, | Form check classes | 1222 | 1225 | permitted as a CSS property |
| `--vn-palette-blue`, | Form check classes | 1227 | 1230 | permitted as a CSS property |
| `--vn-palette-white-base`, | Form check classes | 1232 | 1236 | permitted as a CSS property |
| `--vn-focus-color`, | Form check classes | 1234 | 1238 | permitted as a CSS property |
| `var(--vn-motion-feedback) var(--vn-ease-standard)`, | Form check classes | 1238 | 1243 | permitted as a CSS function |
| `0.15s ease`, | Form check classes | 1238 | 1243 | permitted as a CSS value |
| `.btn` does | Form check classes | 1239 | — | fixed |
| `-webkit-appearance`, | Form check classes | 1241 | 1246 | permitted as a CSS property |
| `-moz-appearance`, | Form check classes | 1241 | 1246 | permitted as a CSS property |
| `-webkit-print-color-adjust`, | Form check classes | 1241 | 1246 | permitted as a CSS property |
| `--bs-body-bg`, | Form check classes | 1249 | 1254 | permitted as a CSS property |
| `--bs-border-color`, | Form check classes | 1250 | 1255 | permitted as a CSS property |
| [The check classes](../tests/src/styles/components/form-check.test.ts) | Form check classes | 1253 | — | fixed |
| [the styles setup proof](../tests/setupStyles.test.ts) | Form check classes | 1260 | — | fixed |
| `src/styles/components/_form-range.scss` emits | Form range classes | 1276 | — | fixed |
| `--vn-space-12`, | Form range classes | 1283 | 1287 | permitted as a CSS property |
| `--vn-space-8`, | Form range classes | 1283 | 1287 | permitted as a CSS property |
| `--vn-space-2`, | Form range classes | 1283 | 1287 | permitted as a CSS property |
| `--vn-space-4`, | Form range classes | 1283 | 1287 | permitted as a CSS property |
| `--vn-radius-xlarge`, | Form range classes | 1283 | 1287 | permitted as a CSS property |
| `--vn-palette-blue`, | Form range classes | 1286 | 1290 | permitted as a CSS property |
| `#0d6efd`, | Form range classes | 1287 | 1291 | permitted as a CSS value |
| `--vn-palette-white-base`, | Form range classes | 1288 | 1292 | permitted as a CSS property |
| `--vn-surface-body-base`, | Form range classes | 1294 | 1299 | permitted as a CSS property |
| `var(--vn-motion-feedback) var(--vn-ease-standard)`, | Form range classes | 1297 | 1302 | permitted as a CSS function |
| `0.15s ease`, | Form range classes | 1298 | 1302 | permitted as a CSS value |
| `.btn` does | Form range classes | 1298 | — | fixed |
| `-webkit-appearance`, | Form range classes | 1301 | 1305 | permitted as a CSS property |
| `-moz-appearance`, | Form range classes | 1301 | 1305 | permitted as a CSS property |
| `-webkit-transition`, | Form range classes | 1301 | 1305 | permitted as a CSS property |
| `--bs-secondary-color`, | Form range classes | 1308 | 1312 | permitted as a CSS property |
| `:active`, | Form range classes | 1319 | — | fixed |
| `readRing` reads | Form range classes | 1323 | — | fixed |
| [The range classes](../tests/src/styles/components/form-range.test.ts) | Form range classes | 1312 | — | fixed |
| [the styles setup proof](../tests/setupStyles.test.ts) | Form range classes | 1320 | — | fixed |
| `--vn-gray-600`, | Form floating classes | 1354 | 1358 | permitted as a CSS property |
| `--vn-space-8`, | Form floating classes | 1360 | 1364 | permitted as a CSS property |
| `--vn-space-6`, | Form floating classes | 1361 | 1365 | permitted as a CSS property |
| `--vn-space-5`, | Form floating classes | 1361 | 1365 | permitted as a CSS property |
| `--vn-space-3`, | Form floating classes | 1361 | 1365 | permitted as a CSS property |
| `var(--vn-gray-600)`, | Form floating classes | 1374 | 1378 | permitted as a CSS function |
| [The floating label classes](../tests/src/styles/components/form-floating.test.ts) | Form floating classes | 1383 | — | fixed |
| `src/styles/components/_validation.scss`, | Input group classes | 1414 | — | fixed |
| `--bs-border-width`, | Input group classes | 1417 | 1421 | permitted as a CSS property |
| `.form-control`, | Input group classes | 1434 | 1438 | permitted as a noun following a token list |
| `.form-select`, | Input group classes | 1435 | 1439 | permitted as a noun following a token list |
| `--vn-space-3`, | Input group classes | 1441 | 1445 | permitted as a CSS property |
| `--vn-space-6`, | Input group classes | 1441 | 1445 | permitted as a CSS property |
| `--vn-size-3`, | Input group classes | 1441 | 1445 | permitted as a CSS property |
| `--vn-weight-body`, | Input group classes | 1441 | 1445 | permitted as a CSS property |
| `--vn-size-5`, | Input group classes | 1443 | 1447 | permitted as a CSS property |
| `calc(var(--vn-space-6) * 4)`, | Input group classes | 1444 | 1448 | permitted as a CSS function |
| `--bs-body-color`, | Input group classes | 1451 | 1455 | permitted as a CSS property |
| `--bs-tertiary-bg`, | Input group classes | 1451 | 1455 | permitted as a CSS property |
| `--bs-border-width`, | Input group classes | 1452 | 1456 | permitted as a CSS property |
| `--bs-border-color`, | Input group classes | 1452 | 1456 | permitted as a CSS property |
| `--bs-border-radius`, | Input group classes | 1452 | 1456 | permitted as a CSS property |
| `--bs-border-radius-sm`, | Input group classes | 1453 | 1457 | permitted as a CSS property |
| `z-index: 5`, | Input group classes | 1474 | 1478 | permitted as a CSS declaration |
| [The input group classes](../tests/src/styles/components/input-group.test.ts) | Input group classes | 1457 | — | fixed |
| `var(--vn-focus-width)`, | Validation classes | 1499 | 1503 | permitted as a CSS function |
| `--vn-space-4`, | Validation classes | 1503 | 1507 | permitted as a CSS property |
| `--vn-size-2`, | Validation classes | 1504 | 1508 | permitted as a CSS property |
| `var(--vn-space-24)`, | Validation classes | 1508 | 1512 | permitted as a CSS function |
| `--vn-factor-density`, | Validation classes | 1511 | 1515 | permitted as a CSS property |
| `tests/src/styles/components/validation.test.ts` reads | Validation classes | 1514 | — | fixed |
| `--bs-card-inner-border-radius` is | Card classes | 1530 | 1533 | permitted as a CSS property |
| `--vn-factor-radius` moves | Card classes | 1532 | 1535 | permitted as a CSS property |
| `.card-header-tabs .nav-link.active` names | Card classes | 1546 | — | fixed |
| `.nav-link`, | Card classes | 1546 | — | fixed |
| `1rem`, | Card classes | 1559 | 1562 | permitted as a CSS value |
| `0.75rem`, | Card classes | 1559 | 1562 | permitted as a CSS value |
| `--bs-card-title-color`, | Card classes | 1562 | 1565 | permitted as a CSS property |
| `--bs-card-subtitle-color`, | Card classes | 1563 | 1566 | permitted as a CSS property |
| `--bs-card-box-shadow`, | Card classes | 1563 | 1566 | permitted as a CSS property |
| `--bs-card-cap-color`, | Card classes | 1563 | 1566 | permitted as a CSS property |
| `--bs-card-height`, | Card classes | 1563 | 1566 | permitted as a CSS property |
| `--bs-card-box-shadow` is | Card classes | 1566 | 1569 | permitted as a CSS property |
| `box-shadow`, | Card classes | 1567 | 1570 | permitted as a CSS property |
| `tests/src/styles/components/card.test.ts` reads | Card classes | 1569 | — | fixed |
| `active` takes | List group classes | 1584 | — | fixed |
| `active` keeps | List group classes | 1591 | — | fixed |
| `--vn-palette-blue`, | List group classes | 1610 | 1612 | permitted as a CSS property |
| `--vn-color-primary-base` is | List group classes | 1611 | 1613 | permitted as a CSS property |
| `tests/src/styles/components/list-group.test.ts` reads | List group classes | 1615 | — | fixed |
| `--vn-space-4`, | Breadcrumb classes | 1629 | 1630 | permitted as a CSS property |
| `--bs-breadcrumb-font-size` is | Breadcrumb classes | 1640 | 1641 | permitted as a CSS property |
| `--bs-secondary-color`, | Breadcrumb classes | 1644 | 1645 | permitted as a CSS property |
| `tests/src/styles/components/breadcrumb.test.ts` reads | Breadcrumb classes | 1647 | — | fixed |
| `1`, | Badge classes | 1657 | 1659 | permitted as a CSS value |
| `--bs-border-radius`, | Badge classes | 1659 | 1661 | permitted as a CSS property |
| `--vn-radius-base`, | Badge classes | 1659 | 1661 | permitted as a CSS property |
| `--vn-factor-radius` reaches | Badge classes | 1660 | 1662 | permitted as a CSS property |
| `--vn-palette-white-base`, | Badge classes | 1662 | 1664 | permitted as a CSS property |
| `tests/src/styles/components/badge.test.ts` reads | Badge classes | 1671 | — | fixed |
| `rem`, | Close classes | 1682 | 1683 | permitted as a CSS value |
| `--bs-btn-close-filter`, | Close classes | 1697 | 1700 | permitted as a CSS property |
| `tests/src/styles/components/close.test.ts` reads | Close classes | 1702 | — | fixed |
| `tests/setupServer.ts` reads | Deferred selectors | 1708 | — | fixed |
| `Name`, | Deferred selectors | 1708 | 1715 | permitted as a noun following a token list |
| `Owner`, | Deferred selectors | 1708 | 1715 | permitted as a noun following a token list |
| `::file-selector-button` ships | Deferred selectors | 1724 | 1731 | permitted as a table cell |
| `src:core`, | Departures from the workspace rows | 1767 | 1774 | permitted as a noun following a token list |
| `src:browser`, | Departures from the workspace rows | 1767 | 1774 | permitted as a noun following a token list |
| `tests/src/styles/index.test.ts` reads | Departures from the workspace rows | 1783 | — | fixed |
| `tests/fixtures/tailwind/preflight.css` carries | Departures from the workspace rows | 1790 | — | fixed |
| `tests/fixtures/tailwind/unexcluded.css` carries | Departures from the workspace rows | 1791 | — | fixed |
| `core`, | Departures from the workspace rows | 1794 | 1801 | permitted as a noun following a token list |
| `browser`, | Departures from the workspace rows | 1794 | 1801 | permitted as a noun following a token list |
| `configs/src/tsconfig.styles.json`, | Departures from the workspace rows | 1796 | — | fixed |
| `src/core/constants.ts` holds | Tokens | 1805 | — | fixed |
| `src/styles/_tokens.scss` holds | Tokens | 1806 | — | fixed |
| `src/styles/_theme.scss` holds | Tokens | 1806 | — | fixed |
| `TOKEN_NAMES.color.primary.subtle` is | Tokens | 1810 | — | fixed |
| `TOKEN_NAMES.border.color` is | Tokens | 1812 | — | fixed |
| `TOKEN_NAMES.color.primary` carries | Tokens | 1812 | — | fixed |
| `base`, | Tokens | 1812 | — | fixed |
| `rgb`, | Tokens | 1812 | — | fixed |
| `--vn-text-body-base` sits | Tokens | 1814 | 1821 | permitted as a CSS property |
| `--vn-text-secondary` takes | Tokens | 1814 | 1822 | permitted as a CSS property |
| `tests/src/styles/tokens.test.ts` resolves | Reference map | 1832 | — | fixed |
| `light`, | Reference map | 1834 | 1841 | permitted as a table cell (the span quotes the written form of a value cell) |
| `tests/setupStyles.ts` refuses | Reference map | 1836 | — | fixed |
| `Role`, | Reference map | 1839 | 1846 | permitted as a noun following a token list |
| `Fill`, | Reference map | 1839 | 1846 | permitted as a noun following a token list |
| `Source`, | Reference map | 1839 | 1846 | permitted as a noun following a token list |
| `{fill}`, | Reference map | 1841 | — | fixed |
| `16%` does | Reference map | 1846 | 1854 | permitted as a CSS value |
| `:root`, | Factors | 1866 | — | fixed |
| `#0d6efd`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#6610f2`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#6f42c1`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#d63384`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#dc3545`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#fd7e14`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#ffc107`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#198754`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `#20c997`, | Palette and gray ramp | 1876 | 1885 | permitted as a table cell |
| `--vn-palette-black-base`, | Palette and gray ramp | 1877 | 1886 | permitted as a table cell |
| `#000`, | Palette and gray ramp | 1877 | 1886 | permitted as a table cell |
| `--bs-black`, | Palette and gray ramp | 1877 | 1886 | permitted as a table cell |
| `--vn-palette-white-base`, | Palette and gray ramp | 1878 | 1887 | permitted as a table cell |
| `#fff`, | Palette and gray ramp | 1878 | 1887 | permitted as a table cell |
| `--bs-white`, | Palette and gray ramp | 1878 | 1887 | permitted as a table cell |
| `#f8f9fa`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#e9ecef`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#dee2e6`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#ced4da`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#adb5bd`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#6c757d`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#495057`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `#343a40`, | Palette and gray ramp | 1879 | 1888 | permitted as a table cell |
| `--bs-gray` reads | Palette and gray ramp | 1881 | 1890 | permitted as a CSS property |
| `--bs-gray-dark` reads | Palette and gray ramp | 1881 | 1890 | permitted as a CSS property |
| `var(--vn-gray-800)`, | Palette and gray ramp | 1881 | 1890 | permitted as a CSS function |
| `tertiary` is | Semantic roles | 1888 | — | fixed |
| `oklch(0.48 0.255 264)`, | Semantic roles | 1892 | 1901 | permitted as a table cell |
| `tests/src/styles/tokens.test.ts` resolves | Semantic roles | 1911 | — | fixed |
| `--vn-surface-raised`, | Semantic roles | 1913 | 1922 | permitted as a CSS property |
| `src/styles/_tokens.scss` holds | Semantic roles | 1914 | — | fixed |
| `--vn-color-{role}-rgb` carries | Semantic roles | 1917 | 1926 | permitted as a CSS property |
| `--vn-text-body-base`, | Text and surface | 1930 | 1939 | permitted as a table cell |
| `oklch(0.208 0.042 265.755)`, | Text and surface | 1930 | 1939 | permitted as a table cell |
| `oklch(0.929 0.013 255.508)`, | Text and surface | 1930 | 1939 | permitted as a table cell |
| `--bs-body-color`, | Text and surface | 1930 | 1939 | permitted as a table cell |
| `--vn-text-emphasis-base`, | Text and surface | 1931 | 1940 | permitted as a table cell |
| `var(--vn-palette-black-base)`, | Text and surface | 1931 | 1940 | permitted as a table cell |
| `var(--vn-palette-white-base)`, | Text and surface | 1931 | 1940 | permitted as a table cell |
| `--bs-emphasis-color`, | Text and surface | 1931 | 1940 | permitted as a table cell |
| `--vn-surface-body-base`, | Text and surface | 1938 | 1947 | permitted as a table cell |
| `var(--vn-palette-white-base)`, | Text and surface | 1938 | 1947 | permitted as a table cell |
| `oklch(0.21 0.013 256)`, | Text and surface | 1938 | 1947 | permitted as a table cell |
| `--bs-body-bg`, | Text and surface | 1938 | 1947 | permitted as a table cell |
| `--vn-surface-secondary-base`, | Text and surface | 1940 | 1949 | permitted as a table cell |
| `var(--vn-gray-200)`, | Text and surface | 1940 | 1949 | permitted as a table cell |
| `var(--vn-gray-800)`, | Text and surface | 1940 | 1949 | permitted as a table cell |
| `--bs-secondary-bg`, | Text and surface | 1940 | 1949 | permitted as a table cell |
| `--vn-surface-tertiary-base`, | Text and surface | 1941 | 1950 | permitted as a table cell |
| `var(--vn-gray-100)`, | Text and surface | 1941 | 1950 | permitted as a table cell |
| `color-mix(in srgb, var(--vn-gray-800) 50%, var(--vn-gray-900))`, | Text and surface | 1941 | 1950 | permitted as a table cell |
| `--bs-tertiary-bg`, | Text and surface | 1941 | 1950 | permitted as a table cell |
| `--vn-surface-raised` is | Text and surface | 1946 | 1955 | permitted as a CSS property |
| `pre`, | Text and surface | 1947 | 1956 | permitted as a noun following a token list |
| `samp`, | Text and surface | 1947 | 1956 | permitted as a noun following a token list |
| `--vn-surface-mark` are | Text and surface | 1949 | 1958 | permitted as a CSS property |
| `--vn-text-muted` is | Text and surface | 1962 | 1971 | permitted as a CSS property |
| `--vn-text-secondary` is | Text and surface | 1963 | 1972 | permitted as a CSS property |
| `--bs-secondary-color`, | Text and surface | 1964 | 1973 | permitted as a CSS property |
| `Source`, | Links | 1970 | — | fixed |
| `--vn-link-base`, | Links | 1974 | 1983 | permitted as a table cell |
| `color-mix(in oklab, var(--vn-color-primary-base) 70%, var(--vn-text-body-base))`, | Links | 1974 | 1983 | permitted as a table cell |
| `color-mix(in oklab, var(--vn-color-primary-base) 80%, var(--vn-text-body-base))`, | Links | 1974 | 1983 | permitted as a table cell |
| `--bs-link-color`, | Links | 1974 | 1983 | permitted as a table cell |
| `--vn-link-hover-base`, | Links | 1975 | 1984 | permitted as a table cell |
| `color-mix(in srgb, var(--vn-link-base) 80%, black)`, | Links | 1975 | 1984 | permitted as a table cell |
| `color-mix(in srgb, var(--vn-link-base) 80%, black)`, | Links | 1975 | 1984 | permitted as a table cell |
| `--bs-link-hover-color`, | Links | 1975 | 1984 | permitted as a table cell |
| `tests/src/styles/elements/a.test.ts` reads | Links | 1984 | — | fixed |
| `Source`, | Type | 1990 | — | fixed |
| `--bs-font-sans-serif`, | Type | 1994 | 2003 | permitted as a table cell |
| `0.75rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `0.875rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `1rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `1.125rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `1.25rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `1.5rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `1.875rem`, | Type | 1997 | 2006 | permitted as a table cell |
| `--bs-body-font-size` reads | Type | 1997 | 2006 | permitted as a table cell |
| `5rem`, | Type | 1998 | 2007 | permitted as a table cell |
| `4.5rem`, | Type | 1998 | 2007 | permitted as a table cell |
| `4rem`, | Type | 1998 | 2007 | permitted as a table cell |
| `3.5rem`, | Type | 1998 | 2007 | permitted as a table cell |
| `3rem`, | Type | 1998 | 2007 | permitted as a table cell |
| `--vn-line-body`, | Type | 1999 | 2008 | permitted as a table cell |
| `--vn-line-heading`, | Type | 1999 | 2008 | permitted as a table cell |
| `1.5`, | Type | 1999 | 2008 | permitted as a table cell |
| `1.2`, | Type | 1999 | 2008 | permitted as a table cell |
| `--bs-body-line-height` reads | Type | 1999 | 2008 | permitted as a table cell |
| `--vn-weight-body`, | Type | 2000 | 2009 | permitted as a table cell |
| `400`, | Type | 2000 | 2009 | permitted as a table cell |
| `--bs-body-font-weight` reads | Type | 2000 | 2009 | permitted as a table cell |
| `Source`, | Space, border, radius, and elevation | 2005 | — | fixed |
| `calc(0.25rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `calc(0.375rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `calc(0.5rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `calc(0.625rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `calc(0.75rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `calc(0.875rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2011 | 2021 | permitted as a table cell |
| `--vn-space-12`, | Space, border, radius, and elevation | 2012 | 2022 | permitted as a table cell |
| `calc(1.5rem * var(--vn-factor-density))`, | Space, border, radius, and elevation | 2012 | 2022 | permitted as a table cell |
| `--vn-border-width`, | Space, border, radius, and elevation | 2013 | 2023 | permitted as a table cell |
| `1px`, | Space, border, radius, and elevation | 2013 | 2023 | permitted as a table cell |
| `--bs-border-width`, | Space, border, radius, and elevation | 2013 | 2023 | permitted as a table cell |
| `oklch(0.869 0.022 252.894)`, | Space, border, radius, and elevation | 2014 | 2024 | permitted as a table cell |
| `color-mix(in srgb, var(--vn-palette-black-base) 17.5%, transparent)`, | Space, border, radius, and elevation | 2015 | 2025 | permitted as a table cell |
| `--vn-radius-small`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `-base`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `calc(0.25rem * var(--vn-factor-radius))`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `calc(0.375rem * var(--vn-factor-radius))`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `--bs-border-radius-sm`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `--bs-border-radius`, | Space, border, radius, and elevation | 2016 | 2026 | permitted as a table cell |
| `--vn-radius-xlarge`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `-xxlarge`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `calc(1rem * var(--vn-factor-radius))`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `calc(2rem * var(--vn-factor-radius))`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `--bs-border-radius-xl`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `-xxl`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `-2xl`, | Space, border, radius, and elevation | 2017 | 2027 | permitted as a table cell |
| `0.125rem`, | Space, border, radius, and elevation | 2023 | 2033 | permitted as a CSS value |
| `--vn-space-1`, | Space, border, radius, and elevation | 2024 | 2034 | permitted as a CSS property |
| `--vn-space-8`, | Space, border, radius, and elevation | 2024 | 2034 | permitted as a CSS property |
| `--vn-space-12`, | Space, border, radius, and elevation | 2025 | 2035 | permitted as a CSS property |
| `--vn-radius-small`, | Space, border, radius, and elevation | 2026 | 2036 | permitted as a CSS property |
| `-base`, | Space, border, radius, and elevation | 2026 | — | fixed |
| `--vn-radius-pill` takes | Space, border, radius, and elevation | 2027 | 2037 | permitted as a CSS property |
| `.container-sm` reads | Space, border, radius, and elevation | 2048 | — | fixed |
| `.container-fluid` reads | Space, border, radius, and elevation | 2049 | — | fixed |
| `Source`, | Motion, focus, validation, breakpoints, and stacking | 2068 | — | fixed |
| `--vn-motion-feedback`, | Motion, focus, validation, breakpoints, and stacking | 2073 | 2083 | permitted as a table cell |
| `calc(150ms * var(--vn-factor-motion))`, | Motion, focus, validation, breakpoints, and stacking | 2073 | 2083 | permitted as a table cell |
| `--vn-ease-standard`, | Motion, focus, validation, breakpoints, and stacking | 2074 | 2084 | permitted as a table cell |
| `--vn-ease-out`, | Motion, focus, validation, breakpoints, and stacking | 2074 | 2084 | permitted as a table cell |
| `ease`, | Motion, focus, validation, breakpoints, and stacking | 2074 | 2084 | permitted as a table cell |
| `ease-out`, | Motion, focus, validation, breakpoints, and stacking | 2074 | 2084 | permitted as a table cell |
| `--vn-focus-width`, | Motion, focus, validation, breakpoints, and stacking | 2075 | 2085 | permitted as a table cell |
| `0.1875rem`, | Motion, focus, validation, breakpoints, and stacking | 2075 | 2085 | permitted as a table cell |
| `--bs-focus-ring-width`, | Motion, focus, validation, breakpoints, and stacking | 2075 | 2085 | permitted as a table cell |
| `--vn-focus-highlight`, | Motion, focus, validation, breakpoints, and stacking | 2077 | 2087 | permitted as a table cell |
| `Highlight`, | Motion, focus, validation, breakpoints, and stacking | 2077 | 2087 | permitted as a table cell |
| `var(--vn-color-success-base)`, | Motion, focus, validation, breakpoints, and stacking | 2078 | 2088 | permitted as a table cell |
| `--bs-form-valid-color`, | Motion, focus, validation, breakpoints, and stacking | 2078 | 2088 | permitted as a table cell |
| `var(--vn-color-danger-base)`, | Motion, focus, validation, breakpoints, and stacking | 2079 | 2089 | permitted as a table cell |
| `--bs-form-invalid-color`, | Motion, focus, validation, breakpoints, and stacking | 2079 | 2089 | permitted as a table cell |
| `0`, | Motion, focus, validation, breakpoints, and stacking | 2080 | 2090 | permitted as a table cell |
| `576px`, | Motion, focus, validation, breakpoints, and stacking | 2080 | 2090 | permitted as a table cell |
| `768px`, | Motion, focus, validation, breakpoints, and stacking | 2080 | 2090 | permitted as a table cell |
| `992px`, | Motion, focus, validation, breakpoints, and stacking | 2080 | 2090 | permitted as a table cell |
| `1200px`, | Motion, focus, validation, breakpoints, and stacking | 2080 | 2090 | permitted as a table cell |
| `--vn-stack-dropdown`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `-sticky`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `1000`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `1020`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `$zindex-dropdown`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `$zindex-sticky`, | Motion, focus, validation, breakpoints, and stacking | 2081 | 2091 | permitted as a table cell |
| `--vn-stack-drawer-backdrop`, | Motion, focus, validation, breakpoints, and stacking | 2082 | 2092 | permitted as a table cell |
| `1040`, | Motion, focus, validation, breakpoints, and stacking | 2082 | 2092 | permitted as a table cell |
| `--vn-stack-dialog-backdrop`, | Motion, focus, validation, breakpoints, and stacking | 2083 | 2093 | permitted as a table cell |
| `1050`, | Motion, focus, validation, breakpoints, and stacking | 2083 | 2093 | permitted as a table cell |
| `--vn-stack-popover`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `-hint`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `1070`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `1080`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `$zindex-popover`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `$zindex-tooltip`, | Motion, focus, validation, breakpoints, and stacking | 2084 | 2094 | permitted as a table cell |
| `src/styles/_mixins.scss` holds | Motion, focus, validation, breakpoints, and stacking | 2087 | — | fixed |
| `breakpoint-up` reaches | Motion, focus, validation, breakpoints, and stacking | 2089 | — | fixed |
| `breakpoint-up(xs)` emits | Motion, focus, validation, breakpoints, and stacking | 2091 | — | fixed |
| `breakpoint-down(xs)` emits | Motion, focus, validation, breakpoints, and stacking | 2091 | — | fixed |
| `drawer` is | Motion, focus, validation, breakpoints, and stacking | 2094 | — | fixed |
| `--bs-btn-box-shadow`, | Button states and bindings | 2115 | 2125 | permitted as a table cell |
| `.form-control:focus`, | Button states and bindings | 2127 | 2137 | permitted as a noun following a token list |
| `.form-select:focus`, | Button states and bindings | 2127 | 2137 | permitted as a noun following a token list |
| `--vn-color-{role}-base`, | Button states and bindings | 2162 | 2172 | permitted as a CSS property |
| `--vn-link-base`, | Button states and bindings | 2169 | 2179 | permitted as a CSS property |
| `--vn-link-hover-base`, | Button states and bindings | 2169 | 2179 | permitted as a CSS property |
| `--bs-carousel-indicator-active-bg`, | Bootstrap variables Veneer retains | 2179 | 2189 | permitted as a CSS property |
| `--bs-carousel-caption-color`, | Bootstrap variables Veneer retains | 2179 | 2189 | permitted as a CSS property |
| `--bs-navbar-toggler-icon-bg`, | Bootstrap variables Veneer retains | 2188 | 2198 | permitted as a CSS property |
| `--bs-accordion-btn-icon`, | Bootstrap variables Veneer retains | 2188 | 2198 | permitted as a CSS property |
| `--bs-form-switch-bg` are | Bootstrap variables Veneer retains | 2194 | 2204 | permitted as a CSS property |
| `@layer theme`, | Customization | 2201 | — | fixed |
| `--vn-space-3`, | Customization | 2221 | 2235 | permitted as a CSS property |
| `--bs-primary-bg-subtle`, | Customization | 2222 | 2236 | permitted as a CSS property |
| `--bs-primary-text-emphasis`, | Customization | 2223 | 2237 | permitted as a CSS property |
| `tests/setupServer.ts` reads | Departures | 2239 | — | fixed |
| `0.875em` are | Departures | 2247 | 2263 | permitted as a CSS value |
| `Condition` records | Departures | 2249 | — | fixed |
| `(empty)` records | Departures | 2250 | — | fixed |
| `aliased` reads | Departures | 2253 | — | fixed |
| `fallback` keeps | Departures | 2254 | — | fixed |
| `dropped` writes | Departures | 2254 | — | fixed |
| `declared` writes | Departures | 2255 | — | fixed |
| `dropped`, | Departures | 2256 | — | fixed |
| `tests/setupServer.ts` reads | Additions | 3572 | — | fixed |
| `Category` names | Additions | 3574 | — | fixed |
| `Condition` is | Additions | 3577 | — | fixed |
| `—` records | Additions | 3578 | — | fixed |
| `:root`, | Additions | 3584 | 3602 | permitted as a table cell |
| `"Noto Sans"`, | Outside the ledger | 3757 | 3775 | permitted as a noun following a token list |
| `"Liberation Sans"`, | Outside the ledger | 3757 | 3775 | permitted as a noun following a token list |
| `1.2`, | Outside the ledger | 3759 | 3777 | permitted as a CSS value |
| `0.375rem`, | Outside the ledger | 3759 | 3777 | permitted as a CSS value |
| `--bs-carousel-indicator-active-bg`, | Outside the ledger | 3761 | 3779 | permitted as a CSS property |
| `--bs-carousel-caption-color`, | Outside the ledger | 3761 | 3779 | permitted as a CSS property |
| `scanCompatibilityPresence` reads | Outside the ledger | 3772 | — | fixed |
| `tests/src/styles/mixins.test.ts` reads | Outside the ledger | 3778 | — | fixed |
| `.col-form-label`, | Compatibility | 3823 | 3841 | permitted as a table cell |
| `.col-form-label-lg`, | Compatibility | 3823 | 3841 | permitted as a table cell |
| `--vn-gutter-y`, | Compatibility | 3830 | 3848 | permitted as a table cell |
| `--vn-link-rgb`, | Compatibility | 3894 | 3912 | permitted as a table cell |
| `.badge`, | Compatibility | 3899 | 3917 | permitted as a table cell |
| `.breadcrumb`, | Compatibility | 3901 | 3919 | permitted as a table cell |
| `.card`, | Compatibility | 3905 | 3923 | permitted as a table cell |
| `--bs-form-check-bg`, | Compatibility | 3909 | 3927 | permitted as a table cell |
| `--bs-form-check-bg-image`, | Compatibility | 3909 | 3927 | permitted as a table cell |
| `--bs-form-check-bg`, | Compatibility | 3912 | 3930 | permitted as a table cell |
| `--bs-form-check-bg-image`, | Compatibility | 3912 | 3930 | permitted as a table cell |
| `--bs-form-select-bg-icon` ships | Compatibility | 3915 | 3933 | permitted as a table cell |
| `src/styles/components/_input-group.scss`, | Compatibility | 3929 | 3947 | permitted as a table cell |
| `.pagination`, | Compatibility | 3936 | 3954 | permitted as a table cell |
| `.page-link`, | Compatibility | 3936 | 3954 | permitted as a table cell |
| `eventName(name)` returns | Compatibility | 3938 | 3956 | permitted as a table cell |
| `getElement(element)` is | Compatibility | 3941 | 3959 | permitted as a table cell |
| `getInstance`, | Compatibility | 3942 | 3960 | permitted as a table cell |
| `getOrCreateInstance(element, config = {})`, | Compatibility | 3942 | 3960 | permitted as a table cell |
| `Default`, | Compatibility | 3948 | 3966 | permitted as a table cell |
| `getDataAttributes`, | Compatibility | 3948 | 3966 | permitted as a table cell |
| `Manipulator.getDataAttributes` reads | Compatibility | 3949 | 3967 | permitted as a table cell |
| `bsConfig`, | Compatibility | 3949 | 3967 | permitted as a table cell |
| `SelectorEngine.getSelector` reads | Compatibility | 3950 | 3968 | permitted as a table cell |
| `find`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `findOne`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `children`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `parents`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `prev`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `next`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `focusableChildren`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `getElementFromSelector`, | Compatibility | 3950 | 3968 | permitted as a table cell |
| `enableDismissTrigger(component, method = 'hide')` binds | Compatibility | 3952 | 3970 | permitted as a table cell |
| `transitionend`, | Compatibility | 3953 | 3971 | permitted as a table cell |
| `Default: {}`, | Compatibility | 3956 | 3974 | permitted as a table cell |
| `BaseComponent`, | Compatibility | 3956 | 3974 | permitted as a table cell |
| `Backdrop`, | Compatibility | 3956 | 3974 | permitted as a table cell |
| `FocusTrap`, | Compatibility | 3956 | 3974 | permitted as a table cell |
| `Swipe`, | Compatibility | 3956 | 3974 | permitted as a table cell |
| `getUID`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `getElement`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `isElement`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `isVisible`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `isDisabled`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `isRTL`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `toType`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `noop`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `parseSelector`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `reflow`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `execute`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `findShadowRoot`, | Compatibility | 3957 | 3975 | permitted as a table cell |
| `document.body` carries | Compatibility | 3958 | 3976 | permitted as a table cell |
| `interpolate-size: allow-keywords`, | Showcase | 4012 | 4024 | permitted as a CSS declaration |
| `tests/src/styles/elements/html.test.ts` reads | Showcase | 4012 | — | fixed |
| `opacity: 0`, | Showcase | 4021 | 4030 | permitted as a CSS declaration |
| [showcase journeys](../tests/app/browser/integration.test.ts) | Tests | 4057 | — | fixed |
| `tmp/capture/states`, | Tests | 4101 | — | fixed |
| `tmp/capture/<variant>.txt` keeps | Tests | 4115 | — | fixed |
| `--vn-radius-base`, | Space, border, radius, and elevation | — | 2036 | permitted as a CSS property |
| `--vn-palette-blue`, | Customization | — | 2213 | permitted as a CSS property |
