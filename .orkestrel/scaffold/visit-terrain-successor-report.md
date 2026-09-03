# Unit V-terrain-2 report — re-pin terrain to scaffold 0.0.60 and test 0.0.12

## npm ls

```
terrain@ C:\Users\mikes\WebstormProjects\terrain
+-- @orkestrel/scaffold@0.0.60
`-- @orkestrel/test@0.0.12
```

## repair summary

```
0 of 25 planned paths drifted from the plan. Audit compared bytes at 11, existence at 3, and nothing at 11.
0 written, 26 unchanged, 0 removed in ..
```

`repair` wrote no files (0 written, 26 unchanged). Ran with
`--groups manifest,source,tests,guides,docs,orchestration`, never `configs`.

## audit exit and lines

Exit: 1

```
dependencies: typescript declares major 6, while the registry serves major 7.
┌────────────────┬─────────┬───────┐
│ path           │ group   │ drift │
├────────────────┼─────────┼───────┤
│ vite.config.ts │ configs │ stale │
└────────────────┴─────────┴───────┘
1 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 4, and nothing at 11.
```

Both lines are owned outside this unit's scope:
- `typescript` declared-major note: a declared dependency observation, not a repaired file; not a
  configs-group drift and not remediable without a `typescript` major bump, which is out of scope.
- `vite.config.ts` stale drift under the `configs` group: owned by scaffold, per the brief — the
  canonical node-only template would revert terrain's browser-enabled `setup` project, so `configs`
  was excluded from the `repair` groups deliberately.

## gate results

| Gate | Exit | Summary |
| --- | --- | --- |
| `npm run format` (mutating, run once) | 0 | Finished in 1907ms on 219 files. |
| `npm run format:check` | 0 | All matched files use the correct format. Finished in 1744ms on 219 files. |
| `npm run lint:check` | 0 | No output; no violations. |
| `npm run check` | 0 | `tsc --noEmit` root, `check:app:core`, `check:app:browser` (`vue-tsc`) all clean. |
| `npm run build` | 0 | `vite build` succeeded; 219 modules transformed; chunk-size advisory only (informational, not an error). |
| `npm test` | 0 | `test:app` 974 passed, 1 skipped (975); `test:policy` 111 passed; `test:config` 46 passed; `test:setup` 43 passed. All test files passed. |

## integration variant runs (`tests/app/browser/integration.test.ts`, project `app:browser`)

| Variant | Capture | Exit | Summary |
| --- | --- | --- | --- |
| `light-1280` | no | 0 | 13 passed, 1 skipped (14). |
| `dark-390` | no | 0 | 13 passed, 1 skipped (14). |
| `light-390` | no | 0 | 13 passed, 1 skipped (14). |
| `dark-1280` | no | 0 | 13 passed, 1 skipped (14). |
| `light-1280` | yes | 0 | 14 passed (14). |
| `dark-390` | yes | 0 | 14 passed (14). |

## git diff --stat

```
 package-lock.json | 38 ++++++++++++++++++++++++++------------
 package.json      |  4 ++--
 2 files changed, 28 insertions(+), 14 deletions(-)
```

## git status --porcelain

```
MM package-lock.json
 M package.json
```

`package-lock.json` carries the user's preexisting staged change (index `M`, confirmed unchanged
by `git diff --cached --stat` before and after this unit's work: 901 insertions, 528 deletions,
matching the pre-existing staged diff) plus this unit's unstaged `npm install` rewrite (working-tree
`M`) that layers the version bump on top. Neither the staged content nor the index was touched,
staged, restored, or rewritten by this unit. `package.json` carries this unit's two-line pin bump.

## Acceptance criteria

1. Met: `npm ls` reads `@orkestrel/test@0.0.12` and `@orkestrel/scaffold@0.0.60`. `npx scaffold
   audit` exits 1, and both reported lines are owned as described above (declared-dependency note;
   `configs`-group `vite.config.ts` drift excluded from `repair` by brief instruction).
2. Met: every gate and every run is green (exit 0), as tabulated above. No red results occurred.

No deviation occurred.
