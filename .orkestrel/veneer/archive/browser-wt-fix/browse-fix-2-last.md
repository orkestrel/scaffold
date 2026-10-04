Completed O1 and O2 in commit `e9a8b4aaeba88b45498ee0821e905c148b7d384e` on `browse-fix`.

**O1 — Executed assertions added.** `tests/service/document.test.ts` proves that a closed native summary produces `DisclosureTriangle "Delivery details" expanded=false` in CDP and no DOM element row. It also proves that a lone treeitem becomes `generic` without pressed, expanded, or selected states in CDP, while DOM retains `treeitem "Lone treeitem" expanded=true selected=false`. The guide remains accurate on Edge `154.0.4258.53`.

Command: `npx vitest run --config vite.config.ts --project service tests/service/document.test.ts`.

Mutations: add `open` to the details fixture and wrap the lone treeitem in `role=tree`. With both mutations, exactly the named cases fail: **2 failed, 9 passed**, exit 1. Restoring the fixtures yields **11 passed**, exit 0.

**O2 — Reproduced and repaired.** Command: `node tmp/probes/browse-fix-2-race.ts`. On Windows `10.0.26300`, Node `v24.21.0`, the bounded run performed **20,000 races** in **8.18 seconds**, alternating which call path started first. Each race competed a real writer `rmdir` against an observer's `lstat` followed by `rmdir`.

Every observed outcome is counted below; no other error code occurred.

| Operation | Success | ENOENT | EPERM |
| --- | ---: | ---: | ---: |
| Writer rmdir | 19,995 | 0 | 5 |
| Observer lstat | 19,972 | 28 | 0 |
| Observer rmdir | 491 | 19,228 | 281 |

Controls: without competition, `lstat` and `rmdir` both succeeded; against a known absent directory, both returned `ENOENT`. Every race had a successful removal; **19,514** races also produced a competing removal error, and **486** returned success from both removers. Results are recorded in `tmp/probes/browse-fix-2-race.json`.

`FileBrowserStore` handles the observed `rmdir` `EPERM` through its existing directory-or-absence recheck. A replacement file still fails. No additional `lstat` error handling was added because the probe observed no `lstat` `EPERM`.

Regression command: `npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserStore.test.ts`. Before the fix: **1 failed, 20 passed, 1 skipped**, exit 1; **314 of 512** committed results were replaced by `BROWSER_JOURNEY_ACCESS`. After the fix: **21 passed, 1 skipped**, exit 0, with every raced result preserved.

The final gates ran after the last source/test edit, in the required order, with outputs and exit codes read directly.

| Gate | Exit | Result |
| --- | ---: | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:server` | 0 | 253 passed, 9 skipped |
| `npm run test:guides` | 0 | 248 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 0 | 108 passed |
| `git diff --check` | 0 | Passed |

**Deviations:** No assignment deviation. A supplemental command, `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js --projects src:server,service --json`, exited 1 because the installed script also examined other projects and treated their Chromium instance names as ungated and their base names as empty. It discovered both touched test files; the requested gates passed independently. No scaffold-owned file was changed.

One commit was made. Nothing was pushed, published, or installed. Final `git status --porcelain`: empty.