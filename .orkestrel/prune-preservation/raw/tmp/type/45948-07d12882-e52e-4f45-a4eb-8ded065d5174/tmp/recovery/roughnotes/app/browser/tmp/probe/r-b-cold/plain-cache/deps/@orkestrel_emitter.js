import { isFunction } from "./@orkestrel_contract.js";
//#region node_modules/@orkestrel/emitter/dist/src/core/index.js
/**
* Extracts the own enumerable keys of a mapped object, typed as its key union.
*
* @remarks
* `Object.keys` widens its result to `string[]`, which breaks the key↔value
* correlation a mapped type (like `EmitterHooks<TMap>`) otherwise guarantees.
* A `for…in` push into a `keyof`-typed array narrows the result back,
* type-safely and with no assertion. Inherited enumerable keys are excluded, as
* `Object.keys` excludes them.
*
* @typeParam T - The object shape whose keys are extracted.
* @param object - The object to read keys from.
* @returns The object's own enumerable keys, typed as `ReadonlyArray<keyof T>`.
*
* @example
* ```ts
* import { extractKeys } from '@src/core'
*
* const hooks = { tick: () => {}, done: () => {} }
* extractKeys(hooks) // ['tick', 'done']
* extractKeys({}) // []
* ```
*/
function extractKeys(object) {
	const collected = [];
	for (const key in object) if (Object.hasOwn(object, key)) collected.push(key);
	return collected;
}
/**
* Implements `EmitterInterface` over one listener `Set` per event, so every public method is
* precisely typed with no assertion. A stateful entity owns one as a `#emitter` field and
* exposes it through `readonly emitter`; it never inherits from it.
*
* @typeParam TMap - The event map: each event name to the argument tuple its
*   listeners receive.
*
* @remarks
* - **Synchronous.** `emit` invokes listeners in registration order, in the
*   current tick.
* - **Listener isolation.** A throwing listener never stops its siblings: every
*   listener runs, and a throw is routed to the `error` handler
*   ({@link EmitterOptions.error}) — never rethrown. Every throwing listener
*   surfaces (not only the first), and with no `error` handler a throw is swallowed
*   silently. The `error` handler runs inside its own try/catch, so a throwing
*   error-handler is swallowed too (anti-recursion — it cannot escape or re-enter).
* - **Destroyed → no-op.** After `destroy()`, `on` / `once` / `emit` do nothing
*   and `destroyed` is `true`.
*
* @example
* ```ts
* type CounterEventMap = {
* 	tick: readonly [count: number]
* 	done: readonly []
* }
*
* const emitter = new Emitter<CounterEventMap>({
* 	on: { done: () => stop() },
* 	error: (error, event) => log(`listener for ${event} threw`, error),
* })
* emitter.on('tick', (count) => render(count))
* emitter.emit('tick', 1)
* ```
*/
var Emitter = class {
	#destroyed = false;
	#listeners = {};
	#wrappers = {};
	#error;
	constructor(options) {
		const error = options?.error;
		this.#error = isFunction(error) ? error : void 0;
		const hooks = options?.on;
		if (hooks !== void 0) this.#wire(hooks);
	}
	get destroyed() {
		return this.#destroyed;
	}
	on(event, handler) {
		if (this.#destroyed) return;
		(this.#listeners[event] ??= /* @__PURE__ */ new Set()).add(handler);
	}
	once(event, handler) {
		if (this.#destroyed) return;
		const pending = this.#wrappers[event] ??= /* @__PURE__ */ new Map();
		const reference = /* @__PURE__ */ new Set();
		const wrapper = this.#wrap(event, handler, pending, reference);
		reference.add(wrapper);
		const wrappers = pending.get(handler) ?? /* @__PURE__ */ new Set();
		wrappers.add(wrapper);
		pending.set(handler, wrappers);
		this.on(event, wrapper);
	}
	off(event, handler) {
		const listeners = this.#listeners[event];
		const wrappers = this.#wrappers[event];
		const pending = wrappers?.get(handler);
		if (pending !== void 0) {
			for (const wrapper of pending) listeners?.delete(wrapper);
			wrappers?.delete(handler);
		}
		listeners?.delete(handler);
	}
	emit(event, ...args) {
		if (this.#destroyed) return;
		const listeners = this.#listeners[event];
		if (listeners === void 0) return;
		for (const handler of [...listeners]) try {
			handler(...args);
		} catch (error) {
			this.#surface(error, event);
		}
	}
	count(event) {
		if (event !== void 0) return this.#listeners[event]?.size ?? 0;
		let total = 0;
		for (const set of Object.values(this.#listeners)) total += set?.size ?? 0;
		return total;
	}
	clear(event) {
		if (event !== void 0) {
			delete this.#listeners[event];
			delete this.#wrappers[event];
			return;
		}
		this.#listeners = {};
		this.#wrappers = {};
	}
	destroy() {
		this.#listeners = {};
		this.#wrappers = {};
		this.#error = void 0;
		this.#destroyed = true;
	}
	#wrap(event, handler, pending, reference) {
		return (...args) => {
			for (const wrapper of reference) {
				this.#listeners[event]?.delete(wrapper);
				const wrappers = pending.get(handler);
				wrappers?.delete(wrapper);
				if (wrappers !== void 0 && wrappers.size === 0) pending.delete(handler);
			}
			handler(...args);
		};
	}
	#surface(error, event) {
		const handler = this.#error;
		if (handler === void 0) return;
		try {
			handler(error, String(event));
		} catch {}
	}
	#wire(hooks) {
		for (const event of extractKeys(hooks)) {
			const handler = hooks[event];
			if (isFunction(handler)) this.on(event, handler);
		}
	}
};
/**
* Creates a typed synchronous event emitter and returns it as an `EmitterInterface<TMap>`,
* wiring the initial `on` hooks and the `error` handler its options carry.
*
* @remarks
* Entities that own an emitter construct `new Emitter(...)` for their `#emitter`
* field directly; this factory is the standalone entry point.
*
* @typeParam TMap - The event map: each event name to its listener argument tuple.
* @param options - Optional `on` hooks (initial listeners wired at construction) and
*   an optional `error` handler for a listener's throw
* @returns A typed {@link EmitterInterface}
*
* @example Standalone emitter
* ```ts
* import { createEmitter } from '@orkestrel/emitter'
*
* type DownloadEventMap = {
* 	chunk: readonly [bytes: number]
* 	done: readonly []
* }
*
* const emitter = createEmitter<DownloadEventMap>()
* emitter.on('chunk', (bytes) => accumulate(bytes))
* emitter.once('done', () => finish())
* emitter.emit('chunk', 1024)
* emitter.emit('done')
* ```
*/
function createEmitter(options) {
	return new Emitter(options);
}
//#endregion
export { Emitter, createEmitter, extractKeys };
