Acceptance criterion 1 confirmed. All checks pass.

## Output

**`types.ts` edit** — `/home/user/fleet/brief/src/core/types.ts:168-171`

Before:
```
 * The cost lands on one migration: `buildCitation` takes `(name, url, note)` where the earlier
 * `citation` function took `(name, role, url)` — strings in the same positions either way, so a
 * stale call still compiles and still passes the guard, and only renders wrong. Nothing is
 * published, so a version bump carries it.
```

After:
```
 * The cost lands on one migration: `buildCitation` takes `(name, url, note)` where the 0.0.6
 * release took `(name, role, url)` — strings in the same positions either way, so a stale call
 * still compiles and still passes the guard, and only renders wrong.
```

**Added § Breaking bullet** (in `/home/user/scaffold/tmp/units/conform/conform-brief-report.md`, before "No compatibility alias, re-export, or shim was left."):
```
- `INTERPRETATION_MEMBERS` no longer carries `'complete'`. Its element type is `keyof Interpretation`,
  and `@orkestrel/interpret` removed that member, so the published value and its union both lose it.
  No consumer inside the fleet closure; a registry consumer of `0.0.6` reading `'complete'` from the
  list drops that read.
```

**Added § Gates sentence** (after the gate table, before "`npm test` reported"):
```
The table's readings were taken at the pre-fix tip of 21:37:33 UTC (`brief-proofs/final-5-test.txt:16`)
and are superseded by the Orchestrator's deciding run at landing, which executes `format:check`,
`lint:check`, `check`, `build`, and `test` in order on the final tree.
```

**Corrected pointer** — `/home/user/scaffold/tmp/units/conform/conform-brief-report.md:145`: `tests/guides.test.ts:335` → `tests/guides.test.ts:342` (confirmed against tree: `describe('the guide fences, executed'` sits at `tests/guides.test.ts:342`). No other report line cited `:335` for that block.

**`git status --short`** (in `/home/user/fleet/brief`):
```
 M README.md
 M guides/brief.md
 M src/core/BriefCompiler.ts
 M src/core/BriefManager.ts
 M src/core/cloners.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/BriefCompiler.test.ts
 M tests/src/core/BriefManager.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tests/src/core/parsers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/validators.test.ts
```
22 paths, all pre-existing (unit's original 22).

**Gate exit codes:**
- `npm run format:check` — exit 0
- `npm run lint:check` — exit 0
- `npm run check` — exit 0
- `npm run test:guides` — exit 0 (20 tests passed)