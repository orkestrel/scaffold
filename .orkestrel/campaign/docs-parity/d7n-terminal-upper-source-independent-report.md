SHAPE: BROKEN.

[guides/terminal.md:324](C:/Users/mikes/WebstormProjects/terminal/guides/terminal.md:324) documents `PROMPT_ICONS` as `Readonly<Record<string, string>>`; the `SSE_EVENTS` row at line 329 does likewise. Their declarations at [src/core/constants.ts:122](C:/Users/mikes/WebstormProjects/terminal/src/core/constants.ts:122) and line 211 are frozen, fixed-key objects without a `Record` annotation. Widening their values does not introduce an arbitrary-key index signature.

Smallest correction: retain the declared keys in these Shape cells. Do not change source declarations to fit the guide. The restored interface members, optional markers, callable aliases, function signatures, guard targets, class contracts, and constructor signature otherwise match the inspected declarations. API/Kind/Summary wording remains unchanged.

PROSE: CONFIRMED.

[guides/terminal.md:459](C:/Users/mikes/WebstormProjects/terminal/guides/terminal.md:459) names `MemoryTerminalStore` and `DatabaseTerminalStore` while retaining their shared persistence contract. [src/core/types.ts:412](C:/Users/mikes/WebstormProjects/terminal/src/core/types.ts:412) describes accepted-answer notification with the id and settled values. This matches [src/core/Prompt.ts:168](C:/Users/mikes/WebstormProjects/terminal/src/core/Prompt.ts:168), after successful submission and before the parked record is deleted.

The named capitalization edits preserve qualifications. Added fence lead-ins are complete sentences; demonstration bodies and titled headings remain unchanged. README Install/Usage remains untouched.

ENTRY: CONFIRMED.

[tests/guides.test.ts:5](C:/Users/mikes/WebstormProjects/terminal/tests/guides.test.ts:5) uses native-safe `GuideCommand`, `readInventory`, and `createVitest` imports. Runtime assertion and source imports occur inside the callback at line 47. The parsed package manifest is guarded and its name asserted against `@orkestrel/terminal`. No launcher, local parser, generic wrapper, or public API was added. Assertion preservation fails separately.

PRESERVATION: BROKEN.

The installed Guide core inspected here has SHA256 `8EA54AF019E62E2E0C680ADB5580DC589BEB4C0ABEDE66452F61AFE2B804CA9F`.

| Current assertion | Predecessor counterpart at `0b01536` | Changed meaning |
| --- | --- | --- |
| `report.sections`, test line 184 | Method-group traversal, line 224 | Adds required Surface/Methods/Tests headings and a nonempty group population. |
| `report.imports`, line 211 | Encountered mapped imports, line 308 | Adds failure when no mapped self import exists. |
| `report.links`, line 215 | Encountered relative links, line 320 | Adds failure when no links exist. |
| `report.tests`, line 218 | Encountered test links, line 328 | Adds failure when no test links exist. |

These additions are explicit in installed [Guide core index.js:3604](C:/Users/mikes/WebstormProjects/terminal/node_modules/@orkestrel/guide/dist/src/core/index.js:3604), `#inspectLinks` at line 3701, and `#inspectImports` at line 3761.

The new module mapping at [tests/guides.test.ts:20](C:/Users/mikes/WebstormProjects/terminal/tests/guides.test.ts:20) also brings `@orkestrel/terminal/server` imports into validation. The predecessor map at line 102 omitted that specifier, so its import traversal skipped them.

Smallest correction: restore predecessor traversal for the population-sensitive checks and preserve its module-map population. `report.methods` and the asserted example channels match their predecessor comparisons; they need no policy expansion. Do not filter diagnostic text to emulate the old checks.

`INTERNAL`, direct barrel assertions, NUL/BEL construction, and executed behavior remain preserved. The whitespace-insensitive executed-section diff changes only the removable `FieldChoice` annotation, not the data or assertions. No `report.declarations` assertion was added.

SCOPE: CONFIRMED.

The actual diff remains confined to `guides/terminal.md`, `tests/guides.test.ts`, and the named source documentation blocks. Source runtime tokens and public declarations remain unchanged. README, manifests, lockfile, dependencies, and vendored paths are absent from the diff. HEAD remains `0b01536068f396c9c5e92f5fca93a107d598f201`. Root’s dependency preparation is distinct from this authored scope.

PROOF: CONFIRMED, within its stated limit.

The [root native receipt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-terminal-upper-native-green/action.exit.txt) records exit `0`; its stdout records successful direct test execution. Frozen before/after diffs match and identify the returned test as `e34c41b`. The current test resolves to `e34c41bc3e1a5c42c08df4eda480dd274c938864`.

Writer-reported structural checks and scoped commands remain writer evidence. This review ran no gates or negative controls. The preservation findings are source comparisons, not executed behavioral proofs. Native green does not establish assertion equivalence, final prepublish acceptance, registry release, or main closure.

VERDICT: FAIL.
