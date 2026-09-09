Lane: objective correctness.

### EXAMPLE — CONFIRMED

- **Attack:** Run the published guide fence and extracted `GuideCommand` class example through the installed consumer, then compare them with the former unregistered text.
- **Evidence:** Each corrected entry registers its assertion inside the worker callback ([guide entry](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guides-api-example-final/entries/guide.ts:13), [class entry](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guides-api-example-final/entries/class.ts:13)). The corrected entries and registered control exited `0`; the former text exited `1` with `No test suite found` ([evidence.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guides-api-example-final/evidence.json:66)). The added root control proved that the escaped class-example globs include the exact source and test files, so unrelated guide or README files cannot satisfy the inventory assertions ([class inventory report](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guides-api-class-inventory-root-report.md:3)).

### FAILURE — CONFIRMED

- **Attack:** Compare the published failure wording with native exception containment, worker rejection, and an invalid foreign value without callable cleanup.
- **Evidence:** The interface and class state that native failures write stderr, raise exit status, and leave `execute` fulfilled, while worker inventory and registration failures reject ([types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:99), [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:76)). The guide says that cleanup applies only after a callable `close` member is validated and expressly excludes an invalid value without one ([guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:307)). The implementation retains the established outer native catch without a runtime correction ([GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:83)); the archive comparison reports only emitted TSDoc movement in the server JavaScript.

### BOUNDARY — CONFIRMED

- **Attack:** Search the corrected guidance for the former package-wide purity claim, an indirect launcher, implicit rewrite authority, or an added compatibility/dependency mechanism.
- **Evidence:** README limits purity to core and assigns filesystem work to the optional server entry ([README.md](C:/Users/mikes/WebstormProjects/guide/README.md:187)). The guide separately assigns pure text computation to core and host writes to `GuideCommand` only under an explicit destination ([guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:721), [guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:768)). Command guidance names `tests/guides.test.ts` as the direct entry and distinguishes the no-write invocation from `--to guide` and `--to source` ([README.md](C:/Users/mikes/WebstormProjects/guide/README.md:64)). The correction adds prose, TSDoc, and tests; it adds no launcher, alias, dependency, or compatibility path.

### LEAVES — CONFIRMED

- **Attack:** Check whether the former export-only coverage remained, whether path handling used string-built file URLs, and whether native carrier setup stayed duplicated in test bodies.
- **Evidence:** `formatGuideFinding`, `resolveGuideRoot`, and `selectGuidePitch` have direct result assertions, including prefix identity, absent selection, native absolute and relative paths, and a spaced file URL built with `pathToFileURL` ([helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts:81), [helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts:96), [helpers.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/helpers.test.ts:108)). The reusable subprocess carrier is centralized in `tests/setupServer.ts`, uses native path and URL modules, imports the public server entry, and removes its unique entry in `finally` ([setupServer.ts](C:/Users/mikes/WebstormProjects/guide/tests/setupServer.ts:16)). The final format, lint, type, build, and test receipts exited `0`.

### HOST — CONFIRMED

- **Attack:** Make the real Vitest start path reject, make real `onClose` cleanup reject, enter failure with exit status `5`, and reject inside the actual worker-registration callback.
- **Evidence:** The public-entry child uses `@orkestrel/guide/server`, `readInventory`, `createVitest`, and a real Vitest instance ([setupServer.ts](C:/Users/mikes/WebstormProjects/guide/tests/setupServer.ts:20)). The start-failure control observes `start`, then `close`, stderr, process status `1`, and final exit state `1` ([GuideCommand.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/GuideCommand.test.ts:39)). The cleanup-failure control observes the real `onClose` callback, stderr, status `1`, and final exit state ([GuideCommand.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/GuideCommand.test.ts:68)). The higher-status carrier provokes a real reporter failure and preserves status `5` ([GuideCommand.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/GuideCommand.test.ts:88)). The worker case rejects with the original registration error by identity ([GuideCommand.test.ts](C:/Users/mikes/WebstormProjects/guide/tests/src/server/GuideCommand.test.ts:114)). The final Guide gate ran these controls in the `src:server` project without a skipped carrier.

### ARTIFACT — CONFIRMED

- **Attack:** Compare canonical, packed, and installed core/server entries; inspect restored metadata and staged indexes; compare Scaffold’s accepted consumer before and after correction.
- **Evidence:** The artifact record gives identical hashes for canonical, packed, and installed JavaScript and declarations and resolves `GuideCommand` from the installed public server entry ([artifact.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-api-correction-artifact/artifact.json:3), [artifact.json](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-guide-api-correction-artifact/artifact.json:189)). Guide and Scaffold ordered gates exited `0` against captures matching their final gate diffs ([correction evidence](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guides-api-correction-close-evidence.md:38)). Manifest and lock restoration checks pass, and staged package indexes match before and after the gate and installation work. Comparing the accepted and corrected Scaffold captures changes only the supported `guides/guide.md` mirror and its `host.json` digest; the direct `tests/guides.test.ts` consumer remains unchanged.

### Findings fitting no claim

None.

### Attacked and held

- The escaped TSDoc glob form still resolves the expected source and test inventory.
- An invalid foreign runner without callable `close` remains outside the cleanup promise.
- Native failures fulfill `execute`; worker failures reject it.
- Core remains I/O-free while the server entry owns host activity.

VERDICT: PASS
