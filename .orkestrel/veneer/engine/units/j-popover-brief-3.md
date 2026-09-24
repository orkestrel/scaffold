# Unit J-POPOVER, round 3 — delete the build's unobservable release path

Successor to `j-popover-brief-2.md`. What changed and why: round 2 (`j-popover-report-2.md`) showed that the door-stop half of `#build`'s single release site can never be observed. Inside a build, only destruction fails the door, and `destroy()` returns every recorded element before the build reads it. The evidence is the probe's HELD rows, the instrument's two HELD controls, and the first-run MISSED row. The Orchestrator's ruling: delete the path. Code that no mutation can observe is code no proof binds, and the greenfield law keeps no dead path.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed, in the same worktree. Perform the assignment directly and spawn nothing.

## Obligation

- In `#build`, replace the completion-flag `finally` release with a `catch` that returns every element the build moved into the unfinished tip and rethrows the error unchanged. Remove the `filled` flag. Add one comment where the stop paths return, stating why they release nothing: destruction, the only takeover inside a build, returns the elements itself.
- Update the instrument. The two door-stop control rows go, because the path they controlled no longer exists. The throw rows ("the build releases nothing it moved into an unfinished tip", "a throwing step stops the build without releasing") re-anchor to the `catch` and must still redden their named case. "Destruction releases nothing" must still redden the round-2 case.
- Run `Tooltip.test.ts`, then `Popover`, `Placement`, and `Dropdown`, then the whole instrument once, then the acceptance chain once. Never run the instrument and the chain side by side.

## Output

The `#build` diff for this round, the changed instrument rows copied from the log, the acceptance output, `git status --short`, and the deviation state.
