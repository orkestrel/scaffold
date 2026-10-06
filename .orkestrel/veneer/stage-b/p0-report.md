The measured seam is dropdown clipping: Veneer’s menu escapes the plain scroller in both browsers; Bootstrap’s remains clipped. The earlier body-tooltip suppression was not reproduced.

The table contains all 72 readings from [Chromium 141 stdout](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium141-20261006-a/stdout.log) and [Chromium 153 stdout](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium153-20261006-a/stdout.log).

Notation:

- `141` = Chromium 141.0.7390.37; `153` = Chromium 153.0.8010.12.
- Visibility: `A` = `always`; `V` = `anchors-visible`; `N` = `no-overflow`.
- Hit: `T` = `div.tooltip-inner`, floater descendant; `D` = `button.dropdown-item`, floater descendant; `H` = `html`, outside floater.
- Color: `black` = `rgb(0, 0, 0)`; `transparent` = `rgba(0, 0, 0, 0)`.
- Every floater box is inside the 800 × 600 viewport. The ancestor box is `(80,180,240,70)`, expressed as `(x,y,width,height)`.
- `T0` = `(52.921875,145,121.625,29)` for Veneer, `(53,145,121.625,29)` for Bootstrap; entirely outside the ancestor box.
- `T1` = the corresponding tooltip box at `y=65`; entirely outside the ancestor box.
- `D0` = `(80,212,160,50)`; partially outside the ancestor, center inside.
- `D1` = `(80,132,160,50)`; partially outside the ancestor, center outside.
- `transformed` means `overflow:hidden; transform:translateZ(0)`, scrolled to 80 px after opening. `scrolled` uses `overflow:auto` and the same scroll.

| Chromium | Engine | Floater | Condition | Experiment | Visibility | Show | Hit | Box against clip | Color |
|---|---|---|---|---|---|---|---|---|---|
| 141 | Veneer | Body tooltip | Visible | default | A | true | T | T0: out | black |
| 141 | Veneer | Body tooltip | Visible | always | A | true | T | T0: out | black |
| 141 | Veneer | Body tooltip | Visible | no-overflow | N | true | T | T0: out | black |
| 141 | Veneer | Body tooltip | Scrolled | default | A | true | T | T1: out | black |
| 141 | Veneer | Body tooltip | Scrolled | always | A | true | T | T1: out | black |
| 141 | Veneer | Body tooltip | Scrolled | no-overflow | N | true | T | T1: out | black |
| 141 | Veneer | Body tooltip | Transformed | default | A | true | T | T1: out | black |
| 141 | Veneer | Body tooltip | Transformed | always | A | true | T | T1: out | black |
| 141 | Veneer | Body tooltip | Transformed | no-overflow | N | true | T | T1: out | black |
| 141 | Veneer | Dropdown | Visible | default | A | true | D | D0: partial, center in | transparent |
| 141 | Veneer | Dropdown | Visible | always | A | true | D | D0: partial, center in | transparent |
| 141 | Veneer | Dropdown | Visible | no-overflow | N | true | D | D0: partial, center in | transparent |
| 141 | Veneer | Dropdown | Scrolled | default | A | true | D | D1: partial, center out | transparent |
| 141 | Veneer | Dropdown | Scrolled | always | A | true | D | D1: partial, center out | transparent |
| 141 | Veneer | Dropdown | Scrolled | no-overflow | N | true | D | D1: partial, center out | transparent |
| 141 | Veneer | Dropdown | Transformed | default | A | true | H | D1: partial, center out | transparent |
| 141 | Veneer | Dropdown | Transformed | always | A | true | H | D1: partial, center out | transparent |
| 141 | Veneer | Dropdown | Transformed | no-overflow | N | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Body tooltip | Visible | default | A | true | T | T0: out | black |
| 141 | Bootstrap | Body tooltip | Visible | always | A | true | T | T0: out | black |
| 141 | Bootstrap | Body tooltip | Visible | no-overflow | N | true | T | T0: out | black |
| 141 | Bootstrap | Body tooltip | Scrolled | default | A | true | T | T1: out | black |
| 141 | Bootstrap | Body tooltip | Scrolled | always | A | true | T | T1: out | black |
| 141 | Bootstrap | Body tooltip | Scrolled | no-overflow | N | true | T | T1: out | black |
| 141 | Bootstrap | Body tooltip | Transformed | default | A | true | T | T1: out | black |
| 141 | Bootstrap | Body tooltip | Transformed | always | A | true | T | T1: out | black |
| 141 | Bootstrap | Body tooltip | Transformed | no-overflow | N | true | T | T1: out | black |
| 141 | Bootstrap | Dropdown | Visible | default | A | true | D | D0: partial, center in | transparent |
| 141 | Bootstrap | Dropdown | Visible | always | A | true | D | D0: partial, center in | transparent |
| 141 | Bootstrap | Dropdown | Visible | no-overflow | N | true | D | D0: partial, center in | transparent |
| 141 | Bootstrap | Dropdown | Scrolled | default | A | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Dropdown | Scrolled | always | A | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Dropdown | Scrolled | no-overflow | N | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Dropdown | Transformed | default | A | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Dropdown | Transformed | always | A | true | H | D1: partial, center out | transparent |
| 141 | Bootstrap | Dropdown | Transformed | no-overflow | N | true | H | D1: partial, center out | transparent |
| 153 | Veneer | Body tooltip | Visible | default | V | true | T | T0: out | black |
| 153 | Veneer | Body tooltip | Visible | always | A | true | T | T0: out | black |
| 153 | Veneer | Body tooltip | Visible | no-overflow | N | true | T | T0: out | black |
| 153 | Veneer | Body tooltip | Scrolled | default | V | true | T | T1: out | black |
| 153 | Veneer | Body tooltip | Scrolled | always | A | true | T | T1: out | black |
| 153 | Veneer | Body tooltip | Scrolled | no-overflow | N | true | T | T1: out | black |
| 153 | Veneer | Body tooltip | Transformed | default | V | true | T | T1: out | black |
| 153 | Veneer | Body tooltip | Transformed | always | A | true | T | T1: out | black |
| 153 | Veneer | Body tooltip | Transformed | no-overflow | N | true | T | T1: out | black |
| 153 | Veneer | Dropdown | Visible | default | V | true | D | D0: partial, center in | transparent |
| 153 | Veneer | Dropdown | Visible | always | A | true | D | D0: partial, center in | transparent |
| 153 | Veneer | Dropdown | Visible | no-overflow | N | true | D | D0: partial, center in | transparent |
| 153 | Veneer | Dropdown | Scrolled | default | V | true | D | D1: partial, center out | transparent |
| 153 | Veneer | Dropdown | Scrolled | always | A | true | D | D1: partial, center out | transparent |
| 153 | Veneer | Dropdown | Scrolled | no-overflow | N | true | D | D1: partial, center out | transparent |
| 153 | Veneer | Dropdown | Transformed | default | V | true | H | D1: partial, center out | transparent |
| 153 | Veneer | Dropdown | Transformed | always | A | true | H | D1: partial, center out | transparent |
| 153 | Veneer | Dropdown | Transformed | no-overflow | N | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Body tooltip | Visible | default | V | true | T | T0: out | black |
| 153 | Bootstrap | Body tooltip | Visible | always | A | true | T | T0: out | black |
| 153 | Bootstrap | Body tooltip | Visible | no-overflow | N | true | T | T0: out | black |
| 153 | Bootstrap | Body tooltip | Scrolled | default | V | true | T | T1: out | black |
| 153 | Bootstrap | Body tooltip | Scrolled | always | A | true | T | T1: out | black |
| 153 | Bootstrap | Body tooltip | Scrolled | no-overflow | N | true | T | T1: out | black |
| 153 | Bootstrap | Body tooltip | Transformed | default | V | true | T | T1: out | black |
| 153 | Bootstrap | Body tooltip | Transformed | always | A | true | T | T1: out | black |
| 153 | Bootstrap | Body tooltip | Transformed | no-overflow | N | true | T | T1: out | black |
| 153 | Bootstrap | Dropdown | Visible | default | V | true | D | D0: partial, center in | transparent |
| 153 | Bootstrap | Dropdown | Visible | always | A | true | D | D0: partial, center in | transparent |
| 153 | Bootstrap | Dropdown | Visible | no-overflow | N | true | D | D0: partial, center in | transparent |
| 153 | Bootstrap | Dropdown | Scrolled | default | V | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Dropdown | Scrolled | always | A | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Dropdown | Scrolled | no-overflow | N | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Dropdown | Transformed | default | V | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Dropdown | Transformed | always | A | true | H | D1: partial, center out | transparent |
| 153 | Bootstrap | Dropdown | Transformed | no-overflow | N | true | H | D1: partial, center out | transparent |

The diagnosis is a containing-block/clipping difference, supported by equal dropdown geometry and different center hits. [Placement.ts:211](/home/user/.wave/veneer-p0/src/browser/Placement.ts:211) assigns the default anchor, and [Placement.ts:224](/home/user/.wave/veneer-p0/src/browser/Placement.ts:224) switches the panel to fixed positioning; its [clipping-ancestor capture](/home/user/.wave/veneer-p0/src/browser/Placement.ts:92) supplies geometry correction without preserving Bootstrap’s ordinary clipping in this arrangement. The transformed ancestor restores dropdown clipping in both browsers. [Tip.ts:203](/home/user/.wave/veneer-p0/src/browser/Tip.ts:203) appends the tooltip to `body`, outside that ancestor, and its center remains hit-testable. Changing `position-visibility` changes the computed property but none of these sampled hits. These are hit and computed-color measurements, not composited-pixel evidence.

The stage A repair acceptance control is the plain-scroller dropdown case. Place the toggle and menu inside the absolute-positioned `(80,180,240,70)` scroller, followed by a 400 px spacer; open, then scroll to 80 px and wait two chained rendering frames. With no experimental declaration, require `.show=true`, box `(80,132,160,50)` inside the viewport with its center outside the clip, center hit `html`, and returned-element color `rgba(0, 0, 0, 0)`. The computed visibility is `always` on 141 and `anchors-visible` on 153. This fails today because Veneer hits `button.dropdown-item`; Bootstrap supplies the passing control. Preserve the visible-anchor hit, transformed-ancestor clipping, and body-tooltip hit/color controls. No repair was implemented.

The exact queued commands were:

```bash
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium141-20261006-a --kind command --cwd /home/user/.wave/veneer-p0 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH /home/user/.wave/veneer-p0/node_modules/.bin/vitest run --config /home/user/.wave/veneer-p0/vite.config.ts --configLoader runner --no-cache --reporter=dot --project src:browser /home/user/.wave/veneer-p0/tests/src/browser/anchor-visibility.probe.test.ts

flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium153-20261006-a --kind command --cwd /home/user/.wave/veneer-p0 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome /home/user/.wave/veneer-p0/node_modules/.bin/vitest run --config /home/user/.wave/veneer-p0/vite.config.ts --configLoader runner --no-cache --reporter=dot --project src:browser /home/user/.wave/veneer-p0/tests/src/browser/anchor-visibility.probe.test.ts
```

Both commands exited **0**, each with **12 tests passed**, **36 readings**, and no runner errors. See the [141 exit record](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium141-20261006-a/end.json) and [153 exit record](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-chromium153-20261006-a/end.json).

The probe file is deleted. `git status --porcelain` is empty; HEAD remains `ab7a8e7`. Nothing was committed.

The deviations are:

| Expected | Found and evidence | Done or not | One hypothesis |
|---|---|---|---|
| The cited feasibility report contains the anchor-visibility finding. | It does not; the finding is in [the verdict check](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/stage-b/codex/stage-b-verdict-check.md:88), with its probe retained in the adjacent measurements JSON. | Read the actual check and reused its scroller arrangement. | The brief conflated the feasibility report with the later check. |
| The earlier Chromium 153 tooltip suppression and initially clipped Veneer dropdown reproduce. | Both remain hit-testable in the default scrolled readings; the 153 stdout records the computed `anchors-visible` value, clipped anchor, and hits. | Completed the prescribed matrix; the earlier suppression remains unreproduced. | Sampling history may matter: the retained probe used timed waits and explicit `anchors-visible`/`always` writes; this probe used an untouched default, fresh experimental copies, and the prescribed two-frame waits. |
| Browser readings identify the complete Chromium version. | User-agent strings expose `141.0.0.0` and `153.0.0.0`. Executable `--version` commands, both exit 0, return the complete versions stated above. | Recorded both forms. | Chromium user-agent version reduction explains the shortened readings. |