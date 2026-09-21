# Unit U7f-harness — brief 3: the settle before the pointer shots, and the pressed host's state

## What changed and why

This brief supersedes `u7f-harness-brief-2.md`; briefs 1 and 2 stand, and
`u7f-harness-report-2.md` is the baseline. Round 1 of the verdict's objective lane
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/lane-u7f-analyst.md`) found
two more harness gaps:

1. (item 6) The hover and active element frames differ from the logged settled endpoints: the
   shots are taken inside Elements' transition. Before each pointer shot, wait until
   `getComputedStyle(specimen).backgroundColor` stops changing across two consecutive animation
   frames, then shoot; record the settled value in the step log beside the frame. Drop the
   `document.getAnimations().length` condition from the theme settle too: round 2 found it never
   clears because the States section's `.loading` spinner animates continuously, so the two
   stable consecutive frames of the body background are the settle condition on their own, and
   the loop's attempt cap stays as the bound.
2. (item 5) The pressed frame shows the toggle host announcing `On` while keeping its base
   fill, and no artifact records the host's state at the pressed moment. At that moment record
   in the step log the host's `aria-pressed`, its class list, and its computed
   `background-color`, and append the toggle section's ARIA snapshot to the variant's `.txt`
   under a `# Toggle` line.

## Role, engine, law, context, scope, deviation contract

As in briefs 1 and 2, verbatim. Copy `u7f-harness-2.mjs` to `u7f-harness-3.mjs`
and edit the copy. The output directory is emptied on each run as before.

## Execution

1. Make the two changes in the copy; keep every existing frame and artifact name.
2. Run `node u7f-harness-3.mjs` once from the scaffold root; list the output
   directory; open the hover frame and the pressed frame at `light-1280` yourself and say what
   each shows.

## Output

Write `u7f-harness-report-3.md` and return it: the two changes as landed, the run's
console output, the listing with byte sizes, the settled hover and active values per variant,
the pressed host's recorded state per variant, the two frames you opened, and the scaffold
checkout's `git status --porcelain`.

## Acceptance criteria

1. The script runs to completion from one `node` call and leaves no process or listener.
2. Every round-2 frame and artifact is present under its name; the step logs carry the settled
   pointer values and the pressed host's state; each `.txt` carries the Toggle snapshot.
