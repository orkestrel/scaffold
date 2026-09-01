# Referral rulings — middleware (probe unit, 2026-09-01)

Unit: Opus 5 objective lane (Sol bench dark, substitution recorded). Repository
`/home/user/fleet/middleware` at `c242d60`. Instruments retained under
`/home/user/fleet/middleware/tmp/referrals/`; every probe runs from the repository root as
`npx vitest run --config tmp/referrals/vite.config.ts --no-cache --reporter=verbose <probe>`.
Lint and format checks exit 0 with the instruments in place. The referral's cited line numbers
predate the landed fix unit; current sites are `src/server/errors.ts:26`,
`src/server/MultipartParser.ts:244-245`, `src/server/middlewares.ts:88-90,134,140` and
`:221,290-322`, `src/server/helpers.ts:78`, `src/core/types.ts:369-372,486`.

## s11 Q1 — Does a thrown `MultipartError` render as 413/400/415, or fall to the 500 arm?

**SOUND.** Probe `s11-multipart-error-status.test.ts`. The premise is stale: `MultipartError`
now extends `HTTPError` (landed fix), so `isHTTPError` matches on its `instanceof` arm. Real
`POST` requests over a loopback port rendered 413 (`too many multipart files`), 400 (`missing
multipart boundary`), and 415 (`multipart file failed type validation`); controls: a plain
`Error` renders 500, a brandless `{ status: 413, message }` is refused by the guard. No repair.
Observation for a later shape change: `src/server/middlewares.ts:418` still re-wraps a
`MultipartError` into a plain `HTTPError`, which changes no status and only strips the `reason`
axis, so `isMultipartError` can never match a value a consumer receives through
`createMultipart`.

## s11 Q2 — Can § Stores be satisfied on `SessionStoreInterface.set(id, session, now)`?

**DEFECT.** Probes `s11-session-store-id.test.ts` and the typecheck sandboxes
`tmp/referrals/{baseline,repair,repair-control}/`. The separate id is redundant on every
reachable path (`src/core/middlewares.ts:780,784` both pass `x.id, x`), and a disagreeing pair
silently corrupts both shipped stores: after `set('key-a', new Session('value-b'), 0)`,
`get('key-a')` resolves a session reporting `id: 'value-b'` and `get('value-b')` finds nothing,
so `createSession`'s `store.delete(activeSession.id)` would delete a key the store does not hold.
The rule is satisfiable: `tmp/referrals/repair/apply.sh` applies the repair to a copy of `src/`
and both scoped projects typecheck clean; the control sandbox (interface changed, call sites
stale) exits 2 naming exactly the four expected files.

Proposed repair: constrain `SessionStoreInterface<S extends SessionInterface>` and
`SessionOptions<S extends SessionInterface, TState = unknown>`; `set(session: S, now: number)`;
derive `id` from `session.id` in both stores; constrain `MemorySessionStore` and
`createMemorySessionStore`; update the two call sites. **Moves the published surface**
(`SessionStoreInterface`, `SessionOptions`, `MemorySessionStore`, `DatabaseSessionStore`,
`createMemorySessionStore`). Measured cost: the tests typecheck red in four files (arity errors
and `string` no longer satisfying `SessionInterface`) because `MemorySessionStore` today doubles
as a general expiring LRU over any payload; `guides/middleware.md:615,640` carry the old call
shape in executed fences.

## s11b Q1a — Is `createAssets`'s unbounded per-key cache reachable enough to matter?

**DEFECT, conditionally reachable.** Probe `s11b-assets-cache.test.ts`. Against a source that
answers unknown keys (the SPA-shell shape `tests/setupServer.ts`'s `createAssetSource(assets,
fallback)` supports), 20,000 unauthenticated `GET`s retained 77 MiB of array buffers and 118 MiB
RSS with no eviction and no re-read of key zero; against a finite source the same drive grew
nothing. Control: the package's own capacity-bounded `MemorySessionStore` evicted under the same
instrument. `identities`, `brotlis`, and `tags` at `src/server/middlewares.ts:88-90` are never
deleted from, and neither `AssetOptions` nor the guide states the finiteness requirement.

Proposed repair, recommended: state in `AssetOptions`'s TSDoc and the guide's Assets section
that `read` must answer a bounded key set and return `undefined` for an unknown key, because
`createAssets` retains every successful result for the process lifetime (does not move the
surface). A bounded capacity with LRU eviction is the alternative and adds an `AssetOptions`
member.

## s11b Q1b — Can a rejected `computeBodyETag` promise be cached and re-awaited forever?

**SOUND.** The retention mechanism is real (`tags.set(key, pending)` at `:140` before settlement,
never deleted) but nothing in the reachable input domain rejects: SHA-256 is pinned and every
input is a fresh `Uint8Array.from(...)` copy, including a zero-length view over a detached buffer.
Control: an unsupported algorithm name produces an observable rejection.

## s11b Q2 — Can `this.#staged.indexOf(path)` return `-1` on any reachable path?

**SOUND.** Probe `s11b-staged-roster.test.ts`. A probe-only recorder over `indexOf` captured
every parser lookup across both `#discard` arms (empty-filename zero-byte at `:164`,
`isDangerousKey` at `:180`) beside a kept file; every lookup hit. `#discard` is only called with
a path pushed earlier in the same `#consumeFile` invocation, so the `index !== -1` guard at `:245`
is inert. Control lookup of a never-staged path returned `-1`.

## s11b Q3 — Is the SPA fallback's header and screening asymmetry intended?

**DEFECT**, three separable items. Probe `s11b-static-fallback.test.ts` over a loopback port with
`createStatic({ root, fallback: true, cache: 60, etag: true })`.

1. **`HEAD` and `GET` diverge.** `src/server/helpers.ts:78` refuses every non-`GET` method, so
   `HEAD /dashboard` answers 404 while `GET /dashboard` answers 200 (RFC 9110 §9.3.2). Repair:
   accept `HEAD` in `resolveStaticFallbackPath` and return a bodiless 200 with the shell's
   headers, mirroring the primary path's `HEAD` arm at `middlewares.ts:346-350`.
2. **Configured `etag` and `cache` do not apply to the fallback.** The response at `:316-320`
   carries only `content-type`; `If-None-Match` is ignored (the primary path answers 304 for the
   same validator). Repair: build the fallback response through the same `fstat`-derived header
   block, so `ETag`, `Cache-Control`, `Content-Length`, and `Accept-Ranges` come from
   `shellHandle.stat()`.
3. **The `dotfiles` screen does not reach the shell path.** With `index` a dotfile name and
   `dotfiles: 'deny'`, the same bytes are refused on one route and served on another;
   operator-configured, and under the default `ignore` no secret leaks. Repair: apply
   `isDotfilePath` to `shellPath` under the configured policy, or state in `StaticOptions`'s
   TSDoc that `index` is exempt from `dotfiles`.

Items 1–3 change behavior without moving the published type surface; `guides/middleware.md:724-729`
and `StaticOptions`'s `fallback` TSDoc owe the reader the resulting contract.
