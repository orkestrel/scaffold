# Flip-preservation report — stopped

## 1. Findings

Expected: zero preflight or unattributed departures outside the admitted description-list set. Found: 3,298 unattributed departures at 1280px and 3,243 at 390px, outside that set. The focused case fails with 6,541 rejected readings. The deviation contract requires a stop after this run; no tracked edit follows it. Nothing is committed.

Evidence: gate-focused.log and gate-focused.err hold the complete stdout and stderr; their exact contents are appended in § 4. readings.json holds every signature, specimen, element, class list, longhand, A/Baseline, F/Recipe, and cause. The complete per-key tables follow the summary in this section. A blank specimen denotes a carrier outside a titled specimen, including the face controls and section headings.

Done: the resolved member, its removal control, the component population and departure helpers with cases, and the focused gate. Not done: caption rows, the gate controls on the production page, final acceptance sequence, and full journey timing. One hypothesis: the existing attribution reader lacks the logical-to-physical property correspondence the probe used; most rejected longhands are logical border colors, corner radii, margins, and padding. This is a reader finding, not evidence that every reported component visibly breaks.

The population includes every component-class carrier under document.body and lifted-rule descendants whose earlier selector compound names a component class. Signatures use tag, sorted classes, nearest data-bs-theme, and open state. Every population element receives the box check; longhands use the first element per signature, with all of its ancestors read in document order on the same page. This run reads element longhands, not pseudo-element longhands. The two face controls change their own class state between faces: the reported bootstrap signature and recipe class list expose that change; it was not excluded.

| Width | Elements | Signatures | Boxes before | Lost boxes | Utility | Resolved | Preflight | Inherited | Unattributed | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 9829 | 1469 | 9476 | 0 | 3335 | 77 | 3 | 0 | 3301 | 20.40439999999851 |
| 390 | 9829 | 1469 | 9285 | 0 | 3336 | 19 | 3 | 0 | 3246 | 21.43580000000447 |

The counts include the admitted entries: each width has 3 admitted preflight and 3 admitted unattributed readings. Outside the admitted set, preflight is 0 at both widths.

| Width | Layout | Typography | Invisible | Tab-size / shorthand | Position-area | Grid tracks |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 4641 | 0 | 6503 | 1469 | 0 | 7 |
| 390 | 3706 | 0 | 6495 | 1469 | 0 | 2 |

The gate case timer is 41.938 s focused (20.4044 s at 1280 and 21.4358 s at 390), within its 300 s timeout and 11.062 s under the archived 53 s focused partition. Vitest reports 43.51 s for tests and 51.87 s total; the launcher reports 53.609 s, exit 1, uncapped. The fresh partition baseline case timer is 62.2863 s (71.84 s Vitest total; 73.521 s launcher). The gate adds no measured cost above 60 s in this focused variant. Its cost inside the full journey is unmeasured: the full run was not reached, so the 449 s and 487 s budget note and the 446–480 s appended host readings remain comparison references.

The production stripped-curation and planted-preflight controls were not reached because the ordinary population already failed. No failing line is claimed for either control. The planted rule implemented for the latter is `@layer base { h6 { font-weight: 300 } }`. The helper control proves a real `@layer base { .card { opacity: .5 } }` reading changes 1 to 0.5 and causes `expected [ { … } ] to deeply equal []`; removing the change restores equality. The resolved unit control removes the Bootstrap font-weight declaration and changes the same element’s attribution from resolved to preflight. These helper controls do not substitute for the unrun production controls.

The admitted entries occur at both widths, with no missing entry. Each has the reason “The corpus ruling assigns description-list spacing to the consumer.” The appended expectation that row and col-sm-* produce utility attribution is not observed: attributeDeparture returns the causes shown here. No class was added to its eligible utility set.

| Width | Specimen | Element | Longhand | A | F | Cause | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | Description list in Bootstrap's markup | dl.row | margin-block-end | 16px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 1280 | Description list in Bootstrap's markup | dl.row | margin-bottom | 16px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |
| 1280 | Description list in Bootstrap's markup | dd.col-sm-9 | margin-block-end | 8px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 1280 | Description list in Bootstrap's markup | dd.col-sm-9 | margin-bottom | 8px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |
| 1280 | Description list in Bootstrap's markup | dd.col-sm-8 | margin-block-end | 8px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 1280 | Description list in Bootstrap's markup | dd.col-sm-8 | margin-bottom | 8px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dl.row | margin-block-end | 16px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dl.row | margin-bottom | 16px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dd.col-sm-9 | margin-block-end | 8px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dd.col-sm-9 | margin-bottom | 8px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dd.col-sm-8 | margin-block-end | 8px | 0px | unattributed | The corpus ruling assigns description-list spacing to the consumer. |
| 390 | Description list in Bootstrap's markup | dd.col-sm-8 | margin-bottom | 8px | 0px | preflight | The corpus ruling assigns description-list spacing to the consumer. |

The complete departure inventory follows. Each row is one signature/longhand reading; it retains admitted entries too.

| Width | Signature key | Specimen | Element | Classes | Longhand | A | F | Cause |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | caret-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | column-rule-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | outline-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | text-emphasis-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | z-index | 1 | auto | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | -webkit-text-fill-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["button",["active","btn","btn-outline-secondary"],"light",false] |  | button | btn btn-outline-secondary text-body-emphasis | -webkit-text-stroke-color | rgb(255, 255, 255) | rgb(0, 0, 0) | unattributed |
| 1280 | ["h2",["border-bottom","h3","mb-4","pb-2"],"light",false] |  | h2 | h3 mb-4 pb-2 border-bottom | margin-block-end | 24px | 16px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container","py-2","rounded"],"light",false] | Container widths | div | container bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-sm","py-2","rounded"],"light",false] | Container widths | div | container-sm bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-md","py-2","rounded"],"light",false] | Container widths | div | container-md bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-lg","py-2","rounded"],"light",false] | Container widths | div | container-lg bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xl","py-2","rounded"],"light",false] | Container widths | div | container-xl bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-xxl","py-2","rounded"],"light",false] | Container widths | div | container-xxl bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-block-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-block-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-inline-end-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-inline-start-color | rgb(222, 226, 230) | rgb(33, 37, 41) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-start-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","container-fluid","py-2","rounded"],"light",false] | Container widths | div | container-fluid bg-body-tertiary border rounded py-2 | border-start-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-block-end-color | rgb(222, 226, 230) | rgb(0, 0, 0) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-block-start-color | rgb(222, 226, 230) | rgb(0, 0, 0) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-end-end-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-end-start-radius | 6px | 4px | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-inline-end-color | rgb(222, 226, 230) | rgb(0, 0, 0) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-inline-start-color | rgb(222, 226, 230) | rgb(0, 0, 0) | unattributed |
| 1280 | ["div",["bg-body-tertiary","border","rounded","small","text-center"],"light",false] | Row columns | div | border rounded bg-body-tertiary text-center small | border-start-end-radius | 6px | 4px | unattributed |
