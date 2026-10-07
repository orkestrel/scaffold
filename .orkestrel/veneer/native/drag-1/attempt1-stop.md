Blocked on an unowned test assertion. The implementation is **incomplete and unverified**, left uncommitted.

The [full draft diff](/home/user/.wave/veneer-drag/tmp/units/drag.patch) contains the Drag module, browser export and pin, module tests, Native specimen, journey case, guide, and roadmap changes. Every other root `src/browser` file remains unchanged.

The route shape is `[data-vn-drag] > *` for `pointerdown`, `dragstart`, `dragenter`, `dragover`, `dragleave`, `drop`, `dragend`, and `keydown`, resolving the parent as host. Boot selects `[data-vn-drag]`; document clearing handles drop, dragend, and Escape.

All requested browser readings remain **unread under both Chromium 141 and 153**: real drag, keyboard movement, prevention, handle/control refusals, nested-child crossing, outside drop, live text, `moveBefore` focus/value preservation, listener absence, and Escape delivery. No departure is claimed.

Gate folders below resolve beneath `/home/user/veneer/tmp/units/journey-cost/runs/`. Queued commands used the prescribed wrapper.

| Command | Folder | Exit | Bare result |
|---|---|---:|---|
| `npm run check:src:browser` | `drag-types` | 0 | Scoped typecheck passed before subsequent edits |
| `npm run test:src:browser -- tests/src/browser/drags` | `drag-module-141` | 143 | Canceled while waiting for lock; no tests ran |
| `npm run check` | `drag-check-initial` | 143 | Canceled while waiting for lock |
| `npm run lint:check` | `drag-lint-initial` | 143 | Canceled while waiting for lock |
| `npm run test:app:browser` | `drag-app-browser` | 143 | Canceled while waiting for lock |
| `npm run build` | — | — | Not run |
| `npm run format:check` | — | — | Not run |
| Full `src:browser`, 141 and 153 | — | — | Not run |
| `npm run test:setup:browser` | — | — | Not run |
| `npm run test:integration` | — | — | Not run |
| `npm run test:guides` | — | — | Not run |
| `npm run test:policy` | — | — | Not run |
| `npm run test:config` | — | — | Not run |
| `npm run test:setup` | — | — | Not run |
| `npm run test:conformance` | — | — | Not run |
| Full journey and prescribed compare | — | — | Not run; differences unclassified |
| `npm run build:showcase`, twice | — | — | Not run; hashes unread |
| `git diff --check` | workspace | 0 | No findings |
| `git diff --stat -- src/browser/*.ts` | workspace | 0 | Only `index.ts`: one insertion |

Scoped formatting completed successfully. All canceled processes are gone.

`git status --porcelain`:

```text
 M ROADMAP.md
 M app/browser/constants.ts
 M app/browser/main.ts
 M guides/veneer.md
 M src/browser/index.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/integration.test.ts
 M tests/src/browser/index.test.ts
?? app/browser/sections/sortable-list.html
?? src/browser/drags/
?? tests/src/browser/drags/
```

The blocking deviation:

- **Expected:** Native specimens require no Bootstrap registry ownership.
- **Found:** [sections/integration.test.ts:117](/home/user/.wave/veneer-drag/tests/app/browser/sections/integration.test.ts:117) asserts `expect(required.length > 0).toBe(section.group !== LIVE_GROUP)`, exempting only Interactions.
- **Evidence:** Native has no ownership rows, making that assertion compare `false` with `true`. This is a source finding; the gate has not run.
- **Done:** Draft preserved. Unowned file untouched.
- **Hypothesis:** The assertion predates the Native group.

May I extend ownership to that file solely to exempt Native alongside Interactions?

The [scaffold orchestration contract](/home/user/.wave/veneer-drag/node_modules/@orkestrel/scaffold/dist/host/agents/orchestration.md) requires this stop: “A unit stops when a conflict blocks its objective or requires an unowned change.”