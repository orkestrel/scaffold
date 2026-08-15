Implemented all four fix-round items from baseline `ed1aade`; `LoginPanel` files remain untouched.

### Requested diffs

[types.ts](/workspace/supervisor/app/browser/types.ts:922):

```diff
- * Durable point access to stored reload views.
+ * Durable reload-view storage with an associated workflow restore pointer.
  *
  * @remarks
- * The stored value carries its own id...
+ * Addressed views use point access...

- * Point access to the workflow resume pointer.
+ * The workflow restore pointer associated with this view store.
  *
- * The operator reports that refusal...
+ * Logout reports the refusal...
+ * A restore fallback already carries its own notice, so it silently suppresses the same breach.

-/** Durable point access to the workflow resume pointer. */
+/** Durable storage for the workflow restore pointer. */
```

New [MemoryOperatorPointer.ts](/workspace/supervisor/app/browser/stores/MemoryOperatorPointer.ts:1):

```ts
import type { OperatorPointerInterface } from '../types.js'

/** In-memory workflow restore pointer that never reaches a durable browser surface. */
export class MemoryOperatorPointer implements OperatorPointerInterface {
	#workflow: string | undefined

	async load(): Promise<string | undefined> {
		return this.#workflow
	}

	async save(workflow: string): Promise<void> {
		this.#workflow = workflow
	}

	async remove(): Promise<void> {
		this.#workflow = undefined
	}
}
```

New [StorageOperatorPointer.ts](/workspace/supervisor/app/browser/stores/StorageOperatorPointer.ts:1):

```ts
import type { OperatorPointerInterface } from '../types.js'
import { MAX_VIEW_LENGTH, POINTER_KEY } from '../constants.js'

/** Native local-storage persistence for the workflow restore pointer. */
export class StorageOperatorPointer implements OperatorPointerInterface {
	readonly #storage: Storage | undefined

	constructor(scope: Window = window) {
		try {
			this.#storage = scope.localStorage
		} catch {
			this.#storage = undefined
		}
	}

	async load(): Promise<string | undefined> {
		const storage = this.#storage
		if (storage === undefined) return undefined
		let workflow: string | null
		try {
			workflow = storage.getItem(POINTER_KEY)
		} catch {
			return undefined
		}
		if (workflow === null || workflow.length === 0 || workflow.length > MAX_VIEW_LENGTH) {
			return undefined
		}
		return workflow
	}

	async save(workflow: string): Promise<void> {
		const storage = this.#storage
		if (storage === undefined) throw new Error('Native local storage is unavailable')
		if (workflow.length === 0 || workflow.length > MAX_VIEW_LENGTH) {
			throw new RangeError('Workflow pointer is outside the storage bound')
		}
		storage.setItem(POINTER_KEY, workflow)
	}

	async remove(): Promise<void> {
		const storage = this.#storage
		if (storage === undefined) throw new Error('Native local storage is unavailable')
		storage.removeItem(POINTER_KEY)
	}
}
```

### Per-item proofs

1. Real sub-entities: [MemoryOperatorStore.ts](/workspace/supervisor/app/browser/stores/MemoryOperatorStore.ts:5) and [StorageOperatorStore.ts](/workspace/supervisor/app/browser/stores/StorageOperatorStore.ts:28) now expose private, interface-typed child objects. Their public methods are only `get/set/delete`; test stores use local pointer objects at [setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts:340).
2. Restore vocabulary: `#restore` and view-reading `#read` are separated at [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:351); the logout fault is now “Could not forget the last open run.” Constants, factory prose, and pointer TSDoc use “restore.”
3. Seam sentences: the view-store summary and logout-versus-restore removal behavior are corrected at [types.ts](/workspace/supervisor/app/browser/types.ts:922) and [StorageOperatorStore.ts](/workspace/supervisor/app/browser/stores/StorageOperatorStore.ts:7).
4. Independent rendered fact: `#rendered` is established after snapshot/view restoration and remains separate from `#armed` at [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:81). The healthy and tail-refused persistence arms are permanent at [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:790).

Round-1 probes remain unchanged except for the compiler-required logout error-copy assertion.

### Gates

- `npm run format:check` — passed
- `npm run lint:check` — passed
- `npm run check` — passed
- Browser probe runner — sandbox blocked before discovery with `listen EPERM 127.0.0.1:63315`; zero tests ran
- `npm run test:guides` — expected red: 4 failed, 300 passed:
  - `Supervisor > documents every source export`
  - `LiveViewerInterface > documents no phantom method`
  - `ClientInterface > documents no phantom method`
  - `Client > documents no phantom method`

The `StorageOperatorStore` and `MemoryOperatorStore` method-table failures are gone. The export inventory now additionally carries `MemoryOperatorPointer` and `StorageOperatorPointer`.

### Git status

```text
 M app/browser/constants.ts
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/index.ts
 M app/browser/stores/MemoryOperatorStore.ts
 M app/browser/stores/StorageOperatorStore.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/setupBrowser.ts
?? app/browser/stores/MemoryOperatorPointer.ts
?? app/browser/stores/StorageOperatorPointer.ts
```

Deviations: none.