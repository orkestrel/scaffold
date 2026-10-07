# Unit L1 result

Implemented in the detached worktree at 11f01e9. Eight owned tracked files changed; no commit. All required executable gates pass. The journey comparator exits 67 with 43 differences; two findings are outside the prediction and remain unfixed.

## Diff and records

[Full diff, including both generated CSS records](/home/user/.wave/veneer-l1/tmp/units/l1/changes.diff).

```text
 app/browser/recipe.json                |   4 +-
 guides/veneer.md                       |  19 ++-
 src/bootstrap/_mixins.scss             |  14 +++
 src/bootstrap/_tokens.scss             |   2 +
 src/tailwindcss/_tokens.scss           |  16 +++
 tests/fixtures/tailwindcss/recipe.json |   4 +-
 tests/integration.test.ts              |  25 +++-
 tests/src/tailwindcss/index.test.ts    | 218 ++++++++++++++++++++++++++++++++-
 8 files changed, 290 insertions(+), 12 deletions(-)
```

The empty default $supplied map emits nothing. Tailwind configures six normal declarations in @layer bootstrap. The shared-name case checks Tailwind's declared longhands and Bootstrap's supplied longhands. Only the two authorized guide passages changed. No journey pin changed.

The recipe records were regenerated through compileRecipe, RECIPE_INPUT, and readTailwindInventory after npm run build, using each record's own candidates: 2029 test candidates and 2039 showcase candidates. Both record the built sheet digest df6faefecd8f9832e273f66abe7886b075bda47de377bf30beab01e3f6560de1. Both unchanged conformance pin cases pass.

Bootstrap byte identity: cmp exit 0; both sheets are 332388 bytes. The baseline was saved from the clean supplied dist at 11f01e9 before editing.

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  /home/user/.wave/veneer-l1/dist/src/bootstrap/index.css
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  /home/user/.wave/veneer-l1/tmp/units/l1/bootstrap-11f01e9.css
```

## Derivation

192 shared names; 62 with drops; 104 dropped longhands. Six supplied, 84 excluded for logical equivalents under horizontal-tb/ltr, 14 excluded as non-inherited initial values. A deleted supplement, an extra shared-class supplement, and a planted Bootstrap color without its supplement all fail equality; adding the planted color supplement restores equality.

Supplied: border's border-top-color, border-right-color, border-bottom-color, and border-left-color are var(--bs-border-color). text-nowrap and text-wrap each supply white-space-collapse: collapse. Whitespace collapse is inherited, so its initial value does not exclude it.

border and border-0 both exclude border-image-source: none, border-image-slice: 100%, border-image-width: 1, border-image-outset: 0, and border-image-repeat: stretch. border-0 also excludes its four colors because Bootstrap supplies currentcolor, the non-inherited initial value. Zero border width additionally makes them invisible; visibility is not an extra subtraction in the derivation.

Every drop follows. Values are read in the mapped Bootstrap witness with all: initial; logical mappings use the existing physical-longhand map.

| Name | Dropped longhand | Bootstrap value | Initial value | Disposition |
| --- | --- | --- | --- | --- |
| border | border-top-color | rgb(209, 213, 220) | rgb(0, 0, 0) | supplied |
| border | border-right-color | rgb(209, 213, 220) | rgb(0, 0, 0) | supplied |
| border | border-bottom-color | rgb(209, 213, 220) | rgb(0, 0, 0) | supplied |
| border | border-left-color | rgb(209, 213, 220) | rgb(0, 0, 0) | supplied |
| border | border-image-source | none | none | non-inherited initial value |
| border | border-image-slice | 100% | 100% | non-inherited initial value |
| border | border-image-width | 1 | 1 | non-inherited initial value |
| border | border-image-outset | 0 | 0 | non-inherited initial value |
| border | border-image-repeat | stretch | stretch | non-inherited initial value |
| border-0 | border-top-color | rgb(0, 0, 0) | rgb(0, 0, 0) | non-inherited initial value |
| border-0 | border-right-color | rgb(0, 0, 0) | rgb(0, 0, 0) | non-inherited initial value |
| border-0 | border-bottom-color | rgb(0, 0, 0) | rgb(0, 0, 0) | non-inherited initial value |
| border-0 | border-left-color | rgb(0, 0, 0) | rgb(0, 0, 0) | non-inherited initial value |
| border-0 | border-image-source | none | none | non-inherited initial value |
| border-0 | border-image-slice | 100% | 100% | non-inherited initial value |
| border-0 | border-image-width | 1 | 1 | non-inherited initial value |
| border-0 | border-image-outset | 0 | 0 | non-inherited initial value |
| border-0 | border-image-repeat | stretch | stretch | non-inherited initial value |
| end-0 | right | 0px | auto | logical equivalent |
| end-100 | right | 100% | auto | logical equivalent |
| end-50 | right | 50% | auto | logical equivalent |
| me-0 | margin-right | 0px | 0px | logical equivalent |
| me-1 | margin-right | 4px | 0px | logical equivalent |
| me-2 | margin-right | 8px | 0px | logical equivalent |
| me-3 | margin-right | 16px | 0px | logical equivalent |
| me-4 | margin-right | 24px | 0px | logical equivalent |
| me-5 | margin-right | 48px | 0px | logical equivalent |
| me-auto | margin-right | auto | 0px | logical equivalent |
| ms-0 | margin-left | 0px | 0px | logical equivalent |
| ms-1 | margin-left | 4px | 0px | logical equivalent |
| ms-2 | margin-left | 8px | 0px | logical equivalent |
| ms-3 | margin-left | 16px | 0px | logical equivalent |
| ms-4 | margin-left | 24px | 0px | logical equivalent |
| ms-5 | margin-left | 48px | 0px | logical equivalent |
| ms-auto | margin-left | auto | 0px | logical equivalent |
| mx-0 | margin-right | 0px | 0px | logical equivalent |
| mx-0 | margin-left | 0px | 0px | logical equivalent |
| mx-1 | margin-right | 4px | 0px | logical equivalent |
| mx-1 | margin-left | 4px | 0px | logical equivalent |
| mx-2 | margin-right | 8px | 0px | logical equivalent |
| mx-2 | margin-left | 8px | 0px | logical equivalent |
| mx-3 | margin-right | 16px | 0px | logical equivalent |
| mx-3 | margin-left | 16px | 0px | logical equivalent |
| mx-4 | margin-right | 24px | 0px | logical equivalent |
| mx-4 | margin-left | 24px | 0px | logical equivalent |
| mx-5 | margin-right | 48px | 0px | logical equivalent |
| mx-5 | margin-left | 48px | 0px | logical equivalent |
| mx-auto | margin-right | auto | 0px | logical equivalent |
| mx-auto | margin-left | auto | 0px | logical equivalent |
| my-0 | margin-top | 0px | 0px | logical equivalent |
| my-0 | margin-bottom | 0px | 0px | logical equivalent |
| my-1 | margin-top | 4px | 0px | logical equivalent |
| my-1 | margin-bottom | 4px | 0px | logical equivalent |
| my-2 | margin-top | 8px | 0px | logical equivalent |
| my-2 | margin-bottom | 8px | 0px | logical equivalent |
| my-3 | margin-top | 16px | 0px | logical equivalent |
| my-3 | margin-bottom | 16px | 0px | logical equivalent |
| my-4 | margin-top | 24px | 0px | logical equivalent |
| my-4 | margin-bottom | 24px | 0px | logical equivalent |
| my-5 | margin-top | 48px | 0px | logical equivalent |
| my-5 | margin-bottom | 48px | 0px | logical equivalent |
| my-auto | margin-top | auto | 0px | logical equivalent |
| my-auto | margin-bottom | auto | 0px | logical equivalent |
| pe-0 | padding-right | 0px | 0px | logical equivalent |
| pe-1 | padding-right | 4px | 0px | logical equivalent |
| pe-2 | padding-right | 8px | 0px | logical equivalent |
| pe-3 | padding-right | 16px | 0px | logical equivalent |
| pe-4 | padding-right | 24px | 0px | logical equivalent |
| pe-5 | padding-right | 48px | 0px | logical equivalent |
| ps-0 | padding-left | 0px | 0px | logical equivalent |
| ps-1 | padding-left | 4px | 0px | logical equivalent |
| ps-2 | padding-left | 8px | 0px | logical equivalent |
| ps-3 | padding-left | 16px | 0px | logical equivalent |
| ps-4 | padding-left | 24px | 0px | logical equivalent |
| ps-5 | padding-left | 48px | 0px | logical equivalent |
| px-0 | padding-right | 0px | 0px | logical equivalent |
| px-0 | padding-left | 0px | 0px | logical equivalent |
| px-1 | padding-right | 4px | 0px | logical equivalent |
| px-1 | padding-left | 4px | 0px | logical equivalent |
| px-2 | padding-right | 8px | 0px | logical equivalent |
| px-2 | padding-left | 8px | 0px | logical equivalent |
| px-3 | padding-right | 16px | 0px | logical equivalent |
| px-3 | padding-left | 16px | 0px | logical equivalent |
| px-4 | padding-right | 24px | 0px | logical equivalent |
| px-4 | padding-left | 24px | 0px | logical equivalent |
| px-5 | padding-right | 48px | 0px | logical equivalent |
| px-5 | padding-left | 48px | 0px | logical equivalent |
| py-0 | padding-top | 0px | 0px | logical equivalent |
| py-0 | padding-bottom | 0px | 0px | logical equivalent |
| py-1 | padding-top | 4px | 0px | logical equivalent |
| py-1 | padding-bottom | 4px | 0px | logical equivalent |
| py-2 | padding-top | 8px | 0px | logical equivalent |
| py-2 | padding-bottom | 8px | 0px | logical equivalent |
| py-3 | padding-top | 16px | 0px | logical equivalent |
| py-3 | padding-bottom | 16px | 0px | logical equivalent |
| py-4 | padding-top | 24px | 0px | logical equivalent |
| py-4 | padding-bottom | 24px | 0px | logical equivalent |
| py-5 | padding-top | 48px | 0px | logical equivalent |
| py-5 | padding-bottom | 48px | 0px | logical equivalent |
| start-0 | left | 0px | auto | logical equivalent |
| start-100 | left | 100% | auto | logical equivalent |
| start-50 | left | 50% | auto | logical equivalent |
| text-nowrap | white-space-collapse | collapse | collapse | supplied |
| text-wrap | white-space-collapse | collapse | collapse | supplied |

# Behavior readings

Chromium 141.0.7390.37, from l1-test-src-tailwindcss. Each border cell applies to all four physical sides; the reader asserts their equality before rendering this table.

| Mode | Sheet | Classes | Width | Style | Color | White-space collapse |
| --- | --- | --- | --- | --- | --- | --- |
| light | Recipe | border | 1px | solid | rgb(209, 213, 220) | preserve |
| light | Recipe | border border-red-500 | 1px | solid | oklch(0.637 0.237 25.331) | preserve |
| light | Recipe | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| light | Recipe | border-0 | 0px | solid | rgb(3, 7, 18) | preserve |
| light | Recipe | text-nowrap | 0px | solid | rgb(3, 7, 18) | collapse |
| light | Recipe | text-wrap | 0px | solid | rgb(3, 7, 18) | collapse |
| light | Recipe | text-wrap whitespace-pre | 0px | solid | rgb(3, 7, 18) | preserve |
| light | Mapped Bootstrap | border | 1px | solid | rgb(209, 213, 220) | preserve |
| light | Mapped Bootstrap | border border-red-500 | 1px | solid | rgb(209, 213, 220) | preserve |
| light | Mapped Bootstrap | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| light | Mapped Bootstrap | border-0 | 0px | none | rgb(3, 7, 18) | preserve |
| light | Mapped Bootstrap | text-nowrap | 0px | none | rgb(3, 7, 18) | collapse |
| light | Mapped Bootstrap | text-wrap | 0px | none | rgb(3, 7, 18) | collapse |
| light | Mapped Bootstrap | text-wrap whitespace-pre | 0px | none | rgb(3, 7, 18) | collapse |
| light | Bootstrap | border | 1px | solid | rgb(222, 226, 230) | preserve |
| light | Bootstrap | border border-red-500 | 1px | solid | rgb(222, 226, 230) | preserve |
| light | Bootstrap | border border-primary | 1px | solid | rgb(13, 110, 253) | preserve |
| light | Bootstrap | border-0 | 0px | none | rgb(33, 37, 41) | preserve |
| light | Bootstrap | text-nowrap | 0px | none | rgb(33, 37, 41) | collapse |
| light | Bootstrap | text-wrap | 0px | none | rgb(33, 37, 41) | collapse |
| light | Bootstrap | text-wrap whitespace-pre | 0px | none | rgb(33, 37, 41) | collapse |
| light | Recipe + planted utilities border color | border | 1px | solid | rgb(1, 2, 3) | preserve |
| light | Recipe + planted utilities border color | border border-red-500 | 1px | solid | rgb(1, 2, 3) | preserve |
| light | Recipe + planted utilities border color | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| light | Recipe + planted utilities border color | border-0 | 0px | solid | rgb(3, 7, 18) | preserve |
| light | Recipe + planted utilities border color | text-nowrap | 0px | solid | rgb(3, 7, 18) | collapse |
| light | Recipe + planted utilities border color | text-wrap | 0px | solid | rgb(3, 7, 18) | collapse |
| light | Recipe + planted utilities border color | text-wrap whitespace-pre | 0px | solid | rgb(3, 7, 18) | preserve |
| dark | Recipe | border | 1px | solid | rgb(74, 85, 101) | preserve |
| dark | Recipe | border border-red-500 | 1px | solid | oklch(0.637 0.237 25.331) | preserve |
| dark | Recipe | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| dark | Recipe | border-0 | 0px | solid | rgb(229, 231, 235) | preserve |
| dark | Recipe | text-nowrap | 0px | solid | rgb(229, 231, 235) | collapse |
| dark | Recipe | text-wrap | 0px | solid | rgb(229, 231, 235) | collapse |
| dark | Recipe | text-wrap whitespace-pre | 0px | solid | rgb(229, 231, 235) | preserve |
| dark | Mapped Bootstrap | border | 1px | solid | rgb(74, 85, 101) | preserve |
| dark | Mapped Bootstrap | border border-red-500 | 1px | solid | rgb(74, 85, 101) | preserve |
| dark | Mapped Bootstrap | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| dark | Mapped Bootstrap | border-0 | 0px | none | rgb(229, 231, 235) | preserve |
| dark | Mapped Bootstrap | text-nowrap | 0px | none | rgb(229, 231, 235) | collapse |
| dark | Mapped Bootstrap | text-wrap | 0px | none | rgb(229, 231, 235) | collapse |
| dark | Mapped Bootstrap | text-wrap whitespace-pre | 0px | none | rgb(229, 231, 235) | collapse |
| dark | Bootstrap | border | 1px | solid | rgb(73, 80, 87) | preserve |
| dark | Bootstrap | border border-red-500 | 1px | solid | rgb(73, 80, 87) | preserve |
| dark | Bootstrap | border border-primary | 1px | solid | rgb(13, 110, 253) | preserve |
| dark | Bootstrap | border-0 | 0px | none | rgb(222, 226, 230) | preserve |
| dark | Bootstrap | text-nowrap | 0px | none | rgb(222, 226, 230) | collapse |
| dark | Bootstrap | text-wrap | 0px | none | rgb(222, 226, 230) | collapse |
| dark | Bootstrap | text-wrap whitespace-pre | 0px | none | rgb(222, 226, 230) | collapse |
| dark | Recipe + planted utilities border color | border | 1px | solid | rgb(1, 2, 3) | preserve |
| dark | Recipe + planted utilities border color | border border-red-500 | 1px | solid | rgb(1, 2, 3) | preserve |
| dark | Recipe + planted utilities border color | border border-primary | 1px | solid | rgb(21, 93, 252) | preserve |
| dark | Recipe + planted utilities border color | border-0 | 0px | solid | rgb(229, 231, 235) | preserve |
| dark | Recipe + planted utilities border color | text-nowrap | 0px | solid | rgb(229, 231, 235) | collapse |
| dark | Recipe + planted utilities border color | text-wrap | 0px | solid | rgb(229, 231, 235) | collapse |
| dark | Recipe + planted utilities border color | text-wrap whitespace-pre | 0px | solid | rgb(229, 231, 235) | preserve |


## Journey comparison command

```sh
node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline /home/user/veneer/tmp/units/journey-cost/runs/landing-66f80b5-journey --candidate /home/user/veneer/tmp/units/journey-cost/runs/l1-journey --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.json --registration 94/0 --moves /home/user/veneer/tmp/units/journey-cost/redesign-moves.json --out /home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md
```

Exit 67: Different: 43 differences. No failed tests or host-bound failures. Registration is 94/0. Expected utility cause counts fall from 3310 to 1683 in light and 3314 to 1687 in dark, at both widths. Expected partition utility differences rise from 5792 to 5796 at 1280 and 5794 to 5798 at 390. Partition violations remain zero, components remain 351, and clauses, skipped counts, and control counts do not change.

# Journey difference classification

Comparison exit: 67. Journey exit: 0; 94 passed, 0 skipped. No statechart row moves. No pinned count changed.

F1: The closed preservation summaries have 4 more invisible exclusions in every theme/width. This lies outside the predicted utility cause-count change. No fix. Hypothesis: the border supplement creates color differences on a zero-width border carrier.

F2: The light 390 tooltip has placement count 1 instead of 0. This lies outside the prediction. No fix. Hypothesis: the placement engine settles at a different subpixel position between the two sheet readings.

Each numbered entry links the exact raw comparison line.

| Difference | Channel | Classification |
| --- | --- | --- |
| [1](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:12) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [2](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:13) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [3](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:14) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [4](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:15) | Rows | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [5](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:16) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [6](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:17) | Rows | Expected partition utility-difference count increase by 4. |
| [7](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:18) | Rows | Expected partition utility-difference count increase by 4. |
| [8](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:19) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [9](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:20) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [10](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:21) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [11](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:22) | Rows | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [12](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:23) | Rows | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [13](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:24) | Rows | Expected partition utility-difference count increase by 4. |
| [14](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:25) | Rows | Expected partition utility-difference count increase by 4. |
| [15](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:26) | Row order | Payload inequality in ordered preservation rows; identities and all other rows retain their order. |
| [16](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:27) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [17](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:28) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [18](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:29) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [19](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:30) | Lines | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [20](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:31) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [21](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:32) | Lines | Expected partition utility-difference count increase by 4. |
| [22](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:33) | Lines | Expected partition utility-difference count increase by 4. |
| [23](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:34) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [24](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:35) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [25](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:36) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [26](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:37) | Lines | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [27](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:38) | Lines | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [28](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:39) | Lines | Expected partition utility-difference count increase by 4. |
| [29](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:40) | Lines | Expected partition utility-difference count increase by 4. |
| [30](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:41) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [31](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:42) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [32](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:43) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [33](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:44) | Journal | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [34](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:45) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [35](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:46) | Journal | Expected partition utility-difference count increase by 4. |
| [36](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:47) | Journal | Expected partition utility-difference count increase by 4. |
| [37](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:48) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [38](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:49) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [39](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:50) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [40](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:51) | Journal | Finding F2: light 390 tooltip placement count increases from 0 to 1. |
| [41](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:52) | Journal | Expected utility-count change; finding F1: invisible exclusions increase by 4. |
| [42](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:53) | Journal | Expected partition utility-difference count increase by 4. |
| [43](/home/user/.wave/veneer-l1/tmp/units/l1/journey-compare.md:54) | Journal | Expected partition utility-difference count increase by 4. |

Per-artifact row checks:

- dark-1280: 184 rows; identities equal in order; rows outside preservation and partition byte-equal in order.
- dark-390: 215 rows; identities equal in order; rows outside preservation and partition byte-equal in order.
- light-1280: 183 rows; identities equal in order; rows outside preservation and partition byte-equal in order.
- light-390: 180 rows; identities equal in order; rows outside preservation and partition byte-equal in order.


## Gate commands, folders, exits, and bare results

Every build and test command used the host queue with a fresh folder. Each linked folder retains start.json, end.json, stdout.log, and stderr.log. This table includes corrected failing attempts and the red/green control runs as well as the final gates.

| Folder | Exit | Bare result |
| --- | --- | --- |
| [l1-build](/home/user/veneer/tmp/units/journey-cost/runs/l1-build) | 0 | Source and app builds passed |
| [l1-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-check) | 0 | Type checks passed |
| [l1-conformance-records](/home/user/veneer/tmp/units/journey-cost/runs/l1-conformance-records) | 0 | Tests  2 passed ; 128 skipped (130) |
| [l1-derivation-green](/home/user/veneer/tmp/units/journey-cost/runs/l1-derivation-green) | 0 | Tests  1 passed ; 12 skipped (13) |
| [l1-derivation-red](/home/user/veneer/tmp/units/journey-cost/runs/l1-derivation-red) | 1 | Tests  1 failed ; 11 skipped (12) |
| [l1-final-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-final-check) | 0 | Type checks passed |
| [l1-final-format-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-final-format-check) | 0 | 359 files correctly formatted |
| [l1-final-lint-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-final-lint-check) | 1 | Diagnostics; see exact completion below |
| [l1-format-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-format-check) | 0 | 359 files correctly formatted |
| [l1-format-clean](/home/user/veneer/tmp/units/journey-cost/runs/l1-format-clean) | 0 | 359 files correctly formatted |
| [l1-guides-clean](/home/user/veneer/tmp/units/journey-cost/runs/l1-guides-clean) | 0 | Tests  20 passed (20) |
| [l1-journey](/home/user/veneer/tmp/units/journey-cost/runs/l1-journey) | 0 | Tests  94 passed (94) |
| [l1-lint-check](/home/user/veneer/tmp/units/journey-cost/runs/l1-lint-check) | 1 | Diagnostics; see exact completion below |
| [l1-lint-clean](/home/user/veneer/tmp/units/journey-cost/runs/l1-lint-clean) | 0 | No diagnostics |
| [l1-regenerate](/home/user/veneer/tmp/units/journey-cost/runs/l1-regenerate) | 0 | Completed; see exact completion below |
| [l1-tailwind-dev](/home/user/veneer/tmp/units/journey-cost/runs/l1-tailwind-dev) | 1 | Tests  1 failed ; 12 passed (13) |
| [l1-test-app-browser](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-app-browser) | 0 | Tests  245 passed (245) |
| [l1-test-config](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-config) | 0 | Tests  227 passed ; 1 skipped (228) |
| [l1-test-guides](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-guides) | 1 | Tests  1 failed ; 19 passed (20) |
| [l1-test-integration](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-integration) | 0 | Tests  60 passed (60) |
| [l1-test-policy](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-policy) | 0 | Tests  119 passed ; 1 skipped (120) |
| [l1-test-setup](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-setup) | 0 | Tests  186 passed (186) |
| [l1-test-setup-browser](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-setup-browser) | 0 | Tests  205 passed (205) |
| [l1-test-src-bootstrap](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-bootstrap) | 0 | Tests  14 passed (14) |
| [l1-test-src-styles](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-styles) | 0 | Tests  15 passed ; 1 todo (16) |
| [l1-test-src-tailwindcss](/home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-tailwindcss) | 0 | Tests  13 passed (13) |

### l1-build

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-build --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run build
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 build
> npm run clean && npm run build:src && npm run build:app


> @orkestrel/veneer@0.0.1 clean
> node -e "require('node:fs').rmSync('dist',{recursive:true,force:true})"


> @orkestrel/veneer@0.0.1 build:src
> npm run build:src:core && npm run build:src:browser && npm run build:src:bootstrap && npm run build:src:tailwindcss && npm run build:src:styles && npm run build:src:vue


> @orkestrel/veneer@0.0.1 build:src:core
> vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts

vite v8.3.3 building client environment for production...
transforming...
✓ 5 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.js  104.40 kB │ gzip: 16.05 kB │ map: 202.76 kB

transforming...
✓ 5 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  104.59 kB │ gzip: 16.14 kB │ map: 202.79 kB

✓ built in 463ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

> @orkestrel/veneer@0.0.1 copy
> node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts

Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts

> @orkestrel/veneer@0.0.1 build:src:browser
> vite build --config configs/src/vite.browser.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 29 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  264.77 kB │ gzip: 53.42 kB │ map: 527.59 kB

✓ built in 286ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

> @orkestrel/veneer@0.0.1 build:src:bootstrap
> vite build --config configs/src/vite.bootstrap.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/bootstrap/index.css  332.38 kB │ gzip: 34.88 kB
dist/src/bootstrap/index.js     0.00 kB │ gzip:  0.02 kB

✓ built in 1.50s

> @orkestrel/veneer@0.0.1 build:src:tailwindcss
> vite build --config configs/src/vite.tailwindcss.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/tailwindcss/index.css  417.26 kB │ gzip: 41.77 kB
dist/src/tailwindcss/index.js     0.00 kB │ gzip:  0.02 kB

✓ built in 2.18s

> @orkestrel/veneer@0.0.1 build:src:styles
> vite build --config configs/src/vite.styles.config.ts && vite build --config configs/src/vite.themes.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/styles/index.css  0.13 kB │ gzip: 0.12 kB
dist/src/styles/index.js   0.00 kB │ gzip: 0.02 kB

✓ built in 210ms
vite v8.3.3 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/styles/themes/index.css  0.19 kB │ gzip: 0.16 kB
dist/src/styles/themes/index.js   0.00 kB │ gzip: 0.02 kB

✓ built in 196ms

> @orkestrel/veneer@0.0.1 build:src:vue
> vite build --config configs/src/vite.vue.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/vue/index.js  0.00 kB │ gzip: 0.02 kB

✓ built in 46ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

> @orkestrel/veneer@0.0.1 build:app
> npm run build:app:browser && npm run build:app:vue


> @orkestrel/veneer@0.0.1 build:app:browser
> vite build --config configs/app/vite.browser.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 114 modules transformed.
rendering chunks...
computing gzip size...
dist/app/browser/index.html                    0.28 kB │ gzip:   0.22 kB
dist/app/browser/assets/index-C1JZN7bG.js  1,380.57 kB │ gzip: 195.96 kB

✓ built in 840ms

> @orkestrel/veneer@0.0.1 build:app:vue
> vite build --config configs/app/vite.vue.config.ts

vite v8.3.3 building client environment for production...
transforming...
✓ 11 modules transformed.
rendering chunks...
computing gzip size...
dist/app/vue/index.html                 0.31 kB │ gzip:  0.23 kB
dist/app/vue/assets/index-CwUrPIFy.js  61.30 kB │ gzip: 24.19 kB

✓ built in 303ms
```

### l1-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 check
> tsc --noEmit --project tsconfig.json && npm run check:src && npm run check:app


> @orkestrel/veneer@0.0.1 check:src
> npm run check:src:core && npm run check:src:browser && npm run check:src:bootstrap && npm run check:src:tailwindcss && npm run check:src:styles && npm run check:src:vue


> @orkestrel/veneer@0.0.1 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json


> @orkestrel/veneer@0.0.1 check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json


> @orkestrel/veneer@0.0.1 check:src:bootstrap
> tsc --noEmit -p configs/src/tsconfig.bootstrap.json


> @orkestrel/veneer@0.0.1 check:src:tailwindcss
> tsc --noEmit -p configs/src/tsconfig.tailwindcss.json


> @orkestrel/veneer@0.0.1 check:src:styles
> tsc --noEmit -p configs/src/tsconfig.styles.json


> @orkestrel/veneer@0.0.1 check:src:vue
> tsc --noEmit -p configs/src/tsconfig.vue.json


> @orkestrel/veneer@0.0.1 check:app
> npm run check:app:core && npm run check:app:browser && npm run check:app:vue


> @orkestrel/veneer@0.0.1 check:app:core
> tsc --noEmit -p configs/app/tsconfig.core.json


> @orkestrel/veneer@0.0.1 check:app:browser
> vue-tsc --noEmit -p configs/app/tsconfig.browser.json


> @orkestrel/veneer@0.0.1 check:app:vue
> vue-tsc --noEmit -p configs/app/tsconfig.vue.json
```

### l1-conformance-records

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-conformance-records --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:conformance -- --testNamePattern 'pins the (recipe record|showcase recipe record)'
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  2 passed | 128 skipped (130)
   Start at  00:32:04
   Duration  1.81s (transform 488ms, setup 448ms, import 418ms, tests 780ms, environment 0ms)
```

### l1-derivation-green

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-derivation-green --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:tailwindcss -- --testNamePattern 'derives supplied'
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  1 passed | 12 skipped (13)
   Start at  00:34:35
   Duration  14.98s (transform 0ms, setup 647ms, import 149ms, tests 1.27s, environment 0ms)
```

### l1-derivation-red

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-derivation-red --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:tailwindcss -- --testNamePattern 'derives supplied'
```

Exit 1.

```text
Test Files  1 failed (1)
      Tests  1 failed | 11 skipped (12)
   Start at  00:16:57
   Duration  14.98s (transform 0ms, setup 1.04s, import 280ms, tests 1.84s, environment 0ms)
```

### l1-final-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-final-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 check
> tsc --noEmit --project tsconfig.json && npm run check:src && npm run check:app


> @orkestrel/veneer@0.0.1 check:src
> npm run check:src:core && npm run check:src:browser && npm run check:src:bootstrap && npm run check:src:tailwindcss && npm run check:src:styles && npm run check:src:vue


> @orkestrel/veneer@0.0.1 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json


> @orkestrel/veneer@0.0.1 check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json


> @orkestrel/veneer@0.0.1 check:src:bootstrap
> tsc --noEmit -p configs/src/tsconfig.bootstrap.json


> @orkestrel/veneer@0.0.1 check:src:tailwindcss
> tsc --noEmit -p configs/src/tsconfig.tailwindcss.json


> @orkestrel/veneer@0.0.1 check:src:styles
> tsc --noEmit -p configs/src/tsconfig.styles.json


> @orkestrel/veneer@0.0.1 check:src:vue
> tsc --noEmit -p configs/src/tsconfig.vue.json


> @orkestrel/veneer@0.0.1 check:app
> npm run check:app:core && npm run check:app:browser && npm run check:app:vue


> @orkestrel/veneer@0.0.1 check:app:core
> tsc --noEmit -p configs/app/tsconfig.core.json


> @orkestrel/veneer@0.0.1 check:app:browser
> vue-tsc --noEmit -p configs/app/tsconfig.browser.json


> @orkestrel/veneer@0.0.1 check:app:vue
> vue-tsc --noEmit -p configs/app/tsconfig.vue.json
```

### l1-final-format-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-final-format-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run format:check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 854ms on 359 files using 4 threads.
```

### l1-final-lint-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-final-lint-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run lint:check
```

Exit 1.

```text
> @orkestrel/veneer@0.0.1 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

tests/src/tailwindcss/index.test.ts:114:42: warning eslint(no-shadow): 'name' is already declared in the upper scope. help: Consider renaming 'name' to avoid shadowing the variable from the outer scope.
```

### l1-format-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-format-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run format:check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 1047ms on 359 files using 4 threads.
```

### l1-format-clean

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-format-clean --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run format:check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 831ms on 359 files using 4 threads.
```

### l1-guides-clean

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-guides-clean --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:guides
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  20 passed (20)
   Start at  00:35:09
   Duration  2.83s (transform 293ms, setup 149ms, import 1.07s, tests 1.47s, environment 0ms)
```

### l1-journey

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-journey --kind journey --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH CAPTURE=0 /home/user/.wave/veneer-l1/node_modules/.bin/vitest run --config /home/user/.wave/veneer-l1/configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/l1-journey/report.json
```

Exit 0.

```text
Test Files  4 passed (4)
      Tests  94 passed (94)
   Start at  00:22:04
   Duration  570.82s (transform 0ms, setup 9.47s, import 6.05s, tests 1846.40s, environment 0ms)

JSON report written to /home/user/veneer/tmp/units/journey-cost/runs/l1-journey/report.json
```

### l1-lint-check

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-lint-check --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run lint:check
```

Exit 1.

```text
> @orkestrel/veneer@0.0.1 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

tests/src/tailwindcss/index.test.ts:51:9: warning eslint(no-shadow): 'utilities' is already declared in the upper scope. help: Consider renaming 'utilities' to avoid shadowing the variable from the outer scope.
tests/src/tailwindcss/index.test.ts:68:10: warning eslint(no-shadow): 'tailwind' is already declared in the upper scope. help: Consider renaming 'tailwind' to avoid shadowing the variable from the outer scope.
tests/src/tailwindcss/index.test.ts:89:18: error typescript(array-type): Array type using 'T[]' is forbidden for non-simple types. Use 'Array<T>' instead. help: Replace `{ name: string property: string reason: string value: string | undefined initial: string | undefined }[]` with `Array<{ name: string property: string reason: string value: string | undefined initial: string | undefined }>`.
tests/src/tailwindcss/index.test.ts:146:6: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
```

### l1-lint-clean

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-lint-clean --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run lint:check
```

Exit 0.

```text
> @orkestrel/veneer@0.0.1 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

### l1-regenerate

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-regenerate --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH node tmp/units/l1/regenerate.ts
```

Exit 0.

```text
{"path":"tests/fixtures/tailwindcss/recipe.json","candidates":2029,"sheet":"df6faefecd8f9832e273f66abe7886b075bda47de377bf30beab01e3f6560de1"}
{"path":"app/browser/recipe.json","candidates":2039,"sheet":"df6faefecd8f9832e273f66abe7886b075bda47de377bf30beab01e3f6560de1"}
```

### l1-tailwind-dev

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-tailwind-dev --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:tailwindcss
```

Exit 1.

```text
Test Files  1 failed (1)
      Tests  1 failed | 12 passed (13)
   Start at  00:18:41
   Duration  26.47s (transform 0ms, setup 815ms, import 243ms, tests 14.76s, environment 0ms)
```

### l1-test-app-browser

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-app-browser --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:app:browser
```

Exit 0.

```text
Test Files  8 passed (8)
      Tests  245 passed (245)
   Start at  00:38:46
   Duration  217.41s (transform 0ms, setup 1.63s, import 1.20s, tests 204.39s, environment 0ms)
```

### l1-test-config

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-config --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:config
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  227 passed | 1 skipped (228)
   Start at  00:34:25
   Duration  5.74s (transform 420ms, setup 175ms, import 1.04s, tests 4.39s, environment 0ms)
```

### l1-test-guides

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-guides --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:guides
```

Exit 1.

```text
Test Files  1 failed (1)
      Tests  1 failed | 19 passed (20)
   Start at  00:34:17
   Duration  2.83s (transform 255ms, setup 164ms, import 980ms, tests 1.54s, environment 0ms)
```

### l1-test-integration

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-integration --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:integration
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  60 passed (60)
   Start at  00:33:31
   Duration  43.36s (transform 0ms, setup 600ms, import 1.24s, tests 28.98s, environment 0ms)
```

### l1-test-policy

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-policy --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:policy
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  119 passed | 1 skipped (120)
   Start at  00:34:21
   Duration  2.63s (transform 365ms, setup 236ms, import 452ms, tests 1.80s, environment 0ms)
```

### l1-test-setup

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-setup --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:setup
```

Exit 0.

```text
Test Files  2 passed (2)
      Tests  186 passed (186)
   Start at  00:34:51
   Duration  16.85s (transform 802ms, setup 338ms, import 1.18s, tests 16.54s, environment 0ms)
```

### l1-test-setup-browser

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-setup-browser --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:setup:browser
```

Exit 0.

```text
Test Files  2 passed (2)
      Tests  205 passed (205)
   Start at  00:35:13
   Duration  209.89s (transform 0ms, setup 945ms, import 340ms, tests 199.92s, environment 0ms)
```

### l1-test-src-bootstrap

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-bootstrap --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:bootstrap
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  14 passed (14)
   Start at  00:32:10
   Duration  6.40s (transform 0ms, setup 755ms, import 901ms, tests 1.09s, environment 0ms)
```

### l1-test-src-styles

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-styles --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:styles
```

Exit 0.

```text
Test Files  2 passed (2)
      Tests  15 passed | 1 todo (16)
   Start at  00:32:21
   Duration  16.02s (transform 0ms, setup 718ms, import 279ms, tests 12ms, environment 0ms)
```

### l1-test-src-tailwindcss

```sh
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/l1-test-src-tailwindcss --kind command --cwd /home/user/.wave/veneer-l1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:tailwindcss
```

Exit 0.

```text
Test Files  1 passed (1)
      Tests  13 passed (13)
   Start at  00:31:40
   Duration  22.50s (transform 0ms, setup 810ms, import 142ms, tests 10.76s, environment 0ms)
```


## Direct gates and status

git -C /home/user/.wave/veneer-l1 diff --check: exit 0, no output ("").

git -C /home/user/.wave/veneer-l1 status --porcelain: exit 0, only owned files:

```text
 M app/browser/recipe.json
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/fixtures/tailwindcss/recipe.json
 M tests/integration.test.ts
 M tests/src/tailwindcss/index.test.ts
```

## Deviations

| Expected | Found and evidence | Done or not | One hypothesis or established cause |
| --- | --- | --- | --- |
| Only utility causes and partition payloads change in the journey | F1: invisible exclusions +4 in all four closed views; exact comparison entries above | Not fixed; outside scope prediction | The border supplement creates color differences on zero-width border carriers |
| No unrelated tooltip departure | F2: light 390 tooltip placement 0 to 1; six comparison entries across Rows, Lines, Journal | Not fixed; outside scope prediction | Placement settles at a different subpixel position between sheet readings |
| No statechart moves | Comparator labels dark-390 ordered rows different; identity and untouched-row checks show unchanged order | Classified, no change | The comparator compares changed payloads as well as identities |
| Derivation rejects missing supply | l1-derivation-red: one failure for six missing declarations | Expected red; implementation and green proof done | Empty map lacked the derived six declarations |
| Border color assertion matches mapped theme | l1-tailwind-dev: 12 pass, one failure from guessed light RGB | Corrected; full Tailwind suite passes | Guessed RGB used the wrong Tailwind gray; independent mapped-sheet equality supplies the actual reference |
| Lint clean | l1-lint-check and l1-final-lint-check diagnostics | Fixed; l1-lint-clean exit 0 | Shadowed callback names, array notation, and conditional expect |
| Guide citations resolve | l1-test-guides: one failure, three unresolved citations | Fixed; l1-guides-clean 20 pass | Renaming existing case titles broke citations; original titles restored |
| Build succeeds | Existing API Extractor TS 5.9.3/project TS 6.0.3 and large app-chunk warnings; retained stderr | Build passes; warning sources unchanged | Existing toolchain and app bundle configuration |
| Browser setup negative control records its deliberate failure | stderr says Deliberately broken showcase row; l1-test-setup-browser has 205 passes | Expected control; no fix | The test deliberately exercises harness error retention |

No Vite optimizer import failure occurred. No optimizer retry, extra statechart fix, pinned count edit, unowned tracked change, or commit. Full retained stderr and run metadata: [results.json](/home/user/.wave/veneer-l1/tmp/units/l1/results.json).
