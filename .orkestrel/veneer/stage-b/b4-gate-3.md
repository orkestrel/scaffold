stage-b-b4 finished after 3003 s: exit=0 signal=none capped=false duration_ms=2951799
**Gate verdict: pass.** Implementation retained, probe deleted, no commits. Guide parity has one unresolved failure outside the permitted guide edits.

Readings are **late / completed height**, in pixels, at device-pixel ratio 1:

| Chromium | Content | Engine on | Engine off | Bootstrap |
|---|---|---:|---:|---:|
| 141.0.7390.37 | 120 → 240 | 195.96875 / 240 | 97.984375 / 240 | 97.984375 / 240 |
| 141.0.7390.37 | Unchanged | 97.984375 / 120 | 98 / 120 | 97.984375 / 120 |
| 153.0.8010.12 | 120 → 240 | 192 / 240 | 95.984375 / 240 | 98 / 240 |
| 153.0.8010.12 | Unchanged | 96 / 120 | 95.984375 / 120 | 97.96875 / 120 |

The [full diff](/home/user/.wave/veneer-b4/tmp/codex/stage-b-b4.diff) and [evidence report](/home/user/.wave/veneer-b4/tmp/codex/stage-b-b4-report.md) contain every command, fresh queue folder, exit, unfiltered result, and deviation—including repaired attempts.

Final gate results follow. Queue folders share `/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-`.

| Gate | Folder suffix | Exit | Result |
|---|---|---:|---|
| Chromium 141 probe | `gate141-a` | 0 | All readings produced; pass |
| Chromium 153 probe | `gate153-a` | 0 | All readings produced; pass |
| Browser typecheck | `types-browser-b` | 0 | No diagnostics |
| Root typecheck | `types-root-c` | 0 | No diagnostics |
| Collapse tests | `collapse-d` | 0 | 37 passed |
| Plugin tests | `plugins-b` | 0 | 7 passed |
| Helper tests | `helpers-a` | 0 | 41 passed |
| Full browser project | `browser-b` | 1 | 793 passed; exactly 6 permitted host-bound failures |
| Policy | `policy-a` | 0 | 119 passed, 1 skipped |
| Guide parity | Direct | 1 | 19 passed, 1 failed |
| Format, lint, diff check | Direct | 0 | Clean |

Deviations recorded in the report:

- Guide parity requires a `CollapsePluginOptions` Surface row. That row is outside the brief’s ownership, so it remains unapplied; the exact repair is supplied.
- Initial optional-property type errors were repaired with explicit false defaults.
- Conditional assertions and a formatting issue were repaired.
- Completion samples exposed fractional-frame rounding. Tests now use the required clearing-frame wait and device-pixel tolerance.
- The permitted Chromium 141 host-bound failures remain unchanged.

Final `git status --porcelain` contains only owned files:

```text
 M guides/veneer.md
 M src/browser/Collapse.ts
 M src/browser/plugins.ts
 M src/browser/types.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/plugins.test.ts
```

[exited with code 0]
