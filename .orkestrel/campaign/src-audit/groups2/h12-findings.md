# Findings for group h12 (verification round 2 supplement)

Packages: middleware, at /home/user/fleet/middleware. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling - re-rule it yourself from primary evidence; never inherit it.

## s11b-01

1. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:765 rule=.claude/rules/architecture.md § Functions and orchestration, § Middleware verdict=CONFIRMED
   wrong: `createSession` implements the published `SessionControlInterface` as an object literal declaring two methods inside the request handler body, which is neither a callback passed directly as an argument nor a function returned directly as the result, and it makes state the consumer addresses (`context.state.control`) reachable only through closure variables the middleware then re-reads at lines 783-794.
   repair: Extract `src/core/SessionControl.ts` holding one class implementing `SessionControlInterface` with `#session`, `#create`, `#destroyed`, `#regenerated` fields, `regenerate()`/`destroy()` methods, and readonly `destroyed`/`regenerated` getters; construct it at line 765, and replace the `destroyed`/`regenerated` local reads at 784-793 with getter reads. Barrel it from `src/core/index.ts` (its constructor takes a session and a `create` function, both values a consumer already holds).

## s11b-02

2. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:741 rule=.claude/rules/patterns.md § Foreign contracts verdict=CONFIRMED
   wrong: `createSession` dereferences `session.id` (lines 744, 785, 789, 792) and `session.data` (through `transferSessionData` at 770) from whatever a consumer-supplied `SessionStoreInterface.get` returned, without validating it and without the seam stating any obligation — `SessionStoreInterface`'s TSDoc (`src/core/types.ts:352-357`) documents only async-ness and `delete` no-op semantics, and `SessionOptions.store` (`src/core/types.ts:405`) states no shape requirement, while the package ships `isSession` for exactly this shape.
   repair: State the obligation on the interface that owns it — add to `SessionStoreInterface`'s `@remarks` in `src/core/types.ts` that `get` must resolve a value satisfying `isSession` or `undefined`, and that `createSession` dereferences `id` and `data` without re-checking. Alternatively narrow at line 741 with `isSession` and treat a failing value as `undefined`.

## s11b-03

3. package=middleware file=/home/user/fleet/middleware/src/core/middlewares.ts:845 rule=.claude/rules/architecture.md § System constraints (mechanism, not product policy); AGENTS.md § Design laws (one concept, one term) verdict=CONFIRMED
   wrong: `createCSRF` hardcodes `sameSite: 'Strict'`, `httpOnly: false`, and `path: '/'` on the cookie it writes, so an application mounted under a sub-path or needing `Lax` for a top-level POST flow cannot use this battery, while the sibling cookie seam in the same package exposes `CookieTransportOptions.cookie?: CookieOptions` for the same concept; the guide's CSRF entry (`guides/middleware.md:409-415`) never states these attributes.
   repair: Add `readonly cookie?: CookieOptions` to `CSRFOptions` in `src/core/types.ts`, mirroring `CookieTransportOptions.cookie`, and spread it over the defaults at lines 846-850 so `secure` and the documented defaults still apply when the key is absent. Document the defaults in the `CSRFOptions` `@remarks`.

## s11b-04

4. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:233 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice) verdict=CONFIRMED
   wrong: The canonical-root memo line `if (canonicalRootPromise === undefined) canonicalRootPromise = realpath(root)` appears verbatim three times (233, 258, 307), each wrapped in the same `Promise.all([canonicalRootPromise, realpath(candidate)])` plus `isContainedPath` block, so one containment rule is written three times inside one handler.
   repair: Resolve the memo once at the top of the returned handler with `const rootReal = await (canonicalRootPromise ??= realpath(root))`, and extract the shared `realpath` + containment step into `resolveContainedRealPath(candidate: string, rootReal: string): Promise<string | undefined>` in `src/server/helpers.ts`, returning `undefined` for both an escape and a `realpath` failure. Use it at the two sites that already treat those outcomes identically (258-267 and 307-313); keep the explicit branch at 233-239, which deliberately distinguishes an escape (`next()`) from a `realpath` failure (`fallbackNeeded`).

## s11b-05

5. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:246 rule=.claude/rules/typescript.md § Types; AGENTS.md § Design laws (one concept, one term) verdict=CONFIRMED
   wrong: Line 246 spells the file-stat type as `Awaited<ReturnType<typeof stat>>` while line 271 names the same type as `Stats`, already imported at line 8; line 418 does the same with `Awaited<ReturnType<typeof parseMultipartRequest>>` where `MultipartBody | undefined` is the declared return type and `MultipartBody` is exported from `@src/core`, which this file already imports from at lines 1 and 10.
   repair: Write `let directoryInfo: Stats | undefined` at line 246 and `let body: MultipartBody | undefined` at line 418, adding `MultipartBody` to the existing `import type { MultipartState } from '@src/core'` declaration.

## s11b-06

6. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:475 rule=.claude/rules/architecture.md § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: The node face's fixed coding set is an inline array literal in the factory body, duplicating the exact value of `DEFAULT_COMPRESSION_ENCODINGS` (`src/core/constants.ts:25`), while the line above it (473) reads its threshold default from `constants.ts` — so one file both centralizes and inlines the same kind of datum, and the value the TSDoc and `NodeCompressionOptions` remarks both quote has no named home.
   repair: Add `export const NODE_COMPRESSION_ENCODINGS: readonly Encoding[] = Object.freeze(['gzip', 'deflate'])` to `src/server/constants.ts` with a TSDoc naming it the codings `node:zlib` guarantees, import it at line 30, and replace the literal at 475.

## s11b-07

7. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:207 rule=.claude/rules/architecture.md § Centralized-file pattern verdict=CONFIRMED
   wrong: `const dotfiles = options.dotfiles ?? 'ignore'` inlines a documented default (`src/server/types.ts:63-65`, `guides/middleware.md:110`) as a bare literal, while the line above it and the lines below it read `DEFAULT_STATIC_INDEX` and `DEFAULT_STATIC_FALLBACK_EXCLUDE` from `constants.ts`, and `src/server/constants.ts`'s own banner states that constants are centralized, never inlined.
   repair: Add `export const DEFAULT_STATIC_DOTFILES = 'ignore'` to `src/server/constants.ts`, typed `StaticOptions['dotfiles']`, import it, and use it at line 207. Point the `dotfiles` remark in `src/server/types.ts` at it, as the sibling remarks already do.

## s11b-08

8. package=middleware file=/home/user/fleet/middleware/src/server/middlewares.ts:92 rule=AGENTS.md § Design laws (derive state); .claude/rules/architecture.md § System constraints verdict=CONFIRMED
   wrong: `createAssets` keeps one cached asset across three separate `Map` instances (`identities`, `brotlis`, `tags`) all keyed by the same `key`, so one concept is three stores that can disagree — `identities.has(key)` alone decides cache presence at line 117, `brotlis` is read at 116 before that decision and written inside it at 134, and `tags` is populated independently at 141-145.
   repair: Declare one `AssetEntry` interface in `src/server/types.ts` carrying `readonly identity`, `readonly brotli?`, and `readonly etag: Promise<string>`, replace the three maps with a single `Map<string, AssetEntry>`, and make the miss branch build one entry.

## s11b-09

9. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:226 rule=.claude/rules/typescript.md § Immutability verdict=CONFIRMED
   wrong: `parse()` returns `this.#files` and `this.#fields` themselves rather than copies, and `Object.freeze` reaches only those two objects — every `MultipartFile[]` value inside `files` is the parser's own live array, so a consumer holding `context.state.multipart.files['avatar']` can push or pop at runtime despite the `readonly MultipartFile[]` declaration, and the freeze permanently seals the parser's own private fields. The package already freezes each leaf record (`src/server/helpers.ts:503`), so the middle layer is the only unfrozen one.
   repair: Build the return value as a fresh null-prototype record whose every value is `Object.freeze([...records])`, freeze that record and a fresh copy of `#fields`, and return those instead of the internal fields.

## s11b-10

10. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:80 rule=.claude/rules/architecture.md § Functions and orchestration, § System constraints verdict=CONFIRMED
    wrong: `parse()` inlines the entire state machine in one 150-line method — preamble scan, boundary loop, header-block read, file-part streaming, field-part accumulation, and trailing-boundary consume — and the delimiter-scan-with-carry loop is written twice with near-identical bodies (118-145 for files, 189-208 for fields), differing only in where the bytes go. The per-file limit check is also written twice (108-111 and 153-157) for the two branches that decide whether an empty-filename part counts.
    repair: Extract `#consumeFile(name, filename, delimiter)` and `#consumeField(name, delimiter)` as `#` private methods called from the part loop, and lift the shared scan step into one `#scan(delimiter): Promise<number>` private method that carries back the partial tail and pulls. Move the file-count increment to a single site after the body is read, once the empty-filename no-op case has been decided.

## s11b-11

11. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:174 rule=.claude/rules/documentation.md § Parity verdict=CONFIRMED
    wrong: `mime: detected ?? declared` stores the client-declared `Content-Type` whenever magic-byte sniffing finds no signature and no `allowed` list is configured, but `UploadedFileInterface`'s remark (`src/server/types.ts:152`) documents `mime` as "the SNIFFED (magic-byte-detected) MIME type" and `detectMIME`'s TSDoc (`src/server/helpers.ts:274-276`) calls it "SNIFF-AUTHORITATIVE ... never the declared `Content-Type`". A consumer reading `file.mime` as the sniffed fact receives an attacker-supplied string.
    repair: Write `mime: detected ?? DEFAULT_CONTENT_TYPE` at line 174, so an unsniffable file reports `application/octet-stream` rather than the declared value; `validated` at line 160 already carries the sniffed-versus-declared agreement separately. `DEFAULT_CONTENT_TYPE` is already imported at line 9.

## s11b-12

12. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:161 rule=.claude/rules/documentation.md § Parity verdict=CONFIRMED
    wrong: `guides/middleware.md:436-438` states "A declared `Content-Type` whose SNIFFED (magic-byte) bytes disagree is rejected `415`, as is a signature-less declared type on an `allowed` list", but rejection at lines 161-165 happens only inside `if (this.#allowed !== undefined)` and only when the sniffed type is absent from that list. With no `allowed` list, a declared/sniffed disagreement is never a 415 — it produces `validated: false` and a normal response. Even with an `allowed` list, a file whose sniffed type is on the list is accepted regardless of what it declared.
    repair: Rewrite `guides/middleware.md:436-438` to the shipped rule — type rejection applies only when `allowed` is configured; a file whose sniffed bytes detect no type on the list is rejected `415`, and a signature-less file is always rejected because sniffing cannot place it on the list; a declared `Content-Type` disagreeing with the sniffed type is reported as `validated: false`, never rejected on its own.

## s11b-13

13. package=middleware file=/home/user/fleet/middleware/src/server/MultipartParser.ts:149 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice); AGENTS.md § Design laws (absence is `undefined`) verdict=CONFIRMED
    wrong: The discard sequence `await unlink(path); this.#staged.splice(this.#staged.indexOf(path), 1)` is written twice (149-151 for the empty-filename no-op, 166-168 for the dangerous-key drop), and both copies feed `indexOf`'s `-1` straight into `splice`, where it silently removes the last staged entry instead of the intended one.
    repair: Extract one `async #discard(path: string): Promise<void>` private method that unlinks best-effort and removes the entry only when `indexOf` returns a non-negative index, and call it from both sites.

## s11b-14

14. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:166 rule=.claude/rules/architecture.md § System constraints (centralize any pattern repeated twice); AGENTS.md § Design laws (one concept, one term) verdict=CONFIRMED
    wrong: `resolveStaticPath` closes with a hand-rolled `resolved === root || resolved.startsWith(\`${root}${sep}\`)` containment test, while `isContainedPath` sits fifty lines earlier in the same file (line 116) and its own TSDoc (lines 100-104) names precisely this technique as the wrong one. The two implementations also disagree on win32, where `path.relative` case-folds and a raw prefix comparison does not, so the traversal guard and the realpath guard apply different containment rules to the same root.
    repair: Replace line 166-167 with `return isContainedPath(resolved, root) ? resolved : undefined`.

## s11b-15

15. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:78 rule=.claude/rules/names.md § Standalone helpers; .claude/rules/patterns.md § Options; .claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
    wrong: `resolveStaticFallbackPath` is named as a path resolver but is four refusal checks plus a one-line `join(root, index)`; `root` and `index` exist only to produce that join, and the signature takes six positional parameters of which four are adjacent strings (`exclude`, `method`, `pathname`, `accept`) a caller can transpose with no type error. Its call site (`src/server/middlewares.ts:296-303`) also re-defaults `fallback?.exclude ?? DEFAULT_STATIC_FALLBACK_EXCLUDE`, though `fallback.exclude` was already defaulted at construction (lines 211 and 214), so that `??` is dead.
    repair: Rename and reshape to `isFallbackEligible(method: string, pathname: string, accept: string, exclude: string): boolean`, move the `join(root, index)` to the one call site, and drop the dead `?? DEFAULT_STATIC_FALLBACK_EXCLUDE` at line 299 by passing `fallback.exclude` directly inside the `fallback !== undefined` branch.

## s11b-16

16. package=middleware file=/home/user/fleet/middleware/src/server/helpers.ts:286 rule=.claude/rules/architecture.md § Centralized-file pattern, § Kind purity verdict=CONFIRMED
    wrong: `detectMIME` expresses its magic-byte signature table as a chain of inline byte-array literals in the function body, while the file's sibling MIME table `EXTENSION_TYPES` is a frozen constant in `src/server/constants.ts` — one kind of lookup data has a centralized home and the other does not, so the supported signature set cannot be read, reused, or tested apart from the function.
    repair: Add `export const MIME_SIGNATURES: readonly { readonly mime: string; readonly bytes: readonly (readonly number[])[]; readonly offsets: readonly number[] }[]` (or a shape that carries the webp two-fragment case and the gif87a/gif89a pair) to `src/server/constants.ts`, frozen with `Object.freeze`, and reduce `detectMIME` to a scan over it using the existing `matchesBytes`.