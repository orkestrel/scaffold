P4 derives 73 rows in this run: 44 reproduce the current 46-row table, 29 are outside it, and 2 current rows are not reproduced. The corpus comparison reproduces 12 of its 13 row identities, with 1 not reproduced and 61 derived rows outside that expected-row list.

The final 1280 light closed condition in iteration 2 records 0 preflight and 0 unattributed departures, against probe-3's 0 and 18. It records 288 resolved departures. The final matrix records 1960 copy-check hits.

Chromium 141.0.7390.37; Linux; v22.22.2. Every launch specimen title passed in specimens.json. The pinned Chromium executable, existing dist/app/browser page, loopback port 0, and installed Sass and Tailwind packages were used. No npm script, build, install, commit, or tracked-file edit was run.

## Current-table comparison

Rows compare by form and class or selector. Longhands are measured derivation evidence; reboot copies carry the complete matching reboot declaration. Fold marks do not remove derived rows.

| Form | Class or selector | Derived longhands | Current longhands | Mark |
| --- | --- | --- | --- | --- |
| restore | `svg:where(.bi)` | display, border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | display | reproduced |
| scoped | `:where(.table) thead` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | border-top-color, border-right-color, border-bottom-color, border-left-color | reproduced |
| scoped | `:where(.table) th` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | border-top-color, border-right-color, border-bottom-color, border-left-color | reproduced |
| scoped | `:where(.table) tbody` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | border-top-color, border-right-color, border-bottom-color, border-left-color, border-top-width | reproduced |
| scoped | `:where(.table) td` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | border-top-color, border-right-color, border-bottom-color, border-left-color | reproduced |
| reboot | `lead` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-1` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-2` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-3` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-4` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-5` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `display-6` | margin-block-end, margin-bottom | — | outside the current table |
| reboot | `list-unstyled` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `list-inline` | margin-block-end, margin-bottom | — | outside the current table |
| reboot | `row` | margin-block-end, margin-bottom | — | outside the current table; corpus ruling: no fold row |
| reboot | `col-sm-9` | margin-block-end, margin-bottom | — | outside the current table; corpus ruling: no fold row |
| reboot | `col-sm-8` | margin-block-end, margin-bottom | — | outside the current table; corpus ruling: no fold row |
| reboot | `table-group-divider` | border-block-end-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| scoped | `:where(.table-group-divider) td` | border-block-end-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `table-active` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| restore | `img:where(.figure-img)` | display, max-width | display | reproduced |
| restore | `img:where(.img-fluid)` | display | display | reproduced |
| reboot | `figure` | margin-block-end, margin-bottom | — | outside the current table |
| restore | `input:where(.form-check-input)` | color | color | reproduced |
| restore | `input:where(.btn-check)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color, color | color | reproduced |
| restore | `input:where(.form-range)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color, color | color | reproduced |
| reboot | `accordion-header` | font-size, font-weight | font-size, font-weight | reproduced |
| reboot | `alert-link` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `alert-heading` | font-size, font-weight, margin-block-end, margin-bottom | — | outside the current table |
| reboot | `link-body-emphasis` | text-decoration-line | text-decoration-line | reproduced |
| restore | `img:where(.card-img-top)` | max-width | max-width | reproduced |
| reboot | `card-text` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| restore | `a:where(.card-link)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `card-link` | color, text-decoration-color, text-decoration-line | color, text-decoration-color, text-decoration-line | reproduced |
| restore | `a:where(.icon-link)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `icon-link` | color, text-decoration-line | color, text-decoration-line | reproduced |
| reboot | `card-title` | font-size, font-weight | font-size, font-weight | reproduced |
| reboot | `card-subtitle` | font-weight | — | outside the current table |
| restore | `img:where(.card-img)` | max-width | max-width | reproduced |
| restore | `img:where(.card-img-bottom)` | max-width | max-width | reproduced |
| reboot | `card-header` | font-size, font-weight | — | outside the current table |
| scoped | `:where(.carousel-indicators) button` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `dropdown-header` | font-weight | — | outside the current table |
| reboot | `modal-title` | font-weight | font-size, font-weight | reproduced |
| reboot | `pagination` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `placeholder-glow` | margin-block-end, margin-bottom | margin-block-end, margin-bottom | reproduced |
| reboot | `placeholder-wave` | margin-block-end, margin-bottom | — | outside the current table |
| reboot | `link-primary` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-secondary` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-success` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-danger` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-dark` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-warning` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-info` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `link-light` | text-decoration-line | text-decoration-line | reproduced |
| reboot | `focus-ring` | color | color | reproduced |
| reboot | `focus-ring-primary` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-secondary` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-success` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-danger` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-warning` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-info` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-light` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `focus-ring-dark` | color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| restore | `a:where(.icon-link-hover)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `icon-link-hover` | color, text-decoration-line | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| restore | `a:where(.stretched-link)` | border-block-end-color, border-block-start-color, border-bottom-color, border-inline-end-color, border-inline-start-color, border-left-color, border-right-color, border-top-color | — | outside the current table; re-derived after fold dropped it as redundant or invisible |
| reboot | `stretched-link` | color, text-decoration-color, text-decoration-line | color, text-decoration-color, text-decoration-line | reproduced |
| reboot | `visually-hidden-focusable` | color, text-decoration-color, text-decoration-line | color, text-decoration-color, text-decoration-line | reproduced |
| reboot | `offcanvas-title` | font-size, font-weight | font-size, font-weight | reproduced |
| reboot | `popover-header` | font-weight | font-weight | reproduced |
| scoped | `:where(.navbar-text) a` | text-decoration-line | — | outside the current table |
| restore | `button:where(.accordion-button)` | font-weight | font-weight | reproduced |
| scoped | `:where(.table) tfoot` | — | border-top-color, border-right-color, border-bottom-color, border-left-color | current row not reproduced |
| scoped | `:where(.table) tr` | — | border-top-color, border-right-color, border-bottom-color, border-left-color | current row not reproduced |

## Corpus comparison

The A/F columns are direct readings of the documented specimen in iteration 0, at 1280 light closed. The fixed point still derives from its signature representatives alone. A nonrepresentative specimen is read only for this required comparison and cannot add a row.

| Expected form and row | Expected longhands | Derived longhands | Mark | Specimen A | Specimen F | Representative |
| --- | --- | --- | --- | --- | --- | --- |
| reboot `alert-heading` | font-size,font-weight,margin-bottom | font-size, font-weight, margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none | {"font-size":"24px","font-weight":"500","margin-bottom":"8px"} | {"font-size":"16px","font-weight":"400","margin-bottom":"0px"} | true |
| reboot `card-subtitle` | font-weight | font-weight | reproduced | {"font-weight":"500"} | {"font-weight":"400"} | true |
| reboot `card-header` | font-size,font-weight | font-size, font-weight | reproduced | {"font-size":"20px","font-weight":"500"} | {"font-size":"16px","font-weight":"400"} | true |
| reboot `dropdown-header` | font-weight | font-weight | reproduced | {"font-weight":"500"} | {"font-weight":"400"} | true |
| reboot `display-6` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none | {"margin-bottom":"8px"} | {"margin-bottom":"0px"} | true |
| reboot `list-inline` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none | {"margin-bottom":"16px"} | {"margin-bottom":"0px"} | true |
| reboot `row` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none; no fold row under the corpus ruling | {"margin-bottom":"16px"} | {"margin-bottom":"0px"} | true |
| reboot `col-sm-9` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none; no fold row under the corpus ruling | {"margin-bottom":"8px"} | {"margin-bottom":"0px"} | true |
| reboot `col-sm-8` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none; no fold row under the corpus ruling | {"margin-bottom":"8px"} | {"margin-bottom":"0px"} | true |
| reboot `figure` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none | {"margin-bottom":"16px"} | {"margin-bottom":"0px"} | true |
| reboot `placeholder-wave` | margin-bottom | margin-block-end, margin-bottom | derived with other longhands: extra margin-block-end; missing none | {"margin-bottom":"16px"} | {"margin-bottom":"0px"} | true |
| restore `img:where(.img-thumbnail)` | display | — | not reproduced | {"display":"inline"} | {"display":"block"} | false |
| scoped `:where(.navbar-text) a` | text-decoration-line,text-decoration-color | text-decoration-line | derived with other longhands: extra none; missing text-decoration-color; fold accepted from the measured underline departure | {"text-decoration-line":"underline","text-decoration-color":"rgb(0, 0, 0)"} | {"text-decoration-line":"none","text-decoration-color":"rgb(0, 0, 0)"} | false |

Corpus fold marks: row, col-sm-9, and col-sm-8 receive no production row under the Orchestrator ruling; S7 remains a consumer-owned departure. Their measured rows remain in curation.json when derived. The navbar scoped row is accepted only if derived; the table records its underline measurement. Bare descendant content remains Tailwind-owned under corpus § 3. The card > hr case remains an unmeasured residual because this corpus supplies no specimen.

