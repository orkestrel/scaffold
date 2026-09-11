Objective lane held with the accepted Guide API context reused.

## SHAPE — CONFIRMED

T1 and T2 are supported by the frozen guide and declarations.

- `guides/terminal.md:101-107` records `TerminalInterface`, `PromptStatus`, and `PromptStep` with the required data/call-member convention.
- `guides/terminal.md:194-212` preserves `PromptInterface` as `{ emitter, count } plus park / pending / answer / stop / destroy`.
- `guides/terminal.md:235-248` preserves `PromptClientInterface` as `{ emitter, url, connected } plus connect / disconnect / destroy`.
- `guides/terminal.md:255-264` preserves `TerminalManagerInterface` data and call members.
- `guides/terminal.md:271-282` preserves `TerminalSnapshotRow` as `{ id, snapshot }` and names the store implementations against `TerminalStoreInterface`.
- `guides/terminal.md:290-296` records the class constructor and guard shape.
- The constant tables at `guides/terminal.md:305-332` and `:378-395` use widened or declared types while keeping literal values in Summary.

The named shapes agree with `src/core/types.ts:502-531`, `:622-643`, `:715-761`, `:795-810`, and `src/server/types.ts:31-43`. The actual diff leaves API, Kind, and Summary meanings intact. No empty Shape cell or flattened mixed-row fact was found.

## PROSE — CONFIRMED

- T3: `guides/terminal.md:457-465` names `MemoryTerminalStore` and `DatabaseTerminalStore` and retains their shared `TerminalStoreInterface`.
- T4: `src/core/types.ts:401-415` describes the accepted `answer` event and its `id`/`FormValues` payload. This agrees with the actual emission at `src/core/Prompt.ts:162-170`.
- T5: the changed comment blocks only lower the named emphasis. Their behavioral qualifications remain present in `src/core/TerminalManager.ts:25-43`, `src/core/helpers.ts:55-67`, `src/core/types.ts:263-266`, `:315-323`, `:386-392`, `:445-449`, `:479-490`, `:575-589`, `:707-713`, `src/server/Terminal.ts:92-101`, and `src/server/helpers.ts:123-132`.
- T6: the pattern demonstrations retain their code and now have complete lead-ins at `guides/terminal.md:627-1017`. The structural receipt reports every opening guide fence has a complete-sentence lead-in. README Install and Usage remain outside the diff.

## ENTRY — CONFIRMED

T7 directly composes `GuideCommand`, `readInventory`, and `createVitest` at `tests/guides.test.ts:5-49`. `PACKAGE_NAME` binds the module map and parsed manifest at lines 14-24 and 125-149. Runtime package, support, and Vitest imports occur inside the anonymous callback beginning at line 49. `NUL` and `BEL` remain explicit package data at lines 34-37. No launcher, local helper, parser, dependency, or public API was added.

## PRESERVATION — BROKEN

The native entry preserves the live Terminal guide, but it strengthens predecessor policy through aggregate channels:

- `tests/guides.test.ts:183-185` asserts `report.sections`. Installed Guide at `node_modules/@orkestrel/guide/dist/src/core/index.js:3604-3620` requires Surface, Methods, Tests, and a method-group population. The predecessor only inspected method groups it encountered at `0b015360:tests/guides.test.ts:224-249`.
- `tests/guides.test.ts:210-212` asserts `report.imports`. Installed Guide at `index.js:3761-3783` fails when no mapped self import exists. The predecessor only checked imports it encountered at `0b015360:tests/guides.test.ts:308-318`.
- `tests/guides.test.ts:214-216` asserts `report.links`. Installed Guide at `index.js:3701-3714` adds a failure for an empty link population. The predecessor accepted that population at `0b015360:tests/guides.test.ts:320-326`.
- `tests/guides.test.ts:217-219` asserts `report.tests`. Installed Guide at `index.js:3715-3725` adds a failure for an empty test-link population. The predecessor only checked encountered test links at `0b015360:tests/guides.test.ts:328-335`.

`report.methods` matches the predecessor’s existing-group membership and implementing-class checks through installed Guide lines 3652-3675. `report.examples.methods` matches the predecessor method-example traversal through lines 3734-3753. Those channels need no weakening. `report.declarations` and finding-text filtering are absent.

Smallest correction: remove the `sections`, `imports`, `links`, and `tests` assertions. Restore the predecessor import and link traversals with dynamically imported `createSourceManager`, `extractFenceImports`, `findMissing`, `isExternalLink`, and `resolveLink`. Keep `report.methods`, drift, examples, title, pitch, input, and fence-language channels unchanged.

The package-specific cases beginning at `tests/guides.test.ts:227` retain their calls, special-character inputs, and expectations under a whitespace-insensitive baseline comparison.

## SCOPE — CONFIRMED

The actual diff contains the owned guide, guide-test, and documentation-comment paths. Source changes are comments only; runtime tokens and public declarations remain unchanged. README, manifests, lockfiles, dependencies, vendored files, and refs are outside the diff.

`d7n-terminal-upper-native-green` records unchanged HEAD, manifest hashes, index bytes, status paths, and complete diff bytes across root execution.

## PROOF — CONFIRMED

`tmp/pass/d7n-terminal-upper-native-green/action.exit.txt` records exit `0` for direct native execution of the frozen entry. Its stdout records the returned guide test passing. The initial collection failure, structural comparison, scoped formatting, lint, and typecheck remain writer-reported evidence.

No mutation-based population control, Probe receipt, final prepublish, registry preparation, or main closure is claimed.

**VERDICT: FAIL — PRESERVATION**
