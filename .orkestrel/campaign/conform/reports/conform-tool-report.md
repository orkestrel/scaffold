# Unit conform-tool — report

Every row landed. The gate chain is green at exit 0 on all five gates. `git status --short` lists
only files under Owned. No consumer of `@orkestrel/tool` needs an edit: no row renamed or removed a
published symbol.

## Rows

| Id            | Disposition | Note                                                                                                                                                            |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tool-obj-1    | applied     | Appended `describe('flagship fences', …)` to `tests/guides.test.ts`: the registry fence and the calls fence executed against `@src/core`, each with its presence guard. |
| tool-obj-2    | applied     | Deleted `isBrowserVuePath` and its doc block from `tests/setup.ts`, its `describe` block and import entry from `tests/setup.test.ts`, and its clause from the header comment. |
| tool-obj-3    | applied     | Qualified the never-a-throw claim in `src/core/types.ts` and `guides/tool.md`, and added the executed test that pins the limit. `ToolManager.ts` unchanged.       |
| tool-subj-1   | applied     | `guides/tool.md` now names the `Unknown thrown value` fallback beside the `String` conversion.                                                                    |
| tool-subj-2   | applied     | Replaced the release-relative handler-arity sentence, and replaced "when absent its value is `undefined`" with "when absent it is not passed at all".             |
| tool-subj-3   | applied     | Added the `@remarks` block to `ToolInterface.execute` stating the uncaught-failure behaviour and the call-arity rule.                                             |
| tool-subj-5   | applied     | Added the `helpers.test.ts` row to the guide's `## Tests` list, after the factories row.                                                                          |
| tool-subj-7   | applied     | `Two nouns carry the runtime.` → `` `Tool` and `ToolManager` carry the runtime. `` Line 17 left unchanged, per the operative form.                                |
| tool-subj-8   | applied     | `an absent optional field is simply absent` → `an optional field the caller did not supply is absent from the value`.                                             |
| tool-subj-9   | applied     | `` `createTool` is the form to reach for when a call site should not name a class `` → `` reach for `createTool` where a call site must not name a class ``.      |
| tool-subj-10  | applied     | `README.md`: `are all just callers.` → `are all callers.`                                                                                                        |
| tool-subj-11  | applied     | `// the tool defined above` → `// the tool defined earlier`. The tool-obj-1 presence guards do not bind this line.                                                |
| tool-subj-12  | applied     | `That guarantee is what lets a caller` → `That isolation is what lets a caller`.                                                                                  |
| fleet-F1      | applied     | Folded into tool-obj-2, which is the same edit. No second edit made. This workspace has no browser environment: no `src/browser`, no `app/`, no `tests/setupBrowser.ts`. `createToolCall` survives, so the `setup` project keeps a case. |
| fleet-F2      | noop        | No implementation class has the shape. The classes are `Tool` (`src/core/tools/Tool.ts`) and `ToolManager` (`src/core/tools/ToolManager.ts`); neither declares a public `readonly id: string` data field. `Tool` declares `name`, `description`, `summary`, `parameters` and the `#execute` field; `ToolManager` declares only `#tools`. The `readonly id: string` hits in this package are all interface members in `src/core/types.ts` (lines 29, 47, 63), which fleet-F2 leaves unchanged. |

## Files touched

- `/home/user/fleet/tool/src/core/types.ts` — qualified the `ToolResult` never-a-throw remark; added the `ToolInterface.execute` `@remarks` block.
- `/home/user/fleet/tool/guides/tool.md` — the nine prose repairs: runtime nouns, contracts preamble, `createTool` recommendation, handler arity, fence comment, caller-context absence, execution-resolves qualification, `String`-conversion fallback, batch isolation noun, and the `helpers.test.ts` Tests row.
- `/home/user/fleet/tool/README.md` — dropped the filler word from the callers sentence.
- `/home/user/fleet/tool/tests/guides.test.ts` — added the `@src/core` import and the `flagship fences` block: the executed registry and calls transcriptions plus their presence guards.
- `/home/user/fleet/tool/tests/setup.ts` — removed `isBrowserVuePath` and narrowed the header comment to the tool call fixture.
- `/home/user/fleet/tool/tests/setup.test.ts` — removed the `isBrowserVuePath` describe block and its import entry.
- `/home/user/fleet/tool/tests/src/core/tools/ToolManager.test.ts` — added the test pinning the documented rejection limit on a throwing `id` accessor.

Diffstat:

```text
 README.md                                |  2 +-
 guides/tool.md                           | 45 ++++++++-------
 src/core/types.ts                        | 10 +++-
 tests/guides.test.ts                     | 98 ++++++++++++++++++++++++++++++++
 tests/setup.test.ts                      | 27 +--------
 tests/setup.ts                           | 12 +---
 tests/src/core/tools/ToolManager.test.ts | 16 ++++++
 7 files changed, 152 insertions(+), 58 deletions(-)
```

## Commands and counts

Every command ran from `/home/user/fleet/tool`.

| Command                                    | Baseline        | After           |
| ------------------------------------------ | --------------- | --------------- |
| `npm run test:guides`                      | 23 passed (23)  | 27 passed (27)  |
| `npm run test:setup`                       | 4 passed (4)    | 2 passed (2)    |
| `npm run test:src`                         | 53 passed (53)  | 54 passed (54)  |

- tool-obj-1 raises `test:guides` from 23 to 27: the two executed transcriptions and their two presence guards.
- tool-obj-2 lowers `test:setup` from 4 to 2: the two `isBrowserVuePath` cases went with the helper.
- tool-obj-3 raises `test:src` from 53 to 54: the added rejection-limit case.

### Failing-first proof for tool-obj-3

`tool-obj-3`'s repair is documentation, so the added test names a limit that already holds rather
than a defect to fix. To confirm the assertion is a real observation rather than a vacuous pass, a
throwaway runtime probe ran the same assertion against a control drawn from outside the hostile
population — a plain call with no accessor — under `tmp/probe/` through `npm run test:probe`:

```text
AssertionError: promise resolved "{ id: 'plain', name: 'add', …(2) }" instead of rejecting
 ❯ tmp/probe/idAccessor.test.ts:14:37
 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
```

The control failed and the subject passed, so `rejects.toThrow('blocked id read')` distinguishes the
rejection from a normal resolution. The probe was deleted after the reading; `tmp/` is gitignored and
`git status --short` is unaffected.

## Sweeps

Every sweep ran over the whole checkout with `node_modules` excluded, and every remaining hit sits in
an off-limits or shared report-only file.

| Pattern                                                                                          | Result over `guides/tool.md`, `README.md`, `src/**`, `tests/**` (Owned)                                                                    |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `\bisBrowserVuePath\b`                                                                            | empty across the whole checkout                                                                                                             |
| `isBrowserVuePaths?\|isBrowserVuePath(ed\|ing)?` case-insensitive                                  | empty across the whole checkout                                                                                                             |
| `simpl\|\bjust\b\|\beas(y\|ier\|ily)\b\|\bshould\b\|\bguarantee` case-insensitive                  | empty in Owned. Remaining hits: `.oxlintrc.json:11` (`array-simple`, a literal config identifier, exempt), and the vendored dependency guide mirrors `guides/contract.md`, `guides/guide.md`, `guides/test.md`. |
| `\babove\b\|\bbelow\b` case-insensitive                                                           | in Owned only `tests/guides.test.ts:2` and `:36`, both pre-existing and both explicitly recorded by the refuter as outside the claims. Remaining hits: `LICENSE` (off-limits), `tests/setupPolicy.ts` and `tests/policy.test.ts` (off-limits vendored), and the dependency guide mirrors. |
| `Two nouns\|Existing zero-argument\|is simply absent\|Execution always resolves\.\|its value is \`undefined\`\|the tool defined above\|That guarantee\|just callers` | empty across the whole checkout — every old form is gone                                                                                    |

## Gates

Run in order, each read bare.

| Gate                  | Exit | Reading                                                                    |
| --------------------- | ---- | ---------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` on 41 files                    |
| `npm run lint:check`   | 0    | no diagnostics                                                             |
| `npm run check`        | 0    | root project and `configs/src/tsconfig.core.json` both clean               |
| `npm run build`        | 0    | `dist/src/core/index.js` 6.83 kB, `index.cjs` 7.23 kB, declarations copied |
| `npm test`             | 0    | src:core 54, policy 111, config 46, setup 2, guides 27 — all passed        |

`npm test` ran with no other writer in this checkout, but the whole-suite reading is reported as an
observation per the brief; the Orchestrator takes the deciding run.

## Breaking

None. No row renamed or removed a published symbol. `isBrowserVuePath` was a test-infrastructure
helper in `tests/setup.ts`, outside the published barrel, and the fleet-wide grep the brief records
found no consumer beyond its own test block.

## Shared-file patches

None. Every edit landed inside Owned. No shared file and no other fleet checkout needs a change.

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a file outside
Owned, or required a consumer edit.

## Observations outside the rows

Recorded for the Orchestrator, not acted on.

1. `guides/tool.md:31` still reads "answers with a `ToolResult` that is always a result and never a
   throw", the same unqualified claim tool-obj-3 qualified at `src/core/types.ts` and at the guide's
   Calls-and-results paragraph. The refuter named only those two homes, so the tagline paragraph was
   left as found.
2. `tests/guides.test.ts:2-3` reads "The four constants below are this // package's own", carrying a
   count and `below`. The refuter recorded this as a finding outside the claims; it was left as
   found, in an Owned file.
3. `guides/README.md` § Dependency reference lists `contract.md`, `guide.md`, and `scaffold.md`, but
   `guides/probe.md` and `guides/test.md` also sit in the tree unlisted. No parity assertion covers
   the section, so the gates stay green.
