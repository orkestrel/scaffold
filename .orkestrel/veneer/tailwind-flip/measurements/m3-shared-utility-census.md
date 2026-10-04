# M3 shared-utility census

Chromium 141.0.7390.37. Per fragment at 1280x800 (the 390x844 documents carry the same DOM): elements carrying each of the 192 shared utilities on their own class attribute.

The following table gives the per-fragment census.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/elements.json`.

| fragment | elements | elements carrying any shared utility | per shared utility name |
| --- | --- | --- | --- |
| accordion.html | 47 | 9 | bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mb-0 2, w-100 2, mt-1 1 |
| alerts.html | 98 | 40 | mb-0 23, w-100 14, bg-transparent 6, h-100 6, flex-shrink-0 4, gap-2 4, flex-wrap 3, gap-3 3, mt-1 3, m-0 1 |
| badge.html | 54 | 19 | flex-wrap 5, mb-0 5, bg-transparent 4, h-100 4, gap-2 3, border 2, p-2 2, rounded 2, w-100 2, bg-white 1, gap-3 1, gap-4 1, mt-1 1, start-100 1, top-0 1 |
| breadcrumb.html | 39 | 9 | mb-0 4, bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, w-100 1 |
| button-group.html | 56 | 14 | bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, mb-0 4, gap-2 1, mt-1 1 |
| buttons.html | 86 | 31 | gap-2 12, flex-wrap 10, bg-transparent 6, h-100 6, mb-0 6, border 4, p-2 4, rounded 4, mt-1 3, bg-white 2, w-100 2 |
| card.html | 104 | 25 | w-100 7, bg-transparent 5, flex-wrap 5, gap-3 5, h-100 5, mb-0 5, gap-2 2, mb-2 1 |
| carousel.html | 103 | 40 | w-100 16, bg-transparent 5, flex-wrap 5, gap-3 5, h-100 5, mb-0 5, rounded 5, mt-1 4, border 1 |
| checks-radios.html | 103 | 26 | flex-wrap 8, gap-3 7, bg-transparent 6, h-100 6, mb-0 6, w-100 6, gap-2 2 |
| clearfix.html | 11 | 7 | bg-transparent 1, border 1, flex-wrap 1, float-end 1, float-start 1, gap-3 1, h-100 1, mb-0 1, mt-1 1, p-2 1, rounded 1, w-100 1 |
| close-button.html | 24 | 9 | gap-3 4, bg-transparent 2, flex-wrap 2, h-100 2, mb-0 2, p-3 2, rounded 2, mt-1 1 |
| collapse.html | 32 | 15 | bg-transparent 3, flex-wrap 3, gap-3 3, h-100 3, mb-0 3, mt-1 3, w-100 2, text-nowrap 1 |
| color-background.html | 35 | 16 | p-2 8, rounded 8, bg-transparent 2, border 2, flex-wrap 2, gap-3 2, h-100 2, mb-0 2, w-100 2 |
| colored-links.html | 37 | 16 | bg-transparent 3, flex-wrap 3, gap-3 3, h-100 3, mb-0 3, mt-1 3, border 2, gap-2 2, p-3 2, rounded 2, w-100 2, bg-white 1 |
| containers.html | 38 | 19 | flex-wrap 8, border 7, py-2 7, rounded 7, bg-transparent 1, gap-2 1, gap-3 1, h-100 1, mb-0 1, mt-1 1, w-100 1 |
| dropdowns.html | 197 | 50 | bg-transparent 10, h-100 10, mb-0 10, flex-wrap 9, gap-3 9, rounded 7, w-100 7, mt-1 6, p-3 2, pt-3 2, mb-3 1, mt-3 1, pb-3 1, py-3 1 |
| engine-states.html | 109 | 51 | mt-1 14, mb-0 9, w-100 8, bg-transparent 7, flex-wrap 7, gap-3 7, h-100 7, rounded 4, border 3, overflow-hidden 2, p-3 2, w-75 2, z-0 2 |
| figures.html | 19 | 11 | mb-0 4, bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, rounded 2, text-end 1 |
| floating-labels.html | 48 | 18 | bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, mb-0 4, w-100 4, mb-3 2 |
| focus-ring.html | 24 | 17 | border 9, px-2 9, py-1 9, bg-transparent 2, flex-wrap 2, h-100 2, mb-0 2, mt-1 2, gap-2 1, gap-3 1 |
| form-controls.html | 63 | 26 | bg-transparent 6, flex-wrap 6, gap-3 6, h-100 6, mb-0 6, w-100 6, mb-3 2, gap-2 1 |
| form-layout.html | 69 | 21 | mb-3 7, bg-transparent 3, flex-wrap 3, gap-3 3, h-100 3, mb-0 3, w-100 3, mt-1 1, pt-0 1 |
| icon-link.html | 32 | 9 | bg-transparent 2, flex-wrap 2, gap-2 2, gap-3 2, h-100 2, mb-0 2, w-100 2, mt-1 1 |
| images.html | 16 | 7 | bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mb-0 2, rounded 1 |
| input-group.html | 64 | 16 | gap-3 8, bg-transparent 4, flex-wrap 4, h-100 4, mb-0 4, w-100 4 |
| interactions.html | 29 | 15 | mb-0 7, bg-transparent 2, flex-wrap 2, gap-2 2, gap-3 2, h-100 2, mt-1 2 |
| list-group.html | 173 | 57 | bg-transparent 9, gap-3 9, h-100 9, mb-0 9, w-100 9, flex-wrap 8, mb-1 8, gap-2 6, me-auto 3, ms-2 3, mt-1 3, ms-auto 2, mt-3 1 |
| live-components.html | 92 | 30 | mb-0 9, gap-2 5, bg-transparent 4, mt-1 4, flex-wrap 3, mt-3 3, rounded 3, mb-3 2, p-3 2, p-5 2, border 1, gap-4 1, me-auto 1, overflow-y-auto 1, pt-3 1 |
| modal.html | 198 | 63 | mb-0 14, mt-1 11, h-100 9, my-2 9, w-100 8, bg-transparent 7, flex-wrap 7, border 6, gap-3 6, overflow-hidden 6, rounded 6, z-0 6, gap-2 1, mb-1 1, p-3 1, p-4 1, start-0 1, top-0 1 |
| navbar.html | 148 | 30 | rounded 10, w-100 5, bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, mb-0 4, mt-1 4, gap-2 3, mb-2 1, me-auto 1 |
| navs-tabs.html | 146 | 42 | bg-transparent 9, h-100 9, mb-0 9, gap-3 8, flex-wrap 7, mt-1 5, gap-2 4, w-100 4, mt-3 2, border 1, mb-3 1, p-3 1 |
| offcanvas.html | 226 | 73 | mb-0 14, h-100 10, mb-2 10, mt-1 10, border 9, p-3 9, rounded 9, w-100 9, bg-transparent 6, flex-wrap 6, gap-3 6, overflow-hidden 4, z-0 4, h-50 2, w-75 2, gap-2 1, mt-3 1 |
| pagination.html | 88 | 18 | mb-0 9, bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, w-100 1 |
| placeholders.html | 52 | 18 | mb-0 5, bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, w-100 4, mt-1 1 |
| popovers.html | 76 | 34 | bg-transparent 6, flex-wrap 6, gap-2 6, h-100 6, mb-0 6, mt-1 6, gap-3 5, w-100 5, start-50 3, top-50 2 |
| position-helpers.html | 101 | 85 | py-1 37, px-3 20, py-2 20, mb-0 9, border 7, rounded 7, overflow-y-auto 6, h-100 4, bg-transparent 3, flex-wrap 3, gap-3 3, mt-1 3, w-100 3, overflow-hidden 1, start-50 1, top-50 1 |
| position-utilities.html | 119 | 81 | p-2 27, rounded 25, top-0 11, h-100 9, mb-0 9, start-50 9, bg-transparent 8, border 8, flex-wrap 8, gap-3 8, start-0 8, top-50 8, end-0 7, mt-1 7, w-100 7, bottom-0 6, py-1 5, start-100 4, px-3 3, top-100 3, m-2 2, py-2 2, bottom-100 1, bottom-50 1, end-100 1, end-50 1, overflow-hidden 1, overflow-y-auto 1, p-3 1, pb-3 1, ps-4 1, pt-3 1, pt-4 1, pt-5 1 |
| progress.html | 68 | 37 | gap-3 9, w-100 7, w-25 6, bg-transparent 5, flex-wrap 5, h-100 5, mb-0 5, w-75 4, w-50 3, mt-1 2 |
| range.html | 21 | 9 | bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mb-0 2, w-100 2, mb-3 1 |
| ratio.html | 20 | 8 | border 4, rounded 4, bg-transparent 1, flex-wrap 1, gap-3 1, h-100 1, mb-0 1, w-100 1 |
| select.html | 52 | 16 | bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, mb-0 4, w-100 4, gap-2 1 |
| spinners.html | 69 | 16 | bg-transparent 4, flex-wrap 4, h-100 4, mb-0 4, gap-2 3, gap-3 3, mt-1 2 |
| stacks.html | 32 | 19 | border 6, rounded 6, flex-wrap 4, bg-transparent 3, gap-2 3, gap-3 3, h-100 3, mb-0 3, px-2 3, px-3 3, py-1 3, py-2 3, w-100 3, me-auto 1, ms-auto 1 |
| stretched-link.html | 26 | 13 | gap-3 3, bg-transparent 2, flex-wrap 2, h-100 2, mb-0 2, mb-1 2, w-100 2, flex-shrink-0 1, mt-1 1, rounded 1, w-auto 1 |
| tables.html | 235 | 61 | text-end 21, mb-0 18, bg-transparent 7, h-100 7, flex-wrap 6, gap-3 6, w-25 5, gap-2 2, mt-1 2, mb-2 1, text-nowrap 1, w-100 1 |
| tailwindcss.html | 148 | 83 | rounded 17, border 16, gap-3 15, mb-0 14, px-2 13, bg-transparent 12, flex-wrap 12, h-100 12, mt-1 12, w-100 10, py-1 4, py-2 4, mb-2 2, mb-4 2, flex-shrink-0 1, gap-4 1, mb-3 1, me-2 1, mt-3 1, p-2 1, p-3 1, px-3 1, text-center 1 |
| text-truncation.html | 16 | 8 | bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mb-0 2, w-100 1, w-75 1 |
| toasts.html | 81 | 29 | bg-transparent 5, h-100 5, mb-0 5, me-auto 5, flex-wrap 4, gap-2 4, gap-3 4, mt-1 3, border-0 1, bottom-0 1, end-0 1, m-auto 1, me-2 1, p-3 1 |
| tooltips.html | 57 | 23 | gap-2 6, bg-transparent 3, flex-wrap 3, h-100 3, mb-0 3, mt-1 3, start-50 3, gap-3 2, top-50 2, w-100 2 |
| typography.html | 70 | 25 | mb-0 11, bg-transparent 5, flex-wrap 5, gap-3 5, h-100 5, w-100 4 |
| validation.html | 56 | 20 | bg-transparent 4, flex-wrap 4, gap-3 4, h-100 4, mb-0 4, w-100 4, mb-3 2, mb-5 2 |
| vertical-rule.html | 23 | 9 | gap-3 4, mb-0 3, bg-transparent 2, flex-wrap 2, h-100 2 |
| visibility.html | 21 | 14 | border 4, p-3 4, rounded 4, visible 3, bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, invisible 2, mb-0 2, mt-1 2, w-100 2, gap-2 1 |
| visually-hidden.html | 28 | 10 | mb-0 3, bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mt-1 2, border 1, p-3 1, rounded 1, w-100 1 |
| z-index.html | 26 | 15 | border 4, rounded 4, h-50 3, mb-0 3, p-2 3, w-50 3, bg-transparent 2, flex-wrap 2, gap-3 2, h-100 2, mt-1 2, start-50 2, top-50 2, w-100 2, bottom-0 1, end-0 1, opacity-50 1, overflow-hidden 1, p-4 1, start-0 1, top-0 1, z-0 1, z-1 1, z-2 1, z-3 1 |
| TOTAL | 4005 | 1482 | 74 distinct names |

The following table totals each shared utility name across fragments.

Probe: `/home/user/veneer/tmp/probes/flip/m3-components/probe.ts` (readings), `/home/user/veneer/tmp/probes/flip/m3-components/analyze.ts` (tables). Output: `/home/user/veneer/tmp/probes/flip/m3-components/elements.json`.

| shared utility | elements |
| --- | --- |
| mb-0 | 311 |
| flex-wrap | 232 |
| h-100 | 231 |
| bg-transparent | 227 |
| gap-3 | 219 |
| w-100 | 193 |
| rounded | 142 |
| mt-1 | 133 |
| border | 98 |
| gap-2 | 79 |
| py-1 | 58 |
| p-2 | 46 |
| py-2 | 36 |
| p-3 | 29 |
| px-3 | 27 |
| px-2 | 25 |
| text-end | 22 |
| mb-3 | 19 |
| start-50 | 18 |
| mb-2 | 15 |
| overflow-hidden | 15 |
| top-50 | 15 |
| top-0 | 14 |
| z-0 | 13 |
| mb-1 | 11 |
| me-auto | 11 |
| w-25 | 11 |
| start-0 | 10 |
| end-0 | 9 |
| mt-3 | 9 |
| my-2 | 9 |
| w-75 | 9 |
| bottom-0 | 8 |
| overflow-y-auto | 8 |
| flex-shrink-0 | 6 |
| w-50 | 6 |
| h-50 | 5 |
| start-100 | 5 |
| bg-white | 4 |
| pt-3 | 4 |
| gap-4 | 3 |
| ms-2 | 3 |
| ms-auto | 3 |
| top-100 | 3 |
| visible | 3 |
| invisible | 2 |
| m-2 | 2 |
| mb-4 | 2 |
| mb-5 | 2 |
| me-2 | 2 |
| p-4 | 2 |
| p-5 | 2 |
| pb-3 | 2 |
| text-nowrap | 2 |
| border-0 | 1 |
| bottom-100 | 1 |
| bottom-50 | 1 |
| end-100 | 1 |
| end-50 | 1 |
| float-end | 1 |
| float-start | 1 |
| m-0 | 1 |
| m-auto | 1 |
| opacity-50 | 1 |
| ps-4 | 1 |
| pt-0 | 1 |
| pt-4 | 1 |
| pt-5 | 1 |
| py-3 | 1 |
| text-center | 1 |
| w-auto | 1 |
| z-1 | 1 |
| z-2 | 1 |
| z-3 | 1 |

Shared utilities never carried by a fragment element: 118 of 192.
