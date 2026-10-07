# Copier 1 landing on veneer `main` at `eac281e` (2026-10-07)

`867f3b4` carries the module, the showcase consumer, the journey case, the guide, and the tests; `eac281e` carries the rebuilt page (two `build:showcase` runs hash-equal, sha256 `d1b0fe0099a40fda`). Fast-forward `7de4387..eac281e` on the branch and on `main`.

- `gates-867f3b4.txt`: the gates tool on the checkout, build first, each exit 0 on the quiet host (load 1 to 3 outside the journey's own four renderers): build 28.8 s, format, lint, check 88.3 s, app 246 of 246 (288.8 s), setup:browser 205 of 205 (324.4 s), policy, config, and setup 532 (2 skipped), integration 60, guides, the journey 98 of 98 (812.8 s). Every case that timed out under lane load in the worktree (the header contrast case, the header statechart row, the Tailwind canonicalization case, the engine matrix case) passes here.
- `chain-867f3b4.txt`: `src:browser` 801 of 801 under Chromium 141 and under 153 (the 13 copier cases over 788), conformance 130 of 130, the two showcase hashes, the compare.
- `compare-867f3b4.md` and `compare-867f3b4-classified.txt`: the journey compare against `landing-7de4387-3-journey` with `--registration 98/0` reads 207 differences, all inside the predicted set (56 preservation rows, 6 signature and partition rows with the partition's clauses 1 and 3 up by 2, the dark-390 row order, 72 lines and 72 journal copies); 0 outside.

The Orchestrator's one change to the lane's output before the commit: the plugin routes `click` on `button[command="--copy"][commandfor]` and resolves the host through `commandForElement`, in place of the lane's `command` route with `selector: '*'`, which created a copier on any host receiving any command (`deviations.md`; the module's 13 cases pass under 141 and 153 with the change).
