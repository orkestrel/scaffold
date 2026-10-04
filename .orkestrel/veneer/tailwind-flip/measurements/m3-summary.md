# M3 summary

Chromium 141.0.7390.37. 55 fragments, 61 documents (fragment × viewport). A pair is (element, longhand), (element, pseudo + longhand or pseudo presence), or (element, box field). Conditions: A = bootstrap-lifted.css; D = tailwind-flipped.css + bootstrap-lifted-minus-shared.css; C = tailwind-flipped.css + bootstrap-reboot-reset-minus-shared.css.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/elements.json`, `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`.

The following table gives per-document element counts by label and departing pairs by label.

| fragment | viewport | elements | el component-class | el shared-utility | el bootstrap-other | el bare | D-vs-A component-class | D-vs-A shared-utility | D-vs-A bootstrap-other | D-vs-A bare | D-vs-A all | C-vs-A component-class | C-vs-A shared-utility | C-vs-A bootstrap-other | C-vs-A bare | C-vs-A all | elements departing C-vs-A |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accordion.html | 1280x800 | 47 | 41 | 1 | 4 | 1 | 510 | 10 | 40 | 10 | 570 | 526 | 15 | 50 | 15 | 606 | 47 |
| alerts.html | 1280x800 | 98 | 70 | 4 | 12 | 12 | 715 | 48 | 120 | 122 | 1005 | 777 | 53 | 150 | 139 | 1119 | 98 |
| badge.html | 1280x800 | 54 | 41 | 5 | 8 | 0 | 419 | 75 | 80 | 0 | 574 | 447 | 78 | 100 | 0 | 625 | 54 |
| breadcrumb.html | 1280x800 | 39 | 26 | 1 | 4 | 8 | 335 | 17 | 40 | 91 | 483 | 348 | 17 | 50 | 148 | 563 | 39 |
| button-group.html | 1280x800 | 56 | 46 | 1 | 8 | 1 | 318 | 10 | 80 | 10 | 418 | 338 | 15 | 100 | 15 | 468 | 56 |
| buttons.html | 1280x800 | 86 | 56 | 11 | 12 | 7 | 357 | 150 | 120 | 70 | 697 | 387 | 155 | 150 | 81 | 773 | 86 |
| card.html | 1280x800 | 104 | 89 | 0 | 10 | 5 | 1158 | 0 | 100 | 49 | 1307 | 1297 | 0 | 125 | 71 | 1493 | 104 |
| carousel.html | 1280x800 | 103 | 68 | 15 | 12 | 8 | 1034 | 233 | 130 | 102 | 1499 | 1077 | 238 | 155 | 119 | 1589 | 103 |
| checks-radios.html | 1280x800 | 103 | 78 | 7 | 16 | 2 | 884 | 77 | 169 | 4 | 1134 | 927 | 99 | 207 | 30 | 1263 | 103 |
| clearfix.html | 1280x800 | 11 | 8 | 1 | 2 | 0 | 98 | 10 | 20 | 0 | 128 | 103 | 10 | 25 | 0 | 138 | 11 |
| close-button.html | 1280x800 | 24 | 15 | 3 | 4 | 2 | 117 | 81 | 40 | 20 | 258 | 127 | 86 | 50 | 30 | 293 | 24 |
| collapse.html | 1280x800 | 32 | 22 | 3 | 6 | 1 | 209 | 30 | 60 | 10 | 309 | 224 | 35 | 75 | 15 | 349 | 32 |
| collapse.html | 390x844 | 32 | 22 | 3 | 6 | 1 | 193 | 30 | 60 | 10 | 293 | 208 | 35 | 75 | 15 | 333 | 32 |
| color-background.html | 1280x800 | 35 | 31 | 0 | 4 | 0 | 481 | 0 | 40 | 0 | 521 | 491 | 0 | 50 | 0 | 541 | 35 |
| colored-links.html | 1280x800 | 37 | 24 | 5 | 6 | 2 | 263 | 90 | 60 | 20 | 433 | 305 | 100 | 75 | 30 | 510 | 37 |
| containers.html | 1280x800 | 38 | 20 | 1 | 16 | 1 | 243 | 9 | 144 | 9 | 405 | 248 | 15 | 206 | 15 | 484 | 38 |
| containers.html | 390x844 | 38 | 20 | 1 | 16 | 1 | 243 | 9 | 144 | 9 | 405 | 341 | 15 | 241 | 15 | 612 | 38 |
| dropdowns.html | 1280x800 | 197 | 122 | 12 | 21 | 42 | 1010 | 194 | 218 | 400 | 1822 | 1078 | 204 | 268 | 415 | 1965 | 197 |
| engine-states.html | 1280x800 | 109 | 65 | 21 | 14 | 9 | 858 | 287 | 140 | 90 | 1375 | 923 | 322 | 175 | 137 | 1557 | 109 |
| figures.html | 1280x800 | 19 | 15 | 0 | 4 | 0 | 163 | 0 | 36 | 0 | 199 | 173 | 0 | 48 | 0 | 221 | 19 |
| floating-labels.html | 1280x800 | 48 | 29 | 2 | 8 | 9 | 343 | 34 | 80 | 67 | 524 | 363 | 34 | 100 | 67 | 564 | 48 |
| focus-ring.html | 1280x800 | 24 | 18 | 2 | 4 | 0 | 185 | 20 | 40 | 0 | 245 | 267 | 20 | 50 | 0 | 337 | 24 |
| form-controls.html | 1280x800 | 63 | 44 | 7 | 12 | 0 | 442 | 113 | 120 | 0 | 675 | 472 | 113 | 150 | 0 | 735 | 63 |
| form-layout.html | 1280x800 | 69 | 50 | 6 | 7 | 6 | 627 | 96 | 75 | 80 | 878 | 650 | 101 | 92 | 93 | 936 | 69 |
| icon-link.html | 1280x800 | 32 | 19 | 1 | 4 | 8 | 202 | 10 | 40 | 72 | 324 | 320 | 10 | 50 | 123 | 503 | 32 |
| images.html | 1280x800 | 16 | 12 | 0 | 4 | 0 | 122 | 0 | 40 | 0 | 162 | 132 | 0 | 50 | 0 | 182 | 16 |
| input-group.html | 1280x800 | 64 | 54 | 0 | 8 | 2 | 421 | 0 | 80 | 19 | 520 | 441 | 0 | 100 | 19 | 560 | 64 |
| interactions.html | 1280x800 | 29 | 11 | 7 | 6 | 5 | 130 | 65 | 58 | 50 | 303 | 140 | 70 | 106 | 78 | 394 | 29 |
| list-group.html | 1280x800 | 173 | 124 | 10 | 25 | 14 | 1199 | 129 | 251 | 141 | 1720 | 1244 | 134 | 307 | 157 | 1842 | 173 |
| live-components.html | 1280x800 | 92 | 65 | 15 | 8 | 4 | 600 | 231 | 108 | 38 | 977 | 651 | 234 | 128 | 48 | 1061 | 92 |
| modal.html | 1280x800 | 198 | 146 | 24 | 14 | 14 | 1564 | 351 | 140 | 153 | 2208 | 1616 | 361 | 175 | 191 | 2343 | 198 |
| modal.html | 390x844 | 198 | 146 | 24 | 14 | 14 | 1224 | 308 | 140 | 132 | 1804 | 1276 | 318 | 175 | 170 | 1939 | 198 |
| navbar.html | 1280x800 | 148 | 129 | 5 | 8 | 6 | 1208 | 55 | 80 | 57 | 1400 | 1228 | 65 | 100 | 73 | 1466 | 148 |
| navbar.html | 390x844 | 148 | 129 | 5 | 8 | 6 | 1075 | 49 | 80 | 57 | 1261 | 1090 | 59 | 100 | 72 | 1321 | 148 |
| navs-tabs.html | 1280x800 | 146 | 114 | 7 | 18 | 7 | 1041 | 86 | 180 | 65 | 1372 | 1086 | 96 | 225 | 75 | 1482 | 146 |
| offcanvas.html | 1280x800 | 226 | 165 | 28 | 17 | 16 | 1807 | 488 | 167 | 199 | 2661 | 2038 | 511 | 197 | 240 | 2986 | 226 |
| offcanvas.html | 390x844 | 226 | 165 | 28 | 17 | 16 | 1564 | 433 | 175 | 199 | 2371 | 1925 | 456 | 206 | 239 | 2826 | 226 |
| pagination.html | 1280x800 | 88 | 71 | 1 | 8 | 8 | 579 | 15 | 80 | 87 | 761 | 601 | 18 | 100 | 87 | 806 | 88 |
| placeholders.html | 1280x800 | 52 | 40 | 4 | 8 | 0 | 521 | 54 | 80 | 0 | 655 | 552 | 57 | 100 | 0 | 709 | 52 |
| popovers.html | 1280x800 | 76 | 53 | 11 | 12 | 0 | 523 | 135 | 120 | 0 | 778 | 560 | 135 | 150 | 0 | 845 | 76 |
| position-helpers.html | 1280x800 | 101 | 47 | 47 | 6 | 1 | 976 | 820 | 60 | 10 | 1866 | 991 | 825 | 75 | 15 | 1906 | 101 |
| position-utilities.html | 1280x800 | 119 | 47 | 45 | 16 | 11 | 746 | 887 | 160 | 141 | 1934 | 786 | 912 | 200 | 178 | 2076 | 119 |
| progress.html | 1280x800 | 68 | 56 | 2 | 10 | 0 | 709 | 20 | 100 | 0 | 829 | 734 | 20 | 125 | 0 | 879 | 68 |
| range.html | 1280x800 | 21 | 15 | 2 | 4 | 0 | 223 | 31 | 40 | 0 | 294 | 233 | 31 | 50 | 0 | 314 | 21 |
| ratio.html | 1280x800 | 20 | 18 | 0 | 2 | 0 | 388 | 0 | 20 | 0 | 408 | 393 | 0 | 25 | 0 | 418 | 20 |
| select.html | 1280x800 | 52 | 27 | 3 | 8 | 14 | 265 | 47 | 80 | 246 | 638 | 285 | 47 | 100 | 246 | 678 | 52 |
| spinners.html | 1280x800 | 69 | 57 | 2 | 8 | 2 | 481 | 20 | 80 | 20 | 601 | 501 | 20 | 100 | 20 | 641 | 69 |
| stacks.html | 1280x800 | 32 | 20 | 6 | 6 | 0 | 235 | 120 | 60 | 0 | 415 | 250 | 120 | 75 | 0 | 445 | 32 |
| stretched-link.html | 1280x800 | 26 | 17 | 4 | 4 | 1 | 259 | 74 | 40 | 19 | 392 | 341 | 74 | 50 | 19 | 484 | 26 |
| tables.html | 1280x800 | 235 | 59 | 28 | 14 | 134 | 552 | 109 | 140 | 291 | 1092 | 607 | 320 | 175 | 1348 | 2450 | 235 |
| tables.html | 390x844 | 235 | 59 | 28 | 14 | 134 | 556 | 114 | 140 | 308 | 1118 | 611 | 325 | 175 | 1365 | 2476 | 235 |
| tailwindcss.html | 1280x800 | 148 | 63 | 40 | 28 | 17 | 778 | 766 | 307 | 246 | 2097 | 838 | 789 | 367 | 298 | 2292 | 148 |
| text-truncation.html | 1280x800 | 16 | 12 | 0 | 4 | 0 | 144 | 0 | 40 | 0 | 184 | 154 | 0 | 50 | 0 | 204 | 16 |
| toasts.html | 1280x800 | 81 | 51 | 8 | 13 | 9 | 451 | 78 | 129 | 86 | 744 | 476 | 94 | 176 | 110 | 856 | 81 |
| tooltips.html | 1280x800 | 57 | 42 | 8 | 6 | 1 | 436 | 107 | 60 | 10 | 613 | 451 | 112 | 75 | 15 | 653 | 57 |
| typography.html | 1280x800 | 70 | 44 | 6 | 10 | 10 | 547 | 86 | 100 | 164 | 897 | 615 | 95 | 125 | 173 | 1008 | 70 |
| validation.html | 1280x800 | 56 | 41 | 7 | 8 | 0 | 442 | 116 | 80 | 0 | 638 | 462 | 116 | 100 | 0 | 678 | 56 |
| vertical-rule.html | 1280x800 | 23 | 14 | 1 | 5 | 3 | 170 | 16 | 50 | 32 | 268 | 180 | 16 | 60 | 32 | 288 | 23 |
| visibility.html | 1280x800 | 21 | 13 | 4 | 4 | 0 | 214 | 70 | 40 | 0 | 324 | 224 | 70 | 50 | 0 | 344 | 21 |
| visually-hidden.html | 1280x800 | 28 | 17 | 3 | 4 | 4 | 187 | 53 | 40 | 43 | 323 | 216 | 53 | 50 | 43 | 362 | 28 |
| z-index.html | 1280x800 | 26 | 15 | 4 | 4 | 3 | 241 | 72 | 40 | 37 | 390 | 253 | 74 | 50 | 48 | 425 | 26 |
| TOTAL |  | 4882 | 3197 | 530 | 573 | 582 | 33985 | 7638 | 5781 | 4095 | 51499 | 36598 | 8397 | 7289 | 6932 | 59216 | 4882 |

The following table splits the departing pairs by kind.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`.

| kind | D-vs-A component-class | D-vs-A shared-utility | D-vs-A bootstrap-other | D-vs-A bare | C-vs-A component-class | C-vs-A shared-utility | C-vs-A bootstrap-other | C-vs-A bare |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| longhand | 28648 | 6725 | 5218 | 3506 | 30744 | 7402 | 6167 | 6096 |
| pseudo | 1161 | 45 | 0 | 68 | 1187 | 45 | 0 | 68 |
| box | 4176 | 868 | 563 | 521 | 4667 | 950 | 1122 | 768 |

The following table counts pairs where D differs from C (the reboot losing to preflight), by label.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/departures.json`.

| component-class | shared-utility | bootstrap-other | bare |
| --- | --- | --- | --- |
| 4568 | 943 | 1988 | 2985 |
