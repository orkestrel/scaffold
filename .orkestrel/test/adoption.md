# Adoption map — what each package deletes

Derived by matching each published `@orkestrel/test` export against the local declarations in every
package's `tests/setup*.ts` and `tests/guides.test.ts`. Regenerate rather than trust this copy; it is
a measurement taken on 2026-08-13 against the clones at `/home/user/packages`.

Names on the left of `->` are the local spellings found; the name on the right is what replaces them.
A name with no arrow already matches the published spelling.

**Every one of the 41 published packages benefits.** Three of them (`contract`, `markdown`,
`ndjson`) gain only `resolveRoot`, which is still a real deletion because each carries its own copy
of the workspace-root derivation in `guides.test.ts`.

This map counts only the exports that shipped. It excludes every helper the contract intentionally
left behind, so it is a floor on the duplication the fleet carries, not a ceiling.

```text
package      deletes local declarations replaced by @orkestrel/test
----------------------------------------------------------------------------------------------------
abort        3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
agent        7    TestRecorderInterface -> RecorderInterface; collect; createRecorder; requireValue; ROOT -> resolveRoot; roundTripJSON; waitForDelay
browser      6    TestRecorderInterface -> RecorderInterface; createRecorder; createTempDirectory -> createScratch; requireValue; ROOT -> resolveRoot; waitForDelay
budget       4    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot
console      7    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT, WORKSPACE_ROOT -> resolveRoot; roundTripJSON; waitForDelay
contract     1    ROOT -> resolveRoot
csv          3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
database     6    TestRecorderInterface -> RecorderInterface; captureError; collectRows -> collect; createRecorder; tempDatabasePath -> createScratch; ROOT -> resolveRoot
emitter      3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
guide        1    readInventory
html         3    TestRecorderInterface -> RecorderInterface; collectStream; createRecorder
indexeddb    3    captureError; ROOT -> resolveRoot; waitForDelay
interpret    4    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot
markdown     1    ROOT -> resolveRoot
mcp          6    TestRecorderInterface -> RecorderInterface; createManualClock -> createClock; createRecorder; readInventory; ROOT -> resolveRoot; waitForDelay
middleware   3    createManualClock -> createClock; buildTempDirectory -> createScratch; ROOT -> resolveRoot
msg          5    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; expectDefined -> requireValue; ROOT -> resolveRoot
ndjson       1    ROOT -> resolveRoot
ollama       4    TestRecorderInterface -> RecorderInterface; collect; createRecorder; ROOT -> resolveRoot
pool         4    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot; waitForDelay
program      3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
qualifier    3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
queue        4    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot; waitForDelay
rater        4    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot
reason       4    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot
relation     3    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot
router       5    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT, WORKSPACE_ROOT -> resolveRoot; waitForDelay
scaffold     5    TestRecorderInterface -> RecorderInterface; createRecorder; createWorkspace -> createScratch; WORKSPACE_ROOT -> resolveRoot; waitForDelay
sea          4    captureError; createTestDir -> createScratch; ROOT, WORKSPACE_ROOT -> resolveRoot
server       5    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT, WORKSPACE_ROOT -> resolveRoot; waitForDelay
sqlite       2    captureError; ROOT -> resolveRoot
sse          4    TestRecorderInterface -> RecorderInterface; createRecorder; expectDefined -> requireValue; ROOT -> resolveRoot
template     4    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot
terminal     4    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot; waitForDelay
timeout      4    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot; waitForDelay
tool         3    requireValue; ROOT -> resolveRoot; waitForDelay
toolbox      6    TestRecorderInterface -> RecorderInterface; collect; createRecorder; ROOT -> resolveRoot; roundTripJSON; waitForDelay
websocket    5    TestRecorderInterface -> RecorderInterface; createRecorder; requireValue; ROOT -> resolveRoot; waitForDelay
worker       5    TestRecorderInterface -> RecorderInterface; createRecorder; tempDatabasePath -> createScratch; ROOT -> resolveRoot; waitForDelay
workflow     6    TestRecorderInterface -> RecorderInterface; captureError; createRecorder; ROOT -> resolveRoot; roundTripJSON; waitForDelay
workspace    4    TestRecorderInterface -> RecorderInterface; createRecorder; ROOT -> resolveRoot; roundTripJSON
----------------------------------------------------------------------------------------------------
41 packages, 162 local declarations replaced
```

## What adoption looks like per package

1. Add `@orkestrel/test` to `devDependencies`.
2. Delete the listed declarations from `tests/setup*.ts`.
3. Import the replacements at the call sites that used them — from `@orkestrel/test` for core, and
   `@orkestrel/test/server` for `readInventory` and `createScratch`.
4. Leave everything else in that setup file alone. What stays is package-owned: builders that mention
   the package's own `@src/*` types, narrow wrappers that supply a package guard, protocol-faithful
   peers specific to that package, inert collaborators implementing its own published seams, and its
   domain case matrices.

No consumer edits `vite.config.ts`, because these are named exports rather than side effects and
`setupFiles` never mentions the package. No barrel re-exports them, because a barrel may not
re-export another package's symbol.

Adoption is per package and per helper family. A migrated package and an unmigrated one never
interact, so nothing here is a compatibility shim and no atomic 41-repository change is required.

## Three defects this map does not fix, recorded for the adoption campaign

Found while measuring, and owned by the packages themselves rather than by `@orkestrel/test`:

- `server`, `router` and `middleware` each reimplement `isAddressInfo` in their tests, which
  `@orkestrel/server` already publishes from its barrel. They should import it from there. This
  package deliberately does not ship a fourth copy.
- `workflow`'s tests reimplement `createGate` while `workflow` itself publishes `createDeferred`, and
  the runtime's own `Promise.withResolvers` is available under the fleet's declared
  `engines.node >=22.12.0`.
- `toolbox` carries `createFakeTimer`, an unexported duplicate of its own `createTestTimer`.
