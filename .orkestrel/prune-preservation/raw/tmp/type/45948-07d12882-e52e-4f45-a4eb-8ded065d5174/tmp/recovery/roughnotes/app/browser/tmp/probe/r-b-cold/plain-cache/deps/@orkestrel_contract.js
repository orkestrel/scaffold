//#region node_modules/@orkestrel/contract/dist/src/core/index.js
/**
* Holds the registry-global key used to recognize {@link ContractError} values
* across package copies.
*
* @remarks
* The descriptor stores the branded value itself. Recognition compares that
* identity, so a transparent proxy cannot forward its target's brand as its
* own. The registry makes the key discoverable; it is a recognition mechanism,
* not an unforgeable provenance marker.
*/
var CONTRACT_ERROR_BRAND = Symbol.for("@orkestrel/contract.error");
/**
* Captures every host operation this package dispatches through, while this
* module evaluates.
*
* @remarks
* THE answer to a defect class that mutated four times before anyone stated it
* as a class. A caller can replace a global constructor, a static, a prototype
* member, or a symbol-keyed hook, and a replacement can fail by THROWING, which
* a boundary contains, or by LYING, which no boundary can
* see. `Object.freeze = (value) => value` lies, and that is the
* worse failure: every cloner succeeds, publishes a mutable graph, and the caller
* cannot tell that the package's central guarantee evaporated.
*
* Containment cannot close that, because there is nothing to contain — only
* capture can, and only capture taken while this module evaluates. A module's
* initializers run at import, so a reference read here is whatever was
* installed at the moment THIS module evaluated, and reading it later, at the
* call site, is reading whatever the caller most recently installed. "Before any
* caller code runs" is the tempting phrasing and it is false in exactly the case
* the limit below names, so it is not used.
*
* The limit that follows, stated as a limit rather than as a guarantee: capture
* is only as early as this package's own evaluation. A consumer module that
* evaluates BEFORE `@orkestrel/contract` — ESM evaluates imports in source
* order — chooses what this table captures, and no mechanism inside the package
* can reach code that ran before the package existed. That precondition is
* outside this package's control, and an adversary who holds it can replace the
* package wholesale rather than bother with the table, so it is named here
* instead of defended.
*
* Membership rule, stated so a reviewer can apply it and a new call site knows
* where to go: **every host operation this package dispatches by name whose
* result a published answer depends on.** That admits statics, constructors and
* namespaces, and — this is the part the earlier wording got wrong by writing
* the rule from the rows instead of the rows from the rule — it admits a
* PROTOTYPE member on the same terms, including an ACCESSOR's getter,
* dispatched onto the package's own receiver through {@link INTRINSICS.reflect.apply}.
* A round that read `Object.getOwnPropertyDescriptor(RegExp.prototype, 'source')`
* per call had captured nothing: capture is decided by WHEN the reference is
* taken, not by which reflective spelling takes it.
*
* Collection membership needs a data structure rather than one operation, and
* answering it from an exported class's `has` method reproduces the whole defect
* one prototype higher, because every consumer can rewrite that method. The rule
* has no exception
* for it: `Set.prototype.has` / `.add` / `.forEach`,
* `Map.prototype.has` / `.forEach`, and
* `WeakSet.prototype.has` / `.add` / `.delete` are ordinary rows here, dispatched
* onto collections this package built and no caller holds, and every membership
* and visitation answer in the package is asked through the module-scope
* functions {@link matchesMember} / {@link admitMember} /
* {@link matchesVisited} / {@link admitVisited} / {@link omitVisited}. A module
* binding is not a property, so there is no member on that path to replace.
*
* The walk-collection exclusion the earlier wording carried — "a redirect
* corrupts it inside a boundary and the door refuses, which is loud" — was
* false in the direction the corpus itself installs. `WeakSet.prototype.has`
* answering `false` does not make a cyclic clone refuse; it removes the
* termination bound, and a door that never returns is the one failure no
* boundary can report. Visitation state is captured here for that reason.
*
* @example
* ```ts
* INTRINSICS.freeze(snapshot) // the genuine Object.freeze, whatever the caller installed
* ```
*/
var INTRINSICS = Object.freeze({
	/** Captures `Object.freeze` — the operation the ownership guarantee is made of. */
	freeze: Object.freeze,
	/** Captures `Object.isFrozen` — the independent check that the guarantee actually held. */
	frozen: Object.isFrozen,
	/** Captures `Object.keys` — the own enumerable string-key population of a snapshot. */
	keys: Object.keys,
	/** Captures `Object.values` — the own enumerable value population of a snapshot. */
	values: Object.values,
	/** Captures `Object.hasOwn` — own presence, so no read leaves a container for its prototype. */
	own: Object.hasOwn,
	/** Captures `Object.is` — `SameValue`, so a `NaN` or signed-zero comparison stays exact. */
	same: Object.is,
	/** Captures `Object.create` — the null-prototype and prototype-pinned accumulators. */
	create: Object.create,
	/** Captures `Object.getOwnPropertyDescriptor` — value observation that runs no accessor. */
	describe: Object.getOwnPropertyDescriptor,
	/** Captures `Object.defineProperty` — exact placement of an own data property. */
	define: Object.defineProperty,
	/** Captures `Object.getPrototypeOf` — the record-brand observation. */
	prototype: Object.getPrototypeOf,
	/** Captures `Object.getOwnPropertySymbols` — the own-symbol population. */
	symbols: Object.getOwnPropertySymbols,
	/** Captures `Object.prototype` — the realm-local plain-record prototype identity. */
	base: Object.prototype,
	/**
	* Captures the proxy-visible operations, grouped because that is what separates them:
	* each reports the trap's exact answer where `Object`'s flat peer above
	* reports the target's.
	*
	* @remarks
	* Frozen on its own, so the sub-entity is as immutable as the table holding
	* it. `describe`, `define`, and `prototype` name the same operations their
	* flat peers name, and the group is what tells a reader which of the two a
	* call site asked for.
	*/
	reflect: Object.freeze({
		/** Captures `Reflect.get` — a proxy-visible read that reports the trap's exact answer. */
		read: Reflect.get,
		/** Captures `Reflect.set` — a proxy-visible write. */
		write: Reflect.set,
		/** Captures `Reflect.ownKeys` — the complete own-key population, strings and symbols. */
		members: Reflect.ownKeys,
		/** Captures `Reflect.has` — a proxy-visible presence observation. */
		present: Reflect.has,
		/** Captures `Reflect.getOwnPropertyDescriptor` — the reflective descriptor observation. */
		describe: Reflect.getOwnPropertyDescriptor,
		/** Captures `Reflect.defineProperty` — placement that answers instead of throwing. */
		define: Reflect.defineProperty,
		/** Captures `Reflect.getPrototypeOf` — the reflective prototype observation. */
		prototype: Reflect.getPrototypeOf,
		/** Captures `Reflect.apply` — dispatch of a captured method onto its receiver. */
		apply: Reflect.apply,
		/** Captures `Reflect.construct` — construction with an explicit new target. */
		construct: Reflect.construct
	}),
	/** Captures `Number.isFinite` — the finite-bound test every numeric shape refuses on. */
	finite: Number.isFinite,
	/** Captures `Number.isInteger` — the integer-budget test the inference caps refuse on. */
	integer: Number.isInteger,
	/** Captures `Number.isSafeInteger` — the safe-integer test every length bound refuses on. */
	safe: Number.isSafeInteger,
	/** Captures `Number.isNaN` — the calendar-validity test for a parsed instant. */
	nan: Number.isNaN,
	/** Captures `Array.isArray` — array identity across realms. */
	array: Array.isArray,
	/** Captures `JSON.stringify` — the escaping used by previews and canonical text. */
	stringify: JSON.stringify,
	/** Captures `JSON.parse` — document decoding. */
	decode: JSON.parse,
	/** Captures `Math.floor` — index and quantity flooring. */
	floor: Math.floor,
	/** Captures `Math.ceil` — index and quantity ceiling. */
	ceil: Math.ceil,
	/** Captures `Math.max` — bound selection. */
	max: Math.max,
	/** Captures `Math.min` — bound selection. */
	min: Math.min,
	/** Captures `Math.imul` — the seeded generator's mixing step. */
	imul: Math.imul,
	/** Captures `String` — primitive text coercion. */
	text: String,
	/** Captures `Number` — primitive numeric coercion. */
	numeric: Number,
	/** Captures `RegExp` — pattern construction from captured source and flags. */
	pattern: RegExp,
	/**
	* Captures `RegExp.prototype.exec` — THE pattern membership answer, dispatched through
	* `apply`.
	*
	* @remarks
	* `test` is deliberately absent. `RegExp.prototype.test` is spec-defined in
	* terms of `RegExpExec`, which re-reads `exec` OFF THE RECEIVER and calls it
	* when it is callable, so capturing `test` and dispatching it still asks
	* whatever the caller installed on `RegExp.prototype.exec`. Only
	* `RegExp.prototype.exec` itself is `RegExpBuiltinExec`, which reads the
	* pattern's internal slots and no member at all. A capture that still routes
	* through the replaced member is not a capture.
	*/
	captures: RegExp.prototype.exec,
	/** Captures the `RegExp.prototype.source` getter — the pattern text a published schema embeds, dispatched through `apply`. */
	expression: Object.getOwnPropertyDescriptor(RegExp.prototype, "source")?.get,
	/** Captures the `RegExp.prototype.flags` getter — the flag text an owned pattern is rebuilt from, dispatched through `apply`. */
	modifiers: Object.getOwnPropertyDescriptor(RegExp.prototype, "flags")?.get,
	/** Captures `Array` — array construction. */
	list: Array,
	/** Captures `Array.prototype.sort` — the deterministic ordering every published schema is emitted in, dispatched through `apply`. */
	order: Array.prototype.sort,
	/** Captures `Map` — keyed working state. */
	map: Map,
	/** Captures `Map.prototype.get` — a memo read whose answer a published graph embeds, dispatched through `apply`. */
	fetch: Map.prototype.get,
	/** Captures `Map.prototype.set` — a memo write a published graph is later assembled from, dispatched through `apply`. */
	store: Map.prototype.set,
	/** Captures `Map.prototype.has` — a memo presence answer that decides whether a node is captured, dispatched through `apply`. */
	keyed: Map.prototype.has,
	/** Captures `Map.prototype.forEach` — the only full view of a caller's `Map` that runs no iterator, dispatched through `apply`. */
	pairs: Map.prototype.forEach,
	/** Captures `Set` — membership working state. */
	set: Set,
	/** Captures `Set.prototype.has` — THE membership answer every published verdict rests on, dispatched through `apply`. */
	member: Set.prototype.has,
	/** Captures `Set.prototype.add` — collection of one more member, dispatched through `apply`. */
	admit: Set.prototype.add,
	/** Captures `Set.prototype.forEach` — the only full view of a caller's `Set` that runs no iterator, dispatched through `apply`. */
	sweep: Set.prototype.forEach,
	/** Captures `WeakMap` — object-keyed working state. */
	weakMap: WeakMap,
	/** Captures `WeakMap.prototype.get` — an object-keyed memo read a published graph embeds, dispatched through `apply`. */
	recall: WeakMap.prototype.get,
	/** Captures `WeakMap.prototype.set` — an object-keyed memo write, dispatched through `apply`. */
	retain: WeakMap.prototype.set,
	/** Captures `WeakSet` — object-membership working state. */
	weakSet: WeakSet,
	/** Captures `WeakSet.prototype.has` — the visitation answer every traversal's termination rests on, dispatched through `apply`. */
	tracked: WeakSet.prototype.has,
	/** Captures `WeakSet.prototype.add` — entry onto the active path, dispatched through `apply`. */
	track: WeakSet.prototype.add,
	/** Captures `WeakSet.prototype.delete` — exit from the active path, dispatched through `apply`. */
	untrack: WeakSet.prototype.delete,
	/** Captures `Error` — the internal marker an engine throws into its own contained walk. */
	error: Error,
	/** Captures `Date` — calendar validation of an ISO instant. */
	date: Date,
	/** Captures `Date.prototype.getTime` — the calendar verdict a published `format` rests on, dispatched through `apply`. */
	instant: Date.prototype.getTime,
	/** Captures `Date.now` — the wall-clock reading a default generator seed is drawn from. */
	now: Date.now
});
/**
* Lists the seven standard JSON Schema `type` names, frozen.
*
* @remarks
* The runtime source of truth for the {@link JSONSchemaType} vocabulary. Compose
* it with the shipped primitives instead of reaching for a bespoke guard:
* `literalOf(...JSON_SCHEMA_TYPES)` is the guard, and
* `parseEnum(value, JSON_SCHEMA_TYPES)` / `parseEnumField(record, path, JSON_SCHEMA_TYPES)`
* is the parser.
*
* @example
* ```ts
* import { JSON_SCHEMA_TYPES, literalOf, parseEnumField } from '@orkestrel/contract'
*
* const isSchemaType = literalOf(...JSON_SCHEMA_TYPES) // Guard<JSONSchemaType>
* parseEnumField(schema, 'type', JSON_SCHEMA_TYPES)    // JSONSchemaType | undefined
* ```
*/
var JSON_SCHEMA_TYPES = Object.freeze([
	"null",
	"boolean",
	"object",
	"array",
	"number",
	"integer",
	"string"
]);
/**
* Lists every declared {@link ContractCode} refusal category, frozen.
*
* @remarks
* The runtime source of truth for the {@link ContractCode} vocabulary, and the
* one list every membership test over it reads: `readValue` decides from it
* whether a caller-supplied code is declared, and `isContractError` decides
* from it whether a candidate error carries a declared one. A code added to the
* union is added here, so neither test can drift from the type or from the
* other.
*
* @example
* ```ts
* import { CONTRACT_CODES, literalOf } from '@orkestrel/contract'
*
* const isContractCode = literalOf(...CONTRACT_CODES) // Guard<ContractCode>
* ```
*/
var CONTRACT_CODES = Object.freeze([
	"bound",
	"range",
	"empty",
	"placement",
	"structure",
	"literal",
	"cycle",
	"pattern",
	"generate",
	"random",
	"clone",
	"depth",
	"expansion"
]);
/**
* Caps at `64` the number of {@link Fault} / {@link AuditFault} entries a single
* `explain` or `audit` report ever returns, frozen.
*
* @remarks
* Bounds BOTH reports against adversarial input (a giant array, a wide record)
* — `compileReporter` and `compileAuditor` each collect faults in stable
* pre-order and stop once this cap is reached, and every recursive call slices
* to it, so the report size (and the work to build it) stays finite and
* deterministic at every nesting level regardless of the input's size. Size a
* diagnostic surface off this constant and it bounds `audit` exactly as it
* bounds `explain`.
*/
var FAULT_LIMIT = 64;
/**
* Caps at `64` the character length of a {@link preview}-rendered string, frozen.
*
* @remarks
* A previewed string longer than this is clipped with a trailing `…` so a
* {@link Fault}'s `received` field never embeds an unbounded amount of
* untrusted text.
*/
var PREVIEW_LIMIT = 64;
/**
* Caps the active recursion or JSON container depth for runtime guards, frozen.
*
* @remarks
* Bounds explicitly recursive guards before the JavaScript call stack becomes
* the limiting mechanism. It also caps array/plain-record containers on each
* active path inspected by {@link matchesJSONDepth}: noncontainers are depth
* zero, an empty container is depth one, 512 containers pass, and the 513th
* fails. Active cycle edges do not add a level.
*
* @example
* ```ts
* GUARD_DEPTH_LIMIT // 512
* ```
*/
var GUARD_DEPTH_LIMIT = 512;
/**
* Caps at `512` the supported nesting depth of a compiled contract shape, frozen.
*
* @remarks
* {@link validateShape} rejects the next level
* with a depth-coded {@link ContractError} before recursive artifact
* compilation begins, so a finite but pathologically deep developer-authored
* shape fails predictably instead of reaching the JavaScript call-stack limit.
*
* @example
* ```ts
* COMPILE_DEPTH_LIMIT // 512
* ```
*/
var COMPILE_DEPTH_LIMIT = 512;
/**
* Caps at `16384` the number of nodes a compiled artifact may expand a shape into,
* frozen.
*
* @remarks
* A shape graph is a DAG; every compiled artifact is a TREE. A declaration may
* therefore be tiny and its schema, guard, parser, reporter, auditor and
* generated value enormous: `objectShape({ left: node, right: node })` nested
* thirty times is thirty-one authored nodes that expand into more than a
* billion emitted ones. Sharing one child is ordinary authoring, not an attack,
* and the compilers cannot fold the expansion away without publishing a schema
* whose members alias each other.
*
* So the cost is BOUNDED rather than paid. {@link validateShape} and
* {@link ContractCompiler} preparation both count the nodes the declaration
* expands into (one per node, summed over every incoming edge) and refuse past
* this cap through {@link refuseExpansion}, with an `expansion`-coded
* {@link ContractError}. Ownership is deliberately NOT bounded by it:
* {@link cloneShape} and {@link ownShape} preserve shared-child identity, so
* they answer a shared-child graph in time proportional to its authored nodes
* and keep working above this cap.
*
* This cap does not bound compilation, because the compilers do not expand a
* DAG. Every artifact family is one entry per unique node, so the boundary
* declaration above compiles its unique nodes in about a millisecond.
* What does expand is what a CONSUMER materializes from the artifacts: the
* value `generate` builds, and the document a compiled schema serializes to,
* are trees of exactly this size. The cap survives as a bound on what a caller
* can be handed, not on what the compiler pays.
*
* @example
* ```ts
* COMPILE_NODE_LIMIT // 16384
* ```
*/
var COMPILE_NODE_LIMIT = 16384;
/**
* Caps at `31` the number of object keys one compiled presence mask carries, frozen.
*
* @remarks
* A compiled object plan decides which declared keys a value carries. The keys
* it asks about are fixed when the plan is built, so the plan assigns each one a
* bit position once and a call ORs one bit per own key it finds and compares the
* result against the full mask — no per-call collection, and one integer compare
* instead of one membership dispatch per declared key.
*
* The bound is the width a JavaScript bitwise operand has: `1 << position`
* evaluates on a 32-bit signed integer, so positions run `0` through `30` and a
* mask stays positive. A declaration with more keys than this is ordinary
* authoring rather than an attack, so it is answered rather than refused:
* {@link ContractCompiler} builds no position record for it and its compiled
* guard, parser, auditor, and reporter decide presence from a collected key
* vocabulary instead. Both branches answer identically; only the cost differs.
*
* @example
* ```ts
* PRESENCE_MASK_LIMIT // 31
* ```
*/
var PRESENCE_MASK_LIMIT = 31;
/**
* Caps at `262144` the number of nodes one JSON snapshot may produce, frozen.
*
* @remarks
* JSON persistence is a TREE, so `cloneJSONValue` / `cloneJSONRecord`
* deliberately duplicate a repeated noncyclic alias into distinct equal
* branches — `clone.primary !== clone.fallback` is a documented guarantee, not
* an accident, and a memo would silently take it away. The price of that
* guarantee is that output size is exponential in the number of shared aliases:
* an ordinary in-memory graph of twenty-one objects, a few hundred bytes,
* produced two million nodes and took seconds, and thirty aliases took hours.
* No attacker is needed — shared references are normal data.
*
* So the cost is BOUNDED rather than paid: the walk counts the nodes it
* produces and refuses past this cap with the ordinary cause-free `clone`
* refusal, which makes the door's worst case a function of this constant
* instead of the caller's input. Size a snapshot against it: a document with
* more than this many nodes — counting every array, record, and leaf the
* snapshot would contain AFTER alias duplication — is refused rather than
* cloned.
*
* @example
* ```ts
* CLONE_NODE_LIMIT // 262144
* ```
*/
var CLONE_NODE_LIMIT = 262144;
/**
* Caps at `32` the number of candidate-generation attempts for a constrained generated
* value, frozen.
*
* @remarks
* Provides one deterministic work bound for generators that must retry a
* candidate against a contract constraint.
*
* @example
* ```ts
* GENERATION_ATTEMPT_LIMIT // 32
* ```
*/
var GENERATION_ATTEMPT_LIMIT = 32;
/**
* Caps at `32` the object/array nesting depth {@link valueToSchema} walks, frozen.
*
* @remarks
* Bounds inference against adversarial or cyclic runtime input — once the
* remaining depth budget reaches zero, inference stops descending and emits
* the empty accept-anything schema `{}` for that branch instead of recursing
* further. LOWERABLE per call through {@link ValueToSchemaLimits.depth}; a
* higher value is held here.
*
* A ceiling rather than a default, because the walk recurses: what a deeper
* walk spends is the JavaScript call stack rather than this budget, and that
* stack is not a fixed quantity. The survivable depth measured on one host rose
* across repeated calls within a single process as the engine optimized, and
* fell to roughly this number under a reduced stack size. Any larger constant
* therefore has a host where it fails, which is why none is published.
*/
var INFER_DEPTH_LIMIT = 32;
/**
* Caps by default at `256` the number of object properties / array elements {@link
* valueToSchema} samples per container, frozen.
*
* @remarks
* Bounds the work (and the emitted schema's size) against a wide record or a
* huge array — properties/elements beyond this cap are never inspected.
* Overridable per call through {@link ValueToSchemaLimits.properties}.
*/
var INFER_BREADTH_LIMIT = 256;
/**
* Caps by default at `12` the number of distinct values a multi-sample slot may hold
* before enum inference gives up and falls back to a bare `type`, frozen.
*
* @remarks
* Bounds how large an `enum` list {@link samplesToSchema} will emit — a slot with distinct-value count at or above this limit is
* treated as unbounded (an ID column, not a category) and never gets an
* `enum` keyword. Overridable per call through {@link ValueToSchemaOptions.enum}
* (which gates whether enum inference runs at all).
*/
var INFER_ENUM_LIMIT = 12;
/**
* Caps at `128` the string length {@link stringToFormat} attempts to classify, frozen.
*
* @remarks
* Bounds per-string format-detection work: a value longer than this returns
* `undefined` immediately, before any pattern match runs. 128 sits
* comfortably above the longest real format token — an RFC 3339 date-time
* with fractional seconds and a UTC offset — so no legitimate classification
* changes; only pathologically long strings (a multi-megabyte payload passed
* as a candidate email/URI) are skipped.
*/
var FORMAT_MAX_LENGTH = 128;
/**
* Holds the pure-regex matchers backing {@link stringToFormat}'s pattern-only
* formats (`uuid` / `email` / `uri`), frozen as data.
*
* @remarks
* The ISO-8601 date/time formats are NOT listed here — they additionally
* require an attempt-guarded `Date` validity check, so their pattern lives
* inline in `stringToFormat` rather than as reusable standalone data.
*/
var FORMAT_PATTERNS = Object.freeze({
	uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	uri: /^[a-z][a-z0-9+.-]*:\/\//i
});
/**
* Carries a machine-readable contract category, optional context, and an exact optional
* cause.
*
* @remarks
* Omitting `cause` omits the own property; explicitly supplying `cause: undefined`
* retains an own property with that value. Both optional options are read as OWN
* properties, so a construction never consults the caller-writable prototype chain of
* the container it was handed.
*
* @example
* ```ts
* const error = new ContractError('Minimum exceeds maximum', {
* 	code: 'range',
* 	context: { path: ['properties', 'age'] },
* })
* ```
*/
var ContractError = class ContractError extends Error {
	name = "ContractError";
	code;
	context;
	/**
	* Creates a contract error.
	*
	* @param message - Human-readable error description
	* @param options - Machine-readable category, optional context, and optional cause
	*/
	constructor(message, options) {
		super(message, INTRINSICS.own(options, "cause") ? { cause: options.cause } : void 0);
		INTRINSICS.define(this, CONTRACT_ERROR_BRAND, {
			value: this,
			configurable: true
		});
		this.code = options.code;
		this.context = INTRINSICS.own(options, "context") ? options.context : void 0;
	}
	static {
		const members = INTRINSICS.reflect.members(this.prototype);
		for (let index = 0; index < members.length; index += 1) {
			const key = members[index];
			if (key === void 0) continue;
			const declared = INTRINSICS.describe(this.prototype, key);
			const accessor = declared !== void 0 && !INTRINSICS.own(declared, "value");
			INTRINSICS.reflect.define(this.prototype, key, accessor ? { configurable: false } : {
				writable: false,
				configurable: false
			});
			const pinned = INTRINSICS.describe(this.prototype, key);
			if (pinned?.configurable !== false || !accessor && pinned.writable !== false) throw new ContractError("ContractError: a prototype member could not be pinned", { code: "structure" });
		}
	}
};
/**
* Checks whether an unknown value is a {@link ContractError}.
*
* @remarks
* Recognition combines a global own-property brand with the native `Error`
* base, a subclass prototype, the fixed name, and a declared contract code.
* The brand stores the error itself and recognition requires that exact
* identity. A transparent proxy is therefore refused because its forwarded
* descriptor still stores the target, not the proxy.
* The brand is recognized across duplicate installations and ESM/CommonJS
* module copies at 0.0.13 or later. A copy earlier than 0.0.13 stamps no brand,
* so an error it throws stays outside the type, and so does a plain or
* property-only lookalike.
*
* @param value - The value to inspect
* @returns True if the value is a `ContractError` instance; false otherwise
*
* @example
* ```ts
* isContractError(new ContractError('Invalid shape', { code: 'placement' })) // true
* isContractError(new Error('Invalid shape')) // false
* ```
*/
function isContractError(value) {
	if (typeof value !== "object" || value === null) return false;
	try {
		if (!(value instanceof INTRINSICS.error) || INTRINSICS.prototype(value) === INTRINSICS.error.prototype) return false;
		if (value.name !== "ContractError" || !("code" in value)) return false;
		if (INTRINSICS.describe(value, CONTRACT_ERROR_BRAND)?.value !== value) return false;
		const code = value.code;
		for (let index = 0; index < CONTRACT_CODES.length; index += 1) if (code === CONTRACT_CODES[index]) return true;
		return false;
	} catch {
		return false;
	}
}
/** Determines whether a value is `null`.
*
* @param value - The value to inspect
* @returns True if the value is `null`; false otherwise
*
* @example
* ```ts
* isNull(null)      // true
* isNull(undefined) // false
* ```
*/
function isNull(value) {
	return value === null;
}
/** Determines whether a value is `undefined`.
*
* @param value - The value to inspect
* @returns True if the value is `undefined`; false otherwise
*
* @example
* ```ts
* isUndefined(undefined) // true
* isUndefined(null)      // false
* ```
*/
function isUndefined(value) {
	return value === void 0;
}
/** Determines whether a value is defined (neither `null` nor `undefined`).
*
* @param value - The value to inspect
* @returns True if the value is defined; false otherwise
*
* @example
* ```ts
* isDefined('hi')     // true
* isDefined(null)     // false
* isDefined(undefined) // false
* ```
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
/** Determines whether a value is a string.
*
* @param value - The value to inspect
* @returns True if the value is a string; false otherwise
*
* @example
* ```ts
* isString('hi') // true
* isString(42)   // false
* ```
*/
function isString(value) {
	return typeof value === "string";
}
/**
* Determines whether a value is a number.
*
* @remarks
* Includes `NaN` and `±Infinity` — use {@link isFiniteNumber} to exclude them.
*
* @param value - The value to inspect
* @returns True if the value is a number; false otherwise
*
* @example
* ```ts
* isNumber(42)         // true
* isNumber(Number.NaN) // true — NaN is still a number
* isNumber('42')       // false
* ```
*/
function isNumber(value) {
	return typeof value === "number";
}
/** Determines whether a value is a finite number (excludes `NaN` and `±Infinity`).
*
* @param value - The value to inspect
* @returns True if the value is a finite number; false otherwise
*
* @example
* ```ts
* isFiniteNumber(42)         // true
* isFiniteNumber(Number.NaN) // false
* isFiniteNumber(Infinity)   // false
* ```
*/
function isFiniteNumber(value) {
	return typeof value === "number" && INTRINSICS.finite(value);
}
/** Determines whether a value is a finite integer (excludes `NaN`, `±Infinity`, and fractional numbers).
*
* @param value - The value to inspect
* @returns True if the value is a finite integer; false otherwise
*
* @example
* ```ts
* isInteger(3)   // true
* isInteger(3.5) // false
* ```
*/
function isInteger(value) {
	return INTRINSICS.integer(value);
}
/**
* Determines whether a value is a finite primitive number at or above positive zero.
*
* @remarks
* Positive fractions pass. Negative zero is rejected explicitly, and no
* coercion or property access is performed for non-number inputs.
*
* @param value - The value to inspect
* @returns True if the value is a finite primitive number greater than or equal
*          to zero, except `-0`; false otherwise
*
* @example
* ```ts
* isNonNegativeNumber(0.5) // true
* isNonNegativeNumber(-0)  // false
* ```
*/
function isNonNegativeNumber(value) {
	return isFiniteNumber(value) && value >= 0 && !INTRINSICS.same(value, -0);
}
/**
* Determines whether a value is a non-negative finite primitive integer.
*
* @remarks
* Composes {@link isNonNegativeNumber} with {@link isInteger}. Representable
* unsafe integers remain integers; safe-integer policy is a separate domain.
*
* @param value - The value to inspect
* @returns True if the value is a non-negative integer other than `-0`; false otherwise
*
* @example
* ```ts
* isNonNegativeInteger(3)   // true
* isNonNegativeInteger(3.5) // false
* ```
*/
function isNonNegativeInteger(value) {
	return isNonNegativeNumber(value) && isInteger(value);
}
/** Determines whether a value is a boolean.
*
* @param value - The value to inspect
* @returns True if the value is a boolean; false otherwise
*
* @example
* ```ts
* isBoolean(true) // true
* isBoolean(1)    // false
* ```
*/
function isBoolean(value) {
	return typeof value === "boolean";
}
/**
* Determines whether a value belongs to the string, number, or boolean literal domain.
*
* @remarks
* Every JavaScript number belongs to this structural domain, including `NaN`,
* `±Infinity`, and signed zero. Declaration and schema policies apply finiteness
* separately where their contracts require it.
*
* @param value - The value to inspect
* @returns True if the value is a string, number, or boolean; false otherwise
*
* @example
* ```ts
* isLiteralValue(Number.NaN) // true
* isLiteralValue(null)       // false
* ```
*/
function isLiteralValue(value) {
	return isString(value) || isNumber(value) || isBoolean(value);
}
/** Determines whether a value is exactly `true`.
*
* @param value - The value to inspect
* @returns True if the value is exactly `true`; false otherwise
*
* @example
* ```ts
* isTrue(true)  // true
* isTrue(false) // false
* ```
*/
function isTrue(value) {
	return value === true;
}
/** Determines whether a value is exactly `false`.
*
* @param value - The value to inspect
* @returns True if the value is exactly `false`; false otherwise
*
* @example
* ```ts
* isFalse(false) // true
* isFalse(true)  // false
* ```
*/
function isFalse(value) {
	return value === false;
}
/** Determines whether a value is a bigint.
*
* @param value - The value to inspect
* @returns True if the value is a bigint; false otherwise
*
* @example
* ```ts
* isBigInt(1n) // true
* isBigInt(1)  // false
* ```
*/
function isBigInt(value) {
	return typeof value === "bigint";
}
/** Determines whether a value is a symbol.
*
* @param value - The value to inspect
* @returns True if the value is a symbol; false otherwise
*
* @example
* ```ts
* isSymbol(Symbol('x')) // true
* isSymbol('x')         // false
* ```
*/
function isSymbol(value) {
	return typeof value === "symbol";
}
/** Determines whether a value is callable.
*
* @param value - The value to inspect
* @returns True if the value is callable; false otherwise
*
* @example
* ```ts
* isFunction(() => {}) // true
* isFunction({})       // false
* ```
*/
function isFunction(value) {
	return typeof value === "function";
}
/** Determines whether a value is a string or `null`.
*
* @param value - The value to inspect
* @returns True if the value is a string or `null`; false otherwise
*
* @example
* ```ts
* isNullableString('hi') // true
* isNullableString(null) // true
* isNullableString(42)   // false
* ```
*/
function isNullableString(value) {
	return value === null || isString(value);
}
/** Determines whether a value is a number or `null` (the number may be `NaN` / `±Infinity`).
*
* @param value - The value to inspect
* @returns True if the value is a number or `null`; false otherwise
*
* @example
* ```ts
* isNullableNumber(42)   // true
* isNullableNumber(null) // true
* isNullableNumber('hi') // false
* ```
*/
function isNullableNumber(value) {
	return value === null || isNumber(value);
}
/** Determines whether a value is a boolean or `null`.
*
* @param value - The value to inspect
* @returns True if the value is a boolean or `null`; false otherwise
*
* @example
* ```ts
* isNullableBoolean(true) // true
* isNullableBoolean(null) // true
* isNullableBoolean(1)    // false
* ```
*/
function isNullableBoolean(value) {
	return value === null || isBoolean(value);
}
/**
* Determines whether a value is an instance of a constructor, contained against
* a throwing `instanceof` check.
*
* @remarks
* The low-level total helper every `instanceof`-based guard in this file (and
* the `instanceOf` combinator) routes through. A bare `value instanceof X` is
* NOT total, which `.claude/rules/patterns.md` § Validation and contracts
* requires: it invokes `getPrototypeOf` on `value` — which a
* revoked `Proxy` or a `getPrototypeOf`-trap `Proxy` throws from — and, when
* `X[Symbol.hasInstance]` is user-defined, can throw from arbitrary code. This
* wraps the check in {@link holds} (see ./helpers.js) so any such throw
* yields `false` instead of escaping.
*
* @param value - The value to test
* @param ctor - The constructor to test against
* @returns True if `value instanceof ctor`; false otherwise, including on a
*          contained throw
*
* @example
* ```ts
* isInstance(new Date(), Date) // true
* isInstance({}, Date)          // false
* ```
*/
function isInstance(value, ctor) {
	const target = ctor;
	return holds(() => isFunction(target) && value instanceof target);
}
/** Determines whether a value is a `Date`.
*
* @param value - The value to inspect
* @returns True if the value is a `Date`; false otherwise
*
* @example
* ```ts
* isDate(new Date()) // true
* isDate('2024-01-01') // false
* ```
*/
function isDate(value) {
	return isInstance(value, Date);
}
/** Determines whether a value is a `RegExp`.
*
* @remarks
* A total native internal-slot brand check rather than a property read: it accepts a
* genuine pattern from this realm and from another, and refuses a proxy or a hand-built
* forgery without reading an advertised field.
*
* @param value - The value to inspect
* @returns True if the value is a `RegExp`; false otherwise
*
* @example
* ```ts
* isRegExp(/a/) // true
* isRegExp('a') // false
* ```
*/
function isRegExp(value) {
	return holds(() => readPatternSource(value) !== void 0);
}
/** Determines whether a value is an `Error`.
*
* @param value - The value to inspect
* @returns True if the value is an `Error`; false otherwise
*
* @example
* ```ts
* isError(new Error('boom')) // true
* isError('boom')             // false
* ```
*/
function isError(value) {
	return isInstance(value, Error);
}
/** Determines whether a value is a native `Promise` (use {@link isPromiseLike} for any thenable).
*
* @param value - The value to inspect
* @returns True if the value is a native `Promise`; false otherwise
*
* @example
* ```ts
* isPromise(Promise.resolve()) // true
* isPromise({ then() {} })     // false
* ```
*/
function isPromise(value) {
	return isInstance(value, Promise);
}
/**
* Determines whether a value is promise-like — an object exposing callable
* `then`, `catch`, and `finally` methods.
*
* @remarks
* Accepts any object with all three methods, not only native `Promise`
* instances. Use {@link isPromise} when you specifically need `instanceof Promise`.
*
* @param value - The value to inspect
* @returns True if the value is promise-like; false otherwise
*
* @example
* ```ts
* isPromiseLike(Promise.resolve())                                // true
* isPromiseLike({ then() {}, catch() {}, finally() {} }) // true
* isPromiseLike({ then() {} })                            // false
* ```
*/
function isPromiseLike(value) {
	return holds(() => {
		if (!isObject(value)) return false;
		const thenValue = INTRINSICS.reflect.read(value, "then");
		const catchValue = INTRINSICS.reflect.read(value, "catch");
		const finallyValue = INTRINSICS.reflect.read(value, "finally");
		return isFunction(thenValue) && isFunction(catchValue) && isFunction(finallyValue);
	});
}
/** Determines whether a value is an `ArrayBuffer`.
*
* @param value - The value to inspect
* @returns True if the value is an `ArrayBuffer`; false otherwise
*
* @example
* ```ts
* isArrayBuffer(new ArrayBuffer(8)) // true
* isArrayBuffer([])                 // false
* ```
*/
function isArrayBuffer(value) {
	return isInstance(value, ArrayBuffer);
}
/**
* Determines whether a value is a `SharedArrayBuffer`.
*
* @remarks
* Guards the global existence of `SharedArrayBuffer` first — safe where it is
* absent or disabled (for example a context that is not cross-origin isolated).
*
* @param value - The value to inspect
* @returns True if the value is a `SharedArrayBuffer`; false otherwise
*
* @example
* ```ts
* isSharedArrayBuffer(new SharedArrayBuffer(8)) // true
* isSharedArrayBuffer(new ArrayBuffer(8))       // false
* ```
*/
function isSharedArrayBuffer(value) {
	return typeof SharedArrayBuffer !== "undefined" && isInstance(value, SharedArrayBuffer);
}
/**
* Determines whether a value implements the iterable protocol (`Symbol.iterator`).
*
* @remarks
* Strings are explicitly included: a string has a callable `Symbol.iterator`
* but is not an object, so the generic object path alone would miss it.
*
* @param value - The value to inspect
* @returns True if the value implements the iterable protocol; false otherwise
*
* @example
* ```ts
* isIterable([1, 2])       // true
* isIterable('abc')        // true
* isIterable({ a: 1 })     // false
* ```
*/
function isIterable(value) {
	return holds(() => {
		if (isString(value)) return true;
		return isObject(value) && isFunction(INTRINSICS.reflect.read(value, Symbol.iterator));
	});
}
/** Determines whether a value implements the async iterable protocol (`Symbol.asyncIterator`).
*
* @param value - The value to inspect
* @returns True if the value implements the async iterable protocol; false otherwise
*
* @example
* ```ts
* isAsyncIterable({ [Symbol.asyncIterator]() {} }) // true
* isAsyncIterable([1, 2])                          // false
* ```
*/
function isAsyncIterable(value) {
	return holds(() => isObject(value) && isFunction(INTRINSICS.reflect.read(value, Symbol.asyncIterator)));
}
/**
* Determines whether a value is a non-null object.
*
* @remarks
* `true` for every non-null object, including an array, a class instance, a
* plain object, a `Map`, and a `Set` — use
* {@link isRecord} when you need a plain-record check.
*
* @param value - The value to inspect
* @returns True if the value is a non-null object; false otherwise
*
* @example
* ```ts
* isObject({})   // true
* isObject([])   // true
* isObject(null) // false
* ```
*/
function isObject(value) {
	return typeof value === "object" && value !== null;
}
/**
* Determines whether a value is a plain record (object literal or null-prototype),
* not an array or class instance.
*
* @remarks
* The total form of the shared {@link matchesRecordBrand} rule, and the only
* one a guard may use: the whole brand runs inside `holds`, as
* `.claude/rules/patterns.md` § Validation and contracts requires, so a
* revoked `Proxy` or a hostile `getPrototypeOf` trap answers `false` instead of
* escaping as a thrown error. Use instead of {@link isObject} to distinguish a
* plain `{}` / `Object.create(null)` — or a plain object from another realm,
* whose prototype is that realm's `Object.prototype` — from arrays, `Date`,
* `Map`, and class instances, including a class whose prototype a caller
* reparented to `null`.
*
* @param value - The value to inspect
* @returns True if the value is a plain record; false otherwise
*
* @example
* ```ts
* isRecord({ a: 1 })         // true
* isRecord(Object.create(null)) // true
* isRecord([])               // false
* isRecord(new Date())       // false
* ```
*/
function isRecord(value) {
	return holds(() => matchesRecordBrand(value));
}
/** Determines whether a value is a `Map`.
*
* @param value - The value to inspect
* @returns True if the value is a `Map`; false otherwise
*
* @example
* ```ts
* isMap(new Map()) // true
* isMap({})        // false
* ```
*/
function isMap(value) {
	return isInstance(value, Map);
}
/** Determines whether a value is a `Set`.
*
* @param value - The value to inspect
* @returns True if the value is a `Set`; false otherwise
*
* @example
* ```ts
* isSet(new Set()) // true
* isSet([])        // false
* ```
*/
function isSet(value) {
	return isInstance(value, Set);
}
/** Determines whether a value is a `WeakMap`.
*
* @param value - The value to inspect
* @returns True if the value is a `WeakMap`; false otherwise
*
* @example
* ```ts
* isWeakMap(new WeakMap()) // true
* isWeakMap({})            // false
* ```
*/
function isWeakMap(value) {
	return isInstance(value, WeakMap);
}
/** Determines whether a value is a `WeakSet`.
*
* @param value - The value to inspect
* @returns True if the value is a `WeakSet`; false otherwise
*
* @example
* ```ts
* isWeakSet(new WeakSet()) // true
* isWeakSet({})            // false
* ```
*/
function isWeakSet(value) {
	return isInstance(value, WeakSet);
}
/** Determines whether a value is an array.
*
* @remarks
* Checks the container alone — no element is inspected. Use {@link arrayOf} to check
* every element against a guard.
*
* @param value - The value to inspect
* @returns True if the value is an array; false otherwise
*
* @example
* ```ts
* isArray([1, 2]) // true
* isArray('12')   // false
* ```
*/
function isArray(value) {
	return holds(() => INTRINSICS.array(value));
}
/** Determines whether a value is a `DataView`.
*
* @param value - The value to inspect
* @returns True if the value is a `DataView`; false otherwise
*
* @example
* ```ts
* isDataView(new DataView(new ArrayBuffer(8))) // true
* isDataView(new ArrayBuffer(8))                // false
* ```
*/
function isDataView(value) {
	return isInstance(value, DataView);
}
/** Determines whether a value is an `ArrayBufferView` (any typed array or `DataView`).
*
* @param value - The value to inspect
* @returns True if the value is an `ArrayBufferView`; false otherwise
*
* @example
* ```ts
* isArrayBufferView(new Uint8Array(4)) // true
* isArrayBufferView([1, 2, 3, 4])       // false
* ```
*/
function isArrayBufferView(value) {
	return holds(() => ArrayBuffer.isView(value));
}
/** Determines whether a value is an `Int8Array`.
*
* @param value - The value to inspect
* @returns True if the value is an `Int8Array`; false otherwise
*
* @example
* ```ts
* isInt8Array(new Int8Array(2)) // true
* isInt8Array(new Uint8Array(2)) // false
* ```
*/
function isInt8Array(value) {
	return isInstance(value, Int8Array);
}
/** Determines whether a value is a `Uint8Array`.
*
* @param value - The value to inspect
* @returns True if the value is a `Uint8Array`; false otherwise
*
* @example
* ```ts
* isUint8Array(new Uint8Array(2)) // true
* isUint8Array(new Int8Array(2))  // false
* ```
*/
function isUint8Array(value) {
	return isInstance(value, Uint8Array);
}
/** Determines whether a value is a `Uint8ClampedArray`.
*
* @param value - The value to inspect
* @returns True if the value is a `Uint8ClampedArray`; false otherwise
*
* @example
* ```ts
* isUint8ClampedArray(new Uint8ClampedArray(2)) // true
* isUint8ClampedArray(new Uint8Array(2))         // false
* ```
*/
function isUint8ClampedArray(value) {
	return isInstance(value, Uint8ClampedArray);
}
/** Determines whether a value is an `Int16Array`.
*
* @param value - The value to inspect
* @returns True if the value is an `Int16Array`; false otherwise
*
* @example
* ```ts
* isInt16Array(new Int16Array(2)) // true
* isInt16Array(new Int8Array(2))  // false
* ```
*/
function isInt16Array(value) {
	return isInstance(value, Int16Array);
}
/** Determines whether a value is a `Uint16Array`.
*
* @param value - The value to inspect
* @returns True if the value is a `Uint16Array`; false otherwise
*
* @example
* ```ts
* isUint16Array(new Uint16Array(2)) // true
* isUint16Array(new Int16Array(2))   // false
* ```
*/
function isUint16Array(value) {
	return isInstance(value, Uint16Array);
}
/** Determines whether a value is an `Int32Array`.
*
* @param value - The value to inspect
* @returns True if the value is an `Int32Array`; false otherwise
*
* @example
* ```ts
* isInt32Array(new Int32Array(2)) // true
* isInt32Array(new Int16Array(2)) // false
* ```
*/
function isInt32Array(value) {
	return isInstance(value, Int32Array);
}
/** Determines whether a value is a `Uint32Array`.
*
* @param value - The value to inspect
* @returns True if the value is a `Uint32Array`; false otherwise
*
* @example
* ```ts
* isUint32Array(new Uint32Array(2)) // true
* isUint32Array(new Int32Array(2))   // false
* ```
*/
function isUint32Array(value) {
	return isInstance(value, Uint32Array);
}
/** Determines whether a value is a `Float32Array`.
*
* @param value - The value to inspect
* @returns True if the value is a `Float32Array`; false otherwise
*
* @example
* ```ts
* isFloat32Array(new Float32Array(2)) // true
* isFloat32Array(new Float64Array(2))  // false
* ```
*/
function isFloat32Array(value) {
	return isInstance(value, Float32Array);
}
/** Determines whether a value is a `Float64Array`.
*
* @param value - The value to inspect
* @returns True if the value is a `Float64Array`; false otherwise
*
* @example
* ```ts
* isFloat64Array(new Float64Array(2)) // true
* isFloat64Array(new Float32Array(2))  // false
* ```
*/
function isFloat64Array(value) {
	return isInstance(value, Float64Array);
}
/**
* Determines whether a value is a `BigInt64Array`.
*
* @remarks
* Guards the global existence of `BigInt64Array` first — safe in environments
* that pre-date the BigInt typed-array additions.
*
* @param value - The value to inspect
* @returns True if the value is a `BigInt64Array`; false otherwise
*
* @example
* ```ts
* isBigInt64Array(new BigInt64Array(2)) // true
* isBigInt64Array(new Float64Array(2))   // false
* ```
*/
function isBigInt64Array(value) {
	return typeof BigInt64Array !== "undefined" && isInstance(value, BigInt64Array);
}
/**
* Determines whether a value is a `BigUint64Array`.
*
* @remarks
* Guards the global existence of `BigUint64Array` first — safe in environments
* that pre-date the BigInt typed-array additions.
*
* @param value - The value to inspect
* @returns True if the value is a `BigUint64Array`; false otherwise
*
* @example
* ```ts
* isBigUint64Array(new BigUint64Array(2)) // true
* isBigUint64Array(new BigInt64Array(2))   // false
* ```
*/
function isBigUint64Array(value) {
	return typeof BigUint64Array !== "undefined" && isInstance(value, BigUint64Array);
}
/** Determines whether a value is the empty string `''`.
*
* @param value - The value to inspect
* @returns True if the value is the empty string `''`; false otherwise
*
* @example
* ```ts
* isEmptyString('')  // true
* isEmptyString('a') // false
* ```
*/
function isEmptyString(value) {
	return isString(value) && value.length === 0;
}
/** Determines whether a value is an empty array.
*
* @param value - The value to inspect
* @returns True if the value is an empty array; false otherwise
*
* @example
* ```ts
* isEmptyArray([])    // true
* isEmptyArray([1])   // false
* ```
*/
function isEmptyArray(value) {
	return holds(() => isArray(value) && value.length === 0);
}
/** Determines whether a value is an empty plain object — no OWN keys at all, of any
* kind: string or symbol, enumerable or not.
*
* @remarks
* The own-key population is the one `recordOf` inspects (`Reflect.ownKeys`), and
* it has to be: this guard narrows to `Record<string | symbol, never>`, so
* counting only ENUMERABLE keys made the narrowing unsound — a record carrying
* an own non-enumerable `hidden: 1` answered `true` here while `recordOf({})`
* saw the key and rejected the same value, and the enumerable-symbol and
* non-enumerable-string cases were treated differently for no stated reason.
*
* @param value - The value to inspect
* @returns True if the value is an empty plain object; false otherwise
*
* @example
* ```ts
* isEmptyObject({})      // true
* isEmptyObject({ a: 1 }) // false
* isEmptyObject(Object.defineProperty({}, 'hidden', { value: 1 })) // false
* ```
*/
function isEmptyObject(value) {
	return holds(() => isRecord(value) && INTRINSICS.reflect.members(value).length === 0);
}
/** Determines whether a value is an empty `Map`.
*
* @param value - The value to inspect
* @returns True if the value is an empty `Map`; false otherwise
*
* @example
* ```ts
* isEmptyMap(new Map())            // true
* isEmptyMap(new Map([['a', 1]]))  // false
* ```
*/
function isEmptyMap(value) {
	return holds(() => isMap(value) && value.size === 0);
}
/** Determines whether a value is an empty `Set`.
*
* @param value - The value to inspect
* @returns True if the value is an empty `Set`; false otherwise
*
* @example
* ```ts
* isEmptySet(new Set())    // true
* isEmptySet(new Set([1])) // false
* ```
*/
function isEmptySet(value) {
	return holds(() => isSet(value) && value.size === 0);
}
/** Determines whether a value is a non-empty string (at least one character).
*
* @param value - The value to inspect
* @returns True if the value is a non-empty string; false otherwise
*
* @example
* ```ts
* isNonEmptyString('a') // true
* isNonEmptyString('')  // false
* ```
*/
function isNonEmptyString(value) {
	return isString(value) && value.length > 0;
}
/** Determines whether a value is a non-empty array (at least one element).
*
* @param value - The value to inspect
* @returns True if the value is a non-empty array; false otherwise
*
* @example
* ```ts
* isNonEmptyArray([1]) // true
* isNonEmptyArray([])  // false
* ```
*/
function isNonEmptyArray(value) {
	return holds(() => isArray(value) && value.length > 0);
}
/** Determines whether a value is a non-empty plain object — at least one own key of
* any kind: string or symbol, enumerable or not.
*
* @remarks
* The exact negation of {@link isEmptyObject} over the same own-key population;
* see there for why enumerability is not part of the rule.
*
* @param value - The value to inspect
* @returns True if the value is a non-empty plain object; false otherwise
*
* @example
* ```ts
* isNonEmptyObject({ a: 1 }) // true
* isNonEmptyObject({})       // false
* ```
*/
function isNonEmptyObject(value) {
	return holds(() => isRecord(value) && INTRINSICS.reflect.members(value).length > 0);
}
/** Determines whether a value is a non-empty `Map` (at least one entry).
*
* @param value - The value to inspect
* @returns True if the value is a non-empty `Map`; false otherwise
*
* @example
* ```ts
* isNonEmptyMap(new Map([['a', 1]])) // true
* isNonEmptyMap(new Map())            // false
* ```
*/
function isNonEmptyMap(value) {
	return holds(() => isMap(value) && value.size > 0);
}
/** Determines whether a value is a non-empty `Set` (at least one element).
*
* @param value - The value to inspect
* @returns True if the value is a non-empty `Set`; false otherwise
*
* @example
* ```ts
* isNonEmptySet(new Set([1])) // true
* isNonEmptySet(new Set())    // false
* ```
*/
function isNonEmptySet(value) {
	return holds(() => isSet(value) && value.size > 0);
}
/** Determines whether a value is a function that declares zero parameters (`Function.length === 0`).
*
* @param value - The value to inspect
* @returns True if the value is a function that declares zero parameters; false otherwise
*
* @example
* ```ts
* isZeroArg(() => {})    // true
* isZeroArg((a) => a)    // false
* ```
*/
function isZeroArg(value) {
	return holds(() => isFunction(value) && value.length === 0);
}
/**
* Determines whether a value is a native `async function`.
*
* @remarks
* Uses `constructor.name === 'AsyncFunction'` — not `instanceof`, which is
* unreliable across realms. The `?.` keeps the guard total, as
* `.claude/rules/patterns.md` § Validation and contracts requires: a function
* whose `constructor` was nulled yields `undefined`, never a thrown `null.name`.
*
* @param value - The value to inspect
* @returns True if the value is a native `async function`; false otherwise
*
* @example
* ```ts
* isAsyncFunction(async () => {}) // true
* isAsyncFunction(() => {})       // false
* ```
*/
function isAsyncFunction(value) {
	return holds(() => isFunction(value) && value.constructor?.name === "AsyncFunction");
}
/** Determines whether a value is a generator function (`function*`).
*
* @param value - The value to inspect
* @returns True if the value is a generator function; false otherwise
*
* @example
* ```ts
* isGeneratorFunction(function* () {}) // true
* isGeneratorFunction(() => {})        // false
* ```
*/
function isGeneratorFunction(value) {
	return holds(() => isFunction(value) && value.constructor?.name === "GeneratorFunction");
}
/** Determines whether a value is an async generator function (`async function*`).
*
* @param value - The value to inspect
* @returns True if the value is an async generator function; false otherwise
*
* @example
* ```ts
* isAsyncGeneratorFunction(async function* () {}) // true
* isAsyncGeneratorFunction(function* () {})       // false
* ```
*/
function isAsyncGeneratorFunction(value) {
	return holds(() => isFunction(value) && value.constructor?.name === "AsyncGeneratorFunction");
}
/** Determines whether a value is a zero-argument async function.
*
* @param value - The value to inspect
* @returns True if the value is a zero-argument async function; false otherwise
*
* @example
* ```ts
* isZeroArgAsync(async () => {}) // true
* isZeroArgAsync(async (a) => a) // false
* ```
*/
function isZeroArgAsync(value) {
	return isZeroArg(value) && isAsyncFunction(value);
}
/** Determines whether a value is a zero-argument generator function.
*
* @param value - The value to inspect
* @returns True if the value is a zero-argument generator function; false otherwise
*
* @example
* ```ts
* isZeroArgGenerator(function* () {})  // true
* isZeroArgGenerator(function* (a) {}) // false
* ```
*/
function isZeroArgGenerator(value) {
	return isZeroArg(value) && isGeneratorFunction(value);
}
/** Determines whether a value is a zero-argument async generator function.
*
* @param value - The value to inspect
* @returns True if the value is a zero-argument async generator function; false otherwise
*
* @example
* ```ts
* isZeroArgAsyncGenerator(async function* () {})  // true
* isZeroArgAsyncGenerator(async function* (a) {}) // false
* ```
*/
function isZeroArgAsyncGenerator(value) {
	return isZeroArg(value) && isAsyncGeneratorFunction(value);
}
/**
* Determines whether a value can be used as a `new`-target constructor.
*
* @remarks
* Probes with `Reflect.construct(String, [], value)`: a real constructor
* succeeds, while arrow functions, plain functions, and non-functions throw
* and yield `false`. Never throws. Backs the `instanceOf` combinator.
*
* @param value - The value to inspect
* @returns True if the value can be used as a `new`-target constructor; false otherwise
*
* @example
* ```ts
* isConstructor(class X {}) // true
* isConstructor(() => {})    // false
* ```
*/
function isConstructor(value) {
	return holds(() => {
		if (!isFunction(value)) return false;
		INTRINSICS.reflect.construct(String, [], value);
		return true;
	});
}
/**
* Determines whether a value is a cycle-safe JSON value.
*
* @remarks
* Total guard: never throws, returns `false` for cycles, functions, `Date`
* instances, class instances, `NaN`, and `±Infinity`. Arrays and plain records
* are walked with an ancestor set so recursive input fails instead of hanging.
* The whole walk runs inside `holds`, as `.claude/rules/patterns.md`
* § Validation and contracts requires: a hostile getter on a
* record property, or a revoked `Proxy` anywhere in the structure, is caught
* and yields `false` instead of escaping as a thrown error.
*
* @param value - The value to test
* @returns True if the value has a JSON representation; false otherwise
*
* @example
* ```ts
* isJSONValue({ nested: [1, 'x', null] }) // true
* isJSONValue(Number.NaN)                 // false
* ```
*/
function isJSONValue(value) {
	return holds(() => matchesJSONValue(value, new INTRINSICS.weakSet()));
}
/**
* Determines whether a value is JSON-valid within the fixed container-depth limit.
*
* @remarks
* Runs the total depth predicate before the existing JSON guard. These are
* sequential observations of caller-owned input, not an atomic snapshot.
*
* @param value - The value to inspect
* @returns True if the value is both depth-bounded and a valid {@link JSONValue}; false otherwise
*
* @example
* ```ts
* isBoundedJSONValue({ nested: [1] }) // true
* isBoundedJSONValue(new Date())      // false
* ```
*/
function isBoundedJSONValue(value) {
	return matchesJSONDepth(value) && isJSONValue(value);
}
/**
* Determines whether a value is a depth-bounded JSON record.
*
* @remarks
* Requires the existing plain-record root invariant before applying
* {@link isBoundedJSONValue}. Arrays therefore remain valid bounded JSON
* values but never bounded JSON records.
*
* @param value - The value to inspect
* @returns True if the value is a plain-record-rooted bounded JSON value; false otherwise
*
* @example
* ```ts
* isBoundedJSONRecord({ value: 1 }) // true
* isBoundedJSONRecord([1])          // false
* ```
*/
function isBoundedJSONRecord(value) {
	return isRecord(value) && isBoundedJSONValue(value);
}
/**
* Determines whether a value is a primitive JSON value.
*
* @remarks
* The flat leaf of any JSON document: `null`, a string, a **finite** number, or
* a boolean. Uses {@link isFiniteNumber} (not {@link isNumber}) because real JSON
* carries no `NaN` / `±Infinity` — `JSON.stringify(NaN)` is `'null'`.
*
* The recursive {@link isJSONValue} guard is shipped and stays total with
* cycle-safe walking. Dedicated `isJSONObject` / `isJSONSchema` validators and
* the broad `JSONSchemaDefinition` remain omitted; compose narrower shapes with
* the combinators and gate untrusted strings with `parseJSON` / `parseJSONAs`.
*
* @param value - The value to test
* @returns True if `value` is `null`, a string, a finite number, or a boolean; false otherwise
*
* @example
* ```ts
* isJSONPrimitive(null)        // true
* isJSONPrimitive('hi')        // true
* isJSONPrimitive(42)          // true
* isJSONPrimitive(Number.NaN)  // false — not representable in JSON
* isJSONPrimitive({})          // false
* ```
*/
function isJSONPrimitive(value) {
	return isNull(value) || isString(value) || isFiniteNumber(value) || isBoolean(value);
}
/**
* Builds a diagnostic path from an existing path and further segments, without
* dispatching through array iteration.
*
* @remarks
* `[...path, key]` reads well and dispatches through
* `Array.prototype[Symbol.iterator]`, a member every caller can write — and the
* damaging installation is not a thrower but a LIAR. An iterator yielding one
* extra value before the array's real contents turns a refusal this package
* authored into `path: ['INJECTED', 'properties', 'INJECTED']`, so the caller
* writes their own text into a diagnostic this package published. An indexed
* walk reads only own index properties of an array this package owns, and a
* rest parameter collects its arguments without an iterator either, so nothing
* on the path is caller-reachable.
*
* @param path - The path segments accumulated so far
* @param segments - Further segments to append in order; an absent segment is
*                   omitted, so an optional level needs no branch at the call site
* @returns A fresh path carrying every existing segment and each new one
*
* @example
* ```ts
* pathOf(['properties'], 'age') // ['properties', 'age']
* pathOf(path)                  // an owned copy
* ```
*/
function pathOf(path, ...segments) {
	const extended = [];
	for (let index = 0; index < path.length; index += 1) {
		const existing = path[index];
		if (existing === void 0) continue;
		extended[extended.length] = existing;
	}
	for (let index = 0; index < segments.length; index += 1) {
		const segment = segments[index];
		if (segment === void 0) continue;
		extended[extended.length] = segment;
	}
	return extended;
}
/**
* Appends every element of one array onto another, by index.
*
* @remarks
* The sibling of {@link pathOf}, for the other shape the same defect takes.
* `target[target.length] = ...source` and `[summary, ...rest]` both dispatch through
* `Array.prototype[Symbol.iterator]`, and a caller-installed iterator that
* yields one extra value writes the caller's text into a diagnostic this
* package publishes as its own. Both operands here are arrays this package
* built, and an indexed read of an own index property dispatches through
* nothing.
*
* @param target - The array to extend in place
* @param source - The elements to append, read by index
*
* @example
* ```ts
* appendEntries(faults, compileReporter(inner, raw, pathOf(path, key)))
* ```
*/
function appendEntries(target, source) {
	for (let index = 0; index < source.length; index += 1) {
		const entry = source[index];
		if (entry === void 0) continue;
		target[target.length] = entry;
	}
}
/**
* Takes at most `limit` leading elements of an array, by index.
*
* @remarks
* `Array.prototype.slice` is a caller-writable member on every path that bounds
* a published report, so a substitute decides how much of a diagnostic the
* caller sees. Returns the input untouched when it already fits, so a bounded
* report allocates nothing in the ordinary case.
*
* @param entries - The entries to bound
* @param limit - The maximum number of leading entries to retain
* @returns The input when it already fits, otherwise a fresh bounded copy
*
* @example
* ```ts
* limitEntries(faults, FAULT_LIMIT)
* ```
*/
function limitEntries(entries, limit) {
	if (entries.length <= limit) return entries;
	const bounded = [];
	for (let index = 0; index < limit; index += 1) {
		const entry = entries[index];
		if (entry === void 0) continue;
		bounded[bounded.length] = entry;
	}
	return bounded;
}
/**
* Orders two primitive keys or indices ascending.
*
* @remarks
* The comparison {@link sortValues} hands to the captured sort, extracted rather
* than written inline. `Reflect.apply` takes its arguments as a LIST, so an
* inline comparator is a function expression inside an array literal rather than
* one passed directly as an argument — a hidden function assignment, which this
* repository forbids wherever it appears because a function that is not a named
* declaration is a function no caller can reach and no test can exercise. As a
* declaration it is both. The comparison is `<` / `>` on primitives, which
* dispatches through nothing: no `valueOf`, no `toString`, and no member a
* caller can replace, so the order a published schema is emitted in is decided
* by the values and not by the environment.
*
* @param left - The value ordered first when it compares lower
* @param right - The value compared against
* @returns `-1`, `1`, or `0` as `left` sorts before, after, or with `right`
*
* @example
* ```ts
* compareValues('a', 'b') // -1
* ```
*/
function compareValues(left, right) {
	return left < right ? -1 : left > right ? 1 : 0;
}
/**
* Orders primitive keys or indices deterministically, on an owned copy, through
* the captured sort.
*
* @remarks
* Every schema this package emits is ordered so the same input produces the
* same bytes, and `Array.prototype.sort` is a caller-writable member on every
* one of those paths: a substitute that empties its receiver made
* `valueToSchema({ b: 1, a: 2 })` publish `{"type":"object","additionalProperties":false}`
* — a successful answer with the caller's properties silently gone. The copy is
* taken first so a caller-owned array is never reordered in place, and the order
* is decided by {@link compareValues}, whose `<` / `>` comparison dispatches
* through nothing.
*
* @param values - The keys or indices to order
* @returns A fresh array in ascending order
*
* @example
* ```ts
* sortValues(['b', 'a']) // ['a', 'b']
* ```
*/
function sortValues(values) {
	const owned = [];
	for (let index = 0; index < values.length; index += 1) {
		const value = values[index];
		if (value === void 0) continue;
		owned[owned.length] = value;
	}
	INTRINSICS.reflect.apply(INTRINSICS.order, owned, [compareValues]);
	return owned;
}
/**
* Collects an array's entries into a membership collection this package owns.
*
* @remarks
* THE builder behind every declared vocabulary, and the first half of the answer
* to a defect that survived three rounds by moving rather than closing. A guard
* deciding membership with `set.has(value)` answers whatever the caller most
* recently installed on `Set.prototype`, and answering it instead through the
* `has` method of an exported class only moved the writable member one prototype
* up: `Vocabulary.prototype.has = () => true` reproduced the whole defect at
* nineteen door groups. There is no property lookup here to redirect —
* membership is asked of a MODULE BINDING, which the specification makes
* immutable to every importer, over operations {@link INTRINSICS} captured while
* it evaluated.
*
* Collection is by INDEX rather than from an iterable on purpose:
* `new Set(values)` reads `Symbol.iterator` off the argument and `add` off the
* instance, so building from an iterable would reintroduce two replaceable
* dispatches to remove one.
*
* @param values - The members to collect, read by index
* @returns A collection no caller holds a reference to
*
* @example
* ```ts
* const allowed = collectMembers(['admin', 'guest'])
* matchesMember(allowed, 'admin') // true
* ```
*/
function collectMembers(values) {
	const members = new INTRINSICS.set();
	for (let index = 0; index < values.length; index += 1) INTRINSICS.reflect.apply(INTRINSICS.admit, members, [values[index]]);
	return members;
}
/**
* Determines whether a value is a member of a collected vocabulary, by
* SameValueZero.
*
* @remarks
* Dispatched through the captured `Set.prototype.has` onto a collection no caller
* holds, and asked as a module binding rather than as a property: `set.has(value)` asks
* a member every caller can rewrite, and moving that read onto an exported class's
* `has` method reproduced the identical defect one prototype higher, because every
* public class method is dispatched through a reachable prototype.
*
* @param members - The vocabulary to ask, built by {@link collectMembers}
* @param value - The value to test for membership
* @returns True if the value was collected; false otherwise
*
* @example
* ```ts
* matchesMember(collectMembers([Number.NaN]), Number.NaN) // true — SameValueZero
* ```
*/
function matchesMember(members, value) {
	return INTRINSICS.reflect.apply(INTRINSICS.member, members, [value]) === true;
}
/**
* Collects one more member into a vocabulary that grows as a walk proceeds.
*
* @remarks
* Collects through the captured adder, for a vocabulary that grows as a walk proceeds —
* a uniqueness gate, a de-duplicating key population.
*
* @param members - The vocabulary to extend
* @param value - The value to admit
*
* @example
* ```ts
* const seen = collectMembers([])
* admitMember(seen, 'a')
* matchesMember(seen, 'a') // true
* ```
*/
function admitMember(members, value) {
	INTRINSICS.reflect.apply(INTRINSICS.admit, members, [value]);
}
/**
* Determines whether an object is already on a traversal's active path.
*
* @remarks
* The visitation half, and the one an earlier ruling wrongly excused as safe
* because "a redirect corrupts it inside a boundary and the door refuses, which
* is loud". It is not loud in the direction that matters:
* `WeakSet.prototype.has` answering `false` does not make a cyclic clone refuse,
* it removes the door's termination bound, and a door that never returns is the
* one failure a containment boundary cannot report. Every walk's termination
* therefore rests on a captured operation rather than on a caller-writable one.
*
* @param visited - The active-path set this traversal owns
* @param value - The object to test
* @returns True if the object is already on the active path; false otherwise
*
* @example
* ```ts
* const active = new WeakSet<object>()
* admitVisited(active, node)
* matchesVisited(active, node) // true
* ```
*/
function matchesVisited(visited, value) {
	return INTRINSICS.reflect.apply(INTRINSICS.tracked, visited, [value]) === true;
}
/**
* Records an object as entered on a traversal's active path.
*
* @remarks
* Records through the captured `WeakSet.prototype.add`, on the same terms {@link
* matchesVisited} states for the membership answer.
*
* @param visited - The active-path set this traversal owns
* @param value - The object being entered
*
* @example
* ```ts
* admitVisited(active, node)
* ```
*/
function admitVisited(visited, value) {
	INTRINSICS.reflect.apply(INTRINSICS.track, visited, [value]);
}
/**
* Records an object as exited from a traversal's active path.
*
* @remarks
* Records through the captured `WeakSet.prototype.delete`, on the same terms {@link
* matchesVisited} states for the membership answer.
*
* @param visited - The active-path set this traversal owns
* @param value - The object being exited
*
* @example
* ```ts
* omitVisited(active, node)
* ```
*/
function omitVisited(visited, value) {
	INTRINSICS.reflect.apply(INTRINSICS.untrack, visited, [value]);
}
/**
* Records one node's answer at one remaining-depth allowance in a shared memo.
*
* @remarks
* A depth-bounded walk answers the same node differently depending on how much
* allowance was left when it arrived, so each node keeps a `Map` of answers
* inside one `WeakMap`. Written inline, the get-or-create ferried that map out
* of the branch that built it through a `let`, three times over across the two
* container branches of value inference and the schema-inversion walk. Written
* once it is one statement per caller, and the captured `WeakMap`/`Map` members
* stay the only ones all three dispatch through — a substituted `WeakMap.prototype.get` that
* answered a decoy map would otherwise decide what a later call replays.
*
* @param memo - The per-node depth memo this walk owns
* @param node - The source node the answer was computed for
* @param depth - The remaining-depth allowance the answer was computed under
* @param answer - The answer to record for that node at that allowance
*
* @example
* ```ts
* const memo = new WeakMap<object, Map<number, string>>()
* retainDepth(memo, node, 8, 'answer')
* memo.get(node)?.get(8) // 'answer'
* ```
*/
function retainDepth(memo, node, depth, answer) {
	const known = INTRINSICS.reflect.apply(INTRINSICS.recall, memo, [node]);
	const depths = known || new INTRINSICS.map();
	if (!known) INTRINSICS.reflect.apply(INTRINSICS.retain, memo, [node, depths]);
	INTRINSICS.reflect.apply(INTRINSICS.store, depths, [depth, answer]);
}
/**
* Builds one empty {@link SampleMemo} node.
*
* @remarks
* The root a multi-sample walk starts from and the node every further row
* prefix is grown into, built from the CAPTURED `WeakMap` and `Map` so a
* replaced global cannot decide what a published schema is served from. One
* memo belongs to one walk: {@link samplesToSchema} builds one at the door and
* grows a fresh node per row prefix inside it.
*
* @returns An empty memo node with no recorded rows and no recorded schemas
*
* @example
* ```ts
* buildSampleMemo() // { rows: WeakMap {}, schemas: Map {} }
* ```
*/
function buildSampleMemo() {
	return {
		rows: new INTRINSICS.weakMap(),
		schemas: new INTRINSICS.map()
	};
}
/**
* Checks that a value really is a {@link SampleMemo} before a walk stores a
* published schema in it.
*
* @remarks
* The memo reaches a `WeakMap` and a `Map` the walk stored a node in, and a
* wrong value there fails inside the traversal and is published as
* `samples could not be read` — a true refusal naming the wrong argument. This
* refuses under the memo's own name and its own path instead. The multi-sample
* walk asks it of every node it reads back out of its own prefix chain.
*
* @param memo - The candidate memo
* @param reader - The door name the refusal is published under
* @returns The same memo when it carries a real `rows` `WeakMap` and `schemas` `Map`
* @throws {ContractError} When the memo is not a `SampleMemo`
*
* @example
* ```ts
* readSampleMemo(buildSampleMemo(), 'samplesToSchema') // the same memo
* ```
*/
function readSampleMemo(memo, reader) {
	if (!isObject(memo) || !isWeakMap(memo.rows) || !isMap(memo.schemas)) throw new ContractError(`${reader}: memo must be a sample memo`, {
		code: "structure",
		context: {
			path: ["memo"],
			limit: "SampleMemo",
			received: preview(memo)
		}
	});
	return memo;
}
/**
* Builds the collector a captured `forEach` sweep appends through.
*
* @remarks
* Extracted rather than written inline for the same reason
* {@link compareValues} is: `Reflect.apply` takes its arguments as a LIST, so an
* inline collector is a function expression inside an array literal rather than
* one passed directly as an argument — a hidden function assignment this
* repository forbids wherever it appears. Returned directly from a factory it is
* both named and testable. Both sweeps hand the callback `(value, key)`; a `Set`
* passes its entry in both positions, so one collector serves both.
*
* @param target - The pair list to append each swept entry onto
* @returns The collector a captured `forEach` invokes per entry
*
* @example
* ```ts
* const collected: unknown[][] = []
* new Set(['a']).forEach(collectEntries(collected)) // [['a', 'a']]
* ```
*/
function collectEntries(target) {
	return (value, key) => {
		target[target.length] = [key, value];
	};
}
/**
* Snapshots the genuine contents of a caller's `Set` without running an iterator.
*
* @remarks
* `Set.prototype[Symbol.iterator]` is a caller-writable member, and every other
* view of the same collection disagrees with a replaced one: an iterator that
* silently skips the non-string in `new Set(['a', 42])` made `setOf(isString)`
* answer `true` while `forEach` and `size` still reported the real contents. The
* sibling `arrayOf` already read its caller's collection through captured
* reflection, so the exclusion was not even self-consistent within one file.
* `forEach` is the only complete view of `[[SetData]]` that runs no iterator, so
* it is dispatched here from the captured table.
*
* @param value - The set whose genuine entries to snapshot
* @returns A frozen entry snapshot, or a failure carrying the exact thrown value
*
* @example
* ```ts
* readSetEntries(new Set(['a', 42])) // { success: true, value: ['a', 42] }
* ```
*/
function readSetEntries(value) {
	return attempt(() => {
		const collected = [];
		INTRINSICS.reflect.apply(INTRINSICS.sweep, value, [collectEntries(collected)]);
		const entries = [];
		for (let index = 0; index < collected.length; index += 1) {
			const pair = collected[index];
			if (pair === void 0) continue;
			entries[entries.length] = pair[1];
		}
		return INTRINSICS.freeze(entries);
	});
}
/**
* Snapshots the genuine entries of a caller's `Map` without running an iterator.
*
* @remarks
* The `Map` half of {@link readSetEntries}, with one further replaceable
* dispatch removed: destructuring `for (const [key, value] of map)` reads
* `Map.prototype[Symbol.iterator]` AND `Array.prototype[Symbol.iterator]` for
* every pair, so a substituting iterator could rename a key or replace a value
* while every downstream structural check still passed. Each pair is read
* positionally from a list this package built.
*
* @param value - The map whose genuine entries to snapshot
* @returns A frozen `[key, value]` pair snapshot, or a failure carrying the exact thrown value
*
* @example
* ```ts
* readMapEntries(new Map([['a', 1]])) // { success: true, value: [['a', 1]] }
* ```
*/
function readMapEntries(value) {
	return attempt(() => {
		const collected = [];
		INTRINSICS.reflect.apply(INTRINSICS.pairs, value, [collectEntries(collected)]);
		return INTRINSICS.freeze(collected);
	});
}
/**
* Reads a regular expression's source text through the captured accessor.
*
* @remarks
* `RegExp.prototype.source` is an ACCESSOR on a shared prototype, so replacing
* its getter changes what every pattern in the realm reports — not only the
* caller's own. A getter answering `'.*'` made `compileSchema` publish
* `pattern: ".*"` inside a frozen schema and made `isRegExp('x')` answer `true`.
* Reading the descriptor per call, as an earlier round did, captures nothing:
* capture is decided by WHEN the reference is taken.
*
* @param pattern - The candidate regular expression to read
* @returns The pattern's source text, or `undefined` when it cannot be read as a string
* @throws The exact value the captured accessor throws for a receiver that is not a pattern
*
* @example
* ```ts
* readPatternSource(/^a+$/) // '^a+$'
* ```
*/
function readPatternSource(pattern) {
	const read = INTRINSICS.expression;
	if (read === void 0) return void 0;
	const source = INTRINSICS.reflect.apply(read, pattern, []);
	return isString(source) ? source : void 0;
}
/**
* Reads a regular expression's flag text through the captured accessor.
*
* @remarks
* The flags half of {@link readPatternSource}, on the same captured-accessor terms and
* for the same reason.
*
* @param pattern - The candidate regular expression to read
* @returns The pattern's flag text, or `undefined` when it cannot be read as a string
* @throws The exact value the captured accessor throws for a receiver that is not a pattern
*
* @example
* ```ts
* readPatternFlags(/^a+$/giu) // 'giu'
* ```
*/
function readPatternFlags(pattern) {
	const read = INTRINSICS.modifiers;
	if (read === void 0) return void 0;
	const flags = INTRINSICS.reflect.apply(read, pattern, []);
	return isString(flags) ? flags : void 0;
}
/**
* Determines whether a string is in the language of a pattern this package owns.
*
* @remarks
* The pattern-membership answer, asked exactly as {@link matchesMember} asks the
* literal one, and asked through `exec` rather than `test` on purpose:
* `RegExp.prototype.test` is spec-defined in terms of `RegExpExec`, which
* re-reads `exec` off the receiver, so even a CAPTURED `test` still answers
* whatever the caller installed. Replacing either member decided what `matchOf`,
* `stringOf`, `contract.is`, `contract.parse`, `audit`, `explain` and the format
* inferers published — a wrong yes for a non-member and a wrong no for a member,
* silently.
*
* @param pattern - The owned pattern to apply
* @param value - The string to test
* @returns True if the pattern genuinely matches; false otherwise
*
* @example
* ```ts
* matchesPattern(/^[0-9a-f]+$/, '1a2f') // true
* ```
*/
function matchesPattern(pattern, value) {
	return INTRINSICS.reflect.apply(INTRINSICS.captures, pattern, [value]) !== null;
}
/**
* Rebuilds a caller's regular expression as a stateless pattern this package
* owns.
*
* @remarks
* Strips the stateful `g` / `y` flags so repeated checks are stable and the
* caller's `lastIndex` never moves. The strip is an INDEXED character filter
* rather than `String.prototype.replaceAll`, which is itself a caller-writable
* member: a substitute answering `'i'` made `matchOf(/^abc$/)` accept `'ABC'` —
* the package building a case-insensitive pattern the developer never wrote.
*
* @param pattern - The caller's regular expression
* @returns An owned, stateless equivalent
* @throws The exact value thrown when the pattern's source or flags cannot be read
*
* @example
* ```ts
* readPattern(/^a+$/gy) // /^a+$/
* ```
*/
function readPattern(pattern) {
	const source = readPatternSource(pattern);
	const flags = readPatternFlags(pattern);
	if (source === void 0 || flags === void 0) throw new INTRINSICS.error("Pattern source and flags could not be read");
	let stateless = "";
	for (let index = 0; index < flags.length; index += 1) {
		const flag = flags[index];
		if (flag === void 0 || flag === "g" || flag === "y") continue;
		stateless += flag;
	}
	return new INTRINSICS.pattern(source, stateless);
}
/**
* Rebuilds a declaration's regular expression as a stateless pattern this
* package owns, and refuses an unreadable one under the reader's own name.
*
* @remarks
* The one construction the compiled string leaves and `stringOf` share.
* {@link readPattern} strips `g` and `y`, so the result carries no `lastIndex`
* an answer could move and one rebuild answers every value alike — which is
* what lets a compiled door take the read while the plan is built and hold the
* rebuild for the plan's life, instead of minting a `RegExp` per answered
* value. The read runs through {@link readValue}, so a source or flags that
* cannot be read refuses with this module's uniform `pattern` diagnostic under
* the reader that asked, rather than with the host's raw `TypeError`.
*
* @param pattern - The declaration's regular expression to rebuild
* @param reader - The public reader name the diagnostic carries
* @returns An owned, stateless equivalent of the declaration's pattern
* @throws {ContractError} Thrown when the pattern's source or flags cannot be
*         read, coded `pattern` as `<reader>: pattern could not be read`
*
* @example
* ```ts
* ownPattern(/^a+$/gy, 'stringOf') // /^a+$/
* ```
*/
function ownPattern(pattern, reader) {
	return readValue(() => readPattern(pattern), reader, {
		subject: "pattern",
		code: "pattern",
		context: { shape: "string" }
	});
}
/**
* Pins every own member of a class prototype as a non-configurable member —
* non-writable too when it is a data property — and verify the pin took.
*
* @remarks
* The other half of the structural answer. Membership answers moved off class
* methods entirely, but a class this package EXPORTS still has methods its own
* modules dispatch through — `cloneShape` reaches `ShapeCloner.prototype.clone`,
* and one assignment there made `compileSchema` publish whatever the caller
* chose while `compileSchema` itself was never touched. That is the same defect
* as a replaced host member with the package's own name on it, so every exported
* class pins its prototype while it is DEFINED.
*
* The pin buys exactly this: no code that runs AFTER this class is defined can
* replace a member on its prototype. It reaches no earlier, in exactly the case
* {@link INTRINSICS} already states and does not defend — ESM evaluates imports
* in source order, so a module that evaluates before this package has already
* run.
*
* Placement goes through the captured `Reflect.defineProperty`, which ANSWERS
* instead of throwing, and the answer is then corroborated by reading the
* descriptor back. Installing is not reading: a pin that silently did not happen
* is indistinguishable from one that did until something asks, so this asks. The
* residual is named rather than denied: an adversary who also answers the
* verifying descriptor read defeats this, and that adversary already chose what
* {@link INTRINSICS} captured.
*
* {@link ContractError} is the one exempt class, and it inlines this body rather
* than calling it: `errors.ts` sits beneath this module in the graph — this file
* imports it — so reaching back for the helper would invert the dependency, the
* same reason {@link isContractError} carries its own `try` / `catch`. That copy
* is held aligned with this one, accessor branch and answering placement
* included. Every other exported class calls this helper.
*
* @param prototype - The class prototype to pin
* @param owner - The class name used in the refusal
* @throws {ContractError} When a member cannot be pinned or the pin cannot be verified
*
* @example
* ```ts
* class Widget { static { pinMembers(Widget.prototype, 'Widget') } }
* ```
*/
function pinMembers(prototype, owner) {
	const members = INTRINSICS.reflect.members(prototype);
	for (let index = 0; index < members.length; index += 1) {
		const key = members[index];
		if (key === void 0) continue;
		const declared = INTRINSICS.describe(prototype, key);
		const accessor = declared !== void 0 && !INTRINSICS.own(declared, "value");
		INTRINSICS.reflect.define(prototype, key, accessor ? { configurable: false } : {
			writable: false,
			configurable: false
		});
		const pinned = INTRINSICS.describe(prototype, key);
		if (pinned?.configurable !== false || !accessor && pinned.writable !== false) throw new ContractError(`${owner}: a prototype member could not be pinned`, {
			code: "structure",
			context: {
				shape: owner,
				received: preview(key)
			}
		});
	}
}
/**
* Invokes a callback once and synchronously captures its exact outcome as a
* {@link Result}.
*
* @remarks
* The sanctioned never-throw boundary for the guards, required by
* `.claude/rules/patterns.md` § Validation and contracts. The
* `whereOf`, `lazyOf`, and `transformOf` combinators invoke caller-supplied
* callbacks *inside* a guard body, yet a guard must NEVER throw — it returns a
* `boolean`. This converts a throwing callback into a `Failure` so the
* surrounding guard can treat it as a non-match instead of propagating the
* exception, written once and shared rather than copy-pasted as ad-hoc
* `try`/`catch`. The return or thrown value is retained exactly and is never
* inspected, coerced, cloned, frozen, or mutated. A returned Promise or
* thenable is an ordinary successful value; later settlement is outside this
* synchronous boundary. {@link isContractError} does not use this boundary and
* is not an exception to it: it carries its own `try`/`catch` inside the class
* body, because `errors.ts` cannot import this module without inverting the
* dependency. A guard whose totality rests on an
* argument that nothing inside it can throw is one refactor away from throwing.
*
* @param callback - The callback to invoke with no arguments
* @returns A `Success` carrying the exact return value, or a `Failure` carrying
*          the exact thrown value as `unknown`
*
* @example
* ```ts
* const outcome = attempt(() => predicate(value))
* return outcome.success && outcome.value
* ```
*/
function attempt(callback) {
	try {
		return {
			success: true,
			value: callback()
		};
	} catch (error) {
		return {
			success: false,
			error
		};
	}
}
/**
* Reads a value through the shared containment boundary or refuses it with the
* contract module's uniform read diagnostic.
*
* @remarks
* Unlike {@link attempt}, this is not an optional-result boundary: a caller
* has committed to reading the supplied value, so a failed read cannot be
* represented as absence or another permissive answer. Every reader using
* this helper throws with the same `<reader>: <subject> could not be read`
* message shape and retains the exact thrown value as its cause. Required
* structural readers use the defaults; pattern readers supply `pattern` for
* both the subject and code.
*
* @param callback - The read operation to perform
* @param reader - The public reader name used in the diagnostic
* @param options - Optional subject, code, and structured context
* @returns The successfully read value
* @throws {ContractError} When the read operation fails
*
* @example
* ```ts
* readValue(() => source.value, 'parseRecord')
* ```
*/
function readValue(callback, reader, options) {
	const diagnostics = attempt(() => {
		const source = options?.context;
		const owned = source === void 0 ? void 0 : {
			path: void 0,
			shape: void 0,
			limit: void 0,
			received: void 0,
			...source
		};
		const requested = options?.code;
		const subject = options?.subject;
		const code = requested !== void 0 && matchesMember(collectMembers(CONTRACT_CODES), requested) ? requested : "structure";
		return {
			reader: isString(reader) ? reader : "readValue",
			subject: isString(subject) ? subject : "value",
			code,
			owned
		};
	});
	if (!diagnostics.success) throw new ContractError("readValue: options could not be read", {
		code: "structure",
		cause: diagnostics.error
	});
	const outcome = attempt(callback);
	if (!outcome.success) {
		const owned = diagnostics.value.owned;
		const context = owned === void 0 ? void 0 : {
			...owned.path === void 0 ? {} : { path: owned.path },
			...owned.shape === void 0 ? {} : { shape: owned.shape },
			...owned.limit === void 0 ? {} : { limit: owned.limit },
			...owned.received === void 0 ? {} : { received: owned.received }
		};
		throw new ContractError(`${diagnostics.value.reader}: ${diagnostics.value.subject} could not be read`, {
			code: diagnostics.value.code,
			...context === void 0 ? {} : { context },
			cause: outcome.error
		});
	}
	return outcome.value;
}
/**
* Runs a public door's whole body and publishes only this package's error class.
*
* @remarks
* The other half of the answer {@link INTRINSICS} gives, and the half that does
* not depend on anyone enumerating anything. Capture removes a named dispatch;
* this removes the CONSEQUENCE of every dispatch a door's path still makes,
* named or not. Four consecutive rounds fixed the statements they were shown
* and were defeated by a statement one line later, because a boundary placed
* per statement is only ever as complete as the last sweep. A boundary at the
* door composes: whatever the body reaches, and whatever a caller installs
* under it, the door publishes a {@link ContractError} or the value it
* promised.
*
* A {@link ContractError} reaching this boundary passes through by identity —
* the diagnosis a door spent its whole body computing is the point of the door,
* and rewrapping it would demote it to a cause. The mechanism is
* {@link isContractError}, which establishes CLASS MEMBERSHIP; it does not and
* cannot establish that this package authored the error, and the passthrough is
* described by what it tests rather than by what it intends. Anything else is a
* host failure the caller arranged, so it is republished under the door's own
* name with the exact thrown value retained as `cause`.
*
* Its population is exactly the public doors that can refuse — every door whose
* TSDoc carries `@throws {ContractError}`, and no door whose body cannot throw
* at all. A wrapper around a body that only allocates a closure buys nothing
* and misreports where the refusals are.
*
* Use {@link readValue} instead where a single read has its own subject and
* deserves its own diagnostic; use this where the subject is the door.
*
* @param callback - The door body to run
* @param door - The public door name used in the diagnostic
* @param options - Optional code and structured context for the published refusal
* @returns The body's exact return value
* @throws {ContractError} The body's own refusal, or a coded translation of a host failure
*
* @example
* ```ts
* export function nullShape(options?: NullShapeOptions): NullShape {
* 	return contain(() => buildNullShape(options), 'nullShape')
* }
* ```
*/
function contain(callback, door, options) {
	const outcome = attempt(callback);
	if (outcome.success) return outcome.value;
	if (isContractError(outcome.error)) throw outcome.error;
	throw new ContractError(`${door}: a host operation this door depends on failed`, {
		code: options?.code ?? "structure",
		...options?.context === void 0 ? {} : { context: options.context },
		cause: outcome.error
	});
}
/**
* Invokes a predicate through the sanctioned never-throw boundary.
*
* @remarks
* Backs the `instanceof`-based validators and every container combinator's element
* walk. The answer is `true` only for the boolean literal `true`; a throw and every
* other return are `false`.
*
* @param callback - The predicate to invoke with no arguments
* @returns True if the callback returns the boolean value `true`; false otherwise
*
* @example
* ```ts
* holds(() => value instanceof Widget) // false when inspection throws
* ```
*/
function holds(callback) {
	const outcome = attempt(callback);
	return outcome.success && outcome.value === true;
}
/**
* Determines whether a value carries the plain-record brand, raising a hostile
* prototype observation instead of answering it.
*
* @remarks
* THE single record-brand rule: a plain record is a non-array object whose
* prototype is `null`, or is a realm's `Object.prototype`. Realm-agnosticism is
* why the second arm cannot compare against this realm's
* `Object.prototype` — a plain object from another `vm.Context`, iframe, or
* worker inherits from THAT realm's `Object.prototype`, which is a different
* object. The earlier rule accepted any prototype that itself had a `null`
* prototype, which every realm's `Object.prototype` satisfies — and so does a
* class prototype a caller reparented to `null`, which is how a class instance
* laundered through every ownership door. A foreign `Object.prototype` is
* therefore identified by the own members ECMAScript requires every realm to
* put on it (`constructor`, `hasOwnProperty`, `isPrototypeOf`,
* `propertyIsEnumerable`, `toLocaleString`, `toString`, `valueOf`), each read
* through its own DESCRIPTOR so no accessor on a hostile prototype ever runs.
* Each must be an own DATA property whose value is a FUNCTION — true of every
* conformant realm, so the requirement costs a genuine foreign record nothing,
* and it refuses the cheapest forgery (stamping the mandated names with
* `undefined`) for free.
*
* That is a structural test, not a provenance one, and the residual is stated
* as exactly what it is: a FUNCTION-VALUED forgery passes, and this realm's own
* `Object.prototype` supplies those functions to stamp, so the price is a
* few lines rather than nothing. Reparenting a class prototype to `null` and
* stamping the mandated names with real functions passes; so does leaving the
* class untouched and putting a `Proxy` in prototype position that reports
* `null` as its own prototype and answers those descriptor reads with
* functions. In both cases the value is a live class instance whose methods are
* still reachable on it. A further own-key SUBSET rule buys even less: it
* refuses a forgery that left methods on its prototype and accepts the same
* class with those methods moved onto the instance, where they are
* indistinguishable from a plain record's function
* properties — so it raises the forgery's price and narrows the realm-agnostic
* arm this rule exists to keep open. What the pass buys is acceptance at
* brand-governed doors and nothing after it: every ownership engine publishes a
* frozen plain record built only from captured data, so no class instance,
* class behavior, or forged prototype survives into a snapshot.
*
* `Object.create(<null-prototype object>)` is refused, and NOT because it is
* structurally identical to a reparented class instance — it is not, since a
* class prototype always owns `constructor` and a bare `Object.create(null)`
* owns nothing. It is refused as policy: no realm produces that chain for a
* plain object, no consumer of it has been named, and a caller erases the
* difference by deleting `constructor`.
*
* This is the diagnosing form, deliberately NOT total: a revoked `Proxy` or a
* hostile `getPrototypeOf` trap throws out of it, so an ownership engine can
* report an unreadable value as a failed read with the exact cause rather than
* as a well-formed structural refusal. {@link isRecord} is the total form for
* every guard consumer and contains that throw as `false`.
*
* @param value - The value whose record brand to inspect
* @returns True if the value is a plain record; false otherwise
* @throws The exact value thrown by a hostile brand observation
*
* @example
* ```ts
* matchesRecordBrand({})                    // true
* matchesRecordBrand(Object.create(null))   // true
* matchesRecordBrand(new Date())            // false
* ```
*/
function matchesRecordBrand(value) {
	if (!isObject(value) || INTRINSICS.array(value)) return false;
	const prototype = INTRINSICS.prototype(value);
	if (prototype === null || prototype === INTRINSICS.base) return true;
	if (INTRINSICS.prototype(prototype) !== null) return false;
	const mandated = [
		"constructor",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"toLocaleString",
		"toString",
		"valueOf"
	];
	for (let index = 0; index < mandated.length; index += 1) {
		const member = mandated[index];
		if (member === void 0) return false;
		const descriptor = INTRINSICS.describe(prototype, member);
		if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) return false;
		if (typeof descriptor.value !== "function") return false;
	}
	return true;
}
/**
* Snapshots an array through its reflected own-index population.
*
* @remarks
* Reads `length` once and one reflected own-key population, then corroborates
* and reads only those reflected canonical indices in ascending order. The
* frozen native snapshot retains actual holes: reading one yields `undefined`,
* while own membership remains absent. Its work is proportional to the
* reflected population, so a length-driven consumer must require `dense` or
* carry an independent bound. A population that is exactly the canonical
* indices in ascending order followed by `length` is copied straight by index
* under the same per-index corroboration, and answers with the same entries,
* the same `dense` fact, and the same refusals as the walk. Caller-defined
* iteration is ignored. A descriptor-only index omitted from reflection is
* deliberately outside this lens and remains a hole. Failure retains the exact
* thrown value when length, reflection, membership, or indexed value
* observation throws; a non-native length or view disagreement is also
* failure. `4294967295` is metadata rather than an array index.
*
* @param value - The array whose reflected indexed entries to read
* @returns A successful frozen entry snapshot with its dense fact, or a
*          failure carrying the exact thrown value as `unknown`
*
* @example
* ```ts
* readArrayEntries([1, 2]) // { success: true, value: { entries: [1, 2], dense: true } }
* ```
*/
function readArrayEntries(value) {
	return attempt(() => {
		const length = value.length;
		if (!INTRINSICS.safe(length) || length < 0 || length > 2 ** 32 - 1) throw new INTRINSICS.error("Array length is outside the native array domain");
		const members = INTRINSICS.reflect.members(value);
		let matched = 0;
		while (matched < length && members[matched] === INTRINSICS.text(matched)) matched += 1;
		if (matched === length && members.length === length + 1 && members[length] === "length") {
			const packed = new INTRINSICS.list(length);
			for (let index = 0; index < length; index += 1) {
				const key = members[index];
				if (key === void 0 || !INTRINSICS.own(value, key)) throw new INTRINSICS.error("Array index views disagree");
				packed[index] = value[index];
			}
			return INTRINSICS.freeze({
				entries: INTRINSICS.freeze(packed),
				dense: true
			});
		}
		const collected = [];
		const keys = [];
		let ascending = true;
		let previous = -1;
		for (let position = 0; position < members.length; position += 1) {
			const key = members[position];
			if (!isString(key)) continue;
			const index = INTRINSICS.numeric(key);
			if (INTRINSICS.integer(index) && index >= 0 && index < 2 ** 32 - 1 && INTRINSICS.text(index) === key) {
				if (index >= length) throw new INTRINSICS.error("Array index views disagree");
				if (index <= previous) ascending = false;
				previous = index;
				collected[collected.length] = index;
				keys[keys.length] = key;
			}
		}
		const indices = ascending ? collected : sortValues(collected);
		const entries = new INTRINSICS.list(length);
		for (let position = 0; position < indices.length; position += 1) {
			const index = indices[position];
			if (index === void 0) continue;
			const key = ascending ? keys[position] : INTRINSICS.text(index);
			if (key === void 0 || !INTRINSICS.own(value, key)) throw new INTRINSICS.error("Array index views disagree");
			entries[index] = value[index];
		}
		return INTRINSICS.freeze({
			entries: INTRINSICS.freeze(entries),
			dense: indices.length === length
		});
	});
}
/**
* Snapshots a guard shape and its optional-key mode for a shape combinator.
*
* @remarks
* A null-prototype record plus its own key list is used instead of a `Map`.
* The declared-key population decides the guard's answer, and
* `Map.prototype.has`, `Map.prototype.get`, and map iteration are three
* caller-writable members on that path. An own data key read by index
* dispatches through nothing.
*
* @param shape - The guard shape whose own string declarations to snapshot
* @param optional - The optional-key list, `true` for every key, or `undefined`
* @param reader - The public combinator name used in read refusals
* @returns The owned guards and names plus the collected optional-key membership
* @throws {ContractError} When the shape or optional-key list cannot be read
*
* @example
* ```ts
* readGuardShape({ id: isString }, undefined, 'recordOf')
* ```
*/
function readGuardShape(shape, optional, reader) {
	const declared = readValue(() => {
		const members = INTRINSICS.reflect.members(shape);
		const guards = INTRINSICS.create(null);
		const names = [];
		for (let index = 0; index < members.length; index += 1) {
			const key = members[index];
			if (!isString(key)) continue;
			if (!INTRINSICS.own(guards, key)) names[names.length] = key;
			guards[key] = shape[key];
		}
		return {
			guards,
			names,
			vocabulary: collectMembers(names)
		};
	}, reader, { subject: "shape" });
	const optionalKeys = readValue(() => {
		if (optional === true) return collectMembers(declared.names);
		if (!INTRINSICS.array(optional)) return collectMembers([]);
		const entries = readArrayEntries(optional);
		if (!entries.success) throw entries.error;
		if (!entries.value.dense) throw new INTRINSICS.error("Optional key list must be dense");
		const keys = collectMembers([]);
		for (let index = 0; index < entries.value.entries.length; index += 1) admitMember(keys, INTRINSICS.text(entries.value.entries[index]));
		return keys;
	}, reader, { subject: "optional" });
	return {
		guards: declared.guards,
		names: declared.names,
		optional: optionalKeys,
		vocabulary: declared.vocabulary
	};
}
/**
* Snapshots an object's own enumerable string keys through a total boundary.
*
* @remarks
* This is the package-wide runtime property view used by compiled object
* guards, parsers, reporters, schema inference, and owned schema cloning. It
* matches the object-key view serialized by `JSON.stringify`: inherited,
* symbol, and non-enumerable properties are excluded. A hostile Proxy trap
* returns `undefined` rather than escaping.
*
* @param value - The object whose keys to snapshot
* @returns A frozen owned key list, or `undefined` when enumeration throws
*
* @example
* ```ts
* enumerableKeys({ visible: 1 }) // ['visible']
* ```
*/
function enumerableKeys(value) {
	const outcome = attempt(() => INTRINSICS.freeze(INTRINSICS.keys(value)));
	return outcome.success ? outcome.value : void 0;
}
/**
* Validates and snapshots a shape-builder options record through every reflective
* operation the builder relies on.
*
* @remarks
* Primitive inputs are rejected before reflection so ordinary caller mistakes
* retain the reader's precise plain-record diagnostic. For an object, every
* consumed key is read exactly once, checked for presence, and inspected for an
* own descriptor while the container is enumerated once. Every successfully
* read non-`undefined` consumed value enters the fresh own-enumerable snapshot,
* including an inherited or non-enumerable option. A hostile host is reported
* uniformly as an unreadable options record, while a readable array or class
* instance retains the plain-record diagnostic.
*
* @param source - The optional builder options value
* @param keys - Every option key consumed by that builder
* @param builder - The builder name used in diagnostics
* @param shape - The shape category used in structured error context
* @returns An owned options snapshot, or `undefined` when options are absent
* @throws {ContractError} When the value is not a plain record or reflection fails
*
* @example
* ```ts
* const options = readOptions(source, ['min', 'max'], 'numberShape', 'number')
* ```
*/
function readOptions(source, keys, builder, shape) {
	return contain(() => {
		if (source === void 0) return void 0;
		const input = source;
		if (!isObject(input)) throw new ContractError(`${builder}: options must be a plain record`, {
			code: "structure",
			context: { shape }
		});
		const result = readValue(() => {
			const values = INTRINSICS.create(null);
			for (let index = 0; index < keys.length; index += 1) {
				const key = keys[index];
				if (key === void 0) continue;
				values[key] = INTRINSICS.reflect.read(input, key);
				INTRINSICS.reflect.present(input, key);
				INTRINSICS.reflect.describe(input, key);
			}
			INTRINSICS.reflect.members(input);
			const record = matchesRecordBrand(input);
			const snapshot = INTRINSICS.create(INTRINSICS.base);
			for (let index = 0; index < keys.length; index += 1) {
				const key = keys[index];
				if (key === void 0) continue;
				const value = values[key];
				if (value === void 0) continue;
				INTRINSICS.reflect.define(snapshot, key, {
					value,
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			return {
				snapshot,
				record
			};
		}, builder, {
			subject: "options",
			context: { shape }
		});
		if (!result.record) throw new ContractError(`${builder}: options must be a plain record`, {
			code: "structure",
			context: { shape }
		});
		return result.snapshot;
	}, "readOptions");
}
/**
* Draws and validates one generator random sample.
*
* @remarks
* A broken source is the source's fault rather than the shape's, so the refusal
* carries code `random` and never the `generate` code, and {@link compileGenerator}
* rethrows it at whatever draw depth it happened instead of rotating to the next union
* variant. The diagnostic names the consuming shape category, the `[0, 1)` limit, and a
* total non-coercing {@link preview} of the offending sample (or `threw`), so a hostile
* object runs no conversion hook while the diagnostic is built and a primitive symbol
* renders without consulting mutable `Symbol.prototype.toString`.
*
* @param random - The caller-supplied random source
* @param shape - The shape category consuming the sample
* @returns A finite sample in `[0, 1)`
* @throws {ContractError} When the source throws or returns outside `[0, 1)`;
*                        a thrown value is retained exactly as the cause
*
* @example
* ```ts
* drawRandom(() => 0.5, 'number') // 0.5
* ```
*/
function drawRandom(random, shape) {
	return contain(() => {
		const outcome = attempt(random);
		if (!outcome.success) throw new ContractError("drawRandom: the random source threw", {
			code: "random",
			context: {
				shape,
				limit: "[0, 1)",
				received: "threw"
			},
			cause: outcome.error
		});
		const sample = outcome.value;
		if (!isFiniteNumber(sample) || sample < 0 || sample >= 1) throw new ContractError("drawRandom: the random source must return a value in [0, 1)", {
			code: "random",
			context: {
				shape,
				limit: "[0, 1)",
				received: preview(sample)
			}
		});
		return sample;
	}, "drawRandom");
}
/**
* Resolves a (possibly nested) field value from a record by a key or key path.
*
* @remarks
* A single `string` is ONE key (never split on `.`, so dotted keys are safe); a
* string array descends left-to-right through own properties of nested objects.
* The root must satisfy {@link isRecord}; inherited properties are never fields.
* Intermediates may be objects or arrays indexed by string. Returns `undefined`
* the moment a segment is missing or lands on a non-object, so the lookup is
* total — even against a hostile getter or Proxy trap that throws on read,
* contained through {@link attempt} so the throw never escapes.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns The resolved value, or `undefined`
*
* @example
* ```ts
* resolveField({ user: { name: 'Ada' } }, ['user', 'name']) // 'Ada'
* resolveField({ 'a.b': 1 }, 'a.b')                          // 1 (one key)
* resolveField({ a: 1 }, ['a', 'b'])                         // undefined
* ```
*/
function resolveField(record, path) {
	const outcome = attempt(() => {
		if (!isRecord(record)) return void 0;
		const keys = isString(path) ? [path] : path;
		let current = record;
		for (let index = 0; index < keys.length; index += 1) {
			const key = keys[index];
			if (key === void 0) return void 0;
			if (!isObject(current) || !INTRINSICS.own(current, key)) return void 0;
			current = INTRINSICS.reflect.read(current, key);
		}
		return current;
	});
	return outcome.success ? outcome.value : void 0;
}
/**
* Determines whether a readable value stays within the fixed JSON container-depth limit.
*
* @remarks
* Counts array and plain-record containers on each active root-to-value path.
* Primitive and readable non-record objects are leaves, active cycles add no
* level, and shared aliases are answered from the shallowest depth at which
* the alias already fit. Arrays are traversed through their reflected
* own-index population, so sparse work is proportional to populated entries
* rather than advertised length. Every observable operation is contained;
* hostile or contradictory reads return `false`.
*
* The walk carries a settled-depth memo beside its active-path set: a
* container that fit at depth `d` also fits at any depth `<= d`, because every
* path below it is then shallower than the one already measured. Without it a
* node reachable by `k` distinct paths was re-walked `k` times, so an ORDINARY
* record graph with thirty shared aliases — thirty-one nodes — cost `2^30`
* visits through a public guard.
*
* @param value - The value whose readable container depth to inspect
* @returns True if no active path exceeds {@link GUARD_DEPTH_LIMIT}; false otherwise
*
* @example
* ```ts
* matchesJSONDepth({ nested: [1] }) // true
* ```
*/
function matchesJSONDepth(value) {
	return holds(() => {
		const stack = [{
			operation: "enter",
			value,
			depth: 0
		}];
		const active = new INTRINSICS.weakSet();
		const settled = new INTRINSICS.weakMap();
		while (stack.length > 0) {
			const frame = stack.pop();
			if (frame === void 0) return false;
			if (frame.operation === "exit") {
				omitVisited(active, frame.value);
				INTRINSICS.reflect.apply(INTRINSICS.retain, settled, [frame.value, frame.depth]);
				continue;
			}
			const entry = frame.value;
			if (entry === null || typeof entry !== "object") continue;
			const array = INTRINSICS.array(entry);
			if (!array && !matchesRecordBrand(entry)) continue;
			if (matchesVisited(active, entry)) continue;
			const depth = frame.depth + 1;
			if (depth > 512) return false;
			const deepest = INTRINSICS.reflect.apply(INTRINSICS.recall, settled, [entry]);
			if (isNumber(deepest) && depth <= deepest) continue;
			admitVisited(active, entry);
			stack[stack.length] = {
				operation: "exit",
				value: entry,
				depth
			};
			if (array) {
				const snapshot = readArrayEntries(entry);
				if (!snapshot.success) return false;
				const children = INTRINSICS.values(snapshot.value.entries);
				for (let index = 0; index < children.length; index += 1) stack[stack.length] = {
					operation: "enter",
					value: children[index],
					depth
				};
				continue;
			}
			const keys = enumerableKeys(entry);
			if (keys === void 0) return false;
			for (let index = 0; index < keys.length; index += 1) {
				const key = keys[index];
				if (key === void 0) return false;
				if (!INTRINSICS.own(entry, key)) return false;
				stack[stack.length] = {
					operation: "enter",
					value: INTRINSICS.reflect.read(entry, key),
					depth
				};
			}
		}
		return true;
	});
}
/**
* Matches an unknown value against the recursive JSON value structure.
*
* @remarks
* The caller-owned ancestor set tracks only the active traversal path, so
* cycles fail while shared references across sibling branches remain valid.
* The set belongs to one traversal from one entry point; passing a shared or
* pre-populated set is unsupported. Arrays descend through the shared dense
* own-index lens and plain records descend by values; class instances and
* non-finite numbers are rejected.
*
* The walk is ITERATIVE, over an explicit enter/exit stack, exactly as
* {@link matchesJSONDepth} is. A recursive walk makes the verdict a function of
* the REMAINING CALL STACK rather than of the value, and a cap enforced by the
* JavaScript stack is not a cap. This walk carries no depth cap of its own —
* `isJSONValue` is deliberately the unbounded deep gate and
* {@link matchesJSONDepth} / `isBoundedJSONValue` are the bounded pair beside
* it — so the answer depends only on the value, at every depth and from every
* call site.
*
* Beside the ancestor set the walk keeps a walk-local PROVED set, so a node
* whose whole subtree already matched is not re-walked when a second path
* reaches it. Removing the recursion alone left the work exponential in shared
* aliases: thirty aliases — thirty-one ordinary records — cost `2^30` visits
* through `isJSONValue`, `parseJSONValue`, `canonicalStringify` and every
* `jsonShape` contract.
*
* @param entry - The value to inspect
* @param ancestors - Objects on the active traversal path
* @returns True if the value is a cycle-free JSON value; false otherwise
*
* @example
* ```ts
* matchesJSONValue({ nested: [1, 'x', null] }, new WeakSet()) // true
* matchesJSONValue(Number.NaN, new WeakSet())                 // false
* ```
*/
function matchesJSONValue(entry, ancestors) {
	return readValue(() => {
		const stack = [{
			operation: "enter",
			value: entry
		}];
		const proved = new INTRINSICS.weakSet();
		while (stack.length > 0) {
			const frame = stack.pop();
			if (frame === void 0) return false;
			if (frame.operation === "exit") {
				omitVisited(ancestors, frame.value);
				admitVisited(proved, frame.value);
				continue;
			}
			const node = frame.value;
			if (node === null || isString(node) || isBoolean(node) || isFiniteNumber(node)) continue;
			if (INTRINSICS.array(node)) {
				if (matchesVisited(ancestors, node)) return false;
				if (matchesVisited(proved, node)) continue;
				const snapshot = readArrayEntries(node);
				if (!snapshot.success) throw snapshot.error;
				if (!snapshot.value.dense) return false;
				admitVisited(ancestors, node);
				stack[stack.length] = {
					operation: "exit",
					value: node
				};
				const entries = snapshot.value.entries;
				for (let index = entries.length - 1; index >= 0; index -= 1) stack[stack.length] = {
					operation: "enter",
					value: entries[index]
				};
				continue;
			}
			if (!isRecord(node)) return false;
			if (matchesVisited(ancestors, node)) return false;
			if (matchesVisited(proved, node)) continue;
			admitVisited(ancestors, node);
			stack[stack.length] = {
				operation: "exit",
				value: node
			};
			const members = INTRINSICS.values(node);
			for (let index = members.length - 1; index >= 0; index -= 1) stack[stack.length] = {
				operation: "enter",
				value: members[index]
			};
		}
		return true;
	}, "matchesJSONValue", { context: { shape: "json" } });
}
/**
* Builds a deterministic pseudo-random source seeded from a single number.
*
* @remarks
* A mulberry32 generator — the same seed always yields the same sequence, so
* generated seed data is reproducible across runs. Used as the default random
* source for {@link compileGenerator}, seeded from the wall clock so casual
* callers still get varied output without passing a source themselves.
*
* @param seed - The seed for the sequence
* @returns A {@link RandomFunction} returning values in `[0, 1)`
*
* @example
* ```ts
* const random = seededRandom(42)
* random() // always the same first value for seed 42
* ```
*/
function seededRandom(seed) {
	if (!isNumber(seed)) throw new ContractError("seededRandom: seed must be a number", {
		code: "random",
		context: {
			limit: "number",
			received: preview(seed)
		}
	});
	let state = seed >>> 0;
	return () => {
		state = state + 1831565813 >>> 0;
		let t = state;
		t = INTRINSICS.imul(t ^ t >>> 15, t | 1);
		t ^= t + INTRINSICS.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
/**
* Counts the enumerable own-symbol keys on a value.
*
* @remarks
* String keys are ignored — only `Object.getOwnPropertySymbols` entries whose
* descriptor is `enumerable` are counted, and each descriptor is read through
* the captured observation so no accessor runs. It answers exactly the
* `JSON.stringify`-invisible half of a record's own-symbol population, for a
* consumer that needs that count directly. It does NOT back `isEmptyObject` /
* `isNonEmptyObject` — those ask the complete own-key question `recordOf` asks,
* because an enumerable-only count made their `never` narrowing unsound for an
* own non-enumerable key.
*
* @param value - The object to inspect
* @returns The number of enumerable own-symbol keys
*
* @example
* ```ts
* const flag = Symbol('flag')
* enumerableSymbolCount(Object.defineProperty({}, flag, { value: 1, enumerable: true })) // 1
* enumerableSymbolCount({}) // 0
* ```
*/
function enumerableSymbolCount(value) {
	return readValue(() => {
		let count = 0;
		const symbols = INTRINSICS.symbols(value);
		for (let index = 0; index < symbols.length; index += 1) {
			const symbol = symbols[index];
			if (symbol === void 0) continue;
			if (INTRINSICS.describe(value, symbol)?.enumerable) count += 1;
		}
		return count;
	}, "enumerableSymbolCount");
}
/**
* Narrows a compiled {@link JSONSchema} down to the open `Readonly<Record<string, unknown>>` shape
* tool definitions advertise as `parameters` — through the {@link isRecord} boundary guard, never
* an assertion, as `.claude/rules/patterns.md` § Validation and contracts requires.
*
* @remarks
* A `JSONSchema` is the closed contract-compiler fragment (it has no index signature), whereas a
* tool advertises its `parameters` as an open record. The two are structurally compatible but not
* assignable, so the schema crosses that boundary through `isRecord` — a compiled contract schema
* is always a record, so the guard passes for one. A readable value that satisfies the all-optional
* `JSONSchema` interface without being a plain record — a class instance, whose prototype is the
* class rather than `Object.prototype` — fails that guard and returns `undefined`, so the
* `undefined` branch is a real answer a direct caller reaches rather than a decorative fallback.
* This is the single sanctioned narrowing from a compiled contract schema to the open
* tool-parameters record, so the crossing lives once rather than being copy-pasted per call site.
*
* @param schema - The compiled JSON Schema (a contract's `schema`)
* @returns The schema as the open tool-parameters record, or `undefined` when it is not a record
* @throws {ContractError} When the schema cannot be read
*
* @example
* ```ts
* import { createContract, schemaToParameters } from '@orkestrel/contract'
*
* const contract = createContract(shape)
* const parameters = schemaToParameters(contract.schema) // the open record a tool advertises
* ```
*/
function schemaToParameters(schema) {
	return contain(() => {
		readValue(() => INTRINSICS.values(schema), "schemaToParameters");
		return isRecord(schema) ? schema : void 0;
	}, "schemaToParameters");
}
/**
* Wraps a non-object `JSONSchema` root in a single-property object schema, so
* an inferred primitive/array/union schema can flow into {@link schemaToParameters}
* as an MCP-compatible `inputSchema`.
*
* @remarks
* Deterministic for readable input. `schema.type === 'object'` passes through
* unchanged; every other root (a primitive/array `type`, an `anyOf`/`enum`-only
* schema with no `type`, or the empty `{}`) is wrapped as a single required
* `value` property: `{ type: 'object', properties: { value: schema },
* required: ['value'], additionalProperties: false }`. Composition:
* `schemaToParameters(schemaToObject(valueToSchema(payload)))`.
*
* @param schema - The schema to wrap
* @returns `schema` unchanged when object-rooted, otherwise the wrapped object schema
* @throws {ContractError} When the schema root cannot be read
*
* @example
* ```ts
* schemaToObject({ type: 'string' })
* // { type: 'object', properties: { value: { type: 'string' } },
* //   required: ['value'], additionalProperties: false }
* schemaToObject({ type: 'object', properties: {} }) // unchanged
* ```
*/
function schemaToObject(schema) {
	return contain(() => {
		return readValue(() => {
			INTRINSICS.values(schema);
			if (schema.type === "object") return schema;
			return {
				type: "object",
				properties: { value: schema },
				required: ["value"],
				additionalProperties: false
			};
		}, "schemaToObject", { subject: "schema" });
	}, "schemaToObject");
}
/**
* Encodes one non-container value the way JSON encodes it, or `undefined` when
* JSON cannot encode it at all.
*
* @remarks
* The leaf half of {@link canonicalStringify}: `JSON.stringify` returns
* `undefined` (never a string) for `undefined`, a function, and a symbol —
* exactly the values with no JSON encoding — and THROWS on a bigint, which is
* refused before the call rather than through it. A `Date` and any other
* non-record object encode through the same captured `JSON.stringify`, so a
* `toJSON` member keeps its ordinary meaning.
*
* @param value - The non-container value to encode
* @returns The JSON encoding, or `undefined` when JSON cannot encode `value`
*
* @example
* ```ts
* encodeLeaf(Number.NaN)  // 'null'
* encodeLeaf(undefined)   // undefined
* ```
*/
function encodeLeaf(value) {
	if (typeof value === "bigint") return void 0;
	return INTRINSICS.stringify(value);
}
/**
* Renders a value as a deterministic, key-sorted JSON string — or `undefined`
* when it has no faithful JSON encoding.
*
* @remarks
* The stable-stringify backing {@link unifySchemas}'s de-duplication and
* ordering: unlike `JSON.stringify`, object keys are sorted before encoding
* (recursively, at every nesting level), so two structurally-equal
* `JSONSchema` fragments built independently always canonicalize to the same
* string. Pure host-independent ECMAScript with no environment-specific imports.
*
* For READABLE input it returns `undefined` — never a partial or invalid
* encoding — for every value JSON cannot faithfully encode:
*
* - `undefined` itself, a function, a symbol, or an array hole (JSON encodes
*   none of them), at the top level or anywhere inside a container;
* - a bigint (`JSON.stringify` throws on one);
* - cyclic input, tracked with the same ancestor-{@link WeakSet} discipline
*   the container branches of value inference use, so a shared (non-cyclic)
*   reference reached twice through different paths still encodes;
* A hostile traversal is categorically different: a throwing own-getter,
* hostile `ownKeys` trap, or revoked `Proxy` throws a `structure`
* {@link ContractError} through {@link readValue}. A caller can therefore
* distinguish "not JSON-encodable" from "could not be read".
*
* A caller therefore treats `undefined` as "this value has no canonical key",
* never as an encoding: see {@link unifySchemas} (an un-keyed member cannot
* participate in de-duplication or ordering) and {@link inferPrimitiveEnum} (an
* un-keyed member makes the slot enum-ineligible).
*
* @param value - The value to canonicalize (a `JSONSchema` fragment, or any
*                nested piece of one)
* @returns A deterministic string encoding of `value`, or `undefined` when JSON
*          cannot encode it
* @throws {ContractError} When the value cannot be read
*
* @example
* ```ts
* canonicalStringify({ type: 'object', properties: {} }) ===
* 	canonicalStringify({ properties: {}, type: 'object' }) // true
* canonicalStringify(Number.NaN)  // 'null' — JSON.stringify semantics
* canonicalStringify(undefined)   // undefined
* canonicalStringify(cyclicValue) // undefined
* ```
*/
function canonicalStringify(value) {
	return contain(() => {
		return readValue(() => {
			if (!isObject(value) || !isArray(value) && !matchesRecordBrand(value)) return encodeLeaf(value);
			const ancestors = new INTRINSICS.weakSet();
			const encodings = new INTRINSICS.weakMap();
			const stack = [{
				operation: "enter",
				value
			}];
			while (stack.length > 0) {
				const frame = stack.pop();
				if (frame === void 0) return void 0;
				if (frame.operation === "exit") {
					let encoded = "";
					for (let index = 0; index < frame.members.length; index += 1) {
						const member = frame.members[index];
						const part = isObject(member) ? INTRINSICS.reflect.apply(INTRINSICS.recall, encodings, [member]) ?? encodeLeaf(member) : encodeLeaf(member);
						if (part === void 0) return void 0;
						const key = frame.keys?.[index];
						const text = key === void 0 ? part : `${INTRINSICS.stringify(key)}:${part}`;
						encoded += index === 0 ? text : `,${text}`;
					}
					const text = frame.keys === void 0 ? `[${encoded}]` : `{${encoded}}`;
					INTRINSICS.reflect.apply(INTRINSICS.retain, encodings, [frame.value, text]);
					omitVisited(ancestors, frame.value);
					continue;
				}
				const container = frame.value;
				if (matchesVisited(ancestors, container)) return void 0;
				if (INTRINSICS.reflect.apply(INTRINSICS.recall, encodings, [container]) !== void 0) continue;
				const members = [];
				const selected = [];
				let keys;
				if (isArray(container)) {
					const snapshot = readArrayEntries(container);
					if (!snapshot.success) throw snapshot.error;
					if (!snapshot.value.dense) return void 0;
					const entries = snapshot.value.entries;
					for (let index = 0; index < entries.length; index += 1) members[members.length] = entries[index];
				} else {
					const names = sortValues(INTRINSICS.keys(container));
					for (let index = 0; index < names.length; index += 1) {
						const key = names[index];
						if (key === void 0) continue;
						selected[selected.length] = key;
						members[members.length] = INTRINSICS.reflect.read(container, key);
					}
					keys = selected;
				}
				admitVisited(ancestors, container);
				stack[stack.length] = {
					operation: "exit",
					value: container,
					members,
					keys
				};
				for (let index = members.length - 1; index >= 0; index -= 1) {
					const member = members[index];
					if (isObject(member) && (isArray(member) || matchesRecordBrand(member))) stack[stack.length] = {
						operation: "enter",
						value: member
					};
				}
			}
			return INTRINSICS.reflect.apply(INTRINSICS.recall, encodings, [value]);
		}, "canonicalStringify");
	}, "canonicalStringify");
}
/**
* Checks whether a supported ISO-8601 date or date-time names a real instant.
*
* @remarks
* Accepts exactly `YYYY-MM-DD`, or `YYYY-MM-DDTHH:MM:SS` with optional
* fractional seconds followed by `Z` or a numeric offset. Inside the
* {@link attempt} boundary, captured components receive explicit Gregorian
* month/leap/day and clock validation before `Date#getTime` performs the final
* offset/instant refusal. Backs {@link stringToFormat}'s `date`, `date-time`,
* and prefixed `time` validation.
*
* @param value - The candidate ISO-8601 string
* @returns True if `value` parses to a real instant; false otherwise
*
* @example
* ```ts
* matchesISOInstant('2024-02-29')          // true
* matchesISOInstant('2024-01-01T24:00Z')   // false — incomplete normalized clock
* ```
*/
function matchesISOInstant(value) {
	const outcome = attempt(() => {
		const match = INTRINSICS.reflect.apply(INTRINSICS.captures, /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/, [value]);
		const yearText = match?.[1];
		const monthText = match?.[2];
		const dayText = match?.[3];
		if (yearText === void 0 || monthText === void 0 || dayText === void 0) return false;
		const year = INTRINSICS.numeric(yearText);
		const month = INTRINSICS.numeric(monthText);
		const day = INTRINSICS.numeric(dayText);
		if (month < 1 || month > 12) return false;
		const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
		const limit = month === 2 ? 28 + INTRINSICS.numeric(leap) : 31 - INTRINSICS.numeric(month === 4 || month === 6 || month === 9 || month === 11);
		if (day < 1 || day > limit) return false;
		const hourText = match?.[4];
		const minuteText = match?.[5];
		const secondText = match?.[6];
		if (hourText !== void 0 || minuteText !== void 0 || secondText !== void 0) {
			if (hourText === void 0 || minuteText === void 0 || secondText === void 0) return false;
			const hour = INTRINSICS.numeric(hourText);
			const minute = INTRINSICS.numeric(minuteText);
			const second = INTRINSICS.numeric(secondText);
			if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) return false;
		}
		const date = new INTRINSICS.date(value);
		return !INTRINSICS.nan(INTRINSICS.reflect.apply(INTRINSICS.instant, date, []));
	});
	return outcome.success && outcome.value;
}
/**
* Classifies an already-bounded string against the pattern-only and
* calendar-checked {@link SchemaFormat} vocabulary.
*
* @remarks
* The pure leaf behind {@link stringToFormat}'s total boundary: it performs the
* pattern dispatch, and the door decides what a failed dispatch answers. Order
* is significant — `date-time` is tried before `date`, and both require the
* calendar check, so `2020-13-45` matches the pattern and is still refused.
*
* @param value - The candidate string, already length-bounded
* @returns The matched {@link SchemaFormat}, or `undefined`
* @throws The exact value thrown by a redirected pattern dispatch
*
* @example
* ```ts
* classifyFormat('ada@example.com') // 'email'
* ```
*/
function classifyFormat(value) {
	if (matchesPattern(FORMAT_PATTERNS.uuid, value)) return "uuid";
	if (matchesPattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, value) && matchesISOInstant(value)) return "date-time";
	if (matchesPattern(/^\d{4}-\d{2}-\d{2}$/, value) && matchesISOInstant(value)) return "date";
	if (matchesPattern(/^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/, value) && matchesISOInstant(`1970-01-01T${value}`)) return "time";
	if (matchesPattern(FORMAT_PATTERNS.email, value)) return "email";
	if (matchesPattern(FORMAT_PATTERNS.uri, value)) return "uri";
}
/**
* Derives `min`/`max` shape bounds from a pair of non-negative-integer JSON
* Schema length keywords (`minLength`/`maxLength`, `minItems`/`maxItems`).
*
* @remarks
* Total and pure. Either keyword is used only when it is a non-negative
* safe integer (`Number.isSafeInteger` + `>= 0`); a malformed value (a string,
* a negative number, `NaN`, `Infinity`, a fraction, or an unsafe integer) is
* dropped as if absent. When both bounds are present and `min` exceeds `max`,
* the PAIR is dropped entirely (an unbounded shape is always a legal widening
* of a contradictory schema).
*
* @param min - The raw `minLength` / `minItems` keyword value
* @param max - The raw `maxLength` / `maxItems` keyword value
* @returns The derived `min` / `max` pair, either possibly `undefined`
*
* @example
* ```ts
* deriveLengthBounds(1, 10)     // { min: 1, max: 10 }
* deriveLengthBounds(10, 1)     // {} — contradictory, dropped
* deriveLengthBounds(-1, 10)    // { max: 10 } — negative min dropped
* ```
*/
function deriveLengthBounds(min, max) {
	return contain(() => {
		const lo = isInteger(min) && INTRINSICS.safe(min) && min >= 0 ? min : void 0;
		const hi = isInteger(max) && INTRINSICS.safe(max) && max >= 0 ? max : void 0;
		if (lo !== void 0 && hi !== void 0 && lo > hi) return {};
		return {
			...lo === void 0 ? {} : { min: lo },
			...hi === void 0 ? {} : { max: hi }
		};
	}, "deriveLengthBounds");
}
/**
* Derives `min`/`max` shape bounds from a pair of finite-number JSON Schema
* range keywords (`minimum`/`maximum`).
*
* @remarks
* Total and pure. Either keyword is used only when it is a finite number
* ({@link isFiniteNumber} — rejects `NaN` / `±Infinity` / non-numbers); when
* both bounds are present and `min` exceeds `max`, the PAIR is dropped
* entirely, the same contradiction rule {@link deriveLengthBounds} applies.
*
* @param min - The raw `minimum` keyword value
* @param max - The raw `maximum` keyword value
* @returns The derived `min` / `max` pair, either possibly `undefined`
*
* @example
* ```ts
* deriveRangeBounds(0, 120)   // { min: 0, max: 120 }
* deriveRangeBounds(5, 1)     // {} — contradictory, dropped
* ```
*/
function deriveRangeBounds(min, max) {
	return contain(() => {
		const lo = isFiniteNumber(min) ? min : void 0;
		const hi = isFiniteNumber(max) ? max : void 0;
		if (lo !== void 0 && hi !== void 0 && lo > hi) return {};
		return {
			...lo === void 0 ? {} : { min: lo },
			...hi === void 0 ? {} : { max: hi }
		};
	}, "deriveRangeBounds");
}
/**
* Sanitizes a user-supplied inference budget (`limits.depth` / `limits.properties`) to
* a finite non-negative integer, selecting a valid fallback for anything else.
*
* @remarks
* Guards {@link valueToSchema} / {@link samplesToSchema} against a hostile or
* malformed budget: an unclamped `NaN` defeats every `depth <= 0` guard
* (`NaN <= 0` is `false`, so recursion never halts), and a negative
* `limits.properties` makes `slice(0, -1)` silently drop the LAST sorted key
* instead of capping the list (a fractional value has a similarly undefined
* `slice` bound). `Infinity` is rejected too — `Number.isInteger(Infinity)`
* is `false` — since an unbounded budget is exactly the adversarial case the
* caps exist to prevent. A valid candidate passes through unchanged without
* inspecting the fallback. When the candidate is invalid, the fallback must
* satisfy the same finite non-negative-integer contract or this boundary
* refuses it with a coded error instead of returning an invalid budget.
*
* @param value - The candidate budget value
* @param fallback - The default to select when `value` is not a finite
*                   non-negative integer
* @returns A finite non-negative integer budget
* @throws {ContractError} When the selected fallback is not a finite
*                         non-negative integer
*
* @example
* ```ts
* sanitizeBudget(Number.NaN, INFER_DEPTH_LIMIT) // INFER_DEPTH_LIMIT
* sanitizeBudget(-1, INFER_BREADTH_LIMIT)       // INFER_BREADTH_LIMIT
* sanitizeBudget(4, INFER_DEPTH_LIMIT)          // 4
* ```
*/
function sanitizeBudget(value, fallback) {
	return contain(() => {
		if (typeof value === "number" && INTRINSICS.integer(value) && value >= 0) return value;
		if (typeof fallback === "number" && INTRINSICS.integer(fallback) && fallback >= 0) return fallback;
		throw new ContractError("sanitizeBudget: fallback must be a finite non-negative integer", {
			code: "bound",
			context: {
				limit: "finite non-negative integer",
				received: preview(fallback)
			}
		});
	}, "sanitizeBudget");
}
/**
* Resolves a caller's depth budget to one the traversal can actually survive.
*
* @remarks
* {@link sanitizeBudget} decides the SHAPE of a budget and deliberately lets any
* finite non-negative integer through, because it must never read a fallback a
* hostile caller supplied. That left the depth axis unbounded from above, and
* depth is the axis that recurses: `1e9` is a valid integer, so the walk descended
* until the call STACK failed, at a depth that varied between runs, and the
* refusal surfaced as an unreadable value rather than as the exhaustion the guard
* promises. Breadth needs no such ceiling — its loop is already bounded by the
* entries actually present.
*
* So {@link INFER_DEPTH_LIMIT} is the ceiling as well as the default, and
* `limits.depth` narrows the walk rather than widening it. One bound, and the same
* answer on every host.
*
* @param value - The candidate depth budget
* @returns A finite non-negative integer no greater than `INFER_DEPTH_LIMIT`
*
* @example
* ```ts
* sanitizeDepth(4) // 4
* sanitizeDepth(1e9) // 32
* ```
*/
function sanitizeDepth(value) {
	return INTRINSICS.min(sanitizeBudget(value, 32), 32);
}
/**
* Renders an unknown value as a short, safe, TOTAL string for a {@link Fault}'s
* `received` field.
*
* @remarks
* A primitive renders as printable text: a string retains its quoted JSON
* representation, while a narrowed symbol renders through intrinsic `String`
* and receives the same escaping without outer quotes. A string of at most
* {@link PREVIEW_LIMIT} code units takes its answer from one whole-string
* encode when that encode fits the same limit, and the length predicate
* deciding it is exact rather than approximate. Every other string and every
* symbol renders through one bounded indexed encoder that appends only
* complete escaped code-point tokens within {@link PREVIEW_LIMIT}; clipping
* therefore never retrieves the mutable string iterator or splits an
* escape/surrogate pair before its trailing `…`, and enormous primitive text
* is not fully traversed. A number / boolean / bigint renders through `String`;
* `null` and `undefined` render as their own name. An array renders as
* `'array'`. Every other host — a plain object, a function, a class instance,
* a `Map` — is NEVER traversed or stringified; it renders as its bare
* `typeof` tag (`'object'` / `'function'`).
*
* The indexed encoder appends every token and closes with the quote exactly
* when the escaped inner length is at most `PREVIEW_LIMIT - 2`, which is
* character for character what one `JSON.stringify` call returns. At an inner
* length of `PREVIEW_LIMIT - 1` the indexed encoder appends every token and
* closes with `…` instead, while one `JSON.stringify` call over that same
* string measures `PREVIEW_LIMIT + 1` — so the predicate refuses that string
* and every longer one, and each of them renders through the indexed encoder.
* Escaping never shrinks text, so the leading `source.length` gate admits
* every string the predicate could accept while keeping enormous primitive
* text out of the whole-string encode. A symbol renders through the indexed
* encoder because its unquoted text is not what a `JSON.stringify` call
* returns.
*
* @param value - The value to preview
* @returns A short descriptive string, always safe to embed in a diagnostic
*
* @example
* ```ts
* preview('hi')        // '"hi"'
* preview(42)           // '42'
* preview(null)         // 'null'
* preview({ a: 1 })     // 'object'
* preview([1, 2, 3])    // 'array'
* ```
*/
function preview(value) {
	if (value === null) return "null";
	if (value === void 0) return "undefined";
	if (isString(value) || isSymbol(value)) {
		const quoted = isString(value);
		const source = INTRINSICS.text(value);
		if (quoted && source.length <= 64) {
			const whole = INTRINSICS.stringify(source);
			if (whole.length <= 64) return whole;
		}
		let text = quoted ? "\"" : "";
		let index = 0;
		while (index < source.length) {
			const first = source[index];
			if (first === void 0) break;
			const second = index + 1 < source.length ? source[index + 1] : void 0;
			const paired = first >= "\ud800" && first <= "\udbff" && second !== void 0 && second >= "\udc00" && second <= "\udfff";
			const character = paired ? `${first}${second}` : first;
			const encoded = INTRINSICS.stringify(character);
			const tokenLength = encoded.length - 2;
			if (text.length + tokenLength > 64) return `${text}…`;
			let tokenIndex = 1;
			while (tokenIndex <= tokenLength) {
				const token = encoded[tokenIndex];
				if (token !== void 0) text += token;
				tokenIndex += 1;
			}
			index += paired ? 2 : 1;
		}
		if (!quoted) return text;
		return text.length < 64 ? `${text}"` : `${text}…`;
	}
	if (isNumber(value) || isBoolean(value)) return INTRINSICS.text(value);
	if (isBigInt(value)) return `${value}n`;
	if (isArray(value)) return "array";
	return typeof value;
}
/**
* Builds the refinement faults a string value has against a {@link StringShape}.
*
* @remarks
* The single source of the string refinement report, shared by
* `compileReporter` and `compileAuditor`. The two doors differ only in how they
* OBTAIN the string — the reporter coerces through `parseString`, the auditor
* demands a primitive string — and share every constraint afterwards through
* this helper, so a constraint cannot drift between them.
* Faults come out in declaration order — `min`, then `max`, then
* `pattern` — because a report is read top to bottom and its order is public.
*
* The declaration's pattern is applied through an OWNED stateless rebuild
* ({@link readPattern}) asked through {@link matchesPattern}, so the shape's own
* pattern never moves a caller's `lastIndex` and no caller-writable member
* decides whether the value matched. The rebuild is stateless precisely because
* `g` and `y` are stripped, so one rebuilt pattern answers identically for every
* value and every call — which is what lets a compiled door build it once
* ({@link ownPattern}) and hand it down through `pattern` instead of rebuilding
* it on each answer. The `limit` text is read from the applied rebuild, so it
* names the pattern that decided the match. Left to rebuild, the helper asks
* the shape's `pattern` accessor once for the presence test that decides
* whether a pattern was declared at all, and once more for the rebuild that
* decides the match and names the `limit` when one was.
*
* The whole body reads the caller's SHAPE, so it runs through the same
* {@link readValue} boundary {@link shapeToKind} uses and refuses an
* out-of-domain declaration with the same diagnostic. The compiled doors gate a
* non-`RegExp` `pattern` and a non-finite bound long before this helper sees
* them, so the package's own path never arrives here off-domain — but the door
* is PUBLISHED, and a shape a `StringShape` annotation merely vouched for
* (parsed out of a document, say) reaches it unchecked. Publishing the host's
* own `TypeError` from such a shape would falsify the promise this module makes
* for every one of its doors.
*
* @param shape - The string shape whose refinements are checked
* @param value - The already-obtained string to check
* @param path - The path every produced fault is rooted at
* @param pattern - The one-time stateless rebuild that decides the pattern
*                  refinement. Must be a {@link readPattern} result for this
*                  shape's own pattern; supplied, it decides the match, the
*                  `limit` text, and whether a pattern fault is reported at
*                  all, and `shape.pattern` is not read. A pattern carrying `g`
*                  or `y` moves the caller's `lastIndex` and makes repeated
*                  answers for one value disagree. Default: rebuilt from
*                  `shape.pattern` on every call, when the shape declares one
* @returns A fresh array of faults, empty when the value satisfies every refinement
* @throws {ContractError} When the shape's refinement fields cannot be read
*
* @example
* ```ts
* buildStringFaults({ category: 'string', min: 3 }, 'ab', [])
* // [{ reason: 'constraint', path: [], expected: 'string', constraint: 'min', limit: 3, received: '"ab"' }]
* ```
*/
function buildStringFaults(shape, value, path, pattern) {
	return readValue(() => {
		const faults = [];
		if (shape.min !== void 0 && value.length < shape.min) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "string",
			constraint: "min",
			limit: shape.min,
			received: preview(value)
		};
		if (shape.max !== void 0 && value.length > shape.max) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "string",
			constraint: "max",
			limit: shape.max,
			received: preview(value)
		};
		const stateless = pattern ?? (shape.pattern === void 0 ? void 0 : readPattern(shape.pattern));
		if (stateless !== void 0 && !matchesPattern(stateless, value)) {
			const limit = readPatternSource(stateless);
			faults[faults.length] = {
				reason: "constraint",
				path,
				expected: "string",
				constraint: "pattern",
				...limit === void 0 ? {} : { limit },
				received: preview(value)
			};
		}
		return faults;
	}, "buildStringFaults", { subject: "shape" });
}
/**
* Builds the refinement faults a number value has against a {@link NumberShape}.
*
* @remarks
* The numeric sibling of {@link buildStringFaults}, shared by the same two
* doors for the same reason. `expected` is the shape's own kind — `'integer'`
* when `integer: true`, otherwise `'number'` — so a caller reading the report
* sees the declaration's vocabulary rather than the value's. Order is
* `integer`, then `min`, then `max`. It refuses an unreadable shape through the
* same boundary and for the same reason {@link buildStringFaults} does.
*
* @param shape - The number shape whose refinements are checked
* @param value - The already-obtained number to check
* @param path - The path every produced fault is rooted at
* @returns A fresh array of faults, empty when the value satisfies every refinement
* @throws {ContractError} When the shape's refinement fields cannot be read
*
* @example
* ```ts
* buildNumberFaults({ category: 'number', integer: true }, 1.5, [])
* // [{ reason: 'constraint', path: [], expected: 'integer', constraint: 'integer', received: '1.5' }]
* ```
*/
function buildNumberFaults(shape, value, path) {
	return readValue(() => {
		const expected = shape.integer === true ? "integer" : "number";
		const faults = [];
		if (shape.integer === true && !INTRINSICS.integer(value)) faults[faults.length] = {
			reason: "constraint",
			path,
			expected,
			constraint: "integer",
			received: preview(value)
		};
		if (shape.min !== void 0 && value < shape.min) faults[faults.length] = {
			reason: "constraint",
			path,
			expected,
			constraint: "min",
			limit: shape.min,
			received: preview(value)
		};
		if (shape.max !== void 0 && value > shape.max) faults[faults.length] = {
			reason: "constraint",
			path,
			expected,
			constraint: "max",
			limit: shape.max,
			received: preview(value)
		};
		return faults;
	}, "buildNumberFaults", { subject: "shape" });
}
/**
* Builds the length faults an array has against an {@link ArrayShape}.
*
* @remarks
* Takes the LENGTH rather than the array, because both doors have already read
* their entries through {@link readArrayEntries} and must report the length that
* read observed rather than re-asking the caller's value for it. `received` is
* that count rendered through the captured `String`, matching the other length
* diagnostics in the package. Order is `min`, then `max`. It refuses an
* unreadable shape through the same boundary and for the same reason
* {@link buildStringFaults} does.
*
* @param shape - The array shape whose bounds are checked
* @param length - The entry count the door already observed
* @param path - The path every produced fault is rooted at
* @returns A fresh array of faults, empty when the length satisfies both bounds
* @throws {ContractError} When the shape's bound fields cannot be read
*
* @example
* ```ts
* buildArrayFaults({ category: 'array', items: { category: 'string' }, min: 2 }, 1, [])
* // [{ reason: 'constraint', path: [], expected: 'array', constraint: 'min', limit: 2, received: '1' }]
* ```
*/
function buildArrayFaults(shape, length, path) {
	return readValue(() => {
		const faults = [];
		if (shape.min !== void 0 && length < shape.min) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "array",
			constraint: "min",
			limit: shape.min,
			received: INTRINSICS.text(length)
		};
		if (shape.max !== void 0 && length > shape.max) faults[faults.length] = {
			reason: "constraint",
			path,
			expected: "array",
			constraint: "max",
			limit: shape.max,
			received: INTRINSICS.text(length)
		};
		return faults;
	}, "buildArrayFaults", { subject: "shape" });
}
/**
* Selects the report of the variant that came closest to matching.
*
* @remarks
* The union summary both diagnostic doors append their closest variant's faults
* to. "Closest" is the SHORTEST report, and an earlier variant wins a tie, so a
* union's diagnostic follows declaration order rather than whichever variant a
* later comparison happened to visit. The winning report is returned BY
* IDENTITY, never copied, so the summary carries the exact fault objects the
* variant produced. No report at all — a union whose every variant slot was
* unreadable — yields a frozen empty collection rather than `undefined`, so the
* caller appends nothing instead of branching.
*
* The scan is an indexed read of arrays this package built, so neither the
* choice of variant nor the length comparison dispatches through a member a
* caller can replace.
*
* @param reports - One report per variant, in declaration order
* @returns The first shortest report, or a frozen empty collection when there are none
*
* @example
* ```ts
* selectClosestFaults([[fault, fault], [fault]]) // the second report
* selectClosestFaults([])                        // []
* ```
*/
function selectClosestFaults(reports) {
	let closest;
	for (let index = 0; index < reports.length; index += 1) {
		const report = reports[index];
		if (report === void 0) continue;
		if (closest === void 0 || report.length < closest.length) closest = report;
	}
	return closest ?? INTRINSICS.freeze([]);
}
/**
* Projects a {@link ContractShape} to the {@link FaultKind} it describes.
*
* @remarks
* A structural mapping used by {@link compileReporter} to fill a `Fault`'s
* `expected` field and by {@link compileAuditor} to fill an `AuditFault`'s:
* most shapes map to their own `category` (`numberShape` maps to
* `'integer'` when `integer: true`, else `'number'`); `optionalShape` /
* `nullableShape` project through to their inner shape's kind, and `rawShape`
* (an arbitrary embedded schema with no fixed kind) projects to `'json'`.
*
* A hand-authored node carrying an unrecognized discriminant is REFUSED rather
* than answered out of type, which keeps the declared non-optional
* {@link FaultKind} return type true at a public export; every other door in
* this module refuses out-of-domain input, so this one does too.
*
* @param shape - The shape to project
* @returns The shape's {@link FaultKind}
* @throws {ContractError} When the node carries no recognized shape discriminant
*
* @example
* ```ts
* shapeToKind(stringShape())            // 'string'
* shapeToKind(integerShape())           // 'integer'
* shapeToKind(optionalShape(nullShape())) // 'null'
* ```
*/
function shapeToKind(shape) {
	return readValue(() => {
		switch (shape.category) {
			case "string": return "string";
			case "number": return shape.integer === true ? "integer" : "number";
			case "boolean": return "boolean";
			case "null": return "null";
			case "literal": return "literal";
			case "array": return "array";
			case "object": return "object";
			case "union": return "union";
			case "json": return "json";
			case "optional": return shapeToKind(shape.inner);
			case "nullable": return shapeToKind(shape.inner);
			case "raw": return "json";
			default: throw new INTRINSICS.error("shapeToKind: unrecognized shape discriminant");
		}
	}, "shapeToKind", { subject: "shape" });
}
/**
* Refuses a validated declaration whose compiled expansion exceeds
* {@link COMPILE_NODE_LIMIT}.
*
* @remarks
* The compilers' emitted-node bound, written once because two boundaries apply
* it over a {@link ShapeValidatorInterface.expansion} count: the eager
* {@link validateShape} function and the lazy {@link ContractCompiler}
* preparation. The refusal keeps `validateShape`'s name because that gate
* OWNS the rule and its exact diagnostic is public API — the same reason
* `ShapeCloner` publishes the gate's depth wording rather than inventing a
* second vocabulary for one rule. Two constructions of one refusal are two
* messages waiting to drift apart.
*
* @param expansion - The node count one successful validation measured, or
*                    `undefined` when no pass measured one
* @returns Nothing when the count is within the limit
* @throws {ContractError} When the count exceeds {@link COMPILE_NODE_LIMIT}, or when no successful pass measured one
*
* @example
* ```ts
* const validator = new ShapeValidator(shape)
* validator.validate()
* refuseExpansion(validator.expansion)
* ```
*/
function refuseExpansion(expansion) {
	if (expansion === void 0) throw new ContractError("validateShape: a validated shape measured no expansion", {
		code: "structure",
		context: { path: [] }
	});
	if (expansion <= 16384) return;
	throw new ContractError("validateShape: a shape expands past the compilation node limit", {
		code: "expansion",
		context: {
			path: [],
			limit: COMPILE_NODE_LIMIT,
			received: INTRINSICS.text(expansion)
		}
	});
}
/**
* Owns the state of one exact JSON snapshot operation.
*
* @remarks
* Construction retains the source without observing it. The first
* {@link clone} call performs one iterative descriptor walk and settles
* permanently. Success replays the exact frozen root; failure rethrows the
* exact class-owned error. Nonredirectable terminal failure releases partial
* traversal working state while retaining the source and exact error. Reentry
* poisons the active operation and every later call with one shared cause-free
* error.
*
* @param value - The unknown value to retain for cloning
*
* @example
* ```ts
* const source = { settings: { enabled: true } }
* const cloner = new JSONCloner(source)
* const clone = cloner.clone()
* source.settings.enabled = false
* cloner.clone() === clone // true
* ```
*/
var JSONCloner = class JSONCloner {
	static #weakSet = WeakSet;
	static #emptyPending = [];
	#source;
	#owned;
	#active;
	#pending;
	#produced;
	#poison;
	#terminal;
	constructor(value) {
		this.#source = value;
		this.#owned = new JSONCloner.#weakSet();
		this.#active = new JSONCloner.#weakSet();
		this.#pending = [];
		this.#produced = 0;
		this.#poison = void 0;
		this.#terminal = void 0;
	}
	/**
	* Clones the retained source into exact, deeply frozen JSON data.
	*
	* @returns The settled JSON snapshot
	* @throws {ContractError} When the source is inexact, cyclic, unreadable, or cloning is reentered
	*/
	clone() {
		const terminal = this.#terminal;
		if (terminal !== void 0) {
			if (terminal.success) return terminal.value;
			throw terminal.error;
		}
		const poison = this.#poison;
		if (poison !== void 0) {
			this.#terminal = {
				success: false,
				error: poison
			};
			throw poison;
		}
		this.#poison = this.#create("JSONCloner.clone: JSON cloning may not be reentered");
		const outcome = attempt(() => this.#execute());
		const interruption = this.#terminal;
		if (interruption !== void 0) {
			if (interruption.success) return interruption.value;
			this.#fail(interruption.error);
		}
		if (outcome.success) {
			this.#terminal = outcome;
			return outcome.value;
		}
		const error = this.#owns(outcome.error) ? outcome.error : this.#create("cloneJSONValue: failed to create an owned JSON snapshot");
		this.#fail(error);
	}
	#fail(error) {
		this.#terminal = {
			success: false,
			error
		};
		this.#pending = JSONCloner.#emptyPending;
		throw error;
	}
	#execute() {
		const root = this.#capture(this.#source);
		this.#drain();
		return root;
	}
	#drain() {
		while (this.#pending.length > 0) {
			const frame = this.#pending[this.#pending.length - 1];
			if (frame === void 0) continue;
			if (frame.entries === void 0) frame.entries = frame.array ? this.#captureArray(frame.source) : this.#captureRecord(frame.source);
			const entry = frame.entries[frame.index];
			if (entry === void 0) {
				INTRINSICS.freeze(frame.clone);
				omitVisited(this.#active, frame.source);
				this.#pending.pop();
				continue;
			}
			frame.index += 1;
			const clone = this.#capture(entry[1]);
			INTRINSICS.define(frame.clone, entry[0], {
				value: clone,
				enumerable: true,
				configurable: true,
				writable: true
			});
		}
	}
	#capture(value) {
		this.#produced += 1;
		if (this.#produced > 262144) this.#refuse("cloneJSONValue: snapshot exceeds the node limit");
		if (value === null || typeof value === "string" || typeof value === "boolean") return value;
		if (typeof value === "number") {
			if (INTRINSICS.finite(value)) return value;
			this.#refuse("cloneJSONValue: number is not finite");
		}
		if (typeof value === "object") return this.#captureObject(value);
		this.#refuse(this.#pending.length === 0 ? "cloneJSONValue: value is not JSON data" : "cloneJSONValue: property is not JSON data");
	}
	#captureObject(source) {
		if (matchesVisited(this.#active, source)) this.#refuse("cloneJSONValue: cycle detected");
		const arrayOutcome = attempt(() => INTRINSICS.array(source));
		if (!arrayOutcome.success) this.#refuse("cloneJSONValue: value brand could not be inspected");
		if (arrayOutcome.value) return this.#schedule(source, true);
		if (isRecord(source)) return this.#schedule(source, false);
		this.#refuse("cloneJSONValue: object is not a plain record");
	}
	#schedule(source, array) {
		const clone = array ? [] : INTRINSICS.create(null);
		admitVisited(this.#active, source);
		this.#pending[this.#pending.length] = {
			source,
			clone,
			array,
			entries: void 0,
			index: 0
		};
		return clone;
	}
	#captureArray(source) {
		const keysOutcome = attempt(() => INTRINSICS.reflect.members(source));
		if (!keysOutcome.success) this.#refuse("cloneJSONValue: own keys could not be inspected");
		const lengthOutcome = attempt(() => INTRINSICS.reflect.describe(source, "length"));
		if (!lengthOutcome.success) this.#refuse("cloneJSONValue: array length could not be inspected");
		const lengthDescriptor = lengthOutcome.value;
		if (lengthDescriptor === void 0 || !("value" in lengthDescriptor) || typeof lengthDescriptor.value !== "number" || !INTRINSICS.integer(lengthDescriptor.value) || lengthDescriptor.value < 0 || lengthDescriptor.value > 4294967295 || lengthDescriptor.enumerable !== false || lengthDescriptor.configurable !== false) this.#refuse("cloneJSONValue: array is not intrinsic and dense");
		const owned = collectMembers(keysOutcome.value);
		if (!matchesMember(owned, "length")) this.#refuse("cloneJSONValue: array own keys are not exact");
		if (keysOutcome.value.length !== lengthDescriptor.value + 1) this.#refuse("cloneJSONValue: array own keys are not exact");
		const entries = [];
		for (let index = 0; index < lengthDescriptor.value; index += 1) {
			const key = INTRINSICS.text(index);
			if (!matchesMember(owned, key)) this.#refuse("cloneJSONValue: array own keys are not exact");
			const descriptorOutcome = attempt(() => INTRINSICS.reflect.describe(source, key));
			if (!descriptorOutcome.success) this.#refuse("cloneJSONValue: array index could not be inspected");
			const descriptor = descriptorOutcome.value;
			if (descriptor === void 0 || !("value" in descriptor) || descriptor.enumerable !== true) this.#refuse("cloneJSONValue: array index is not enumerable data");
			entries[entries.length] = [key, descriptor.value];
		}
		return entries;
	}
	#captureRecord(source) {
		const keysOutcome = attempt(() => INTRINSICS.reflect.members(source));
		if (!keysOutcome.success) this.#refuse("cloneJSONValue: own keys could not be inspected");
		const entries = [];
		const names = keysOutcome.value;
		for (let index = 0; index < names.length; index += 1) {
			const key = names[index];
			if (typeof key !== "string") this.#refuse("cloneJSONValue: record has a symbol property");
			const descriptorOutcome = attempt(() => INTRINSICS.reflect.describe(source, key));
			if (!descriptorOutcome.success) this.#refuse("cloneJSONValue: record property could not be inspected");
			const descriptor = descriptorOutcome.value;
			if (descriptor === void 0 || !("value" in descriptor) || descriptor.enumerable !== true) this.#refuse("cloneJSONValue: record property is not enumerable data");
			entries[entries.length] = [key, descriptor.value];
		}
		return entries;
	}
	#create(message) {
		const error = new ContractError(message, {
			code: "clone",
			context: { shape: "json" }
		});
		admitVisited(this.#owned, error);
		return error;
	}
	#owns(error) {
		return isObject(error) && matchesVisited(this.#owned, error);
	}
	#refuse(message) {
		const terminal = this.#terminal;
		if (terminal !== void 0 && !terminal.success) throw terminal.error;
		throw this.#create(message);
	}
	static {
		INTRINSICS.freeze(JSONCloner.#emptyPending);
		pinMembers(JSONCloner.prototype, "JSONCloner");
	}
};
/**
* Owns the state of one JSON Schema snapshot operation.
*
* @remarks
* Construction retains the source without observing it. The first
* {@link clone} call performs one iterative identity-memoized walk and settles
* permanently. Success replays the exact frozen root; failure rethrows the
* exact class-owned error. Nonredirectable terminal settlement releases
* populated traversal state before publishing that result, while retaining
* the source and exact result afterward. Reentry poisons the active operation
* and every later call with one shared cause-free error.
*
* @param schema - The JSON Schema graph to retain for cloning
*
* @example
* ```ts
* const child = { type: 'string' }
* const cloner = new SchemaCloner({ anyOf: [child, child] })
* const clone = cloner.clone()
* clone.anyOf?.[0] === clone.anyOf?.[1] // true
* cloner.clone() === clone // true
* ```
*/
var SchemaCloner = class SchemaCloner {
	static #map = Map;
	static #weakSet = WeakSet;
	static #hasOwn = Object.hasOwn;
	static #emptyPending = [];
	#source;
	#owned;
	#memo;
	#pending;
	#state;
	constructor(schema) {
		this.#source = schema;
		this.#owned = new SchemaCloner.#weakSet();
		this.#memo = new SchemaCloner.#map();
		this.#pending = [];
		this.#state = { phase: "ready" };
	}
	/**
	* Clones the retained schema into an identity-preserving frozen graph.
	*
	* @returns The settled JSON Schema snapshot
	* @throws {ContractError} When traversal is unreadable or cloning is reentered
	*/
	clone() {
		const state = this.#state;
		switch (state.phase) {
			case "settled":
				if (state.result.success) return state.result.value;
				throw state.result.error;
			case "running":
			case "interrupted":
				this.#state = {
					phase: "interrupted",
					poison: state.poison
				};
				throw state.poison;
		}
		const poison = this.#create("SchemaCloner.clone: schema cloning may not be reentered");
		this.#state = {
			phase: "running",
			poison
		};
		return this.#complete(attempt(() => this.#execute()));
	}
	#complete(outcome) {
		const state = this.#state;
		if (state.phase === "interrupted") return this.#settle({
			success: false,
			error: state.poison
		});
		if (outcome.success) return this.#settle(outcome);
		const error = this.#owns(outcome.error) ? outcome.error : this.#create("cloneSchema: failed to create an owned schema snapshot", { cause: outcome.error });
		return this.#settle({
			success: false,
			error
		});
	}
	#execute() {
		if (INTRINSICS.array(this.#source)) this.#refuse("cloneSchema: a schema root must be a record, not an array", "structure", []);
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		const root = INTRINSICS.create(null);
		INTRINSICS.reflect.apply(INTRINSICS.store, memo, [this.#source, root]);
		this.#pending[this.#pending.length] = {
			source: this.#source,
			clone: root,
			path: [],
			depth: 0
		};
		this.#drain();
		return root;
	}
	#drain() {
		while (this.#pending.length > 0) {
			const frame = this.#pending.pop();
			if (frame === void 0) continue;
			if (frame.depth > 512) this.#refuse("cloneSchema: schema exceeds the compilation depth limit", "depth", frame.path);
			const keys = enumerableKeys(frame.source);
			if (keys === void 0) throw this.#create("cloneSchema: property enumeration failed", { path: frame.path });
			for (let index = 0; index < keys.length; index += 1) {
				const key = keys[index];
				if (key === void 0) continue;
				const path = pathOf(frame.path, key);
				const source = this.#read(frame.source, key, path);
				const clone = this.#capture(source, path, frame.depth + 1);
				INTRINSICS.define(frame.clone, key, {
					value: clone,
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			INTRINSICS.freeze(frame.clone);
		}
	}
	#capture(value, path, depth) {
		if (typeof value !== "object" || value === null) return value;
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		const existing = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [value]);
		if (existing !== void 0) return existing;
		return this.#schedule(value, path, depth);
	}
	#schedule(source, path, depth) {
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		const clone = INTRINSICS.array(source) ? [] : INTRINSICS.create(null);
		INTRINSICS.reflect.apply(INTRINSICS.store, memo, [source, clone]);
		this.#pending[this.#pending.length] = {
			source,
			clone,
			path,
			depth
		};
		return clone;
	}
	#read(source, key, path) {
		const outcome = attempt(() => INTRINSICS.reflect.read(source, key));
		if (outcome.success) return outcome.value;
		throw this.#create("cloneSchema: property access failed", {
			path,
			cause: outcome.error
		});
	}
	#unavailable() {
		return this.#create("SchemaCloner.clone: the capture state is unavailable");
	}
	#create(message, options) {
		const path = options !== void 0 && SchemaCloner.#hasOwn(options, "path") ? options.path : void 0;
		const context = path === void 0 ? { shape: "schema" } : {
			path,
			shape: "schema"
		};
		const error = options !== void 0 && SchemaCloner.#hasOwn(options, "cause") ? new ContractError(message, {
			code: "clone",
			context,
			cause: options.cause
		}) : new ContractError(message, {
			code: "clone",
			context
		});
		admitVisited(this.#owned, error);
		return error;
	}
	#refuse(message, code, path) {
		const error = new ContractError(message, {
			code,
			context: code === "depth" ? {
				path,
				shape: "schema",
				limit: 512
			} : {
				path,
				shape: "schema"
			}
		});
		admitVisited(this.#owned, error);
		throw error;
	}
	#owns(error) {
		return isObject(error) && matchesVisited(this.#owned, error);
	}
	#settle(result) {
		this.#pending = SchemaCloner.#emptyPending;
		this.#memo = void 0;
		this.#state = {
			phase: "settled",
			result
		};
		if (result.success) return result.value;
		throw result.error;
	}
	static {
		INTRINSICS.freeze(SchemaCloner.#emptyPending);
		pinMembers(SchemaCloner.prototype, "SchemaCloner");
	}
};
/**
* Validates one retained contract-shape source live on every call.
*
* @remarks
* Construction performs no source observation. Every non-overlapping
* {@link validate} call starts a fresh pass over the source's current state.
* Reentry poisons the active pass with one shared cause-free structure error;
* cleanup always restores an idle validator for the next independent call.
*
* @example
* ```ts
* const validator = new ShapeValidator({ category: 'string', min: 1 })
* validator.validate()
* ```
*/
var ShapeValidator = class ShapeValidator {
	static #weakSet = WeakSet;
	static #weakMap = WeakMap;
	#source;
	#state = { phase: "idle" };
	#stack = [];
	#path = [];
	#active = new ShapeValidator.#weakSet();
	#index = new ShapeValidator.#weakMap();
	#captures = [];
	#post = [];
	#height = [];
	#reach = [];
	#via = [];
	#counts = [];
	#schemas = new ShapeValidator.#weakMap();
	#expansion = void 0;
	#children = [];
	#category;
	#raw = 0;
	#structure;
	#cycle;
	#domain;
	/**
	* Retains a shape source without observing it.
	*
	* @param shape - The live shape source validated by each call
	*/
	constructor(shape) {
		this.#source = shape;
	}
	/**
	* Reports the number of nodes the last successful {@link validate} found the
	* source expands into.
	*
	* @remarks
	* One per node per INCOMING EDGE, summed bottom-up — the size of the tree a
	* compiler would build from this DAG, which a node count of the declaration
	* itself does not describe. `undefined` before the first successful pass and
	* after a failed one, because a failed pass has no expansion to report and
	* `0` is a measurement no declaration produces.
	*/
	get expansion() {
		return this.#expansion;
	}
	/**
	* Validates the retained source's current declaration.
	*
	* @remarks
	* The whole traversal is contained, and a failure this class did not author
	* is translated into `validateShape: shape reflection failed` carrying
	* the exact thrown value. Containment is what makes that claim hold for
	* dispatch nobody enumerated — including the recognition of an authored error,
	* which is why that recognition is no longer answerable by any member a caller
	* can write. The sentence this replaces asserted the same conclusion from the
	* absence of reachable dispatch, and the absence was not established.
	*
	* @returns Nothing when the declaration is valid
	* @throws {ContractError} When the declaration is malformed, cyclic, too deep, unreadable, or reentered
	*/
	validate() {
		if (this.#state.phase === "active") {
			const poison = this.#state.poison ?? new ContractError("ShapeValidator.validate: shape validation may not be reentered", {
				code: "structure",
				context: { path: [] }
			});
			this.#state = {
				phase: "active",
				poison
			};
			throw poison;
		}
		this.#clear();
		this.#state = { phase: "active" };
		const outcome = attempt(() => this.#execute());
		const poison = this.#state.phase === "active" ? this.#state.poison : void 0;
		this.#clear();
		if (poison !== void 0) {
			this.#expansion = void 0;
			throw poison;
		}
		if (outcome.success) return;
		if (isContractError(outcome.error)) throw outcome.error;
		throw new ContractError("validateShape: shape reflection failed", {
			code: "structure",
			context: { path: [] },
			cause: outcome.error
		});
	}
	#clear() {
		this.#state = { phase: "idle" };
		this.#stack = [];
		this.#path = [];
		this.#active = new ShapeValidator.#weakSet();
		this.#index = new ShapeValidator.#weakMap();
		this.#captures = [];
		this.#post = [];
		this.#height = [];
		this.#reach = [];
		this.#via = [];
		this.#counts = [];
		this.#schemas = new ShapeValidator.#weakMap();
		this.#children = [];
		this.#category = void 0;
		this.#raw = 0;
		this.#structure = void 0;
		this.#cycle = void 0;
		this.#domain = void 0;
	}
	#execute() {
		this.#expansion = void 0;
		this.#stack[this.#stack.length] = {
			operation: "enter",
			shape: this.#source,
			depth: 0,
			optional: false
		};
		while (this.#stack.length > 0) this.#visit();
		this.#measure();
		this.#finish();
		this.#expansion = this.#counts[0] ?? 1;
	}
	#visit() {
		const frame = this.#stack.pop();
		if (frame === void 0) return;
		if (frame.operation === "exit") {
			const capture = this.#captures[frame.index];
			if (capture !== void 0) omitVisited(this.#active, capture.shape);
			this.#post[this.#post.length] = frame.index;
			this.#path.length -= frame.segments;
			return;
		}
		let segments = 0;
		if (frame.first !== void 0) {
			this.#path[this.#path.length] = frame.first;
			segments += 1;
		}
		if (frame.second !== void 0) {
			this.#path[this.#path.length] = frame.second;
			segments += 1;
		}
		const current = frame.shape;
		if (typeof current !== "object" || current === null || !isRecord(current)) {
			this.#structure ??= new ContractError("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(this.#path) }
			});
			this.#path.length -= segments;
			return;
		}
		if (matchesVisited(this.#active, current)) {
			this.#cycle ??= new ContractError("validateShape: a shape graph may not contain a cycle", {
				code: "cycle",
				context: { path: pathOf(this.#path) }
			});
			this.#path.length -= segments;
			return;
		}
		const seen = INTRINSICS.reflect.apply(INTRINSICS.recall, this.#index, [current]);
		if (seen !== void 0) {
			this.#place(seen, frame.optional);
			this.#path.length -= segments;
			return;
		}
		this.#children = [];
		this.#category = void 0;
		this.#raw = 0;
		const outcome = attempt(() => this.#observe(current, frame.depth));
		if (!outcome.success || !outcome.value) {
			this.#structure ??= new ContractError("validateShape: every node must be a recognized shape", {
				code: "structure",
				context: { path: pathOf(this.#path) }
			});
			this.#post[this.#post.length] = this.#capture(current, []);
			this.#path.length -= segments;
			return;
		}
		this.#place(this.#schedule(current, frame.depth, segments), frame.optional);
	}
	#observe(current, depth) {
		const descriptor = INTRINSICS.describe(current, "category");
		if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) return this.#refuse("validateShape: every node must be a recognized shape");
		const category = current.category;
		if (current.category !== category || descriptor.value !== category) return this.#refuse("validateShape: every node must be a recognized shape");
		const fields = this.#recognize(category);
		if (fields === void 0) return this.#refuse("validateShape: every node must be a recognized shape");
		this.#category = category;
		if (!this.#scan(current, fields)) return false;
		if (!this.#constrain(current)) return false;
		if (category === "raw") {
			const schema = current.schema;
			const outcome = attempt(() => this.#inspect(schema));
			if (!outcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "schema");
			if (!outcome.value) return false;
			if (depth + this.#raw > 512) return this.#refuse("validateShape: raw schema exceeds the compilation depth limit", "schema");
		}
		if (category === "object") {
			const outcome = attempt(() => this.#populate(current));
			if (!outcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "properties");
			return outcome.value;
		}
		if (category === "union") {
			const outcome = attempt(() => this.#populate(current));
			if (!outcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "variants");
			return outcome.value;
		}
		if (category === "literal") {
			const outcome = attempt(() => this.#populate(current));
			if (!outcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "values");
			return outcome.value;
		}
		return this.#populate(current);
	}
	#recognize(category) {
		switch (category) {
			case "string": return [
				"min",
				"max",
				"pattern",
				"description"
			];
			case "number": return [
				"integer",
				"min",
				"max",
				"description"
			];
			case "boolean":
			case "null":
			case "json": return ["description"];
			case "literal": return ["values", "description"];
			case "array": return [
				"items",
				"min",
				"max",
				"description"
			];
			case "object": return [
				"properties",
				"additionalProperties",
				"description"
			];
			case "union": return [
				"variants",
				"mode",
				"description"
			];
			case "optional":
			case "nullable": return ["inner"];
			case "raw": return ["schema"];
		}
	}
	#scan(current, fields) {
		for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex += 1) {
			const field = fields[fieldIndex];
			if (field === void 0) continue;
			const outcome = attempt(() => {
				const descriptor = INTRINSICS.describe(current, field);
				if (descriptor !== void 0 && !INTRINSICS.own(descriptor, "value") && field !== "pattern") return false;
				const first = INTRINSICS.reflect.read(current, field);
				const second = INTRINSICS.reflect.read(current, field);
				if (descriptor === void 0) return first === void 0 && second === void 0;
				if (INTRINSICS.own(descriptor, "value")) {
					const described = descriptor.value;
					return INTRINSICS.same(first, described) && INTRINSICS.same(second, first);
				}
				return field === "pattern" && isRegExp(first) && isRegExp(second) && readPatternSource(first) === readPatternSource(second) && readPatternFlags(first) === readPatternFlags(second) && INTRINSICS.frozen(first) && INTRINSICS.frozen(second);
			});
			if (!outcome.success || !outcome.value) return this.#refuse("validateShape: every node must be a recognized shape", field);
		}
		return true;
	}
	#constrain(current) {
		if (current.category !== "optional" && current.category !== "nullable" && current.category !== "raw" && current.description !== void 0 && typeof current.description !== "string") return this.#refuse("validateShape: description must be a string", "description");
		if (current.category === "string") {
			if (current.min !== void 0 && typeof current.min !== "number") return this.#refuse("validateShape: string min must be a number", "min");
			if (current.max !== void 0 && typeof current.max !== "number") return this.#refuse("validateShape: string max must be a number", "max");
			if (current.pattern !== void 0) {
				const pattern = current.pattern;
				if (!isRegExp(pattern)) return this.#refuse("validateShape: string pattern must be a RegExp", "pattern");
				const source = readPatternSource(pattern);
				const flags = readPatternFlags(pattern);
				if (typeof source !== "string" || typeof flags !== "string" || readPatternSource(pattern) !== source || readPatternFlags(pattern) !== flags) return this.#refuse("validateShape: string pattern must be stable", "pattern");
				this.#restrict(current, source, flags);
			} else this.#restrict(current);
		}
		if (current.category === "number") {
			if (current.min !== void 0 && typeof current.min !== "number") return this.#refuse("validateShape: number min must be a number", "min");
			if (current.max !== void 0 && typeof current.max !== "number") return this.#refuse("validateShape: number max must be a number", "max");
			if (current.integer !== void 0 && typeof current.integer !== "boolean") return this.#refuse("validateShape: number integer must be a boolean", "integer");
			const shape = current.integer === true ? "integer" : "number";
			if (this.#domain === void 0 && current.min !== void 0 && !INTRINSICS.finite(current.min)) this.#domain = new ContractError("validateShape: a number shape min must be finite", {
				code: "bound",
				context: {
					path: pathOf(this.#path),
					shape,
					limit: "finite number",
					received: INTRINSICS.text(current.min)
				}
			});
			if (this.#domain === void 0 && current.max !== void 0 && !INTRINSICS.finite(current.max)) this.#domain = new ContractError("validateShape: a number shape max must be finite", {
				code: "bound",
				context: {
					path: pathOf(this.#path),
					shape,
					limit: "finite number",
					received: INTRINSICS.text(current.max)
				}
			});
			if (this.#domain === void 0 && current.min !== void 0 && current.max !== void 0 && current.min > current.max) this.#domain = new ContractError("validateShape: a number shape has min greater than max", {
				code: "range",
				context: {
					path: pathOf(this.#path),
					shape
				}
			});
			if (this.#domain === void 0 && current.integer === true) {
				if (INTRINSICS.ceil(current.min ?? Number.NEGATIVE_INFINITY) > INTRINSICS.floor(current.max ?? Number.POSITIVE_INFINITY)) this.#domain = new ContractError("validateShape: an integer number shape has an empty integer range", {
					code: "range",
					context: {
						path: pathOf(this.#path),
						shape: "integer"
					}
				});
			}
		}
		if (current.category === "array" && current.min !== void 0 && typeof current.min !== "number") return this.#refuse("validateShape: array min must be a number", "min");
		if (current.category === "array" && current.max !== void 0 && typeof current.max !== "number") return this.#refuse("validateShape: array max must be a number", "max");
		if (current.category === "array" && this.#domain === void 0 && current.min !== void 0 && (!INTRINSICS.safe(current.min) || current.min < 0)) this.#domain = new ContractError("validateShape: an array shape min must be a non-negative safe integer", {
			code: "bound",
			context: {
				path: pathOf(this.#path),
				shape: "array",
				limit: "non-negative safe integer",
				received: INTRINSICS.text(current.min)
			}
		});
		if (current.category === "array" && this.#domain === void 0 && current.max !== void 0 && (!INTRINSICS.safe(current.max) || current.max < 0)) this.#domain = new ContractError("validateShape: an array shape max must be a non-negative safe integer", {
			code: "bound",
			context: {
				path: pathOf(this.#path),
				shape: "array",
				limit: "non-negative safe integer",
				received: INTRINSICS.text(current.max)
			}
		});
		if (current.category === "array" && this.#domain === void 0 && current.min !== void 0 && current.max !== void 0 && current.min > current.max) this.#domain = new ContractError("validateShape: an array shape has min greater than max", {
			code: "range",
			context: {
				path: pathOf(this.#path),
				shape: "array"
			}
		});
		if (current.category === "union" && current.mode !== void 0 && current.mode !== "anyOf" && current.mode !== "oneOf") return this.#refuse("validateShape: union mode must be anyOf or oneOf", "mode");
		return true;
	}
	#place(index, optional) {
		if (optional || this.#domain !== void 0) return;
		if (this.#captures[index]?.category !== "optional") return;
		this.#domain = new ContractError("validateShape: an optional shape may only appear as a direct object-property value", {
			code: "placement",
			context: {
				path: pathOf(this.#path),
				shape: "optional"
			}
		});
	}
	#restrict(current, source = "", flags = "") {
		if (this.#domain === void 0 && current.min !== void 0 && (!INTRINSICS.safe(current.min) || current.min < 0)) this.#domain = new ContractError("validateShape: a string shape min must be a non-negative safe integer", {
			code: "bound",
			context: {
				path: pathOf(this.#path),
				shape: "string",
				limit: "non-negative safe integer",
				received: INTRINSICS.text(current.min)
			}
		});
		if (this.#domain === void 0 && current.max !== void 0 && (!INTRINSICS.safe(current.max) || current.max < 0)) this.#domain = new ContractError("validateShape: a string shape max must be a non-negative safe integer", {
			code: "bound",
			context: {
				path: pathOf(this.#path),
				shape: "string",
				limit: "non-negative safe integer",
				received: INTRINSICS.text(current.max)
			}
		});
		if (this.#domain === void 0 && flags.length > 0) this.#domain = new ContractError("validateShape: a string shape pattern must not use flags; use inline pattern constructs instead", {
			code: "pattern",
			context: {
				path: pathOf(this.#path),
				shape: "string",
				received: `/${source}/${flags}`
			}
		});
		if (this.#domain === void 0 && current.min !== void 0 && current.max !== void 0 && current.min > current.max) this.#domain = new ContractError("validateShape: a string shape has min greater than max", {
			code: "range",
			context: {
				path: pathOf(this.#path),
				shape: "string"
			}
		});
	}
	#inspect(source) {
		if (!isRecord(source)) return this.#refuse("validateShape: raw schema must be a plain record", "schema");
		const active = new ShapeValidator.#weakSet();
		const stack = [{
			operation: "enter",
			schema: source
		}];
		while (stack.length > 0) {
			const frame = stack.pop();
			if (frame === void 0) continue;
			if (frame.operation === "exit") {
				omitVisited(active, frame.schema);
				this.#settleSchema(frame.schema, frame.nested);
				continue;
			}
			const schema = frame.schema;
			if (!isRecord(schema)) return this.#refuse("validateShape: every raw schema child must be a plain record", "schema");
			if (matchesVisited(active, schema)) return this.#refuse("validateShape: a raw schema may not contain a cycle", "schema");
			if (INTRINSICS.reflect.apply(INTRINSICS.recall, this.#schemas, [schema]) !== void 0) continue;
			admitVisited(active, schema);
			const keyList = INTRINSICS.keys(schema);
			for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
				const key = keyList[keyIndex];
				if (key === void 0) continue;
				if (key !== "type" && key !== "description" && key !== "enum" && key !== "minLength" && key !== "maxLength" && key !== "pattern" && key !== "format" && key !== "minimum" && key !== "maximum" && key !== "minItems" && key !== "maxItems" && key !== "items" && key !== "properties" && key !== "required" && key !== "additionalProperties" && key !== "anyOf" && key !== "oneOf") return this.#refuse("validateShape: raw schema contains an unsupported keyword", "schema");
			}
			const category = schema.type;
			if (category !== void 0 && category !== "null" && category !== "boolean" && category !== "object" && category !== "array" && category !== "number" && category !== "integer" && category !== "string") return this.#refuse("validateShape: raw schema type is outside the supported vocabulary", "schema");
			if (schema.description !== void 0 && typeof schema.description !== "string") return this.#refuse("validateShape: raw schema description must be a string", "schema");
			if (schema.format !== void 0 && typeof schema.format !== "string") return this.#refuse("validateShape: raw schema format must be a string", "schema");
			if (schema.pattern !== void 0) {
				if (typeof schema.pattern !== "string") return this.#refuse("validateShape: raw schema pattern must be a string", "schema");
				if (!attempt(() => INTRINSICS.reflect.apply(INTRINSICS.pattern, void 0, [schema.pattern])).success) return this.#refuse("validateShape: raw schema pattern must be valid", "schema");
			}
			const lengthList = [
				"minLength",
				"maxLength",
				"minItems",
				"maxItems"
			];
			for (let lengthIndex = 0; lengthIndex < lengthList.length; lengthIndex += 1) {
				const key = lengthList[lengthIndex];
				if (key === void 0) continue;
				const value = schema[key];
				if (value !== void 0 && (!INTRINSICS.safe(value) || INTRINSICS.numeric(value) < 0)) return this.#refuse("validateShape: raw schema length bounds must be non-negative safe integers", "schema");
			}
			const rangeList = ["minimum", "maximum"];
			for (let rangeIndex = 0; rangeIndex < rangeList.length; rangeIndex += 1) {
				const key = rangeList[rangeIndex];
				if (key === void 0) continue;
				const value = schema[key];
				if (value !== void 0 && (typeof value !== "number" || !INTRINSICS.finite(value))) return this.#refuse("validateShape: raw schema numeric bounds must be finite numbers", "schema");
			}
			const population = schema.enum;
			if (population !== void 0) {
				if (!INTRINSICS.array(population)) return this.#refuse("validateShape: raw schema enum must be a non-empty array", "schema");
				const snapshot = readArrayEntries(population);
				if (!snapshot.success || snapshot.value.entries.length === 0) return this.#refuse("validateShape: raw schema enum must be a non-empty array", "schema");
				if (!snapshot.value.dense) return this.#refuse("validateShape: raw schema enum must be dense", "schema");
				const values = collectMembers([]);
				for (let valueIndex = 0; valueIndex < snapshot.value.entries.length; valueIndex += 1) {
					const value = snapshot.value.entries[valueIndex];
					if (!isLiteralValue(value) || typeof value === "number" && !INTRINSICS.finite(value) || matchesMember(values, value)) return this.#refuse("validateShape: raw schema enum values must be finite unique primitives", "schema");
					admitMember(values, value);
				}
			}
			const names = schema.required;
			if (names !== void 0) {
				if (!INTRINSICS.array(names)) return this.#refuse("validateShape: raw schema required must be an array", "schema");
				const snapshot = readArrayEntries(names);
				if (!snapshot.success) return this.#refuse("validateShape: raw schema required must be an array", "schema");
				if (!snapshot.value.dense) return this.#refuse("validateShape: raw schema required must be dense", "schema");
				const required = collectMembers([]);
				for (let valueIndex = 0; valueIndex < snapshot.value.entries.length; valueIndex += 1) {
					const value = snapshot.value.entries[valueIndex];
					if (value === void 0) continue;
					if (typeof value !== "string" || matchesMember(required, value)) return this.#refuse("validateShape: raw schema required values must be unique strings", "schema");
					admitMember(required, value);
				}
			}
			const nested = [];
			if (schema.items !== void 0) nested[nested.length] = schema.items;
			if (schema.properties !== void 0) {
				if (!isRecord(schema.properties)) return this.#refuse("validateShape: raw schema properties must be a plain record", "schema");
				const propertyList = INTRINSICS.keys(schema.properties);
				for (let propertyIndex = 0; propertyIndex < propertyList.length; propertyIndex += 1) {
					const key = propertyList[propertyIndex];
					if (key === void 0) continue;
					nested[nested.length] = schema.properties[key];
				}
			}
			if (schema.additionalProperties !== void 0 && schema.additionalProperties !== true && schema.additionalProperties !== false) nested[nested.length] = schema.additionalProperties;
			const unionList = ["anyOf", "oneOf"];
			for (let unionIndex = 0; unionIndex < unionList.length; unionIndex += 1) {
				const key = unionList[unionIndex];
				if (key === void 0) continue;
				const variants = schema[key];
				if (variants === void 0) continue;
				if (!INTRINSICS.array(variants)) return this.#refuse("validateShape: raw schema unions must be non-empty arrays", "schema");
				const snapshot = readArrayEntries(variants);
				if (!snapshot.success || snapshot.value.entries.length === 0) return this.#refuse("validateShape: raw schema unions must be non-empty arrays", "schema");
				if (!snapshot.value.dense) return this.#refuse("validateShape: raw schema unions must be dense arrays", "schema");
				for (let variantIndex = 0; variantIndex < snapshot.value.entries.length; variantIndex += 1) nested[nested.length] = snapshot.value.entries[variantIndex];
			}
			stack[stack.length] = {
				operation: "exit",
				schema,
				nested
			};
			for (let index = nested.length - 1; index >= 0; index -= 1) stack[stack.length] = {
				operation: "enter",
				schema: nested[index]
			};
		}
		this.#raw = INTRINSICS.reflect.apply(INTRINSICS.recall, this.#schemas, [source]) ?? 0;
		return true;
	}
	#settleSchema(schema, nested) {
		let height = 0;
		for (let index = 0; index < nested.length; index += 1) {
			const child = nested[index];
			const recorded = typeof child !== "object" || child === null ? 0 : INTRINSICS.reflect.apply(INTRINSICS.recall, this.#schemas, [child]) ?? 0;
			if (recorded + 1 > height) height = recorded + 1;
		}
		INTRINSICS.reflect.apply(INTRINSICS.retain, this.#schemas, [schema, height]);
	}
	#populate(current) {
		switch (current.category) {
			case "array":
				this.#children[this.#children.length] = {
					shape: current.items,
					first: "items",
					optional: false
				};
				break;
			case "object": {
				const properties = current.properties;
				if (!isRecord(properties)) return this.#refuse("validateShape: properties must be a plain property map", "properties");
				const keys = INTRINSICS.keys(properties);
				for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
					const key = keys[keyIndex];
					if (key === void 0) continue;
					const descriptorOutcome = attempt(() => INTRINSICS.describe(properties, key));
					if (!descriptorOutcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "properties", key);
					const descriptor = descriptorOutcome.value;
					if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) {
						this.#children[this.#children.length] = {
							shape: void 0,
							first: "properties",
							second: key,
							optional: true
						};
						continue;
					}
					const childOutcome = attempt(() => current.properties[key]);
					if (!childOutcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "properties", key);
					const child = childOutcome.value;
					const stable = attempt(() => INTRINSICS.same(current.properties[key], child) && INTRINSICS.same(descriptor.value, child));
					if (!stable.success) return this.#refuse("validateShape: every node must be a recognized shape", "properties", key);
					if (!stable.value) {
						this.#children[this.#children.length] = {
							shape: void 0,
							first: "properties",
							second: key,
							optional: true
						};
						continue;
					}
					this.#children[this.#children.length] = {
						shape: child,
						first: "properties",
						second: key,
						optional: true
					};
				}
				const extra = current.additionalProperties;
				if (extra !== void 0 && extra !== true && extra !== false) this.#children[this.#children.length] = {
					shape: extra,
					first: "additionalProperties",
					optional: false
				};
				break;
			}
			case "union": {
				if (!INTRINSICS.array(current.variants)) return this.#refuse("validateShape: variants must be a finite array", "variants");
				const snapshot = readArrayEntries(current.variants);
				if (!snapshot.success) return this.#refuse("validateShape: variants must be a finite array", "variants");
				if (!snapshot.value.dense) return this.#refuse("validateShape: variants must be a dense data array", "variants");
				const variants = snapshot.value.entries;
				const length = variants.length;
				if (this.#domain === void 0 && length === 0) this.#domain = new ContractError("validateShape: a union shape needs at least one variant", {
					code: "empty",
					context: {
						path: pathOf(this.#path),
						shape: "union"
					}
				});
				for (let index = 0; index < length; index += 1) {
					const key = INTRINSICS.text(index);
					const descriptorOutcome = attempt(() => INTRINSICS.describe(current.variants, key));
					if (!descriptorOutcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "variants", key);
					const descriptor = descriptorOutcome.value;
					if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) {
						this.#children[this.#children.length] = {
							shape: void 0,
							first: "variants",
							second: key,
							optional: false
						};
						continue;
					}
					const variant = variants[index];
					const stable = attempt(() => INTRINSICS.same(current.variants[index], variant) && INTRINSICS.same(descriptor.value, variant));
					if (!stable.success) return this.#refuse("validateShape: every node must be a recognized shape", "variants", key);
					if (!stable.value) {
						this.#children[this.#children.length] = {
							shape: void 0,
							first: "variants",
							second: key,
							optional: false
						};
						continue;
					}
					this.#children[this.#children.length] = {
						shape: variant,
						first: "variants",
						second: key,
						optional: false
					};
				}
				break;
			}
			case "literal": {
				if (!INTRINSICS.array(current.values)) return this.#refuse("validateShape: values must be a finite literal array", "values");
				const snapshot = readArrayEntries(current.values);
				if (!snapshot.success) return this.#refuse("validateShape: values must be a finite literal array", "values");
				if (!snapshot.value.dense) return this.#refuse("validateShape: values must be a dense data array", "values");
				const literals = snapshot.value.entries;
				const length = literals.length;
				if (this.#domain === void 0 && length === 0) this.#domain = new ContractError("validateShape: a literal shape needs at least one value", {
					code: "empty",
					context: {
						path: pathOf(this.#path),
						shape: "literal"
					}
				});
				const values = collectMembers([]);
				for (let index = 0; index < length; index += 1) {
					const key = INTRINSICS.text(index);
					const descriptorOutcome = attempt(() => INTRINSICS.describe(current.values, key));
					if (!descriptorOutcome.success) return this.#refuse("validateShape: every node must be a recognized shape", "values", key);
					const descriptor = descriptorOutcome.value;
					if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) return this.#refuse("validateShape: values must be a dense data array", "values", key);
					const value = literals[index];
					const stable = attempt(() => INTRINSICS.same(current.values[index], value) && INTRINSICS.same(descriptor.value, value));
					if (!stable.success) return this.#refuse("validateShape: every node must be a recognized shape", "values", key);
					if (!stable.value) return this.#refuse("validateShape: values must be a stable data array", "values", key);
					if (!isLiteralValue(value)) return this.#refuse("validateShape: every literal value must be a string, number, or boolean", "values", key);
					if (matchesMember(values, value)) return this.#refuse("validateShape: literal values must be unique", "values", key);
					admitMember(values, value);
					if (this.#domain === void 0 && typeof value === "number" && !INTRINSICS.finite(value)) this.#domain = new ContractError("validateShape: a literal shape may not contain non-finite number values", {
						code: "literal",
						context: {
							path: pathOf(this.#path),
							shape: "literal",
							received: INTRINSICS.text(value)
						}
					});
				}
				break;
			}
			case "optional":
			case "nullable": this.#children[this.#children.length] = {
				shape: current.inner,
				first: "inner",
				optional: false
			};
		}
		return true;
	}
	#schedule(current, depth, segments) {
		admitVisited(this.#active, current);
		const children = [];
		for (let index = 0; index < this.#children.length; index += 1) {
			const child = this.#children[index];
			if (child === void 0) continue;
			children[children.length] = child;
		}
		const captured = this.#capture(current, children);
		this.#stack[this.#stack.length] = {
			operation: "exit",
			index: captured,
			segments
		};
		for (let index = children.length - 1; index >= 0; index -= 1) {
			const child = children[index];
			if (child === void 0) continue;
			this.#stack[this.#stack.length] = {
				operation: "enter",
				shape: child.shape,
				depth: depth + 1,
				optional: child.optional,
				first: child.first,
				...child.second === void 0 ? {} : { second: child.second }
			};
		}
		return captured;
	}
	#capture(shape, children) {
		const index = this.#captures.length;
		this.#captures[index] = {
			shape,
			category: this.#category,
			children,
			raw: this.#raw
		};
		INTRINSICS.reflect.apply(INTRINSICS.retain, this.#index, [shape, index]);
		return index;
	}
	#locate(shape) {
		if (shape === void 0) return void 0;
		return INTRINSICS.reflect.apply(INTRINSICS.recall, this.#index, [shape]);
	}
	#measure() {
		for (let index = 0; index < this.#captures.length; index += 1) {
			this.#height[index] = 0;
			this.#reach[index] = 0;
			this.#counts[index] = 1;
		}
		if (this.#cycle !== void 0) {
			this.#trace();
			return;
		}
		for (let step = 0; step < this.#post.length; step += 1) {
			const index = this.#post[step];
			if (index === void 0) continue;
			const capture = this.#captures[index];
			if (capture === void 0) continue;
			let height = 0;
			let count = 1;
			for (let edge = 0; edge < capture.children.length; edge += 1) {
				const child = capture.children[edge];
				if (child === void 0) continue;
				const located = this.#locate(child.shape);
				const reached = located === void 0 ? 0 : this.#height[located] ?? 0;
				if (reached + 1 > height) height = reached + 1;
				count += located === void 0 ? 1 : this.#counts[located] ?? 1;
			}
			this.#height[index] = height;
			this.#counts[index] = count;
		}
		if ((this.#height[0] ?? 0) > 512) this.#witness();
		for (let step = this.#post.length - 1; step >= 0; step -= 1) {
			const index = this.#post[step];
			if (index === void 0) continue;
			const capture = this.#captures[index];
			if (capture === void 0) continue;
			const base = this.#reach[index] ?? 0;
			for (let edge = 0; edge < capture.children.length; edge += 1) {
				const child = capture.children[edge];
				if (child === void 0) continue;
				const located = this.#locate(child.shape);
				if (located === void 0) continue;
				if ((this.#reach[located] ?? 0) >= base + 1) continue;
				this.#reach[located] = base + 1;
				this.#via[located] = {
					parent: index,
					first: child.first,
					...child.second === void 0 ? {} : { second: child.second }
				};
			}
		}
		for (let index = 0; index < this.#captures.length; index += 1) {
			const capture = this.#captures[index];
			if (capture === void 0 || capture.raw === 0) continue;
			if ((this.#reach[index] ?? 0) + capture.raw <= 512) continue;
			this.#structure ??= new ContractError("validateShape: raw schema exceeds the compilation depth limit", {
				code: "structure",
				context: { path: pathOf(this.#ascend(index), "schema") }
			});
		}
	}
	#ascend(index) {
		const reversed = [];
		let current = index;
		while (current !== 0) {
			const edge = this.#via[current];
			if (edge === void 0) break;
			if (edge.second !== void 0) reversed[reversed.length] = edge.second;
			reversed[reversed.length] = edge.first;
			current = edge.parent;
		}
		const path = [];
		for (let step = reversed.length - 1; step >= 0; step -= 1) {
			const segment = reversed[step];
			if (segment === void 0) continue;
			path[path.length] = segment;
		}
		return path;
	}
	#witness() {
		const path = [];
		let index = 0;
		let depth = 0;
		while (depth <= 512) {
			const capture = index === void 0 ? void 0 : this.#captures[index];
			const children = capture === void 0 ? [] : capture.children;
			let chosen;
			for (let edge = 0; edge < children.length; edge += 1) {
				const child = children[edge];
				if (child === void 0) continue;
				const located = this.#locate(child.shape);
				const reached = located === void 0 ? 0 : this.#height[located] ?? 0;
				if (depth + 1 + reached > 512) {
					chosen = child;
					index = located;
					break;
				}
			}
			if (chosen === void 0) break;
			path[path.length] = chosen.first;
			if (chosen.second !== void 0) path[path.length] = chosen.second;
			depth += 1;
		}
		throw new ContractError("validateShape: a shape exceeds the compilation depth limit", {
			code: "depth",
			context: {
				path: pathOf(path),
				limit: 512
			}
		});
	}
	#trace() {
		const settled = [];
		const order = [];
		let clock = 0;
		let oldest = 0;
		const active = new ShapeValidator.#weakSet();
		const path = [];
		const stack = [{
			operation: "enter",
			index: 0,
			depth: 0
		}];
		while (stack.length > 0) {
			const frame = stack.pop();
			if (frame === void 0) continue;
			if (frame.operation === "exit") {
				const capture = this.#captures[frame.index];
				if (capture !== void 0) omitVisited(active, capture.shape);
				if (oldest >= (order[frame.index] ?? 0) && (settled[frame.index] ?? -1) < frame.depth) settled[frame.index] = frame.depth;
				if (frame.outer < oldest) oldest = frame.outer;
				path.length -= frame.segments;
				continue;
			}
			let segments = 0;
			if (frame.first !== void 0) {
				path[path.length] = frame.first;
				segments += 1;
			}
			if (frame.second !== void 0) {
				path[path.length] = frame.second;
				segments += 1;
			}
			if (frame.depth > 512) throw new ContractError("validateShape: a shape exceeds the compilation depth limit", {
				code: "depth",
				context: {
					path: pathOf(path),
					limit: 512
				}
			});
			const index = frame.index;
			const capture = index === void 0 ? void 0 : this.#captures[index];
			if (index === void 0 || capture === void 0) {
				path.length -= segments;
				continue;
			}
			if (matchesVisited(active, capture.shape)) {
				const blocker = order[index] ?? 0;
				if (blocker < oldest) oldest = blocker;
				path.length -= segments;
				continue;
			}
			const recorded = settled[index];
			if (recorded !== void 0 && frame.depth <= recorded) {
				path.length -= segments;
				continue;
			}
			admitVisited(active, capture.shape);
			order[index] = clock;
			clock += 1;
			stack[stack.length] = {
				operation: "exit",
				index,
				depth: frame.depth,
				segments,
				outer: oldest
			};
			oldest = clock;
			for (let edge = capture.children.length - 1; edge >= 0; edge -= 1) {
				const child = capture.children[edge];
				if (child === void 0) continue;
				stack[stack.length] = {
					operation: "enter",
					index: this.#locate(child.shape),
					depth: frame.depth + 1,
					first: child.first,
					...child.second === void 0 ? {} : { second: child.second }
				};
			}
		}
	}
	#finish() {
		if (this.#structure !== void 0) throw this.#structure;
		if (this.#cycle !== void 0) throw this.#cycle;
		if (this.#domain !== void 0) throw this.#domain;
	}
	#refuse(message, first, second) {
		if (this.#structure === void 0) {
			const path = pathOf(this.#path, first, second);
			this.#structure = new ContractError(message, {
				code: "structure",
				context: { path }
			});
		}
		return false;
	}
	static {
		pinMembers(ShapeValidator.prototype, "ShapeValidator");
	}
};
/**
* Owns the state of one contract-shape snapshot operation.
*
* @remarks
* Construction retains the source without observing it. The first
* {@link clone} call captures and validates one owned graph and settles
* permanently. Success replays the exact frozen root; failure rethrows the
* exact class-owned or directly adopted error. Nonredirectable settlement
* releases populated traversal state before publishing that result. Reentry
* poisons the active operation and every later call with one shared cause-free
* error.
*
* @param shape - The contract-shape graph to retain for cloning
*
* @example
* ```ts
* const cloner = new ShapeCloner({ category: 'string', min: 1 })
* const clone = cloner.clone()
* cloner.clone() === clone // true
* ```
*/
var ShapeCloner = class ShapeCloner {
	static #map = Map;
	static #weakSet = WeakSet;
	static #emptyPending = [];
	static #emptySources = [];
	#source;
	#owned;
	#memo;
	#paths;
	#properties;
	#variants;
	#pending;
	#sources;
	#fidelity;
	#state;
	constructor(shape) {
		this.#source = shape;
		this.#owned = new ShapeCloner.#weakSet();
		this.#memo = new ShapeCloner.#map();
		this.#paths = new ShapeCloner.#map();
		this.#properties = new ShapeCloner.#map();
		this.#variants = new ShapeCloner.#map();
		this.#pending = [];
		this.#sources = [];
		this.#fidelity = void 0;
		this.#state = { phase: "ready" };
	}
	/**
	* Clones the retained declaration into an owned, validated frozen graph.
	*
	* @returns The settled contract-shape snapshot
	* @throws {ContractError} When the declaration is malformed, unreadable, cyclic, too deep, or cloning is reentered
	*/
	clone() {
		const state = this.#state;
		if (state.phase === "settled") {
			if (state.result.success) return state.result.value;
			throw state.result.error;
		}
		if (state.phase === "running" || state.phase === "interrupted") {
			this.#state = {
				phase: "interrupted",
				poison: state.poison
			};
			throw state.poison;
		}
		const poison = this.#create("ShapeCloner.clone: shape cloning may not be reentered", {
			code: "clone",
			context: { shape: "shape" }
		});
		this.#state = {
			phase: "running",
			poison
		};
		return this.#complete(attempt(() => this.#execute()));
	}
	#complete(outcome) {
		const state = this.#state;
		if (state.phase === "interrupted") return this.#settle({
			success: false,
			error: state.poison
		});
		if (outcome.success) return this.#settle(outcome);
		const error = this.#owns(outcome.error) ? outcome.error : this.#create("cloneShape: failed to create an owned shape snapshot", {
			code: "clone",
			context: { shape: "shape" },
			cause: outcome.error
		});
		return this.#settle({
			success: false,
			error
		});
	}
	#execute() {
		const paths = this.#paths;
		const memo = this.#memo;
		if (paths === void 0 || memo === void 0) throw this.#unavailable();
		INTRINSICS.reflect.apply(INTRINSICS.store, paths, [this.#source, []]);
		this.#pending[this.#pending.length] = {
			shape: this.#source,
			depth: 0
		};
		this.#drain();
		this.#wireNodes();
		const root = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [this.#source]);
		if (root === void 0) throw this.#create("ShapeCloner.clone: captured root is unavailable", {
			code: "clone",
			context: { shape: "shape" }
		});
		this.#freezeNodes();
		this.#validateShape(root);
		if (this.#fidelity !== void 0) throw this.#fidelity;
		return root;
	}
	#drain() {
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		let cursor = 0;
		while (cursor < this.#pending.length) {
			const entry = this.#pending[cursor];
			cursor += 1;
			if (entry === void 0) continue;
			if (INTRINSICS.reflect.apply(INTRINSICS.keyed, memo, [entry.shape])) continue;
			if (entry.depth > 512) this.#refuseDepth();
			this.#captureNode(entry.shape, entry.depth);
		}
	}
	#refuseDepth() {
		this.#validateShape(this.#source);
		throw this.#create("validateShape: a shape exceeds the compilation depth limit", {
			code: "depth",
			context: {
				path: [],
				limit: 512
			}
		});
	}
	#captureShell(source, path) {
		if (!matchesRecordBrand(source)) throw this.#create("validateShape: every structural child must be a shape", {
			code: "structure",
			context: { path }
		});
		const descriptor = INTRINSICS.describe(source, "category");
		if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) throw this.#create("cloneShape: every node needs an own data discriminant", {
			code: "structure",
			context: { path }
		});
		const category = source.category;
		const repeated = source.category;
		if (!INTRINSICS.same(descriptor.value, category) || !INTRINSICS.same(repeated, category)) throw this.#create("cloneShape: every node needs an own data discriminant", {
			code: "structure",
			context: { path }
		});
		switch (category) {
			case "string": return this.#captureString(source, path);
			case "number": return this.#captureNumber(source, path);
			case "boolean": return this.#captureSimple(source, path, "boolean");
			case "null": return this.#captureSimple(source, path, "null");
			case "literal": return this.#captureLiteral(source, path);
			case "array": return this.#captureArray(source, path);
			case "object": return this.#captureObject(source, path);
			case "union": return this.#captureUnion(source, path);
			case "optional": return this.#captureWrapper(source, path, "optional");
			case "nullable": return this.#captureWrapper(source, path, "nullable");
			case "json": return this.#captureSimple(source, path, "json");
			case "raw": return this.#captureRaw(source, path);
			default: throw this.#create("validateShape: every node must be a recognized shape", {
				code: "structure",
				context: { path }
			});
		}
	}
	#captureField(source, field, path) {
		const descriptor = INTRINSICS.describe(source, field);
		if (descriptor === void 0) {
			if (INTRINSICS.reflect.present(source, field)) throw this.#create("cloneShape: inherited shape fields cannot be owned", {
				code: "structure",
				context: { path: pathOf(path, field) }
			});
			return;
		}
		if (!INTRINSICS.own(descriptor, "value")) throw this.#create("cloneShape: shape accessors cannot be owned faithfully", {
			code: "structure",
			context: { path: pathOf(path, field) }
		});
		const first = source[field];
		const second = source[field];
		if (!INTRINSICS.same(first, descriptor.value) || !INTRINSICS.same(second, first)) throw this.#create("cloneShape: shape fields must be stable data", {
			code: "structure",
			context: { path: pathOf(path, field) }
		});
		return first;
	}
	#capturePattern(source, path) {
		const descriptor = INTRINSICS.describe(source, "pattern");
		if (descriptor === void 0) {
			if (INTRINSICS.reflect.present(source, "pattern")) throw this.#create("cloneShape: inherited shape fields cannot be owned", {
				code: "structure",
				context: { path: pathOf(path, "pattern") }
			});
			return;
		}
		if (INTRINSICS.own(descriptor, "value")) {
			const first = source.pattern;
			const second = source.pattern;
			if (!INTRINSICS.same(first, descriptor.value) || !INTRINSICS.same(second, first)) throw this.#create("cloneShape: shape fields must be stable data", {
				code: "structure",
				context: { path: pathOf(path, "pattern") }
			});
			return this.#capturePatternValue(first, path);
		}
		const first = source.pattern;
		const second = source.pattern;
		if (!isRegExp(first) || !isRegExp(second)) throw this.#create("cloneShape: shape accessors cannot be owned faithfully", {
			code: "structure",
			context: { path: pathOf(path, "pattern") }
		});
		const firstValue = this.#capturePatternValue(first, path);
		if (firstValue === void 0) return void 0;
		const secondValue = this.#capturePatternValue(second, path);
		if (secondValue === void 0) return void 0;
		if (firstValue.source !== secondValue.source || firstValue.flags !== secondValue.flags || !INTRINSICS.frozen(first) || !INTRINSICS.frozen(second)) throw this.#create("cloneShape: shape accessors cannot be owned faithfully", {
			code: "structure",
			context: { path: pathOf(path, "pattern") }
		});
		return firstValue;
	}
	#capturePatternValue(pattern, path) {
		if (pattern === void 0) return void 0;
		if (!isRegExp(pattern)) throw this.#create("validateShape: string pattern must be a RegExp", {
			code: "structure",
			context: { path: pathOf(path, "pattern") }
		});
		const sourceText = readPatternSource(pattern);
		const flags = readPatternFlags(pattern);
		const repeated = attempt(() => {
			return {
				flags: readPatternFlags(pattern),
				source: readPatternSource(pattern)
			};
		});
		if (typeof sourceText !== "string" || typeof flags !== "string" || !repeated.success || typeof repeated.value.source !== "string" || typeof repeated.value.flags !== "string" || repeated.value.source !== sourceText || repeated.value.flags !== flags) {
			this.#fidelity ??= this.#create("validateShape: string pattern must be stable", {
				code: "structure",
				context: { path: pathOf(path, "pattern") }
			});
			return;
		}
		return {
			source: sourceText,
			flags
		};
	}
	#captureNode(source, depth) {
		const paths = this.#paths;
		const memo = this.#memo;
		if (paths === void 0 || memo === void 0) throw this.#unavailable();
		const path = INTRINSICS.reflect.apply(INTRINSICS.fetch, paths, [source]) ?? [];
		const clone = this.#captureShell(source, path);
		INTRINSICS.reflect.apply(INTRINSICS.store, memo, [source, clone]);
		this.#sources[this.#sources.length] = source;
		this.#scheduleNode(source, clone, path, depth);
	}
	#captureString(source, path) {
		const min = this.#captureField(source, "min", path);
		const max = this.#captureField(source, "max", path);
		const pattern = this.#capturePattern(source, path);
		const description = this.#captureField(source, "description", path);
		const fields = {
			category: "string",
			...min === void 0 ? {} : { min },
			...max === void 0 ? {} : { max },
			...description === void 0 ? {} : { description }
		};
		if (pattern === void 0) return fields;
		const sourceText = pattern.source;
		const flags = pattern.flags;
		return {
			...fields,
			get pattern() {
				return INTRINSICS.freeze(new INTRINSICS.pattern(sourceText, flags));
			}
		};
	}
	#captureNumber(source, path) {
		const integer = this.#captureField(source, "integer", path);
		const min = this.#captureField(source, "min", path);
		const max = this.#captureField(source, "max", path);
		const description = this.#captureField(source, "description", path);
		return {
			category: "number",
			...min === void 0 ? {} : { min },
			...max === void 0 ? {} : { max },
			...integer === void 0 ? {} : { integer },
			...description === void 0 ? {} : { description }
		};
	}
	#captureSimple(source, path, category) {
		const description = this.#captureField(source, "description", path);
		if (category === "boolean") return {
			category: "boolean",
			...description === void 0 ? {} : { description }
		};
		if (category === "null") return {
			category: "null",
			...description === void 0 ? {} : { description }
		};
		return {
			category: "json",
			...description === void 0 ? {} : { description }
		};
	}
	#captureLiteral(source, path) {
		const values = this.#captureField(source, "values", path);
		const description = this.#captureField(source, "description", path);
		return {
			category: "literal",
			values: this.#captureLiterals(values, path),
			...description === void 0 ? {} : { description }
		};
	}
	#captureArray(source, path) {
		const items = this.#captureField(source, "items", path);
		const min = this.#captureField(source, "min", path);
		const max = this.#captureField(source, "max", path);
		const description = this.#captureField(source, "description", path);
		if (items === void 0) throw this.#create("validateShape: every structural child must be a shape", {
			code: "structure",
			context: { path: pathOf(path, "items") }
		});
		return {
			category: "array",
			items,
			...min === void 0 ? {} : { min },
			...max === void 0 ? {} : { max },
			...description === void 0 ? {} : { description }
		};
	}
	#captureObject(source, path) {
		const propertySource = this.#captureField(source, "properties", path);
		const additional = this.#captureField(source, "additionalProperties", path);
		const description = this.#captureField(source, "description", path);
		if (!isRecord(propertySource)) throw this.#create("validateShape: properties must be a plain property map", {
			code: "structure",
			context: { path: pathOf(path, "properties") }
		});
		this.#captureProperties(source, propertySource, path);
		return {
			category: "object",
			properties: INTRINSICS.create(null),
			...additional === void 0 ? {} : { additionalProperties: additional },
			...description === void 0 ? {} : { description }
		};
	}
	#captureUnion(source, path) {
		const variantSource = this.#captureField(source, "variants", path);
		const mode = this.#captureField(source, "mode", path);
		const description = this.#captureField(source, "description", path);
		this.#captureVariants(source, variantSource, path);
		return {
			category: "union",
			variants: [],
			...mode === void 0 ? {} : { mode },
			...description === void 0 ? {} : { description }
		};
	}
	#captureWrapper(source, path, category) {
		const inner = this.#captureField(source, "inner", path);
		if (inner === void 0) throw this.#create("validateShape: every structural child must be a shape", {
			code: "structure",
			context: { path: pathOf(path, "inner") }
		});
		return category === "optional" ? {
			category: "optional",
			inner
		} : {
			category: "nullable",
			inner
		};
	}
	#captureRaw(source, path) {
		const schema = this.#captureField(source, "schema", path);
		if (!isRecord(schema)) throw this.#create("validateShape: raw schema must be a plain record", {
			code: "structure",
			context: { path: pathOf(path, "schema") }
		});
		this.#validateShape({
			category: "raw",
			schema
		});
		const outcome = attempt(() => new SchemaCloner(schema).clone());
		if (!outcome.success) {
			if (isContractError(outcome.error)) admitVisited(this.#owned, outcome.error);
			throw outcome.error;
		}
		return {
			category: "raw",
			schema: outcome.value
		};
	}
	#captureLiterals(values, path) {
		if (!INTRINSICS.array(values)) throw this.#create("validateShape: values must be a finite literal array", {
			code: "structure",
			context: { path: pathOf(path, "values") }
		});
		const snapshot = readArrayEntries(values);
		if (!snapshot.success) throw this.#create("validateShape: values must be a finite literal array", {
			code: "structure",
			context: { path: pathOf(path, "values") }
		});
		if (!snapshot.value.dense) throw this.#create("validateShape: values must be a dense data array", {
			code: "structure",
			context: { path: pathOf(path, "values") }
		});
		const entries = [];
		for (let index = 0; index < snapshot.value.entries.length; index += 1) entries[entries.length] = this.#literal(values, snapshot.value.entries[index], index, path);
		return INTRINSICS.freeze(entries);
	}
	#literal(values, value, index, path) {
		const key = INTRINSICS.text(index);
		const descriptor = attempt(() => INTRINSICS.describe(values, key));
		const repeated = attempt(() => values[index]);
		if (!descriptor.success || descriptor.value === void 0 || !INTRINSICS.own(descriptor.value, "value")) this.#fidelity ??= this.#create("validateShape: values must be a dense data array", {
			code: "structure",
			context: { path: pathOf(path, "values", key) }
		});
		else if (!repeated.success || !INTRINSICS.same(repeated.value, value) || !INTRINSICS.same(descriptor.value.value, value)) this.#fidelity ??= this.#create("validateShape: values must be a stable data array", {
			code: "structure",
			context: { path: pathOf(path, "values", key) }
		});
		if (!isLiteralValue(value)) throw this.#create("validateShape: every literal value must be a string, number, or boolean", {
			code: "structure",
			context: { path: pathOf(path, "values", key) }
		});
		return value;
	}
	#captureProperties(source, properties, path) {
		const keys = INTRINSICS.keys(properties);
		const snapshot = [];
		for (let index = 0; index < keys.length; index += 1) {
			const key = keys[index];
			if (key === void 0) continue;
			const descriptor = INTRINSICS.describe(properties, key);
			if (descriptor === void 0 || !INTRINSICS.own(descriptor, "value")) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "properties", key) }
			});
			const child = properties[key];
			const repeated = properties[key];
			const described = descriptor.value;
			if (!INTRINSICS.same(described, child) || !INTRINSICS.same(child, repeated)) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "properties", key) }
			});
			snapshot[snapshot.length] = {
				key,
				child
			};
		}
		const repeated = INTRINSICS.keys(properties);
		let drifted = repeated.length !== keys.length;
		for (let index = 0; index < repeated.length; index += 1) if (repeated[index] !== keys[index]) drifted = true;
		if (drifted) throw this.#create("cloneShape: property keys must be stable data", {
			code: "structure",
			context: { path: pathOf(path, "properties") }
		});
		const captured = this.#properties;
		if (captured === void 0) throw this.#unavailable();
		INTRINSICS.reflect.apply(INTRINSICS.store, captured, [source, snapshot]);
	}
	#captureVariants(source, variants, path) {
		if (!INTRINSICS.array(variants)) throw this.#create("validateShape: variants must be a finite array", {
			code: "structure",
			context: { path: pathOf(path, "variants") }
		});
		const snapshot = readArrayEntries(variants);
		if (!snapshot.success) throw this.#create("validateShape: variants must be a finite array", {
			code: "structure",
			context: { path: pathOf(path, "variants") }
		});
		if (!snapshot.value.dense) throw this.#create("validateShape: variants must be a dense data array", {
			code: "structure",
			context: { path: pathOf(path, "variants") }
		});
		const entries = snapshot.value.entries;
		const captured = this.#variants;
		if (captured === void 0) throw this.#unavailable();
		INTRINSICS.reflect.apply(INTRINSICS.store, captured, [source, entries]);
		for (let index = 0; index < entries.length; index += 1) {
			const variant = entries[index];
			const key = INTRINSICS.text(index);
			const descriptor = attempt(() => INTRINSICS.describe(variants, key));
			const repeated = attempt(() => variants[index]);
			if (!descriptor.success || descriptor.value === void 0 || !INTRINSICS.own(descriptor.value, "value") || !repeated.success || !INTRINSICS.same(repeated.value, variant) || !INTRINSICS.same(descriptor.value.value, variant)) this.#fidelity ??= this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "variants", key) }
			});
		}
	}
	#scheduleNode(source, clone, path, depth) {
		switch (clone.category) {
			case "array":
				this.#registerChild(clone.items, pathOf(path, "items"), depth);
				break;
			case "object": {
				const captured = this.#properties;
				if (captured === void 0) throw this.#unavailable();
				const properties = INTRINSICS.reflect.apply(INTRINSICS.fetch, captured, [source]);
				if (properties === void 0) throw this.#create("cloneShape: properties could not be read", {
					code: "clone",
					context: {
						path: pathOf(path, "properties"),
						shape: "object"
					}
				});
				for (let index = 0; index < properties.length; index += 1) {
					const entry = properties[index];
					if (entry === void 0 || entry.child === void 0) continue;
					this.#registerChild(entry.child, pathOf(path, "properties", entry.key), depth);
				}
				const additional = clone.additionalProperties;
				if (additional !== void 0 && additional !== true && additional !== false) this.#registerChild(additional, pathOf(path, "additionalProperties"), depth);
				break;
			}
			case "union": {
				const captured = this.#variants;
				if (captured === void 0) throw this.#unavailable();
				const variants = INTRINSICS.reflect.apply(INTRINSICS.fetch, captured, [source]);
				if (variants === void 0) throw this.#create("validateShape: variants must be a finite array", {
					code: "structure",
					context: { path: pathOf(path, "variants") }
				});
				for (let index = 0; index < variants.length; index += 1) {
					const variant = variants[index];
					if (variant !== void 0) this.#registerChild(variant, pathOf(path, "variants", INTRINSICS.text(index)), depth);
				}
				break;
			}
			case "optional":
			case "nullable": this.#registerChild(clone.inner, pathOf(path, "inner"), depth);
		}
	}
	#registerChild(child, path, depth) {
		const paths = this.#paths;
		if (paths === void 0) throw this.#unavailable();
		INTRINSICS.reflect.apply(INTRINSICS.store, paths, [child, path]);
		this.#pending[this.#pending.length] = {
			shape: child,
			depth: depth + 1
		};
	}
	#wireNodes() {
		const memo = this.#memo;
		const paths = this.#paths;
		if (memo === void 0 || paths === void 0) throw this.#unavailable();
		for (let sourceIndex = 0; sourceIndex < this.#sources.length; sourceIndex += 1) {
			const source = this.#sources[sourceIndex];
			if (source === void 0) continue;
			const clone = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [source]);
			if (clone === void 0) continue;
			const path = INTRINSICS.reflect.apply(INTRINSICS.fetch, paths, [source]) ?? [];
			switch (clone.category) {
				case "array":
					this.#wireArray(clone, path);
					break;
				case "object":
					this.#wireObject(source, clone, path);
					break;
				case "union":
					this.#wireUnion(source, clone, path);
					break;
				case "optional":
				case "nullable": this.#wireWrapper(clone, path);
			}
		}
	}
	#wireArray(clone, path) {
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		const items = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [clone.items]);
		if (items === void 0) throw this.#create("validateShape: every structural child must be a shape", {
			code: "structure",
			context: { path: pathOf(path, "items") }
		});
		INTRINSICS.reflect.write(clone, "items", items);
	}
	#wireObject(source, clone, path) {
		const memo = this.#memo;
		const captured = this.#properties;
		if (memo === void 0 || captured === void 0) throw this.#unavailable();
		const snapshot = INTRINSICS.reflect.apply(INTRINSICS.fetch, captured, [source]);
		if (snapshot === void 0) throw this.#create("cloneShape: properties could not be read", {
			code: "clone",
			context: {
				path: pathOf(path, "properties"),
				shape: "object"
			}
		});
		const properties = INTRINSICS.create(null);
		for (let index = 0; index < snapshot.length; index += 1) {
			const entry = snapshot[index];
			if (entry === void 0) continue;
			const { key, child } = entry;
			if (child === void 0) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "properties", key) }
			});
			const cloned = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [child]);
			if (cloned === void 0) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "properties", key) }
			});
			properties[key] = cloned;
		}
		INTRINSICS.reflect.write(clone, "properties", INTRINSICS.freeze(properties));
		const additional = clone.additionalProperties;
		if (additional !== void 0 && additional !== true && additional !== false) {
			const cloned = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [additional]);
			if (cloned === void 0) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "additionalProperties") }
			});
			INTRINSICS.reflect.write(clone, "additionalProperties", cloned);
		}
	}
	#wireUnion(source, clone, path) {
		const memo = this.#memo;
		const captured = this.#variants;
		if (memo === void 0 || captured === void 0) throw this.#unavailable();
		const snapshot = INTRINSICS.reflect.apply(INTRINSICS.fetch, captured, [source]);
		if (snapshot === void 0) throw this.#create("validateShape: variants must be a finite array", {
			code: "structure",
			context: { path: pathOf(path, "variants") }
		});
		const variants = [];
		for (let index = 0; index < snapshot.length; index += 1) {
			const variant = snapshot[index];
			if (variant === void 0) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "variants", INTRINSICS.text(index)) }
			});
			const cloned = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [variant]);
			if (cloned === void 0) throw this.#create("validateShape: every structural child must be a shape", {
				code: "structure",
				context: { path: pathOf(path, "variants", INTRINSICS.text(index)) }
			});
			variants[variants.length] = cloned;
		}
		INTRINSICS.reflect.write(clone, "variants", INTRINSICS.freeze(variants));
	}
	#wireWrapper(clone, path) {
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		const inner = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [clone.inner]);
		if (inner === void 0) throw this.#create("validateShape: every structural child must be a shape", {
			code: "structure",
			context: { path: pathOf(path, "inner") }
		});
		INTRINSICS.reflect.write(clone, "inner", inner);
	}
	#freezeNodes() {
		const memo = this.#memo;
		if (memo === void 0) throw this.#unavailable();
		for (let sourceIndex = 0; sourceIndex < this.#sources.length; sourceIndex += 1) {
			const source = this.#sources[sourceIndex];
			if (source === void 0) continue;
			const clone = INTRINSICS.reflect.apply(INTRINSICS.fetch, memo, [source]);
			if (clone !== void 0) INTRINSICS.freeze(clone);
		}
	}
	#validateShape(shape) {
		const outcome = attempt(() => new ShapeValidator(shape).validate());
		if (outcome.success) return;
		if (isContractError(outcome.error)) admitVisited(this.#owned, outcome.error);
		throw outcome.error;
	}
	#unavailable() {
		return this.#create("ShapeCloner.clone: the capture state is unavailable", {
			code: "clone",
			context: { shape: "shape" }
		});
	}
	#create(message, options) {
		const error = new ContractError(message, options);
		admitVisited(this.#owned, error);
		return error;
	}
	#owns(error) {
		return isObject(error) && matchesVisited(this.#owned, error);
	}
	#settle(result) {
		this.#memo = void 0;
		this.#paths = void 0;
		this.#properties = void 0;
		this.#variants = void 0;
		this.#pending = ShapeCloner.#emptyPending;
		this.#sources = ShapeCloner.#emptySources;
		this.#fidelity = void 0;
		this.#state = {
			phase: "settled",
			result
		};
		if (result.success) return result.value;
		throw result.error;
	}
	static {
		INTRINSICS.freeze(ShapeCloner.#emptyPending);
		INTRINSICS.freeze(ShapeCloner.#emptySources);
		pinMembers(ShapeCloner.prototype, "ShapeCloner");
	}
};
/**
* Deep-clones exact JSON data into an owned frozen snapshot.
*
* @remarks
* Traverses iteratively so deeply nested input cannot exhaust the call stack.
* Repeated noncyclic aliases are duplicated because JSON persistence represents
* a tree, while a structural back-edge on the active path is rejected as a
* cycle. Arrays are rebuilt as standard dense arrays and records as
* null-prototype objects; every produced node is frozen after its children are
* wired. Array keys must be exactly `length` plus every canonical index.
* Writable and configurable index flags are normalized rather than treated as
* JSON data, so frozen arrays remain valid. Property descriptors are inspected
* without reading values through accessors, and every hostile reflective
* operation is contained before a new clone-coded error is exposed.
* Each call creates a fresh {@link JSONCloner}; use the class directly when
* terminal success or failure identity must be replayed without another read.
*
* @param value - The unknown value to validate and snapshot
* @returns The primitive unchanged, or a deeply cloned and frozen JSON graph
* @throws {ContractError} When the value is not exact acyclic JSON data or traversal fails
*
* @example
* ```ts
* const source = { settings: { enabled: true } }
* const clone = cloneJSONValue(source)
* source.settings.enabled = false
* clone // { settings: { enabled: true } }
* ```
*/
function cloneJSONValue(value) {
	return contain(() => {
		return new JSONCloner(value).clone();
	}, "cloneJSONValue");
}
/**
* Deep-clones an exact JSON object record into an owned frozen snapshot.
*
* @remarks
* Adds a record-root boundary to {@link cloneJSONValue}. The output is a
* deeply frozen null-prototype record, and repeated noncyclic aliases are
* duplicated as independent JSON tree branches.
*
* @param value - The unknown record value to validate and snapshot
* @returns A deeply cloned and frozen JSON record
* @throws {ContractError} When the root is not a record, nested data is inexact, or traversal fails
*
* @example
* ```ts
* cloneJSONRecord({ attempt: 1 }) // frozen null-prototype record
* ```
*/
function cloneJSONRecord(value) {
	return contain(() => {
		if (!isRecord(value)) throw new ContractError("cloneJSONRecord: value is not a plain record", {
			code: "clone",
			context: { shape: "json" }
		});
		const clone = cloneJSONValue(value);
		if (!isRecord(clone)) throw new ContractError("cloneJSONRecord: cloned value is not a record", {
			code: "clone",
			context: { shape: "json" }
		});
		return clone;
	}, "cloneJSONRecord");
}
/**
* Deep-clones a JSON Schema graph into an owned frozen snapshot.
*
* @remarks
* Walks arrays and records iteratively with a memo, preserving shared
* references and closing cyclic edges onto their cloned nodes. Primitive
* values and own enumerable string-keyed edges are copied; record nodes use
* null prototypes, arrays retain only their intrinsic array prototype, and
* every produced object is frozen after its edges are wired. Hostile traversal
* throws a clone-coded {@link ContractError}, never a caller-owned raw error.
* Each call creates a fresh {@link SchemaCloner}; use the class directly when
* terminal success or failure identity must be replayed without another read.
*
* @param schema - The JSON Schema graph to snapshot
* @returns A deeply cloned and frozen JSON Schema graph
* @throws {ContractError} When hostile schema traversal prevents ownership
*
* @example
* ```ts
* const child = { type: 'string' }
* const clone = cloneSchema({ anyOf: [child, child] })
* clone.anyOf?.[0] === clone.anyOf?.[1] // true
* ```
*/
function cloneSchema(schema) {
	return contain(() => {
		return new SchemaCloner(schema).clone();
	}, "cloneSchema");
}
function cloneShape(shape) {
	return contain(() => {
		return new ShapeCloner(shape).clone();
	}, "cloneShape");
}
/**
* Takes ownership of a contract shape node as an independent {@link cloneShape}
* snapshot of its graph.
*
* @remarks
* Every successful return is a deeply frozen caller-independent graph, and
* "frozen" here means frozen by the `Object.freeze` this package captured while
* it loaded, not by whatever `Object.freeze` names when the call is made. The
* distinction is the whole guarantee: a replaced `Object.freeze` that returns
* its argument untouched would otherwise let this door publish a mutable graph,
* with no throw and no signal a caller could read. A frozen caller root receives no identity
* exception: shallow freezing cannot establish ownership of nested collections,
* child nodes, raw schemas, or `RegExp` internal state, and the fidelity clone
* has already paid the traversal cost needed to prove and carry those values.
*
* @param shape - The contract shape to own
* @returns A deeply cloned frozen snapshot
* @throws {ContractError} When the declaration cannot be copied faithfully, when hostile shape or raw-schema traversal prevents ownership, or when a frozen root fails validation
*
* @example
* ```ts
* const authored = stringShape()
* ownShape(authored) === authored // false
* ```
*/
function ownShape(shape) {
	return contain(() => {
		const frozen = holds(() => INTRINSICS.frozen(shape));
		const fidelity = attempt(() => cloneShape(shape));
		if (fidelity.success) return fidelity.value;
		if (isContractError(fidelity.error) && fidelity.error.code !== "clone") throw fidelity.error;
		if (!frozen) throw fidelity.error;
		const validation = attempt(() => new ShapeValidator(shape).validate());
		if (!validation.success && isContractError(validation.error)) throw validation.error;
		throw fidelity.error;
	}, "ownShape");
}
function arrayOf(elementGuard) {
	return (value) => holds(() => {
		if (!isArray(value)) return false;
		const entries = readArrayEntries(value);
		if (!entries.success || !entries.value.dense) return false;
		for (let index = 0; index < entries.value.entries.length; index += 1) if (!elementGuard(entries.value.entries[index])) return false;
		return true;
	});
}
function tupleOf(...guards) {
	return (value) => holds(() => {
		if (!isArray(value)) return false;
		const entries = readArrayEntries(value);
		if (!entries.success || !entries.value.dense) return false;
		if (entries.value.entries.length !== guards.length) return false;
		for (let index = 0; index < guards.length; index += 1) {
			const guard = guards[index];
			if (guard === void 0 || !guard(entries.value.entries[index])) return false;
		}
		return true;
	});
}
function literalOf(...literals) {
	return contain(() => {
		const first = literals[0];
		const snapshot = (literals.length === 1 ? readValue(() => INTRINSICS.array(first), "literalOf", {
			subject: "literals",
			context: {
				path: ["literals"],
				shape: "literal"
			}
		}) : false) && isArray(first) ? readValue(() => {
			const entries = readArrayEntries(first);
			if (!entries.success) throw entries.error;
			if (!entries.value.dense) throw new INTRINSICS.error("Literal vocabulary must be dense");
			return entries.value.entries;
		}, "literalOf", {
			subject: "literals",
			context: {
				path: ["literals"],
				shape: "literal"
			}
		}) : literals;
		let literal = true;
		for (let index = 0; index < snapshot.length; index += 1) if (!isLiteralValue(snapshot[index])) literal = false;
		if (!literal) throw new ContractError("literalOf: literals must contain only string, number, or boolean values", {
			code: "literal",
			context: {
				path: ["literals"],
				shape: "literal"
			}
		});
		const allowed = collectMembers(snapshot);
		return (value) => holds(() => matchesMember(allowed, value));
	}, "literalOf", {
		code: "literal",
		context: {
			path: ["literals"],
			shape: "literal"
		}
	});
}
/**
* Builds a guard that accepts instances of the provided constructor.
*
* @remarks
* Verifies that `ctor` is a real constructor (through {@link isConstructor}) first,
* so passing an arrow function does not silently produce a broken guard.
*
* A callable instance passes. The exclusion is a bad constructor, never a callable
* value: an `isObject` pre-filter made `instanceOf(Function)(() => {})` answer `false`
* while {@link isInstance}, the helper this is built on, answered `true` for the same
* pair.
*
* @param ctor - The constructor whose instances the guard accepts
* @returns A guard narrowing to that constructor's instance type
*
* @example
* ```ts
* const isDateValue = instanceOf(Date)
* isDateValue(new Date()) // true
* isDateValue({})         // false
* ```
*/
function instanceOf(ctor) {
	return (value) => isConstructor(ctor) && isInstance(value, ctor);
}
/**
* Builds a guard from a native `enum` or any object whose values are strings or
* numbers.
*
* @remarks
* An unreadable enumeration is refused at factory time with the shared `structure` read
* refusal; the returned guard stays total.
*
* @param enumeration - The readable enumeration whose values the guard accepts
* @returns A guard accepting one enumeration value
* @throws {ContractError} When the enumeration cannot be read
*
* @example
* ```ts
* enum Direction { Up = 'up', Down = 'down' }
* const isDirection = enumOf(Direction)
* isDirection('up')   // true
* isDirection('left') // false
* ```
*/
function enumOf(enumeration) {
	return contain(() => {
		const values = collectMembers(readValue(() => INTRINSICS.values(enumeration), "enumOf", { subject: "enumeration" }));
		return (value) => holds(() => (isString(value) || isNumber(value)) && matchesMember(values, value));
	}, "enumOf");
}
function setOf(elementGuard) {
	return (value) => holds(() => {
		if (!isSet(value)) return false;
		const entries = readSetEntries(value);
		if (!entries.success) return false;
		for (let index = 0; index < entries.value.length; index += 1) if (!elementGuard(entries.value[index])) return false;
		return true;
	});
}
function mapOf(keyGuard, valueGuard) {
	return (value) => holds(() => {
		if (!isMap(value)) return false;
		const entries = readMapEntries(value);
		if (!entries.success) return false;
		for (let index = 0; index < entries.value.length; index += 1) {
			const entry = entries.value[index];
			if (entry === void 0) return false;
			if (!keyGuard(entry[0]) || !valueGuard(entry[1])) return false;
		}
		return true;
	});
}
function recordOf(shape, optional) {
	return contain(() => {
		const declared = readGuardShape(shape, optional, "recordOf");
		return (value) => holds(() => {
			if (!isRecord(value)) return false;
			const members = INTRINSICS.reflect.members(value);
			for (let index = 0; index < members.length; index += 1) {
				const key = members[index];
				if (isString(key) && !matchesMember(declared.vocabulary, key)) return false;
			}
			for (let index = 0; index < declared.names.length; index += 1) {
				const key = declared.names[index];
				if (key === void 0) continue;
				const guard = declared.guards[key];
				const present = INTRINSICS.own(value, key);
				if (!matchesMember(declared.optional, key) && !present) return false;
				if (present) {
					if (guard === void 0 || !guard(value[key])) return false;
				}
			}
			return true;
		});
	}, "recordOf");
}
function objectOf(shape, optional) {
	return contain(() => {
		const declared = readGuardShape(shape, optional, "objectOf");
		return (value) => holds(() => {
			if (!isObject(value) && !isFunction(value) || INTRINSICS.array(value)) return false;
			for (let index = 0; index < declared.names.length; index += 1) {
				const key = declared.names[index];
				if (key === void 0) continue;
				const guard = declared.guards[key];
				const member = INTRINSICS.reflect.read(value, key);
				if (matchesMember(declared.optional, key)) {
					if (member !== void 0 && (guard === void 0 || !guard(member))) return false;
				} else if (guard === void 0 || !guard(member)) return false;
			}
			return true;
		});
	}, "objectOf");
}
/**
* Builds a guard that accepts values that are own keys of the provided object.
*
* @remarks
* Membership is tested with `Object.hasOwn`, so inherited prototype-chain keys
* (`toString`, `constructor`, …) are rejected. An own property that shadows a
* prototype name is accepted.
*
* @param value - The object whose own keys the guard accepts
* @returns A guard narrowing to that object's own key union
*
* @example
* ```ts
* const COLORS = { red: '#f00', green: '#0f0', blue: '#00f' } as const
* const isColorKey = keyOf(COLORS)
* isColorKey('red')      // true
* isColorKey('purple')   // false
* isColorKey('toString') // false — inherited, not an own key
* ```
*/
function keyOf(value) {
	return contain(() => {
		const keys = collectMembers(readValue(() => INTRINSICS.reflect.members(value), "keyOf"));
		return (entry) => holds(() => isString(entry) && matchesMember(keys, entry) || isSymbol(entry) && matchesMember(keys, entry) || isNumber(entry) && matchesMember(keys, INTRINSICS.text(entry)));
	}, "keyOf");
}
/**
* Builds a new guard shape by keeping only the listed keys — the structural
* equivalent of `Pick<T, K>`. Produces a shape for {@link recordOf}, not a guard.
*
* @remarks
* An unreadable `keys` list and an unreadable `shape` are refused separately, each
* under its own name, so a caller reads which argument failed.
*
* @param shape - The guard shape to narrow
* @param keys - The keys to keep
* @returns A guard shape carrying only the kept keys
*
* @example
* ```ts
* const full = { name: isString, age: isNumber, role: isString }
* const isName = recordOf(pickOf(full, ['name']))
* isName({ name: 'Ada' }) // true
* ```
*/
function pickOf(shape, keys) {
	return contain(() => {
		const selected = readValue(() => {
			const entries = readArrayEntries(keys);
			if (!entries.success) throw entries.error;
			if (!entries.value.dense) throw new INTRINSICS.error("Picked key list must be dense");
			return collectMembers(entries.value.entries);
		}, "pickOf", { subject: "keys" });
		return readValue(() => {
			const result = INTRINSICS.create(null);
			const members = INTRINSICS.reflect.members(shape);
			for (let index = 0; index < members.length; index += 1) {
				const key = members[index];
				if (isString(key) && matchesMember(selected, key)) INTRINSICS.define(result, key, {
					value: shape[key],
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			return result;
		}, "pickOf", { subject: "shape" });
	}, "pickOf");
}
/**
* Builds a new guard shape by removing the listed keys — the structural
* equivalent of `Omit<T, K>`. Produces a shape for {@link recordOf}, not a guard.
*
* @remarks
* An unreadable `keys` list and an unreadable `shape` are refused separately, each
* under its own name, for the reason {@link pickOf} states.
*
* @param shape - The guard shape to narrow
* @param keys - The keys to remove
* @returns A guard shape carrying every key except the removed ones
*
* @example
* ```ts
* const full = { name: isString, age: isNumber, role: isString }
* const isPublic = recordOf(omitOf(full, ['role']))
* isPublic({ name: 'Ada', age: 36 }) // true
* ```
*/
function omitOf(shape, keys) {
	return contain(() => {
		const skipped = readValue(() => {
			const entries = readArrayEntries(keys);
			if (!entries.success) throw entries.error;
			if (!entries.value.dense) throw new INTRINSICS.error("Omitted key list must be dense");
			return collectMembers(entries.value.entries);
		}, "omitOf", { subject: "keys" });
		return readValue(() => {
			const result = INTRINSICS.create(null);
			const members = INTRINSICS.reflect.members(shape);
			for (let index = 0; index < members.length; index += 1) {
				const key = members[index];
				if (isString(key) && !matchesMember(skipped, key)) INTRINSICS.define(result, key, {
					value: shape[key],
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			return result;
		}, "omitOf", { subject: "shape" });
	}, "omitOf");
}
function andOf(left, right) {
	return (value) => holds(() => left(value) && right(value));
}
function orOf(left, right) {
	return (value) => holds(() => left(value)) || holds(() => right(value));
}
/**
* Negates a guard or predicate — passes when `guard` returns `false`.
*
* @remarks
* Typed as `Guard<unknown>` because `Exclude<unknown, T>` is not useful; use
* {@link complementOf} when you need the narrowed `Exclude<TBase, TExcluded>`.
*
* The negation applies to the contained verdict, so a throwing guard is a non-match and
* its negation passes. Containing the negation instead made a guard and its `notOf`
* both reject the same value, which broke `orOf(g, notOf(g))` as a tautology.
*
* @param guard - The guard or predicate to negate
* @returns A guard accepting exactly the values `guard` rejects
*
* @example
* ```ts
* const isNotNull = notOf(isNull)
* ```
*/
function notOf(guard) {
	return (value) => !holds(() => guard(value));
}
/**
* Builds a guard for `Exclude<TBase, TExcluded>` — accepts values that pass
* `base` but not `excluded`.
*
* @remarks
* The base and the exclusion are contained separately, for the reason {@link notOf}
* states: a throwing exclusion is a non-match, so the complement passes.
*
* @param base - The guard establishing the accepted domain
* @param excluded - The guard whose accepted values are removed from that domain
* @returns A guard accepting a value `base` accepts and `excluded` rejects
*
* @example
* ```ts
* const isNonEmpty = complementOf(isString, isEmptyString)
* isNonEmpty('hi') // true
* isNonEmpty('')   // false
* ```
*/
function complementOf(base, excluded) {
	return (value) => holds(() => {
		if (!base(value)) return false;
		const accepted = value;
		return !holds(() => excluded(accepted));
	});
}
function unionOf(...guards) {
	return (value) => {
		for (let index = 0; index < guards.length; index += 1) {
			const guard = guards[index];
			if (guard !== void 0 && holds(() => guard(value))) return true;
		}
		return false;
	};
}
function intersectionOf(...guards) {
	return (value) => holds(() => {
		for (let index = 0; index < guards.length; index += 1) {
			const guard = guards[index];
			if (guard === void 0 || !guard(value)) return false;
		}
		return true;
	});
}
function whereOf(base, predicate) {
	return (value) => holds(() => base(value) && predicate(value));
}
/**
* Defers guard creation until first use by calling `thunk()` on every
* invocation.
*
* @remarks
* `thunk` is called on every guard call, not cached — this lets it close over a
* binding assigned *after* `lazyOf` is called, the primary use case for
* self-referential recursive guards. A throw from `thunk` (or the guard it
* resolves to) is contained and reported as a non-match, as
* `.claude/rules/patterns.md` § Validation and contracts requires.
*
* Each lazy guard tracks its active invocation depth. An invocation that would
* exceed {@link GUARD_DEPTH_LIMIT} returns `false` before resolving `thunk`; the
* counter always unwinds after the contained call, so one deep or cyclic input
* cannot poison later guard calls.
*
* @param thunk - The factory producing the guard to apply, called on every invocation
* @returns A guard deferring each call to the thunk's guard
*
* @example
* ```ts
* type Tree = { value: number; children: Tree[] }
* let isTree: Guard<Tree>
* isTree = recordOf({ value: isNumber, children: arrayOf(lazyOf(() => isTree)) })
* ```
*/
function lazyOf(thunk) {
	let depth = 0;
	return (value) => {
		if (depth >= 512) return false;
		depth += 1;
		try {
			return holds(() => thunk()(value));
		} finally {
			depth -= 1;
		}
	};
}
function transformOf(base, project, target) {
	return (value) => holds(() => base(value) && target(project(value)));
}
/**
* Builds a guard that accepts finite numbers within an inclusive `[min, max]`
* range.
*
* @remarks
* Refines {@link isFiniteNumber} with the bound comparison, so `NaN` /
* `±Infinity` are rejected before any comparison runs. An absent bound never
* constrains that side. Reused for a number's own value AND, applied to a
* `.length`, for string and array length refinements — the single source of the
* bound logic shared by the compiled guard and parser (compilers.ts).
*
* @param min - The inclusive lower bound, absent for unbounded below
* @param max - The inclusive upper bound, absent for unbounded above
* @returns A guard accepting a finite number inside the bounds
*
* @example
* ```ts
* const inRange = boundsOf(1, 5)
* inRange(3)  // true
* inRange(0)  // false — below min
* inRange(6)  // false — above max
*
* const atLeastTwo = boundsOf(2)
* atLeastTwo(2) // true — unbounded above
* ```
*/
function boundsOf(min, max) {
	return whereOf(isFiniteNumber, (value) => (min === void 0 || value >= min) && (max === void 0 || value <= max));
}
/**
* Builds a guard that accepts strings matching a regular expression.
*
* @remarks
* Clones the pattern for the guard and strips the stateful `g` / `y` flags, so
* repeated checks are stable and never change the caller's `lastIndex`.
*
* @param pattern - The regular expression to own and apply
* @returns A stateless string guard
*
* @example
* ```ts
* const isHex = matchOf(/^[0-9a-f]+$/)
* isHex('1a2f') // true
* isHex('xyz')  // false
* ```
*/
function matchOf(pattern) {
	return contain(() => {
		if (!isRegExp(pattern)) throw new ContractError("matchOf: pattern must be a RegExp", { code: "pattern" });
		const owned = readValue(() => readPattern(pattern), "matchOf", {
			subject: "pattern",
			code: "pattern"
		});
		return whereOf(isString, (value) => matchesPattern(owned, value));
	}, "matchOf");
}
/**
* Builds a guard that accepts strings satisfying optional length and pattern
* refinements — `min` / `max` length and a `pattern`.
*
* @remarks
* Composes {@link isString} with {@link boundsOf} on the string's `.length` and
* an owned stateless pattern (the same refinement {@link matchOf} performs).
* When `min`, `max`, and `pattern` are all absent it returns the bare {@link isString} guard
* (the unconstrained fast path), so an unrefined string leaf pays no wrapping
* cost. The single source of the string refinement shared by the compiled guard
* and parser (compilers.ts).
*
* @param options - Optional length bounds and regular expression refinement
* @returns A string guard enforcing the requested refinements
* @throws {ContractError} When the options cannot be read
*
* @example
* ```ts
* const isSlug = stringOf({ min: 1, max: 32, pattern: /^[a-z-]+$/ })
* isSlug('hello-world') // true
* isSlug('')            // false — below min
* isSlug('Hello')       // false — pattern miss
*
* stringOf() // identical to isString
* ```
*/
function stringOf(options) {
	return contain(() => {
		const safe = readOptions(options, [
			"min",
			"max",
			"pattern"
		], "stringOf", "string");
		const min = safe?.min;
		const max = safe?.max;
		const source = safe?.pattern;
		if (source !== void 0 && !isRegExp(source)) throw new ContractError("stringOf: pattern must be a RegExp", { code: "pattern" });
		const pattern = source === void 0 ? void 0 : ownPattern(source, "stringOf");
		if (min === void 0 && max === void 0 && pattern === void 0) return isString;
		const withinLength = boundsOf(min, max);
		return whereOf(isString, (value) => withinLength(value.length) && (pattern === void 0 || matchesPattern(pattern, value)));
	}, "stringOf");
}
/**
* Extends a guard to also allow `null`.
*
* @param guard - The guard to extend
* @returns A guard accepting `null` and every value `guard` accepts
*
* @example
* ```ts
* const isNullableString = nullableOf(isString)
* isNullableString('hi') // true
* isNullableString(null) // true
* isNullableString(42)   // false
* ```
*/
function nullableOf(guard) {
	return (value) => holds(() => value === null || guard(value));
}
/**
* Extends a guard to also allow `undefined` — the optional counterpart of
* {@link nullableOf}.
*
* @param guard - The guard to extend
* @returns A guard accepting `undefined` and every value `guard` accepts
*
* @example
* ```ts
* const isOptionalString = optionalOf(isString)
* isOptionalString('hi')        // true
* isOptionalString(undefined)   // true
* isOptionalString(null)        // false
* ```
*/
function optionalOf(guard) {
	return (value) => holds(() => value === void 0 || guard(value));
}
/**
* Parses an unknown value to a string.
*
* @remarks
* A string is returned unchanged; a finite number is coerced to its decimal
* string (`42` → `'42'`). `NaN`, `±Infinity`, and every other type → `undefined`.
*
* @param value - The value to parse
* @returns A string, or `undefined`
*
* @example
* ```ts
* parseString('hi') // 'hi'
* parseString(42)    // '42'
* parseString(true)  // undefined
* ```
*/
function parseString(value) {
	if (isString(value)) return value;
	if (isFiniteNumber(value)) return INTRINSICS.text(value);
}
/**
* Parses an unknown value to a finite number.
*
* @remarks
* A finite number is returned unchanged; a non-blank numeric string is parsed
* through `Number(...)`. `NaN`, `±Infinity`, blank/non-numeric strings, and every
* other type → `undefined`.
*
* @param value - The value to parse
* @returns A finite number, or `undefined`
*
* @example
* ```ts
* parseNumber(42)    // 42
* parseNumber('42')  // 42
* parseNumber('abc') // undefined
* ```
*/
function parseNumber(value) {
	if (typeof value === "number") return INTRINSICS.finite(value) ? value : void 0;
	if (!isString(value)) return void 0;
	const outcome = attempt(() => {
		if (value.trim() === "") return void 0;
		const parsed = INTRINSICS.numeric(value);
		return INTRINSICS.finite(parsed) ? parsed : void 0;
	});
	return outcome.success ? outcome.value : void 0;
}
/**
* Parses an unknown value to a finite integer.
*
* @remarks
* Accepts whatever {@link parseNumber} accepts, then requires the result to have
* no fractional part. `3.14` / `'3.14'` → `undefined`.
*
* @param value - The value to parse
* @returns A finite integer, or `undefined`
*
* @example
* ```ts
* parseInteger(42)   // 42
* parseInteger(3.14) // undefined
* ```
*/
function parseInteger(value) {
	const parsed = parseNumber(value);
	if (parsed === void 0) return void 0;
	return INTRINSICS.integer(parsed) ? parsed : void 0;
}
/**
* Parses an unknown value to a boolean.
*
* @remarks
* A boolean is returned unchanged. The strings `'true'` / `'false'` / `'1'` /
* `'0'` and the numbers `1` / `0` coerce to the matching boolean. Everything
* else → `undefined`.
*
* @param value - The value to parse
* @returns A boolean, or `undefined`
*
* @example
* ```ts
* parseBoolean(true)   // true
* parseBoolean('1')    // true
* parseBoolean('nope') // undefined
* ```
*/
function parseBoolean(value) {
	if (typeof value === "boolean") return value;
	if (value === "true" || value === "1" || value === 1) return true;
	if (value === "false" || value === "0" || value === 0) return false;
}
/**
* Parses an unknown value to `null`.
*
* @remarks
* A successful parse returns `null` itself — distinct from the `undefined`
* failure sentinel every other parser in this file uses. Only `null` passes;
* every other value (including `undefined`) → `undefined`.
*
* @param value - The value to parse
* @returns `null` on a successful parse, or `undefined`
*
* @example
* ```ts
* parseNull(null)      // null
* parseNull(undefined) // undefined
* ```
*/
function parseNull(value) {
	return isNull(value) ? value : void 0;
}
/**
* Parses an unknown value to a plain record — the input reference, never cloned.
*
* @remarks
* Probes the record's own enumerable values before returning the reference, so a
* hostile getter is met here rather than at the caller. A failed probe throws
* `ContractError { code: 'structure' }` carrying `parseRecord: value could not be
* read`; a readable non-record answers `undefined`.
*
* @param value - The value to parse
* @returns The record, or `undefined`
* @throws {ContractError} When an object value cannot be read
*/
function parseRecord(value) {
	return contain(() => {
		if (isObject(value)) readValue(() => INTRINSICS.values(value), "parseRecord");
		return isRecord(value) ? value : void 0;
	}, "parseRecord");
}
/**
* Parses an unknown value to an array — the input reference, never cloned —
* optionally guarding every element.
*
* @remarks
* Without a `guard`, element types are NOT verified; let `T` default to
* `unknown` rather than asserting a specific element type.
*
* @param value - The value to parse
* @param guard - Optional element guard
* @returns The array, or `undefined`
*
* @example
* ```ts
* parseArray([1, 2])            // [1, 2]
* parseArray([1, 'x'], isNumber) // undefined
* ```
*/
function parseArray(value, guard) {
	if (!isArray(value)) return void 0;
	if (guard === void 0) return value;
	const entries = readArrayEntries(value);
	if (!entries.success || !entries.value.dense) return void 0;
	if (!holds(() => {
		const collected = entries.value.entries;
		for (let index = 0; index < collected.length; index += 1) if (!guard(collected[index])) return false;
		return true;
	})) return;
	return value;
}
/**
* Parses an unknown value to a cycle-safe JSON value — the input reference,
* never cloned.
*
* @remarks
* Unlike {@link parseRecord} / {@link parseArray}, this is a DEEP gate: it
* walks the entire tree through {@link isJSONValue} rather than checking only the
* top-level shape. That walk is cycle-safe. A readable non-JSON structure,
* including a cycle, returns `undefined`; a failed property read throws a
* `structure` {@link ContractError}, keeping unreadability distinct from an
* honest invalid result.
*
* @param value - The value to parse
* @returns The value, or `undefined` when it is not a valid JSON value
* @throws {ContractError} When the JSON tree cannot be read
*
* @example
* ```ts
* parseJSONValue({ a: 1 })     // { a: 1 }
* parseJSONValue(Number.NaN)   // undefined
* ```
*/
function parseJSONValue(value) {
	return contain(() => {
		return readValue(() => matchesJSONValue(value, new INTRINSICS.weakSet()) ? value : void 0, "parseJSONValue", { context: { shape: "json" } });
	}, "parseJSONValue");
}
function parseEnum(value, allowed) {
	const outcome = readArrayEntries(allowed);
	if (!outcome.success || !outcome.value.dense) return void 0;
	if (!holds(() => matchesMember(collectMembers(outcome.value.entries), value))) return void 0;
	return isLiteralValue(value) ? value : void 0;
}
/**
* Reads and parses a string field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns A string, or `undefined`
*/
function parseStringField(record, path) {
	return parseString(resolveField(record, path));
}
/**
* Reads and parses a finite-number field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns A finite number, or `undefined`
*
* @example
* ```ts
* parseNumberField({ age: '42' }, 'age') // 42
* parseNumberField({}, 'age')             // undefined
* ```
*/
function parseNumberField(record, path) {
	return parseNumber(resolveField(record, path));
}
/**
* Reads and parses a finite-integer field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns A finite integer, or `undefined`
*/
function parseIntegerField(record, path) {
	return parseInteger(resolveField(record, path));
}
/**
* Reads and parses a boolean field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns A boolean, or `undefined`
*
* @example
* ```ts
* parseBooleanField({ on: 'true' }, 'on') // true
* parseBooleanField({}, 'on')              // undefined
* ```
*/
function parseBooleanField(record, path) {
	return parseBoolean(resolveField(record, path));
}
/**
* Reads and parses a `null` field from a record by key or nested key path.
*
* @remarks
* A successful parse returns `null` itself — distinct from the `undefined`
* failure sentinel, which also covers a missing field.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns `null` on a successful parse, or `undefined`
*
* @example
* ```ts
* parseNullField({ value: null }, 'value') // null
* parseNullField({}, 'value')              // undefined
* ```
*/
function parseNullField(record, path) {
	return parseNull(resolveField(record, path));
}
/**
* Reads and parses a nested record field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns A plain record, or `undefined`
*/
function parseRecordField(record, path) {
	return parseRecord(resolveField(record, path));
}
/**
* Reads and parses an array field from a record by key or nested key path,
* optionally guarding elements.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @param guard - Optional element guard
* @returns An array, or `undefined`
*
* @example
* ```ts
* parseArrayField({ tags: [1, 2] }, 'tags') // [1, 2]
* parseArrayField({}, 'tags')                // undefined
* ```
*/
function parseArrayField(record, path, guard) {
	return parseArray(resolveField(record, path), guard);
}
/**
* Reads and parses an enum field from a record by key or nested key path.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @param allowed - The permitted literal values
* @returns The matched literal, or `undefined`
*/
function parseEnumField(record, path, allowed) {
	return parseEnum(resolveField(record, path), allowed);
}
/**
* Reads and parses a JSON-value field from a record by key or nested key path.
*
* @remarks
* Deep-gates the field's whole subtree through {@link parseJSONValue} — see that
* function's remarks for why this differs from the shallow
* {@link parseRecordField} / {@link parseArrayField}.
*
* @param record - The source record
* @param path - A property key, or a key path descending into nested objects
* @returns The value, or `undefined`
*
* @example
* ```ts
* parseJSONValueField({ data: { a: 1 } }, 'data') // { a: 1 }
* parseJSONValueField({}, 'data')                  // undefined
* ```
*/
function parseJSONValueField(record, path) {
	return parseJSONValue(resolveField(record, path));
}
/**
* Parses a JSON string, returning `undefined` instead of throwing.
*
* @remarks
* The safe boundary for untrusted JSON text: a malformed string yields
* `undefined`, never an exception. Returns `unknown` — a successful parse proves
* nothing about shape, so narrow the result with a guard (or use
* {@link parseJSONAs}). A large document is not walked here; parsing is shallow
* and lazy validation is the caller's to compose.
*
* @param value - The JSON string to parse
* @returns The parsed value, or `undefined` when `value` is not valid JSON
*/
function parseJSON(value) {
	try {
		return INTRINSICS.decode(value);
	} catch {
		return;
	}
}
/**
* Parses a JSON string and validates the result against a guard.
*
* @remarks
* The lazy, safe path from an untrusted string to a typed `T`: parse, then check
* the parsed value with the guard you bring — typically one composed from the
* combinators (`recordOf`, `arrayOf`, …). Only the shape the guard inspects is
* validated, so a large document is never walked in full unless the guard does.
*
* @param value - The JSON string to parse
* @param guard - The guard for the expected shape
* @returns The parsed value when it satisfies `guard`, otherwise `undefined`
*
* @example
* ```ts
* const isConfig = recordOf({ host: isString, tags: arrayOf(isString) })
* parseJSONAs('{"host":"localhost","tags":["a"]}', isConfig) // { host: 'localhost', tags: ['a'] }
* parseJSONAs('{"host":"localhost"}', isConfig)              // undefined — guard fails
* parseJSONAs('not json', isConfig)                          // undefined — never throws
* ```
*/
function parseJSONAs(value, guard) {
	const parsed = parseJSON(value);
	if (parsed === void 0) return void 0;
	const checked = attempt(() => guard(parsed) ? parsed : void 0);
	return checked.success ? checked.value : void 0;
}
/**
* Owns one contract shape's artifacts and their bundle, compiled lazily.
*
* @remarks
* The engine every standalone `compile*` function and `createContract` runs
* on. A recursive compiler re-owns and
* re-validates the SUBGRAPH at every node it descends into, so a depth-100
* chain pays a hundred clones of shrinking graphs and a hundred validations —
* quadratic work for a linear declaration. Here ownership runs once, validation runs once over
* that owned result, and each unique node and structural edge is indexed once
* into children-before-parent order. Every artifact family is then a single
* postorder pass whose entries are keyed by node identity, so a shared child is
* compiled once however many parents point at it. The same asymmetry exists on
* the VALUE side and is answered the same way: `guard`, `auditor` and `reporter`
* carry a call-scoped ledger, so a shared object costs one visit per compiled
* node rather than one per path through the graph.
*
* Construction observes nothing at all: no read, no validation, no clone, no
* graph-sized allocation, no clock, no draw. The first getter read prepares; the
* getters after it replay. A getter builds its own family and no other, except
* that `parser`, `reporter` and `generator` build the guard plan when the graph
* holds a union, because a union's membership question IS a guard question in
* all three.
*
* One terminal lifecycle covers preparation and every family. A failure settles
* the compiler: later getters rethrow that exact error, while an artifact
* already handed out keeps working, because each compiled artifact is
* self-contained. Reentry — reachable only through a caller accessor the
* declaration itself exposes, since a `pattern` getter is the one accessor
* ownership invokes — poisons the nested read, the interrupted outer read, and
* every later read with one shared cause-free error.
*
* @typeParam S - The declaration's shape type, which types the published artifacts
*
* @example
* ```ts
* const compiler = new ContractCompiler({ category: 'string', min: 1 })
* compiler.guard('Ada') // true
* compiler.guard === compiler.guard // true — every getter replays its exact root
* ```
*/
var ContractCompiler = class ContractCompiler {
	static #weakMap = WeakMap;
	static #visits = 0;
	static #scope = 0;
	static #emptyStack = [];
	static #emptyNodes = [];
	static #emptyOrder = [];
	static #emptySchemas = [];
	static #emptyGuards = [];
	static #emptyParsers = [];
	static #emptyAudits = [];
	static #emptyReports = [];
	static #emptySeeds = [];
	static {
		INTRINSICS.freeze(ContractCompiler.#emptyStack);
		INTRINSICS.freeze(ContractCompiler.#emptyNodes);
		INTRINSICS.freeze(ContractCompiler.#emptyOrder);
		INTRINSICS.freeze(ContractCompiler.#emptySchemas);
		INTRINSICS.freeze(ContractCompiler.#emptyGuards);
		INTRINSICS.freeze(ContractCompiler.#emptyParsers);
		INTRINSICS.freeze(ContractCompiler.#emptyAudits);
		INTRINSICS.freeze(ContractCompiler.#emptyReports);
		INTRINSICS.freeze(ContractCompiler.#emptySeeds);
	}
	#source;
	#state;
	#stack;
	#nodes;
	#index;
	#order;
	#schemas;
	#guards;
	#parsers;
	#audits;
	#reports;
	#seeds;
	#schema;
	#guard;
	#parser;
	#auditor;
	#reporter;
	#generator;
	#bundle;
	/**
	* Retains a shape declaration without observing it.
	*
	* @param shape - The live declaration the first getter read will own
	*/
	constructor(shape) {
		this.#source = shape;
		this.#state = { phase: "ready" };
		this.#stack = [];
		this.#nodes = [];
		this.#index = new ContractCompiler.#weakMap();
		this.#order = [];
		this.#schemas = [];
		this.#guards = [];
		this.#parsers = [];
		this.#audits = [];
		this.#reports = [];
		this.#seeds = [];
		this.#schema = void 0;
		this.#guard = void 0;
		this.#parser = void 0;
		this.#auditor = void 0;
		this.#reporter = void 0;
		this.#generator = void 0;
		this.#bundle = void 0;
	}
	/**
	* Returns the emitted JSON Schema for the owned declaration.
	*
	* @remarks
	* A deeply frozen graph that preserves shared declaration identity: two
	* property slots holding the same authored node hold the same emitted
	* subschema, while structurally equal distinct nodes stay distinct objects.
	*/
	get schema() {
		const ready = this.#schema;
		if (ready !== void 0 && this.#state.phase === "ready") return ready;
		return this.#enter(() => this.#buildSchema());
	}
	/** Returns the compiled strict guard for the owned declaration. */
	get guard() {
		const ready = this.#guard;
		if (ready !== void 0 && this.#state.phase === "ready") return this.#publish(ready);
		return this.#publish(this.#enter(() => this.#buildGuard()));
	}
	/** Returns the compiled coercive parser for the owned declaration. */
	get parser() {
		const ready = this.#parser;
		if (ready !== void 0 && this.#state.phase === "ready") return this.#publish(ready);
		return this.#publish(this.#enter(() => this.#buildParser()));
	}
	/** Returns the compiled strict-domain diagnostic for the owned declaration. */
	get auditor() {
		const ready = this.#auditor;
		if (ready !== void 0 && this.#state.phase === "ready") return ready;
		return this.#enter(() => this.#buildAuditor());
	}
	/** Returns the compiled coercive-domain diagnostic for the owned declaration. */
	get reporter() {
		const ready = this.#reporter;
		if (ready !== void 0 && this.#state.phase === "ready") return ready;
		return this.#enter(() => this.#buildReporter());
	}
	/** Returns the compiled seed-data source for the owned declaration. */
	get generator() {
		const ready = this.#generator;
		if (ready !== void 0 && this.#state.phase === "ready") return this.#publish(ready);
		return this.#publish(this.#enter(() => this.#buildGenerator()));
	}
	/**
	* Returns the frozen bundle of this compiler's artifacts.
	*
	* @remarks
	* Own enumerable keys `schema`, `is`, `parse`, `audit`, `explain`,
	* `generate`, in that order, each holding the exact value the corresponding
	* getter publishes.
	*/
	get contract() {
		const ready = this.#bundle;
		if (ready !== void 0 && this.#state.phase === "ready") return this.#publish(ready);
		return this.#publish(this.#enter(() => this.#buildContract()));
	}
	#publish(root) {
		return root;
	}
	#enter(build) {
		const state = this.#state;
		if (state.phase === "failed") throw state.error;
		if (state.phase === "running" || state.phase === "interrupted") {
			this.#state = {
				phase: "interrupted",
				poison: state.poison
			};
			throw state.poison;
		}
		const poison = new ContractError("ContractCompiler: contract compilation may not be reentered", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		this.#state = {
			phase: "running",
			poison
		};
		return this.#leave(attempt(build));
	}
	#leave(outcome) {
		const state = this.#state;
		if (state.phase === "interrupted") return this.#fail(state.poison);
		if (!outcome.success) return this.#fail(isContractError(outcome.error) ? outcome.error : new ContractError("ContractCompiler: contract compilation failed", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			},
			cause: outcome.error
		}));
		this.#state = { phase: "ready" };
		this.#collect();
		return outcome.value;
	}
	#fail(error) {
		this.#state = {
			phase: "failed",
			error
		};
		this.#release();
		throw error;
	}
	#collect() {
		if (this.#schema === void 0 || this.#guard === void 0) return;
		if (this.#parser === void 0 || this.#auditor === void 0) return;
		if (this.#reporter === void 0 || this.#generator === void 0) return;
		this.#release();
	}
	#release() {
		this.#source = void 0;
		this.#stack = ContractCompiler.#emptyStack;
		this.#nodes = ContractCompiler.#emptyNodes;
		this.#index = void 0;
		this.#order = ContractCompiler.#emptyOrder;
		this.#schemas = ContractCompiler.#emptySchemas;
		this.#guards = ContractCompiler.#emptyGuards;
		this.#parsers = ContractCompiler.#emptyParsers;
		this.#audits = ContractCompiler.#emptyAudits;
		this.#reports = ContractCompiler.#emptyReports;
		this.#seeds = ContractCompiler.#emptySeeds;
	}
	#prepare() {
		if (this.#nodes.length > 0) return;
		const source = this.#source;
		if (source === void 0) throw new ContractError("ContractCompiler: the retained declaration is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		const owned = ownShape(source);
		const validator = new ShapeValidator(owned);
		validator.validate();
		refuseExpansion(validator.expansion);
		this.#discover(owned);
		this.#source = void 0;
	}
	#discover(root) {
		const known = this.#index;
		if (known === void 0) throw new ContractError("ContractCompiler: the prepared index is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		this.#stack[this.#stack.length] = {
			operation: "enter",
			shape: root
		};
		while (this.#stack.length > 0) {
			const top = this.#stack.length - 1;
			const frame = this.#stack[top];
			this.#stack.length = top;
			if (frame === void 0) continue;
			if (frame.operation === "exit") {
				this.#order[this.#order.length] = frame.index;
				continue;
			}
			const shape = frame.shape;
			if (INTRINSICS.reflect.apply(INTRINSICS.recall, known, [shape]) !== void 0) continue;
			const index = this.#nodes.length;
			this.#nodes[index] = shape;
			INTRINSICS.reflect.apply(INTRINSICS.retain, known, [shape, index]);
			this.#stack[this.#stack.length] = {
				operation: "exit",
				index
			};
			this.#schedule(shape);
		}
	}
	#schedule(shape) {
		switch (shape.category) {
			case "array":
				this.#stack[this.#stack.length] = {
					operation: "enter",
					shape: shape.items
				};
				return;
			case "optional":
			case "nullable":
				this.#stack[this.#stack.length] = {
					operation: "enter",
					shape: shape.inner
				};
				return;
			case "union":
				for (let index = shape.variants.length - 1; index >= 0; index -= 1) {
					const variant = shape.variants[index];
					if (variant === void 0) continue;
					this.#stack[this.#stack.length] = {
						operation: "enter",
						shape: variant
					};
				}
				return;
			case "object": {
				const extra = shape.additionalProperties;
				if (extra !== void 0 && extra !== true && extra !== false) this.#stack[this.#stack.length] = {
					operation: "enter",
					shape: extra
				};
				const keys = INTRINSICS.keys(shape.properties);
				for (let index = keys.length - 1; index >= 0; index -= 1) {
					const key = keys[index];
					if (key === void 0) continue;
					const child = shape.properties[key];
					if (child === void 0) continue;
					this.#stack[this.#stack.length] = {
						operation: "enter",
						shape: child
					};
				}
				return;
			}
			default: return;
		}
	}
	#locate(shape) {
		const known = this.#index;
		if (known === void 0) throw new ContractError("ContractCompiler: the prepared index is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		const index = INTRINSICS.reflect.apply(INTRINSICS.recall, known, [shape]);
		if (index === void 0) throw new ContractError("ContractCompiler: a structural child is not in the prepared index", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return index;
	}
	#node(index) {
		const shape = this.#nodes[index];
		if (shape === void 0) throw new ContractError("ContractCompiler: a prepared node is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return shape;
	}
	#unions() {
		for (let index = 0; index < this.#nodes.length; index += 1) if (this.#nodes[index]?.category === "union") return true;
		return false;
	}
	#repeats(index) {
		const category = this.#node(index).category;
		if (category === "array" || category === "object" || category === "union") return true;
		return category === "optional" || category === "nullable";
	}
	#trackGuard(plan) {
		let filled = 0;
		let memo;
		let slot;
		let kept = false;
		return (value) => {
			if (!isObject(value)) return plan(value);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (filled !== scope) {
					memo = void 0;
					slot = void 0;
					kept = false;
					filled = scope;
				}
				if (slot === value) return kept;
				if (memo !== void 0) {
					const recalled = INTRINSICS.reflect.apply(INTRINSICS.recall, memo, [value]);
					if (recalled !== void 0) return recalled;
				}
				const answer = plan(value);
				if (slot === void 0) {
					slot = value;
					kept = answer;
				} else {
					if (memo === void 0) {
						memo = new ContractCompiler.#weakMap();
						INTRINSICS.reflect.apply(INTRINSICS.retain, memo, [slot, kept]);
					}
					INTRINSICS.reflect.apply(INTRINSICS.retain, memo, [value, answer]);
				}
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}
	#trackFaults(plan) {
		let filled = 0;
		let memo;
		let slot;
		let kept;
		return (value, path) => {
			if (!isObject(value)) return plan(value, path);
			const opened = ContractCompiler.#scope === 0;
			if (opened) {
				ContractCompiler.#visits += 1;
				ContractCompiler.#scope = ContractCompiler.#visits;
			}
			try {
				const scope = ContractCompiler.#scope;
				if (filled !== scope) {
					memo = void 0;
					slot = void 0;
					kept = void 0;
					filled = scope;
				}
				if (slot === value && kept !== void 0) return kept;
				if (memo !== void 0) {
					const recalled = INTRINSICS.reflect.apply(INTRINSICS.recall, memo, [value]);
					if (recalled !== void 0) return recalled;
				}
				const answer = plan(value, path);
				if (slot === void 0) {
					slot = value;
					kept = answer.length === 0 ? answer : void 0;
				} else if (answer.length === 0) {
					if (memo === void 0) {
						memo = new ContractCompiler.#weakMap();
						if (kept !== void 0) INTRINSICS.reflect.apply(INTRINSICS.retain, memo, [slot, kept]);
					}
					INTRINSICS.reflect.apply(INTRINSICS.retain, memo, [value, answer]);
				}
				return answer;
			} finally {
				if (opened) ContractCompiler.#scope = 0;
			}
		};
	}
	#buildSchema() {
		const ready = this.#schema;
		if (ready !== void 0) return ready;
		this.#prepare();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			this.#schemas[index] = this.#schemaOf(index);
		}
		const root = this.#schemaAt(this.#node(0));
		this.#schema = root;
		return root;
	}
	#schemaAt(shape) {
		const emitted = this.#schemas[this.#locate(shape)];
		if (emitted === void 0) throw new ContractError("ContractCompiler: a child schema is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return emitted;
	}
	#schemaOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": {
				const text = owned.pattern === void 0 ? void 0 : readPatternSource(owned.pattern);
				if (owned.pattern !== void 0 && text === void 0) throw new ContractError("compileSchema: pattern source could not be read", {
					code: "pattern",
					context: { shape: "string" }
				});
				return INTRINSICS.freeze({
					type: "string",
					...owned.min !== void 0 ? { minLength: owned.min } : {},
					...owned.max !== void 0 ? { maxLength: owned.max } : {},
					...text !== void 0 ? { pattern: text } : {},
					...owned.description !== void 0 ? { description: owned.description } : {}
				});
			}
			case "number": return INTRINSICS.freeze({
				type: owned.integer === true ? "integer" : "number",
				...owned.min !== void 0 ? { minimum: owned.min } : {},
				...owned.max !== void 0 ? { maximum: owned.max } : {},
				...owned.description !== void 0 ? { description: owned.description } : {}
			});
			case "boolean": return INTRINSICS.freeze({
				type: "boolean",
				...owned.description !== void 0 ? { description: owned.description } : {}
			});
			case "null": return INTRINSICS.freeze({
				type: "null",
				...owned.description !== void 0 ? { description: owned.description } : {}
			});
			case "json": return INTRINSICS.freeze({ ...owned.description !== void 0 ? { description: owned.description } : {} });
			case "literal": {
				const vocabulary = [];
				for (let index2 = 0; index2 < owned.values.length; index2 += 1) {
					const value = owned.values[index2];
					if (value === void 0) continue;
					vocabulary[vocabulary.length] = value;
				}
				return INTRINSICS.freeze({
					enum: INTRINSICS.freeze(vocabulary),
					...owned.description !== void 0 ? { description: owned.description } : {}
				});
			}
			case "array": return INTRINSICS.freeze({
				type: "array",
				items: this.#schemaAt(owned.items),
				...owned.min !== void 0 ? { minItems: owned.min } : {},
				...owned.max !== void 0 ? { maxItems: owned.max } : {},
				...owned.description !== void 0 ? { description: owned.description } : {}
			});
			case "object": {
				const properties = INTRINSICS.create(null);
				const required = [];
				const keyList = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
					const key = keyList[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					properties[key] = this.#schemaAt(child.category === "optional" ? child.inner : child);
					if (child.category !== "optional") required[required.length] = key;
				}
				const extra = owned.additionalProperties;
				const additionalProperties = extra === true ? true : extra !== void 0 && extra !== false ? this.#schemaAt(extra) : false;
				return INTRINSICS.freeze({
					type: "object",
					...INTRINSICS.keys(properties).length > 0 ? { properties: INTRINSICS.freeze(properties) } : {},
					...required.length > 0 ? { required: INTRINSICS.freeze(required) } : {},
					additionalProperties,
					...owned.description !== void 0 ? { description: owned.description } : {}
				});
			}
			case "union": {
				const variants = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					variants[variants.length] = this.#schemaAt(variant);
				}
				return INTRINSICS.freeze({
					...owned.mode === "oneOf" ? { oneOf: INTRINSICS.freeze(variants) } : { anyOf: INTRINSICS.freeze(variants) },
					...owned.description !== void 0 ? { description: owned.description } : {}
				});
			}
			case "optional": return this.#schemaAt(owned.inner);
			case "nullable": return INTRINSICS.freeze({ anyOf: INTRINSICS.freeze([this.#schemaAt(owned.inner), INTRINSICS.freeze({ type: "null" })]) });
			case "raw": return cloneSchema(owned.schema);
		}
	}
	#buildGuard() {
		const ready = this.#guard;
		if (ready !== void 0) return ready;
		this.#prepare();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			const plan = this.#guardOf(index);
			this.#guards[index] = this.#repeats(index) ? this.#trackGuard(plan) : plan;
		}
		const root = this.#guardAt(this.#node(0));
		this.#guard = root;
		return root;
	}
	#guardAt(shape) {
		const compiled = this.#guards[this.#locate(shape)];
		if (compiled === void 0) throw new ContractError("ContractCompiler: a child guard is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return compiled;
	}
	#guardOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": return stringOf({
				...owned.min === void 0 ? {} : { min: owned.min },
				...owned.max === void 0 ? {} : { max: owned.max },
				...owned.pattern === void 0 ? {} : { pattern: owned.pattern }
			});
			case "number": {
				const base = owned.integer === true ? isInteger : isFiniteNumber;
				if (owned.min === void 0 && owned.max === void 0) return base;
				return owned.integer === true ? intersectionOf(isInteger, boundsOf(owned.min, owned.max)) : boundsOf(owned.min, owned.max);
			}
			case "boolean": return isBoolean;
			case "null": return isNull;
			case "json": return isJSONValue;
			case "literal": return literalOf(owned.values);
			case "array": {
				const base = arrayOf(this.#guardAt(owned.items));
				if (owned.min === void 0 && owned.max === void 0) return base;
				const withinLength = boundsOf(owned.min, owned.max);
				return whereOf(base, (value) => withinLength(value.length));
			}
			case "object": {
				const map = INTRINSICS.create(null);
				const optionalKeys = [];
				const keyList = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
					const key = keyList[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					if (child.category === "optional") {
						map[key] = this.#guardAt(child.inner);
						optionalKeys[optionalKeys.length] = key;
					} else map[key] = this.#guardAt(child);
				}
				const extra = owned.additionalProperties;
				const closed = extra === void 0 || extra === false;
				const additional = closed || extra === true ? void 0 : this.#guardAt(extra);
				const required = [];
				const declared = INTRINSICS.keys(map);
				for (let keyIndex = 0; keyIndex < declared.length; keyIndex += 1) {
					const key = declared[keyIndex];
					if (key === void 0) continue;
					let optional = false;
					for (let optionalIndex = 0; optionalIndex < optionalKeys.length; optionalIndex += 1) if (optionalKeys[optionalIndex] === key) optional = true;
					if (!optional) required[required.length] = key;
				}
				const maskable = required.length <= 31;
				const positions = INTRINSICS.create(null);
				let full = 0;
				if (maskable) for (let keyIndex = 0; keyIndex < required.length; keyIndex += 1) {
					const key = required[keyIndex];
					if (key === void 0) continue;
					positions[key] = keyIndex;
					full |= 1 << keyIndex;
				}
				return (value) => {
					if (!isRecord(value)) return false;
					const keys = enumerableKeys(value);
					if (keys === void 0) return false;
					const outcome = attempt(() => {
						if (maskable) {
							let seen = 0;
							for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
								const key = keys[keyIndex];
								if (key === void 0) continue;
								if (!INTRINSICS.own(positions, key)) continue;
								const position = positions[key];
								if (position !== void 0) seen |= 1 << position;
							}
							if (seen !== full) return false;
						} else {
							const present = collectMembers(keys);
							for (let keyIndex = 0; keyIndex < required.length; keyIndex += 1) {
								const key = required[keyIndex];
								if (key === void 0) continue;
								if (!matchesMember(present, key)) return false;
							}
						}
						for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							const guard = INTRINSICS.own(map, key) ? map[key] : void 0;
							if (guard !== void 0) {
								if (!guard(value[key])) return false;
								continue;
							}
							if (closed) return false;
							const observed = value[key];
							if (additional !== void 0 && !additional(observed)) return false;
						}
						return true;
					});
					return outcome.success && outcome.value;
				};
			}
			case "union": {
				const guards = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					guards[guards.length] = this.#guardAt(variant);
				}
				if (owned.mode === "oneOf") return (value) => {
					let matched = 0;
					for (let index2 = 0; index2 < guards.length; index2 += 1) {
						const guard = guards[index2];
						if (guard !== void 0 && guard(value)) matched += 1;
					}
					return matched === 1;
				};
				return INTRINSICS.reflect.apply(unionOf, void 0, guards);
			}
			case "optional": return orOf(isUndefined, this.#guardAt(owned.inner));
			case "nullable": return nullableOf(this.#guardAt(owned.inner));
			case "raw": return (value) => value !== void 0;
		}
	}
	#buildParser() {
		const ready = this.#parser;
		if (ready !== void 0) return ready;
		this.#prepare();
		if (this.#unions()) this.#buildGuard();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			this.#parsers[index] = this.#parserOf(index);
		}
		const root = this.#parserAt(this.#node(0));
		this.#parser = root;
		return root;
	}
	#parserAt(shape) {
		const compiled = this.#parsers[this.#locate(shape)];
		if (compiled === void 0) throw new ContractError("ContractCompiler: a child parser is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return compiled;
	}
	#parserOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": {
				if (owned.min === void 0 && owned.max === void 0 && owned.pattern === void 0) return parseString;
				const guard = stringOf({
					...owned.min === void 0 ? {} : { min: owned.min },
					...owned.max === void 0 ? {} : { max: owned.max },
					...owned.pattern === void 0 ? {} : { pattern: owned.pattern }
				});
				return (value) => {
					const parsed = parseString(value);
					return parsed !== void 0 && guard(parsed) ? parsed : void 0;
				};
			}
			case "number": {
				const base = owned.integer === true ? parseInteger : parseNumber;
				if (owned.min === void 0 && owned.max === void 0) return base;
				const within = boundsOf(owned.min, owned.max);
				return (value) => {
					const parsed = base(value);
					return parsed !== void 0 && within(parsed) ? parsed : void 0;
				};
			}
			case "boolean": return parseBoolean;
			case "null": return (value) => value === null ? null : void 0;
			case "json": return parseJSONValue;
			case "literal": {
				const allowed = literalOf(owned.values);
				return (value) => {
					if (allowed(value)) return value;
					if (isString(value)) {
						const trimmed = value.trim();
						if (allowed(trimmed)) return trimmed;
					}
				};
			}
			case "array": {
				const item = this.#parserAt(owned.items);
				const unbounded = owned.min === void 0 && owned.max === void 0;
				const withinLength = boundsOf(owned.min, owned.max);
				return (value) => {
					if (isObject(value)) readValue(() => INTRINSICS.array(value), "compileParser", {
						subject: "array",
						context: { shape: "array" }
					});
					if (!isArray(value)) return void 0;
					const entries = readArrayEntries(value);
					if (!entries.success) return readValue(() => {
						throw entries.error;
					}, "compileParser", {
						subject: "array",
						context: { shape: "array" }
					});
					if (!entries.value.dense) return void 0;
					const result = [];
					for (let entryIndex = 0; entryIndex < entries.value.entries.length; entryIndex += 1) {
						const parsed = item(entries.value.entries[entryIndex]);
						if (parsed === void 0) return void 0;
						result[result.length] = parsed;
					}
					return unbounded || withinLength(result.length) ? result : void 0;
				};
			}
			case "object": {
				const entries = [];
				const keyList = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
					const key = keyList[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					const optional = child.category === "optional";
					entries[entries.length] = {
						key,
						parse: this.#parserAt(optional ? child.inner : child),
						optional
					};
				}
				const known = readValue(() => {
					const declared = collectMembers([]);
					for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
						const entry = entries[entryIndex];
						if (entry === void 0) continue;
						admitMember(declared, entry.key);
					}
					return declared;
				}, "compileParser", {
					subject: "object",
					context: { shape: "object" }
				});
				const maskable = entries.length <= 31;
				const positions = INTRINSICS.create(null);
				if (maskable) for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
					const entry = entries[entryIndex];
					if (entry === void 0) continue;
					positions[entry.key] = entryIndex;
				}
				const extra = owned.additionalProperties;
				const additional = extra === void 0 || extra === false || extra === true ? void 0 : this.#parserAt(extra);
				const open = extra === true || additional !== void 0;
				return (value) => {
					if (!isRecord(value)) return void 0;
					const record = value;
					const keys = enumerableKeys(record);
					if (keys === void 0) return void 0;
					const outcome = attempt(() => {
						const present = maskable ? void 0 : collectMembers(keys);
						let seen = 0;
						if (present === void 0) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (!INTRINSICS.own(positions, key)) continue;
							const position = positions[key];
							if (position !== void 0) seen |= 1 << position;
						}
						const result = INTRINSICS.create(null);
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (present === void 0 ? (seen & 1 << entryIndex) === 0 : !matchesMember(present, entry.key)) {
								if (entry.optional) continue;
								return;
							}
							const raw = record[entry.key];
							if (raw === void 0) {
								if (entry.optional) continue;
								return;
							}
							const parsed = entry.parse(raw);
							if (parsed === void 0) return void 0;
							result[entry.key] = parsed;
						}
						if (open) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (matchesMember(known, key)) continue;
							if (additional === void 0) result[key] = record[key];
							else {
								const parsed = additional(record[key]);
								if (parsed === void 0) return void 0;
								result[key] = parsed;
							}
						}
						return result;
					});
					if (outcome.success) return outcome.value;
					if (isContractError(outcome.error)) throw outcome.error;
					return readValue(() => {
						throw outcome.error;
					}, "compileParser", {
						subject: "object",
						context: { shape: "object" }
					});
				};
			}
			case "union": {
				const variants = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					variants[variants.length] = {
						parse: this.#parserAt(variant),
						guard: this.#guardAt(variant)
					};
				}
				if (owned.mode === "oneOf") return (value) => {
					let matched = 0;
					let only;
					for (let index2 = 0; index2 < variants.length; index2 += 1) {
						const variant = variants[index2];
						if (variant === void 0 || !variant.guard(value)) continue;
						matched += 1;
						if (matched === 1) only = variant;
					}
					return matched === 1 && only !== void 0 ? only.parse(value) : void 0;
				};
				return (value) => {
					for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
						const variant = variants[variantIndex];
						if (variant === void 0) continue;
						if (variant.guard(value)) return value;
					}
					for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
						const variant = variants[variantIndex];
						if (variant === void 0) continue;
						const parsed = variant.parse(value);
						if (parsed !== void 0 && variant.guard(parsed)) return parsed;
					}
				};
			}
			case "optional": {
				const inner = this.#parserAt(owned.inner);
				return (value) => value === void 0 ? void 0 : inner(value);
			}
			case "nullable": {
				const inner = this.#parserAt(owned.inner);
				return (value) => value === null ? null : inner(value);
			}
			case "raw": return (value) => value;
		}
	}
	#buildAuditor() {
		const ready = this.#auditor;
		if (ready !== void 0) return ready;
		this.#prepare();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			const plan = this.#auditOf(index);
			this.#audits[index] = this.#repeats(index) ? this.#trackFaults(plan) : plan;
		}
		const root = this.#exposeAudit(this.#auditAt(this.#node(0)));
		this.#auditor = root;
		return root;
	}
	#exposeAudit(plan) {
		return (value, path = []) => contain(() => plan(value, path), "compileAuditor");
	}
	#auditAt(shape) {
		const compiled = this.#audits[this.#locate(shape)];
		if (compiled === void 0) throw new ContractError("ContractCompiler: a child auditor is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return compiled;
	}
	#auditOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": {
				const node = owned;
				const declared = owned.pattern;
				const refined = owned.min !== void 0 || owned.max !== void 0 || declared !== void 0;
				const pattern = declared === void 0 ? void 0 : ownPattern(declared, "compileAuditor");
				return (value, path) => {
					if (!isString(value)) return [{
						reason: "type",
						path,
						expected: "string",
						received: preview(value)
					}];
					return refined ? buildStringFaults(node, value, path, pattern) : [];
				};
			}
			case "number": {
				const node = owned;
				const kind = owned.integer === true ? "integer" : "number";
				const refined = owned.integer === true || owned.min !== void 0 || owned.max !== void 0;
				return (value, path) => {
					if (!isFiniteNumber(value)) return [{
						reason: "type",
						path,
						expected: kind,
						received: preview(value)
					}];
					return refined ? buildNumberFaults(node, value, path) : [];
				};
			}
			case "boolean": return (value, path) => isBoolean(value) ? [] : [{
				reason: "type",
				path,
				expected: "boolean",
				received: preview(value)
			}];
			case "null": return (value, path) => value === null ? [] : [{
				reason: "type",
				path,
				expected: "null",
				received: preview(value)
			}];
			case "json": return (value, path) => isJSONValue(value) ? [] : [{
				reason: "type",
				path,
				expected: "json",
				received: preview(value)
			}];
			case "literal": {
				const allowed = literalOf(owned.values);
				return (value, path) => allowed(value) ? [] : [{
					reason: "type",
					path,
					expected: "literal",
					received: preview(value)
				}];
			}
			case "array": {
				const node = owned;
				const item = this.#auditAt(owned.items);
				return (value, path) => {
					if (isObject(value)) readValue(() => INTRINSICS.array(value), "compileAuditor", {
						subject: "array",
						context: {
							path,
							shape: "array"
						}
					});
					if (!isArray(value)) return [{
						reason: "type",
						path,
						expected: "array",
						received: preview(value)
					}];
					const entries = readArrayEntries(value);
					if (!entries.success) return readValue(() => {
						throw entries.error;
					}, "compileAuditor", {
						subject: "array",
						context: {
							path,
							shape: "array"
						}
					});
					const faults = [];
					for (let entryIndex = 0; entryIndex < entries.value.entries.length; entryIndex += 1) {
						if (faults.length >= 64) break;
						appendEntries(faults, item(entries.value.entries[entryIndex], pathOf(path, INTRINSICS.text(entryIndex))));
					}
					appendEntries(faults, buildArrayFaults(node, entries.value.entries.length, path));
					return limitEntries(faults, 64);
				};
			}
			case "object": {
				const entries = [];
				const declaredKeys = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < declaredKeys.length; keyIndex += 1) {
					const key = declaredKeys[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					const optional = child.category === "optional";
					const inner = optional ? child.inner : child;
					entries[entries.length] = {
						key,
						audit: this.#auditAt(inner),
						optional,
						kind: shapeToKind(inner)
					};
				}
				const extra = owned.additionalProperties;
				const closed = extra === void 0 || extra === false;
				const additional = closed || extra === true ? void 0 : this.#auditAt(extra);
				const planned = attempt(() => collectMembers(declaredKeys));
				const declared = planned.success ? planned.value : void 0;
				const maskable = entries.length <= 31;
				const positions = INTRINSICS.create(null);
				if (maskable) for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
					const entry = entries[entryIndex];
					if (entry === void 0) continue;
					positions[entry.key] = entryIndex;
				}
				return (value, path) => {
					if (isObject(value)) readValue(() => INTRINSICS.reflect.prototype(value), "compileAuditor", {
						subject: "object",
						context: {
							path,
							shape: "object"
						}
					});
					if (!isRecord(value)) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					const record = value;
					const keys = readValue(() => INTRINSICS.freeze(INTRINSICS.keys(record)), "compileAuditor", {
						subject: "object",
						context: {
							path,
							shape: "object"
						}
					});
					const faults = [];
					const outcome = attempt(() => {
						const present = maskable ? void 0 : collectMembers(keys);
						const vocabulary = declared ?? collectMembers(declaredKeys);
						let seen = 0;
						if (present === void 0) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (!INTRINSICS.own(positions, key)) continue;
							const position = positions[key];
							if (position !== void 0) seen |= 1 << position;
						}
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (present === void 0 ? (seen & 1 << entryIndex) === 0 : !matchesMember(present, entry.key)) {
								if (!entry.optional) faults[faults.length] = {
									reason: "missing",
									path: pathOf(path, entry.key),
									expected: entry.kind
								};
								continue;
							}
							appendEntries(faults, entry.audit(record[entry.key], pathOf(path, entry.key)));
						}
						for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (faults.length >= 64) return;
							if (matchesMember(vocabulary, key)) continue;
							if (closed) {
								faults[faults.length] = {
									reason: "extra",
									path: pathOf(path, key)
								};
								continue;
							}
							const observed = record[key];
							if (additional !== void 0) appendEntries(faults, additional(observed, pathOf(path, key)));
						}
					});
					if (!outcome.success) {
						if (isContractError(outcome.error)) throw outcome.error;
						return readValue(() => {
							throw outcome.error;
						}, "compileAuditor", {
							subject: "object",
							context: {
								path,
								shape: "object"
							}
						});
					}
					return limitEntries(faults, 64);
				};
			}
			case "union": {
				const plans = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					plans[plans.length] = this.#auditAt(variant);
				}
				const exclusive = owned.mode === "oneOf";
				const count = owned.variants.length;
				return (value, path) => {
					const perVariant = [];
					let matched = 0;
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						const variantFaults = plan(value, path);
						if (variantFaults.length === 0) {
							if (!exclusive) return [];
							matched += 1;
						}
						perVariant[perVariant.length] = variantFaults;
					}
					if (exclusive) {
						if (matched === 1) return [];
						if (matched > 1) return [{
							reason: "oneOf",
							path,
							matched
						}];
					}
					const closest = selectClosestFaults(perVariant);
					const report = [exclusive ? {
						reason: "oneOf",
						path,
						matched: 0
					} : {
						reason: "variant",
						path,
						variants: count
					}];
					appendEntries(report, closest);
					return limitEntries(report, 64);
				};
			}
			case "optional": {
				const inner = this.#auditAt(owned.inner);
				return (value, path) => value === void 0 ? [] : inner(value, path);
			}
			case "nullable": {
				const inner = this.#auditAt(owned.inner);
				return (value, path) => value === null ? [] : inner(value, path);
			}
			case "raw": return (value, path) => value === void 0 ? [{
				reason: "type",
				path,
				expected: "json",
				received: preview(value)
			}] : [];
		}
	}
	#buildReporter() {
		const ready = this.#reporter;
		if (ready !== void 0) return ready;
		this.#prepare();
		if (this.#unions()) this.#buildGuard();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			const plan = this.#reportOf(index);
			this.#reports[index] = this.#repeats(index) ? this.#trackFaults(plan) : plan;
		}
		const root = this.#exposeReport(this.#reportAt(this.#node(0)));
		this.#reporter = root;
		return root;
	}
	#exposeReport(plan) {
		return (value, path = []) => contain(() => plan(value, path), "compileReporter");
	}
	#reportAt(shape) {
		const compiled = this.#reports[this.#locate(shape)];
		if (compiled === void 0) throw new ContractError("ContractCompiler: a child reporter is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return compiled;
	}
	#reportOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": {
				const node = owned;
				const declared = owned.pattern;
				const refined = owned.min !== void 0 || owned.max !== void 0 || declared !== void 0;
				const pattern = declared === void 0 ? void 0 : ownPattern(declared, "compileReporter");
				return (value, path) => {
					const parsed = parseString(value);
					if (parsed === void 0) return [{
						reason: "type",
						path,
						expected: "string",
						received: preview(value)
					}];
					return refined ? buildStringFaults(node, parsed, path, pattern) : [];
				};
			}
			case "number": {
				const node = owned;
				const kind = owned.integer === true ? "integer" : "number";
				const refined = owned.integer === true || owned.min !== void 0 || owned.max !== void 0;
				return (value, path) => {
					const parsed = parseNumber(value);
					if (parsed === void 0) return [{
						reason: "type",
						path,
						expected: kind,
						received: preview(value)
					}];
					return refined ? buildNumberFaults(node, parsed, path) : [];
				};
			}
			case "boolean": return (value, path) => parseBoolean(value) === void 0 ? [{
				reason: "type",
				path,
				expected: "boolean",
				received: preview(value)
			}] : [];
			case "null": return (value, path) => value === null ? [] : [{
				reason: "type",
				path,
				expected: "null",
				received: preview(value)
			}];
			case "json": return (value, path) => isJSONValue(value) ? [] : [{
				reason: "type",
				path,
				expected: "json",
				received: preview(value)
			}];
			case "literal": {
				const allowed = literalOf(owned.values);
				return (value, path) => allowed(value) || isString(value) && allowed(value.trim()) ? [] : [{
					reason: "type",
					path,
					expected: "literal",
					received: preview(value)
				}];
			}
			case "array": {
				const node = owned;
				const item = this.#reportAt(owned.items);
				return (value, path) => {
					if (!isArray(value)) return [{
						reason: "type",
						path,
						expected: "array",
						received: preview(value)
					}];
					const entries = readArrayEntries(value);
					if (!entries.success) return [{
						reason: "type",
						path,
						expected: "array",
						received: preview(value)
					}];
					const faults = [];
					for (let entryIndex = 0; entryIndex < entries.value.entries.length; entryIndex += 1) {
						if (faults.length >= 64) break;
						appendEntries(faults, item(entries.value.entries[entryIndex], pathOf(path, INTRINSICS.text(entryIndex))));
					}
					appendEntries(faults, buildArrayFaults(node, entries.value.entries.length, path));
					return limitEntries(faults, 64);
				};
			}
			case "object": {
				const entries = [];
				const names = [];
				const keyList = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
					const key = keyList[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					const optional = child.category === "optional";
					const inner = optional ? child.inner : child;
					entries[entries.length] = {
						key,
						report: this.#reportAt(inner),
						optional,
						kind: shapeToKind(inner)
					};
					names[names.length] = key;
				}
				const extra = owned.additionalProperties;
				const tail = extra === void 0 || extra === true || extra === false ? void 0 : this.#reportAt(extra);
				const open = extra === true || tail !== void 0;
				const planned = attempt(() => collectMembers(names));
				const known = planned.success ? planned.value : void 0;
				const maskable = entries.length <= 31;
				const positions = INTRINSICS.create(null);
				if (maskable) for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
					const entry = entries[entryIndex];
					if (entry === void 0) continue;
					positions[entry.key] = entryIndex;
				}
				return (value, path) => {
					if (!isRecord(value)) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					const record = value;
					const keys = enumerableKeys(record);
					if (keys === void 0) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					const faults = [];
					if (!attempt(() => {
						const present = maskable ? void 0 : collectMembers(keys);
						const vocabulary = known ?? collectMembers(names);
						let seen = 0;
						if (present === void 0) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (!INTRINSICS.own(positions, key)) continue;
							const position = positions[key];
							if (position !== void 0) seen |= 1 << position;
						}
						for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
							const entry = entries[entryIndex];
							if (entry === void 0) continue;
							if (faults.length >= 64) return;
							if (present === void 0 ? (seen & 1 << entryIndex) === 0 : !matchesMember(present, entry.key)) {
								if (!entry.optional) faults[faults.length] = {
									reason: "missing",
									path: pathOf(path, entry.key),
									expected: entry.kind
								};
								continue;
							}
							const raw = record[entry.key];
							if (raw === void 0) {
								if (!entry.optional) faults[faults.length] = {
									reason: "missing",
									path: pathOf(path, entry.key),
									expected: entry.kind
								};
								continue;
							}
							appendEntries(faults, entry.report(raw, pathOf(path, entry.key)));
						}
						if (open) for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
							const key = keys[keyIndex];
							if (key === void 0) continue;
							if (faults.length >= 64) return;
							if (matchesMember(vocabulary, key)) continue;
							const observed = record[key];
							if (tail !== void 0) appendEntries(faults, tail(observed, pathOf(path, key)));
						}
					}).success) return [{
						reason: "type",
						path,
						expected: "object",
						received: preview(value)
					}];
					return limitEntries(faults, 64);
				};
			}
			case "union": {
				const plans = [];
				const guards = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					plans[plans.length] = this.#reportAt(variant);
					guards[guards.length] = this.#guardAt(variant);
				}
				const exclusive = owned.mode === "oneOf";
				const count = owned.variants.length;
				return (value, path) => {
					const perVariant = [];
					for (let index2 = 0; index2 < plans.length; index2 += 1) {
						const plan = plans[index2];
						if (plan === void 0) continue;
						const variantFaults = plan(value, path);
						if (!exclusive && variantFaults.length === 0) return [];
						perVariant[perVariant.length] = variantFaults;
					}
					const closest = selectClosestFaults(perVariant);
					if (exclusive) {
						let matched = 0;
						for (let index2 = 0; index2 < guards.length; index2 += 1) {
							const guard = guards[index2];
							if (guard !== void 0 && guard(value)) matched += 1;
						}
						if (matched === 1) return [];
						if (matched === 0) {
							const report = [{
								reason: "oneOf",
								path,
								matched: 0
							}];
							appendEntries(report, closest);
							return limitEntries(report, 64);
						}
						return [{
							reason: "oneOf",
							path,
							matched
						}];
					}
					const report = [{
						reason: "variant",
						path,
						variants: count
					}];
					appendEntries(report, closest);
					return limitEntries(report, 64);
				};
			}
			case "optional": {
				const inner = this.#reportAt(owned.inner);
				return (value, path) => value === void 0 ? [] : inner(value, path);
			}
			case "nullable": {
				const inner = this.#reportAt(owned.inner);
				return (value, path) => value === null ? [] : inner(value, path);
			}
			case "raw": return (value, path) => value === void 0 ? [{
				reason: "type",
				path,
				expected: "json",
				received: preview(value)
			}] : [];
		}
	}
	#buildGenerator() {
		const ready = this.#generator;
		if (ready !== void 0) return ready;
		this.#prepare();
		if (this.#unions()) this.#buildGuard();
		for (let step = 0; step < this.#order.length; step += 1) {
			const index = this.#order[step];
			if (index === void 0) continue;
			this.#seeds[index] = this.#seedOf(index);
		}
		const root = this.#exposeSeed(this.#seedAt(this.#node(0)));
		this.#generator = root;
		return root;
	}
	#exposeSeed(plan) {
		return (random) => contain(() => plan(random ?? seededRandom(INTRINSICS.now())), "compileGenerator", { code: "generate" });
	}
	#seedAt(shape) {
		const compiled = this.#seeds[this.#locate(shape)];
		if (compiled === void 0) throw new ContractError("ContractCompiler: a child generator is unavailable", {
			code: "structure",
			context: {
				path: [],
				shape: "contract"
			}
		});
		return compiled;
	}
	#seedOf(index) {
		const owned = this.#node(index);
		switch (owned.category) {
			case "string": {
				const min = owned.min ?? 0;
				const max = owned.max ?? INTRINSICS.max(min, 12);
				const length = INTRINSICS.max(min, INTRINSICS.min(max, 8));
				const pattern = owned.pattern;
				return (random) => {
					const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
					let value = "";
					for (let step = 0; step < length; step += 1) value += alphabet[INTRINSICS.floor(drawRandom(random, "string") * 36)];
					if (pattern !== void 0 && !matchOf(pattern)(value)) {
						const limit = readPatternSource(pattern);
						throw new ContractError("compileGenerator: a pattern-constrained string shape cannot be auto-generated — supply or verify values another way", {
							code: "generate",
							context: {
								shape: "string",
								...limit === void 0 ? {} : { limit }
							}
						});
					}
					return value;
				};
			}
			case "number": {
				const whole = owned.integer === true;
				const minimum = owned.min;
				const maximum = owned.max;
				return (random) => {
					const sample = drawRandom(random, whole ? "integer" : "number");
					if (whole) {
						const lo = INTRINSICS.ceil(minimum ?? (maximum === void 0 ? -100 : maximum - 100));
						const hi = INTRINSICS.floor(maximum ?? (minimum === void 0 ? 100 : minimum + 100));
						return lo === hi ? lo : INTRINSICS.floor(lo * (1 - sample) + hi * sample);
					}
					const lo = minimum ?? (maximum === void 0 ? -100 : maximum - 100);
					const hi = maximum ?? (minimum === void 0 ? 100 : minimum + 100);
					return lo === hi ? lo : lo * (1 - sample) + hi * sample;
				};
			}
			case "boolean": return (random) => drawRandom(random, "boolean") >= .5;
			case "null": return () => null;
			case "json": return (random) => {
				const pick = INTRINSICS.floor(drawRandom(random, "json") * 5);
				if (pick === 0) return null;
				if (pick === 1) return drawRandom(random, "json") >= .5;
				if (pick === 2) return INTRINSICS.floor(drawRandom(random, "json") * 1e3);
				if (pick === 3) {
					const alphabet = "abcdefghijklmnopqrstuvwxyz";
					let value = "";
					for (let step = 0; step < 6; step += 1) value += alphabet[INTRINSICS.floor(drawRandom(random, "json") * 26)];
					return value;
				}
				return { value: INTRINSICS.floor(drawRandom(random, "json") * 1e3) };
			};
			case "literal": {
				const values = owned.values;
				return (random) => {
					if (values.length === 0) throw new ContractError("compileGenerator: a literal shape needs at least one value", {
						code: "generate",
						context: {
							shape: "literal",
							limit: 1
						}
					});
					return values[INTRINSICS.floor(drawRandom(random, "literal") * values.length)];
				};
			}
			case "array": {
				const item = this.#seedAt(owned.items);
				const lo = owned.min ?? INTRINSICS.min(1, owned.max ?? 1);
				const hi = owned.max ?? INTRINSICS.max(lo, 3);
				return (random) => {
					const length = INTRINSICS.floor(drawRandom(random, "array") * (hi - lo + 1)) + lo;
					const result = [];
					for (let step = 0; step < length; step += 1) result[result.length] = item(random);
					return result;
				};
			}
			case "object": {
				const entries = [];
				const keyList = INTRINSICS.keys(owned.properties);
				for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
					const key = keyList[keyIndex];
					if (key === void 0) continue;
					const child = owned.properties[key];
					if (child === void 0) continue;
					const optional = child.category === "optional";
					entries[entries.length] = {
						key,
						seed: this.#seedAt(optional ? child.inner : child),
						optional
					};
				}
				const extra = owned.additionalProperties;
				const tail = extra === void 0 || extra === true || extra === false ? void 0 : this.#seedAt(extra);
				return (random) => {
					const result = {};
					for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
						const entry = entries[entryIndex];
						if (entry === void 0) continue;
						if (entry.optional && drawRandom(random, "object") < .3) continue;
						INTRINSICS.define(result, entry.key, {
							value: entry.seed(random),
							enumerable: true,
							configurable: true,
							writable: true
						});
					}
					if (tail !== void 0) {
						const count = 1 + INTRINSICS.floor(drawRandom(random, "object") * 2);
						for (let step = 0; step < count; step += 1) {
							const key = `key${step}`;
							if (INTRINSICS.own(result, key)) continue;
							INTRINSICS.define(result, key, {
								value: tail(random),
								enumerable: true,
								configurable: true,
								writable: true
							});
						}
					}
					return result;
				};
			}
			case "union": {
				const plans = [];
				for (let index2 = 0; index2 < owned.variants.length; index2 += 1) {
					const variant = owned.variants[index2];
					if (variant === void 0) continue;
					plans[plans.length] = this.#seedAt(variant);
				}
				const count = owned.variants.length;
				const guard = count === 0 ? void 0 : this.#guardAt(owned);
				const attempts = INTRINSICS.max(32, count);
				return (random) => {
					if (count === 0 || guard === void 0) throw new ContractError("compileGenerator: a union shape needs at least one variant", {
						code: "generate",
						context: {
							shape: "union",
							limit: 1
						}
					});
					const start = INTRINSICS.floor(drawRandom(random, "union") * count);
					for (let attemptIndex = 0; attemptIndex < attempts; attemptIndex += 1) {
						const plan = plans[(start + attemptIndex) % count];
						if (plan === void 0) continue;
						const outcome = attempt(() => plan(random));
						if (!outcome.success && isContractError(outcome.error) && outcome.error.code === "random") throw outcome.error;
						if (outcome.success && guard(outcome.value)) return outcome.value;
					}
					throw new ContractError("compileGenerator: no union candidate satisfied the compiled guard", {
						code: "generate",
						context: {
							shape: "union",
							limit: attempts
						}
					});
				};
			}
			case "optional": return this.#seedAt(owned.inner);
			case "nullable": {
				const inner = this.#seedAt(owned.inner);
				return (random) => drawRandom(random, "nullable") < .2 ? null : inner(random);
			}
			case "raw": return () => {
				throw new ContractError("compileGenerator: a raw shape embeds an arbitrary JSON Schema and cannot be auto-generated — supply values another way", {
					code: "generate",
					context: {
						shape: "raw",
						limit: "explicit value source"
					}
				});
			};
		}
	}
	#buildContract() {
		const ready = this.#bundle;
		if (ready !== void 0) return ready;
		const schema = this.#buildSchema();
		const guard = this.#buildGuard();
		const parser = this.#buildParser();
		const auditor = this.#buildAuditor();
		const reporter = this.#buildReporter();
		const generator = this.#buildGenerator();
		const bundle = INTRINSICS.freeze({
			schema,
			is: guard,
			parse: parser,
			audit: auditor,
			explain: reporter,
			generate: generator
		});
		this.#bundle = bundle;
		return bundle;
	}
	static {
		pinMembers(ContractCompiler.prototype, "ContractCompiler");
	}
};
/**
* Gates recursive compiler work on shape structure, depth, and cycles.
*
* @remarks
* Constructs a fresh {@link ShapeValidator} and eagerly validates the graph.
* The validator walks iteratively with explicit stack space and observes each
* unique node exactly ONCE per call, so a shared-child DAG costs its AUTHORED
* nodes and edges rather than its paths. Every incoming edge is still inspected:
* where an `optional` node is legal depends on the slot it arrived through, and
* depth is measured over the captured graph afterwards rather than by walking
* each path.
*
* This is also where the compilers' expansion bound lives. Every compiled
* artifact is a tree, so a DAG's cost is the size of the tree it expands into —
* `objectShape({ left: node, right: node })` nested thirty times is thirty-one
* authored nodes and more than a billion emitted ones. The validator counts
* that expansion and {@link refuseExpansion} refuses past
* {@link COMPILE_NODE_LIMIT} with an `expansion`-coded {@link ContractError}, so
* every standalone compiler and {@link createContract} answer a shared-child
* declaration in bounded time instead of not answering. {@link cloneShape} /
* {@link ownShape} are deliberately NOT bounded by it: they preserve
* shared-child identity, so ownership of the same declaration stays
* proportional to its authored nodes.
* Every structural child slot must contain a shape node before it can enter the
* walk; every scalar field must hold its declared runtime domain before a
* compiler can use it; and a missing child, corrupt container, inherited
* discriminant, or unrecognized node reports `structure`. This is the SOLE
* eager well-formedness pass — there is no second prepass and no alias for it:
* it enforces every bound domain and range used by the artifacts, including
* non-empty literal/union vocabularies, finite literal numbers, integer-range
* satisfiability, unflagged string patterns, optional-shape placement, and the
* recursively supported raw-schema vocabulary where every present property or
* dense union member is a record.
* Active ancestors are tracked so shared children remain legal. Every
* standalone compiler reaches this same validation once, over its owned
* snapshot, through {@link ContractCompiler} preparation.
* Failures have deterministic precedence independent of traversal order: depth,
* then structure, then cycle, then field and vocabulary policy.
*
* @param shape - The shape graph to gate
* @returns Nothing; successful return means recursive compilation is structurally safe, depth-safe, and bounded in emitted nodes
* @throws {ContractError} When a node or structural slot is corrupt, a bound or vocabulary is outside its declared domain, the graph is cyclic, it exceeds the compilation depth limit, or it expands past the compilation node limit
*
* @example
* ```ts
* validateShape(stringShape({ min: 1 })) // returns; the declaration is compilable
* ```
*/
function validateShape(shape) {
	return contain(() => {
		const validator = new ShapeValidator(shape);
		validator.validate();
		refuseExpansion(validator.expansion);
	}, "validateShape");
}
/**
* Compiles a {@link ContractShape} into a JSON Schema document.
*
* @remarks
* Object shapes emit `additionalProperties: false` (unless opened) and list only
* required keys in `required`; nullable shapes emit an `anyOf` with `{ type:
* 'null' }`. The result is an owned deeply frozen graph; raw schemas are cloned
* rather than retained by reference. Emission only — it never inspects a
* runtime value. It requests exactly the `schema` root of a fresh
* {@link ContractCompiler}, so the declaration is owned once and validated once
* and no other artifact family is built. Shared declaration identity survives
* into the emitted document: two slots holding one authored node hold one
* emitted subschema, while structurally equal distinct nodes stay distinct.
*
* @param shape - The shape to compile
* @returns The emitted JSON Schema
*
* @example
* ```ts
* compileSchema(stringShape({ min: 1 })) // { type: 'string', minLength: 1 }
* ```
*/
function compileSchema(shape) {
	return contain(() => new ContractCompiler(shape).schema, "compileSchema");
}
function compileGuard(shape) {
	return contain(() => new ContractCompiler(shape).guard, "compileGuard");
}
function compileParser(shape) {
	return contain(() => new ContractCompiler(shape).parser, "compileParser");
}
function compileGenerator(shape, random) {
	return contain(() => new ContractCompiler(shape).generator(random), "compileGenerator", { code: "generate" });
}
/**
* Compiles a {@link ContractShape} into a structured fault report for a value —
* the diagnostic counterpart of {@link compileGuard} / {@link compileParser}.
*
* @remarks
* MIRROR-PARSE semantics: reuses the exact leaf parsers/guards
* {@link compileParser} uses (`parseString` / `parseNumber` / `parseBoolean` /
* `isJSONValue` / …), so the soundness invariant
* `compileReporter(shape, v).length === 0 ⟺ compileParser(shape)(v) !== undefined`
* holds structurally — `explain` mirrors `parse`, not the stricter `is` (a
* coercible value like `'42'` against a `numberShape` reports no fault, the
* same leniency `parse` grants, even though the strict guard would reject it).
* The invariant relates two separate calls, so it holds for a value whose reads
* are stable across calls; see the read-stability precondition on
* {@link ContractInterface}. {@link compileAuditor} is the counterpart report
* for the strict domain, mirroring {@link compileGuard} the way this one
* mirrors {@link compileParser}.
*
* Faults are collected in stable pre-order (declared key/index order); every
* call — object, array, and union alike, including a union's `oneOf` "no
* match" / "no consensus" summary fault prepended to its closest variant's
* faults — slices its return to at most {@link FAULT_LIMIT} entries, so the
* bound holds at every level of nesting rather than at the outermost container alone, on
* adversarial input (a huge array, a wide record, a wide union of wide
* records). A closed object's extra keys never
* fault — `parse` silently drops them, so `explain` mirrors that leniency, and
* {@link compileAuditor} is where they do fault; an open object with a
* constraining `additionalProperties` shape recurses extras against it instead.
* A hostile getter or throwing `Proxy` trap is contained through {@link attempt}
* and surfaces as a single top-level type fault, never a throw, as
* `.claude/rules/patterns.md` § Validation and contracts requires.
* It requests exactly the `reporter` root of a fresh {@link ContractCompiler}
* and applies it once, so one call owns and validates the declaration once
* rather than re-gating every node it descends into. Reuse the compiler (or a
* contract's `explain`) when many values are reported against one shape.
*
* @param shape - The shape to report against
* @param value - The value to check
* @param path - The path prefix for faults produced at this call (defaults to the root)
* @returns The faults found, empty when the value parses successfully
*
* @example
* ```ts
* const user = objectShape({ name: stringShape({ min: 1 }) })
* compileReporter(user, { name: '' })
* // [{ reason: 'constraint', path: ['name'], expected: 'string', constraint: 'min', limit: 1, received: '""' }]
* compileReporter(user, { name: 'Ada' }) // []
* ```
*/
function compileReporter(shape, value, path = []) {
	return contain(() => new ContractCompiler(shape).reporter(value, path), "compileReporter");
}
/**
* Audits a value against the strict acceptance domain of a {@link ContractShape}.
*
* @remarks
* The diagnostic for the domain {@link compileGuard} and {@link compileSchema}
* describe, where {@link compileReporter} diagnoses the wider preimage
* {@link compileParser} maps into it. This walk therefore mirrors the guard:
* leaf coercions are faults, closed-object extras are faults, and union
* acceptance is decided from each variant's strict audit emptiness, so the
* soundness invariant
* `compileAuditor(shape, v).length === 0 ⟺ compileGuard(shape)(v)` holds
* structurally. The shared declaration gate rejects structural and bound-domain
* malformations before either artifact is built, so the invariant is only
* evaluated for a valid declaration. The invariant relates two
* separate calls, so it holds for a value whose reads are stable across calls;
* see the read-stability precondition on {@link ContractInterface}. Every
* recursive call returns at most {@link FAULT_LIMIT} entries. Hostile property
* access raises the shared coded read refusal with the current container path
* and shape, so unreadability never masquerades as a type mismatch.
* It requests exactly the `auditor` root of a fresh {@link ContractCompiler}
* and applies it once; reuse the compiler (or a contract's `audit`) when many
* values are audited against one shape.
*
* @param shape - The shape to audit against
* @param value - The value to check
* @param path - The path prefix for faults produced at this call
* @returns The strict faults found, empty exactly when the compiled guard accepts a stably-read value
*
* @example
* ```ts
* const user = objectShape({ name: stringShape() })
* compileAuditor(user, { name: 'Ada', extra: true })
* // [{ reason: 'extra', path: ['extra'] }]
* ```
*/
function compileAuditor(shape, value, path = []) {
	return contain(() => new ContractCompiler(shape).auditor(value, path), "compileAuditor");
}
function createContract(shape) {
	return contain(() => new ContractCompiler(shape).contract, "createContract");
}
/**
* Owns the state of one single-value inference walk.
*
* @remarks
* The engine behind `valueToSchema`, and the per-sample classifier
* `samplesToSchema` reaches through {@link SampleInferer}. The walk's ancestor
* set and its `(object, remaining depth)` memo are `#` fields rather than
* parameters, so no caller can pre-populate either and change what the walk
* treats as a cycle or serves from cache. Construction observes nothing;
* `infer` runs the whole walk.
*
* Every budget arrives already sanitized: the door applies `sanitizeDepth` and
* `sanitizeBudget` once, so the walk carries a depth no deeper than
* `INFER_DEPTH_LIMIT` and a finite non-negative breadth. Depth decrements per
* level and exhaustion widens to the empty accept-anything schema.
*
* The class is not published and no instance escapes its door, so its prototype
* carries nothing a caller can reach and it needs no member pinning.
*/
var ValueInferer = class ValueInferer {
	static #weakSet = WeakSet;
	static #weakMap = WeakMap;
	#source;
	#depth;
	#breadth;
	#closed;
	#format;
	#visited;
	#memo;
	constructor(value, depth, breadth, closed, format) {
		this.#source = value;
		this.#depth = depth;
		this.#breadth = breadth;
		this.#closed = closed;
		this.#format = format;
		this.#visited = new ValueInferer.#weakSet();
		this.#memo = new ValueInferer.#weakMap();
	}
	/**
	* Infers a JSON Schema fragment for the retained value.
	*
	* @returns The inferred schema fragment
	* @throws When a traversed container cannot be read
	*/
	infer() {
		return this.#infer(this.#source, this.#depth);
	}
	#infer(value, depth) {
		if (isNull(value)) return { type: "null" };
		if (isBoolean(value)) return { type: "boolean" };
		if (isInteger(value)) return { type: "integer" };
		if (isFiniteNumber(value)) return { type: "number" };
		if (isNumber(value)) return {};
		if (isString(value)) {
			if (this.#format) {
				const detected = stringToFormat(value);
				if (detected) return {
					type: "string",
					format: detected
				};
			}
			return { type: "string" };
		}
		if (isArray(value)) return this.#walkArray(value, depth);
		if (isRecord(value)) return this.#walkRecord(value, depth);
		if (isDate(value)) return this.#format ? {
			type: "string",
			format: "date-time"
		} : { type: "string" };
		return {};
	}
	#walkArray(value, depth) {
		if (!(depth > 0) || matchesVisited(this.#visited, value)) return {};
		const cached = INTRINSICS.reflect.apply(INTRINSICS.recall, this.#memo, [value])?.get(depth);
		if (cached) return cached;
		admitVisited(this.#visited, value);
		const outcome = attempt(() => {
			const snapshot = readArrayEntries(value);
			if (!snapshot.success) throw snapshot.error;
			if (!snapshot.value.dense) return void 0;
			const entries = snapshot.value.entries;
			const sampled = [];
			const length = INTRINSICS.min(entries.length, this.#breadth);
			for (let index = 0; index < length; index += 1) sampled[sampled.length] = this.#infer(entries[index], depth - 1);
			return sampled;
		});
		omitVisited(this.#visited, value);
		if (!outcome.success) throw outcome.error;
		const sampled = outcome.value;
		const schema = sampled === void 0 ? {} : sampled.length > 0 ? {
			type: "array",
			items: unifySchemas(sampled)
		} : { type: "array" };
		retainDepth(this.#memo, value, depth, schema);
		return schema;
	}
	#walkRecord(value, depth) {
		if (!(depth > 0) || matchesVisited(this.#visited, value)) return {};
		const cached = INTRINSICS.reflect.apply(INTRINSICS.recall, this.#memo, [value])?.get(depth);
		if (cached) return cached;
		admitVisited(this.#visited, value);
		const outcome = attempt(() => {
			const snapshot = enumerableKeys(value);
			if (snapshot === void 0) throw new INTRINSICS.error("property enumeration failed");
			const allKeys = sortValues(snapshot);
			const keys = limitEntries(allKeys, this.#breadth);
			const truncated = allKeys.length > this.#breadth;
			const properties = INTRINSICS.create(null);
			const required = [];
			let dropped = false;
			for (let index = 0; index < keys.length; index += 1) {
				const key = keys[index];
				if (key === void 0) continue;
				const propertyValue = value[key];
				if (propertyValue === void 0) {
					dropped = true;
					continue;
				}
				properties[key] = this.#infer(propertyValue, depth - 1);
				required[required.length] = key;
			}
			return {
				properties,
				required,
				partial: truncated || dropped
			};
		});
		omitVisited(this.#visited, value);
		if (!outcome.success) throw outcome.error;
		const { properties, required, partial } = outcome.value;
		const schema = {
			type: "object",
			...INTRINSICS.keys(properties).length > 0 ? { properties } : {},
			...required.length > 0 ? { required } : {},
			additionalProperties: partial ? true : !this.#closed
		};
		retainDepth(this.#memo, value, depth, schema);
		return schema;
	}
};
/**
* Owns the state of one multi-sample inference walk.
*
* @remarks
* The engine behind `samplesToSchema`, which is the only door that constructs
* it. The walk's {@link SampleMemo} is a `#` field rather than a parameter, so
* no caller can pre-populate it and serve one walk another walk's answer.
* Construction observes nothing; `infer` runs the whole walk.
*
* Every sample list the walk carries is owned: the door reads and dense-checks
* the caller's array before construction, and every list below the root is
* collected by this class. Every budget arrives already sanitized. Unlike the
* single-value walk, the record path carries no ancestor set — a value shared by
* reference across sample rows is legitimate data rather than a cycle back to an
* ancestor — so termination rests on the decrementing depth budget and the
* shared memo.
*
* The class is not published and no instance escapes its door, so its prototype
* carries nothing a caller can reach and it needs no member pinning.
*/
var SampleInferer = class {
	#samples;
	#depth;
	#breadth;
	#closed;
	#format;
	#enumerated;
	#memo;
	constructor(samples, depth, breadth, closed, format, enumerated) {
		this.#samples = samples;
		this.#depth = depth;
		this.#breadth = breadth;
		this.#closed = closed;
		this.#format = format;
		this.#enumerated = enumerated;
		this.#memo = buildSampleMemo();
	}
	/**
	* Infers one JSON Schema over the retained sample list.
	*
	* @returns The inferred schema
	* @throws When a sample row cannot be read
	*/
	infer() {
		return this.#infer(this.#samples, this.#depth, this.#memo);
	}
	#infer(samples, depth, memo) {
		if (samples.length === 0) return {};
		const records = [];
		for (let index = 0; index < samples.length; index += 1) {
			const sample = samples[index];
			if (isRecord(sample)) records[records.length] = sample;
		}
		if (records.length === samples.length) return this.#walkRecords(records, depth, memo);
		if (this.#enumerated) {
			const enumSchema = inferPrimitiveEnum(samples, 12);
			if (enumSchema) return enumSchema;
		}
		const schemas = [];
		for (let index = 0; index < samples.length; index += 1) schemas[schemas.length] = new ValueInferer(samples[index], depth, this.#breadth, this.#closed, false).infer();
		const unified = unifySchemas(schemas);
		if (this.#format && unified.type === "string" && INTRINSICS.keys(unified).length === 1) {
			const detected = samplesToFormat(samples);
			if (detected) return {
				type: "string",
				format: detected
			};
		}
		return unified;
	}
	#walkRecords(samples, depth, memo) {
		if (!(depth > 0)) return {};
		let node = memo;
		for (let index = 0; index < samples.length; index += 1) {
			const row = samples[index];
			if (row === void 0) break;
			const next = INTRINSICS.reflect.apply(INTRINSICS.recall, node.rows, [row]);
			if (next !== void 0) {
				node = readSampleMemo(next, "samplesToSchema");
				continue;
			}
			const fresh = buildSampleMemo();
			INTRINSICS.reflect.apply(INTRINSICS.retain, node.rows, [row, fresh]);
			node = fresh;
		}
		const signature = `${depth}|${this.#breadth}|${this.#closed}|${this.#format}|${this.#enumerated}`;
		const cached = INTRINSICS.reflect.apply(INTRINSICS.fetch, node.schemas, [signature]);
		if (cached !== void 0) return cached;
		const seen = collectMembers([]);
		const collected = [];
		for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex += 1) {
			const sample = samples[sampleIndex];
			if (sample === void 0) throw new INTRINSICS.error("samplesToSchema: every sample must be a record");
			const sampleKeys = enumerableKeys(sample);
			if (sampleKeys === void 0) throw new INTRINSICS.error("samplesToSchema: property enumeration failed");
			for (let keyIndex = 0; keyIndex < sampleKeys.length; keyIndex += 1) {
				const key = sampleKeys[keyIndex];
				if (key === void 0 || matchesMember(seen, key)) continue;
				admitMember(seen, key);
				collected[collected.length] = key;
			}
		}
		const allKeys = sortValues(collected);
		const keys = limitEntries(allKeys, this.#breadth);
		const truncated = allKeys.length > this.#breadth;
		const properties = INTRINSICS.create(null);
		const required = [];
		let partial = truncated;
		for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
			const key = keys[keyIndex];
			if (key === void 0) continue;
			const valuesOutcome = attempt(() => {
				const values = [];
				let dropped = false;
				for (let sampleIndex = 0; sampleIndex < samples.length; sampleIndex += 1) {
					const sample = samples[sampleIndex];
					if (sample === void 0) throw new INTRINSICS.error("samplesToSchema: every sample must be a record");
					const propertyValue = sample[key];
					if (propertyValue === void 0) {
						if (INTRINSICS.own(sample, key)) dropped = true;
						continue;
					}
					values[values.length] = propertyValue;
				}
				return {
					values,
					dropped
				};
			});
			if (!valuesOutcome.success) throw valuesOutcome.error;
			const { values, dropped } = valuesOutcome.value;
			if (dropped) partial = true;
			if (values.length > 0) properties[key] = this.#infer(values, depth - 1, memo);
			if (!dropped && values.length === samples.length) required[required.length] = key;
		}
		const schema = {
			type: "object",
			...INTRINSICS.keys(properties).length > 0 ? { properties } : {},
			...required.length > 0 ? { required } : {},
			additionalProperties: partial ? true : !this.#closed
		};
		INTRINSICS.reflect.apply(INTRINSICS.store, node.schemas, [signature, schema]);
		return schema;
	}
};
/**
* Unifies a list of inferred `JSONSchema` fragments into one schema.
*
* @remarks
* De-duplicates by {@link canonicalStringify}, then applies the one
* special-case subsumption inference performs: a bare `{ type: 'integer' }`
* alongside a bare `{ type: 'number' }` collapses to `{ type: 'number' }`
* (an integer sample is also a valid `number` sample). A single surviving
* distinct schema is returned directly; two or more are wrapped as
* `{ anyOf: [...] }`, sorted by their canonical key for deterministic output.
* An empty input list returns the empty accept-anything schema `{}`.
*
* Every captured member must first be a non-null object record. This runtime
* requirement is realm-agnostic and admits ordinary and null-prototype schema
* records while refusing primitives and callables before canonicalization.
*
* A readable member {@link canonicalStringify} cannot key — a cyclic or
* otherwise JSON-inexpressible fragment, which only a direct caller can supply
* since the inferers always build plain encodable fragments — has NO
* de-duplication key, so it can participate in neither de-duplication nor the
* canonical-key ordering. It is KEPT (dropping a variant would narrow the
* union, and unification only ever widens), appended in input order after the
* sorted keyed members. A failed member read propagates the canonicalizer's
* coded refusal instead of participating in the union.
*
* @param schemas - The schemas to unify
* @returns The unified schema
*
* @example
* ```ts
* unifySchemas([{ type: 'integer' }, { type: 'number' }]) // { type: 'number' }
* unifySchemas([{ type: 'string' }, { type: 'boolean' }])
* // { anyOf: [{ type: 'boolean' }, { type: 'string' }] }
* ```
*/
function unifySchemas(schemas) {
	return contain(() => {
		return readValue(() => {
			const snapshot = readArrayEntries(schemas);
			if (!snapshot.success) throw snapshot.error;
			if (!snapshot.value.dense) throw new INTRINSICS.error("unifySchemas: schemas must be dense");
			const owned = snapshot.value.entries;
			if (owned.length === 0) return {};
			const keys = [];
			const collected = collectMembers([]);
			const byKey = INTRINSICS.create(null);
			const unkeyed = [];
			for (let index = 0; index < owned.length; index += 1) {
				const schema = owned[index];
				if (schema === void 0 || !isRecord(schema)) throw new INTRINSICS.error("unifySchemas: schemas must be records");
				const key = canonicalStringify(schema);
				if (key === void 0) {
					unkeyed[unkeyed.length] = schema;
					continue;
				}
				if (matchesMember(collected, key)) continue;
				admitMember(collected, key);
				keys[keys.length] = key;
				byKey[key] = schema;
			}
			const integerKey = canonicalStringify({ type: "integer" });
			const numberKey = canonicalStringify({ type: "number" });
			const subsumed = integerKey !== void 0 && numberKey !== void 0 && matchesMember(collected, integerKey) && matchesMember(collected, numberKey) ? integerKey : void 0;
			const ordered = sortValues(keys);
			const members = [];
			for (let index = 0; index < ordered.length; index += 1) {
				const key = ordered[index];
				if (key === void 0 || key === subsumed) continue;
				const schema = byKey[key];
				if (schema === void 0) continue;
				members[members.length] = schema;
			}
			appendEntries(members, unkeyed);
			if (members.length <= 1) return members[0] ?? {};
			return { anyOf: members };
		}, "unifySchemas", { subject: "schemas" });
	}, "unifySchemas");
}
/**
* Classifies a string against the {@link SchemaFormat} vocabulary.
*
* @remarks
* Total, pure, and deterministic. Fixed precedence, most specific first:
* `'uuid'`, `'date-time'`, `'date'`, `'time'`, `'email'`, `'uri'` — the first
* match wins. The `date-time` / `date` / `time` branches require BOTH a
* strict ISO-8601 shape match AND a real {@link matchesISOInstant} validity
* check, so a shape-plausible but impossible date (`2020-13-45`) is rejected.
* Returns `undefined` when no format matches (including the empty string).
*
* @param value - The string to classify
* @returns The matched {@link SchemaFormat}, or `undefined`
*
* @example
* ```ts
* stringToFormat('550e8400-e29b-41d4-a716-446655440000') // 'uuid'
* stringToFormat('2024-01-15')                             // 'date'
* stringToFormat('2020-13-45')                             // undefined — invalid date
* stringToFormat('ada@example.com')                        // 'email'
* stringToFormat('10:30:00')                                // undefined — RFC 3339 time requires an offset
* stringToFormat('10:30:00+02:00')                          // 'time'
* ```
*/
function stringToFormat(value) {
	if (!isString(value)) return void 0;
	if (value.length > 128) return void 0;
	const outcome = attempt(() => classifyFormat(value));
	return outcome.success ? outcome.value : void 0;
}
/**
* Classifies a list of sample values against the {@link SchemaFormat}
* vocabulary, requiring unanimity.
*
* @remarks
* A format is returned ONLY IF every value is a string AND every one maps to
* the SAME {@link stringToFormat} result (including all mapping to
* `undefined`, which itself returns `undefined` here). A single disagreeing
* value, a non-string value, or an empty list all yield `undefined` — the
* multi-sample seam behind {@link samplesToSchema}
* relies on this unanimity so a slot with mixed string shapes emits a bare
* `{ type: 'string' }` rather than an `anyOf` of formats.
*
* @param values - The sample values to classify
* @returns The unanimous {@link SchemaFormat}, or `undefined`
*
* @example
* ```ts
* samplesToFormat(['2024-01-01', '2024-02-02']) // 'date'
* samplesToFormat(['2024-01-01', 'not a date'])  // undefined
* samplesToFormat([])                            // undefined
* ```
*/
function samplesToFormat(values) {
	return contain(() => {
		return readValue(() => {
			const snapshot = readArrayEntries(values);
			if (!snapshot.success) throw snapshot.error;
			if (!snapshot.value.dense) throw new INTRINSICS.error("samplesToFormat: values must be dense");
			const owned = snapshot.value.entries;
			if (owned.length === 0) return void 0;
			let first;
			for (let index = 0; index < owned.length; index += 1) {
				const value = owned[index];
				if (!isString(value)) return void 0;
				const format = stringToFormat(value);
				if (format === void 0) return void 0;
				if (index === 0) first = format;
				else if (format !== first) return void 0;
			}
			return first;
		}, "samplesToFormat", { subject: "values" });
	}, "samplesToFormat");
}
/**
* Infers an `{ enum: [...] }` fragment for a low-cardinality, repeated
* primitive slot — the multi-sample-only counterpart to
* {@link stringToFormat} ({@link valueToSchema} never emits `enum`).
*
* @remarks
* Fires only when ALL of: every value is the same primitive kind (all string
* or all FINITE number through {@link isFiniteNumber} — any `null`/boolean/mixed
* slot never qualifies, and a slot containing `NaN` / `±Infinity` never
* qualifies either, since {@link canonicalStringify} collapses `NaN` to
* `'null'` and would otherwise risk an invalid-JSON `enum`); at least 2
* values are given; the distinct-by-{@link canonicalStringify} count is LESS
* than the value count (repetition required — separates a categorical column
* from an ID column); and the distinct count is at most `limit`. The emitted
* schema carries `enum` with NO `type` key, byte-matching `compileSchema`'s
* `literalShape` emission. Members are sorted by canonical key for
* deterministic output.
*
* A member {@link canonicalStringify} cannot key has no identity to
* de-duplicate against, so the whole slot is enum-INELIGIBLE and returns
* `undefined` — widening to the caller's bare `type` rather than emitting an
* `enum` that might silently omit a value. (A string or finite number always
* canonicalizes, so this only guards the total contract.)
*
* @param values - The collected slot values
* @param limit - The maximum distinct-value count before giving up
* @returns The `{ enum: [...] }` fragment, or `undefined` when ineligible
*
* @example
* ```ts
* inferPrimitiveEnum(['active', 'inactive', 'active'], 12)
* // { enum: ['active', 'inactive'] }
* inferPrimitiveEnum(['a', 'b', 'c'], 12) // undefined — no repetition
* ```
*/
function inferPrimitiveEnum(values, limit) {
	return contain(() => {
		return readValue(() => {
			const snapshot = readArrayEntries(values);
			if (!snapshot.success) throw snapshot.error;
			if (!snapshot.value.dense) throw new INTRINSICS.error("inferPrimitiveEnum: values must be dense");
			const owned = snapshot.value.entries;
			if (owned.length < 2) return void 0;
			let strings = 0;
			let numbers = 0;
			for (let index = 0; index < owned.length; index += 1) {
				const value = owned[index];
				if (isString(value)) strings += 1;
				else if (isFiniteNumber(value)) numbers += 1;
			}
			const allString = strings === owned.length;
			const allNumber = !allString && numbers === owned.length;
			if (!allString && !allNumber) return void 0;
			const keys = [];
			const collected = collectMembers([]);
			const byKey = INTRINSICS.create(null);
			for (let index = 0; index < owned.length; index += 1) {
				const value = owned[index];
				if (!isString(value) && !isFiniteNumber(value)) continue;
				const key = canonicalStringify(value);
				if (key === void 0) return void 0;
				if (!matchesMember(collected, key)) {
					admitMember(collected, key);
					keys[keys.length] = key;
				}
				byKey[key] = value;
			}
			if (keys.length >= owned.length || keys.length > limit) return void 0;
			const ordered = sortValues(keys);
			const population = [];
			for (let index = 0; index < ordered.length; index += 1) {
				const key = ordered[index];
				if (key === void 0) continue;
				const value = byKey[key];
				if (value === void 0) continue;
				population[population.length] = value;
			}
			return { enum: population };
		}, "inferPrimitiveEnum", { subject: "values" });
	}, "inferPrimitiveEnum");
}
/**
* Infers a `JSONSchema` for one unknown value — the reverse direction of
* {@link compileSchema}.
*
* @remarks
* Cycle-, depth-, and breadth-bounded: the walk keeps an ancestor set and an
* `(object, remaining depth)` memo of its own, so a cyclic host terminates and a
* shared-reference DAG costs its nodes rather than its paths. A failed traversal
* throws a `structure`
* {@link ContractError}; it never becomes `{}` or another permissive schema. Nested
* objects close to unknown keys (`additionalProperties: false`) by default;
* pass `closed: false` to open them. `format` (default `false`) opts a
* string/`Date` leaf into the `format` keyword. Structurally-equal inputs
* infer byte-identical schemas (object keys and `anyOf` members are sorted).
*
* A non-object root — for example `valueToSchema('hi')` yielding `{ type: 'string'
* }` — is structurally accepted by `schemaToParameters`, but MCP clients
* expect an object-shaped `inputSchema`; wrap a non-object payload with
* {@link schemaToObject} before advertising it as a tool's parameters.
*
* `limits.properties` is sanitized through {@link sanitizeBudget} to a finite
* non-negative integer, falling back to {@link INFER_BREADTH_LIMIT} for anything
* else (`NaN`, `Infinity`, negative, fractional), so a malformed breadth cannot
* corrupt the sampled key/element list.
*
* `limits.depth` goes through {@link sanitizeDepth}, which does the same and then caps
* at {@link INFER_DEPTH_LIMIT}, so the option NARROWS the walk and cannot widen
* it. The cap is what makes the depth guard unbreakable: depth is the recursing
* axis, so an uncapped large-but-valid budget would descend until the call STACK
* failed rather than until the guard says stop.
*
* @param value - The value to infer a schema from
* @param options - Optional {@link ValueToSchemaLimits} `limits` plus `closed` / `format` bounds
* @returns The inferred `JSONSchema`
* @throws {ContractError} When the value or options cannot be read
*
* @example
* ```ts
* valueToSchema({ id: 1, name: 'Ada', tags: ['a', 'b'] })
* // { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' },
* //   tags: { type: 'array', items: { type: 'string' } } },
* //   required: ['id', 'name', 'tags'], additionalProperties: false }
* ```
*/
function valueToSchema(value, options) {
	return contain(() => {
		const optionsSnapshot = readOptions(options, [
			"limits",
			"closed",
			"format",
			"enum"
		], "valueToSchema", "schema");
		const limits = readOptions(optionsSnapshot?.limits, ["depth", "properties"], "valueToSchema", "schema");
		const depth = sanitizeDepth(limits?.depth);
		const properties = sanitizeBudget(limits?.properties, 256);
		const closed = optionsSnapshot?.closed ?? true;
		const format = optionsSnapshot?.format ?? false;
		return readValue(() => new ValueInferer(value, depth, properties, closed, format).infer(), "valueToSchema");
	}, "valueToSchema");
}
/**
* Infers a `JSONSchema` from a set of example values — the multi-example
* counterpart of {@link valueToSchema} (for example inferring one schema from
* several database rows).
*
* @remarks
* An empty `samples` array infers the empty accept-anything schema `{}`.
* When every sample is a plain record, properties/required are unified
* per-key across all samples — a key
* required iff present and non-`undefined` in every sample. Otherwise the
* slot is inferred one value at a time (independent {@link valueToSchema}
* per sample, unified with {@link unifySchemas} — the same de-duplication and
* `anyOf` ordering an array's element schemas receive). `format`
* and `enum` (both default `false`) opt a low-cardinality/unanimous-format
* slot into the corresponding keyword: enum inference runs first and wins
* outright, and a unanimous format is reattached only to a slot that unified to
* exactly `{ type: 'string' }`, with nested formats forced off. `limits.depth` /
* `limits.properties` are resolved exactly as {@link valueToSchema} resolves them —
* breadth through {@link sanitizeBudget}, depth through {@link sanitizeDepth},
* which also caps at {@link INFER_DEPTH_LIMIT}; see there for why.
*
* @param samples - The example values to infer a schema from
* @param options - Optional {@link ValueToSchemaLimits} `limits` plus `closed` / `format` / `enum` bounds
* @returns The inferred `JSONSchema`
* @throws {ContractError} When the samples or options cannot be read
*
* @example
* ```ts
* samplesToSchema([{ id: 1 }, { id: 2, name: 'Ada' }])
* // { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } },
* //   required: ['id'], additionalProperties: false }
* samplesToSchema([]) // {}
* ```
*/
function samplesToSchema(samples, options) {
	return contain(() => {
		const optionsSnapshot = readOptions(options, [
			"limits",
			"closed",
			"format",
			"enum"
		], "samplesToSchema", "schema");
		const limits = readOptions(optionsSnapshot?.limits, ["depth", "properties"], "samplesToSchema", "schema");
		const depth = sanitizeDepth(limits?.depth);
		const properties = sanitizeBudget(limits?.properties, 256);
		const closed = optionsSnapshot?.closed ?? true;
		const format = optionsSnapshot?.format ?? false;
		const enumOn = optionsSnapshot?.enum ?? false;
		const read = readValue(() => {
			const snapshot = readArrayEntries(samples);
			if (!snapshot.success) throw snapshot.error;
			return snapshot.value;
		}, "samplesToSchema", { subject: "samples" });
		if (!read.dense) throw new ContractError("samplesToSchema: samples must be a dense array", { code: "structure" });
		return readValue(() => new SampleInferer(read.entries, depth, properties, closed, format, enumOn).infer(), "samplesToSchema", { subject: "samples" });
	}, "samplesToSchema");
}
/**
* Owns the state of one schema-inversion walk.
*
* @remarks
* The engine behind `schemaToShape`, which is the only door that constructs it.
* The walk's cycle set and its `(node, remaining depth)` memo are `#` fields
* rather than parameters, so no caller can pre-populate either and change what
* the conversion widens. Construction observes nothing; `shape` runs the whole
* walk and every refusal it raises is published by that door under the door's
* own name.
*
* The recursion is `#` private for the same reason it is bounded: it is the
* class's defining spine, and its state has no meaning outside one call. The
* collection constructors are captured while this module evaluates, so a caller
* who replaces `globalThis.WeakSet` or `globalThis.WeakMap` before the door runs
* cannot make construction throw a raw value out of a door documented to refuse
* with a `ContractError`.
*
* The class is not published and no instance escapes its door, so its prototype
* carries nothing a caller can reach and it needs no member pinning.
*/
var SchemaShaper = class SchemaShaper {
	static #weakSet = WeakSet;
	static #weakMap = WeakMap;
	#source;
	#visited;
	#memo;
	constructor(schema) {
		this.#source = schema;
		this.#visited = new SchemaShaper.#weakSet();
		this.#memo = new SchemaShaper.#weakMap();
	}
	/**
	* Converts the retained schema into a validating contract shape.
	*
	* @returns The built shape, widened wherever the schema is inexpressible
	* @throws {ContractError} When schema traversal fails
	*/
	shape() {
		return this.#convert(this.#source, 32);
	}
	#convert(schema, depth) {
		if (!(depth > 0)) return rawShape({});
		if (!matchesRecordBrand(schema)) return rawShape({});
		if (matchesVisited(this.#visited, schema)) return rawShape({});
		const depthMemo = INTRINSICS.reflect.apply(INTRINSICS.recall, this.#memo, [schema]);
		const cached = depthMemo === void 0 ? void 0 : INTRINSICS.reflect.apply(INTRINSICS.fetch, depthMemo, [depth]);
		if (cached) return cached;
		admitVisited(this.#visited, schema);
		try {
			const shape = this.#build(schema, depth);
			retainDepth(this.#memo, schema, depth, shape);
			return shape;
		} finally {
			omitVisited(this.#visited, schema);
		}
	}
	#build(schema, depth) {
		const description = isString(schema.description) ? schema.description : void 0;
		if (isArray(schema.enum)) {
			const literals = [];
			const seen = collectMembers([]);
			for (let index = 0; index < schema.enum.length; index += 1) {
				const entry = schema.enum[index];
				if (isLiteralValue(entry) && (typeof entry !== "number" || isFiniteNumber(entry))) {
					if (matchesMember(seen, entry)) continue;
					admitMember(seen, entry);
					literals[literals.length] = entry;
				}
			}
			if (literals.length > 0) return literalShape(literals, description === void 0 ? void 0 : { description });
		}
		if (isArray(schema.oneOf)) {
			const records = [];
			for (let index = 0; index < schema.oneOf.length; index += 1) {
				const entry = schema.oneOf[index];
				if (isRecord(entry)) records[records.length] = entry;
			}
			if (records.length > 256) return rawShape(description === void 0 ? {} : { description });
			const variants = [];
			for (let index = 0; index < records.length; index += 1) {
				const entry = records[index];
				if (entry === void 0) continue;
				variants[variants.length] = this.#convert(entry, depth - 1);
			}
			if (variants.length > 0) return INTRINSICS.reflect.apply(oneOfShape, void 0, variants);
		}
		if (isArray(schema.anyOf)) {
			const records = [];
			for (let index = 0; index < schema.anyOf.length; index += 1) {
				const entry = schema.anyOf[index];
				if (isRecord(entry)) records[records.length] = entry;
			}
			if (records.length > 256) return rawShape(description === void 0 ? {} : { description });
			const variants = [];
			for (let index = 0; index < records.length; index += 1) {
				const entry = records[index];
				if (entry === void 0) continue;
				variants[variants.length] = this.#convert(entry, depth - 1);
			}
			if (variants.length > 0) return INTRINSICS.reflect.apply(unionShape, void 0, variants);
		}
		const type = isString(schema.type) ? schema.type : void 0;
		if (type === "string") return stringShape({
			...deriveLengthBounds(schema.minLength, schema.maxLength),
			...description === void 0 ? {} : { description }
		});
		if (type === "number") return numberShape({
			...deriveRangeBounds(schema.minimum, schema.maximum),
			...description === void 0 ? {} : { description }
		});
		if (type === "integer") {
			const bounds = deriveRangeBounds(schema.minimum, schema.maximum);
			return integerShape(INTRINSICS.ceil(bounds.min ?? Number.NEGATIVE_INFINITY) > INTRINSICS.floor(bounds.max ?? Number.POSITIVE_INFINITY) ? description === void 0 ? void 0 : { description } : {
				...bounds,
				...description === void 0 ? {} : { description }
			});
		}
		if (type === "boolean") return booleanShape(description === void 0 ? void 0 : { description });
		if (type === "null") return nullShape(description === void 0 ? void 0 : { description });
		if (type === "array") return arrayShape(isRecord(schema.items) ? this.#convert(schema.items, depth - 1) : rawShape({}), {
			...deriveLengthBounds(schema.minItems, schema.maxItems),
			...description === void 0 ? {} : { description }
		});
		if (type === "object" || type === void 0 && isRecord(schema.properties)) return this.#buildObject(schema, depth, description);
		return rawShape(description === void 0 ? {} : { description });
	}
	#buildObject(schema, depth, description) {
		const propertiesSource = isRecord(schema.properties) ? schema.properties : void 0;
		const requiredSource = collectMembers([]);
		if (isArray(schema.required)) for (let index = 0; index < schema.required.length; index += 1) {
			const entry = schema.required[index];
			if (isString(entry)) admitMember(requiredSource, entry);
		}
		const properties = INTRINSICS.create(null);
		let truncated = false;
		if (propertiesSource) {
			const allKeys = INTRINSICS.keys(propertiesSource);
			truncated = allKeys.length > 256;
			const keys = limitEntries(allKeys, 256);
			for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
				const key = keys[keyIndex];
				if (key === void 0) continue;
				const child = propertiesSource[key];
				const childShape = isRecord(child) ? this.#convert(child, depth - 1) : rawShape({});
				properties[key] = matchesMember(requiredSource, key) ? childShape : optionalShape(childShape);
			}
		}
		const extra = schema.additionalProperties;
		const additionalProperties = truncated ? true : extra === false ? false : isRecord(extra) ? this.#convert(extra, depth - 1) : true;
		return INTRINSICS.freeze({
			category: "object",
			properties: INTRINSICS.freeze(properties),
			additionalProperties,
			...description === void 0 ? {} : { description }
		});
	}
};
/**
* Builds a string {@link StringShape}.
*
* @remarks
* A supplied pattern is captured by source and flags. The shape exposes a fresh
* frozen zero-state `RegExp` on every `pattern` read, so neither the caller's
* original nor a value read from the shape can drift later compiled artifacts.
*
* @param options - Optional length (`min` / `max`), `pattern`, and `description`
* @returns A string shape
* @throws {ContractError} When a present bound is invalid, `pattern` is not a `RegExp`, or `pattern` has flags
*
* @example
* ```ts
* const name = stringShape({ min: 1, max: 80, description: 'Display name' })
* ```
*/
function stringShape(options) {
	return contain(() => {
		const safe = readOptions(options, [
			"min",
			"max",
			"pattern",
			"description"
		], "stringShape", "string");
		const pattern = safe?.pattern;
		if (safe?.min !== void 0 && (!INTRINSICS.safe(safe.min) || safe.min < 0)) throw new ContractError("stringShape: min must be a non-negative safe integer", {
			code: "bound",
			context: {
				shape: "string",
				limit: "non-negative safe integer",
				received: preview(safe.min)
			}
		});
		if (safe?.max !== void 0 && (!INTRINSICS.safe(safe.max) || safe.max < 0)) throw new ContractError("stringShape: max must be a non-negative safe integer", {
			code: "bound",
			context: {
				shape: "string",
				limit: "non-negative safe integer",
				received: preview(safe.max)
			}
		});
		if (pattern !== void 0 && !isRegExp(pattern)) throw new ContractError("stringShape: pattern must be a RegExp", {
			code: "pattern",
			context: {
				shape: "string",
				received: typeof pattern
			}
		});
		const patternSnapshot = pattern === void 0 ? void 0 : readValue(() => {
			const source = readPatternSource(pattern);
			const flags = readPatternFlags(pattern);
			if (source === void 0 || flags === void 0) throw new INTRINSICS.error("Pattern source and flags could not be read");
			return {
				source,
				flags,
				text: `/${source}/${flags}`
			};
		}, "stringShape", {
			subject: "pattern",
			code: "pattern",
			context: { shape: "string" }
		});
		if (patternSnapshot !== void 0 && patternSnapshot.flags.length > 0) throw new ContractError("stringShape: pattern must not use flags; use inline pattern constructs instead", {
			code: "pattern",
			context: {
				shape: "string",
				received: patternSnapshot.text
			}
		});
		const shape = {
			category: "string",
			...safe?.min === void 0 ? {} : { min: safe.min },
			...safe?.max === void 0 ? {} : { max: safe.max },
			...patternSnapshot === void 0 ? {} : { pattern: new INTRINSICS.pattern(patternSnapshot.source) },
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return cloneShape(shape);
	}, "stringShape");
}
/**
* Builds a numeric {@link NumberShape}.
*
* @remarks
* A present `min` or `max` must be finite. `NaN` and `±Infinity` throw a `bound` {@link
* ContractError} at construction, because no finite value satisfies them and no JSON
* Schema keyword expresses them.
*
* @param options - Optional bounds (`min` / `max`), `integer`, and `description`
* @returns A number shape
* @throws {ContractError} When a present bound is not finite
*
* @example
* ```ts
* const age = numberShape({ min: 0, max: 120 })
* ```
*/
function numberShape(options) {
	return contain(() => {
		const safe = readOptions(options, [
			"min",
			"max",
			"integer",
			"description"
		], "numberShape", "number");
		const shape = safe?.integer === true ? "integer" : "number";
		if (safe?.min !== void 0 && !INTRINSICS.finite(safe.min)) throw new ContractError("numberShape: min must be finite", {
			code: "bound",
			context: {
				shape,
				limit: "finite number",
				received: preview(safe.min)
			}
		});
		if (safe?.max !== void 0 && !INTRINSICS.finite(safe.max)) throw new ContractError("numberShape: max must be finite", {
			code: "bound",
			context: {
				shape,
				limit: "finite number",
				received: preview(safe.max)
			}
		});
		const result = {
			category: "number",
			...safe?.min === void 0 ? {} : { min: safe.min },
			...safe?.max === void 0 ? {} : { max: safe.max },
			...safe?.integer === void 0 ? {} : { integer: safe.integer },
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(result).validate();
		return INTRINSICS.freeze(result);
	}, "numberShape");
}
/**
* Builds an integer {@link NumberShape} — forces `integer: true`.
*
* @remarks
* The emitted JSON Schema uses `"type": "integer"` and the guard rejects
* fractional numbers.
*
* @param options - Optional bounds and `description` (no `integer` key)
* @returns An integer number shape
* @throws {ContractError} When a present bound is not finite
*/
function integerShape(options) {
	return contain(() => {
		return numberShape({
			...readOptions(options, [
				"min",
				"max",
				"description"
			], "integerShape", "integer"),
			integer: true
		});
	}, "integerShape");
}
/**
* Builds a {@link BooleanShape}.
*
* @param options - Optional `description`
* @returns A boolean shape
*
* @example
* ```ts
* const active = booleanShape({ description: 'Whether the record is active' })
* ```
*/
function booleanShape(options) {
	return contain(() => {
		const safe = readOptions(options, ["description"], "booleanShape", "boolean");
		const shape = {
			category: "boolean",
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "booleanShape");
}
/**
* Builds a {@link NullShape}.
*
* @param options - Optional `description`
* @returns A null shape
*
* @example
* ```ts
* const empty = nullShape()
* ```
*/
function nullShape(options) {
	return contain(() => {
		const safe = readOptions(options, ["description"], "nullShape", "null");
		const shape = {
			category: "null",
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "nullShape");
}
function literalShape(values, options) {
	return contain(() => {
		const input = values;
		const array = attempt(() => INTRINSICS.array(input));
		if (!array.success || !array.value) throw new ContractError("literalShape: values must be an array", {
			code: "structure",
			context: {
				path: ["values"],
				shape: "literal"
			},
			...!array.success ? { cause: array.error } : {}
		});
		const safe = readOptions(options, ["description"], "literalShape", "literal");
		const snapshot = readArrayEntries(values);
		if (!snapshot.success) throw new ContractError("literalShape: values could not be copied", {
			code: "structure",
			context: {
				path: ["values"],
				shape: "literal"
			},
			cause: snapshot.error
		});
		if (!snapshot.value.dense) throw new ContractError("validateShape: values must be a dense data array", {
			code: "structure",
			context: {
				path: ["values"],
				shape: "literal"
			}
		});
		const literals = [];
		for (let index = 0; index < snapshot.value.entries.length; index += 1) {
			const value = snapshot.value.entries[index];
			if (!isLiteralValue(value)) throw new ContractError("validateShape: every literal value must be a string, number, or boolean", {
				code: "structure",
				context: {
					path: ["values", INTRINSICS.text(index)],
					shape: "literal"
				}
			});
			literals[literals.length] = value;
		}
		const shape = {
			category: "literal",
			values: INTRINSICS.freeze(literals),
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "literalShape");
}
/**
* Builds an {@link ArrayShape} from an element shape.
*
* @param items - The element shape
* @param options - Optional length bounds and `description`
* @returns An array shape
* @throws {ContractError} When a present bound is not a non-negative safe integer
*
* @example
* ```ts
* const tags = arrayShape(stringShape(), { max: 10 })
* ```
*/
function arrayShape(items, options) {
	return contain(() => {
		const safe = readOptions(options, [
			"min",
			"max",
			"description"
		], "arrayShape", "array");
		if (safe?.min !== void 0 && (!INTRINSICS.safe(safe.min) || safe.min < 0)) throw new ContractError("arrayShape: min must be a non-negative safe integer", {
			code: "bound",
			context: {
				shape: "array",
				limit: "non-negative safe integer",
				received: preview(safe.min)
			}
		});
		if (safe?.max !== void 0 && (!INTRINSICS.safe(safe.max) || safe.max < 0)) throw new ContractError("arrayShape: max must be a non-negative safe integer", {
			code: "bound",
			context: {
				shape: "array",
				limit: "non-negative safe integer",
				received: preview(safe.max)
			}
		});
		const shape = {
			category: "array",
			items,
			...safe?.min === void 0 ? {} : { min: safe.min },
			...safe?.max === void 0 ? {} : { max: safe.max },
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "arrayShape");
}
/**
* Builds an {@link ObjectShape} from a property map.
*
* @remarks
* Wrap any property in {@link optionalShape} to allow its absence. By default
* the compiled guard rejects unknown keys; pass `additionalProperties` to open
* the object.
*
* @param properties - Map of property names to child shapes
* @param options - Optional `additionalProperties` and `description`
* @returns An object shape
*
* @example
* ```ts
* const user = objectShape({
* 	name: stringShape({ min: 1 }),
* 	age: integerShape({ min: 0, max: 120 }),
* 	bio: optionalShape(stringShape()),
* })
* ```
*/
function objectShape(properties, options) {
	return contain(() => {
		const input = properties;
		if (!isObject(input)) throw new ContractError("objectShape: properties must be a plain record", {
			code: "structure",
			context: {
				path: ["properties"],
				shape: "object"
			}
		});
		const safe = readOptions(options, ["additionalProperties", "description"], "objectShape", "object");
		const copied = readValue(() => {
			const record = matchesRecordBrand(input);
			const snapshot = INTRINSICS.create(null);
			const keyList = INTRINSICS.keys(input);
			for (let keyIndex = 0; keyIndex < keyList.length; keyIndex += 1) {
				const key = keyList[keyIndex];
				if (key === void 0) continue;
				INTRINSICS.reflect.define(snapshot, key, {
					value: INTRINSICS.reflect.read(input, key),
					enumerable: true,
					configurable: true,
					writable: true
				});
			}
			return {
				record,
				snapshot: INTRINSICS.freeze(snapshot)
			};
		}, "objectShape", {
			subject: "properties",
			context: {
				path: ["properties"],
				shape: "object"
			}
		});
		if (!copied.record) throw new ContractError("objectShape: properties must be a plain record", {
			code: "structure",
			context: {
				path: ["properties"],
				shape: "object"
			}
		});
		const shape = {
			category: "object",
			properties: copied.snapshot,
			...safe?.additionalProperties === void 0 ? {} : { additionalProperties: safe.additionalProperties },
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "objectShape");
}
/**
* Builds an open {@link ObjectShape} with no fixed properties — a dictionary.
*
* @remarks
* Every value is validated against `values`; keys are unconstrained. Equivalent
* to `objectShape({}, { additionalProperties: values })`.
*
* @param values - The shape every value must match
* @param options - Optional `description`
* @returns An open object shape
* @throws {ContractError} When `values` is absent at runtime
*
* @example
* ```ts
* const bindings = recordShape(numberShape()) // ~ Record<string, number>
* ```
*/
function recordShape(values, options) {
	return contain(() => {
		const value = values;
		if (value === void 0 || value === null || value === true || value === false) throw new ContractError("recordShape: values must be a shape", {
			code: "structure",
			context: {
				path: ["additionalProperties"],
				shape: "object"
			}
		});
		const safe = readOptions(options, ["description"], "recordShape", "object");
		const shape = {
			category: "object",
			properties: INTRINSICS.freeze({}),
			additionalProperties: values,
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "recordShape");
}
/**
* Builds a {@link UnionShape} from a list of variant shapes (`anyOf` in JSON Schema).
*
* @param variants - The candidate shapes; the first match wins at runtime
* @returns A union shape whose `Infer` is the union of the variants
*
* @example
* ```ts
* const id = unionShape(stringShape(), integerShape())
* // Infer<typeof id> = string | number
* ```
*/
function unionShape(...variants) {
	return contain(() => {
		new ShapeValidator({
			category: "union",
			variants
		}).validate();
		return INTRINSICS.freeze({
			category: "union",
			variants: INTRINSICS.freeze(variants)
		});
	}, "unionShape");
}
/**
* Builds a {@link UnionShape} that emits `oneOf` (exactly one match) in JSON Schema.
*
* @remarks
* Unlike {@link unionShape} (`anyOf` — at least one variant matches),
* `oneOfShape`'s compiled guard and parser enforce EXACTLY one match:
*
* - **Guard**: accepts the value only when exactly one variant's guard
*   accepts it. A value matching two-or-more variants — which would violate
*   the emitted `oneOf` schema — is rejected, even though it would pass
*   {@link unionShape}'s guard.
* - **Parser**: judged on the RAW input's guard matches only, with NO
*   coercion fallback for an ambiguous input. When exactly one variant's
*   guard accepts the raw value, that variant's parser runs. Zero matches or
*   two-or-more matches both parse to `undefined` — a value ambiguous
*   between variants has no well-defined coercion target.
*
* Prefer {@link unionShape} when a value may legitimately satisfy more than
* one variant (for example overlapping shapes) and any match is acceptable. Prefer
* `oneOfShape` when overlap between variants indicates malformed input that
* must be rejected.
*
* @param variants - The candidate shapes
* @returns A union shape with `mode: 'oneOf'`
*
* @example
* ```ts
* const id = oneOfShape(numberShape(), integerShape())
* // 3   fails — matches both numberShape and integerShape
* // 3.5 passes — matches numberShape only
* ```
*/
function oneOfShape(...variants) {
	return contain(() => {
		const shape = {
			category: "union",
			variants,
			mode: "oneOf"
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze({
			...shape,
			variants: INTRINSICS.freeze(variants)
		});
	}, "oneOfShape");
}
/**
* Wraps a shape so it may be absent (`undefined`).
*
* @remarks
* As an {@link objectShape} property, the field becomes a true optional property
* in the inferred type.
*
* @param inner - The wrapped shape
* @returns An optional shape
*/
function optionalShape(inner) {
	return contain(() => {
		const shape = {
			category: "optional",
			inner
		};
		new ShapeValidator({
			category: "object",
			properties: { value: shape }
		}).validate();
		return INTRINSICS.freeze(shape);
	}, "optionalShape");
}
/**
* Wraps a shape so it may be `null`.
*
* @param inner - The wrapped shape
* @returns A nullable shape
*
* @example
* ```ts
* const bio = nullableShape(stringShape())
* // Infer<typeof bio> = string | null
* ```
*/
function nullableShape(inner) {
	return contain(() => {
		const shape = {
			category: "nullable",
			inner
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "nullableShape");
}
/**
* Builds a {@link JSONShape}.
*
* @remarks
* The sound counterpart of {@link rawShape}: `rawShape` embeds an arbitrary
* schema fragment and accepts every defined value at runtime, while `jsonShape`
* validates that a value is real JSON (through {@link isJSONValue}). Its emitted
* schema is the empty accept-anything `{}`, so here the schema claims MORE than
* the compiled guard accepts — `NaN`, a `Map`, and a class instance all satisfy
* `{}` and all fail `isJSONValue`.
*
* This is the shape an author writes to mean "any JSON value". Inference never produces
* it: {@link schemaToShape} widening always lands on {@link RawShape} instead.
*
* @param options - Optional `description`
* @returns A JSON passthrough shape
*
* @example
* ```ts
* const payload = jsonShape({ description: 'Arbitrary JSON payload' })
* ```
*/
function jsonShape(options) {
	return contain(() => {
		const safe = readOptions(options, ["description"], "jsonShape", "json");
		const shape = {
			category: "json",
			...safe?.description === void 0 ? {} : { description: safe.description }
		};
		new ShapeValidator(shape).validate();
		return INTRINSICS.freeze(shape);
	}, "jsonShape");
}
/**
* Builds a {@link RawShape} from a supported JSON Schema fragment.
*
* @remarks
* For values the shape DSL can't express. The fragment is recursively checked
* against the lean {@link JSONSchema} vocabulary before ownership is taken;
* malformed or unsupported keywords throw a coded {@link ContractError}. The
* compiled guard accepts every
* DEFINED value — `undefined` alone fails, because it is the parser's failure
* sentinel; wrap the shape in {@link optionalShape} to admit absence. The
* parser passes a defined value through unchanged, and the fragment is
* deep-cloned into an owned frozen snapshot ({@link cloneSchema}), so
* `rawShape(fragment).schema !== fragment` and later edits to the caller's
* fragment cannot reach the shape. `compileSchema` re-emits that snapshot
* structurally verbatim, so here the schema claims LESS than the compiled guard
* accepts — `rawShape({ type: 'string' })` emits `{ type: 'string' }` and its
* guard still accepts `42`, the mirror of {@link jsonShape}'s looseness.
* `compileGenerator` throws, since an arbitrary embedded schema has no
* auto-generatable sample.
*
* @param schema - The JSON Schema fragment to embed
* @returns A raw shape owning a frozen copy of the fragment
*
* @example
* ```ts
* const custom = rawShape({ type: 'string', format: 'uuid' })
* ```
*/
function rawShape(schema) {
	return contain(() => {
		new ShapeValidator({
			category: "raw",
			schema
		}).validate();
		const owned = cloneSchema(schema);
		new ShapeValidator({
			category: "raw",
			schema: owned
		}).validate();
		return INTRINSICS.freeze({
			category: "raw",
			schema: owned
		});
	}, "rawShape");
}
/**
* Converts a runtime `JSONSchema` value into a validating {@link ContractShape}
* — the inverse of {@link compileSchema}. Unlike direct {@link rawShape}
* construction, which rejects malformed supported-vocabulary keywords, this
* conversion is total and widens an inexpressible input to a valid raw `{}`.
*
* @remarks
* Readable malformed, cyclic, or deeply nested schema nodes widen to
* {@link rawShape}; a failed traversal raises the shared coded refusal because
* an unreadable value is not a schema. `createContract(schemaToShape(x))`
* therefore remains safe for every readable `x`. The per-keyword precedence is
* `enum`, then `oneOf`, then `anyOf`, then `type`, then a record-valued
* `properties`, then the accept-anything widening.
*
* `format` and `pattern` are NEVER asserted by the compiled shape — `format`
* is annotation-only (per the JSON Schema spec, it never narrows validation
* on its own) and compiling an attacker-controlled `pattern` string into a
* `RegExp` is a ReDoS vector; both keywords are read only far enough to be
* ignored. Any node the walk cannot express — an empty `{}`, an
* unrecognized `type`, a schema past {@link INFER_DEPTH_LIMIT} deep, or a
* cyclic re-encounter — widens to {@link rawShape} (accept any defined
* value), never narrows.
*
* ROUND TRIP: for every readable `v`,
* `compileGuard(schemaToShape(valueToSchema(v)))(v)` is `true` — including
* values no JSON Schema keyword describes (`NaN`, `±Infinity`, a `Map`, a
* `Set`, a class instance, a function, a symbol, a bigint, and readable cyclic
* hosts), which infer `{}` and widen back to an accept-anything
* {@link rawShape}. An unreadable host is refused by {@link valueToSchema}
* before this law produces a schema; direct hostile input to
* {@link schemaToShape} receives the same coded refusal.
* Widening is the only source of looseness. The law has three explicit host
* limits:
*
* - **Absence.** `undefined` is not a value: no compiled guard accepts it
*   (`rawShape` reserves it as the parser failure sentinel). So `undefined`
*   itself, an array element holding it, and an array HOLE (`arrayOf` requires
*   every index to be an own property, the same rule `isJSONValue` applies)
*   all fall outside the law. An OBJECT property holding `undefined` does not:
*   `valueToSchema` drops the key and opens the object, so the source object
*   is still accepted.
* - **`Date` serialization.** A `Date` infers the schema of its JSON form
*   (`{ type: 'string' }`, plus `format: 'date-time'` when `format` is on), so
*   the law applies to `date.toISOString()` rather than the runtime instance.
* - **Stateful access.** A getter whose result changes between inference and
*   guard evaluation can invalidate the sampled fact. Likewise, an array that
*   overrides iteration behavior can present different elements to the two
*   phases. The law applies only while the sampled host's observable own
*   enumerable string properties and array iteration remain stable.
*
* A widened node cannot be auto-generated: `rawShape` embeds an arbitrary
* schema fragment, so `createContract(schemaToShape(x)).generate()` throws
* when the conversion widened anywhere — `schema` / `is` / `parse` / `explain`
* stay total.
*
* @param schema - The JSON Schema value to convert
* @returns The built {@link ContractShape}
* @throws {ContractError} When schema traversal fails
*
* @example
* ```ts
* const schema = samplesToSchema([{ id: 1, name: 'Ada' }, { id: 2, name: 'Grace' }])
* const contract = createContract(schemaToShape(schema))
* contract.parse({ id: 3, name: 'Alan' }) // { id: 3, name: 'Alan' }
* contract.parse({ id: 'nope' })          // undefined
* ```
*/
function schemaToShape(schema) {
	return contain(() => {
		return readValue(() => new SchemaShaper(schema).shape(), "schemaToShape", {
			subject: "schema",
			context: { shape: "schema" }
		});
	}, "schemaToShape");
}
//#endregion
export { CLONE_NODE_LIMIT, COMPILE_DEPTH_LIMIT, COMPILE_NODE_LIMIT, CONTRACT_CODES, CONTRACT_ERROR_BRAND, ContractCompiler, ContractError, FAULT_LIMIT, FORMAT_MAX_LENGTH, FORMAT_PATTERNS, GENERATION_ATTEMPT_LIMIT, GUARD_DEPTH_LIMIT, INFER_BREADTH_LIMIT, INFER_DEPTH_LIMIT, INFER_ENUM_LIMIT, INTRINSICS, JSONCloner, JSON_SCHEMA_TYPES, PRESENCE_MASK_LIMIT, PREVIEW_LIMIT, SchemaCloner, ShapeCloner, ShapeValidator, admitMember, admitVisited, andOf, appendEntries, arrayOf, arrayShape, attempt, booleanShape, boundsOf, buildArrayFaults, buildNumberFaults, buildSampleMemo, buildStringFaults, canonicalStringify, classifyFormat, cloneJSONRecord, cloneJSONValue, cloneSchema, cloneShape, collectEntries, collectMembers, compareValues, compileAuditor, compileGenerator, compileGuard, compileParser, compileReporter, compileSchema, complementOf, contain, createContract, deriveLengthBounds, deriveRangeBounds, drawRandom, encodeLeaf, enumOf, enumerableKeys, enumerableSymbolCount, holds, inferPrimitiveEnum, instanceOf, integerShape, intersectionOf, isArray, isArrayBuffer, isArrayBufferView, isAsyncFunction, isAsyncGeneratorFunction, isAsyncIterable, isBigInt, isBigInt64Array, isBigUint64Array, isBoolean, isBoundedJSONRecord, isBoundedJSONValue, isConstructor, isContractError, isDataView, isDate, isDefined, isEmptyArray, isEmptyMap, isEmptyObject, isEmptySet, isEmptyString, isError, isFalse, isFiniteNumber, isFloat32Array, isFloat64Array, isFunction, isGeneratorFunction, isInstance, isInt16Array, isInt32Array, isInt8Array, isInteger, isIterable, isJSONPrimitive, isJSONValue, isLiteralValue, isMap, isNonEmptyArray, isNonEmptyMap, isNonEmptyObject, isNonEmptySet, isNonEmptyString, isNonNegativeInteger, isNonNegativeNumber, isNull, isNullableBoolean, isNullableNumber, isNullableString, isNumber, isObject, isPromise, isPromiseLike, isRecord, isRegExp, isSet, isSharedArrayBuffer, isString, isSymbol, isTrue, isUint16Array, isUint32Array, isUint8Array, isUint8ClampedArray, isUndefined, isWeakMap, isWeakSet, isZeroArg, isZeroArgAsync, isZeroArgAsyncGenerator, isZeroArgGenerator, jsonShape, keyOf, lazyOf, limitEntries, literalOf, literalShape, mapOf, matchOf, matchesISOInstant, matchesJSONDepth, matchesJSONValue, matchesMember, matchesPattern, matchesRecordBrand, matchesVisited, notOf, nullShape, nullableOf, nullableShape, numberShape, objectOf, objectShape, omitOf, omitVisited, oneOfShape, optionalOf, optionalShape, orOf, ownPattern, ownShape, parseArray, parseArrayField, parseBoolean, parseBooleanField, parseEnum, parseEnumField, parseInteger, parseIntegerField, parseJSON, parseJSONAs, parseJSONValue, parseJSONValueField, parseNull, parseNullField, parseNumber, parseNumberField, parseRecord, parseRecordField, parseString, parseStringField, pathOf, pickOf, pinMembers, preview, rawShape, readArrayEntries, readGuardShape, readMapEntries, readOptions, readPattern, readPatternFlags, readPatternSource, readSampleMemo, readSetEntries, readValue, recordOf, recordShape, refuseExpansion, resolveField, retainDepth, samplesToFormat, samplesToSchema, sanitizeBudget, sanitizeDepth, schemaToObject, schemaToParameters, schemaToShape, seededRandom, selectClosestFaults, setOf, shapeToKind, sortValues, stringOf, stringShape, stringToFormat, transformOf, tupleOf, unifySchemas, unionOf, unionShape, validateShape, valueToSchema, whereOf };
