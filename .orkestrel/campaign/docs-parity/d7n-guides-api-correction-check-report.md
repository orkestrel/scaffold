I'll load the correction-check brief first, then every instruction it names, before reading the frozen evidence or collecting facts.Instruction loading comes first: I’ll read every referenced authority to EOF, then the close brief and verdict, before any evidence collection.AGENTS.md, grok.md, and the close brief are loaded. Next I’ll finish orchestration.md and the remaining named authorities to EOF.Instruction loading for the named authorities is complete through orchestration, Guide types, and the live guide. Next I’ll read the remaining GuideCommand sections, then the frozen correction captures and receipts.**Question:** What mechanical facts does the frozen Guide API correction show for touched paths, contracts versus TSDoc, examples, tests, syntax, and root receipts?

**Instruction loading:** Completed for Scaffold `AGENTS.md`, `.agents/orchestration.md` through Acceptance laws, `.claude/agents/grok.md`, the named rule files and falsify/harden references in this conversation, Guide `AGENTS.md` / `CLAUDE.md`, live `guides/README.md`, live `guides/guide.md` through See also, live `src/server/types.ts`, live `src/core/types.ts` through `SourceInterface`, the close brief’s subject/criteria, `d7n-guides-api-close-verdict.md`, and the example-location, exit-control, and fixture amendments. Writer reports were not read.

## Evidence

Heads: Guide `ef6ada9975d71ce97ac20239f473c02b77e84cd9`; Scaffold `59e80f994d5ef06f6db98834f3a6abc05334ec27` (`tmp/pass/d7n-guides-api-correction-final/guide.head.txt`, `scaffold.head.txt`; matching gate `head.txt` files). `guide.untracked.txt` exists and is empty. Scaffold untracked inventory is campaign/evidence/instrument paths, not product source.

Correction-owned live files (companion scope; full captures still carry the earlier chain): `README.md`; `guides/guide.md`; `src/server/types.ts`; `src/server/GuideCommand.ts`; `tests/setupServer.ts`; `tests/src/server/GuideCommand.test.ts`; `tests/src/server/helpers.test.ts`.

### Contracts versus TSDoc

`GuideCommandInterface.execute` remains `execute(register: GuideCommandHandler): Promise<void>` (`src/server/types.ts` lines 99–108). Option keys and context fields are unchanged. Added/changed text is `@throws` on `GuideReadFunction`, `GuideRunnerFunction`, `reader`/`runner`, and `execute`: native failures go to stderr and exit status before `execute` resolves; worker inventory/registration failures reject `execute`.

Class TSDoc `@example` (`src/server/GuideCommand.ts` lines 31–54) and guide fence “Run the shared server command” (`guides/guide.md` lines 942–966) share this shape: static imports of `GuideCommand`, `readInventory`, `createVitest`; `await new GuideCommand({...}).execute(async ({ files, report, root, rows }) => { const { expect, it } = await import('vitest'); it('checks the documented inventory', () => { ... }) })`. They differ on `modules` (`@scope/widget` versus `@scope/package` with `['src/core', 'src/server']`) and glob escaping in the class fence.

Native runtime (`GuideCommand.ts` lines 83–94, 201–219): `execute` catches native errors, writes stderr, calls `#raise(1)`, and does not rethrow. `#executeRunner` requires callable `close` before `try`, then `start`, then `finally` `Reflect.apply(close, runner, [])`. Guide prose at `guides/guide.md` lines 307–314 and README lines 7–10 / 64–67 match that split (core I/O-free; server host shell; `npm run test:guides` with `--to guide` / `--to source`; no separate helper script).

### Tests and fixtures

`tests/setupServer.ts` exports `runNativeGuide`. Shared carrier (imports, `events`, `GuideCommand` policy, `execute`, JSON emission) lives there. Cases in `GuideCommand.test.ts` supply `createVitest` plus `reporters` / `onClose`. Assertions: start-reject `status` 1, stderr `'runner start failed'`, stdout events `start` then `close`, `exitCode` 1; cleanup-fail stderr `'runner cleanup failed'`; higher-exit `process.exitCode = 5` with a failing reporter, `status` 5 and `exitCode` 5; worker `execute` `.rejects.toBe(failure)` by identity. `GUIDE_ROOT` is a non-exported module const in `tests/setupServer.ts`.

`helpers.test.ts` imports `formatGuideFinding`, `matchesGuideResult`, `resolveGuideRoot`, `selectGuidePitch` from `@src/server` and asserts outcomes (prefixing, native/file-URL roots including spaces, pitch select/undefined, owned collections / live receivers).

Newly written correction TypeScript inspected as source (not a token search as a complete AST): no `any`, no `as` assertions, no non-null assertions, no accessibility keywords, no `@ts-*` / `eslint-disable`. Nested `function`/`const fn =` declarations are absent from those modules; `execute` callbacks are anonymous arguments; `runNativeGuide` template text is a string payload. `expect<GuideReadFunction>` is a generic argument.

### Example instrument

`tmp/pass/check-guides-api-example.mjs` lines 61–66: `source.examples().filter((example) => example.name === 'GuideCommand')`. Fixture under Scaffold `tmp/pass`, real `createGuide`/`createSource`, native `node --experimental-strip-types tests/guides.test.ts`.

`tmp/pass/d7n-guides-api-example-final/evidence.json`: class/guide/registered `status` 0, empty stderr; unregistered `status` 1, stderr `No test suite found`. Hashes: class `1311c5f9…`, guide `83fb8859…`, unregistered `c52341c0…`. Former documented snippet in `tmp/pass/d7n-guides-api-example-red/evidence.json` `documented.status` 1 with the same missing-suite error; that entry uses top-level `expect` without `it`.

Archive-to-archive `server-comment.diff.txt` changes TSDoc example and `@throws` only; `async execute(register)` body line is unchanged in that diff.

### Receipts actually read

Guide and Scaffold ordered `format-check` / `lint-check` / `check` / `build` / `test` `*.exit.txt`: `0`. Pack and install `exit.txt`: `0`. Artifact `instrument.exit.txt`: `0`. Capture core JS/d.ts hash checks: `0`.

Guide `src:server`: `Tests  14 passed (14)` (`tmp/pass/d7n-guide-api-correction-gates/test.log.txt`). Scaffold `src:core`: `Tests  409 passed (409)`. Scaffold `test:guides`: `node --experimental-strip-types tests/guides.test.ts`, `Tests  22 passed (22)`. Policy/config skipped totals and API Extractor TypeScript 6.0.3 warnings remain in those logs.

`artifact.json`: core JS `8ea54af0…`, core d.ts `91fdb2d7…`, server JS `445f0833…`, server d.ts `c4922e67…` match packed, canonical, and installed. `module.GuideCommand` is `"function"`. Packed/installed metadata: Contract `^0.0.17`, Markdown `^0.0.14`. Guide manifest/lock SHA256 before and after the instrument: `fe6a7983…` / `040270de…`. Preservation logs: `package.json: OK`, `package-lock.json: OK`. Capture `artifacts.sha256` lists core bytes and tarball `9cf7f4c6…`; server hashes are in `artifact.json`.

Companion tokens `c6fcad`, `acb19a`, `531afc`, `90721d`, `3c7f7f`, `19f031`, `33e629`, and the rest are names in the evidence companion, not files under `tmp/pass`. Capture-versus-gate SHA256 values `e59cb0e5…` / `6f504df1…` were not independently recomputed here. No `prove` receipt is in this packet.

## Distillate

The correction’s public `execute` signature is unchanged; native versus worker failure wording moved into TSDoc, README/guide boundary prose, and the class/guide examples. Those examples now register an `it` inside the worker callback after a dynamic `vitest` import. Native lifecycle controls drive real `createVitest` through `runNativeGuide` in `tests/setupServer.ts` and assert stderr, child status, JSON `exitCode`, and `onClose` events; worker rejection uses identity. Helper leaves have direct outcome tests. Packed/installed core hashes match the prior archive; server JS/d.ts hashes changed with the TSDoc-only archive diff. Ordered gate exits read here are `0`. Source-only reading does not re-run those processes.

## Unknowns

- Independent SHA256 of capture diffs versus gate `diff-final.txt`.
- Byte identity of entire `before-test.diff.txt` versus `after-test.diff.txt` beyond the opening hunks.
- Full AST population of every file in the cumulative chain outside the correction-owned TypeScript named above.
- Case names behind Scaffold `src:server` skipped totals.
- Files for companion tool-call identifiers.
- A successful Probe `prove` receipt.

## Journal

`C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-guides-api-correction-check.jsonl`  
`session_id`: `fe7120fc-1270-4693-b195-9cbb84f829a3`

## Deviation

No product command, test, install, write, or Git mutation. Spawned nothing. Companion run tokens are not filenames. Capture `artifacts.sha256` is a narrower population than `artifact.json`; server hashes were read from `artifact.json`.
