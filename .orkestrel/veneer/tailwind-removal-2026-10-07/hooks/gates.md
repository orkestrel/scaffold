# Gates on the hook strip (the branch at `22aca73` plus the styles fixture, host queue, 2026-10-07)

Each gate ran through `run.ts` in its own folder (`runs/twd-land-<name>`); `gates.json` carries the exits and durations. The lane's own gates in its worktree are in `report.md`.

| Gate | Exit | Seconds | Bare result |
| --- | --- | --- | --- |
| build | 0 | 26 | built |
| check | 0 | 83 | every project typechecks |
| format | 0 | 2 | all matched files use the correct format |
| lint | 0 | 2 | clean |
| src-core | 0 | 3 | 14 passed (14) |
| src-browser | 0 | 192 | 812 passed (812) |
| src-bootstrap | 0 | 16 | 14 passed (14) |
| src-styles | 0 | 13 | 15 passed | 1 todo (16) |
| src-vue | 0 | 22 | 1 passed (1) |
| app | 0 | 109 | 235 passed (235) / 1 passed (1) |
| policy | 0 | 4 | 119 passed | 1 skipped (120) |
| config | 0 | 10 | 227 passed | 1 skipped (228) |
| setup | 0 | 7 | 139 passed (139) |
| setup-browser | 0 | 132 | 122 passed (122) |
| conformance | 0 | 16 | 83 passed (83) |
| integration | 0 | 16 | 41 passed (41) |
| guides | 0 | 4 | {"spans":119,"titles":1022,"resolved":119,"excluded":2,"todo":1} |
| distribution | 0 | 26 | 16 passed | 7 skipped (23) |
| journey | 0 | 519 | 85 passed of 85 |
| journey-vue | 0 | 17 | 4 passed (4) |
