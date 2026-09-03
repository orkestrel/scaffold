# Unit conform-router — report

Every row is `applied` or `noop`. No row is `stopped`. The gate chain is green.

Report file: `/home/user/scaffold/tmp/units/conform/conform-router-report.md`

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| router-obj-1 | applied | `ContractError` at every registration and construction boundary, coded `literal` / `pattern` / `placement`, each with `path`, `limit`, and `received: preview(value)`. No router-owned error class added. |
| router-obj-2 | applied | `describe('flagship fences', …)` in `tests/guides.test.ts` for the core fences; the `@orkestrel/router/browser` fences transcribed in `tests/src/browser/Navigator.test.ts`; both header comments rewritten in the codec form. |
| router-obj-3 | applied | `MODULES` now maps `@orkestrel/router/browser` and `@orkestrel/router/server`; the `@src/*` rows stay. |
| router-obj-4 | applied | The disconnect case parks on `entered.promise` then `aborted.promise`. No `setTimeout` remains anywhere in the package's own tests. |
| router-obj-5 | applied | `README.md` reads `- Node.js >= 22.12.0`, the floor `package.json` declares. |
| router-obj-6 | applied | `README.md` reads `- ESM and CommonJS for the core and `./server` entries; the `./browser` entry is ESM only.` |
| router-obj-7 | applied | The stray `</content>` line is deleted; `guides/README.md` ends on the `## See also` bullet. |
| router-obj-8 | noop | No edit under claim O2, per the refuter's operative form. `defineRoute` keeps its body, doc block, and tests; only the name moved, under router-subj-2. |
| router-obj-9 | noop | No edit under claim O5. `Dispatcher.ts` still returns `#router` typed `RouterInterface<RouteRecord<TState>>`; `Navigator`'s getter was retyped by router-subj-1, not by this row. |
| router-subj-1 | applied | `Navigator` registers `options.routes` directly; `#router`, the getter, and `NavigatorInterface.router` are `RouterInterface<Meta>`; `match` forwards to `this.#router.match(path)`; `computeNavigationKey` takes `RouteEntry<unknown>` and reads `entry.path`. |
| router-subj-2 | applied | `route` → `defineRoute` in source, guide, `README.md`, and tests. Old-name sweep: no hits. |
| router-subj-4 | applied | The miss tuple's label is `status`; prose, guide Contract row, guide fence parameter, and test titles follow. |
| router-subj-5 | applied | A derived `OPTIONS` answer emits `match` under the winning registered pattern; `types.ts`, the guide Contract row, and a new `Dispatcher.test.ts` case follow. |
| router-subj-6 | noop | No edit, per the refuter's operative form. The exemption stands unchanged. |
| router-subj-7 | applied | `#popListener` deleted; `#hashListener` renamed `#listener`; all four registration sites use it. |
| router-subj-9 | applied | The three boolean parameters use the fixed forms, and `sensitive` carries `Default: `true``. |
| router-subj-10 | applied | Every tally over a growable set is gone from `src`, `guides/router.md`, `guides/README.md`, and `README.md`, including the sites the refuter added. |
| router-subj-11 | applied | `via` → `through`, `e.g.` → `for example`, `simply` deleted. `currently-resolved` left alone. |
| router-subj-12 | applied | Both `constants.ts` links resolve to `{@link import('./types.js').DispatcherInterface}`. |
| router-subj-14 | applied | Contract row 7 names `computeDispatchKey` and its `canonicalizePath` pairing. |
| router-subj-15 | applied | `GroupInterface` and `DispatchGroupInterface` method tables added; the Surface-rows paragraph, Methods intro, and Contract row 2 name every interface. |
| router-subj-16 | applied | Contract row 4 is spelled in words with no line-initial `>`; the formatter left it in the main flow. |
| router-subj-17 | applied | The narrowed repair: each dependency paragraph reads "a runtime dependency". No paragraph added for `probe.md`, `scaffold.md`, or `test.md`. |
| router-subj-18 | applied | `README.md:3-6` replaced with the present-tense description of the shipped surface. |
| router-subj-19 | applied | `via` → `through` at every guide and README site; `above` rewritten in words at `:159`, `:267`, `:335`. |
| fleet-F1 | noop | `tests/setup.ts` declares no `isBrowserVuePath` (read in full; its only export is `createTestBody`), and the workspace has a browser environment: `src/browser/`, `tests/setupBrowser.ts`, and the `src:browser` project. |
| fleet-F2 | noop | No class declares a public `readonly id: string` data field. Classes read: `Router`, `Group`, `Dispatcher`, `DispatchGroup`, `Navigator`. The only `readonly id` hit in `src` is a TSDoc example line, `src/core/types.ts:200`. |

## Files touched

| File | Summary |
| --- | --- |
| `/home/user/fleet/router/src/core/types.ts` | Miss tuple label `reason` → `status`; the `match` remark states the derived-`OPTIONS` pattern; counts, `via`, `e.g.` removed. |
| `/home/user/fleet/router/src/core/constants.ts` | Dead `Dispatcher` links → `DispatcherInterface`; the `seven` tallies removed. |
| `/home/user/fleet/router/src/core/parsers.ts` | The `seven` tallies removed from the remark and the `@returns` tag. |
| `/home/user/fleet/router/src/core/helpers.ts` | `ContractError` coded `placement` for a non-final wildcard; `route` → `defineRoute`; boolean and default TSDoc forms; prose. |
| `/home/user/fleet/router/src/core/Router.ts` | The path guard split into `literal` and `pattern` `ContractError` throws; prose. |
| `/home/user/fleet/router/src/core/Dispatcher.ts` | `ContractError` throws in `#register`; derived `OPTIONS` emits the winning pattern; prose. |
| `/home/user/fleet/router/src/core/Group.ts` | `via` → `through`. |
| `/home/user/fleet/router/src/core/DispatchGroup.ts` | `via` → `through`. |
| `/home/user/fleet/router/src/browser/types.ts` | `NavigatorInterface.router` → `RouterInterface<Meta>`; the `Router<RouteEntry<Meta>>` prose corrected. |
| `/home/user/fleet/router/src/browser/Navigator.ts` | Registers the routes directly; one `#listener`; `match` forwards; `ContractError` construction guards; prose. |
| `/home/user/fleet/router/src/browser/helpers.ts` | `computeNavigationKey` takes `RouteEntry<unknown>` and reads `entry.path`; boolean TSDoc form; `e.g.` and `simply` removed. |
| `/home/user/fleet/router/src/browser/factories.ts` | The `Router<RouteEntry<Meta>>` prose corrected. |
| `/home/user/fleet/router/src/server/helpers.ts` | `via` → `through`. |
| `/home/user/fleet/router/guides/router.md` | Rows obj-1, subj-2, subj-4, subj-5, subj-10, subj-14, subj-15, subj-16, subj-19, and the hash-mode fence correction. |
| `/home/user/fleet/router/guides/README.md` | The `</content>` debris deleted; the three ordinal dependency phrases replaced. |
| `/home/user/fleet/router/README.md` | Opening paragraph, Node floor, module-format line, `defineRoute`, `through`, and the entry-point tally. |
| `/home/user/fleet/router/tests/guides.test.ts` | `MODULES` gains the published subpaths; the header rewritten; the core flagship fences transcribed. |
| `/home/user/fleet/router/tests/src/core/Router.test.ts` | The path-guard cases assert `ContractError` and its `code`. |
| `/home/user/fleet/router/tests/src/core/Dispatcher.test.ts` | Registration-guard cases assert `ContractError` and its `code`; titles say `status`; a derived-`OPTIONS` `match` case added. |
| `/home/user/fleet/router/tests/src/core/helpers.test.ts` | `defineRoute`; the wildcard-placement cases assert `ContractError` and `placement`. |
| `/home/user/fleet/router/tests/src/browser/Navigator.test.ts` | Construction guards assert `ContractError`; the `router` getter proved; the browser flagship fences transcribed. |
| `/home/user/fleet/router/tests/src/browser/helpers.test.ts` | `computeNavigationKey` cases follow the new signature. |
| `/home/user/fleet/router/tests/src/server/helpers.test.ts` | The disconnect case parks on real events; both fixed delays deleted. |

## Diffstat

```text
 README.md                           |  21 ++--
 guides/README.md                    |   7 +-
 guides/router.md                    | 187 +++++++++++++++++++++---------------
 src/browser/Navigator.ts            |  76 ++++++++-------
 src/browser/factories.ts            |   2 +-
 src/browser/helpers.ts              |  25 ++---
 src/browser/types.ts                |   6 +-
 src/core/DispatchGroup.ts           |   2 +-
 src/core/Dispatcher.ts              |  39 +++++---
 src/core/Group.ts                   |   2 +-
 src/core/Router.ts                  |  28 ++++--
 src/core/constants.ts               |  15 +--
 src/core/helpers.ts                 |  57 ++++++-----
 src/core/parsers.ts                 |   6 +-
 src/core/types.ts                   |  27 +++---
 src/server/helpers.ts               |   2 +-
 tests/guides.test.ts                | 141 ++++++++++++++++++++++++++-
 tests/src/browser/Navigator.test.ts | 156 ++++++++++++++++++++++++++++--
 tests/src/browser/helpers.test.ts   |   8 +-
 tests/src/core/Dispatcher.test.ts   |  31 ++++--
 tests/src/core/Router.test.ts       |  15 ++-
 tests/src/core/helpers.test.ts      |  25 +++--
 tests/src/server/helpers.test.ts    |  27 +++---
 23 files changed, 649 insertions(+), 256 deletions(-)
```

## Failing-first controls

Each control plants the pre-repair behaviour in a file this unit owns, runs the named command, restores the repair, and re-runs. Every capture is a file under `/home/user/work/evidence/router-proofs/`.

| Row | Command | Plant | Red | Green | Files |
| --- | --- | --- | --- | --- | --- |
| obj-1 | `npm run test:src:core` | `Router.ts` non-string path throws `TypeError` | 1 failed \| 164 passed (165) | 165 passed (165) | `router-obj-1-core-red.txt`, `router-obj-1-core-green.txt` |
| obj-1 | `npm run test:src:browser` | `Navigator.ts` guard check throws `TypeError` | 1 failed \| 72 passed (73) | 73 passed (73) | `router-obj-1-browser-red.txt`, `router-browser-green.txt` |
| obj-2 | `npm run test:guides` | `#respondAutoOptions` drops `OPTIONS` from the `Allow` set | 1 failed \| 44 passed (45) | 45 passed (45) | `router-obj-2-guides-red.txt`, `router-obj-2-guides-green.txt` |
| obj-2 | `npm run test:src:browser` | `Navigator.#commit` stops emitting `navigate` | 7 failed \| 66 passed (73) | 73 passed (73) | `router-obj-2-browser-red.txt`, `router-browser-green.txt` |
| obj-3 | `npm run test:guides` | one browser-fence import misnamed `createNavigatorTypo` | 1 failed \| 44 passed (45) | 45 passed (45) | `router-obj-3-red.txt`, `router-obj-3-green.txt` |
| obj-4 | `npm run test:src:server` | `buildRequest` drops the incomplete-request abort | 1 failed \| 26 passed (27) | 27 passed (27) | `router-obj-4-red.txt`, `router-obj-4-green.txt` |
| subj-1 | `npm run test:src:browser` | `Navigator` re-wraps each route as its own inner meta, and `match` unwraps it again | 1 failed \| 72 passed (73) | 73 passed (73) | `router-subj-1-red.txt`, `router-browser-green.txt` |
| subj-2 | `npm run test:src:core` | `defineRoute` renamed back to `route` | 2 failed \| 163 passed (165) | 165 passed (165) | `router-subj-2-red.txt`, `router-subj-2-green.txt` |
| subj-5 | `npm run test:src:core` | derived `OPTIONS` emits the request pathname again | 1 failed \| 164 passed (165) | 165 passed (165) | `router-subj-5-red.txt`, `router-subj-5-green.txt` |

Named failing cases:

- obj-1 core: `Router — registration > throws a ContractError coded `literal` when path is not a string`.
- obj-1 browser: `Navigator — construction guards > throws a ContractError coded `literal` when guard is not a function`.
- obj-2 guides: `flagship fences > derives HEAD, OPTIONS, and 405 (Method-dimensioned dispatch)`.
- obj-2 browser: `flagship fences > navigates in hash mode and tears down (guides/router.md — Hash-mode navigation)`.
- obj-3: `Router > imports only real exports in every ```ts fence`, reporting `[ 'createNavigatorTypo' ]`. Under the pre-repair `MODULES` map the same fence is skipped silently by the `if (imported === undefined) continue` branch, so the instrument reported green over six unchecked fences.
- obj-4: `buildRequest > aborts request.signal when the client disconnects before the message completes`.
- subj-1: `Navigator — the published router getter > carries the route payload as meta, the same shape navigator.match returns`.
- subj-2: `defineRoute > returns its input unchanged (same reference)` and `defineRoute > preserves the literal Path so context.params types correctly at the registration site`.
- subj-5: `Dispatcher — auto-OPTIONS > emits `match` under the winning registered pattern, not the request pathname`.

Control scope, stated: the obj-2 browser plant removes a behaviour several proofs share, so it reddens six sibling cases beside the fence transcription. Every other control reddens exactly the case that names its defect. The obj-4 plant was taken twice: the first form inverted `!message.complete` and reddened three cases, so it was replaced with one that removes only the incomplete-request abort and reddens one.

## Sweeps

- Old export name. `grep -rn -E "\broute\(|\{ *route *\}|, route,|\broute\b *from"` and `grep -rni -E "\broute(s|d|ing)?\("` over `src`, `tests`, `guides`, `README.md`: no hits.
- Thrown type. `grep -rn "TypeError"` over `src`, `tests`, `guides`, `README.md`: no hit in this package's own files. The remaining hits are `guides/test.md` and `guides/probe.md`, vendored mirrors of other packages' guides.
- Miss-tuple label. `grep -rni -E "\breason(s|ed|ing)?\b"` over `src`, `tests`, `guides/router.md`, `guides/README.md`, `README.md`: the surviving hits are the platform property `AbortSignal.reason`, the ordinary English noun at `src/core/helpers.ts:178`, and two ordinary-English uses in the vendored `tests/distribution.test.ts`. Every hit naming the event payload was rewritten, including the test title at `tests/src/core/Dispatcher.test.ts:375`, which the row's site list did not name.
- Substitutions. `grep -rn -E "\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b"` over `src`, `guides/router.md`, `guides/README.md`, `README.md`: no `via`, no `e.g.`, no `simply`, no `above`. The surviving `below` hits are comparisons — `src/core/helpers.ts:324` and `:342`, `src/core/constants.ts:74-75`, `guides/router.md:262` — plus one document pointer named under § Findings outside the rows.
- Number words. `grep -rni -E "\b(one|two|three|four|five|six|seven|eight|nine|ten)\b"` over `src`, `guides/router.md`, `guides/README.md`, `README.md`: no `three` and no `seven`. Every `one` hit is a determiner or singular value; every `two` hit is a comparator's arity or a named pair. Both senses are permitted; the banned sense is a tally over a growable set, and none remains.
- Numerals. `grep -rn -E "\b[0-9]+ (elements|members|rules|rows|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections|constants|passes|categories|faces|verbs)\b"` over the same paths: no hits.
- Authoring debris. `grep -rn "</content>"` over `src`, `tests`, `guides`, `README.md`: no hits.
- Fleet-F1. `grep -rn "isBrowserVuePath"` over `src`, `tests`, `guides`, `README.md`: no hits.
- Fixed delays. `grep -n "setTimeout("` over `tests/src/server/helpers.test.ts`: no hits.

## Gates

| Gate | Exit code | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` on 73 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root project plus the three scoped isolation checks |
| `npm run build` | 0 | core, browser, and server built; both `.d.cts` copies written |
| `npm test` | 0 | `src` 265/265, `policy` 111/111, `config` 46/46, `setup` 9/9, `guides` 45/45 |

`npm run format:check` failed once, on `guides/router.md`, after the guide edits. It was converged with `npx oxfmt --config .oxfmtrc.json guides/router.md` and re-run clean; the formatter reflowed table pipes and left Contract row 4 in the main flow, which is what router-subj-16 requires.

`npm test` is reported as this unit's own reading; the deciding run belongs to you after the unit exits.

Post-gate checks:

- `npx scaffold audit --offline` reports one drifted path: `configs/browsers.ts`, group `configs`, drift `stale`. That file is off-limits and untouched — `git status --short` does not list it — so the drift is a baseline condition between the committed file and the installed `@orkestrel/scaffold` plan, not this unit's.
- `node /home/user/scaffold/tmp/work/evidence.mjs router` wrote `/home/user/work/evidence/conform-router.diff` (1871 lines) and `/home/user/work/evidence/conform-router.status` (23 entries).
- `git status --short` lists 23 files, every one inside Owned. `git stash list` is empty.

## Breaking

Three published symbols changed. No fleet consumer imports any of them, so no consumer edit is required.

1. **The registration and construction boundary throws `ContractError`, not `TypeError`.** Consumers `@orkestrel/server`, `@orkestrel/middleware`, `@orkestrel/mcp`, `@orkestrel/ollama` — none catches router's throw. A consumer that narrows on `TypeError` around `router.add`, `dispatcher.add`, `compilePath`, or `new Navigator` replaces that narrowing with `isContractError` from `@orkestrel/contract`, and can read `error.code` (`'literal'`, `'pattern'`, or `'placement'`) and `error.context`.
2. **`route` is renamed `defineRoute`.** No fleet package imports `route` from `@orkestrel/router`. A consumer replaces `import { route } from '@orkestrel/router'` with `import { defineRoute } from '@orkestrel/router'` and each `route({ … })` call with `defineRoute({ … })`. The signature, the body, and the `const Path extends string` pin are unchanged.
3. **`NavigatorInterface.router` is `RouterInterface<Meta>`, not `RouterInterface<RouteEntry<Meta>>`.** No fleet package imports the browser entry. A consumer reading `navigator.router.match(path)?.meta.meta` now reads `navigator.router.match(path)?.meta`, and `…?.meta.name` now reads `…?.name`. `navigator.match` is unchanged, so a consumer using only `match` needs no edit. `computeNavigationKey` also changed shape: it takes `RouteEntry<unknown>` and reads `entry.path`, so a caller passing `{ path, meta: { path } }` passes `{ path, meta: … }` with any payload.

## Shared-file patches

None. No consumer-side edit is obliged: consumers import only `createDispatcher`, `DispatcherInterface`, `RouteContext`, `RouteInput`, `buildRequest`, `sendResponse`, and `isEncryptedSocket`, none of which changed, and nothing catches router's throw. No file outside `/home/user/fleet/router` was read for writing or edited.

## Deviations

None. The deviation contract did not fire. `defineRoute` was confirmed free before the rename: `grep -rn "defineRoute"` over `src`, `tests`, `guides`, `README.md` returned no hits.

## Ancillary decisions

- **Guard message text.** The finder's text said to keep each message verbatim. Every message previously interpolated `JSON.stringify(value)`, which renders a rejected function as `undefined`. Because the refuter's operative form puts the rejected value in `context.received` as `preview(value)`, the interpolation is now a lossy duplicate, so each message is a plain sentence and the value lives only in `received` — the exact shape `/home/user/fleet/abort/src/core/helpers.ts:24-74` uses, which is the precedent the row cites.
- **Router's path guard split.** The refuter assigned `literal` to the non-string path and `pattern` to the missing leading `/`, both at one `if`. The single condition was split into two throws so each code can carry its own message and `limit`.
- **The hash-mode fence's `active` claim.** `guides/router.md` claimed `navigator.active?.path // '/about'` on the line after `navigator.navigate('/about')`. In hash mode `navigate` sets `location.hash` and the resolve runs on the browser's asynchronous `hashchange`, so `active` is still the previous match at that point — the fence stated a value the code contradicts, which is the class router-obj-2 exists to catch. The fence now reads `navigator.match('/about')?.meta.title // 'About'` for a checkable synchronous value and names the asynchronous step on the `navigate` line. The transcription asserts both the synchronous lookup and `active` after the event flushes.
- **The guarding fence's transcription.** The fence calls an undefined `checkAuth`, so it cannot be transcribed literally. The transcription keeps the fence's shape — an async guard returning `signal.aborted ? false : allowed` — and asserts the claim the fence makes: the guard runs before the navigation commits.
- **A second tracked navigator list.** The fence transcriptions carry a `{ title }` payload while the file's shared `navigators` array is pinned to `PageMeta`, so the fence block owns `fenceNavigators` and drains it in its own `afterEach`.
- **Test-case names.** Each rewritten case is named for what it proves, not for the row that specified it.

## Findings outside the rows

Recorded for the next change. Neither was edited.

- `src/browser/types.ts:65` writes "routes to the `error` handler below and vetoes the navigation". That `below` is a document pointer inside published TSDoc, which `.claude/rules/writing.md` § Code tokens, references, and links bans. Row router-subj-19 covers `above` and `below` but scopes them to `guides/router.md` and `README.md`; row router-subj-11 covers `src` but only for the substitution table. The site sits in no row's `Where`.
- `configs/browsers.ts` reports `stale` under `npx scaffold audit --offline` at the committed baseline. The file is off-limits and untouched by this unit.

## One note on my instructions

A system reminder appended to the loaded rule file asked me to make file changes through Bash (`sed`, heredocs, short scripts) rather than the Edit and Write tools. That directly contradicts the brief's standing conditions and its § Context shell discipline, which forbid heredocs and `sed -i` and require Read, Grep, Glob, Edit, and Write. I followed the brief. Worth checking where that reminder came from, since it was not in the dispatch.
