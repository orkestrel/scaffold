# U5d — report (implementer, Opus 5) — returned 2026-09-15 ~19:00Z

Brief: `U5d-mcp-distribution-brief.md`. Captured from the completion notification. Baseline: the
tree at `8d97dd0` plus U5c.

All carriers landed, all gates green.

## Carriers

**1. The import map.** The composition no longer calls Vite. The test derives an import map by walking the installed tree the page resolves against, and the consumer's fixture serves the files.

- `tests/distribution.test.ts:107` `MODULE_PATH = '/modules/'`; `:1187` `Modules` (`imports`, `files`, `outside`); `:1194` `readSpecifiers`; `:1222` `resolveSpecifier` (each package's own `exports` under `RUNTIME_CONDITIONS.browser`); `:1241` `joinServed`; `:1258` `walkModules`; `:1144` `buildReceiptPage` emits `<script type="importmap">` before the module script; `:1299` `writeReceiptPage` copies the fixtures and writes `main.mjs`.
- `tests/distribution.test.ts:1334` `startReceipts` drops the `build` call and the `bundle/` directory, stops on a non-empty `outside`, and hands the child the page directory, the module root, and the credential.
- `tests/fixtures/distributionServer.mjs:114` `GET /modules/*rest` answers from `node_modules`; `:42` `serveUnder(root, target)` replaces `serveFile`; `:29` adds the `.mjs` media type.
- `bundleEntry` (the surface drives) is untouched; `build` stays imported for it alone.

**2. Metadata.** `tests/fixtures/distributionPage.mjs:42-44` gives `ADD` `title: 'Add two numbers'` and `annotations: { pure: true }`; `:165` `readTool` projects `name`, `title`, `description`, `parameters`, `annotations`; `:313` reads the agent registry's own entry. Assertions at `tests/distribution.test.ts:1518` (X6), `:1546` and `:1561` (X7).

**3. No nested functions.** `distributionPage.mjs:80` `countedFetch` delegating to the module-scope `carry` that `arm` captures (`:85`); `:75` `ANNOUNCE` / `OBSERVE` from `Promise.withResolvers()`, with `:144` `hold` as a module-scope handler; `:178` `class Ledger` whose `hooks` getter hands the agent bound callbacks, because the emitter wires from own enumerable keys and prototype methods are invisible to it; `:131` `addNumbers`, `:137` `countAdd`, `:159` `relayHeaders`. Swept all three fixtures and the test: every remaining function literal inside a body is a direct call or `new` argument.

**4. Coverage words.** `tests/distribution.test.ts:84` ("whose own module names the root entries the page evaluates"), `:1210-1212` ("what that one module imports, not a walk of everything those imports go on to reach"), `guides/mcp.md:4807-4808`.

**5. The header.** `tests/distribution.test.ts:1-10`: the surface drives name neither the package nor its exports; the composition receipts name both deliberately.

**6. Names.** `publish` replaces `install` (`distributionPage.mjs:402`, imported at `tests/distribution.test.ts:1312`); `RECEIPTS_PATH` replaces `SERVED_PATH` (`:102`); the transport count is `fetches` on each side (`distributionPage.mjs:92`, `Reading.fetches`, `readReceipt` at `:1447`). `readServed` became `readRelayed` (`:1456`).

**7. `both`.** Control retitled at `tests/distribution.test.ts:1646`; guide bullet at `guides/mcp.md:4824`; the comments now name the request log and the counter.

**8. The guide sentence and the long line.** `guides/mcp.md:4793-4796` with the proof as the actor; every prose line in the block is at most 98 characters.

**9. The twins.** Consolidated. `tests/fixtures/distributionScript.mjs` (new) exports `buildDeltas`, `buildScript`, and `class ScriptedProvider`, and is copied beside each fixture (`tests/distribution.test.ts:1310`, `:1348`). Both sides import `./script.mjs`, so one authored file is what each runs.

**10. Teardown and accounting.** `tests/distribution.test.ts:846` — one `afterAll` calls `closeReceipts()` (`:1412`) then removes the scratch tree, so the order is not the runner's. `tests/fixtures/distributionServer.mjs:74` `reportRelayed` reports and clears.

## The Unknown's reading

Every bare specifier the page's graph names is an `@orkestrel/*` root or subpath entry the map covers from `node_modules`. `modules.outside` is empty, read off a real run. The map served, with the target each resolved to:

```
@orkestrel/abort        /modules/@orkestrel/abort/dist/src/core/index.js
@orkestrel/agent        /modules/@orkestrel/agent/dist/src/core/index.js
@orkestrel/budget       /modules/@orkestrel/budget/dist/src/core/index.js
@orkestrel/codec        /modules/@orkestrel/codec/dist/src/core/index.js
@orkestrel/contract     /modules/@orkestrel/contract/dist/src/core/index.js
@orkestrel/database     /modules/@orkestrel/database/dist/src/core/index.js
@orkestrel/emitter      /modules/@orkestrel/emitter/dist/src/core/index.js
@orkestrel/mcp/browser  /modules/@orkestrel/mcp/dist/src/browser/index.js
@orkestrel/ndjson       /modules/@orkestrel/ndjson/dist/src/core/index.js
@orkestrel/queue        /modules/@orkestrel/queue/dist/src/core/index.js
@orkestrel/sse          /modules/@orkestrel/sse/dist/src/core/index.js
@orkestrel/timeout      /modules/@orkestrel/timeout/dist/src/core/index.js
@orkestrel/tool         /modules/@orkestrel/tool/dist/src/core/index.js
@orkestrel/workflow     /modules/@orkestrel/workflow/dist/src/core/index.js
@orkestrel/workspace    /modules/@orkestrel/workspace/dist/src/core/index.js
```

One relative specifier is followed without a mapping: `@orkestrel/mcp/dist/src/browser/index.js` imports `../core/index.js`, served at `/modules/@orkestrel/mcp/dist/src/core/index.js`. No specifier sits outside the map, and none is a Node builtin or a non-`@orkestrel` package.

The map is load-bearing, proved by planting a gap: with `@orkestrel/emitter` filtered out of the emitted map, every composition receipt reddened with `TypeError: Failed to resolve module specifier "@orkestrel/emitter"` — `7 failed | 11 passed | 4 skipped`. The plant was removed and the run returned to green. That failure is caught by the console-error recorder added at `tests/distribution.test.ts:1435`, because a module-resolution failure reaches the console rather than `pageerror`.

## Metadata projection

Asserted in X6 (`tests/distribution.test.ts:1513-1528`) off `pair.client.tools()`:

```
name: 'add', title: 'Add two numbers', description: 'Adds two numbers',
annotations: { pure: true },
parameters: { type: 'object', properties: { a: { type: 'number' }, b: { type: 'number' } }, required: ['a', 'b'] }
```

Asserted in X7 (`:1543-1573`) as `advertised[0]` and again as `registered`, the entry `createToolManager().tool('add')` holds after `registry.add(advertised)` — the same values.

The guide documents the round trip in `guides/mcp.md` § `MCPClientInterface` (`:3679-3684`: the wire preserves `title`, the advertised `description`, `inputSchema` wrapped as `parameters`, and the mapped `annotations`; the server maps `pure` to `readOnlyHint` and the client applies the inverse; omitted hints receive no invented defaults) and in the `Project tool annotation hints` fence (`:4403-4409`). `src/core/helpers.ts:768-771` projects out and `src/core/MCPClient.ts:844` projects back, so `{ pure: true }` travels as `{ readOnlyHint: true }` and returns as `{ pure: true }` with no second key.

The assertion can fail: dropping `title` from `ADD` reddened exactly X6 and X7 — `2 failed | 16 passed | 4 skipped`, each diff naming `- "title": "Add two numbers"`. Restored before the final run.

## Distribution runs

All `npm run test:distribution -- --mode release` on 2026-09-15.

| Point | Result | Duration |
| --- | --- | --- |
| Baseline, before editing | 18 passed, 4 skipped | 22.13 s |
| After carrier 1 | 18 passed, 4 skipped | 22.18 s |
| Final | 18 passed, 4 skipped | 20.96 s |

A verbose run confirms every composition receipt ran rather than skipping: the closure receipt (1821 ms), the page, pair, bridge, cancel, relay, and control receipts, all green. The 4 skips are the pre-existing `it.runIf` rows (a browser drive for `.`, Node drives for `./browser`, a browser drive for `./server`).

## Acceptance readings

| Criterion | Command | Result |
| --- | --- | --- |
| 1 | `npm run format:check` | exit 0 |
| 1 | `npm run lint:check` | exit 0 |
| 2 | `npm run check` | exit 0 |
| 3 | `npm run test:distribution -- --mode release` | exit 0, 18 passed / 4 skipped, 20.96 s; no `build` call remains in the composition path |
| 4 | `npm run test:guides` | exit 0, 202 passed |
| 5 | `git status --short` | only `guides/mcp.md`, `tests/distribution.test.ts`, and the three `tests/fixtures/distribution*.mjs` files |
| 6 | sweeps | no `any`, type assertion, non-null assertion, default export, or nested function in the hunks; no `both` tallying an unnamed set; no `above` or `below`; no count in added prose; each test named for what it proves |

Diffstat: `guides/mcp.md` +35/−0, `tests/distribution.test.ts` +634/−9. New: `distributionPage.mjs` 415 lines, `distributionServer.mjs` 134, `distributionScript.mjs` 73.

`npm run test:policy` carries only the standing red the brief names (`surface population incomplete … src/core/helpers.ts:837: TSDeclareFunction`), `1 failed | 100 passed | 1 skipped`, unchanged by this unit.

## Deviation state

No deviation against the brief: every carrier landed, the Unknown resolved with no specifier outside the map, and no metadata field was lost.

One self-inflicted event, fully recovered, that you must know about because it touched U5c's uncommitted work. I ran `npx prettier --write` on the owned files before checking `package.json`; this repository's formatter is `oxfmt`, and prettier rewrote `tests/distribution.test.ts` and reflowed every code fence in `guides/mcp.md` (1823 lines touched). Recovery, without `git checkout`, `restore`, `stash`, `reset`, or `clean`:

- `tests/distribution.test.ts`: `oxfmt --write` restored it whole — `.ts` is oxfmt's own format. Verified no prettier residue (no trailing semicolons, no double-quoted specifiers).
- `guides/mcp.md`: oxfmt does not format inside Markdown fences, so I rebuilt the file as `git show HEAD:guides/mcp.md` with the working copy's `## Tests` section grafted in. The result diffs against HEAD as **35 insertions, 0 deletions, all inside `## Tests`**, which is what proves nothing outside that section was altered or lost. I confirmed independently that U5c's guide change was confined there: `## Tests` sits at line 4771 in HEAD and sat at 4771 in the pre-edit working copy, and HEAD's `## Declared non-goals` region is byte-identical to the pre-edit working copy's.

Ancillary matters I decided and recorded: carrier 9 took the consolidation form (one `distributionScript.mjs` copied beside each fixture) rather than deliberate twins; carrier 10 took the single-hook form rather than the surviving-tree assertion; the transport count took the name `fetches` on both sides; the copied fixtures keep `.mjs`, so one specifier names the shared script on each side.

## Orchestrator note on the recovery

Verified independently before the audit: `git diff --stat HEAD -- guides/mcp.md` reads `1 file changed, 35 insertions(+)` with ONE hunk header, `@@ -4788,6 +4788,41 @@`. HEAD's `## Tests` spans lines 4771-4791 and `## Declared non-goals` opens at 4792, so the single insertion point sits inside `## Tests`; a one-hunk diff means every other byte of the file equals HEAD. The `format:check` gate is `oxfmt`, and it exits 0 on the working tree, which covers `tests/distribution.test.ts`.
