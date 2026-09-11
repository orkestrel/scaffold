# Terminal upper fix native report

## Outcome

The bounded Terminal unit is implemented at baseline `0b01536068f396c9c5e92f5fca93a107d598f201`. The target diff remains uncommitted for independent review. This report is implementation evidence, not acceptance.

The root-recorded native substitution was used because the required subjective writer route returned its weekly usage limit before target actions. No authentication or retry around that limit occurred.

## Scope

The target diff contains these owned paths:

- `guides/terminal.md`
- `src/core/TerminalManager.ts`
- `src/core/helpers.ts`
- `src/core/types.ts`
- `src/server/Terminal.ts`
- `src/server/helpers.ts`
- `tests/guides.test.ts`

`README.md`, manifests, lockfiles, vendored files, runtime code tokens, public declarations, package scripts, refs, and dependencies are unchanged. No shared-file patch is required. The report itself is written at the dispatch-owned canonical Scaffold path.

## Direct defect proof

The exact command before edits was:

```text
node --experimental-strip-types tests/guides.test.ts
```

It exited `1` before Vitest collected a test, so a failing test total was unavailable. The failure was:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@src/core' imported from
C:\Users\mikes\WebstormProjects\terminal\tests\guides.test.ts
Node.js v24.20.0
```

The same command after the fix exited `0`:

```text
Test Files  1 passed (1)
Tests       36 passed (36)
```

No compared description paragraph changed. A separate source-first summary red was therefore not applicable.

## Shape and declaration evidence

The committed guide had `API | Kind | Summary` headers across the Surface. The changed guide adds `Shape` between `Kind` and `Summary` under the applicable headings at `guides/terminal.md:97`, `:109`, `:123`, `:142`, `:189`, `:214`, `:229`, `:250`, `:266`, `:284`, `:298`, `:334`, and `:372`.

The guide now uses the fleet convention wording under each shape-bearing heading. Interface and alias tables carry the base sentence. Mixed function and guard tables add the function-and-guard sentence. Mixed class tables add the class sentence. Constants tables carry the constants sentence alone.

The restored behavioral cells include:

- `PromptInterface`: `{ emitter, count } plus park / pending / answer / stop / destroy` at `guides/terminal.md:198`.
- `PromptClientInterface`: `{ emitter, url, connected } plus connect / disconnect / destroy` at `guides/terminal.md:239`.
- `TerminalManagerInterface`: `{ emitter, count } plus terminal / terminals / add / ask / pending / answer / open / save / remove / destroy` at `guides/terminal.md:259`.
- `TerminalSnapshotRow`: `{ id, snapshot }` at `guides/terminal.md:277`.
- `MemoryTerminalStore` and `DatabaseTerminalStore`: `TerminalStoreInterface` at `guides/terminal.md:279` and `:280`.
- `TerminalError`: its constructor signature at `guides/terminal.md:295`.

The remaining rows carry declaration-derived data members, alias literals, function signatures, narrowed types, implemented interfaces, constructor signatures, or widened constant types. No Shape cell is empty.

A structural comparison parsed escaped pipes and compared the changed Surface to `HEAD:guides/terminal.md` while ignoring only the added Shape column and table widths. It exited `0` with:

```text
Surface API, Kind, and Summary cells match HEAD.
Every opening guide fence has a complete-sentence lead-in.
```

## Store, event, voice, and fence evidence

The persistence sentence names `MemoryTerminalStore` and `DatabaseTerminalStore` at `guides/terminal.md:459` and keeps the exact-interface contract.

The actual accepted-answer emission is `this.#emitter.emit('answer', id, outcome.value.value)` at `src/core/Prompt.ts:168`. The tuple comment now reports that emission moment and payload at `src/core/types.ts:412`; it no longer copies the `PromptInterface.answer` method effects.

The retained audit's named emphasis sites are lower case in the changed doc blocks. Evidence includes `src/core/types.ts:266`, `:318`, `:389`, `:447`, `:482`, `:578`, `:579`, and `:710`; `src/core/TerminalManager.ts:28`, `:33`, and `:39`; `src/core/helpers.ts:58`; `src/server/Terminal.ts:95`; and `src/server/helpers.ts:126` and `:128`. Qualifications and code tokens remain unchanged.

Each guide fence has a complete-sentence lead-in. The added pattern lead-ins begin at `guides/terminal.md:629`, `:667`, `:704`, `:736`, `:756`, `:783`, `:809`, `:890`, `:939`, `:994`, and `:1017`. The README Install and Usage fences remain untouched under Ruling 24.

## Native assertion-preservation mapping

| Predecessor subject                               | Native evidence                                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Manifest and selected guide                       | `report.input`, joined `rows`, `own.entry.spec`, and parsed package manifest name                       |
| Titled example population                         | `report.examples.titles` scoped to `GUIDE_SPEC`                                                         |
| README pitch                                      | package name authority plus `report.pitch`                                                              |
| Fence languages                                   | `report.fences` scoped to the joined row                                                                |
| Direct declarations and barrel exports            | existing `source.surface()`, `source.exports()`, `source.hidden()`, and `findMissingSymbols` assertions |
| Method-group population and implementation parity | `report.sections` and `report.methods`                                                                  |
| Summary and titled-example equality               | `report.drift`                                                                                          |
| Function and method example evidence              | `report.examples.functions` and `report.examples.methods`                                               |
| Fence imports, relative links, and test links     | `report.imports`, `report.links`, and `report.tests`                                                    |
| Terminal behavior                                 | the existing package-specific executed cases, nested unchanged inside the native callback               |

`tests/guides.test.ts:39` now enters through `GuideCommand`. Static runtime imports are limited to `GuideCommand`, `readInventory`, and `createVitest`. Vitest, source modules, and package assertion helpers load inside the async callback. The module map includes the public core and server names plus the package aliases. The parsed manifest must name `@orkestrel/terminal`.

No `report.declarations` assertion was added. A read-only inspection of that optional channel reported method-table findings for `MemoryTerminalStore` and `DatabaseTerminalStore`; the brief expressly excludes this predecessor-absent strengthening. The likely cause is that the channel treats each implementing class as needing a separate method table despite the shared `TerminalStoreInterface` table.

## Scoped validation

These commands exited `0`:

```text
node --experimental-strip-types tests/guides.test.ts --to guide
node --experimental-strip-types tests/guides.test.ts --to source
npx --no-install oxfmt --check guides/terminal.md src/core/types.ts src/core/TerminalManager.ts src/core/helpers.ts src/server/Terminal.ts src/server/helpers.ts tests/guides.test.ts
npx --no-install oxlint src/core/types.ts src/core/TerminalManager.ts src/core/helpers.ts src/server/Terminal.ts src/server/helpers.ts tests/guides.test.ts
npx --no-install tsc --project tsconfig.terminal-upper.json --pretty false
node --experimental-strip-types tests/guides.test.ts
git diff --check
```

The transient TypeScript project selected the owned TypeScript entries and was removed after the run. The final formatter check reported that every selected file matched. The final native run reported:

```text
Test Files  1 passed (1)
Tests       36 passed (36)
```

The target diffstat is:

```text
guides/terminal.md          |  362 ++++++++------
src/core/TerminalManager.ts |    6 +-
src/core/helpers.ts         |    2 +-
src/core/types.ts           |   19 +-
src/server/Terminal.ts      |    2 +-
src/server/helpers.ts       |    4 +-
tests/guides.test.ts        | 1150 +++++++++++++++++++------------------------
7 files changed, 739 insertions(+), 806 deletions(-)
```

No install, build, full suite, acceptance gate, commit, ref update, push, publication, or secret access occurred. No implementation deviation remains.
