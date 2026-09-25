# J-MOTION-PROOFS-A round 4 report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-motion-proofs-a-brief-4.md`.

---

The plant now covers the responsive Offcanvas panels, and the value probe is a file `plant.sh` runs every time. Against the round-3 tip, the probe and all four owned files pass. As a control, the round-3 plant fails the probe on the responsive panel alone, so the probe catches the gap the audit found. I changed no source or test file, and the tree is clean.

## Plant and probe changes
All files are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a/tmp/j-motion-proofs-a/`.

- **`plant.py` (P1):** the Offcanvas block now loops over the partial's `breakpoints()` and skips the zero boundary, covering `.offcanvas-sm` through `.offcanvas-xxl`. For each class it plants, below that boundary only (through the partial's `breakpoint-down` mixin):
  - opacity 0, with `transform` over `--vn-motion-panel` on `--vn-ease-panel` and `opacity` over `--vn-motion-panel` on `--vn-ease-out`, through the `transition` mixin;
  - opacity 1 on `.showing` and on `.show:not(.hiding)`.

  At and above its boundary, a responsive panel sits in the flow and gets no planted rule. The bare `.offcanvas`, fade, Modal and backdrop blocks are unchanged. I also fixed the docstring's guard sentence: the script refuses any target outside the worktree's `tmp` tree.
- **Probe (P2): `plant-probe.test.ts.txt`.** `plant.sh` copies it into the scratch copy as `tests/src/browser/PlantProbe.test.ts` and runs it first. At the tester's 414px viewport, which it asserts is below 576px, it reads the transitioned property, duration, easing and opacity on:
  - the modal host, the dialog, the backdrop and a fading alert;
  - a bare `.offcanvas-start` panel;
  - a responsive `.offcanvas-sm.offcanvas-end` panel.

  It also reads:
  - the dialog transform `matrix(0.96, 0, 0, 0.96, 0, 0)`;
  - that each hidden panel sits off its own edge;
  - opacity 1 on each panel once shown;
  - at 600px, the responsive panel in the flow at duration `0s` and opacity `1`.
- **`plant.sh`:** runs the probe, then the four files, and removes the scratch copy at the end. It takes an optional planter and log label, so a control can reuse it without overwriting the plant run's logs.
- **`plant-round-3.py`:** a copy of the retained round-3 planter (`units/j-motion-proofs-a-plant.py`), used only for the control.

## Readings (P3)
Command: `bash tmp/j-motion-proofs-a/plant.sh`
```
planted src/styles/components/_fade.scss
planted src/styles/components/_modal.scss
planted src/styles/components/_offcanvas.scss
PlantProbe exit 0
 Test Files  1 passed (1)
      Tests  1 passed (1)
Modal exit 0
 Test Files  1 passed (1)
      Tests  61 passed (61)
Offcanvas exit 0
 Test Files  1 passed (1)
      Tests  62 passed (62)
Backdrop exit 0
 Test Files  1 passed (1)
      Tests  13 passed (13)
Alert exit 0
 Test Files  1 passed (1)
      Tests  24 passed (24)
scratch removed: yes
```

Control command: `bash tmp/j-motion-proofs-a/plant.sh tmp/j-motion-proofs-a/plant-round-3.py control-round-3`
```
PlantProbe exit 1
AssertionError: expected { …(6) } to deeply equal { …(6) }
- Expected
+ Received
-     "transform, opacity",
-     "0.25s, 0.25s",
-     "cubic-bezier(0.32, 0.72, 0, 1), ease-out",
-     "0",
+     "transform",
+     "0.3s",
+     "ease-in-out",
+     "1",
 Test Files  1 failed (1)
      Tests  1 failed (1)
Modal exit 0      Tests  61 passed (61)
Offcanvas exit 0  Tests  62 passed (62)
Backdrop exit 0   Tests  13 passed (13)
Alert exit 0      Tests  24 passed (24)
scratch removed: yes
```
Under the round-3 planter, the responsive panel keeps the shipped `transform 0.3s ease-in-out` at opacity 1. The logs are in `plant-logs/`, as `plant-*.log.txt` and `control-round-3-*.log.txt`.

## git status --short
Empty at `180d513`; the tree has no tracked changes.

## Deviation state
None. The one addition beyond the brief is the control run and its `plant-round-3.py` copy under `tmp/`.
