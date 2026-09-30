# Appends E27's amendment from J-COLLAPSE-SIZE-PROBE (2026-09-25) to decisions.md, after the J-NATIVE-PROBE round-3
# amendment of E27 and E29 and before the E24 amendment that follows it.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\decisions.md')
t = p.read_bytes().decode('utf-8')
anchor = 'E24 amended at the J-SAMEWAY round-3 audit (2026-09-25).'
assert t.count(anchor) == 1, t.count(anchor)
text = """E27 amended at J-COLLAPSE-SIZE-PROBE (2026-09-25). The probe ran `opus` on Opus 5.5 in two rounds (`units/j-collapse-size-probe-brief.md`, `-brief-2.md`, and `units/j-collapse-size-probe-report.md`, `-report-2.md`). The file is `units/j-collapse-size-probe-2.test.ts` (SHA-256 `e7a8440b…`). It read on Chromium 153.0.8010.12 (`units/j-collapse-size-probe-2-153-run-2.log.txt`), and the Orchestrator's re-run is line for line the same (`units/j-collapse-size-probe-2-153-orchestrator.log.txt`). Every control separated its cases.

- **The basis follows Bootstrap's own write in each direction.**
  - `Collapse` shows a horizontal panel with `calc-size(min-content, size)`. Bootstrap writes `scrollWidth` at width 0, which is the min-content width rounded to an integer, and the pair match at every phase within the rounding.
  - It hides a horizontal panel with `calc-size(auto, size)`. Bootstrap writes the rect width, and only `auto` matches it.
  - It shows and hides a vertical panel with `calc-size(auto, size)`.
  - A single basis is refused. `auto` overshoots a horizontal show to the container, and every content basis drops a horizontal hide from the rect width at the write.
- **Three differences from Bootstrap's pixel path are accepted, because the settled end state is Bootstrap's in every row, and E28 compares settled end states:**
  - Content that grows during a show is followed. Bootstrap's measured size goes stale and then jumps when the inline size clears.
  - A panel with a border shows to its border-box size. Bootstrap's `scrollWidth` or `scrollHeight` excludes the border, so under `border-box` its show stops short by the two borders and jumps at completion: +4px at the end with 2px borders, on both axes.
  - Text's min-content width is fractional, where Bootstrap's `scrollWidth` is an integer: under 0.4px.
- **The hide matches at every phase on every fixture**, including a panel with a border and padding, on both axes.
- **One condition remains before J-COLLAPSE-SIZE is accepted.** The styles session runs the same file on Chromium 141. A row that reads differently there returns the seam to this ruling.
- **J-COLLAPSE-SIZE** (`opus` on Opus 5.5) adopts this after J-RELEASE-RECORD lands, because RECORD owns `Collapse.ts`. It pins the show and hide bases, the growth row, and the bordered-show row as `Collapse.test.ts` cases.

"""
t = t.replace(anchor, text + anchor, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
