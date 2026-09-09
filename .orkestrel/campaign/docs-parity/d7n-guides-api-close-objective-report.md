### 1. BROKEN

A reachable native failure contradicts the public failure contract.

`GuideCommandInterface.execute()` says it throws for reader, runner creation, runner start, cleanup, and validation failures at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:93). The `reader` option also says reader failures reject the command at line 81. Native execution catches every such failure, writes its message, raises exit status `1`, and resolves at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:76).

The failing input is a native invocation whose runner rejects, or an explicit rewrite whose reader throws. The implementation reports the failure through stderr and `process.exitCode`; it does not reject `execute()` as documented.

Correct only the contract and guide. State that native failures are reported and converted to exit status `1`. Reserve `@throws` for worker inventory or registration failures that actually escape. Do not change the established native behavior.

The remaining API attack held. `ParityResult`, `ParityExampleResult`, and `ParityRewriteResult` use the required suffixes at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:186). `document()` and `annotate()` are the public authority-specific operations, while their accumulation engine remains private at [Parity.ts](C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:122). No public `rewrite()` alias or `createParity` wrapper remains. `patterns` and `reader` name their contents accurately.

### 2. BROKEN

Exported server helpers lack the direct focused tests required by the centralization workflow.

[helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/server/helpers.ts:17) exports `formatGuideFinding`, `matchesGuideResult`, `resolveGuideRoot`, and `selectGuidePitch`. The complete Guide test population invokes only `matchesGuideResult` by name in [helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts:1). No test directly invokes `formatGuideFinding`, `resolveGuideRoot`, or `selectGuidePitch`.

Add focused cases to the existing `helpers.test.ts`. Cover prefix insertion and preservation, URL/native-root resolution, and present/absent own-guide selection. Do not create a constants-only test file.

The placement attack otherwise held. Constants occupy [constants.ts](C:/Users/mikes/WebstormProjects/guide/src/server/constants.ts:1), parsers occupy [parsers.ts](C:/Users/mikes/WebstormProjects/guide/src/server/parsers.ts:1), and the server barrel uses star exports at [index.ts](C:/Users/mikes/WebstormProjects/guide/src/server/index.ts:1). `GuideCommand` keeps stateful workflow in methods and uses `#executeRunner`. Core imports no Node, Test, or Vitest host implementation. Installed `readInventory` and `createVitest` passed the real TypeScript project without wrappers or new runtime dependencies.

The guide also overstates cleanup at [guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:307): it says `close` is always called after successful runner creation. A created value with no callable `close` fails validation before the `finally` block at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:203). Narrow the sentence to a runner that supplied a callable `close`.

### 3. CONFIRMED

The attack used a class-instance runner and result, extra fields, changing collection getters, malformed collection members, failed states, empty modules, and arbitrary unhandled-error payloads.

`GuideRunnerFunction` returns `Promise<unknown>` at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:33). The command validates `start` and `close`, retains the live receiver through `Reflect.apply`, and places startup beneath cleanup at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:194). `matchesGuideResult` snapshots each foreign collection before inspection, admits extra fields and class instances, and validates only consumed members at [helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/server/helpers.ts:34).

The changing-getter control at [helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts:34) reads `testModules` once and rejects the previously false-successful state. Root’s retained control passed at `3ed94b` after the earlier red at `06f799`. The real TypeScript project and installed Scaffold command establish that `createVitest` remains admitted.

### 4. CONFIRMED

The attack searched the direct entry for named inventory, manifest, pitch, report, rewrite, runner, lifecycle, exit, and registration helpers, plus Parity reconstruction inside the callback.

[tests/guides.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:15) constructs the installed `GuideCommand` directly with package choices, `readInventory`, and `createVitest`. Its anonymous callback receives `files`, `report`, `root`, and `rows` at line 23. It constructs no `Parity` and parses no manifest. Package assertions and executable examples remain at the registration site.

The permanent structural control reddened with the former helper names and passed after removal. The authored-entry control distinguishes a passing callback assertion from a deliberately failing assertion. Root’s canonical `npm run test:guides` completed with exit `0`.

### 5. CONFIRMED

The attack followed each direction through the public operation and then through the fresh reconstruction.

At [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:112), absent arguments launch the runner without creating writes. `guide` selects `document()` and `source` selects `annotate()` at line 135. Every returned change is written before `#createOptions()` rereads disk at line 141. Remaining rewrite findings and pitch findings stay visible. Unsupported arguments exit before inventory or runner work.

The Scaffold callback separately asserts generic `report.pitch` and compares the README tagline with the required `guides/scaffold.md` row at [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts:86). Root’s retained real-command controls cover malformed arguments, category collisions, accumulated changes, fresh bytes, pitch selection and omission, and each rewrite direction.

### 6. CONFIRMED

The attack used `VITEST=false`, runner creation failure, empty results, unhandled errors, failed modules, cleanup failure, higher existing exit status, and a worker assertion that deliberately fails.

Only exact `VITEST === 'true'` enters registration at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:76). Native failures raise without lowering at line 215. A valid foreign runner always reaches `close` through the `finally` block at line 206. Worker registration remains outside the native catch and therefore stays visible.

The real authored-entry control ran inside the guides project and distinguished its passing and failing assertions. The canonical native Scaffold command completed successfully against the installed artifact.

### 7. CONFIRMED

The stale-artifact attack compared canonical build output, extracted archive output, and installed output rather than relying on source aliases.

[artifact.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-api-rules-artifact/artifact.json) records identical hashes for core JavaScript, core declarations, server JavaScript, and server declarations across those locations. It also records normal resolution of the installed `./server` entry with `GuideCommand` present.

The Guide and Scaffold gate captures match the frozen review diffs. Their ordered chains completed with exit `0`. The no-save installation preserved Scaffold metadata and the concept index. The guarded pack’s future Contract and Markdown ranges are explicitly local-artifact metadata; canonical registry-installable metadata was restored. This confirms source acceptance only, not publication.

## Findings fitting no claim

None.

## Attacked and held

- Removing `createParity` did not remove the older `createGuide`, `createSource`, or `createSourceManager` reader factories from [factories.ts](C:/Users/mikes/WebstormProjects/guide/src/core/factories.ts:1).
- `document()` and `annotate()` are distinct authority operations, not duplicate engines. Each selects a different replacement spine while sharing accumulation and residual reporting.
- The empty [tests/setupServer.ts](C:/Users/mikes/WebstormProjects/guide/tests/setupServer.ts) is structural setup for the configured server environment, not a launcher or concealed command.
- Guide’s own native-entry adoption and obsolete-script removal remain the named successor and do not weaken the accepted Scaffold consumer.

VERDICT: FAIL 1, 2
