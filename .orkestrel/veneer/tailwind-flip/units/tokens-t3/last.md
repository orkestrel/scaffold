Stopped under the brief’s explicit P4 deviation rule. The [report](tmp/units/tokens-t3/report.md) records the findings and every unrun acceptance command.

- **Expected:** unchanged header neutrality.
- **Found:** P4 exited 1 at 1280 px with **210 departures, including 12 box changes**, under “Tailwind + layer.” The other faces reported none.
- **Evidence:** header text changed `rgb(33, 37, 41)` → `rgb(3, 7, 18)`; bottom border changed `rgb(222, 226, 230)` → `rgb(209, 213, 220)`. See the [complete P4 record](tmp/units/tokens-t3/p4.json).
- **Done:** fresh app build passed; prerequisite P4 ran. Implementation, showcase rebuild, and ordered acceptance remain unperformed.
- **Hypothesis:** mapped header tokens conflict with the existing literal neutrality requirement.

`git status --porcelain` is empty. No tracked files changed; nothing committed.