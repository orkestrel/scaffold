# Copier journey comparison classification

Candidate `copier-journey-2`; baseline `landing-11f01e9-l1-journey`; registration `98/0`; supplied host-bound set and moves file unchanged. Official compare exit: 67. All 220 difference records below are classified; removed and added records are counted separately, including their stdout and journal copies.

Four new copy case entries are the only registration additions. All four pass. Face census undeclared-name readings are unchanged. The native attributes and output add no new class name to that census.

All 1,032 statechart rows in 38 records retain exact names, sequence, motion mode, and host variant; see `statecharts.json`. No statechart row moves.

Preservation expected counts: closed elements 10,546 → 10,547; boxes 10,289 → 10,290 at 1280 and 10,099 → 10,100 at 390; excluded elements gain one in all six open states. Additional aggregate signature counters gain one in each of the four closed states. The only attribution changes are tooltip `causes.placement` 1 → 0 at dark/1280 and light/390; no source fix was made for those readings. A placement/geometry reading difference is one hypothesis, not an established cause.

Partition changes go beyond the literal prediction: the button and output add two population elements/signatures and two counts to clauses 1 and 3 at each width. There are still no partition violations and no new utility/component differences.

Three engine equality readings are absent: dark-1280/navbar-1280, dark-1280/responsive-offcanvas-1280, light-1280/scrollspy-1280. Their cases exceeded 120 seconds. Cause is not established; slow execution before completion is the working hypothesis. These failures are not waived.

| Group | Difference records |
| --- | ---: |
| Missing engine equality | 9 |
| Preservation: counts and aggregate signatures | 24 |
| Preservation: element counts | 132 |
| Preservation: tooltip attribution | 12 |
| Signature coverage | 2 |
| Partition clauses | 12 |
| Ordered-row check | 3 |
| Partition population | 24 |
| Unallowed test failure | 2 |

| ID | Classification | Detail | Raw evidence |
| ---: | --- | --- | --- |
| 1 | Unpredicted finding; unresolved | engine navbar-1280: three equal faces — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:12) |
| 2 | Unpredicted finding; unresolved | engine responsive-offcanvas-1280: three equal faces — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:13) |
| 3 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:14) |
| 4 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:15) |
| 5 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:16) |
| 6 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:17) |
| 7 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:18) |
| 8 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:19) |
| 9 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:20) |
| 10 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:21) |
| 11 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:22) |
| 12 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:23) |
| 13 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:24) |
| 14 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:25) |
| 15 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:26) |
| 16 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:27) |
| 17 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:28) |
| 18 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:29) |
| 19 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:30) |
| 20 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:31) |
| 21 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:32) |
| 22 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:33) |
| 23 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:34) |
| 24 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:35) |
| 25 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:36) |
| 26 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:37) |
| 27 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:38) |
| 28 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:39) |
| 29 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:40) |
| 30 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:41) |
| 31 | Predicted | Both widths: 1,634 → 1,636 signatures; only button[btn,btn-secondary,mb-2] and output[ms-2] added. Existing signature order is unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:42) |
| 32 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:43) |
| 33 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:44) |
| 34 | Unpredicted finding; unresolved | engine scrollspy-1280: three equal faces — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:45) |
| 35 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:46) |
| 36 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:47) |
| 37 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:48) |
| 38 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:49) |
| 39 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:50) |
| 40 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:51) |
| 41 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:52) |
| 42 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:53) |
| 43 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:54) |
| 44 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:55) |
| 45 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:56) |
| 46 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:57) |
| 47 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:58) |
| 48 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:59) |
| 49 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:60) |
| 50 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:61) |
| 51 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:62) |
| 52 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:63) |
| 53 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:64) |
| 54 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:65) |
| 55 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:66) |
| 56 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:67) |
| 57 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:68) |
| 58 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:69) |
| 59 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:70) |
| 60 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:71) |
| 61 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:72) |
| 62 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:73) |
| 63 | Predicted | Both widths: 1,634 → 1,636 signatures; only button[btn,btn-secondary,mb-2] and output[ms-2] added. Existing signature order is unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:74) |
| 64 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:75) |
| 65 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:76) |
| 66 | Derived difference; no statechart movement | Row order (/home/user/veneer/tmp/units/journey-cost/runs/landing-11f01e9-l1-journey, dark-1280): ordered rows differ — changed preservation payloads in dark-390; missing engine readings in light-1280 and dark-1280. All other surviving rows retain order. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:77) |
| 67 | Derived difference; no statechart movement | Row order (/home/user/veneer/tmp/units/journey-cost/runs/landing-11f01e9-l1-journey, dark-390): ordered rows differ — changed preservation payloads in dark-390; missing engine readings in light-1280 and dark-1280. All other surviving rows retain order. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:78) |
| 68 | Derived difference; no statechart movement | Row order (/home/user/veneer/tmp/units/journey-cost/runs/landing-11f01e9-l1-journey, light-1280): ordered rows differ — changed preservation payloads in dark-390; missing engine readings in light-1280 and dark-1280. All other surviving rows retain order. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:79) |
| 69 | Unpredicted finding; unresolved | Engine equality [light-1280] {"faces":3,"family":"scrollspy-1280","variant":"light-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:80) |
| 70 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:81) |
| 71 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:82) |
| 72 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:83) |
| 73 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:84) |
| 74 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:85) |
| 75 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:86) |
| 76 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:87) |
| 77 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:88) |
| 78 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:89) |
| 79 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:90) |
| 80 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:91) |
| 81 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:92) |
| 82 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:93) |
| 83 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:94) |
| 84 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:95) |
| 85 | Unpredicted finding; unresolved | Engine equality [dark-1280] {"faces":3,"family":"navbar-1280","variant":"dark-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:96) |
| 86 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:97) |
| 87 | Unpredicted finding; unresolved | Engine equality [dark-1280] {"faces":3,"family":"responsive-offcanvas-1280","variant":"dark-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:98) |
| 88 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:99) |
| 89 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:100) |
| 90 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:101) |
| 91 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:102) |
| 92 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:103) |
| 93 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:104) |
| 94 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:105) |
| 95 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:106) |
| 96 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:107) |
| 97 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:108) |
| 98 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:109) |
| 99 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:110) |
| 100 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:111) |
| 101 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:112) |
| 102 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:113) |
| 103 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:114) |
| 104 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:115) |
| 105 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:116) |
| 106 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:117) |
| 107 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:118) |
| 108 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:119) |
| 109 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:120) |
| 110 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:121) |
| 111 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:122) |
| 112 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:123) |
| 113 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:124) |
| 114 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:125) |
| 115 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:126) |
| 116 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:127) |
| 117 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:128) |
| 118 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:129) |
| 119 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:130) |
| 120 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:131) |
| 121 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:132) |
| 122 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:133) |
| 123 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:134) |
| 124 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:135) |
| 125 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:136) |
| 126 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:137) |
| 127 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:138) |
| 128 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:139) |
| 129 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:140) |
| 130 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:141) |
| 131 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:142) |
| 132 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:143) |
| 133 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:144) |
| 134 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:145) |
| 135 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:146) |
| 136 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:147) |
| 137 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:148) |
| 138 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:149) |
| 139 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:150) |
| 140 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:151) |
| 141 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:152) |
| 142 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:153) |
| 143 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:154) |
| 144 | Unpredicted finding; unresolved | info: Engine equality {"faces":3,"family":"navbar-1280","variant":"dark-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:155) |
| 145 | Unpredicted finding; unresolved | info: Engine equality {"faces":3,"family":"responsive-offcanvas-1280","variant":"dark-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:156) |
| 146 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:157) |
| 147 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:158) |
| 148 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:159) |
| 149 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:160) |
| 150 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:161) |
| 151 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:162) |
| 152 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:163) |
| 153 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:164) |
| 154 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:165) |
| 155 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:166) |
| 156 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:167) |
| 157 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:168) |
| 158 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:169) |
| 159 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:170) |
| 160 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:171) |
| 161 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:172) |
| 162 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:173) |
| 163 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:174) |
| 164 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:175) |
| 165 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:176) |
| 166 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:177) |
| 167 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:178) |
| 168 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:179) |
| 169 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:180) |
| 170 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:181) |
| 171 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:182) |
| 172 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:183) |
| 173 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:184) |
| 174 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:185) |
| 175 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:186) |
| 176 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:187) |
| 177 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:188) |
| 178 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:189) |
| 179 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:190) |
| 180 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:191) |
| 181 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:192) |
| 182 | Unpredicted finding; unresolved | info: Engine equality {"faces":3,"family":"scrollspy-1280","variant":"light-1280"} — absent following the two 120,000 ms engine-matrix timeouts. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:193) |
| 183 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10289 → 10290; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:194) |
| 184 | Predicted | 1280/light/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:195) |
| 185 | Predicted | 1280/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:196) |
| 186 | Predicted | 1280/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:197) |
| 187 | Predicted | 1280/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:198) |
| 188 | Predicted | 1280/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:199) |
| 189 | Predicted | 1280/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:200) |
| 190 | Mixed: predicted element/box counts; additional aggregate signature counters | 1280/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10289 → 10290; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:201) |
| 191 | Mixed: predicted excluded-element count; unpredicted placement attribution | 1280/dark/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:202) |
| 192 | Predicted | 1280/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:203) |
| 193 | Predicted | 1280/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:204) |
| 194 | Predicted | 1280/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:205) |
| 195 | Predicted | 1280/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:206) |
| 196 | Predicted | 1280/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:207) |
| 197 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/light/closed — elements: 10546 → 10547; signatures: 1745 → 1746; boxes: 10099 → 10100; exclusions.excluded: 1745 → 1746 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:208) |
| 198 | Mixed: predicted excluded-element count; unpredicted placement attribution | 390/light/tooltip — excluded: 10664 → 10665; causes.placement: 1 → 0 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:209) |
| 199 | Predicted | 390/light/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:210) |
| 200 | Predicted | 390/light/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:211) |
| 201 | Predicted | 390/light/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:212) |
| 202 | Predicted | 390/light/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:213) |
| 203 | Predicted | 390/light/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:214) |
| 204 | Mixed: predicted element/box counts; additional aggregate signature counters | 390/dark/closed — elements: 10546 → 10547; signatures: 1749 → 1750; boxes: 10099 → 10100; exclusions.excluded: 1749 → 1750 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:215) |
| 205 | Predicted | 390/dark/tooltip — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:216) |
| 206 | Predicted | 390/dark/popover — excluded: 10664 → 10665 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:217) |
| 207 | Predicted | 390/dark/dropdown — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:218) |
| 208 | Predicted | 390/dark/modal — excluded: 10653 → 10654 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:219) |
| 209 | Predicted | 390/dark/offcanvas — excluded: 10657 → 10658 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:220) |
| 210 | Predicted | 390/dark/toast — excluded: 10660 → 10661 | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:221) |
| 211 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:222) |
| 212 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:223) |
| 213 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:224) |
| 214 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:225) |
| 215 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:226) |
| 216 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:227) |
| 217 | Finding beyond the literal prediction; explained by the new controls | Both widths, all faces: elements 7,999 → 8,001; signatures 1,634 → 1,636. Names 209, utilities 192, components 17 unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:228) |
| 218 | Finding beyond the literal prediction; explained by the new controls | At both widths clauses 1 and 3 gain two. Clause 2, skipped readings, utility/component differences, and empty violations are unchanged. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:229) |
| 219 | Unpredicted finding; unresolved | The engine-matrix case timed out in light-1280 or dark-1280. The supplied host-bound set is empty. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:230) |
| 220 | Unpredicted finding; unresolved | The engine-matrix case timed out in light-1280 or dark-1280. The supplied host-bound set is empty. | [record](/home/user/.wave/veneer-copier/tmp/units/copier/compare.md:230) |
