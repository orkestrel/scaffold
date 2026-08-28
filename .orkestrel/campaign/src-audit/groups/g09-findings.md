# Findings for group g09

Packages: guide, lsp. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s15-11

11. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:14`, `/home/user/fleet/guide/src/core/parsers.ts:3`, `/home/user/fleet/guide/src/core/Guide.ts:2` rule=`.claude/rules/typescript.md` § Syntax and imports verdict=CONFIRMED
    wrong: an `import type` declaration follows value imports in each file — `helpers.ts` puts value imports on lines 2-13 before the type block at 14-21, `parsers.ts` puts value imports on 1-2 before the type import on 3, and `Guide.ts` puts a value import on 1 before the type import on 2. The rule places every `import type` before value imports. No file in router, program, or lsp does this.
    repair: move each `import type` block above the value imports in the three files.

## s15-12

12. package=guide file=`/home/user/fleet/guide/src/core/types.ts:7,16` rule=`AGENTS.md` § Design laws (Named discriminants) verdict=CONFIRMED
    wrong: `SurfaceSymbol` carries `readonly kind: ExportKind`, and the union is named `ExportKind`. The law names the axis that varies and bans `kind` and `type` outright. The axis here is the declaration form.
    repair: rename the type to `ExportDeclaration` and the property to `declaration`, updating `validators.ts:23,46`, `shapers.ts:23`, `helpers.ts:662-663,996,1001,1039,1044,1215,1228`, `sources/Source.ts`, and the `Kind` column contract in `constants.ts` and `guides/guide.md`. The guide's markdown column header stays `Kind` — that is the documented table's own external text, not this package's discriminant.

## s15-13

13. package=guide file=`/home/user/fleet/guide/src/core/factories.ts:97,116,135` rule=`.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `createSurfaceSymbolContract()`, `createMethodGroupContract()`, and `createManifestEntryContract()` are nullary partial applications of `createContract(<shape>)` from the declared `@orkestrel/contract`, over shapes the barrel already exports. They add no boundary, invariant, composition, translation, lifecycle, or narrower contract. `shapers.ts:14-19,31-37,49-55` documents the direct form as the way to do it, so the package ships two paths for one thing.
    repair: delete the three functions and their guide rows (`guides/guide.md:145-147`), and let consumers call `createContract(surfaceSymbolShape)`. If a compiled contract is genuinely wanted as a value, export the compiled instances from a `compilers.ts` instead — the guide already describes these as "Compiles … into a bundle", which is a compiler rather than an entity factory.

## s15-14

14. package=guide file=`/home/user/fleet/guide/src/core/types.ts:7`, `/home/user/fleet/guide/src/core/validators.ts:23-29,44-47,62-65,80-85`, `/home/user/fleet/guide/src/core/shapers.ts:21-24,39-42,57-62` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
    wrong: each of the three data types is defined three times — the TypeScript type in `types.ts`, a `recordOf` guard in `validators.ts`, and an independent `objectShape` in `shapers.ts`. The five `ExportKind` literals in particular appear at `types.ts:7`, `validators.ts:24-28`, and `shapers.ts:23`. Nothing derives one from another, so a sixth kind added to the type leaves both runtime definitions silently narrower. The rules require the parser and guard to derive from one source or to prove the round trip, and admit the shape DSL only where it earns its complexity.
    repair: pick one source. Derive the guards from the shapes (`export const isSurfaceSymbol: Guard<SurfaceSymbol> = createContract(surfaceSymbolShape).is`) and delete the duplicate `recordOf` definitions, or delete `shapers.ts` and keep the combinator guards. Either way, derive `ExportKind` from a single frozen literal list.

## s15-15

15. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:773-775` rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS make interface properties and public return collections readonly") + `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `fenceImports` returns `ReadonlyArray<{ specifier: string; names: readonly string[] }>` — an anonymous public return type declared inline in an implementation-adjacent file, whose `specifier` member is mutable.
    repair: declare `export interface FenceImport { readonly specifier: string; readonly names: readonly string[] }` in `src/core/types.ts` and change the return type to `readonly FenceImport[]`; the local accumulator at line 776 takes `FenceImport[]`.

## s15-16

16. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:606,662,723,773,888,910,934,952,985,1029,1092,1136,1161,1434,1465` rule=`.claude/rules/names.md` § Standalone helpers verdict=CONFIRMED
    wrong: fifteen exported module helpers are noun phrases rather than `{verb}{Noun}`, and none is a one-word helper whose meaning and arguments are unmistakable: `moduleKey`, `symbolKey`, `missingSymbols`, `fenceImports`, `firstCode`, `cellLinks`, `identifierOf`, `kindIndex`, `exportsFrom`, `hiddenFrom`, `declarationBody`, `memberMethods`, `sectionBlocks`, `examplesFrom`, `exampleMethods`. The same file names others correctly (`extractSourceLines`, `normalizeDirectories`, `selectModuleKeys`, `findMissing`, `resolvePath`, `joinHead`), so the file is internally inconsistent about its own rule.
    repair: rename each to its verb form and update every call site and the guide's Surface rows — `computeModuleKey`, `computeSymbolKey`, `findMissingSymbols`, `parseFenceImports`, `findFirstCode`, `extractCellLinks`, `extractIdentifier`, `findKindIndex`, `extractExports`, `extractHidden`, `extractDeclarationBody`, `extractMemberMethods`, `selectSectionBlocks`, `extractExamples`, `extractExampleMethods`.

## s15-17

17. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:934` rule=`.claude/rules/names.md` § Fixed derivation/construction forms verdict=CONFIRMED
    wrong: `identifierOf(code: string): string` takes the reserved `*Of` form, which the rules fix to a builder combining constituent parts into a container, guard, or value (`arrayOf(guard)`, `boundsOf(min, max)`). This is a projection from a code span to its identifier prefix, not a builder.
    repair: rename to `extractIdentifier` (the `extract*` prefix has one project-wide meaning and matches what it does) and update `helpers.ts:1205,1226,1259,1268` and the guide row. This is covered by the rename list in finding 16; it is listed separately because the reserved-form breach is a distinct rule.

## s15-18

18. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:59,61` rule=`AGENTS.md` § Design laws (Real domain states only) + `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: the source projector's state machine is stringly typed. `let mode = 'code'` infers `string` across fourteen behaviourally distinct modes (`code`, `line`, `block`, `single`, `double`, `regex`, `template`, `templateCode`, `templateLine`, `templateBlock`, `templateSingle`, `templateDouble`, `templateRegex`), and `parentheses: Array<{ role: string; phase: string; binding: boolean }>` types two more axes (`plain`/`statement`/`for`/`export`/`block`; `left`/`right`/`classic`) as `string`. A typo in any of the ~60 mode comparisons compiles and silently disables a branch of a 500-line lexer that nothing else can check.
    repair: declare `SourceMode`, `ParenthesisRole`, and `ParenthesisPhase` literal unions plus a `ParenthesisFrame` interface in `src/core/types.ts`, and annotate the three declarations. No runtime change.

## s15-19

19. package=guide file=`/home/user/fleet/guide/src/core/types.ts:82,84,86,136,178,180,251`; `factories.ts:19,39,61,83,102,121`; `parsers.ts:8`; `helpers.ts:26,821,855,1051,1322`; `validators.ts:11,32,50,68` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: TSDoc first sentences are bare imperatives ("Create", "Parse", "Resolve", "Compile", "Join", "Select", "Extract") or bare noun phrases on call signatures ("The `##` heading names, in document order", "Every direct declaration in the selected module keys…", "Whether `value` is one of the five…"). The rule fixes the third-person `-s` form for the first sentence. `guides/guide.md:142-147` already writes these as "Creates …", so the source and its own guide disagree.
    repair: rewrite each opener — "Creates a structured `GuideInterface` view…", "Parses a `## By concept` manifest table…", "Returns the `##` heading names, in document order.", "Checks whether `value` is one of the five documented `ExportKind` literals."

## s15-20

20. package=guide file=`/home/user/fleet/guide/src/core/types.ts:82,84,86,136,178,180,256` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `GuideInterface.sections`, `.surface`, `.methods` and `SourceInterface.exports`, `.methods`, `.exists` and `SourceManagerInterface.source` carry no `@example` and no `@returns`, while their direct siblings in the same interfaces do (`links` at 88-96, `tests` at 97-105, `fences` at 106-115, `surface` at 137-176, `hidden` at 181-194, `examples` at 195-220). `@example` is plainly applicable here — this package's own `Source.examples()` reflects exactly that tag.
    repair: add `@returns` and a one-line `@example` to each of the seven members, matching the form already used at `types.ts:88-96`.

## s15-21

21. package=guide file=`/home/user/fleet/guide/src/core/helpers.ts:53-546` rule=`AGENTS.md` § Project model ("Do not add a second parser or source-language analyzer to duplicate TypeScript…") verdict=EXEMPT
    wrong: `extractSourceLines` is a hand-written ~500-line TypeScript lexer (comment, template, regex, and identifier state, plus ASI heuristics), and `exportsFrom`, `hiddenFrom`, `declarationBody`, `memberMethods`, and `Source.#collectSurface` layer anchored regex grammars on top of it.
    repair: none. `/home/user/fleet/guide/guides/guide.md:6,170,231,278` documents the text-only scanner as the deliberate design ("no filesystem or TypeScript compiler API"), and `src/core/types.ts:154-166` and `sources/Source.ts:30-37` state each recognized limit. Recorded so the exemption stays visible: this is the largest single concentration of unverifiable behaviour in the four packages, and finding 18 is the cheapest available reduction in its risk.

## s15-29

29. package=lsp file=`/home/user/fleet/lsp/src/core/errors.ts:45-52` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `isLSPError` re-lists all eight `LSPErrorCode` literals as an inline `===` chain, duplicating the union at `types.ts:333-341`. A ninth code added to the union makes every error carrying it fail `isLSPError`, which is the guard `LSPClient.#receiveChunk:444` depends on to recover a partial message list from a framing failure — so the drift surfaces as lost messages, not as a type error.
    repair: add `export const isLSPErrorCode: Guard<LSPErrorCode> = literalOf('spawn','framing','protocol','duplicate','server','timeout','aborted','closed')` to `src/core/validators.ts` and call it from `isLSPError`; better still, derive both the union and the guard from one frozen `LSP_ERROR_CODES` list in `constants.ts`.

## s15-30

30. package=lsp file=`/home/user/fleet/lsp/src/core/validators.ts:173,178,242,273` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: the guards re-list protocol literal sets the types already declare — `literalOf(1,2,3,4)` duplicates `LSPDiagnosticSeverity` (`types.ts:86`), `literalOf(1,2)` duplicates `LSPDiagnosticTag` (`types.ts:89`), and `literalOf(0,1,2)` duplicates `LSPTextDocumentSyncKind` (`types.ts:142`) at two sites.
    repair: declare `isLSPDiagnosticSeverity`, `isLSPDiagnosticTag`, and `isLSPTextDocumentSyncKind` once in `validators.ts` and compose them at the four call sites.

## s15-31

31. package=lsp file=`/home/user/fleet/lsp/src/core/LSPClient.ts:87-96,97-105,595-603,605-613` rule=`.claude/rules/typescript.md` § Types + `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
    wrong: `#pending` and `#publications` carry near-identical anonymous entry types declared inline in an implementation file (`resolve`, `reject`, `signal`, `abort`, plus `method` on one), and `#settle` and `#settlePublication` duplicate the same four-step settlement — look up, delete, remove the abort listener, resolve or reject. The reusable record type belongs in `types.ts`, and the repeated behaviour belongs in one implementation.
    repair: declare `export interface LSPPending<T> { readonly resolve: (value: T) => void; readonly reject: (reason?: unknown) => void; readonly signal: AbortSignal; readonly abort: () => void }` in `src/core/types.ts`, type both maps over it (`#pending` adding `method`), and route both settle methods through one `#settleEntry(map, key, value, failed)` private method.

## s15-32

32. package=lsp file=`/home/user/fleet/lsp/src/core/LSPClient.ts:648` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `try { await this.#request(LSP_METHODS.shutdown) } catch {}` swallows every shutdown failure with an empty block and no comment. The file explains far smaller decisions at lines 148-149, 344-346, 91-91, 101-104, 118-120, 161-163, 166-171, 239-241, and 247-249, and `/home/user/fleet/router/src/browser/Navigator.ts:248` comments its one deliberate swallow, so a reader cannot tell whether this is intended or an unfinished branch.
    repair: state the reason inside the block — a shutdown refusal must not block teardown, and the transport close that follows settles the peer regardless.

## s15-33

33. package=lsp file=`/home/user/fleet/lsp/src/core/validators.ts:33-293` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: none of the seventeen exported guards in the file carries an `@example`, while `errors.ts:31-35` gives one for `isLSPError` and the same package's `helpers.ts`, `parsers.ts`, and both `factories.ts` files give one for every export. `@example` is applicable to a guard — the sibling file proves it.
    repair: add a two-line `@example` to each guard in the form already used at `errors.ts:31-35`.

## s15-34

34. package=lsp file=`/home/user/fleet/lsp/src/core/types.ts:132,136` rule=`AGENTS.md` § Design laws (Named discriminants) verdict=CONFIRMED
    wrong: `LSPDocumentDiagnosticReport` discriminates on `readonly kind: 'full' | 'unchanged'`. The law bans `kind` as a discriminant name. This is a Language Server Protocol wire shape, so renaming the member would break the protocol — but nothing in the source or the guide records that, so the next reader cannot tell this from finding 12, which is the same spelling with no such defence.
    repair: keep the member name and close the gap in documentation: add an `@remarks` on `LSPDocumentDiagnosticReport` stating that `kind` is the Language Server Protocol's own field name and is therefore fixed by the external contract, and say the same in `guides/lsp.md` beside the type's Surface row. The finding closes as a documented external-format exemption, not as a rename.

## s15-35

35. package=lsp file=`/home/user/fleet/lsp/src/core/factories.ts:13`, `/home/user/fleet/lsp/src/core/LSPClient.ts:53`, `/home/user/fleet/lsp/src/server/factories.ts:12` rule=`.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: public `@example` blocks import through relative source paths — `import type { LSPTransportInterface } from './types.js'` and `import { createLSPClient } from '../core/factories.js'`. Those resolve inside the repository and nowhere else; a consumer copying the example gets an unresolvable specifier.
    repair: replace with `@orkestrel/lsp` and `@orkestrel/lsp/server`, matching `guide` and `program`. Same caveat as finding 7 about the rule's stated scope.