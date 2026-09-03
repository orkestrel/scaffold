# Unit conform-middleware — report

## Outcome

Every row of § Rows and § Fleet rows is closed: every numbered row `applied`, `fleet-F1` `noop`,
`fleet-F2` `applied`. The § Gates table's original readings were this unit's own, taken at the
pre-fix-round staging; `check` and `test` later read nonzero on the `@orkestrel/database` cause
§ Deviation (fix round 1) records, and § Fix round 2 carries the Orchestrator's 18:46 UTC `check`
reading and this round's own gate chain on the closure re-staged at 17:53 UTC, which is the deciding
reading. `git status --short` lists only paths inside Owned.

This unit resumed the predecessor's uncommitted tree. I read the tree against each row rather than
re-applying it. The tree already carried every row's repair in its refuter-operative form. The one
edit I made this session is a site the brief's § Method step 5 sweep found and no row named: a
nested function assignment in `tests/src/core/helpers.test.ts`, recorded under `middleware-obj-2`.

## Rows

| Id                  | Disposition | Note                                                                                                                                                                                                                            |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| middleware-obj-1    | applied     | Type imports precede value imports in all three named files. `DatabaseSessionStore.ts` lines 1-10 are type imports, line 11 the `../helpers.js` value import; `src/server/middlewares.ts` lines 1-10 type, 11+ value; the stray `MultipartPartInput` type import left `tests/src/server/helpers.test.ts` with the multipart assertions the obj-3 move carried to `tests/src/server/parsers.test.ts`, where it is line 1. Sweep of `^import (type )?` over `src/**` and `tests/**` finds no remaining inversion. |
| middleware-obj-2    | applied     | `tests/setupServer.ts` returns object-literal shorthand `destroy()` methods at :219 and :263; `DatabaseSessionStore.test.ts` has the three `const build` inlined and `restore` (:24) / `isAuthorized` (:32) at module scope; `middlewares.test.ts` uses `createRecorder<[unknown]>()` with `unhandled.handler` registered and removed and `expect(unhandled.count).toBe(0)`. **Plus one site the sweep found and no row named** — see § Deviations, item "The extra nested-function site". |
| middleware-obj-3    | applied     | `tests/src/core/validators.test.ts`, `tests/src/server/parsers.test.ts`, and `tests/src/server/MultipartParser.test.ts` exist. The guard assertions and the `parseMultipartRequest` assertions are gone from the two `helpers.test.ts` files and their import lists. `MultipartParser.test.ts` imports `../../../src/server/MultipartParser.js` relatively and covers the preamble cap, the header-block cap, the total-bytes cap, abort mid-upload, staged-file cleanup, and the default directory. The guide's `## Tests` rows name all three new files. |
| middleware-obj-4    | applied     | `tests/setup.ts` exports `TEST_SECRET`, one `decompress` over `Uint8Array<ArrayBuffer> \| ArrayBuffer`, `compressibleBody`, `createTestTransport`, and `buildStore`, each TSDoc'd. `buildContext` is deleted and call sites use `createTestContext(buildRequest('/'), {})`. Both `const SECRET` declarations are gone. The false "Self-contained: no tests/setup.ts import" sentence is gone. `tests/setup.test.ts` carries a `describe` for each newly exported helper (`TEST_SECRET`, `compressibleBody`, `decompress`, `createTestTransport`, `buildStore`). |
| middleware-obj-5    | applied     | `export interface ByteRange { readonly start: number; readonly end: number }` at `src/server/types.ts:210` with the 0-indexed/inclusive `@remarks`; `src/server/helpers.ts:534` reads `range?: ByteRange`; `ByteRange` is in the type-import block at helpers.ts:3; the guide carries its `### Types` row at guides/middleware.md:125. |
| middleware-obj-6    | applied     | BREAKING. `UploadedFileInput` is deleted from `src/server/types.ts`; `createUploadedFile(input: UploadedFile): UploadedFile` at helpers.ts:465 with `@param input - Every field of the record`; the guide row is deleted. Case-insensitive sweep for `uploadedfileinputs?` over the package returns nothing. |
| middleware-obj-7    | applied     | The `it.todo` is gone (`it\.todo` sweep returns 0 across the package). `tests/setupServer.ts` exports `resolveSecondDevicePath`; `tests/src/server/helpers.test.ts:46` resolves the probe at collection and :550 registers `it.runIf(secondDevice !== undefined)`. `moveUploadedFile`'s `@remarks` at src/server/helpers.ts:607 states the fallback runs only where the device probe finds a second device. **This host has a second device, so the case ran and passed** rather than skipping — see § Proofs. |
| middleware-subj-1   | applied     | No `§` remains in `tests/**`, `guides/README.md`, or `README.md`. `guides/middleware.md` keeps only its own `Contract §3–4` / `§9` / `§17` / `§7` internal references, which the refuter's form preserves. `src/server/helpers.ts:56` keeps `RFC 9110 §9.3.2`, the real external spec section the row excludes. The See-also bullet reads `- [`AGENTS.md`](../AGENTS.md) — the coding rules this package is written under.` in both guide files. |
| middleware-subj-2   | applied     | No `PROPOSAL` anywhere in the package. guides/middleware.md:360 `### The ordering doctrine`; :406 `### The security acceptance bar, as documented behavior`; :403 `the security acceptance bar's CSRF item`; :517 `The full ordering doctrine`; :817 `(Contract §17)`; :857 `the security acceptance bar's invariants`. |
| middleware-subj-3   | applied     | `thirteen` is gone from guides/middleware.md:4-8; the enumeration and the rest of the tagline are byte-unchanged. Sweep for `\bthirteen\b` returns 0. |
| middleware-subj-4   | applied     | guides/README.md § Dependency reference keeps the `guide.md` and `scaffold.md` paragraphs and replaces the false paragraph with one sentence naming `abort.md`, `budget.md`, `contract.md`, `timeout.md`, `server.md`, `database.md`, `router.md`, `probe.md`, and `test.md` as mirrors kept here. guides/middleware.md:882 reads `Its mirrored guide is [`server.md`](server.md).` with the trailing clause dropped. |
| middleware-subj-5   | applied     | README.md:19 reads `- Node.js >= 22.12.0`. `package.json` is untouched — `git diff -- package.json` is empty. |
| middleware-subj-6   | applied     | README.md:22-23 reads `- Dual ESM and CommonJS entries: the core (`.`) and the node face (`./server`), which carries the node-bound batteries`. The finder's three-name list is not adopted, per the refuter's amendment. |
| middleware-subj-7   | applied     | guides/middleware.md:207 reads `Each guard in the following table is total` and :284-285 reads `stay Surface rows in the preceding section`; the `(§6 below)` and `the guides for the dependencies below` pointers are removed by the subj-2 and subj-4 repairs. The ADDITION landed: `src/server/middlewares.ts:239` reads `from a single `fstat` on a handle opened later in this function`. The `\b(above\|below)\b` sweep over the package's own files leaves only the onion-position domain uses at guides/middleware.md:373 and :824 and the numeric comparison at src/core/helpers.ts:397, all three of which the row excludes. |
| middleware-subj-8   | applied     | guides/middleware.md:601-607 keeps the `BodyState` requirement restated without the migration voice (`An explicitly-typed chain state (`createBody<SomeState>()`) must include the `BodyState` slice — `SomeState & BodyState`, or `SomeState` extending `BodyState``); :735 is `Multipart processing reports no progress.` alone; src/core/middlewares.ts:640-641 drops the `createBodyParser` parenthetical. Sweep for `createbodyparser` returns 0. |
| middleware-subj-9   | applied     | `\bvia\b` returns 0 across `src/**`, `guides/middleware.md`, and `tests/**`. The refuter's ADDITION is closed rather than bounded: the test sites are repaired too (visible in the diff as test-title and comment rewrites in `tests/src/core/middlewares.test.ts` and `tests/src/server/*.test.ts`). |
| middleware-subj-10  | applied     | `e\.g\.` and `i\.e\.` return 0 across the package. The ADDITION landed: `tests/src/server/helpers.test.ts:525` reads `rethrows a non-EXDEV rename error (for example a missing destination directory)`. |
| middleware-subj-11  | applied     | `\bsimply\b`, `\bjust\b`, `\beasy\b`, `\beasier\b` return 0 across `src/**`, `guides/middleware.md`, `tests/**`, and `README.md` (case-insensitive). guides/middleware.md:375 reads `is another throw the boundary maps cleanly`. |
| middleware-subj-12  | applied     | `\bshould\b` returns 0 across `src/**`, `guides/middleware.md`, `tests/**`, and `README.md` (case-insensitive). src/core/helpers.ts:289 reads `@returns True if the response must be left untouched; false otherwise`. The two ADDITION sites in `tests/setupServer.ts` and `tests/src/server/helpers.test.ts` are closed by the same sweep. |
| middleware-subj-13  | applied     | src/server/helpers.ts:516 reads `When `source` is a `FileHandle`` and :519 reads `a `FileHandle` passed as `source``. Both now name the parameter the signature declares at :533. |
| middleware-subj-14  | applied     | BREAKING. `extractMultipartBoundary` at src/server/helpers.ts:375, its `@example` at :371-372, its call site at src/server/parsers.ts:56 and import at :4, the guide row at guides/middleware.md:232, and the test import and describe at tests/src/server/helpers.test.ts:14 and :338. Case-sensitive `\bmultipartBoundary\b` sweep returns 0; case-insensitive inflection sweep `multipartboundar(y\|ies\|ied\|ying)` matches only the new name. |
| middleware-subj-17  | applied     | `export type SessionRestoreFunction = (value: unknown) => SessionInterface \| undefined` at src/core/types.ts:457 with the prescribed first sentence, used at DatabaseSessionStore.ts:54 and :61, with its `### Types` row at guides/middleware.md:107. |
| fleet-F1            | noop        | `isBrowserVuePath` is absent. Paths read: `tests/setup.ts` (full file; its header comment names no such helper) and `tests/setup.test.ts` (`describe` list). A case-insensitive `isbrowservuepaths?` sweep over the package excluding `node_modules` returns 0 matches. The workspace also has no browser environment: no `src/browser`, no `app/`, no `tests/setupBrowser.ts`. The `setup` project keeps its cases regardless — `test:setup` reports 36 passing across `tests/setup.test.ts` and `tests/setupServer.test.ts`. |
| fleet-F2            | applied     | `Session` was the only class with the named shape. `src/core/Session.ts` now declares `readonly #id: string` as the first `#` field, assigns it in the constructor, and exposes `get id(): string` as the first getter; `SessionInterface.id` in `src/core/types.ts:312` is unchanged. The precondition check is clean: no `JSON.stringify` of a `Session` instance exists in any test or guide fence — the only `JSON.stringify` hits in the package's own files build request bodies (`middlewares.test.ts:1635`, `:1888`, `src/server/middlewares.test.ts:1268`, `:1309`) or drive the distribution proof. No other implementation class carries a public data field ahead of its `#` fields; `MultipartError`'s `readonly code` at src/server/errors.ts:27 is the error-class `code` the TypeScript rules mandate, not an `id`. |

## Files touched

I changed `tests/src/core/helpers.test.ts` this session; the rest are the predecessor's, verified
row by row against § Rows.

| File                                                | Summary                                                                                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                                          | Node engine line matches the manifest; the distribution bullet states dual ESM and CommonJS for both entries.                                |
| `guides/README.md`                                   | § Dependency reference names every mirror actually present; the AGENTS citation is a plain link.                                            |
| `guides/middleware.md`                               | PROPOSAL and AGENTS section numbers removed, `thirteen` deleted, `above`/`below` pointers repaired, migration and speculative prose removed, `ByteRange` and `SessionRestoreFunction` rows added, `UploadedFileInput` row deleted, `extractMultipartBoundary` row renamed, `## Tests` rows rewritten for the three new test files. |
| `src/core/Session.ts`                                | `id` becomes a `#` field with a getter, per fleet-F2.                                                                                       |
| `src/core/helpers.ts`                                | TSDoc substitutions: `e.g.` → `for example`, `via` → `through`, `should` → `must`.                                                          |
| `src/core/middlewares.ts`                            | TSDoc substitutions and the deleted `createBodyParser` migration parenthetical.                                                             |
| `src/core/stores/DatabaseSessionStore.ts`            | Type-import order; `SessionRestoreFunction` replaces the twice-spelled inline function type.                                                |
| `src/core/types.ts`                                  | `SessionRestoreFunction` declared; TSDoc substitutions.                                                                                     |
| `src/server/helpers.ts`                              | `extractMultipartBoundary` rename; `range?: ByteRange`; `createUploadedFile(input: UploadedFile)`; `streamFile` `@remarks` names `source`; `moveUploadedFile` `@remarks` records the device-probe condition; TSDoc substitutions. |
| `src/server/middlewares.ts`                          | Type-import order; the `below` comment pointer repaired; TSDoc substitution.                                                                |
| `src/server/parsers.ts`                              | Import and call site follow the `extractMultipartBoundary` rename; TSDoc substitution.                                                      |
| `src/server/types.ts`                                | `UploadedFileInput` deleted; `ByteRange` declared with its `@remarks`.                                                                       |
| `tests/setup.ts`                                     | `TEST_SECRET`, `decompress`, `compressibleBody`, `createTestTransport`, `buildStore` exported with TSDoc; the AGENTS-citation comments rewritten. |
| `tests/setup.test.ts`                                | A `describe` block for each newly exported setup helper.                                                                                    |
| `tests/setupServer.ts`                               | `destroy` object-literal shorthand replaces the two nested `function destroy` declarations; `resolveSecondDevicePath` added; comment citations rewritten. |
| `tests/setupServer.test.ts`                          | Proofs for the new and reshaped `setupServer.ts` exports, including `resolveSecondDevicePath`.                                              |
| `tests/src/core/Session.test.ts`                     | Header comment citation removed.                                                                                                            |
| `tests/src/core/factories.test.ts`                   | `TEST_SECRET` imported; local `SECRET` deleted; comment citation removed.                                                                   |
| `tests/src/core/helpers.test.ts`                     | Guard assertions moved out; `buildContext` and the local `decompress` deleted for the shared harness; the false self-contained sentence removed; **and (this session) the nested `compress` fixture deleted for the shipped `compressBytes` helper**. |
| `tests/src/core/middlewares.test.ts`                 | `createRecorder` replaces the leaked listener; `TEST_SECRET`, `createTestTransport`, `compressibleBody`, `decompress` imported; citations and `via` removed. |
| `tests/src/core/stores/DatabaseSessionStore.test.ts` | `build` inlined; `restore` and `isAuthorized` hoisted to module scope; `buildStore` imported; citation removed.                             |
| `tests/src/core/stores/MemorySessionStore.test.ts`   | Header comment citation removed.                                                                                                            |
| `tests/src/core/validators.test.ts`                  | New. The four core guards, each over a well-shaped value and its hostile inputs.                                                            |
| `tests/src/server/MultipartParser.test.ts`           | New. The interned state machine driven directly through a relative import.                                                                  |
| `tests/src/server/helpers.test.ts`                   | Multipart-request assertions moved out; `extractMultipartBoundary` rename; the `it.todo` replaced by the device-probed `it.runIf` case; substitutions. |
| `tests/src/server/middlewares.test.ts`               | Substitutions in test titles and comments.                                                                                                  |
| `tests/src/server/parsers.test.ts`                   | New. `parseMultipartRequest` end to end.                                                                                                    |

Diffstat, regenerated 2026-09-03 at fix round 2: 27 files changed, 1993 insertions(+), 1330
deletions(-).

## Gates

**Note, dated 2026-09-03.** The table below was taken at the pre-fix-round staging. `check` and
`test` later read nonzero, on the `@orkestrel/database` cause § Deviation (fix round 1) records
(`fix1-check.txt`; `npm test` at `3 failed | 32 passed (36)` in the `setup` project). The
Orchestrator's own `npm --prefix /home/user/fleet/middleware run check` at 18:46 UTC, against the
closure re-staged at 17:53 UTC from database's landed tip, exits 0
(`/home/user/scaffold/tmp/work/middleware-check-1846.log`), which settles the objective lane's
referral on the `database.table('sessions')` inference. § Fix round 2 carries this round's own gate
chain on that same closure; the deciding reading is the Orchestrator's at landing.

Each ran bare from `/home/user/fleet/middleware`, with no pipeline stage after it, so the reported
status is the gate's own.

| Command                                              | Exit | Reading                                                                            |
| ---------------------------------------------------- | ---- | ----------------------------------------------------------------------------------- |
| `npm --prefix /home/user/fleet/middleware run format:check` | 0 | `All matched files use the correct format.` 69 files.                          |
| `npm --prefix /home/user/fleet/middleware run lint:check`   | 0 | No diagnostic emitted.                                                          |
| `npm --prefix /home/user/fleet/middleware run check`        | 0 | Root `tsc`, then `check:src:core`, then `check:src:server`, each silent.        |
| `npm --prefix /home/user/fleet/middleware run build`        | 0 | `dist/src/core` and `dist/src/server` built in ES and CJS with declarations.    |
| `npm --prefix /home/user/fleet/middleware test`             | 0 | `src` 434 passed \| 1 skipped (11 files); `policy` 111; `config` 46; `setup` 36; `guides` 38. |

The one skipped case is `resolveStaticPath > treats a backslash as a separator on win32`, an
`it.runIf(process.platform === 'win32')` row inapplicable on this Linux host. It is not the EXDEV
row.

**Observation, not a criterion.** The `npm test` reading is this unit's own, taken inside its exec.
The deciding run belongs to the Orchestrator after this unit exits.

## Proofs

The predecessor's controls are on disk and are named here rather than re-derived, because the tree
no longer reads red on them.

| Row               | Control                                                                        | File                                                            |
| ----------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| middleware-obj-7  | The EXDEV case before and after                                                | `/home/user/work/evidence/middleware-proofs/obj-7-exdev-before.txt`, `obj-7-exdev-after.txt` |
| middleware-obj-7  | `setupServer` proofs after `resolveSecondDevicePath` landed                    | `/home/user/work/evidence/middleware-proofs/obj-7-setupserver-after.txt` |
| middleware-obj-2/3/4 | The `src` projects after the moves                                          | `/home/user/work/evidence/middleware-proofs/obj-2-3-4-src-after.txt` |
| middleware-obj-4  | The `setup` project after the helper consolidation                             | `/home/user/work/evidence/middleware-proofs/obj-4-setup-after.txt` |
| guide rows        | The `guides` project after the guide rewrites                                  | `/home/user/work/evidence/middleware-proofs/guides-after.txt`     |
| fleet-F2 and placement | The `policy` project                                                      | `/home/user/work/evidence/middleware-proofs/policy-after.txt`     |
| whole suite       | The predecessor's whole-suite run at 13:24 UTC 2026-09-03                      | `/home/user/work/evidence/middleware-proofs/gate-test.txt`        |

This session added two:

| Row                     | Control                                                                                       | File                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| middleware-obj-2 (extra site) | `test:src:core` after deleting the nested `compress` fixture — 7 files, 270 tests passed | `/home/user/work/evidence/middleware-proofs/obj-2-compress-after.txt` |
| middleware-obj-7        | Verbose `src:server` run over `tests/src/server/helpers.test.ts`, reading which case skipped   | `/home/user/work/evidence/middleware-proofs/obj-7-exdev-skipreading.txt` |

The second of those is the stronger reading of row obj-7 than the row assumed. Line 62 of that file
is `✓ ... moveUploadedFile > copies and unlinks across a device boundary when rename reports EXDEV
2ms`, and line 12 is the only `↓` in the file, the win32 traversal case. This host's device probe
finds a second device, so the `EXDEV` branch the deleted `it.todo` called unreachable is proven
executing here, not merely registered for some other host.

## Sweeps

Each pattern ran over `/home/user/fleet/middleware` excluding `node_modules/**` unless a narrower
path is named. Every result is the pattern's whole match set, not a sample.

| Pattern                                                                  | Path                                    | Result                                                                             |
| ------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| `\bmultipartBoundary\b` (case-sensitive)                                 | package                                 | 0                                                                                  |
| `multipartboundar(y\|ies\|ied\|ying)` (case-insensitive)                 | package                                 | 15, every one the new `extractMultipartBoundary`                                   |
| `uploadedfileinputs?` (case-insensitive)                                 | package                                 | 0                                                                                  |
| `buildcontexts?(ed\|ing)?` (case-insensitive)                            | package                                 | 0                                                                                  |
| `createbodyparser` (case-insensitive)                                    | package                                 | 0                                                                                  |
| `onunhandled` (case-insensitive)                                         | package                                 | 0                                                                                  |
| `isbrowservuepaths?` (case-insensitive)                                  | package                                 | 0                                                                                  |
| `const SECRET` (case-insensitive)                                        | package                                 | 4, all lowercase local `const secret = options.secret` and one test literal — the deleted module constant is gone |
| `it\.todo`                                                               | package                                 | 0                                                                                  |
| `\bthirteen\b` (case-insensitive)                                        | package                                 | 0                                                                                  |
| `PROPOSAL` (case-insensitive)                                            | package                                 | 0                                                                                  |
| `§`                                                                      | `tests/**`, `guides/README.md`, `README.md` | 0                                                                                |
| `§`                                                                      | `src/**`                                | 1, `RFC 9110 §9.3.2` at src/server/helpers.ts:56, an external spec section the row excludes |
| `\bvia\b\|e\.g\.\|i\.e\.\|\bsimply\b\|\bjust\b\|\bshould\b\|\beasy\b\|\beasier\b` (case-insensitive) | `src/**`, `guides/middleware.md`, `tests/**`, `README.md` | 0 |
| `\b(above\|below)\b`                                                     | `src/**`                                | 1, the numeric comparison at src/core/helpers.ts:397                                |
| `\b(above\|below)\b`                                                     | `guides/middleware.md`                  | 2, the onion-position uses at :373 and :824                                        |
| `^import (type )?`                                                       | `src/**`, `tests/**`                    | every file's type imports precede its value imports                                 |
| `^\t+(function \|const \w+.* = (async )?(function\|\(\|<\|\w+ =>))`      | `tests/**`                              | 3 after the fix, all parenthesized expressions rather than functions (`distribution.test.ts:444`, `factories.test.ts:28`, `setupPolicy.ts:1189`); before the fix the same pattern also matched `tests/src/core/helpers.test.ts:358` |
| same                                                                     | `src/**`                                | 1, the parenthesized expression at src/core/middlewares.ts:519                       |
| `^\treadonly [a-z]` (class data fields)                                  | `src/**`                                | 1 class field, `MultipartError.code`, which is the mandated error-class member       |

## Breaking

Both breaking rows reach `@orkestrel/middleware/server` only, and no package in the fleet closure
declares `@orkestrel/middleware`. I re-ran the consumer check: grepping every `*/package.json` under
`/home/user/fleet` for `"@orkestrel/middleware"` matches only this package's own manifest, and the
only other fleet mention is the comment at `/home/user/fleet/mcp/src/server/middlewares.ts:30`
disclaiming the dependency. So there is no fleet consumer edit to carry, and the edits below are for
registry consumers, whom this checkout cannot enumerate.

### `UploadedFileInput` removed (middleware-obj-6)

- Symbol: `UploadedFileInput`, a published type of `@orkestrel/middleware/server`.
- Change: deleted. `createUploadedFile` now takes `UploadedFile`, which the deleted type was
  structurally identical to.
- Consumers: none in the fleet closure; registry consumers unknown to this checkout.
- Consumer edit: replace the import and every annotation.

  ```ts
  // before
  import type { UploadedFileInput } from '@orkestrel/middleware/server'
  const record: UploadedFileInput = { field, name, size, mime, validated, status, path }

  // after
  import type { UploadedFile } from '@orkestrel/middleware/server'
  const record: UploadedFile = { field, name, size, mime, validated, status, path }
  ```

  No value moves: every object literal that satisfied `UploadedFileInput` satisfies `UploadedFile`
  unchanged, and `createUploadedFile`'s call sites need no edit at all.

### `multipartBoundary` renamed to `extractMultipartBoundary` (middleware-subj-14)

- Symbol: `multipartBoundary`, a published function of `@orkestrel/middleware/server`.
- Change: renamed in place in `helpers.ts`. Signature unchanged:
  `(contentType: string | null) => string | undefined`.
- Consumers: none in the fleet closure; registry consumers unknown to this checkout.
- Consumer edit: rename the import and every call site.

  ```ts
  // before
  import { multipartBoundary } from '@orkestrel/middleware/server'
  const boundary = multipartBoundary(request.headers.get('content-type'))

  // after
  import { extractMultipartBoundary } from '@orkestrel/middleware/server'
  const boundary = extractMultipartBoundary(request.headers.get('content-type'))
  ```

## Shared-file patches

None. No row obliged an edit outside Owned, and I made none. The vendored dependency guide mirrors
under `guides/` carry the same `AGENTS §N` citations that middleware-subj-1 removes from this
package's own files, and they are correctly outside this unit: they are fetched bytes, and
`.claude/rules/documentation.md` § Parity says to refresh a mirror rather than rewrite it.

## Deviations

No deviation in the deviation contract's sense: no row's repair contradicted a rule, collided with a
name, required a file outside Owned, or required a consumer edit to keep this package's gates green.
The unit ran to completion.

The following are ancillary decisions and observations, recorded rather than escalated.

### The extra nested-function site (decided and carried, under middleware-obj-2)

§ Method step 5 requires the post-implementation sweep to end with no nested function. My sweep
pattern `^\t+(function |const \w+.* = (async )?(function|\(|<|\w+ =>))` over `tests/**` found one
site the refuter's narrower `^\t\t+const \w+ = (` could not reach, because it sits at one tab:
`tests/src/core/helpers.test.ts:358` assigned `const compress = async (bytes, encoding) => …` inside
the `describe('compressResponse', …)` callback. It is the same class as the row's confirmed sites,
it is pre-existing rather than the predecessor's, and it is in an Owned file.

It also reimplemented a shipped helper. `compressBytes`, exported from `src/core/helpers.ts:262`,
has that exact body and exactly the declared parameter type
`(bytes: Uint8Array<ArrayBuffer>, encoding: Exclude<Encoding, 'identity'>) => Promise<Uint8Array<ArrayBuffer>>`
that `CompressResponseOptions.compress` at src/core/types.ts:92 requires, and
`createCompression` itself passes `compress: compressBytes` at src/core/middlewares.ts:204. So the
repair is a deletion, not a move to `tests/setup.ts`: I deleted the local fixture and wrote
`compress: compressBytes` at every option site in that describe.

The proof is a placement proof, per § Method step 2's clause for a placement row. The sweep read one
hit before and zero after, and `test:src:core` reports 7 files and 270 tests passed
(`/home/user/work/evidence/middleware-proofs/obj-2-compress-after.txt`).

### `ByteRange`'s position in `src/server/types.ts` (decided and carried)

The finder's repair asked for "the alphabetical position the file already keeps". That file keeps no
alphabetical order — its declarations run `Asset`, `AssetSourceInterface`, `AssetOptions`,
`StaticOptions`, `MultipartLimitsInput`, `MultipartLimits`, `MultipartOptions`,
`MultipartErrorCode`, `UploadStatus`, `UploadedFile`, `PartHeaders`, `ByteRange`,
`NodeCompressionOptions` — so the clause is inapplicable. `ByteRange` sits where
`UploadedFileInput` was, between `PartHeaders` and `NodeCompressionOptions`, among the
file-streaming declarations it serves. This is an ancillary placement question the contract leaves
to the executor.

### Findings outside this unit's scope

Recorded against the capability that owns them, for a later change, rather than reopened here.

- **A duplicate guard proof.** `tests/src/core/middlewares.test.ts:1199` declares
  `describe('isMultipartBody', …)` with acceptance and rejection cases, which
  `tests/src/core/validators.test.ts:117` now also holds after middleware-obj-3. It is pre-existing
  and unchanged by this unit, and middleware-obj-3's confirmed population named only the two
  `helpers.test.ts` files. It belongs to obj-3's capability — one guard proof per guard, in the
  mirrored `validators.test.ts` — and the repair is to delete the `middlewares.test.ts` block.
- **A causal `since`.** `src/server/helpers.ts:511` reads `since `enqueue` returns synchronously`.
  `.claude/rules/writing.md` § Substitutions requires `because` for the causal sense. No row in this
  brief covers that substitution row, and my mandated sweeps did not include it; I found it while
  reading the `streamFile` block for middleware-subj-13. It belongs to the subj-9 through subj-12
  substitution capability.

## Evidence files

Regenerated after the edit and after the gate chain, with the one plain command
`node /home/user/scaffold/tmp/work/evidence.mjs middleware`:

- `/home/user/work/evidence/conform-middleware.diff` — 4583 lines
- `/home/user/work/evidence/conform-middleware.status` — 27 entries, every one under Owned

## Fix round 1

Closing the first audit round's refutations of claims 4 and 9, and its findings F1, F2, O-1, O-2.
Row middleware-fix1-1 is not fully closed — see § Deviation below — so the round stops there
rather than completing the gate chain.

### middleware-fix1-1 (claim 4) — failing-first controls

| Row | Control | Red | Green |
| --- | --- | --- | --- |
| middleware-obj-2 | `destroy()` on `buildSymlinkFixture`'s returned fixture, planted as a no-op, proved by `tests/setupServer.test.ts` (`buildSymlinkFixture` describe), `npm --prefix /home/user/fleet/middleware test -- -t buildSymlinkFixture --project setup` | `/home/user/work/evidence/middleware-proofs/obj-2-control-red.txt` — 1 failed \| 16 skipped (17) | `/home/user/work/evidence/middleware-proofs/obj-2-control-green.txt` — 1 passed \| 16 skipped (17) |
| middleware-obj-4 | `decompress`, planted to append `-wrong` to its decoded text, proved by `tests/setup.test.ts` (`decompress` describe), both scoped with `-t decompress --project setup` | `/home/user/work/evidence/middleware-proofs/obj-4-control-red.txt` — 1 failed \| 1 passed \| 17 skipped (19) | `/home/user/work/evidence/middleware-proofs/obj-4-control-green.txt` — 2 passed \| 17 skipped (19) |
| middleware-obj-3, validators | `isSessionControl`'s `regenerate` check inverted (`===` → `!==` at `src/core/validators.ts:50`), proved by `tests/src/core/validators.test.ts` (`isSessionControl` describe), `--project src:core` | `/home/user/work/evidence/middleware-proofs/obj-3-validators-control-red.txt` — 2 failed \| 12 passed (14) | `/home/user/work/evidence/middleware-proofs/obj-3-validators-green.txt` — 14 passed (14) |
| middleware-obj-3, parsers | `parseMultipartRequest`'s boundary guard inverted (`===` → `!==` at `src/server/parsers.ts:57`), proved by `tests/src/server/parsers.test.ts`, `--project src:server` | `/home/user/work/evidence/middleware-proofs/obj-3-parsers-control-red.txt` — 35 failed \| 1 passed (36) | `/home/user/work/evidence/middleware-proofs/obj-3-parsers-green.txt` — 36 passed (36) |
| middleware-obj-3, MultipartParser | The preamble-cap check inverted (`>` → `<` at `src/server/MultipartParser.ts:68`), proved by `tests/src/server/MultipartParser.test.ts`, `--project src:server` | `/home/user/work/evidence/middleware-proofs/obj-3-multipart-control-red.txt` — 1 failed \| 7 passed (8) | `/home/user/work/evidence/middleware-proofs/obj-3-multipart-green.txt` — 8 passed (8) |

**Fix round 1, part b.** Took `middleware-obj-3`'s three readings the first fix round's row
middleware-fix1-1 could not plant, because obj-3's subjects (`src/core/validators.ts`,
`src/server/parsers.ts`, `src/server/MultipartParser.ts`) sat outside that round's Owned scope. The
standing condition from `conform-middleware-fix1b-brief.md` still holds: `npm run check` and
`npm test` redden at `tests/setup.ts:369`, `tests/src/core/factories.test.ts:167,170`, and
`tests/src/core/stores/DatabaseSessionStore.test.ts:225` (`TableInterface<unknown>` not assignable
to `TableInterface<SessionRow>`) and at runtime with `DatabaseError: Driver schema is invalid`,
caused by the not-yet-landed `@orkestrel/database` consumer edit sitting beside the landed
`@orkestrel/contract`; this unit did not touch it. Every plant here was reverted to its exact prior
text; `git -C /home/user/fleet/middleware diff --stat -- src/core/validators.ts src/server/parsers.ts
src/server/MultipartParser.ts` shows only the predecessor's pre-existing `src/server/parsers.ts`
hunk (the `extractMultipartBoundary` rename and a TSDoc substitution), no hunk from this round.

Both plants were reverted to their exact prior text after their green reading; `git -C
/home/user/fleet/middleware diff -- tests/setup.ts tests/setupServer.ts` carries no hunk from
this round beyond the predecessor's own, confirmed by the absence of the plant's marker comment
(`fix1-plant`) anywhere in the tree.

### middleware-fix1-2 (claim 9, F1)

**`src/server/helpers.ts` row, extended:** `extractMultipartBoundary` rename; `range?: ByteRange`;
`createUploadedFile(input: UploadedFile)`; `streamFile` `@remarks` names `source`; `moveUploadedFile`
`@remarks` records the device-probe condition; TSDoc substitutions; **`moveUploadedFile`'s `EXDEV`
guard narrows with `isError` rather than `isRecord`.**

**`middleware-obj-7` note, extended:** proving the branch found it unreachable under `isRecord`
(`src/server/helpers.ts:16,629` now imports and calls `isError` from `@orkestrel/contract` in place
of the committed tip's `isRecord`); the repair is the guard change at `src/server/helpers.ts:629`;
`obj-7-exdev-before.txt` is that repair's failing-first control, not only the test-side `it.runIf`
repair's.

### Behaviour change

Before this change, `moveUploadedFile` rejected on a cross-device rename because its `catch` guard
narrowed the caught value with `isRecord`, which refuses every `node:fs` rejection (`node:fs`
errors are `Error` instances, which `isRecord` does not admit), so the `EXDEV` fallback beneath it
was dead code. The guard now narrows with `isError`, so `moveUploadedFile` copies and unlinks
across a device boundary when `rename` reports `EXDEV`, as its `@remarks` already claimed. No fleet
package declares `@orkestrel/middleware` (§ Breaking reproduces the check), so this reaches no
fleet consumer; a registry consumer of `@orkestrel/middleware/server` whose cross-device
`moveUploadedFile` call used to reject now gets a copy-and-unlink, and reads this behaviour in the
release notes rather than in a consumer-edit block, because no signature moved.

### middleware-fix1-3 (claim 3's record)

`\bSECRET\b` over `src`, `tests`, `guides/middleware.md`, `guides/README.md`, `README.md`:

```
tests/setupServer.ts:145:			'.env': 'SECRET=hidden',
tests/src/server/middlewares.test.ts:363:			expect(await allowResponse.text()).toContain('SECRET')
tests/src/server/middlewares.test.ts:572:				'.env': 'SECRET=hidden',
tests/setupServer.test.ts:83:			expect(readFileSync(fixture.dotfilePath, 'utf8')).toBe('SECRET=hidden')
```

Four hits, each a fixture literal (`SECRET=hidden` in a built `.env` fixture, or an assertion
reading it back) — none is the moved module constant. The moved declaration is `TEST_SECRET`; its
word-boundary declaration sweep (`const TEST_SECRET`) over the same paths returns exactly one hit:

```
tests/setup.ts:27:export const TEST_SECRET = 'test-secret'
```

`TEST_SECRET` also appears as an import/use at `tests/src/core/factories.test.ts`,
`tests/src/core/middlewares.test.ts`, and `tests/setup.test.ts` — consumption of the one exported
declaration, not a second declaration.

### middleware-fix1-4 (F2, O-2)

`src/server/helpers.ts:511` now reads `all, because \`enqueue\` returns synchronously)`. Closed.

### middleware-fix1-5 (O-1)

`tests/src/core/validators.test.ts:117-148`'s `isMultipartBody` describe asserts nothing
`tests/src/core/middlewares.test.ts:1199-1224`'s block did not already assert: the well-formed
accept case, the `{ name: <non-string> }` field-shape rejection, and the `null` rejection are all
present in `validators.test.ts` (the `{ name: 42 }` vs. `{ name: 1 }` values differ only in which
non-string number is used, same type-mismatch assertion). Deleted the `middlewares.test.ts` block
and its now-unused `isMultipartBody` and `MultipartBody` imports (`middlewares.test.ts:6,31`, since
removed).

## Deviation (fix round 1)

**Expected.** Row middleware-fix1-1 names three rows — `middleware-obj-2`, `-obj-3`, `-obj-4` —
each with a helper or fixture the row moved into `tests/setup.ts` or `tests/setupServer.ts`, to
plant wrong and read red. The gate chain was expected to close green afterward.

**Found, obj-3.** Reading `middleware-obj-3`'s Repair in `conform-middleware-brief.md:59-65`: it
creates `tests/src/core/validators.test.ts`, `tests/src/server/parsers.test.ts`, and
`tests/src/server/MultipartParser.test.ts`, and moves assertions out of the two `helpers.test.ts`
files into them. No helper or fixture from this row lands in `tests/setup.ts` or
`tests/setupServer.ts` — the only two files this round's Owned scope permits a plant in. Every
symbol the row's new test files exercise (`isMultipartBody`, `isSession`, `isSessionControl`,
`parseMultipartRequest`, `MultipartParser`) lives in `src/core/validators.ts`, `src/server/parsers.ts`,
or `src/server/MultipartParser.ts`, none of which this brief's Scope names as Owned (Owned names only
`src/server/helpers.ts`, and only for row middleware-fix1-4). I made no edit to any off-limits file
to force a plant.

**Found, the gate chain.** `npm --prefix /home/user/fleet/middleware run check` exits 2:
`/home/user/work/evidence/middleware-proofs/fix1-check.txt` reports `TableInterface<unknown>` not
assignable to `TableInterface<SessionRow>` at `tests/setup.ts:369`, `tests/src/core/factories.test.ts:167,170`,
and `tests/src/core/stores/DatabaseSessionStore.test.ts:225` — every site inside `buildStore` or a
`buildStore` call, none touched by this round's rows. `npm --prefix /home/user/fleet/middleware
test` fails the same way at runtime: `/home/user/work/evidence/middleware-proofs/obj-4-baseline-check.txt`
and `obj-4-baseline-check2.txt`, taken on the tree with every plant already reverted, both read `3
failed | 32 passed (36)` in the `setup` project, each failure `DatabaseError: Driver schema is
invalid` inside `node_modules/@orkestrel/database`'s `cloneDriverSchema`. The predecessor's own
`gate-test.txt` (13:24 UTC, before this session touched anything) carries no such failure and no
`buildStore` mention. `format:check` (`fix1-format-check.txt`), `lint:check`
(`fix1-lint-check.txt`), and `build` (`fix1-build.txt`) each still exit 0.

**Evidence.** `/home/user/work/evidence/middleware-proofs/fix1-check.txt`,
`obj-4-baseline-check.txt`, `obj-4-baseline-check2.txt`, `gate-test.txt` (pre-existing, no failure).

**Done / not done.** Rows middleware-fix1-2 through -fix1-5 are done, applied to the report and the
tree respectively. Row middleware-fix1-1 is two-thirds done (obj-2, obj-4); obj-3 is not done. The
gate chain step of § Method is not done: `format:check`, `lint:check`, and `build` read 0;
`check` and `test` read nonzero, on a cause this round's rows do not touch.

**Hypothesis.** The Host section's `node_modules` re-stage at 15:22 UTC on 2026-09-03 landed a
`@orkestrel/database` build whose `TableInterface` type or driver-schema runtime check disagrees
with the shape `buildStore` (`tests/setup.ts:363-`, the predecessor's own middleware-obj-4 addition)
passes it, after the report's original green `check`/`test` readings were taken against the closure
staged before that re-stage.

## Fix round 2

Closing the round-2 objective lane's findings F-1 to F-3 (`units/l2b/middleware-objective-r2.md`).

### F-1

Rewrote both comments to the rule's form: `tests/setup.test.ts:302` reads `// so the preceding
eviction is the given \`ttl\` and not the default.`; `tests/src/core/stores/DatabaseSessionStore.test.ts:23`
reads `// session it produces, so a store using its own step fails the following proof.`

Sweep, case-insensitive `\b(above|below)\b` over `tests/**` excluding `node_modules/**` and the
vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`):

| Site | Sense | Disposition |
| --- | --- | --- |
| `tests/setup.test.ts:302` | document reference | repaired, see preceding |
| `tests/src/core/stores/DatabaseSessionStore.test.ts:23` | document reference | repaired, see preceding |
| `tests/src/core/helpers.test.ts:358,381,460,497` | numeric threshold comparison | stays |
| `tests/src/server/middlewares.test.ts:1159` | numeric threshold comparison | stays |
| `tests/src/server/MultipartParser.test.ts:110` | numeric length comparison, the brief's own excluded example | stays |
| `tests/src/core/stores/MemorySessionStore.test.ts:130` | numeric capacity comparison | stays |
| `tests/guides.test.ts:2,40` | document reference | pre-existing, not one of this unit's two added pointers, outside this round's Owned files; left unedited |
| `tests/src/server/middlewares.test.ts:1182` | document reference | pre-existing, outside this round's Owned files; left unedited |
| `tests/src/core/middlewares.test.ts:1905` | document reference | pre-existing, outside this round's Owned files; left unedited |

The objective is the two pointers this unit added; both are repaired. The remaining document-reference
hits predate this unit's edits to their files and sit outside this round's Owned scope, so they are
recorded here rather than changed.

### F-2

Rewrote § Outcome's gate sentence and added the dated note before § Gates, both stating the table's
readings were taken at the pre-fix-round staging, that `check` and `test` later read nonzero on the
cause § Deviation (fix round 1) records, that the Orchestrator's `check` at 18:46 UTC on the 17:53
UTC re-stage exits 0, and that the deciding run is the Orchestrator's at landing. Regenerated the
§ Files touched diffstat from `git -C /home/user/fleet/middleware diff --stat`: 27 files changed,
1993 insertions(+), 1330 deletions(-).

### F-3

Added the exact command to the `middleware-obj-2` control row: `npm --prefix
/home/user/fleet/middleware test -- -t buildSymlinkFixture --project setup`, read from the `setup`
project tag in `obj-2-control-red.txt`'s header.

### Gates, this round, on the closure re-staged at 17:53 UTC

| Command | Exit | Reading |
| --- | --- | --- |
| `npm --prefix /home/user/fleet/middleware run format:check` | 0 | `All matched files use the correct format.` 69 files. |
| `npm --prefix /home/user/fleet/middleware run lint:check` | 0 | No diagnostic emitted. |
| `npm --prefix /home/user/fleet/middleware run check` | 0 | Root `tsc`, then `check:src:core`, then `check:src:server`, each silent. |
| `npm --prefix /home/user/fleet/middleware run build` | 0 | `dist/src/core` and `dist/src/server` built in ES and CJS with declarations. |
| `npm --prefix /home/user/fleet/middleware test` | 0 | `src` 432 passed \| 1 skipped (433); `policy` 111; `config` 46; `setup` 36; `guides` 38. |

### Audit

`cd /home/user/fleet/middleware && npx scaffold audit --offline` prints the single zero-drift line:
`0 of 39 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and
nothing at 9.`

### Evidence

`node /home/user/scaffold/tmp/work/evidence.mjs middleware` regenerated
`/home/user/work/evidence/conform-middleware.diff` (4624 lines) and
`/home/user/work/evidence/conform-middleware.status` (27 entries, every one under Owned).
`git -C /home/user/fleet/middleware status --short` lists 27 entries, all inside Owned.
