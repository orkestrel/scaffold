import { attempt, holds, isArray, isDefined, isError, isFiniteNumber, isFunction, isInteger, isNumber, isObject, isSymbol } from "./@orkestrel_contract.js";
//#region node_modules/@orkestrel/test/dist/src/core/index.js
/**
* Names the attributes a statechart harness publishes, keyed by the fact each one carries.
*
* @remarks
* A harness renders its own table and a gate outside the page polls the rendered markup, so these
* names are the whole contract between the two. `status`, `passed`, `failed`, and `total` belong on
* the harness root, because a gate finds the harness by `status` and reads the tally from the same
* element. `scenario` and `result` belong on each row, so a failing row is found by `result` and
* named by `scenario`. `state` belongs on the element rendering the entity's current state.
*
* The values are the attribute names themselves, so a harness writes `setAttribute` against this map
* and a gate writes `querySelector` against it, and neither spells a `data-statechart-*` string of
* its own. `createHarness` in the browser environment is the harness this package publishes, and it
* writes every one of these names from here.
*
* @example
* ```ts
* harness.getAttribute(STATECHART_ATTRIBUTES.status) // 'passed'
* ```
*/
var STATECHART_ATTRIBUTES = Object.freeze({
	status: "data-statechart-status",
	passed: "data-statechart-passed",
	failed: "data-statechart-failed",
	total: "data-statechart-total",
	scenario: "data-statechart-scenario",
	result: "data-statechart-result",
	state: "data-statechart-state"
});
/**
* Lists every value a statechart harness reports through its `status` attribute.
*
* @remarks
* `pending` is what a harness carries while its inventory is incomplete: written at construction
* and replaced as soon as every declared row has rendered its `scenario` element and the root
* carries the row count. A gate that finds it has found a harness whose rows never mounted. `idle`
* is a mounted harness standing ready, its tally at zero and nothing running. `running` is a run in
* flight. `passed` and `failed` are the two terminal readings, so a gate waits for membership in
* that pair rather than for a fixed duration. An exceptional exit is terminal too: a harness whose
* `state` reader throws writes `failed` and then rejects the run, so the gate reads a terminal pair
* while the suite reads the throw.
*
* The tuple's order is the order a run passes through, and `StatechartStatus` is the same set as a
* named union, so a harness and its gate share one vocabulary whichever form each of them needs.
*
* @example
* ```ts
* const terminal = new Set<StatechartStatus>(['passed', 'failed'])
* terminal.has('running') // false
* ```
*/
var STATECHART_STATUSES = Object.freeze([
	"pending",
	"idle",
	"running",
	"passed",
	"failed"
]);
/**
* Checks whether a value contains a recorder for every listed event.
*
* @typeParam TMap - The source's event names and delivered argument tuples.
* @typeParam TName - The event names represented in the map.
* @param value - The value to inspect.
* @param events - The events the completed map must contain.
* @returns True if every listed event has a structurally valid recorder; false otherwise.
* @remarks Per-key tuple precision is the predicate's claim. The factory proves that claim by
* wiring each recorder to exactly the event where it stores that recorder. A direct caller must
* establish the same pairing before it relies on the narrowing. This guard takes the listed events
* through a reference parameter rather than using the canonical single-value guard form.
*
* @example
* ```ts
* import { createRecorder, isRecorderMapComplete } from '@orkestrel/test'
*
* type ReadyEvents = { readonly ready: readonly [name: string, step: number] }
*
* const value: unknown = { ready: createRecorder<readonly [name: string, step: number]>() }
*
* isRecorderMapComplete<ReadyEvents, 'ready'>(value, ['ready']) // true
* isRecorderMapComplete<ReadyEvents, 'ready'>({ ready: 1 }, ['ready']) // false
* ```
*/
function isRecorderMapComplete(value, events) {
	return holds(() => {
		if (!isObject(value)) return false;
		return events.every((event) => {
			if (!Object.hasOwn(value, event)) return false;
			const recorder = Reflect.get(value, event);
			if (!isObject(recorder)) return false;
			return isFunction(Reflect.get(recorder, "handler")) && isArray(Reflect.get(recorder, "calls"));
		});
	});
}
/**
* Checks the resolved bounds one bounded wait runs under.
*
* @param subject - The bound's owner, which opens each refusal message.
* @param budget - The resolved elapsed-time limit in milliseconds.
* @param interval - The resolved delay between readings in milliseconds.
* @throws An `Error` reading `<subject> budget must be finite and non-negative` or
* `<subject> interval must be finite and non-negative`.
* @remarks Every member of the wait family resolves its own defaults first and passes the resolved
* numbers here, so each keeps its own defaults while one contract states what a bound must be.
*
* @example
* ```ts
* import { checkBounds } from '@orkestrel/test'
*
* checkBounds('Wait', 1000, 10) // undefined
*
* // Throws Error: Retry budget must be finite and non-negative
* checkBounds('Retry', -1, 10)
* ```
*/
function checkBounds(subject, budget, interval) {
	if (!isFiniteNumber(budget) || budget < 0) throw new Error(`${subject} budget must be finite and non-negative`);
	if (!isFiniteNumber(interval) || interval < 0) throw new Error(`${subject} interval must be finite and non-negative`);
}
/**
* Builds the error {@link retryUntil} raises when its elapsed-time budget runs out.
*
* @param description - The operation the retry was named for.
* @param budget - The elapsed-time limit in milliseconds.
* @param elapsed - The milliseconds the retry actually spent.
* @param last - The rendered last unsatisfying value, or `undefined` when the retry produced none.
* @param cause - The last producer error, which becomes the returned error's `cause`.
* @returns The exhaustion error, unthrown.
* @remarks Both of `retryUntil`'s elapsed checks raise this one message, so an edit to it lands in
* one place. The rendered value is appended only when the retry produced one.
*
* @example
* ```ts
* import { buildRetryExhausted } from '@orkestrel/test'
*
* const exhausted = buildRetryExhausted('registry answers', 30, 31, '"starting"', undefined)
*
* exhausted.message
* // 'Retry "registry answers" did not succeed within 30ms (waited 31ms) (last value: "starting")'
* ```
*/
function buildRetryExhausted(description, budget, elapsed, last, cause) {
	return new Error(`Retry "${description}" did not succeed within ${budget}ms (waited ${elapsed}ms)${last === void 0 ? "" : ` (last value: ${last})`}`, { cause });
}
/**
* Builds the error a refused fixture build raises, named for the row it was building for.
*
* @param name - The row's name, which opens the message.
* @param cause - The value the builder refused with, which becomes the returned error's `cause`.
* @returns The refusal, unthrown.
* @remarks {@link executeScenarios} raises this one, and `createHarness` in the browser environment
* announces its `message` on the row it refused, so the runner and the harness name a refused build
* with one sentence rather than two spellings of it. The refusal arrives as the `cause` by identity,
* so its own message and stack survive the naming.
*
* @example
* ```ts
* import { buildRefusal } from '@orkestrel/test'
*
* buildRefusal('closed opens through the summary', new Error('no fixture')).message
* // 'closed opens through the summary: build refused'
* ```
*/
function buildRefusal(name, cause) {
	return new Error(`${name}: build refused`, { cause });
}
/**
* Drops the registration an instrumented signal installed for one listener.
*
* @param registrations - The live registration list, spliced in place.
* @param installed - The installed listener naming the registration to drop.
* @returns The dropped registration, or `undefined` when the list holds none for that listener.
* @remarks The dropped registration's cleanup controller is aborted as it leaves, so the scope
* subscription installed beside it leaves with it. Removing the installed listener from the signal
* stays with the caller, because only the scope-abort path has one to remove.
*
* @example
* ```ts
* import type { SignalRegistration } from '@orkestrel/test'
* import { dropRegistration } from '@orkestrel/test'
*
* const listener: EventListener = () => undefined
* const installed: EventListenerObject = { handleEvent: () => undefined }
* const cleanup = new AbortController()
* const registrations: SignalRegistration[] = [[listener, installed, true, cleanup]]
*
* dropRegistration(registrations, installed)?.[1] === installed // true
* cleanup.signal.aborted // true
* dropRegistration(registrations, installed) // undefined
* ```
*/
function dropRegistration(registrations, installed) {
	const index = registrations.findIndex((registration) => registration[1] === installed);
	const registration = registrations[index];
	if (registration === void 0) return void 0;
	registrations.splice(index, 1);
	registration[3]?.abort();
	return registration;
}
/**
* Waits for a host timer to elapse.
*
* @param ms - The delay in milliseconds. Default: `0`.
* @returns A promise that resolves after the timer fires.
*/
function waitForDelay(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
* Waits until an abort signal is aborted.
*
* @param signal - The signal to observe.
* @returns A promise that resolves when the signal is aborted.
* @remarks An already-aborted signal resolves immediately. Otherwise the wait parks on a one-shot
* abort listener without a timer or polling.
*/
function waitForAbort(signal) {
	if (signal.aborted) return Promise.resolve();
	return new Promise((resolve) => signal.addEventListener("abort", () => resolve(), { once: true }));
}
/**
* Waits until a condition holds within an elapsed-time budget.
*
* @param description - The condition described in a timeout error.
* @param condition - The synchronous or asynchronous condition to read.
* @param options - The time bounds and abort signal.
* @returns A promise that resolves when the condition first returns `true`.
* @throws The condition's thrown value, the abort reason, or an `Error` when a bound is invalid or
* the condition does not hold within the budget.
* @remarks The first read is immediate. Default budget: `1000` milliseconds. Default interval: `10`
* milliseconds.
*/
async function waitForCondition(description, condition, options) {
	const budget = options?.budget ?? 1e3;
	const interval = options?.interval ?? 10;
	checkBounds("Wait", budget, interval);
	const start = performance.now();
	while (true) {
		options?.signal?.throwIfAborted();
		const held = await condition();
		options?.signal?.throwIfAborted();
		if (held) return;
		const elapsed = performance.now() - start;
		if (elapsed >= budget) throw new Error(`Condition "${description}" did not hold within ${budget}ms (waited ${elapsed}ms)`);
		await waitForDelay(interval);
	}
}
/**
* Waits until a reading of text carries an expected sentence.
*
* @param description - The wait described in a timeout error.
* @param read - The synchronous reading to take, such as the text of one named region.
* @param text - The sentence the reading must carry.
* @param options - The time bounds, the abort signal, the exactness switch, and the departure.
* @returns The first reading that satisfies the expectation.
* @throws The reader's thrown value, the abort reason, or an `Error` when `text` or `absent` is
* empty, `text` carries `absent`, a bound is invalid, or the expectation is not met within the
* budget.
* @remarks
* The reading is a parameter rather than a target this resolves, so the same wait serves a whole
* page, one named region, and a value a host-independent test computes. Scope it as narrowly as the
* claim: a wait over the whole page resolves on the sentence wherever it lands.
*
* {@link waitForCondition} owns the poll, so the bounds, the timeout voice, and the abort reason are
* that helper's, and a reader that throws stops the wait rather than counting as a reading that did
* not satisfy it. Default budget: `1000` milliseconds. Default interval: `10` milliseconds.
*
* An empty expectation is refused rather than satisfied by the first reading, because every string
* contains the empty string and every reading equals it only when the screen is blank.
*
* A departure the expectation itself carries is refused the same way, before any reading. A reading
* that satisfies the arrival carries the departure too — under `exact` it equals `text` and without
* it contains `text` — so no reading can ever satisfy the poll and the wait would spend its whole
* budget on a contradiction in the call.
*
* @example
* ```ts
* import { waitForText } from '@orkestrel/test'
*
* await waitForText('the ledger arrives', () => panel.innerText, 'Two entries')
*
* // Throws Error: Text expectation must not be empty
* await waitForText('anything', () => panel.innerText, '')
*
* // Throws Error: Text departure must not appear in the text expectation
* await waitForText('anything', () => panel.innerText, 'Two entries', { absent: 'entries' })
* ```
*/
async function waitForText(description, read, text, options) {
	if (text.length === 0) throw new Error("Text expectation must not be empty");
	const absent = options?.absent;
	if (absent !== void 0 && absent.length === 0) throw new Error("Text expectation must not be empty");
	if (absent !== void 0 && text.includes(absent)) throw new Error("Text departure must not appear in the text expectation");
	const exact = options?.exact ?? false;
	let reading = "";
	await waitForCondition(description, () => {
		reading = read();
		return (exact ? reading === text : reading.includes(text)) && (absent === void 0 || !reading.includes(absent));
	}, options);
	return reading;
}
/**
* Repeats a producer until one produced value satisfies a predicate.
*
* @typeParam T - The produced value type.
* @param description - The operation described in an exhaustion error.
* @param produce - The synchronous or asynchronous operation to repeat.
* @param satisfied - The predicate that accepts a produced value.
* @param options - The time, attempt, and abort bounds.
* @returns The first produced value the predicate accepts.
* @throws The predicate's thrown value, the abort reason, or an `Error` when a bound is invalid or
* the retry exhausts its budget or attempts.
* @remarks A producer throw counts as an unsatisfied attempt. The last producer error becomes the
* exhaustion error's `cause`. Default budget: `1000` milliseconds. Default interval: `10`
* milliseconds.
*/
async function retryUntil(description, produce, satisfied, options) {
	const budget = options?.budget ?? 1e3;
	const interval = options?.interval ?? 10;
	const attempts = options?.attempts;
	checkBounds("Retry", budget, interval);
	if (isDefined(attempts) && (!isInteger(attempts) || attempts < 1)) throw new Error("Retry attempts must be a positive integer");
	const start = performance.now();
	let count = 0;
	let cause;
	let last;
	while (true) {
		options?.signal?.throwIfAborted();
		if (count > 0) {
			const elapsed = performance.now() - start;
			if (elapsed >= budget) throw buildRetryExhausted(description, budget, elapsed, last, cause);
		}
		let produced;
		try {
			produced = {
				success: true,
				value: await produce()
			};
		} catch (error) {
			produced = {
				success: false,
				error
			};
		}
		count += 1;
		options?.signal?.throwIfAborted();
		if (produced.success) {
			if (satisfied(produced.value)) return produced.value;
			let rendered;
			try {
				const serialized = JSON.stringify(produced.value);
				rendered = serialized === void 0 ? String(produced.value) : serialized;
			} catch {
				try {
					rendered = String(produced.value);
				} catch {
					rendered = "[unrenderable]";
				}
			}
			last = rendered.length > 200 ? `${rendered.slice(0, 197)}...` : rendered;
		} else cause = produced.error;
		const elapsed = performance.now() - start;
		if (elapsed >= budget) throw buildRetryExhausted(description, budget, elapsed, last, cause);
		if (attempts !== void 0 && count >= attempts) throw new Error(`Retry "${description}" did not succeed within ${attempts} attempts${last === void 0 ? "" : ` (last value: ${last})`}`, { cause });
		await waitForDelay(Math.min(interval, budget - elapsed));
	}
}
/**
* Invokes an unknown method through an explicit unchecked result contract.
*
* @typeParam T - The result type claimed by the caller.
* @param target - The value used as the method's `this` argument.
* @param method - The unknown method to invoke.
* @param args - The arguments to pass.
* @returns The method's result under the caller's claimed type.
* @throws A `TypeError` when `method` is not callable.
* @remarks The caller owns the claim that the returned value has type `T`. The contained `any`
* bridges the unchecked runtime result to that caller-owned claim.
*/
function invokeUnchecked(target, method, args) {
	if (typeof method !== "function") throw new TypeError("Method must be callable");
	return Reflect.apply(method, target, args);
}
/**
* Reads a property from an unknown object or function.
*
* @typeParam T - The property type claimed by the caller.
* @param target - The unknown value to read.
* @param key - The property key to read.
* @returns The property value under the caller's claimed type.
* @throws A `TypeError` when `target` is neither an object nor a function.
* @remarks The caller owns the claim that the returned value has type `T`. The contained `any`
* bridges the unchecked runtime result to that caller-owned claim.
*/
function readProperty(target, key) {
	if ((typeof target !== "object" || target === null) && typeof target !== "function") throw new TypeError("Target must be an object or function");
	return Reflect.get(target, key);
}
/**
* Normalizes headers into a frozen plain record.
*
* @param init - The platform header initializer to normalize.
* @returns A frozen record of normalized header names and values.
* @remarks Normalization follows the host `Headers` implementation, including lowercased names and
* combined values.
*/
function flattenHeaders(init) {
	return Object.freeze(Object.fromEntries(new Headers(init).entries()));
}
/**
* Waits for the first delivery from an event subscription.
*
* @typeParam TArgs - The delivered argument tuple.
* @param subscribe - The function that installs the event listener and may return its cleanup.
* @param description - The event described in a timeout error.
* @param options - The time bounds and abort signal.
* @returns The first delivered argument tuple.
* @throws The subscription's thrown value, the abort reason, or an `Error` when a bound is invalid
* or the event is not delivered within the budget.
* @remarks Default budget: `1000` milliseconds. The interval is validated for consistency with the
* wait family but is not used because this helper parks on the event.
*/
async function waitForEvent(subscribe, description, options) {
	const budget = options?.budget ?? 1e3;
	checkBounds("Event", budget, options?.interval ?? 10);
	const signal = options?.signal;
	signal?.throwIfAborted();
	const delivery = Promise.withResolvers();
	const controller = new AbortController();
	let timeout;
	const pending = [delivery.promise, new Promise((_resolve, reject) => {
		timeout = setTimeout(() => {
			reject(/* @__PURE__ */ new Error(`Event "${description}" was not delivered within ${budget}ms`));
		}, budget);
	})];
	if (signal !== void 0) pending.push(new Promise((_resolve, reject) => {
		AbortSignal.any([signal, controller.signal]).addEventListener("abort", () => {
			if (signal.aborted) reject(signal.reason);
		}, { once: true });
	}));
	const result = Promise.race(pending);
	let cleanup = void 0;
	try {
		try {
			cleanup = subscribe((...args) => delivery.resolve(args));
		} catch (error) {
			delivery.reject(error);
		}
		return await result;
	} finally {
		controller.abort();
		if (timeout !== void 0) clearTimeout(timeout);
		cleanup?.();
	}
}
/**
* Decodes newline-delimited JSON values.
*
* @param text - The JSON Lines text to decode.
* @returns The decoded values in physical-line order.
* @throws An `Error` naming the malformed physical line, with the native `SyntaxError` as its
* `cause`.
* @remarks An empty line contributes no value, and a trailing carriage return is dropped before the
* line is parsed, so text written with either line ending decodes the same.
*
* @example
* ```ts
* import { decodeJSONLines } from '@orkestrel/test'
*
* decodeJSONLines('{"ready":true}\n7\n') // [{ ready: true }, 7]
*
* // Throws Error: Invalid JSON on line 3
* decodeJSONLines('{}\n\n{')
* ```
*/
function decodeJSONLines(text) {
	const values = [];
	for (const [index, physical] of text.split("\n").entries()) {
		const line = physical.endsWith("\r") ? physical.slice(0, -1) : physical;
		if (line.length === 0) continue;
		try {
			const value = JSON.parse(line);
			values.push(value);
		} catch (cause) {
			throw new Error(`Invalid JSON on line ${index + 1}`, { cause });
		}
	}
	return values;
}
/**
* Captures the value thrown by a thunk.
*
* @param thunk - The work whose thrown value to capture.
* @returns The thrown value, or `undefined` when the thunk completes.
*/
function captureError(thunk) {
	const outcome = attempt(thunk);
	return outcome.success ? void 0 : outcome.error;
}
/**
* Narrows a value away from `null` and `undefined`, throwing when it is absent.
*
* @typeParam T - The required value type.
* @param value - The value to check.
* @param message - The error message used when the value is absent. Default: `'Value is required'`.
* @returns The present value.
* @throws An `Error` carrying `message` when the value is `null` or `undefined`.
*/
function requireValue(value, message = "Value is required") {
	if (!isDefined(value)) throw new Error(message);
	return value;
}
/**
* Collects every value from an async iterable.
*
* @typeParam T - The yielded value type.
* @param source - The async iterable to drain.
* @returns The yielded values in iteration order.
*/
async function collect(source) {
	const values = [];
	for await (const value of source) values.push(value);
	return values;
}
/**
* Collects every value from a readable stream.
*
* @typeParam T - The streamed value type.
* @param stream - The readable stream to drain.
* @returns The streamed values in read order.
*/
async function collectStream(stream) {
	const reader = stream.getReader();
	const values = [];
	try {
		while (true) {
			const result = await reader.read();
			if (result.done) return values;
			values.push(result.value);
		}
	} finally {
		reader.releaseLock();
	}
}
/**
* Copies a JSON value through serialization and parsing.
*
* @typeParam T - The copied value's type, which the copy keeps.
* @param value - The value to copy, bounded by its own `JSONSafe` projection.
* @returns The parsed JSON copy.
* @remarks Non-finite numbers throw because JSON would replace them with `null`. Negative zero is
* normalized to zero by JSON serialization. The bound intersects `JSONSafe<T>` rather than
* constraining `T` to `JSONValue`, so an interface-typed value round-trips.
*/
function roundTripJSON(value) {
	const serialized = JSON.stringify(value, (_key, current) => {
		if (current === void 0 || isFunction(current) || isSymbol(current)) throw new Error("JSON values must not contain undefined, functions, or symbols");
		if (isNumber(current) && !isFiniteNumber(current)) throw new Error("JSON values must contain finite numbers");
		return current;
	});
	const parsed = JSON.parse(serialized);
	const pending = [parsed];
	while (pending.length > 0) {
		const current = pending.pop();
		if (isNumber(current) && !isFiniteNumber(current)) throw new Error("JSON values must contain finite numbers");
		if (isArray(current)) for (const child of current) pending.push(child);
		else if (isObject(current)) for (const child of Object.values(current)) pending.push(child);
	}
	return parsed;
}
/**
* Resolves the parent directory of a calling module, which is the workspace root when called from
* the conventional `tests/setup.ts` location.
*
* @param meta - The calling module metadata.
* @returns The root URL one directory above the calling file.
*/
function resolveRoot(meta) {
	return new URL("../", meta.url);
}
/**
* Drives one statechart scenario through its arrange, act, and assert phases.
*
* @typeParam TState - The states the entity moves between.
* @typeParam TEvent - The events the entity accepts.
* @typeParam TContext - The fixture the phases drive.
* @param scenario - The scenario to drive.
* @param context - The fixture handed to each phase.
* @returns A promise that resolves after the assert phase completes.
* @throws An `Error` whose message opens with the transition's `name` and whose `cause` is the value
* the failing phase threw.
* @remarks Each phase is awaited before the next begins, so an asynchronous arrange settles before
* the event is applied. The phases receive the transition's own parts: `arrange` receives `from`,
* `act` receives `event`, and `assert` receives `to`.
*
* The row's name is prepended because a table's rows run under one test name, so a bare assertion
* message says what failed and never which row. A thrown `Error` keeps its own message after the
* name and arrives as the `cause`; anything else thrown is named by its type and arrives as the
* `cause` unchanged.
*
* @example
* ```ts
* await executeScenario(scenarios[0], { disclosure: new Disclosure() })
* ```
*/
async function executeScenario(scenario, context) {
	const transition = scenario.transition;
	try {
		await scenario.arrange(context, transition.from);
		await scenario.act(context, transition.event);
		await scenario.assert(context, transition.to);
	} catch (cause) {
		const message = isError(cause) ? cause.message : `threw a non-error ${typeof cause} value`;
		throw new Error(`${transition.name}: ${message}`, { cause });
	}
}
/**
* Drives a statechart table row by row, each row against a context of its own.
*
* @typeParam TState - The states the entity moves between.
* @typeParam TEvent - The events the entity accepts.
* @typeParam TContext - The fixture the phases drive.
* @param scenarios - The table to drive, in the order it is written.
* @param build - The fixture builder, called once per row and awaited when it returns a promise.
* @returns A promise that resolves after the last row completes.
* @throws {@link buildRefusal}'s `Error` reading `<name>: build refused` when the row's builder
* throws or rejects, or whatever {@link executeScenario} throws for the first row whose phases
* fail. Either way the run stops at that row and the rows after it never start.
* @remarks The rows run one after another rather than together: a statechart's rows drive one
* entity on one page, so a parallel run would have them arranging over each other. `build` receives
* the row it is building for, which is what lets one table mix fixtures.
*
* A refusing builder is named for its row the way a failing phase is, because a table's rows build
* under one test name too. `buildRefusal` owns that sentence, so the harness the browser
* environment publishes announces the same one rather than a second spelling of it.
*
* @example
* ```ts
* await executeScenarios(SCENARIOS, () => ({ disclosure: new Disclosure() }))
* ```
*/
async function executeScenarios(scenarios, build) {
	for (const scenario of scenarios) {
		let context;
		try {
			context = await build(scenario);
		} catch (cause) {
			throw buildRefusal(scenario.transition.name, cause);
		}
		await executeScenario(scenario, context);
	}
}
/**
* Creates values that make common object readers throw or violate their assumptions.
*
* @returns A frozen array whose values are fresh on every call.
* @remarks Every member makes a naive read throw or violates a naive structural assumption. A total
* guard survives every member without throwing. Whether it accepts or refuses one is that guard's
* own contract. Membership may grow in a release, so test the whole returned set in a loop and
* include the index in each failure.
*
* - The self-referential record makes JSON record serialization throw.
* - The revoked object proxy makes reflective object access throw.
* - The property proxy makes a named property read throw.
* - The key proxy makes key enumeration throw.
* - The prototype proxy makes a prototype read throw.
* - The null-prototype record breaks a direct `hasOwnProperty` call.
* - The array-target proxy passes an array check and makes an index read throw.
* - The self-referential array makes JSON collection serialization throw.
* - The sparse array violates the assumption that every index is enumerable.
* - The hidden-key record violates the assumption that every own key is enumerable.
* - The named getter makes its property read throw.
* @example
* ```ts
* import { expect } from 'vitest'
* import { createHostileValues } from '@orkestrel/test'
*
* function isWireRecord(value: unknown): value is Readonly<Record<string, string>> {
* 	if (typeof value !== 'object' || value === null) return false
* 	try {
* 		if (Object.getPrototypeOf(value) !== Object.prototype) return false
* 		Reflect.get(value, 'value')
* 		if (Reflect.ownKeys(value).length === 0) return false
* 		return Object.values(value).every((member) => typeof member === 'string')
* 	} catch {
* 		return false
* 	}
* }
*
* for (const [index, value] of createHostileValues().entries()) {
* 	let accepted: boolean | undefined
* 	expect(() => {
* 		accepted = isWireRecord(value)
* 	}, `hostile value ${index}`).not.toThrow()
* 	expect(accepted, `hostile value ${index}`).toBe(false)
* }
* ```
*/
function createHostileValues() {
	const cyclic = {};
	cyclic.self = cyclic;
	const revoked = Proxy.revocable({}, {});
	revoked.revoke();
	const cyclicArray = [];
	cyclicArray.push(cyclicArray);
	const sparseArray = Array(2);
	sparseArray[1] = "present";
	const hidden = {};
	Object.defineProperty(hidden, "hidden", { value: true });
	Reflect.set(hidden, "self", hidden);
	const getter = {};
	Object.defineProperty(getter, "danger", {
		enumerable: true,
		get() {
			throw new Error("Hostile named getter read");
		}
	});
	return Object.freeze([
		cyclic,
		revoked.proxy,
		new Proxy({}, { get() {
			throw new Error("Hostile property read");
		} }),
		new Proxy({}, { ownKeys() {
			throw new Error("Hostile key enumeration");
		} }),
		new Proxy({}, { getPrototypeOf() {
			throw new Error("Hostile prototype read");
		} }),
		Object.create(null),
		new Proxy([], { get() {
			throw new Error("Hostile array index read");
		} }),
		cyclicArray,
		sparseArray,
		hidden,
		getter
	]);
}
/**
* Creates a recorder for callback arguments.
*
* @typeParam TArgs - The argument tuple to record.
* @returns A recorder whose handler appends calls in order.
*/
function createRecorder() {
	const calls = [];
	return {
		calls,
		get count() {
			return calls.length;
		},
		handler(...args) {
			calls.push(args);
		},
		clear() {
			calls.length = 0;
		}
	};
}
/**
* Creates event recorders and subscribes them to the source.
*
* @typeParam TMap - The source's event names and delivered argument tuples.
* @typeParam TName - The requested event names.
* @param source - The source to subscribe to.
* @param events - The events to record.
* @returns A map from each requested event name to its recorder.
* @throws Thrown when a listed event has no recorder, which a well-formed events array cannot
* produce.
* @remarks A duplicate event name installs a fresh recorder for every occurrence. The returned map
* keeps the recorder installed for the last occurrence. `TName` derives from the array's element
* type. An array declared with a wider union than its contents widens `TName` beyond the listed
* events. The omitted key reads `undefined` at runtime under a non-optional type, and the guard
* reports `true` because it checks the listed events. Pass a literal array or a tuple.
*/
function createRecorders(source, events) {
	const building = {};
	for (const event of events) {
		const recorder = createRecorder();
		source.on(event, recorder.handler);
		building[event] = recorder;
	}
	if (!isRecorderMapComplete(building, events)) throw new Error("Emitter recorder map is incomplete");
	return building;
}
/**
* Creates a real abort controller whose signal reports its live abort listeners.
*
* @returns The controller, its instrumented signal, and the current listener tally.
* @remarks Instrumentation is installed on the created signal instance. A one-shot listener leaves
* the tally when it fires, and removal accepts the original listener supplied by the caller. A
* listener scoped by another signal leaves when that signal aborts. An already-aborted scope
* installs and records nothing.
*/
function createSignal() {
	const controller = new AbortController();
	const signal = controller.signal;
	const add = signal.addEventListener.bind(signal);
	const remove = signal.removeEventListener.bind(signal);
	const registrations = [];
	Object.defineProperty(signal, "addEventListener", {
		configurable: true,
		value(type, listener, options) {
			if (listener === null) return;
			if (type !== "abort") {
				add(type, listener, options);
				return;
			}
			const capture = typeof options === "boolean" ? options : options?.capture ?? false;
			const scope = typeof options === "object" ? options?.signal : void 0;
			if (scope?.aborted === true) return;
			if (registrations.some((registration) => registration[0] === listener && registration[2] === capture)) return;
			const once = typeof options === "object" && options?.once === true;
			const cleanup = scope === void 0 ? void 0 : new AbortController();
			const installed = { handleEvent(event) {
				if (once) dropRegistration(registrations, installed);
				if (typeof listener === "function") listener.call(signal, event);
				else listener.handleEvent(event);
			} };
			add(type, installed, typeof options === "object" ? options?.passive === void 0 ? {
				capture,
				once
			} : {
				capture,
				once,
				passive: options.passive
			} : options);
			registrations.push([
				listener,
				installed,
				capture,
				cleanup
			]);
			if (scope !== void 0 && cleanup !== void 0) scope.addEventListener("abort", () => {
				const registration = dropRegistration(registrations, installed);
				if (registration === void 0) return;
				remove(type, registration[1], { capture });
			}, {
				once: true,
				signal: cleanup.signal
			});
		}
	});
	Object.defineProperty(signal, "removeEventListener", {
		configurable: true,
		value(type, listener, options) {
			if (listener === null) return;
			if (type !== "abort") {
				remove(type, listener, options);
				return;
			}
			const capture = typeof options === "boolean" ? options : options?.capture ?? false;
			const index = registrations.findIndex((registration) => registration[0] === listener && registration[2] === capture);
			const registration = registrations[index];
			if (registration === void 0) {
				remove(type, listener, options);
				return;
			}
			registrations.splice(index, 1);
			registration[3]?.abort();
			remove(type, registration[1], options);
		}
	});
	return {
		controller,
		signal,
		get count() {
			return registrations.length;
		}
	};
}
/**
* Creates a monotonically numbered resource factory with creation and destruction records.
*
* @returns A resource factory whose recorders retain every affected id in order.
*/
function createResourceFactory() {
	const created = createRecorder();
	const destroyed = createRecorder();
	return {
		created,
		destroyed,
		create() {
			const id = created.calls.length + 1;
			created.handler(id);
			return id;
		},
		destroy(id) {
			destroyed.handler(id);
		}
	};
}
/**
* Creates a teardown list that runs registered handlers newest-first.
*
* @returns A teardown list that awaits every handler and collects failures.
*/
function createTeardown() {
	let handlers = [];
	return {
		get count() {
			return handlers.length;
		},
		add(handler) {
			handlers.push(handler);
		},
		async destroy() {
			const snapshot = handlers;
			handlers = [];
			const failures = [];
			for (const handler of snapshot.reverse()) try {
				await handler();
			} catch (error) {
				failures.push(error);
			}
			if (failures.length === 1) throw failures[0];
			if (failures.length > 1) throw new AggregateError(failures);
		}
	};
}
//#endregion
export { STATECHART_ATTRIBUTES, STATECHART_STATUSES, buildRefusal, buildRetryExhausted, captureError, checkBounds, collect, collectStream, createHostileValues, createRecorder, createRecorders, createResourceFactory, createSignal, createTeardown, decodeJSONLines, dropRegistration, executeScenario, executeScenarios, flattenHeaders, invokeUnchecked, isRecorderMapComplete, readProperty, requireValue, resolveRoot, retryUntil, roundTripJSON, waitForAbort, waitForCondition, waitForDelay, waitForEvent, waitForText };
