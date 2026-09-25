# J-ORACLE-FIX-OFFCANVAS round 4 — the writer's report, a measured stop (opus on Opus 5.5, 2026-09-25)

I stopped after obligation 1 and edited no source. The measurement contradicts the mechanism in three of the six placements. A capture `focusin` listener on the panel's document does not fire when the hide moves focus between two elements inside one shadow root, open or closed. The brief says to stop and report in that case, so I did.

## Obligation 1: readings per placement

**Probe:** `bash tmp/probe/focusin-probe.sh`, with its log at `tmp/probe/focusin-probe.log.txt`.
- The script appends `tmp/probe/focusin.block.ts.txt` to `Offcanvas.test.ts`, runs it at `43fa73d`, and restores the file from a backup (`cmp` passed, "test restored").
- For each row, the case shows the panel with the trigger and moves focus to the element in the "Focus before" column. It then adds a capture `focusin` listener to `placement.host.ownerDocument`, runs `void offcanvas.hide()`, and removes the listener.
- "Focus after" is read from the scope that exposes the focused element: the document, the shadow root the test created, or the closed root reference the test kept.
- The case ends on a deliberate dump assertion so the runner prints the readings. That is why it exits 1: `Tests 1 failed | 66 skipped (67)`, `AssertionError: expected '[\n {\n  "name": "light", …' to be 'dump'`.

| Placement | Focus before → after | Focus moved | `focusin` on the document during the hide |
|---|---|---|---|
| Light tree | `inside` → `opener` | yes | **1** (`button#opener`) |
| One open shadow level | `inside` → `opener` | yes | **0** |
| Two open levels | `inside` → `opener` | yes | **0** |
| A closed root the panel carries | `held` → `return` | yes | **0** |
| A panel in a shadow root, light-tree trigger | root reads `panel` → document reads `opener` | yes | **1** (`button#opener`) |
| A panel in a shadow root, focus on a light-tree element outside it | `outer` → `opener` | yes | **1** (`button#opener`) |
| Guard: a prevented hide | `inside` → `inside` | no | 0 |
| Guard: a trigger that takes no focus | `inside` → `inside` | no | 0 |

## Deviation state: stopped

**Expected** (ruling § "observe the move, not the state"): any focus move, at any depth and in closed roots too, sends a composed `focusin` that reaches the panel's document.

**Found:** a move where both elements share one shadow root sends no `focusin` to the document. This holds for one open level, two open levels, and a closed root the panel carries.
- The light-tree row and both rows that cross a shadow boundary fired, so the listener works.
- Chromium 153 drops the event above the shadow root when the target and the element losing focus both retarget to the same host.
- The guard rows hold: no `focusin` fires when the hide moves no focus.

The closed root the panel carries was one of the two inputs this round was meant to fix. The mechanism misses it, and it also breaks the one-level and two-level shadow cases rounds 2 and 3 already fixed. Obligation 2 as written would reintroduce those two defects.

**Done:** obligation 1, with its probe, its script, and its log.

**Not done:** obligations 2 to 5 and every acceptance criterion. `Offcanvas.ts`, `helpers.ts`, the tests, and the guide are unchanged at `43fa73d`. `readFocusedElement` is still in the tree, and I did not remove it because the mechanism that would replace it failed.

**Hypothesis:** no single listener sees a move that stays inside one shadow root. A listener on the panel's root node plus one on the document would cover the one-level and two-level cases. A move inside a closed root the panel carries stays hidden from both events and state reads, unless the press listens on the trigger it holds a reference to. That is a design question for `planner` and `analyst`.

## The rest of the Output section
Nothing was implemented, so these items have nothing to report: `#press` is unchanged at `43fa73d`, and there are no new cases, corrected sentences, mutation table, or census run.

## Files touched
None in tracked files. These probe files are under the git-ignored `tmp/`:
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/probe/focusin-probe.sh`
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/probe/focusin.block.ts.txt`
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/probe/focusin-probe.log.txt`
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tmp/probe/Offcanvas.test.ts.backup-4`

## `git status --short`
The output is empty: the worktree is clean at `43fa73d`.
