# Gates on the removal (veneer `67a3143`, host queue, 2026-10-07)

Each gate ran through `run.ts` in its own folder (`runs/tw-<name>`); `gates.json` carries the exits and durations. The format gate failed once on one guide table the citation repair had misaligned; the realignment is `67a3143`, after which the whole tree formats. The journey exited 65 from the runner alone (its report file was not requested); the child passed, and the recorded rerun is `runs/tw-journey-2`.

| Gate | Exit | Seconds | Bare result |
| --- | --- | --- | --- |
| build | 0 | 24 | built |
| check | 0 | 82 | every project typechecks |
| format | 1 | 2 | format issues in guides/veneer.md |
| lint | 0 | 2 | clean |
| src-core | 0 | 3 | 14 passed (14) |
| src-browser | 0 | 197 | 812 passed (812) |
| src-bootstrap | 0 | 22 | 14 passed (14) |
| src-styles | 0 | 13 | 15 passed | 1 todo (16) |
| src-vue | 0 | 24 | 1 passed (1) |
| app | 0 | 114 | 235 passed (235) / 1 passed (1) |
| policy | 0 | 4 | 119 passed | 1 skipped (120) |
| config | 0 | 10 | 227 passed | 1 skipped (228) |
| setup | 0 | 6 | 139 passed (139) |
| setup-browser | 0 | 136 | 122 passed (122) |
| conformance | 0 | 17 | 86 passed (86) |
| integration | 0 | 20 | 41 passed (41) |
| guides | 0 | 3 | {"spans":119,"titles":1026,"resolved":119,"excluded":2,"todo":1} |
| distribution | 0 | 25 | 16 passed | 7 skipped (23) |
| journey | 65 | 504 | 85 passed (85) |
| journey-vue | 0 | 16 | 4 passed (4) |
