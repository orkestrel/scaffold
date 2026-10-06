# U7a timing evidence

Raw diagnostic tables use stdout.log only, counting each emitted record once. These are elapsed intervals, not independently proved causes. Run 1 is outside the historical 72.67 outside-CPU-second limit and is excluded by the combined durations instrument (75.21 > 70.23). No budget is derived.

| Folder | Kind | seconds | outside.seconds | Passed | Failed |
| --- | --- | ---: | ---: | ---: | ---: |
| /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 | journey | 617.399 | 75.21 | 94 | 0 |
| /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 | journey | 594.450 | 67.62 | 94 | 0 |

## Slowest settle per description

All 468 descriptions, including non-statechart tests that durations.ts omits. Ties retain the first observed maximum. Each run emitted 94 settle records and 38 statechart-duration records. Direct waitForEvent call sites were wrapped, but these journeys executed none. The integration file has no waitForEvent import or call.

| Description | Max ms | Run | seconds | outside.seconds | Family | Motion | Variant |
| --- | ---: | --- | ---: | ---: | --- | --- | --- |
| Accordion selects Adding seats | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Accordion selects Billing cycle | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Accordion selects Cancelling a plan | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Accordion selects none | 1.8 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | false | light-390 |
| Accordion selects Returns and exchanges | 0.8 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Accordion selects Shipping and delivery | 1.8 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Accordion selects Warranty coverage | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Adding seats completes {Enter}{Enter} | 395.4 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Adding seats completes {Escape} | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Adding seats panel visibility | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | false | light-390 |
| Alerts alert reads hidden | 222.4 | task75-u7-probe-1 | 617.399 | 75.21 | alert | true | light-1280 |
| Alerts alert reads shown | 220.4 | task75-u7-probe-1 | 617.399 | 75.21 | alert | true | light-1280 |
| animations body. | 613.2 | task75-u7-probe-2 | 594.450 | 67.62 | paints progress bars at their announced fraction under every face | header | dark-1280 |
| animations body.modal-open | 431.6 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| animations div.accordion-collapse | 424.1 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| animations div.carousel | 687.2 | task75-u7-probe-2 | 594.450 | 67.62 | carousel | true | light-1280 |
| animations div.carousel-item | 2.8 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| animations div.collapse | 4.0 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | false | dark-390 |
| animations div.collapse-horizontal | 1.5 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| animations div.modal | 598.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| animations div.navbar-collapse | 4.7 | task75-u7-probe-2 | 594.450 | 67.62 | navbar-390 | false | dark-390 |
| animations div.offcanvas | 71.7 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| animations div.offcanvas-lg | 9.9 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| animations div.offcanvas-md | 18.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| animations div.offcanvas-sm | 14.1 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| animations div.offcanvas-xl | 10.8 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| animations div.offcanvas-xxl | 23.4 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-1280 | true | dark-1280 |
| animations div.popover | 13.4 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| animations div.tab-pane | 215.5 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| animations div.toast | 294.9 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| animations div.tooltip | 120.0 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| Assign announces expanded=false | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Assign announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Assign menu visibility | 1.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Billing cycle completes {Enter}{Enter} | 412.2 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Billing cycle completes {Escape} | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | false | light-390 |
| Billing cycle completes click | 394.2 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Billing cycle panel visibility | 1.3 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Billing status description is hidden | 241.1 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Billing status description is shown | 189.6 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Billing status finishes its {Escape} events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Billing status finishes its click events | 70.7 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Billing status paints its description | 1.5 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Buttons Desktop alerts announces pressed=false | 40.0 | task75-u7-probe-1 | 617.399 | 75.21 | button | true | dark-1280 |
| Buttons Desktop alerts announces pressed=true | 54.2 | task75-u7-probe-1 | 617.399 | 75.21 | button | true | dark-1280 |
| Buttons Email updates announces pressed=false | 50.7 | task75-u7-probe-1 | 617.399 | 75.21 | button | true | dark-1280 |
| Buttons Email updates announces pressed=true | 82.5 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-1280 |
| Cancelling a plan completes {Enter}{Enter} | 388.8 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Cancelling a plan completes {Escape} | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Cancelling a plan panel visibility | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | false | light-390 |
| carousel arrangement slide settles | 13.7 | task75-u7-probe-2 | 594.450 | 67.62 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-1280 |
| carousel focusing slide settles | 63.6 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-1280 |
| Close the build pipeline toast completes its toast events | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the build pipeline toast toast is hidden | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the build pipeline toast toast is shown | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the calendar toast completes its toast events | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the calendar toast toast is hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Close the calendar toast toast is shown | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the invoice toast completes its toast events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | false | dark-390 |
| Close the invoice toast toast is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | false | dark-390 |
| Close the invoice toast toast is shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | false | dark-390 |
| Close the Mira Patel toast completes its toast events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Close the Mira Patel toast toast is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Close the Mira Patel toast toast is shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | false | dark-390 |
| Close the upload toast completes its toast events | 10.7 | task75-u7-probe-2 | 594.450 | 67.62 | toast | false | dark-390 |
| Close the upload toast toast is hidden | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 1280 px | header | dark-390 |
| Close the upload toast toast is shown | 171.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | true | dark-390 |
| closing the archive dialog restores focus to its opener | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | dark-1280 |
| Columns announces expanded=false | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Columns announces expanded=true | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Columns menu visibility | 1.9 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Customs panel and selection agree | 194.5 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Customs status description is hidden | 210.0 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Customs status description is shown | 111.7 | task75-u7-probe-2 | 594.450 | 67.62 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Customs status finishes its   events | 212.4 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Customs status finishes its {Enter} events | 228.5 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Customs status finishes its {Escape} events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | popover | false | light-1280 |
| Customs status finishes its click events | 203.8 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Customs status paints its description | 2.3 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Delivery details announces hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Delivery details announces shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Delivery details completes {Enter}{Enter} | 386.9 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Delivery details completes {Escape} | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Delivery details completes click | 368.1 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Delivery details panel paints hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Delivery details panel paints shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Delivery status description is hidden | 187.9 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Delivery status description is shown | 164.1 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Delivery status finishes its {Escape} events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| Delivery status finishes its click events | 213.6 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Delivery status paints its description | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| Density announces expanded=false | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Density announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Density menu visibility | 2.2 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Depot hours announces hidden | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Depot hours announces shown | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Depot hours completes   | 405.6 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Depot hours completes {Enter} | 368.7 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Depot hours completes {Enter}{Enter} | 330.0 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Depot hours completes {Escape} | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Depot hours completes click | 391.9 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Depot hours panel paints hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Depot hours panel paints shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-390 |
| Details panel and selection agree | 2.7 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Dialog example presents its nested controls | 68.4 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| Dismiss notification completes its toast events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Dismiss notification toast is hidden | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | toast | true | dark-390 |
| Dismiss notification toast is shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Escape closes the archive dialog | 203.8 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| Escape closes the end panel | 380.3 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| Example menu announces expanded=false | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Example menu announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Example menu menu visibility | 0.7 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Expand details announces hidden | 1.3 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Expand details announces shown | 1.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Expand details completes {Enter}{Enter} | 352.2 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Expand details completes {Escape} | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Expand details completes click | 365.8 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Expand details panel paints hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Expand details panel paints shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Export announces expanded=false | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Export announces expanded=true | 1.8 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Export menu visibility | 2.7 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 1280 px | header | dark-390 |
| focus lands on the main region | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J2 reaches the skip link, the five header buttons, the contents, and a specimen field by keyboard | header | dark-390 |
| Hint above description is hidden | 201.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint above description is shown | 159.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint above finishes its {Escape} events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| Hint above finishes its blur events | 304.0 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint above finishes its focus events | 164.7 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint above finishes its hover events | 132.0 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint above finishes its leave events | 90.7 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint above paints its description | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Hint below description is hidden | 190.0 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint below description is shown | 292.8 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint below finishes its {Escape} events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint below finishes its hover events | 104.9 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint below finishes its leave events | 110.2 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint below paints its description | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| Hint to the left description is hidden | 187.3 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the left description is shown | 278.6 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint to the left finishes its {Escape} events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint to the left finishes its hover events | 116.4 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the left finishes its leave events | 120.2 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the left paints its description | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the right description is hidden | 183.4 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the right description is shown | 289.8 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint to the right finishes its {Escape} events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| Hint to the right finishes its hover events | 127.7 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| Hint to the right finishes its leave events | 96.7 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Hint to the right paints its description | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| History panel and selection agree | 190.4 | task75-u7-probe-2 | 594.450 | 67.62 | tab | true | dark-1280 |
| Inbound panel and selection agree | 236.8 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Live examples alert reads hidden | 227.3 | task75-u7-probe-2 | 594.450 | 67.62 | alert | false | light-1280 |
| Live examples alert reads shown | 198.8 | task75-u7-probe-2 | 594.450 | 67.62 | alert | true | light-1280 |
| Live examples Toggle selection announces pressed=false | 36.5 | task75-u7-probe-2 | 594.450 | 67.62 | button | true | dark-1280 |
| Live examples Toggle selection announces pressed=true | 30.3 | task75-u7-probe-1 | 617.399 | 75.21 | button | true | dark-1280 |
| More context description is hidden | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| More context description is shown | 0.3 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| More context finishes its {Escape} events | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | popover | true | light-1280 |
| More context finishes its click events | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| More context paints its description | 1.3 | task75-u7-probe-2 | 594.450 | 67.62 | popover | true | light-1280 |
| More publishing options announces expanded=false | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| More publishing options announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| More publishing options menu visibility | 1.6 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Move to announces expanded=false | 0.9 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Move to announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Move to menu visibility | 2.0 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Next photo completes its carousel events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next photo selects slide 0 | 0.6 | task75-u7-probe-2 | 594.450 | 67.62 | carousel | false | light-1280 |
| Next photo selects slide 1 | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next route completes its carousel events | 27.5 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next route selects slide 0 | 0.7 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next route selects slide 1 | 1.4 | task75-u7-probe-2 | 594.450 | 67.62 | carousel | false | light-1280 |
| Next route selects slide 2 | 1.4 | task75-u7-probe-2 | 594.450 | 67.62 | carousel | true | light-1280 |
| Next sketch completes its carousel events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | true | light-1280 |
| Next sketch selects slide 0 | 0.4 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next sketch selects slide 1 | 0.5 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next slide completes its carousel events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next slide selects slide 0 | 2.0 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| Next slide selects slide 1 | 0.6 | task75-u7-probe-1 | 617.399 | 75.21 | carousel | false | light-1280 |
| no engine tip panel outside the bound state remains | 0.3 | task75-u7-probe-2 | 594.450 | 67.62 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Notebooks announces expanded=false | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Notebooks announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Notebooks menu visibility | 2.0 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Notes panel and selection agree | 0.4 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Open dialog backdrop settles | 3.3 | task75-u7-probe-2 | 594.450 | 67.62 | modal | false | light-1280 |
| Open dialog completes 0:click | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open dialog completes 1:click | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open dialog completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open dialog completes open:click | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open dialog completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open dialog is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open dialog is shown | 0.6 | task75-u7-probe-1 | 617.399 | 75.21 | modal | false | light-1280 |
| Open side panel backdrop settles | 6.0 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open side panel completes 0:click | 344.7 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open side panel completes escape:hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | false | dark-1280 |
| Open side panel completes open:click | 301.1 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open side panel completes tab:shown | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | false | dark-1280 |
| Open side panel is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open side panel is shown | 306.8 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the archive dialog backdrop settles | 8.9 | task75-u7-probe-2 | 594.450 | 67.62 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-1280 |
| Open the archive dialog completes 0:  | 311.9 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes 0:{Enter} | 377.0 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the archive dialog completes 0:click | 379.5 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes 1:click | 395.7 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes 2:click | 379.0 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the archive dialog completes backdrop:shown | 402.2 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes escape:shown | 370.6 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the archive dialog completes open:  | 479.2 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog completes open:{Enter} | 459.4 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the archive dialog completes open:{Enter}{Enter} | 455.7 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the archive dialog completes open:click | 480.9 | task75-u7-probe-1 | 617.399 | 75.21 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px | header | dark-390 |
| Open the archive dialog completes tab:shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the archive dialog is hidden | 130.7 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-1280 |
| Open the archive dialog is shown | 462.8 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the bottom panel backdrop settles | 11.2 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the bottom panel completes 0:click | 350.7 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the bottom panel completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the bottom panel completes open:click | 300.8 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the bottom panel completes tab:shown | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the bottom panel is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | false | dark-1280 |
| Open the bottom panel is shown | 302.2 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the centered dialog backdrop settles | 3.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | false | light-1280 |
| Open the centered dialog completes 0:click | 388.6 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the centered dialog completes 1:click | 376.3 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the centered dialog completes escape:hidden | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the centered dialog completes open:click | 460.2 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the centered dialog completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the centered dialog is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | modal | false | light-1280 |
| Open the centered dialog is shown | 480.6 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the end panel backdrop settles | 2.8 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the end panel completes 0:click | 316.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the end panel completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the end panel completes open:click | 294.9 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the end panel completes tab:shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the end panel is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | false | dark-1280 |
| Open the end panel is shown | 316.7 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the lg drawer backdrop settles | 2.4 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer completes 0:click | 320.4 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer completes open:click | 310.3 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the lg drawer is shown | 308.6 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer backdrop settles | 5.7 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | false | dark-390 |
| Open the md drawer completes 0:click | 328.8 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer completes open:click | 299.2 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the md drawer is shown | 309.0 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the scrollable dialog backdrop settles | 4.8 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the scrollable dialog completes 0:click | 381.9 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the scrollable dialog completes 1:click | 352.4 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the scrollable dialog completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the scrollable dialog completes open:click | 457.3 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the scrollable dialog completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the scrollable dialog is hidden | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | false | light-1280 |
| Open the scrollable dialog is shown | 469.3 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the sm drawer backdrop settles | 5.7 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-390 |
| Open the sm drawer completes 0:click | 314.5 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the sm drawer completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the sm drawer completes open:click | 310.7 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the sm drawer completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the sm drawer is hidden | 10.3 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-390 |
| Open the sm drawer is shown | 311.2 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the start panel backdrop settles | 9.2 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | false | dark-1280 |
| Open the start panel completes 0:  | 391.5 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the start panel completes 0:{Enter} | 353.6 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the start panel completes 0:click | 378.4 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the start panel completes backdrop:shown | 352.2 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the start panel completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the start panel completes escape:shown | 359.9 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the start panel completes open:  | 315.1 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the start panel completes open:{Enter} | 296.4 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the start panel completes open:click | 302.8 | task75-u7-probe-2 | 594.450 | 67.62 | attributes every component departure of the tailwindcss face to a declared cause other than preflight at 1280 px | header | dark-390 |
| Open the start panel completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the start panel is hidden | 113.1 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-1280 |
| Open the start panel is shown | 290.7 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the static dialog backdrop settles | 7.4 | task75-u7-probe-2 | 594.450 | 67.62 | modal | false | light-1280 |
| Open the static dialog completes 0:click | 389.3 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the static dialog completes backdrop:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the static dialog completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the static dialog completes escape:shown | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the static dialog completes open:click | 468.6 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the static dialog completes tab:shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| Open the static dialog is hidden | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | modal | false | light-1280 |
| Open the static dialog is shown | 458.4 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| Open the top panel backdrop settles | 2.4 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the top panel completes 0:click | 373.4 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the top panel completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the top panel completes open:click | 307.8 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the top panel completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the top panel is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| Open the top panel is shown | 303.3 | task75-u7-probe-2 | 594.450 | 67.62 | offcanvas | true | dark-1280 |
| Open the xl drawer backdrop settles | 2.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the xl drawer completes 0:click | 342.2 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the xl drawer completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the xl drawer completes open:click | 320.2 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the xl drawer completes tab:shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the xl drawer is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | false | dark-390 |
| Open the xl drawer is shown | 292.2 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the xxl drawer backdrop settles | 4.9 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | false | dark-390 |
| Open the xxl drawer completes 0:click | 370.6 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-1280 | true | dark-1280 |
| Open the xxl drawer completes escape:hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-1280 | true | dark-1280 |
| Open the xxl drawer completes open:click | 308.8 | task75-u7-probe-2 | 594.450 | 67.62 | responsive-offcanvas-390 | true | dark-390 |
| Open the xxl drawer completes tab:shown | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Open the xxl drawer is hidden | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | dark-1280 |
| Open the xxl drawer is shown | 305.8 | task75-u7-probe-1 | 617.399 | 75.21 | responsive-offcanvas-390 | true | dark-390 |
| Order filters announces hidden | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | false | dark-390 |
| Order filters announces shown | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Order filters completes {Enter}{Enter} | 357.9 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Order filters completes {Escape} | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Order filters completes click | 341.0 | task75-u7-probe-2 | 594.450 | 67.62 | collapse | true | dark-390 |
| Order filters panel paints hidden | 0.0 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | true | dark-390 |
| Order filters panel paints shown | 7.3 | task75-u7-probe-1 | 617.399 | 75.21 | collapse | false | dark-390 |
| Outbound panel and selection agree | 216.8 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Returns and exchanges completes   | 415.2 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Returns and exchanges completes {Enter} | 415.5 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Returns and exchanges completes {Enter}{Enter} | 376.7 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Returns and exchanges completes {Escape} | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Returns and exchanges completes click | 399.0 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Returns and exchanges panel visibility | 1.7 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Route panel and selection agree | 193.0 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| scrollspy completes the input | 53.6 | task75-u7-probe-1 | 617.399 | 75.21 | scrollspy-390 | false | light-390 |
| Scrollspy selects Disclosure | 32.9 | task75-u7-probe-1 | 617.399 | 75.21 | scrollspy-390 | true | light-390 |
| Scrollspy selects Feedback | 64.3 | task75-u7-probe-1 | 617.399 | 75.21 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-390 |
| Scrollspy selects Motion | 45.9 | task75-u7-probe-1 | 617.399 | 75.21 | scrollspy-390 | true | light-390 |
| Scrollspy selects Overlays | 43.0 | task75-u7-probe-1 | 617.399 | 75.21 | scrollspy-390 | false | light-390 |
| Shipment panel and selection agree | 168.8 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Shipping and delivery completes   | 404.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Shipping and delivery completes {Enter} | 408.7 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Shipping and delivery completes {Enter}{Enter} | 424.6 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Shipping and delivery completes {Escape} | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | false | light-390 |
| Shipping and delivery completes click | 401.0 | task75-u7-probe-2 | 594.450 | 67.62 | accordion | true | light-390 |
| Shipping and delivery panel visibility | 3.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Show hint description is hidden | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Show hint description is shown | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Show hint paints its description | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | true | dark-390 |
| Show notification completes its toast events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| Show the upload toast completes its toast events | 183.6 | task75-u7-probe-1 | 617.399 | 75.21 | toast | true | dark-390 |
| showcase scroll settles | 888.3 | task75-u7-probe-2 | 594.450 | 67.62 | scrollspy-390 | true | light-390 |
| Sort announces expanded=false | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Sort announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Sort menu visibility | 1.9 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Status announces expanded=false | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Status announces expanded=true | 0.1 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Status menu visibility | 2.0 | task75-u7-probe-2 | 594.450 | 67.62 | dropdown | true | dark-1280 |
| Stock panel and selection agree | 269.1 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| tab transition completes | 1.5 | task75-u7-probe-1 | 617.399 | 75.21 | tab | false | dark-1280 |
| Tabs select Customs | 2.1 | task75-u7-probe-2 | 594.450 | 67.62 | tab | false | dark-1280 |
| Tabs select Details | 0.3 | task75-u7-probe-2 | 594.450 | 67.62 | tab | true | dark-1280 |
| Tabs select History | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Tabs select Inbound | 0.4 | task75-u7-probe-2 | 594.450 | 67.62 | tab | true | dark-1280 |
| Tabs select Notes | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Tabs select Outbound | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| Tabs select Route | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | tab | true | dark-1280 |
| Tabs select Shipment | 0.9 | task75-u7-probe-2 | 594.450 | 67.62 | tab | true | dark-1280 |
| Tabs select Stock | 0.7 | task75-u7-probe-1 | 617.399 | 75.21 | tab | true | dark-1280 |
| the Accordion heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Alerts heading lands in the upper quarter of the viewport | 0.6 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the archive dialog opens | 203.5 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the archive dialog opens again | 229.7 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the Background heading lands in the upper quarter of the viewport | 1.0 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Badge heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Borders heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Breadcrumb heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Button group heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Buttons heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Card heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Carousel heading lands in the upper quarter of the viewport | 4.0 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Checks and radios heading lands in the upper quarter of the viewport | 3.0 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-390 |
| the Clearfix heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the close button closes the archive dialog | 203.9 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the close button closes the end panel | 354.2 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the Close button heading lands in the upper quarter of the viewport | 0.6 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Collapse heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Color and background heading lands in the upper quarter of the viewport | 0.5 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Colored links heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Columns heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Containers heading lands in the upper quarter of the viewport | 2.4 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the dialog hint completes its events | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | tooltip | false | dark-390 |
| the dialog restores opener focus | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | modal | true | light-1280 |
| the dismissed alert is detached | 172.2 | task75-u7-probe-1 | 617.399 | 75.21 | alert | true | light-1280 |
| the dismissible alert leaves the Alerts section | 397.8 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the Display heading lands in the upper quarter of the viewport | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Dropdowns heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the end panel opens | 40.4 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | dark-1280 |
| the end panel opens again | 32.7 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the Engine-set states heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Figures heading lands in the upper quarter of the viewport | 2.8 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Flex heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the Float heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Floating labels heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Focus ring heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Form controls heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Form layout heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Grid heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the Gutters heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the hint dialog closes | 37.7 | task75-u7-probe-2 | 594.450 | 67.62 | tooltip | true | dark-390 |
| the Icon link heading lands in the upper quarter of the viewport | 2.1 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Images heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Input group heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Interaction utilities heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Link utilities heading lands in the upper quarter of the viewport | 0.5 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the List group heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Live components heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the live notice leaves | 145.6 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | dark-1280 |
| the Modal heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Navbar heading lands in the upper quarter of the viewport | 0.6 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the Navs and tabs heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Object fit heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Offcanvas heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the Opacity heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Overflow heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Pagination heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Placeholders heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the Popovers heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the Position helpers heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Position utilities heading lands in the upper quarter of the viewport | 0.8 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the preceding backdrop closes | 253.7 | task75-u7-probe-1 | 617.399 | 75.21 | modal | true | light-1280 |
| the preceding dialog closes | 408.1 | task75-u7-probe-1 | 617.399 | 75.21 | offcanvas | true | dark-1280 |
| the Progress heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Range heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the Ratio heading lands in the upper quarter of the viewport | 0.3 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the refusal fixture closes before replacement | 75.0 | task75-u7-probe-2 | 594.450 | 67.62 | keeps every shipped disabled engine route unchanged after activation | header | dark-1280 |
| the scroll container settles | 369.9 | task75-u7-probe-2 | 594.450 | 67.62 | compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | header | light-1280 |
| the Select heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Shadows heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Sizing heading lands in the upper quarter of the viewport | 0.3 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Spacing heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Spinners heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the Stacks heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Stretched link heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Tables heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Tailwind on Bootstrap markup heading lands in the upper quarter of the viewport | 742.8 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-390 |
| the Text heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-390 |
| the Text truncation heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Toasts heading lands in the upper quarter of the viewport | 5.6 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-390 |
| the Tooltips heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| the Typography heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the upload toast finishes showing | 180.3 | task75-u7-probe-2 | 594.450 | 67.62 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the upload toast hides | 201.3 | task75-u7-probe-1 | 617.399 | 75.21 | J8 drives the engine through the component sections and opens nothing on arrival | header | light-390 |
| the Validation heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | dark-1280 |
| the Vertical align heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-1280 |
| the Vertical rule heading lands in the upper quarter of the viewport | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | dark-1280 |
| the Visibility heading lands in the upper quarter of the viewport | 0.3 | task75-u7-probe-2 | 594.450 | 67.62 | J3 browses every section through the contents | header | light-390 |
| the Visually hidden heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-1280 |
| the Z-index heading lands in the upper quarter of the viewport | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | J3 browses every section through the contents | header | light-390 |
| Toggle navigation announces hidden | 0.2 | task75-u7-probe-1 | 617.399 | 75.21 | navbar-390 | true | dark-390 |
| Toggle navigation announces shown | 1.0 | task75-u7-probe-2 | 594.450 | 67.62 | navbar-390 | true | dark-390 |
| Toggle navigation completes   | 396.8 | task75-u7-probe-1 | 617.399 | 75.21 | navbar-390 | true | dark-390 |
| Toggle navigation completes {Enter} | 369.3 | task75-u7-probe-1 | 617.399 | 75.21 | navbar-390 | true | dark-390 |
| Toggle navigation completes {Enter}{Enter} | 364.2 | task75-u7-probe-2 | 594.450 | 67.62 | navbar-390 | true | dark-390 |
| Toggle navigation completes {Escape} | 0.2 | task75-u7-probe-2 | 594.450 | 67.62 | navbar-390 | false | dark-390 |
| Toggle navigation completes click | 390.6 | task75-u7-probe-2 | 594.450 | 67.62 | navbar-1280 | true | dark-1280 |
| Toggle navigation panel paints hidden | 1.9 | task75-u7-probe-1 | 617.399 | 75.21 | navbar-1280 | true | dark-1280 |
| Toggle navigation panel paints shown | 1.1 | task75-u7-probe-1 | 617.399 | 75.21 | navbar-1280 | false | dark-1280 |
| Warranty coverage completes   | 404.4 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Warranty coverage completes {Enter} | 429.6 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Warranty coverage completes {Enter}{Enter} | 378.4 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Warranty coverage completes {Escape} | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Warranty coverage completes click | 408.9 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Warranty coverage panel visibility | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | accordion | true | light-390 |
| Zoom announces expanded=false | 1.2 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Zoom announces expanded=true | 0.1 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |
| Zoom menu visibility | 3.4 | task75-u7-probe-1 | 617.399 | 75.21 | dropdown | true | dark-1280 |

## Popover steps

Values are cumulative milliseconds across each table. Parent intervals overlap child intervals: arrangement assertTipVisibility includes assertion waits; observeShowcaseStability act includes the guarded act. Do not add parent and child rows. Five hover/focus/blur branches in actOnTipControl were not used by the popover tables.

| Step | Run 1 true ms | Run 2 true ms | Run 1 false ms | Run 2 false ms |
| --- | ---: | ---: | ---: | ---: |
| arrangePopoverVisibility / clickAccessibleWithin [1] | 67187.1 | 2739.9 | 1824.0 | 2412.1 |
| assertTipVisibility / waitForCondition [1] | 1093.3 | 1003.4 | 57.9 | 65.6 |
| assertTipVisibility / waitForAnimations [2] | 14.9 | 24.5 | 7.7 | 7.6 |
| assertTipVisibility / waitForCondition [3] | 4.5 | 4.6 | 2.5 | 1.3 |
| arrangePopoverVisibility / assertTipVisibility [2] | 161.6 | 175.0 | 10.2 | 4.1 |
| arrangePopoverVisibility / clickAccessibleWithin [3] | 54556.0 | 72901.9 | 3072.2 | 4032.1 |
| arrangePopoverVisibility / assertTipVisibility [4] | 946.4 | 870.5 | 59.5 | 72.4 |
| actOnTipControl / actOnComponentButton [6] | 28269.8 | 32745.3 | 3722.7 | 3878.0 |
| actOnTipControl / waitForFrame [7] | 188.3 | 192.0 | 201.9 | 187.3 |
| actOnTipControl / waitForCondition [8] | 1261.8 | 1385.3 | 67.2 | 122.8 |
| observeShowcaseStability / act [1] | 633.2 | 613.5 | 413.3 | 489.3 |
| observeShowcaseStability / waitForAbort [2] | 536.6 | 519.0 | 59.9 | 104.1 |
| observeShowcaseStability / waitForFrame [3] | 46.2 | 64.0 | 50.1 | 60.7 |

## Longest popover steps

| Run | Row | Step | ms |
| --- | --- | --- | ---: |
| task75-u7-probe-1 | Billing status false through click | arrangePopoverVisibility / clickAccessibleWithin [1] | 65697.2 |
| task75-u7-probe-1 | Billing status true through {Escape} | arrangePopoverVisibility / clickAccessibleWithin [3] | 29998.3 |
| task75-u7-probe-1 | Billing status false through click | arrangePopoverVisibility / clickAccessibleWithin [3] | 22154.6 |
| task75-u7-probe-1 | Billing status false through click | actOnTipControl / actOnComponentButton [6] | 13975.9 |
| task75-u7-probe-1 | Billing status true through click | actOnTipControl / actOnComponentButton [6] | 10955.2 |
| task75-u7-probe-2 | Billing status true through {Escape} | arrangePopoverVisibility / clickAccessibleWithin [3] | 66392.7 |
| task75-u7-probe-2 | Billing status false through click | actOnTipControl / actOnComponentButton [6] | 19863.0 |
| task75-u7-probe-2 | Billing status true through click | actOnTipControl / actOnComponentButton [6] | 9762.4 |
| task75-u7-probe-2 | Billing status false through click | arrangePopoverVisibility / clickAccessibleWithin [3] | 3882.2 |
| task75-u7-probe-2 | Billing status false through click | arrangePopoverVisibility / clickAccessibleWithin [1] | 1039.2 |

The five Billing status pointer calls total 142781.2 ms in run 1 and 100939.5 ms in run 2. Their difference (41841.7 ms) accounts for the 40854.0 ms report.json table difference, with other work offsetting 987.7 ms. Explicit popover waits total 2373.1 and 2417.7 ms and move in the opposite direction. This localizes the excess to the test trusted-input completion path. It does not prove an engine cause. No stage B engine row is justified by this probe.

## Previously held titles

Table times use report.json, matching the historical population. The slower run determines the sign of each wait delta. The largest positive deltas are named even where too small to explain the table excess. For every title except the diagnosed popover motion=true input path, no measured settle wait explains its whole excess. Popover motion=false has partial input attribution: arrangement clicks add 1548.0 ms, action calls add 155.3 ms, and explicit waits add 63.1 ms against a 2592.7 ms table excess. Every listed wait is test-side; engine causation remains unestablished.

| Held title | Run 1 table ms | Run 2 table ms | Run 1 settle sum ms | Run 2 settle sum ms | Slower run | Table excess ms | Settle delta ms | Largest description deltas in slower run |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | --- |
| showcase journeys keeps every specimen inside its figure under every face at both widths | 11163.2 | 11913.6 | 9.2 | 10.3 | run 2 | 750.4 | 1.1 | animations body.: 1.1 ms |
| showcase matrix attributes every component departure of the tailwindcss face to a declared cause other than preflight at 1280 px | 99814.0 | 92542.5 | 8101.1 | 8081.7 | run 1 | 7271.5 | 19.4 | showcase scroll settles: 152.6 ms; animations body.: 104.8 ms; Customs status description is hidden: 41.4 ms |
| showcase matrix partitions the shared names under the three faces at 1280 px | 14664.3 | 15378.3 | 14.1 | 13.1 | run 2 | 714.0 | -1.0 | animations body.modal-open: -1.0 ms |
| showcase matrix partitions the shared names under the three faces at 390 px | 14059.4 | 11885.0 | 16.5 | 21.9 | run 1 | 2174.4 | -5.4 | animations body.modal-open: -5.4 ms |
| showcase statecharts drives the 'accordion' table through its controls with motion=false | 16481.2 | 14886.3 | 399.8 | 435.3 | run 1 | 1594.9 | -35.5 | Shipping and delivery completes {Enter}{Enter}: 19.5 ms; Warranty coverage completes click: 17.6 ms; Billing cycle completes {Enter}{Enter}: 15.2 ms |
| showcase statecharts drives the 'alert' table through its controls with motion=false | 17613.5 | 15771.7 | 1776.6 | 1917.8 | run 1 | 1841.8 | -141.2 | Alerts alert reads shown: 90.1 ms; the dismissed alert is detached: 5.5 ms; animations body.: -1.8 ms |
| showcase statecharts drives the 'alert' table through its controls with motion=true | 19425.0 | 18270.7 | 2399.6 | 2121.3 | run 1 | 1154.3 | 278.3 | Alerts alert reads hidden: 133.7 ms; Alerts alert reads shown: 115.7 ms; the dismissed alert is detached: 40.6 ms |
| showcase statecharts drives the 'button' table through its controls with motion=true | 10730.6 | 9365.9 | 1003.4 | 851.6 | run 1 | 1364.7 | 151.8 | Buttons Email updates announces pressed=false: 39.7 ms; Buttons Desktop alerts announces pressed=true: 39.7 ms; Buttons Email updates announces pressed=true: 34.5 ms |
| showcase statecharts drives the 'carousel' table through its controls with motion=false | 25709.7 | 22840.1 | 102.4 | 123.1 | run 1 | 2869.6 | -20.7 | animations div.carousel-item: 6.5 ms; Next slide selects slide 0: 1.8 ms; Next route selects slide 0: 0.7 ms |
| showcase statecharts drives the 'collapse' table through its controls with motion=false | 8668.5 | 8329.3 | 130.3 | 114.5 | run 1 | 339.2 | 15.8 | Expand details completes click: 25.1 ms; Depot hours completes {Enter}: 8.0 ms; Order filters panel paints shown: 7.3 ms |
| showcase statecharts drives the 'dropdown' table through its controls with motion=true | 54691.8 | 51913.3 | 544.3 | 604.8 | run 1 | 2778.5 | -60.5 | Dialog example presents its nested controls: 17.6 ms; Zoom menu visibility: 2.7 ms; More publishing options menu visibility: 1.8 ms |
| showcase statecharts drives the 'modal' table through its controls with motion=false | 22168.1 | 25122.2 | 1068.3 | 1320.6 | run 2 | 2954.1 | 252.3 | Open the archive dialog completes 1:click: 74.3 ms; Open the archive dialog completes 0:{Enter}: 51.7 ms; Open the scrollable dialog completes 0:click: 48.9 ms |
| showcase statecharts drives the 'offcanvas' table through its controls with motion=false | 17971.5 | 20696.2 | 122.8 | 385.3 | run 2 | 2724.7 | 262.5 | Open the start panel completes 0:{Enter}: 90.5 ms; Open the start panel completes 0: : 88.9 ms; the preceding dialog closes: 81.1 ms |
| showcase statecharts drives the 'offcanvas' table through its controls with motion=true | 28703.2 | 28395.9 | 8121.1 | 8255.5 | run 1 | 307.3 | -134.4 | the preceding dialog closes: 126.5 ms; Open the bottom panel completes 0:click: 44.8 ms; Open side panel completes 0:click: 37.6 ms |
| showcase statecharts drives the 'pair' header table through the header buttons | 28282.9 | 31120.3 | 33.5 | 36.7 | run 2 | 2837.4 | 3.2 | animations body.: 3.2 ms |
| showcase statecharts drives the 'popover' table through its controls with motion=false | 11524.7 | 14117.4 | 135.4 | 198.5 | run 2 | 2592.7 | 63.1 | Customs status description is shown: 64.2 ms; Customs status finishes its   events: 31.5 ms; Billing status finishes its click events: 19.4 ms |
| showcase statecharts drives the 'popover' table through its controls with motion=true | 156443.8 | 115589.8 | 2373.1 | 2417.7 | run 1 | 40854.0 | -44.6 | Delivery status description is shown: 141.1 ms; Customs status description is shown: 98.6 ms; Billing status description is hidden: 46.5 ms |
| showcase statecharts drives the 'responsive-offcanvas-1280' table through its controls with motion=false | 3196.3 | 3367.3 | 9.7 | 20.5 | run 2 | 171.0 | 10.8 | Open the xxl drawer completes 0:click: 10.2 ms; animations div.offcanvas-xxl: 0.5 ms; Open the xxl drawer is shown: 0.2 ms |
| showcase statecharts drives the 'responsive-offcanvas-1280' table through its controls with motion=true | 4097.9 | 4061.0 | 684.0 | 666.8 | run 1 | 36.9 | 17.2 | Open the xxl drawer completes 0:click: 22.9 ms; Open the xxl drawer completes open:click: 15.0 ms; Open the xxl drawer backdrop settles: 0.4 ms |
| showcase statecharts drives the 'scrollspy-1280' table through its controls with motion=false | 33068.3 | 34145.6 | 13994.0 | 14140.1 | run 2 | 1077.3 | 146.1 | the scroll container settles: 180.7 ms; Scrollspy selects Motion: 40.3 ms; showcase scroll settles: 7.8 ms |
| showcase statecharts drives the 'tab' table through its controls with motion=false | 24689.8 | 23879.8 | 236.2 | 277.0 | run 1 | 810.0 | -40.8 | Route panel and selection agree: 25.2 ms; Inbound panel and selection agree: 22.6 ms; Shipment panel and selection agree: 11.4 ms |
| showcase statecharts drives the 'toast' table through its controls with motion=false | 19213.7 | 19701.4 | 23.0 | 37.8 | run 2 | 487.7 | 14.8 | Show the upload toast completes its toast events: 10.8 ms; Close the upload toast completes its toast events: 10.6 ms; animations body.: 0.3 ms |
| showcase statecharts drives the 'tooltip' table through its controls with motion=false | 33652.8 | 34486.6 | 1662.0 | 1494.0 | run 2 | 833.8 | -168.0 | Hint below description is hidden: 35.2 ms; Hint to the right description is hidden: 29.5 ms; Hint above finishes its focus events: 26.5 ms |
