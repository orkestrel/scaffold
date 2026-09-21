# Unit U7f-harness — brief 4: the toggle snapshot at the pressed moment

## What changed and why

This brief supersedes `u7f-harness-brief-3.md`; briefs 1 to 3 stand, and
`u7f-harness-report-3.md` is the baseline. Round 2 of the verdict's mechanical lane
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/lane-u7f-2-checker.md`, item
10) found that the `# Toggle` ARIA snapshot appended to each variant's `.txt` is taken after the
restoring click, so it announces the host at rest (`Off — click to turn on`) while the pressed
moment survives only as the three text fields in the step log. Veneer's counterpart is a full
tree at the pressed moment.

1. Take the toggle section's `ariaSnapshot()` while `aria-pressed` reads `"true"` (between the
   first click and the restoring click, beside the recorded state triple) and append it to the
   variant's `.txt` under the `# Toggle` line; keep the rest snapshot too, under a
   `# Toggle (rest)` line after it, so a lane can read both.
2. (the objective lane, item 4: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/lane-u7f-2-analyst.md`)
   The padded focus-ring frame is shot while the ring's `box-shadow` is still transitioning in:
   the step log records alpha `0.333519` at `2.22346px` where Elements declares its ring at
   45% and `0.1875rem`. Before the focus-ring shot, wait until `getComputedStyle(specimen).boxShadow`
   stops changing across two consecutive animation frames (the same settle the pointer shots
   use, on `boxShadow` instead of `backgroundColor`), then shoot and record the settled
   `box-shadow` in the step log.

## Role, engine, law, context, scope, deviation contract

As in briefs 1 to 3, verbatim. Copy `u7f-harness-3.mjs` to `u7f-harness-4.mjs`
and edit the copy. The output directory is emptied on each run as before.

## Execution

1. Make the two changes in the copy; keep every existing frame and artifact name.
2. Run `node u7f-harness-4.mjs` once from the scaffold root; list the output
   directory; print the `# Toggle` block of `light-1280.txt` and the settled `box-shadow` per
   variant.

## Output

Write `u7f-harness-report-4.md` and return it: the two changes as landed, the run's
console output, the listing with byte sizes, the `# Toggle` block per variant, the settled
`box-shadow` per variant beside round 3's transitional reading, and the scaffold checkout's
`git status --porcelain`.

## Acceptance criteria

1. The script runs to completion from one `node` call and leaves no process or listener.
2. Every round-3 frame and artifact is present under its name; each `.txt` carries a `# Toggle`
   block announcing the host pressed and a `# Toggle (rest)` block announcing it at rest; each
   step log records the settled `box-shadow` at the focus-ring shot.
