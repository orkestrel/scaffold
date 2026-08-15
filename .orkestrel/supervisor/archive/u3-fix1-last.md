Implemented all six fix items and preserved every required probe. U6’s `LoginPanel` files were untouched.

### Contract diffs

[types.ts](/workspace/supervisor/app/browser/types.ts:813):

```diff
- consume(): RestoreNotice | undefined
+ readonly notice: RestoreNotice | undefined
```

```diff
 export interface OperatorStoreInterface {
   get(id: string): Promise<View | undefined>
   set(view: View): Promise<void>
   delete(id: string): Promise<void>
+  readonly pointer: OperatorPointerInterface
+}
+
+export interface OperatorPointerInterface {
+  load(): Promise<string | undefined>
+  save(workflow: string): Promise<void>
+  remove(): Promise<void>
 }
```

[Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:63):

```diff
+ readonly #notice = shallowRef<RestoreNotice | undefined>(undefined)
+ #suppressed = false

- consume(): RestoreNotice | undefined
+ get notice(): RestoreNotice | undefined
```

```diff
- this.#armed = generation
  const tailed = await this.#client.tail(workflow)
  ...
+ this.#task = this.#subscribe(...)
+ this.#armed = generation
+ this.#notice.value = undefined
```

```diff
- this.#store.load?.()
- this.#store.save?.(workflow)
- this.#store.remove?.()
+ this.#store.pointer.load()
+ this.#store.pointer.save(workflow)
+ this.#store.pointer.remove()
```

```diff
- async #restoreOpen()
+ async #resume()
```

`#resume` now clears stale notices, recognizes only fully established opens, retains transport-class pointers, clears `ABSENT`/`FORBIDDEN` pointers, and leaves refused restores with both `fault` and `notice`.

### Item proofs

1. Reactive, repeat-safe notice: [types.ts](/workspace/supervisor/app/browser/types.ts:815), [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:148), stale-notice watcher test [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:330).
2. Complete-open predicate and refused-tail fallback: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:247), false-success regression [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:396).
3. Pointer cleared only for `ABSENT`/`FORBIDDEN`: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:347), four-code table [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:357), real-browser transport-loss recovery [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts:167).
4. Observable logout removal failure and page-local suppression: [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:193), suppression boundary [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:317), storage-breach documentation [StorageOperatorStore.ts](/workspace/supervisor/app/browser/stores/StorageOperatorStore.ts:21), refusing-`removeItem` attack [Operator.test.ts](/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts:432).
5. Required pointer seam implemented by all four stores: production stores plus [setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts:340). Dedicated `POINTER_KEY` replaces the bare view namespace for the pointer.
6. `#restoreOpen` renamed `#resume`, with the completed-open predicate documented at [Operator.ts](/workspace/supervisor/app/browser/controllers/Operator.ts:347).

Seam name: `pointer: OperatorPointerInterface` — the noun groups the independent required `load/save/remove` triad while leaving the view store’s primary `get/set/delete` shape intact.

### Gates

- `npm run format:check` — passed
- `npm run lint:check` — passed
- `npm run check` — passed
- `npm run test:app:browser` — sandbox blocked before discovery: `listen EPERM 127.0.0.1`; zero tests ran
- `npm run test:guides` — expected red, 6 failed / 298 passed:
  - `Supervisor > documents every source export`
  - `LiveViewerInterface > documents no phantom method`
  - `ClientInterface > documents no phantom method`
  - `Client > documents no phantom method`
  - `StorageOperatorStore > documents every interface method`
  - `MemoryOperatorStore > documents every interface method`

The new parity rows are `OperatorPointerInterface`, `POINTER_KEY`, and `load/remove/save` for both stores. No `consume` parity row remains.

### Git status

```text
 M app/browser/constants.ts
 M app/browser/controllers/Operator.ts
 M app/browser/factories.ts
 M app/browser/stores/MemoryOperatorStore.ts
 M app/browser/stores/StorageOperatorStore.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/integration.test.ts
 M tests/app/browser/stores/MemoryOperatorStore.test.ts
 M tests/app/browser/stores/StorageOperatorStore.test.ts
 M tests/setupBrowser.ts
```

Deviations: none.