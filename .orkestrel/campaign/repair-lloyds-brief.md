# Unit R-lloyds — repair what the matrix and journey readings measured on lloyds' surface

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment directly and spawn nothing.

## Objective

Close the three surface readings the journey suite measured, each in `app/**`, so the suite's
own instruments read them green: the document's height converges at every viewport, the focus
ring clears the 3:1 bar, and a confirmed removal lands focus on the primary command.

## Context

Reports: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\journey-lloyds-report.md`
(§ Readings per variant, § Deviation, § Claims not closed) and `chrome-lloyds-report.md`. Skills:
`enterprise-bootstrap/SKILL.md` (focus chrome, the ladder, keyboard) and
`references/inspection.md` § When an authored rule is already earned;
`orkestrel-prove-journey/references/styles.md` (the ring reading and its bar) and `captures.md`.
The suite that measures each item is committed at the journey commit; read
`tests/app/browser/integration.test.ts` for the exact assertions and the capture proof, and run
them as the proof of each repair. Standing conditions: `git status --porcelain` shows the user's
lockfile pair; never stage, restore, or rewrite it. Commit nothing; no `npm install`.

## Work

1. **The document's height.** At 390 the desk (`min-vh-100`) under the stacked top bar measures
   pane + 42 px at every pane (844 → 886, 1200 → 1242), so the page always scrolls by the bar's
   height on a phone and no pane covers it. Make the shell fill the viewport once and the desk
   fill the remaining height (a viewport-tall flex column with the desk growing, or a
   `min-height` that subtracts the bar through the layout rather than a magic number), so the
   content edge equals the pane at 390 and 1280 with an empty and a populated schedule. Prove
   with `measureContent` at both widths and with the two 390 capture runs, which currently refuse
   with `never settled after 4 restagings`.
2. **The focus ring.** `readRing` reads 1.307 to 2.751 against the 3:1 bar on the primary
   command and the armed Delete in every variant. Write the token rule that earns it under
   `inspection.md` § When an authored rule is already earned — cite the instrument, the bar, and
   the value read, in the rule's comment and in the guide — and re-read every variant; the suite
   asserts the bar once you raise it from "as measured" to `>= 3`.
3. **Focus after a confirmed removal.** Send focus to the primary command (`Add building`) when
   the confirmation's destructive answer empties or shortens the schedule, so the journey's
   "focus lands somewhere sensible" reads the command rather than the body; the suite's proof
   moves from "forward Tab reaches it again" to `readFocus` on the command.
4. Record, do not change: a settings-storage read failure is silent by the shell's own policy
   (the schedule store's failure is visible and retried); the import's only doors are the
   platform file picker and a document-level drop.
5. Run the four variants, the four capture runs, `npm run test:app:browser`, and the scoped
   gates (`format:check`, `lint:check`, `check`, `build`).

## Scope

**Owned.** `app/**`, `guides/README.md` for the ring rule and the focus rule, and the three
assertions in `tests/app/browser/integration.test.ts` that move from "as measured" to their bars
(the ring bar, the focus reader, and the 390 capture expectation), recorded. **Off-limits.**
Everything else under `tests/**`, `package.json`, `configs/**`, `vite.config.ts`, the lockfile
pair, vendored files.

## Output

Write `tmp/units/repair-lloyds-report.md` and return it: each repair with its reading before and
after per variant; the rule's citation; the run summaries including both 390 capture runs;
`git diff --stat`; `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when the height cannot converge without a product layout change beyond the
desk and the bar, when the ring cannot clear 3:1 on the shipped tokens without a colour
literal, or when a run is red outside the three items.

## Acceptance criteria

1. Both 390 capture runs green with every frame on the surface's own floor; `measureContent`
   equals the pane at 390 and 1280.
2. `readRing` reads at least 3 on the primary command and the armed Delete in every variant.
3. `readFocus` after a confirmed removal names the primary command; every run and scoped gate
   green.
