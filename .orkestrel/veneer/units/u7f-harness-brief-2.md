# Unit U7f-harness — brief 2: the round-1 harness gaps

## What changed and why

This brief supersedes `u7f-harness-brief.md`; that brief stands and
`u7f-harness-report.md` is the baseline. Round 1 of the portfolio verdict returned
three harness gaps on the Elements side, triaged per `capture-harness.md` § Triage missing
evidence to the harness first:

1. The focus frames show no ring on the primary specimen although the step log records the
   51-press walk reaching it (`elements-button-primary-focus--*.png`). Elements paints its ring
   as a `box-shadow` of the primary fill at 45% (`elements/src/styles/surfaces/_focus.scss:48,73`),
   which a page frame at 1280 renders faint. Add, beside the page frame, an element frame of the
   primary specimen padded by 12 px on every side (`clip` around its bounding box) taken while
   focus is held, named `elements-button-primary-focus-ring--<variant>.png`, and record in the
   step log the computed `box-shadow` of the specimen at that moment (empty or `none` is a
   reading, not a stop).
2. `elements-button-primary-rest--dark-1280.png` is a mid-transition capture (light chrome under
   a dark veil) while the 390 twin is fully dark. After setting `data-mode`, wait until
   `getComputedStyle(document.body).backgroundColor` stops changing across two consecutive
   animation frames and `document.getAnimations().length` is 0, then shoot; record the settled
   value in the step log.
3. No frame or snapshot carries Elements' disabled, loading, or `.active` specimens. Capture the
   States section (`ButtonPage.vue:299-313`: `:hover`/`:focus-visible` prose, `.active` with
   `aria-pressed="true"`, `[disabled]`, `.loading`) as an element frame of that section named
   `elements-button-states--<variant>.png`, and append that section's ARIA snapshot to the
   variant's `.txt` under a `# States` line, so a lane can compare Veneer's `Selected`,
   `Blocked`, and `Disabled` against Elements' static states.

## Role, engine, law, context, scope, deviation contract

As in brief 1, verbatim. Copy `u7f-harness.mjs` to `u7f-harness-2.mjs` and
edit the copy; the round-1 script stays as the record of what ran. The output directory is the
same, emptied on each run as before, so the round-2 portfolio replaces round 1's whole.

## Execution

1. Make the three changes in the copy. Keep every round-1 frame and artifact name unchanged so
   the verdict brief's references still resolve.
2. Run `node u7f-harness-2.mjs` once from the scaffold root; list the output
   directory; open the new focus-ring frame and the States frame at `light-1280` yourself and
   say what each shows.

## Output

Write `u7f-harness-report-2.md` and return it: the three changes as landed, the run's
console output, the listing with byte sizes, the two frames you opened, the settled dark
background value, the focus `box-shadow` reading per variant, and the scaffold checkout's
`git status --porcelain`.

## Acceptance criteria

1. The script runs to completion from one `node` call and leaves no process or listener.
2. Every round-1 frame is present under its round-1 name, plus the eight new frames (focus-ring
   and states at four variants), and every `.txt` carries the States snapshot.
3. The dark rest frames at both widths show the settled dark theme (the recorded background
   value equals across the two widths).
