# Park-2 readings — withdrawn (2026-09-24, Chromium 141, `journey:light-390`)

The Orchestrator's park-2 probes reported that, after the round-5 park at (-1, -1), staging the pane of Veneer's
scaled tester delivered a trusted `mouseover` at the tester's origin whatever the park point. That finding is
withdrawn. The scratch worktree `veneer-rpctl3` ran its first journey with the registry's 0.0.23 installed, so Vite's
dependency optimizer wrote a pre-bundle of `@orkestrel/test` from 0.0.23 under
`node_modules/.vite/vitest/18a03942e0aa185b558c22c609cf04e379f1e956/deps/`. The round-5 tarball extracted afterwards
carries the same version string, 0.0.23, so the optimizer never rebuilt it, and every later run there executed the
0.0.23 park at (0, 0), whatever `dist/` held. `park2-prebundle.log.txt` reads each worktree's active pre-bundle.

## What each reading measured

| Reading | Worktree and active pre-bundle | What it measured |
| --- | --- | --- |
| Control 1 (`../rp-instruments/rp-control.log.txt`) | fresh, registry 0.0.23 | 0.0.23: the RP case with `CAPTURE=1` reddens in both journeys. Valid. |
| Control 2, registry run (`../rp-instruments/rp-control-2.log.txt`) | fresh, registry 0.0.23 | 0.0.23 with no placement: no entry. Valid. |
| Control 2, round-5 run | same worktree after the tarball swap | 0.0.23 again (stale pre-bundle). Relabelled; it says nothing about round 5. |
| Control 3, probes A, D, F, H, I, X, DC, the park sweep, and the RP-case re-runs (`rpctl3-*`, `rp-control-3-*`) | `veneer-rpctl3`, 0.0.23 pre-bundle | 0.0.23 in every run. Under 0.0.23, staging the pane after the release puts the tester's origin under the pointer parked at (0, 0), and the RP case reddens with and without `CAPTURE`. The park sweep's rewrites of `dist/` never ran. |
| Probe D, three runs (`park2-repeat-*-vp3.log.txt`, `vp3-probe-d.log.txt`) | `vp3`, round-5 pre-bundle | Round 5: staging the pane after the park takes no `mouseover`, three runs of three. |
| RP-case re-runs (`rp-rerun-c1.log.txt`, `rp-rerun-c0.log.txt`) | `veneer-rp`, round-5 pre-bundle | Round 5: the RP case passes with and without `CAPTURE`. |
| Consumer probe (`../t5-instruments-5/t5-veneer-probe-5.log.txt`) | `veneer-t5probe-5`, round-5 pre-bundle | Round 5: both journeys, 62 passed each. Valid. |

## Consequences

- P1 and the round-6 F1 wording stand. The round-6 unit was told to skip F1 and then told to reinstate it.
- The RP case distinguishes the parks in the gate's configuration (`CAPTURE` unset): it reddens on 0.0.23 and passes on
  round 5, because the frame manager stages the pane before the portfolio decides whether to shoot.
- Rule for every tarball swap: install a tarball into a worktree whose Vite dependency cache has not yet been built, or
  delete `node_modules/.vite` after the swap. A tarball carrying the version string of the copy it replaces does not
  invalidate the pre-bundle. The rule's home is `.agents/orchestration.md` § Fixing a dependency before it publishes,
  and P1 SCAFFOLD-PROPAGATE carries it.
