Diffs:
```diff
- import { createRosterManager } from '@app/browser'
+ import { RosterManager } from '../../../../app/browser/controllers/RosterManager.js'

- let attached: ReturnType<typeof createRosterManager> | undefined
+ let attached: RosterManager | undefined

- attached = createRosterManager(client, () => undefined)
+ attached = new RosterManager(client, () => undefined)

- { waitUntil: 'networkidle' }
+ { waitUntil: 'load' }
```

The wait change was applied at all six sites.

`git status --porcelain`:
```text
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/integration.test.ts
 M tests/app/browser/integration/setup.ts
?? app/browser/controllers/RosterManager.ts
?? tests/app/browser/controllers/RosterManager.test.ts
?? tests/app/browser/integration/RosterManager.test.ts
```

Changed wait sites:

- [integration.test.ts:26](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:26) — initial same-origin navigation.
- [integration.test.ts:64](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:64) — post-session-rotation reload.
- [integration.test.ts:98](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:98) — retained-view reload.
- [integration.test.ts:139](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:139) — expiry-server navigation.
- [integration.test.ts:187](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:187) — CSRF-retry navigation.
- [RosterManager.test.ts:26](/workspace/supervisor/tests/app/browser/integration/RosterManager.test.ts:26) — roster-manager navigation.

No `networkidle` uses remain in integration tests or setup. No `@app/browser` value imports remain there; the sole remaining import is type-only.

Static gates passed: `format:check`, `lint:check`, and `check`.

Deviations: none.