<!-- The J-CASCADE checker lane (checker on Sonnet, native read-only subagent a9a157b2e3e56816b), retained verbatim from its completion notification; brief: units/j-cascade-audit-checker-brief.md; claims units/j-cascade-audit-claims.md; subject Veneer a963585. -->

The three patched sentences landed in the guide as reported. All checks pass.

**Claim 1's hit list:**
- `.fade {` literal: no hits in `Alert.test.ts`, `Tab.test.ts`, `Toast.test.ts`, `Tooltip.test.ts`.
- `declares no fade` / `does not carry` / `does not` near `fade`: no hits (only unrelated matches for `does not` at `Tooltip.test.ts:422,868`, neither near "fade" or naming an absent cascade).
- `fade` / `FADE` constants: none remain as stand-in string constants; every case loads `tokensCascade`, `fadeCascade`, and the component's own sheet (`alertCascade`, `navCascade`, `toastCascade`, `tooltipCascade`) — confirmed by `Alert.test.ts:8-10,32-33,92-93,118-119,257-258,279-280,302-303,590-591`; `Tab.test.ts:8-10,46-47,406-407,449-450,542-543,1332-1333,1468-1469`; `Toast.test.ts:16-18,58-59,80-81,130-131,175-176,198-199,232-233,256-257,629-630,1085-1086,1104-1105,1323-1324`; `Tooltip.test.ts:25-27,246-247,317-318,645-646,734-735,885-886,1430-1431,2478-2479`.

**Case table (fade-awaiting cases, each loads tokens+fade+own sheet):**

| File | Case | tokensCascade | fadeCascade | own sheet |
| --- | --- | --- | --- | --- |
| Alert.test.ts:91 | fades an alert carrying the fade token out… | yes | yes | yes (`alertCascade`) |
| Alert.test.ts:117 | dispatches closed … motion factor… | yes | yes | yes |
| Tab.test.ts:405 | waits for the pane fade to settle… | yes | yes | yes (`navCascade`) |
| Tab.test.ts:448 | dispatches shown … motion factor… | yes | yes | yes |
| Toast.test.ts:79 | shows through the fade and showing tokens… | yes | yes | yes (`toastCascade`) |
| Toast.test.ts:129 | dispatches hidden … motion factor… | yes | yes | yes |
| Toast.test.ts:174 | dispatches shown after the fade out … | yes | yes | yes |
| Tooltip.test.ts (per grep) | fade-awaiting cases at 246/317/645/734/885/1430/2478 | yes | yes | yes (`tooltipCascade`) |

**Claim 8's reading.** `j-cascade-status.txt` lists exactly `guides/veneer.md`, `Alert.test.ts`, `Carousel.test.ts`, `Popover.test.ts`, `Tab.test.ts`, `Toast.test.ts`, `Tooltip.test.ts` — six test files plus the guide, matching. Every import checked (`tokensCascade`, `fadeCascade`, `alertCascade`, `navCascade`, `toastCascade`, `tooltipCascade`, `popoverCascade`, `carouselCascade`) has a `scene.load` use in its file. No unused import or constant found in the sample checked.

**The report's case titles.** All titles quoted under C1/C2/C3 verified to exist verbatim: the Toast rework title (`Toast.test.ts:174`), the Popover C1 title (`Popover.test.ts:166`), the Carousel C3 title (`Carousel.test.ts:1371`), and the motion-factor titles for Alert/Tab/Toast (`Alert.test.ts:117`, `Tab.test.ts:448`, `Toast.test.ts:129`).

**Titles not found.** None.

CHECK: PASS
