import { ContractError, holds, isArray, isFunction, isRecord, isString, preview, readValue } from "./@orkestrel_contract.js";
import { Emitter } from "./@orkestrel_emitter.js";
//#region node_modules/@orkestrel/router/dist/src/core/index.js
/**
* Lists the HTTP methods a {@link import('./types.js').DispatcherInterface} registers
* routes under, in canonical order — a frozen literal tuple, and the single source the
* {@link import('./types.js').Method} type, {@link METHODS}, and `parseMethod` are all
* derived from.
*
* @remarks
* A frozen tuple of the verbs: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`,
* `HEAD`, `OPTIONS`. Adding a verb here widens the `Method` type, the
* {@link METHODS} membership set, and the `parseMethod` narrowing together, so
* the method set cannot drift between them. Prefer {@link METHODS} for a
* membership test; use this tuple where order or literal typing matters.
*
* @example
* ```ts
* METHOD_LIST[0] // 'GET'
* METHOD_LIST.includes('GET') // true
* ```
*/
var METHOD_LIST = Object.freeze([
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS"
]);
Object.freeze(new Set(METHOD_LIST));
/**
* Escapes every regex metacharacter in a literal string so it can be embedded
* inside a larger `RegExp` source without being interpreted as syntax.
*
* @remarks
* {@link compilePath} escapes the literal segments of a route pattern with this
* before splicing in `:name` / `*name` capture groups, so a path like
* `/files/:name.json` matches the `.` literally rather than as "any character".
* Pure and total — never throws.
*
* @param value - The literal string to escape
* @returns `value` with every regex metacharacter backslash-escaped
*
* @example
* ```ts
* escapeRegExp('a.b+c') // 'a\\.b\\+c'
* new RegExp(`^${escapeRegExp('a.b')}$`).test('a.b') // true
* new RegExp(`^${escapeRegExp('a.b')}$`).test('axb') // false
* ```
*/
function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
* Canonicalizes a route path for registry identity — strips a single trailing
* slash, except the root `/` (and the empty pattern). The trailing-slash fold
* {@link compilePath} normalizes a pattern through, so identity agrees with the
* matcher.
*
* @remarks
* Mirrors {@link compilePath}'s trailing-slash folding: `/users/` canonicalizes
* to `/users` (the two compile to the same regex and match the same
* pathnames), while the root `/` and the empty `''` are EXEMPT (a bare `/`
* already matches `/`; stripping it would break that). Pure and total — a path
* without a trailing slash returns unchanged.
*
* @param path - The route path pattern
* @returns The canonical path (one trailing slash removed, except `/` and `''`)
*
* @example
* ```ts
* canonicalizePath('/users/') // '/users'
* canonicalizePath('/users') // '/users'
* canonicalizePath('/') // '/'
* canonicalizePath('') // ''
* ```
*/
function canonicalizePath(path) {
	return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}
/**
* Compiles a route path pattern into an anchored regex and its ordered param
* names.
*
* @remarks
* Splits the CANONICALIZED path into segments. Each `:name` segment becomes a
* `([^/]+)` capture group; the FINAL segment may instead be `*name`, which
* becomes a `(.+)` capture spanning the REST of the path including slashes — a
* wildcard segment anywhere but last is a registration-time programmer error
* and throws a `ContractError` at the construction/registration boundary. Every regex
* metacharacter in a literal segment is escaped first ({@link escapeRegExp}),
* so a path like `/files/:name.json` matches the `.` literally apart from the
* param. The regex is anchored (`^…$`), so it matches the whole pathname, not
* a prefix.
*
* **Trailing slash is INSENSITIVE** (Express's `strict: false` default): a
* single trailing slash on the request path is OPTIONAL, so `/users` matches
* both `/users` and `/users/`, and `/users/:id` matches both `/users/me` and
* `/users/me/`. This is NOT prefix matching — a deeper path is still a
* distinct segment, so `/api` does not match `/api/users`. The ROOT `/` (and
* the empty pattern `''`) are EXEMPT — they are not stripped, so `/` stays
* `^/$` and `''` stays `^$`.
*
* `sensitive` (default `true`) controls case folding: `false` adds the `i`
* regex flag, so `/Users` matches `/users`. The pattern's own casing is never
* altered — only the matching behavior.
*
* @param path - The route path pattern (for example `/users/:id`, `/files/*rest`)
* @param sensitive - If `true`, matching is case-sensitive; if `false`, case is
*   folded during matching. Default: `true`
* @returns The {@link CompiledPath} — its `regex` + ordered `params`
* @throws {@link import('@orkestrel/contract').ContractError} Thrown when a
*   `*name` wildcard segment is not the FINAL segment
*
* @example
* ```ts
* const { regex, params } = compilePath('/users/:id/posts/:slug')
* params // ['id', 'slug']
* regex.exec('/users/7/posts/hello') // ['…', '7', 'hello']
* regex.test('/users/7/posts/hello/') // true — the trailing slash is optional
*
* compilePath('/files/*rest').regex.test('/files/a/b.png') // true
* compilePath('/Users', false).regex.test('/users') // true — case-insensitive
* ```
*/
function compilePath(path, sensitive = true) {
	const params = [];
	const normalized = canonicalizePath(path);
	const segments = normalized.split("/");
	const pattern = segments.map((segment, index) => {
		const isFinal = index === segments.length - 1;
		if (!isFinal && /^\*[A-Za-z_]\w*/.test(segment)) throw new ContractError("a wildcard segment must be the final segment of a path pattern", {
			code: "placement",
			context: {
				path: ["path"],
				limit: `a wildcard only in the final segment, not "${segment}"`,
				received: preview(path)
			}
		});
		const tier = classifySegment(segment, isFinal);
		if (tier === 0) {
			params.push(segment.slice(1));
			return "(.+)";
		}
		if (tier === 1) {
			const name = /^:([A-Za-z_]\w*)/.exec(segment)?.[1] ?? "";
			params.push(name);
			return `([^/]+)${escapeRegExp(segment.slice(1 + name.length))}`;
		}
		return escapeRegExp(segment);
	}).join("/");
	const suffix = normalized === "/" || normalized === "" ? "" : "/?";
	const flags = sensitive ? "" : "i";
	return {
		regex: new RegExp(`^${pattern}${suffix}$`, flags),
		params
	};
}
/**
* Decodes one captured param value from a URL, tolerating a malformed percent-escape —
* the decode {@link matchPath} applies to each captured group.
*
* @remarks
* A bad `%` sequence is not a reason to reject an otherwise-matching route, so
* a `decodeURIComponent` that would throw falls back to the raw value
* (mirroring the cookie / token boundary readers). Total — never
* throws.
*
* @param value - The raw captured param value
* @returns The URL-decoded value, or the raw value when decoding would throw
*
* @example
* ```ts
* decodeParam('a%2Fb') // 'a/b'
* decodeParam('100%25') // '100%'
* decodeParam('%') // '%' — malformed escape stays literal
* ```
*/
function decodeParam(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
/**
* Extracts the URL-decoded params a compiled path captures from a concrete
* pathname, or `undefined` when the pathname does not match.
*
* @remarks
* Runs the {@link CompiledPath} `regex` against `pathname` (a single `exec`); a
* miss returns `undefined`. On a hit it walks `params` POSITIONALLY — the
* `n`-th param name pairs with the `n`-th capture group — and URL-decodes each
* value with {@link decodeParam}. Returns a frozen `name → value` record (empty
* for a parameterless path). Total — never throws.
*
* @param compiled - The {@link CompiledPath} from {@link compilePath}
* @param pathname - The concrete request pathname to match (for example `/users/7`)
* @returns The decoded params on a hit, or `undefined` on a miss
*
* @example
* ```ts
* const compiled = compilePath('/users/:id')
* matchPath(compiled, '/users/7') // { id: '7' }
* matchPath(compiled, '/users/a%2Fb') // { id: 'a/b' } — decoded
* matchPath(compiled, '/posts/7') // undefined
* ```
*/
function matchPath(compiled, pathname) {
	const result = compiled.regex.exec(pathname);
	if (result === null) return void 0;
	const params = {};
	for (let index = 0; index < compiled.params.length; index += 1) {
		const name = compiled.params[index];
		const value = result[index + 1];
		if (name !== void 0 && value !== void 0) params[name] = decodeParam(value);
	}
	return Object.freeze(params);
}
/**
* Classifies one path segment into its specificity tier — the same syntax
* {@link compilePath} rewrites: a syntactically valid `:name` head is a param
* segment, a final `*name` is a wildcard segment, and everything else (including a
* literal segment that merely contains a `:` mid-string, for example `a:b`) is a
* literal segment.
*
* @remarks
* This is the fix over the old engine's bug: the old classifier ranked any
* segment `includes(':')` as a param, so a literal segment like `a:b` was
* mis-tiered even though {@link compilePath} compiles it literally. Sharing one
* segment parser between compilation and classification keeps the two in
* agreement. Pure and total.
*
* @param segment - One `/`-split path segment
* @param isFinal - If `true`, `segment` is the path's last segment and may
*   classify as a wildcard; if `false`, a wildcard-shaped segment classifies as
*   a literal
* @returns The segment's specificity tier — {@link import('./constants.js').TIER_LITERAL},
*   {@link import('./constants.js').TIER_PARAM}, or
*   {@link import('./constants.js').TIER_WILDCARD}
*
* @example
* ```ts
* classifySegment(':id', true) // 1 — TIER_PARAM
* classifySegment('*rest', true) // 0 — TIER_WILDCARD
* classifySegment('a:b', true) // 2 — TIER_LITERAL — the old bug's regression case
* classifySegment('users', false) // 2 — TIER_LITERAL
* ```
*/
function classifySegment(segment, isFinal) {
	if (isFinal && /^\*[A-Za-z_]\w*$/.test(segment)) return 0;
	if (/^:[A-Za-z_]\w*/.test(segment)) return 1;
	return 2;
}
/**
* Computes a route path's specificity vector — the per-segment type ranking
* that breaks a tie when several registered routes match the same concrete
* pathname.
*
* @remarks
* Splits the CANONICALIZED path into segments (on `/`) and maps each to its
* specificity tier through {@link classifySegment} — the same segment parser
* {@link compilePath} uses, so a literal segment that merely contains a `:`
* (for example `a:b`) is correctly tiered as literal rather than param (the old
* engine's bug, fixed here). The standard route-precedence rule compares two
* matching routes' vectors LEFT-TO-RIGHT: at the first index where the tiers
* differ, the HIGHER tier (a literal over a param over a wildcard) is MORE
* SPECIFIC and wins — so `/users/me` (`[2, 2]`) beats `/users/:id` (`[2, 1]`)
* beats `/users/*rest` (`[2, 0]`) regardless of registration order. Two routes
* that match the SAME concrete pathname necessarily have the same segment
* count in the common case; {@link compareSpecificity} handles the general
* case for totality.
*
* @param path - The route path pattern (for example `/users/:id`)
* @returns The per-segment specificity tiers, in order
*
* @example
* ```ts
* computeSpecificity('/users/me') // [2, 2]
* computeSpecificity('/users/:id') // [2, 1]
* computeSpecificity('/files/*rest') // [2, 0]
* computeSpecificity('/a:b') // [2] — literal, not param — the classification fix
* ```
*/
function computeSpecificity(path) {
	const segments = canonicalizePath(path).split("/");
	return segments.map((segment, index) => classifySegment(segment, index === segments.length - 1));
}
/**
* Compares two route paths by specificity — the comparator that picks the
* most-specific matching route (literal-over-param-over-wildcard,
* registration-order-independent).
*
* @remarks
* Compares the two paths' {@link computeSpecificity} vectors LEFT-TO-RIGHT and
* returns a standard `Array.sort` ordering: a NEGATIVE number when `a` is MORE
* specific than `b` (so a descending-specificity sort puts `a` first),
* positive when `b` is more specific, `0` when neither out-ranks the other
* across the compared segments. At the first index where the tiers differ,
* the higher tier wins; if one vector is a prefix of the other (different
* segment counts), the LONGER, more-segmented path is treated as more
* specific (a missing segment ranks below any real one).
*
* @param a - The first route path
* @param b - The second route path
* @returns A negative number when `a` is more specific, positive when `b` is, else `0`
*
* @example
* ```ts
* compareSpecificity('/users/me', '/users/:id') // negative — literal wins
* compareSpecificity('/users/:id', '/users/*rest') // negative — param beats wildcard
* compareSpecificity('/users/:id', '/users/:id') // 0 — equal specificity
* ```
*/
function compareSpecificity(a, b) {
	const left = computeSpecificity(a);
	const right = computeSpecificity(b);
	const length = Math.max(left.length, right.length);
	for (let index = 0; index < length; index += 1) {
		const tierA = left[index] ?? -1;
		const tierB = right[index] ?? -1;
		if (tierA !== tierB) return tierB - tierA;
	}
	return 0;
}
/**
* Joins a group prefix and a route path into one `/`-prefixed path, normalizing
* duplicate or missing joining slashes.
*
* @remarks
* {@link import('./types.js').GroupInterface} / {@link import('./types.js').DispatchGroupInterface}
* compose a prefix with each registered entry's path this way — pure string
* composition, no independent state. Both a duplicated slash
* (`'/api/'` + `'/users'`) and a missing one (`'/api'` + `'users'`) normalize
* to a single joining slash. An empty `prefix` returns `path` unchanged (after
* ensuring a leading slash); an empty `path` returns `prefix` unchanged.
* Pure and total.
*
* @param prefix - The group prefix (for example `/api`)
* @param path - The route path being joined under the prefix (for example `/users`)
* @returns The joined `/`-prefixed path
*
* @example
* ```ts
* joinPaths('/api', '/users') // '/api/users'
* joinPaths('/api/', '/users') // '/api/users'
* joinPaths('/api', 'users') // '/api/users'
* joinPaths('', '/users') // '/users'
* joinPaths('/api', '') // '/api'
* ```
*/
function joinPaths(prefix, path) {
	if (prefix === "") return path.startsWith("/") ? path : `/${path}`;
	if (path === "") return prefix;
	return `${prefix.endsWith("/") ? prefix.slice(0, -1) : prefix}${path.startsWith("/") ? path : `/${path}`}`;
}
/**
* Represents a prefix-scoped registration handle over a {@link import('./Router.js').Router} —
* pure string composition, no independent state or storage.
*
* @typeParam Meta - The entry payload type, matching the owning router
*
* @remarks
* Every `add` composes `entry.path` as `joinPaths(prefix, entry.path)` and
* forwards to the OWNING router, so grouped routes land in the SAME registry.
* `group(prefix)` nests, composing prefixes through {@link joinPaths}.
*
* @example
* ```ts
* import { Router } from '@src/core'
*
* const router = new Router<{ readonly page: string }>()
* const api = router.group('/api')
* api.add({ path: '/users', meta: { page: 'list' } })
* router.match('/api/users')?.path // '/api/users'
* ```
*/
var Group = class Group {
	prefix;
	#parent;
	constructor(parent, prefix) {
		this.#parent = parent;
		this.prefix = prefix;
	}
	add(input) {
		const inputs = isArray(input) ? input : [input];
		this.#parent.add(inputs.map((entry) => ({
			...entry,
			path: joinPaths(this.prefix, entry.path)
		})));
	}
	group(prefix) {
		return new Group(this.#parent, joinPaths(this.prefix, prefix));
	}
};
/**
* Represents the path-matching + registry engine — registers `{ path, meta, name? }`
* entries (compiling each path once) and resolves a concrete pathname to the most
* specific matching entry. The shared machine both the `Navigator` (browser) and
* the `Dispatcher` (core, method-dimensioned) compose.
*
* @typeParam Meta - The opaque payload each entry carries and a match returns
*
* @remarks
* - **Registration boundary guard.** `add` validates each entry's
*   `path` — `isString` plus a leading `/` — and throws a `ContractError` on a
*   malformed registration; `match` stays guard-free (the hot path).
* - **Compile-once.** Each path is compiled exactly once at registration into
*   a parallel `#compiled` array, so `match` runs only a cached `exec` per
*   candidate.
* - **Dedup through `key`.** When `options.key` is set, an entry whose computed
*   key already exists REPLACES the prior one IN PLACE (both the `#entries`
*   and `#compiled` arrays, at the existing index) — last write wins, no
*   engine rebuild. Omitted ⇒ every entry is kept, even duplicate paths.
* - **Groups.** `group(prefix)` returns a {@link GroupInterface} that composes
*   `prefix` onto every entry it registers, nesting through {@link joinPaths}.
*
* @example
* ```ts
* const router = new Router<{ readonly page: string }>()
* router.add({ path: '/users/:id', meta: { page: 'profile' } })
* router.match('/users/7') // { path: '/users/:id', params: { id: '7' }, meta: { page: 'profile' } }
* ```
*/
var Router = class {
	#entries = [];
	#compiled = [];
	#sensitive;
	#key;
	#index = /* @__PURE__ */ new Map();
	constructor(options) {
		this.#sensitive = options?.sensitive ?? true;
		this.#key = options?.key;
		if (options?.entries !== void 0) this.add(options.entries);
	}
	get count() {
		return this.#entries.length;
	}
	add(input) {
		const inputs = isArray(input) ? input : [input];
		for (const entry of inputs) this.#register(entry);
	}
	match(pathname, answers) {
		let best;
		for (let index = 0; index < this.#entries.length; index += 1) {
			const entry = this.#entries[index];
			const compiled = this.#compiled[index];
			if (entry === void 0 || compiled === void 0) continue;
			if (answers !== void 0 && !answers(entry.meta)) continue;
			const params = matchPath(compiled, pathname);
			if (params === void 0) continue;
			if (best === void 0 || compareSpecificity(entry.path, best.entry.path) < 0) best = {
				entry,
				params
			};
		}
		if (best === void 0) return void 0;
		return {
			path: best.entry.path,
			params: best.params,
			meta: best.entry.meta,
			...best.entry.name === void 0 ? {} : { name: best.entry.name }
		};
	}
	entries(pathname) {
		if (pathname === void 0) return [...this.#entries];
		const out = [];
		for (let index = 0; index < this.#entries.length; index += 1) {
			const entry = this.#entries[index];
			const compiled = this.#compiled[index];
			if (entry === void 0 || compiled === void 0) continue;
			if (matchPath(compiled, pathname) !== void 0) out.push(entry);
		}
		return out;
	}
	group(prefix) {
		return new Group(this, prefix);
	}
	clear() {
		this.#entries.length = 0;
		this.#compiled.length = 0;
		this.#index.clear();
	}
	#register(entry) {
		if (!isString(entry.path)) throw new ContractError("a route path must be a string", {
			code: "literal",
			context: {
				path: ["entry", "path"],
				limit: "string",
				received: preview(entry.path)
			}
		});
		if (!entry.path.startsWith("/")) throw new ContractError("a route path must start with \"/\"", {
			code: "pattern",
			context: {
				path: ["entry", "path"],
				limit: "a \"/\"-prefixed path pattern",
				received: preview(entry.path)
			}
		});
		const compiled = compilePath(entry.path, this.#sensitive);
		if (this.#key === void 0) {
			this.#entries.push(entry);
			this.#compiled.push(compiled);
			return;
		}
		const key = this.#key(entry);
		const existing = this.#index.get(key);
		if (existing !== void 0) {
			this.#entries[existing] = entry;
			this.#compiled[existing] = compiled;
			return;
		}
		this.#index.set(key, this.#entries.length);
		this.#entries.push(entry);
		this.#compiled.push(compiled);
	}
};
/**
* Creates a {@link RouterInterface} — the pure path-matching + registry engine
* shared by the browser `Navigator` and the core `Dispatcher`.
*
* @remarks
* Prefer this over `new Router(...)` at call sites that only need the
* interface; an entity that OWNS a `Router` internally (like `Dispatcher`)
* still constructs `new Router(...)` directly.
*
* @typeParam Meta - The opaque payload each entry carries and a match returns
* @param options - Optional initial `entries`, the `sensitive` case toggle
*   (default `true`), and a `key` dedup identity function
* @returns A {@link RouterInterface}
*
* @example Register and match
* ```ts
* import { createDispatcher, createRouter } from '@orkestrel/router'
*
* const router = createRouter<{ readonly page: string }>()
* router.add({ path: '/users/:id', meta: { page: 'profile' } })
* router.match('/users/7') // { path: '/users/:id', params: { id: '7' }, meta: { page: 'profile' } }
*
* const dispatcher = createDispatcher<{ readonly userId: string }>({
* 	routes: [
* 		{
* 			method: 'GET',
* 			path: '/users/:id',
* 			handler: (_request, context) => Response.json(context.params),
* 		},
* 	],
* })
* const response = await dispatcher.handle(new Request('http://x/users/7'), { userId: 'me' })
* ```
*/
function createRouter(options) {
	return new Router(options);
}
//#endregion
//#region node_modules/@orkestrel/abort/dist/src/core/index.js
/**
* Determines whether a value is a native `AbortSignal`, staying total for structural spoofs
* and for hostile or revoked proxies.
*
* @remarks
* The platform `AbortSignal.prototype.aborted` getter performs the native brand
* check, and `Reflect.apply` calls it inside a contained boundary.
*
* @param value - The value to inspect.
* @returns True if the platform getter accepts `value` as an
*   `AbortSignal`; false otherwise.
*
* @example
* ```ts
* import { isAbortSignal } from '@orkestrel/abort'
*
* isAbortSignal(new AbortController().signal) // true
* isAbortSignal({ aborted: false }) // false
* ```
*/
function isAbortSignal(value) {
	return holds(() => {
		const getter = Object.getOwnPropertyDescriptor(AbortSignal.prototype, "aborted")?.get;
		if (!isFunction(getter)) return false;
		Reflect.apply(getter, value, []);
		return true;
	});
}
/**
* Validates once-read abort construction options and returns a fresh normalized copy
* omitting absent optional keys.
*
* @remarks
* Omitted options normalize to a fresh empty object. Otherwise each property is
* read exactly once before validation. No controller or signal composition begins
* at this boundary.
*
* @param options - Potentially untrusted abort options
* @returns A fresh validated `AbortOptions` object
* @throws {@link import('@orkestrel/contract').ContractError} When the input
*   does not satisfy `AbortOptions`
*
* @example
* ```ts
* const options = validateAbortOptions({ id: 'request' })
* ```
*/
function validateAbortOptions(options) {
	if (options === void 0) return {};
	if (!isRecord(options)) throw new ContractError("Abort: options must be a plain record when defined", {
		code: "bound",
		context: {
			path: ["options"],
			limit: "plain record or undefined",
			received: preview(options)
		}
	});
	const input = options;
	const { id, signal } = readValue(() => ({
		id: input.id,
		signal: input.signal
	}), "Abort", {
		subject: "options",
		code: "bound",
		context: {
			path: ["options"],
			limit: "readable plain record",
			received: preview(options)
		}
	});
	if (id !== void 0 && !isString(id)) throw new ContractError("Abort: id must be a string when defined", {
		code: "literal",
		context: {
			path: ["options", "id"],
			limit: "string or undefined",
			received: preview(id)
		}
	});
	if (signal !== void 0 && !isAbortSignal(signal)) throw new ContractError("Abort: signal must be a native AbortSignal when defined", {
		code: "placement",
		context: {
			path: ["options", "signal"],
			limit: "native AbortSignal or undefined",
			received: preview(signal)
		}
	});
	if (id !== void 0 && signal !== void 0) return {
		id,
		signal
	};
	if (id !== void 0) return { id };
	if (signal !== void 0) return { signal };
	return {};
}
/**
* Links an own `AbortSignal` to an optional parent signal, returning
* `AbortSignal.any([own, parent])` when a parent is given.
*
* @remarks
* When `parent` is `undefined`, the own signal is returned unchanged. The combined
* signal fires on EITHER the own signal aborting or the parent aborting — without
* re-implementing listener wiring. A parent that has ALREADY aborted makes the
* combined signal born aborted (carrying the parent's reason).
*
* @param own - The instance's own signal.
* @param parent - An optional parent signal to link against.
* @returns `own` unchanged when `parent` is `undefined`, otherwise
*   `AbortSignal.any([own, parent])`.
* @throws {@link import('@orkestrel/contract').ContractError} When `own` or a
*   defined `parent` is not a native `AbortSignal`.
*
* @example
* ```ts
* import { linkSignal } from '@orkestrel/abort'
*
* const controller = new AbortController()
* const linked = linkSignal(controller.signal, undefined) // controller.signal
* ```
*/
function linkSignal(own, parent) {
	if (!isAbortSignal(own)) throw new ContractError("linkSignal own value must be an AbortSignal", {
		code: "placement",
		context: {
			path: ["own"],
			limit: "native AbortSignal",
			received: preview(own)
		}
	});
	if (parent !== void 0 && !isAbortSignal(parent)) throw new ContractError("linkSignal parent value must be an AbortSignal", {
		code: "placement",
		context: {
			path: ["parent"],
			limit: "native AbortSignal or undefined",
			received: preview(parent)
		}
	});
	return parent === void 0 ? own : AbortSignal.any([own, parent]);
}
/**
* Implements {@link AbortInterface} over a private `AbortController` the instance owns,
* resolving the trace `id` at construction and exposing either that controller's own
* `signal` or one linked to a parent.
*
* @remarks
* - **Own controller.** The instance owns a private `AbortController`; `abort`
*   aborts it, and `aborted` reads the exposed signal. `abort(reason)` keeps any
*   DEFINED reason verbatim (including a falsy `null` / `0` / `''` / `false`);
*   `abort()` / `abort(undefined)` defaults `signal.reason` to an `AbortError`
*   `DOMException`. Aborting is idempotent — the first reason sticks.
* - **Parent linking.** When `options.signal` is given, the exposed `signal` is
*   `AbortSignal.any([own, parent])`, so it fires on EITHER the own `abort()` or
*   the parent aborting — without re-implementing listener wiring. A parent that
*   has ALREADY aborted makes the handle born aborted (carrying the parent's reason).
* - **Traceable.** Each handle carries an `id` (caller-supplied or a random UUID)
*   for correlating cancellations across the system.
* - **Native observation.** The standard `AbortSignal` is the complete
*   interoperable observation surface.
*
* @example
* ```ts
* const abort = new Abort()
* abort.signal.addEventListener('abort', () => stop(), { once: true })
* abort.abort('cancelled') // flips `aborted`, fires `signal` with the reason
* ```
*/
var Abort = class {
	#controller;
	id;
	signal;
	/**
	* Creates a cancellation handle.
	*
	* @param options - Optional trace id and native parent signal.
	* @throws {@link import('@orkestrel/contract').ContractError} When provided options are not a plain record, a
	*   defined `id` is not a string, or a defined `signal` is not a native
	*   `AbortSignal`.
	*/
	constructor(options) {
		const input = validateAbortOptions(options);
		this.#controller = new AbortController();
		this.id = input.id ?? crypto.randomUUID();
		this.signal = linkSignal(this.#controller.signal, input.signal);
	}
	get aborted() {
		return this.signal.aborted;
	}
	abort(reason) {
		this.#controller.abort(reason);
	}
};
/**
* Creates a cancellation handle from validated options and returns it as an
* {@link AbortInterface} — a resolved trace `id` and a `signal` already linked to any
* parent given, so a caller holds the published contract rather than the `Abort` class.
*
* @remarks
* The created handle's `signal` fires when its own `abort()` is called; when
* `options.signal` is given, it ALSO fires when that parent signal aborts (linked
* through `AbortSignal.any`). Pass `options.id` to label the handle for tracing.
* Default: a random UUID for `id`, and no parent link when `signal` is omitted.
*
* @param options - Optional trace id and native parent signal
* @returns A working {@link AbortInterface}
* @throws {@link import('@orkestrel/contract').ContractError} When provided
*   options are not a plain record, a defined `id` is not a string, or a
*   defined `signal` is not a native `AbortSignal`.
*
* @example Create and abort
* ```ts
* import { createAbort } from '@orkestrel/abort'
*
* const abort = createAbort()
* const stream = openStream({ signal: abort.signal })
* // later, to cancel:
* abort.abort('user navigated away') // signal.reason carries the value
* ```
*
* @example
* ```ts
* // Link to a parent so a parent cancellation also aborts the child.
* const parent = createAbort()
* const child = createAbort({ signal: parent.signal })
* parent.abort() // child.aborted is now true
* ```
*/
function createAbort(options) {
	return new Abort(options);
}
//#endregion
//#region node_modules/@orkestrel/router/dist/src/browser/index.js
/**
* Computes the canonical path key a `Navigator` registers a browser navigation
* route under.
*
* @remarks
* Projects the route's path through the core engine's canonical trailing-slash
* identity, so `/users` and `/users/` replace one another in the Navigator's
* shared Router. The entry's `meta` payload is never read, so any payload type
* is accepted.
*
* @param entry - The Router entry carrying the Navigator route
* @returns The route's canonical path
*
* @example
* ```ts
* computeNavigationKey({ path: '/users/', meta: {} }) // '/users'
* ```
*/
function computeNavigationKey(entry) {
	return canonicalizePath(entry.path);
}
/**
* Extracts the `/`-prefixed pathname from a `location.hash` value — strips the
* leading `#` (keeping the route's own leading `/`) and any `?query` suffix.
*
* @remarks
* The grammar this package matches everywhere is `/`-prefixed, so a hash-mode
* location's `'#/users/7?x'` becomes `'/users/7'`
* — a hash pattern is expected to start `'#/'`; anything else (an empty hash,
* or one that does not begin `'#/'`) yields `''` (the `Navigator` then falls
* back). Total — never throws.
*
* @param hash - The raw `window.location.hash` value (for example `'#/users/7?x'`)
* @returns The `/`-prefixed pathname to match, or `''` for an empty / non-`#/` hash
*
* @example
* ```ts
* extractHashPath('#/users/7?x') // '/users/7'
* extractHashPath('#/tokens') // '/tokens'
* extractHashPath('') // '' — the Navigator falls back
* extractHashPath('#other') // '' — not a `#/` route hash
* ```
*/
function extractHashPath(hash) {
	if (!hash.startsWith("#/")) return "";
	const withoutHash = hash.slice(1);
	const queryIndex = withoutHash.indexOf("?");
	return queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
}
/**
* Resolves the `/`-prefixed pathname to match for the current location, in
* either navigation mode — the one seam `extractHashPath` (hash mode) and
* history-mode base-stripping share.
*
* @remarks
* Hash mode (`history: false`) reads `location.hash` through
* {@link extractHashPath}. History mode (`history: true`) reads
* `location.pathname` and strips a leading `base` prefix when one is
* configured: `base` itself maps to the root `'/'`; a pathname that is not
* under `base` is returned unchanged (a base mismatch is not this helper's
* concern — the `Navigator`'s match then misses). Total — never throws.
*
* @param location - The `hash` + `pathname` pair to resolve from (accepts a
*   real `Location` or any object shaped the same, for pure unit testing)
* @param history - If `true`, the pathname is read from `location.pathname`
*   with `base` stripped; if `false`, it is read from `location.hash`
* @param base - The history-mode path prefix to strip (ignored in hash mode;
*   omit for no prefix)
* @returns The `/`-prefixed pathname to match
*
* @example
* ```ts
* resolveLocationPath({ hash: '#/users/7', pathname: '/' }, false) // '/users/7'
* resolveLocationPath({ hash: '', pathname: '/app/users/7' }, true, '/app') // '/users/7'
* resolveLocationPath({ hash: '', pathname: '/app' }, true, '/app') // '/'
* resolveLocationPath({ hash: '', pathname: '/other/users' }, true, '/app') // '/other/users'
* ```
*/
function resolveLocationPath(location, history, base) {
	if (!history) return extractHashPath(location.hash);
	const pathname = location.pathname;
	if (base === void 0 || base === "") return pathname;
	const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
	if (pathname === normalizedBase) return "/";
	if (pathname.startsWith(`${normalizedBase}/`)) return pathname.slice(normalizedBase.length);
	return pathname;
}
/**
* Finds the nearest enclosing `<a>` element a DOM event originated from, by
* walking its composed path — the pure lookup behind history-mode link
* interception.
*
* @remarks
* Uses `event.composedPath()` (not `event.target`) so a click on a styled
* child INSIDE an anchor (an icon, a span) still resolves to the anchor.
* Total — never throws; returns `undefined` when no anchor is found on the
* path.
*
* @param event - The DOM event to search (typically a `click`)
* @returns The nearest enclosing `HTMLAnchorElement`, or `undefined`
*
* @example
* ```ts
* document.addEventListener('click', (event) => {
* 	const anchor = findAnchor(event)
* 	if (anchor !== undefined) console.log(anchor.href)
* })
* ```
*/
function findAnchor(event) {
	for (const node of event.composedPath()) if (node instanceof HTMLAnchorElement) return node;
}
/**
* Represents the headless History/hash navigation entity — composes one core
* `Router<Meta>`, resolving the current location on `start()` and
* every subsequent navigation event, tracking `active`, and emitting
* `navigate` through the core {@link Emitter}. No `render` /
* `outlet` — the consumer owns rendering.
*
* @typeParam Meta - The opaque per-route payload a match carries back
*
* @remarks
* - **One shared engine.** Each `route.path` is registered on the SAME
*   `Router` machine the core `Dispatcher` composes, keyed for dedup by its
*   {@link canonicalizePath} (last write wins, replace-in-place) — literal-
*   over-param precedence, trailing-slash insensitivity, and
*   `:param`/`*wildcard` extraction all come from that one shared engine.
* - **Resolve pipeline.** Compute the `/`-prefixed pathname to match
*   ({@link resolveLocationPath}) → {@link match} it → on a miss, match the
*   `fallback` through the SAME engine → a fallback that ALSO matches nothing
*   aborts any pending guarded navigation (a miss SUPERSEDES it, same as a
*   newer navigation) and leaves `active` `undefined`, emitting nothing —
*   honest to the one-shared-engine rule: no phantom match is fabricated → the optional `guard` may
*   veto → on a verdict, `active` is set and `navigate` emitted.
* - **Supersede-safe guard.** Every navigation mints an `@orkestrel/abort`
*   handle, aborting the PREVIOUS navigation's handle first; a guard verdict
*   that resolves after its navigation was superseded (`signal.aborted`) is
*   discarded, same as a `false`/rejected verdict. A guard throw routes to
*   the `error` handler and vetoes. `stop()`/`destroy()` also abort the
*   pending handle.
* - **Hash vs history mode.** Hash mode (`history: false`, the default) binds
*   `hashchange`; history mode (`history: true`) binds `popstate` and, when
*   `intercept` is set, same-origin `<a>` click interception (a plain
*   left-click with no modifier keys, `target`, or `download` attribute).
*
* @example
* ```ts
* const navigator = new Navigator<{ readonly title: string }>({
* 	routes: [
* 		{ path: '/users/:id', meta: { title: 'User' } },
* 		{ path: '/tokens', meta: { title: 'Tokens' } },
* 	],
* })
* navigator.emitter.on('navigate', (match) => (document.title = match.meta.title))
* navigator.start() // resolves the current hash now, and on every hashchange
* navigator.navigate('/tokens')
* ```
*/
var Navigator = class {
	#router;
	#emitter;
	#history;
	#base;
	#fallback;
	#guard;
	#error;
	#intercept;
	#listener;
	#clickListener;
	#active;
	#started = false;
	#current;
	constructor(options) {
		if (options.guard !== void 0 && !isFunction(options.guard)) throw new ContractError("a navigator guard must be a function when defined", {
			code: "literal",
			context: {
				path: ["options", "guard"],
				limit: "function or undefined",
				received: preview(options.guard)
			}
		});
		if (options.fallback !== void 0 && !isString(options.fallback)) throw new ContractError("a navigator fallback must be a string when defined", {
			code: "literal",
			context: {
				path: ["options", "fallback"],
				limit: "string or undefined",
				received: preview(options.fallback)
			}
		});
		if (options.base !== void 0 && !isString(options.base)) throw new ContractError("a navigator base must be a string when defined", {
			code: "literal",
			context: {
				path: ["options", "base"],
				limit: "string or undefined",
				received: preview(options.base)
			}
		});
		this.#history = options.history ?? false;
		this.#base = options.base;
		this.#intercept = options.intercept ?? false;
		this.#guard = options.guard;
		this.#error = options.error;
		this.#emitter = new Emitter({
			...options.on === void 0 ? {} : { on: options.on },
			...options.error === void 0 ? {} : { error: options.error }
		});
		this.#router = createRouter({
			entries: options.routes,
			...options.sensitive === void 0 ? {} : { sensitive: options.sensitive },
			key: computeNavigationKey
		});
		this.#fallback = options.fallback ?? options.routes[0]?.path;
		this.#listener = this.#resolve.bind(this);
		this.#clickListener = this.#intercepted.bind(this);
	}
	get router() {
		return this.#router;
	}
	get emitter() {
		return this.#emitter;
	}
	get active() {
		return this.#active;
	}
	start() {
		if (this.#started) return;
		this.#started = true;
		if (!this.#history) window.addEventListener("hashchange", this.#listener);
		else {
			window.addEventListener("popstate", this.#listener);
			if (this.#intercept) document.addEventListener("click", this.#clickListener);
		}
		this.#resolve();
	}
	stop() {
		if (!this.#started) return;
		this.#started = false;
		if (!this.#history) window.removeEventListener("hashchange", this.#listener);
		else {
			window.removeEventListener("popstate", this.#listener);
			if (this.#intercept) document.removeEventListener("click", this.#clickListener);
		}
		this.#current?.abort();
	}
	navigate(path) {
		if (!this.#history) {
			const next = `#${path}`;
			if (window.location.hash === next) this.#resolve();
			else window.location.hash = next;
			return;
		}
		const target = this.#base === void 0 ? path : joinPaths(this.#base, path);
		window.history.pushState(null, "", target);
		this.#resolve();
	}
	match(path) {
		return this.#router.match(path);
	}
	destroy() {
		this.stop();
		this.#emitter.destroy();
	}
	#resolve() {
		const pathname = resolveLocationPath({
			hash: window.location.hash,
			pathname: window.location.pathname
		}, this.#history, this.#base);
		const to = this.match(pathname) ?? this.#matchFallback();
		if (to === void 0) {
			this.#current?.abort();
			this.#active = void 0;
			return;
		}
		this.#navigate(to);
	}
	#matchFallback() {
		if (this.#fallback === void 0) return void 0;
		return this.match(this.#fallback);
	}
	#navigate(to) {
		this.#current?.abort();
		const handle = createAbort();
		this.#current = handle;
		const guard = this.#guard;
		if (guard === void 0) {
			this.#commit(to);
			return;
		}
		this.#guarded(guard, to, this.#active, handle);
	}
	#commit(to) {
		this.#active = to;
		this.#emitter.emit("navigate", to);
	}
	async #guarded(guard, to, from, handle) {
		let verdict;
		try {
			verdict = await guard(to, from, handle.signal);
		} catch (error) {
			this.#surface(error);
			return;
		}
		if (handle.signal.aborted || !verdict) return;
		this.#commit(to);
	}
	#surface(error) {
		const handler = this.#error;
		if (handler === void 0) return;
		try {
			handler(error, "navigate");
		} catch {}
	}
	#intercepted(event) {
		if (event.defaultPrevented || event.button !== 0) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		const anchor = findAnchor(event);
		if (anchor === void 0) return;
		if (anchor.target !== "" && anchor.target !== "_self") return;
		if (anchor.hasAttribute("download")) return;
		const url = new URL(anchor.href, window.location.href);
		if (url.origin !== window.location.origin) return;
		event.preventDefault();
		this.navigate(resolveLocationPath({
			hash: url.hash,
			pathname: url.pathname
		}, true, this.#base));
	}
};
/**
* Creates a {@link NavigatorInterface} — the headless History/hash navigation
* entity composing one core `Router<Meta>`.
*
* @remarks
* Prefer this over `new Navigator(...)` at call sites that only need the
* interface.
*
* @typeParam Meta - The opaque per-route payload a match carries back
* @param options - The `routes` to register, the `history` toggle (default
*   `false`, hash mode), an optional `base` (history mode), an optional
*   `fallback` path, an optional `guard` hook, opt-in link `intercept`
*   (history mode), the `sensitive` case toggle, and the Emitter pattern's
*   `on`/`error` wiring
* @returns A live {@link NavigatorInterface} handle — call `start()` to begin
*   dispatching
*
* @example
* ```ts
* import { createNavigator } from '@src/browser'
*
* const navigator = createNavigator({
* 	routes: [
* 		{ path: '/users/:id', meta: { title: 'User' } },
* 		{ path: '/tokens', meta: { title: 'Tokens' } },
* 	],
* 	on: { navigate: (match) => (document.title = match.meta.title) },
* })
* navigator.start()
* ```
*/
function createNavigator(options) {
	return new Navigator(options);
}
//#endregion
export { Navigator, computeNavigationKey, createNavigator, extractHashPath, findAnchor, resolveLocationPath };
